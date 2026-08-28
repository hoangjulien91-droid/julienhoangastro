"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "next-view-transitions";
import { MODULE_LABELS, PONTS } from "@/lib/pst/data/ponts";
import { useCurrentCardText } from "@/components/pst/shell/CurrentCardContext";

const WORK = 25 * 60;
const BREAK = 5 * 60;

function today() {
  return new Date().toISOString().slice(0, 10);
}

function fmt(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

function getLS(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function setLS(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

function beep() {
  try {
    const Ctx = window.AudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 660;
    gain.gain.value = 0.05;
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 350);
  } catch {
    // ignore (AudioContext unavailable)
  }
}

function notify(title: string, body: string) {
  try {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body });
    }
  } catch {
    // ignore
  }
}

interface StudyToolsProps {
  moduleKey: string;
}

export function StudyTools({ moduleKey }: StudyToolsProps) {
  const [open, setOpen] = useState(false);
  const [activePop, setActivePop] = useState<
    "none" | "pomo" | "search" | "bell"
  >("none");
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [pomoMode, setPomoMode] = useState<"work" | "break">("work");
  const [pomoRemain, setPomoRemain] = useState(WORK);
  const [pomoRunning, setPomoRunning] = useState(false);
  const [pomoCount, setPomoCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const { text: currentCardText } = useCurrentCardText();

  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPomoCount(parseInt(getLS("st_pomo_" + today()) ?? "0", 10) || 0);
    setLS("st_visit_" + moduleKey, today());
  }, [moduleKey]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActivePop("none");
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setActivePop("none");
      }
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function toast(msg: string) {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 3200);
  }

  useEffect(() => {
    if (!pomoRunning) return;
    intervalRef.current = setInterval(() => {
      setPomoRemain((remain) => {
        if (remain > 1) return remain - 1;
        beep();
        if (pomoMode === "work") {
          const next =
            (parseInt(getLS("st_pomo_" + today()) ?? "0", 10) || 0) + 1;
          setLS("st_pomo_" + today(), String(next));
          setPomoCount(next);
          setPomoMode("break");
          notify("Pomodoro terminé", "Pause de 5 minutes — bravo !");
          toast("Pomodoro terminé. Pause de 5 min.");
          setPomoRunning(false);
          return BREAK;
        }
        setPomoMode("work");
        toast("Pause finie. On repart pour 25 min ?");
        setPomoRunning(false);
        return WORK;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pomoRunning]);

  function resetPomo() {
    setPomoRunning(false);
    setPomoMode("work");
    setPomoRemain(WORK);
  }

  function togglePop(pop: "pomo" | "search" | "bell") {
    if (!open) setOpen(true);
    setActivePop((prev) => (prev === pop ? "none" : pop));
  }

  function handleTts() {
    if (!("speechSynthesis" in window)) {
      toast("Synthèse vocale non disponible sur ce navigateur.");
      return;
    }
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    if (!currentCardText) {
      toast("Ouvre l'onglet Cartes pour lire une flashcard.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(currentCardText);
    utterance.lang = "fr-FR";
    utterance.rate = 0.98;
    utterance.onend = utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  function staleModules() {
    return Object.keys(MODULE_LABELS)
      .map((id) => {
        const last = getLS("st_visit_" + id);
        if (!last) return null;
        const days = Math.floor(
          (Date.now() - new Date(last).getTime()) / 86400000,
        );
        return days >= 3 ? { id, days } : null;
      })
      .filter((x): x is { id: string; days: number } => x !== null);
  }

  const [stale, setStale] = useState<{ id: string; days: number }[]>([]);
  useEffect(() => {
    setStale(staleModules());
  }, []);

  useEffect(() => {
    if (stale.length) {
      const t = setTimeout(() => {
        toast(`${stale.length} module(s) à réviser — voir les rappels.`);
        notify("Révisions en attente", `${stale.length} module(s) à revoir.`);
      }, 1400);
      return () => clearTimeout(t);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function requestNotifications() {
    if (!("Notification" in window)) {
      toast("Notifications non supportées sur ce navigateur.");
      return;
    }
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        toast("Notifications activées.");
        const s = staleModules();
        if (s.length)
          notify("Révisions en attente", `${s.length} module(s) à revoir.`);
      } else {
        toast("Notifications refusées.");
      }
    });
  }

  const results = PONTS.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    if (p.c.toLowerCase().includes(q)) return true;
    return Object.values(p.m).some((v) => v.toLowerCase().includes(q));
  });

  return (
    <div
      id="stwrap"
      className={`stwrap${open ? " open" : ""}`}
      aria-live="polite"
      ref={wrapRef}
      onClick={(e) => e.stopPropagation()}
    >
      {toastMsg && (
        <div className="st-toast" role="status">
          {toastMsg}
        </div>
      )}

      {activePop === "pomo" && (
        <div className="st-pop" role="dialog" aria-label="Minuteur Pomodoro">
          <div className="st-pop-head">
            <strong>Pomodoro</strong>
            <button
              className="st-x"
              aria-label="Fermer"
              onClick={() => setActivePop("none")}
            >
              ×
            </button>
          </div>
          <div className="st-timer">{fmt(pomoRemain)}</div>
          <div className="st-mode">
            {pomoMode === "work" ? "Travail · 25 min" : "Pause · 5 min"}
          </div>
          <div className="st-row">
            <button
              className="st-btn solid"
              onClick={() => setPomoRunning((r) => !r)}
            >
              {pomoRunning ? "Pause" : "Démarrer"}
            </button>
            <button className="st-btn" onClick={resetPomo}>
              Réinitialiser
            </button>
          </div>
          <div className="st-stat">
            {pomoCount} pomodoro{pomoCount > 1 ? "s" : ""} aujourd&apos;hui
          </div>
        </div>
      )}

      {activePop === "search" && (
        <div
          className="st-pop wide"
          role="dialog"
          aria-label="Ponts conceptuels entre modules"
        >
          <div className="st-pop-head">
            <strong>Ponts conceptuels</strong>
            <button
              className="st-x"
              aria-label="Fermer"
              onClick={() => setActivePop("none")}
            >
              ×
            </button>
          </div>
          <label className="st-srch">
            <span className="st-vh">
              Rechercher un concept dans tous les PST
            </span>
            <input
              type="search"
              placeholder="Ex. Dejours, pouvoir d'agir, reconnaissance…"
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
          <div className="st-results">
            {results.length === 0 && (
              <div className="st-card">Aucun concept trouvé.</div>
            )}
            {results.map((p) => {
              const here = Object.keys(p.m).some((k) => k === moduleKey);
              return (
                <div className="st-card" key={p.c}>
                  {here && <div className="here">Présent dans ce module</div>}
                  <div className="c">{p.c}</div>
                  {Object.keys(p.m).map((id) => (
                    <Link
                      key={id}
                      className="st-link"
                      href={`/${id}/`}
                      aria-current={id === moduleKey ? "page" : undefined}
                    >
                      {id.toUpperCase()}{" "}
                      <span className="ang">· {p.m[id]}</span>
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activePop === "bell" && (
        <div className="st-pop" role="dialog" aria-label="Rappels de révision">
          <div className="st-pop-head">
            <strong>Rappels de révision</strong>
            <button
              className="st-x"
              aria-label="Fermer"
              onClick={() => setActivePop("none")}
            >
              ×
            </button>
          </div>
          <div className="st-reminders">
            {stale.length === 0 ? (
              <div className="st-card">
                Tout est à jour. Les modules non révisés depuis 3 jours
                apparaîtront ici.
              </div>
            ) : (
              stale.map((s) => (
                <div className="st-card" key={s.id}>
                  <div className="c">
                    {MODULE_LABELS[s.id]} ({s.id.toUpperCase()})
                  </div>
                  Pas révisé depuis <b>{s.days} jours</b>.{" "}
                  <Link className="st-link" href={`/${s.id}/`}>
                    Réviser maintenant
                  </Link>
                </div>
              ))
            )}
          </div>
          <button className="st-btn solid" onClick={requestNotifications}>
            Activer les notifications
          </button>
          <div className="st-note">
            Le navigateur t&apos;alertera des modules à revoir à ta prochaine
            ouverture.
          </div>
        </div>
      )}

      <div className="st-bar" role="toolbar" aria-label="Outils d'étude">
        <div className="st-actions">
          <Link
            className="st-fab"
            href="/pst/"
            aria-label="Portail de révision (tous les modules)"
            title="Portail"
          >
            <span className="st-ico">⌂</span>
          </Link>
          <button
            className="st-fab"
            aria-label="Minuteur Pomodoro"
            title="Pomodoro"
            onClick={() => togglePop("pomo")}
          >
            <span className="st-ico">◷</span>
            {pomoCount > 0 && <span className="st-badge">{pomoCount}</span>}
          </button>
          <button
            className={`st-fab${speaking ? " active" : ""}`}
            aria-label="Lire la carte à voix haute"
            title="Synthèse vocale"
            onClick={handleTts}
          >
            <span className="st-ico">♪</span>
          </button>
          <button
            className="st-fab"
            aria-label="Ponts conceptuels entre modules"
            title="Recherche cross-module"
            onClick={() => togglePop("search")}
          >
            <span className="st-ico">⌕</span>
          </button>
          <button
            className="st-fab"
            aria-label="Rappels de révision"
            title="Rappels"
            onClick={() => togglePop("bell")}
          >
            <span className="st-ico">◔</span>
            {stale.length > 0 && <span className="st-dot" />}
          </button>
        </div>
        <button
          className="st-fab st-toggle"
          aria-expanded={open}
          aria-label="Outils d'étude"
          title="Outils d'étude"
          onClick={() => {
            const next = !open;
            setOpen(next);
            if (!next) setActivePop("none");
          }}
        >
          <span className="st-ico st-ico-open">✦</span>
          <span className="st-ico st-ico-close">×</span>
          {(pomoRunning || stale.length > 0) && <span className="st-dot" />}
        </button>
      </div>
    </div>
  );
}

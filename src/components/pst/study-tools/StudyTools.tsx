"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Sparkles,
  X,
  GraduationCap,
  ShieldAlert,
  ShieldCheck,
  Printer,
  Layers,
  Compass,
  Headphones,
  History,
  Swords,
  HeartHandshake,
  Flame,
  Volume2,
  VolumeX,
  Timer,
  Search,
  Bell,
  Home,
  ChevronRight,
} from "lucide-react";
import { Link } from "@/components/common/Link";
import { MODULE_LABELS, PONTS } from "@/lib/pst/data/ponts";
import { useCurrentCardText } from "@/components/pst/shell/CurrentCardContext";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";

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

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 400);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermeture au clic en dehors
  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActivePop("none");
      }
    }
    if (open || activePop !== "none") {
      document.addEventListener("click", handleDocClick);
      return () => document.removeEventListener("click", handleDocClick);
    }
    return undefined;
  }, [open, activePop]);

  function toast(msg: string) {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 3000);
  }

  // Chrono Pomodoro
  useEffect(() => {
    if (!pomoRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return undefined;
    }
    intervalRef.current = setInterval(() => {
      setPomoRemain((r) => {
        if (r > 1) return r - 1;
        beep();
        if (pomoMode === "work") {
          notify("Pomodoro terminé !", "Prends 5 min de pause.");
          toast("Pomodoro terminé ! Prends 5 min de pause.");
          const next = pomoCount + 1;
          setPomoCount(next);
          setLS("st_pomo_" + today(), String(next));
          setPomoMode("break");
          setPomoRunning(false);
          return BREAK;
        }
        notify("Pause terminée", "On repart pour 25 min ?");
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
    playClickSound();
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
      toast("Ouvre l'onglet Cartes pour écouter une carte mémoire.");
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

  function fireToolEvent(eventName: string) {
    playClickSound();
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(6);
      } catch {
        // ignore
      }
    }
    window.dispatchEvent(new CustomEvent(eventName));
    setOpen(false);
  }

  return (
    <div
      id="stwrap"
      className="fixed bottom-5 right-4 sm:right-6 z-50 flex flex-col items-end"
      aria-live="polite"
      ref={wrapRef}
      onClick={(e) => e.stopPropagation()}
    >
      {toastMsg && (
        <div className="mb-3 px-3.5 py-2 rounded-2xl bg-slate-900/90 text-white dark:bg-white/90 dark:text-slate-900 backdrop-blur-xl border border-white/20 dark:border-slate-800 text-xs font-semibold shadow-xl animate-in fade-in slide-in-from-bottom-2">
          {toastMsg}
        </div>
      )}

      {/* Popover Pomodoro iOS */}
      {activePop === "pomo" && (
        <div
          className="mb-3 w-72 p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
          role="dialog"
          aria-label="Minuteur Pomodoro"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-slate-100">
              <Timer className="size-4 text-amber-500" />
              <span>Minuteur Pomodoro</span>
            </div>
            <button
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
              aria-label="Fermer"
              onClick={() => setActivePop("none")}
            >
              <X className="size-3.5" />
            </button>
          </div>
          <div className="my-3 text-center">
            <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {fmt(pomoRemain)}
            </div>
            <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400 mt-1">
              {pomoMode === "work" ? "Session de concentration (25 min)" : "Pause réparatrice (5 min)"}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex-1 py-1.5 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-bold text-xs transition-all active:scale-95 shadow-xs cursor-pointer"
              onClick={() => setPomoRunning((r) => !r)}
            >
              {pomoRunning ? "Suspendre" : "Lancer"}
            </button>
            <button
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-all active:scale-95 cursor-pointer"
              onClick={resetPomo}
            >
              Reset
            </button>
          </div>
          <div className="mt-2 text-[10px] text-center font-mono text-slate-500">
            {pomoCount} cycle{pomoCount > 1 ? "s" : ""} validé{pomoCount > 1 ? "s" : ""} aujourd&apos;hui
          </div>
        </div>
      )}

      {/* Popover Ponts conceptuels iOS */}
      {activePop === "search" && (
        <div
          className="mb-3 w-80 sm:w-96 p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
          role="dialog"
          aria-label="Ponts conceptuels entre modules"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-slate-100">
              <Search className="size-4 text-amber-500" />
              <span>Ponts Transversaux ({results.length})</span>
            </div>
            <button
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
              aria-label="Fermer"
              onClick={() => setActivePop("none")}
            >
              <X className="size-3.5" />
            </button>
          </div>
          <div className="my-2.5">
            <input
              type="search"
              placeholder="Ex. Dejours, pouvoir d'agir, Vygotski…"
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-amber-500"
            />
          </div>
          <div className="max-h-56 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
            {results.length === 0 ? (
              <div className="p-3 text-center text-xs text-slate-500">
                Aucun concept correspondant trouvé.
              </div>
            ) : (
              results.map((p) => {
                const here = Object.keys(p.m).some((k) => k === moduleKey);
                return (
                  <div
                    key={p.c}
                    className="p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                      <span>{p.c}</span>
                      {here && (
                        <span className="text-[9px] font-mono font-bold text-amber-700 dark:text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded-full">
                          Présent ici
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {Object.keys(p.m).map((id) => (
                        <Link
                          key={id}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 hover:border-amber-500 text-slate-700 dark:text-slate-300"
                          href={`/pst/${id.replace("pst", "")}/`}
                        >
                          <b>{id.toUpperCase()}</b> · {p.m[id]}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Popover Rappels de révision iOS */}
      {activePop === "bell" && (
        <div
          className="mb-3 w-76 p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
          role="dialog"
          aria-label="Rappels de révision"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-slate-100">
              <Bell className="size-4 text-amber-500" />
              <span>Rappels de Révision</span>
            </div>
            <button
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
              aria-label="Fermer"
              onClick={() => setActivePop("none")}
            >
              <X className="size-3.5" />
            </button>
          </div>
          <div className="my-2.5 max-h-48 overflow-y-auto space-y-1.5 pr-1 text-xs">
            {stale.length === 0 ? (
              <div className="p-3 text-center text-slate-500 font-medium">
                Tout est à jour. Aucun module en retard de plus de 3 jours.
              </div>
            ) : (
              stale.map((s) => (
                <div
                  key={s.id}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between gap-2"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {s.id.toUpperCase()}
                    </span>
                    <span className="block text-[10px] text-slate-500">
                      Non ouvert depuis {s.days} jours
                    </span>
                  </div>
                  <Link
                    href={`/pst/${s.id.replace("pst", "")}/`}
                    className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold"
                  >
                    Ouvrir
                  </Link>
                </div>
              ))
            )}
          </div>
          <button
            type="button"
            onClick={requestNotifications}
            className="w-full py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-all active:scale-95 cursor-pointer"
          >
            Activer notifications navigateur
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* APPLE iOS FLOATING QUICK ACTIONS DOCK (Action Sheet Translucide)          */}
      {/* ========================================================================= */}
      {open && activePop === "none" && (
        <div
          className="mb-3 w-[calc(100vw-32px)] sm:w-88 max-h-[75vh] p-4 rounded-[30px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xl overflow-y-auto scrollbar-none animate-in fade-in zoom-in-95 duration-150 space-y-4"
          role="dialog"
          aria-label="Palette d'outils d'étude"
        >
          {/* Header Action Sheet */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80 dark:border-slate-800">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase tracking-widest font-black text-amber-600 dark:text-amber-400">
                Palette Tactile iOS
              </span>
              <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 m-0">
                Boîte à Outils PST
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer"
              aria-label="Fermer la palette"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Section 1 : Objectif Examen 18/20 */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block px-1">
              🎯 Objectif Examen 18/20
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => fireToolEvent("pst:open-sujets-dissertation")}
                className="p-2.5 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-900 dark:text-indigo-200 border border-indigo-500/20 flex items-center gap-2 text-left transition-all active:scale-95 cursor-pointer"
              >
                <GraduationCap className="size-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-bold truncate">Sujets 18/20</span>
                  <span className="block text-[9.5px] opacity-75 truncate">Plans dialectiques</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => fireToolEvent("pst:open-detective")}
                className="p-2.5 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-900 dark:text-purple-200 border border-purple-500/20 flex items-center gap-2 text-left transition-all active:scale-95 cursor-pointer"
              >
                <ShieldAlert className="size-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-bold truncate">Pièges V/F</span>
                  <span className="block text-[9.5px] opacity-75 truncate">Détective examen</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => fireToolEvent("pst:open-definitions")}
                className="p-2.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 border border-emerald-500/20 flex items-center gap-2 text-left transition-all active:scale-95 cursor-pointer"
              >
                <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-bold truncate">Définitions</span>
                  <span className="block text-[9.5px] opacity-75 truncate">Critères verbatim</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => fireToolEvent("pst:open-fiche-poche")}
                className="p-2.5 rounded-2xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-900 dark:text-teal-200 border border-teal-500/20 flex items-center gap-2 text-left transition-all active:scale-95 cursor-pointer"
              >
                <Printer className="size-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-bold truncate">Mémo Poche A4</span>
                  <span className="block text-[9.5px] opacity-75 truncate">Fiche imprimable</span>
                </div>
              </button>
            </div>
          </div>

          {/* Section 2 : Mémorisation Visuelle & Audio */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block px-1">
              🎨 Mémorisation Visuelle &amp; Audio
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => fireToolEvent("pst:open-schemas")}
                className="p-2.5 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-900 dark:text-cyan-200 border border-cyan-500/20 flex items-center gap-2 text-left transition-all active:scale-95 cursor-pointer"
              >
                <Layers className="size-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-bold truncate">11 Schémas SVG</span>
                  <span className="block text-[9.5px] opacity-75 truncate">Matrices interactives</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => fireToolEvent("pst:open-palais-memoire")}
                className="p-2.5 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-900 dark:text-purple-200 border border-purple-500/20 flex items-center gap-2 text-left transition-all active:scale-95 cursor-pointer"
              >
                <Compass className="size-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-bold truncate">Palais Mémoire</span>
                  <span className="block text-[9.5px] opacity-75 truncate">Tri-Module 18/20</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => fireToolEvent("pst:open-blind-test")}
                className="p-2.5 rounded-2xl bg-violet-500/10 hover:bg-violet-500/20 text-violet-900 dark:text-violet-200 border border-violet-500/20 flex items-center gap-2 text-left transition-all active:scale-95 cursor-pointer"
              >
                <Headphones className="size-4 text-violet-600 dark:text-violet-400 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-bold truncate">Écoute Audio</span>
                  <span className="block text-[9.5px] opacity-75 truncate">Citations mystères</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => fireToolEvent("pst:open-chronologie")}
                className="p-2.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 border border-emerald-500/20 flex items-center gap-2 text-left transition-all active:scale-95 cursor-pointer"
              >
                <History className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-bold truncate">Frise Histoire</span>
                  <span className="block text-[9.5px] opacity-75 truncate">1880 — 2026</span>
                </div>
              </button>
            </div>
          </div>

          {/* Section 3 : Entraînement Clinique & Restitution */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block px-1">
              ⚡ Entraînement Clinique &amp; Réflexes
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => fireToolEvent("pst:open-match-auteurs")}
                className="p-2.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-900 dark:text-rose-200 border border-rose-500/20 flex items-center gap-2 text-left transition-all active:scale-95 cursor-pointer"
              >
                <Swords className="size-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-bold truncate">Match 1v1</span>
                  <span className="block text-[9.5px] opacity-75 truncate">Duels dialectiques</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => fireToolEvent("pst:open-roleplay")}
                className="p-2.5 rounded-2xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-900 dark:text-teal-200 border border-teal-500/20 flex items-center gap-2 text-left transition-all active:scale-95 cursor-pointer"
              >
                <HeartHandshake className="size-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-bold truncate">Jeu de Rôle</span>
                  <span className="block text-[9.5px] opacity-75 truncate">Entretien IOD</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => fireToolEvent("pst:open-speed-run")}
                className="p-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/20 flex items-center gap-2 text-left transition-all active:scale-95 cursor-pointer"
              >
                <Flame className="size-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-bold truncate">Chrono Réflexe 60s</span>
                  <span className="block text-[9.5px] opacity-75 truncate">Sprint mémoriel</span>
                </div>
              </button>

              <button
                type="button"
                onClick={handleTts}
                className={`p-2.5 rounded-2xl border flex items-center gap-2 text-left transition-all active:scale-95 cursor-pointer ${
                  speaking
                    ? "bg-amber-600 text-white border-amber-600"
                    : "bg-slate-100/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-700/80"
                }`}
              >
                {speaking ? (
                  <VolumeX className="size-4 text-white shrink-0 animate-pulse" />
                ) : (
                  <Volume2 className="size-4 text-slate-600 dark:text-slate-300 shrink-0" />
                )}
                <div className="min-w-0">
                  <span className="block text-xs font-bold truncate">Synthèse Vocale</span>
                  <span className="block text-[9.5px] opacity-75 truncate">{speaking ? "En lecture…" : "Écouter carte"}</span>
                </div>
              </button>
            </div>
          </div>

          {/* Section 4 : Utilitaires & Navigation Focus */}
          <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => togglePop("pomo")}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold flex items-center gap-1 active:scale-95 cursor-pointer"
            >
              <Timer className="size-3.5 text-amber-600" />
              <span>Pomodoro</span>
            </button>
            <button
              type="button"
              onClick={() => togglePop("search")}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold flex items-center gap-1 active:scale-95 cursor-pointer"
            >
              <Search className="size-3.5 text-amber-600" />
              <span>Ponts</span>
            </button>
            <button
              type="button"
              onClick={() => togglePop("bell")}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold flex items-center gap-1 active:scale-95 cursor-pointer"
            >
              <Bell className="size-3.5 text-amber-600" />
              <span>Rappels</span>
            </button>
            <Link
              href="/pst/"
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 text-[11px] font-bold flex items-center gap-1 active:scale-95"
            >
              <Home className="size-3.5" />
              <span>Pilotage</span>
            </Link>
          </div>
        </div>
      )}

      {/* Boutons d'Action Flottants (Bouton Principal + Retour en Haut) */}
      <div className="flex items-center gap-2">
        {/* Bouton Back to Top Apple Glassmorphism */}
        {showScrollTop && (
          <button
            type="button"
            className="size-12 rounded-2xl bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border border-slate-200/90 dark:border-slate-800 backdrop-blur-xl shadow-lg flex items-center justify-center active:scale-90 transition-all cursor-pointer hover:border-amber-500/50"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Retour en haut de page"
            title="Remonter en haut de page"
          >
            <ArrowUp className="size-4" />
          </button>
        )}

        {/* Bouton Déclencheur Principal Apple iOS FAB */}
        <button
          type="button"
          className="size-12 rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 border border-white/20 dark:border-slate-800 shadow-xl flex items-center justify-center cursor-pointer active:scale-90 transition-all hover:scale-105 relative"
          aria-expanded={open}
          aria-label="Outils d'étude et d'examen"
          title="Ouvrir la palette d'outils"
          onClick={() => {
            playClickSound();
            const next = !open;
            setOpen(next);
            if (!next) setActivePop("none");
          }}
        >
          {open ? (
            <X className="size-5 transition-transform rotate-90 duration-200" />
          ) : (
            <Sparkles className="size-5 text-amber-400" />
          )}

          {/* Anneau indicateur si activité active */}
          {(pomoRunning || stale.length > 0) && (
            <span className="absolute -top-1 -right-1 size-3 rounded-full bg-amber-500 border-2 border-white dark:border-slate-950 animate-ping" />
          )}
        </button>
      </div>
    </div>
  );
}

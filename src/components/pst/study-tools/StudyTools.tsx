"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  X,
  Timer,
  Search,
  Bell,
  Home,
  GitFork,
  Smartphone,
  Copy,
  Check,
  Download,
  Upload,
  SlidersHorizontal,
} from "lucide-react";
import { Link } from "@/components/common/Link";
import { MODULE_LABELS, PONTS } from "@/lib/pst/data/ponts";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
  getAudioContext,
} from "@/lib/pst/audio-feedback";

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
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 660;
    gain.gain.value = 0.05;
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch {
    // ignore
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
    "none" | "pomo" | "search" | "bell" | "sync"
  >("none");
  const [syncText, setSyncText] = useState("");
  const [syncCopied, setSyncCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [pomoMode, setPomoMode] = useState<"work" | "break">("work");
  const [pomoRemain, setPomoRemain] = useState(WORK);
  const [pomoRunning, setPomoRunning] = useState(false);
  const [pomoCount, setPomoCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPomoCount(parseInt(getLS("st_pomo_" + today()) ?? "0", 10) || 0);
    setLS("st_visit_" + moduleKey, today());
  }, [moduleKey]);

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [dockVisible, setDockVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 400);
    }
    function handleDockState(e: Event) {
      const visible = Boolean((e as CustomEvent<{ visible?: boolean }>).detail?.visible);
      setDockVisible(visible);
    }
    function handleToggleTools() {
      setOpen((prev) => {
        const next = !prev;
        if (!next) setActivePop("none");
        return next;
      });
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setActivePop("none");
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pst:mobile-dock-state", handleDockState);
    window.addEventListener("pst:toggle-study-tools", handleToggleTools);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pst:mobile-dock-state", handleDockState);
      window.removeEventListener("pst:toggle-study-tools", handleToggleTools);
      window.removeEventListener("keydown", handleEscape);
    };
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

  function togglePop(pop: "pomo" | "search" | "bell" | "sync") {
    playClickSound();
    setActivePop((prev) => (prev === pop ? "none" : pop));
  }

  function buildFullSnapshot(): string {
    if (typeof window === "undefined") return "{}";
    const snapshot: Record<string, string> = {};
    try {
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k && /^(pst|st_)/i.test(k)) {
          const val = window.localStorage.getItem(k);
          if (val !== null) snapshot[k] = val;
        }
      }
    } catch {
      // ignore
    }
    return JSON.stringify({
      version: 2,
      exportedAt: new Date().toISOString(),
      entries: snapshot,
    });
  }

  function handleCopySnapshot() {
    const data = buildFullSnapshot();
    navigator.clipboard.writeText(data);
    setSyncCopied(true);
    playSuccessSound();
    triggerHaptic("success");
    toast("Progression complète copiée (prête pour Universal Clipboard Mac/iPhone) !");
    setTimeout(() => setSyncCopied(false), 2500);
  }

  function handleDownloadSnapshot() {
    const data = buildFullSnapshot();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pst-sync-${today()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    playSuccessSound();
    toast("Fichier de sauvegarde téléchargé.");
  }

  function handleRestoreSnapshot(rawJson: string) {
    if (!rawJson.trim()) {
      toast("Collez d'abord le code de synchronisation.");
      return;
    }
    try {
      const parsed = JSON.parse(rawJson);
      const entries: Record<string, string> = parsed.entries || parsed;
      let count = 0;
      Object.entries(entries).forEach(([k, v]) => {
        if (/^(pst|st_)/i.test(k) && typeof v === "string") {
          window.localStorage.setItem(k, v);
          count++;
        }
      });
      window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      window.dispatchEvent(new CustomEvent("pst:ad-updated"));
      playSuccessSound();
      triggerHaptic("success");
      setSyncText("");
      toast(`Synchronisation réussie (${count} clés restaurées) !`);
      setActivePop("none");
    } catch {
      toast("Format de sauvegarde invalide.");
    }
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
    if (stale.length && typeof window !== "undefined") {
      try {
        const alreadyNotified = window.sessionStorage.getItem("pst_stale_notified");
        if (!alreadyNotified) {
          window.sessionStorage.setItem("pst_stale_notified", "true");
          const t = setTimeout(() => {
            toast(`${stale.length} module(s) à réviser — voir les rappels.`);
            notify("Révisions en attente", `${stale.length} module(s) à revoir.`);
          }, 1400);
          return () => clearTimeout(t);
        }
      } catch {
        // ignore
      }
    }
    return undefined;
  }, [stale.length]);

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

  function fireToolEvent(eventName: string, detail?: unknown) {
    triggerHaptic("selection");
    playClickSound();
    window.dispatchEvent(new CustomEvent(eventName, { detail }));
    setOpen(false);
  }

  return (
    <div
      id="stwrap"
      className={`stwrap fixed right-3.5 sm:right-6 sm:bottom-5 z-50 flex flex-col items-end transition-all duration-200 ${
        dockVisible
          ? "bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))]"
          : "bottom-[calc(1rem+env(safe-area-inset-bottom,0px))]"
      }`}
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
          className="mb-3 w-72 max-w-[calc(100vw-24px)] p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
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
              {pomoMode === "work"
                ? "Session de concentration (25 min)"
                : "Pause réparatrice (5 min)"}
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
            {pomoCount} cycle{pomoCount > 1 ? "s" : ""} validé
            {pomoCount > 1 ? "s" : ""} aujourd&apos;hui
          </div>
        </div>
      )}

      {/* Popover Ponts conceptuels iOS */}
      {activePop === "search" && (
        <div
          className="mb-3 w-80 sm:w-96 max-w-[calc(100vw-24px)] p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
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
              aria-label="Rechercher un concept ou un auteur"
              placeholder="Ex. Dejours, pouvoir d'agir, Vygotski…"
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-amber-500"
            />
          </div>
          <div className="max-h-56 overflow-y-auto space-y-2 pr-1 scrollbar-none">
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
                        <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded-full">
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
          <div className="pt-2.5 mt-2 border-t border-slate-200/80 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                setActivePop("none");
                fireToolEvent("pst:open-ponts-transversaux");
              }}
              className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <GitFork className="size-3.5" />
              <span>Ouvrir la Matrice Complète des Ponts</span>
            </button>
          </div>
        </div>
      )}

      {/* Popover Rappels de révision iOS */}
      {activePop === "bell" && (
        <div
          className="mb-3 w-76 max-w-[calc(100vw-24px)] p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
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

      {/* Popover Synchronisation Multi-Appareils (Mac ↔ iPhone) */}
      {activePop === "sync" && (
        <div
          className="mb-3 w-80 max-w-[calc(100vw-24px)] p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xl animate-in fade-in zoom-in-95 duration-150 space-y-3"
          role="dialog"
          aria-label="Synchronisation Mac et iPhone"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-slate-100">
              <Smartphone className="size-4 text-emerald-500" />
              <span>Sync Mac ↔ iPhone (1-Clic)</span>
            </div>
            <button
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
              aria-label="Fermer"
              onClick={() => setActivePop("none")}
            >
              <X className="size-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug m-0">
            Transférez instantanément vos <strong>Flashcards SM-2</strong>, <strong>Activités Distantes (AD)</strong>, <strong>brouillons d&apos;examen blanc</strong> et <strong>notes Feynman</strong> via le presse-papier universel Apple ou un fichier JSON.
          </p>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={handleCopySnapshot}
              className="py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              {syncCopied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              <span>{syncCopied ? "Copié !" : "1. Copier tout"}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadSnapshot}
              className="py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <Download className="size-3.5" />
              <span>Export .JSON</span>
            </button>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-slate-800">
            <textarea
              value={syncText}
              onChange={(e) => setSyncText(e.target.value)}
              rows={2}
              placeholder="2. Sur l'autre appareil, collez ici le code copié..."
              className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500 resize-none font-mono"
            />
            <button
              type="button"
              onClick={() => handleRestoreSnapshot(syncText)}
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              <Upload className="size-3.5" />
              <span>Restaurer la progression sur cet appareil</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MENU RAPIDE & MINUTEUR FOCUS (Action Sheet Compacte & Épurée)             */}
      {/* ========================================================================= */}
      {open && activePop === "none" && (
        <div
          className="mb-3 w-[calc(100vw-32px)] sm:w-80 p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xl animate-in fade-in zoom-in-95 duration-150 space-y-3.5"
          role="dialog"
          aria-label="Menu d'outils et minuteur"
        >
          {/* Header épuré */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 m-0">
                Outils &amp; Concentration
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer"
              aria-label="Fermer le menu"
            >
              <X className="size-3.5" />
            </button>
          </div>

          {/* Minuteur Pomodoro Focus Intégré */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Timer className="size-3 text-amber-500" />
                <span>
                  Focus · {pomoMode === "work" ? "25 min" : "Pause 5 min"}
                </span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {pomoCount} cycle{pomoCount > 1 ? "s" : ""} validé
                {pomoCount > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="text-2xl font-mono font-black text-slate-900 dark:text-slate-100 tracking-tight">
                {fmt(pomoRemain)}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setPomoRunning((r) => !r);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs"
                >
                  {pomoRunning ? "Suspendre" : "Démarrer"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    resetPomo();
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-200/80 hover:bg-slate-300/80 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
                  title="Réinitialiser le minuteur"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Utilitaires de Session Active (sans doublon avec Outils 18/20) */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block px-1">
              Session &amp; Synchronisation
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => togglePop("sync")}
                className="p-2.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 border border-emerald-500/25 flex items-center gap-2 text-left transition-all active:scale-95 cursor-pointer"
                title="Synchroniser la progression entre Mac et iPhone"
              >
                <Smartphone className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-bold truncate">
                    Sync Mac ↔ iOS
                  </span>
                  <span className="block text-[11px] opacity-80 truncate">
                    Sauvegarde 1-clic
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => togglePop("bell")}
                className="p-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/25 flex items-center gap-2 text-left transition-all active:scale-95 cursor-pointer"
                title="Rappels de révision"
              >
                <Bell className="size-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-bold truncate">
                    Rappels
                  </span>
                  <span className="block text-[11px] opacity-80 truncate">
                    {stale.length > 0
                      ? `${stale.length} UE en attente`
                      : "Tout est à jour"}
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setOpen(false);
                  window.dispatchEvent(
                    new CustomEvent("pst:open-command-palette"),
                  );
                }}
                className="p-2.5 rounded-2xl bg-slate-100/90 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-2 text-left transition-all active:scale-95 cursor-pointer"
              >
                <Search className="size-4 text-slate-500 dark:text-slate-400 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-bold truncate">
                    Recherche ⌘K
                  </span>
                  <span className="block text-[11px] opacity-80 truncate">
                    Notions &amp; Outils
                  </span>
                </div>
              </button>

              <Link
                href="/pst/"
                onClick={() => playClickSound()}
                className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 flex items-center gap-2 text-left transition-all active:scale-95"
              >
                <Home className="size-4 shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-bold truncate">
                    Pilotage
                  </span>
                  <span className="block text-[11px] opacity-80 truncate">
                    Hub central
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Boutons d'Action Flottants (Bouton Principal + Retour en Haut) */}
      <div className={`items-center gap-2 ${dockVisible ? "hidden sm:flex" : "flex"}`}>
        {/* Bouton Back to Top Apple Glassmorphism (affiché sur desktop sm: ; sur mobile le dock persistant intègre déjà son propre bouton Retour) */}
        {showScrollTop && (
          <button
            type="button"
            className="hidden sm:flex size-12 rounded-2xl bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border border-slate-200/90 dark:border-slate-800 backdrop-blur-xl shadow-lg items-center justify-center active:scale-90 transition-all cursor-pointer hover:border-amber-500/50"
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
          className="size-11 sm:size-12 rounded-2xl bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-lg flex items-center justify-center cursor-pointer active:scale-90 transition-all hover:scale-105 relative"
          aria-expanded={open}
          aria-label="Outils d'étude et minuteur"
          title="Outils d'étude et minuteur"
          onClick={() => {
            triggerHaptic("selection");
            playClickSound();
            const next = !open;
            setOpen(next);
            if (!next) setActivePop("none");
          }}
        >
          {open ? (
            <X className="size-5 transition-transform rotate-90 duration-200 text-slate-800 dark:text-slate-100" />
          ) : pomoRunning ? (
            <Timer className="size-5 text-amber-500" />
          ) : (
            <SlidersHorizontal className="size-5 text-amber-600 dark:text-amber-400" />
          )}

          {/* Anneau indicateur si activité active */}
          {(pomoRunning || stale.length > 0) && (
            <span className="absolute -top-1 -right-1 size-3 rounded-full bg-amber-500 border-2 border-white dark:border-slate-800 animate-ping" />
          )}
        </button>
      </div>
    </div>
  );
}

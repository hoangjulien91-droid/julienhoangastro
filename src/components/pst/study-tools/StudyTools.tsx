"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowUp,
  X,
  Timer,
  SlidersHorizontal,
} from "lucide-react";
import { PONTS } from "@/lib/pst/data/ponts";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  POMO_WORK,
  POMO_BREAK,
  today,
  getLS,
  setLS,
  beepAudio,
  notifyBrowser,
  buildFullSnapshot,
  restoreSnapshot,
  getStaleModules,
} from "@/lib/pst/data/study-tools-helpers";
import { PomodoroPopover } from "./popovers/PomodoroPopover";
import { PontsPopover } from "./popovers/PontsPopover";
import { RemindersPopover } from "./popovers/RemindersPopover";
import { SyncPopover } from "./popovers/SyncPopover";
import { StudyToolsActionSheet } from "./popovers/StudyToolsActionSheet";

export interface StudyToolsProps {
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
  const [pomoRemain, setPomoRemain] = useState(POMO_WORK);
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

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 3000);
  }, []);

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

  // Chrono Pomodoro
  useEffect(() => {
    if (!pomoRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return undefined;
    }
    intervalRef.current = setInterval(() => {
      setPomoRemain((r) => {
        if (r > 1) return r - 1;
        beepAudio();
        if (pomoMode === "work") {
          notifyBrowser("Pomodoro terminé !", "Prends 5 min de pause.");
          toast("Pomodoro terminé ! Prends 5 min de pause.");
          const next = pomoCount + 1;
          setPomoCount(next);
          setLS("st_pomo_" + today(), String(next));
          setPomoMode("break");
          setPomoRunning(false);
          return POMO_BREAK;
        }
        notifyBrowser("Pause terminée", "On repart pour 25 min ?");
        toast("Pause finie. On repart pour 25 min ?");
        setPomoRunning(false);
        return POMO_WORK;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pomoRunning, pomoMode, pomoCount, toast]);

  function resetPomo() {
    setPomoRunning(false);
    setPomoMode("work");
    setPomoRemain(POMO_WORK);
  }

  function togglePop(pop: "pomo" | "search" | "bell" | "sync") {
    playClickSound();
    setActivePop((prev) => (prev === pop ? "none" : pop));
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

  function handleRestoreSnapshotAction() {
    if (!syncText.trim()) {
      toast("Collez d'abord le code de synchronisation.");
      return;
    }
    try {
      const count = restoreSnapshot(syncText);
      playSuccessSound();
      triggerHaptic("success");
      setSyncText("");
      toast(`Synchronisation réussie (${count} clés restaurées) !`);
      setActivePop("none");
    } catch {
      toast("Format de sauvegarde invalide.");
    }
  }

  const [stale, setStale] = useState<{ id: string; days: number }[]>([]);
  useEffect(() => {
    setStale(getStaleModules());
  }, []);

  useEffect(() => {
    if (stale.length && typeof window !== "undefined") {
      try {
        const alreadyNotified = window.sessionStorage.getItem("pst_stale_notified");
        if (!alreadyNotified) {
          window.sessionStorage.setItem("pst_stale_notified", "true");
          const t = setTimeout(() => {
            toast(`${stale.length} module(s) à réviser — voir les rappels.`);
            notifyBrowser("Révisions en attente", `${stale.length} module(s) à revoir.`);
          }, 1400);
          return () => clearTimeout(t);
        }
      } catch {
        // ignore
      }
    }
    return undefined;
  }, [stale.length, toast]);

  function requestNotifications() {
    if (!("Notification" in window)) {
      toast("Notifications non supportées sur ce navigateur.");
      return;
    }
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        toast("Notifications activées.");
        const s = getStaleModules();
        if (s.length)
          notifyBrowser("Révisions en attente", `${s.length} module(s) à revoir.`);
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

      {/* Popover Pomodoro */}
      {activePop === "pomo" && (
        <PomodoroPopover
          pomoRemain={pomoRemain}
          pomoMode={pomoMode}
          pomoRunning={pomoRunning}
          pomoCount={pomoCount}
          onToggleRunning={() => setPomoRunning((r) => !r)}
          onReset={resetPomo}
          onClose={() => setActivePop("none")}
        />
      )}

      {/* Popover Ponts conceptuels */}
      {activePop === "search" && (
        <PontsPopover
          moduleKey={moduleKey}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          results={results}
          onOpenMatrix={() => {
            setActivePop("none");
            triggerHaptic("selection");
            playClickSound();
            window.dispatchEvent(new CustomEvent("pst:open-ponts-transversaux"));
          }}
          onClose={() => setActivePop("none")}
        />
      )}

      {/* Popover Rappels de révision */}
      {activePop === "bell" && (
        <RemindersPopover
          stale={stale}
          onRequestNotifications={requestNotifications}
          onClose={() => setActivePop("none")}
        />
      )}

      {/* Popover Synchronisation Multi-Appareils (Mac ↔ iPhone) */}
      {activePop === "sync" && (
        <SyncPopover
          syncText={syncText}
          onSyncTextChange={setSyncText}
          syncCopied={syncCopied}
          onCopySnapshot={handleCopySnapshot}
          onDownloadSnapshot={handleDownloadSnapshot}
          onRestoreSnapshot={handleRestoreSnapshotAction}
          onClose={() => setActivePop("none")}
        />
      )}

      {/* MENU RAPIDE & MINUTEUR FOCUS (Action Sheet) */}
      {open && activePop === "none" && (
        <StudyToolsActionSheet
          pomoRemain={pomoRemain}
          pomoMode={pomoMode}
          pomoRunning={pomoRunning}
          pomoCount={pomoCount}
          onTogglePomo={() => {
            playClickSound();
            setPomoRunning((r) => !r);
          }}
          onResetPomo={() => {
            playClickSound();
            resetPomo();
          }}
          staleCount={stale.length}
          onOpenSync={() => togglePop("sync")}
          onOpenReminders={() => togglePop("bell")}
          onOpenPalette={() => {
            playClickSound();
            setOpen(false);
            window.dispatchEvent(new CustomEvent("pst:open-command-palette"));
          }}
          onClose={() => setOpen(false)}
        />
      )}

      {/* Boutons d'Action Flottants (Bouton Principal + Retour en Haut) */}
      <div className={`items-center gap-2 ${dockVisible ? "hidden sm:flex" : "flex"}`}>
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

          {(pomoRunning || stale.length > 0) && (
            <span className="absolute -top-1 -right-1 size-3 rounded-full bg-amber-500 border-2 border-white dark:border-slate-800 animate-ping" />
          )}
        </button>
      </div>
    </div>
  );
}

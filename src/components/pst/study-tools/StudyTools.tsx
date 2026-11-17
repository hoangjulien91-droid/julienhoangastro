"use client";

import {
  ArrowUp,
  X,
  Timer,
  SlidersHorizontal,
} from "lucide-react";
import {
  playClickSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { PomodoroPopover } from "./popovers/PomodoroPopover";
import { PontsPopover } from "./popovers/PontsPopover";
import { RemindersPopover } from "./popovers/RemindersPopover";
import { SyncPopover } from "./popovers/SyncPopover";
import { StudyToolsActionSheet } from "./popovers/StudyToolsActionSheet";
import { useStudyTools } from "./useStudyTools";

export interface StudyToolsProps {
  moduleKey: string;
}

export function StudyTools({ moduleKey }: StudyToolsProps) {
  const {
    open,
    setOpen,
    activePop,
    setActivePop,
    syncText,
    setSyncText,
    syncCopied,
    toastMsg,
    pomoMode,
    pomoRemain,
    pomoRunning,
    setPomoRunning,
    pomoCount,
    searchQuery,
    setSearchQuery,
    wrapRef,
    showScrollTop,
    dockVisible,
    resetPomo,
    togglePop,
    handleCopySnapshot,
    handleDownloadSnapshot,
    handleRestoreSnapshotAction,
    stale,
    requestNotifications,
    results,
  } = useStudyTools({ moduleKey });

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
        <div className="mb-3 px-3.5 py-2 rounded-2xl bg-slate-900/90 text-white dark:bg-white/90 dark:text-slate-900 backdrop-blur-xl border border-white/20 dark:border-slate-800 text-xs font-semibold shadow-xl animate-in fade-in slide-from-bottom-2">
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

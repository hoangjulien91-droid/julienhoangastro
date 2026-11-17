"use client";

import {
  X,
  Timer,
  Smartphone,
  Bell,
  Search,
  Home,
} from "lucide-react";
import { Link } from "@/components/common/Link";
import { fmtPomoTime } from "@/lib/pst/data/study-tools-helpers";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface StudyToolsActionSheetProps {
  pomoRemain: number;
  pomoMode: "work" | "break";
  pomoRunning: boolean;
  pomoCount: number;
  onTogglePomo: () => void;
  onResetPomo: () => void;
  staleCount: number;
  onOpenSync: () => void;
  onOpenReminders: () => void;
  onOpenPalette: () => void;
  onClose: () => void;
}

export function StudyToolsActionSheet({
  pomoRemain,
  pomoMode,
  pomoRunning,
  pomoCount,
  onTogglePomo,
  onResetPomo,
  staleCount,
  onOpenSync,
  onOpenReminders,
  onOpenPalette,
  onClose,
}: StudyToolsActionSheetProps) {
  return (
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
          onClick={onClose}
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
            {pomoCount} cycle{pomoCount > 1 ? "s" : ""} validé{pomoCount > 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="text-2xl font-mono font-black text-slate-900 dark:text-slate-100 tracking-tight">
            {fmtPomoTime(pomoRemain)}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onTogglePomo}
              className="px-3 py-1.5 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              {pomoRunning ? "Suspendre" : "Démarrer"}
            </button>
            <button
              type="button"
              onClick={onResetPomo}
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
            onClick={onOpenSync}
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
            onClick={onOpenReminders}
            className="p-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/25 flex items-center gap-2 text-left transition-all active:scale-95 cursor-pointer"
            title="Rappels de révision"
          >
            <Bell className="size-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <div className="min-w-0">
              <span className="block text-xs font-bold truncate">
                Rappels
              </span>
              <span className="block text-[11px] opacity-80 truncate">
                {staleCount > 0
                  ? `${staleCount} UE en attente`
                  : "Tout est à jour"}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={onOpenPalette}
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
  );
}

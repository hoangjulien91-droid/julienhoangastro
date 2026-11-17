"use client";

import {
  X,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2,
  BookOpen,
  FileText,
} from "lucide-react";

interface ChronoExamenHeaderProps {
  examHours: number;
  onSelectHours: (h: number) => void;
  isFullScreen: boolean;
  onToggleFullScreen: () => void;
  onClose: () => void;
  remainingSeconds: number;
  formatTime: (secs: number) => string;
  isRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  activePhase: string;
  progressPercent: number;
  mobileTab: "sujet" | "redaction";
  onSelectMobileTab: (tab: "sujet" | "redaction") => void;
  wordsCount: number;
}

export function ChronoExamenHeader({
  examHours,
  onSelectHours,
  isFullScreen,
  onToggleFullScreen,
  onClose,
  remainingSeconds,
  formatTime,
  isRunning,
  onToggleTimer,
  onResetTimer,
  activePhase,
  progressPercent,
  mobileTab,
  onSelectMobileTab,
  wordsCount,
}: ChronoExamenHeaderProps) {
  return (
    <>
      {/* Top Header */}
      <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3.5 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/70 gap-2">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="size-8 sm:size-9 rounded-xl bg-indigo-500/15 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <Timer className="size-4 sm:size-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 truncate">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 truncate">
                Simulateur Épreuve Écrite
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium shrink-0 hidden xs:inline">
                Examen Blanc
              </span>
            </div>
            <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white truncate">
              Chrono-Examen Concours
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Hours toggle */}
          <div className="flex items-center bg-slate-200/80 dark:bg-slate-800/80 p-0.5 sm:p-1 rounded-lg border border-slate-300/80 dark:border-slate-700">
            <button
              onClick={() => onSelectHours(2)}
              className={`px-2 py-1 text-[11px] sm:text-xs font-semibold rounded-md transition-all cursor-pointer ${
                examHours === 2
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              2h
            </button>
            <button
              onClick={() => onSelectHours(3)}
              className={`px-2 py-1 text-[11px] sm:text-xs font-semibold rounded-md transition-all cursor-pointer ${
                examHours === 3
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              3h
            </button>
          </div>

          <button
            onClick={onToggleFullScreen}
            className="p-1.5 sm:p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors hidden sm:inline-flex"
            title={isFullScreen ? "Réduire" : "Plein écran"}
          >
            {isFullScreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors"
            title="Fermer"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Timer Bar */}
      <div className="px-3.5 sm:px-6 py-2.5 sm:py-3 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-4">
          <div className="font-mono text-xl sm:text-3xl font-extrabold tracking-wider text-indigo-600 dark:text-indigo-400">
            {formatTime(remainingSeconds)}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleTimer}
              className={`px-3 sm:px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md min-h-[36px] cursor-pointer ${
                isRunning
                  ? "bg-amber-600 hover:bg-amber-500 text-white"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white"
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="h-3.5 w-3.5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" />
                  <span>Démarrer</span>
                </>
              )}
            </button>

            <button
              onClick={onResetTimer}
              className="p-2 rounded-xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
              title="Réinitialiser le chrono"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Active Phase Pill */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 text-right">
          <div className="text-left sm:text-right min-w-0">
            <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
              Passe en cours
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-indigo-700 dark:text-indigo-300 truncate max-w-[200px] sm:max-w-xs">
              {activePhase}
            </div>
          </div>
          <div className="w-16 sm:w-24 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 shrink-0">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Mobile View Switcher */}
      <div className="lg:hidden flex items-center border-b border-slate-200/80 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-950/60 p-1.5 gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => onSelectMobileTab("sujet")}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
            mobileTab === "sujet"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <BookOpen className="size-3.5" />
          <span>1. Sujet &amp; Repères</span>
        </button>
        <button
          type="button"
          onClick={() => onSelectMobileTab("redaction")}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
            mobileTab === "redaction"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <FileText className="size-3.5" />
          <span>2. Rédaction ({wordsCount})</span>
        </button>
      </div>
    </>
  );
}

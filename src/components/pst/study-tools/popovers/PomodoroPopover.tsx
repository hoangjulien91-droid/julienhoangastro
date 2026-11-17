"use client";

import { Timer, X } from "lucide-react";
import { fmtPomoTime } from "@/lib/pst/data/study-tools-helpers";

interface PomodoroPopoverProps {
  pomoRemain: number;
  pomoMode: "work" | "break";
  pomoRunning: boolean;
  pomoCount: number;
  onToggleRunning: () => void;
  onReset: () => void;
  onClose: () => void;
}

export function PomodoroPopover({
  pomoRemain,
  pomoMode,
  pomoRunning,
  pomoCount,
  onToggleRunning,
  onReset,
  onClose,
}: PomodoroPopoverProps) {
  return (
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
          onClick={onClose}
        >
          <X className="size-3.5" />
        </button>
      </div>
      <div className="my-3 text-center">
        <div className="text-3xl font-mono font-black text-slate-900 dark:text-slate-100 tracking-tight">
          {fmtPomoTime(pomoRemain)}
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
          onClick={onToggleRunning}
        >
          {pomoRunning ? "Suspendre" : "Lancer"}
        </button>
        <button
          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-all active:scale-95 cursor-pointer"
          onClick={onReset}
        >
          Reset
        </button>
      </div>
      <div className="mt-2 text-[10px] text-center font-mono text-slate-500">
        {pomoCount} cycle{pomoCount > 1 ? "s" : ""} validé
        {pomoCount > 1 ? "s" : ""} aujourd&apos;hui
      </div>
    </div>
  );
}

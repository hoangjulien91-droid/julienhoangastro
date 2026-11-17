"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";
import type { ActiveWeekEntry } from "../PlanningWeekView";

interface PlanningWeekNavBarProps {
  safeWeekIdx: number;
  activeWeeksData: ActiveWeekEntry[];
  onSelectWeekIdx: (idx: number) => void;
  onJumpToNextUpcomingWeek: () => void;
}

export function PlanningWeekNavBar({
  safeWeekIdx,
  activeWeeksData,
  onSelectWeekIdx,
  onJumpToNextUpcomingWeek,
}: PlanningWeekNavBarProps) {
  return (
    <div className="p-3 sm:p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
        <button
          type="button"
          disabled={safeWeekIdx <= 0}
          onClick={() => {
            playClickSound();
            onSelectWeekIdx(Math.max(0, safeWeekIdx - 1));
          }}
          className="px-2.5 sm:px-3.5 py-2 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 disabled:opacity-30 flex items-center gap-1 cursor-pointer shrink-0"
        >
          <ChevronLeft className="size-3.5" />
          <span className="hidden sm:inline">Sem. préc.</span>
          <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px] font-bold">
            ←
          </kbd>
        </button>

        <select
          value={safeWeekIdx}
          onChange={(e) => {
            playClickSound();
            onSelectWeekIdx(Number(e.target.value));
          }}
          aria-label="Sélectionner une semaine de cours"
          className="flex-1 min-w-0 px-2.5 sm:px-3.5 py-2 sm:py-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-slate-900 dark:text-slate-100 font-bold text-xs cursor-pointer truncate"
        >
          {activeWeeksData.map((wData, idx) => (
            <option key={wData.week.key} value={idx}>
              Semaine {wData.week.label} · {wData.week.monthLabel} (
              {wData.events.length} séa. · {wData.totalHours}h)
            </option>
          ))}
        </select>

        <button
          type="button"
          disabled={safeWeekIdx >= activeWeeksData.length - 1}
          onClick={() => {
            playClickSound();
            onSelectWeekIdx(
              Math.min(activeWeeksData.length - 1, safeWeekIdx + 1),
            );
          }}
          className="px-2.5 sm:px-3.5 py-2 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 disabled:opacity-30 flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span className="hidden sm:inline">Sem. suiv.</span>
          <ChevronRight className="size-3.5" />
          <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px] font-bold">
            →
          </kbd>
        </button>
      </div>

      <div className="flex items-center justify-between sm:justify-start gap-2 text-xs w-full sm:w-auto">
        <span className="font-mono text-slate-500 text-[11px] sm:text-xs">
          Sem. {safeWeekIdx + 1} / {activeWeeksData.length} actives
        </span>
        <button
          type="button"
          onClick={onJumpToNextUpcomingWeek}
          className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
        >
          <span>Prochaine séance</span>
          <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-white/20 dark:bg-slate-900/20 font-mono text-[10px] font-bold">
            T
          </kbd>
        </button>
      </div>
    </div>
  );
}

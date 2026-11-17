"use client";

import { Award, CalendarDays, TrendingUp } from "lucide-react";

interface WorkoutStatsGridProps {
  masteredCards: number;
  streak: number;
  retentionRate: number;
}

export function WorkoutStatsGrid({
  masteredCards,
  streak,
  retentionRate,
}: WorkoutStatsGridProps) {
  return (
    <div className="grid grid-cols-3 gap-2 py-1">
      <div className="p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
        <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-center gap-1">
          <Award className="size-3 text-emerald-500" />
          <span>Maîtrisées</span>
        </div>
        <div className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 font-mono mt-0.5">
          {masteredCards}
        </div>
      </div>

      <div className="p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
        <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-center gap-1">
          <CalendarDays className="size-3 text-amber-500" />
          <span>Série</span>
        </div>
        <div className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 font-mono mt-0.5">
          {streak} {streak > 1 ? "jours" : "jour"}
        </div>
      </div>

      <div className="p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
        <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-center gap-1">
          <TrendingUp className="size-3 text-indigo-500" />
          <span>Rétention</span>
        </div>
        <div className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 font-mono mt-0.5">
          {retentionRate > 0 ? `${retentionRate}%` : "—"}
        </div>
      </div>
    </div>
  );
}

"use client";

import { BookOpen, Target, BarChart3, Flame } from "lucide-react";
import type { GlobalStats } from "@/lib/pst/hub-stats";

export function StatsCards({ stats }: { stats: GlobalStats }) {
  const items = [
    {
      label: "Modules suivis",
      value: `${stats.active} / 5`,
      icon: BookOpen,
      color: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10",
    },
    {
      label: "Cartes maîtrisées",
      value: `${stats.totMastered} / ${stats.totCards}`,
      icon: Target,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    },
    {
      label: "Score moyen QCM",
      value: stats.avgScore == null ? "—" : `${stats.avgScore}%`,
      icon: BarChart3,
      color: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
    },
    {
      label: "Série d'assiduité",
      value: `${stats.streak} jour${stats.streak > 1 ? "s" : ""}`,
      icon: Flame,
      color: "text-rose-600 dark:text-rose-400 bg-rose-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      {items.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="p-4 bg-slate-50/80 dark:bg-slate-800/40 rounded-xl border border-slate-200/70 dark:border-slate-800 flex items-center gap-3.5 shadow-2xs hover:border-amber-500/30 transition-all"
        >
          <div className={`p-2.5 rounded-xl shrink-0 ${color}`}>
            <Icon className="size-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900 dark:text-slate-100 leading-tight">
              {value}
            </div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              {label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

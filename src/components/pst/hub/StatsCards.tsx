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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
      {items.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="p-4 sm:p-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-200/90 dark:border-slate-800 flex items-center gap-3.5 shadow-xs hover:border-amber-500/40 hover:shadow-sm transition-all group"
        >
          <div className={`p-3 rounded-2xl shrink-0 ring-1 ring-black/5 dark:ring-white/10 ${color}`}>
            <Icon className="size-5 transition-transform group-hover:scale-110" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 dark:text-slate-100 leading-tight">
              {value}
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
              {label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

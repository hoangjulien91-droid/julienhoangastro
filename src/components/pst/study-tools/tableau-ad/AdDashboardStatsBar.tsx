interface AdStats {
  total: number;
  todo: number;
  draft: number;
  ready: number;
  submitted: number;
  corrected: number;
  completed: number;
  percent: number;
}

interface AdDashboardStatsBarProps {
  stats: AdStats;
}

export function AdDashboardStatsBar({ stats }: AdDashboardStatsBarProps) {
  return (
    <div className="px-3.5 py-3 sm:px-6 sm:py-3.5 bg-slate-50/90 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4">
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-slate-600 dark:text-slate-400">
            Progression :
          </span>
          <span className="font-bold text-slate-900 dark:text-white font-mono text-xs sm:text-sm">
            {stats.completed}/{stats.total}
          </span>
          <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">
            ({stats.percent}%)
          </span>
        </div>

        <div className="h-4 w-px bg-slate-200/80 dark:bg-slate-800 hidden sm:block" />

        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span className="text-slate-600 dark:text-slate-400">
            <b className="text-slate-900 dark:text-white">{stats.submitted}</b>{" "}
            déposées
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
          <span className="text-slate-600 dark:text-slate-400">
            <b className="text-slate-900 dark:text-white">{stats.draft}</b>{" "}
            brouillons
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600 shrink-0" />
          <span className="text-slate-600 dark:text-slate-400">
            <b className="text-slate-900 dark:text-white">{stats.todo}</b> à
            faire
          </span>
        </div>
      </div>

      {/* Barre de progression visuelle */}
      <div className="w-full md:w-64 h-2 bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/80 dark:border-slate-700/80">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
          style={{ width: `${stats.percent}%` }}
        />
      </div>
    </div>
  );
}

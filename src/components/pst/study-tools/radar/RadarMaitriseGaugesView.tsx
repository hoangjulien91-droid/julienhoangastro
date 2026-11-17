import { Target, Zap } from "lucide-react";
import type { SousAxeS1 } from "@/lib/pst/data/radar-maitrise-data";

interface RadarMaitriseGaugesViewProps {
  axes: SousAxeS1[];
  weakAxes: SousAxeS1[];
  onStartBootcamp: () => void;
}

export function RadarMaitriseGaugesView({
  axes,
  weakAxes,
  onStartBootcamp,
}: RadarMaitriseGaugesViewProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Radar Grid of 8 Sub-Axes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Niveau de Maîtrise par Sous-Axe Conceptuel :
          </span>
          <span className="text-xs text-slate-500 hidden xs:inline">
            Calculé sur tes entraînements
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {axes.map((ax) => (
            <div
              key={ax.id}
              className="p-3 sm:p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                  {ax.moduleKey.toUpperCase()}
                </span>
                <span
                  className={`text-xs font-bold font-mono ${
                    ax.niveauMaîtrise >= 70
                      ? "text-emerald-600 dark:text-emerald-400"
                      : ax.niveauMaîtrise >= 55
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {ax.niveauMaîtrise}%
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {ax.nom}
              </span>
              {/* Bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    ax.niveauMaîtrise >= 70
                      ? "bg-emerald-500"
                      : ax.niveauMaîtrise >= 55
                        ? "bg-amber-500"
                        : "bg-rose-500"
                  }`}
                  style={{ width: `${ax.niveauMaîtrise}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weak spots summary & Bootcamp trigger */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-purple-50/60 to-white dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900 border border-indigo-200/80 dark:border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase">
            <Target className="h-4 w-4 text-rose-500 dark:text-rose-400 shrink-0" />
            <span>Vos 3 angles morts prioritaires identifiés :</span>
          </div>
          <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-0.5 pl-0 list-none m-0">
            {weakAxes.map((w) => (
              <li key={w.id} className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 dark:bg-rose-400 shrink-0" />
                <span>
                  {w.nom} ({w.niveauMaîtrise}%)
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onStartBootcamp}
          className="w-full sm:w-auto justify-center px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 dark:shadow-indigo-950/60 flex items-center gap-2 cursor-pointer active:scale-95 transition-all shrink-0 min-h-[44px]"
        >
          <Zap className="h-4 w-4 text-amber-300 fill-amber-300" />
          <span>Lancer le Bootcamp (15 min)</span>
        </button>
      </div>
    </div>
  );
}

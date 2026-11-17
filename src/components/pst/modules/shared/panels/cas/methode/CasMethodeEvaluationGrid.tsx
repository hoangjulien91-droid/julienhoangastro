"use client";

import { ShieldCheck } from "lucide-react";
import { METHODE_CRITERIA } from "@/lib/pst/data/cas-cliniques-data";

interface CasMethodeEvaluationGridProps {
  checkedCriteria: boolean[];
  onToggleCriterion: (idx: number) => void;
  onResetCriteria: () => void;
}

export function CasMethodeEvaluationGrid({
  checkedCriteria,
  onToggleCriterion,
  onResetCriteria,
}: CasMethodeEvaluationGridProps) {
  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
          <ShieldCheck className="size-3 text-indigo-600 dark:text-indigo-400" />
          <span>Grille Officielle d&apos;Auto-Évaluation CNAM (12 Critères)</span>
        </span>

        <button
          type="button"
          onClick={onResetCriteria}
          className="text-xs font-mono font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
        >
          Tout réinitialiser
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {METHODE_CRITERIA.map((crit, cIdx) => {
          const isChecked = !!checkedCriteria[cIdx];
          return (
            <label
              key={cIdx}
              onClick={() => onToggleCriterion(cIdx)}
              className={`p-3 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer flex items-start gap-2.5 select-none active:scale-99 ${
                isChecked
                  ? "bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800 text-indigo-950 dark:text-indigo-200 font-medium"
                  : "bg-slate-50/50 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100/80"
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {}}
                className="mt-0.5 size-4 rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-500 shrink-0 cursor-pointer"
              />
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {crit.step}
                  </span>
                  <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded-md bg-black/5 dark:bg-white/10 text-slate-600 dark:text-slate-400">
                    {crit.pts}
                  </span>
                </div>
                <p
                  className={`text-xs m-0 ${isChecked ? "" : "text-slate-600 dark:text-slate-400"}`}
                >
                  {crit.label}
                </p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

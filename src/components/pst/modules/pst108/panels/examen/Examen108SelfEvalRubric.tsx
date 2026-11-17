"use client";

import { Check } from "lucide-react";

interface Examen108SelfEvalRubricProps {
  profName: string;
  criteria: string[];
  checkedIndices: number[];
  onToggleCriterion: (idx: number) => void;
  noteEstimee: number;
  onValidateScore: () => void;
  onGoNextProf: () => void;
}

export function Examen108SelfEvalRubric({
  profName,
  criteria,
  checkedIndices,
  onToggleCriterion,
  noteEstimee,
  onValidateScore,
  onGoNextProf,
}: Examen108SelfEvalRubricProps) {
  const checkedSet = new Set(checkedIndices);

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/25 border border-emerald-500/25 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-200 m-0">
            Auto-évaluation de la sous-épreuve ({profName})
          </h4>
          <p className="text-xs text-emerald-800 dark:text-emerald-300 m-0">
            Cochez les attendus effectivement traités dans votre copie de 1h00 :
          </p>
        </div>
        <div className="text-sm font-mono font-black text-emerald-800 dark:text-emerald-200">
          Note estimée : {noteEstimee} / 20
        </div>
      </div>

      <div className="space-y-2">
        {criteria.map((crit, idx) => {
          const isChecked = checkedSet.has(idx);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onToggleCriterion(idx)}
              className={`w-full p-2.5 rounded-xl border text-left text-xs flex items-start gap-2.5 transition-all cursor-pointer ${
                isChecked
                  ? "bg-white dark:bg-slate-900 border-emerald-500 text-slate-900 dark:text-white"
                  : "bg-white/60 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              <span
                className={`mt-0.5 size-4 rounded border flex items-center justify-center shrink-0 ${
                  isChecked
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "border-slate-400"
                }`}
              >
                {isChecked && <Check className="size-3" />}
              </span>
              <span>{crit}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <button
          type="button"
          onClick={onValidateScore}
          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
        >
          Enregistrer ce score ({noteEstimee}/20)
        </button>

        <button
          type="button"
          onClick={onGoNextProf}
          className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer"
        >
          Passer à l&apos;épreuve 1h00 suivante →
        </button>
      </div>
    </div>
  );
}

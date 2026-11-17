"use client";

import React from "react";
import { CheckCircle2, RotateCcw, Check } from "lucide-react";
import type { AnnalePst123Item } from "@/lib/pst/data/pst123-annales";

interface ExamDebriefViewProps {
  subject: AnnalePst123Item;
  checked: Set<number>;
  saved: boolean;
  onToggleCriterion: (index: number) => void;
  onBackToMenu: () => void;
  onSaveScore: () => void;
}

export const ExamDebriefView: React.FC<ExamDebriefViewProps> = ({
  subject,
  checked,
  saved,
  onToggleCriterion,
  onBackToMenu,
  onSaveScore,
}) => {
  return (
    <div
      id="examDebrief"
      className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-emerald-500/30 dark:border-emerald-500/20 shadow-xs space-y-4 animate-fadeIn"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="size-3 text-emerald-600" />
          <span>Épreuve Terminée · Grille d&apos;Auto-évaluation</span>
        </span>

        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          Score : {checked.size} / {subject.criteria.length} (
          {Math.round((100 * checked.size) / subject.criteria.length)}%)
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed">
        Prends le temps de relire ta copie. Coche ci-dessous les critères de
        déontologie, de posture et de concepts que tu as réussi à intégrer dans
        tes écrits :
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {/* Criteria Checklist */}
        <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 space-y-2.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Critères d&apos;évaluation du jury
          </span>

          <div className="space-y-2">
            {subject.criteria.map((c, i) => {
              const isChecked = checked.has(i);
              return (
                <label
                  key={i}
                  onClick={() => onToggleCriterion(i)}
                  className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer ${
                    isChecked
                      ? "bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 text-indigo-950 dark:text-indigo-200"
                      : "bg-white dark:bg-slate-900 border-slate-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}} // handled by label onClick
                    className="mt-0.5 size-3.5 rounded text-indigo-600 border-slate-300 pointer-events-none"
                  />
                  <span className="flex-1">{c}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Model Solution Accordion */}
        <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 block">
            Corrigé d&apos;Excellence Rédigé
          </span>

          <div
            className="max-h-80 overflow-y-auto text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed space-y-2 prose dark:prose-invert max-w-none pr-1"
            dangerouslySetInnerHTML={{ __html: subject.corrige }}
          />
        </div>
      </div>

      {/* Action Row */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
        <button
          type="button"
          onClick={onBackToMenu}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
        >
          <RotateCcw className="size-3" />
          <span>Retour au menu</span>
        </button>

        <button
          type="button"
          disabled={saved}
          onClick={onSaveScore}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 ${
            saved
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
          }`}
        >
          <Check className="size-3.5" />
          <span>
            {saved ? "Essai enregistré ✓" : "Enregistrer mon score"}
          </span>
        </button>
      </div>
    </div>
  );
};

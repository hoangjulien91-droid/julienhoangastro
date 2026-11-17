"use client";

import {
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import type { CasDeonto123 } from "@/lib/pst/data/tribunal-deonto-data";

interface TribunalDeontoDebriefProps {
  cas: CasDeonto123;
  selectedVerdict: "conforme" | "manquement_code" | "delit_penal" | null;
  onNextCas: () => void;
}

export function TribunalDeontoDebrief({
  cas,
  selectedVerdict,
  onNextCas,
}: TribunalDeontoDebriefProps) {
  const isSuccess = selectedVerdict === cas.qualificationAttendue;

  return (
    <div className="space-y-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 animate-fadeIn text-xs leading-relaxed">
      <div
        className={`p-4 rounded-2xl border space-y-2 ${
          isSuccess
            ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-500/40 text-emerald-950 dark:text-emerald-200"
            : "bg-rose-50/80 dark:bg-rose-950/30 border-rose-500/40 text-rose-950 dark:text-rose-200"
        }`}
      >
        <div className="flex items-center gap-2 font-bold text-sm">
          {isSuccess ? (
            <>
              <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Qualification exacte (+1 point)</span>
            </>
          ) : (
            <>
              <XCircle className="size-4 text-rose-600 dark:text-rose-400 shrink-0" />
              <span>Erreur de qualification juridique</span>
            </>
          )}
        </div>
        <p className="m-0">{cas.explicationJuridique}</p>

        <div className="space-y-1 pt-2 border-t border-slate-200/80 dark:border-slate-700/40">
          <strong className="text-[11px] font-mono uppercase tracking-wider block text-slate-800 dark:text-slate-300">
            Articles et Principes violés à citer à l&apos;examen :
          </strong>
          <ul className="list-disc list-inside space-y-1 text-slate-900 dark:text-slate-200 m-0 pl-0">
            {cas.articlesViolés.map((art, idx) => (
              <li key={idx}>{art}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
        <strong className="text-indigo-700 dark:text-indigo-300 font-mono block uppercase text-[10px]">
          Posture exigée du psychologue du travail :
        </strong>
        <p className="text-slate-700 dark:text-slate-300 m-0">{cas.reponseRecommandee}</p>
      </div>

      <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/30 text-amber-950 dark:text-amber-200 flex items-start gap-2.5">
        <Sparkles className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong>Piège d&apos;examen :</strong> {cas.piegeExamen}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNextCas}
          className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
        >
          <span>Dilemme suivant</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

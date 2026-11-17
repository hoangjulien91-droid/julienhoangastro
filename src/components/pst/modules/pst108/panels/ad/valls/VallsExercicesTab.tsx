"use client";

import React from "react";
import type { Pst108ExerciseValls } from "@/lib/pst/data/pst108-ad";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { Check, Copy, HelpCircle, Sparkles } from "lucide-react";

interface VallsExercicesTabProps {
  exercicesDistanciel?: Pst108ExerciseValls[];
  selectedExNum: number;
  onSelectExNum: (num: number) => void;
  onCopy: (text: string, key: string) => void;
  copiedKey: string | null;
}

export const VallsExercicesTab: React.FC<VallsExercicesTabProps> = ({
  exercicesDistanciel,
  selectedExNum,
  onSelectExNum,
  onCopy,
  copiedKey,
}) => {
  return (
    <div className="space-y-4">
      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-900 dark:text-amber-200">
        <span className="font-bold">Consignes officielles de M. Valls :</span>{" "}
        « En prévision de nos échanges à distance, merci de prendre connaissance
        des consignes ci-jointes pour chacun des 3 exercices suivants et de
        dégager pour vous-même et/ou de rédiger des premiers éléments de
        réponse. »
      </div>

      <div className="flex gap-2">
        {exercicesDistanciel?.map((ex: Pst108ExerciseValls) => (
          <button
            key={ex.id}
            type="button"
            onClick={() => {
              playClickSound();
              onSelectExNum(ex.num);
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              selectedExNum === ex.num
                ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            Exercice {ex.num} ·{" "}
            {ex.num === 1
              ? "R.L. KAHN"
              : ex.num === 2
                ? "Le goût des autres"
                : "Corps & Voix"}
          </button>
        ))}
      </div>

      {exercicesDistanciel
        ?.filter((ex: Pst108ExerciseValls) => ex.num === selectedExNum)
        .map((ex: Pst108ExerciseValls) => (
          <div
            key={ex.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Exercice {ex.num} · Référence : {ex.auteurRef}
                </span>
                <h4 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0">
                  {ex.titre}
                </h4>
              </div>

              <button
                type="button"
                onClick={() =>
                  onCopy(ex.modeleReponse18.syntheseForum, `ex-${ex.num}`)
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors shrink-0"
              >
                {copiedKey === `ex-${ex.num}` ? (
                  <>
                    <Check className="size-3 text-emerald-600" />
                    <span>Copié dans le presse-papier !</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>Copier pour la Webconférence</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-bold text-slate-900 dark:text-white">
                Contexte d&apos;analyse :{" "}
              </span>
              {ex.contexte}
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                <HelpCircle className="size-3.5" />
                <span>Questions posées par M. Valls :</span>
              </div>
              <ul className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1.5 pl-4 list-disc font-medium">
                {ex.questionsOfficielles.map((q, idx) => (
                  <li key={idx} className="leading-snug">
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {ex.conceptsAPrivilegier.map((c, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60"
                >
                  ✦ {c}
                </span>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 via-indigo-500/5 to-slate-50 dark:to-slate-800/50 border border-emerald-500/25 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400" />
                <h5 className="text-xs sm:text-sm font-bold text-emerald-950 dark:text-emerald-200 m-0">
                  Proposition de réponse rédigée d&apos;excellence (Critères
                  18/20) :
                </h5>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {ex.modeleReponse18.analyseDetaillee}
              </div>

              <div className="space-y-1 pt-2 border-t border-emerald-500/20">
                <div className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300">
                  Points clés à valoriser lors de la webconférence :
                </div>
                <ul className="text-[11px] text-emerald-800 dark:text-emerald-400 space-y-0.5 pl-4 list-disc">
                  {ex.modeleReponse18.pointsClesExamen.map((pk, idx) => (
                    <li key={idx}>{pk}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

"use client";

import React from "react";
import {
  Video,
  Quote,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import type { DialogueTurn } from "@/lib/pst/data/autoconfrontation-106-data";

interface AutoconfrontationTurnViewProps {
  turn: DialogueTurn;
  currentTurnIdx: number;
  totalTurns: number;
  selectedChoixId: string | null;
  hasValidated: boolean;
  onSelectChoix: (id: "a" | "b" | "c") => void;
  onValidate: () => void;
  onNextTurn: () => void;
}

export const AutoconfrontationTurnView: React.FC<
  AutoconfrontationTurnViewProps
> = ({
  turn,
  currentTurnIdx,
  totalTurns,
  selectedChoixId,
  hasValidated,
  onSelectChoix,
  onValidate,
  onNextTurn,
}) => {
  return (
    <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs space-y-5">
      {/* Progress Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/25 text-[11px] font-mono font-bold uppercase">
            {turn.phase}
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            {turn.titrePhase}
          </span>
        </div>
        <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
          Étape {currentTurnIdx + 1} / {totalTurns}
        </span>
      </div>

      {/* Video Scene Card */}
      <div className="space-y-3">
        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
          <Video className="size-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider block">
              Scène Vidéo Observée en Séance :
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans m-0">
              {turn.contexteVideo}
            </p>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/25 border border-teal-200/80 dark:border-teal-800/40 relative space-y-1">
          <div className="flex items-center gap-1.5 text-teal-800 dark:text-teal-300 font-bold text-xs">
            <Quote className="size-4 shrink-0" />
            <span>Parole de l&apos;opérateur en direct :</span>
          </div>
          <p className="text-xs sm:text-sm text-teal-950 dark:text-teal-100 font-medium italic leading-relaxed m-0">
            {turn.verbatimOperateur}
          </p>
        </div>
      </div>

      {/* Psychologist choices */}
      <div className="space-y-3 pt-1">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          Quelle est votre relance clinique en tant que psychologue ?
        </span>

        <div className="space-y-2.5">
          {turn.choixPsychologue.map((c) => {
            const isSelected = selectedChoixId === c.id;
            const isOptimal = hasValidated && c.verdict === "optimal";
            const isInadapte =
              hasValidated && isSelected && c.verdict !== "optimal";

            return (
              <button
                key={c.id}
                type="button"
                disabled={hasValidated}
                onClick={() => onSelectChoix(c.id)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${
                  isOptimal
                    ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-semibold"
                    : isInadapte
                      ? "bg-rose-50/80 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-200"
                      : isSelected
                        ? "bg-teal-50/90 dark:bg-teal-500/20 border-teal-500 text-teal-950 dark:text-white font-semibold shadow-2xs"
                        : "bg-slate-50/70 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-800/60"
                }`}
              >
                <div
                  className={`size-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold uppercase ${
                    isSelected
                      ? "bg-teal-600 border-teal-600 text-white"
                      : "border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {c.id}
                </div>
                <div className="space-y-1">
                  <p className="leading-relaxed m-0">{c.texte}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Validation & Feedback */}
      {!hasValidated ? (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            disabled={!selectedChoixId}
            onClick={onValidate}
            className={`w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-xs flex items-center gap-2 ${
              selectedChoixId
                ? "bg-teal-600 hover:bg-teal-700 text-white cursor-pointer active:scale-95"
                : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
            }`}
          >
            <CheckCircle2 className="size-4" />
            <span>Valider la relance</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 animate-fadeIn text-xs leading-relaxed">
          {(() => {
            const chosen = turn.choixPsychologue.find(
              (c) => c.id === selectedChoixId,
            );
            const isWin = chosen?.verdict === "optimal";

            return (
              <div
                className={`p-4 rounded-2xl border space-y-2 ${
                  isWin
                    ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-500/40 text-emerald-950 dark:text-emerald-200"
                    : "bg-amber-50/80 dark:bg-amber-950/30 border-amber-500/40 text-amber-950 dark:text-amber-200"
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {isWin ? (
                    <>
                      <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Posture clinique exemplaire (+5 points)</span>
                    </>
                  ) : (
                    <>
                      <HelpCircle className="size-4 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>Posture discutable (+{chosen?.points} pts)</span>
                    </>
                  )}
                </div>
                <p className="m-0">{chosen?.analyseClinique}</p>

                <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/40 text-slate-900 dark:text-slate-200 font-semibold flex items-start gap-1.5">
                  <Sparkles className="size-3.5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <span>
                    Règle clinique (Yves Clot) : {chosen?.conceptClot}
                  </span>
                </div>
              </div>
            );
          })()}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onNextTurn}
              className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <span>
                {currentTurnIdx < totalTurns - 1
                  ? "Étape suivante"
                  : "Bilan méthodologique"}
              </span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

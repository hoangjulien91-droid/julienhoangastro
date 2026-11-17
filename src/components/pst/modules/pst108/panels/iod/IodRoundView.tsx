"use client";

import React from "react";
import {
  Building,
  CheckCircle2,
  XCircle,
  Quote,
  ArrowRight,
} from "lucide-react";
import type { EtapeNegociation } from "@/lib/pst/data/pst108-iod-data";

interface IodRoundViewProps {
  etape: EtapeNegociation;
  currentEtapeIdx: number;
  totalSteps: number;
  selectedChoixId: string | null;
  hasValidated: boolean;
  onSelectChoix: (id: string) => void;
  onValidateAnswer: () => void;
  onNextStep: () => void;
}

export function IodRoundView({
  etape,
  currentEtapeIdx,
  totalSteps,
  selectedChoixId,
  hasValidated,
  onSelectChoix,
  onValidateAnswer,
  onNextStep,
}: IodRoundViewProps) {
  const chosen = etape.choix.find((c) => c.id === selectedChoixId);

  return (
    <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-7 space-y-6 shadow-xs">
      {/* Progress & Badge */}
      <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
            Dilemme {currentEtapeIdx + 1} / {totalSteps}
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            {etape.objectionType}
          </span>
        </div>
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Barème : 5 points par décision
        </span>
      </div>

      {/* DRH Speech Bubble */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-amber-500 relative space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
          <Building className="size-4 shrink-0" />
          <span>L&apos;Employeur (DRH d&apos;Entreprise) :</span>
        </div>
        <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 italic leading-relaxed m-0">
          {etape.drhReplique}
        </p>
      </div>

      {/* Choices */}
      <div className="space-y-3">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          Quelle est votre réplique de négociation IOD ?
        </span>

        <div className="space-y-2.5">
          {etape.choix.map((c) => {
            const isSelected = selectedChoixId === c.id;
            const isCorrect = hasValidated && c.verdict === "correct";
            const isWrong =
              hasValidated && isSelected && c.verdict !== "correct";

            return (
              <button
                key={c.id}
                type="button"
                disabled={hasValidated}
                onClick={() => onSelectChoix(c.id)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${
                  isCorrect
                    ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-semibold"
                    : isWrong
                      ? "bg-rose-50/80 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-200"
                      : isSelected
                        ? "bg-amber-50/90 dark:bg-amber-500/20 border-amber-500 text-amber-950 dark:text-white font-semibold shadow-2xs"
                        : "bg-slate-50/70 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-800/60"
                }`}
              >
                <div
                  className={`size-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold uppercase ${
                    isSelected
                      ? "bg-amber-600 border-amber-600 text-white"
                      : "border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {c.id}
                </div>
                <div className="space-y-1">
                  <p className="leading-relaxed m-0">{c.reponseTexte}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Validation & Correction */}
      {!hasValidated ? (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            disabled={!selectedChoixId}
            onClick={onValidateAnswer}
            className={`w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-xs flex items-center gap-2 ${
              selectedChoixId
                ? "bg-amber-600 hover:bg-amber-700 text-white cursor-pointer active:scale-95"
                : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
            }`}
          >
            <CheckCircle2 className="size-4" />
            <span>Confirmer ma réponse</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 animate-fadeIn">
          {/* Feedback box */}
          {(() => {
            const isWin = chosen?.verdict === "correct";

            return (
              <div
                className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${
                  isWin
                    ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-500/40 text-emerald-950 dark:text-emerald-200"
                    : "bg-rose-50/80 dark:bg-rose-950/30 border-rose-500/40 text-rose-950 dark:text-rose-200"
                }`}
              >
                <div className="flex items-center gap-2 font-bold font-mono uppercase tracking-wider">
                  {isWin ? (
                    <>
                      <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Posture IOD Optimale (+{chosen?.points} pts)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="size-4 text-rose-600 dark:text-rose-400" />
                      <span>Posture Déconseillée ({chosen?.points} pt)</span>
                    </>
                  )}
                </div>

                <p className="m-0">{chosen?.justificationTheorique}</p>

                <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/40 text-slate-800 dark:text-slate-300 italic flex items-start gap-2">
                  <Quote className="size-3.5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                  <span>{chosen?.citationValls}</span>
                </div>
              </div>
            );
          })()}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onNextStep}
              className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <span>
                {currentEtapeIdx < totalSteps - 1
                  ? "Étape suivante"
                  : "Voir mon bilan IOD"}
              </span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

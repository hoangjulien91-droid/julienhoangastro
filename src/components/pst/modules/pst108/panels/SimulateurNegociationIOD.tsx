"use client";

import { HeartHandshake } from "lucide-react";
import { useIodSimulatorState } from "./iod/useIodSimulatorState";
import { IodRoundView } from "./iod/IodRoundView";
import { IodFinishedView } from "./iod/IodFinishedView";

export function SimulateurNegociationIOD() {
  const {
    currentEtapeIdx,
    selectedChoixId,
    hasValidated,
    totalScore,
    isFinished,
    etape,
    totalSteps,
    handleSelectChoix,
    handleValidateAnswer,
    handleNextStep,
    handleRestart,
  } = useIodSimulatorState();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Intro Banner */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-linear-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 shadow-xs space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            <HeartHandshake className="size-5 sm:size-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Atelier Pratique · Francis VALLS &amp; Denis CASTRA
            </span>
            <h2 className="text-base sm:text-xl font-serif font-black text-slate-900 dark:text-white m-0">
              Simulateur de Négociation IOD en Entreprise
            </h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed m-0 pt-1">
          Vous êtes chargé d&apos;insertion IOD auprès d&apos;une entreprise
          partenaire. Face aux objections récurrentes des employeurs
          (CV, compétences requises, comportement, précarité), choisissez la
          posture conforme à la méthodologie IOD pour lever les freins à
          l&apos;embauche directe.
        </p>
      </div>

      {!isFinished ? (
        <IodRoundView
          etape={etape}
          currentEtapeIdx={currentEtapeIdx}
          totalSteps={totalSteps}
          selectedChoixId={selectedChoixId}
          hasValidated={hasValidated}
          onSelectChoix={handleSelectChoix}
          onValidateAnswer={handleValidateAnswer}
          onNextStep={handleNextStep}
        />
      ) : (
        <IodFinishedView
          totalScore={totalScore}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

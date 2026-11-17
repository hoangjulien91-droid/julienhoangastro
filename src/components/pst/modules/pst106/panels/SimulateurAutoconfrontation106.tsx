"use client";

import { useState } from "react";
import {
  Award,
  Film,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  type DialogueTurn,
  DIALOGUES_AUTOCONFRONTATION,
} from "@/lib/pst/data/autoconfrontation-106-data";
import { AutoconfrontationTurnView } from "./autoconfrontation/AutoconfrontationTurnView";
import { AutoconfrontationFinalView } from "./autoconfrontation/AutoconfrontationFinalView";

export type { DialogueTurn };
export { DIALOGUES_AUTOCONFRONTATION };

export function SimulateurAutoconfrontation106() {
  const [currentTurnIdx, setCurrentTurnIdx] = useState(0);
  const [selectedChoixId, setSelectedChoixId] = useState<string | null>(null);
  const [hasValidated, setHasValidated] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const turn = DIALOGUES_AUTOCONFRONTATION[currentTurnIdx];

  const handleSelectChoix = (id: "a" | "b" | "c") => {
    if (hasValidated) return;
    setSelectedChoixId(id);
    playClickSound();
    triggerHaptic();
  };

  const handleValidate = () => {
    if (!selectedChoixId) return;
    setHasValidated(true);
    const chosen = turn.choixPsychologue.find((c) => c.id === selectedChoixId);
    if (chosen) {
      setScore((s) => s + chosen.points);
      if (chosen.verdict === "optimal") {
        playSuccessSound();
      } else {
        playReviewSound();
      }
      triggerHaptic();
    }
  };

  const handleNextTurn = () => {
    playClickSound();
    triggerHaptic();
    if (currentTurnIdx < DIALOGUES_AUTOCONFRONTATION.length - 1) {
      setCurrentTurnIdx((i) => i + 1);
      setSelectedChoixId(null);
      setHasValidated(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    playClickSound();
    triggerHaptic();
    setCurrentTurnIdx(0);
    setSelectedChoixId(null);
    setHasValidated(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-teal-500/30 bg-gradient-to-br from-teal-500/[0.08] via-white/90 to-emerald-500/[0.06] dark:from-teal-950/40 dark:via-slate-900/90 dark:to-emerald-950/30 p-4 sm:p-6 backdrop-blur-xl shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/15 px-2.5 py-0.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 border border-teal-500/30">
              <Film className="size-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
              <span>PST106 · Méthodologie d&apos;Intervention Clinique</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-serif font-bold tracking-tight text-slate-900 dark:text-white m-0">
              Simulateur d&apos;Autoconfrontation Croisée &amp; Sosie
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed m-0">
              Incarnez le clinicien de l&apos;activité face aux opérateurs.
              Maîtrisez les relances clés pour animer la controverse de métier,
              faire émerger les savoirs tacites et restaurer le pouvoir
              d&apos;agir.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 px-3.5 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-2xs self-start md:self-auto shrink-0">
            <div className="text-right">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block">
                Maîtrise Posture
              </span>
              <span className="text-lg font-mono font-extrabold text-teal-600 dark:text-teal-400">
                {score} / 20
              </span>
            </div>
            <Award className="size-6 sm:size-7 text-teal-600 dark:text-teal-400 shrink-0" />
          </div>
        </div>
      </div>

      {!isFinished ? (
        <AutoconfrontationTurnView
          turn={turn}
          currentTurnIdx={currentTurnIdx}
          totalTurns={DIALOGUES_AUTOCONFRONTATION.length}
          selectedChoixId={selectedChoixId}
          hasValidated={hasValidated}
          onSelectChoix={handleSelectChoix}
          onValidate={handleValidate}
          onNextTurn={handleNextTurn}
        />
      ) : (
        <AutoconfrontationFinalView score={score} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default SimulateurAutoconfrontation106;

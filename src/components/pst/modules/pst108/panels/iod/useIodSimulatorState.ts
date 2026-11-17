import { useState } from "react";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  ETAPES_NEGOCIATION_IOD,
} from "@/lib/pst/data/pst108-iod-data";

export function useIodSimulatorState() {
  const [currentEtapeIdx, setCurrentEtapeIdx] = useState(0);
  const [selectedChoixId, setSelectedChoixId] = useState<string | null>(null);
  const [hasValidated, setHasValidated] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const etape = ETAPES_NEGOCIATION_IOD[currentEtapeIdx];

  const handleSelectChoix = (id: string) => {
    if (hasValidated) return;
    setSelectedChoixId(id);
    playClickSound();
    triggerHaptic("selection");
  };

  const handleValidateAnswer = () => {
    if (!selectedChoixId) return;
    setHasValidated(true);
    const chosen = etape.choix.find((c) => c.id === selectedChoixId);
    if (chosen) {
      setTotalScore((s) => s + chosen.points);

      if (chosen.verdict === "correct") {
        playSuccessSound();
      } else {
        playReviewSound();
      }
    }
  };

  const handleNextStep = () => {
    playClickSound();
    if (currentEtapeIdx < ETAPES_NEGOCIATION_IOD.length - 1) {
      setCurrentEtapeIdx((i) => i + 1);
      setSelectedChoixId(null);
      setHasValidated(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    playClickSound();
    setCurrentEtapeIdx(0);
    setSelectedChoixId(null);
    setHasValidated(false);
    setTotalScore(0);
    setIsFinished(false);
  };

  return {
    currentEtapeIdx,
    selectedChoixId,
    hasValidated,
    totalScore,
    isFinished,
    etape,
    totalSteps: ETAPES_NEGOCIATION_IOD.length,
    handleSelectChoix,
    handleValidateAnswer,
    handleNextStep,
    handleRestart,
  };
}

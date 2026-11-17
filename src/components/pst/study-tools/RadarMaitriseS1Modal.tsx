"use client";

import { useState } from "react";
import { X, Compass } from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  SOUS_AXES_S1_DEFAULTS,
  type SousAxeS1,
} from "@/lib/pst/data/radar-maitrise-data";
import { RadarMaitriseGaugesView } from "./radar/RadarMaitriseGaugesView";
import { RadarMaitriseBootcampView } from "./radar/RadarMaitriseBootcampView";

export { SOUS_AXES_S1_DEFAULTS };
export type { SousAxeS1 };

interface RadarMaitriseS1ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RadarMaitriseS1Modal({
  isOpen,
  onClose,
}: RadarMaitriseS1ModalProps) {
  const [axes] = useState<SousAxeS1[]>(SOUS_AXES_S1_DEFAULTS);
  const [bootcampActive, setBootcampActive] = useState(false);
  const [bootcampIdx, setBootcampIdx] = useState(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(
    null,
  );
  const [hasValidated, setHasValidated] = useState(false);
  const [bootcampScore, setBootcampScore] = useState(0);

  if (!isOpen) return null;

  // Identify weakest 3 axes
  const weakAxes = [...axes]
    .sort((a, b) => a.niveauMaîtrise - b.niveauMaîtrise)
    .slice(0, 3);

  // Flatten questions from weakest axes for bootcamp
  const bootcampQuestions = weakAxes.flatMap((axis) =>
    axis.questionsRecommandees.map((q) => ({
      ...q,
      axisNom: axis.nom,
      moduleKey: axis.moduleKey,
    })),
  );

  const handleStartBootcamp = () => {
    setBootcampActive(true);
    setBootcampIdx(0);
    setSelectedAnswerIdx(null);
    setHasValidated(false);
    setBootcampScore(0);
    playClickSound();
    triggerHaptic();
  };

  const handleValidateAnswer = () => {
    if (selectedAnswerIdx === null) return;
    setHasValidated(true);
    const currentQ = bootcampQuestions[bootcampIdx];
    const isCorrect = selectedAnswerIdx === currentQ.correctIdx;
    if (isCorrect) {
      setBootcampScore((s) => s + 1);
      playSuccessSound();
    } else {
      playReviewSound();
    }
    triggerHaptic();
  };

  const handleNextQuestion = () => {
    playClickSound();
    triggerHaptic();
    setSelectedAnswerIdx(null);
    setHasValidated(false);
    setBootcampIdx((i) => i + 1);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-slate-950/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Radar de Maîtrise S1 — Diagnostic & Entraînement"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-slate-200/90 dark:border-indigo-500/30 bg-white/95 dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-4 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/70 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-9 rounded-xl bg-indigo-500/15 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
              <Compass className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 truncate">
                  Diagnostic &amp; Entraînement
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium shrink-0 hidden xs:inline">
                  Semestre 1 Global
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                Radar de Maîtrise S1 &amp; Bootcamp
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors shrink-0"
            title="Fermer"
            aria-label="Fermer"
          >
            <X className="size-4 sm:size-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6">
          {!bootcampActive ? (
            <RadarMaitriseGaugesView
              axes={axes}
              weakAxes={weakAxes}
              onStartBootcamp={handleStartBootcamp}
            />
          ) : (
            <RadarMaitriseBootcampView
              questions={bootcampQuestions}
              currentIndex={bootcampIdx}
              score={bootcampScore}
              selectedAnswerIdx={selectedAnswerIdx}
              hasValidated={hasValidated}
              onSelectAnswer={setSelectedAnswerIdx}
              onValidateAnswer={handleValidateAnswer}
              onNextQuestion={handleNextQuestion}
              onResetBootcamp={() => setBootcampActive(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

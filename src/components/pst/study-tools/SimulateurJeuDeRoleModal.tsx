"use client";

import { useState, useEffect, useCallback } from "react";
import { X, HeartHandshake } from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playFlipSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  ROLEPLAY_SCENARIOS,
  type ScenarioChoice,
} from "@/lib/pst/data/roleplay-scenarios-data";
import { RoleplayGauges } from "./roleplay/RoleplayGauges";
import { RoleplayDialogueStep } from "./roleplay/RoleplayDialogueStep";
import { RoleplayDebriefingView } from "./roleplay/RoleplayDebriefingView";

export interface SimulateurJeuDeRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

export function SimulateurJeuDeRoleModal({
  isOpen,
  onClose,
  defaultModule,
}: SimulateurJeuDeRoleModalProps) {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    defaultModule === "pst106"
      ? "sc-ergo-106"
      : defaultModule === "pst123"
        ? "sc-rps-123"
        : defaultModule === "pst120"
          ? "sc-dejours-120"
          : defaultModule === "pst124"
            ? "sc-digital-124"
            : "sc-iod-108",
  );

  const [stepIndex, setStepIndex] = useState(0);
  const [allianceScore, setAllianceScore] = useState(50);
  const [deontoScore, setDeontoScore] = useState(50);
  const [chosenOptionId, setChosenOptionId] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const resetGame = useCallback((scenarioId: string) => {
    setSelectedScenarioId(scenarioId);
    setStepIndex(0);
    setAllianceScore(50);
    setDeontoScore(50);
    setChosenOptionId(null);
    setIsFinished(false);
  }, []);

  useEffect(() => {
    if (defaultModule) {
      const match = ROLEPLAY_SCENARIOS.find((s) => s.moduleKey === defaultModule);
      if (match) {
        resetGame(match.id);
      }
    }
  }, [defaultModule, isOpen, resetGame]);

  const currentScenario =
    ROLEPLAY_SCENARIOS.find((s) => s.id === selectedScenarioId) || ROLEPLAY_SCENARIOS[0]!;

  const currentStep = currentScenario.etapes[stepIndex];

  if (!isOpen) return null;

  function handleChoose(choice: ScenarioChoice) {
    if (chosenOptionId !== null) return;
    setChosenOptionId(choice.id);

    if (choice.isOptimal) {
      triggerHaptic("success");
      playSuccessSound();
    } else {
      triggerHaptic("selection");
      playFlipSound();
    }

    setAllianceScore((prev) =>
      Math.max(0, Math.min(100, prev + choice.impactAlliance)),
    );
    setDeontoScore((prev) =>
      Math.max(0, Math.min(100, prev + choice.impactDeonto)),
    );
  }

  function handleNext() {
    triggerHaptic("selection");
    playClickSound();
    setChosenOptionId(null);
    if (stepIndex < currentScenario.etapes.length - 1) {
      setStepIndex((idx) => idx + 1);
    } else {
      setIsFinished(true);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Simulateur Jeu de Rôle Clinique & Posture"
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header iOS */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-teal-500/10 via-indigo-500/10 to-amber-500/10 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-10 rounded-2xl bg-gradient-to-tr from-teal-600 to-indigo-600 flex items-center justify-center text-white shadow-md shrink-0">
              <HeartHandshake className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 m-0 truncate">
                <span className="truncate">Jeu de Rôle Clinique</span>
                <span className="hidden sm:inline text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-800 dark:text-teal-200 font-extrabold uppercase shrink-0">
                  Posture
                </span>
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate m-0">
                Incarnez le psychologue face aux dilemmes d&apos;entreprise
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 flex items-center justify-center transition-all cursor-pointer shrink-0"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Scenario Switcher */}
        <div className="p-3 border-b border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
          {ROLEPLAY_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => {
                playClickSound();
                resetGame(sc.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
                selectedScenarioId === sc.id
                  ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                  : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              }`}
            >
              {sc.moduleKey.toUpperCase()} · {sc.titre.slice(0, 24)}...
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Status Gauges: Alliance vs Déontologie */}
          <RoleplayGauges
            allianceScore={allianceScore}
            deontoScore={deontoScore}
          />

          {!isFinished ? (
            <RoleplayDialogueStep
              scenario={currentScenario}
              step={currentStep}
              stepIndex={stepIndex}
              totalSteps={currentScenario.etapes.length}
              chosenOptionId={chosenOptionId}
              onChoose={handleChoose}
              onNext={handleNext}
            />
          ) : (
            <RoleplayDebriefingView
              allianceScore={allianceScore}
              deontoScore={deontoScore}
              debriefingFinal={currentScenario.debriefingFinal}
              onReplay={() => resetGame(currentScenario.id)}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}

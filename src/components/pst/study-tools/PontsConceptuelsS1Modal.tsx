"use client";

import { useState } from "react";
import {
  X,
  Compass,
  Sparkles,
  Layers,
} from "lucide-react";
import {
  CONCEPTS_TRANSVERSAUX_S1,
  QUIZ_TRANSVERSAL_S1,
  type ConceptTransversalS1,
  type QuizQuestionTransversale,
} from "@/lib/pst/data/ponts-s1";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { PontsS1ComparateurView } from "./ponts-s1/PontsS1ComparateurView";
import { PontsS1QuizView } from "./ponts-s1/PontsS1QuizView";

interface PontsConceptuelsS1ModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultConceptId?: string;
}

export function PontsConceptuelsS1Modal({
  isOpen,
  onClose,
  defaultConceptId,
}: PontsConceptuelsS1ModalProps) {
  const [activeView, setActiveView] = useState<"comparateur" | "quiz">(
    "comparateur",
  );
  const [selectedConceptId, setSelectedConceptId] = useState<string>(
    defaultConceptId ?? CONCEPTS_TRANSVERSAUX_S1[0].id,
  );
  const [copiedFormula, setCopiedFormula] = useState(false);

  // Quiz state
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasValidatedQuiz, setHasValidatedQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [solvedQuestions, setSolvedQuestions] = useState<
    Record<string, boolean>
  >({});

  if (!isOpen) return null;

  const currentConcept: ConceptTransversalS1 =
    CONCEPTS_TRANSVERSAUX_S1.find((c) => c.id === selectedConceptId) ??
    CONCEPTS_TRANSVERSAUX_S1[0];

  const currentQuiz: QuizQuestionTransversale =
    QUIZ_TRANSVERSAL_S1[currentQuizIdx] ?? QUIZ_TRANSVERSAL_S1[0];

  const handleCopyFormula = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormula(true);
    playClickSound();
    triggerHaptic();
    setTimeout(() => setCopiedFormula(false), 2000);
  };

  const handleValidateQuiz = () => {
    if (!selectedOptionId) return;
    setHasValidatedQuiz(true);
    const selected = currentQuiz.options.find((o) => o.id === selectedOptionId);
    if (selected?.isCorrect) {
      playSuccessSound();
      triggerHaptic();
      if (!solvedQuestions[currentQuiz.id]) {
        setQuizScore((s) => s + 1);
        setSolvedQuestions((prev) => ({ ...prev, [currentQuiz.id]: true }));
      }
    } else {
      playReviewSound();
      triggerHaptic();
    }
  };

  const handleNextQuiz = () => {
    playClickSound();
    triggerHaptic();
    setSelectedOptionId(null);
    setHasValidatedQuiz(false);
    setCurrentQuizIdx((i) => (i + 1) % QUIZ_TRANSVERSAL_S1.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Ponts Conceptuels S1 — Comparateur Épistémologique"
    >
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-2xl border border-slate-200/90 dark:border-indigo-500/30 bg-white/95 dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-4 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/50 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-9 rounded-xl bg-indigo-500/15 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
              <Compass className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 truncate">
                  Ponts Conceptuels S1
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium shrink-0 hidden xs:inline">
                  PST106 · PST108 · PST123
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                Comparateur Épistémologique S1
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="flex items-center bg-slate-200/80 dark:bg-slate-800/80 p-0.5 sm:p-1 rounded-lg border border-slate-300/80 dark:border-slate-700">
              <button
                onClick={() => {
                  setActiveView("comparateur");
                  playClickSound();
                }}
                className={`px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                  activeView === "comparateur"
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <Layers className="size-3" />
                <span className="hidden sm:inline">Grille 3 Colonnes</span>
                <span className="sm:hidden">Grille</span>
              </button>
              <button
                onClick={() => {
                  setActiveView("quiz");
                  playClickSound();
                }}
                className={`px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                  activeView === "quiz"
                    ? "bg-emerald-600 text-white shadow"
                    : "text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300"
                }`}
              >
                <Sparkles className="size-3" />
                <span className="hidden sm:inline">
                  Quiz ({quizScore}/{QUIZ_TRANSVERSAL_S1.length})
                </span>
                <span className="sm:hidden">Quiz</span>
              </button>
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
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6">
          {activeView === "comparateur" ? (
            <PontsS1ComparateurView
              concepts={CONCEPTS_TRANSVERSAUX_S1}
              currentConcept={currentConcept}
              onSelectConcept={setSelectedConceptId}
              copiedFormula={copiedFormula}
              onCopyFormula={handleCopyFormula}
            />
          ) : (
            <PontsS1QuizView
              currentQuiz={currentQuiz}
              currentQuizIdx={currentQuizIdx}
              totalQuiz={QUIZ_TRANSVERSAL_S1.length}
              quizScore={quizScore}
              selectedOptionId={selectedOptionId}
              onSelectOption={setSelectedOptionId}
              hasValidatedQuiz={hasValidatedQuiz}
              onValidateQuiz={handleValidateQuiz}
              onNextQuiz={handleNextQuiz}
            />
          )}
        </div>
      </div>
    </div>
  );
}

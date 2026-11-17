"use client";

import { useEffect, useState } from "react";
import { X, Quote } from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playFlipSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  BLIND_TEST_POOL,
  type BlindTestItem,
} from "@/lib/pst/data/blind-test-data";
import { BlindTestQuestionView } from "./blind-test/BlindTestQuestionView";
import { BlindTestFinishedView } from "./blind-test/BlindTestFinishedView";

export { BLIND_TEST_POOL };
export type { BlindTestItem };

interface BlindTestAudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

const MODULE_FILTERS = [
  { key: "all", label: "Toutes" },
  { key: "pst106", label: "PST106 · Activité" },
  { key: "pst108", label: "PST108 · Dialogue" },
  { key: "pst120", label: "PST120 · Psychodynamique" },
  { key: "pst123", label: "PST123 · Travail & emploi" },
  { key: "pst124", label: "PST124 · Digital" },
];

export function BlindTestAudioModal({
  isOpen,
  onClose,
  defaultModule,
}: BlindTestAudioModalProps) {
  const [selectedModule, setSelectedModule] = useState<string>(
    defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)
      ? defaultModule
      : "all",
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chosenAuthor, setChosenAuthor] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)) {
      setSelectedModule(defaultModule);
      setCurrentIndex(0);
      setChosenAuthor(null);
      setIsFinished(false);
    }
  }, [defaultModule, isOpen]);

  const filteredPool = BLIND_TEST_POOL.filter((item) =>
    selectedModule === "all" ? true : item.moduleKey === selectedModule,
  );

  const currentItem = filteredPool[currentIndex] || filteredPool[0]!;

  if (!isOpen) return null;

  function handleChooseAuthor(author: string) {
    if (chosenAuthor !== null) return;
    setChosenAuthor(author);

    const isCorrect = author === currentItem.auteurCorrect;
    if (isCorrect) {
      triggerHaptic("success");
      playSuccessSound();
      const bonus = streak >= 2 ? 15 : 10;
      setScore((s) => s + bonus);
      setStreak((st) => st + 1);
      window.dispatchEvent(new CustomEvent("pst:detective-solved"));
    } else {
      triggerHaptic("error");
      playFlipSound();
      setStreak(0);
    }
  }

  function handleNext() {
    triggerHaptic("selection");
    playClickSound();
    setChosenAuthor(null);

    if (currentIndex < filteredPool.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsFinished(true);
    }
  }

  function handleRestart() {
    triggerHaptic("selection");
    playSuccessSound();
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setChosenAuthor(null);
    setIsFinished(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Citations Mystères (Blind Test)"
    >
      <div
        className="relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-3xl bg-white/95 dark:bg-slate-900 text-slate-900 dark:text-slate-100 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête Feuille Modale */}
        <div className="flex items-center justify-between px-3.5 py-3 sm:px-6 sm:py-5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-amber-500/10 gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-white shadow-md shrink-0">
              <Quote className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="truncate">Citations Mystères</span>
                <span className="text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-800 dark:text-violet-200 font-extrabold uppercase shrink-0">
                  Quiz Actif
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 truncate hidden xs:block">
                Identifiez l&apos;auteur sans regarder vos notes
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center transition-all cursor-pointer shrink-0"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Filter Bar par Module */}
        <div className="px-3.5 py-2.5 sm:px-6 sm:py-3 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/60 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Module :
          </span>
          {MODULE_FILTERS.map((f) => {
            const isCurrent = selectedModule === f.key;
            const count =
              f.key === "all"
                ? BLIND_TEST_POOL.length
                : BLIND_TEST_POOL.filter((i) => i.moduleKey === f.key).length;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => {
                  triggerHaptic("selection");
                  playClickSound();
                  setSelectedModule(f.key);
                  setCurrentIndex(0);
                  setChosenAuthor(null);
                  setIsFinished(false);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
                  isCurrent
                    ? "bg-violet-600 text-white border-violet-600 shadow-sm"
                    : "bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:border-violet-300"
                }`}
              >
                <span>{f.label}</span>
                <span className="ml-1 opacity-75 font-mono text-[10px]">
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4">
          {!isFinished ? (
            <BlindTestQuestionView
              currentItem={currentItem}
              currentIndex={currentIndex}
              totalQuestions={filteredPool.length}
              score={score}
              streak={streak}
              chosenAuthor={chosenAuthor}
              onChooseAuthor={handleChooseAuthor}
              onNext={handleNext}
            />
          ) : (
            <BlindTestFinishedView
              score={score}
              onRestart={handleRestart}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { X, Zap } from "lucide-react";
import {
  triggerHaptic,
  playSuccessSound,
  playFlipSound,
} from "@/lib/pst/audio-feedback";
import {
  SPEEDRUN_BANK,
  formatTimerSeconds,
  computeGrade20,
} from "@/lib/pst/data/speedrun-data";
import { SpeedRunReadyView } from "./speedrun/SpeedRunReadyView";
import { SpeedRunPlayingView } from "./speedrun/SpeedRunPlayingView";
import { SpeedRunFinishedView } from "./speedrun/SpeedRunFinishedView";

export interface SpeedRunChronoModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

export function SpeedRunChronoModal({
  isOpen,
  onClose,
  defaultModule,
}: SpeedRunChronoModalProps) {
  const [moduleFilter, setModuleFilter] = useState<string>(
    defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)
      ? defaultModule
      : "all",
  );

  useEffect(() => {
    if (defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)) {
      setModuleFilter(defaultModule);
    }
  }, [defaultModule, isOpen]);

  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">(
    "ready",
  );
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [answeredMap, setAnsweredMap] = useState<
    Record<number, { choice: number; isCorrect: boolean }>
  >({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pool de questions mélangées
  const activeQuestions = useMemo(() => {
    const list = SPEEDRUN_BANK.filter((q) =>
      moduleFilter === "all" ? true : q.moduleKey === moduleFilter,
    );
    // Shuffle stable par session de jeu
    return [...list].sort(() => Math.sin(list.length) - 0.5);
  }, [moduleFilter]);

  const currentQ = activeQuestions[currentIndex];

  useEffect(() => {
    if (gameState !== "playing") {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setGameState("finished");
          window.dispatchEvent(new CustomEvent("pst:speed-run-completed"));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  const handleStart = useCallback(() => {
    triggerHaptic("selection");
    playSuccessSound();
    setTimeLeft(180);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setAnsweredMap({});
    setGameState("playing");
  }, []);

  const advanceNext = useCallback(() => {
    if (nextTimerRef.current) clearTimeout(nextTimerRef.current);
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setGameState("finished");
      window.dispatchEvent(new CustomEvent("pst:speed-run-completed"));
    }
  }, [currentIndex, activeQuestions.length]);

  const handleAnswer = useCallback((choiceIdx: number) => {
    if (!currentQ || answeredMap[currentIndex] !== undefined) return;

    const isCorrect = choiceIdx === currentQ.correctIdx;
    if (isCorrect) {
      triggerHaptic("success");
      playSuccessSound();
      const bonus = streak >= 2 ? 15 : 10;
      setScore((s) => s + bonus);
      setStreak((st) => {
        const next = st + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      triggerHaptic("error");
      playFlipSound();
      setStreak(0);
    }

    setAnsweredMap((prev) => ({
      ...prev,
      [currentIndex]: { choice: choiceIdx, isCorrect },
    }));

    // Passer à la question suivante après 600ms
    if (nextTimerRef.current) clearTimeout(nextTimerRef.current);
    nextTimerRef.current = setTimeout(() => {
      advanceNext();
    }, 600);
  }, [currentQ, answeredMap, currentIndex, streak, maxStreak, advanceNext]);

  // Contrôles 100% au clavier : 1, 2, 3, 4 pour répondre, Entrée/Espace pour accélérer ou démarrer
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      const tgt = e.target as HTMLElement | null;
      if (
        tgt &&
        (tgt.tagName === "INPUT" ||
          tgt.tagName === "TEXTAREA" ||
          tgt.isContentEditable)
      ) {
        return;
      }

      if (gameState === "ready") {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleStart();
        }
      } else if (gameState === "playing") {
        if (e.key === "1") {
          e.preventDefault();
          handleAnswer(0);
        } else if (e.key === "2") {
          e.preventDefault();
          handleAnswer(1);
        } else if (e.key === "3") {
          e.preventDefault();
          handleAnswer(2);
        } else if (e.key === "4") {
          e.preventDefault();
          handleAnswer(3);
        } else if (e.key === "Enter" || e.key === " ") {
          // Si la question courante a déjà été répondue, passer immédiatement
          if (answeredMap[currentIndex] !== undefined) {
            e.preventDefault();
            advanceNext();
          }
        }
      } else if (gameState === "finished") {
        if (e.key === "Enter" || e.key === " " || e.key.toLowerCase() === "r") {
          e.preventDefault();
          handleStart();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, gameState, currentIndex, answeredMap, handleStart, handleAnswer, advanceNext]);

  if (!isOpen) return null;

  const correctCount = Object.values(answeredMap).filter((a) => a.isCorrect).length;
  const grade18_20 = computeGrade20(correctCount, activeQuestions.length);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Sprint Chronométré 3 Minutes"
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-white/95 dark:bg-slate-900 text-slate-900 dark:text-slate-100 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête Feuille Modale */}
        <div className="flex items-center justify-between px-3.5 py-3 sm:px-6 sm:py-5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-md shrink-0">
              <Zap className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5 sm:gap-2 m-0 truncate">
                <span className="truncate">Sprint Chrono 3 Min</span>
                <span className="text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-200 font-extrabold uppercase shrink-0">
                  180s
                </span>
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 truncate m-0">
                180s pour tester vos automatismes d&apos;examen Cnam
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4">
          {gameState === "ready" && (
            <SpeedRunReadyView
              moduleFilter={moduleFilter}
              onSelectFilter={setModuleFilter}
              onStart={handleStart}
            />
          )}

          {gameState === "playing" && currentQ && (
            <SpeedRunPlayingView
              currentQ={currentQ}
              currentIndex={currentIndex}
              totalQuestions={activeQuestions.length}
              timeLeft={timeLeft}
              score={score}
              streak={streak}
              answeredMap={answeredMap}
              onAnswer={handleAnswer}
              formatTimer={formatTimerSeconds}
            />
          )}

          {gameState === "finished" && (
            <SpeedRunFinishedView
              timeLeft={timeLeft}
              score={score}
              grade18_20={grade18_20}
              maxStreak={maxStreak}
              onRestart={handleStart}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}

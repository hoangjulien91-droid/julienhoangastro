"use client";

import { useEffect, useRef } from "react";
import { useJourJQuizState } from "./quiz/useJourJQuizState";
import { JourJQuizResults } from "./quiz/JourJQuizResults";
import { JourJQuizQuestionView } from "./quiz/JourJQuizQuestionView";

interface JourJQuizProps {
  onClose: () => void;
}

export function JourJQuiz({ onClose }: JourJQuizProps) {
  const {
    items,
    idx,
    score,
    answered,
    finished,
    remaining,
    current,
    choose,
    next,
    restart,
    pct,
    progressPct,
    isUrgent,
    verdict,
  } = useJourJQuizState();

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Sprint Quiz du Jour J"
        tabIndex={-1}
        className="w-full max-w-lg p-5 sm:p-7 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800 shadow-2xl backdrop-blur-xl space-y-4 max-h-[90vh] overflow-y-auto text-slate-900 dark:text-slate-100 outline-hidden"
      >
        {finished || idx >= items.length ? (
          <JourJQuizResults
            score={score}
            total={items.length}
            pct={pct}
            verdict={verdict}
            onRestart={restart}
            onClose={onClose}
          />
        ) : (
          <JourJQuizQuestionView
            current={current}
            idx={idx}
            total={items.length}
            score={score}
            remaining={remaining}
            isUrgent={isUrgent}
            progressPct={progressPct}
            answered={answered}
            onChoose={choose}
            onNext={next}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}

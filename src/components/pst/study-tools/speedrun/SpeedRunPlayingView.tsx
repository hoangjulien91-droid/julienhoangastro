"use client";

import {
  Timer,
  Trophy,
  Flame,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";
import type { SpeedRunQuestion } from "@/lib/pst/data/speedrun-data";

interface SpeedRunPlayingViewProps {
  currentQ: SpeedRunQuestion;
  currentIndex: number;
  totalQuestions: number;
  timeLeft: number;
  score: number;
  streak: number;
  answeredMap: Record<number, { choice: number; isCorrect: boolean }>;
  onAnswer: (choiceIdx: number) => void;
  formatTimer: (sec: number) => string;
}

export function SpeedRunPlayingView({
  currentQ,
  currentIndex,
  totalQuestions,
  timeLeft,
  score,
  streak,
  answeredMap,
  onAnswer,
  formatTimer,
}: SpeedRunPlayingViewProps) {
  const answered = answeredMap[currentIndex];

  return (
    <div className="space-y-4">
      {/* Status Bar: Time, Score, Combo */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-[11px] sm:text-xs">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <Timer
            className={`size-3.5 sm:size-4 shrink-0 ${timeLeft < 30 ? "text-rose-500 animate-ping" : "text-amber-500"}`}
          />
          <span
            className={`font-mono font-bold text-xs sm:text-base truncate ${timeLeft < 30 ? "text-rose-600 font-black" : "text-slate-900 dark:text-white"}`}
          >
            {formatTimer(timeLeft)}
          </span>
        </div>

        <div className="flex items-center justify-center gap-1 sm:gap-1.5 min-w-0">
          <Trophy className="size-3.5 sm:size-4 text-amber-500 shrink-0" />
          <span className="font-bold text-slate-900 dark:text-white truncate">
            {score} pts
          </span>
        </div>

        <div className="flex items-center justify-end gap-1 sm:gap-1.5 min-w-0">
          <Flame
            className={`size-3.5 sm:size-4 shrink-0 ${streak >= 2 ? "text-rose-500 animate-bounce" : "text-slate-600 dark:text-slate-400"}`}
          />
          <span className="font-bold text-rose-600 dark:text-rose-400 truncate">
            x{streak >= 2 ? streak : 1}
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="p-3 sm:p-5 rounded-3xl bg-white dark:bg-slate-900/80 border-2 border-amber-500/30 shadow-md space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
          <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-bold uppercase tracking-wider text-[10px]">
            {currentQ.moduleKey.toUpperCase()} · {currentQ.auteurRef}
          </span>
          <span className="font-mono text-slate-600 dark:text-slate-400 font-bold shrink-0">
            Q. {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug m-0">
          {currentQ.question}
        </h3>

        {/* Options List */}
        <div className="space-y-2 pt-1">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = answered?.choice === optIdx;
            const isCorrect = optIdx === currentQ.correctIdx;

            let btnStyle =
              "bg-slate-50/90 dark:bg-slate-950/60 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-900 dark:text-white";

            if (answered) {
              if (isCorrect) {
                btnStyle =
                  "bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold shadow-xs";
              } else if (isSelected && !answered.isCorrect) {
                btnStyle =
                  "bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-200 font-bold";
              } else {
                btnStyle =
                  "opacity-40 bg-slate-50/90 dark:bg-slate-950/60 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400";
              }
            }

            return (
              <button
                key={optIdx}
                type="button"
                disabled={answered !== undefined}
                onClick={() => onAnswer(optIdx)}
                className={`w-full min-h-[44px] p-3 sm:p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-2.5 cursor-pointer active:scale-98 ${btnStyle}`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="size-5 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                    {optIdx + 1}
                  </span>
                  <span className="leading-snug">{opt}</span>
                </div>
                {answered && isCorrect && (
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                )}
                {answered && isSelected && !answered.isCorrect && (
                  <XCircle className="size-4 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-2 flex-wrap text-[11px] text-slate-600 dark:text-slate-400 font-mono pt-1">
          <span className="hidden sm:inline">💡 Clavier : [1] [2] [3] [4]</span>
          <span className="sm:hidden font-sans">Appuyez pour répondre</span>
          {answered !== undefined && (
            <span className="text-amber-600 dark:text-amber-400 font-bold animate-pulse">
              Appuyez sur [Entrée] pour accélérer
            </span>
          )}
        </div>

        {answered && (
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-900 dark:text-amber-200 animate-fadeIn space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-amber-600 shrink-0" />
              <span>Argument 18/20 du professeur :</span>
            </p>
            <p className="leading-relaxed">
              {currentQ.explication18_20}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

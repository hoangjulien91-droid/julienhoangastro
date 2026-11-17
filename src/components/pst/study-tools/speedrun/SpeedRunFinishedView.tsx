"use client";

import { Trophy, RotateCcw } from "lucide-react";

interface SpeedRunFinishedViewProps {
  timeLeft: number;
  score: number;
  grade18_20: string;
  maxStreak: number;
  onRestart: () => void;
  onClose: () => void;
}

export function SpeedRunFinishedView({
  timeLeft,
  score,
  grade18_20,
  maxStreak,
  onRestart,
  onClose,
}: SpeedRunFinishedViewProps) {
  return (
    <div className="py-6 text-center space-y-5 animate-fadeIn">
      <div className="inline-flex size-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white items-center justify-center shadow-lg">
        <Trophy className="size-10 animate-bounce" />
      </div>

      <div className="space-y-1">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white">
          Session Terminée !
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {timeLeft <= 0
            ? "Temps écoulé !"
            : "Toutes les questions complétées !"}
        </p>
      </div>

      {/* Score Recap Card */}
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2 sm:gap-2.5 p-3.5 sm:p-4 rounded-3xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-center">
        <div>
          <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block">
            Score Final
          </span>
          <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">
            {score}
          </span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block">
            Note Équivalente
          </span>
          <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {grade18_20} / 20
          </span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block">
            Max Streak
          </span>
          <span className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400">
            x{maxStreak}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onRestart}
          className="px-5 sm:px-6 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="size-4" />
          <span>Recommencer</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-5 sm:px-6 py-2.5 rounded-2xl bg-slate-200/80 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs sm:text-sm hover:bg-slate-300 dark:hover:bg-slate-700 transition-all cursor-pointer"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

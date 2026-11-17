"use client";

import { Award, RotateCcw } from "lucide-react";

interface JourJQuizResultsProps {
  score: number;
  total: number;
  pct: number;
  verdict: string;
  onRestart: () => void;
  onClose: () => void;
}

export function JourJQuizResults({
  score,
  total,
  pct,
  verdict,
  onRestart,
  onClose,
}: JourJQuizResultsProps) {
  return (
    <div className="text-center space-y-4 py-2">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
        <Award className="size-3.5 text-indigo-600" />
        <span>Sprint Jour J Terminé</span>
      </span>

      <div className="space-y-1">
        <div className="text-4xl font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
          {score} / {total}
        </div>
        <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-200">
          {pct}% de réussite
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
        {verdict}
      </p>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer active:scale-95"
        >
          <RotateCcw className="size-3.5" />
          <span>Nouveau sprint</span>
        </button>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center px-4 py-2 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

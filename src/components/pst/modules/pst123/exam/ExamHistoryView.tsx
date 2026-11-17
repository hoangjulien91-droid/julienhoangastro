"use client";

import React from "react";
import { History, Trash2 } from "lucide-react";

interface ExamHistoryEntry {
  date: string;
  type?: string;
  score: number;
  total: number;
}

interface ExamHistoryViewProps {
  history: ExamHistoryEntry[];
  onClearHistory: () => void;
}

export const ExamHistoryView: React.FC<ExamHistoryViewProps> = ({
  history,
  onClearHistory,
}) => {
  return (
    <div
      id="examHistoryCard"
      className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3.5"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          <History className="size-3 text-slate-500" />
          <span>Historique de vos examens blancs</span>
        </span>

        {history.length > 0 && (
          <button
            type="button"
            onClick={onClearHistory}
            className="inline-flex items-center gap-1 text-[11px] font-mono text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
          >
            <Trash2 className="size-3" />
            <span>Effacer l&apos;historique</span>
          </button>
        )}
      </div>

      <div className="space-y-2">
        {history.length === 0 ? (
          <div className="p-4 text-center rounded-2xl bg-slate-50/50 dark:bg-slate-950/30 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500 italic">
            Aucun essai enregistré pour le moment. Réalisez un premier examen
            blanc pour suivre votre progression.
          </div>
        ) : (
          history.map((h, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between text-xs font-mono"
            >
              <span className="text-slate-700 dark:text-slate-300 font-semibold">
                {h.date} {h.type ? `· ${h.type}` : ""}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-bold">
                {h.score} / {h.total} (
                {Math.round((100 * h.score) / (h.total || 1))}%)
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

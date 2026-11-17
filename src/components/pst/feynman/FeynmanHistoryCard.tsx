"use client";

import type { FeynmanAttempt } from "@/lib/pst/store";

interface FeynmanHistoryCardProps {
  history: FeynmanAttempt[];
}

export function FeynmanHistoryCard({ history }: FeynmanHistoryCardProps) {
  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs">
      <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3.5 m-0">
        Historique de vos explications
      </h3>
      <div id="feynmanHistoryList" className="space-y-3">
        {history.length === 0 ? (
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center py-6 italic">
            Aucun essai précédent pour ce concept.
          </div>
        ) : (
          history.map((item, i) => {
            const dateStr = new Date(item.timestamp).toLocaleDateString(
              "fr-FR",
              { hour: "2-digit", minute: "2-digit" },
            );
            const scoreBadgeColor =
              item.score >= 80
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                : item.score >= 50
                  ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30"
                  : "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30";
            return (
              <div
                key={i}
                className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/60 backdrop-blur-md shadow-2xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded-lg text-xs font-black border ${scoreBadgeColor}`}
                  >
                    Tentative : {item.score}%
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                    {dateStr}
                  </span>
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  &quot;{item.userText}&quot;
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

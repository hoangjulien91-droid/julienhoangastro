"use client";

import { Scale } from "lucide-react";

export interface FlatItem {
  text: string;
  pair: [string, string];
  correct: number;
  crit: string;
}

interface DistinguerCardProps {
  item: FlatItem;
  idx: number;
  total: number;
  ans: number | null;
  onAnswer: (idx: number, selected: number) => void;
}

export function DistinguerCard({
  item,
  idx,
  total,
  ans,
  onAnswer,
}: DistinguerCardProps) {
  const isAnswered = ans !== null;

  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
          <Scale className="size-3 text-indigo-600 dark:text-indigo-400" />
          <span>
            Distinguer les concepts · #{idx + 1} / {total}
          </span>
        </span>

        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          {item.pair[0]} vs {item.pair[1]}
        </span>
      </div>

      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
        <p className="text-xs sm:text-sm italic leading-relaxed text-slate-800 dark:text-slate-200 m-0 font-medium">
          « {item.text} »
        </p>
      </div>

      {/* 2-Way Choice Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {item.pair.map((label, oIdx) => {
          let btnCls =
            "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200";

          if (isAnswered) {
            if (oIdx === item.correct) {
              btnCls =
                "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-bold shadow-xs";
            } else if (oIdx === ans) {
              btnCls =
                "bg-rose-50/80 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200 font-semibold";
            } else {
              btnCls =
                "opacity-40 bg-slate-50/40 dark:bg-slate-800/30 border-slate-200/40 text-slate-500 dark:text-slate-500";
            }
          }

          return (
            <button
              key={oIdx}
              disabled={isAnswered}
              onClick={() => onAnswer(idx, oIdx)}
              className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center text-center active:scale-98 ${btnCls}`}
            >
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation callout */}
      {isAnswered && (
        <div
          className={`p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
            ans === item.correct
              ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200"
              : "bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200"
          }`}
        >
          <div className="font-bold mb-1">
            {ans === item.correct ? "✓ Correct !" : "✗ Incorrect."}
          </div>
          <div>
            <b>{item.pair[item.correct]}</b> —{" "}
            <span className="italic">{item.crit}</span>
          </div>
        </div>
      )}
    </div>
  );
}

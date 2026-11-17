"use client";

import { useState } from "react";
import type { QcmItem } from "@/lib/pst/types";
import { CheckCircle2, XCircle, Lightbulb, HelpCircle } from "lucide-react";

export interface OrderedOption {
  opt: string;
  i: number;
}

interface QcmQuestionViewProps {
  q: QcmItem;
  idx: number;
  total: number;
  order: OrderedOption[];
  answered: number | null;
  onAnswer: (selected: number) => void;
  isFocus?: boolean;
}

export function QcmQuestionView({
  q,
  idx,
  total,
  order,
  answered,
  onAnswer,
  isFocus,
}: QcmQuestionViewProps) {
  const [hintShown, setHintShown] = useState(false);
  const isAnswered = answered !== null;

  return (
    <div className="qcard p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
      <div className="flex items-center justify-between gap-2 border-b border-slate-200/70 dark:border-slate-800 pb-3">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1.5">
          <HelpCircle className="size-3 text-amber-600" />
          <span>
            Question {idx + 1} / {total}
          </span>
        </span>
        <div className="flex items-center gap-1.5">
          {q.exp && !isAnswered && (
            <button
              type="button"
              className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/25 hover:bg-amber-500/20 cursor-pointer transition-all flex items-center gap-1"
              disabled={hintShown}
              onClick={(e) => {
                e.stopPropagation();
                setHintShown(true);
              }}
            >
              <Lightbulb className="size-3 text-amber-500" />
              <span>Indice</span>
            </button>
          )}
        </div>
      </div>

      <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
        {q.q}
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {order.map((o, oIdx) => {
          const isCorrectOpt = o.i === q.correct;
          const isSelected = answered === oIdx;
          let optStyle =
            "bg-slate-50/80 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200";

          if (isAnswered) {
            if (isCorrectOpt) {
              optStyle =
                "bg-emerald-500/15 border-emerald-500/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/20";
            } else if (isSelected) {
              optStyle =
                "bg-rose-500/15 border-rose-500/40 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500/20";
            } else {
              optStyle =
                "opacity-50 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200/50 dark:border-slate-800 text-slate-400";
            }
          }

          return (
            <button
              key={oIdx}
              type="button"
              disabled={isAnswered}
              onClick={() => onAnswer(oIdx)}
              className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start justify-between gap-3 cursor-pointer active:scale-[0.99] ${optStyle}`}
            >
              <span className="flex-1 leading-relaxed">
                {isFocus && !isAnswered && (
                  <span className="font-mono text-[11px] font-bold opacity-60 mr-2">
                    [{oIdx + 1}]
                  </span>
                )}
                {o.opt}
              </span>
              {isAnswered && isCorrectOpt && (
                <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              )}
              {isAnswered && isSelected && !isCorrectOpt && (
                <XCircle className="size-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {(isAnswered || hintShown) && (
        <div
          className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
            isAnswered
              ? order[answered!]?.i === q.correct
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100"
                : "bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-100"
              : "bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-100"
          }`}
        >
          {isAnswered ? (
            <span dangerouslySetInnerHTML={{ __html: q.exp }} />
          ) : (
            <>
              <b>💡 Indice pédagogique :</b>{" "}
              {q.exp.replace(/<[^>]*>/g, "").split(/[.!?]/)[0]}.
            </>
          )}
        </div>
      )}
    </div>
  );
}

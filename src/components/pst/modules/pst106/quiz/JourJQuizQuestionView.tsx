"use client";

import { Clock, X, Zap, CheckCircle2, AlertCircle } from "lucide-react";
import type { JJItem } from "./useJourJQuizState";
import { formatQuizTime } from "./useJourJQuizState";

interface JourJQuizQuestionViewProps {
  current: JJItem;
  idx: number;
  total: number;
  score: number;
  remaining: number;
  isUrgent: boolean;
  progressPct: number;
  answered: number | null;
  onChoose: (i: number) => void;
  onNext: () => void;
  onClose: () => void;
}

export function JourJQuizQuestionView({
  current,
  idx,
  total,
  score,
  remaining,
  isUrgent,
  progressPct,
  answered,
  onChoose,
  onNext,
  onClose,
}: JourJQuizQuestionViewProps) {
  return (
    <>
      {/* Top Bar with Timer */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
            <Zap className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>
              #{idx + 1} / {total}
            </span>
          </span>
          <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
            Score : {score}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold tabular-nums border ${
              isUrgent
                ? "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30 animate-pulse"
                : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
            }`}
          >
            <Clock className="size-3" />
            <span>{formatQuizTime(remaining)}</span>
          </span>

          <button
            type="button"
            aria-label="Fermer"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Minimal Progress Bar */}
      <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Question Text */}
      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug m-0">
        {current.q}
      </h3>

      {/* Options */}
      <div className="space-y-2">
        {current.options.map((opt, i) => {
          const isCorrect = i === current.correct;
          const isChosen = i === answered;
          let btnCls =
            "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200";

          if (answered !== null) {
            if (isCorrect) {
              btnCls =
                "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-bold";
            } else if (isChosen) {
              btnCls =
                "bg-rose-50/80 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200 font-semibold";
            } else {
              btnCls =
                "opacity-40 bg-slate-50/30 dark:bg-slate-800/20 border-slate-200/40 text-slate-500 dark:text-slate-500";
            }
          }

          return (
            <button
              key={i}
              type="button"
              disabled={answered !== null}
              onClick={() => onChoose(i)}
              className={`w-full text-left p-3 rounded-2xl border text-xs sm:text-sm leading-relaxed transition-all cursor-pointer flex items-start gap-2.5 active:scale-99 ${btnCls}`}
            >
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 shrink-0 mt-0.5">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback & Next Button */}
      {answered !== null && (
        <div className="space-y-3 pt-2 animate-fadeIn border-t border-slate-200/60 dark:border-slate-800">
          <div
            className={`p-3 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
              answered === current.correct
                ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200"
                : "bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200"
            }`}
          >
            <div className="font-bold mb-1 flex items-center gap-1.5">
              {answered === current.correct ? (
                <>
                  <CheckCircle2 className="size-3.5 text-emerald-600" />
                  <span>✓ Réponse exacte</span>
                </>
              ) : (
                <>
                  <AlertCircle className="size-3.5 text-rose-600" />
                  <span>✗ Réponse incorrecte</span>
                </>
              )}
            </div>
            <div dangerouslySetInnerHTML={{ __html: current.explain }} />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <span>
                {idx + 1 < total ? "Question suivante" : "Voir mon score"}
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

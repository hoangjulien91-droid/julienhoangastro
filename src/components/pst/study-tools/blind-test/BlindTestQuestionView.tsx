import { Trophy, Flame, Quote, CheckCircle2, XCircle, Sparkles, ArrowRight } from "lucide-react";
import type { BlindTestItem } from "@/lib/pst/data/blind-test-data";

interface BlindTestQuestionViewProps {
  currentItem: BlindTestItem;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  streak: number;
  chosenAuthor: string | null;
  onChooseAuthor: (author: string) => void;
  onNext: () => void;
}

export function BlindTestQuestionView({
  currentItem,
  currentIndex,
  totalQuestions,
  score,
  streak,
  chosenAuthor,
  onChooseAuthor,
  onNext,
}: BlindTestQuestionViewProps) {
  return (
    <div className="space-y-4">
      {/* Score & Combo Bar */}
      <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-xs">
        <span className="font-mono font-bold text-slate-600 dark:text-slate-400">
          Question {currentIndex + 1} / {totalQuestions}
        </span>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
            <Trophy className="size-3.5 shrink-0" />
            <span>{score} pts</span>
          </div>
          <div className="flex items-center gap-1 font-bold text-rose-600 dark:text-rose-400">
            <Flame
              className={`size-3.5 shrink-0 ${streak >= 2 ? "animate-bounce" : ""}`}
            />
            <span>Streak x{streak}</span>
          </div>
        </div>
      </div>

      {/* Citation Mystery Card */}
      <div className="p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-amber-500/10 border-2 border-violet-500/30 text-center space-y-3 sm:space-y-4 shadow-sm">
        <div className="inline-flex items-center justify-center size-11 sm:size-14 rounded-2xl bg-violet-600 text-white shadow-md">
          <Quote className="size-5 sm:size-6" />
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-violet-700 dark:text-violet-300 font-bold block">
            {currentItem.moduleKey.toUpperCase()} · Citation Mystère
          </span>
          <p className="text-xs sm:text-base font-serif italic text-slate-900 dark:text-white leading-relaxed max-w-lg mx-auto">
            « {currentItem.citationMystere} »
          </p>
        </div>
      </div>

      {/* 4 Authors Options */}
      <div className="space-y-2 pt-1">
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
          Qui est l&apos;auteur de cette thèse ?
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {currentItem.optionsAuteurs.map((author, idx) => {
            const isSelected = chosenAuthor === author;
            const isDone = chosenAuthor !== null;
            const isCorrect = author === currentItem.auteurCorrect;

            let btnStyle =
              "bg-white dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 hover:border-violet-400 text-slate-900 dark:text-white";

            if (isDone) {
              if (isCorrect) {
                btnStyle =
                  "bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/30";
              } else if (isSelected && !isCorrect) {
                btnStyle =
                  "bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-200 font-bold";
              } else {
                btnStyle =
                  "opacity-40 bg-slate-50/90 dark:bg-slate-950/60 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400";
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isDone}
                onClick={() => onChooseAuthor(author)}
                className={`p-3 sm:p-3.5 min-h-[44px] rounded-xl sm:rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-2 cursor-pointer active:scale-98 ${btnStyle}`}
              >
                <span className="truncate">{author}</span>
                {isDone && isCorrect && (
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                )}
                {isDone && isSelected && !isCorrect && (
                  <XCircle className="size-4 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reveal Explanation Card */}
      {chosenAuthor !== null && (
        <div className="p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-violet-50/70 dark:bg-violet-950/40 border border-violet-200/80 dark:border-violet-900/60 text-xs text-slate-700 dark:text-slate-300 animate-fadeIn space-y-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="font-bold text-violet-700 dark:text-violet-300 flex items-center gap-1.5 text-xs sm:text-[13px]">
              <Sparkles className="size-3.5 text-amber-500 shrink-0" />
              <span>Ouvrage de référence : {currentItem.anneeEtOuvrage}</span>
            </span>
            <button
              type="button"
              onClick={onNext}
              className="w-full sm:w-auto px-4 py-2 sm:py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1 transition-all cursor-pointer min-h-[38px] shrink-0"
            >
              <span>Suivant</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
          <p className="leading-relaxed m-0 text-slate-700 dark:text-slate-300">
            <b className="text-slate-900 dark:text-white">Pourquoi c&apos;est capital :</b>{" "}
            {currentItem.pourquoiEssentiel}
          </p>
        </div>
      )}
    </div>
  );
}

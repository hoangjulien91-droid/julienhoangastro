import { Sparkles, ArrowRight } from "lucide-react";
import type { QuizQuestionTransversale } from "@/lib/pst/data/ponts-s1";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface PontsS1QuizViewProps {
  currentQuiz: QuizQuestionTransversale;
  currentQuizIdx: number;
  totalQuiz: number;
  quizScore: number;
  selectedOptionId: string | null;
  onSelectOption: (id: string) => void;
  hasValidatedQuiz: boolean;
  onValidateQuiz: () => void;
  onNextQuiz: () => void;
}

export function PontsS1QuizView({
  currentQuiz,
  currentQuizIdx,
  totalQuiz,
  quizScore,
  selectedOptionId,
  onSelectOption,
  hasValidatedQuiz,
  onValidateQuiz,
  onNextQuiz,
}: PontsS1QuizViewProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-slate-50/90 dark:bg-slate-950/60 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200/80 dark:border-slate-800 pb-3">
          <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Question {currentQuizIdx + 1} / {totalQuiz}
          </span>
          <span>
            Score : {quizScore} / {totalQuiz}
          </span>
        </div>

        <div className="space-y-2">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
            {currentQuiz.contexte}
          </span>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
            {currentQuiz.enonce}
          </h4>
        </div>

        {/* Options */}
        <div className="space-y-2.5 pt-2">
          {currentQuiz.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isCorrect = hasValidatedQuiz && opt.isCorrect;
            const isWrong = hasValidatedQuiz && isSelected && !opt.isCorrect;

            return (
              <button
                key={opt.id}
                disabled={hasValidatedQuiz}
                onClick={() => {
                  onSelectOption(opt.id);
                  playClickSound();
                  triggerHaptic();
                }}
                className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${
                  isCorrect
                    ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-500 text-emerald-900 dark:text-emerald-200 font-medium"
                    : isWrong
                      ? "bg-red-50 dark:bg-red-950/40 border-red-400 dark:border-red-500 text-red-900 dark:text-red-200"
                      : isSelected
                        ? "bg-indigo-50 dark:bg-indigo-600/30 border-indigo-400 text-indigo-950 dark:text-white font-medium"
                        : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div
                  className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                    isSelected
                      ? "bg-indigo-600 border-indigo-400 text-white"
                      : "border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {opt.id.slice(3).toUpperCase()}
                </div>
                <div className="space-y-1">
                  <p>{opt.texte}</p>
                  {hasValidatedQuiz && (
                    <p
                      className={`text-xs mt-1 italic ${
                        opt.isCorrect
                          ? "text-emerald-700 dark:text-emerald-300"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {opt.explication}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Validate Button / Advice */}
        {!hasValidatedQuiz ? (
          <div className="flex justify-end pt-3">
            <button
              disabled={!selectedOptionId}
              onClick={onValidateQuiz}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                selectedOptionId
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer shadow-md"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
              }`}
            >
              Valider mon analyse
            </button>
          </div>
        ) : (
          <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
            <div className="p-3.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/20 border border-amber-300/80 dark:border-amber-800/30 text-xs text-amber-900 dark:text-amber-200/90 flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Conseil pour la copie du CNAM :</strong>{" "}
                {currentQuiz.conseilExamen}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={onNextQuiz}
                className="w-full sm:w-auto justify-center px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <span>Question suivante</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

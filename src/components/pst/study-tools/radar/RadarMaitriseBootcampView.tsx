import { Award, ArrowRight, RotateCcw } from "lucide-react";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface BootcampQuestion {
  question: string;
  options: string[];
  correctIdx: number;
  explication: string;
  axisNom: string;
  moduleKey: string;
}

interface RadarMaitriseBootcampViewProps {
  questions: BootcampQuestion[];
  currentIndex: number;
  score: number;
  selectedAnswerIdx: number | null;
  hasValidated: boolean;
  onSelectAnswer: (idx: number) => void;
  onValidateAnswer: () => void;
  onNextQuestion: () => void;
  onResetBootcamp: () => void;
}

export function RadarMaitriseBootcampView({
  questions,
  currentIndex,
  score,
  selectedAnswerIdx,
  hasValidated,
  onSelectAnswer,
  onValidateAnswer,
  onNextQuestion,
  onResetBootcamp,
}: RadarMaitriseBootcampViewProps) {
  const currentQ = questions[currentIndex];

  if (currentIndex >= questions.length) {
    return (
      <div className="p-8 rounded-2xl bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 text-center space-y-5 animate-fadeIn">
        <div className="inline-flex p-4 rounded-full bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
          <Award className="h-12 w-12" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Bootcamp Express Réussi !
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Score :{" "}
            <strong className="text-indigo-600 dark:text-indigo-400 font-mono text-lg">
              {score} / {questions.length}
            </strong>
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Vos 3 angles morts prioritaires ont été renforcés. Continuez
            d&apos;alterner révision active et mémorisation espacée.
          </p>
        </div>

        <button
          onClick={onResetBootcamp}
          className="px-5 py-2.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300/80 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Retour au radar général</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold shrink-0">
            Q {currentIndex + 1} / {questions.length}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">
            {currentQ.axisNom}
          </span>
        </div>
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
          {score} / {questions.length}
        </span>
      </div>

      <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 space-y-2">
        <h3 className="text-xs sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
          {currentQ.question}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-2 sm:space-y-2.5">
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedAnswerIdx === idx;
          const isCorrect = hasValidated && idx === currentQ.correctIdx;
          const isWrong = hasValidated && isSelected && !isCorrect;

          return (
            <button
              key={idx}
              disabled={hasValidated}
              onClick={() => {
                if (hasValidated) return;
                onSelectAnswer(idx);
                playClickSound();
                triggerHaptic();
              }}
              className={`w-full text-left p-3 sm:p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-2.5 sm:gap-3 min-h-[44px] cursor-pointer ${
                isCorrect
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-500 text-emerald-900 dark:text-emerald-200 font-medium"
                  : isWrong
                    ? "bg-rose-50 dark:bg-rose-950/40 border-rose-400 dark:border-rose-500 text-rose-900 dark:text-rose-200"
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
                {String.fromCharCode(65 + idx)}
              </div>
              <p className="m-0 leading-relaxed">{opt}</p>
            </button>
          );
        })}
      </div>

      {/* Validation */}
      {!hasValidated ? (
        <div className="flex justify-end pt-2">
          <button
            disabled={selectedAnswerIdx === null}
            onClick={onValidateAnswer}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-md ${
              selectedAnswerIdx !== null
                ? "bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
                : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
            }`}
          >
            Valider la réponse
          </button>
        </div>
      ) : (
        <div className="space-y-4 pt-2 border-t border-slate-200/80 dark:border-slate-800 animate-fadeIn text-xs">
          <div
            className={`p-3.5 rounded-xl border ${
              selectedAnswerIdx === currentQ.correctIdx
                ? "bg-emerald-50/90 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-200"
                : "bg-rose-50/90 dark:bg-rose-950/30 border-rose-300 dark:border-rose-500/40 text-rose-900 dark:text-rose-200"
            }`}
          >
            <p>{currentQ.explication}</p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onNextQuestion}
              className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <span>Question suivante</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

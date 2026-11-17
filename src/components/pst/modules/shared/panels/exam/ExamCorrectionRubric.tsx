import {
  CheckCircle2,
  Sparkles,
  FileText,
} from "lucide-react";
import type { RedacItem } from "@/lib/pst/types";
import { QuizBilan } from "@/components/pst/quiz/QuizBilan";

interface ExamCorrectionRubricProps {
  subject: RedacItem;
  checked: Set<number>;
  onToggleAttendu: (i: number) => void;
  onComputeScore: () => void;
  scoreShown: boolean;
}

export function ExamCorrectionRubric({
  subject,
  checked,
  onToggleAttendu,
  onComputeScore,
  scoreShown,
}: ExamCorrectionRubricProps) {
  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-indigo-500/30 dark:border-indigo-500/30 shadow-xs space-y-4 animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
          <CheckCircle2 className="size-3 text-indigo-600 dark:text-indigo-400" />
          <span>Grille Officielle de Correction Cnam</span>
        </span>

        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          {checked.size} / {subject[1].length} attendus validés
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 m-0">
        Coche chaque attendu théorique, méthodologique ou déontologique
        réellement intégré dans ton plan :
      </p>

      <div className="space-y-2">
        {subject[1].map((a, i) => {
          const isChecked = checked.has(i);
          return (
            <label
              key={i}
              onClick={() => onToggleAttendu(i)}
              className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                isChecked
                  ? "bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 text-indigo-950 dark:text-indigo-200"
                  : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70"
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {}} // handled by label onClick
                className="mt-0.5 size-4 rounded-md text-indigo-600 border-slate-300 focus:ring-indigo-500 pointer-events-none"
              />
              <span className="text-xs sm:text-sm leading-relaxed">{a}</span>
            </label>
          );
        })}
      </div>

      <div className="pt-2 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onComputeScore}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
        >
          <Sparkles className="size-3.5" />
          <span>Calculer &amp; enregistrer mon score</span>
        </button>
      </div>

      {scoreShown && (
        <div className="pt-1">
          <QuizBilan correct={checked.size} total={subject[1].length} />
        </div>
      )}

      {/* Model Solution Accordion */}
      <details className="group pt-2 border-t border-slate-200/60 dark:border-slate-800">
        <summary className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer select-none py-1.5 hover:underline">
          <FileText className="size-3.5" />
          <span>Voir le corrigé modèle d&apos;excellence rédigé</span>
        </summary>
        <div
          className="mt-3 p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 space-y-2 prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: subject[2] }}
        />
      </details>
    </div>
  );
}

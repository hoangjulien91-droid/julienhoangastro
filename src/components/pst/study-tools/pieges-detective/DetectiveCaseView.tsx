import { AlertTriangle, Sparkles, ArrowRight } from "lucide-react";
import type { DetectiveCase } from "@/lib/pst/data/pieges-detective-data";

interface DetectiveCaseViewProps {
  currentCase: DetectiveCase;
  selectedAssertionIdx: number | null;
  onSelectAssertion: (idx: number) => void;
  onNextCase: () => void;
}

export function DetectiveCaseView({
  currentCase,
  selectedAssertionIdx,
  onSelectAssertion,
  onNextCase,
}: DetectiveCaseViewProps) {
  return (
    <div className="space-y-4">
      {/* Context Box */}
      <div className="p-3.5 sm:p-4 rounded-3xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
        <div className="flex items-center justify-between gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300">
          <span className="min-w-0 truncate">Dossier : {currentCase.titre}</span>
          <span className="text-[10px] font-mono uppercase bg-indigo-500/15 px-2 py-0.5 rounded-full shrink-0">
            {currentCase.moduleKey.toUpperCase()}
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
          « {currentCase.contexte} »
        </p>
      </div>

      {/* 3 Assertions to investigate */}
      <div className="space-y-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
          Cliquez sur l&apos;affirmation qui contient le PIÈGE d&apos;examen :
        </span>

        {currentCase.assertions.map((ass, aIdx) => {
          const isSelected = selectedAssertionIdx === aIdx;
          const isDone = selectedAssertionIdx !== null;

          let cardStyle =
            "bg-white dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 hover:border-amber-400 text-slate-900 dark:text-white shadow-xs";

          if (isDone) {
            if (ass.isPiege) {
              cardStyle =
                "bg-rose-50 dark:bg-rose-950/30 border-rose-500 text-rose-950 dark:text-rose-100 shadow-md ring-2 ring-rose-500/30";
            } else if (isSelected && !ass.isPiege) {
              cardStyle =
                "bg-amber-50 dark:bg-amber-950/30 border-amber-500 text-amber-950 dark:text-amber-100";
            } else {
              cardStyle =
                "opacity-50 bg-slate-50/90 dark:bg-slate-950/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300";
            }
          }

          return (
            <div
              key={aIdx}
              onClick={() => onSelectAssertion(aIdx)}
              className={`p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${cardStyle}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  <span className="size-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {String.fromCharCode(65 + aIdx)}
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed font-medium flex-1 m-0">
                    {ass.texte}
                  </p>
                </div>
                {isDone && ass.isPiege && (
                  <span className="self-start px-2 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px] uppercase shrink-0 flex items-center gap-1">
                    <AlertTriangle className="size-3" />
                    <span>Piège démasqué</span>
                  </span>
                )}
                {isDone && isSelected && !ass.isPiege && (
                  <span className="self-start px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[10px] uppercase shrink-0">
                    C&apos;était juste !
                  </span>
                )}
              </div>

              {isDone && ass.isPiege && ass.pourquoiPiege && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-xs text-rose-900 dark:text-rose-200 animate-fadeIn space-y-1">
                  <p className="font-bold">⚠️ Révélation du piège :</p>
                  <p className="leading-relaxed">{ass.pourquoiPiege}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Professor Verdict Box */}
      {selectedAssertionIdx !== null && (
        <div className="p-3.5 sm:p-4 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/60 text-xs text-slate-700 dark:text-slate-300 animate-fadeIn space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="size-4 text-amber-500 shrink-0" />
              <span>Conseil de correction officiel du professeur :</span>
            </span>
            <button
              type="button"
              onClick={onNextCase}
              className="w-full sm:w-auto px-3.5 py-2 sm:py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1 transition-all cursor-pointer shrink-0"
            >
              <span>Dossier suivant</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
          <p className="leading-relaxed italic m-0 text-slate-900 dark:text-white">
            « {currentCase.professeurVerdict} »
          </p>
        </div>
      )}
    </div>
  );
}

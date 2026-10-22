"use client";

import { Award, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface QuizBilanProps {
  correct: number;
  total: number;
}

/** Verdict affiché une fois toutes les questions d'un quiz répondues. */
export function QuizBilan({ correct, total }: QuizBilanProps) {
  const pct = total > 0 ? Math.round((100 * correct) / total) : 0;
  const isMastered = pct >= 80;
  const isGood = pct >= 60;

  const verdict = isMastered
    ? "Excellente maîtrise doctrinale"
    : isGood
      ? "Bonne assimilation, notions à consolider"
      : "Notions à retravailler dans le carnet d'erreurs";

  const badgeStyle = isMastered
    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
    : isGood
      ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30"
      : "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30";

  const cardBorder = isMastered
    ? "border-emerald-500/40 bg-emerald-500/5"
    : isGood
      ? "border-amber-500/40 bg-amber-500/5"
      : "border-rose-500/40 bg-rose-500/5";

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border ${cardBorder} backdrop-blur-md shadow-xs space-y-2 mt-4 animate-in fade-in duration-200`}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${badgeStyle}`}
        >
          {isMastered ? (
            <CheckCircle2 className="size-3.5" />
          ) : isGood ? (
            <AlertTriangle className="size-3.5" />
          ) : (
            <XCircle className="size-3.5" />
          )}
          <span>{verdict}</span>
        </span>
        <span className="font-mono text-base font-black text-foreground">
          {correct} / {total} ({pct}%)
        </span>
      </div>

      <p className="text-xs text-muted-foreground m-0 leading-relaxed">
        Votre score a été automatiquement synchronisé avec votre progression
        globale et votre carnet d&apos;erreurs.
      </p>
    </div>
  );
}

"use client";

import { Check, Sparkles } from "lucide-react";
import type { EvalResult } from "./feynmanEvaluation";

interface FeynmanEvalResultCardProps {
  result: EvalResult;
}

export function FeynmanEvalResultCard({ result }: FeynmanEvalResultCardProps) {
  const scoreBadge =
    result.score >= 80
      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
      : result.score >= 50
        ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30"
        : "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30";

  const scoreLetter =
    result.score >= 85
      ? "Excellent (A)"
      : result.score >= 65
        ? "Bien (B)"
        : result.score >= 45
          ? "Passable (C)"
          : "À retravailler (D)";

  return (
    <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 backdrop-blur-sm space-y-4 mt-5 animate-in fade-in duration-150">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-muted-foreground block">
            Score sémantique
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-mono text-xl font-black text-foreground">
              {result.score}%
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${scoreBadge}`}
            >
              {scoreLetter}
            </span>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-muted-foreground">
          {result.score >= 80
            ? "Excellente synthèse"
            : result.score >= 50
              ? "Notions partielles"
              : "Explication à étoffer"}
        </span>
      </div>

      {/* Notions trouvées */}
      <div className="space-y-1.5">
        <span className="text-xs font-semibold text-foreground block">
          Notions clés identifiées :
        </span>
        <div className="flex flex-wrap gap-1.5">
          {result.found.map((k) => (
            <span
              key={k}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30"
            >
              <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
              <span>{k}</span>
            </span>
          ))}
          {result.found.length === 0 && (
            <span className="text-xs text-muted-foreground italic">
              Aucune notion clé formellement détectée.
            </span>
          )}
        </div>
      </div>

      {/* Notions manquantes */}
      <div className="space-y-1.5">
        <span className="text-xs font-semibold text-foreground block">
          Notions à intégrer pour consolider l'argument :
        </span>
        <div className="flex flex-wrap gap-1.5">
          {result.missing.map((k) => (
            <span
              key={k}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted/60 text-muted-foreground border border-border/80"
            >
              <span>+ {k}</span>
            </span>
          ))}
          {result.missing.length === 0 && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              ✓ Félicitations, vous avez couvert l'ensemble des notions clés du concept !
            </span>
          )}
        </div>
      </div>

      {/* Feedback pédagogique Cnam */}
      <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/10 text-xs text-foreground leading-relaxed flex items-start gap-2.5">
        <Sparkles className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="block mb-0.5 text-foreground font-semibold">
            Analyse Pédagogique Chaire Cnam :
          </strong>
          <span className="text-muted-foreground">
            {result.score >= 80
              ? "Votre explication est rigoureuse, claire et structurée. Vous mobilisez le vocabulaire conceptuel sans tomber dans le jargon creux."
              : result.score >= 50
                ? "Bonne amorce explicative. Pour le jury, consolidez votre argumentation en intégrant expressément les notions suggérées ci-dessus."
                : "Explication trop générale ou incomplète. Relisez la fiche doctrinale correspondante puis tentez une nouvelle reformulation avec les termes exacts."}
          </span>
        </div>
      </div>
    </div>
  );
}

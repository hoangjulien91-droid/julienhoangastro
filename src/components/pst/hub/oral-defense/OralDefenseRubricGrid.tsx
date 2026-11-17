"use client";

import React from "react";
import { RotateCcw, Check, Sparkles } from "lucide-react";
import { RNCP_CRITERIA } from "@/lib/pst/data/oral-defense-data";

interface OralDefenseRubricGridProps {
  totalScore: number;
  evalScores: Record<string, number>;
  verdict: { label: string; badge: string };
  onScoreChange: (critId: string, val: number) => void;
  onResetScores: () => void;
}

export const OralDefenseRubricGrid: React.FC<OralDefenseRubricGridProps> = ({
  totalScore,
  evalScores,
  verdict,
  onScoreChange,
  onResetScores,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
      {/* Rubric Score Summary Header Card */}
      <div className="p-5 rounded-2xl border border-border bg-muted/20 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-2xl sm:text-3xl font-mono font-black text-foreground">
              {totalScore}{" "}
              <span className="text-muted-foreground text-lg sm:text-xl font-normal">
                / 20 pts
              </span>
            </span>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold border ${verdict.badge}`}
            >
              {verdict.label}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed m-0">
            Grille d&apos;évaluation officielle · Titre RNCP Niveau 7 Psychologue du Travail (4 critères pondérés à 5 points).
          </p>
        </div>

        <button
          type="button"
          onClick={onResetScores}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-background hover:bg-muted text-xs font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <RotateCcw className="size-3.5" />
          <span>Réinitialiser les notes</span>
        </button>
      </div>

      {/* Criteria Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {RNCP_CRITERIA.map((crit) => {
          const currentScore = evalScores[crit.id] ?? 0;
          return (
            <div
              key={crit.id}
              className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between gap-4 shadow-xs hover:border-accent/40 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-serif font-bold text-foreground m-0">
                    {crit.title}
                  </h3>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/20 shrink-0">
                    {currentScore} / {crit.points} pts
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed m-0">
                  {crit.desc}
                </p>

                <div className="pt-2 border-t border-border/60 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-bold block">
                    Indicateurs observables :
                  </span>
                  <ul className="space-y-1.5 m-0 pl-0 list-none">
                    {crit.indicators.map((ind, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-foreground/90 leading-relaxed"
                      >
                        <div className="size-3.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="size-2.5" />
                        </div>
                        <span>{ind}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Interactive Score Picker (0 to 5) */}
              <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-muted-foreground font-semibold">
                  Note attribuée :
                </span>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => onScoreChange(crit.id, val)}
                      className={`size-8 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                        currentScore === val
                          ? "bg-primary text-primary-foreground shadow-xs scale-105"
                          : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/70"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Pedagogical Callout */}
      <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 flex items-start gap-3 text-xs leading-relaxed">
        <Sparkles className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-serif text-foreground block mb-0.5">
            Règle d&apos;or de la Chaire PST pour l&apos;obtention du Titre RNCP 7 :
          </strong>
          <span className="text-muted-foreground">
            Le jury sanctionne immédiatement toute posture de consultant prescripteur ou de prise en charge psychologique individuelle de la souffrance. Le cœur de l&apos;évaluation réside dans l&apos;élucidation de l&apos;écart prescrit/réel, l&apos;analyse des controverses de métier et la restauration du pouvoir d&apos;agir collectif des opérateurs.
          </span>
        </div>
      </div>
    </div>
  );
};

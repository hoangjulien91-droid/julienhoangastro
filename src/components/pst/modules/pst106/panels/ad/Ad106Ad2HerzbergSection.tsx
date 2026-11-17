"use client";

import React from "react";
import { Copy } from "lucide-react";
import { HERZBERG_TWO_FACTOR_MODEL } from "@/lib/pst/data/pst106-ad";

export interface Ad106Ad2HerzbergSectionProps {
  onCopy: (text: string, key: string) => void;
  copiedSection: string | null;
}

export function Ad106Ad2HerzbergSection({
  onCopy,
  copiedSection,
}: Ad106Ad2HerzbergSectionProps) {
  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Fiche introductive Herzberg */}
      <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Article classique HBR (1968 / 1977)
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white m-0">
              À la recherche des motivations perdues (One more time: How do you motivate employees?)
            </h4>
          </div>
          <button
            type="button"
            onClick={() =>
              onCopy(
                `FREDERICK HERZBERG — THÉORIE BI-FACTORIELLE\n\n1. Critique du KITA : Le bâton et la carotte ne motivent pas l'employé, ils ne font que mettre le chien en mouvement.\n2. Facteurs d'Hygiène (Insatisfaction) : Salaire, conditions, politique, hiérarchie.\n3. Facteurs de Motivation (Satisfaction) : Accomplissement, responsabilité, travail en lui-même.\n4. Enrichissement vertical (autonomie réelle) vs élargissement horizontal (additionner zéro plus zéro).`,
                "herzberg",
              )
            }
            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 flex items-center gap-1.5 cursor-pointer"
          >
            <Copy className="size-3" />
            <span>{copiedSection === "herzberg" ? "Copié !" : "Copier la synthèse"}</span>
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0 font-serif">
          Herzberg rompt avec la vision linéaire de la motivation. L&apos;inverse de l&apos;insatisfaction n&apos;est pas la satisfaction, mais l&apos;<b>absence d&apos;insatisfaction</b>. Soigner les conditions de travail ou augmenter le salaire (facteurs d&apos;hygiène) empêche les salariés de se plaindre, mais ne les motive jamais durablement à travailler avec cœur. Seul l&apos;<b>enrichissement vertical des tâches</b> crée une satisfaction réelle.
        </p>
      </div>

      {/* Tableau comparatif des Facteurs d'Hygiène vs Motivation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Facteurs d'Hygiène */}
        <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-3">
          <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
            <h5 className="font-bold text-xs text-rose-900 dark:text-rose-200 m-0 uppercase tracking-wide">
              Facteurs d&apos;Hygiène (Extrinsèques)
            </h5>
            <span className="text-[10px] font-mono text-rose-700 dark:text-rose-300 font-bold">
              Évitent la douleur
            </span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 m-0">
            Liés au <b>milieu</b> et à l&apos;environnement. S&apos;ils manquent ➔ forte insatisfaction. S&apos;ils sont optimaux ➔ neutralité (non-insatisfaction).
          </p>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 m-0 pl-0 list-none">
            {HERZBERG_TWO_FACTOR_MODEL.hygieneFactors.map((f) => (
              <li key={f.name} className="flex items-center justify-between p-1.5 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-rose-500/10">
                <span>{f.name}</span>
                <span className="font-mono text-[10px] text-rose-600 dark:text-rose-400 font-bold">
                  {f.weight}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Facteurs de Motivation */}
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
            <h5 className="font-bold text-xs text-emerald-900 dark:text-emerald-200 m-0 uppercase tracking-wide">
              Facteurs Moteurs (Intrinsèques)
            </h5>
            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 font-bold">
              Grandissement psychologique
            </span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 m-0">
            Liés au <b>contenu</b> du travail lui-même. Ce sont les SEULS générateurs d&apos;engagement et de performance durable.
          </p>
          <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 m-0 pl-0 list-none">
            {HERZBERG_TWO_FACTOR_MODEL.motivationFactors.map((f) => (
              <li key={f.name} className="flex items-center justify-between p-1.5 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-emerald-500/10">
                <span>{f.name}</span>
                <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  {f.weight}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Principes de l'enrichissement vertical */}
      <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs">
        <h5 className="font-bold text-slate-900 dark:text-white m-0">
          Les 5 Principes de l&apos;Accroissement Vertical (vs Élargissement Horizontal)
        </h5>
        <div className="space-y-2">
          {HERZBERG_TWO_FACTOR_MODEL.enrichmentPrinciples.map((p, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-start justify-between gap-3">
              <div>
                <span className="font-bold text-amber-700 dark:text-amber-400">
                  {p.action}
                </span>
                <p className="text-slate-600 dark:text-slate-300 m-0 mt-0.5">
                  {p.principe}
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold shrink-0">
                Principe {idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

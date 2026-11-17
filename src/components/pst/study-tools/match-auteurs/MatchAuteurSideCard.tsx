"use client";

import type { DuelAuteurs } from "@/lib/pst/data/match-auteurs";

export type DuelSide = DuelAuteurs["auteurA"];

interface MatchAuteurSideCardProps {
  auteur: DuelSide;
  variant: "indigo" | "amber";
}

export function MatchAuteurSideCard({
  auteur,
  variant,
}: MatchAuteurSideCardProps) {
  const isIndigo = variant === "indigo";

  return (
    <div
      className={`p-5 rounded-3xl bg-slate-50/70 dark:bg-slate-800/40 border-2 space-y-3 ${
        isIndigo ? "border-indigo-500/30" : "border-amber-500/30"
      }`}
    >
      <div
        className={`flex items-center justify-between pb-2 border-b ${
          isIndigo ? "border-indigo-500/20" : "border-amber-500/20"
        }`}
      >
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-black text-white shadow-xs ${
            isIndigo ? "bg-indigo-600" : "bg-amber-600"
          }`}
        >
          {auteur.nom}
        </span>
        <span className="text-[10px] text-slate-500 truncate max-w-[180px]">
          {auteur.ouvrageConcept}
        </span>
      </div>

      <div className="space-y-1">
        <span
          className={`text-[10px] font-bold uppercase tracking-wider ${
            isIndigo
              ? "text-indigo-700 dark:text-indigo-400"
              : "text-amber-700 dark:text-amber-400"
          }`}
        >
          Diagnostic théorique :
        </span>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed m-0">
          {auteur.diagnosticSituation}
        </p>
      </div>

      <div
        className={`p-2.5 rounded-xl bg-white dark:bg-slate-900 border text-xs italic font-serif ${
          isIndigo
            ? "border-indigo-500/20 text-indigo-900 dark:text-indigo-200"
            : "border-amber-500/20 text-amber-900 dark:text-amber-200"
        }`}
      >
        {auteur.citationChoc}
      </div>

      <div className="text-[11px] text-slate-600 dark:text-slate-400">
        <b>Préconisation :</b> {auteur.preconisationAction}
      </div>
    </div>
  );
}

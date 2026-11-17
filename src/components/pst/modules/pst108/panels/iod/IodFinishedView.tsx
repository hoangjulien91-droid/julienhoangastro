"use client";

import React from "react";
import { Award, RotateCcw } from "lucide-react";

interface IodFinishedViewProps {
  totalScore: number;
  onRestart: () => void;
}

export function IodFinishedView({ totalScore, onRestart }: IodFinishedViewProps) {
  return (
    <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-xs">
      <div className="inline-flex p-4 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
        <Award className="size-10 sm:size-12" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white m-0">
          Bilan de Négociation IOD terminé !
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 m-0">
          Votre score final :{" "}
          <strong className="text-amber-600 dark:text-amber-400 font-mono text-xl">
            {totalScore} / 20
          </strong>
        </p>
      </div>

      <div className="max-w-xl mx-auto p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 text-left space-y-2">
        <strong className="text-amber-700 dark:text-amber-300 font-mono block uppercase">
          Rappel théorique pour la copie de PST108 (Francis Valls) :
        </strong>
        <ul className="list-disc list-inside space-y-1.5 m-0 pl-0">
          <li>
            <b>Non-tri préalable :</b> l&apos;IOD ne trie pas les
            demandeurs d&apos;emploi mais agit sur les conditions
            d&apos;accueil de l&apos;entreprise.
          </li>
          <li>
            <b>Analyse ergonomique du travail réel :</b> la visite de poste
            déconstruit les critères formels surdimensionnés du diplôme ou de
            l&apos;expérience.
          </li>
          <li>
            <b>Médiation bilatérale :</b> le suivi à J+15 et J+30 sécurise
            les deux parties et prévient la réactivation des stéréotypes.
          </li>
        </ul>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs inline-flex items-center gap-2 transition-all cursor-pointer active:scale-95 shadow-xs"
      >
        <RotateCcw className="size-4" />
        <span>Recommencer la simulation</span>
      </button>
    </div>
  );
}

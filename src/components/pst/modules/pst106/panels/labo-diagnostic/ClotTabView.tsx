"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import type { SituationMetier106 } from "@/lib/pst/data/labo-diagnostic-106-data";

interface ClotTabViewProps {
  situation: SituationMetier106;
}

export const ClotTabView: React.FC<ClotTabViewProps> = ({ situation }) => {
  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {/* Statut de l'activité */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-slate-200/70 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Statut de l&apos;Activité (Architecture du Réel)
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/25 font-extrabold uppercase font-mono">
              Activité {situation.diagnosticClot.statutActivite}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed m-0">
            {situation.diagnosticClot.explicationClinique}
          </p>
        </div>

        {/* Genre & Style */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-slate-200/70 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Genre Professionnel &amp; Marge de Style
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/25 font-extrabold uppercase font-mono">
              Genre {situation.diagnosticClot.etatGenre}
            </span>
          </div>
          <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div>
              <strong className="text-slate-500 dark:text-slate-400 text-[10px] font-mono uppercase block mb-1">
                Possibilité du Style :
              </strong>
              <p className="m-0 leading-relaxed">
                {situation.diagnosticClot.stylePossible}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/25 border border-purple-200/80 dark:border-purple-800/40 text-xs text-purple-950 dark:text-purple-200 flex items-start gap-2.5 leading-relaxed">
        <Sparkles className="size-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
        <div>
          <strong>Formule canonique d&apos;examen (Clot, 1999) :</strong> « Le
          réel de l&apos;activité déborde ce qui est réalisé : il est constitué de
          ce qu&apos;on cherche à faire, de ce qu&apos;on aurait voulu faire, et de ce
          qu&apos;on fait pour ne pas faire ce qui est prescrit. C&apos;est dans cette
          résistance du réel que réside le pouvoir d&apos;agir. »
        </div>
      </div>
    </div>
  );
};

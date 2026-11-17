"use client";

import { Calendar } from "lucide-react";

export function Ad108HeaderBanner() {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-500/15 via-purple-500/10 to-amber-500/15 border border-indigo-500/25 shadow-xs space-y-2.5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-900 dark:text-indigo-200 border border-indigo-500/30 flex items-center gap-1.5">
            <Calendar className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Semestre 1 · Cnam Nouvelle-Aquitaine</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/20 text-purple-900 dark:text-purple-200 border border-purple-500/30">
            3 Enseignants Responsables
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 border border-emerald-500/30">
            Moodle Synchronisé
          </span>
        </div>
        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
          PST108 · Psychologie du Langage &amp; Clinique du Dialogue
        </span>
      </div>

      <div>
        <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0">
          Activités Distantes (AD) &amp; Travaux Préparatoires aux Webconférences
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed m-0">
          Retrouvez pour chaque enseignant l&apos;ensemble des consignes officielles, des modèles de réponses rédigés (critères 18/20), des études de cas, des dispositifs d&apos;intervention et des textes ressources.
        </p>
      </div>
    </div>
  );
}

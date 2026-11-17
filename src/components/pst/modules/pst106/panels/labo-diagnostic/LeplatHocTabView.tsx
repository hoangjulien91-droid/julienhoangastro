"use client";

import React from "react";
import type { SituationMetier106 } from "@/lib/pst/data/labo-diagnostic-106-data";

interface LeplatHocTabViewProps {
  situation: SituationMetier106;
}

export const LeplatHocTabView: React.FC<LeplatHocTabViewProps> = ({
  situation,
}) => {
  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      {/* Prescrit vs Conditions vs Régulation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {/* Box 1: Tâche Prescrite */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-rose-500 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/70 dark:border-slate-800">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-700 dark:text-rose-400">
              Tâche Prescrite
            </span>
            <span className="text-[10px] bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20 px-2 py-0.5 rounded-full font-mono font-bold">
              Organisation
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-serif m-0">
            {situation.descriptionPrescrite}
          </p>
        </div>

        {/* Box 2: Conditions Internes & Externes */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-amber-500 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/70 dark:border-slate-800">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Conditions Internes / Externes
            </span>
            <span className="text-[10px] bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-full font-mono font-bold">
              Variabilité
            </span>
          </div>
          <div className="space-y-2.5 text-xs">
            <div>
              <strong className="text-slate-500 dark:text-slate-400 text-[10px] font-mono uppercase block mb-1">
                Conditions internes (Opérateur) :
              </strong>
              <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 text-xs m-0 pl-0">
                {situation.conditionsInternes.map((c, i) => (
                  <li key={i} className="leading-relaxed">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <strong className="text-slate-500 dark:text-slate-400 text-[10px] font-mono uppercase block mb-1">
                Conditions externes (Milieu) :
              </strong>
              <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 text-xs m-0 pl-0">
                {situation.conditionsExternes.map((c, i) => (
                  <li key={i} className="leading-relaxed">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Box 3: Activité Réelle & Régulation */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/30 border-l-4 border-l-emerald-500 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-500/25">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              Activité Réelle (Régulation)
            </span>
            <span className="text-[10px] bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25 px-2 py-0.5 rounded-full font-mono font-bold">
              Compromis
            </span>
          </div>
          <ul className="list-disc list-inside text-slate-800 dark:text-slate-200 space-y-1.5 text-xs m-0 pl-0">
            {situation.compromisOperatoires.map((comp, i) => (
              <li key={i} className="leading-relaxed">
                {comp}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Effets sur l'Homme et sur le Système */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 block pb-2 border-b border-slate-200/70 dark:border-slate-800">
            Effets sur l&apos;Opérateur (Santé, Fatigue, Usure)
          </span>
          <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1.5 m-0 pl-0">
            {situation.effetsOperateur.map((eff, i) => (
              <li key={i} className="leading-relaxed">
                {eff}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400 block pb-2 border-b border-slate-200/70 dark:border-slate-800">
            Effets sur le Système Productif (Qualité, Coûts, Pannes)
          </span>
          <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1.5 m-0 pl-0">
            {situation.effetsSysteme.map((eff, i) => (
              <li key={i} className="leading-relaxed">
                {eff}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

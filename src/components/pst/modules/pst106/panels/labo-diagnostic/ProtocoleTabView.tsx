"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import type { SituationMetier106 } from "@/lib/pst/data/labo-diagnostic-106-data";

interface ProtocoleTabViewProps {
  situation: SituationMetier106;
}

export const ProtocoleTabView: React.FC<ProtocoleTabViewProps> = ({
  situation,
}) => {
  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 animate-in fade-in duration-150">
      <div className="pb-3 border-b border-slate-200/70 dark:border-slate-800">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
          Protocole d&apos;Intervention Préconisé par le Psychologue du Travail
        </span>
        <h4 className="text-base font-bold text-slate-900 dark:text-white m-0">
          Démarche Méthodologique en 3 Étapes
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-1.5">
          <span className="font-mono font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] block">
            Étape 1 · Constat &amp; Mesure
          </span>
          <p className="text-slate-800 dark:text-slate-200 leading-relaxed m-0">
            {situation.protocoleRecommande.etape1}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 space-y-1.5">
          <span className="font-mono font-bold text-slate-600 dark:text-slate-300 uppercase text-[10px] block">
            Étape 2 · Confrontation Clinique
          </span>
          <p className="text-slate-800 dark:text-slate-200 leading-relaxed m-0">
            {situation.protocoleRecommande.etape2}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-700/40 space-y-1.5">
          <span className="font-mono font-bold text-indigo-700 dark:text-indigo-300 uppercase text-[10px] block">
            Étape 3 · Transformation Délibérative
          </span>
          <p className="text-indigo-950 dark:text-indigo-200 leading-relaxed m-0 font-medium">
            {situation.protocoleRecommande.dispositifCle}
          </p>
        </div>
      </div>

      <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/30 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2.5 leading-relaxed">
        <CheckCircle2 className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong>Argumentaire clé pour la copie :</strong>{" "}
          {situation.protocoleRecommande.justificationExamen}
        </div>
      </div>
    </div>
  );
};

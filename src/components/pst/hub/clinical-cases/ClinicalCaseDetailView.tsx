"use client";

import { ChevronLeft } from "lucide-react";
import type { ClinicalVignette } from "@/lib/pst/data/clinical-cases-data";

interface ClinicalCaseDetailViewProps {
  current: ClinicalVignette;
  onBackToMobileList: () => void;
  className?: string;
}

export function ClinicalCaseDetailView({
  current,
  onBackToMobileList,
  className = "",
}: ClinicalCaseDetailViewProps) {
  return (
    <div className={className}>
      {/* Mobile Back Button */}
      <div className="lg:hidden flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={onBackToMobileList}
          className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline py-1 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour à la liste des cas
        </button>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 font-bold">
          {current.ue}
        </span>
      </div>

      {/* Contexte & Commande brute */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/70 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase">
            Énoncé du Cas &amp; Observables de Terrain
          </span>
          <div className="flex flex-wrap gap-1">
            {current.streams.map((st, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
              >
                {st}
              </span>
            ))}
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
          <strong>Commande initiale :</strong> {current.rawCommand}
        </p>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-1 border-t border-slate-200/70 dark:border-slate-800">
          <strong>Observables situés :</strong> {current.terrainObservables}
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 gap-3.5">
        <div className="p-4 rounded-xl border border-amber-500/25 bg-amber-500/5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
            Étape 1 · De la Commande Sociale à la Demande Clinique
          </span>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            {current.step1DemandReformulation}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-indigo-500/25 bg-indigo-500/5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
            Étape 2 · Diagnostic de l'Écart Tâche Prescrite / Activité Réelle
          </span>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            {current.step2PrescribedVsReal}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-purple-500/25 bg-purple-500/5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-1">
            Étape 3 · Mise en Tension Théorique &amp; Controverses CNAM
          </span>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
            {current.step3TheoreticalTension}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-emerald-500/25 bg-emerald-500/5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
            Étape 4 · Architecture du Dispositif &amp; Garanties Déontologiques (Code 2021)
          </span>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            {current.step4InterventionDevice}
          </p>
        </div>
      </div>
    </div>
  );
}

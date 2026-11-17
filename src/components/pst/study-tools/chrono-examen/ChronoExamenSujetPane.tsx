"use client";

import { Sparkles } from "lucide-react";
import {
  SUJETS_EXAMEN_S1,
  type SujetExamenCNAM,
} from "@/lib/pst/data/chrono-examen-data";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface ChronoExamenSujetPaneProps {
  currentSujet: SujetExamenCNAM;
  onSelectSujet: (id: string) => void;
  mobileTab: "sujet" | "redaction";
}

export function ChronoExamenSujetPane({
  currentSujet,
  onSelectSujet,
  mobileTab,
}: ChronoExamenSujetPaneProps) {
  return (
    <div
      className={`lg:col-span-5 border-r border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/50 p-4 sm:p-5 overflow-y-auto space-y-4 ${
        mobileTab === "sujet" ? "block" : "hidden lg:block"
      }`}
    >
      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          Sélection du Sujet :
        </span>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {SUJETS_EXAMEN_S1.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                onSelectSujet(s.id);
                playClickSound();
              }}
              className={`whitespace-nowrap px-3 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                s.id === currentSujet.id
                  ? "bg-indigo-600 border-indigo-400 text-white shadow"
                  : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {s.moduleKey.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Sujet Card */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 space-y-2">
        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
          Énoncé Officiel
        </span>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          {currentSujet.titre}
        </h3>
        <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
          {currentSujet.enonce}
        </p>
      </div>

      {/* Auteurs et concepts attendus */}
      <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 space-y-3 text-xs">
        <div className="space-y-1">
          <span className="font-bold text-slate-500 dark:text-slate-400 text-[10px] uppercase">
            Auteurs impératifs à citer :
          </span>
          <div className="flex flex-wrap gap-1">
            {currentSujet.auteursAttendus.map((a) => (
              <span
                key={a}
                className="px-2 py-0.5 rounded bg-indigo-100/80 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-200 border border-indigo-300/60 dark:border-indigo-800/40 text-[11px] font-medium"
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <span className="font-bold text-slate-500 dark:text-slate-400 text-[10px] uppercase">
            Concepts clés attendus sur la copie :
          </span>
          <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-0.5 text-[11px]">
            {currentSujet.conceptsAttendus.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-1 pt-2 border-t border-slate-200/80 dark:border-slate-800">
          <span className="font-bold text-slate-500 dark:text-slate-400 text-[10px] uppercase">
            Proposition de plan CNAM :
          </span>
          <div className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
            {currentSujet.planConseille.map((p, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-200/80 dark:border-slate-800/80"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-amber-50/90 dark:bg-amber-950/20 border border-amber-300/80 dark:border-amber-800/30 text-xs text-amber-900 dark:text-amber-200/90 flex items-start gap-2">
        <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong>Barème CNAM :</strong> Problématisation (/4), rigueur
          conceptuelle et auteurs (/8), illustration clinique concrète (/5),
          structure et clarté d&apos;écriture (/3).
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import type { FicheItem } from "@/lib/pst/types";
import { findCapsuleForFiche, findSchemaForFiche } from "@/lib/pst/data/fiches-helpers";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { Sparkles, Palette } from "lucide-react";

export interface FicheFeynman60sViewProps {
  visibleFiches: { f: FicheItem; i: number }[];
}

export function FicheFeynman60sView({ visibleFiches }: FicheFeynman60sViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {visibleFiches.map(({ f, i }) => {
        const cap = findCapsuleForFiche(f);
        const matchedSchemaId = findSchemaForFiche(f);

        return (
          <div
            key={i}
            className="p-5 rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3.5 group"
          >
            <div className="space-y-2.5">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">
                  {cap.auteur}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {cap.titre}
              </h3>
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-1">
                <p className="font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Intuition Feynman :
                </p>
                <p>{cap.intuitionMetaphore}</p>
              </div>
              <div className="text-xs space-y-1.5 pt-1">
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    🎯 Formule clé :{" "}
                  </span>
                  {cap.formuleMatrice}
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    🏢 Cas réel :{" "}
                  </span>
                  {cap.casReelApplication}
                </p>
                <p className="text-rose-700 dark:text-rose-400 font-medium">
                  <span className="font-bold">
                    ⚠️ Piège d&apos;examen :{" "}
                  </span>
                  {cap.piegeExamen}
                </p>
              </div>
            </div>

            {cap.motsObligatoires && cap.motsObligatoires.length > 0 && (
              <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1 flex-wrap">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  Mots clés 18/20 :
                </span>
                {cap.motsObligatoires.map((kw, kwIdx) => (
                  <span
                    key={kwIdx}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-700 dark:text-slate-300"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            )}

            {matchedSchemaId && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playClickSound();
                    window.dispatchEvent(
                      new CustomEvent("pst:open-schemas", {
                        detail: { schemaId: matchedSchemaId },
                      }),
                    );
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-cyan-500/15 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-500/25 transition-all cursor-pointer"
                >
                  <Palette className="size-3.5" />
                  <span>Schéma SVG 18/20</span>
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

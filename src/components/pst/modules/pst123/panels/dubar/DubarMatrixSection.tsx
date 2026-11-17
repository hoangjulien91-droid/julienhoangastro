"use client";

import { useState } from "react";
import {
  Layers,
  CheckCircle2,
  Brain,
  Quote,
  Sparkles,
  Check,
  Copy,
} from "lucide-react";
import {
  DUBAR_QUADRANTS,
  type DubarQuadrant,
} from "@/lib/pst/data/dubar-sainsaulieu-data";
import {
  playClickSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface DubarMatrixSectionProps {
  onCopyQuote: (quote: string) => void;
  copiedQuote: boolean;
}

export function DubarMatrixSection({
  onCopyQuote,
  copiedQuote,
}: DubarMatrixSectionProps) {
  const [selectedDubarId, setSelectedDubarId] =
    useState<DubarQuadrant["id"]>("promotion");

  const selectedDubar =
    DUBAR_QUADRANTS.find((q) => q.id === selectedDubarId) ?? DUBAR_QUADRANTS[0];

  return (
    <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-150">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Visual 2x2 Matrix */}
        <div className="lg:col-span-7 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
              <Layers className="size-4 shrink-0" />
              <span>Matrice 2×2 de la Double Transaction</span>
            </span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              Touchez un quadrant pour l&apos;analyser
            </span>
          </div>

          {/* Axis labels */}
          <div className="space-y-3">
            <div className="text-center">
              <span className="inline-block text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                ▲ Transaction Relationnelle (Autrui : Reconnaissance / Statut)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DUBAR_QUADRANTS.map((quad) => {
                const isSelected = quad.id === selectedDubarId;
                return (
                  <button
                    key={quad.id}
                    type="button"
                    onClick={() => {
                      setSelectedDubarId(quad.id);
                      playClickSound();
                      triggerHaptic();
                    }}
                    style={{
                      borderColor: isSelected ? quad.accent : undefined,
                      backgroundColor: isSelected ? `${quad.accent}14` : undefined,
                    }}
                    className={`text-left p-4 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[10.5rem] cursor-pointer active:scale-[0.99] ${
                      isSelected
                        ? "ring-2 ring-indigo-500/40 shadow-sm"
                        : "bg-slate-50/70 dark:bg-slate-950/50 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md uppercase tracking-wider"
                          style={{
                            color: quad.accent,
                            backgroundColor: `${quad.accent}22`,
                          }}
                        >
                          {quad.id}
                        </span>
                        {isSelected && (
                          <CheckCircle2
                            className="size-4 shrink-0"
                            style={{ color: quad.accent }}
                          />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug m-0">
                        {quad.nom}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 m-0">
                        {quad.sousTitre}
                      </p>
                    </div>

                    <div className="pt-2.5 mt-2 border-t border-slate-200/70 dark:border-slate-800/70 text-[11px] text-slate-600 dark:text-slate-400 space-y-0.5">
                      <div className="truncate">
                        <span className="text-slate-900 dark:text-slate-200 font-semibold">
                          Pour soi :
                        </span>{" "}
                        {quad.pourSoi}
                      </div>
                      <div className="truncate">
                        <span className="text-slate-900 dark:text-slate-200 font-semibold">
                          Autrui :
                        </span>{" "}
                        {quad.pourAutrui}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="text-center">
              <span className="inline-block text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                ◄ Transaction Biographique (Soi : Continuité vs Rupture) ►
              </span>
            </div>
          </div>

          {/* Dubar Law reminder */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-800/40 text-xs text-indigo-950 dark:text-indigo-200 flex items-start gap-2.5 leading-relaxed">
            <Brain className="size-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong>Formule reine du CNAM :</strong> « L&apos;identité est le produit de la double transaction biographique (pour soi dans le temps) et relationnelle (pour autrui dans l&apos;espace social). »
            </div>
          </div>
        </div>

        {/* Quadrant Details Card */}
        <div className="lg:col-span-5 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-800">
              <div className="space-y-1">
                <span
                  className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md uppercase tracking-wider inline-block"
                  style={{
                    color: selectedDubar.accent,
                    backgroundColor: `${selectedDubar.accent}20`,
                  }}
                >
                  Détail du Quadrant
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white m-0">
                  {selectedDubar.nom}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onCopyQuote(selectedDubar.citationDubar)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer shrink-0"
                title="Copier la citation pour la copie"
              >
                {copiedQuote ? (
                  <Check className="size-4 text-emerald-500" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div>
                <h5 className="font-bold text-slate-900 dark:text-slate-200 mb-1 m-0">
                  Mécanisme sociologique :
                </h5>
                <p className="text-slate-700 dark:text-slate-300 m-0">
                  {selectedDubar.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 bg-slate-50/90 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <div>
                  <span className="font-mono font-bold text-slate-500 dark:text-slate-400 block text-[10px] uppercase">
                    Processus Biographique
                  </span>
                  <span className="text-slate-900 dark:text-slate-200 font-medium">
                    {selectedDubar.pourSoi}
                  </span>
                </div>
                <div>
                  <span className="font-mono font-bold text-slate-500 dark:text-slate-400 block text-[10px] uppercase">
                    Processus Relationnel
                  </span>
                  <span className="text-slate-900 dark:text-slate-200 font-medium">
                    {selectedDubar.pourAutrui}
                  </span>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 dark:text-slate-200 mb-1 m-0">
                  Exemple concret :
                </h5>
                <p className="text-slate-700 dark:text-slate-300 italic bg-slate-50/90 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800/60 m-0">
                  {selectedDubar.exemples}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-800/40 space-y-1">
                <div className="flex items-center gap-1.5 text-purple-800 dark:text-purple-300 font-bold text-xs">
                  <Quote className="size-3.5 shrink-0" />
                  <span>Citation textuelle à citer :</span>
                </div>
                <p className="text-purple-950 dark:text-purple-200 italic m-0">
                  {selectedDubar.citationDubar}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/70 dark:border-slate-800">
            <div className="flex items-start gap-2 text-xs text-amber-950 dark:text-amber-200 bg-amber-50/70 dark:bg-amber-950/20 p-3 rounded-xl border border-amber-200/80 dark:border-amber-800/30 leading-relaxed">
              <Sparkles className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Conseil correcteur CNAM :</strong> {selectedDubar.conseilExamen}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

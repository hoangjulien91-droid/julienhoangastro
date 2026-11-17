"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Quote,
  Sparkles,
  Check,
  Copy,
} from "lucide-react";
import {
  SAINSAULIEU_MODELS,
  type SainsaulieuModel,
} from "@/lib/pst/data/dubar-sainsaulieu-data";
import {
  playClickSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface SainsaulieuModelsSectionProps {
  onCopyQuote: (quote: string) => void;
  copiedQuote: boolean;
}

export function SainsaulieuModelsSection({
  onCopyQuote,
  copiedQuote,
}: SainsaulieuModelsSectionProps) {
  const [selectedSainsaulieuId, setSelectedSainsaulieuId] =
    useState<SainsaulieuModel["id"]>("fusionnel");

  const selectedSainsaulieu =
    SAINSAULIEU_MODELS.find((m) => m.id === selectedSainsaulieuId) ??
    SAINSAULIEU_MODELS[0];

  return (
    <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-150">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {SAINSAULIEU_MODELS.map((mod) => {
          const isSelected = mod.id === selectedSainsaulieuId;
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => {
                setSelectedSainsaulieuId(mod.id);
                playClickSound();
                triggerHaptic();
              }}
              style={{
                borderColor: isSelected ? mod.accent : undefined,
                backgroundColor: isSelected ? `${mod.accent}12` : undefined,
              }}
              className={`text-left p-4 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-3 cursor-pointer active:scale-[0.99] ${
                isSelected
                  ? "ring-2 ring-indigo-500/40 shadow-sm"
                  : "bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md uppercase tracking-wider"
                    style={{
                      color: mod.accent,
                      backgroundColor: `${mod.accent}20`,
                    }}
                  >
                    {mod.id}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="size-4 shrink-0" style={{ color: mod.accent }} />
                  )}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:white leading-tight m-0">
                  {mod.nom}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 m-0">
                  {mod.populationTypique}
                </p>
              </div>

              <div className="space-y-1.5 pt-2.5 border-t border-slate-200/70 dark:border-slate-800 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Pouvoir poste :</span>
                  <span className="font-bold text-slate-900 dark:text-slate-200">
                    {mod.pouvoirSurPoste.split(" ")[0]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Dépendance pairs :</span>
                  <span className="font-bold text-slate-900 dark:text-slate-200">
                    {mod.dependanceRelationnelle.split(" ")[0]}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Sainsaulieu Focus Panel */}
      <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200/70 dark:border-slate-800 gap-3">
          <div>
            <span
              className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider inline-block mb-1"
              style={{
                color: selectedSainsaulieu.accent,
                backgroundColor: `${selectedSainsaulieu.accent}20`,
              }}
            >
              Modèle Sélectionné
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white m-0">
              {selectedSainsaulieu.nom}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 m-0 mt-0.5">
              {selectedSainsaulieu.populationTypique}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onCopyQuote(selectedSainsaulieu.citationSainsaulieu)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold self-start transition-colors cursor-pointer"
          >
            {copiedQuote ? (
              <Check className="size-3.5 text-emerald-500" />
            ) : (
              <Copy className="size-3.5" />
            )}
            <span>Copier citation</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="font-mono font-bold text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider block">
              Valeur Cardinale
            </span>
            <p className="text-slate-900 dark:text-slate-200 font-medium text-xs sm:text-sm m-0 leading-relaxed">
              {selectedSainsaulieu.valeurCardinale}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="font-mono font-bold text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider block">
              Rapport à l&apos;Autorité
            </span>
            <p className="text-slate-900 dark:text-slate-200 font-medium text-xs sm:text-sm m-0 leading-relaxed">
              {selectedSainsaulieu.rapportAutorite}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="font-mono font-bold text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider block">
              Structure de Pouvoir
            </span>
            <p className="text-slate-900 dark:text-slate-200 font-medium text-xs sm:text-sm m-0 leading-relaxed">
              Pouvoir : {selectedSainsaulieu.pouvoirSurPoste} · Dépendance : {selectedSainsaulieu.dependanceRelationnelle}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-800/40 space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300 font-bold text-xs">
            <Quote className="size-4 shrink-0" />
            <span>Citation canonique (L&apos;identité au travail, 1977) :</span>
          </div>
          <p className="text-indigo-950 dark:text-indigo-200 italic text-xs sm:text-sm m-0 leading-relaxed">
            {selectedSainsaulieu.citationSainsaulieu}
          </p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/30 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2.5 leading-relaxed">
          <Sparkles className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Point clé copie d&apos;examen :</strong> {selectedSainsaulieu.conseilExamen}
          </div>
        </div>
      </div>
    </div>
  );
}

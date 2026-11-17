"use client";

import { FileText, Copy, Check } from "lucide-react";
import type { CaseItem } from "@/lib/pst/types";
import {
  METHODE_CRITERIA,
  type MethodeStepNotes,
} from "@/lib/pst/data/cas-cliniques-data";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";
import { CasMethodeBentoCards } from "./methode/CasMethodeBentoCards";
import { CasMethodeEvaluationGrid } from "./methode/CasMethodeEvaluationGrid";

interface CasMethode3TempsViewProps {
  data: CaseItem[];
  methodeVignetteIdx: number;
  onSelectVignette: (idx: number) => void;
  methodeNotes: Record<number, MethodeStepNotes>;
  onUpdateNote: (step: "temps1" | "temps2" | "temps3", val: string) => void;
  checkedCriteria: boolean[];
  onToggleCriterion: (idx: number) => void;
  onResetCriteria: () => void;
  onCopyMethode: () => void;
  copiedMethode: boolean;
}

export function CasMethode3TempsView({
  data,
  methodeVignetteIdx,
  onSelectVignette,
  methodeNotes,
  onUpdateNote,
  checkedCriteria,
  onToggleCriterion,
  onResetCriteria,
  onCopyMethode,
  copiedMethode,
}: CasMethode3TempsViewProps) {
  const selectedCase = data[methodeVignetteIdx];
  const curNotes = methodeNotes[methodeVignetteIdx] ?? {
    temps1: "",
    temps2: "",
    temps3: "",
  };
  const validCount = checkedCriteria.filter(Boolean).length;
  const note20 = Math.round((validCount / METHODE_CRITERIA.length) * 20);

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header Banner & 3 Temps Bento Cards */}
      <CasMethodeBentoCards validCount={validCount} note20={note20} />

      {/* Interactive Scratchpad Trainer */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
              <FileText className="size-3 text-indigo-600 dark:text-indigo-400" />
              <span>Atelier d&apos;Entraînement Clinique</span>
            </span>
            <span className="text-xs font-mono font-bold text-slate-500">
              Vignette #{methodeVignetteIdx + 1} / {data.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCopyMethode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer active:scale-95"
            >
              {copiedMethode ? (
                <>
                  <Check className="size-3 text-emerald-300" />
                  <span>Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  <span>Copier l&apos;analyse</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Vignette switcher pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {data.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                playClickSound();
                triggerHaptic("selection");
                onSelectVignette(i);
              }}
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                i === methodeVignetteIdx
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Cas #{i + 1}
            </button>
          ))}
        </div>

        {/* Selected Vignette Quote */}
        {selectedCase && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
            <p className="text-xs sm:text-sm italic leading-relaxed text-slate-800 dark:text-slate-200 m-0 font-medium">
              « {selectedCase.vignette} »
            </p>
          </div>
        )}

        {/* 3 Textareas */}
        <div className="space-y-4 pt-1">
          {/* Step 1 input */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-mono font-bold text-blue-700 dark:text-blue-400">
              <span>
                1. Diagnostic des Faits Cliniques &amp; Travail Réel (Temps 1)
              </span>
              <span className="text-[10px] font-normal text-slate-400">
                {curNotes.temps1.trim().split(/\s+/).filter(Boolean).length}{" "}
                mots
              </span>
            </label>
            <textarea
              value={curNotes.temps1}
              onChange={(e) => onUpdateNote("temps1", e.target.value)}
              placeholder="Relevez les faits observables : prescriptions formelles, écarts au travail réel, manifestations physiques/somatiques, dysfonctionnements..."
              rows={3}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/40"
            />
          </div>

          {/* Step 2 input */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-mono font-bold text-purple-700 dark:text-purple-400">
              <span>2. Modélisation Théorique Anti-Psychologisme (Temps 2)</span>
              <span className="text-[10px] font-normal text-slate-400">
                {curNotes.temps2.trim().split(/\s+/).filter(Boolean).length}{" "}
                mots
              </span>
            </label>
            <textarea
              value={curNotes.temps2}
              onChange={(e) => onUpdateNote("temps2", e.target.value)}
              placeholder="Mobilisez 2 à 3 concepts d'auteurs (activité empêchée, souffrance éthique, double transaction, genèse instrumentale, défenses collectives). Zéro explication par la personnalité !"
              rows={3}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500/40"
            />
          </div>

          {/* Step 3 input */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
              <span>
                3. Préconisations d&apos;Intervention &amp; Déontologie (Temps 3)
              </span>
              <span className="text-[10px] font-normal text-slate-400">
                {curNotes.temps3.trim().split(/\s+/).filter(Boolean).length}{" "}
                mots
              </span>
            </label>
            <textarea
              value={curNotes.temps3}
              onChange={(e) => onUpdateNote("temps3", e.target.value)}
              placeholder="Posez votre cadre déontologique : refus d'évaluer les personnes, respect du secret professionnel, restitution collective, réouverture des espaces de délibération sur le travail bien fait..."
              rows={3}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>
        </div>
      </div>

      {/* Grille d'Auto-Évaluation (12 Critères Cnam /20) */}
      <CasMethodeEvaluationGrid
        checkedCriteria={checkedCriteria}
        onToggleCriterion={onToggleCriterion}
        onResetCriteria={onResetCriteria}
      />
    </div>
  );
}

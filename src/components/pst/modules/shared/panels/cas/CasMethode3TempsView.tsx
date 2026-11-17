"use client";

import {
  GraduationCap,
  Sparkles,
  FileText,
  Copy,
  Check,
  ShieldCheck,
} from "lucide-react";
import type { CaseItem } from "@/lib/pst/types";
import {
  METHODE_CRITERIA,
  type MethodeStepNotes,
} from "@/lib/pst/data/cas-cliniques-data";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

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
  const curNotes = methodeNotes[methodeVignetteIdx] ?? { temps1: "", temps2: "", temps3: "" };
  const validCount = checkedCriteria.filter(Boolean).length;
  const note20 = Math.round((validCount / METHODE_CRITERIA.length) * 20);

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-500/20 backdrop-blur-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-xs">
            <GraduationCap className="size-3.5" />
            <span>Méthodologie Officielle CNAM · Option B /20</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/80 dark:bg-slate-900/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-2xs">
            <Sparkles className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>
              {validCount} / {METHODE_CRITERIA.length} critères validés ({note20}/20)
            </span>
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight m-0">
          La Démarche d&apos;Analyse Clinique en 3 Temps Canoniques
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed m-0">
          À l&apos;examen du Titre RNCP 7 Psychologue du Travail, l&apos;étude de cas clinique (Option B) sanctionne
          sévèrement toute posture de « bon sens » ou de « gestion RH ». Votre copie doit impérativement articuler
          les 3 temps académiques ci-dessous.
        </p>
      </div>

      {/* 3 Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Temps 1 */}
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
              Temps 1 · 6 Points
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-500">Faits &amp; Réel</span>
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
            1. Diagnostic Clinique des Faits &amp; Recueil du Travail Réel
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed m-0">
            Relever objectivement ce que font concrètement les opérateurs face aux failles de la prescription.
            Dégager l&apos;écart prescrit vs réel (Wisner, Leplat) et les signaux de souffrance (somatisation, conflits, turnover).
          </p>
          <div className="p-2.5 rounded-xl bg-blue-500/5 border border-blue-500/15 text-[11px] text-blue-900 dark:text-blue-200 space-y-1">
            <strong className="block font-bold">Règle d&apos;or :</strong>
            <span>Ne jamais qualifier un écart de « faute » : c&apos;est une régulation pour faire tourner le système.</span>
          </div>
        </div>

        {/* Temps 2 */}
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
              Temps 2 · 8 Points
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-500">Concepts Clés</span>
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
            2. Modélisation Théorique Anti-Psychologisme
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed m-0">
            Interpréter les faits par les concepts du cours (Clot, Wisner, Dejours, Sainsaulieu, Dubar, Rabardel).
            Démontrer que la souffrance découle de l&apos;organisation du travail et non d&apos;une faiblesse individuelle.
          </p>
          <div className="p-2.5 rounded-xl bg-purple-500/5 border border-purple-500/15 text-[11px] text-purple-900 dark:text-purple-200 space-y-1">
            <strong className="block font-bold">Interdiction absolue :</strong>
            <span>Le psychologisme (« manque de résilience », « profil anxieux »). Tout est clinique et organisationnel.</span>
          </div>
        </div>

        {/* Temps 3 */}
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              Temps 3 · 6 Points
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-500">Déontologie</span>
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
            3. Préconisations d&apos;Intervention &amp; Déontologie
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed m-0">
            Refuser la commande de sélection ou d&apos;évaluation individuelle de la DRH.
            Restituer collectivement les déterminants du travail et réouvrir des espaces de controverse sur le travail bien fait.
          </p>
          <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-500/15 text-[11px] text-emerald-900 dark:text-emerald-200 space-y-1">
            <strong className="block font-bold">Cadre légal impératif :</strong>
            <span>Art. 1, 5, 7, 9 du Code 2021 &amp; Secret professionnel (Art. 226-13 CP).</span>
          </div>
        </div>
      </div>

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
              <span>1. Diagnostic des Faits Cliniques &amp; Travail Réel (Temps 1)</span>
              <span className="text-[10px] font-normal text-slate-400">
                {curNotes.temps1.trim().split(/\s+/).filter(Boolean).length} mots
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
                {curNotes.temps2.trim().split(/\s+/).filter(Boolean).length} mots
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
              <span>3. Préconisations d&apos;Intervention &amp; Déontologie (Temps 3)</span>
              <span className="text-[10px] font-normal text-slate-400">
                {curNotes.temps3.trim().split(/\s+/).filter(Boolean).length} mots
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
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
            <ShieldCheck className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Grille Officielle d&apos;Auto-Évaluation CNAM (12 Critères)</span>
          </span>

          <button
            type="button"
            onClick={onResetCriteria}
            className="text-xs font-mono font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
          >
            Tout réinitialiser
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {METHODE_CRITERIA.map((crit, cIdx) => {
            const isChecked = !!checkedCriteria[cIdx];
            return (
              <label
                key={cIdx}
                onClick={() => onToggleCriterion(cIdx)}
                className={`p-3 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer flex items-start gap-2.5 select-none active:scale-99 ${
                  isChecked
                    ? "bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800 text-indigo-950 dark:text-indigo-200 font-medium"
                    : "bg-slate-50/50 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100/80"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="mt-0.5 size-4 rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-500 shrink-0 cursor-pointer"
                />
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {crit.step}
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded-md bg-black/5 dark:bg-white/10 text-slate-600 dark:text-slate-400">
                      {crit.pts}
                    </span>
                  </div>
                  <p className={`text-xs m-0 ${isChecked ? "" : "text-slate-600 dark:text-slate-400"}`}>
                    {crit.label}
                  </p>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

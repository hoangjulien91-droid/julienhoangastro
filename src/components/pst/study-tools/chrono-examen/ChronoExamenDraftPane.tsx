"use client";

import { FileText, Copy, Check, Briefcase } from "lucide-react";
import {
  VIGNETTES_CLINIQUES_TERRAIN,
  type SujetExamenCNAM,
} from "@/lib/pst/data/chrono-examen-data";
import { playSuccessSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface ChronoExamenDraftPaneProps {
  currentSujet: SujetExamenCNAM;
  draftContent: string;
  onDraftChange: (text: string) => void;
  wordsCount: number;
  copied: boolean;
  onCopyText: () => void;
  mobileTab: "sujet" | "redaction";
}

export function ChronoExamenDraftPane({
  currentSujet,
  draftContent,
  onDraftChange,
  wordsCount,
  copied,
  onCopyText,
  mobileTab,
}: ChronoExamenDraftPaneProps) {
  const insertStructureTemplate = () => {
    const template = `TITRE / SUJET : ${currentSujet.titre}

INTRODUCTION
- Accroche & Contexte : 
- Définition des termes clés : 
- Problématique : 
- Annonce du plan : 

I. PREMIÈRE PARTIE
A. Sous-partie I.A : 
- Auteur & Citation : 
- Illustration clinique : 

B. Sous-partie I.B : 
- Auteur & Citation : 
- Illustration clinique : 
Transition : 

II. DEUXIÈME PARTIE
A. Sous-partie II.A : 
- Auteur & Citation : 
- Illustration clinique : 

B. Sous-partie II.B : 
- Auteur & Citation : 
- Illustration clinique : 

CONCLUSION
- Bilan synthétique : 
- Réponse nette à la problématique : 
- Ouverture (Épistémologique / Déontologique) : 
`;
    onDraftChange(template);
    playSuccessSound();
    triggerHaptic();
  };

  return (
    <div
      className={`lg:col-span-7 flex flex-col bg-slate-100/40 dark:bg-slate-950/30 p-3.5 sm:p-5 space-y-3 ${
        mobileTab === "redaction" ? "flex" : "hidden lg:flex"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <FileText className="size-3.5 sm:size-4 text-slate-500 dark:text-slate-400 shrink-0" />
          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
            Espace de Rédaction
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0 font-mono">
            ({wordsCount} mots)
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={insertStructureTemplate}
            className="px-2.5 py-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-colors cursor-pointer"
            title="Insérer le canevas de plan académique"
          >
            <span className="hidden sm:inline">Insérer structure type</span>
            <span className="sm:hidden">Structure</span>
          </button>
          <button
            onClick={onCopyText}
            className="px-2.5 py-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span>{copied ? "Copié !" : "Copier"}</span>
          </button>
        </div>
      </div>

      {/* 1-Click Clinical Terrain Vignette Insertion Bar (/5 pts CNAM Rubric) */}
      <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-1.5">
        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mr-1">
          <Briefcase className="size-3" />
          <span>+ Vignette Terrain (/5 pts) :</span>
        </span>
        {VIGNETTES_CLINIQUES_TERRAIN.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => {
              onDraftChange(draftContent + v.paragraphe);
              playSuccessSound();
              triggerHaptic();
            }}
            className="px-2 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/25 text-indigo-800 dark:text-indigo-200 text-[11px] font-semibold transition-colors cursor-pointer"
            title="Insérer cette illustration clinique articulée aux auteurs dans votre copie"
          >
            + {v.label}
          </button>
        ))}
      </div>

      <textarea
        value={draftContent}
        onChange={(e) => onDraftChange(e.target.value)}
        placeholder="Commencez votre épreuve ici... (Sauvegarde automatique locale)"
        className="flex-1 w-full min-h-[300px] p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-sans leading-relaxed resize-none scrollbar-thin"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10px] sm:text-xs text-slate-500 pt-1">
        <span>Auto-sauvegarde activée dans le navigateur</span>
        <span>Recommandé : ~1500 à 2500 mots pour 3h d&apos;examen</span>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import {
  Calendar,
  Clock,
  Video,
  Users,
  CheckCircle2,
  BookOpen,
  Volume2,
  Maximize2,
  Minimize2,
  Sparkles,
  Printer,
} from "lucide-react";
import type { SeanceCoursItem } from "@/lib/pst/data/seances-cours";
import type { EssentielCoursCard } from "@/lib/pst/data/essentiel-cours";
import { EncartEssentielCours } from "@/components/pst/shell/EncartEssentielCours";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

export interface SeanceHeroBannerProps {
  activeSeance: SeanceCoursItem;
  activeEssentiel: EssentielCoursCard | null;
  readingMinutes: number;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
  showAudioReader: boolean;
  onToggleAudioReader: () => void;
}

export function SeanceHeroBanner({
  activeSeance,
  activeEssentiel,
  readingMinutes,
  isFocusMode,
  onToggleFocusMode,
  showAudioReader,
  onToggleAudioReader,
}: SeanceHeroBannerProps) {
  return (
    <div className="p-4 sm:p-7 rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-amber-500/[0.04] shadow-xs space-y-4">
      {/* Top Badges & Utility Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/30">
            {activeSeance.moduleLabel} · Séance {activeSeance.numeroSeance}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted/60 text-muted-foreground border border-border/60">
            <Calendar className="size-3.5 text-muted-foreground" />
            {activeSeance.dateSeance}
          </span>
          {activeSeance.format === "webconference" ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-900 dark:text-indigo-200 border border-indigo-500/25">
              <Video className="size-3.5 text-indigo-500" />
              Webconférence (Visio)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 border border-emerald-500/25">
              <Users className="size-3.5 text-emerald-500" />
              Présentiel
            </span>
          )}
          {activeSeance.dureeEnregistrement && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-sky-500/10 text-sky-900 dark:text-sky-200 border border-sky-500/25">
              <Clock className="size-3.5 text-sky-500" />
              {activeSeance.dureeEnregistrement}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/20">
            <BookOpen className="size-3.5 text-amber-600 dark:text-amber-400" />
            ~{readingMinutes} min de lecture
          </span>
        </div>

        {/* Action Buttons: Audio & Focus */}
        <div className="flex items-center gap-2">
          {activeEssentiel && (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                triggerHaptic("light");
                onToggleAudioReader();
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border shadow-2xs active:scale-95 ${
                showAudioReader
                  ? "bg-amber-600 text-white border-amber-600"
                  : "bg-card hover:bg-muted text-foreground border-border/80"
              }`}
              title="Écouter le résumé audio de la séance (Web Speech)"
            >
              <Volume2 className="size-3.5 text-amber-500" />
              <span>{showAudioReader ? "Masquer lecteur" : "Écouter l'Essentiel"}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              playClickSound();
              triggerHaptic("light");
              onToggleFocusMode();
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border shadow-2xs active:scale-95 ${
              isFocusMode
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card hover:bg-muted text-foreground border-border/80"
            }`}
            title={isFocusMode ? "Quitter le mode focus" : "Passer en mode lecture focus (sans distraction)"}
          >
            {isFocusMode ? (
              <Minimize2 className="size-3.5" />
            ) : (
              <Maximize2 className="size-3.5" />
            )}
            <span className="hidden sm:inline">
              {isFocusMode ? "Quitter Focus" : "Mode Focus"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              window.print();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border shadow-2xs active:scale-95 bg-card hover:bg-muted text-foreground border-border/80 print:hidden"
            title="Imprimer / Exporter cette séance en fiche A4"
          >
            <Printer className="size-3.5 text-slate-500" />
            <span className="hidden sm:inline">Fiche A4</span>
          </button>
        </div>
      </div>

      {/* Main Title & Professor */}
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-foreground tracking-tight leading-snug">
          {activeSeance.titre}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed font-sans">
          {activeSeance.sousTitre} ·{" "}
          <strong className="text-foreground">{activeSeance.enseignant}</strong>
        </p>
      </div>

      {/* Encart Fiche L'Essentiel du Cours (ou Repères fondamentaux) */}
      {activeEssentiel ? (
        <EncartEssentielCours
          key={activeEssentiel.id}
          cards={[activeEssentiel]}
          detailBullets={activeSeance.resumeExecutif}
          compact
        />
      ) : (
        <div className="p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border/60 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-2">
            <Sparkles className="size-3.5 text-amber-500" />
            <span>Repères doctrinaux essentiels abordés en séance :</span>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-foreground/90 leading-relaxed pt-1">
            {activeSeance.resumeExecutif.map((pt, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 bg-card/70 p-2.5 rounded-xl border border-border/40 shadow-2xs"
              >
                <span className="size-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

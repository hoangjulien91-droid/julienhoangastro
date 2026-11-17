"use client";

import { useState } from "react";
import {
  Compass,
  Sparkles,
  Zap,
  BookOpen,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { JourJQuiz } from "../JourJQuiz";

interface Dashboard106ExamCourseCardsProps {
  onGoTab?: (panel: string) => void;
}

export function Dashboard106ExamCourseCards({
  onGoTab,
}: Dashboard106ExamCourseCardsProps) {
  const [jourJOpen, setJourJOpen] = useState(false);

  return (
    <>
      {/* FIL CONDUCTEUR DE L'EXAMEN CNAM PST106 */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-indigo-500/25 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5 shadow-2xs">
            <Compass className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Fil conducteur de l&apos;examen Cnam</span>
          </span>
          <span className="text-[10px] font-mono font-semibold text-muted-foreground uppercase">
            PST106 · Clinique du Travail
          </span>
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-serif font-bold tracking-tight text-foreground m-0">
            Développement → Pouvoir d&apos;agir → Santé
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed m-0">
            La santé n&apos;est ni l&apos;absence de maladie ni l&apos;adaptation passive au stress : c&apos;est la capacité
            collective et individuelle à transformer son milieu de travail pour y vivre de nouvelles expériences.
          </p>
        </div>
      </div>

      {/* DERNIER COURS EN LIGNE (COURS 3 DU 28 OCTOBRE) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-br from-amber-500/10 via-card to-emerald-500/5 border-2 border-amber-500/35 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/35 inline-flex items-center gap-1.5">
            <Sparkles className="size-3 text-amber-600 dark:text-amber-400" />
            <span>Séance du 28 octobre 2026 · Pr. Christine Lagabrielle</span>
          </span>
          <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 font-mono">
            1 h 52 min
          </span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground m-0">
            Cours 3 : Du Facteur Humain à l&apos;Analyse de l&apos;Activité
          </h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Intégralité du cours retranscrit : Expériences de Hawthorne (Mayo), théories de la motivation (Herzberg, Maslow, Lewin), couple prescrit/réel (Wisner), schéma des 5 carrés (Jacques Leplat) et psychopathologie de Louis Le Guillant.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onGoTab && (
            <>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onGoTab("seances");
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(
                      new CustomEvent("pst:select-seance", { detail: { seanceId: "pst106-s3" } }),
                    );
                  }
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <BookOpen className="size-3.5" />
                <span>Ouvrir le Cours 3 (Verbatim &amp; Synthèse)</span>
                <ArrowRight className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onGoTab("fiches");
                }}
                className="px-3.5 py-2 rounded-xl bg-card border border-border hover:bg-muted font-bold text-xs flex items-center gap-2 cursor-pointer shadow-2xs active:scale-95 transition-all"
              >
                <GraduationCap className="size-3.5 text-amber-500" />
                <span>Voir les 3 Fiches du Cours 3</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onGoTab("ad");
                }}
                className="px-3.5 py-2 rounded-xl bg-card border border-border hover:bg-muted font-bold text-xs flex items-center gap-2 cursor-pointer shadow-2xs active:scale-95 transition-all"
              >
                <GraduationCap className="size-3.5 text-indigo-500" />
                <span>Consignes &amp; Cas Harwood (AD)</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* QUIZ EXPRESS DU JOUR J */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 inline-flex items-center gap-1.5">
            <Zap className="size-3 text-rose-600" />
            <span>5 min chrono · Échauffement express</span>
          </span>
          <span className="text-xs font-semibold text-slate-400 font-mono">
            10 Questions
          </span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
            Quiz du Jour J
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            10 questions tirées au sort (QCM + Vrai/Faux), 5 minutes chrono.
            Idéal pour s&apos;échauffer l&apos;esprit juste avant l&apos;épreuve
            et réactiver les automatismes cliniques.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setJourJOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 font-bold text-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Lancer le quiz express</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
      {jourJOpen && <JourJQuiz onClose={() => setJourJOpen(false)} />}
    </>
  );
}

"use client";

import React from "react";
import {
  Users,
  ChevronLeft,
  CheckCircle2,
  Scale,
  AlertTriangle,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import { type JuryQuestion } from "@/lib/pst/data/oral-defense-data";

interface OralDefenseQuestionDetailProps {
  activeQuestion: JuryQuestion;
  isMastered: boolean;
  showAnswer: boolean;
  mobileTab: "list" | "detail";
  totalQuestionsCount: number;
  onBackToList: () => void;
  onToggleMastered: () => void;
  onToggleShowAnswer: () => void;
}

export const OralDefenseQuestionDetail: React.FC<
  OralDefenseQuestionDetailProps
> = ({
  activeQuestion,
  isMastered,
  showAnswer,
  mobileTab,
  totalQuestionsCount,
  onBackToList,
  onToggleMastered,
  onToggleShowAnswer,
}) => {
  return (
    <div
      className={`lg:col-span-7 overflow-y-auto p-3.5 sm:p-5 space-y-3.5 sm:space-y-4 ${
        mobileTab === "detail" ? "block" : "hidden lg:block"
      }`}
    >
      {/* Mobile Back Button */}
      <div className="lg:hidden pb-1">
        <button
          type="button"
          onClick={onBackToList}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-background text-xs font-mono font-bold text-accent hover:bg-muted cursor-pointer"
        >
          <ChevronLeft className="size-3.5" />
          <span>← Retour aux questions ({totalQuestionsCount})</span>
        </button>
      </div>

      <div className="p-3.5 sm:p-4 rounded-2xl border border-border bg-muted/20 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-accent">
            <Users className="size-3.5" />
            <span>{activeQuestion.roleLabel}</span>
          </span>
          <button
            type="button"
            onClick={onToggleMastered}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold border transition-colors cursor-pointer ${
              isMastered
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                : "bg-background hover:bg-muted text-muted-foreground border-border"
            }`}
          >
            <CheckCircle2 className="size-3.5" />
            <span>
              {isMastered
                ? "Argumentaire Maîtrisé"
                : "Marquer comme Maîtrisé"}
            </span>
          </button>
        </div>

        <blockquote className="text-sm sm:text-base font-serif font-bold text-foreground m-0 leading-relaxed">
          « {activeQuestion.question} »
        </blockquote>
      </div>

      {/* Toggle Answer Visibility */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-bold">
          Grille d&apos;Analyse &amp; Réponse Attendue par le Jury
        </span>
        <button
          type="button"
          onClick={onToggleShowAnswer}
          className="text-xs font-mono font-semibold text-accent hover:underline cursor-pointer"
        >
          {showAnswer
            ? "Masquer le corrigé (Entraînement à blanc)"
            : "Afficher le corrigé"}
        </button>
      </div>

      {showAnswer && (
        <div className="space-y-3.5 animate-in fade-in duration-150">
          {/* 1. Tension épistémologique */}
          <div className="p-3.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
              <Scale className="size-4 shrink-0" />
              <span>Enjeu Épistémologique Sous-Jacent</span>
            </div>
            <p className="text-xs text-foreground/90 leading-relaxed m-0">
              {activeQuestion.underlyingTension}
            </p>
          </div>

          {/* 2. Piège éliminatoire */}
          <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-300">
              <AlertTriangle className="size-4 shrink-0" />
              <span>Piège Éliminatoire à Éviter Absolument</span>
            </div>
            <p className="text-xs text-foreground/90 leading-relaxed m-0">
              {activeQuestion.fatalTrap}
            </p>
          </div>

          {/* 3. Structure de réponse en 3 temps */}
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <ShieldCheck className="size-4 shrink-0" />
              <span>Architecture de Réponse Attendue (3 Temps)</span>
            </div>
            <ol className="space-y-2 m-0 pl-0 list-none">
              {activeQuestion.expectedStructure.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-foreground leading-relaxed"
                >
                  <span className="size-5 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* 4. Références canoniques */}
          <div className="p-3 rounded-xl border border-border bg-card flex items-center justify-between gap-2 text-xs">
            <span className="text-muted-foreground font-mono text-[11px] flex items-center gap-1.5">
              <BookOpen className="size-3.5 text-accent" />
              <span>Appuis théoriques à citer à l&apos;oral :</span>
            </span>
            <span className="font-mono font-bold text-foreground text-[11px]">
              {activeQuestion.keyReferences}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

"use client";

import {
  Award,
  Users,
  FileCheck,
  Clock,
  Pause,
  Play,
  RotateCcw,
  X,
} from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { JURY_QUESTIONS } from "@/lib/pst/data/oral-defense-data";

interface OralDefenseHeaderProps {
  viewMode: "questions" | "grille";
  onSetViewMode: (mode: "questions" | "grille") => void;
  phase: "expose" | "jury";
  onSwitchPhase: (phase: "expose" | "jury") => void;
  secondsLeft: number;
  formatTime: (sec: number) => string;
  isRunning: boolean;
  onToggleRunning: () => void;
  onResetTimer: () => void;
  masteredCount: number;
  totalScore: number;
  onClose: () => void;
}

export function OralDefenseHeader({
  viewMode,
  onSetViewMode,
  phase,
  onSwitchPhase,
  secondsLeft,
  formatTime,
  isRunning,
  onToggleRunning,
  onResetTimer,
  masteredCount,
  totalScore,
  onClose,
}: OralDefenseHeaderProps) {
  return (
    <div className="px-3.5 sm:px-5 py-2.5 sm:py-3.5 border-b border-border/80 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 bg-muted/20 shrink-0">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <div className="size-8 sm:size-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
          <Award className="size-4 sm:size-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30 truncate">
              GRAND JURY RNCP 7 · CNAM
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground hidden sm:inline truncate">
              {masteredCount} / {JURY_QUESTIONS.length} maîtrisées
            </span>
          </div>
          <h2 className="text-sm sm:text-lg font-serif font-bold text-foreground m-0 mt-0.5 truncate">
            Soutenance Orale &amp; Contre-Interrogatoire
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {/* View Mode Switcher */}
        <div className="flex items-center rounded-xl border border-border bg-background p-0.5 sm:p-1 gap-1">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onSetViewMode("questions");
            }}
            className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold transition-colors cursor-pointer ${
              viewMode === "questions"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="size-3 sm:size-3.5" />
            <span>Questions</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onSetViewMode("grille");
            }}
            className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold transition-colors cursor-pointer ${
              viewMode === "grille"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileCheck className="size-3 sm:size-3.5" />
            <span>Grille ({totalScore}/20)</span>
          </button>
        </div>

        {/* Official 2-Phase Timer Bar */}
        <div className="flex items-center rounded-xl border border-border bg-background p-0.5 sm:p-1 gap-1">
          <button
            type="button"
            onClick={() => onSwitchPhase("expose")}
            className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold transition-colors cursor-pointer ${
              phase === "expose"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            1. Exposé (15m)
          </button>
          <button
            type="button"
            onClick={() => onSwitchPhase("jury")}
            className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold transition-colors cursor-pointer ${
              phase === "jury"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            2. Jury (30m)
          </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-border bg-background">
          <Clock
            className={`size-3.5 sm:size-4 ${
              secondsLeft <= 180
                ? "text-rose-500 animate-pulse"
                : "text-amber-500"
            }`}
          />
          <span className="font-mono text-xs sm:text-sm font-black text-foreground">
            {formatTime(secondsLeft)}
          </span>
          <button
            type="button"
            onClick={onToggleRunning}
            className="p-1 rounded-md hover:bg-muted text-foreground cursor-pointer"
            title={isRunning ? "Mettre en pause" : "Démarrer le chronomètre"}
          >
            {isRunning ? (
              <Pause className="size-3 sm:size-3.5" />
            ) : (
              <Play className="size-3 sm:size-3.5" />
            )}
          </button>
          <button
            type="button"
            onClick={onResetTimer}
            className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
            title="Réinitialiser le chronomètre"
          >
            <RotateCcw className="size-3 sm:size-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
          aria-label="Fermer"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}

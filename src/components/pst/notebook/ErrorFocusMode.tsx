"use client";

import React, { useRef } from "react";
import type { WrongAnswer } from "@/lib/pst/store";
import { TYPE_LABELS } from "@/lib/pst/data/error-notebook-helpers";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

export interface ErrorFocusModeProps {
  currentErr: WrongAnswer;
  safeFocusIdx: number;
  totalFiltered: number;
  removingIds: Set<string>;
  focusRevealed: boolean;
  setFocusRevealed: (v: boolean) => void;
  focusChoiceOrder: boolean;
  onPrevFocus: () => void;
  onNextFocus: () => void;
  onAnswer: (err: WrongAnswer, wasRight: boolean) => void;
  onRemove: (id: string) => void;
}

export function ErrorFocusMode({
  currentErr,
  safeFocusIdx,
  totalFiltered,
  removingIds,
  focusRevealed,
  setFocusRevealed,
  focusChoiceOrder,
  onPrevFocus,
  onNextFocus,
  onAnswer,
  onRemove,
}: ErrorFocusModeProps) {
  const touchStartXRef = useRef<number | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    if (e.touches[0]) {
      touchStartXRef.current = e.touches[0].clientX;
    }
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartXRef.current === null || !e.changedTouches[0]) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        onNextFocus();
      } else {
        onPrevFocus();
      }
    }
    touchStartXRef.current = null;
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="space-y-4"
    >
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-500 transition-all duration-300"
          style={{
            width: `${((safeFocusIdx + 1) / totalFiltered) * 100}%`,
          }}
        />
      </div>

      <div
        className={`p-6 sm:p-8 rounded-3xl border border-rose-500/30 bg-card shadow-md space-y-5 transition-all duration-300 ${
          removingIds.has(currentErr.id)
            ? "opacity-0 scale-95"
            : "opacity-100 scale-100"
        }`}
      >
        {/* Focus Card Header */}
        <div className="flex items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 shadow-2xs">
            {TYPE_LABELS[currentErr.type] ?? currentErr.type}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-muted-foreground">
              {safeFocusIdx + 1} / {totalFiltered}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={onPrevFocus}
                disabled={safeFocusIdx === 0}
                aria-label="Question précédente"
                className="p-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted text-foreground disabled:opacity-30 transition-all cursor-pointer"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={onNextFocus}
                disabled={safeFocusIdx >= totalFiltered - 1}
                aria-label="Question suivante"
                className="p-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted text-foreground disabled:opacity-30 transition-all cursor-pointer"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Question Text */}
        <h3 className="text-base sm:text-lg font-serif font-bold text-foreground leading-relaxed m-0">
          « {currentErr.question} »
        </h3>

        {/* Error History Reminder */}
        <div className="p-3.5 rounded-2xl border border-border bg-muted/30 space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-muted-foreground font-medium">
              Votre réponse passée :
            </span>
            <span className="line-through text-rose-600 dark:text-rose-400 font-semibold">
              {currentErr.userSelection || "Non spécifiée"}
            </span>
          </div>
        </div>

        {/* Interactive Drill for Focus Mode */}
        <div className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-background/60 backdrop-blur-xs space-y-3">
          {currentErr.type === "pieges" && (
            <div className="space-y-3">
              <div className="text-center text-xs font-mono font-bold text-muted-foreground">
                Affirmez : Vrai ou Faux ? (Raccourcis: [1] ou V / [2] ou F)
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="p-3.5 rounded-2xl font-mono text-sm font-bold bg-card hover:bg-muted border border-border hover:border-amber-500/50 transition-all cursor-pointer shadow-xs active:scale-95 flex items-center justify-center gap-2"
                  onClick={() =>
                    onAnswer(
                      currentErr,
                      currentErr.correctAnswer === "Vrai",
                    )
                  }
                >
                  <span className="px-1.5 py-0.5 rounded-md bg-muted text-[10px] text-muted-foreground">
                    1
                  </span>
                  <span>Vrai</span>
                </button>
                <button
                  type="button"
                  className="p-3.5 rounded-2xl font-mono text-sm font-bold bg-card hover:bg-muted border border-border hover:border-amber-500/50 transition-all cursor-pointer shadow-xs active:scale-95 flex items-center justify-center gap-2"
                  onClick={() =>
                    onAnswer(
                      currentErr,
                      currentErr.correctAnswer === "Faux",
                    )
                  }
                >
                  <span className="px-1.5 py-0.5 rounded-md bg-muted text-[10px] text-muted-foreground">
                    2
                  </span>
                  <span>Faux</span>
                </button>
              </div>
            </div>
          )}

          {currentErr.type === "qui" && (
            <div className="space-y-3">
              {!focusRevealed ? (
                <button
                  type="button"
                  className="w-full p-3.5 rounded-2xl font-mono text-xs font-bold bg-primary text-primary-foreground shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                  onClick={() => {
                    triggerHaptic("light");
                    playClickSound();
                    setFocusRevealed(true);
                  }}
                >
                  <span>Révéler la réponse attendue</span>
                  <span className="px-2 py-0.5 rounded-md bg-primary-foreground/20 text-[10px]">
                    Espace / 1
                  </span>
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center text-xs">
                    <span className="text-muted-foreground block text-[11px] mb-1">
                      Auteur attendu :
                    </span>
                    <strong className="text-emerald-700 dark:text-emerald-300 font-mono text-base">
                      {currentErr.correctAnswer}
                    </strong>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="p-3 rounded-xl font-mono text-xs font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-2"
                      onClick={() => onAnswer(currentErr, true)}
                    >
                      <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-[10px]">
                        1
                      </span>
                      <span>✓ J&apos;avais trouvé !</span>
                    </button>
                    <button
                      type="button"
                      className="p-3 rounded-xl font-mono text-xs font-bold bg-rose-500/15 hover:bg-rose-500/25 text-rose-800 dark:text-rose-300 border border-rose-500/30 transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-2"
                      onClick={() => onAnswer(currentErr, false)}
                    >
                      <span className="px-1.5 py-0.5 rounded-md bg-rose-500/20 text-[10px]">
                        2
                      </span>
                      <span>✗ Toujours pas</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentErr.type !== "pieges" && currentErr.type !== "qui" && (
            <div className="space-y-2.5">
              <span className="text-xs font-mono font-bold text-muted-foreground block text-center">
                Choisissez la bonne option (Raccourcis: [1] ou [2]) :
              </span>
              <div className="grid grid-cols-1 gap-2">
                {[
                  {
                    val: focusChoiceOrder
                      ? currentErr.correctAnswer
                      : currentErr.userSelection || "Erreur",
                    isCorrect: focusChoiceOrder,
                    idxKey: "1",
                  },
                  {
                    val: !focusChoiceOrder
                      ? currentErr.correctAnswer
                      : currentErr.userSelection || "Erreur",
                    isCorrect: !focusChoiceOrder,
                    idxKey: "2",
                  },
                ].map((opt) => (
                  <button
                    key={opt.idxKey}
                    type="button"
                    className="w-full text-left p-3.5 rounded-2xl border border-border bg-card hover:bg-muted text-xs font-medium transition-all cursor-pointer shadow-2xs flex items-center gap-3 active:scale-98"
                    onClick={() => onAnswer(currentErr, opt.isCorrect)}
                  >
                    <span className="px-2 py-0.5 rounded-lg bg-muted border border-border text-[11px] font-mono font-bold text-muted-foreground">
                      {opt.idxKey}
                    </span>
                    <span className="flex-1 text-foreground font-semibold">
                      {opt.val}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Explanation box */}
        <div className="p-3.5 rounded-2xl border border-amber-500/20 bg-amber-500/10 text-xs text-foreground leading-relaxed flex items-start gap-2.5">
          <Sparkles className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block mb-0.5 text-foreground font-semibold">
              Explication doctrinale :
            </strong>
            <span className="text-muted-foreground">
              {currentErr.explanation}
            </span>
          </div>
        </div>

        {/* Bottom Actions Row */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/70">
          <button
            type="button"
            onClick={onPrevFocus}
            disabled={safeFocusIdx === 0}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border disabled:opacity-30 cursor-pointer transition-all"
          >
            <ArrowLeft className="size-3.5" />
            <span>Précédent</span>
          </button>

          <button
            type="button"
            onClick={() => onRemove(currentErr.id)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-muted/60 hover:bg-muted text-foreground border border-border shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer transition-all"
          >
            <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Marquer assimilé</span>
          </button>

          <button
            type="button"
            onClick={onNextFocus}
            disabled={safeFocusIdx >= totalFiltered - 1}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border disabled:opacity-30 cursor-pointer transition-all"
          >
            <span>Suivant</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        {/* Keyboard & gesture hint */}
        <div className="text-center text-[10px] font-mono text-muted-foreground pt-1">
          Raccourcis : [←] / [→] naviguer • [1] / [2] répondre • Glissez sur mobile
        </div>
      </div>
    </div>
  );
}

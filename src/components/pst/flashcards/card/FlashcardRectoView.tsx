"use client";

import React from "react";
import type { Flashcard } from "@/lib/pst/types";
import { Star, PenLine, Sparkles, Eye, ArrowRight } from "lucide-react";
import { playClickSound, playFlipSound } from "@/lib/pst/audio-feedback";

interface FlashcardRectoViewProps {
  card: Flashcard;
  box: number;
  isFav: boolean;
  showRecallInput: boolean;
  recallText: string;
  onToggleFav: () => void;
  onToggleRecallInput: (show: boolean) => void;
  onRecallTextChange: (text: string) => void;
  onReveal: () => void;
}

export const FlashcardRectoView: React.FC<FlashcardRectoViewProps> = ({
  card,
  box,
  isFav,
  showRecallInput,
  recallText,
  onToggleFav,
  onToggleRecallInput,
  onRecallTextChange,
  onReveal,
}) => {
  return (
    <div className="p-5 sm:p-7 space-y-4 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
            {card.tag}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-muted text-muted-foreground border border-border">
            Boîte {box}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              playClickSound();
              onToggleFav();
            }}
            className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
              isFav
                ? "text-amber-500 hover:bg-amber-500/10"
                : "text-slate-400 hover:text-amber-500 hover:bg-amber-500/10"
            }`}
            title="Épingler cette carte en favori ⭐"
          >
            <Star
              className={`size-4 ${isFav ? "fill-amber-400 text-amber-500" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Active Recall Input */}
      <div className="w-full">
        {showRecallInput ? (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="font-semibold">
                ✍️ Rappel actif de mémoire (sans regarder) :
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleRecallInput(false);
                }}
                className="text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
              >
                Masquer
              </button>
            </div>
            <textarea
              id="fcRecallInput"
              placeholder="Écris ce dont tu te souviens de mémoire avant de révéler..."
              value={recallText}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => onRecallTextChange(e.target.value)}
              className="w-full h-16 p-2.5 rounded-xl border border-border bg-muted/40 text-xs text-foreground resize-none font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleRecallInput(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-muted-foreground hover:text-amber-600 dark:hover:text-amber-400 hover:bg-muted transition-colors cursor-pointer"
          >
            <PenLine className="size-3.5 text-amber-500" />
            <span>✍️ Écrire ma réponse de mémoire (facultatif)</span>
          </button>
        )}
      </div>

      {/* Question Content */}
      <div className="space-y-2 pt-1">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
          <Sparkles className="size-3 text-amber-500" />
          <span>Question d&apos;examen (Rappel Actif) :</span>
        </span>
        <div
          id="fcQ"
          className="text-base sm:text-lg font-serif font-bold text-foreground leading-relaxed"
        >
          {card.q}
        </div>
      </div>

      {/* Reveal Button */}
      <div className="pt-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            playFlipSound();
            onReveal();
          }}
          className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/20 to-amber-600/15 hover:from-amber-500/25 hover:to-amber-600/25 text-amber-950 dark:text-amber-200 border border-amber-500/40 font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-2xs transition-all active:scale-[0.99] cursor-pointer"
        >
          <Eye className="size-4 text-amber-600 dark:text-amber-400" />
          <span>👁️ Révéler la Réponse Doctrinale (Espace ou Clic)</span>
          <ArrowRight className="size-3.5 opacity-60 ml-1" />
        </button>
      </div>
    </div>
  );
};

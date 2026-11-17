"use client";

import React from "react";
import type { Flashcard } from "@/lib/pst/types";
import { findSchemaForCard } from "@/lib/pst/data/flashcards-helpers";
import { playClickSound, playFlipSound } from "@/lib/pst/audio-feedback";
import {
  CheckCircle2,
  RotateCcw,
  Lightbulb,
  AlertTriangle,
  Eye,
} from "lucide-react";

interface FlashcardVersoViewProps {
  card: Flashcard;
  box: number;
  recallText: string;
  onFlipToQuestion: () => void;
}

export const FlashcardVersoView: React.FC<FlashcardVersoViewProps> = ({
  card,
  box,
  recallText,
  onFlipToQuestion,
}) => {
  const matchedSchema = findSchemaForCard(
    card.q,
    card.a,
    card.deep,
    card.tag,
  );

  return (
    <div className="p-5 sm:p-7 space-y-4 animate-in fade-in duration-200">
      {/* Header Verso */}
      <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="size-3 text-emerald-600 dark:text-emerald-400" />
            <span>Réponse Doctrinale Attendue</span>
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
              playFlipSound();
              onFlipToQuestion();
            }}
            className="px-2.5 py-1 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1 transition-colors cursor-pointer"
            title="Revoir la question"
          >
            <RotateCcw className="size-3 text-amber-500" />
            <span>Question</span>
          </button>
        </div>
      </div>

      {/* Question reminder quote */}
      <div className="p-2.5 rounded-xl bg-muted/30 border border-border/50 text-xs text-muted-foreground italic leading-relaxed">
        « {card.q} »
      </div>

      {/* Core Answer Highlight */}
      <div className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-950 dark:text-emerald-100 space-y-1">
        <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
          Synthèse d&apos;Examen (18/20) :
        </span>
        <div
          id="fcA"
          className="text-xs sm:text-sm font-semibold leading-relaxed"
          dangerouslySetInnerHTML={{ __html: card.a }}
        />
      </div>

      {/* Deep Explanation */}
      {card.deep && (
        <div className="space-y-1.5 pt-1">
          <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
            Approfondissement &amp; Analyse Théorique :
          </span>
          <div
            id="fcDeep"
            className="prose-clean text-xs sm:text-sm text-foreground/90 space-y-2 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: card.deep }}
          />
        </div>
      )}

      {/* Practical Example */}
      {card.ex && (
        <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/25 text-xs text-sky-950 dark:text-sky-200 flex items-start gap-2">
          <Lightbulb className="size-3.5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="block text-[10px] font-mono font-bold uppercase text-sky-800 dark:text-sky-300">
              Exemple concret d&apos;application :
            </strong>
            <span>{card.ex}</span>
          </div>
        </div>
      )}

      {/* Trap */}
      {card.trap && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2">
          <AlertTriangle className="size-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="block text-[10px] font-mono font-bold uppercase text-amber-800 dark:text-amber-300">
              Piège d&apos;examen à éviter :
            </strong>
            <span>{card.trap}</span>
          </div>
        </div>
      )}

      {/* Schema Link */}
      {matchedSchema && (
        <div className="p-2.5 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-500/30 flex items-center justify-between gap-2 text-left">
          <div className="flex items-center gap-2">
            <span className="size-6 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              🎨
            </span>
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
              Ancre Visuelle : Schéma SVG 18/20
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              playClickSound();
              window.dispatchEvent(
                new CustomEvent("pst:open-schemas", {
                  detail: { schemaId: matchedSchema },
                }),
              );
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-xs transition-all cursor-pointer"
            title="Voir le schéma vectoriel interactif"
          >
            <Eye className="size-3.5" />
            <span>Voir le Schéma</span>
          </button>
        </div>
      )}

      {/* Compare Recall Text */}
      {recallText.trim() && (
        <div
          id="fcCompareWrap"
          className="p-3 border-t border-dashed border-border bg-muted/40 text-xs rounded-xl"
        >
          <div className="text-muted-foreground font-semibold mb-1">
            Ta réponse rédigée de mémoire :
          </div>
          <div className="italic text-foreground whitespace-pre-wrap">
            {recallText}
          </div>
        </div>
      )}

      {/* Hint to Flip Back */}
      <div className="pt-2 text-center text-[11px] text-muted-foreground opacity-80">
        ↺ Cliquer sur la carte ou appuyer sur [Espace] pour retourner · Évalue
        ta rétention ci-dessous (1, 2 ou 3)
      </div>
    </div>
  );
};

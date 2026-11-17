"use client";

import type { QcmItem } from "@/lib/pst/types";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { Keyboard, Smartphone } from "lucide-react";
import { QcmQuestionView, type OrderedOption } from "./QcmQuestionView";

interface QcmFocusViewProps {
  question: QcmItem;
  order: OrderedOption[];
  focusIdx: number;
  total: number;
  shuffleSeed: number;
  answered: number | null;
  onAnswer: (selected: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

export function QcmFocusView({
  question,
  order,
  focusIdx,
  total,
  shuffleSeed,
  answered,
  onAnswer,
  onPrev,
  onNext,
  onTouchStart,
  onTouchEnd,
}: QcmFocusViewProps) {
  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="space-y-4"
    >
      {/* Aide raccourcis & swipe */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 px-2">
        <span className="hidden sm:inline-flex items-center gap-1.5">
          <Keyboard className="size-3 text-amber-500" />
          Clavier : [1]-[4] Choix · [→/Espace] Suivant · [←] Précédent
        </span>
        <span className="inline-flex sm:hidden items-center gap-1.5">
          <Smartphone className="size-3 text-amber-500" />
          Balayez l&apos;écran pour naviguer (swipe ◄ ►)
        </span>
        <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">
          Session Focus
        </span>
      </div>

      <QcmQuestionView
        key={`${shuffleSeed}-${focusIdx}`}
        q={question}
        idx={focusIdx}
        total={total}
        order={order}
        answered={answered}
        onAnswer={onAnswer}
        isFocus={true}
      />

      <div className="flex items-center justify-between gap-3 mt-4 px-1">
        <button
          type="button"
          className="px-4 py-2 rounded-full text-xs font-mono font-bold bg-muted/60 hover:bg-muted text-foreground border border-border/80 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          disabled={focusIdx <= 0}
          onClick={() => {
            playClickSound();
            onPrev();
          }}
        >
          ← Question précédente
        </button>
        <span className="font-mono text-xs font-bold text-muted-foreground px-2.5 py-1 rounded-full bg-muted/40 border border-border/70">
          {focusIdx + 1} / {total}
        </span>
        <button
          type="button"
          className="px-4 py-2 rounded-full text-xs font-mono font-bold bg-primary text-primary-foreground shadow-xs disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          disabled={focusIdx >= total - 1}
          onClick={() => {
            playClickSound();
            onNext();
          }}
        >
          Question suivante →
        </button>
      </div>
    </div>
  );
}

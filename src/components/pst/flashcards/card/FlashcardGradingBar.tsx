"use client";

import React from "react";

interface FlashcardGradingBarProps {
  fcIdx: number;
  deckLength: number;
  onGrade: (result: "ko" | "mid" | "ok") => void;
  onPrev: () => void;
  onNext: () => void;
}

export const FlashcardGradingBar: React.FC<FlashcardGradingBarProps> = ({
  fcIdx,
  deckLength,
  onGrade,
  onPrev,
  onNext,
}) => {
  return (
    <>
      <div
        id="fcCount"
        className="text-center text-xs font-mono text-slate-500 my-1.5"
      >
        {fcIdx + 1} / {deckLength} ·{" "}
        <span className="text-[11px] opacity-80">
          Glisser ← À revoir / Su →
        </span>
      </div>

      {/* Grading Row */}
      <div className="srsrow flex items-center justify-center gap-2.5 my-3">
        <button
          id="markKo"
          type="button"
          className="px-4 py-2.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-800 dark:text-rose-200 border border-rose-500/30 font-bold text-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-2xs"
          onClick={() => onGrade("ko")}
        >
          <span>← À revoir</span>
          <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px]">
            1
          </kbd>
        </button>
        <button
          id="markMid"
          type="button"
          className="px-4 py-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 font-bold text-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-2xs"
          onClick={() => onGrade("mid")}
        >
          <span>Moyen</span>
          <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px]">
            2
          </kbd>
        </button>
        <button
          id="markOk"
          type="button"
          className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-2xs"
          onClick={() => onGrade("ok")}
        >
          <span>Su ✓ →</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/20 font-mono text-[10px]">
            3
          </kbd>
        </button>
      </div>

      {/* Prev / Next buttons */}
      <div className="navrow flex items-center justify-center gap-2 mt-2">
        <button
          id="prev"
          type="button"
          className="inline-flex items-center gap-1 px-4 py-2 rounded-full font-mono text-xs font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border transition-all active:scale-95 cursor-pointer shadow-2xs"
          onClick={onPrev}
        >
          ← Précédent
        </button>
        <button
          id="next"
          type="button"
          className="inline-flex items-center gap-1 px-4 py-2 rounded-full font-mono text-xs font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border transition-all active:scale-95 cursor-pointer shadow-2xs"
          onClick={onNext}
        >
          Suivant →
        </button>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="text-center text-[11px] font-mono text-muted-foreground mt-3 flex items-center justify-center gap-1.5 flex-wrap">
        <span>Raccourcis :</span>
        <kbd className="px-1.5 py-0.5 rounded-md bg-muted text-foreground border border-border/80 font-mono text-[10px] font-bold">
          Espace
        </kbd>
        <span>Retourner</span>
        <span>·</span>
        <kbd className="px-1.5 py-0.5 rounded-md bg-muted text-foreground border border-border/80 font-mono text-[10px] font-bold">
          1
        </kbd>
        <span>À revoir</span>
        <span>·</span>
        <kbd className="px-1.5 py-0.5 rounded-md bg-muted text-foreground border border-border/80 font-mono text-[10px] font-bold">
          2
        </kbd>
        <span>Moyen</span>
        <span>·</span>
        <kbd className="px-1.5 py-0.5 rounded-md bg-muted text-foreground border border-border/80 font-mono text-[10px] font-bold">
          3
        </kbd>
        <span>Su</span>
        <span>·</span>
        <kbd className="px-1.5 py-0.5 rounded-md bg-muted text-foreground border border-border/80 font-mono text-[10px] font-bold">
          ←/→
        </kbd>
        <span>Naviguer</span>
      </div>
    </>
  );
};

"use client";

import React, { useRef } from "react";
import type { FicheItem } from "@/lib/pst/types";
import { FicheCard, type FicheCardProps } from "./FicheCard";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface FicheReaderViewProps {
  visibleFiches: { f: FicheItem; i: number }[];
  safeReaderIdx: number;
  onSetReaderIdx: React.Dispatch<React.SetStateAction<number>>;
  renderCardProps: (f: FicheItem, i: number) => Omit<FicheCardProps, "forceOpen">;
}

export function FicheReaderView({
  visibleFiches,
  safeReaderIdx,
  onSetReaderIdx,
  renderCardProps,
}: FicheReaderViewProps) {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const currentItem = visibleFiches[safeReaderIdx];

  return (
    <div
      onTouchStart={(e) => {
        const t = e.touches[0];
        if (!t) return;
        touchStartRef.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        const start = touchStartRef.current;
        const t = e.changedTouches[0];
        if (!start || !t) return;
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
          if (dx < 0 && safeReaderIdx < visibleFiches.length - 1) {
            playClickSound();
            onSetReaderIdx((idx) => idx + 1);
          } else if (dx > 0 && safeReaderIdx > 0) {
            playClickSound();
            onSetReaderIdx((idx) => idx - 1);
          }
        }
        touchStartRef.current = null;
      }}
      className="space-y-4 animate-in fade-in"
    >
      {currentItem && (
        <FicheCard
          {...renderCardProps(currentItem.f, currentItem.i)}
          forceOpen={true}
        />
      )}

      {/* Barre de navigation Liseuse Zen */}
      <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 text-xs shadow-xs">
        <button
          type="button"
          disabled={safeReaderIdx <= 0}
          onClick={() => {
            playClickSound();
            onSetReaderIdx((idx) => Math.max(0, idx - 1));
          }}
          className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 disabled:opacity-30 flex items-center gap-1 cursor-pointer font-semibold transition-all active:scale-95"
        >
          <ChevronLeft className="size-4 text-amber-500" />
          <span>Précédente</span>
        </button>

        <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
          Fiche {safeReaderIdx + 1} / {visibleFiches.length}
        </span>

        <button
          type="button"
          disabled={safeReaderIdx >= visibleFiches.length - 1}
          onClick={() => {
            playClickSound();
            onSetReaderIdx((idx) => Math.min(visibleFiches.length - 1, idx + 1));
          }}
          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 disabled:opacity-30 flex items-center gap-1 cursor-pointer font-bold transition-all active:scale-95"
        >
          <span>Suivante</span>
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

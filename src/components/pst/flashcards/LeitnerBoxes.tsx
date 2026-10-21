"use client";

import type { PstStore } from "@/lib/pst/store";
import type { Flashcard } from "@/lib/pst/types";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

const LABELS = ["À revoir", "Fragile", "En cours", "Acquis", "Maîtrisé"];

interface LeitnerBoxesProps {
  store: PstStore;
  cartes: Flashcard[];
  activeBox: number | null;
  onSelectBox: (box: number | null) => void;
}

export function LeitnerBoxes({
  store,
  cartes,
  activeBox,
  onSelectBox,
}: LeitnerBoxesProps) {
  const counts = [0, 0, 0, 0, 0];
  cartes.forEach((c) => {
    const idx = store.getBox(c.id) - 1;
    if (idx >= 0 && idx < counts.length) counts[idx] = (counts[idx] ?? 0) + 1;
  });

  const handleSelect = (box: number) => {
    triggerHaptic("light");
    playClickSound();
    onSelectBox(activeBox === box ? null : box);
  };

  return (
    <div id="leitnerBoxes" className="flex flex-wrap items-center gap-1.5 py-1">
      {counts.map((n, i) => {
        const box = i + 1;
        const isActive = activeBox === box;
        return (
          <button
            key={box}
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer border ${
              isActive
                ? "bg-primary text-primary-foreground border-primary font-bold shadow-xs scale-102"
                : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground border-border/80"
            }`}
            onClick={() => handleSelect(box)}
          >
            <span>Boîte {box} · {LABELS[i]}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full font-mono text-[10px] font-black ${
                isActive
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {n}
            </span>
          </button>
        );
      })}
    </div>
  );
}

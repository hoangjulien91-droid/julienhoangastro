"use client";

import type { PstStore } from "@/lib/pst/store";
import type { Flashcard } from "@/lib/pst/types";

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

  return (
    <div
      id="leitnerBoxes"
      style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
    >
      {counts.map((n, i) => {
        const box = i + 1;
        const isActive = activeBox === box;
        return (
          <span
            key={box}
            className="chip leitner-box-filter-chip"
            style={{
              cursor: "pointer",
              border: isActive ? "2px solid var(--accent)" : undefined,
              background: isActive ? "var(--goodbg)" : undefined,
              fontWeight: isActive ? "bold" : undefined,
            }}
            onClick={() => onSelectBox(isActive ? null : box)}
          >
            Boîte {box} · {LABELS[i]} : <b>{n}</b>
          </span>
        );
      })}
    </div>
  );
}

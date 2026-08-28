"use client";

import { useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { AtelierSujet } from "@/lib/pst/types";

interface AtelierProps {
  store: PstStore;
  onStoreChange: () => void;
  data: AtelierSujet[];
  hint: string;
}

export function Atelier({ store, onStoreChange, data, hint }: AtelierProps) {
  const [idx, setIdx] = useState(0);
  const s = data[idx];
  if (!s) return null;

  const marks = store.getMarks();
  const checked = s.grid.filter(
    (_, gi) => !!marks[`atelier_${idx}_point_${gi}`],
  ).length;
  const total = s.grid.length;
  const pct = total ? (checked * 100) / total : 0;

  function toggle(gi: number) {
    const key = `atelier_${idx}_point_${gi}`;
    const cur = !!store.getMarks()[key];
    store.setMark(key, !cur);
    onStoreChange();
  }

  return (
    <div>
      <p className="hint">{hint}</p>
      <div className="fiches-controls-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 13 }}>
            Auto-évaluation interactive
          </span>
          <span
            style={{ fontWeight: 700, fontSize: 14, color: "var(--accent)" }}
          >
            {checked} / {total} points
          </span>
        </div>
        <div className="fiche-progress-bar">
          <div className="fiche-progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="chips" style={{ marginBottom: 14 }}>
        {data.map((sujet, i) => (
          <button
            key={i}
            className={`chip${i === idx ? " active" : ""}`}
            onClick={() => setIdx(i)}
          >
            {sujet.t.split(" : ")[0]}
          </button>
        ))}
      </div>
      <div id="atelierHost">
        <div className="qcard">
          <h3 style={{ marginTop: 0, fontSize: 16 }}>
            Sujet d&apos;entraînement
          </h3>
          <p style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 12 }}>
            « {s.t} »
          </p>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 8,
            }}
          >
            Grille du correcteur
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              marginBottom: 14,
            }}
          >
            {s.grid.map((g, gi) => {
              const isDone = !!marks[`atelier_${idx}_point_${gi}`];
              return (
                <label
                  key={gi}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13.5,
                    marginBottom: 8,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => toggle(gi)}
                  />
                  <span
                    style={
                      isDone
                        ? {
                            textDecoration: "line-through",
                            color: "var(--muted)",
                          }
                        : undefined
                    }
                  >
                    {g}
                  </span>
                </label>
              );
            })}
          </div>
          <details className="fcard">
            <summary>Lire le corrigé-modèle</summary>
            <div
              className="fbody"
              style={{ fontSize: 13.5 }}
              dangerouslySetInnerHTML={{ __html: s.corrige }}
            />
          </details>
        </div>
      </div>
    </div>
  );
}

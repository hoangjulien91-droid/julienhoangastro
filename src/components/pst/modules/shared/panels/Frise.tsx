"use client";

import { useState } from "react";
import type { FriseEntry } from "@/lib/pst/types";

function getShortName(title: string) {
  return title.split(/[—\-:]/)[0]?.trim() ?? title;
}

interface FriseProps {
  data: FriseEntry[];
  hint: string;
}

export function Frise({ data, hint }: FriseProps) {
  const [idx, setIdx] = useState(0);
  const entry = data[idx];
  if (!entry) return null;

  return (
    <div>
      <p className="hint">{hint}</p>
      <div className="frise-axis" style={{ marginBottom: 14 }}>
        {data.map((f, i) => (
          <button
            key={i}
            className={`frise-dot${i === idx ? " active" : ""}`}
            onClick={() => setIdx(i)}
          >
            <span className="yr">{f.annee}</span>
            <span className="pt" />
            <span className="nm">{getShortName(f.titre)}</span>
          </button>
        ))}
      </div>
      <div id="friseHost">
        <div className="schema">
          <div
            style={{
              fontWeight: 700,
              color: "var(--accent)",
              textTransform: "uppercase",
              fontSize: 13,
              marginBottom: 2,
            }}
          >
            {entry.annee} — {entry.titre}
          </div>
          <div className="frise-cols">
            <div className="frise-col">
              <h4>Auteur &amp; Œuvre</h4>
              {entry.titre}
            </div>
            <div className="frise-col">
              <h4>Apport Théorique</h4>
              {entry.desc}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

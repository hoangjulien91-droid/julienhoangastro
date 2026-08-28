"use client";

import { useState } from "react";
import type { PstStore } from "@/lib/pst/store";

interface ThermoSubliProps {
  store: PstStore;
  onStoreChange: () => void;
}

export function ThermoSubli({ store, onStoreChange }: ThermoSubliProps) {
  const [discussion, setDiscussion] = useState(50);
  const [reconnaissance, setReconnaissance] = useState(50);
  const [autonomie, setAutonomie] = useState(50);

  const average = (discussion + reconnaissance + autonomie) / 3;

  let verdict: string, color: string, text: string;
  if (average >= 75) {
    verdict = "🌈 Sublimation Active & Santé Mentale (Plaisir)";
    color = "var(--good)";
    text =
      "L'organisation du travail offre d'excellentes ressources. La souffrance inhérente à la confrontation avec le réel est sublimée dans la création, le travail soigné et la coopération. Le risque de pathologie est minime.";
    if (!store.getBadges().includes("thermo_subli_gold")) {
      store.unlockBadge("thermo_subli_gold");
      onStoreChange();
    }
  } else if (average >= 45) {
    verdict = "⚖️ Équilibre Psychique Instable (Stratégies de défense)";
    color = "var(--accent)";
    text =
      "Le sujet fait face aux contraintes en déployant des stratégies défensives (collectives ou individuelles) comme le déni de danger. L'équilibre est préservé temporairement, mais il n'y a pas d'émancipation.";
  } else {
    verdict = "💥 Décompensation Psychopathologique (Souffrance)";
    color = "var(--bad)";
    text =
      "L'absence d'espaces de délibération collective et de reconnaissance brise les mécanismes de défense. Le sujet bascule dans le non-sens, la somatisation ou la décompensation (burnout, dépression, etc.).";
  }

  return (
    <div className="qbox" style={{ marginBottom: 25 }}>
      <div
        style={{
          fontWeight: 700,
          color: "var(--accent)",
          fontSize: 14,
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        🌡️ Thermomètre de la Sublimation Clinique
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 15px" }}>
        Ajuste les conditions de l&apos;organisation du travail pour observer la
        balance psychique entre sublimation saine et décompensation
        psychopathologique.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginBottom: 15,
        }}
      >
        {[
          {
            label: "🗣️ Espaces de Délibération Collective",
            value: discussion,
            set: setDiscussion,
          },
          {
            label: "🏆 Reconnaissance de la Hiérarchie et des Pairs",
            value: reconnaissance,
            set: setReconnaissance,
          },
          {
            label: "💪 Autonomie & Marges de Manœuvre (Pouvoir d'Agir)",
            value: autonomie,
            set: setAutonomie,
          },
        ].map((slider) => (
          <label
            key={slider.label}
            style={{
              fontSize: 13,
              fontWeight: 600,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span>
              {slider.label} : {slider.value}%
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={slider.value}
              style={{ width: "100%", accentColor: "var(--accent)" }}
              onChange={(e) => slider.set(Number(e.target.value))}
            />
          </label>
        ))}
      </div>
      <div
        className="schema"
        style={{ borderLeft: `4px solid ${color}`, padding: 15, marginTop: 15 }}
      >
        <div style={{ fontWeight: 700, fontSize: 15, color, marginBottom: 6 }}>
          {verdict}
        </div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.45 }}>{text}</p>
      </div>
    </div>
  );
}

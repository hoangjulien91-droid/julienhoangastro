"use client";

import { useState } from "react";
import type { PstStore } from "@/lib/pst/store";

interface BuhlerOrganonProps {
  store: PstStore;
}

export function BuhlerOrganon({ store }: BuhlerOrganonProps) {
  const [repVal, setRepVal] = useState(33);
  const [expVal, setExpVal] = useState(33);
  const [appVal, setAppVal] = useState(34);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(
    null,
  );

  const total = repVal + expVal + appVal;

  function validate() {
    if (total !== 100) {
      setResult({
        ok: false,
        msg: `Erreur. La somme doit faire exactement 100%. Actuellement : ${total}%.`,
      });
      return;
    }
    const good =
      Math.abs(repVal - 20) <= 5 &&
      Math.abs(expVal - 50) <= 5 &&
      Math.abs(appVal - 30) <= 5;
    if (good) {
      setResult({
        ok: true,
        msg: "Analyse Correcte ! Représentation (20% : l'algorithme et les plannings), Expression (50% : la souffrance/saturation exprimée), Appel (30% : demande implicite de régulation). 🏆 Badge Débloqué : Expert de l'Organon.",
      });
      store.unlockBadge("buhler_expert");
    } else {
      setResult({
        ok: false,
        msg: "Analyse Imprécise. Pensez-y : « J'en peux plus » exprime une émotion très forte (Expression dominante, ~50%), « plannings imposés par l'algorithme » désigne le fait technique (Représentation, ~20%), et la détresse appelle à une action de la part de l'interlocuteur (Appel, ~30%). Ajustez les curseurs et réessayez.",
      });
    }
  }

  return (
    <div className="qbox" style={{ marginTop: 25, marginBottom: 25 }}>
      <div
        className="vh"
        style={{
          fontWeight: 700,
          color: "var(--accent)",
          fontSize: 14,
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        🗣️ Le Modèle Organon de Karl Bühler
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 15px" }}>
        Répartis les forces de l&apos;Organon (Représentation, Expression,
        Appel) pour le verbatim de salarié suivant. La somme totale doit faire
        100%.
      </p>
      <div
        style={{
          background: "var(--paper)",
          border: "1px solid var(--line)",
          borderRadius: 10,
          padding: 15,
          marginBottom: 15,
        }}
      >
        <div
          style={{
            fontStyle: "italic",
            fontSize: 13.5,
            textAlign: "center",
            padding: 10,
            background: "var(--card)",
            borderRadius: 8,
            marginBottom: 15,
            borderLeft: "4px solid var(--accent)",
          }}
        >
          « J&apos;en peux plus de ces plannings imposés par l&apos;algorithme,
          c&apos;est insupportable ! »
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { label: "Représentation (Faits)", value: repVal, set: setRepVal },
            { label: "Expression (Émotions)", value: expVal, set: setExpVal },
            {
              label: "Appel (Demande implicite)",
              value: appVal,
              set: setAppVal,
            },
          ].map((slider) => (
            <div key={slider.label}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  marginBottom: 4,
                }}
              >
                <span>
                  <b>{slider.label}</b>
                </span>
                <span>{slider.value}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={slider.value}
                style={{ width: "100%" }}
                onChange={(e) => slider.set(Number(e.target.value))}
              />
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 15,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <span>
            Total :{" "}
            <span
              style={{ color: total === 100 ? "var(--good)" : "var(--bad)" }}
            >
              {total}%
            </span>
          </span>
          <button className="btn small solid" onClick={validate}>
            Valider
          </button>
        </div>
        {result && (
          <div
            style={{
              marginTop: 15,
              padding: 12,
              borderRadius: 8,
              fontSize: 12.5,
              background: result.ok ? "var(--goodbg)" : "var(--badbg)",
              color: result.ok ? "var(--good)" : "var(--bad)",
            }}
          >
            <b>{result.ok ? "✓" : "✗"}</b> {result.msg}
          </div>
        )}
      </div>
    </div>
  );
}

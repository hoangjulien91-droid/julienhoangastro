"use client";

import type { PstStore } from "@/lib/pst/store";

export interface DebatAxis {
  axis: string;
  title: string;
  tension: string;
  example: string;
  exampleColor: string;
}

interface DebatsProps {
  store: PstStore;
  onStoreChange: () => void;
  data: DebatAxis[];
  hint: string;
}

export function Debats({ store, onStoreChange, data, hint }: DebatsProps) {
  const state = store.getDebats();
  const total = data.length;
  const active = data.filter((_, i) => !!state[i]).length;
  const pct = total ? Math.round((100 * active) / total) : 0;

  function toggle(i: number, checked: boolean) {
    store.setDebat(i, checked);
    onStoreChange();
  }

  return (
    <div>
      <p className="hint">{hint}</p>

      <div
        className="debat-progress-card"
        style={{
          background: "var(--card)",
          border: "1px solid var(--line)",
          borderRadius: "var(--r)",
          padding: 15,
          marginBottom: 20,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 13, color: "var(--ink)" }}>
            Débats maîtrisés
          </span>
          <span
            style={{ fontSize: 12, fontWeight: 700, color: "var(--dejours)" }}
          >
            {active} / {total} ({pct}%)
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: 6,
            background: "var(--paper)",
            borderRadius: 99,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              background: "var(--dejours)",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      <div
        className="debats-container"
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        {data.map((axe, i) => (
          <div
            key={i}
            className="debat-intro-block"
            style={{
              background: "var(--card)",
              border: "1px solid var(--line)",
              borderRadius: "var(--r)",
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                gap: 15,
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {axe.axis}
                </span>
                <h3
                  style={{
                    margin: "4px 0 0",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  {axe.title}
                </h3>
              </div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 11,
                  cursor: "pointer",
                  background: "var(--paper)",
                  padding: "4px 8px",
                  borderRadius: 99,
                  border: "1px solid var(--line)",
                  userSelect: "none",
                }}
              >
                <input
                  type="checkbox"
                  checked={!!state[i]}
                  onChange={(e) => toggle(i, e.target.checked)}
                  style={{ cursor: "pointer" }}
                />
                <span>Maîtrisé</span>
              </label>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: "var(--muted)",
                lineHeight: 1.5,
              }}
            >
              <b>Tension centrale :</b>{" "}
              <span dangerouslySetInnerHTML={{ __html: axe.tension }} />
            </p>
            <div
              style={{
                background: "var(--paper)",
                borderLeft: `3px solid ${axe.exampleColor}`,
                padding: 10,
                borderRadius: "0 var(--r) var(--r) 0",
                fontSize: 12,
                lineHeight: 1.45,
              }}
            >
              <b>Exemple d&apos;examen :</b> {axe.example}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

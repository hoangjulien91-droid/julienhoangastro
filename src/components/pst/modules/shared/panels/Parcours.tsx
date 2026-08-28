"use client";

import type { PstStore } from "@/lib/pst/store";
import type { ParcoursPhase } from "@/lib/pst/types";

interface ParcoursProps {
  store: PstStore;
  onStoreChange: () => void;
  onGoTab: (panel: string) => void;
  data: ParcoursPhase[];
  examDate: string;
  hint: string;
  examLabel: string;
}

export function Parcours({
  store,
  onStoreChange,
  onGoTab,
  data,
  examDate,
  hint,
  examLabel,
}: ParcoursProps) {
  const days = Math.ceil(
    (new Date(examDate).getTime() - Date.now()) / 86400000,
  );
  const current = days <= 3 ? 3 : days <= 10 ? 2 : days <= 20 ? 1 : 0;
  const dStr = days > 0 ? `J-${days}` : days === 0 ? "Jour J" : "examen passé";
  const marks = store.getMarks();

  function toggleItem(key: string, checked: boolean) {
    store.setMark(key, checked);
    onStoreChange();
  }

  return (
    <div>
      <p className="hint">{hint}</p>
      <div id="parcoursHost">
        <div
          className="schema"
          style={{
            borderLeft: "4px solid var(--accent)",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--muted)",
            }}
          >
            {examLabel}
          </div>
          <div
            style={{
              fontFamily: "'Fraunces',serif",
              fontSize: 26,
              fontWeight: 600,
              color: "var(--accent)",
            }}
          >
            {dStr}
          </div>
        </div>
        {data.map((ph, pi) => {
          const isNow = pi === current;
          return (
            <div
              key={ph.id}
              className="frise-col"
              style={{
                marginBottom: 12,
                borderLeft: `4px solid ${isNow ? "var(--accent)" : "var(--line)"}`,
                boxShadow: isNow ? "var(--shadow)" : undefined,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  gap: 6,
                }}
              >
                <span style={{ fontWeight: 700, fontSize: 15 }}>
                  {ph.title}
                  {isNow && (
                    <span style={{ color: "var(--accent)", fontSize: 12 }}>
                      {" "}
                      · à faire maintenant
                    </span>
                  )}
                </span>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>
                  {ph.fenetre || "Plan"}
                </span>
              </div>
              <p style={{ margin: "4px 0 8px", fontSize: 13 }}>{ph.desc}</p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginBottom: 8,
                }}
              >
                {ph.onglets.map(([target, label]) => (
                  <button
                    key={target}
                    className="chip"
                    onClick={() => onGoTab(target)}
                  >
                    {label} →
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {ph.items.map((t, ti) => {
                  const key = `parcours_${ph.id}_${ti}`;
                  const done = !!marks[key];
                  return (
                    <label
                      key={ti}
                      style={{
                        display: "flex",
                        gap: 8,
                        alignItems: "flex-start",
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={done}
                        style={{ marginTop: 3 }}
                        onChange={(e) => toggleItem(key, e.target.checked)}
                      />
                      <span
                        style={
                          done
                            ? {
                                textDecoration: "line-through",
                                color: "var(--muted)",
                              }
                            : undefined
                        }
                      >
                        {t}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

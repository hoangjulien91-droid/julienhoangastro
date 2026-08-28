"use client";

import { useState } from "react";
import type { SimScenario } from "@/lib/pst/types";

interface SimulateurProps {
  data: SimScenario[];
  hint: string;
}

export function Simulateur({ data, hint }: SimulateurProps) {
  const [simIdx, setSimIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const sc = data[simIdx];

  function selectScenario(i: number) {
    setSimIdx(i);
    setStep(0);
    setScore(0);
    setSelected(null);
  }

  function restart() {
    setStep(0);
    setScore(0);
    setSelected(null);
  }

  if (!sc)
    return <p className="hint">Simulateur non configuré pour ce scénario.</p>;

  return (
    <div>
      <p className="hint">{hint}</p>
      <div className="chips" style={{ marginBottom: 14 }}>
        {data.map((s, i) => (
          <button
            key={s.key}
            className={`chip${i === simIdx ? " active" : ""}`}
            onClick={() => selectScenario(i)}
          >
            {s.title}
          </button>
        ))}
      </div>
      <div id="simHost">
        {step >= sc.steps.length
          ? (() => {
              const max = sc.steps.length * 2;
              const pct = Math.round((score * 100) / max);
              const ratingColor =
                pct >= 80
                  ? "var(--good, #10b981)"
                  : pct >= 50
                    ? "var(--warning, #f59e0b)"
                    : "var(--bad, #ef4444)";
              return (
                <div
                  className="qcard"
                  style={{ borderTop: `4px solid ${ratingColor}`, padding: 20 }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 15,
                      flexWrap: "wrap",
                      gap: 10,
                    }}
                  >
                    <h3
                      style={{ margin: 0, fontSize: 18, color: "var(--ink)" }}
                    >
                      {sc.title}
                    </h3>
                    <div
                      style={{
                        background: ratingColor,
                        color: "#fff",
                        padding: "6px 12px",
                        borderRadius: 30,
                        fontWeight: 800,
                        fontSize: 14,
                      }}
                    >
                      Score : {pct}%
                    </div>
                  </div>
                  <div
                    className="explain show"
                    style={{
                      background: "var(--paper)",
                      border: "1px solid var(--line)",
                      padding: 15,
                      borderRadius: 8,
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 14,
                        marginBottom: 10,
                        color: ratingColor,
                      }}
                    >
                      Posture clinique globale : {score} / {max}
                    </div>
                    <p style={{ margin: "0 0 10px" }}>
                      Pour mener à bien cette intervention clinique, vous avez
                      mobilisé les principes de l&apos;activité suivants :
                    </p>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: 20,
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      {sc.principes.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="navrow" style={{ marginTop: 15 }}>
                    <span />
                    <button
                      className="btn"
                      style={{ width: "100%" }}
                      onClick={restart}
                    >
                      🔄 Recommencer ce scénario
                    </button>
                  </div>
                </div>
              );
            })()
          : (() => {
              const s = sc.steps[step];
              if (!s) return null;
              const progress = Math.round((step * 100) / sc.steps.length);
              const isAnswered = selected !== null;
              return (
                <>
                  <div
                    className="schema"
                    style={{
                      marginBottom: 12,
                      borderLeft: "4px solid var(--accent)",
                      paddingLeft: 12,
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        color: "var(--accent)",
                        textTransform: "uppercase",
                        fontSize: 11,
                        letterSpacing: "0.05em",
                        marginBottom: 2,
                      }}
                    >
                      {sc.title} · {sc.persona}
                    </div>
                    <p
                      style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}
                    >
                      {step === 0
                        ? sc.context
                        : "Animation clinique en cours..."}
                    </p>
                  </div>
                  <div className="sim-progress" style={{ marginBottom: 14 }}>
                    <i style={{ width: `${progress}%` }} />
                  </div>
                  <div className="qcard" style={{ marginTop: 10, padding: 18 }}>
                    <div
                      className="qhead"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12,
                        marginBottom: 12,
                        borderBottom: "1px solid var(--line)",
                        paddingBottom: 8,
                        color: "var(--muted)",
                      }}
                    >
                      <span>
                        Étape {step + 1} / {sc.steps.length}
                      </span>
                      <span style={{ fontWeight: 700, color: "var(--accent)" }}>
                        Posture cumulative : {score}
                      </span>
                    </div>
                    <div
                      className="qtext"
                      style={{
                        fontStyle: "italic",
                        fontSize: 13.5,
                        background: "var(--paper)",
                        padding: "10px 12px",
                        borderRadius: 6,
                        marginBottom: 10,
                        borderLeft: "3px solid var(--line)",
                      }}
                    >
                      {s.worker}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 13,
                        marginBottom: 12,
                      }}
                    >
                      {s.prompt}
                    </div>
                    <div
                      className="opts"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {s.options.map((o, oIdx) => {
                        const cls = isAnswered
                          ? o.score === 2
                            ? "opt correct"
                            : o.score === 1
                              ? "opt partial"
                              : "opt wrong"
                          : "opt";
                        return (
                          <button
                            key={oIdx}
                            className={cls}
                            style={{
                              width: "100%",
                              textAlign: "left",
                              justifyContent: "flex-start",
                              height: "auto",
                              padding: "10px 12px",
                              fontSize: 12.5,
                              whiteSpace: "normal",
                              lineHeight: 1.4,
                            }}
                            disabled={isAnswered}
                            onClick={() => {
                              setSelected(oIdx);
                              setScore((sVal) => sVal + o.score);
                            }}
                          >
                            <span>{o.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    {isAnswered && selected !== null && (
                      <>
                        {(() => {
                          const opt = s.options[selected];
                          if (!opt) return null;
                          const bg =
                            opt.score === 0
                              ? "var(--badbg, #fbeae8)"
                              : opt.score === 1
                                ? "var(--warningbg, #fffbeb)"
                                : "var(--goodbg, #e6f4ea)";
                          const color =
                            opt.score === 0
                              ? "var(--bad, #ef4444)"
                              : opt.score === 1
                                ? "var(--warning, #d97706)"
                                : "var(--good, #137333)";
                          return (
                            <div
                              className="explain show"
                              style={{
                                marginTop: 12,
                                padding: 12,
                                borderRadius: 6,
                                fontSize: 12.5,
                                lineHeight: 1.45,
                                background: bg,
                                color,
                                borderLeft: `4px solid ${color}`,
                              }}
                            >
                              {opt.fb}
                            </div>
                          );
                        })()}
                        <div className="navrow" style={{ marginTop: 12 }}>
                          <span />
                          <button
                            className="btn"
                            style={{ width: "100%" }}
                            onClick={() => {
                              setStep((st) => st + 1);
                              setSelected(null);
                            }}
                          >
                            {step + 1 >= sc.steps.length
                              ? "Voir le débrief"
                              : "Étape suivante →"}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              );
            })()}
      </div>
    </div>
  );
}

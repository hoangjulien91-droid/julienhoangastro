"use client";

import { useState, type ReactNode } from "react";
import type { PstStore } from "@/lib/pst/store";

export interface BonusQuestion {
  q: string;
  opts: string[];
  ok: number;
  expl: string;
}

export interface BonusAuthorCard {
  title: string;
  color: string;
  body: ReactNode;
}

interface BonusProps {
  store: PstStore;
  hint: string;
  authors: BonusAuthorCard[];
  questions: BonusQuestion[];
  quizTitle: string;
}

export function Bonus({
  store,
  hint,
  authors,
  questions,
  quizTitle,
}: BonusProps) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  function restart() {
    setIdx(0);
    setScore(0);
    setSelected(null);
  }

  function answer(oIdx: number) {
    if (selected !== null) return;
    setSelected(oIdx);
    const q = questions[idx];
    if (q && oIdx === q.ok) setScore((s) => s + 1);
  }

  function next() {
    const newIdx = idx + 1;
    setIdx(newIdx);
    setSelected(null);
    if (newIdx >= questions.length) {
      store.recordScore("bonus", score, questions.length);
    }
  }

  return (
    <div>
      <p className="hint">{hint}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          className="fcard"
          style={{
            border: "1px solid var(--line)",
            borderRadius: "var(--r)",
            background: "var(--card)",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 15,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: "var(--dejours)",
              fontSize: 14,
              textTransform: "uppercase",
            }}
          >
            Auteurs d&apos;Ouverture
          </div>
          {authors.map((a, i) => (
            <div
              key={i}
              style={{ borderLeft: `3px solid ${a.color}`, paddingLeft: 12 }}
            >
              <h4 style={{ margin: "0 0 4px", fontSize: 14 }}>{a.title}</h4>
              <p
                style={{
                  margin: 0,
                  fontSize: 12.5,
                  color: "var(--muted)",
                  lineHeight: 1.45,
                }}
              >
                {a.body}
              </p>
            </div>
          ))}
        </div>

        <div
          className="qbox"
          style={{
            background: "var(--card)",
            border: "1px solid var(--line)",
            borderRadius: "var(--r)",
            padding: 20,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: "var(--accent)",
              fontSize: 14,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            {quizTitle}
          </div>
          <div id="bonusQuizHost">
            {idx >= questions.length ? (
              <div style={{ textAlign: "center", padding: 15 }}>
                <h4 style={{ margin: "0 0 8px", color: "var(--dejours)" }}>
                  Quiz Terminé !
                </h4>
                <p
                  style={{
                    margin: "0 0 15px",
                    fontSize: 13,
                    color: "var(--muted)",
                  }}
                >
                  Votre score de culture d&apos;élite :{" "}
                  <b>
                    {score} / {questions.length}
                  </b>
                </p>
                <button className="btn small" onClick={restart}>
                  Recommencer
                </button>
              </div>
            ) : (
              (() => {
                const q = questions[idx];
                if (!q) return null;
                return (
                  <>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--muted)",
                        marginBottom: 8,
                        fontWeight: 600,
                      }}
                    >
                      Question {idx + 1} sur {questions.length}
                    </div>
                    <h4 style={{ margin: "0 0 15px", fontSize: 13.5 }}>
                      {q.q}
                    </h4>
                    <div style={{ marginBottom: 15 }}>
                      {q.opts.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          className="opt"
                          style={{
                            width: "100%",
                            textAlign: "left",
                            padding: "10px 15px",
                            marginBottom: 8,
                            border: "1px solid var(--line)",
                            borderRadius: "var(--r)",
                            background: "var(--card)",
                            fontSize: 12.5,
                          }}
                          disabled={selected !== null}
                          onClick={() => answer(oIdx)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {selected !== null && (
                      <div
                        style={{
                          padding: 12,
                          borderRadius: "var(--r)",
                          fontSize: 12,
                          marginBottom: 15,
                          background:
                            selected === q.ok
                              ? "var(--goodbg)"
                              : "var(--badbg)",
                          color:
                            selected === q.ok ? "var(--good)" : "var(--bad)",
                        }}
                      >
                        {selected === q.ok ? (
                          <>
                            <b>✓ Correct.</b> {q.expl}
                          </>
                        ) : (
                          <>
                            <b>✗ Incorrect.</b> La bonne réponse était : &quot;
                            {q.opts[q.ok]}&quot;. <br /> {q.expl}
                          </>
                        )}
                      </div>
                    )}
                    {selected !== null && (
                      <button className="btn small" onClick={next}>
                        Suivant
                      </button>
                    )}
                  </>
                );
              })()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

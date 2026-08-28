"use client";

import { useState } from "react";
import { CLOZE } from "@/lib/pst/data/pst123";

export function Cloze() {
  const [answers, setAnswers] = useState<
    Record<number, { value: string; checked: boolean }>
  >({});

  function setValue(idx: number, value: string) {
    setAnswers((prev) => ({
      ...prev,
      [idx]: { value, checked: prev[idx]?.checked ?? false },
    }));
  }

  function check(idx: number) {
    setAnswers((prev) => ({
      ...prev,
      [idx]: { value: prev[idx]?.value ?? "", checked: true },
    }));
  }

  return (
    <div>
      <p className="hint">
        Complète les citations à trous avec le terme exact attendu.
      </p>
      <div id="clozeHost">
        {CLOZE.map((c, idx) => {
          const state = answers[idx] ?? { value: "", checked: false };
          const isOk = state.value.trim().toLowerCase() === c.ans.toLowerCase();
          const parts = c.text.split(`[${c.ans}]`);
          return (
            <div className="qcard" key={idx}>
              <div className="qhead">
                <span className="qnum">
                  Citation {idx + 1} / {CLOZE.length}
                </span>
              </div>
              <div
                style={{ fontSize: 14.5, lineHeight: 1.6, marginBottom: 15 }}
              >
                {parts[0]}
                <input
                  type="text"
                  disabled={state.checked}
                  value={state.value}
                  onChange={(e) => setValue(idx, e.target.value)}
                  style={{
                    width: 110,
                    padding: "4px 8px",
                    fontSize: 13,
                    borderRadius: 6,
                    border: `1px solid ${state.checked ? (isOk ? "var(--good)" : "var(--bad)") : "var(--line)"}`,
                    fontWeight: 700,
                    textAlign: "center",
                    outline: "none",
                    background: state.checked
                      ? isOk
                        ? "var(--goodbg)"
                        : "var(--badbg)"
                      : undefined,
                    color: state.checked
                      ? isOk
                        ? "var(--good)"
                        : "var(--bad)"
                      : undefined,
                  }}
                />
                {parts[1]}
              </div>
              {!state.checked && (
                <button className="btn solid small" onClick={() => check(idx)}>
                  Vérifier
                </button>
              )}
              {state.checked && (
                <div className={`explain show${isOk ? "" : " miss"}`}>
                  <b>{isOk ? "✓ Correct." : "✗ Incorrect."}</b> {c.expl}
                  {!isOk && (
                    <>
                      {" "}
                      Réponse attendue : <b>{c.ans}</b>.
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

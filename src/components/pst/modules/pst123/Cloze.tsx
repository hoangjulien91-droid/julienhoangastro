"use client";

import { useState } from "react";
import { CLOZE } from "@/lib/pst/data/pst123";
import { playReviewSound, playSuccessSound } from "@/lib/pst/audio-feedback";

function norm(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

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
    const curVal = answers[idx]?.value ?? "";
    const target = CLOZE[idx]?.ans ?? "";
    const isOk = norm(curVal) === norm(target);
    if (isOk) playSuccessSound();
    else playReviewSound();
    setAnswers((prev) => ({
      ...prev,
      [idx]: { value: curVal, checked: true },
    }));
  }

  const total = CLOZE.length;
  const checkedCount = Object.values(answers).filter((a) => a.checked).length;
  const correctCount = CLOZE.reduce((acc, c, idx) => {
    const st = answers[idx];
    if (!st?.checked) return acc;
    return norm(st.value) === norm(c.ans) ? acc + 1 : acc;
  }, 0);
  const pct = total > 0 ? Math.round((checkedCount * 100) / total) : 0;

  return (
    <div>
      <p className="hint">
        Complète les citations à trous avec le terme exact attendu (appuie sur{" "}
        <b>Entrée</b> pour valider).
      </p>
      <div
        className="qcard"
        style={{
          position: "sticky",
          top: 52,
          zIndex: 15,
          marginBottom: 14,
          padding: "10px 14px",
          backdropFilter: "blur(14px)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="qnum" style={{ fontWeight: 700 }}>
              Progression : {checkedCount} / {total} ({pct}%)
            </span>
            {checkedCount > 0 && (
              <span
                className="badge"
                style={{
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 999,
                  background: "var(--bonusbg)",
                  color: "var(--bonusink)",
                  border: "1px solid var(--rule)",
                }}
              >
                Score : {correctCount}/{checkedCount}
              </span>
            )}
          </div>
          <button
            type="button"
            className="btn small"
            style={{ padding: "3px 10px", fontSize: 11 }}
            onClick={() => setAnswers({})}
          >
            ↻ Réinitialiser
          </button>
        </div>
        <div
          style={{
            height: 6,
            borderRadius: 999,
            background: "var(--rule)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background: "var(--accent)",
              transition: "width 0.25s ease",
            }}
          />
        </div>
      </div>

      <div id="clozeHost">
        {CLOZE.map((c, idx) => {
          const state = answers[idx] ?? { value: "", checked: false };
          const isOk = norm(state.value) === norm(c.ans);
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
                  placeholder="..."
                  onChange={(e) => setValue(idx, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !state.checked) {
                      e.preventDefault();
                      check(idx);
                    }
                  }}
                  style={{
                    width: 130,
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
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn solid small" onClick={() => check(idx)}>
                    Vérifier
                  </button>
                  <button
                    className="btn small"
                    onClick={() => {
                      setAnswers((prev) => ({
                        ...prev,
                        [idx]: { value: c.ans, checked: true },
                      }));
                    }}
                  >
                    Révéler la réponse
                  </button>
                </div>
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

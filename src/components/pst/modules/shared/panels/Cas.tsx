"use client";

import { useState } from "react";
import type { CaseItem } from "@/lib/pst/types";

interface CaseAnswers {
  q1: number | null;
  q2: number | null;
}

interface CasProps {
  data: CaseItem[];
  hint: string;
}

export function Cas({ data, hint }: CasProps) {
  const [answers, setAnswers] = useState<CaseAnswers[]>(() =>
    data.map(() => ({ q1: null, q2: null })),
  );

  function answer(caseIdx: number, question: "q1" | "q2", optIdx: number) {
    setAnswers((prev) => {
      const next = prev.slice();
      const cur = next[caseIdx];
      if (!cur || cur[question] !== null) return prev;
      next[caseIdx] = { ...cur, [question]: optIdx };
      return next;
    });
  }

  return (
    <div>
      <p className="hint">{hint}</p>
      <div id="casHost">
        {data.map((c, idx) => {
          const ans = answers[idx] ?? { q1: null, q2: null };
          const q1Answered = ans.q1 !== null;
          const q2Answered = ans.q2 !== null;
          return (
            <div className="qcard" key={idx}>
              <div className="qnum">Vignette clinique {idx + 1}</div>
              <p style={{ fontSize: 14, fontStyle: "italic" }}>
                « {c.vignette} »
              </p>

              <div
                className="qbox"
                style={{
                  marginTop: 14,
                  borderTop: "1px solid var(--line)",
                  paddingTop: 14,
                }}
              >
                <div className="qtext">{c.q1.prompt}</div>
                <div className="opts">
                  {c.q1.options.map((opt, oIdx) => {
                    const cls = q1Answered
                      ? opt.ok
                        ? "opt correct"
                        : oIdx === ans.q1
                          ? "opt wrong"
                          : "opt"
                      : "opt";
                    return (
                      <button
                        key={oIdx}
                        className={cls}
                        disabled={q1Answered}
                        onClick={() => answer(idx, "q1", oIdx)}
                      >
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
                {q1Answered && ans.q1 !== null && (
                  <div
                    className={`explain show${!c.q1.options[ans.q1]?.ok ? " miss" : ""}`}
                  >
                    {c.q1.options[ans.q1]?.fb}
                  </div>
                )}
              </div>

              {q1Answered && (
                <div
                  className="qbox"
                  style={{
                    marginTop: 14,
                    borderTop: "1px solid var(--line)",
                    paddingTop: 14,
                  }}
                >
                  <div className="qtext">{c.q2.prompt}</div>
                  <div className="opts">
                    {c.q2.options.map((opt, oIdx) => {
                      const cls = q2Answered
                        ? opt.ok
                          ? "opt correct"
                          : oIdx === ans.q2
                            ? "opt wrong"
                            : "opt"
                        : "opt";
                      return (
                        <button
                          key={oIdx}
                          className={cls}
                          disabled={q2Answered}
                          onClick={() => answer(idx, "q2", oIdx)}
                        >
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  {q2Answered && ans.q2 !== null && (
                    <div
                      className={`explain show${!c.q2.options[ans.q2]?.ok ? " miss" : ""}`}
                    >
                      {c.q2.options[ans.q2]?.fb}
                    </div>
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

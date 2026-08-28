"use client";

import { useEffect, useRef, useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { PiegesItem } from "@/lib/pst/types";
import { makeQuestionId } from "@/lib/pst/utils";
import { QuizBilan } from "./QuizBilan";

interface PiegesProps {
  store: PstStore;
  data: PiegesItem[];
  onAnswered?: () => void;
}

export function Pieges({ store, data, onAnswered }: PiegesProps) {
  const total = data.length;
  const [answers, setAnswers] = useState<(boolean | null)[]>(() =>
    data.map(() => null),
  );
  const finishedRef = useRef(false);

  useEffect(() => {
    setAnswers(data.map(() => null));
    finishedRef.current = false;
  }, [data]);

  const answeredCount = answers.filter((a) => a !== null).length;
  const score = answers.reduce<number>((acc, ans, idx) => {
    if (ans === null) return acc;
    const p = data[idx];
    return p && ans === p[1] ? acc + 1 : acc;
  }, 0);

  useEffect(() => {
    if (answeredCount === total && total > 0 && !finishedRef.current) {
      finishedRef.current = true;
      store.recordScore("pieges", score, total);
      onAnswered?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answeredCount, total]);

  function handleAnswer(idx: number, val: boolean) {
    if (answers[idx] !== null) return;
    const p = data[idx];
    if (!p) return;
    const isCorrect = val === p[1];
    const qId = makeQuestionId("piege", p[0]);
    if (isCorrect) {
      store.removeError(qId);
    } else {
      store.logError(
        "pieges",
        qId,
        p[0],
        p[2],
        p[1] ? "Vrai" : "Faux",
        val ? "Vrai" : "Faux",
      );
    }
    setAnswers((prev) => {
      const next = prev.slice();
      next[idx] = val;
      return next;
    });
  }

  return (
    <div className="pieges-host">
      {data.map((p, idx) => {
        const ans = answers[idx] ?? null;
        const isAnswered = ans !== null;
        return (
          <div className="qcard" key={idx}>
            <div className="qhead">
              <span className="qnum">
                Piège {idx + 1} / {total}
              </span>
            </div>
            <div className="qtext">{p[0]}</div>
            <div className="opts" style={{ flexDirection: "row", gap: 10 }}>
              {[true, false].map((val) => {
                const cls = isAnswered
                  ? val === p[1]
                    ? "btn opt correct"
                    : ans === val
                      ? "btn opt wrong"
                      : "btn opt"
                  : "btn opt";
                return (
                  <button
                    key={String(val)}
                    className={cls}
                    style={{ flex: 1, justifyContent: "center" }}
                    disabled={isAnswered}
                    onClick={() => handleAnswer(idx, val)}
                  >
                    {val ? "Vrai" : "Faux"}
                  </button>
                );
              })}
            </div>
            {isAnswered && (
              <div className={`explain show${ans !== p[1] ? " miss" : ""}`}>
                {p[2]}
              </div>
            )}
          </div>
        );
      })}
      {answeredCount === total && total > 0 && (
        <QuizBilan correct={score} total={total} />
      )}
    </div>
  );
}

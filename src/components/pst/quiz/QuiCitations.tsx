"use client";

import { useEffect, useRef, useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { AMap, QuiItem } from "@/lib/pst/types";
import { makeQuestionId } from "@/lib/pst/utils";
import { QuizBilan } from "./QuizBilan";

interface QuiCitationsProps {
  store: PstStore;
  data: QuiItem[];
  authors: AMap;
  onAnswered?: () => void;
}

export function QuiCitations({
  store,
  data,
  authors,
  onAnswered,
}: QuiCitationsProps) {
  const total = data.length;
  const authorKeys = Object.keys(authors);
  const [answers, setAnswers] = useState<(string | null)[]>(() =>
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
    const q = data[idx];
    return q && ans === q[1] ? acc + 1 : acc;
  }, 0);

  useEffect(() => {
    if (answeredCount === total && total > 0 && !finishedRef.current) {
      finishedRef.current = true;
      store.recordScore("qui", score, total);
      onAnswered?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answeredCount, total]);

  function handleAnswer(idx: number, selected: string) {
    if (answers[idx] !== null) return;
    const q = data[idx];
    if (!q) return;
    const isCorrect = selected === q[1];
    const qId = makeQuestionId("qui", q[0]);
    if (isCorrect) {
      store.removeError(qId);
    } else {
      store.logError(
        "qui",
        qId,
        `Qui a dit : « ${q[0]} » ?`,
        q[2],
        authors[q[1]] || q[1],
        authors[selected] || selected,
      );
    }
    setAnswers((prev) => {
      const next = prev.slice();
      next[idx] = selected;
      return next;
    });
  }

  return (
    <div className="qui-host">
      {data.map((q, idx) => {
        const ans = answers[idx] ?? null;
        const isAnswered = ans !== null;
        return (
          <div className="qcard" key={idx}>
            <div className="qhead">
              <span className="qnum">
                Citation {idx + 1} / {total}
              </span>
            </div>
            <div className="qtext">« {q[0]} »</div>
            <div className="opts">
              {authorKeys.map((key) => {
                const cls = isAnswered
                  ? key === q[1]
                    ? "opt correct"
                    : ans === key
                      ? "opt wrong"
                      : "opt"
                  : "opt";
                return (
                  <button
                    key={key}
                    className={cls}
                    disabled={isAnswered}
                    onClick={() => handleAnswer(idx, key)}
                  >
                    <span>{authors[key]}</span>
                  </button>
                );
              })}
            </div>
            {isAnswered && (
              <div className={`explain show${ans !== q[1] ? " miss" : ""}`}>
                {q[2]}
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

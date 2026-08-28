"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { DistinguerGroup } from "@/lib/pst/types";
import { shuffleArr } from "@/lib/pst/utils";
import { QuizBilan } from "@/components/pst/quiz/QuizBilan";

interface FlatItem {
  text: string;
  pair: [string, string];
  correct: number;
  crit: string;
}

function buildFlat(groups: DistinguerGroup[]): FlatItem[] {
  const flat: FlatItem[] = [];
  groups.forEach((g) => {
    g.items.forEach((it) => {
      flat.push({ text: it[0], pair: g.pair, correct: it[1], crit: g.crit });
    });
  });
  return shuffleArr(flat);
}

interface DistinguerProps {
  store: PstStore;
  onAnswered?: () => void;
  data: DistinguerGroup[];
  hint: string;
}

export function Distinguer({ store, onAnswered, data, hint }: DistinguerProps) {
  const [items, setItems] = useState<FlatItem[]>(() => buildFlat(data));
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    items.map(() => null),
  );
  const finishedRef = useRef(false);

  useEffect(() => {
    setAnswers(items.map(() => null));
    finishedRef.current = false;
  }, [items]);

  const total = items.length;
  const answeredCount = answers.filter((a) => a !== null).length;
  const score = useMemo(
    () =>
      answers.reduce<number>(
        (acc, a, i) => (a !== null && a === items[i]?.correct ? acc + 1 : acc),
        0,
      ),
    [answers, items],
  );

  useEffect(() => {
    if (answeredCount === total && total > 0 && !finishedRef.current) {
      finishedRef.current = true;
      store.recordScore("distinguer", score, total);
      onAnswered?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answeredCount, total]);

  function handleAnswer(idx: number, selected: number) {
    if (answers[idx] !== null) return;
    setAnswers((prev) => {
      const next = prev.slice();
      next[idx] = selected;
      return next;
    });
  }

  return (
    <div>
      <p className="hint">{hint}</p>
      <div className="bilan">
        {answeredCount === total && total > 0 && (
          <QuizBilan correct={score} total={total} />
        )}
      </div>
      <div id="distHost">
        {items.map((item, idx) => {
          const ans = answers[idx];
          const isAnswered = ans !== null;
          return (
            <div className="qcard" key={idx}>
              <div className="qhead">
                <span className="qnum">
                  Indice {idx + 1} / {total}
                </span>
              </div>
              <div className="qtext">« {item.text} »</div>
              <div className="opts" style={{ flexDirection: "row", gap: 10 }}>
                {item.pair.map((label, oIdx) => {
                  const cls = isAnswered
                    ? oIdx === item.correct
                      ? "btn opt correct"
                      : oIdx === ans
                        ? "btn opt wrong"
                        : "btn opt"
                    : "btn opt";
                  return (
                    <button
                      key={oIdx}
                      className={cls}
                      style={{ flex: 1, justifyContent: "center" }}
                      disabled={isAnswered}
                      onClick={() => handleAnswer(idx, oIdx)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              {isAnswered && (
                <div
                  className={`explain show${ans !== item.correct ? " miss" : ""}`}
                >
                  <b>{ans === item.correct ? "Correct !" : "Incorrect."}</b>{" "}
                  {item.pair[item.correct]} - <i>{item.crit}</i>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="navrow">
        <span />
        <button className="btn" onClick={() => setItems(buildFlat(data))}>
          Recommencer (nouvel ordre)
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { DistinguerGroup } from "@/lib/pst/types";
import { shuffleArr } from "@/lib/pst/utils";
import { playReviewSound, playSuccessSound } from "@/lib/pst/audio-feedback";
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
  const [mode, setMode] = useState<"list" | "focus" | "errors">("list");
  const [focusIdx, setFocusIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    items.map(() => null),
  );
  const finishedRef = useRef(false);

  useEffect(() => {
    setAnswers(items.map(() => null));
    setFocusIdx(0);
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

  const wrongIndices = useMemo(() => {
    const list: number[] = [];
    answers.forEach((ans, idx) => {
      if (ans === null) return;
      if (ans !== items[idx]?.correct) list.push(idx);
    });
    return list;
  }, [answers, items]);

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
    const isRight = selected === items[idx]?.correct;
    if (isRight) playSuccessSound();
    else playReviewSound();
    setAnswers((prev) => {
      const next = prev.slice();
      next[idx] = selected;
      return next;
    });
  }

  function renderCard(item: FlatItem, idx: number) {
    const ans = answers[idx] ?? null;
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
            <b>{ans === item.correct ? "✓ Correct !" : "✗ Incorrect."}</b>{" "}
            {item.pair[item.correct]} — <i>{item.crit}</i>
          </div>
        )}
      </div>
    );
  }

  const pctDone = total > 0 ? Math.round((answeredCount * 100) / total) : 0;
  const pctAcc =
    answeredCount > 0 ? Math.round((score * 100) / answeredCount) : 0;

  return (
    <div>
      <p className="hint">{hint}</p>
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
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span className="qnum" style={{ fontWeight: 700 }}>
              Progression : {answeredCount} / {total} ({pctDone}%)
            </span>
            {answeredCount > 0 && (
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
                Score live : {score}/{answeredCount} ({pctAcc}%)
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <button
              type="button"
              className={`btn small${mode === "list" ? " primary" : ""}`}
              style={{ padding: "3px 9px", fontSize: 11 }}
              onClick={() => setMode("list")}
            >
              Vue Liste ({total})
            </button>
            <button
              type="button"
              className={`btn small${mode === "focus" ? " primary" : ""}`}
              style={{ padding: "3px 9px", fontSize: 11 }}
              onClick={() => setMode("focus")}
            >
              Focus 1 par 1
            </button>
            {wrongIndices.length > 0 && (
              <button
                type="button"
                className={`btn small${mode === "errors" ? " primary" : ""}`}
                style={{ padding: "3px 9px", fontSize: 11 }}
                onClick={() => setMode("errors")}
              >
                Erreurs ({wrongIndices.length})
              </button>
            )}
            <button
              type="button"
              className="btn small"
              style={{ padding: "3px 9px", fontSize: 11 }}
              onClick={() => {
                setItems(buildFlat(data));
                setMode("list");
              }}
            >
              ↻ Nouveau tirage
            </button>
          </div>
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
              width: `${pctDone}%`,
              background: "var(--accent)",
              transition: "width 0.25s ease",
            }}
          />
        </div>
      </div>

      {mode === "focus" ? (
        <div>
          {items[focusIdx] && renderCard(items[focusIdx]!, focusIdx)}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
              marginTop: 10,
            }}
          >
            <button
              type="button"
              className="btn small"
              disabled={focusIdx <= 0}
              onClick={() => setFocusIdx((i) => Math.max(0, i - 1))}
            >
              ← Indice précédent
            </button>
            <span className="qnum">
              {focusIdx + 1} / {total}
            </span>
            <button
              type="button"
              className="btn small primary"
              disabled={focusIdx >= total - 1}
              onClick={() => setFocusIdx((i) => Math.min(total - 1, i + 1))}
            >
              Indice suivant →
            </button>
          </div>
        </div>
      ) : mode === "errors" ? (
        wrongIndices.map((idx) =>
          items[idx] ? renderCard(items[idx]!, idx) : null,
        )
      ) : (
        <div id="distHost">
          {items.map((item, idx) => renderCard(item, idx))}
        </div>
      )}

      <div className="bilan">
        {answeredCount === total && total > 0 && (
          <QuizBilan correct={score} total={total} />
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { PiegesItem } from "@/lib/pst/types";
import { makeQuestionId, shuffleArr } from "@/lib/pst/utils";
import { playReviewSound, playSuccessSound } from "@/lib/pst/audio-feedback";
import { QuizBilan } from "./QuizBilan";

interface PiegesProps {
  store: PstStore;
  data: PiegesItem[];
  onAnswered?: () => void;
}

export function Pieges({ store, data, onAnswered }: PiegesProps) {
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [mode, setMode] = useState<"list" | "focus" | "errors">("list");
  const [focusIdx, setFocusIdx] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const items = useMemo(() => shuffleArr(data), [data, shuffleSeed]);
  const total = items.length;
  const [answers, setAnswers] = useState<(boolean | null)[]>(() =>
    items.map(() => null),
  );
  const finishedRef = useRef(false);

  useEffect(() => {
    setAnswers(items.map(() => null));
    setFocusIdx(0);
    finishedRef.current = false;
  }, [items]);

  const answeredCount = answers.filter((a) => a !== null).length;
  const score = answers.reduce<number>((acc, ans, idx) => {
    if (ans === null) return acc;
    const p = items[idx];
    return p && ans === p[1] ? acc + 1 : acc;
  }, 0);

  const wrongIndices = useMemo(() => {
    const list: number[] = [];
    answers.forEach((ans, idx) => {
      if (ans === null) return;
      const p = items[idx];
      if (p && ans !== p[1]) list.push(idx);
    });
    return list;
  }, [answers, items]);

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
    const p = items[idx];
    if (!p) return;
    const isCorrect = val === p[1];
    const qId = makeQuestionId("piege", p[0]);
    if (isCorrect) {
      playSuccessSound();
      store.removeError(qId);
    } else {
      playReviewSound();
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

  function renderCard(p: PiegesItem, idx: number) {
    const ans = answers[idx] ?? null;
    const isAnswered = ans !== null;
    return (
      <div className="qcard" key={`${shuffleSeed}-${idx}`}>
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
          <div
            className={`explain show${ans !== p[1] ? " miss" : ""}`}
            dangerouslySetInnerHTML={{ __html: p[2] }}
          />
        )}
      </div>
    );
  }

  const pctDone = total > 0 ? Math.round((answeredCount * 100) / total) : 0;
  const pctAccuracy =
    answeredCount > 0 ? Math.round((score * 100) / answeredCount) : 0;

  return (
    <div className="pieges-host">
      {/* Barre sticky de progression Vrai/Faux */}
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
                Score live : {score}/{answeredCount} ({pctAccuracy}%)
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
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
                setShuffleSeed((s) => s + 1);
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
              ← Piège précédent
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
              Piège suivant →
            </button>
          </div>
        </div>
      ) : mode === "errors" ? (
        wrongIndices.map((idx) =>
          items[idx] ? renderCard(items[idx]!, idx) : null,
        )
      ) : (
        items.map((p, idx) => renderCard(p, idx))
      )}

      {answeredCount === total && total > 0 && (
        <QuizBilan correct={score} total={total} />
      )}
    </div>
  );
}

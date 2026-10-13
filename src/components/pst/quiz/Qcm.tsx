"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { QcmItem } from "@/lib/pst/types";
import { makeQuestionId, shuffleArr } from "@/lib/pst/utils";
import { playReviewSound, playSuccessSound } from "@/lib/pst/audio-feedback";
import { QuizBilan } from "./QuizBilan";

interface QcmProps {
  store: PstStore;
  data: QcmItem[];
  onAnswered?: () => void;
}

interface OrderedOption {
  opt: string;
  i: number;
}

function QcmQuestion({
  q,
  idx,
  total,
  order,
  answered,
  onAnswer,
}: {
  q: QcmItem;
  idx: number;
  total: number;
  order: OrderedOption[];
  answered: number | null;
  onAnswer: (selected: number) => void;
}) {
  const [hintShown, setHintShown] = useState(false);
  const isAnswered = answered !== null;

  return (
    <div className="qcard">
      <div
        className="qhead"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span className="qnum">
          Question {idx + 1} / {total}
        </span>
        {q.exp && !isAnswered && (
          <button
            className="btn small btn-hint"
            style={{ padding: "2px 8px", fontSize: 11, marginLeft: "auto" }}
            disabled={hintShown}
            onClick={(e) => {
              e.stopPropagation();
              setHintShown(true);
            }}
          >
            Indice
          </button>
        )}
      </div>
      <div className="qtext">{q.q}</div>
      <div className="opts">
        {order.map((o, oIdx) => {
          const isCorrectOpt = o.i === q.correct;
          const isSelected = answered === oIdx;
          const cls = isAnswered
            ? isCorrectOpt
              ? "opt correct"
              : isSelected
                ? "opt wrong"
                : "opt"
            : "opt";
          return (
            <button
              key={oIdx}
              className={cls}
              disabled={isAnswered}
              onClick={() => onAnswer(oIdx)}
            >
              <span>{o.opt}</span>
            </button>
          );
        })}
      </div>
      {(isAnswered || hintShown) && (
        <div
          className={`explain show${isAnswered && answered !== null && order[answered]?.i !== q.correct ? " miss" : ""}`}
          style={
            !isAnswered && hintShown
              ? {
                  borderColor: "var(--accent)",
                  background: "var(--bonusbg)",
                  color: "var(--bonusink)",
                }
              : undefined
          }
        >
          {isAnswered ? (
            <span dangerouslySetInnerHTML={{ __html: q.exp }} />
          ) : (
            <>
              <b>Indice :</b>{" "}
              {q.exp.replace(/<[^>]*>/g, "").split(/[.!?]/)[0]}.
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function Qcm({ store, data, onAnswered }: QcmProps) {
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [mode, setMode] = useState<"list" | "focus" | "errors">("list");
  const [focusIdx, setFocusIdx] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = useMemo(() => shuffleArr(data), [data, shuffleSeed]);
  const orders = useMemo(
    () =>
      questions.map((q) => shuffleArr(q.opts.map((opt, i) => ({ opt, i })))),
    [questions],
  );
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    questions.map(() => null),
  );
  const finishedRef = useRef(false);

  useEffect(() => {
    setAnswers(questions.map(() => null));
    setFocusIdx(0);
    finishedRef.current = false;
  }, [questions]);

  const answeredCount = answers.filter((a) => a !== null).length;
  const total = questions.length;
  const correct = answers.reduce<number>((acc, sel, idx) => {
    if (sel === null) return acc;
    const order = orders[idx];
    const q = questions[idx];
    if (!order || !q) return acc;
    return order[sel]?.i === q.correct ? acc + 1 : acc;
  }, 0);

  const wrongIndices = useMemo(() => {
    const list: number[] = [];
    answers.forEach((sel, idx) => {
      if (sel === null) return;
      const order = orders[idx];
      const q = questions[idx];
      if (order && q && order[sel]?.i !== q.correct) {
        list.push(idx);
      }
    });
    return list;
  }, [answers, orders, questions]);

  useEffect(() => {
    if (answeredCount === total && total > 0 && !finishedRef.current) {
      finishedRef.current = true;
      store.recordScore("qcm", correct, total);
      if (Math.round((100 * correct) / total) === 100)
        store.unlockBadge("qcm_perfection");
      onAnswered?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answeredCount, total]);

  function handleAnswer(qIdx: number, selectedOrderIdx: number) {
    if (answers[qIdx] !== null) return;
    const q = questions[qIdx];
    const order = orders[qIdx];
    if (!q || !order) return;
    const chosen = order[selectedOrderIdx];
    if (!chosen) return;
    const isRight = chosen.i === q.correct;
    const qId = makeQuestionId("qcm", q.q);
    if (isRight) {
      playSuccessSound();
      store.removeError(qId);
    } else {
      playReviewSound();
      const correctOpt = order.find((o) => o.i === q.correct);
      store.logError(
        "qcm",
        qId,
        q.q,
        q.exp,
        correctOpt ? correctOpt.opt : "",
        chosen.opt,
      );
    }
    setAnswers((prev) => {
      const next = prev.slice();
      next[qIdx] = selectedOrderIdx;
      return next;
    });
  }

  const pctDone = total > 0 ? Math.round((answeredCount * 100) / total) : 0;
  const pctAccuracy =
    answeredCount > 0 ? Math.round((correct * 100) / answeredCount) : 0;

  return (
    <div className="qcm-host">
      {/* Barre de progression et de mode QCM style iOS Segmented Control */}
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
                Score live : {correct}/{answeredCount} ({pctAccuracy}%)
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
              title="Re-mélanger les questions et repartir à zéro"
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
          {questions[focusIdx] && orders[focusIdx] && (
            <QcmQuestion
              key={`${shuffleSeed}-${focusIdx}`}
              q={questions[focusIdx]!}
              idx={focusIdx}
              total={total}
              order={orders[focusIdx]!}
              answered={answers[focusIdx] ?? null}
              onAnswer={(selected) => handleAnswer(focusIdx, selected)}
            />
          )}
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
              ← Question précédente
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
              Question suivante →
            </button>
          </div>
        </div>
      ) : mode === "errors" ? (
        wrongIndices.length === 0 ? (
          <div className="qcard">Aucune erreur sur cette série.</div>
        ) : (
          wrongIndices.map((idx) => {
            const q = questions[idx];
            const order = orders[idx];
            if (!q || !order) return null;
            return (
              <QcmQuestion
                key={`${shuffleSeed}-${idx}`}
                q={q}
                idx={idx}
                total={total}
                order={order}
                answered={answers[idx] ?? null}
                onAnswer={(selected) => handleAnswer(idx, selected)}
              />
            );
          })
        )
      ) : (
        questions.map((q, idx) => {
          const order = orders[idx];
          if (!order) return null;
          return (
            <QcmQuestion
              key={`${shuffleSeed}-${idx}`}
              q={q}
              idx={idx}
              total={total}
              order={order}
              answered={answers[idx] ?? null}
              onAnswer={(selected) => handleAnswer(idx, selected)}
            />
          );
        })
      )}

      {answeredCount === total && total > 0 && (
        <QuizBilan correct={correct} total={total} />
      )}
    </div>
  );
}

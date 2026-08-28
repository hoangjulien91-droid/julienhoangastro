"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { QcmItem } from "@/lib/pst/types";
import { makeQuestionId, shuffleArr } from "@/lib/pst/utils";
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
            Indice 💡
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
            q.exp
          ) : (
            <>
              💡 <b>Indice :</b>{" "}
              {q.exp.replace(/<[^>]*>/g, "").split(/[.!?]/)[0]}.
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function Qcm({ store, data, onAnswered }: QcmProps) {
  const questions = useMemo(() => shuffleArr(data), [data]);
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
      store.removeError(qId);
    } else {
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

  return (
    <div className="qcm-host">
      {questions.map((q, idx) => {
        const order = orders[idx];
        if (!order) return null;
        return (
          <QcmQuestion
            key={idx}
            q={q}
            idx={idx}
            total={total}
            order={order}
            answered={answers[idx] ?? null}
            onAnswer={(selected) => handleAnswer(idx, selected)}
          />
        );
      })}
      {answeredCount === total && total > 0 && (
        <QuizBilan correct={correct} total={total} />
      )}
    </div>
  );
}

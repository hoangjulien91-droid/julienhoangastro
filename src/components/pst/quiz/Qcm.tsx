"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { QcmItem } from "@/lib/pst/types";
import { makeQuestionId, shuffleArr } from "@/lib/pst/utils";
import { playReviewSound, playSuccessSound } from "@/lib/pst/audio-feedback";
import { QuizBilan } from "./QuizBilan";
import { QcmQuestionView, type OrderedOption } from "./QcmQuestionView";
import { QcmHeaderBar } from "./QcmHeaderBar";
import { QcmFocusView } from "./QcmFocusView";

export { QcmQuestionView, type OrderedOption };

interface QcmProps {
  store: PstStore;
  data: QcmItem[];
  onAnswered?: () => void;
}

export function Qcm({ store, data, onAnswered }: QcmProps) {
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [poolLimit, setPoolLimit] = useState<5 | 10 | "all">("all");
  const [mode, setMode] = useState<"list" | "focus" | "errors">("list");
  const [focusIdx, setFocusIdx] = useState(0);

  const questions = useMemo(() => {
    const shuffled = shuffleArr(data);
    if (poolLimit === "all" || shuffled.length <= poolLimit) return shuffled;
    const errIds = new Set(store.getErrors().map((e) => e.id));
    const prioritized = [
      ...shuffled.filter((q) => errIds.has(makeQuestionId("qcm", q.q))),
      ...shuffled.filter((q) => !errIds.has(makeQuestionId("qcm", q.q))),
    ];
    return prioritized.slice(0, poolLimit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, shuffleSeed, poolLimit]);

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

  // Raccourcis clavier en mode Focus (Linear / Anki)
  useEffect(() => {
    if (mode !== "focus") return;
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      const key = e.key;
      const digit = parseInt(key, 10);
      const currentOrder = orders[focusIdx];
      if (
        !isNaN(digit) &&
        digit >= 1 &&
        currentOrder &&
        digit <= currentOrder.length
      ) {
        e.preventDefault();
        handleAnswer(focusIdx, digit - 1);
      } else if (key === "ArrowRight" || key === "Enter" || key === " ") {
        e.preventDefault();
        setFocusIdx((i) => Math.min(total - 1, i + 1));
      } else if (key === "ArrowLeft") {
        e.preventDefault();
        setFocusIdx((i) => Math.max(0, i - 1));
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, focusIdx, total, orders, answers]);

  // Gestuelle swipe tactile mobile en mode Focus
  const touchStartXRef = useRef<number | null>(null);
  function handleTouchStart(e: React.TouchEvent) {
    if (e.touches[0]) {
      touchStartXRef.current = e.touches[0].clientX;
    }
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartXRef.current === null || !e.changedTouches[0]) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        setFocusIdx((i) => Math.min(total - 1, i + 1));
      } else {
        setFocusIdx((i) => Math.max(0, i - 1));
      }
    }
    touchStartXRef.current = null;
  }

  const pctDone = total > 0 ? Math.round((answeredCount * 100) / total) : 0;
  const pctAccuracy =
    answeredCount > 0 ? Math.round((correct * 100) / answeredCount) : 0;

  return (
    <div className="qcm-host">
      <QcmHeaderBar
        answeredCount={answeredCount}
        total={total}
        pctDone={pctDone}
        correct={correct}
        pctAccuracy={pctAccuracy}
        poolLimit={poolLimit}
        setPoolLimit={(lim) => {
          setPoolLimit(lim);
          setShuffleSeed((s) => s + 1);
        }}
        mode={mode}
        setMode={setMode}
        wrongCount={wrongIndices.length}
        totalDataLength={data.length}
        onReset={() => {
          setShuffleSeed((s) => s + 1);
          setMode("list");
        }}
      />

      {mode === "focus" ? (
        questions[focusIdx] && orders[focusIdx] ? (
          <QcmFocusView
            question={questions[focusIdx]!}
            order={orders[focusIdx]!}
            focusIdx={focusIdx}
            total={total}
            shuffleSeed={shuffleSeed}
            answered={answers[focusIdx] ?? null}
            onAnswer={(selected) => handleAnswer(focusIdx, selected)}
            onPrev={() => setFocusIdx((i) => Math.max(0, i - 1))}
            onNext={() => setFocusIdx((i) => Math.min(total - 1, i + 1))}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
        ) : null
      ) : mode === "errors" ? (
        wrongIndices.length === 0 ? (
          <div className="qcard">Aucune erreur sur cette série.</div>
        ) : (
          wrongIndices.map((idx) => {
            const q = questions[idx];
            const order = orders[idx];
            if (!q || !order) return null;
            return (
              <QcmQuestionView
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
            <QcmQuestionView
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

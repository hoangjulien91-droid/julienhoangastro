"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import type { DistinguerGroup } from "@/lib/pst/types";
import { shuffleArr } from "@/lib/pst/utils";
import {
  playClickSound,
  playReviewSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { QuizBilan } from "@/components/pst/quiz/QuizBilan";
import { DistinguerCard, type FlatItem } from "./distinguer/DistinguerCard";
import { DistinguerHeader } from "./distinguer/DistinguerHeader";

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
  }, [answeredCount, total, score, store, onAnswered]);

  function handleAnswer(idx: number, selected: number) {
    if (answers[idx] !== null) return;
    const isRight = selected === items[idx]?.correct;
    if (isRight) {
      playSuccessSound();
      triggerHaptic("success");
    } else {
      playReviewSound();
      triggerHaptic("error");
    }
    setAnswers((prev) => {
      const next = prev.slice();
      next[idx] = selected;
      return next;
    });
  }

  const pctDone = total > 0 ? Math.round((answeredCount * 100) / total) : 0;
  const pctAcc =
    answeredCount > 0 ? Math.round((score * 100) / answeredCount) : 0;

  return (
    <div className="space-y-4">
      {hint && <p className="hint">{hint}</p>}

      {/* Sticky Header */}
      <DistinguerHeader
        total={total}
        answeredCount={answeredCount}
        score={score}
        pctDone={pctDone}
        pctAcc={pctAcc}
        mode={mode}
        onSetMode={setMode}
        wrongCount={wrongIndices.length}
        onReset={() => {
          playClickSound();
          triggerHaptic("selection");
          setItems(buildFlat(data));
          setMode("list");
        }}
      />

      {mode === "focus" ? (
        <div className="space-y-4">
          {items[focusIdx] && (
            <DistinguerCard
              item={items[focusIdx]!}
              idx={focusIdx}
              total={total}
              ans={answers[focusIdx] ?? null}
              onAnswer={handleAnswer}
            />
          )}

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              disabled={focusIdx <= 0}
              onClick={() => {
                playClickSound();
                triggerHaptic("selection");
                setFocusIdx((i) => Math.max(0, i - 1));
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 disabled:opacity-40 transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <ChevronLeft className="size-3.5" />
              <span>Précédent</span>
            </button>

            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
              {focusIdx + 1} / {total}
            </span>

            <button
              type="button"
              disabled={focusIdx >= total - 1}
              onClick={() => {
                playClickSound();
                triggerHaptic("selection");
                setFocusIdx((i) => Math.min(total - 1, i + 1));
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <span>Suivant</span>
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      ) : mode === "errors" ? (
        <div className="space-y-4">
          {wrongIndices.map((idx) =>
            items[idx] ? (
              <DistinguerCard
                key={idx}
                item={items[idx]!}
                idx={idx}
                total={total}
                ans={answers[idx] ?? null}
                onAnswer={handleAnswer}
              />
            ) : null,
          )}
        </div>
      ) : (
        <div id="distHost" className="space-y-4">
          {items.map((item, idx) => (
            <DistinguerCard
              key={idx}
              item={item}
              idx={idx}
              total={total}
              ans={answers[idx] ?? null}
              onAnswer={handleAnswer}
            />
          ))}
        </div>
      )}

      {answeredCount === total && total > 0 && (
        <div className="pt-2 animate-fadeIn">
          <QuizBilan correct={score} total={total} />
        </div>
      )}
    </div>
  );
}

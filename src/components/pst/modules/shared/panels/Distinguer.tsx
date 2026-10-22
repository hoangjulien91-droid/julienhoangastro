"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Scale,
  CheckCircle2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
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

  function renderCard(item: FlatItem, idx: number) {
    const ans = answers[idx] ?? null;
    const isAnswered = ans !== null;

    return (
      <div
        key={idx}
        className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
            <Scale className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>
              Distinguer les concepts · #{idx + 1} / {total}
            </span>
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {item.pair[0]} vs {item.pair[1]}
          </span>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
          <p className="text-xs sm:text-sm italic leading-relaxed text-slate-800 dark:text-slate-200 m-0 font-medium">
            « {item.text} »
          </p>
        </div>

        {/* 2-Way Choice Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {item.pair.map((label, oIdx) => {
            let btnCls =
              "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200";

            if (isAnswered) {
              if (oIdx === item.correct) {
                btnCls =
                  "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-bold shadow-xs";
              } else if (oIdx === ans) {
                btnCls =
                  "bg-rose-50/80 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200 font-semibold";
              } else {
                btnCls =
                  "opacity-40 bg-slate-50/40 dark:bg-slate-800/30 border-slate-200/40 text-slate-500 dark:text-slate-500";
              }
            }

            return (
              <button
                key={oIdx}
                disabled={isAnswered}
                onClick={() => handleAnswer(idx, oIdx)}
                className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center text-center active:scale-98 ${btnCls}`}
              >
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation callout */}
        {isAnswered && (
          <div
            className={`p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
              ans === item.correct
                ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200"
                : "bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200"
            }`}
          >
            <div className="font-bold mb-1">
              {ans === item.correct ? "✓ Correct !" : "✗ Incorrect."}
            </div>
            <div>
              <b>{item.pair[item.correct]}</b> —{" "}
              <span className="italic">{item.crit}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  const pctDone = total > 0 ? Math.round((answeredCount * 100) / total) : 0;
  const pctAcc =
    answeredCount > 0 ? Math.round((score * 100) / answeredCount) : 0;

  return (
    <div className="space-y-4">
      {hint && <p className="hint">{hint}</p>}

      {/* Sticky Header */}
      <div className="sticky top-14 z-20 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
              <Scale className="size-3 text-indigo-600 dark:text-indigo-400" />
              <span>
                Progression : {answeredCount} / {total} ({pctDone}%)
              </span>
            </span>

            {answeredCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="size-3 text-emerald-600" />
                <span>
                  Score : {score}/{answeredCount} ({pctAcc}%)
                </span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                triggerHaptic("selection");
                setMode("list");
              }}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 ${
                mode === "list"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              Vue Liste ({total})
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                triggerHaptic("selection");
                setMode("focus");
              }}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 ${
                mode === "focus"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              Focus 1 par 1
            </button>

            {wrongIndices.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  triggerHaptic("selection");
                  setMode("errors");
                }}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 ${
                  mode === "errors"
                    ? "bg-rose-600 text-white shadow-xs"
                    : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800 hover:bg-rose-100"
                }`}
              >
                <AlertTriangle className="size-3" />
                <span>Erreurs ({wrongIndices.length})</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                playClickSound();
                triggerHaptic("selection");
                setItems(buildFlat(data));
                setMode("list");
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw className="size-3" />
              <span>Nouveau tirage</span>
            </button>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${pctDone}%` }}
          />
        </div>
      </div>

      {mode === "focus" ? (
        <div className="space-y-4">
          {items[focusIdx] && renderCard(items[focusIdx]!, focusIdx)}

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
            items[idx] ? renderCard(items[idx]!, idx) : null,
          )}
        </div>
      ) : (
        <div id="distHost" className="space-y-4">
          {items.map((item, idx) => renderCard(item, idx))}
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

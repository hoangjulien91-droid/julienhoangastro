"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { QcmItem } from "@/lib/pst/types";
import { makeQuestionId, shuffleArr } from "@/lib/pst/utils";
import {
  playReviewSound,
  playSuccessSound,
  playClickSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { QuizBilan } from "./QuizBilan";
import {
  Volume2,
  CheckCircle2,
  XCircle,
  Lightbulb,
  HelpCircle,
} from "lucide-react";

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
    <div className="qcard p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
      <div className="flex items-center justify-between gap-2 border-b border-slate-200/70 dark:border-slate-800 pb-3">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1.5">
          <HelpCircle className="size-3 text-amber-600" />
          <span>
            Question {idx + 1} / {total}
          </span>
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              if (
                typeof window !== "undefined" &&
                "speechSynthesis" in window
              ) {
                window.speechSynthesis.cancel();
                const utter = new SpeechSynthesisUtterance(q.q);
                utter.lang = "fr-FR";
                utter.rate = 1.05;
                window.speechSynthesis.speak(utter);
              }
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-500/10 cursor-pointer transition-colors"
            title="Écouter la question (audio)"
          >
            <Volume2 className="size-3.5" />
          </button>
          {q.exp && !isAnswered && (
            <button
              type="button"
              className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/25 hover:bg-amber-500/20 cursor-pointer transition-all flex items-center gap-1"
              disabled={hintShown}
              onClick={(e) => {
                e.stopPropagation();
                setHintShown(true);
              }}
            >
              <Lightbulb className="size-3 text-amber-500" />
              <span>Indice</span>
            </button>
          )}
        </div>
      </div>

      <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
        {q.q}
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {order.map((o, oIdx) => {
          const isCorrectOpt = o.i === q.correct;
          const isSelected = answered === oIdx;
          let optStyle =
            "bg-slate-50/80 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200";

          if (isAnswered) {
            if (isCorrectOpt) {
              optStyle =
                "bg-emerald-500/15 border-emerald-500/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/20";
            } else if (isSelected) {
              optStyle =
                "bg-rose-500/15 border-rose-500/40 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500/20";
            } else {
              optStyle =
                "opacity-50 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200/50 dark:border-slate-800 text-slate-400";
            }
          }

          return (
            <button
              key={oIdx}
              type="button"
              disabled={isAnswered}
              onClick={() => onAnswer(oIdx)}
              className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start justify-between gap-3 cursor-pointer active:scale-[0.99] ${optStyle}`}
            >
              <span className="flex-1 leading-relaxed">{o.opt}</span>
              {isAnswered && isCorrectOpt && (
                <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              )}
              {isAnswered && isSelected && !isCorrectOpt && (
                <XCircle className="size-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {(isAnswered || hintShown) && (
        <div
          className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
            isAnswered
              ? order[answered!]?.i === q.correct
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100"
                : "bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-100"
              : "bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-100"
          }`}
        >
          {isAnswered ? (
            <span dangerouslySetInnerHTML={{ __html: q.exp }} />
          ) : (
            <>
              <b>💡 Indice pédagogique :</b>{" "}
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
      {/* Barre de progression et de mode QCM style Apple Glassmorphism */}
      <div className="sticky top-14 z-20 mb-4 p-3.5 sm:p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs transition-all space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
              QCM · {answeredCount} / {total} traités ({pctDone}%)
            </span>
            {answeredCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/30">
                Score : {correct} / {answeredCount} ({pctAccuracy}%)
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                mode === "list"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/80"
              }`}
              onClick={() => {
                playClickSound();
                setMode("list");
              }}
            >
              Vue Liste ({total})
            </button>
            <button
              type="button"
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                mode === "focus"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/80"
              }`}
              onClick={() => {
                playClickSound();
                setMode("focus");
              }}
            >
              Focus 1 par 1
            </button>
            {wrongIndices.length > 0 && (
              <button
                type="button"
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  mode === "errors"
                    ? "bg-rose-600 text-white shadow-xs"
                    : "bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30"
                }`}
                onClick={() => {
                  playClickSound();
                  setMode("errors");
                }}
              >
                Erreurs ({wrongIndices.length})
              </button>
            )}
            <button
              type="button"
              className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/80 transition-all cursor-pointer"
              onClick={() => {
                playClickSound();
                setShuffleSeed((s) => s + 1);
                setMode("list");
              }}
              title="Re-mélanger les questions et repartir à zéro"
            >
              ↻ Nouveau tirage
            </button>
          </div>
        </div>

        <div className="h-1.5 w-full bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="bg-accent h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${pctDone}%` }}
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
          <div className="flex items-center justify-between gap-3 mt-4 px-1">
            <button
              type="button"
              className="px-4 py-2 rounded-full text-xs font-mono font-bold bg-muted/60 hover:bg-muted text-foreground border border-border/80 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              disabled={focusIdx <= 0}
              onClick={() => {
                playClickSound();
                setFocusIdx((i) => Math.max(0, i - 1));
              }}
            >
              ← Question précédente
            </button>
            <span className="font-mono text-xs font-bold text-muted-foreground px-2.5 py-1 rounded-full bg-muted/40 border border-border/70">
              {focusIdx + 1} / {total}
            </span>
            <button
              type="button"
              className="px-4 py-2 rounded-full text-xs font-mono font-bold bg-primary text-primary-foreground shadow-xs disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              disabled={focusIdx >= total - 1}
              onClick={() => {
                playClickSound();
                setFocusIdx((i) => Math.min(total - 1, i + 1));
              }}
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

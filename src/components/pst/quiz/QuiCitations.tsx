"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Quote, CheckCircle2, RotateCcw } from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import type { AMap, QuiItem } from "@/lib/pst/types";
import { makeQuestionId, shuffleArr } from "@/lib/pst/utils";
import { playReviewSound, playSuccessSound } from "@/lib/pst/audio-feedback";
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
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [mode, setMode] = useState<"list" | "focus" | "errors">("list");
  const [focusIdx, setFocusIdx] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const items = useMemo(() => shuffleArr(data), [data, shuffleSeed]);
  const total = items.length;
  const authorKeys = Object.keys(authors);
  const [answers, setAnswers] = useState<(string | null)[]>(() =>
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
    const q = items[idx];
    return q && ans === q[1] ? acc + 1 : acc;
  }, 0);

  const wrongIndices = useMemo(() => {
    const list: number[] = [];
    answers.forEach((ans, idx) => {
      if (ans === null) return;
      const q = items[idx];
      if (q && ans !== q[1]) list.push(idx);
    });
    return list;
  }, [answers, items]);

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
    const q = items[idx];
    if (!q) return;
    const isCorrect = selected === q[1];
    const qId = makeQuestionId("qui", q[0]);
    if (isCorrect) {
      playSuccessSound();
      store.removeError(qId);
    } else {
      playReviewSound();
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

  function renderCard(q: QuiItem, idx: number) {
    const ans = answers[idx] ?? null;
    const isAnswered = ans !== null;
    return (
      <div className="qcard" key={`${shuffleSeed}-${idx}`}>
        <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 dark:border-slate-800 pb-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5">
            <Quote className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Qui a dit quoi ? · #{idx + 1} / {total}</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold uppercase">
            Attribution d&apos;auteur
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
          <div
            className={`explain show${ans !== q[1] ? " miss" : ""}`}
            dangerouslySetInnerHTML={{ __html: q[2] }}
          />
        )}
      </div>
    );
  }

  const pctDone = total > 0 ? Math.round((answeredCount * 100) / total) : 0;
  const pctAccuracy =
    answeredCount > 0 ? Math.round((score * 100) / answeredCount) : 0;

  return (
    <div className="qui-host">
      {/* Barre sticky de progression Citations */}
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
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5">
              <Quote className="size-3 text-indigo-600 dark:text-indigo-400" />
              <span>Progression : {answeredCount} / {total} ({pctDone}%)</span>
            </span>
            {answeredCount > 0 && (
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1">
                <CheckCircle2 className="size-3 text-emerald-600" />
                <span>Score live : {score}/{answeredCount} ({pctAccuracy}%)</span>
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
              ← Citation précédente
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
              Citation suivante →
            </button>
          </div>
        </div>
      ) : mode === "errors" ? (
        wrongIndices.map((idx) =>
          items[idx] ? renderCard(items[idx]!, idx) : null,
        )
      ) : (
        items.map((q, idx) => renderCard(q, idx))
      )}

      {answeredCount === total && total > 0 && (
        <QuizBilan correct={score} total={total} />
      )}
    </div>
  );
}

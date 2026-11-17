"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Smartphone, Keyboard } from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import type { AMap, QuiItem } from "@/lib/pst/types";
import { makeQuestionId, shuffleArr } from "@/lib/pst/utils";
import {
  playReviewSound,
  playSuccessSound,
  playClickSound,
} from "@/lib/pst/audio-feedback";
import { QuizBilan } from "./QuizBilan";
import { QuiCitationCard } from "./QuiCitationCard";
import { QuiCitationsToolbar } from "./QuiCitationsToolbar";

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
  const [poolLimit, setPoolLimit] = useState<5 | 10 | "all">("all");
  const [mode, setMode] = useState<"list" | "focus" | "errors">("list");
  const [focusIdx, setFocusIdx] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const items = useMemo(() => {
    const shuffled = shuffleArr(data);
    if (poolLimit === "all" || shuffled.length <= poolLimit) return shuffled;
    const errIds = new Set(store.getErrors().map((e) => e.id));
    const prioritized = [
      ...shuffled.filter((q) => errIds.has(makeQuestionId("qui", q[0]))),
      ...shuffled.filter((q) => !errIds.has(makeQuestionId("qui", q[0]))),
    ];
    return prioritized.slice(0, poolLimit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, shuffleSeed, poolLimit]);

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
      if (!isNaN(digit) && digit >= 1 && digit <= authorKeys.length) {
        const selectedAuthor = authorKeys[digit - 1];
        if (selectedAuthor) {
          e.preventDefault();
          handleAnswer(focusIdx, selectedAuthor);
        }
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
  }, [mode, focusIdx, total, authorKeys, answers]);

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

  return (
    <div className="qui-host">
      <QuiCitationsToolbar
        answeredCount={answeredCount}
        total={total}
        score={score}
        poolLimit={poolLimit}
        onSetPoolLimit={setPoolLimit}
        mode={mode}
        onSetMode={setMode}
        wrongCount={wrongIndices.length}
        onReshuffle={() => {
          setShuffleSeed((s) => s + 1);
          setMode("list");
        }}
      />

      {mode === "focus" ? (
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="space-y-4"
        >
          {/* Aide raccourcis & swipe */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 px-2">
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <Keyboard className="size-3 text-indigo-500" />
              Clavier : [1]-[4] Auteurs · [→/Espace] Suivant · [←] Précédent
            </span>
            <span className="inline-flex sm:hidden items-center gap-1.5">
              <Smartphone className="size-3 text-indigo-500" />
              Balayez l&apos;écran pour naviguer (swipe ◄ ►)
            </span>
            <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400">
              Mémorisation Cnam
            </span>
          </div>

          {items[focusIdx] && (
            <QuiCitationCard
              q={items[focusIdx]!}
              idx={focusIdx}
              total={total}
              answer={answers[focusIdx] ?? null}
              authors={authors}
              authorKeys={authorKeys}
              mode={mode}
              onAnswer={(key) => handleAnswer(focusIdx, key)}
              keyPrefix={`${shuffleSeed}-${poolLimit}`}
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
              ← Citation précédente
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
              Citation suivante →
            </button>
          </div>
        </div>
      ) : mode === "errors" ? (
        wrongIndices.map((idx) =>
          items[idx] ? (
            <QuiCitationCard
              key={`${shuffleSeed}-${poolLimit}-${idx}`}
              q={items[idx]!}
              idx={idx}
              total={total}
              answer={answers[idx] ?? null}
              authors={authors}
              authorKeys={authorKeys}
              mode={mode}
              onAnswer={(key) => handleAnswer(idx, key)}
              keyPrefix={`${shuffleSeed}-${poolLimit}`}
            />
          ) : null,
        )
      ) : (
        items.map((q, idx) => (
          <QuiCitationCard
            key={`${shuffleSeed}-${poolLimit}-${idx}`}
            q={q}
            idx={idx}
            total={total}
            answer={answers[idx] ?? null}
            authors={authors}
            authorKeys={authorKeys}
            mode={mode}
            onAnswer={(key) => handleAnswer(idx, key)}
            keyPrefix={`${shuffleSeed}-${poolLimit}`}
          />
        ))
      )}

      {answeredCount === total && total > 0 && (
        <QuizBilan correct={score} total={total} />
      )}
    </div>
  );
}

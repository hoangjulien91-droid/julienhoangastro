"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Smartphone, Keyboard } from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import type { PiegesItem } from "@/lib/pst/types";
import { makeQuestionId, shuffleArr } from "@/lib/pst/utils";
import {
  playReviewSound,
  playSuccessSound,
  playClickSound,
} from "@/lib/pst/audio-feedback";
import { QuizBilan } from "./QuizBilan";
import { PiegesCard } from "./PiegesCard";
import { PiegesToolbar } from "./PiegesToolbar";

interface PiegesProps {
  store: PstStore;
  data: PiegesItem[];
  onAnswered?: () => void;
}

export function Pieges({ store, data, onAnswered }: PiegesProps) {
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
      ...shuffled.filter((p) => errIds.has(makeQuestionId("piege", p[0]))),
      ...shuffled.filter((p) => !errIds.has(makeQuestionId("piege", p[0]))),
    ];
    return prioritized.slice(0, poolLimit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, shuffleSeed, poolLimit]);

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

  // Raccourcis clavier en mode Focus (Linear / Anki)
  useEffect(() => {
    if (mode !== "focus") return;
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      const key = e.key.toLowerCase();
      if (key === "v" || key === "1") {
        e.preventDefault();
        handleAnswer(focusIdx, true);
      } else if (key === "f" || key === "2") {
        e.preventDefault();
        handleAnswer(focusIdx, false);
      } else if (key === "arrowright" || key === "enter" || key === " ") {
        e.preventDefault();
        setFocusIdx((i) => Math.min(total - 1, i + 1));
      } else if (key === "arrowleft") {
        e.preventDefault();
        setFocusIdx((i) => Math.max(0, i - 1));
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, focusIdx, total, answers]);

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
    <div className="pieges-host">
      <PiegesToolbar
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
              <Keyboard className="size-3 text-amber-500" />
              Clavier : [V] Vrai · [F] Faux · [→/Espace] Suivant · [←] Précédent
            </span>
            <span className="inline-flex sm:hidden items-center gap-1.5">
              <Smartphone className="size-3 text-amber-500" />
              Balayez l&apos;écran pour naviguer (swipe ◄ ►)
            </span>
            <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">
              Ancrage Rapide
            </span>
          </div>

          {items[focusIdx] && (
            <PiegesCard
              p={items[focusIdx]!}
              idx={focusIdx}
              total={total}
              answer={answers[focusIdx] ?? null}
              mode={mode}
              onAnswer={(val) => handleAnswer(focusIdx, val)}
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
              ← Piège précédent
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
              Piège suivant →
            </button>
          </div>
        </div>
      ) : mode === "errors" ? (
        wrongIndices.map((idx) =>
          items[idx] ? (
            <PiegesCard
              key={`${shuffleSeed}-${poolLimit}-${idx}`}
              p={items[idx]!}
              idx={idx}
              total={total}
              answer={answers[idx] ?? null}
              mode={mode}
              onAnswer={(val) => handleAnswer(idx, val)}
              keyPrefix={`${shuffleSeed}-${poolLimit}`}
            />
          ) : null,
        )
      ) : (
        items.map((p, idx) => (
          <PiegesCard
            key={`${shuffleSeed}-${poolLimit}-${idx}`}
            p={p}
            idx={idx}
            total={total}
            answer={answers[idx] ?? null}
            mode={mode}
            onAnswer={(val) => handleAnswer(idx, val)}
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

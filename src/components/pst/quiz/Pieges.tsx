"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  Zap,
  Smartphone,
  Keyboard,
} from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import type { PiegesItem } from "@/lib/pst/types";
import { makeQuestionId, shuffleArr } from "@/lib/pst/utils";
import {
  playReviewSound,
  playSuccessSound,
  playClickSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { QuizBilan } from "./QuizBilan";

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
        // swipe vers la gauche -> question suivante
        setFocusIdx((i) => Math.min(total - 1, i + 1));
      } else {
        // swipe vers la droite -> question précédente
        setFocusIdx((i) => Math.max(0, i - 1));
      }
    }
    touchStartXRef.current = null;
  }

  function renderCard(p: PiegesItem, idx: number) {
    const ans = answers[idx] ?? null;
    const isAnswered = ans !== null;
    return (
      <div className="qcard" key={`${shuffleSeed}-${poolLimit}-${idx}`}>
        <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 dark:border-slate-800 pb-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1.5">
            <AlertTriangle className="size-3 text-amber-600" />
            <span>
              Piège d&apos;Examen · #{idx + 1} / {total}
            </span>
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold uppercase">
              Vrai ou Faux ?
            </span>
          </div>
        </div>
        <div className="qtext">{p[0]}</div>
        <div className="opts flex flex-row gap-2.5">
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
                className={`${cls} flex-1 justify-center`}
                disabled={isAnswered}
                onClick={() => handleAnswer(idx, val)}
              >
                {val
                  ? mode === "focus"
                    ? "Vrai [V]"
                    : "Vrai"
                  : mode === "focus"
                    ? "Faux [F]"
                    : "Faux"}
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
      {/* Barre sticky de progression Vrai/Faux style Apple Glassmorphism */}
      <div className="sticky top-14 z-20 mb-4 p-3.5 sm:p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs transition-all space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1.5 shadow-2xs">
              <AlertTriangle className="size-3 text-amber-600 dark:text-amber-400" />
              <span>
                Pièges · {answeredCount} / {total} ({pctDone}%)
              </span>
            </span>
            {answeredCount > 0 && (
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1 shadow-2xs">
                <CheckCircle2 className="size-3 text-emerald-600 dark:text-emerald-400" />
                <span>
                  Score : {score}/{answeredCount} ({pctAccuracy}%)
                </span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Sélecteur Sprint 5 / 10 / Tout */}
            <div className="flex items-center gap-1 p-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
              {(["all", 5, 10] as const).map((limit) => {
                const label =
                  limit === "all" ? "Tout" : limit === 5 ? "⚡️ 5Q" : "⚡️ 10Q";
                const isActive = poolLimit === limit;
                return (
                  <button
                    key={String(limit)}
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setPoolLimit(limit);
                    }}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-amber-500 text-white shadow-2xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

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

          {items[focusIdx] && renderCard(items[focusIdx]!, focusIdx)}
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

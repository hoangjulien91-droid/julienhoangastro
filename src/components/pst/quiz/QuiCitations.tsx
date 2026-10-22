"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Quote,
  CheckCircle2,
  RotateCcw,
  Volume2,
  Zap,
  Smartphone,
  Keyboard,
} from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import type { AMap, QuiItem } from "@/lib/pst/types";
import { makeQuestionId, shuffleArr } from "@/lib/pst/utils";
import {
  playReviewSound,
  playSuccessSound,
  playClickSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
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
        // swipe vers la gauche -> citation suivante
        setFocusIdx((i) => Math.min(total - 1, i + 1));
      } else {
        // swipe vers la droite -> citation précédente
        setFocusIdx((i) => Math.max(0, i - 1));
      }
    }
    touchStartXRef.current = null;
  }

  function playTts(text: string) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "fr-FR";
      utter.rate = 1.02;
      window.speechSynthesis.speak(utter);
    }
  }

  function renderCard(q: QuiItem, idx: number) {
    const ans = answers[idx] ?? null;
    const isAnswered = ans !== null;
    return (
      <div className="qcard" key={`${shuffleSeed}-${poolLimit}-${idx}`}>
        <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 dark:border-slate-800 pb-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5">
            <Quote className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>
              Qui a dit quoi ? · #{idx + 1} / {total}
            </span>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => playTts(q[0])}
              className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-500/10 cursor-pointer transition-colors"
              title="Écouter la citation (audio)"
            >
              <Volume2 className="size-3.5" />
            </button>
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold uppercase">
              Attribution d&apos;auteur
            </span>
          </div>
        </div>
        <div className="qtext">« {q[0]} »</div>
        <div className="opts">
          {authorKeys.map((key, kIdx) => {
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
                <div className="flex items-center justify-between w-full">
                  <span>{authors[key]}</span>
                  {mode === "focus" && !isAnswered && (
                    <span className="text-[10px] font-mono opacity-60 ml-2">
                      [{kIdx + 1}]
                    </span>
                  )}
                </div>
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
      {/* Barre sticky de progression Citations style Apple Glassmorphism */}
      <div className="sticky top-14 z-20 mb-4 p-3.5 sm:p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs transition-all space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5 shadow-2xs">
              <Quote className="size-3 text-indigo-600 dark:text-indigo-400" />
              <span>
                Citations · {answeredCount} / {total} ({pctDone}%)
              </span>
            </span>
            {answeredCount > 0 && (
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1 shadow-2xs">
                <CheckCircle2 className="size-3 text-emerald-600" />
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
                        ? "bg-indigo-600 text-white shadow-2xs"
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

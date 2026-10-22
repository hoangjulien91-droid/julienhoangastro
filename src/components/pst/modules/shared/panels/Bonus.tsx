"use client";

import { useState, type ReactNode } from "react";
import {
  Sparkles,
  BookOpen,
  Award,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import {
  playClickSound,
  playReviewSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

export interface BonusQuestion {
  q: string;
  opts: string[];
  ok: number;
  expl: string;
}

export interface BonusAuthorCard {
  title: string;
  color: string;
  body: ReactNode;
}

interface BonusProps {
  store: PstStore;
  hint: string;
  authors: BonusAuthorCard[];
  questions: BonusQuestion[];
  quizTitle: string;
}

export function Bonus({
  store,
  hint,
  authors,
  questions,
  quizTitle,
}: BonusProps) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  function restart() {
    playClickSound();
    triggerHaptic("selection");
    setIdx(0);
    setScore(0);
    setSelected(null);
  }

  function answer(oIdx: number) {
    if (selected !== null) return;
    setSelected(oIdx);
    const q = questions[idx];
    if (q && oIdx === q.ok) {
      setScore((s) => s + 1);
      playSuccessSound();
      triggerHaptic("success");
    } else {
      playReviewSound();
      triggerHaptic("error");
    }
  }

  function next() {
    playClickSound();
    triggerHaptic("selection");
    const newIdx = idx + 1;
    setIdx(newIdx);
    setSelected(null);
    if (newIdx >= questions.length) {
      store.recordScore("bonus", score, questions.length);
    }
  }

  const pct =
    questions.length > 0
      ? Math.round(
          ((idx + (selected !== null ? 1 : 0)) * 100) / questions.length,
        )
      : 0;

  return (
    <div className="space-y-5">
      {hint && <p className="hint">{hint}</p>}

      {/* 1. Perspectives Critiques & Auteurs d'Ouverture */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            <Sparkles className="size-3 text-amber-600 dark:text-amber-400" />
            <span>Auteurs d&apos;Ouverture &amp; Perspectives Critiques</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
            Culture d&apos;Élite
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {authors.map((a, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 space-y-1.5"
              style={{ borderLeftColor: a.color, borderLeftWidth: 4 }}
            >
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 m-0">
                {a.title}
              </h4>
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {a.body}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Quiz Bonus d'Approfondissement */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-slate-200/60 dark:border-slate-800">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
            <BookOpen className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>{quizTitle}</span>
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            Score : {score} / {questions.length}
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div id="bonusQuizHost">
          {idx >= questions.length ? (
            <div className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 text-center space-y-3 animate-fadeIn">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                <Award className="size-3.5" />
                <span>Quiz d&apos;Ouverture Terminé !</span>
              </span>

              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
                Votre score : {score} / {questions.length} (
                {Math.round((score * 100) / questions.length)}%)
              </h4>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={restart}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  <RotateCcw className="size-3.5" />
                  <span>Recommencer le quiz</span>
                </button>
              </div>
            </div>
          ) : (
            (() => {
              const q = questions[idx];
              if (!q) return null;
              const isAnswered = selected !== null;

              return (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Question {idx + 1} sur {questions.length}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 m-0 leading-snug">
                      {q.q}
                    </h4>
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    {q.opts.map((opt, oIdx) => {
                      const isChosen = selected === oIdx;
                      let btnCls =
                        "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200";

                      if (isAnswered) {
                        if (oIdx === q.ok) {
                          btnCls =
                            "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-bold";
                        } else if (isChosen) {
                          btnCls =
                            "bg-rose-50/80 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200 font-semibold";
                        } else {
                          btnCls =
                            "opacity-40 bg-slate-50/30 dark:bg-slate-800/20 border-slate-200/40 text-slate-500 dark:text-slate-500";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isAnswered}
                          onClick={() => answer(oIdx)}
                          className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed transition-all cursor-pointer flex items-start gap-2.5 active:scale-99 ${btnCls}`}
                        >
                          <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 shrink-0 mt-0.5">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback */}
                  {selected !== null && (
                    <div className="space-y-3 pt-1 animate-fadeIn">
                      <div
                        className={`p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                          selected === q.ok
                            ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200"
                            : "bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200"
                        }`}
                      >
                        <div className="font-bold mb-1 flex items-center gap-1.5">
                          {selected === q.ok ? (
                            <>
                              <CheckCircle2 className="size-3.5 text-emerald-600" />
                              <span>✓ Réponse exacte</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="size-3.5 text-rose-600" />
                              <span>✗ Réponse incorrecte</span>
                            </>
                          )}
                        </div>
                        <p className="m-0 leading-relaxed">{q.expl}</p>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={next}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
                        >
                          <span>
                            {idx + 1 >= questions.length
                              ? "Terminer le quiz"
                              : "Question suivante"}
                          </span>
                          <ArrowRight className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()
          )}
        </div>
      </div>
    </div>
  );
}

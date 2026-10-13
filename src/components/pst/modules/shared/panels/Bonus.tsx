"use client";

import { useState, type ReactNode } from "react";
import type { PstStore } from "@/lib/pst/store";
import { playReviewSound, playSuccessSound } from "@/lib/pst/audio-feedback";

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
    } else {
      playReviewSound();
    }
  }

  function next() {
    const newIdx = idx + 1;
    setIdx(newIdx);
    setSelected(null);
    if (newIdx >= questions.length) {
      store.recordScore("bonus", score, questions.length);
    }
  }

  const pct =
    questions.length > 0
      ? Math.round(((idx + (selected !== null ? 1 : 0)) * 100) / questions.length)
      : 0;

  return (
    <div>
      <p className="hint">{hint}</p>
      <div className="flex flex-col gap-5">
        <div
          className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col gap-3.5"
        >
          <div className="text-xs sm:text-sm font-black font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-2">
            <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Auteurs d&apos;Ouverture &amp; Perspectives Critiques</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 border-t border-slate-200/60 dark:border-slate-800">
            {authors.map((a, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60"
                style={{ borderLeftColor: a.color, borderLeftWidth: 3 }}
              >
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-1">
                  {a.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 m-0 leading-relaxed font-medium">
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <div className="text-xs sm:text-sm font-black font-mono uppercase tracking-wider text-slate-900 dark:text-slate-100">
              {quizTitle}
            </div>
            <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 px-2.5 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
              Score : {score} / {questions.length}
            </span>
          </div>
          <div className="fiche-progress-bar" style={{ marginBottom: 14 }}>
            <div className="fiche-progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <div id="bonusQuizHost">
            {idx >= questions.length ? (
              <div style={{ textAlign: "center", padding: 15 }}>
                <h4 style={{ margin: "0 0 8px", color: "var(--dejours)" }}>
                  Quiz Terminé !
                </h4>
                <p
                  style={{
                    margin: "0 0 15px",
                    fontSize: 13,
                    color: "var(--muted)",
                  }}
                >
                  Votre score de culture d&apos;élite :{" "}
                  <b>
                    {score} / {questions.length}
                  </b>
                </p>
                <button className="btn small" onClick={restart}>
                  ↻ Recommencer
                </button>
              </div>
            ) : (
              (() => {
                const q = questions[idx];
                if (!q) return null;
                const isAnswered = selected !== null;
                return (
                  <>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--muted)",
                        marginBottom: 8,
                        fontWeight: 600,
                      }}
                    >
                      Question {idx + 1} sur {questions.length}
                    </div>
                    <h4 style={{ margin: "0 0 15px", fontSize: 13.5 }}>
                      {q.q}
                    </h4>
                    <div style={{ marginBottom: 15 }}>
                      {q.opts.map((opt, oIdx) => {
                        const cls = isAnswered
                          ? oIdx === q.ok
                            ? "opt correct"
                            : oIdx === selected
                              ? "opt wrong"
                              : "opt"
                          : "opt";
                        return (
                          <button
                            key={oIdx}
                            className={cls}
                            style={{
                              width: "100%",
                              textAlign: "left",
                              padding: "10px 15px",
                              marginBottom: 8,
                              borderRadius: "var(--r)",
                              fontSize: 12.5,
                            }}
                            disabled={isAnswered}
                            onClick={() => answer(oIdx)}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {selected !== null && (
                      <div
                        style={{
                          padding: 12,
                          borderRadius: "var(--r)",
                          fontSize: 12,
                          marginBottom: 15,
                          background:
                            selected === q.ok
                              ? "var(--goodbg)"
                              : "var(--badbg)",
                          color:
                            selected === q.ok ? "var(--good)" : "var(--bad)",
                        }}
                      >
                        {selected === q.ok ? (
                          <>
                            <b>✓ Correct.</b> {q.expl}
                          </>
                        ) : (
                          <>
                            <b>✗ Incorrect.</b> La bonne réponse était : &quot;
                            {q.opts[q.ok]}&quot;. <br /> {q.expl}
                          </>
                        )}
                      </div>
                    )}
                    {selected !== null && (
                      <button className="btn small" onClick={next}>
                        {idx + 1 >= questions.length
                          ? "Terminer le quiz →"
                          : "Suivant →"}
                      </button>
                    )}
                  </>
                );
              })()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

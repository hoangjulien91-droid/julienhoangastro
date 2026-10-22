"use client";

import { useState } from "react";
import { CLOZE } from "@/lib/pst/data/pst123";
import {
  playReviewSound,
  playSuccessSound,
  playClickSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { PenLine, CheckCircle2, RotateCcw, Eye, Check } from "lucide-react";

function norm(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function Cloze() {
  const [answers, setAnswers] = useState<
    Record<number, { value: string; checked: boolean }>
  >({});

  function setValue(idx: number, value: string) {
    setAnswers((prev) => ({
      ...prev,
      [idx]: { value, checked: prev[idx]?.checked ?? false },
    }));
  }

  function check(idx: number) {
    const curVal = answers[idx]?.value ?? "";
    const target = CLOZE[idx]?.ans ?? "";
    const isOk = norm(curVal) === norm(target);
    if (isOk) {
      playSuccessSound();
      triggerHaptic("success");
    } else {
      playReviewSound();
      triggerHaptic("error");
    }
    setAnswers((prev) => ({
      ...prev,
      [idx]: { value: curVal, checked: true },
    }));
  }

  function reveal(idx: number) {
    playClickSound();
    triggerHaptic("selection");
    const target = CLOZE[idx]?.ans ?? "";
    setAnswers((prev) => ({
      ...prev,
      [idx]: { value: target, checked: true },
    }));
  }

  const total = CLOZE.length;
  const checkedCount = Object.values(answers).filter((a) => a.checked).length;
  const correctCount = CLOZE.reduce((acc, c, idx) => {
    const st = answers[idx];
    if (!st?.checked) return acc;
    return norm(st.value) === norm(c.ans) ? acc + 1 : acc;
  }, 0);
  const pct = total > 0 ? Math.round((checkedCount * 100) / total) : 0;
  const pctAcc =
    checkedCount > 0 ? Math.round((correctCount * 100) / checkedCount) : 0;

  return (
    <div className="space-y-4">
      <p className="hint">
        Complète les citations à trous avec le terme exact attendu (appuie sur{" "}
        <b>Entrée</b> pour valider).
      </p>

      {/* Sticky Progress Header */}
      <div className="sticky top-14 z-20 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
              <PenLine className="size-3 text-indigo-600 dark:text-indigo-400" />
              <span>
                Progression : {checkedCount} / {total} ({pct}%)
              </span>
            </span>

            {checkedCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="size-3 text-emerald-600" />
                <span>
                  Score : {correctCount}/{checkedCount} ({pctAcc}%)
                </span>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              triggerHaptic("selection");
              setAnswers({});
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
          >
            <RotateCcw className="size-3" />
            <span>Réinitialiser</span>
          </button>
        </div>

        {/* Minimal Progress Bar */}
        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Cloze Cards */}
      <div id="clozeHost" className="space-y-4">
        {CLOZE.map((c, idx) => {
          const state = answers[idx] ?? { value: "", checked: false };
          const isOk = norm(state.value) === norm(c.ans);
          const parts = c.text.split(`[${c.ans}]`);

          return (
            <div
              key={idx}
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3.5"
            >
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
                  <PenLine className="size-3 text-indigo-600 dark:text-indigo-400" />
                  <span>
                    Citation #{idx + 1} / {CLOZE.length}
                  </span>
                </span>
              </div>

              {/* Text with inline input */}
              <div className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-medium">
                {parts[0]}
                <input
                  type="text"
                  disabled={state.checked}
                  value={state.value}
                  placeholder="..."
                  onChange={(e) => setValue(idx, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !state.checked) {
                      e.preventDefault();
                      check(idx);
                    }
                  }}
                  className={`inline-block mx-1.5 px-2.5 py-1 rounded-xl text-center font-mono text-xs font-bold transition-all border outline-hidden ${
                    state.checked
                      ? isOk
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-400 dark:border-emerald-700 shadow-2xs"
                        : "bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-400 dark:border-rose-700 shadow-2xs"
                      : "bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                  }`}
                  style={{
                    width: `${Math.max(100, (state.value.length || 6) * 11)}px`,
                  }}
                />
                {parts[1]}
              </div>

              {!state.checked && (
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => check(idx)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer active:scale-95"
                  >
                    <Check className="size-3" />
                    <span>Vérifier</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => reveal(idx)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
                  >
                    <Eye className="size-3" />
                    <span>Révéler</span>
                  </button>
                </div>
              )}

              {state.checked && (
                <div
                  className={`p-3 rounded-xl border text-xs sm:text-sm leading-relaxed animate-fadeIn ${
                    isOk
                      ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200"
                      : "bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200"
                  }`}
                >
                  <div className="font-bold mb-0.5">
                    {isOk ? "✓ Correct !" : "✗ Incorrect."}
                  </div>
                  <div>
                    {c.expl}
                    {!isOk && (
                      <span className="block mt-1 font-mono font-bold text-slate-900 dark:text-slate-100">
                        Terme attendu : « {c.ans} »
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

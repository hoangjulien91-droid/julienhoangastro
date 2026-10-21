"use client";

import { useState } from "react";
import {
  Briefcase,
  CheckCircle2,
  RotateCcw,
  ListFilter,
  Target,
  BookmarkPlus,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  AlertCircle,
} from "lucide-react";
import type { CaseItem } from "@/lib/pst/types";
import {
  playClickSound,
  playReviewSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface CaseAnswers {
  q1: number | null;
  q2: number | null;
}

interface CasProps {
  data: CaseItem[];
  hint: string;
}

const JOURNAL_STORAGE_KEY = "pst_field_journal_v1";

export function Cas({ data, hint }: CasProps) {
  const [answers, setAnswers] = useState<CaseAnswers[]>(() =>
    data.map(() => ({ q1: null, q2: null })),
  );
  const [mode, setMode] = useState<"list" | "focus">("list");
  const [focusIdx, setFocusIdx] = useState(0);
  const [exportedIdx, setExportedIdx] = useState<number | null>(null);

  function answer(caseIdx: number, question: "q1" | "q2", optIdx: number) {
    const c = data[caseIdx];
    if (!c) return;
    const isOk = !!c[question].options[optIdx]?.ok;
    if (isOk) {
      playSuccessSound();
      triggerHaptic("success");
    } else {
      playReviewSound();
      triggerHaptic("error");
    }

    setAnswers((prev) => {
      const next = prev.slice();
      const cur = next[caseIdx];
      if (!cur || cur[question] !== null) return prev;
      next[caseIdx] = { ...cur, [question]: optIdx };
      return next;
    });
  }

  function exportCaseToJournal(c: CaseItem, idx: number) {
    try {
      const raw = window.localStorage.getItem(JOURNAL_STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      const ok1 = c.q1.options.find((o) => o.ok);
      const ok2 = c.q2.options.find((o) => o.ok);
      const entry = {
        id: `cas-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        context: `Vignette clinique #${idx + 1}`,
        ue: "PST106",
        observation: c.vignette,
        concept: ok1 ? ok1.label : c.q1.prompt,
        posture: ok2 ? `${ok2.label} — ${ok2.fb}` : c.q2.prompt,
      };
      const next = Array.isArray(list) ? [entry, ...list] : [entry];
      window.localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      playSuccessSound();
      triggerHaptic("success");
      setExportedIdx(idx);
      setTimeout(() => setExportedIdx(null), 1800);
    } catch {
      // ignore
    }
  }

  const totalQuestions = data.length * 2;
  let answeredQuestions = 0;
  let correctQuestions = 0;
  answers.forEach((ans, idx) => {
    const c = data[idx];
    if (!c) return;
    if (ans.q1 !== null) {
      answeredQuestions++;
      if (c.q1.options[ans.q1]?.ok) correctQuestions++;
    }
    if (ans.q2 !== null) {
      answeredQuestions++;
      if (c.q2.options[ans.q2]?.ok) correctQuestions++;
    }
  });

  const pct =
    totalQuestions > 0
      ? Math.round((answeredQuestions * 100) / totalQuestions)
      : 0;
  const pctAcc =
    answeredQuestions > 0
      ? Math.round((correctQuestions * 100) / answeredQuestions)
      : 0;

  function renderCaseCard(c: CaseItem, idx: number) {
    const ans = answers[idx] ?? { q1: null, q2: null };
    const q1Answered = ans.q1 !== null;
    const q2Answered = ans.q2 !== null;

    return (
      <div
        key={idx}
        className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
            <Briefcase className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Vignette Clinique #{idx + 1} / {data.length}</span>
          </span>

          <button
            type="button"
            onClick={() => exportCaseToJournal(c, idx)}
            title="Archiver cette vignette clinique et sa résolution dans le Carnet de Terrain"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
          >
            <BookmarkPlus className="size-3 text-slate-500" />
            <span>{exportedIdx === idx ? "✓ Archivé" : "Carnet Terrain"}</span>
          </button>
        </div>

        {/* Clinical Vignette Quote */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
          <p className="text-xs sm:text-sm italic leading-relaxed text-slate-800 dark:text-slate-200 m-0 font-medium">
            « {c.vignette} »
          </p>
        </div>

        {/* Question 1: Concept clinique */}
        <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/70 dark:border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
              Question 1
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
              {c.q1.prompt}
            </span>
          </div>

          <div className="space-y-2">
            {c.q1.options.map((opt, oIdx) => {
              const isChosen = ans.q1 === oIdx;
              let btnCls = "bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-200";

              if (q1Answered) {
                if (opt.ok) {
                  btnCls = "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-semibold";
                } else if (isChosen) {
                  btnCls = "bg-rose-50/80 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200";
                } else {
                  btnCls = "opacity-50 bg-white/40 dark:bg-slate-900/30 border-slate-200/50 text-slate-500 dark:text-slate-500";
                }
              }

              return (
                <button
                  key={oIdx}
                  disabled={q1Answered}
                  onClick={() => answer(idx, "q1", oIdx)}
                  className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all cursor-pointer flex items-start gap-2.5 active:scale-99 ${btnCls}`}
                >
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 shrink-0 mt-0.5">
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="flex-1">{opt.label}</span>
                </button>
              );
            })}
          </div>

          {q1Answered && ans.q1 !== null && (
            <div
              className={`p-3 rounded-xl text-xs sm:text-sm leading-relaxed border ${
                c.q1.options[ans.q1]?.ok
                  ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200"
                  : "bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200"
              }`}
              dangerouslySetInnerHTML={{
                __html: c.q1.options[ans.q1]?.fb ?? "",
              }}
            />
          )}
        </div>

        {/* Question 2: Posture clinique */}
        {q1Answered && (
          <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/70 dark:border-slate-800/80 space-y-3 animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                Question 2
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                {c.q2.prompt}
              </span>
            </div>

            <div className="space-y-2">
              {c.q2.options.map((opt, oIdx) => {
                const isChosen = ans.q2 === oIdx;
                let btnCls = "bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-200";

                if (q2Answered) {
                  if (opt.ok) {
                    btnCls = "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-semibold";
                  } else if (isChosen) {
                    btnCls = "bg-rose-50/80 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200";
                  } else {
                    btnCls = "opacity-50 bg-white/40 dark:bg-slate-900/30 border-slate-200/50 text-slate-500 dark:text-slate-500";
                  }
                }

                return (
                  <button
                    key={oIdx}
                    disabled={q2Answered}
                    onClick={() => answer(idx, "q2", oIdx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all cursor-pointer flex items-start gap-2.5 active:scale-99 ${btnCls}`}
                  >
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 shrink-0 mt-0.5">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span className="flex-1">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {q2Answered && ans.q2 !== null && (
              <div
                className={`p-3 rounded-xl text-xs sm:text-sm leading-relaxed border ${
                  c.q2.options[ans.q2]?.ok
                    ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200"
                    : "bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200"
                }`}
                dangerouslySetInnerHTML={{
                  __html: c.q2.options[ans.q2]?.fb ?? "",
                }}
              />
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {hint && <p className="hint">{hint}</p>}

      {/* Sticky Progress & Mode Header */}
      <div className="sticky top-14 z-20 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
              <Target className="size-3 text-indigo-600 dark:text-indigo-400" />
              <span>Étapes : {answeredQuestions} / {totalQuestions} ({pct}%)</span>
            </span>

            {answeredQuestions > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="size-3 text-emerald-600" />
                <span>Diagnostic : {correctQuestions}/{answeredQuestions} ({pctAcc}%)</span>
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
              Vue Liste ({data.length})
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

            <button
              type="button"
              onClick={() => {
                playClickSound();
                triggerHaptic("selection");
                setAnswers(data.map(() => ({ q1: null, q2: null })));
                setFocusIdx(0);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw className="size-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {mode === "focus" ? (
        <div className="space-y-4">
          {data[focusIdx] && renderCaseCard(data[focusIdx]!, focusIdx)}

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
              <span>Précédente</span>
            </button>

            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
              {focusIdx + 1} / {data.length}
            </span>

            <button
              type="button"
              disabled={focusIdx >= data.length - 1}
              onClick={() => {
                playClickSound();
                triggerHaptic("selection");
                setFocusIdx((i) => Math.min(data.length - 1, i + 1));
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <span>Suivante</span>
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div id="casHost" className="space-y-4">
          {data.map((c, idx) => renderCaseCard(c, idx))}
        </div>
      )}
    </div>
  );
}

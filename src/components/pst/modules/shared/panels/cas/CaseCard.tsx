"use client";

import { Briefcase, BookmarkPlus } from "lucide-react";
import type { CaseItem } from "@/lib/pst/types";
import type { CaseAnswers } from "@/lib/pst/data/cas-cliniques-data";

interface CaseCardProps {
  c: CaseItem;
  idx: number;
  totalCases: number;
  ans: CaseAnswers;
  onAnswer: (question: "q1" | "q2", optIdx: number) => void;
  onExport: () => void;
  isExported: boolean;
}

export function CaseCard({
  c,
  idx,
  totalCases,
  ans,
  onAnswer,
  onExport,
  isExported,
}: CaseCardProps) {
  const q1Answered = ans.q1 !== null;
  const q2Answered = ans.q2 !== null;

  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
          <Briefcase className="size-3 text-indigo-600 dark:text-indigo-400" />
          <span>
            Vignette Clinique #{idx + 1} / {totalCases}
          </span>
        </span>

        <button
          type="button"
          onClick={onExport}
          title="Archiver cette vignette clinique et sa résolution dans le Carnet de Terrain"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
        >
          <BookmarkPlus className="size-3 text-slate-500" />
          <span>{isExported ? "✓ Archivé" : "Carnet Terrain"}</span>
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
            let btnCls =
              "bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-200";

            if (q1Answered) {
              if (opt.ok) {
                btnCls =
                  "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-semibold";
              } else if (isChosen) {
                btnCls =
                  "bg-rose-50/80 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200";
              } else {
                btnCls =
                  "opacity-50 bg-white/40 dark:bg-slate-900/30 border-slate-200/50 text-slate-500 dark:text-slate-500";
              }
            }

            return (
              <button
                key={oIdx}
                type="button"
                disabled={q1Answered}
                onClick={() => onAnswer("q1", oIdx)}
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
              let btnCls =
                "bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-200";

              if (q2Answered) {
                if (opt.ok) {
                  btnCls =
                    "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-semibold";
                } else if (isChosen) {
                  btnCls =
                    "bg-rose-50/80 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200";
                } else {
                  btnCls =
                    "opacity-50 bg-white/40 dark:bg-slate-900/30 border-slate-200/50 text-slate-500 dark:text-slate-500";
                }
              }

              return (
                <button
                  key={oIdx}
                  type="button"
                  disabled={q2Answered}
                  onClick={() => onAnswer("q2", oIdx)}
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

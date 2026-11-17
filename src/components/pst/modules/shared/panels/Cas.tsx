"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { CaseItem } from "@/lib/pst/types";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";
import { CaseCard } from "./cas/CaseCard";
import { CasMethode3TempsView } from "./cas/CasMethode3TempsView";
import { useCasState } from "./cas/useCasState";
import { CasToolbar } from "./cas/CasToolbar";

interface CasProps {
  data: CaseItem[];
  hint: string;
}

export function Cas({ data, hint }: CasProps) {
  const {
    answers,
    mode,
    setMode,
    focusIdx,
    setFocusIdx,
    exportedIdx,
    methodeVignetteIdx,
    setMethodeVignetteIdx,
    methodeNotes,
    checkedCriteria,
    copiedMethode,
    updateMethodeNote,
    toggleCriterion,
    handleResetCriteria,
    handleCopyMethode,
    handleAnswer,
    exportCaseToJournal,
    resetAllAnswers,
    totalQuestions,
    answeredQuestions,
    correctQuestions,
    pct,
    pctAcc,
  } = useCasState(data);

  return (
    <div className="space-y-4">
      {hint && <p className="hint">{hint}</p>}

      {/* Sticky Progress & Mode Header */}
      <CasToolbar
        answeredQuestions={answeredQuestions}
        totalQuestions={totalQuestions}
        pct={pct}
        correctQuestions={correctQuestions}
        pctAcc={pctAcc}
        mode={mode}
        onSetMode={setMode}
        casesCount={data.length}
        onReset={resetAllAnswers}
      />

      {mode === "methode" ? (
        <CasMethode3TempsView
          data={data}
          methodeVignetteIdx={methodeVignetteIdx}
          onSelectVignette={setMethodeVignetteIdx}
          methodeNotes={methodeNotes}
          onUpdateNote={updateMethodeNote}
          checkedCriteria={checkedCriteria}
          onToggleCriterion={toggleCriterion}
          onResetCriteria={handleResetCriteria}
          onCopyMethode={handleCopyMethode}
          copiedMethode={copiedMethode}
        />
      ) : mode === "focus" ? (
        <div className="space-y-4">
          {data[focusIdx] && (
            <CaseCard
              c={data[focusIdx]!}
              idx={focusIdx}
              totalCases={data.length}
              ans={answers[focusIdx] ?? { q1: null, q2: null }}
              onAnswer={(q, opt) => handleAnswer(focusIdx, q, opt)}
              onExport={() => exportCaseToJournal(data[focusIdx]!, focusIdx)}
              isExported={exportedIdx === focusIdx}
            />
          )}

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
          {data.map((c, idx) => (
            <CaseCard
              key={idx}
              c={c}
              idx={idx}
              totalCases={data.length}
              ans={answers[idx] ?? { q1: null, q2: null }}
              onAnswer={(q, opt) => handleAnswer(idx, q, opt)}
              onExport={() => exportCaseToJournal(c, idx)}
              isExported={exportedIdx === idx}
            />
          ))}
        </div>
      )}
    </div>
  );
}

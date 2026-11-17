"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CheckCircle2,
  RotateCcw,
  Target,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import type { CaseItem } from "@/lib/pst/types";
import {
  playClickSound,
  playReviewSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { toast } from "sonner";
import {
  type CaseAnswers,
  type MethodeStepNotes,
  METHODE_CRITERIA,
  METHODE_NOTES_KEY,
  METHODE_CRITERIA_KEY,
  exportCaseToJournalHelper,
} from "@/lib/pst/data/cas-cliniques-data";
import { CaseCard } from "./cas/CaseCard";
import { CasMethode3TempsView } from "./cas/CasMethode3TempsView";

interface CasProps {
  data: CaseItem[];
  hint: string;
}

export function Cas({ data, hint }: CasProps) {
  const [answers, setAnswers] = useState<CaseAnswers[]>(() =>
    data.map(() => ({ q1: null, q2: null })),
  );
  const [mode, setMode] = useState<"list" | "focus" | "methode">("list");
  const [focusIdx, setFocusIdx] = useState(0);
  const [exportedIdx, setExportedIdx] = useState<number | null>(null);

  // Méthodologie en 3 temps (Cnam)
  const [methodeVignetteIdx, setMethodeVignetteIdx] = useState(0);
  const [methodeNotes, setMethodeNotes] = useState<Record<number, MethodeStepNotes>>({});
  const [checkedCriteria, setCheckedCriteria] = useState<boolean[]>(() =>
    METHODE_CRITERIA.map(() => false),
  );
  const [copiedMethode, setCopiedMethode] = useState(false);

  useEffect(() => {
    try {
      const rawNotes = localStorage.getItem(METHODE_NOTES_KEY);
      if (rawNotes) {
        const parsed = JSON.parse(rawNotes);
        if (parsed && typeof parsed === "object") setMethodeNotes(parsed);
      }
      const rawCriteria = localStorage.getItem(METHODE_CRITERIA_KEY);
      if (rawCriteria) {
        const parsed = JSON.parse(rawCriteria);
        if (Array.isArray(parsed) && parsed.length === METHODE_CRITERIA.length) {
          setCheckedCriteria(parsed);
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  function updateMethodeNote(step: "temps1" | "temps2" | "temps3", value: string) {
    const cur = methodeNotes[methodeVignetteIdx] ?? { temps1: "", temps2: "", temps3: "" };
    const next = {
      ...methodeNotes,
      [methodeVignetteIdx]: { ...cur, [step]: value },
    };
    setMethodeNotes(next);
    try {
      localStorage.setItem(METHODE_NOTES_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  function toggleCriterion(idx: number) {
    setCheckedCriteria((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      if (next[idx]) {
        playSuccessSound();
        triggerHaptic("success");
      } else {
        playClickSound();
        triggerHaptic("selection");
      }
      try {
        localStorage.setItem(METHODE_CRITERIA_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function handleResetCriteria() {
    playClickSound();
    triggerHaptic("selection");
    const empty = METHODE_CRITERIA.map(() => false);
    setCheckedCriteria(empty);
    try {
      localStorage.setItem(METHODE_CRITERIA_KEY, JSON.stringify(empty));
    } catch {
      /* ignore */
    }
  }

  function handleCopyMethode() {
    const v = data[methodeVignetteIdx];
    const n = methodeNotes[methodeVignetteIdx] ?? { temps1: "", temps2: "", temps3: "" };
    const validCount = checkedCriteria.filter(Boolean).length;

    const fullText = `ANALYSE DE CAS CLINIQUE — MÉTHODOLOGIE CNAM EN 3 TEMPS (/20)
${v ? `Vignette #${methodeVignetteIdx + 1} : « ${v.vignette} »` : "Cas clinique"}

1. TEMPS 1 : DIAGNOSTIC CLINIQUE DES FAITS & RECUEIL DU TRAVAIL RÉEL (6 pts)
${n.temps1.trim() || "[Non renseigné]"}

2. TEMPS 2 : MODÉLISATION THÉORIQUE ANTI-PSYCHOLOGISME (8 pts)
${n.temps2.trim() || "[Non renseigné]"}

3. TEMPS 3 : PRÉCONISATIONS D'INTERVENTION & POSTURE DÉONTOLOGIQUE (6 pts)
${n.temps3.trim() || "[Non renseigné]"}

AUTO-ÉVALUATION CNAM :
${validCount} / ${METHODE_CRITERIA.length} critères d'excellence validés (${Math.round((validCount / METHODE_CRITERIA.length) * 20)}/20)`;

    navigator.clipboard.writeText(fullText);
    playSuccessSound();
    triggerHaptic("success");
    setCopiedMethode(true);
    toast.success("Analyse clinique en 3 temps copiée au presse-papier !");
    setTimeout(() => setCopiedMethode(false), 2000);
  }

  const handleAnswer = useCallback((caseIdx: number, question: "q1" | "q2", optIdx: number) => {
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
  }, [data]);

  const exportCaseToJournal = useCallback((c: CaseItem, idx: number) => {
    const success = exportCaseToJournalHelper(c, idx, "PST106");
    if (success) {
      playSuccessSound();
      triggerHaptic("success");
      setExportedIdx(idx);
      setTimeout(() => setExportedIdx(null), 1800);
    }
  }, []);

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

  return (
    <div className="space-y-4">
      {hint && <p className="hint">{hint}</p>}

      {/* Sticky Progress & Mode Header */}
      <div className="sticky top-14 z-20 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
              <Target className="size-3 text-indigo-600 dark:text-indigo-400" />
              <span>
                Étapes : {answeredQuestions} / {totalQuestions} ({pct}%)
              </span>
            </span>

            {answeredQuestions > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="size-3 text-emerald-600" />
                <span>
                  Diagnostic : {correctQuestions}/{answeredQuestions} ({pctAcc}
                  %)
                </span>
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
                setMode("methode");
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 ${
                mode === "methode"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/60"
              }`}
            >
              <GraduationCap className="size-3" />
              <span>Méthode 3 Temps (/20)</span>
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

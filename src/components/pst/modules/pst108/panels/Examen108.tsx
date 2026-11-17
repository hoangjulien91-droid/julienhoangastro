"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  Award,
  BookOpen,
  Check,
  Copy,
  Eye,
  EyeOff,
  FileText,
} from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import {
  ANNALES_PST108,
  PST108_PROF_EXAMS,
  type AnnalePst108Item,
  type Pst108ProfId,
} from "@/lib/pst/data/pst108-annales";
import {
  PART_SECONDS,
  PROF_ORDER,
} from "@/lib/pst/data/pst108-examen-data";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { Examen108OverviewHeader } from "./examen/Examen108OverviewHeader";
import { Examen108SubjectCard } from "./examen/Examen108SubjectCard";
import { Examen108SelfEvalRubric } from "./examen/Examen108SelfEvalRubric";
import { Examen108ModelAnswer } from "./examen/Examen108ModelAnswer";

export interface Examen108Props {
  store: PstStore;
  onStoreChange: () => void;
  initialProf?: Pst108ProfId;
}

export function Examen108({
  store,
  onStoreChange,
  initialProf,
}: Examen108Props) {
  const [activeProf, setActiveProf] = useState<Pst108ProfId>(
    initialProf ?? "lucy",
  );
  const [fullExamMode, setFullExamMode] = useState(false);

  // Sync si un autre onglet (ex: CoursPst108) demande un prof précis
  useEffect(() => {
    if (initialProf) {
      setActiveProf(initialProf);
    }
  }, [initialProf]);

  const subjectsByProf = useMemo(() => {
    return {
      lucy: ANNALES_PST108.filter((a) => a.prof === "lucy"),
      valls: ANNALES_PST108.filter((a) => a.prof === "valls"),
      marot: ANNALES_PST108.filter((a) => a.prof === "marot"),
    };
  }, []);

  const [subjectIdxByProf, setSubjectIdxByProf] = useState<
    Record<Pst108ProfId, number>
  >({
    lucy: 0,
    valls: 0,
    marot: 0,
  });

  const [elapsedByProf, setElapsedByProf] = useState<
    Record<Pst108ProfId, number>
  >({
    lucy: 0,
    valls: 0,
    marot: 0,
  });

  const [running, setRunning] = useState(false);
  const [finishedByProf, setFinishedByProf] = useState<
    Record<Pst108ProfId, boolean>
  >({
    lucy: false,
    valls: false,
    marot: false,
  });

  const [checkedByProf, setCheckedByProf] = useState<
    Record<Pst108ProfId, number[]>
  >({
    lucy: [],
    valls: [],
    marot: [],
  });

  const [recordedScores, setRecordedScores] = useState<
    Record<Pst108ProfId, number | null>
  >({
    lucy: null,
    valls: null,
    marot: null,
  });

  const [showPlan, setShowPlan] = useState(false);
  const [showCorrige, setShowCorrige] = useState(false);
  const [copied, setCopied] = useState(false);

  const profSubjects = subjectsByProf[activeProf];
  const currentSubjectIdx = subjectIdxByProf[activeProf] % profSubjects.length;
  const activeSubject: AnnalePst108Item =
    profSubjects[currentSubjectIdx] ?? profSubjects[0];

  const draftKey = `exam108_${activeProf}_${activeSubject.id}`;
  const [draft, setDraft] = useState<string>(() =>
    String(store.getMarks()[draftKey] ?? ""),
  );
  const draftTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDraft(String(store.getMarks()[draftKey] ?? ""));
  }, [draftKey, store]);

  function handleDraftChange(val: string) {
    setDraft(val);
    if (draftTimerRef.current) clearTimeout(draftTimerRef.current);
    draftTimerRef.current = setTimeout(() => {
      store.setMark(draftKey, val);
    }, 250);
  }

  useEffect(() => {
    return () => {
      if (draftTimerRef.current) clearTimeout(draftTimerRef.current);
    };
  }, []);

  // Chronomètre 1h00 par professeur actif
  useEffect(() => {
    if (!running || finishedByProf[activeProf]) return;
    const iv = setInterval(() => {
      setElapsedByProf((prev) => ({
        ...prev,
        [activeProf]: prev[activeProf] + 1,
      }));
    }, 1000);
    return () => clearInterval(iv);
  }, [running, activeProf, finishedByProf]);

  const selectProf = useCallback((prof: Pst108ProfId) => {
    playClickSound();
    triggerHaptic("selection");
    setActiveProf(prof);
    setShowPlan(false);
    setShowCorrige(false);
  }, []);

  const selectSubject = useCallback((idx: number) => {
    playClickSound();
    triggerHaptic("selection");
    setSubjectIdxByProf((prev) => ({ ...prev, [activeProf]: idx }));
    setElapsedByProf((prev) => ({ ...prev, [activeProf]: 0 }));
    setFinishedByProf((prev) => ({ ...prev, [activeProf]: false }));
    setCheckedByProf((prev) => ({ ...prev, [activeProf]: [] }));
    setRecordedScores((prev) => ({ ...prev, [activeProf]: null }));
    setShowPlan(false);
    setShowCorrige(false);
  }, [activeProf]);

  const drawRandomSubject = useCallback(() => {
    if (profSubjects.length <= 1) return;
    const nextIdx = (currentSubjectIdx + 1) % profSubjects.length;
    selectSubject(nextIdx);
  }, [profSubjects.length, currentSubjectIdx, selectSubject]);

  function toggleFinishCurrentProf() {
    if (finishedByProf[activeProf]) {
      playClickSound();
      setFinishedByProf((prev) => ({ ...prev, [activeProf]: false }));
      return;
    }
    playSuccessSound();
    triggerHaptic("success");
    setRunning(false);
    setFinishedByProf((prev) => ({ ...prev, [activeProf]: true }));
    setShowPlan(true);
  }

  function resetCurrentProfTimer() {
    playClickSound();
    setRunning(false);
    setElapsedByProf((prev) => ({ ...prev, [activeProf]: 0 }));
    setFinishedByProf((prev) => ({ ...prev, [activeProf]: false }));
  }

  function toggleCriterion(idx: number) {
    playClickSound();
    triggerHaptic("selection");
    setCheckedByProf((prev) => {
      const current = prev[activeProf];
      const next = current.includes(idx)
        ? current.filter((i) => i !== idx)
        : [...current, idx];
      return { ...prev, [activeProf]: next };
    });
  }

  function validateSelfEval() {
    const score = checkedByProf[activeProf].length;
    const total = activeSubject.criteres.length;
    playSuccessSound();
    triggerHaptic("success");
    store.recordScore(`examen_${activeProf}`, score, total);
    store.recordScore("examen", score, total);
    onStoreChange();
    const note20 = Math.round((score / Math.max(1, total)) * 20);
    setRecordedScores((prev) => ({ ...prev, [activeProf]: note20 }));
  }

  function copyDraft() {
    if (!draft.trim()) return;
    navigator.clipboard.writeText(draft);
    setCopied(true);
    playSuccessSound();
    setTimeout(() => setCopied(false), 1800);
  }

  const goNextProf = useCallback(() => {
    const idx = PROF_ORDER.indexOf(activeProf);
    const nextProf = PROF_ORDER[(idx + 1) % PROF_ORDER.length];
    selectProf(nextProf);
    if (fullExamMode && !finishedByProf[nextProf]) {
      setRunning(true);
    }
  }, [activeProf, fullExamMode, finishedByProf, selectProf]);

  const profMeta = PST108_PROF_EXAMS[activeProf];
  const activeElapsed = elapsedByProf[activeProf];
  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  const checkedSet = new Set(checkedByProf[activeProf]);
  const noteEstimee = Math.round(
    (checkedSet.size / Math.max(1, activeSubject.criteres.length)) * 20,
  );

  return (
    <div className="space-y-6">
      {/* ── EN-TÊTE ARCHITECTURE 3H00 = 3 × 1H00 ─────────────────────────── */}
      <Examen108OverviewHeader
        activeProf={activeProf}
        onSelectProf={selectProf}
        fullExamMode={fullExamMode}
        onToggleFullExamMode={() => setFullExamMode((m) => !m)}
        elapsedByProf={elapsedByProf}
        finishedByProf={finishedByProf}
        recordedScores={recordedScores}
        subjectsByProf={subjectsByProf}
        onGoNextProf={goNextProf}
      />

      {/* ── FICHE DE CETTE SOUS-ÉPREUVE 1H00 ──────────────────────────────── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
        <Examen108SubjectCard
          activeProf={activeProf}
          activeSubject={activeSubject}
          profSubjects={profSubjects}
          currentSubjectIdx={currentSubjectIdx}
          onSelectSubject={selectSubject}
          onDrawRandomSubject={drawRandomSubject}
          running={running}
          onToggleRunning={() => setRunning((r) => !r)}
          onResetTimer={resetCurrentProfTimer}
          activeElapsed={activeElapsed}
          finished={finishedByProf[activeProf]}
          hasSavedDraft={(subjId) =>
            Boolean(String(store.getMarks()[`exam108_${activeProf}_${subjId}`] ?? "").trim())
          }
        />

        {/* ZONE DE RÉDACTION 1H00 */}
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor="exam108-draft-box"
              className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5"
            >
              <FileText className="size-3.5 text-indigo-500" />
              <span>Copie d&apos;examen ({profMeta.nom} · 1h00)</span>
            </label>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-slate-500 dark:text-slate-400">
                <b>{wordCount}</b> mots (repère 1h00 : ~450–650 mots)
              </span>
              {draft.trim() && (
                <button
                  type="button"
                  onClick={copyDraft}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="size-3 text-emerald-500" />
                      <span>Copié</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <textarea
            id="exam108-draft-box"
            rows={10}
            value={draft}
            onChange={(e) => handleDraftChange(e.target.value)}
            placeholder={`Rédigez votre réponse de 1h00 pour ${profMeta.nom} (Introduction courte avec problématique + Plan en 2 parties avec définitions rigoureuses, auteurs justifiés et exemple clinique du travail réel)...`}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 p-4 text-sm text-slate-900 dark:text-slate-100 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          />

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setShowPlan((v) => !v);
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="size-3.5" />
                <span>{showPlan ? "Masquer le plan" : "Voir plan conseillé (1h00)"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setShowCorrige((v) => !v);
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 cursor-pointer"
              >
                {showCorrige ? (
                  <>
                    <EyeOff className="size-3.5" />
                    <span>Masquer le corrigé modèle</span>
                  </>
                ) : (
                  <>
                    <Eye className="size-3.5" />
                    <span>Corrigé d&apos;excellence (18+/20)</span>
                  </>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={toggleFinishCurrentProf}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
                finishedByProf[activeProf]
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90"
              }`}
            >
              <Award className="size-4" />
              <span>
                {finishedByProf[activeProf]
                  ? "Reprendre cette sous-épreuve"
                  : `Terminer & Auto-évaluer (${profMeta.nom})`}
              </span>
            </button>
          </div>
        </div>

        {/* PLAN CONSEILLÉ */}
        {showPlan && (
          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/25 border border-indigo-500/25 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300">
              Plan conseillé pour 1h00 · {profMeta.nom}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeSubject.planConseille.map((p, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200/70 dark:border-indigo-900/60 space-y-1"
                >
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {p.partie}
                  </div>
                  <ul className="m-0 pl-4 space-y-0.5 text-xs text-slate-600 dark:text-slate-300">
                    {p.sousParties.map((sp, j) => (
                      <li key={j}>{sp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GRILLE D'AUTO-ÉVALUATION APRÈS FIN OU SUR DEMANDE */}
        {finishedByProf[activeProf] && (
          <Examen108SelfEvalRubric
            profName={profMeta.nom}
            criteria={activeSubject.criteres}
            checkedIndices={checkedByProf[activeProf]}
            onToggleCriterion={toggleCriterion}
            noteEstimee={noteEstimee}
            onValidateScore={validateSelfEval}
            onGoNextProf={goNextProf}
          />
        )}

        {/* CORRIGÉ MODÈLE DÉTAILLÉ */}
        {showCorrige && (
          <Examen108ModelAnswer
            profName={profMeta.nom}
            conceptsCles={activeSubject.conceptsCles}
            corrigeExcellence={activeSubject.corrigeExcellence}
            piegesAEviter={activeSubject.piegesAEviter}
          />
        )}
      </div>
    </div>
  );
}

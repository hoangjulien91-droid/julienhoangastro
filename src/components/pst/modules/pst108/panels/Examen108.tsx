"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import type { PstStore } from "@/lib/pst/store";
import {
  ANNALES_PST108,
  PST108_PROF_EXAMS,
  type AnnalePst108Item,
  type Pst108ProfId,
} from "@/lib/pst/data/pst108-annales";
import { PROF_ORDER } from "@/lib/pst/data/pst108-examen-data";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { Examen108OverviewHeader } from "./examen/Examen108OverviewHeader";
import { Examen108SubjectCard } from "./examen/Examen108SubjectCard";
import { Examen108SelfEvalRubric } from "./examen/Examen108SelfEvalRubric";
import { Examen108ModelAnswer } from "./examen/Examen108ModelAnswer";
import { Examen108DraftArea } from "./examen/Examen108DraftArea";

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
        <Examen108DraftArea
          profName={profMeta.nom}
          activeSubject={activeSubject}
          draft={draft}
          wordCount={wordCount}
          copied={copied}
          showPlan={showPlan}
          showCorrige={showCorrige}
          finished={finishedByProf[activeProf]}
          onDraftChange={handleDraftChange}
          onCopyDraft={copyDraft}
          onTogglePlan={() => setShowPlan((v) => !v)}
          onToggleCorrige={() => setShowCorrige((v) => !v)}
          onToggleFinish={toggleFinishCurrentProf}
        />

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

"use client";

import { useState, useEffect, useCallback } from "react";
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

export function useCasState(data: CaseItem[]) {
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

  function resetAllAnswers() {
    playClickSound();
    triggerHaptic("selection");
    setAnswers(data.map(() => ({ q1: null, q2: null })));
    setFocusIdx(0);
  }

  return {
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
  };
}

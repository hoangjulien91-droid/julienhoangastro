"use client";

import { useState, useEffect } from "react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  type JuryRole,
  JURY_QUESTIONS,
  RNCP_CRITERIA,
  STORAGE_KEY,
  EVAL_STORAGE_KEY,
  PHASE_1_SECONDS,
  PHASE_2_SECONDS,
  DEFAULT_SCORES,
  getScoreVerdict,
} from "@/lib/pst/data/oral-defense-data";

export function useOralDefenseState(isOpen: boolean) {
  const [viewMode, setViewMode] = useState<"questions" | "grille">("questions");
  const [phase, setPhase] = useState<"expose" | "jury">("expose");
  const [secondsLeft, setSecondsLeft] = useState(PHASE_1_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [roleFilter, setRoleFilter] = useState<"ALL" | JuryRole>("ALL");
  const [selectedId, setSelectedId] = useState<string>(JURY_QUESTIONS[0].id);
  const [masteredMap, setMasteredMap] = useState<Record<string, boolean>>({});
  const [evalScores, setEvalScores] =
    useState<Record<string, number>>(DEFAULT_SCORES);
  const [showAnswer, setShowAnswer] = useState(true);
  const [mobileTab, setMobileTab] = useState<"list" | "detail">("list");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          setMasteredMap(parsed);
        }
      }
      const rawEval = localStorage.getItem(EVAL_STORAGE_KEY);
      if (rawEval) {
        const parsedEval = JSON.parse(rawEval);
        if (parsedEval && typeof parsedEval === "object") {
          setEvalScores(parsedEval);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          playSuccessSound();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning]);

  const switchPhase = (nextPhase: "expose" | "jury") => {
    playClickSound();
    setIsRunning(false);
    setPhase(nextPhase);
    setSecondsLeft(nextPhase === "expose" ? PHASE_1_SECONDS : PHASE_2_SECONDS);
  };

  const resetTimer = () => {
    playClickSound();
    setIsRunning(false);
    setSecondsLeft(phase === "expose" ? PHASE_1_SECONDS : PHASE_2_SECONDS);
  };

  const toggleMastered = (qId: string) => {
    setMasteredMap((prev) => {
      const next = { ...prev, [qId]: !prev[qId] };
      if (next[qId]) playSuccessSound();
      else playClickSound();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const filteredQuestions =
    roleFilter === "ALL"
      ? JURY_QUESTIONS
      : JURY_QUESTIONS.filter((q) => q.role === roleFilter);

  const activeQuestion =
    filteredQuestions.find((q) => q.id === selectedId) ||
    filteredQuestions[0] ||
    JURY_QUESTIONS[0];

  const masteredCount = Object.values(masteredMap).filter(Boolean).length;

  const totalScore = RNCP_CRITERIA.reduce(
    (acc, c) => acc + (evalScores[c.id] ?? 0),
    0,
  );

  const handleScoreChange = (critId: string, val: number) => {
    triggerHaptic("light");
    playClickSound();
    setEvalScores((prev) => {
      const next = { ...prev, [critId]: val };
      try {
        localStorage.setItem(EVAL_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleResetScores = () => {
    playClickSound();
    setEvalScores(DEFAULT_SCORES);
    try {
      localStorage.setItem(EVAL_STORAGE_KEY, JSON.stringify(DEFAULT_SCORES));
    } catch {
      // ignore
    }
  };

  const verdict = getScoreVerdict(totalScore);

  return {
    viewMode,
    setViewMode,
    phase,
    secondsLeft,
    isRunning,
    setIsRunning,
    roleFilter,
    setRoleFilter,
    selectedId,
    setSelectedId,
    masteredMap,
    evalScores,
    showAnswer,
    setShowAnswer,
    mobileTab,
    setMobileTab,
    switchPhase,
    resetTimer,
    toggleMastered,
    formatTime,
    filteredQuestions,
    activeQuestion,
    masteredCount,
    totalScore,
    handleScoreChange,
    handleResetScores,
    verdict,
  };
}

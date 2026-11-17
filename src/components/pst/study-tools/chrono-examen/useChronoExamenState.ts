"use client";

import { useEffect, useState } from "react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  SUJETS_EXAMEN_S1,
  LOCAL_STORAGE_EXAM_DRAFT,
  type SujetExamenCNAM,
} from "@/lib/pst/data/chrono-examen-data";

export function useChronoExamenState(defaultModuleKey = "pst106") {
  const [selectedSujetId, setSelectedSujetId] = useState<string>(
    () =>
      SUJETS_EXAMEN_S1.find((s) => s.moduleKey === defaultModuleKey)?.id ??
      SUJETS_EXAMEN_S1[0].id,
  );
  const [examHours, setExamHours] = useState<number>(3); // 2 or 3h
  const [totalSeconds, setTotalSeconds] = useState<number>(3 * 3600);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(3 * 3600);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [draftContent, setDraftContent] = useState<string>("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState<"sujet" | "redaction">("sujet");

  // Load draft from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_EXAM_DRAFT);
      if (saved) setDraftContent(saved);
    } catch {
      /* ignore */
    }
  }, []);

  // Save draft on edit
  const handleDraftChange = (text: string) => {
    setDraftContent(text);
    try {
      localStorage.setItem(LOCAL_STORAGE_EXAM_DRAFT, text);
    } catch {
      /* ignore */
    }
  };

  // Timer loop
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning && remainingSeconds > 0) {
      timer = setInterval(() => {
        setRemainingSeconds((t) => {
          if (t <= 1) {
            setIsRunning(false);
            playSuccessSound();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, remainingSeconds]);

  const currentSujet: SujetExamenCNAM =
    SUJETS_EXAMEN_S1.find((s) => s.id === selectedSujetId) ??
    SUJETS_EXAMEN_S1[0];

  const handleSelectHours = (hours: number) => {
    setExamHours(hours);
    const secs = hours * 3600;
    setTotalSeconds(secs);
    setRemainingSeconds(secs);
    setIsRunning(false);
    playClickSound();
  };

  const handleToggleTimer = () => {
    setIsRunning(!isRunning);
    playClickSound();
    triggerHaptic();
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
    playClickSound();
    triggerHaptic();
  };

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Milestones in % of time
  const elapsed = totalSeconds - remainingSeconds;
  const progressPercent = Math.min(
    100,
    Math.round((elapsed / totalSeconds) * 100),
  );

  // Determine active phase
  let activePhase = "Phase 1 : Définition des termes & Problématique (0-20%)";
  if (progressPercent >= 85) {
    activePhase = "Phase 4 : Relecture finale & Chasse aux fautes (85-100%)";
  } else if (progressPercent >= 40) {
    activePhase = "Phase 3 : Rédaction développée & Citations (40-85%)";
  } else if (progressPercent >= 20) {
    activePhase = "Phase 2 : Élaboration du plan détaillé I & II (20-40%)";
  }

  // Count words
  const wordsCount = draftContent.trim()
    ? draftContent.trim().split(/\s+/).length
    : 0;

  const handleCopyText = () => {
    navigator.clipboard.writeText(draftContent);
    setCopied(true);
    playClickSound();
    triggerHaptic();
    setTimeout(() => setCopied(false), 2000);
  };

  return {
    selectedSujetId,
    setSelectedSujetId,
    examHours,
    remainingSeconds,
    isRunning,
    draftContent,
    isFullScreen,
    setIsFullScreen,
    copied,
    mobileTab,
    setMobileTab,
    handleDraftChange,
    currentSujet,
    handleSelectHours,
    handleToggleTimer,
    handleResetTimer,
    formatTime,
    progressPercent,
    activePhase,
    wordsCount,
    handleCopyText,
  };
}

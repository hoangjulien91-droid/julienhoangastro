"use client";

import { useEffect, useRef, useState } from "react";
import { QCM } from "@/lib/pst/data/pst106";
import { PIEGES } from "@/lib/pst/data/pst106-inline";
import { shuffleArr } from "@/lib/pst/utils";
import {
  playClickSound,
  playReviewSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

export interface JJItem {
  q: string;
  options: string[];
  correct: number;
  explain: string;
}

export function buildPool(): JJItem[] {
  const qcmItems: JJItem[] = QCM.map((q) => ({
    q: q[0] as string,
    options: q[1] as string[],
    correct: q[2] as number,
    explain: q[3] as string,
  }));
  const piegeItems: JJItem[] = PIEGES.map((p) => ({
    q: "Vrai ou Faux : " + (p[0] as string),
    options: ["Vrai", "Faux"],
    correct: p[1] ? 0 : 1,
    explain: p[2] as string,
  }));
  return shuffleArr(qcmItems.concat(piegeItems)).slice(0, 10);
}

export function formatQuizTime(ms: number) {
  const clamped = Math.max(0, ms);
  const s = Math.floor(clamped / 1000);
  return (
    String(Math.floor(s / 60)).padStart(2, "0") +
    ":" +
    String(s % 60).padStart(2, "0")
  );
}

export function useJourJQuizState() {
  const [items, setItems] = useState<JJItem[]>(() => buildPool());
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [remaining, setRemaining] = useState(5 * 60 * 1000);
  const deadlineRef = useRef(Date.now() + 5 * 60 * 1000);

  useEffect(() => {
    const t = window.setInterval(() => {
      const left = deadlineRef.current - Date.now();
      setRemaining(left);
      if (left <= 0) setFinished(true);
    }, 1000);
    return () => window.clearInterval(t);
  }, []);

  const current = items[idx];

  function choose(i: number) {
    if (answered !== null || finished) return;
    setAnswered(i);
    if (i === current?.correct) {
      setScore((s) => s + 1);
      playSuccessSound();
      triggerHaptic("success");
    } else {
      playReviewSound();
      triggerHaptic("error");
    }
  }

  function next() {
    playClickSound();
    triggerHaptic("selection");
    setAnswered(null);
    if (idx + 1 >= items.length) setFinished(true);
    else setIdx((v) => v + 1);
  }

  function restart() {
    playClickSound();
    triggerHaptic("selection");
    setItems(buildPool());
    setIdx(0);
    setScore(0);
    setAnswered(null);
    setFinished(false);
    deadlineRef.current = Date.now() + 5 * 60 * 1000;
    setRemaining(5 * 60 * 1000);
  }

  const pct = Math.round((100 * score) / (items.length || 1));
  const progressPct = items.length
    ? Math.round(((idx + (answered !== null ? 1 : 0)) * 100) / items.length)
    : 0;
  const isUrgent = remaining < 60000;
  const verdict =
    pct >= 80
      ? "Excellente maîtrise — Prêt(e) pour le Jour J de l'examen Cnam !"
      : pct >= 50
        ? "Bases acquises — Continue à réviser les nuances cliniques"
        : "Revois tes fiches théoriques et cliniques avant le grand jour";

  return {
    items,
    idx,
    score,
    answered,
    finished,
    remaining,
    current,
    choose,
    next,
    restart,
    pct,
    progressPct,
    isUrgent,
    verdict,
  };
}

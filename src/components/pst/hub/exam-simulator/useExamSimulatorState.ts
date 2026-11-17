"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { triggerHaptic } from "@/lib/pst/audio-feedback";
import {
  EXAM_SUBJECTS,
  PST108_SUBEXAMS,
  EXAM_STORAGE_KEY,
  type ExamSimulatorSavedState,
  type Pst108SubExamId,
} from "@/lib/pst/data/exam-simulator-data";

export function formatExamTime(totalSec: number) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) {
    return `${h}h ${m.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`;
  }
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

export function useExamSimulatorState(isOpen: boolean) {
  const [selectedUe, setSelectedUe] = useState<string>("PST106");
  const [pst108Part, setPst108Part] = useState<Pst108SubExamId>("lucy");
  const [examActive, setExamActive] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(7200);
  const [copieContent, setCopieContent] = useState<string>("");
  const [checkedCriteria, setCheckedCriteria] = useState<
    Record<string, boolean>
  >({});
  const [mobileTab, setMobileTab] = useState<"sujet" | "copie">("sujet");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function toggleCriterion(c: string) {
    triggerHaptic("light");
    setCheckedCriteria((prev) => ({ ...prev, [c]: !prev[c] }));
  }

  function handleCopyCopie() {
    if (!copieContent.trim()) {
      toast.error("Votre copie est vide.");
      return;
    }
    navigator.clipboard.writeText(copieContent);
    toast.success("Copie copiée dans le presse-papier !");
  }

  // Restauration de la sauvegarde locale au montage ou à l'ouverture
  useEffect(() => {
    try {
      const raw = localStorage.getItem(EXAM_STORAGE_KEY);
      if (raw) {
        const saved: ExamSimulatorSavedState = JSON.parse(raw);
        if (saved && saved.ue) {
          setSelectedUe(saved.ue);
          setCopieContent(saved.copieContent || "");
          if (
            typeof saved.secondsRemaining === "number" &&
            saved.secondsRemaining > 0
          ) {
            setSecondsRemaining(saved.secondsRemaining);
          }
        }
      }
    } catch {
      /* ignore */
    }
  }, [isOpen]);

  const baseSubject =
    EXAM_SUBJECTS.find((s) => s.ue === selectedUe) || EXAM_SUBJECTS[0];
  const subject =
    selectedUe === "PST108"
      ? {
          ...baseSubject,
          ...PST108_SUBEXAMS[pst108Part],
        }
      : baseSubject;

  // Sauvegarde automatique en temps réel dès modification
  useEffect(() => {
    if (!copieContent.trim() && secondsRemaining === subject.dureeMinutes * 60)
      return;
    try {
      const state: ExamSimulatorSavedState = {
        ue: selectedUe,
        copieContent,
        secondsRemaining,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [selectedUe, copieContent, secondsRemaining, subject.dureeMinutes]);

  // Compteur de mots
  const wordCount = copieContent.trim()
    ? copieContent.trim().split(/\s+/).length
    : 0;

  useEffect(() => {
    if (examActive && secondsRemaining > 0) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            setExamActive(false);
            toast.info("Temps écoulé ! Épreuve terminée.");
            return 0;
          }
          if (prev === 600) {
            toast.warning("Attention : il ne reste que 10 minutes d'épreuve.");
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examActive, secondsRemaining]);

  function handleStart(minutes = subject.dureeMinutes) {
    setSecondsRemaining(minutes * 60);
    setExamActive(true);
    toast.success(`Épreuve lancée : ${minutes} minutes au chronomètre.`);
  }

  function handleStop() {
    setExamActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    toast.info("Chronomètre mis en pause.");
  }

  function handleReset() {
    setExamActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setSecondsRemaining(subject.dureeMinutes * 60);
    setCopieContent("");
    try {
      localStorage.removeItem(EXAM_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    toast.info("Session d'examen réinitialisée.");
  }

  function handleExportCopie() {
    if (!copieContent.trim()) {
      toast.error("Votre copie est vide.");
      return;
    }

    const checkedCount = subject.criteres.filter(
      (c) => checkedCriteria[c],
    ).length;

    const output = [
      `# COPIE D'EXAMEN BLANC CNAM — ${subject.ue}`,
      `**Intitulé** : ${subject.titre}`,
      `**Date de composition** : ${new Date().toLocaleDateString("fr-FR")}`,
      `**Temps effectif restant** : ${formatExamTime(secondsRemaining)}`,
      `**Nombre de mots** : ${wordCount}`,
      `**Critères validés en auto-évaluation** : ${checkedCount} / ${subject.criteres.length}`,
      `\n## SUJET OFFICIEL`,
      subject.sujet,
      `\n## RÉDACTION DU CANDIDAT`,
      copieContent,
      `\n## GRILLE DES CRITÈRES ET ATTENDUS DU JURY`,
      ...subject.criteres.map(
        (c) => `- [${checkedCriteria[c] ? "x" : " "}] ${c}`,
      ),
    ].join("\n\n");

    const blob = new Blob([output], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `copie_examen_blanc_${subject.ue.toLowerCase()}_${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Copie exportée en Markdown avec la grille d'évaluation.");
  }

  return {
    selectedUe,
    setSelectedUe,
    pst108Part,
    setPst108Part,
    examActive,
    setExamActive,
    secondsRemaining,
    setSecondsRemaining,
    copieContent,
    setCopieContent,
    checkedCriteria,
    toggleCriterion,
    mobileTab,
    setMobileTab,
    subject,
    wordCount,
    handleStart,
    handleStop,
    handleReset,
    handleCopyCopie,
    handleExportCopie,
  };
}

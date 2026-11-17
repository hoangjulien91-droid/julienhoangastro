"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, BookOpen, FileText } from "lucide-react";
import { toast } from "sonner";
import { triggerHaptic } from "@/lib/pst/audio-feedback";
import {
  EXAM_SUBJECTS,
  PST108_SUBEXAMS,
  EXAM_STORAGE_KEY,
  type ExamSimulatorSavedState,
  type Pst108SubExamId,
} from "@/lib/pst/data/exam-simulator-data";
import { ExamSimulatorSujetColumn } from "./exam-simulator/ExamSimulatorSujetColumn";
import { ExamSimulatorCopieColumn } from "./exam-simulator/ExamSimulatorCopieColumn";

// Re-exports for backward compatibility
export {
  EXAM_SUBJECTS,
  PST108_SUBEXAMS,
  EXAM_STORAGE_KEY,
  type ExamSubject,
  type Pst108SubExamId,
  type ExamSimulatorSavedState,
} from "@/lib/pst/data/exam-simulator-data";

interface ExamSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExamSimulatorModal({
  isOpen,
  onClose,
}: ExamSimulatorModalProps) {
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
      `**Temps effectif restant** : ${formatTime(secondsRemaining)}`,
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

  function formatTime(totalSec: number) {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (h > 0) {
      return `${h}h ${m.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`;
    }
    return `${m}m ${s.toString().padStart(2, "0")}s`;
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Simulateur d'Examen Blanc Chronométré CNAM"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        className="relative w-full max-w-6xl h-[92vh] bg-card text-foreground border border-border rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="p-3 sm:px-6 py-2.5 sm:py-3.5 border-b border-border bg-muted/20 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span className="size-8 rounded-lg bg-accent text-accent-foreground font-mono font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
              CNAM
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <h2 className="text-xs sm:text-sm font-serif font-bold text-foreground leading-tight m-0 truncate">
                  Examen Blanc Chronométré
                </h2>
                <span className="px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold bg-muted text-muted-foreground border border-border shrink-0 hidden xs:inline">
                  Réel
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-muted-foreground font-mono truncate block">
                {subject.ue} · {subject.titre}
              </span>
            </div>
          </div>

          {/* Module selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none pb-0.5">
            {EXAM_SUBJECTS.map((s) => (
              <button
                key={s.ue}
                type="button"
                onClick={() => {
                  setSelectedUe(s.ue);
                  setExamActive(false);
                  const nextMinutes =
                    s.ue === "PST108"
                      ? PST108_SUBEXAMS[pst108Part].dureeMinutes
                      : s.dureeMinutes;
                  setSecondsRemaining(nextMinutes * 60);
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-colors cursor-pointer shrink-0 ${
                  selectedUe === s.ue
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.ue}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer shrink-0"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Mobile View Switcher (phones and portrait tablets) */}
        <div className="lg:hidden flex items-center border-b border-border bg-muted/30 p-1.5 gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setMobileTab("sujet")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              mobileTab === "sujet"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="size-3.5" />
            <span>1. Sujet &amp; Critères</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("copie")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              mobileTab === "copie"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText className="size-3.5" />
            <span>2. Copie ({wordCount} mots)</span>
          </button>
        </div>

        {/* Central Split View */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Column: Sujet & Barème (5 cols) */}
          <ExamSimulatorSujetColumn
            selectedUe={selectedUe}
            pst108Part={pst108Part}
            onSelectPst108Part={(part) => {
              setPst108Part(part);
              setExamActive(false);
              setSecondsRemaining(PST108_SUBEXAMS[part].dureeMinutes * 60);
            }}
            subject={subject}
            secondsRemaining={secondsRemaining}
            examActive={examActive}
            onStart={handleStart}
            onStop={handleStop}
            onReset={handleReset}
            checkedCriteria={checkedCriteria}
            onToggleCriterion={toggleCriterion}
            formatTime={formatTime}
            mobileTab={mobileTab}
          />

          {/* Right Column: Zone de rédaction (7 cols) */}
          <ExamSimulatorCopieColumn
            copieContent={copieContent}
            onChangeCopieContent={setCopieContent}
            wordCount={wordCount}
            onCopyCopie={handleCopyCopie}
            onExportCopie={handleExportCopie}
            mobileTab={mobileTab}
          />
        </div>
      </div>
    </div>
  );
}

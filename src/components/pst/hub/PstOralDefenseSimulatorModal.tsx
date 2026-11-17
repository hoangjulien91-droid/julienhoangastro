"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Award,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  BookOpen,
  Scale,
  Users,
  Clock,
  ChevronLeft,
  FileCheck,
} from "lucide-react";
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
import { OralDefenseRubricGrid } from "./oral-defense/OralDefenseRubricGrid";
import { OralDefensePacingBanner } from "./oral-defense/OralDefensePacingBanner";

interface PstOralDefenseSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PstOralDefenseSimulatorModal: React.FC<
  PstOralDefenseSimulatorModalProps
> = ({ isOpen, onClose }) => {
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

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Simulateur de Soutenance Orale et Grand Jury RNCP Niveau 7"
      className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        className="relative z-10 w-full max-w-6xl bg-card text-foreground border border-border rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-3.5 sm:px-5 py-2.5 sm:py-3.5 border-b border-border/80 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 bg-muted/20 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Award className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30 truncate">
                  GRAND JURY RNCP 7 · CNAM
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground hidden sm:inline truncate">
                  {masteredCount} / {JURY_QUESTIONS.length} maîtrisées
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-serif font-bold text-foreground m-0 mt-0.5 truncate">
                Soutenance Orale &amp; Contre-Interrogatoire
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center rounded-xl border border-border bg-background p-0.5 sm:p-1 gap-1">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setViewMode("questions");
                }}
                className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                  viewMode === "questions"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users className="size-3 sm:size-3.5" />
                <span>Questions</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setViewMode("grille");
                }}
                className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                  viewMode === "grille"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileCheck className="size-3 sm:size-3.5" />
                <span>Grille ({totalScore}/20)</span>
              </button>
            </div>

            {/* Official 2-Phase Timer Bar */}
            <div className="flex items-center rounded-xl border border-border bg-background p-0.5 sm:p-1 gap-1">
              <button
                type="button"
                onClick={() => switchPhase("expose")}
                className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                  phase === "expose"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                1. Exposé (15m)
              </button>
              <button
                type="button"
                onClick={() => switchPhase("jury")}
                className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                  phase === "jury"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                2. Jury (30m)
              </button>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-border bg-background">
              <Clock
                className={`size-3.5 sm:size-4 ${
                  secondsLeft <= 180
                    ? "text-rose-500 animate-pulse"
                    : "text-amber-500"
                }`}
              />
              <span className="font-mono text-xs sm:text-sm font-black text-foreground">
                {formatTime(secondsLeft)}
              </span>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setIsRunning((r) => !r);
                }}
                className="p-1 rounded-md hover:bg-muted text-foreground cursor-pointer"
                title={
                  isRunning ? "Mettre en pause" : "Démarrer le chronomètre"
                }
              >
                {isRunning ? (
                  <Pause className="size-3 sm:size-3.5" />
                ) : (
                  <Play className="size-3 sm:size-3.5" />
                )}
              </button>
              <button
                type="button"
                onClick={resetTimer}
                className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                title="Réinitialiser le chronomètre"
              >
                <RotateCcw className="size-3 sm:size-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
              aria-label="Fermer"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {viewMode === "questions" ? (
          <>
            {/* Phase 1 Pacing Milestones Banner */}
            <OralDefensePacingBanner />

            {/* Main 2-Column Body */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Jury Questions List */}
              <div
                className={`lg:col-span-5 border-r border-border/80 flex flex-col overflow-hidden bg-muted/10 ${
                  mobileTab === "list" ? "flex" : "hidden lg:flex"
                }`}
              >
                <div className="p-2.5 sm:p-3 border-b border-border/70 flex flex-wrap items-center gap-1.5 shrink-0">
                  {(
                    [
                      { id: "ALL", label: "Tout le Jury (7)" },
                      { id: "president", label: "Président Chaire" },
                      { id: "chercheur", label: "Chercheur" },
                      { id: "praticien", label: "Praticien" },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setRoleFilter(tab.id);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-semibold transition-colors cursor-pointer ${
                        roleFilter === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-background hover:bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto p-2.5 sm:p-3 space-y-2">
                  {filteredQuestions.map((q) => {
                    const isSelected = q.id === activeQuestion.id;
                    const isMastered = !!masteredMap[q.id];
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setSelectedId(q.id);
                          setMobileTab("detail");
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? "border-accent bg-accent/10 shadow-xs"
                            : "border-border/80 bg-card hover:bg-muted/60"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent">
                            {q.roleLabel}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-muted text-muted-foreground">
                              {q.ueTag}
                            </span>
                            {isMastered && (
                              <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                            )}
                          </div>
                        </div>
                        <p className="text-xs font-semibold text-foreground line-clamp-2 m-0">
                          « {q.question} »
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Active Question Breakdown */}
              <div
                className={`lg:col-span-7 overflow-y-auto p-3.5 sm:p-5 space-y-3.5 sm:space-y-4 ${
                  mobileTab === "detail" ? "block" : "hidden lg:block"
                }`}
              >
                {/* Mobile Back Button */}
                <div className="lg:hidden pb-1">
                  <button
                    type="button"
                    onClick={() => setMobileTab("list")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-background text-xs font-mono font-bold text-accent hover:bg-muted cursor-pointer"
                  >
                    <ChevronLeft className="size-3.5" />
                    <span>← Retour aux questions ({filteredQuestions.length})</span>
                  </button>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl border border-border bg-muted/20 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-accent">
                      <Users className="size-3.5" />
                      <span>{activeQuestion.roleLabel}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleMastered(activeQuestion.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold border transition-colors cursor-pointer ${
                        masteredMap[activeQuestion.id]
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                          : "bg-background hover:bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      <CheckCircle2 className="size-3.5" />
                      <span>
                        {masteredMap[activeQuestion.id]
                          ? "Argumentaire Maîtrisé"
                          : "Marquer comme Maîtrisé"}
                      </span>
                    </button>
                  </div>

                  <blockquote className="text-sm sm:text-base font-serif font-bold text-foreground m-0 leading-relaxed">
                    « {activeQuestion.question} »
                  </blockquote>
                </div>

                {/* Toggle Answer Visibility */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-bold">
                    Grille d&apos;Analyse &amp; Réponse Attendue par le Jury
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAnswer((s) => !s)}
                    className="text-xs font-mono font-semibold text-accent hover:underline cursor-pointer"
                  >
                    {showAnswer
                      ? "Masquer le corrigé (Entraînement à blanc)"
                      : "Afficher le corrigé"}
                  </button>
                </div>

                {showAnswer && (
                  <div className="space-y-3.5 animate-in fade-in duration-150">
                    {/* 1. Tension épistémologique */}
                    <div className="p-3.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                        <Scale className="size-4 shrink-0" />
                        <span>Enjeu Épistémologique Sous-Jacent</span>
                      </div>
                      <p className="text-xs text-foreground/90 leading-relaxed m-0">
                        {activeQuestion.underlyingTension}
                      </p>
                    </div>

                    {/* 2. Piège éliminatoire */}
                    <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-300">
                        <AlertTriangle className="size-4 shrink-0" />
                        <span>Piège Éliminatoire à Éviter Absolument</span>
                      </div>
                      <p className="text-xs text-foreground/90 leading-relaxed m-0">
                        {activeQuestion.fatalTrap}
                      </p>
                    </div>

                    {/* 3. Structure de réponse en 3 temps */}
                    <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                        <ShieldCheck className="size-4 shrink-0" />
                        <span>Architecture de Réponse Attendue (3 Temps)</span>
                      </div>
                      <ol className="space-y-2 m-0 pl-0 list-none">
                        {activeQuestion.expectedStructure.map((step, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs text-foreground leading-relaxed"
                          >
                            <span className="size-5 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* 4. Références canoniques */}
                    <div className="p-3 rounded-xl border border-border bg-card flex items-center justify-between gap-2 text-xs">
                      <span className="text-muted-foreground font-mono text-[11px] flex items-center gap-1.5">
                        <BookOpen className="size-3.5 text-accent" />
                        <span>Appuis théoriques à citer à l&apos;oral :</span>
                      </span>
                      <span className="font-mono font-bold text-foreground text-[11px]">
                        {activeQuestion.keyReferences}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* RNCP 7 Evaluation Rubric Grid */
          <OralDefenseRubricGrid
            totalScore={totalScore}
            evalScores={evalScores}
            verdict={verdict}
            onScoreChange={handleScoreChange}
            onResetScores={handleResetScores}
          />
        )}
      </div>
    </div>
  );
};

export default PstOralDefenseSimulatorModal;

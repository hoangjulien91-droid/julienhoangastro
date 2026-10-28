"use client";

import { useState } from "react";
import {
  X,
  Compass,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Copy,
  Check,
  Brain,
  Layers,
  Quote,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import {
  CONCEPTS_TRANSVERSAUX_S1,
  QUIZ_TRANSVERSAL_S1,
  type ConceptTransversalS1,
  type QuizQuestionTransversale,
} from "@/lib/pst/data/ponts-s1";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface PontsConceptuelsS1ModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultConceptId?: string;
}

export function PontsConceptuelsS1Modal({
  isOpen,
  onClose,
  defaultConceptId,
}: PontsConceptuelsS1ModalProps) {
  const [activeView, setActiveView] = useState<"comparateur" | "quiz">("comparateur");
  const [selectedConceptId, setSelectedConceptId] = useState<string>(
    defaultConceptId ?? CONCEPTS_TRANSVERSAUX_S1[0].id,
  );
  const [copiedFormula, setCopiedFormula] = useState(false);

  // Quiz state
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasValidatedQuiz, setHasValidatedQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [solvedQuestions, setSolvedQuestions] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const currentConcept: ConceptTransversalS1 =
    CONCEPTS_TRANSVERSAUX_S1.find((c) => c.id === selectedConceptId) ??
    CONCEPTS_TRANSVERSAUX_S1[0];

  const currentQuiz: QuizQuestionTransversale =
    QUIZ_TRANSVERSAL_S1[currentQuizIdx] ?? QUIZ_TRANSVERSAL_S1[0];

  const handleCopyFormula = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormula(true);
    playClickSound();
    triggerHaptic();
    setTimeout(() => setCopiedFormula(false), 2000);
  };

  const handleValidateQuiz = () => {
    if (!selectedOptionId) return;
    setHasValidatedQuiz(true);
    const selected = currentQuiz.options.find((o) => o.id === selectedOptionId);
    if (selected?.isCorrect) {
      playSuccessSound();
      triggerHaptic();
      if (!solvedQuestions[currentQuiz.id]) {
        setQuizScore((s) => s + 1);
        setSolvedQuestions((prev) => ({ ...prev, [currentQuiz.id]: true }));
      }
    } else {
      playReviewSound();
      triggerHaptic();
    }
  };

  const handleNextQuiz = () => {
    playClickSound();
    triggerHaptic();
    setSelectedOptionId(null);
    setHasValidatedQuiz(false);
    setCurrentQuizIdx((i) => (i + 1) % QUIZ_TRANSVERSAL_S1.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Ponts Conceptuels S1 — Comparateur Épistémologique"
    >
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-2xl border border-indigo-500/30 bg-slate-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-4 border-b border-slate-800 bg-slate-950/50 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Compass className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-400 truncate">
                  Ponts Conceptuels S1
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium shrink-0 hidden xs:inline">
                  PST106 · PST108 · PST123
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-bold text-white truncate">
                Comparateur Épistémologique S1
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="flex items-center bg-slate-800/80 p-0.5 sm:p-1 rounded-lg border border-slate-700">
              <button
                onClick={() => {
                  setActiveView("comparateur");
                  playClickSound();
                }}
                className={`px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                  activeView === "comparateur"
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Layers className="size-3" />
                <span className="hidden sm:inline">Grille 3 Colonnes</span>
                <span className="sm:hidden">Grille</span>
              </button>
              <button
                onClick={() => {
                  setActiveView("quiz");
                  playClickSound();
                }}
                className={`px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                  activeView === "quiz"
                    ? "bg-emerald-600 text-white shadow"
                    : "text-emerald-400 hover:text-emerald-300"
                }`}
              >
                <Sparkles className="size-3" />
                <span className="hidden sm:inline">Quiz ({quizScore}/{QUIZ_TRANSVERSAL_S1.length})</span>
                <span className="sm:hidden">Quiz</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
              title="Fermer"
              aria-label="Fermer"
            >
              <X className="size-4 sm:size-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6">
          {activeView === "comparateur" ? (
            <div className="space-y-4 sm:space-y-6">
              {/* Horizontal Concept Selector */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
                {CONCEPTS_TRANSVERSAUX_S1.map((c) => {
                  const isSelected = c.id === currentConcept.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedConceptId(c.id);
                        playClickSound();
                        triggerHaptic();
                      }}
                      className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all shrink-0 ${
                        isSelected
                          ? "bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-950/50"
                          : "bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      {c.nom}
                    </button>
                  );
                })}
              </div>

              {/* Question Headline */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Problématique transversale de dissertation :
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-indigo-300">
                    {currentConcept.questionCentrale}
                  </h3>
                </div>

                <button
                  onClick={() => handleCopyFormula(currentConcept.phraseMagiqueExamen)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 border border-indigo-500/30 text-xs font-medium shrink-0 transition-colors"
                  title="Copier la phrase magique d'examen"
                >
                  {copiedFormula ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>Copier formule 18/20</span>
                </button>
              </div>

              {/* 3 Columns Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* PST106 Column */}
                <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 to-slate-900/90 p-5 shadow-lg space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                        PST106 · Clinique Activité
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md font-semibold">
                        Ergonomie
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Angle d&apos;analyse :
                      </span>
                      <p className="text-xs font-semibold text-white leading-snug">
                        {currentConcept.pst106.focus}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Auteurs majeurs :
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {currentConcept.pst106.auteursCles.map((a) => (
                          <span
                            key={a}
                            className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-900/40 text-emerald-200 border border-emerald-700/40"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Concepts clés :
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {currentConcept.pst106.concepts.map((c) => (
                          <span
                            key={c}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-emerald-200 italic">
                      {currentConcept.pst106.formuleChoc}
                    </div>

                    <div className="text-[11px] text-slate-300">
                      <strong className="text-slate-200 block text-[10px] uppercase">Dispositif clé :</strong>
                      {currentConcept.pst106.methode}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-emerald-500/20 text-[11px] text-rose-300/90 bg-rose-950/20 p-2 rounded-lg border border-rose-900/30">
                    <strong>Piège copie :</strong> {currentConcept.pst106.piegeEviter}
                  </div>
                </div>

                {/* PST108 Column */}
                <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/30 to-slate-900/90 p-5 shadow-lg space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                        PST108 · Clinique Sociale
                      </span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md font-semibold">
                        Psychosociologie
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Angle d&apos;analyse :
                      </span>
                      <p className="text-xs font-semibold text-white leading-snug">
                        {currentConcept.pst108.focus}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Auteurs majeurs :
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {currentConcept.pst108.auteursCles.map((a) => (
                          <span
                            key={a}
                            className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-900/40 text-amber-200 border border-amber-700/40"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Concepts clés :
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {currentConcept.pst108.concepts.map((c) => (
                          <span
                            key={c}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 text-[11px] text-amber-200 italic">
                      {currentConcept.pst108.formuleChoc}
                    </div>

                    <div className="text-[11px] text-slate-300">
                      <strong className="text-slate-200 block text-[10px] uppercase">Dispositif clé :</strong>
                      {currentConcept.pst108.methode}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-amber-500/20 text-[11px] text-rose-300/90 bg-rose-950/20 p-2 rounded-lg border border-rose-900/30">
                    <strong>Piège copie :</strong> {currentConcept.pst108.piegeEviter}
                  </div>
                </div>

                {/* PST123 Column */}
                <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/30 to-slate-900/90 p-5 shadow-lg space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-indigo-500/20">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">
                        PST123 · Travail & emploi
                      </span>
                      <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md font-semibold">
                        Sociologie
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Angle d&apos;analyse :
                      </span>
                      <p className="text-xs font-semibold text-white leading-snug">
                        {currentConcept.pst123.focus}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Auteurs majeurs :
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {currentConcept.pst123.auteursCles.map((a) => (
                          <span
                            key={a}
                            className="text-[11px] font-semibold px-2 py-0.5 rounded bg-indigo-900/40 text-indigo-200 border border-indigo-700/40"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Concepts clés :
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {currentConcept.pst123.concepts.map((c) => (
                          <span
                            key={c}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-[11px] text-indigo-200 italic">
                      {currentConcept.pst123.formuleChoc}
                    </div>

                    <div className="text-[11px] text-slate-300">
                      <strong className="text-slate-200 block text-[10px] uppercase">Dispositif clé :</strong>
                      {currentConcept.pst123.methode}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-indigo-500/20 text-[11px] text-rose-300/90 bg-rose-950/20 p-2 rounded-lg border border-rose-900/30">
                    <strong>Piège copie :</strong> {currentConcept.pst123.piegeEviter}
                  </div>
                </div>
              </div>

              {/* Synthetic Exam paragraph */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  <span>Phrase magique d&apos;articulation pour la copie d&apos;examen :</span>
                </div>
                <p className="text-xs sm:text-sm text-purple-100 italic leading-relaxed">
                  {currentConcept.phraseMagiqueExamen}
                </p>
              </div>
            </div>
          ) : (
            /* ================= QUIZ MODE ================= */
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 border-b border-slate-800 pb-3">
                  <span className="text-indigo-400 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    Question {currentQuizIdx + 1} / {QUIZ_TRANSVERSAL_S1.length}
                  </span>
                  <span>Score : {quizScore} / {QUIZ_TRANSVERSAL_S1.length}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold">
                    {currentQuiz.contexte}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                    {currentQuiz.enonce}
                  </h4>
                </div>

                {/* Options */}
                <div className="space-y-2.5 pt-2">
                  {currentQuiz.options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    const isCorrect = hasValidatedQuiz && opt.isCorrect;
                    const isWrong = hasValidatedQuiz && isSelected && !opt.isCorrect;

                    return (
                      <button
                        key={opt.id}
                        disabled={hasValidatedQuiz}
                        onClick={() => {
                          setSelectedOptionId(opt.id);
                          playClickSound();
                          triggerHaptic();
                        }}
                        className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${
                          isCorrect
                            ? "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-medium"
                            : isWrong
                            ? "bg-red-950/40 border-red-500 text-red-200"
                            : isSelected
                            ? "bg-indigo-600/30 border-indigo-400 text-white font-medium"
                            : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                            isSelected
                              ? "bg-indigo-600 border-indigo-400 text-white"
                              : "border-slate-600 text-slate-400"
                          }`}
                        >
                          {opt.id.slice(3).toUpperCase()}
                        </div>
                        <div className="space-y-1">
                          <p>{opt.texte}</p>
                          {hasValidatedQuiz && (
                            <p
                              className={`text-xs mt-1 italic ${
                                opt.isCorrect ? "text-emerald-300" : "text-slate-400"
                              }`}
                            >
                              {opt.explication}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Validate Button / Advice */}
                {!hasValidatedQuiz ? (
                  <div className="flex justify-end pt-3">
                    <button
                      disabled={!selectedOptionId}
                      onClick={handleValidateQuiz}
                      className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedOptionId
                          ? "bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer shadow-md"
                          : "bg-slate-800 text-slate-500 cursor-not-allowed"
                      }`}
                    >
                      Valider mon analyse
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 pt-4 border-t border-slate-800">
                    <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200/90 flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>Conseil pour la copie du CNAM :</strong> {currentQuiz.conseilExamen}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleNextQuiz}
                        className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md"
                      >
                        <span>Question suivante</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

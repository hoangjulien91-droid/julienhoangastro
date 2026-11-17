"use client";

import React, { useState } from "react";
import { Copy, Quote } from "lucide-react";
import {
  AD1_TAYLORISME_QUESTIONS,
  PHILOSOPHY_WORK_SUMMARY,
  MASON_EXERCISE_MODEL_ANSWER,
} from "@/lib/pst/data/pst106-ad";
import { playClickSound } from "@/lib/pst/audio-feedback";

export interface Ad106Ad1TaylorismeSectionProps {
  onCopy: (text: string, key: string) => void;
  copiedSection: string | null;
}

export function Ad106Ad1TaylorismeSection({
  onCopy,
  copiedSection,
}: Ad106Ad1TaylorismeSectionProps) {
  const [ad1SubTab, setAd1SubTab] = useState<"macon" | "qcm" | "philo">("macon");
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showAllCorrections, setShowAllCorrections] = useState(false);

  function handleSelectAnswer(qId: number, optionLabel: string) {
    playClickSound();
    setUserAnswers((prev) => ({ ...prev, [qId]: optionLabel }));
  }

  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = AD1_TAYLORISME_QUESTIONS.filter(
    (q) => userAnswers[q.id] === q.correct,
  ).length;

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Sous-onglets AD 1 */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            setAd1SubTab("macon");
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            ad1SubTab === "macon"
              ? "bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30"
              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          1. Exercice des Maçons (Gilbreth)
        </button>
        <button
          type="button"
          onClick={() => {
            playClickSound();
            setAd1SubTab("qcm");
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            ad1SubTab === "qcm"
              ? "bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30"
              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          2. QCM de Compréhension (25 Questions)
        </button>
        <button
          type="button"
          onClick={() => {
            playClickSound();
            setAd1SubTab("philo");
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            ad1SubTab === "philo"
              ? "bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30"
              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          3. Fiche « Le travail selon... » (8 Philosophes)
        </button>
      </div>

      {/* 1. EXERCICE DES MAÇONS */}
      {ad1SubTab === "macon" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white m-0">
                Étude de cas : La rationalisation du métier de maçon (Frank B. Gilbreth)
              </h4>
              <button
                type="button"
                onClick={() =>
                  onCopy(
                    `${MASON_EXERCISE_MODEL_ANSWER.title}\n\n${MASON_EXERCISE_MODEL_ANSWER.q1_analysis}\n\n${MASON_EXERCISE_MODEL_ANSWER.q2_alternative_org}\n\n${MASON_EXERCISE_MODEL_ANSWER.q3_rational_procedure}`,
                    "macon",
                  )
                }
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="size-3" />
                <span>{copiedSection === "macon" ? "Copié !" : "Copier pour le forum"}</span>
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">
                  Question 1 : À partir du relevé des gestes observés, déterminez les gestes inutiles et ceux strictement nécessaires.
                </p>
                <p className="whitespace-pre-line font-serif">
                  {MASON_EXERCISE_MODEL_ANSWER.q1_analysis}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">
                  Question 2 : Proposez une autre organisation du travail pour simplifier les tâches, réduire la fatigue et augmenter la productivité.
                </p>
                <p className="whitespace-pre-line font-serif">
                  {MASON_EXERCISE_MODEL_ANSWER.q2_alternative_org}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">
                  Question 3 : Proposez la meilleure façon de monter le mur en rationalisant le travail du maçon (The One Best Way).
                </p>
                <p className="whitespace-pre-line font-serif">
                  {MASON_EXERCISE_MODEL_ANSWER.q3_rational_procedure}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. LE QCM INTERACTIF (25 QUESTIONS) */}
      {ad1SubTab === "qcm" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex-wrap">
            <div className="text-xs">
              <span className="font-bold text-slate-900 dark:text-white">
                Score : {correctCount} / {AD1_TAYLORISME_QUESTIONS.length}
              </span>
              <span className="text-slate-500 ml-2">
                ({answeredCount} questions répondues)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAllCorrections((v) => !v)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                {showAllCorrections ? "Masquer les corrigés" : "Afficher tous les corrigés"}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {AD1_TAYLORISME_QUESTIONS.map((q) => {
              const userAns = userAnswers[q.id];
              const isAnswered = !!userAns;
              const isCorrect = userAns === q.correct;
              const showCorr = showAllCorrections || isAnswered;

              return (
                <div
                  key={q.id}
                  className={`p-3.5 rounded-xl border transition-all text-xs space-y-2.5 ${
                    isAnswered
                      ? isCorrect
                        ? "bg-emerald-500/5 border-emerald-500/30"
                        : "bg-rose-500/5 border-rose-500/30"
                      : "bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">
                      Question {q.id}. {q.question}
                    </span>
                    {isAnswered && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                          isCorrect
                            ? "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300"
                            : "bg-rose-500/20 text-rose-800 dark:text-rose-300"
                        }`}
                      >
                        {isCorrect ? "Correct ✓" : "Erreur ✗"}
                      </span>
                    )}
                  </div>

                  {/* Options */}
                  <div className="space-y-1.5">
                    {q.options.map((opt) => {
                      const isSelected = userAns === opt.label;
                      const isTheCorrectOpt = opt.label === q.correct;

                      let btnStyle =
                        "bg-slate-50 dark:bg-slate-800/60 border-slate-200/70 dark:border-slate-700/70 hover:bg-slate-100 text-slate-800 dark:text-slate-200";
                      if (showCorr) {
                        if (isTheCorrectOpt) {
                          btnStyle =
                            "bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold";
                        } else if (isSelected && !isTheCorrectOpt) {
                          btnStyle =
                            "bg-rose-500/20 border-rose-500 text-rose-900 dark:text-rose-200";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-amber-500/20 border-amber-500 text-amber-900 dark:text-amber-200 font-bold";
                      }

                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => handleSelectAnswer(q.id, opt.label)}
                          className={`w-full text-left p-2 rounded-lg border text-xs transition-all flex items-start gap-2 cursor-pointer ${btnStyle}`}
                        >
                          <span className="font-mono font-bold shrink-0">
                            [{opt.label}]
                          </span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explication & Clé CNAM */}
                  {showCorr && (
                    <div className="p-2.5 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[11px] leading-relaxed space-y-1">
                      <p className="m-0 text-slate-700 dark:text-slate-300">
                        <b>Corrigé :</b> {q.explanation}
                      </p>
                      <span className="inline-block text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400">
                        Concept 18/20 : {q.keyConcept}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. FICHE « LE TRAVAIL SELON... » */}
      {ad1SubTab === "philo" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <span className="text-xs text-amber-900 dark:text-amber-200 font-semibold">
              Synthèse complète des 8 penseurs fondamentaux du travail (document ODT remis par Mme Lagabrielle)
            </span>
            <button
              type="button"
              onClick={() =>
                onCopy(
                  PHILOSOPHY_WORK_SUMMARY.map(
                    (p) => `${p.author} — ${p.title}\nThèse : ${p.coreIdea}\nCitation : ${p.citation}\nUsage PST106 : ${p.relevancePst}`,
                  ).join("\n\n---\n\n"),
                  "philo",
                )
              }
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-950 dark:text-amber-200 border border-amber-500/30 flex items-center gap-1 cursor-pointer"
            >
              <Copy className="size-3" />
              <span>{copiedSection === "philo" ? "Copié !" : "Copier la fiche"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {PHILOSOPHY_WORK_SUMMARY.map((p) => (
              <div
                key={p.author}
                className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between gap-1 border-b border-slate-100 dark:border-slate-800 pb-1.5">
                  <h4 className="font-bold text-slate-900 dark:text-white m-0">
                    {p.author}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Philosophie du travail
                  </span>
                </div>

                <p className="font-semibold text-amber-700 dark:text-amber-400 m-0">
                  {p.title}
                </p>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed m-0 font-serif">
                  {p.coreIdea}
                </p>

                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-[11px] italic text-slate-700 dark:text-slate-300">
                  <Quote className="size-3 text-amber-500 inline mr-1" />
                  {p.citation}
                </div>

                <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                  💡 <b>Valorisation Cnam :</b> {p.relevancePst}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

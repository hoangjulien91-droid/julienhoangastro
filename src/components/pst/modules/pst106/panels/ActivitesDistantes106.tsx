"use client";

import { useState } from "react";
import {
  FileText,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  Calendar,
  Sparkles,
  Copy,
  ChevronDown,
  Layers,
  ArrowRight,
  ShieldAlert,
  Brain,
  Quote,
} from "lucide-react";
import {
  AD1_TAYLORISME_QUESTIONS,
  PHILOSOPHY_WORK_SUMMARY,
  MASON_EXERCISE_MODEL_ANSWER,
  HERZBERG_TWO_FACTOR_MODEL,
  PACAUD_TELEPHONISTES_SUMMARY,
} from "@/lib/pst/data/pst106-ad";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";

export function ActivitesDistantes106() {
  const [activeAd, setActiveAd] = useState<"ad1" | "ad2" | "ad3">("ad1");
  const [ad1SubTab, setAd1SubTab] = useState<"macon" | "qcm" | "philo">("macon");

  // État du QCM AD 1
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showAllCorrections, setShowAllCorrections] = useState(false);

  // État de copie
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  function handleSelectAnswer(qId: number, optionLabel: string) {
    playClickSound();
    setUserAnswers((prev) => ({ ...prev, [qId]: optionLabel }));
  }

  function handleCopyForForum(text: string, sectionKey: string) {
    playClickSound();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedSection(sectionKey);
      setTimeout(() => setCopiedSection(null), 3000);
      playSuccessSound();
    }
  }

  // Calcul score QCM
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = AD1_TAYLORISME_QUESTIONS.filter(
    (q) => userAnswers[q.id] === q.correct,
  ).length;

  return (
    <div className="space-y-6">
      {/* ── BANDEAU OFFICIEL SÉANCE CNAM ─────────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-indigo-500/15 border border-amber-500/25 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 flex items-center gap-1.5">
              <Calendar className="size-3 text-amber-600 dark:text-amber-400" />
              <span>Séance du 23 octobre 2026</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-900 dark:text-indigo-200 border border-indigo-500/30">
              Corrigé collectif : 28 octobre 2026 (1ère heure)
            </span>
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
            Enseignante : Mme LAGABRIELLE (PST106)
          </span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0">
            Activités Distantes (AD) · Préparation &amp; Analyse Critique du Travail
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed m-0">
            « Exceptionnellement, au regard de l&apos;annulation du cours, les activités distantes vont être utiles pour préparer le cours en amont. La 1ère heure de la séance du 28 octobre sera consacrée aux corrigés collectifs. Vous pouvez déposer vos travaux sur le forum si vous le souhaitez. »
          </p>
        </div>
      </div>

      {/* ── SÉLECTEUR DES 3 ACTIVITÉS DISTANTES ─────────────────────────── */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 overflow-x-auto">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveAd("ad1");
          }}
          className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeAd === "ad1"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <FileText className="size-3.5" />
          <span>AD 1 · Taylorisme &amp; Gilbreth</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveAd("ad2");
          }}
          className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeAd === "ad2"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Brain className="size-3.5" />
          <span>AD 2 · F. Herzberg (Motivations)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setActiveAd("ad3");
          }}
          className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeAd === "ad3"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Layers className="size-3.5" />
          <span>AD 3 · S. Pacaud (Téléphonistes)</span>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── CONTENU AD 1 : LE TAYLORISME, GILBRETH & PHILOSOPHIE DU TRAVAIL ─ */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeAd === "ad1" && (
        <div className="space-y-5 animate-fadeIn">
          {/* Sous-onglets AD 1 */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <button
              type="button"
              onClick={() => setAd1SubTab("macon")}
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
              onClick={() => setAd1SubTab("qcm")}
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
              onClick={() => setAd1SubTab("philo")}
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
                      handleCopyForForum(
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
                    handleCopyForForum(
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
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── CONTENU AD 2 : FREDERICK HERZBERG (MOTIVATIONS PERDUES) ───────── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeAd === "ad2" && (
        <div className="space-y-5 animate-fadeIn">
          {/* Fiche introductive Herzberg */}
          <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Article classique HBR (1968 / 1977)
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white m-0">
                  À la recherche des motivations perdues (One more time: How do you motivate employees?)
                </h4>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleCopyForForum(
                    `FREDERICK HERZBERG — THÉORIE BI-FACTORIELLE\n\n1. Critique du KITA : Le bâton et la carotte ne motivent pas l'employé, ils ne font que mettre le chien en mouvement.\n2. Facteurs d'Hygiène (Insatisfaction) : Salaire, conditions, politique, hiérarchie.\n3. Facteurs de Motivation (Satisfaction) : Accomplissement, responsabilité, travail en lui-même.\n4. Enrichissement vertical (autonomie réelle) vs élargissement horizontal (additionner zéro plus zéro).`,
                    "herzberg",
                  )
                }
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="size-3" />
                <span>{copiedSection === "herzberg" ? "Copié !" : "Copier la synthèse"}</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0 font-serif">
              Herzberg rompt avec la vision linéaire de la motivation. L&apos;inverse de l&apos;insatisfaction n&apos;est pas la satisfaction, mais l&apos;<b>absence d&apos;insatisfaction</b>. Soigner les conditions de travail ou augmenter le salaire (facteurs d&apos;hygiène) empêche les salariés de se plaindre, mais ne les motive jamais durablement à travailler avec cœur. Seul l&apos;<b>enrichissement vertical des tâches</b> crée une satisfaction réelle.
            </p>
          </div>

          {/* Tableau comparatif des Facteurs d'Hygiène vs Motivation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Facteurs d'Hygiène */}
            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-3">
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
                <h5 className="font-bold text-xs text-rose-900 dark:text-rose-200 m-0 uppercase tracking-wide">
                  Facteurs d&apos;Hygiène (Extrinsèques)
                </h5>
                <span className="text-[10px] font-mono text-rose-700 dark:text-rose-300 font-bold">
                  Évitent la douleur
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 m-0">
                Liés au <b>milieu</b> et à l&apos;environnement. S&apos;ils manquent ➔ forte insatisfaction. S&apos;ils sont optimaux ➔ neutralité (non-insatisfaction).
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 m-0 pl-0 list-none">
                {HERZBERG_TWO_FACTOR_MODEL.hygieneFactors.map((f) => (
                  <li key={f.name} className="flex items-center justify-between p-1.5 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-rose-500/10">
                    <span>{f.name}</span>
                    <span className="font-mono text-[10px] text-rose-600 dark:text-rose-400 font-bold">
                      {f.weight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Facteurs de Motivation */}
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                <h5 className="font-bold text-xs text-emerald-900 dark:text-emerald-200 m-0 uppercase tracking-wide">
                  Facteurs Moteurs (Intrinsèques)
                </h5>
                <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 font-bold">
                  Grandissement psychologique
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 m-0">
                Liés au <b>contenu</b> du travail lui-même. Ce sont les SEULS générateurs d&apos;engagement et de performance durable.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 m-0 pl-0 list-none">
                {HERZBERG_TWO_FACTOR_MODEL.motivationFactors.map((f) => (
                  <li key={f.name} className="flex items-center justify-between p-1.5 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-emerald-500/10">
                    <span>{f.name}</span>
                    <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      {f.weight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Principes de l'enrichissement vertical */}
          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs">
            <h5 className="font-bold text-slate-900 dark:text-white m-0">
              Les 5 Principes de l&apos;Accroissement Vertical (vs Élargissement Horizontal)
            </h5>
            <div className="space-y-2">
              {HERZBERG_TWO_FACTOR_MODEL.enrichmentPrinciples.map((p, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-start justify-between gap-3">
                  <div>
                    <span className="font-bold text-amber-700 dark:text-amber-400">
                      {p.action}
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 m-0 mt-0.5">
                      {p.principe}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold shrink-0">
                    Principe {idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── CONTENU AD 3 : SUZANNE PACAUD (LES TÉLÉPHONISTES SNCF) ───────── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {activeAd === "ad3" && (
        <div className="space-y-5 animate-fadeIn">
          {/* Fiche introductive Pacaud */}
          <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Revue Le Travail Humain · Laboratoire de Psychotechnique SNCF
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white m-0">
                  Recherches sur le travail des téléphonistes : étude psychologique d&apos;un métier (Suzanne Pacaud)
                </h4>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleCopyForForum(
                    `SUZANNE PACAUD — RECHERCHES SUR LE TRAVAIL DES TÉLÉPHONISTES (1953)\n\n1. Rupture épistémologique : Pacaud ne part pas de la marche normale du travail, mais montre que le travail réel consiste à vaincre 14 difficultés saillantes permanentes.\n2. Écart Prescrit vs Réel : Le tableau des 15 fautes édicté par la direction est intenable. Les fautes sont des régulations de survie opératoires.\n3. Réfutation de la prédisposition aux accidents et invention de la « plasticité fonctionnelle » au 41 rue Gay-Lussac.`,
                    "pacaud",
                  )
                }
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="size-3" />
                <span>{copiedSection === "pacaud" ? "Copié !" : "Copier la synthèse"}</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0 font-serif">
              {PACAUD_TELEPHONISTES_SUMMARY.ruptureEpistemologique}
            </p>
          </div>

          {/* Les 14 difficultés du travail réel */}
          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h5 className="font-bold text-xs text-slate-900 dark:text-white m-0">
                Les 14 Difficultés Saillantes de l&apos;Activité Réelle observées in situ
              </h5>
              <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-bold">
                Contre le mythe du travail simple
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {PACAUD_TELEPHONISTES_SUMMARY.quatorzeDifficultes.map((d, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-2 text-slate-700 dark:text-slate-300"
                >
                  <span className="px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-mono font-bold text-[10px] shrink-0">
                    #{i + 1}
                  </span>
                  <span className="leading-snug">{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lien avec le 41 rue Gay-Lussac et la Clinique de l'activité */}
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-400/25 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-indigo-900 dark:text-indigo-200">
              <Sparkles className="size-3.5 text-amber-500" />
              <span>Pourquoi ce texte fonde l&apos;ergonomie du CNAM (PST106) :</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0 font-serif">
              {PACAUD_TELEPHONISTES_SUMMARY.conclusionCnam}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 m-0">
              Comme le démontrent Xavier Cuny et Annie Weill-Fassina (2012), l&apos;étude de Pacaud marque le passage historique de la <b>sélection psychotechnique</b> (adapter l&apos;homme au travail) vers l&apos;<b>analyse du travail réel</b> (adapter le travail à l&apos;homme).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

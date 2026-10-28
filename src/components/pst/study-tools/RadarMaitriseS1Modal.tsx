"use client";

import { useEffect, useState } from "react";
import {
  X,
  Compass,
  Sparkles,
  Zap,
  Target,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Brain,
  Award,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface SousAxeS1 {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst123";
  nom: string;
  niveauMaîtrise: number; // 0 à 100
  questionsRecommandees: {
    question: string;
    options: string[];
    correctIdx: number;
    explication: string;
  }[];
}

const SOUS_AXES_S1_DEFAULTS: SousAxeS1[] = [
  {
    id: "leplat_wisner",
    moduleKey: "pst106",
    nom: "Régulation & Écart Prescrit/Réel (Leplat & Wisner)",
    niveauMaîtrise: 75,
    questionsRecommandees: [
      {
        question:
          "Selon Jacques Leplat, pourquoi l'activité réelle diffère-t-elle nécessairement de la tâche prescrite ?",
        options: [
          "Parce que les opérateurs manquent de formation et sont indisciplinés",
          "Parce qu'elle constitue un compromis régulateur face à la variabilité des conditions internes et externes",
          "Parce que la hiérarchie n'exerce pas assez de contrôle managérial",
        ],
        correctIdx: 1,
        explication:
          "Exact ! L'écart n'est pas une faute mais une régulation opératoire cognitive indispensable.",
      },
    ],
  },
  {
    id: "clot_genre",
    moduleKey: "pst106",
    nom: "Clinique de l'Activité & Genre (Yves Clot)",
    niveauMaîtrise: 60,
    questionsRecommandees: [
      {
        question:
          "Quelle est la fonction première du 'genre professionnel' selon Yves Clot ?",
        options: [
          "Imposer un règlement disciplinaire strict sans dérogation",
          "Fournir une mémoire impersonnelle du métier servant de ressource au style personnel",
          "Remplacer les syndicats dans la négociation collective",
        ],
        correctIdx: 1,
        explication:
          "Le genre est la boîte à outils collective sans laquelle l'action singulière se délite.",
      },
    ],
  },
  {
    id: "buhler_organon",
    moduleKey: "pst108",
    nom: "L'Organon du Langage (Karl Bühler)",
    niveauMaîtrise: 45,
    questionsRecommandees: [
      {
        question:
          "Dans le modèle de l'Organon, quelle fonction relie le signe linguistique au récepteur ?",
        options: [
          "La fonction d'Appel (Signal)",
          "La fonction Expressive (Symptôme)",
          "La fonction de Représentation (Symbole)",
        ],
        correctIdx: 0,
        explication:
          "La fonction d'appel oriente l'énoncé comme un signal vers le récepteur pour influencer sa conduite.",
      },
    ],
  },
  {
    id: "habermas_validite",
    moduleKey: "pst108",
    nom: "Agir Communicationnel & Validité (Jürgen Habermas)",
    niveauMaîtrise: 50,
    questionsRecommandees: [
      {
        question:
          "Quelles sont les 3 prétentions universelles à la validité selon Habermas ?",
        options: [
          "Le pouvoir, l'argent et la réputation",
          "La vérité objective, la justesse normative et la sincérité subjective",
          "L'émotion, la logique et la rhétorique",
        ],
        correctIdx: 1,
        explication:
          "Tout acte de parole orienté vers l'intercompréhension présuppose ces trois prétentions.",
      },
    ],
  },
  {
    id: "valls_iod",
    moduleKey: "pst108",
    nom: "Méthode IOD sans tri préalable (Francis Valls)",
    niveauMaîtrise: 70,
    questionsRecommandees: [
      {
        question:
          "Pourquoi l'intervention IOD refuse-t-elle le tri préalable sur CV ?",
        options: [
          "Pour faire des économies d'affranchissement postal",
          "Parce que le tri sur CV opère comme un filtre d'exclusion sociale masquant le travail réel",
          "Parce que les employeurs n'aiment pas lire les CV",
        ],
        correctIdx: 1,
        explication:
          "L'IOD déplace la négociation vers le travail réel et l'aménagement des conditions d'accueil.",
      },
    ],
  },
  {
    id: "dubar_transaction",
    moduleKey: "pst123",
    nom: "Double Transaction Identitaire (Claude Dubar)",
    niveauMaîtrise: 80,
    questionsRecommandees: [
      {
        question:
          "Qu'est-ce qu'une identité de blocage selon Claude Dubar ?",
        options: [
          "Un arrêt de travail prolongé suite à une grève d'atelier",
          "Le refus par autrui/institution d'une identité revendiquée par le sujet",
          "L'adhésion fusionnelle sans réserve à la culture de l'entreprise",
        ],
        correctIdx: 1,
        explication:
          "Le blocage naît de la non-coïncidence entre revendication pour soi et reconnaissance pour autrui.",
      },
    ],
  },
  {
    id: "sainsaulieu_pouvoir",
    moduleKey: "pst123",
    nom: "4 Modèles de Pouvoir au Travail (Renaud Sainsaulieu)",
    niveauMaîtrise: 65,
    questionsRecommandees: [
      {
        question:
          "Quel modèle de Sainsaulieu correspond à un pouvoir fort sur le poste couplé à une dépendance forte aux pairs ?",
        options: [
          "Le modèle Fusionnel",
          "Le modèle de Négociation",
          "Le modèle de Retrait",
        ],
        correctIdx: 1,
        explication:
          "Le modèle de négociation caractérise les professionnels et techniciens experts en démocratie d'atelier.",
      },
    ],
  },
  {
    id: "deonto_loi1985",
    moduleKey: "pst123",
    nom: "Déontologie & Titre de Psychologue (Loi 1985 & Code 2021)",
    niveauMaîtrise: 55,
    questionsRecommandees: [
      {
        question:
          "Quelle est la sanction pénale encourue en cas d'usurpation du titre de psychologue (Art. 433-17 C. Pén.) ?",
        options: [
          "Un simple avertissement écrit du Conseil de l'Ordre",
          "1 an d'emprisonnement et 15 000 euros d'amende",
          "Une interdiction temporaire d'exercer de 3 mois",
        ],
        correctIdx: 1,
        explication:
          "La loi du 25 juillet 1985 protège le titre comme un titre réglementé pénalement sanctionné.",
      },
    ],
  },
];

interface RadarMaitriseS1ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RadarMaitriseS1Modal({
  isOpen,
  onClose,
}: RadarMaitriseS1ModalProps) {
  const [axes] = useState<SousAxeS1[]>(SOUS_AXES_S1_DEFAULTS);
  const [bootcampActive, setBootcampActive] = useState(false);
  const [bootcampIdx, setBootcampIdx] = useState(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [hasValidated, setHasValidated] = useState(false);
  const [bootcampScore, setBootcampScore] = useState(0);

  if (!isOpen) return null;

  // Identify weakest 3 axes
  const weakAxes = [...axes]
    .sort((a, b) => a.niveauMaîtrise - b.niveauMaîtrise)
    .slice(0, 3);

  // Flatten questions from weakest axes for bootcamp
  const bootcampQuestions = weakAxes.flatMap((axis) =>
    axis.questionsRecommandees.map((q) => ({
      ...q,
      axisNom: axis.nom,
      moduleKey: axis.moduleKey,
    })),
  );

  const currentQ = bootcampQuestions[bootcampIdx];

  const handleStartBootcamp = () => {
    setBootcampActive(true);
    setBootcampIdx(0);
    setSelectedAnswerIdx(null);
    setHasValidated(false);
    setBootcampScore(0);
    playClickSound();
    triggerHaptic();
  };

  const handleValidateAnswer = () => {
    if (selectedAnswerIdx === null) return;
    setHasValidated(true);
    const isCorrect = selectedAnswerIdx === currentQ.correctIdx;
    if (isCorrect) {
      setBootcampScore((s) => s + 1);
      playSuccessSound();
    } else {
      playReviewSound();
    }
    triggerHaptic();
  };

  const handleNextQuestion = () => {
    playClickSound();
    triggerHaptic();
    setSelectedAnswerIdx(null);
    setHasValidated(false);
    setBootcampIdx((i) => i + 1);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Radar de Maîtrise S1 — Diagnostic & Entraînement"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-indigo-500/30 bg-slate-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-4 border-b border-slate-800 bg-slate-950/70 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Compass className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-400 truncate">
                  Diagnostic &amp; Entraînement
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium shrink-0 hidden xs:inline">
                  Semestre 1 Global
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-bold text-white truncate">
                Radar de Maîtrise S1 &amp; Bootcamp
              </h2>
            </div>
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6">
          {!bootcampActive ? (
            <div className="space-y-4 sm:space-y-6">
              {/* Radar Grid of 8 Sub-Axes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Niveau de Maîtrise par Sous-Axe Conceptuel :
                  </span>
                  <span className="text-xs text-slate-500 hidden xs:inline">Calculé sur tes entraînements</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {axes.map((ax) => (
                    <div
                      key={ax.id}
                      className="p-3 sm:p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          {ax.moduleKey.toUpperCase()}
                        </span>
                        <span
                          className={`text-xs font-bold font-mono ${
                            ax.niveauMaîtrise >= 70
                              ? "text-emerald-400"
                              : ax.niveauMaîtrise >= 55
                              ? "text-amber-400"
                              : "text-rose-400"
                          }`}
                        >
                          {ax.niveauMaîtrise}%
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-slate-200">
                        {ax.nom}
                      </span>
                      {/* Bar */}
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            ax.niveauMaîtrise >= 70
                              ? "bg-emerald-500"
                              : ax.niveauMaîtrise >= 55
                              ? "bg-amber-500"
                              : "bg-rose-500"
                          }`}
                          style={{ width: `${ax.niveauMaîtrise}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weak spots summary & Bootcamp trigger */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 uppercase">
                    <Target className="h-4 w-4 text-rose-400 shrink-0" />
                    <span>Vos 3 angles morts prioritaires identifiés :</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-0.5 pl-0 list-none m-0">
                    {weakAxes.map((w) => (
                      <li key={w.id} className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                        <span>{w.nom} ({w.niveauMaîtrise}%)</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={handleStartBootcamp}
                  className="w-full sm:w-auto justify-center px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-950/60 flex items-center gap-2 cursor-pointer active:scale-95 transition-all shrink-0 min-h-[44px]"
                >
                  <Zap className="h-4 w-4 text-amber-300 fill-amber-300" />
                  <span>Lancer le Bootcamp (15 min)</span>
                </button>
              </div>
            </div>
          ) : bootcampIdx < bootcampQuestions.length ? (
            /* Bootcamp Question Runner */
            <div className="space-y-4 sm:space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold shrink-0">
                    Q {bootcampIdx + 1} / {bootcampQuestions.length}
                  </span>
                  <span className="text-xs text-slate-400 font-mono truncate">
                    {currentQ.axisNom}
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-400 shrink-0">
                  {bootcampScore} / {bootcampQuestions.length}
                </span>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h3 className="text-xs sm:text-base font-bold text-white leading-snug">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2 sm:space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedAnswerIdx === idx;
                  const isCorrect = hasValidated && idx === currentQ.correctIdx;
                  const isWrong = hasValidated && isSelected && !isCorrect;

                  return (
                    <button
                      key={idx}
                      disabled={hasValidated}
                      onClick={() => {
                        if (hasValidated) return;
                        setSelectedAnswerIdx(idx);
                        playClickSound();
                        triggerHaptic();
                      }}
                      className={`w-full text-left p-3 sm:p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-2.5 sm:gap-3 min-h-[44px] cursor-pointer ${
                        isCorrect
                          ? "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-medium"
                          : isWrong
                          ? "bg-rose-950/40 border-rose-500 text-rose-200"
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
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <p className="m-0 leading-relaxed">{opt}</p>
                    </button>
                  );
                })}
              </div>

              {/* Validation */}
              {!hasValidated ? (
                <div className="flex justify-end pt-2">
                  <button
                    disabled={selectedAnswerIdx === null}
                    onClick={handleValidateAnswer}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-md ${
                      selectedAnswerIdx !== null
                        ? "bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    Valider la réponse
                  </button>
                </div>
              ) : (
                <div className="space-y-4 pt-2 border-t border-slate-800 animate-fadeIn text-xs">
                  <div
                    className={`p-3.5 rounded-xl border ${
                      selectedAnswerIdx === currentQ.correctIdx
                        ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                        : "bg-rose-950/30 border-rose-500/40 text-rose-200"
                    }`}
                  >
                    <p>{currentQ.explication}</p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleNextQuestion}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <span>Question suivante</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Bootcamp Finished */
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-5">
              <div className="inline-flex p-4 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Award className="h-12 w-12" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">
                  Bootcamp Express Réussi !
                </h3>
                <p className="text-sm text-slate-300">
                  Score : <strong className="text-indigo-400 font-mono text-lg">{bootcampScore} / {bootcampQuestions.length}</strong>
                </p>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Vos 3 angles morts prioritaires ont été renforcés. Continuez d&apos;alterner révision active et mémorisation espacée.
                </p>
              </div>

              <button
                onClick={() => setBootcampActive(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Retour au radar général</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

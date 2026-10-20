"use client";

import { useEffect, useRef, useState } from "react";
import {
  X,
  Volume2,
  Headphones,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Trophy,
  Flame,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { playClickSound, playSuccessSound, playFlipSound } from "@/lib/pst/audio-feedback";

interface BlindTestItem {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst123";
  citationMystere: string;
  auteurCorrect: string;
  optionsAuteurs: string[];
  anneeEtOuvrage: string;
  pourquoiEssentiel: string;
}

const BLIND_TEST_POOL: BlindTestItem[] = [
  // --- PST108 ---
  {
    id: "bt-1",
    moduleKey: "pst108",
    citationMystere:
      "C'est en tant qu'il est institué par l'ensemble des rapports sociaux que le discours produit des effets réels : status est magistratus.",
    auteurCorrect: "Pierre Bourdieu",
    optionsAuteurs: ["Pierre Bourdieu", "John L. Austin", "Jürgen Habermas", "Noam Chomsky"],
    anneeEtOuvrage: "Ce que parler veut dire (1982)",
    pourquoiEssentiel:
      "Rompt avec l'illusion d'Austin : le pouvoir des mots vient de l'institution sociale déléguée, pas de la langue.",
  },
  {
    id: "bt-2",
    moduleKey: "pst108",
    citationMystere:
      "La recherche d'une entente rationnelle exempte de contrainte est la condition de possibilité de l'émancipation collective.",
    auteurCorrect: "Jürgen Habermas",
    optionsAuteurs: ["Jürgen Habermas", "Pierre Bourdieu", "Axel Honneth", "Michel Foucault"],
    anneeEtOuvrage: "Théorie de l'agir communicationnel (1981)",
    pourquoiEssentiel:
      "Définit l'agir communicationnel face à l'agir stratégique : la force du meilleur argument sans violence.",
  },
  {
    id: "bt-3",
    moduleKey: "pst108",
    citationMystere:
      "L'insertion professionnelle durable ne s'obtient pas en dressant le demandeur d'emploi à l'employabilité, mais en négociant directement avec l'entreprise sur le travail réel sans tri préalable.",
    auteurCorrect: "Francis Valls & Denis Castra",
    optionsAuteurs: ["Francis Valls & Denis Castra", "Robert Castel", "Claude Dubar", "Alain Wisner"],
    anneeEtOuvrage: "L'insertion professionnelle des personnes en difficulté (Méthode IOD, 2007)",
    pourquoiEssentiel:
      "La charte déontologique IOD : refus du tri et action directe sur l'environnement de travail de droit commun.",
  },
  {
    id: "bt-4",
    moduleKey: "pst108",
    citationMystere:
      "La réification managériale n'est pas une simple erreur de gestion comptable : c'est un oubli actif de la reconnaissance originaire d'autrui comme sujet.",
    auteurCorrect: "Axel Honneth",
    optionsAuteurs: ["Axel Honneth", "Christophe Dejours", "Karl Marx", "Yves Clot"],
    anneeEtOuvrage: "La Réification (2007)",
    pourquoiEssentiel:
      "Complète les 3 sphères de la reconnaissance en expliquant la racine morale du mépris social au travail.",
  },
  {
    id: "bt-5",
    moduleKey: "pst108",
    citationMystere:
      "L'insulte au travail ne blesse pas par son acoustique : elle blesse parce qu'elle réactualise une asymétrie sociale et un stigmate historique déjà institué.",
    auteurCorrect: "Éric Lucy",
    optionsAuteurs: ["Éric Lucy", "John L. Austin", "Didier Eribon", "Pierre Bourdieu"],
    anneeEtOuvrage: "L'insulte au travail (2021)",
    pourquoiEssentiel:
      "Explique la performativité de la violence verbale dans le cours magistral de PST108 au Cnam.",
  },

  // --- PST106 ---
  {
    id: "bt-6",
    moduleKey: "pst106",
    citationMystere:
      "Si les ouvriers appliquaient strictement et à la lettre les consignes prescrites par les ingénieurs, l'atelier s'arrêterait en moins d'une heure.",
    auteurCorrect: "Alain Wisner",
    optionsAuteurs: ["Alain Wisner", "Frederick Taylor", "Yves Clot", "Jacques Leplat"],
    anneeEtOuvrage: "Réflexions sur l'ergonomie (1995)",
    pourquoiEssentiel:
      "Fondement de l'ergonomie de l'activité du Cnam : l'écart irréductible et vital entre tâche prescrite et activité réelle.",
  },
  {
    id: "bt-7",
    moduleKey: "pst106",
    citationMystere:
      "Le genre est le travail d'autrui dans mon travail. Le style est la métamorphose singulière du genre dans la situation vécue.",
    auteurCorrect: "Yves Clot",
    optionsAuteurs: ["Yves Clot", "Lev Vygotski", "Christophe Dejours", "Jacques Leplat"],
    anneeEtOuvrage: "La fonction psychologique du travail (1999)",
    pourquoiEssentiel:
      "Articulation clinique entre mémoire collective du métier (genre) et création de l'opérateur (style).",
  },
  {
    id: "bt-8",
    moduleKey: "pst106",
    citationMystere:
      "Le jugement de beauté ne peut être porté que par les pairs, car eux seuls partagent la connaissance intime des règles de l'art du métier.",
    auteurCorrect: "Christophe Dejours",
    optionsAuteurs: ["Christophe Dejours", "Yves Clot", "Pascale Molinier", "Georges Canguilhem"],
    anneeEtOuvrage: "Souffrance en France (1998)",
    pourquoiEssentiel:
      "Distingue le jugement d'utilité (hiérarchie) du jugement de beauté (pairs, sublimation et santé).",
  },
  {
    id: "bt-9",
    moduleKey: "pst106",
    citationMystere:
      "La tâche est ce qui est à faire ; l'activité est ce qui se fait par un opérateur singulier dans une situation déterminée.",
    auteurCorrect: "Jacques Leplat & Jean-Marie Hoc",
    optionsAuteurs: ["Jacques Leplat & Jean-Marie Hoc", "Alain Wisner", "Yves Clot", "Maurice de Montmollin"],
    anneeEtOuvrage: "Tâche et Activité dans l'analyse psychologique des situations (1983)",
    pourquoiEssentiel:
      "Formule matrice canonique de l'ergonomie cognitive à retenir par cœur pour PST106.",
  },

  // --- PST123 ---
  {
    id: "bt-10",
    moduleKey: "pst123",
    citationMystere:
      "L'identité professionnelle est le résultat d'une double transaction : biographique pour soi et relationnelle pour autrui.",
    auteurCorrect: "Claude Dubar",
    optionsAuteurs: ["Claude Dubar", "Renaud Sainsaulieu", "Pierre Bourdieu", "Erving Goffman"],
    anneeEtOuvrage: "La socialisation : construction des identités sociales et professionnelles (1991)",
    pourquoiEssentiel:
      "Théorie pivot de PST123 : articulation entre identité pour soi et identité pour autrui.",
  },
  {
    id: "bt-11",
    moduleKey: "pst123",
    citationMystere:
      "L'entreprise n'est pas seulement un lieu de production de marchandises, c'est une institution d'apprentissage culturel des relations de pouvoir.",
    auteurCorrect: "Renaud Sainsaulieu",
    optionsAuteurs: ["Renaud Sainsaulieu", "Michel Crozier", "Claude Dubar", "Max Weber"],
    anneeEtOuvrage: "L'identité au travail (1977)",
    pourquoiEssentiel:
      "Les 4 modèles relationnels (fusionnel, négociateur, retrait, affinitaire) issus de la structure du pouvoir.",
  },
  {
    id: "bt-12",
    moduleKey: "pst123",
    citationMystere:
      "La désaffiliation n'est pas un état de marginalité figée, mais une trajectoire de décrochage conjointe du travail stable et du réseau relationnel.",
    auteurCorrect: "Robert Castel",
    optionsAuteurs: ["Robert Castel", "Serge Paugam", "Pierre Bourdieu", "Claude Dubar"],
    anneeEtOuvrage: "Les Métamorphoses de la question sociale (1995)",
    pourquoiEssentiel:
      "Les 3 zones (intégration, vulnérabilité, désaffiliation) remplaçant le terme trompeur d'exclusion.",
  },
  {
    id: "bt-13",
    moduleKey: "pst123",
    citationMystere:
      "La profession de psychologue du travail en France s'est construite au prix d'une balkanisation historique entre ergonomes, sélectionneurs psychotechniciens et cliniciens.",
    auteurCorrect: "Thomas Le Bianic",
    optionsAuteurs: ["Thomas Le Bianic", "Alain Wisner", "Élisabeth Lucy", "Jean-Marie Faverge"],
    anneeEtOuvrage: "Les psychologues du travail en France (2004)",
    pourquoiEssentiel:
      "Socio-histoire de la profession et étapes vers la protection du titre par la Loi du 25 juillet 1985.",
  },
];

interface BlindTestAudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

export function BlindTestAudioModal({
  isOpen,
  onClose,
  defaultModule,
}: BlindTestAudioModalProps) {
  const [selectedModule, setSelectedModule] = useState<string>(
    defaultModule && /^pst(106|108|123)$/.test(defaultModule) ? defaultModule : "all",
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [chosenAuthor, setChosenAuthor] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const filteredPool = BLIND_TEST_POOL.filter((item) =>
    selectedModule === "all" ? true : item.moduleKey === selectedModule,
  );

  const currentItem = filteredPool[currentIndex] || filteredPool[0]!;

  if (!isOpen) return null;

  function speakCitation(text: string) {
    if (typeof window === "undefined") return;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "fr-FR";
      utterance.rate = 0.95;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback custom event
      window.dispatchEvent(
        new CustomEvent("pst:play-audio", {
          detail: {
            title: "Blind-Test Citation Mystère",
            author: "Devinez l'auteur !",
            text,
          },
        }),
      );
    }
  }

  function handlePlayCurrentAudio() {
    playClickSound();
    speakCitation(currentItem.citationMystere);
  }

  function handleChooseAuthor(author: string) {
    if (chosenAuthor !== null) return;
    setChosenAuthor(author);

    const isCorrect = author === currentItem.auteurCorrect;
    if (isCorrect) {
      playSuccessSound();
      const bonus = streak >= 2 ? 15 : 10;
      setScore((s) => s + bonus);
      setStreak((st) => st + 1);
      window.dispatchEvent(new CustomEvent("pst:detective-solved"));
    } else {
      playFlipSound();
      setStreak(0);
    }
  }

  function handleNext() {
    playClickSound();
    setChosenAuthor(null);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);

    if (currentIndex < filteredPool.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsFinished(true);
    }
  }

  function handleRestart() {
    playSuccessSound();
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setChosenAuthor(null);
    setIsFinished(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header iOS */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-amber-500/10">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-white shadow-md">
              <Headphones className="size-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Blind-Test Audio des Auteurs</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-800 dark:text-violet-200 font-extrabold uppercase">
                  Quiz Sonore
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Écoutez la phrase mystère et identifiez l&apos;auteur sans regarder ses notes
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {!isFinished ? (
            <div className="space-y-4">
              {/* Score & Combo Bar */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs">
                <span className="font-mono font-bold text-slate-500">
                  Question {currentIndex + 1} / {filteredPool.length}
                </span>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 font-bold text-amber-600">
                    <Trophy className="size-3.5" />
                    <span>{score} pts</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-rose-600">
                    <Flame className={`size-3.5 ${streak >= 2 ? "animate-bounce" : ""}`} />
                    <span>Streak x{streak}</span>
                  </div>
                </div>
              </div>

              {/* Audio Player Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-amber-500/10 border-2 border-violet-500/30 text-center space-y-4 shadow-sm">
                <div className="inline-flex items-center justify-center size-16 rounded-full bg-violet-600 text-white shadow-md">
                  <Volume2 className={`size-8 ${isPlayingAudio ? "animate-pulse scale-110" : ""}`} />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-violet-700 dark:text-violet-300 font-bold block">
                    {currentItem.moduleKey.toUpperCase()} · Citation Mystère
                  </span>
                  <p className="text-sm sm:text-base font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed max-w-lg mx-auto">
                    « {currentItem.citationMystere} »
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handlePlayCurrentAudio}
                  className="px-5 py-2 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="size-3.5" />
                  <span>{isPlayingAudio ? "Lecture en cours..." : "Réécouter la voix"}</span>
                </button>
              </div>

              {/* 4 Authors Options */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Qui est l&apos;auteur de cette thèse ?
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentItem.optionsAuteurs.map((author, idx) => {
                    const isSelected = chosenAuthor === author;
                    const isDone = chosenAuthor !== null;
                    const isCorrect = author === currentItem.auteurCorrect;

                    let btnStyle =
                      "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-violet-400 text-slate-900 dark:text-slate-100";

                    if (isDone) {
                      if (isCorrect) {
                        btnStyle =
                          "bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/30";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-200 font-bold";
                      } else {
                        btnStyle = "opacity-40 border-transparent";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={isDone}
                        onClick={() => handleChooseAuthor(author)}
                        className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-2 cursor-pointer active:scale-98 ${btnStyle}`}
                      >
                        <span>{author}</span>
                        {isDone && isCorrect && <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />}
                        {isDone && isSelected && !isCorrect && <XCircle className="size-4 text-rose-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reveal Explanation Card */}
              {chosenAuthor !== null && (
                <div className="p-4 rounded-3xl bg-violet-50/70 dark:bg-violet-950/40 border border-violet-200/80 dark:border-violet-900/60 text-xs text-slate-800 dark:text-slate-200 animate-fadeIn space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-violet-700 dark:text-violet-300 flex items-center gap-1.5">
                      <Sparkles className="size-3.5 text-amber-500" />
                      Ouvrage de référence : {currentItem.anneeEtOuvrage}
                    </span>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-sm flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <span>Suivant</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                  <p className="leading-relaxed m-0 text-slate-600 dark:text-slate-300">
                    <b>Pourquoi c&apos;est capital :</b> {currentItem.pourquoiEssentiel}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Finished Screen */
            <div className="py-6 text-center space-y-5 animate-fadeIn">
              <div className="inline-flex size-20 rounded-3xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white items-center justify-center shadow-lg">
                <Trophy className="size-10 animate-bounce" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                  Blind-Test Terminé !
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Votre mémoire auditive des auteurs et théories Cnam est affûtée
                </p>
              </div>

              <div className="max-w-xs mx-auto p-4 rounded-3xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Score Final</span>
                <span className="text-3xl font-black text-violet-600">{score} pts</span>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="px-6 py-2.5 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="size-4" />
                  <span>Rejouer</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm hover:bg-slate-300 transition-all cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

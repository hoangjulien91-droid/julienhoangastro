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
  Sparkles,
  BookOpen,
  Scale,
  Users,
  Clock,
  ChevronRight,
  FileCheck,
  Check,
} from "lucide-react";
import { playClickSound, playSuccessSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface PstOralDefenseSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type JuryRole = "president" | "chercheur" | "praticien";

interface JuryQuestion {
  id: string;
  role: JuryRole;
  roleLabel: string;
  ueTag: string;
  question: string;
  underlyingTension: string;
  fatalTrap: string;
  expectedStructure: string[];
  keyReferences: string;
}

const JURY_QUESTIONS: JuryQuestion[] = [
  {
    id: "q_commande_demande",
    role: "president",
    roleLabel: "Président du Jury (Chaire PST CNAM)",
    ueTag: "PST106 / Mémoire",
    question:
      "Votre mémoire part d'une commande de la direction portant sur « la résistance au changement et le stress ». Comment démontrez-vous concrètement que vous n'êtes pas resté captif de cette commande managériale ?",
    underlyingTension:
      "Vérifier la capacité à opérer le déplacement épistémologique fondamental du CNAM : passer d'une psychologisation individuelle de la commande à une co-construction de la demande centrée sur le travail réel.",
    fatalTrap:
      "Répondre qu'on a « écouté les salariés avec bienveillance » ou qu'on a fait passer un questionnaire de satisfaction pour compléter la demande de la direction.",
    expectedStructure: [
      "Exposer l'instruction de la commande initiale et les implicites gestionnaires qu'elle véhiculait.",
      "Décrire les premières observations ouvertes en situation réelle ayant révélé des contradictions organisationnelles (écart prescrit / réel).",
      "Montrer comment la reformulation de la demande a été validée contradictoirement en Comité de Pilotage (COPIL) paritaire.",
    ],
    keyReferences: "Wisner (1995), Daniellou (2005), Clot (2008), Leplat & Hoc (1983)",
  },
  {
    id: "q_conseil_vs_clinique",
    role: "president",
    roleLabel: "Président du Jury (Chaire PST CNAM)",
    ueTag: "PST106 / PST123",
    question:
      "En lisant vos préconisations finales, qu'est-ce qui distingue votre intervention de psychologue du travail d'un audit réalisé par un cabinet de conseil en organisation ?",
    underlyingTension:
      "Évaluer la posture clinique : le psychologue du travail n'est pas un expert prescripteur qui substitue ses normes à celles des opérateurs, mais un tiers méthodologique qui restaure le pouvoir d'agir des collectifs.",
    fatalTrap:
      "Défendre la qualité technique de son « catalogue de recommandations » livré clés en main à la direction.",
    expectedStructure: [
      "Rappeler que l'expert prescrit de l'extérieur alors que le clinicien institue un cadre où les professionnels deviennent auteurs de l'analyse de leur propre activité.",
      "Démontrer que les transformations produites sont issues des controverses de métier (autoconfrontations, délibérations) et non d'un diagnostic solitaire.",
      "Souligner l'effet développemental durable : la pérennisation de la fonction délibérative du collectif après le départ de l'intervenant.",
    ],
    keyReferences: "Clot (1999, 2008), Oddone (1981), Dejours (1993)",
  },
  {
    id: "q_clot_dejours_tension",
    role: "chercheur",
    roleLabel: "Enseignant-Chercheur (Clinique & PDT)",
    ueTag: "PST106 / PST120",
    question:
      "Vous mobilisez à la fois Yves Clot et Christophe Dejours dans votre revue de littérature. N'y a-t-il pas une contradiction épistémologique majeure entre la clinique de l'activité et la psychodynamique du travail ?",
    underlyingTension:
      "Tester la rigueur théorique (anti-éclectisme mou) : savoir articuler deux paradigmes sans gommer leur divergence sur le statut de l'action, de la défense et du développement.",
    fatalTrap:
      "Affirmer que « les deux auteurs disent au fond la même chose sur la souffrance au travail ».",
    expectedStructure: [
      "Identifier explicitement le point de convergence : la centralité du réel (ce qui résiste à la maîtrise) et le refus du modèle positiviste du stress.",
      "Assumer la controverse théorique : la PDT (Dejours) analyse la souffrance, les stratégies collectives de défense et la reconnaissance par l'écoute de la parole, tandis que la Clinique de l'activité (Clot, d'inspiration vygotskienne) cible le développement du pouvoir d'agir par la remise en mouvement du genre professionnel sur les traces de l'activité.",
      "Justifier comment votre terrain articulait ces deux niveaux d'analyse sans les confondre.",
    ],
    keyReferences: "Clot (2008), Dejours (2000), Vygotski (1934), Canguilhem (1966)",
  },
  {
    id: "q_genre_style",
    role: "chercheur",
    roleLabel: "Enseignant-Chercheur (Ergonomie & Activité)",
    ueTag: "PST106 / PST120",
    question:
      "Dans vos extraits d'autoconfrontation, vous qualifiez un geste singulier d'un opérateur de « genre professionnel ». Ne confondez-vous pas le style individuel et le genre collectif ?",
    underlyingTension:
      "Vérifier la maîtrise précise des quatre instances du métier chez Clot (impersonnelle, interpersonnelle, transpersonnelle, personnelle).",
    fatalTrap:
      "Utiliser « genre » comme synonyme vague d'habitude individuelle ou de culture d'entreprise prescrite.",
    expectedStructure: [
      "Définir le genre professionnel comme la mémoire transpersonnelle et les obligations implicites partagées par les pairs pour réussir à travailler malgré les aléas.",
      "Définir le style comme l'appropriation singulière et la retouche personnelle du genre par un sujet en situation.",
      "Montrer comment la controverse en autoconfrontation croisée fait justement passer ce geste du statut d'écart individuel (style) à une ressource débattue par le collectif (genre).",
    ],
    keyReferences: "Clot & Faïta (2000), Bakhtine (1984)",
  },
  {
    id: "q_genese_instrumentale",
    role: "chercheur",
    roleLabel: "Enseignant-Chercheur (Transformations Digitales)",
    ueTag: "PST124",
    question:
      "Vous observez que les salariés utilisent un fichier Excel parallèle au lieu du nouvel ERP. Pourquoi parlez-vous de « catachrèse » et non de refus du changement ?",
    underlyingTension:
      "Évaluer la maîtrise de l'approche anthropocentrique et de la théorie de la genèse instrumentale (Rabardel).",
    fatalTrap:
      "Considérer le contournement comme une simple « mauvaise formation à l'outil » qu'il suffirait de corriger par un guide utilisateur.",
    expectedStructure: [
      "Distinguer l'artefact technique (le logiciel prescrit) de l'instrument psychologique et technique (l'artefact couplé aux schèmes d'utilisation du sujet).",
      "Définir la catachrèse (instrumentalisation) comme un détournement fonctionnel créatif permettant à l'opérateur de pallier la rigidité de l'artefact pour préserver les critères de qualité du travail réel.",
      "Démontrer que ce fichier parallèle est un indicateur précieux des besoins de régulation ignorés lors de la conception technocentrique de l'ERP.",
    ],
    keyReferences: "Rabardel (1995), Bobillier Chaumon (2016)",
  },
  {
    id: "q_secret_pression_drh",
    role: "praticien",
    roleLabel: "Psychologue du Travail Praticien",
    ueTag: "PST123 / Déontologie",
    question:
      "Si, à l'issue de votre intervention, le DRH qui a financé votre mission vous demande d'identifier les deux salariés les plus fragiles de l'équipe pour « les protéger », que faites-vous ?",
    underlyingTension:
      "Vérifier l'intransigeance déontologique face au piège de la « bienveillance managériale » violant le secret professionnel.",
    fatalTrap:
      "Accepter de donner des « indices » à l'oral ou de transmettre une synthèse par petits groupes de 2 personnes permettant la ré-identification.",
    expectedStructure: [
      "Opposer un refus absolu et immédiat fondé sur le Principe I (Respect des droits de la personne) et les Articles 1, 7 et 19 du Code de déontologie (2021).",
      "Rappeler que l'indépendance professionnelle (Art. 3) et le secret s'appliquent quel que soit le financeur de l'intervention.",
      "Expliquer à la direction que la protection de la santé psychique passe par le traitement des facteurs organisationnels restitués anonymement au COPIL, et orienter individuellement les salariés volontaires vers le médecin du travail (SPST).",
    ],
    keyReferences: "Code de déontologie des psychologues (1996/2021), Art. L. 4121-1 Code du travail",
  },
  {
    id: "q_activite_empechee_stagiaire",
    role: "praticien",
    roleLabel: "Psychologue du Travail Praticien",
    ueTag: "Réflexivité RNCP 7",
    question:
      "Vous parlez beaucoup de l'activité empêchée des opérateurs. Mais quelle a été VOTRE propre activité empêchée de psychologue durant cette intervention ?",
    underlyingTension:
      "Tester l'authenticité de la posture réflexive : un praticien de niveau 7 sait analyser ses propres impasses, renoncements et compromis méthodologiques sur le terrain.",
    fatalTrap:
      "Présenter une intervention lisse, linéaire et sans accroc où tout s'est déroulé exactement comme prévu dans les manuels.",
    expectedStructure: [
      "Identifier honnêtement une limite rencontrée sur le terrain (ex: impossibilité de filmer certaines séquences, calendrier resserré bloquant un second cycle d'autoconfrontation croisée, contournement du COPIL par un cadre).",
      "Analyser ce que cet empêchement révèle du fonctionnement même de l'organisation cliente (le refus ou l'obstacle fait partie du diagnostic clinique).",
      "Expliciter les régulations méthodologiques mises en œuvre pour sauvegarder le cadre éthique et dialogique.",
    ],
    keyReferences: "Clot (2008), Schön (1983) — Le praticien réflexif",
  },
];

interface RncpCriterion {
  id: string;
  title: string;
  points: number;
  desc: string;
  indicators: string[];
}

const RNCP_CRITERIA: RncpCriterion[] = [
  {
    id: "c1",
    title: "1. Élucidation de la commande & Diagnostic situé",
    points: 5,
    desc: "Capacité à instruire la commande managériale initiale, repérer les implicites gestionnaires et co-construire une demande paritaire centrée sur le travail réel.",
    indicators: [
      "Distinction nette entre symptôme individuel/managérial et déterminants organisationnels de l'activité",
      "Mise en place d'un Comité de Pilotage paritaire garantissant l'indépendance de l'analyse",
      "Observations directes documentées (traces de l'activité, verbatims, incidents critiques)",
    ],
  },
  {
    id: "c2",
    title: "2. Dispositif méthodologique & Éthique déontologique",
    points: 5,
    desc: "Rigueur des méthodes cliniques déployées (autoconfrontation, instruction au sosie, délibération) et respect strict du Code de Déontologie des Psychologues.",
    indicators: [
      "Justification située du choix des outils méthodologiques (Clot, Oddone, Wisner)",
      "Cadre éthique : secret professionnel, consentement libre et éclairé, anonymisation",
      "Restitution contradictoire préalable aux opérateurs avant tout partage institutionnel",
    ],
  },
  {
    id: "c3",
    title: "3. Maîtrise conceptuelle & Ruptures épistémologiques",
    points: 5,
    desc: "Convocation précise des concepts fondateurs de la chaire Cnam, refus de l'éclectisme mou et tenue rigoureuse des controverses théoriques.",
    indicators: [
      "Non-confusion épistémologique entre Clinique de l'Activité (Clot) et Psychodynamique (Dejours)",
      "Mobilisation articulée : pouvoir d'agir, genre/style, défenses collectives, reconnaissance",
      "Capacité à répondre aux objections du jury avec précision conceptuelle et recul critique",
    ],
  },
  {
    id: "c4",
    title: "4. Gestion du temps (15 min), Aisance oratoire & Réflexivité",
    points: 5,
    desc: "Respect strict du timing officiel (15 min exposé sans coupure), qualité de l'expression orale et capacité d'analyse réflexive sur sa propre posture.",
    indicators: [
      "Maîtrise du rythme : 3 min commande, 4 min méthode, 5 min clinique, 3 min perspectives",
      "Clarté d'élocution, projection de la voix, posture professionnelle de psychologue assumée",
      "Distance critique par rapport à ses propres réussites et limites d'intervention",
    ],
  },
];

const STORAGE_KEY = "pst_oral_defense_v1";
const EVAL_STORAGE_KEY = "pst_oral_defense_eval_v1";

const PHASE_1_SECONDS = 15 * 60; // 15 min exposé
const PHASE_2_SECONDS = 30 * 60; // 30 min débat jury

const DEFAULT_SCORES: Record<string, number> = {
  c1: 5,
  c2: 5,
  c3: 4,
  c4: 5,
};

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
  const [evalScores, setEvalScores] = useState<Record<string, number>>(DEFAULT_SCORES);
  const [showAnswer, setShowAnswer] = useState(true);

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
    0
  );

  const getScoreVerdict = (score: number) => {
    if (score >= 16) {
      return {
        label: "Très Bien · Maîtrise Experte RNCP 7",
        badge: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
      };
    }
    if (score >= 14) {
      return {
        label: "Bien · Solide Posture Clinique",
        badge: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30",
      };
    }
    if (score >= 12) {
      return {
        label: "Assez Bien · Conforme aux exigences",
        badge: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
      };
    }
    if (score >= 10) {
      return {
        label: "Admis · Seuil minimal RNCP 7",
        badge: "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30",
      };
    }
    return {
      label: "Ajourné · Des axes critiques à reprendre",
      badge: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
    };
  };

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
        <div className="px-5 py-3.5 border-b border-border/80 flex flex-wrap items-center justify-between gap-3 bg-muted/20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Award className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30">
                  GRAND JURY RNCP NIVEAU 7 · SOUTENANCE CNAM
                </span>
                <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline">
                  {masteredCount} / {JURY_QUESTIONS.length} controverses maîtrisées
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-foreground m-0 mt-0.5">
                Simulateur de Soutenance Orale &amp; Contre-Interrogatoire du Jury
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center rounded-xl border border-border bg-background p-1 gap-1">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setViewMode("questions");
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                  viewMode === "questions"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users className="size-3.5" />
                <span>Questions Jury</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setViewMode("grille");
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                  viewMode === "grille"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileCheck className="size-3.5" />
                <span>Grille RNCP 7 ({totalScore}/20)</span>
              </button>
            </div>

            {/* Official 2-Phase Timer Bar */}
            <div className="flex items-center rounded-xl border border-border bg-background p-1 gap-1">
              <button
                type="button"
                onClick={() => switchPhase("expose")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-colors cursor-pointer ${
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
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                  phase === "jury"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                2. Jury (30m)
              </button>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-background">
              <Clock
                className={`size-4 ${
                  secondsLeft <= 180
                    ? "text-rose-500 animate-pulse"
                    : "text-amber-500"
                }`}
              />
              <span className="font-mono text-sm font-black text-foreground">
                {formatTime(secondsLeft)}
              </span>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setIsRunning((r) => !r);
                }}
                className="p-1 rounded-md hover:bg-muted text-foreground cursor-pointer"
                title={isRunning ? "Mettre en pause" : "Démarrer le chronomètre"}
              >
                {isRunning ? (
                  <Pause className="size-3.5" />
                ) : (
                  <Play className="size-3.5" />
                )}
              </button>
              <button
                type="button"
                onClick={resetTimer}
                className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                title="Réinitialiser le chronomètre"
              >
                <RotateCcw className="size-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {viewMode === "questions" ? (
          <>
            {/* Phase 1 Pacing Milestones Banner */}
            <div className="px-5 py-2.5 border-b border-border/70 bg-muted/10 grid grid-cols-2 lg:grid-cols-4 gap-2 text-[11px] shrink-0">
              <div className="p-2 rounded-lg border border-border/70 bg-background/80">
                <span className="font-mono font-bold text-accent block">
                  00:00 → 03:00 (3 min)
                </span>
                <span className="text-muted-foreground">
                  De la commande managériale à la demande co-construite
                </span>
              </div>
              <div className="p-2 rounded-lg border border-border/70 bg-background/80">
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 block">
                  03:00 → 07:00 (4 min)
                </span>
                <span className="text-muted-foreground">
                  Problématique théorique &amp; Dispositif méthodologique situé
                </span>
              </div>
              <div className="p-2 rounded-lg border border-border/70 bg-background/80">
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 block">
                  07:00 → 12:00 (5 min)
                </span>
                <span className="text-muted-foreground">
                  Analyse clinique des traces, verbatims &amp; controverses
                </span>
              </div>
              <div className="p-2 rounded-lg border border-border/70 bg-background/80">
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400 block">
                  12:00 → 15:00 (3 min)
                </span>
                <span className="text-muted-foreground">
                  Transformations instituées &amp; Posture réflexive du praticien
                </span>
              </div>
            </div>

            {/* Main 2-Column Body */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Jury Questions List */}
              <div className="lg:col-span-5 border-r border-border/80 flex flex-col overflow-hidden bg-muted/10">
                <div className="p-3 border-b border-border/70 flex flex-wrap items-center gap-1.5 shrink-0">
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
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-colors cursor-pointer ${
                        roleFilter === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-background hover:bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2">
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
              <div className="lg:col-span-7 overflow-y-auto p-5 space-y-4">
                <div className="p-4 rounded-2xl border border-border bg-muted/20 space-y-2">
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
                    Grille d'Analyse &amp; Réponse Attendue par le Jury
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAnswer((s) => !s)}
                    className="text-xs font-mono font-semibold text-accent hover:underline cursor-pointer"
                  >
                    {showAnswer ? "Masquer le corrigé (Entraînement à blanc)" : "Afficher le corrigé"}
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
                        <span>Appuis théoriques à citer à l'oral :</span>
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
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Rubric Score Summary Header Card */}
            <div className="p-5 rounded-2xl border border-border bg-muted/20 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-foreground">
                    {totalScore} <span className="text-muted-foreground text-lg sm:text-xl font-normal">/ 20 pts</span>
                  </span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold border ${verdict.badge}`}
                  >
                    {verdict.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed m-0">
                  Grille d'évaluation officielle · Titre RNCP Niveau 7 Psychologue du Travail (4 critères pondérés à 5 points).
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetScores}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-background hover:bg-muted text-xs font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                <span>Réinitialiser les notes</span>
              </button>
            </div>

            {/* Criteria Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RNCP_CRITERIA.map((crit) => {
                const currentScore = evalScores[crit.id] ?? 0;
                return (
                  <div
                    key={crit.id}
                    className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between gap-4 shadow-xs hover:border-accent/40 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-sm font-serif font-bold text-foreground m-0">
                          {crit.title}
                        </h3>
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/20 shrink-0">
                          {currentScore} / {crit.points} pts
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed m-0">
                        {crit.desc}
                      </p>

                      <div className="pt-2 border-t border-border/60 space-y-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-bold block">
                          Indicateurs observables :
                        </span>
                        <ul className="space-y-1.5 m-0 pl-0 list-none">
                          {crit.indicators.map((ind, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs text-foreground/90 leading-relaxed"
                            >
                              <div className="size-3.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="size-2.5" />
                              </div>
                              <span>{ind}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Interactive Score Picker (0 to 5) */}
                    <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-muted-foreground font-semibold">
                        Note attribuée :
                      </span>
                      <div className="flex items-center gap-1">
                        {[0, 1, 2, 3, 4, 5].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => handleScoreChange(crit.id, val)}
                            className={`size-8 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                              currentScore === val
                                ? "bg-primary text-primary-foreground shadow-xs scale-105"
                                : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/70"
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Pedagogical Callout */}
            <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 flex items-start gap-3 text-xs leading-relaxed">
              <Sparkles className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-serif text-foreground block mb-0.5">
                  Règle d'or de la Chaire PST pour l'obtention du Titre RNCP 7 :
                </strong>
                <span className="text-muted-foreground">
                  Le jury sanctionne immédiatement toute posture de consultant prescripteur ou de prise en charge psychologique individuelle de la souffrance. Le cœur de l'évaluation réside dans l'élucidation de l'écart prescrit/réel, l'analyse des controverses de métier et la restauration du pouvoir d'agir collectif des opérateurs.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
      </div>
    </div>
  );
};
export default PstOralDefenseSimulatorModal;

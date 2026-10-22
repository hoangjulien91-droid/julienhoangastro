"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  X,
  Zap,
  Timer,
  Trophy,
  Flame,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Headphones,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playFlipSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface SpeedRunQuestion {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst120" | "pst123" | "pst124";
  question: string;
  options: string[];
  correctIdx: number;
  explication18_20: string;
  auteurRef: string;
}

const SPEEDRUN_BANK: SpeedRunQuestion[] = [
  // --- PST108 ---
  {
    id: "sr-108-1",
    moduleKey: "pst108",
    question:
      "Selon Bourdieu, d'où provient l'efficacité d'un énoncé performatif (« Status est magistratus ») ?",
    options: [
      "De la syntaxe et de la grammaire interne des mots (Austin)",
      "De l'autorité institutionnelle déléguée au locuteur autorisé",
      "De la force psychologique et du charisme naturel du locuteur",
      "Du niveau de vocabulaire soutenu utilisé",
    ],
    correctIdx: 1,
    explication18_20:
      "Bourdieu rompt avec l'illusion internaliste d'Austin : les mots ne tirent pas leur pouvoir de la langue, mais des rapports de force sociaux et de la délégation statutaire (Status est magistratus).",
    auteurRef: "Pierre Bourdieu (1982)",
  },
  {
    id: "sr-108-2",
    moduleKey: "pst108",
    question:
      "Dans la Méthode IOD (Castra & Valls), quelle est la règle déontologique cardinale ?",
    options: [
      "Évaluer au préalable les compétences du candidat par des tests psychotechniques",
      "Refus absolu de tout tri préalable et négociation directe avec l'entreprise",
      "Multiplier les stages d'employabilité pour adapter le candidat",
      "Réserver les offres aux candidats les plus motivés",
    ],
    correctIdx: 1,
    explication18_20:
      "La méthode IOD repose sur le refus éthique du tri des précaires : l'action porte sur le milieu de travail réel et la médiation continue, sans conditionnement préalable.",
    auteurRef: "Francis Valls & Denis Castra (2007)",
  },
  {
    id: "sr-108-3",
    moduleKey: "pst108",
    question:
      "Pour Jürgen Habermas, qu'est-ce qui caractérise l'« agir stratégique masqué » ?",
    options: [
      "Une recherche sincère d'entente mutuelle où chacun est libre de contredire",
      "La dissimulation d'une volonté d'influence sous le vernis d'une fausse concertation",
      "Un conflit ouvert et violent entre syndicats et direction",
      "L'usage d'un langage technique incompréhensible",
    ],
    correctIdx: 1,
    explication18_20:
      "L'agir stratégique masqué est une manipulation : le management fait semblant d'ouvrir la délibération, mais le projet est déjà figé pour garantir son propre succès.",
    auteurRef: "Jürgen Habermas (1981)",
  },
  {
    id: "sr-108-4",
    moduleKey: "pst108",
    question:
      "Pourquoi l'insulte au travail est-elle performative selon Éric Lucy (2021) ?",
    options: [
      "Parce qu'elle fait du bruit dans l'atelier",
      "Parce qu'elle réactive un rapport social d'asymétrie et un stigmate historique institué",
      "Parce qu'elle enfreint le règlement intérieur de l'entreprise",
      "Parce qu'elle blesse l'amour-propre narcissique individuel",
    ],
    correctIdx: 1,
    explication18_20:
      "L'insulte n'est pas un simple dérapage lexical : elle tire sa violence de ce qu'elle assigne la victime à une catégorie sociale dominée déjà historiquement constituée.",
    auteurRef: "Éric Lucy (2021)",
  },
  {
    id: "sr-108-5",
    moduleKey: "pst108",
    question:
      "Pour Axel Honneth, quelles sont les 3 sphères de la reconnaissance morale ?",
    options: [
      "Le salaire, la prime, l'avancement",
      "L'amour (confiance en soi), le droit (respect de soi), la solidarité/estime sociale",
      "L'évaluation hiérarchique, le contrôle qualité, l'audit RH",
      "La famille, le parti politique, l'association sportive",
    ],
    correctIdx: 1,
    explication18_20:
      "Honneth articule 3 sphères : intime (amour ➔ confiance en soi), juridique (droit ➔ respect de soi), sociale (contribution utile ➔ estime de soi).",
    auteurRef: "Axel Honneth (1992)",
  },

  // --- PST106 ---
  {
    id: "sr-106-1",
    moduleKey: "pst106",
    question:
      "En ergonomie de l'activité (Alain Wisner), quelle distinction est fondatrice ?",
    options: [
      "Travail manuel vs Travail intellectuel",
      "Tâche prescrite (ce qui est demandé) vs Activité réelle (ce qui se fait pour compenser le réel)",
      "Travail rémunéré vs Bénévolat",
      "Compétence technique vs Savoir-être comportemental",
    ],
    correctIdx: 1,
    explication18_20:
      "L'écart irréductible entre prescrit et réel est le cœur de l'ergonomie : l'activité réelle est toujours une création opératoire face aux aléas que la consigne ne peut prévoir.",
    auteurRef: "Alain Wisner (1995)",
  },
  {
    id: "sr-106-2",
    moduleKey: "pst106",
    question:
      "Dans la clinique de l'activité (Yves Clot), qu'est-ce que l'« activité empêchée » ?",
    options: [
      "L'interdiction de faire grève décidée par la préfecture",
      "La souffrance de ne pas pouvoir réaliser un travail de qualité selon les règles de l'art",
      "Une panne informatique qui bloque un écran pendant 10 minutes",
      "Le manque de diplôme pour accéder à une promotion",
    ],
    correctIdx: 1,
    explication18_20:
      "L'activité empêchée est le poison de la santé au travail : être contraint de saboter son propre travail par manque de temps ou sous pression chiffrée.",
    auteurRef: "Yves Clot (2010)",
  },
  {
    id: "sr-106-3",
    moduleKey: "pst106",
    question:
      "Selon Christophe Dejours, qui est le SEUL habilité à porter le « jugement de beauté » ?",
    options: [
      "Le Directeur des Ressources Humaines",
      "Le client ou bénéficiaire final du service",
      "Les pairs (collègues) qui partagent la connaissance intime des règles de l'art",
      "L'expert-comptable lors du bilan annuel",
    ],
    correctIdx: 2,
    explication18_20:
      "Seuls les pairs peuvent juger de la beauté d'un geste professionnel car eux seuls mesurent la difficulté réelle surmontée et le respect des règles de l'art.",
    auteurRef: "Christophe Dejours (1993)",
  },
  {
    id: "sr-106-4",
    moduleKey: "pst106",
    question:
      "Quelle est la définition du « Genre professionnel » pour Yves Clot ?",
    options: [
      "La répartition hommes/femmes dans une filière professionnelle",
      "La mémoire collective et vivante des règles officieuses et ficelles partagées par un collectif",
      "La description écrite du poste dans la convention collective",
      "Le règlement de sécurité officiel affiché à l'entrée de l'usine",
    ],
    correctIdx: 1,
    explication18_20:
      "Le genre est le répondant social du métier, le 'travail d'autrui dans mon travail' qui évite à l'opérateur de tout réinventer seul face au réel.",
    auteurRef: "Yves Clot (1999)",
  },
  {
    id: "sr-106-5",
    moduleKey: "pst106",
    question:
      "Qu'est-ce que l'« auto-confrontation croisée » mise au point par Clot et Faïta ?",
    options: [
      "Un entretien disciplinaire face à deux cadres supérieurs",
      "Le débat entre deux collègues visionnant et confrontant leurs différentes manières de faire",
      "Un questionnaire d'auto-évaluation noté de 1 à 10",
      "Une confrontation entre le salarié et le médecin du travail",
    ],
    correctIdx: 1,
    explication18_20:
      "En voyant un collègue faire autrement sur la même tâche, l'opérateur prend conscience de ses propres gestes et réactive la controverse professionnelle sur le travail bien fait.",
    auteurRef: "Yves Clot & Daniel Faïta (2000)",
  },

  // --- PST123 ---
  {
    id: "sr-123-1",
    moduleKey: "pst123",
    question:
      "Pour Claude Dubar (1991), l'identité est le résultat de quelle tension permanente ?",
    options: [
      "Tension entre salaire brut et salaire net",
      "Double transaction : transaction biographique (pour soi) et transaction relationnelle (pour autrui)",
      "Tension entre diplôme initial et expérience acquise",
      "Tension entre ambitions personnelles et vie familiale",
    ],
    correctIdx: 1,
    explication18_20:
      "L'identité n'est jamais figée : elle s'élabore en permanence entre qui je dis être dans mon histoire (pour soi) et ce que l'institution m'attribue comme étiquette (pour autrui).",
    auteurRef: "Claude Dubar (1991)",
  },
  {
    id: "sr-123-2",
    moduleKey: "pst123",
    question:
      "Dans les 4 modèles de pouvoir de Renaud Sainsaulieu, quel est le modèle des OS ouvriers ?",
    options: [
      "Le modèle négociateur fondé sur l'expertise",
      "Le modèle fusionnel fondé sur la camaraderie et l'égalitarisme de bande sans divergence",
      "Le modèle affinitaire fondé sur la séduction hiérarchique",
      "Le modèle du retrait fondé sur la vie de quartier",
    ],
    correctIdx: 1,
    explication18_20:
      "Privés de pouvoir sur leur machine, les ouvriers spécialisés font bloc dans un modèle fusionnel solidaire où toute différence individuelle est perçue comme une trahison.",
    auteurRef: "Renaud Sainsaulieu (1977)",
  },
  {
    id: "sr-123-3",
    moduleKey: "pst123",
    question:
      "Quelle loi protège en France le titre et l'exercice de psychologue ?",
    options: [
      "La Loi du 11 février 2005",
      "La Loi n° 85-772 du 25 juillet 1985 (article 44)",
      "Le décret du 14 mars 1965",
      "La directive européenne du 1er janvier 2000",
    ],
    correctIdx: 1,
    explication18_20:
      "La Loi du 25 juillet 1985 consacre le titre de psychologue (Titre RNCP niveau 7 du Cnam ou Master 2 + stage) et protège son autonomie technique face aux employeurs.",
    auteurRef: "Législation & Déontologie (1985, 2021)",
  },
  {
    id: "sr-123-4",
    moduleKey: "pst123",
    question:
      "Pour Robert Castel, qu'est-ce qui caractérise la « zone de vulnérabilité » ?",
    options: [
      "La maladie chronique génétique",
      "La précarité de l'emploi (CDD, intérim) couplée à la fragilité des liens relationnels",
      "La faillite bancaire immédiate",
      "Le refus individuel de chercher un emploi",
    ],
    correctIdx: 1,
    explication18_20:
      "La zone de vulnérabilité est l'antichambre de la désaffiliation : un pied dans le travail instable et un réseau familial fragilisé prêt à rompre.",
    auteurRef: "Robert Castel (1995)",
  },
  {
    id: "sr-123-5",
    moduleKey: "pst123",
    question:
      "Que démontre Thomas Le Bianic (2004) sur l'histoire des psychologues du travail ?",
    options: [
      "Que la profession a toujours été unie et sans débat depuis le XIXe siècle",
      "La 'balkanisation' historique de la profession entre ergonomes, psychotechniciens et cliniciens",
      "Que les psychologues du travail dépendaient entièrement des syndicats ouvriers",
      "Que le Cnam n'a joué aucun rôle dans l'histoire de la psychologie",
    ],
    correctIdx: 1,
    explication18_20:
      "Le Bianic analyse les luttes intestines pour la légitimité ('balkanisation') entre la sélection psychotechnique taylorienne et la clinique du travail émancipatrice.",
    auteurRef: "Thomas Le Bianic (2004)",
  },
  // --- PST120 ---
  {
    id: "sr-120-1",
    moduleKey: "pst120",
    question:
      "Selon Dejours, quelle est la fonction primordiale de la reconnaissance dans le travail ?",
    options: [
      "Elle compense financièrement les contraintes de productivité",
      "Elle permet la sublimation identitaire et transforme la souffrance en plaisir",
      "Elle flatte l'ego pour inciter au surpassement individuel",
      "Elle remplace le besoin de repos physiologique",
    ],
    correctIdx: 1,
    explication18_20:
      "En psychodynamique du travail, la reconnaissance (jugement d'utilité et de beauté) est le médiateur indispensable qui permet la sublimation de la souffrance en plaisir et protège la santé mentale.",
    auteurRef: "Christophe Dejours (1993)",
  },
  {
    id: "sr-120-2",
    moduleKey: "pst120",
    question:
      "Qu'appelle Pascale Molinier l'« idéologie défensive virile » dans les métiers dangereux ?",
    options: [
      "Une affirmation d'agressivité purement biologique des ouvriers masculins",
      "Une stratégie collective de défense visant à conjurer la peur par le déni partagé de la souffrance",
      "Un modèle de leadership autoritaire imposé par la direction",
      "Une méthode d'organisation taylorienne des chantiers",
    ],
    correctIdx: 1,
    explication18_20:
      "Molinier démontre que l'idéologie virile est une construction défensive collective qui anesthésie la perception du risque pour permettre aux opérateurs de tenir face au danger réel.",
    auteurRef: "Pascale Molinier (2006)",
  },
  // --- PST124 ---
  {
    id: "sr-124-1",
    moduleKey: "pst124",
    question:
      "Selon Pierre Rabardel, en quoi consiste le processus de « genèse instrumentale » ?",
    options: [
      "À l'achat et la livraison du matériel informatique dans le service",
      "À la double dynamique d'instrumentation (adaptation du sujet) et d'instrumentalisation (personnalisation/détournement de l'artefact)",
      "À la programmation du code source par les développeurs",
      "À la rédaction du manuel d'utilisation par l'ergonome",
    ],
    correctIdx: 1,
    explication18_20:
      "Rabardel distingue l'artefact technique (donné brut) de l'instrument (construit par le travailleur à travers l'instrumentation de ses schèmes et l'instrumentalisation de l'artefact, y compris par catachrèse).",
    auteurRef: "Pierre Rabardel (1995)",
  },
  {
    id: "sr-124-2",
    moduleKey: "pst124",
    question:
      "Dans le modèle de l'acceptation située (Bobillier-Chaumon), quelle est la critique faite aux modèles classiques TAM ?",
    options: [
      "Ils évaluent trop tardivement l'outil après des années d'usage",
      "Ils réduisent l'appropriation à une intention d'usage individuelle a priori, ignorant le travail réel et les collectifs",
      "Ils refusent d'utiliser des questionnaires quantitatifs",
      "Ils surévaluent l'importance du collectif de pairs",
    ],
    correctIdx: 1,
    explication18_20:
      "Le TAM évalue une acceptabilité a priori d'un usager rationnel isolé, sans voir que l'acceptation réelle se construit a posteriori dans les régulations de l'activité réelle et les arbitrages collectifs.",
    auteurRef: "Marie-Éric Bobillier-Chaumon (2016)",
  },
];

interface SpeedRunChronoModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

export function SpeedRunChronoModal({
  isOpen,
  onClose,
  defaultModule,
}: SpeedRunChronoModalProps) {
  const [moduleFilter, setModuleFilter] = useState<string>(
    defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)
      ? defaultModule
      : "all",
  );

  useEffect(() => {
    if (defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)) {
      setModuleFilter(defaultModule);
    }
  }, [defaultModule, isOpen]);

  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">(
    "ready",
  );
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [answeredMap, setAnsweredMap] = useState<
    Record<number, { choice: number; isCorrect: boolean }>
  >({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Pool de questions mélangées
  const activeQuestions = useMemo(() => {
    const list = SPEEDRUN_BANK.filter((q) =>
      moduleFilter === "all" ? true : q.moduleKey === moduleFilter,
    );
    // Shuffle stable par session de jeu
    return [...list].sort(() => Math.sin(list.length) - 0.5);
  }, [moduleFilter]);

  const currentQ = activeQuestions[currentIndex];

  useEffect(() => {
    if (gameState !== "playing") {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setGameState("finished");
          window.dispatchEvent(new CustomEvent("pst:speed-run-completed"));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  if (!isOpen) return null;

  function handleStart() {
    triggerHaptic("selection");
    playSuccessSound();
    setTimeLeft(180);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setAnsweredMap({});
    setGameState("playing");
  }

  function handleAnswer(choiceIdx: number) {
    if (!currentQ || answeredMap[currentIndex] !== undefined) return;

    const isCorrect = choiceIdx === currentQ.correctIdx;
    if (isCorrect) {
      triggerHaptic("success");
      playSuccessSound();
      const bonus = streak >= 2 ? 15 : 10;
      setScore((s) => s + bonus);
      setStreak((st) => {
        const next = st + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      triggerHaptic("error");
      playFlipSound();
      setStreak(0);
    }

    setAnsweredMap((prev) => ({
      ...prev,
      [currentIndex]: { choice: choiceIdx, isCorrect },
    }));

    // Passer à la question suivante après 700ms
    setTimeout(() => {
      if (currentIndex < activeQuestions.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setGameState("finished");
        window.dispatchEvent(new CustomEvent("pst:speed-run-completed"));
      }
    }, 600);
  }

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const answeredCount = Object.keys(answeredMap).length;
  const correctCount = Object.values(answeredMap).filter(
    (a) => a.isCorrect,
  ).length;
  const grade18_20 =
    activeQuestions.length > 0
      ? ((correctCount / activeQuestions.length) * 20).toFixed(1)
      : "0.0";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête Feuille Modale */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="size-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-md">
              <Zap className="size-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Sprint Chronométré 3 Min</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-200 font-extrabold uppercase">
                  Mode Réflexe 18/20
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                180s pour tester vos automatismes d&apos;examen Cnam sans
                hésitation
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
          {gameState === "ready" && (
            <div className="py-6 text-center space-y-5">
              <div className="inline-flex size-20 rounded-3xl bg-amber-500/15 text-amber-600 dark:text-amber-400 items-center justify-center shadow-inner">
                <Timer className="size-10 animate-pulse" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Prêt pour le défi 18/20 ?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  En 3 minutes, répondez au maximum de questions sur les
                  auteurs, formules matrices et pièges classiques de vos
                  professeurs.
                </p>
              </div>

              {/* Module Filter Pills */}
              <div className="flex items-center justify-center gap-1.5 flex-wrap">
                {[
                  {
                    key: "all",
                    label: "Tous les modules (106 · 108 · 120 · 123 · 124)",
                  },
                  { key: "pst106", label: "PST106 (Wisner, Clot, Leplat)" },
                  {
                    key: "pst108",
                    label: "PST108 (Bourdieu, Habermas, Valls)",
                  },
                  { key: "pst120", label: "PST120 (Dejours, Molinier, Pezé)" },
                  {
                    key: "pst123",
                    label: "PST123 (Dubar, Sainsaulieu, Castel)",
                  },
                  {
                    key: "pst124",
                    label: "PST124 (Rabardel, Bobillier, Engeström)",
                  },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setModuleFilter(item.key);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      moduleFilter === item.key
                        ? "bg-amber-600 text-white border-amber-600 shadow-sm scale-105"
                        : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleStart}
                  className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Zap className="size-5 fill-white" />
                  <span>Lancer le Sprint Chronométré (180s)</span>
                </button>
              </div>
            </div>
          )}

          {gameState === "playing" && currentQ && (
            <div className="space-y-4">
              {/* Status Bar: Time, Score, Combo */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs">
                <div className="flex items-center gap-2">
                  <Timer
                    className={`size-4 ${timeLeft < 30 ? "text-rose-500 animate-ping" : "text-amber-500"}`}
                  />
                  <span
                    className={`font-mono font-bold text-sm sm:text-base ${timeLeft < 30 ? "text-rose-600 font-black" : "text-slate-900 dark:text-slate-100"}`}
                  >
                    {formatTimer(timeLeft)}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-1.5">
                  <Trophy className="size-4 text-amber-500" />
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {score} pts
                  </span>
                </div>

                <div className="flex items-center justify-end gap-1.5">
                  <Flame
                    className={`size-4 ${streak >= 2 ? "text-rose-500 animate-bounce" : "text-slate-400"}`}
                  />
                  <span className="font-bold text-rose-600 dark:text-rose-400">
                    Combo x{streak >= 2 ? streak : 1}
                  </span>
                </div>
              </div>

              {/* Question Card */}
              <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-500/30 shadow-md space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-bold uppercase tracking-wider text-[10px]">
                    {currentQ.moduleKey.toUpperCase()} · {currentQ.auteurRef}
                  </span>
                  <span className="font-mono text-slate-400 font-bold">
                    Question {currentIndex + 1} / {activeQuestions.length}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  {currentQ.question}
                </h3>

                {/* Options List */}
                <div className="space-y-2 pt-2">
                  {currentQ.options.map((opt, optIdx) => {
                    const answered = answeredMap[currentIndex];
                    const isSelected = answered?.choice === optIdx;
                    const isCorrect = optIdx === currentQ.correctIdx;

                    let btnStyle =
                      "bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200";

                    if (answered) {
                      if (isCorrect) {
                        btnStyle =
                          "bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold shadow-xs";
                      } else if (isSelected && !answered.isCorrect) {
                        btnStyle =
                          "bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-200 font-bold";
                      } else {
                        btnStyle = "opacity-40 border-transparent";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={answered !== undefined}
                        onClick={() => handleAnswer(optIdx)}
                        className={`w-full p-3 sm:p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-2.5 cursor-pointer active:scale-98 ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {answered && isCorrect && (
                          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                        )}
                        {answered && isSelected && !answered.isCorrect && (
                          <XCircle className="size-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {answeredMap[currentIndex] && (
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-900 dark:text-amber-200 animate-fadeIn space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <Sparkles className="size-3.5 text-amber-600" />
                      Argument 18/20 du professeur :
                    </p>
                    <p className="leading-relaxed">
                      {currentQ.explication18_20}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {gameState === "finished" && (
            <div className="py-6 text-center space-y-5 animate-fadeIn">
              <div className="inline-flex size-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white items-center justify-center shadow-lg">
                <Trophy className="size-10 animate-bounce" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                  Session Terminée !
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  {timeLeft <= 0
                    ? "Temps écoulé !"
                    : "Toutes les questions complétées !"}
                </p>
              </div>

              {/* Score Recap Card */}
              <div className="max-w-md mx-auto grid grid-cols-3 gap-2.5 p-4 rounded-3xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">
                    Score Final
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-amber-600">
                    {score}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">
                    Note Équivalente
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-600">
                    {grade18_20} / 20
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">
                    Max Streak
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-rose-600">
                    x{maxStreak}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleStart}
                  className="px-6 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="size-4" />
                  <span>Recommencer</span>
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

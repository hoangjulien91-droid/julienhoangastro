"use client";

import { useState } from "react";
import {
  X,
  Briefcase,
  UserCheck,
  Shield,
  HeartHandshake,
  ArrowRight,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Award,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playFlipSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface ScenarioStep {
  interlocuteurReplique: string;
  choix: {
    id: string;
    texte: string;
    impactAlliance: number;
    impactDeonto: number;
    feedbackClinique: string;
    isOptimal: boolean;
  }[];
}

interface RoleplayScenario {
  id: string;
  moduleKey: "pst108" | "pst123" | "pst106" | "pst120";
  titre: string;
  roleUtilisateur: string;
  interlocuteur: string;
  contexteInitial: string;
  etapes: ScenarioStep[];
  debriefingFinal: string;
}

const SCENARIOS: RoleplayScenario[] = [
  // --- PST108 : NÉGOCIATION IOD ---
  {
    id: "sc-iod-108",
    moduleKey: "pst108",
    titre: "Négociation IOD face à un DRH adepte du tri de CV",
    roleUtilisateur: "Chargé de mission IOD (Méthode Castra & Valls)",
    interlocuteur: "M. Morvan, DRH d'une plateforme logistique",
    contexteInitial:
      "Vous rencontrez M. Morvan pour négocier un recrutement sur un poste de préparateur de commandes sans tri préalable. Le DRH vous accueille froidement : « Écoutez, j'ai 50 CV sur mon bureau. Envoyez-moi vos 3 meilleurs profils, je leur ferai passer un test de logique et un entretien de motivation. C'est à prendre ou à laisser. »",
    etapes: [
      {
        interlocuteurReplique:
          "« Si vous refusez de me faire parvenir les CV pour que je sélectionne, je ne vois pas pourquoi je travaillerais avec vous ! »",
        choix: [
          {
            id: "opt-1a",
            texte:
              "Céder : « D'accord, je vous transmets 3 CV de personnes motivées pour ne pas bloquer le partenariat. »",
            impactAlliance: 15,
            impactDeonto: -35,
            feedbackClinique:
              "FAUTE MAJEURE IOD ! Vous avez trahi la règle déontologique n°1 d'IOD : le refus absolu du tri préalable. En acceptant la sélection sur CV, vous retombez dans l'idéologie de l'employabilité qui disqualifie les plus précaires.",
            isOptimal: false,
          },
          {
            id: "opt-1b",
            texte:
              "Tenir la posture IOD avec pédagogie : « M. Morvan, les tests et les CV prédisent rarement la réussite en situation réelle. Dans notre méthode, nous sélectionnons l'environnement de travail et nous garantissons un appui quotidien sur le poste. Vous ne prenez aucun risque : la personne démarre lundi et nous médiatisons son intégration. »",
            impactAlliance: 20,
            impactDeonto: 30,
            feedbackClinique:
              "POSTURE 18/20 EXCELLENTE ! Vous déplacez la charge de la preuve : ce n'est pas le précaire qui doit prouver sa conformité sur papier, c'est l'organisation qui s'adapte avec l'appui continu du chargé IOD.",
            isOptimal: true,
          },
          {
            id: "opt-1c",
            texte:
              "Attaquer : « Votre méthode de sélection est discriminatoire et contraire au droit du travail ! »",
            impactAlliance: -40,
            impactDeonto: 10,
            feedbackClinique:
              "RUPTURE D'ALLIANCE : Vous avez braqué votre interlocuteur. En intervention IOD, on ne moralise pas l'entreprise : on négocie des conditions concrètes de travail réel.",
            isOptimal: false,
          },
        ],
      },
      {
        interlocuteurReplique:
          "Le DRH hésite : « Soit... mais si le candidat ne tient pas la cadence de 120 colis/heure dès le deuxième jour, je le renvoie immédiatement ! »",
        choix: [
          {
            id: "opt-2a",
            texte:
              "Fixer le cadre de la médiation : « Convenons plutôt d'une montée en charge progressive sur deux semaines avec un point d'étape quotidien de 10 minutes entre le tuteur, le salarié et moi-même pour ajuster les gestes. »",
            impactAlliance: 25,
            impactDeonto: 25,
            feedbackClinique:
              "PARFAIT ! L'IOD n'abandonne jamais le salarié : la médiation continue permet de réguler les micro-incompréhensions avant qu'elles ne se transforment en rupture.",
            isOptimal: true,
          },
          {
            id: "opt-2b",
            texte:
              "« Ne vous inquiétez pas, je vais lui mettre la pression ce week-end pour qu'il soit ultra-rapide. »",
            impactAlliance: 10,
            impactDeonto: -30,
            feedbackClinique:
              "GRAVE ERREUR : Vous vous transformez en relais managérial de rentabilité au lieu de jouer le rôle de tiers médiateur protecteur.",
            isOptimal: false,
          },
        ],
      },
    ],
    debriefingFinal:
      "La méthode IOD (Francis Valls & Denis Castra) n'est pas une simple technique de placement : c'est un renversement politique et déontologique qui refuse l'employabilité préalable pour ancrer l'intégration dans le droit commun de l'entreprise.",
  },

  // --- PST123 : RESTITUTION RPS & DÉONTOLOGIE ---
  {
    id: "sc-rps-123",
    moduleKey: "pst123",
    titre: "Pression de la Direction sur l'anonymat d'une enquête RPS",
    roleUtilisateur: "Psychologue du Travail (Loi 1985 / Code 2021)",
    interlocuteur: "Mme Girard, Directrice Générale",
    contexteInitial:
      "Après une enquête sur un climat social dégradé, vous présentez vos conclusions. Mme Girard ferme la porte de son bureau : « Je veux les noms des collaborateurs qui ont dénoncé le chef de service dans les entretiens. Si vous refusez de me donner la liste brute, je ne valide pas votre rapport et je bloque vos honoraires. »",
    etapes: [
      {
        interlocuteurReplique:
          "« Je paie votre mission, j'ai le droit de savoir qui parle dans mon entreprise ! Donnez-moi au moins les services concernés ! »",
        choix: [
          {
            id: "opt-rps-1a",
            texte:
              "Céder partiellement : « Je ne vous donne pas les noms, mais je vous précise quel bureau a témoigné pour que vous tiriez les choses au clair. »",
            impactAlliance: 10,
            impactDeonto: -45,
            feedbackClinique:
              "VIOLATION DÉONTOLOGIQUE SÉVÈRE : En désignant un micro-bureau, vous rendez les salariés immédiatement identifiables, violant le secret professionnel et le consentement éclairé (Code de déontologie 2021).",
            isOptimal: false,
          },
          {
            id: "opt-rps-1b",
            texte:
              "Opposer l'indépendance technique et la loi : « Mme Girard, la loi du 25 juillet 1985 et l'article 7 du Code de déontologie protègent le secret des entretiens. Mon rôle n'est pas de dénoncer des personnes mais de vous éclairer sur les mécanismes organisationnels qui fabriquent ces tensions. Si nous ciblons des coupables, le problème se répétera. »",
            impactAlliance: 20,
            impactDeonto: 35,
            feedbackClinique:
              "POSTURE CLINIQUE EXEMPLAIRE ! Vous triangulez la demande : vous refusez fermement la transgression déontologique tout en offrant à la DG une analyse systémique plus utile qu'une chasse aux sorcières.",
            isOptimal: true,
          },
          {
            id: "opt-rps-1c",
            texte:
              "Menacer : « Je vais vous dénoncer immédiatement à l'inspection du travail et porter plainte ! »",
            impactAlliance: -50,
            impactDeonto: -10,
            feedbackClinique:
              "RUPTURE DU CADRE : Le psychologue n'est pas un officier de police judiciaire. Sauf péril grave et imminent sur la vie d'autrui, son rôle est d'analyser le travail et de tenir le cadre d'intervention.",
            isOptimal: false,
          },
        ],
      },
      {
        interlocuteurReplique:
          "La Directrice se calme : « Très bien. Mais comment convaincre le Conseil d'Administration d'agir sans preuve nominative ? »",
        choix: [
          {
            id: "opt-rps-2a",
            texte:
              "Structurer une restitution par le travail réel : « Nous allons présenter les conflits d'arbitrage entre la cadence demandée et le manque d'outils, étayés par des verbatims anonymisés représentatifs. Cela démontrera au Conseil que la souffrance est un coût organisationnel à résorber. »",
            impactAlliance: 30,
            impactDeonto: 25,
            feedbackClinique:
              "EXCELLENT ! C'est la démonstration que la clinique du travail aide l'entreprise à progresser sans sacrifier la santé des personnes.",
            isOptimal: true,
          },
        ],
      },
    ],
    debriefingFinal:
      "La légitimité du psychologue du travail repose sur son indépendance technique (Loi 1985) et son refus d'instrumentalisation managériale. La déontologie n'est pas un frein, c'est l'outil qui rend l'intervention crédible.",
  },

  // --- PST106 : RESTITUTION ERGONOMIQUE ---
  {
    id: "sc-ergo-106",
    moduleKey: "pst106",
    titre: "Face au déni des TMS : Mauvais gestes ou Travail réel ?",
    roleUtilisateur: "Ergonome Cnam (Approche Alain Wisner)",
    interlocuteur: "M. Caron, Directeur d'Usine",
    contexteInitial:
      "Dans une usine agroalimentaire, les ouvrières souffrent de tendinites chroniques aux épaules. Le directeur vous déclare : « Écoutez, le problème ne vient pas de nos postes, qui sont aux normes AFNOR. Les filles dorment mal et passent leur soirée sur leur smartphone. Je veux que vous leur donniez une formation sur les bons gestes et postures ! »",
    etapes: [
      {
        interlocuteurReplique:
          "« Alors, vous leur faites cette formation 'Gestes & Postures' pour leur apprendre à bien se tenir ? »",
        choix: [
          {
            id: "opt-ergo-1a",
            texte:
              "Accepter : « Oui, je vais leur apprendre à garder le dos droit et à respirer pendant la coupe de viande. »",
            impactAlliance: 15,
            impactDeonto: -40,
            feedbackClinique:
              "PIÈGE INDIVIDUALISANT ! Alain Wisner et Jacques Leplat ont combattu l'illusion des 'gestes et postures' : quand les cadences et la variabilité de la viande obligent à forcer, aucun 'bon geste' ne protège les tendons.",
            isOptimal: false,
          },
          {
            id: "opt-ergo-1b",
            texte:
              "Démontrer par l'activité réelle : « M. Caron, regardons ensemble les enregistrements vidéo de l'activité réelle. La viande arrive souvent trop froide et dure, ce qui force les opératrices à exercer une pression 3 fois supérieure à la consigne. Les TMS ne viennent pas de leur comportement, mais de ce compromis opératoire subi. »",
            impactAlliance: 25,
            impactDeonto: 35,
            feedbackClinique:
              "COEUR DE L'ERGONOMIE DU CNAM ! Vous prouvez par les faits observés que l'activité réelle compense une variabilité matérielle non prise en compte par la tâche prescrite.",
            isOptimal: true,
          },
        ],
      },
      {
        interlocuteurReplique:
          "Le Directeur est surpris : « Je n'avais jamais remarqué la dureté de la viande en sortie de frigo... Que proposez-vous concrètement ? »",
        choix: [
          {
            id: "opt-ergo-2a",
            texte:
              "Agir sur les déterminants organisationnels : « Créer un sas de tempérage de la viande en amont et réaménager le manche des couteaux en co-conception avec les opératrices pour préserver leur santé et leur cadence. »",
            impactAlliance: 30,
            impactDeonto: 30,
            feedbackClinique:
              "DÉMARCHE ERGONOMIQUE COMPLÈTE : L'ergonome transforme la situation de travail pour adapter le travail à l'homme, et non l'inverse.",
            isOptimal: true,
          },
        ],
      },
    ],
    debriefingFinal:
      "L'ergonomie de l'activité refuse le réductionnisme biomécanique ou comportemental : elle analyse l'opérateur en situation réelle régulant les aléas du process.",
  },

  // --- PST120 : SOUFFRANCE ÉTHIQUE & DEJOURS ---
  {
    id: "sc-dejours-120",
    moduleKey: "pst120",
    titre: "Burn-out ou Souffrance Éthique ? (Christophe Dejours)",
    roleUtilisateur: "Psychologue du Travail (Psychodynamique Cnam)",
    interlocuteur: "M. Vasseur, Directeur Administratif & Financier",
    contexteInitial:
      "Un cadre financier chevronné est en arrêt maladie pour syndrome dépressif sévère. Le DAF vous convoque : « Écoutez, ce monsieur a des soucis personnels dans son couple. Nous lui demandions simplement de maquiller temporairement les bilans d'audit pour rassurer les actionnaires. Il a craqué par fragilité psychologique. Je veux que vous lui fassiez un bilan de compétences pour le réorienter ailleurs. »",
    etapes: [
      {
        interlocuteurReplique:
          "« Vous êtes d'accord avec moi : son effondrement est dû à sa fragilité individuelle et non aux pratiques de gestion de l'entreprise ? »",
        choix: [
          {
            id: "opt-dej-1a",
            texte:
              "Accepter l'individualisation : « En effet, nous allons lui faire passer des tests de personnalité pour évaluer sa vulnérabilité au stress. »",
            impactAlliance: 15,
            impactDeonto: -45,
            feedbackClinique:
              "FAUTE MAJEURE EN PSYCHODYNAMIQUE DU TRAVAIL ! Christophe Dejours a démontré que qualifier la souffrance de 'fragilité individuelle' est une stratégie défensive managériale pour exonérer l'organisation de ses responsabilités éthiques.",
            isOptimal: false,
          },
          {
            id: "opt-dej-1b",
            texte:
              "Poser le diagnostic de souffrance éthique : « M. Vasseur, contraindre un professionnel intègre à fausser des comptes engage sa responsabilité morale. La souffrance éthique (Dejours, 1998) surgit quand un travailleur est forcé de commettre des actes que sa conscience réprouve. Ce n'est pas une faiblesse psychologique, c'est la destruction du sens moral du travail. »",
            impactAlliance: 20,
            impactDeonto: 40,
            feedbackClinique:
              "POSTURE CLINIQUE 18/20 ! Vous replacez la souffrance au cœur de l'épreuve du travail réel : la souffrance éthique résulte d'un conflit de valeurs destructeur de l'identité professionnelle.",
            isOptimal: true,
          },
        ],
      },
      {
        interlocuteurReplique:
          "Le DAF est déstabilisé : « Mais alors, si ce n'est pas une maladie individuelle, comment éviter que les autres cadres financiers ne craquent aussi ? »",
        choix: [
          {
            id: "opt-dej-2a",
            texte:
              "Ouvrir un espace de délibération sur les règles de métier : « En restaurant un espace de discussion sécurisé où les cadres et la direction débattent de la déontologie financière et des arbitrages acceptables, pour que personne ne soit laissé seul face à un ordre illégitime. »",
            impactAlliance: 25,
            impactDeonto: 30,
            feedbackClinique:
              "PARFAIT ! La santé mentale au travail se construit par la coopération et la délibération collective sur les critères du travail juste et du travail bien fait.",
            isOptimal: true,
          },
        ],
      },
    ],
    debriefingFinal:
      "La psychodynamique du travail (Christophe Dejours) refuse la psychologisation du mal-être : la souffrance éthique découle d'injonctions organisationnelles aliénantes qui brisent la sublimation et le jugement de beauté des pairs.",
  },

  // --- PST106 : CLINIQUE DE L'ACTIVITÉ & YVES CLOT ---
  {
    id: "sc-clot-106",
    moduleKey: "pst106",
    titre:
      "Conflit d'équipe : Problème d'humeur ou Travail Empêché ? (Yves Clot)",
    roleUtilisateur: "Praticien en Clinique de l'Activité (Cnam)",
    interlocuteur: "Mme Danvers, Cadre supérieure de santé",
    contexteInitial:
      "Aux urgences, deux infirmières d'accueil se disputent violemment devant les patients. La cadre vous appelle : « Elles sont toxiques, elles ne savent pas communiquer. Faites-leur un atelier de communication non-violente et de gestion des émotions pour qu'elles arrêtent leurs enfantillages ! »",
    etapes: [
      {
        interlocuteurReplique:
          "« Vous allez bien leur faire cet atelier de gestion des émotions pour régler leurs querelles d'ego ? »",
        choix: [
          {
            id: "opt-clot-1a",
            texte:
              "Proposer du relationnel : « Oui, nous allons faire un cercle de parole pour qu'elles expriment leurs ressentis et s'excusent. »",
            impactAlliance: 10,
            impactDeonto: -35,
            feedbackClinique:
              "PIÈGE PSYCHOLOGISANT CLASSIQUE ! Yves Clot (Le travail à cœur, 2010) met en garde : réduire un conflit de travail à des problèmes de communication ou d'ego aggrave la situation en culpabilisant les professionnels.",
            isOptimal: false,
          },
          {
            id: "opt-clot-1b",
            texte:
              "Recentrer sur l'activité empêchée : « Mme Danvers, derrière ce conflit interpersonnel se cache un désaccord sur la manière de soigner. L'une refuse de laisser attendre les personnes âgées, l'autre applique strictement l'ordre d'arrivée du logiciel. C'est le travail empêché qui crée la dispute. Proposons-leur d'analyser ensemble les compromis opératoires pour retravailler les règles de métier. »",
            impactAlliance: 25,
            impactDeonto: 35,
            feedbackClinique:
              "COEUR DE LA CLINIQUE DE L'ACTIVITÉ ! Vous transformez un conflit interpersonnel stérile en controverse professionnelle féconde sur le travail bien fait (le genre professionnel).",
            isOptimal: true,
          },
        ],
      },
    ],
    debriefingFinal:
      "En clinique de l'activité (Yves Clot), le conflit n'est pas une anomalie relationnelle : c'est le signe d'un métier étouffé. Restaurer le pouvoir d'agir consiste à réinvestir le travail bien fait comme moteur de la santé.",
  },
];

interface SimulateurJeuDeRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

export function SimulateurJeuDeRoleModal({
  isOpen,
  onClose,
  defaultModule,
}: SimulateurJeuDeRoleModalProps) {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    defaultModule === "pst106"
      ? "sc-ergo-106"
      : defaultModule === "pst123"
        ? "sc-rps-123"
        : "sc-iod-108",
  );

  const [stepIndex, setStepIndex] = useState(0);
  const [allianceScore, setAllianceScore] = useState(50);
  const [deontoScore, setDeontoScore] = useState(50);
  const [chosenOptionId, setChosenOptionId] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentScenario =
    SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0]!;

  const currentStep = currentScenario.etapes[stepIndex];

  if (!isOpen) return null;

  function resetGame(scenarioId: string) {
    setSelectedScenarioId(scenarioId);
    setStepIndex(0);
    setAllianceScore(50);
    setDeontoScore(50);
    setChosenOptionId(null);
    setIsFinished(false);
  }

  function handleChoose(choice: (typeof currentStep.choix)[0]) {
    if (chosenOptionId !== null) return;
    setChosenOptionId(choice.id);

    if (choice.isOptimal) {
      triggerHaptic("success");
      playSuccessSound();
    } else {
      triggerHaptic("selection");
      playFlipSound();
    }

    setAllianceScore((prev) =>
      Math.max(0, Math.min(100, prev + choice.impactAlliance)),
    );
    setDeontoScore((prev) =>
      Math.max(0, Math.min(100, prev + choice.impactDeonto)),
    );
  }

  function handleNext() {
    triggerHaptic("selection");
    playClickSound();
    setChosenOptionId(null);
    if (stepIndex < currentScenario.etapes.length - 1) {
      setStepIndex((idx) => idx + 1);
    } else {
      setIsFinished(true);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Simulateur Jeu de Rôle Clinique & Posture"
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header iOS */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-teal-500/10 via-indigo-500/10 to-amber-500/10 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-10 rounded-2xl bg-gradient-to-tr from-teal-600 to-indigo-600 flex items-center justify-center text-white shadow-md shrink-0">
              <HeartHandshake className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 m-0 truncate">
                <span className="truncate">Jeu de Rôle Clinique</span>
                <span className="hidden sm:inline text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-800 dark:text-teal-200 font-extrabold uppercase shrink-0">
                  Posture
                </span>
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate m-0">
                Incarnez le psychologue face aux dilemmes d&apos;entreprise
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 flex items-center justify-center transition-all cursor-pointer shrink-0"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Scenario Switcher */}
        <div className="p-3 border-b border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => {
                playClickSound();
                resetGame(sc.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
                selectedScenarioId === sc.id
                  ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                  : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              }`}
            >
              {sc.moduleKey.toUpperCase()} · {sc.titre.slice(0, 24)}...
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Status Gauges: Alliance vs Déontologie */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 p-3 sm:p-3.5 rounded-2xl sm:rounded-3xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center justify-between font-bold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1 truncate">
                  <HeartHandshake className="size-3.5 text-teal-600 shrink-0" />
                  <span className="truncate">Alliance</span>
                  <span className="hidden sm:inline"> de Travail</span>
                </span>
                <span className="font-mono text-teal-700 dark:text-teal-400 shrink-0 ml-1">
                  {allianceScore}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full bg-teal-500 transition-all duration-300"
                  style={{ width: `${allianceScore}%` }}
                />
              </div>
            </div>

            <div className="space-y-1 min-w-0">
              <div className="flex items-center justify-between font-bold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1 truncate">
                  <Shield className="size-3.5 text-indigo-600 shrink-0" />
                  <span className="truncate">Déontologie</span>
                </span>
                <span className="font-mono text-indigo-700 dark:text-indigo-400 shrink-0 ml-1">
                  {deontoScore}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${deontoScore}%` }}
                />
              </div>
            </div>
          </div>

          {!isFinished ? (
            <div className="space-y-4">
              {/* Contexte & Rôles */}
              <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-teal-700 dark:text-teal-300 flex items-center gap-1">
                    <UserCheck className="size-3.5" />
                    Votre rôle : {currentScenario.roleUtilisateur}
                  </span>
                  <span className="text-slate-400 font-mono">
                    Étape {stepIndex + 1} / {currentScenario.etapes.length}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic m-0">
                  « {currentScenario.contexteInitial} »
                </p>
              </div>

              {/* Réplique de l'interlocuteur */}
              <div className="p-4 rounded-3xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                  {currentScenario.interlocuteur} s&apos;exprime :
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 m-0">
                  {currentStep.interlocuteurReplique}
                </p>
              </div>

              {/* Choix d'action de l'utilisateur */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Quelle posture clinique adoptez-vous ?
                </span>

                {currentStep.choix.map((opt) => {
                  const isSelected = chosenOptionId === opt.id;
                  const isDone = chosenOptionId !== null;

                  let style =
                    "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-teal-400";
                  if (isDone) {
                    if (opt.isOptimal) {
                      style =
                        "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/30";
                    } else if (isSelected && !opt.isOptimal) {
                      style =
                        "bg-rose-50 dark:bg-rose-950/30 border-rose-500 text-rose-950 dark:text-rose-100";
                    } else {
                      style =
                        "opacity-45 border-slate-200 dark:border-slate-800";
                    }
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleChoose(opt)}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${style}`}
                    >
                      <p className="text-xs sm:text-sm font-medium leading-relaxed m-0">
                        {opt.texte}
                      </p>

                      {isDone && isSelected && (
                        <div
                          className={`p-3 rounded-xl text-xs animate-fadeIn space-y-1 ${
                            opt.isOptimal
                              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200"
                              : "bg-rose-500/10 border border-rose-500/20 text-rose-900 dark:text-rose-200"
                          }`}
                        >
                          <p className="font-bold flex items-center gap-1">
                            <Sparkles className="size-3.5" />
                            Analyse de votre posture :
                          </p>
                          <p className="leading-relaxed m-0">
                            {opt.feedbackClinique}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {chosenOptionId !== null && (
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-5 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Poursuivre la négociation</span>
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Écran de debriefing de fin de scénario */
            <div className="py-6 text-center space-y-5 animate-fadeIn">
              <div className="inline-flex size-20 rounded-3xl bg-gradient-to-tr from-teal-500 to-indigo-500 text-white items-center justify-center shadow-lg">
                <Award className="size-10 animate-bounce" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                  Scénario Clinique Réussi !
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Bilan de votre négociation en situation professionnelle réelle
                </p>
              </div>

              {/* Jauges finales */}
              <div className="max-w-md mx-auto grid grid-cols-2 gap-3 p-4 rounded-3xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">
                    Alliance Partenaire
                  </span>
                  <span className="text-2xl font-black text-teal-600">
                    {allianceScore}%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">
                    Rigueur Déontologique
                  </span>
                  <span className="text-2xl font-black text-indigo-600">
                    {deontoScore}%
                  </span>
                </div>
              </div>

              {/* Débriefing doctrinal */}
              <div className="max-w-md mx-auto p-4 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/50 text-left text-xs text-slate-800 dark:text-slate-200 space-y-1">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block">
                  💡 Débriefing officiel du professeur Cnam :
                </span>
                <p className="leading-relaxed m-0 italic font-serif">
                  « {currentScenario.debriefingFinal} »
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => resetGame(currentScenario.id)}
                  className="px-6 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="size-4" />
                  <span>Rejouer le cas</span>
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

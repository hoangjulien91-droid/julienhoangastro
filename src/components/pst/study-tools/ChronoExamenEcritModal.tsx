"use client";

import { useEffect, useState } from "react";
import {
  X,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  FileText,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  BookOpen,
  Briefcase,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface ChronoExamenEcritModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModuleKey?: "pst106" | "pst108" | "pst123" | "pst120" | "pst124" | "transversal";
}

interface SujetExamenCNAM {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst123" | "pst120" | "pst124" | "transversal";
  titre: string;
  enonce: string;
  dureeConseilleeHeures: number;
  conceptsAttendus: string[];
  auteursAttendus: string[];
  planConseille: string[];
}

const SUJETS_EXAMEN_S1: SujetExamenCNAM[] = [
  {
    id: "s-106-tache-activite",
    moduleKey: "pst106",
    titre: "Écart Tâche / Activité & Qualité Empêchée",
    enonce:
      "« Si le travailleur se contentait d'appliquer les consignes prescrites, l'organisation s'effondrerait. » À partir de vos connaissances en clinique de l'activité et en ergonomie, analysez les fonctions psychologiques et productives de l'écart entre le travail prescrit et le travail réel.",
    dureeConseilleeHeures: 3,
    conceptsAttendus: [
      "Tâche prescrite vs Activité réelle (Wisner, Leplat)",
      "Variabilité interne et externe",
      "Compromis opératoire & régulation",
      "Genre professionnel & Style (Clot)",
      "Activité contrariée & travail empêché",
    ],
    auteursAttendus: ["Alain Wisner", "Jacques Leplat", "Yves Clot", "Ivar Oddone", "Georges Canguilhem"],
    planConseille: [
      "I. L'écart prescrit/réel comme condition productive et cognitive vitale (Wisner, Leplat, compromis opératoire)",
      "II. Quand l'écart est dénié : du travail empêché à l'usure de la santé mentale et du collectif (Clot, genre professionnel)",
    ],
  },
  {
    id: "s-108-reconnaissance-mepris",
    moduleKey: "pst108",
    titre: "Reconnaissance, Mépris & Souffrance au Travail",
    enonce:
      "En quoi le déni de reconnaissance dans les organisations managériales modernes constitue-t-il une atteinte à la santé mentale des salariés ? Vous vous appuierez sur la psychologie sociale clinique et les théories de la reconnaissance.",
    dureeConseilleeHeures: 3,
    conceptsAttendus: [
      "Mépris social (Axel Honneth)",
      "Jugement d'utilité vs Jugement de beauté (Dejours)",
      "Idéologie gestionnaire & reporting (Gaulejac)",
      "Souffrance éthique & trahison de soi",
      "Défenses collectives & pacte dénégatif (Kaës)",
    ],
    auteursAttendus: ["Axel Honneth", "Christophe Dejours", "Vincent de Gaulejac", "René Kaës", "Eugène Enriquez"],
    planConseille: [
      "I. La reconnaissance comme pivot de l'intégrité subjective et de la santé (Honneth, Dejours)",
      "II. Les pathologies du déni : emprise gestionnaire, souffrance éthique et défenses collectives (Gaulejac, Kaës)",
    ],
  },
  {
    id: "s-123-dubar-transaction",
    moduleKey: "pst123",
    titre: "La Construction des Identités Professionnelles",
    enonce:
      "« L'identité professionnelle n'est jamais donnée d'emblée, elle est une transaction permanente entre soi et autrui. » Discutez cette affirmation à partir des modèles de Claude Dubar et de Renaud Sainsaulieu.",
    dureeConseilleeHeures: 3,
    conceptsAttendus: [
      "Double transaction biographique vs relationnelle (Dubar)",
      "Actes d'attribution vs Actes d'appartenance",
      "4 formes identitaires (Promotion, Blocage, Conversion, Exclusion)",
      "Modèles culturels de pouvoir (Sainsaulieu : Fusion, Négociation, Affinitaire, Retrait)",
      "Socialisation secondaire & monde du travail",
    ],
    auteursAttendus: ["Claude Dubar", "Renaud Sainsaulieu", "Pierre Bourdieu", "Erving Goffman", "Max Weber"],
    planConseille: [
      "I. La matrice identitaire de Dubar : dialectique entre histoire personnelle et assignations institutionnelles",
      "II. L'épreuve des relations de pouvoir dans l'entreprise selon Sainsaulieu : 4 cultures de socialisation politique",
    ],
  },
  {
    id: "s-120-psychodynamique-care",
    moduleKey: "pst120",
    titre: "Normalité Souffrante, Souffrance Éthique & Invisibilité du Care",
    enonce:
      "« Entre l'organisation prescrite du travail et la maladie mentale s'interpose l'énigme de la normalité souffrante. » À partir des travaux de Christophe Dejours et de Pascale Molinier, analysez comment les collectifs se défendent contre la souffrance et à quelles conditions celle-ci peut être sublimée en plaisir et en santé.",
    dureeConseilleeHeures: 3,
    conceptsAttendus: [
      "Normalité souffrante & stratégies collectives de défense (Dejours)",
      "Intelligence pratique (Mètis) & espace de délibération",
      "Dynamique de reconnaissance : jugement d'utilité vs jugement de beauté",
      "Souffrance éthique & évaluation individualisée des performances",
      "Travail de care, habiletés discrètes & critique de l'idéologie virile (Molinier)",
    ],
    auteursAttendus: ["Christophe Dejours", "Pascale Molinier", "Louis Le Guillant", "Claude Veil", "Georges Canguilhem"],
    planConseille: [
      "I. De la souffrance créatrice à la sublimation : intelligence pratique (Mètis), espace déontique et dynamique de reconnaissance (Dejours)",
      "II. Les impasses de la défense et du déni : idéologie virile, invisibilisation du care (Molinier) et souffrance éthique face à l'évaluation individualisée",
    ],
  },
  {
    id: "s-124-clinique-usage-digital",
    moduleKey: "pst124",
    titre: "Genèse Instrumentale, Acceptation Située & Technologies Capacitantes",
    enonce:
      "Pourquoi les modèles d'acceptabilité a priori (TAM/UTAUT) échouent-ils à rendre compte des effets réels des technologies numériques et algorithmiques sur l'activité ? Vous articulerez la genèse instrumentale de Pierre Rabardel et la clinique de l'usage de Marc-Éric Bobillier-Chaumon.",
    dureeConseilleeHeures: 3,
    conceptsAttendus: [
      "Artefact vs Instrument : instrumentation et instrumentalisation (Rabardel)",
      "Braconnage / catachrèse comme analyseur de l'activité empêchée",
      "Acceptabilité a priori (TAM) vs Acceptation située a posteriori (Bobillier-Chaumon)",
      "Grille des 4 dimensions (opératoire, organisationnelle, identitaire, subjective)",
      "Technologie capacitante vs incapacitante & conception continuée dans l'usage",
    ],
    auteursAttendus: ["Marc-Éric Bobillier-Chaumon", "Pierre Rabardel", "Yrjö Engeström", "Lucy Suchman", "Bernard Stiegler"],
    planConseille: [
      "I. Au-delà de l'acceptabilité a priori : la transformation de l'artefact en instrument à l'épreuve du réel (Rabardel, Engeström)",
      "II. Diagnostiquer et transformer les usages : les 4 dimensions de l'acceptation située et la conception d'environnements capacitants (Bobillier-Chaumon, Stiegler)",
    ],
  },
  {
    id: "s-transversal-s1",
    moduleKey: "transversal",
    titre: "Transversal S1 : Le Travailleur face au Lean Management",
    enonce:
      "Une entreprise de logistique introduit des terminaux vocaux guidant les pas des préparateurs de commande à la seconde près. Articulez les regards de la clinique de l'activité (PST106), de la clinique psychosociologique (PST108) et de la sociologie des identités (PST123) pour modéliser cette situation.",
    dureeConseilleeHeures: 3,
    conceptsAttendus: [
      "PST106 : Activité empêchée, anéantissement du pouvoir d'agir, gestes robotisés",
      "PST108 : Souffrance éthique, négation de l'intersubjectivité, déni de reconnaissance",
      "PST123 : Identité de blocage ou d'exclusion, destruction du modèle de négociation au profit du retrait",
    ],
    auteursAttendus: ["Yves Clot", "Alain Wisner", "Axel Honneth", "Vincent de Gaulejac", "Claude Dubar", "Renaud Sainsaulieu"],
    planConseille: [
      "I. Du geste empêché à la souffrance psychique : la double lecture ergonomique (PST106) et psychosociologique (PST108)",
      "II. La crise de l'identité et l'effritement des collectifs de travail : l'éclairage sociologique (PST123)",
    ],
  },
];

const VIGNETTES_CLINIQUES_TERRAIN = [
  {
    id: "ehpad-soin",
    label: "EHPAD · Soin empêché",
    paragraphe:
      "\n[Illustration clinique — EHPAD & Qualité empêchée] : Prenons le cas d'aides-soignantes en EHPAD soumises à une prescription minutée (12 minutes par toilette). Face à la variabilité réelle des résidents (douleur, angoisse, démence), l'opératrice doit opérer un compromis opératoire permanent (Leplat, 1997). Lorsque l'organisation interdit de prendre le temps d'apaiser un résident pour tenir la cadence chiffrée, le soin relationnel — cœur du genre professionnel (Clot, 1999) — devient une activité empêchée, générant une souffrance éthique (Dejours, 1998) liée au sentiment de maltraitance institutionnelle.\n",
  },
  {
    id: "logistique-voice",
    label: "Logistique · Guidage vocal",
    paragraphe:
      "\n[Illustration clinique — Logistique & Voice Picking] : Dans un entrepôt logistique régi par la commande vocale algorithmique (Voice Picking), la tâche prescrite dicte chaque pas et chaque geste à la seconde près. En supprimant les marges de manœuvre et les échanges latéraux entre préparateurs, ce dispositif d'idéologie gestionnaire (Gaulejac, 2005) détruit les régulations collectives et rabat l'activité sur une exécution solitaire, provoquant à la fois des troubles musculo-squelettiques (TMS) par amputation du style moteur (Clot) et une crise d'identité d'exclusion (Dubar, 1991).\n",
  },
  {
    id: "centre-appels",
    label: "Centre d'appels · Script imposé",
    paragraphe:
      "\n[Illustration clinique — Centre d'appels & Travail émotionnel] : Chez les téléconseillers soumis à un script langagier strict et à une durée moyenne de traitement (DMT) affichée en temps réel sur écran, l'écart entre le script prescrit et la détresse réelle de l'usager oblige le salarié à bricoler dans la clandestinité pour résoudre véritablement la demande. Si le management n'évalue que le respect formel du script (jugement d'utilité tronqué) sans reconnaître l'ingéniosité mobilisée (jugement de beauté des pairs, Dejours), le sujet subit un déni de reconnaissance (Honneth, 2000) qui érode son pouvoir d'agir.\n",
  },
  {
    id: "industrie-reorg",
    label: "Industrie · Réorganisation Lean",
    paragraphe:
      "\n[Illustration clinique — Maintenance industrielle & Crise identitaire] : Lors du passage d'une régie technique historique à une organisation en flux tendu (Lean Management), des techniciens de maintenance expérimentés voient leurs savoir-faire de métier (diagnostic fin, prévention des pannes) remplacés par du reporting standardisé. Au sens de Dubar (1991), la transaction relationnelle est rompue : l'acte d'attribution managérial (« exécutant polyvalent interchangeable ») entre en conflit frontal avec l'acte d'appartenance biographique (« homme de métier garant de la fiabilité »), précipitant le collectif du modèle de la négociation vers le retrait (Sainsaulieu, 1977).\n",
  },
];

const LOCAL_STORAGE_EXAM_DRAFT = "pst_chrono_examen_draft_s1_v1";

export function ChronoExamenEcritModal({
  isOpen,
  onClose,
  defaultModuleKey = "pst106",
}: ChronoExamenEcritModalProps) {
  const [selectedSujetId, setSelectedSujetId] = useState<string>(
    () =>
      SUJETS_EXAMEN_S1.find((s) => s.moduleKey === defaultModuleKey)?.id ??
      SUJETS_EXAMEN_S1[0].id,
  );
  const [examHours, setExamHours] = useState<number>(3); // 2 or 3h
  const [totalSeconds, setTotalSeconds] = useState<number>(3 * 3600);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(3 * 3600);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [draftContent, setDraftContent] = useState<string>("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState<"sujet" | "redaction">("sujet");

  // Load draft from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_EXAM_DRAFT);
      if (saved) setDraftContent(saved);
    } catch {
      /* ignore */
    }
  }, []);

  // Save draft on edit
  const handleDraftChange = (text: string) => {
    setDraftContent(text);
    try {
      localStorage.setItem(LOCAL_STORAGE_EXAM_DRAFT, text);
    } catch {
      /* ignore */
    }
  };

  // Timer loop
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning && remainingSeconds > 0) {
      timer = setInterval(() => {
        setRemainingSeconds((t) => {
          if (t <= 1) {
            setIsRunning(false);
            playSuccessSound();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, remainingSeconds]);

  if (!isOpen) return null;

  const currentSujet =
    SUJETS_EXAMEN_S1.find((s) => s.id === selectedSujetId) ?? SUJETS_EXAMEN_S1[0];

  const handleSelectHours = (hours: number) => {
    setExamHours(hours);
    const secs = hours * 3600;
    setTotalSeconds(secs);
    setRemainingSeconds(secs);
    setIsRunning(false);
    playClickSound();
  };

  const handleToggleTimer = () => {
    setIsRunning(!isRunning);
    playClickSound();
    triggerHaptic();
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
    playClickSound();
    triggerHaptic();
  };

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Milestones in % of time
  const elapsed = totalSeconds - remainingSeconds;
  const progressPercent = Math.min(100, Math.round((elapsed / totalSeconds) * 100));

  // Determine active phase
  let activePhase = "Phase 1 : Définition des termes & Problématique (0-20%)";
  if (progressPercent >= 85) {
    activePhase = "Phase 4 : Relecture finale & Chasse aux fautes (85-100%)";
  } else if (progressPercent >= 40) {
    activePhase = "Phase 3 : Rédaction développée & Citations (40-85%)";
  } else if (progressPercent >= 20) {
    activePhase = "Phase 2 : Élaboration du plan détaillé I & II (20-40%)";
  }

  // Count words
  const wordsCount = draftContent.trim() ? draftContent.trim().split(/\s+/).length : 0;

  const handleCopyText = () => {
    navigator.clipboard.writeText(draftContent);
    setCopied(true);
    playClickSound();
    triggerHaptic();
    setTimeout(() => setCopied(false), 2000);
  };

  const insertStructureTemplate = () => {
    const template = `TITRE / SUJET : ${currentSujet.titre}

INTRODUCTION
- Accroche & Contexte : 
- Définition des termes clés : 
- Problématique : 
- Annonce du plan : 

I. PREMIÈRE PARTIE
A. Sous-partie I.A : 
- Auteur & Citation : 
- Illustration clinique : 

B. Sous-partie I.B : 
- Auteur & Citation : 
- Illustration clinique : 
Transition : 

II. DEUXIÈME PARTIE
A. Sous-partie II.A : 
- Auteur & Citation : 
- Illustration clinique : 

B. Sous-partie II.B : 
- Auteur & Citation : 
- Illustration clinique : 

CONCLUSION
- Bilan synthétique : 
- Réponse nette à la problématique : 
- Ouverture (Épistémologique / Déontologique) : 
`;
    handleDraftChange(template);
    playSuccessSound();
    triggerHaptic();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Chrono-Examen Concours — Simulateur d'Épreuve Écrite"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 dark:bg-slate-950/85 backdrop-blur-md"
    >
      <div
        className={`relative w-full flex flex-col rounded-2xl border border-slate-200/90 dark:border-indigo-500/30 bg-white/95 dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xl overflow-hidden transition-all duration-200 ${
          isFullScreen ? "h-[98vh] max-w-[98vw]" : "h-[92vh] max-w-6xl"
        }`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3.5 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/70 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-9 rounded-xl bg-indigo-500/15 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
              <Timer className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 truncate">
                  Simulateur Épreuve Écrite
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium shrink-0 hidden xs:inline">
                  Examen Blanc
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                Chrono-Examen Concours
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Hours toggle */}
            <div className="flex items-center bg-slate-200/80 dark:bg-slate-800/80 p-0.5 sm:p-1 rounded-lg border border-slate-300/80 dark:border-slate-700">
              <button
                onClick={() => handleSelectHours(2)}
                className={`px-2 py-1 text-[11px] sm:text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  examHours === 2 ? "bg-indigo-600 text-white" : "text-slate-600 dark:text-slate-400"
                }`}
              >
                2h
              </button>
              <button
                onClick={() => handleSelectHours(3)}
                className={`px-2 py-1 text-[11px] sm:text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  examHours === 3 ? "bg-indigo-600 text-white" : "text-slate-600 dark:text-slate-400"
                }`}
              >
                3h
              </button>
            </div>

            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-1.5 sm:p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors hidden sm:inline-flex"
              title={isFullScreen ? "Réduire" : "Plein écran"}
            >
              {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors"
              title="Fermer"
              aria-label="Fermer"
            >
              <X className="size-4 sm:size-5" />
            </button>
          </div>
        </div>

        {/* Timer Bar */}
        <div className="px-3.5 sm:px-6 py-2.5 sm:py-3 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
          <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-4">
            <div className="font-mono text-xl sm:text-3xl font-extrabold tracking-wider text-indigo-600 dark:text-indigo-400">
              {formatTime(remainingSeconds)}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleTimer}
                className={`px-3 sm:px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md min-h-[36px] cursor-pointer ${
                  isRunning
                    ? "bg-amber-600 hover:bg-amber-500 text-white"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white"
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="h-3.5 w-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" />
                    <span>Démarrer</span>
                  </>
                )}
              </button>

              <button
                onClick={handleResetTimer}
                className="p-2 rounded-xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                title="Réinitialiser le chrono"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Active Phase Pill */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 text-right">
            <div className="text-left sm:text-right min-w-0">
              <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Passe en cours</div>
              <div className="text-[11px] sm:text-xs font-semibold text-indigo-700 dark:text-indigo-300 truncate max-w-[200px] sm:max-w-xs">{activePhase}</div>
            </div>
            <div className="w-16 sm:w-24 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 shrink-0">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Mobile View Switcher (visible on phones and small tablets) */}
        <div className="lg:hidden flex items-center border-b border-slate-200/80 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-950/60 p-1.5 gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setMobileTab("sujet")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
              mobileTab === "sujet"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <BookOpen className="size-3.5" />
            <span>1. Sujet & Repères</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("redaction")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
              mobileTab === "redaction"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <FileText className="size-3.5" />
            <span>2. Rédaction ({wordsCount})</span>
          </button>
        </div>

        {/* Workspace Layout */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Panel: Sujet & Guide */}
          <div
            className={`lg:col-span-5 border-r border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/50 p-4 sm:p-5 overflow-y-auto space-y-4 ${
              mobileTab === "sujet" ? "block" : "hidden lg:block"
            }`}
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Sélection du Sujet :
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {SUJETS_EXAMEN_S1.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedSujetId(s.id);
                      playClickSound();
                    }}
                    className={`whitespace-nowrap px-3 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      s.id === currentSujet.id
                        ? "bg-indigo-600 border-indigo-400 text-white shadow"
                        : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {s.moduleKey.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Sujet Card */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                Énoncé Officiel
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{currentSujet.titre}</h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">{currentSujet.enonce}</p>
            </div>

            {/* Auteurs et concepts attendus */}
            <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 space-y-3 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-slate-500 dark:text-slate-400 text-[10px] uppercase">
                  Auteurs impératifs à citer :
                </span>
                <div className="flex flex-wrap gap-1">
                  {currentSujet.auteursAttendus.map((a) => (
                    <span
                      key={a}
                      className="px-2 py-0.5 rounded bg-indigo-100/80 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-200 border border-indigo-300/60 dark:border-indigo-800/40 text-[11px] font-medium"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-500 dark:text-slate-400 text-[10px] uppercase">
                  Concepts clés attendus sur la copie :
                </span>
                <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-0.5 text-[11px]">
                  {currentSujet.conceptsAttendus.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-200/80 dark:border-slate-800">
                <span className="font-bold text-slate-500 dark:text-slate-400 text-[10px] uppercase">
                  Proposition de plan CNAM :
                </span>
                <div className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                  {currentSujet.planConseille.map((p, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-200/80 dark:border-slate-800/80">
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/90 dark:bg-amber-950/20 border border-amber-300/80 dark:border-amber-800/30 text-xs text-amber-900 dark:text-amber-200/90 flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Barème CNAM :</strong> Problématisation (/4), rigueur conceptuelle et auteurs (/8), illustration clinique concrète (/5), structure et clarté d&apos;écriture (/3).
              </div>
            </div>
          </div>

          {/* Right Panel: Writing Area */}
          <div
            className={`lg:col-span-7 flex flex-col bg-slate-100/40 dark:bg-slate-950/30 p-3.5 sm:p-5 space-y-3 ${
              mobileTab === "redaction" ? "flex" : "hidden lg:flex"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <FileText className="size-3.5 sm:size-4 text-slate-500 dark:text-slate-400 shrink-0" />
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate">Espace de Rédaction</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0 font-mono">({wordsCount} mots)</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  onClick={insertStructureTemplate}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-colors cursor-pointer"
                  title="Insérer le canevas de plan académique"
                >
                  <span className="hidden sm:inline">Insérer structure type</span>
                  <span className="sm:hidden">Structure</span>
                </button>
                <button
                  onClick={handleCopyText}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copié !" : "Copier"}</span>
                </button>
              </div>
            </div>

            {/* 1-Click Clinical Terrain Vignette Insertion Bar (/5 pts CNAM Rubric) */}
            <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mr-1">
                <Briefcase className="size-3" />
                <span>+ Vignette Terrain (/5 pts) :</span>
              </span>
              {VIGNETTES_CLINIQUES_TERRAIN.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    handleDraftChange(draftContent + v.paragraphe);
                    playSuccessSound();
                    triggerHaptic();
                  }}
                  className="px-2 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/25 text-indigo-800 dark:text-indigo-200 text-[11px] font-semibold transition-colors cursor-pointer"
                  title="Insérer cette illustration clinique articulée aux auteurs dans votre copie"
                >
                  + {v.label}
                </button>
              ))}
            </div>

            <textarea
              value={draftContent}
              onChange={(e) => handleDraftChange(e.target.value)}
              placeholder="Commencez votre épreuve ici... (Sauvegarde automatique locale)"
              className="flex-1 w-full min-h-[300px] p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-sans leading-relaxed resize-none scrollbar-thin"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10px] sm:text-xs text-slate-500 pt-1">
              <span>Auto-sauvegarde activée dans le navigateur</span>
              <span>Recommandé : ~1500 à 2500 mots pour 3h d&apos;examen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

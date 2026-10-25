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
  AlertTriangle,
  HelpCircle,
  Download,
  BookOpen,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface ChronoExamenEcritModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModuleKey?: "pst106" | "pst108" | "pst123" | "transversal";
}

interface SujetExamenCNAM {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst123" | "transversal";
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

const LOCAL_STORAGE_EXAM_DRAFT = "pst_chrono_examen_draft_s1_v1";

export function ChronoExamenEcritModal({
  isOpen,
  onClose,
  defaultModuleKey = "pst106",
}: ChronoExamenEcritModalProps) {
  const [selectedSujetId, setSelectedSujetId] = useState<string>(SUJETS_EXAMEN_S1[0].id);
  const [examHours, setExamHours] = useState<number>(3); // 2 or 3h
  const [totalSeconds, setTotalSeconds] = useState<number>(3 * 3600);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(3 * 3600);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [draftContent, setDraftContent] = useState<string>("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [copied, setCopied] = useState(false);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md">
      <div
        className={`relative w-full flex flex-col rounded-2xl border border-indigo-500/30 bg-slate-900 shadow-2xl overflow-hidden transition-all duration-200 ${
          isFullScreen ? "h-[98vh] max-w-[98vw]" : "h-[92vh] max-w-6xl"
        }`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Timer className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Simulateur d&apos;Épreuve Écrite CNAM
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                  Conditions Examen Blanc
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Chrono-Examen Concours (2h ou 3h)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Hours toggle */}
            <div className="flex items-center bg-slate-800/80 p-1 rounded-lg border border-slate-700">
              <button
                onClick={() => handleSelectHours(2)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  examHours === 2 ? "bg-indigo-600 text-white" : "text-slate-400"
                }`}
              >
                2 Heures
              </button>
              <button
                onClick={() => handleSelectHours(3)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  examHours === 3 ? "bg-indigo-600 text-white" : "text-slate-400"
                }`}
              >
                3 Heures
              </button>
            </div>

            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isFullScreen ? "Réduire" : "Plein écran"}
            >
              {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Timer Bar */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="font-mono text-2xl sm:text-3xl font-extrabold tracking-wider text-indigo-400">
              {formatTime(remainingSeconds)}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleTimer}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
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
                    <span>Démarrer l&apos;épreuve</span>
                  </>
                )}
              </button>

              <button
                onClick={handleResetTimer}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Réinitialiser le chrono"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Active Phase Pill */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">Passe en cours</div>
              <div className="text-xs font-semibold text-indigo-300">{activePhase}</div>
            </div>
            <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Panel: Sujet & Guide */}
          <div className="lg:col-span-5 border-r border-slate-800 bg-slate-900/50 p-5 overflow-y-auto space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Sélection du Sujet :
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {SUJETS_EXAMEN_S1.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedSujetId(s.id);
                      playClickSound();
                    }}
                    className={`whitespace-nowrap px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                      s.id === currentSujet.id
                        ? "bg-indigo-600 border-indigo-400 text-white shadow"
                        : "bg-slate-800/60 border-slate-700 text-slate-300 hover:text-white"
                    }`}
                  >
                    {s.moduleKey.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Sujet Card */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                Énoncé Officiel
              </span>
              <h3 className="text-sm font-bold text-white">{currentSujet.titre}</h3>
              <p className="text-xs text-slate-300 italic leading-relaxed">{currentSujet.enonce}</p>
            </div>

            {/* Auteurs et concepts attendus */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-3 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-slate-400 text-[10px] uppercase">
                  Auteurs impératifs à citer :
                </span>
                <div className="flex flex-wrap gap-1">
                  {currentSujet.auteursAttendus.map((a) => (
                    <span
                      key={a}
                      className="px-2 py-0.5 rounded bg-indigo-900/30 text-indigo-200 border border-indigo-800/40 text-[11px] font-medium"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-400 text-[10px] uppercase">
                  Concepts clés attendus sur la copie :
                </span>
                <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
                  {currentSujet.conceptsAttendus.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-800">
                <span className="font-bold text-slate-400 text-[10px] uppercase">
                  Proposition de plan CNAM :
                </span>
                <div className="space-y-1 text-slate-300 text-[11px]">
                  {currentSujet.planConseille.map((p, idx) => (
                    <div key={idx} className="bg-slate-900 p-2 rounded border border-slate-800/80">
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200/90 flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Barème CNAM :</strong> Problématisation (/4), rigueur conceptuelle et auteurs (/8), illustration clinique concrète (/5), structure et clarté d&apos;écriture (/3).
              </div>
            </div>
          </div>

          {/* Right Panel: Writing Area */}
          <div className="lg:col-span-7 flex flex-col bg-slate-950/30 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-bold text-white">Espace de Rédaction</span>
                <span className="text-xs text-slate-400">({wordsCount} mots)</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={insertStructureTemplate}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                  title="Insérer le canevas de plan académique"
                >
                  Insérer structure type
                </button>
                <button
                  onClick={handleCopyText}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>Copier copie</span>
                </button>
              </div>
            </div>

            <textarea
              value={draftContent}
              onChange={(e) => handleDraftChange(e.target.value)}
              placeholder="Commencez votre épreuve ici... (Sauvegarde automatique locale)"
              className="flex-1 w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-sans leading-relaxed resize-none scrollbar-thin"
            />

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Auto-sauvegarde activée dans le navigateur</span>
              <span>Recommandé : ~1500 à 2500 mots pour 3h d&apos;examen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

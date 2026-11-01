"use client";

import { useEffect, useRef, useState } from "react";
import {
  X,
  Mic,
  MicOff,
  Sparkles,
  RotateCcw,
  Check,
  AlertCircle,
  Gauge,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface SujetOralFlash {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst123" | "pst120" | "pst124";
  titre: string;
  question: string;
  dureeConseilleeSec: number;
  motsClesObligatoires: string[];
  reponseIdealeSynthese: string;
}

const SUJETS_ORAL_FLASH: SujetOralFlash[] = [
  {
    id: "oral-clot-genre",
    moduleKey: "pst106",
    titre: "Genre Professionnel & Style (Yves Clot)",
    question:
      "Expliquez en 2 minutes la distinction entre genre professionnel et style individuel en clinique de l'activité.",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "mémoire impersonnelle",
      "style",
      "genre",
      "collectif",
      "pouvoir d'agir",
      "controverse",
    ],
    reponseIdealeSynthese:
      "Le genre professionnel est la mémoire impersonnelle du métier, un mot d'ordre tacite partagé sans lequel l'action individuelle se délite. Le style est la façon singulière dont un opérateur s'approprie le genre pour laisser sa marque, sans réinventer le travail à zéro.",
  },
  {
    id: "oral-leplat-regulation",
    moduleKey: "pst106",
    titre: "Régulation & Écart Prescrit/Réel (Leplat & Hoc)",
    question:
      "Résumez le modèle de régulation ergonomique de Jacques Leplat et Jean-Marie Hoc.",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "tâche prescrite",
      "activité réelle",
      "compromis opératoire",
      "conditions internes",
      "conditions externes",
      "effets",
    ],
    reponseIdealeSynthese:
      "L'activité n'est pas le décalque passif de la tâche : elle est un compromis opératoire permanent entre les exigences externes de la production et les conditions internes du travailleur (fatigue, savoirs d'expérience), produisant des effets sur l'homme et sur le système.",
  },
  {
    id: "oral-valls-iod",
    moduleKey: "pst108",
    titre: "La Méthode d'Intervention IOD (Francis Valls)",
    question:
      "Pourquoi la démarche IOD refuse-t-elle tout tri préalable des demandeurs d'emploi ?",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "non-tri",
      "travail réel",
      "visite de poste",
      "suivi bilatéral",
      "accueil",
      "ségrégation",
    ],
    reponseIdealeSynthese:
      "L'intervention IOD refuse le tri préalable parce que la sélection sur CV opère comme un filtre d'éviction sociale. Elle déplace l'action vers l'analyse du travail réel en entreprise et la sécurisation des conditions d'accueil via un suivi bilatéral médiatisé.",
  },
  {
    id: "oral-buhler-organon",
    moduleKey: "pst108",
    titre: "L'Organon du Langage (Karl Bühler)",
    question:
      "Présentez les 3 fonctions du modèle de l'Organon du langage de Karl Bühler.",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "organon",
      "expression",
      "appel",
      "représentation",
      "émetteur",
      "récepteur",
    ],
    reponseIdealeSynthese:
      "Le langage est un instrument reliant trois pôles : l'émetteur (fonction expressive ou symptôme), le récepteur (fonction d'appel ou signal) et les objets du monde (fonction de représentation ou symbole).",
  },
  {
    id: "oral-dubar-transaction",
    moduleKey: "pst123",
    titre: "La Double Transaction Identitaire (Claude Dubar)",
    question:
      "Définissez la double transaction identitaire selon Claude Dubar et citez ses 4 formes.",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "transaction biographique",
      "transaction relationnelle",
      "pour soi",
      "pour autrui",
      "promotion",
      "blocage",
    ],
    reponseIdealeSynthese:
      "L'identité est le produit de la transaction biographique (pour soi dans le temps) et de la transaction relationnelle (pour autrui dans l'espace social), débouchant sur les 4 formes identitaires : promotion, blocage, conversion et exclusion.",
  },
  {
    id: "oral-sainsaulieu-pouvoir",
    moduleKey: "pst123",
    titre: "Les 4 Modèles de Pouvoir au Travail (Renaud Sainsaulieu)",
    question:
      "Citez et caractérisez les 4 modèles relationnels de culture d'entreprise de Renaud Sainsaulieu.",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "fusionnel",
      "négociation",
      "affinitaire",
      "retrait",
      "pouvoir",
      "dépendance",
    ],
    reponseIdealeSynthese:
      "Sainsaulieu identifie 4 cultures de pouvoir : le modèle fusionnel (OS, camaraderie défensive), le modèle de négociation (techniciens/cadres, démocratie industrielle), le modèle affinitaire (réseaux d'intérêts sélectifs) et le modèle de retrait (travail alimentaire hors-travail).",
  },
  {
    id: "oral-120-souffrance-ethique-care",
    moduleKey: "pst120",
    titre: "Souffrance Éthique & Invisibilité du Care (Dejours / Molinier)",
    question:
      "Expliquez en 2 minutes comment l'évaluation individualisée génère de la souffrance éthique (Dejours) et pourquoi Pascale Molinier critique le prisme viril des défenses collectives.",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "Dejours",
      "souffrance éthique",
      "évaluation",
      "reconnaissance",
      "jugement de beauté",
      "Molinier",
      "care",
      "virilité",
    ],
    reponseIdealeSynthese:
      "Chez Dejours, l'évaluation individualisée brise la solidarité horizontale et pousse le sujet à trahir les règles du métier, provoquant une souffrance éthique par compromission morale et privation du jugement de beauté des pairs. Molinier complète cette analyse en montrant que la focalisation sur les défenses viriles occulte les habiletés discrètes du care portées majoritairement par les femmes.",
  },
  {
    id: "oral-124-genese-acceptation",
    moduleKey: "pst124",
    titre: "Genèse Instrumentale & Acceptation Située (Rabardel / Bobillier-Chaumon)",
    question:
      "Présentez en 2 minutes la différence entre artefact et instrument (Rabardel) et pourquoi la clinique de l'usage (Bobillier-Chaumon) préfère l'acceptation située à l'acceptabilité a priori.",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "Rabardel",
      "artefact",
      "instrument",
      "instrumentation",
      "instrumentalisation",
      "Bobillier",
      "acceptation située",
      "capacitant",
    ],
    reponseIdealeSynthese:
      "Selon Rabardel, l'outil prescrit n'est qu'un artefact neutre qui ne devient un instrument qu'à travers une genèse instrumentale couplant l'instrumentation (évolution des schèmes du sujet) et l'instrumentalisation (adaptation de l'artefact). Bobillier-Chaumon dépasse ainsi les modèles d'acceptabilité a priori (TAM) pour évaluer l'acceptation située : l'outil est-il réellement capacitant pour le pouvoir d'agir et le collectif ?",
  },
];

const TICS_LANGAGE_ORAL = [
  { label: "euh", regex: /\beuh+\b/gi },
  { label: "du coup", regex: /\bdu coup\b/gi },
  { label: "en fait", regex: /\ben fait\b/gi },
  { label: "voilà", regex: /\bvoilà\b/gi },
  { label: "genre", regex: /\bgenre\b/gi },
  { label: "en gros", regex: /\ben gros\b/gi },
  { label: "ben / bah", regex: /\b(ben|bah)\b/gi },
];

interface DictaphoneOralModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModuleKey?: "pst106" | "pst108" | "pst123" | "pst120" | "pst124";
}

export function DictaphoneOralModal({
  isOpen,
  onClose,
  defaultModuleKey = "pst106",
}: DictaphoneOralModalProps) {
  const [selectedSujetId, setSelectedSujetId] = useState<string>(
    () =>
      SUJETS_ORAL_FLASH.find((s) => s.moduleKey === defaultModuleKey)?.id ??
      SUJETS_ORAL_FLASH[0].id,
  );
  const [isRecording, setIsRecording] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [transcript, setTranscript] = useState("");
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef(false);
  const baseTranscriptRef = useRef("");

  const currentSujet =
    SUJETS_ORAL_FLASH.find((s) => s.id === selectedSujetId) ?? SUJETS_ORAL_FLASH[0];

  const handleStopRecording = () => {
    isRecordingRef.current = false;
    setIsRecording(false);
    playSuccessSound();
    triggerHaptic();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onend = null;
        recognitionRef.current.stop();
      } catch {
        /* ignore */
      }
    }
  };

  // Timer loop
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRecording && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((t) => {
          if (t <= 1) {
            handleStopRecording();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRecording, timeRemaining]);

  // Speech Recognition setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setIsSpeechSupported(false);
      }
    }
    return () => {
      isRecordingRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.onend = null;
          recognitionRef.current.stop();
        } catch {
          /* ignore */
        }
      }
    };
  }, []);

  if (!isOpen) return null;

  const startRecognitionSession = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "fr-FR";
      recognition.continuous = true;
      recognition.interimResults = true;

      let sessionFinal = "";

      recognition.onresult = (event: any) => {
        let interim = "";
        sessionFinal = "";
        for (let i = 0; i < event.results.length; i++) {
          const piece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            sessionFinal += piece + " ";
          } else {
            interim += piece + " ";
          }
        }
        const combined = `${baseTranscriptRef.current} ${sessionFinal} ${interim}`
          .replace(/\s+/g, " ")
          .trim();
        setTranscript(combined);
      };

      recognition.onerror = () => {
        /* ignore mic interruptions */
      };

      // Auto-reconnexion si iOS Safari ou Chrome coupe au bout de 30-45s de parole
      recognition.onend = () => {
        if (sessionFinal.trim()) {
          baseTranscriptRef.current = `${baseTranscriptRef.current} ${sessionFinal}`
            .replace(/\s+/g, " ")
            .trim();
        }
        if (isRecordingRef.current) {
          setTimeout(() => {
            if (isRecordingRef.current) {
              startRecognitionSession();
            }
          }, 150);
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch {
      /* ignore */
    }
  };

  const handleStartRecording = () => {
    playClickSound();
    triggerHaptic();
    baseTranscriptRef.current = transcript;
    isRecordingRef.current = true;
    setIsRecording(true);
    startRecognitionSession();
  };

  const handleReset = () => {
    handleStopRecording();
    baseTranscriptRef.current = "";
    setTimeRemaining(currentSujet.dureeConseilleeSec);
    setTranscript("");
    playClickSound();
    triggerHaptic();
  };

  const handleSelectSujet = (s: SujetOralFlash) => {
    handleStopRecording();
    baseTranscriptRef.current = "";
    setSelectedSujetId(s.id);
    setTimeRemaining(s.dureeConseilleeSec);
    setTranscript("");
    playClickSound();
  };

  // Check which keywords are detected in transcript
  const lowerTranscript = transcript.toLowerCase();
  const detectedKeywords = currentSujet.motsClesObligatoires.map((keyword) => {
    const isDetected = lowerTranscript.includes(keyword.toLowerCase());
    return { keyword, isDetected };
  });

  const countDetected = detectedKeywords.filter((k) => k.isDetected).length;
  const scorePercent = Math.round(
    (countDetected / currentSujet.motsClesObligatoires.length) * 100,
  );

  // Calcul du débit vocal (mots/minute) et détection des tics de langage
  const totalWords = transcript.trim() ? transcript.trim().split(/\s+/).length : 0;
  const elapsedSeconds = Math.max(1, currentSujet.dureeConseilleeSec - timeRemaining);
  const motsParMinute =
    totalWords > 0 && elapsedSeconds >= 5
      ? Math.round((totalWords / elapsedSeconds) * 60)
      : 0;

  const ticsDetectes = TICS_LANGAGE_ORAL.map((t) => {
    const matches = transcript.match(t.regex);
    return { label: t.label, count: matches ? matches.length : 0 };
  }).filter((t) => t.count > 0);
  const totalTics = ticsDetectes.reduce((acc, t) => acc + t.count, 0);

  const formatTimer = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-slate-950/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Flash-Oral 2 Min — Dictaphone d'Examen"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-slate-200/90 dark:border-indigo-500/30 bg-white/95 dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-4 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/70 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-9 rounded-xl bg-purple-500/15 dark:bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
              <Mic className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 truncate">
                  Flash-Oral 2 Min
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium shrink-0 hidden xs:inline">
                  Reconnaissance Vocale
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                Dictaphone Vocal d&apos;Auto-Évaluation
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              handleStopRecording();
              onClose();
            }}
            className="p-1.5 sm:p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors shrink-0"
            title="Fermer"
            aria-label="Fermer"
          >
            <X className="size-4 sm:size-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6">
          {/* Sujet selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Choisissez une question d&apos;oral type :
            </span>
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto whitespace-nowrap scrollbar-none pb-1">
              {SUJETS_ORAL_FLASH.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectSujet(s)}
                  className={`whitespace-nowrap px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all shrink-0 cursor-pointer ${
                    s.id === selectedSujetId
                      ? "bg-purple-600 border-purple-400 text-white shadow"
                      : "bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {s.moduleKey.toUpperCase()} · {s.titre.split(" (")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Current question card */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-500/15 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300">
              Consigne de restitution orale
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">{currentSujet.question}</h3>
            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
              Temps imparti : <b>{formatTimer(currentSujet.dureeConseilleeSec)}</b> · Énoncez la réponse à voix haute au micro.
            </p>
          </div>

          {/* Recording & Timer Bar */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-50/90 via-white to-indigo-50/90 dark:from-purple-950/40 dark:via-slate-900 dark:to-indigo-950/40 border border-purple-200/80 dark:border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center justify-between sm:justify-start gap-4">
              <div
                className={`font-mono text-2xl sm:text-3xl font-extrabold ${
                  timeRemaining <= 20 ? "text-rose-600 dark:text-rose-400 animate-pulse" : "text-purple-700 dark:text-purple-300"
                }`}
              >
                {formatTimer(timeRemaining)}
              </div>

              <div className="flex items-center gap-2">
                {!isRecording ? (
                  <button
                    onClick={handleStartRecording}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-purple-500/20 dark:shadow-purple-950/50 cursor-pointer active:scale-95 transition-all"
                  >
                    <Mic className="h-4 w-4" />
                    <span>Démarrer l&apos;enregistrement</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStopRecording}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-rose-500/20 dark:shadow-rose-950/50 cursor-pointer active:scale-95 transition-all"
                  >
                    <MicOff className="h-4 w-4" />
                    <span>Arrêter l&apos;oral</span>
                  </button>
                )}

                <button
                  onClick={handleReset}
                  className="p-2 rounded-xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                  title="Réinitialiser"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-5">
              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center sm:justify-end gap-1">
                  <Gauge className="size-3 text-purple-600 dark:text-purple-400" />
                  <span>Cadence Vocale</span>
                </span>
                <span
                  className={`text-sm font-bold font-mono ${
                    motsParMinute >= 110 && motsParMinute <= 160
                      ? "text-emerald-600 dark:text-emerald-400"
                      : motsParMinute > 160
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {motsParMinute > 0 ? `${motsParMinute} mots/min` : "— mots/min"}{" "}
                  <span className="text-[10px] font-normal text-slate-500">(cible 120-150)</span>
                </span>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                  Complétude Conceptuelle
                </span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {scorePercent}% ({countDetected}/{currentSujet.motsClesObligatoires.length} concepts)
                </span>
              </div>
            </div>
          </div>

          {/* Oral Filler / Tics de langage Scanner */}
          {totalWords > 0 && (
            <div className="p-3 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Hygiène Oratoire ({totalWords} mots prononcés) :
                </span>
                {totalTics === 0 ? (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                    ✓ 0 tic de langage détecté
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-[11px] font-bold">
                    ⚠️ {totalTics} tic(s) parasite(s) à gommer
                  </span>
                )}
              </div>
              {ticsDetectes.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  {ticsDetectes.map((t) => (
                    <span
                      key={t.label}
                      className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/25 text-[10px] font-semibold"
                    >
                      « {t.label} » ×{t.count}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Keyword detection badges */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Mots-clés attendus par le jury (détection en direct) :
            </span>
            <div className="flex flex-wrap gap-2">
              {detectedKeywords.map((k) => (
                <span
                  key={k.keyword}
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    k.isDetected
                      ? "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/40 font-bold"
                      : "bg-slate-200/70 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-300/70 dark:border-slate-700/60"
                  }`}
                >
                  {k.isDetected ? (
                    <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                  )}
                  <span>{k.keyword}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Transcript / Manual text area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                Transcription de votre parole (ou saisie manuelle) :
              </span>
              {!isSpeechSupported && (
                <span className="text-amber-600 dark:text-amber-400 text-[11px] flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>Micro non supporté par ce navigateur, mode texte activé</span>
                </span>
              )}
            </div>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Parlez dans votre micro... Vos propos apparaîtront ici et les mots-clés seront automatiquement analysés en direct !"
              rows={4}
              className="w-full p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-purple-500 font-sans leading-relaxed"
            />
          </div>

          {/* Ideal model answer */}
          <div className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-800/40 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-indigo-700 dark:text-indigo-300 uppercase text-[10px]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Modèle de synthèse orale idéale :</span>
            </div>
            <p className="text-indigo-950 dark:text-indigo-200 italic leading-relaxed">
              « {currentSujet.reponseIdealeSynthese} »
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

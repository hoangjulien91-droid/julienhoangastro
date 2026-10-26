"use client";

import { useEffect, useState, useMemo } from "react";
import {
  X,
  Layers,
  Copy,
  Check,
  Sparkles,
  AlertTriangle,
  FileCode,
  PenTool,
  Palette,
  Eye,
  Printer,
  Brain,
  RotateCcw,
  CheckCircle2,
  Compass,
} from "lucide-react";
import {
  SCHEMAS_MATRICES,
  type SchemaMatrice,
} from "@/lib/pst/data/schemas-matrices";
import { PstDiagramRenderer } from "@/components/pst/visuals/PstDiagrams";
import { SvgFullScreenViewer } from "@/components/pst/visuals/SvgFullScreenViewer";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { toast } from "sonner";

interface SchemasMatricesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
  initialSchemaId?: string;
}

interface ClozeItem {
  id: string;
  label: string;
  answer: string;
  hint: string;
}

const CLOZE_CHALLENGES: Record<string, ClozeItem[]> = {
  "schema-leplat-regulation": [
    {
      id: "s1",
      label: "Boîte Haute (Entrée organisationnelle)",
      answer: "Tâche prescrite",
      hint: "Ce qui est fixé par la direction : consignes, cadences, sécurité.",
    },
    {
      id: "s2",
      label: "Boîte Centrale (Processus régulateur)",
      answer: "Activité réelle",
      hint: "Le compromis opératoire pour faire face aux aléas.",
    },
    {
      id: "s3",
      label: "Boîte Gauche (Facteur humain singulier)",
      answer: "Conditions internes",
      hint: "Fatigue, âge, compétences réelles de l'opérateur.",
    },
    {
      id: "s4",
      label: "Boîte Bas-Gauche (Sortie productive)",
      answer: "Effets sur le système",
      hint: "Qualité, cadences, productivité, pannes évitées.",
    },
  ],
  "schema-clot-activite-reelle": [
    {
      id: "s1",
      label: "Sommet émergé de l'Iceberg (20%)",
      answer: "Activité réalisée",
      hint: "Ce qui est observable et mesuré par les indicateurs de gestion.",
    },
    {
      id: "s2",
      label: "Masse immergée (80%)",
      answer: "Le Réel de l'activité",
      hint: "Ce qui ne se fait pas : activités contrariées, suspendues, empêchées.",
    },
    {
      id: "s3",
      label: "Pilier collectif droit",
      answer: "Genre professionnel",
      hint: "Mémoire collective des pairs et règles du métier non écrites.",
    },
    {
      id: "s4",
      label: "Pilier individuel droit",
      answer: "Style personnel",
      hint: "Réappropriation singulière et touche propre de l'opérateur.",
    },
  ],
  "schema-dejours-reconnaissance": [
    {
      id: "s1",
      label: "Source de la créativité",
      answer: "Souffrance face au réel",
      hint: "Ce qui résiste à la technique et demande de l'intelligence pratique.",
    },
    {
      id: "s2",
      label: "Branche gauche de reconnaissance",
      answer: "Jugement d'utilité",
      hint: "Rendu par la hiérarchie et les clients sur la valeur économique.",
    },
    {
      id: "s3",
      label: "Branche droite de reconnaissance",
      answer: "Jugement de beauté",
      hint: "Rendu par les pairs selon les règles de l'art du métier.",
    },
    {
      id: "s4",
      label: "Issue positive de la gratitude",
      answer: "Sublimation & Santé",
      hint: "Rapatriement de la souffrance en identité et santé psychique.",
    },
  ],
  "schema-bourdieu-algorithme": [
    {
      id: "s1",
      label: "Matrice de dispositions incorporées",
      answer: "Habitus",
      hint: "Structures structurées et structurantes, sens pratique.",
    },
    {
      id: "s2",
      label: "Espace de rivalités et luttes",
      answer: "Champ social",
      hint: "Espace relationnel avec ses enjeux propres et ses positions dominants/dominés.",
    },
    {
      id: "s3",
      label: "Les ressources mobilisables (4 formes)",
      answer: "Les Capitaux",
      hint: "Économique, culturel, social et symbolique.",
    },
    {
      id: "s4",
      label: "L'adhésion au jeu social",
      answer: "Illusio",
      hint: "La croyance viscérale que le jeu en vaut la chandelle.",
    },
  ],
  "schema-habermas-validite": [
    {
      id: "s1",
      label: "Pôle Nord (Monde Objectif)",
      answer: "Vérité (Wahrheit)",
      hint: "Conformité aux faits réels observables et vérifiables.",
    },
    {
      id: "s2",
      label: "Pôle Est (Monde Social)",
      answer: "Justesse (Richtigkeit)",
      hint: "Légitimité morale et conformité aux normes partagées.",
    },
    {
      id: "s3",
      label: "Pôle Sud (Monde Subjectif)",
      answer: "Sincérité (Wahrhaftigkeit)",
      hint: "Authenticité du locuteur et absence de manipulation trompeuse.",
    },
    {
      id: "s4",
      label: "Pôle Ouest (Monde Linguistique)",
      answer: "Intelligibilité (Verständlichkeit)",
      hint: "Clarté sémantique et accessibilité du vocabulaire.",
    },
  ],
  "schema-honneth-spheres": [
    {
      id: "s1",
      label: "1ère Sphère (Affective & Amour)",
      answer: "Confiance en soi",
      hint: "Garantie par la sécurité affective et l'intégrité corporelle.",
    },
    {
      id: "s2",
      label: "2ème Sphère (Juridique & Droit)",
      answer: "Respect de soi",
      hint: "Statut de citoyen titulaire des mêmes droits que les autres.",
    },
    {
      id: "s3",
      label: "3ème Sphère (Sociale & Travail)",
      answer: "Estime de soi",
      hint: "Reconnaissance de l'utilité sociale et des compétences singulières.",
    },
  ],
  "schema-buhler-organon": [
    {
      id: "s1",
      label: "Sommet (Objets & Faits du monde)",
      answer: "Symbole (Représentation)",
      hint: "La fonction représentative (Darstellung) orientée vers les faits.",
    },
    {
      id: "s2",
      label: "Base Gauche (Émetteur / Locuteur)",
      answer: "Symptôme (Expression)",
      hint: "La fonction expressive (Ausdruck) orientée vers le sujet parlant.",
    },
    {
      id: "s3",
      label: "Base Droite (Récepteur / Destinataire)",
      answer: "Signal (Appel)",
      hint: "La fonction d'appel (Appell) orientée vers l'action de l'autre.",
    },
  ],
  "schema-valls-iod": [
    {
      id: "s1",
      label: "Règle déontologique d'entrée IOD",
      answer: "Zéro sélection préalable",
      hint: "Refus du tamis et des tests psychotechniques éliminatoires.",
    },
    {
      id: "s2",
      label: "Levier stratégique IOD",
      answer: "Négociation sur l'Offre",
      hint: "Action directe auprès de l'employeur pour adapter le poste.",
    },
    {
      id: "s3",
      label: "Lieu de l'accompagnement",
      answer: "Pendant l'emploi réel",
      hint: "Médiation active dans l'entreprise ordinaire, pas en salle d'attente.",
    },
  ],
  "schema-dubar-double-transaction": [
    {
      id: "s1",
      label: "Quadrant Continuité + Accord",
      answer: "Identité d'entreprise",
      hint: "Promotion interne, fidélité et reconnaissance statutaire.",
    },
    {
      id: "s2",
      label: "Quadrant Continuité + Désaccord",
      answer: "Identité de blocage",
      hint: "Plafond de verre et assignation subie sans promotion.",
    },
    {
      id: "s3",
      label: "Quadrant Rupture + Accord",
      answer: "Identité de conversion",
      hint: "Mobilité réussie, reconversion qualifiante valorisée.",
    },
    {
      id: "s4",
      label: "Quadrant Rupture + Désaccord",
      answer: "Identité de crise",
      hint: "Licenciement, rupture de trajectoire et déclassement subi.",
    },
  ],
  "schema-sainsaulieu-matrice": [
    {
      id: "s1",
      label: "Faible pouvoir + Forte dépendance",
      answer: "Modèle fusionnel",
      hint: "Ouvriers spécialisés (OS) : camaraderie unanime de masse face au chef.",
    },
    {
      id: "s2",
      label: "Fort pouvoir + Forte dépendance",
      answer: "Modèle négociateur",
      hint: "Cadres et techniciens : culture du débat démocratique et compromis.",
    },
    {
      id: "s3",
      label: "Faible pouvoir + Faible dépendance",
      answer: "Modèle du retrait",
      hint: "Précaires et intérimaires : travail alimentaire, identité hors-travail.",
    },
    {
      id: "s4",
      label: "Fort pouvoir + Affinités sélectives",
      answer: "Modèle affinitaire",
      hint: "Jeunes managers nomades : réseaux de pairs électifs.",
    },
  ],
  "schema-castel-desaffiliation": [
    {
      id: "s1",
      label: "Palier 1 (Stabilité garantie)",
      answer: "Zone d'Intégration",
      hint: "Emploi stable garanti (CDI) + attaches relationnelles solides.",
    },
    {
      id: "s2",
      label: "Palier 2 (Antichambre du décrochage)",
      answer: "Zone de Vulnérabilité",
      hint: "Emploi précaire (CDD/intérim) + fragilité des liens familiaux.",
    },
    {
      id: "s3",
      label: "Palier 3 (Double rupture)",
      answer: "Zone de Désaffiliation",
      hint: "Chômage de longue durée + perte totale des attaches citoyennes.",
    },
  ],
};

const EXTRA_DISTRACTORS = [
  "Aliénation technologique",
  "Dissonance cognitive",
  "Arbitraire culturel",
  "Mandat institutionnel",
  "Savoir-faire de prudence",
  "Transaction financière",
];

export function SchemasMatricesModal({
  isOpen,
  onClose,
  defaultModule,
  initialSchemaId,
}: SchemasMatricesModalProps) {
  const [selectedModule, setSelectedModule] = useState<string>(
    defaultModule && /^pst(106|108|123)$/.test(defaultModule)
      ? defaultModule
      : "all",
  );
  const [selectedSchemaId, setSelectedSchemaId] = useState<string>(
    initialSchemaId || SCHEMAS_MATRICES[0]?.id || "",
  );
  const [viewMode, setViewMode] = useState<"svg" | "cloze" | "ascii">("svg");
  const [copied, setCopied] = useState(false);

  // Cloze Challenge State
  const [clozeAnswers, setClozeAnswers] = useState<Record<string, string>>({});
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  // Listen for global open events that specify a schemaId
  useEffect(() => {
    function handleOpenEvent(e: Event) {
      const customEvent = e as CustomEvent<{
        schemaId?: string;
        moduleKey?: string;
      }>;
      if (customEvent.detail?.schemaId) {
        setSelectedSchemaId(customEvent.detail.schemaId);
      }
      if (
        customEvent.detail?.moduleKey &&
        /^pst(106|108|123)$/.test(customEvent.detail.moduleKey)
      ) {
        setSelectedModule(customEvent.detail.moduleKey);
      }
    }
    window.addEventListener("pst:open-schemas", handleOpenEvent);
    return () =>
      window.removeEventListener("pst:open-schemas", handleOpenEvent);
  }, []);

  // Reset cloze state when changing schema
  useEffect(() => {
    setClozeAnswers({});
    setSelectedSlotId(null);
  }, [selectedSchemaId]);

  if (!isOpen) return null;

  const filtered = SCHEMAS_MATRICES.filter((s) =>
    selectedModule === "all" ? true : s.moduleKey === selectedModule,
  );

  const activeSchema =
    filtered.find((s) => s.id === selectedSchemaId) ||
    filtered[0] ||
    SCHEMAS_MATRICES[0]!;

  const challenges = CLOZE_CHALLENGES[activeSchema.id] || [];
  const correctCount = challenges.filter(
    (c) => clozeAnswers[c.id] === c.answer,
  ).length;
  const isAllSolved =
    challenges.length > 0 && correctCount === challenges.length;

  const allAvailableBadges = useMemo(() => {
    return [
      ...challenges.map((c) => c.answer),
      EXTRA_DISTRACTORS[0]!,
      EXTRA_DISTRACTORS[1]!,
    ].sort(() => 0.5 - Math.random());
  }, [activeSchema.id]);

  function handleCopyAscii() {
    triggerHaptic("success");
    playClickSound();
    navigator.clipboard.writeText(activeSchema.asciiRepresentation.trim());
    setCopied(true);
    toast.success("Schéma copié au presse-papier !");
    setTimeout(() => setCopied(false), 2000);
  }

  function handlePrintPlanche() {
    triggerHaptic("success");
    playSuccessSound();
    if (typeof window !== "undefined") {
      document.body.classList.add("printing-schemas");
      window.print();
      setTimeout(() => {
        document.body.classList.remove("printing-schemas");
      }, 1000);
    }
  }

  function handleOpenPalais() {
    playClickSound();
    onClose();
    window.dispatchEvent(new CustomEvent("pst:open-palais-memoire"));
  }

  function handleSelectClozeOption(chosenText: string) {
    if (!selectedSlotId) {
      // Find first empty slot
      const firstEmpty = challenges.find((c) => !clozeAnswers[c.id]);
      if (firstEmpty) {
        applyOption(firstEmpty.id, chosenText);
      } else {
        toast.info(
          "Tous les emplacements sont remplis. Cliquez sur une case pour la modifier.",
        );
      }
      return;
    }
    applyOption(selectedSlotId, chosenText);
  }

  function applyOption(slotId: string, chosenText: string) {
    const targetChallenge = challenges.find((c) => c.id === slotId);
    if (!targetChallenge) return;

    if (targetChallenge.answer === chosenText) {
      triggerHaptic("success");
      playSuccessSound();
      toast.success(`Correct ! ${chosenText}`);
    } else {
      triggerHaptic("error");
      playReviewSound();
      toast.error(`Erreur : Ce n'est pas le bon emplacement.`);
    }

    const nextAnswers = { ...clozeAnswers, [slotId]: chosenText };
    setClozeAnswers(nextAnswers);
    setSelectedSlotId(null);
  }

  return (
    <div
      id="schemas-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="schemas-modal-card"
        className="relative w-full max-w-5xl max-h-[94vh] flex flex-col rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête Feuille Modale */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-amber-500/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Layers className="size-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Boîte à Schémas &amp; Matrices Visuelles 18/20</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-800 dark:text-cyan-200 font-extrabold uppercase">
                  Mémoire Visuelle SVG
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                11 schémas vectoriels interactifs &amp; matrices théoriques
                canoniques pour l&apos;examen Cnam
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenPalais}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-500/15 text-purple-800 dark:text-purple-200 hover:bg-purple-500/25 transition-all cursor-pointer"
              title="Ouvrir le Palais de la mémoire tri-module (PST106, PST108, PST123)"
            >
              <Compass className="size-3.5" />
              <span>Palais Mémoire</span>
            </button>

            <button
              type="button"
              onClick={handlePrintPlanche}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-200/70 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 transition-all cursor-pointer"
              title="Imprimer ou enregistrer en PDF la planche des schémas (A4)"
            >
              <Printer className="size-3.5" />
              <span className="hidden sm:inline">Imprimer A4 / PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="size-8 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Filter Bar & View Mode Toggle */}
        <div className="p-3 border-b border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center justify-between flex-wrap gap-2 shrink-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { key: "all", label: "Tous (11)" },
              { key: "pst106", label: "PST106 (Leplat, Clot, Dejours)" },
              {
                key: "pst108",
                label: "PST108 (Vygotski, Bourdieu, Habermas, Bühler)",
              },
              { key: "pst123", label: "PST123 (Dubar, Sainsaulieu, Castel)" },
            ].map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => {
                  playClickSound();
                  setSelectedModule(f.key);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  selectedModule === f.key
                    ? "bg-cyan-600 text-white border-cyan-600 shadow-sm"
                    : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* 3-Way Mode Toggle: SVG vs CLOZE vs ASCII */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-200/60 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setViewMode("svg");
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === "svg"
                  ? "bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Palette className="size-3.5" />
              <span>Graphique SVG</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setViewMode("cloze");
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === "cloze"
                  ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Brain className="size-3.5" />
              <span>Défi Schéma à Trous</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setViewMode("ascii");
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === "ascii"
                  ? "bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <FileCode className="size-3.5" />
              <span>Copie (ASCII)</span>
            </button>
          </div>
        </div>

        {/* Content Body: Split View Left Selector & Right Inspector */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-0">
          {/* Left Column: Schema List */}
          <div className="md:col-span-4 border-r border-slate-200/80 dark:border-slate-800 overflow-y-auto p-3 space-y-1.5 bg-slate-50/50 dark:bg-slate-950/30">
            {filtered.map((s) => {
              const isSelected = activeSchema.id === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSelectedSchemaId(s.id);
                  }}
                  className={`w-full p-3 rounded-2xl text-left text-xs transition-all border cursor-pointer space-y-1 block ${
                    isSelected
                      ? "bg-cyan-600 text-white border-cyan-600 shadow-md scale-[1.02]"
                      : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-cyan-500/15 text-cyan-800 dark:text-cyan-200"
                      }`}
                    >
                      {s.moduleKey.toUpperCase()}
                    </span>
                    <span className="text-[10px] opacity-80">{s.annee}</span>
                  </div>
                  <div className="font-bold leading-snug truncate">
                    {s.titre}
                  </div>
                  <div
                    className={`text-[11px] truncate ${isSelected ? "text-cyan-100" : "text-slate-500"}`}
                  >
                    {s.auteur}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Schema Detailed View */}
          <div className="md:col-span-8 overflow-y-auto p-4 sm:p-6 space-y-5 bg-white dark:bg-slate-900">
            {/* Header info */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-800 dark:text-cyan-200 uppercase">
                  {activeSchema.moduleKey.toUpperCase()} · {activeSchema.auteur}{" "}
                  ({activeSchema.annee})
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 mt-1">
                  {activeSchema.titre}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyAscii}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 transition-all active:scale-95 cursor-pointer"
                  title="Copier le schéma en texte ASCII"
                >
                  {copied ? (
                    <Check className="size-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  <span>{copied ? "Copié !" : "Copier"}</span>
                </button>
              </div>
            </div>

            {/* Formule Clé Card */}
            <div className="p-3.5 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200/80 dark:border-cyan-900/50 text-xs text-slate-800 dark:text-slate-200 space-y-1">
              <span className="font-bold text-cyan-800 dark:text-cyan-300 flex items-center gap-1">
                <Sparkles className="size-3.5 text-cyan-600" />
                Formule Matrice à mémoriser :
              </span>
              <p className="m-0 font-semibold leading-relaxed text-slate-900 dark:text-slate-100">
                {activeSchema.formuleCle}
              </p>
            </div>

            {/* VIEW MODE 1: PURE VECTOR SVG */}
            {viewMode === "svg" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Palette className="size-3.5 text-cyan-600" />
                    <span>
                      Schéma Vectoriel Haute Résolution (Interactif) :
                    </span>
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Cliquez sur les zones pour explorer les définitions
                  </span>
                </div>
                <SvgFullScreenViewer
                  title={activeSchema.titre}
                  subtitle={`${activeSchema.auteur} (${activeSchema.annee}) · ${activeSchema.moduleKey.toUpperCase()}`}
                  buttonLabel="Agrandir en plein écran"
                >
                  <PstDiagramRenderer schemaId={activeSchema.id} />
                </SvgFullScreenViewer>
              </div>
            )}

            {/* VIEW MODE 2: DÉFI SCHÉMA À TROUS (CLOZE CHALLENGE) */}
            {viewMode === "cloze" && (
              <div className="space-y-4 p-4 rounded-3xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-900/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="size-5 text-purple-600" />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 m-0">
                        Défi de Reconstitution Spatiale
                      </h4>
                      <p className="text-[11px] text-slate-500 m-0">
                        Rétablissez les boîtes masquées du schéma pour valider
                        votre mémoire visuelle.
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300">
                    {correctCount} / {challenges.length} validés
                  </span>
                </div>

                {/* Slots Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {challenges.map((c, cIdx) => {
                    const currentVal = clozeAnswers[c.id];
                    const isCorrect = currentVal === c.answer;
                    const isSelected = selectedSlotId === c.id;

                    return (
                      <div
                        key={c.id}
                        onClick={() => {
                          playClickSound();
                          setSelectedSlotId(c.id);
                        }}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer space-y-1 ${
                          isSelected
                            ? "ring-2 ring-purple-600 bg-white dark:bg-slate-900 shadow-md"
                            : isCorrect
                              ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500/50"
                              : currentVal
                                ? "bg-rose-50/70 dark:bg-rose-950/30 border-rose-500/50"
                                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-300"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-slate-500 font-mono">
                            Boîte #{cIdx + 1}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate max-w-[140px]">
                            {c.label}
                          </span>
                        </div>

                        <div className="font-bold text-xs flex items-center justify-between min-h-[24px]">
                          {currentVal ? (
                            <span
                              className={
                                isCorrect
                                  ? "text-emerald-700 dark:text-emerald-300"
                                  : "text-rose-700 dark:text-rose-300"
                              }
                            >
                              {currentVal}
                            </span>
                          ) : (
                            <span className="text-slate-400 font-mono italic text-[11px]">
                              [ ? Cliquez pour placer le terme ]
                            </span>
                          )}
                          {isCorrect && (
                            <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                          )}
                        </div>

                        <p className="text-[10px] text-slate-500 dark:text-slate-400 m-0 leading-tight">
                          Indice : {c.hint}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Success Banner if all solved */}
                {isAllSolved ? (
                  <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-1 animate-fadeIn">
                    <span className="text-sm font-black text-emerald-800 dark:text-emerald-200 flex items-center justify-center gap-1.5">
                      <Sparkles className="size-4" />
                      Schéma Maîtrisé à 100% pour l&apos;Examen !
                    </span>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 m-0">
                      Vous avez reconstitué l&apos;intégralité des boîtes
                      spatiales de ce modèle canonique.
                    </p>
                  </div>
                ) : (
                  /* Word Bank Dock */
                  <div className="space-y-2 pt-2 border-t border-purple-200/60 dark:border-purple-900/40">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Banque de Termes (Cliquez pour placer dans la case
                      sélectionnée) :
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {allAvailableBadges.map((txt, tIdx) => (
                        <button
                          key={tIdx}
                          type="button"
                          onClick={() => handleSelectClozeOption(txt)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-purple-500 hover:bg-purple-500/10 transition-all cursor-pointer shadow-xs active:scale-95"
                        >
                          {txt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* VIEW MODE 3: ASCII SCHEMA FORMAT */}
            {viewMode === "ascii" && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <FileCode className="size-3.5 text-cyan-600" />
                  <span>
                    Représentation Graphique Canonique (Format Copie
                    d&apos;Examen) :
                  </span>
                </span>
                <pre className="p-3 sm:p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] sm:text-xs overflow-x-auto scrollbar-none leading-tight border border-slate-800 shadow-inner">
                  {activeSchema.asciiRepresentation.trim()}
                </pre>
              </div>
            )}

            {/* Éléments Clés Décortiqués */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Composants du schéma expliqués :
              </span>
              <div className="grid grid-cols-1 gap-2 text-xs">
                {activeSchema.elementsCles.map((el, eIdx) => (
                  <div
                    key={eIdx}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-0.5"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                      <span>{el.terme}</span>
                      <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.2 rounded-full">
                        {el.role}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed m-0 text-[11px]">
                      {el.explication}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conseils de reproduction d'examen & Pièges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 text-xs space-y-1">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                  <PenTool className="size-3.5 text-emerald-600" />
                  Conseil de dessin d&apos;examen 18/20 :
                </span>
                <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed m-0">
                  {activeSchema.reproductionExamenConseil}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 text-xs space-y-1">
                <span className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1">
                  <AlertTriangle className="size-3.5 text-rose-600" />
                  Piège éliminatoire à éviter :
                </span>
                <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed m-0">
                  {activeSchema.piegeDessinExamen}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

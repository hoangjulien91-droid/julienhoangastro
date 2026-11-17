"use client";

import { useEffect, useState, useMemo } from "react";
import {
  X,
  Layers,
  FileCode,
  Palette,
  Printer,
  Brain,
  Compass,
} from "lucide-react";
import {
  SCHEMAS_MATRICES,
} from "@/lib/pst/data/schemas-matrices";
import {
  CLOZE_CHALLENGES,
  EXTRA_DISTRACTORS,
} from "@/lib/pst/data/schemas-matrices-cloze";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { toast } from "sonner";
import { SchemaListView } from "./schemas/SchemaListView";
import { SchemaInspectorView } from "./schemas/SchemaInspectorView";

interface SchemasMatricesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
  initialSchemaId?: string;
}

const MODULE_FILTERS = [
  { key: "all", shortLabel: "Tous (11)", sub: "" },
  { key: "pst106", shortLabel: "PST106", sub: " (Leplat, Clot, Dejours)" },
  {
    key: "pst108",
    shortLabel: "PST108",
    sub: " (Vygotski, Bourdieu, Bühler)",
  },
  { key: "pst123", shortLabel: "PST123", sub: " (Dubar, Sainsaulieu, Castel)" },
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
  }, [activeSchema.id, challenges]);

  if (!isOpen) return null;

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
      role="dialog"
      aria-modal="true"
      aria-label="Boîte à Schémas & Matrices Visuelles 18/20"
    >
      <div
        id="schemas-modal-card"
        className="relative w-full max-w-5xl max-h-[94vh] flex flex-col rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête Feuille Modale */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-amber-500/10 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shadow-md shrink-0">
              <Layers className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 truncate">
                <span className="truncate">Boîte à Schémas 18/20</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-800 dark:text-cyan-200 font-extrabold uppercase shrink-0">
                  SVG
                </span>
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate">
                16 schémas vectoriels interactifs &amp; matrices théoriques
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
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
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-200/70 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 transition-all cursor-pointer"
              title="Imprimer ou enregistrer en PDF la planche des schémas (A4)"
            >
              <Printer className="size-3.5" />
              <span className="hidden sm:inline">Imprimer A4 / PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="size-8 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Fermer"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Filter Bar & View Mode Toggle */}
        <div className="p-2.5 sm:p-3 border-b border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center justify-between flex-wrap gap-2 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap max-w-full pb-0.5">
            {MODULE_FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => {
                  playClickSound();
                  setSelectedModule(f.key);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
                  selectedModule === f.key
                    ? "bg-cyan-600 text-white border-cyan-600 shadow-sm"
                    : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>{f.shortLabel}</span>
                <span className="hidden sm:inline font-normal text-[11px] opacity-90">
                  {f.sub}
                </span>
              </button>
            ))}
          </div>

          {/* 3-Way Mode Toggle */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-200/60 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700 shrink-0">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setViewMode("svg");
              }}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === "svg"
                  ? "bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Palette className="size-3.5" />
              <span>
                <span className="hidden sm:inline">Graphique </span>SVG
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setViewMode("cloze");
              }}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === "cloze"
                  ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Brain className="size-3.5" />
              <span>
                <span className="hidden sm:inline">Défi </span>À trous
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setViewMode("ascii");
              }}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === "ascii"
                  ? "bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <FileCode className="size-3.5" />
              <span>
                Copie<span className="hidden sm:inline"> (ASCII)</span>
              </span>
            </button>
          </div>
        </div>

        {/* Content Body: Split View Left Selector (Desktop) & Right Inspector */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-0">
          {/* Left Column: Schema List */}
          <div className="hidden md:block md:col-span-4 border-r border-slate-200/80 dark:border-slate-800 overflow-y-auto p-3 space-y-1.5 bg-slate-50/50 dark:bg-slate-950/30">
            <SchemaListView
              schemas={filtered}
              selectedSchemaId={activeSchema.id}
              onSelectSchemaId={setSelectedSchemaId}
            />
          </div>

          {/* Right Column: Schema Detailed View */}
          <div className="col-span-1 md:col-span-8 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-5 bg-white dark:bg-slate-900">
            <SchemaInspectorView
              activeSchema={activeSchema}
              filteredSchemas={filtered}
              selectedSchemaId={activeSchema.id}
              onSelectSchemaId={setSelectedSchemaId}
              viewMode={viewMode}
              copied={copied}
              onCopyAscii={handleCopyAscii}
              challenges={challenges}
              clozeAnswers={clozeAnswers}
              selectedSlotId={selectedSlotId}
              setSelectedSlotId={setSelectedSlotId}
              correctCount={correctCount}
              isAllSolved={isAllSolved}
              allAvailableBadges={allAvailableBadges}
              onSelectClozeOption={handleSelectClozeOption}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

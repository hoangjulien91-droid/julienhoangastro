"use client";

import { useState, useEffect } from "react";
import { X, Compass } from "lucide-react";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";
import { SCHEMAS_MATRICES } from "@/lib/pst/data/schemas-matrices";
import { PalaisMemoireSynoptiqueView } from "./palais-memoire/PalaisMemoireSynoptiqueView";
import { PalaisMemoireConstellationView } from "./palais-memoire/PalaisMemoireConstellationView";
import { PalaisMemoirePiegesView } from "./palais-memoire/PalaisMemoirePiegesView";

// Re-export data and types for full backward compatibility
export {
  DIMENSIONS_COMPARATIVES,
  PIEGES_TRANSVERSAUX,
  type ModuleDimensionItem,
  type DimensionSynoptique,
  type PiegeTransversalItem,
} from "@/lib/pst/data/palais-memoire-data";

interface PalaisMemoireModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

export function PalaisMemoireModal({
  isOpen,
  onClose,
  defaultModule = "all",
}: PalaisMemoireModalProps) {
  const [activeTab, setActiveTab] = useState<
    "synoptique" | "constellation" | "pieges"
  >("synoptique");
  const [, setSelectedModuleFocus] = useState<string>(defaultModule);
  const [scope, setScope] = useState<"s1" | "s2" | "all">("s1");

  useEffect(() => {
    if (isOpen) {
      setSelectedModuleFocus(defaultModule);
      if (defaultModule === "pst120" || defaultModule === "pst124") {
        setScope("s2");
      }
    }
  }, [isOpen, defaultModule]);

  if (!isOpen) return null;

  function handleOpenSchema(schemaId: string) {
    triggerHaptic("selection");
    playClickSound();
    onClose();
    window.dispatchEvent(
      new CustomEvent("pst:open-schemas", {
        detail: { schemaId },
      }),
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Palais de Mémoire — Navigation Synoptique RNCP 7"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[94vh] flex flex-col rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER iOS */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-amber-500/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-8 sm:size-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-purple-600 flex items-center justify-center text-white shadow-md shrink-0">
              <Compass className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 m-0 truncate">
                <span className="truncate">Palais de la Mémoire 18/20</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-800 dark:text-purple-300 font-extrabold uppercase shrink-0">
                  {scope === "all"
                    ? "RNCP 7 (5 UE)"
                    : scope === "s2"
                      ? "Semestre 2"
                      : "Semestre 1"}
                </span>
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate m-0">
                Matrice synoptique intégrale des UEs du Titre Psychologue du
                Travail
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
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

        {/* TABS SELECTOR */}
        <div className="p-2.5 sm:p-3 border-b border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap shrink-0">
          {[
            {
              key: "synoptique",
              label: "Vue Synoptique",
              full: " Panoramique",
            },
            {
              key: "constellation",
              label: `${SCHEMAS_MATRICES.length} Schémas`,
              full: " en Constellation",
            },
            { key: "pieges", label: "6 Pièges Croisés", full: " Transversaux" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                setActiveTab(tab.key as any);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
                activeTab === tab.key
                  ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                  : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              }`}
            >
              <span>{tab.label}</span>
              <span className="hidden sm:inline">{tab.full}</span>
            </button>
          ))}
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === "synoptique" && (
            <PalaisMemoireSynoptiqueView
              scope={scope}
              onSelectScope={setScope}
              onOpenSchema={handleOpenSchema}
            />
          )}

          {activeTab === "constellation" && (
            <PalaisMemoireConstellationView onOpenSchema={handleOpenSchema} />
          )}

          {activeTab === "pieges" && <PalaisMemoirePiegesView />}
        </div>
      </div>
    </div>
  );
}

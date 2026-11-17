"use client";

import { useEffect, useMemo, useState } from "react";
import { X, History } from "lucide-react";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";
import {
  HISTORICAL_MILESTONES,
  type Milestone,
} from "@/lib/pst/data/chronologie-historique-data";
import { ChronologieInspectorView } from "./chronologie/ChronologieInspectorView";

export { HISTORICAL_MILESTONES };
export type { Milestone };

interface ChronologieHistoriqueModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

const MODULE_FILTERS = [
  { key: "all", label: "Toute la frise" },
  { key: "pst106", label: "PST106 · Activité" },
  { key: "pst108", label: "PST108 · Dialogue" },
  { key: "pst120", label: "PST120 · Psychodynamique" },
  { key: "pst123", label: "PST123 · Travail & emploi" },
  { key: "pst124", label: "PST124 · Digital" },
];

export function ChronologieHistoriqueModal({
  isOpen,
  onClose,
  defaultModule,
}: ChronologieHistoriqueModalProps) {
  const [selectedModule, setSelectedModule] = useState<string>(
    defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)
      ? defaultModule
      : "all",
  );

  useEffect(() => {
    if (defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)) {
      setSelectedModule(defaultModule);
    }
  }, [defaultModule, isOpen]);

  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(
    HISTORICAL_MILESTONES[0]!.id,
  );

  const filtered = useMemo(() => {
    return HISTORICAL_MILESTONES.filter((m) =>
      selectedModule === "all"
        ? true
        : m.moduleKey === selectedModule || m.moduleKey === "global",
    );
  }, [selectedModule]);

  const activeMilestone =
    filtered.find((m) => m.id === selectedMilestoneId) ||
    filtered[0] ||
    HISTORICAL_MILESTONES[0]!;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Chronologie Historique des Théories et Controverses"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête Feuille Modale */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-md shrink-0">
              <History className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="truncate">Frise Historique &amp; Théories</span>
                <span className="text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 font-extrabold uppercase shrink-0">
                  1880 - 2026
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 truncate hidden xs:block">
                Généalogie des ruptures épistémologiques du travail et du Cnam
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

        {/* Filter Bar */}
        <div className="p-2.5 sm:p-3 border-b border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
          {MODULE_FILTERS.map((f) => {
            const count =
              f.key === "all"
                ? HISTORICAL_MILESTONES.length
                : HISTORICAL_MILESTONES.filter(
                    (m) => m.moduleKey === f.key || m.moduleKey === "global",
                  ).length;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => {
                  triggerHaptic("selection");
                  playClickSound();
                  setSelectedModule(f.key);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
                  selectedModule === f.key
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-300"
                }`}
              >
                {f.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Axe Chronologique Défilant Horizontalement */}
        <div className="p-2.5 sm:p-3 border-b border-slate-200/60 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-950/60 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {filtered.map((m) => {
            const isSelected = activeMilestone.id === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  triggerHaptic("selection");
                  playClickSound();
                  setSelectedMilestoneId(m.id);
                }}
                className={`px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs transition-all border shrink-0 flex flex-col items-center justify-center gap-0.5 cursor-pointer active:scale-95 min-w-[70px] ${
                  isSelected
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md scale-105"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-200/70"
                }`}
              >
                <span className="font-mono font-black text-xs sm:text-sm">
                  {m.annee}
                </span>
                <span className="text-[10px] font-semibold truncate max-w-[100px]">
                  {m.auteur.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Body: Inspector */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 bg-white dark:bg-slate-900">
          <ChronologieInspectorView activeMilestone={activeMilestone} />
        </div>
      </div>
    </div>
  );
}

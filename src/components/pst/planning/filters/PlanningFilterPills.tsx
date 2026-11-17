"use client";

import type { Dispatch, SetStateAction } from "react";
import type { PlanningEventType, PlanningUnitId } from "@/lib/pst/data/planning";
import type { PlanningFilters } from "@/lib/pst/planning-stats";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { PlanningModalitePills } from "./PlanningModalitePills";
import { PlanningUePills } from "./PlanningUePills";

interface PlanningFilterPillsProps {
  filters: PlanningFilters;
  setFilters: Dispatch<SetStateAction<PlanningFilters>>;
  showMobileFilters: boolean;
  activeFiltersCount: number;
  formatCounts: {
    all: number;
    cours: number;
    visio: number;
    distant: number;
  };
  totalConflictsCount: number;
  physicalConflictsCount: number;
  replayableConflictsCount: number;
  allTeachers: string[];
  toggleType: (t: PlanningEventType) => void;
  toggleUnit: (u: PlanningUnitId) => void;
  onShowAll: () => void;
  onResetFilters: () => void;
}

export function PlanningFilterPills({
  filters,
  setFilters,
  showMobileFilters,
  activeFiltersCount,
  formatCounts,
  totalConflictsCount,
  physicalConflictsCount,
  replayableConflictsCount,
  allTeachers,
  toggleType,
  toggleUnit,
  onShowAll,
  onResetFilters,
}: PlanningFilterPillsProps) {
  return (
    <div
      className={`space-y-3 pt-3 border-t border-slate-200/70 dark:border-slate-800/80 transition-all ${
        showMobileFilters ? "block" : "hidden sm:block"
      }`}
    >
      {/* Rangée 1 : Modalités & Périodes */}
      <PlanningModalitePills
        filters={filters}
        setFilters={setFilters}
        formatCounts={formatCounts}
        totalConflictsCount={totalConflictsCount}
        physicalConflictsCount={physicalConflictsCount}
        replayableConflictsCount={replayableConflictsCount}
        toggleType={toggleType}
        onShowAll={onShowAll}
      />

      {/* Rangée 2 : UE & Semestres */}
      <PlanningUePills
        filters={filters}
        setFilters={setFilters}
        toggleUnit={toggleUnit}
      />

      {/* Rangée 3 : Intervenant & Reset */}
      <div className="flex items-center justify-between gap-2 pt-0.5 flex-wrap">
        <select
          value={filters.teacher ?? "all"}
          onChange={(e) => {
            playClickSound();
            setFilters((f) => ({ ...f, teacher: e.target.value }));
          }}
          aria-label="Filtrer par intervenant"
          className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 cursor-pointer"
        >
          <option value="all">
            Tous les intervenants ({allTeachers.length})
          </option>
          {allTeachers.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onResetFilters();
            }}
            className="text-xs text-amber-700 dark:text-amber-300 font-bold hover:underline px-2 py-1 rounded-lg hover:bg-amber-500/10 cursor-pointer transition-colors"
          >
            Réinitialiser les filtres ({activeFiltersCount})
          </button>
        )}
      </div>
    </div>
  );
}

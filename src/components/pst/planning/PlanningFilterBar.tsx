"use client";

import type { RefObject } from "react";
import type {
  PlanningEventType,
  PlanningUnitId,
} from "@/lib/pst/data/planning";
import type { PlanningFilters } from "@/lib/pst/planning-stats";
import {
  PlanningViewNav,
  type PlanningViewMode,
} from "./filters/PlanningViewNav";
import { PlanningSearchAndExportBar } from "./filters/PlanningSearchAndExportBar";
import { PlanningFilterPills } from "./filters/PlanningFilterPills";

export type { PlanningViewMode };

interface PlanningFilterBarProps {
  activeView: PlanningViewMode;
  setView: (v: PlanningViewMode) => void;
  filters: PlanningFilters;
  setFilters: React.Dispatch<React.SetStateAction<PlanningFilters>>;
  searchInputRef: RefObject<HTMLInputElement>;
  showMobileFilters: boolean;
  setShowMobileFilters: React.Dispatch<React.SetStateAction<boolean>>;
  showExportMenu: boolean;
  setShowExportMenu: React.Dispatch<React.SetStateAction<boolean>>;
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
  onOpenIcsModal: () => void;
}

export function PlanningFilterBar({
  activeView,
  setView,
  filters,
  setFilters,
  searchInputRef,
  showMobileFilters,
  setShowMobileFilters,
  showExportMenu,
  setShowExportMenu,
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
  onOpenIcsModal,
}: PlanningFilterBarProps) {
  return (
    <div className="p-3 sm:p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md shadow-xs space-y-3">
      {/* Navigation de vue (Segmented Control pleine largeur) */}
      <PlanningViewNav activeView={activeView} setView={setView} />

      {/* Ligne 2 : Recherche & Export + Filtres */}
      {activeView !== "logistics" && (
        <>
          <PlanningSearchAndExportBar
            filters={filters}
            setFilters={setFilters}
            searchInputRef={searchInputRef}
            showMobileFilters={showMobileFilters}
            setShowMobileFilters={setShowMobileFilters}
            showExportMenu={showExportMenu}
            setShowExportMenu={setShowExportMenu}
            activeFiltersCount={activeFiltersCount}
            onOpenIcsModal={onOpenIcsModal}
          />

          <PlanningFilterPills
            filters={filters}
            setFilters={setFilters}
            showMobileFilters={showMobileFilters}
            activeFiltersCount={activeFiltersCount}
            formatCounts={formatCounts}
            totalConflictsCount={totalConflictsCount}
            physicalConflictsCount={physicalConflictsCount}
            replayableConflictsCount={replayableConflictsCount}
            allTeachers={allTeachers}
            toggleType={toggleType}
            toggleUnit={toggleUnit}
            onShowAll={onShowAll}
            onResetFilters={onResetFilters}
          />
        </>
      )}
    </div>
  );
}

"use client";

import type { RefObject, Dispatch, SetStateAction } from "react";
import {
  CalendarPlus,
  MoreVertical,
  Printer,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import type { PlanningFilters } from "@/lib/pst/planning-stats";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface PlanningSearchAndExportBarProps {
  filters: PlanningFilters;
  setFilters: Dispatch<SetStateAction<PlanningFilters>>;
  searchInputRef: RefObject<HTMLInputElement>;
  showMobileFilters: boolean;
  setShowMobileFilters: Dispatch<SetStateAction<boolean>>;
  showExportMenu: boolean;
  setShowExportMenu: Dispatch<SetStateAction<boolean>>;
  activeFiltersCount: number;
  onOpenIcsModal: () => void;
}

export function PlanningSearchAndExportBar({
  filters,
  setFilters,
  searchInputRef,
  showMobileFilters,
  setShowMobileFilters,
  showExportMenu,
  setShowExportMenu,
  activeFiltersCount,
  onOpenIcsModal,
}: PlanningSearchAndExportBarProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1 min-w-0">
        <Search className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          ref={searchInputRef}
          type="text"
          aria-label="Rechercher une séance par salle, enseignant ou date"
          value={filters.search ?? ""}
          onChange={(e) =>
            setFilters((f) => ({ ...f, search: e.target.value }))
          }
          placeholder="Salle, prof, date..."
          className="w-full pl-9 pr-8 sm:pr-12 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {filters.search && (
            <button
              type="button"
              aria-label="Effacer la recherche"
              onClick={() => setFilters((f) => ({ ...f, search: "" }))}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer p-0.5"
            >
              <X className="size-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[10px] font-bold text-slate-500">
            /
          </kbd>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          playClickSound();
          setShowMobileFilters((prev) => !prev);
        }}
        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-95 ${
          showMobileFilters || activeFiltersCount > 0
            ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
            : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-700/80"
        }`}
        aria-expanded={showMobileFilters}
        aria-label="Afficher ou masquer les filtres"
      >
        <SlidersHorizontal className="size-3.5 shrink-0" />
        <span>Filtres</span>
        {activeFiltersCount > 0 && (
          <span
            className={`px-1.5 py-0.5 rounded-full font-mono text-[10px] font-black ${
              showMobileFilters || activeFiltersCount > 0
                ? "bg-white text-amber-700 dark:bg-slate-900 dark:text-amber-300"
                : "bg-amber-500 text-white"
            }`}
          >
            {activeFiltersCount}
          </span>
        )}
      </button>

      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setShowExportMenu((prev) => !prev)}
          className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-2xs"
          title="Exporter ou imprimer le planning"
          aria-expanded={showExportMenu}
        >
          <MoreVertical className="size-3.5" />
          <span className="hidden sm:inline">Export</span>
        </button>

        {showExportMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowExportMenu(false)}
            />
            <div className="absolute right-0 mt-1.5 w-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-50 p-1.5 space-y-1 animate-fadeIn text-xs">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setShowExportMenu(false);
                  onOpenIcsModal();
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-2 cursor-pointer transition-colors"
              >
                <CalendarPlus className="size-3.5 text-amber-600" />
                <span>Exporter .ics</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setShowExportMenu(false);
                  window.print();
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Printer className="size-3.5 text-slate-600 dark:text-slate-400" />
                <span>Imprimer / PDF</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

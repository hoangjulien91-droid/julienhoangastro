"use client";

import type { RefObject } from "react";
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  Building2,
  CalendarDays,
  CalendarPlus,
  Car,
  EyeOff,
  Globe,
  ListFilter,
  MoreVertical,
  Printer,
  Search,
  SlidersHorizontal,
  Video,
  X,
} from "lucide-react";
import {
  PLANNING_EVENTS,
  UNIT_ORDER,
  type PlanningEventType,
  type PlanningUnitId,
} from "@/lib/pst/data/planning";
import type { PlanningFilters } from "@/lib/pst/planning-stats";
import { playClickSound } from "@/lib/pst/audio-feedback";

export type PlanningViewMode = "grid" | "week" | "list" | "logistics";

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
      {/* LIGNE 1 : Navigation de vue (Segmented Control pleine largeur) */}
      <div className="w-full">
        <div className="grid grid-cols-4 p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60 shadow-inner w-full">
          <button
            type="button"
            onClick={() => setView("grid")}
            className={`py-1.5 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              activeView === "grid"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
            title="Vue Frise Chronologique (Raccourci clavier : 1)"
          >
            <BarChart3 className="size-3.5 shrink-0" />
            <span className="inline">Frise</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px] font-bold">
              1
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setView("week")}
            className={`py-1.5 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              activeView === "week"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
            title="Vue Agenda Hebdomadaire (Raccourci clavier : 2)"
          >
            <CalendarDays className="size-3.5 shrink-0" />
            <span className="inline">Hebdo</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px] font-bold">
              2
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setView("list")}
            className={`py-1.5 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              activeView === "list"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
            title="Vue Liste Mensuelle (Raccourci clavier : 3)"
          >
            <ListFilter className="size-3.5 shrink-0" />
            <span className="inline">Liste</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px] font-bold">
              3
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setView("logistics")}
            className={`py-1.5 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              activeView === "logistics"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
            title="Vue Trajets Bègles (Raccourci clavier : 4)"
          >
            <Car className="size-3.5 shrink-0" />
            <span className="inline">Trajets</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px] font-bold">
              4
            </kbd>
          </button>
        </div>
      </div>

      {/* LIGNE 2 & FILTRES */}
      {activeView !== "logistics" && (
        <>
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

          <div
            className={`space-y-3 pt-3 border-t border-slate-200/70 dark:border-slate-800/80 transition-all ${
              showMobileFilters ? "block" : "hidden sm:block"
            }`}
          >
            {/* Rangée 1 : Modalités */}
            <div className="relative">
              <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 sm:flex-wrap scrollbar-none no-scrollbar text-xs pr-6">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onShowAll();
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold border transition-all shrink-0 cursor-pointer active:scale-95 ${
                    filters.types.has("COURS") &&
                    filters.types.has("WEBCONF") &&
                    filters.types.has("DISTANT") &&
                    !filters.onlyConflicts &&
                    !filters.hidePast &&
                    filters.units.size === UNIT_ORDER.length
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-2xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <Globe className="inline-block mr-1 size-3" />
                  Tout ({formatCounts.all})
                </button>

                <button
                  type="button"
                  onClick={() => toggleType("COURS")}
                  className={`px-3 py-1.5 rounded-xl font-bold border transition-all shrink-0 cursor-pointer active:scale-95 ${
                    filters.types.has("COURS")
                      ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
                      : "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30"
                  }`}
                >
                  <Building2 className="inline-block mr-1 size-3" />
                  Cours Bègles ({formatCounts.cours})
                </button>

                <button
                  type="button"
                  onClick={() => toggleType("WEBCONF")}
                  className={`px-3 py-1.5 rounded-xl font-bold border transition-all shrink-0 cursor-pointer active:scale-95 ${
                    filters.types.has("WEBCONF")
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                      : "bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border-indigo-500/30"
                  }`}
                >
                  <Video className="inline-block mr-1 size-3" />
                  Webconf. ({formatCounts.visio})
                </button>

                <button
                  type="button"
                  onClick={() => toggleType("DISTANT")}
                  className={`px-3 py-1.5 rounded-xl font-bold border transition-all shrink-0 cursor-pointer active:scale-95 ${
                    filters.types.has("DISTANT")
                      ? "bg-slate-700 text-white border-slate-700 shadow-2xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <BookOpen className="inline-block mr-1 size-3" />
                  Distantes ({formatCounts.distant})
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setFilters((f) => ({
                      ...f,
                      onlyConflicts: !f.onlyConflicts,
                    }));
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold border transition-all shrink-0 cursor-pointer active:scale-95 ${
                    filters.onlyConflicts
                      ? "bg-rose-600 text-white border-rose-600 shadow-2xs"
                      : "bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/30"
                  }`}
                  title={`${physicalConflictsCount} cours présentiels simultanés critiques · ${replayableConflictsCount} séances avec webconférence`}
                >
                  <AlertTriangle className="inline-block mr-1 size-3 text-amber-500" />
                  Chevauchements ({totalConflictsCount})
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setFilters((f) => ({ ...f, hidePast: !f.hidePast }));
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold border transition-all shrink-0 cursor-pointer active:scale-95 ${
                    filters.hidePast
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <EyeOff className="inline-block mr-1 size-3" />À venir
                  uniquement
                </button>

                {/* Raccourcis Période 1-clic */}
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setFilters((f) => ({
                      ...f,
                      quickPeriod: f.quickPeriod === "week" ? "all" : "week",
                    }));
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold border transition-all shrink-0 cursor-pointer active:scale-95 ${
                    filters.quickPeriod === "week"
                      ? "bg-sky-600 text-white border-sky-600 shadow-2xs"
                      : "bg-sky-500/10 text-sky-800 dark:text-sky-300 border-sky-500/30"
                  }`}
                  title="Afficher uniquement les séances de la semaine en cours (Lundi–Dimanche)"
                >
                  <CalendarDays className="inline-block mr-1 size-3" />
                  Cette semaine
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setFilters((f) => ({
                      ...f,
                      quickPeriod: f.quickPeriod === "weekend" ? "all" : "weekend",
                    }));
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold border transition-all shrink-0 cursor-pointer active:scale-95 ${
                    filters.quickPeriod === "weekend"
                      ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
                      : "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30"
                  }`}
                  title="Afficher uniquement les séances du week-end (Samedi–Dimanche)"
                >
                  <CalendarDays className="inline-block mr-1 size-3" />
                  Ce week-end
                </button>
              </div>
              <div className="sm:hidden absolute top-0 right-0 bottom-1 w-8 bg-gradient-to-l from-white dark:from-slate-900 to-transparent pointer-events-none" />
            </div>

            {/* Rangée 2 : UE & Semestres */}
            <div className="relative">
              <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 scrollbar-none no-scrollbar text-xs pr-6">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase mr-1 shrink-0">
                  UE :
                </span>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setFilters((f) => ({
                      ...f,
                      units: new Set<PlanningUnitId>([
                        "pst106",
                        "pst108",
                        "pst123",
                      ]),
                    }));
                  }}
                  className={`px-2.5 py-1 rounded-xl font-bold border transition-all shrink-0 cursor-pointer active:scale-95 ${
                    filters.units.has("pst106") &&
                    filters.units.has("pst108") &&
                    filters.units.has("pst123") &&
                    !filters.units.has("pst120") &&
                    !filters.units.has("pst124")
                      ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
                      : "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/20"
                  }`}
                  title="Afficher uniquement les 3 UE actives du Semestre 1 (PST106, 108, 123)"
                >
                  S1 en cours (106·108·123)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setFilters((f) => ({
                      ...f,
                      units: new Set<PlanningUnitId>(["pst120", "pst124"]),
                    }));
                  }}
                  className={`px-2.5 py-1 rounded-xl font-bold border transition-all shrink-0 cursor-pointer active:scale-95 ${
                    filters.units.has("pst120") &&
                    filters.units.has("pst124") &&
                    !filters.units.has("pst106") &&
                    !filters.units.has("pst108") &&
                    !filters.units.has("pst123")
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                      : "bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/20"
                  }`}
                  title="Afficher uniquement les 2 UE du Semestre 2 (PST120, 124)"
                >
                  S2 à venir (120·124)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setFilters((f) => ({
                      ...f,
                      units:
                        f.units.size === UNIT_ORDER.length
                          ? new Set()
                          : new Set(UNIT_ORDER),
                    }));
                  }}
                  className={`px-2.5 py-1 rounded-xl font-mono text-[11px] font-bold border transition-all shrink-0 cursor-pointer active:scale-95 ${
                    filters.units.size === UNIT_ORDER.length
                      ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-2xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  Toutes ({UNIT_ORDER.length})
                </button>
                {UNIT_ORDER.map((u) => {
                  const active = filters.units.has(u);
                  const isS2 = u === "pst120" || u === "pst124";
                  const count = PLANNING_EVENTS.filter(
                    (e) => e.unit === u && filters.types.has(e.type),
                  ).length;
                  return (
                    <button
                      key={u}
                      type="button"
                      onClick={() => toggleUnit(u)}
                      className={`px-2.5 py-1 rounded-xl font-mono text-[11px] font-black uppercase border transition-all shrink-0 cursor-pointer active:scale-95 flex items-center gap-1 ${
                        active
                          ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-2xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-800 opacity-60"
                      }`}
                      title={`Basculer l'UE ${u.toUpperCase()} (${count} séances selon les formats actifs)`}
                    >
                      <span>{u}</span>
                      {isS2 && (
                        <span className="text-[10px] px-1 py-0.5 rounded bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                          S2
                        </span>
                      )}
                      <span className="text-[10px] font-normal opacity-80 font-sans">
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="sm:hidden absolute top-0 right-0 bottom-1 w-8 bg-gradient-to-l from-white dark:from-slate-900 to-transparent pointer-events-none" />
            </div>

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
        </>
      )}
    </div>
  );
}

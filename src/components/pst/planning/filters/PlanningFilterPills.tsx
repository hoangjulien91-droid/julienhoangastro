"use client";

import type { Dispatch, SetStateAction } from "react";
import {
  AlertTriangle,
  BookOpen,
  Building2,
  CalendarDays,
  EyeOff,
  Globe,
  Video,
} from "lucide-react";
import {
  PLANNING_EVENTS,
  UNIT_ORDER,
  type PlanningEventType,
  type PlanningUnitId,
} from "@/lib/pst/data/planning";
import type { PlanningFilters } from "@/lib/pst/planning-stats";
import { playClickSound } from "@/lib/pst/audio-feedback";

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
  );
}

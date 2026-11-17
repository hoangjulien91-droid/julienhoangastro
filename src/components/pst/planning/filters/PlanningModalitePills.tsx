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
import { UNIT_ORDER, type PlanningEventType } from "@/lib/pst/data/planning";
import type { PlanningFilters } from "@/lib/pst/planning-stats";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface PlanningModalitePillsProps {
  filters: PlanningFilters;
  setFilters: Dispatch<SetStateAction<PlanningFilters>>;
  formatCounts: {
    all: number;
    cours: number;
    visio: number;
    distant: number;
  };
  totalConflictsCount: number;
  physicalConflictsCount: number;
  replayableConflictsCount: number;
  toggleType: (t: PlanningEventType) => void;
  onShowAll: () => void;
}

export function PlanningModalitePills({
  filters,
  setFilters,
  formatCounts,
  totalConflictsCount,
  physicalConflictsCount,
  replayableConflictsCount,
  toggleType,
  onShowAll,
}: PlanningModalitePillsProps) {
  return (
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
  );
}

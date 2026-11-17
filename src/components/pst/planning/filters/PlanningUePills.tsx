"use client";

import type { Dispatch, SetStateAction } from "react";
import {
  PLANNING_EVENTS,
  UNIT_ORDER,
  type PlanningUnitId,
} from "@/lib/pst/data/planning";
import type { PlanningFilters } from "@/lib/pst/planning-stats";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface PlanningUePillsProps {
  filters: PlanningFilters;
  setFilters: Dispatch<SetStateAction<PlanningFilters>>;
  toggleUnit: (u: PlanningUnitId) => void;
}

export function PlanningUePills({
  filters,
  setFilters,
  toggleUnit,
}: PlanningUePillsProps) {
  return (
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
  );
}

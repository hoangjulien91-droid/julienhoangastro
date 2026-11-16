"use client";

import { Info } from "lucide-react";
import { PLANNING_EVENTS } from "@/lib/pst/data/planning";
import { matchesFilters, type PlanningFilters } from "@/lib/pst/planning-stats";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface PlanningActiveFilterBannerProps {
  activeView: string;
  filters: PlanningFilters;
  isMobile: boolean;
  activeFiltersCount: number;
  onShowAll: () => void;
  onResetFilters: () => void;
}

export function PlanningActiveFilterBanner({
  activeView,
  filters,
  isMobile,
  activeFiltersCount,
  onShowAll,
  onResetFilters,
}: PlanningActiveFilterBannerProps) {
  const visibleCount = PLANNING_EVENTS.filter((e) =>
    matchesFilters(e, filters),
  ).length;

  const isOnlyS2 =
    filters.units.size > 0 &&
    Array.from(filters.units).every((u) => u === "pst120" || u === "pst124");

  return (
    <>
      {activeView !== "logistics" && visibleCount < PLANNING_EVENTS.length && (
        <div className="flex items-center justify-between px-3.5 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200 text-xs shadow-2xs">
          <div className="flex items-center gap-2 truncate">
            <span className="size-1.5 rounded-full bg-amber-500 shrink-0 animate-pulse" />
            <span className="truncate">
              <b>
                {visibleCount} / {PLANNING_EVENTS.length}
              </b>{" "}
              séances
              {isMobile && activeFiltersCount === 0 ? (
                <span className="text-amber-700/80 dark:text-amber-300/80 font-medium">
                  {" "}
                  (présentiel &amp; webconf)
                </span>
              ) : (
                <>
                  {" "}
                  affichées
                  <span className="hidden sm:inline text-amber-700/80 dark:text-amber-300/80">
                    {" "}
                    ({PLANNING_EVENTS.length - visibleCount} masquées)
                  </span>
                </>
              )}
            </span>
          </div>
          {isMobile && activeFiltersCount === 0 ? (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onShowAll();
              }}
              className="font-bold text-amber-700 dark:text-amber-300 hover:underline shrink-0 text-xs cursor-pointer px-2 py-0.5 rounded-lg hover:bg-amber-500/15 transition-colors"
            >
              Afficher tout
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onResetFilters();
              }}
              className="font-bold text-amber-700 dark:text-amber-300 hover:underline shrink-0 text-xs cursor-pointer px-2 py-0.5 rounded-lg hover:bg-amber-500/15 transition-colors"
            >
              Réinitialiser
            </button>
          )}
        </div>
      )}

      {isOnlyS2 && (
        <div className="flex items-start gap-2.5 p-3.5 sm:p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-900 dark:text-indigo-200 text-xs shadow-2xs animate-fadeIn">
          <Info className="size-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold text-indigo-950 dark:text-indigo-100">
              Calendrier Semestre 2 (PST120 &amp; PST124) en cours de
              consolidation officielle
            </p>
            <p className="text-indigo-700/90 dark:text-indigo-300/90">
              Les plannings détaillés du S2 sont diffusés par le CNAM
              Nouvelle-Aquitaine à l&apos;ouverture du semestre (début 2027). Les
              séances inaugurales connues sont d&apos;ores et déjà intégrées
              ci-dessous.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

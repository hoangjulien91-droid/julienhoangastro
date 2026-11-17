"use client";

import React from "react";
import type { FichesFilter } from "../Fiches";
import { playClickSound } from "@/lib/pst/audio-feedback";

export interface FichesToolbarProps {
  mastered: number;
  total: number;
  pct: number;
  query: string;
  onQueryChange: (q: string) => void;
  filters: FichesFilter[];
  currentFilter: string;
  onFilterChange: (key: string) => void;
  hasEssentielCards: boolean;
  showEssentielEncart: boolean;
  activeCourseEssentielId?: string;
  onToggleEssentielEncart: () => void;
  viewMode: "accordion" | "reader" | "feynman60s";
  onViewModeChange: (m: "accordion" | "reader" | "feynman60s") => void;
  showMobileOptions: boolean;
  onToggleMobileOptions: () => void;
  maskKeywords: boolean;
  onToggleMaskKeywords: () => void;
  selfTestBlur: boolean;
  onToggleSelfTestBlur: () => void;
  onlyFavs: boolean;
  favCount: number;
  onToggleOnlyFavs: () => void;
  onlyUnmastered: boolean;
  remainingCount: number;
  onToggleOnlyUnmastered: () => void;
  allVisibleOpen: boolean;
  onToggleExpandAll: () => void;
}

export function FichesToolbar({
  mastered,
  total,
  pct,
  query,
  onQueryChange,
  filters,
  currentFilter,
  onFilterChange,
  hasEssentielCards,
  showEssentielEncart,
  activeCourseEssentielId,
  onToggleEssentielEncart,
  viewMode,
  onViewModeChange,
  showMobileOptions,
  onToggleMobileOptions,
  maskKeywords,
  onToggleMaskKeywords,
  selfTestBlur,
  onToggleSelfTestBlur,
  onlyFavs,
  favCount,
  onToggleOnlyFavs,
  onlyUnmastered,
  remainingCount,
  onToggleOnlyUnmastered,
  allVisibleOpen,
  onToggleExpandAll,
}: FichesToolbarProps) {
  return (
    <div className="fiches-controls-card">
      <div className="fiche-progress-container">
        <div className="fiche-progress-header">
          <span className="fiche-progress-title">
            Progression de mémorisation
          </span>
          <span className="fiche-progress-stats">
            {mastered} / {total} fiches maîtrisées ({pct}%)
          </span>
        </div>
        <div className="fiche-progress-bar">
          <div className="fiche-progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="fiches-filter-row">
        <div className="fiche-search-wrapper">
          <input
            type="text"
            aria-label="Rechercher une notion, une formule clé, un auteur ou une note"
            className="fiche-search-input"
            placeholder="Rechercher une notion, une formule clé, un auteur ou une note..."
            autoComplete="off"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
          {query && (
            <button
              type="button"
              aria-label="Effacer la recherche"
              className="fiche-search-clear"
              onClick={() => onQueryChange("")}
            >
              ×
            </button>
          )}
        </div>

        <div className="chips flex items-center justify-between flex-wrap gap-2 mt-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 sm:flex-wrap scrollbar-none w-full sm:w-auto">
            {filters.map((f) => (
              <button
                key={f.key}
                className="chip shrink-0"
                aria-pressed={currentFilter === f.key}
                onClick={() => onFilterChange(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 w-full justify-end flex-wrap">
            <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 scrollbar-none">
              {hasEssentielCards && (
                <button
                  type="button"
                  className="chip"
                  aria-pressed={showEssentielEncart || !!activeCourseEssentielId}
                  onClick={onToggleEssentielEncart}
                  title="Afficher l'encart L'Essentiel du cours (Ce qu'il faut savoir, retenir, auteurs, concepts)"
                >
                  {showEssentielEncart || activeCourseEssentielId
                    ? "✓ 📌 L'Essentiel du cours"
                    : "📌 L'Essentiel du cours"}
                </button>
              )}
              <button
                type="button"
                className="chip"
                aria-pressed={viewMode === "feynman60s"}
                onClick={() => {
                  playClickSound();
                  const next = viewMode === "feynman60s" ? "accordion" : "feynman60s";
                  if (next === "feynman60s" && typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("pst:capsule-consulted"));
                  }
                  onViewModeChange(next);
                }}
                title="Mode Capsules Feynman 60s : visualisez les synthèses éclair pour réviser vite"
              >
                {viewMode === "feynman60s"
                  ? "✓ Capsules 60s (Feynman)"
                  : "⚡️ Capsules 60s"}
              </button>
              <button
                type="button"
                className="chip"
                aria-pressed={viewMode === "reader"}
                onClick={() => {
                  playClickSound();
                  onViewModeChange(viewMode === "accordion" ? "reader" : "accordion");
                }}
                title="Basculer en mode liseuse fiche par fiche"
              >
                {viewMode === "reader"
                  ? "✓ Mode Liseuse 1/1"
                  : "Mode Liseuse 1/1"}
              </button>
              <button
                type="button"
                className="chip sm:hidden"
                aria-expanded={showMobileOptions}
                onClick={onToggleMobileOptions}
              >
                {(() => {
                  const activeCount =
                    (maskKeywords ? 1 : 0) +
                    (selfTestBlur ? 1 : 0) +
                    (onlyFavs ? 1 : 0) +
                    (onlyUnmastered ? 1 : 0);
                  return `Options${activeCount > 0 ? ` (${activeCount})` : ""}`;
                })()}
              </button>
            </div>

            <div
              className={`${
                showMobileOptions ? "flex" : "hidden"
              } sm:flex items-center gap-1.5 flex-wrap w-full sm:w-auto justify-end`}
            >
              <button
                type="button"
                className="chip"
                aria-pressed={maskKeywords}
                onClick={onToggleMaskKeywords}
                title="Mode Texte à trous : masquer uniquement les concepts en gras pour réciter activement"
              >
                {maskKeywords ? "✓ Mots-clés masqués" : "Masquer mots-clés"}
              </button>
              <button
                type="button"
                className="chip"
                aria-pressed={selfTestBlur}
                onClick={onToggleSelfTestBlur}
                title="Flouter l'essentiel et la formule clé pour vous auto-interroger"
              >
                {selfTestBlur ? "✓ Auto-test actif" : "Auto-test (Flouter)"}
              </button>
              <button
                type="button"
                className="chip"
                aria-pressed={onlyFavs}
                onClick={onToggleOnlyFavs}
              >
                {onlyFavs
                  ? `✓ ⭐ Favoris (${favCount})`
                  : `⭐ Favoris (${favCount})`}
              </button>
              <button
                type="button"
                className="chip"
                aria-pressed={onlyUnmastered}
                onClick={onToggleOnlyUnmastered}
              >
                {onlyUnmastered
                  ? `✓ À maîtriser (${remainingCount})`
                  : `À maîtriser (${remainingCount})`}
              </button>
              {viewMode === "accordion" && (
                <button
                  type="button"
                  className="chip"
                  onClick={onToggleExpandAll}
                >
                  {allVisibleOpen ? "Tout replier" : "Tout déplier"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

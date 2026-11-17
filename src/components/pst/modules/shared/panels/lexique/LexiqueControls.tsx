"use client";

import { BookMarked } from "lucide-react";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";
import type { LexiqueFilter } from "../Lexique";

interface LexiqueControlsProps {
  totalCount: number;
  filteredCount: number;
  query: string;
  onQueryChange: (q: string) => void;
  filters: LexiqueFilter[];
  activeFilter: string;
  onFilterChange: (key: string) => void;
  onlyBookmarked: boolean;
  onToggleOnlyBookmarked: () => void;
  bookmarkedCount: number;
  availableLetters: string[];
  letterFilter: string;
  onSelectLetter: (letter: string) => void;
  testMode: boolean;
  onToggleTestMode: () => void;
  revealedCount: number;
  onToggleRevealAll: () => void;
}

export function LexiqueControls({
  totalCount,
  filteredCount,
  query,
  onQueryChange,
  filters,
  activeFilter,
  onFilterChange,
  onlyBookmarked,
  onToggleOnlyBookmarked,
  bookmarkedCount,
  availableLetters,
  letterFilter,
  onSelectLetter,
  testMode,
  onToggleTestMode,
  revealedCount,
  onToggleRevealAll,
}: LexiqueControlsProps) {
  return (
    <div className="lexique-controls-card">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 dark:border-slate-800 pb-2.5">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5">
          <BookMarked className="size-3 text-indigo-600 dark:text-indigo-400" />
          <span>Glossaire Clinique Fondamental</span>
        </span>
        <span className="text-[10px] font-mono font-semibold text-slate-400 dark:text-slate-500 uppercase">
          {filteredCount} / {totalCount} Notions
        </span>
      </div>

      <div className="lexique-filter-row">
        <div className="lexique-search-wrapper">
          <input
            type="text"
            aria-label="Rechercher un concept, une définition ou une application"
            className="lexique-search-input"
            placeholder="Rechercher un concept, une définition ou une application..."
            autoComplete="off"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
          {query && (
            <button
              className="lexique-search-clear"
              onClick={() => onQueryChange("")}
            >
              ×
            </button>
          )}
        </div>

        <div className="chips">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`chip${activeFilter === f.key ? " active" : ""}`}
              onClick={() => onFilterChange(f.key)}
            >
              {f.label}
            </button>
          ))}
          <button
            type="button"
            className={`chip${onlyBookmarked ? " active" : ""}`}
            onClick={onToggleOnlyBookmarked}
          >
            ★ À revoir ({bookmarkedCount})
          </button>
        </div>

        {/* Index alphabétique rapide A–Z */}
        <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap pb-1 scrollbar-none max-w-full pt-1">
          <span className="shrink-0 text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground mr-1">
            Index A–Z :
          </span>
          <button
            type="button"
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono transition-all cursor-pointer shrink-0 ${
              letterFilter === "all"
                ? "bg-primary text-primary-foreground font-bold shadow-xs"
                : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/80"
            }`}
            onClick={() => {
              triggerHaptic("light");
              playClickSound();
              onSelectLetter("all");
            }}
          >
            Toutes ({totalCount})
          </button>
          {availableLetters.map((ltr) => (
            <button
              key={ltr}
              type="button"
              className={`size-6 rounded-full text-[11px] font-mono transition-all cursor-pointer shrink-0 flex items-center justify-center ${
                letterFilter === ltr
                  ? "bg-primary text-primary-foreground font-bold shadow-xs scale-105"
                  : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/70"
              }`}
              onClick={() => {
                triggerHaptic("light");
                playClickSound();
                onSelectLetter(letterFilter === ltr ? "all" : ltr);
              }}
            >
              {ltr}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 flex-wrap pt-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer border ${
                testMode
                  ? "bg-accent/15 text-accent border-accent/30 font-bold shadow-2xs"
                  : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border-border/80"
              }`}
              onClick={() => {
                triggerHaptic("light");
                playClickSound();
                onToggleTestMode();
              }}
            >
              Mode test : {testMode ? "Activé" : "Désactivé"}
            </button>
            {testMode && (
              <button
                type="button"
                className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/80 transition-all cursor-pointer shadow-2xs"
                onClick={() => {
                  triggerHaptic("light");
                  playClickSound();
                  onToggleRevealAll();
                }}
              >
                {revealedCount === filteredCount
                  ? "Tout masquer"
                  : "Tout révéler"}
              </button>
            )}
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">
            {filteredCount} / {totalCount} concepts affichés
          </span>
        </div>
      </div>
    </div>
  );
}

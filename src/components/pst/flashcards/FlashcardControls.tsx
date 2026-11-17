"use client";

import type { PstStore } from "@/lib/pst/store";
import type { AMap, Flashcard } from "@/lib/pst/types";
import { LeitnerBoxes } from "./LeitnerBoxes";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";
import {
  Download,
  FileText,
  Headphones,
  Search,
  Star,
} from "lucide-react";

export interface FlashcardControlsProps {
  store: PstStore;
  cartes: Flashcard[];
  authors: AMap;
  currentAxis: string;
  onAxisChange: (axis: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  hideBonus: boolean;
  onHideBonusChange: (v: boolean) => void;
  shuffleOn: boolean;
  onShuffleChange: (v: boolean) => void;
  onlyKo: boolean;
  onOnlyKoChange: (v: boolean) => void;
  dueOnly: boolean;
  onDueOnlyChange: (v: boolean) => void;
  onlyFavs: boolean;
  onOnlyFavsChange: (v: boolean) => void;
  leitnerSort: boolean;
  onLeitnerSortChange: (v: boolean) => void;
  leitnerFilter: number | null;
  onLeitnerFilterChange: (box: number | null) => void;
  dueCount: number;
  dueNew: number;
  dueReview: number;
  okCount: number;
  restCount: number;
  onExportAnki: () => void;
  onExportMarkdown: () => void;
  isAudioHandsFreeActive: boolean;
  onToggleAudioHandsFree: () => void;
}

export function FlashcardControls({
  store,
  cartes,
  authors,
  currentAxis,
  onAxisChange,
  searchQuery,
  onSearchChange,
  hideBonus,
  onHideBonusChange,
  shuffleOn,
  onShuffleChange,
  onlyKo,
  onOnlyKoChange,
  dueOnly,
  onDueOnlyChange,
  onlyFavs,
  onOnlyFavsChange,
  leitnerSort,
  onLeitnerSortChange,
  leitnerFilter,
  onLeitnerFilterChange,
  dueCount,
  dueNew,
  dueReview,
  okCount,
  restCount,
  onExportAnki,
  onExportMarkdown,
  isAudioHandsFreeActive,
  onToggleAudioHandsFree,
}: FlashcardControlsProps) {
  const axes = ["all", ...Object.keys(authors)];

  return (
    <div className="controls space-y-2.5">
      {/* Authors / Axes chips */}
      <div id="chips" className="flex flex-wrap items-center gap-1.5 py-1">
        {axes.map((k) => (
          <button
            key={k}
            type="button"
            className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer border ${
              k === currentAxis
                ? "bg-primary text-primary-foreground font-bold border-primary shadow-xs"
                : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border-border/80"
            }`}
            onClick={() => {
              triggerHaptic("light");
              playClickSound();
              onAxisChange(k);
            }}
          >
            {k === "all" ? "Toutes" : authors[k]}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="py-1">
        <input
          type="text"
          id="fcSearch"
          placeholder="Rechercher une notion doctrinale..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full max-w-sm px-3.5 py-2 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 shadow-2xs transition-all"
        />
      </div>

      {/* Filter check chips */}
      <div className="flex flex-wrap items-center gap-1.5 py-1">
        {cartes.some((c) => c.category) && (
          <label
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer select-none ${
              hideBonus
                ? "bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-500/40 shadow-2xs"
                : "bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300"
            }`}
          >
            <input
              type="checkbox"
              id="hideBonus"
              className="sr-only"
              checked={hideBonus}
              onChange={(e) => {
                playClickSound();
                onHideBonusChange(e.target.checked);
              }}
            />
            <span>Cœur seulement</span>
          </label>
        )}
        <label
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer select-none ${
            shuffleOn
              ? "bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-500/40 shadow-2xs"
              : "bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300"
          }`}
        >
          <input
            type="checkbox"
            id="shuffle"
            className="sr-only"
            checked={shuffleOn}
            onChange={(e) => {
              playClickSound();
              onShuffleChange(e.target.checked);
            }}
          />
          <span>Aléatoire</span>
        </label>
        <label
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer select-none ${
            onlyKo
              ? "bg-rose-500/15 text-rose-900 dark:text-rose-200 border-rose-500/40 shadow-2xs"
              : "bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300"
          }`}
        >
          <input
            type="checkbox"
            id="onlyKo"
            className="sr-only"
            checked={onlyKo}
            onChange={(e) => {
              playClickSound();
              onOnlyKoChange(e.target.checked);
            }}
          />
          <span>À revoir</span>
        </label>
        <label
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer select-none ${
            dueOnly
              ? "bg-indigo-500/15 text-indigo-900 dark:text-indigo-200 border-indigo-500/40 shadow-2xs"
              : "bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300"
          }`}
        >
          <input
            type="checkbox"
            id="dueOnly"
            className="sr-only"
            checked={dueOnly}
            onChange={(e) => {
              playClickSound();
              onDueOnlyChange(e.target.checked);
            }}
          />
          <span>Dues ({dueCount})</span>
        </label>
        <label
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer select-none ${
            onlyFavs
              ? "bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-500/40 shadow-2xs"
              : "bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300"
          }`}
        >
          <input
            type="checkbox"
            id="onlyFavs"
            className="sr-only"
            checked={onlyFavs}
            onChange={(e) => {
              playClickSound();
              onOnlyFavsChange(e.target.checked);
            }}
          />
          <span>
            ⭐ Favoris (
            {cartes.filter((c) => !!store.getMarks()[`fav_${c.id}`]).length})
          </span>
        </label>
        <label
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer select-none ${
            leitnerSort
              ? "bg-emerald-500/15 text-emerald-900 dark:text-emerald-200 border-emerald-500/40 shadow-2xs"
              : "bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300"
          }`}
        >
          <input
            type="checkbox"
            id="leitner"
            className="sr-only"
            checked={leitnerSort}
            onChange={(e) => {
              playClickSound();
              onLeitnerSortChange(e.target.checked);
            }}
          />
          <span>Boîtes Leitner</span>
        </label>
      </div>

      {leitnerSort && (
        <LeitnerBoxes
          store={store}
          cartes={cartes}
          activeBox={leitnerFilter}
          onSelectBox={onLeitnerFilterChange}
        />
      )}

      {/* Progress & Quick Action Buttons */}
      <div className="progress flex items-center justify-between flex-wrap gap-2.5 my-2.5 text-xs text-slate-500">
        <div>
          <span id="sOk" className="font-bold text-slate-700 dark:text-slate-300">
            {okCount}
          </span>{" "}
          acquises ·{" "}
          <span id="sKo">
            {dueCount} pour aujourd&apos;hui
            {dueCount > 0 && ` (${dueNew} nouv. · ${dueReview} à revoir)`}
          </span>{" "}
          · <span id="sRest">{restCount}</span> en cours d&apos;acquisition
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Audio Hands-Free Button */}
          <button
            type="button"
            onClick={onToggleAudioHandsFree}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95 ${
              isAudioHandsFreeActive
                ? "bg-amber-500 text-slate-950 ring-2 ring-amber-500/30"
                : "bg-white/80 dark:bg-slate-800/80 hover:bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
            }`}
            title="Activer la révision audio mains-libres (yeux fermés)"
          >
            <Headphones className="size-3.5" />
            <span>{isAudioHandsFreeActive ? "Mode Audio Actif" : "🎧 Mode Mains-Libres"}</span>
          </button>

          {/* Anki Export */}
          <button
            type="button"
            onClick={onExportAnki}
            className="px-2.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
            title="Exporter pour l'application Anki (.tsv)"
          >
            <Download className="size-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Anki (.tsv)</span>
          </button>

          {/* Markdown Export */}
          <button
            type="button"
            onClick={onExportMarkdown}
            className="px-2.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
            title="Exporter en fiche Markdown (.md)"
          >
            <FileText className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Fiche (.md)</span>
          </button>
        </div>
      </div>
    </div>
  );
}

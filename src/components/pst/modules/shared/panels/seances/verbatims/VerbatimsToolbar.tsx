"use client";

import {
  Search,
  X,
  Minimize2,
  Maximize2,
  Copy,
  Check,
} from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface VerbatimsToolbarProps {
  verbatimSearch: string;
  onSearchChange: (q: string) => void;
  matchCount: number;
  fontSize: "sm" | "base" | "lg";
  onFontSizeChange: (size: "sm" | "base" | "lg") => void;
  isWideReader: boolean;
  onToggleWideReader: () => void;
  copiedVerbatim: boolean;
  onCopyVerbatim: () => void;
}

export function VerbatimsToolbar({
  verbatimSearch,
  onSearchChange,
  matchCount,
  fontSize,
  onFontSizeChange,
  isWideReader,
  onToggleWideReader,
  copiedVerbatim,
  onCopyVerbatim,
}: VerbatimsToolbarProps) {
  return (
    <div className="p-4 rounded-3xl bg-card border border-border/70 shadow-xs flex flex-wrap items-center justify-between gap-3">
      {/* Live Search */}
      <div className="flex items-center gap-2 flex-1 min-w-[260px]">
        <div className="relative flex-1">
          <Search className="size-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            aria-label="Rechercher dans les verbatims de cours"
            value={verbatimSearch}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher mot, auteur, consigne..."
            className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-muted/50 border border-border/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          {verbatimSearch && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Effacer la recherche de verbatims"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 cursor-pointer"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {matchCount > 0 && (
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/30 whitespace-nowrap font-bold">
            {matchCount} match{matchCount > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Typography & Layout Controls */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {/* Stepper taille de police */}
        <div className="inline-flex items-center p-1 bg-muted/60 rounded-xl border border-border/50 text-xs">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onFontSizeChange("sm");
            }}
            className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
              fontSize === "sm"
                ? "bg-card text-foreground shadow-2xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="Texte compact (13px)"
          >
            A-
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onFontSizeChange("base");
            }}
            className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
              fontSize === "base"
                ? "bg-card text-foreground shadow-2xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="Texte standard (15px)"
          >
            A
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onFontSizeChange("lg");
            }}
            className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
              fontSize === "lg"
                ? "bg-card text-foreground shadow-2xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="Texte aéré grand confort (17px)"
          >
            A+
          </button>
        </div>

        {/* Largeur de lecture */}
        <button
          type="button"
          onClick={() => {
            playClickSound();
            onToggleWideReader();
          }}
          className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            isWideReader
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-muted/50 border-border text-muted-foreground hover:text-foreground"
          }`}
          title={
            isWideReader
              ? "Passer en largeur optimale (70 caractères)"
              : "Passer en plein écran"
          }
        >
          {isWideReader ? (
            <Minimize2 className="size-3.5" />
          ) : (
            <Maximize2 className="size-3.5" />
          )}
          <span className="hidden sm:inline">
            {isWideReader ? "Largeur confort" : "Plein écran"}
          </span>
        </button>

        {/* Copier tout */}
        <button
          type="button"
          onClick={onCopyVerbatim}
          className="px-3 py-2 rounded-xl bg-muted/60 hover:bg-muted text-foreground border border-border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
        >
          {copiedVerbatim ? (
            <>
              <Check className="size-3.5 text-emerald-500" />
              <span>Copié !</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>Tout copier</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

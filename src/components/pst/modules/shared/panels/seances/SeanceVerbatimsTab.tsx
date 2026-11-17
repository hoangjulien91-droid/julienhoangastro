"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  X,
  Minimize2,
  Maximize2,
  Copy,
  Check,
  Bookmark,
} from "lucide-react";
import { toast } from "sonner";
import type { SeanceCoursItem } from "@/lib/pst/data/seances-cours";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

export interface ParsedChapter {
  id: string;
  title: string;
  lines: string[];
}

export interface SeanceVerbatimsTabProps {
  activeSeance: SeanceCoursItem;
  parsedChapters: ParsedChapter[];
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function SeanceVerbatimsTab({
  activeSeance,
  parsedChapters,
}: SeanceVerbatimsTabProps) {
  const [verbatimSearch, setVerbatimSearch] = useState("");
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
  const [isWideReader, setIsWideReader] = useState(false);
  const [activeChapterId, setActiveChapterId] = useState<string>("all");
  const [copiedVerbatim, setCopiedVerbatim] = useState(false);

  const matchCount = useMemo(() => {
    if (!activeSeance || !verbatimSearch.trim()) return 0;
    const q = verbatimSearch.toLowerCase();
    const count = (
      activeSeance.transcriptionIntegraleVerbatim.toLowerCase().match(
        new RegExp(escapeRegExp(q), "g"),
      ) || []
    ).length;
    return count;
  }, [activeSeance, verbatimSearch]);

  function handleCopyVerbatim() {
    if (!activeSeance) return;
    playClickSound();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(
        activeSeance.transcriptionIntegraleVerbatim,
      );
      setCopiedVerbatim(true);
      playSuccessSound();
      triggerHaptic("success");
      toast.success("Verbatims d'Or copiés dans le presse-papier !");
      setTimeout(() => setCopiedVerbatim(false), 3000);
    }
  }

  function renderHighlightedText(text: string) {
    if (!verbatimSearch.trim()) return text;
    const regex = new RegExp(`(${escapeRegExp(verbatimSearch)})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark
          key={i}
          className="bg-amber-400/40 text-amber-950 dark:text-amber-100 font-bold px-1.5 py-0.5 rounded-md shadow-2xs"
        >
          {part}
        </mark>
      ) : (
        part
      ),
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Apple Books Toolbar */}
      <div className="p-4 rounded-3xl bg-card border border-border/70 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Live Search */}
        <div className="flex items-center gap-2 flex-1 min-w-[260px]">
          <div className="relative flex-1">
            <Search className="size-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Rechercher dans les verbatims de cours"
              value={verbatimSearch}
              onChange={(e) => setVerbatimSearch(e.target.value)}
              placeholder="Rechercher mot, auteur, consigne..."
              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-muted/50 border border-border/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            {verbatimSearch && (
              <button
                type="button"
                onClick={() => setVerbatimSearch("")}
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
                setFontSize("sm");
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
                setFontSize("base");
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
                setFontSize("lg");
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
              setIsWideReader((w) => !w);
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
            onClick={handleCopyVerbatim}
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

      {/* Sommaire interactif rapide (Pills Horizontales) */}
      {parsedChapters.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 pt-1">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveChapterId("all");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border shadow-2xs ${
              activeChapterId === "all"
                ? "bg-amber-500/20 text-amber-900 dark:text-amber-200 border-amber-500/40 font-bold"
                : "bg-card text-muted-foreground hover:text-foreground border-border/60"
            }`}
          >
            <Bookmark className="size-3" />
            <span>Tous les chapitres ({parsedChapters.length})</span>
          </button>

          {parsedChapters.map((chap, idx) => (
            <button
              key={chap.id}
              type="button"
              onClick={() => {
                playClickSound();
                setActiveChapterId(chap.id);
                const el = document.getElementById(chap.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer border shadow-2xs ${
                activeChapterId === chap.id
                  ? "bg-amber-500/20 text-amber-900 dark:text-amber-200 border-amber-500/40 font-bold"
                  : "bg-card text-muted-foreground hover:text-foreground border-border/60"
              }`}
            >
              <span className="font-mono text-[10px] opacity-70 mr-1">
                {idx + 1}.
              </span>
              <span>{chap.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* Surface de lecture Apple Books */}
      <div
        className={`p-6 sm:p-10 rounded-3xl bg-card border border-border/70 shadow-xs transition-all space-y-8 ${
          isWideReader ? "max-w-none" : "max-w-3xl mx-auto"
        }`}
      >
        {parsedChapters
          .filter(
            (chap) =>
              activeChapterId === "all" || chap.id === activeChapterId,
          )
          .map((chap, cIdx) => (
            <article
              id={chap.id}
              key={chap.id}
              className="space-y-4 pb-6 border-b border-border/40 last:border-0 last:pb-0"
            >
              {/* Bannière de Chapitre */}
              <div className="flex items-center gap-2.5 pt-2">
                <span className="size-7 rounded-xl bg-sky-500/10 border border-sky-500/25 text-sky-700 dark:text-sky-300 text-xs font-bold flex items-center justify-center font-mono">
                  {cIdx + 1}
                </span>
                <h2 className="text-base sm:text-lg font-serif font-bold text-foreground">
                  {chap.title}
                </h2>
              </div>

              {/* Lignes & Paragraphes du chapitre */}
              <div
                className={`space-y-3.5 font-sans leading-relaxed text-foreground/90 ${
                  fontSize === "sm"
                    ? "text-xs sm:text-sm leading-relaxed"
                    : fontSize === "base"
                      ? "text-sm sm:text-base leading-relaxed"
                      : "text-base sm:text-lg leading-loose"
                }`}
              >
                {chap.lines.map((line, lIdx) => {
                  const isTeacherTurn =
                    /^\[\d{2}:\d{2}/.test(line) ||
                    line.includes("PR. ") ||
                    line.includes("M. ") ||
                    line.includes("MME ");

                  if (isTeacherTurn) {
                    const cleanTeacher = activeSeance.enseignant
                      .replace(/\s*\(.*?\)/g, "")
                      .replace(/^(Pr\.|M\.|Mme)\s+/i, "")
                      .trim();
                    const initials = cleanTeacher
                      .split(/\s+/)
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();

                    return (
                      <div
                        key={lIdx}
                        className="p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border/60 space-y-2 my-2"
                      >
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
                          <span className="size-6 rounded-lg bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold flex items-center justify-center text-[10px]">
                            {initials || "PR"}
                          </span>
                          <span>{activeSeance.enseignant} · Verbatim d&apos;Or</span>
                        </div>
                        <p className="m-0 italic">
                          {renderHighlightedText(line)}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <p key={lIdx} className="m-0">
                      {renderHighlightedText(line)}
                    </p>
                  );
                })}
              </div>
            </article>
          ))}
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import type { SeanceCoursItem } from "@/lib/pst/data/seances-cours";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { VerbatimsToolbar } from "./verbatims/VerbatimsToolbar";
import { VerbatimsChapterPills } from "./verbatims/VerbatimsChapterPills";

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
      <VerbatimsToolbar
        verbatimSearch={verbatimSearch}
        onSearchChange={setVerbatimSearch}
        matchCount={matchCount}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        isWideReader={isWideReader}
        onToggleWideReader={() => setIsWideReader((w) => !w)}
        copiedVerbatim={copiedVerbatim}
        onCopyVerbatim={handleCopyVerbatim}
      />

      {/* Sommaire interactif rapide */}
      <VerbatimsChapterPills
        parsedChapters={parsedChapters}
        activeChapterId={activeChapterId}
        onSelectChapterId={setActiveChapterId}
      />

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

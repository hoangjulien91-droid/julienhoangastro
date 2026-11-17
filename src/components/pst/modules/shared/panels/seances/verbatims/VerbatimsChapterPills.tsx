"use client";

import { Bookmark } from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";
import type { ParsedChapter } from "../SeanceVerbatimsTab";

interface VerbatimsChapterPillsProps {
  parsedChapters: ParsedChapter[];
  activeChapterId: string;
  onSelectChapterId: (id: string) => void;
}

export function VerbatimsChapterPills({
  parsedChapters,
  activeChapterId,
  onSelectChapterId,
}: VerbatimsChapterPillsProps) {
  if (parsedChapters.length <= 1) return null;

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 pt-1">
      <button
        type="button"
        onClick={() => {
          playClickSound();
          onSelectChapterId("all");
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
            onSelectChapterId(chap.id);
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
  );
}

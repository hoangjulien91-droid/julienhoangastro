"use client";

import { useEffect, useMemo, useState } from "react";
import type { AMap, LexiqueItem } from "@/lib/pst/types";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { LexiqueControls } from "./lexique/LexiqueControls";
import { LexiqueCard } from "./lexique/LexiqueCard";

export interface LexiqueFilter {
  key: string;
  label: string;
}

interface LexiqueProps {
  data: LexiqueItem[];
  filters: LexiqueFilter[];
  authors: AMap;
  hint: string;
}

const BOOKMARKS_KEY = "pst_lexique_bookmarks_v1";

function normalizeInitial(word: string): string {
  const first = word
    .trim()
    .charAt(0)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
  return /[A-Z]/.test(first) ? first : "#";
}

export function Lexique({ data, filters, authors, hint }: LexiqueProps) {
  const [filter, setFilter] = useState("all");
  const [letterFilter, setLetterFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(BOOKMARKS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setBookmarks(new Set(parsed));
      }
    } catch {
      // ignore
    }
  }, []);

  function toggleBookmark(word: string, ev: React.MouseEvent) {
    ev.stopPropagation();
    playClickSound();
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(word)) next.delete(word);
      else next.add(word);
      try {
        window.localStorage.setItem(
          BOOKMARKS_KEY,
          JSON.stringify(Array.from(next)),
        );
        window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      } catch {
        // ignore
      }
      return next;
    });
  }

  function handleCopyTerm(
    item: LexiqueItem,
    idx: number,
    ev: React.MouseEvent,
  ) {
    ev.stopPropagation();
    const text = `${item.w} (${authors[item.a] ?? item.a}) : ${item.def}${item.eg ? ` — Application : ${item.eg}` : ""}`;
    try {
      navigator.clipboard.writeText(text);
      playSuccessSound();
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1500);
    } catch {
      // ignore
    }
  }

  const availableLetters = useMemo(() => {
    const set = new Set<string>();
    for (const item of data) {
      set.add(normalizeInitial(item.w));
    }
    return Array.from(set).sort();
  }, [data]);

  const bookmarkedCountInModule = useMemo(
    () => data.filter((item) => bookmarks.has(item.w)).length,
    [data, bookmarks],
  );

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      data
        .map((item, i) => ({ item, i }))
        .filter(({ item }) => {
          if (onlyBookmarked && !bookmarks.has(item.w)) return false;
          if (
            letterFilter !== "all" &&
            normalizeInitial(item.w) !== letterFilter
          ) {
            return false;
          }
          const matchA = filter === "all" || item.a === filter;
          const hay = (
            item.w +
            " " +
            item.def +
            " " +
            (item.eg ?? "")
          ).toLowerCase();
          return matchA && (!q || hay.includes(q));
        }),
    [data, filter, letterFilter, q, onlyBookmarked, bookmarks],
  );

  function toggleReveal(i: number) {
    if (!testMode) return;
    playClickSound();
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <div>
      <p className="hint">{hint}</p>
      <LexiqueControls
        totalCount={data.length}
        filteredCount={filtered.length}
        query={query}
        onQueryChange={setQuery}
        filters={filters}
        activeFilter={filter}
        onFilterChange={setFilter}
        onlyBookmarked={onlyBookmarked}
        onToggleOnlyBookmarked={() => setOnlyBookmarked((v) => !v)}
        bookmarkedCount={bookmarkedCountInModule}
        availableLetters={availableLetters}
        letterFilter={letterFilter}
        onSelectLetter={setLetterFilter}
        testMode={testMode}
        onToggleTestMode={() => {
          setTestMode((t) => !t);
          setRevealed(new Set());
        }}
        revealedCount={revealed.size}
        onToggleRevealAll={() => {
          if (revealed.size === filtered.length) {
            setRevealed(new Set());
          } else {
            setRevealed(new Set(filtered.map(({ i }) => i)));
          }
        }}
      />
      <div
        id="lexiqueHost"
        className={`lexique-grid${testMode ? " test-mode" : ""}`}
      >
        {filtered.map(({ item, i }) => (
          <LexiqueCard
            key={i}
            item={item}
            index={i}
            authors={authors}
            isBookmarked={bookmarks.has(item.w)}
            isRevealed={revealed.has(i)}
            testMode={testMode}
            isCopied={copiedIdx === i}
            onToggleReveal={toggleReveal}
            onToggleBookmark={toggleBookmark}
            onCopyTerm={handleCopyTerm}
          />
        ))}
      </div>
    </div>
  );
}

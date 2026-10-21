"use client";

import { useEffect, useMemo, useState } from "react";
import { BookMarked } from "lucide-react";
import type { AMap, LexiqueItem } from "@/lib/pst/types";
import { SmartBridgeBadge } from "@/components/pst/bridges/SmartBridgeBadge";
import { playClickSound, playSuccessSound, triggerHaptic } from "@/lib/pst/audio-feedback";

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
      <div className="lexique-controls-card">
        <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 dark:border-slate-800 pb-2.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5">
            <BookMarked className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Glossaire Clinique Fondamental</span>
          </span>
          <span className="text-[10px] font-mono font-semibold text-slate-400 dark:text-slate-500 uppercase">
            {filtered.length} / {data.length} Notions
          </span>
        </div>
        <div className="lexique-filter-row">
          <div className="lexique-search-wrapper">
            <input
              type="text"
              className="lexique-search-input"
              placeholder="Rechercher un concept, une définition ou une application..."
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                className="lexique-search-clear"
                onClick={() => setQuery("")}
              >
                ×
              </button>
            )}
          </div>
          <div className="chips">
            {filters.map((f) => (
              <button
                key={f.key}
                className={`chip${filter === f.key ? " active" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
            <button
              type="button"
              className={`chip${onlyBookmarked ? " active" : ""}`}
              onClick={() => setOnlyBookmarked((v) => !v)}
            >
              ★ À revoir ({bookmarkedCountInModule})
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
                setLetterFilter("all");
              }}
            >
              Toutes ({data.length})
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
                  setLetterFilter((cur) => (cur === ltr ? "all" : ltr));
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
                  setTestMode((t) => !t);
                  setRevealed(new Set());
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
                    if (revealed.size === filtered.length) {
                      setRevealed(new Set());
                    } else {
                      setRevealed(new Set(filtered.map(({ i }) => i)));
                    }
                  }}
                >
                  {revealed.size === filtered.length
                    ? "Tout masquer"
                    : "Tout révéler"}
                </button>
              )}
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">
              {filtered.length} / {data.length} concepts affichés
            </span>
          </div>
        </div>
      </div>
      <div
        id="lexiqueHost"
        className={`lexique-grid${testMode ? " test-mode" : ""}`}
      >
        {filtered.map(({ item, i }) => {
          const isFav = bookmarks.has(item.w);
          return (
            <div
              key={i}
              className={`lex-card${testMode && revealed.has(i) ? " revealed" : ""}`}
              style={{ borderTop: `4px solid var(--${item.a}, var(--line))` }}
              onClick={() => toggleReveal(i)}
            >
              <div className="lex-header">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="lex-title">{item.w}</span>
                  <SmartBridgeBadge conceptQuery={item.w} />
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(ev) => handleCopyTerm(item, i, ev)}
                    className="px-1.5 py-0.5 rounded text-[10px] font-semibold cursor-pointer border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                    title="Copier le concept et sa définition"
                  >
                    {copiedIdx === i ? "✓ Copié" : "Copier"}
                  </button>
                  <button
                    type="button"
                    onClick={(ev) => toggleBookmark(item.w, ev)}
                    className={`px-1.5 py-0.5 rounded text-xs font-bold cursor-pointer border transition-colors ${
                      isFav
                        ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40"
                        : "text-slate-400 border-transparent hover:text-amber-500"
                    }`}
                    title={
                      isFav
                        ? "Retirer des concepts à revoir"
                        : "Marquer ce concept à revoir"
                    }
                  >
                    {isFav ? "★" : "☆"}
                  </button>
                  <span
                    className="lex-badge"
                    style={{
                      color: `var(--${item.a})`,
                      border: `1px solid var(--${item.a})`,
                    }}
                  >
                    {authors[item.a]}
                  </span>
                </div>
              </div>
              <div className="lex-def-box">{item.def}</div>
              <div className="lex-eg-box">
                <b>Application :</b> {item.eg || "Non spécifiée"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

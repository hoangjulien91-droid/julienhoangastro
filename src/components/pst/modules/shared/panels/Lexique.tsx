"use client";

import { useMemo, useState } from "react";
import type { AMap, LexiqueItem } from "@/lib/pst/types";

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

export function Lexique({ data, filters, authors, hint }: LexiqueProps) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [testMode, setTestMode] = useState(false);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      data
        .map((item, i) => ({ item, i }))
        .filter(({ item }) => {
          const matchA = filter === "all" || item.a === filter;
          const hay = (item.w + " " + item.def).toLowerCase();
          return matchA && (!q || hay.includes(q));
        }),
    [data, filter, q],
  );

  function toggleReveal(i: number) {
    if (!testMode) return;
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
        <div className="lexique-filter-row">
          <div className="lexique-search-wrapper">
            <input
              type="text"
              className="lexique-search-input"
              placeholder="Rechercher un concept..."
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
          </div>
          <div>
            <button
              className="btn small"
              onClick={() => setTestMode((t) => !t)}
            >
              Mode test : {testMode ? "Activé" : "Désactivé"}
            </button>
          </div>
        </div>
      </div>
      <div
        id="lexiqueHost"
        className={`lexique-grid${testMode ? " test-mode" : ""}`}
      >
        {filtered.map(({ item, i }) => (
          <div
            key={i}
            className={`lex-card${testMode && revealed.has(i) ? " revealed" : ""}`}
            style={{ borderTop: `4px solid var(--${item.a}, var(--line))` }}
            onClick={() => toggleReveal(i)}
          >
            <div className="lex-header">
              <span className="lex-title">{item.w}</span>
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
            <div className="lex-def-box">{item.def}</div>
            <div className="lex-eg-box">
              <b>Application :</b> {item.eg || "Non spécifiée"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

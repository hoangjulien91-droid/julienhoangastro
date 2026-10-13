"use client";

import React, { useMemo, useState, type ReactNode } from "react";
import { Search, BookOpen, ArrowRight, X } from "lucide-react";
import { Link } from "@/components/common/Link";
import { INDEX, MODULES, type GlossaryTerm } from "@/lib/pst/hub-stats";

function highlightMatches(text: string, query: string): ReactNode {
  if (!query) return text;
  const i = text.toLowerCase().indexOf(query);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-amber-300 dark:bg-amber-500/30 text-amber-950 dark:text-amber-100 rounded px-0.5">
        {text.slice(i, i + query.length)}
      </mark>
      {text.slice(i + query.length)}
    </>
  );
}

function accentOf(id: string) {
  return INDEX.modules[id]?.accent ?? "var(--accent)";
}

export function GlossarySearch() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INDEX.glossaire.filter((t: GlossaryTerm) => {
      if (filter !== "all" && t.m !== filter) return false;
      if (!q) return true;
      return (t.w + " " + t.def).toLowerCase().includes(q);
    });
  }, [filter, query]);

  const q = query.trim().toLowerCase();

  return (
    <div className="card p-5 sm:p-6 bg-card/90 border border-border rounded-2xl shadow-xs space-y-4">
      {/* Search Input & Filter Chips */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-border/80">
        <div className="relative flex-1">
          <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            id="gsearch"
            className="w-full pl-9 pr-8 py-2 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm focus:outline-hidden focus:ring-1 focus:ring-accent placeholder:text-muted-foreground/60"
            placeholder="Rechercher un terme, concept ou auteur dans tous les ateliers…"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded cursor-pointer"
              aria-label="Effacer la recherche"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
              filter === "all"
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setFilter("all")}
          >
            Tous ({INDEX.glossaire.length})
          </button>
          {MODULES.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer shrink-0 ${
                filter === m.id
                  ? "bg-accent text-accent-foreground shadow-2xs"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setFilter(m.id)}
            >
              {m.id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
        <span>
          {list.length} terme{list.length > 1 ? "s" : ""} trouvé{list.length > 1 ? "s" : ""}
        </span>
        {query && (
          <span className="text-[11px] italic">
            Filtre : « {query} »
          </span>
        )}
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-1">
        {list.map((t, i) => {
          const modPath = `/pst/${t.m.replace("pst", "")}/`;
          return (
            <div
              key={i}
              className="p-4 rounded-xl border border-border/80 bg-background/50 hover:border-accent/40 transition-colors flex flex-col justify-between space-y-2 group"
              style={{ borderLeftWidth: "3px", borderLeftColor: accentOf(t.m) }}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-xs sm:text-sm text-foreground group-hover:text-accent transition-colors m-0">
                    {highlightMatches(t.w, q)}
                  </h4>
                  <Link
                    href={modPath}
                    className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground border border-border shrink-0 transition-colors"
                  >
                    {t.m.toUpperCase()}
                  </Link>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed m-0 font-serif">
                  {highlightMatches(t.def, q)}
                </p>
              </div>

              <div className="pt-2 border-t border-border/40 flex justify-end">
                <Link
                  href={modPath}
                  className="text-[11px] font-semibold text-accent hover:underline inline-flex items-center gap-1"
                >
                  <span>Atelier {t.m.toUpperCase()}</span>
                  <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

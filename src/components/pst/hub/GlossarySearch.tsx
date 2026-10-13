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
  return (
    <div className="card p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xs space-y-4">
      {/* Search Input & Filter Chips (Apple Spotlight Style) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/70 dark:border-slate-800/80">
        <div className="relative flex-1">
          <Search className="size-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            id="gsearch"
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-900 dark:text-slate-100 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/60 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all shadow-2xs"
            placeholder="Rechercher un terme, concept ou auteur dans tous les ateliers…"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
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
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 active:scale-95 shadow-2xs ${
              filter === "all"
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs"
                : "bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/80"
            }`}
            onClick={() => setFilter("all")}
          >
            Tous ({INDEX.glossaire.length})
          </button>
          {MODULES.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shrink-0 active:scale-95 shadow-2xs ${
                filter === m.id
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/80"
              }`}
              onClick={() => setFilter(m.id)}
            >
              {m.id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
        <span>
          {list.length} terme{list.length > 1 ? "s" : ""} trouvé{list.length > 1 ? "s" : ""}
        </span>
        {query && (
          <span className="text-[11px] italic text-amber-700 dark:text-amber-400">
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
              className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/60 backdrop-blur-md hover:border-amber-500/50 hover:shadow-xs transition-all flex flex-col justify-between space-y-2 group shadow-2xs"
              style={{ borderLeftWidth: "4px", borderLeftColor: accentOf(t.m) }}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors m-0">
                    {highlightMatches(t.w, q)}
                  </h4>
                  <Link
                    href={modPath}
                    className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-slate-100/80 hover:bg-slate-200/80 dark:bg-slate-700/60 dark:hover:bg-slate-700 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-200/60 dark:border-slate-600/60 shrink-0 transition-colors"
                  >
                    {t.m.toUpperCase()}
                  </Link>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0 font-serif">
                  {highlightMatches(t.def, q)}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/50 dark:border-slate-700/50 flex justify-end">
                <Link
                  href={modPath}
                  className="text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline inline-flex items-center gap-1 group/btn"
                >
                  <span>Atelier {t.m.toUpperCase()}</span>
                  <ArrowRight className="size-3 transition-transform group-hover/btn:translate-x-0.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

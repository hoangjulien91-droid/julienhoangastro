"use client";

import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { INDEX } from "@/lib/pst/hub-stats";
import { SCHEMAS_MATRICES } from "@/lib/pst/data/schemas-matrices";
import { SUJETS_DISSERTATION } from "@/lib/pst/data/sujets-dissertation";

const SUGGESTED_TERMS = [
  "Yves Clot",
  "Christophe Dejours",
  "Pierre Bourdieu",
  "Méthode IOD",
  "Code de déontologie",
  "Wisner",
  "Pouvoir d'agir",
];

function openSchema(schemaId: string, moduleKey: string) {
  window.dispatchEvent(
    new CustomEvent("pst:open-schemas", {
      detail: { schemaId, moduleKey },
    }),
  );
}

export function HubUniversalSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q || q.length < 2) return null;

    const glossaireMatches = INDEX.glossaire
      .filter(
        (g) => g.w.toLowerCase().includes(q) || g.def.toLowerCase().includes(q),
      )
      .slice(0, 4);

    const schemaMatches = SCHEMAS_MATRICES.filter(
      (s) =>
        s.titre.toLowerCase().includes(q) ||
        s.auteur.toLowerCase().includes(q) ||
        s.descriptionPedagogique.toLowerCase().includes(q),
    ).slice(0, 3);

    const dissertationMatches = SUJETS_DISSERTATION.filter(
      (d) =>
        d.titre.toLowerCase().includes(q) ||
        d.problematique.toLowerCase().includes(q),
    ).slice(0, 3);

    const hasAny =
      glossaireMatches.length > 0 ||
      schemaMatches.length > 0 ||
      dissertationMatches.length > 0;
    return { glossaireMatches, schemaMatches, dissertationMatches, hasAny };
  }, [searchQuery]);

  return (
    <div className="mb-6 space-y-2">
      <div className="relative group focus-within:ring-2 focus-within:ring-indigo-500/50 rounded-2xl transition-all">
        <Search className="size-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-indigo-500 transition-colors" />
        <input
          type="search"
          aria-label="Recherche universelle dans les cours, auteurs et concepts PST"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un auteur (Dejours, Clot, Bourdieu), un concept ou un sujet d'examen..."
          className="w-full pl-10 pr-16 py-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 backdrop-blur-md shadow-xs focus:outline-none transition-all"
        />
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Effacer la recherche"
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="size-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("pst:open-command-palette"))
            }
            title="Ouvrir la palette universelle (⌘K)"
            className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shadow-2xs cursor-pointer transition-colors"
          >
            ⌘K
          </button>
        </div>
      </div>

      {/* Suggestions rapides si champ vide */}
      {!searchQuery && (
        <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 scrollbar-none px-1 text-[11px]">
          <span className="text-slate-400 font-mono">Suggestions :</span>
          {SUGGESTED_TERMS.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setSearchQuery(term)}
              className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 dark:bg-slate-800/80 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300 dark:hover:border-indigo-800/60 border border-transparent text-slate-700 dark:text-slate-300 font-medium transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      {/* Résultats groupés instantanés */}
      {searchResults && (
        <div className="p-4 sm:p-5 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 backdrop-blur-2xl shadow-xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Résultats pour « {searchQuery} »
            </span>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline cursor-pointer"
            >
              Fermer
            </button>
          </div>

          {!searchResults.hasAny ? (
            <p className="text-xs text-slate-500 m-0 py-2">
              Aucun résultat exact trouvé. Essayez avec un mot-clé plus court.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* 1. Concepts du Glossaire */}
              {searchResults.glossaireMatches.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                    Glossaire &amp; Définitions
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.glossaireMatches.map((g) => (
                      <div
                        key={g.w}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-slate-100">
                            {g.w}
                          </span>
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300">
                            {g.m.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 m-0 leading-snug">
                          {g.def}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Schémas & Matrices */}
              {searchResults.schemaMatches.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block">
                    Schémas Vectoriels SVG
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.schemaMatches.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          openSchema(s.id, s.moduleKey);
                          setSearchQuery("");
                        }}
                        className="w-full text-left p-2.5 rounded-xl bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/20 cursor-pointer transition-all space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-cyan-950 dark:text-cyan-200">
                            {s.titre}
                          </span>
                          <span className="text-[10px] font-mono text-cyan-600">
                            {s.moduleKey.toUpperCase()}
                          </span>
                        </div>
                        <span className="block text-[10.5px] text-slate-500">
                          {s.auteur} · {s.annee}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Sujets de Dissertation */}
              {searchResults.dissertationMatches.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                    Sujets d&apos;Examen 18/20
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.dissertationMatches.map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => {
                          window.dispatchEvent(
                            new CustomEvent("pst:open-sujets-dissertation"),
                          );
                          setSearchQuery("");
                        }}
                        className="w-full text-left p-2.5 rounded-xl bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/20 cursor-pointer transition-all space-y-1"
                      >
                        <span className="font-bold text-indigo-950 dark:text-indigo-200 line-clamp-2 block leading-snug">
                          {d.titre}
                        </span>
                        <span className="block text-[10px] text-indigo-600 dark:text-indigo-400">
                          {d.moduleKey.toUpperCase()} · Consulter le plan
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

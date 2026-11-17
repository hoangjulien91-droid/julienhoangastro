"use client";

import { BookOpen } from "lucide-react";
import type { RecitFilter } from "../Recits";

interface RecitsToolbarProps {
  masteredCount: number;
  totalRecits: number;
  pct: number;
  query: string;
  onQueryChange: (q: string) => void;
  filters: RecitFilter[];
  activeFilter: string;
  onFilterChange: (key: string) => void;
}

export function RecitsToolbar({
  masteredCount,
  totalRecits,
  pct,
  query,
  onQueryChange,
  filters,
  activeFilter,
  onFilterChange,
}: RecitsToolbarProps) {
  return (
    <>
      <p className="recits-intro">
        Chaque auteur sous forme d&apos;<b>exposé continu et structuré</b>, à
        mobiliser tel quel le jour J. Récite-le, puis utilise les boutons pour{" "}
        <b>masquer les mots-clés</b> et te tester, ou passer en{" "}
        <b>texte à trous</b> pour le restituer de mémoire.
      </p>
      <div className="recits-controls-card">
        <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 dark:border-slate-800 pb-2.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5">
            <BookOpen className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Démonstrations Cliniques Rédigées · Examen Cnam</span>
          </span>
          <span className="text-[10px] font-mono font-semibold text-slate-400 dark:text-slate-500 uppercase">
            {masteredCount} / {totalRecits} Maîtrisés ({pct}%)
          </span>
        </div>
        <div className="recit-progress-container">
          <div className="recit-progress-header">
            <span className="recit-progress-title">
              Progression d&apos;apprentissage
            </span>
            <span className="recit-progress-stats">
              {masteredCount} / {totalRecits} récits maîtrisés ({pct}%)
            </span>
          </div>
          <div className="recit-progress-bar">
            <div className="recit-progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="recits-filter-row">
          <div className="recit-search-wrapper">
            <span className="search-icon" />
            <input
              type="text"
              aria-label="Rechercher un récit par concept, auteur ou mot-clé"
              className="recit-search-input"
              placeholder="Rechercher un concept, un auteur, un mot..."
              autoComplete="off"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
            />
            {query && (
              <button
                className="recit-search-clear"
                title="Effacer la recherche"
                onClick={() => onQueryChange("")}
              >
                ×
              </button>
            )}
          </div>
          <div className="chips mt-2.5">
            {filters.map((f) => (
              <button
                key={f.key}
                className={`chip c-${f.key}`}
                aria-pressed={activeFilter === f.key}
                onClick={() => onFilterChange(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

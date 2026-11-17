"use client";

import { BookMarked, X, Search } from "lucide-react";
import { triggerHaptic, playClickSound } from "@/lib/pst/audio-feedback";

interface CoffreDefinitionsHeaderProps {
  onClose: () => void;
  selectedModule: string;
  onSelectModule: (key: string) => void;
  counts: Record<string, number>;
  onRevealAll: () => void;
  onHideAll: () => void;
  query: string;
  onQueryChange: (q: string) => void;
}

export function CoffreDefinitionsHeader({
  onClose,
  selectedModule,
  onSelectModule,
  counts,
  onRevealAll,
  onHideAll,
  query,
  onQueryChange,
}: CoffreDefinitionsHeaderProps) {
  return (
    <>
      {/* HEADER MODAL iOS */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 gap-2">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="size-8 sm:size-10 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-600 shrink-0">
            <BookMarked className="size-4 sm:size-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 truncate">
                Standard 18+/20 Cnam
              </span>
              <span className="hidden sm:inline text-xs text-slate-500">
                Mots-clés obligatoires
              </span>
            </div>
            <h2 className="text-sm sm:text-lg font-black tracking-tight text-slate-900 dark:text-slate-100 m-0 truncate">
              Le Coffre des Définitions Canoniques
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 sm:p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          aria-label="Fermer"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* BARRE DE CONTRÔLE : FILTRES MODULES & RECHERCHE */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* iOS Segmented Control */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold overflow-x-auto scrollbar-none whitespace-nowrap max-w-full pb-0.5">
          {[
            { key: "all", label: "Tous", count: counts.all },
            { key: "pst108", label: "PST108", count: counts.pst108 ?? 0 },
            { key: "pst106", label: "PST106", count: counts.pst106 ?? 0 },
            { key: "pst120", label: "PST120", count: counts.pst120 ?? 0 },
            { key: "pst123", label: "PST123", count: counts.pst123 ?? 0 },
            { key: "pst124", label: "PST124", count: counts.pst124 ?? 0 },
          ].map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                onSelectModule(m.key);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer shrink-0 ${
                selectedModule === m.key
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {m.label} ({m.count})
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRevealAll}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            Tout afficher
          </button>
          <span className="text-slate-300">·</span>
          <button
            type="button"
            onClick={onHideAll}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            Tout masquer (Auto-test)
          </button>
        </div>
      </div>

      {/* INPUT DE RECHERCHE RAPIDE */}
      <div className="relative">
        <Search className="size-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="search"
          aria-label="Rechercher une définition canonique"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Rechercher un concept (ex: habitus, agir communicationnel, activité empêchée, IOD, réification)..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </>
  );
}

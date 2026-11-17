"use client";

import { Search, X, GitFork } from "lucide-react";
import { Link } from "@/components/common/Link";
import type { Pont } from "@/lib/pst/data/ponts";

interface PontsPopoverProps {
  moduleKey: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  results: Pont[];
  onOpenMatrix: () => void;
  onClose: () => void;
}

export function PontsPopover({
  moduleKey,
  searchQuery,
  onSearchChange,
  results,
  onOpenMatrix,
  onClose,
}: PontsPopoverProps) {
  return (
    <div
      className="mb-3 w-80 sm:w-96 max-w-[calc(100vw-24px)] p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
      role="dialog"
      aria-label="Ponts conceptuels entre modules"
    >
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-slate-100">
          <Search className="size-4 text-amber-500" />
          <span>Ponts Transversaux ({results.length})</span>
        </div>
        <button
          className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
          aria-label="Fermer"
          onClick={onClose}
        >
          <X className="size-3.5" />
        </button>
      </div>
      <div className="my-2.5">
        <input
          type="search"
          aria-label="Rechercher un concept ou un auteur"
          placeholder="Ex. Dejours, pouvoir d'agir, Vygotski…"
          autoComplete="off"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-amber-500"
        />
      </div>
      <div className="max-h-56 overflow-y-auto space-y-2 pr-1 scrollbar-none">
        {results.length === 0 ? (
          <div className="p-3 text-center text-xs text-slate-500">
            Aucun concept correspondant trouvé.
          </div>
        ) : (
          results.map((p) => {
            const here = Object.keys(p.m).some((k) => k === moduleKey);
            return (
              <div
                key={p.c}
                className="p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 text-xs"
              >
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                  <span>{p.c}</span>
                  {here && (
                    <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded-full">
                      Présent ici
                    </span>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {Object.keys(p.m).map((id) => (
                    <Link
                      key={id}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 hover:border-amber-500 text-slate-700 dark:text-slate-300"
                      href={`/pst/${id.replace("pst", "")}/`}
                    >
                      <b>{id.toUpperCase()}</b> · {p.m[id]}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="pt-2.5 mt-2 border-t border-slate-200/80 dark:border-slate-800">
        <button
          type="button"
          onClick={onOpenMatrix}
          className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <GitFork className="size-3.5" />
          <span>Ouvrir la Matrice Complète des Ponts</span>
        </button>
      </div>
    </div>
  );
}

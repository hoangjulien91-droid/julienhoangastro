import { Search } from "lucide-react";
import type { AdStatus } from "@/lib/pst/data/ad-common";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface AdDashboardFilterBarProps {
  allAdsCount: number;
  pst106Count: number;
  pst108Count: number;
  pst123Count: number;
  moduleFilter: "all" | "pst106" | "pst108" | "pst123";
  onModuleFilterChange: (m: "all" | "pst106" | "pst108" | "pst123") => void;
  statusFilter: "all" | AdStatus;
  onStatusFilterChange: (s: "all" | AdStatus) => void;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
}

export function AdDashboardFilterBar({
  allAdsCount,
  pst106Count,
  pst108Count,
  pst123Count,
  moduleFilter,
  onModuleFilterChange,
  statusFilter,
  onStatusFilterChange,
  searchQuery,
  onSearchQueryChange,
}: AdDashboardFilterBarProps) {
  return (
    <div className="px-3.5 py-3 sm:px-6 sm:py-3.5 bg-white dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
      {/* Filtre par module (Apple Segmented Control) */}
      <div className="flex items-center gap-1 p-0.5 sm:p-1 bg-slate-50/90 dark:bg-slate-950/60 rounded-xl sm:rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs overflow-x-auto whitespace-nowrap scrollbar-none max-w-full">
        {(
          [
            { key: "all", label: `Tous (${allAdsCount})` },
            { key: "pst106", label: `PST106 (${pst106Count})` },
            { key: "pst108", label: `PST108 (${pst108Count})` },
            { key: "pst123", label: `PST123 (${pst123Count})` },
          ] as const
        ).map((m) => (
          <button
            key={m.key}
            onClick={() => {
              playClickSound();
              onModuleFilterChange(m.key);
            }}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold rounded-lg sm:rounded-xl transition-all cursor-pointer shrink-0 ${
              moduleFilter === m.key
                ? "bg-amber-600 text-white shadow-2xs font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Filtre par statut & recherche */}
      <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
        <select
          value={statusFilter}
          onChange={(e) =>
            onStatusFilterChange(e.target.value as "all" | AdStatus)
          }
          className="text-xs bg-slate-50/90 dark:bg-slate-950/60 text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-800 rounded-xl px-2.5 sm:px-3 py-1.5 focus:outline-none focus:border-amber-500/60 cursor-pointer flex-1 sm:flex-initial min-w-0"
        >
          <option value="all">Tous statuts</option>
          <option value="todo">À faire</option>
          <option value="draft">Brouillon</option>
          <option value="ready">Prête</option>
          <option value="submitted">Déposée</option>
          <option value="corrected">Corrigée</option>
        </select>

        {/* Barre de recherche */}
        <div className="relative flex-1 sm:flex-initial min-w-[130px]">
          <Search className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            aria-label="Rechercher une activité distante par thème, consigne ou module"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Rechercher..."
            className="pl-8 pr-3 py-1.5 text-xs bg-slate-50/90 dark:bg-slate-950/60 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 border border-slate-200/80 dark:border-slate-800 rounded-xl focus:outline-none focus:border-amber-500/60 w-full sm:w-48 md:w-60"
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { Swords, X } from "lucide-react";
import { triggerHaptic, playClickSound } from "@/lib/pst/audio-feedback";
import { MATCHS_AUTEURS, type DuelAuteurs } from "@/lib/pst/data/match-auteurs";

interface MatchAuteursHeaderProps {
  onClose: () => void;
  moduleFilter: string;
  onSelectModule: (key: string) => void;
  filteredMatches: DuelAuteurs[];
  currentMatch: DuelAuteurs;
  onSelectDuel: (id: string) => void;
}

export function MatchAuteursHeader({
  onClose,
  moduleFilter,
  onSelectModule,
  filteredMatches,
  currentMatch,
  onSelectDuel,
}: MatchAuteursHeaderProps) {
  return (
    <>
      {/* HEADER MODAL iOS */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 gap-2">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="size-8 sm:size-10 rounded-xl sm:rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 shrink-0">
            <Swords className="size-4 sm:size-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 truncate">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 truncate">
                Outil Dialectique Cnam
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 shrink-0 hidden xs:inline">
                {filteredMatches.length} duel
                {filteredMatches.length > 1 ? "s" : ""}
              </span>
            </div>
            <h2 className="text-sm sm:text-lg font-black tracking-tight text-slate-900 dark:text-slate-100 truncate">
              Le Match des Auteurs (1 vs 1)
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="size-8 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-center shrink-0"
          aria-label="Fermer"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* BARRE DE SÉLECTION DU MODULE PST */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200/70 dark:border-slate-800 pb-2">
        <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
          Module :
        </span>
        {[
          { key: "all", label: "Tous" },
          { key: "pst106", label: "PST106 · Activité" },
          { key: "pst108", label: "PST108 · Dialogue" },
          { key: "pst120", label: "PST120 · Clinique" },
          { key: "pst123", label: "PST123 · Travail & emploi" },
          { key: "pst124", label: "PST124 · Digital" },
        ].map((item) => {
          const isCurrent = moduleFilter === item.key;
          const count =
            item.key === "all"
              ? MATCHS_AUTEURS.length
              : MATCHS_AUTEURS.filter((m) => m.modules.includes(item.key))
                  .length;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                onSelectModule(item.key);
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
                isCurrent
                  ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>{item.label}</span>
              <span className="ml-1 opacity-75 font-mono text-[10px]">
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* SÉLECTEUR DE DUELS DU MODULE ACTIF */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filteredMatches.map((m) => {
          const isSelected = m.id === currentMatch.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                onSelectDuel(m.id);
              }}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                isSelected
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900"
              }`}
            >
              <span>{m.titre.replace(/^Duel \d+ : /, "")}</span>
            </button>
          );
        })}
      </div>

      {/* SITUATION DE TRAVAIL RÉEL SOUMISE AU DUEL */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
            🛠️ Situation de Travail Réel soumise à l&apos;analyse
          </span>
          <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400">
            {currentMatch.modules.map((m) => m.toUpperCase()).join(" · ")}
          </span>
        </div>
        <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic font-serif m-0">
          « {currentMatch.situationTravailReel} »
        </p>
      </div>
    </>
  );
}

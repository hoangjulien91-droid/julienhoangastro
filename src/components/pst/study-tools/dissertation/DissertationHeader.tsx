"use client";

import { GraduationCap, X, Dice5 } from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface DissertationHeaderProps {
  onClose: () => void;
  selectedFilter: string;
  onSelectFilter: (f: string) => void;
  onRandomDraw: () => void;
  isRolling: boolean;
}

export function DissertationHeader({
  onClose,
  selectedFilter,
  onSelectFilter,
  onRandomDraw,
  isRolling,
}: DissertationHeaderProps) {
  return (
    <>
      {/* En-tête Feuille Modale */}
      <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-indigo-500/10 via-amber-500/10 to-rose-500/10 gap-2">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="size-8 sm:size-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-amber-600 flex items-center justify-center text-white shadow-md shrink-0">
            <GraduationCap className="size-4 sm:size-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 m-0 truncate">
              <span className="truncate">Dissertation &amp; Plans 18/20</span>
              <span className="hidden sm:inline text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-800 dark:text-indigo-200 font-extrabold uppercase shrink-0">
                Modèles CNAM
              </span>
            </h2>
            <p className="text-[10px] sm:text-xs text-slate-500 truncate m-0">
              Problématisation, plan en 2 parties, citations et pièges
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="size-8 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 flex items-center justify-center transition-all cursor-pointer shrink-0"
          aria-label="Fermer"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Filter bar & Actions */}
      <div className="p-2.5 sm:p-4 border-b border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center justify-between gap-2 overflow-hidden">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap max-w-full pb-0.5">
          {[
            { key: "all", short: "Tous", desc: "" },
            { key: "pst108", short: "PST108", desc: " (Dialogue)" },
            { key: "pst106", short: "PST106", desc: " (Clinique)" },
            { key: "pst120", short: "PST120", desc: " (Psychodyn.)" },
            { key: "pst123", short: "PST123", desc: " (Emploi)" },
            { key: "pst124", short: "PST124", desc: " (Digital)" },
            { key: "transversal", short: "Transversaux", desc: " RNCP 7" },
          ].map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => {
                playClickSound();
                onSelectFilter(f.key);
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
                selectedFilter === f.key
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
              }`}
            >
              <span>{f.short}</span>
              <span className="hidden sm:inline opacity-80">{f.desc}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onRandomDraw}
            disabled={isRolling}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0"
            title="Tirer un sujet de dissertation au hasard"
          >
            <Dice5
              className={`size-3.5 text-amber-600 ${isRolling ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Tirage aléatoire</span>
            <span className="sm:hidden">Tirage</span>
          </button>
        </div>
      </div>
    </>
  );
}

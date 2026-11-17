"use client";

import { BarChart3, CalendarDays, Car, ListFilter } from "lucide-react";

export type PlanningViewMode = "grid" | "week" | "list" | "logistics";

interface PlanningViewNavProps {
  activeView: PlanningViewMode;
  setView: (v: PlanningViewMode) => void;
}

export function PlanningViewNav({ activeView, setView }: PlanningViewNavProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-4 p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60 shadow-inner w-full">
        <button
          type="button"
          onClick={() => setView("grid")}
          className={`py-1.5 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
            activeView === "grid"
              ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          }`}
          title="Vue Frise Chronologique (Raccourci clavier : 1)"
        >
          <BarChart3 className="size-3.5 shrink-0" />
          <span className="inline">Frise</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px] font-bold">
            1
          </kbd>
        </button>

        <button
          type="button"
          onClick={() => setView("week")}
          className={`py-1.5 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
            activeView === "week"
              ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          }`}
          title="Vue Agenda Hebdomadaire (Raccourci clavier : 2)"
        >
          <CalendarDays className="size-3.5 shrink-0" />
          <span className="inline">Hebdo</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px] font-bold">
            2
          </kbd>
        </button>

        <button
          type="button"
          onClick={() => setView("list")}
          className={`py-1.5 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
            activeView === "list"
              ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          }`}
          title="Vue Liste Mensuelle (Raccourci clavier : 3)"
        >
          <ListFilter className="size-3.5 shrink-0" />
          <span className="inline">Liste</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px] font-bold">
            3
          </kbd>
        </button>

        <button
          type="button"
          onClick={() => setView("logistics")}
          className={`py-1.5 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
            activeView === "logistics"
              ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
          }`}
          title="Vue Trajets Bègles (Raccourci clavier : 4)"
        >
          <Car className="size-3.5 shrink-0" />
          <span className="inline">Trajets</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px] font-bold">
            4
          </kbd>
        </button>
      </div>
    </div>
  );
}

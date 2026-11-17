"use client";

import { ArrowUp, SlidersHorizontal } from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { PILLARS } from "./tabs-metadata";

interface TabsMobileFloatingDockProps {
  showFloatingDock: boolean;
  selectedPillar: string;
  onPillarChange: (pillarId: string) => void;
  onScrollToTop: () => void;
}

export function TabsMobileFloatingDock({
  showFloatingDock,
  selectedPillar,
  onPillarChange,
  onScrollToTop,
}: TabsMobileFloatingDockProps) {
  if (!showFloatingDock) return null;

  return (
    <div className="sm:hidden fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] inset-x-3 z-40 flex items-center justify-between gap-1 p-1.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 backdrop-blur-xl shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-150">
      <div className="flex items-center gap-1 flex-1 min-w-0">
        {PILLARS.map((p) => {
          const isAct = selectedPillar === p.id;
          const Icon = p.icon;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onPillarChange(p.id)}
              className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 ${
                isAct
                  ? p.id === "Suivi"
                    ? "bg-sky-500 text-white shadow-2xs"
                    : p.id === "Apprendre"
                      ? "bg-amber-500 text-slate-950 shadow-2xs"
                      : p.id === "S'entraîner"
                        ? "bg-purple-600 text-white shadow-2xs"
                        : "bg-rose-600 text-white shadow-2xs"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="size-3 shrink-0" />
              <span className="truncate">{p.shortLabel}</span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => {
          playClickSound();
          window.dispatchEvent(new CustomEvent("pst:toggle-study-tools"));
        }}
        aria-label="Outils d'étude et minuteur"
        title="Outils d'étude et minuteur"
        className="p-2 rounded-xl bg-amber-500/15 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 hover:bg-amber-500/25 transition-colors cursor-pointer shrink-0 active:scale-95"
      >
        <SlidersHorizontal className="size-3.5" />
      </button>
      <button
        type="button"
        onClick={() => {
          playClickSound();
          onScrollToTop();
        }}
        aria-label="Remonter en haut de page"
        title="Remonter en haut de page"
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0 active:scale-95"
      >
        <ArrowUp className="size-3.5" />
      </button>
    </div>
  );
}

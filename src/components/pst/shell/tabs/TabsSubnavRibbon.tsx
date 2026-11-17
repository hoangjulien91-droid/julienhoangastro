"use client";

import type { RefObject, MutableRefObject, KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TabDef, PillarDef } from "./tabs-metadata";

interface TabsSubnavRibbonProps {
  pillarTabs: TabDef[];
  activeTab: string;
  selectedPillar: string;
  activePillarDef?: PillarDef;
  activePillarDisplayLabel: string;
  onSelectTab: (id: string) => void;
  tabRefs: MutableRefObject<Record<string, HTMLButtonElement | null>>;
  subtabsContainerRef: RefObject<HTMLDivElement>;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onScrollSubtabs: (direction: -1 | 1) => void;
  onKeyDown: (e: KeyboardEvent, currentId: string) => void;
}

export function TabsSubnavRibbon({
  pillarTabs,
  activeTab,
  selectedPillar,
  activePillarDef,
  activePillarDisplayLabel,
  onSelectTab,
  tabRefs,
  subtabsContainerRef,
  canScrollLeft,
  canScrollRight,
  onScrollSubtabs,
  onKeyDown,
}: TabsSubnavRibbonProps) {
  return (
    <div className="relative group/subtabs w-full">
      {/* Dégradé & Chevron gauche */}
      {canScrollLeft && (
        <div className="absolute left-0 inset-y-0 z-10 flex items-center pr-4 bg-gradient-to-r from-background via-background/90 to-transparent pointer-events-none">
          <button
            type="button"
            onClick={() => onScrollSubtabs(-1)}
            aria-label="Faire défiler les onglets vers la gauche"
            className="pointer-events-auto min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg bg-card/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-border shadow-xs hover:bg-card transition-all cursor-pointer"
          >
            <ChevronLeft className="size-4" />
          </button>
        </div>
      )}

      {/* Conteneur défilable */}
      <div
        ref={subtabsContainerRef}
        role="tablist"
        aria-label={`Onglets du pilier ${activePillarDisplayLabel}`}
        className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none scroll-smooth w-full px-0.5"
      >
        {/* Badge de contexte de pilier sur grand écran pour matérialiser la relation Parent -> Enfant */}
        <div className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0">
          <span
            className={`size-1.5 rounded-full ${
              selectedPillar === "Suivi"
                ? "bg-sky-500"
                : selectedPillar === "Apprendre"
                  ? "bg-amber-500"
                  : selectedPillar === "S'entraîner"
                    ? "bg-purple-500"
                    : "bg-rose-500"
            }`}
          />
          <span>{activePillarDef?.shortLabel ?? selectedPillar}</span>
          <span className="text-slate-400">·</span>
          <span className="font-mono text-[10px]">{pillarTabs.length}</span>
        </div>

        {pillarTabs.map((t) => {
          const isSelected = activeTab === t.id;
          return (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              aria-controls={`panel-${t.id}`}
              ref={(el) => {
                tabRefs.current[t.id] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onKeyDown={(e) => onKeyDown(e, t.id)}
              onClick={() => onSelectTab(t.id)}
              className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap active:scale-95 min-h-[44px] sm:min-h-[40px] shrink-0 flex items-center gap-1.5 ${
                isSelected
                  ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-950 dark:border-white shadow-xs font-bold"
                  : "bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {isSelected && (
                <span
                  className={`size-1.5 rounded-full ${
                    selectedPillar === "Suivi"
                      ? "bg-sky-400"
                      : selectedPillar === "Apprendre"
                        ? "bg-amber-400"
                        : selectedPillar === "S'entraîner"
                          ? "bg-purple-400"
                          : "bg-rose-400"
                  }`}
                />
              )}
              <span>{t.label.replace(" ◆", "").replace(" ✦", "")}</span>
            </button>
          );
        })}
      </div>

      {/* Dégradé & Chevron droit */}
      {canScrollRight && (
        <div className="absolute right-0 inset-y-0 z-10 flex items-center pl-4 bg-gradient-to-l from-background via-background/90 to-transparent pointer-events-none">
          <button
            type="button"
            onClick={() => onScrollSubtabs(1)}
            aria-label="Faire défiler les onglets vers la droite"
            className="pointer-events-auto min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg bg-card/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-border shadow-xs hover:bg-card transition-all cursor-pointer"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}

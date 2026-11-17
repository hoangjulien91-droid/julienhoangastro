"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { PILLARS, type TabDef } from "./tabs-metadata";

interface TabsSequentialFooterProps {
  tabs: TabDef[];
  activeFullIdx: number;
  prevTab: TabDef | null;
  nextTab: TabDef | null;
  selectedPillar: string;
  activePillarDisplayLabel: string;
  idxInPillar: number;
  pillarTabsLength: number;
  onJumpToTab: (id: string) => void;
}

export function TabsSequentialFooter({
  tabs,
  activeFullIdx,
  prevTab,
  nextTab,
  selectedPillar,
  activePillarDisplayLabel,
  idxInPillar,
  pillarTabsLength,
  onJumpToTab,
}: TabsSequentialFooterProps) {
  if (tabs.length <= 1 || activeFullIdx === -1) return null;

  return (
    <div className="mt-8 pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap text-xs">
      {prevTab ? (
        <button
          type="button"
          onClick={() => onJumpToTab(prevTab.id)}
          className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:border-amber-500/50 text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
        >
          <ChevronLeft className="size-4 text-amber-600" />
          <div className="flex flex-col items-start leading-tight">
            {prevTab.group !== selectedPillar && (
              <span className="text-[10px] font-mono uppercase text-amber-600 dark:text-amber-400">
                ←{" "}
                {PILLARS.find((p) => p.id === prevTab.group)?.label ??
                  prevTab.group}
              </span>
            )}
            <span>{prevTab.label.replace(" ◆", "").replace(" ✦", "")}</span>
          </div>
        </button>
      ) : (
        <div />
      )}

      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
        {activePillarDisplayLabel} · {idxInPillar >= 0 ? idxInPillar + 1 : 1} /{" "}
        {pillarTabsLength}
      </span>

      {nextTab ? (
        <button
          type="button"
          onClick={() => onJumpToTab(nextTab.id)}
          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs active:scale-95"
        >
          <div className="flex flex-col items-end leading-tight">
            {nextTab.group !== selectedPillar && (
              <span className="text-[10px] font-mono uppercase text-amber-400 dark:text-amber-600">
                {PILLARS.find((p) => p.id === nextTab.group)?.label ??
                  nextTab.group}{" "}
                →
              </span>
            )}
            <span>{nextTab.label.replace(" ◆", "").replace(" ✦", "")}</span>
          </div>
          <ChevronRight className="size-4" />
        </button>
      ) : (
        <div />
      )}
    </div>
  );
}

"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Target, ShieldAlert, Quote, GitCompare, PenLine } from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";

export type TrainingModeId = "qcm" | "pieges" | "qui" | "distinguer" | "cloze";

export interface TrainingModeDef {
  id: TrainingModeId;
  label: string;
  shortLabel: string;
  count?: number;
  content: ReactNode;
}

interface TrainingHubPanelProps {
  modes: TrainingModeDef[];
  defaultMode?: TrainingModeId;
}

const MODE_ICONS: Record<TrainingModeId, React.ComponentType<{ className?: string }>> = {
  qcm: Target,
  pieges: ShieldAlert,
  qui: Quote,
  distinguer: GitCompare,
  cloze: PenLine,
};

export function TrainingHubPanel({
  modes,
  defaultMode = "qcm",
}: TrainingHubPanelProps) {
  const [activeMode, setActiveMode] = useState<TrainingModeId>(() => {
    if (typeof window !== "undefined") {
      const h = window.location.hash.slice(1).toLowerCase() as TrainingModeId;
      if (modes.some((m) => m.id === h)) return h;
    }
    return modes.some((m) => m.id === defaultMode)
      ? defaultMode
      : (modes[0]?.id ?? "qcm");
  });

  useEffect(() => {
    function handleSelectMode(e: Event) {
      const mode = (e as CustomEvent<{ mode?: TrainingModeId }>).detail?.mode;
      if (mode && modes.some((m) => m.id === mode)) {
        setActiveMode(mode);
      }
    }
    window.addEventListener("pst:select-training-mode", handleSelectMode);
    return () =>
      window.removeEventListener("pst:select-training-mode", handleSelectMode);
  }, [modes]);

  const current = modes.find((m) => m.id === activeMode) ?? modes[0];
  if (!current) return null;

  return (
    <div className="space-y-4">
      <div
        role="tablist"
        aria-label="Modes d'entraînement"
        className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800"
      >
        {modes.map((m) => {
          const isSelected = m.id === current.id;
          const Icon = MODE_ICONS[m.id] ?? Target;
          return (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => {
                playClickSound();
                setActiveMode(m.id);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer active:scale-95 ${
                isSelected
                  ? "bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon
                className={`size-3.5 shrink-0 ${
                  isSelected ? "text-purple-600 dark:text-purple-400" : "text-slate-400"
                }`}
              />
              <span className="hidden sm:inline">{m.label}</span>
              <span className="sm:hidden">{m.shortLabel}</span>
              {typeof m.count === "number" && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300">
                  {m.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" aria-label={current.label}>
        {current.content}
      </div>
    </div>
  );
}

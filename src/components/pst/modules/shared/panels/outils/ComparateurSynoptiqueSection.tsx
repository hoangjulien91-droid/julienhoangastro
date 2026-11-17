"use client";

import { Layers } from "lucide-react";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";
import type {
  SynthAxisOption,
  ComparateurColumn,
  SynthAxisData,
} from "../Outils";

interface ComparateurSynoptiqueSectionProps {
  title: string;
  hint: string;
  synthAxes: SynthAxisOption[];
  columns: ComparateurColumn[];
  data: SynthAxisData;
  activeAxis: string;
  onSelectAxis: (key: string) => void;
}

export function ComparateurSynoptiqueSection({
  title,
  hint,
  synthAxes,
  columns,
  data,
  activeAxis,
  onSelectAxis,
}: ComparateurSynoptiqueSectionProps) {
  const synth = data[activeAxis];

  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-3">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
            <Layers className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Grille Comparative Synoptique</span>
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
            {title}
          </h3>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed">
        {hint}
      </p>

      {/* Axis selector pill buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none whitespace-nowrap max-w-full">
        {synthAxes.map((axis) => {
          const isActive = activeAxis === axis.key;
          return (
            <button
              key={axis.key}
              type="button"
              onClick={() => {
                playClickSound();
                triggerHaptic("selection");
                onSelectAxis(axis.key);
              }}
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 shrink-0 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {axis.label}
            </button>
          );
        })}
      </div>

      {/* Multi-column comparative cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
        {columns.map((col) => (
          <div
            key={col.key}
            className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 space-y-2 relative overflow-hidden"
            style={{ borderLeftColor: col.color, borderLeftWidth: 4 }}
          >
            <div
              className="text-xs font-mono font-bold tracking-wider uppercase"
              style={{ color: col.color }}
            >
              {col.label}
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 m-0 font-medium">
              {synth?.[col.key] || "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";
import { useRingsData } from "./anneaux/useRingsData";
import { AnneauxRevisionModal } from "./anneaux/AnneauxRevisionModal";

export function AnneauxRevisionPst() {
  const {
    data,
    pctRed,
    pctGreen,
    pctBlue,
    allClosed,
    cRed,
    cGreen,
    cBlue,
    offsetRed,
    offsetGreen,
    offsetBlue,
  } = useRingsData();

  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Micro-Pill Trigger dans la barre de navigation ou en-tête */}
      <button
        type="button"
        onClick={() => {
          triggerHaptic("selection");
          playClickSound();
          setExpanded((v) => !v);
        }}
        className="inline-flex items-center gap-1.5 px-2 py-1 rounded-xl bg-white dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 transition-all cursor-pointer shadow-2xs active:scale-95"
        title="Indicateurs de progression quotidienne"
      >
        {/* SVG Mini Rings */}
        <div className="relative size-6 shrink-0 flex items-center justify-center">
          <svg className="size-6 -rotate-90 transform" viewBox="0 0 60 60">
            {/* Background tracks */}
            <circle
              cx="30"
              cy="30"
              r="24"
              stroke="currentColor"
              strokeWidth="5"
              fill="none"
              className="text-rose-500/20"
            />
            <circle
              cx="30"
              cy="30"
              r="18"
              stroke="currentColor"
              strokeWidth="5"
              fill="none"
              className="text-emerald-500/20"
            />
            <circle
              cx="30"
              cy="30"
              r="12"
              stroke="currentColor"
              strokeWidth="5"
              fill="none"
              className="text-cyan-500/20"
            />

            {/* Active rings */}
            <circle
              cx="30"
              cy="30"
              r="24"
              stroke="#f43f5e"
              strokeWidth="5"
              fill="none"
              strokeDasharray={cRed}
              strokeDashoffset={offsetRed}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
            <circle
              cx="30"
              cy="30"
              r="18"
              stroke="#10b981"
              strokeWidth="5"
              fill="none"
              strokeDasharray={cGreen}
              strokeDashoffset={offsetGreen}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
            <circle
              cx="30"
              cy="30"
              r="12"
              stroke="#06b6d4"
              strokeWidth="5"
              fill="none"
              strokeDasharray={cBlue}
              strokeDashoffset={offsetBlue}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-900 dark:text-white">
          <Flame className="size-3 text-amber-500 fill-amber-500" />
          <span>{data.streakDays}j</span>
        </div>
      </button>

      {/* Expanded Modal popover - Téléporté via Portal dans document.body */}
      {expanded && mounted && (
        <AnneauxRevisionModal
          isOpen={expanded}
          onClose={() => setExpanded(false)}
          data={data}
          pctRed={pctRed}
          pctGreen={pctGreen}
          pctBlue={pctBlue}
          allClosed={allClosed}
          cRed={cRed}
          cGreen={cGreen}
          cBlue={cBlue}
          offsetRed={offsetRed}
          offsetGreen={offsetGreen}
          offsetBlue={offsetBlue}
        />
      )}
    </>
  );
}

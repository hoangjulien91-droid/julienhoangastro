"use client";

import { Timer, Zap } from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { SPEEDRUN_MODULE_OPTIONS } from "@/lib/pst/data/speedrun-data";

interface SpeedRunReadyViewProps {
  moduleFilter: string;
  onSelectFilter: (key: string) => void;
  onStart: () => void;
}

export function SpeedRunReadyView({
  moduleFilter,
  onSelectFilter,
  onStart,
}: SpeedRunReadyViewProps) {
  return (
    <div className="py-4 sm:py-6 text-center space-y-4 sm:space-y-5">
      <div className="inline-flex size-16 sm:size-20 rounded-3xl bg-amber-500/15 text-amber-600 dark:text-amber-400 items-center justify-center shadow-inner">
        <Timer className="size-8 sm:size-10 animate-pulse" />
      </div>

      <div className="space-y-2 max-w-md mx-auto">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
          Prêt pour le défi 18/20 ?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          En 3 minutes, répondez au maximum de questions sur les
          auteurs, formules matrices et pièges classiques de vos
          professeurs.
        </p>
      </div>

      {/* Module Filter Pills */}
      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        {SPEEDRUN_MODULE_OPTIONS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => {
              playClickSound();
              onSelectFilter(item.key);
            }}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all border cursor-pointer max-w-full ${
              moduleFilter === item.key
                ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                : "bg-slate-50/90 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="pt-2 sm:pt-3">
        <button
          type="button"
          onClick={onStart}
          className="w-full sm:w-auto px-4 sm:px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 text-white font-bold text-xs sm:text-base shadow-lg hover:shadow-xl sm:hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
        >
          <Zap className="size-4 sm:size-5 fill-white shrink-0" />
          <span>Lancer le Sprint Chronométré (180s)</span>
        </button>
      </div>
    </div>
  );
}

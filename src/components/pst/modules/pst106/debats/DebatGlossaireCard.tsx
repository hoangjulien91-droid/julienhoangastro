"use client";

import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";
import { DEBATS_GLOSSAIRE } from "@/lib/pst/data/pst106-debats-data";

export function DebatGlossaireCard() {
  const [glossaireOpen, setGlossaireOpen] = useState(false);

  return (
    <div className="p-4 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
      <button
        type="button"
        onClick={() => {
          playClickSound();
          triggerHaptic("selection");
          setGlossaireOpen((o) => !o);
        }}
        className="w-full flex items-center justify-between text-xs sm:text-sm font-mono font-bold text-slate-800 dark:text-slate-200 cursor-pointer select-none py-1"
      >
        <span className="flex items-center gap-2">
          <BookOpen className="size-4 text-indigo-500" />
          <span>Glossaire synthétique des 3 grands courants</span>
        </span>
        {glossaireOpen ? (
          <ChevronUp className="size-4" />
        ) : (
          <ChevronDown className="size-4" />
        )}
      </button>

      {glossaireOpen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 mt-3 border-t border-slate-200/60 dark:border-slate-800 animate-fadeIn">
          {DEBATS_GLOSSAIRE.map((g) => (
            <div
              key={g.term}
              className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 space-y-1.5"
            >
              <span className="text-xs font-bold font-mono text-indigo-700 dark:text-indigo-400 block">
                {g.term}
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 m-0 leading-relaxed font-medium">
                {g.def}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

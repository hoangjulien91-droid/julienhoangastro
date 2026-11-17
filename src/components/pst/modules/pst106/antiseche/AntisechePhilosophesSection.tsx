"use client";

import React, { useState } from "react";
import { ANTISECHE_PHILOSOPHES } from "@/lib/pst/data/pst106-antiseche";

interface AntisechePhilosophesSectionProps {
  mask: (text: string) => React.ReactNode;
}

export function AntisechePhilosophesSection({
  mask,
}: AntisechePhilosophesSectionProps) {
  const [philosopheFilter, setPhilosopheFilter] = useState<
    "all" | "alienation" | "emancipation" | "realite"
  >("all");

  const filteredPhilosophes = ANTISECHE_PHILOSOPHES.filter(
    (p) => philosopheFilter === "all" || p.axe === philosopheFilter,
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2.5">
        <div className="sec font-bold text-amber-700 dark:text-amber-400 text-xs sm:text-sm uppercase tracking-wide">
          ③ Le travail selon les philosophes (Exercice de cours &amp; Slides)
        </div>
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-[11px]">
          <button
            type="button"
            onClick={() => setPhilosopheFilter("all")}
            className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
              philosopheFilter === "all"
                ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
            }`}
          >
            Tous (9)
          </button>
          <button
            type="button"
            onClick={() => setPhilosopheFilter("alienation")}
            className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
              philosopheFilter === "alienation"
                ? "bg-rose-700 text-white"
                : "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 hover:bg-rose-100"
            }`}
          >
            Aliénation (4)
          </button>
          <button
            type="button"
            onClick={() => setPhilosopheFilter("emancipation")}
            className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
              philosopheFilter === "emancipation"
                ? "bg-emerald-700 text-white"
                : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100"
            }`}
          >
            Émancipation (4)
          </button>
          <button
            type="button"
            onClick={() => setPhilosopheFilter("realite")}
            className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
              philosopheFilter === "realite"
                ? "bg-indigo-700 text-white"
                : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100"
            }`}
          >
            Lien au réel (1)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredPhilosophes.map((p) => {
          const badgeBg =
            p.axe === "alienation"
              ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
              : p.axe === "emancipation"
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                : "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300";

          return (
            <div
              key={p.id}
              className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-xs flex flex-col justify-between space-y-2.5"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-1.5 flex-wrap">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                    {p.auteur}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                    {p.dates}
                  </span>
                </div>
                <div>
                  <span
                    className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold ${badgeBg}`}
                  >
                    {p.axeLabel}
                  </span>
                </div>
                <p className="text-[11.5px] leading-relaxed text-slate-700 dark:text-slate-300 pt-1">
                  {mask(p.these)}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1">
                <div className="text-[10.5px] italic text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg leading-snug">
                  {p.citation}
                </div>
                <div className="text-[10.5px] text-amber-800 dark:text-amber-300 font-medium pt-0.5">
                  <span className="font-bold text-[9.5px] uppercase tracking-wide opacity-80">
                    Portée clinique :{" "}
                  </span>
                  {p.relevance}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { FriseEntry } from "@/lib/pst/types";

function getShortName(title: string) {
  return title.split(/[—\-:]/)[0]?.trim() ?? title;
}

interface FriseProps {
  data: FriseEntry[];
  hint: string;
}

export function Frise({ data, hint }: FriseProps) {
  const [idx, setIdx] = useState(0);
  const entry = data[idx];
  if (!entry) return null;

  return (
    <div>
      <p className="hint">{hint}</p>
      <div className="frise-axis overflow-x-auto whitespace-nowrap pb-2 scrollbar-none" style={{ marginBottom: 14 }}>
        {data.map((f, i) => (
          <button
            key={i}
            className={`frise-dot shrink-0 active:scale-95 transition-all${i === idx ? " active" : ""}`}
            onClick={() => setIdx(i)}
          >
            <span className="yr">{f.annee}</span>
            <span className="pt" />
            <span className="nm">{getShortName(f.titre)}</span>
          </button>
        ))}
      </div>
      <div id="friseHost">
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs relative overflow-hidden">
          <div
            className="text-xs sm:text-sm font-black font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-2"
          >
            <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
            <span>{entry.annee} — {entry.titre}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
            <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1">
                Auteur &amp; Œuvre
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed font-medium">
                {entry.titre}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-800 dark:text-slate-200">
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider mb-1">
                Apport Théorique &amp; Portée
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 m-0 leading-relaxed font-medium">
                {entry.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

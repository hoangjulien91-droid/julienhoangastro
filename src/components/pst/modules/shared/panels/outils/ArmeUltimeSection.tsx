"use client";

import { Sparkles } from "lucide-react";
import type { ArmeUltime } from "../Outils";

interface ArmeUltimeSectionProps {
  arme: ArmeUltime;
}

export function ArmeUltimeSection({ arme }: ArmeUltimeSectionProps) {
  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-indigo-600 shadow-xs space-y-3.5">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
          <Sparkles className="size-3 text-indigo-600 dark:text-indigo-400" />
          <span>Ressource Méthodologique Majeure</span>
        </span>
      </div>

      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
        {arme.title}
      </h3>

      <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {arme.intro}
      </div>

      <ul className="space-y-2 pt-1 list-none pl-0 m-0">
        {arme.items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200"
          >
            <span className="size-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

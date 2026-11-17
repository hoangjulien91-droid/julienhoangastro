"use client";

import { Sparkles } from "lucide-react";
import { ARME_ULTIME } from "@/lib/pst/data/pst106-outils";

export function RepereAnalyseCard() {
  return (
    <div className="p-5 sm:p-6 rounded-3xl border border-amber-500/30 bg-amber-500/5 shadow-xs space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 inline-flex items-center gap-1.5 shadow-2xs">
          <Sparkles className="size-3 text-amber-600 dark:text-amber-400" />
          <span>Repère Clé d&apos;Analyse Clinique</span>
        </span>
      </div>

      <h3 className="text-sm sm:text-base font-serif font-bold text-amber-950 dark:text-amber-200 m-0">
        {ARME_ULTIME.title}
      </h3>

      <p
        className="text-xs text-muted-foreground leading-relaxed m-0"
        dangerouslySetInnerHTML={{ __html: ARME_ULTIME.intro }}
      />

      <ul className="space-y-1.5 m-0 pl-0 list-none text-xs text-foreground">
        {ARME_ULTIME.points.map((p, i) => (
          <li key={i} className="flex items-start gap-2 leading-relaxed">
            <span className="size-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
            <span>
              <strong className="font-semibold text-foreground">{p.b}</strong> :{" "}
              {p.t}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

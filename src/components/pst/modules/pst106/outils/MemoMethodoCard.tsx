"use client";

import { Layers } from "lucide-react";
import { MEMO_METHODO } from "@/lib/pst/data/pst106-outils";

export function MemoMethodoCard() {
  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20 inline-flex items-center gap-1.5 shadow-2xs">
          <Layers className="size-3 text-slate-600 dark:text-slate-400" />
          <span>Démarche Empirique &amp; Rigueur Clinique</span>
        </span>
      </div>

      <div>
        <h3 className="text-base font-serif font-bold text-foreground m-0">
          Mémo Méthodologique des Dispositifs de Terrain
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5 m-0 leading-relaxed">
          Contrastes fondamentaux des méthodologies à restituer impérativement
          pour illustrer la rigueur de chaque école face au travail réel :
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
        {MEMO_METHODO.map((m) => (
          <div
            key={m.key}
            className="p-5 rounded-2xl border border-border bg-card shadow-xs space-y-3"
          >
            <h4 className="text-sm font-serif font-bold text-foreground m-0">
              {m.title}
            </h4>
            <ul className="space-y-2 m-0 pl-0 list-none text-xs text-muted-foreground">
              {m.items.map((it, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 leading-relaxed"
                >
                  <span className="size-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                  <span>
                    <strong className="text-foreground">{it.b}</strong> :{" "}
                    {it.t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Clock, Calendar, Sparkles } from "lucide-react";
import { GLOBAL_ERAS } from "@/lib/pst/data/global-eras";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

export function GlobalTimeline() {
  const [activeKey, setActiveKey] = useState("era2");
  const era = GLOBAL_ERAS.find((e) => e.key === activeKey) ?? GLOBAL_ERAS[0];
  if (!era) return null;

  return (
    <div className="card p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xs mb-6 space-y-4">
      <div>
        <h3 className="text-base font-serif font-bold text-foreground m-0">
          Chronologie Historique &amp; Évolution des Paradigmes
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5 m-0 leading-relaxed">
          Parcourez la trajectoire historique et l&apos;émergence conjointe des concepts théoriques du travail à travers tous les modules PST Cnam.
        </p>
      </div>

      {/* Eras Selector Row */}
      <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 scrollbar-none py-1">
        {GLOBAL_ERAS.map((e) => {
          const isActive = e.key === activeKey;
          return (
            <button
              key={e.key}
              type="button"
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer border shrink-0 ${
                isActive
                  ? "bg-primary text-primary-foreground font-bold border-primary shadow-xs scale-102"
                  : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border-border/80"
              }`}
              onClick={() => {
                triggerHaptic("light");
                playClickSound();
                setActiveKey(e.key);
              }}
            >
              <span className="font-bold">{e.year}</span>
              <span className="opacity-80 ml-1.5 font-normal">· {e.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Era Detail Card */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-border bg-card shadow-xs space-y-4 animate-in fade-in duration-150">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5 shadow-2xs">
            <Clock className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Période Historique · {era.year}</span>
          </span>
          <span className="font-mono text-xs font-bold text-accent">
            {era.name}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic m-0">
          « {era.desc} »
        </p>

        {/* 3 Pillars Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {/* Pillar 1: PST106 / PST108 */}
          <div className="p-4 rounded-2xl border border-border/80 bg-muted/20 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-accent block">
              PST106 / PST108
            </span>
            <div
              className="text-xs text-foreground/90 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: era.pst106 || era.pst108 || "Non applicable",
              }}
            />
          </div>

          {/* Pillar 2: PST120 / PST124 */}
          <div className="p-4 rounded-2xl border border-border/80 bg-muted/20 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-indigo-600 dark:text-indigo-400 block">
              PST120 / PST124
            </span>
            <div
              className="text-xs text-foreground/90 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: era.pst120 || era.pst124 || "Non applicable",
              }}
            />
          </div>

          {/* Pillar 3: PST123 */}
          <div className="p-4 rounded-2xl border border-border/80 bg-muted/20 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-400 block">
              PST123 (Déontologie &amp; Cadre)
            </span>
            <div
              className="text-xs text-foreground/90 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: era.pst123 || "Non applicable",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

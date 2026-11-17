"use client";

import { useState } from "react";
import { Scale } from "lucide-react";
import {
  SYNTH_COMPARISONS,
  SYNTH_AXES,
  type SynthAxisKey,
} from "@/lib/pst/data/pst106-outils";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

export function ComparateurTripartite() {
  const [axis, setAxis] = useState<SynthAxisKey>("objectif");
  const synth = SYNTH_COMPARISONS[axis];

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5 shadow-2xs">
          <Scale className="size-3 text-indigo-600 dark:text-indigo-400" />
          <span>Comparateur Tripartite (Wisner · Clot · Dejours)</span>
        </span>
      </div>

      <div>
        <h3 className="text-base font-serif font-bold text-foreground m-0">
          Comparateur Conceptuel Synchronisé
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5 m-0 leading-relaxed">
          Le correcteur Cnam attend une mise en tension systématique des 3
          courants sur les notions clés. Sélectionnez une thématique pour
          comparer les prismes doctrinaux :
        </p>
      </div>

      {/* Axis selector */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        {SYNTH_AXES.map((a) => {
          const isActive = axis === a.key;
          return (
            <button
              key={a.key}
              type="button"
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer border ${
                isActive
                  ? "bg-primary text-primary-foreground font-bold border-primary shadow-xs scale-102"
                  : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border-border/80"
              }`}
              onClick={() => {
                triggerHaptic("light");
                playClickSound();
                setAxis(a.key);
              }}
            >
              {a.label}
            </button>
          );
        })}
      </div>

      {/* 3 Authors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
        {(
          [
            {
              key: "wisner",
              name: "Alain Wisner (Ergonomie)",
              border: "border-l-cyan-600",
            },
            {
              key: "clot",
              name: "Yves Clot (Clinique de l'Activité)",
              border: "border-l-indigo-600",
            },
            {
              key: "dejours",
              name: "Christophe Dejours (Psychodynamique)",
              border: "border-l-amber-600",
            },
          ] as const
        ).map((author) => (
          <div
            key={author.key}
            className={`p-4 rounded-2xl border border-border bg-card shadow-xs space-y-2 border-l-4 ${author.border}`}
          >
            <div className="font-serif font-bold text-sm text-foreground">
              {synth[author.key].title}
            </div>
            <div
              className="text-xs text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: synth[author.key].desc }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

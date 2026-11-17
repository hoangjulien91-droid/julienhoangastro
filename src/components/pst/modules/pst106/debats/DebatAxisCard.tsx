"use client";

import { Check, Sparkles } from "lucide-react";
import type { DebatAxis } from "@/lib/pst/data/pst106-debats-data";

interface DebatAxisCardProps {
  axe: DebatAxis;
  isMastered: boolean;
  onToggle: () => void;
}

export function DebatAxisCard({ axe, isMastered, onToggle }: DebatAxisCardProps) {
  return (
    <div
      className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border shadow-xs space-y-4 transition-all ${
        isMastered
          ? "border-emerald-500/40 dark:border-emerald-500/30"
          : "border-slate-200/80 dark:border-slate-800"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
            {axe.axis}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 m-0">
            {axe.title}
          </h3>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 ${
            isMastered
              ? "bg-emerald-600 text-white shadow-2xs"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
          }`}
        >
          <Check className="size-3" />
          <span>{isMastered ? "Maîtrisé" : "Marquer maîtrisé"}</span>
        </button>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed font-medium">
        {axe.intro}
      </p>

      {/* 3 Authors Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {axe.authors.map((a) => (
          <div
            key={a.name}
            className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 border-l-4 space-y-1"
            style={{ borderLeftColor: a.color }}
          >
            <div className="flex items-center justify-between gap-1">
              <span
                className="text-xs font-mono font-bold"
                style={{ color: a.color }}
              >
                {a.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 truncate max-w-[120px]">
                {a.tag}
              </span>
            </div>
            <div
              className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium"
              dangerouslySetInnerHTML={{ __html: a.body }}
            />
          </div>
        ))}
      </div>

      {/* Synthesis Key for exam */}
      <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/60 space-y-1">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1">
          <Sparkles className="size-3 text-amber-600" />
          <span>Clé de synthèse dialectique pour la copie Cnam</span>
        </span>
        <div
          className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: axe.synthesis }}
        />
      </div>
    </div>
  );
}

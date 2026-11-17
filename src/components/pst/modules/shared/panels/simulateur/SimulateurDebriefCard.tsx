"use client";

import React from "react";
import { Award, CheckCircle2, BookOpen, RotateCcw } from "lucide-react";
import type { SimScenario } from "@/lib/pst/types";

interface SimulateurDebriefCardProps {
  sc: SimScenario;
  score: number;
  exportedJournal: boolean;
  onExportToJournal: () => void;
  onRestart: () => void;
}

export function SimulateurDebriefCard({
  sc,
  score,
  exportedJournal,
  onExportToJournal,
  onRestart,
}: SimulateurDebriefCardProps) {
  const max = sc.steps.length * 2;
  const pct = Math.round((score * 100) / max);
  const isHigh = pct >= 80;
  const isMid = pct >= 50;

  const badgeCls = isHigh
    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
    : isMid
      ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
      : "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20";

  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5 animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/60 dark:border-slate-800 pb-3">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
            <Award className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Bilan d&apos;Intervention Clinique</span>
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
            {sc.title}
          </h3>
        </div>

        <span
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold border ${badgeCls}`}
        >
          Score de posture : {pct}% ({score} / {max} pts)
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 space-y-3">
        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <CheckCircle2 className="size-4 text-emerald-500" />
          <span>
            Principes de l&apos;activité clinique mobilisés dans cette situation :
          </span>
        </div>

        <ul className="space-y-2 list-none pl-0 m-0">
          {sc.principes.map((p, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300"
            >
              <span className="size-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
              <span className="flex-1">{p}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onExportToJournal}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold border transition-all cursor-pointer active:scale-95 ${
            exportedJournal
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
              : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
          }`}
        >
          <BookOpen className="size-3.5" />
          <span>
            {exportedJournal
              ? "✓ Ajouté au Carnet Terrain"
              : "Archiver au Carnet Terrain"}
          </span>
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
        >
          <RotateCcw className="size-3.5" />
          <span>Recommencer ce scénario</span>
        </button>
      </div>
    </div>
  );
}

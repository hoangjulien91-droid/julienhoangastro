"use client";

import React from "react";
import { HelpCircle, AlertTriangle, Copy, Check } from "lucide-react";
import type { CourantTheorique } from "@/lib/pst/data/courants-theoriques-data";

interface CourantTheoriqueCardProps {
  c: CourantTheorique;
  isCopied: boolean;
  onCopy: (c: CourantTheorique) => void;
}

export function CourantTheoriqueCard({
  c,
  isCopied,
  onCopy,
}: CourantTheoriqueCardProps) {
  return (
    <div
      className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/60 backdrop-blur-md hover:border-amber-500/40 hover:shadow-xs transition-all space-y-4 shadow-2xs"
      style={{ borderLeftWidth: "4px", borderLeftColor: c.accent }}
    >
      {/* Top row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 shadow-2xs">
            {c.uePrincipale}
          </span>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
            {c.nom}
          </h4>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            {c.auteurs.map((author) => (
              <span
                key={author}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-muted/70 text-foreground border border-border/80"
              >
                {author}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onCopy(c)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-850 hover:bg-muted text-slate-600 dark:text-slate-300 hover:text-foreground transition-all cursor-pointer shadow-2xs"
            title="Copier la fiche de controverse doctrinale"
          >
            {isCopied ? (
              <>
                <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-300">
                  Copié
                </span>
              </>
            ) : (
              <>
                <Copy className="size-3 text-muted-foreground" />
                <span>Copier</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Matrix grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
        {/* 1. Statut du Réel */}
        <div className="p-3.5 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm space-y-1 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400 block">
            Statut du Réel
          </span>
          <p className="text-slate-600 dark:text-slate-300 m-0 leading-relaxed text-[11px]">
            {c.statutReel}
          </p>
        </div>

        {/* 2. Collectif & Genre */}
        <div className="p-3.5 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm space-y-1 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400 block">
            Place du Collectif &amp; Genre
          </span>
          <p className="text-slate-600 dark:text-slate-300 m-0 leading-relaxed text-[11px]">
            {c.collectifGenre}
          </p>
        </div>

        {/* 3. Méthode d'intervention */}
        <div className="p-3.5 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm space-y-1 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400 block">
            Méthode d'Intervention
          </span>
          <p className="text-slate-600 dark:text-slate-300 m-0 leading-relaxed text-[11px]">
            {c.methodeIntervention}
          </p>
        </div>
      </div>

      {/* Bottom highlight: Question type & Piège */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
        <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-900/50 backdrop-blur-sm flex items-start gap-2.5 shadow-2xs">
          <HelpCircle className="size-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-indigo-900 dark:text-indigo-300 text-[11px] block">
              Question Type d'Examen :
            </span>
            <p className="text-slate-800 dark:text-slate-200 text-[11px] italic m-0 mt-0.5">
              {c.questionExamen}
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 backdrop-blur-sm flex items-start gap-2.5 text-amber-900 dark:text-amber-200 shadow-2xs">
          <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[11px] block">
              Piège Doctrinal Fréquent :
            </span>
            <p className="text-[11px] m-0 mt-0.5 leading-relaxed">
              {c.piegeEviter}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

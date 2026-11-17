"use client";

import React from "react";
import { Sparkles, Copy, Check, Eye, EyeOff, Volume2, Square } from "lucide-react";
import type { CitationOrS1 } from "@/lib/pst/data/citations-or-s1";

interface FlashCitationCardProps {
  c: CitationOrS1;
  activeMode: "cards" | "cloze";
  isRevealed: boolean;
  speakingId: string | null;
  copiedId: string | null;
  onSpeak: (c: CitationOrS1) => void;
  onCopy: (c: CitationOrS1) => void;
  onToggleCloze: (id: string) => void;
}

export function FlashCitationCard({
  c,
  activeMode,
  isRevealed,
  speakingId,
  copiedId,
  onSpeak,
  onCopy,
  onToggleCloze,
}: FlashCitationCardProps) {
  let displayedCitation = c.citation;
  if (activeMode === "cloze" && !isRevealed) {
    c.motsClesMasques.forEach((m) => {
      displayedCitation = displayedCitation.replace(
        new RegExp(m, "gi"),
        "[ ... ? ... ]",
      );
    });
  }

  const borderGradient =
    c.moduleKey === "pst106"
      ? "border-emerald-500/30 bg-gradient-to-br from-emerald-50/70 to-white dark:from-emerald-950/20 dark:to-slate-900/90"
      : c.moduleKey === "pst108"
      ? "border-amber-500/30 bg-gradient-to-br from-amber-50/70 to-white dark:from-amber-950/20 dark:to-slate-900/90"
      : c.moduleKey === "pst120"
      ? "border-rose-500/30 bg-gradient-to-br from-rose-50/70 to-white dark:from-rose-950/20 dark:to-slate-900/90"
      : c.moduleKey === "pst124"
      ? "border-cyan-500/30 bg-gradient-to-br from-cyan-50/70 to-white dark:from-cyan-950/20 dark:to-slate-900/90"
      : "border-indigo-500/30 bg-gradient-to-br from-indigo-50/70 to-white dark:from-indigo-950/20 dark:to-slate-900/90";

  const badgeColor =
    c.moduleKey === "pst106"
      ? "bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300"
      : c.moduleKey === "pst108"
      ? "bg-amber-500/15 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300"
      : c.moduleKey === "pst120"
      ? "bg-rose-500/15 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300"
      : c.moduleKey === "pst124"
      ? "bg-cyan-500/15 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300"
      : "bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300";

  return (
    <div
      className={`rounded-2xl border p-5 transition-all flex flex-col justify-between space-y-4 shadow-md ${borderGradient}`}
    >
      <div className="space-y-3">
        {/* Card Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${badgeColor}`}
            >
              {c.moduleKey.toUpperCase()}
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {c.auteur} ({c.annee})
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onSpeak(c)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                speakingId === c.id
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
              title={
                speakingId === c.id
                  ? "Arrêter la lecture"
                  : "Écouter la citation et son usage d'examen (Audio)"
              }
              aria-label={
                speakingId === c.id
                  ? "Arrêter la lecture"
                  : "Écouter la citation"
              }
            >
              {speakingId === c.id ? (
                <Square className="h-3.5 w-3.5 fill-current" />
              ) : (
                <Volume2 className="h-3.5 w-3.5" />
              )}
            </button>
            <button
              type="button"
              onClick={() => onCopy(c)}
              className="p-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Copier la formulation pour l'examen"
            >
              {copiedId === c.id ? (
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>

        <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 italic">
          Source : {c.source} · Thème :{" "}
          <strong className="text-slate-700 dark:text-slate-300">{c.theme}</strong>
        </div>

        {/* Verbatim Quote */}
        <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 relative">
          <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 italic leading-relaxed">
            « {displayedCitation} »
          </p>

          {activeMode === "cloze" && (
            <div className="mt-2 pt-2 border-t border-slate-200/80 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => onToggleCloze(c.id)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-200 cursor-pointer"
              >
                {isRevealed ? (
                  <>
                    <EyeOff className="h-3.5 w-3.5" />
                    <span>Masquer les mots clés</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-3.5 w-3.5" />
                    <span>Révéler les termes exacts</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* How to insert in exam */}
        <div className="space-y-1 text-xs">
          <div className="text-slate-800 dark:text-slate-300 font-semibold flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <span>Quand la placer sur la copie :</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-snug">
            {c.interetExamen}
          </p>
        </div>

        {/* Traps */}
        <div className="text-xs text-rose-800 dark:text-rose-300/90 bg-rose-50/80 dark:bg-rose-950/20 p-2.5 rounded-lg border border-rose-200/80 dark:border-rose-900/30">
          <strong className="block text-rose-900 dark:text-rose-200 text-[10px] uppercase">
            Piège éliminatoire à éviter :
          </strong>
          {c.piegeContresens}
        </div>
      </div>

      {/* Ready to write formula */}
      <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
          Exemple de formulation prête à copier :
        </span>
        <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50/90 dark:bg-slate-950/40 p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800/60">
          {c.formulationCopie}
        </p>
      </div>
    </div>
  );
}

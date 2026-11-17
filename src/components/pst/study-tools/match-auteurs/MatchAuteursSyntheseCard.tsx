"use client";

import { Sparkles, Eye, EyeOff, Check, Copy } from "lucide-react";
import type { DuelAuteurs } from "@/lib/pst/data/match-auteurs";

interface MatchAuteursSyntheseCardProps {
  currentMatch: DuelAuteurs;
  hideSynthese: boolean;
  onToggleHideSynthese: () => void;
  copied: boolean;
  onCopySynthese: () => void;
}

export function MatchAuteursSyntheseCard({
  currentMatch,
  hideSynthese,
  onToggleHideSynthese,
  copied,
  onCopySynthese,
}: MatchAuteursSyntheseCardProps) {
  return (
    <>
      {/* CRITIQUE CROISÉE */}
      <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-500/20 text-xs text-purple-900 dark:text-purple-200 leading-relaxed">
        <span className="font-bold block mb-1">
          ⚡️ Le point de rupture / Ce qui les sépare :
        </span>
        {currentMatch.critiqueCroisee}
      </div>

      {/* LA SYNTHÈSE DIALECTIQUE D'EXAMEN (18+/20) */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border-2 border-emerald-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-emerald-600" />
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 m-0">
              La Synthèse Dialectique d&apos;Examen (Partie II d&apos;excellence)
            </h4>
          </div>
          <button
            type="button"
            onClick={onToggleHideSynthese}
            className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
          >
            {hideSynthese ? (
              <Eye className="size-3.5" />
            ) : (
              <EyeOff className="size-3.5" />
            )}
            <span>
              {hideSynthese ? "Révéler" : "Masquer pour m'auto-tester"}
            </span>
          </button>
        </div>

        {!hideSynthese ? (
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-serif m-0">
            {currentMatch.syntheseDialectiqueExamen}
          </p>
        ) : (
          <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-dashed border-emerald-500/40 text-center text-xs text-emerald-700 dark:text-emerald-400">
            Essayez de formuler à voix haute comment concilier ces deux auteurs,
            puis cliquez sur « Révéler ».
          </div>
        )}

        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-emerald-500/20">
          <div className="text-[11px] text-slate-500">
            Mots-clés valorisés :{" "}
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              {currentMatch.motsClesCopies.join(" · ")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCopySynthese}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-1.5 cursor-pointer shadow-xs min-h-[36px]"
            >
              {copied ? (
                <Check className="size-3.5" />
              ) : (
                <Copy className="size-3.5" />
              )}
              <span>
                {copied ? (
                  "Copié !"
                ) : (
                  <>
                    <span className="hidden sm:inline">Copier la synthèse</span>
                    <span className="sm:hidden">Copier</span>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

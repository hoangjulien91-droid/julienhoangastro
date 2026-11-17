"use client";

import { Eye, EyeOff, Copy, Check } from "lucide-react";
import type { DefinitionCanonique } from "@/lib/pst/data/definitions-canoniques";

interface CoffreDefinitionCardProps {
  definition: DefinitionCanonique;
  isRevealed: boolean;
  isCopied: boolean;
  onToggleReveal: (id: string) => void;
  onCopyDef: (d: DefinitionCanonique) => void;
}

export function CoffreDefinitionCard({
  definition: d,
  isRevealed,
  isCopied,
  onToggleReveal,
  onCopyDef,
}: CoffreDefinitionCardProps) {
  return (
    <div className="p-5 rounded-3xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3 transition-all hover:border-indigo-400">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-700/60">
        <div className="flex items-center gap-2">
          <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 m-0">
            {d.terme}
          </h3>
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
            ({d.auteur})
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {d.modules.map((m) => (
            <span
              key={m}
              className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 uppercase"
            >
              {m}
            </span>
          ))}
          <button
            type="button"
            onClick={() => onToggleReveal(d.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
            title={
              isRevealed ? "Masquer la définition" : "Révéler la définition"
            }
          >
            {isRevealed ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* MOTS-CLÉS OBLIGATOIRES POUR LA NOTE MAXIMALE */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mr-1">
          Mots indispensables :
        </span>
        {d.motsClesObligatoires.map((kw, i) => (
          <span
            key={i}
            className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20"
          >
            {kw}
          </span>
        ))}
      </div>

      {/* CORPS DE LA DÉFINITION (AVEC MODE MASQUÉ / AUTO-TEST) */}
      {isRevealed ? (
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-serif animate-fadeIn">
          {d.definitionOfficielle}
        </div>
      ) : (
        <div
          onClick={() => onToggleReveal(d.id)}
          className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 text-center text-xs text-slate-500 cursor-pointer hover:bg-slate-200/60 dark:hover:bg-slate-750 transition-all"
        >
          🙈 Définition masquée pour auto-test. Récitez les mots-clés dans votre
          tête puis <b>cliquez ici pour révéler</b>.
        </div>
      )}

      {/* EXEMPLE & PIÈGE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
        <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400">
          <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">
            Exemple de travail réel :
          </span>
          {d.exemplePratique}
        </div>

        {d.piegeConfondreAvec && (
          <div className="p-2.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40">
            <span className="font-bold block mb-0.5">⚠️ Attention :</span>
            {d.piegeConfondreAvec}
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
        <button
          type="button"
          onClick={() => onCopyDef(d)}
          className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
        >
          {isCopied ? (
            <Check className="size-3.5 text-emerald-600" />
          ) : (
            <Copy className="size-3.5" />
          )}
          <span>{isCopied ? "Copié !" : "Copier"}</span>
        </button>
      </div>
    </div>
  );
}

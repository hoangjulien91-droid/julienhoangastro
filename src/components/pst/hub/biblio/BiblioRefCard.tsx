"use client";

import React from "react";
import { Check, Copy, Quote, Sparkles, Tag, Trash2 } from "lucide-react";
import type { BiblioReference } from "@/lib/pst/data/biblio-vault-data";

export interface BiblioRefCardProps {
  refItem: BiblioReference;
  onCopy: (text: string, badgeId: string) => void;
  copiedId: string | null;
  onDeleteCustom?: (id: string) => void;
}

export function BiblioRefCard({
  refItem,
  onCopy,
  copiedId,
  onDeleteCustom,
}: BiblioRefCardProps) {
  const isFullCopied = copiedId === `${refItem.id}-full`;
  const isShortCopied = copiedId === `${refItem.id}-short`;

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-4 shadow-2xs flex flex-col justify-between gap-3 hover:border-indigo-500/40 transition-all">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              {refItem.stream}
            </span>
            {refItem.ues.map((u) => (
              <span
                key={u}
                className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              >
                PST{u}
              </span>
            ))}
          </div>

          {refItem.isCustom && onDeleteCustom && (
            <button
              type="button"
              onClick={() => onDeleteCustom(refItem.id)}
              className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
              title="Supprimer cette référence personnalisée"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* APA 7 Formatted Box */}
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/90 font-serif text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed mb-2.5">
          {refItem.apa7Full.split("*").map((chunk, idx) =>
            idx % 2 === 1 ? (
              <em key={idx} className="italic font-semibold">
                {chunk}
              </em>
            ) : (
              <span key={idx}>{chunk}</span>
            ),
          )}
        </div>

        <div className="space-y-1.5 text-xs">
          <p className="text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
            <Tag className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <span>
              <strong className="font-semibold text-slate-900 dark:text-white">
                Concepts clés :
              </strong>{" "}
              {refItem.keyConcept}
            </span>
          </p>
          <p className="text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
            <span>
              <strong className="font-semibold text-slate-800 dark:text-slate-200">
                Usage examen :
              </strong>{" "}
              {refItem.examUsageTip}
            </span>
          </p>
        </div>
      </div>

      {/* Copy Actions */}
      <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onCopy(refItem.inTextCitation, `${refItem.id}-short`)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        >
          {isShortCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              Copié !
            </>
          ) : (
            <>
              <Quote className="w-3 h-3 text-slate-400" />
              {refItem.inTextCitation}
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => onCopy(refItem.apa7Full, `${refItem.id}-full`)}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 transition-colors cursor-pointer"
        >
          {isFullCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              Référence APA 7 copiée
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copier Bibliographie APA 7
            </>
          )}
        </button>
      </div>
    </div>
  );
}

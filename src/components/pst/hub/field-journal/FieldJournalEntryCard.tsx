"use client";

import React from "react";
import { Clock, Send, Check, Trash2 } from "lucide-react";
import {
  type FieldJournalEntry,
  CATEGORY_META,
} from "@/lib/pst/data/field-journal-data";

interface FieldJournalEntryCardProps {
  entry: FieldJournalEntry;
  isSent: boolean;
  onInjectIntoMemoire: (entry: FieldJournalEntry) => void;
  onDelete: (id: string) => void;
}

export const FieldJournalEntryCard: React.FC<FieldJournalEntryCardProps> = ({
  entry,
  isSent,
  onInjectIntoMemoire,
  onDelete,
}) => {
  const cMeta = CATEGORY_META[entry.category];

  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/80 flex flex-col gap-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300 bg-slate-200/70 dark:bg-slate-800 px-2 py-0.5 rounded">
            <Clock className="w-3 h-3 text-emerald-500" />
            {entry.timestamp}
          </span>
          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${cMeta.badgeClass}`}
          >
            {cMeta.label}
          </span>
          <span className="text-[11px] font-mono font-semibold text-slate-500">
            {entry.ue} · {entry.operatorCode}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onInjectIntoMemoire(entry)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 transition-colors"
            title="Envoyer directement cette trace dans la Partie IV du Studio Mémoire RNCP 7"
          >
            {isSent ? (
              <>
                <Check className="w-3 h-3 text-emerald-500" />
                <span>Injecté !</span>
              </>
            ) : (
              <>
                <Send className="w-3 h-3" />
                <span className="hidden sm:inline">
                  Injecter au Studio Mémoire
                </span>
                <span className="sm:hidden">Mémoire</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onDelete(entry.id)}
            className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
            title="Supprimer cette trace"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed m-0">
        {entry.content}
      </p>
    </div>
  );
};

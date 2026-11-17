"use client";

import { Smartphone, X, Check, Copy, Download, Upload } from "lucide-react";

interface SyncPopoverProps {
  syncText: string;
  onSyncTextChange: (val: string) => void;
  syncCopied: boolean;
  onCopySnapshot: () => void;
  onDownloadSnapshot: () => void;
  onRestoreSnapshot: () => void;
  onClose: () => void;
}

export function SyncPopover({
  syncText,
  onSyncTextChange,
  syncCopied,
  onCopySnapshot,
  onDownloadSnapshot,
  onRestoreSnapshot,
  onClose,
}: SyncPopoverProps) {
  return (
    <div
      className="mb-3 w-80 max-w-[calc(100vw-24px)] p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xl animate-in fade-in zoom-in-95 duration-150 space-y-3"
      role="dialog"
      aria-label="Synchronisation Mac et iPhone"
    >
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-slate-100">
          <Smartphone className="size-4 text-emerald-500" />
          <span>Sync Mac ↔ iPhone (1-Clic)</span>
        </div>
        <button
          className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
          aria-label="Fermer"
          onClick={onClose}
        >
          <X className="size-3.5" />
        </button>
      </div>

      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug m-0">
        Transférez instantanément vos <strong>Flashcards SM-2</strong>, <strong>Activités Distantes (AD)</strong>, <strong>brouillons d&apos;examen blanc</strong> et <strong>notes Feynman</strong> via le presse-papier universel Apple ou un fichier JSON.
      </p>

      <div className="grid grid-cols-2 gap-1.5">
        <button
          type="button"
          onClick={onCopySnapshot}
          className="py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
        >
          {syncCopied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          <span>{syncCopied ? "Copié !" : "1. Copier tout"}</span>
        </button>

        <button
          type="button"
          onClick={onDownloadSnapshot}
          className="py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
        >
          <Download className="size-3.5" />
          <span>Export .JSON</span>
        </button>
      </div>

      <div className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-slate-800">
        <textarea
          value={syncText}
          onChange={(e) => onSyncTextChange(e.target.value)}
          rows={2}
          placeholder="2. Sur l'autre appareil, collez ici le code copié..."
          className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500 resize-none font-mono"
        />
        <button
          type="button"
          onClick={onRestoreSnapshot}
          className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
        >
          <Upload className="size-3.5" />
          <span>Restaurer la progression sur cet appareil</span>
        </button>
      </div>
    </div>
  );
}

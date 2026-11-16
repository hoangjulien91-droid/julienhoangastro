"use client";

import React from "react";
import { Smartphone, Copy, Check, Download, Upload } from "lucide-react";
import { exportGlobalPstBackup } from "@/lib/pst/global-sync";

export interface HubSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  syncCopied: boolean;
  onCopySync: () => void;
  pasteCode: string;
  onChangePasteCode: (code: string) => void;
  onPasteSync: () => void;
  onTriggerFileInput: () => void;
}

export function HubSyncModal({
  isOpen,
  onClose,
  syncCopied,
  onCopySync,
  pasteCode,
  onChangePasteCode,
  onPasteSync,
  onTriggerFileInput,
}: HubSyncModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Synchronisation Mac et Mobile PST"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
    >
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Smartphone className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
                Synchronisation Mac ↔ Mobile
              </h3>
              <span className="text-[11px] text-slate-500">
                Transfert instantané de session
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la fenêtre de synchronisation"
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
              Option 1 : Copier le code depuis cet appareil
            </span>
            <button
              type="button"
              onClick={onCopySync}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95"
            >
              {syncCopied ? (
                <Check className="size-3.5 text-emerald-500" />
              ) : (
                <Copy className="size-3.5" />
              )}
              <span>
                {syncCopied ? "✓ Code copié !" : "Copier le code de synchro"}
              </span>
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
              Option 2 : Coller le code d&apos;un autre appareil
            </span>
            <div className="space-y-1.5">
              <input
                type="text"
                aria-label="Code de synchronisation PST"
                value={pasteCode}
                onChange={(e) => onChangePasteCode(e.target.value)}
                placeholder="Coller le code PST_SYNC_V1:... ici"
                className="w-full p-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none"
              />
              {pasteCode.trim() && (
                <button
                  type="button"
                  onClick={onPasteSync}
                  className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer transition-colors"
                >
                  Appliquer le code et synchroniser
                </button>
              )}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
              Option 3 : Fichier JSON complet
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={exportGlobalPstBackup}
                className="flex-1 py-1.5 px-3 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="size-3.5" />
                <span>Télécharger</span>
              </button>
              <button
                type="button"
                onClick={onTriggerFileInput}
                className="flex-1 py-1.5 px-3 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Upload className="size-3.5" />
                <span>Charger</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

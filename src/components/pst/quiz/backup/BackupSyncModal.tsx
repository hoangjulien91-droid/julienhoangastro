"use client";

import React, { useState } from "react";
import { Smartphone, Check, Copy, Download, Upload } from "lucide-react";
import {
  exportGlobalPstBackup,
  copyPstSyncCode,
  restorePstFromSyncCode,
} from "@/lib/pst/global-sync";

interface BackupSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onTriggerGlobalFileInput: () => void;
}

export function BackupSyncModal({
  isOpen,
  onClose,
  onSuccess,
  onTriggerGlobalFileInput,
}: BackupSyncModalProps) {
  const [pasteCode, setPasteCode] = useState("");
  const [syncCopied, setSyncCopied] = useState(false);

  if (!isOpen) return null;

  async function handleCopySync() {
    const ok = await copyPstSyncCode();
    if (ok) {
      setSyncCopied(true);
      setTimeout(() => setSyncCopied(false), 2000);
    }
  }

  function handlePasteSync() {
    if (!pasteCode.trim()) return;
    const ok = restorePstFromSyncCode(pasteCode);
    if (ok) {
      setPasteCode("");
      onClose();
      onSuccess();
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Synchronisation Mac et iPhone"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <Smartphone className="size-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
                Synchronisation Mac ↔ iPhone
              </h4>
              <span className="text-[10px] font-mono text-slate-500">
                5 UE + Planning + Carnet de terrain
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
          <p className="m-0 leading-relaxed">
            Transférez l&apos;intégralité de vos révisions d&apos;un appareil à
            l&apos;autre sans rien perdre.
          </p>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
              Option A : Copier / Coller en 1 clic
            </span>
            <button
              type="button"
              onClick={handleCopySync}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95"
            >
              {syncCopied ? (
                <Check className="size-3.5 text-emerald-500" />
              ) : (
                <Copy className="size-3.5" />
              )}
              <span>
                {syncCopied
                  ? "✓ Code copié !"
                  : "Copier le code de synchro"}
              </span>
            </button>
            <div className="space-y-1 pt-1">
              <input
                type="text"
                aria-label="Code de synchronisation à restaurer"
                value={pasteCode}
                onChange={(e) => setPasteCode(e.target.value)}
                placeholder="Coller le code ici sur l'autre appareil..."
                className="w-full p-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none"
              />
              {pasteCode.trim() && (
                <button
                  type="button"
                  onClick={handlePasteSync}
                  className="w-full py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer transition-colors"
                >
                  Appliquer le code et synchroniser
                </button>
              )}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
              Option B : Fichier JSON complet
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={exportGlobalPstBackup}
                className="flex-1 py-1.5 px-3 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="size-3.5" />
                <span>Télécharger JSON</span>
              </button>
              <button
                type="button"
                onClick={onTriggerGlobalFileInput}
                className="flex-1 py-1.5 px-3 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Upload className="size-3.5" />
                <span>Charger JSON</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { ShieldAlert, Download } from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import { daysSinceLastBackup, exportStoreBackup } from "./backupHelpers";

/**
 * Bandeau affiché sur les tableaux de bord quand la dernière sauvegarde
 * remonte à plus de 14 jours (ou n'a jamais eu lieu alors qu'il existe une
 * progression) — toute la donnée vit en localStorage.
 */
export function BackupReminder({ store }: { store: PstStore }) {
  const days = daysSinceLastBackup();
  const hasProgress = Object.keys(store.getMarks()).length > 0;
  const stale = days === null ? hasProgress : days > 14;
  if (!stale) return null;

  return (
    <div className="p-4 sm:p-5 rounded-2xl border border-rose-500/30 bg-rose-500/5 backdrop-blur-md mb-4 shadow-xs space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 inline-flex items-center gap-1.5 shadow-2xs">
          <ShieldAlert className="size-3 text-rose-600 dark:text-rose-400" />
          <span>Sécurité des données · Sauvegarde conseillée</span>
        </span>
      </div>
      <h3 className="text-sm font-serif font-bold text-rose-900 dark:text-rose-200 m-0">
        Sauvegarde recommandée
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed m-0">
        {days === null
          ? "Votre progression n'a jamais été sauvegardée."
          : `Dernière sauvegarde il y a ${days} jours.`}{" "}
        Toutes vos révisions vivent dans ce navigateur : exportez un fichier de
        secours local.
      </p>
      <div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer"
          onClick={() => exportStoreBackup(store)}
        >
          <Download className="size-3.5" />
          <span>Sauvegarder maintenant</span>
        </button>
      </div>
    </div>
  );
}

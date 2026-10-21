"use client";

import { useRef } from "react";
import { toast } from "sonner";
import { ShieldAlert, HardDrive, Download, Upload, RotateCcw } from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const LAST_BACKUP_KEY = "pst_last_backup";

export function exportStoreBackup(store: PstStore) {
  const data = store.exportData();
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${store.key}_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  try {
    window.localStorage.setItem(LAST_BACKUP_KEY, new Date().toISOString());
  } catch {
    // quota/localStorage indisponible : le rappel restera affiché
  }
}

export function daysSinceLastBackup(): number | null {
  try {
    const v = window.localStorage.getItem(LAST_BACKUP_KEY);
    if (!v) return null;
    return Math.floor((Date.now() - new Date(v).getTime()) / 86400000);
  } catch {
    return null;
  }
}

/**
 * Bandeau affiché sur les tableaux de bord quand la dernière sauvegarde
 * remonte à plus de 14 jours (ou n'a jamais eu lieu alors qu'il existe une
 * progression) — toute la donnée vit en localStorage, un nettoyage du
 * navigateur efface des mois de répétition espacée.
 */
export function BackupReminder({ store }: { store: PstStore }) {
  const days = daysSinceLastBackup();
  const hasProgress = Object.keys(store.getMarks()).length > 0;
  const stale = days === null ? hasProgress : days > 14;
  if (!stale) return null;

  return (
    <div
      className="qcard"
      style={{ borderLeft: "4px solid var(--bad)", marginBottom: 18 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 inline-flex items-center gap-1.5">
          <ShieldAlert className="size-3 text-rose-600" />
          <span>Sécurité des données · Sauvegarde conseillée</span>
        </span>
      </div>
      <h3 style={{ marginTop: 0, fontSize: 15, color: "var(--bad)" }}>
        Sauvegarde recommandée
      </h3>
      <p style={{ fontSize: 13, margin: "0 0 10px" }}>
        {days === null
          ? "Ta progression n'a jamais été sauvegardée."
          : `Dernière sauvegarde il y a ${days} jours.`}{" "}
        Tout vit dans ce navigateur : exporte un fichier de secours.
      </p>
      <button
        className="btn small solid"
        onClick={() => exportStoreBackup(store)}
      >
        Sauvegarder maintenant
      </button>
    </div>
  );
}

interface BackupRestorePanelProps {
  store: PstStore;
  onUpdate: () => void;
}

export function BackupRestorePanel({
  store,
  onUpdate,
}: BackupRestorePanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleExport() {
    exportStoreBackup(store);
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (store.importData(content)) {
        toast.success("Progression restaurée avec succès !");
        onUpdate();
      } else {
        toast.error("Erreur lors de la lecture du fichier de sauvegarde.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleReset() {
    store.resetAll();
    onUpdate();
    toast.success("Progression réinitialisée.");
  }

  return (
    <div
      className="qcard"
      style={{ borderLeft: "4px solid var(--muted)", marginTop: 18 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20 inline-flex items-center gap-1.5">
          <HardDrive className="size-3 text-slate-600 dark:text-slate-400" />
          <span>Stockage local · Sauvegarde & Restauration</span>
        </span>
      </div>
      <h3 style={{ marginTop: 0, fontSize: 15, color: "var(--muted)" }}>
        Progression &amp; Sauvegarde
      </h3>
      <p style={{ fontSize: 13, margin: "0 0 10px", color: "var(--muted)" }}>
        Sauvegarde tes boîtes Leitner, tes scores de QCM et ton historique de
        révision localement.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <button className="btn small inline-flex items-center gap-1.5" onClick={handleExport}>
          <Download className="size-3.5" />
          <span>Sauvegarder</span>
        </button>
        <button
          className="btn small inline-flex items-center gap-1.5"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="size-3.5" />
          <span>Restaurer</span>
        </button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="btn small inline-flex items-center gap-1.5"
              style={{
                color: "var(--bad)",
                borderColor: "var(--bad)",
                background: "transparent",
              }}
            >
              <RotateCcw className="size-3.5" />
              <span>Réinitialiser</span>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Réinitialiser toute la progression ?
              </AlertDialogTitle>
              <AlertDialogDescription>
                QCM, boîtes Leitner, streak : cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleReset}>
                Réinitialiser
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: "none" }}
          onChange={handleImportFile}
        />
      </div>
    </div>
  );
}

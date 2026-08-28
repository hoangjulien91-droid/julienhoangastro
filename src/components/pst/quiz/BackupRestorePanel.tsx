"use client";

import { useRef } from "react";
import { toast } from "sonner";
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
      <h3 style={{ marginTop: 0, fontSize: 15, color: "var(--bad)" }}>
        ⚠️ Sauvegarde recommandée
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
      <h3 style={{ marginTop: 0, fontSize: 15, color: "var(--muted)" }}>
        Progression &amp; Sauvegarde
      </h3>
      <p style={{ fontSize: 13, margin: "0 0 10px", color: "var(--muted)" }}>
        Sauvegarde tes boîtes Leitner, tes scores de QCM et ton historique de
        révision localement.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <button className="btn small" onClick={handleExport}>
          Sauvegarder
        </button>
        <button
          className="btn small"
          onClick={() => fileInputRef.current?.click()}
        >
          Restaurer
        </button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="btn small"
              style={{
                color: "var(--bad)",
                borderColor: "var(--bad)",
                background: "transparent",
              }}
            >
              Réinitialiser
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

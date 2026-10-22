"use client";

import { useRef } from "react";
import { toast } from "sonner";
import {
  ShieldAlert,
  HardDrive,
  Download,
  Upload,
  RotateCcw,
} from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
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
  triggerHaptic("success");
  playSuccessSound();
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
        triggerHaptic("success");
        playSuccessSound();
        toast.success("Progression restaurée avec succès !");
        onUpdate();
      } else {
        triggerHaptic("warning");
        toast.error("Erreur lors de la lecture du fichier de sauvegarde.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleReset() {
    triggerHaptic("warning");
    playClickSound();
    store.resetAll();
    onUpdate();
    toast.success("Progression réinitialisée.");
  }

  return (
    <div className="p-4 sm:p-5 rounded-2xl border border-border bg-card/80 backdrop-blur-md mt-4 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-500/15 text-slate-700 dark:text-slate-300 border border-slate-500/25 inline-flex items-center gap-1.5 shadow-2xs">
          <HardDrive className="size-3 text-slate-600 dark:text-slate-400" />
          <span>Stockage local · Sauvegarde &amp; Restauration</span>
        </span>
      </div>
      <div>
        <h3 className="text-sm font-serif font-bold text-foreground m-0">
          Progression &amp; Sauvegarde locale
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5 m-0">
          Sauvegardez vos boîtes Leitner, vos scores de QCM et votre historique
          de révision localement.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-primary text-primary-foreground shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer"
          onClick={handleExport}
        >
          <Download className="size-3.5" />
          <span>Sauvegarder</span>
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border transition-all active:scale-95 cursor-pointer shadow-2xs"
          onClick={() => {
            triggerHaptic("light");
            playClickSound();
            fileInputRef.current?.click();
          }}
        >
          <Upload className="size-3.5" />
          <span>Restaurer</span>
        </button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border border-rose-500/30 transition-all active:scale-95 cursor-pointer shadow-2xs"
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
                QCM, boîtes Leitner, streak : cette action efface les données
                locales de ce module.
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
          className="hidden"
          onChange={handleImportFile}
        />
      </div>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  ShieldAlert,
  HardDrive,
  Download,
  Upload,
  RotateCcw,
  Smartphone,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  exportGlobalPstBackup,
  restoreGlobalPstData,
  copyPstSyncCode,
  restorePstFromSyncCode,
} from "@/lib/pst/global-sync";
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
  const globalFileInputRef = useRef<HTMLInputElement>(null);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [pasteCode, setPasteCode] = useState("");
  const [syncCopied, setSyncCopied] = useState(false);

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

  function handleImportGlobalFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (restoreGlobalPstData(content)) {
        onUpdate();
      } else {
        toast.error("Format de sauvegarde globale non reconnu.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

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
      setShowSyncModal(false);
      onUpdate();
    }
  }

  function handleReset() {
    triggerHaptic("warning");
    playClickSound();
    store.resetAll();
    onUpdate();
    toast.success("Progression réinitialisée.");
  }

  return (
    <div className="p-4 sm:p-5 rounded-2xl border border-border bg-card/80 backdrop-blur-md mt-4 shadow-xs space-y-3.5">
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
          Sauvegardez vos boîtes Leitner, scores de QCM et notes pour ce module,
          ou exportez l&apos;intégralité de vos 5 UE et du planning vers votre
          téléphone.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-primary text-primary-foreground shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer"
          onClick={handleExport}
        >
          <Download className="size-3.5" />
          <span>Sauvegarder ce module</span>
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
          <span>Restaurer ce module</span>
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 dark:text-amber-200 border border-amber-500/30 transition-all active:scale-95 cursor-pointer"
          onClick={() => setShowSyncModal(true)}
        >
          <Smartphone className="size-3.5 text-amber-600 dark:text-amber-400" />
          <span>Synchro Mac ↔ Mobile (5 UE)</span>
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
        <input
          ref={globalFileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImportGlobalFile}
        />
      </div>

      {/* Modal / Dialog Synchro Mac ↔ Mobile */}
      {showSyncModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
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
                onClick={() => setShowSyncModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <p className="m-0 leading-relaxed">
                Transférez l&apos;intégralité de vos révisions d&apos;un
                appareil à l&apos;autre sans rien perdre.
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
                    onClick={() => globalFileInputRef.current?.click()}
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
      )}
    </div>
  );
}

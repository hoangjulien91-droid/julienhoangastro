"use client";

import React, { useRef, useState } from "react";
import { Download, Upload, X, Database } from "lucide-react";
import { toast } from "sonner";
import {
  KEY_DESCRIPTIONS,
  TRACKED_KEYS,
  JSON_KEYS,
  type StorageItemSummary,
} from "@/lib/pst/data/disaster-recovery-data";
import { StorageQuotaCard } from "./disaster-recovery/StorageQuotaCard";
import { StorageKeyTable } from "./disaster-recovery/StorageKeyTable";

interface DisasterRecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestored?: () => void;
}

export function DisasterRecoveryModal({
  isOpen,
  onClose,
  onRestored,
}: DisasterRecoveryModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [scrubReport, setScrubReport] = useState<string | null>(null);
  const [, setRefreshTick] = useState(0);

  if (!isOpen) return null;

  const storedSummary: StorageItemSummary[] = TRACKED_KEYS.map((k) => {
    const val =
      typeof window !== "undefined" ? window.localStorage.getItem(k) : null;
    let validJson = true;
    if (val && JSON_KEYS.has(k)) {
      try {
        JSON.parse(val);
      } catch {
        validJson = false;
      }
    }
    return {
      key: k,
      label: KEY_DESCRIPTIONS[k] || k,
      exists: !!val,
      bytes: val ? val.length : 0,
      validJson,
    };
  });

  const totalBytes = storedSummary.reduce((acc, s) => acc + s.bytes, 0);
  const quotaBytes = 5 * 1024 * 1024; // 5 MB standard browser localStorage quota
  const usagePct = Math.min(
    100,
    Math.max(0.5, (totalBytes / quotaBytes) * 100),
  );
  const quotaTone =
    usagePct >= 90
      ? "bg-rose-500"
      : usagePct >= 75
        ? "bg-amber-500"
        : "bg-emerald-500";

  function handleDeepScrub() {
    let checked = 0;
    let repaired = 0;
    let bytesSaved = 0;

    for (const k of TRACKED_KEYS) {
      const raw = window.localStorage.getItem(k);
      if (!raw) continue;
      checked++;
      if (JSON_KEYS.has(k)) {
        try {
          const parsed = JSON.parse(raw);
          if (
            parsed &&
            typeof parsed === "object" &&
            !Array.isArray(parsed) &&
            Array.isArray(parsed.sessions)
          ) {
            parsed.sessions = Array.from(new Set(parsed.sessions));
          }
          const compacted = JSON.stringify(parsed);
          if (compacted.length < raw.length) {
            bytesSaved += raw.length - compacted.length;
          }
          window.localStorage.setItem(k, compacted);
        } catch {
          window.localStorage.removeItem(k);
          repaired++;
        }
      }
    }

    window.dispatchEvent(new CustomEvent("pst:storage-updated"));
    setRefreshTick((t) => t + 1);
    const msg = `Audit Deep Scrub terminé : ${checked} registres vérifiés, ${repaired} corruption(s) purgée(s), ${bytesSaved} octets compactés.`;
    setScrubReport(msg);
    toast.success(msg);
  }

  function handleExportGlobal() {
    setIsExporting(true);
    try {
      const dump: Record<string, unknown> = {
        _meta: {
          app: "detective-conseil-pst",
          timestamp: new Date().toISOString(),
          version: "3.0.0",
        },
      };

      for (const k of TRACKED_KEYS) {
        const raw = window.localStorage.getItem(k);
        if (raw) {
          try {
            dump[k] = JSON.parse(raw);
          } catch {
            dump[k] = raw;
          }
        }
      }

      const jsonStr = JSON.stringify(dump, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `pst_cnam_backup_global_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);

      try {
        window.localStorage.setItem(
          "pst_last_backup",
          new Date().toISOString(),
        );
      } catch {
        // Silencieux
      }
      window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      setRefreshTick((t) => t + 1);
      toast.success("Sauvegarde globale consolidée téléchargée avec succès.");
    } catch {
      toast.error("Erreur lors de l'exportation des données.");
    } finally {
      setIsExporting(false);
    }
  }

  function handlePurgeSingleKey(key: string) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Silencieux
    }
    window.dispatchEvent(new CustomEvent("pst:storage-updated"));
    setRefreshTick((t) => t + 1);
    toast.success(`Clé locale « ${key} » réinitialisée.`);
  }

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const raw = evt.target?.result as string;
        const parsed = JSON.parse(raw) as Record<string, unknown>;

        if (!parsed._meta && !parsed.pst106_v1) {
          toast.error("Format de sauvegarde invalide ou corrompu.");
          return;
        }

        let restoredCount = 0;
        for (const [k, v] of Object.entries(parsed)) {
          if (k === "_meta") continue;
          const strVal = typeof v === "string" ? v : JSON.stringify(v);
          try {
            window.localStorage.setItem(k, strVal);
          } catch {
            // Silencieux
          }
          restoredCount++;
        }

        window.dispatchEvent(new CustomEvent("pst:storage-updated"));
        toast.success(
          `Restauration terminée : ${restoredCount} modules synchronisés.`,
        );
        if (onRestored) onRestored();
        setTimeout(() => window.location.reload(), 1000);
      } catch {
        toast.error("Impossible d'analyser le fichier de sauvegarde JSON.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Inspecteur de Stockage Souverain et Restauration Globale PST"
      className="fixed inset-0 z-[130] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        className="relative w-full max-w-2xl bg-card/98 backdrop-blur-xl text-foreground border-t sm:border border-border rounded-t-3xl sm:rounded-2xl shadow-2xl p-5 sm:p-6 z-10 space-y-4 animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sm:hidden pb-1 flex justify-center shrink-0">
          <div className="w-10 h-1.5 rounded-full bg-muted-foreground/30" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border/80 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 rounded-xl bg-accent/10 text-accent shrink-0">
              <Database className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-base font-serif font-bold text-foreground leading-tight m-0 truncate">
                Inspecteur de Stockage &amp; Sauvegarde
              </h3>
              <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground truncate block">
                Contrôle granulaire local (100% navigateur, 0 Cloud)
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer shrink-0"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Quota & Status Card */}
        <StorageQuotaCard
          totalBytes={totalBytes}
          usagePct={usagePct}
          quotaTone={quotaTone}
          storedSummary={storedSummary}
          trackedKeysCount={TRACKED_KEYS.length}
          scrubReport={scrubReport}
          onDeepScrub={handleDeepScrub}
        />

        {/* Granular Key-by-Key Table */}
        <StorageKeyTable
          storedSummary={storedSummary}
          onPurgeSingleKey={handlePurgeSingleKey}
        />

        {/* Action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
          <button
            type="button"
            onClick={handleExportGlobal}
            disabled={isExporting}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 active:scale-98 transition-all cursor-pointer shadow-xs"
          >
            <Download className="size-4" />
            <span>Télécharger l'Archive JSON</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-border bg-card hover:bg-muted text-foreground text-xs font-bold active:scale-98 transition-all cursor-pointer shadow-xs"
          >
            <Upload className="size-4 text-accent" />
            <span>Restaurer une Archive</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImportFile}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useRef, useState } from "react";
import {
  Download,
  Upload,
  ShieldCheck,
  X,
  Database,
  Trash2,
  CheckCircle2,
  HardDrive,
} from "lucide-react";
import { toast } from "sonner";

interface DisasterRecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestored?: () => void;
}

const KEY_DESCRIPTIONS: Record<string, string> = {
  pst106_v1: "Atelier PST106 · Clinique de l'activité et psychologie du travail",
  pst108_atelier_v10: "Atelier PST108 · Psychologie du langage et clinique du dialogue",
  pst120_atelier_v10: "Atelier PST120 · Psychodynamique et psychopathologie du travail",
  pst123_atelier_v10: "Atelier PST123 · Le psychologue, le travail et l'emploi",
  pst124_atelier_v10: "Atelier PST124 · Transformations digitales et clinique des usages",
  cnam_pst_curriculum_progress_v1: "Pyramide Cursus RNCP 7 (Validation 120 ECTS)",
  pst_kanban_pipeline_v1: "Pipeline Kanban des UE & Livrables RNCP 7",
  pst_academic_todos_v1: "Pilotage des Livrables & Objectifs Académiques (TodoList)",
  pst_memoire_studio_v1: "Studio Mémoire RNCP 7 & Pre-Defense Guard",
  pst_oral_defense_v1: "Simulateur de Soutenance Orale & Controverses Grand Jury",
  pst_field_journal_v1: "Carnet d'Observation Terrain & Chronique d'Activité Horodatée",
  pst_bibliography_vault_v1: "Coffre Bibliographique Personnel APA 7",
  pst_planning_attendance_v1: "Pointage d'Assiduité & Notes de Séances du Planning CNAM",
  pst_lexique_bookmarks_v1: "Favoris & Concepts à consolider du Lexique PST",
  pst_planning_filters_v2: "Préférences du Planning & Frise Chronologique",
  pst_focus_timer_v1: "Minuteur Focus Live Activity (Dynamic Island)",
  pst_layout_mode_v1: "Mode d'affichage iPadOS des Ateliers (Confort / Large / Split-View)",
  pst_scratch_pst106: "Calepin Split-View PST106",
  pst_scratch_pst108: "Calepin Split-View PST108",
  pst_scratch_pst120: "Calepin Split-View PST120",
  pst_scratch_pst123: "Calepin Split-View PST123",
  pst_scratch_pst124: "Calepin Split-View PST124",
  pst_audio_muted: "Préférence Audio Procédural (Web Audio API)",
  pst_theme: "Thème d'affichage (Clair / Dark-Ops OLED)",
  pst_last_backup: "Horodatage de la dernière sauvegarde consolidée",
};

const TRACKED_KEYS = Object.keys(KEY_DESCRIPTIONS);

const JSON_KEYS = new Set([
  "pst106_v1",
  "pst108_atelier_v10",
  "pst120_atelier_v10",
  "pst123_atelier_v10",
  "pst124_atelier_v10",
  "cnam_pst_curriculum_progress_v1",
  "pst_kanban_pipeline_v1",
  "pst_academic_todos_v1",
  "pst_memoire_studio_v1",
  "pst_oral_defense_v1",
  "pst_field_journal_v1",
  "pst_bibliography_vault_v1",
  "pst_planning_attendance_v1",
  "pst_lexique_bookmarks_v1",
  "pst_planning_filters_v2",
  "pst_focus_timer_v1",
]);

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

  const storedSummary = TRACKED_KEYS.map((k) => {
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
  const usagePct = Math.min(100, Math.max(0.5, (totalBytes / quotaBytes) * 100));
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
          // Deduplicate session dates on workshop stores if present
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

      window.localStorage.setItem("pst_last_backup", new Date().toISOString());
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
    window.localStorage.removeItem(key);
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
          window.localStorage.setItem(k, strVal);
          restoredCount++;
        }

        window.dispatchEvent(new CustomEvent("pst:storage-updated"));
        toast.success(`Restauration terminée : ${restoredCount} modules synchronisés.`);
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
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-accent/10 text-accent">
              <Database className="size-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-foreground leading-tight m-0">
                Inspecteur de Stockage Souverain &amp; Disaster Recovery
              </h3>
              <span className="text-[11px] font-mono text-muted-foreground">
                Contrôle granulaire clé par clé · 100% navigateur local (0 Cloud)
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Quota & Status Card */}
        <div className="p-4 rounded-xl border border-border bg-background space-y-2.5 shrink-0">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium flex items-center gap-1.5">
              <HardDrive className="size-3.5 text-accent" />
              Espace localStorage utilisé (Bouclier Anti-Saturation 75% / 90%) :
            </span>
            <span className="font-mono font-bold text-foreground">
              {(totalBytes / 1024).toFixed(2)} Ko / 5 120 Ko ({usagePct.toFixed(1)}%)
            </span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full transition-all ${quotaTone}`}
              style={{ width: `${usagePct}%` }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
            <span className="text-muted-foreground font-medium">
              Registres académiques actifs :{" "}
              <strong className="font-mono text-accent">
                {storedSummary.filter((s) => s.exists).length} / {TRACKED_KEYS.length} clés
              </strong>
            </span>

            <button
              type="button"
              onClick={handleDeepScrub}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/25 transition-colors cursor-pointer"
              title="Vérifier l'intégrité JSON de toutes les clés et compacter les historiques"
            >
              <ShieldCheck className="size-3.5" />
              <span>Audit d'Intégrité JSON &amp; Deep Scrub</span>
            </button>
          </div>

          {scrubReport && (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-mono text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="size-3.5 shrink-0" />
              <span>{scrubReport}</span>
            </div>
          )}
        </div>

        {/* Granular Key-by-Key Table */}
        <div className="flex-1 overflow-y-auto border border-border/80 rounded-xl divide-y divide-border/60 bg-background/50">
          {storedSummary.map((item) => (
            <div
              key={item.key}
              className="px-3.5 py-2.5 flex items-center justify-between gap-3 text-xs hover:bg-muted/40 transition-colors"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`size-2 rounded-full ${
                      !item.validJson
                        ? "bg-rose-500"
                        : item.exists
                          ? "bg-emerald-500"
                          : "bg-muted-foreground/30"
                    }`}
                  />
                  <span className="font-mono font-bold text-[11px] text-foreground">
                    {item.key}
                  </span>
                  {item.exists && !item.validJson && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-rose-500/15 text-rose-600">
                      JSON Corrompu
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground truncate m-0 mt-0.5">
                  {item.label}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">
                  {item.exists ? `${(item.bytes / 1024).toFixed(1)} Ko` : "Vide"}
                </span>
                {item.exists && (
                  <button
                    type="button"
                    onClick={() => handlePurgeSingleKey(item.key)}
                    className="p-1 rounded text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title={`Purger uniquement ${item.key}`}
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

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
            style={{ display: "none" }}
            onChange={handleImportFile}
          />
        </div>
      </div>
    </div>
  );
}

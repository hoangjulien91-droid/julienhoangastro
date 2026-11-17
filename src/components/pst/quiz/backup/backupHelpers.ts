import type { PstStore } from "@/lib/pst/store";
import {
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

export const LAST_BACKUP_KEY = "pst_last_backup";

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

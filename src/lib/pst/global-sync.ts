"use client";

import { toast } from "sonner";
import {
  playSuccessSound,
  playClickSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

const BACKUP_PREFIXES = ["pst", "st_visit_"];

export function getGlobalPstData(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const data: Record<string, string> = {};
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (!key) continue;
    if (BACKUP_PREFIXES.some((p) => key.startsWith(p))) {
      const val = window.localStorage.getItem(key);
      if (val !== null) data[key] = val;
    }
  }
  return data;
}

export function exportGlobalPstBackup(): void {
  try {
    triggerHaptic("success");
    playSuccessSound();
    const data = getGlobalPstData();
    const payload = JSON.stringify(
      {
        version: "pst_global_v1",
        exportedAt: new Date().toISOString(),
        keysCount: Object.keys(data).length,
        data,
      },
      null,
      2,
    );
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pst_integral_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    window.localStorage.setItem("pst_last_backup", new Date().toISOString());
    toast.success(
      "Sauvegarde intégrale (5 UE + Planning + Studios) téléchargée !",
    );
  } catch {
    toast.error("Impossible de créer le fichier de sauvegarde.");
  }
}

export function restoreGlobalPstData(rawJson: string): boolean {
  try {
    const parsed = JSON.parse(rawJson);
    const dataMap: Record<string, string> =
      parsed &&
      typeof parsed === "object" &&
      parsed.data &&
      typeof parsed.data === "object"
        ? parsed.data
        : parsed;

    if (!dataMap || typeof dataMap !== "object") return false;

    let restoredCount = 0;
    for (const [key, val] of Object.entries(dataMap)) {
      if (
        typeof val === "string" &&
        BACKUP_PREFIXES.some((p) => key.startsWith(p))
      ) {
        window.localStorage.setItem(key, val);
        restoredCount++;
      }
    }

    if (restoredCount > 0) {
      window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      triggerHaptic("success");
      playSuccessSound();
      toast.success(`${restoredCount} éléments restaurés avec succès !`);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export async function copyPstSyncCode(): Promise<boolean> {
  try {
    triggerHaptic("success");
    playSuccessSound();
    const data = getGlobalPstData();
    const jsonStr = JSON.stringify(data);
    // Base64 safe utf-8
    const base64 = btoa(encodeURIComponent(jsonStr));
    const token = `PST_SYNC_V1:${base64}`;
    await navigator.clipboard.writeText(token);
    toast.success("Code de synchronisation copié dans le presse-papiers !");
    return true;
  } catch {
    toast.error("Échec de la copie du code de synchronisation.");
    return false;
  }
}

export function restorePstFromSyncCode(token: string): boolean {
  try {
    const clean = token.trim();
    let jsonStr = "";
    if (clean.startsWith("PST_SYNC_V1:")) {
      const b64 = clean.replace("PST_SYNC_V1:", "");
      jsonStr = decodeURIComponent(atob(b64));
    } else if (clean.startsWith("{")) {
      jsonStr = clean;
    } else {
      // Try direct b64
      jsonStr = decodeURIComponent(atob(clean));
    }

    const ok = restoreGlobalPstData(jsonStr);
    if (!ok) {
      toast.error("Code de synchronisation invalide.");
    }
    return ok;
  } catch {
    toast.error("Format de code de synchronisation incorrect.");
    return false;
  }
}

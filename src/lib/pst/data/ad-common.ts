/**
 * Modèle commun et persistance pour toutes les Activités Distantes (AD) de S1
 * (PST106, PST108, PST123).
 */

export type AdStatus = "todo" | "draft" | "ready" | "submitted" | "corrected";

export interface AdStatusInfo {
  label: string;
  badgeClass: string;
  dotColor: string;
}

export const AD_STATUS_CONFIG: Record<AdStatus, AdStatusInfo> = {
  todo: {
    label: "À faire",
    badgeClass: "bg-neutral-800 text-neutral-400 border-neutral-700",
    dotColor: "bg-neutral-500",
  },
  draft: {
    label: "Brouillon en cours",
    badgeClass: "bg-amber-950/70 text-amber-300 border-amber-800/80",
    dotColor: "bg-amber-400",
  },
  ready: {
    label: "Prête à déposer",
    badgeClass: "bg-cyan-950/70 text-cyan-300 border-cyan-800/80",
    dotColor: "bg-cyan-400",
  },
  submitted: {
    label: "Déposée sur Moodle",
    badgeClass: "bg-emerald-950/70 text-emerald-300 border-emerald-800/80",
    dotColor: "bg-emerald-400",
  },
  corrected: {
    label: "Corrigée en cours",
    badgeClass: "bg-purple-950/70 text-purple-300 border-purple-800/80",
    dotColor: "bg-purple-400",
  },
};

export interface UnifiedAdItem {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst123";
  moduleLabel: string;
  moduleColor: "emerald" | "amber" | "indigo";
  enseignant: string;
  titre: string;
  dateSeance: string;
  dateLimite: string;
  dateCorrige?: string;
  typeTravail: "individuel" | "collectif" | "lecture" | "qcm";
  consigne: string;
  contextePedagogique: string;
  conceptsCles: string[];
  auteursAttendus: string[];
  pointsVigilance: string[];
  gabaritReponse: string;
  corrigeModel: string;
  recommandationExamen: string;
  forumMoodleHint?: string;
}

// Clés de stockage
export function getAdDraftStorageKey(adId: string): string {
  return `pst_ad_draft_${adId}`;
}

export function getAdStatusStorageKey(adId: string): string {
  return `pst_ad_status_${adId}`;
}

export function getAdNotesStorageKey(adId: string): string {
  return `pst_ad_postnotes_${adId}`;
}

export function loadAdDraft(adId: string, fallback: string = ""): string {
  if (typeof window === "undefined") return fallback;
  try {
    return localStorage.getItem(getAdDraftStorageKey(adId)) || fallback;
  } catch {
    return fallback;
  }
}

export function saveAdDraft(adId: string, text: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getAdDraftStorageKey(adId), text);
    window.dispatchEvent(new CustomEvent("pst:ad-updated", { detail: { adId } }));
  } catch (e) {
    console.error("Erreur sauvegarde draft AD", e);
  }
}

export function loadAdStatus(adId: string, defaultStatus: AdStatus = "todo"): AdStatus {
  if (typeof window === "undefined") return defaultStatus;
  try {
    const s = localStorage.getItem(getAdStatusStorageKey(adId)) as AdStatus;
    if (s && AD_STATUS_CONFIG[s]) return s;
    return defaultStatus;
  } catch {
    return defaultStatus;
  }
}

export function saveAdStatus(adId: string, status: AdStatus): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getAdStatusStorageKey(adId), status);
    window.dispatchEvent(new CustomEvent("pst:ad-updated", { detail: { adId, status } }));
  } catch (e) {
    console.error("Erreur sauvegarde status AD", e);
  }
}

export function loadAdPostNotes(adId: string): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(getAdNotesStorageKey(adId)) || "";
  } catch {
    return "";
  }
}

export function saveAdPostNotes(adId: string, notes: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getAdNotesStorageKey(adId), notes);
    window.dispatchEvent(new CustomEvent("pst:ad-updated", { detail: { adId } }));
  } catch (e) {
    console.error("Erreur sauvegarde notes post-correction AD", e);
  }
}

import type { PlanningUnitId } from "@/lib/pst/data/planning";

export interface CovoitMember {
  id: string;
  name: string;
  units: PlanningUnitId[];
  isUser?: boolean;
}

/**
 * Groupe local Cnam BAB (Anglet / Biarritz / Bayonne ↔ Cnam Bègles) — 7 membres réels
 * Maximum 5 inscrits par UE pour garantir qu'une seule voiture suffit toujours (max 5 places).
 */
export const DEFAULT_COVOIT_MEMBERS: CovoitMember[] = [
  {
    id: "julien",
    name: "Julien",
    units: ["pst106", "pst108", "pst120", "pst123", "pst124"],
    isUser: true,
  },
  {
    id: "axelle",
    name: "Axelle",
    units: ["pst106", "pst120", "pst123"],
  },
  {
    id: "florence",
    name: "Florence",
    units: ["pst108", "pst123", "pst124"],
  },
  {
    id: "lea",
    name: "Léa",
    units: ["pst106", "pst108", "pst120"],
  },
  {
    id: "jennifer",
    name: "Jennifer",
    units: ["pst120", "pst123", "pst124"],
  },
  {
    id: "celine",
    name: "Céline",
    units: ["pst106", "pst108", "pst124"],
  },
  {
    id: "helene",
    name: "Hélène",
    units: ["pst108", "pst123"],
  },
];

export const STORAGE_MEMBERS_KEY = "pst_covoit_group_v3";
export const STORAGE_DRIVERS_KEY = "pst_covoit_drivers_v2";
export const STORAGE_ABSENCES_KEY = "pst_covoit_absences_v2";

export function reconcileMembers(stored: unknown): CovoitMember[] {
  if (!Array.isArray(stored) || stored.length === 0) {
    return DEFAULT_COVOIT_MEMBERS;
  }
  const map = new Map<string, any>();
  for (const m of stored) {
    if (m && typeof m.name === "string") {
      map.set(m.name.trim().toLowerCase(), m);
      if (m.id) map.set(m.id, m);
    }
  }

  const result: CovoitMember[] = [];
  for (const def of DEFAULT_COVOIT_MEMBERS) {
    const key = def.name.trim().toLowerCase();
    const existing = map.get(key) || map.get(def.id);
    if (existing) {
      result.push({
        id: def.id,
        name: def.name,
        units:
          Array.isArray(existing.units) && existing.units.length > 0
            ? existing.units
            : def.units,
        isUser: def.isUser,
      });
      map.delete(key);
      if (existing.id) map.delete(existing.id);
    } else {
      result.push(def);
    }
  }

  // Conserver les membres additionnels ajoutés manuellement
  for (const [_, extra] of map.entries()) {
    if (extra && extra.id && !result.some((r) => r.id === extra.id)) {
      result.push({
        id: extra.id,
        name: extra.name,
        units: Array.isArray(extra.units) ? extra.units : ["pst106", "pst123"],
        isUser: false,
      });
    }
  }

  return result;
}

export function timeToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function minutesToHhmm(totalMinutes: number): string {
  let m = totalMinutes;
  if (m < 0) m += 24 * 60;
  if (m >= 24 * 60) m %= 24 * 60;
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

"use client";

import {
  UNIT_ORDER,
  type PlanningEventType,
  type PlanningUnitId,
} from "@/lib/pst/data/planning";
import { type PlanningFilters } from "@/lib/pst/planning-stats";

export const FILTERS_KEY_DESKTOP = "pst_planning_filters_desktop_v1";
export const FILTERS_KEY_MOBILE = "pst_planning_filters_mobile_v1";
export const VIEW_KEY = "pst_planning_view_v1";
export const ATTENDANCE_KEY = "pst_planning_attendance_v1";
export const ARBITRATION_KEY = "pst_planning_arbitrations_v1";
export const ARBITRATION_V2_KEY = "pst_planning_arbitrations_v2";
export const AUTO_ATTENDANCE_KEY = "pst_auto_attendance_mode";
export const MANUAL_ABSENCES_KEY = "pst_manual_absences_v1";

export interface StoredFilters {
  version?: number;
  units: PlanningUnitId[];
  types: PlanningEventType[];
  sessions: (1 | 2)[];
}

export interface StoredAttendance {
  attended: string[];
  notes: Record<string, string>;
}

export function defaultFilters(isMobile = false): PlanningFilters {
  return {
    units: new Set(UNIT_ORDER),
    // Sur mobile, par défaut, seuls le présentiel (COURS) et les webconférences (WEBCONF) sont activés
    types: isMobile
      ? new Set<PlanningEventType>(["COURS", "WEBCONF"])
      : new Set<PlanningEventType>([
          "COURS",
          "WEBCONF",
          "DISTANT",
          "EXAMEN",
        ]),
    sessions: new Set([1, 2]),
    teacher: "all",
    search: "",
    onlyConflicts: false,
    hidePast: false,
    todayIso: null,
    quickPeriod: "all",
  };
}

export function allFilters(todayIso: string | null = null): PlanningFilters {
  return {
    units: new Set(UNIT_ORDER),
    types: new Set<PlanningEventType>([
      "COURS",
      "WEBCONF",
      "DISTANT",
      "EXAMEN",
    ]),
    sessions: new Set([1, 2]),
    teacher: "all",
    search: "",
    onlyConflicts: false,
    hidePast: false,
    todayIso,
    quickPeriod: "all",
  };
}

export function loadFilters(isMobile = false): PlanningFilters {
  try {
    const key = isMobile ? FILTERS_KEY_MOBILE : FILTERS_KEY_DESKTOP;
    const raw = window.localStorage.getItem(key);
    if (!raw) return defaultFilters(isMobile);
    const parsed = JSON.parse(raw) as StoredFilters;
    if (parsed.version !== 5) return defaultFilters(isMobile);
    return {
      ...defaultFilters(isMobile),
      units: new Set(parsed.units),
      types: new Set(parsed.types),
      sessions: new Set(parsed.sessions),
    };
  } catch {
    return defaultFilters(isMobile);
  }
}

export function toggleInSet<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

import {
  PLANNING_EVENTS,
  type PlanningEvent,
} from "@/lib/pst/data/planning";
import {
  eventId,
  getAllTeachers,
  getEventConflicts,
  getConflictSeverity,
  getEventDurationHours,
  computeGlobalPlanningTotals,
} from "@/lib/pst/planning-stats";
import { MODULES as HUB_MODULES, moduleStats, type ModuleInfo } from "@/lib/pst/hub-stats";

export interface PlanningKpis {
  allTeachers: string[];
  totalConflictsCount: number;
  physicalConflictsCount: number;
  replayableConflictsCount: number;
  totalPlannedHours: number;
  totalPhysicalDaysCount: number;
  globalTotals: ReturnType<typeof computeGlobalPlanningTotals>;
  visioHours: number;
  distantHours: number;
}

export function computeStaticPlanningKpis(): PlanningKpis {
  const allTeachers = getAllTeachers();
  const totalConflictsCount = PLANNING_EVENTS.filter(
    (e) => getEventConflicts(e).length > 0,
  ).length;

  const physicalConflictsCount = PLANNING_EVENTS.filter((e) => {
    const confs = getEventConflicts(e);
    return (
      confs.length > 0 &&
      getConflictSeverity(e, confs) === "PRESENCE_CRITICAL"
    );
  }).length;

  const replayableConflictsCount = PLANNING_EVENTS.filter((e) => {
    const confs = getEventConflicts(e);
    return (
      confs.length > 0 &&
      getConflictSeverity(e, confs) === "WEBCONF_REPLAYABLE"
    );
  }).length;

  const totalPlannedHours = PLANNING_EVENTS.reduce(
    (acc, e) => acc + getEventDurationHours(e),
    0,
  );

  const coursEvents = PLANNING_EVENTS.filter((e) => e.type === "COURS");
  const totalPhysicalDaysCount = new Set(coursEvents.map((e) => e.date)).size;

  const globalTotals = computeGlobalPlanningTotals();

  const visioHours = PLANNING_EVENTS.filter((e) => e.type === "WEBCONF").reduce(
    (acc, e) => acc + getEventDurationHours(e),
    0,
  );

  const distantHours = PLANNING_EVENTS.filter((e) => e.type === "DISTANT").reduce(
    (acc, e) => acc + getEventDurationHours(e),
    0,
  );

  return {
    allTeachers,
    totalConflictsCount,
    physicalConflictsCount,
    replayableConflictsCount,
    totalPlannedHours,
    totalPhysicalDaysCount,
    globalTotals,
    visioHours,
    distantHours,
  };
}

export function computeEffectiveAttendanceIds(
  attendedIds: Set<string>,
  manualAbsences: Set<string>,
  autoAttendanceMode: boolean,
): Set<string> {
  const set = new Set<string>();
  const now = new Date();
  const nowIso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const nowMin = now.getHours() * 60 + now.getMinutes();

  for (const e of PLANNING_EVENTS) {
    const id = eventId(e);
    if (e.cancelled) continue;
    if (manualAbsences.has(id)) continue;
    if (attendedIds.has(id)) {
      set.add(id);
      continue;
    }
    if (autoAttendanceMode) {
      const [eh, em] = e.end.split(":").map(Number);
      const endMin = (eh || 0) * 60 + (em || 0);
      const isPast =
        e.date < nowIso || (e.date === nowIso && endMin <= nowMin);
      if (isPast) {
        set.add(id);
      }
    }
  }
  return set;
}

export function computeSelectedSessionInfo(selectedEvent: PlanningEvent | null) {
  if (!selectedEvent) return null;
  const unitEvents = PLANNING_EVENTS.filter(
    (e) =>
      e.unit === selectedEvent.unit && e.type !== "EXAMEN" && !e.cancelled,
  ).sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
  const idx = unitEvents.findIndex(
    (e) => eventId(e) === eventId(selectedEvent),
  );
  const hubMod = HUB_MODULES.find(
    (m: ModuleInfo) => m.id.toLowerCase() === selectedEvent.unit.toLowerCase(),
  );
  const stats = hubMod ? moduleStats(hubMod) : null;
  const readinessPct = stats
    ? Math.round(
        (stats.pctFiches +
          stats.pctCards +
          (stats.avgScore !== null ? stats.avgScore : 0)) /
          (stats.avgScore !== null ? 3 : 2),
      )
    : 0;
  return {
    sessionIndex: idx >= 0 ? idx + 1 : null,
    totalSessions: unitEvents.length,
    stats,
    readinessPct,
  };
}

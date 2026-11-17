import {
  PLANNING_EVENTS,
  type PlanningEvent,
  type PlanningUnitId,
} from "@/lib/pst/data/planning";
import {
  PLANNING_WEEKS,
  getEventDurationHours,
  isoWeekKey,
  matchesFilters,
  type PlanningFilters,
} from "@/lib/pst/planning-stats";

/**
 * Group physical courses by date for the Logistics view
 */
export function computePresenceDaysGroups(
  filtersUnits: Set<PlanningUnitId>,
): [string, PlanningEvent[]][] {
  const cours = PLANNING_EVENTS.filter(
    (e) => e.type === "COURS" && filtersUnits.has(e.unit),
  ).sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
  const map = new Map<string, PlanningEvent[]>();
  for (const c of cours) {
    const list = map.get(c.date) ?? [];
    list.push(c);
    map.set(c.date, list);
  }
  return Array.from(map.entries());
}

/**
 * Group filtered events by active week for the Agenda Hebdo view
 */
export function computeActiveWeeksData(filters: PlanningFilters) {
  const filtered = PLANNING_EVENTS.filter((e) =>
    matchesFilters(e, filters),
  ).sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
  const byWeek = new Map<string, PlanningEvent[]>();
  for (const ev of filtered) {
    const wk = isoWeekKey(ev.date);
    const list = byWeek.get(wk) ?? [];
    list.push(ev);
    byWeek.set(wk, list);
  }
  return PLANNING_WEEKS.weeks
    .filter((w) => byWeek.has(w.key))
    .map((w) => {
      const events = byWeek.get(w.key) ?? [];
      const byDay = new Map<string, PlanningEvent[]>();
      for (const ev of events) {
        const dList = byDay.get(ev.date) ?? [];
        dList.push(ev);
        byDay.set(ev.date, dList);
      }
      const totalHours = events.reduce(
        (acc, ev) => acc + getEventDurationHours(ev),
        0,
      );
      return {
        week: w,
        events,
        days: Array.from(byDay.entries()),
        totalHours,
      };
    });
}

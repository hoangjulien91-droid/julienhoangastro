import { useState, useMemo, useRef } from "react";
import {
  PLANNING_EVENTS,
  UNIT_ORDER,
  type PlanningEvent,
} from "@/lib/pst/data/planning";
import {
  PLANNING_WEEKS,
  eventId,
  getEventConflicts,
  getNextEvent,
  isoWeekKey,
  matchesFilters,
  type PlanningFilters,
} from "@/lib/pst/planning-stats";
import { PlanningGridControls } from "./grid/PlanningGridControls";
import { PlanningDayChip } from "./grid/PlanningDayChip";
import { PlanningUnitRowHead } from "./grid/PlanningUnitRowHead";

interface PlanningGridProps {
  filters: PlanningFilters;
  todayWeekKey: string | null;
  selectedEventId?: string | null;
  onSelectEvent?: (e: PlanningEvent) => void;
  attendedIds?: Set<string>;
}

export function PlanningGrid({
  filters,
  todayWeekKey,
  selectedEventId,
  onSelectEvent,
  attendedIds,
}: PlanningGridProps) {
  const [hideEmptyWeeks, setHideEmptyWeeks] = useState(true);
  const [showHoursOnChips, setShowHoursOnChips] = useState(true);
  const tableWrapRef = useRef<HTMLDivElement>(null);

  const visibleUnits = UNIT_ORDER.filter((u) => filters.units.has(u));
  const filteredEvents = useMemo(
    () => PLANNING_EVENTS.filter((e) => matchesFilters(e, filters)),
    [filters],
  );

  const byUnitWeek = useMemo(() => {
    const map = new Map<string, PlanningEvent[]>();
    for (const e of filteredEvents) {
      const key = `${e.unit}|${isoWeekKey(e.date)}`;
      const list = map.get(key);
      if (list) list.push(e);
      else map.set(key, [e]);
    }
    return map;
  }, [filteredEvents]);

  // Determine which weeks have at least 1 event (or are todayWeekKey)
  const activeWeekKeys = useMemo(() => {
    const set = new Set<string>();
    for (const e of filteredEvents) {
      set.add(isoWeekKey(e.date));
    }
    if (todayWeekKey) set.add(todayWeekKey);
    return set;
  }, [filteredEvents, todayWeekKey]);

  const displayedWeeks = useMemo(() => {
    if (!hideEmptyWeeks) return PLANNING_WEEKS.weeks;
    const filtered = PLANNING_WEEKS.weeks.filter((w) =>
      activeWeekKeys.has(w.key),
    );
    return filtered.length > 0 ? filtered : PLANNING_WEEKS.weeks;
  }, [hideEmptyWeeks, activeWeekKeys]);

  const nextImmediateEvent = useMemo(() => getNextEvent(), []);

  const displayedMonthGroups = useMemo(() => {
    if (!hideEmptyWeeks) return PLANNING_WEEKS.monthGroups;
    const groups: { label: string; span: number }[] = [];
    for (const w of displayedWeeks) {
      const last = groups[groups.length - 1];
      if (last && last.label === w.monthLabel) {
        last.span += 1;
      } else {
        groups.push({ label: w.monthLabel, span: 1 });
      }
    }
    return groups;
  }, [hideEmptyWeeks, displayedWeeks]);

  function scrollToActiveWeek() {
    const container = tableWrapRef.current;
    if (!container) return;

    // Priorité 1 : La puce exacte de la prochaine séance
    const nextChip = container.querySelector('[data-next-chip="true"]');
    if (nextChip && nextChip instanceof HTMLElement) {
      if (nextImmediateEvent) {
        onSelectEvent?.(nextImmediateEvent);
      }
      // Calcul du défilement horizontal précis dans le conteneur scrollable
      const containerRect = container.getBoundingClientRect();
      const chipRect = nextChip.getBoundingClientRect();
      const scrollLeft =
        container.scrollLeft +
        (chipRect.left - containerRect.left) -
        containerRect.width / 2 +
        chipRect.width / 2;
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
      return;
    }

    // Priorité 2 : Colonne de la semaine courante
    const todayCol = container.querySelector(".today-col");
    if (todayCol && todayCol instanceof HTMLElement) {
      const containerRect = container.getBoundingClientRect();
      const colRect = todayCol.getBoundingClientRect();
      const scrollLeft =
        container.scrollLeft +
        (colRect.left - containerRect.left) -
        containerRect.width / 2 +
        colRect.width / 2;
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
      return;
    }

    // Fallback : première puce disponible
    const firstChip = container.querySelector(".pst-day-chip");
    if (firstChip && firstChip instanceof HTMLElement) {
      firstChip.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }

  if (visibleUnits.length === 0) {
    return <div className="note">Aucune UE sélectionnée dans les filtres.</div>;
  }

  return (
    <div className="space-y-2.5">
      {/* Barre d'ergonomie de lecture de la Frise */}
      <PlanningGridControls
        hideEmptyWeeks={hideEmptyWeeks}
        onToggleHideEmptyWeeks={() => setHideEmptyWeeks((v) => !v)}
        showHoursOnChips={showHoursOnChips}
        onToggleShowHours={() => setShowHoursOnChips((v) => !v)}
        displayedWeeksCount={displayedWeeks.length}
        totalWeeksCount={PLANNING_WEEKS.weeks.length}
        onScrollToActiveWeek={scrollToActiveWeek}
      />

      <div className="tablewrap" ref={tableWrapRef}>
        <table
          className="timeline"
          style={
            hideEmptyWeeks
              ? {
                  minWidth: `${Math.max(920, displayedWeeks.length * 58 + 265)}px`,
                }
              : undefined
          }
        >
          <thead>
            <tr className="months">
              <th className="corner" />
              {displayedMonthGroups.map((g, i) => (
                <th key={i} colSpan={g.span}>
                  {g.label}
                </th>
              ))}
            </tr>
            <tr className="weeknums">
              <th className="corner">
                Unité d&apos;Enseignement (cliquer une puce pour inspecter)
              </th>
              {displayedWeeks.map((w) => (
                <th
                  key={w.key}
                  className={`wk${w.key === todayWeekKey ? " today-col" : ""}`}
                  title={`Semaine ${w.label} (${w.rangeLabel})`}
                >
                  <div>{w.label}</div>
                  <div className="text-[8.5px] font-normal opacity-75 tracking-tight">
                    {w.rangeLabel}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleUnits.map((unit) => (
              <tr className="ue-row" key={unit}>
                <PlanningUnitRowHead
                  unit={unit}
                  filters={filters}
                  onSelectEvent={onSelectEvent}
                />
                {displayedWeeks.map((w) => {
                  const cellEvents = (
                    byUnitWeek.get(`${unit}|${w.key}`) ?? []
                  ).sort((a, b) =>
                    (a.date + a.start).localeCompare(b.date + b.start),
                  );
                  return (
                    <td
                      key={w.key}
                      className={`wk${w.key === todayWeekKey ? " today-col" : ""}`}
                      style={
                        hideEmptyWeeks
                          ? { minWidth: 56, width: 56, padding: "4px" }
                          : undefined
                      }
                    >
                      {cellEvents.map((e, i) => {
                        const id = eventId(e);
                        const isSelected = selectedEventId === id;
                        const isAttended = attendedIds?.has(id) ?? false;
                        const conflicts = getEventConflicts(e);
                        const isNextChip =
                          nextImmediateEvent &&
                          eventId(nextImmediateEvent) === id;
                        return (
                          <PlanningDayChip
                            key={i}
                            event={e}
                            isSelected={isSelected}
                            isNextChip={!!isNextChip}
                            isAttended={isAttended}
                            conflicts={conflicts}
                            showHours={showHoursOnChips}
                            onSelectEvent={onSelectEvent}
                          />
                        );
                      })}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";

import { Fragment, useEffect, useRef } from "react";
import { PLANNING_EVENTS, type PlanningEvent } from "@/lib/pst/data/planning";
import {
  eventId,
  getEventDurationHours,
  matchesFilters,
  type PlanningFilters,
} from "@/lib/pst/planning-stats";
import { PlanningListMonthHeader } from "./list/PlanningListMonthHeader";
import { PlanningListItem } from "./list/PlanningListItem";

interface PlanningListProps {
  filters: PlanningFilters;
  todayIso: string | null;
  selectedEventId?: string | null;
  onSelectEvent?: (e: PlanningEvent) => void;
  attendedIds?: Set<string>;
  onToggleAttended?: (id: string) => void;
  sessionNotes?: Record<string, string>;
}

export function PlanningList({
  filters,
  todayIso,
  selectedEventId,
  onSelectEvent,
  attendedIds,
  onToggleAttended,
  sessionNotes,
}: PlanningListProps) {
  const events = PLANNING_EVENTS.filter((e) => matchesFilters(e, filters)).sort(
    (a, b) => (a.date + a.start).localeCompare(b.date + b.start),
  );

  const nextEventIndex = todayIso
    ? events.findIndex((e) => e.date >= todayIso)
    : -1;
  const nextItemRef = useRef<HTMLLIElement>(null);
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    if (hasScrolledRef.current || nextEventIndex === -1) return;
    hasScrolledRef.current = true;
    nextItemRef.current?.scrollIntoView({ block: "center" });
  }, [nextEventIndex]);

  if (events.length === 0) {
    return (
      <div className="note">
        Aucune séance ne correspond aux filtres sélectionnés.
      </div>
    );
  }

  // Group stats by YYYY-MM
  const monthStats = new Map<string, { count: number; hours: number }>();
  for (const e of events) {
    const ym = e.date.slice(0, 7);
    const cur = monthStats.get(ym) ?? { count: 0, hours: 0 };
    cur.count += 1;
    cur.hours += getEventDurationHours(e);
    monthStats.set(ym, cur);
  }

  return (
    <ul className="list-events">
      {events.map((e, i) => {
        const prev = events[i - 1];
        const ym = e.date.slice(0, 7);
        const showMonthHeader = !prev || prev.date.slice(0, 7) !== ym;
        const mStat = monthStats.get(ym);

        const id = eventId(e);
        const isSelected = selectedEventId === id;
        const isAttended = attendedIds?.has(id) ?? false;
        const userNote = sessionNotes?.[id]?.trim();
        const isNext = i === nextEventIndex;

        return (
          <Fragment key={id}>
            {showMonthHeader && (
              <PlanningListMonthHeader date={e.date} monthStat={mStat} />
            )}
            <PlanningListItem
              event={e}
              isNext={isNext}
              isSelected={isSelected}
              isAttended={isAttended}
              userNote={userNote}
              todayIso={todayIso}
              itemRef={isNext ? nextItemRef : undefined}
              onSelectEvent={onSelectEvent}
              onToggleAttended={onToggleAttended}
            />
          </Fragment>
        );
      })}
    </ul>
  );
}

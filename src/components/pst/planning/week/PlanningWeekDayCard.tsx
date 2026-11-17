"use client";

import React from "react";
import type { PlanningEvent } from "@/lib/pst/data/planning";
import { formatFrDate, getEventDurationHours } from "@/lib/pst/planning-stats";
import { PlanningEventCard } from "./PlanningEventCard";

interface PlanningWeekDayCardProps {
  date: string;
  dayEvents: PlanningEvent[];
  weekLabel: string;
  todayIso: string | null;
  hidePast?: boolean;
  selectedId: string | null;
  attendedIds: Set<string>;
  sessionNotes: Record<string, string>;
  onSelectEvent: (ev: PlanningEvent) => void;
  onToggleAttended: (id: string) => void;
}

export function PlanningWeekDayCard({
  date,
  dayEvents,
  weekLabel,
  todayIso,
  hidePast,
  selectedId,
  attendedIds,
  sessionNotes,
  onSelectEvent,
  onToggleAttended,
}: PlanningWeekDayCardProps) {
  const isDayPast = Boolean(todayIso && date < todayIso);
  const isDayToday = Boolean(todayIso && date === todayIso);

  if (hidePast && isDayPast) {
    return null;
  }

  const first = dayEvents[0];
  if (!first) return null;

  const dayHours = dayEvents.reduce(
    (acc, ev) => acc + getEventDurationHours(ev),
    0,
  );

  return (
    <div
      className={`rounded-3xl border shadow-xs overflow-hidden flex flex-col transition-all ${
        isDayPast
          ? "opacity-55 hover:opacity-100 bg-slate-100/40 dark:bg-slate-900/40 border-dashed border-slate-300 dark:border-slate-800"
          : isDayToday
            ? "border-emerald-500/60 ring-2 ring-emerald-500/15 bg-white/95 dark:bg-slate-900/95"
            : "border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90"
      }`}
    >
      <div
        className={`px-4.5 py-3 border-b flex items-center justify-between gap-2 ${
          isDayPast
            ? "bg-slate-100/50 dark:bg-slate-800/30 border-slate-200/50 dark:border-slate-800/50"
            : isDayToday
              ? "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/30 text-emerald-950 dark:text-emerald-100"
              : "bg-slate-50/80 dark:bg-slate-800/50 border-slate-200/70 dark:border-slate-800"
        }`}
      >
        <div>
          <div className="font-mono text-xs font-black uppercase text-slate-900 dark:text-slate-100 flex items-center gap-1.5 flex-wrap">
            <span>
              {first.day} {formatFrDate(date)}
            </span>
            {isDayToday && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-mono text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                <span className="size-1.5 rounded-full bg-white animate-pulse" />
                Aujourd&apos;hui
              </span>
            )}
            {isDayPast && (
              <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-[10px] font-bold">
                ✓ Passé
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-500">
            {dayEvents.length} séance{dayEvents.length > 1 ? "s" : ""} · {dayHours}h au total
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 font-mono text-[10px] font-bold">
          {weekLabel}
        </span>
      </div>

      <div className="p-3.5 space-y-2.5 flex-1">
        {dayEvents.map((ev) => (
          <PlanningEventCard
            key={`${ev.date}-${ev.start}-${ev.unit}`}
            ev={ev}
            selectedId={selectedId}
            attendedIds={attendedIds}
            sessionNotes={sessionNotes}
            isDayPast={isDayPast}
            isDayToday={isDayToday}
            onSelectEvent={onSelectEvent}
            onToggleAttended={onToggleAttended}
          />
        ))}
      </div>
    </div>
  );
}

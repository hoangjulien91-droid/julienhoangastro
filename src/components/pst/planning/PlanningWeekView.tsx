"use client";

import { useRef } from "react";
import type { PlanningEvent } from "@/lib/pst/data/planning";
import type { PLANNING_WEEKS } from "@/lib/pst/planning-stats";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { PlanningWeekNavBar } from "./week/PlanningWeekNavBar";
import { PlanningWeekDayCard } from "./week/PlanningWeekDayCard";

export interface ActiveWeekEntry {
  week: (typeof PLANNING_WEEKS)["weeks"][number];
  events: PlanningEvent[];
  days: [string, PlanningEvent[]][];
  totalHours: number;
}

interface PlanningWeekViewProps {
  activeWeeksData: ActiveWeekEntry[];
  safeWeekIdx: number;
  setSelectedWeekIdx: React.Dispatch<React.SetStateAction<number>>;
  jumpToNextUpcomingWeek: () => void;
  todayIso: string | null;
  hidePast?: boolean;
  attendedIds: Set<string>;
  sessionNotes: Record<string, string>;
  selectedId: string | null;
  onSelectEvent: (ev: PlanningEvent) => void;
  onToggleAttended: (id: string) => void;
}

export function PlanningWeekView({
  activeWeeksData,
  safeWeekIdx,
  setSelectedWeekIdx,
  jumpToNextUpcomingWeek,
  todayIso,
  hidePast,
  attendedIds,
  sessionNotes,
  selectedId,
  onSelectEvent,
  onToggleAttended,
}: PlanningWeekViewProps) {
  const weekTouchStartRef = useRef<{ x: number; y: number } | null>(null);
  const currentWeekData = activeWeeksData[safeWeekIdx] ?? null;

  return (
    <div
      className="space-y-4"
      onTouchStart={(e) => {
        const t = e.touches[0];
        if (!t) return;
        weekTouchStartRef.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        const start = weekTouchStartRef.current;
        const t = e.changedTouches[0];
        if (!start || !t) return;
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 48) {
          if (dx < 0 && safeWeekIdx < activeWeeksData.length - 1) {
            playClickSound();
            setSelectedWeekIdx((i) =>
              Math.min(activeWeeksData.length - 1, i + 1),
            );
          } else if (dx > 0 && safeWeekIdx > 0) {
            playClickSound();
            setSelectedWeekIdx((i) => Math.max(0, i - 1));
          }
        }
        weekTouchStartRef.current = null;
      }}
    >
      {/* Navigation hebdomadaire (Adaptative Mobile) */}
      <PlanningWeekNavBar
        safeWeekIdx={safeWeekIdx}
        activeWeeksData={activeWeeksData}
        onSelectWeekIdx={(idx) => setSelectedWeekIdx(idx)}
        onJumpToNextUpcomingWeek={jumpToNextUpcomingWeek}
      />

      {!currentWeekData ? (
        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
          Aucune séance ne correspond aux filtres sélectionnés.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {currentWeekData.days.map(([date, dayEvents]) => (
            <PlanningWeekDayCard
              key={date}
              date={date}
              dayEvents={dayEvents}
              weekLabel={currentWeekData.week.label}
              todayIso={todayIso}
              hidePast={hidePast}
              selectedId={selectedId}
              attendedIds={attendedIds}
              sessionNotes={sessionNotes}
              onSelectEvent={onSelectEvent}
              onToggleAttended={onToggleAttended}
            />
          ))}
        </div>
      )}
    </div>
  );
}

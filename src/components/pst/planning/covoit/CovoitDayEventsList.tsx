"use client";

import { AlertTriangle } from "lucide-react";
import type { PlanningEvent } from "@/lib/pst/data/planning";
import { eventId } from "@/lib/pst/planning-stats";

interface CovoitDayEventsListProps {
  date: string;
  dayEvents: PlanningEvent[];
  hasSameTimeOverlap: boolean;
  chosenConflicts: Record<string, string>;
  attendedIds: Set<string>;
  onSetConflictArbitration: (date: string, chosenUnitOrId: string) => void;
  onSelectEvent: (e: PlanningEvent) => void;
  onToggleAttended: (id: string) => void;
}

export function CovoitDayEventsList({
  date,
  dayEvents,
  hasSameTimeOverlap,
  chosenConflicts,
  attendedIds,
  onSetConflictArbitration,
  onSelectEvent,
  onToggleAttended,
}: CovoitDayEventsListProps) {
  return (
    <>
      {/* Arbitrage si 2 cours en parallèle dans 2 salles */}
      {hasSameTimeOverlap && (
        <div className="p-3 rounded-2xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/30 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-rose-950 dark:text-rose-200">
            <span className="flex items-center gap-1">
              <AlertTriangle className="size-3 text-rose-600" />
              <span>Conflit 2 salles simultanées : arbitrage requis</span>
            </span>
            <span className="text-[10px] font-mono opacity-80">1 seule salle possible</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {dayEvents.map((ev) => {
              const isChosen = chosenConflicts[date] === ev.unit;
              return (
                <button
                  key={ev.unit}
                  type="button"
                  onClick={() => onSetConflictArbitration(date, ev.unit)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 shadow-2xs ${
                    isChosen
                      ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                      : "bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-300/80 dark:border-slate-700 hover:border-rose-500"
                  }`}
                >
                  <span>{isChosen ? "✓ Présent en" : "Choisir"}</span>
                  <span className="font-mono uppercase">{ev.unit}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Liste des séances du jour */}
      <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
        {dayEvents.map((ev) => {
          const id = eventId(ev);
          const done = attendedIds.has(id);
          const chosenForDate = chosenConflicts[date];
          const isSacrificed = Boolean(chosenForDate && chosenForDate !== ev.unit);

          return (
            <div
              key={id}
              onClick={() => onSelectEvent(ev)}
              className={`p-3 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-all text-xs ${
                isSacrificed
                  ? "opacity-50 bg-slate-100/50 dark:bg-slate-900/50 border-dashed border-slate-300 dark:border-slate-800"
                  : "bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-500/10 border-slate-200/60 dark:border-slate-800"
              }`}
            >
              <div>
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 flex-wrap">
                  <span className="px-1.5 py-0.5 rounded bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-mono text-[10px]">
                    {ev.unit.toUpperCase()}
                  </span>
                  <span>
                    {ev.start}–{ev.end}
                  </span>
                  <span className="text-amber-700 dark:text-amber-400">
                    · {ev.room}
                  </span>
                  {ev.cancelled && (
                    <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-800 dark:text-rose-300 text-[10px] font-bold">
                      Annulé (report à fixer)
                    </span>
                  )}
                  {isSacrificed && (
                    <span className="text-[10px] text-slate-400 font-normal">
                      (À rattraper en replay)
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {ev.teacher}
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleAttended(id);
                }}
                className={`px-3 py-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs sm:text-[10px] font-bold border cursor-pointer shrink-0 transition-colors ${
                  done
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "border-slate-300 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {done ? "✓ Fait" : "Pointer"}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

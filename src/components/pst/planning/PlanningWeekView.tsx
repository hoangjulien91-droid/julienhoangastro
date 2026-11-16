"use client";

import { useRef } from "react";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  MapPin,
  User,
  Video,
} from "lucide-react";
import { UNIT_TITLES, type PlanningEvent } from "@/lib/pst/data/planning";
import {
  eventId,
  eventLocation,
  formatFrDate,
  getConflictSeverity,
  getEventConflicts,
  getEventDurationHours,
  type PLANNING_WEEKS,
} from "@/lib/pst/planning-stats";
import { playClickSound } from "@/lib/pst/audio-feedback";

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
      <div className="p-3 sm:p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
          <button
            type="button"
            disabled={safeWeekIdx <= 0}
            onClick={() => {
              playClickSound();
              setSelectedWeekIdx((i) => Math.max(0, i - 1));
            }}
            className="px-2.5 sm:px-3.5 py-2 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 disabled:opacity-30 flex items-center gap-1 cursor-pointer shrink-0"
          >
            <ChevronLeft className="size-3.5" />
            <span className="hidden sm:inline">Sem. préc.</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px] font-bold">
              ←
            </kbd>
          </button>

          <select
            value={safeWeekIdx}
            onChange={(e) => {
              playClickSound();
              setSelectedWeekIdx(Number(e.target.value));
            }}
            aria-label="Sélectionner une semaine de cours"
            className="flex-1 min-w-0 px-2.5 sm:px-3.5 py-2 sm:py-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-slate-900 dark:text-slate-100 font-bold text-xs cursor-pointer truncate"
          >
            {activeWeeksData.map((wData, idx) => (
              <option key={wData.week.key} value={idx}>
                Semaine {wData.week.label} · {wData.week.monthLabel} (
                {wData.events.length} séa. · {wData.totalHours}h)
              </option>
            ))}
          </select>

          <button
            type="button"
            disabled={safeWeekIdx >= activeWeeksData.length - 1}
            onClick={() => {
              playClickSound();
              setSelectedWeekIdx((i) =>
                Math.min(activeWeeksData.length - 1, i + 1),
              );
            }}
            className="px-2.5 sm:px-3.5 py-2 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 disabled:opacity-30 flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span className="hidden sm:inline">Sem. suiv.</span>
            <ChevronRight className="size-3.5" />
            <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px] font-bold">
              →
            </kbd>
          </button>
        </div>

        <div className="flex items-center justify-between sm:justify-start gap-2 text-xs w-full sm:w-auto">
          <span className="font-mono text-slate-500 text-[11px] sm:text-xs">
            Sem. {safeWeekIdx + 1} / {activeWeeksData.length} actives
          </span>
          <button
            type="button"
            onClick={jumpToNextUpcomingWeek}
            className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <span>Prochaine séance</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-white/20 dark:bg-slate-900/20 font-mono text-[10px] font-bold">
              T
            </kbd>
          </button>
        </div>
      </div>

      {!currentWeekData ? (
        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
          Aucune séance ne correspond aux filtres sélectionnés.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {currentWeekData.days.map(([date, dayEvents]) => {
            const isDayPast = Boolean(todayIso && date < todayIso);
            const isDayToday = Boolean(todayIso && date === todayIso);

            if (hidePast && isDayPast) {
              return null;
            }

            const first = dayEvents[0]!;
            const dayHours = dayEvents.reduce(
              (acc, ev) => acc + getEventDurationHours(ev),
              0,
            );
            return (
              <div
                key={date}
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
                      {dayEvents.length} séance
                      {dayEvents.length > 1 ? "s" : ""} · {dayHours}h au total
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 font-mono text-[10px] font-bold">
                    {currentWeekData.week.label}
                  </span>
                </div>

                <div className="p-3.5 space-y-2.5 flex-1">
                  {dayEvents.map((ev) => {
                    const id = eventId(ev);
                    const done = attendedIds.has(id);
                    const conflicts = getEventConflicts(ev);
                    const note = sessionNotes[id];
                    const isCours = ev.type === "COURS";
                    const isVisio = ev.type === "WEBCONF";

                    const [eh, em] = ev.end.split(":").map(Number);
                    const endMin = (eh || 0) * 60 + (em || 0);
                    const now = new Date();
                    const nowMin = now.getHours() * 60 + now.getMinutes();
                    const isEventPast =
                      isDayPast || (isDayToday && endMin <= nowMin);

                    return (
                      <div
                        key={id}
                        onClick={() => onSelectEvent(ev)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          selectedId === id
                            ? "border-amber-500 ring-2 ring-amber-500/20 bg-amber-500/5 shadow-2xs"
                            : isEventPast
                              ? "opacity-60 bg-slate-100/50 dark:bg-slate-800/30 border-slate-200/60 dark:border-slate-800 hover:opacity-100"
                              : "border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-amber-500/40"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-mono text-[11px] font-black uppercase">
                              {ev.unit}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                isCours
                                  ? "bg-amber-500/15 text-amber-800 dark:text-amber-300"
                                  : isVisio
                                    ? "bg-indigo-500/15 text-indigo-800 dark:text-indigo-300"
                                    : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                              }`}
                            >
                              {isCours
                                ? "Cours Bègles"
                                : isVisio
                                  ? "Webconférence"
                                  : "Activité distante"}
                            </span>
                            {ev.cancelled && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/30">
                                🚫 Annulée (report à fixer)
                              </span>
                            )}
                            {isEventPast && !ev.cancelled && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                Terminé
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                            {ev.start}–{ev.end}
                          </span>
                        </div>

                        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1 leading-snug">
                          {UNIT_TITLES[ev.unit]}
                        </div>

                        <div className="text-[11px] text-slate-600 dark:text-slate-400 space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="size-3 text-amber-600 shrink-0" />
                            <span className="truncate">
                              {ev.room ?? eventLocation(ev) ?? "ENF"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <User className="size-3 text-slate-400 shrink-0" />
                            <span className="truncate">{ev.teacher}</span>
                          </div>
                        </div>

                        {ev.cancelReason && (
                          <div className="mt-1.5 px-2 py-1 rounded-lg bg-rose-500/10 border border-rose-500/25 text-[11px] text-rose-900 dark:text-rose-200 flex items-start gap-1.5 font-medium">
                            <AlertTriangle className="size-3 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                            <span>{ev.cancelReason}</span>
                          </div>
                        )}

                        {conflicts.length > 0 &&
                          (() => {
                            const sev = getConflictSeverity(ev, conflicts);
                            const isCrit = sev === "PRESENCE_CRITICAL";
                            return (
                              <div
                                className={`mt-2 px-2 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1 ${
                                  isCrit
                                    ? "bg-rose-500/15 border-rose-500/30 text-rose-800 dark:text-rose-300"
                                    : "bg-indigo-500/15 border-indigo-500/30 text-indigo-800 dark:text-indigo-300"
                                }`}
                              >
                                {isCrit ? (
                                  <AlertTriangle className="size-3 shrink-0" />
                                ) : (
                                  <Video className="size-3 shrink-0" />
                                )}
                                <span>
                                  {isCrit
                                    ? `Conflit présentiel : ${conflicts.map((c) => c.unit.toUpperCase()).join(", ")}`
                                    : `Chevauchement visio (Replay ENF) : ${conflicts.map((c) => c.unit.toUpperCase()).join(", ")}`}
                                </span>
                              </div>
                            );
                          })()}

                        {note && (
                          <div className="mt-1.5 px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] italic text-slate-600 dark:text-slate-300">
                            {note}
                          </div>
                        )}

                        <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2">
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            Inspecter →
                          </span>
                          <button
                            type="button"
                            aria-pressed={done}
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleAttended(id);
                            }}
                            className={`px-2.5 py-1.5 sm:px-2 sm:py-0.5 rounded-lg sm:rounded text-[11px] sm:text-[10px] font-bold border cursor-pointer ${
                              done
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : "border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900"
                            }`}
                          >
                            {done ? "✓ Réalisée" : "Pointer"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

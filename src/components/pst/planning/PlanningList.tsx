import { Fragment, useEffect, useRef } from "react";
import { Check, CalendarPlus, AlertTriangle, FileText, Video, MapPin, Globe, GraduationCap } from "lucide-react";
import { PLANNING_EVENTS, type PlanningEvent } from "@/lib/pst/data/planning";
import {
  eventId,
  eventLocation,
  formatFrDate,
  formatMonthLabelFr,
  getEventConflicts,
  getConflictSeverity,
  getEventDurationHours,
  matchesFilters,
  type PlanningFilters,
} from "@/lib/pst/planning-stats";
import { downloadIcs } from "@/lib/pst/ics-export";

function noteFor(e: PlanningEvent): { text: string; fullday: boolean }[] {
  const notes: { text: string; fullday: boolean }[] = [];
  if (e.cluster)
    notes.push({
      text: "Week-end consécutif de présentiel à Cnam Bègles (vendredi 13/11 + samedi 14/11)",
      fullday: false,
    });
  if (e.fullday)
    notes.push({
      text: "Journée complète sur place à Cnam Bègles (matin + après-midi)",
      fullday: true,
    });
  return notes;
}

function modalityLabel(e: PlanningEvent): string {
  if (e.type === "COURS") return "Cours présentiel";
  if (e.type === "WEBCONF") return "Webconférence";
  if (e.type === "DISTANT") return "Activités distantes";
  if (e.session === 2) return "Rattrapage (Session 2)";
  return "Examen (Session 1)";
}

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
        const conflicts = getEventConflicts(e);

        const typeClass =
          e.type === "COURS"
            ? "t-cours"
            : e.type === "EXAMEN"
              ? e.session === 2
                ? "t-rattrap"
                : "t-examen"
              : e.type === "DISTANT"
                ? "t-distant"
                : "t-visio";
        const notes = noteFor(e);
        const isToday = todayIso !== null && e.date === todayIso;
        const [eh, em] = e.end.split(":").map(Number);
        const endMin = (eh || 0) * 60 + (em || 0);
        const now = new Date();
        const nowMin = now.getHours() * 60 + now.getMinutes();
        const isTodayPast = isToday && endMin <= nowMin;
        const isPast = (todayIso !== null && e.date < todayIso) || isTodayPast;
        const isNext = i === nextEventIndex;
        const city = eventLocation(e) ?? "Espace Numérique de Formation";

        return (
          <Fragment key={id}>
            {showMonthHeader && (
              <li className="pt-4 pb-2 px-1 flex items-center justify-between border-b border-slate-300/70 dark:border-slate-700/70">
                <span className="font-serif font-bold text-base text-slate-900 dark:text-slate-100">
                  {formatMonthLabelFr(e.date)}
                </span>
                {mStat && (
                  <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {mStat.count} séance{mStat.count > 1 ? "s" : ""} ·{" "}
                    {mStat.hours}h
                  </span>
                )}
              </li>
            )}
            <li
              ref={isNext ? nextItemRef : undefined}
              onClick={() => onSelectEvent?.(e)}
              className={[
                "list-item cursor-pointer",
                typeClass,
                e.cluster ? "cluster" : "",
                e.fullday ? "fullday" : "",
                e.tbd ? "tbd" : "",
                isToday ? "today" : "",
                isPast ? "past" : "",
                isNext ? "next-event" : "",
                isSelected ? "ring-2 ring-amber-500" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="li-date">
                <span className="li-day">{e.day}</span>
                <span className="li-num">{formatFrDate(e.date).slice(0, 5)}</span>
                <span className="text-[10px] text-slate-400">
                  {e.date.slice(0, 4)}
                </span>
              </div>
              <div className="li-body flex-1">
                <div className="li-top justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    {isNext && (
                      <span className="li-next-badge">Prochaine séance</span>
                    )}
                    {isToday && !isTodayPast && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Aujourd&apos;hui
                      </span>
                    )}
                    {isTodayPast && !e.cancelled && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        Terminé
                      </span>
                    )}
                    <span className="li-ue">{e.unit.toUpperCase()}</span>
                    <span className="li-time">
                      {e.start}–{e.end} ({getEventDurationHours(e)}h)
                    </span>
                    {e.type === "COURS" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                        <MapPin className="size-2.5" />
                        <span>Présentiel Bègles</span>
                      </span>
                    ) : e.type === "WEBCONF" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-500/30">
                        <Video className="size-2.5" />
                        <span>Webconférence ENF</span>
                      </span>
                    ) : e.type === "DISTANT" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-800 dark:text-purple-300 border border-purple-500/30">
                        <Globe className="size-2.5" />
                        <span>Distanciel Moodle</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/30">
                        <GraduationCap className="size-2.5" />
                        <span>{modalityLabel(e)}</span>
                      </span>
                    )}
                    {e.cancelled && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[10px] font-bold bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/30">
                        🚫 Annulée (report à fixer)
                      </span>
                    )}
                    {conflicts.length > 0 && (() => {
                      const sev = getConflictSeverity(e, conflicts);
                      const isCrit = sev === "PRESENCE_CRITICAL";
                      return (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[10px] font-bold border flex-wrap ${
                            isCrit
                              ? "bg-rose-500/15 text-rose-800 dark:text-rose-300 border-rose-500/30"
                              : "bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border-indigo-500/30"
                          }`}
                          title={
                            isCrit
                              ? "Conflit présentiel physique simultané (présence requise sur deux cours)"
                              : "Webconférence enregistrée : disponible en replay sur l'ENF"
                          }
                        >
                          {isCrit ? <AlertTriangle className="size-3" /> : <Video className="size-3" />}
                          {isCrit
                            ? `Conflit présentiel (${conflicts.map((c) => c.unit.toUpperCase()).join(", ")})`
                            : `Visio replay (${conflicts.map((c) => c.unit.toUpperCase()).join(", ")})`}
                        </span>
                      );
                    })()}
                  </div>
                  <div
                    className="flex items-center gap-1.5"
                    onClick={(ev) => ev.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => onToggleAttended?.(id)}
                      className={`px-2.5 py-1.5 sm:px-2 sm:py-1 rounded-lg sm:rounded-md text-xs sm:text-[11px] font-bold border transition-all flex items-center gap-1 cursor-pointer ${
                        isAttended
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-transparent text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700 hover:border-emerald-500"
                      }`}
                      title="Pointer cette séance comme suivie / réalisée"
                    >
                      <Check className="size-3" />
                      <span>{isAttended ? "Fait" : "Pointer"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        downloadIcs([e], `seance-${e.unit}-${e.date}.ics`)
                      }
                      className="p-2 sm:p-1.5 rounded-lg sm:rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Ajouter cette séance au calendrier (.ics)"
                    >
                      <CalendarPlus className="size-3.5" />
                    </button>
                  </div>
                </div>
                <div className="li-detail">
                  {e.teacher}
                  {` · ${city}`}
                  {e.room ? ` — ${e.room}` : ""}
                </div>
                {e.cancelReason && (
                  <div className="mt-1.5 px-2.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-1.5 font-medium">
                    <AlertTriangle className="size-3.5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    <span>{e.cancelReason}</span>
                  </div>
                )}
                {userNote && (
                  <div className="mt-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-1.5">
                    <FileText className="size-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{userNote}</span>
                  </div>
                )}
                {notes.map((n, ni) => (
                  <div
                    className={`li-note${n.fullday ? " li-fullday" : ""}`}
                    key={ni}
                  >
                    {n.text}
                  </div>
                ))}
              </div>
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
}

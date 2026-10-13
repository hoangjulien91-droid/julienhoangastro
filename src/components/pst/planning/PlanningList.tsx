import { Fragment, useEffect, useRef } from "react";
import { Check, CalendarPlus, AlertTriangle, FileText, Video } from "lucide-react";
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
        const isPast = todayIso !== null && e.date < todayIso;
        const isNext = i === nextEventIndex;
        const city = eventLocation(e) ?? "Espace Numérique de Formation";

        return (
          <Fragment key={id}>
            {showMonthHeader && (
              <li className="pt-4 pb-1.5 px-1 flex items-center justify-between border-b border-slate-300/70 dark:border-slate-700/70">
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
                    <span className="li-ue">{e.unit.toUpperCase()}</span>
                    <span className="li-time">
                      {e.start}–{e.end} ({getEventDurationHours(e)}h)
                    </span>
                    <span className="font-semibold text-xs">
                      · {modalityLabel(e)}
                    </span>
                    {conflicts.length > 0 && (() => {
                      const sev = getConflictSeverity(e, conflicts);
                      const isCrit = sev === "PRESENCE_CRITICAL";
                      return (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
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
                      className={`px-2 py-1 rounded-md text-[11px] font-bold border transition-all flex items-center gap-1 cursor-pointer ${
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
                      className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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

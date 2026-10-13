import { useState, useMemo, useRef } from "react";
import { Link } from "@/components/common/Link";
import { Maximize2, Minimize2, Crosshair } from "lucide-react";
import {
  PLANNING_EVENTS,
  UNIT_ORDER,
  UNIT_TITLES,
  type PlanningEvent,
} from "@/lib/pst/data/planning";
import {
  DAY_ABBREV,
  PLANNING_WEEKS,
  eventId,
  eventLocation,
  formatShortFrDate,
  getEventConflicts,
  getConflictSeverity,
  getNextEvent,
  getNextUnitEvent,
  getUnitTeachers,
  isoWeekKey,
  matchesFilters,
  summarizeUnit,
  type PlanningFilters,
} from "@/lib/pst/planning-stats";

const MONTH_NAMES_FULL = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

function dayOfMonth(date: string): number {
  return Number(date.split("-")[2]);
}

function shortHour(start: string): string {
  const [h, m] = start.split(":");
  const hh = String(Number(h));
  return m === "30" ? `${hh}h30` : `${hh}h`;
}

function typeLabel(e: PlanningEvent): string {
  if (e.type === "COURS") return "Cours présentiel";
  if (e.type === "WEBCONF") return "Webconférence";
  if (e.type === "DISTANT") return "Activités distantes";
  return e.session === 2 ? "Rattrapage" : "Examen";
}

function chipTitle(e: PlanningEvent, isAttended: boolean, conflicts: PlanningEvent[]): string {
  const [yStr, mStr, dStr] = e.date.split("-");
  const y = Number(yStr);
  const m = Number(mStr);
  const d = Number(dStr);
  const parts = [
    `${e.day} ${d} ${MONTH_NAMES_FULL[m - 1]} ${y}`,
    `${e.start}–${e.end}`,
    typeLabel(e),
  ];
  if (isAttended) parts.push("✓ Séance pointée (réalisée)");
  if (conflicts.length > 0) {
    const sev = getConflictSeverity(e, conflicts);
    if (sev === "PRESENCE_CRITICAL") {
      parts.push(`⛔ Conflit présentiel physique avec : ${conflicts.map((c) => c.unit.toUpperCase()).join(", ")}`);
    } else {
      parts.push(`🎥 Chevauchement Webconférence (Replay ENF possible) avec : ${conflicts.map((c) => c.unit.toUpperCase()).join(", ")}`);
    }
  }
  if (e.cluster)
    parts.push(
      "jour consécutif de présentiel à Cnam Bègles (vendredi 13/11 + samedi 14/11)",
    );
  if (e.fullday)
    parts.push("journée complète à Cnam Bègles (matin + après-midi)");
  const city = eventLocation(e) ?? "Espace Numérique de Formation";
  const place = [city, e.room].filter(Boolean).join(" — ");
  parts.push(e.teacher + (place ? ` · ${place}` : ""));
  return parts.join(" · ");
}

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
        (containerRect.width / 2) +
        (chipRect.width / 2);
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
        (containerRect.width / 2) +
        (colRect.width / 2);
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
      return;
    }

    // Fallback : première puce disponible
    const firstChip = container.querySelector(".pst-day-chip");
    if (firstChip && firstChip instanceof HTMLElement) {
      firstChip.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }

  if (visibleUnits.length === 0) {
    return <div className="note">Aucune UE sélectionnée dans les filtres.</div>;
  }

  return (
    <div className="space-y-2.5">
      {/* Barre d'ergonomie de lecture de la Frise */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold mr-1">
            Lisibilité Frise :
          </span>
          <button
            type="button"
            onClick={() => setHideEmptyWeeks((v) => !v)}
            className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
              hideEmptyWeeks
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-2xs"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
            }`}
            title="Masquer les semaines sans aucun cours pour élargir les colonnes utiles"
          >
            {hideEmptyWeeks ? (
              <Minimize2 className="size-3.5" />
            ) : (
              <Maximize2 className="size-3.5" />
            )}
            <span>
              {hideEmptyWeeks
                ? `Semaines actives (${displayedWeeks.length} sem.)`
                : `Calendrier complet (${PLANNING_WEEKS.weeks.length} sem.)`}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowHoursOnChips((v) => !v)}
            className={`px-2.5 py-1 rounded-lg font-semibold border transition-all cursor-pointer ${
              showHoursOnChips
                ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
            }`}
            title="Afficher l'heure de début directement sur chaque puce de séance"
          >
            <span>{showHoursOnChips ? "✓ Heures sur puces (18h)" : "Dates seules"}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={scrollToActiveWeek}
          className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-500 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <Crosshair className="size-3.5 text-amber-600" />
          <span>Centrer sur la prochaine séance</span>
        </button>
      </div>

      <div className="tablewrap" ref={tableWrapRef}>
        <table
          className="timeline"
          style={
            hideEmptyWeeks
              ? { minWidth: `${Math.max(920, displayedWeeks.length * 58 + 265)}px` }
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
            {visibleUnits.map((unit) => {
              const summary = summarizeUnit(unit, filters);
              const teachers = getUnitTeachers(unit);
              const unitNum = unit.replace("pst", "");
              const nextUnitEv = getNextUnitEvent(unit);
              return (
                <tr className="ue-row" key={unit}>
                  <th className="rowhead">
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={`/pst/${unitNum}/`}
                        className="ue-code hover:underline"
                        title={`Ouvrir l'atelier interactif ${unit.toUpperCase()}`}
                      >
                        {unit.toUpperCase()} · {summary.totalHours}h →
                      </Link>
                    </div>
                    <span className="ue-title">{UNIT_TITLES[unit]}</span>
                    <span className="ue-teachers">{teachers.join(", ")}</span>
                    {nextUnitEv && (
                      <button
                        type="button"
                        onClick={() => onSelectEvent?.(nextUnitEv)}
                        className="mt-1 mb-1 w-full text-left px-2 py-1 rounded-md bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-[10px] font-mono text-amber-900 dark:text-amber-200 cursor-pointer transition-colors"
                        title="Cliquer pour inspecter la prochaine séance de cette UE"
                      >
                        <b>Prochaine :</b>{" "}
                        {DAY_ABBREV[nextUnitEv.day]}.{" "}
                        {formatShortFrDate(nextUnitEv.date)} ({nextUnitEv.start}
                        –{nextUnitEv.end} ·{" "}
                        {nextUnitEv.type === "COURS"
                          ? "Cours Bègles"
                          : nextUnitEv.type === "WEBCONF"
                            ? "Visio"
                            : "Distant"}
                        )
                      </button>
                    )}
                    <div className="sum-row">
                      {summary.coursCount > 0 && (
                        <span className="sum-chip t-cours">
                          {summary.coursCount} cours
                        </span>
                      )}
                      {summary.visioCount > 0 && (
                        <span className="sum-chip t-visio">
                          {summary.visioCount} webconf.
                        </span>
                      )}
                      {summary.distantCount > 0 && (
                        <span className="sum-chip t-distant">
                          {summary.distantCount} dist.
                        </span>
                      )}
                      {summary.examenCount > 0 && (
                        <span className="sum-chip t-examen">
                          {summary.examenCount} examen
                          {summary.examenCount > 1 ? "s" : ""}
                        </span>
                      )}
                      {summary.rattrapageCount > 0 && (
                        <span className="sum-chip t-rattrap">
                          {summary.rattrapageCount} rattrapage
                          {summary.rattrapageCount > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </th>
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
                          const isNextChip = nextImmediateEvent && eventId(nextImmediateEvent) === id;
                          return (
                            <button
                              type="button"
                              key={i}
                              data-next-chip={isNextChip ? "true" : undefined}
                              onClick={() => onSelectEvent?.(e)}
                              className={[
                                "pst-day-chip w-full border-0 cursor-pointer",
                                e.type === "COURS"
                                  ? "t-cours"
                                  : e.type === "EXAMEN"
                                    ? "t-examen"
                                    : e.type === "DISTANT"
                                      ? "t-distant"
                                      : "t-visio",
                                e.session === 2 ? "t-rattrap" : "",
                                e.cluster ? "cluster" : "",
                                e.fullday ? "fullday" : "",
                                e.tbd ? "tbd" : "",
                                isSelected
                                  ? "ring-2 ring-amber-400 scale-105 z-10"
                                  : isNextChip
                                    ? "ring-2 ring-amber-500 animate-pulse scale-[1.03] z-10"
                                    : "",
                                isAttended ? "opacity-75" : "",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                              style={
                                showHoursOnChips
                                  ? {
                                      height: "auto",
                                      minHeight: 32,
                                      padding: "3px 4px",
                                      flexDirection: "column",
                                      lineHeight: 1.15,
                                    }
                                  : undefined
                              }
                              title={chipTitle(e, isAttended, conflicts)}
                            >
                              <span className="font-bold text-[10.5px]">
                                {isAttended ? "✓" : ""}
                                {DAY_ABBREV[e.day]}
                                {dayOfMonth(e.date)}
                                {conflicts.length > 0 && !isAttended
                                  ? getConflictSeverity(e, conflicts) === "PRESENCE_CRITICAL"
                                    ? "!"
                                    : "•"
                                  : ""}
                              </span>
                              {showHoursOnChips && (
                                <span className="text-[8.5px] opacity-85 font-normal tracking-tight">
                                  {shortHour(e.start)}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


import {
  PLANNING_EVENTS,
  UNIT_ORDER,
  UNIT_TITLES,
  type PlanningEvent,
} from "@/lib/pst/data/planning";
import {
  DAY_ABBREV,
  PLANNING_WEEKS,
  eventLocation,
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

function chipTitle(e: PlanningEvent): string {
  const [yStr, mStr, dStr] = e.date.split("-");
  const y = Number(yStr);
  const m = Number(mStr);
  const d = Number(dStr);
  const parts = [
    `${e.day} ${d} ${MONTH_NAMES_FULL[m - 1]} ${y}`,
    `${e.start}-${e.end}`,
  ];
  if (e.tbd)
    parts.push(`${e.tbdDay === "lundi" ? "Lundi" : "Mardi"}, jour à confirmer`);
  if (e.session === 1) parts.push("Session 1 (normale)");
  if (e.session === 2) parts.push("Session 2 (rattrapage)");
  if (e.cluster)
    parts.push(
      "jour consécutif à un autre — 1 seul trajet depuis Anglet possible avec une nuitée sur place",
    );
  if (e.fullday)
    parts.push("journée complète sur place (pas d'hébergement nécessaire)");
  const city = eventLocation(e);
  const place = [city, e.room].filter(Boolean).join(" — ");
  parts.push(e.teacher + (place ? ` · ${place}` : ""));
  return parts.join(" · ");
}

interface PlanningGridProps {
  filters: PlanningFilters;
  todayWeekKey: string | null;
}

export function PlanningGrid({ filters, todayWeekKey }: PlanningGridProps) {
  const visibleUnits = UNIT_ORDER.filter((u) => filters.units.has(u));
  const filteredEvents = PLANNING_EVENTS.filter((e) =>
    matchesFilters(e, filters),
  );

  const byUnitWeek = new Map<string, PlanningEvent[]>();
  for (const e of filteredEvents) {
    const key = `${e.unit}|${isoWeekKey(e.date)}`;
    const list = byUnitWeek.get(key);
    if (list) list.push(e);
    else byUnitWeek.set(key, [e]);
  }

  if (visibleUnits.length === 0) {
    return <div className="note">Aucune UE sélectionnée dans les filtres.</div>;
  }

  return (
    <div className="tablewrap">
      <table className="timeline">
        <thead>
          <tr className="months">
            <th className="corner" />
            {PLANNING_WEEKS.monthGroups.map((g, i) => (
              <th key={i} colSpan={g.span}>
                {g.label}
              </th>
            ))}
          </tr>
          <tr className="weeknums">
            <th className="corner">Semaine</th>
            {PLANNING_WEEKS.weeks.map((w) => (
              <th
                key={w.key}
                className={`wk${w.key === todayWeekKey ? " today-col" : ""}`}
              >
                {w.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleUnits.map((unit) => {
            const summary = summarizeUnit(unit, filters);
            const teachers = getUnitTeachers(unit);
            return (
              <tr className="ue-row" key={unit}>
                <th className="rowhead">
                  <span className="ue-code">{unit.toUpperCase()}</span>
                  <span className="ue-title">{UNIT_TITLES[unit]}</span>
                  <span className="ue-teachers">👤 {teachers.join(", ")}</span>
                  <div className="sum-row">
                    {summary.coursCount > 0 && (
                      <span className="sum-chip t-cours">
                        {summary.coursCount} j. cours
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
                    {summary.visioCount > 0 && (
                      <span className="sum-chip t-visio">
                        {summary.visioCount} visio
                      </span>
                    )}
                  </div>
                </th>
                {PLANNING_WEEKS.weeks.map((w) => {
                  const cellEvents = (
                    byUnitWeek.get(`${unit}|${w.key}`) ?? []
                  ).sort((a, b) =>
                    (a.date + a.start).localeCompare(b.date + b.start),
                  );
                  return (
                    <td
                      key={w.key}
                      className={`wk${w.key === todayWeekKey ? " today-col" : ""}`}
                    >
                      {cellEvents.map((e, i) => (
                        <span
                          key={i}
                          className={[
                            "pst-day-chip",
                            e.type === "COURS"
                              ? "t-cours"
                              : e.type === "EXAMEN"
                                ? "t-examen"
                                : "t-visio",
                            e.session === 2 ? "t-rattrap" : "",
                            e.cluster ? "cluster" : "",
                            e.fullday ? "fullday" : "",
                            e.tbd ? "tbd" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          title={chipTitle(e)}
                        >
                          {DAY_ABBREV[e.day]}
                          {dayOfMonth(e.date)}
                        </span>
                      ))}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

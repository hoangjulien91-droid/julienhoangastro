import { Link } from "@/components/common/Link";
import {
  UNIT_TITLES,
  type PlanningEvent,
  type PlanningUnitId,
} from "@/lib/pst/data/planning";
import {
  DAY_ABBREV,
  formatShortFrDate,
  getNextUnitEvent,
  getUnitTeachers,
  summarizeUnit,
  type PlanningFilters,
} from "@/lib/pst/planning-stats";

interface PlanningUnitRowHeadProps {
  unit: PlanningUnitId;
  filters: PlanningFilters;
  onSelectEvent?: (e: PlanningEvent) => void;
}

export function PlanningUnitRowHead({
  unit,
  filters,
  onSelectEvent,
}: PlanningUnitRowHeadProps) {
  const summary = summarizeUnit(unit, filters);
  const teachers = getUnitTeachers(unit);
  const unitNum = unit.replace("pst", "");
  const nextUnitEv = getNextUnitEvent(unit);

  return (
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
          <b>Prochaine :</b> {DAY_ABBREV[nextUnitEv.day]}.{" "}
          {formatShortFrDate(nextUnitEv.date)} ({nextUnitEv.start}–{nextUnitEv.end} ·{" "}
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
  );
}

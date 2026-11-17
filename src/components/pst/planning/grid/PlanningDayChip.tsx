import type { PlanningEvent } from "@/lib/pst/data/planning";
import {
  DAY_ABBREV,
  eventLocation,
  getConflictSeverity,
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

function chipTitle(
  e: PlanningEvent,
  isAttended: boolean,
  conflicts: PlanningEvent[],
): string {
  const [yStr, mStr, dStr] = e.date.split("-");
  const y = Number(yStr);
  const m = Number(mStr);
  const d = Number(dStr);
  const parts = [
    `${e.day} ${d} ${MONTH_NAMES_FULL[m - 1]} ${y}`,
    `${e.start}–${e.end}`,
    typeLabel(e),
  ];
  if (e.cancelled)
    parts.unshift("⚠️ SÉANCE ANNULÉE (report ultérieur à fixer)");
  if (isAttended) parts.push("✓ Séance pointée (réalisée)");
  if (conflicts.length > 0) {
    const sev = getConflictSeverity(e, conflicts);
    if (sev === "PRESENCE_CRITICAL") {
      parts.push(
        `⛔ Conflit présentiel physique avec : ${conflicts.map((c) => c.unit.toUpperCase()).join(", ")}`,
      );
    } else {
      parts.push(
        `🎥 Chevauchement Webconférence (Replay ENF possible) avec : ${conflicts.map((c) => c.unit.toUpperCase()).join(", ")}`,
      );
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

interface PlanningDayChipProps {
  event: PlanningEvent;
  isSelected: boolean;
  isNextChip: boolean;
  isAttended: boolean;
  conflicts: PlanningEvent[];
  showHours: boolean;
  onSelectEvent?: (e: PlanningEvent) => void;
}

export function PlanningDayChip({
  event: e,
  isSelected,
  isNextChip,
  isAttended,
  conflicts,
  showHours,
  onSelectEvent,
}: PlanningDayChipProps) {
  return (
    <button
      type="button"
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
        e.cancelled ? "opacity-60 ring-2 ring-rose-500/80" : "",
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
        showHours
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
        {e.cancelled ? "✕" : isAttended ? "✓" : ""}
        {DAY_ABBREV[e.day]}
        {dayOfMonth(e.date)}
        {conflicts.length > 0 && !isAttended && !e.cancelled
          ? getConflictSeverity(e, conflicts) === "PRESENCE_CRITICAL"
            ? "!"
            : "•"
          : ""}
      </span>
      {showHours && (
        <span
          className={`text-[8.5px] opacity-85 font-normal tracking-tight ${e.cancelled ? "text-rose-200 font-bold" : ""}`}
        >
          {e.cancelled ? "Report" : shortHour(e.start)}
        </span>
      )}
    </button>
  );
}

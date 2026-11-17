import type { PlanningEvent } from "@/lib/pst/data/planning";

export const UNIT_TITLES: Record<string, string> = {
  pst106: "Clinique de l'activité et psychologie du travail",
  pst108: "Psychologie du langage et clinique du dialogue",
  pst120: "Psychodynamique et psychopathologie du travail",
  pst123: "Le psychologue, le travail et l'emploi",
  pst124: "Transformations digitales des activités et clinique des usages",
};

/**
 * Calcule l'imminence d'une séance (Compte à rebours intelligent : Aujourd'hui dans 2h, Demain, J-2...)
 */
export function getEventImminence(
  event: PlanningEvent,
  now: Date = new Date(),
): { label: string; badgeClass: string } {
  const todayStr = now.toISOString().slice(0, 10);
  const nowMs = now.getTime();

  const startParts = event.start.split(":").map(Number);
  const startHour = startParts[0] ?? 0;
  const startMin = startParts[1] ?? 0;
  const endParts = event.end.split(":").map(Number);
  const endHour = endParts[0] ?? 0;
  const endMin = endParts[1] ?? 0;

  const eventStart = new Date(event.date + "T00:00:00");
  eventStart.setHours(startHour, startMin, 0, 0);

  const eventEnd = new Date(event.date + "T00:00:00");
  eventEnd.setHours(endHour, endMin, 0, 0);

  const startMs = eventStart.getTime();
  const endMs = eventEnd.getTime();

  if (nowMs >= startMs && nowMs <= endMs) {
    return {
      label: "En cours maintenant",
      badgeClass: "bg-rose-600 text-white border-rose-700 animate-pulse",
    };
  }

  if (event.date === todayStr) {
    const diffMs = startMs - nowMs;
    if (diffMs <= 0) {
      return {
        label: "Aujourd'hui",
        badgeClass: "bg-amber-600 text-white border-amber-700 font-extrabold",
      };
    }
    const diffHours = Math.round(diffMs / 3600000);
    if (diffHours <= 1) {
      return {
        label: "Aujourd'hui dans moins d'1h",
        badgeClass:
          "bg-amber-600 text-white border-amber-700 animate-pulse font-black",
      };
    }
    return {
      label: `Aujourd'hui dans ${diffHours}h`,
      badgeClass: "bg-amber-600 text-white border-amber-700 font-extrabold",
    };
  }

  const dEvent = new Date(event.date + "T00:00:00");
  const dToday = new Date(todayStr + "T00:00:00");
  const diffDays = Math.round((dEvent.getTime() - dToday.getTime()) / 86400000);

  if (diffDays === 1) {
    return {
      label: `Demain à ${event.start}`,
      badgeClass: "bg-indigo-600 text-white border-indigo-700 font-bold",
    };
  }
  if (diffDays === 2) {
    return {
      label: "J-2",
      badgeClass: "bg-sky-600 text-white border-sky-700 font-black",
    };
  }
  if (diffDays > 2 && diffDays <= 7) {
    return {
      label: `J-${diffDays}`,
      badgeClass: "bg-slate-800 text-white border-slate-700 font-bold",
    };
  }
  return {
    label: `Dans ${diffDays}j`,
    badgeClass:
      "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700",
  };
}

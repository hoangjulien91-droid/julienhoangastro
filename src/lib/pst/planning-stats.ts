import {
  PLANNING_EVENTS,
  type PlanningEvent,
  type PlanningEventType,
  type PlanningUnitId,
} from "./data/planning";

/**
 * Totaux et regroupements dérivés de PLANNING_EVENTS (69 séances officielles
 * issues de l'export ENF / Cnam Bègles de M. Julien HOANG : 19 Cours
 * présentiels à Cnam Bègles, 27 Webconférences, 23 Activités distantes).
 */

export interface UnitSummary {
  unit: PlanningUnitId;
  coursCount: number;
  visioCount: number;
  distantCount: number;
  examenCount: number;
  rattrapageCount: number;
  totalHours: number;
}

export function eventId(e: PlanningEvent): string {
  return `${e.unit}_${e.date}_${e.start.replace(":", "")}_${e.type}`;
}

export function getEventDurationHours(e: PlanningEvent): number {
  return eventDurationHours(e);
}

function timeToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

/**
 * Détecte les séances synchrones qui se chevauchent sur le même créneau horaire qu'une séance donnée.
 * Les activités distantes (asynchrones / travail en autonomie sur l'ENF) sont exclues des chevauchements.
 */
export function getEventConflicts(target: PlanningEvent): PlanningEvent[] {
  if (target.type === "DISTANT") return [];
  const tStart = timeToMinutes(target.start);
  const tEnd = timeToMinutes(target.end);
  const tId = eventId(target);
  return PLANNING_EVENTS.filter((other) => {
    if (other.type === "DISTANT") return false;
    if (other.date !== target.date) return false;
    if (eventId(other) === tId) return false;
    const oStart = timeToMinutes(other.start);
    const oEnd = timeToMinutes(other.end);
    return tStart < oEnd && oStart < tEnd;
  });
}

export type ConflictSeverity = "PRESENCE_CRITICAL" | "WEBCONF_REPLAYABLE";

/**
 * Détermine la criticité d'un chevauchement :
 * - "PRESENCE_CRITICAL" (Rouge) : implique au moins 2 cours présentiels physiques en même temps (ubiquité impossible).
 * - "WEBCONF_REPLAYABLE" (Bleu/Indigo) : implique des webconférences enregistrées / disponibles en replay différé sur l'ENF.
 */
export function getConflictSeverity(target: PlanningEvent, conflicts: PlanningEvent[]): ConflictSeverity {
  if (conflicts.length === 0) return "WEBCONF_REPLAYABLE";
  // Si le cours inspecté est présentiel ET qu'au moins un autre est présentiel -> conflit physique critique
  if (target.type === "COURS" && conflicts.some((c) => c.type === "COURS")) {
    return "PRESENCE_CRITICAL";
  }
  // Sinon (webconférences ou présentiel vs webconf), la webconférence offre l'alternative du replay
  return "WEBCONF_REPLAYABLE";
}

export function getAllTeachers(): string[] {
  const names = new Set<string>();
  for (const e of PLANNING_EVENTS) {
    for (const name of e.teacher.split(", ")) {
      if (name.trim()) names.add(name.trim());
    }
  }
  return Array.from(names).sort();
}

export function formatMonthLabelFr(dateStr: string): string {
  const [y, m] = dateStr.split("-");
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  const mName = monthNames[Number(m) - 1] ?? m;
  return `${mName} ${y}`;
}

function eventDurationHours(e: PlanningEvent): number {
  const [sh, sm] = e.start.split(":").map(Number);
  const [eh, em] = e.end.split(":").map(Number);
  if (
    sh === undefined ||
    sm === undefined ||
    eh === undefined ||
    em === undefined
  ) {
    return 0;
  }
  return Math.max(0, eh + em / 60 - (sh + sm / 60));
}

/**
 * Intervenant·es distinct·es d'une UE, dérivés de PLANNING_EVENTS.
 */
export function getUnitTeachers(unit: PlanningUnitId): string[] {
  const names = new Set<string>();
  for (const e of PLANNING_EVENTS) {
    if (e.unit !== unit) continue;
    for (const name of e.teacher.split(", ")) {
      if (name.trim()) names.add(name.trim());
    }
  }
  return Array.from(names);
}

/**
 * Résumé d'une UE (chips affichés en tête de ligne dans la frise) —
 * respecte les filtres actifs pour rester cohérent avec les puces visibles.
 */
export function summarizeUnit(
  unit: PlanningUnitId,
  filters?: PlanningFilters,
): UnitSummary {
  const events = PLANNING_EVENTS.filter(
    (e) => e.unit === unit && (!filters || matchesFilters(e, filters)),
  );

  const coursCount = events.filter((e) => e.type === "COURS").length;
  const visioCount = events.filter((e) => e.type === "WEBCONF").length;
  const distantCount = events.filter((e) => e.type === "DISTANT").length;
  const examenCount = events.filter(
    (e) => e.type === "EXAMEN" && e.session === 1,
  ).length;
  const rattrapageCount = events.filter(
    (e) => e.type === "EXAMEN" && e.session === 2,
  ).length;
  const totalHours = events.reduce((acc, e) => acc + eventDurationHours(e), 0);

  return {
    unit,
    coursCount,
    visioCount,
    distantCount,
    examenCount,
    rattrapageCount,
    totalHours,
  };
}

export interface GlobalPlanningTotals {
  totalEvents: number;
  coursEvents: number;
  presenceDaysTotal: number;
  visioEvents: number;
  distantEvents: number;
  examenDays: number;
  clusterDays: number;
  fulldayDays: number;
  clusterDaysLundi: number;
  clusterDaysMardi: number;
}

function countClusterDays(dates: Set<string>): number {
  const sorted = Array.from(dates).sort();
  const clusterDays = new Set<string>();
  for (let i = 0; i < sorted.length - 1; i++) {
    const day1 = sorted[i]!;
    const day2 = sorted[i + 1]!;
    const d1 = new Date(day1 + "T00:00:00Z").getTime();
    const d2 = new Date(day2 + "T00:00:00Z").getTime();
    if (d2 - d1 === 86400000) {
      clusterDays.add(day1);
      clusterDays.add(day2);
    }
  }
  return clusterDays.size;
}

export interface PresenceDaysRemaining {
  lundi: number;
  mardi: number;
  total: number;
  sessions: number;
}

function toLocalIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function toLocalDateTimeKey(d: Date): string {
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${toLocalIsoDate(d)}${hh}${mm}`;
}

/** Jours et séances de présentiel (cours à Cnam Bègles) restants à partir d'aujourd'hui. */
export function computePresenceDaysRemaining(
  now: Date = new Date(),
): PresenceDaysRemaining {
  const fromDate = toLocalIsoDate(now);
  const upcomingCours = PLANNING_EVENTS.filter(
    (e) => e.type === "COURS" && e.date >= fromDate,
  );
  const distinctDates = new Set(upcomingCours.map((e) => e.date)).size;
  return {
    lundi: distinctDates,
    mardi: distinctDates,
    total: distinctDates,
    sessions: upcomingCours.length,
  };
}

/** Séances de webconférence (BigBlueButton) restantes à partir d'aujourd'hui. */
export function computeVisioDaysRemaining(now: Date = new Date()): number {
  const fromDate = toLocalIsoDate(now);
  return PLANNING_EVENTS.filter(
    (e) => e.type === "WEBCONF" && e.date >= fromDate,
  ).length;
}

/** Séances d'activités distantes (ENF) restantes à partir d'aujourd'hui. */
export function computeDistantDaysRemaining(now: Date = new Date()): number {
  const fromDate = toLocalIsoDate(now);
  return PLANNING_EVENTS.filter(
    (e) => e.type === "DISTANT" && e.date >= fromDate,
  ).length;
}

export function computeGlobalPlanningTotals(): GlobalPlanningTotals {
  const coursList = PLANNING_EVENTS.filter((e) => e.type === "COURS");
  const presenceDates = new Set(coursList.map((e) => e.date));
  const visioList = PLANNING_EVENTS.filter((e) => e.type === "WEBCONF");
  const distantList = PLANNING_EVENTS.filter((e) => e.type === "DISTANT");
  const examenDays = new Set(
    PLANNING_EVENTS.filter((e) => e.type === "EXAMEN" && e.session === 1).map(
      (e) => e.date,
    ),
  ).size;
  const clusterDays = countClusterDays(presenceDates);
  const fulldayDays = new Set(
    coursList.filter((e) => e.fullday).map((e) => e.date),
  ).size;

  return {
    totalEvents: PLANNING_EVENTS.length,
    coursEvents: coursList.length,
    presenceDaysTotal: presenceDates.size,
    visioEvents: visioList.length,
    distantEvents: distantList.length,
    examenDays,
    clusterDays,
    fulldayDays,
    clusterDaysLundi: clusterDays,
    clusterDaysMardi: clusterDays,
  };
}

export function isoWeekKey(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00Z");
  const day = (d.getUTCDay() + 6) % 7;
  const dt = new Date(d);
  dt.setUTCDate(d.getUTCDate() - day + 3);
  const firstThursday = new Date(Date.UTC(dt.getUTCFullYear(), 0, 4));
  const week =
    1 +
    Math.round(
      ((dt.getTime() - firstThursday.getTime()) / 86400000 -
        3 +
        ((firstThursday.getUTCDay() + 6) % 7)) /
        7,
    );
  return `${dt.getUTCFullYear()}-${week}`;
}

export function formatFrDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

export function formatShortFrDate(dateStr: string): string {
  const parts = dateStr.split("-");
  if (parts.length < 3) return dateStr;
  const [, m, d] = parts;
  const monthIdx = parseInt(m, 10) - 1;
  const shortMonths = [
    "janv.", "févr.", "mars", "avr.", "mai", "juin",
    "juil.", "août", "sept.", "oct.", "nov.", "déc."
  ];
  return `${parseInt(d, 10)} ${shortMonths[monthIdx] ?? m}`;
}

const MONTH_NAMES_FULL_FR = [
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

/**
 * Source unique de vérité pour l'échéance cible d'une UE :
 * - Si un événement EXAMEN est présent pour l'UE, le retourne.
 * - Sinon, retourne la dernière séance programmée de l'UE dans PLANNING_EVENTS
 *   (clôture des cours S1 en janvier 2027 pour PST106/108/123, ou séance
 *   d'ouverture S2 en février/mars 2027 pour PST120/124).
 */
export function getExamEvent(unit: PlanningUnitId): PlanningEvent | null {
  const explicitExam = PLANNING_EVENTS.find(
    (e) => e.unit === unit && e.type === "EXAMEN" && e.session === 1,
  );
  if (explicitExam) return explicitExam;

  const unitEvents = PLANNING_EVENTS.filter((e) => e.unit === unit).sort(
    (a, b) => `${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`),
  );
  return unitEvents[unitEvents.length - 1] ?? null;
}

export function getExamDateTime(unit: PlanningUnitId): string | null {
  const target = getExamEvent(unit);
  return target ? `${target.date}T${target.start}` : null;
}

export function getExamLabel(unit: PlanningUnitId): string | null {
  const target = getExamEvent(unit);
  if (!target) return null;
  const [y, m, d] = target.date.split("-");
  const dateLabel = `${Number(d)} ${MONTH_NAMES_FULL_FR[Number(m) - 1]} ${y}`;
  if (target.type === "EXAMEN") {
    return `Examen le ${dateLabel}`;
  }
  const count = PLANNING_EVENTS.filter((e) => e.unit === unit).length;
  return count > 1
    ? `Clôture UE le ${dateLabel} (${target.start}–${target.end})`
    : `Rentrée S2 le ${dateLabel} (${target.start}–${target.end})`;
}

/** Première séance programmée pour une UE spécifique. */
export function getFirstUnitEvent(unit: PlanningUnitId): PlanningEvent | null {
  const unitEvents = PLANNING_EVENTS.filter((e) => e.unit === unit).sort(
    (a, b) => `${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`),
  );
  return unitEvents[0] ?? null;
}

/** Le prochain événement chronologique, toutes UE confondues. */
export function getNextEvent(now: Date = new Date()): PlanningEvent | null {
  const nowKey = toLocalDateTimeKey(now);
  const upcoming = PLANNING_EVENTS.filter(
    (e) => `${e.date}${e.end.replace(":", "")}` >= nowKey,
  ).sort((a, b) => `${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`));
  return upcoming[0] ?? PLANNING_EVENTS[0] ?? null;
}

/** Toutes les séances programmées à venir (ou en cours), triées chronologiquement. */
export function getAllUpcomingEvents(now: Date = new Date()): PlanningEvent[] {
  const nowKey = toLocalDateTimeKey(now);
  const upcoming = PLANNING_EVENTS.filter(
    (e) => `${e.date}${e.end.replace(":", "")}` >= nowKey,
  ).sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
  return upcoming.length > 0 ? upcoming : PLANNING_EVENTS;
}

/** La prochaine séance en webconférence (Visio / BBB) chronologique. */
export function getNextWebconfEvent(now: Date = new Date()): PlanningEvent | null {
  const nowKey = toLocalDateTimeKey(now);
  const upcoming = PLANNING_EVENTS.filter(
    (e) => e.type === "WEBCONF" && `${e.date}${e.end.replace(":", "")}` >= nowKey,
  ).sort((a, b) => `${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`));
  return upcoming[0] ?? PLANNING_EVENTS.find((e) => e.type === "WEBCONF") ?? null;
}

/** La prochaine séance en présentiel (physique à Cnam Bègles) chronologique. */
export function getNextPhysicalEvent(now: Date = new Date()): PlanningEvent | null {
  const nowKey = toLocalDateTimeKey(now);
  const upcoming = PLANNING_EVENTS.filter(
    (e) => e.type === "COURS" && `${e.date}${e.end.replace(":", "")}` >= nowKey,
  ).sort((a, b) => `${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`));
  return upcoming[0] ?? PLANNING_EVENTS.find((e) => e.type === "COURS") ?? null;
}

/** Le prochain événement chronologique pour une UE spécifique. */
export function getNextUnitEvent(
  unit: PlanningUnitId,
  now: Date = new Date(),
): PlanningEvent | null {
  const nowKey = toLocalDateTimeKey(now);
  const upcoming = PLANNING_EVENTS.filter(
    (e) => e.unit === unit && `${e.date}${e.end.replace(":", "")}` >= nowKey,
  ).sort((a, b) => `${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`));
  return upcoming[0] ?? null;
}

/** Toutes les séances programmées dans les N prochains jours. */
export function getUpcomingEventsWithin(
  days: number,
  now: Date = new Date(),
): PlanningEvent[] {
  const todayStr = toLocalIsoDate(now);
  const limitStr = toLocalIsoDate(new Date(now.getTime() + days * 86400000));
  return PLANNING_EVENTS.filter(
    (e) => e.date >= todayStr && e.date <= limitStr,
  ).sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
}

/** Séances de présentiel (cours à Cnam Bègles) dans les N prochains jours. */
export function getPresenceDaysWithin(
  days: number,
  now: Date = new Date(),
): PlanningEvent[] {
  const todayStr = toLocalIsoDate(now);
  const limitStr = toLocalIsoDate(new Date(now.getTime() + days * 86400000));
  return PLANNING_EVENTS.filter(
    (e) =>
      (e.type === "COURS" || e.type === "EXAMEN") &&
      e.date >= todayStr &&
      e.date <= limitStr,
  ).sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
}

/**
 * Lieu où se tient la séance :
 * - Tous les cours présentiels (COURS) ont lieu au Cnam Bègles
 *   (2 rue Marc Sangnier, Cité du Numérique, 33130 Bègles).
 * - Les Webconférences (WEBCONF) et Activités distantes (DISTANT) ont lieu
 *   en ligne sur l'Espace Numérique de Formation (BigBlueButton / Dans votre UE).
 */
export function eventLocation(e: PlanningEvent): "Cnam Bègles" | null {
  if (e.type === "WEBCONF" || e.type === "DISTANT") return null;
  return "Cnam Bègles";
}

export const DAY_ABBREV: Record<string, string> = {
  Lundi: "Lu",
  Mardi: "Ma",
  Mercredi: "Me",
  Jeudi: "Je",
  Vendredi: "Ve",
  Samedi: "Sa",
  Dimanche: "Di",
};

export interface PlanningFilters {
  units: Set<PlanningUnitId>;
  types: Set<PlanningEventType>;
  sessions: Set<1 | 2>;
  teacher?: string;
  search?: string;
  onlyConflicts?: boolean;
  hidePast?: boolean;
  todayIso?: string | null;
}

export function matchesFilters(e: PlanningEvent, f: PlanningFilters): boolean {
  if (!f.units.has(e.unit)) return false;
  if (!f.types.has(e.type)) return false;
  if (e.session !== null && !f.sessions.has(e.session)) return false;
  if (f.teacher && f.teacher !== "all" && !e.teacher.includes(f.teacher)) {
    return false;
  }
  if (f.hidePast && f.todayIso && e.date < f.todayIso) {
    return false;
  }
  if (f.onlyConflicts && getEventConflicts(e).length === 0) {
    return false;
  }
  if (f.search && f.search.trim()) {
    const q = f.search.trim().toLowerCase();
    const hay = [
      e.unit,
      e.date,
      formatFrDate(e.date),
      e.day,
      e.teacher,
      e.room ?? "",
      e.type === "COURS"
        ? "cours bègles présentiel"
        : e.type === "WEBCONF"
          ? "webconférence visio bigbluebutton"
          : "activités distantes enf",
    ]
      .join(" ")
      .toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

export interface WeekColumn {
  key: string;
  monday: Date;
  weekNum: number;
  label: string;
  rangeLabel: string;
  monthLabel: string;
}

export interface MonthGroup {
  label: string;
  span: number;
}

const MONTH_NAMES_FR = [
  "Jan",
  "Fév",
  "Mar",
  "Avr",
  "Mai",
  "Juin",
  "Juil",
  "Août",
  "Sep",
  "Oct",
  "Nov",
  "Déc",
];

function mondayOf(date: Date): Date {
  const d = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  const day = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - day);
  return d;
}

export function buildWeekColumns(events: PlanningEvent[]): {
  weeks: WeekColumn[];
  monthGroups: MonthGroup[];
} {
  const times = events.map((e) => new Date(e.date + "T00:00:00Z").getTime());
  const startMonday = mondayOf(new Date(Math.min(...times)));
  const endMonday = mondayOf(new Date(Math.max(...times)));

  const weeks: WeekColumn[] = [];
  const cursor = new Date(startMonday);
  while (cursor.getTime() <= endMonday.getTime()) {
    const key = isoWeekKey(cursor.toISOString().slice(0, 10));
    const weekNum = Number(key.split("-")[1]);
    const monthLabel = `${MONTH_NAMES_FR[cursor.getUTCMonth()]} ${cursor.getUTCFullYear()}`;
    const sunday = new Date(cursor);
    sunday.setUTCDate(sunday.getUTCDate() + 6);
    const dStart = String(cursor.getUTCDate()).padStart(2, "0");
    const dEnd = String(sunday.getUTCDate()).padStart(2, "0");
    const mEnd = String(sunday.getUTCMonth() + 1).padStart(2, "0");
    const rangeLabel = `${dStart}–${dEnd}/${mEnd}`;
    weeks.push({
      key,
      monday: new Date(cursor),
      weekNum,
      label: `S${weekNum}`,
      rangeLabel,
      monthLabel,
    });
    cursor.setUTCDate(cursor.getUTCDate() + 7);
  }

  const monthGroups: MonthGroup[] = [];
  for (const w of weeks) {
    const label = w.monthLabel;
    const last = monthGroups[monthGroups.length - 1];
    if (last && last.label === label) last.span++;
    else monthGroups.push({ label, span: 1 });
  }

  return { weeks, monthGroups };
}

/** Précalculé une seule fois : les colonnes de la frise ne dépendent pas des filtres. */
export const PLANNING_WEEKS = buildWeekColumns(PLANNING_EVENTS);

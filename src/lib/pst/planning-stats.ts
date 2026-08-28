import {
  PLANNING_EVENTS,
  type PlanningEvent,
  type PlanningEventType,
  type PlanningUnitId,
} from "./data/planning";

/**
 * Totaux et regroupements dérivés de PLANNING_EVENTS. Tout est recalculé
 * depuis la donnée brute (aucun total codé en dur) sauf "joursPresentiel"
 * (cf. commentaire) qui dépend d'une alternative lundi/mardi non résolue
 * pour PST120 — trancher entre les deux options change le compte.
 */

export interface UnitSummary {
  unit: PlanningUnitId;
  coursCount: number;
  examenCount: number;
  rattrapageCount: number;
  visioCount: number;
}

function isoWeekMonday(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00Z");
  const day = (d.getUTCDay() + 6) % 7;
  const monday = new Date(d);
  monday.setUTCDate(d.getUTCDate() - day);
  return monday.toISOString().slice(0, 10);
}

/**
 * Intervenant·es distinct·es d'une UE, dérivés de PLANNING_EVENTS (pas de
 * liste codée en dur à maintenir à part) — le champ `teacher` combine
 * parfois plusieurs noms séparés par ", " (ex. jury d'examen), d'où le
 * split avant dédoublonnage.
 */
export function getUnitTeachers(unit: PlanningUnitId): string[] {
  const names = new Set<string>();
  for (const e of PLANNING_EVENTS) {
    if (e.unit !== unit) continue;
    for (const name of e.teacher.split(", ")) names.add(name);
  }
  return Array.from(names);
}

/**
 * Résumé d'une UE (chips "X j. cours / Y examens / Z rattrapages / W visio"
 * affichés en tête de ligne dans la frise) — respecte les filtres actifs
 * pour rester cohérent avec les puces effectivement visibles sur cette même
 * ligne. Avant ce paramètre, les chips affichaient toujours les totaux
 * annuels complets même UE/type/session décochés, ce qui semblait indiquer
 * que le filtrage ne fonctionnait pas.
 */
export function summarizeUnit(
  unit: PlanningUnitId,
  filters?: PlanningFilters,
): UnitSummary {
  const events = PLANNING_EVENTS.filter(
    (e) => e.unit === unit && (!filters || matchesFilters(e, filters)),
  );

  const coursConfirmed = new Set(
    events.filter((e) => e.type === "COURS" && !e.tbd).map((e) => e.date),
  );
  const coursTbdWeeks = new Set(
    events
      .filter((e) => e.type === "COURS" && e.tbd)
      .map((e) => isoWeekMonday(e.date)),
  );
  const visioCount = new Set(
    events.filter((e) => e.type === "WEBCONF").map((e) => e.date),
  ).size;
  const examenCount = events.filter(
    (e) => e.type === "EXAMEN" && e.session === 1,
  ).length;
  const rattrapageCount = events.filter(
    (e) => e.type === "EXAMEN" && e.session === 2,
  ).length;

  return {
    unit,
    coursCount: coursConfirmed.size + coursTbdWeeks.size,
    examenCount,
    rattrapageCount,
    visioCount,
  };
}

export interface GlobalPlanningTotals {
  /** Jours d'examen distincts (session normale), tous UE confondues. */
  examenDays: number;
  /**
   * Jours faisant partie d'un enchaînement d'au moins 2 jours consécutifs de
   * présentiel, toutes UE confondues (ce qui compte pour "un seul trajet",
   * c'est d'être sur place le lendemain — peu importe pour quelle UE : par
   * ex. 15/01 PST123 + 16/01 PST106/PST123 forment un cluster bien que ce ne
   * soit pas la même UE). Dépend du jour de groupe PST120, non confirmé : le
   * mardi ajoute le pont du rattrapage (12→13→14/04, PST120 mardi comble
   * l'écart entre les examens PST106/PST123 du 12 et PST108 du 14) que le
   * lundi ne crée pas.
   */
  clusterDaysLundi: number;
  clusterDaysMardi: number;
}

function distinctPresenceDates(events: PlanningEvent[]): Set<string> {
  return new Set(
    events
      .filter((e) => e.type === "COURS" || e.type === "EXAMEN")
      .map((e) => e.date),
  );
}

/**
 * Jours de cours (hors examens) distincts, à partir d'une date donnée — pour
 * PST120 (jour de groupe non confirmé), ne compte que les séances tbd du
 * jour choisi. Fusionne automatiquement les jours partagés entre UE (ex.
 * 16/01/2027, où PST106 et PST123 ont cours le même samedi) : c'est un Set
 * de dates, pas une somme d'événements.
 */
function presenceDaysForPst120Scenario(
  day: "lundi" | "mardi",
  fromDate: string,
): Set<string> {
  const confirmed = PLANNING_EVENTS.filter(
    (e) => e.type === "COURS" && !e.tbd && e.date >= fromDate,
  ).map((e) => e.date);
  const pst120 = PLANNING_EVENTS.filter(
    (e) =>
      e.type === "COURS" && e.tbd && e.tbdDay === day && e.date >= fromDate,
  ).map((e) => e.date);
  return new Set([...confirmed, ...pst120]);
}

export interface PresenceDaysRemaining {
  lundi: number;
  mardi: number;
}

/** Jours de présentiel (cours) restants à partir d'aujourd'hui. */
export function computePresenceDaysRemaining(
  now: Date = new Date(),
): PresenceDaysRemaining {
  const fromDate = now.toISOString().slice(0, 10);
  return {
    lundi: presenceDaysForPst120Scenario("lundi", fromDate).size,
    mardi: presenceDaysForPst120Scenario("mardi", fromDate).size,
  };
}

/** Jours de visio restants à partir d'aujourd'hui. */
export function computeVisioDaysRemaining(now: Date = new Date()): number {
  const fromDate = now.toISOString().slice(0, 10);
  return new Set(
    PLANNING_EVENTS.filter(
      (e) => e.type === "WEBCONF" && e.date >= fromDate,
    ).map((e) => e.date),
  ).size;
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

function clusterDaysForPst120Scenario(day: "lundi" | "mardi"): number {
  const withoutPst120Tbd = PLANNING_EVENTS.filter(
    (e) => !(e.unit === "pst120" && e.tbd),
  );
  const baseDates = distinctPresenceDates(withoutPst120Tbd);
  const pst120Dates = PLANNING_EVENTS.filter(
    (e) => e.unit === "pst120" && e.tbd && e.tbdDay === day,
  ).map((e) => e.date);
  return countClusterDays(new Set([...baseDates, ...pst120Dates]));
}

export function computeGlobalPlanningTotals(): GlobalPlanningTotals {
  const examenDays = new Set(
    PLANNING_EVENTS.filter((e) => e.type === "EXAMEN" && e.session === 1).map(
      (e) => e.date,
    ),
  ).size;

  return {
    examenDays,
    clusterDaysLundi: clusterDaysForPst120Scenario("lundi"),
    clusterDaysMardi: clusterDaysForPst120Scenario("mardi"),
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
 * Source unique de vérité pour les dates d'examen (session normale). Avant
 * ces fonctions, la même date était recopiée à la main dans 6 endroits
 * (study-index.json + un EXAM_DATE par page module) — désynchronisés dès
 * qu'une seule copie changeait.
 */
export function getExamEvent(unit: PlanningUnitId): PlanningEvent | null {
  return (
    PLANNING_EVENTS.find(
      (e) => e.unit === unit && e.type === "EXAMEN" && e.session === 1,
    ) ?? null
  );
}

export function getExamDateTime(unit: PlanningUnitId): string | null {
  const exam = getExamEvent(unit);
  return exam ? `${exam.date}T${exam.start}` : null;
}

export function getExamLabel(unit: PlanningUnitId): string | null {
  const exam = getExamEvent(unit);
  if (!exam) return null;
  const [y, m, d] = exam.date.split("-");
  return `Examen le ${Number(d)} ${MONTH_NAMES_FULL_FR[Number(m) - 1]} ${y}`;
}

/** Le prochain événement chronologique, toutes UE confondues. */
export function getNextEvent(now: Date = new Date()): PlanningEvent | null {
  const nowKey = now.toISOString().slice(0, 16).replace("T", "");
  const upcoming = PLANNING_EVENTS.filter(
    (e) => `${e.date}${e.start}`.replace(":", "") >= nowKey,
  ).sort((a, b) => `${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`));
  return upcoming[0] ?? null;
}

/** Jours de présentiel (cours ou examen, pas de visio) dans les N prochains jours. */
export function getPresenceDaysWithin(
  days: number,
  now: Date = new Date(),
): PlanningEvent[] {
  const todayStr = now.toISOString().slice(0, 10);
  const limitStr = new Date(now.getTime() + days * 86400000)
    .toISOString()
    .slice(0, 10);
  return PLANNING_EVENTS.filter(
    (e) => e.type !== "WEBCONF" && e.date >= todayStr && e.date <= limitStr,
  ).sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
}

/**
 * Ville où se tient la séance. Les cours sont en présentiel à Bordeaux, sauf
 * PST106 (Mme LUTUMBA Priska) dont les cours ont lieu à Dax — seule
 * exception connue à date. Les examens sont toujours à Dax, les visios
 * n'impliquent aucun déplacement.
 */
export function eventLocation(e: PlanningEvent): "Bordeaux" | "Dax" | null {
  if (e.type === "WEBCONF") return null;
  if (e.type === "EXAMEN") return "Dax";
  return e.unit === "pst106" ? "Dax" : "Bordeaux";
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
}

export function matchesFilters(e: PlanningEvent, f: PlanningFilters): boolean {
  if (!f.units.has(e.unit)) return false;
  if (!f.types.has(e.type)) return false;
  if (e.session !== null && !f.sessions.has(e.session)) return false;
  return true;
}

export interface WeekColumn {
  key: string;
  monday: Date;
  weekNum: number;
  label: string;
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
    weeks.push({
      key,
      monday: new Date(cursor),
      weekNum,
      label: `S${weekNum}`,
    });
    cursor.setUTCDate(cursor.getUTCDate() + 7);
  }

  const monthGroups: MonthGroup[] = [];
  for (const w of weeks) {
    const label = `${MONTH_NAMES_FR[w.monday.getUTCMonth()]} ${w.monday.getUTCFullYear()}`;
    const last = monthGroups[monthGroups.length - 1];
    if (last && last.label === label) last.span++;
    else monthGroups.push({ label, span: 1 });
  }

  return { weeks, monthGroups };
}

/** Précalculé une seule fois : les colonnes de la frise ne dépendent pas des filtres. */
export const PLANNING_WEEKS = buildWeekColumns(PLANNING_EVENTS);

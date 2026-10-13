import {
  PLANNING_EVENTS,
  UNIT_TITLES,
  type PlanningEvent,
} from "./data/planning";
import { eventLocation } from "./planning-stats";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function icsDateTime(date: string, time: string): string {
  const [y, m, d] = date.split("-");
  const [h, min] = time.split(":");
  return `${y}${m}${d}T${h}${min}00`;
}

function escapeIcsText(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function locationFor(e: PlanningEvent): string {
  const city = eventLocation(e);
  if (!city) {
    return e.room
      ? `Espace Numérique de Formation — Salle ${e.room}`
      : "Espace Numérique de Formation — BigBlueButton";
  }
  return e.room
    ? `Cnam Bègles (2 rue Marc Sangnier, Cité du Numérique, 33130 Bègles) — ${e.room}`
    : "Cnam Bègles (2 rue Marc Sangnier, Cité du Numérique, 33130 Bègles)";
}

function summaryFor(e: PlanningEvent): string {
  const unit = e.unit.toUpperCase();
  if (e.type === "EXAMEN")
    return e.session === 2 ? `${unit} — Rattrapage` : `${unit} — Examen`;
  if (e.type === "WEBCONF") return `${unit} — Webconférence`;
  if (e.type === "DISTANT") return `${unit} — Activités distantes`;
  return `${unit} — Cours`;
}

export function buildIcs(events: PlanningEvent[]): string {
  const now = new Date();
  const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ateliers PST//Planning CNAM 2026-2027//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Planning CNAM · Titre RNCP 7 Psychologue du Travail",
    "X-WR-TIMEZONE:Europe/Paris",
  ];

  events.forEach((e, i) => {
    const title = UNIT_TITLES[e.unit] || e.unit.toUpperCase();
    const desc = `${e.unit.toUpperCase()} : ${title} CO (6 ECTS) — Intervenant(e) : ${e.teacher}`;
    lines.push(
      "BEGIN:VEVENT",
      `UID:pst-planning-${e.unit}-${e.date}-${e.start.replace(":", "")}-${i}@harmonie-minerale`,
      `DTSTAMP:${stamp}`,
      `DTSTART;TZID=Europe/Paris:${icsDateTime(e.date, e.start)}`,
      `DTEND;TZID=Europe/Paris:${icsDateTime(e.date, e.end)}`,
      `SUMMARY:${escapeIcsText(summaryFor(e))}`,
      `LOCATION:${escapeIcsText(locationFor(e))}`,
      `DESCRIPTION:${escapeIcsText(desc)}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
    );
  });

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function downloadIcs(
  events?: PlanningEvent[] | unknown,
  filename = "planning-pst-cnam.ics",
) {
  const list = Array.isArray(events)
    ? (events as PlanningEvent[])
    : PLANNING_EVENTS;
  const ics = buildIcs(list);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** Génère un lien direct d'ajout d'événement dans Google Calendar en 1 clic */
export function buildGoogleCalendarUrl(e: PlanningEvent): string {
  const title = `[CNAM ${e.unit.toUpperCase()}] ${
    e.type === "COURS"
      ? "Cours Présentiel Bègles"
      : e.type === "WEBCONF"
        ? "Webconférence"
        : "Activité ENF"
  }`;
  const dClean = e.date.replace(/-/g, "");
  const sClean = e.start.replace(":", "") + "00";
  const eClean = e.end.replace(":", "") + "00";
  const dates = `${dClean}T${sClean}/${dClean}T${eClean}`;
  const location = locationFor(e);
  const details = `${UNIT_TITLES[e.unit] || e.unit.toUpperCase()} · Enseignant : ${e.teacher} · Planning : https://julienhoang.com/pst/planning/`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&ctz=Europe/Paris&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
}


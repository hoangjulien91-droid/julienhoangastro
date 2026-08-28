import type { PlanningEvent } from "./data/planning";
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
  if (!city) return "Web-conférence";
  return e.room ? `${city} — ${e.room}` : city;
}

function summaryFor(e: PlanningEvent): string {
  const unit = e.unit.toUpperCase();
  if (e.type === "EXAMEN")
    return e.session === 2 ? `${unit} — Rattrapage` : `${unit} — Examen`;
  if (e.type === "WEBCONF") return `${unit} — Visio`;
  return e.tbd ? `${unit} — Cours (jour à confirmer)` : `${unit} — Cours`;
}

export function buildIcs(events: PlanningEvent[]): string {
  const now = new Date();
  const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ateliers PST//Planning CNAM 2026-2027//FR",
    "CALSCALE:GREGORIAN",
  ];

  events.forEach((e, i) => {
    lines.push(
      "BEGIN:VEVENT",
      `UID:pst-planning-${e.unit}-${e.date}-${e.start.replace(":", "")}-${i}@harmonie-minerale`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${icsDateTime(e.date, e.start)}`,
      `DTEND:${icsDateTime(e.date, e.end)}`,
      `SUMMARY:${escapeIcsText(summaryFor(e))}`,
      `LOCATION:${escapeIcsText(locationFor(e))}`,
      `DESCRIPTION:${escapeIcsText(e.teacher)}`,
      "END:VEVENT",
    );
  });

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function downloadIcs(
  events: PlanningEvent[],
  filename = "planning-pst-cnam.ics",
) {
  const ics = buildIcs(events);
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

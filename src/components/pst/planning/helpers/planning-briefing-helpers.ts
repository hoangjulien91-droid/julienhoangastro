"use client";

import studyIndexData from "@/lib/pst/data/study-index.json";
import {
  type PlanningEvent,
  UNIT_TITLES,
} from "@/lib/pst/data/planning";
import { formatFrDate, eventLocation } from "@/lib/pst/planning-stats";

export interface GlossaryTerm {
  w: string;
  def: string;
  m: string;
}

export const ALL_GLOSSARY_TERMS = ((
  studyIndexData as unknown as { glossaire: GlossaryTerm[] }
).glossaire ?? []) as GlossaryTerm[];

export function extractUnitConcepts(
  unit: string,
  sessionIndex: number | null,
): GlossaryTerm[] {
  const normalizedUnit = unit.toLowerCase();
  const shortUnit = normalizedUnit.replace("pst", "");
  const allForUnit = ALL_GLOSSARY_TERMS.filter(
    (term) =>
      term.m.toLowerCase() === normalizedUnit ||
      term.m.toLowerCase() === shortUnit,
  );
  if (allForUnit.length <= 3) return allForUnit;
  const offset = (((sessionIndex ?? 1) - 1) * 3) % allForUnit.length;
  const picked: GlossaryTerm[] = [];
  for (let i = 0; i < 3; i++) {
    picked.push(allForUnit[(offset + i) % allForUnit.length]!);
  }
  return picked;
}

export function buildBriefingText(
  event: PlanningEvent,
  unitConcepts: GlossaryTerm[],
  selectedNote?: string,
): string {
  return [
    `[BRIEFING CNAM] ${event.unit.toUpperCase()} — ${UNIT_TITLES[event.unit]}`,
    `📅 Séance : ${event.day} ${formatFrDate(event.date)} (${event.start} – ${event.end})`,
    `📍 Lieu : ${event.room ?? eventLocation(event) ?? "ENF"}`,
    `👤 Intervenant : ${event.teacher}`,
    "",
    "🧠 CONCEPTS CLÉS DE L'UE :",
    ...unitConcepts.map((c) => `• ${c.w} : ${c.def}`),
    selectedNote ? `\n📝 NOTE PERSONNELLE : ${selectedNote}` : "",
    `\n🔗 Planning interactif : https://julienhoang.com/pst/planning/`,
  ]
    .filter(Boolean)
    .join("\n");
}

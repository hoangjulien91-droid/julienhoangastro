import type { BiblioReference } from "./biblio-vault-data";
import { playClickSound, playSuccessSound } from "../audio-feedback";

export function exportAllApa7(
  filteredReferences: BiblioReference[],
  selectedUe: string,
): void {
  playClickSound();
  const sorted = [...filteredReferences].sort((a, b) =>
    a.apa7Full.localeCompare(b.apa7Full, "fr"),
  );
  const lines = [
    "# Bibliographie Académique Norme APA 7e Édition — CNAM Psychologie du Travail",
    "",
    ...sorted.map((r) => `- ${r.apa7Full}`),
  ];
  const blob = new Blob([lines.join("\n")], {
    type: "text/markdown;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Bibliographie_APA7_CNAM_${selectedUe}.md`;
  a.click();
  URL.revokeObjectURL(url);
  playSuccessSound();
}

export function exportBibtex(filteredReferences: BiblioReference[]): void {
  playClickSound();
  const sorted = [...filteredReferences].sort((a, b) =>
    a.apa7Full.localeCompare(b.apa7Full, "fr"),
  );
  const entries = sorted.map((r) => {
    const citeKey =
      (r.authors.split(",")[0] || "cnam")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "") + (r.year || "2026");
    return `@article{${citeKey},\n  author = {${r.authors}},\n  title = {${r.title}},\n  year = {${r.year}},\n  journal = {${r.publisherOrJournal}}\n}`;
  });
  const content = [
    "% Bibliographie BibTeX — CNAM Psychologie du Travail",
    "",
    ...entries,
  ].join("\n\n");
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Bibliographie_CNAM.bib";
  a.click();
  URL.revokeObjectURL(url);
  playSuccessSound();
}

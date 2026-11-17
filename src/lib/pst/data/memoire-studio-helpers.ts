import {
  type StudioStorageState,
  PROJECTION_META,
  MEMOIRE_SECTIONS,
  RNCP_GUARD_CHECKS,
} from "./memoire-studio-data";

export function calculateIntegrityFingerprint(
  state: StudioStorageState,
  totalWords: number,
  checkedCount: number,
): string {
  const raw = `${state.title}|${state.projection}|${totalWords}|${checkedCount}`;
  let hash = 2166136261;
  for (let i = 0; i < raw.length; i++) {
    hash ^= raw.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `CNAM-RNCP7-${(hash >>> 0).toString(16).toUpperCase().padStart(8, "0")}`;
}

export function buildMarkdownExport(
  state: StudioStorageState,
  integrityFingerprint: string,
  guardReadinessPct: number,
): string {
  const pMeta = PROJECTION_META[state.projection];
  const lines = [
    `# ${state.title}`,
    `**Format** : ${pMeta.headerBadge}`,
    `**Terrain / Structure** : ${state.terrainOrg}`,
    `**Année universitaire** : ${state.academicYear}`,
    `**Empreinte d'intégrité méthodologique** : \`${integrityFingerprint}\` (${guardReadinessPct}% conformité RNCP 7)`,
    "",
    "---",
    "",
  ];

  MEMOIRE_SECTIONS.forEach((sec) => {
    lines.push(`## ${sec.number}. ${sec.title} (${sec.ueRef})`);
    lines.push("");
    lines.push(state.sections[sec.id] || "*[Section en cours de rédaction]*");
    lines.push("");
  });

  lines.push("---");
  lines.push(
    "## Grille de Conformité Méthodologique & Déontologique (Pre-Defense Guard)",
  );
  RNCP_GUARD_CHECKS.forEach((chk) => {
    const mark = state.checks[chk.id] ? "[x]" : "[ ]";
    lines.push(`- ${mark} **${chk.label}** (${chk.rule})`);
  });

  return lines.join("\n");
}

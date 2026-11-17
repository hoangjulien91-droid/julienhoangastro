import {
  PIEGES_PSYCHOLOGISATION,
  AUTEURS_CANONIQUES_S1,
  type PiegeLangageItem,
  type TargetUeFilter,
  type AuteurCanoniqueItem,
} from "./correcteur-copie-data";

export interface AnalyzedAuteur extends AuteurCanoniqueItem {
  hasConcept: boolean;
  matchesTargetUe: boolean;
}

export interface CopieAnalysis {
  motsCount: number;
  phrasesCount: number;
  hasRealSentences: boolean;
  hasQuestion: boolean;
  hasDialectique: boolean;
  hasSynthese: boolean;
  piegesDetectes: PiegeLangageItem[];
  auteursPresents: AnalyzedAuteur[];
  auteursArticules: AnalyzedAuteur[];
  auteursNameDropping: AnalyzedAuteur[];
  isHorsSujetUe: boolean;
  ptsProblematisation: number;
  ptsAuteurs: number;
  ptsClinique: number;
  ptsPosture: number;
  noteSur20: number;
  score: number;
}

export function analyzeCopie(
  texteCopie: string,
  targetUe: TargetUeFilter,
): CopieAnalysis {
  // Analyse psychologisation
  const piegesDetectes = PIEGES_PSYCHOLOGISATION.filter((p) => {
    const regex = new RegExp(p.motifRegex.source, "i");
    return regex.test(texteCopie);
  });

  // Analyse auteurs + vérification de l'articulation conceptuelle (anti name-dropping)
  const auteursPresents: AnalyzedAuteur[] = AUTEURS_CANONIQUES_S1.filter((a) =>
    new RegExp(`\\b${a.nom}\\b`, "i").test(texteCopie),
  ).map((a) => {
    const hasConcept = a.conceptsRegex.test(texteCopie);
    const matchesTargetUe =
      targetUe === "ALL" ||
      a.ues.includes(targetUe as "PST106" | "PST108" | "PST123" | "PST120" | "PST124");
    return {
      ...a,
      hasConcept,
      matchesTargetUe,
    };
  });

  const auteursArticules = auteursPresents.filter((a) => a.hasConcept);
  const auteursNameDropping = auteursPresents.filter((a) => !a.hasConcept);
  const auteursDansUeCible = auteursPresents.filter((a) => a.matchesTargetUe);
  const isHorsSujetUe =
    targetUe !== "ALL" && auteursPresents.length > 0 && auteursDansUeCible.length === 0;

  const motsCount = texteCopie.trim() ? texteCopie.trim().split(/\s+/).length : 0;

  // Détection anti-bourrage de mots-clés (vérifie la présence de vraies phrases construites)
  const phrases = texteCopie
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 6);
  const hasRealSentences = phrases.length >= 2 && motsCount >= 35;
  const penaltyFactor = !texteCopie.trim() ? 0 : hasRealSentences ? 1 : 0.45;

  // 1. Problématisation & Architecture Dialectique (/4 pts)
  const hasQuestion =
    /\?|dans quelle mesure|en quoi|comment expliquer|à quelles conditions/i.test(texteCopie);
  const hasDialectique =
    /\b(or|cependant|toutefois|néanmoins|en revanche|tandis que|alors que|paradoxe|tension)\b/i.test(
      texteCopie,
    );
  const hasSynthese =
    /\b(dès lors|ainsi|par conséquent|en somme|c'est pourquoi|il en résulte|finalement)\b/i.test(
      texteCopie,
    );

  const rawProblematisation =
    (hasQuestion ? 1.5 : 0.5) + (hasDialectique ? 1.5 : 0) + (hasSynthese ? 1 : 0);
  const ptsProblematisation = Math.round(rawProblematisation * penaltyFactor * 2) / 2;

  // 2. Rigueur Conceptuelle & Auteurs articulés (/8 pts)
  let rawAuteurs =
    auteursArticules.filter((a) => a.matchesTargetUe).length * 2.5 +
    auteursNameDropping.filter((a) => a.matchesTargetUe).length * 1.0 +
    auteursPresents.filter((a) => !a.matchesTargetUe).length * 1.0 +
    (motsCount >= 60 && auteursArticules.length >= 2 ? 0.5 : 0);

  if (isHorsSujetUe) {
    rawAuteurs = Math.min(2.5, rawAuteurs);
  }
  const ptsAuteurs = Math.min(8, Math.round(rawAuteurs * penaltyFactor * 2) / 2);

  // 3. Ancrage Clinique & Travail Réel (/5 pts)
  const termesCliniques = [
    "prescrit",
    "réel",
    "activité",
    "opérateur",
    "collectif",
    "genre",
    "compromis",
    "reconnaissance",
    "pouvoir d'agir",
    "terrain",
    "marge",
    "régulation",
    "transaction",
    "habitus",
    "illocutoire",
    "instrument",
    "sublimation",
  ].filter((t) => new RegExp(t, "i").test(texteCopie));
  const ptsClinique = Math.min(
    5,
    Math.round(termesCliniques.length * 1.25 * penaltyFactor * 2) / 2,
  );

  // 4. Posture Anti-Psychologisation (/3 pts)
  const ptsPosture = !texteCopie.trim()
    ? 0
    : Math.max(0, Math.round((3 - piegesDetectes.length * 1.5) * penaltyFactor * 2) / 2);

  const noteSur20 = Math.min(
    20,
    Math.round((ptsProblematisation + ptsAuteurs + ptsClinique + ptsPosture) * 2) / 2,
  );

  // Score académique global (/100)
  let score = 100;
  score -= piegesDetectes.length * 15;
  score -= auteursNameDropping.length * 8;
  if (isHorsSujetUe) score -= 25;
  score = Math.max(0, score);

  return {
    motsCount,
    phrasesCount: phrases.length,
    hasRealSentences,
    hasQuestion,
    hasDialectique,
    hasSynthese,
    piegesDetectes,
    auteursPresents,
    auteursArticules,
    auteursNameDropping,
    isHorsSujetUe,
    ptsProblematisation,
    ptsAuteurs,
    ptsClinique,
    ptsPosture,
    noteSur20,
    score,
  };
}

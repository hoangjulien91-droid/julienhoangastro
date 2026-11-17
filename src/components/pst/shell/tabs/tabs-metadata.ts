"use client";

import type { ReactNode, ComponentType } from "react";
import {
  BookOpen,
  Target,
  GraduationCap,
  BarChart2,
} from "lucide-react";

export interface TabDef {
  id: string;
  label: string;
  content: ReactNode;
  /** Famille d'onglets (libellé affiché comme séparateur dans la barre). */
  group?: string;
}

/**
 * Familles d'onglets communes à tous les modules.
 */
export const TAB_GROUP_ORDER = ["Suivi", "Apprendre", "S'entraîner", "Examen"];

export const GROUP_BY_ID: Record<string, string> = {
  accueil: "Suivi",
  parcours: "Suivi",
  ad: "Suivi",
  errors: "Suivi",
  outils: "Suivi",

  schemas: "Apprendre",
  seances: "Apprendre",
  fiches: "Apprendre",
  lexique: "Apprendre",
  frise: "Apprendre",
  mindmap: "Apprendre",
  recits: "Apprendre",
  debats: "Apprendre",
  bonus: "Apprendre",
  buhler: "Apprendre",
  ressources: "Apprendre",
  ponts: "Apprendre",

  cartes: "S'entraîner",
  entrainement: "S'entraîner",
  qcm: "S'entraîner",
  qui: "S'entraîner",
  pieges: "S'entraîner",
  distinguer: "S'entraîner",
  cloze: "S'entraîner",
  feynman: "S'entraîner",
  simulateur: "S'entraîner",
  matrice: "S'entraîner",
  thermo: "S'entraîner",
  langage: "S'entraîner",
  biographie: "S'entraîner",

  redac: "Examen",
  cas: "Examen",
  protocole: "Examen",
  atelier: "Examen",
  examen: "Examen",
  exam: "Examen",
  antiseche: "Examen",
  sosie: "Examen",
  deonto: "Examen",
  tribunal: "Examen",
  diagnostic: "Examen",
  iod: "Examen",
  autoconfrontation: "Examen",
  audit: "Examen",
};

export interface PillarDef {
  id: string;
  label: string;
  shortLabel: string;
  icon: ComponentType<{ className?: string }>;
  accentColor: string;
  badgeBg: string;
}

export const PILLARS: PillarDef[] = [
  {
    id: "Suivi",
    label: "Suivi & Cadre",
    shortLabel: "Suivi",
    icon: BarChart2,
    accentColor: "text-sky-600 dark:text-sky-400",
    badgeBg: "bg-sky-500/10 text-sky-800 dark:text-sky-300 border-sky-500/20",
  },
  {
    id: "Apprendre",
    label: "Leçons & Fiches",
    shortLabel: "Leçons",
    icon: BookOpen,
    accentColor: "text-amber-600 dark:text-amber-400",
    badgeBg: "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/20",
  },
  {
    id: "S'entraîner",
    label: "Quiz & Entraînement",
    shortLabel: "Quiz",
    icon: Target,
    accentColor: "text-purple-600 dark:text-purple-400",
    badgeBg: "bg-purple-500/10 text-purple-800 dark:text-purple-300 border-purple-500/20",
  },
  {
    id: "Examen",
    label: "Épreuve & Examen",
    shortLabel: "Examen",
    icon: GraduationCap,
    accentColor: "text-rose-600 dark:text-rose-400",
    badgeBg: "bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/20",
  },
];

export function cleanTabLabel(label: string): string {
  return label
    .replace(/\s*◆\s*/g, "")
    .replace(/\s*✦\s*/g, "")
    .trim();
}

/**
 * Libellés canoniques par défaut pour harmoniser l'expérience utilisateur
 * entre modules.
 */
export const CANONICAL_LABELS: Record<string, string> = {
  accueil: "Accueil",
  parcours: "Parcours",
  errors: "Carnet d'Erreurs",
  ad: "Activités Distantes (AD)",
  outils: "Boîte à Outils",

  seances: "Séances & Cours",
  fiches: "Fiches de Cours",
  lexique: "Lexique",
  schemas: "Galerie Visuelle",
  mindmap: "Carte Mentale",
  frise: "Frise Chronologique",
  ressources: "Ressources Officielles",
  debats: "Débats & Controverses",
  recits: "Récits Cliniques",
  bonus: "Bonus & Approfondissements",

  cartes: "Flashcards",
  entrainement: "Quiz & Entraînement",
  qcm: "QCM",
  cloze: "Citations à Trous",
  qui: "Qui a dit quoi ?",
  pieges: "Pièges Vrai/Faux",
  distinguer: "Distinguer",
  simulateur: "Simulateur de Cas",
  feynman: "Feynman Sandbox",

  examen: "Examen Blanc",
  exam: "Examen Blanc",
  redac: "Rédaction & Plan",
  cas: "Études de Cas",
  protocole: "Protocole d'Intervention",
  atelier: "Annales & Atelier",
  antiseche: "Antisèche",
  diagnostic: "Labo Diagnostic Clinique",
  autoconfrontation: "Simulateur Autoconfrontation",
  iod: "Négociation & Démarche IOD",
  langage: "Décodeur Langage & Performativité",
  matrice: "Matrice Dubar & Sainsaulieu",
  deonto: "Tribunal Déontologique",
  biographie: "Récits de Vie (Bourdieu & Hughes)",
};

export const CANONICAL_TAB_ORDER: Record<string, number> = {
  // --- 1. Suivi & Cadre ---
  accueil: 10,
  parcours: 20,
  errors: 30,
  ad: 40,
  outils: 50,

  // --- 2. Leçons & Fiches (Apprendre) ---
  seances: 100,
  fiches: 110,
  lexique: 120,
  schemas: 130,
  mindmap: 140,
  frise: 150,
  ressources: 160,
  debats: 170,
  recits: 180,
  bonus: 190,
  buhler: 195,
  ponts: 198,

  // --- 3. Quiz & Entraînement (S'entraîner) ---
  cartes: 200,
  entrainement: 205,
  qcm: 210,
  cloze: 220,
  qui: 230,
  pieges: 240,
  distinguer: 250,
  simulateur: 260,
  matrice: 265,
  biographie: 270,
  langage: 275,
  thermo: 280,
  feynman: 290,

  // --- 4. Épreuve & Examen (Examen) ---
  examen: 300,
  exam: 300,
  redac: 310,
  cas: 320,
  protocole: 330,
  atelier: 340,
  antiseche: 350,
  diagnostic: 360,
  autoconfrontation: 365,
  iod: 370,
  deonto: 375,
  tribunal: 380,
  sosie: 385,
  audit: 390,
};

/**
 * Annote chaque onglet avec sa famille et trie les onglets selon l'ordre
 * canonique par pilier, puis selon l'ordre défini dans CANONICAL_TAB_ORDER.
 */
export function groupTabs(tabs: TabDef[]): TabDef[] {
  const annotated = tabs.map((t) => {
    const rawLabel = cleanTabLabel(t.label);
    const displayLabel =
      rawLabel.startsWith("Carnet d'Erreurs")
        ? rawLabel
        : CANONICAL_LABELS[t.id] ?? rawLabel;
    return {
      ...t,
      label: displayLabel,
      group: t.group ?? GROUP_BY_ID[t.id] ?? "S'entraîner",
    };
  });
  return annotated
    .slice()
    .sort((a, b) => {
      const groupDiff =
        TAB_GROUP_ORDER.indexOf(a.group) - TAB_GROUP_ORDER.indexOf(b.group);
      if (groupDiff !== 0) return groupDiff;
      const orderA = CANONICAL_TAB_ORDER[a.id] ?? 999;
      const orderB = CANONICAL_TAB_ORDER[b.id] ?? 999;
      return orderA - orderB;
    });
}

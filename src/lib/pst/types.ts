export interface QcmItem {
  q: string;
  opts: string[];
  correct: number;
  exp: string;
}

/** Assertion vrai/faux : [texte, réponse correcte, explication] */
export type PiegesItem = [string, boolean, string];

/** Citation à attribuer : [citation, clé auteur correcte, explication] */
export type QuiItem = [string, string, string];

export type AMap = Record<string, string>;

export interface Flashcard {
  id: string;
  axis: string;
  tag: string;
  q: string;
  a: string;
  deep: string;
  /** Optional tier used by modules that split their deck into "coeur"/"bonus" cards (e.g. pst106). */
  category?: "coeur" | "bonus";
}

export interface FicheItem {
  a: string;
  t: string;
  ess: string;
  ph: string;
  ex: string;
  trap: string;
}

export interface LexiqueItem {
  w: string;
  a: string;
  def: string;
  eg?: string;
}

export interface DistinguerGroup {
  pair: [string, string];
  a: string;
  crit: string;
  items: [string, number][];
}

export type ClozeSegment = string | { h: string };
export type ClozeItem = [string, ClozeSegment[]];

/** [sujet, points de plan, corrigé HTML] */
export type RedacItem = [string, string[], string];

export interface CaseOption {
  label: string;
  ok: boolean;
  fb: string;
}
export interface CaseItem {
  vignette: string;
  q1: { prompt: string; options: CaseOption[] };
  q2: { prompt: string; options: CaseOption[] };
}

export interface FriseEntry {
  annee: string;
  titre: string;
  desc: string;
}

export interface SimOption {
  label: string;
  score: number;
  fb: string;
}
export interface SimStep {
  worker: string;
  prompt: string;
  options: SimOption[];
}
export interface SimScenario {
  key: string;
  title: string;
  persona: string;
  context: string;
  principes: string[];
  steps: SimStep[];
}

export interface MindmapLink {
  to: string;
  rel: string;
}
export interface MindmapNode {
  label: string;
  s: string;
  a: string;
  x: number;
  y: number;
  links: MindmapLink[];
}
export type MindmapNodes = Record<string, MindmapNode>;

export interface ProtoStep {
  n: number;
  t: string;
  role: string;
  d: string;
}

export interface AtelierSujet {
  t: string;
  grid: string[];
  corrige: string;
}

export interface ParcoursPhase {
  id: string;
  title: string;
  fenetre: string;
  desc: string;
  onglets: [string, string][];
  items: string[];
}

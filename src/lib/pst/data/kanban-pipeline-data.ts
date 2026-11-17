export type KanbanStage =
  | "cadrage"
  | "assimilation"
  | "terrain_redaction"
  | "pret_valide";

export interface KanbanCardItem {
  id: string;
  code: string;
  title: string;
  deliverableType: string;
  ects: number;
  stage: KanbanStage;
  notes: string;
  isCustom?: boolean;
}

export interface KanbanStageConfig {
  id: KanbanStage;
  label: string;
  subtitle: string;
  badgeClass: string;
  headerBorder: string;
}

export const STAGES: KanbanStageConfig[] = [
  {
    id: "cadrage",
    label: "1. Cadrage & Exploration",
    subtitle: "Lecture du syllabus & repérage des auteurs",
    badgeClass:
      "bg-slate-500/15 text-slate-600 dark:text-slate-300 border-slate-500/30",
    headerBorder: "border-t-slate-400",
  },
  {
    id: "assimilation",
    label: "2. Fiches & Assimilation SM-2",
    subtitle: "Conceptualisation & controverses théoriques",
    badgeClass:
      "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    headerBorder: "border-t-amber-500",
  },
  {
    id: "terrain_redaction",
    label: "3. Terrain & Dossier Clinique",
    subtitle: "Analyse de l'activité réelle & verbatims",
    badgeClass:
      "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    headerBorder: "border-t-indigo-500",
  },
  {
    id: "pret_valide",
    label: "4. Prêt Partiel / Validé ECTS",
    subtitle: "Sujet blanc validé & Pre-Defense Guard 100%",
    badgeClass:
      "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    headerBorder: "border-t-emerald-500",
  },
];

export const DEFAULT_CARDS: KanbanCardItem[] = [
  {
    id: "kb-pst106",
    code: "PST106",
    title:
      "Clinique de l'activité et psychologie du travail (15 oct. → 23 janv. 2027)",
    deliverableType: "Examen écrit — Sam. 23 janv. 2027 (Bègles)",
    ects: 6,
    stage: "terrain_redaction",
    notes:
      "Articuler Wisner/Leplat (Tâche prescrite vs Activité réelle) et Clot (Genre, Style, Pouvoir d'agir).",
  },
  {
    id: "kb-pst123",
    code: "PST123",
    title:
      "Le psychologue, le travail et l'emploi (Démarrage Sam. 17 oct. 2026 Bègles → 28 janv. 2027)",
    deliverableType: "Étude de cas déontologique & Bilan (6 cours Bègles)",
    ects: 6,
    stage: "assimilation",
    notes:
      "Maîtriser le Code 2021, la triangulation de la demande, l'art. L. 6313-4 et les modèles RPS (Karasek/Siegrist).",
  },
  {
    id: "kb-pst108",
    code: "PST108",
    title:
      "Psychologie du langage et clinique du dialogue (22 oct. → 20 janv. 2027)",
    deliverableType:
      "Analyse de corpus dialogique & Verbatims (9 cours Bègles)",
    ects: 6,
    stage: "assimilation",
    notes:
      "Mobiliser Vygotski (Pensée et langage), Bakhtine (Dialogisme), Bühler et Austin (Actes de langage).",
  },
  {
    id: "kb-pst120",
    code: "PST120",
    title:
      "Psychodynamique et psychopathologie du travail (Ouverture 22 fév. 2027)",
    deliverableType: "Dissertation clinique PDT & Soutenance",
    ects: 6,
    stage: "cadrage",
    notes:
      "Maîtriser Dejours & Molinier : souffrance/plaisir, stratégies collectives de défense, jugements d'utilité et de beauté.",
  },
  {
    id: "kb-pst124",
    code: "PST124",
    title:
      "Transformations digitales des activités et clinique des usages (Ouverture 10 mars 2027)",
    deliverableType: "Audit ergonomique & Genèse instrumentale",
    ects: 6,
    stage: "cadrage",
    notes:
      "Distinguer Artefact / Instrument (Rabardel, 1995), Système d'activité (Engeström) et Acceptation située (Bobillier Chaumon).",
  },
  {
    id: "kb-uapst",
    code: "UAPST",
    title: "Mémoire Professionnel & Soutenance Finale RNCP Niveau 7",
    deliverableType: "Mémoire clinique + Jury CNAM",
    ects: 30,
    stage: "cadrage",
    notes:
      "Passage de la commande sociale à la demande co-construite + Pre-Defense Guard.",
  },
];

export const STORAGE_KEY = "pst_kanban_pipeline_v2";

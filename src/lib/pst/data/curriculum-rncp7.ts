export interface ModuleProgress {
  id: string;
  code: string;
  title: string;
  ects: number;
  status: "valide" | "en_cours" | "a_venir";
  sitePath?: string;
  level: number;
  note?: string;
  prereq?: string;
}

export const CURRICULUM_STORAGE_KEY = "cnam_pst_curriculum_progress_v1";

// Référentiel complet RNCP 7 Titre Psychologue du Travail (212 ECTS officiels)
export const TOTAL_CURRICULUM_ECTS = 212;

export const INITIAL_CURRICULUM_MODULES: ModuleProgress[] = [
  // Niveau 1 (22 ECTS)
  {
    id: "pst001",
    code: "PST 001",
    title: "Statistiques & Initiation psychologie",
    ects: 4,
    status: "valide",
    level: 1,
    note: "Éligible VES",
    prereq:
      "Niveau Bac+2 recommandé. Éligible à la Validation des Études Supérieures (VES).",
  },
  {
    id: "pst002",
    code: "PST 002",
    title: "Intro psychologie clinique",
    ects: 6,
    status: "valide",
    level: 1,
    prereq:
      "Aucun pré-requis strict. Socle fondamental recommandé avant d'aborder la spécialisation.",
  },
  {
    id: "pst003",
    code: "PST 003",
    title: "Intro psychologie sociale des orgs",
    ects: 6,
    status: "valide",
    level: 1,
    prereq:
      "Notions de base en sociologie ou psychologie générale utiles mais non obligatoires.",
  },
  {
    id: "pst004",
    code: "PST 004",
    title: "Intro psychologie du travail & ergo",
    ects: 6,
    status: "valide",
    level: 1,
    prereq:
      "Compréhension de base de l'activité humaine en situation de production ou de service.",
  },

  // Niveau 2 (30 ECTS)
  {
    id: "pst105",
    code: "PST 105",
    title: "Différences interindividuelles & tests",
    ects: 6,
    status: "valide",
    level: 2,
    prereq:
      "PST001 (statistiques descriptives et inférentielles) indispensable pour la psychométrie.",
  },
  {
    id: "pst106",
    code: "PST 106",
    title: "Clinique de l'activité (Pr. Clot)",
    ects: 6,
    status: "valide",
    sitePath: "/pst/106",
    level: 2,
    prereq:
      "PST004 recommandé. Notions d'ergonomie francophone et d'activité réelle.",
  },
  {
    id: "pst107",
    code: "PST 107",
    title: "Psychologie cognitive du travail",
    ects: 6,
    status: "valide",
    level: 2,
    prereq:
      "PST004 ou connaissances des modèles de traitement de l'information et de charge mentale.",
  },
  {
    id: "pst108",
    code: "PST 108",
    title: "Clinique du dialogue & langage",
    ects: 6,
    status: "valide",
    sitePath: "/pst/108",
    level: 2,
    prereq:
      "PST106 recommandé. Cadre conceptuel bakhtinien et analyse du discours en situation.",
  },
  {
    id: "pst109",
    code: "PST 109",
    title: "Psychopathologie du travail",
    ects: 6,
    status: "valide",
    level: 2,
    prereq:
      "PST002 (clinique) et PST004 (travail). Notions de défenses psychiques et de souffrance.",
  },

  // Niveau 3 (40 ECTS) — Cœur Spécialisation
  {
    id: "pst120",
    code: "PST 120",
    title: "Psychodynamique travail (Dejours)",
    ects: 6,
    status: "valide",
    sitePath: "/pst/120",
    level: 3,
    prereq:
      "PST109 ou PST002. Théorie de la subversion ordinaire, reconnaissance et éthique.",
  },
  {
    id: "pst121",
    code: "PST 121",
    title: "Épistémologie & Méthodes recherche",
    ects: 6,
    status: "valide",
    level: 3,
    prereq:
      "Niveau Licence validé. Préparation indispensable aux exigences de recherche du mémoire.",
  },
  {
    id: "pst122",
    code: "PST 122",
    title: "Intervention en psychosociologie",
    ects: 6,
    status: "valide",
    level: 3,
    prereq:
      "PST003 (psychologie sociale). Posture clinique d'intervention et analyse institutionnelle.",
  },
  {
    id: "pst123",
    code: "PST 123",
    title: "Insertion, emploi & transitions",
    ects: 6,
    status: "valide",
    sitePath: "/pst/123",
    level: 3,
    prereq:
      "Compréhension des dispositifs d'insertion, politiques d'emploi et de la méthode IOD.",
  },
  {
    id: "pst124",
    code: "PST 124",
    title: "Usage des TIC & acceptation située",
    ects: 6,
    status: "valide",
    sitePath: "/pst/124",
    level: 3,
    prereq:
      "PST106 ou PST107. Théories de l'activité, genèse instrumentale (Rabardel) et modèles d'usage.",
  },
  {
    id: "drf114",
    code: "DRF 114",
    title: "Droit du travail & relations pro",
    ects: 4,
    status: "valide",
    level: 3,
    note: "Éligible VES",
    prereq:
      "Code du travail, instances représentatives (CSE, CSSCT) et responsabilité juridique.",
  },
  {
    id: "ang100",
    code: "ANG 100",
    title: "Anglais professionnel (Bullelingua)",
    ects: 6,
    status: "valide",
    level: 3,
    note: "Niveau B2 requis",
    prereq:
      "Attestation niveau B2 (Bulats, Toeic > 785 ou validation interne CNAM Bullelingua).",
  },

  // Niveau 4 (60 ECTS) — Master 2 / Stage & Pratique
  {
    id: "pst218",
    code: "PST 218",
    title: "Analyse des pratiques & Déontologie",
    ects: 6,
    status: "en_cours",
    level: 4,
    prereq:
      "Code de déontologie des psychologues (1996/2021). Analyse réflexive des postures de stage.",
  },
  {
    id: "pst219",
    code: "PST 219",
    title: "Diagnostic & RPS (Santé au travail)",
    ects: 6,
    status: "en_cours",
    level: 4,
    prereq:
      "PST106 + PST120. Méthodologie d'enquête clinique et indicateurs de santé au travail.",
  },
  {
    id: "stage",
    code: "STAGE",
    title: "Stage professionnel encadré (500h)",
    ects: 48,
    status: "a_venir",
    level: 4,
    note: "500h sous tuteur psychologue du travail",
    prereq:
      "Accord préalable du responsable pédagogique + Convention tripartite + Tuteur Psychologue enregistré ADELI.",
  },

  // Niveau 5 (60 ECTS) — Recherche & Soutenance Mémoire
  {
    id: "pst220",
    code: "PST 220",
    title: "Méthodologie du mémoire & Séminaire",
    ects: 12,
    status: "a_venir",
    level: 5,
    note: "Pré-requis : Cursus + 2 ans exp pro + Agrément",
    prereq:
      "Validation complète du cursus + 2 ans d'expérience pro + Agrément officiel de recherche.",
  },
  {
    id: "memoire",
    code: "MÉMOIRE",
    title: "Soutenance du mémoire de Titre 7",
    ects: 48,
    status: "a_venir",
    level: 5,
    prereq:
      "Dépôt validé du mémoire de fin d'études + Autorisation de soutenance devant le Grand Jury national CNAM.",
  },
];

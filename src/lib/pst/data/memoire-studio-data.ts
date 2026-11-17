export type StudioProjection =
  | "jury_cnam"
  | "commanditaire_terrain"
  | "journal_clinique";

export interface MemoireSection {
  id: string;
  number: string;
  title: string;
  ueRef: string;
  guidance: string;
  placeholder: string;
}

export const MEMOIRE_SECTIONS: MemoireSection[] = [
  {
    id: "commande_demande",
    number: "I",
    title: "De la Commande Sociale à la Demande d'Intervention",
    ueRef: "PST106 · PST123",
    guidance:
      "Distinguez la commande initiale (direction/RH/CSE) des demandes implicites des opérateurs. Explicitez la reformulation ergonomique et clinique opérée lors du cadrage.",
    placeholder:
      "1. Contexte socio-technique et historique de la structure...\n2. Formulation initiale de la commande institutionnelle...\n3. Déplacement vers l'analyse du travail réel et reformulation de la demande...",
  },
  {
    id: "cadre_theorique",
    number: "II",
    title: "Problématisation & Articulation Clinique / Ergonomique",
    ueRef: "PST106 · PST123 · PST124",
    guidance:
      "Mettez en tension au moins deux courants du CNAM (ex: Ergonomie de l'activité & Clinique de l'activité, ou Psychodynamique du travail & Genèse instrumentale).",
    placeholder:
      "1. État de l'art ciblé (distinction Tâche prescrite / Activité réelle — Leplat & Hoc, 1983)...\n2. Apports de la Clinique de l'activité (Quatre dimensions du métier — Clot, 2008) ou de la Psychodynamique (Dejours, 1993)...\n3. Hypothèses cliniques et ergonomiques guidant l'investigation...",
  },
  {
    id: "dispositif_methodologique",
    number: "III",
    title: "Dispositif Méthodologique, Cadre Déontologique & Corpus",
    ueRef: "PST106 · PST108 · PST120",
    guidance:
      "Justifiez le dispositif d'observation et d'entretien (autoconfrontation simple/croisée, instruction au sosie, chroniques d'activité) et les garanties d'anonymat (Code de déontologie 2021).",
    placeholder:
      "1. Architecture du dispositif d'intervention (Comité de pilotage, Groupe de métier)...\n2. Garanties déontologiques : consentement éclairé, volontariat, confidentialité des verbatims...\n3. Protocole de recueil des traces d'activité et d'analyse dialogique (Bakhtine / Vygotski)...",
  },
  {
    id: "analyse_empirique",
    number: "IV",
    title: "Analyse Clinique du Travail Réel & Controverses de Métier",
    ueRef: "PST106 · PST123 · PST124",
    guidance:
      "Analysez précisément des séquences d'activité situées et des extraits de dialogues professionnels. Montrez comment l'activité empêchée ou les dilemmes éthiques sont mis en mouvement.",
    placeholder:
      "1. Chronique et observables de la situation de travail choisie (variabilités, régulations, catachrèses)...\n2. Analyse micro-dialogique des verbatims d'autoconfrontation (dilemmes de métier, controverse sur le travail bien fait)...\n3. Effets développementaux observés sur le pouvoir d'agir individuel et collectif...",
  },
  {
    id: "preconisations_reflexivite",
    number: "V",
    title: "Transformations Durables & Posture Réflexive du Praticien",
    ueRef: "PST108 · PST123 · PST124",
    guidance:
      "Dépassez le catalogue de recommandations descendantes : détaillez les transformations co-construites (organisationnelles, techniques, dialogiques) et votre propre posture d'intervenant.",
    placeholder:
      "1. Pistes de transformation co-construites avec le collectif et instituées en Comité de pilotage...\n2. Pérennisation des espaces de discussion sur le travail (délibération sur la qualité du travail)...\n3. Retour réflexif sur les limites de l'intervention, les résistances rencontrées et la posture clinique...",
  },
];

export interface GuardCheckItem {
  id: string;
  label: string;
  category: string;
  rule: string;
}

export const RNCP_GUARD_CHECKS: GuardCheckItem[] = [
  {
    id: "distinction_commande_demande",
    label:
      "Passage explicite de la commande institutionnelle à la demande co-construite",
    category: "Cadrage",
    rule: "Exigence Jury CNAM",
  },
  {
    id: "ecart_prescrit_reel",
    label:
      "Analyse documentée de l'écart Tâche prescrite / Activité réelle (situations situées)",
    category: "Ergonomie",
    rule: "PST106 / Leplat & Hoc",
  },
  {
    id: "verbatims_anonymises",
    label:
      "Verbatims authentiques intégralement anonymisés (aucun nom ni site identifiable)",
    category: "Déontologie",
    rule: "Code 2021 · Art. 7 & 19",
  },
  {
    id: "consentement_volontariat",
    label:
      "Mention explicite du volontariat et du consentement éclairé des opérateurs",
    category: "Éthique",
    rule: "Principe I · Respect",
  },
  {
    id: "dialogue_courants",
    label:
      "Mise en dialogue critique d'au moins 2 courants (Clinique, PDT, Ergonomie, Genèse)",
    category: "Épistémologie",
    rule: "Attendu RNCP Niveau 7",
  },
  {
    id: "refus_psittacisme",
    label:
      "Concepts théoriques systématiquement reliés à des observables empiriques du terrain",
    category: "Rigueur",
    rule: "Anti-psittacisme",
  },
  {
    id: "normes_apa7",
    label:
      "Citations dans le texte et bibliographie finale conformes aux normes APA 7e édition",
    category: "Académique",
    rule: "Standard APA 7",
  },
  {
    id: "posture_reflexive",
    label:
      "Analyse réflexive de la place de l'intervenant et des effets sur le cadre social",
    category: "Posture",
    rule: "Compétence RNCP 7",
  },
];

export const STORAGE_KEY = "pst_memoire_studio_v1";

export interface StudioStorageState {
  title: string;
  terrainOrg: string;
  academicYear: string;
  projection: StudioProjection;
  sections: Record<string, string>;
  checks: Record<string, boolean>;
}

export const DEFAULT_STATE: StudioStorageState = {
  title:
    "Intervention clinique et ergonomique sur la régulation de la charge et le pouvoir d'agir",
  terrainOrg: "Secteur médico-social / Industrie de process (Anonymisé)",
  academicYear: "2026-2027",
  projection: "jury_cnam",
  sections: {
    commande_demande:
      "L'intervention trouve son origine dans une commande formulée par la direction d'établissement, initialement centrée sur « l'accompagnement au changement suite à la réorganisation des plannings et la montée d'indicateurs d'absentéisme ». \n\nConformément à la démarche d'analyse ergonomique et clinique du travail (Wisner, 1995 ; Clot, 2008), les premiers entretiens exploratoires et observations ouvertes ont permis de déplacer cette commande centrée sur les individus vers une demande d'analyse des contradictions organisationnelles entravant la réalisation d'un « travail bien fait ».",
    cadre_theorique:
      "Notre cadre théorique articule deux perspectives complémentaires de l'école du CNAM :\n- D'une part, l'ergonomie de l'activité (Leplat & Hoc, 1983 ; Daniellou, 2005), afin d'objectiver l'écart irréductible entre la tâche prescrite par les nouveaux logiciels de planification et l'activité réelle de régulation déployée par les professionnels face aux variabilités du terrain.\n- D'autre part, la clinique de l'activité (Clot, 1999, 2008), qui permet d'appréhender la souffrance non comme un déficit individuel d'adaptation, mais comme une « activité empêchée » liée à l'affaiblissement du genre professionnel (dimension transpersonnelle du métier).",
    dispositif_methodologique:
      "Le dispositif méthodologique repose sur une architecture tripartite garantissant la sécurité déontologique des participants (Code de déontologie des psychologues, révision 2021) :\n1. Un Comité de Pilotage paritaire (Direction, CSE, SST) garant du cadre institué.\n2. Un Groupe de Métier composé de 6 professionnels volontaires.\n3. Deux cycles d'observations situées suivis d'autoconfrontations simples puis croisées, où les traces de l'activité deviennent l'objet d'un dialogue contradictoire sur les critères de qualité du travail.",
    analyse_empirique:
      "L'analyse des séquences d'activité met en lumière de nombreuses catachrèses (Rabardel, 1995) : les opérateurs détournent les fiches de liaison numériques pour maintenir une coordination orale indispensable à la sécurité du collectif.\n\nLors des séances d'autoconfrontation croisée, une controverse majeure émerge autour de la gestion des urgences : ce qui apparaissait initialement comme un conflit interpersonnel se révèle être un dilemme de métier entre respect strict de la cadence prescrite et préservation de la qualité relationnelle avec l'usager.",
    preconisations_reflexivite:
      "Plutôt qu'un catalogue de préconisations prescriptives externes, l'intervention a permis d'instituer deux transformations co-construites :\n- La révision des marges de manœuvre temporelles lors des relèves d'équipe, redonnant une fonction délibérative aux transmissions.\n- L'intégration d'un temps d'analyse des situations critiques animé par les référents métier.\n\nSur le plan réflexif, le maintien d'une posture de tiers-garant du cadre dialogique a nécessité de résister aux demandes d'évaluation individuelle pour maintenir le travail réel au centre des délibérations.",
  },
  checks: {
    distinction_commande_demande: true,
    ecart_prescrit_reel: true,
    verbatims_anonymises: true,
    consentement_volontariat: true,
    dialogue_courants: true,
    refus_psittacisme: false,
    normes_apa7: false,
    posture_reflexive: true,
  },
};

export const PROJECTION_META: Record<
  StudioProjection,
  { label: string; subtitle: string; headerBadge: string }
> = {
  jury_cnam: {
    label: "Jury CNAM RNCP 7",
    subtitle:
      "Version académique intégrale (articulation théorico-clinique & bibliographie APA 7)",
    headerBadge: "DOSSIER SOUTENANCE RNCP NIVEAU 7 · CNAM",
  },
  commanditaire_terrain: {
    label: "Restitution Commanditaire / CSE",
    subtitle:
      "Synthèse opérationnelle centrée sur le travail réel, anonymisée et orientée transformations",
    headerBadge: "RAPPORT DE RESTITUTION PARITAIRE · COPIL / CSE",
  },
  journal_clinique: {
    label: "Journal d'Observation Clinique",
    subtitle:
      "Chroniques d'activité, observables ergonomiques et notes réflexives confidentielles",
    headerBadge: "CARNET DE TERRAIN CONFIDENTIEL · SECRET PROFESSIONNEL",
  },
};

/**
 * PST124 — Psychologie des transitions digitales et technologies émergentes
 * Corpus de référence & Textes canoniques des enseignants
 */

export interface Pst124OfficialResource {
  id: string;
  category:
    | "instrument_rabardel"
    | "usage_bobillier"
    | "activite_engestrom"
    | "ia_algorithmes"
    | "ergonomie_tic";
  authorFilter:
    | "Pierre Rabardel"
    | "Marc-Éric Bobillier Chaumon"
    | "Yrjö Engeström"
    | "Gérard Valléry & Flore Barcellini"
    | "Dominique Méda";
  title: string;
  authors: string;
  year: string;
  sourceOrPublisher: string;
  seanceNumber: string;
  description: string;
  keyTakeaway: string;
  apa7Citation: string;
  tags: string[];
  url?: string;
}

export const PST124_OFFICIAL_RESOURCES: Pst124OfficialResource[] = [
  {
    id: "res-rabardel-hommes-technologies",
    category: "instrument_rabardel",
    categoryLabel: "Approche Instrumentale Fondatrice",
    authorFilter: "Pierre Rabardel",
    title: "Les hommes et les technologies : Approche cognitive des instruments contemporains",
    authors: "Pierre Rabardel",
    year: "1995",
    sourceOrPublisher: "Armand Colin (Collection U Psychologie)",
    seanceNumber: "Séance 2 & 3",
    description:
      "L'ouvrage séminal de la psychologie ergonomique des artefacts. Distinction capitale entre l'Artefact (l'objet technique matériel ou logiciel conçu par les ingénieurs) et l'Instrument (l'artefact investi par le travailleur avec ses schèmes d'utilisation singuliers : Instrument = Artefact + Schèmes). Démontre la double genèse instrumentale : 1) L'instrumentalisation (le travailleur modifie, bricole, personnalise l'artefact pour l'adapter à sa pratique) ; 2) L'instrumentation (l'artefact transforme en retour les schèmes cognitifs et gestuels du sujet).",
    keyTakeaway:
      "La référence numéro 1 de PST124 : à citer systématiquement face à tout logiciel ou outil numérique pour réfuter le déterminisme technologique.",
    apa7Citation:
      "Rabardel, P. (1995). Les hommes et les technologies : Approche cognitive des instruments contemporains. Armand Colin.",
    tags: ["Rabardel", "Genèse instrumentale", "Artefact", "Instrument", "Instrumentation", "Instrumentalisation"],
  },
  {
    id: "res-bobillier-acceptabilite-usages",
    category: "usage_bobillier",
    categoryLabel: "Clinique des Usages Numériques",
    authorFilter: "Marc-Éric Bobillier Chaumon",
    title: "Les transformations digitales à l'épreuve de l'activité : Acceptation située et technologies capacitantes",
    authors: "Marc-Éric Bobillier Chaumon",
    year: "2013 / 2021",
    sourceOrPublisher: "Dunod / Le Travail Humain",
    seanceNumber: "Séance 3 & 4",
    description:
      "Analyse de l'écart entre acceptabilité a priori (les questionnaires d'intentions managériaux) et acceptation située dans l'activité réelle. Démontre qu'une technologie peut être séduisante sur le papier mais se révéler incapacitante sur le terrain si elle rigidifie les procédures, crée une surcharge informationnelle (infobésité) ou empêche les régulations informelles entre collègues.",
    keyTakeaway:
      "Concept d'examen clé : la technologie capacitante (qui étend le pouvoir d'agir et les marges de manœuvre) vs la technologie incapacitante (qui enferme dans un travail sous contrainte algorithmique).",
    apa7Citation:
      "Bobillier Chaumon, M.-É. (2021). Les transformations digitales à l’épreuve de l’activité : Modèles et pratiques d’intervention. Dunod.",
    tags: ["Bobillier Chaumon", "Acceptation située", "Capacitant", "Incapacitant", "Infobésité", "Transition digitale"],
  },
  {
    id: "res-engestrom-activite-systeme",
    category: "activite_engestrom",
    categoryLabel: "Théorie de l'Activité & Contradictions",
    authorFilter: "Yrjö Engeström",
    title: "Learning by Expanding : An Activity-Theoretical Approach to Developmental Work Research",
    authors: "Yrjö Engeström",
    year: "1987 / 2015",
    sourceOrPublisher: "Cambridge University Press",
    seanceNumber: "Séance 4",
    description:
      "Formalisation du triangle d'activité de 3e génération reliant Sujet, Outil (instruments), Objet, mais aussi Communauté, Règles (normes) et Division du travail. Engeström démontre que les innovations technologiques créent des contradictions internes au système d'activité (conflit entre valeur d'usage et valeur marchande). L'apprentissage expansif (expansive learning) consiste à résoudre ces contradictions en coconstruisant un nouvel objet de travail.",
    keyTakeaway:
      "Permet de modéliser l'impact d'une transition digitale sur tout un écosystème de travail au-delà du seul rapport individu-machine.",
    apa7Citation:
      "Engeström, Y. (2015). Learning by expanding : An activity-theoretical approach to developmental work research (2nd ed.). Cambridge University Press. (Original work published 1987).",
    tags: ["Engeström", "Système d'activité", "Contradictions", "Apprentissage expansif", "Triangle"],
  },
  {
    id: "res-vallery-barcellini-ergonomie-tic",
    category: "ergonomie_tic",
    categoryLabel: "Méthodologie d'Intervention Participative",
    authorFilter: "Gérard Valléry & Flore Barcellini",
    title: "Ergonomie des systèmes d'information et démarches participatives de conception",
    authors: "Gérard Valléry & Flore Barcellini",
    year: "2018",
    sourceOrPublisher: "Éditions Octarès / Le Travail Humain",
    seanceNumber: "Séance 5",
    description:
      "Guide méthodologique pour conduire l'intégration de technologies émergentes : simulation de l'activité future, ateliers de co-conception associant les utilisateurs finaux dès les premières esquisses, et suivi longitudinal des appropriations réelles.",
    keyTakeaway:
      "Fournit le plan d'action d'intervention pour un psychologue ou ergonome face à un déploiement d'IA ou de nouvel ERP en entreprise.",
    apa7Citation:
      "Valléry, G., & Barcellini, F. (2018). Concevoir pour et avec l’activité : Méthodes participatives en ergonomie. Octarès Éditions.",
    tags: ["Valléry", "Barcellini", "Simulation de l'activité", "Co-conception", "Intervention", "ERP"],
  },
  {
    id: "res-meda-travail-plateformes",
    category: "ia_algorithmes",
    categoryLabel: "Sociologie Critique du Travail Digitalisé",
    authorFilter: "Dominique Méda",
    title: "Le travail à l'ère des plateformes numériques et du management algorithmique",
    authors: "Dominique Méda & Collaborateurs",
    year: "2019 / 2022",
    sourceOrPublisher: "Revue Française des Affaires Sociales / Dares",
    seanceNumber: "Séance 6",
    description:
      "Enquête sur l'ubérisation et le management par algorithme : disparition de la figure humaine de l'encadrement au profit de métriques automatiques d'attribution des courses/tâches et de notation client instantanée. Analyse de la précarisation statutaire et de l'isolement extrême des travailleurs de plateforme.",
    keyTakeaway:
      "À mobiliser lors d'une question d'examen sur les dérives du capitalisme de plateforme et l'illusion d'indépendance des auto-entrepreneurs.",
    apa7Citation:
      "Méda, D. (2022). Le travail à l’ère des plateformes numériques : Entre autonomie illusoire et subordination algorithmique. Revue Française des Affaires Sociales, 22(1), 35–54.",
    tags: ["Dominique Méda", "Ubérisation", "Management algorithmique", "Plateformes", "Subordination"],
  },
];

/**
 * Architecture des Outils 18/20 dédiés exclusivement à chaque UE (PST106, PST108, PST123, PST120, PST124).
 * Permet d'afficher et de lancer les simulateurs, laboratoires et matrices propres à chaque enseignant.
 */

export type UeId = "pst106" | "pst108" | "pst123" | "pst120" | "pst124";

export interface ExclusiveUeTool {
  id: string;
  ueId: UeId;
  name: string;
  shortName: string;
  badge: string;
  desc: string;
  auteursRef: string;
  tabId: string;
  color: "amber" | "indigo" | "emerald" | "rose" | "cyan" | "purple" | "teal";
}

export interface UeToolsProfile {
  ueId: UeId;
  code: string;
  shortCode: string;
  title: string;
  teacher: string;
  semester: "S1" | "S2";
  accentColor: string;
  exclusiveTools: ExclusiveUeTool[];
  quickExamTools: {
    id: string;
    name: string;
    badge: string;
    desc: string;
    eventName: string;
    color: "cyan" | "blue" | "indigo" | "purple" | "amber" | "emerald" | "rose" | "teal";
  }[];
}

export const UE_TOOLS_PROFILES: Record<UeId, UeToolsProfile> = {
  pst106: {
    ueId: "pst106",
    code: "PST106",
    shortCode: "106",
    title: "Clinique de l'Activité & Ergonomie",
    teacher: "Pr. Christine Lagabrielle",
    semester: "S1",
    accentColor: "amber",
    exclusiveTools: [
      {
        id: "106-labo-diagnostic",
        ueId: "pst106",
        name: "Labo Diagnostic : Réel vs Réalisé & 5 Carrés de Leplat",
        shortName: "Labo Diagnostic 106",
        badge: "Exclusif 106",
        desc: "Diagnostiquer l'écart prescrit/réel, la double régulation de Leplat et l'activité empêchée sur cas réels.",
        auteursRef: "J. Leplat · J.-M. Faverge · Y. Clot",
        tabId: "diagnostic",
        color: "amber",
      },
      {
        id: "106-autoconfrontation",
        ueId: "pst106",
        name: "Simulateur d'Autoconfrontation Simple & Croisée",
        shortName: "Autoconfrontation",
        badge: "Méthode Clot",
        desc: "Entraînement interactif à la posture du clinicien : relancer la controverse sur le genre professionnel.",
        auteursRef: "Yves Clot · Daniel Faïta (CRTD Cnam)",
        tabId: "autoconfrontation",
        color: "indigo",
      },
      {
        id: "106-comparateur-sosie",
        ueId: "pst106",
        name: "Comparateur Wisner · Clot · Dejours & Instruction au Sosie",
        shortName: "Comparateur & Sosie",
        badge: "Matrice 3 Courants",
        desc: "Mise en tension synoptique des 3 courants du Cnam + protocole d'Instruction au Sosie d'Ivar Oddone.",
        auteursRef: "A. Wisner · Y. Clot · C. Dejours · I. Oddone",
        tabId: "outils",
        color: "emerald",
      },
      {
        id: "106-protocole",
        ueId: "pst106",
        name: "Protocole d'Intervention Ergonomique & Clinique (6 Étapes)",
        shortName: "Protocole Terrain 106",
        badge: "Méthodologie",
        desc: "De l'analyse de la demande à la restitution : la démarche complète exigée aux études de cas PST106.",
        auteursRef: "S. Pacaud · A. Wisner · Y. Clot",
        tabId: "protocole",
        color: "cyan",
      },
    ],
    quickExamTools: [
      {
        id: "schemas-106",
        name: "Schémas SVG PST106 (5 Carrés Leplat, Triangle Clot...)",
        badge: "Schémas 106",
        desc: "Les schémas canoniques à redessiner sur ta copie de PST106",
        eventName: "pst:open-schemas",
        color: "cyan",
      },
      {
        id: "defs-106",
        name: "Définitions Canoniques PST106",
        badge: "Auto-Test 106",
        desc: "Genre, Style, Pouvoir d'agir, Tâche redéfinie, Optimum vs Maximum",
        eventName: "pst:open-definitions",
        color: "blue",
      },
      {
        id: "dissert-106",
        name: "Sujets de Dissertation & Plans 18/20 PST106",
        badge: "Plans Lagabrielle",
        desc: "Sujets types, problématiques et plans dialectiques corrigés",
        eventName: "pst:open-sujets-dissertation",
        color: "indigo",
      },
      {
        id: "poche-106",
        name: "Fiche Mémo de Poche A4 — PST106",
        badge: "PDF A4",
        desc: "Synthèse recto-verso imprimable dédiée au PST106",
        eventName: "pst:open-fiche-poche",
        color: "teal",
      },
    ],
  },

  pst108: {
    ueId: "pst108",
    code: "PST108",
    shortCode: "108",
    title: "Langage, Dialogue & Méthode IOD",
    teacher: "M. Francis Valls & M. Éric Lucy",
    semester: "S1",
    accentColor: "indigo",
    exclusiveTools: [
      {
        id: "108-decodeur-pragmatique",
        ueId: "pst108",
        name: "Décodeur Pragmatique d'Austin, Searle & Bourdieu",
        shortName: "Décodeur Austin/Searle",
        badge: "Exclusif 108",
        desc: "Qualifier les énoncés au travail : Locutoire/Illocutoire/Perlocutoire, 5 actes de Searle, actes indirects et Status est magistratus.",
        auteursRef: "J. L. Austin · J. Searle · P. Bourdieu · É. Lucy",
        tabId: "langage",
        color: "indigo",
      },
      {
        id: "108-simulateur-iod",
        ueId: "pst108",
        name: "Simulateur de Négociation IOD (Méthode Castra & Valls)",
        shortName: "Simulateur IOD Valls",
        badge: "Exclusif Valls",
        desc: "Négocier l'insertion directe sur le poste réel sans tri préalable et déconstruire le biais d'employabilité.",
        auteursRef: "Francis Valls · Denis Castra · Robert Castel",
        tabId: "iod",
        color: "emerald",
      },
      {
        id: "108-organon-comparateur",
        ueId: "pst108",
        name: "Organon de Bühler & Comparateur Bourdieu · Habermas · Honneth",
        shortName: "Organon & Comparateur",
        badge: "Matrice 4 Auteurs",
        desc: "Modèle triadique de Bühler + confrontation Bourdieu (marché linguistique), Habermas (agir communicationnel) et Honneth.",
        auteursRef: "K. Bühler · P. Bourdieu · J. Habermas · A. Honneth",
        tabId: "outils",
        color: "amber",
      },
      {
        id: "108-debats-vygotski-ghiglione",
        ueId: "pst108",
        name: "Controverses : Piaget vs Vygotski & Contrat de Ghiglione",
        shortName: "Vygotski & Ghiglione",
        badge: "Duel Conceptuel",
        desc: "Langage égocentrique/intérieur (Vygotski vs Piaget) et distinction Objectif vs Enjeu dans la SPC de Ghiglione.",
        auteursRef: "L. Vygotski · J. Piaget · R. Ghiglione · P. Watzlawick",
        tabId: "debats",
        color: "purple",
      },
    ],
    quickExamTools: [
      {
        id: "schemas-108",
        name: "Schémas SVG PST108 (Vygotski, Searle, Ghiglione, IOD)",
        badge: "Schémas 108",
        desc: "Les matrices visuelles du langage et du dialogue pour l'examen",
        eventName: "pst:open-schemas",
        color: "cyan",
      },
      {
        id: "defs-108",
        name: "Définitions Canoniques PST108",
        badge: "Auto-Test 108",
        desc: "Performatif, Illocutoire, SPC, Enjeu vs Objectif, Agir communicationnel",
        eventName: "pst:open-definitions",
        color: "blue",
      },
      {
        id: "dissert-108",
        name: "Sujets de Dissertation & Plans 18/20 PST108",
        badge: "Plans Valls/Lucy",
        desc: "Plans types corrigés sur Austin/Bourdieu, Vygotski et IOD",
        eventName: "pst:open-sujets-dissertation",
        color: "indigo",
      },
      {
        id: "poche-108",
        name: "Fiche Mémo de Poche A4 — PST108",
        badge: "PDF A4",
        desc: "Synthèse recto-verso imprimable dédiée au PST108",
        eventName: "pst:open-fiche-poche",
        color: "teal",
      },
    ],
  },

  pst123: {
    ueId: "pst123",
    code: "PST123",
    shortCode: "123",
    title: "Identité Sociale & Déontologie",
    teacher: "Mme Élisabeth Lucy",
    semester: "S1",
    accentColor: "emerald",
    exclusiveTools: [
      {
        id: "123-matrice-dubar-sainsaulieu",
        ueId: "pst123",
        name: "Matrice Croisée : Double Transaction (Dubar) × 4 Pouvoirs (Sainsaulieu)",
        shortName: "Matrice Dubar × Sainsaulieu",
        badge: "Exclusif 123 · Option B",
        desc: "L'outil roi pour l'étude de cas : diagnostiquer la transaction biographique/relationnelle et le modèle culturel (Fusionnel, Négociateur, Affinitaire, Retrait).",
        auteursRef: "Claude Dubar (1991) · Renaud Sainsaulieu (1977)",
        tabId: "matrice",
        color: "emerald",
      },
      {
        id: "123-annotateur-recit-vie",
        ueId: "pst123",
        name: "Annotateur Clinique de Récits de Vie (Attribution vs Appartenance)",
        shortName: "Annotateur Récits de Vie",
        badge: "Clinique Identitaire",
        desc: "Décoder dans un verbatim les actes d'attribution institutionnels, les actes d'appartenance, l'Habitus et l'illusio.",
        auteursRef: "C. Dubar · P. Bourdieu · E. C. Hughes · E. Goffman",
        tabId: "biographie",
        color: "indigo",
      },
      {
        id: "123-tribunal-deonto",
        ueId: "pst123",
        name: "Tribunal Déontologique CNCDP & Secret Professionnel",
        shortName: "Tribunal Déontologique",
        badge: "Code Déontologie",
        desc: "Trancher les dilemmes éthiques du psychologue du travail face aux pressions RH (indépendance technique, consentement, secret).",
        auteursRef: "Code de Déontologie (1996/2021) · CNCDP",
        tabId: "deonto",
        color: "rose",
      },
      {
        id: "123-comparateur-identite",
        ueId: "pst123",
        name: "Comparateur Dubar · Bourdieu · Sainsaulieu & Explorateur d'Articles",
        shortName: "Comparateur 123",
        badge: "Option A Dissertation",
        desc: "Confrontation terme à terme des 3 sociologies de l'identité + squelettes d'introduction Option A.",
        auteursRef: "C. Dubar · P. Bourdieu · R. Sainsaulieu · A. Honneth",
        tabId: "outils",
        color: "amber",
      },
    ],
    quickExamTools: [
      {
        id: "schemas-123",
        name: "Schémas SVG PST123 (Double Transaction Dubar, 4 Modèles Sainsaulieu...)",
        badge: "Schémas 123",
        desc: "Les schémas d'identité et de socialisation à reproduire à l'examen",
        eventName: "pst:open-schemas",
        color: "cyan",
      },
      {
        id: "defs-123",
        name: "Définitions Canoniques PST123",
        badge: "Auto-Test 123",
        desc: "Double transaction, Habitus, Illusio, Stigmate, Anomie, Actes d'attribution",
        eventName: "pst:open-definitions",
        color: "blue",
      },
      {
        id: "dissert-123",
        name: "Sujets Option A (Dissertation) & Option B (Cas) PST123",
        badge: "Plans Mme Lucy",
        desc: "Plans détaillés et études de cas corrigées pour l'épreuve de Mme Lucy",
        eventName: "pst:open-sujets-dissertation",
        color: "indigo",
      },
      {
        id: "poche-123",
        name: "Fiche Mémo de Poche A4 — PST123",
        badge: "PDF A4",
        desc: "Synthèse recto-verso imprimable dédiée au PST123",
        eventName: "pst:open-fiche-poche",
        color: "teal",
      },
    ],
  },

  pst120: {
    ueId: "pst120",
    code: "PST120",
    shortCode: "120",
    title: "Psychodynamique & Psychopathologie",
    teacher: "Chaire Psychodynamique (S2)",
    semester: "S2",
    accentColor: "rose",
    exclusiveTools: [
      {
        id: "120-thermo-sublimation",
        ueId: "pst120",
        name: "Thermomètre Clinique : Stratégies de Défense vs Sublimation",
        shortName: "Thermomètre Sublimation",
        badge: "Exclusif 120",
        desc: "Évaluer la dynamique de reconnaissance (jugement de beauté des pairs / d'utilité de la hiérarchie) face aux défenses collectives.",
        auteursRef: "Christophe Dejours · Pascale Molinier · Louis Le Guillant",
        tabId: "outils",
        color: "rose",
      },
      {
        id: "120-protocole-enquete",
        ueId: "pst120",
        name: "Protocole d'Enquête Collective en 7 Étapes (Psychodynamique)",
        shortName: "Enquête Dejours (7 étapes)",
        badge: "Méthode Dejours",
        desc: "De l'instruction de la demande au collectif de volontaires et à la validation contradictoire du rapport.",
        auteursRef: "Christophe Dejours",
        tabId: "protocole",
        color: "indigo",
      },
      {
        id: "120-simulateur-care",
        ueId: "pst120",
        name: "Simulateur Clinique : Souffrance Éthique, Care & Idéologie Virile",
        shortName: "Simulateur Care & Éthique",
        badge: "Cas Cliniques 120",
        desc: "Analyser les cas de souffrance éthique, de servitude volontaire et d'invisibilisation du travail de care.",
        auteursRef: "C. Dejours · P. Molinier · C. Veil",
        tabId: "simulateur",
        color: "amber",
      },
    ],
    quickExamTools: [
      {
        id: "schemas-120",
        name: "Schémas SVG PST120 (Triangle de la Dynamique de Dejours...)",
        badge: "Schémas 120",
        desc: "Matrices visuelles de la psychodynamique du travail",
        eventName: "pst:open-schemas",
        color: "cyan",
      },
      {
        id: "defs-120",
        name: "Définitions Canoniques PST120",
        badge: "Auto-Test 120",
        desc: "Mètis, Souffrance éthique, Idéologie défensive, Jugement de beauté, Care",
        eventName: "pst:open-definitions",
        color: "blue",
      },
      {
        id: "poche-120",
        name: "Fiche Mémo de Poche A4 — PST120",
        badge: "PDF A4",
        desc: "Synthèse recto-verso imprimable dédiée au PST120",
        eventName: "pst:open-fiche-poche",
        color: "teal",
      },
    ],
  },

  pst124: {
    ueId: "pst124",
    code: "PST124",
    shortCode: "124",
    title: "Transformations Digitales & Usages",
    teacher: "Pr. M.-É. Bobillier-Chaumon (S2)",
    semester: "S2",
    accentColor: "cyan",
    exclusiveTools: [
      {
        id: "124-audit-digital",
        ueId: "pst124",
        name: "Simulateur d'Audit Digital & Grille d'Acceptation Située (4 Dimensions)",
        shortName: "Audit Acceptation Située",
        badge: "Exclusif 124",
        desc: "Diagnostiquer si une technologie numérique ou IA est capacitante ou incapacitante (opérationnelle, organisationnelle, identitaire, subjective).",
        auteursRef: "M.-É. Bobillier-Chaumon · P. Rabardel · Y. Engeström",
        tabId: "outils",
        color: "cyan",
      },
      {
        id: "124-genese-instrumentale",
        ueId: "pst124",
        name: "Simulateur de Genèse Instrumentale (Artefact → Instrument)",
        shortName: "Genèse Instrumentale",
        badge: "Méthode Rabardel",
        desc: "Distinguer l'instrumentation (vers le sujet) et l'instrumentalisation (catachrèse / braconnage vers l'artefact).",
        auteursRef: "Pierre Rabardel (1995)",
        tabId: "simulateur",
        color: "indigo",
      },
      {
        id: "124-protocole-usages",
        ueId: "pst124",
        name: "Protocole d'Accompagnement Technologique & Conception Continuée",
        shortName: "Protocole Usages 124",
        badge: "Intervention",
        desc: "Conception participative dans l'usage et ouverture d'espaces de délibération autour des outils numériques.",
        auteursRef: "M.-É. Bobillier-Chaumon · F. Daniellou",
        tabId: "protocole",
        color: "emerald",
      },
    ],
    quickExamTools: [
      {
        id: "schemas-124",
        name: "Schémas SVG PST124 (Triade de Rabardel, Triangle d'Engeström...)",
        badge: "Schémas 124",
        desc: "Les schémas de la genèse instrumentale et du système d'activité",
        eventName: "pst:open-schemas",
        color: "cyan",
      },
      {
        id: "defs-124",
        name: "Définitions Canoniques PST124",
        badge: "Auto-Test 124",
        desc: "Artefact vs Instrument, Instrumentation, Instrumentalisation, Acceptation située",
        eventName: "pst:open-definitions",
        color: "blue",
      },
      {
        id: "poche-124",
        name: "Fiche Mémo de Poche A4 — PST124",
        badge: "PDF A4",
        desc: "Synthèse recto-verso imprimable dédiée au PST124",
        eventName: "pst:open-fiche-poche",
        color: "teal",
      },
    ],
  },
};

export const UE_ORDER: UeId[] = ["pst106", "pst108", "pst123", "pst120", "pst124"];

/**
 * Navigue vers un onglet d'outil exclusif d'une UE.
 * Si l'utilisateur est déjà sur la page de cette UE, change immédiatement l'onglet actif via le hash
 * et fait défiler jusqu'à la zone de travail. Sinon, redirige vers `/pst/{num}/#{tabId}`.
 */
export function openExclusiveUeTool(targetUe: UeId, tabId: string) {
  if (typeof window === "undefined") return;
  const num = targetUe.replace("pst", "");
  const targetPath = `/pst/${num}/`;
  const currentPath = window.location.pathname;

  if (currentPath.includes(`/pst/${num}`)) {
    if (window.location.hash === `#${tabId}`) {
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    } else {
      window.location.hash = tabId;
    }
    const anchor = document.getElementById("tabs-nav-anchor");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } else {
    window.location.href = `${targetPath}#${tabId}`;
  }
}

export type JuryRole = "president" | "chercheur" | "praticien";

export interface JuryQuestion {
  id: string;
  role: JuryRole;
  roleLabel: string;
  ueTag: string;
  question: string;
  underlyingTension: string;
  fatalTrap: string;
  expectedStructure: string[];
  keyReferences: string;
}

export const JURY_QUESTIONS: JuryQuestion[] = [
  {
    id: "q_commande_demande",
    role: "president",
    roleLabel: "Président du Jury (Chaire PST CNAM)",
    ueTag: "PST106 / Mémoire",
    question:
      "Votre mémoire part d'une commande de la direction portant sur « la résistance au changement et le stress ». Comment démontrez-vous concrètement que vous n'êtes pas resté captif de cette commande managériale ?",
    underlyingTension:
      "Vérifier la capacité à opérer le déplacement épistémologique fondamental du CNAM : passer d'une psychologisation individuelle de la commande à une co-construction de la demande centrée sur le travail réel.",
    fatalTrap:
      "Répondre qu'on a « écouté les salariés avec bienveillance » ou qu'on a fait passer un questionnaire de satisfaction pour compléter la demande de la direction.",
    expectedStructure: [
      "Exposer l'instruction de la commande initiale et les implicites gestionnaires qu'elle véhiculait.",
      "Décrire les premières observations ouvertes en situation réelle ayant révélé des contradictions organisationnelles (écart prescrit / réel).",
      "Montrer comment la reformulation de la demande a été validée contradictoirement en Comité de Pilotage (COPIL) paritaire.",
    ],
    keyReferences:
      "Wisner (1995), Daniellou (2005), Clot (2008), Leplat & Hoc (1983)",
  },
  {
    id: "q_conseil_vs_clinique",
    role: "president",
    roleLabel: "Président du Jury (Chaire PST CNAM)",
    ueTag: "PST106 / PST123",
    question:
      "En lisant vos préconisations finales, qu'est-ce qui distingue votre intervention de psychologue du travail d'un audit réalisé par un cabinet de conseil en organisation ?",
    underlyingTension:
      "Évaluer la posture clinique : le psychologue du travail n'est pas un expert prescripteur qui substitue ses normes à celles des opérateurs, mais un tiers méthodologique qui restaure le pouvoir d'agir des collectifs.",
    fatalTrap:
      "Défendre la qualité technique de son « catalogue de recommandations » livré clés en main à la direction.",
    expectedStructure: [
      "Rappeler que l'expert prescrit de l'extérieur alors que le clinicien institue un cadre où les professionnels deviennent auteurs de l'analyse de leur propre activité.",
      "Démontrer que les transformations produites sont issues des controverses de métier (autoconfrontations, délibérations) et non d'un diagnostic solitaire.",
      "Souligner l'effet développemental durable : la pérennisation de la fonction délibérative du collectif après le départ de l'intervenant.",
    ],
    keyReferences: "Clot (1999, 2008), Oddone (1981), Dejours (1993)",
  },
  {
    id: "q_clot_dejours_tension",
    role: "chercheur",
    roleLabel: "Enseignant-Chercheur (Clinique & PDT)",
    ueTag: "PST106 / PST120",
    question:
      "Vous mobilisez à la fois Yves Clot et Christophe Dejours dans votre revue de littérature. N'y a-t-il pas une contradiction épistémologique majeure entre la clinique de l'activité et la psychodynamique du travail ?",
    underlyingTension:
      "Tester la rigueur théorique (anti-éclectisme mou) : savoir articuler deux paradigmes sans gommer leur divergence sur le statut de l'action, de la défense et du développement.",
    fatalTrap:
      "Affirmer que « les deux auteurs disent au fond la même chose sur la souffrance au travail ».",
    expectedStructure: [
      "Identifier explicitement le point de convergence : la centralité du réel (ce qui résiste à la maîtrise) et le refus du modèle positiviste du stress.",
      "Assumer la controverse théorique : la PDT (Dejours) analyse la souffrance, les stratégies collectives de défense et la reconnaissance par l'écoute de la parole, tandis que la Clinique de l'activité (Clot, d'inspiration vygotskienne) cible le développement du pouvoir d'agir par la remise en mouvement du genre professionnel sur les traces de l'activité.",
      "Justifier comment votre terrain articulait ces deux niveaux d'analyse sans les confondre.",
    ],
    keyReferences:
      "Clot (2008), Dejours (2000), Vygotski (1934), Canguilhem (1966)",
  },
  {
    id: "q_genre_style",
    role: "chercheur",
    roleLabel: "Enseignant-Chercheur (Ergonomie & Activité)",
    ueTag: "PST106 / PST120",
    question:
      "Dans vos extraits d'autoconfrontation, vous qualifiez un geste singulier d'un opérateur de « genre professionnel ». Ne confondez-vous pas le style individuel et le genre collectif ?",
    underlyingTension:
      "Vérifier la maîtrise précise des quatre instances du métier chez Clot (impersonnelle, interpersonnelle, transpersonnelle, personnelle).",
    fatalTrap:
      "Utiliser « genre » comme synonyme vague d'habitude individuelle ou de culture d'entreprise prescrite.",
    expectedStructure: [
      "Définir le genre professionnel comme la mémoire transpersonnelle et les obligations implicites partagées par les pairs pour réussir à travailler malgré les aléas.",
      "Définir le style comme l'appropriation singulière et la retouche personnelle du genre par un sujet en situation.",
      "Montrer comment la controverse en autoconfrontation croisée fait justement passer ce geste du statut d'écart individuel (style) à une ressource débattue par le collectif (genre).",
    ],
    keyReferences: "Clot & Faïta (2000), Bakhtine (1984)",
  },
  {
    id: "q_genese_instrumentale",
    role: "chercheur",
    roleLabel: "Enseignant-Chercheur (Transformations Digitales)",
    ueTag: "PST124",
    question:
      "Vous observez que les salariés utilisent un fichier Excel parallèle au lieu du nouvel ERP. Pourquoi parlez-vous de « catachrèse » et non de refus du changement ?",
    underlyingTension:
      "Évaluer la maîtrise de l'approche anthropocentrique et de la théorie de la genèse instrumentale (Rabardel).",
    fatalTrap:
      "Considérer le contournement comme une simple « mauvaise formation à l'outil » qu'il suffirait de corriger par un guide utilisateur.",
    expectedStructure: [
      "Distinguer l'artefact technique (le logiciel prescrit) de l'instrument psychologique et technique (l'artefact couplé aux schèmes d'utilisation du sujet).",
      "Définir la catachrèse (instrumentalisation) comme un détournement fonctionnel créatif permettant à l'opérateur de pallier la rigidité de l'artefact pour préserver les critères de qualité du travail réel.",
      "Démontrer que ce fichier parallèle est un indicateur précieux des besoins de régulation ignorés lors de la conception technocentrique de l'ERP.",
    ],
    keyReferences: "Rabardel (1995), Bobillier Chaumon (2016)",
  },
  {
    id: "q_secret_pression_drh",
    role: "praticien",
    roleLabel: "Psychologue du Travail Praticien",
    ueTag: "PST123 / Déontologie",
    question:
      "Si, à l'issue de votre intervention, le DRH qui a financé votre mission vous demande d'identifier les deux salariés les plus fragiles de l'équipe pour « les protéger », que faites-vous ?",
    underlyingTension:
      "Vérifier l'intransigeance déontologique face au piège de la « bienveillance managériale » violant le secret professionnel.",
    fatalTrap:
      "Accepter de donner des « indices » à l'oral ou de transmettre une synthèse par petits groupes de 2 personnes permettant la ré-identification.",
    expectedStructure: [
      "Opposer un refus absolu et immédiat fondé sur le Principe I (Respect des droits de la personne) et les Articles 1, 7 et 19 du Code de déontologie (2021).",
      "Rappeler que l'indépendance professionnelle (Art. 3) et le secret s'appliquent quel que soit le financeur de l'intervention.",
      "Expliquer à la direction que la protection de la santé psychique passe par le traitement des facteurs organisationnels restitués anonymement au COPIL, et orienter individuellement les salariés volontaires vers le médecin du travail (SPST).",
    ],
    keyReferences:
      "Code de déontologie des psychologues (1996/2021), Art. L. 4121-1 Code du travail",
  },
  {
    id: "q_activite_empechee_stagiaire",
    role: "praticien",
    roleLabel: "Psychologue du Travail Praticien",
    ueTag: "Réflexivité RNCP 7",
    question:
      "Vous parlez beaucoup de l'activité empêchée des opérateurs. Mais quelle a été VOTRE propre activité empêchée de psychologue durant cette intervention ?",
    underlyingTension:
      "Tester l'authenticité de la posture réflexive : un praticien de niveau 7 sait analyser ses propres impasses, renoncements et compromis méthodologiques sur le terrain.",
    fatalTrap:
      "Présenter une intervention lisse, linéaire et sans accroc où tout s'est déroulé exactement comme prévu dans les manuels.",
    expectedStructure: [
      "Identifier honnêtement une limite rencontrée sur le terrain (ex: impossibilité de filmer certaines séquences, calendrier resserré bloquant un second cycle d'autoconfrontation croisée, contournement du COPIL par un cadre).",
      "Analyser ce que cet empêchement révèle du fonctionnement même de l'organisation cliente (le refus ou l'obstacle fait partie du diagnostic clinique).",
      "Expliciter les régulations méthodologiques mises en œuvre pour sauvegarder le cadre éthique et dialogique.",
    ],
    keyReferences: "Clot (2008), Schön (1983) — Le praticien réflexif",
  },
];

export interface RncpCriterion {
  id: string;
  title: string;
  points: number;
  desc: string;
  indicators: string[];
}

export const RNCP_CRITERIA: RncpCriterion[] = [
  {
    id: "c1",
    title: "1. Élucidation de la commande & Diagnostic situé",
    points: 5,
    desc: "Capacité à instruire la commande managériale initiale, repérer les implicites gestionnaires et co-construire une demande paritaire centrée sur le travail réel.",
    indicators: [
      "Distinction nette entre symptôme individuel/managérial et déterminants organisationnels de l'activité",
      "Mise en place d'un Comité de Pilotage paritaire garantissant l'indépendance de l'analyse",
      "Observations directes documentées (traces de l'activité, verbatims, incidents critiques)",
    ],
  },
  {
    id: "c2",
    title: "2. Dispositif méthodologique & Éthique déontologique",
    points: 5,
    desc: "Rigueur des méthodes cliniques déployées (autoconfrontation, instruction au sosie, délibération) et respect strict du Code de Déontologie des Psychologues.",
    indicators: [
      "Justification située du choix des outils méthodologiques (Clot, Oddone, Wisner)",
      "Cadre éthique : secret professionnel, consentement libre et éclairé, anonymisation",
      "Restitution contradictoire préalable aux opérateurs avant tout partage institutionnel",
    ],
  },
  {
    id: "c3",
    title: "3. Maîtrise conceptuelle & Ruptures épistémologiques",
    points: 5,
    desc: "Convocation précise des concepts fondateurs de la chaire Cnam, refus de l'éclectisme mou et tenue rigoureuse des controverses théoriques.",
    indicators: [
      "Non-confusion épistémologique entre Clinique de l'Activité (Clot) et Psychodynamique (Dejours)",
      "Mobilisation articulée : pouvoir d'agir, genre/style, défenses collectives, reconnaissance",
      "Capacité à répondre aux objections du jury avec précision conceptuelle et recul critique",
    ],
  },
  {
    id: "c4",
    title: "4. Gestion du temps (15 min), Aisance oratoire & Réflexivité",
    points: 5,
    desc: "Respect strict du timing officiel (15 min exposé sans coupure), qualité de l'expression orale et capacité d'analyse réflexive sur sa propre posture.",
    indicators: [
      "Maîtrise du rythme : 3 min commande, 4 min méthode, 5 min clinique, 3 min perspectives",
      "Clarté d'élocution, projection de la voix, posture professionnelle de psychologue assumée",
      "Distance critique par rapport à ses propres réussites et limites d'intervention",
    ],
  },
];

export const STORAGE_KEY = "pst_oral_defense_v1";
export const EVAL_STORAGE_KEY = "pst_oral_defense_eval_v1";

export const PHASE_1_SECONDS = 15 * 60; // 15 min exposé
export const PHASE_2_SECONDS = 30 * 60; // 30 min débat jury

export const DEFAULT_SCORES: Record<string, number> = {
  c1: 5,
  c2: 5,
  c3: 4,
  c4: 5,
};

export function getScoreVerdict(score: number): { label: string; badge: string } {
  if (score >= 16) {
    return {
      label: "Très Bien · Maîtrise Experte RNCP 7",
      badge:
        "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    };
  }
  if (score >= 14) {
    return {
      label: "Bien · Solide Posture Clinique",
      badge: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30",
    };
  }
  if (score >= 12) {
    return {
      label: "Assez Bien · Conforme aux exigences",
      badge:
        "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
    };
  }
  if (score >= 10) {
    return {
      label: "Admis · Seuil minimal RNCP 7",
      badge:
        "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30",
    };
  }
  return {
    label: "Ajourné · Des axes critiques à reprendre",
    badge: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
  };
}

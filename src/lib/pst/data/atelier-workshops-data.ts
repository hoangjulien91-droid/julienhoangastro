export interface WorkshopDoctrineData {
  id: string;
  name: string;
  ects: number;
  prof: string;
  focus: string;
  authors: { name: string; role: string; quote: string }[];
  methodologies: { title: string; desc: string }[];
  examType: string;
  examDesc: string;
}

export const WORKSHOPS_DATA: Record<string, WorkshopDoctrineData> = {
  pst106: {
    id: "pst106",
    name: "Clinique de l'activité & Ergonomie constructive",
    ects: 6,
    prof: "Équipe Chaire Psychologie du Travail",
    focus:
      "Transformer le travail pour transformer le sujet. Réel de l'activité, discordances, pouvoir d'agir et architecture du collectif.",
    authors: [
      {
        name: "Yves Clot",
        role: "Fondateur de la clinique de l'activité (CNAM)",
        quote:
          "L'activité réalisée n'est qu'une part minuscule du réel de l'activité : le non-fait, l'empêché et le contrarié pèsent tout autant.",
      },
      {
        name: "Alain Wisner",
        role: "Père de l'ergonomie de langue française (CNAM)",
        quote:
          "Le travail réel ne coïncide jamais avec le travail prescrit. L'ouvrier n'est pas un opérateur passif, il régule.",
      },
      {
        name: "Lev Vygotski",
        role: "Psychologie historico-culturelle",
        quote:
          "L'instrument psychologique médiatise la pensée et reconfigure les fonctions psychiques supérieures.",
      },
      {
        name: "Jacques Leplat",
        role: "Psychologie ergonomique",
        quote:
          "La tâche détermine le but prescrit ; l'activité correspond à la conduite humaine mobilisée pour l'atteindre.",
      },
    ],
    methodologies: [
      {
        title: "Auto-confrontation simple",
        desc: "L'opérateur visionne les traces vidéo de son activité filmée en situation réelle et commente ses gestes face au psychologue du travail.",
      },
      {
        title: "Auto-confrontation croisée",
        desc: "Deux collègues du même métier débattent ensemble de la vidéo de l'un d'eux, mettant en tension le genre professionnel et leurs styles individuels.",
      },
      {
        title: "Instruction au sosie (Oddone)",
        desc: "« Imagine que je sois ton sosie et que demain je doive te remplacer : explique-moi tout pour que personne ne s'en aperçoive. »",
      },
    ],
    examType: "Dossier d'intervention clinique / Étude de cas",
    examDesc:
      "Analyse d'une situation de travail conflictuelle ou d'un métier contrarié avec proposition d'un cadre méthodologique en auto-confrontation.",
  },
  pst108: {
    id: "pst108",
    name: "Langage, communication & clinique du dialogue",
    ects: 6,
    prof: "É. Lucy, F. Valls & V. Marot (3 × 1h00)",
    focus:
      "Le dialogue comme instrument de pensée et levier d'action. Les controverses de métier et la dispute professionnelle réglée.",
    authors: [
      {
        name: "Yves Clot",
        role: "Clinique du travail & dialogue",
        quote:
          "Le travail bien fait a besoin de dispute professionnelle : quand la délibération sur la qualité est étouffée, la santé vacille.",
      },
      {
        name: "John L. Austin",
        role: "Philosophie du langage",
        quote:
          "Quand dire c'est faire : dimension performative et actes de langage dans les organisations.",
      },
      {
        name: "Mikhaïl Bakhtine",
        role: "Théorie du dialogisme",
        quote:
          "Tout énoncé est habité par la voix d'autrui et s'adresse à un sur-destinataire.",
      },
    ],
    methodologies: [
      {
        title: "Dispute professionnelle réglée",
        desc: "Dispositif d'institution de la controverse sur les critères du travail bien fait entre pairs et hiérarchie.",
      },
      {
        title: "Clinique du dialogue de métier",
        desc: "Analyse des énoncés en situation de travail pour restaurer la fonction psychologique du collectif.",
      },
    ],
    examType: "Écrit terminal 3h00 (3 × 1h00 : Lucy · Valls · Marot)",
    examDesc:
      "Examen de 3h00 divisé en 3 sous-épreuves de 1h00 par enseignant : 1h00 M. Éric Lucy (Bourdieu, Habermas, Honneth), 1h00 M. Francis Valls (Ghiglione, Dubet, Goffman, IOD) et 1h00 Mme Véronique Marot (Vygotski, Clot, Sosie, Abric, Porter).",
  },
  pst120: {
    id: "pst120",
    name: "Psychodynamique du travail & RPS",
    ects: 6,
    prof: "Laboratoire PCPP / CNAM",
    focus:
      "La centralité du travail dans la constitution du sujet. Conflit entre le sujet et l'organisation, souffrance, défenses et reconnaissance.",
    authors: [
      {
        name: "Christophe Dejours",
        role: "Fondateur de la psychodynamique du travail",
        quote:
          "Le travail est ce qui implique, du point de vue humain, le fait de faire l'expérience du réel : c'est ce qui résiste aux savoirs et à la maîtrise.",
      },
      {
        name: "Pascale Molinier",
        role: "Théoricienne du care & psychodynamique",
        quote:
          "L'idéologie défensive virile occulte la vulnérabilité et bloque l'expression de la souffrance au travail.",
      },
      {
        name: "Georges Canguilhem",
        role: "Philosophie de la médecine et de la vie",
        quote:
          "Être en bonne santé, c'est être capable de tomber malade et de s'en relever : c'est être normatif et instaurer ses propres normes.",
      },
    ],
    methodologies: [
      {
        title: "Enquête en psychodynamique du travail",
        desc: "Dispositif d'intervention collective fondé sur l'écoute de la souffrance partagée, l'élaboration de la parole et l'analyse des stratégies de défense.",
      },
      {
        title: "Jugement de beauté & jugement d'utilité",
        desc: "Les deux piliers de la dynamique de la reconnaissance : jugement technique par les pairs et économique par la hiérarchie.",
      },
    ],
    examType: "Examen écrit terminal (Cas clinique de souffrance)",
    examDesc:
      "Diagnostic différentiel d'une situation de RPS, déconstruction des défenses collectives et préconisations d'intervention.",
  },
  pst123: {
    id: "pst123",
    name: "Le psychologue, le travail et l'emploi",
    ects: 6,
    prof: "M. Éric Lucy · Cnam / PST123",
    focus:
      "L'identité sociale et professionnelle au travail. Double transaction (Dubar), cultures d'atelier et pouvoir (Sainsaulieu), habitus (Bourdieu), désaffiliation (Castel) et déontologie (Code 2021).",
    authors: [
      {
        name: "Claude Dubar",
        role: "Sociologie de l'identité et socialisation",
        quote:
          "L'identité n'est jamais donnée, elle est toujours construite et à reconstruire dans une double transaction, biographique et relationnelle.",
      },
      {
        name: "Renaud Sainsaulieu",
        role: "Sociologie des organisations & L'identité au travail",
        quote:
          "L'entreprise est un lieu de socialisation politique où l'accès au pouvoir forge 4 modèles identitaires : fusionnel, retrait, négociateur et affinitaire.",
      },
      {
        name: "Pierre Bourdieu",
        role: "Sociologie critique & Espace social",
        quote:
          "L'habitus est une structure structurée prédisposée à fonctionner comme structure structurante : le passé incorporé qui oriente l'action.",
      },
      {
        name: "Code de Déontologie (1996/2021)",
        role: "Cadre éthique et légal du psychologue",
        quote:
          "Le respect de la personne dans sa dimension psychique est un droit inaliénable. Le secret professionnel et le consentement libre fondent l'intervention.",
      },
    ],
    methodologies: [
      {
        title: "Double transaction identitaire (Dubar)",
        desc: "Analyse croisée de la transaction biographique (identité pour soi / temporalité) et de la transaction relationnelle (identité pour autrui / attribution / appartenance).",
      },
      {
        title: "Matrice des 4 cultures de travail (Sainsaulieu)",
        desc: "Diagnostic des dynamiques de pouvoir et des régulations relationnelles au sein des collectifs et ateliers.",
      },
      {
        title: "Dispositif déontologique & Secret professionnel",
        desc: "Triangulation de la demande, consentement éclairé, indépendance technique et restitution exclusive au bénéficiaire (Art. L. 6313-4 C. Travail).",
      },
    ],
    examType: "Examen écrit terminal (2h00 sur table — Dissertation ou Cas)",
    examDesc:
      "Choix entre Option A : Dissertation théorique approfondie ou Option B : Analyse d'une situation clinique de travail.",
  },
  pst124: {
    id: "pst124",
    name: "Transformations numériques & usages situés",
    ects: 6,
    prof: "Chaire Psychologie du Travail CNAM",
    focus:
      "L'impact des technologies émergentes (IA, plateformes, télétravail, ERP) sur l'activité réelle, genèse instrumentale et acceptation située.",
    authors: [
      {
        name: "Pierre Rabardel",
        role: "Théorie de la genèse instrumentale",
        quote:
          "L'artefact n'est pas l'instrument. L'instrument est un artefact approprié par le sujet avec ses propres schèmes d'utilisation.",
      },
      {
        name: "Marc-Éric Bobillier Chaumon",
        role: "Acceptation située des TIC",
        quote:
          "La technologie doit être étudiée non pas en laboratoire, mais dans son écologie réelle de travail avec ses paradoxes organisationnels.",
      },
      {
        name: "Yrjö Engeström",
        role: "Théorie de l'activité historico-culturelle",
        quote:
          "L'apprentissage expansif naît de la résolution des contradictions internes aux systèmes d'activité.",
      },
    ],
    methodologies: [
      {
        title: "Genèse instrumentale (Instrumentation & Instrumentalisation)",
        desc: "Analyse des bifurcations d'usage, des ruses et des détournements créatifs opérés par les salariés face au logiciel.",
      },
      {
        title: "Diagnostic d'impact digital",
        desc: "Audit de la charge cognitive, de l'intensification du travail et des paradoxes de l'hyperconnexion.",
      },
    ],
    examType: "Projet de diagnostic de transformation digitale",
    examDesc:
      "Étude d'un déploiement d'outil numérique (ex: IA générative, ERP) et conception d'une méthodologie participative d'appropriation.",
  },
};

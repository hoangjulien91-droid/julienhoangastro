export interface SpeedRunQuestion {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst120" | "pst123" | "pst124";
  question: string;
  options: string[];
  correctIdx: number;
  explication18_20: string;
  auteurRef: string;
}

export interface SpeedRunFilterOption {
  key: string;
  label: string;
}

export const SPEEDRUN_MODULE_OPTIONS: SpeedRunFilterOption[] = [
  {
    key: "all",
    label: "Tous les modules (106 · 108 · 120 · 123 · 124)",
  },
  { key: "pst106", label: "PST106 (Wisner, Clot, Leplat)" },
  {
    key: "pst108",
    label: "PST108 (Vygotski, Bourdieu, Habermas)",
  },
  { key: "pst120", label: "PST120 (Dejours, Molinier, Pezé)" },
  {
    key: "pst123",
    label: "PST123 (Dubar, Sainsaulieu, Castel)",
  },
  {
    key: "pst124",
    label: "PST124 (Rabardel, Bobillier, Engeström)",
  },
];

export const SPEEDRUN_BANK: SpeedRunQuestion[] = [
  // --- PST108 ---
  {
    id: "sr-108-1",
    moduleKey: "pst108",
    question:
      "Selon Bourdieu, d'où provient l'efficacité d'un énoncé performatif (« Status est magistratus ») ?",
    options: [
      "De la syntaxe et de la grammaire interne des mots (Austin)",
      "De l'autorité institutionnelle déléguée au locuteur autorisé",
      "De la force psychologique et du charisme naturel du locuteur",
      "Du niveau de vocabulaire soutenu utilisé",
    ],
    correctIdx: 1,
    explication18_20:
      "Bourdieu rompt avec l'illusion internaliste d'Austin : les mots ne tirent pas leur pouvoir de la langue, mais des rapports de force sociaux et de la délégation statutaire (Status est magistratus).",
    auteurRef: "Pierre Bourdieu (1982)",
  },
  {
    id: "sr-108-2",
    moduleKey: "pst108",
    question:
      "Dans la Méthode IOD (Castra & Valls), quelle est la règle déontologique cardinale ?",
    options: [
      "Évaluer au préalable les compétences du candidat par des tests psychotechniques",
      "Refus absolu de tout tri préalable et négociation directe avec l'entreprise",
      "Multiplier les stages d'employabilité pour adapter le candidat",
      "Réserver les offres aux candidats les plus motivés",
    ],
    correctIdx: 1,
    explication18_20:
      "La méthode IOD repose sur le refus éthique du tri des précaires : l'action porte sur le milieu de travail réel et la médiation continue, sans conditionnement préalable.",
    auteurRef: "Francis Valls & Denis Castra (2007)",
  },
  {
    id: "sr-108-3",
    moduleKey: "pst108",
    question:
      "Pour Jürgen Habermas, qu'est-ce qui caractérise l'« agir stratégique masqué » ?",
    options: [
      "Une recherche sincère d'entente mutuelle où chacun est libre de contredire",
      "La dissimulation d'une volonté d'influence sous le vernis d'une fausse concertation",
      "Un conflit ouvert et violent entre syndicats et direction",
      "L'usage d'un langage technique incompréhensible",
    ],
    correctIdx: 1,
    explication18_20:
      "L'agir stratégique masqué est une manipulation : le management fait semblant d'ouvrir la délibération, mais le projet est déjà figé pour garantir son propre succès.",
    auteurRef: "Jürgen Habermas (1981)",
  },
  {
    id: "sr-108-4",
    moduleKey: "pst108",
    question:
      "Pourquoi l'insulte au travail est-elle performative selon Éric Lucy (2021) ?",
    options: [
      "Parce qu'elle fait du bruit dans l'atelier",
      "Parce qu'elle réactive un rapport social d'asymétrie et un stigmate historique institué",
      "Parce qu'elle enfreint le règlement intérieur de l'entreprise",
      "Parce qu'elle blesse l'amour-propre narcissique individuel",
    ],
    correctIdx: 1,
    explication18_20:
      "L'insulte n'est pas un simple dérapage lexical : elle tire sa violence de ce qu'elle assigne la victime à une catégorie sociale dominée déjà historiquement constituée.",
    auteurRef: "Éric Lucy (2021)",
  },
  {
    id: "sr-108-5",
    moduleKey: "pst108",
    question:
      "Pour Axel Honneth, quelles sont les 3 sphères de la reconnaissance morale ?",
    options: [
      "Le salaire, la prime, l'avancement",
      "L'amour (confiance en soi), le droit (respect de soi), la solidarité/estime sociale",
      "L'évaluation hiérarchique, le contrôle qualité, l'audit RH",
      "La famille, le parti politique, l'association sportive",
    ],
    correctIdx: 1,
    explication18_20:
      "Honneth articule 3 sphères : intime (amour ➔ confiance en soi), juridique (droit ➔ respect de soi), sociale (contribution utile ➔ estime de soi).",
    auteurRef: "Axel Honneth (1992)",
  },

  // --- PST106 ---
  {
    id: "sr-106-1",
    moduleKey: "pst106",
    question:
      "En ergonomie de l'activité (Alain Wisner), quelle distinction est fondatrice ?",
    options: [
      "Travail manuel vs Travail intellectuel",
      "Tâche prescrite (ce qui est demandé) vs Activité réelle (ce qui se fait pour compenser le réel)",
      "Travail rémunéré vs Bénévolat",
      "Compétence technique vs Savoir-être comportemental",
    ],
    correctIdx: 1,
    explication18_20:
      "L'écart irréductible entre prescrit et réel est le cœur de l'ergonomie : l'activité réelle est toujours une création opératoire face aux aléas que la consigne ne peut prévoir.",
    auteurRef: "Alain Wisner (1995)",
  },
  {
    id: "sr-106-2",
    moduleKey: "pst106",
    question:
      "Dans la clinique de l'activité (Yves Clot), qu'est-ce que l'« activité empêchée » ?",
    options: [
      "L'interdiction de faire grève décidée par la préfecture",
      "La souffrance de ne pas pouvoir réaliser un travail de qualité selon les règles de l'art",
      "Une panne informatique qui bloque un écran pendant 10 minutes",
      "Le manque de diplôme pour accéder à une promotion",
    ],
    correctIdx: 1,
    explication18_20:
      "L'activité empêchée est le poison de la santé au travail : être contraint de saboter son propre travail par manque de temps ou sous pression chiffrée.",
    auteurRef: "Yves Clot (2010)",
  },
  {
    id: "sr-106-3",
    moduleKey: "pst106",
    question:
      "Selon Christophe Dejours, qui est le SEUL habilité à porter le « jugement de beauté » ?",
    options: [
      "Le Directeur des Ressources Humaines",
      "Le client ou bénéficiaire final du service",
      "Les pairs (collègues) qui partagent la connaissance intime des règles de l'art",
      "L'expert-comptable lors du bilan annuel",
    ],
    correctIdx: 2,
    explication18_20:
      "Seuls les pairs peuvent juger de la beauté d'un geste professionnel car eux seuls mesurent la difficulté réelle surmontée et le respect des règles de l'art.",
    auteurRef: "Christophe Dejours (1993)",
  },
  {
    id: "sr-106-4",
    moduleKey: "pst106",
    question:
      "Quelle est la définition du « Genre professionnel » pour Yves Clot ?",
    options: [
      "La répartition hommes/femmes dans une filière professionnelle",
      "La mémoire collective et vivante des règles officieuses et ficelles partagées par un collectif",
      "La description écrite du poste dans la convention collective",
      "Le règlement de sécurité officiel affiché à l'entrée de l'usine",
    ],
    correctIdx: 1,
    explication18_20:
      "Le genre est le répondant social du métier, le 'travail d'autrui dans mon travail' qui évite à l'opérateur de tout réinventer seul face au réel.",
    auteurRef: "Yves Clot (1999)",
  },
  {
    id: "sr-106-5",
    moduleKey: "pst106",
    question:
      "Qu'est-ce que l'« auto-confrontation croisée » mise au point par Clot et Faïta ?",
    options: [
      "Un entretien disciplinaire face à deux cadres supérieurs",
      "Le débat entre deux collègues visionnant et confrontant leurs différentes manières de faire",
      "Un questionnaire d'auto-évaluation noté de 1 à 10",
      "Une confrontation entre le salarié et le médecin du travail",
    ],
    correctIdx: 1,
    explication18_20:
      "En voyant un collègue faire autrement sur la même tâche, l'opérateur prend conscience de ses propres gestes et réactive la controverse professionnelle sur le travail bien fait.",
    auteurRef: "Yves Clot & Daniel Faïta (2000)",
  },

  // --- PST123 ---
  {
    id: "sr-123-1",
    moduleKey: "pst123",
    question:
      "Pour Claude Dubar (1991), l'identité est le résultat de quelle tension permanente ?",
    options: [
      "Tension entre salaire brut et salaire net",
      "Double transaction : transaction biographique (pour soi) et transaction relationnelle (pour autrui)",
      "Tension entre diplôme initial et expérience acquise",
      "Tension entre ambitions personnelles et vie familiale",
    ],
    correctIdx: 1,
    explication18_20:
      "L'identité n'est jamais figée : elle s'élabore en permanence entre qui je dis être dans mon histoire (pour soi) et ce que l'institution m'attribue comme étiquette (pour autrui).",
    auteurRef: "Claude Dubar (1991)",
  },
  {
    id: "sr-123-2",
    moduleKey: "pst123",
    question:
      "Dans les 4 modèles de pouvoir de Renaud Sainsaulieu, quel est le modèle des OS ouvriers ?",
    options: [
      "Le modèle négociateur fondé sur l'expertise",
      "Le modèle fusionnel fondé sur la camaraderie et l'égalitarisme de bande sans divergence",
      "Le modèle affinitaire fondé sur la séduction hiérarchique",
      "Le modèle du retrait fondé sur la vie de quartier",
    ],
    correctIdx: 1,
    explication18_20:
      "Privés de pouvoir sur leur machine, les ouvriers spécialisés font bloc dans un modèle fusionnel solidaire où toute différence individuelle est perçue comme une trahison.",
    auteurRef: "Renaud Sainsaulieu (1977)",
  },
  {
    id: "sr-123-3",
    moduleKey: "pst123",
    question:
      "Quelle loi protège en France le titre et l'exercice de psychologue ?",
    options: [
      "La Loi du 11 février 2005",
      "La Loi n° 85-772 du 25 juillet 1985 (article 44)",
      "Le décret du 14 mars 1965",
      "La directive européenne du 1er janvier 2000",
    ],
    correctIdx: 1,
    explication18_20:
      "La Loi du 25 juillet 1985 consacre le titre de psychologue (Titre RNCP niveau 7 du Cnam ou Master 2 + stage) et protège son autonomie technique face aux employeurs.",
    auteurRef: "Législation & Déontologie (1985, 2021)",
  },
  {
    id: "sr-123-4",
    moduleKey: "pst123",
    question:
      "Pour Robert Castel, qu'est-ce qui caractérise la « zone de vulnérabilité » ?",
    options: [
      "La maladie chronique génétique",
      "La précarité de l'emploi (CDD, intérim) couplée à la fragilité des liens relationnels",
      "La faillite bancaire immédiate",
      "Le refus individuel de chercher un emploi",
    ],
    correctIdx: 1,
    explication18_20:
      "La zone de vulnérabilité est l'antichambre de la désaffiliation : un pied dans le travail instable et un réseau familial fragilisé prêt à rompre.",
    auteurRef: "Robert Castel (1995)",
  },
  {
    id: "sr-123-5",
    moduleKey: "pst123",
    question:
      "Que démontre Thomas Le Bianic (2004) sur l'histoire des psychologues du travail ?",
    options: [
      "Que la profession a toujours été unie et sans débat depuis le XIXe siècle",
      "La 'balkanisation' historique de la profession entre ergonomes, psychotechniciens et cliniciens",
      "Que les psychologues du travail dépendaient entièrement des syndicats ouvriers",
      "Que le Cnam n'a joué aucun rôle dans l'histoire de la psychologie",
    ],
    correctIdx: 1,
    explication18_20:
      "Le Bianic analyse les luttes intestines pour la légitimité ('balkanisation') entre la sélection psychotechnique taylorienne et la clinique du travail émancipatrice.",
    auteurRef: "Thomas Le Bianic (2004)",
  },

  // --- PST120 ---
  {
    id: "sr-120-1",
    moduleKey: "pst120",
    question:
      "Selon Dejours, quelle est la fonction primordiale de la reconnaissance dans le travail ?",
    options: [
      "Elle compense financièrement les contraintes de productivité",
      "Elle permet la sublimation identitaire et transforme la souffrance en plaisir",
      "Elle flatte l'ego pour inciter au surpassement individuel",
      "Elle remplace le besoin de repos physiologique",
    ],
    correctIdx: 1,
    explication18_20:
      "En psychodynamique du travail, la reconnaissance (jugement d'utilité et de beauté) est le médiateur indispensable qui permet la sublimation de la souffrance en plaisir et protège la santé mentale.",
    auteurRef: "Christophe Dejours (1993)",
  },
  {
    id: "sr-120-2",
    moduleKey: "pst120",
    question:
      "Qu'appelle Pascale Molinier l'« idéologie défensive virile » dans les métiers dangereux ?",
    options: [
      "Une affirmation d'agressivité purement biologique des ouvriers masculins",
      "Une stratégie collective de défense visant à conjurer la peur par le déni partagé de la souffrance",
      "Un modèle de leadership autoritaire imposé par la direction",
      "Une méthode d'organisation taylorienne des chantiers",
    ],
    correctIdx: 1,
    explication18_20:
      "Molinier démontre que l'idéologie virile est une construction défensive collective qui anesthésie la perception du risque pour permettre aux opérateurs de tenir face au danger réel.",
    auteurRef: "Pascale Molinier (2006)",
  },
  {
    id: "sr-120-3",
    moduleKey: "pst120",
    question:
      "Pour Marie Pezé, quelle est la première étape clinique dans la prise en charge d'un salarié en souffrance aiguë ?",
    options: [
      "Une médiation immédiate face à son supérieur hiérarchique",
      "La mise à l'abri somatique et psychique par l'arrêt de travail médical",
      "Un test de personnalité MMPI en cabinet",
      "Une démission sans préavis",
    ],
    correctIdx: 1,
    explication18_20:
      "La clinique de Marie Pezé enseigne que face au délabrement somatique et à l'effondrement, la mise à l'abri par arrêt prescrit par le médecin traitant ou du travail prime sur toute tentative d'analyse.",
    auteurRef: "Marie Pezé (2008)",
  },

  // --- PST124 ---
  {
    id: "sr-124-1",
    moduleKey: "pst124",
    question:
      "Selon Pierre Rabardel, en quoi consiste le processus de « genèse instrumentale » ?",
    options: [
      "À l'achat et la livraison du matériel informatique dans le service",
      "À la double dynamique d'instrumentation (adaptation du sujet) et d'instrumentalisation (personnalisation/détournement de l'artefact)",
      "À la programmation du code source par les développeurs",
      "À la rédaction du manuel d'utilisation par l'ergonome",
    ],
    correctIdx: 1,
    explication18_20:
      "Rabardel distingue l'artefact technique (donné brut) de l'instrument (construit par le travailleur à travers l'instrumentation de ses schèmes et l'instrumentalisation de l'artefact, y compris par catachrèse).",
    auteurRef: "Pierre Rabardel (1995)",
  },
  {
    id: "sr-124-2",
    moduleKey: "pst124",
    question:
      "Dans le modèle de l'acceptation située (Bobillier-Chaumon), quelle est la critique faite aux modèles classiques TAM ?",
    options: [
      "Ils évaluent trop tardivement l'outil après des années d'usage",
      "Ils réduisent l'appropriation à une intention d'usage individuelle a priori, ignorant le travail réel et les collectifs",
      "Ils refusent d'utiliser des questionnaires quantitatifs",
      "Ils surévaluent l'importance du collectif de pairs",
    ],
    correctIdx: 1,
    explication18_20:
      "Le TAM évalue une acceptabilité a priori d'un usager rationnel isolé, sans voir que l'acceptation réelle se construit a posteriori dans les régulations de l'activité réelle et les arbitrages collectifs.",
    auteurRef: "Marie-Éric Bobillier-Chaumon (2016)",
  },
  {
    id: "sr-124-3",
    moduleKey: "pst124",
    question:
      "Pour Yrjö Engeström (théorie de l'activité historico-culturelle), d'où provient l'apprentissage expansif ?",
    options: [
      "De la mémorisation répétitive d'un manuel utilisateur",
      "De la résolution des contradictions internes et tensions structurelles au sein du système d'activité",
      "De l'attribution de récompenses financières aux opérateurs les plus rapides",
      "D'une directive descendante imposée sans concertation",
    ],
    correctIdx: 1,
    explication18_20:
      "L'apprentissage expansif émerge des contradictions systémiques (ex: valeur d'usage vs valeur d'échange, outils inadaptés aux règles institutionnelles) que le collectif surmonte en réinventant son activité.",
    auteurRef: "Yrjö Engeström (2001)",
  },
];

export function formatTimerSeconds(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export function computeGrade20(correctCount: number, totalQuestions: number): string {
  if (totalQuestions <= 0) return "0.0";
  return ((correctCount / totalQuestions) * 20).toFixed(1);
}

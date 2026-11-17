export interface AuthorDebat {
  name: string;
  tag: string;
  color: string;
  body: string;
}

export interface DebatAxis {
  axis: string;
  title: string;
  intro: string;
  authors: AuthorDebat[];
  synthesis: string;
}

export const DEBATS_AXES: DebatAxis[] = [
  {
    axis: "Axe 1",
    title: "Le Statut de l'Activité : Tâche vs Activité",
    intro:
      "Comment chaque courant définit-il et étudie-t-il l'activité humaine en situation de travail ?",
    authors: [
      {
        name: "Wisner",
        tag: "Tâche vs Activité",
        color: "var(--wisner, #2e6e9e)",
        body: "<strong>L'écart régulateur</strong>. L'ergonomie distingue la tâche (les consignes organisationnelles) de l'activité réelle (l'adaptation cognitive et corporelle de l'opérateur pour gérer les aléas).",
      },
      {
        name: "Clot",
        tag: "Le Réel de l'Activité",
        color: "var(--clot, #3e8e5e)",
        body: "<strong>Le possible et l'empêché</strong>. L'activité dépasse ce qui s'observe (l'activité réalisée). Elle inclut le réel de l'activité : ce qui aurait pu être fait, le suspendu, le contrarié, le conflictuel.",
      },
      {
        name: "Dejours",
        tag: "L'Épreuve du Réel",
        color: "var(--dejours, #7e5ebd)",
        body: "<strong>La résistance de la matière</strong>. Le réel est ce qui résiste à la prescription de l'organisation. Travailler, c'est buter sur cette résistance et faire preuve d'intelligence pratique pour la surmonter.",
      },
    ],
    synthesis:
      "Tous trois s'accordent sur le fait que la prescription organisationnelle est structurellement insuffisante pour accomplir le travail. <strong>Exemple à placer :</strong> les régulations informelles des opérateurs face aux pannes ou aux fluctuations de matières (Wisner), ou le conflit intérieur face à une consigne absurde (Clot).",
  },
  {
    axis: "Axe 2",
    title: "La Santé au Travail : Prévention vs Pouvoir d'agir",
    intro:
      "Quelle est la source de la souffrance au travail et comment préserver ou construire la santé des sujets ?",
    authors: [
      {
        name: "Wisner",
        tag: "Prévention physique & cognitive",
        color: "var(--wisner, #2e6e9e)",
        body: "<strong>L'ergonomie des postes</strong>. La souffrance provient d'une inadéquation physique ou d'une surcharge mentale. On prévient la fatigue et les TMS en adaptant ergonomiquement l'environnement technique.",
      },
      {
        name: "Clot",
        tag: "Pouvoir d'agir & Activité empêchée",
        color: "var(--clot, #3e8e5e)",
        body: "<strong>L'amputation subjective</strong>. La souffrance naît de l'activité empêchée (vouloir bien faire son travail sans en avoir les moyens ou le droit). La santé est le développement du pouvoir d'agir sur son milieu.",
      },
      {
        name: "Dejours",
        tag: "Souffrance, Défenses & Reconnaissance",
        color: "var(--dejours, #7e5ebd)",
        body: "<strong>La dynamique psychique</strong>. La confrontation au réel génère inévitablement de la souffrance. Elle est compensée par des stratégies de défense (idéologies collectives) et sublimée en plaisir par la reconnaissance.",
      },
    ],
    synthesis:
      "Opposez l'approche défensive de Dejours (comment le psychisme tolère la souffrance) à l'approche transformatrice de Clot (comment restaurer l'action sur le milieu de travail). <strong>Exemple :</strong> le port du casque détourné comme idéologie virile (Dejours) contre le débat sur la qualité empêchée du geste de sécurité (Clot).",
  },
  {
    axis: "Axe 3",
    title: "Le Collectif de travail : Coordination vs Règles de métier",
    intro:
      "Quel est le statut et la fonction du collectif de travail dans la situation de travail ?",
    authors: [
      {
        name: "Wisner",
        tag: "Coordination opérationnelle",
        color: "var(--wisner, #2e6e9e)",
        body: "<strong>Le collectif fonctionnel</strong>. Le collectif est analysé sous l'angle des flux de communication et de la répartition technique des tâches pour assurer la fluidité de la production et pallier les pannes.",
      },
      {
        name: "Clot",
        tag: "Le Genre Professionnel",
        color: "var(--clot, #3e8e5e)",
        body: "<strong>L'instrument psychologique</strong>. Le collectif est dépositaire du genre professionnel (la mémoire impersonnelle du métier). Il sert de bouclier et de ressource au sujet pour inventer son style sans s'épuiser.",
      },
      {
        name: "Dejours",
        tag: "Espace de délibération",
        color: "var(--dejours, #7e5ebd)",
        body: "<strong>L'éthique et les pairs</strong>. Le collectif est le garant des règles de l'art. C'est l'instance qui valide le travail de chacun à travers le jugement de beauté, base indispensable de la reconnaissance.",
      },
    ],
    synthesis:
      "Pour Wisner, le collectif est un rouage opérationnel ; pour Clot, un outil de régulation du métier (mémoire vivante) ; pour Dejours, un espace de jugement éthique et esthétique sans lequel la santé mentale s'effondre. <strong>Exemple :</strong> la pause-café comme lieu de reconstruction des règles de métier (Clot) ou d'élaboration des peurs collectives (Dejours).",
  },
  {
    axis: "Axe 4",
    title: "La Reconnaissance : Feedback opératoire vs Jugement d'utilité",
    intro:
      "Comment la reconnaissance au travail intervient-elle dans la construction de l'identité et de l'efficacité ?",
    authors: [
      {
        name: "Wisner",
        tag: "Feedback des résultats",
        color: "var(--wisner, #2e6e9e)",
        body: "<strong>La boucle de rétroaction</strong>. L'opérateur a besoin d'informations claires sur les effets de son action pour réguler son activité et adapter sa charge de travail.",
      },
      {
        name: "Clot",
        tag: "Reconnaissance du travail bien fait",
        color: "var(--clot, #3e8e5e)",
        body: "<strong>Le jugement par le travail</strong>. On ne reconnaît pas une personne dans le vide, on reconnaît la qualité de son travail. Quand le débat sur le travail bien fait est étouffé, la reconnaissance individuelle est une imposture.",
      },
      {
        name: "Dejours",
        tag: "Jugements d'utilité et de beauté",
        color: "var(--dejours, #7e5ebd)",
        body: "<strong>Les deux piliers</strong>. Le jugement d'utilité (hiérarchie/clients) confère une utilité sociale ; le jugement de beauté (pairs) valide la conformité aux règles de l'art. Tous deux sont indispensables.",
      },
    ],
    synthesis:
      "Dejours théorise le mécanisme psychologique précis de la reconnaissance (utilité + beauté). Clot insiste sur le fait que la reconnaissance doit porter sur l'activité réelle et la qualité disputée, non sur la personne elle-même. <strong>Exemple :</strong> le compliment managérial superficiel qui offense l'opérateur parce qu'il sait que le produit est bâclé (Clot).",
  },
  {
    axis: "Axe 5",
    title: "La Méthode d'Intervention : Observation vs Confrontation",
    intro:
      "Comment le praticien-chercheur intervient-il sur le terrain et quelle est sa posture clinique ?",
    authors: [
      {
        name: "Wisner",
        tag: "Observation systématique",
        color: "var(--wisner, #2e6e9e)",
        body: "<strong>L'analyse ergonomique</strong>. Observations directes, chronométrages, entretiens avec verbalisations simultanées ou consécutives pour identifier les contraintes et réaménager le poste.",
      },
      {
        name: "Clot",
        tag: "Autoconfrontations croisées",
        color: "var(--clot, #3e8e5e)",
        body: "<strong>La clinique de l'activité</strong>. Utilisation de la vidéo : le sujet commente son activité avec le chercheur (simple), puis avec un pair (croisée) pour relancer la controverse professionnelle et régénérer le genre.",
      },
      {
        name: "Dejours",
        tag: "Espace de parole clinique",
        color: "var(--dejours, #7e5ebd)",
        body: "<strong>La psychodynamique du travail</strong>. Dispositif de parole collective volontaire, sécurisé et confidentiel. Le chercheur aide le groupe à élaborer sa souffrance et à faire émerger ce qui ne se dit pas.",
      },
    ],
    synthesis:
      "Wisner observe pour adapter techniquement ; Clot filme pour faire débattre les travailleurs entre eux sur leur métier ; Dejours écoute en collectif pour faire parler ce qui est refoulé par les défenses. <strong>Exemple :</strong> l'évaluation d'un accident du travail sous l'angle du défaut de conception (Wisner), de la controverse sur le bon geste de sécurité (Clot), ou du déni du danger par une idéologie virile (Dejours).",
  },
];

export const DEBATS_GLOSSAIRE = [
  {
    term: "Ergonomie de l'activité (Alain Wisner)",
    def: "Courant né dans les années 1960 au Cnam. Postulat : l'opérateur n'est pas un exécutant passif mais un régulateur actif face aux écarts entre prescription (tâche) et réalité (activité). Vise la transformation technique et organisationnelle des postes pour préserver la santé et l'efficacité.",
  },
  {
    term: "Clinique de l'activité (Yves Clot)",
    def: "Courant fondé au Cnam dans les années 1990 dans la filiation vygotskienne. Postulat : l'activité humaine est habitée par le « réel de l'activité » (ce qu'on ne fait pas, ce qu'on voudrait faire). Vise le développement du pouvoir d'agir par la controverse professionnelle et la revitalisation du genre de métier.",
  },
  {
    term: "Psychodynamique du travail (Christophe Dejours)",
    def: "Courant né à la fin des années 1970 au Cnam. Postulat : le travail confronte le sujet à la résistance du réel, source de souffrance. Pour y faire face, les opérateurs déploient des stratégies de défense individuelles et collectives. La reconnaissance par les pairs et la hiérarchie permet de sublimer la souffrance en plaisir.",
  },
];

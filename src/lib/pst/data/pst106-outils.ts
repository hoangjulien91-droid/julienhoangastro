export interface SynthCard {
  title: string;
  desc: string;
}
export type SynthAxisKey =
  | "objectif"
  | "activite"
  | "methode"
  | "collectif"
  | "sante";

export const SYNTH_COMPARISONS: Record<
  SynthAxisKey,
  { wisner: SynthCard; clot: SynthCard; dejours: SynthCard }
> = {
  objectif: {
    wisner: {
      title: "Ergonomie (Wisner) : Adapter le travail",
      desc: "Adapter les situations de travail (outils, environnement, cadence) à l'homme pour préserver sa physiologie, sa charge mentale et sa sécurité tout en restant efficace.",
    },
    clot: {
      title: "Clinique de l'Activité (Clot) : Pouvoir d'agir",
      desc: "Relancer le pouvoir d'agir des sujets en transformant leurs situations de travail par le développement dialogique du métier et des règles de l'art.",
    },
    dejours: {
      title: "Psychodynamique (Dejours) : Sublimation",
      desc: "Comprendre les processus psychiques face à l'organisation du travail pour transformer la souffrance inhérente à l'épreuve du réel en plaisir et en santé.",
    },
  },
  activite: {
    wisner: {
      title: "Ergonomie (Wisner) : Tâche vs Activité",
      desc: "Distinction clé entre <b>tâche prescrite</b> (le but, les consignes formelles) et <b>activité réelle</b> (les régulations de l'opérateur face aux aléas physiques et organisationnels).",
    },
    clot: {
      title: "Clinique de l'Activité (Clot) : Le Réel de l'Activité",
      desc: "L'activité dépasse l'observable. Distinction entre <b>activité réalisée</b> et <b>réel de l'activité</b> (le possible, le suspendu, l'empêché, le conflictuel).",
    },
    dejours: {
      title: "Psychodynamique (Dejours) : Épreuve du Réel",
      desc: "Le travail est l'<b>épreuve du réel</b> : ce qui résiste à la prescription de l'organisation et qui exige la mobilisation de l'intelligence pratique (la mêtis).",
    },
  },
  methode: {
    wisner: {
      title: "Ergonomie (Wisner) : Mesure de terrain",
      desc: "Observations cliniques directes sur le poste de travail, enregistrement des conduites, mesures objectives de charge et verbalisations consécutives.",
    },
    clot: {
      title: "Clinique de l'Activité (Clot) : Autoconfrontations",
      desc: "Dispositifs dialogiques co-construits : <b>autoconfrontation simple</b> (vidéo commentée par l'auteur) et <b>autoconfrontation croisée</b> (débat technique entre deux pairs).",
    },
    dejours: {
      title: "Psychodynamique (Dejours) : Enquête Collective",
      desc: "Enquêtes psychodynamiques de terrain fondées exclusivement sur la parole libre et collective de salariés volontaires réunissant les chercheurs et le collectif.",
    },
  },
  collectif: {
    wisner: {
      title: "Ergonomie (Wisner) : Coordination technique",
      desc: "Le collectif est appréhendé sous l'angle des communications fonctionnelles et opérationnelles nécessaires pour compenser les pannes et accomplir la tâche.",
    },
    clot: {
      title: "Clinique de l'Activité (Clot) : Genre Professionnel",
      desc: "Le collectif est le garant du <b>genre professionnel</b> (le patrimoine officieux du métier) qui sert d'instrument psychologique au sujet pour élaborer son style.",
    },
    dejours: {
      title: "Psychodynamique (Dejours) : Règles et Reconnaissance",
      desc: "Le collectif de pairs délibère sur les règles de métier et valide le travail de chacun à travers le <b>jugement de beauté</b>, condition essentielle de la reconnaissance.",
    },
  },
  sante: {
    wisner: {
      title: "Ergonomie (Wisner) : Prévention physique & TMS",
      desc: "La santé est menacée par les contraintes physiques nocives et la surcharge mentale. On prévient le risque par la conception ergonomique optimale des postes.",
    },
    clot: {
      title: "Clinique de l'Activité (Clot) : Activité empêchée",
      desc: "La souffrance naît de l'<b>activité empêchée</b> (être privé du pouvoir de bien faire son travail selon les règles de l'art), amputant la subjectivité et le développement.",
    },
    dejours: {
      title: "Psychodynamique (Dejours) : Souffrance et Défenses",
      desc: "La souffrance est inévitable mais contenue par des <b>stratégies de défense</b> (ex. idéologies collectives) ; la santé est gagnée par la reconnaissance de l'effort.",
    },
  },
};

export const SYNTH_AXES: { key: SynthAxisKey; label: string }[] = [
  { key: "objectif", label: "Objectifs" },
  { key: "activite", label: "L'Activité" },
  { key: "methode", label: "Méthodes" },
  { key: "collectif", label: "Le Collectif" },
  { key: "sante", label: "La Santé" },
];

export type IntroThemeKey = "activite" | "sante" | "collectif" | "methode";

export const INTRO_THEMES: Record<
  IntroThemeKey,
  { step1: string; step2: string; step3: string; step4: string }
> = {
  activite: {
    step1:
      "Le travail humain ne se résume jamais à l'exécution passive de directives. La psychologie du travail s'est construite sur le constat qu'il existe un décalage irréductible entre la tâche prescrite par l'organisation et l'activité réelle déployée par le travailleur pour faire face aux imprévus du terrain.",
    step2:
      "Pour <b>Alain Wisner</b> (ergonomie de l'activité), l'écart est la clé de la régulation physique et cognitive face aux aléas de la situation de travail. Pour <b>Yves Clot</b> (clinique de l'activité), cette analyse s'élargit au plan subjectif : l'activité déborde l'observable pour include le réel de l'activité (ce qui est empêché, contrarié ou suspendu), posant le pouvoir d'agir comme pivot de la santé.",
    step3:
      "Dès lors, dans quelle mesure l'analyse des situations de travail doit-elle se limiter à mesurer et corriger l'écart entre la prescription et l'action réalisée, ou doit-elle remonter aux conflits de l'activité subjective pour développer le métier ?",
    step4:
      "Nous verrons d'abord comment l'ergonomie de l'activité a théorisé l'écart prescrit/réel pour adapter le travail à l'homme. Puis, nous analyserons l'approche clinique d'Yves Clot centrée sur l'activité empêchée et le pouvoir d'agir. Enfin, nous proposerons une synthèse sur l'articulation de ces perspectives pour la santé au travail.",
  },
  sante: {
    step1:
      "La question de la santé et du bien-être au travail constitue un enjeu de débat majeur opposant les visions hygiénistes de prévention des risques aux cliniques du travail qui lient la santé au sens même de l'activité et de la subjectivité.",
    step2:
      "Pour <b>Christophe Dejours</b> (psychodynamique du travail), la souffrance est inhérente à la confrontation au réel du travail, mais elle peut être sublimée en plaisir par la reconnaissance (jugements de beauté et d'utilité) et l'élaboration de défenses. Pour <b>Yves Clot</b> (clinique de l'activité), la santé n'est pas le simple équilibre ou l'absence de souffrance, mais le pouvoir d'agir du sujet sur son milieu de travail, menacé par l'activité empêchée.",
    step3:
      "Dès lors, la souffrance psychologique au travail doit-elle être traitée comme un risque individuel à compenser par des stratégies défensives, ou comme le symptôme d'une amputation collective du pouvoir d'agir sur son métier ?",
    step4:
      "Nous aborderons d'abord le modèle psychodynamique de Dejours centré sur le couple souffrance-plaisir et le rôle pivot de la reconnaissance. Nous étudierons ensuite la thèse de Clot sur la santé comme pouvoir d'action et les ravages de l'activité empêchée. Enfin, nous conclurons sur l'importance de restaurer des espaces de discussion sur le travail de qualité.",
  },
  collectif: {
    step1:
      "Le collectif de travail a longtemps été perçu sous un angle purement instrumental de coordination des tâches ou, à l'inverse, comme une source potentielle de conflits relationnels.",
    step2:
      "Pour <b>Yves Clot</b>, le collectif prend la forme du <b>genre professionnel</b>, un patrimoine historique, social et technique qui fournit au sujet les ressources pour agir sans s'épuiser. Pour <b>Christophe Dejours</b>, le collectif est l'instance garante de la délibération sur les règles de métier, validant le travail par le <b>jugement de beauté</b> rendu par les pairs, condition de la reconnaissance.",
    step3:
      "Ainsi, le collectif de travail doit-il être conçu comme un simple rouage organisationnel de soutien technique, ou comme une instance transpersonnelle indispensable à la construction de la subjectivité et des règles de l'art ?",
    step4:
      "Nous analyserons d'abord le concept de genre professionnel chez Clot et sa contribution au style individuel. Nous détaillerons ensuite le rôle des pairs dans l'attribution de la reconnaissance chez Dejours. Enfin, nous conclurons sur la nécessité de défendre des collectifs vivants face à l'individualisation des évaluations.",
  },
  methode: {
    step1:
      "L'intervention clinique sur le terrain fait face à un défi épistémologique et éthique : comment le chercheur-intervenant peut-il agir sur les situations de travail sans imposer des solutions venues d'en haut qui ignoreraient le savoir des travailleurs ?",
    step2:
      "La psychotechnique positiviste historique utilisait des tests d'aptitudes quantitatifs pour affecter les salariés à leur poste de manière objective. Pour dépasser ce réductionnisme, <b>Yves Clot</b> a élaboré des méthodes dialogiques comme l'<b>autoconfrontation simple et croisée</b>, visant à faire débattre les professionnels de leurs pratiques filmées pour relancer le dialogue professionnel. Parallèlement, <b>Christophe Dejours</b> s'appuie sur l'enquête collective centrée sur la parole et l'analyse partagée de la souffrance.",
    step3:
      "Dès lors, dans quelle mesure les méthodes d'intervention en psychologie du travail doivent-elles viser la mesure et le contrôle externe des aptitudes, ou au contraire la relance du dialogue professionnel entre pairs ?",
    step4:
      "Nous étudierons d'abord les limites historiques et conceptuelles de la psychotechnique expérimentale. Nous présenterons ensuite le cadre de l'autoconfrontation croisée en clinique de l'activité. Enfin, nous analyserons l'apport des enquêtes de parole en psychodynamique du travail.",
  },
};

export const INTRO_THEME_LABELS: { key: IntroThemeKey; label: string }[] = [
  { key: "activite", label: "Tâche et Activité" },
  { key: "methode", label: "Méthodes d'Intervention" },
  { key: "sante", label: "Santé et Souffrance" },
  { key: "collectif", label: "Le Collectif et le Métier" },
];

export const MEMO_METHODO = [
  {
    key: "wisner",
    color: "var(--wisner)",
    title: "Ergonomie de l'Activité (Wisner)",
    items: [
      {
        b: "Rapport au terrain",
        t: "Observation clinique directe sur le poste de travail et entretiens d'explicitation.",
      },
      {
        b: "Objectif",
        t: "Repérer la variabilité et l'écart prescrit/réel pour adapter les dispositifs techniques et organisationnels.",
      },
      {
        b: "Mots-clés",
        t: '"Analyse de la charge", "Observations systématiques", "Écart régulateur".',
      },
    ],
  },
  {
    key: "clot",
    color: "var(--clot)",
    title: "Clinique de l'Activité (Clot)",
    items: [
      {
        b: "Rapport au terrain",
        t: "Co-construction d'un cadre dialogique de confrontation professionnelle (vidéo).",
      },
      {
        b: "Objectif",
        t: "Relancer le dialogue sur les règles de l'art pour développer le métier et le pouvoir d'agir.",
      },
      {
        b: "Mots-clés",
        t: '"Autoconfrontation croisée", "Controverse professionnelle", "Genre de métier".',
      },
    ],
  },
  {
    key: "dejours",
    color: "var(--dejours)",
    title: "Psychodynamique du travail (Dejours)",
    items: [
      {
        b: "Rapport au terrain",
        t: "Enquêtes cliniques basées sur la parole libre et collective de travailleurs volontaires.",
      },
      {
        b: "Objectif",
        t: "Analyser les processus de négociation de la souffrance et la construction de la santé par la reconnaissance.",
      },
      {
        b: "Mots-clés",
        t: '"Espace de délibération", "Jugement de beauté/utilité", "Stratégies de défense".',
      },
    ],
  },
  {
    key: "lahy",
    color: "var(--methode)",
    title: "Psychotechnique Historique (Lahy)",
    items: [
      {
        b: "Rapport au terrain",
        t: "Administration de tests psychomoteurs et chronométrages de laboratoire.",
      },
      {
        b: "Objectif",
        t: "Sélectionner et affecter les travailleurs selon leurs aptitudes physiologiques prédéterminées.",
      },
      {
        b: "Mots-clés",
        t: '"Mesure quantitative", "Sélection d\'aptitudes", "Positivisme".',
      },
    ],
  },
];

export const ARME_ULTIME = {
  title: "L'Arme Ultime de Conclusion : La Normativité de Georges Canguilhem",
  intro:
    "Pour une conclusion brillante, ouvrez sur le philosophe et médecin <b>Georges Canguilhem</b>. Il redéfinit le vivant et la santé d'une manière qui irrigue toute la clinique moderne du travail :",
  points: [
    {
      b: "Le vivant n'est pas passif",
      t: "Il n'est pas une machine qui subit l'environnement, mais un sujet qui cherche à imposer ses propres normes de vie (normativité).",
    },
    {
      b: "La santé comme création",
      t: "La santé n'est pas seulement l'absence de maladie ou de TMS (le silence des organes), c'est la capacité active de tolérer des infractions aux normes du milieu (comme les contraintes du travail) et d'en instaurer de nouvelles.",
    },
    {
      b: "Lien avec le travail",
      t: "Un travailleur n'est en bonne santé que s'il peut adapter son geste et peser sur son milieu (le style, le pouvoir d'agir). L'organisation rigide (Taylorisme) qui interdit toute normativité personnelle est pathogène.",
    },
  ],
};

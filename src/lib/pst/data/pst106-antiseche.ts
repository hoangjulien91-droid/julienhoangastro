export const ANTISECHE_HISTOIRE = [
  {
    th: "Psychotechnique",
    td: "Courant historique (Lahy, Toulouse) visant à mesurer les <b>aptitudes</b> physiologiques objectives pour la sélection professionnelle.",
  },
  {
    th: "Taylorisme",
    td: "Division scientifique du travail (conception vs exécution). Wallon et Lahy dénoncent l'usure de l'organisme et la mutilation subjective de l'activité.",
  },
  {
    th: "Approche clinique",
    td: "S'intéresse au sens du travail, à la subjectivité et au réel du geste face à une approche purement positiviste et chronométrée.",
  },
  {
    th: "Exemple",
    td: "L'étude des traminots (Lahy) ou la crise de fatigue chez les conducteurs de tramway face à la rigidité des horaires.",
  },
];

export const ANTISECHE_MATRICE = {
  headers: [
    "Axe",
    "Wisner (Ergonomie)",
    "Clot (Clinique activité)",
    "Dejours (Psychodynamique)",
  ],
  rows: [
    {
      axe: "Moteur",
      erg: "écart prescrit/réel",
      act: "pouvoir d'agir & dialogue",
      psy: "sublimation & reconnaissance",
    },
    {
      axe: "Activité",
      erg: "activité réelle (observable)",
      act: "réel de l'activité (empêché)",
      psy: "épreuve du réel (résistance)",
    },
    {
      axe: "Collectif",
      erg: "coordination fonctionnelle",
      act: "genre professionnel (métier)",
      psy: "délibération, règles & reconnaissance",
    },
    {
      axe: "Santé",
      erg: "absence de fatigue & TMS",
      act: "pouvoir d'agir sur le milieu",
      psy: "équilibre psychique souffrance/plaisir",
    },
    {
      axe: "Méthode",
      erg: "observations terrain directes",
      act: "autoconfrontation simple/croisée",
      psy: "enquêtes cliniques collectives",
    },
    {
      axe: "Signature",
      erg: "l'adaptation du travail",
      act: "le dialogue de métier",
      psy: "le psychanalyste du travail",
    },
  ],
};

export const ANTISECHE_AUTEURS = [
  {
    key: "wisner",
    color: "var(--wisner)",
    title: "③ Wisner (Ergonomie)",
    lines: [
      {
        b: "Projet",
        t: "Adapter le travail à l'homme. Contraintes physiologiques et cognitives des postes.",
      },
      {
        b: "Notions",
        t: "Tâche prescrite (consignes formelles) vs Activité réelle (régulations de l'opérateur).",
      },
      {
        b: "Méthode",
        t: "Analyse clinique de l'activité réelle sur le terrain, mesures physiques de la charge de travail.",
      },
      {
        b: "Exemple",
        t: "La modification informelle du rythme de travail par les opérateurs pour s'accorder des temps de repos.",
      },
    ],
  },
  {
    key: "clot",
    color: "var(--clot)",
    title: "④ Clot (Clinique de l'Activité)",
    lines: [
      {
        b: "Thèse",
        t: "La santé est le développement du pouvoir d'agir sur son milieu de travail. Subjectivité créatrice du geste de métier.",
      },
      {
        b: "Notions",
        t: "Activité réalisée vs Réel de l'activité (le suspendu, le conflictuel) · Genre professionnel (mémoire du métier) vs Style individuel.",
      },
      {
        b: "Souffrance",
        t: "Activité empêchée (impossible de bien faire son travail selon les règles de l'art).",
      },
      {
        b: "Méthode",
        t: "Autoconfrontation simple et croisée pour provoquer la controverse professionnelle.",
      },
    ],
  },
];

export const ANTISECHE_DEJOURS = {
  key: "dejours",
  color: "var(--dejours)",
  title: "⑤ Dejours (Psychodynamique)",
  lines: [
    {
      b: "Thèse",
      t: "Le travail est l'épreuve du réel (ce qui résiste à la prescription). Négociation psychique de la souffrance.",
    },
    {
      b: "Notions",
      t: "Idéologies défensives collectives (ex. bravade face au danger) · Intelligence pratique (mêtis).",
    },
    {
      b: "Santé",
      t: "Sublimation de la souffrance en plaisir par la reconnaissance (jugement d'utilité et jugement de beauté).",
    },
    {
      b: "Méthode",
      t: "Enquête collective de parole libre avec les salariés volontaires.",
    },
  ],
};

export const ANTISECHE_BONUS = {
  title: "⑥ Auteurs Bonus (Ouverture Conclusion)",
  lines: [
    {
      b: "Georges Canguilhem",
      t: "La santé comme <b>normativité vitale</b> (capacité de tolérer les infractions aux normes du milieu et d'en créer de nouvelles). Lien direct avec le pouvoir d'agir de Clot.",
    },
    {
      b: "Karl Marx",
      t: "Le concept de <b>travail aliéné</b> (le travailleur est dépossédé du produit et de l'acte de travail, devenant extérieur à lui-même).",
    },
    {
      b: "Michel Foucault",
      t: "Le Taylorisme comme instrument de <b>discipline des corps</b> et de dressage des corps dociles.",
    },
  ],
};

export const ANTISECHE_EXEMPLES = [
  {
    th: "Wisner",
    color: "var(--wisner)",
    td: "Le détournement des cadences par des ouvriers pour créer des stocks tampons et souffler.",
  },
  {
    th: "Clot",
    color: "var(--clot)",
    td: "Le conflit des guichetiers de la Poste (entre l'accueil chaleureux et le rendement chronométré) = activité empêchée.",
  },
  {
    th: "Dejours",
    color: "var(--dejours)",
    td: "Les bravades viriles des ouvriers du bâtiment refusant le harnais de sécurité = idéologie défensive collective.",
  },
  {
    th: "Histoire",
    color: undefined,
    td: "L'usure rapide et les accidents de traminots (Lahy) sous pression des cadences tayloriennes rigides.",
  },
];

export const ANTISECHE_METHODE =
  "Idée émise &rarr; Auteur + concept &rarr; <b>Exemple clinique</b> &rarr; <b>Contraste</b> avec un autre courant &rarr; Conclusion = <b>Signature</b>. Rédiger sans liste à puces. ~15 min/question.";

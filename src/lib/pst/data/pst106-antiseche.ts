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

/**
 * ============================================================================
 * ENRICHISSEMENTS COURS 1 PST 106 (Prof. Christine Lagabrielle / Cnam)
 * ============================================================================
 */

export interface PhilosopheItem {
  id: string;
  auteur: string;
  dates: string;
  axe: "alienation" | "emancipation" | "realite";
  axeLabel: string;
  these: string;
  citation: string;
  relevance: string;
}

export const ANTISECHE_PHILOSOPHES: PhilosopheItem[] = [
  {
    id: "rousseau",
    auteur: "Jean-Jacques Rousseau",
    dates: "1712–1778",
    axe: "alienation",
    axeLabel: "Aliénation & Servitude",
    these:
      "Dans l'état de nature, l'homme est libre, autosuffisant et pacifique. C'est l'apparition de l'agriculture et de la métallurgie qui engendre la propriété privée, la division sociale du travail et la servitude.",
    citation:
      "« Le premier qui ayant enclos un terrain s'avisa de dire : Ceci est à moi, et trouva des gens assez simples pour le croire, fut le vrai fondateur de la société civile. »",
    relevance:
      "Vision pessimiste du travail comme dénaturation originelle et perte irrémédiable de liberté.",
  },
  {
    id: "nietzsche",
    auteur: "Friedrich Nietzsche",
    dates: "1844–1900",
    axe: "alienation",
    axeLabel: "Police des Esprits",
    these:
      "Le travail acharné et sans relâche est la meilleure des polices (« le frein le plus sûr ») : il consume la force nerveuse, tarit l'énergie de penser et maintient les individus dans la docilité envers la communauté.",
    citation:
      "« Le travail acharné du matin au soir est la meilleure des polices, car il tient chacun en bride et entrave puissamment le développement de la raison et des désirs d'indépendance. »",
    relevance:
      "Critique radicale de la glorification morale du travail comme instrument d'asservissement collectif.",
  },
  {
    id: "marcuse",
    auteur: "Herbert Marcuse",
    dates: "1898–1979",
    axe: "alienation",
    axeLabel: "Principe de Rendement",
    these:
      "Dans la société industrielle avancée, le travail impose un « principe de rendement » qui réprime les pulsions de vie (Éros). La rationalité technologique sert de voile à un conformisme et une aliénation totale.",
    citation:
      "« La domination technologique s'exerce non pas contre la liberté mais à travers les désirs de consommation fabriqués de toutes pièces. »",
    relevance:
      "Analyse critique du management moderne, de l'intensification et du consumérisme aliénant.",
  },
  {
    id: "arendt",
    auteur: "Hannah Arendt",
    dates: "1906–1975",
    axe: "alienation",
    axeLabel: "Travail vs Œuvre vs Action",
    these:
      "La <i>Condition de l'homme moderne</i> (1958) distingue <b>Labor</b> (le Travail servile, asservi au métabolisme biologique et à la survie), <b>Work</b> (l'Œuvre, fabrication durable d'un monde d'objets) et <b>Action</b> (la Praxis, parole libre et citoyenneté politique dans l'espace public).",
    citation:
      "« L'animal laborans ne fabrique pas le monde, il ne fait qu'alimenter le processus vital de son propre corps. »",
    relevance:
      "Distingue la condition biologique de subsistance de l'émancipation citoyenne par la parole.",
  },
  {
    id: "weber",
    auteur: "Max Weber",
    dates: "1864–1920",
    axe: "emancipation",
    axeLabel: "Vocation (Beruf) & Devoir",
    these:
      "Dans <i>L'Éthique protestante et l'esprit du capitalisme</i> (1905), le travail n'est plus une punition mais une vocation sacrée (<i>Beruf</i>), un devoir ascétique et le signe tangible de l'élection divine.",
    citation:
      "« L'homme ne vit pas pour travailler, mais il doit travailler pour accomplir son devoir d'état voulu par Dieu. »",
    relevance:
      "Fondement socio-historique de la valeur morale attribuée au travail dans la modernité occidentale.",
  },
  {
    id: "kant",
    auteur: "Emmanuel Kant",
    dates: "1724–1804",
    axe: "emancipation",
    axeLabel: "Devoir Moral & Dignité",
    these:
      "Le travail arrache l'homme à la paresse naturelle et animale. C'est par l'effort et la discipline que l'être humain développe ses facultés, cultive ses talents et réalise sa dignité morale.",
    citation:
      "« L'homme est le seul animal qui doit travailler. S'il se contentait de vivre sans effort, il ne s'élèverait jamais au-dessus de la brute. »",
    relevance:
      "L'effort laborieux comme condition de l'humanisation de soi et de l'autonomie éthique.",
  },
  {
    id: "hegel",
    auteur: "G.W.F. Hegel",
    dates: "1770–1831",
    axe: "emancipation",
    axeLabel: "Dialectique Maître-Esclave",
    these:
      "Dans la <i>Phénoménologie de l'esprit</i>, le maître ne fait que consommer passivement le produit. C'est l'esclave qui, par son travail sur la matière, éduque son désir, acquiert la maîtrise de soi et transforme le monde réel.",
    citation:
      "« Le travail est le désir réfréné, la disparition retardée : le travail forme. »",
    relevance:
      "Le travail comme matrice de la conscience de soi et instrument premier d'émancipation historique.",
  },
  {
    id: "marx",
    auteur: "Karl Marx",
    dates: "1818–1883",
    axe: "emancipation",
    axeLabel: "Essence Générique vs Aliénation",
    these:
      "Le travail est l'essence générique de l'homme (<i>Gattungswesen</i>) : l'homme s'extériorise et s'humanise en transformant la nature avec des outils. Dans le capitalisme, il devient aliéné : dépossession du produit, de l'acte et de soi.",
    citation:
      "« En transformant la nature par son travail, l'homme transforme en même temps sa propre nature. »",
    relevance:
      "Socle de l'approche historico-culturelle (Vygotski, Clot) : l'activité instrumentée développe le psychisme.",
  },
  {
    id: "freud",
    auteur: "Sigmund Freud",
    dates: "1856–1939",
    axe: "realite",
    axeLabel: "Lien au Réel & Sublimation",
    these:
      "Dans <i>Malaise dans la civilisation</i> (1930), Freud affirme que le travail est le lien le plus solide avec la réalité. Il offre un exutoire économique indispensable pour sublimer les pulsions agressives et libidinales.",
    citation:
      "« Aucune autre technique de conduite de la vie ne rattache l'individu si solidement à la réalité que le travail. »",
    relevance:
      "Précurseur direct de la Psychodynamique du travail de Dejours (sublimation de la souffrance en plaisir).",
  },
];

export const ANTISECHE_JAHODA = {
  titre: "Les 5 fonctions latentes du travail (Marie Jahoda, Marienthal 1930)",
  intro:
    "Marie Jahoda distingue la <b>fonction manifeste</b> (gagner un salaire pour assurer sa subsistance matérielle) de <b>5 fonctions latentes indispensables</b> à la santé psychique :",
  fonctions: [
    {
      num: "1",
      label: "Structure temporelle",
      desc: "Fournit une armature chronologique au jour, à la semaine et aux saisons ; prévient la dérive temporelle.",
    },
    {
      num: "2",
      label: "Contacts sociaux élargis",
      desc: "Ouvre des interactions sociales régulières en dehors du cercle familial immédiat.",
    },
    {
      num: "3",
      label: "Buts et finalités collectives",
      desc: "Inscrit l'individu dans un dessein qui le dépasse et donne un sens partagé à l'action.",
    },
    {
      num: "4",
      label: "Statut social & Identité",
      desc: "Confère une reconnaissance sociale, une place lisible et un rôle dans la communauté.",
    },
    {
      num: "5",
      label: "Activité régulière obligatoire",
      desc: "Mobilise l'énergie physique et cognitive, évitant l'inertie et l'inhibition motrice.",
    },
  ],
  conclusionMarienthal:
    "<b>L'enquête historique de Marienthal (1930)</b> : chez les ouvriers frappés par la fermeture de l'usine textile, la détresse psychique et l'apathie résultaient de la privation de ces 5 fonctions latentes bien plus que du seul manque d'argent. Complété par <b>Fox (1980)</b> qui ajoute le besoin de transcendance existentielle.",
};

export const ANTISECHE_SUPER = {
  titre: "Stades de carrière et cycles de vie (Donald Super, 1957)",
  stades: [
    {
      age: "15 – 24 ans",
      nom: "Exploration",
      desc: "Cristallisation des intérêts, apprentissage, premiers essais professionnels et choix d'orientation.",
    },
    {
      age: "25 – 44 ans",
      nom: "Établissement",
      desc: "Stabilisation, acquisition d'expertise, consolidation du statut et recherche d'avancement.",
    },
    {
      age: "45 – 64 ans",
      nom: "Maintien",
      desc: "Préservation des acquis, transmission aux pairs juniors, gestion de l'usure et ajustements.",
    },
    {
      age: "65+ ans",
      nom: "Désengagement",
      desc: "Ralentissement progressif, départ en retraite, redistribution des rôles de vie (Rainbow de Super).",
    },
  ],
  transitions:
    "<b>Transitions et mini-cycles (Super & Schlossberg)</b> : la carrière contemporaine n'est plus linéaire. Chaque reconversion, crise ou rupture impose un <i>mini-cycle</i> de ré-exploration et d'auto-évaluation (modèle des 4S : Situation, Self, Support, Strategies).",
};

export const ANTISECHE_HOFSTEDE = {
  titre: "Les 4 dimensions transculturelles du travail (Hofstede / Louche, 2001)",
  dims: [
    {
      sigle: "PDI",
      label: "Distance hiérarchique",
      desc: "Mesure l'acceptation de l'inégalité de pouvoir entre chef et subordonné (faible = concertation ; forte = obéissance formelle).",
    },
    {
      sigle: "IDV",
      label: "Individualisme vs Collectivisme",
      desc: "Priorité accordée aux réalisations et à l'autonomie individuelles vs primauté de la loyauté et de la cohésion du groupe.",
    },
    {
      sigle: "UAI",
      label: "Contrôle de l'incertitude",
      desc: "Besoin de règles écrites strictes et d'ordre pour contrer l'anxiété vs tolérance naturelle au flou et à l'ambiguïté.",
    },
    {
      sigle: "MAS",
      label: "Masculinité vs Féminité",
      desc: "Valorisation de la compétition, de l'ambition et du gain matériel vs solidarité, climat humain et équilibre des temps de vie.",
    },
  ],
};

export const ANTISECHE_GAY_LUSSAC = [
  {
    auteur: "Jules Amar (1914)",
    concept: "Le Moteur Humain",
    apport:
      "Premier laboratoire de physiologie du travail au CNAM ; analyse biomécanique du geste, prothèses et rééducation des mutilés de 14-18.",
  },
  {
    auteur: "Jean-Maurice Lahy (1910–1925)",
    concept: "Réfutation de la prédisposition",
    apport:
      "Démontre sur les traminots que les accidents sont dus aux cadences et aux horaires rigides, réfutant la thèse patronale de la prédisposition individuelle innée.",
  },
  {
    auteur: "Suzanne Pacaud",
    concept: "Vieillissement & Aptitudes",
    apport:
      "Pionnière de la psychologie différentielle au CNAM ; prouve les capacités de compensation cognitive et motrice des ouvriers expérimentés face au vieillissement.",
  },
  {
    auteur: "Ombredane & Faverge (1955)",
    concept: "L'Analyse du Travail",
    apport:
      "Ouvrage fondateur marquant le saut épistémologique du laboratoire vers l'observation de l'activité réelle en situation naturelle de production.",
  },
  {
    auteur: "Jacques Leplat & Xavier Cuny (1970)",
    concept: "Méthode de l'Arbre des Causes",
    apport:
      "Analyse systémique a posteriori des accidents (INRS) : reconstitution objective de la chaîne des faits sans recherche de faute ou de coupable individuel.",
  },
  {
    auteur: "Laville, Teiger & Duraffourg (1972)",
    concept: "Enquête Thomson (Montage TV)",
    apport:
      "Démonstration clinique de la souffrance des ouvrières sur chaîne sous cadence imposée : conflit aigu de régulation entre rapidité et précision visuelle.",
  },
  {
    auteur: "Scission historique au CNAM (1990)",
    concept: "Psychodynamique vs Activité",
    apport:
      "Succession de Pierre Goguelin &rarr; arrivée de Christophe Dejours (Laboratoire de Psychodynamique) &rarr; fondation du CRTD par Yves Clot (Clinique de l'Activité).",
  },
];

export const ANTISECHE_EMBOITEMENT = {
  titre: "L'emboîtement de la Clinique du Travail (Dominique Lhuilier, Slide 40)",
  niveaux: [
    {
      rang: "1. Champ global",
      nom: "Psychologie du Travail",
      desc: "Discipline englobante étudiant l'homme au travail, ses conduites, ses aptitudes, son ergonomie et ses interactions organisationnelles.",
    },
    {
      rang: "2. Champ spécifique",
      nom: "Clinique du Travail",
      desc: "Fondée sur la primauté de la subjectivité, de l'expérience vécue et du rapport santé / souffrance au travail.",
    },
    {
      rang: "3. Deux paradigmes majeurs",
      nom: "Psychodynamique (Dejours) + Clinique de l'Activité (Clot)",
      desc: "Dejours explore la négociation de la souffrance et la reconnaissance ; Clot explore le développement du pouvoir d'agir et les controverses de métier.",
    },
  ],
};

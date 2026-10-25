/**
 * Activités Distantes (AD) et documents ressources officiels pour PST108
 * Articulés selon les 3 enseignants responsables :
 * 1. M. Éric LUCY (Pragmatique, Sociologie critique, Reconnaissance, Insulte, SAMU Social)
 * 2. M. Francis VALLS (Clinique de l'insertion, Méthode IOD, refus du tri préalable)
 * 3. Mme Véronique MAROT (Sciences du langage, Vygotski vs Piaget, Golse, Boutet & Fraenkel)
 */

export interface Pst108TeacherAd {
  prof: string;
  role: string;
  moodleUrl: string;
  moodleSectionId: string;
  themeGeneral: string;
  audioResource?: {
    title: string;
    url: string;
    duration: string;
    summary: string;
  };
  slideMasterclass?: {
    oeuvreArt: string;
    annee: string;
    titre: string;
    axes: {
      num: number;
      titre: string;
      description: string;
      notionsCles: string[];
      auteurs: string[];
    }[];
  };
  documentsClefs: {
    id: string;
    titre: string;
    auteur: string;
    annee: string;
    type: string;
    fichierLocal: string;
    resumePedagogique: string;
    concept18: string;
  }[];
}

export const PST108_AD_DATA: Record<"lucy" | "valls" | "marot", Pst108TeacherAd> = {
  lucy: {
    prof: "M. Éric LUCY",
    role: "Sociologue clinicien, enseignant au Cnam",
    moodleUrl: "https://naq.moodle.lecnam.net/course/view.php?id=8822&sectionid=68124",
    moodleSectionId: "68124",
    themeGeneral: "Pragmatique de la communication, rapports de pouvoir symbolique & éthique de la discussion",
    audioResource: {
      title: "Philorama (Radio RAM05) : Les enjeux sociaux du langage",
      url: "https://ram05.fr/podcasts/philorama/le-langage-2011",
      duration: "44 minutes",
      summary:
        "Émission radiophonique approfondie explorant comment le langage façonne la réalité sociale, les rapports de domination institués, la violence symbolique des mots et les conditions d'un espace délibératif authentique au travail.",
    },
    slideMasterclass: {
      oeuvreArt: "La Tour de Babel (Pieter Brueghel l'Ancien)",
      annee: "1563",
      titre: "Comment peut-on penser le langage ? Les 3 grands paradigmes",
      axes: [
        {
          num: 1,
          titre: "Le langage comme construction du sujet",
          description:
            "Le langage est l'expression de l'évolution de la personne et la manifestation de sa personnalité. Il s'enracine dans le cerveau (aires de Broca et Wernicke) et traverse les stades de développement cognitif.",
          notionsCles: [
            "3 fonctions cognitives majeures : mémoire (5 systèmes), fonctions instrumentales, fonctions exécutives (contrôle, inhibition).",
            "Stades du développement : sensori-moteur (0-2 ans), pré-opératoire (2-7 ans, fonction symbolique), opératoire (7-11 ans, réversibilité), formel (11-14 ans, hypothético-déductif).",
            "Aphasie de Broca (lésion frontale gauche, trouble de production, agrammatisme, bonne compréhension) vs Aphasie de Wernicke (lésion temporale, jargonaphasie, incompréhension, logorrhée).",
            "Les troubles 'dys' : dyslexie, dysphasie, dyspraxie, dyscalculie (40% de co-occurrence).",
          ],
          auteurs: ["Paul Broca", "Carl Wernicke", "Jean Piaget", "Noam Chomsky", "Stanislas Dehaene"],
        },
        {
          num: 2,
          titre: "Le langage comme objet d'étude philosophique et linguistique",
          description:
            "Étude des propriétés internes de la langue, de la nature du signe, de la grammaire et de la dimension performative des énoncés.",
          notionsCles: [
            "Les Stoïciens (IVe av. J.-C.) : Signe = image psychique (dicible / signification) + chose réelle dénotée. Sujet + prédicat.",
            "Débat Cratyle (Platon) : Thèse de la motivation naturelle (lien naturel nom/chose) vs Thèse d'Hermogène/Démocrite (arbitraire conventionnel de la loi).",
            "Grammaire de Port-Royal (1660) : représentation de la pensée indivisible, accord, universaux du langage.",
            "Linguistique historique du XIXe : lois phonétiques (campus -> champ), grammaire comparée indo-européenne.",
            "Ferdinand de Saussure (1916) : Signifiant (image acoustique) indissociable du Signifié (concept). Arbitraire du signe.",
            "Axe Syntagmatique (combinaison linéaire, succession, règles) vs Axe Paradigmatique (association d'idées, sélection sémantique).",
            "Actes de langage (John L. Austin 1962 & John Searle 1973) : énoncés constatifs vs performatifs. Les 3 actes simultanés : locutoire (sons), propositionnel (sens), illocutoire (l'action accomplie en parlant).",
            "5 catégories illocutoires de Searle : assertifs (mots au monde), directifs (faire faire), promissifs (engagement), expressifs (état psychologique), déclaratifs (le monde se conforme aux mots : ex. 'Je vous déclare mari et femme', 'La séance est ouverte').",
          ],
          auteurs: ["Ferdinand de Saussure", "John L. Austin", "John Searle", "Roman Jakobson", "Platon"],
        },
        {
          num: 3,
          titre: "Le langage comme paradigme des sciences humaines",
          description:
            "Le fonctionnement de la langue devient la grille de lecture de l'ensemble des pratiques sociales, des institutions et des comportements humains.",
          notionsCles: [
            "Psychanalyse (Freud & Lacan) : travail du rêve par condensation et déplacement, lapsus. Lacan : le sujet est barré par le langage ($), pris dans l'ordre symbolique tiers.",
            "Ethnologie (Claude Lévi-Strauss, 1948) : Les structures élémentaires de la parenté. La parenté fonctionne comme un langage d'échange de signes et de femmes ; la prohibition de l'inceste est la règle universelle qui fonde la culture.",
            "Philosophie politique (Jürgen Habermas, 1981) : Théorie de l'agir communicationnel. Monde vécu (Lebenswelt) + Monde commun d'arrière-plan. Les 4 prétentions à la validité : intelligibilité, vérité, justesse, sincérité. Éthique de la discussion.",
            "Théorie de la reconnaissance (Axel Honneth, 1996) : 3 sphères : affective (amour/confiance), juridique (droit/respect), sociale (travail/estime de soi).",
            "Sociologie critique (Pierre Bourdieu, 1982) : Ce que parler veut dire. Habitus linguistique, marché linguistique, rapports de force symboliques. Critique de l'illusion internaliste d'Austin : le pouvoir des mots ne réside pas dans la phrase mais dans l'autorité déléguée au porte-parole (Status est magistratus).",
          ],
          auteurs: ["Pierre Bourdieu", "Jürgen Habermas", "Axel Honneth", "Claude Lévi-Strauss", "Sigmund Freud", "Jacques Lacan"],
        },
      ],
    },
    documentsClefs: [
      {
        id: "lucy-insulte-empan",
        titre: "Les conditions sociales de l'efficacité performative de l'insulte",
        auteur: "Éric Lucy",
        annee: "2021",
        type: "Article de recherche (Revue Empan)",
        fichierLocal: "Les conditions sociales de l’efficacité performative de l’insulte Eric Lucy revue Empan.pdf",
        resumePedagogique:
          "Éric Lucy déconstruit l'insulte en milieu professionnel et institutionnel. L'insulte n'est pas un simple dérapage impulsif mais un acte de langage performatif à part entière. Elle tire son efficacité des stigmates sociaux déjà institués (Bourdieu) et oppose la 'grande gueule' populaire à la 'fine bouche' institutionnelle dans une quête désespérée de reconnaissance (Honneth).",
        concept18:
          "Violence verbale comme acte d'institution inversé (acte de destitution) et réactivation des rapports de domination sociale.",
      },
      {
        id: "lucy-samu-social",
        titre: "Discussion et reconnaissance en SAMU Social",
        auteur: "Éric Lucy",
        annee: "2020",
        type: "Enquête clinique de terrain",
        fichierLocal: "Discussion et reconnaissance en SAMU Social E Lucy.pdf",
        resumePedagogique:
          "Observation des maraudes auprès des grands exclus sans domicile. Lucy montre comment la réification (Honneth) transforme les personnes sans-abri en silhouettes invisibles, et comment l'agir communicationnel (s'asseoir à hauteur, saluer, nommer par le prénom) restaure la première sphère de reconnaissance et brise le mépris social.",
        concept18:
          "La parole clinique comme rempart contre la réification et réhabilitation du sujet dans l'espace public.",
      },
      {
        id: "hanley-lit-justice",
        titre: "Le lit de justice des rois de France",
        auteur: "Sarah Hanley & Pierre Bourdieu",
        annee: "1991",
        type: "Ouvrage historique et sociologique",
        fichierLocal: "lit de justice Hanley.pdf",
        resumePedagogique:
          "Analyse de la séance royale solennelle où le roi se rendait en personne au Parlement pour imposer l'enregistrement forcé d'édits refusés. La présence physique du monarque suspend instantanément la parole délibérative des magistrats. C'est l'archétype de l'acte d'institution où l'autorité du corps souverain éteint le débat.",
        concept18:
          "L'irruption de la hiérarchie dans l'espace délibératif moderne reproduit la mécanique du lit de justice.",
      },
      {
        id: "habermas-factualite-validite",
        titre: "Entre factualité et validité : L'entente comme médium de l'intégration sociale",
        auteur: "Jürgen Habermas",
        annee: "1992 / 1997",
        type: "Texte philosophique majeur (Droit et démocratie)",
        fichierLocal: "Habermas Entre factualité et validité l’entente comme médium de l’intégration sociale. Caractéristiques du droit.htm",
        resumePedagogique:
          "Habermas analyse la tension constitutive des démocraties entre la contrainte factuelle (le pouvoir, l'argent, les rapports de force) et la validité idéale des prétentions normatives. Le droit positif moderne joue le rôle de stabilisateur institutionnel pour préserver l'entente mutuelle contre les dérives de l'agir stratégique.",
        concept18:
          "Tension Factualité / Validité et rôle régulateur du droit dans les espaces organisationnels.",
      },
      {
        id: "honneth-esquisse-reconnaissance",
        titre: "La théorie de la reconnaissance : une esquisse",
        auteur: "Axel Honneth",
        annee: "2004",
        type: "Article théorique (Revue du MAUSS)",
        fichierLocal: "LA THÉORIE DE LA RECONNAISSANCE UNE ESQUISSE par Axel Honneth.msg",
        resumePedagogique:
          "Formalisation limpide des 3 sphères de la reconnaissance morale : 1. L'Amour (confiance en soi / intégrité physique) · 2. Le Droit (respect de soi / égalité citoyenne) · 3. La Solidarité et le Travail (estime de soi / utilité sociale). Les atteintes à ces sphères génèrent les 3 formes de mépris moteur des conflits sociaux.",
        concept18:
          "Les 3 sphères d'Axel Honneth et le déni de reconnaissance au travail comme blessure morale.",
      },
      {
        id: "bourdieu-echanges-linguistiques",
        titre: "L'économie des échanges linguistiques",
        auteur: "Pierre Bourdieu",
        annee: "1977 / 1982",
        type: "Ouvrage de sociologie (Ce que parler veut dire)",
        fichierLocal: "Bourdieu Léconomie des échanges linguistiques.pdf",
        resumePedagogique:
          "Bourdieu théorise le marché linguistique où chaque énonciation est évaluée selon le capital linguistique du locuteur. La parole n'est pas neutre : elle engage l'autorité déléguée, la censure préalable et la violence symbolique légitime.",
        concept18:
          "Marché linguistique, habitus de classe et autorité statutaire du porte-parole.",
      },
    ],
  },

  valls: {
    prof: "M. Francis VALLS",
    role: "Praticien et théoricien de l'insertion, cofondateur de la méthode IOD",
    moodleUrl: "https://naq.moodle.lecnam.net/course/view.php?id=8822&sectionid=68130",
    moodleSectionId: "68130",
    themeGeneral: "Clinique de l'insertion, Méthode IOD & négociation sur le travail réel en entreprise",
    slideMasterclass: {
      oeuvreArt: "L'Atelier du Médiateur IOD",
      annee: "2007",
      titre: "L'Inversion de l'Entonnoir : de l'employabilité normative à l'action sur le poste",
      axes: [
        {
          num: 1,
          titre: "Refus déontologique du tri préalable",
          description:
            "L'insertion classique culpabilise le chômeur en lui imposant une suite infinie de bilans et de stages pour le formater à une employabilité idéale. IOD refuse tout filtre sélectif : tout candidat est immédiatement présentable sur un poste négocié.",
          notionsCles: [
            "Critique radicale du ciblage déficitaire.",
            "Refus du tri préalable et de la mise en concurrence des candidats.",
            "Non-sélection : premier arrivé, premier proposé à l'entreprise.",
          ],
          auteurs: ["Francis Valls", "Denis Castra", "Robert Castel"],
        },
        {
          num: 2,
          titre: "Négociation directe avec l'entreprise sur l'offre d'emploi",
          description:
            "Le chargé de mission IOD intervient auprès des employeurs pour analyser les conditions concrètes du travail réel et élargir les critères d'embauche souvent disproportionnés (ex. exiger un Bac+2 pour du magasinage).",
          notionsCles: [
            "Action directe sur l'environnement et l'organisation du travail.",
            "Démarchage proactif d'entreprises non recensées.",
            "Médiation durable pendant les premiers mois du contrat (CDI ou CDD > 6 mois).",
          ],
          auteurs: ["Francis Valls", "Denis Castra"],
        },
      ],
    },
    documentsClefs: [
      {
        id: "valls-castra-livre-iod",
        titre: "L'insertion professionnelle des publics en grande difficulté : La méthode IOD",
        auteur: "Denis Castra & Francis Valls (Préface de Robert Castel)",
        annee: "2007",
        type: "Ouvrage de référence méthodologique",
        fichierLocal: "Méthode IOD Valls et Castra (Presses Universitaires)",
        resumePedagogique:
          "Théorie et pratique de l'Intervention sur les Offres et les Demandes. Castel y souligne la rupture avec la 'désaffiliation' sociale : l'intégration durable ne se décrète pas en rééduquant le salarié, mais en adaptant l'entreprise pour lui redonner une place salariale de droit commun.",
        concept18:
          "L'entonnoir inversé de la Méthode IOD et la rupture avec le paradigme déficitaire de l'employabilité.",
      },
    ],
  },

  marot: {
    prof: "Mme Véronique MAROT",
    role: "Enseignante-chercheuse, spécialiste du langage et du développement",
    moodleUrl: "https://naq.moodle.lecnam.net/course/view.php?id=8822&sectionid=68135",
    moodleSectionId: "68135",
    themeGeneral: "Sciences du langage, développement de la pensée, sémiotique & Réseau Langage et Travail",
    slideMasterclass: {
      oeuvreArt: "L'Origine du Symbole & la Clinique du Dialogue",
      annee: "1934-1986",
      titre: "Le Langage comme Instrument Psychologique et Activité Située",
      axes: [
        {
          num: 1,
          titre: "Lev Vygotski vs Jean Piaget : Genèse de la pensée et du langage",
          description:
            "Pour Piaget, la pensée égocentrique précède le langage socialisé. Pour Vygotski, c'est l'inverse absolu : le langage est d'emblée social, et son intériorisation engendre le langage intérieur et la pensée conceptuelle.",
          notionsCles: [
            "Instrument psychologique sémiotique (Vygotski).",
            "Zone proximale de développement (ZPD).",
            "De l'interpsychologique vers l'intrapsychologique.",
            "Langage égocentrique comme étape de transition vers le langage intérieur.",
          ],
          auteurs: ["Lev Vygotski", "Jean Piaget", "Yves Clot"],
        },
        {
          num: 2,
          titre: "Bernard Golse & la sémiotique pré-verbale",
          description:
            "Observation des racines du langage chez le nourrisson : avant le verbe, l'accès au symbole émerge dans les interactions corporelles, la rythmique des soins et le jeu de la présence/absence.",
          notionsCles: [
            "Émergence de la fonction symbolique (le jeu de la bobine / Fort-Da de Freud).",
            "Observation d'Ernst (18 mois).",
            "Appareil à penser les pensées (Wilfred Bion).",
          ],
          auteurs: ["Bernard Golse", "Wilfred Bion", "Sigmund Freud"],
        },
        {
          num: 3,
          titre: "Josiane Boutet & Béatrice Fraenkel : Réseau Langage et Travail (1986)",
          description:
            "Dans les organisations contemporaines, le travail est devenu intrinsèquement communicationnel. Parler et écrire, c'est travailler.",
          notionsCles: [
            "Le travail devenu communicationnel (depuis les années 1950).",
            "Dimension multimodale (voix, gestes, posture, écrits) et située de la langue.",
            "Les 5 niveaux de la langue : phonétique, morphologie, syntaxe, sémantique, pragmatique.",
          ],
          auteurs: ["Josiane Boutet", "Béatrice Fraenkel", "Jacques Girin", "Bernard Gardin"],
        },
      ],
    },
    documentsClefs: [
      {
        id: "boutet-fraenkel-langage-travail",
        titre: "Le travail devenu communicationnel & les écrits professionnels",
        auteur: "Josiane Boutet & Béatrice Fraenkel",
        annee: "1986 / 2001",
        type: "Ouvrage de sociolinguistique (Réseau CNRS)",
        fichierLocal: "Langage et Travail (CNRS Éditions)",
        resumePedagogique:
          "Démontre que le langage dans l'atelier ou le bureau tertiaire n'est jamais un simple code informatif : il est l'outil, le produit et l'enjeu des rapports sociaux dans le travail réel.",
        concept18:
          "Dimension située et multimodale du langage au travail.",
      },
    ],
  },
};

/**
 * Ponts Conceptuels Transversaux du 1er Semestre (PST106 - PST108 - PST123)
 * Titre RNCP Psychologue du Travail - CNAM
 *
 * Analyse comparative épistémologique et clinique pour réussir les épreuves
 * et articuler les grilles de lecture sans contresens.
 */

export interface ConceptTransversalS1 {
  id: string;
  nom: string;
  questionCentrale: string;
  pst106: {
    focus: string;
    auteursCles: string[];
    concepts: string[];
    formuleChoc: string;
    methode: string;
    piegeEviter: string;
  };
  pst108: {
    focus: string;
    auteursCles: string[];
    concepts: string[];
    formuleChoc: string;
    methode: string;
    piegeEviter: string;
  };
  pst123: {
    focus: string;
    auteursCles: string[];
    concepts: string[];
    formuleChoc: string;
    methode: string;
    piegeEviter: string;
  };
  syntheseArticuler: string;
  phraseMagiqueExamen: string;
}

export interface QuizQuestionTransversale {
  id: string;
  enonce: string;
  contexte: string;
  options: {
    id: "pst106" | "pst108" | "pst123" | "transversal";
    texte: string;
    isCorrect: boolean;
    explication: string;
  }[];
  conseilExamen: string;
}

export const CONCEPTS_TRANSVERSAUX_S1: ConceptTransversalS1[] = [
  {
    id: "reconnaissance",
    nom: "La Reconnaissance au Travail",
    questionCentrale: "Comment la reconnaissance opère-t-elle et que produit son déni ?",
    pst106: {
      focus: "Reconnaissance de l'effort d'arbitrage et du travail réel bien fait",
      auteursCles: ["Yves Clot", "Alain Wisner"],
      concepts: ["Pouvoir d'agir", "Activité empêchée", "Qualité du travail", "Genre professionnel"],
      formuleChoc: "« La reconnaissance passe par le fait que l'organisation reconnaisse les arbitrages réels faits pour sortir le produit malgré les aléas. »",
      methode: "Délibération collective sur la qualité empêchée (controverse de métier).",
      piegeEviter: "Réduire la reconnaissance à un compliment managérial ou une prime financière.",
    },
    pst108: {
      focus: "Lutte intersubjective contre le mépris et préservation de l'intégrité psychique",
      auteursCles: ["Axel Honneth", "Christophe Dejours", "Vincent de Gaulejac"],
      concepts: ["Mépris social", "Jugement d'utilité", "Jugement de beauté (pairs)", "Souffrance éthique"],
      formuleChoc: "« Le déni de reconnaissance détruit l'estime de soi et attaque le lien intersubjectif fondamental de la santé mentale. »",
      methode: "Espaces d'écoute clinique et élaboration des souffrances partagées.",
      piegeEviter: "Oublier la double valence de Dejours : reconnaissance par la hiérarchie (utilité) ET par les pairs (beauté/conformité aux règles de l'art).",
    },
    pst123: {
      focus: "Validation institutionnelle et statutaire de l'identité sociale",
      auteursCles: ["Claude Dubar", "Axel Honneth (3 sphères)", "Renaud Sainsaulieu"],
      concepts: ["Actes d'attribution", "Actes d'appartenance", "Sphère du droit et de l'estime", "Modèle de négociation"],
      formuleChoc: "« L'identité est une transaction permanente : ce que je revendique d'être (pour soi) doit être reconnu par l'institution (pour autrui). »",
      methode: "Analyse sociologique des trajectoires biographiques et de l'accès aux statuts.",
      piegeEviter: "Croire que l'identité est figée dès la socialisation primaire sans renégociation au travail.",
    },
    syntheseArticuler:
      "En PST106, la reconnaissance porte sur le RÉEL de l'activité (le métier) ; en PST108, sur la PERSONNE et sa contribution dans l'intersubjectivité (la santé mentale) ; en PST123, sur le STATUT et la place légitime dans l'espace social (l'identité).",
    phraseMagiqueExamen:
      "« Si la clinique de l'activité (PST106) traque le déficit de reconnaissance dans l'empêchement de faire du beau travail, la psychologie sociale clinique (PST108) en mesure l'impact destructeur sur l'estime de soi (Honneth), tandis que la sociologie identitaire (PST123) l'analyse comme une rupture de la transaction relationnelle (Dubar). »",
  },
  {
    id: "reel-prescrit",
    nom: "Le Travail Prescrit vs Le Travail Réel",
    questionCentrale: "Quel est le statut de l'écart irréductible entre la consigne et l'activité ?",
    pst106: {
      focus: "L'écart prescrit/réel est normal, nécessaire et source d'ingéniosité",
      auteursCles: ["Jacques Leplat", "Jean-Marie Hoc", "Alain Wisner"],
      concepts: ["Tâche prescrite", "Activité réelle", "Régulation opératoire", "Variabilité interne/externe"],
      formuleChoc: "« Si les opérateurs appliquaient scrupuleusement la consigne, l'usine s'arrêterait (grève du zèle). »",
      methode: "Analyse ergonomique du travail : observation systématique, verbalisations simultanées.",
      piegeEviter: "Traiter l'écart comme une 'faute' ou une 'déviance' à sanctionner.",
    },
    pst108: {
      focus: "L'écart prescrit/réel comme épreuve psychique et source de défenses collectives",
      auteursCles: ["Eugène Enriquez", "Vincent de Gaulejac", "Christophe Dejours"],
      concepts: ["Idéologie gestionnaire", "Injonction paradoxale", "Défenses collectives", "Cynisme"],
      formuleChoc: "« L'injonction gestionnaire à l'excellence prescrit l'impossible, contraignant le salarié à tricher tout en culpabilisant. »",
      methode: "Intervention psychosociologique sur les angoisses partagées.",
      piegeEviter: "Réduire les défenses collectives à de la résistance 'irrationnelle' au changement.",
    },
    pst123: {
      focus: "L'écart entre le rôle assigné et l'engagement de soi comme matrice identitaire",
      auteursCles: ["Erving Goffman", "Renaud Sainsaulieu", "Claude Dubar"],
      concepts: ["Distance au rôle", "Culture d'atelier", "Modèle fusionnel vs retrait", "Formes identitaires"],
      formuleChoc: "« Le prescrit définit un rôle social institutionnel ; c'est dans la distance au rôle que s'éprouve l'authenticité de l'acteur. »",
      methode: "Enquête de terrain sociologique et récits de socialisation professionnelle.",
      piegeEviter: "Penser que l'acteur adhère spontanément et sans négociation au rôle prescrit.",
    },
    syntheseArticuler:
      "Pour l'ergonomie (PST106), l'écart est une régulation cognitive vitale ; pour la psychologie sociale clinique (PST108), c'est une source de conflit éthique et d'angoisse ; pour la sociologie (PST123), c'est l'espace où se forge la culture collective et l'identité au travail.",
    phraseMagiqueExamen:
      "« L'écart entre prescrit et réel, loin d'être un dysfonctionnement, constitue la condition même de la production en ergonomie (PST106), le creuset des mécanismes de défense en clinique du travail (PST108), et le territoire de négociation des identités professionnelles (PST123). »",
  },
  {
    id: "collectif-travail",
    nom: "Le Collectif de Travail & Le Groupe",
    questionCentrale: "Quelle est la nature du lien qui unit les professionnels entre eux ?",
    pst106: {
      focus: "Le 'Genre Professionnel' : mémoire impersonnelle et ressource pour agir",
      auteursCles: ["Yves Clot", "Dominique Lhuilier"],
      concepts: ["Genre professionnel", "Style", "Controverse de métier", "Collectif vivant vs mortifère"],
      formuleChoc: "« Le genre est le travail d'organisation du travail fait par les travailleurs eux-mêmes, sédimenté dans l'histoire du métier. »",
      methode: "Instruction au sosie (Oddone) et autoconfrontation croisée pour revitaliser le genre.",
      piegeEviter: "Confondre le collectif réel de métier avec l'équipe formelle de l'organigramme.",
    },
    pst108: {
      focus: "L'Appareil Psychique Groupal et les défenses partagées contre l'angoisse",
      auteursCles: ["René Kaës", "Didier Anzieu", "Wilfred Bion"],
      concepts: ["Appareil psychique groupal", "Pacte dénégatif", "Illusion groupale", "Boucs émissaires"],
      formuleChoc: "« Le groupe n'est pas une simple addition d'individus : il fabrique un psychisme partagé avec ses fantasmes et ses alliances inconscientes. »",
      methode: "Groupes d'analyse des pratiques, écoute clinique des résonances affectives.",
      piegeEviter: "Croire qu'un conflit interpersonnel s'explique uniquement par le caractère des personnes.",
    },
    pst123: {
      focus: "Les Cultures d'Atelier et les Modèles de Pouvoir au Travail",
      auteursCles: ["Renaud Sainsaulieu", "Claude Dubar"],
      concepts: ["Modèle fusionnel", "Modèle de négociation", "Modèle affinitaire", "Modèle de retrait"],
      formuleChoc: "« On apprend à être ensemble à travers la structure du pouvoir dans l'entreprise : l'usine est un lieu de socialisation politique. »",
      methode: "Analyse des réseaux d'influence, du rapport à l'autorité et des représentations syndicales.",
      piegeEviter: "Généraliser le modèle fusionnel ouvrier à l'ensemble des univers professionnels tertiaires.",
    },
    syntheseArticuler:
      "En PST106, le collectif est un instrument opératoire (le genre qui porte le style) ; en PST108, il est une matrice psychologique (contenant d'angoisse et pacte dénégatif) ; en PST123, il est une micro-société politique (modèle relationnel de pouvoir).",
    phraseMagiqueExamen:
      "« Le collectif de travail doit être pensé comme un instrument technique de médiation du geste en clinique de l'activité (PST106), comme un appareil psychique protecteur mais potentiellement aliénant en psychosociologie (PST108), et comme une matrice d'apprentissage des rapports de pouvoir selon Sainsaulieu (PST123). »",
  },
  {
    id: "pouvoir-agir",
    nom: "Le Pouvoir d'Agir, l'Aliénation & la Domination",
    questionCentrale: "D'où vient le sentiment d'impuissance et comment restaurer la capacité d'action ?",
    pst106: {
      focus: "L'activité empêchée / contrariée et la perte du pouvoir d'agir",
      auteursCles: ["Yves Clot", "Lidia Prot"],
      concepts: ["Pouvoir d'agir", "Activité contrariée", "Activité suspendue", "Délibération sur le travail bien fait"],
      formuleChoc: "« Quand le salarié ne peut plus se reconnaître dans ce qu'il fait, son énergie se retourne contre lui-même en souffrance. »",
      methode: "Création d'arènes de controverse technique pour rendre le travail à nouveau délibérable.",
      piegeEviter: "Réduire le pouvoir d'agir à du 'développement personnel' ou de l'assertivité.",
    },
    pst108: {
      focus: "L'emprise managériale, l'idéal du Moi tyrannique et la névrose de classe",
      auteursCles: ["Vincent de Gaulejac", "Eugène Enriquez", "Max Pagès"],
      concepts: ["L'individu managérial", "Honte sociale", "Névrose de classe", "Aliénation consentie"],
      formuleChoc: "« L'entreprise gestionnaire ne contraint plus par la force physique mais par la séduction narcissique et la culpabilité. »",
      methode: "Roman familial et trajectoire sociale : dénouer les loyautés invisibles.",
      piegeEviter: "Croire que les salariés sont de simples victimes passives : analyser leur adhésion narcissique au système.",
    },
    pst123: {
      focus: "La violence symbolique, l'incorporation de l'habitus et les trajectoires de reclassement",
      auteursCles: ["Pierre Bourdieu", "Claude Dubar"],
      concepts: ["Violence symbolique", "Habitus", "Champ social", "Capital culturel", "Identité de blocage"],
      formuleChoc: "« Les dominés contribuent à leur propre domination en appliquant au monde social les schémas de pensée issus de cette domination même. »",
      methode: "Sociologie critique des institutions scolaires et des marchés du travail.",
      piegeEviter: "Confondre consentement éclairé et intériorisation de l'ordre établi (doxa).",
    },
    syntheseArticuler:
      "L'impuissance est technique et gestuelle en 106 (travail empêché), narcissique et organisationnelle en 108 (emprise gestionnaire), et structurelle/symbolique en 123 (reproduction des classes et habitus).",
    phraseMagiqueExamen:
      "« Restaurer le pouvoir d'agir exige d'agir à la fois sur l'organisation concrète du geste technique (PST106), sur la levée de l'emprise narcissique managériale (PST108) et sur la déconstruction de la violence symbolique incorporée dans l'habitus (PST123). »",
  },
  {
    id: "methode-intervention",
    nom: "La Méthode d'Intervention du Psychologue",
    questionCentrale: "Quel dispositif clinique mettre en place pour intervenir légitimement ?",
    pst106: {
      focus: "Co-analyse de l'activité avec les opérateurs à partir de traces objectives",
      auteursCles: ["Ivar Oddone", "Yves Clot"],
      concepts: ["Instruction au sosie", "Autoconfrontation simple/croisée", "Observations ergonomiques"],
      formuleChoc: "« Le psychologue ne sait pas à la place des travailleurs : il crée le dispositif qui leur permet de redécouvrir leur propre savoir. »",
      methode: "Protocole rigoureux vidéo-filmé et débriefing paritaire.",
      piegeEviter: "Donner des 'conseils ergonomiques' clé en main sans faire débattre les pairs.",
    },
    pst108: {
      focus: "L'écoute clinique, le tiers garant et la mise au travail des angoisses",
      auteursCles: ["Véronique Marot", "Éric Lucy", "Francis Valls"],
      concepts: ["Cadre déontologique", "Neutralité bienveillante", "Transfert / Contre-transfert", "Groupe d'analyse"],
      formuleChoc: "« Le psychologue garantit le cadre et la confidentialité absolue pour que la parole vraie puisse émerger sans crainte de représailles. »",
      methode: "Entretiens non-directifs approfondis, groupes de parole clinique.",
      piegeEviter: "Se laisser instrumentaliser par la direction comme 'calmant social' ou faire du coaching RH.",
    },
    pst123: {
      focus: "L'enquête sociologique compréhensive et l'analyse des trajectoires",
      auteursCles: ["Élisabeth Lucy", "Claude Dubar", "Richard Wittorski"],
      concepts: ["Récit de vie", "Entretien biographique", "Professionnalisation", "Analyse documentaire"],
      formuleChoc: "« Reconstituer les bifurcations biographiques pour comprendre comment se négocie l'entrée ou la sortie d'un métier. »",
      methode: "Entretiens compréhensifs, analyse des conventions collectives et des diplômes.",
      piegeEviter: "Ignorer les déterminants macrosociaux (marché du travail, précarisation, réformes de diplômes).",
    },
    syntheseArticuler:
      "Le psychologue est un metteur en scène du dialogue de métier (106), un garant du cadre d'élaboration des affects et de l'écoute clinique (108), et un sociologue clinicien de la trajectoire professionnelle (123).",
    phraseMagiqueExamen:
      "« L'intervention du psychologue du travail se décline selon trois postures complémentaires : médiateur de la controverse technique par l'autoconfrontation (PST106), garant d'un espace d'écoute clinique neutre et confidentiel (PST108), et analyste des trajectoires biographiques et identitaires (PST123). »",
  },
];

export const QUIZ_TRANSVERSAL_S1: QuizQuestionTransversale[] = [
  {
    id: "q1",
    enonce:
      "Dans un atelier, un ouvrier qualifié déclare : « On nous demande de produire 200 pièces par heure avec une tolérance au micron, mais les matières premières qu'on reçoit varient tout le temps. Alors on bricole nos propres réglages sans rien dire aux chefs. »",
    contexte: "Identifier l'analyse canonique et le concept premier mobilisé.",
    options: [
      {
        id: "pst106",
        texte:
          "C'est la démonstration de l'activité réelle régulatrice comblant la variabilité de la matière première face à une tâche prescrite irréaliste (Leplat / Wisner).",
        isCorrect: true,
        explication:
          "Parfait ! Il s'agit typiquement de l'écart tâche prescrite / activité réelle et de la variabilité externe (matières premières) gérée par la régulation cognitive de l'opérateur.",
      },
      {
        id: "pst108",
        texte:
          "C'est un symptôme de névrose de classe et de honte sociale face à l'autorité (Gaulejac).",
        isCorrect: false,
        explication:
          "Contresens d'analyse : l'opérateur ne manifeste pas de honte sociale mais une ingéniosité opératoire d'adaptation technique.",
      },
      {
        id: "pst123",
        texte:
          "C'est une identité de retrait résultant d'une exclusion statutaire définitive (Dubar).",
        isCorrect: false,
        explication:
          "Faux : l'ouvrier ne se retire pas, il s'investit techniquement au contraire au point de 'bricoler des réglages' pour que la production sorte.",
      },
    ],
    conseilExamen:
      "Dès qu'une citation évoque des variations physiques de matériel, du bricolage opératoire ou des compromis cadences/qualité, votre premier réflexe doit être PST106 (Leplat, Hoc, Wisner).",
  },
  {
    id: "q2",
    enonce:
      "Une infirmière de bloc opératoire confie en entretien : « Depuis la tarification à l'activité, je dois cocher des actes administratifs plutôt que de rassurer le patient avant l'anesthésie. J'ai l'impression de trahir ce pour quoi j'ai choisi ce métier. Je me méprise moi-même. »",
    contexte: "Quel cadre théorique modélise prioritairement ce sentiment de trahison éthique ?",
    options: [
      {
        id: "pst106",
        texte:
          "Un simple problème de TMS lié à l'utilisation répétée de la souris de l'ordinateur.",
        isCorrect: false,
        explication:
          "Absurde : la souffrance exprimée est morale et déontologique, pas un problème biomécanique gestuel isolé.",
      },
      {
        id: "pst108",
        texte:
          "La souffrance éthique et l'atteinte à l'intégrité du sujet par le déni de reconnaissance des valeurs soignantes (Honneth / Dejours / Gaulejac).",
        isCorrect: true,
        explication:
          "Exact ! La 'souffrance éthique' naît précisément quand l'organisation oblige le travailleur à commettre des actes réprouvés par sa conscience professionnelle.",
      },
      {
        id: "pst123",
        texte:
          "Une trajectoire ascendante de conversion sans aucune crise biographique.",
        isCorrect: false,
        explication:
          "Incorrect : l'infirmière exprime une souffrance aiguë et une crise de sens, pas une conversion réussie.",
      },
    ],
    conseilExamen:
      "Le terme 'trahir mes valeurs', 'culpabilité' ou 'mépris de soi' renvoie immédiatement à la souffrance éthique (PST108) et au mépris social d'Axel Honneth.",
  },
  {
    id: "q3",
    enonce:
      "Un cadre moyen promu chef d'équipe se plaint : « Pour la direction, je suis un manager responsable des chiffres ; mais pour mes anciens collègues ouvriers, je suis devenu un traître. Je ne sais plus qui je suis quand je rentre chez moi. »",
    contexte: "Quelle modélisation identitaire permet d'éclairer cette tension de rôles ?",
    options: [
      {
        id: "pst123",
        texte:
          "La contradiction de la double transaction identitaire de Dubar : non-coïncidence entre identité pour soi (ex-pair ouvrier) et identité pour autrui (étiquette managériale contestée).",
        isCorrect: true,
        explication:
          "Excellent ! C'est le cas d'école de Claude Dubar : le conflit d'actes d'attribution (la direction attribue le rôle de chef, les pairs l'excluent) heurtant le processus biographique.",
      },
      {
        id: "pst106",
        texte:
          "Une panne du système d'information nécessitant une formation logicielle.",
        isCorrect: false,
        explication:
          "Hors sujet total : il s'agit d'un problème de statut, de légitimité sociale et d'identité.",
      },
      {
        id: "pst108",
        texte:
          "Une tentative de suicide liée exclusivement à des pulsions thanatiques individuelles.",
        isCorrect: false,
        explication:
          "Psychologisation sauvage et réductionniste : la difficulté est ancrée dans la transition de statut et le regard des collectifs.",
      },
    ],
    conseilExamen:
      "Le conflit entre 'ce que les chefs disent que je suis' et 'ce que mes pairs me renvoient' est la signature même de la double transaction de Dubar (PST123).",
  },
  {
    id: "q4",
    enonce:
      "Quelle méthode d'intervention consiste à demander à un travailleur expérimenté : « Imagine que je suis ton sosie et que demain je doive te remplacer sans que personne ne s'aperçoive de la substitution. Que dois-je savoir et faire ? »",
    contexte: "Identifier l'origine épistémologique et l'auteur de ce protocole.",
    options: [
      {
        id: "pst106",
        texte:
          "L'Instruction au Sosie, créée par Ivar Oddone à Turin et reprise en clinique de l'activité par Yves Clot.",
        isCorrect: true,
        explication:
          "Bravo ! Oddone (1981) dans les usines Fiat a inventé ce dispositif d'explicitation du genre professionnel et de l'expérience incorporée.",
      },
      {
        id: "pst108",
        texte:
          "Le psychodrame morénien d'analyse des fantasmes inconscients d'agression.",
        isCorrect: false,
        explication:
          "Faux : l'instruction au sosie est un protocole d'analyse du travail réel et non une séance de psychodrame psychanalytique.",
      },
      {
        id: "pst123",
        texte:
          "L'entretien d'embauche par compétences selon le modèle du MEDEF.",
        isCorrect: false,
        explication:
          "Faux : ce n'est pas un outil de recrutement RH, c'est une méthode d'explicitation de l'activité.",
      },
    ],
    conseilExamen:
      "L'Instruction au Sosie est systématiquement associée à Ivar Oddone et Yves Clot (PST106). Mentionnez toujours l'expérience historique des ouvriers de Fiat à Turin.",
  },
  {
    id: "q5",
    enonce:
      "Selon Renaud Sainsaulieu (PST123), dans quel modèle culturel les salariés développent-ils une solidarité de camaraderie égalitaire fusionnelle face au chef, refusant toute différenciation interne ?",
    contexte: "Typologie des cultures d'entreprise et relations de pouvoir.",
    options: [
      {
        id: "pst123",
        texte:
          "Le modèle Fusionnel (typique des ouvriers spécialisés sans accès au pouvoir technique mais à forte dépendance relationnelle).",
        isCorrect: true,
        explication:
          "Tout à fait ! Le modèle fusionnel est la réponse collective protectrice des travailleurs dont le poste ne confère aucun pouvoir autonome sur l'organisation.",
      },
      {
        id: "pst123",
        texte:
          "Le modèle de Négociation des cadres supérieurs et experts autonomes.",
        isCorrect: false,
        explication:
          "Le modèle de négociation valorise au contraire le débat d'idées, la rivalité intellectuelle et la reconnaissance de compétences différenciées.",
      },
      {
        id: "pst123",
        texte:
          "Le modèle de Retrait des employés désengagés de la sphère du travail.",
        isCorrect: false,
        explication:
          "Le retrait se caractérise par l'absence d'investissement relationnel avec les pairs et la recherche de sens hors de l'entreprise.",
      },
    ],
    conseilExamen:
      "Sainsaulieu (1977, L'identité au travail) : 4 modèles à savoir réciter les yeux fermés : Fusionnel, Négociateur, Affinitaire, Retrait.",
  },
];

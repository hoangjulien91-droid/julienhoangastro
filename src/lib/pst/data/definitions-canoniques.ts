/**
 * Coffre-fort des Définitions Canoniques d'Examen (Titre RNCP Psychologue du Travail Cnam)
 * Définitions officielles au mot près, indispensables pour décrocher le point complet à l'examen.
 */

export interface DefinitionCanonique {
  id: string;
  terme: string;
  auteur: string;
  modules: string[];
  definitionOfficielle: string;
  motsClesObligatoires: string[];
  exemplePratique: string;
  piegeConfondreAvec?: string;
}

export const DEFINITIONS_CANONIQUES: DefinitionCanonique[] = [
  // --- BOURDIEU ---
  {
    id: "def-habitus",
    terme: "L'Habitus",
    auteur: "Pierre Bourdieu (1980)",
    modules: ["pst108", "pst123"],
    definitionOfficielle:
      "Système de dispositions durables et transposables, structures structurées prédisposées à fonctionner comme structures structurantes, c'est-à-dire en tant que principes générateurs et organisateurs de pratiques et de représentations. C'est le social incorporé, l'histoire faite corps.",
    motsClesObligatoires: [
      "dispositions durables et transposables",
      "structures structurées",
      "structures structurantes",
      "social incorporé",
    ],
    exemplePratique:
      "Le sentiment spontané d'illégitimité ou d'aisance d'un salarié selon son milieu social d'origine lors d'un entretien d'évaluation.",
    piegeConfondreAvec:
      "Ne pas confondre avec une 'habitude' mécanique : l'habitus est inventif et s'adapte aux situations nouvelles.",
  },
  {
    id: "def-marche-linguistique",
    terme: "Le Marché Linguistique",
    auteur: "Pierre Bourdieu (1982)",
    modules: ["pst108"],
    definitionOfficielle:
      "Système de rapports de forces symboliques au sein duquel les productions verbales s'échangent et sont évaluées à des prix inégaux selon la conformité des locuteurs à la langue dominante et légitime, conférant ainsi un profit de distinction symbolique aux dominants.",
    motsClesObligatoires: [
      "rapports de forces symboliques",
      "langue dominante et légitime",
      "profit de distinction",
      "capital linguistique",
    ],
    exemplePratique:
      "La valorisation spontanée du jargon managérial anglo-saxon en réunion de direction au détriment du vocabulaire technique d'atelier.",
    piegeConfondreAvec:
      "Ne pas confondre avec un simple échange d'informations télégraphique (Shannon & Weaver).",
  },
  {
    id: "def-status-est-magistratus",
    terme: "Status est magistratus",
    auteur: "Pierre Bourdieu (1982)",
    modules: ["pst108"],
    definitionOfficielle:
      "Maxime juridique fondant la critique de l'illusion internaliste d'Austin : le pouvoir d'un discours n'appartient pas aux mots eux-mêmes, mais découle de l'autorité statutaire et institutionnelle déléguée à celui qui les prononce en tant que porte-parole autorisé.",
    motsClesObligatoires: [
      "illusion internaliste",
      "autorité statutaire",
      "délégation institutionnelle",
      "porte-parole autorisé",
    ],
    exemplePratique:
      "L'injonction « je déclare l'embauche » qui ne crée de droits que parce qu'elle émane d'une personne ayant reçu délégation de signature.",
  },
  {
    id: "def-violence-symbolique",
    terme: "La Violence Symbolique",
    auteur: "Pierre Bourdieu (1970, 1996)",
    modules: ["pst108", "pst123"],
    definitionOfficielle:
      "Forme de domination douce, insensible et invisible à ses victimes mêmes, qui s'exerce par les voies de la communication et de la connaissance, lorsque les dominés appliquent aux rapports de domination des schèmes de perception et de pensée issus de l'intériorisation de l'ordre établi.",
    motsClesObligatoires: [
      "domination douce et invisible",
      "consentement inconscient",
      "schèmes intériorisés",
      "adhésion aux critères des dominants",
    ],
    exemplePratique:
      "Un employé qui s'auto-censure pour une promotion en se disant « ce n'est pas pour moi », validant lui-même sa propre disqualification.",
  },
  {
    id: "def-double-verite",
    terme: "La Double Vérité du Travail",
    auteur: "Pierre Bourdieu (1996)",
    modules: ["pst108", "pst123"],
    definitionOfficielle:
      "Dualité constitutive de l'activité salariale : la vérité objective de l'exploitation économique (appropriation de la force de travail) est masquée et rendue supportable par la vérité subjective de l'investissement passionné, du sens de l'honneur et de la fierté du geste professionnel (l'illusio).",
    motsClesObligatoires: [
      "vérité objective d'exploitation",
      "vérité subjective",
      "illusio",
      "honneur du métier",
    ],
    exemplePratique:
      "L'infirmière ou l'artisan qui fait des heures supplémentaires non payées par amour du travail bien fait, alimentant la rentabilité patronale.",
  },

  // --- HABERMAS ---
  {
    id: "def-agir-communicationnel",
    terme: "L'Agir Communicationnel",
    auteur: "Jürgen Habermas (1981)",
    modules: ["pst108"],
    definitionOfficielle:
      "Mode de coordination de l'action sociale orienté vers l'entente intersubjective et l'intercompréhension (Verständigung), où les participants s'accordent sur la validité de leurs prétentions par l'usage argumentatif de la raison et le refus de toute contrainte extérieure.",
    motsClesObligatoires: [
      "entente / Verständigung",
      "intercompréhension",
      "prétentions à la validité",
      "argumentation rationnelle",
    ],
    exemplePratique:
      "Une délibération d'équipe soignante où le médecin et l'aide-soignante s'accordent sur la meilleure prise en charge d'un patient.",
    piegeConfondreAvec:
      "Ne pas confondre avec l'agir stratégique : l'agir stratégique vise le succès et utilise les autres comme moyens.",
  },
  {
    id: "def-pretentions-validite",
    terme: "Les 4 Prétentions universelles à la validité",
    auteur: "Jürgen Habermas (1981)",
    modules: ["pst108"],
    definitionOfficielle:
      "Les quatre engagements implicites et simultanés de tout acte de parole orienté vers l'entente : 1) Intelligibilité de l'énoncé (grammaire/sens) ; 2) Vérité de la proposition (faits objectifs) ; 3) Justesse normative (légitimité sociale) ; 4) Sincérité du locuteur (authenticité subjective).",
    motsClesObligatoires: [
      "intelligibilité",
      "vérité propositionnelle",
      "justesse normative",
      "sincérité / véracité",
    ],
    exemplePratique:
      "Contester un ordre managérial sur sa justesse normative (« ce n'est pas conforme au code du travail ») ou sa vérité (« les chiffres sont faux »).",
  },
  {
    id: "def-ethique-discussion",
    terme: "L'Éthique de la Discussion (Diskursethik)",
    auteur: "Jürgen Habermas (1983)",
    modules: ["pst108"],
    definitionOfficielle:
      "Théorie morale et procédurale énonçant le Principe D : seules sont valides les normes d'action susceptibles de recevoir l'assentiment de tous les partenaires concernés en tant que participants à une discussion pratique libre et argumentée (situation idéale de parole).",
    motsClesObligatoires: [
      "Principe D",
      "tous les concernés",
      "discussion pratique",
      "situation idéale de parole",
      "force du meilleur argument",
    ],
    exemplePratique:
      "La co-construction d'une charte de télétravail validée à l'unanimité après controverse ouverte entre salariés et direction.",
  },

  // --- HONNETH ---
  {
    id: "def-trois-spheres-honneth",
    terme: "Les 3 Sphères de la Reconnaissance",
    auteur: "Axel Honneth (1992)",
    modules: ["pst108", "pst123"],
    definitionOfficielle:
      "Matrice morale articulant les trois dimensions de l'inter-reconnaissance nécessaires à un rapport positif à soi : 1) Sphère affective/amour ➔ Confiance en soi (corps/besoins) ; 2) Sphère juridique/droit ➔ Respect de soi (citoyenneté/droits universels) ; 3) Sphère sociale/travail ➔ Estime de soi (utilité de l'activité).",
    motsClesObligatoires: [
      "sphère intime (confiance)",
      "sphère juridique (respect)",
      "sphère sociale (estime de soi)",
      "mépris social",
    ],
    exemplePratique:
      "Un ouvrier protégé par son contrat de travail (droit) mais humilié par l'invisibilité de son métier (perte d'estime de soi).",
  },
  {
    id: "def-reification",
    terme: "La Réification",
    auteur: "Axel Honneth (2007)",
    modules: ["pst108", "pst123"],
    definitionOfficielle:
      "Définie comme un « oubli de la reconnaissance » originaire : attitude pathologique et réductrice consistant à traiter un alter ego humain comme une simple chose, une ressource instrumentale ou une variable chiffrée, en suspendant l'engagement empathique préalable.",
    motsClesObligatoires: [
      "oubli de la reconnaissance",
      "antériorité de la reconnaissance sur la cognition",
      "chose / ressource chiffrée",
    ],
    exemplePratique:
      "Parler du personnel hospitalier uniquement en termes d'« équivalents temps plein » (ETP) et de cadences de lits.",
  },

  // --- VALLS & IOD ---
  {
    id: "def-methode-iod",
    terme: "La Méthode IOD",
    auteur: "Francis Valls & Denis Castra (2007)",
    modules: ["pst108"],
    definitionOfficielle:
      "Intervention sur les Offres et les Demandes : méthodologie psychosociologique d'insertion professionnelle en rupture avec l'employabilité normative, refusant tout tri préalable des publics et agissant directement auprès des entreprises pour négocier des postes de travail réels de droit commun.",
    motsClesObligatoires: [
      "Intervention sur les Offres et les Demandes",
      "refus du tri préalable",
      "rupture avec l'employabilité",
      "action sur l'entreprise",
    ],
    exemplePratique:
      "Un conseiller IOD qui négocie l'aménagement d'un poste d'opérateur pour y placer directement un demandeur d'emploi sans mise en concurrence.",
  },
  {
    id: "def-desaffiliation",
    terme: "La Désaffiliation",
    auteur: "Robert Castel (1995)",
    modules: ["pst108", "pst123"],
    definitionOfficielle:
      "Processus de rupture et de décrochage social caractérisé par la conjonction de la précarité du travail (absence de travail stable) et de l'isolement relationnel (effilochement des réseaux familiaux et communautaires de sociabilité).",
    motsClesObligatoires: [
      "décrochage du travail stable",
      "isolement relationnel",
      "société salariale",
      "zone de vulnérabilité",
    ],
    exemplePratique:
      "La situation des personnes accueillies en SAMU social, cumulant perte de logement, absence de statut d'emploi et rupture familiale.",
  },

  // --- CLOT & DUBAR & SAINSAULIEU & DEJOURS ---
  {
    id: "def-activite-empeechee",
    terme: "L'Activité Empêchée",
    auteur: "Yves Clot (2010)",
    modules: ["pst106"],
    definitionOfficielle:
      "Concept de la clinique de l'activité désignant la souffrance résultant de l'impossibilité matérielle ou organisationnelle de réaliser un travail de qualité conforme aux règles de l'art du genre professionnel, contraignant l'opérateur au travail bâclé ou contrarié.",
    motsClesObligatoires: [
      "travail bâclé",
      "genre professionnel",
      "règles de l'art",
      "travail bien fait",
      "clinique de l'activité",
    ],
    exemplePratique:
      "L'éducateur ou soignant contraint de remplir des formulaires informatiques au lieu de passer du temps avec les bénéficiaires.",
  },
  {
    id: "def-double-transaction-dubar",
    terme: "La Double Transaction Identitaire",
    auteur: "Claude Dubar (1991)",
    modules: ["pst123"],
    definitionOfficielle:
      "Processus permanent d'élaboration de l'identité articulant la transaction biographique interne (identité pour soi construite dans le temps entre continuités et ruptures) et la transaction relationnelle externe (identité pour autrui attribuée par les institutions et les jugements sociaux).",
    motsClesObligatoires: [
      "transaction biographique (pour soi)",
      "transaction relationnelle (pour autrui)",
      "actes d'attribution",
      "actes d'appartenance",
    ],
    exemplePratique:
      "Un cadre technique autodidacte promu ingénieur qui vit un conflit entre son identité ouvrière d'origine et le statut accordé par l'entreprise.",
  },
  {
    id: "def-quatre-modeles-sainsaulieu",
    terme: "Les 4 Modèles de Pouvoir",
    auteur: "Renaud Sainsaulieu (1977)",
    modules: ["pst123"],
    definitionOfficielle:
      "Typologie des cultures relationnelles forgées par l'apprentissage politique du pouvoir en entreprise : 1) Modèle fusionnel (camaraderie égalitaire sans divergence) ; 2) Modèle du retrait (travail alimentaire) ; 3) Modèle négociateur (rivalité pacifiée et expertise) ; 4) Modèle affinitaire (clans de promotion).",
    motsClesObligatoires: [
      "modèle fusionnel",
      "modèle du retrait",
      "modèle négociateur",
      "modèle affinitaire",
      "accès au pouvoir",
    ],
    exemplePratique:
      "Le modèle négociateur des ingénieurs débattant démocratiquement des règles face au modèle fusionnel des ouvriers faisant bloc contre le chef.",
  },
  {
    id: "def-jugement-beaute-utilite",
    terme: "Les Jugements d'Utilité et de Beauté",
    auteur: "Christophe Dejours (1993)",
    modules: ["pst106"],
    definitionOfficielle:
      "Deux piliers de la dynamique de reconnaissance en psychodynamique du travail : le jugement d'utilité émane de la hiérarchie ou des bénéficiaires et porte sur l'efficacité sociale ou économique ; le jugement de beauté émane des pairs et valide la conformité aux règles de l'art et à la créativité du métier.",
    motsClesObligatoires: [
      "jugement d'utilité (hiérarchie)",
      "jugement de beauté (pairs)",
      "règles de l'art",
      "sublimation",
      "santé mentale",
    ],
    exemplePratique:
      "Un artisan dont le travail est applaudi par ses collègues pour la pureté de son geste, même si la direction juge que cela a pris trop de temps.",
  },
  {
    id: "def-balkanisation-psychologue",
    terme: "La Balkanisation de la Profession",
    auteur: "Thomas Le Bianic (2004)",
    modules: ["pst123"],
    definitionOfficielle:
      "Thèse socio-historique montrant les divisions intestines et les luttes de territoire qui ont fracturé la profession de psychologue du travail en France (entre psychotechniciens, ergonomes et cliniciens) face aux médecins du travail et aux directeurs du personnel, avant la protection du titre par la Loi du 25 juillet 1985.",
    motsClesObligatoires: [
      "balkanisation",
      "luttes de territoire",
      "Loi du 25 juillet 1985",
      "titre protégé",
      "autonomie technique",
    ],
    exemplePratique:
      "L'affirmation de la posture clinique du psychologue du travail indépendant des pressions managériales de rentabilité.",
  },
  {
    id: "def-fonctions-latentes-jahoda",
    terme: "Les 5 Fonctions Latentes de l'Emploi",
    auteur: "Marie Jahoda (Marienthal, 1933)",
    modules: ["pst123"],
    definitionOfficielle:
      "Bénéfices psychosociaux indirects procurés par l'exercice d'un emploi rémunéré, au-delà de sa fonction manifeste de revenu : 1) Imposition d'un cadre temporel quotidien structuré ; 2) Contacts sociaux réguliers hors de la famille ; 3) Participation à des buts collectifs transcendant l'individu ; 4) Attribution d'un statut social reconnu et d'une identité positive ; 5) Prescription d'activités régulières obligatoires. La privation d'emploi entraîne l'effondrement de ces repères structurants.",
    motsClesObligatoires: [
      "fonctions latentes",
      "structuration du temps",
      "contacts sociaux hors-famille",
      "buts collectifs",
      "statut social et identité",
      "activité régulière",
    ],
    exemplePratique:
      "Un demandeur d'emploi de longue durée qui perd la notion du temps, s'isole socialement et voit son identité s'étioler après la fermeture de son entreprise.",
  },
  {
    id: "def-supervision-clinique-lutumba",
    terme: "La Supervision Clinique du Psychologue",
    auteur: "Dr. Prisca Lutumba / Code de Déontologie (1996/2021)",
    modules: ["pst123"],
    definitionOfficielle:
      "Dispositif réflexif obligatoire dans l'éthique de la pratique, consistant en un espace régulier et confidentiel d'élaboration intime entre le psychologue et un tiers superviseur extérieur expérimenté. La supervision permet d'analyser le contre-transfert, les résonances affectives face à la souffrance d'autrui, les impasses méthodologiques et les arbitrages déontologiques. Elle se distingue rigoureusement de l'Analyse des Pratiques (collective d'équipe) et de la Régulation.",
    motsClesObligatoires: [
      "outil de travail fondamental",
      "tiers superviseur extérieur",
      "élaboration intime",
      "contre-transfert",
      "éthique et déontologie",
    ],
    exemplePratique:
      "Un psychologue du travail qui travaille en supervision sur son sentiment d'impuissance et sa posture déontologique face à une direction d'entreprise maltraitante.",
  },
  {
    id: "def-psychotechnique-lahy-pieron",
    terme: "La Psychotechnique du Travail",
    auteur: "Jean-Maurice Lahy & Henri Piéron (1908-1928)",
    modules: ["pst123"],
    definitionOfficielle:
      "Branche historique pionnière appliquant les méthodes de la psychologie différentielle et expérimentale à la sélection et à l'orientation des travailleurs. Fondée sur le postulat que les aptitudes humaines sont mesurables par des tests psychomoteurs et sensoriels, stables dans le temps et prédictives de l'efficacité au poste. Symbolisée en France par la sélection des conducteurs de tramway par Lahy (1908) et la création de l'INOP au Cnam par Piéron (1928), elle fut critiquée pour son réductionnisme de l'homme au poste ('The right man in the right place').",
    motsClesObligatoires: [
      "psychotechnique",
      "mesure des aptitudes",
      "sélection et orientation",
      "The right man in the right place",
      "INOP (1928)",
    ],
    exemplePratique:
      "La passation de tests de temps de réaction et d'attention sélective sur simulateur pour sélectionner les traminots de la banlieue parisienne en 1908.",
  },
  {
    id: "def-regulation-ergonomique-leplat",
    terme: "La Régulation Ergonomique",
    auteur: "Jacques Leplat & Jean-Marie Hoc (1983)",
    modules: ["pst106"],
    definitionOfficielle:
      "Processus dynamique par lequel l'opérateur adapte ses modes opératoires et ses stratégies cognitives pour compenser les aléas et la variabilité de la situation (conditions externes) tout en gérant son propre état interne (fatigue, charge cognitive, compétences) afin d'atteindre le but de la tâche sans dégrader sa santé.",
    motsClesObligatoires: [
      "modes opératoires",
      "conditions externes",
      "état interne",
      "compromis opératoire",
      "variabilité du réel",
      "charge cognitive",
    ],
    exemplePratique:
      "L'infirmière qui ralentit son rythme ou demande l'aide d'un collègue lors d'un soin complexe pour éviter une erreur médicamenteuse sous tension.",
    piegeConfondreAvec:
      "Ne pas confondre avec le simple respect du protocole prescrit : la régulation est une création opératoire permanente face à l'imprévu.",
  },
  {
    id: "def-genre-professionnel-clot",
    terme: "Le Genre Professionnel",
    auteur: "Yves Clot (1999)",
    modules: ["pst106"],
    definitionOfficielle:
      "Mémoire collective et vivante d'un métier, constituée par l'ensemble des règles officieuses, des sous-entendus, des ficelles et des manières de faire partagées par le collectif de travail pour affronter le réel. C'est le corps d'obligations et de ressources partagé qui permet de travailler sans réinventer chaque geste.",
    motsClesObligatoires: [
      "mémoire collective",
      "règles officieuses",
      "collectif de pairs",
      "ficelles du métier",
      "ressource pour l'action",
    ],
    exemplePratique:
      "Les signaux gestuels silencieux qu'échangent deux soignants pour mobiliser un patient lourd en douceur sans forcer.",
    piegeConfondreAvec:
      "Ne pas confondre avec la fiche de poste ou les consignes écrites par la direction (qui relèvent de la tâche prescrite).",
  },
  {
    id: "def-auto-confrontation-croisee",
    terme: "L'Auto-confrontation Croisée",
    auteur: "Yves Clot, Daniel Faïta, Gabriel Fernandez (2000)",
    modules: ["pst106"],
    definitionOfficielle:
      "Dispositif méthodologique central de la clinique de l'activité en 4 étapes : 1) Enregistrement vidéo de l'activité réelle ; 2) Auto-confrontation simple (l'opérateur commente sa propre vidéo avec le chercheur) ; 3) Auto-confrontation croisée (deux collègues confrontent et débattent de leurs manières différentes de travailler sur la même tâche) ; 4) Restitution au collectif pour relancer la controverse professionnelle.",
    motsClesObligatoires: [
      "clinique de l'activité",
      "vidéo de l'activité réelle",
      "auto-confrontation simple",
      "auto-confrontation croisée",
      "controverse professionnelle",
      "développement du pouvoir d'agir",
    ],
    exemplePratique:
      "Deux facteurs visionnant la distribution du courrier et débattant de la manière d'ouvrir les boîtes aux lettres défectueuses sans perdre de temps.",
  },
  {
    id: "def-agir-strategique-masque",
    terme: "L'Agir Stratégique Masqué",
    auteur: "Jürgen Habermas (1981)",
    modules: ["pst108"],
    definitionOfficielle:
      "Forme d'interaction où le locuteur dissimule son intention d'influencer ou de manipuler autrui sous l'apparence trompeuse d'une discussion coopérative et sincère. L'interlocuteur croit participer à une recherche collective d'accord, alors qu'il est l'objet d'une instrumentalisation orientée vers le succès unilatéral du locuteur.",
    motsClesObligatoires: [
      "agir stratégique masqué",
      "manipulation",
      "tromperie sur les prétentions à la validité",
      "illusion délibérative",
      "succès individuel",
    ],
    exemplePratique:
      "L'animation d'ateliers de 'concertation' où le projet managérial est déjà bouclé et où les objections sont désamorcées sous un vernis d'écoute bienveillante.",
  },
  {
    id: "def-zone-vulnerabilite-castel",
    terme: "La Zone de Vulnérabilité",
    auteur: "Robert Castel (1995)",
    modules: ["pst123"],
    definitionOfficielle:
      "Zone intermédiaire de l'espace social caractérisée par la précarité de l'emploi (contrats courts, temps partiels subis, insécurité salariale) et la fragilité des supports relationnels et familiaux. Elle constitue la antichambre du basculement vers la zone de désaffiliation.",
    motsClesObligatoires: [
      "zone de vulnérabilité",
      "précarité de l'emploi",
      "fragilité relationnelle",
      "antichambre de la désaffiliation",
      "supports de l'existence",
    ],
    exemplePratique:
      "Un salarié enchaînant des contrats d'intérim sans savoir s'il travaillera la semaine suivante et peinant à obtenir un logement stable.",
  },
  // --- PST120 ---
  {
    id: "def-normalite-souffrante",
    terme: "La Normalité Souffrante",
    auteur: "Christophe Dejours (1980/2000)",
    modules: ["pst120"],
    definitionOfficielle:
      "État d'équilibre précaire et actif conquis de haute lutte par le travailleur contre la décompensation psychopathologique, grâce à la mise en œuvre de stratégies collectives de défense et à la possibilité de sublimer la souffrance issue de l'épreuve du réel par la dynamique de reconnaissance.",
    motsClesObligatoires: [
      "équilibre précaire et conquis",
      "lutte contre la décompensation",
      "stratégies collectives de défense",
      "épreuve du réel",
      "sublimation et reconnaissance",
    ],
    exemplePratique:
      "Des ouvriers du bâtiment qui maintiennent une apparente bonne humeur et une efficacité sans faille en bravant collectivement le danger du vide.",
    piegeConfondreAvec:
      "Ne pas confondre avec un état de bien-être passif ou une absence de souffrance : la normalité est une lutte permanente et coûteuse pour ne pas devenir fou.",
  },
  {
    id: "def-metis-dejours",
    terme: "La Mètis (Intelligence Rusée / Pratique)",
    auteur: "Christophe Dejours (1993)",
    modules: ["pst120", "pst106"],
    definitionOfficielle:
      "Forme d'intelligence corporelle, rusée et tacite, mobilisée par l'opérateur pour déjouer les pièges de la matière et la résistance du réel. Elle s'enracine dans la sensibilité sensorielle et invente des modes opératoires non codifiables dans les manuels prescrits.",
    motsClesObligatoires: [
      "intelligence corporelle et rusée",
      "résistance du réel",
      "sensibilité sensorielle",
      "savoirs tacites",
      "non codifiable",
    ],
    exemplePratique:
      "L'ouvrier métallurgiste qui évalue la température exacte du métal liquide au simple changement de couleur et au son du fourneau.",
    piegeConfondreAvec:
      "Ne pas confondre avec la rationalité procédurale ou l'application stricte des consignes : la Mètis commence précisément là où la technique échoue.",
  },
  {
    id: "def-jugement-beaute",
    terme: "Le Jugement de Beauté (et Jugement d'Utilité)",
    auteur: "Christophe Dejours (1993)",
    modules: ["pst120"],
    definitionOfficielle:
      "Volet esthétique de la dynamique de reconnaissance, porté exclusivement par les pairs (ceux qui connaissent les ficelles et les contraintes du métier), validant la conformité du travail aux règles de l'art et l'originalité du style. Il s'articule au jugement d'utilité économique et technique porté par la hiérarchie.",
    motsClesObligatoires: [
      "jugement des pairs",
      "règles de l'art du métier",
      "reconnaissance esthétique",
      "jugement d'utilité hiérarchique",
      "sublimation",
    ],
    exemplePratique:
      "Un chirurgien félicité par ses confrères pour la propreté d'un geste opératoire complexe accompli dans l'urgence.",
    piegeConfondreAvec:
      "Ne pas confondre le jugement de beauté (pairs, règles de l'art) et le jugement d'utilité (hiérarchie/clients, efficacité économique).",
  },
  {
    id: "def-care-molinier",
    terme: "Le Travail de Care et les Habiletés Discrètes",
    auteur: "Pascale Molinier (2013)",
    modules: ["pst120"],
    definitionOfficielle:
      "Activité concrète de préservation, d'entretien et de réparation du monde et des personnes vulnérables, exigeant une attention sensible permanente et des compétences relationnelles non formalisées (les habiletés discrètes) qui ne se voient que lorsqu'elles font défaut et restent socialement invisibilisées.",
    motsClesObligatoires: [
      "préservation des vulnérabilités",
      "attention sensible",
      "habiletés discrètes",
      "invisibilité sociale",
      "travail non formalisé",
    ],
    exemplePratique:
      "L'aide-soignante qui temporise un geste de soin pour calmer l'angoisse inexprimée d'un résident dément sans que ce temps n'apparaisse sur son logiciel de traçabilité.",
    piegeConfondreAvec:
      "Ne pas naturaliser le care comme une prédisposition ou une gentillesse féminine innée : c'est un travail hautement qualifié et psychiquement éprouvant.",
  },
  {
    id: "def-nevrose-telephonistes",
    terme: "La Névrose Professionnelle Situationnelle",
    auteur: "Louis Le Guillant (1956)",
    modules: ["pst120"],
    definitionOfficielle:
      "Atteinte de la santé mentale résultant directement des contraintes d'une situation de travail anormale et pathogène (cadences imposées, surveillance constante, parcellisation temporelle). Le Guillant démontre que le symptôme est la réponse normale d'un individu sain à un environnement de travail pathologique.",
    motsClesObligatoires: [
      "situation de travail pathogène",
      "réponse normale à un cadre anormal",
      "cadences et surveillance",
      "névrose des téléphonistes",
      "dépassement du constitutionalisme",
    ],
    exemplePratique:
      "Les crises d'angoisse, vertiges et insomnies des opératrices du central téléphonique chronométrées à la seconde près.",
    piegeConfondreAvec:
      "Ne pas imputer le trouble à une fragilité névrotique constitutionnelle ou antérieure du sujet : la cause première réside dans l'organisation du travail.",
  },
  {
    id: "def-etat-epuisement-veil",
    terme: "L'État d'Épuisement (Fatigue Industrielle)",
    auteur: "Claude Veil (1957)",
    modules: ["pst120"],
    definitionOfficielle:
      "Rupture de l'adaptation dynamique de l'organisme consécutive à une sollicitation prolongée et excessive qui outrepasse les capacités de récupération physiologique et psychologique du sujet, transformant la fatigue saine et réversible en un état pathologique d'usure chronique.",
    motsClesObligatoires: [
      "rupture de l'adaptation dynamique",
      "dépassement des capacités de récupération",
      "sollicitation prolongée",
      "fatigue réversible vs épuisement chronique",
    ],
    exemplePratique:
      "L'épuisement profond d'un cadre soumis à une surcharge cognitive permanente et à des injonctions contradictoires sans repos réparateur.",
    piegeConfondreAvec:
      "Ne pas confondre la fatigue physiologique normale (qui cède au repos) et l'état d'épuisement (qui persiste même après le repos et altère l'équilibre somatopsychique).",
  },
  {
    id: "def-souffrance-pathogene",
    terme: "La Souffrance Pathogène",
    auteur: "Christophe Dejours (1993)",
    modules: ["pst120"],
    definitionOfficielle:
      "État de détresse psychique qui survient lorsque toutes les voies de la négociation, de l'aménagement de l'organisation du travail et de la reconnaissance symbolique (utilité et beauté) sont durablement bloquées, rendant la sublimation impossible et conduisant à l'épuisement des défenses et à la décompensation somatique ou psychiatrique.",
    motsClesObligatoires: [
      "blocage des voies de négociation",
      "impossibilité de sublimation",
      "absence de reconnaissance",
      "décompensation somatique",
    ],
    exemplePratique:
      "Un soignant forcé d'expédier la toilette de patients âgés selon un minutage imposé, sans espace pour en débattre, somatisant par de violents ulcères et insomnies.",
    piegeConfondreAvec:
      "Ne pas confondre avec la souffrance créatrice, qui est l'aiguillon de l'intelligence pratique (la mêtis) ouvrant la voie à la sublimation.",
  },
  {
    id: "def-ideologie-virile",
    terme: "L'Idéologie Défensive Virile",
    auteur: "Pascale Molinier (2006)",
    modules: ["pst120"],
    definitionOfficielle:
      "Stratégie collective de défense élaborée par les collectifs confrontés au danger ou à la pénibilité physique, consistant à dénier la peur et la souffrance par des conduites d'endurance héroïque et de bravade collective, afin de continuer à travailler au détriment de la perception du risque réel.",
    motsClesObligatoires: [
      "stratégie collective de défense",
      "déni de la peur et souffrance",
      "endurance héroïque",
      "métiers à risque",
      "anesthésie émotionnelle",
    ],
    exemplePratique:
      "Sur un chantier de désamiantage, des ouvriers moquant un jeune collègue qui refuse de retirer son masque pour souffler sous la chaleur.",
    piegeConfondreAvec:
      "Ne pas confondre avec un trait de caractère ou une agressivité individuelle : c'est un mécanisme collectif de survie psychique.",
  },
  // --- PST124 ---
  {
    id: "def-artefact-instrument",
    terme: "L'Instrument vs L'Artefact",
    auteur: "Pierre Rabardel (1995)",
    modules: ["pst124"],
    definitionOfficielle:
      "L'artefact désigne la chose technique matérielle ou symbolique nue, conçue par les ingénieurs indépendamment de son usage concret. L'instrument est une entité mixte constituée par l'artefact combiné aux schèmes d'utilisation (cognitifs, moteurs et collectifs) élaborés par le sujet pour mener son activité.",
    motsClesObligatoires: [
      "entité mixte",
      "artefact technique nu",
      "schèmes d'utilisation",
      "sujet en activité",
      "appropriation",
    ],
    exemplePratique:
      "Le stéthoscope n'est qu'un artefact métallique ; il ne devient un instrument diagnostique que lorsqu'il est relié à l'oreille et aux schèmes d'écoute clinique du médecin.",
    piegeConfondreAvec:
      "Ne pas confondre la présence physique de l'objet avec sa disponibilité fonctionnelle pour l'action du professionnel.",
  },
  {
    id: "def-catachrese-rabardel",
    terme: "La Catachrèse Ergonomique",
    auteur: "Pierre Rabardel (1995)",
    modules: ["pst124", "pst106"],
    definitionOfficielle:
      "Détournement d'usage par lequel un opérateur utilise un artefact pour une fonction différente de celle initialement prévue par ses concepteurs, afin de résoudre un imprévu ou compenser une défaillance de la prescription technique.",
    motsClesObligatoires: [
      "détournement d'usage",
      "fonction non prévue par le concepteur",
      "compensation de la prescription",
      "créativité opératoire",
    ],
    exemplePratique:
      "Détourner un champ de saisie de code postal pour y inscrire des alertes cliniques urgentes ignorées par le progiciel de santé.",
    piegeConfondreAvec:
      "Ne jamais traiter la catachrèse comme une faute ou un acte d'indiscipline : c'est un analyseur privilégié des failles de l'artefact.",
  },
  {
    id: "def-technologie-capacitante",
    terme: "L'Environnement et Technologie Capacitants",
    auteur: "Marc-Éric Bobillier-Chaumon & Pierre Falzon (2013)",
    modules: ["pst124", "pst106"],
    definitionOfficielle:
      "Dispositif technique et organisationnel qui offre des marges de manœuvre, favorise l'apprentissage, élargit le pouvoir d'agir des opérateurs et préserve leur santé à long terme, par opposition aux technologies incapacitantes qui enferment dans une exécution taylorienne surveillée.",
    motsClesObligatoires: [
      "élargissement du pouvoir d'agir",
      "marges de manœuvre",
      "développement des compétences",
      "technologie incapacitante",
      "ergonomie constructive",
    ],
    exemplePratique:
      "Un cobot industriel réglable dont l'opérateur peut modifier la cadence et la trajectoire pour tester de nouvelles méthodes de montage.",
    piegeConfondreAvec:
      "Ne pas croire qu'une technologie automatisée est capacitante par sa seule modernité : elle ne l'est que si elle donne du pouvoir au travailleur.",
  },
  {
    id: "def-systeme-activite",
    terme: "Le Système d'Activité et les Contradictions",
    auteur: "Yrjö Engeström (1987)",
    modules: ["pst124", "pst106"],
    definitionOfficielle:
      "Modèle triangulaire élargi de la théorie historico-culturelle de l'activité reliant le Sujet, l'Objet et les Outils, médiatisés par les Règles, la Communauté et la Division du travail. Les contradictions systémiques internes sont les moteurs du développement et de l'apprentissage expansif.",
    motsClesObligatoires: [
      "modèle triangulaire élargi",
      "Sujet, Objet, Outils",
      "Règles, Communauté, Division du travail",
      "contradictions systémiques",
      "apprentissage expansif",
    ],
    exemplePratique:
      "La contradiction entre l'objet du soin (le patient à guérir) et la règle de rentabilité (T2A minutée) dans un hôpital numérisé.",
    piegeConfondreAvec:
      "Ne pas considérer les contradictions comme de simples conflits interpersonnels : ce sont des tensions structurelles entre les composantes du système.",
  },
  {
    id: "def-pharmakon-stiegler",
    terme: "Le Pharmakon Technologique",
    auteur: "Bernard Stiegler (2010)",
    modules: ["pst124"],
    definitionOfficielle:
      "Concept platonicien repris par Stiegler pour désigner la double nature indissociable de toute technique : à la fois poison qui automatise et court-circuite la pensée humaine, et remède potentiel qui peut décupler les capacités de création et le pouvoir d'agir si elle est adoptée réflexivement.",
    motsClesObligatoires: [
      "double nature indissociable",
      "poison et remède",
      "court-circuit de la pensée",
      "émancipation réflexive",
      "pharmacologie",
    ],
    exemplePratique:
      "L'IA générative : poison si elle remplace le raisonnement critique du rédacteur, remède si elle le décharge des corvées de mise en forme pour libérer l'investigation.",
    piegeConfondreAvec:
      "Éviter le rejet technophobe primaire comme l'enthousiasme technophile naïf : la posture pharmacologique exige d'interroger les conditions d'usage.",
  },
  {
    id: "def-proletarisation-savoirs",
    terme: "La Prolétarisation des Savoirs",
    auteur: "Bernard Stiegler (2009)",
    modules: ["pst124"],
    definitionOfficielle:
      "Processus de dépossession et de perte des savoirs (savoir-faire et savoir-vivre) au profit d'appareils techniques automatiques et d'algorithmes qui capturent les compétences des travailleurs, réduisant ces derniers au statut de simples surveillants d'écrans privés de jugement clinique.",
    motsClesObligatoires: [
      "perte des savoir-faire",
      "dépossession cognitive",
      "capture algorithmique",
      "surveillance d'écrans",
      "perte du jugement clinique",
    ],
    exemplePratique:
      "Un banquier expérimenté dont le diagnostic de prêt est désormais subordonné au feu vert aveugle d'un algorithme de scoring de risque.",
    piegeConfondreAvec:
      "Ne pas restreindre la prolétarisation à la baisse de salaire : c'est une déqualification existentielle du rapport à son propre travail.",
  },
  {
    id: "def-genese-instrumentale",
    terme: "La Genèse Instrumentale",
    auteur: "Pierre Rabardel (1995)",
    modules: ["pst124"],
    definitionOfficielle:
      "Processus bidirectionnel par lequel un artefact technique devient un instrument psychologique pour le sujet, articulant l'instrumentation (adaptation et évolution des schèmes cognitifs de l'opérateur) et l'instrumentalisation (appropriation, personnalisation et détournement éventuel des fonctionnalités de l'artefact par catachrèse).",
    motsClesObligatoires: [
      "processus bidirectionnel",
      "artefact vers instrument",
      "instrumentation (schèmes du sujet)",
      "instrumentalisation (catachrèse)",
    ],
    exemplePratique:
      "Un technicien paramétrant des macros personnalisées sur un tableur pour adapter l'outil brut à la complexité réelle de ses tournées.",
    piegeConfondreAvec:
      "Ne pas confondre l'artefact (l'objet matériel ou logiciel livré brut) et l'instrument (l'artefact + les schèmes d'action construits par le travailleur).",
  },
  {
    id: "def-acceptation-situee",
    terme: "L'Acceptation Située",
    auteur: "Marc-Éric Bobillier-Chaumon (2016)",
    modules: ["pst124"],
    definitionOfficielle:
      "Processus dynamique et situé d'appropriation d'une technologie au cours de l'activité réelle, évalué a posteriori à travers quatre dimensions interdépendantes : l'utilité pour la tâche, l'utilisabilité de l'artefact, l'intégration socio-organisationnelle dans le collectif et le sens identitaire pour le métier.",
    motsClesObligatoires: [
      "appropriation a posteriori dans l'activité réelle",
      "4 dimensions interdépendantes",
      "utilité et utilisabilité",
      "intégration collective et sens identitaire",
    ],
    exemplePratique:
      "Le rejet d'un logiciel de téléconsultation médicale qui fonctionne techniquement mais détruit l'alliance thérapeutique et la relation de confiance avec le patient.",
    piegeConfondreAvec:
      "Ne pas confondre avec l'acceptabilité a priori (modèles TAM de Davis) qui mesure seulement des intentions déclarées sur questionnaire hors situation réelle.",
  },
  // --- PST123 ENRICHISSEMENT ---
  {
    id: "def-dirty-work-hughes",
    terme: "Le Sale Boulot (Dirty Work) et la Division Morale",
    auteur: "Everett C. Hughes (1958/1962)",
    modules: ["pst123"],
    definitionOfficielle:
      "Tâches physiquement souillantes, socialement dégradantes ou moralement répréhensibles inhérentes à toute activité humaine, que les groupes dominants et la société délèguent à des professions subalternes afin de préserver la pureté et la dignité de leur propre mandat social.",
    motsClesObligatoires: [
      "souillure physique, sociale et morale",
      "délégation institutionnelle",
      "division morale du travail",
      "invisibilisation de la tâche impure",
      "mandat professionnel",
    ],
    exemplePratique:
      "Les chirurgiens déléguant le nettoyage du bloc opératoire et des plaies suintantes aux aides-soignants et panseurs.",
    piegeConfondreAvec:
      "Ne pas réduire le sale boulot aux salissures physiques : le sale boulot moral (licencier, sanctionner, tromper) est tout aussi toxique.",
  },
  {
    id: "def-carriere-morale-goffman",
    terme: "La Carrière Morale du Déviant",
    auteur: "Erving Goffman (1961/1963)",
    modules: ["pst123"],
    definitionOfficielle:
      "Séquence standardisée de modifications vécues par le sujet dans son statut social et son image de soi (son identité morale), sous l'effet de l'attribution d'un stigmate ou d'une étiquette institutionnelle de déviance par les instances dominantes, débouchant sur une mortification du moi.",
    motsClesObligatoires: [
      "séquence standardisée",
      "modification de l'image de soi",
      "attribution de stigmate",
      "mortification du moi",
      "déviance secondaire",
    ],
    exemplePratique:
      "Le salarié mis au placard dont l'assurance professionnelle s'effondre progressivement au fur et à mesure que ses collègues l'évitent dans les couloirs.",
    piegeConfondreAvec:
      "Ne pas concevoir la carrière morale comme un plan de promotion : c'est la trajectoire biographique d'altération de l'estime de soi sous contrainte institutionnelle.",
  },
  {
    id: "def-travail-emotionnel-hochschild",
    terme: "Le Travail Émotionnel (Emotional Labor)",
    auteur: "Arlie Russell Hochschild (1983) / Michel Gollac (2011)",
    modules: ["pst123", "pst106"],
    definitionOfficielle:
      "Processus psychologique et cognitif coûteux par lequel un salarié est contraint de façonner, réguler, feindre ou réprimer ses propres émotions afin d'afficher la façade affective extérieurement exigée par les normes de l'organisation lors des interactions de service (sourire de façade, calme obligatoire face à l'agressivité). Intégré par le rapport Gollac comme facteur cardinal de RPS.",
    motsClesObligatoires: [
      "régulation des émotions",
      "façade émotionnelle prescrite",
      "dissonance affective",
      "usure psychique",
      "relation de service",
    ],
    exemplePratique:
      "L'agent de SAV ou la conseillère d'accueil qui doit maintenir un ton chaleureux et souriant face à un usager insultant sans pouvoir exprimer sa colère.",
    piegeConfondreAvec:
      "Ne pas confondre avec la simple empathie spontanée ou la politesse naturelle : le travail émotionnel est une contrainte marchande prescrite qui aliène le sujet de ses affects authentiques.",
  },
  {
    id: "def-resonance-symbolique-dejours",
    terme: "La Résonance Symbolique",
    auteur: "Christophe Dejours (1993)",
    modules: ["pst123", "pst120"],
    definitionOfficielle:
      "Mécanisme par lequel une situation de travail conflictuelle ou déstabilisante (scène professionnelle actuelle) vient réactiver, réveiller et faire écho à des blessures, angoisses ou relations d'objet non résolues de la scène personnelle et familiale antérieure. Le psychologue du travail accueille ce vécu mais réétablit le tiers-travail et l'altérité sans glisser vers la psychanalyse décontextualisée.",
    motsClesObligatoires: [
      "scène professionnelle vs scène personnelle",
      "réactivation d'angoisses antérieures",
      "tiers-travail",
      "altérité",
      "défenses psychiques",
    ],
    exemplePratique:
      "Une collaboratrice vivant une remarque managériale ordinaire comme une persécution sadique parce qu'elle projette inconsciemment sur sa responsable l'image de sa mère dominatrice.",
    piegeConfondreAvec:
      "Ne pas réduire la souffrance au travail à la seule psychologie individuelle : la résonance symbolique s'actualise toujours dans une organisation du travail défaillante qui ne protège plus le sujet.",
  },
  {
    id: "def-tiers-travail-lutumba",
    terme: "Le Travail comme Tiers Médiateur (Tiers-Travail)",
    auteur: "Dr. Prisca Lutumba & Cliniques du Travail Cnam",
    modules: ["pst123"],
    definitionOfficielle:
      "Fonction médiatrice et transitionnelle du travail réel dans la régulation des relations organisationnelles. En recentrant les débats sur l'activité, les critères du geste de métier et les empêchements opératoires, le tiers-travail neutralise les affrontements narcissiques interpersonnels imaginaires et protège les collectifs.",
    motsClesObligatoires: [
      "objet transitionnel",
      "médiation objective",
      "neutralisation du face-à-face narcissique",
      "critères du travail bien fait",
      "délibération sur l'activité",
    ],
    exemplePratique:
      "Lors d'une réunion de régulation d'équipe conflictuelle, déplacer la querelle personnelle 'untel est incompétent' vers 'comment s'organisent les flux d'information et les arbitrages lors des pics de charge'.",
    piegeConfondreAvec:
      "Ne pas confondre avec une conciliation syndicale ou une médiation RH purement juridique : le tiers-travail porte sur l'activité réelle concrète.",
  },
  // --- SÉANCE 2 PST106 : DE L'OST À L'ANALYSE ERGONOMIQUE DU TRAVAIL ---
  {
    id: "def-prescription-subjectivite-clot",
    terme: "La Prescription de la Subjectivité",
    auteur: "Yves Clot (2009)",
    modules: ["pst106"],
    definitionOfficielle:
      "Mutation managériale contemporaine où la prescription ne porte plus seulement sur les gestes physiques et le temps (taylorisme), mais somme le salarié d'engager sa subjectivité, ses affects, son autonomie et sa disponibilité psychique. L'organisation achète et formate l'intériorité du travailleur tout en le privant des délibérations collectives nécessaires pour fixer les critères du travail bien fait.",
    motsClesObligatoires: [
      "engagement de la subjectivité",
      "disponibilité psychique",
      "mutation du taylorisme",
      "injonction d'autonomie sans pouvoir d'agir",
      "formatage des affects",
    ],
    exemplePratique:
      "L'obligation faite aux téléconseillers ou serveurs de manifester un sourire sincère et un enthousiasme prescrit par script dans un temps cadencé.",
    piegeConfondreAvec:
      "Ne pas confondre avec l'autonomie réelle ou la reconnaissance : c'est une autonomie sous contrainte maximale et contrôlée.",
  },
  {
    id: "def-optimum-vs-maximum-lahy",
    terme: "L'Optimum vs le Maximum",
    auteur: "Jean-Marie Lahy (1916)",
    modules: ["pst106"],
    definitionOfficielle:
      "Thèse épistémologique fondatrice de la psychophysiologie du travail opposant la logique taylorienne à la logique ergonomique : alors que Taylor recherche le 'maximum' quantitatif de rendement immédiat (conduisant à l'épuisement prématuré, à l'accident et à la vampirisation de l'organisme), la psychologie du travail recherche l' 'optimum', c'est-à-dire l'équilibre dynamique entre efficacité productive et préservation durable de la santé, de l'intégrité nerveuse et de la longévité du travailleur.",
    motsClesObligatoires: [
      "maximum immédiat (Taylor)",
      "optimum durable (Lahy)",
      "préservation de la santé",
      "équilibre psychophysiologique",
      "longévité de l'organisme",
    ],
    exemplePratique:
      "Refuser de supprimer les micro-pauses et temps morts d'un poste cadencé, car ils constituent la condition biologique indispensable pour tenir dans la durée.",
    piegeConfondreAvec:
      "Ne pas confondre avec une baisse volontaire de productivité : l'optimum produit un rendement global supérieur et pérenne sur la carrière.",
  },
  {
    id: "def-automatisation-liberatrice-lahy",
    terme: "L'Automatisation Interne Libératrice",
    auteur: "Jean-Marie Lahy (1921)",
    modules: ["pst106"],
    definitionOfficielle:
      "Processus par lequel le sujet humain incorpore spontanément des gestes et des schèmes d'action (comme dans la conduite, l'artisanat ou la cuisine) afin d'alléger sa charge cognitive et de créer de la 'disponibilité psychologique'. Cette automatisation endogène libère l'esprit pour penser, rêver, anticiper ou converser, et constitue une condition fondamentale de la liberté humaine, par opposition à la 'rationalisation externe' imposée mécaniquement par l'OST qui fige et aliène l'activité.",
    motsClesObligatoires: [
      "incorporation spontanée de schèmes",
      "disponibilité psychologique",
      "liberté humaine",
      "allègement de charge cognitive",
      "opposition à la rationalisation externe",
    ],
    exemplePratique:
      "Un ouvrier expérimenté qui réalise ses gestes sans y penser pour discuter avec son collègue ou réfléchir à sa soirée, échappant ainsi à l'enfermement de la tâche.",
    piegeConfondreAvec:
      "Ne pas confondre avec l'abrutissement machinal du travailleur à la chaîne : l'incorporation est maîtrisée par le sujet, le cadençage externe lui est subi.",
  },
  {
    id: "def-scripts-comportementaux",
    terme: "Les Scripts Comportementaux & l'Injonction de Sincérité",
    auteur: "Néotaylorisme de Service / Pr. Christine Lagabrielle",
    modules: ["pst106"],
    definitionOfficielle:
      "Protocoles organisationnels ultra-prescriptifs imposés aux salariés du secteur tertiaire (restauration rapide, plateformes d'appels, vente) régissant minutieusement le langage verbal (règle du BAM : Bonjour, Au revoir, Merci), les postures corporelles et les expressions faciales. Ils engendrent l'injonction paradoxale de la 'sincérité prescrite' ('votre sourire doit être sincère'), contraignant le travailleur à une façade relationnelle génératrice de dissonance émotionnelle.",
    motsClesObligatoires: [
      "protocoles prescriptifs de service",
      "scripts comportementaux (BAM)",
      "injonction paradoxale de sincérité",
      "dissonance émotionnelle",
      "travail sur autrui",
    ],
    exemplePratique:
      "Un employé de fast-food sommé d'accueillir chaque client avec une formule calibrée à la seconde et un regard chaleureux sous peine de sanction d'un client mystère.",
    piegeConfondreAvec:
      "Ne pas confondre avec la simple politesse professionnelle : le script est chronométré, standardisé, audité et dépossède le salarié de sa spontanéité relationnelle.",
  },
  {
    id: "def-14-difficultes-pacaud",
    terme: "Les 14 Difficultés Invisibles et la Régulation de Terrain",
    auteur: "Suzanne Pacaud (1953)",
    modules: ["pst106"],
    definitionOfficielle:
      "Ensemble des contraintes réelles sous-jacentes identifiées par Suzanne Pacaud au central téléphonique de la SNCF (bruit assourdissant, débit continu provoquant l'aphonie, contrainte temporelle de 15-20 s par appel, mémorisation mentale de l'organigramme ferroviaire, agressivité des usagers). Cette découverte fonde la rupture épistémologique du terrain ('pour comprendre le métier, il faut le faire') et démontre que ce que la direction qualifie de 'fautes' constitue en réalité des régulations cognitives vitales pour la survie du système.",
    motsClesObligatoires: [
      "14 difficultés réelles invisibles",
      "Suzanne Pacaud",
      "téléphonistes SNCF",
      "pour comprendre le métier il faut le faire",
      "régulation cognitive vs faute",
    ],
    exemplePratique:
      "Une opératrice qui coupe brièvement un usager agressif ou qui anticipe un branchement sans attendre la confirmation officielle pour désengorger le tableau.",
    piegeConfondreAvec:
      "Ne pas réduire l'activité des opératrices à une exécution mécanique de fiches : c'est un travail à haute intensité cognitive et émotionnelle.",
  },
  // --- SÉANCE 3 PST108 : LA COMMUNICATION COMME ACTIVITÉ CONJOINTE (F. VALLS) ---
  {
    id: "def-contrat-communication-ghiglione",
    terme: "Le Contrat de Communication",
    auteur: "Rodolphe Ghiglione (1986)",
    modules: ["pst108"],
    definitionOfficielle:
      "Système de règles psychosociales normatives et implicites, co-construites et incorporées 'par corps' par les interlocuteurs dans une Situation Potentiellement Communicative (SPC). Il structure l'activité conjointe à travers quatre règles cardinales : pertinence (reconnaissance réciproque des compétences), réciprocité (symétrie des échanges et écoute), contractualisation (lisibilité des rôles et des règles) et influence (volonté de co-construire un monde de possibles). Ce contrat est structurellement instable et doit être renégocié en continu sous peine de quiproquo ou de rupture.",
    motsClesObligatoires: [
      "règles implicites co-construites",
      "pertinence (égale compétence)",
      "réciprocité",
      "contractualisation (rôles)",
      "influence (monde de possibles)",
      "structurellement instable (Goffman)",
    ],
    exemplePratique:
      "Le rétablissement d'un contrat de communication lorsqu'un éducateur pose enfin son questionnaire pour regarder l'usager dans les yeux et s'accorder sur le sens de leur rencontre.",
    piegeConfondreAvec:
      "Ne pas confondre avec un contrat juridique formel écrit : c'est un cadre d'accord tacite, normatif et vivant issu de l'interaction.",
  },
  {
    id: "def-objectif-vs-enjeu-valls",
    terme: "Objectif vs Enjeu dans la Communication",
    auteur: "Rodolphe Ghiglione & Francis Valls (Séance 3)",
    modules: ["pst108"],
    definitionOfficielle:
      "Distinction clinique princeps en psychosociologie du travail : l'objectif correspond à la tâche explicite, au livrable matériel ou au résultat quantifiable requis par l'organisation ; l'enjeu désigne le sens profond que la situation revêt pour le sujet, ses priorités existentielles, son identité et ce qu'il cherche à préserver ou rendre possible. Se focaliser exclusivement sur l'objectif sous la pression du chiffre mène inévitablement à l'échec de la relation et à l'incommunication.",
    motsClesObligatoires: [
      "objectif (tâche explicite, résultat quantifiable)",
      "enjeu (sens partagé, ce qui compte vitalement)",
      "pression des résultats",
      "intégration de l'enjeu dans l'objectif",
    ],
    exemplePratique:
      "Obtenir un CDI à temps plein (objectif validé) pour une mère célibataire qui démissionne immédiatement car elle n'a aucun mode de garde pour sa fille le mercredi (enjeu ignoré).",
    piegeConfondreAvec:
      "Ne pas croire que l'enjeu remplace l'objectif : il faut au contraire subordonner et ajuster l'objectif à l'enjeu du sujet.",
  },
  {
    id: "def-informer-vs-communiquer-wolton",
    terme: "« Informer n'est pas communiquer »",
    auteur: "Dominique Wolton (2009)",
    modules: ["pst108"],
    definitionOfficielle:
      "Principe épistémologique affirmant que la transmission technique et rapide d'un message par un canal numérique (courriel, ERP, smartphone) ne constitue en aucun cas une communication humaine. L'information relève de la vitesse, de l'objet et du flux unilatéral ; la communication est une relation intersubjective lente, exigeant la négociation d'un sens partagé, la vérification du feedback et la prise en compte de l'altérité. D'où la nécessité vitale des métiers d'intermédiaires (psychologues du travail).",
    motsClesObligatoires: [
      "information (flux technique rapide)",
      "communication (relation intersubjective lente)",
      "sens partagé et feedback vérifié",
      "métiers d'intermédiaires (psychologues du travail)",
    ],
    exemplePratique:
      "Considérer qu'un jeune accompagné est pris en charge simplement parce qu'un courriel institutionnel lui a été adressé ('je lui ai pourtant envoyé un mail'), sans s'assurer de sa réception ni de son adhésion.",
    piegeConfondreAvec:
      "Ne pas rejeter les outils numériques modernes : il s'agit de comprendre que la performance technique ne garantit jamais un sens partagé si le lien humain est évacué.",
  },
  {
    id: "def-injonction-paradoxale-watzlawick",
    terme: "L'Injonction Paradoxale (Double Contrainte)",
    auteur: "Paul Watzlawick & Gregory Bateson (École de Palo Alto)",
    modules: ["pst108"],
    definitionOfficielle:
      "Structure communicationnelle pathogène formulant deux demandes simultanées et logiquement incompatibles à des niveaux logiques différents : l'obéissance à l'une entraîne obligatoirement la transgression de l'autre (ex: 'Sois spontané !'). La personne prise au piège ne peut ni satisfaire la demande, ni méta-communiquer sur la contradiction sans encourir le reproche, ni quitter le champ relationnel.",
    motsClesObligatoires: [
      "deux demandes logiquement incompatibles",
      "obéir entraîne désobéir",
      "impossibilité de méta-communiquer",
      "culpabilité et souffrance psychique",
    ],
    exemplePratique:
      "Une mère offrant deux cravates (une rouge et une bleue) à son fils Tanguy : dès qu'il met la bleue, elle lui reproche de ne pas aimer la rouge (Claire Bretécher). Au travail : prescrire l'autonomie tout en interdisant toute déviation de protocole.",
    piegeConfondreAvec:
      "Ne pas confondre avec un simple choix cornélien : dans l'injonction paradoxale, le choix lui-même est invalidé par la structure contradictoire du message.",
  },
  {
    id: "def-marqueur-symbolique-proxemie",
    terme: "Le Marqueur Symbolique & l'Occupation Territoriale",
    auteur: "Approche éthologique / Edward T. Hall (1966) & Francis Valls",
    modules: ["pst108"],
    definitionOfficielle:
      "Manifestation comportementale et spatiale non verbale par laquelle un acteur social délimite son territoire, affirme son identité singulière, compense une asymétrie statutaire ou défend sa dignité au sein d'un espace collectif ('histoires sans parole'). Ces marqueurs (chaise réservée en EHPAD, fleurs sur un bureau en open space, place de parking réservée) possèdent une charge signifiante majeure qui peut susciter l'apaisement ou au contraire un vif sentiment d'injustice sociale (François Dubet).",
    motsClesObligatoires: [
      "animal territorial (Hall)",
      "occupation de l'espace / proxémie",
      "affirmation d'identité sans parole",
      "marqueur symbolique",
      "sentiment d'injustice (François Dubet)",
    ],
    exemplePratique:
      "L'amertume d'une ASH prenant le bus de 5h observant l'interne débutant se garer sur sa place réservée et fixant sa blouse pour vérifier son statut hiérarchique.",
    piegeConfondreAvec:
      "Ne pas considérer ces conduites comme des caprices puérils : l'appropriation spatiale est une condition vitale de préservation de l'intégrité subjective au travail.",
  },
  {
    id: "def-effet-hawthorne",
    terme: "L'Effet Hawthorne & l'Organisation Informelle",
    auteur: "Elton Mayo (1932 / 1945)",
    modules: ["pst106"],
    definitionOfficielle:
      "Phénomène psychosociologique par lequel les travailleurs améliorent significativement leur productivité et leur engagement en réponse à l'attention bienveillante et à l'intérêt que leur portent les chercheurs ou la hiérarchie. L'expérience révèle l'existence d'une organisation sociale informelle, fondée sur des relations affectives et des normes de groupe tacites (régulation de la production), qui double l'organigramme formel.",
    motsClesObligatoires: [
      "attention bienveillante des observateurs",
      "facteurs psychosociaux",
      "organisation sociale informelle",
      "normes de groupe tacites",
      "instinct d'association (Mayo 1945)",
    ],
    exemplePratique:
      "Les six ouvrières du Test Room de la Western Electric maintenant une hausse de 20% de productivité même lors du rétablissement des horaires stricts initiaux.",
    piegeConfondreAvec:
      "Ne pas confondre avec un simple effet d'émulation financière : le salaire au rendement individuel est précisément court-circuité par la norme informelle du groupe.",
  },
  {
    id: "def-theorie-bifactorielle-herzberg",
    terme: "La Théorie Bi-factorielle (Hygiène vs Moteurs)",
    auteur: "Frederick Herzberg (1968)",
    modules: ["pst106"],
    definitionOfficielle:
      "Modèle théorique postulant que la satisfaction et l'insatisfaction professionnelles ne sont pas les pôles d'un axe unique continu, mais relèvent de deux dynamiques indépendantes : 1) Les facteurs d'hygiène ou d'ambiance (extrinsèques : salaire, conditions physiques, bruit, encadrement) réduisent l'insatisfaction (non-insatisfaction) sans générer d'engagement durable ; 2) Les facteurs moteurs ou de motivation (intrinsèques : responsabilité, contenu du travail, reconnaissance, accomplissement) sont les seuls capables de produire une satisfaction durable par l'enrichissement vertical des tâches.",
    motsClesObligatoires: [
      "deux dynamiques indépendantes",
      "facteurs d'hygiène (extrinsèques)",
      "facteurs moteurs (intrinsèques)",
      "non-insatisfaction",
      "enrichissement vertical des tâches",
    ],
    exemplePratique:
      "Supprimer le bruit gênant d'un open space élimine l'insatisfaction mais ne motive pas ; confier l'autonomie d'un projet client de bout en bout crée une motivation profonde.",
    piegeConfondreAvec:
      "Ne pas confondre 'élargissement horizontal' (ajouter plusieurs tâches parcellisées vides de sens) et 'enrichissement vertical' (accorder du pouvoir de décision et de contrôle).",
  },
  {
    id: "def-tache-redefinie-leplat",
    terme: "La Tâche Redéfinie / Remodelée",
    auteur: "Jacques Leplat (1980 / 1990)",
    modules: ["pst106"],
    definitionOfficielle:
      "Construction cognitive intime opérée par le travailleur face à la tâche prescrite par l'organisation. L'opérateur réinterprète, hiérarchise et s'approprie les buts et consignes en fonction de ses représentations mentales, de son niveau de compétences, de sa fatigue et de ses valeurs de métier avant d'engager son activité réelle.",
    motsClesObligatoires: [
      "tâche prescrite vs tâche redéfinie",
      "sujet cognitif traitant l'information",
      "représentations mentales",
      "appropriation des buts",
      "activité réelle",
    ],
    exemplePratique:
      "L'infirmière qui modifie mentalement l'ordre des visites prescrit par le logiciel hospitalier pour passer d'abord rassurer un patient en détresse respiratoire.",
    piegeConfondreAvec:
      "Ne pas confondre avec une faute ou une négligence : la tâche redéfinie est une exigence cognitive indispensable pour adapter une prescription abstraite aux contraintes du terrain.",
  },
  {
    id: "def-modele-5-carres-leplat",
    terme: "Le Modèle des 5 Carrés & la Double Régulation",
    auteur: "Jacques Leplat & Jean-Marie Hoc (1983)",
    modules: ["pst106"],
    definitionOfficielle:
      "Cadre canonique d'analyse ergonomique systémique reliant cinq dimensions : 1) Conditions externes de la tâche + 2) Conditions internes de l'opérateur couplées ensemble déterminent 3) L'Activité Réelle, produisant 4) Des Effets sur le système (performance, qualité) et 5) Des Effets sur la personne (santé, fatigue, TMS). L'ensemble est équilibré par une Double Régulation : interne (boucle orientée vers la préservation du sujet) et externe (boucle orientée vers la modification des exigences de la tâche).",
    motsClesObligatoires: [
      "conditions externes de la tâche",
      "conditions internes de l'opérateur",
      "activité réelle (nœud central)",
      "effets sur le système et sur la personne",
      "double régulation (interne vers le sujet, externe vers la tâche)",
    ],
    exemplePratique:
      "L'analyse d'un atelier d'usinage où l'opérateur compense la chaleur ambiante et la fatigue oculaire (régulation interne) et réclame la révision des gabarits usés (régulation externe).",
    piegeConfondreAvec:
      "Attention au dessin à l'examen : ne jamais oublier de tracer les deux boucles de rétroaction rétroagissant respectivement sur l'opérateur et sur la tâche.",
  },
  {
    id: "def-condition-sociale-le-guillant",
    terme: "Le Travail comme 'Condition Sociale'",
    auteur: "Louis Le Guillant (1956 / 2006)",
    modules: ["pst106"],
    definitionOfficielle:
      "Thèse épistémologique majeure de la psychopathologie du travail affirmant que le travail humain ne se réduit ni à une technique ni à un geste moteur, mais constitue une condition sociale historiquement située, insérée dans des rapports de pouvoir, d'autorité, de domination et de subordination qui pénètrent durablement l'appareil psychique et conditionnent la santé mentale des personnes.",
    motsClesObligatoires: [
      "condition sociale (vs simple tâche)",
      "rapports de domination et de pouvoir",
      "subordination et aliénation",
      "pénétration de la vie psychique hors travail",
      "névrose des téléphonistes / drame humain du travail",
    ],
    exemplePratique:
      "La névrose des standardistes répétant machinalement leurs phrases codées en décrochant à leur domicile privé, ou le massacre des sœurs Papin résultant de la servitude domestique.",
    piegeConfondreAvec:
      "Ne pas psychologiser ou individualiser la souffrance : la névrose professionnelle est l'expression symptomatique d'une condition sociale de travail pathogène.",
  },
  {
    id: "def-collectif-de-travail-cru",
    terme: "Le Collectif de Travail et les 3 Conditions de Damien Cru",
    auteur: "Damien Cru (1988 / 2014) & Yves Clot",
    modules: ["pst106", "pst120"],
    definitionOfficielle:
      "Entité psychosociale vivante et non décrétable, irréductible au simple travail collectif prescrit. Un collectif de travail existe dès lors que trois conditions cumulatives sont réunies : 1) L'existence de règles de métier débattues et partagées ; 2) La reconnaissance réciproque des compétences entre pairs ; 3) Une confiance mutuelle éprouvée permettant la suppléance et l'entraide face aux aléas et aux dangers.",
    motsClesObligatoires: [
      "Non décrétable",
      "Règles de métier",
      "Reconnaissance des compétences",
      "Confiance mutuelle",
      "Suppléance",
      "Opérateur de santé",
    ],
    exemplePratique:
      "L'équipe soignante qui organise informellement des transmissions croisées jour/nuit pour partager les signaux faibles des malades, ou les ouvriers du bâtiment régulant collectivement la prise de risque sur un échafaudage.",
    piegeConfondreAvec:
      "Ne jamais confondre avec le 'travail collectif' qui n'est que la division technique et hiérarchique formelle des tâches prescrite par l'organigramme de l'employeur.",
  },
  {
    id: "def-ressources-generiques-miossec-clot",
    terme: "Les Ressources Génériques (Transpersonnelles)",
    auteur: "Yvon Miossec & Yves Clot (2015)",
    modules: ["pst106"],
    definitionOfficielle:
      "Ensemble des règles vivantes non écrites, obligations et manières d'opérer sédimentées dans le 'genre professionnel' par ceux qui partagent le même métier. Constituant un 'stock générique' non formalisé, elles s'articulent dans l'activité avec les ressources impersonnelles (prescriptions officielles de l'organisation) et les ressources personnelles (style du sujet). Leur fonction protectrice majeure est d'intercaler des buts génériques évitant à chaque travailleur d'« errer tout seul face à l'étendue des bêtises possibles » (Darré, 1994).",
    motsClesObligatoires: [
      "ressources transpersonnelles / génériques",
      "genre professionnel",
      "stock générique non formalisé",
      "buts génériques intercalés",
      "éviter d'errer seul face aux bêtises (Darré)",
      "triade : impersonnel, générique, personnel",
    ],
    exemplePratique:
      "Les astuces corporelles et priorisations non écrites partagées entre infirmières pour trier les urgences nocturnes sans que le protocole informatique n'ait besoin de tout spécifier.",
    piegeConfondreAvec:
      "Ne pas confondre avec les référentiels de compétences écrits ou fiches de poste (ressources impersonnelles) : les ressources génériques ne sont jamais réductibles à un texte formalisé.",
  },
  {
    id: "def-dispute-professionnelle-clot-miossec",
    terme: "La Dispute Professionnelle sur le Travail Bien Fait",
    auteur: "Yves Clot & Yvon Miossec (2015)",
    modules: ["pst106"],
    definitionOfficielle:
      "Controverse délibérée et réglée entre pairs ('connaisseurs') portant sur les critères contradictoires de la qualité du travail. Parce que le travail réel est par nature définitivement discutable, la dispute professionnelle permet de dépasser les querelles de personnes pour instituer le conflit sur l'objet du travail (Clot & Gollac, 2014), forgeant le 'sentiment de vivre la même histoire'. Elle s'intériorise chez le sujet en dialogue intérieur ('diapason', 'clavier collectif') et permet au collectif d'instaurer une 'coopération conflictuelle' avec la hiérarchie pour faire descendre l'organisation au réel du travail.",
    motsClesObligatoires: [
      "qualité définitivement discutable",
      "dispute professionnelle entre connaisseurs",
      "conflit sur le travail vs querelles de personnes",
      "sentiment de vivre la même histoire",
      "clavier collectif et diapason",
      "coopération conflictuelle avec la hiérarchie",
    ],
    exemplePratique:
      "Le débat houleux mais constructif en salle de pause entre deux facteurs sur la façon d'ordonnancer la tournée pour servir dignement les personnes âgées tout en respectant l'horaire du centre de tri.",
    piegeConfondreAvec:
      "Ne pas confondre avec un conflit interpersonnel destructeur ou une fronde syndicale : la dispute professionnelle a pour objet strict la qualité de l'ouvrage et le travail soigné.",
  },
  {
    id: "def-elaboration-experience-vygotski-clot",
    terme: "L'Élaboration Réflexive de l'Expérience & les Dilemmes du Travail",
    auteur: "Lev Vygotski (2004) & Yves Clot (2008 / 2026)",
    modules: ["pst106"],
    definitionOfficielle:
      "Processus psychologique réflexif par lequel le sujet travailleur prend son expérience vécue comme 'objet pour faire d'autres expériences' (Vygotski). Face aux dilemmes du travail, où 'travailler = pouvoir arbitrer entre des prescriptions contradictoires et les ressources mobilisables pour agir', l'expérience devient le siège des contradictions vitales. L'élaboration réflexive engage un travail de subjectivisation permettant au travailleur de dénouer les contradictions et de se déprendre de ce qui ampute son pouvoir d'agir (activités contrariées, empêchées, suspendues).",
    motsClesObligatoires: [
      "expérience comme objet pour d'autres expériences (Vygotski)",
      "siège des contradictions vitales (Clot)",
      "arbitrage entre prescriptions contradictoires et ressources",
      "démarche réflexive",
      "travail de subjectivisation",
      "développement du pouvoir d'agir",
    ],
    exemplePratique:
      "Lors d'une autoconfrontation croisée, l'éducateur spécialisé qui revoit en vidéo son hésitation face à un adolescent en crise et comprend rétrospectivement comment transformer son geste pour les situations futures.",
    piegeConfondreAvec:
      "Ne pas réduire l'expérience à une accumulation d'ancienneté ou d'habitudes motrices : l'expérience ne devient ressource de développement que lorsqu'elle est élaborée par la pensée réflexive.",
  },
  {
    id: "def-activite-leontiev-3-niveaux",
    terme: "Les Trois Niveaux de l'Activité (Activité, Action, Opération)",
    auteur: "Alexeï Léontiev (1975) & Yves Clot",
    modules: ["pst106"],
    definitionOfficielle:
      "Modélisation hiérarchique emboîtée de l'agir humain reposant sur deux plans (matériel/concret et idéal/psychologique) : 1) L'Activité est le niveau le plus global, orienté par le Motif (le besoin social qui stimule le sujet) ; 2) L'Action est un processus subordonné à un But conscient (l'objectif intermédiaire représenté) ; 3) L'Opération est l'ajustement automatisé et sensorimoteur aux Conditions concrètes d'exécution et aux outils matériels disponibles.",
    motsClesObligatoires: [
      "deux plans : matériel et idéal",
      "Activité orientée par le motif (motive/besoin)",
      "Action orientée par le but conscient (goal)",
      "Opération orientée par les conditions matérielles (means)",
      "emboîtement dynamique",
    ],
    exemplePratique:
      "L'infirmière : son Activité est de soigner pour guérir (motif éthique/social), son Action est de refaire le pansement stérile d'un patient à 10h (but conscient), ses Opérations sont les micro-gestes de manipulation de la pince et de découpe des compresses (conditions physiques).",
    piegeConfondreAvec:
      "Ne pas confondre le 'but' de l'action avec le 'motif' de l'activité : une même action (nettoyer une plaie) peut servir des motifs radicalement différents (soulager le malade vs obéir passivement au chef).",
  },
  {
    id: "def-systeme-activite-engestrom",
    terme: "Le Système d'Activité Étendu (3e Génération)",
    auteur: "Yrjö Engeström (1987)",
    modules: ["pst106"],
    definitionOfficielle:
      "Modèle théorique systémique élargissant la médiation vygotskienne initiale (Sujet-Outil-Objet) à la dimension collective et institutionnelle du travail. Le système d'activité relie 6 pôles indissociables en interaction continue : le Sujet (l'opérateur ou groupe), les Outils (artefacts matériels et symboliques), l'Objet (la matière travaillée et la visée productive), les Règles (normes, protocoles, conventions), la Communauté (l'équipe, les pairs, les usagers) et la Division du travail (répartition hiérarchique et fonctionnelle des tâches).",
    motsClesObligatoires: [
      "système d'activité",
      "Sujet, Outils (matériels et symboliques), Objet (visée)",
      "Règles (protocoles, conventions)",
      "Communauté (pairs, usagers)",
      "Division du travail (hiérarchie, coopération)",
      "tensions et contradictions systémiques",
    ],
    exemplePratique:
      "L'analyse de l'activité soignante montrant la contradiction violente entre les Règles de rentabilité comptable (5 min par pansement) et les Outils/Protocoles de désinfection imposant 15 min de temps de contact aseptique.",
    piegeConfondreAvec:
      "Ne jamais réduire l'activité à une simple relation sujet-machine : l'activité est toujours médiatisée par les règles, la communauté et la division du travail.",
  },
  {
    id: "def-sante-normativite-canguilhem",
    terme: "La Santé comme Normativité & Pouvoir d'Agir",
    auteur: "Georges Canguilhem (1966) & Yves Clot",
    modules: ["pst106"],
    definitionOfficielle:
      "Conception clinique et philosophique révolutionnaire réfutant la santé comme une simple absence de maladie ou conformité à une norme statistique de laboratoire. La santé est 'normativité' : la capacité dynamique du sujet vivant à poser de nouvelles normes face aux épreuves, à tolérer les infidélités du milieu et à transformer activement son environnement. Se sentir en santé au travail, c'est se sentir 'plus que normal', c'est jouir du pouvoir d'agir sur son milieu. Dès lors que ce pouvoir d'agir est durablement confisqué par l'organisation, la maladie et la souffrance psychique s'installent.",
    motsClesObligatoires: [
      "normativité vs normalité statistique",
      "capacité d'instituer de nouvelles normes",
      "pouvoir de tomber malade et d'en guérir",
      "pouvoir d'agir sur son milieu",
      "pouvoir d'agir durablement confisqué",
      "du bien-être au bien-faire",
    ],
    exemplePratique:
      "L'ouvrier ou l'infirmière qui, face à un imprévu ou une panne d'approvisionnement, a la liberté de réajuster ses priorités et de créer une solution opératoire inédite reste en santé ; s'il est forcé d'appliquer aveuglément un protocole inadapté, il tombe malade.",
    piegeConfondreAvec:
      "Ne pas confondre 'normativité' (capacité créatrice d'instituer des normes) et 'normalisation' (soumission passive à des normes imposées de l'extérieur).",
  },
];

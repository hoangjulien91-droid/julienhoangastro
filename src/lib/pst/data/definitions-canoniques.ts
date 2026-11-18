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
  // --- SÉANCE 5 PST123 : POLYSÉMIE, CLINIQUE DES USAGES ET CLINIQUE DU TRAVAIL ---
  {
    id: "def-usage-de-soi-schwartz",
    terme: "L'Usage de Soi & le Débat de Normes",
    auteur: "Yves Schwartz (2000)",
    modules: ["pst123"],
    definitionOfficielle:
      "Concept central de l'ergologie selon lequel toute activité productive est une confrontation dramatique entre des normes antécédentes (prescriptions, lois, logiciels, valeurs imposées) et des renormalisations singulières opérées en situation par le sujet vivant. Travailler, c'est toujours faire 'usage de soi' (mobiliser son corps, son affectivité et son intelligence) pour arbitrer entre les exigences de l'organisation et ses propres réserves d'alternatives.",
    motsClesObligatoires: [
      "débat de normes",
      "usage de soi",
      "normes antécédentes",
      "renormalisation en situation",
      "réserves d'alternatives",
      "dramatique de l'usage de soi",
    ],
    exemplePratique:
      "Un technicien de maintenance qui réorganise l'ordre d'intervention prescrit par un progiciel pour tenir compte de la configuration réelle du terrain et de la fatigue de ses collègues.",
    piegeConfondreAvec:
      "Ne pas confondre avec une simple désobéissance ou transgression illégitime : la renormalisation est un acte nécessaire et intelligent pour permettre au travail réel d'aboutir.",
  },
  {
    id: "def-acceptation-situee-bobillier",
    terme: "L'Acceptation Située des Technologies",
    auteur: "Marc-Éric Bobillier-Chaumon (2021)",
    modules: ["pst123", "pst124"],
    definitionOfficielle:
      "Processus dynamique, continu et situé par lequel les salariés s'approprient réellement un artefact technologique (logiciel, IA, plateforme collaborative) dans le cours de leur activité concrète. Dépassant l'acceptabilité ergonomique mesurée a priori (modèle TAM), l'acceptation située évalue comment l'outil reconfigure les gestes de métier, les compétences, les identités professionnelles et les collectifs, tout en prenant en compte les paradoxes de dépossession et de technostress.",
    motsClesObligatoires: [
      "acceptation située vs acceptabilité a priori",
      "appropriation en contexte réel",
      "reconfiguration du métier",
      "reconfiguration des collectifs",
      "paradoxes technologiques",
      "former ne suffit pas",
    ],
    exemplePratique:
      "Face à l'implémentation d'un progiciel médical standardisé en hôpital, analyser comment les infirmières détournent les champs obligatoires ou créent des carnets parallèles pour préserver la qualité de la transmission soignante.",
    piegeConfondreAvec:
      "Ne jamais réduire l'adoption technologique à un simple problème d'ergonomie d'interface logicielle ou de formation technique de base ('former ne suffit pas, on n'évangélise pas une technologie').",
  },
  {
    id: "def-qualite-empeechee-clot",
    terme: "La Qualité Empêchée",
    auteur: "Yves Clot (2010)",
    modules: ["pst123", "pst106"],
    definitionOfficielle:
      "Origine cardinale de la souffrance éthique et psychique au travail en clinique de l'activité. Elle survient lorsque les contraintes managériales (cadences excessives, protocoles contradictoires, suppressions d'effectifs) interdisent aux opérateurs de réaliser un 'travail soigné et bien fait' conforme aux règles de l'art du genre professionnel. Le salarié est alors contraint de cautionner de la malfaçon, ce qui ampute son pouvoir d'agir et détruit son estime de soi.",
    motsClesObligatoires: [
      "travail bien fait",
      "règles de l'art",
      "travail ni fait ni à faire",
      "malfaçon imposée",
      "pouvoir d'agir confisqué",
      "souffrance éthique",
    ],
    exemplePratique:
      "Une soignante en EHPAD obligée d'expédier la toilette d'un résident vulnérable en 7 minutes sans pouvoir lui parler, rentrant chez elle rongée par la culpabilité professionnelle.",
    piegeConfondreAvec:
      "Ne pas confondre la qualité empêchée avec un simple manque de motivation individuelle : le blocage réside dans l'organisation du travail et le déni managérial du métier.",
  },
  {
    id: "def-activites-de-care-meda",
    terme: "Les Activités de Care & la Critique de la Valeur Travail",
    auteur: "Dominique Méda (1995 / 2010)",
    modules: ["pst123"],
    definitionOfficielle:
      "Thèse sociologique majeure remettant en cause l'hégémonie moderne du travail salarié comme seul étalon de l'utilité, du statut et de la citoyenneté. Dominique Méda démontre que la métrique marchande du PIB invisibilise les activités de care (soin des proches dépendants, éducation parentale, entraide civique, bénévolat) qui fondent pourtant le lien social. Elle plaide pour une société soutenable valorisant le temps libéré et la multi-activité humaine.",
    motsClesObligatoires: [
      "hégémonie de la valeur travail",
      "activités de care",
      "invisibilisation par le PIB",
      "soutenabilité sociale",
      "reconquête du temps libre",
      "promesse psychosociale",
    ],
    exemplePratique:
      "L'aidant familial qui consacre 25 heures hebdomadaires à accompagner un proche en perte d'autonomie : son activité, vitale pour la société, est ignorée par le système économique traditionnel car non monétarisée.",
    piegeConfondreAvec:
      "Ne pas assimiler cette critique à un éloge de l'oisiveté : il s'agit d'élargir la définition de la contribution sociale utile au-delà de l'emploi marchand.",
  },
  // --- SÉANCE 6 PST106 : CLINIQUE DU COLLECTIF, CATACHRÈSE & ATELIERS CLINIQUES ---
  {
    id: "def-catachrese-rabardel-clot",
    terme: "La Catachrèse Ergonomique",
    auteur: "Pierre Rabardel (1995) & Yves Clot (1999)",
    modules: ["pst106"],
    definitionOfficielle:
      "Détournement créatif et fonctionnel d'un instrument, d'un outil technique ou d'un dispositif institutionnel hors de ses fonctions canoniques prescrites par l'organisation, opéré par le travailleur pour faire face aux impasses, résistances et imprévus de l'activité réelle. Loin d'être une négligence ou une faute, la catachrèse est un acte d'intelligence opératoire marquant la genèse instrumentale où l'artefact devient un instrument véritablement émancipateur au service du métier.",
    motsClesObligatoires: [
      "détournement d'instrument",
      "fonctions canoniques vs réelles",
      "genèse instrumentale",
      "résistance du réel",
      "intelligence opératoire",
      "maintien en emploi",
    ],
    exemplePratique:
      "Une professionnelle du maintien en emploi qui utilise une 'aide à la recherche de solutions' pour financer un aménagement ergonomique chez une assistante maternelle handicapée non couverte par un médecin du travail.",
    piegeConfondreAvec:
      "Ne jamais qualifier la catachrèse de faute, de négligence ou de fraude déontologique : c'est une création vitale pour combler les failles du travail prescrit.",
  },
  {
    id: "def-collectif-crise-roussan",
    terme: "Le Collectif de Crise vs Collectif de Travail Pérenne",
    auteur: "Mme Jessica Roussan (2026) & Damien Cru (1988)",
    modules: ["pst106"],
    definitionOfficielle:
      "Distinction clinique fondamentale entre une mobilisation collective d'urgence et un véritable collectif de travail. Le collectif de crise (ou collectif pompier) est une régulation éphémère fondée sur l'héroïsme compassionnel, le sacrifice de soi et la dégradation silencieuse des règles de l'art pour surmonter une pénurie d'effectif ponctuelle. Sans organisation pérenne ni espaces d'APP pour délibérer sur le travail bien fait, ce mode opératoire masque les défaillances systémiques et mène inéluctablement à l'épuisement professionnel.",
    motsClesObligatoires: [
      "collectif de crise éphémère",
      "collectif pompier",
      "héroïsme compassionnel",
      "solidarité compassionnelle vs coopération de métier",
      "espaces d'APP",
      "délibération sur le travail bien fait",
    ],
    exemplePratique:
      "Une équipe de crèche municipale en sous-effectif critique (5 pour 3 sections) qui réussit à 'tenir la journée' en décalant les repas et en annulant les temps de transmission : héroïque à court terme mais destructeur à moyen terme.",
    piegeConfondreAvec:
      "Croire qu'une équipe capable de faire face à une urgence extrême prouve la santé de son collectif de travail : l'urgence permanente épuise et détruit le collectif de métier.",
  },
  {
    id: "def-derive-coaching-roussan",
    terme: "La Dérive du Coaching Individualisant en Milieu de Travail",
    auteur: "Mme Jessica Roussan (2026) & Vincent de Gaulejac",
    modules: ["pst106"],
    definitionOfficielle:
      "Pratique managériale néolibérale consistant à psychologiser la souffrance au travail en renvoyant à l'individu la responsabilité de son stress et de sa survie ('soyez auteur de votre vie et pas seulement acteur') face à des pathologies structurelles de l'organisation (flux tendu à 99 %, concurrence interne acharnée, manque de moyens). La clinique de l'activité réfute catégoriquement cette individualisation culpabilisante et exige de ramener l'intervention sur la transformation de l'organisation et la controverse sur le travail réel.",
    motsClesObligatoires: [
      "dérive du coaching",
      "psychologisation de la souffrance",
      "culpabilisation de l'individu",
      "pathologie de l'organisation",
      "flux tendu destructeur",
      "controverse de métier vs développement personnel",
    ],
    exemplePratique:
      "La direction d'une centrale logistique (Carrefour) qui fait appel à un coach de développement personnel pour apprendre la 'résilience' à des approvisionneurs soumis à une concurrence féroce et à des objectifs intenables.",
    piegeConfondreAvec:
      "Ne pas confondre l'accompagnement clinique du travail (qui analyse le système organisationnel) avec le coaching de performance ou les ateliers de bien-être qui déplacent le problème sur la psychologie individuelle.",
  },
  // --- SÉANCE 4 PST108 : ETHNOMÉTHODOLOGIE, INJUSTICES & MÉPRIS INCARNÉ ---
  {
    id: "def-allants-de-soi-garfinkel",
    terme: "Les Allants de Soi (Taken-for-Granted) & l'Ethnométhodologie",
    auteur: "Harold Garfinkel (1967)",
    modules: ["pst108"],
    definitionOfficielle:
      "Concept fondateur de l'ethnométhodologie désignant l'ensemble des savoirs de sens commun, codes tacites et évidences partagées incorporées par les membres d'une communauté, permettant l'intercompréhension immédiate à demi-mot. Le langage étant structurellement incomplet, les allants de soi évitent d'expliciter chaque prémisse logique et assurent la fluidité de 99 % des interactions quotidiennes et professionnelles. Leur suspension volontaire par des 'expériences de brèche' (breaching experiments) dévoile instantanément la fragilité de la confiance ontologique qui soutient l'ordre social.",
    motsClesObligatoires: [
      "allants de soi",
      "taken-for-granted",
      "savoirs de sens commun",
      "incomplétude du langage",
      "expériences de brèche",
      "breaching experiments",
      "confiance ontologique",
    ],
    exemplePratique:
      "Répondre à un collègue qui lance distraitement 'Tu vas bien ?' en lui demandant froidement ce qu'il entend par 'bien' : la brèche dans la routine provoque instantanément un profond malaise relationnel.",
    piegeConfondreAvec:
      "Ne pas assimiler l'incomplétude du langage à une lacune ou un manque de rigueur : c'est un mécanisme d'économie cognitive indispensable à la coopération.",
  },
  {
    id: "def-triade-injustice-dubet",
    terme: "La Triade des Sentiments d'Injustice : Égalité, Mérite, Autonomie",
    auteur: "François Dubet (2006)",
    modules: ["pst108"],
    definitionOfficielle:
      "Modélisation sociologique princeps démontrant que le sentiment d'injustice au travail naît de l'arbitrage permanent et douloureux entre trois principes moraux universels, tous désirables mais mutuellement contradictoires : 1) L'Égalité (même dignité fondamentale sans distinction de rang hiérarchique) ; 2) Le Mérite (rétribution proportionnelle à l'engagement singulier et au travail réel invisible) ; 3) L'Autonomie (liberté de méthode et maîtrise de son activité face au micro-management). L'expérience du travail est tragique car satisfaire un principe heurte inévitablement les deux autres.",
    motsClesObligatoires: [
      "triade de la justice",
      "injustices vécues vs objectives",
      "principe d'égalité",
      "principe de mérite",
      "principe d'autonomie",
      "tension tragique et irréductible",
      "histoires sans paroles",
    ],
    exemplePratique:
      "Attribuer une prime individuelle au mérite à un salarié qui s'est surpassé satisfait le mérite, mais provoque immédiatement un violent sentiment d'injustice chez ses pairs au nom de l'égalité collective.",
    piegeConfondreAvec:
      "Ne jamais penser qu'une organisation managériale idéale pourrait harmoniser parfaitement ces trois principes : ils sont par nature hétérogènes et conflictuels.",
  },
  {
    id: "def-asynchronie-interlocutoire-valls",
    terme: "L'Asynchronie Interlocutoire en Situation Critique",
    auteur: "M. Francis Valls & Harold Garfinkel",
    modules: ["pst108"],
    definitionOfficielle:
      "Phénomène conversationnel d'engrenage et de grippage mécanique de l'interaction survenant lors d'un décalage structurel de temporalités et d'attentes entre locuteurs dans une situation à fort enjeu (ex. régulation d'urgence SAMU, accueil d'usager précaire). L'incompréhension mutuelle ne provient pas d'une animosité psychologique ou d'une mauvaise foi individuelle, mais d'une désynchronisation des allants de soi où chaque tentative de cadrage professionnel est interprétée par l'autre comme un refus d'aide ou une agression.",
    motsClesObligatoires: [
      "asynchronie interlocutoire",
      "grippage mécanique de la parole",
      "décalage de temporalités",
      "service d'urgence vs qualification",
      "escalade symétrique",
      "absence de mauvaise foi individuelle",
    ],
    exemplePratique:
      "Au SAMU, l'appelant affolé qui exige un secours immédiat comme pour un taxi et vit chaque question médicale de l'opératrice comme une perte de temps criminelle, faisant dériver l'échange vers l'insulte.",
    piegeConfondreAvec:
      "Ne pas psychologiser l'échec en le réduisant à une agressivité caractérielle : la faille est inscrite dans la dynamique séquentielle des tours de parole.",
  },
  {
    id: "def-force-illocutoire-succes-satisfaction-vanderveken",
    terme: "Force Illocutoire F(P) et Succès vs Satisfaction",
    auteur: "Daniel Vanderveken (1992) & John R. Searle",
    modules: ["pst108"],
    definitionOfficielle:
      "Formalisation logique de l'unité minimale de communication sous l'écriture F(P), où P est le contenu propositionnel et F la force illocutoire décomposée en 6 composantes (but illocutoire, mode d'accomplissement, conditions sur le contenu propositionnel, conditions préalables, conditions de sincérité, degré de puissance). Vanderveken distingue rigoureusement le 'succès illocutoire' (l'acte est valablement accompli et compris dans l'interaction) et la 'satisfaction' (le contenu propositionnel P est rendu vrai dans le monde selon sa direction d'ajustement).",
    motsClesObligatoires: [
      "force illocutoire F(P)",
      "succès illocutoire",
      "conditions de satisfaction",
      "direction d'ajustement",
      "6 composantes universelles",
    ],
    exemplePratique:
      "Un ordre managériel est réussi dès qu'il est compris par l'équipe, mais il n'est satisfait que lorsque le livrable attendu est effectivement produit et conforme dans la réalité matérielle.",
    piegeConfondreAvec:
      "Confondre le succès communicatif (l'autre a compris ce que je lui demande) avec la satisfaction (l'action a été réalisée dans le monde).",
  },
  {
    id: "def-performatif-pouvoir-cassin",
    terme: "Le Performatif Instituant et la Vérité comme Événement",
    auteur: "Barbara Cassin (2018) & John L. Austin",
    modules: ["pst108"],
    definitionOfficielle:
      "Conception philosophique et rhétorique du langage où l'énoncé performatif ne décrit pas un monde préexistant mais le fait advenir par l'événement même de sa profération. Dépassant le modèle aristotélicien de la vérité comme adéquation (adaequatio), Cassin montre que le performatif fabrique la réalité politique et sociale, ce qu'illustre la Commission Vérité et Réconciliation en Afrique du Sud où la prise de parole publique a fait exister une réconciliation nationale.",
    motsClesObligatoires: [
      "performatif instituant",
      "vérité comme événement",
      "dépassement de l'adaequatio",
      "Commission Vérité et Réconciliation",
      "pouvoir des mots",
    ],
    exemplePratique:
      "La promulgation par un directeur d'un accord d'entreprise sur la qualité de vie au travail : l'énoncé crée un nouveau statut juridique et transforme immédiatement les obligations réciproques.",
    piegeConfondreAvec:
      "Ne pas assimiler le performatif à une fiction mensongère : la vérité performative est une praxis politique hautement opératoire qui engage le réel.",
  },
  {
    id: "def-marche-linguistique-habitus-bourdieu",
    terme: "Marché Linguistique et Habitus de Classe",
    auteur: "Pierre Bourdieu (1982)",
    modules: ["pst108", "pst123"],
    definitionOfficielle:
      "Théorie sociologique montrant que la communication n'est jamais un échange d'informations entre locuteurs égaux, mais une transaction sur un marché linguistique où chaque énoncé tire son prix du capital linguistique et social de son auteur. L'autorité réside hors de la langue, dans l'institution sociale qui délègue au locuteur son mandat. Les dominés intériorisent la supériorité de la langue légitime par la violence symbolique, produisant une censure préalable.",
    motsClesObligatoires: [
      "marché linguistique",
      "habitus linguistique",
      "capital symbolique",
      "violence symbolique",
      "censure structurale",
      "mandat institutionnel",
    ],
    exemplePratique:
      "Le silence intimidé d'un agent de maîtrise d'atelier lors d'un comité de direction, inhibé par la crainte d'un faux pas grammatical face au lexique feutré des cadres dirigeants.",
    piegeConfondreAvec:
      "Croire que le charisme ou l'éloquence sont des dons naturels : pour Bourdieu, ils sont le produit de l'incorporation précoce du capital culturel de classe.",
  },
  {
    id: "def-agir-communicationnel-triade-reconnaissance",
    terme: "L'Agir Communicationnel et la Triade de la Reconnaissance",
    auteur: "Jürgen Habermas (1981) & Axel Honneth (1992)",
    modules: ["pst108", "pst123"],
    definitionOfficielle:
      "Articulation théorique majeure entre la délibération démocratique et la clinique du sujet au travail. Habermas définit l'agir communicationnel comme la recherche d'une entente mutuelle (Verständigung) ancrée dans le monde vécu (Lebenswelt) et régie par des prétentions à la validité. Honneth prolonge cette éthique vers les trois sphères de reconnaissance indispensables à l'intégrité morale : affective (amour/confiance en soi), juridique (droits/respect de soi) et sociale (solidarité/estime de soi), dont le déni engendre les pathologies du travail.",
    motsClesObligatoires: [
      "agir communicationnel",
      "monde vécu (Lebenswelt)",
      "entente (Verständigung)",
      "triade de la reconnaissance",
      "confiance, respect, estime de soi",
      "mépris social",
    ],
    exemplePratique:
      "L'institution dans un service hospitalier d'espaces de délibération réglée où les soignants débattent du travail bien fait, restaurant la reconnaissance de leur expertise clinique.",
    piegeConfondreAvec:
      "Confondre l'entente avec un compromis opportuniste de gestion : l'entente suppose la sincérité réciproque et le renoncement à l'agir stratégique unilatéral.",
  },
  {
    id: "def-dramaturgie-distance-role-goffman",
    terme: "La Dramaturgie Sociale, les Coulisses et la Distance au Rôle",
    auteur: "Erving Goffman (1959 / 1961) & Francis Valls",
    modules: ["pst108", "pst123"],
    definitionOfficielle:
      "Modèle micro-sociologique (La Mise en scène de la vie quotidienne, 1959) analysant l'ordre des interactions à travers la métaphore théâtrale. Contre la conception fonctionnaliste figée du rôle, Goffman définit le rôle comme un 'système d'action situé', plastique et mouvant (persona = masque). L'action s'articule entre la Scène (frontstage, où l'on contrôle les impressions devant un public et des témoins non ratifiés), les Coulisses (backstage, où l'équipe prépare la stratégie et évacue la tension par l'humour ou la moquerie), et la Distance au rôle : cet écart ironique ('ni trop, ni trop peu') entre le moi officiel et le moi personnel qui évite l'enfermement sans briser le lien.",
    motsClesObligatoires: [
      "scène (frontstage) vs coulisses (backstage)",
      "système d'action situé",
      "persona (masque)",
      "contrôle des impressions",
      "distance au rôle (ni trop, ni trop peu)",
      "témoins non ratifiés (public)",
    ],
    exemplePratique:
      "Au bloc opératoire (prés. Yves Winkin), lorsque l'assistant coupe par erreur le doigt du chirurgien en chef d'un coup de scalpel électrique, le chirurgien ne crie pas mais mobilise la distance au rôle par l'humour ('Si j'attrape la syphilis, je saurai d'où ça vient et j'aurai des témoins !') afin de ne pas ruiner la coopération indispensable de l'équipe.",
    piegeConfondreAvec:
      "Ne jamais croire que jouer un rôle ou utiliser des coulisses chez Goffman signifie être hypocrite ou menteur : il n'existe aucun rôle 'plus vrai' qu'un autre.",
  },
  {
    id: "def-face-figuration-stigmate-goffman",
    terme: "La Face, la Figuration (Face-Work) et le Stigmate comme Point de Vue",
    auteur: "Erving Goffman (1963 / 1967) & Vladimir Jankélévitch",
    modules: ["pst108", "pst123"],
    definitionOfficielle:
      "Dans Les Rites d'interaction (1967), la 'face' est la valeur sociale positive qu'un acteur revendique dans le regard d'autrui (en écho à Jankélévitch : 'Mon visage, je le vois dans votre regard'). La figuration (face-work) désigne le double travail permanent d'équilibriste consistant à 'sauver sa propre face tout en préservant la face d'autrui' ('les deux ou rien'). Dans Stigmate (1963), Goffman montre que le handicap dans l'interaction n'est pas un attribut individuel mais un rapport de regard lors des contacts mixtes : 'Le normal et le stigmatisé ne sont pas des personnes, mais des points de vue.'",
    motsClesObligatoires: [
      "face (valeur sociale positive)",
      "figuration (face-work)",
      "sauver sa face tout en préservant celle de l'autre",
      "indifférence civique (civil inattention)",
      "stigmate comme relation (et non attribut)",
      "points de vue (contacts mixtes)",
    ],
    exemplePratique:
      "Rue Sainte-Catherine à Bordeaux, un passant à qui une femme en fauteuil roulant (post-AVC) demande son chemin détourne son regard d'elle pour répondre à son accompagnateur 'supposé normal' ; la personne handicapée rétablit sa face par l'humour : 'Tiens alors, je suis la femme invisible !'.",
    piegeConfondreAvec:
      "Ne pas réduire 'sauver la face' à un acte agressif d'écrasement d'autrui, et ne pas traiter le stigmate comme une déficience purement médicale.",
  },
  {
    id: "def-consubstantialite-rupture-continuite-dubar-sainsaulieu",
    terme: "La Consubstantialité Identitaire, les Catégories Légitimes & le Couple Rupture / Continuité",
    auteur: "Claude Dubar (1991 / 5e éd.), Renaud Sainsaulieu (1977) & Éric Lucy",
    modules: ["pst123"],
    definitionOfficielle:
      "Architecture sociologique et clinique de l'identité au travail démontrant que l'identité sociale et l'identité professionnelle sont consubstantielles. L'identité se construit comme une narration langagière à la croisée du processus biographique ('identité pour soi', narration de soi par soi) et du processus relationnel ('identité pour autrui', narration de soi par les autres inscrite dans des 'catégories légitimes' instituées : fiches de poste, diplômes, KPI, Qualiopi). Là où Renaud Sainsaulieu (L'Identité au travail, 1977) montre le passage de l'acteur de masse à l'acteur stratège à travers la socialisation secondaire en entreprise, l'accompagnement des transitions professionnelles (Dubar, Kaës & Anzieu, Loi VAE 2002) repose sur le couple dialectique Rupture / Continuité : la tabula rasa ('table rase') n'existe pas, toute bifurcation exigeant de tisser de la continuité subjective avec l'expérience antérieure.",
    motsClesObligatoires: [
      "consubstantialité identité sociale / professionnelle",
      "narration de soi par soi vs par autrui",
      "catégories légitimes instituées",
      "socialisation secondaire (Sainsaulieu)",
      "couple rupture / continuité",
      "impossibilité de la tabula rasa",
    ],
    exemplePratique:
      "Dans le cas clinique de Paul (Lise Lemay), ingénieur quadragénaire plongé en dépression après une réorganisation et un divorce, ou lors d'un bilan de compétences avec un salarié affirmant vouloir 'tout effacer et repartir de zéro', le psychologue du travail refuse l'illusion de la table rase et restaure le fil conducteur des compétences et des valeurs héritées.",
    piegeConfondreAvec:
      "Ne jamais séparer hermétiquement la vie privée (identité sociale) de la sphère professionnelle, et ne jamais croire que l'autorité a disparu dans les organisations modernes (elle s'est déplacée dans le travail prescrit, les fiches de poste et les indicateurs chiffrés).",
  },
  {
    id: "def-psychosociologie-communication-abric-marot",
    terme: "Psychosociologie de la Communication (Abric) & 4 Défenses Individuelles",
    auteur: "Jean-Claude Abric (1999), Anzieu & Martin, Kurt Lewin & Véronique Marot",
    modules: ["pst108"],
    definitionOfficielle:
      "Dépassant les schémas télégraphiques linéaires (Shannon & Weaver : émetteur → codage → canal + bruit → décodage → récepteur, complétés par le feedback de Wiener), l'approche psychosociologique définit la communication comme un ensemble de processus sociaux par lesquels s'échangent des informations dans une situation sociale donnée. Il n'y a pas émetteur/récepteur mais deux locuteurs engagés dans une interaction pluricanale (codes vestimentaires, vocabulaire, posture/techniques du corps de Mauss, silence) d'influence réciproque. Sur le plan psychologique (Lewin), forces positives (approche) et négatives (évitement) modulent les tensions, tandis qu'une information menaçante déclenche 4 défenses : scotomisation (blackout totalement non conscient), mémorisation sélective (tri plus conscient épargnant l'énergie), interprétation défensive et négation de l'autorité de la source.",
    motsClesObligatoires: [
      "deux locuteurs en interaction réciproque",
      "acte social pluricanal (Mauss)",
      "on ne peut pas ne pas communiquer",
      "approche vs évitement (Lewin)",
      "scotomisation vs mémorisation sélective",
      "interprétation défensive & négation de la source",
    ],
    exemplePratique:
      "Un salarié convoqué en entretien disciplinaire persuadé au sortir du bureau qu'il n'a reçu qu'un simple rappel à l'ordre avant de recevoir sa lettre de mise à pied deux jours plus tard (interprétation défensive) ; ou un intervenant arrivant en baskets vs codes du ministère de l'Intérieur.",
    piegeConfondreAvec:
      "Ne jamais utiliser le lexique 'émetteur / récepteur' dans une analyse psychosociologique d'Abric, et ne pas confondre les 4 mécanismes de défense individuels avec les stratégies collectives de défense (Dejours).",
  },
  {
    id: "def-representations-razran-moi-intime-marot",
    terme: "Système de Représentations (Moscovici, Razran 1950), Moi Intime / Extimité & Rigidité de Rôle",
    auteur: "Serge Moscovici (1961), Gregory Razran (1950), Erving Goffman & Véronique Marot",
    modules: ["pst108", "pst123"],
    definitionOfficielle:
      "Pour Serge Moscovici (1961), une représentation sociale est un ensemble organisé d'informations, de croyances, d'attitudes et d'opinions reconstituant le réel : dans l'activité humaine, on ne réagit jamais à une réalité objective brute, mais à ce qu'elle représente. L'expérience princeps de Gregory Razran (1950) en 4 temps (soumission scientifique T1, consistance T2, maintien à 3 mois T3, puis bascule biaisée à T4 sur les mêmes visages dès l'ajout de patronymes Lévy, Bettini, McLane) démontre la fonction anticipatrice des stéréotypes. La représentation de soi oppose le Moi intime (image privée, syndrome d'imposture) au Moi public, avec la zone d'extimité permettant d'exposer délibérément une part de l'intime à visée réparatrice ; enfin, la rigidité de rôle consiste à importer dans un nouveau contexte les réflexes hiérarchiques d'un statut antérieur.",
    motsClesObligatoires: [
      "on ne réagit pas à la réalité mais à ce qu'elle représente",
      "mot-valise « respect » (ne pas acheter)",
      "protocole de Razran (1950) en 4 temps",
      "moi intime vs moi public & extimité",
      "conflit vs rigidité de rôle",
      "fonction anticipatrice des stéréotypes",
    ],
    exemplePratique:
      "La dirigeante descendant en hôtel 5 étoiles mais emportant les petits pots de confiture par 'habitudes de pauvre' (tension moi intime / moi public) ; Mme Marot tutoyée en EPI sur plancher machine puis vouvoyée sans casque ; ou l'ancien CEO de 70 ans imposant sa posture de chef et une division genrée des tâches dans une association bénévole (rigidité de rôle).",
    piegeConfondreAvec:
      "Ne pas acheter au sens littéral un mot-valise comme 'respect', et distinguer le conflit de rôle (tensions simultanées) de la rigidité de rôle (persistance anachronique d'un ancien statut).",
  },
  {
    id: "def-demise-verite-cassin-lucy",
    terme: "Démise de la Vérité & Déclaratif Sacramentaire (Barbara Cassin)",
    auteur: "Barbara Cassin (Quand dire, c'est vraiment faire), Ernst Kantorowicz & Éric Lucy",
    modules: ["pst108"],
    definitionOfficielle:
      "En écho à la notion juridique de « démise » dans Les Deux Corps du roi d'Ernst Kantorowicz (sortie du statut royal), Barbara Cassin montre que le discours performatif opère une « démise de la vérité » : il destitue le critère binaire du vrai et du faux propre au constatif pour imposer le régime de la validité et de l'efficacité perlocutoire (faire faire, rassembler, provoquer). Hérité du sacré (le « fiat lux » biblique), le déclaratif sacramentaire requiert une mise en scène rituelle (obsequium) sans laquelle l'acte échoue politiquement ou institutionnellement.",
    motsClesObligatoires: [
      "démise de la vérité (Kantorowicz)",
      "valide / satisfait vs vrai / faux",
      "déclaratif sacramentaire (fiat lux)",
      "obsequium & rituel d'énonciation",
      "capacité à juger et rhétorique sophistique",
    ],
    exemplePratique:
      "La mécanique politique des fake news (ex. Trump ou Hanouna : « ce n'est pas un vrai chiffre, mais ça veut dire quelque chose de vrai »), l'échec d'une candidature improvisée sur les réseaux sociaux faute d'obsequium par contraste avec la théâtralisation de François Mitterrand au 20h, ou une alerte managériale exagérée (« +15 % de retards ») destinée à culpabiliser l'équipe.",
    piegeConfondreAvec:
      "Ne pas réduire le sophiste à un pur imposteur : chez Cassin, le sophiste raisonne et oblige l'auditoire à exercer sa capacité de jugement ; et ne pas évaluer un acte déclaratif comme une simple erreur logique.",
  },
  {
    id: "def-quatre-actes-habermas-habitus-bourdieu",
    terme: "Les 4 Actes d'Habermas, la Reconnaissance d'Honneth & l'Équation du Marché Linguistique (Bourdieu)",
    auteur: "Jürgen Habermas, Axel Honneth, Pierre Bourdieu & Éric Lucy",
    modules: ["pst108"],
    definitionOfficielle:
      "Dans le prolongement des actes de langage, trois grilles macro-philosophiques éclairent la clinique du dialogue au travail : (1) Habermas décompose la construction du monde commun démocratique à travers 4 dimensions d'actes : stratégique (anticiper attentes et places), normatif (respecter tours de parole et règles), dramatique (exposer sa subjectivité) et téléologique (visée existentielle entre début et fin) ; (2) Axel Honneth renverse Habermas en posant que l'humain cherche d'abord la reconnaissance sociale (sociale, juridique, affective) contre « l'invisibilité effective » ; (3) Pierre Bourdieu formalise l'inégale valeur des discours sur le marché linguistique par l'équation (Disposition + Capital) × Champ = Habitus, complétée par l'illusio (adhésion aux règles du jeu), l'obsequium et la délégation institutionnelle.",
    motsClesObligatoires: [
      "4 actes : stratégique, normatif, dramatique, téléologique",
      "reconnaissance sociale vs invisibilité effective (Honneth)",
      "(Disposition + Capital) × Champ = Habitus",
      "marché linguistique & distinction",
      "illusio, obsequium & délégation institutionnelle",
    ],
    exemplePratique:
      "Le parler fort paysan du Béarn constitue un capital reconnu dans le champ rural, alors qu'un lexique savant distingue un médecin mais disqualifie un ouvrier sur un chantier ; de même, un subalterne répondant « oui, je peux » à une demande implicite de chauffage sans bouger neutralise la hiérarchie dans le champ.",
    piegeConfondreAvec:
      "Ne pas confondre l'acte téléologique (finalité existentielle) avec l'acte stratégique (calcul de situation) chez Habermas, ni séparer l'habitus linguistique du champ qui seul confère une valeur de capital à une disposition de parole.",
  },
];

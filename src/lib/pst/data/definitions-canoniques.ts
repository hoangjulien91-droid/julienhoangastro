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
    motsClesObligatoires: ["dispositions durables et transposables", "structures structurées", "structures structurantes", "social incorporé"],
    exemplePratique: "Le sentiment spontané d'illégitimité ou d'aisance d'un salarié selon son milieu social d'origine lors d'un entretien d'évaluation.",
    piegeConfondreAvec: "Ne pas confondre avec une 'habitude' mécanique : l'habitus est inventif et s'adapte aux situations nouvelles.",
  },
  {
    id: "def-marche-linguistique",
    terme: "Le Marché Linguistique",
    auteur: "Pierre Bourdieu (1982)",
    modules: ["pst108"],
    definitionOfficielle:
      "Système de rapports de forces symboliques au sein duquel les productions verbales s'échangent et sont évaluées à des prix inégaux selon la conformité des locuteurs à la langue dominante et légitime, conférant ainsi un profit de distinction symbolique aux dominants.",
    motsClesObligatoires: ["rapports de forces symboliques", "langue dominante et légitime", "profit de distinction", "capital linguistique"],
    exemplePratique: "La valorisation spontanée du jargon managérial anglo-saxon en réunion de direction au détriment du vocabulaire technique d'atelier.",
    piegeConfondreAvec: "Ne pas confondre avec un simple échange d'informations télégraphique (Shannon & Weaver).",
  },
  {
    id: "def-status-est-magistratus",
    terme: "Status est magistratus",
    auteur: "Pierre Bourdieu (1982)",
    modules: ["pst108"],
    definitionOfficielle:
      "Maxime juridique fondant la critique de l'illusion internaliste d'Austin : le pouvoir d'un discours n'appartient pas aux mots eux-mêmes, mais découle de l'autorité statutaire et institutionnelle déléguée à celui qui les prononce en tant que porte-parole autorisé.",
    motsClesObligatoires: ["illusion internaliste", "autorité statutaire", "délégation institutionnelle", "porte-parole autorisé"],
    exemplePratique: "L'injonction « je déclare l'embauche » qui ne crée de droits que parce qu'elle émane d'une personne ayant reçu délégation de signature.",
  },
  {
    id: "def-violence-symbolique",
    terme: "La Violence Symbolique",
    auteur: "Pierre Bourdieu (1970, 1996)",
    modules: ["pst108", "pst123"],
    definitionOfficielle:
      "Forme de domination douce, insensible et invisible à ses victimes mêmes, qui s'exerce par les voies de la communication et de la connaissance, lorsque les dominés appliquent aux rapports de domination des schèmes de perception et de pensée issus de l'intériorisation de l'ordre établi.",
    motsClesObligatoires: ["domination douce et invisible", "consentement inconscient", "schèmes intériorisés", "adhésion aux critères des dominants"],
    exemplePratique: "Un employé qui s'auto-censure pour une promotion en se disant « ce n'est pas pour moi », validant lui-même sa propre disqualification.",
  },
  {
    id: "def-double-verite",
    terme: "La Double Vérité du Travail",
    auteur: "Pierre Bourdieu (1996)",
    modules: ["pst108", "pst123"],
    definitionOfficielle:
      "Dualité constitutive de l'activité salariale : la vérité objective de l'exploitation économique (appropriation de la force de travail) est masquée et rendue supportable par la vérité subjective de l'investissement passionné, du sens de l'honneur et de la fierté du geste professionnel (l'illusio).",
    motsClesObligatoires: ["vérité objective d'exploitation", "vérité subjective", "illusio", "honneur du métier"],
    exemplePratique: "L'infirmière ou l'artisan qui fait des heures supplémentaires non payées par amour du travail bien fait, alimentant la rentabilité patronale.",
  },

  // --- HABERMAS ---
  {
    id: "def-agir-communicationnel",
    terme: "L'Agir Communicationnel",
    auteur: "Jürgen Habermas (1981)",
    modules: ["pst108"],
    definitionOfficielle:
      "Mode de coordination de l'action sociale orienté vers l'entente intersubjective et l'intercompréhension (Verständigung), où les participants s'accordent sur la validité de leurs prétentions par l'usage argumentatif de la raison et le refus de toute contrainte extérieure.",
    motsClesObligatoires: ["entente / Verständigung", "intercompréhension", "prétentions à la validité", "argumentation rationnelle"],
    exemplePratique: "Une délibération d'équipe soignante où le médecin et l'aide-soignante s'accordent sur la meilleure prise en charge d'un patient.",
    piegeConfondreAvec: "Ne pas confondre avec l'agir stratégique : l'agir stratégique vise le succès et utilise les autres comme moyens.",
  },
  {
    id: "def-pretentions-validite",
    terme: "Les 4 Prétentions universelles à la validité",
    auteur: "Jürgen Habermas (1981)",
    modules: ["pst108"],
    definitionOfficielle:
      "Les quatre engagements implicites et simultanés de tout acte de parole orienté vers l'entente : 1) Intelligibilité de l'énoncé (grammaire/sens) ; 2) Vérité de la proposition (faits objectifs) ; 3) Justesse normative (légitimité sociale) ; 4) Sincérité du locuteur (authenticité subjective).",
    motsClesObligatoires: ["intelligibilité", "vérité propositionnelle", "justesse normative", "sincérité / véracité"],
    exemplePratique: "Contester un ordre managérial sur sa justesse normative (« ce n'est pas conforme au code du travail ») ou sa vérité (« les chiffres sont faux »).",
  },
  {
    id: "def-ethique-discussion",
    terme: "L'Éthique de la Discussion (Diskursethik)",
    auteur: "Jürgen Habermas (1983)",
    modules: ["pst108"],
    definitionOfficielle:
      "Théorie morale et procédurale énonçant le Principe D : seules sont valides les normes d'action susceptibles de recevoir l'assentiment de tous les partenaires concernés en tant que participants à une discussion pratique libre et argumentée (situation idéale de parole).",
    motsClesObligatoires: ["Principe D", "tous les concernés", "discussion pratique", "situation idéale de parole", "force du meilleur argument"],
    exemplePratique: "La co-construction d'une charte de télétravail validée à l'unanimité après controverse ouverte entre salariés et direction.",
  },

  // --- HONNETH ---
  {
    id: "def-trois-spheres-honneth",
    terme: "Les 3 Sphères de la Reconnaissance",
    auteur: "Axel Honneth (1992)",
    modules: ["pst108", "pst123"],
    definitionOfficielle:
      "Matrice morale articulant les trois dimensions de l'inter-reconnaissance nécessaires à un rapport positif à soi : 1) Sphère affective/amour ➔ Confiance en soi (corps/besoins) ; 2) Sphère juridique/droit ➔ Respect de soi (citoyenneté/droits universels) ; 3) Sphère sociale/travail ➔ Estime de soi (utilité de l'activité).",
    motsClesObligatoires: ["sphère intime (confiance)", "sphère juridique (respect)", "sphère sociale (estime de soi)", "mépris social"],
    exemplePratique: "Un ouvrier protégé par son contrat de travail (droit) mais humilié par l'invisibilité de son métier (perte d'estime de soi).",
  },
  {
    id: "def-reification",
    terme: "La Réification",
    auteur: "Axel Honneth (2007)",
    modules: ["pst108", "pst123"],
    definitionOfficielle:
      "Définie comme un « oubli de la reconnaissance » originaire : attitude pathologique et réductrice consistant à traiter un alter ego humain comme une simple chose, une ressource instrumentale ou une variable chiffrée, en suspendant l'engagement empathique préalable.",
    motsClesObligatoires: ["oubli de la reconnaissance", "antériorité de la reconnaissance sur la cognition", "chose / ressource chiffrée"],
    exemplePratique: "Parler du personnel hospitalier uniquement en termes d'« équivalents temps plein » (ETP) et de cadences de lits.",
  },

  // --- VALLS & IOD ---
  {
    id: "def-methode-iod",
    terme: "La Méthode IOD",
    auteur: "Francis Valls & Denis Castra (2007)",
    modules: ["pst108"],
    definitionOfficielle:
      "Intervention sur les Offres et les Demandes : méthodologie psychosociologique d'insertion professionnelle en rupture avec l'employabilité normative, refusant tout tri préalable des publics et agissant directement auprès des entreprises pour négocier des postes de travail réels de droit commun.",
    motsClesObligatoires: ["Intervention sur les Offres et les Demandes", "refus du tri préalable", "rupture avec l'employabilité", "action sur l'entreprise"],
    exemplePratique: "Un conseiller IOD qui négocie l'aménagement d'un poste d'opérateur pour y placer directement un demandeur d'emploi sans mise en concurrence.",
  },
  {
    id: "def-desaffiliation",
    terme: "La Désaffiliation",
    auteur: "Robert Castel (1995)",
    modules: ["pst108", "pst123"],
    definitionOfficielle:
      "Processus de rupture et de décrochage social caractérisé par la conjonction de la précarité du travail (absence de travail stable) et de l'isolement relationnel (effilochement des réseaux familiaux et communautaires de sociabilité).",
    motsClesObligatoires: ["décrochage du travail stable", "isolement relationnel", "société salariale", "zone de vulnérabilité"],
    exemplePratique: "La situation des personnes accueillies en SAMU social, cumulant perte de logement, absence de statut d'emploi et rupture familiale.",
  },

  // --- CLOT & DUBAR & SAINSAULIEU & DEJOURS ---
  {
    id: "def-activite-empeechee",
    terme: "L'Activité Empêchée",
    auteur: "Yves Clot (2010)",
    modules: ["pst106"],
    definitionOfficielle:
      "Concept de la clinique de l'activité désignant la souffrance résultant de l'impossibilité matérielle ou organisationnelle de réaliser un travail de qualité conforme aux règles de l'art du genre professionnel, contraignant l'opérateur au travail bâclé ou contrarié.",
    motsClesObligatoires: ["travail bâclé", "genre professionnel", "règles de l'art", "travail bien fait", "clinique de l'activité"],
    exemplePratique: "L'éducateur ou soignant contraint de remplir des formulaires informatiques au lieu de passer du temps avec les bénéficiaires.",
  },
  {
    id: "def-double-transaction-dubar",
    terme: "La Double Transaction Identitaire",
    auteur: "Claude Dubar (1991)",
    modules: ["pst123"],
    definitionOfficielle:
      "Processus permanent d'élaboration de l'identité articulant la transaction biographique interne (identité pour soi construite dans le temps entre continuités et ruptures) et la transaction relationnelle externe (identité pour autrui attribuée par les institutions et les jugements sociaux).",
    motsClesObligatoires: ["transaction biographique (pour soi)", "transaction relationnelle (pour autrui)", "actes d'attribution", "actes d'appartenance"],
    exemplePratique: "Un cadre technique autodidacte promu ingénieur qui vit un conflit entre son identité ouvrière d'origine et le statut accordé par l'entreprise.",
  },
  {
    id: "def-quatre-modeles-sainsaulieu",
    terme: "Les 4 Modèles de Pouvoir",
    auteur: "Renaud Sainsaulieu (1977)",
    modules: ["pst123"],
    definitionOfficielle:
      "Typologie des cultures relationnelles forgées par l'apprentissage politique du pouvoir en entreprise : 1) Modèle fusionnel (camaraderie égalitaire sans divergence) ; 2) Modèle du retrait (travail alimentaire) ; 3) Modèle négociateur (rivalité pacifiée et expertise) ; 4) Modèle affinitaire (clans de promotion).",
    motsClesObligatoires: ["modèle fusionnel", "modèle du retrait", "modèle négociateur", "modèle affinitaire", "accès au pouvoir"],
    exemplePratique: "Le modèle négociateur des ingénieurs débattant démocratiquement des règles face au modèle fusionnel des ouvriers faisant bloc contre le chef.",
  },
  {
    id: "def-jugement-beaute-utilite",
    terme: "Les Jugements d'Utilité et de Beauté",
    auteur: "Christophe Dejours (1993)",
    modules: ["pst106"],
    definitionOfficielle:
      "Deux piliers de la dynamique de reconnaissance en psychodynamique du travail : le jugement d'utilité émane de la hiérarchie ou des bénéficiaires et porte sur l'efficacité sociale ou économique ; le jugement de beauté émane des pairs et valide la conformité aux règles de l'art et à la créativité du métier.",
    motsClesObligatoires: ["jugement d'utilité (hiérarchie)", "jugement de beauté (pairs)", "règles de l'art", "sublimation", "santé mentale"],
    exemplePratique: "Un artisan dont le travail est applaudi par ses collègues pour la pureté de son geste, même si la direction juge que cela a pris trop de temps.",
  },
  {
    id: "def-balkanisation-psychologue",
    terme: "La Balkanisation de la Profession",
    auteur: "Thomas Le Bianic (2004)",
    modules: ["pst123"],
    definitionOfficielle:
      "Thèse socio-historique montrant les divisions intestines et les luttes de territoire qui ont fracturé la profession de psychologue du travail en France (entre psychotechniciens, ergonomes et cliniciens) face aux médecins du travail et aux directeurs du personnel, avant la protection du titre par la Loi du 25 juillet 1985.",
    motsClesObligatoires: ["balkanisation", "luttes de territoire", "Loi du 25 juillet 1985", "titre protégé", "autonomie technique"],
    exemplePratique: "L'affirmation de la posture clinique du psychologue du travail indépendant des pressions managériales de rentabilité.",
  },
  {
    id: "def-regulation-ergonomique-leplat",
    terme: "La Régulation Ergonomique",
    auteur: "Jacques Leplat & Jean-Marie Hoc (1983)",
    modules: ["pst106"],
    definitionOfficielle:
      "Processus dynamique par lequel l'opérateur adapte ses modes opératoires et ses stratégies cognitives pour compenser les aléas et la variabilité de la situation (conditions externes) tout en gérant son propre état interne (fatigue, charge cognitive, compétences) afin d'atteindre le but de la tâche sans dégrader sa santé.",
    motsClesObligatoires: ["modes opératoires", "conditions externes", "état interne", "compromis opératoire", "variabilité du réel", "charge cognitive"],
    exemplePratique: "L'infirmière qui ralentit son rythme ou demande l'aide d'un collègue lors d'un soin complexe pour éviter une erreur médicamenteuse sous tension.",
    piegeConfondreAvec: "Ne pas confondre avec le simple respect du protocole prescrit : la régulation est une création opératoire permanente face à l'imprévu.",
  },
  {
    id: "def-genre-professionnel-clot",
    terme: "Le Genre Professionnel",
    auteur: "Yves Clot (1999)",
    modules: ["pst106"],
    definitionOfficielle:
      "Mémoire collective et vivante d'un métier, constituée par l'ensemble des règles officieuses, des sous-entendus, des ficelles et des manières de faire partagées par le collectif de travail pour affronter le réel. C'est le corps d'obligations et de ressources partagé qui permet de travailler sans réinventer chaque geste.",
    motsClesObligatoires: ["mémoire collective", "règles officieuses", "collectif de pairs", "ficelles du métier", "ressource pour l'action"],
    exemplePratique: "Les signaux gestuels silencieux qu'échangent deux soignants pour mobiliser un patient lourd en douceur sans forcer.",
    piegeConfondreAvec: "Ne pas confondre avec la fiche de poste ou les consignes écrites par la direction (qui relèvent de la tâche prescrite).",
  },
  {
    id: "def-auto-confrontation-croisee",
    terme: "L'Auto-confrontation Croisée",
    auteur: "Yves Clot, Daniel Faïta, Gabriel Fernandez (2000)",
    modules: ["pst106"],
    definitionOfficielle:
      "Dispositif méthodologique central de la clinique de l'activité en 4 étapes : 1) Enregistrement vidéo de l'activité réelle ; 2) Auto-confrontation simple (l'opérateur commente sa propre vidéo avec le chercheur) ; 3) Auto-confrontation croisée (deux collègues confrontent et débattent de leurs manières différentes de travailler sur la même tâche) ; 4) Restitution au collectif pour relancer la controverse professionnelle.",
    motsClesObligatoires: ["clinique de l'activité", "vidéo de l'activité réelle", "auto-confrontation simple", "auto-confrontation croisée", "controverse professionnelle", "développement du pouvoir d'agir"],
    exemplePratique: "Deux facteurs visionnant la distribution du courrier et débattant de la manière d'ouvrir les boîtes aux lettres défectueuses sans perdre de temps.",
  },
  {
    id: "def-agir-strategique-masque",
    terme: "L'Agir Stratégique Masqué",
    auteur: "Jürgen Habermas (1981)",
    modules: ["pst108"],
    definitionOfficielle:
      "Forme d'interaction où le locuteur dissimule son intention d'influencer ou de manipuler autrui sous l'apparence trompeuse d'une discussion coopérative et sincère. L'interlocuteur croit participer à une recherche collective d'accord, alors qu'il est l'objet d'une instrumentalisation orientée vers le succès unilatéral du locuteur.",
    motsClesObligatoires: ["agir stratégique masqué", "manipulation", "tromperie sur les prétentions à la validité", "illusion délibérative", "succès individuel"],
    exemplePratique: "L'animation d'ateliers de 'concertation' où le projet managérial est déjà bouclé et où les objections sont désamorcées sous un vernis d'écoute bienveillante.",
  },
  {
    id: "def-zone-vulnerabilite-castel",
    terme: "La Zone de Vulnérabilité",
    auteur: "Robert Castel (1995)",
    modules: ["pst123"],
    definitionOfficielle:
      "Zone intermédiaire de l'espace social caractérisée par la précarité de l'emploi (contrats courts, temps partiels subis, insécurité salariale) et la fragilité des supports relationnels et familiaux. Elle constitue la antichambre du basculement vers la zone de désaffiliation.",
    motsClesObligatoires: ["zone de vulnérabilité", "précarité de l'emploi", "fragilité relationnelle", "antichambre de la désaffiliation", "supports de l'existence"],
    exemplePratique: "Un salarié enchaînant des contrats d'intérim sans savoir s'il travaillera la semaine suivante et peinant à obtenir un logement stable.",
  },
];

/**
 * PST106 — Clinique de l'activité et psychologie du travail
 * Enseignante responsable : Pr. Christine LAGABRIELLE (Cnam Nouvelle-Aquitaine / Paris)
 * 
 * INVENTAIRE & ANALYSE DU CORPUS OFFICIEL DES RESSOURCES TRANSMISES
 * Dossiers sources :
 *  - Desktop/PST106/ (Cours 1, Pacaud, Herzberg, Taylorisme, Vidéo mkv)
 *  - Downloads/PST106_transcription_integrale.docx (Buzz transcription 3h12)
 *  - Desktop/PSYCHOLOGIE/archives psycho 2nd semestre/PST106 - Clinique de l'activite/ (Fiche de cours 108k, 8 Sujets, Audios)
 */

export interface Pst106OfficialResource {
  id: string;
  category:
    | "cours_lagabrielle"
    | "histoire_psychotechnique"
    | "motivation_organisation"
    | "clinique_activite_clot"
    | "methodes_intervention"
    | "ergonomie_wisner"
    | "psychodynamique_dejours"
    | "audio_podcasts"
    | "annales_officielles";
  categoryLabel: string;
  authorFilter:
    | "Pr. Christine Lagabrielle"
    | "Yves Clot"
    | "Alain Wisner"
    | "Christophe Dejours"
    | "Suzanne Pacaud"
    | "Frederick Herzberg"
    | "Taylor & OST"
    | "Philosophie du Travail"
    | "Kurt Lewin & École RH"
    | "Jacques Leplat & Faverge"
    | "Henri Piéron & Psychotechnique"
    | "Abraham Maslow"
    | "Collectif Cnam";
  title: string;
  authors: string;
  year: string;
  sourceOrPublisher: string;
  localFile?: string;
  seanceNumber: string;
  description: string;
  keyTakeaway: string;
  apa7Citation: string;
  tags: string[];
  url?: string;
  audioUrl?: string;
}

export const PST106_OFFICIAL_RESOURCES: Pst106OfficialResource[] = [
  // =========================================================================
  // 1. SUPPORTS DE COURS, VIDÉO & TRANSCRIPTIONS — PR. CHRISTINE LAGABRIELLE
  // =========================================================================
  {
    id: "res-lagabrielle-cours1-diaporama",
    category: "cours_lagabrielle",
    categoryLabel: "Diaporama de Cours Magistral",
    authorFilter: "Pr. Christine Lagabrielle",
    title: "Cours 1 : Clinique de l'activité et psychologie du travail — Diaporama Officiel (40 diapositives)",
    authors: "Pr. Christine Lagabrielle",
    year: "15 octobre 2026",
    sourceOrPublisher: "Conservatoire National des Arts et Métiers (Cnam Nouvelle-Aquitaine)",
    localFile: "Desktop/PST106/Cours 1_15octobre26.pdf",
    seanceNumber: "Séance 1 (Inaugurale)",
    description:
      "Support officiel de 40 diapositives projeté par Pr. Christine Lagabrielle lors de la séance inaugurale de PST106. Cadrage épistémologique du cours : histoire de la psychologie du travail, opposition entre le modèle classique de sélection/adaptation et la clinique du travail, présentation des 3 grands courants (Ergonomie de l'activité, Psychodynamique du travail, Clinique de l'activité) et modalités d'évaluation de l'examen.",
    keyTakeaway:
      "Document de cadrage fondamental : fixe le vocabulaire canonique exigé par l'enseignante à l'examen et les critères d'évaluation des copies.",
    apa7Citation:
      "Lagabrielle, C. (2026). PST 106 : Clinique de l’activité et psychologie du travail (Cours 1, Diapositives officielles). Cnam Nouvelle-Aquitaine.",
    tags: ["Lagabrielle", "Cours 1", "PST106", "Diaporama", "Cadrage", "Épistémologie"],
  },
  {
    id: "res-lagabrielle-transcription-integrale-buzz",
    category: "cours_lagabrielle",
    categoryLabel: "Transcription Intégrale de Cours (3h12)",
    authorFilter: "Pr. Christine Lagabrielle",
    title: "Transcription intégrale du Cours 1 en direct (Durée : 3 h 12 min 55 s)",
    authors: "Pr. Christine Lagabrielle / Transcription Buzz",
    year: "2026",
    sourceOrPublisher: "Enregistrement Moodle / Teams Cnam",
    localFile: "Downloads/PST106_transcription_integrale.docx",
    seanceNumber: "Séance 1",
    description:
      "Verbatim complet de 19 400 mots retranscrivant l'intégralité des 3h12 de cours magistral dispensé par Christine Lagabrielle. Contient toutes les interactions avec les auditeurs, les anecdotes pédagogiques, la présentation de son parcours à l'Université de Bordeaux et à la direction associée de 'Le Travail Humain', et les explications orales des notions complexes d'Yves Clot.",
    keyTakeaway:
      "Ressource d'une valeur inestimable pour retrouver la formulation exacte de l'enseignante sur les pièges à éviter lors de l'épreuve écrite.",
    apa7Citation:
      "Lagabrielle, C. (2026). Transcription intégrale du cours magistral n° 1 de PST106 (Buzz transcription, 3h 12min). Cnam.",
    tags: ["Lagabrielle", "Transcription", "Buzz", "Verbatim", "Oral", "Cours direct"],
  },
  {
    id: "res-lagabrielle-cours1-video-mkv",
    category: "cours_lagabrielle",
    categoryLabel: "Enregistrement Vidéo Intégral",
    authorFilter: "Pr. Christine Lagabrielle",
    title: "Enregistrement vidéo complet du Cours 1 (Fichier MKV haute définition)",
    authors: "Pr. Christine Lagabrielle",
    year: "2026",
    sourceOrPublisher: "Session enregistrée Cnam",
    localFile: "Desktop/PST106/cours 1 pst 106 video.mkv",
    seanceNumber: "Séance 1",
    description:
      "Enregistrement vidéo de la classe virtuelle du 15 octobre 2026 permettant de revoir la synchronisation entre les explications orales de Pr. Lagabrielle et les diapositives de présentation.",
    keyTakeaway:
      "Support d'archive pour réécouter les passages d'introduction sur la posture du psychologue du travail clinicien.",
    apa7Citation:
      "Lagabrielle, C. (2026). Cours 1 PST106 : Clinique de l’activité et psychologie du travail [Enregistrement vidéo MKV]. Cnam.",
    tags: ["Vidéo", "MKV", "Lagabrielle", "Classe virtuelle", "PST106"],
  },
  {
    id: "res-lagabrielle-cours2-diaporama",
    category: "cours_lagabrielle",
    categoryLabel: "Diaporama de Cours Magistral",
    authorFilter: "Pr. Christine Lagabrielle",
    title: "Cours 2 : De la Mécanisation Industrielle à l'Analyse Ergonomique de Terrain — Diaporama Officiel (32 diapositives)",
    authors: "Pr. Christine Lagabrielle",
    year: "28 octobre 2026",
    sourceOrPublisher: "Conservatoire National des Arts et Métiers (Cnam Nouvelle-Aquitaine)",
    localFile: "Desktop/PST106/Cours 2_28octobre2026.pdf",
    seanceNumber: "Séance 2",
    description:
      "Diaporama officiel complet de 32 diapositives projeté par Pr. Lagabrielle le 28 octobre 2026 : le travail selon les philosophes et sociologues (Rousseau, Nietzsche, Marcuse, Weber, Kant, Marx, Hegel, Freud), l'École classique (Fayol POC3, Taylor OST 1911, Ford compromis fordiste), le chronométrage et l'autonomie ouvrière, les scripts comportementaux dans les services (grille de restauration rapide, Mercedes à la minute, routiers et chronotachygraphe 9h), le corrigé officiel des 25 questions du QCM Taylorisme, et l'émergence de la psychotechnique (Wundt 1875, Münsterberg 1913, Cattell, Toulouse 1906, Piéron 1928, Lahy 1916 et Suzanne Pacaud 1949).",
    keyTakeaway:
      "Pour l'examen : retenir impérativement la formule canonique de Suzanne Pacaud 'Pour comprendre le métier, il faut le faire', la distinction entre l'optimum physiologique durable et le maximum quantitatif destructeur (Lahy), et le corrigé des 25 questions de l'exercice Taylorisme.",
    apa7Citation:
      "Lagabrielle, C. (2026). Cours 2 : De la mécanisation industrielle à l'analyse ergonomique de terrain (Diapositives officielles). Cnam Nouvelle-Aquitaine.",
    tags: ["Lagabrielle", "Cours 2", "Taylor", "Fayol", "Ford", "Lahy", "Pacaud", "Scripts", "Wundt", "Münsterberg"],
  },
  {
    id: "res-lagabrielle-cours3-diaporama",
    category: "cours_lagabrielle",
    categoryLabel: "Diaporama de Cours Magistral",
    authorFilter: "Pr. Christine Lagabrielle",
    title: "Cours 3 : Du Facteur Humain à l'Analyse de l'Activité et la Psychopathologie — Diaporama Officiel (32 diapositives)",
    authors: "Pr. Christine Lagabrielle",
    year: "30 octobre 2026",
    sourceOrPublisher: "Conservatoire National des Arts et Métiers (Cnam Nouvelle-Aquitaine)",
    localFile: "Desktop/PST106/Cours 3_30octobre2026.pdf",
    seanceNumber: "Séance 3",
    description:
      "Diaporama officiel complet de 32 diapositives projeté par Pr. Lagabrielle le 30 octobre 2026 : l'École des Relations Humaines (Elton Mayo à Hawthorne, organisation informelle, étude de cas Harwood de Coch & French), Maslow (1943, recueil des plaintes), Herzberg (1959, théorie bifactorielle), Douglas McGregor (Théories X et Y), Kurt Lewin (champ dynamique de forces, dégel/mouvement/regel, 3 styles de leadership). Historique des chaires du Cnam (Bonnardel, Bize, Goguelin, Dejours, Clot, Bobillier-Chaumon). Centration sur l'activité : Alain Wisner (écart prescrit/réel, AET), Faverge & Leplat (psychologie ergonomique, 4 composantes de Faverge, schéma des 5 carrés et la double régulation Leplat & Cuny 1977, boucle de sécurité), et psychopathologie du travail (Louis Le Guillant, Paul Sivadon 1952, Claude Veil).",
    keyTakeaway:
      "Maîtriser au compas pour la copie d'examen : le schéma des 5 carrés de Leplat & Cuny (1977), la double régulation (interne/externe), les 3 styles de leadership de Lewin, et la formule 'Le travail est à la fois opérateur de santé et destructeur de santé' (Le Guillant).",
    apa7Citation:
      "Lagabrielle, C. (2026). Cours 3 : Du facteur humain à l'analyse de l'activité et la psychopathologie (Diapositives officielles). Cnam Nouvelle-Aquitaine.",
    tags: ["Lagabrielle", "Cours 3", "Mayo", "Maslow", "Herzberg", "McGregor", "Lewin", "Wisner", "Leplat", "Faverge", "Le Guillant"],
  },
  {
    id: "res-lagabrielle-cours3-buzz-synthese",
    category: "cours_lagabrielle",
    categoryLabel: "Synthèse Officielle & Transcription Buzz",
    authorFilter: "Pr. Christine Lagabrielle",
    title: "Cours 3 : Du facteur humain à l'analyse de l'activité de travail — Synthèse officielle & Transcription Buzz",
    authors: "Pr. Christine Lagabrielle / Transcription Buzz",
    year: "28 octobre 2026",
    sourceOrPublisher: "Conservatoire National des Arts et Métiers (Cnam Nouvelle-Aquitaine)",
    seanceNumber: "Séance 3",
    description:
      "Support de synthèse officiel et transcription intégrale Buzz de la Séance 3 de PST106 (18 pages verbatim). Retrace le passage de la rationalisation taylorienne à l'École des Relations Humaines (Elton Mayo à Hawthorne, organisation informelle, Maslow, théorie bi-factorielle d'Herzberg, McGregor Théorie X/Y, Kurt Lewin et dynamique de groupe), l'Ergonomie francophone (Alain Wisner, paradoxe prescrit/réel, Faverge et les 4 composantes, Leplat et les 5 carrés), et la Psychopathologie du travail (Louis Le Guillant, téléphonistes, cheminots, sœurs Papin, histoire de la chaire Cnam et Bobillier-Chaumon).",
    keyTakeaway:
      "Contient les mises au point fondamentales de Pr. Lagabrielle pour l'examen : 'On ne motive pas les personnes !', démystification de la pyramide de Maslow, et maîtrise du schéma des 5 carrés de Leplat.",
    apa7Citation:
      "Lagabrielle, C. (2026). PST106 : Du facteur humain à l'analyse de l'activité de travail (Séance 3, Transcription Buzz et Synthèse officielle). Cnam.",
    tags: ["Lagabrielle", "Cours 3", "Mayo", "Herzberg", "Maslow", "Wisner", "Leplat", "Le Guillant", "5 Carrés"],
  },
  {
    id: "res-wisner-developpement-ergonomie",
    category: "ergonomie_wisner",
    categoryLabel: "Texte Fondateur d'Ergonomie",
    authorFilter: "Alain Wisner",
    title: "Le développement de l'ergonomie et la pensée sur le travail",
    authors: "Alain Wisner",
    year: "1972 / 1995",
    sourceOrPublisher: "Conservatoire National des Arts et Métiers (Cnam) / Éditions Octarès",
    seanceNumber: "Séance 3",
    description:
      "Texte fondamental d'Alain Wisner présenté par Pr. Lagabrielle en Séance 3. Wisner y retrace l'émergence de l'ergonomie francophone face à la psychotechnique et pose le principe cardinal : 'adapter le travail à l'homme et non l'homme au travail'. Il théorise la pluridisciplinarité, l'observation in situ et la verbalisation des travailleurs.",
    keyTakeaway:
      "Texte de référence pour comprendre le passage de l'homme adapté à la machine à la transformation concrète des situations réelles de travail.",
    apa7Citation:
      "Wisner, A. (1995). Réflexions sur l'ergonomie (1962-1995). Octarès Éditions.",
    tags: ["Wisner", "Ergonomie francophone", "Pluridisciplinarité", "Travail réel", "Cnam"],
  },
  {
    id: "res-le-guillant-drame-humain",
    category: "clinique_activite_clot",
    categoryLabel: "Ouvrage de Psychopathologie du Travail",
    authorFilter: "Collectif Cnam",
    title: "Le drame humain du travail : Essais de psychopathologie du travail (Préface d'Yves Clot)",
    authors: "Louis Le Guillant (Préface d'Yves Clot)",
    year: "1984 / 2006",
    sourceOrPublisher: "Éditions érès",
    seanceNumber: "Séance 3",
    description:
      "Recueil des études cliniques majeures de Louis Le Guillant, recommandé par Pr. Lagabrielle en Séance 3. Comprend 'La névrose des téléphonistes', 'L'asthénie des conducteurs de locomotive' (la VACMA) et l'analyse psychopathologique du crime des sœurs Papin démontrant que le travail est avant tout une condition sociale régie par des rapports de domination.",
    keyTakeaway:
      "Ouvrage capital pour articuler santé mentale et sociologie du travail : la souffrance n'est pas une fragilité individuelle, elle est le produit de la condition sociale d'aliénation.",
    apa7Citation:
      "Le Guillant, L. (2006). Le drame humain du travail : Essais de psychopathologie du travail (Préface d'Y. Clot). érès.",
    tags: ["Le Guillant", "Psychopathologie", "Condition sociale", "Téléphonistes", "Cheminots", "Sœurs Papin", "Clot"],
  },
  {
    id: "res-bobillier-chaumon-lecon-inaugurale",
    category: "clinique_activite_clot",
    categoryLabel: "Leçon Inaugurale Chaire Cnam",
    authorFilter: "Collectif Cnam",
    title: "Leçon inaugurale de la Chaire de Psychologie du Travail du Cnam : La clinique des usages et les technologies",
    authors: "Marc-Éric Bobillier-Chaumon",
    year: "2018",
    sourceOrPublisher: "Chaire de Psychologie du Travail du Cnam (Paris)",
    seanceNumber: "Séance 3",
    description:
      "Conférence inaugurale prononcée par le Pr. Marc-Éric Bobillier-Chaumon lors de son installation à la chaire du Cnam, succédant à Yves Clot. Analyse de la 'clinique des usages' : comment l'informatique, les robots, les algorithmes et l'intelligence artificielle transforment l'activité réelle, redéfinissent les gestes de métier et reconfigurent la charge cognitive.",
    keyTakeaway:
      "Pr. Lagabrielle recommande d'écouter cette allocution (à partir de la minute 33) pour nourrir vos copies d'examen sur les mutations contemporaines du travail.",
    apa7Citation:
      "Bobillier-Chaumon, M.-É. (2018). Leçon inaugurale de la Chaire de Psychologie du Travail : Clinique des usages et technologies. Cnam.",
    tags: ["Bobillier-Chaumon", "Chaire Cnam", "Clinique des usages", "Technologies", "IA", "Robotique"],
  },
  {
    id: "res-fiche-cours-synthese-integrale-108k",
    category: "cours_lagabrielle",
    categoryLabel: "Polycopié de Référence (108 000 caractères)",
    authorFilter: "Collectif Cnam",
    title: "Clinique de l'activité : Fiche de Cours et Synthèse Magistrale Exhaustive",
    authors: "Collectif Enseignants Cnam / Pr. C. Lagabrielle",
    year: "2026",
    sourceOrPublisher: "Centre Cnam Nouvelle-Aquitaine",
    localFile: "Desktop/PSYCHOLOGIE/archives psycho 2nd semestre/PST106 - Clinique de l'activite/Clinique de l'activité Fiche de Cours .docx",
    seanceNumber: "Toutes Séances (1 à 8)",
    description:
      "Le document de synthèse le plus complet du module (108 868 caractères, 25 pages denses). Table des matières complète : 1) Histoire et filiations (émergence et limites de la psychotechnique, Lahy, Toulouse, Münsterberg) ; 2) Ergonomie et analyse du travail (Wisner, Ombredane, Faverge, Leplat) ; 3) Psychosociologie et sociologie (Marx, Durkheim) ; 4) Psychodynamique du travail (Dejours) ; 5) Clinique de l'activité (Clot, Vygotski, Bakhtine, Canguilhem) ; 6) Méthodologie d'intervention (Instruction au sosie, autoconfrontation simple et croisée) ; 7) Les 4 instances du collectif (personnelle, interpersonnelle, transpersonnelle, impersonnelle) ; 8) Activité contrariée, empêchée et conflits de critères sur la qualité du travail.",
    keyTakeaway:
      "La bible du module PST106 : toutes les définitions canoniques exigées à l'examen y sont rédigées avec une rigueur universitaire sans faille.",
    apa7Citation:
      "Cnam. (2026). Clinique de l’activité et psychologie du travail : Synthèse magistrale et fiches de cours approfondies (PST106). Conservatoire National des Arts et Métiers.",
    tags: ["Bible PST106", "Polycopié intégral", "Clot", "Wisner", "Dejours", "Filiations"],
  },

  // =========================================================================
  // 2. HISTOIRE, PSYCHOTECHNIQUE & ANALYSE HISTORIQUE DU TRAVAIL
  // =========================================================================
  {
    id: "res-pacaud-texte-selection",
    category: "histoire_psychotechnique",
    categoryLabel: "Texte Fondateur Historique",
    authorFilter: "Suzanne Pacaud",
    title: "Recherches sur le travail des opérateurs et les limites de la sélection psychotechnique",
    authors: "Suzanne Pacaud",
    year: "1949 / 1953",
    sourceOrPublisher: "Le Travail Humain / Presses Universitaires de France (PUF)",
    localFile: "Desktop/PST106/Texte Pacaud.pdf",
    seanceNumber: "Séance 1 & 2",
    description:
      "Texte historique de Suzanne Pacaud, figure majeure de la psychologie du travail en France, directrice des études psychotechniques à la SNCF et enseignante au Cnam. Pacaud critique l'illusion selon laquelle des tests en laboratoire mesurant des 'aptitudes pures' suffiraient à prédire l'adaptation d'un travailleur à son poste. Elle démontre que l'homme au travail compense ses éventuelles faiblesses par des régulations sensori-motrices et des stratégies d'expérience que le test psychométrique standardisé est incapable de capter.",
    keyTakeaway:
      "À citer impérativement en histoire de la discipline : Suzanne Pacaud marque le tournant où la psychologie du travail cesse de considérer le travailleur comme un faisceau d'aptitudes statiques pour observer l'opérateur en situation réelle.",
    apa7Citation:
      "Pacaud, S. (1949). Recherches sur le travail des opérateurs et les limites de la sélection psychotechnique. Le Travail Humain, 12(3/4), 161–184.",
    tags: ["Suzanne Pacaud", "Psychotechnique", "SNCF", "Aptitudes", "Régulation", "Le Travail Humain"],
  },
  {
    id: "res-pistes-851-histoire-gay-lussac",
    category: "histoire_psychotechnique",
    categoryLabel: "Histoire Sociale & Institutionnelle (Cnam / CNRS)",
    authorFilter: "Collectif Cnam",
    title: "De la physiologie et la psychologie du travail à l'ergonomie : L'histoire des laboratoires du 41 rue Gay-Lussac (1910-1990)",
    authors: "Revue PISTES (OpenEdition)",
    year: "2012",
    sourceOrPublisher: "Perspectives interdisciplinaires sur le travail et la santé (PISTES), vol. 14, n° 1, 26 pages",
    localFile: "Desktop/PST106/pistes-851.pdf",
    seanceNumber: "Séance 1",
    description:
      "Monographie historique de référence retraçant 80 ans d'histoire des sciences du travail en France au 41 rue Gay-Lussac à Paris. Retrace la genèse du Laboratoire de Physiologie du travail fondé par Jules Amar en 1913, les recherches de Jean-Maurice Lahy et Édouard Toulouse sur la fatigue des conducteurs de tramway, la fondation de l'Institut National d'Orientation Professionnelle (INOP) par Henri Piéron, puis l'émergence de l'ergonomie moderne sous la direction d'Alain Wisner à partir de 1963.",
    keyTakeaway:
      "Apporte l'épaisseur historique indispensable en dissertation : prouve que les sciences du travail au Cnam ont toujours cherché à dépasser le modèle purement expérimental pour aller 'sur le terrain' défendre la santé des ouvriers.",
    apa7Citation:
      "Revue PISTES. (2012). De la physiologie et la psychologie du travail à l’ergonomie : L’histoire des laboratoires du 41 rue Gay-Lussac à Paris. Perspectives interdisciplinaires sur le travail et la santé, 14(1), 1–26.",
    tags: ["Gay-Lussac", "PISTES", "Lahy", "Toulouse", "Wisner", "Piéron", "Amar", "Histoire Cnam"],
    url: "https://journals.openedition.org/pistes/851",
  },
  {
    id: "res-taylorisme-exercice-ost",
    category: "histoire_psychotechnique",
    categoryLabel: "Analyse de Modèle Productif & Étude de Cas",
    authorFilter: "Taylor & OST",
    title: "Exercice sur le Taylorisme : Les 4 principes de l'Organisation Scientifique du Travail (OST)",
    authors: "Frederick Winslow Taylor / Support Cnam",
    year: "1911 / 2026",
    sourceOrPublisher: "Documents de TD Moodle PST106",
    localFile: "Desktop/PST106/Exercice sur le Taylorisme.pdf",
    seanceNumber: "Séance 1 bis",
    description:
      "Dossier pédagogique analysant les piliers de l'Organisation Scientifique du Travail théorisée par F.W. Taylor en 1911 : 1) Étude systématique des gestes et chronométrage (élimination des temps morts) ; 2) Sélection scientifique et entraînement de l'ouvrier ; 3) Séparation absolue entre la conception intellectuelle (réservée au bureau des méthodes) et l'exécution gestuelle ; 4) Rémunération au rendement (salaire aux pièces). Analyse critique des ripostes médicales et psychologiques (Henri Wallon et Lahy montrant l'usure prématurée et l'aliénation mentale causées par la cadence imposée).",
    keyTakeaway:
      "Le contre-modèle absolu de la clinique de l'activité : Taylor nie l'intelligence du travailleur ('on ne vous demande pas de penser') ; la clinique de l'activité prouve au contraire que le travail ne tient que par l'intelligence rusée de l'activité réelle.",
    apa7Citation:
      "Taylor, F. W. (1911). The Principles of Scientific Management. Harper & Brothers. (Dossier d'analyse critique, Cnam 2026).",
    tags: ["Taylorisme", "OST", "One Best Way", "Chronométrage", "Wallon", "Lahy", "Aliénation"],
  },
  {
    id: "res-ouvrier-bonnaz-histoire-chaires",
    category: "histoire_psychotechnique",
    categoryLabel: "Histoire des Chaires Cnam (1900-1945)",
    authorFilter: "Collectif Cnam",
    title: "L'histoire des chaires du CNAM concernant l'Homme au travail (1900-1945) entre production de savoirs et engagement politique",
    authors: "Régis Ouvrier-Bonnaz",
    year: "2010",
    sourceOrPublisher: "Cahiers d’histoire. Revue d’histoire critique, n° 111, pp. 99-122",
    localFile: "Desktop/PST106/LHISTO_1 DU CNAM.PDF",
    seanceNumber: "Séance 1 & 3",
    description:
      "Étude historique de premier plan (18 pages) sur la naissance institutionnelle des sciences du travail au Conservatoire : rôle déterminant d'Alexandre Millerand (ministre du Commerce puis président du CA du Cnam 1902-1909), création en 1905 du premier cours d'hygiène industrielle confié à Frédéric-Louis Heim de Balsac, fondation en 1913 du laboratoire de recherches sur le travail musculaire attribué à Jules Amar (métaphore du 'moteur humain' de Chauveau et Dupin), chaire d'organisation technique du travail humain de Langlois (1920) et Pottevin (1922), et nomination en 1928 d'Henri Laugier ouvrant la chaire à la physiologie du travail, à l'orientation professionnelle et à la fondation de l'INOP.",
    keyTakeaway:
      "À mobiliser en dissertation d'histoire des idées : démontre que les chaires du Cnam ont été instituées sous la IIIe République par une alliance entre savants républicains, franc-maçonnerie et mouvement ouvrier pour opposer la science médicale à l'exploitation patronale sauvage.",
    apa7Citation:
      "Ouvrier-Bonnaz, R. (2010). L’histoire des chaires du CNAM concernant l’Homme au travail (1900-1945) entre production de savoirs et engagement politique. Cahiers d’histoire. Revue d’histoire critique, 111, 99–122.",
    tags: ["Cnam", "Ouvrier-Bonnaz", "Chaires Cnam", "Gay-Lussac", "Millerand", "Jules Amar", "Laugier", "Heim de Balsac"],
  },
  {
    id: "res-le-bianic-machine-humaine",
    category: "histoire_psychotechnique",
    categoryLabel: "Sociologie Historique du Cnam",
    authorFilter: "Collectif Cnam",
    title: "Le Conservatoire des Arts et Métiers et « la machine humaine » : naissance et développement des sciences de l'homme au travail au CNAM (1910-1990)",
    authors: "Thomas Le Bianic",
    year: "2004",
    sourceOrPublisher: "Revue d’Histoire des Sciences Humaines, n° 11, pp. 185-214",
    localFile: "Desktop/PST106/le-bianic-2004-le-conservatoire-des-arts-et-metiers-et-la-machine-humaine-naissance-et-developpement-des-sciences-de-lhomme-au-travail-au-cnam-1910-1990.pdf",
    seanceNumber: "Séance 1 & 3",
    description:
      "Monographie académique majeure (30 pages) analysant les trois grandes périodes des sciences du travail au Cnam : 1) 1913-1945 : le modèle biologique et physiologiste (Amar, Laugier) ; 2) 1945-1970 : l'essor de la psychologie appliquée et de la psychométrie pour la reconstruction (Bonnardel, Bize) ; 3) 1970-1990 : la chaire de psychologie du travail de Pierre Goguelin, marquée par la contestation des méthodes managériales, ouvrant la voie à la scission historique de 1990 entre Psychodynamique (Dejours) et Clinique de l'activité (Clot).",
    keyTakeaway:
      "Fournit le cadre sociologique parfait pour répondre à la question d'examen récurrente : 'Comment le Cnam est-il passé de l'étude de la machine humaine à la clinique de la subjectivité et de l'activité ?'.",
    apa7Citation:
      "Le Bianic, T. (2004). Le Conservatoire des Arts et Métiers et « la machine humaine », naissance et développement des sciences de l’homme au travail au CNAM (1910-1990). Revue d’Histoire des Sciences Humaines, 11, 185–214.",
    tags: ["Le Bianic", "Cnam", "Machine humaine", "Bonnardel", "Bize", "Goguelin", "Histoire chaires", "Scission 1990"],
  },
  {
    id: "res-pieron-orientation-professionnelle",
    category: "histoire_psychotechnique",
    categoryLabel: "Psychotechnique & Docimologie",
    authorFilter: "Henri Piéron & Psychotechnique",
    title: "Henri Piéron, la psychologie de l'orientation professionnelle",
    authors: "Michel Huteau & Serge Blanchard",
    year: "2014",
    sourceOrPublisher: "Bulletin de psychologie, tome 67 (5), n° 533, pp. 363-384",
    localFile: "Desktop/PST106/huteau-2014-henri-pieron-la-psychologie-de-lorientation-professionnelle.pdf",
    seanceNumber: "Séance 2",
    description:
      "Étude de référence (22 pages) sur l'œuvre d'Henri Piéron : de son laboratoire à l'asile de Villejuif avec Édouard Toulouse à la création en 1928 de l'Institut National d'Orientation Professionnelle (INOP, rattaché au Cnam en 1941). Analyse la théorisation des tests mentaux et de la docimologie (critique de l'arbitraire des examens scolaires). Met en lumière les controverses historiques fondamentales : le conflit avec Pierre Naville (1945) et Antoine Léon (1952) qui dénoncent le postulat fixiste de l'orientation et défendent une orientation éducative et formatrice, ainsi que la critique de Maurice Reuchlin (1954) démontrant que l'aptitude est inséparable des conditions socio-économiques.",
    keyTakeaway:
      "À maîtriser pour l'examen : la distinction canonique de Piéron entre 'aptitude' (substrat congénital héréditaire) et 'capacité' (rendement effectif observable), et la critique d'Antoine Léon ('substituer une orientation formatrice à une orientation révélatrice').",
    apa7Citation:
      "Huteau, M., & Blanchard, S. (2014). Henri Piéron, la psychologie de l'orientation professionnelle. Bulletin de psychologie, 67(5), 363–384.",
    tags: ["Piéron", "Huteau", "INOP", "Orientation professionnelle", "Aptitude vs Capacité", "Reuchlin", "Docimologie", "Antoine Léon"],
  },

  // =========================================================================
  // 3. MOTIVATION, ORGANISATION & PHILOSOPHIE DU TRAVAIL
  // =========================================================================
  {
    id: "res-herzberg-motivations-perdues",
    category: "motivation_organisation",
    categoryLabel: "Théorie Organisationnelle Fondatrice",
    authorFilter: "Frederick Herzberg",
    title: "À la recherche des motivations perdues — La théorie bifactorielle d'Herzberg",
    authors: "Frederick Herzberg",
    year: "1968 / 1971",
    sourceOrPublisher: "Harvard Business Review / Document officiel Cnam",
    localFile: "Desktop/PST106/Texte Herzberg_A la recherche des motivations perdues.pdf",
    seanceNumber: "Séance 2",
    description:
      "L'article canonique de Frederick Herzberg réformant la théorie des besoins au travail. Herzberg démontre que satisfaction et insatisfaction ne sont pas les deux pôles opposés d'un même continuum, mais relèvent de deux dynamiques indépendantes : 1) Les facteurs d'hygiène / extrinsèques (salaire, avantages sociaux, conditions physiques, relations avec les supérieurs) : leur dégradation suscite une insatisfaction vive, mais leur optimisation ne produit aucune motivation durable ; 2) Les facteurs de motivation / intrinsèques (responsabilité, accomplissement personnel, intérêt de la mission, reconnaissance du travail bien fait) : seuls capables d'engendrer un engagement subjectif authentique.",
    keyTakeaway:
      "Concept d'examen capital pour critiquer les politiques managériales contemporaines : les 'primes' ou les démarches cosmétiques de QVT n'agissent que sur l'hygiène ; elles ne résolvent jamais la crise de sens issue d'un travail empêché ou dévalorisé.",
    apa7Citation:
      "Herzberg, F. (1968). One more time : How do you motivate employees ? Harvard Business Review, 46(1), 53–62.",
    tags: ["Herzberg", "Théorie bifactorielle", "Hygiène", "Motivation", "Sens", "QVT"],
  },
  {
    id: "res-le-travail-selon-philosophes",
    category: "motivation_organisation",
    categoryLabel: "Repères Philosophiques Fondateurs",
    authorFilter: "Philosophie du Travail",
    title: "Le travail (en quelques lignes) selon Rousseau, Nietzsche, Marcuse, Weber, Kant, Marx, Hegel et Freud",
    authors: "Support de Philosophie du Travail Cnam",
    year: "2026",
    sourceOrPublisher: "Fiche ressource Moodle Cnam Nouvelle-Aquitaine",
    localFile: "Desktop/PST106/Le travail selon.....odt",
    seanceNumber: "Séances 1 à 8",
    description:
      "Anthologie synthétique des grandes conceptions du travail dans la pensée occidentale : 1) Karl Marx (le travail comme médiation fondamentale de l'homme avec la nature, aliéné par le capitalisme qui sépare le travailleur de son produit) ; 2) G.W.F. Hegel (la dialectique du maître et de l'esclave : par le travail qui transforme la matière, l'esclave acquiert la conscience de soi et surmonte sa dépendance) ; 3) Sigmund Freud (le travail comme ancrage indispensable dans la réalité et voie royale de sublimation des pulsions) ; 4) Friedrich Nietzsche (le travail forcé comme 'meilleure des polices', épuisant l'énergie vitale pour empêcher la révolte) ; 5) Herbert Marcuse (le principe de rendement et la surrépression des désirs) ; 6) Max Weber (l'éthique protestante et la sanctification du travail comme vocation, Beruf).",
    keyTakeaway:
      "Véritables pépites pour enrichir l'introduction et la conclusion de votre dissertation d'examen en articulant la clinique de l'activité avec l'histoire des idées.",
    apa7Citation:
      "Cnam. (2026). Le travail en quelques lignes selon les grands penseurs : Rousseau, Nietzsche, Marcuse, Weber, Kant, Marx, Hegel, Freud. Support pédagogique PST106.",
    tags: ["Philosophie", "Marx", "Hegel", "Freud", "Nietzsche", "Weber", "Sublimation", "Aliénation"],
  },
  {
    id: "res-cas-harwood-coch-french",
    category: "motivation_organisation",
    categoryLabel: "Dynamique de Groupe & Résistance au Changement",
    authorFilter: "Kurt Lewin & École RH",
    title: "Étude de cas : Le cas de la Harwood Manufacturing Corporation (Coch & French, 1948)",
    authors: "Lester Coch & John R. P. French Jr. (Sous l'égide de Kurt Lewin)",
    year: "1948 / 2026",
    sourceOrPublisher: "Human Relations, vol. 1, n° 4, pp. 512-532 / Document officiel Cnam",
    localFile: "Desktop/PST106/Etude de cas_Le cas Harwood.pdf",
    seanceNumber: "Séance 3",
    description:
      "Étude de cas expérimentale canonique (3 pages) issue de l'expérience historique menée à l'usine textile de Harwood en Virginie : comparaison rigoureuse de 4 groupes d'ouvrières subissant une modification technique de production. 1) Groupe de contrôle (décision unilatérale descendante imposée sans participation) : effondrement de la productivité à 50 unités, 17% de démissions, absentéisme massif et agressivité contre la maîtrise. 2) Groupe à représentation partielle (délégués élus) : retour progressif au standard antérieur. 3) Groupes à participation totale directe (toutes les ouvrières participent au design du changement et à la fixation des standards) : rebond spectaculaire à 70 unités (+14%), climat serein, 0 démission. Modélisation de la résistance au changement par la dynamique des groupes de Kurt Lewin : les normes collectives exercent une force homéostatique de rappel ; pour changer, il faut d'abord 'dégeler' la norme de groupe avant d'instaurer un nouveau consensus partagé.",
    keyTakeaway:
      "Preuve expérimentale fondatrice pour la copie d'examen : la résistance au changement n'est pas une tare psychologique individuelle de l'ouvrier, mais une force homéostatique de groupe. Si la direction impose le changement de l'extérieur sans dégel collectif, le groupe se défend en sabotant la cadence.",
    apa7Citation:
      "Coch, L., & French, J. R. P. (1948). Overcoming resistance to change. Human Relations, 1(4), 512–532.",
    tags: ["Harwood", "Coch & French", "Kurt Lewin", "Dynamique de groupe", "Résistance au changement", "Participation", "Dégel-Mouvement-Regel", "École RH"],
  },
  {
    id: "res-maslow-plaintes-niveaux",
    category: "motivation_organisation",
    categoryLabel: "Théorie des Besoins & Métaplaintes (Maslow)",
    authorFilter: "Abraham Maslow",
    title: "Les plaintes et leur niveau — Des besoins de base aux métaplaintes de perfection",
    authors: "Abraham Maslow (Texte d'étude avec questions de Corinne Prost)",
    year: "1971 / 2026",
    sourceOrPublisher: "The Farther Reaches of Human Nature (Viking Press) / Support Moodle PST106",
    localFile: "Desktop/PST106/texte sur les plaintes de Maslow.pdf",
    seanceNumber: "Séance 3",
    description:
      "Texte d'étude fondamental (6 pages) d'Abraham Maslow, traduit et annoté pour le Cnam : Maslow y bouleverse la vision managériale simpliste de sa pyramide des besoins en introduisant l'analyse clinique des 'plaintes' (gripes) au travail. Il distingue 3 niveaux hiérarchiques de récriminations : 1) Les plaintes de bas niveau (low grumbles) : survie immédiate, danger physique, froid, bruit insupportable, paie de misère. 2) Les plaintes de niveau supérieur (high grumbles) : dignité, appartenance au groupe, sécurité de l'emploi, justice relationnelle. 3) Les métaplaintes (meta-grumbles) : réclamations d'individus dont les besoins de base sont satisfaits mais qui exigent la perfection, la vérité, la beauté du geste, la justice sociale et l'efficience éthique. Le document comporte la série de 4 questions pédagogiques de Corinne Prost analysant pourquoi une entreprise sans plainte n'existe pas et pourquoi des métaplaintes sont l'indice d'une organisation en excellente santé démocratique.",
    keyTakeaway:
      "Nuance théorique d'examen cruciale : chez Maslow, l'amélioration des conditions de travail ne fait pas disparaître les plaintes, elle les élève ! Entendre des salariés se plaindre du manque de beauté ou de perfection du travail n'est pas un dysfonctionnement, c'est le signe d'un haut niveau d'accomplissement (métabesoins).",
    apa7Citation:
      "Maslow, A. H. (1971). Low grumbles, high grumbles, and meta-grumbles. Dans The farther reaches of human nature (pp. 239–248). Viking Press.",
    tags: ["Maslow", "Plaintes", "Métaplaintes", "Besoins fondamentaux", "Corinne Prost", "Perfection", "Santé organisationnelle"],
  },

  // =========================================================================
  // 4. CLINIQUE DE L'ACTIVITÉ — YVES CLOT & DÉVELOPPEMENT DU POUVOIR D'AGIR
  // =========================================================================
  {
    id: "res-clot-activite-reelle-concept",
    category: "clinique_activite_clot",
    categoryLabel: "Concept Clinique Fondateur",
    authorFilter: "Yves Clot",
    title: "Activité Réelle vs Activité Réalisée — Le statut du Réel chez Yves Clot",
    authors: "Yves Clot",
    year: "1999 / 2008",
    sourceOrPublisher: "La fonction psychologique du travail (PUF) & Travail et pouvoir d'agir",
    localFile: "Desktop/PSYCHOLOGIE/archives psycho 2nd semestre/PST106 - Clinique de l'activite/Activité Réelle.pdf",
    seanceNumber: "Séance 3 & 4",
    description:
      "La rupture conceptuelle majeure d'Yves Clot : le réel du travail ne se réduit pas à ce qui est visible et mesurable (l'activité réalisée). Le réel de l'activité comprend l'ensemble des possibles écartés, des activités suspendues, empêchées, contrariées, des gestes ébauchés puis retenus, et des compromis douloureux que le travailleur a dû négocier avec lui-même pour arriver au résultat.",
    keyTakeaway:
      "Thèse verbatim d'examen : 'Le réalisé n'a pas le monopole du réel' (Yves Clot). La fatigue et la souffrance psychique proviennent bien souvent non pas de ce que le travailleur a fait, mais de ce qu'il n'a pas pu faire selon ses critères de qualité.",
    apa7Citation:
      "Clot, Y. (2008). Travail et pouvoir d’agir. Presses Universitaires de France (Collection Le Travail Humain).",
    tags: ["Yves Clot", "Réel de l'activité", "Activité réalisée", "Activité contrariée", "Pouvoir d'agir", "Séance 3"],
  },
  {
    id: "res-clot-genre-style-metier",
    category: "clinique_activite_clot",
    categoryLabel: "Concepts Clés du Collectif Clinique",
    authorFilter: "Yves Clot",
    title: "Genre professionnel et Style personnel : L'héritage de Bakhtine et Vygotski en clinique du travail",
    authors: "Yves Clot & Daniel Faïta",
    year: "2000",
    sourceOrPublisher: "Travailler, vol. 4, pp. 7-42",
    localFile: "Desktop/PSYCHOLOGIE/archives psycho 2nd semestre/PST106 - Clinique de l'activite/Clinique de l'activité Fiche de Cours .docx",
    seanceNumber: "Séance 4 & 5",
    description:
      "Analyse de la relation dialectique entre le Genre et le Style. Le Genre professionnel est la mémoire vivante et collective du métier : l'ensemble des règles tacites, tours de main, manières de dire et de faire partagées par les pairs pour faire face aux difficultés du travail (instance transpersonnelle). Le Style personnel est la réappropriation singulière et créative du genre par un travailleur individuel pour faire face à une situation inédite. Le style nourrit et régénère le genre ; sans style, le genre se momifie en routine stérile.",
    keyTakeaway:
      "À mobiliser pour expliquer la dynamique du collectif : une équipe de travail souffre quand le genre professionnel est affaibli par le management (interdiction d'échanger, protocoles individualisés), empêchant les salariés de développer leur propre style.",
    apa7Citation:
      "Clot, Y., & Faïta, D. (2000). Genres et styles en analyse du travail : Concepts et méthodes. Travailler, 4, 7–42.",
    tags: ["Genre professionnel", "Style", "Bakhtine", "Vygotski", "Collectif", "Mémoire du métier"],
  },
  {
    id: "res-clot-4-instances-collectif",
    category: "clinique_activite_clot",
    categoryLabel: "Modélisation Théorique de l'Intervention",
    authorFilter: "Yves Clot",
    title: "Les 4 instances du collectif de travail : Personnelle, Interpersonnelle, Transpersonnelle, Impersonnelle",
    authors: "Yves Clot",
    year: "2008",
    sourceOrPublisher: "Travail et pouvoir d'agir (PUF)",
    localFile: "Desktop/PSYCHOLOGIE/archives psycho 2nd semestre/PST106 - Clinique de l'activite/Clinique de l'activité Fiche de Cours .docx",
    seanceNumber: "Séance 5",
    description:
      "Modèle structural d'Yves Clot décomposant l'activité de travail en 4 dimensions indissociables : 1) Impersonnelle (la tâche prescrite, les procédures officielles, la fiche de poste) ; 2) Personnelle (l'engagement subjectif, l'histoire et le corps du travailleur) ; 3) Interpersonnelle (les interactions directes et dialogues en situation réelle avec les collègues et usagers) ; 4) Transpersonnelle (le genre professionnel, la culture partagée du métier qui traverse les générations).",
    keyTakeaway:
      "Grille d'analyse systématique pour les études de cas : diagnostiquer quelle instance est défaillante ou étouffée lorsque des salariés entrent en conflit ou en souffrance.",
    apa7Citation:
      "Clot, Y. (2008). Les quatre instances de l’activité de travail. Dans Travail et pouvoir d’agir (pp. 75–110). PUF.",
    tags: ["4 instances", "Impersonnel", "Personnel", "Interpersonnel", "Transpersonnel", "Grille clinique"],
  },
  {
    id: "res-clot-intensification-travail",
    category: "clinique_activite_clot",
    categoryLabel: "Clinique du Travail Contemporain",
    authorFilter: "Yves Clot",
    title: "Une intensification du travail peut-elle en cacher une autre ? — Activité ravalée et tyrannies procédurales",
    authors: "Yves Clot",
    year: "2004",
    sourceOrPublisher: "Travail et Emploi, n° 99, juillet 2004, pp. 29-37 / Ministère du Travail (DARES)",
    localFile: "Desktop/PST106/Intensification au travail Clot.pdf",
    seanceNumber: "Séance 3 & 4",
    description:
      "Article magistral (7 pages) d'Yves Clot déconstruisant l'intensification moderne du travail : l'accélération quantitative n'est que la surface du problème. La véritable violence contemporaine réside dans le 'ravalement de l'activité' : les salariés sont contraints de travailler sous la dictature d'objectifs contradictoires (faire vite ET faire zéro défaut) tout en étant privés des moyens délibératifs et matériels d'y parvenir. L'activité est 'ravalée' (rabaissée au rang de simple conformité procédurale et déniée dans son épaisseur vivante). Clot montre que ce n'est pas le travail en soi qui épuise, mais le 'travail nié', l'impossibilité d'échanger avec ses pairs sur les critères du travail bien fait, produisant l'amertume et le cynisme de la qualité empêchée.",
    keyTakeaway:
      "Concept d'examen ultra-rentable : 'Une intensification en cache une autre' — l'intensification mesurée par les cadences masque l'intensification psychique causée par le ravalement de l'activité et le conflit de critères étouffé par les protocoles du lean management.",
    apa7Citation:
      "Clot, Y. (2004). Une intensification du travail peut-elle en cacher une autre ? Travail et Emploi, 99, 29–37.",
    tags: ["Yves Clot", "Intensification", "Activité ravalée", "Travail nié", "Qualité empêchée", "Travail et Emploi", "DARES"],
  },

  // =========================================================================
  // 5. MÉTHODES D'INTERVENTION CLINIQUE : SOSIE & AUTOCONFRONTATION
  // =========================================================================
  {
    id: "res-methode-instruction-sosie",
    category: "methodes_intervention",
    categoryLabel: "Méthode d'Enquête Clinique",
    authorFilter: "Yves Clot",
    title: "La méthode de l'Instruction au Sosie : Origines (Oddone) et Pratique Clinique (Clot)",
    authors: "Ivar Oddone / Yves Clot",
    year: "1981 / 2001",
    sourceOrPublisher: "Éditions Sociales / Les Cahiers de Travail et Pouvoir d'agir",
    localFile: "Desktop/PSYCHOLOGIE/archives psycho 2nd semestre/PST106 - Clinique de l'activite/Clinique de l'activité Fiche de Cours .docx",
    seanceNumber: "Séance 6",
    description:
      "Protocole détaillé de l'instruction au sosie inventé par Ivar Oddone à Turin auprès des ouvriers de Fiat, perfectionné par la clinique de l'activité. La consigne canonique : 'Suppose que je sois ton sosie et que demain je doive te remplacer à ton poste. Donne-moi toutes les instructions nécessaires pour que personne ne s'aperçoive de la supercherie'. Cette consigne force le professionnel à expliciter l'implicite du métier : les ruses, les micro-arbitrages corporels et les règles non écrites indispensables au bon fonctionnement.",
    keyTakeaway:
      "Méthode reine pour révéler le genre professionnel : permet au travailleur de transformer son vécu immédiat en objet de pensée partagée (dédoublement réflexif).",
    apa7Citation:
      "Oddone, I., Re, A., & Briante, G. (1981). Redécouvrir l’expérience ouvrière : Vers une autre psychologie du travail. Éditions Sociales. (Protocole repris par Y. Clot, 2001).",
    tags: ["Sosie", "Ivar Oddone", "Méthode", "Explicitation", "Implicite", "Fiat"],
  },
  {
    id: "res-methode-autoconfrontation-croisee",
    category: "methodes_intervention",
    categoryLabel: "Dispositif d'Intervention Vidéo",
    authorFilter: "Yves Clot",
    title: "L'Autoconfrontation Simple et Croisée : Transformer l'activité en instrument de développement",
    authors: "Yves Clot, Daniel Faïta, Gabriel Fernandez & Livia Scheller",
    year: "2001",
    sourceOrPublisher: "Revue PISTES, vol. 3, n° 1",
    localFile: "Desktop/PSYCHOLOGIE/archives psycho 2nd semestre/PST106 - Clinique de l'activite/Clinique de l'activité Fiche de Cours .docx",
    seanceNumber: "Séance 6 & 7",
    description:
      "Protocole en 4 phases : 1) Enregistrement vidéo de séquences d'activité réelle choisies avec les professionnels ; 2) Autoconfrontation simple (le professionnel visionne ses propres rushs en présence du psychologue et commente ce qu'il fait, ce qu'il pense et ce qu'il évite de faire) ; 3) Autoconfrontation croisée (deux collègues du même métier confrontent leurs manières distinctes de réaliser la même tâche) ; 4) Retour au collectif élargi. Le désaccord entre pairs fait émerger un 'conflit de critères' vivant sur le travail bien fait, stimulant le pouvoir d'agir.",
    keyTakeaway:
      "Dispositif thérapeutique et organisationnel majeur : la vidéo n'est pas un outil de surveillance mais un miroir réflexif permettant d'élargir le rayon d'action des salariés.",
    apa7Citation:
      "Clot, Y., Faïta, D., Fernandez, G., & Scheller, L. (2001). Les entretiens en autoconfrontation croisée : Une méthode en clinique de l’activité. Perspectives interdisciplinaires sur le travail et la santé, 3(1), 1–17.",
    tags: ["Autoconfrontation", "Croisée", "Vidéo", "Conflit de critères", "Développement", "PISTES"],
  },

  // =========================================================================
  // 6. ERGONOMIE (WISNER) & PSYCHODYNAMIQUE DU TRAVAIL (DEJOURS)
  // =========================================================================
  {
    id: "res-wisner-ergonomie-activite",
    category: "ergonomie_wisner",
    categoryLabel: "Ergonomie de Langue Française",
    authorFilter: "Alain Wisner",
    title: "L'Écart irréductible entre Tâche Prescrite et Activité Réelle : Le modèle ergonomique de Wisner",
    authors: "Alain Wisner, André Ombredane & Jean-Marie Faverge",
    year: "1955 / 1972",
    sourceOrPublisher: "PUF / Le Conservatoire National des Arts et Métiers",
    localFile: "Desktop/PSYCHOLOGIE/archives psycho 2nd semestre/PST106 - Clinique de l'activite/Clinique de l'activité Fiche de Cours .docx",
    seanceNumber: "Séance 2 & 3",
    description:
      "Fondement de l'ergonomie francophone : la tâche prescrite (ce que la hiérarchie commande de faire sur le papier) ne correspond jamais exactement à l'activité réelle (ce que le travailleur accomplit véritablement face aux aléas de la matière, de la machine et du temps). Le travailleur est en constante régulation cognitive et physiologique pour compenser les insuffisances de la prescription.",
    keyTakeaway:
      "À distinguer avec précision chez Wisner : si les opérateurs exécutaient les consignes à la lettre sans rien y changer, l'usine ou le bureau s'arrêterait immédiatement (définition même de la grève du zèle).",
    apa7Citation:
      "Wisner, A. (1972). Diagnostic en ergonomie ou le choix des modèles opérants en situation réelle de travail. Le Travail Humain, 35(1), 23–44.",
    tags: ["Wisner", "Tâche prescrite", "Activité réelle", "Ergonomie", "Régulation", "Grève du zèle"],
  },
  {
    id: "res-sznelwar-wisner-travailler",
    category: "ergonomie_wisner",
    categoryLabel: "Épistémologie de l'Ergonomie (Hommage à Wisner)",
    authorFilter: "Alain Wisner",
    title: "Alain Wisner : Le développement de l'ergonomie et de la pensée sur le « travailler »",
    authors: "Laerte Idal Sznelwar & Hélène Le Doaré",
    year: "2006",
    sourceOrPublisher: "Travailler, vol. 2006/1, n° 15, pp. 39-54 / Éditions Martin Média",
    localFile: "Desktop/PST106/sznelwar-2006-alain-wisner-le-developpement-de-lergonomie-et-de-la-pensee-sur-le-travailler.pdf",
    seanceNumber: "Séance 3",
    description:
      "Article d'analyse épistémologique majeure (17 pages) retraçant l'itinéraire d'Alain Wisner comme professeur au Cnam et pionnier mondial de l'ergonomie. Met en lumière la centralité de 'l'intelligence des travailleurs', la critique sévère des transferts de technologie aveugles aux pays du Sud (anthropotechnologie), et la manière dont Wisner a permis l'émancipation de la psychodynamique du travail (Dejours) et de la clinique de l'activité (Clot) en posant le travail non comme une contrainte passive mais comme un acte vivant d'engagement subjectif ('le travailler').",
    keyTakeaway:
      "À citer pour contextualiser l'ergonomie francophone : Wisner a fait passer la discipline de l'adaptation de la machine à l'homme à la reconnaissance de l'intelligence pratique de l'opérateur et à la critique sociale des conditions de production.",
    apa7Citation:
      "Sznelwar, L. I., & Le Doaré, H. (2006). Alain Wisner : Le développement de l'ergonomie et de la pensée sur le « travailler ». Travailler, 15(1), 39–54.",
    tags: ["Wisner", "Sznelwar", "Travailler", "Le travailler", "Anthropotechnologie", "Ergonomie", "Intelligence ouvrière"],
    url: "https://shs.cairn.info/revue-travailler-2006-1-page-39",
  },
  {
    id: "res-leplat-jalons-historiques",
    category: "ergonomie_wisner",
    categoryLabel: "Histoire & Psychologie Ergonomique",
    authorFilter: "Jacques Leplat & Faverge",
    title: "L'analyse psychologique du travail : quelques jalons historiques",
    authors: "Jacques Leplat",
    year: "1993",
    sourceOrPublisher: "Le Travail Humain, tome 56, n° 2-3, pp. 115-131 / PUF",
    localFile: "Desktop/PST106/Texte Leplat.pdf",
    seanceNumber: "Séance 2 & 3",
    description:
      "Texte de référence (17 pages) de Jacques Leplat, cofondateur avec Faverge de la psychologie ergonomique francophone. Retrace l'évolution séculaire de l'analyse du travail depuis Taylor, Gilbreth et Lahy jusqu'aux modèles cognitifs modernes. Leplat expose la formalisation du système opérateur-tâche, la genèse de la distinction canonique Tâche/Activité (Ombredane & Faverge 1955), et démontre comment l'analyse psychologique est passée de l'évaluation de la performance externe à la modélisation des compétences, des représentations fonctionnelles et des processus de régulation cognitive.",
    keyTakeaway:
      "Cadre théorique indispensable pour l'épreuve : Leplat formalise le schéma canonique de l'analyse du travail : les conditions d'exécution et les caractéristiques de l'opérateur déterminent l'activité réelle, laquelle produit à la fois des effets sur le système (performance) et des effets sur l'opérateur (fatigue, apprentissage, santé).",
    apa7Citation:
      "Leplat, J. (1993). L’analyse psychologique du travail : Quelques jalons historiques. Le Travail Humain, 56(2/3), 115–131.",
    tags: ["Jacques Leplat", "Analyse psychologique du travail", "Jalons historiques", "Tâche vs Activité", "Faverge", "Le Travail Humain"],
  },
  {
    id: "res-faverge-structure-travail",
    category: "ergonomie_wisner",
    categoryLabel: "Psychologie Ergonomique & Modélisation",
    authorFilter: "Jacques Leplat & Faverge",
    title: "Analyse et structure du travail de Jean-Marie Faverge — Révolution de l'analyse du travail et les 4 types d'activités",
    authors: "Jean-Marie Faverge (Analysé par Régis Ouvrier-Bonnaz)",
    year: "2011",
    sourceOrPublisher: "Perspectives interdisciplinaires sur le travail et la santé (PISTES), vol. 13, n° 1, 5 pages",
    localFile: "Desktop/PST106/pistes-2537 sur faverge.pdf",
    seanceNumber: "Séance 3",
    description:
      "Étude épistémologique (5 pages) sur l'apport révolutionnaire de Jean-Marie Faverge (1912-1988), premier titulaire de la chaire de psychologie du travail à l'Université Libre de Bruxelles après son passage au Cnam et au CERP. Faverge est le premier à dénoncer l'illusion de la psychotechnique élémentaire ('l'homme n'est pas une collection de pièces détachées') et à structurer l'analyse du travail autour de 4 dimensions fonctionnelles : 1) L'activité comme gestuelle et manipulation physique ; 2) L'activité comme prise et traitement d'informations (signaux, alertes) ; 3) L'activité comme régulation des perturbations et des aléas ; 4) L'activité comme communication et coordination collective. Ce modèle a directement inspiré le schéma des 5 carrés et la double régulation de Leplat & Cuny (1977).",
    keyTakeaway:
      "Point de cours Cnam cité mot pour mot par Pr. Lagabrielle en Séance 3 : Faverge est celui qui émancipe l'analyse du travail du carcan psychométrique en introduisant la notion de 'structure opérative' et de régulation face aux aléas.",
    apa7Citation:
      "Ouvrier-Bonnaz, R. (2011). Analyse et structure du travail de Jean-Marie Faverge. Perspectives interdisciplinaires sur le travail et la santé, 13(1), 1–5.",
    tags: ["Jean-Marie Faverge", "PISTES", "Ouvrier-Bonnaz", "4 types d'activités", "Régulation", "Structure du travail", "Ergonomie"],
    url: "https://journals.openedition.org/pistes/2537",
  },
  {
    id: "res-dejours-psychodynamique-travail",
    category: "psychodynamique_dejours",
    categoryLabel: "Psychopathologie & Psychodynamique du Travail",
    authorFilter: "Christophe Dejours",
    title: "Travail, usure mentale : De la psychopathologie à la psychodynamique du travail",
    authors: "Christophe Dejours",
    year: "1980 / 2000 (Nouvelle édition)",
    sourceOrPublisher: "Bayard Éditions",
    localFile: "Desktop/PSYCHOLOGIE/archives psycho 2nd semestre/PST106 - Clinique de l'activite/Clinique de l'activité Fiche de Cours .docx",
    seanceNumber: "Séance 7 & 8",
    description:
      "La théorisation pionnière de Christophe Dejours démontrant que la souffrance au travail n'est pas une anomalie individuelle mais le résultat de la confrontation du psychisme avec la résistance du réel. Découverte des stratégies collectives de défense (déni viril du danger dans le BTP, cynisme défensif, dérision) élaborées par les groupes de travail pour ne pas sombrer dans la peur ou la folie. Analyse du jugement d'utilité et du jugement de beauté portés par les pairs, indispensables à la sublimation.",
    keyTakeaway:
      "Opposition fondamentale avec la clinique de l'activité à maîtriser pour l'examen : Dejours analyse les défenses psychiques contre la souffrance ; Clot s'intéresse au développement du pouvoir d'agir sur l'objet.",
    apa7Citation:
      "Dejours, C. (2000). Travail, usure mentale : De la psychopathologie à la psychodynamique du travail. Bayard.",
    tags: ["Dejours", "Psychodynamique", "Souffrance", "Stratégies collectives de défense", "Sublimation", "Pairs"],
  },

  // =========================================================================
  // 7. AUDIOS & PODCASTS PÉDAGOGIQUES DU DOSSIER
  // =========================================================================
  {
    id: "res-audio-podcast-transgresser",
    category: "audio_podcasts",
    categoryLabel: "Ressource Audio de Cours",
    authorFilter: "Collectif Cnam",
    title: "Podcast Audio : Pourquoi bien travailler exige de transgresser ?",
    authors: "Conférence Clinique de l'Activité / Pr. C. Lagabrielle",
    year: "2024",
    sourceOrPublisher: "Dossier Archives Psychologie 2nd semestre",
    localFile: "Desktop/PSYCHOLOGIE/archives psycho 2nd semestre/PST106 - Clinique de l'activite/Pourquoi_bien_travailler_exige_de_transgresser.m4a",
    seanceNumber: "Séances 3 & 4",
    description:
      "Enregistrement audio analysant pourquoi la transgression raisonnée des règles formelles est la condition sine qua non de la qualité et de la sécurité réelle. Démontre que le salarié consciencieux transgresse la prescription par amour du métier et pour protéger la production ou la santé du client.",
    keyTakeaway:
      "Citation orale marquante : 'Le mauvais professionnel obéit aveuglément à la règle même quand la situation exige de l'adapter ; le bon professionnel transgresse la procédure pour en sauver l'esprit'.",
    apa7Citation:
      "Archives Cnam. (2024). Pourquoi bien travailler exige de transgresser [Document audio M4A]. PST106 Clinique de l’activité.",
    tags: ["Audio", "Podcast", "Transgression", "Règle", "Zèle", "Prescription"],
    audioUrl: "/audio/pst106/pourquoi-bien-travailler-exige-de-transgresser.m4a",
  },
  {
    id: "res-audio-podcast-iceberg",
    category: "audio_podcasts",
    categoryLabel: "Ressource Audio de Cours",
    authorFilter: "Collectif Cnam",
    title: "Podcast Audio : L'iceberg invisible du travail réel",
    authors: "Conférence Psychologie & Ergonomie Cnam",
    year: "2024",
    sourceOrPublisher: "Dossier Archives Psychologie 2nd semestre",
    localFile: "Desktop/PSYCHOLOGIE/archives psycho 2nd semestre/PST106 - Clinique de l'activite/L_iceberg_invisible_du_travail_réel.m4a",
    seanceNumber: "Séances 2 & 3",
    description:
      "Explication de la métaphore de l'iceberg dans l'évaluation de la performance : la direction ne voit et n'évalue que la partie émergée (la tâche prescrite, les indicateurs chiffrés, le reporting). Mais la solidité de l'édifice repose sur les 90% immergés de l'activité réelle invisible (solidarité informelle, astuces, gestion invisible des dysfonctionnements).",
    keyTakeaway:
      "Parfait pour appuyer une argumentation sur l'invisibilisation du travail réel par les démarches qualité néo-managériales.",
    apa7Citation:
      "Archives Cnam. (2024). L’iceberg invisible du travail réel [Document audio M4A]. PST106.",
    tags: ["Audio", "Podcast", "Iceberg", "Invisibilité", "Travail réel", "Indicateurs"],
    audioUrl: "/audio/pst106/l-iceberg-invisible-du-travail-reel.m4a",
  },

  // =========================================================================
  // 8. ANNALES OFFICIELLES CNAM : LES 8 SUJETS D'EXAMEN
  // =========================================================================
  {
    id: "res-annales-8-sujets-examen",
    category: "annales_officielles",
    categoryLabel: "Corpus Officiel d'Examen (Sessions 1 & 2)",
    authorFilter: "Pr. Christine Lagabrielle",
    title: "Les 8 Sujets d'Examen Officiels avec Texte en Support (Sujets 1 à 8)",
    authors: "Pr. Christine Lagabrielle / Cnam",
    year: "Examens réels Cnam",
    sourceOrPublisher: "Conservatoire National des Arts et Métiers",
    localFile: "Desktop/PSYCHOLOGIE/archives psycho 2nd semestre/PST106 - Clinique de l'activite/Sujet 1.pdf à Sujet 8.pdf",
    seanceNumber: "Épreuve Finale d'Examen",
    description:
      "Les 8 sujets d'examen réels de PST106 basés sur l'analyse de textes théoriques : 1) Yves Clot ('Le réalisé n'a pas le monopole du réel') ; 2) Georges Canguilhem (Le normal et le pathologique : la santé comme pouvoir de créer de nouvelles normes) ; 3) Alain Wisner (L'écart prescrit/réel en ergonomie) ; 4) Yves Clot (Le genre professionnel et le collectif) ; 5) Christophe Dejours (La souffrance au travail et les stratégies de défense) ; 6) L'instruction au sosie (Protocole et clinique) ; 7) L'autoconfrontation croisée (Le conflit de critères) ; 8) Organisation du travail et empêchement de l'activité.",
    keyTakeaway:
      "L'intégralité des 8 sujets est retranscrite et assortie d'un corrigé type et d'un plan d'examen dans l'application PST106.",
    apa7Citation:
      "Lagabrielle, C. (Éd.). (2026). Corpus des 8 sujets officiels d’examen de PST106 : Textes d’auteurs et questions d’analyse clinique. Cnam.",
    tags: ["Annales", "Sujets 1 à 8", "Canguilhem", "Clot", "Wisner", "Dejours", "Examen officiel"],
  },
];

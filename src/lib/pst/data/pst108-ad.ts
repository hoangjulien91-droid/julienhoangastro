/**
 * Activités Distantes (AD) et documents ressources officiels pour PST108
 * Articulés selon les 3 enseignants responsables :
 * 1. M. Éric LUCY (Pragmatique, Sociologie critique, Reconnaissance, Insulte, SAMU Social, 26 documents Moodle)
 * 2. M. Francis VALLS (Approche psychosociale de la communication, R. Ghiglione, D. Wolton, Exercices 1-2-3, Garfinkel, Boltanski & Thévenot)
 * 3. Mme Véronique MAROT (Sciences du langage, Théories de l'acquisition Vygotski vs Piaget, Bernard Golse, Boutet & Fraenkel)
 */

export interface Pst108Document {
  id: string;
  titre: string;
  auteur: string;
  annee: string;
  categorie:
    | "lucy"
    | "habermas"
    | "honneth"
    | "bourdieu"
    | "linguistique"
    | "organisation";
  type: string;
  fichierLocal: string;
  externalUrl?: string;
  resumePedagogique: string;
  concept18: string;
}

export interface Pst108ExerciseValls {
  id: string;
  num: number;
  titre: string;
  auteurRef: string;
  contexte: string;
  questionsOfficielles: string[];
  conceptsAPrivilegier: string[];
  modeleReponse18: {
    analyseDetaillee: string;
    pointsClesExamen: string[];
    syntheseForum: string;
  };
}

export interface Pst108CaseValls {
  id: string;
  titre: string;
  auteurRef: string;
  contexte: string;
  analyseClinique: string;
  notionCle: string;
}

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
  documentsClefs: Pst108Document[];
  exercicesDistanciel?: Pst108ExerciseValls[];
  etudesDeCas?: Pst108CaseValls[];
}

export const PST108_26_DOCUMENTS: Pst108Document[] = [
  // ── 1. ÉRIC LUCY (ENQUÊTES CLINIQUES ET TERRAIN) ─────────────────────────
  {
    id: "lucy-insulte-empan",
    titre: "Les conditions sociales de l'efficacité performative de l'insulte",
    auteur: "Éric Lucy",
    annee: "2021",
    categorie: "lucy",
    type: "Article de recherche (Revue Empan N° 123)",
    fichierLocal: "Les conditions sociales de l’efficacité performative de l’insulte Eric Lucy revue Empan.pdf",
    externalUrl: "https://www.cairn.info/revue-empan-2021-3-page-128.htm",
    resumePedagogique:
      "Éric Lucy déconstruit l'insulte en milieu institutionnel et professionnel : loin d'être une simple impulsion irrationnelle, l'injure est un acte performatif complet qui mobilise des stigmates sociaux préexistants. Lucy met en tension la « grande gueule » populaire cherchant à faire entendre une blessure morale et la « fine bouche » managériale/institutionnelle qui neutralise la dispute.",
    concept18:
      "L'insulte comme acte de dé-titution symbolique et tentative désespérée de rétablir un rapport de visibilité face au mépris institutionnel.",
  },
  {
    id: "lucy-samu-social",
    titre: "Discussion et reconnaissance en SAMU Social",
    auteur: "Éric Lucy",
    annee: "2020",
    categorie: "lucy",
    type: "Enquête clinique de terrain (Travail social)",
    fichierLocal: "Discussion et reconnaissance en SAMU Social E Lucy.pdf",
    resumePedagogique:
      "Observation participante des maraudes de nuit auprès des sans-abri. Lucy montre comment la perte de statut plonge les personnes dans une réification (Honneth) où les passants ne les regardent plus que comme des silhouettes. La parole clinique des maraudeurs (s'accroupir à hauteur de regard, saluer, demander le prénom) réhabilite la première sphère de reconnaissance morale.",
    concept18:
      "La parole soignante comme rempart contre l'invisibilisation sociale et réhabilitation intersubjective du sujet dans l'espace public.",
  },
  {
    id: "lucy-reseaux-sociaux",
    titre: "Relations éducatives et pratiques langagières des mineurs dans les réseaux sociaux",
    auteur: "Éric Lucy",
    annee: "2022",
    categorie: "lucy",
    type: "Article de recherche (Le Sociographe N° 78)",
    fichierLocal: "Relations éducatives et pratiques langagières des mineurs dans les réseaux sociaux Éric Lucy Sociographe 2022 (N° 78).pdf",
    externalUrl: "https://www.cairn.info/revue-le-sociographe-2022-2-page-77.htm",
    resumePedagogique:
      "Analyse des cyber-interactions entre adolescents et éducateurs spécialisés. Lucy examine la transformation des actes de langage par l'écrit numérique instantané (emojis, argot codé, stories). La médiation numérique déplace le cadre institutionnel et exige des professionnels une nouvelle pragmatique de l'écoute sans intrusion.",
    concept18:
      "Pragmatique de la communication médiatisée et maintien du tiers symbolique dans la relation d'aide dématérialisée.",
  },

  // ── 2. JÜRGEN HABERMAS (AGIR COMMUNICATIONNEL & DÉLIBÉRATION) ─────────────
  {
    id: "habermas-factualite-validite",
    titre: "Entre factualité et validité : L'entente comme médium de l'intégration sociale",
    auteur: "Jürgen Habermas",
    annee: "1992 / 1997",
    categorie: "habermas",
    type: "Ouvrage philosophique majeur (Droit et démocratie)",
    fichierLocal: "Habermas Entre factualité et validité l’entente comme médium de l’intégration sociale. Caractéristiques du droit.htm",
    resumePedagogique:
      "Habermas conceptualise la tension indépassable entre la 'factualité' (la contrainte empirique du pouvoir d'État et de l'argent) et la 'validité' (l'idéal émancipateur des prétentions normatives). Le droit moderne agit comme le transformateur qui traduit les exigences délibératives du monde vécu (Lebenswelt) en règles coercitives légitimes.",
    concept18:
      "Tension constitutive Factualité / Validité et fonction du droit positif moderne comme stabilisateur de l'entente intersubjective.",
  },
  {
    id: "habermas-verite-justification",
    titre: "Vérité et justification : Essais philosophiques",
    auteur: "Jürgen Habermas",
    annee: "2001",
    categorie: "habermas",
    type: "Article théorique (Revue Raisons Politiques N° 2)",
    fichierLocal: "Habermas vérité et justification.pdf",
    externalUrl: "https://www.cairn.info/revue-raisons-politiques-2001-2-page-217.htm",
    resumePedagogique:
      "Habermas précise sa théorie de la vérité : une assertion n'est pas vraie simplement parce qu'elle est justifiée dans un contexte donné. La prétention à la vérité transcende les contextes locaux de justification ; elle vise un assentiment rationnel universel au sein d'une communauté idéale de communication.",
    concept18:
      "Distinction décisive entre 'justification contextuelle' et 'vérité inconditionnelle' dans l'agir communicationnel.",
  },
  {
    id: "habermas-effet-philosophie-francaise",
    titre: "L'effet Habermas dans la philosophie et sociologie française",
    auteur: "Gérard Raulet & Collectif",
    annee: "1995 / 2005",
    categorie: "habermas",
    type: "Étude critique (Revue des Sciences Humaines)",
    fichierLocal: "L’EFFET HABERMAS DANS LA PHILOSOPHIE FRANÇAISE.pdf",
    resumePedagogique:
      "Analyse de la réception contrastée de Habermas en France. Confrontation féconde avec la sociologie de la critique (Boltanski & Thévenot) et la théorie de la régulation. Met en relief comment le modèle habermassien a permis de dépasser le déterminisme sociologique strict sans tomber dans l'individualisme méthodologique.",
    concept18:
      "Hybridation entre l'éthique délibérative habermassienne et les cités de justification (Boltanski & Thévenot).",
  },
  {
    id: "ethique-discussion-performance",
    titre: "L'éthique de la discussion au service de la performance organisationnelle",
    auteur: "Collectif Chercheurs en Gestion & Travail",
    annee: "2016",
    categorie: "habermas",
    type: "Recherche en management & ergonomie",
    fichierLocal: "Léthique de la discussion au service de la performance organisationnelle.pdf",
    resumePedagogique:
      "Application concrète des 4 prétentions à la validité d'Habermas (intelligibilité, vérité objective, justesse normative, sincérité subjective) aux réunions de concertation en entreprise. Démontre que la délibération authentique sur le travail réel réduit drastiquement les dysfonctionnements opérationnels et les risques psychosociaux.",
    concept18:
      "L'agir communicationnel comme vecteur direct de fiabilité organisationnelle contre les dérives de l'agir instrumental aveugle.",
  },
  {
    id: "habermas-france-culture",
    titre: "Jürgen Habermas : Philosophe et théoricien des sciences sociales",
    auteur: "France Culture (Émission audio)",
    annee: "Archives",
    categorie: "habermas",
    type: "Émission radio & ressource pédagogique",
    fichierLocal: "France culture  Jürgen Habermas  Philosophe et théoricien des sciences sociales France culture.docx",
    externalUrl: "https://www.franceculture.fr/personne/jurgen-habermas",
    resumePedagogique:
      "Panorama biographique et intellectuel de Jürgen Habermas, héritier de la première génération de l'École de Francfort (Adorno, Horkheimer). Explication du tournant linguistique et du remplacement de la raison instrumentale par la raison communicationnelle.",
    concept18:
      "La raison communicationnelle comme projet inachevé des Lumières et antidote au totalitarisme technocratique.",
  },

  // ── 3. AXEL HONNETH (THÉORIE DE LA RECONNAISSANCE & DU MÉPRIS) ───────────
  {
    id: "honneth-esquisse-reconnaissance",
    titre: "La théorie de la reconnaissance : une esquisse",
    auteur: "Axel Honneth",
    annee: "2004",
    categorie: "honneth",
    type: "Article fondateur (Revue du MAUSS N° 23)",
    fichierLocal: "LA THÉORIE DE LA RECONNAISSANCE UNE ESQUISSE par Axel Honneth.msg",
    resumePedagogique:
      "Synthèse canonique des 3 sphères de la reconnaissance morale : 1. L'Amour (confiance en soi / intégrité physique) · 2. Le Droit (respect de soi / égalité citoyenne) · 3. La Solidarité et le Travail (estime de soi / valeur sociale de l'activité). À ces trois sphères correspondent les trois blessures du mépris social (sévices corporels, déni de droits, dévalorisation du travail).",
    concept18:
      "Le triptyque Confiance en soi / Respect de soi / Estime de soi comme fondement normatif de la santé psychologique au travail.",
  },
  {
    id: "honneth-epistemologie",
    titre: "Épistémologie de la reconnaissance : De Hegel aux sciences sociales contemporaines",
    auteur: "Axel Honneth",
    annee: "2000 / 2002",
    categorie: "honneth",
    type: "Article théorique (Revue de métaphysique et de morale)",
    fichierLocal: "Honneth epistémologie de la reconnaissance.pdf",
    resumePedagogique:
      "Honneth revisite la dialectique hégélienne du maître et de l'esclave à l'Université d'Iéna (1805) et l'enrichit de la psychologie sociale de George Herbert Mead. L'identité d'un être humain n'est jamais autarcique : elle est constitutivement vulnérable au regard d'autrui et dépendante d'une confirmation intersubjective.",
    concept18:
      "L'intersubjectivité première : autrui n'est pas un obstacle mais la condition d'accès à la conscience de soi.",
  },
  {
    id: "honneth-societe-du-mepris",
    titre: "La Société du mépris : Vers une nouvelle Théorie critique",
    auteur: "Franck Fonteneau (Analyse de l'œuvre d'Axel Honneth)",
    annee: "2008",
    categorie: "honneth",
    type: "Note de lecture critique et commentaire",
    fichierLocal: "axel-honneth-la-societe-du-mepris par F Fonteneau.pdf",
    resumePedagogique:
      "Exposé détaillé des thèses de 'La Société du mépris'. Honneth soutient que le moteur des luttes sociales n'est pas seulement l'intérêt matériel ou la lutte des classes au sens marxiste, mais l'expérience morale de l'injustice et de l'humiliation subie au quotidien dans les institutions et le travail.",
    concept18:
      "Les sentiments moraux négatifs (honte, indignation, colère) comme moteurs psychiques de la contestation collective.",
  },
  {
    id: "honneth-france-culture",
    titre: "Axel Honneth : La lutte pour la reconnaissance",
    auteur: "France Culture (Émission audio-visuelle)",
    annee: "2013",
    categorie: "honneth",
    type: "Entretien audio/vidéo",
    fichierLocal: "Axel Honneth - La lutte pour la reconnaissance France culture.docx",
    externalUrl: "https://www.youtube.com/watch?v=8GZyK8Oy58k",
    resumePedagogique:
      "Entretien avec Axel Honneth sur la genèse de son œuvre et les défis du néo-libéralisme contemporain. Honneth y analyse comment l'individualisation des performances et l'évaluation permanente détruisent la solidarité ouvrière et privent les salariés d'une reconnaissance mutuelle entre pairs.",
    concept18:
      "L'évaluation quantitative néomanagériale comme dispositif de brouillage de l'estime sociale collective.",
  },
  {
    id: "honneth-guibentif-droit",
    titre: "Reconnaissance et complexité sociale : Deux approches de la réalité juridique",
    auteur: "Pierre Guibentif",
    annee: "2008",
    categorie: "honneth",
    type: "Article de sociologie du droit (Droit et Société)",
    fichierLocal: "Reconnaissance et complexité sociale. Deux approches de la réalité juridique.pdf",
    resumePedagogique:
      "Comparaison rigoureuse entre la vision procédurale du droit chez Habermas et la théorie substantive de la reconnaissance chez Honneth. Guibentif démontre que le droit n'est pas seulement un régulateur systémique : il est l'espace où s'inscrivent historiquement les conquêtes des groupes sociaux dominés en quête de dignité légale.",
    concept18:
      "La sphère juridique comme cristallisation des victoires morales contre les discriminations institutionnelles.",
  },

  // ── 4. PIERRE BOURDIEU (POUVOIR DES MOTS & MARCHÉ LINGUISTIQUE) ──────────
  {
    id: "bourdieu-echanges-linguistiques",
    titre: "L'économie des échanges linguistiques",
    auteur: "Pierre Bourdieu",
    annee: "1977 / 1982",
    categorie: "bourdieu",
    type: "Article séminal (Revue Langue Française N° 34)",
    fichierLocal: "Bourdieu Léconomie des échanges linguistiques.pdf",
    externalUrl: "https://doi.org/10.3406/lfr.1977.4815",
    resumePedagogique:
      "Texte fondateur repris dans 'Ce que parler veut dire'. Bourdieu y démontre que la communication n'est jamais un simple échange d'informations entre locuteurs égaux. La parole s'exerce sur un marché linguistique où chaque énoncé tire son prix du capital linguistique et social de celui qui le profère. L'autorité réside hors de la langue, dans l'institution sociale.",
    concept18:
      "Critique de l'illusion internaliste d'Austin : la force illocutoire découle des mandats institutionnels, pas des mots eux-mêmes.",
  },
  {
    id: "hanley-lit-justice",
    titre: "Le lit de justice des rois de France",
    auteur: "Sarah Hanley & Delphine Dulong",
    annee: "1991 / 1992",
    categorie: "bourdieu",
    type: "Article de sociologie politique (Revue Politix N° 17)",
    fichierLocal: "lit de justice Hanley.pdf",
    externalUrl: "https://doi.org/10.3406/polix.1992.1496",
    resumePedagogique:
      "Analyse historique et sociologique du rituel du 'lit de justice' sous l'Ancien Régime. Lorsque le roi se déplace en personne devant le Parlement récalcitrant, sa présence physique fait cesser instantanément toute délibération des magistrats : l'enregistrement des lois se fait sous la contrainte du corps souverain. Archétype de l'acte d'institution étatique.",
    concept18:
      "L'intervention hiérarchique brutale dans une organisation comme résurgence moderne du rituel royal du lit de justice.",
  },
  {
    id: "bourdieu-video-apostrophe",
    titre: "Ce que parler veut dire : Entretien avec Bernard Pivot (Apostrophes)",
    auteur: "Pierre Bourdieu",
    annee: "1982",
    categorie: "bourdieu",
    type: "Archive télévisuelle INA / Apostrophes",
    fichierLocal: "Bourdieu Ce que parler veut dire vidéo Apostrophe.docx",
    externalUrl: "https://video-streaming.orange.fr/actu-politique/pierre-bourdieu-presente",
    resumePedagogique:
      "Bourdieu explique en direct à la télévision pourquoi les dominés participent souvent à leur propre domination en reconnaissant comme légitime la langue des dominants. Il y décrit le trac de l'orateur d'origine populaire, la peur du faux pas grammatical et le mécanisme insidieux de la censure intériorisée.",
    concept18:
      "La violence symbolique : une violence invisible consentie par ceux-là mêmes qui la subissent à travers les schèmes linguistiques dominants.",
  },
  {
    id: "bourdieu-video-jt",
    titre: "Ce que parler veut dire : Interview au Journal Télévisé",
    auteur: "Pierre Bourdieu",
    annee: "1982",
    categorie: "bourdieu",
    type: "Archive télévisuelle Journal Télévisé",
    fichierLocal: "Bourdieu  Ce que parler veut dire vidéo Journal TV.docx",
    externalUrl: "https://www.youtube.com/watch?v=kxGZHT0f9UY",
    resumePedagogique:
      "Court entretien télévisé vulgarisant la notion d'inégalité des capitaux linguistiques. Bourdieu y montre avec humour comment les manières de prononcer ou d'articuler fonctionnent comme des passeports de classe fermant ou ouvrant les portes du marché du travail.",
    concept18:
      "L'accent et le débit verbal comme marqueurs de classe et révélateurs d'un arbitrage inégal sur le marché linguistique.",
  },

  // ── 5. LINGUISTIQUE, ETHNOLOGIE & SCIENCES HUMAINES ───────────────────────
  {
    id: "sapir-ethnolinguistique",
    titre: "Sapir et l'ethnolinguistique : Les frontières du langage et de la culture",
    auteur: "Edward Sapir (Présenté dans Langages, Persée)",
    annee: "1970",
    categorie: "linguistique",
    type: "Article scientifique (Revue Langages N° 18, Persée)",
    fichierLocal: "Article Revue PerséeSapir et lethnolinguistique (2).docx",
    externalUrl: "https://www.persee.fr/doc/lgge_0458-726x_1970_num_5_18_2025?q=ethnolinguistique",
    resumePedagogique:
      "Présentation de la célèbre hypothèse de Sapir-Whorf (relativisme linguistique) : la structure d'une langue détermine la manière dont ses locuteurs perçoivent, catégorisent et conceptualisent le monde environnant. Le langage n'est pas un calque passif du réel mais un moule de l'expérience vécue.",
    concept18:
      "L'hypothèse Sapir-Whorf : le lexique et la grammaire comme grilles de catégorisation culturelle et perceptive du monde.",
  },
  {
    id: "levi-strauss-structuralisme",
    titre: "Claude Lévi-Strauss et le structuralisme anthropologique",
    auteur: "Claude Lévi-Strauss (Archive INA)",
    annee: "1960 / Archive",
    categorie: "linguistique",
    type: "Vidéo pédagogique INA (2 min 47)",
    fichierLocal: "Vidéo INA 2mn47 Claude Levi Strauss et le structuralisme.docx",
    externalUrl: "http://www.ina.fr/video/I06292956",
    resumePedagogique:
      "Lévi-Strauss explique comment l'anthropologie a appliqué les méthodes de la linguistique saussurienne aux structures de parenté et aux mythes. La prohibition universelle de l'inceste fonctionne exactement comme la règle de la phonologie : elle substitue l'échange symbolique réglé à l'état de nature brut.",
    concept18:
      "La culture comme vaste réseau d'échange symbolique fondé sur le modèle de la langue (Lévi-Strauss).",
  },
  {
    id: "chomsky-college-de-france",
    titre: "Interpretation and Understanding: Language and Beyond",
    auteur: "Noam Chomsky",
    annee: "2010",
    categorie: "linguistique",
    type: "Conférence magistrale (Collège de France)",
    fichierLocal: "Vidéo Noam Chomsky Collège de France .docx",
    externalUrl: "https://www.college-de-france.fr/fr/agenda/guest-lecturer/interpretation-and-understanding-language-and-beyond",
    resumePedagogique:
      "Chomsky développe sa théorie de la grammaire universelle et de la faculté de langage innée. Il démontre que la créativité linguistique humaine (capacité infinie de générer des phrases nouvelles à partir d'un ensemble fini de règles) ne peut s'expliquer par le seul conditionnement behavioriste ou l'imitation sociale.",
    concept18:
      "La grammaire générative chomskyenne et l'innéité de la faculté de langage contre le béhaviorisme skinnérien.",
  },
  {
    id: "enthoven-philosophie-langage",
    titre: "Le Langage : Philosophie et énigmes du sens",
    auteur: "Raphaël Enthoven (Philosophie)",
    annee: "Émission TV / Web",
    categorie: "linguistique",
    type: "Vidéo philosophique en deux parties",
    fichierLocal: "Vidéo Philosophie Enthoven Raphaël  Le langage.docx",
    externalUrl: "http://www.dailymotion.com/video/xau63j_langage-1-2_webcam",
    resumePedagogique:
      "Parcours philosophique abordant le paradoxe du Cratyle de Platon (le mot ressemble-t-il à la chose ou est-il pure convention ?), le solipsisme de Ludwig Wittgenstein et l'impossibilité d'un langage strictement privé.",
    concept18:
      "L'arbitraire du signe saussurien et la dissolution du mythe de la nomination naturelle (Cratyle vs Hermogène).",
  },
  {
    id: "traduire-interpreter-sante",
    titre: "Traduire et interpréter en situations sociales : santé et éducation",
    auteur: "Collectif Langage et Société",
    annee: "2015",
    categorie: "linguistique",
    type: "Recherche en sociolinguistique (Revue Langage et Société N° 153)",
    fichierLocal: "Article Traduire et interpréter en situations sociales  santé, éd.docx",
    externalUrl: "https://www.cairn.info/revue-langage-et-societe-2015-3.htm",
    resumePedagogique:
      "Enquête sur l'interprétariat médico-social auprès des migrants et des publics allophones. Montre que l'interprète en milieu de santé n'est jamais un simple dictionnaire bilingue mécanique : il effectue un travail clinique de médiation interculturelle pour négocier la compréhension des symptômes et des thérapeutiques.",
    concept18:
      "L'interprétariat social comme médiation dialogique et co-construction du sens en situation asymétrique.",
  },

  // ── 6. ORGANISATION, TRAVAIL & DÉLIBÉRATION (AFFAIRE FRANCE TÉLÉCOM...) ──
  {
    id: "france-telecom-lemonde",
    titre: "Ce que le changement veut dire : Le procès France Télécom et le mépris organisationnel",
    auteur: "Le Monde (Article d'analyse managériale)",
    annee: "04 octobre 2022",
    categorie: "organisation",
    type: "Chronique économique & sociologie du travail",
    fichierLocal: "Ce que le changement veut dire Le Monde du Le 04 octobre 2022.docx",
    externalUrl: "https://www.lemonde.fr/emploi/article/2022/10/04/les-dirigeants-de-france-telecom-se-sont-mepris-sur-ce-que-changer-une-organisation-veut-dire_6144262_1698637.html",
    resumePedagogique:
      "Retour sur le jugement historique pour harcèlement moral institutionnel de l'ex-direction de France Télécom (Orange). L'article montre comment un plan managérial abstrait ('Act' et 'Next' visant 22 000 départs) fondé sur la violence verbale délibérée (« par la fenêtre ou par la porte ») et le mépris de l'expérience professionnelle a brisé l'estime de soi des techniciens.",
    concept18:
      "Le harcèlement moral institutionnel comme déni systématique des 3 sphères de reconnaissance (Honneth) et perversion destructrice de la communication managériale.",
  },
  {
    id: "philorama-audio-lucy",
    titre: "Les enjeux sociaux du langage : De la domination symbolique à l'entente",
    auteur: "Radio RAM05 (Émission Philorama avec Éric Lucy)",
    annee: "2011",
    categorie: "organisation",
    type: "Document sonore radiophonique (44 minutes)",
    fichierLocal: "Audio Philorama 44mn Les enjeux sociaux du langage(2).docx",
    externalUrl: "https://ram05.fr/podcasts/philorama/le-langage-2011",
    resumePedagogique:
      "Masterclass radiophonique de 44 minutes explorant la manière dont le vocabulaire managérial euphémise la souffrance au travail (ex: 'collaborateur' au lieu de salarié, 'plan de sauvegarde' au lieu de licenciement). Éric Lucy explicite le pont entre Bourdieu (violence symbolique) et Habermas (reconstruction d'espaces de dispute réglée).",
    concept18:
      "L'euphémisation managériale et la novlangue d'entreprise comme capture instrumentale du langage.",
  },
  {
    id: "philosophie-developpement-orga",
    titre: "Philosophie et développement organisationnel : Dialectique, agir communicationnel et dialogue",
    auteur: "Collectif Cairn Management & Organisation",
    annee: "2018",
    categorie: "organisation",
    type: "Article de recherche (Revue Recherches en Sciences de Gestion)",
    fichierLocal: "Philosophie et développement organisationnel Dialectique, agir communicationnel, délibération et dialogue Cairn.info.htm",
    resumePedagogique:
      "Modélisation de l'intervention en entreprise articulant la dialectique hégélienne et l'agir communicationnel habermassien. Démontre comment un consultant ou psychologue du travail peut transformer les conflits destructeurs en controverses dialogiques constructives grâce à la délibération sur les critères du travail bien fait.",
    concept18:
      "La dispute professionnelle réglée (au sens d'Yves Clot) adossée à l'éthique de la discussion d'Habermas.",
  },
  {
    id: "gout-des-autres-intentions",
    titre: "Le goût des autres : Sociologie des intentions et intentions sociologiques",
    auteur: "Fabien Trécourt (PUF)",
    annee: "2015",
    categorie: "organisation",
    type: "Étude sociologique (Revue Sociologie)",
    fichierLocal: "LE GOÛT DES AUTRES SOCIOLOGIE DES INTENTIONS ET INTENTIONS.pdf",
    resumePedagogique:
      "Étude des justifications subjectives et des intentions que les acteurs attribuent à leurs partenaires de travail. Montre que les malentendus au sein d'une équipe proviennent rarement d'une incapacité technique, mais de l'attribution asymétrique de mauvaises intentions aux collègues lorsque le cadre communicationnel est défaillant.",
    concept18:
      "L'attribution causale des intentions et la fragilité du monde commun d'arrière-plan partagé (Habermas).",
  },
];

// ── EXERCICES DISTANCIELS EXCLUSIFS DE M. FRANCIS VALLS ─────────────────────
export const VALLS_EXERCICES_DISTANCIEL: Pst108ExerciseValls[] = [
  {
    id: "valls-ex1-khan",
    num: 1,
    titre: "Tableau de R.L. KAHN (1958) : Perception de soi vs Perception du subordonné",
    auteurRef: "Robert L. Kahn (Human relations on the shop floor, 1958)",
    contexte:
      "Grande entreprise industrielle des années 50 aux États-Unis sur chaîne de production. Trois statuts : Ouvriers, Contremaîtres, Chefs d'atelier. Évolution de carrière par ancienneté. On demande à chacun : 'Pourquoi venez-vous travailler ?' (ordre de 1 à 5). Puis on demande aux Chefs d'atelier d'estimer les réponses des Contremaîtres, et aux Contremaîtres d'estimer celles des Ouvriers.",
    questionsOfficielles: [
      "Selon vous, quel a été l'ordre des réponses données par les Chefs d'atelier aux Contremaîtres et par les Contremaîtres aux Ouvriers ?",
      "Argumentez votre choix en mobilisant les processus de rationalisation, de justification et les représentations-conduites.",
    ],
    conceptsAPrivilegier: [
      "Biais d'attribution causale fondamentale (Heider & Ross)",
      "Processus de rationalisation et justification (Boltanski & Thévenot)",
      "Représentations-conduites et stéréotypes statutaires",
      "Théorie bifactorielle de Herzberg (Facteurs moteurs intrinsèques vs Facteurs d'hygiène extrinsèques)",
    ],
    modeleReponse18: {
      analyseDetaillee:
        "Dans l'expérience princeps de R.L. Kahn, les résultats mettent en évidence une asymétrie perceptive systématique : les ouvriers et contremaîtres placent en réalité en tête l'ambiance d'équipe, l'intérêt du travail et la reconnaissance (facteurs intrinsèques). En revanche, la hiérarchie (chefs d'atelier pour les contremaîtres, et contremaîtres pour les ouvriers) leur attribue un classement purement vénal et alimentaire : 1. Le salaire, 2. La sécurité de l'emploi.\n\nCe phénomène s'explique par le biais d'attribution fondamentale et la rationalisation statutaire : l'encadrement justifie sa propre autorité en s'attribuant le monopole du souci de l'entreprise et des finalités nobles, tout en réduisant le subordonné à un 'homo oeconomicus' sans conscience professionnelle. Cette fausse représentation engendre des pratiques managériales infantilisantes fondées sur la prime financière plutôt que sur l'écoute du travail réel.",
      pointsClesExamen: [
        "Inversion systématique : ce qu'on s'attribue à soi (intérêt, estime) est dénié au subordonné (réduit au salaire).",
        "La justification managériale crée une prophétie autoréalisatrice de désengagement.",
        "Lien direct avec la théorie IOD : la hiérarchie projette une employabilité déficitaire sur le travailleur.",
      ],
      syntheseForum:
        "【Exercice 1 - R.L. Kahn (Francis Valls)】\nOrdre attribué aux subordonnés : 1. Salaire / 2. Sécurité de l'emploi / 3. Horaires / 4. Ambiance / 5. Intérêt du travail.\nArgumentation : Processus de rationalisation statutaire et biais d'attribution externe. Les cadres s'accordent des motivations intrinsèques (sens du devoir, reconnaissance) mais réduisent leurs subordonnés à une motivation instrumentale et vénale. Ce décalage bloque le contrat de communication authentique et légitime un management coercitif.",
    },
  },
  {
    id: "valls-ex2-gout-des-autres",
    num: 2,
    titre: "Extrait vidéo (3 min 21) : « Le goût des autres » (Agnès Jaoui, 2000)",
    auteurRef: "Rodolphe Ghiglione (Contrat de communication) vs Pierre Bourdieu (La Distinction, 1979)",
    contexte:
      "Castella (Jean-Pierre Bacri), chef d'entreprise autodidacte, invite la troupe de théâtre de Clara (Anne Alvaro) dans un bar-restaurant. Il tente maladroitement de s'intégrer à leur univers artistique et intellectuel, mais se heurte au mépris poli, aux rires étouffés et à la condescendance des comédiens.",
    questionsOfficielles: [
      "Lecture 1 (Ghiglione) : Proposez une analyse des relations intergroupes à l'aide du Contrat de communication (enjeux, pertinence, réciprocité, influence).",
      "Lecture 2 (Bourdieu) : Analysez la saynète avec les concepts de Distinction, capital culturel/symbolique et capital économique (cf. émission Les Chemins de la philosophie par Gisèle Sapiro).",
      "Laquelle des deux lectures a votre préférence et en quoi pour le psychologue du travail ?",
    ],
    conceptsAPrivilegier: [
      "Contrat de communication (R. Ghiglione, 1986) : rupture de pertinence et de réciprocité",
      "Intralocuteurs et Situation Potentiellement Communicative (S.P.C.)",
      "Capital économique vs Capital culturel légitime (P. Bourdieu, 1979)",
      "Violence symbolique et mépris de classe (Gisèle Sapiro / Axel Honneth)",
      "Incommunication structurelle (Dominique Wolton)",
    ],
    modeleReponse18: {
      analyseDetaillee:
        "1. Lecture selon Rodolphe Ghiglione : La scène illustre l'échec d'instauration du contrat de communication. Castella vient avec un enjeu relationnel affectif (séduire, plaire), tandis que la troupe a un enjeu de préservation d'entre-soi corporatiste. La règle de réciprocité est rompue : quand Castella raconte sa blague ou tente un commentaire esthétique, les artistes ne co-construisent pas le sens ; ils invalident ses énoncés par des silences gênés ou des ricanements. La situation n'est pas communicative, elle est un piège interactif.\n\n2. Lecture selon Pierre Bourdieu : Castella dispose d'un fort capital économique, mais il est dépourvu du capital culturel légitime (codes de la critique théâtrale, manières de table, humour distancié). Les artistes exercent sur lui une violente domination symbolique : son goût est disqualifié comme 'populaire' et 'kitsch'.\n\n3. Arbitrage pour le psychologue : La lecture bourdieusienne est indispensable pour repérer les lignes de faille sociologiques et les rapports de pouvoir invisibles dans une organisation. Cependant, la grille de Ghiglione est l'outil opératoire direct du psychologue : elle permet d'intervenir concrètement sur les tours de parole, de rétablir les règles de réciprocité et de transformer l'incommunication en contrat de travail partagé.",
      pointsClesExamen: [
        "Ghiglione dissèque la micro-mécanique interactionnelle de la rupture contractuelle.",
        "Bourdieu explicite l'asymétrie structurelle des capitaux qui rend cette rupture presque inévitable.",
        "L'incommunication (D. Wolton) : la proximité physique ne crée pas la compréhension mutuelle.",
      ],
      syntheseForum:
        "【Exercice 2 - Le goût des autres (Francis Valls)】\nAnalyse croisée Ghiglione / Bourdieu :\n- Ghiglione : Rupture du contrat de communication. Enjeux incompatibles (désir d'inclusion de Castella vs clôture corporatiste des artistes), non-réciprocité dans les tours de parole et refus de co-construction de la référence.\n- Bourdieu : Domination symbolique pure. Castella tente de convertir son capital économique en reconnaissance culturelle, mais se heurte à la violence de la 'Distinction' esthétique.\n- Préférence clinique : Complémentarité dialectique. Bourdieu fournit le diagnostic macro-social ; Ghiglione fournit le levier micro-clinique pour réparer l'interlocution.",
    },
  },
  {
    id: "valls-ex3-corps-voix",
    num: 3,
    titre: "Texte & Questions : Corps, gestes et voix dans la communication",
    auteurRef: "Rodolphe Ghiglione (L'homme communiquant, 1986, Chapitre 2) & G.N. Fischer",
    contexte:
      "Analyse des composantes non-verbales et para-verbales de la situation d'interlocution : le paralangage (voix, intonation, pauses, rires, soupirs) et le langage du corps (posture, mimiques, regard, proxémique et gestion des distances).",
    questionsOfficielles: [
      "Volet 1 (La voix et le paralangage) : Illustrez par une ou deux situations vécues ou observées en contexte professionnel l'impact des variations prosodiques et des silences.",
      "Volet 2 (Le corps, les gestes et l'espace) : Illustrez l'effet des postures physiques et de la distance proxémique dans la négociation ou l'entretien.",
    ],
    conceptsAPrivilegier: [
      "Paralangage et signaux prosodiques (timbre, volume, hésitations, rires de connivence)",
      "Proxémique (Edward T. Hall : distance intime, personnelle, sociale, publique)",
      "Kinésique et synchronie posturale (postures fermées vs postures en miroir)",
      "Communication circulaire et transactions simultanées (Jean-Claude Abric)",
      "Caricature de Bretécher (1988) : dissociation totale entre le dire verbal et le montrer corporel",
    ],
    modeleReponse18: {
      analyseDetaillee:
        "La communication verbale ne transmet qu'une fraction du message : le corps et la voix constituent la modalité d'attestation de la sincérité de l'énoncé.\n\nVolet 1 - Le paralangage au travail : Dans un entretien annuel d'évaluation, le silence prolongé d'un collaborateur après l'annonce de ses objectifs n'est pas une absence de réponse : c'est un acte de parole négatif signifiant l'impossibilité de contester sans risque. De même, l'accélération du débit ou une voix blanche trahit une situation de stress intense face à une consigne floue.\n\nVolet 2 - Le corps et l'espace (Proxémique) : Comme le montre la caricature de Claire Bretécher (1988), un manager disant verbalement « Tu sais que tu peux compter sur moi » tout en restant debout, les bras croisés, le corps orienté vers la sortie, produit une injonction paradoxale. Le récepteur traite prioritairement le message corporel de fuite et de désengagement.",
      pointsClesExamen: [
        "Le corps ne peut pas ne pas communiquer (1er axiome de l'École de Palo Alto / Watzlawick).",
        "La congruence ou l'incongruence entre le verbal et le non-verbal fonde la confiance relationnelle.",
        "Rôle du psychologue : observer les micro-ruptures posturales comme indices d'une souffrance non dite.",
      ],
      syntheseForum:
        "【Exercice 3 - Corps, gestes et voix (Francis Valls)】\nVolet 1 : Le silence et la prosodie en situation d'entretien fonctionnent comme des régulateurs d'alliance ou de retrait défensif.\nVolet 2 : L'alignement postural et la gestion proxémique conditionnent l'ouverture du contrat de communication. Tout décalage entre la parole prescriptive bienveillante et l'attitude corporelle de fermeture (ex: manager pressé) détruit la crédibilité de l'échange.",
    },
  },
];

// ── ÉTUDES DE CAS CLINIQUES DE M. FRANCIS VALLS ─────────────────────────────
export const VALLS_ETUDES_DE_CAS: Pst108CaseValls[] = [
  {
    id: "valls-cas1-berlinguer",
    titre: "La Scène Berlinguer : Sauvetage du Contrat de Communication par Déplacement",
    auteurRef: "Rodolphe Ghiglione (L'homme communiquant, 1986, p. 213)",
    contexte:
      "Altercation intellectuelle entre deux professeurs d'université : P1 affirme 'Berlinguer triche', P2 rétorque vivement 'Non, Berlinguer ne triche pas'. La controverse menace de rompre définitivement l'échange et la collaboration de recherche.",
    analyseClinique:
      "P1 désamorce la rupture par une opération de déconstruction / reconstruction paradigmatique : il substitue au terme moralement infamant 'tricher' le terme technique et neutre 'masquage' ('déplacement d'un acteur en place d'argument'). Dès que P1 précise que ce terme n'a aucune connotation morale, P2 valide ('Ah ! comme ça, je suis d'accord'). Ce n'est pas seulement un jeu de politesse ou de sauvetage de la face au sens de Goffman, mais la co-construction d'un nouveau monde de référence commun pour permettre au contrat de communication d'aboutir.",
    notionCle:
      "Co-construction de la référence par déplacement d'équivalent paradigmatique et technicisation du discours.",
  },
  {
    id: "valls-cas2-dallas",
    titre: "Une communication fatale : Analyse conversationnelle d'un appel au SAMU (Dallas 1984)",
    auteurRef: "Harold Garfinkel (Ethnométhodologie) & Analyse séquentielle des tours de parole",
    contexte:
      "Enregistrement audio réel de 3 minutes d'un appel d'urgence aux pompiers/ambulances de Dallas. L'appelant (C) est affolé par l'agonie de sa belle-mère ; l'infirmière régulatrice (N) et le superviseur (S) exigent des réponses protocolaires standardisées. L'échange dérape en invectives mutuelles ; l'ambulance n'est pas dépêchée et la patiente décède.",
    analyseClinique:
      "L'interaction met en lumière la rupture dramatique du 'script' d'urgence. Le service d'urgence fonctionne sur un script implicite en 3 phases : 1. Localisation/Requête, 2. Dispatching/Vérification, 3. Clôture/Confirmation d'envoi. Dès la réplique 04 ('Si je le savais, je ne vous aurais pas appelé'), l'appelant refuse le rôle passif de questionné. L'infirmière et son supérieur basculent alors d'une 'logique de service' (secourir) vers une 'logique de dispute et de défense de face' ('Restez poli avec moi', 'Si vous jurez une fois de plus, je raccroche'). L'engrenage interactionnel conduit à la non-assistance mortelle.",
    notionCle:
      "Glissement d'une logique de service vers une logique de dispute : rigidité du script institutionnel et aveuglement émotionnel.",
  },
  {
    id: "valls-cas3-cms",
    titre: "Quand les mots échouent : Premier accueil en Maison Départementale de Solidarité (MDSI)",
    auteurRef: "Clinique de l'intervention sociale & Analyse conversationnelle",
    contexte:
      "Accueil de Mme U, femme sans domicile, alcoolisée et en détresse, par une assistante sociale (AS) accompagnée d'une stagiaire silencieuse (L). Mme U demande de l'aide pour un logement et un emploi pour revoir sa fille.",
    analyseClinique:
      "L'assistante sociale applique un cadrage institutionnel rigide : face à l'urgence globale de la bénéficiaire, elle oppose une fin de non-recevoir immédiate sur l'emploi ('Je ne peux pas répondre à votre demande d'emploi') et segmente artificiellement le problème en proposant l'addictologie et le 115. Mme U perçoit cette orientation comme un rejet stigmatisant et se replie dans le silence avant de fuir en claquant la porte. L'échec provient de la non-reconnaissance de la demande subjective et de l'incapacité de l'institution à co-construire un contrat d'accueil provisoire.",
    notionCle:
      "Rupture de la relation d'aide par assignation déficitaire prématurée (antithèse de la posture d'accueil inconditionnel).",
  },
  {
    id: "valls-cas4-conventions",
    titre: "L'Économie des Conventions et l'Affaire des Fûts Bosselés en Atelier",
    auteurRef: "Luc Boltanski & Laurent Thévenot (De la Justification, 1991) + Ève Chiapello",
    contexte:
      "Dispute dans un atelier métallurgique entre un chef d'atelier et un ouvrier qualifié à propos de fûts de production cabossés et de rebuts de matière.",
    analyseClinique:
      "Le chef d'atelier argumente au nom du Monde Industriel (productivité, cadence, normes techniques de conformité) et du Monde Marchand (coût unitaire, rentabilité). L'ouvrier réplique au nom du Monde Domestique (tradition de métier, transmission du savoir-faire) et du Monde de l'Inspiration (astuce d'atelier pour contourner une matière première défectueuse). Le conflit est insoluble tant que les acteurs ne s'accordent pas sur un principe supérieur commun pour forger un compromis légitime entre les mondes.",
    notionCle:
      "La pluralité des 6+1 Cités de justification (Boltanski & Thévenot) et la recherche de compromis légitimes au travail.",
  },
];

export const PST108_AD_DATA: Record<"lucy" | "valls" | "marot", Pst108TeacherAd> = {
  lucy: {
    prof: "M. Éric LUCY",
    role: "Sociologue clinicien, enseignant au Cnam",
    moodleUrl: "https://naq.moodle.lecnam.net/course/view.php?id=8822&sectionid=68124",
    moodleSectionId: "68124 (Dossier ressources mod_folder 412621)",
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
    documentsClefs: PST108_26_DOCUMENTS,
  },

  valls: {
    prof: "M. Francis VALLS",
    role: "Praticien et théoricien de la communication & de l'insertion psychosociale",
    moodleUrl: "https://naq.moodle.lecnam.net/course/view.php?id=8822&sectionid=68130",
    moodleSectionId: "68130 (Activités & Exercices 1, 2, 3)",
    themeGeneral: "Approche psychosociale de la communication, Contrat de communication (Ghiglione), Incommunication (Wolton) & Évaluation du travail",
    slideMasterclass: {
      oeuvreArt: "Le Contrat de Communication & le Schéma Systémique",
      annee: "1986 / 1999",
      titre: "Dépassement du modèle télégraphique (Shannon & Weaver) vers l'interlocution co-construite",
      axes: [
        {
          num: 1,
          titre: "De la transmission d'information (Shannon 1949) au Contrat de Communication (Ghiglione 1986)",
          description:
            "Communiquer ne saurait se réduire au transport d'un message d'un émetteur vers un récepteur passif à travers un canal parasité de bruits. Communiquer est une transaction conjointe, circulaire et simultanée (Abric 1999) régie par un contrat symbolique.",
          notionsCles: [
            "Critique radicale du modèle télégraphique unilatéral de Shannon & Weaver (1949).",
            "Les 4 conditions du Contrat de Communication : enjeu partagé, situation potentiellement communicative (S.P.C.), reconnaissance mutuelle des interlocuteurs, intralocuteurs.",
            "L'interlocution comme activité structurellement instable et fragile, soumise en permanence aux jeux de validations et non-validations.",
          ],
          auteurs: ["Rodolphe Ghiglione", "Jean-Claude Abric", "Claude Shannon", "Warren Weaver"],
        },
        {
          num: 2,
          titre: "L'incommunication constitutive et la pluralité des mondes (Wolton, Boltanski & Thévenot)",
          description:
            "Contrairement à l'illusion technologique moderne, plus il y a d'outils d'information, plus le risque d'incommunication s'accroît. La rencontre de travail met aux prises des mondes de justification hétérogènes qui exigent un compromis délibéré.",
          notionsCles: [
            "Dominique Wolton : 'Communiquer, c'est négocier l'incommunication'.",
            "Les 6+1 Cités de justification (Boltanski & Thévenot) : Civique, Industrielle, Marchande, Domestique, Opinion, Inspiration, Par Projet.",
            "Les disputes d'atelier : confrontation des 'grandeurs' et recours aux objets pour stabiliser l'accord.",
          ],
          auteurs: ["Dominique Wolton", "Luc Boltanski", "Laurent Thévenot", "Ève Chiapello"],
        },
        {
          num: 3,
          titre: "L'analyse conversationnelle et les scripts d'interaction au travail (Harold Garfinkel)",
          description:
            "L'ethnométhodologie montre que la vie sociale repose sur des 'allants de soi' et des scripts conversationnels invisibles. Lorsque le script est rompu (appels d'urgence, accueil social), la communication dérive vers le conflit de face destructeur.",
          notionsCles: [
            "Les 'allants de soi' et l'indexicalité du langage (Harold Garfinkel).",
            "Analyse séquentielle des tours de parole : alternance, paires adjacentes, réparations.",
            "Glissement d'une logique de service vers une logique de dispute et de défense de la face (Goffman).",
          ],
          auteurs: ["Harold Garfinkel", "Erving Goffman", "Harvey Sacks", "Emanuel Schegloff"],
        },
      ],
    },
    documentsClefs: [
      {
        id: "valls-ghiglione-livre",
        titre: "L'homme communiquant : Le contrat de communication",
        auteur: "Rodolphe Ghiglione",
        annee: "1986",
        categorie: "organisation",
        type: "Ouvrage fondamental de psychosociologie (Armand Colin)",
        fichierLocal: "1. R. GHIGLIONE - Le contrat de communication 2.odt / 3 - GHIGLIONE Rodolphe.pptx",
        resumePedagogique:
          "Théorisation complète du Contrat de Communication. Démontre que deux interlocuteurs ne peuvent échanger que s'ils partagent un enjeu commun dans une Situation Potentiellement Communicative (S.P.C.). Analyse le dialogue comme une co-construction instable de références et examine la scène Berlinguer.",
        concept18:
          "Le Contrat de Communication de Ghiglione : enjeu commun, intralocuteurs et co-construction de la référence par déplacement.",
      },
      {
        id: "valls-garfinkel-analyse-conversationnelle",
        titre: "L'Analyse conversationnelle et les scripts d'urgence (Dallas 1984)",
        auteur: "Harold Garfinkel & Francis Valls",
        annee: "1984 / 2020",
        categorie: "organisation",
        type: "Étude clinique de transcription audio",
        fichierLocal: "CNAM PST 108. CONSIGNES POUR EXERCICES 1 2 et 3 1 docx / Situation A Une communication fatale",
        resumePedagogique:
          "Décryptage de l'appel d'urgence mortel au SAMU de Dallas. Montre comment l'infirmière régulatrice s'enferme dans un script bureaucratique rigide qui heurte l'angoisse de l'appelant, transformant une mission de secours vitale en duel d'amour-propre destructeur.",
        concept18:
          "Rupture du script interactionnel et engrenage mortel de la logique de dispute sur la logique de service.",
      },
      {
        id: "valls-boltanski-thevenot-conventions",
        titre: "De la Justification : Les économies de la grandeur et les disputes en atelier",
        auteur: "Luc Boltanski, Laurent Thévenot & Ève Chiapello",
        annee: "1991 / 1999",
        categorie: "organisation",
        type: "Ouvrage de sociologie économique (Gallimard)",
        fichierLocal: "1- CNAM- PLAN - Langage et travail .odt / L'économie des conventions",
        resumePedagogique:
          "Grille d'analyse des 7 mondes de justification (Inspiration, Domestique, Opinion, Civique, Marchand, Industriel, Par Projet). Appliquée à l'altercation des fûts bosselés en atelier pour illustrer comment forger un compromis durable entre logique marchande et fierté de métier.",
        concept18:
          "Les 6+1 Cités de Boltanski & Thévenot : identification des grandeurs et négociation de compromis légitimes au travail.",
      },
      {
        id: "valls-savpjj-evaluations",
        titre: "Évaluations des effets des pratiques éducatives sur l'estime de soi (Convention SAVPJJ)",
        auteur: "Francis Valls (IRTSA) & Denis Castra (Convention DDPJJ)",
        annee: "2008",
        categorie: "organisation",
        type: "Rapport de recherche évaluative en travail social",
        fichierLocal: "1. EVALUATIONS SAVPJJ.odp",
        resumePedagogique:
          "Enquête clinique auprès de la Protection Judiciaire de la Jeunesse (PJJ 40). Modélise comment mesurer rigoureusement l'impact des éducateurs sur l'estime de soi et le sens du passage à l'acte des mineurs sans réduire l'humain à des indicateurs gestionnaires stériles.",
        concept18:
          "L'évaluation clinique des pratiques de relation d'aide : apprécier l'immatériel sans dérive technocratique.",
      },
    ],
    exercicesDistanciel: VALLS_EXERCICES_DISTANCIEL,
    etudesDeCas: VALLS_ETUDES_DE_CAS,
  },

  marot: {
    prof: "Mme Véronique MAROT",
    role: "Enseignante-chercheuse, spécialiste du langage et du développement",
    moodleUrl: "https://naq.moodle.lecnam.net/course/view.php?id=8822&sectionid=68135",
    moodleSectionId: "68135 (Webconférence 22/10 & AD 04/11)",
    themeGeneral: "Sciences du langage, développement de la pensée, sémiotique & Clinique du dialogue (Vygotski, Piaget, Clot)",
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
        categorie: "organisation",
        type: "Ouvrage de sociolinguistique (Réseau CNRS)",
        fichierLocal: "Plan du cours_PST 108_Veronique-MAROT_2026-27.docx / Langage et Travail",
        resumePedagogique:
          "Démontre que le langage dans l'atelier ou le bureau tertiaire n'est jamais un simple code informatif : il est l'outil, le produit et l'enjeu des rapports sociaux dans le travail réel.",
        concept18:
          "Dimension située et multimodale du langage au travail.",
      },
    ],
  },
};

/**
 * Activités Distantes (AD) et 26 documents ressources officiels pour PST108
 * Articulés selon les 3 enseignants responsables :
 * 1. M. Éric LUCY (Pragmatique, Sociologie critique, Reconnaissance, Insulte, SAMU Social)
 * 2. M. Francis VALLS (Clinique de l'insertion, Méthode IOD, refus du tri préalable)
 * 3. Mme Véronique MAROT (Sciences du langage, Vygotski vs Piaget, Golse, Boutet & Fraenkel)
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
        categorie: "organisation",
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
        categorie: "organisation",
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

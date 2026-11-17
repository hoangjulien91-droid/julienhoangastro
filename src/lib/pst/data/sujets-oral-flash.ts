export interface SujetOralFlash {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst123" | "pst120" | "pst124";
  titre: string;
  question: string;
  dureeConseilleeSec: number;
  motsClesObligatoires: string[];
  reponseIdealeSynthese: string;
}

export const SUJETS_ORAL_FLASH: SujetOralFlash[] = [
  {
    id: "oral-clot-genre",
    moduleKey: "pst106",
    titre: "Genre Professionnel & Style (Yves Clot)",
    question:
      "Expliquez en 2 minutes la distinction entre genre professionnel et style individuel en clinique de l'activité.",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "mémoire impersonnelle",
      "style",
      "genre",
      "collectif",
      "pouvoir d'agir",
      "controverse",
    ],
    reponseIdealeSynthese:
      "Le genre professionnel est la mémoire impersonnelle du métier, un mot d'ordre tacite partagé sans lequel l'action individuelle se délite. Le style est la façon singulière dont un opérateur s'approprie le genre pour laisser sa marque, sans réinventer le travail à zéro.",
  },
  {
    id: "oral-leplat-regulation",
    moduleKey: "pst106",
    titre: "Régulation & Écart Prescrit/Réel (Leplat & Hoc)",
    question:
      "Résumez le modèle de régulation ergonomique de Jacques Leplat et Jean-Marie Hoc.",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "tâche prescrite",
      "activité réelle",
      "compromis opératoire",
      "conditions internes",
      "conditions externes",
      "effets",
    ],
    reponseIdealeSynthese:
      "L'activité n'est pas le décalque passif de la tâche : elle est un compromis opératoire permanent entre les exigences externes de la production et les conditions internes du travailleur (fatigue, savoirs d'expérience), produisant des effets sur l'homme et sur le système.",
  },
  {
    id: "oral-valls-iod",
    moduleKey: "pst108",
    titre: "La Méthode d'Intervention IOD (Francis Valls)",
    question:
      "Pourquoi la démarche IOD refuse-t-elle tout tri préalable des demandeurs d'emploi ?",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "non-tri",
      "travail réel",
      "visite de poste",
      "suivi bilatéral",
      "accueil",
      "ségrégation",
    ],
    reponseIdealeSynthese:
      "L'intervention IOD refuse le tri préalable parce que la sélection sur CV opère comme un filtre d'éviction sociale. Elle déplace l'action vers l'analyse du travail réel en entreprise et la sécurisation des conditions d'accueil via un suivi bilatéral médiatisé.",
  },
  {
    id: "oral-buhler-organon",
    moduleKey: "pst108",
    titre: "L'Organon du Langage (Karl Bühler)",
    question:
      "Présentez les 3 fonctions du modèle de l'Organon du langage de Karl Bühler.",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "organon",
      "expression",
      "appel",
      "représentation",
      "émetteur",
      "récepteur",
    ],
    reponseIdealeSynthese:
      "Le langage est un instrument reliant trois pôles : l'émetteur (fonction expressive ou symptôme), le récepteur (fonction d'appel ou signal) et les objets du monde (fonction de représentation ou symbole).",
  },
  {
    id: "oral-dubar-transaction",
    moduleKey: "pst123",
    titre: "La Double Transaction Identitaire (Claude Dubar)",
    question:
      "Définissez la double transaction identitaire selon Claude Dubar et citez ses 4 formes.",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "transaction biographique",
      "transaction relationnelle",
      "pour soi",
      "pour autrui",
      "promotion",
      "blocage",
    ],
    reponseIdealeSynthese:
      "L'identité est le produit de la transaction biographique (pour soi dans le temps) et de la transaction relationnelle (pour autrui dans l'espace social), débouchant sur les 4 formes identitaires : promotion, blocage, conversion et exclusion.",
  },
  {
    id: "oral-sainsaulieu-pouvoir",
    moduleKey: "pst123",
    titre: "Les 4 Modèles de Pouvoir au Travail (Renaud Sainsaulieu)",
    question:
      "Citez et caractérisez les 4 modèles relationnels de culture d'entreprise de Renaud Sainsaulieu.",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "fusionnel",
      "négociation",
      "affinitaire",
      "retrait",
      "pouvoir",
      "dépendance",
    ],
    reponseIdealeSynthese:
      "Sainsaulieu identifie 4 cultures de pouvoir : le modèle fusionnel (OS, camaraderie défensive), le modèle de négociation (techniciens/cadres, démocratie industrielle), le modèle affinitaire (réseaux d'intérêts sélectifs) et le modèle de retrait (travail alimentaire hors-travail).",
  },
  {
    id: "oral-120-souffrance-ethique-care",
    moduleKey: "pst120",
    titre: "Souffrance Éthique & Invisibilité du Care (Dejours / Molinier)",
    question:
      "Expliquez en 2 minutes comment l'évaluation individualisée génère de la souffrance éthique (Dejours) et pourquoi Pascale Molinier critique le prisme viril des défenses collectives.",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "Dejours",
      "souffrance éthique",
      "évaluation",
      "reconnaissance",
      "jugement de beauté",
      "Molinier",
      "care",
      "virilité",
    ],
    reponseIdealeSynthese:
      "Chez Dejours, l'évaluation individualisée brise la solidarité horizontale et pousse le sujet à trahir les règles du métier, provoquant une souffrance éthique par compromission morale et privation du jugement de beauté des pairs. Molinier complète cette analyse en montrant que la focalisation sur les défenses viriles occulte les habiletés discrètes du care portées majoritairement par les femmes.",
  },
  {
    id: "oral-124-genese-acceptation",
    moduleKey: "pst124",
    titre:
      "Genèse Instrumentale & Acceptation Située (Rabardel / Bobillier-Chaumon)",
    question:
      "Présentez en 2 minutes la différence entre artefact et instrument (Rabardel) et pourquoi la clinique de l'usage (Bobillier-Chaumon) préfère l'acceptation située à l'acceptabilité a priori.",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "Rabardel",
      "artefact",
      "instrument",
      "instrumentation",
      "instrumentalisation",
      "Bobillier",
      "acceptation située",
      "capacitant",
    ],
    reponseIdealeSynthese:
      "Selon Rabardel, l'outil prescrit n'est qu'un artefact neutre qui ne devient un instrument qu'à travers une genèse instrumentale couplant l'instrumentation (évolution des schèmes du sujet) et l'instrumentalisation (adaptation de l'artefact). Bobillier-Chaumon dépasse ainsi les modèles d'acceptabilité a priori (TAM) pour évaluer l'acceptation située : l'outil est-il réellement capacitant pour le pouvoir d'agir et le collectif ?",
  },
  {
    id: "oral-wisner-taylorisme",
    moduleKey: "pst106",
    titre: "L'Anthropotechnologie & Critique du Taylorisme (Alain Wisner)",
    question:
      "Expliquez en 2 minutes pourquoi Alain Wisner affirme que « l'homme n'est pas un système programmable » face au modèle taylorien du One Best Way.",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "Wisner",
      "taylorisme",
      "variabilité",
      "conception",
      "compromis",
      "anthropotechnologie",
    ],
    reponseIdealeSynthese:
      "Wisner démontre que l'ingénieur ne peut pas tout prévoir : l'opérateur réel présente une variabilité inter- et intra-individuelle irréductible. Si les travailleurs appliquaient strictement la prescription sans ajustement, le système s'effondrerait. L'anthropotechnologie exige d'adapter le travail à l'homme et non l'inverse.",
  },
  {
    id: "oral-habermas-agir",
    moduleKey: "pst108",
    titre: "Agir Communicationnel vs Agir Stratégique (Jürgen Habermas)",
    question:
      "Distinguez en 2 minutes l'agir stratégique de l'agir communicationnel chez Habermas, et donnez son application en situation de travail.",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "Habermas",
      "agir communicationnel",
      "agir stratégique",
      "entente",
      "validité",
      "monde vécu",
    ],
    reponseIdealeSynthese:
      "L'agir stratégique est orienté vers le succès unilatéral et l'efficacité calculée, où autrui est traité comme un moyen d'influence. L'agir communicationnel vise l'entente rationnelle désintéressée à travers la discussion libre, soumise aux prétentions à la validité (vérité, justesse, sincérité, intelligibilité).",
  },
  {
    id: "oral-becker-deviance",
    moduleKey: "pst123",
    titre: "Théorie de l'Étiquetage & Déviance au Travail (Howard Becker)",
    question:
      "Expliquez en 2 minutes pourquoi selon Becker « la déviance n'est pas une qualité de l'acte » et comment se forge la carrière morale du déviant.",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "Becker",
      "étiquetage",
      "déviance",
      "entrepreneurs de morale",
      "stigmate",
      "réaction sociale",
    ],
    reponseIdealeSynthese:
      "Pour Becker, la déviance est le produit d'une transaction sociale : un acte n'est déviant que parce qu'un groupe d'entrepreneurs de morale lui applique une étiquette et sanctionne l'auteur. L'intériorisation de ce stigmate pousse le sujet vers la déviance secondaire et transforme son identité pour autrui.",
  },
  {
    id: "oral-leguillant-telephonistes",
    moduleKey: "pst120",
    titre:
      "Névrose des Téléphonistes & Clinique Situationnelle (Louis Le Guillant)",
    question:
      "Présentez en 2 minutes l'étude pionnière de Louis Le Guillant sur les téléphonistes du central (1956) et sa portée psychopathologique.",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "Le Guillant",
      "téléphonistes",
      "névrose professionnelle",
      "situationnelle",
      "cadences",
      "chronomètre",
    ],
    reponseIdealeSynthese:
      "En 1956, Le Guillant étudie les opératrices du central téléphonique et montre que leurs troubles anxieux et vertiges ne sont pas des tares individuelles, mais la réponse normale d'un organisme sain à une situation pathogène créée par le minutage policier des communications et l'absence de pause.",
  },
  {
    id: "oral-stiegler-pharmakon",
    moduleKey: "pst124",
    titre: "Le Pharmakon Technologique & Prolétarisation (Bernard Stiegler)",
    question:
      "Expliquez en 2 minutes le concept de Pharmakon chez Bernard Stiegler appliqué aux technologies numériques et à l'intelligence artificielle au travail.",
    dureeConseilleeSec: 120,
    motsClesObligatoires: [
      "Stiegler",
      "Pharmakon",
      "poison",
      "remède",
      "prolétarisation",
      "savoirs",
    ],
    reponseIdealeSynthese:
      "Pour Stiegler, toute technique est un Pharmakon : à la fois le poison qui dépossède le travailleur de son savoir-faire (prolétarisation cognitive) et le remède qui peut démultiplier sa pensée et son pouvoir d'agir s'il conserve la maîtrise éthique et le débat sur les finalités de l'outil.",
  },
];

export const TICS_LANGAGE_ORAL = [
  { label: "euh", regex: /\beuh+\b/gi },
  { label: "du coup", regex: /\bdu coup\b/gi },
  { label: "en fait", regex: /\ben fait\b/gi },
  { label: "voilà", regex: /\bvoilà\b/gi },
  { label: "genre", regex: /\bgenre\b/gi },
  { label: "en gros", regex: /\ben gros\b/gi },
  { label: "ben / bah", regex: /\b(ben|bah)\b/gi },
];

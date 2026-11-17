export interface SujetExamenCNAM {
  id: string;
  moduleKey:
    | "pst106"
    | "pst108"
    | "pst123"
    | "pst120"
    | "pst124"
    | "transversal";
  titre: string;
  enonce: string;
  dureeConseilleeHeures: number;
  conceptsAttendus: string[];
  auteursAttendus: string[];
  planConseille: string[];
}

export interface VignetteCliniqueTerrain {
  id: string;
  label: string;
  paragraphe: string;
}

export const SUJETS_EXAMEN_S1: SujetExamenCNAM[] = [
  {
    id: "s-106-tache-activite",
    moduleKey: "pst106",
    titre: "Écart Tâche / Activité & Qualité Empêchée",
    enonce:
      "« Si le travailleur se contentait d'appliquer les consignes prescrites, l'organisation s'effondrerait. » À partir de vos connaissances en clinique de l'activité et en ergonomie, analysez les fonctions psychologiques et productives de l'écart entre le travail prescrit et le travail réel.",
    dureeConseilleeHeures: 3,
    conceptsAttendus: [
      "Tâche prescrite vs Activité réelle (Wisner, Leplat)",
      "Variabilité interne et externe",
      "Compromis opératoire & régulation",
      "Genre professionnel & Style (Clot)",
      "Activité contrariée & travail empêché",
    ],
    auteursAttendus: [
      "Alain Wisner",
      "Jacques Leplat",
      "Yves Clot",
      "Ivar Oddone",
      "Georges Canguilhem",
    ],
    planConseille: [
      "I. L'écart prescrit/réel comme condition productive et cognitive vitale (Wisner, Leplat, compromis opératoire)",
      "II. Quand l'écart est dénié : du travail empêché à l'usure de la santé mentale et du collectif (Clot, genre professionnel)",
    ],
  },
  {
    id: "s-108-reconnaissance-mepris",
    moduleKey: "pst108",
    titre: "Reconnaissance, Mépris & Souffrance au Travail",
    enonce:
      "En quoi le déni de reconnaissance dans les organisations managériales modernes constitue-t-il une atteinte à la santé mentale des salariés ? Vous vous appuierez sur la psychologie sociale clinique et les théories de la reconnaissance.",
    dureeConseilleeHeures: 3,
    conceptsAttendus: [
      "Mépris social (Axel Honneth)",
      "Jugement d'utilité vs Jugement de beauté (Dejours)",
      "Idéologie gestionnaire & reporting (Gaulejac)",
      "Souffrance éthique & trahison de soi",
      "Défenses collectives & pacte dénégatif (Kaës)",
    ],
    auteursAttendus: [
      "Axel Honneth",
      "Christophe Dejours",
      "Vincent de Gaulejac",
      "René Kaës",
      "Eugène Enriquez",
    ],
    planConseille: [
      "I. La reconnaissance comme pivot de l'intégrité subjective et de la santé (Honneth, Dejours)",
      "II. Les pathologies du déni : emprise gestionnaire, souffrance éthique et défenses collectives (Gaulejac, Kaës)",
    ],
  },
  {
    id: "s-123-dubar-transaction",
    moduleKey: "pst123",
    titre: "La Construction des Identités Professionnelles",
    enonce:
      "« L'identité professionnelle n'est jamais donnée d'emblée, elle est une transaction permanente entre soi et autrui. » Discutez cette affirmation à partir des modèles de Claude Dubar et de Renaud Sainsaulieu.",
    dureeConseilleeHeures: 3,
    conceptsAttendus: [
      "Double transaction biographique vs relationnelle (Dubar)",
      "Actes d'attribution vs Actes d'appartenance",
      "4 formes identitaires (Promotion, Blocage, Conversion, Exclusion)",
      "Modèles culturels de pouvoir (Sainsaulieu : Fusion, Négociation, Affinitaire, Retrait)",
      "Socialisation secondaire & monde du travail",
    ],
    auteursAttendus: [
      "Claude Dubar",
      "Renaud Sainsaulieu",
      "Pierre Bourdieu",
      "Erving Goffman",
      "Max Weber",
    ],
    planConseille: [
      "I. La matrice identitaire de Dubar : dialectique entre histoire personnelle et assignations institutionnelles",
      "II. L'épreuve des relations de pouvoir dans l'entreprise selon Sainsaulieu : 4 cultures de socialisation politique",
    ],
  },
  {
    id: "s-120-psychodynamique-care",
    moduleKey: "pst120",
    titre: "Normalité Souffrante, Souffrance Éthique & Invisibilité du Care",
    enonce:
      "« Entre l'organisation prescrite du travail et la maladie mentale s'interpose l'énigme de la normalité souffrante. » À partir des travaux de Christophe Dejours et de Pascale Molinier, analysez comment les collectifs se défendent contre la souffrance et à quelles conditions celle-ci peut être sublimée en plaisir et en santé.",
    dureeConseilleeHeures: 3,
    conceptsAttendus: [
      "Normalité souffrante & stratégies collectives de défense (Dejours)",
      "Intelligence pratique (Mètis) & espace de délibération",
      "Dynamique de reconnaissance : jugement d'utilité vs jugement de beauté",
      "Souffrance éthique & évaluation individualisée des performances",
      "Travail de care, habiletés discrètes & critique de l'idéologie virile (Molinier)",
    ],
    auteursAttendus: [
      "Christophe Dejours",
      "Pascale Molinier",
      "Louis Le Guillant",
      "Claude Veil",
      "Georges Canguilhem",
    ],
    planConseille: [
      "I. De la souffrance créatrice à la sublimation : intelligence pratique (Mètis), espace déontique et dynamique de reconnaissance (Dejours)",
      "II. Les impasses de la défense et du déni : idéologie virile, invisibilisation du care (Molinier) et souffrance éthique face à l'évaluation individualisée",
    ],
  },
  {
    id: "s-124-numerique-acceptation",
    moduleKey: "pst124",
    titre:
      "Numérisation du Travail, Genèse Instrumentale & Clinique de l'Usage",
    enonce:
      "« Les outils numériques transforment l'activité humaine bien au-delà de la simple efficacité technique : ils reconfigurent les collectifs et le rapport au réel. » Discutez les apports de Pierre Rabardel (genèse instrumentale) et de Pascal Bobillier-Chaumon (acceptation située) pour analyser les mutations contemporaines du travail.",
    dureeConseilleeHeures: 3,
    conceptsAttendus: [
      "Artefact vs Instrument & Genèse instrumentale (Rabardel)",
      "Instrumentation (évolution des schèmes) vs Instrumentalisation (adaptation de l'outil)",
      "Acceptabilité a priori vs Acceptation située (Bobillier-Chaumon)",
      "Environnements capacitants vs technologies délétères (Falzon, Bobillier-Chaumon)",
      "Prolétarisation des savoirs & Pharmakon (Stiegler)",
    ],
    auteursAttendus: [
      "Pierre Rabardel",
      "Pascal Bobillier-Chaumon",
      "Bernard Stiegler",
      "Pierre Falzon",
      "Yves Clot",
    ],
    planConseille: [
      "I. De l'artefact neutre à l'instrument situé : la dialectique de la genèse instrumentale et ses ruses (Rabardel, Stiegler)",
      "II. Évaluer le numérique par le réel : l'acceptation située face aux risques de charge mentale et de travail empêché (Bobillier-Chaumon, Falzon)",
    ],
  },
  {
    id: "s-transversal-pouvoir-agir",
    moduleKey: "transversal",
    titre: "Épreuve Transversale RNCP 7 — Le Pouvoir d'Agir du Psychologue",
    enonce:
      "Montrez en quoi la psychologie du travail, loin d'être un simple instrument d'adaptation de l'homme à l'organisation, constitue une clinique politique et praxéologique de restauration du pouvoir d'agir. Vous croiserez les perspectives ergonomique, psychosociologique et identitaire.",
    dureeConseilleeHeures: 3,
    conceptsAttendus: [
      "Pouvoir d'agir & développement du métier (Clot)",
      "Espaces de controverse professionnelle",
      "Rupture avec le fonctionnalisme adaptatif (Lhuilier)",
      "Déontologie & Indépendance du praticien (Code 2021)",
      "Médiation & Intervention IOD non sélective (Valls)",
    ],
    auteursAttendus: [
      "Yves Clot",
      "Dominique Lhuilier",
      "Francis Valls",
      "Claude Dubar",
      "Christophe Dejours",
    ],
    planConseille: [
      "I. Le refus de la psychotechnique réparatrice : du travailleur instrumentalisé au sujet de l'activité (Wisner, Clot, Lhuilier)",
      "II. Dispositifs cliniques d'émancipation : controverses sur la qualité du travail, médiation sans sélection et éthique d'intervention (Valls, Code 2021)",
    ],
  },
];

export const VIGNETTES_CLINIQUES_TERRAIN: VignetteCliniqueTerrain[] = [
  {
    id: "ehpad-soin",
    label: "EHPAD · Soin empêché",
    paragraphe:
      "\n[Illustration clinique — EHPAD & Qualité empêchée] : Prenons le cas d'aides-soignantes en EHPAD soumises à une prescription minutée (12 minutes par toilette). Face à la variabilité réelle des résidents (douleur, angoisse, démence), l'opératrice doit opérer un compromis opératoire permanent (Leplat, 1997). Lorsque l'organisation interdit de prendre le temps d'apaiser un résident pour tenir la cadence chiffrée, le soin relationnel — cœur du genre professionnel (Clot, 1999) — devient une activité empêchée, générant une souffrance éthique (Dejours, 1998) liée au sentiment de maltraitance institutionnelle.\n",
  },
  {
    id: "logistique-voice",
    label: "Logistique · Guidage vocal",
    paragraphe:
      "\n[Illustration clinique — Logistique & Voice Picking] : Dans un entrepôt logistique régi par la commande vocale algorithmique (Voice Picking), la tâche prescrite dicte chaque pas et chaque geste à la seconde près. En supprimant les marges de manœuvre et les échanges latéraux entre préparateurs, ce dispositif d'idéologie gestionnaire (Gaulejac, 2005) détruit les régulations collectives et rabat l'activité sur une exécution solitaire, provoquant à la fois des troubles musculo-squelettiques (TMS) par amputation du style moteur (Clot) et une crise d'identité d'exclusion (Dubar, 1991).\n",
  },
  {
    id: "centre-appels",
    label: "Centre d'appels · Script imposé",
    paragraphe:
      "\n[Illustration clinique — Centre d'appels & Travail émotionnel] : Chez les téléconseillers soumis à un script langagier strict et à une durée moyenne de traitement (DMT) affichée en temps réel sur écran, l'écart entre le script prescrit et la détresse réelle de l'usager oblige le salarié à bricoler dans la clandestinité pour résoudre véritablement la demande. Si le management n'évalue que le respect formel du script (jugement d'utilité tronqué) sans reconnaître l'ingéniosité mobilisée (jugement de beauté des pairs, Dejours), le sujet subit un déni de reconnaissance (Honneth, 2000) qui érode son pouvoir d'agir.\n",
  },
  {
    id: "industrie-reorg",
    label: "Industrie · Réorganisation Lean",
    paragraphe:
      "\n[Illustration clinique — Maintenance industrielle & Crise identitaire] : Lors du passage d'une régie technique historique à une organisation en flux tendu (Lean Management), des techniciens de maintenance expérimentés voient leurs savoir-faire de métier (diagnostic fin, prévention des pannes) remplacés par du reporting standardisé. Au sens de Dubar (1991), la transaction relationnelle est rompue : l'acte d'attribution managérial (« exécutant polyvalent interchangeable ») entre en conflit frontal avec l'acte d'appartenance biographique (« homme de métier garant de la fiabilité »), précipitant le collectif du modèle de la négociation vers le retrait (Sainsaulieu, 1977).\n",
  },
];

export const LOCAL_STORAGE_EXAM_DRAFT = "pst_chrono_examen_draft_s1_v1";

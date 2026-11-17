export interface PiegeLangageItem {
  motifRegex: RegExp;
  termeDetecte: string;
  explication: string;
  remplacementRecommande: string;
  remplacementDirect: string;
}

export const PIEGES_PSYCHOLOGISATION: PiegeLangageItem[] = [
  {
    motifRegex: /résistance\s+au\s+changement/gi,
    termeDetecte: "Résistance au changement",
    explication:
      "Terme managérial condescendant qui disqualifie la parole des salariés. En ergonomie et clinique, le refus du changement est une défense légitime du métier.",
    remplacementRecommande:
      "« stratégie collective de préservation des règles de l'art et du travail bien fait » ou « attachement au genre professionnel »",
    remplacementDirect: "défense légitime du genre professionnel et des critères du travail bien fait",
  },
  {
    motifRegex: /manque\s+de\s+motivation|pas\s+motivé|démotivé/gi,
    termeDetecte: "Manque de motivation / Démotivé",
    explication:
      "Psychologisation individualisante qui masque les contraintes organisationnelles. On ne naît pas 'démotivé', on subit un empêchement d'agir.",
    remplacementRecommande:
      "« perte de sens consécutive au travail empêché » ou « amputation du pouvoir d'agir »",
    remplacementDirect: "perte de sens consécutive à l'activité empêchée et à l'amputation du pouvoir d'agir",
  },
  {
    motifRegex: /conflit\s+de\s+personnalité|problème\s+de\s+personne/gi,
    termeDetecte: "Conflit de personnalité",
    explication:
      "Réduit un dysfonctionnement organisationnel ou une divergence de critères de qualité à une incompatibilité d'humeur individuelle.",
    remplacementRecommande:
      "« controverse de métier non arbitrée » ou « divergence sur les critères de la qualité du travail »",
    remplacementDirect: "controverse de métier non arbitrée faute d'espaces de délibération",
  },
  {
    motifRegex: /gestion\s+du\s+stress|gérer\s+son\s+stress|salarié\s+stressé/gi,
    termeDetecte: "Gestion du stress / Salarié stressé",
    explication:
      "Le 'stress' est une notion biomédicale réductrice qui fait porter la responsabilité de l'adaptation au seul salarié.",
    remplacementRecommande:
      "« souffrance liée à la réduction des marges de manœuvre » ou « tension entre exigences prescrites et moyens alloués »",
    remplacementDirect: "souffrance pathogène liée au rétrécissement des marges de régulation opératoire",
  },
  {
    motifRegex: /erreur\s+humaine|faute\s+de\s+l'opérateur/gi,
    termeDetecte: "Erreur humaine / Faute de l'opérateur",
    explication:
      "L'ergonomie de Wisner et Leplat a démontré que l'erreur est le résultat d'un piège organisationnel ou d'un compromis opératoire sous forte variabilité.",
    remplacementRecommande:
      "« défaillance de la régulation face à la variabilité imprévue » ou « compromis opératoire dégradé »",
    remplacementDirect: "compromis opératoire dégradé face à la variabilité non anticipée par le prescrit",
  },
  {
    motifRegex: /burnout\s+individuel|fragilité\s+individuelle|personnalité\s+fragile/gi,
    termeDetecte: "Fragilité individuelle / Burnout individuel",
    explication:
      "Fait porter la responsabilité de la décompensation sur la psychologie intime du sujet plutôt que sur l'emprise gestionnaire.",
    remplacementRecommande:
      "« décompensation psychopathologique liée à l'effondrement des défenses collectives » (Dejours/Gaulejac)",
    remplacementDirect: "décompensation liée à l'effondrement des stratégies collectives de défense",
  },
  {
    motifRegex: /capital\s+humain|ressources\s+humaines/gi,
    termeDetecte: "Capital humain / Ressources humaines",
    explication:
      "Réification gestionnaire assimilant les sujets travaillants à un stock comptable ou une matière première consommable (Gaulejac).",
    remplacementRecommande:
      "« collectifs de travail » ou « sujets agissants porteurs de savoirs d'expérience »",
    remplacementDirect: "collectifs de travail porteurs de savoirs d'expérience",
  },
  {
    motifRegex: /savoir-être|savoir\s+être/gi,
    termeDetecte: "Savoir-être",
    explication:
      "Notion floue de sélection RH qui juge la conformité comportementale et sociale au lieu d'analyser les compétences incorporées dans l'activité réelle (Valls / IOD).",
    remplacementRecommande:
      "« compétences opératoires en situation réelle » ou « habiletés incorporées dans le métier »",
    remplacementDirect: "compétences opératoires situées dans l'activité réelle",
  },
  {
    motifRegex: /bonheur\s+au\s+travail|bienveillance\s+managériale/gi,
    termeDetecte: "Bonheur au travail / Bienveillance managériale",
    explication:
      "Injonction paradoxale qui occulte la réalité des rapports sociaux et la nécessité de débattre du travail réel.",
    remplacementRecommande:
      "« construction de la santé par le pouvoir d'agir et la reconnaissance du travail réel »",
    remplacementDirect: "construction de la santé par le développement du pouvoir d'agir",
  },
  {
    motifRegex: /absentéisme\s+de\s+confort/gi,
    termeDetecte: "Absentéisme de confort",
    explication:
      "Jugement moralisateur ignorant que le retrait est une ultime régulation d'autopréservation face à une organisation délétère.",
    remplacementRecommande:
      "« conduite de retrait défensif face à l'usure professionnelle et au travail empêché »",
    remplacementDirect: "conduite de retrait défensif face à l'usure et au travail empêché",
  },
];

export type TargetUeFilter = "ALL" | "PST106" | "PST108" | "PST123" | "PST120" | "PST124";

export interface AuteurCanoniqueItem {
  nom: string;
  ues: ("PST106" | "PST108" | "PST123" | "PST120" | "PST124")[];
  conceptsRegex: RegExp;
  conceptLabel: string;
}

export const AUTEURS_CANONIQUES_S1: AuteurCanoniqueItem[] = [
  // PST106
  {
    nom: "Wisner",
    ues: ["PST106"],
    conceptsRegex: /prescrit|réel|anthropotechnologie|variabilité|charge mentale|située/i,
    conceptLabel: "Écart prescrit/réel, variabilité, anthropotechnologie",
  },
  {
    nom: "Leplat",
    ues: ["PST106"],
    conceptsRegex: /tâche|activité|redéfinie|régulation|compromis|couplage|5 carrés/i,
    conceptLabel: "Tâche redéfinie, double régulation, compromis opératoire",
  },
  {
    nom: "Clot",
    ues: ["PST106", "PST124"],
    conceptsRegex: /genre|style|pouvoir d'agir|empêché|autoconfrontation|controverse|qualité/i,
    conceptLabel: "Genre professionnel, style, pouvoir d'agir, activité empêchée",
  },
  {
    nom: "Oddone",
    ues: ["PST106"],
    conceptsRegex: /sosie|communauté scientifique|expérience|ouvrière/i,
    conceptLabel: "Instruction au sosie, communauté scientifique élargie",
  },
  {
    nom: "Canguilhem",
    ues: ["PST106", "PST120"],
    conceptsRegex: /normativité|norme|milieu|santé|infidélité/i,
    conceptLabel: "Normativité vitale, santé comme création de normes",
  },
  {
    nom: "Vygotski",
    ues: ["PST106", "PST108"],
    conceptsRegex: /zone proximale|développement|langage intérieur|égocentrique|médiation|affect/i,
    conceptLabel: "Langage intérieur, ZPD, médiation sémiotique",
  },
  {
    nom: "Pacaud",
    ues: ["PST106"],
    conceptsRegex: /terrain|aiguilleur|téléphoniste|vieillissement|analyse du travail/i,
    conceptLabel: "Observation de terrain, analyse psychologique du travail",
  },
  {
    nom: "Lahy",
    ues: ["PST106"],
    conceptsRegex: /psychotechnique|sélection|fatigue|dactylographe|conducteur/i,
    conceptLabel: "Psychotechnique, étude expérimentale de la fatigue",
  },
  {
    nom: "Faverge",
    ues: ["PST106"],
    conceptsRegex: /fiabilité|système homme-machine|récupération|incident|régulation/i,
    conceptLabel: "Système Homme-Machine, fiabilité et récupération d'incidents",
  },
  {
    nom: "Ombredane",
    ues: ["PST106"],
    conceptsRegex: /analyse du travail|quoi|comment|diagnostic|ergonomie/i,
    conceptLabel: "Distinction Quoi (tâche) / Comment (activité)",
  },
  // PST108 & PST120
  {
    nom: "Honneth",
    ues: ["PST108", "PST120", "PST123"],
    conceptsRegex: /reconnaissance|mépris|amour|droit|solidarité|estime sociale|mutilation/i,
    conceptLabel: "Lutte pour la reconnaissance, 3 sphères, mépris social",
  },
  {
    nom: "Dejours",
    ues: ["PST108", "PST120", "PST106"],
    conceptsRegex: /souffrance|défense|reconnaissance|beauté|utilité|mètis|métis|sublimation|éthique|réel/i,
    conceptLabel: "Stratégies collectives de défense, jugement de beauté/utilité, souffrance éthique",
  },
  {
    nom: "Gaulejac",
    ues: ["PST108", "PST120"],
    conceptsRegex: /gestionnaire|quantophrénie|chiffr|paradox|sens|maladie de la gestion/i,
    conceptLabel: "Idéologie gestionnaire, quantophrénie, injonctions paradoxales",
  },
  {
    nom: "Kaës",
    ues: ["PST108"],
    conceptsRegex: /pacte dénégatif|alliance|appareil psychique groupal|institution/i,
    conceptLabel: "Pacte dénégatif, alliances inconscientes en institution",
  },
  {
    nom: "Austin",
    ues: ["PST108"],
    conceptsRegex: /performatif|constatif|locutoire|illocutoire|perlocutoire|acte de langage|dire c'est faire/i,
    conceptLabel: "Performatif, trilogie locutoire / illocutoire / perlocutoire",
  },
  {
    nom: "Searle",
    ues: ["PST108"],
    conceptsRegex: /assertif|directif|promissif|expressif|déclaratif|acte indirect|illocutoire/i,
    conceptLabel: "Taxonomie des 5 actes illocutoires, actes de langage indirects",
  },
  {
    nom: "Bühler",
    ues: ["PST108"],
    conceptsRegex: /organon|expression|appel|représentation|triade/i,
    conceptLabel: "Modèle de l'Organon (Expression, Appel, Représentation)",
  },
  {
    nom: "Ghiglione",
    ues: ["PST108"],
    conceptsRegex: /contrat de communication|enjeu|objectif|co-construction|situation potentiellement/i,
    conceptLabel: "Contrat de communication, SPC, distinction Objectif vs Enjeu",
  },
  {
    nom: "Habermas",
    ues: ["PST108"],
    conceptsRegex: /agir communicationnel|intercompréhension|validité|délibération|stratégique/i,
    conceptLabel: "Agir communicationnel vs agir stratégique, prétentions à la validité",
  },
  {
    nom: "Valls",
    ues: ["PST108"],
    conceptsRegex: /iod|intervention sur l'offre|médiation|employabilité|tri|entreprise|insertion/i,
    conceptLabel: "Méthode IOD, critique du biais d'employabilité, médiation active",
  },
  {
    nom: "Castra",
    ues: ["PST108"],
    conceptsRegex: /iod|insertion|employabilité|internalité|recrutement|offre et la demande/i,
    conceptLabel: "Fondements expérimentaux de l'IOD, critique de la norme d'internalité",
  },
  // PST123
  {
    nom: "Dubar",
    ues: ["PST123"],
    conceptsRegex: /transaction|biographique|relationnelle|attribution|appartenance|socialisation|blocage|promotion|affinitaire|conversion|exclusion/i,
    conceptLabel: "Double transaction (biographique/relationnelle), attribution vs appartenance",
  },
  {
    nom: "Sainsaulieu",
    ues: ["PST123"],
    conceptsRegex: /fusion|négociation|affinité|retrait|pouvoir|atelier|culture|apprentissage culturel/i,
    conceptLabel: "4 modèles culturels au travail (Fusion, Négociation, Affinités, Retrait)",
  },
  {
    nom: "Bourdieu",
    ues: ["PST108", "PST123"],
    conceptsRegex: /habitus|champ|capital|violence symbolique|illusio|marché linguistique|porte-parole|légitime/i,
    conceptLabel: "Habitus, violence symbolique, marché linguistique, illusio",
  },
  {
    nom: "Goffman",
    ues: ["PST123"],
    conceptsRegex: /stigmate|face|mise en scène|institution totale|interaction|identité virtuelle/i,
    conceptLabel: "Stigmate, préservation de la face, institution totale",
  },
  {
    nom: "Hughes",
    ues: ["PST123"],
    conceptsRegex: /sale boulot|dirty work|drame social|mandat|licence|carrière/i,
    conceptLabel: "Sale boulot (dirty work), drame social du travail, licence et mandat",
  },
  // PST120
  {
    nom: "Molinier",
    ues: ["PST120"],
    conceptsRegex: /care|genre|virilité|discret|discrètes|invisibilité|sollicitude|division sexuelle/i,
    conceptLabel: "Éthique du care, habiletés discrètes, critique de l'idéologie virile",
  },
  {
    nom: "Le Guillant",
    ues: ["PST120"],
    conceptsRegex: /téléphoniste|fatigue nerveuse|névrose|cadence|conditions de travail/i,
    conceptLabel: "Névrose des téléphonistes, psychopathologie des conditions de travail",
  },
  // PST124
  {
    nom: "Rabardel",
    ues: ["PST124"],
    conceptsRegex: /genèse instrumentale|artefact|instrument|instrumentation|instrumentalisation|catachrèse|schème/i,
    conceptLabel: "Genèse instrumentale (Artefact → Instrument, instrumentation/instrumentalisation)",
  },
  {
    nom: "Bobillier",
    ues: ["PST124"],
    conceptsRegex: /acceptation située|clinique de l'usage|capacitant|incapacitant|pouvoir d'agir|numérique/i,
    conceptLabel: "Clinique de l'usage, acceptation située vs acceptabilité, technologie capacitante",
  },
  {
    nom: "Engeström",
    ues: ["PST124", "PST120"],
    conceptsRegex: /système d'activité|contradiction|communauté|division du travail|apprentissage expansif/i,
    conceptLabel: "Système d'activité collectif et contradictions systémiques",
  },
];

export const EXEMPLE_PIEGE_RH = `Face à la réorganisation de l'atelier, on observe une forte résistance au changement et un manque de motivation chez plusieurs opérateurs. Certains présentent même une fragilité individuelle qui complique la gestion du stress au quotidien, provoquant un conflit de personnalité avec l'encadrement et des erreurs humaines répétées par défaut de savoir-être.`;

export const EXEMPLE_MODELE_2020 = `Dans quelle mesure le déni gestionnaire de l'écart irréductible entre tâche prescrite et activité réelle condamne-t-il les opérateurs à une amputation de leur pouvoir d'agir ? Comme l'ont démontré Alain Wisner et Jacques Leplat, l'activité réelle ne se réduit jamais à l'exécution mécanique de la consigne : elle constitue un compromis opératoire permanent face à la variabilité technique et humaine du terrain. Or, lorsque l'idéologie gestionnaire décrite par Vincent de Gaulejac impose des cadences standardisées sans espace de délibération, le collectif de travail voit son genre professionnel (Yves Clot) s'étioler. Dès lors, ce que le management qualifie à tort de désengagement relève en réalité d'une activité empêchée et d'un déni de reconnaissance du jugement de beauté par les pairs (Christophe Dejours, Axel Honneth), engendrant une souffrance éthique majeure.`;

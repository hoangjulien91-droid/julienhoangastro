export interface ModuleDimensionItem {
  focus: string;
  conceptCle: string;
  formule: string;
  schemaId: string;
  schemaNom: string;
}

export interface DimensionSynoptique {
  dimension: string;
  pst106: ModuleDimensionItem;
  pst108: ModuleDimensionItem;
  pst123: ModuleDimensionItem;
  pst120: ModuleDimensionItem;
  pst124: ModuleDimensionItem;
}

export interface PiegeTransversalItem {
  titre: string;
  piege: string;
  antidote: string;
}

export const DIMENSIONS_COMPARATIVES: DimensionSynoptique[] = [
  {
    dimension: "1. Objet d'étude & Question Fondamentale",
    pst106: {
      focus: "L'activité réelle de travail et la santé de l'opérateur.",
      conceptCle: "L'écart irréductible Prescrit vs Réel",
      formule: "Comment l'Homme régule-t-il la tâche sans y laisser sa santé ?",
      schemaId: "schema-leplat-regulation",
      schemaNom: "Leplat & Hoc : Régulation",
    },
    pst108: {
      focus: "L'interaction sociale, les rapports de pouvoir et le langage.",
      conceptCle: "L'espace délibératif & la légitimité du discours",
      formule:
        "Comment s'organise la communication entre domination et émancipation ?",
      schemaId: "schema-habermas-validite",
      schemaNom: "Habermas : Tétraèdre",
    },
    pst123: {
      focus:
        "La construction des identités sociales et la trajectoire biographique.",
      conceptCle: "La socialisation & les transactions identitaires",
      formule:
        "Comment l'individu négocie-t-il sa place et son statut dans la société ?",
      schemaId: "schema-dubar-double-transaction",
      schemaNom: "Dubar : Double Transaction",
    },
    pst120: {
      focus:
        "Le destin psychodynamique de la souffrance et la santé mentale au travail.",
      conceptCle: "La normalité souffrante & la dynamique de reconnaissance",
      formule:
        "Comment transformer la souffrance de l'épreuve du réel en santé sans décompenser ?",
      schemaId: "schema-dejours-reconnaissance",
      schemaNom: "Dejours : Psychodynamique",
    },
    pst124: {
      focus:
        "Les métamorphoses numériques, l'activité instrumentée et la clinique des usages.",
      conceptCle: "L'acceptation située & la genèse instrumentale",
      formule:
        "Comment les technologies reconfigurent-elles l'activité sans détruire le pouvoir d'agir ?",
      schemaId: "schema-clot-activite-reelle",
      schemaNom: "Bobillier-Chaumon : Usages",
    },
  },
  {
    dimension: "2. Conception du Sujet Humain",
    pst106: {
      focus: "L'Opérateur régulateur & incarné (corps, ruse, souffrance).",
      conceptCle: "Intelligence pratique (Métis) & Mobilisation subjective",
      formule:
        "Le travailleur n'est pas un exécutant mécanique mais un régulateur ingénieux.",
      schemaId: "schema-dejours-reconnaissance",
      schemaNom: "Dejours : Reconnaissance",
    },
    pst108: {
      focus:
        "L'Acteur social situé, porteur d'habitus et d'intérêts symboliques.",
      conceptCle: "Habitus incorporé & Prétention à la validité",
      formule:
        "L'acteur négocie son autorité selon son capital et les règles du champ.",
      schemaId: "schema-bourdieu-algorithme",
      schemaNom: "Bourdieu : Algorithme",
    },
    pst123: {
      focus: "Le Sujet en transition biographique et quête de reconnaissance.",
      conceptCle: "Identité pour soi vs Identité pour autrui",
      formule:
        "L'identité est un compromis permanent entre histoire intime et étiquetage social.",
      schemaId: "schema-sainsaulieu-matrice",
      schemaNom: "Sainsaulieu : 4 Cultures",
    },
    pst120: {
      focus:
        "Le Sujet souffrant et désirant, animé par sa sensibilité corporelle et sa Mètis.",
      conceptCle: "Corps érogène au travail & Sublimation",
      formule:
        "Le travail est l'énigme d'un engagement pulsionnel et moral à l'épreuve de la matière.",
      schemaId: "schema-dejours-reconnaissance",
      schemaNom: "Molinier : Care & Habiletés",
    },
    pst124: {
      focus:
        "L'Homme instrumenté créatif (braconnage, catachrèse) dans un système d'activité situé.",
      conceptCle: "Schèmes d'utilisation & Action située (Suchman)",
      formule:
        "L'utilisateur n'est pas un agent passif : il invente l'instrument dans l'activité.",
      schemaId: "schema-leplat-regulation",
      schemaNom: "Rabardel : Genèse",
    },
  },
  {
    dimension: "3. Diagnostic de la Souffrance / Pathologie",
    pst106: {
      focus:
        "Travail empêché, perte du genre professionnel, déni de reconnaissance.",
      conceptCle: "Souffrance éthique & Stratégies défensives",
      formule:
        "Quand la prescription empêche le travail bien fait ➔ TMS, burn-out, cynisme.",
      schemaId: "schema-clot-activite-reelle",
      schemaNom: "Clot : L'Iceberg du Réel",
    },
    pst108: {
      focus:
        "Violence symbolique, insulte managériale, agir stratégique trompeur.",
      conceptCle: "Colonisation du monde vécu & Mépris social",
      formule:
        "Quand le système instrumentalise le langage ➔ invisibilisation et mépris moral.",
      schemaId: "schema-honneth-spheres",
      schemaNom: "Honneth : 3 Sphères",
    },
    pst123: {
      focus:
        "Désaffiliation, déclassement, assignation subie, précarisation des liens.",
      conceptCle: "Zone de vulnérabilité & Identité de crise",
      formule:
        "Quand l'emploi précaire brise les attaches familiales ➔ décrochage citoyen.",
      schemaId: "schema-castel-desaffiliation",
      schemaNom: "Castel : Désaffiliation",
    },
    pst120: {
      focus:
        "Souffrance éthique, usure mentale, décompensation somatique et désespoir gestionnaire.",
      conceptCle: "Rupture des défenses collectives & Trahison des valeurs",
      formule:
        "Quand l'évaluation individuelle détruit la coopération ➔ effondrement et passage à l'acte.",
      schemaId: "schema-dejours-reconnaissance",
      schemaNom: "Dejours : Défenses",
    },
    pst124: {
      focus:
        "Prolétarisation des savoirs (Stiegler), taylorisme digital et hyper-surveillance algorithmique.",
      conceptCle: "Technologie incapacitante & Perte du jugement clinique",
      formule:
        "Quand l'algorithme opaque décide à la place de l'expert ➔ sentiment d'impuissance et rejet.",
      schemaId: "schema-cartographie-lagabrielle",
      schemaNom: "Stiegler : Pharmakon",
    },
  },
  {
    dimension: "4. Méthodologie d'Intervention & Transformation",
    pst106: {
      focus:
        "Analyse ergonomique du travail (AET), autoconfrontation croisée, débat sur le genre.",
      conceptCle:
        "Restauration du dialogue sur les critères du travail bien fait",
      formule:
        "Faire parler le réel pour réaménager les postes et soigner le métier.",
      schemaId: "schema-leplat-regulation",
      schemaNom: "Leplat : Ergonomie",
    },
    pst108: {
      focus:
        "Méthode IOD, ouverture d'espaces de délibération non faussés, médiation de poste.",
      conceptCle: "Intervention directe sur l'Offre de droit commun (zéro tri)",
      formule:
        "Négocier avec le patron pour adapter l'environnement à l'homme.",
      schemaId: "schema-valls-iod",
      schemaNom: "Valls & Castra : IOD",
    },
    pst123: {
      focus:
        "Triangulation clinique, co-construction de projet, bilan de trajectoire, déontologie.",
      conceptCle: "Alliance de travail & Indépendance du psychologue",
      formule:
        "Accompagner la bifurcation choisie sans devenir l'auxiliaire de sélection du patron.",
      schemaId: "schema-dubar-double-transaction",
      schemaNom: "Dubar : Bifurcation",
    },
    pst120: {
      focus:
        "Enquête en psychodynamique du travail, espace de délibération déontique, écoute collective.",
      conceptCle: "Délibération libre sur le travail & Jugement de beauté",
      formule:
        "Libérer la parole collective sur les tricheries nécessaires pour réhabiliter la sublimation.",
      schemaId: "schema-dejours-reconnaissance",
      schemaNom: "Dejours : Délibération",
    },
    pst124: {
      focus:
        "Clinique de l'usage, comités d'utilisateurs, conception continuée dans l'usage et technologies capacitantes.",
      conceptCle: "Espaces de controverse sur les outils & Pouvoir d'agir",
      formule:
        "Auditer l'outil à l'épreuve du travail réel pour adapter l'artefact aux besoins du métier.",
      schemaId: "schema-clot-activite-reelle",
      schemaNom: "Bobillier-Chaumon : Clinique",
    },
  },
];

export const PIEGES_TRANSVERSAUX: PiegeTransversalItem[] = [
  {
    titre: "Confusion Reconnaissance Dejours (PST106/120) vs Honneth (PST108)",
    piege: "Mélanger les deux théories de la reconnaissance.",
    antidote:
      "Pour Dejours, la reconnaissance porte sur le FAIRE et l'effort réel (Jugement d'utilité + Jugement de beauté par les pairs). Pour Honneth, la reconnaissance porte sur l'ÊTRE et le statut moral du sujet à travers 3 sphères universelles (Amour, Droit, Solidarité).",
  },
  {
    titre: "Confusion Travail Réel Clot (PST106) vs Bourdieu (PST108)",
    piege: "Penser que l'activité réelle est simplement dictée par l'habitus.",
    antidote:
      "Clot montre que le Réel excède toujours ce qui est fait (activités empêchées, contrariées). Bourdieu insiste sur l'incorporation des structures sociales (habitus). La clinique de l'activité redonne du pouvoir d'agir au collectif de pairs, là où la sociologie critique dévoile la domination.",
  },
  {
    titre:
      "Confusion Insertion IOD Valls (PST108) vs Orientation Dubar (PST123)",
    piege:
      "Réduire IOD à un bilan de compétences ou une transaction biographique.",
    antidote:
      "La méthode IOD refuse expressément tout bilan et tout tri préalable du candidat : son levier d'action est l'OFFRE (l'employeur). Dubar analyse au contraire la négociation identitaire intime entre soi et autrui au fil de la vie.",
  },
  {
    titre:
      "Confusion Cultures Sainsaulieu (PST123) vs Habitus Bourdieu (PST108)",
    piege: "Croire que les cultures d'atelier sont des habitus figés.",
    antidote:
      "Pour Sainsaulieu, la culture d'entreprise est un apprentissage relationnel de l'adulte au travail (socialisation secondaire). L'atelier est une 'matrice démocratique' où le rapport au pouvoir forge la personnalité politique.",
  },
  {
    titre:
      "Confusion Souffrance Éthique Dejours (PST120) vs Activité Empêchée Clot (PST106)",
    piege:
      "Confondre l'atteinte morale du sens du travail et l'empêchement opératoire du geste.",
    antidote:
      "Pour Dejours, la souffrance éthique naît d'une trahison morale (devoir commettre des actes réprouvés par sa conscience, ex. tromper un client ou soigner trop vite). Pour Clot, l'activité empêchée naît de l'impossibilité matérielle ou organisationnelle de soigner son travail (travailler vite et mal), contrariant le genre professionnel.",
  },
  {
    titre:
      "Confusion Acceptation Située Bobillier-Chaumon (PST124) vs Régulation Ergonomique Leplat (PST106)",
    piege:
      "Croire que l'acceptation située se résume à l'ajustement moteur du poste.",
    antidote:
      "La régulation de Leplat est un compromis opératoire en temps réel face aux aléas de la tâche. L'acceptation située de Bobillier-Chaumon est un processus sociotechnique global à 4 dimensions (utilité, utilisabilité, collectif, identité) évaluant les transformations de la subjectivité et des collectifs face aux artefacts numériques.",
  },
];

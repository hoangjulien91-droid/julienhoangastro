export interface DetectiveCase {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst120" | "pst123" | "pst124";
  titre: string;
  contexte: string;
  assertions: {
    texte: string;
    isPiege: boolean;
    pourquoiPiege?: string;
  }[];
  professeurVerdict: string;
}

export const DETECTIVE_CASES: DetectiveCase[] = [
  // --- PST108 ---
  {
    id: "case-108-1",
    moduleKey: "pst108",
    titre: "Bourdieu, Austin et l'autorité des mots",
    contexte:
      "Une copie d'examen traite de la performativité du langage dans l'évaluation professionnelle.",
    assertions: [
      {
        texte:
          "Selon Bourdieu, le pouvoir d'un discours n'appartient pas aux mots eux-mêmes mais à l'autorité statutaire et institutionnelle déléguée au locuteur.",
        isPiege: false,
      },
      {
        texte:
          "L'efficacité performative (dire c'est faire) est une force magique logée directement dans la grammaire interne et l'éloquence de la phrase.",
        isPiege: true,
        pourquoiPiege:
          "PIÈGE MAJEUR ! C'est précisément l'illusion internaliste d'Austin que Bourdieu dénonce. Pour Bourdieu, un ordre ne fonctionne que parce qu'il y a un mandat institutionnel derrière (Status est magistratus), jamais par la seule grammaire.",
      },
      {
        texte:
          "Sarah Hanley montre dans 'Le Lit de Justice' que l'efficacité symbolique de l'État royal s'incarne dans un cérémonial institutionnel codifié.",
        isPiege: false,
      },
    ],
    professeurVerdict:
      "Ne tombez jamais dans l'illusion internaliste : à l'examen de PST108, opposez toujours Austin (la force illocutoire dans la langue) à Bourdieu (le mandat social délégué).",
  },
  {
    id: "case-108-2",
    moduleKey: "pst108",
    titre: "La Méthode IOD et l'Insertion professionnelle",
    contexte:
      "Un mémoire analyse l'accompagnement des personnes éloignées de l'emploi.",
    assertions: [
      {
        texte:
          "La méthode IOD négocie directement avec l'employeur sur le travail réel sans faire passer de tests de sélection au candidat.",
        isPiege: false,
      },
      {
        texte:
          "Pour garantir la réussite de l'insertion, le chargé de mission IOD évalue et note la motivation du précaire lors d'un bilan psychotechnique préalable.",
        isPiege: true,
        pourquoiPiege:
          "PIÈGE ÉLIMINATOIRE ! La règle déontologique n°1 d'IOD (Castra & Valls) est le REFUS ABSOLU DU TRI PRÉALABLE. Tout bilan ou filtrage psychologique est formellement interdit dans la doctrine IOD.",
      },
      {
        texte:
          "Robert Castel soutient l'IOD car elle refuse l'idéologie de l'employabilité préalable et replace l'insertion dans le droit commun de l'entreprise.",
        isPiege: false,
      },
    ],
    professeurVerdict:
      "L'insertion professionnelle selon Castra & Valls combat le tri préalable : on intervient sur le milieu de travail et les représentations de l'employeur, pas sur le profil supposé déficient du candidat.",
  },
  {
    id: "case-108-3",
    moduleKey: "pst108",
    titre: "L'insulte au travail et la blessure verbale",
    contexte:
      "Un atelier de régulation analyse les échanges violents entre collègues.",
    assertions: [
      {
        texte:
          "L'injure verbale au travail blesse parce qu'elle s'appuie sur une mémoire historique de domination et assigne la victime à un statut d'infériorité.",
        isPiege: false,
      },
      {
        texte:
          "L'insulte n'est qu'un problème d'incompréhension interpersonnelle qu'une séance de communication non-violente (CNV) suffit à neutraliser.",
        isPiege: true,
        pourquoiPiege:
          "PIÈGE NAÏF ! L'insulte (selon Lucy et Butler) n'est pas un simple dérapage de communication : c'est un acte de violence symbolique institué qui réactive des rapports de domination structurels.",
      },
      {
        texte:
          "Didier Eribon montre que l'injure produit un verdict social qui précède le sujet et marque durablement son identité.",
        isPiege: false,
      },
    ],
    professeurVerdict:
      "PST108 exige de dépasser la simple communication interindividuelle : l'insulte est un acte socialement situé qui engage les rapports de pouvoir.",
  },

  // --- PST106 ---
  {
    id: "case-106-1",
    moduleKey: "pst106",
    titre: "Prescrit vs Réel en Ergonomie de l'activité",
    contexte: "Une étude ergonomique s'intéresse aux retards sur une chaîne de tri.",
    assertions: [
      {
        texte:
          "L'écart entre la tâche prescrite et l'activité réelle est la preuve d'un manque de rigueur et d'indiscipline des opérateurs.",
        isPiege: true,
        pourquoiPiege:
          "CONTRE-SENS TOTAL AU CNAM ! Pour Wisner, Daniellou et Leplat, l'écart au prescrit est INDISPENSABLE et VITAL. Si les opérateurs appliquaient les consignes à la lettre (grève du zèle), la production s'arrêterait immédiatement.",
      },
      {
        texte:
          "La tâche est ce qui est à faire (objectifs, consignes, contraintes fixées par l'encadrement), tandis que l'activité est ce qui se fait réellement par le sujet situé.",
        isPiege: false,
      },
      {
        texte:
          "Les régulations opératoires mises en place par les salariés permettent de compenser la variabilité des matières premières et les aléas techniques.",
        isPiege: false,
      },
    ],
    professeurVerdict:
      "En ergonomie de langue française, l'écart au prescrit n'est jamais une faute : c'est la condition d'existence même de la production face à la variabilité du réel.",
  },
  {
    id: "case-106-2",
    moduleKey: "pst106",
    titre: "Genre professionnel et Style chez Yves Clot",
    contexte: "Un clinicien anime une autoconfrontation croisée avec des soignants.",
    assertions: [
      {
        texte:
          "Le genre professionnel est la mémoire impersonnelle du milieu de travail, un corps d'évaluations partagées qui précède et soutient l'action.",
        isPiege: false,
      },
      {
        texte:
          "Pour rénover un collectif en crise, le psychologue doit standardiser les pratiques en imposant un style unique et obligatoire à toute l'équipe.",
        isPiege: true,
        pourquoiPiege:
          "PIÈGE CLINIQUE IMPARDONNABLE ! Le style est par définition la signature singulière et irremplaçable du sujet dans le genre commun. Confondre genre et style ou vouloir prescrire le style conduit tout droit à l'activité empêchée et à la souffrance.",
      },
      {
        texte:
          "L'activité contrariée ou empêchée épuise les professionnels car ils ne peuvent plus se reconnaître dans la qualité de ce qu'ils font.",
        isPiege: false,
      },
    ],
    professeurVerdict:
      "Le genre est une ressource collective vivante qui nourrit les styles individuels ; lorsqu'il est appauvri par le management prescriptif, il devient un carcan mortifère.",
  },

  // --- PST123 ---
  {
    id: "case-123-1",
    moduleKey: "pst123",
    titre: "Socio-histoire de la profession et Code de Déontologie",
    contexte: "Une direction des ressources humaines commande une intervention pour 'gestion du stress'.",
    assertions: [
      {
        texte:
          "Le psychologue du travail peut transmettre à la direction la liste nominative des salariés présentant des fragilités émotionnelles afin de faciliter leur reclassement.",
        isPiege: true,
        pourquoiPiege:
          "VIOLATION GRAVE DU CODE DE DÉONTOLOGIE ! L'article 7 et le secret professionnel (Loi du 25 juillet 1985) interdisent formellement de communiquer à l'employeur des données nominatives sur les personnes. La restitution porte sur l'organisation du travail, jamais sur les individus.",
      },
      {
        texte:
          "Le psychologue fonde son mandat sur le consentement éclairé des participants et l'indépendance de son jugement professionnel.",
        isPiege: false,
      },
      {
        texte:
          "La socio-histoire de la discipline (Le Bianic) montre la tension historique entre psychotechnique de sélection et ergonomie d'adaptation du travail à l'homme.",
        isPiege: false,
      },
    ],
    professeurVerdict:
      "L'indépendance déontologique du psychologue est non négociable : refusez systématiquement toute commande visant le tri, le fichage ou l'adaptation forcée des salariés.",
  },
  {
    id: "case-123-2",
    moduleKey: "pst123",
    titre: "Socialisation et Identités au travail (Dubar / Sainsaulieu)",
    contexte: "Une enquête analyse la reconversion de techniciens de maintenance vers le tertiaire.",
    assertions: [
      {
        texte:
          "L'identité professionnelle selon Claude Dubar est le produit d'une double transaction : biographique (pour soi) et relationnelle (pour autrui).",
        isPiege: false,
      },
      {
        texte:
          "L'identité au travail est un trait de personnalité inné et définitif qui ne dépend pas des systèmes de relations et du pouvoir dans l'atelier.",
        isPiege: true,
        pourquoiPiege:
          "PIÈGE ESSENTIALISTE ! Pour Renaud Sainsaulieu et Claude Dubar, l'identité n'a rien d'inné : elle est une construction sociale continue, modelée par les cultures d'atelier, l'apprentissage du pouvoir et les trajectoires institutionnelles.",
      },
      {
        texte:
          "Sainsaulieu identifie 4 grands modèles d'accès au pouvoir et à la camaraderie : fusionnel, affinitaire, négocié et de retrait.",
        isPiege: false,
      },
    ],
    professeurVerdict:
      "Traitez toujours l'identité professionnelle comme un processus dynamique et dialectique entre aspirations du sujet et reconnaissance institutionnelle.",
  },

  // --- PST120 ---
  {
    id: "case-120-1",
    moduleKey: "pst120",
    titre: "Psychodynamique du travail et Psychopathologie (Dejours)",
    contexte: "Une enquête clinique examine la recrudescence d'arrêts maladie dans un centre d'appels.",
    assertions: [
      {
        texte:
          "En psychodynamique du travail, le burnout et la dépression s'expliquent d'abord par la fragilité psychologique préexistante de l'individu.",
        isPiege: true,
        pourquoiPiege:
          "PIÈGE MAJEUR DE PSYCHOLOGISATION ! Dejours et Marie Pezé récusent formellement la causalité individuelle : c'est l'organisation du travail (isolement, évaluation individualisée des performances, destruction des collectifs) qui déstabilise le psychisme et conduit à la décompensation somatique ou au suicide.",
      },
      {
        texte:
          "La souffrance devient pathogène lorsque les voies de la sublimation et de la reconnaissance par les pairs et la hiérarchie sont verrouillées.",
        isPiege: false,
      },
      {
        texte:
          "Pascale Molinier montre que les idéologies défensives collectives permettent de tenir face à la peur mais anesthésient la sensibilité éthique.",
        isPiege: false,
      },
    ],
    professeurVerdict:
      "Refusez catégoriquement toute psychologisation ou individualisation de la souffrance : ancrez toujours votre diagnostic dans l'organisation réelle du travail.",
  },

  // --- PST124 ---
  {
    id: "case-124-1",
    moduleKey: "pst124",
    titre: "Rabardel, Bobillier-Chaumon et le déterminisme technologique",
    contexte:
      "Un consultant étudie l'échec de l'adoption d'un logiciel ERP dans un hôpital.",
    assertions: [
      {
        texte:
          "L'échec d'adoption d'un système numérique s'explique par la résistance naturelle et irrationnelle des soignants au progrès technologique.",
        isPiege: true,
        pourquoiPiege:
          "PIÈGE CLASSIQUE DU CONSULTANT TECHNOCENTRÉ ! Selon Bobillier-Chaumon et Rabardel, la 'résistance' est le symptôme d'un artefact inadapté qui détruit le pouvoir d'agir et les régulations informelles du soin.",
      },
      {
        texte:
          "Selon Pierre Rabardel, l'instrument n'est pas l'artefact technique : c'est une entité mixte associant l'outil et les schèmes d'utilisation du travailleur.",
        isPiege: false,
      },
      {
        texte:
          "Les catachrèses (détournements d'usage) sont des preuves de l'intelligence pratique de l'opérateur pour combler l'écart entre logiciel prescrit et activité réelle.",
        isPiege: false,
      },
    ],
    professeurVerdict:
      "Ne blâmez jamais l'utilisateur : traitez les contournements comme des alertes cliniques révélant les failles de la prescription numérique.",
  },
];

export interface SujetDissertation {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst123" | "transversal";
  titre: string;
  problematique: string;
  enjeuAcademique: string;
  plan18_20: {
    partie1: {
      titre: string;
      sousPartieA: { titre: string; argument: string; auteurRef: string };
      sousPartieB: { titre: string; argument: string; auteurRef: string };
    };
    partie2: {
      titre: string;
      sousPartieA: { titre: string; argument: string; auteurRef: string };
      sousPartieB: { titre: string; argument: string; auteurRef: string };
    };
  };
  citationsObligatoires: string[];
  piegesExamen: string;
}

export const SUJETS_DISSERTATION: SujetDissertation[] = [
  // --- PST108 ---
  {
    id: "sujet-108-1",
    moduleKey: "pst108",
    titre:
      "« Les mots ne parlent pas d'eux-mêmes » : discutez cette affirmation en analysant les conditions d'efficacité de la communication dans les situations de travail.",
    problematique:
      "Dans quelle mesure le pouvoir des discours managériaux et des échanges verbaux au travail découle-t-il non pas de propriétés linguistiques internes, mais de l'institutionnalisation des rapports sociaux de domination ?",
    enjeuAcademique:
      "Ce sujet convoque l'opposition fondatrice enseignée par Éric Lucy : Austin (linguistique internaliste) vs Bourdieu (sociologie de l'institution et délégation statutaire).",
    plan18_20: {
      partie1: {
        titre: "I. L'illusion d'une efficacité immanente du langage au travail",
        sousPartieA: {
          titre: "A. La découverte des énoncés performatifs par Austin",
          argument:
            "Le langage ne se limite pas à décrire le monde : « Quand dire, c'est faire ». Dans l'entreprise, des formules telles que « Je vous embauche » ou « La séance est ouverte » semblent produire par elles-mêmes des actes juridiques immédiats.",
          auteurRef: "John L. Austin (Quand dire, c'est faire, 1962)",
        },
        sousPartieB: {
          titre:
            "B. L'illusion de la toute-puissance communicationnelle managériale",
          argument:
            "Les doctrines de communication interne postulent souvent que le bon mot ou la rhétorique bienveillante suffisent à motiver ou pacifier les salariés, réduisant la communication à un transport d'informations.",
          auteurRef:
            "Théorie de l'information (Shannon & Weaver) & Rhétorique RH",
        },
      },
      partie2: {
        titre:
          "II. La rupture sociologique : « Status est magistratus » et mandat institutionnel",
        sousPartieA: {
          titre:
            "A. Le pouvoir des mots comme pouvoir des institutions déléguées",
          argument:
            "Pour Bourdieu, les mots ne tirent jamais leur force de la grammaire, mais du capital symbolique et de l'autorité statutaire reconnue au locuteur. Sarah Hanley le démontre historiquement avec le 'Lit de justice' des rois : c'est le cérémonial institutionnel qui impose l'obéissance.",
          auteurRef:
            "Pierre Bourdieu (Ce que parler veut dire, 1982) & Sarah Hanley (1983)",
        },
        sousPartieB: {
          titre:
            "B. L'actualisation des rapports asymétriques : l'insulte et la domination symbolique",
          argument:
            "Comme l'analyse Éric Lucy (2021), l'insulte au travail ne blesse pas par son acoustique, mais parce qu'elle convoque et réactive une hiérarchie sociale et un stigmate historique déjà institué face auquel la victime est désarmée.",
          auteurRef: "Éric Lucy (L'insulte au travail, 2021)",
        },
      },
    },
    citationsObligatoires: [
      "« C'est en tant qu'il est institué que le discours produit des effets réels : status est magistratus. » (Pierre Bourdieu)",
      "« Quand dire, c'est faire. » (John L. Austin, 1962)",
    ],
    piegesExamen:
      "Ne pas réduire Austin à une simple erreur : montrez qu'Austin a eu le mérite immense de découvrir la performativité, mais que Bourdieu a complété la théorie en lui apportant sa condition de possibilité sociologique.",
  },
  {
    id: "sujet-108-2",
    moduleKey: "pst108",
    titre:
      "Peut-on concilier l'impératif d'efficacité économique et l'exigence de reconnaissance morale dans les organisations contemporaines ?",
    problematique:
      "Comment la tension entre l'agir stratégique orienté vers le succès gestionnaire et la quête intersubjective de reconnaissance morale détermine-t-elle la santé et la dignité des travailleurs ?",
    enjeuAcademique:
      "Confrontation directe entre Jürgen Habermas (Théorie de l'agir communicationnel) et Axel Honneth (Théorie de la reconnaissance), prolongée par la méthode IOD de Francis Valls.",
    plan18_20: {
      partie1: {
        titre:
          "I. L'hégémonie de l'agir stratégique et la réification des subjectivités",
        sousPartieA: {
          titre: "A. L'agir stratégique et son masque managérial",
          argument:
            "Quand la rentabilité prévaut, la communication devient instrumentale. Dans l'agir stratégique masqué, la direction simule la concertation participative pour imposer des restructurations décidées à l'avance.",
          auteurRef: "Jürgen Habermas (1981)",
        },
        sousPartieB: {
          titre:
            "B. La réification comme oubli actif de la reconnaissance originaire",
          argument:
            "Pour Axel Honneth, réduire le salarié à un 'coût' ou un tableau de bord constitue une réification morale qui détruit l'estime de soi et empêche l'accès à la sphère de la solidarité.",
          auteurRef: "Axel Honneth (La Réification, 2007)",
        },
      },
      partie2: {
        titre:
          "II. Les voies de restauration d'un espace délibératif et émancipateur",
        sousPartieA: {
          titre: "A. L'agir communicationnel comme espace public interne",
          argument:
            "La réhabilitation de la parole passe par l'acceptation de la controverse libre sur le travail, régie par les 4 prétentions à la validité (vérité, justesse, sincérité, intelligibilité), sans contrainte hiérarchique.",
          auteurRef: "Jürgen Habermas (1981)",
        },
        sousPartieB: {
          titre:
            "B. L'intervention concrète sur le droit commun : l'apport de la méthode IOD",
          argument:
            "Refusant le tri préalable et la culpabilisation du demandeur d'emploi, l'approche IOD démontre que l'accès durable à l'entreprise se négocie sur les conditions réelles d'intégration sans compromettre la dignité de la personne.",
          auteurRef: "Francis Valls & Denis Castra (2007)",
        },
      },
    },
    citationsObligatoires: [
      "« L'agir communicationnel repose sur la recherche désintéressée d'une entente rationnelle exempte de contrainte. » (Habermas)",
      "« La réification est un oubli de la reconnaissance originaire d'autrui comme sujet. » (Honneth)",
    ],
    piegesExamen:
      "Éviter les discours naïfs ou moralisateurs : analysez les mécanismes organisationnels précis et montrez que la reconnaissance est une condition de la performance réelle du travail.",
  },

  // --- PST106 ---
  {
    id: "sujet-106-1",
    moduleKey: "pst106",
    titre:
      "« Le travail prescrit n'est jamais le travail réel » : analysez la portée théorique et méthodologique de cet écart pour l'ergonomie et la clinique de l'activité.",
    problematique:
      "En quoi l'inévitable décalage entre la tâche prescrite et l'activité réelle constitue-t-il à la fois la condition de fonctionnement des organisations et le cœur de la santé au travail ?",
    enjeuAcademique:
      "Thème central du cours de Catherine Lagabrielle : Alain Wisner (fondation ergonomique), Jacques Leplat (régulation) et Yves Clot (pouvoir d'agir et travail empêché).",
    plan18_20: {
      partie1: {
        titre:
          "I. La découverte ergonomique de l'écart : de l'illusion taylorienne à la régulation de l'activité",
        sousPartieA: {
          titre: "A. La genèse de l'ergonomie de l'activité au Cnam",
          argument:
            "Alain Wisner a démontré que l'ingénieur ne peut jamais tout prévoir. Si les travailleurs appliquaient strictement la prescription sans ajustement, le système productif s'effondrerait immédiatement (grève du zèle).",
          auteurRef: "Alain Wisner (Réflexions sur l'ergonomie, 1995)",
        },
        sousPartieB: {
          titre:
            "B. La régulation ergonomique face aux conditions internes et externes",
          argument:
            "Jacques Leplat modélise la tâche (buts prescrits) confrontée aux conditions internes (fatigue, compétences, âge) et externes (aléas machines). L'activité réelle est un compromis opératoire permanent.",
          auteurRef: "Jacques Leplat & Jean-Marie Hoc (1983)",
        },
      },
      partie2: {
        titre:
          "II. La clinique de l'activité : quand l'écart devient source de santé ou de souffrance",
        sousPartieA: {
          titre:
            "A. L'activité empêchée et la souffrance éthique du travail bâclé",
          argument:
            "Lorsque le management chiffré interdit la régulation et prive l'opérateur des moyens de faire du bon travail, l'activité est contrariée ou empêchée, engendrant détresse et perte de sens.",
          auteurRef: "Yves Clot (Le travail à cœur, 2010)",
        },
        sousPartieB: {
          titre:
            "B. La revitalisation du collectif : genre professionnel et auto-confrontation",
          argument:
            "Pour restaurer le pouvoir d'agir, l'intervention clinique s'appuie sur le 'genre professionnel' et le dispositif d'auto-confrontation croisée afin de relancer la controverse sur le travail bien fait.",
          auteurRef: "Yves Clot, Daniel Faïta, Gabriel Fernandez (2000)",
        },
      },
    },
    citationsObligatoires: [
      "« L'activité est ce qui se fait par un opérateur singulier pour faire face à ce que la prescription n'avait pas prévu. » (Alain Wisner)",
      "« L'activité empêchée est le poison de la santé au travail. » (Yves Clot)",
    ],
    piegesExamen:
      "Ne pas présenter la consigne prescrite comme une ennemie inutile : la tâche est un repère structurant indispensable. L'erreur est de croire qu'elle suffit pour travailler.",
  },

  // --- PST123 ---
  {
    id: "sujet-123-1",
    moduleKey: "pst123",
    titre:
      "L'identité au travail est-elle le produit de l'organisation ou l'expression de trajectoires biographiques individuelles ?",
    problematique:
      "Dans quelle mesure la construction des identités professionnelles résulte-t-elle de la double négociation entre socialisation institutionnelle organisationnelle et histoire biographique singulière ?",
    enjeuAcademique:
      "Confrontation des deux grandes théories de sociologie de l'identité enseignées par Élisabeth Lucy : Renaud Sainsaulieu (L'identité au travail) et Claude Dubar (La socialisation).",
    plan18_20: {
      partie1: {
        titre:
          "I. L'apprentissage politique et culturel de l'identité par l'organisation",
        sousPartieA: {
          titre: "A. L'entreprise comme lieu de socialisation politique",
          argument:
            "Renaud Sainsaulieu démontre que l'identité professionnelle ne s'explique pas par la psychologie innée, mais par l'accès concret au pouvoir et à l'autonomie technique sur le poste de travail.",
          auteurRef: "Renaud Sainsaulieu (L'identité au travail, 1977)",
        },
        sousPartieB: {
          titre: "B. La typologie des 4 modèles relationnels de Sainsaulieu",
          argument:
            "L'organisation forge des cultures distinctes : modèle fusionnel de l'atelier sans issue, modèle du retrait alimentaire, modèle négociateur des experts légitimes et modèle affinitaire des réseaux de courtiers.",
          auteurRef: "Renaud Sainsaulieu (1977)",
        },
      },
      partie2: {
        titre:
          "II. La dynamique de la double transaction : l'articulation individu-institution",
        sousPartieA: {
          titre:
            "A. La double transaction biographique et relationnelle de Dubar",
          argument:
            "Claude Dubar dépasse le déterminisme organisationnel en montrant que l'identité est le produit d'un arbitrage permanent entre qui je dis être dans mon histoire (pour soi) et ce que l'entreprise m'attribue (pour autrui).",
          auteurRef: "Claude Dubar (La socialisation, 1991)",
        },
        sousPartieB: {
          titre:
            "B. Crises d'identités contemporaines : blocages, reconversions et déclassement",
          argument:
            "Lorsque les actes d'attribution ne correspondent pas aux actes d'appartenance (décalage diplôme-poste, réorganisations brutales), les identités se fracturent, ouvrant la voie à la désaffiliation.",
          auteurRef:
            "Claude Dubar & Robert Castel (Les Métamorphoses de la question sociale, 1995)",
        },
      },
    },
    citationsObligatoires: [
      "« L'entreprise est un lieu d'apprentissage culturel des relations de pouvoir. » (Renaud Sainsaulieu)",
      "« L'identité est le résultat d'une double transaction : biographique pour soi et relationnelle pour autrui. » (Claude Dubar)",
    ],
    piegesExamen:
      "Ne jamais opposer stérilement individu et société : montrez que l'individu est pétri de social (habitus bourdieusien) et que l'organisation n'est pas un bloc homogène mais un espace de transactions.",
  },

  // --- TRANSVERSAL (PST106 & PST108) ---
  {
    id: "sujet-trans-1",
    moduleKey: "transversal",
    titre:
      "L'agir communicationnel d'Habermas peut-il être un levier pour libérer l'activité empêchée selon Clot ?",
    problematique:
      "Comment la reconstruction d'un espace délibératif argumenté fondé sur la validité communicationnelle permet-elle de réinstituer le genre professionnel et de surmonter la souffrance du travail empêché ?",
    enjeuAcademique:
      "Sujet d'excellence RNCP 7 croisant la sociologie de la communication (PST108) et la clinique de l'activité (PST106).",
    plan18_20: {
      partie1: {
        titre:
          "I. Le diagnostic croisé : quand la domination instrumentale détruit le travail soigné",
        sousPartieA: {
          titre:
            "A. L'agir stratégique managérial étouffe la parole professionnelle",
          argument:
            "Habermas montre que les organisations actuelles colonisent le monde vécu par des impératifs systémiques chiffrés. Les salariés sont privés d'espace pour dire les difficultés réelles de leur métier.",
          auteurRef: "Jürgen Habermas (1981)",
        },
        sousPartieB: {
          titre:
            "B. La dégradation du genre professionnel et l'activité empêchée",
          argument:
            "Clot démontre que lorsque le dialogue sur la qualité du travail est interdit, le genre professionnel s'effrite. Les opérateurs sont isolés face au travail bâclé, générant conflits de valeurs et RPS.",
          auteurRef: "Yves Clot (2010)",
        },
      },
      partie2: {
        titre:
          "II. L'articulation clinique : restaurer la controverse de métier par la délibération rationnelle",
        sousPartieA: {
          titre:
            "A. L'auto-confrontation croisée comme microsphère publique habermassienne",
          argument:
            "Le dispositif d'auto-confrontation croisée crée précisément les conditions d'un agir communicationnel : les pairs débattent de leurs manières de travailler en soumettant leurs arguments aux critères de vérité et d'efficacité.",
          auteurRef: "Yves Clot & Daniel Faïta (2000)",
        },
        sousPartieB: {
          titre: "B. De la délibération au rétablissement du pouvoir d'agir",
          argument:
            "En s'appuyant sur des arguments validés collectivement, les collectifs de travail peuvent négocier de nouveaux arbitrages organisationnels avec la hiérarchie et réhabiliter le travail bien fait.",
          auteurRef: "Synthèse dialectique PST106 / PST108",
        },
      },
    },
    citationsObligatoires: [
      "« L'activité empêchée est le résultat de l'interdiction de débattre des critères du travail bien fait. » (Yves Clot)",
      "« La recherche d'entente rationnelle est le seul antidote à la violence de l'agir stratégique masqué. » (Jürgen Habermas)",
    ],
    piegesExamen:
      "Veiller à ne pas confondre le cadre d'Habermas (philosophie politique et théorie sociale) avec les méthodes de terrain de Clot : montrez bien comment l'ergonome ou le psychologue opérationnalise le concept habermassien sur le terrain.",
  },
];

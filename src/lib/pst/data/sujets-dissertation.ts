export interface SujetDissertation {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst120" | "pst123" | "pst124" | "transversal";
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
  // =========================================================================
  // PST108 — PSYCHOSOCIOLOGIE DE LA COMMUNICATION & DU DIALOGUE
  // =========================================================================
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
  {
    id: "sujet-108-3",
    moduleKey: "pst108",
    titre:
      "« Communiquer, c'est négocier du sens ou exercer un pouvoir ? » Analysez les modèles interactionnistes et stratégiques de la communication au travail.",
    problematique:
      "Dans quelle mesure la communication en milieu professionnel peut-elle être analysée comme un contrat de communication partagé (Ghiglione) plutôt que comme une arène de manipulation et de luttes de pouvoir stratégiques (Habermas, Crozier & Friedberg) ?",
    enjeuAcademique:
      "Confrontation entre la psychologie sociale du langage de Rodolphe Ghiglione (Contrat de communication et mondes partagés) et la sociologie des organisations / théorie critique.",
    plan18_20: {
      partie1: {
        titre:
          "I. Le contrat de communication : négociation d'enjeux et co-construction du sens",
        sousPartieA: {
          titre:
            "A. Les règles du contrat de communication selon Rodolphe Ghiglione",
          argument:
            "Pour que deux interlocuteurs se comprennent, ils doivent passer un contrat implicite régissant la pertinence, la légitimité réciproque et les finalités de l'échange.",
          auteurRef: "Rodolphe Ghiglione (L'homme communiquant, 1986)",
        },
        sousPartieB: {
          titre:
            "B. L'intersubjectivité et la réflexivité dans l'interaction de travail",
          argument:
            "L'école de Palo Alto et Bateson rappellent qu'on ne peut pas ne pas communiquer. Toute communication comporte un aspect contenu et un aspect relation qui s'ajustent continuellement.",
          auteurRef:
            "Gregory Bateson & Paul Watzlawick (Une logique de la communication, 1967)",
        },
      },
      partie2: {
        titre:
          "II. La dénaturation stratégique : asymétrie des ressources et instrumentalisation du dialogue",
        sousPartieA: {
          titre:
            "A. Les zones d'incertitude et la rétention d'information comme pouvoir",
          argument:
            "Michel Crozier montre que la communication réelle au sein des ateliers ou bureaux est une négociation de pouvoir : maîtriser l'incertitude informationnelle confère une marge de liberté stratégique.",
          auteurRef:
            "Michel Crozier & Erhard Friedberg (L'acteur et le système, 1977)",
        },
        sousPartieB: {
          titre:
            "B. L'agir stratégique masqué et la manipulation discursive du management",
          argument:
            "Habermas dévoile comment le langage managérial moderne (storytelling, bienveillance affichée) masque des impératifs unilatéraux de rentabilité en prétendant instaurer un consensus participatif.",
          auteurRef: "Jürgen Habermas (Théorie de l'agir communicationnel, 1981)",
        },
      },
    },
    citationsObligatoires: [
      "« Communiquer, c'est co-construire une réalité sous l'égide d'un contrat partagé. » (Rodolphe Ghiglione)",
      "« Le pouvoir est une relation d'échange où l'un peut obtenir plus que l'autre en contrôlant une zone d'incertitude. » (Michel Crozier)",
    ],
    piegesExamen:
      "Ne pas réduire l'analyse de Ghiglione à une psychologie purement cognitive : son modèle du contrat de communication intègre pleinement les statuts sociaux et les contraintes contextuelles.",
  },

  // =========================================================================
  // PST106 — ERGONOMIE & CLINIQUE DE L'ACTIVITÉ
  // =========================================================================
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
  {
    id: "sujet-106-2",
    moduleKey: "pst106",
    titre:
      "« L'homme n'est pas un système programmable » : La critique ergonomique du taylorisme et l'irréductibilité de la variabilité humaine.",
    problematique:
      "Comment la prise en compte de la variabilité intra- et inter-individuelle et de la dynamique des situations réelles par l'ergonomie de langue française démonte-t-elle le mythe du « One Best Way » taylorien ?",
    enjeuAcademique:
      "Fondation de l'ergonomie au Cnam : Alain Wisner (anthropotechnologie, variabilité), Jacques Leplat (variabilité et compétences), Antoine Laville (charge de travail).",
    plan18_20: {
      partie1: {
        titre:
          "I. L'illusion taylorienne d'un opérateur standard et interchangeable",
        sousPartieA: {
          titre: "A. Les postulats de l'organisation scientifique du travail",
          argument:
            "Taylor postule la séparation radicale de la conception et de l'exécution, imposant une méthode unique censée convenir à tout ouvrier docile, assimilé à un moteur physiologique simple.",
          auteurRef:
            "Frederick Winslow Taylor (Principles of Scientific Management, 1911)",
        },
        sousPartieB: {
          titre: "B. Les dégâts de la standardisation sur la santé ouvrière",
          argument:
            "Alain Wisner et Antoine Laville mettent en lumière les pathologies de contrainte posturale, la charge mentale et les troubles musculosquelettiques induits par le déni des rythmes biologiques individuels.",
          auteurRef: "Antoine Laville (L'ergonomie, 1976)",
        },
      },
      partie2: {
        titre:
          "II. L'irréductible variabilité humaine : cœur du compromis opératoire",
        sousPartieA: {
          titre:
            "A. Variabilité inter-individuelle et intra-individuelle selon Leplat",
          argument:
            "Un opérateur n'est jamais le même d'une heure à l'autre (fatigue, vigilance chronobiologique) ni identique à son collègue (âge, expérience, morphologie). Travailler exige des modes opératoires plastiques.",
          auteurRef: "Jacques Leplat (L'analyse psychologique du travail, 1997)",
        },
        sousPartieB: {
          titre:
            "B. L'anthropotechnologie de Wisner : adapter le travail à l'homme réel",
          argument:
            "L'ergonomie de conception inverse la logique : ce n'est pas à l'homme de se contorsionner pour entrer dans la machine, mais au poste et à l'organisation d'offrir des marges de manœuvre régulatrices.",
          auteurRef:
            "Alain Wisner (Quand les médecins et ingénieurs se rencontrent, 1972)",
        },
      },
    },
    citationsObligatoires: [
      "« Le One Best Way taylorien est une fiction destructrice : il n'y a pas d'opérateur moyen. » (Alain Wisner)",
      "« L'activité est une régulation continue entre des conditions internes variables et des contraintes externes mouvantes. » (Jacques Leplat)",
    ],
    piegesExamen:
      "Ne pas limiter la variabilité aux seules dimensions physiques ou morphologiques : insistez impérativement sur la variabilité cognitive (stratégies de résolution de problème) et temporelle (rythmes circadiens).",
  },
  {
    id: "sujet-106-3",
    moduleKey: "pst106",
    titre:
      "Clinique de l'activité et ergonomie cognitive : Deux voies d'émancipation du pouvoir d'agir ?",
    problematique:
      "En quoi la clinique de l'activité (Yves Clot) réinterroge-t-elle les modèles du traitement de l'information de l'ergonomie cognitive en réintroduisant le conflit esthétique et éthique sur le travail bien fait ?",
    enjeuAcademique:
      "Confrontation des deux grandes écoles d'analyse du travail au Cnam : l'ergonomie cognitive (Leplat, Hoc, Rasmussen - charge mentale, modèles mentaux) et la clinique de l'activité (Clot - réel de l'activité, genre, pouvoir d'agir).",
    plan18_20: {
      partie1: {
        titre:
          "I. L'ergonomie cognitive : modéliser les processus mentaux pour décharger l'opérateur",
        sousPartieA: {
          titre: "A. La modélisation de la charge mentale et des représentations",
          argument:
            "L'ergonomie cognitive s'attache à comprendre comment l'opérateur traite les signaux, forme des modèles mentaux opérationnels et régule son effort cognitif en situation complexe.",
          auteurRef: "Jacques Leplat & Jean-Marie Hoc (1983)",
        },
        sousPartieB: {
          titre: "B. La prévention des erreurs et l'assistance instrumentale",
          argument:
            "L'approche de Rasmussen (niveaux Skills, Rules, Knowledge) permet d'optimiser l'ergonomie des interfaces pour prévenir l'erreur humaine et réduire les surcharges informationnelles.",
          auteurRef: "Jens Rasmussen (Information Processing, 1986)",
        },
      },
      partie2: {
        titre:
          "II. La clinique de l'activité : réhabiliter le sens, le conflit et le pouvoir d'agir",
        sousPartieA: {
          titre:
            "A. Les limites du cognitivisme : le travail n'est pas qu'un traitement de données",
          argument:
            "Pour Yves Clot, travailler engage la subjectivité, le désir de reconnaissance et le souci de l'ouvrage soigné. Réduire l'activité au traitement de l'information occulte le réel de ce qui ne se fait pas mais aurait pu se faire.",
          auteurRef: "Yves Clot (La fonction psychologique du travail, 1999)",
        },
        sousPartieB: {
          titre:
            "B. L'auto-confrontation croisée : rouvrir la controverse collective sur le travail bien fait",
          argument:
            "Le pouvoir d'agir ne se restaure pas par de simples consignes simplifiées, mais par la confrontation dialogique des manières de faire au sein du collectif, reconstruisant le genre professionnel.",
          auteurRef: "Yves Clot & Daniel Faïta (2000)",
        },
      },
    },
    citationsObligatoires: [
      "« Le réel de l'activité, c'est aussi ce qui ne se fait pas, ce qu'on ne peut pas faire, ce qu'on cherche à faire sans y parvenir. » (Yves Clot)",
      "« L'activité cognitive au travail est toujours située et finalisée par les buts opératoires du sujet. » (Jacques Leplat)",
    ],
    piegesExamen:
      "Ne pas disqualifier l'ergonomie cognitive : montrez qu'elle est indispensable pour concevoir des systèmes fiables, mais qu'elle doit être complétée par la clinique pour traiter des questions de santé psychique et de sens du travail.",
  },

  // =========================================================================
  // PST123 — SOCIOLOGIE DU TRAVAIL, DE L'EMPLOI & DES IDENTITÉS
  // =========================================================================
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
  {
    id: "sujet-123-2",
    moduleKey: "pst123",
    titre:
      "Culture d'atelier, affiliation et retrait : L'actualité des quatre figures identitaires de Renaud Sainsaulieu face aux organisations contemporaines.",
    problematique:
      "Dans quelle mesure les quatre modèles de socialisation identitaire au travail (fusionnel, retrait, négociation, affinité) théorisés par Sainsaulieu dans les structures industrielles restent-ils pertinents pour comprendre l'engagement et le désengagement des salariés dans les organisations agiles contemporaines ?",
    enjeuAcademique:
      "Enseignement majeur de sociologie du travail PST123 : Renaud Sainsaulieu (L'identité au travail, 1977) confronté aux nouvelles formes d'organisation par projet (Boltanski & Chiapello).",
    plan18_20: {
      partie1: {
        titre:
          "I. L'ancrage structurel des identités : la matrice originelle de Sainsaulieu",
        sousPartieA: {
          titre:
            "A. Le travail comme expérience politique des rapports de pouvoir",
          argument:
            "L'enquête pionnière chez EDF et dans l'industrie révèle que ce ne sont pas les origines sociales mais l'organisation du pouvoir au quotidien (accès aux chefs, promotions, autonomie technique) qui fabriquent les attitudes au travail.",
          auteurRef: "Renaud Sainsaulieu (L'identité au travail, 1977)",
        },
        sousPartieB: {
          titre:
            "B. Les 4 figures cardinales : fusion, retrait, négociation, affinité",
          argument:
            "La fusion (solidarité ouvrière non qualifiée contre la hiérarchie), le retrait (travail purement alimentaire sans illusion), la négociation (experts techniques syndiqués faisant reconnaître leur savoir) et l'affinité (cadres mobiles en quête d'ascension par cooptation).",
          auteurRef: "Renaud Sainsaulieu (1977)",
        },
      },
      partie2: {
        titre:
          "II. Métamorphoses contemporaines : l'explosion du modèle négociateur et la montée du retrait",
        sousPartieA: {
          titre:
            "A. L'effondrement des collectifs fusionnels et l'injonction affinitaire",
          argument:
            "Le passage à l'organisation par projet (Boltanski & Chiapello) détruit les protections de l'atelier fusionnel. La norme affinitaire (réseautage, personal branding) devient obligatoire, marginalisant ceux qui n'ont que leur force de travail.",
          auteurRef:
            "Luc Boltanski & Ève Chiapello (Le nouvel esprit du capitalisme, 1999)",
        },
        sousPartieB: {
          titre:
            "B. La résurgence du retrait protecteur face au management de l'urgence",
          argument:
            "Le « quiet quitting » ou la démission intérieure contemporaine constituent la forme modernisée du modèle du retrait de Sainsaulieu : une défense rationnelle contre l'épuisement psychique imposé par les métriques de productivité.",
          auteurRef: "Renaud Sainsaulieu & Vincent de Gaulejac (2012)",
        },
      },
    },
    citationsObligatoires: [
      "« L'accès au pouvoir dans l'atelier détermine la capacité de l'individu à s'affirmer comme sujet social. » (Renaud Sainsaulieu)",
      "« Dans la cité par projets, la grandeur se mesure à la connectivité et à la flexibilité relationnelle. » (Boltanski & Chiapello)",
    ],
    piegesExamen:
      "Ne pas figer la typologie de Sainsaulieu comme des cases étanches ou des traits de personnalité psychologiques : ce sont des idéaux-types sociologiques dynamiques indexés sur la division concrète du travail.",
  },
  {
    id: "sujet-123-3",
    moduleKey: "pst123",
    titre:
      "Reproduction des destins ou bifurcations biographiques ? La dialectique de l'habitus et de la double transaction identitaire.",
    problematique:
      "Les identités professionnelles sont-elles condamnées à reproduire les déterminismes de classe par l'habitus (Bourdieu) ou constituent-elles des espaces de recomposition et de plasticité biographique à travers les transitions professionnelles (Dubar) ?",
    enjeuAcademique:
      "Confrontation sociologique centrale PST123 : Pierre Bourdieu (Habitus, violence symbolique, illusion biographique) vs Claude Dubar (Double transaction biographique/relationnelle, formes identitaires) et Robert Castel.",
    plan18_20: {
      partie1: {
        titre:
          "I. Le poids des structures intériorisées : l'habitus comme destin sociologique",
        sousPartieA: {
          titre: "A. L'habitus comme système de dispositions durables",
          argument:
            "Bourdieu démontre que les choix d'orientation, les goûts et les manières d'habiter un métier sont façonnés dès la socialisation primaire par le capital culturel et économique de la famille d'origine.",
          auteurRef: "Pierre Bourdieu (Le sens pratique, 1980)",
        },
        sousPartieB: {
          titre: "B. L'illusion biographique et la violence symbolique",
          argument:
            "Croire que l'on a 'choisi sa vocation' de manière totalement libre et autonome relève de l'illusion biographique : le champ social attribue des places et fait intérioriser aux dominés la légitimité de leur propre relégation.",
          auteurRef:
            "Pierre Bourdieu (L'illusion biographique, 1986 ; La Reproduction, 1970)",
        },
      },
      partie2: {
        titre:
          "II. La plasticité des parcours : la double transaction comme négociation continue",
        sousPartieA: {
          titre: "A. La négociation entre soi et autrui selon Claude Dubar",
          argument:
            "Dubar montre que les bifurcations biographiques existent : lors des reconversions ou promotions, l'identité pour soi (continuité biographique) négocie avec l'identité pour autrui (reconnaissance des pairs et de l'employeur).",
          auteurRef: "Claude Dubar (La socialisation, 1991)",
        },
        sousPartieB: {
          titre:
            "B. Vulnérabilités contemporaines et désaffiliation sociale (Castel)",
          argument:
            "La réussite de la transaction dépend de l'état de la société salariale : quand la précarité s'installe, la transaction échoue, basculant les individus de la vulnérabilité vers la désaffiliation et la rupture d'identité.",
          auteurRef:
            "Robert Castel (Les métamorphoses de la question sociale, 1995)",
        },
      },
    },
    citationsObligatoires: [
      "« L'habitus est une histoire faite nature : le passé qui survit dans le présent sous forme de schèmes d'action. » (Pierre Bourdieu)",
      "« L'identité professionnelle n'est jamais donnée d'avance, elle se forge dans l'épreuve de la double transaction. » (Claude Dubar)",
    ],
    piegesExamen:
      "Ne pas présenter Bourdieu comme un pur fataliste mécanique ni Dubar comme un chantre du libre arbitre libéral : montrez comment la transaction de Dubar opère toujours sous les contraintes objectives mises en lumière par Bourdieu.",
  },

  // =========================================================================
  // PST120 — PSYCHODYNAMIQUE & PSYCHOPATHOLOGIE DU TRAVAIL
  // =========================================================================
  {
    id: "sujet-120-1",
    moduleKey: "pst120",
    titre:
      "Souffrance éthique et travail empêché : Quand le salarié est sommé de trahir son idéal de métier.",
    problematique:
      "Comment le conflit entre les valeurs morales du sujet, les règles de l'art du métier et les injonctions gestionnaires de rentabilité produit-il une souffrance éthique pathogène distincte de la simple pénibilité physique ?",
    enjeuAcademique:
      "Chaire de Psychodynamique du Travail du Cnam : Christophe Dejours (Le facteur humain, Souffrance en France) croisé avec Yves Clot (Le travail à cœur).",
    plan18_20: {
      partie1: {
        titre:
          "I. La genèse de la souffrance éthique : le travail comme expérience morale",
        sousPartieA: {
          titre: "A. De la pénibilité physique à la souffrance éthique selon Dejours",
          argument:
            "La souffrance contemporaine n'est plus seulement celle de l'épuisement musculaire, mais celle éprouvée par le travailleur forcé d'exécuter des actes qu'il réprouve moralement (mensonge au client, soin bâclé, reporting truqué).",
          auteurRef: "Christophe Dejours (Souffrance en France, 1998)",
        },
        sousPartieB: {
          titre: "B. L'activité empêchée et le travail à cœur bafoué",
          argument:
            "Pour Clot, lorsqu'un soignant ou un agent public ne peut plus faire un 'travail bien fait', la fonction psychologique du travail se retourne contre lui. Le travail bâclé devient toxique pour la santé mentale.",
          auteurRef: "Yves Clot (Le travail à cœur, 2010)",
        },
      },
      partie2: {
        titre:
          "II. Le destin pathologique du conflit de valeurs et les conditions de son dépassement",
        sousPartieA: {
          titre:
            "A. L'effondrement des défenses et les décompensations narcissiques",
          argument:
            "Faute de pouvoir délibérer collectivement sur ce conflit, le sujet intériorise la culpabilité. La perte de l'estime de soi ouvre la voie au burn-out d'épuisement moral ou au désespoir somatique.",
          auteurRef: "Christophe Dejours (Travail, usure mentale, 2000)",
        },
        sousPartieB: {
          titre:
            "B. L'institution de l'espace de délibération déontique comme levier thérapeutique",
          argument:
            "La restauration de la santé passe par la recréation d'espaces où la controverse sur les critères du travail bien fait redevient légitime face aux exigences quantitatives aveugles du management financier.",
          auteurRef:
            "Christophe Dejours (La panne, 2012) & Yves Clot (2010)",
        },
      },
    },
    citationsObligatoires: [
      "« La souffrance éthique commence lorsqu'on demande au travailleur de collaborer à ce que sa conscience réprouve. » (Christophe Dejours)",
      "« Le travail bâclé est une blessure narcissique qui ronge l'identité de l'intérieur. » (Yves Clot)",
    ],
    piegesExamen:
      "Ne pas confondre la souffrance éthique avec une simple divergence d'opinion syndicale ou une plainte individuelle : montrez que c'est une altération clinique profonde de l'intégrité morale du sujet face au travail réel.",
  },
  {
    id: "sujet-120-2",
    moduleKey: "pst120",
    titre:
      "Éthique du care, vulnérabilité et invisibilité : Pourquoi le travail relationnel et de soin résiste-t-il aux métriques gestionnaires ?",
    problematique:
      "En quoi l'invisibilisation du travail de care et sa réduction à des protocoles chiffrés détruisent-ils la dimension politique et vivante du travail de sollicitude envers les êtres vulnérables ?",
    enjeuAcademique:
      "Enseignement de Pascale Molinier (Le travail du care, 2013) articulé à la théorie politique du care (Carol Gilligan, Joan Tronto) et à la psychodynamique du travail.",
    plan18_20: {
      partie1: {
        titre:
          "I. La spécificité clinique du care : l'intelligence des habiletés discrètes",
        sousPartieA: {
          titre: "A. Définition du care et critique du paradigme viril dejourien",
          argument:
            "Pascale Molinier démontre que la psychodynamique du travail s'est initialement construite sur des terrains masculins (bâtiment, industrie) centrés sur le défi héroïque au danger, méconnaissant le soin attentif aux personnes fragiles.",
          auteurRef: "Pascale Molinier (Le travail du care, 2013)",
        },
        sousPartieB: {
          titre:
            "B. Les habiletés discrètes et l'incommensurabilité du temps relationnel",
          argument:
            "Apaiser un patient en détresse ou deviner une souffrance inexprimée relève d'une attention sensible non codifiable dans un manuel de procédures ni mesurable par un chronomètre.",
          auteurRef:
            "Pascale Molinier, Sandra Laugier, Patricia Paperman (2009)",
        },
      },
      partie2: {
        titre:
          "II. La mutilation gestionnaire du soin : maltraitance institutionnelle et souffrance des soignantes",
        sousPartieA: {
          titre:
            "A. Le minutage taylorien des actes : toilettes minutées et déqualification",
          argument:
            "Le New Public Management impose des grilles tarifaires à l'acte (T2A, grilles AGGIR) qui nient le temps du relationnel. L'obligation d'aller vite transforme les soignants en exécutants maltraitants malgré eux.",
          auteurRef: "Pascale Molinier (2013)",
        },
        sousPartieB: {
          titre:
            "B. Vers une requalification politique et démocratique de la vulnérabilité",
          argument:
            "Joan Tronto et Molinier rappellent que le care n'est pas un sentimentalisme féminin privé, mais une pratique citoyenne centrale indispensable au maintien du lien social démocratique.",
          auteurRef: "Joan Tronto (Un monde vulnérable, 1993)",
        },
      },
    },
    citationsObligatoires: [
      "« Le care repose sur des habiletés discrètes qui ne se voient que lorsqu'elles font défaut. » (Pascale Molinier)",
      "« Réduire le soin à des actes chronométrés, c'est programmer la déshumanisation institutionnelle. » (Joan Tronto)",
    ],
    piegesExamen:
      "Ne jamais naturaliser le care comme une 'vocation innée des femmes' ou une gentillesse naturelle : soulignez qu'il s'agit d'un travail hautement qualifié, pénible, exigeant une mobilisation psychique permanente.",
  },
  {
    id: "sujet-120-3",
    moduleKey: "pst120",
    titre:
      "De la fatigue industrielle à l'usure mentale contemporaine : Continuités et ruptures épistémologiques en psychopathologie du travail.",
    problematique:
      "Comment le regard clinique sur la souffrance au travail s'est-il déplacé de la fatigue nerveuse et des névroses situationnelles (Le Guillant, Veil) aux pathologies de la surcharge mentale et du désespoir gestionnaire contemporain ?",
    enjeuAcademique:
      "Histoire de la psychopathologie du travail au Cnam : Louis Le Guillant (Névrose des téléphonistes, employées de maison), Claude Veil (États d'épuisement), Paul Sivadon, Georges Canguilhem.",
    plan18_20: {
      partie1: {
        titre:
          "I. Les pionniers de l'après-guerre : la découverte des névroses professionnelles",
        sousPartieA: {
          titre: "A. Louis Le Guillant et la névrose des téléphonistes",
          argument:
            "En 1956, Le Guillant étudie les opératrices du central téléphonique et démontre que leurs symptômes (troubles du sommeil, anxiété, vertiges) ne sont pas des tares individuelles mais la conséquence directe des cadences infernales et du contrôle policier du chronomètre.",
          auteurRef: "Louis Le Guillant (La névrose des téléphonistes, 1956)",
        },
        sousPartieB: {
          titre:
            "B. Claude Veil et le concept d'état d'épuisement par désadaptation",
          argument:
            "Veil théorise la fatigue comme signal biologique vital et l'épuisement comme rupture de l'équilibre dynamique d'adaptation de l'organisme face aux sollicitations chroniques du milieu industriel.",
          auteurRef: "Claude Veil (Les états d'épuisement, 1957)",
        },
      },
      partie2: {
        titre:
          "II. La mutation contemporaine : du corps usé à l'âme isolée dans l'hyper-sollicitation",
        sousPartieA: {
          titre:
            "A. Le passage de la contrainte physique au harcèlement de la subjectivité",
          argument:
            "Dans le néo-management, la contrainte n'est plus seulement externe (la chaîne), elle est intériorisée via l'auto-évaluation, la concurrence généralisée et la connexion numérique permanente.",
          auteurRef: "Christophe Dejours & Georges Canguilhem (Le normal et le pathologique, 1966)",
        },
        sousPartieB: {
          titre:
            "B. La santé comme pouvoir d'instituer des normes face au dogme gestionnaire",
          argument:
            "Selon Canguilhem, être en bonne santé, c'est pouvoir tomber malade et instaurer de nouvelles normes de vie. Le management par KPI empêche cette création normative, enfermant le travailleur dans une usure mentale stérile.",
          auteurRef: "Georges Canguilhem (1966)",
        },
      },
    },
    citationsObligatoires: [
      "« La névrose professionnelle est la réponse normale d'un organisme sain à une situation de travail anormale et pathogène. » (Louis Le Guillant)",
      "« La santé est la capacité de surmonter les crises et d'instituer de nouvelles normes. » (Georges Canguilhem)",
    ],
    piegesExamen:
      "Ne pas traiter les travaux des pionniers comme de vieilles curiosités historiques : montrez la modernité frappante de la méthodologie clinique de Le Guillant pour analyser les centres d'appels actuels.",
  },

  // =========================================================================
  // PST124 — USAGES NUMÉRIQUES, ACCEPTATION SITUÉE & TECHNOLOGIES CAPACITANTES
  // =========================================================================
  {
    id: "sujet-124-1",
    moduleKey: "pst124",
    titre:
      "De l'acceptabilité instrumentale à l'acceptation située : Pour une clinique des usages technologiques au travail.",
    problematique:
      "Pourquoi les modèles traditionnels d'acceptabilité technologique (TAM, UTAUT) échouent-ils à anticiper les rejets et les contournements d'outils numériques, et comment la clinique de l'usage située de Bobillier-Chaumon permet-elle de réhabiliter le pouvoir d'agir ?",
    enjeuAcademique:
      "Chaire de Psychologie du Travail Cnam : Pr. Marc-Éric Bobillier-Chaumon (Décrypter les usages numériques au travail, 2021) vs Davis (TAM) et Lucy Suchman (Action située).",
    plan18_20: {
      partie1: {
        titre:
          "I. L'impasse de l'acceptabilité a priori : l'illusion d'un utilisateur rationnel décontextualisé",
        sousPartieA: {
          titre: "A. La critique du modèle TAM (Technology Acceptance Model)",
          argument:
            "Le modèle TAM de Davis postule que l'usage futur dépend de l'utilité perçue et de la facilité d'utilisation perçue mesurées avant le déploiement par questionnaire. Ce cadre réduit l'activité à une décision rationnelle individuelle et linéaire.",
          auteurRef: "Fred Davis (1989)",
        },
        sousPartieB: {
          titre: "B. L'oubli du travail réel et l'action située de Suchman",
          argument:
            "Lucy Suchman démontre que l'action humaine n'est jamais le simple déroulement d'un plan préalable : elle s'invente en situation face aux contingences du monde matériel et social.",
          auteurRef: "Lucy Suchman (Plans and Situated Actions, 1987)",
        },
      },
      partie2: {
        titre:
          "II. La clinique de l'acceptation située : les 4 dimensions de l'activité médiatisée",
        sousPartieA: {
          titre:
            "A. Les 4 dimensions de diagnostic selon Bobillier-Chaumon",
          argument:
            "L'acceptation se construit dans le travail réel à travers 4 épreuves : 1) Utilité pour l'activité concrète, 2) Utilisabilité motrice et cognitive, 3) Intégration dans le collectif et l'organisation, 4) Signification pour l'identité et le sens du métier.",
          auteurRef:
            "Marc-Éric Bobillier-Chaumon (Acceptation située, 2013/2021)",
        },
        sousPartieB: {
          titre:
            "B. De la technologie incapacitante à la technologie capacitante",
          argument:
            "Un système numérique n'est accepté durablement que s'il est capacitant, c'est-à-dire s'il élargit les marges de manœuvre et le pouvoir d'agir au lieu d'enfermer l'opérateur dans un taylorisme digital de surveillance.",
          auteurRef:
            "Marc-Éric Bobillier-Chaumon & Pierre Falzon (Ergonomie constructive, 2013)",
        },
      },
    },
    citationsObligatoires: [
      "« L'acceptation d'une technologie n'est jamais un état préalable : c'est un processus dynamique situé qui se négocie à l'épreuve du travail réel. » (Marc-Éric Bobillier-Chaumon)",
      "« Les plans sont des ressources pour l'action, non des programmes qui la déterminent. » (Lucy Suchman)",
    ],
    piegesExamen:
      "Bannir absolument l'expression managériale 'résistance au changement' : tout refus ou contournement d'un outil numérique est une information clinique précieuse sur un dysfonctionnement de l'activité réelle.",
  },
  {
    id: "sujet-124-2",
    moduleKey: "pst124",
    titre:
      "Genèse instrumentale et catachrèses : L'activité humaine contre le déterminisme technique des artefacts numériques.",
    problematique:
      "En quoi la distinction conceptuelle entre l'artefact technique donné par les concepteurs et l'instrument élaboré par le travailleur (Rabardel) démontre-t-elle que l'usage est une création continue et politique ?",
    enjeuAcademique:
      "Théorie fondamentale de l'ergonomie cognitive francophone : Pierre Rabardel (Les hommes et les technologies, 1995) articulé à Gilbert Simondon (Du mode d'existence des objets techniques) et Yves Clot.",
    plan18_20: {
      partie1: {
        titre:
          "I. De l'artefact neutre à l'instrument constitué : la rupture théorique de Rabardel",
        sousPartieA: {
          titre:
            "A. La formule clé : Instrument = Artefact + Schèmes d'utilisation",
          argument:
            "L'artefact matériel ou logiciel n'est qu'un objet inerte conçu par des ingénieurs. Pour devenir instrument, il doit être approprié par le travailleur qui lui associe des schèmes d'action opératoires singuliers.",
          auteurRef:
            "Pierre Rabardel (Les hommes et les technologies, 1995)",
        },
        sousPartieB: {
          titre:
            "B. Le double mouvement de la genèse instrumentale : instrumentation et instrumentalisation",
          argument:
            "Dans l'instrumentation, le sujet transforme ses propres manières de penser sous l'effet de l'outil ; dans l'instrumentalisation, le sujet modifie et adapte l'outil pour répondre aux imprévus de son activité.",
          auteurRef: "Pierre Rabardel (1995)",
        },
      },
      partie2: {
        titre:
          "II. La catachrèse et le braconnage : quand le travailleur réinvente le système",
        sousPartieA: {
          titre:
            "A. La catachrèse ergonomique : détournement d'usage légitime",
          argument:
            "Utiliser un logiciel de gestion des stocks comme messagerie informelle de solidarité n'est pas une faute, mais une catachrèse inventive comblant un vide de communication laissé par la prescription.",
          auteurRef:
            "Pierre Rabardel (1995) & Michel de Certeau (L'invention du quotidien, 1980)",
        },
        sousPartieB: {
          titre:
            "B. La conception continuée dans l'usage : pilier de la démocratie technique",
          argument:
            "Plutôt que de verrouiller les systèmes contre les catachrèses, l'ergonome doit installer des espaces d'évaluation pour réinjecter ces trouvailles d'usage dans les évolutions logicielles futures.",
          auteurRef:
            "Pierre Rabardel & Pascal Béguin (Conception continuée dans l'usage, 2005)",
        },
      },
    },
    citationsObligatoires: [
      "« L'instrument n'est pas donné d'avance par l'ingénieur : il est le produit d'une genèse conjointe du sujet et de l'artefact. » (Pierre Rabardel)",
      "« La catachrèse est le témoignage éclatant de la résistance du travail réel face à la clôture de la prescription technique. » (Rabardel & Béguin)",
    ],
    piegesExamen:
      "Ne pas confondre artefact (la chose technique nue) et instrument (la structure mixte artefact + schème cognitif). Insister sur le fait que la genèse instrumentale demande du temps psychique et collectif.",
  },
  {
    id: "sujet-124-3",
    moduleKey: "pst124",
    titre:
      "Le « Pharmakon » technologique et le management algorithmique : Entre prolétarisation des savoirs et réinvention du pouvoir d'agir.",
    problematique:
      "Les algorithmes et les systèmes d'IA au travail constituent-ils un poison de prolétarisation détruisant les savoirs de métier ou un remède capacitant ouvrant de nouveaux espaces de controverse professionnelle ?",
    enjeuAcademique:
      "Croisement théorique majeur : Bernard Stiegler (La société automatique, pharmacologie de la technique) et Pr. Marc-Éric Bobillier-Chaumon (Clinique de l'usage algorithmique) avec Shoshana Zuboff.",
    plan18_20: {
      partie1: {
        titre:
          "I. Le poison algorithmique : prolétarisation et dépossession du pouvoir d'agir",
        sousPartieA: {
          titre:
            "A. La prolétarisation des savoirs selon Bernard Stiegler",
          argument:
            "Stiegler nomme prolétarisation la perte des savoir-faire et des savoir-vivre captés par les machines automatiques. L'algorithme dépossède l'employé de son jugement clinique, le transformant en simple surveillant de machine.",
          auteurRef: "Bernard Stiegler (Pour une nouvelle critique de l'économie politique, 2009)",
        },
        sousPartieB: {
          titre:
            "B. Le panoptique algorithmique et l'hyper-surveillance invisible",
          argument:
            "Shoshana Zuboff et Bobillier-Chaumon montrent que l'IA managériale (tracking des frappes, scoring prédictif des appels, surveillance par caméra IA) fragmente les collectifs et instaure une méfiance permanente.",
          auteurRef:
            "Shoshana Zuboff (L'âge du capitalisme de surveillance, 2019) & Bobillier-Chaumon (2021)",
        },
      },
      partie2: {
        titre:
          "II. Le remède capacitant : réinstituer la controverse humaine sur les systèmes automatisés",
        sousPartieA: {
          titre:
            "A. Le concept de Pharmakon : la technique comme poison ET remède",
          argument:
            "Pour Platon et Stiegler, la technique est un Pharmakon. Utilisée pour automatiser les tâches répétitives tout en laissant la main au professionnel sur les arbitrages éthiques, l'IA peut démultiplier l'expertise humaine.",
          auteurRef: "Bernard Stiegler (Ce qui fait que la vie vaut la peine d'être vécue, 2010)",
        },
        sousPartieB: {
          titre:
            "B. Le retour du débat de métier face à la décision algorithmique",
          argument:
            "Pour conjurer le taylorisme digital, les organisations doivent créer des comités d'usage et des espaces de controverse où les salariés auditent régulièrement les biais et incohérences des algorithmes à partir de leur pratique de terrain.",
          auteurRef:
            "Marc-Éric Bobillier-Chaumon & Yves Clot (2021)",
        },
      },
    },
    citationsObligatoires: [
      "« Toute technique est un pharmakon : à la fois le poison qui prolétarise l'intelligence et le remède qui peut émanciper la pensée. » (Bernard Stiegler)",
      "« Lorsque l'algorithme décide sans explication, le travailleur perd la signification de son métier et son pouvoir d'agir. » (Marc-Éric Bobillier-Chaumon)",
    ],
    piegesExamen:
      "Éviter absolument la posture technophile béate tout comme le luddisme technophobe naïf : tenez fermement la tension dialectique du Pharmakon stieglerien.",
  },

  // =========================================================================
  // TRANSVERSAL (RNCP 7 PSYCHOLOGUE DU TRAVAIL)
  // =========================================================================
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

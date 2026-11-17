export interface ScenarioChoice {
  id: string;
  texte: string;
  impactAlliance: number;
  impactDeonto: number;
  feedbackClinique: string;
  isOptimal: boolean;
}

export interface ScenarioStep {
  interlocuteurReplique: string;
  choix: ScenarioChoice[];
}

export interface RoleplayScenario {
  id: string;
  moduleKey: "pst108" | "pst123" | "pst106" | "pst120" | "pst124";
  titre: string;
  roleUtilisateur: string;
  interlocuteur: string;
  contexteInitial: string;
  etapes: ScenarioStep[];
  debriefingFinal: string;
}

export const ROLEPLAY_SCENARIOS: RoleplayScenario[] = [
  // --- PST108 : NÉGOCIATION IOD ---
  {
    id: "sc-iod-108",
    moduleKey: "pst108",
    titre: "Négociation IOD face à un DRH adepte du tri de CV",
    roleUtilisateur: "Chargé de mission IOD (Méthode Castra & Valls)",
    interlocuteur: "M. Morvan, DRH d'une plateforme logistique",
    contexteInitial:
      "Vous rencontrez M. Morvan pour négocier un recrutement sur un poste de préparateur de commandes sans tri préalable. Le DRH vous accueille froidement : « Écoutez, j'ai 50 CV sur mon bureau. Envoyez-moi vos 3 meilleurs profils, je leur ferai passer un test de logique et un entretien de motivation. C'est à prendre ou à laisser. »",
    etapes: [
      {
        interlocuteurReplique:
          "« Si vous refusez de me faire parvenir les CV pour que je sélectionne, je ne vois pas pourquoi je travaillerais avec vous ! »",
        choix: [
          {
            id: "opt-1a",
            texte:
              "Céder : « D'accord, je vous transmets 3 CV de personnes motivées pour ne pas bloquer le partenariat. »",
            impactAlliance: 15,
            impactDeonto: -35,
            feedbackClinique:
              "FAUTE MAJEURE IOD ! Vous avez trahi la règle déontologique n°1 d'IOD : le refus absolu du tri préalable. En acceptant la sélection sur CV, vous retombez dans l'idéologie de l'employabilité qui disqualifie les plus précaires.",
            isOptimal: false,
          },
          {
            id: "opt-1b",
            texte:
              "Tenir la posture IOD avec pédagogie : « M. Morvan, les tests et les CV prédisent rarement la réussite en situation réelle. Dans notre méthode, nous sélectionnons l'environnement de travail et nous garantissons un appui quotidien sur le poste. Vous ne prenez aucun risque : la personne démarre lundi et nous médiatisons son intégration. »",
            impactAlliance: 20,
            impactDeonto: 30,
            feedbackClinique:
              "POSTURE 18/20 EXCELLENTE ! Vous déplacez la charge de la preuve : ce n'est pas le précaire qui doit prouver sa conformité sur papier, c'est l'organisation qui s'adapte avec l'appui continu du chargé IOD.",
            isOptimal: true,
          },
          {
            id: "opt-1c",
            texte:
              "Attaquer : « Votre méthode de sélection est discriminatoire et contraire au droit du travail ! »",
            impactAlliance: -40,
            impactDeonto: 10,
            feedbackClinique:
              "RUPTURE D'ALLIANCE : Vous avez braqué votre interlocuteur. En intervention IOD, on ne moralise pas l'entreprise : on négocie des conditions concrètes de travail réel.",
            isOptimal: false,
          },
        ],
      },
      {
        interlocuteurReplique:
          "Le DRH hésite : « Soit... mais si le candidat ne tient pas la cadence de 120 colis/heure dès le deuxième jour, je le renvoie immédiatement ! »",
        choix: [
          {
            id: "opt-2a",
            texte:
              "Fixer le cadre de la médiation : « Convenons plutôt d'une montée en charge progressive sur deux semaines avec un point d'étape quotidien de 10 minutes entre le tuteur, le salarié et moi-même pour ajuster les gestes. »",
            impactAlliance: 25,
            impactDeonto: 25,
            feedbackClinique:
              "PARFAIT ! L'IOD n'abandonne jamais le salarié : la médiation continue permet de réguler les micro-incompréhensions avant qu'elles ne se transforment en rupture.",
            isOptimal: true,
          },
          {
            id: "opt-2b",
            texte:
              "« Ne vous inquiétez pas, je vais lui mettre la pression ce week-end pour qu'il soit ultra-rapide. »",
            impactAlliance: 10,
            impactDeonto: -30,
            feedbackClinique:
              "GRAVE ERREUR : Vous vous transformez en relais managérial de rentabilité au lieu de jouer le rôle de tiers médiateur protecteur.",
            isOptimal: false,
          },
        ],
      },
    ],
    debriefingFinal:
      "La méthode IOD (Francis Valls & Denis Castra) n'est pas une simple technique de placement : c'est un renversement politique et déontologique qui refuse l'employabilité préalable pour ancrer l'intégration dans le droit commun de l'entreprise.",
  },

  // --- PST123 : RESTITUTION RPS & DÉONTOLOGIE ---
  {
    id: "sc-rps-123",
    moduleKey: "pst123",
    titre: "Pression de la Direction sur l'anonymat d'une enquête RPS",
    roleUtilisateur: "Psychologue du Travail (Loi 1985 / Code 2021)",
    interlocuteur: "Mme Girard, Directrice Générale",
    contexteInitial:
      "Après une enquête sur un climat social dégradé, vous présentez vos conclusions. Mme Girard ferme la porte de son bureau : « Je veux les noms des collaborateurs qui ont dénoncé le chef de service dans les entretiens. Si vous refusez de me donner la liste brute, je ne valide pas votre rapport et je bloque vos honoraires. »",
    etapes: [
      {
        interlocuteurReplique:
          "« Je paie votre mission, j'ai le droit de savoir qui parle dans mon entreprise ! Donnez-moi au moins les services concernés ! »",
        choix: [
          {
            id: "opt-rps-1a",
            texte:
              "Céder partiellement : « Je ne vous donne pas les noms, mais je vous précise quel bureau a témoigné pour que vous tiriez les choses au clair. »",
            impactAlliance: 10,
            impactDeonto: -45,
            feedbackClinique:
              "VIOLATION DÉONTOLOGIQUE SÉVÈRE : En désignant un micro-bureau, vous rendez les salariés immédiatement identifiables, violant le secret professionnel et le consentement éclairé (Code de déontologie 2021).",
            isOptimal: false,
          },
          {
            id: "opt-rps-1b",
            texte:
              "Opposer l'indépendance technique et la loi : « Mme Girard, la loi du 25 juillet 1985 et l'article 7 du Code de déontologie protègent le secret des entretiens. Mon rôle n'est pas de dénoncer des personnes mais de vous éclairer sur les mécanismes organisationnels qui fabriquent ces tensions. Si nous ciblons des coupables, le problème se répétera. »",
            impactAlliance: 20,
            impactDeonto: 35,
            feedbackClinique:
              "POSTURE CLINIQUE EXEMPLAIRE ! Vous triangulez la demande : vous refusez fermement la transgression déontologique tout en offrant à la DG une analyse systémique plus utile qu'une chasse aux sorcières.",
            isOptimal: true,
          },
          {
            id: "opt-rps-1c",
            texte:
              "Menacer : « Je vais vous dénoncer immédiatement à l'inspection du travail et porter plainte ! »",
            impactAlliance: -50,
            impactDeonto: -10,
            feedbackClinique:
              "RUPTURE DU CADRE : Le psychologue n'est pas un officier de police judiciaire. Sauf péril grave et imminent sur la vie d'autrui, son rôle est d'analyser le travail et de tenir le cadre d'intervention.",
            isOptimal: false,
          },
        ],
      },
      {
        interlocuteurReplique:
          "La Directrice se calme : « Très bien. Mais comment convaincre le Conseil d'Administration d'agir sans preuve nominative ? »",
        choix: [
          {
            id: "opt-rps-2a",
            texte:
              "Structurer une restitution par le travail réel : « Nous allons présenter les conflits d'arbitrage entre la cadence demandée et le manque d'outils, étayés par des verbatims anonymisés représentatifs. Cela démontrera au Conseil que la souffrance est un coût organisationnel à résorber. »",
            impactAlliance: 30,
            impactDeonto: 25,
            feedbackClinique:
              "EXCELLENT ! C'est la démonstration que la clinique du travail aide l'entreprise à progresser sans sacrifier la santé des personnes.",
            isOptimal: true,
          },
        ],
      },
    ],
    debriefingFinal:
      "La légitimité du psychologue du travail repose sur son indépendance technique (Loi 1985) et son refus d'instrumentalisation managériale. La déontologie n'est pas un frein, c'est l'outil qui rend l'intervention crédible.",
  },

  // --- PST106 : RESTITUTION ERGONOMIQUE ---
  {
    id: "sc-ergo-106",
    moduleKey: "pst106",
    titre: "Face au déni des TMS : Mauvais gestes ou Travail réel ?",
    roleUtilisateur: "Ergonome Cnam (Approche Alain Wisner)",
    interlocuteur: "M. Caron, Directeur d'Usine",
    contexteInitial:
      "Dans une usine agroalimentaire, les ouvrières souffrent de tendinites chroniques aux épaules. Le directeur vous déclare : « Écoutez, le problème ne vient pas de nos postes, qui sont aux normes AFNOR. Les filles dorment mal et passent leur soirée sur leur smartphone. Je veux que vous leur donniez une formation sur les bons gestes et postures ! »",
    etapes: [
      {
        interlocuteurReplique:
          "« Alors, vous leur faites cette formation 'Gestes & Postures' pour leur apprendre à bien se tenir ? »",
        choix: [
          {
            id: "opt-ergo-1a",
            texte:
              "Accepter : « Oui, je vais leur apprendre à garder le dos droit et à respirer pendant la coupe de viande. »",
            impactAlliance: 15,
            impactDeonto: -40,
            feedbackClinique:
              "PIÈGE INDIVIDUALISANT ! Alain Wisner et Jacques Leplat ont combattu l'illusion des 'gestes et postures' : quand les cadences et la variabilité de la viande obligent à forcer, aucun 'bon geste' ne protège les tendons.",
            isOptimal: false,
          },
          {
            id: "opt-ergo-1b",
            texte:
              "Démontrer par l'activité réelle : « M. Caron, regardons ensemble les enregistrements vidéo de l'activité réelle. La viande arrive souvent trop froide et dure, ce qui force les opératrices à exercer une pression 3 fois supérieure à la consigne. Les TMS ne viennent pas de leur comportement, mais de ce compromis opératoire subi. »",
            impactAlliance: 25,
            impactDeonto: 35,
            feedbackClinique:
              "COEUR DE L'ERGONOMIE DU CNAM ! Vous prouvez par les faits observés que l'activité réelle compense une variabilité matérielle non prise en compte par la tâche prescrite.",
            isOptimal: true,
          },
        ],
      },
      {
        interlocuteurReplique:
          "Le Directeur est surpris : « Je n'avais jamais remarqué la dureté de la viande en sortie de frigo... Que proposez-vous concrètement ? »",
        choix: [
          {
            id: "opt-ergo-2a",
            texte:
              "Agir sur les déterminants organisationnels : « Créer un sas de tempérage de la viande en amont et réaménager le manche des couteaux en co-conception avec les opératrices pour préserver leur santé et leur cadence. »",
            impactAlliance: 30,
            impactDeonto: 30,
            feedbackClinique:
              "DÉMARCHE ERGONOMIQUE COMPLÈTE : L'ergonome transforme la situation de travail pour adapter le travail à l'homme, et non l'inverse.",
            isOptimal: true,
          },
        ],
      },
    ],
    debriefingFinal:
      "L'ergonomie de l'activité refuse le réductionnisme biomécanique ou comportemental : elle analyse l'opérateur en situation réelle régulant les aléas du process.",
  },

  // --- PST120 : SOUFFRANCE ÉTHIQUE & DEJOURS ---
  {
    id: "sc-dejours-120",
    moduleKey: "pst120",
    titre: "Burn-out ou Souffrance Éthique ? (Christophe Dejours)",
    roleUtilisateur: "Psychologue du Travail (Psychodynamique Cnam)",
    interlocuteur: "M. Vasseur, Directeur Administratif & Financier",
    contexteInitial:
      "Un cadre financier chevronné est en arrêt maladie pour syndrome dépressif sévère. Le DAF vous convoque : « Écoutez, ce monsieur a des soucis personnels dans son couple. Nous lui demandions simplement de maquiller temporairement les bilans d'audit pour rassurer les actionnaires. Il a craqué par fragilité psychologique. Je veux que vous lui fassiez un bilan de compétences pour le réorienter ailleurs. »",
    etapes: [
      {
        interlocuteurReplique:
          "« Vous êtes d'accord avec moi : son effondrement est dû à sa fragilité individuelle et non aux pratiques de gestion de l'entreprise ? »",
        choix: [
          {
            id: "opt-dej-1a",
            texte:
              "Accepter l'individualisation : « En effet, nous allons lui faire passer des tests de personnalité pour évaluer sa vulnérabilité au stress. »",
            impactAlliance: 15,
            impactDeonto: -45,
            feedbackClinique:
              "FAUTE MAJEURE EN PSYCHODYNAMIQUE DU TRAVAIL ! Christophe Dejours a démontré que qualifier la souffrance de 'fragilité individuelle' est une stratégie défensive managériale pour exonérer l'organisation de ses responsabilités éthiques.",
            isOptimal: false,
          },
          {
            id: "opt-dej-1b",
            texte:
              "Poser le diagnostic de souffrance éthique : « M. Vasseur, contraindre un professionnel intègre à fausser des comptes engage sa responsabilité morale. La souffrance éthique (Dejours, 1998) surgit quand un travailleur est forcé de commettre des actes que sa conscience réprouve. Ce n'est pas une faiblesse psychologique, c'est la destruction du sens moral du travail. »",
            impactAlliance: 20,
            impactDeonto: 40,
            feedbackClinique:
              "POSTURE CLINIQUE 18/20 ! Vous replacez la souffrance au cœur de l'épreuve du travail réel : la souffrance éthique résulte d'un conflit de valeurs destructeur de l'identité professionnelle.",
            isOptimal: true,
          },
        ],
      },
      {
        interlocuteurReplique:
          "Le DAF est déstabilisé : « Mais alors, si ce n'est pas une maladie individuelle, comment éviter que les autres cadres financiers ne craquent aussi ? »",
        choix: [
          {
            id: "opt-dej-2a",
            texte:
              "Ouvrir un espace de délibération sur les règles de métier : « En restaurant un espace de discussion sécurisé où les cadres et la direction débattent de la déontologie financière et des arbitrages acceptables, pour que personne ne soit laissé seul face à un ordre illégitime. »",
            impactAlliance: 25,
            impactDeonto: 30,
            feedbackClinique:
              "PARFAIT ! La santé mentale au travail se construit par la coopération et la délibération collective sur les critères du travail juste et du travail bien fait.",
            isOptimal: true,
          },
        ],
      },
    ],
    debriefingFinal:
      "La psychodynamique du travail (Christophe Dejours) refuse la psychologisation du mal-être : la souffrance éthique découle d'injonctions organisationnelles aliénantes qui brisent la sublimation et le jugement de beauté des pairs.",
  },

  // --- PST106 : CLINIQUE DE L'ACTIVITÉ & YVES CLOT ---
  {
    id: "sc-clot-106",
    moduleKey: "pst106",
    titre:
      "Conflit d'équipe : Problème d'humeur ou Travail Empêché ? (Yves Clot)",
    roleUtilisateur: "Praticien en Clinique de l'Activité (Cnam)",
    interlocuteur: "Mme Danvers, Cadre supérieure de santé",
    contexteInitial:
      "Aux urgences, deux infirmières d'accueil se disputent violemment devant les patients. La cadre vous appelle : « Elles sont toxiques, elles ne savent pas communiquer. Faites-leur un atelier de communication non-violente et de gestion des émotions pour qu'elles arrêtent leurs enfantillages ! »",
    etapes: [
      {
        interlocuteurReplique:
          "« Vous allez bien leur faire cet atelier de gestion des émotions pour régler leurs querelles d'ego ? »",
        choix: [
          {
            id: "opt-clot-1a",
            texte:
              "Proposer du relationnel : « Oui, nous allons faire un cercle de parole pour qu'elles expriment leurs ressentis et s'excusent. »",
            impactAlliance: 10,
            impactDeonto: -35,
            feedbackClinique:
              "PIÈGE PSYCHOLOGISANT CLASSIQUE ! Yves Clot (Le travail à cœur, 2010) met en garde : réduire un conflit de travail à des problèmes de communication ou d'ego aggrave la situation en culpabilisant les professionnels.",
            isOptimal: false,
          },
          {
            id: "opt-clot-1b",
            texte:
              "Recentrer sur l'activité empêchée : « Mme Danvers, derrière ce conflit interpersonnel se cache un désaccord sur la manière de soigner. L'une refuse de laisser attendre les personnes âgées, l'autre applique strictement l'ordre d'arrivée du logiciel. C'est le travail empêché qui crée la dispute. Proposons-leur d'analyser ensemble les compromis opératoires pour retravailler les règles de métier. »",
            impactAlliance: 25,
            impactDeonto: 35,
            feedbackClinique:
              "COEUR DE LA CLINIQUE DE L'ACTIVITÉ ! Vous transformez un conflit interpersonnel stérile en controverse professionnelle féconde sur le travail bien fait (le genre professionnel).",
            isOptimal: true,
          },
        ],
      },
    ],
    debriefingFinal:
      "En clinique de l'activité (Yves Clot), le conflit n'est pas une anomalie relationnelle : c'est le signe d'un métier étouffé. Restaurer le pouvoir d'agir consiste à réinvestir le travail bien fait comme moteur de la santé.",
  },

  // --- PST124 : CLINIQUE DES USAGES NUMÉRIQUES (BOBILLIER-CHAUMON & RABARDEL) ---
  {
    id: "sc-digital-124",
    moduleKey: "pst124",
    titre: "Déploiement d'IA Médicale : Résistance ou Acceptation Située ? (Bobillier-Chaumon)",
    roleUtilisateur: "Psychologue du Travail / Ergonome des Usages (PST124)",
    interlocuteur: "M. Garnier, Directeur des Systèmes d'Information (DSI) Hospitalier",
    contexteInitial:
      "Le DSI a déployé une IA de scoring diagnostique pour analyser les scanners pulmonaires. Les radiologues refusent unanimement d'ouvrir l'outil et le boycottent. Le DSI s'impatiente : « Les médecins font de la résistance au changement archaïque ! Le logiciel a coûté 400 000 euros. Je veux que vous animiez un séminaire de coaching managérial pour leur faire accepter l'outil et vaincre leurs blocages psychologiques. »",
    etapes: [
      {
        interlocuteurReplique:
          "« Vous êtes d'accord avec moi : ils refusent l'IA par peur d'être dépassés par la technologie. Comment allez-vous les convaincre de changer d'attitude ? »",
        choix: [
          {
            id: "opt-dig-1a",
            texte:
              "Requalifier le diagnostic : « M. Garnier, en clinique des usages (Bobillier-Chaumon), le concept de 'résistance au changement' est un contresens. Si des praticiens experts rejettent un outil, ce n'est pas par archaïsme, mais parce que l'artefact technique entre en contradiction avec leur travail réel. Je propose d'analyser l'activité située de diagnostic pour comprendre ce qui bloque. »",
            impactAlliance: 20,
            impactDeonto: 40,
            feedbackClinique:
              "EXCELLENCE CLINIQUE 18/20 ! Vous refusez la psychologisation managériale et mobilisez l'acceptation située : le refus d'un outil est une information vitale sur l'inadéquation avec l'activité.",
            isOptimal: true,
          },
          {
            id: "opt-dig-1b",
            texte:
              "« Très bien, nous allons concevoir une campagne de communication interne mettant en avant les gains de temps et la modernité de l'IA. »",
            impactAlliance: 10,
            impactDeonto: -40,
            feedbackClinique:
              "FAUTE ERGONOMIQUE GRAVE ! La communication persuasive ne résout jamais un problème d'incompatibilité entre un artefact et l'activité réelle.",
            isOptimal: false,
          },
        ],
      },
      {
        interlocuteurReplique:
          "« Soit, mais l'éditeur américain refuse de modifier l'algorithme. Les radiologues disent que l'IA est une 'boîte noire' qui les ralentit en signalant de fausses alertes. Comment sortir de l'impasse ? »",
        choix: [
          {
            id: "opt-dig-2a",
            texte:
              "Mettre en place la genèse instrumentale et un comité d'usage (Rabardel, Bobillier-Chaumon) : « Nous devons permettre aux radiologues de s'approprier l'outil en concevant des schèmes d'utilisation adaptés et en autorisant les catachrèses. Installons un espace de controverse clinique continué dans l'usage où les médecins décident quand l'IA doit être consultée pour rester capacitante. »",
            impactAlliance: 25,
            impactDeonto: 35,
            feedbackClinique:
              "PARFAIT ! L'outil n'est qu'un artefact : il ne devient instrument que par la genèse instrumentale et la conception continuée dans l'usage.",
            isOptimal: true,
          },
          {
            id: "opt-dig-2b",
            texte:
              "« Obligeons-les à valider chaque alerte de l'IA pour garantir la traçabilité juridique de l'hôpital en cas d'erreur. »",
            impactAlliance: -15,
            impactDeonto: -35,
            feedbackClinique:
              "PIÈGE DE LA TECHNOLOGIE INCAPACITANTE ! Transformer le médecin en simple vérificateur algorithmique détruit son pouvoir d'agir et son identité professionnelle.",
            isOptimal: false,
          },
        ],
      },
    ],
    debriefingFinal:
      "En PST124 (Pr. Marc-Éric Bobillier-Chaumon), une technologie ne s'évalue jamais en elle-même mais par ses effets sur l'activité réelle. L'acceptation située (utilité, utilisabilité, collectif, identité) et la genèse instrumentale (Rabardel) sont les seuls remparts contre le taylorisme digital incapacitant.",
  },
];

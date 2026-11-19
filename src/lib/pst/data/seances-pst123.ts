import type { SeanceCoursItem } from "./seances-types";

export const SEANCES_PST123: SeanceCoursItem[] = [
  {
    id: "pst123-s1",
    moduleKey: "pst123",
    moduleLabel: "PST123",
    numeroSeance: 1,
    titre: "Séance 1 (Cadrage Pédagogique) — Les Notions d'Identité en Sciences de l'Homme",
    sousTitre: "Du paradoxe d'Enthoven aux matrices de Dubar, Bourdieu et Sainsaulieu",
    enseignant: "M. Éric LUCY (Cnam)",
    dateSeance: "Semestre 1 (Cadrage & Préparation)",
    format: "webconference",
    dureeEnregistrement: "Dossier pédagogique complet & Support officiel E. Lucy",
    resumeExecutif: [
      "Le paradoxe de l'identité personnelle (Raphaël Enthoven) : 'C'est moi, mais je fais comme tout le monde'. L'identité n'est ni une essence biologique préexistante, ni une pure illusion imposée par la société : elle est une dialectique continue.",
      "Le plan officiel de M. Lucy s'articule autour de 12 auteurs majeurs : Piaget, Durkheim, Parsons, Kardiner, Weber, Becker, Merton, Rosenthal, Jakobson, Goffman, Bourdieu, Dubar.",
      "Trois grandes problématiques transversales : incorporation des normes, négociation du pouvoir/domination, et tension permanente entre identité pour soi et identité pour autrui.",
      "La grille d'analyse officielle de Claude Dubar : décomposition stricte entre Processus Relationnels (Axe social / Pour autrui / Actes d'attribution / 'Quel type d'homme dit-on que vous êtes ?') et Processus Biographiques (Axe temporel / Pour soi / Actes d'appartenance / 'Quel type d'homme dites-vous que vous êtes ?').",
      "La sociologie critique de Pierre Bourdieu : la formule canonique (dispositions + capital) × champ = habitus. La double vérité du travail (le travail comme exploitation objective et réalisation subjective enchantée).",
      "Modalités d'évaluation de PST123 : Épreuve finale de 2h sur table sans documents, choix entre Option A : Dissertation théorique ou Option B : Analyse de situation de travail.",
    ],
    modalitesExamen: {
      session1Date: "Février 2027 (Session 1 Cnam)",
      session2Date: "Avril 2027 (Rattrapage)",
      duree: "2 heures",
      format: "Épreuve sur table sans documents — Choix entre 2 options",
      optionsAuChoix: [
        "Option A : Dissertation théorique académique (ex: « En quoi l'identité professionnelle est-elle le résultat d'une double transaction selon Claude Dubar ? » ou « Discutez la double vérité du travail selon Pierre Bourdieu »).",
        "Option B : Analyse clinique d'une situation professionnelle (décortiquer un cas réel à partir des 4 modèles relationnels de Renaud Sainsaulieu ou de la grille des transactions de Dubar).",
      ],
      recommandationsNotation:
        "M. Lucy pénalise lourdement le bavardage psychologique ou journalistique. Pour avoir plus de 16/20, il faut impérativement utiliser le vocabulaire sociologique exact : « transaction biographique », « actes d'attribution », « violence symbolique », « habitus », « modèle affinitaire ».",
    },
    consignesOralesProf: [
      {
        titre: "Lecture obligatoire : Claude Dubar — La Socialisation (Chapitres 1 à 5)",
        typeTravail: "lecture",
        consigneExacte:
          "Lire attentivement les chapitres introductifs de l'ouvrage de Claude Dubar ('La socialisation : construction des identités sociales et professionnelles') mis à disposition sur l'espace Moodle. Repérer comment Dubar dépasse l'opposition entre sociologie fonctionnaliste et psychologie individuelle.",
        echeance: "Avant la séance 2",
        modaliteRendu: "Fiche de lecture personnelle en vue de l'AD 1.",
        recommandationsProf: "Être capable de schématiser les deux axes (temporel et relationnel).",
        lienAdId: "pst123-ad1-dubar",
      },
      {
        titre: "Visionnage vidéo : Raphaël Enthoven ('La philosophie de l'identité')",
        typeTravail: "recherche",
        consigneExacte:
          "Visionner les deux capsules vidéo de Raphaël Enthoven sur le paradoxe identitaire. Noter comment la quête de singularité personnelle s'appuie paradoxalement sur des codes culturels universels.",
        echeance: "Séance 1",
        modaliteRendu: "Notes de réflexion pour l'introduction de vos dissertations.",
        recommandationsProf: "Excellent levier d'accroche pour l'Option A d'examen.",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "Introduction Épistémologique : Qu'est-ce que l'Identité au Travail ?",
        points: [
          {
            titre: "Le paradoxe d'Enthoven : Singularité subjective vs Conformisme social",
            contenu:
              "Dans sa leçon sur la philosophie de l'identité, Raphaël Enthoven résume le paradoxe constitutif du sujet moderne : « L'identité personnelle est ce sentiment intime que 'c'est moi', tout en faisant exactement comme tout le monde ». Pour affirmer qui je suis, je suis obligé d'emprunter le vocabulaire, les vêtements, les titres et les rôles préexistants de ma société. En psychologie du travail, ce paradoxe s'exprime dans le choix du métier : nous cherchons à nous accomplir individuellement à travers des statuts sociaux préétablis.",
            auteurs: ["Raphaël Enthoven"],
          },
          {
            titre: "Dépasser la vision essentialiste de l'identité",
            contenu:
              "Pour M. Lucy et les sociologues du travail, l'identité n'est pas une 'substance psychologique' figée à la naissance ni un ADN moral. C'est un processus dynamique d'identification et de différenciation qui se construit et se déconstruit tout au long de la vie professionnelle lors des épreuves de travail.",
          },
        ],
      },
      {
        numero: "2",
        titre: "Les 4 Grands Paradigmes Sociologiques de l'Identité",
        points: [
          {
            titre: "1. Le paradigme fonctionnaliste et culturaliste (Durkheim, Parsons, Kardiner)",
            contenu:
              "L'identité est conçue comme l'intériorisation réussie des valeurs, des normes et des rôles prescrits par la société. L'institution façonne une 'personnalité de base'. Le travail assure l'intégration sociale et conjure l'anomie.",
            auteurs: ["Émile Durkheim", "Talcott Parsons", "Abram Kardiner"],
          },
          {
            titre: "2. Le paradigme de l'interactionnisme symbolique (Goffman, Becker)",
            contenu:
              "Erving Goffman (1963, Stigmate) distingue l'identité sociale réelle (les attributs effectifs que l'on possède) et l'identité sociale virtuelle (ce que le public projette sur nous lors de la mise en scène). Howard Becker (1963, Outsiders) démontre la puissance de l'étiquetage (labeling theory) : la déviance ou l'incompétence n'est pas une propriété intrinsèque de l'individu, mais un jugement d'attribution posé par ceux qui ont le pouvoir d'imposer leurs normes.",
            auteurs: ["Erving Goffman (1963)", "Howard S. Becker (1963)"],
          },
          {
            titre: "3. Le paradigme critique de la reproduction (Pierre Bourdieu)",
            contenu:
              "Pour Bourdieu, l'identité s'articule autour de la formule canonique : (Habitus + Capital) × Champ = Pratique. L'habitus est un système de dispositions durables et transposables, incorporé dès l'enfance. Le travail repose sur la 'double vérité' : c'est objectivement un lieu d'exploitation et d'asymétrie de capital, mais subjectivement vécu comme un engagement passionné et gratifiant.",
            auteurs: ["Pierre Bourdieu (1980, 1996)"],
          },
          {
            titre: "4. Le paradigme socioconstructiviste de la socialisation (Claude Dubar)",
            contenu:
              "Dubar réconcilie psychologie et sociologie en démontrant que l'identité est le produit indissociable d'une double transaction : entre l'axe temporel biographique (pour soi) et l'axe spatial relationnel (pour autrui).",
            auteurs: ["Claude Dubar (1991, 2000)"],
          },
        ],
      },
      {
        numero: "3",
        titre: "La Grille d'Analyse Officielle de Claude Dubar (Document E. Lucy)",
        points: [
          {
            titre: "Axe des Processus Relationnels (Identité pour autrui)",
            contenu:
              "Question centrale : « Quel type d'homme ou de femme dit-on que vous êtes ? ». Repose sur les actes d'attribution émis par les managers, les pairs et les institutions. C'est l'identité sociale virtuelle attribuée de l'extérieur. L'alternative vécue oscille entre coopération-reconnaissance (quand l'attribution valorise le sujet) et conflit-non reconnaissance (quand l'institution enferme le sujet dans un étiquetage réducteur ou déqualifié).",
          },
          {
            titre: "Axe des Processus Biographiques (Identité pour soi)",
            contenu:
              "Question centrale : « Quel type d'homme ou de femme dites-vous que vous êtes ? ». Repose sur les actes d'appartenance revendiqués subjectivement par le professionnel. C'est l'identité réflexive et intime. L'alternative vécue oscille entre continuité-reproduction (je poursuis l'héritage de mon métier d'origine) et rupture-production (je me convertis, je crée une nouvelle identité visée en faisant le deuil de mon statut antérieur).",
          },
          {
            titre: "Les 4 Formes Identitaires fondamentales de Dubar",
            contenu:
              "1. Identité de retrait / exclusion : attribution dévalorisée + refus d'adhérer à l'entreprise (exécutant précaire menacé) ; 2. Identité bloquée : ouvrier qualifié de métier dont le savoir est exproprié par les nouvelles technologies ; 3. Identité carriériste / mobilisation : promotion interne, conformité totale aux exigences managériales ; 4. Identité de réseau / affinitaire : mobilité externe, quête d'autonomie et individualisme stratégique.",
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Matrice Officielle d'Analyse des Stratégies Identitaires (Document E. Lucy / Cnam)",
        description: "Tableau de référence issu du document de cadrage de M. Lucy sur la double transaction de Claude Dubar",
        colonnes: ["Critères d'analyse", "Processus Relationnels (Pour autrui)", "Processus Biographiques (Pour soi)"],
        lignes: [
          {
            axe: "Question fondamentale posée",
            valeurs: [
              "« Quel type d'homme ou de femme dit-on que vous êtes ? »",
              "« Quel type d'homme ou de femme dites-vous que vous êtes ? »",
            ],
          },
          {
            axe: "Nature des actes",
            valeurs: [
              "Actes d'attribution (catégorisation externe, étiquetage managérial)",
              "Actes d'appartenance (affiliations revendiquées, récits de soi)",
            ],
          },
          {
            axe: "Identité selon Goffman",
            valeurs: [
              "Identité sociale 'virtuelle' (assignée par le public / l'organisation)",
              "Identité sociale 'réelle' (éprouvée intimement par l'acteur)",
            ],
          },
          {
            axe: "Tension transactionnelle",
            valeurs: [
              "Entre identités attribuées/proposées et identités assumées/incorporées",
              "Entre identités héritées du passé et identités visées vers l'avenir",
            ],
          },
          {
            axe: "Alternative de régulation",
            valeurs: [
              "Coopération & Reconnaissance ↔ Conflits & Non-reconnaissance",
              "Continuité & Reproduction ↔ Rupture & Nouvelle production de soi",
            ],
          },
          {
            axe: "Expérience vécue",
            valeurs: [
              "Expériences relationnelles du pouvoir, de l'autorité et des hiérarchies",
              "Expériences des stratifications, des inégalités et des bifurcations de carrière",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Ne pas confondre 'Acte d'attribution' et 'Acte d'appartenance'",
        erreurCourante: "Intervertir l'attribution (externe) et l'appartenance (interne).",
        rectificationAttendue:
          "L'attribution vient toujours d'autrui (l'institution, le chef, le regard des pairs). L'appartenance est toujours une proclamation du sujet ('je suis psychologue', 'je fais partie des soignants'). L'identité réussie est l'ajustement harmonieux entre les deux.",
        contexte: "Section 3 — Claude Dubar",
      },
      {
        titre: "Formule de Bourdieu et habitus",
        erreurCourante: "Présenter l'habitus comme un destin figé ou purement déterministe.",
        rectificationAttendue:
          "L'habitus est un système de dispositions durables mais génératrices. Il s'actualise dans la relation avec un 'champ' spécifique. Si le champ change, l'habitus peut entrer en crise (l'effet Don Quichotte ou l'hystérésis de l'habitus).",
        contexte: "Section 2 — Pierre Bourdieu",
      },
      {
        titre: "Sainsaulieu : les 4 modèles ne sont pas des personnalités psychologiques",
        erreurCourante: "Dire qu'un salarié est 'de nature fusionnelle' ou 'a un caractère de retrait'.",
        rectificationAttendue:
          "Pour Renaud Sainsaulieu (1977, L'Identité au travail), les 4 modèles (Fusionnel, Négociateur, Affinitaire, Retrait) sont le résultat objectif de l'organisation du travail et de la marge de pouvoir accordée à l'opérateur.",
        contexte: "Séance 3 & Option B d'examen",
      },
    ],
    transcriptionIntegraleVerbatim: `[1. Le paradoxe de l'identité personnelle (Raphaël Enthoven) : Singularité vs Appartenance]
[00:06:30] M. ÉRIC LUCY : « Toute la psychosociologie de l'identité repose sur une tension fondatrice : comment concilier le désir d'être unique (singularité, authenticité du sujet) et le besoin vital d'être reconnu par un collectif (appartenance, conformité sociale) ? Comme le souligne Raphaël Enthoven, dès que je réponds à la question "Qui suis-je ?", je mobilise des catégories forgées par autrui : mon prénom, ma nationalité, mon métier. »

[2. Les fondements sociologiques : Durkheim, Goffman, Becker, Weber & Bourdieu]
[00:35:15] M. ÉRIC LUCY : « Chez Émile Durkheim, l'intégration par la solidarité organique et la socialisation méthodique protègent l'individu contre l'anomie (l'effondrement des repères normatifs). Avec Erving Goffman et Howard Becker, l'identité devient une dramaturgie interactionnelle : le sujet gère sa "façade personnelle" sur la scène sociale et tente de négocier l'écart entre l'identité sociale virtuelle (le stigmate ou l'étiquette collée par autrui) et son identité réelle. »
[01:08:40] M. ÉRIC LUCY : « Là où Max Weber distingue les 3 formes de domination légitime (traditionnelle, charismatique et rationnelle-légale bureaucratique), Pierre Bourdieu démontre que la socialisation opère par incorporation silencieuse d'un Habitus — un système de dispositions durables qui fonctionne comme une boussole sociale dans un champ structuré par la distribution inégale des capitaux (économique, culturel, social et symbolique). »

[3. Le modèle canonique de Claude Dubar (1991) : La Double Transaction Identitaire]
[01:42:20] M. ÉRIC LUCY : « Pour votre examen de PST123, le cœur théorique absolu est le modèle de Claude Dubar (La socialisation, 1991). L'identité professionnelle n'est jamais donnée une fois pour toutes à la sortie de l'école : elle est le produit instable d'une DOUBLE TRANSACTION permanente ! »
[01:56:10] M. ÉRIC LUCY : « Premièrement, la TRANSACTION BIOGRAPHIQUE (identité pour soi, axe temporel interne) : le sujet négocie avec lui-même entre ses identités héritées du passé et ses identités visées vers l'avenir, entre continuité et rupture biographique (comme votre propre reconversion vers le titre de psychologue du travail au Cnam !). »
[02:12:45] M. ÉRIC LUCY : « Deuxièmement, la TRANSACTION RELATIONNELLE (identité pour autrui, axe social externe) : confrontation entre les actes d'attribution émis par l'institution ("vous n'êtes qu'un exécutant") et les actes d'appartenance revendiqués par le sujet ("je suis un professionnel qualifié"). Lorsque l'institution refuse de reconnaître l'identité visée, la transaction se bloque et déclenche une crise identitaire majeure. »

[4. Les 4 identités au travail de Renaud Sainsaulieu & Méthodologie d'examen (Options A et B)]
[02:34:00] M. ÉRIC LUCY : « Renaud Sainsaulieu (L'identité au travail, 1977) montre que l'entreprise est un lieu d'apprentissage culturel du pouvoir et dégage 4 modèles identitaires : Fusionnel (solidarité défensive de masse), Négociateur (élite ouvrière de métier et encadrement qui débat des règles), Affinitaire (réseaux sélectifs de mobilité individuelle) et Retrait (investissement minimaliste hors-travail). À l'examen final, que vous choisissiez l'Option A (dissertation théorique) ou l'Option B (étude de cas clinique), croisez systématiquement la double transaction de Dubar avec la grille de pouvoir de Sainsaulieu ! »`,
    bibliographieCitee: [
      {
        titre: "La socialisation : construction des identités sociales et professionnelles",
        auteur: "Claude Dubar",
        annee: "1991 (5e éd. 2015)",
        remarque: "L'ouvrage socle incontournable de tout le cours de PST123 chez Armand Colin.",
      },
      {
        titre: "L'identité au travail : les effets culturels de l'organisation",
        auteur: "Renaud Sainsaulieu",
        annee: "1977 (Presses de Sciences Po)",
        remarque: "Étude empirique magistrale fondant les 4 modèles d'accès au pouvoir d'atelier.",
      },
      {
        titre: "La double vérité du travail",
        auteur: "Pierre Bourdieu",
        annee: "1996 (Actes de la recherche en sciences sociales)",
        remarque: "Article clé sur l'illusion biographique et l'enchantement du travail exploité.",
      },
      {
        titre: "La lutte pour la reconnaissance",
        auteur: "Axel Honneth",
        annee: "1992 (Éditions du Cerf)",
        remarque: "Les 3 sphères de reconnaissance et la sociologie du mépris social.",
      },
      {
        titre: "Une profession balkanisée : les psychologues du travail en France",
        auteur: "Thomas Le Bianic",
        annee: "2004",
        remarque: "Histoire sociologique de la conquête du titre de 1985 et de la chaire du Cnam.",
      },
      {
        titre: "Synthèse Académique Bento — Cours 1 Cadrage PST123 (M. Éric Lucy)",
        auteur: "M. Éric Lucy (Plateforme PST)",
        annee: "Octobre 2026",
        remarque: "Fiche PDF synthétique (1 page) : Enthoven, 12 auteurs, Bourdieu, Sainsaulieu & matrice de la double transaction de Dubar.",
        url: "/docs/PST123_Cours_1_Synthese_Cadrage_Lucy.pdf",
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PST123 — SÉANCE 2 : CADRAGE INITIAL, PRÉSENTATIONS & POSITIONNEMENT
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst123-s2",
    moduleKey: "pst123",
    moduleLabel: "PST123",
    numeroSeance: 2,
    titre: "Séance 2 — Tour de Table, Présentation de l'UE & Posture (« D'où l'on parle »)",
    sousTitre: "Séance de rentrée et de prise de contact : représentations des auditeurs et émergence de la posture — Aucun contenu théorique nouveau d'examen",
    enseignant: "Dr. Prisca LUTUMBA (Psychologue clinicienne du travail, Cnam Nouvelle-Aquitaine / Dax & Bordeaux)",
    dateSeance: "27 octobre 2026",
    format: "webconference",
    dureeEnregistrement: "1 h 30 min (Webconférence BigBlueButton)",
    resumeExecutif: [
      "Prise de contact et tour de table : Présentation réciproque de l'enseignante et des auditeurs du centre de formation. Recueil des parcours professionnels antérieurs et des motivations pour le Titre de Psychologue du Travail.",
      "Le principe d'énonciation située : Dr. Lutumba insiste sur l'importance de clarifier 'd'où l'on parle' pour identifier ses préjugés, ses attentes et son cadre de référence avant d'aborder les situations réelles de travail.",
      "Cadrage organisationnel : Présentation générale des objectifs de l'UE PST123 et articulation avec les regroupements en présentiel de Dax et Bordeaux.",
      "Note pédagogique officielle : Cette séance informelle ne comporte pas de nouveau modèle conceptuel à mémoriser pour l'épreuve écrite. La matière théorique fondamentale débute à la Séance 3 (cours du 3 novembre 2026).",
    ],
    consignesOralesProf: [
      {
        titre: "Prise en main de l'espace Moodle et lectures introductives",
        typeTravail: "lecture",
        consigneExacte:
          "Prendre connaissance des documents de cadrage déposés sur l'espace Moodle de l'UE et préparer vos questionnements en vue de la séance d'histoire et d'épistémologie.",
        echeance: "Avant la séance 3",
        modaliteRendu: "Consultation personnelle.",
        recommandationsProf: "Se familiariser avec l'environnement numérique de travail du Cnam.",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "Prise de Contact & Tour de Table Pédagogique",
        points: [
          {
            titre: "Présentation des auditeurs et posture d'écoute",
            contenu:
              "Séance relationnelle consacrée à la découverte de la promotion, à la diversité des trajectoires de reconversion et à la formulation des attentes vis-à-vis du titre RNCP.",
          },
          {
            titre: "Clarifier « d'où l'on parle »",
            contenu:
              "Sensibilisation à l'implication subjective du praticien : savoir expliciter son propre cadre pour ne pas plaquer de jugements hâtifs sur les futurs salariés accompagnés.",
          },
        ],
      },
    ],
    transcriptionIntegraleVerbatim: `[1. Présentation de l'UE et Tour de Table]
[00:05:00] DR. PRISCA LUTUMBA : « Bienvenue à tous dans cette UE PST123. Cette première rencontre ensemble est dédiée à faire connaissance, à écouter vos parcours et à voir d'où chacun parle avant de plonger dans la matière théorique. »`,
    bibliographieCitee: [
      {
        titre: "Guide pédagogique national de l'UE PST123",
        auteur: "Équipe pédagogique Cnam",
        annee: "2026",
        remarque: "Document cadre d'organisation du cursus.",
      },
      {
        titre: "Synthèse Académique Bento — Cours 2 PST123 (Dr. Prisca Lutumba)",
        auteur: "Dr. Prisca Lutumba (Plateforme PST)",
        annee: "Octobre 2026",
        remarque: "Fiche PDF dédiée au Cours 2 du 27/10/2026 : prise de contact, énonciation située (« d'où l'on parle ») et renvoi vers C3.",
        url: "/docs/PST123_Cours_2_Synthese_Lutumba.pdf",
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PST123 — SÉANCE 3 : GENÈSE HISTORIQUE, ÉPISTÉMOLOGIE & PROFESSIONNALISATION
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst123-s3",
    moduleKey: "pst123",
    moduleLabel: "PST123",
    numeroSeance: 3,
    titre: "Séance 3 — Genèse Historique, Épistémologie & Professionnalisation du Psychologue",
    sousTitre: "Des origines psychotechniques et de la mesure (1879-1939) aux cliniques du travail, à la santé psychique et au statut légal au Cnam",
    enseignant: "Dr. Prisca LUTUMBA (Psychologue clinicienne du travail, Cnam Nouvelle-Aquitaine / Dax & Bordeaux)",
    dateSeance: "3 novembre 2026",
    format: "webconference",
    dureeEnregistrement: "1 h 31 min 17 s (Webconférence BigBlueButton — 169 séquences SRT)",
    resumeExecutif: [
      "Généalogie épistémologique et identité professionnelle : Se référant à Auguste Comte (« on connaît bien une science quand on connaît son histoire ») et aux travaux de Thomas Le Bianic (2004), Dr. Lutumba rappelle qu'être psychologue du travail clinicien au Cnam impose de savoir d'où l'on vient pour comprendre d'où l'on parle face aux institutions.",
      "Origines (1879-1914) : La psychologie du travail naît au croisement d'une psychologie qui cherche sa légitimité académique par la méthode expérimentale et la métrologie (Wundt 1879 à Leipzig, Binet 1889 à la Sorbonne, psychologie différentielle de Galton et Cattell) et d'une industrie en pleine seconde révolution qui rationalise ses cadences (Taylor, OST, « The right man in the right place », Münsterberg 1913, sélection des traminots par Lahy en 1908).",
      "L'Âge d'or de la psychotechnique (1914-1939) : Accéléré par la Première Guerre mondiale (tests Yerkes Army Alpha/Beta en 1917 aux USA), la discipline se focalise sur les aptitudes stables et prédictives. En France, l'INOP est fondé en 1928 par Henri Piéron au 41 rue Gay-Lussac (futur INETOP / Cnam). Cette période suscite une triple critique : scientifique (validité écologique faible), syndicale (sélection = élimination) et humaine (homme-machine décontextualisé).",
      "Les Trente Glorieuses (1945-1970) : Déplacement du focus vers les collectifs et l'organisation du travail comme variable à transformer (École des Relations Humaines de Mayo à Hawthorne, sociotechnique du Tavistock Institute). Émancipation universitaire avec la création de la Licence de psychologie par Lagache en 1947, essor de l'orientation (modèle RIASEC de Holland, Huteau et Guichard au Cnam, création de l'ANPE en 1967) et naissance de l'Ergonomie de l'activité (Wisner au Cnam, Faverge et Ombredane, couple prescrit/réel).",
      "De 1970 à nos jours : Chômage de masse, santé au travail et cliniques du Cnam. L'étude de Marienthal (1933) et Marie Jahoda mettent en lumière les 5 fonctions latentes de l'emploi (temps, lien social, but collectif, statut, régularité). Modélisation des RPS avec Karasek (Demande-Contrôle-Support) et Siegrist (Déséquilibre Effort-Récompense). Émergence des Cliniques du travail au Cnam : Psychodynamique du travail (Dejours), Clinique de l'activité (Clot) et Clinique des usages (Bobillier-Chaumon).",
      "Professionnalisation et Déontologie : Titre unique de psychologue protégé par la Loi du 25 juillet 1985 (art. 44). Inscription obligatoire au RPPS en tant que professionnels de santé mentale autonomes et indépendants (exercice non soumis à prescription médicale). Code de déontologie (6 principes, 32 articles) et distinction absolue entre 4 démarches d'étayage : Supervision, Analyse des Pratiques (APP), Intervision et Régulation.",
    ],
    modalitesExamen: {
      session1Date: "Février 2027 (Session 1 Cnam)",
      session2Date: "Avril 2027 (Rattrapage)",
      duree: "2 heures",
      format: "Épreuve sur table sans documents — Choix entre Option A (Dissertation) et Option B (Étude de cas)",
      optionsAuChoix: [
        "Option A : Dissertation théorique (ex: « Discutez l'évolution historique de la psychologie du travail, du dogme de l'adaptation de l'homme au poste à l'impératif de transformation du travail réel » ou « En quoi les fonctions latentes de l'emploi selon Marie Jahoda éclairent-elles les souffrances liées au chômage et à la précarité ? »).",
        "Option B : Étude de cas clinique d'entreprise (décortiquer une situation de RPS, burn-out ou restructuration en mobilisant Karasek, Siegrist ou Dejours, tout en posant le cadre déontologique strict du mandat du psychologue).",
      ],
      recommandationsNotation:
        "L'équipe pédagogique (Dr. Lutumba, M. Lucy, Pr. Lagabrielle) sanctionne sévèrement la confusion entre les dispositifs cliniques (confondre supervision personnelle et APP collective) ainsi que l'illusion d'une subordination médicale (prétendre que le psychologue travaille sous prescription). Utiliser les concepts exacts : 'fonctions latentes de l'emploi', 'latitude décisionnelle', 'déséquilibre effort-récompense', 'activité empêchée', 'indépendance déontologique'.",
    },
    consignesOralesProf: [
      {
        titre: "Écrit personnel de projection professionnelle (Agrément)",
        typeTravail: "recherche",
        consigneExacte:
          "Rédiger une courte note explicitant votre projection en tant que futur psychologue du travail : clarifier votre conception du travail, votre posture et la manière dont vous envisagez votre mandat. Cet exercice personnel constitue un premier socle pour la préparation de l'agrément professionnel.",
        echeance: "Pour le 6 novembre 2026",
        modaliteRendu: "Exercice réflexif personnel déposé sur Moodle / conservé pour le dossier d'agrément.",
        recommandationsProf: "Prenez ce moment pour vous : clarifier ses motifs profonds permet de construire sa solidité clinique face aux situations de souffrance.",
      },
      {
        titre: "Lecture obligatoire : Thomas Le Bianic (Histoire de la psychologie du travail au Cnam)",
        typeTravail: "lecture",
        consigneExacte:
          "Lire le texte de Thomas Le Bianic mis à disposition sur l'espace documentaire Moodle, retraçant la trajectoire socio-historique des sciences du travail et de la profession de psychologue au Cnam.",
        echeance: "Avant la prochaine séance en présentiel",
        modaliteRendu: "Fiche de repères généalogiques personnels.",
        recommandationsProf: "Texte fondamental partagé également en PST106 et PST124 pour comprendre la spécificité clinique du Cnam.",
      },
      {
        titre: "Lecture recommandée : Christophe Dejours — 'Travail, usure mentale'",
        typeTravail: "lecture",
        consigneExacte:
          "Lire ou feuilleter l'ouvrage fondateur de Christophe Dejours ('Travail, usure mentale', 1980) pour approfondir la dialectique souffrance/plaisir, les idéologies défensives de métier et le principe de reconnaissance.",
        echeance: "Semestre 1",
        modaliteRendu: "Notes de révision pour l'examen final et l'UE PST120.",
        recommandationsProf: "L'ouvrage de référence absolue pour toute copie d'examen traitant de la santé mentale au travail.",
      },
      {
        titre: "Recommandation déontologique forte : Engagement dans une supervision clinique",
        typeTravail: "recherche",
        consigneExacte:
          "Prendre connaissance des exigences déontologiques de supervision. Bien que le code ne l'impose pas sous forme d'obligation pénale, la supervision personnelle avec un tiers expérimenté est le garant incontournable de la qualité d'exercice et de l'élaboration psychique du psychologue.",
        echeance: "Dès l'entrée en pratique professionnelle / stage",
        modaliteRendu: "Démarche déontologique continue.",
        recommandationsProf: "Ne confondez jamais votre travail personnel / supervision avec l'analyse des pratiques en équipe.",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "Cadrage Épistémologique & Expériences de Pensée (1908 vs 2025)",
        points: [
          {
            titre: "Auguste Comte et la filiation Cnam : Savoir d'où l'on vient pour savoir d'où l'on parle",
            contenu:
              "Comme le formule Auguste Comte, on ne comprend pleinement une science que si l'on maîtrise son histoire. Au Cnam, la psychologie du travail s'inscrit dans une tradition clinique spécifique qui refuse l'assimilation à une pure technologie de gestion ou à une 'science molle'. Face aux sciences dures, la complexité du psychisme et de l'activité humaine en situation de travail constitue une science rigoureuse, ancrée dans le réel.",
            auteurs: ["Auguste Comte", "Thomas Le Bianic", "Dr. Prisca Lutumba"],
          },
          {
            titre: "Deux époques, deux postures : Le traminot de 1908 vs Le burn-out de 2025",
            contenu:
              "En 1908, face au conducteur de tramway (technologie émergente), le psychologue se focalisait sur l'observation des gestes, la sélection sensorimotrice et le découpage de la tâche (psychotechnique de Lahy). En 2025, face à un salarié en burn-out, la clinique impose une posture radicalement différente : accueil bienveillant de la souffrance, écoute de la vérité du sujet, refus de poser un diagnostic médical hâtif, investigation du *comment* l'organisation du travail a produit cet effondrement, et vigilance sur le risque suicidaire (formation sentinelle ARS).",
          },
          {
            titre: "Les 4 branches complémentaires de la discipline",
            contenu:
              "1) Psychologie du travail : analyse des activités, charge mentale, collectifs et santé ; 2) Psychologie de l'emploi (orientation/insertion) : rapport à l'emploi, mobilités, chômage (qui est une activité à part entière de recherche) et reconversion ; 3) Psychologie des organisations (PTO) : dynamique des groupes, management, communication et accompagnement du changement ; 4) Clinique du travail : au chevet de l'activité réelle, régulations subjectives et défenses.",
          },
        ],
      },
      {
        numero: "2",
        titre: "Période 1 (1879–1914) : Naissance de la Psychologie Scientifique & Rencontre Industrielle",
        points: [
          {
            titre: "La quête de légitimité scientifique par la méthode expérimentale et la mesure",
            contenu:
              "En 1879, Wilhelm Wundt fonde à Leipzig le premier laboratoire de psychologie expérimentale, dotant la discipline d'un trépied : un objet (les processus psychiques), une méthode (expérimentation et mesure) et un lieu (le laboratoire). En 1889, Alfred Binet crée le laboratoire de psychologie physiologique à la Sorbonne (dirigé par Henri Piéron dès 1912). Parallèlement, la psychologie différentielle (Galton, Cattell, Binet & Simon) rend l'individu mesurable dans ses facultés physiques et intellectuelles.",
            auteurs: ["Wilhelm Wundt", "Alfred Binet", "Henri Piéron", "Francis Galton", "James McKeen Cattell"],
          },
          {
            titre: "La seconde révolution industrielle et l'impératif de rendement",
            contenu:
              "La mécanisation, la concentration des usines et la cadence entraînent fatigue et accidents ouvriers (univers dépeint dans Les Temps modernes de Chaplin). En physiologie du travail, Angelo Mosso (ergographe, années 1880) et Jules Amar (Le moteur humain) optimisent le travailleur-machine. Frederick Winslow Taylor formalise l'OST par le chronométrage et la parcellisation des tâches, dictant l'adage 'The right man in the right place'. Walter Dill Scott applique dès 1903 la psychologie à la publicité et Hugo Münsterberg publie en 1913 'Psychology and Industrial Efficiency', acte de naissance de la psychologie industrielle. En France, Jean-Maurice Lahy applique dès 1908 la sélection psychotechnique aux conducteurs de tramway.",
            auteurs: ["Angelo Mosso", "Jules Amar", "Frederick Winslow Taylor", "Hugo Münsterberg", "Jean-Maurice Lahy", "Walter Dill Scott"],
          },
          {
            titre: "Clivage méthodologique : Qualitatif Cnam vs Quantitatif du Nord / PTO",
            contenu:
              "Tandis que la psychologie des organisations d'inspiration anglo-saxonne ou scandinave privilégie les enquêtes quantitatives par questionnaires statistiques, la clinique du travail francophone du Cnam valorise les démarches qualitatives de terrain : ce que la métrologie ne peut quantifier, ce sont le rapport singulier au travail, les arbitrages de métier et la créativité du sujet face au réel.",
          },
        ],
      },
      {
        numero: "3",
        titre: "Période 2 (1914–1939) : L'Âge de la Psychotechnique et Débats Critiques",
        points: [
          {
            titre: "La Première Guerre mondiale : Accélérateur de la sélection de masse",
            contenu:
              "En 1917 aux États-Unis, Robert Yerkes supervise la passation des tests Army Alpha (lettrés) et Army Beta (illettrés) sur plus de 1,7 million de conscrits, démontrant l'utilité des tests d'aptitude pour affecter les hommes aux postes. En Europe, la psychométrie s'étend à la sélection des pilotes d'aviation, chauffeurs et téléphonistes.",
            auteurs: ["Robert Yerkes"],
          },
          {
            titre: "Définition, postulats et outillage de la Psychotechnique",
            contenu:
              "La psychotechnique applique les méthodes différentielles et expérimentales à la sélection et à l'orientation professionnelle. Elle repose sur le postulat que les aptitudes individuelles sont mesurables, stables dans le temps et prédictives de la performance future. Outils : tests sensorimoteurs, tests d'attention, chronométrages et profils de postes.",
          },
          {
            titre: "L'institutionnalisation en France : L'INOP au 41 rue Gay-Lussac et le rôle phare du Cnam",
            contenu:
              "Création en 1928 de l'Institut National d'Orientation Professionnelle (INOP) par Henri Piéron, qui deviendra l'INETOP rattaché au Cnam au 41 rue Gay-Lussac à Paris (siège actuel du laboratoire CRTD et de la chaire de psychologie du travail). Le Cnam s'affirme comme le haut-lieu national de formation des psychotechniciens et de recherche en physiologie du travail. Fondation de l'AIPTLF au Cnam par Pierre Goguelin.",
            auteurs: ["Henri Piéron", "Pierre Goguelin"],
          },
          {
            titre: "Les trois niveaux de critiques et de contestation de la psychotechnique",
            contenu:
              "1) Critique scientifique : validité prédictive fragile hors du laboratoire, incapacité à saisir l'intelligence rusée en situation ; 2) Critique syndicale : dénonciation d'un instrument de flicage patronal et de tri des ouvriers ('sélection = élimination') ; 3) Critique épistémologique : réductionnisme d'un individu isolé et passif, ignorance des dynamiques collectives et de l'organisation concrète.",
          },
        ],
      },
      {
        numero: "4",
        titre: "Période 3 (1945–1970) : Relations Humaines, Tavistock, Ergonomie & Institutionnalisation",
        points: [
          {
            titre: "L'École des Relations Humaines et l'approche socio-technique",
            contenu:
              "Elton Mayo (usines Western Electric de Hawthorne, 1927-1932) met au jour l'effet Hawthorne : la reconnaissance, l'attention managériale et le climat de groupe stimulent la productivité plus que l'éclairage physique. Kurt Lewin théorise la dynamique de groupe, les styles de leadership et la recherche-action. Au Royaume-Uni, l'Institut Tavistock (1950, Trist & Bamforth) forge le concept socio-technique : l'organisation du travail est l'articulation indissociable d'un système technique et d'un système social, devenant une variable à transformer.",
            auteurs: ["Elton Mayo", "Kurt Lewin", "Eric Trist", "Ken Bamforth"],
          },
          {
            titre: "Naissance de l'Ergonomie de l'activité au Cnam : Alain Wisner, Ombredane et Faverge",
            contenu:
              "Alain Wisner (chaire d'ergonomie du Cnam) opère une révolution copernicienne : l'analyse ergonomique met en évidence l'écart irréductible entre la tâche prescrite et l'activité réelle. André Ombredane et Jean-Marie Faverge publient en 1955 'L'analyse du travail', fondant la méthodologie d'observation clinique de terrain.",
            auteurs: ["Alain Wisner", "André Ombredane", "Jean-Marie Faverge"],
          },
          {
            titre: "Autonomie universitaire et essor de l'orientation",
            contenu:
              "1947 marque la création de la Licence de psychologie à l'université par Daniel Lagache, émancipant la psychologie de la tutelle de la philosophie et de la médecine. Dans l'orientation, John Holland développe le modèle RIASEC, tandis qu'au Cnam, Michel Huteau et Jean Guichard fondent l'accompagnement tout au long de la vie. En 1967, l'État crée l'ANPE.",
            auteurs: ["Daniel Lagache", "John Holland", "Michel Huteau", "Jean Guichard"],
          },
        ],
      },
      {
        numero: "5",
        titre: "Période 4 (1970–Aujourd'hui) : Chômage, RPS, Modèles du Stress & Cliniques du Cnam",
        points: [
          {
            titre: "Chômage de masse, identité et les 5 fonctions latentes de l'emploi (Jahoda, Marienthal 1933)",
            contenu:
              "Dès 1933, l'étude de Marienthal (Marie Jahoda, Paul Lazarsfeld, Hans Zeisel) démontre que la privation d'emploi entraîne apathie, déstructuration temporelle et déchéance identitaire. Jahoda théorise les 5 fonctions latentes structurantes du travail : cadre temporel, contacts sociaux élargis, buts collectifs, statut social et activité régulière. Éric Hamraoui rappelle que l'adulte continue de se forger par le travail (allégorie des 3 tailleurs de pierre : tailler un caillou, faire un porche, bâtir une cathédrale). En 1991, la loi consacre le Bilan de compétences.",
            auteurs: ["Marie Jahoda", "Paul Lazarsfeld", "Éric Hamraoui"],
          },
          {
            titre: "Modélisation du stress et des RPS : Karasek, Siegrist, Maslach et Hirigoyen",
            contenu:
              "Robert Karasek (1979) modélise le Job Strain par la tension entre demande psychologique et latitude décisionnelle (marge de manœuvre), complété par le soutien social (Isostrain). Johannes Siegrist (1996) développe le modèle DER (Déséquilibre Effort-Récompense) centré sur la reconnaissance, l'estime et les perspectives. Herbert Freudenberger (1974) et Christina Maslach (1981, test MBI) décrivent le burn-out en 3 dimensions (épuisement, cynisme, perte d'accomplissement). Marie-France Hirigoyen (1998) théorise le harcèlement moral, inscrit dans la loi de 2002. En 2011, le rapport Gollac cartographie 6 axes de RPS.",
            auteurs: ["Robert Karasek", "Johannes Siegrist", "Christina Maslach", "Marie-France Hirigoyen", "Michel Gollac"],
          },
          {
            titre: "Les Cliniques du travail au Cnam : Dejours, Clot et Bobillier-Chaumon",
            contenu:
              "Christophe Dejours fonde la Psychodynamique du travail (Travail, usure mentale 1980, Souffrance en France 1998) : dialectique souffrance/plaisir, défenses collectives de métier, résonance symbolique et jugements de reconnaissance (utilité par la hiérarchie, beauté par les pairs). Yves Clot développe la Clinique de l'activité (La fonction psychologique du travail 1999) : activité empêchée, travail bien fait, genre professionnel et style, développement du pouvoir d'agir par autoconfrontation. Marc-Éric Bobillier-Chaumon anime la Clinique des usages : acceptation située des technologies numériques contre le déterminisme technique.",
            auteurs: ["Christophe Dejours", "Yves Clot", "Marc-Éric Bobillier-Chaumon"],
          },
        ],
      },
      {
        numero: "6",
        titre: "Professionnalisation, Statut Légal (Loi 1985, RPPS), Déontologie & Étayage Clinique",
        points: [
          {
            titre: "Protection du titre (Loi du 25 juillet 1985) et inscription RPPS",
            contenu:
              "L'article 44 de la Loi du 25 juillet 1985 protège pénalement le titre de psychologue (Master 2 universitaire ou Titre RNCP niveau 7 du Cnam). Les psychologues disposent d'un numéro RPPS (Répertoire Partagé des Professionnels de Santé) : ils sont reconnus comme professionnels de santé mentale autonomes et indépendants issus des SHS, non assujettis à la prescription médicale d'intervention.",
          },
          {
            titre: "Code de déontologie des psychologues (1996, réactualisé 2012 / 2021)",
            contenu:
              "Articulé autour de 6 principes fondamentaux (Respect des droits de la personne et dignité, Compétence, Responsabilité et autonomie, Rigueur méthodologique, Intégrité et probité, Respect du but assigné) et 32 articles. Le respect de la dignité et le consentement éclairé constituent la boussole inaliénable du psychologue.",
          },
          {
            titre: "Les 4 démarches d'étayage clinique : Supervision vs APP vs Intervision vs Régulation",
            contenu:
              "1) Supervision : espace clinique personnel et régulier avec un tiers superviseur externe pour élaborer sur son rapport intime aux situations cliniques, ses doutes et ses résonances affectives (outil de travail fondamental) ; 2) Analyse des Pratiques Professionnelles (APP) : dispositif d'animation collective pour une équipe de praticiens de terrain ; 3) Intervision : partage collégial horizontal et autogéré entre pairs sans tiers ; 4) Régulation : traitement d'urgence des conflits interpersonnels et des blocages de coopération au sein d'une équipe.",
            auteurs: ["Dr. Prisca Lutumba"],
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Évolution Historique de la Psychologie du Travail en 4 Grandes Périodes",
        colonnes: ["Période", "Auteurs Phares", "Paradigme Dominant", "Finalité de l'Intervention"],
        lignes: [
          {
            axe: "1879–1914 : Origines",
            valeurs: [
              "Wundt, Binet, Piéron, Taylor, Münsterberg, Lahy",
              "Psychologie métrique, laboratoire expérimental & rationalisation industrielle",
              "Mesurer les aptitudes pour adapter l'homme au poste ('The right man in the right place')",
            ],
          },
          {
            axe: "1914–1939 : Psychotechnique",
            valeurs: [
              "Yerkes (Army Alpha/Beta), Piéron (INOP 1928), Lahy",
              "Psychotechnique des aptitudes stables et prédictives ; sélection militaire et civile",
              "Trier, orienter et affecter les travailleurs ; fortes critiques syndicales ('sélection = élimination')",
            ],
          },
          {
            axe: "1945–1970 : Trente Glorieuses",
            valeurs: [
              "Mayo (Hawthorne), Lewin, Tavistock, Wisner (Cnam), Lagache (Licence 1947)",
              "Relations humaines, dynamique de groupe, sociotechnique & Ergonomie de l'activité",
              "Interroger l'organisation comme variable à transformer ; distinguer tâche prescrite et activité réelle",
            ],
          },
          {
            axe: "1970–Aujourd'hui : Cliniques & Droit",
            valeurs: [
              "Jahoda, Karasek, Siegrist, Dejours, Clot, Bobillier-Chaumon, Loi 1985",
              "Cliniques du travail (Psychodynamique, Activité, Usages), santé psychique et déontologie",
              "Transformer le travail réel, soigner la souffrance, développer le pouvoir d'agir et protéger la personne",
            ],
          },
        ],
      },
      {
        titre: "Les 4 Dispositifs d'Étayage Clinique de la Pratique Professionnelle",
        colonnes: ["Dispositif", "Public & Cadre", "Finalité Clinique", "Rôle du Tiers / Animateur"],
        lignes: [
          {
            axe: "Supervision",
            valeurs: [
              "Individuel ou très petit groupe de psychologues",
              "Élaborer sur son rapport personnel au travail, analyser ses résonances affectives et transferts",
              "Superviseur expérimenté, extérieur et garant de l'élaboration psychique (outil de travail vital)",
            ],
          },
          {
            axe: "Analyse des Pratiques (APP)",
            valeurs: [
              "Équipe pluridisciplinaire (soignants, éducateurs, travailleurs sociaux, encadrement)",
              "Analyser collectivement des situations de terrain pour enrichir les compétences professionnelles",
              "Psychologue ou intervenant tiers, animateur méthodologique garant du cadre de bienveillance",
            ],
          },
          {
            axe: "Intervision",
            valeurs: [
              "Groupe de pairs praticiens de même niveau hiérarchique et statutaire",
              "Échanges d'expériences, soutien confraternel et mutualisation d'outils",
              "Aucun tiers : fonctionnement horizontal, collégial, paritaire et symétrique",
            ],
          },
          {
            axe: "Régulation",
            valeurs: [
              "Collectif de travail ou service en situation de crise organisationnelle",
              "Dénouer les conflits relationnels, clarifier les rôles et rétablir la coopération",
              "Régulateur / Médiateur externe intervenant ponctuellement sur la dynamique du groupe",
            ],
          },
        ],
      },
      {
        titre: "Confrontation Épistémologique : Clinique Cnam vs Approche Métrique PTO",
        colonnes: ["Dimension", "Clinique du Travail (Cnam)", "Psychologie des Organisations (Nord / PTO)"],
        lignes: [
          {
            axe: "Méthodologie privilégiée",
            valeurs: [
              "Méthodes qualitatives de terrain : entretiens cliniques, observations fines, autoconfrontations",
              "Méthodes quantitatives : questionnaires standardisés, modélisations statistiques, enquêtes de climat",
            ],
          },
          {
            axe: "Statut du sujet",
            valeurs: [
              "Sujet singulier, auteur de son activité, doté d'une parole propre et d'une histoire vécue",
              "Échantillon d'opérateurs regroupés par variables d'attitudes, scores psychométriques et traits",
            ],
          },
          {
            axe: "Conception du travail",
            valeurs: [
              "Épreuve du réel, espace de subjectivation, lieu de souffrance et de plaisir, opératrice de santé",
              "Ensemble de tâches définies, environnement d'objectifs, leviers de performance et d'engagement",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Ne jamais confondre 'Supervision' et 'Analyse des Pratiques Professionnelles (APP)'",
        erreurCourante: "Utiliser indifféremment les deux termes ou croire que l'APP remplace la supervision du psychologue.",
        rectificationAttendue:
          "La supervision est un espace d'élaboration intime sur son propre réel de praticien face à un superviseur expérimenté (outil individuel de santé et de déontologie). L'APP est un dispositif d'équipe pluridisciplinaire animé par le psychologue au bénéfice des professionnels d'une structure.",
        contexte: "Section 6 & Pratique déontologique",
      },
      {
        titre: "Le psychologue n'est pas un paramédical sous prescription médicale",
        erreurCourante: "Écrire qu'un médecin prescrit des séances de psychologie ou un protocole d'intervention en entreprise.",
        rectificationAttendue:
          "En vertu de la Loi du 25 juillet 1985 et de son enregistrement RPPS, le psychologue est un professionnel de santé mentale indépendant issu des sciences humaines et sociales. Il conserve la totale maîtrise de ses outils, du nombre de séances et de sa démarche diagnostique.",
        contexte: "Section 6 — Cadre légal et RPPS",
      },
      {
        titre: "Distinguer le modèle de Karasek (Job Strain) du modèle de Siegrist (DER / ERI)",
        erreurCourante: "Attribuer la notion de reconnaissance à Karasek ou réduire Siegrist à la charge de travail.",
        rectificationAttendue:
          "Karasek évalue la tension au travail par le croisement Demande psychologique / Latitude décisionnelle (contrôle) + Soutien social. Siegrist se focalise sur le déséquilibre entre l'Effort consenti (surinvestissement) et la Récompense symbolique/matérielle obtenue (estime, salaire, perspectives de carrière).",
        contexte: "Section 5 — Modèles du stress",
      },
      {
        titre: "Accueil clinique du burn-out : investigation de l'organisation vs diagnostic psychiatrique",
        erreurCourante: "Poser un diagnostic médical précipité ou réduire le burn-out à une fragilité individuelle du salarié.",
        rectificationAttendue:
          "Le psychologue clinicien du travail accueille la vérité de la souffrance sans jugement, explore le 'comment' l'organisation du travail et l'activité empêchée ont épuisé le sujet, et évalue méthodiquement le risque suicidaire (formation sentinelle ARS) sans psychologiser les dysfonctionnements managériaux.",
        contexte: "Section 1 — Expérience de pensée 2025",
      },
    ],
    transcriptionIntegraleVerbatim: `[1. Cadrage Épistémologique & Expériences de Pensée (1908 vs 2025)]
[00:01:05] DR. PRISCA LUTUMBA : « C'est Auguste Comte qui disait qu'on connaît bien une science quand on connaît son histoire. C'est important de savoir, quand vous allez mettre les deux pieds dans la psychologie du travail, d'où vous venez. En étant psychologue du travail issu du Cnam, donc psychologue clinicien du travail, connaître votre histoire généalogique permet de voir d'où l'on parle quand on prend la parole. »
[00:21:40] DR. PRISCA LUTUMBA : « La psychologie du travail est une science humaine et sociale. Comparativement à des physiciens, ils vont dire que nous avons une 'science molle'. Il faut m'expliquer en quoi la complexité de l'humain est une science molle ! Nous sommes dans le dur. Ne nous laissons pas minimiser, c'est une science rigoureuse. »
[00:19:15] DR. PRISCA LUTUMBA : « En 2025, quand vous recevez quelqu'un en burn-out, on ne pose pas de diagnostic hâtif. On accueille la souffrance, on écoute la vérité du sujet, et on cherche à comprendre le 'comment' on a pu en arriver là en interrogeant la manière dont le travail est organisé. Et on évalue le risque vital et suicidaire — je vous encourage d'ailleurs à suivre la formation sentinelle de l'ARS. »

[2. Origines (1879-1914) : Naissance de la Psychologie Industrielle & Méthodes Cnam]
[00:36:20] DR. PRISCA LUTUMBA : « S'il y a une phrase de conclusion à retenir sur les origines, c'est que la psychologie du travail naît d'une rencontre entre une psychologie qui cherche sa légitimité scientifique par la mesure et l'expérimentation, et une industrie qui cherche à augmenter son rendement. »
[00:40:15] DR. PRISCA LUTUMBA : « Dans la vision taylorienne, l'adage fondamental que vous allez souvent entendre est : 'The right man in the right place' — l'homme qu'il faut à la place qu'il faut, dans une logique d'ajustement mécanique au poste. »
[00:43:50] DR. PRISCA LUTUMBA : « Au Cnam, en psychologie clinique du travail en tout cas, nous sommes presque exclusivement sur des méthodes qualitatives. Certains de nos collègues en psychologie des organisations (PTO) ou nos confrères nordiques font beaucoup de quantitatif avec des stats et des questionnaires. Mais ce que la mesure quantitative ne mesure pas, ce sont les capacités d'adaptation et le rapport intime au travail de l'humain. »

[3. L'Âge Psychotechnique (1914-1939) & Débats Critiques au 41 rue Gay-Lussac]
[00:37:45] DR. PRISCA LUTUMBA : « En 1917, Robert Yerkes dirige la passation de tests collectifs pour l'armée américaine : c'est la première démonstration de masse de l'utilité des tests pour affecter des hommes aux postes selon leurs aptitudes. »
[00:41:20] DR. PRISCA LUTUMBA : « En 1928, c'est la création de l'INOP sous l'impulsion d'Henri Piéron. Cet institut va donner naissance à l'INETOP au 41 rue Gay-Lussac, là où se trouve le laboratoire CRTD et où siège notre titulaire de chaire de psychologie du travail au Cnam, Marc-Éric Bobillier-Chaumon. C'est une adresse à retenir comme un pèlerinage : 41 rue Gay-Lussac, 3e étage ! »
[00:46:10] DR. PRISCA LUTUMBA : « L'entre-deux-guerres est l'âge de la psychotechnique, mais cela déclenche trois niveaux de débats : scientifique sur la validité prédictive, syndical contre le tri patronal ('sélection = élimination'), et épistémologique car une psychologie centrée sur l'individu isolé peine à rendre compte de l'activité réelle et des collectifs. »

[4. Chômage, Fonctions Latentes de l'Emploi & Modèles du Stress (1970 à nos jours)]
[01:04:10] DR. PRISCA LUTUMBA : « Les antécédents fondateurs sur le chômage, c'est l'étude de Marienthal en 1933 dans un village autrichien par Marie Jahoda. Elle théorise sur les 5 fonctions latentes de l'emploi : structuration du temps, contacts sociaux hors famille, but collectif, statut social et activité régulière. Quand on perd son travail, on perd cette structure identitaire. »
[01:08:30] DR. PRISCA LUTUMBA : « Karasek évalue le stress par l'écart entre la demande psychologique et la latitude décisionnelle (marge de manœuvre). Johannes Siegrist le complète avec son modèle du déséquilibre entre effort consenti et récompense obtenue, car dans Karasek on ne voyait pas le levier de reconnaissance de l'individu. »
[01:11:50] DR. PRISCA LUTUMBA : « Pour la psychodynamique du travail, c'est Christophe Dejours avec son ouvrage principal : 'Travail, usure mentale' — c'est la référence du cours pour comprendre la souffrance, le plaisir au travail, les défenses collectives et la reconnaissance. Et pour la clinique de l'activité, c'est Yves Clot avec 'La fonction psychologique du travail' et le développement du pouvoir d'agir. »

[5. Professionnalisation, Statut Légal RPPS & Impératif Déontologique de Supervision]
[01:15:25] DR. PRISCA LUTUMBA : « En juillet 1985 est votée la loi de protection du titre de psychologue. Nous avons un numéro RPPS au répertoire partagé des professionnels de santé : nous sommes professionnels de santé mentale autonomes et indépendants ! Un médecin ne nous prescrit pas un protocole ni un nombre de séances en entreprise, car nous sommes issus des sciences humaines et sociales et autonomes dans notre pratique. »
[01:20:40] DR. PRISCA LUTUMBA : « Quand vous vous installerez à votre compte, sachez que nous avons le même code APE que les sophrologues, mais aussi textuellement que les voyantes et les marabouts : 'sciences humaines non classées ailleurs' ! Ne tombons pas dans le piège de la concurrence avec les coachs ou les infirmiers de pratique avancée : valorisons notre rigueur universitaire bac+5 et soyons ambassadeurs de notre discipline. »
[01:23:15] DR. PRISCA LUTUMBA : « Est-ce qu'il faut adapter l'homme au travail ou transformer le travail ? La réponse Cnam est sans équivoque : on ne va pas demander à l'homme d'être plus fort pour encaisser le travail de trois personnes ! Quand on intervient, oui on répond à une commande d'employeur commanditaire, mais notre fondement numéro un est la protection de la personne et de sa dignité. »
[01:29:10] DR. PRISCA LUTUMBA : « Je vous encourage vivement à vous faire superviser. C'est un outil de travail fondamental du psychologue ! La supervision permet, face à la matière humaine et au réel du travail que vous détricotez en entretien, d'élaborer sur votre propre rapport aux situations. Ne confondez pas cela avec l'analyse des pratiques (APP), qui est un travail d'équipe, ni avec la régulation ou l'intervision. »`,
    bibliographieCitee: [
      {
        titre: "Une profession balkanisée : les psychologues du travail en France (1910-1990)",
        auteur: "Thomas Le Bianic",
        annee: "2004",
        remarque: "Étude socio-historique fondamentale sur l'INOP, la conquête du titre de 1985 et l'histoire de la chaire du Cnam.",
      },
      {
        titre: "Les Chômeurs de Marienthal",
        auteur: "Marie Jahoda, Paul Lazarsfeld, Hans Zeisel",
        annee: "1933 (Trad. Minuit 1981)",
        remarque: "L'enquête sociologique fondatrice sur les dégâts psychiques du chômage et les fonctions latentes de l'emploi.",
      },
      {
        titre: "Travail, usure mentale : de la psychopathologie à la psychodynamique du travail",
        auteur: "Christophe Dejours",
        annee: "1980 (Nouvelle éd. Bayard 2000)",
        remarque: "L'ouvrage de référence cité par Dr. Lutumba sur les défenses collectives et la souffrance au travail.",
      },
      {
        titre: "La fonction psychologique du travail",
        auteur: "Yves Clot",
        annee: "1999 (PUF)",
        remarque: "Texte socle de la Clinique de l'activité sur le travail bien fait, le genre professionnel et le pouvoir d'agir.",
      },
      {
        titre: "Psychology and Industrial Efficiency",
        auteur: "Hugo Münsterberg",
        annee: "1913 (Houghton Mifflin)",
        remarque: "Acte de naissance de la psychologie industrielle moderne appliquant la psychométrie au travail.",
      },
      {
        titre: "Le Harcèlement moral : la violence perverse au quotidien",
        auteur: "Marie-France Hirigoyen",
        annee: "1998 (Syros)",
        remarque: "L'ouvrage clinique ayant conduit à la reconnaissance législative du harcèlement en 2002.",
      },
      {
        titre: "Code de déontologie des psychologues",
        auteur: "Commission Nationale Consultative de Déontologie des Psychologues (CNCDP)",
        annee: "1996 (Réactualisé 2012 / 2021)",
        remarque: "Cadre éthique et juridique régissant l'indépendance, la supervision et la dignité de la personne.",
      },
      {
        titre: "Synthèse Académique Bento — Cours 3 PST123 (Dr. Prisca Lutumba)",
        auteur: "Dr. Prisca Lutumba (Plateforme PST)",
        annee: "Novembre 2026",
        remarque: "Fiche PDF complète (2 pages) : Genèse 1879–aujourd'hui, Jahoda, Karasek/Siegrist, Loi 1985/RPPS & 4 dispositifs d'étayage.",
        url: "/docs/PST123_Cours_3_Synthese_Lutumba.pdf",
      },
      {
        titre: "Retranscription Complète Nettoyée & Horodatée — Cours 3 PST123 (Dr. Prisca Lutumba)",
        auteur: "Dr. Prisca Lutumba",
        annee: "Novembre 2026",
        remarque: "Intégralité des 1 h 31 min 17 s (169 séquences SRT du 3 novembre 2026) nettoyée en 6 chapitres (14 pages PDF).",
        url: "/docs/PST123_Cours_3_Transcription_Complete_Nettoyee.pdf",
      },
      {
        titre: "Diaporama Officiel Cours 3 — Repères historiques (Dr. Prisca Lutumba)",
        auteur: "Dr. Prisca Lutumba",
        annee: "Novembre 2026",
        remarque: "Support visuel projeté en séance (8 diapositives : frises 1879–2002, paysage théorique pluriel & tensions).",
        url: "/docs/PST123_Cours_3_Diaporama_Lutumba.pdf",
      },
    ],
  },
  // ══════════════════════════════════════════════════════════════════════════
  // PST123 — SÉANCE 4 : SPÉCIFICITÉS DE L'ACCOMPAGNEMENT EN MILIEU DE TRAVAIL
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst123-s4",
    moduleKey: "pst123",
    moduleLabel: "PST123",
    numeroSeance: 4,
    titre: "Séance 4 — Spécificités de l'Accompagnement en Milieu de Travail & Posture Clinique du Psychologue",
    sousTitre: "De la cellule d'écoute à l'analyse du travail réel : niveaux de prévention, dispositifs d'étayage et déontologie de l'intervention",
    enseignant: "Dr. Prisca LUTUMBA (Psychologue clinicienne du travail, Cnam Nouvelle-Aquitaine / Dax & Bordeaux)",
    dateSeance: "7 novembre 2026",
    format: "presentiel",
    dureeEnregistrement: "2 h 01 min (Regroupement présentiel, Salle 2 - Sadi Carnot)",
    resumeExecutif: [
      "Déplacement clinique de la commande : Face à une direction demandant une « cellule d'écoute » suite à des arrêts maladie répétés, le clinicien refuse de cibler l'individu et de violer le secret médical (l'employeur n'a pas accès aux motifs médicaux). Il déplace l'analyse vers l'organisation, les arbitrages de métier et l'écart entre travail prescrit et travail réel.",
      "L'analyse de la demande comme premier acte de transformation : Contrairement à un audit technique qui valide passivement un cahier des charges, l'analyse clinique de la demande questionne le commanditaire, fait émerger les enjeux non-dits et commence déjà à transformer les représentations de la gouvernance (« poser le problème, c'est déjà commencer à le résoudre »).",
      "PTO vs Cliniques du travail au Cnam : La PTO anglo-saxonne use d'une approche hypothético-déductive et quantitative par questionnaires posés a priori ; le Cnam revendique une démarche inductive et qualitative fondée sur l'observation de l'activité réelle et l'écoute du vécu des salariés (« le réel de l'activité englobe ce qu'on fait, ce qu'on ne peut pas faire, ce qu'on voudrait faire et ce qu'on fait pour ne pas faire », selon Yves Clot).",
      "La santé comme pouvoir d'agir et créativité : La santé n'est pas l'absence de symptômes mais la préservation d'une marge de manœuvre, du pouvoir d'agir et de la capacité à imprimer son style professionnel (héritage de Saint-Alban, Le Guillant, Sivadon, Veil, Clot et Dejours).",
      "Modélisation des 3 niveaux de prévention (le cas princeps de l'EHPAD 2020-2024) : Prévention primaire (agir à la conception sur les causes organisationnelles, ex: poser des rails lève-malade au plafond et budgéter des postes d'aides-soignants dès l'ouverture), prévention secondaire (former et équiper face aux signaux de fatigue), prévention tertiaire (réparer dans l'urgence après l'explosion des arrêts ou des violences).",
      "Cartographie des 4 dispositifs collectifs d'étayage : Régulation d'équipe (traitement des tensions, ligne hiérarchique présente admise sous réserve de focalisation sur le tiers-travail), APP (pairs stricts sans hiérarchie), Intervision (pairs sans superviseur) et Supervision (analyse de la posture clinique avec un superviseur senior extérieur).",
      "Déontologie et règles d'or de restitution en entreprise : Respect inaliénable de la personne (art. 1er du Code CNCDP, refontes 2012/2021). Bannir formellement tout verbatim individuel dans les rapports institutionnels (pour protéger les salariés contre les représailles de pairs ou du management). Pratique impérative de l'intervention en binôme.",
    ],
    modalitesExamen: {
      session1Date: "Février 2027 (Session 1 Cnam)",
      session2Date: "Avril 2027 (Rattrapage)",
      duree: "2 heures",
      format: "Épreuve sur table sans documents — Choix entre Option A (Dissertation) et Option B (Étude de cas)",
      optionsAuChoix: [
        "Option A : Dissertation théorique (ex: « Discutez la formule : 'analyser la demande en milieu professionnel, c'est déjà une action de transformation' » ou « En quoi le travail fait-il tiers dans la régulation des relations professionnelles selon les cliniques du travail ? »).",
        "Option B : Étude de cas clinique (ex: Face à une direction générale sollicitant l'installation d'une cellule d'écoute suite à une épidémie d'arrêts maladie, élaborez la méthodologie d'intervention du psychologue du travail, de l'analyse de la demande à la restitution sans verbatims).",
      ],
      recommandationsNotation:
        "Dr. Lutumba sanctionne impitoyablement trois erreurs en copie : 1) Confondre le rôle de psychologue du travail avec un psychothérapeute de cabinet individuel qui ferait de l'écoute compassionnelle hors-travail, 2) Confondre un groupe d'APP (pairs stricts sans hiérarchie) avec une régulation d'équipe, 3) Insérer des verbatims de salariés dans un rapport de restitution en entreprise. Valoriser les concepts précis : 'tiers-travail', 'résonance symbolique', 'travail émotionnel (Hochschild / Gollac)', 'pouvoir d'agir', 'prévention primaire à la conception'.",
    },
    consignesOralesProf: [
      {
        titre: "Lecture obligatoire : Code de déontologie des psychologues (CNCDP)",
        typeTravail: "lecture",
        consigneExacte:
          "Prendre connaissance du Code de déontologie réactualisé (notamment son principe premier sur le respect de la personne dans sa dimension psychique et physique). Se référer aux livrets thématiques de la CNCDP (les écrits du psychologue, le secret professionnel et le consentement éclairé).",
        echeance: "Avant la prochaine séance",
        modaliteRendu: "Appropriation personnelle en vue du dossier de fin d'études et de l'agrément.",
        recommandationsProf: "Annexer systématiquement le Code de déontologie à vos propositions d'intervention en entreprise.",
      },
      {
        titre: "Approfondissement : Le Travail Émotionnel (Arlie Russell Hochschild) & Rapport Gollac",
        typeTravail: "recherche",
        consigneExacte:
          "Consulter les travaux d'Arlie Hochschild sur le 'travail émotionnel' (Emotional Labor) et repérer comment le rapport du collège d'expertise présidé par Michel Gollac (2011) l'intègre comme l'un des 6 grands facteurs de risques psychosociaux (RPS).",
        echeance: "Séance 5",
        modaliteRendu: "Notes de synthèse pour enrichir l'analyse des métiers de service et d'accueil.",
        recommandationsProf: "Excellent concept discriminant pour l'Option B d'examen.",
      },
      {
        titre: "Préparation de la posture pour l'Agrément professionnel du Titre RNCP",
        typeTravail: "exercice_ad",
        consigneExacte:
          "S'entraîner à expliciter sa posture d'intervention : pourquoi refuser d'intervenir comme psychologue dans son propre service ? Pourquoi privilégier le travail en binôme ? Comment borner son mandat face à la commande managériale ?",
        echeance: "Tout au long du semestre",
        modaliteRendu: "Réflexivité continue sur son carnet de bord clinique.",
        recommandationsProf: "Le jury d'agrément évalue avant tout votre solidité éthique face aux pressions de l'institution.",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "Cadrage Clinique & Déplacement de la Demande : Le Travail comme Tiers Médiateur",
        points: [
            {
              titre: "L'étude de cas introductive : le piège de la « cellule d'écoute »",
              contenu:
                "Lorsqu'une direction fait appel à un psychologue du travail pour installer une cellule d'écoute suite à des arrêts maladie en cascade, elle pose un acte mais cible d'emblée l'individu. Qu'elle agisse par désarroi sincère ou pour 'ouvrir le parapluie' (se couvrir juridiquement face à l'obligation de sécurité de l'article L. 4121-1), le psychologue refuse de réduire la souffrance à une défaillance personnelle ou à de la victimisation. Il déplace le curseur vers l'organisation, les arbitrages de métier et l'analyse de l'activité réelle.",
            },
            {
              titre: "Cadre légal et secret médical absolu des arrêts de travail",
              contenu:
                "Dr. Lutumba rappelle un point de droit méconnu : l'employeur n'a JAMAIS accès au motif médical d'un arrêt de travail (volet médical réservé exclusivement au médecin-conseil de la CPAM). Même lors d'un contrôle patronal à domicile, le médecin contrôleur mandaté confirme uniquement la justification administrative sans divulguer la moindre pathologie. Lors des entretiens cliniques, le psychologue accueille la parole libre sans jamais se faire l'auxiliaire de contrôle de la direction.",
            },
            {
              titre: "La Résonance Symbolique : scènes personnelle et professionnelle",
              contenu:
                "Théorisée par Christophe Dejours, la résonance symbolique désigne le phénomène par lequel la scène professionnelle actuelle réactive des traumatismes, des rivalités ou des blessures narcissiques non résolues sur la scène personnelle et familiale antérieure (ex: une salariée revivant face à sa cheffe de service le rejet de sa mère ou de sa sœur). Le psychologue accueille ce vécu mais réétablit immédiatement l'altérité et le tiers-travail ('votre manageuse n'est ni votre mère ni votre sœur ; quel est son rôle d'organisation ?'). Si le besoin d'élaborer sur l'histoire intime persiste, il réoriente vers un psychologue clinicien extérieur.",
              auteurs: ["Christophe Dejours"],
            },
        ],
      },
      {
        numero: "2",
        titre: "Cartographie Épistémologique : PTO vs Cliniques du Travail du Cnam",
        points: [
          {
            titre: "Psychologie du Travail et des Organisations (PTO) : la tradition hypothético-déductive",
            contenu:
              "Issue de la psychotechnique d'après-guerre (sélection, orientation, adéquation homme-poste de Taylor et Münsterberg), de la psychologie sociale (dynamique de groupe de Lewin, leadership) et de la psychologie de la santé, la PTO use d'une méthodologie anglo-saxonne quantitative : questionnaires standardisés, modèles prédictifs a priori et analyses corrélationnelles.",
            auteurs: ["Kurt Lewin", "Hugo Münsterberg"],
          },
          {
            titre: "Les Cliniques du travail au Cnam : la démarche inductive qualitative",
            contenu:
              "Fondée sur l'observation minutieuse de l'activité réelle et l'écoute de la parole vivante des salariés, la clinique du travail part du terrain pour conceptualiser. La santé y est définie non comme l'absence de symptômes, mais comme le pouvoir d'agir, la marge de manœuvre et la capacité à exprimer sa créativité (héritage de Saint-Alban, Le Guillant, Sivadon, Veil, Clot et Dejours).",
            auteurs: ["Louis Le Guillant", "Paul Sivadon", "Claude Veil"],
          },
          {
            titre: "Modélisation de l'activité selon Yves Clot : Tâche, Activité et Réel de l'Activité",
            contenu:
              "Enseignée au Cnam en PST106, la clinique de l'activité décompose l'action : 1) La Tâche (le travail prescrit par l'organisation) ; 2) L'Activité réalisée (ce qui est mis en œuvre par le sujet face aux contraintes) ; 3) Le Réel de l'Activité (ce qui ne se fait pas, ce qu'on voudrait faire mais qu'on ne peut pas, ce qu'on est empêché de faire, et ce qu'on fait pour ne pas faire). La souffrance naît de l'empêchement du beau travail.",
            auteurs: ["Yves Clot"],
          },
          {
            titre: "Clinique des Usages et technologies émergentes (IA agentique & technostress)",
            contenu:
              "Portée par Marc-Éric Bobillier-Chaumon (PST124), la clinique des usages analyse les transformations introduites par les technologies (IA agentique, scraping automatisé, reporting continu). L'enjeu anthropocentré est de maintenir l'outil au service de l'activité humaine et d'éviter que le salarié ne devienne l'exécutant asservi d'un algorithme opaque.",
            auteurs: ["Marc-Éric Bobillier-Chaumon"],
          },
        ],
      },
      {
        numero: "3",
        titre: "De la Commande à la Demande & Typologie des Niveaux de Prévention",
        points: [
          {
            titre: "« Analyser la demande, c'est déjà une action de transformation »",
            contenu:
              "La commande est le contrat formel (devis, mandat d'intervention signé). La demande est l'expression latente d'un dysfonctionnement organisationnel. En questionnant le commanditaire pour l'amener à reformuler son besoin, le psychologue amorce immédiatement une décentration des acteurs : 'poser le problème de façon clinique, c'est déjà contribuer à le résoudre'.",
          },
          {
            titre: "Illustration des 3 niveaux de prévention à travers le cas de l'EHPAD (Dr. Lutumba)",
            contenu:
              "1) Prévention primaire (agir à la conception en 2020) : installer des rails lève-malade au plafond dans toutes les chambres dès l'ouverture et budgéter des postes d'aides-soignants pour anticiper la dépendance à 4 ans ; 2) Prévention secondaire (former en 2022) : mettre en place des groupes d'analyse des pratiques et des fiches d'alerte RH face aux premières tensions ; 3) Prévention tertiaire (réparer la crise en 2024) : intervenir en urgence après l'explosion des arrêts maladie et des violences entre soignants épuisés.",
          },
          {
            titre: "Dispositifs individuels d'accompagnement : maintien dans l'emploi & souffrance",
            contenu:
              "Appuyé sur les travaux de Dominique Lhuilier, le maintien dans l'emploi s'entend au sens large (repositionnement, reconversion, accompagnement des transitions). Les consultations souffrance au travail (Marie Pezé, Frédérique Debout) recentrent l'élaboration sur le travail sans dériver vers une psychothérapie privée décontextualisée.",
            auteurs: ["Dominique Lhuilier", "Marie Pezé", "Frédérique Debout"],
          },
        ],
      },
      {
        numero: "4",
        titre: "Déontologie, Posture d'Intervention & Règles d'Or des Restitutions",
        points: [
          {
            titre: "Statut légal RPPS et indépendance professionnelle",
            contenu:
              "Le psychologue est un professionnel de la santé mentale et des sciences humaines (Loi du 25 juillet 1985, art. 44). Il est autonome et n'exerce sous aucune subordination médicale (le médecin ne lui prescrit ni son protocole ni le nombre de ses séances). Respect inaliénable de la personne (art. 1er du Code CNCDP réactualisé en 2012 et 2021-2022).",
          },
          {
            titre: "Règle d'or absolue : proscription des verbatims dans les rapports en entreprise",
            contenu:
              "Ne JAMAIS insérer de citations directes ou de verbatims individuels dans un rapport institutionnel d'entreprise. Même prétendument anonymisés, les tics de langage, les formulations ou les revendications permettent aux collègues et managers d'identifier immédiatement le salarié, l'exposant à des représailles patronales directes ou diffuses. La restitution doit formuler des constats collectifs et objectivés.",
          },
          {
            titre: "Le piège juridique de la qualification de « harcèlement moral »",
            contenu:
              "Le psychologue accueille la plainte subjective mais rappelle que 'harcèlement' est une qualification juridique pénale et prud'homale réservée souverainement au juge. Les médecins qui délivrent des arrêts libellés 'pour harcèlement au travail' sont régulièrement condamnés par l'Ordre des Médecins pour immixtion et attestation de faits non constatés directement en entreprise. Le psychologue requalifie la situation en termes de dégradation des conditions de travail et de qualité empêchée.",
          },
          {
            titre: "L'impératif du travail en binôme & éthique du Care",
            contenu:
              "Intervenir systématiquement à deux (deux psychologues ou un binôme psychologue/ergonome) constitue la garantie majeure contre l'isolement, les pressions de la direction et la perte de neutralité. Intégrer également le concept de Travail Émotionnel (Arlie Hochschild, indicateurs Gollac) et de Care (Pascale Molinier) dans l'analyse des métiers du soin et de la relation client.",
            auteurs: ["Arlie Russell Hochschild", "Michel Gollac", "Pascale Molinier"],
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Matrice Comparative des 4 Dispositifs Collectifs d'Étayage Clinique",
        description: "Tableau de référence de Dr. Lutumba distinguant la régulation d'équipe, l'APP, l'intervision et la supervision",
        colonnes: ["Dispositif Collectif", "Composition & Participants", "Présence Hiérarchique ?", "Finalité Clinique & Cadre de Travail"],
        lignes: [
          {
            axe: "Régulation d'Équipe",
            valeurs: [
              "Équipe opérationnelle confrontée à un blocage ou un conflit relationnel",
              "Oui, possible et souvent nécessaire (détient les leviers organisationnels)",
              "Dénouer les tensions en les ramenant impérativement sur le tiers-travail (procédures, flux, arbitrages)",
            ],
          },
          {
            axe: "Analyse des Pratiques (APP)",
            valeurs: [
              "Groupe homogène de pairs de même métier (ex: éducateurs, soignants)",
              "NON, FORMELLEMENT EXCLUE (aucun supérieur ni subordonné)",
              "Élaboration sur le geste professionnel et l'éthique de métier avec un tiers animateur garant",
            ],
          },
          {
            axe: "Intervision",
            valeurs: [
              "Collectif restreint de pairs praticiens (ex: 6 à 8 psychologues du travail)",
              "Non (espace autogéré de collègues de même niveau)",
              "Partage horizontal d'expériences et de cas complexes sans superviseur attitré",
            ],
          },
          {
            axe: "Supervision",
            valeurs: [
              "Praticien individuel ou équipe accompagnée par un superviseur senior extérieur",
              "Non (cadre déontologique confidentiel externe)",
              "Analyse approfondie de la posture clinique, du contre-transfert et des blocages méthodologiques",
            ],
          },
        ],
      },
      {
        titre: "Modélisation des 3 Niveaux de Prévention dans les Organisations (Cas de l'EHPAD)",
        description: "Application concrète des niveaux de prévention de santé publique à la clinique du travail",
        colonnes: ["Niveau de Prévention", "Temporalité & Logique", "Illustration Clinique : Cas de l'EHPAD (Dr. Lutumba)"],
        lignes: [
          {
            axe: "Prévention Primaire",
            valeurs: [
              "Agir en amont absolu dès la conception sur les causes organisationnelles",
              "Installation de rails lève-malade au plafond dès l'ouverture en 2020 et budgétisation de postes soignants supplémentaires pour 2024",
            ],
          },
          {
            axe: "Prévention Secondaire",
            valeurs: [
              "Accompagner, former et équiper face aux signaux précoces de fatigue",
              "Formations à la manutention douce, groupes de parole et création de fiches d'alerte RH en 2022",
            ],
          },
          {
            axe: "Prévention Tertiaire",
            valeurs: [
              "Réparer dans l'urgence la crise aiguë, les violences ou l'explosion des arrêts",
              "Gestion de crise en 2024 suite au burn-out généralisé et à la séquestration d'un soignant par un collègue excédé",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Ne jamais insérer de verbatims individuels dans un rapport institutionnel d'entreprise",
        erreurCourante: "Citer des phrases exactes d'opérateurs dans la restitution sous prétexte qu'elles sont anonymisées.",
        rectificationAttendue:
          "Les collègues et le management reconnaissent immédiatement le style et les revendications de l'auteur. Le psychologue restitue des processus collectifs, des défaillances de métier et des faits objectivés, jamais des verbatims individualisés qui exposent les salariés à des sanctions.",
        contexte: "Section 4 — Déontologie & Restitution",
      },
      {
        titre: "Ne pas qualifier juridiquement un comportement de « harcèlement moral »",
        erreurCourante: "Valider en tant que psychologue ou appuyer un certificat médical libellé 'harcèlement moral'.",
        rectificationAttendue:
          "Le harcèlement moral est une qualification juridique relevant de la compétence exclusive du juge. Le psychologue analyse la souffrance éthique, la dégradation objective des conditions de travail et la qualité empêchée, sans usurper le mandat judiciaire.",
        contexte: "Section 4 — Cadre juridique et déontologie",
      },
      {
        titre: "Ne jamais confondre l'Analyse des Pratiques (APP) avec la Régulation d'Équipe",
        erreurCourante: "Convoquer un manager hiérarchique dans une séance d'APP ou prétendre que l'APP sert à régler un conflit d'équipe.",
        rectificationAttendue:
          "L'APP est réservée exclusivement aux pairs de même métier sans aucun lien hiérarchique pour permettre l'exposition de la vulnérabilité professionnelle. Le traitement des conflits avec la direction relève de la Régulation d'équipe.",
        contexte: "Section 3 & Tableau des dispositifs",
      },
      {
        titre: "Proscrire l'expression « suicide réussi » et refuser la déflexion externe",
        erreurCourante: "Parler de 'suicide réussi' ou attribuer le suicide sur le lieu de travail à des causes purement conjugales ou privées.",
        rectificationAttendue:
          "Employer uniquement les termes 'suicide' ou 'tentative de suicide' (ou 'suicide blanc' selon Marie Pezé). Réinternaliser systématiquement l'analyse du travail : pourquoi l'organisation a-t-elle laissé le salarié isolé et sans ressource face à l'épreuve ?",
        contexte: "Section 4 — Clinique et vocabulaire",
      },
    ],
    transcriptionIntegraleVerbatim: `[1. L'illusion de la « cellule d'écoute » et le secret médical des arrêts de travail]
[00:01:32] DR. PRISCA LUTUMBA : « Dans la vraie vie professionnelle, les demandes vous parviennent très souvent sous cette forme : "J'ai plusieurs arrêts maladie dans le service, mettez-moi une cellule d'écoute". En formulant cela, l'employeur cible immédiatement l'individu. Notre premier rôle de psychologue du travail est de déplacer le curseur : interroger l'organisation, les conditions réelles de l'activité, et l'écart entre le travail prescrit et le travail réel. »
[00:09:42] DR. PRISCA LUTUMBA : « Rappelez-vous que l'employeur n'a JAMAIS accès au motif médical de l'arrêt de travail : le secret médical est absolu ! Même en cas de contrôle médical patronal à domicile, le médecin contrôleur vérifie uniquement la présence du salarié et la régularité administrative, sans jamais transmettre le moindre diagnostic à l'employeur. Quand une direction vous affirme "ils sont tous en arrêt pour dépression", ce sont des suppositions managériales, pas des faits médicaux avérés. »

[2. PTO vs Cliniques du Travail du Cnam & le Réel de l'Activité selon Yves Clot]
[00:22:13] DR. PRISCA LUTUMBA : « La grande différence entre la PTO traditionnelle et les Cliniques du travail du Cnam réside dans la démarche : la PTO est hypothético-déductive et quantitative par questionnaires posés a priori ; notre approche est inductive et qualitative. Nous partons du terrain et de l'écoute du vécu des salariés pour remonter vers la conceptualisation du travail réel. »
[00:24:05] DR. PRISCA LUTUMBA : « Avec Yves Clot en PST106, nous apprenons que le réel de l'activité ne se résume pas à ce qui est réalisé sous nos yeux : il comprend aussi ce que le travailleur n'a pas pu faire, ce qu'il a été empêché de faire, ce qu'il aurait voulu faire, et ce qu'il fait pour ne pas faire ! La santé n'est pas l'absence de symptômes : elle réside dans la préservation du pouvoir d'agir et de la marge de manœuvre. »

[3. La Résonance Symbolique (Dejours) et le Tiers-Travail]
[00:39:18] DR. PRISCA LUTUMBA : « La résonance symbolique théorisée par Christophe Dejours est un point fondamental : c'est le phénomène par lequel la scène professionnelle actuelle réactive des blessures ou relations d'objet issues de la scène personnelle et familiale antérieure. Face à une salariée qui s'effondre en voyant dans sa manageuse l'incarnation de sa mère tyrannique, notre posture est de réintroduire l'altérité et le tiers-travail : "votre manageuse n'est ni votre mère ni votre sœur ; de quoi avez-vous besoin pour réaliser votre travail avec elle ?". Si elle souhaite élaborer sur son passé, nous l'orientons vers un psychologue clinicien extérieur. »

[4. Commande vs Demande & les 3 Niveaux de Prévention à l'EHPAD]
[01:00:19] DR. PRISCA LUTUMBA : « Retenez cette formule pour votre examen et votre pratique : "Analyser la demande, c'est déjà une action de transformation !". En amenant le commanditaire à expliciter et reformuler son problème, vous commencez déjà à décentrer les acteurs et à modifier les représentations de la direction. »
[01:05:17] DR. PRISCA LUTUMBA : « Pour comprendre les 3 niveaux de prévention, prenez l'exemple de l'EHPAD : 1) Prévention primaire (agir à la conception en 2020) : installer des rails lève-malade au plafond dès l'ouverture et budgéter des postes de soignants supplémentaires pour anticiper la dépendance à 4 ans ; 2) Prévention secondaire (2022) : former à la manutention douce et créer des fiches d'alerte RH face aux premières fatigues ; 3) Prévention tertiaire (2024) : intervenir en urgence après la rupture, quand un soignant à bout de nerfs en vient à séquestrer un collègue dans un cagibi ! Notre boussole est de toujours ramener l'entreprise vers la prévention primaire. »

[5. Dispositifs Collectifs d'Étayage & Pratique en Binôme]
[01:27:47] DR. PRISCA LUTUMBA : « Distinguez rigoureusement la Régulation d'équipe (où la hiérarchie peut être présente pour ajuster les règles de travail) de l'Analyse des Pratiques Professionnelles (APP), qui est un espace sacré réservé EXCLUSIVEMENT aux pairs de même métier sans aucune hiérarchie, pour y exposer leurs doutes et leur vulnérabilité professionnelle face à un tiers garant. »
[01:47:20] DR. PRISCA LUTUMBA : « En entreprise, travaillez systématiquement EN BINÔME ! Dans mon activité, y compris en libéral, je n'interviens quasiment jamais seule. Intervenir à deux (avec un autre psychologue ou un ergonome) est votre meilleure protection contre les pressions institutionnelles, la séduction managériale et le risque d'isolement. »

[6. Règles d'Or de Restitution : Bannir les Verbatims & Prudence sur le Harcèlement]
[01:51:07] DR. PRISCA LUTUMBA : « Règle d'or absolue pour vos rapports : BANISSEZ LES VERBATIMS INDIVIDUELS ! Même si vous croyez anonymiser, les tournures de phrases, les tics de langage et les revendications font immédiatement reconnaître le salarié par ses collègues ou son chef, l'exposant à des représailles directes. Un rapport de psychologue du travail doit restituer des constats collectifs objectivés et des problématiques de métier, jamais des citations identifiables. »
[01:52:40] DR. PRISCA LUTUMBA : « Prudence extrême également sur le terme "harcèlement moral" : c'est une qualification juridique qui relève de la compétence exclusive du juge ! Le médecin traitant qui délivre un arrêt libellé "harcèlement" s'expose à des poursuites disciplinaires devant l'Ordre des Médecins. Le psychologue du travail, lui, accueille la souffrance vécue et requalifie la situation en analysant la dégradation objective des conditions de travail et la qualité empêchée. »`,
    bibliographieCitee: [
      {
        titre: "La fonction psychologique du travail",
        auteur: "Yves Clot",
        annee: "1999 (PUF)",
        remarque: "Concept princeps de Réel de l'Activité (ce qui ne se fait pas, ce qui est empêché) et clinique du pouvoir d'agir.",
      },
      {
        titre: "Travail, usure mentale : essai de psychopathologie du travail",
        auteur: "Christophe Dejours",
        annee: "1993 / 2000 (Bayard)",
        remarque: "Théorisation de la résonance symbolique, de la centralité du travail dans l'identité adulte et des défenses collectives.",
      },
      {
        titre: "The Managed Heart: Commercialization of Human Feeling",
        auteur: "Arlie Russell Hochschild",
        annee: "1983 (University of California Press)",
        remarque: "L'ouvrage fondateur théorisant le Travail Émotionnel (Emotional Labor) et la façade émotionnelle contrainte.",
      },
      {
        titre: "Mesure des facteurs psychosociaux de risque au travail pour la maîtrise de leurs usages (Rapport Gollac)",
        auteur: "Michel Gollac & Marceline Bodier",
        annee: "2011 (Ministère du Travail)",
        remarque: "Rapport national intégrant les exigences émotionnelles et la souffrance éthique parmi les 6 familles de RPS.",
      },
      {
        titre: "Ils ne mouraient pas tous mais tous étaient frappés : journal d'une consultation souffrance et travail",
        auteur: "Marie Pezé",
        annee: "2008 (Pearson)",
        remarque: "Ouvrage de référence sur les consultations spécialisées, le refus de la déflexion externe et le concept de suicide blanc.",
      },
      {
        titre: "Vulnérabilités au travail : de la souffrance à la santé",
        auteur: "Dominique Lhuilier",
        annee: "2010 (Érès)",
        remarque: "Théorisation clinique du maintien dans l'emploi, du rapport à l'emploi et de l'accompagnement des transitions.",
      },
      {
        titre: "Le Travail du care",
        auteur: "Pascale Molinier",
        annee: "2013 (La Dispute)",
        remarque: "Approche clinique et féministe de l'invisibilisation des métiers du soin, de la sollicitude et du lien social.",
      },
      {
        titre: "Les mutations du travail et des organisations : impacts sur les activités et les acteurs",
        auteur: "Marc-Éric Bobillier-Chaumon",
        annee: "2021 (Dunod)",
        remarque: "Clinique des usages appliquée aux technologies numériques, à l'IA et aux environnements de travail hybrides.",
      },
      {
        titre: "Code de déontologie des psychologues",
        auteur: "Commission Nationale Consultative de Déontologie des Psychologues (CNCDP)",
        annee: "1996 (Réactualisé 2012 / 2021)",
        remarque: "Principe premier du respect inaliénable de la personne, indépendance déontologique et secret professionnel.",
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PST123 — SÉANCE 5 : POLYSÉMIE DU CONCEPT DE TRAVAIL & REGARDS CROISÉS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst123-s5",
    moduleKey: "pst123",
    moduleLabel: "PST123",
    numeroSeance: 5,
    titre: "Séance 5 — Polysémie du Concept de Travail & Regards Croisés : Économie, Sociologie et Cliniques du Travail",
    sousTitre: "De la malédiction antique à l'activité réelle : confrontation des modèles PTO/RPS, dualité Dejours vs Clot, clinique des usages et soutenabilité",
    enseignant: "Dr. Prisca LUTUMBA (Psychologue clinicienne du travail, Cnam Nouvelle-Aquitaine / Dax & Bordeaux)",
    dateSeance: "10 novembre 2026",
    format: "webconference",
    dureeEnregistrement: "1 h 32 min (Webconférence interactive BigBlueButton)",
    resumeExecutif: [
      "Polysémie et historicité du concept de travail : Le travail est une construction historique et sociale non réductible à l'emploi. D'abord perçu comme châtiment servile (tripalium/ponos), il devient sous l'ère industrielle le vecteur central d'intégration (Durkheim), de salut éthique (Weber) et de réalisation humaine, tout en étant le lieu de l'extraction de la plus-value (Marx).",
      "L'invisibilisation du réel par l'économie quantitative : L'approche économique classique et contemporaine réduit le travail à un facteur marchand de production, un volume d'heures ou un capital humain individuel. Le clinicien rappelle le principe déontologique fondamental : « on ne vend pas sa personne, on monnaie sa force de travail et ses compétences ».",
      "La rupture fondatrice de l'ergonomie francophone (Ombredane & Faverge 1955) : Sortie du laboratoire pour observer le travail réel sur le terrain. L'activité réelle déborde irréductiblement la tâche prescrite pour compenser les aléas, la variabilité et les imprévus.",
      "Modèles PTO et grille RPS du Collège Gollac (2011) : Si Karasek (demande/latitude) et Siegrist (effort/récompense) mesurent les tensions, le rapport Gollac fixe les 6 facteurs cardinaux de RPS (intensité/temps, exigences émotionnelles, autonomie, rapports sociaux, conflits de valeurs, insécurité de l'emploi).",
      "La dualité fondatrice des Cliniques du Travail au Cnam : Christophe Dejours (Psychodynamique) place la focale sur le sujet, la souffrance face à la résistance du réel, l'intelligence rusée (métis/phronésis), la sublimation et la reconnaissance (jugement d'utilité et de beauté) ; tandis qu'Yves Clot (Clinique de l'activité) explore le réel de l'activité (ce qui est empêché ou contrarié), la tension Genre/Style, le développement du pouvoir d'agir et la souffrance par la qualité empêchée.",
      "Transformations digitales & Clinique des Usages (Marc-Éric Bobillier-Chaumon) : L'outil numérique ne se contente pas d'automatiser, il reconfigure les métiers, les compétences et les collectifs. « Former ne suffit pas, on n'évangélise pas une technologie » : nécessité d'analyser l'acceptation située en contexte réel face aux paradoxes technologiques.",
      "Critique de la valeur-travail et soutenabilité (Dominique Méda & André Gorz) : Remise en cause de la centralité hégémonique du travail marchand au détriment des activités de care (soin des proches, parentalité, citoyenneté). Plaidoyer pour des indicateurs de richesse humaine au-delà du PIB et pour la reconquête du temps libéré.",
    ],
    modalitesExamen: {
      session1Date: "Février 2027 (Session 1 Cnam)",
      session2Date: "Avril 2027 (Rattrapage)",
      duree: "2 heures",
      format: "Épreuve sur table sans documents — Choix entre Option A (Dissertation) et Option B (Étude de cas)",
      optionsAuChoix: [
        "Option A : Dissertation théorique (ex: « Discutez cette affirmation de Dr. Lutumba : 'en psychologie du travail, l'activité réelle déborde toujours la tâche prescrite' » ou « En quoi les approches de Christophe Dejours et d'Yves Clot constituent-elles deux paradigmes complémentaires mais épistémologiquement irréductibles de la souffrance au travail ? »).",
        "Option B : Étude de cas / Intervention clinique (ex: Face au déploiement d'une nouvelle technologie logicielle ou d'IA générative contestée par les salariés dans une grande organisation, élaborez la démarche du psychologue du travail en mobilisant le modèle de l'acceptation située de Marc-Éric Bobillier-Chaumon).",
      ],
      recommandationsNotation:
        "Sanction immédiate si le candidat confond Christophe Dejours et Yves Clot : ce sont des frères ennemis théoriques (l'un centré sur l'économie pulsionnelle du sujet et la reconnaissance, l'autre sur l'activité historico-culturelle et le genre de métier). Valoriser impérativement la distinction Genre vs Style (Clot), Débat de normes vs Usage de soi (Schwartz), Acceptabilité vs Acceptation située (Bobillier-Chaumon) et la critique du PIB (Dominique Méda).",
    },
    consignesOralesProf: [
      {
        titre: "Accès aux cours et textes fondamentaux sur Moodle",
        typeTravail: "lecture",
        consigneExacte:
          "Se connecter dès le mercredi midi sur l'espace Moodle PST123 pour récupérer la liste complète des textes de référence et les articles fondamentaux mis à disposition par Dr. Lutumba (textes d'Éric Hamraoui sur la philosophie du travail, Yves Schwartz sur l'Usage de soi, et extraits de Marc-Éric Bobillier-Chaumon).",
        echeance: "Avant la prochaine séance",
        modaliteRendu: "Lecture autonome sélective pour ne pas être submergé.",
        recommandationsProf: "Lire prioritairement l'article sur l'Usage de soi d'Yves Schwartz et les chapitres introductifs de Dominique Méda.",
      },
      {
        titre: "Travail Dirigé (TD) à venir sur la Conception du Travail",
        typeTravail: "exercice_ad",
        consigneExacte:
          "Préparer les études de situations de travail qui seront déposées sur Moodle : confronter une activité réelle observée à sa description de poste formelle et repérer les compromis opératoires développés par les opérateurs.",
        echeance: "Séance 6",
        modaliteRendu: "Activité pédagogique en ligne / forum d'échange.",
        recommandationsProf: "Mobiliser la grille des 6 facteurs de RPS du rapport Gollac (2011) pour structurer l'analyse.",
      },
      {
        titre: "Veille et curiosité : Figures contemporaines du travail sur les médias scientifiques",
        typeTravail: "recherche",
        consigneExacte:
          "Écouter les conférences en ligne et interventions de Dominique Lhuilier (sur la clinique psychosociale), Éric Hamraoui (sur la résistance du corps) et Marc-Éric Bobillier-Chaumon (sur la transformation digitale).",
        echeance: "Tout au long du semestre",
        modaliteRendu: "Enrichissement personnel de la culture de métier.",
        recommandationsProf: "Retenir que les cliniciens du Cnam sont des « PTT » (psychologues tout-terrain) qui ancrent toujours leurs concepts dans l'observation de terrain.",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "Problématisation & Débat d'Introduction : Qu'est-ce que le Travail ?",
        points: [
          {
            titre: "Débat maïeutique sur les frontières de l'emploi",
            contenu:
              "Dr. Lutumba interroge les représentations des auditeurs : le bénévolat associatif, le soin d'un proche dépendant (care/aidant familial), l'e-sport professionnel ou l'entraînement d'un athlète sont-ils du travail ? L'analyse clinique montre que toute activité productive engage une contrainte sur le temps libre et mobilise le corps vivant, la cognition et la subjectivité, qu'elle soit monétarisée ou non.",
          },
          {
            titre: "Utilité sociale et place statutaire",
            contenu:
              "Le travail est ce qui confère une place et une visibilité dans la société. Il engage la reconnaissance d'une contribution à l'œuvre collective et structure la temporalité quotidienne du sujet.",
          },
          {
            titre: "La promesse psychosociale du travail en crise",
            contenu:
              "Concept central défendu par Dr. Lutumba : le travail est porteur d'une promesse psychosociale où le sujet vient nourrir son essence humaine, éprouver son pouvoir d'agir et créer du beau. Or, les organisations contemporaines peinent de plus en plus à honorer cette promesse, engendrant une désillusion massive.",
          },
        ],
      },
      {
        numero: "2",
        titre: "Histoire & Polysémie du Concept : Du Châtiment Antique à l'OST",
        points: [
          {
            titre: "Racines étymologiques : Tripalium, Ponos et Ergon",
            contenu:
              "Le terme 'travail' dérive du latin tripalium (instrument de torture à trois pieux). Les Grecs distinguaient ponos (la peine pénible et servile) et ergon (l'œuvre d'art et de création). De la malédiction biblique ('tu mangeras ton pain à la sueur de ton front') à la Révolution industrielle, le travail subit un basculement historique pour devenir le vecteur de la dignité et de l'émancipation citoyenne.",
          },
          {
            titre: "L'OST de Taylor (1911) et l'école des relations humaines de Mayo (1933)",
            contenu:
              "Taylor sépare radicalement la conception de l'exécution en parcellisant les tâches. L'ouvrier devient l'exécutant d'un geste chronométré. Mayo démontre ensuite que la productivité dépend au premier chef des facteurs affectifs, du sentiment d'appartenance et de l'ambiance relationnelle de groupe.",
            auteurs: ["Frederick W. Taylor", "Elton Mayo"],
          },
          {
            titre: "Georges Friedmann (1956) et Ombredane & Faverge (1955)",
            contenu:
              "Friedmann publie 'Le Travail en miettes' et fonde la sociologie du travail française en analysant la dépossession ouvrière. En 1955, Ombredane et Faverge publient 'L'Analyse du travail' : ils sortent le psychologue du laboratoire expérimental pour observer l'opérateur sur le terrain, créant l'ergonomie francophone fondée sur la dialectique prescrit/réel.",
            auteurs: ["Georges Friedmann", "André Ombredane", "Jean-Marie Faverge"],
          },
        ],
      },
      {
        numero: "3",
        titre: "Regards Croisés : Le Travail en Économie et en Sociologie",
        points: [
          {
            titre: "L'acception économique : valeur-travail, force de travail et capital humain",
            contenu:
              "Smith fonde la valeur marchande sur le travail. Marx démontre que le salarié vend sa force de travail contre un salaire, générant une plus-value confisquée par le capital. Becker théorise le capital humain comme portefeuille individuel de compétences à valoriser.",
            auteurs: ["Adam Smith", "Karl Marx", "Gary Becker"],
          },
          {
            titre: "Règle déontologique du clinicien : 'On ne vend pas sa personne'",
            contenu:
              "Dr. Lutumba formule un principe fondamental pour la pratique du bilan et de l'accompagnement : face à un salarié qui dit 'je ne sais pas me vendre', le psychologue rectifie fermement : la personne est inestimable ; ce qu'on monnaie sur le marché, c'est sa force de travail, ses compétences et ses services.",
          },
          {
            titre: "L'acception sociologique : Durkheim, Weber et Sainsaulieu",
            contenu:
              "Durkheim montre que la division du travail produit de la solidarité organique, mais bascule dans l'anomie destructrice par défaut de régulation (ex: l'EHPAD débordé par la dépendance des résidents). Weber conçoit le travail comme vocation (Beruf) et ascétisme rationnel. Sainsaulieu explore la fabrique des identités et des contre-pouvoirs dans l'entreprise.",
            auteurs: ["Émile Durkheim", "Max Weber", "Renaud Sainsaulieu"],
          },
        ],
      },
      {
        numero: "4",
        titre: "Où se situe la Psychologie du Travail ? L'Activité & les Modèles de RPS",
        points: [
          {
            titre: "Le cœur épistémologique : Comprendre le travail pour le transformer",
            contenu:
              "L'ergonomie et la psychologie du travail refusent de réduire le travail à des métriques quantitatives abstraites. L'activité réelle déborde toujours la tâche prescrite pour compenser l'incomplétude des procédures et la variabilité du vivant.",
          },
          {
            titre: "Modèles de stress : Hackman & Oldham, Karasek et Siegrist",
            contenu:
              "Hackman & Oldham (1976) modélisent la motivation intrinsèque (variété, identité, sens, autonomie, feedback). Karasek (1979) théorise la tension entre forte demande psychologique et faible latitude décisionnelle. Siegrist (1996) met en évidence le déséquilibre pathogène entre efforts élevés et faibles récompenses.",
            auteurs: ["J. Richard Hackman", "Robert Karasek", "Johannes Siegrist"],
          },
          {
            titre: "Les 6 facteurs de Risques Psychosociaux du Rapport Gollac (2011)",
            contenu:
              "Le rapport officiel du collège d'expertise présidé par Michel Gollac fixe la nomenclature de référence des 6 facteurs d'exposition : 1) Intensité et temps de travail, 2) Exigences émotionnelles (travail émotionnel), 3) Manque d'autonomie, 4) Mauvaise qualité des rapports sociaux, 5) Conflits de valeurs (qualité empêchée), 6) Insécurité de la situation de travail.",
            auteurs: ["Michel Gollac", "Pascale Molinier"],
          },
        ],
      },
      {
        numero: "5",
        titre: "Les Cliniques du Travail au Cnam : Dejours, Clot, Hamraoui, Schwartz & Lhuilier",
        points: [
          {
            titre: "Psychodynamique du Travail (Christophe Dejours) : Sujet, Réel et Reconnaissance",
            contenu:
              "Le travail est ce que le sujet doit mobiliser pour faire face à ce que le prescrit n'a pas prévu. Le réel se fait connaître par l'échec et la résistance du monde. Le sujet mobilise une intelligence pratique rusée (métis) et un savoir incorporé dans les sens du corps. La souffrance inévitable est sublimée par la reconnaissance : jugement d'utilité (hiérarchie/usagers) et jugement de beauté (pairs).",
            auteurs: ["Christophe Dejours"],
          },
          {
            titre: "Clinique de l'Activité (Yves Clot) : Réel de l'Activité, Genre et Style",
            contenu:
              "L'activité déborde l'action réalisée : le réel de l'activité englobe les activités empêchées, suspendues ou contrariées. Distinction fondamentale : le Genre est la mémoire impersonnelle et collective du métier ; le Style est la signature singulière par laquelle l'opérateur s'approprie ce genre. La souffrance naît de la qualité empêchée (travail ni fait ni à faire).",
            auteurs: ["Yves Clot"],
          },
          {
            titre: "Avertissement théorique formel : Dejours et Clot sont des 'frères ennemis'",
            contenu:
              "Dr. Lutumba met en garde contre tout amalgame à l'examen : Dejours est centré sur le sujet, la pulsion et l'économie psychique individuelle face aux défenses ; Clot est centré sur l'activité, le geste de métier et la dynamique collective historico-culturelle.",
          },
          {
            titre: "Philosophie Sociale (Hamraoui), Ergologie (Schwartz) et Clinique Psychosociale (Lhuilier)",
            contenu:
              "Éric Hamraoui ancre la philosophie sociale dans le corps vécu et les figures de la résistance au travail. Yves Schwartz théorise l'ergologie comme débat de normes permanent et usage de soi face aux normes antécédentes. Dominique Lhuilier pense l'unité et la diversité des cliniques et le maintien dans l'emploi.",
            auteurs: ["Éric Hamraoui", "Yves Schwartz", "Dominique Lhuilier"],
          },
        ],
      },
      {
        numero: "6",
        titre: "Le Travail Aujourd'hui : Numérique, Sens, Valeur & Soutenabilité",
        points: [
          {
            titre: "Clinique des Usages et Technologies Émergentes (Marc-Éric Bobillier-Chaumon)",
            contenu:
              "Prof. Bobillier-Chaumon (deux L à Bobillier !) démontre que la technologie ne fait pas qu'automatiser, elle reconfigure l'activité, les compétences et les collectifs. Règle d'or de Dr. Lutumba : 'former ne suffit pas, on n'évangélise pas une technologie'. Il faut dépasser l'acceptabilité a priori (modèle TAM) pour analyser l'acceptation située en situation réelle face aux paradoxes technologiques.",
            auteurs: ["Marc-Éric Bobillier-Chaumon"],
          },
          {
            titre: "Critique de la Valeur Travail et Activités de Care (Dominique Méda)",
            contenu:
              "Méda critique l'hégémonie du travail marchand comme seul vecteur de statut et de dignité sociale. Elle plaide pour la reconnaissance des activités non marchandes de care (soin des proches, bénévolat, citoyenneté), critique la métrique aveugle du PIB et montre l'aspiration massive des salariés européens à un travail utile, autonome et reconnu.",
            auteurs: ["Dominique Méda"],
          },
          {
            titre: "Métamorphoses du Travail et Reconquête du Temps (André Gorz)",
            contenu:
              "Gorz dénonce la colonisation de l'existence par la rationalité productiviste. Il appelle à repenser l'articulation travail/temps libre/autonomie et à affranchir l'homme du stakhanovisme contemporain par la réduction du temps de travail et le revenu garanti.",
            auteurs: ["André Gorz"],
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Confrontation des Approches Disciplinaires du Travail",
        description: "Panorama synthétique des conceptions du travail à travers les disciplines des sciences de l'homme et de la gestion",
        colonnes: ["Courant Disciplinaire", "Auteurs Majeurs", "Statut Accordé au Travail", "Angle Mort selon le Cnam"],
        lignes: [
          {
            axe: "Économie Classique & Néolibérale",
            valeurs: [
              "Smith, Ricardo, Becker",
              "Facteur de production marchand, source de valeur marchande, capital humain individuel.",
              "Invisibilisation totale du travail réel, du corps vécu et des régulations subjectives.",
            ],
          },
          {
            axe: "Critique Marxiste",
            valeurs: [
              "Karl Marx",
              "Marchandise aliénée (force de travail), extraction de la plus-value dans les rapports de production.",
              "Centré sur l'aliénation macro-structurelle sans explorer l'ingéniosité concrète de l'opérateur.",
            ],
          },
          {
            axe: "Sociologie du Travail",
            valeurs: [
              "Durkheim, Weber, Sainsaulieu",
              "Vecteur de solidarité organique, vocation éthique (Beruf), creuset des identités et du pouvoir.",
              "N'analyse pas la micro-régulation ergonomique du geste ni les conflits de l'économie pulsionnelle.",
            ],
          },
          {
            axe: "Ergonomie de l'Activité",
            valeurs: [
              "Ombredane, Faverge, Wisner",
              "Activité réelle régulatrice comblant en situation l'incomplétude constitutive du prescrit.",
              "Historiquement centrée sur l'efficacité de la tâche sans intégrer l'économie défensive du sujet.",
            ],
          },
          {
            axe: "Cliniques du Travail Cnam",
            valeurs: [
              "Dejours, Clot, Bobillier-Chaumon",
              "Épreuve du réel, santé mentale, développement du pouvoir d'agir, usage de soi face aux technologies.",
              "Démarche inductive qualitative exigeant une immersion longue sur le terrain réel ('psychologues tout-terrain').",
            ],
          },
        ],
      },
      {
        titre: "Duel Théorique au Sommet du Cnam : Dejours vs Clot (Les Frères Ennemis)",
        description: "Tableau comparatif fondamental pour l'examen distinguant la psychodynamique et la clinique de l'activité",
        colonnes: ["Critère Théorique", "Psychodynamique du Travail (Christophe Dejours)", "Clinique de l'Activité (Yves Clot)"],
        lignes: [
          {
            axe: "Filiation Épistémologique",
            valeurs: [
              "Psychanalyse freudienne, psychopathologie du travail, théorie pulsionnelle et sublimation.",
              "Psychologie historico-culturelle soviétique (Lev Vygotski, Mikhaïl Bakhtine, Alexis Leontiev).",
            ],
          },
          {
            axe: "Focale Première",
            valeurs: [
              "Le Sujet individuel : comment l'individu maintient son équilibre face à une organisation pathogène.",
              "L'Activité et le Métier : comment l'activité se développe ou se trouve contrariée par le milieu.",
            ],
          },
          {
            axe: "Conception du Réel",
            valeurs: [
              "Ce qui résiste aux savoirs et au prescrit, éprouvé intimement par l'échec et la résistance du monde.",
              "Le Réel de l'Activité : ce qui est empêché, contrarié, suspendu, ce qu'on fait pour ne pas faire.",
            ],
          },
          {
            axe: "Racine de la Souffrance",
            valeurs: [
              "Frottement inévitable avec le réel et défaut de reconnaissance sociale du don de soi.",
              "Qualité empêchée : interdiction managériale de réaliser un travail soigné selon les règles de l'art.",
            ],
          },
          {
            axe: "Ressource de Santé",
            valeurs: [
              "Sublimation de la pulsion et validation par les deux jugements de reconnaissance (utilité et beauté).",
              "Élargissement du pouvoir d'agir sur soi, sur autrui et sur le milieu ; vitalité du genre de métier.",
            ],
          },
          {
            axe: "Fonction du Collectif",
            valeurs: [
              "Rempart défensif contre la peur (stratégies collectives) et garant du jugement de beauté entre pairs.",
              "Patrimoine vivant du genre professionnel garantissant les critères partagés du travail bien fait.",
            ],
          },
          {
            axe: "Dispositif Méthodologique",
            valeurs: [
              "Espace de parole clinique fondé sur la délibération et la libre association collective.",
              "Autoconfrontations simples (face à sa propre vidéo) et croisées (confrontation de deux pairs).",
            ],
          },
        ],
      },
      {
        titre: "L'Artefact Technique au Travail : Ingénierie TAM vs Clinique des Usages",
        description: "Confrontation du modèle d'adoption technologique classique et de la clinique des usages",
        colonnes: ["Axe d'Analyse", "Modèle Ergonomique TAM (Technology Acceptance Model)", "Clinique des Usages (M.-É. Bobillier-Chaumon)"],
        lignes: [
          {
            axe: "Statut de la Technologie",
            valeurs: [
              "Outil neutre venant automatiser une suite logique de tâches prescrites préexistantes.",
              "Artefact sociotechnique puissant qui reconfigure l'activité, les compétences et les collectifs.",
            ],
          },
          {
            axe: "Concept Clé d'Adoption",
            valeurs: [
              "Acceptabilité a priori : utilité perçue et facilité d'utilisation mesurées avant déploiement.",
              "Acceptation située : processus continu et dynamique d'appropriation en contexte de travail réel.",
            ],
          },
          {
            axe: "Postulat sur l'Opérateur",
            valeurs: [
              "Utilisateur passif : il suffit de former techniquement ('évangéliser l'outil') pour qu'il adhère.",
              "Sujet situé et critique : développe des compromis opératoires, des détours d'usage ou des résistances.",
            ],
          },
          {
            axe: "Prise en Compte des Paradoxes",
            valeurs: [
              "Ignorés : les réticences sont disqualifiées en simple 'résistance au changement' individuelle.",
              "Centrale : analyse les paradoxes (gain formel de temps vs dépossession du métier et technostress).",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Ne jamais amalgamer la clinique de l'activité (Clot) et la psychodynamique du travail (Dejours)",
        erreurCourante: "Traiter Dejours et Clot comme des auteurs interchangeables partageant la même théorie de la souffrance.",
        rectificationAttendue:
          "Exposer rigoureusement l'irréductibilité de leurs paradigmes : Dejours s'ancre dans la psychanalyse et la théorie pulsionnelle du sujet individuel (réel, défenses, sublimation, reconnaissance), tandis que Clot s'ancre dans la psychologie historico-culturelle vygotskienne centrée sur l'activité de métier instrumentée, le genre professionnel et le pouvoir d'agir.",
        contexte: "Section 5 — Les Cliniques du travail au Cnam",
      },
      {
        titre: "Bannir l'illusion gestionnaire selon laquelle 'former suffit' pour faire adopter un outil digital ou une IA",
        erreurCourante: "Affirmer qu'un plan de formation logicielle et de conduite du changement garantit l'acceptation d'un outil.",
        rectificationAttendue:
          "Mobiliser la formule de Dr. Lutumba (« former ne suffit pas, on n'évangélise pas une technologie ») et démontrer avec Bobillier-Chaumon que l'outil doit être évalué selon son 'acceptation située' dans l'activité réelle, en mesurant ses effets sur les compétences, les collectifs et les paradoxes de dépossession du métier.",
        contexte: "Section 6 — Transformations digitales",
      },
      {
        titre: "Distinguer rigoureusement Genre professionnel et Style professionnel chez Yves Clot",
        erreurCourante: "Employer indifféremment genre et style pour désigner la manière dont une personne travaille.",
        rectificationAttendue:
          "Le Genre est le patrimoine collectif, impersonnel et transpersonnel du métier (les règles tacites partagées par les pairs qui garantissent le travail bien fait). Le Style est la réappropriation singulière, créative et subjective par laquelle chaque travailleur investit ce genre.",
        contexte: "Section 5 — Clinique de l'activité",
      },
      {
        titre: "Ne pas réduire la reconnaissance au travail chez Christophe Dejours à une gratification managériale",
        erreurCourante: "Assimiler la reconnaissance en psychodynamique aux compliments de la direction ou à une prime au mérite.",
        rectificationAttendue:
          "Démontrer la structure bipartite indispensable de la reconnaissance : 1) Le jugement d'utilité (économique, technique, managérial) porté par la hiérarchie et les usagers, et 2) Le jugement de beauté (conformité aux règles de l'art et élégance de l'œuvre) porté exclusivement par la communauté des pairs de métier.",
        contexte: "Section 5 — Psychodynamique du travail",
      },
    ],
    transcriptionIntegraleVerbatim: `[1. Cadrage Pédagogique, Ressources Moodle & Débat Introductif sur le Travail]
[00:03:07] DR. PRISCA LUTUMBA : « Vous aurez tout de disponible demain midi sur Moodle, y compris le cours de ce soir. Je vous mettrai comme promis la liste des textes de référence et quelques textes fondamentaux en ressource. Parce que je me suis rendu compte que quand je mettais tous les textes, certains étaient tentés de tout lire et se retrouvaient submergés. Donc je préfère donner la liste sélective. »
[00:05:09] DR. PRISCA LUTUMBA : « Pourquoi est-ce important de définir la question du travail ? Si je vous pose la question suivante : le bénévolat, le soin d'un proche dépendant, un jeu vidéo professionnel ou l'entraînement d'un sportif de haut niveau : est-ce que c'est du travail d'après vous ? »
[00:06:45] AUDITEUR (OLIVIER) : « J'ai envie de dire que c'est à la fois quelque chose qui est lié à une notion de contrainte sur son temps libre, et une question de place que ça nous donne dans la société, un rapport entre l'utilité et la contrainte. »
[00:07:09] DR. PRISCA LUTUMBA : « Charlotte nous dit que ça engage physiquement et psychiquement la personne et que ça participe à créer l'identité du travailleur. On voit bien que toute activité qui produit quelque chose engage le corps et la psyché. C'est ce que j'appelle la promesse psychosociale du travail : à quel moment le travail vient nourrir l'essence de l'homme, par son pouvoir d'agir et par la beauté de ce qu'il peut créer de manière individuelle et collective. »

[2. Histoire & Polysémie : Du Tripalium aux Sciences du Travail]
[00:16:25] DR. PRISCA LUTUMBA : « Par rapport à l'OST et à la naissance des sciences du travail, on a Taylor en 1911 qui sépare radicalement la conception de l'exécution. Il découpe la tâche, chacun fait un petit bout sans voir la finalité globale, et on devient exécutant d'une tâche prescrite. Puis Mayo en 1933 introduit la dimension affective et sociale du groupe, prémices des collectifs de travail. »
[00:17:51] DR. PRISCA LUTUMBA : « Georges Friedmann en 1956 va analyser le travail en miettes et fonder la sociologie du travail française en montrant l'effet délétère de cet émiettement sur les ouvriers. Enfin en 1955, Ombredane et Faverge publient 'L'analyse du travail' : ils sortent du laboratoire pour aller analyser l'opérateur en situation réelle, posant l'acte de naissance de notre cousine, l'ergonomie de l'activité. »

[3. Le Travail en Économie et en Sociologie : Force de Travail & Dignité]
[00:22:20] DR. PRISCA LUTUMBA : « Quand quelqu'un me dit en bilan de compétences ou en reconversion 'je ne sais pas me vendre', je réponds : non, heureusement ! Chacun est inestimable. Ce qu'on monnaie sur le marché, c'est sa force de travail, sa plus-value en compétences, son savoir-faire et ses services. Ce n'est jamais sa propre personne que l'on vend. »
[00:25:32] DR. PRISCA LUTUMBA : « Pour Durkheim, la division du travail social produit de la solidarité organique, mais elle peut aussi engendrer de l'anomie si elle n'est pas régulée. C'est l'exemple typique de l'EHPAD que je vous donnais samedi : au fil des ans, le GIR des résidents s'alourdit, la charge augmente sans ajustement des effectifs, l'entraide disparaît et le collectif se dégrade faute de régulation. »
[00:27:08] DR. PRISCA LUTUMBA : « Pour Max Weber, le travail est considéré comme une vocation (Beruf), source de rationalisation de toute la conduite de vie. Et avec Renaud Sainsaulieu, le travail devient le creuset de la construction des identités culturelles et des rapports de pouvoir. »

[4. L'Analyse de l'Activité & les Modèles de Risques Psychosociaux (RPS)]
[00:38:42] DR. PRISCA LUTUMBA : « L'objectif que nous partageons en ergonomie et en psychologie du travail, c'est comprendre le travail pour le transformer, c'est-à-dire comprendre l'activité réelle face à un prescrit qui comporte toujours de l'imprévu et des aléas. »
[00:40:34] DR. PRISCA LUTUMBA : « En PTO, Karasek en 1979 regarde la tension entre forte demande psychologique et faible latitude décisionnelle. Siegrist en 1996 y adjoint le déséquilibre entre l'effort consenti et la récompense obtenue. Et en 2011, le collège d'expertise présidé par Michel Gollac fixe les 6 grands facteurs de risques psychosociaux : intensité du travail, exigences émotionnelles, autonomie, rapports sociaux, conflits de valeurs et insécurité de la situation. »

[5. Psychodynamique de Dejours vs Clinique de l'Activité de Clot : Les Frères Ennemis]
[00:47:00] DR. PRISCA LUTUMBA : « Pour Christophe Dejours, le travail est ce que le sujet doit mobiliser de sa propre personne pour combler l'écart laissé par ce que l'organisation prescrite ne prévoit pas. Le réel du travail se fait connaître au sujet par les échecs et la résistance du monde. C'est là que le sujet mobilise son intelligence pratique (métis), son savoir incorporé dans la chair et ses sens, pour sublimer la souffrance par la reconnaissance d'utilité et de beauté. »
[00:59:45] DR. PRISCA LUTUMBA : « Chez Yves Clot, l'activité est un drame : elle déborde l'action réalisée car le réel de l'activité englobe aussi ce qu'on ne fait pas, ce qu'on a voulu faire sans y parvenir ou ce qu'on fait pour ne pas faire. Clot distingue le Genre (la mémoire impersonnelle du métier partagée par les pairs) et le Style (la manière singulière et créative dont chacun retravaille ce genre). La souffrance naît de la qualité empêchée, quand on ne peut plus faire un travail de qualité. »
[01:04:28] DR. PRISCA LUTUMBA : « Lydia demande dans le chat : y a-t-il un lien entre les défenses de Dejours et le travail empêché de Clot ? Surtout pas de lien, Lydia ! Ce sont des frères ennemis théoriques ! Dejours est centré sur le sujet, la pulsion et l'équilibre individuel face aux défenses ; Clot est centré sur l'activité, le geste de métier et le collectif. »
[01:13:26] DR. PRISCA LUTUMBA : « N'oublions pas l'ergologie d'Yves Schwartz à Aix : pour lui, toute activité humaine est un débat de normes et un usage de soi, une rencontre permanente entre des normes antécédentes et des renormalisations singulières en situation. »

[6. Les Transformations Digitales & la Critique Sociétale du Travail]
[01:15:50] DR. PRISCA LUTUMBA : « Marc-Éric Bobillier-Chaumon : deux L à Bobillier ! C'est un ange, laissez-le s'envoler ! Lui analyse l'activité située face aux technologies. Les technologies ne se contentent pas d'automatiser : elles reconfigurent l'activité, les compétences et les collectifs. Former ne suffit pas, on n'évangélise pas une technologie ! Il faut dépasser l'acceptabilité technique a priori pour analyser l'acceptation située en situation réelle. »
[01:23:08] DR. PRISCA LUTUMBA : « Dominique Méda interroge la place démesurée de la valeur travail comme seul vecteur d'identité et de dignité dans les sociétés modernes. Elle plaide pour la valorisation des activités de care (soin des proches, citoyenneté), critique la métrique aveugle du PIB et montre, à partir des enquêtes européennes, que les salariés attendent de l'autonomie, de la reconnaissance et un travail utile qu'on leur refuse trop souvent. »`,
    bibliographieCitee: [
      {
        titre: "L'Analyse du travail : facteur d'économie humaine et de productivité",
        auteur: "André Ombredane & Jean-Marie Faverge",
        annee: "1955 (PUF)",
        remarque: "Texte fondateur de l'ergonomie francophone : passage de l'analyse en laboratoire à l'étude de l'opérateur en situation réelle.",
      },
      {
        titre: "Le Travail en miettes : travail et spécialisation ouvrière",
        auteur: "Georges Friedmann",
        annee: "1956 (Gallimard)",
        remarque: "Acte de fondation de la sociologie du travail française : critique des effets de l'OST et du travail parcellisé.",
      },
      {
        titre: "Travail, usure mentale : essai de psychopathologie du travail",
        auteur: "Christophe Dejours",
        annee: "1980 / 1993 (Bayard)",
        remarque: "Ouvrage princeps de la psychodynamique du travail : souffrance, défenses collectives, épreuve du réel et reconnaissance.",
      },
      {
        titre: "Le Travail sans l'homme ? Pour une psychologie des milieux de travail et de vie",
        auteur: "Yves Clot",
        annee: "1995 / 2008 (La Découverte)",
        remarque: "Clinique de l'activité, distinction tâche/activité, genre et style professionnels, réel de l'activité et pouvoir d'agir.",
      },
      {
        titre: "Le Travail, une valeur en voie de disparition ?",
        auteur: "Dominique Méda",
        annee: "1995 / 2010 (Aubier / Flammarion)",
        remarque: "Déconstruction sociologique de l'hégémonie de la valeur travail, valorisation du care et critique des indicateurs de richesse (PIB).",
      },
      {
        titre: "Le concept d'usage de soi et le débat de normes en ergologie",
        auteur: "Yves Schwartz",
        annee: "2000 (Octarès)",
        remarque: "Théorisation de l'activité productive comme négociation vitale entre normes antécédentes et renormalisations singulières.",
      },
      {
        titre: "Mesurer les facteurs psychosociaux de risque au travail pour les maîtriser (Rapport officiel)",
        auteur: "Michel Gollac & Collège d'expertise",
        annee: "2011 (Ministère du Travail)",
        remarque: "Rapport national de référence définissant les 6 grands facteurs de risques psychosociaux (RPS).",
      },
      {
        titre: "Les mutations du travail et des organisations : impacts sur les activités et les acteurs",
        auteur: "Marc-Éric Bobillier-Chaumon",
        annee: "2021 (Dunod)",
        remarque: "Clinique des usages appliquée aux technologies numériques, à l'acceptation située et aux transformations contemporaines de l'activité.",
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PST123 — SÉANCE 6 : IDENTITÉ SOCIALE & PROFESSIONNELLE (SAINSAULIEU, DUBAR, LE BIANIC, HONNETH)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pst123-s6",
    moduleKey: "pst123",
    moduleLabel: "PST123",
    numeroSeance: 6,
    titre: "Séance 6 — Identité Sociale & Professionnelle (Sainsaulieu & Dubar), Reconnaissance (Honneth) & Histoire du Métier de Psychologue au Cnam (Le Bianic)",
    sousTitre: "Narration de soi par soi et par autrui (catégories légitimes), lutte contre l'invisibilité sociale (Honneth), sociologie historique des psychologues (Le Bianic) et fresque des modes de reconnaissance au travail",
    enseignant: "M. Éric LUCY (Psychologue clinicien, docteur en sciences de l'éducation, enseignant Cnam)",
    dateSeance: "14 novembre 2026",
    format: "presentiel",
    dureeEnregistrement: "2 h 43 min 41 s (Cours magistral en regroupement présentiel)",
    resumeExecutif: [
      "L'identité comme narration langagière et consubstantialité Social / Professionnel (Claude Dubar) : Dans la clinique du travail, les plaintes ('je ne suis pas reconnu', 'mon travail n'a plus de sens') relèvent d'enjeux identitaires. L'identité est un discours qui articule une narration de soi par soi (identité pour soi / processus biographique) et une narration de soi par les autres (identité pour autrui / processus relationnel inscrit dans des catégories légitimes instituées par les organisations). Pour Dubar, identité sociale et identité professionnelle sont consubstantielles (illustré par le cas clinique de Paul, l'ingénieur en dépression analysé par Lise Lemay).",
      "Le travail au sens durkheimien (De la division du travail social) : Même sans emploi salarié (ex. parent au foyer), tout agent social construit son identité par rapport au travail. Le passage historique de la solidarité mécanique (socialisation primaire familiale où l'on faisait 'comme papa et maman') à la solidarité organique projette l'individu dans une individualisation complexe au sein des organisations.",
      "De la raison communicationnelle (Jürgen Habermas) à la lutte pour la reconnaissance (Axel Honneth) : Au sein de l'École de Francfort, Axel Honneth objecte à son maître Habermas que les humains ne cherchent pas d'abord la raison pure dans le langage, mais la reconnaissance sociale (en s'appuyant sur Kant et Hegel) et la lutte contre l'invisibilité sociale, à travers 3 espaces d'existence : sociale, juridique (état civil, papiers, droits) et affective/langagière. En écho à François Dubet, l'injonction contemporaine au sujet capacitant ('Sois toi-même ! Sors-t'en par toi-même !') fragilise les individus privés des grands collectifs protecteurs.",
      "Sociologie historique du métier de psychologue (Thomas Le Bianic) et identité du Cnam (1794) : Fondé à la Révolution en 1794 par l'Abbé Grégoire aux côtés de l'École Normale Supérieure (savoir fondamental d'élite) et de Polytechnique (savoir technique d'État), le Cnam incarne 'le savoir pour tous'. Le métier de psychologue (~5 000 psychologues du travail, soit 15 % de la profession) est un métier d'État récent aux contours flous, né de la psychotechnique (Binet & Simon 1905, Institut de Psychologie 1921, INOP et Chaire du Cnam 1928, Licence 1944-1950) sous la double tutelle de la philosophie et de la médecine.",
      "Histoire du travail à travers les chaires du Cnam (entre aliénation et émancipation chez Marx) : De la physiologie énergétique de Jules Amar (Le Moteur humain, 1914) et de la philosophie des objets techniques de Gilbert Simondon (qui transforment l'enveloppe du moi/non-moi de Winnicott jusqu'à l'IA générative aujourd'hui), à la théorie des aptitudes de Maurice Reuchlin, à l'ingénierie ergonomique, jusqu'à la Clinique du travail (Yves Clot) et à la toute première Chaire de Travail Social en France.",
      "Renaud Sainsaulieu (L'Identité au travail, 1977) et l'émiettement identitaire : Par sa sociologie immergée en usine, Sainsaulieu montre le passage de l'acteur de masse à l'acteur stratège (Crozier & Friedberg) et 'acteur ailleurs', le primat de la socialisation secondaire, et la diversification du rapport à l'autorité et au travail prescrit (modèles affinitaire, retrait, négociateur, fusionnel, promotionnel). Illustrations cliniques : la recherche ARS sur les chargés de prévention en addictologie, le performatif meurtrier de France Télécom ('par la porte ou par la fenêtre') et la normalisation du CDD.",
      "Fresque historique des modes de reconnaissance et couple Rupture / Continuité (Dubar, Wittorski, Loi VAE 2002) : De l'époque industrielle de la 'Maison' (scierie Ferbos à Mont-de-Marsan) et de l'œuvre des compagnons jusqu'à l'ère post-Covid (télétravail) et de l'Anthropocène où la sphère privée supplante l'entreprise, les compétences s'acquièrent aussi hors du travail (Richard Wittorski). Dans l'accompagnement des reconversions, 'la tabula rasa n'existe pas' : sous l'apparente rupture se loge toujours une continuité biographique.",
    ],
    modalitesExamen: {
      session1Date: "Janvier / Février 2027",
      session2Date: "Avril 2027",
      duree: "2 à 3 heures (selon cadrage national de Maria Yaneva & Christine Lagabrielle)",
      format: "Épreuve écrite — Questions théoriques et/ou analyse clinique d'une situation professionnelle au prisme des concepts d'identité",
      optionsAuChoix: [
        "Mobiliser la boîte à outils conceptuelle de Claude Dubar (identité pour soi / pour autrui, transactions biographique et relationnelle, rupture / continuité) et de Renaud Sainsaulieu (modèles identitaires et rapport à l'autorité/prescrit) pour analyser le discours d'un salarié en souffrance ou en transition.",
      ],
      recommandationsNotation:
        "M. Éric Lucy attend que l'auditeur sache repérer dans un discours clinique (comme celui de Paul l'ingénieur) l'articulation indissociable entre identité sociale et identité professionnelle, les catégories légitimes mobilisées, la nature du rapport à l'autorité/au prescrit et la dialectique rupture/continuité.",
    },
    consignesOralesProf: [
      {
        titre: "Lecture obligatoire pour la prochaine séance : Préface de la 5e édition de « La Socialisation » (Claude Dubar)",
        typeTravail: "lecture",
        consigneExacte:
          "Lire impérativement la Préface / Introduction de la 5e édition de l'ouvrage de Claude Dubar, 'La Socialisation : Construction des identités sociales et professionnelles' (ouvrage complet mis à disposition sur Moodle dans les Documents ressources).",
        echeance: "Avant le prochain cours de M. Éric Lucy (PST123)",
        modaliteRendu: "Travail en séance sur les chapitres de Dubar (comment il mobilise Piaget, Bourdieu, Mead, Hegel et Sainsaulieu).",
        recommandationsProf:
          "Ne pas télécharger tout le dossier ZIP d'un coup, mais lire en priorité la préface de Dubar et les 2-3 textes déposés sur le forum.",
      },
      {
        titre: "Étude clinique du texte de Lise Lemay : « Paul, l'ingénieur en dépression »",
        typeTravail: "exercice_ad",
        consigneExacte:
          "Lire les 4-5 pages du texte clinique de la psychologue du travail Lise Lemay (déposé dans le forum) consacré à Paul, ingénieur en dépression après son retour d'expatriation, et y repérer toutes les dimensions de la transaction identitaire (identité sociale vs professionnelle, perte de reconnaissance, passage du modèle fusionnel au décrochage).",
        echeance: "En cours de semestre",
        modaliteRendu: "Grille de lecture clinique personnelle pour l'examen.",
        recommandationsProf:
          "S'entraîner à écouter dans la plainte dépressive ce qui relève du désajustement entre identité pour soi et identité pour autrui.",
      },
      {
        titre: "Écoute philosophique & Ressources complémentaires (Wittorski, De Gaulejac, Le Bianic)",
        typeTravail: "recherche",
        consigneExacte:
          "Écouter l'émission de philosophie (France Culture) sur la notion d'identité et consulter selon les besoins dans les Documents ressources la conférence de Vincent de Gaulejac (en 3 parties), la vidéo de Richard Wittorski sur l'apprentissage hors travail et les articles de Thomas Le Bianic sur l'histoire des psychologues du travail.",
        echeance: "En cours de semestre",
        modaliteRendu: "Enrichissement de la culture générale et épistémologique en PST123.",
        recommandationsProf:
          "S'abonner et suivre les travaux du réseau Psy-Cnam pour construire son identité professionnelle de psychologue du travail du Cnam.",
      },
    ],
    syntheseSections: [
      {
        numero: "1",
        titre: "L'Identité comme Narration Langagière, Consubstantialité Social / Professionnel (Claude Dubar) & Durkheim",
        points: [
          {
            titre: "Narration de soi par soi (Identité pour soi) et par autrui (Catégories légitimes)",
            contenu:
              "Le langage structure le sujet : l'identité est toujours une narration discursive qui articule un processus biographique ('identité pour soi' : ce que je revendique être à travers mon histoire) et un processus relationnel ('identité pour autrui' : ce que les autres disent que je suis). En écho à l'opposition antique entre Héraclite (tout bouge constamment jusqu'à la mort) et Parménide (besoin d'une permanence de l'être), cette transaction permanente exige de s'adosser à des 'catégories légitimes' instituées par des organisations (famille, école, État, Cnam, fédération sportive : on ne peut se dire judoka ceinture noire sans être inscrit au dojo).",
            auteurs: ["Claude Dubar", "Héraclite & Parménide", "M. Éric Lucy"],
            conceptsCles: ["Narration de soi", "Identité pour soi vs pour autrui", "Catégories légitimes", "Transactions identitaires"],
          },
          {
            titre: "Consubstantialité de l'identité sociale et professionnelle & Cas de Paul l'ingénieur (Lise Lemay)",
            contenu:
              "Pour Claude Dubar, il n'y a pas d'identité professionnelle sans identité sociale, et inversement. Dans le texte clinique de Lise Lemay, Paul, ingénieur brillant, avait totalement absorbé son identité sociale dans son identité professionnelle d'expatrié (missions à l'étranger, prestige). De retour sur un poste sédentaire ordinaire, il perd ce miroir valorisant, se retrouve 'désœuvré' faute d'identité sociale propre hors travail et sombre dans la dépression.",
            auteurs: ["Claude Dubar", "Lise Lemay"],
            conceptsCles: ["Consubstantialité social/professionnel", "Surinvestissement fusionnel", "Crise identitaire"],
          },
          {
            titre: "La division du travail social (Émile Durkheim) : de la solidarité mécanique à la solidarité organique",
            contenu:
              "Même une personne non salariée (ex. mère ou père au foyer) construit son identité par rapport au travail au sens d'Émile Durkheim (De la division du travail social, 1893), car tout agent social produit quelque chose pour la collectivité. Là où la solidarité mécanique d'autrefois inscrivait l'individu dans la reproduction familiale de la socialisation primaire ('faire comme papa et maman'), la solidarité organique moderne divise et complexifie le travail au sein d'organisations qui obligent chacun à s'individualiser.",
            auteurs: ["Émile Durkheim (1893)"],
            conceptsCles: ["Division du travail social", "Solidarité mécanique vs organique", "Socialisation primaire vs secondaire"],
          },
        ],
      },
      {
        numero: "2",
        titre: "Philosophie Sociale de la Reconnaissance : De Jürgen Habermas à Axel Honneth & François Dubet",
        points: [
          {
            titre: "Jürgen Habermas et la raison communicationnelle transcendantale",
            contenu:
              "Héritier de l'École de Francfort (Horkheimer, Adorno), Jürgen Habermas demande ce qui rend les humains raisonnables et capables de bâtir une organisation éthique et politique : c'est le langage, qui nous est transcendantal (il est là avant notre naissance et après notre mort) et dont la force performative nous permet d'agir les uns sur les autres pour produire du sens commun.",
            auteurs: ["Jürgen Habermas"],
            conceptsCles: ["Agir communicationnel", "Transcendance du langage", "Raison pratique et politique"],
          },
          {
            titre: "Le retournement d'Axel Honneth : la lutte pour la reconnaissance et les 3 espaces d'existence",
            contenu:
              "Élève et successeur d'Habermas à Francfort, Axel Honneth (appuyé sur Kant et surtout Hegel) objecte que ce que cherchent les humains dans le langage n'est pas d'abord la raison pure, mais la reconnaissance sociale et la lutte contre l'invisibilité sociale. Une société qui fabrique du mépris social est une société malade. Honneth distingue 3 espaces d'existence constitutifs de l'identité : 1) L'existence sociale (place et utilité dans la société) ; 2) L'existence juridique (état civil, nom, papiers, droits garantis par l'État — d'où l'effondrement du sans-papiers ou demandeur d'asile) ; 3) L'existence affective et langagière (être parlé par autrui et parler aux autres).",
            auteurs: ["Axel Honneth", "G.W.F. Hegel", "Emmanuel Kant"],
            conceptsCles: ["Lutte pour la reconnaissance", "Mépris social & Invisibilité", "3 espaces d'existence (sociale, juridique, affective)"],
          },
          {
            titre: "François Dubet et le piège de l'injonction individualiste (« Sois toi-même ! »)",
            contenu:
              "Comme l'observe le sociologue François Dubet, les plaintes contemporaines portent moins sur les seules inégalités salariales que sur le sentiment de non-reconnaissance identitaire ('en tant que femme, minorité, migrant...'). Privés des grands collectifs protecteurs d'autrefois (classe ouvrière, syndicats), les individus — et particulièrement les adolescents — sont soumis à l'injonction écrasante et paradoxale d'être des 'sujets capacitants' ('Sois toi-même ! Sors-t'en par toi-même !').",
            auteurs: ["François Dubet", "M. Éric Lucy"],
            conceptsCles: ["Injonction à être soi-même", "Sujet capacitant", "Déni de reconnaissance"],
          },
        ],
      },
      {
        numero: "3",
        titre: "Sociologie Historique du Métier de Psychologue (Thomas Le Bianic), Triade de 1794 & Champ de Bourdieu",
        points: [
          {
            titre: "1794 : L'Abbé Grégoire, Condorcet et la triade ENS / Polytechnique / Cnam",
            contenu:
              "En 1794, la Révolution française institue trois établissements incarnant trois rapports au savoir : 1) L'École Normale Supérieure (savoir fondamental et sciences humaines pour former l'élite) ; 2) L'École Polytechnique (savoir technique et ingénierie appliquée) ; 3) Le Cnam (éducation populaire et 'savoir pour tous', ouvert aux ouvriers et à tous les citoyens). Devenir psychologue du travail au Cnam, c'est s'inscrire dans cette catégorie légitime historique.",
            auteurs: ["Abbé Grégoire (1794)", "Condorcet", "Thomas Le Bianic"],
            conceptsCles: ["Triade républicaine de 1794", "Éducation populaire", "Identité institutionnelle du Cnam"],
          },
          {
            titre: "Les travaux de Thomas Le Bianic : genèse étatique et contours flous du métier de psychologue",
            contenu:
              "Les recherches de Thomas Le Bianic au Cnam montrent que le métier de psychologue est un métier d'État récent aux contours flous (environ 5 000 psychologues du travail en France, soit 15 % des psychologues, répartis entre insertion/secteur social plus féminisé et GRH/cabinets privés mieux rémunérés). Jalons historiques : 1) 1905 : échelle métrique de Binet & Simon pour l'école (lois Ferry) et l'industrie (naissance des psychotechniciens) ; 2) 1921 : Institut de Psychologie ; 3) 1928 : création de l'INOP, de la Chaire d'orientation professionnelle au Cnam et des conseillers d'orientation (pénurie de main-d'œuvre après 1914-1918) ; 4) 1944-1947 : création de la Licence de psychologie (sous tutelle de la philosophie), rendue obligatoire en 1950 grâce aux syndicats ; 5) 1945-1946 : essor des psychologues cliniciens (Sécurité sociale, IME/MECS) et création des psychologues scolaires (recrutés parmi les enseignants) ; 6) Années 1980 : autonomisation des psychologues du travail comme praticiens de terrain.",
            auteurs: ["Thomas Le Bianic", "Alfred Binet & Théodore Simon"],
            conceptsCles: ["Psychotechnique", "INOP (1928)", "Métier d'État aux contours flous", "Praxis appliquée"],
          },
          {
            titre: "Investissement de valeurs, Capital et Habitus dans un Champ (Pierre Bourdieu)",
            contenu:
              "Construire une identité professionnelle suppose d'investir des valeurs qui 'font capital' dans un champ social donné (concept d'habitus, d'Aristote et Mauss à Weber et Bourdieu). Bourdieu illustre comment son accent béarnais et son parler fort faisaient capital dans le Béarn, mais devenaient illégitimes à l'École Normale Supérieure. De même, revendiquer l'amour de l'argent fait capital chez les traders, mais disqualifie immédiatement en salle des profs ou en clinique.",
            auteurs: ["Pierre Bourdieu", "Aristote", "Marcel Mauss", "Max Weber"],
            conceptsCles: ["Champ social", "Capital symbolique", "Habitus", "Investissement de valeurs"],
          },
        ],
      },
      {
        numero: "4",
        titre: "L'Histoire du Travail à travers les Chaires du Cnam : Entre Aliénation et Émancipation",
        points: [
          {
            titre: "La question sociale entre émancipation et aliénation (Marx) et Jules Amar (« Le Moteur humain », 1914)",
            contenu:
              "Le Cnam s'est construit autour du traitement scientifique de la 'question sociale' : comment faire en sorte que le travail soit un vecteur d'émancipation et de prospérité nationale sans devenir une aliénation qui tue ou rend malade (Marx) ? Premier jalon majeur au Cnam : le médecin Jules Amar (Le Moteur humain, 1914), qui étudie la physiologie du geste, la dépense énergétique et la fatigue ouvrière pour fonder une 'hygiène professionnelle' adaptant le taylorisme au facteur humain.",
            auteurs: ["Karl Marx", "Jules Amar (1914)"],
            conceptsCles: ["Aliénation vs Émancipation", "Le Moteur humain", "Fatigue ouvrière & Hygiène professionnelle"],
          },
          {
            titre: "Gilbert Simondon (Les objets techniques et l'IA) & l'évolution des chaires jusqu'à Yves Clot",
            contenu:
              "Dans les années 1950, le philosophe Gilbert Simondon montre que l'objet technique (et aujourd'hui l'intelligence artificielle générative) ne se limite pas à 'augmenter' l'homme : il transforme la subjectivité même et déplace la frontière du moi / non-moi (Winnicott). Au Cnam se succèdent ensuite la psychologie différentielle et la théorie des aptitudes avec Maurice Reuchlin, l'ingénierie ergonomique (années 1970-1990), la Clinique du travail (Yves Clot : transformer le travail par la parole) et, dès les années 1980, la seule Chaire universitaire de Travail Social en France.",
            auteurs: ["Gilbert Simondon (1958)", "Donald W. Winnicott", "Maurice Reuchlin", "Yves Clot"],
            conceptsCles: ["Objet technique & Enveloppe du moi", "Théorie des aptitudes", "Clinique du travail", "Chaire de Travail Social"],
          },
        ],
      },
      {
        numero: "5",
        titre: "Renaud Sainsaulieu (« L'Identité au travail », 1977) : Modèles Identitaires, Rapport au Prescrit & Émiettement",
        points: [
          {
            titre: "De l'acteur de masse à l'acteur stratège (Crozier & Friedberg) et le primat de la socialisation secondaire",
            contenu:
              "Après avoir rappelé la filiation commune de Vincent de Gaulejac, Yves Clot, Christophe Dejours et Claude Dubar, M. Éric Lucy expose l'enquête en immersion ouvrière de Renaud Sainsaulieu dans les années 1960-1970 (choc pétrolier, désindustrialisation). Sainsaulieu démontre : 1) Le passage de l'acteur de masse à l'acteur stratège (en lien avec Michel Crozier & Erhard Friedberg) et à l''acteur ailleurs' ; 2) Le rôle décisif de la socialisation secondaire par l'entreprise, qui ne se contente plus de reproduire la socialisation primaire familiale.",
            auteurs: ["Renaud Sainsaulieu (1977)", "Michel Crozier & Erhard Friedberg", "Vincent de Gaulejac"],
            conceptsCles: ["Sociologie immergée", "Acteur de masse vs Acteur stratège", "Socialisation secondaire"],
          },
          {
            titre: "Les modèles identitaires de rapport à l'autorité et l'étude ARS sur l'addictologie",
            contenu:
              "Sainsaulieu (repris par Dubar) identifie des modèles typiques de manières d'être au travail et face à l'autorité : 1) Modèle affinitaire (petit groupe de pairs complices) ; 2) Modèle du retrait (investissement alimentaire minimaliste : 'je fais ce qu'on me demande') ; 3) Modèle négociateur (débat permanent sur le métier ou syndical) ; 4) Modèle fusionnel / unanimiste ; 5) Modèle promotionnel. M. Lucy souligne que l'autorité aujourd'hui est avant tout incarnée par le travail prescrit, les fiches de poste ('40h par jour'), Qualiopi et les KPI — comme l'a montré sa recherche pour l'ARS sur les chargés de prévention en addictologie, victimes de troubles identitaires faute de catégorie légitime et face à un prescrit paradoxal.",
            auteurs: ["Renaud Sainsaulieu", "Claude Dubar", "Pierre Bourdieu", "M. Éric Lucy"],
            conceptsCles: ["Modèles affinitaire, retrait, négociateur, fusionnel", "Rapport au prescrit & KPI", "Déprofessionnalisation"],
          },
          {
            titre: "L'identité en miettes : France Télécom (« Par la porte ou par la fenêtre ») et la normalisation du CDD",
            contenu:
              "Le New Management et ses restructurations permanentes fabriquent un émiettement identitaire. À France Télécom, la phrase performative de Didier Lombard ('ils partiront par la porte ou par la fenêtre') a anéanti la narration identitaire d'agents engagés pour le service public et le bien commun. Parallèlement, l'institutionnalisation du CDD (autrefois simple étape transitoire) comme 'identité normale au travail' a précarisé et culpabilisé les salariés les moins diplômés.",
            auteurs: ["Renaud Sainsaulieu", "M. Éric Lucy"],
            conceptsCles: ["Identité en miettes", "Violence performative (France Télécom)", "Normalisation du CDD"],
          },
        ],
      },
      {
        numero: "6",
        titre: "Fresque Historique de la Reconnaissance (De la « Maison » à l'Anthropocène) & Couple Rupture / Continuité",
        points: [
          {
            titre: "Les 5 âges de l'appartenance au travail : de la « Maison » à l'ère Post-Covid et de l'Anthropocène",
            contenu:
              "1) Époque industrielle classique : appartenance à la 'Maison' (ex. scierie Ferbos à Mont-de-Marsan garantissant statut et crédit bancaire) ou modèle de l'œuvre des compagnons ('règles de l'art'), avec le chef de chantier comme 'capitaine dans la tempête' ; 2) Années 1970 : grands groupes industriels et essor de la formation continue ; 3) Années 1980 ('années Tapie') : culte de l'entreprise performante, de l'innovateur et de la mobilité ; 4) Années 1990-2000 : normalisation des crises, des licenciements, de la sous-traitance et du CDD ; 5) Ère de l'Anthropocène et du Post-Covid (télétravail) : face au péril écologique et au recul du contrôle managérial présentiel, l'identité sociale et la sphère privée supplantent l'appartenance à l'entreprise.",
            auteurs: ["Renaud Sainsaulieu", "M. Éric Lucy"],
            conceptsCles: ["Appartenance Maison vs Entreprise performante", "Anthropocène & Télétravail", "Refuge dans la sphère privée"],
          },
          {
            titre: "Apprentissage hors travail (Richard Wittorski) et Rupture vs Continuité (Dubar, VAE 2002) : « La tabula rasa n'existe pas ! »",
            contenu:
              "Richard Wittorski démontre que les compétences et identités professionnelles s'apprennent aussi hors de l'entreprise (loisirs, vie sociale). En articulant Claude Dubar, René Kaës & Didier Anzieu (Crise, rupture et dépassement) et la loi de 2002 sur la VAE, M. Éric Lucy livre un repère clinique décisif pour accompagner les reconversions : 'La tabula rasa (table rase) n'existe pas, c'est un fantôme !' Un commercial qui se reconvertit dans le travail social ne repart pas d'une feuille blanche : il prolonge en continuité son goût de la rencontre et du dialogue avec autrui.",
            auteurs: ["Claude Dubar", "Richard Wittorski", "René Kaës & Didier Anzieu"],
            conceptsCles: ["Apprentissage hors travail (Wittorski)", "Couple Rupture / Continuité", "Loi VAE (2002)", "Mythe de la tabula rasa"],
          },
        ],
      },
    ],
    tableauxComparatifs: [
      {
        titre: "Les Deux Processus de la Transaction Identitaire selon Claude Dubar",
        description: "Architecture conceptuelle présentée par M. Éric Lucy pour analyser le discours des sujets en clinique du travail.",
        colonnes: ["Dimension", "Processus Biographique (Identité pour Soi)", "Processus Relationnel (Identité pour Autrui)"],
        lignes: [
          {
            axe: "Forme de Narration",
            valeurs: [
              "Narration de soi par soi : « Voilà qui je dis être et qui je revendique être » à travers mon histoire de vie",
              "Narration de soi par les autres : « Voilà qui l'organisation ou l'institution dit que vous êtes »",
            ],
          },
          {
            axe: "Ancrage & Légitimité",
            valeurs: [
              "Trajectoire subjective (enfance, famille, école, expériences professionnelles et hors travail) traversée par le couple Rupture / Continuité",
              "Inscription dans des catégories légitimes officielles (diplôme d'État, titre de psychologue, statut, fiche de poste, Cnam)",
            ],
          },
          {
            axe: "Pathologie en cas de désajustement",
            valeurs: [
              "Sentiment de perte de sens, d'écartèlement ou d'imposture lorsque la trajectoire est niée (ex. mythe de la tabula rasa)",
              "Sentiment d'invisibilité sociale, de mépris (Honneth) ou de déprofessionnalisation (ex. Paul l'ingénieur, chargés de prévention ARS, France Télécom)",
            ],
          },
        ],
      },
      {
        titre: "Évolution Historique des Modes d'Accès à la Reconnaissance au Travail (Sainsaulieu & Lucy)",
        description: "Synthèse de la fresque historique commentée en fin de séance par M. Éric Lucy.",
        colonnes: ["Période", "Lieu d'Appartenance & Autorité", "Rapport à l'Œuvre, Trajectoire & Vulnérabilité"],
        lignes: [
          {
            axe: "1. Époque industrielle classique",
            valeurs: [
              "La « Maison » (ex. scierie Ferbos à Mont-de-Marsan) et le Patron ; le chef de chantier « capitaine dans la tempête »",
              "Modèle de l'œuvre des compagnons ('règles de l'art') ; solidarité syndicale de masse ; emploi à vie",
            ],
          },
          {
            axe: "2. Années 1970–1980",
            valeurs: [
              "Grands groupes industriels (1970) puis modèle de l'entreprise performante et de l'entrepreneur ('années Tapie', 1980)",
              "Essor de la formation continue et de la promotion interne, puis injonction à l'innovation, à la mobilité et à la rentabilité immédiate",
            ],
          },
          {
            axe: "3. Années 1990–2000",
            valeurs: [
              "Normalisation des crises, restructurations permanentes (New Management), éclatement en sous-traitants et autorité par les KPI/prescrit",
              "Institutionnalisation du CDD comme norme ; injonction culpabilisante au 'pouvoir d'agir' ; souffrance identitaire (France Télécom)",
            ],
          },
          {
            axe: "4. Ère Anthropocène & Post-Covid",
            valeurs: [
              "Crise écologique globale et télétravail post-Covid (affaiblissement du contrôle visuel managérial)",
              "L'identité sociale et la sphère privée supplantent l'appartenance à l'entreprise ; l'œuvre devient un principe identitaire alternatif",
            ],
          },
        ],
      },
    ],
    rectificationsExamen: [
      {
        titre: "Ne jamais dissocier identité professionnelle et identité sociale chez Claude Dubar",
        erreurCourante: "Traiter l'identité professionnelle en entreprise comme une sphère hermétique coupée de la vie sociale et familiale du sujet.",
        rectificationAttendue:
          "Rappeler la thèse cardinale de Claude Dubar : 'Il n'y a pas d'identité professionnelle sans identité sociale, et inversement' — elles sont consubstantielles (et les compétences s'acquièrent aussi hors du travail selon Richard Wittorski).",
        contexte: "Introduction à La Socialisation de Claude Dubar.",
      },
      {
        titre: "Ne pas confondre Jürgen Habermas (raison communicationnelle) et Axel Honneth (lutte pour la reconnaissance)",
        erreurCourante: "Attribuer la théorie des 3 sphères de la reconnaissance et du mépris social directement à Habermas.",
        rectificationAttendue:
          "Préciser que si Habermas fonde le lien social sur la raison communicationnelle transcendantale du langage, c'est son élève Axel Honneth qui opère un déplacement décisif (via Hegel) en montrant que les humains cherchent avant tout la reconnaissance sociale (sociale, juridique, affective) contre l'invisibilité.",
        contexte: "École de Francfort et philosophie sociale de la reconnaissance.",
      },
      {
        titre: "Ne pas réduire le rapport à l'autorité à la seule figure physique du chef (N+1)",
        erreurCourante: "Croire qu'en l'absence d'un contremaître autoritaire derrière soi, il n'y a plus de problème de rapport à l'autorité.",
        rectificationAttendue:
          "Souligner avec M. Éric Lucy que dans les organisations contemporaines, l'autorité s'incarne dans le travail prescrit, les fiches de poste démesurées, les certifications qualité (Qualiopi) et les objectifs chiffrés (KPI), dont les injonctions paradoxales provoquent des troubles identitaires.",
        contexte: "Analyse clinique du travail prescrit et modèles de Sainsaulieu.",
      },
      {
        titre: "Bannir le mythe de la « tabula rasa » (table rase) dans l'accompagnement des reconversions",
        erreurCourante: "Considérer qu'un salarié en reconversion professionnelle repart de zéro sur une 'feuille blanche'.",
        rectificationAttendue:
          "Mobiliser le couple Rupture / Continuité de Claude Dubar (et l'esprit de la loi VAE de 2002) : 'la tabula rasa n'existe pas'. Le travail clinique consiste à faire émerger la continuité biographique et les dispositions transversales sous la rupture apparente.",
        contexte: "Accompagnement des trajectoires professionnelles.",
      },
    ],
    transcriptionIntegraleVerbatim: `[1. L'Identité comme Narration Langagière, Consubstantialité (Dubar) & Division du Travail (Durkheim)]
[00:02:26] M. ÉRIC LUCY : « L'identité, en partant de Claude Dubar, c'est une narration de soi par soi — voilà ce que je revendique être — et une narration de soi par les autres qui viennent confirmer ou pas. L'identité a largement à voir avec le langage, parce que c'est toujours un discours. Et dans la clinique du travail, quand les gens parlent de leur souffrance, de leur dépression, de leur perte de sens, ce qu'il faut entendre, ce sont ces enjeux identitaires. »
[00:05:43] M. ÉRIC LUCY : « À la suite des travaux de Renaud Sainsaulieu, Claude Dubar élabore ce concept d'identité sociale et professionnelle comme deux enjeux consubstantiels : il n'y a pas d'identité sociale sans identité professionnelle, et inversement. C'est à la fois l'opposition entre Parménide et Héraclite : l'identité bouge constamment jusqu'à une demi-heure avant la mort, mais en même temps il faut une permanence et des catégories légitimes construites par des organisations — la famille, l'école, le travail, le Cnam — pour nous y inscrire. »
[00:10:51] M. ÉRIC LUCY : « Dans le texte de la psychologue du travail Lise Lemay que je vous ai mis sur le forum, Paul, ingénieur en dépression, avait totalement fusionné son identité sociale dans son identité professionnelle d'ingénieur expatrié. Quand il revient dans l'entreprise sur un autre poste, il n'a plus cet investissement total, il est complètement démuni et désœuvré du côté de son identité sociale. Et souvenez-vous qu'au sens d'Émile Durkheim (De la division du travail social), même quand on n'est pas salarié — mère ou père au foyer —, on construit son identité par rapport au travail, car tout agent social produit quelque chose dans le passage de la solidarité mécanique à la solidarité organique. »

[2. De Jürgen Habermas à Axel Honneth : La Lutte pour la Reconnaissance et les 3 Espaces d'Existence]
[00:24:42] M. ÉRIC LUCY : « Dans l'École de Francfort (Horkheimer, Adorno, Habermas, puis Axel Honneth), Habermas disait que ce qui nous rend raisonnables, c'est le langage transcendantal et l'agir communicationnel. Et son élève Axel Honneth dit à Habermas : 'Mais non ! Ce que cherchent les humains, ce n'est pas la raison, c'est la reconnaissance sociale !' L'identité, c'est la construction de la reconnaissance par soi-même et par les autres, et la lutte contre l'invisibilité sociale. Une société qui fabrique du mépris social et de l'invisibilité est une société malade. »
[00:30:11] M. ÉRIC LUCY : « Pour Axel Honneth (en s'appuyant sur Kant et Hegel), il y a trois espaces à l'existence et à la reconnaissance : une existence sociale, une existence juridique — avoir un état civil, un nom, des papiers (voyez ce que produit le fait de ne plus avoir de papiers chez le demandeur d'asile) —, et une existence affective et langagière : qu'on nous parle et qu'on parle aux autres. Et comme le dit François Dubet, aujourd'hui l'individualisation forcenée et l'injonction à être un 'sujet capacitant' ('Sois toi-même ! Sors-t'en par toi-même !') coincent les gens dans un sentiment terrible de non-reconnaissance. »

[3. Sociologie Historique des Psychologues (Thomas Le Bianic), 1794 & Champ de Bourdieu]
[00:33:29] M. ÉRIC LUCY : « Psychologue du travail au Cnam, ce n'est pas pareil qu'à l'université ! En 1794, l'esprit révolutionnaire (avec l'Abbé Grégoire et Condorcet) crée trois institutions : Normale Sup pour le savoir fondamental et les élites, Polytechnique pour le savoir appliqué et les techniciens, et le Cnam pour le savoir pour tous — même les ouvriers pouvaient venir s'y former. Votre identité pour autrui s'inscrit dans cette catégorie légitime historique. »
[00:45:05] M. ÉRIC LUCY : « Comme le montrent les recherches de Thomas Le Bianic au Cnam, le métier de psychologue est un métier d'État aux contours flous (environ 5 000 psychologues du travail aujourd'hui, soit 15 % des effectifs). Il naît au début du XXe siècle sous la double tutelle de la philosophie et de la médecine, avec les psychotechniciens et l'échelle de Binet et Simon (1905) pour orienter les enfants à l'école et sélectionner dans l'industrie, puis l'Institut de Psychologie en 1921, l'INOP et la Chaire du Cnam en 1928 (après la saignée de 14-18), la Licence de psychologie en 1944-1947 rendue obligatoire en 1950 grâce aux syndicats, et les psychologues scolaires en 1946. »
[01:18:33] M. ÉRIC LUCY : « Construire une identité professionnelle, c'est investir des valeurs au sens de Pierre Bourdieu : qu'est-ce qui fait capital dans un champ donné ? Bourdieu raconte que dans le Béarn, parler fort avec l'accent béarnais, c'était un capital ; mais quand il arrive à l'École Normale Supérieure, ce n'est plus du tout un capital, il fait tout pour perdre son accent ! C'est la notion d'habitus (reprise d'Aristote, Mauss et Weber). »

[4. Histoire du Travail au Cnam (Jules Amar, Gilbert Simondon, Maurice Reuchlin, Yves Clot)]
[01:35:50] M. ÉRIC LUCY : « Toute l'histoire du Cnam tient ensemble le paradoxe marxien du travail entre émancipation et aliénation en traitant la question sociale scientifiquement. Le premier grand directeur de laboratoire moderne au Cnam, le médecin Jules Amar, écrit Le Moteur humain (1914) : il étudie la dépense énergétique et la fatigue ouvrière pour créer une hygiène professionnelle et une chaire d'ergonomie — favoriser la prospérité de la nation sans froisser les patrons ni tuer les ouvriers ! Et dans les années 1950, Gilbert Simondon montre que l'objet technique (comme l'IA générative aujourd'hui) ne fait pas qu'augmenter l'humain : il transforme notre subjectivité et l'enveloppe du moi / non-moi (Winnicott). »

[5. Renaud Sainsaulieu, le Rapport au Prescrit (Addictologie ARS) & France Télécom]
[01:55:16] M. ÉRIC LUCY : « Dans les années 1960-1970, Renaud Sainsaulieu se fait embaucher comme ouvrier à l'usine pour observer les manières d'être au travail. Il montre qu'avec la désindustrialisation, on passe de l'acteur de masse à l'acteur stratège (comme chez Crozier et Friedberg) et à l'acteur ailleurs, que la socialisation secondaire prime désormais sur la socialisation primaire, et que le rapport à l'autorité se divise en modèles identitaires : l'affinitaire, le retrait, le négociateur, le fusionnel, le promotionnel. »
[02:08:01] M. ÉRIC LUCY : « L'autorité aujourd'hui, ce n'est plus seulement le N+1 : c'est le rapport entre le travail réel et le travail prescrit, les fiches de poste de 40 heures par jour, Qualiopi, les KPI ! Dans notre recherche commandée par l'ARS sur les chargés de prévention des risques en addictologie, ils déprimaient et souffraient de troubles identitaires : pas de titre ni de catégorie légitime de métier, et une injonction paradoxale permanente ('fais comme tu veux, mais pourquoi n'as-tu pas fait ce qui était prescrit ?'). Et en 1999-2007 à France Télécom, la phrase performative 'ils partiront par la porte ou par la fenêtre' a fracassé la narration identitaire d'agents qui vivaient pour le service public et le bien commun. »

[6. De la « Maison » à l'Anthropocène & Le Couple Rupture / Continuité (« Pas de Tabula Rasa »)]
[02:27:22] M. ÉRIC LUCY : « À l'époque industrielle, à Mont-de-Marsan, quand quelqu'un disait 'je travaille à la scierie chez Ferbos', c'était l'appartenance à la Maison : ça suffisait pour avoir une identité sociale et un crédit à la banque. Puis on est passé aux grands groupes des années 70 avec la formation continue (et Richard Wittorski montre qu'on apprend aussi le métier hors de l'entreprise), à l'entreprise performante des années 80, à la normalisation des crises et du CDD dans les années 90, et aujourd'hui, avec l'Anthropocène et l'après-Covid (le télétravail), l'identité sociale et la sphère privée supplantent l'identité professionnelle. »
[02:40:21] M. ÉRIC LUCY : « Enfin, ce qu'apporte Claude Dubar sur les trajectoires (en écho à Crise, rupture et dépassement de Kaës et Anzieu et à la loi sur la VAE de 2002), c'est de repérer ce qui fait rupture et continuité. Quand les gens parlent de reconversion professionnelle, la tabula rasa — la table rase —, ça n'existe pas, c'est un fantôme ! Il y a toujours une continuité : quand un commercial vient me voir pour devenir travailleur social, ce qui lui plaisait dans le commerce, c'était d'aller vers les gens et de discuter. Vous ne repartez jamais d'une feuille blanche ! »`,
    bibliographieCitee: [
      {
        titre: "Synthèse Académique Exhaustive — PST123 Cours 6 (M. Éric Lucy — Identité sociale et professionnelle : Sainsaulieu, Dubar, Honneth & Le Bianic)",
        auteur: "M. Éric Lucy (Synthèse structurée CNAM)",
        annee: "14 novembre 2026",
        remarque: "Document PDF de synthèse académique complète du Cours 6 de PST123 (7 pages) : concepts de Dubar et Sainsaulieu, reconnaissance chez Honneth, sociologie historique de Le Bianic, tableaux comparatifs et verbatims d'examen.",
        url: "/docs/PST123_Cours_6_Synthese_Lucy.pdf",
      },
      {
        titre: "Transcription Intégrale Nettoyée & Horodatée — PST123 Cours 6 (M. Éric Lucy)",
        auteur: "M. Éric Lucy",
        annee: "14 novembre 2026",
        remarque: "Transcription intégrale nettoyée et horodatée des 2h43m41s de cours (44 pages, 306 séquences SRT).",
        url: "/docs/PST123_Cours_6_Transcription_Complete_Nettoyee.pdf",
      },
      {
        titre: "La Socialisation : Construction des identités sociales et professionnelles (5e édition)",
        auteur: "Claude Dubar",
        annee: "1991 / 2015 (Armand Colin)",
        remarque: "Ouvrage cardinal du cours PST123 : consubstantialité de l'identité sociale et professionnelle, double transaction (biographique / relationnelle) et couple rupture / continuité.",
      },
      {
        titre: "L'Identité au travail : Les effets culturels de l'organisation",
        auteur: "Renaud Sainsaulieu",
        annee: "1977 (Presses de Sciences Po)",
        remarque: "Enquête fondatrice en immersion ouvrière : socialisation secondaire d'entreprise et typologie des modèles identitaires (fusionnel, négociateur, affinitaire, retrait).",
      },
      {
        titre: "La Lutte pour la reconnaissance (suivi de La Société du mépris)",
        auteur: "Axel Honneth",
        annee: "1992 / 2006 (La Découverte)",
        remarque: "Déplacement de l'agir communicationnel d'Habermas vers la quête de reconnaissance sociale (affective, juridique, sociale) et la lutte contre l'invisibilité.",
      },
      {
        titre: "Les « ingénieurs des âmes » : Savoirs académiques, professionnalisation et pratiques des psychologues du travail de l'entre-deux-guerres à nos jours",
        auteur: "Thomas Le Bianic",
        annee: "2005 / 2013 (Thèse Cnam / Travail et Emploi)",
        remarque: "Recherche de référence sur la genèse étatique du métier de psychologue, la psychotechnique, l'INOP (1928) et l'histoire du Cnam.",
      },
      {
        titre: "Le Moteur humain et les bases scientifiques du travail professionnel",
        auteur: "Jules Amar",
        annee: "1914 (Dunod)",
        remarque: "Premier grand jalon de la physiologie ergonomique au Cnam : étude énergétique du geste, de la fatigue ouvrière et de l'hygiène professionnelle.",
      },
      {
        titre: "Du mode d'existence des objets techniques",
        auteur: "Gilbert Simondon",
        annee: "1958 (Aubier)",
        remarque: "Analyse philosophique de la manière dont les objets techniques transforment l'enveloppe de la subjectivité humaine.",
      },
      {
        titre: "Professionnalisation et développement professionnel (Apprentissage hors travail)",
        auteur: "Richard Wittorski",
        annee: "2007 (L'Harmattan)",
        remarque: "Démonstration de la construction des compétences et des transformations identitaires dans et hors de l'entreprise.",
      },
    ],
  },
];

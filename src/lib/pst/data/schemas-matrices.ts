/**
 * Boîte à Schémas & Matrices Visuelles 18/20 (Titre RNCP Psychologue du Travail Cnam)
 * Les schémas canoniques dont la reproduction soignée garantit le point bonus à l'examen.
 */

export interface SchemaMatrice {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst123" | "transversal";
  titre: string;
  auteur: string;
  annee: string;
  formuleCle: string;
  descriptionPedagogique: string;
  elementsCles: {
    terme: string;
    role: string;
    explication: string;
  }[];
  asciiRepresentation: string;
  reproductionExamenConseil: string;
  piegeDessinExamen: string;
}

export const SCHEMAS_MATRICES: SchemaMatrice[] = [
  // --- 1. MODÈLE DE LEPLAT & HOC (PST106) ---
  {
    id: "schema-leplat-regulation",
    moduleKey: "pst106",
    titre: "Modèle Tâche - Activité & Régulation Ergonomique",
    auteur: "Jacques Leplat & Jean-Marie Hoc",
    annee: "1983",
    formuleCle:
      "Tâche prescrite ➔ confrontation aux Conditions internes/externes ➔ Activité réelle régulatrice ➔ Effets (Système + Homme)",
    descriptionPedagogique:
      "Ce schéma est la bible de l'ergonomie cognitive. Il démontre que l'activité réelle n'est pas le simple décalque de la tâche, mais un compromis régulateur permanent entre les exigences de la production et les limites de l'opérateur.",
    elementsCles: [
      {
        terme: "Tâche prescrite (Buts + Conditions externes)",
        role: "Entrée organisationnelle",
        explication:
          "Ce qui est fixé par la direction : consignes, cadences, machines, procédures, normes de sécurité.",
      },
      {
        terme: "Conditions internes de l'opérateur",
        role: "Facteur humain singulier",
        explication:
          "Compétences réelles, état de fatigue, âge, niveau d'expertise, représentations de l'opérateur.",
      },
      {
        terme: "Activité réelle (Régulation)",
        role: "Processus central",
        explication:
          "Les compromis opératoires, stratégies cognitives et ajustements concrets pour faire face aux aléas.",
      },
      {
        terme: "Effets sur le système",
        role: "Sortie productive",
        explication:
          "Qualité des pièces produites, productivité, respect des délais, rebuts, pannes évitées.",
      },
      {
        terme: "Effets sur l'opérateur",
        role: "Sortie humaine & santé",
        explication:
          "Fatigue, apprentissages, satisfaction du travail bien fait OU usure prématurée, stress et TMS.",
      },
    ],
    asciiRepresentation: `
       ┌────────────────────────────────────────────────────────┐
       │             TÂCHE PRESCRITE                            │
       │   (Buts prescrits + Conditions externes matérielles)   │
       └──────────────────────────┬─────────────────────────────┘
                                  │
                                  ▼
 ┌──────────────────────┐   ┌───────────┐   ┌──────────────────────┐
 │ CONDITIONS INTERNES  │──▶│ ACTIVITÉ  │◀──│ CONDITIONS EXTERNES  │
 │ (Fatigue, âge, exp.) │   │  RÉELLE   │   │ (Pannes, aléas réels)│
 └──────────────────────┘   └─────┬─────┘   └──────────────────────┘
                                  │ (Compromis opératoire & Régulation)
                                  ▼
            ┌─────────────────────┴─────────────────────┐
            ▼                                           ▼
┌─────────────────────────┐               ┌─────────────────────────┐
│   EFFETS SUR LE SYSTÈME │               │   EFFETS SUR L'HOMME    │
│ (Productivité, Qualité) │               │ (Santé, TMS, Compétences│
└─────────────────────────┘               └─────────────────────────┘
`,
    reproductionExamenConseil:
      "Dessinez deux grandes boîtes en haut (Tâche) et au centre (Activité), puis deux flèches latérales qui entrent dans l'Activité (Conditions internes à gauche, Conditions externes réelles à droite). Enfin, terminez par les deux boîtes de sortie du bas : Effets sur le système (performance) et Effets sur l'opérateur (santé/fatigue).",
    piegeDessinExamen:
      "Oublier la flèche de boucle de rétroaction (feed-back) : l'état de fatigue résultant de l'activité modifie immédiatement les conditions internes de l'opérateur pour l'heure suivante.",
  },

  // --- 2. L'ACTIVITÉ SELON YVES CLOT (PST106) ---
  {
    id: "schema-clot-activite-reelle",
    moduleKey: "pst106",
    titre: "L'Architecture du Réel de l'Activité & Le Genre Professionnel",
    auteur: "Yves Clot (Clinique de l'activité)",
    annee: "1999, 2010",
    formuleCle:
      "Le Réel de l'activité = Le Réalisé + Ce qui ne se fait pas (activités suspendues, contrariées, empêchées)",
    descriptionPedagogique:
      "Pour Clot, l'activité ne se résume pas à ce qu'on voit à l'œil nu (le réalisé). Le réalisé n'est que la partie émergée de l'iceberg. Le cœur de la clinique, c'est d'investiguer ce que le travailleur aurait voulu faire et n'a pas pu faire.",
    elementsCles: [
      {
        terme: "L'Activité réalisée",
        role: "Partie visible",
        explication:
          "Ce que l'opérateur effectue effectivement et qui est mesurable par le chronomètre ou la caméra.",
      },
      {
        terme: "Le Réel de l'activité",
        role: "Totalité clinique",
        explication:
          "Ce qu'on ne fait pas, ce qu'on cherche à faire sans y parvenir, ce qu'on aurait pu faire, ce qu'on fait pour ne pas faire ce qui est demandé.",
      },
      {
        terme: "L'Activité empêchée",
        role: "Foyer de souffrance",
        explication:
          "Le travail qu'on s'interdit ou qui est bloqué par manque de moyens, contraignant au travail bâclé.",
      },
      {
        terme: "Genre professionnel",
        role: "Garant collectif",
        explication:
          "La mémoire collective du métier partagée par les pairs qui soutient et oriente l'action singulière.",
      },
      {
        terme: "Style personnel",
        role: "Création singulière",
        explication:
          "La manière unique dont l'opérateur s'approprie le genre pour laisser sa trace et son empreinte.",
      },
    ],
    asciiRepresentation: `
       ┌────────────────────────────────────────────────────────┐
       │                  LE RÉEL DE L'ACTIVITÉ                 │
       │                                                        │
       │   ┌──────────────────────┐                             │
       │   │ ACTIVITÉ RÉALISÉE    │  (Partie émergée visible)   │
       │   └──────────────────────┘                             │
       │              +                                         │
       │   ┌────────────────────────────────────────────────┐   │
       │   │ CE QUI NE SE FAIT PAS                          │   │
       │   │ • Activités suspendues & contrariées           │   │
       │   │ • ACTIVITÉ EMPÊCHÉE (source de souffrance)     │   │
       │   │ • Ce qu'on fait en secret pour tenir la cadence│   │
       │   └────────────────────────────────────────────────┘   │
       └──────────────────────────┬─────────────────────────────┘
                                  │
                       Régulé et soutenu par :
                                  │
       ┌──────────────────────────┴─────────────────────────────┐
       │   GENRE PROFESSIONNEL (Mémoire collective des pairs)   │
       │                           ▲                            │
       │                           │ Revitalisé par :           │
       │   STYLE PERSONNEL (Empreinte singulière de l'opérateur)│
       └────────────────────────────────────────────────────────┘
`,
    reproductionExamenConseil:
      "Tracez un grand cercle ou rectangle englobant 'Le Réel de l'Activité'. À l'intérieur, dessinez une petite boîte 'Le Réalisé' et une grande boîte ombrée 'Ce qui ne se fait pas' en insistant sur 'L'Activité empêchée'. En dessous, reliez une double flèche entre Genre professionnel et Style personnel.",
    piegeDessinExamen:
      "Réduire l'activité au seul réalisé : à l'examen de Catherine Lagabrielle, c'est l'erreur la plus sanctionnée !",
  },

  // --- 3. LES DEUX JUGEMENTS DE DEJOURS (PST106) ---
  {
    id: "schema-dejours-reconnaissance",
    moduleKey: "pst106",
    titre: "La Dynamique de Reconnaissance & Sublimation de la Souffrance",
    auteur: "Christophe Dejours (Psychodynamique du travail)",
    annee: "1993, 1998",
    formuleCle:
      "Souffrance au travail ➔ Dépense d'effort & Intelligence rusée ➔ Double Jugement de Reconnaissance (Utilité + Beauté) ➔ Construction de l'Identité & Santé",
    descriptionPedagogique:
      "Pour Dejours, travailler confronte toujours à la résistance du réel, donc à la souffrance. Cette souffrance ne se transforme en plaisir et en santé mentale que si elle fait l'objet d'un retour symbolique validé par deux jugements complémentaires.",
    elementsCles: [
      {
        terme: "Jugement d'Utilité",
        role: "Axe vertical / Hiérarchique",
        explication:
          "Porté par la hiérarchie ou les clients/usagers : porte sur la rentabilité, l'efficacité, le service rendu.",
      },
      {
        terme: "Jugement de Beauté",
        role: "Axe horizontal / Pairs",
        explication:
          "Porté exclusivement par les collègues de métier : valide le respect des règles de l'art et l'élégance du geste professionnel.",
      },
      {
        terme: "Sublimation",
        role: "Bénéfice psychologique",
        explication:
          "La transformation de la souffrance et de la fatigue en fierté et en identité valorisée.",
      },
    ],
    asciiRepresentation: `
       ┌────────────────────────────────────────────────────────┐
       │                 SOUFFRANCE DU TRAVAIL                  │
       │         (Confrontation à la résistance du réel)        │
       └──────────────────────────┬─────────────────────────────┘
                                  │
                                  ▼
       ┌────────────────────────────────────────────────────────┐
       │                   MOBILISATION SUBJECTIVE              │
       │            (Endurance, Intelligence du geste, zèle)    │
       └──────────────────────────┬─────────────────────────────┘
                                  │
                     Nécessite la RECONNAISSANCE :
                                  │
                 ┌────────────────┴────────────────┐
                 ▼                                 ▼
    ┌─────────────────────────┐       ┌─────────────────────────┐
    │   JUGEMENT D'UTILITÉ    │       │   JUGEMENT DE BEAUTÉ    │
    │  Porté par : Hiérarchie │       │  Porté par : Les Pairs  │
    │  Objet : Rentabilité &  │       │  Objet : Règles de l'art│
    │  efficacité sociale     │       │  & difficulté surmontée │
    └────────────┬────────────┘       └────────────┬────────────┘
                 │                                 │
                 └────────────────┬────────────────┘
                                  │
                                  ▼
       ┌────────────────────────────────────────────────────────┐
       │         SUBLIMATION ➔ SANTÉ & IDENTITÉ PROFESSIONNELLE │
       └────────────────────────────────────────────────────────┘
`,
    reproductionExamenConseil:
      "Montrez clairement la dissociation des deux jugements : l'Utilité regarde l'économie et le résultat externe ; la Beauté regarde la conformité interne aux règles de l'art. Soulignez que les pairs sont les seuls juges du travail bien fait.",
    piegeDessinExamen:
      "Faire porter le jugement de beauté par la direction : le directeur ne connaît pas le détail du réel du travail, il ne peut porter qu'un jugement d'utilité.",
  },

  // --- 4. L'ALGORITHME DE PIERRE BOURDIEU (PST108 & PST123) ---
  {
    id: "schema-bourdieu-algorithme",
    moduleKey: "pst108",
    titre: "L'Algorithme Social de Bourdieu : Habitus, Capital et Champ",
    auteur: "Pierre Bourdieu",
    annee: "1979, 1980",
    formuleCle:
      "[(Habitus) × (Capital)] + Champ = Pratiques Sociales & Prises de position",
    descriptionPedagogique:
      "Bourdieu refuse d'expliquer les conduites humaines par la seule liberté individuelle (existentialisme) ou par les seules structures mécaniques (marxisme dur). Il propose une équation sociologique fondamentale articulant le passé incorporé (habitus), les ressources détenues (capital) et l'espace de jeu actuel (champ).",
    elementsCles: [
      {
        terme: "Habitus",
        role: "Structure structurée et structurante",
        explication:
          "Le social incorporé : dispositions durables et transposables issues de la trajectoire biographique.",
      },
      {
        terme: "4 Capitaux",
        role: "Ressources sociales",
        explication:
          "1. Économique (revenus) | 2. Culturel (diplômes, aisance verbale) | 3. Social (réseau) | 4. Symbolique (prestige/reconnaissance).",
      },
      {
        terme: "Champ",
        role: "Espace de luttes",
        explication:
          "Microcosme social régi par ses règles propres (ex. le champ médical, le champ universitaire, l'entreprise).",
      },
      {
        terme: "Illusio",
        role: "Croyance dans le jeu",
        explication:
          "Le fait d'être pris au jeu, de trouver que le jeu en vaut la chandelle (ex. l'ambition de gravir les échelons).",
      },
    ],
    asciiRepresentation: `
       ┌────────────────────────────────────────────────────────┐
       │                L'ÉQUATION DE BOURDIEU                   │
       │                                                        │
       │   [ (HABITUS)       ×       (CAPITAL) ]    +   CHAMP   │
       │   (Dispositions           (4 Espèces:        (Espace   │
       │    incorporées durables)   Éco, Cult,         de jeu & │
       │                            Soc, Symb)         luttes)  │
       └──────────────────────────┬─────────────────────────────┘
                                  │
                                  ▼
       ┌────────────────────────────────────────────────────────┐
       │            PRATIQUES SOCIALES & SENS PRATIQUE          │
       │  (Sentiment d'aisance OU d'illégitimité / Distinction) │
       │                           +                            │
       │         ILLUSIO : Être pris au sérieux par le jeu      │
       └────────────────────────────────────────────────────────┘
`,
    reproductionExamenConseil:
      "Écrivez la formule matrice mathématique en tête de copie : [(Habitus) × (Capital)] + Champ = Pratiques. Détaillez ensuite les 4 espèces de capital dans un petit tableau récapitulatif.",
    piegeDessinExamen:
      "Oublier le Capital Symbolique : c'est la forme que prend tout capital lorsqu'il est reconnu comme légitime par les dominés (source du pouvoir des mots et de la violence symbolique).",
  },

  // --- 5. LES 4 PRÉTENTIONS D'HABERMAS (PST108) ---
  {
    id: "schema-habermas-validite",
    moduleKey: "pst108",
    titre:
      "Les 4 Prétentions Universelles à la Validité (Agir Communicationnel)",
    auteur: "Jürgen Habermas",
    annee: "1981",
    formuleCle:
      "Tout acte de parole communicatif revendique simultanément : Vérité (monde objectif) + Justesse (monde social) + Sincérité (monde subjectif) + Intelligibilité (langage)",
    descriptionPedagogique:
      "Dans l'agir communicationnel, un énoncé n'est pas simplement un ensemble de sons : c'est une promesse de justification rationnelle. Si l'interlocuteur conteste l'énoncé, le locuteur doit pouvoir prouver sa validité sur ces 4 dimensions sans recourir à l'intimidation hiérarchique.",
    elementsCles: [
      {
        terme: "1. Vérité (Wahrheit)",
        role: "Rapport au Monde Objectif",
        explication:
          "Ce que j'affirme correspond-il aux faits réels observables ? (ex. 'Le camion est arrivé à 14h').",
      },
      {
        terme: "2. Justesse normative (Richtigkeit)",
        role: "Rapport au Monde Social",
        explication:
          "Mon discours est-il légitime au regard des normes partagées ? (ex. 'Ai-je le droit moral de te demander cela ?').",
      },
      {
        terme: "3. Sincérité (Wahrhaftigkeit)",
        role: "Rapport au Monde Subjectif",
        explication:
          "Suis-je honnête ou est-ce que je cherche à dissimuler mes vraies intentions ? (refus du calcul stratégique masqué).",
      },
      {
        terme: "4. Intelligibilité (Verständlichkeit)",
        role: "Rapport au Système Linguistique",
        explication:
          "La phrase est-elle grammaticalement compréhensible sans novlangue opaque ?",
      },
    ],
    asciiRepresentation: `
                       ┌─────────────────────────┐
                       │     ACTE DE PAROLE      │
                       │ (Énoncé communicatif)   │
                       └────────────┬────────────┘
                                    │
           ┌──────────────┬─────────┴─────────┬──────────────┐
           ▼              ▼                   ▼              ▼
    ┌─────────────┐┌─────────────┐     ┌─────────────┐┌─────────────┐
    │   VÉRITÉ    ││  JUSTESSE   │     │  SINCÉRITÉ  ││INTELLIGIBI- │
    │ Monde des   ││ Monde des   │     │ Monde des   ││   LITÉ      │
    │ faits réels ││ normes & du │     │ intentions  ││ Clarté de   │
    │ objectifs   ││ droit social│     │ subjectives ││ la langue   │
    └─────────────┘└─────────────┘     └─────────────┘└─────────────┘
           │              │                   │              │
           └──────────────┴─────────┬─────────┴──────────────┘
                                    ▼
       ┌────────────────────────────────────────────────────────┐
       │             ENTENTE RATIONNELLE (Verständigung)         │
       │        (Délibération libre sans contrainte de pouvoir) │
       └────────────────────────────────────────────────────────┘
`,
    reproductionExamenConseil:
      "Présentez l'énoncé au sommet se ramifiant vers 4 colonnes reliées à leurs mondes respectifs (Objectif, Social, Subjectif, Linguistique). Soulignez que l'agir stratégique masqué triche en simulant la sincérité.",
    piegeDessinExamen:
      "Confondre Vérité et Justesse : la Vérité porte sur les faits de la nature/process ; la Justesse porte sur la conformité aux valeurs éthiques et au droit du travail.",
  },

  // --- 6. LES 3 SPHÈRES D'AXEL HONNETH (PST108) ---
  {
    id: "schema-honneth-spheres",
    moduleKey: "pst108",
    titre: "Les 3 Sphères de la Reconnaissance & Mépris Social",
    auteur: "Axel Honneth",
    annee: "1992, 2007",
    formuleCle:
      "Amour ➔ Confiance en soi | Droit ➔ Respect de soi | Solidarité ➔ Estime de soi",
    descriptionPedagogique:
      "Pour Honneth, l'identité humaine ne peut se développer que si le sujet est reconnu dans 3 sphères relationnelles distinctes. À chaque sphère correspond une blessure morale dévastatrice en cas de déni.",
    elementsCles: [
      {
        terme: "1. Sphère Intime (Amour / Amitié)",
        role: "Confiance en soi",
        explication:
          "Reconnaissance des besoins affectifs primaires. Blessure morale : violences physiques, sévices, atteintes au corps.",
      },
      {
        terme: "2. Sphère Juridique (Droit / Citoyenneté)",
        role: "Respect de soi",
        explication:
          "Reconnaissance comme sujet égal en droits. Blessure morale : exclusion juridique, déni de citoyenneté, précarité statutaire.",
      },
      {
        terme: "3. Sphère Sociale (Solidarité / Utilité du travail)",
        role: "Estime de soi",
        explication:
          "Reconnaissance de la contribution unique au bien commun. Blessure morale : mépris social, invisibilisation, 'boulots de merde'.",
      },
    ],
    asciiRepresentation: `
┌──────────────────┬──────────────────────┬────────────────────────┐
│ SPHÈRE MORALE    │ FORME DE RECONNAISSANCE │ GAIN PSYCHOLOGIQUE     │
├──────────────────┼──────────────────────┼────────────────────────┤
│ 1. SPHERE INTIME │ Amour, amitié, soins │ CONFIANCE EN SOI       │
│                  │ (Attention aux corps)│ (Sécurité affective)   │
├──────────────────┼──────────────────────┼────────────────────────┤
│ 2. SPHÈRE DU     │ Égalité en droits    │ RESPECT DE SOI         │
│    DROIT         │ (Statut citoyen)     │ (Dignité juridique)    │
├──────────────────┼──────────────────────┼────────────────────────┤
│ 3. SPHÈRE DE LA  │ Solidarité sociale   │ ESTIME DE SOI          │
│    SOLIDARITÉ    │ (Utilité du métier)  │ (Sentiment d'utilité)  │
└──────────────────┴──────────────────────┴────────────────────────┘
                                 │
                 En cas de déni / Réification :
                                 ▼
┌──────────────────────────────────────────────────────────────────┐
│           MÉPRIS SOCIAL, HUMILIATION & SOUFFRANCE ETHIQUE        │
└──────────────────────────────────────────────────────────────────┘
`,
    reproductionExamenConseil:
      "Organisez ce modèle sous forme d'un tableau à 3 étages progressifs : Intime ➔ Droit ➔ Solidarité. Associez impérativement en vis-à-vis les trois gains psychiques (Confiance, Respect, Estime).",
    piegeDessinExamen:
      "Oublier la sphère du Droit : l'estime au travail ne peut être saine sans l'égalité des droits garantis par le droit du travail.",
  },

  // --- 7. LA DOUBLE TRANSACTION DE CLAUDE DUBAR (PST123) ---
  {
    id: "schema-dubar-double-transaction",
    moduleKey: "pst123",
    titre: "La Double Transaction Identitaire de Claude Dubar",
    auteur: "Claude Dubar",
    annee: "1991",
    formuleCle:
      "Transaction Biographique (Identité pour soi) ⟷ Transaction Relationnelle (Identité pour autrui)",
    descriptionPedagogique:
      "L'identité n'est ni innée, ni imposée mécaniquement par l'entreprise. Elle est le compromis permanent entre ce que le salarié affirme être dans sa propre histoire et ce que les institutions lui accordent comme titre ou statut.",
    elementsCles: [
      {
        terme: "Transaction Biographique (Interne)",
        role: "Identité pour Soi",
        explication:
          "Arbitrage temporel entre Continuités (je reste fidèle à mes origines) et Ruptures (j'ai changé de métier/statut).",
      },
      {
        terme: "Transaction Relationnelle (Externe)",
        role: "Identité pour Autrui",
        explication:
          "Arbitrage social entre Actes d'attribution (étiquettes données par le chef) et Actes d'appartenance (revendications).",
      },
      {
        terme: "4 Formes Identitaires",
        role: "Résultats de la matrice",
        explication:
          "1. Promotion (accord soi/autrui) | 2. Blocage (revendication refusée) | 3. Conversion (changement total) | 4. Exclusion (rejet).",
      },
    ],
    asciiRepresentation: `
       ┌────────────────────────────────────────────────────────┐
       │         TRANSACTION BIOGRAPHIQUE (INTERNE)             │
       │                 Identité pour Soi                      │
       │          (Arbitrage Continuité vs Rupture)             │
       └──────────────────────────┬─────────────────────────────┘
                                  │
                                  ▲ (Tension & Négociation permanente)
                                  │
       ┌──────────────────────────┴─────────────────────────────┐
       │         TRANSACTION RELATIONNELLE (EXTERNE)            │
       │                Identité pour Autrui                    │
       │    (Actes d'attribution institutionnelle vs Actes      │
       │              d'appartenance revendiqués)               │
       └──────────────────────────┬─────────────────────────────┘
                                  │
                                  ▼
       ┌────────────────────────────────────────────────────────┐
       │           LES 4 FORMES IDENTITAIRES (DUBAR)            │
       │  • Identité de promotion (intégration réussie)         │
       │  • Identité de blocage (décalage diplôme / poste)      │
       │  • Identité de conversion (reconversion subie/choisie) │
       │  • Identité d'exclusion (désaffiliation & chômage)     │
       └────────────────────────────────────────────────────────┘
`,
    reproductionExamenConseil:
      "Dessinez deux blocs face à face reliés par une double flèche verticale épaisse symbolisant la transaction continue entre biographie et relations, puis débouchez sur les 4 formes identitaires.",
    piegeDessinExamen:
      "Présenter la transaction relationnelle comme unilatérale : l'individu ne subit pas passivement l'étiquette, il la négocie par ses actes d'appartenance.",
  },

  // --- 8. LA MATRICE DE RENAUD SAINSAULIEU (PST123) ---
  {
    id: "schema-sainsaulieu-matrice",
    moduleKey: "pst123",
    titre: "La Matrice des 4 Modèles de Pouvoir au Travail",
    auteur: "Renaud Sainsaulieu",
    annee: "1977",
    formuleCle:
      "Croisement de l'Accès au Pouvoir sur le poste (Fort/Faible) × Dépendance Relationnelle (Forte/Faible)",
    descriptionPedagogique:
      "Sainsaulieu démontre que la culture d'entreprise et les comportements politiques ne dépendent pas des personnalités, mais de la structure du pouvoir technique et organisationnel.",
    elementsCles: [
      {
        terme: "1. Modèle Fusionnel (OS d'atelier)",
        role: "Pouvoir faible, Dépendance forte",
        explication:
          "Solidarité de groupe défensive, camaraderie égalitaire, refus de toute tête qui dépasse face au chef.",
      },
      {
        terme: "2. Modèle Négociateur (Cadres & Experts)",
        role: "Pouvoir fort, Dépendance forte",
        explication:
          "Rivalités reconnues et pacifiées, négociation démocratique de compromis, confiance dans l'expertise.",
      },
      {
        terme: "3. Modèle du Retrait (Employés isolés)",
        role: "Pouvoir faible, Dépendance faible",
        explication:
          "Travail alimentaire : l'identité se vit ailleurs (famille, quartier, loisirs). Aucune illusion sur l'entreprise.",
      },
      {
        terme: "4. Modèle Affinitaire (Jeunes diplômés)",
        role: "Pouvoir moyen, Dépendance sélective",
        explication:
          "Réseaux d'affinité choisis, courtisanerie hiérarchique, instrumentalisation des relations pour grimper.",
      },
    ],
    asciiRepresentation: `
                     ACCÈS AU POUVOIR SUR LE POSTE
                      FAIBLE                      FORT
             ┌──────────────────────────┬──────────────────────────┐
             │                          │                          │
        F    │   1. MODÈLE FUSIONNEL    │  2. MODÈLE NÉGOCIATEUR   │
        O    │      (Ouvriers OS)       │    (Experts, Cadres)     │
 D      R    │ • Camaraderie égalitaire │ • Débat démocratique     │
 É      T    │ • Bloc solidaire uni     │ • Rivalités reconnues    │
 P      E    │                          │                          │
 E           ├──────────────────────────┼──────────────────────────┤
 N           │                          │                          │
 D      F    │   3. MODÈLE DU RETRAIT   │  4. MODÈLE AFFINITAIRE   │
 A      A    │    (Employés isolés)     │    (Promotions clan)     │
 N      I    │ • Travail alimentaire    │ • Séduction hiérarchique │
 C      B    │ • Vie réelle 'hors boulot│ • Réseaux d'ambition     │
 E      L    │                          │                          │
        E    └──────────────────────────┴──────────────────────────┘
`,
    reproductionExamenConseil:
      "Tracez une matrice 2x2 propre avec axes libellés : 'Pouvoir sur le poste' (horizontal) et 'Dépendance aux relations de travail' (vertical). Remplissez chaque case avec le nom du modèle et le profil socioprofessionnel type.",
    piegeDessinExamen:
      "Inverser Fusionnel et Affinitaire : le fusionnel est égalitaire et solidaire ; l'affinitaire est sélectif et orienté vers l'ascension individuelle.",
  },

  // --- 9. LA DYNAMIQUE DE ROBERT CASTEL (PST123) ---
  {
    id: "schema-castel-desaffiliation",
    moduleKey: "pst123",
    titre: "La Dynamique de la Désaffiliation Sociale (3 Zones)",
    auteur: "Robert Castel",
    annee: "1995",
    formuleCle:
      "Intégration (Travail stable + Liens solides) ➔ Vulnérabilité (Précarité + Fragilité) ➔ Désaffiliation (Rupture double)",
    descriptionPedagogique:
      "Castel refuse le terme d'exclusion qui fige l'individu dans un état. Il modélise un toboggan social en 3 zones où la fragilisation progressive du travail entraîne la rupture des attaches relationnelles.",
    elementsCles: [
      {
        terme: "1. Zone d'Intégration",
        role: "Stabilité garantie",
        explication:
          "Emploi stable en CDI de droit commun + insertion relationnelle familiale et amicale protectrice.",
      },
      {
        terme: "2. Zone de Vulnérabilité",
        role: "Antichambre du décrochage",
        explication:
          "Précarité de l'emploi (intérim, temps partiel) + fragilisation des réseaux de soutien face aux aléas.",
      },
      {
        terme: "3. Zone de Désaffiliation",
        role: "Décrochage social",
        explication:
          "Inactivité durable + isolement relationnel complet (perte du logement, maraude, invisibilisation).",
      },
    ],
    asciiRepresentation: `
       ┌────────────────────────────────────────────────────────┐
       │                1. ZONE D'INTÉGRATION                   │
       │       Travail stable garanti (CDI, statut salarial)    │
       │                          +                             │
       │         Insertion relationnelle solide (famille, amis) │
       └──────────────────────────┬─────────────────────────────┘
                                  │
                                  ▼ (Effritement de la société salariale)
       ┌────────────────────────────────────────────────────────┐
       │               2. ZONE DE VULNÉRABILITÉ                 │
       │        Précarité de l'emploi (CDD, intérim, ubérisé)   │
       │                          +                             │
       │         Fragilité relationnelle (divorce, isolement)   │
       └──────────────────────────┬─────────────────────────────┘
                                  │
                                  ▼ (Double rupture finale)
       ┌────────────────────────────────────────────────────────┐
       │              3. ZONE DE DÉSAFFILIATION                 │
       │              Chômage de longue durée                   │
       │                          +                             │
       │              Perte des attaches sociales               │
       └────────────────────────────────────────────────────────┘
`,
    reproductionExamenConseil:
      "Dessinez un entonnoir ou une échelle descendante en 3 paliers bien identifiés. Mettez en évidence que chaque palier associe deux composantes indispensables : la relation à l'emploi et la relation aux réseaux de sociabilité.",
    piegeDessinExamen:
      "Oublier la composante relationnelle : la désaffiliation n'est pas seulement le chômage, c'est la rupture conjointe du travail et des liens protecteurs.",
  },

  // --- 10. MÉTHODE IOD : L'ENTONNOIR INVERSÉ (PST108) ---
  {
    id: "schema-valls-iod",
    moduleKey: "pst108",
    titre: "L'Entonnoir Inversé de l'Insertion (Méthode IOD)",
    auteur: "Vincent Valls & Michel Castra",
    annee: "1998, 2012",
    formuleCle:
      "Refus de la sélectivité préalable + Négociation directe avec l'employeur = Insertion durable en milieu ordinaire",
    descriptionPedagogique:
      "La méthode IOD (Intervention sur les Offres et la Demande) démonte le dogme du tri social. Au lieu de tester, former et trier les demandeurs d'emploi jusqu'à ce qu'ils correspondent à un profil supposé parfait (entonnoir classique excluant), IOD part de l'entreprise et adapte l'environnement de travail pour accueillir directement la personne.",
    elementsCles: [
      {
        terme: "1. Modèle classique de l'Entonnoir Excluant",
        role: "Tamis institutionnel",
        explication:
          "Sélection, bilans préalables, stages infinis : seuls les candidats les plus proches de l'emploi passent, les plus fragiles sont rejetés.",
      },
      {
        terme: "2. Modèle IOD (Entonnoir Inversé)",
        role: "Approche intégrative directe",
        explication:
          "Zéro sélection préalable : toute personne est immédiatement employable si l'environnement de travail est ajusté.",
      },
      {
        terme: "3. Négociation avec l'Employeur",
        role: "Levier d'action",
        explication:
          "Le conseiller négocie les conditions d'accueil avec le patron : tutorat, tolérance initiale, aménagement de la fiche de poste.",
      },
      {
        terme: "4. Médiation dans l'Emploi",
        role: "Garantie de maintien",
        explication:
          "L'accompagnement se déroule PENDANT l'exercice de l'emploi ordinaire, et non dans des salles d'attente d'insertion.",
      },
    ],
    asciiRepresentation: `
   MODÈLE CLASSIQUE (EXCLUANT)              MODÈLE IOD (ENTONNOIR INVERSÉ)
   ┌───────────────────────────┐                     ┌───┐
   │ 100 candidats au départ   │                     │ 1 │ Candidat fragile
   └─────────────┬─────────────┘                     └───┴──────────┐
                 ▼ (Tri, Tests, Bilans)                             │
         ┌───────────────┐                                          ▼ (Zéro sélection)
         │  50 retenus   │                         ┌─────────────────────────────────┐
         └───────┬───────┘                         │ ACCUEIL DIRECT DANS L'ENTREPRISE │
                 ▼ (Stages)                        │  - Fiche de poste adaptée       │
             ┌───────┐                             │  - Tutorat et médiation active  │
             │ 5 à 10│ Emploi                      │  - Droits communs préservés     │
             └───────┘                             └────────────────┬────────────────┘
                                                                    ▼
                                                   EMPLOI DURABLE EN MILIEU ORDINAIRE
`,
    reproductionExamenConseil:
      "Dessinez deux schémas en miroir : à gauche l'entonnoir descendant classique qui rétrécit et élimine ; à droite l'entonnoir inversé IOD qui part d'une personne fragile et ouvre sur un environnement d'accueil élargi et sécurisé.",
    piegeDessinExamen:
      "Confondre IOD avec du simple placement ou du coaching de CV. Le cœur d'IOD est l'intervention sur l'OFFRE (l'employeur) et non la rééducation du demandeur.",
  },

  // --- 11. LE MODÈLE DE L'ORGANON DE KARL BÜHLER (PST108) ---
  {
    id: "schema-buhler-organon",
    moduleKey: "pst108",
    titre: "Le Modèle de l'Organon du Langage (3 Fonctions)",
    auteur: "Karl Bühler",
    annee: "1934",
    formuleCle:
      "Signe linguistique (Zeichen) = Symbole (Objets/Faits) + Symptôme (Émetteur) + Signal (Récepteur)",
    descriptionPedagogique:
      "Pour Karl Bühler, le langage est un outil ('organon'). Tout énoncé concret accomplit simultanément trois fonctions sémiotiques distinctes mais articulées : représenter des états de faits, exprimer l'intériorité du locuteur, et adresser un appel au récepteur.",
    elementsCles: [
      {
        terme: "1. Fonction de Représentation (Darstellung / Symbole)",
        role: "Rapport aux faits du monde",
        explication:
          "L'énoncé renvoie au monde objectif extérieur (objets, événements, faits observables). Le signe agit comme un SYMBOLE.",
      },
      {
        terme: "2. Fonction d'Expression (Ausdruck / Symptôme)",
        role: "Rapport au locuteur",
        explication:
          "L'énoncé révèle l'état subjectif, les sentiments et la posture de l'émetteur. Le signe agit comme un SYMPTÔME.",
      },
      {
        terme: "3. Fonction d'Appel (Appell / Signal)",
        role: "Rapport au destinataire",
        explication:
          "L'énoncé vise à orienter l'attention, émouvoir, contraindre ou mobiliser le récepteur. Le signe agit comme un SIGNAL.",
      },
      {
        terme: "4. Le Signe au centre (Das Zeichen)",
        role: "Matière acoustique ou verbale",
        explication:
          "Le phénomène sonore ou textuel concret, inséré dans un entourage symbolique et perceptif.",
      },
    ],
    asciiRepresentation: `
                       OBJETS ET ÉTATS DE CHOSES
                      (Gegenstände und Sachverhalte)
                                   ▲
                                   │
                                   │ (Fonction de Représentation / SYMBOLE)
                                   │
                             ┌───────────┐
                             │ LE SIGNE  │
                             │ (Zeichen) │
                             └───────────┘
                                ▲     ▲
                               /       \\
  (Fonction d'Expression)     /         \\    (Fonction d'Appel)
        SYMPTÔME             /           \\        SIGNAL
                            /             \\
                       ┌─────────┐   ┌───────────┐
                       │ ÉMETTEUR│   │ RÉCEPTEUR │
                       │ (Sender)│   │(Empfänger)│
                       └─────────┘   └───────────┘
`,
    reproductionExamenConseil:
      "Dessinez un triangle : les Objets/Faits au sommet, l'Émetteur en bas à gauche, et le Récepteur en bas à droite. Placez un cercle au centre pour le Signe, et nommez chaque relation avec ses deux mots indispensables : Symbole (Représentation), Symptôme (Expression), Signal (Appel).",
    piegeDessinExamen:
      "Confondre Symptôme et Signal : le symptôme exprime l'émetteur (Ausdruck) ; le signal agit sur le récepteur (Appell). Ne pas oublier la flèche vers les faits extérieurs (Darstellung).",
  },

  // --- 12. CARTOGRAPHIE DES COURANTS CNAM (PST106) ---
  {
    id: "schema-cartographie-lagabrielle",
    moduleKey: "pst106",
    titre: "Cartographie des Courants en Psychologie du Travail au Cnam",
    auteur: "Pr. Christine Lagabrielle (Séance 1 PST106)",
    annee: "2026",
    formuleCle:
      "Psychologie du Travail (Globale) ⊃ Clinique du Travail ⊃ Clinique de l'Activité (Clot) vs Psychodynamique (Dejours)",
    descriptionPedagogique:
      "Le schéma d'introduction magistral de Mme Lagabrielle : il délimite précisément où se situe la clinique de l'activité par rapport à la psychologie du travail industrielle/managériale et à la psychodynamique du travail.",
    elementsCles: [
      {
        terme: "Psychologie du Travail & des Organisations",
        role: "Discipline globale",
        explication: "Sélection RH, recrutement, ergonomie physique, cognition, orientation.",
      },
      {
        terme: "Clinique du Travail",
        role: "Courant francophone spécifique",
        explication: "Le travail comme opérateur central du psychisme humain et primauté de la subjectivité.",
      },
      {
        terme: "Psychodynamique du Travail (Dejours)",
        role: "Branche psychanalytique (PST120)",
        explication: "Souffrance, plaisir, idéologies défensives, épreuve du réel, jugements de beauté/utilité.",
      },
      {
        terme: "Clinique de l'Activité (Clot)",
        role: "Branche historico-culturelle (PST106)",
        explication: "Pouvoir d'agir, genre/style, traces vidéo, réel de l'activité, controverse de métier.",
      },
    ],
    asciiRepresentation: `
 ┌────────────────────────────────────────────────────────────────────────┐
 │ 1. PSYCHOLOGIE DU TRAVAIL ET DES ORGANISATIONS (CHAMP GLOBAL & RH)    │
 │ (Recrutement, Sélection, Orientation, Compétences, Ergonomie physique) │
 │                                                                        │
 │   ┌────────────────────────────────────────────────────────────────┐   │
 │   │ 2. LA CLINIQUE DU TRAVAIL (TRADITION FRANCOPHONE DU CNAM)      │   │
 │   │ (Le travail comme opérateur central de la santé mentale)       │   │
 │   │                                                                │   │
 │   │   ┌───────────────────────────┐    ┌─────────────────────────┐ │   │
 │   │   │ PSYCHODYNAMIQUE (DEJOURS) │ ◄-►│  CLINIQUE ACTIVITÉ      │ │   │
 │   │   │ • Souffrance / Plaisir    │débat│  (YVES CLOT / CRTD)     │ │   │
 │   │   │ • Stratégies de défense   │    │ • Pouvoir d'agir        │ │   │
 │   │   │ • Jugement beauté / utilité│   │ • Réel de l'activité    │ │   │
 │   │   │ • Enseignement : PST120   │    │ • Enseignement : PST106 │ │   │
 │   │   └───────────────────────────┘    └─────────────────────────┘ │   │
 │   └────────────────────────────────────────────────────────────────┘   │
 └────────────────────────────────────────────────────────────────────────┘
`,
    reproductionExamenConseil:
      "Tracez deux grands rectangles emboîtés (le grand pour la Psychologie du Travail générale, le sous-rectangle pour la Clinique du Travail). À l'intérieur de la Clinique, tracez deux colonnes en miroir avec une double flèche 'Débat/Dialogue' : à gauche Dejours (souffrance/reconnaissance), à droite Clot (activité/pouvoir d'agir).",
    piegeDessinExamen:
      "Ne pas confondre la Clinique du Travail avec une simple 'psychologie clinique appliquée au travail'. La clinique du travail transforme la clinique classique en plaçant le travail comme opérateur premier.",
  },

  // --- MATRICE CNAM SÉANCE 2 : OPTIMUM (LAHY) VS MAXIMUM (TAYLOR) ---
  {
    id: "schema-lahy-optimum-maximum",
    moduleKey: "pst106",
    titre: "Matrice de Rupture Cnam : Optimum (Lahy) vs Maximum (Taylor)",
    auteur: "Jean-Marie Lahy (1916) & Suzanne Pacaud (1953) — Pr. Christine Lagabrielle",
    annee: "1916 - 1953",
    formuleCle:
      "Maximum immédiat (Taylor = usure/vampirisation) vs Optimum pérenne (Lahy = équilibre santé/productivité & libération de disponibilité psychologique)",
    descriptionPedagogique:
      "Ce schéma matérialise l'acte de fondation de la psychophysiologie et de l'ergonomie francophone au Cnam. Il confronte deux visions irréconciliables de l'humain au travail : la prédation quantitative taylorienne et l'écologie du geste humain de Lahy et Pacaud.",
    elementsCles: [
      {
        terme: "Maximum Taylorien",
        role: "Logique extractive à court terme",
        explication: "Rendement maximal forcé sans considération pour la physiologie, menant à l'épuisement et à la vampirisation de l'ouvrier (Dejours).",
      },
      {
        terme: "Optimum Psychophysiologique (Lahy)",
        role: "Logique d'équilibre durable",
        explication: "Point d'équilibre conciliant efficacité économique et préservation durable de la santé et longévité du travailleur.",
      },
      {
        terme: "Automatisation Interne (Lahy)",
        role: "Moteur de liberté psychologique",
        explication: "Incorporation spontanée des gestes dégageant de la disponibilité mentale pour penser, rêver et réguler.",
      },
      {
        terme: "Rationalisation Externe (OST/Ford)",
        role: "Mécanisme d'aliénation",
        explication: "Imposition mécanique du dehors (chronométrage, chaîne) confisquant la plasticité fonctionnelle (Linhart, L'Établi).",
      },
      {
        terme: "Immersion de Terrain (Pacaud)",
        role: "Rupture méthodologique",
        explication: "Sortie du laboratoire vers l'activité réelle ('pour comprendre le métier, il faut le faire') révélant 14 difficultés invisibles.",
      },
    ],
    asciiRepresentation: `
 ┌───────────────────────────────────────────────┬───────────────────────────────────────────────┐
 │       LE MAXIMUM TAYLORIEN (OST, 1911)        │   L'OPTIMUM PSYCHOPHYSIOLOGIQUE (LAHY, 1916)  │
 ├───────────────────────────────────────────────┼───────────────────────────────────────────────┤
 │ • Objectif : Rendement quantitatif immédiat   │ • Objectif : Équilibre pérenne Santé / Travail│
 │ • Vue de l'homme : 'Schmidt assimilé au bœuf' │ • Vue de l'homme : La tête comme '3e bras'   │
 │ • Mécanisme : Rationalisation EXTERNE         │ • Mécanisme : Automatisation INTERNE          │
 │   (Bureaux des méthodes, chronométrage direct)│   (Incorporation de schèmes d'action)         │
 │ • Conséquence mentale : Aliénation & fatigue  │ • Conséquence mentale : Disponibilité psychique│
 │   (Amputation de la pensée - Robert Linhart)  │   (Espace libéré pour rêver, penser, créer)   │
 │ • Statut du conflit : Éliminé par la science  │ • Statut du conflit : Élaboré / Débattu (Clot)│
 │ • Sort de l'ouvrier : Vampirisation & usure   │ • Sort de l'ouvrier : Préservation longévité  │
 └───────────────────────────────────────────────┴───────────────────────────────────────────────┘
                                         ▲
                                         │ Rupture de terrain : Suzanne Pacaud (1953)
                                         │ « Pour comprendre le métier, il faut le faire »
                                         ▼
 ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
 │ LE TRAVAIL RÉEL DES TÉLÉPHONISTES SNCF : 14 DIFFICULTÉS INVISIBLES DÉCOUVERTES SUR LE TERRAIN  │
 │ (Bruit, cadence 15s, mémoire organigrammes, agressivité ➔ L'erreur est une RÉGULATION vitale) │
 └───────────────────────────────────────────────────────────────────────────────────────────────┘
`,
    reproductionExamenConseil:
      "Dessinez un tableau à 2 colonnes bien distinctes : 'Maximum (Taylor)' à gauche en gris/rouge, et 'Optimum (Lahy)' à droite en vert. En dessous, reliez les deux par une boîte horizontale consacrée à Suzanne Pacaud (1953) soulignant la maxime 'Pour comprendre le métier, il faut le faire' et les 14 difficultés invisibles.",
    piegeDessinExamen:
      "Ne pas représenter l'optimum comme un 'moindre rendement' ou un compromis mou : c'est un optimum scientifique garantissant une productivité globale supérieure sur toute la vie active.",
  },

  // --- 13. TRAJECTOIRES DU LANGAGE PIAGET VS VYGOTSKI & ZPD (PST108) ---
  {
    id: "schema-vygotski-piaget",
    moduleKey: "pst108",
    titre: "Trajectoires Divergentes du Langage (Piaget vs Vygotski) & ZPD",
    auteur: "Jean Piaget (1923) vs Lev Vygotski (1934)",
    annee: "1934",
    formuleCle:
      "Piaget : Pensée ➔ Langage égocentrique ➔ Élimination. Vygotski : Langage social ➔ Langage égocentrique (résolution) ➔ Langage intérieur (pensée).",
    descriptionPedagogique:
      "Le cœur théorique du premier cours de PST108 : ce schéma visuel illustre le renversement épistémologique accompli par Vygotski sur le devenir de la parole chez l'enfant et l'adulte au travail.",
    elementsCles: [
      {
        terme: "Trajectoire Piaget",
        role: "Constructivisme individualiste",
        explication: "Pensée égocentrique ➔ Langage égocentrique asocial ➔ Voué à disparaître avec la décentration.",
      },
      {
        terme: "Trajectoire Vygotski",
        role: "Approche historico-culturelle",
        explication: "Langage social d'emblée relationnel ➔ Langage égocentrique régulateur ➔ Langage intérieur.",
      },
      {
        terme: "Zone Proximale de Développement (ZPD)",
        role: "Médiation sociale",
        explication: "Écart entre développement actuel (seul) et potentiel (guidé par un tuteur ou un pair).",
      },
    ],
    asciiRepresentation: `
 ═════════════════════════════════════════════════════════════════════════
 I. TRAJECTOIRES COMPARÉES DU LANGAGE ÉGOCENTRIQUE
 ═════════════════════════════════════════════════════════════════════════
 JEAN PIAGET :
 Pensée autistique ➔ [ LANGAGE ÉGOCENTRIQUE ] ➔ ÉLIMINATION (Décentration) ➔ Langage socialisé
                     (Asocial, simple reflet)

 LEV VYGOTSKI :
 Langage social    ➔ [ LANGAGE ÉGOCENTRIQUE ] ➔ INTÉRIORISATION (Pensée) ➔ Langage intérieur
 (D'emblée relationnel)(Outil de résolution)     (Expérience des crayons)

 ═════════════════════════════════════════════════════════════════════════
 II. LA ZONE PROXIMALE DE DÉVELOPPEMENT (ZPD)
 ═════════════════════════════════════════════════════════════════════════
 ┌──────────────────────┐      ┌───────────────────────────┐      ┌──────────────────────┐
 │ DÉVELOPPEMENT ACTUEL │ ───► │ ZONE PROXIMALE (ZPD)      │ ───► │ DÉVELOPPEMENT        │
 │ Ce que le sujet fait │      │ Médiation par le tuteur,  │      │ POTENTIEL FUTUR      │
 │ SEUL en autonomie    │      │ les pairs et les outils   │      │ Fonctions psychiques │
 └──────────────────────┘      └───────────────────────────┘      │ intériorisées        │
                                                                  └──────────────────────┘
`,
    reproductionExamenConseil:
      "Dessinez deux lignes horizontales parallèles. En haut Piaget avec la flèche qui barre le langage égocentrique vers l'élimination. En bas Vygotski avec la flèche descendante montrant l'intériorisation en langage intérieur. En-dessous, dessinez les 3 boîtes de la ZPD avec la médiation au centre.",
    piegeDessinExamen:
      "Ne jamais écrire que le langage égocentrique disparaît chez Vygotski ! C'est l'erreur éliminatoire. Il s'intériorise et devient la pensée verbale silencieuse.",
  },

  // --- 14. LES 4 FONCTIONS DE LA PENSÉE SELON BERNARD GOLSE (PST108) ---
  {
    id: "schema-golse-pensee",
    moduleKey: "pst108",
    titre: "Les 4 Fonctions de la Pensée selon Bernard Golse",
    auteur: "Bernard Golse (1999) · E. Lucy (PST108)",
    annee: "1999",
    formuleCle:
      "1. Pare-excitation (Bion/Winnicott) · 2. Réparation Fort/Da (Freud) · 3. Narcissique · 4. Tiercéité (Triadique)",
    descriptionPedagogique:
      "Ce schéma structure la genèse de la pensée humaine et de la parole dans l'approche néoconstructiviste et psychanalytique présentée au cours 1 de PST108.",
    elementsCles: [
      {
        terme: "1. Pare-excitation",
        role: "Contenance psychique",
        explication: "Prêt d'un appareil à penser (Bion) et holding (Winnicott) pour filtrer les stimuli.",
      },
      {
        terme: "2. Réparation symbolique",
        role: "Maîtrise de la perte",
        explication: "Jeu du Fort/Da de Freud (bobine) : passage de la passivité à la maîtrise active de l'absence.",
      },
      {
        terme: "3. Fonction narcissique",
        role: "Continuité d'existence",
        explication: "Sentiment rassurant de la continuité d'être (going-on-being) dans le temps.",
      },
      {
        terme: "4. Accès à la tiercéité",
        role: "Intersubjectivité",
        explication: "Passage de l'enveloppe monadique (mère-bébé) à l'enveloppe triadique (père tiers séparateur).",
      },
    ],
    asciiRepresentation: `
 ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
 │ 1. PARE-EXCITAT. │  │ 2. RÉPARATION    │  │ 3. NARCISSIQUE   │  │ 4. TIERCÉITÉ     │
 │ Contenance mère  │  │ Jeu du Fort / Da │  │ Continuité de    │  │ Tiers séparateur │
 │ Prêt d'appareil  │  │ Maîtrise de la   │  │ l'existence      │  │ Enveloppe        │
 │ à penser (Bion)  │  │ perte (Freud)    │  │ (Winnicott)      │  │ triadique        │
 └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘
          └─────────────────────┼─────────────────────┴─────────────────────┘
                                ▼
         GENÈSE DE LA PENSÉE ET DU DIALOGUE CLINIQUE DANS LE TRAVAIL
`,
    reproductionExamenConseil:
      "Alignez 4 boîtes horizontales numérotées de 1 à 4. Associez à chaque boîte son auteur clé : 1=Bion/Winnicott, 2=Freud (Fort/Da), 3=Winnicott (continuité), 4=Golse (tiercéité). Reliez-les vers une flèche commune 'Accès au dialogue'.",
    piegeDessinExamen:
      "Attribuer l'appareil à penser à Freud au lieu de Wilfred Bion (1962).",
  },

  // --- 14b. LA MATRICE DES ACTES DE LANGAGE D'AUSTIN & SEARLE (PST108) ---
  {
    id: "schema-austin-searle-actes",
    moduleKey: "pst108",
    titre: "Matrice Pragmatique des Actes de Langage : Tripartition d'Austin & Taxonomie des 5 Actes de Searle",
    auteur: "John L. Austin (1962) & John R. Searle (1969/1979) · M. Éric Lucy (PST108)",
    annee: "1962 / 1979",
    formuleCle:
      "Performatif (Austin) ➔ Tripartition (Locutoire / Illocutoire / Perlocutoire) ➔ Direction d'ajustement (Searle) ➔ 5 Actes (Assertif, Directif, Promissif, Expressif, Déclaratif)",
    descriptionPedagogique:
      "Cette matrice synthétise l'enseignement de M. Éric Lucy (Cours 2 de PST108). Elle articule la rupture performative d'Austin (dire, c'est faire avec des conditions de félicité) et la formalisation par Searle de la direction d'ajustement (mots/monde) pour décrypter le langage ordinaire et le management au travail.",
    elementsCles: [
      {
        terme: "Tripartition d'Austin (1962)",
        role: "Architecture de l'énoncé",
        explication: "Locutoire (dire les sons/sens) + Illocutoire (acte accompli EN disant : force) + Perlocutoire (effets psychologiques SUR autrui).",
      },
      {
        terme: "Conditions de Félicité (Austin)",
        role: "Validation institutionnelle",
        explication: "Procédure acceptée, circonstances adéquates et statut d'autorité (Status est magistratus : pas de pouvoir sans mandat).",
      },
      {
        terme: "1. Actes Assertifs (Searle)",
        role: "Mots ➔ Monde",
        explication: "Le locuteur engage sa croyance sur la vérité d'un fait (« Le serveur est tombé en panne »).",
      },
      {
        terme: "2. Actes Directifs (Searle)",
        role: "Monde ➔ Mots",
        explication: "Tentative d'amener l'interlocuteur à agir (« Envoyez le rapport » ; ordres directs ou masqués).",
      },
      {
        terme: "3. Actes Promissifs (Searle)",
        role: "Monde ➔ Mots",
        explication: "Le locuteur s'oblige lui-même à une action future (« La direction s'engage à embaucher »).",
      },
      {
        terme: "4. Actes Expressifs (Searle)",
        role: "Sans direction (Ø)",
        explication: "Expression d'un sentiment moral ou d'un état psychologique (« Merci pour votre dévouement »).",
      },
      {
        terme: "5. Actes Déclaratifs (Searle)",
        role: "Mots ↔ Monde (simultané)",
        explication: "Transformation immédiate de la réalité juridique/sociale par l'énonciation (« Vous êtes licencié », « La séance est ouverte »).",
      },
      {
        terme: "Actes de Langage Indirects",
        role: "Double niveau pragmatique",
        explication: "Forme apparente polie masquant un ordre impératif (« Merci de respecter les consignes » = directif).",
      },
    ],
    asciiRepresentation: `
    ┌─────────────────────────────────────────────────────────────────────────────┐
    │          ARCHITECTONIQUE DES ACTES DE LANGAGE (AUSTIN & SEARLE)             │
    └─────────────────────────────────────────────────────────────────────────────┘
                                           │
                    ┌──────────────────────┴──────────────────────┐
                    ▼                                             ▼
       [ NIVEAU 1 : TRIPARTITION AUSTINIENNE ]       [ CONDITIONS DE FÉLICITÉ ]
       • Locutoire   : phonèmes, syntaxe, sens       • Procédure conventionnelle
       • Illocutoire : FORCE D'AGIR EN DISANT        • Statut d'autorité légitime
       • Perlocutoire: effets réels sur autrui       (Status est magistratus)
                    │
                    ▼
       ┌───────────────────────────────────────────────────────────────┐
       │     NIVEAU 2 : TAXONOMIE DES 5 ACTES DE JOHN SEARLE (1969)    │
       │           (Direction d'ajustement entre Mots et Monde)        │
       └───────────────────────────────────────────────────────────────┘
                                           │
         ┌───────────────┬─────────────────┼────────────────┬───────────────┐
         ▼               ▼                 ▼                ▼               ▼
    [ASSERTIFS]     [DIRECTIFS]      [PROMISSIFS]     [EXPRESSIFS]    [DÉCLARATIFS]
    Mots ➔ Monde    Monde ➔ Mots     Monde ➔ Mots     Sans direction  Mots ↔ Monde
    Croyance/Vérité Volonté/Ordre    Engagement futur État affectif   Institution
    « Il pleut »    « Remplissez »   « Je promets »   « Merci »       « Vous êtes viré »
         │               │                 │                │               │
         └───────────────┴─────────────────┼────────────────┴───────────────┘
                                           ▼
                    ┌─────────────────────────────────────────┐
                    │       ACTES DE LANGAGE INDIRECTS        │
                    │   Ordre managérial masqué en politesse  │
                    │   « Merci de respecter les délais »     │
                    └─────────────────────────────────────────┘
`,
    reproductionExamenConseil:
      "Dessinez deux étages : en haut la tripartition d'Austin (Locutoire / Illocutoire / Perlocutoire) avec la bulle 'Conditions de félicité'. En dessous, les 5 colonnes de Searle en précisant impérativement la flèche de direction d'ajustement sous chaque acte (Mots->Monde, Monde->Mots, etc.). Ajoutez un encart sur les actes indirects.",
    piegeDessinExamen:
      "Oublier la direction d'ajustement (Direction of Fit) qui est la marque distinctive de Searle, ou classer 'Vous êtes licencié' dans les assertifs au lieu des déclaratifs.",
  },

  // --- 14c. MATRICE DE L'ACTIVITÉ CONJOINTE & CONTRAT DE COMMUNICATION (PST108) ---
  {
    id: "schema-valls-ghiglione-communication",
    moduleKey: "pst108",
    titre: "Matrice de l'Activité Conjointe : Du Schéma Linéaire au Contrat de Communication (Ghiglione / Valls)",
    auteur: "Rodolphe Ghiglione (1986) & Francis Valls (Séance 3 PST108)",
    annee: "1986 / 2026",
    formuleCle:
      "Intralocuteurs (cadres de référence) ➔ SPC (Situation Potentiellement Communicative) ➔ Enjeu commun (vs Objectif) ➔ Contrat de communication (4 règles) ➔ Interlocuteurs & Co-construction",
    descriptionPedagogique:
      "Ce schéma synthétise l'enseignement de M. Francis Valls (Cours 3 de PST108). Il dépasse le modèle télégraphique de Shannon & Weaver pour modéliser la communication comme une activité conjointe où l'émetteur est simultanément récepteur. Il articule la distinction princeps entre Objectif organisationnel et Enjeu psychosocial, ainsi que les 4 règles du contrat de communication de Ghiglione.",
    elementsCles: [
      {
        terme: "Intralocuteurs",
        role: "État initial isolé",
        explication: "Sujets porteurs d'une histoire, de valeurs et de cadres de référence singuliers non encore partagés.",
      },
      {
        terme: "Situation Potentiellement Communicative (SPC)",
        role: "Cadre interactionnel",
        explication: "Espace-temps et contexte institutionnel propices à l'engagement d'un échange réel.",
      },
      {
        terme: "L'Objectif (Organisationnel)",
        role: "Tâche mesurable",
        explication: "Le livrable explicite ou le résultat quantifiable requis par l'institution (ex: trouver un CDI plein temps).",
      },
      {
        terme: "L'Enjeu (Psychosocial)",
        role: "Sens pour le sujet",
        explication: "Ce qui compte vitalement pour la personne (ex: garder sa fille le mercredi) ; doit englober l'objectif.",
      },
      {
        terme: "Contrat de Communication (4 règles)",
        role: "Régulation implicite par corps",
        explication: "1. Pertinence (égale compétence) ; 2. Réciprocité (écoute symétrique) ; 3. Contractualisation (rôles) ; 4. Influence.",
      },
      {
        terme: "Informer n'est pas communiquer (Wolton)",
        role: "Avertissement clinique",
        explication: "La vitesse d'un mail n'est pas la relation : nécessité de tiers intermédiaires (psychologues du travail).",
      },
    ],
    asciiRepresentation: `
 ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 │       MODÈLE ÉCOSYSTÉMIQUE DE LA COMMUNICATION CONJOINTE (GHIGLIONE / VALLS)                │
 └─────────────────────────────────────────────────────────────────────────────────────────────┘
                                                                                                
   INTRALOCUTEUR A (Éducateur, Formateur)                 INTRALOCUTEUR B (Usager, Salarié)     
   • Histoire, savoirs, cadre de référence                • Besoins, priorités, vulnérabilités  
   • Statut formel (pouvoir, âge)                         • Histoire singulière incorporée      
          │                                                                      │              
          └───────────────────────────────┬──────────────────────────────────────┘              
                                          ▼                                                     
                        [ SITUATION POTENTIELLEMENT COMMUNICATIVE ]                             
                                          │                                                     
             ┌────────────────────────────┴────────────────────────────┐                        
             ▼                                                         ▼                        
    L'OBJECTIF FORMEL (Le quoi)                                L'ENJEU EXISTENTIEL (Le sens)    
    • Tâche, résultat quantifiable                             • Priorités de vie du sujet      
    • Indicateur chiffré (ex: CDI plein temps)                 • Valeurs (ex: garde d'enfant)   
             │                                                         │                        
             └────────────────────────────┬────────────────────────────┘                        
                                          ▼                                                     
                       NÉGOCIATION DU SENS & CONTRAT DE COMMUNICATION                           
                       (Règles implicites incorporées "par corps" - Bourdieu)                   
                                          │                                                     
      ┌───────────────────┬───────────────┴───────────────┬───────────────────┐                 
      ▼                   ▼                               ▼                   ▼                 
 1. PERTINENCE      2. RÉCIPROCITÉ              3. CONTRACTUALISATION   4. INFLUENCE            
 Reconnaissance     Symétrie d'échange          Lisibilité des rôles    Co-construction         
 d'une égale        Écouter, poser le           et des règles           de mondes de possibles  
 compétence         questionnaire               du jeu                                          
      │                   │                               │                   │                 
      └───────────────────┴───────────────┬───────────────┴───────────────────┘                 
                                          ▼                                                     
                        INTERLOCUTEURS EN ACTIVITÉ CONJOINTE                                    
                        (Sens partagé & Accord provisoire fragile)                              
                                          ▲                                                     
                                          │ "Informer n'est pas communiquer" (Wolton)           
                                          │ Écologie de la voix (Don Juan) & Espace (Dubet)     
 └─────────────────────────────────────────────────────────────────────────────────────────────┘
`,
    reproductionExamenConseil:
      "Tracez deux cercles en haut pour les 'Intralocuteurs A et B' qui convergent vers une boîte centrale 'Situation Potentiellement Communicative'. En dessous, dessinez deux colonnes contrastées 'Objectif (résultat)' et 'Enjeu (sens)' avec une accolade montrant que l'enjeu doit intégrer l'objectif. Terminez par une boîte horizontale divisée en 4 compartiments pour les règles du contrat de Ghiglione (Pertinence, Réciprocité, Contractualisation, Influence).",
    piegeDessinExamen:
      "Représenter la communication sous la forme d'un tuyau unilatéral avec des flèches simples A -> B (schéma de Shannon) : Francis Valls sanctionne immédiatement ce schéma réductionniste.",
  },

  // --- 15. LES 4 FORMES IDENTITAIRES DE CLAUDE DUBAR (PST123) ---
  {
    id: "schema-dubar-formes",
    moduleKey: "pst123",
    titre: "Matrice 2x2 des 4 Formes Identitaires de Socialisation de Claude Dubar",
    auteur: "Claude Dubar (1991, La Socialisation) · Document E. Lucy",
    annee: "1991",
    formuleCle:
      "Transaction relationnelle (Pour autrui) ✕ Transaction biographique (Pour soi) = 4 formes identitaires",
    descriptionPedagogique:
      "La grille d'analyse officielle issue du document de cadrage de Mme Élisabeth Lucy. Elle croise l'axe temporel (continuité vs rupture) et l'axe social (reconnaissance vs rejet institutionnel).",
    elementsCles: [
      {
        terme: "Identité de retrait / exclusion",
        role: "Continuité subie ✕ Non-reconnaissance",
        explication: "Exécutant précaire menacé. Travail purement alimentaire, repli hors travail.",
      },
      {
        terme: "Identité bloquée",
        role: "Continuité de métier ✕ Non-reconnaissance",
        explication: "Ouvrier de métier dont l'expérience est niée par les nouvelles technologies.",
      },
      {
        terme: "Identité de mobilisation / entreprise",
        role: "Rupture biographique ✕ Reconnaissance",
        explication: "Carriériste en promotion interne épousant les valeurs managériales.",
      },
      {
        terme: "Identité de réseau / conversion",
        role: "Rupture biographique ✕ Autonomie externe",
        explication: "Expert nomade, consultant indépendant négociant ses compétences sur le marché.",
      },
    ],
    asciiRepresentation: `
                               TRANSACTION RELATIONNELLE (Axe social)
                               ▲ Reconnaissance par autrui (Coopération)
                               │
               IDENTITÉ        │        IDENTITÉ D'ENTREPRISE
               BLOQUÉE         │        / MOBILISATION
        (Ouvrier de métier)    │        (Carriériste promotion)
                               │
 ◀ Continuité avec le passé ───┼─── Rupture avec le passé (Visée) ▶
 (Reproduction biographique)   │   (Production nouvelle de soi)
                               │
               IDENTITÉ DE     │        IDENTITÉ DE RÉSEAU
               RETRAIT         │        / CONVERSION
        (Exécutant précaire)   │        (Expert nomade indépendant)
                               │
                               ▼ Non-reconnaissance / Rejet (Conflit)
`,
    reproductionExamenConseil:
      "Tracez un grand repère cartésien en croix. L'axe X = Transaction Biographique (gauche=Continuité, droite=Rupture). L'axe Y = Transaction Relationnelle (haut=Reconnaissance, bas=Non-reconnaissance). Remplissez les 4 cadrans avec leurs noms officiels et le profil sociologique type.",
    piegeDessinExamen:
      "Intervertir l'axe des X et l'axe des Y. Pensez : la biographie s'étale dans le temps (horizontal comme une ligne de vie), la hiérarchie sociale s'élève dans l'espace (vertical).",
  },
];


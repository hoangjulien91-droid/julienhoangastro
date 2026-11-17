export interface SousAxeS1 {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst123";
  nom: string;
  niveauMaîtrise: number; // 0 à 100
  questionsRecommandees: {
    question: string;
    options: string[];
    correctIdx: number;
    explication: string;
  }[];
}

export const SOUS_AXES_S1_DEFAULTS: SousAxeS1[] = [
  {
    id: "leplat_wisner",
    moduleKey: "pst106",
    nom: "Régulation & Écart Prescrit/Réel (Leplat & Wisner)",
    niveauMaîtrise: 75,
    questionsRecommandees: [
      {
        question:
          "Selon Jacques Leplat, pourquoi l'activité réelle diffère-t-elle nécessairement de la tâche prescrite ?",
        options: [
          "Parce que les opérateurs manquent de formation et sont indisciplinés",
          "Parce qu'elle constitue un compromis régulateur face à la variabilité des conditions internes et externes",
          "Parce que la hiérarchie n'exerce pas assez de contrôle managérial",
        ],
        correctIdx: 1,
        explication:
          "Exact ! L'écart n'est pas une faute mais une régulation opératoire cognitive indispensable.",
      },
    ],
  },
  {
    id: "clot_genre",
    moduleKey: "pst106",
    nom: "Clinique de l'Activité & Genre (Yves Clot)",
    niveauMaîtrise: 60,
    questionsRecommandees: [
      {
        question:
          "Quelle est la fonction première du 'genre professionnel' selon Yves Clot ?",
        options: [
          "Imposer un règlement disciplinaire strict sans dérogation",
          "Fournir une mémoire impersonnelle du métier servant de ressource au style personnel",
          "Remplacer les syndicats dans la négociation collective",
        ],
        correctIdx: 1,
        explication:
          "Le genre est la boîte à outils collective sans laquelle l'action singulière se délite.",
      },
    ],
  },
  {
    id: "buhler_organon",
    moduleKey: "pst108",
    nom: "L'Organon du Langage (Karl Bühler)",
    niveauMaîtrise: 45,
    questionsRecommandees: [
      {
        question:
          "Dans le modèle de l'Organon, quelle fonction relie le signe linguistique au récepteur ?",
        options: [
          "La fonction d'Appel (Signal)",
          "La fonction Expressive (Symptôme)",
          "La fonction de Représentation (Symbole)",
        ],
        correctIdx: 0,
        explication:
          "La fonction d'appel oriente l'énoncé comme un signal vers le récepteur pour influencer sa conduite.",
      },
    ],
  },
  {
    id: "habermas_validite",
    moduleKey: "pst108",
    nom: "Agir Communicationnel & Validité (Jürgen Habermas)",
    niveauMaîtrise: 50,
    questionsRecommandees: [
      {
        question:
          "Quelles sont les 3 prétentions universelles à la validité selon Habermas ?",
        options: [
          "Le pouvoir, l'argent et la réputation",
          "La vérité objective, la justesse normative et la sincérité subjective",
          "L'émotion, la logique et la rhétorique",
        ],
        correctIdx: 1,
        explication:
          "Tout acte de parole orienté vers l'intercompréhension présuppose ces trois prétentions.",
      },
    ],
  },
  {
    id: "valls_iod",
    moduleKey: "pst108",
    nom: "Méthode IOD sans tri préalable (Francis Valls)",
    niveauMaîtrise: 70,
    questionsRecommandees: [
      {
        question:
          "Pourquoi l'intervention IOD refuse-t-elle le tri préalable sur CV ?",
        options: [
          "Pour faire des économies d'affranchissement postal",
          "Parce que le tri sur CV opère comme un filtre d'exclusion sociale masquant le travail réel",
          "Parce que les employeurs n'aiment pas lire les CV",
        ],
        correctIdx: 1,
        explication:
          "L'IOD déplace la négociation vers le travail réel et l'aménagement des conditions d'accueil.",
      },
    ],
  },
  {
    id: "dubar_transaction",
    moduleKey: "pst123",
    nom: "Double Transaction Identitaire (Claude Dubar)",
    niveauMaîtrise: 80,
    questionsRecommandees: [
      {
        question:
          "Qu'est-ce qu'une identité de blocage selon Claude Dubar ?",
        options: [
          "Un arrêt de travail prolongé suite à une grève d'atelier",
          "Le refus par autrui/institution d'une identité revendiquée par le sujet",
          "L'adhésion fusionnelle sans réserve à la culture de l'entreprise",
        ],
        correctIdx: 1,
        explication:
          "Le blocage naît de la non-coïncidence entre revendication pour soi et reconnaissance pour autrui.",
      },
    ],
  },
  {
    id: "sainsaulieu_pouvoir",
    moduleKey: "pst123",
    nom: "4 Modèles de Pouvoir au Travail (Renaud Sainsaulieu)",
    niveauMaîtrise: 65,
    questionsRecommandees: [
      {
        question:
          "Quel modèle de Sainsaulieu correspond à un pouvoir fort sur le poste couplé à une dépendance forte aux pairs ?",
        options: [
          "Le modèle Fusionnel",
          "Le modèle de Négociation",
          "Le modèle de Retrait",
        ],
        correctIdx: 1,
        explication:
          "Le modèle de négociation caractérise les professionnels et techniciens experts en démocratie d'atelier.",
      },
    ],
  },
  {
    id: "deonto_loi1985",
    moduleKey: "pst123",
    nom: "Déontologie & Titre de Psychologue (Loi 1985 & Code 2021)",
    niveauMaîtrise: 55,
    questionsRecommandees: [
      {
        question:
          "Quelle est la sanction pénale encourue en cas d'usurpation du titre de psychologue (Art. 433-17 C. Pén.) ?",
        options: [
          "Un simple avertissement écrit du Conseil de l'Ordre",
          "1 an d'emprisonnement et 15 000 euros d'amende",
          "Une interdiction temporaire d'exercer de 3 mois",
        ],
        correctIdx: 1,
        explication:
          "La loi du 25 juillet 1985 protège le titre comme un titre réglementé pénalement sanctionné.",
      },
    ],
  },
];

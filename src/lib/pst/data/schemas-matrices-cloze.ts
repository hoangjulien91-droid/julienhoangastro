export interface ClozeItem {
  id: string;
  label: string;
  answer: string;
  hint: string;
}

export const CLOZE_CHALLENGES: Record<string, ClozeItem[]> = {
  "schema-leplat-regulation": [
    {
      id: "s1",
      label: "Boîte Haute (Entrée organisationnelle)",
      answer: "Tâche prescrite",
      hint: "Ce qui est fixé par la direction : consignes, cadences, sécurité.",
    },
    {
      id: "s2",
      label: "Boîte Centrale (Processus régulateur)",
      answer: "Activité réelle",
      hint: "Le compromis opératoire pour faire face aux aléas.",
    },
    {
      id: "s3",
      label: "Boîte Gauche (Facteur humain singulier)",
      answer: "Conditions internes",
      hint: "Fatigue, âge, compétences réelles de l'opérateur.",
    },
    {
      id: "s4",
      label: "Boîte Bas-Gauche (Sortie productive)",
      answer: "Effets sur le système",
      hint: "Qualité, cadences, productivité, pannes évitées.",
    },
  ],
  "schema-clot-activite-reelle": [
    {
      id: "s1",
      label: "Sommet émergé de l'Iceberg (20%)",
      answer: "Activité réalisée",
      hint: "Ce qui est observable et mesuré par les indicateurs de gestion.",
    },
    {
      id: "s2",
      label: "Masse immergée (80%)",
      answer: "Le Réel de l'activité",
      hint: "Ce qui ne se fait pas : activités contrariées, suspendues, empêchées.",
    },
    {
      id: "s3",
      label: "Pilier collectif droit",
      answer: "Genre professionnel",
      hint: "Mémoire collective des pairs et règles du métier non écrites.",
    },
    {
      id: "s4",
      label: "Pilier individuel droit",
      answer: "Style personnel",
      hint: "Réappropriation singulière et touche propre de l'opérateur.",
    },
  ],
  "schema-dejours-reconnaissance": [
    {
      id: "s1",
      label: "Source de la créativité",
      answer: "Souffrance face au réel",
      hint: "Ce qui résiste à la technique et demande de l'intelligence pratique.",
    },
    {
      id: "s2",
      label: "Branche gauche de reconnaissance",
      answer: "Jugement d'utilité",
      hint: "Rendu par la hiérarchie et les clients sur la valeur économique.",
    },
    {
      id: "s3",
      label: "Branche droite de reconnaissance",
      answer: "Jugement de beauté",
      hint: "Rendu par les pairs selon les règles de l'art du métier.",
    },
    {
      id: "s4",
      label: "Issue positive de la gratitude",
      answer: "Sublimation & Santé",
      hint: "Rapatriement de la souffrance en identité et santé psychique.",
    },
  ],
  "schema-bourdieu-algorithme": [
    {
      id: "s1",
      label: "Matrice de dispositions incorporées",
      answer: "Habitus",
      hint: "Structures structurées et structurantes, sens pratique.",
    },
    {
      id: "s2",
      label: "Espace de rivalités et luttes",
      answer: "Champ social",
      hint: "Espace relationnel avec ses enjeux propres et ses positions dominants/dominés.",
    },
    {
      id: "s3",
      label: "Les ressources mobilisables (4 formes)",
      answer: "Les Capitaux",
      hint: "Économique, culturel, social et symbolique.",
    },
    {
      id: "s4",
      label: "L'adhésion au jeu social",
      answer: "Illusio",
      hint: "La croyance viscérale que le jeu en vaut la chandelle.",
    },
  ],
  "schema-habermas-validite": [
    {
      id: "s1",
      label: "Pôle Nord (Monde Objectif)",
      answer: "Vérité (Wahrheit)",
      hint: "Conformité aux faits réels observables et vérifiables.",
    },
    {
      id: "s2",
      label: "Pôle Est (Monde Social)",
      answer: "Justesse (Richtigkeit)",
      hint: "Légitimité morale et conformité aux normes partagées.",
    },
    {
      id: "s3",
      label: "Pôle Sud (Monde Subjectif)",
      answer: "Sincérité (Wahrhaftigkeit)",
      hint: "Authenticité du locuteur et absence de manipulation trompeuse.",
    },
    {
      id: "s4",
      label: "Pôle Ouest (Monde Linguistique)",
      answer: "Intelligibilité (Verständlichkeit)",
      hint: "Clarté sémantique et accessibilité du vocabulaire.",
    },
  ],
  "schema-honneth-spheres": [
    {
      id: "s1",
      label: "1ère Sphère (Affective & Amour)",
      answer: "Confiance en soi",
      hint: "Garantie par la sécurité affective et l'intégrité corporelle.",
    },
    {
      id: "s2",
      label: "2ème Sphère (Juridique & Droit)",
      answer: "Respect de soi",
      hint: "Statut de citoyen titulaire des mêmes droits que les autres.",
    },
    {
      id: "s3",
      label: "3ème Sphère (Sociale & Travail)",
      answer: "Estime de soi",
      hint: "Reconnaissance de l'utilité sociale et des compétences singulières.",
    },
  ],
  "schema-buhler-organon": [
    {
      id: "s1",
      label: "Sommet (Objets & Faits du monde)",
      answer: "Symbole (Représentation)",
      hint: "La fonction représentative (Darstellung) orientée vers les faits.",
    },
    {
      id: "s2",
      label: "Base Gauche (Émetteur / Locuteur)",
      answer: "Symptôme (Expression)",
      hint: "La fonction expressive (Ausdruck) orientée vers le sujet parlant.",
    },
    {
      id: "s3",
      label: "Base Droite (Récepteur / Destinataire)",
      answer: "Signal (Appel)",
      hint: "La fonction d'appel (Appell) orientée vers l'action de l'autre.",
    },
  ],
  "schema-valls-iod": [
    {
      id: "s1",
      label: "Règle déontologique d'entrée IOD",
      answer: "Zéro sélection préalable",
      hint: "Refus du tamis et des tests psychotechniques éliminatoires.",
    },
    {
      id: "s2",
      label: "Levier stratégique IOD",
      answer: "Négociation sur l'Offre",
      hint: "Action directe auprès de l'employeur pour adapter le poste.",
    },
    {
      id: "s3",
      label: "Lieu de l'accompagnement",
      answer: "Pendant l'emploi réel",
      hint: "Médiation active dans l'entreprise ordinaire, pas en salle d'attente.",
    },
  ],
  "schema-dubar-double-transaction": [
    {
      id: "s1",
      label: "Quadrant Continuité + Accord",
      answer: "Identité d'entreprise",
      hint: "Promotion interne, fidélité et reconnaissance statutaire.",
    },
    {
      id: "s2",
      label: "Quadrant Continuité + Désaccord",
      answer: "Identité de blocage",
      hint: "Plafond de verre et assignation subie sans promotion.",
    },
    {
      id: "s3",
      label: "Quadrant Rupture + Accord",
      answer: "Identité de conversion",
      hint: "Mobilité réussie, reconversion qualifiante valorisée.",
    },
    {
      id: "s4",
      label: "Quadrant Rupture + Désaccord",
      answer: "Identité de crise",
      hint: "Licenciement, rupture de trajectoire et déclassement subi.",
    },
  ],
  "schema-sainsaulieu-matrice": [
    {
      id: "s1",
      label: "Faible pouvoir + Forte dépendance",
      answer: "Modèle fusionnel",
      hint: "Ouvriers spécialisés (OS) : camaraderie unanime de masse face au chef.",
    },
    {
      id: "s2",
      label: "Fort pouvoir + Forte dépendance",
      answer: "Modèle négociateur",
      hint: "Cadres et techniciens : culture du débat démocratique et compromis.",
    },
    {
      id: "s3",
      label: "Faible pouvoir + Faible dépendance",
      answer: "Modèle du retrait",
      hint: "Précaires et intérimaires : travail alimentaire, identité hors-travail.",
    },
    {
      id: "s4",
      label: "Fort pouvoir + Affinités sélectives",
      answer: "Modèle affinitaire",
      hint: "Jeunes managers nomades : réseaux de pairs électifs.",
    },
  ],
  "schema-castel-desaffiliation": [
    {
      id: "s1",
      label: "Palier 1 (Stabilité garantie)",
      answer: "Zone d'Intégration",
      hint: "Emploi stable garanti (CDI) + attaches relationnelles solides.",
    },
    {
      id: "s2",
      label: "Palier 2 (Antichambre du décrochage)",
      answer: "Zone de Vulnérabilité",
      hint: "Emploi précaire (CDD/intérim) + fragilité des liens familiaux.",
    },
    {
      id: "s3",
      label: "Palier 3 (Double rupture)",
      answer: "Zone de Désaffiliation",
      hint: "Chômage de longue durée + perte totale des attaches citoyennes.",
    },
  ],
};

export const EXTRA_DISTRACTORS = [
  "Aliénation technologique",
  "Dissonance cognitive",
  "Arbitraire culturel",
  "Mandat institutionnel",
  "Savoir-faire de prudence",
  "Transaction financière",
];

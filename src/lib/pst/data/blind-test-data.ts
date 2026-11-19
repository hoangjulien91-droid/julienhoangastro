export interface BlindTestItem {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst120" | "pst123" | "pst124";
  citationMystere: string;
  auteurCorrect: string;
  optionsAuteurs: string[];
  anneeEtOuvrage: string;
  pourquoiEssentiel: string;
}

export const BLIND_TEST_POOL: BlindTestItem[] = [
  // --- PST108 ---
  {
    id: "bt-1",
    moduleKey: "pst108",
    citationMystere:
      "C'est en tant qu'il est institué par l'ensemble des rapports sociaux que le discours produit des effets réels : status est magistratus.",
    auteurCorrect: "Pierre Bourdieu",
    optionsAuteurs: [
      "Pierre Bourdieu",
      "John L. Austin",
      "Jürgen Habermas",
      "Noam Chomsky",
    ],
    anneeEtOuvrage: "Ce que parler veut dire (1982)",
    pourquoiEssentiel:
      "Rompt avec l'illusion d'Austin : le pouvoir des mots vient de l'institution sociale déléguée, pas de la langue.",
  },
  {
    id: "bt-2",
    moduleKey: "pst108",
    citationMystere:
      "La recherche d'une entente rationnelle exempte de contrainte est la condition de possibilité de l'émancipation collective.",
    auteurCorrect: "Jürgen Habermas",
    optionsAuteurs: [
      "Jürgen Habermas",
      "Pierre Bourdieu",
      "Axel Honneth",
      "Michel Foucault",
    ],
    anneeEtOuvrage: "Théorie de l'agir communicationnel (1981)",
    pourquoiEssentiel:
      "Définit l'agir communicationnel face à l'agir stratégique : la force du meilleur argument sans violence.",
  },
  {
    id: "bt-3",
    moduleKey: "pst108",
    citationMystere:
      "L'insertion professionnelle durable ne s'obtient pas en dressant le demandeur d'emploi à l'employabilité, mais en négociant directement avec l'entreprise sur le travail réel sans tri préalable.",
    auteurCorrect: "Francis Valls & Denis Castra",
    optionsAuteurs: [
      "Francis Valls & Denis Castra",
      "Robert Castel",
      "Claude Dubar",
      "Alain Wisner",
    ],
    anneeEtOuvrage:
      "L'insertion professionnelle des personnes en difficulté (Méthode IOD, 2007)",
    pourquoiEssentiel:
      "La charte déontologique IOD : refus du tri et action directe sur l'environnement de travail de droit commun.",
  },
  {
    id: "bt-4",
    moduleKey: "pst108",
    citationMystere:
      "La réification managériale n'est pas une simple erreur de gestion comptable : c'est un oubli actif de la reconnaissance originaire d'autrui comme sujet.",
    auteurCorrect: "Axel Honneth",
    optionsAuteurs: [
      "Axel Honneth",
      "Christophe Dejours",
      "Karl Marx",
      "Yves Clot",
    ],
    anneeEtOuvrage: "La Réification (2007)",
    pourquoiEssentiel:
      "Complète les 3 sphères de la reconnaissance en expliquant la racine morale du mépris social au travail.",
  },
  {
    id: "bt-5",
    moduleKey: "pst108",
    citationMystere:
      "L'insulte au travail ne blesse pas par son acoustique : elle blesse parce qu'elle réactualise une asymétrie sociale et un stigmate historique déjà institué.",
    auteurCorrect: "Éric Lucy",
    optionsAuteurs: [
      "Éric Lucy",
      "John L. Austin",
      "Didier Eribon",
      "Pierre Bourdieu",
    ],
    anneeEtOuvrage: "L'insulte au travail (2021)",
    pourquoiEssentiel:
      "Explique la performativité de la violence verbale dans le cours magistral de PST108 au Cnam.",
  },

  // --- PST106 ---
  {
    id: "bt-6",
    moduleKey: "pst106",
    citationMystere:
      "Si les ouvriers appliquaient strictement et à la lettre les consignes prescrites par les ingénieurs, l'atelier s'arrêterait en moins d'une heure.",
    auteurCorrect: "Alain Wisner",
    optionsAuteurs: [
      "Alain Wisner",
      "Frederick Taylor",
      "Yves Clot",
      "Jacques Leplat",
    ],
    anneeEtOuvrage: "Réflexions sur l'ergonomie (1995)",
    pourquoiEssentiel:
      "Fondement de l'ergonomie de l'activité du Cnam : l'écart irréductible et vital entre tâche prescrite et activité réelle.",
  },
  {
    id: "bt-7",
    moduleKey: "pst106",
    citationMystere:
      "Le genre est le travail d'autrui dans mon travail. Le style est la métamorphose singulière du genre dans la situation vécue.",
    auteurCorrect: "Yves Clot",
    optionsAuteurs: [
      "Yves Clot",
      "Lev Vygotski",
      "Christophe Dejours",
      "Jacques Leplat",
    ],
    anneeEtOuvrage: "La fonction psychologique du travail (1999)",
    pourquoiEssentiel:
      "Articulation clinique entre mémoire collective du métier (genre) et création de l'opérateur (style).",
  },
  {
    id: "bt-8",
    moduleKey: "pst106",
    citationMystere:
      "Le jugement de beauté ne peut être porté que par les pairs, car eux seuls partagent la connaissance intime des règles de l'art du métier.",
    auteurCorrect: "Christophe Dejours",
    optionsAuteurs: [
      "Christophe Dejours",
      "Yves Clot",
      "Pascale Molinier",
      "Georges Canguilhem",
    ],
    anneeEtOuvrage: "Souffrance en France (1998)",
    pourquoiEssentiel:
      "Distingue le jugement d'utilité (hiérarchie) du jugement de beauté (pairs, sublimation et santé).",
  },
  {
    id: "bt-9",
    moduleKey: "pst106",
    citationMystere:
      "La tâche est ce qui est à faire ; l'activité est ce qui se fait par un opérateur singulier dans une situation déterminée.",
    auteurCorrect: "Jacques Leplat & Jean-Marie Hoc",
    optionsAuteurs: [
      "Jacques Leplat & Jean-Marie Hoc",
      "Alain Wisner",
      "Yves Clot",
      "Maurice de Montmollin",
    ],
    anneeEtOuvrage:
      "Tâche et Activité dans l'analyse psychologique des situations (1983)",
    pourquoiEssentiel:
      "Formule matrice canonique de l'ergonomie cognitive à retenir par cœur pour PST106.",
  },

  // --- PST123 ---
  {
    id: "bt-10",
    moduleKey: "pst123",
    citationMystere:
      "L'identité professionnelle est le résultat d'une double transaction : biographique pour soi et relationnelle pour autrui.",
    auteurCorrect: "Claude Dubar",
    optionsAuteurs: [
      "Claude Dubar",
      "Renaud Sainsaulieu",
      "Pierre Bourdieu",
      "Erving Goffman",
    ],
    anneeEtOuvrage:
      "La socialisation : construction des identités sociales et professionnelles (1991)",
    pourquoiEssentiel:
      "Théorie pivot de PST123 : articulation entre identité pour soi et identité pour autrui.",
  },
  {
    id: "bt-11",
    moduleKey: "pst123",
    citationMystere:
      "L'entreprise n'est pas seulement un lieu de production de marchandises, c'est une institution d'apprentissage culturel des relations de pouvoir.",
    auteurCorrect: "Renaud Sainsaulieu",
    optionsAuteurs: [
      "Renaud Sainsaulieu",
      "Michel Crozier",
      "Claude Dubar",
      "Max Weber",
    ],
    anneeEtOuvrage: "L'identité au travail (1977)",
    pourquoiEssentiel:
      "Les 4 modèles relationnels (fusionnel, négociateur, retrait, affinitaire) issus de la structure du pouvoir.",
  },
  {
    id: "bt-12",
    moduleKey: "pst123",
    citationMystere:
      "La désaffiliation n'est pas un état de marginalité figée, mais une trajectoire de décrochage conjointe du travail stable et du réseau relationnel.",
    auteurCorrect: "Robert Castel",
    optionsAuteurs: [
      "Robert Castel",
      "Serge Paugam",
      "Pierre Bourdieu",
      "Claude Dubar",
    ],
    anneeEtOuvrage: "Les Métamorphoses de la question sociale (1995)",
    pourquoiEssentiel:
      "Les 3 zones (intégration, vulnérabilité, désaffiliation) remplaçant le terme trompeur d'exclusion.",
  },
  {
    id: "bt-13",
    moduleKey: "pst123",
    citationMystere:
      "La profession de psychologue du travail en France s'est construite au prix d'une balkanisation historique entre ergonomes, sélectionneurs psychotechniciens et cliniciens.",
    auteurCorrect: "Thomas Le Bianic",
    optionsAuteurs: [
      "Thomas Le Bianic",
      "Alain Wisner",
      "Éric Lucy",
      "Jean-Marie Faverge",
    ],
    anneeEtOuvrage: "Les psychologues du travail en France (2004)",
    pourquoiEssentiel:
      "Socio-histoire de la profession et étapes vers la protection du titre par la Loi du 25 juillet 1985.",
  },

  // --- PST120 ---
  {
    id: "bt-14",
    moduleKey: "pst120",
    citationMystere:
      "Le réel est ce qui se fait connaître à celui qui travaille par sa résistance à la maîtrise et au savoir. Travailler, c'est combler l'écart par l'endurance de la souffrance et la mobilisation de la métis.",
    auteurCorrect: "Christophe Dejours",
    optionsAuteurs: [
      "Christophe Dejours",
      "Yves Clot",
      "Alain Wisner",
      "Sigmund Freud",
    ],
    anneeEtOuvrage: "Le facteur humain (1995) & Travail vivant (2009)",
    pourquoiEssentiel:
      "Définition princeps du réel en psychodynamique du travail : résistance matérielle et éprouvé subjectif.",
  },
  {
    id: "bt-15",
    moduleKey: "pst120",
    citationMystere:
      "L'idéologie défensive virile permet de masquer l'angoisse et de conjurer la peur collectivement, au prix d'un déni de la vulnérabilité et d'une déqualification du travail de care.",
    auteurCorrect: "Pascale Molinier",
    optionsAuteurs: [
      "Pascale Molinier",
      "Marie Pezé",
      "Isabelle Gernet",
      "Dominique Lhuilier",
    ],
    anneeEtOuvrage: "L'énigme de la femme active (2003)",
    pourquoiEssentiel:
      "Apport décisif sur le genre et les défenses collectives viriles face au danger.",
  },

  // --- PST124 ---
  {
    id: "bt-16",
    moduleKey: "pst124",
    citationMystere:
      "Un artefact ne devient un instrument pour le sujet que par un double processus continu : l'instrumentation du système technique et l'instrumentalisation par les schèmes d'usage.",
    auteurCorrect: "Pierre Rabardel",
    optionsAuteurs: [
      "Pierre Rabardel",
      "Marc-Eric Bobillier Chaumon",
      "Yrjö Engeström",
      "Gilbert Simondon",
    ],
    anneeEtOuvrage: "Les hommes et les technologies (1995)",
    pourquoiEssentiel:
      "Théorie de la genèse instrumentale : distinction fondamentale entre artefact technique et instrument psychologique.",
  },
  {
    id: "bt-17",
    moduleKey: "pst124",
    citationMystere:
      "Les technologies émergentes ne sont acceptées durablement que si elles s'articulent à l'activité située en préservant le pouvoir d'agir, plutôt qu'en imposant une prescription automatisée descendante.",
    auteurCorrect: "Marc-Eric Bobillier Chaumon",
    optionsAuteurs: [
      "Marc-Eric Bobillier Chaumon",
      "Fred Davis",
      "Yves Clot",
      "François Daniellou",
    ],
    anneeEtOuvrage: "Acceptation située des technologies (2016)",
    pourquoiEssentiel:
      "Rupture avec le modèle TAM simpliste : l'acceptation n'est pas cognitive a priori, elle est située dans l'activité réelle.",
  },

  // --- RENFORT SÉANCES 5-7 (NOVEMBRE 2026) ---
  {
    id: "bt-18",
    moduleKey: "pst106",
    citationMystere:
      "Être en bonne santé, c'est pouvoir tomber malade et s'en relever ; c'est un luxe biologique et la capacité normative d'instituer de nouvelles normes face aux infidélités du milieu.",
    auteurCorrect: "Georges Canguilhem",
    optionsAuteurs: [
      "Georges Canguilhem",
      "Frederick Taylor",
      "Elton Mayo",
      "Abraham Maslow",
    ],
    anneeEtOuvrage: "Le Normal et le Pathologique (1943/1966)",
    pourquoiEssentiel:
      "Fondement philosophique de la clinique de l'activité : la santé comme normativité, jamais comme soumission passive.",
  },
  {
    id: "bt-19",
    moduleKey: "pst106",
    citationMystere:
      "L'activité est composée de trois niveaux : l'activité répond à un motif collectif, l'action vise un but conscient, et l'opération s'ajuste aux conditions matérielles. La crise naît quand le sens personnel se coupe de la signification sociale.",
    auteurCorrect: "Alexis Léontiev",
    optionsAuteurs: [
      "Alexis Léontiev",
      "Jean Piaget",
      "Henri Fayol",
      "Kurt Lewin",
    ],
    anneeEtOuvrage: "Activité, conscience, personnalité (1975)",
    pourquoiEssentiel:
      "Architecture de la théorie de l'activité de l'École russe mobilisée au Cours 5 de PST106.",
  },
  {
    id: "bt-20",
    moduleKey: "pst106",
    citationMystere:
      "Le collectif de travail ne se décrète pas par un organigramme : il est à la fois une ressource vitale pour l'individu et une construction fragile qui exige la controverse sur la qualité.",
    auteurCorrect: "Yvon Miossec & Yves Clot",
    optionsAuteurs: [
      "Yvon Miossec & Yves Clot",
      "Max Weber",
      "Henry Ford",
      "Frederick Herzberg",
    ],
    anneeEtOuvrage: "Le collectif de travail, entre fragilités et ressources (2015)",
    pourquoiEssentiel:
      "Distinction décisive entre travail collectif (prescrit) et collectif de travail (vivant).",
  },
  {
    id: "bt-21",
    moduleKey: "pst108",
    citationMystere:
      "L'acteur ne se réduit jamais totalement au rôle prescrit : par la distance au rôle et le repli en coulisses, il préserve sa face et l'équilibre de l'interaction.",
    auteurCorrect: "Erving Goffman",
    optionsAuteurs: [
      "Erving Goffman",
      "Noam Chomsky",
      "Claude Shannon",
      "Jürgen Habermas",
    ],
    anneeEtOuvrage: "La mise en scène de la vie quotidienne (1959)",
    pourquoiEssentiel:
      "Modèle dramaturgique incontournable du Cours 5 de Francis Valls (PST108).",
  },
  {
    id: "bt-22",
    moduleKey: "pst108",
    citationMystere:
      "Le performatif ne se contente pas de décrire le monde : il fait exister ce qu'il dit, au risque permanent de la démise de la vérité et de l'effet sophistique.",
    auteurCorrect: "Barbara Cassin",
    optionsAuteurs: [
      "Barbara Cassin",
      "Jean-Claude Abric",
      "Rodolphe Ghiglione",
      "Karl Bühler",
    ],
    anneeEtOuvrage: "Quand dire, c'est vraiment faire (2018)",
    pourquoiEssentiel:
      "Référence majeure du Cours 7 d'Éric Lucy articulant performatif, politique et vérité.",
  },
  {
    id: "bt-23",
    moduleKey: "pst108",
    citationMystere:
      "Toute représentation sociale s'organise autour d'un noyau central stable et non négociable, protégé par des éléments périphériques souples qui absorbent les contradictions du réel.",
    auteurCorrect: "Jean-Claude Abric",
    optionsAuteurs: [
      "Jean-Claude Abric",
      "Harold Garfinkel",
      "Dominique Wolton",
      "Axel Honneth",
    ],
    anneeEtOuvrage: "Pratiques sociales et représentations (1994)",
    pourquoiEssentiel:
      "Théorie du noyau central vue dans le Cours 6 de Véronique Marot (PST108).",
  },
  {
    id: "bt-24",
    moduleKey: "pst123",
    citationMystere:
      "La double vérité du travail réside dans cet écart où le salarié investit sa fierté et son honneur dans l'illusio du jeu professionnel, masquant ainsi l'exploitation objective.",
    auteurCorrect: "Pierre Bourdieu",
    optionsAuteurs: [
      "Pierre Bourdieu",
      "Claude Dubar",
      "Marie Jahoda",
      "Talcott Parsons",
    ],
    anneeEtOuvrage: "La double vérité du travail (1996)",
    pourquoiEssentiel:
      "Concept central de la Séance 6 (É. Lucy) sur la domination consentie au travail.",
  },
  {
    id: "bt-25",
    moduleKey: "pst123",
    citationMystere:
      "L'entreprise n'est pas qu'un lieu de production : c'est un creuset d'apprentissage culturel des normes relationnelles et de la démocratie à travers quatre modèles d'accès au pouvoir.",
    auteurCorrect: "Renaud Sainsaulieu",
    optionsAuteurs: [
      "Renaud Sainsaulieu",
      "Howard Becker",
      "Émile Durkheim",
      "Robert K. Merton",
    ],
    anneeEtOuvrage: "L'identité au travail (1977)",
    pourquoiEssentiel:
      "Fondation des 4 modèles identitaires (retrait, fusionnel, négociateur, affinitaire).",
  },
  {
    id: "bt-26",
    moduleKey: "pst123",
    citationMystere:
      "En France, la profession de psychologue du travail s'est construite de façon balkanisée au fil de luttes de juridiction face aux médecins du travail et aux directeurs du personnel.",
    auteurCorrect: "Thomas Le Bianic",
    optionsAuteurs: [
      "Thomas Le Bianic",
      "Renaud Sainsaulieu",
      "Johannes Siegrist",
      "Arlie Hochschild",
    ],
    anneeEtOuvrage: "Sciences de l'homme au travail au Cnam (2004)",
    pourquoiEssentiel:
      "Repère historique clé du Cnam et de la conquête du titre protégé (Loi 1985).",
  },
];

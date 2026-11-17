export interface CourantTheorique {
  id: string;
  nom: string;
  auteurs: string[];
  uePrincipale: string;
  accent: string;
  statutReel: string;
  collectifGenre: string;
  methodeIntervention: string;
  conflitCentral: string;
  questionExamen: string;
  piegeEviter: string;
}

export interface RegleOrTransversale {
  num: string;
  titre: string;
  regle: string;
}

export const COURANTS_THEORIQUES: CourantTheorique[] = [
  {
    id: "clinique-activite",
    nom: "Clinique de l'activité",
    auteurs: ["Yves Clot", "Dominique Lhuilier", "Lidia Prot"],
    uePrincipale: "PST106",
    accent: "#891B29",
    statutReel:
      "Le réel de l'activité déborde l'activité réalisée : c'est ce qui ne se fait pas, ce qu'on cherche à faire, ce qu'on fait pour ne pas faire ce qui est à faire. Le réel résiste et ouvre le pouvoir d'agir.",
    collectifGenre:
      "Le 'genre professionnel' est la mémoire impersonnelle du métier, ressource et boîte à outils pour le style personnel. Quand le genre est appauvri, le collectif devient mortifère.",
    methodeIntervention:
      "Auto-confrontation simple puis croisée (vidéo), Instruction au sosie (Oddone), mise en délibération des controverses de métier.",
    conflitCentral:
      "Conflit entre activité empêchée / contrariée et pouvoir d'agir ; tension entre genre (mémoire collective) et style (signature du sujet).",
    questionExamen:
      "« En quoi l'auto-confrontation croisée restaure-t-elle le pouvoir d'agir des professionnels face à un travail empêché ? »",
    piegeEviter:
      "Confondre activité réalisée (la trace visible) et réel de l'activité (l'ensemble des possibles et des empêchements).",
  },
  {
    id: "psychodynamique",
    nom: "Psychodynamique du travail",
    auteurs: ["Christophe Dejours", "Pascale Molinier", "Isabelle Gernet"],
    uePrincipale: "PST120",
    accent: "#7a5aa6",
    statutReel:
      "Le réel est ce qui se fait connaître à celui qui travaille par sa résistance à la maîtrise et au savoir. Il impose l'endurance de la souffrance et l'intelligence rusée (métis).",
    collectifGenre:
      "Le collectif repose sur des 'règles de métier' et des accords normatifs protecteurs. Construction de stratégies collectives de défense contre la souffrance (déni viril, cynisme).",
    methodeIntervention:
      "Enquête en psychodynamique du travail : espace de délibération collective fondé sur le volontariat, la levée des défenses et l'analyse de la parole partagée.",
    conflitCentral:
      "Conflit entre l'organisation prescrite du travail et la santé mentale ; dynamique souffrance ↔ plaisir conditionnée par la reconnaissance.",
    questionExamen:
      "« Analysez les deux formes du jugement dans la dynamique de la reconnaissance et leur impact sur le basculement pathologique. »",
    piegeEviter:
      "Réduire la souffrance au travail à un stress individuel ou biologique, en occultant les stratégies défensives collectives et la lutte pour la reconnaissance.",
  },
  {
    id: "ergonomie-activite",
    nom: "Ergonomie de langue française",
    auteurs: ["Alain Wisner", "Jacques Leplat", "François Daniellou"],
    uePrincipale: "PST106",
    accent: "#0e7c86",
    statutReel:
      "Disparité indépassable entre tâche (ce qui est prescrit par l'ingénieur/gestionnaire) et activité (ce que déploie l'opérateur en situation pour pallier les aléas).",
    collectifGenre:
      "Régulation collective des contraintes : le travail n'est jamais purement individuel, il s'inscrit dans un milieu de travail et une structure socio-technique.",
    methodeIntervention:
      "Analyse ergonomique du travail (AET) : observations systématiques en situation naturelle, verbalisations simultanées, chronogrammes, analyse des variabilités.",
    conflitCentral:
      "Écart tâche prescrite vs activité réelle ; inadéquation des dispositifs techniques et managériaux face aux charges physiques, cognitives et organisationnelles.",
    questionExamen:
      "« Pourquoi la tâche prescrite ne peut-elle jamais anticiper la totalité de l'activité de travail ? Développez les concepts de régulation et de variabilité. »",
    piegeEviter:
      "Considérer l'écart au prescrit comme une faute, une négligence ou une anomalie, alors qu'il est la condition même de la réussite de la production.",
  },
  {
    id: "historico-culturel",
    nom: "Clinique du dialogue & Approche historico-culturelle",
    auteurs: ["Lev Vygotski", "Mikhaïl Bakhtine", "John L. Austin"],
    uePrincipale: "PST108",
    accent: "#b0501e",
    statutReel:
      "Le langage n'est pas un code statique mais un instrument d'action sur autrui et sur soi (médiation sémiotique). La pensée ne s'exprime pas dans le mot, elle s'y accomplit.",
    collectifGenre:
      "Le genre discursif (Bakhtine) structure l'intercompréhension professionnelle. La controverse réglée permet d'élucider les malentendus de métier.",
    methodeIntervention:
      "Clinique du dialogue : analyse des échanges verbaux, autoconfrontation aux énoncés, méthode IOD (refus du tri, négociation sans faux-semblant).",
    conflitCentral:
      "Conflit entre langage institutionnel figé (monologique) et dialogisme vivant des opérateurs ; violence de l'injonction paradoxale.",
    questionExamen:
      "« En confrontant Austin et Bourdieu, montrez d'où provient l'efficacité performative d'un énoncé sur le lieu de travail. »",
    piegeEviter:
      "Croire que les problèmes d'organisation se résolvent par de la simple « communication bienveillante », sans toucher au cadre statutaire et au travail réel.",
  },
  {
    id: "sociologie-critique",
    nom: "Sociologie de l'identité & Domination symbolique",
    auteurs: ["Pierre Bourdieu", "Claude Dubar", "Renaud Sainsaulieu"],
    uePrincipale: "PST123",
    accent: "#b48325",
    statutReel:
      "Les identités professionnelles se construisent à l'intersection de deux transactions : transaction biographique (pour soi) et transaction relationnelle (par autrui et les institutions).",
    collectifGenre:
      "Les cultures d'atelier et modèles identitaires (fusionnel, affinitaire, négocié, retrait) façonnent le rapport au pouvoir et la solidarité au travail.",
    methodeIntervention:
      "Enquête sociologique et analyse qualitative des trajectoires professionnelles, déconstruction des violences symboliques et des catégorisations abusives.",
    conflitCentral:
      "Tension entre identité attribuée par l'institution (souvent stigmatisante) et identité revendiquée par le sujet ; blocage des promotions et des reconnaissances.",
    questionExamen:
      "« Pourquoi l'attribution de l'identité par les institutions ne peut-elle s'analyser en dehors des systèmes d'action et des rapports de force ? (Dubar) »",
    piegeEviter:
      "Considérer l'identité comme une essence psychologique figée plutôt que comme une négociation dialectique permanente.",
  },
  {
    id: "deontologie-ethique",
    nom: "Déontologie & Cadre Régalien de l'Intervention",
    auteurs: [
      "Code de Déontologie (1996/2021)",
      "Loi du 25 juillet 1985",
      "Thomas Le Bianic",
    ],
    uePrincipale: "PST123",
    accent: "#1e3a8a",
    statutReel:
      "Le psychologue n'est ni le bras armé de la direction ni l'avocat complaisant des salariés. Il fonde son mandat sur le consentement éclairé, le secret professionnel et la rigueur scientifique.",
    collectifGenre:
      "Préservation du collectif par la restitution partagée et le refus du tri ou de la sélection discriminatoire sous couvert de psychologie.",
    methodeIntervention:
      "Triangulation contractuelle (commanditaire / opérateurs / clinicien), contractualisation claire des limites de mission, restitution anonymisée sur le travail réel.",
    conflitCentral:
      "Conflit entre injonction managériale de normalisation (recherche de 'profils adaptés' ou coaching de souffrance individuelle) et éthique de l'émancipation collective.",
    questionExamen:
      "« Quelles sont les règles déontologiques cardinales garantissant l'indépendance du psychologue face à une commande de gestion du stress ? »",
    piegeEviter:
      "Accepter une mission sans clarifier au préalable que les conclusions porteront sur l'organisation et non sur la fragilité supposée des individus.",
  },
  {
    id: "techno-ergonomie",
    nom: "Psychologie Ergonomique des Transformations Digitales",
    auteurs: ["Pierre Rabardel", "Marc-Eric Bobillier Chaumon", "Fred Davis"],
    uePrincipale: "PST124",
    accent: "#059669",
    statutReel:
      "L'artefact technique (le logiciel, l'algorithme) ne devient un instrument psychologique que lorsque le sujet l'investit de schèmes d'action situés.",
    collectifGenre:
      "Les technologies numériques peuvent enrichir le collectif ou au contraire l'isoler par la traçabilité algorithmique et l'infobésité.",
    methodeIntervention:
      "Démarche d'acceptation située : co-conception avec les utilisateurs finaux, simulation sur prototypes réels, préservation des marges de manœuvre.",
    conflitCentral:
      "Conflit entre prescription automatisée invisible et pouvoir d'agir créatif des opérateurs ; technostress et surveillance numérique.",
    questionExamen:
      "« En vous appuyant sur Rabardel, distinguez artefact et instrument. Quelles sont les conséquences d'un déficit d'instrumentation dans le déploiement d'un ERP ? »",
    piegeEviter:
      "Réduire l'acceptabilité à une simple courbe de résistance au changement qu'il suffirait de vaincre par de la formation descendante.",
  },
];

export const REGLES_OR_TRANSVERSALES: RegleOrTransversale[] = [
  {
    num: "1",
    titre: "Éviter le syncrétisme naïf",
    regle:
      "Ne mélangez pas les méthodologies sans expliciter leur rupture épistémologique. La clinique de l'activité (Clot) vise le pouvoir d'agir par l'autoconfrontation vidéo ; la psychodynamique (Dejours) analyse la sublimation et les défenses collectives par la parole en groupe. On ne cherche pas des défenses pulsionnelles avec un sosie de Clot.",
  },
  {
    num: "2",
    titre: "L'écart Prescrit / Réel comme fil d'Ariane",
    regle:
      "C'est le concept universel qui traverse les 5 UE : Wisner en ergonomie (tâche vs activité), Clot en clinique (activité réalisée vs réel de l'activité), Dejours en psychodynamique (le réel qui résiste à la maîtrise), Austin/Bourdieu en langage (procédure formelle vs autorité réelle), et Rabardel en digital (logiciel prévu vs usages effectifs).",
  },
  {
    num: "3",
    titre: "Triangulation déontologique obligatoire",
    regle:
      "Dans toute copie ou étude de cas impliquant une demande de la direction (ex: absentéisme, RPS, réorganisation), refusez systématiquement la psychologisation individuelle. L'intervention du psychologue porte sur l'organisation du travail et la délibération collective, jamais sur l'adaptation des faibles.",
  },
  {
    num: "4",
    titre: "Faire dialoguer les auteurs plutôt que réciter",
    regle:
      "Les meilleures copies (16-19/20) mettent en scène une véritable controverse : posez Austin, puis critiquez-le avec Bourdieu ; analysez la souffrance avec Dejours, puis montrez comment Clot chercherait à relancer l'activité empêchée pour la transformer.",
  },
];

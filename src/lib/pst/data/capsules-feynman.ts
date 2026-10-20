/**
 * Capsules d'Apprentissage Express « L'Essentiel en 60 secondes » (Principe Feynman)
 * Synthèses ultra-visuelles, intuitives et mémorisables pour PST106, PST108 et PST123.
 */

export interface CapsuleFeynman {
  id: string;
  moduleKey: "pst106" | "pst108" | "pst120" | "pst123" | "pst124";
  titre: string;
  auteur: string;
  intuitionMetaphore: string;
  formuleMatrice: string;
  casReelApplication: string;
  piegeExamen: string;
  citationCle: string;
  motsObligatoires: string[];
}

export const CAPSULES_FEYNMAN: CapsuleFeynman[] = [
  // --- PST108 ---
  {
    id: "pst108-bourdieu-magistratus",
    moduleKey: "pst108",
    titre: "Status est magistratus & Le pouvoir des mots",
    auteur: "Pierre Bourdieu (1982)",
    intuitionMetaphore:
      "Le pouvoir ne sort pas de la bouche du locuteur, mais du chapeau de l'institution qui l'a nommé. Si un quidam dans la rue crie « la séance est ouverte », tout le monde rigole ; si le président du tribunal dit la même chose en robe d'hermine, tout le monde se lève.",
    formuleMatrice:
      "Compétence linguistique (technique) + Autorité institutionnelle (statut) = Efficacité performative",
    casReelApplication:
      "Le médecin du travail qui déclare un salarié « inapte » modifie légalement sa vie non par la beauté de son verbe, mais par la délégation de l'Ordre des médecins et du Code du travail.",
    piegeExamen:
      "Croire avec Austin que le pouvoir magique d'agir réside dans la phrase elle-même (illusion internaliste). Ne jamais oublier la maxime : « Status est magistratus ».",
    citationCle:
      "« Le pouvoir des mots n'est que le pouvoir délégué du porte-parole. » (Bourdieu, Ce que parler veut dire, 1982)",
    motsObligatoires: ["Status est magistratus", "illusion internaliste", "porte-parole", "marché linguistique", "violence symbolique"],
  },
  {
    id: "pst108-bourdieu-lit-justice",
    moduleKey: "pst108",
    titre: "Le Lit de Justice & L'Acte d'Institution",
    auteur: "Sarah Hanley & Pierre Bourdieu",
    intuitionMetaphore:
      "Le silence qui s'abat quand le roi entre dans la pièce. Le souverain n'a pas besoin de négocier : sa seule présence physique suspend la parole des magistrats et impose la loi sans réplique.",
    formuleMatrice:
      "Présence corporelle du souverain + Lit de justice = Extinction de la délibération parlementaire",
    casReelApplication:
      "Dans une entreprise, l'irruption soudaine du PDG en réunion d'équipe qui déclare : « Les arbitrages sont clos, on applique le plan lundi » réactive la mécanique royale du lit de justice.",
    piegeExamen:
      "Traiter le rituel comme un décor d'opéra sans importance : pour Bourdieu, le rituel est la machinerie même qui fabrique la croyance et l'obéissance.",
    citationCle:
      "« L'acte d'institution sépare, nomme et consacre. » (Bourdieu)",
    motsObligatoires: ["Lit de justice", "Sarah Hanley", "acte d'institution", "délégation", "suspension de la délibération"],
  },
  {
    id: "pst108-lucy-insulte",
    moduleKey: "pst108",
    titre: "L'Efficacité performative de l'insulte",
    auteur: "Éric Lucy (Empan, 2021)",
    intuitionMetaphore:
      "L'insulte n'est pas un pétard mouillé ni un caprice d'enfant : c'est une décharge électrique qui réactive des siècles de stigmates sociaux. Elle oppose la « grande gueule » du peuple qui refuse de s'écraser à la « fine bouche » bourgeoise de l'institution.",
    formuleMatrice:
      "Insulte = Acte de destitution (assigner autrui) + Acte de résistance (refus de la fine bouche) + Quête de reconnaissance",
    casReelApplication:
      "Un usager précaire à l'accueil qui hurle une injure contre l'institution : ce n'est pas une crise de nerfs, c'est l'usage du trivial pour forcer l'administration à le regarder en face.",
    piegeExamen:
      "Psychologiser l'insulte comme un 'manque de maîtrise de soi'. Il faut l'analyser sociologiquement comme une violence symbolique et un acte de langage performatif.",
    citationCle:
      "« L'insulte tire sa force performative des stigmates et rapports de domination déjà institués dans le champ social. » (Éric Lucy, 2021)",
    motsObligatoires: ["Efficacité performative", "Empan 2021", "hexis corporelle", "fine bouche vs grande gueule", "sceptre homérique", "stigmate"],
  },
  {
    id: "pst108-habermas-validite",
    moduleKey: "pst108",
    titre: "Les 4 Prétentions universelles à la validité",
    auteur: "Jürgen Habermas (1981)",
    intuitionMetaphore:
      "Le contrat de confiance invisible de toute conversation honnête : quand je vous parle, je m'engage implicitement sur 4 points (compréhensible, vrai, juste et sincère). Si je mens ou manipule, l'agir communicationnel s'effondre.",
    formuleMatrice:
      "Entente (Verständigung) = Intelligibilité (langue) + Vérité (faits) + Justesse (normes) + Sincérité (sujet)",
    casReelApplication:
      "« Vous devez travailler ce samedi pour sauver l'usine » : on conteste la vérité (le carnet est-il plein ?), la justesse (est-ce légal ?) ou la sincérité (n'est-ce pas pour verser des dividendes ?).",
    piegeExamen:
      "Confondre l'agir stratégique (manipuler autrui pour réussir son coup) avec l'agir communicationnel (chercher un accord loyal sur des arguments valides).",
    citationCle:
      "« Ne doit prévaloir dans l'espace public que la force sans violence du meilleur argument. » (Habermas, 1981)",
    motsObligatoires: ["Agir communicationnel", "Verständigung", "Intelligibilité", "Vérité", "Justesse", "Sincérité", "Principe D"],
  },
  {
    id: "pst108-honneth-reconnaissance",
    moduleKey: "pst108",
    titre: "Les 3 Sphères de la Reconnaissance & La Réification",
    auteur: "Axel Honneth (1992, 2007)",
    intuitionMetaphore:
      "L'être humain a trois piliers pour tenir debout : l'amour dans son lit (confiance), le droit dans la cité (respect), et l'utilité de son métier au travail (estime de soi). Casser un pilier, c'est détruire la personne.",
    formuleMatrice:
      "1. Amour ➔ Confiance en soi | 2. Droit ➔ Respect de soi | 3. Solidarité/Travail ➔ Estime de soi",
    casReelApplication:
      "Dans le SAMU social (Éric Lucy, 2020), s'asseoir à côté d'un sans-abri et l'appeler par son prénom brise son invisibilité et restaure son estime de soi.",
    piegeExamen:
      "Confondre les 3 formes de mépris : maltraitance physique (amour), déni de droits statutaires (droit), invisibilisation du travail (solidarité).",
    citationCle:
      "« La réification est un oubli de la reconnaissance originaire. » (Honneth, 2007)",
    motsObligatoires: ["3 Sphères", "Confiance en soi", "Respect de soi", "Estime de soi", "Réification", "Invisibilité", "Le noble nu devant ses domestiques"],
  },
  {
    id: "pst108-valls-iod",
    moduleKey: "pst108",
    titre: "La Méthode IOD : Insertion sans tri préalable",
    auteur: "Francis Valls & Denis Castra (2007)",
    intuitionMetaphore:
      "Cesser de réparer le chômeur, réparer le poste de travail ! L'insertion classique oblige l'exclu à faire 15 stages CV humiliants. IOD va voir le patron, négocie l'offre d'emploi et y place le candidat directement sans le mettre en concurrence.",
    formuleMatrice:
      "Refus du tri + Non-mise en concurrence + Action sur l'offre d'emploi = Accès direct au droit commun salarial",
    casReelApplication:
      "Un patron réclame un Bac+2 pour porter des cartons. Le médiateur IOD visite le quai, démontre que le poste demande de la ponctualité, et y fait embaucher un jeune sans diplôme avec tutorat.",
    piegeExamen:
      "Croire qu'IOD est un cabinet de recrutement qui prépare des candidats à passer des entretiens. IOD refuse le tri et intervient auprès des employeurs !",
    citationCle:
      "« L'insertion ne consiste pas à adapter sans fin l'exclu, mais à agir directement sur le milieu de travail. » (Valls & Castra, préface Robert Castel)",
    motsObligatoires: ["Méthode IOD", "Francis Valls", "Refus du tri préalable", "Ciblage déficitaire", "Action sur l'offre", "Robert Castel", "Désaffiliation"],
  },

  // --- PST106 ---
  {
    id: "pst106-wisner-ergonomie",
    moduleKey: "pst106",
    titre: "Prescrit vs Réel & Ergonomie de l'Activité",
    auteur: "Alain Wisner (Cnam)",
    intuitionMetaphore:
      "Le plan dessiné sur le papier par les ingénieurs (le travail prescrit) ne ressemble jamais au cambouis de l'atelier (le travail réel). Les salariés doivent tricher et inventer pour que la machine tourne malgré les pannes.",
    formuleMatrice:
      "Travail prescrit (tâche attendue par la hiérarchie) ≠ Travail réel (activité concrète déployée par l'opérateur)",
    casReelApplication:
      "Une infirmière qui doit poser 10 perfusions selon un protocole strict de 5 min mais qui doit calmer un patient angoissé et chercher du matériel manquant.",
    piegeExamen:
      "Considérer l'écart au prescrit comme une faute professionnelle ou une erreur. C'est l'essence même de l'activité humaine d'ajuster le réel !",
    citationCle:
      "« L'homme n'est pas une machine : le travail réel est toujours une ruse face aux défaillances de la prescription. » (Wisner)",
    motsObligatoires: ["Travail prescrit", "Travail réel", "Écart", "Ergonomie de l'activité", "Alain Wisner", "Régulation"],
  },
  {
    id: "pst106-clot-activite-empechee",
    moduleKey: "pst106",
    titre: "L'Activité empêchée & Le Travail bien fait",
    auteur: "Yves Clot (Clinique de l'activité, Cnam)",
    intuitionMetaphore:
      "Le chirurgien forcé d'opérer à la chaîne avec des scalpels émoussés. La souffrance ne vient pas de la fatigue, mais du sentiment d'avoir bâclé son ouvrage et trahi les règles de l'art.",
    formuleMatrice:
      "Activité réalisée (ce qui est fait) vs Le Réel de l'activité (ce qu'on aurait voulu faire, ce qu'on s'est retenu de faire) = Activité empêchée",
    casReelApplication:
      "Les facteurs à qui l'on chronomètre la tournée au GPS et qui ne peuvent plus discuter 2 minutes avec les personnes âgées isolées : souffrance éthique du travail empêché.",
    piegeExamen:
      "Réduire l'activité à ce que l'on voit avec une caméra (l'activité réalisée). Le réel de l'activité comprend l'activité contrariée, suspendue et rêvée.",
    citationCle:
      "« Ce qui fait souffrir, ce n'est pas tant le travail qu'on fait, que le travail qu'on ne peut pas faire. » (Yves Clot, Le travail à cœur, 2010)",
    motsObligatoires: ["Clinique de l'activité", "Activité empêchée", "Travail bien fait", "Réel de l'activité", "Auto-confrontation croisée", "Genre professionnel"],
  },
  {
    id: "pst106-dejours-souffrance",
    moduleKey: "pst106",
    titre: "Psychodynamique du Travail & Stratégies défensives",
    auteur: "Christophe Dejours (Cnam)",
    intuitionMetaphore:
      "Les ouvriers du bâtiment qui refusent de mettre leur harnais et se moquent de la peur du vide en buvant un coup ensemble. Ce n'est pas de l'inconscience, c'est une armure collective pour ne pas devenir fou d'angoisse.",
    formuleMatrice:
      "Endurance de la souffrance + Défenses collectives viriles + Reconnaissance (utilité & beauté) = Plaisir / Santé mentale",
    casReelApplication:
      "Le cynisme collectif des traders ou l'humour noir des urgentistes à l'hôpital : défenses psychologiques indispensables pour amortir le choc traumatique du réel.",
    piegeExamen:
      "Confondre le jugement d'utilité (porté par la hiérarchie sur l'efficacité) et le jugement de beauté (porté par les pairs sur les règles de l'art).",
    citationCle:
      "« Le travail n'est jamais neutre : il est soit facteur de décompensation psychopathologique, soit médiateur privilégié de la santé. » (Dejours, 1993)",
    motsObligatoires: ["Psychodynamique du travail", "Stratégies de défense", "Jugement d'utilité", "Jugement de beauté", "Sublimation", "Souffrance éthique"],
  },

  // --- PST123 ---
  {
    id: "pst123-dubar-double-transaction",
    moduleKey: "pst123",
    titre: "La Double Transaction Identitaire",
    auteur: "Claude Dubar (1991)",
    intuitionMetaphore:
      "L'identité est un tango à deux temps : d'un côté mon histoire que je me raconte dans ma tête (biographique / pour soi), de l'autre l'étiquette et le coefficient que la boîte me colle sur le front (relationnelle / pour autrui). Quand les deux se déchirent, c'est la crise identitaire.",
    formuleMatrice:
      "Transaction biographique (temps, continuité vs rupture) × Transaction relationnelle (espace, attribution vs appartenance) = Identité sociale",
    casReelApplication:
      "Un ouvrier hautement qualifié qui se vit subjectivement comme le garant de la qualité de l'usine, mais à qui la nouvelle direction colle une étiquette de 'bras interchangeable inadapté au numérique'.",
    piegeExamen:
      "Penser que l'identité pour soi est indépendante d'autrui : elle est toujours forgée en réponse, en miroir ou en révolte contre les actes d'attribution institutionnels.",
    citationCle:
      "« L'identité est le résultat d'une double transaction : biographique pour soi et relationnelle pour autrui. » (Claude Dubar, 1991)",
    motsObligatoires: ["Double transaction", "Identité pour soi", "Identité pour autrui", "Actes d'attribution", "Actes d'appartenance", "4 Formes (promotion, blocage, conversion, exclusion)"],
  },
  {
    id: "pst123-bourdieu-habitus",
    moduleKey: "pst123",
    titre: "L'Algorithme de Pierre Bourdieu & La Double Vérité",
    auteur: "Pierre Bourdieu (1980, 2013)",
    intuitionMetaphore:
      "L'ouvrier fier de son coup de main qui refuse de partir à l'heure et fignole sa pièce sans être payé. D'un point de vue objectif, le patron l'exploite ; d'un point de vue intime, l'ouvrier y investit son honneur et sa dignité (l'illusio).",
    formuleMatrice:
      "[(Dispositions + Capital) × Champ] = Habitus (Système de dispositions durables et transposables)",
    casReelApplication:
      "L'ingénieur passionné qui travaille 70h par semaine par fierté de concevoir un moteur parfait : sa grandeur subjective nourrit objectivement la rentabilité des actionnaires.",
    piegeExamen:
      "Oublier que la double vérité du travail n'est pas une simple hypocrisie : l'illusio est vitale pour la santé mentale du travailleur, même si elle masque la domination objective.",
    citationCle:
      "« La double vérité du travail : la vérité objective de l'exploitation économique est masquée par la vérité subjective de l'investissement passionné. » (Bourdieu)",
    motsObligatoires: ["[(Dispositions + Capital) × Champ] = Habitus", "4 Capitaux", "Illusio", "Double vérité du travail", "Violence symbolique", "Champ de luttes"],
  },
  {
    id: "pst123-sainsaulieu-pouvoir",
    moduleKey: "pst123",
    titre: "L'Identité au Travail : 4 Modèles de Pouvoir",
    auteur: "Renaud Sainsaulieu (1977)",
    intuitionMetaphore:
      "L'entreprise n'est pas juste un lieu où on gagne sa croûte, c'est une école de socialisation politique. Selon le pouvoir que notre poste nous donne, on devient soit solidaire en meute unie, soit replié chez soi, soit négociateur démocratique, soit courtisan.",
    formuleMatrice:
      "Accès au pouvoir dans l'atelier ➔ 4 Modèles : 1. Fusionnel (OS) | 2. Retrait (alimentaire) | 3. Négociateur (cadre/expert) | 4. Affinitaire (promotion)",
    casReelApplication:
      "Face à des primes individualisées, l'équipe d'atelier (modèle fusionnel) fait bloc et refuse pour préserver l'égalité de la bande, tandis que les techniciens (modèle négociateur) débattent de critères d'expertise.",
    piegeExamen:
      "Croire que les modèles relationnels dépendent de la psychologie des individus : pour Sainsaulieu, ils dépendent de l'organisation concrète du pouvoir et de la dépendance technique sur le poste.",
    citationCle:
      "« L'entreprise est un lieu d'apprentissage culturel et politique des relations humaines. » (Sainsaulieu, L'identité au travail, 1977)",
    motsObligatoires: ["L'Identité au travail", "4 Modèles relationnels", "Fusionnel", "Retrait", "Négociateur", "Affinitaire", "Accès au pouvoir"],
  },
  {
    id: "pst123-lebianic-deontologie",
    moduleKey: "pst123",
    titre: "Identité du Psychologue du Travail & Loi 1985",
    auteur: "Thomas Le Bianic & Code de Déontologie 2021",
    intuitionMetaphore:
      "Le psychologue n'est ni le bras armé de la DRH, ni le médecin des âmes souffrantes, ni le syndicaliste en colère. Il tient une posture d'indépendance clinique triangulée garantie par la loi de 1985.",
    formuleMatrice:
      "Titre protégé (Loi 25 juillet 1985) + Code révisé 2021 + Secret professionnel = Indépendance technique et clinique",
    casReelApplication:
      "Un DRH demande au psychologue les comptes-rendus des entretiens individuels d'un audit de climat social. Le psychologue refuse fermement en opposant le secret professionnel et le consentement éclairé.",
    piegeExamen:
      "Croire que le titre de psychologue a toujours été évident : Thomas Le Bianic a démontré la 'balkanisation' historique de la profession et les luttes de territoire face à la médecine du travail.",
    citationCle:
      "« Le psychologue fait respecter la spécificité de son exercice et son autonomie technique. Il refuse tout acte ou démarche qui compromettrait son indépendance professionnelle. » (Code de Déontologie révisé, 2021)",
    motsObligatoires: ["Loi du 25 juillet 1985", "Code de déontologie 2021", "Thomas Le Bianic", "Balkanisation", "Triangulation du mandat", "Secret professionnel"],
  },
  // --- NOUVELLES CAPSULES APPROFONDIES PST106, PST108, PST123 ---
  {
    id: "pst106-leplat-tache-activite",
    moduleKey: "pst106",
    titre: "Tâche prescrite vs Activité réelle & Régulation",
    auteur: "Jacques Leplat & Jean-Marie Hoc (1983)",
    intuitionMetaphore:
      "La recette de cuisine indique 'laisser mijoter 20 min à feu doux' (la tâche). En cuisine réelle, le cuisinier surveille la couleur, baisse le gaz car le fond attache, goûte et rajoute du sel (l'activité et la régulation).",
    formuleMatrice:
      "Tâche (But + Conditions externes prescrites) ➔ confrontation aux Conditions internes de l'opérateur (compétences, fatigue, âge) ➔ Activité réelle régulatrice.",
    casReelApplication:
      "Un cariste qui réaménage son circuit dans l'entrepôt face à des cartons mal empilés qui bouchent l'allée réglementaire : il régule pour préserver la sécurité et la cadence.",
    piegeExamen:
      "Définir l'activité comme une simple exécution de la tâche : l'activité est toujours une réorganisation adaptative face à la variabilité du réel.",
    citationCle:
      "« La tâche est ce qui est à faire ; l'activité est ce qui se fait par un opérateur singulier dans une situation déterminée. » (Leplat & Hoc, 1983)",
    motsObligatoires: ["Tâche prescrite", "Activité réelle", "Régulation ergonomique", "Conditions internes", "Conditions externes", "Compromis opératoire"],
  },
  {
    id: "pst106-clot-genre-style",
    moduleKey: "pst106",
    titre: "Genre professionnel vs Style personnel",
    auteur: "Yves Clot (1999, Le travail sans l'homme ?)",
    intuitionMetaphore:
      "La langue française et le style d'un écrivain. La langue et sa grammaire sont partagées par tous les francophones (le genre professionnel). Mais chaque grand auteur y apporte sa touche unique et sa signature (le style).",
    formuleMatrice:
      "Genre professionnel (mémoire collective du collectif, règles officieuses) + Retouche singulière de l'opérateur = Style personnel qui revitalise le genre.",
    casReelApplication:
      "Les gestes de sécurité tacites transmis par les anciens maçons aux apprentis pour poser des parpaings sans s'abîmer le dos (le genre), que le jeune maçon adapte à sa propre taille (le style).",
    piegeExamen:
      "Confondre le genre professionnel avec les consignes de sécurité écrites par la direction : le genre est informel, vivant, et appartient exclusivement au collectif de pairs.",
    citationCle:
      "« Le genre est le travail d'autrui dans mon travail. Le style est la métamorphose singulière du genre dans la situation vécue. » (Yves Clot)",
    motsObligatoires: ["Genre professionnel", "Style personnel", "Collectif de pairs", "Mémoire collective", "Affaiblissement du genre", "Clinique de l'activité"],
  },
  {
    id: "pst106-dejours-reconnaissance-jugements",
    moduleKey: "pst106",
    titre: "Les Deux Jugements de la Reconnaissance",
    auteur: "Christophe Dejours (1998, Souffrance en France)",
    intuitionMetaphore:
      "Un chirurgien qui réussit une opération délicate : il a besoin que le directeur de l'hôpital reconnaisse son utilité médico-économique (jugement d'utilité), mais il a surtout besoin que ses confrères confirment qu'il a opéré dans les règles de l'art (jugement de beauté).",
    formuleMatrice:
      "Reconnaissance de l'effort et de la souffrance = 1. Jugement d'utilité (par la hiérarchie et les bénéficiaires) + 2. Jugement de beauté/conformité aux règles de l'art (exclusivement par les pairs).",
    casReelApplication:
      "Une infirmière qui reçoit des félicitations du cadre pour le nombre de prises de sang (utilité), mais qui se sent dévalorisée parce que ses collègues savent qu'elle a dû bâcler la relation d'écoute aux patients.",
    piegeExamen:
      "Penser que la reconnaissance peut être uniquement financière ou hiérarchique : sans le jugement de beauté des pairs sur la qualité du travail, il n'y a pas de construction d'identité professionnelle.",
    citationCle:
      "« Le jugement de beauté ne peut être porté que par les pairs, car eux seuls connaissent les difficultés réelles de l'exercice du métier. » (Christophe Dejours)",
    motsObligatoires: ["Jugement d'utilité", "Jugement de beauté", "Règles de l'art", "Pairs", "Gratification symbolique", "Sublimation de la souffrance"],
  },
  {
    id: "pst108-habermas-strategique",
    moduleKey: "pst108",
    titre: "Agir Communicationnel vs Agir Stratégique",
    auteur: "Jürgen Habermas (1981, Théorie de l'agir communicationnel)",
    intuitionMetaphore:
      "Deux personnes qui s'assoient pour discuter sincèrement et trouver ensemble la meilleure solution (agir communicationnel) vs un commercial qui flatte un client avec des arguments préparés pour lui soutirer une signature (agir stratégique).",
    formuleMatrice:
      "Agir Stratégique (Orientation vers le succès individuel / manipulation) VS Agir Communicationnel (Orientation vers l'entente coopérative libre par la discussion rationnelle).",
    casReelApplication:
      "Une réunion de 'concertation' où le management a déjà décidé de la réorganisation et fait semblant d'écouter les salariés (agir stratégique masqué) vs un vrai débat d'arbitrage sur les outils de travail.",
    piegeExamen:
      "Croire que l'agir communicationnel interdit le désaccord : c'est au contraire l'acceptation de la controverse réglée où seul le meilleur argument l'emporte, sans pression hiérarchique.",
    citationCle:
      "« L'agir communicationnel repose sur la recherche désintéressée d'une entente mutuelle exempte de contrainte. » (Jürgen Habermas)",
    motsObligatoires: ["Agir communicationnel", "Agir stratégique", "Agir stratégique masqué", "Entente rationnelle (Verständigung)", "Espace public délibératif", "Prétentions à la validité"],
  },
  {
    id: "pst123-castel-desaffiliation",
    moduleKey: "pst123",
    titre: "La Dynamique de la Désaffiliation (3 Zones)",
    auteur: "Robert Castel (1995, Les Métamorphoses de la question sociale)",
    intuitionMetaphore:
      "Une barque amarrée par deux cordes : l'une est le travail stable, l'autre est le réseau familial/amical. Si une corde casse, la barque tangue (vulnérabilité). Si les deux cordes rompent, elle part à la dérive (désaffiliation).",
    formuleMatrice:
      "3 Zones sociales : 1. Zone d'intégration (CDI + insertion relationnelle) | 2. Zone de vulnérabilité (précarité d'emploi + fragilité relationnelle) | 3. Zone de désaffiliation (chômage longue durée + rupture des liens).",
    casReelApplication:
      "Un travailleur intérimaire qui perd sa mission, divorce et se retrouve isolé en foyer d'hébergement : basculement de la vulnérabilité vers la désaffiliation totale.",
    piegeExamen:
      "Utiliser le terme 'exclusion' de manière statique : Castel montre que c'est un processus dynamique de décrochage lié à l'effritement de la société salariale, et non un trait individuel.",
    citationCle:
      "« La désaffiliation n'est pas un état de marginalité, mais la trajectoire de rupture conjointe du travail stable et du réseau relationnel. » (Robert Castel, 1995)",
    motsObligatoires: ["Désaffiliation", "Zone d'intégration", "Zone de vulnérabilité", "Effritement de la société salariale", "Double rupture (travail + liens)", "Droit commun"],
  },
];

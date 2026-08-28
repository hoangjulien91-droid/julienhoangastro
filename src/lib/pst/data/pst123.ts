/**
 * Bases de données pour le module PST123.
 * Extrait automatiquement de src/pages/pst123.astro.
 */

import type { CaseItem, ProtoStep, RedacItem } from "@/lib/pst/types";

export const A = {
  deontologie: "Cadre déontologique",
  mandat: "Le Mandat",
  triangulation: "La triangulation",
  transitions: "Transitions & BC",
  rps: "Santé & RPS",
};

export const FICHES = [
  {
    a: "deontologie",
    t: "Séance 1 : Évolution de la profession et cadre réglementaire",
    ess: "<h5>Protection du Titre</h5><p>L'usage du titre de psychologue est protégé par la <b>loi de 1985</b>. L'inscription au répertoire <b>ADELI/RPPS</b> est obligatoire pour exercer légalement.</p><h5>RGPD et données</h5><p>Règles strictes sur les dossiers psychologiques : conservation minimale nécessaire, droit d'accès et droit à l'oubli des sujets évalués.</p>",
    ph: "L'usage du titre de psychologue est protégé par la loi de 1985.",
    ex: "Vérifier le numéro ADELI d'un psychologue recruté dans un service de santé au travail.",
    trap: "Penser que n'importe quel consultant RH ou coach peut s'attribuer le titre de psychologue du travail.",
  },
  {
    a: "deontologie",
    t: "Séance 2 : Le Code de Déontologie face à l'entreprise",
    ess: "<h5>Indépendance professionnelle</h5><p>Le psychologue choisit ses méthodes et outils en toute autonomie. Son employeur ne peut lui imposer un test ou une conclusion.</p><h5>But assigné</h5><p>L'intervention doit être menée dans un but éthique. Le psychologue refuse d'utiliser ses outils pour justifier des licenciements ou du tri social.</p>",
    ph: "Le psychologue ne peut être contraint dans ses méthodes, même par son employeur.",
    ex: "Refuser d'utiliser un test de personnalité pour établir une liste de licenciements économiques.",
    trap: "Croire que le secret professionnel peut être levé sous la pression hiérarchique du DRH.",
  },
  {
    a: "deontologie",
    t: "Séance 3 : Spécificité face à la concurrence interprofessionnelle",
    ess: "<h5>Frontières floues</h5><p>Porosité avec les consultants, coachs ou managers RH. La ligne de démarcation réside dans la formation universitaire scientifique et le code déontologique.</p><h5>Démarche systémique</h5><p>Là où le coach vise souvent l'adaptation individuelle du sujet, le psychologue analyse les déterminants organisationnels et sociaux du travail.</p>",
    ph: "Le psychologue se distingue par son analyse systémique et déontologique du travail.",
    ex: "Expliquer à un manager que le stress d'un salarié relève d'une surcharge organisationnelle et non d'une fragilité personnelle.",
    trap: "Assimiler le rôle du psychologue du travail à du coaching de performance individuelle.",
  },
  {
    a: "mandat",
    t: "Séance 4 : De la Demande au Mandat",
    ess: "<h5>Savoir dire non</h5><p>Le psychologue doit savoir refuser une intervention si le cadre éthique ou déontologique n'est pas réuni.</p><h5>Négociation du cadre</h5><p>Transformer la demande brute (plainte du client) en un mandat contractuel co-construit définissant les limites et les objectifs de l'intervention.</p>",
    ph: "Le mandat contractualise l'indépendance du psychologue face à la demande.",
    ex: "Négocier avec la direction d'enquêter sur l'organisation du travail et non sur la seule fragilité d'un salarié ciblé.",
    trap: "Accepter une commande RH brute sans analyser les enjeux de pouvoir cachés.",
  },
  {
    a: "mandat",
    t: "Séance 5 : La clinique de l'entretien",
    ess: "<h5>Outil central</h5><p>L'entretien clinique est l'espace de recueil de la subjectivité. Le psychologue gère différents entretiens : de demande, clinique, d'orientation, de restitution.</p><h5>Restitution éthique</h5><p>Le retour compréhensible des résultats au sujet est une exigence déontologique majeure.</p>",
    ph: "L'entretien clinique du travail explore le rapport subjectif au travail réel.",
    ex: "Mener un entretien d'explicitation avec un salarié pour comprendre ses arbitrages face aux consignes.",
    trap: "Réduire l'entretien à une simple grille de questions-réponses standardisée.",
  },
  {
    a: "mandat",
    t: "Séance 6 : Tests, psychométrie et évaluation",
    ess: "<h5>Rigueur scientifique</h5><p>Les tests doivent présenter des qualités métrologiques validées (fidélité, sensibilité, validité, étalonnage).</p><h5>Limites de l'évaluation</h5><p>On évalue l'adéquation dynamique entre un sujet et une situation de travail donnée, jamais une personnalité dans l'absolu.</p>",
    ph: "Les tests mesurent une adéquation dynamique situationnelle, pas une essence.",
    ex: "Anonymiser rigoureusement les protocoles de tests d'aptitudes avant archivage.",
    trap: "Croire qu'un test de personnalité peut prédire à 100% l'adaptation d'un candidat sans entretien clinique.",
  },
  {
    a: "transitions",
    t: "Séance 7 : Le Recrutement, l'Évaluation et la GPEC",
    ess: "<h5>Postures de sélection</h5><p>Le psychologue défend l'entretien clinique face à l'automatisation et aux algorithmes de sélection.</p><h5>Éthique du tri</h5><p>Critique des Assessment Centers et de l'usage dévoyé des tests d'aptitudes qui réduisent l'humain à des compétences standardisées.</p>",
    ph: "L'entretien de recrutement doit rester un espace clinique d'échange bilatéral.",
    ex: "Refuser l'utilisation d'un algorithme de tri automatique des CV sans examen humain.",
    trap: "Considérer la GPEC comme une simple gestion comptable des flux de ressources humaines.",
  },
  {
    a: "transitions",
    t: 'Séance 8 : Restructurations et "Clinique du changement"',
    ess: "<h5>Accompagner les pertes</h5><p>Les plans de sauvegarde de l'emploi (PSE) provoquent des deuils professionnels et le syndrome du survivant (culpabilité de ceux qui restent).</p><h5>Change Management vs Clinique</h5><p>Le Change Management force l'acceptation. La clinique analyse les impacts réels sur l'identité de métier.</p>",
    ph: "La clinique du changement analyse les deuils professionnels et le travail réel.",
    ex: "Animer un groupe de parole pour les salariés restants après un licenciement collectif massif.",
    trap: "Réduire l'accompagnement d'une fusion d'entreprises à des techniques de communication pour forcer l'acceptation.",
  },
  {
    a: "transitions",
    t: "Séance 9 : Le Bilan de Compétences",
    ess: "<h5>Transition et Sens</h5><p>Le BC est un espace clinique régi par la loi de 1991. Il vise à redonner du pouvoir d'agir au sujet sur son parcours.</p><h5>Au-delà du matching</h5><p>Il ne s'agit pas de faire du placement de CV, mais d'élaborer l'histoire professionnelle et personnelle du sujet.</p>",
    ph: "Le Bilan de Compétences est un outil d'émancipation et de transition clinique.",
    ex: "Accompagner un salarié en reconversion suite à un burn-out pour l'aider à reconstruire son projet professionnel.",
    trap: "Traiter le Bilan de Compétences comme un simple audit de savoir-faire techniques.",
  },
  {
    a: "transitions",
    t: "Séance 10 : L'Insertion professionnelle et le Chômage",
    ess: "<h5>Identité brisée</h5><p>Le chômage prolongé fragilise l'identité sociale et psychique. L'insertion nécessite de restaurer le sentiment d'utilité.</p><h5>Accompagnement spécifique</h5><p>Travail mené auprès de France Travail ou des Missions Locales pour redonner du pouvoir d'agir.</p>",
    ph: "L'accompagnement à l'insertion doit restaurer la dignité et l'identité du sujet.",
    ex: "Créer des ateliers collectifs d'élaboration de projets pour jeunes décrocheurs scolaires.",
    trap: "Croire que l'insertion professionnelle n'est qu'une affaire de correction de CV et de techniques d'entretien.",
  },
  {
    a: "rps",
    t: "Séance 11 : Les fondations théoriques des RPS",
    ess: "<h5>Modèle de Karasek</h5><p>Job Strain (tension au travail) = Exigences psychologiques élevées + Faible latitude décisionnelle. Le soutien social agit comme modérateur.</p><h5>Modèle de Siegrist</h5><p>Déséquilibre Efforts (temps, énergie) / Récompenses (estime, salaire, sécurité). Générateur de risques cardio-vasculaires.</p>",
    ph: "Le Job Strain de Karasek croise exigences et latitude décisionnelle.",
    ex: "Calculer l'indice de tension au travail d'une équipe de téléconseillers pour objectiver le stress.",
    trap: "Oublier le rôle modérateur du soutien social (exogène et endogène) dans le modèle de Karasek.",
  },
  {
    a: "rps",
    t: "Séance 12 : Lecture critique des démarches RPS",
    ess: "<h5>Limites du quanti</h5><p>Les questionnaires cartographient mais n'expliquent pas. L'approche qualitative (entretiens, observations) est indispensable pour comprendre le réel.</p><h5>Psychologisation</h5><p>Critique de la QVT superficielle (baby-foot, relaxation) qui adapte l'individu à un milieu toxique au lieu de transformer le travail (prévention primaire).</p>",
    ph: "La prévention primaire transforme le travail réel, la QVT psychologise le problème.",
    ex: "Négocier l'allègement des cadences (primaire) au lieu d'installer des séances de sophrologie (tertiaire).",
    trap: "Limiter un diagnostic RPS à la simple passation d'un questionnaire standardisé sans phase d'entretiens.",
  },
  {
    a: "sante",
    t: "Séance 13 : Les Services de Prévention et de Santé au Travail (SPSTI)",
    ess: "<h5>Interdisciplinarité</h5><p>Le psychologue collabore avec le médecin du travail (secret partagé), l'ergonome et l'ingénieur HSE.</p><h5>Statut de salarié externe</h5><p>Le statut de salarié d'un SPSTI externe renforce l'indépendance professionnelle face à l'entreprise cliente.</p>",
    ph: "Le psychologue en SPSTI collabore en interdisciplinarité sous secret partagé.",
    ex: "Mener une intervention coordonnée avec l'ergonome pour réaménager les postes d'un atelier de conditionnement.",
    trap: "Transmettre des données médicales ou psychologiques nominatives à la direction de l'entreprise cliente.",
  },
  {
    a: "sante",
    t: "Séance 14 : Le psychologue expert auprès des IRP",
    ess: "<h5>Cadre de l'expertise</h5><p>Expertise mandatée par le CSE en cas de risque grave ou de projet de transformation importante.</p><h5>Postures et tensions</h5><p>Fournir un rapport scientifique indépendant. Posture d'équilibriste entre les syndicats (agenda politique) et la direction.",
    ph: "L'expertise CSE requiert une indépendance scientifique absolue face aux agendas politiques.",
    ex: "Rendre un rapport d'expertise objectivant l'impact d'un plan de déménagement sur la santé des équipes.",
    trap: "Prendre parti politiquement pour les syndicats dans la rédaction du rapport d'expertise technique.",
  },
];

export const KW_DEFS = {
  psychotechnique:
    "Courant historique (Lahy, Toulouse) appliquant la psychologie expérimentale au travail : mesure des aptitudes pour la sélection.",
  aptitudes:
    "Capacités individuelles mesurées par la psychotechnique pour placer « le bon travailleur au bon poste ».",
  "mutilation de la subjectivité":
    "Atteinte au sujet lorsque le travail parcellisé l'empêche d'investir son intelligence et son désir.",
  "déterminants organisationnels":
    "Facteurs liés à l'organisation du travail (charge, autonomie, soutien) à l'origine des RPS, au-delà des fragilités individuelles.",
  "loi de 1985":
    "Loi du 25 juillet 1985 protégeant en France l'usage professionnel du titre de psychologue.",
  "code de déontologie":
    "Cadre éthique de la profession : respect de la personne, secret professionnel, indépendance, consentement éclairé.",
  "demande brute":
    "Requête initiale du commanditaire, à analyser et reformuler avant toute intervention (≠ besoin réel).",
  triangulation:
    "Cadre d'intervention à trois : psychologue, commanditaire/prescripteur et sujet évalué, avec gestion des intérêts divergents.",
  "consentement libre et éclairé":
    "Accord du sujet donné en connaissance de l'objectif, du commanditaire et de la destination des résultats.",
  mandat:
    "Cadre contractualisé de l'intervention (objectifs, méthodes, livrables, règles déontologiques) négocié avec le prescripteur.",
  "but assigné":
    "Objectif fixé par l'organisation (tâche prescrite), distinct de l'activité réelle déployée par le sujet.",
  "travail réel":
    "Ce que le sujet déploie effectivement pour faire face aux aléas, au-delà de la tâche prescrite.",
  "job strain":
    "Tension au travail (Karasek) : croisement d'exigences psychologiques élevées et d'une faible latitude décisionnelle.",
  "approche qualitative":
    "Méthode centrée sur le sens et l'expérience (entretiens, observation), complémentaire des mesures quantitatives.",
  "médecin du travail":
    "Acteur du suivi médical et de l'aptitude, soumis au secret médical, au cadre distinct de celui du psychologue.",
  "secret médical partagé":
    "Partage encadré d'informations médicales entre professionnels de santé, dans l'intérêt et avec l'accord du sujet.",
  "comité social et économique":
    "CSE (ex-CHSCT) : instance représentative du personnel pouvant porter une demande d'intervention sur les conditions de travail.",
  "espace de délibération":
    "Lieu où le collectif discute des critères du travail bien fait et reconstruit des règles communes.",
};

export const PARCOURS = [
  {
    key: "fondements",
    titre: "1. Fondements Déontologiques",
    fenetre: "J-30 → J-20",
    but: "Poser les bases éthiques indispensables et le vocabulaire réglementaire.",
    onglets: [
      ["lexique", "Lexique interactif →"],
      ["cartes", "Flashcards Leitner →"],
      ["outils", "Explorateur Déontologie →"],
    ],
    taches: [
      "Obtenir plus de 80% au Lexique en mode test",
      "Classer toutes les Flashcards en boîte Leitner 1 ou 2",
      "Rechercher 3 termes dans l'Explorateur de déontologie",
    ],
  },
  {
    key: "posture",
    titre: "2. Posture & Triangulation",
    fenetre: "J-20 → J-10",
    but: "Savoir analyser la demande et se positionner face à l'institution.",
    onglets: [
      ["cas", "Étude de cas guidée →"],
      ["protocole", "Chronologie d'enquête →"],
      ["debats", "Débats transversaux →"],
    ],
    taches: [
      "Résoudre le cas clinique guidé sans erreur",
      "Remettre en ordre les 7 étapes du protocole d'enquête",
      "Parcourir et valider les 4 débats transversaux",
    ],
  },
  {
    key: "champs",
    titre: "3. Champs d'Application & RPS",
    fenetre: "J-10 → J-3",
    but: "Maîtriser les théories de la santé au travail et les risques psychosociaux.",
    onglets: [
      ["qcm", "QCM interactif →"],
      ["pieges", "Pièges d'examen V/F →"],
      ["outils", "Comparateur Clinique →"],
    ],
    taches: [
      "Valider le QCM interactif à plus de 85%",
      "Distinguer les pièges V/F d'examen sans erreur",
      "Consulter les contrastes dans le Comparateur clinique d'examen",
    ],
  },
  {
    key: "examen",
    titre: "4. Entraînement Final & Rédaction",
    fenetre: "J-3 → J-1",
    but: "Composer en conditions réelles et affiner sa plume clinique.",
    onglets: [
      ["exam", "Simulateur d'Examen Blanc →"],
      ["antiseche", "Fiche Antisèche A4 →"],
      ["recits", "Récits interactifs →"],
    ],
    taches: [
      "Simuler un examen blanc complet (45 ou 90 minutes)",
      "Relire et imprimer l'antisèche condensée",
      "Maîtriser au moins 3 Récits interactifs (100% de mots-clés)",
    ],
  },
];

export const RECITS = [
  {
    a: "deontologie",
    ic: "🔬",
    t: "La rupture épistémologique de la posture",
    sub: "De la psychotechnique instrumentale à l'exercice clinique indépendant",
    parts: [
      {
        beat: "L'essor de la psychotechnique",
        html: "La psychologie du travail s'est historiquement structurée autour de la <span class='kw'>psychotechnique</span>. Portée par des pionniers comme Jean-Maurice Lahy et Toulouse au début du XXe siècle, elle visait à appliquer des mesures psychométriques et physiologiques en laboratoire pour évaluer les <span class='kw'>aptitudes</span> des ouvriers. L'objectif était d'optimiser l'adéquation de l'homme à sa machine.",
      },
      {
        beat: "La critique des cliniciens",
        html: "Cette approche positiviste, inféodée à l'organisation scientifique du travail (Taylorisme), a rapidement suscité des critiques. Des figures comme Henri Wallon ont dénoncé l'usure nerveuse et la <span class='kw'>mutilation de la subjectivité</span> du travailleur. La transition vers la psychologie clinique contemporaine a exigé de rompre avec cette posture d'instrument d'adaptation au profit d'une analyse des <span class='kw'>déterminants organisationnels</span>.",
      },
      {
        beat: "Le cadre déontologique moderne",
        html: "Aujourd'hui, l'usage du titre est protégé par la <span class='kw'>loi de 1985</span> et requiert l'inscription au répertoire ADELI/RPPS. Le psychologue n'est plus un technicien de la sélection mais un praticien guidé par le <span class='kw'>code de déontologie</span>, qui garantit l'indépendance de ses méthodes et le respect des droits fondamentaux des salariés.",
      },
    ],
  },
  {
    a: "mandat",
    ic: "📋",
    t: "La négociation éthique du mandat",
    sub: "De l'analyse de la demande brute à la contractualisation du cadre",
    parts: [
      {
        beat: "La demande brute de l'institution",
        html: "Le psychologue du travail est fréquemment sollicité par une direction (DRH, DG) exprimant une <span class='kw'>demande brute</span> d'évaluation ou de gestion de crise (ex. 'gérer le stress' d'un salarié). Cette demande est souvent sous-tendue par une volonté de psychologiser ou d'individualiser des dysfonctionnements qui relèvent en réalité de l'organisation.",
      },
      {
        beat: "La régulation de la triangulation",
        html: "Pour éviter d'être instrumentalisé, le psychologue doit clarifier la <span class='kw'>triangulation</span> qui s'établit entre le prescripteur (qui commande et paie), le sujet (le salarié) et lui-même. Il doit poser les conditions éthiques de son intervention : l'anonymat, le secret professionnel et le <span class='kw'>consentement libre et éclairé</span> du sujet évalué.",
      },
      {
        beat: "La construction du mandat",
        html: "Le passage de la demande au <span class='kw'>mandat</span> consiste à reformuler l'intervention pour en faire un contrat de travail co-construit. Ce mandat formalise le respect du principe du <span class='kw'>but assigné</span>, garantissant que les données recueillies ne seront jamais détournées pour du tri social ou des licenciements, et stipule l'obligation d'une restitution collective.",
      },
    ],
  },
  {
    a: "evaluation",
    ic: "⚖️",
    t: "L'évaluation psychométrique et ses dérives",
    sub: "Critique de la GPEC individualisée et limites du diagnostic quantitatif",
    parts: [
      {
        beat: "La dérive comptable de la GPEC",
        html: "La Gestion Prévisionnelle des Emplois et des Compétences (GPEC) et les Assessment Centers tendent à réduire le salarié à un portefeuille de compétences mesurables. L'utilisation d'algorithmes et de tests de personnalité occulte le <span class='kw'>travail réel</span> au profit d'un matching quantitatif standardisé, créant des risques de discrimination et de perte de sens.",
      },
      {
        beat: "Les limites du quantitatif RPS",
        html: "Face aux risques psychosociaux, la direction impose souvent des questionnaires quantitatifs (ex. Karasek ou Siegrist). Si l'indice de <span class='kw'>Job Strain</span> (croisant exigences élevées et faible latitude) objective l'existence d'une tension, il est incapable d'expliquer les déterminants subjectifs de la souffrance. Le questionnaire cartographie mais ne soigne pas.",
      },
      {
        beat: "La clinique qualitative comme alternative",
        html: "Le clinicien doit opposer à la psychologisation et à la QVT cosmétique (ex. sophrologie, conciergerie) une véritable prévention primaire. Cela passe par une <span class='kw'>approche qualitative</span> (entretiens cliniques et observations de l'activité) visant à restaurer le pouvoir d'agir et à agir sur l'organisation du travail elle-même.",
      },
    ],
  },
  {
    a: "sante",
    ic: "🛠️",
    t: "Interdisciplinarité et partenaires sociaux",
    sub: "L'action clinique au sein du SPSTI et la mobilisation des IRP",
    parts: [
      {
        beat: "Le positionnement en SPSTI",
        html: "Dans les Services de Prévention et de Santé au Travail Interentreprises (SPSTI), le psychologue intervient en interdisciplinarité avec le <span class='kw'>médecin du travail</span>, l'ergonome et l'ingénieur HSE. Son positionnement est protégé par son extériorité et le partage des informations sous le sceau du <span class='kw'>secret médical partagé</span>.",
      },
      {
        beat: "L'expertise pour le CSE",
        html: "Lorsque la direction s'oppose à une intervention clinique collective, le psychologue peut être sollicité comme expert par le <span class='kw'>Comité Social et Économique</span> (CSE) au titre d'un risque grave constaté. Cette expertise réglementée permet d'enquêter de droit au sein de l'entreprise pour analyser les impacts organisationnels.",
      },
      {
        beat: "L'espace de délibération collective",
        html: "Le rôle final du psychologue du travail est de co-construire des préconisations basées sur le travail réel. Il s'agit de favoriser la réouverture d'un <span class='kw'>espace de délibération</span> collective sur la qualité du travail, permettant aux salariés de peser à nouveau sur les décisions stratégiques qui impactent leur santé.",
      },
    ],
  },
];

export const QCM_BANK = [
  {
    q: "La loi de 1985 en France régit :",
    opts: [
      "La création de la médecine du travail",
      "La protection de l'usage professionnel du titre de psychologue",
      "La durée légale de conservation des dossiers psychologiques",
    ],
    ok: 1,
    expl: "La loi du 25 juillet 1985 protège le titre de psychologue en France, interdisant son usage illégal.",
  },
  {
    q: "Qui est concerné par la triangulation déontologique en psychologie du travail ?",
    opts: [
      "Le psychologue, le DRH et le médecin du travail",
      "Le psychologue, le commanditaire (prescripteur) et le sujet (le salarié)",
      "Le psychologue, le salarié et les instances de l'État",
    ],
    ok: 1,
    expl: "La triangulation désigne le cadre d'intervention à trois : le psychologue, le payeur/prescripteur, et le sujet de l'évaluation.",
  },
  {
    q: "Dans l'analyse de Karasek, quel croisement définit le Job Strain ?",
    opts: [
      "Efforts élevés et faibles récompenses",
      "Exigences psychologiques élevées et faible latitude décisionnelle",
      "Soutien social faible et temps de travail élevé",
    ],
    ok: 1,
    expl: "Le Job Strain (tension au travail) résulte du croisement d'exigences psychologiques élevées et d'une latitude décisionnelle basse.",
  },
  {
    q: "Quelle est la règle déontologique concernant la restitution des tests psychométriques ?",
    opts: [
      "Le psychologue doit restituer de manière compréhensible les résultats au sujet évalué avant toute transmission.",
      "Le psychologue envoie directement les scores bruts au DRH par souci d'efficacité.",
      "La restitution est facultative si le salarié a signé une décharge.",
    ],
    ok: 0,
    expl: "La restitution compréhensible des résultats au sujet évalué est un droit strict du salarié et un devoir déontologique absolu.",
  },
  {
    q: "Le secret professionnel du psychologue face au commanditaire impose de :",
    opts: [
      "Transmettre l'intégralité des comptes rendus d'entretien au DRH",
      "Ne transmettre qu'un avis pertinent à la décision, sans divulguer le contenu intime des échanges",
      "Refuser systématiquement toute communication au commanditaire",
    ],
    ok: 1,
    expl: "Le psychologue communique une conclusion utile à la décision (ex. avis sur l'adéquation), sans livrer le matériel clinique confidentiel.",
  },
  {
    q: "Le modèle de Siegrist (déséquilibre efforts/récompenses) met l'accent sur :",
    opts: [
      "Le croisement exigences / latitude décisionnelle",
      "Le déséquilibre entre les efforts fournis et les récompenses (salaire, estime, statut) reçues",
      "La seule charge physique de travail",
    ],
    ok: 1,
    expl: "Siegrist analyse les RPS par le déséquilibre entre efforts (extrinsèques et intrinsèques) et récompenses, complétant le modèle de Karasek.",
  },
  {
    q: "Le consentement éclairé du sujet évalué suppose qu'il connaisse, avant l'évaluation :",
    opts: [
      "L'objectif, le commanditaire et la destination des résultats",
      "Uniquement la durée de la passation",
      "Le barème exact de notation des tests",
    ],
    ok: 0,
    expl: "Le consentement éclairé exige la transparence sur la finalité, le prescripteur et l'usage des résultats : pas d'évaluation à l'insu du sujet.",
  },
  {
    q: "En psychologie du travail, distinguer la « demande » de la « commande » revient à :",
    opts: [
      "Considérer qu'elles sont strictement synonymes",
      "Analyser l'écart entre la requête explicite du prescripteur et le besoin réel sous-jacent",
      "Ne traiter que la commande administrative",
    ],
    ok: 1,
    expl: "Le travail clinique commence par l'analyse de la demande : reformuler la commande pour faire émerger le problème réel.",
  },
  {
    q: "La déontologie impose au psychologue, en cas de conflit avec le commanditaire, de :",
    opts: [
      "Se soumettre aux objectifs du payeur",
      "Maintenir son indépendance professionnelle et la primauté de la personne évaluée",
      "Démissionner immédiatement de toute mission",
    ],
    ok: 1,
    expl: "L'indépendance professionnelle et le respect de la personne priment sur les intérêts du commanditaire : c'est un pilier du code de déontologie.",
  },
  {
    q: "Le burnout, selon Maslach, se caractérise par trois dimensions :",
    opts: [
      "Épuisement émotionnel, dépersonnalisation (cynisme), perte d'accomplissement",
      "Stress, fatigue et démotivation salariale",
      "Anxiété, dépression et troubles du sommeil",
    ],
    ok: 0,
    expl: "Le triptyque de Maslach : épuisement émotionnel, dépersonnalisation/cynisme, et réduction de l'accomplissement personnel.",
  },
  {
    q: "Le rôle du médecin du travail, distinct de celui du psychologue, est avant tout :",
    opts: [
      "De réaliser les bilans psychométriques de recrutement",
      "D'assurer le suivi médical et l'aptitude, avec un secret médical propre",
      "De manager les équipes en souffrance",
    ],
    ok: 1,
    expl: "Le médecin du travail relève du Code de la santé publique (aptitude, secret médical) ; le psychologue a son propre cadre déontologique.",
  },
  {
    q: "Une intervention de « prévention primaire » des RPS vise à :",
    opts: [
      "Soigner les salariés déjà en souffrance",
      "Agir sur l'organisation du travail pour supprimer les sources de risque à la source",
      "Apprendre aux salariés à mieux gérer leur stress",
    ],
    ok: 1,
    expl: "La prévention primaire agit sur les causes organisationnelles ; la tertiaire (soin) et la secondaire (gestion individuelle) sont en aval.",
  },
  {
    q: "Le psychologue sollicité pour « détecter les fragiles » lors d'un plan social doit :",
    opts: [
      "Accepter : c'est une mission d'évaluation classique",
      "Interroger l'éthique de la demande et refuser un usage de tri/sélection contraire à la déontologie",
      "Transmettre une liste nominative au DRH",
    ],
    ok: 1,
    expl: "Détourner l'évaluation en outil de tri social est contraire au principe de non-nuisance et au respect de la personne.",
  },
  {
    q: "La latitude décisionnelle chez Karasek combine :",
    opts: [
      "L'autonomie de décision et l'utilisation/développement des compétences",
      "Le salaire et l'ancienneté",
      "Le soutien des collègues et de la hiérarchie",
    ],
    ok: 0,
    expl: "La latitude décisionnelle = marge de manœuvre décisionnelle + latitude d'usage des compétences. Le soutien social est une 3e dimension du modèle.",
  },
  {
    q: "Le « soutien social au travail » (Karasek, Johnson) agit comme :",
    opts: [
      "Un facteur aggravant systématique",
      "Un modérateur pouvant atténuer les effets délétères du job strain",
      "Une variable sans effet sur la santé",
    ],
    ok: 1,
    expl: "Le soutien social (collègues, hiérarchie) modère la relation tension-santé : l'isolement (iso-strain) est le plus pathogène.",
  },
  {
    q: "Face à une demande d'évaluation, le psychologue doit choisir des outils :",
    opts: [
      "Selon leur notoriété commerciale",
      "Valides, fidèles et étalonnés, adaptés à l'objectif et à la population",
      "Les plus rapides à faire passer",
    ],
    ok: 1,
    expl: "Le choix des méthodes repose sur leurs qualités psychométriques (validité, fidélité, sensibilité) et leur pertinence, non sur la commodité.",
  },
  {
    q: "Le secret professionnel impose au psychologue de :",
    opts: [
      "Transmettre tous les comptes rendus au DRH",
      "Ne transmettre qu’un avis pertinent à la décision, sans le contenu intime",
      "Refuser toute communication",
    ],
    ok: 1,
    expl: "Le psychologue communique une conclusion utile, sans livrer le matériel clinique confidentiel.",
  },
  {
    q: "Le modèle de Siegrist met l’accent sur :",
    opts: [
      "Exigences / latitude décisionnelle",
      "Le déséquilibre entre efforts et récompenses",
      "La seule charge physique",
    ],
    ok: 1,
    expl: "Siegrist complète Karasek en insistant sur la reconnaissance (salaire, estime, statut).",
  },
  {
    q: "Le burnout (Maslach) comporte trois dimensions :",
    opts: [
      "Épuisement émotionnel, dépersonnalisation, perte d’accomplissement",
      "Stress, fatigue, ennui",
      "Anxiété, dépression, insomnie",
    ],
    ok: 0,
    expl: "Le triptyque de Maslach structure toute analyse du burnout.",
  },
  {
    q: "La prévention primaire des RPS vise à :",
    opts: [
      "Soigner les salariés atteints",
      "Agir sur l’organisation pour supprimer les sources de risque",
      "Apprendre à gérer son stress",
    ],
    ok: 1,
    expl: "La primaire agit à la source ; secondaire (individu) et tertiaire (soin) sont en aval.",
  },
  {
    q: "Le consentement éclairé suppose que le sujet connaisse, avant l’évaluation :",
    opts: [
      "Le barème exact des tests",
      "L’objectif, le commanditaire et la destination des résultats",
      "Uniquement la durée",
    ],
    ok: 1,
    expl: "Pas d’évaluation à l’insu de la personne : transparence sur la finalité et l’usage.",
  },
  {
    q: "Le médecin du travail se distingue du psychologue car il :",
    opts: [
      "Réalise les bilans de recrutement",
      "Assure l’aptitude et le suivi médical, sous secret médical propre",
      "Manage les équipes",
    ],
    ok: 1,
    expl: "Cadre du Code de la santé publique, distinct de la déontologie du psychologue.",
  },
  {
    q: "Distinguer la « demande » de la « commande », c’est :",
    opts: [
      "Les traiter comme synonymes",
      "Analyser l’écart entre la requête explicite et le besoin réel sous-jacent",
      "Ne traiter que la commande administrative",
    ],
    ok: 1,
    expl: "Le travail clinique commence par l’analyse et la reformulation de la demande.",
  },
  {
    q: "Le syndrome du survivant après un plan social se caractérise par :",
    opts: [
      "Une motivation accrue",
      "Culpabilité, perte de repères et souffrance des salariés restants",
      "Une simple baisse de salaire",
    ],
    ok: 1,
    expl: "L’absentéisme et la colère relèvent du deuil professionnel, non d’un manque de motivation.",
  },
];

export const QUI = [
  [
    "Notre objectif est de mesurer scientifiquement les temps de réaction des téléphonistes pour calibrer les cadences optimales de l'atelier.",
    "positiviste",
    "<b>Précurseur psychotechnicien (Lahy / Positivisme)</b> : Approche focalisée sur la mesure des aptitudes physiques pour adapter l'homme à la machine.",
  ],
  [
    "Je ne peux pas accepter votre commande d'audit de climat social si je ne peux pas garantir l'anonymat strict et des entretiens de restitution individuels.",
    "clinicien",
    "<b>Psychologue clinicien du travail (Déontologique)</b> : Défend l'indépendance, la contractualisation du mandat et la protection des sujets.",
  ],
  [
    "Nous devons concevoir un plan de Change Management pour faire accepter la nouvelle organisation et lever la résistance des salariés.",
    "rh",
    "<b>Management gestionnaire / Conseil RH</b> : Approche adaptative visant l'alignement des comportements aux directives de l'entreprise.",
  ],
  [
    "J'ai constaté une recrudescence d'arrêts de travail pour syndrome d'épuisement dans ce service. Il y a un risque grave pour la santé des agents.",
    "medecin",
    "<b>Médecin du travail</b> : Focus sur la santé somatique et mentale, l'aptitude médicale et l'alerte sur les pathologies d'usure.",
  ],
  [
    "Mesurons les aptitudes et les temps de réaction pour placer le bon profil au bon poste.",
    "positiviste",
    "<b>Psychotechnicien (Lahy / positivisme)</b> : adapter l'homme à la machine par la mesure des aptitudes.",
  ],
  [
    "Mon rôle est d'analyser le travail réel et de protéger la parole du sujet évalué.",
    "clinicien",
    "<b>Psychologue clinicien</b> : indépendance, analyse de l'activité et défense du sujet.",
  ],
  [
    "Il faut surtout accompagner le changement et fluidifier l'adhésion des collaborateurs.",
    "rh",
    "<b>Manager / consultant RH</b> : logique d'adhésion et de performance (à distinguer de la clinique).",
  ],
  [
    "Le consentement éclairé et la restitution compréhensible au sujet priment sur la commande.",
    "clinicien",
    "<b>Psychologue clinicien</b> : primauté de la personne et du cadre déontologique.",
  ],
  [
    "Je veille à l'aptitude médicale au poste et je suis tenu au secret médical.",
    "medecin",
    "<b>Médecin du travail</b> : suivi médical et aptitude, cadre distinct du psychologue.",
  ],
  [
    "Fixons des objectifs individuels chiffrés pour piloter la performance de chacun.",
    "rh",
    "<b>Manager / consultant RH</b> : pilotage par les KPI, susceptible de générer des RPS.",
  ],
];

export const PIEGES = [
  [
    "Un DRH a le droit d'imposer au psychologue du travail l'outil psychométrique à utiliser pour évaluer les salariés.",
    false,
    "<b>Faux !</b> Selon le Code de déontologie, le psychologue est totalement indépendant dans le choix de ses méthodes, outils et théories.",
    "deontologie",
  ],
  [
    "Le consentement du salarié est facultatif si l'intervention est entièrement financée et ordonnée par la direction de l'entreprise.",
    false,
    "<b>Faux !</b> Le consentement libre et éclairé du sujet est une condition absolue et obligatoire de toute intervention psychologique.",
    "deontologie",
  ],
  [
    "Le mandat représente la demande brute formulée par le client prescripteur.",
    false,
    "<b>Faux !</b> La demande est l'expression brute. Le mandat est le cadre d'intervention reformulé, négocié et contractualisé par le psychologue.",
    "mandat",
  ],
  [
    "Les résultats bruts d'un test psychométrique peuvent être transmis directement au recruteur RH sans entretien préalable.",
    false,
    "<b>Faux !</b> La restitution compréhensible au sujet évalué est une règle déontologique stricte. On ne transmet pas de résultats bruts.",
    "deontologie",
  ],
  [
    "Le modèle de Karasek évalue le Job Strain en croisant l'exigence psychologique et la latitude décisionnelle.",
    true,
    "<b>Vrai !</b> Le Job Strain (tension au travail) résulte du croisement d'exigences psychologiques élevées et d'une latitude décisionnelle basse.",
    "rps",
  ],
  [
    "L'usage professionnel du titre de psychologue est protégé par la loi de 1985.",
    true,
    "<b>Vrai !</b> La loi du 25 juillet 1985 protège le titre ; l'inscription ADELI/RPPS est requise.",
    "deontologie",
  ],
  [
    "Le psychologue peut transmettre au DRH les comptes rendus bruts d'entretien pour gagner du temps.",
    false,
    "<b>Faux !</b> Le secret professionnel impose de ne livrer qu'un avis pertinent à la décision, sans le contenu intime des échanges.",
    "deontologie",
  ],
  [
    "Le Job Strain (Karasek) résulte du croisement d'exigences psychologiques élevées et d'une faible latitude décisionnelle.",
    true,
    "<b>Vrai !</b> C'est la tension au travail ; le soutien social en est une 3e dimension modératrice.",
    "rps",
  ],
  [
    "La « résistance au changement » est toujours un trait individuel à corriger.",
    false,
    "<b>Faux !</b> C'est souvent un faux diagnostic masquant des déterminants organisationnels et un changement mal conduit.",
    "transitions",
  ],
  [
    "La prévention primaire des RPS agit sur l'organisation du travail, pas seulement sur l'individu.",
    true,
    "<b>Vrai !</b> La primaire supprime les sources à la source ; la secondaire (gestion du stress) et la tertiaire (soin) sont en aval.",
    "rps",
  ],
];

export const DISTINCTION = [
  {
    item: "Attente brute du client",
    cat: "demande",
    label: "La Demande brute",
    expl: "La demande brute exprime les besoins immédiats du prescripteur.",
  },
  {
    item: "Cadre d'intervention contractualisé",
    cat: "mandat",
    label: "Le Mandat",
    expl: "Le mandat est co-construit et négocié par le psychologue.",
  },
  {
    item: "Sophrologie et séances de relaxation au travail",
    cat: "change",
    label: "Prévention secondaire/tertiaire",
    expl: "La relaxation tente d'adapter le salarié au milieu toxique sans le changer.",
  },
  {
    item: "Réduction de la charge de travail à la source",
    cat: "clinique",
    label: "Prévention primaire",
    expl: "La prévention primaire transforme les causes organisationnelles de la souffrance.",
  },
];

export const CLOZE = [
  {
    text: "L'usage professionnel du titre de psychologue est défini par la loi de [1985].",
    ans: "1985",
    expl: "La loi du 25 juillet 1985 protège le titre de psychologue en France.",
  },
  {
    text: "La [triangulation] désigne la relation d'intervention liant le psychologue, le prescripteur et le sujet.",
    ans: "triangulation",
    expl: "La triangulation est une contrainte déontologique permanente en entreprise.",
  },
  {
    text: "Le cadre d'intervention à trois — psychologue, prescripteur et sujet — s'appelle la [triangulation].",
    ans: "triangulation",
    expl: "La triangulation déontologique structure toute intervention en entreprise.",
  },
  {
    text: "Avant toute évaluation, le sujet doit donner son consentement libre et [éclairé].",
    ans: "éclairé",
    expl: "Le consentement éclairé suppose la transparence sur l'objectif, le commanditaire et la destination des résultats.",
  },
  {
    text: "Le modèle de [Karasek] croise exigences psychologiques et latitude décisionnelle (Job Strain).",
    ans: "Karasek",
    expl: "Le soutien social (Johnson) en constitue la troisième dimension.",
  },
  {
    text: "Le psychologue est [indépendant] dans le choix de ses méthodes, outils et théories.",
    ans: "indépendant",
    expl: "L'indépendance professionnelle prime sur les intérêts du commanditaire (Code de déontologie).",
  },
  {
    text: "Le modèle de [Siegrist] repose sur le déséquilibre entre efforts fournis et récompenses reçues.",
    ans: "Siegrist",
    expl: "Il complète le modèle de Karasek pour analyser les RPS.",
  },
  {
    text: "Le médecin du travail est tenu au secret [médical], distinct du cadre du psychologue.",
    ans: "médical",
    expl: "Chaque profession a son propre régime de confidentialité.",
  },
];

export const REDAC = [
  {
    t: "Sujet 1 : Analyser une demande de diagnostic RPS formulée par un DRH",
    intro:
      "Le psychologue du travail est fréquemment sollicité par la direction pour réaliser un 'audit de stress' suite à des alertes syndicales. Cette demande brute reflète souvent une volonté d'individualiser les problèmes ou de valider des choix prédéfinis.",
    plan: "I. Déconstruire la demande et gérer la triangulation (Prescripteur vs Salariés).<br/>II. Négocier le mandat clinique : imposer l'indépendance des méthodes et l'approche qualitative.<br/>III. Mettre en place un protocole d'enquête sous secret professionnel et restituer les résultats aux agents.",
    corrige:
      "<p>Une bonne copie doit souligner que la demande n'est pas le mandat. Le psychologue doit refuser d'agir comme un simple évaluateur de la fragilité individuelle et exiger d'enquêter sur les déterminants organisationnels du travail réel. Le respect du secret professionnel et la restitution compréhensible sont non négociables.",
  },
  {
    t: "Sujet 2 : Bilan de compétences vs Matching de CV",
    intro:
      "Le bilan de compétences est souvent perçu par les acteurs économiques comme un simple outil d'orientation pour adapter la main-d'œuvre. La loi de 1991 en définit pourtant un cadre protecteur.",
    plan: "I. Le bilan comme espace clinique de transition et de restauration du pouvoir d'agir.<br/>II. Limites déontologiques : refus du matching comptable et protection des données du sujet.<br/>III. L'élaboration de l'histoire du sujet pour redonner du sens face aux ruptures de carrière.",
    corrige:
      "<p>Le psychologue se démarque du simple conseiller de placement en traitant le bilan comme un travail clinique sur la subjectivité et les deuils professionnels, garantissant l'indépendance de choix du bénéficiaire.",
  },
  {
    t: "Sujet 2 : La triangulation déontologique dans une intervention RPS",
    intro:
      "Mandaté par une direction pour un « diagnostic RPS », le psychologue se trouve pris entre les intérêts du prescripteur, ceux des salariés et son propre cadre déontologique.",
    plan: "I. Nommer la triangulation (psychologue / prescripteur / sujet) et ses tensions.<br/>II. Affirmer l'indépendance des méthodes et la primauté de la personne.<br/>III. Garantir secret professionnel, consentement éclairé et restitution aux agents.",
    corrige:
      "<p>La copie doit montrer que la triangulation est une contrainte permanente : le payeur n'est pas le sujet. Le psychologue préserve son <b>indépendance</b> dans le choix des méthodes, refuse l'individualisation des problèmes, enquête sur les déterminants organisationnels et protège la parole (secret, anonymat, restitution compréhensible aux salariés).</p>",
  },
  {
    t: "Sujet 3 : « Résistance au changement » ou déterminants organisationnels ?",
    intro:
      "Face à un projet de réorganisation qui « bloque », la direction invoque la résistance au changement des salariés et demande de « lever les freins ».",
    plan: "I. Déconstruire le faux diagnostic de « résistance au changement ».<br/>II. Mettre au jour les déterminants organisationnels et l'atteinte à l'identité professionnelle (deuil professionnel).<br/>III. Proposer une clinique du changement : espaces de délibération et co-élaboration des nouvelles règles.",
    corrige:
      "<p>La « résistance au changement » est souvent un <b>faux diagnostic</b> qui culpabilise les salariés et masque un changement mal conçu. La copie doit déplacer l'analyse vers les <b>déterminants organisationnels</b> et l'usure de l'<b>identité professionnelle</b>, puis défendre une clinique du changement fondée sur la délibération collective et le consentement, contre le « change management » descendant.</p>",
  },
];

export const CAS = [
  {
    t: "Cas 1 : Accompagner le syndrome du survivant après un PSE",
    desc: "Une entreprise de logistique vient de licencier 30% de ses effectifs. Le DRH vous demande d'intervenir pour 'remotiver les survivants' qui font preuve d'absentéisme et de colère.",
    q: [
      {
        q: "Quelle est votre analyse déontologique initiale de cette demande ?",
        opts: [
          "Accepter immédiatement pour aider les salariés à retrouver de la productivité.",
          "Déconstruire la demande : l'absentéisme n'est pas un manque de motivation mais une souffrance liée au deuil professionnel et à la culpabilité des survivants.",
          "Suggérer au DRH de remplacer les salariés absents par des intérimaires.",
        ],
        ok: 1,
        expl: "Le psychologue analyse les déterminants organisationnels et subjectifs de la crise (deuil professionnel, perte de repères, syndrome du survivant) plutôt que d'accompagner une directive de productivité brute.",
      },
      {
        q: "Comment structurez-vous votre mandat d'intervention ?",
        opts: [
          "En organisant des séances de coaching individuel pour éliminer la culpabilité.",
          "En négociant des espaces de parole collectifs sur le travail réel et la réorganisation des tâches sous anonymat strict.",
          "En transmettant au DRH la liste des salariés les plus résistants.",
        ],
        ok: 1,
        expl: "La restauration de la santé passe par l'élaboration collective des règles de métier et la délibération dans des espaces protégés, garantissant le secret professionnel.",
      },
    ],
  },
  {
    t: "Cas 2 : « Détecter les fragiles » avant un plan social",
    desc: "À la veille d'un plan de sauvegarde de l'emploi, un directeur vous demande de faire passer des tests pour « repérer en amont les salariés psychologiquement fragiles ».",
    q: [
      {
        q: "Quelle est la réponse déontologique ?",
        opts: [
          "Accepter : repérer les fragiles permettra de mieux les accompagner.",
          "Refuser : détourner l'évaluation en outil de tri/sélection viole le respect de la personne et le principe de non-nuisance.",
          "Transmettre une liste anonymisée des plus vulnérables au directeur.",
        ],
        ok: 1,
        expl: "Le psychologue ne met pas son évaluation au service d'une sélection qui nuirait aux personnes ; l'indépendance et la non-nuisance priment sur la commande.",
      },
      {
        q: "Que peut légitimement proposer le psychologue ?",
        opts: [
          "Un dispositif de soutien collectif et un cadre d'écoute, sans finalité de tri ni transmission nominative.",
          "Un classement des salariés par niveau de résilience.",
          "Rien : il doit se retirer sans rien proposer.",
        ],
        ok: 0,
        expl: "Il peut offrir un espace de parole et d'orientation respectant le secret professionnel, en refusant tout usage sélectif des données.",
      },
    ],
  },
  {
    t: "Cas 3 : Restitution de tests psychométriques en recrutement",
    desc: "Après une session d'évaluation, le DRH vous demande d'envoyer directement les scores bruts des candidats au manager, « sans perdre de temps en restitution ».",
    q: [
      {
        q: "Quelle règle déontologique s'applique ?",
        opts: [
          "Le candidat a droit à une restitution compréhensible de ses résultats avant toute transmission.",
          "Les scores bruts peuvent être transmis tels quels pour l'efficacité du process.",
          "La restitution est facultative si le candidat n'est pas retenu.",
        ],
        ok: 0,
        expl: "La restitution compréhensible au sujet évalué est un droit strict et un devoir déontologique ; on ne diffuse pas des scores bruts décontextualisés.",
      },
      {
        q: "Que transmet le psychologue au commanditaire ?",
        opts: [
          "L'intégralité des protocoles et scores bruts.",
          "Un avis argumenté et pertinent à la décision, sans livrer le matériel brut ni le contenu intime.",
          "Uniquement un classement chiffré des candidats.",
        ],
        ok: 1,
        expl: "Le psychologue communique une conclusion utile à la décision, dans le respect du secret professionnel et de la dignité des personnes.",
      },
    ],
  },
];

export const FRISE = [
  {
    y: "1912",
    t: "Débuts de la psychotechnique",
    d: "Lahy et Toulouse créent les premiers laboratoires d'analyse du travail et de sélection des aptitudes.",
  },
  {
    y: "1947",
    t: "Création de la médecine du travail",
    d: "Mise en place obligatoire des services médicaux du travail et protection de la santé physique.",
  },
  {
    y: "1985",
    t: "Protection de la loi sur le Titre",
    d: "La loi du 25 juillet 1985 protège le titre universitaire de psychologue en France.",
  },
  {
    y: "1991",
    t: "Loi sur le Bilan de Compétences",
    d: "Légalisation et définition du cadre déontologique et contractuel du bilan de compétences.",
  },
  {
    y: "2016",
    t: "Entrée en vigueur du RGPD",
    d: "Règles strictes sur la collecte, l'anonymisation et le droit d'accès aux données psychologiques.",
  },
];

export const EXAM_SUBJECTS = [
  {
    id: "sujet_1",
    type: "dissertation",
    t: "Dissertation : 'Le psychologue du travail peut-il être un instrument d'adaptation du salarié aux contraintes de l'organisation ?'",
    desc: "Le correcteur attend une réflexion critique sur le rôle éthique du psychologue, opposant le Change Management (visant l'adaptation individuelle) à la clinique du travail (axée sur la transformation du travail réel).",
    criteria: [
      "Définir la tension centrale Demande Sociale vs Déontologie dans l'introduction",
      "Citer la loi de 1985 sur la protection du titre et le code de déontologie",
      "Développer le principe de l'indépendance professionnelle et du but assigné",
      "Opposer le Change Management (adaptation individuelle) à la clinique du changement",
      "Discuter de la triangulation (Prescripteur / Sujet / Psychologue)",
      "Proposer la co-construction d'un mandat d'activité clinique",
    ],
    corrige:
      "<h4>Problématique d'excellence :</h4><p>En quoi la posture clinique et déontologique du psychologue du travail lui permet-elle de résister à la commande d'adaptation individuelle pour proposer une analyse systémique et organisationnelle du travail réel ?</p><h4>Modèle de Plan Dialectique :</h4><p><b>I. La tentation de l'adaptation individuelle : une réponse à la demande sociale</b><br/>A. Le psychologue comme outil de régulation des dysfonctionnements (sur-mesure, individuel).<br/>B. Les dérives de la psychologisation : la GPEC individualisée et les techniques de résilience (sophrologie, QVT superficielle) qui occultent l'organisation pathogène.<br/>C. Les risques d'instrumentalisation éthique par le prescripteur (tri social, licenciement déguisé).</p><p><b>II. Le cadre déontologique comme garde-fou de l'indépendance</b><br/>A. L'indépendance des méthodes (Responsabilité et Autonomie) : refuser le but assigné non éthique.<br/>B. Le secret professionnel et le consentement éclairé (RGPD) comme protection du salarié face à la triangulation.<br/>C. La restitution compréhensible au sujet comme droit inaliénable du travailleur évalué.</p><p><b>III. De l'adaptation individuelle à la transformation clinique de l'organisation</b><br/>A. Du traitement de la plainte à la négociation du mandat : reformuler la demande brute.<br/>B. L'analyse systémique : l'articulation entre quantitatif (Karasek, Siegrist) et qualitatif (travail réel).<br/>C. Restaurer le pouvoir d'agir et ouvrir des espaces de délibération collective dans l'entreprise.</p>",
  },
  {
    id: "sujet_2",
    type: "demande",
    t: "Analyse de Demande : 'Le DRH vous commande une enquête quantitative RPS par questionnaire suite à une vague de démissions. Comment réagissez-vous ?'",
    desc: "Savoir analyser les limites d'un diagnostic purement quantitatif, défendre la triangulation et proposer une méthode clinique qualitative complémentaire.",
    criteria: [
      "Identifier les parties prenantes et les enjeux de pouvoir (triangulation)",
      "Discuter des limites méthodologiques du quantitatif seul (Karasek/Siegrist)",
      "Proposer une pré-enquête et des entretiens cliniques qualitatifs du travail",
      "Négocier la restitution des résultats aux salariés (règle d'or)",
      "Défendre le secret professionnel partagé et l'anonymisation rigoureuse",
      "Contractualiser un mandat co-construit intégrant les partenaires sociaux",
    ],
    corrige:
      "<h4>Analyse de la demande brute :</h4><p>La direction cherche une réponse chiffrée rapide pour rassurer, mais risque d'utiliser les scores statistiques pour individualiser la souffrance (identifier les services 'fragiles') ou éluder le débat sur l'activité réelle.</p><h4>Démarche clinique et éthique :</h4><p><b>1. Cadrer la Triangulation :</b> Rappeler que le psychologue travaille sous secret professionnel. Le commanditaire paie mais n'a pas accès aux données individuelles. Négocier l'implication du CSE et de la médecine du travail.<br/><b>2. Compléter par le qualitatif :</b> Le questionnaire (Karasek) objective la tension (exigences / latitude), mais seul l'entretien clinique du travail ou l'observation de l'activité réelle permet d'expliquer les déterminants des démissions (perte de sens, conflits de critères sur la qualité du travail).<br/><b>3. Contractualiser le Mandat :</b> Rédiger une convention d'intervention stipulant :<br/>- Le consentement libre et éclairé de tous les participants.<br/>- L'anonymisation absolue des réponses.<br/>- L'obligation d'une restitution collective des conclusions aux salariés avant toute présentation finale à la direction.</p>",
  },
  {
    id: "sujet_3",
    type: "cas",
    t: "Étude de Cas : 'Un médecin du travail vous alerte sur un burn-out collectif dans une équipe de téléconseillers. La direction refuse toute intervention clinique collective. Quelle est votre posture ?'",
    desc: "Ce sujet teste votre capacité à faire valoir le cadre réglementaire du psychologue, sa collaboration interdisciplinaire (SPSTI) et sa marge de manœuvre éthique.",
    criteria: [
      "Faire valoir le rôle du psychologue en SPSTI (indépendance professionnelle)",
      "Expliquer l'interdisciplinarité avec le médecin du travail (secret partagé)",
      "Citer l'obligation de prévention primaire à la charge de l'employeur",
      "Proposer des actions collectives (groupes d'analyse de l'activité)",
      "Alerter par écrit de manière anonymisée sur les risques de santé (Karasek)",
      "Mobiliser le CSE comme relais d'alerte ou commanditaire potentiel",
    ],
    corrige:
      "<h4>Postures clés à adopter :</h4><p><b>1. S'appuyer sur le cadre SPSTI :</b> Le psychologue en service de prévention et de santé au travail externe tire sa force de son extériorité. Il collabore avec le médecin du travail sous secret médical partagé. La direction ne peut pas lui interdire d'enquêter au titre de la prévention des risques.<br/><b>2. Rappeler les obligations légales de l'employeur :</b> Rappeler poliment que l'employeur a une obligation de sécurité de résultat (L. 4121-1 du Code du Travail) et doit agir en prévention primaire (supprimer le risque à la source). Le burn-out collectif est un indicateur de Job Strain sévère (Karasek : exigences élevées, latitude nulle).<br/><b>3. Contourner le blocage par le dialogue social :</b> Si la direction bloque l'accès physique aux équipes, utiliser le CSE. Les représentants du personnel peuvent voter une expertise pour risque grave, mandatant le psychologue comme expert. Casser le face-à-face individuel en créant un espace de parole sur le travail réel.</p>",
  },
];

export const DEONTOLOGIE_PRINCIPLES = [
  {
    n: "Respect des droits de la personne",
    desc: "Le psychologue réfère son action aux principes nationaux, européens et internationaux sur le respect des droits fondamentaux des personnes, et spécialement de leur dignité, de leur liberté et de leur protection. Il recueille le consentement libre et éclairé des personnes concernées.",
    eg: "Faire signer un formulaire d'information claire sur l'utilisation du test avant d'évaluer un candidat au recrutement.",
    trap: "Faire passer des tests de personnalité ou d'aptitudes à un salarié à la demande du DRH sans que le salarié en ait été informé ou ait donné son accord écrit.",
  },
  {
    n: "Compétence",
    desc: "Le psychologue tient sa compétence de sa formation universitaire de haut niveau et d'une formation continue. Il garantit la mise à jour de ses connaissances et définit ses limites en fonction de sa formation et de son expérience.",
    eg: "Refuser de réaliser une intervention d'ergonomie lourde sur la chaîne de production si l'on n'a pas été formé aux gestes et postures et à l'analyse de l'activité physique.",
    trap: "Utiliser un outil psychométrique complexe (ex: SOSIE) sans en maîtriser l'étalonnage, la validité et la théorie sous-jacente.",
  },
  {
    n: "Responsabilité et Autonomie",
    desc: "Dans le cadre de ses compétences professionnelles, le psychologue décide et répond personnellement du choix de ses méthodes, de ses outils et de ses conclusions. Il défend son autonomie professionnelle face à son employeur ou client.",
    eg: "Décider d'utiliser des entretiens cliniques individuels au lieu d'un questionnaire standardisé imposé par la direction pour analyser les RPS.",
    trap: "Laisser le DRH modifier les conclusions de son rapport d'expertise ou imposer les questions du guide d'entretien clinique.",
  },
  {
    n: "Rigueur, Probité et Désintéressement",
    desc: "Les modes d'intervention choisis par le psychologue doivent pouvoir faire l'objet d'une explication raisonnée de leurs fondements théoriques et méthodologiques. Le psychologue ne tire pas profit de son influence à des fins personnelles.",
    eg: "Expliquer aux partenaires sociaux la validité statistique et scientifique de l'outil de diagnostic choisi.",
    trap: "Utiliser une méthode pseudo-scientifique (ex: morphopsychologie, numérologie) pour évaluer l'aptitude d'un candidat à l'embauche.",
  },
  {
    n: "Respect du but assigné",
    desc: "Les dispositifs méthodologiques établis par le psychologue répondent aux motifs de ses interventions et à eux seuls. Il refuse de détourner son action de son but initial.",
    eg: "Utiliser une enquête de climat social uniquement pour identifier les surcharges de travail, conformément au mandat négocié.",
    trap: "Utiliser les résultats d'une cellule d'écoute psychologique mise en place après un PSE pour identifier et licencier les salariés les plus fragiles.",
  },
  {
    n: "Confidentialité et Secret professionnel",
    desc: "Le psychologue préserve la vie privée et l'intimité des personnes en garantissant le respect du secret professionnel. Il ne transmet des informations à des tiers qu'avec l'accord des personnes, ou de manière totalement anonymisée.",
    eg: "Restituer à la direction un rapport de synthèse qui consolide les problématiques collectives sans jamais citer de noms ni de propos individuels identifiables.",
    trap: "Transmettre au médecin du travail ou à la RH les notes brutes rédigées pendant les entretiens cliniques des salariés.",
  },
];

export const LEXIQUE = [
  {
    w: "Le Titre et le Code de Déontologie",
    a: "deontologie",
    def: "L'usage du titre de psychologue est protégé par la loi (1985). L'intervention s'appuie sur le Code de déontologie (respect des droits, compétence, probité, indépendance).",
    dejours:
      "Garantit que le psychologue n'est pas un simple outil de gestion des ressources humaines.",
    eg: "L'inscription obligatoire au répertoire ADELI pour prouver la détention d'un Master 2 universitaire.",
  },
  {
    w: "La Triangulation",
    a: "triangulation",
    def: "La gestion permanente de la relation à trois dans l'intervention en entreprise : le Prescripteur (qui commande/paie), le Sujet (le salarié concerné), et le Psychologue.",
    dejours:
      "Nécessite de définir clairement les rôles et le secret pour éviter d'être instrumentalisé par la direction.",
    eg: "Un DRH qui paie le psychologue pour accompagner un manager en conflit avec son équipe.",
  },
  {
    w: "Le Mandat vs La Demande",
    a: "mandat",
    def: "La demande est l'attente brute exprimée par le client. Le mandat est le cadre d'intervention négocié, reformulé et contractualisé par le psychologue.",
    dejours:
      "La transformation de la demande en mandat est la première étape déontologique indispensable.",
    eg: "Refuser de faire un 'diagnostic individuel' pour proposer une analyse organisationnelle des RPS.",
  },
  {
    w: "Le Consentement éclairé",
    a: "deontologie",
    def: "Principe fondamental stipulant qu'aucune évaluation ou intervention ne peut être menée sur un sujet sans son accord libre, explicite et éclairé.",
    dejours:
      "La protection des données (RGPD) et le droit d'accès aux résultats en découlent directement.",
    eg: "Faire signer un formulaire d'accord au salarié avant de commencer une passation de tests.",
  },
  {
    w: "L'Entretien Clinique",
    a: "mandat",
    def: "Outil central du psychologue permettant d'explorer le rapport subjectif au travail, la souffrance et la recherche de sens.",
    dejours:
      "Se décline en entretien de demande, d'investigation, de restitution et clinique du travail.",
    eg: "Mener un entretien non directif pour laisser le salarié formuler ses propres difficultés professionnelles.",
  },
  {
    w: "Tension Quantitatif vs Qualitatif",
    a: "rps",
    def: "L'articulation nécessaire entre les mesures statistiques (questionnaires RPS de type Karasek) et l'analyse qualitative clinique (observations, parole libre).",
    dejours:
      "Les chiffres décrivent la souffrance, la clinique qualitative l'explique et permet d'agir.",
    eg: "Compléter les résultats chiffrés d'un questionnaire RPS par des groupes de parole collectifs.",
  },
  {
    w: "La Restitution",
    a: "deontologie",
    def: "Règle déontologique absolue. Tout sujet évalué a le droit de recevoir une restitution compréhensible et sincère de ses résultats.",
    dejours:
      "Le psychologue ne peut envoyer des scores de tests bruts à l'employeur sans restitution préalable au salarié.",
    eg: "Mener un entretien de restitution avec un candidat pour lui expliquer ses résultats aux tests d'aptitudes.",
  },
  {
    w: "La Clinique du changement",
    a: "transitions",
    def: "Approche qui analyse les impacts réels du changement organisationnel sur le geste professionnel, l'identité de métier et les deuils professionnels.",
    dejours:
      "S'oppose au Change Management classique qui vise la seule acceptation passive du changement.",
    eg: "Analyser la perte de sens éprouvée par des conseillers suite à la fermeture d'un accueil physique.",
  },
  {
    w: "Le Bilan de Compétences",
    a: "transitions",
    def: "Espace clinique d'accompagnement de la transition professionnelle, régi par la loi de 1991, centré sur le sens et le pouvoir d'agir du sujet.",
    dejours:
      "Ne doit pas être réduit à du matching de compétences comptables pour le marché.",
    eg: "Aider un salarié en usure professionnelle à reconstruire son parcours après un licenciement.",
  },
  {
    w: "L'Expertise CSE",
    a: "sante",
    def: "L'intervention réglementée du psychologue comme expert habilité pour éclairer les représentants du personnel sur les impacts humains des réorganisations.",
    dejours:
      "Requiert une posture rigoureuse et une indépendance scientifique face aux enjeux politiques de l'entreprise.",
    eg: "Rédiger un avis d'expert sur les risques de burn-out liés à un projet de fusion de services.",
  },
  {
    w: "Job Strain (Karasek)",
    a: "rps",
    def: "Tension au travail résultant du croisement d'exigences psychologiques élevées et d'une faible latitude décisionnelle. Le soutien social en est une 3e dimension modératrice.",
    dejours:
      "Piège : ne pas réduire le Job Strain à la seule charge de travail ; la latitude décisionnelle est centrale.",
    eg: "Un opérateur très sollicité mais sans aucune marge de manœuvre sur son rythme.",
  },
  {
    w: "Déséquilibre efforts / récompenses (Siegrist)",
    a: "rps",
    def: "Modèle expliquant les RPS par l'écart entre les efforts fournis (extrinsèques et intrinsèques) et les récompenses reçues (salaire, estime, statut, sécurité).",
    dejours:
      "Piège : complémentaire de Karasek, pas concurrent ; il insiste sur la reconnaissance.",
    eg: "Un salarié surinvesti dont la promotion promise est sans cesse repoussée.",
  },
  {
    w: "Burnout (Maslach)",
    a: "rps",
    def: "Épuisement professionnel à trois dimensions : épuisement émotionnel, dépersonnalisation (cynisme) et réduction de l'accomplissement personnel.",
    dejours:
      "Piège : ce n'est pas une simple fatigue ; les trois dimensions doivent être nommées.",
    eg: "Un soignant épuisé qui traite les patients avec distance et doute de l'utilité de son travail.",
  },
  {
    w: "Consentement libre et éclairé",
    a: "deontologie",
    def: "Accord du sujet donné en connaissance de l'objectif, du commanditaire et de la destination des résultats : pas d'évaluation à l'insu de la personne.",
    dejours:
      "Piège : un consentement obtenu sous pression hiérarchique n'est pas libre.",
    eg: "Informer un candidat de l'usage exact de ses résultats avant toute passation de test.",
  },
  {
    w: "Prévention primaire / secondaire / tertiaire",
    a: "rps",
    def: "Primaire : agir sur l'organisation pour supprimer les sources de risque. Secondaire : outiller les individus (gestion du stress). Tertiaire : soigner les personnes atteintes.",
    dejours:
      "Piège : la primaire (organisationnelle) est la plus efficace ; s'arrêter à la secondaire individualise le problème.",
    eg: "Revoir la charge et l'autonomie d'un service (primaire) plutôt que de proposer seulement des séances de relaxation (secondaire).",
  },
];

// --- Adaptations pour les panels partagés (shared/panels) ---
// Les données ci-dessus (CAS, PROTO_STEPS embarqué, REDAC) alimentaient des
// forks locaux ; ces exports les reformatent au contrat des panels partagés
// sans perte de contenu, pour éviter la duplication de composants.

export const CASES: CaseItem[] = CAS.map((c) => ({
  vignette: c.desc,
  q1: {
    prompt: c.q[0]!.q,
    options: c.q[0]!.opts.map((label, i) => ({
      label,
      ok: i === c.q[0]!.ok,
      fb: c.q[0]!.expl,
    })),
  },
  q2: {
    prompt: c.q[1]!.q,
    options: c.q[1]!.opts.map((label, i) => ({
      label,
      ok: i === c.q[1]!.ok,
      fb: c.q[1]!.expl,
    })),
  },
}));

export const PROTO: ProtoStep[] = [
  {
    n: 1,
    t: "Réception de la demande brute",
    role: "Cadrage",
    d: "Accueillir la demande du prescripteur telle qu'elle est formulée, sans encore la valider ni la refuser.",
  },
  {
    n: 2,
    t: "Analyse de la triangulation",
    role: "Cadrage",
    d: "Identifier les enjeux et intérêts respectifs du prescripteur, des sujets évalués et du psychologue lui-même.",
  },
  {
    n: 3,
    t: "Négociation et reformulation de la demande",
    role: "Mandat",
    d: "Déconstruire la demande brute pour la reformuler en objectifs cliniques compatibles avec la déontologie.",
  },
  {
    n: 4,
    t: "Contractualisation écrite du mandat",
    role: "Mandat",
    d: "Fixer par écrit le périmètre, les méthodes et les limites de l'intervention négociée.",
  },
  {
    n: 5,
    t: "Recueil clinique de données",
    role: "Terrain",
    d: "Mener entretiens et observations sur le travail réel, avec consentement libre et éclairé des personnes.",
  },
  {
    n: 6,
    t: "Restitution individuelle compréhensible",
    role: "Restitution",
    d: "Restituer à chaque sujet évalué des résultats clairs et compréhensibles, avant toute transmission.",
  },
  {
    n: 7,
    t: "Rapport anonymisé au commanditaire",
    role: "Restitution",
    d: "Transmettre au prescripteur un avis argumenté et anonymisé, sans livrer le matériel brut ni le contenu intime.",
  },
];

export const PROTO_REFERENCE_EXPLANATION =
  "La trame d'une intervention déontologiquement rigoureuse est : 1) Réception de la demande brute, 2) Analyse de la triangulation, 3) Négociation et reformulation en mandat, 4) Contractualisation écrite, 5) Recueil clinique de données sous consentement, 6) Restitution individuelle compréhensible, 7) Rapport anonymisé au commanditaire.";

export const REDAC_ITEMS: RedacItem[] = REDAC.map((r) => [
  r.t,
  [r.intro, ...r.plan.split("<br/>")],
  r.corrige,
]);

/**
 * Bases de données pour le module PST108.
 * Extrait automatiquement de src/pages/pst108.astro.
 */

export const A = {
  precurseurs: "Vygotski · Instrument psy.",
  dejours: "Clot · Clinique du dialogue",
  molinier: "Pragmatique du langage",
  management: "Psychanalyse & subjectivité",
  sante: "Dialogue restauré",
  pathologie: "Silence organisationnel",
};

export const FICHES = [
  {
    a: "dejours",
    t: "Séance 1 : La posture épistémologique — le langage, matière première",
    ess: "<h5>Refuser la vision « transfert »</h5><p>Le langage n'est pas un simple <b>code</b> pour échanger des informations. Il est la <b>matière première</b> de la pratique du psychologue et un instrument psychologique d'action sur le réel.</p><h5>Médiateur de l'activité</h5><p>Étudier le langage en psychologie du travail, c'est l'envisager comme <b>médiateur de l'activité</b> et constructeur de la pensée. Le clinicien agit <b>par et sur le mot</b> pour accéder au « drame du travail ».</p>",
    ph: "Le langage est la matière première du psychologue, pas un simple canal de transmission.",
    ex: "Reformuler avec un salarié ce qu'il « n'arrive pas à dire » de son travail fait surgir un conflit de critères jusque-là invisible.",
    trap: "Réduire la communication au schéma émetteur → message → récepteur (modèle télégraphique).",
  },
  {
    a: "precurseurs",
    t: "Séance 2 : Le langage comme « milieu » — intersubjectivité",
    ess: "<h5>Phylogenèse & ontogenèse</h5><p>Le langage a des fondements neurophysiologiques, mais c'est avant tout un <b>milieu</b>. Il naît de l'<b>intersubjectivité</b> (primaire puis secondaire).</p><h5>Coopérer pour transformer</h5><p>Le langage émerge du besoin de <b>coopération</b> pour agir sur le milieu : on parle d'abord pour faire ensemble.</p>",
    ph: "Le langage naît de l'intersubjectivité et du besoin d'agir avec l'autre.",
    ex: "L'attention conjointe (intersubjectivité secondaire) : l'enfant et l'adulte se coordonnent autour d'un objet tiers avant le langage propositionnel.",
    trap: "Penser le langage comme une faculté purement individuelle et innée, coupée du social.",
  },
  {
    a: "precurseurs",
    t: "Séance 3 : La primauté du social (Vygotski)",
    ess: "<h5>Du social à l'intime</h5><p>Le langage est d'abord <b>social</b> (pour agir avec l'autre) avant de s'<b>intérioriser</b> pour devenir un outil psychologique.</p><h5>Le langage intérieur</h5><p>Intériorisé, le langage devient le <b>langage intérieur</b> qui structure la pensée et l'action. Le développement va de l'interpsychique vers l'intrapsychique.</p>",
    ph: "Toute fonction psychique supérieure apparaît deux fois : d'abord entre les personnes, puis en soi.",
    ex: "L'enfant qui se parle à voix haute pour guider son action (langage égocentrique) avant que ce monologue ne s'intériorise.",
    trap: "Inverser le sens du développement : croire que le langage intérieur précède le langage social.",
  },
  {
    a: "precurseurs",
    t: "Séance 4 : L'instrument psychologique — le langage réalise la pensée",
    ess: "<h5>Réaliser, non traduire</h5><p>Le langage ne <b>traduit</b> pas une pensée déjà faite : il la <b>réalise</b>. La pensée se construit dans le mouvement même de la mise en mots.</p><h5>Outil de la conscience</h5><p>Comme instrument psychologique, le langage <b>structure la conscience</b> et médiatise le rapport au monde, à la manière dont l'outil technique médiatise l'action sur la matière.</p>",
    ph: "La pensée ne s'exprime pas dans le mot, elle se réalise dans le mot (Vygotski).",
    ex: "Mettre en mots une difficulté de métier ne « décrit » pas seulement le problème : cela le transforme et ouvre de nouvelles solutions.",
    trap: "Concevoir le mot comme une simple étiquette collée sur une pensée préexistante.",
  },
  {
    a: "molinier",
    t: "Séance 5 : La Sprachtheorie de Bühler — les fonctions du langage",
    ess: "<h5>Trois fonctions simultanées</h5><p>Pour Karl <b>Bühler</b>, tout signe linguistique remplit en même temps trois fonctions : <b>représentation</b> (dire le monde), <b>expression</b> (dire le locuteur) et <b>appel</b> (agir sur l'auditeur).</p><h5>Un organon</h5><p>Le langage est un <i>organon</i>, un outil : il met en relation un émetteur, un récepteur et les objets du monde, mais toujours selon ces trois fonctions à la fois.</p>",
    ph: "Un même énoncé représente le monde, exprime le sujet et appelle autrui à la fois (Bühler).",
    ex: "« Il fait froid ici » : représente une température, exprime un inconfort, et appelle l'autre à fermer la fenêtre.",
    trap: "Réduire un énoncé à sa seule fonction de représentation (le « contenu informatif »).",
  },
  {
    a: "molinier",
    t: "Séance 6 : Les actes de langage (Austin/Searle) — quand dire, c'est faire",
    ess: "<h5>Le performatif</h5><p><b>Austin</b> montre que certains énoncés ne décrivent rien : ils <b>font</b> quelque chose (« je promets », « je vous déclare… »). Parler, c'est agir.</p><h5>Acte illocutoire</h5><p><b>Searle</b> systématise : tout énoncé porte une force <b>illocutoire</b> (ordonner, promettre, prescrire) qui agit sur le monde et sur autrui, et produit des effets (perlocutoires).</p>",
    ph: "Dire, c'est faire : l'énoncé modifie le réel et les rapports sociaux (Austin).",
    ex: "Une prescription paradoxale dans un centre d'appels (« soyez chaleureux, mais tenez 3 minutes par appel ») agit comme un acte contradictoire qui empêche.",
    trap: "Croire que les énoncés ne font que « décrire » des états de fait (illusion descriptive dénoncée par Austin).",
  },
  {
    a: "management",
    t: "Séance 7 : La parole et l'inconscient — lapsus, mot d'esprit, cure",
    ess: "<h5>Les formations de l'inconscient</h5><p>Le <b>lapsus</b> et le <b>mot d'esprit</b> révèlent les conflits psychiques sous-jacents : la parole laisse passer ce que le sujet ne maîtrise pas.</p><h5>Fonction de cure</h5><p>La parole a une <b>fonction de cure</b> : adressée à autrui, elle permet d'élaborer la souffrance. Le « comment » du dire compte autant que le « quoi ».</p>",
    ph: "Le lapsus est une vérité qui s'échappe : la parole déborde l'intention consciente.",
    ex: "Un cadre qui « rate » systématiquement le prénom d'un subordonné qu'il dévalorise : le lapsus dit le conflit.",
    trap: "Confondre la parole-cure (élaboration adressée) avec un simple « défoulement » ou une technique de communication.",
  },
  {
    a: "management",
    t: "Séance 8 : L'impossibilité de dire — silence défensif & activité empêchée",
    ess: "<h5>Le silence comme défense</h5><p>Face à la souffrance, le sujet peut être dans l'<b>impossibilité de dire</b> son travail : le silence défensif protège mais isole.</p><h5>L'activité empêchée</h5><p>Ce qui ne peut être ni fait ni dit s'accumule en <b>activité empêchée</b> : le réel du travail devient indicible, donc indiscutable, et pèse sur la santé.</p>",
    ph: "Ce qui ne peut se dire ne peut se discuter : le silence empêche l'activité de se développer.",
    ex: "Des soignants qui ne parlent jamais des soins qu'ils n'ont pas pu donner faute de temps : le « sale boulot » devient un non-dit pathogène.",
    trap: "Lire le silence comme une absence de problème plutôt que comme le symptôme d'un empêchement.",
  },
  {
    a: "dejours",
    t: "Séance 9 : La pensée dialogique (Vygotski/Fernyhough)",
    ess: "<h5>Penser, c'est dialoguer</h5><p>La pensée est un <b>dialogue intériorisé</b> : penser, c'est faire dialoguer des voix (Fernyhough). Le langage intérieur garde la structure du dialogue social.</p><h5>Le mot, carrefour</h5><p>Le mot est le <b>carrefour</b> où se croisent l'expérience sociale et l'expérience intime : il relie le collectif et le singulier.</p>",
    ph: "Le mot est le carrefour de l'expérience sociale et de l'expérience intime.",
    ex: "Délibérer intérieurement (« d'un côté…, mais de l'autre… ») reproduit en soi la controverse qu'on a connue dans le collectif de métier.",
    trap: "Opposer pensée individuelle et dialogue social : la première est une intériorisation du second.",
  },
  {
    a: "dejours",
    t: "Séance 10 : Le drame du travail (Clot) — conflits de critères",
    ess: "<h5>Le travail est conflictuel</h5><p>Le travail est toujours traversé de <b>conflits</b> (de critères, de valeurs, de buts). Ce n'est pas une pathologie : c'est sa structure même.</p><h5>Rendre le réel discutable</h5><p>Le dialogue clinique doit permettre de rendre ce réel <b>« dicible et discutable »</b>, condition pour que le métier se développe.</p>",
    ph: "Le travail est un drame : un théâtre de conflits de critères à rendre dicibles.",
    ex: "Un juge d'instruction tiraillé entre la cadence des dossiers et l'exigence de vérité : nommer ce conflit le rend travaillable.",
    trap: "Vouloir « supprimer » le conflit plutôt que l'organiser et le rendre discutable.",
  },
  {
    a: "dejours",
    t: "Séance 11 : Restaurer la dispute professionnelle — genre & style",
    ess: "<h5>Pas de consensus mou</h5><p>L'objectif n'est pas un consensus mou mais une <b>controverse saine</b> sur les critères du <b>travail bien fait</b>.</p><h5>Genre & style</h5><p>Le <b>genre professionnel</b> (les règles de métier partagées) se régénère par le dialogue ; il devient une ressource pour le <b>style</b> de chacun. C'est le collectif comme instrument de santé.</p>",
    ph: "Relancer la dispute sur le « travail bien fait » régénère le genre professionnel.",
    ex: "Une auto-confrontation croisée où deux infirmières confrontent leurs manières de faire un pansement : la controverse réveille la règle de métier.",
    trap: "Confondre la dispute professionnelle (sur les critères du métier) avec un conflit interpersonnel à apaiser.",
  },
  {
    a: "dejours",
    t: "Séance 12 : Le cadre déontologique de la clinique du dialogue (lien PST123)",
    ess: "<h5>Manier la matière première</h5><p>La clinique du dialogue exige un <b>cadre strict</b>. Manier la parole impose la maîtrise du <b>secret professionnel</b> et de la protection de la parole recueillie.</p><h5>Triangulation de la restitution</h5><p>La restitution doit respecter la <b>triangulation</b> (sujet, commanditaire, psychologue) : on rend compte de l'activité sans trahir la parole singulière.</p>",
    ph: "La parole protégée est la condition de la parole libre : pas de dialogue clinique sans cadre déontologique.",
    ex: "Anonymiser et faire valider par les participants les verbatim d'une intervention avant toute restitution à la direction.",
    trap: "Restituer à la hiérarchie des propos identifiables recueillis sous couvert de confidentialité.",
  },
];

export const KW_DEFS = {
  communication: "Échange d'informations et de messages entre locuteurs.",
  intersubjectivité:
    "Partage des états subjectifs et compréhension mutuelle entre individus.",
  partagées:
    "Significations communes élaborées et validées socialement par le collectif.",
  acte: "Le langage comme action sur autrui et sur le monde (théorie des actes de langage).",
  "lev vygotski":
    "Psychologue soviétique, fondateur de la théorie historico-culturelle du développement.",
  "instrument psychologique":
    "Outil sémiotique (comme le langage) servant à orienter et maîtriser son propre psychisme.",
  intériorisation:
    "Passage d'une fonction psychique du plan social (interpsychique) au plan individuel (intrapsychique).",
  intériorisé:
    "Devenu une structure mentale interne (le langage intérieur qui soutient la pensée).",
  appropriation:
    "Processus d'assimilation active d'un outil culturel par le sujet.",
  bakhtine:
    "Mikhail Bakhtine, théoricien de la littérature et du langage (polyphonie et dialogisme).",
  dialogique:
    "Propriété de tout discours d'être constitué en réponse à des discours antérieurs.",
  polyphonie:
    "Présence de plusieurs voix et points de vue au sein d'un même énoncé.",
  "yves clot":
    "Psychologue du travail, figure majeure de la clinique de l'activité en France.",
  "controverse de métier":
    "Débat et confrontation réglée entre pairs sur la manière de bien faire le travail.",
  "genre professionnel":
    "Règles, manières de faire et de dire partagées par un collectif de pairs.",
  "pouvoir d'agir":
    "Marge de manœuvre et capacité d'initiative du travailleur sur son milieu professionnel.",
  "auto-confrontations croisées":
    "Méthode clinique où deux professionnels commentent ensemble les vidéos de leur propre activité.",
  désengluer:
    "Sortir de l'impasse ou du silence pathogène en restaurant le dialogue de métier.",
  "instrument d'action":
    "Le langage réinvesti pour transformer concrètement l'organisation et l'activité.",
};

export const PARCOURS = [
  {
    id: "comprendre",
    title: "1. Langage Social",
    fenetre: "J-30 → J-21",
    desc: "Découverte de la fonction première du langage comme moyen de communication sociale.",
    onglets: [
      ["fiches", "Fiches"],
      ["recits", "Récits"],
      ["lexique", "Lexique"],
    ],
    items: [
      "Lire les fiches Langage Social",
      "QCM Chapitre 1",
      "Lexique: Intersubjectivité",
    ],
  },
  {
    id: "memoriser",
    title: "2. Instrument Psychologique",
    fenetre: "J-20 → J-11",
    desc: "Vygotski et l'intériorisation du langage comme outil de la pensée.",
    onglets: [
      ["cartes", "Cartes (Leitner)"],
      ["cloze", "Citations"],
      ["qui", "Qui a dit quoi"],
    ],
    items: [
      "Activer la révision espacée (Leitner)",
      "Faire les citations à trous",
      'Réussir "Qui a dit quoi" > 80%',
    ],
  },
  {
    id: "entrainer",
    title: "3. Controverses et Dialogisme",
    fenetre: "J-10 → J-4",
    desc: "L'apport de Bakhtine et Clot sur la polyphonie et le conflit de critères au travail.",
    onglets: [
      ["qcm", "QCM"],
      ["cas", "Cas cliniques"],
      ["simulateur", "Simulateur"],
    ],
    items: [
      "Valider le QCM complet > 85%",
      "Résoudre les cas guidés",
      "Terminer le simulateur d'intervention",
    ],
  },
  {
    id: "produire",
    title: "4. Pouvoir d'Agir",
    fenetre: "J-3 → J-1",
    desc: "Le langage comme moyen de regagner du pouvoir sur son activité.",
    onglets: [
      ["atelier", "Atelier d'écriture"],
      ["antiseche", "Antisèche"],
      ["examen", "Examen Blanc"],
    ],
    items: [
      "Faire 2 plans de dissertation",
      "Imprimer / relire l'antisèche",
      "Faire l'examen blanc complet",
    ],
  },
];

export const RECITS = [
  {
    a: "precurseurs",
    ic: "🗣️",
    t: "Le langage comme phénomène d'abord social",
    sub: "Communication et intersubjectivité",
    parts: [
      {
        beat: "Origines :",
        html: "La fonction première du langage est la <span class='kw'>communication</span> et l'<span class='kw'>intersubjectivité</span>. Avant même de structurer la pensée de l'individu, le langage permet de s'adresser à l'autre.",
      },
      {
        beat: "Le constat :",
        html: "C'est l'activité sociale qui précède l'activité individuelle. L'enfant s'inscrit d'abord dans un système de relations et de significations <span class='kw'>partagées</span>.",
      },
      {
        beat: "Action sur autrui :",
        html: "Parler, c'est agir sur l'autre. Le langage n'est pas un simple code de transfert d'information, c'est un <span class='kw'>acte</span> qui modifie la relation et l'environnement.",
      },
    ],
  },
  {
    a: "dejours",
    ic: "🧠",
    t: "L'instrument psychologique",
    sub: "Lev Vygotski et l'intériorisation",
    parts: [
      {
        beat: "Le concept :",
        html: "<span class='kw'>Lev Vygotski</span> introduit l'idée que le langage est un <span class='kw'>instrument psychologique</span> qui médiatise le rapport du sujet à lui-même.",
      },
      {
        beat: "Le processus :",
        html: "Le langage subit un processus d'<span class='kw'>intériorisation</span>. D'abord externe et social (pour communiquer avec les autres), il devient égocentrique, puis totalement <span class='kw'>intériorisé</span> pour devenir la pensée.",
      },
      {
        beat: "Conséquence :",
        html: "La pensée n'est pas une instance innée, elle est structurée par l'<span class='kw'>appropriation</span> des outils culturels et symboliques, au premier rang desquels figure le langage.",
      },
    ],
  },
  {
    a: "molinier",
    ic: "⚡",
    t: "Le dialogisme et la controverse",
    sub: "Mikhail Bakhtine et Yves Clot",
    parts: [
      {
        beat: "Le dialogisme :",
        html: "Pour <span class='kw'>Bakhtine</span>, tout énoncé est <span class='kw'>dialogique</span> : il répond toujours à un énoncé antérieur et anticipe une réponse. La parole est traversée par la <span class='kw'>polyphonie</span> (les voix des autres).",
      },
      {
        beat: "Application au travail :",
        html: "En clinique de l'activité, <span class='kw'>Yves Clot</span> montre que le métier vit par la <span class='kw'>controverse de métier</span>. Discuter des règles et des critères du \"travail bien fait\" est vital pour le collectif.",
      },
      {
        beat: "Le genre :",
        html: "Le <span class='kw'>genre professionnel</span> (les règles partagées et non écrites) se renouvelle grâce à ces disputes professionnelles. Quand la controverse s'éteint, le collectif s'étiole.",
      },
    ],
  },
  {
    a: "management",
    ic: "🔨",
    t: "Le pouvoir d'agir par le langage",
    sub: "Transformer le réel",
    parts: [
      {
        beat: "Le constat :",
        html: "Le travail contraint (taylorisé) réduit le salarié au silence. La privation de parole est une privation de <span class='kw'>pouvoir d'agir</span>.",
      },
      {
        beat: "La méthode :",
        html: "Les méthodes cliniques (comme les <span class='kw'>auto-confrontations croisées</span>) visent à relancer la pensée en poussant les professionnels à parler de leur activité réelle à leurs pairs.",
      },
      {
        beat: "L'effet clinique :",
        html: "Mettre en mots l'expérience indicible ou empêchée permet de se <span class='kw'>désengluer</span> de la souffrance. Le langage redevient un <span class='kw'>instrument d'action</span> sur le monde.",
      },
    ],
  },
];

export const QCM_DATA = [
  {
    q: "Quelle est la posture épistémologique du cours sur le langage ?",
    opts: [
      "Le langage est un code neutre pour transférer de l'information",
      "Le langage est la matière première du psychologue et le médiateur de l'activité",
      "Le langage est un simple reflet de la pensée déjà constituée",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> On refuse la vision « transfert » : le clinicien agit par et sur le mot pour accéder au drame du travail.",
  },
  {
    q: "Pour Vygotski, le développement du langage va :",
    opts: [
      "Du langage intérieur vers le langage social",
      "Du langage social (interpsychique) vers le langage intérieur (intrapsychique)",
      "D'une faculté innée vers son extinction sociale",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Toute fonction psychique supérieure apparaît d'abord entre les personnes, puis s'intériorise.",
  },
  {
    q: "Que signifie « le langage est un instrument psychologique » (Vygotski) ?",
    opts: [
      "Il sert uniquement à communiquer des ordres",
      "Il médiatise les fonctions psychiques et structure la conscience, comme l'outil médiatise l'action",
      "Il remplace progressivement la pensée",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Le langage ne traduit pas la pensée, il la réalise et structure la conscience.",
  },
  {
    q: "Les trois fonctions du signe selon la Sprachtheorie de Bühler sont :",
    opts: [
      "Représentation, expression, appel",
      "Émission, transmission, réception",
      "Syntaxe, sémantique, pragmatique",
    ],
    correct: 0,
    exp: "<b>Bonne réponse.</b> Tout signe représente le monde, exprime le locuteur et appelle l'auditeur, simultanément (organon).",
  },
  {
    q: "La théorie des actes de langage (Austin) affirme que :",
    opts: [
      "Tous les énoncés décrivent des états de fait",
      "Certains énoncés accomplissent un acte : quand dire, c'est faire",
      "Le langage est sans effet sur le réel",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Austin dénonce l'illusion descriptive : les performatifs font quelque chose (promettre, prescrire).",
  },
  {
    q: "La « force illocutoire » d'un énoncé (Searle) désigne :",
    opts: [
      "Le volume sonore de la voix",
      "L'acte accompli en disant (ordonner, promettre, prescrire)",
      "La longueur de la phrase",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Searle systématise l'acte illocutoire ; ses effets sur autrui sont dits perlocutoires.",
  },
  {
    q: "En clinique, le lapsus et le mot d'esprit sont compris comme :",
    opts: [
      "Des bruits insignifiants",
      "Des révélateurs de conflits psychiques sous-jacents",
      "De simples erreurs de vocabulaire",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> La parole déborde l'intention consciente : c'est la voie des formations de l'inconscient.",
  },
  {
    q: "La pensée dialogique (Vygotski / Fernyhough) signifie que :",
    opts: [
      "Penser, c'est faire dialoguer des voix intériorisées",
      "La pensée est un calcul purement logique et solitaire",
      "Le dialogue empêche de penser",
    ],
    correct: 0,
    exp: "<b>Bonne réponse.</b> Le mot est le carrefour de l'expérience sociale et de l'expérience intime.",
  },
  {
    q: "Le « drame du travail » chez Clot désigne :",
    opts: [
      "Un événement tragique exceptionnel",
      "Le fait que le travail est structurellement traversé de conflits de critères et de valeurs",
      "Le burn-out d'un salarié",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Le dialogue clinique vise à rendre ce réel « dicible et discutable ».",
  },
  {
    q: "Restaurer la « dispute professionnelle », c'est :",
    opts: [
      "Rechercher un consensus apaisé entre collègues",
      "Organiser une controverse saine sur les critères du travail bien fait",
      "Arbitrer un conflit interpersonnel",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Ce débat collectif régénère le genre professionnel : le collectif devient instrument de santé.",
  },
  {
    q: "La distinction genre / style professionnel oppose :",
    opts: [
      "Les règles de métier partagées (genre) à l'appropriation singulière de chacun (style)",
      "Le masculin au féminin",
      "L'écrit à l'oral",
    ],
    correct: 0,
    exp: "<b>Bonne réponse.</b> Le genre est une ressource pour le style ; le style fait évoluer le genre.",
  },
  {
    q: "L'« activité empêchée » désigne :",
    opts: [
      "Le travail interdit par le règlement",
      "Ce qui aurait pu être fait ou dit et ne l'a pas été, et qui pèse sur la santé",
      "Une pause non autorisée",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Ce qui reste indicible devient indiscutable et s'accumule, d'où sa portée pathogène.",
  },
  {
    q: "Le « silence organisationnel » est :",
    opts: [
      "Une politique de calme au bureau",
      "L'atrophie collective des espaces où le métier pourrait se débattre",
      "Une absence de réunions",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Le silence défensif individuel se généralise en silence organisationnel pathogène.",
  },
  {
    q: "La posture du psychologue dans la clinique du dialogue est :",
    opts: [
      "Un expert qui prescrit la bonne pratique",
      "Un facilitateur neutre qui fluidifie la communication",
      "Un clinicien engagé qui prend parti pour l'activité et organise la controverse",
    ],
    correct: 2,
    exp: "<b>Bonne réponse.</b> Il crée le cadre permettant l'affrontement des points de vue et soutient la reprise du pouvoir d'agir.",
  },
  {
    q: "L'auto-confrontation croisée consiste à :",
    opts: [
      "Faire commenter à un professionnel sa propre activité filmée puis confronter sa manière de faire à celle d'un pair",
      "Confronter le salarié à sa hiérarchie",
      "Comparer deux entreprises",
    ],
    correct: 0,
    exp: "<b>Bonne réponse.</b> La controverse entre pairs réveille les règles de métier et rouvre le développement.",
  },
  {
    q: "Le cadre déontologique de la clinique du dialogue impose notamment (lien PST123) :",
    opts: [
      "De transmettre les verbatim nominatifs à la direction",
      "Le secret professionnel, la protection de la parole et la triangulation de la restitution",
      "De publier les enregistrements pour la transparence",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> La parole protégée est la condition de la parole libre.",
  },
  {
    q: "Pour Vygotski, le langage :",
    opts: [
      "Traduit une pensée déjà formée",
      "Est d’abord social puis s’intériorise comme outil psychologique",
      "N’a aucun rôle dans la pensée",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Le langage intérieur structure la conscience et l’action.",
  },
  {
    q: "« Quand dire, c’est faire » renvoie à :",
    opts: [
      "La théorie des actes de langage (Austin/Searle)",
      "La psychanalyse",
      "L’ergonomie",
    ],
    correct: 0,
    exp: "<b>Bonne réponse.</b> L’énoncé agit sur le monde et sur autrui (promettre, prescrire).",
  },
  {
    q: "La Sprachtheorie de Bühler distingue les fonctions :",
    opts: [
      "Phonétique, syntaxique, lexicale",
      "Représentation, expression, appel",
      "Émettre, coder, décoder",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Tout énoncé remplit ces trois fonctions simultanément.",
  },
  {
    q: "Le dialogisme (Bakhtine) signifie que :",
    opts: [
      "Toute parole est adressée et habitée par les voix des autres",
      "Le langage est un code neutre",
      "La pensée précède le langage",
    ],
    correct: 0,
    exp: "<b>Bonne réponse.</b> Le genre sert de « diapason » social ; on s’adresse aussi à un sur-destinataire.",
  },
  {
    q: "Pour la psychanalyse, le lapsus :",
    opts: [
      "Est une simple erreur sans signification",
      "Révèle des conflits psychiques sous-jacents",
      "Prouve un trouble du langage",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> La parole a une fonction de cure et révèle l’inconscient.",
  },
  {
    q: "La pensée dialogique (Vygotski/Fernyhough) désigne :",
    opts: [
      "Un dialogue intériorisé entre des voix",
      "Un monologue isolé",
      "Un calcul logique pur",
    ],
    correct: 0,
    exp: "<b>Bonne réponse.</b> Le mot est le carrefour de l’expérience sociale et intime.",
  },
  {
    q: "L’objectif de la clinique du dialogue est :",
    opts: [
      "Un consensus apaisé entre travailleurs",
      "Rendre le réel du travail dicible et discutable (controverse saine)",
      "Évaluer la performance individuelle",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> La controverse réglée relance le genre et le pouvoir d’agir.",
  },
  {
    q: "Le « silence organisationnel » est :",
    opts: [
      "Une pause réglementaire",
      "L’atrophie des espaces de controverse (reporting, lean, télétravail)",
      "Le secret professionnel",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Il est pathogène : il empêche le débat sur les critères du métier.",
  },
];

export const QUI = [
  [
    "La pensée ne s'exprime pas dans le mot, elle se réalise dans le mot.",
    "precurseurs",
    "<b>Lev Vygotski.</b> Le langage ne traduit pas une pensée déjà faite : il la construit (instrument psychologique).",
    "precurseurs",
  ],
  [
    "Quand dire, c'est faire : certains énoncés ne décrivent rien, ils accomplissent un acte.",
    "molinier",
    "<b>John Austin.</b> Théorie des actes de langage : le performatif et la force illocutoire.",
    "molinier",
  ],
  [
    "Le dialogue clinique doit rendre le réel du travail « dicible et discutable ».",
    "dejours",
    "<b>Yves Clot.</b> Le drame du travail et la restauration de la dispute professionnelle.",
    "dejours",
  ],
  [
    "Le lapsus révèle un conflit psychique : la parole laisse passer ce que le sujet ne maîtrise pas.",
    "management",
    "<b>Approche psychanalytique (Freud).</b> Les formations de l'inconscient et la fonction de cure de la parole.",
    "management",
  ],
  [
    "Le mot est le carrefour où se croisent l'expérience sociale et l'expérience intime.",
    "precurseurs",
    "<b>Lev Vygotski.</b> La pensée dialogique : le langage intérieur garde la structure du dialogue social.",
    "precurseurs",
  ],
  [
    "Tout énoncé représente le monde, exprime le locuteur et appelle l'auditeur, simultanément.",
    "molinier",
    "<b>Karl Bühler.</b> La Sprachtheorie et les trois fonctions du signe linguistique (organon).",
    "molinier",
  ],
  [
    "« Le langage est d'abord social (pour agir avec l'autre) avant de s'intérioriser comme outil psychologique. »",
    "precurseurs",
    "<b>Lev Vygotski.</b> Primauté du social ; le langage intérieur structure la pensée.",
    "precurseurs",
  ],
  [
    "« Quand dire, c'est faire : parler, c'est agir sur le monde et sur autrui. »",
    "molinier",
    "<b>Austin / Searle.</b> Théorie des actes de langage.",
    "molinier",
  ],
  [
    "« Le dialogue clinique doit rendre le réel du travail dicible et discutable. »",
    "dejours",
    "<b>Yves Clot.</b> Le langage comme instrument de développement de l'activité.",
    "dejours",
  ],
  [
    "« Le lapsus et le mot d'esprit révèlent les conflits psychiques sous-jacents. »",
    "management",
    "<b>Psychanalyse.</b> La parole a une fonction de cure et révèle l'inconscient.",
    "management",
  ],
  [
    "« Penser, c'est faire dialoguer des voix intériorisées. »",
    "precurseurs",
    "<b>Vygotski / Fernyhough.</b> La pensée dialogique.",
    "precurseurs",
  ],
  [
    "« Restaurer la dispute professionnelle relance le genre et le pouvoir d'agir du collectif. »",
    "dejours",
    "<b>Yves Clot.</b> La controverse sur les critères du travail bien fait.",
    "dejours",
  ],
];

export const PIEGES = [
  [
    "Le langage est essentiellement un code servant à transférer de l'information d'un émetteur à un récepteur.",
    false,
    "<b>Faux !</b> C'est le piège télégraphique. Le langage est la matière première du psychologue, un instrument psychologique d'action sur le réel et le médiateur de l'activité.",
    "dejours",
  ],
  [
    "Pour Vygotski, le langage est d'abord social avant de s'intérioriser comme outil de la pensée.",
    true,
    "<b>Vrai !</b> Toute fonction psychique supérieure apparaît d'abord entre les personnes (interpsychique) puis en soi (intrapsychique).",
    "precurseurs",
  ],
  [
    "Selon Austin, tous les énoncés se contentent de décrire des états de fait.",
    false,
    "<b>Faux !</b> Austin dénonce justement cette « illusion descriptive » : certains énoncés font quelque chose (performatifs). Quand dire, c'est faire.",
    "molinier",
  ],
  [
    "Pour Clot, l'objectif de l'intervention est d'obtenir un consensus apaisé entre les travailleurs.",
    false,
    "<b>Faux !</b> L'objectif n'est pas un consensus mou mais une controverse saine sur les critères du travail bien fait, qui régénère le genre professionnel.",
    "dejours",
  ],
  [
    "Le lapsus est, en clinique, un simple bruit sans signification.",
    false,
    "<b>Faux !</b> Le lapsus et le mot d'esprit révèlent des conflits psychiques sous-jacents : la parole déborde l'intention consciente.",
    "management",
  ],
  [
    "La verbalisation de l'activité permet de transformer l'expérience en savoir d'expérience.",
    true,
    "<b>Vrai !</b> Le langage médiatise l'activité : mettre en mots ne décrit pas seulement, cela extrait le sens et fait évoluer le métier.",
    "dejours",
  ],
  [
    "Le psychologue de la clinique du dialogue est un facilitateur neutre qui fluidifie la communication.",
    false,
    "<b>Faux !</b> Il prend parti pour l'activité : il crée le cadre qui permet l'affrontement des points de vue et soutient la reprise du pouvoir d'agir.",
    "dejours",
  ],
  [
    "Le silence d'un collectif sur son travail est toujours le signe que tout va bien.",
    false,
    "<b>Faux !</b> Le silence peut être défensif et signer une activité empêchée ; généralisé, il devient un silence organisationnel pathogène.",
    "management",
  ],
  [
    "Le langage n'est qu'un code neutre servant à transmettre des informations.",
    false,
    "<b>Faux !</b> Il est la matière première du psychologue et le médiateur de l'activité : il construit la pensée, il ne la transporte pas.",
    "precurseurs",
  ],
  [
    "Pour Vygotski, le langage ne fait que traduire une pensée déjà formée.",
    false,
    "<b>Faux !</b> Le langage ne traduit pas la pensée, il la réalise et la structure (outil psychologique).",
    "precurseurs",
  ],
  [
    "Selon la théorie des actes de langage, énoncer une promesse ou une prescription, c'est agir sur autrui.",
    true,
    "<b>Vrai !</b> Austin : « quand dire, c'est faire » — l'énoncé modifie les rapports sociaux.",
    "molinier",
  ],
  [
    "L'objectif de la clinique du dialogue est d'obtenir un consensus apaisé entre les travailleurs.",
    false,
    "<b>Faux !</b> Ce n'est pas un consensus mou, mais l'organisation d'une controverse saine sur les critères du travail bien fait.",
    "dejours",
  ],
  [
    "Le reporting algorithmique et le lean peuvent produire un « silence organisationnel » pathogène.",
    true,
    "<b>Vrai !</b> Ils atrophient les espaces de controverse où se débattent les critères du métier.",
    "dejours",
  ],
];

export const DISTINGUER = [
  {
    pair: ["La langue (système)", "Le dialogue (pratique située)"],
    a: "dejours",
    crit: "La langue est le système abstrait de signes ; le dialogue est la pratique située, incarnée, traversée par des conflits de normes et orientée vers autrui.",
    items: [
      [
        "Les règles de grammaire et le lexique répertoriés dans un dictionnaire.",
        0,
      ],
      [
        "Une dispute de métier où deux collègues négocient ce qu'est un « bon » geste.",
        1,
      ],
      ["La conjugaison des verbes irréguliers comme système formel.", 0],
    ],
  },
  {
    pair: ["Genre professionnel", "Style professionnel"],
    a: "dejours",
    crit: "Le genre est l'ensemble des règles de métier partagées par le collectif ; le style est la manière singulière dont chacun se les approprie et les fait évoluer.",
    items: [
      [
        "Les manières de faire implicites communes à tous les soignants d'un service.",
        0,
      ],
      [
        "La façon personnelle dont cette infirmière-là adapte la règle à sa patiente.",
        1,
      ],
      [
        "Le répertoire des règles de métier transmis aux nouveaux arrivants.",
        0,
      ],
    ],
  },
  {
    pair: ["Agir stratégique", "Agir communicationnel"],
    a: "molinier",
    crit: "L'agir stratégique vise à influencer autrui pour atteindre un but (instrumental) ; l'agir communicationnel vise l'intercompréhension par la discussion d'arguments (Habermas).",
    items: [
      [
        "Un manager qui formule un message pour faire accepter une décision déjà prise.",
        0,
      ],
      [
        "Un collectif qui débat réellement des critères du travail bien fait pour s'accorder.",
        1,
      ],
      [
        "Une campagne de « communication interne » destinée à faire adhérer sans débat.",
        0,
      ],
    ],
  },
];

export const CLOZE = [
  [
    "precurseurs",
    [
      "La pensée ne s'exprime pas dans le mot, elle se ",
      { h: "réalise" },
      " dans le mot ; le langage est d'abord ",
      { h: "social" },
      " avant de s'intérioriser.",
    ],
  ],
  [
    "molinier",
    [
      "Selon Austin, quand dire, c'est ",
      { h: "faire" },
      " : l'énoncé porte une force ",
      { h: "illocutoire" },
      " qui agit sur autrui.",
    ],
  ],
  [
    "dejours",
    [
      "Le dialogue clinique doit rendre le réel du travail ",
      { h: "dicible" },
      " et ",
      { h: "discutable" },
      ".",
    ],
  ],
  [
    "dejours",
    [
      "L'objectif n'est pas le consensus mou mais la ",
      { h: "controverse" },
      " sur les critères du travail bien fait, qui régénère le ",
      { h: "genre" },
      " professionnel.",
    ],
  ],
  [
    "precurseurs",
    [
      "Le langage est d'abord ",
      { h: "social" },
      " avant de s'intérioriser comme outil ",
      { h: "psychologique" },
      ".",
    ],
  ],
  [
    "molinier",
    [
      "Selon la théorie des actes de langage, quand ",
      { h: "dire" },
      ", c'est ",
      { h: "faire" },
      ".",
    ],
  ],
  [
    "dejours",
    [
      "Le dialogue clinique rend le réel du travail ",
      { h: "dicible" },
      " et ",
      { h: "discutable" },
      ".",
    ],
  ],
  [
    "dejours",
    [
      "La ",
      { h: "dispute" },
      " professionnelle est une controverse réglée sur les critères du travail bien ",
      { h: "fait" },
      ".",
    ],
  ],
  [
    "management",
    [
      "Le ",
      { h: "lapsus" },
      " révèle les ",
      { h: "conflits" },
      " psychiques sous-jacents.",
    ],
  ],
];

export const REDAC = [
  [
    "Comment la compréhension des racines psychologiques et sociales du langage permet-elle au psychologue de restaurer les disputes professionnelles pour relancer le pouvoir d'agir des collectifs ?",
    [
      "Amorce : le langage comme « matière première » du psychologue ; agir par et sur le mot pour accéder au drame du travail (Clot).",
      "Distinguer la langue (système) du dialogue (pratique située, traversée de conflits de normes).",
      "I — De l'origine du langage à la structuration de l'activité : milieu/intersubjectivité, instrument psychologique (Vygotski), verbalisation qui transforme l'expérience en savoir (Clot).",
      "II — La pluralité des statuts du langage : le langage comme action (Austin), révélateur de la subjectivité (lapsus, silence défensif), dimension dialogique et conflictuelle.",
      "III — La clinique du dialogue : posture non prescriptive (ni expert, ni facilitateur neutre), restaurer la dispute sur le métier, cadre déontologique (lien PST123).",
      "Conclusion : le dialogue est le moteur du développement du métier ; ouverture sur l'atrophie des espaces de controverse (reporting, lean, télétravail — lien PST124).",
    ],
    "<p>Le langage n'est pas un simple code pour échanger des informations : il est la <b>matière première</b> de la pratique du psychologue et un instrument psychologique d'action sur le réel. Le clinicien agit <i>par et sur le mot</i> pour accéder au « drame du travail » (Clot). On distinguera la <b>langue</b> (système abstrait) du <b>dialogue</b> (pratique située, incarnée, traversée de conflits de normes). Problème : comment la compréhension des racines du langage permet-elle de restaurer les disputes professionnelles pour relancer le pouvoir d'agir des collectifs ?</p><p><b>I.</b> Le langage est d'abord un <b>milieu</b> né de l'intersubjectivité et du besoin de coopérer. Avec Vygotski, il s'intériorise pour devenir l'<b>instrument psychologique</b> qui réalise la pensée — « la pensée ne s'exprime pas dans le mot, elle se réalise dans le mot ». La verbalisation de l'activité transforme alors l'expérience en <b>savoir d'expérience</b> : le mot fait pont entre le style individuel et le genre collectif.</p><p><b>II.</b> Le langage a des statuts pluriels. Il est <b>action</b> : avec Austin, « quand dire, c'est faire » — une prescription paradoxale agit comme un acte qui empêche. Il est <b>révélateur de la subjectivité</b> : le lapsus trahit le conflit, et l'impossibilité de dire (silence défensif) signe une activité empêchée. Il est enfin <b>dialogique et conflictuel</b> : penser, c'est faire dialoguer des voix (Fernyhough), mais travailler, c'est faire dialoguer des normes.</p><p><b>III.</b> La clinique du dialogue adopte une posture <b>non prescriptive</b> : le psychologue n'est ni l'expert qui livre la solution, ni le facilitateur neutre qui fluidifie la communication ; il prend parti pour l'activité et organise l'affrontement des points de vue (auto-confrontations simple puis croisée). L'objectif est de restaurer la <b>dispute professionnelle</b> sur les critères du travail bien fait, réveillant le collectif comme instrument de santé. Cela exige un <b>cadre déontologique</b> strict (secret, protection de la parole, triangulation de la restitution — lien PST123).</p><p>En conclusion, le dialogue professionnel n'est pas un supplément d'âme managérial : c'est le moteur du développement du métier. On peut alors interroger la manière dont les nouvelles ingénieries du travail (reporting algorithmique, lean, télétravail — lien PST124) atrophient ces espaces de controverse et produisent un <b>silence organisationnel</b> pathogène.</p>",
  ],
  [
    "En quoi peut-on dire, avec la psychologie du travail, que « parler, c'est agir » ? Vous discuterez les usages du langage par le psychologue.",
    [
      "Définir le langage comme action (performatif d'Austin, force illocutoire de Searle).",
      "Montrer que l'énoncé modifie les rapports sociaux (prescription, promesse, évaluation).",
      "Nuancer : le langage agit aussi en révélant (lapsus) et en empêchant (injonction paradoxale, silence).",
      "Le langage comme instrument de développement de l'activité (Clot) : verbaliser pour transformer.",
      "Les usages cliniques : auto-confrontation, restauration de la controverse, posture engagée.",
      "Conclusion : agir par le mot exige un cadre déontologique (protection de la parole).",
    ],
    "<p>Affirmer que « parler, c'est agir », c'est rompre avec la conception du langage comme simple description du monde. Austin distingue les énoncés <b>performatifs</b> (« je promets », « je vous prescris ») qui accomplissent un acte, et Searle systématise la <b>force illocutoire</b> de tout énoncé. Parler engage donc le locuteur, modifie les rapports sociaux et produit des effets.</p><p>Au travail, cette dimension est centrale : une prescription, une évaluation, une consigne <b>agissent</b>. Mais l'action du langage est ambivalente. Il peut <b>révéler</b> ce que le sujet ne maîtrise pas (le lapsus dit le conflit) et il peut <b>empêcher</b> : l'injonction paradoxale ou le silence défensif bloquent l'activité.</p><p>Pour le psychologue, le langage est surtout un <b>instrument de développement de l'activité</b> (Clot) : verbaliser l'activité, en auto-confrontation, transforme l'expérience en savoir et rouvre la controverse sur le métier. Le clinicien n'use donc pas du mot pour « fluidifier » la communication, mais pour rendre le réel dicible et discutable et relancer le pouvoir d'agir.</p><p>Agir par le mot impose enfin un <b>cadre déontologique</b> : protéger la parole recueillie, respecter le secret et la triangulation de la restitution. Parler, c'est agir — y compris sur la santé d'autrui ; d'où la responsabilité du psychologue.</p>",
  ],
  [
    "En quoi le langage est-il un instrument de l'activité plutôt qu'un simple code de transmission ?",
    [
      "Réfuter la vision du langage comme simple transfert d'informations.",
      "Vygotski : le langage social s'intériorise comme outil psychologique qui structure la pensée.",
      "Clot : le langage transforme l'expérience en savoir et construit les règles de métier.",
      "Actes de langage (Austin) : dire, c'est agir sur le réel et autrui.",
      "Conclure sur la clinique du dialogue (rendre le réel dicible et discutable).",
    ],
    "<p>Le langage n'est pas un simple <b>code</b> de transmission : il est la « matière première » du psychologue et le <b>médiateur de l'activité</b>. Avec Vygotski, le langage d'abord social s'intériorise comme <b>outil psychologique</b> qui réalise et structure la pensée.</p><p>Chez Clot, il <b>transforme l'expérience en savoir</b> et construit les règles de métier partagées. La théorie des actes de langage (Austin) montre que « quand dire, c'est faire » : l'énoncé agit sur le monde et sur autrui.</p><p>D'où la <b>clinique du dialogue</b> : rendre le réel du travail dicible et discutable pour relancer le pouvoir d'agir.</p>",
  ],
  [
    "La controverse professionnelle comme ressource : quel est le rôle du psychologue du dialogue ?",
    [
      "Définir le drame du travail (conflits de critères et de valeurs).",
      "Distinguer controverse saine et consensus mou.",
      "Posture non prescriptive : ni expert, ni facilitateur neutre.",
      "Restaurer la dispute sur les critères du « travail bien fait ».",
      "Cadre déontologique (secret, protection de la parole, triangulation).",
    ],
    "<p>Le travail est traversé de <b>conflits de critères et de valeurs</b> (le « drame du travail »). Le psychologue du dialogue ne cherche pas un <b>consensus mou</b> : il organise une <b>controverse saine</b> sur les critères du travail bien fait.</p><p>Sa posture est <b>non prescriptive</b> : il ne « fluidifie » pas la communication mais prend parti pour l'activité en soutenant la reprise du pouvoir d'agir, dans un cadre sécurisant (auto-confrontations).</p><p>Ce maniement de la « matière première » exige un <b>cadre déontologique</b> strict : secret professionnel, protection de la parole, triangulation de la restitution (lien PST123).</p>",
  ],
];

export const SIM = [
  {
    key: "autoconfrontation",
    title: "Mener une auto-confrontation",
    persona: "Collectif de soignants (service sous tension)",
    context:
      "Tu interviens dans un service où « la communication ne passe plus ». Ton but : adopter la posture de la clinique du dialogue (ni expert, ni facilitateur neutre) et faire de la parole un instrument de développement de l'activité, pas un outil de pacification.",
    principes: [
      "Prendre parti pour l'activité, pas pour la pacification",
      "Rendre le réel du travail dicible et discutable",
      "Organiser la controverse plutôt que l'éteindre",
      "Protéger la parole (cadre déontologique)",
    ],
    steps: [
      {
        worker:
          "La cadre te demande : « Pouvez-vous faire une réunion pour apaiser les tensions et que tout le monde se reparle gentiment ? »",
        prompt: "Quelle est ta réponse clinique ?",
        options: [
          {
            label:
              "« Mon rôle n'est pas d'apaiser, mais d'organiser une controverse saine sur ce qu'est un bon soin ici. »",
            score: 2,
            fb: "Idéal : tu refuses le consensus mou et tu prends parti pour l'activité (dispute professionnelle).",
          },
          {
            label:
              "« D'accord, j'anime une réunion pour fluidifier la communication. »",
            score: 0,
            fb: "À éviter : posture de facilitateur neutre qui éteint le débat au lieu de l'ouvrir.",
          },
          {
            label:
              "« Je vais leur expliquer les bonnes pratiques de communication. »",
            score: 0,
            fb: "À proscrire : posture d'expert prescriptif, qui surplombe l'activité réelle.",
          },
        ],
      },
      {
        worker:
          "En auto-confrontation, une soignante se tait longuement devant la vidéo d'un soin bâclé faute de temps.",
        prompt: "Comment soutiens-tu la mise en mots sans forcer ?",
        options: [
          {
            label:
              "« Qu'est-ce que vous auriez voulu faire là, et qui n'a pas été possible ? »",
            score: 2,
            fb: "Idéal : tu fais surgir l'activité empêchée et tu rends le réel discutable.",
          },
          {
            label: "« Ce n'est pas grave, on passe à la séquence suivante. »",
            score: 0,
            fb: "À éviter : tu refermes l'espace au moment où le réel allait se dire.",
          },
          {
            label:
              "« Vous avez mal fait ce soin, il fallait prendre le temps. »",
            score: 1,
            fb: "Trop jugeant : tu prescris au lieu d'analyser le conflit de critères.",
          },
        ],
      },
    ],
  },
];

export const CASES = [
  {
    vignette:
      "Dans un centre d'appels, les téléconseillers reçoivent une consigne : « Soyez chaleureux et personnalisez la relation, mais ne dépassez jamais 3 minutes par appel. » Beaucoup décrivent un malaise et finissent par « réciter » un script sans plus rien écouter.",
    q1: {
      prompt: "Comment qualifier cette consigne du point de vue du langage ?",
      options: [
        {
          label:
            "Une prescription paradoxale (un acte de langage contradictoire qui empêche)",
          ok: true,
          fb: "Oui : « quand dire, c'est faire » (Austin) — l'énoncé contradictoire agit en rendant l'activité impossible à bien faire.",
        },
        {
          label: "Un simple problème d'information mal transmise",
          ok: false,
          fb: "Non : ce n'est pas un défaut de transmission mais un conflit de critères inscrit dans l'énoncé lui-même.",
        },
        {
          label: "Un manque de motivation des téléconseillers",
          ok: false,
          fb: "Piège : on individualise. Le malaise vient de l'injonction paradoxale, pas des personnes.",
        },
      ],
    },
    q2: {
      prompt: "Quelle intervention relève de la clinique du dialogue ?",
      options: [
        {
          label:
            "Ouvrir une controverse collective sur ce qu'est un « bon appel » pour rendre le conflit dicible et discutable",
          ok: true,
          fb: "Exact : restaurer la dispute professionnelle sur les critères du travail bien fait, et relancer le pouvoir d'agir.",
        },
        {
          label:
            "Former les conseillers à de meilleures techniques de communication pour tenir le script",
          ok: false,
          fb: "Non : on renforce la prescription et on tait le conflit au lieu de l'élaborer.",
        },
      ],
    },
  },
  {
    vignette:
      "Dans un service de soins, deux infirmières commentent ensemble la vidéo de l'une d'elles (autoconfrontation croisée). Un désaccord vif émerge sur la « bonne » façon d'annoncer une mauvaise nouvelle à un patient.",
    q1: {
      prompt: "Comment le clinicien doit-il traiter ce désaccord ?",
      options: [
        {
          label:
            "Comme une controverse féconde sur les critères du travail bien fait, à organiser",
          ok: true,
          fb: "Oui : la dispute professionnelle réglée relance le genre et le pouvoir d'agir.",
        },
        {
          label: "Comme un conflit de personnes à apaiser au plus vite",
          ok: false,
          fb: "Non : viser un consensus mou éteint la ressource développementale du dialogue.",
        },
        {
          label: "Comme une erreur professionnelle à corriger par la règle",
          ok: false,
          fb: "Non : le clinicien ne tranche pas ; il soutient l'élaboration collective des critères.",
        },
      ],
    },
    q2: {
      prompt: "Quelle est la fonction de l'autoconfrontation croisée ?",
      options: [
        {
          label:
            "Une « répétition sans répétition » : refaire l'activité par la pensée pour découvrir d'autres possibles",
          ok: true,
          fb: "Exact : le dialogue entre pairs produit des performances dialogiques inédites.",
        },
        {
          label: "Évaluer la performance individuelle de chaque soignante",
          ok: false,
          fb: "Non : ce serait détourner le dispositif en outil de contrôle (faute déontologique).",
        },
      ],
    },
  },
  {
    vignette:
      "Dans un centre d'appels, la consigne affichée exige « réactivité immédiate » tout en imposant « un traitement approfondi de chaque dossier ». Les téléconseillers se disent paralysés et culpabilisent.",
    q1: {
      prompt: "Comment qualifier cette double consigne contradictoire ?",
      options: [
        {
          label:
            "Une injonction paradoxale médiatisée par le langage (acte de langage qui piège)",
          ok: true,
          fb: "Oui : l'énoncé prescriptif agit sur le réel et enferme le sujet dans une contradiction.",
        },
        {
          label: "Un simple problème de priorisation à mieux organiser",
          ok: false,
          fb: "Non : la contradiction est structurelle, pas un défaut d'organisation individuelle.",
        },
        {
          label: "Un manque de compétence des téléconseillers",
          ok: false,
          fb: "Non : c'est la prescription, pas le sujet, qui est défaillante.",
        },
      ],
    },
    q2: {
      prompt: "Que permet la clinique du dialogue ?",
      options: [
        {
          label:
            "Rendre la contradiction dicible et discutable pour rouvrir des marges de manœuvre collectives",
          ok: true,
          fb: "Exact : mettre le réel en mots dans un cadre protégé restaure le pouvoir d'agir.",
        },
        {
          label:
            "Apprendre aux agents à mieux gérer leur stress individuellement",
          ok: false,
          fb: "Insuffisant : on laisse intacte l'injonction paradoxale qui produit la souffrance.",
        },
      ],
    },
  },
];

export const FRISE_DATA = [
  {
    annee: "1934",
    titre: " Karl Bühler — Sprachtheorie",
    desc: "La théorie de l'organon : tout signe linguistique remplit simultanément trois fonctions (représentation, expression, appel).",
  },
  {
    annee: "1934",
    titre: " Lev Vygotski — Pensée et langage",
    desc: "Le langage, d'abord social, s'intériorise en instrument psychologique : « la pensée se réalise dans le mot ».",
  },
  {
    annee: "1962",
    titre: " John Austin — How to do things with words",
    desc: "La théorie des actes de langage : « quand dire, c'est faire ». Searle systématise la force illocutoire.",
  },
  {
    annee: "1999-2008",
    titre: " Yves Clot — Clinique de l'activité",
    desc: "Genre & style, auto-confrontation croisée, dispute professionnelle : le dialogue comme instrument de développement de l'activité.",
  },
];

export const NODES = {
  matiere: {
    label: "Le mot (matière première)",
    s: "Le mot",
    a: "dejours",
    x: 380,
    y: 50,
    links: [{ to: "social", rel: "se déploie dans le" }],
  },
  social: {
    label: "Langage social / intersubjectivité",
    s: "Langage social",
    a: "precurseurs",
    x: 380,
    y: 140,
    links: [
      { to: "instrument", rel: "Trajectoire 1 : s'intériorise en" },
      { to: "code", rel: "Trajectoire 2 : se fige en" },
    ],
  },
  instrument: {
    label: "Instrument psychologique",
    s: "Instrument",
    a: "precurseurs",
    x: 210,
    y: 230,
    links: [{ to: "verbalisation", rel: "permet la" }],
  },
  verbalisation: {
    label: "Verbalisation de l'activité",
    s: "Verbalisation",
    a: "dejours",
    x: 210,
    y: 320,
    links: [{ to: "controverse", rel: "ouvre la" }],
  },
  controverse: {
    label: "Controverse sur le métier",
    s: "Controverse",
    a: "dejours",
    x: 210,
    y: 410,
    links: [{ to: "dispute", rel: "organise la" }],
  },
  dispute: {
    label: "Dispute professionnelle",
    s: "Dispute",
    a: "sante",
    x: 360,
    y: 480,
    links: [{ to: "pouvoir", rel: "régénère le genre et le" }],
  },
  pouvoir: {
    label: "Pouvoir d'agir",
    s: "Pouvoir d'agir",
    a: "sante",
    x: 360,
    y: 540,
    links: [],
  },
  code: {
    label: "Langage-code / prescription paradoxale",
    s: "Langage-code",
    a: "management",
    x: 550,
    y: 230,
    links: [{ to: "impossible", rel: "produit l'" }],
  },
  impossible: {
    label: "Impossibilité de dire le travail",
    s: "Impossibilité",
    a: "management",
    x: 550,
    y: 320,
    links: [{ to: "silence", rel: "mène au" }],
  },
  silence: {
    label: "Silence défensif",
    s: "Silence défensif",
    a: "pathologie",
    x: 550,
    y: 410,
    links: [{ to: "empeche", rel: "aboutit à l'" }],
  },
  empeche: {
    label: "Activité empêchée",
    s: "Activité empêchée",
    a: "pathologie",
    x: 680,
    y: 470,
    links: [{ to: "orga", rel: "se généralise en" }],
  },
  orga: {
    label: "Silence organisationnel",
    s: "Silence orga.",
    a: "pathologie",
    x: 680,
    y: 540,
    links: [],
  },
};

export const PROTO = [
  {
    n: 1,
    t: "La demande et le cadre",
    role: "Cadrage",
    d: "Reformuler la demande (souvent « apaiser les tensions ») en analyse de l'activité, et poser un cadre déontologique sécurisant.",
  },
  {
    n: 2,
    t: "Observation de l'activité réelle",
    role: "Terrain",
    d: "Observer et tracer le travail réel (situations, gestes) pour disposer d'un matériau à confronter.",
  },
  {
    n: 3,
    t: "Choix des séquences",
    role: "Sélection",
    d: "Sélectionner avec le professionnel les moments significatifs à reprendre en dialogue.",
  },
  {
    n: 4,
    t: "Auto-confrontation simple",
    role: "Dialogue",
    d: "Le professionnel commente l'enregistrement de sa propre activité : la verbalisation rouvre le sens.",
  },
  {
    n: 5,
    t: "Auto-confrontation croisée",
    role: "Controverse",
    d: "Deux pairs confrontent leurs manières de faire : la controverse réveille les règles de métier.",
  },
  {
    n: 6,
    t: "Retour au collectif",
    role: "Délibération",
    d: "La controverse est rapportée au collectif de métier pour débattre des critères du travail bien fait.",
  },
  {
    n: 7,
    t: "Restitution organisationnelle",
    role: "Action",
    d: "Restituer (dans le respect de la triangulation et du secret) pour transformer l'organisation et le métier.",
  },
];

export const ATELIER_SUJETS = [
  {
    t: "Sujet 1 : La place de la parole au travail et l'usage du langage par le psychologue",
    grid: [
      "Amorce : le langage comme « matière première » du psychologue (agir par et sur le mot)",
      "Distinction langue (système) / dialogue (pratique située, conflits de normes)",
      "Problématique sur la restauration des disputes professionnelles et le pouvoir d'agir",
      "I — Origine du langage et structuration de l'activité (milieu, instrument psychologique, verbalisation)",
      "II — Pluralité des statuts : langage-action (Austin), révélateur (lapsus/silence), dialogique-conflictuel",
      "III — Clinique du dialogue : posture engagée, dispute sur le métier, cadre déontologique (PST123)",
      "Conclusion + ouverture PST124 (silence organisationnel des nouvelles ingénieries du travail)",
    ],
    corrige:
      "<p>Une copie d'excellence pose d'emblée le langage comme matière première (et non comme code), déploie la triade Vygotski (instrument psychologique) — Austin (langage-action) — Clot (controverse / pouvoir d'agir), articule le dialogue intérieur et le dialogue social, et conclut sur le dialogue comme moteur du développement du métier, avec une ouverture sur l'atrophie des espaces de controverse (PST124) et le cadre déontologique (PST123).</p>",
  },
];

export const LEXIQUE = [
  {
    w: "Le langage comme matière première",
    a: "dejours",
    def: "Le langage n'est pas un canal neutre : c'est la matière première du psychologue, un instrument psychologique d'action sur le réel et le médiateur de l'activité. Le clinicien agit par et sur le mot.",
    eg: "Reformuler ce qu'un salarié n'arrive pas à dire fait surgir un conflit de critères invisible.",
  },
  {
    w: "Langage social → langage intérieur (Vygotski)",
    a: "precurseurs",
    def: "Le langage est d'abord social (interpsychique), pour agir avec autrui, avant de s'intérioriser (intrapsychique) et de devenir l'outil psychologique qui structure la pensée.",
    eg: "Le monologue de l'enfant qui guide son action s'intériorise peu à peu en langage intérieur.",
  },
  {
    w: "Instrument psychologique",
    a: "precurseurs",
    def: "Outil sémiotique (au premier rang le langage) qui médiatise les fonctions psychiques et structure la conscience, comme l'outil technique médiatise l'action sur la matière.",
    eg: "Mettre un problème de métier en mots ne le décrit pas seulement : cela le transforme.",
  },
  {
    w: "Médiation / médiateur de l'activité",
    a: "dejours",
    def: "Le langage ne double pas l'activité de l'extérieur : il la médiatise. Verbaliser l'activité permet d'en extraire le sens et de transformer l'expérience en savoir d'expérience.",
    eg: "Commenter sa propre activité filmée (auto-confrontation) en révèle des dimensions inaperçues.",
  },
  {
    w: "Sprachtheorie / fonctions du langage (Bühler)",
    a: "molinier",
    def: "Tout signe remplit simultanément trois fonctions : représentation (dire le monde), expression (dire le locuteur), appel (agir sur l'auditeur). Le langage est un organon, un outil.",
    eg: "« Il fait froid ici » : représente, exprime un inconfort et appelle à fermer la fenêtre.",
  },
  {
    w: "Actes de langage (Austin/Searle)",
    a: "molinier",
    def: "Quand dire, c'est faire : un énoncé porte une force illocutoire (promettre, ordonner, prescrire) qui agit sur le monde et sur autrui. Dépasse l'illusion purement descriptive du langage.",
    eg: "Une prescription paradoxale agit comme un acte contradictoire qui empêche d'agir.",
  },
  {
    w: "Genre & style professionnels (Clot)",
    a: "dejours",
    def: "Le genre est l'ensemble des règles de métier implicites partagées par un collectif ; le style est la manière singulière dont chacun se les approprie et les fait évoluer. Le genre est une ressource pour le style.",
    eg: "Deux soignantes mobilisent le même genre (faire un bon pansement) avec des styles distincts.",
  },
  {
    w: "Le drame du travail (Clot)",
    a: "dejours",
    def: "Le travail est structurellement traversé de conflits de critères et de valeurs. Le dialogue clinique vise à rendre ce réel « dicible et discutable », condition du développement du métier.",
    eg: "Le tiraillement d'un juge entre cadence et exigence de vérité : un drame à nommer.",
  },
  {
    w: "Dispute professionnelle / controverse",
    a: "sante",
    def: "Débat organisé et sain sur les critères du travail bien fait. Ni consensus mou, ni conflit interpersonnel : une controverse qui régénère le genre et relance le pouvoir d'agir collectif.",
    eg: "Une controverse en auto-confrontation croisée réveille la règle de métier endormie.",
  },
  {
    w: "Pensée dialogique",
    a: "precurseurs",
    def: "La pensée est un dialogue intériorisé : penser, c'est faire dialoguer des voix (Fernyhough). Le mot est le carrefour de l'expérience sociale et de l'expérience intime.",
    eg: "Délibérer intérieurement (« d'un côté…, de l'autre… ») rejoue la controverse collective.",
  },
  {
    w: "Activité empêchée",
    a: "management",
    def: "Tout ce qui aurait pu être fait ou dit et qui ne l'a pas été ; le réel du travail qui reste indicible et indiscutable s'accumule et pèse sur la santé.",
    eg: "Les soins non donnés faute de temps, jamais évoqués, deviennent un non-dit pathogène.",
  },
  {
    w: "Silence organisationnel",
    a: "management",
    def: "Atrophie collective des espaces où le métier pourrait se débattre : le silence défensif individuel se généralise en silence organisationnel pathogène, signe d'un milieu qui empêche.",
    eg: "Une organisation où plus personne ne discute les critères de qualité, par peur ou par lassitude.",
  },
  {
    w: "Auto-confrontation (simple / croisée)",
    a: "dejours",
    def: "Méthode de la clinique de l'activité : le professionnel commente l'enregistrement de son activité (simple), puis confronte sa manière de faire à celle d'un pair (croisée), pour rouvrir la controverse.",
    eg: "Deux conducteurs commentent puis croisent leurs façons de gérer un même incident.",
  },
  {
    w: "Médiation sémiotique (Vygotski)",
    a: "precurseurs",
    def: "Idée que les fonctions psychiques supérieures se construisent par l'usage de signes (dont le langage) : l'outil psychologique transforme la pensée.",
    eg: "L'enfant qui s'adresse la parole à voix haute pour guider son action, avant de l'intérioriser.",
  },
  {
    w: "Langage intérieur",
    a: "precurseurs",
    def: "Forme intériorisée et condensée du langage social qui structure la pensée (Vygotski). La pensée est un dialogue intériorisé (Fernyhough).",
    eg: "Le professionnel qui « se parle » mentalement pour arbitrer un choix difficile face au sur-destinataire.",
  },
  {
    w: "Actes de langage (Austin / Searle)",
    a: "molinier",
    def: "Théorie selon laquelle « quand dire, c'est faire » : promettre, prescrire, ordonner sont des actes qui modifient les rapports sociaux.",
    eg: "Une prescription paradoxale en centre d'appels qui enferme le téléconseiller dans une contradiction.",
  },
  {
    w: "Fonctions du langage (Bühler)",
    a: "molinier",
    def: "Sprachtheorie : tout énoncé remplit simultanément une fonction de représentation, d'expression et d'appel.",
    eg: "« Le dossier est urgent » décrit (représentation), trahit l'angoisse (expression) et somme d'agir (appel).",
  },
  {
    w: "Controverse professionnelle",
    a: "dejours",
    def: "Désaccord réglé entre pairs sur les critères du travail bien fait. Loin du consensus mou, elle relance le genre et le pouvoir d'agir (Clot).",
    eg: "Deux soignantes débattant, en autoconfrontation croisée, de la « bonne » façon d'annoncer une mauvaise nouvelle.",
  },
];

// Fiche de synthèse d'examen (onglet Antisèche)
export const ANTISECHE_GROUPS = [
  {
    sectionTitle: "① La double trajectoire du dialogue (boussole de l'examen)",
    headers: [
      "Étape / Direction",
      "Le dialogue qui développe",
      "Le silence qui empêche",
    ],
    rows: [
      [
        "Statut du langage",
        "Instrument psychologique, médiateur de l'activité (Vygotski, Clot)",
        "Langage-code / prescription paradoxale (transfert)",
      ],
      [
        "Dynamique",
        "Verbalisation de l'activité ➔ controverse sur le métier",
        "Impossibilité de dire ➔ silence défensif",
      ],
      [
        "Effet sur le collectif",
        "Dispute professionnelle, régénération du genre",
        "Activité empêchée, atrophie des espaces de controverse",
      ],
      [
        "Résultat final",
        "Développement du pouvoir d'agir & santé",
        "Silence organisationnel pathogène",
      ],
    ],
  },
  {
    sectionTitle: "② Les concepts clés du syllabus",
    headers: ["Concept", "Définition d'examen / Auteur principal"],
    rows: [
      [
        "Matière première",
        "Le langage comme instrument d'action sur le réel ; agir par et sur le mot (clinique du dialogue).",
      ],
      [
        "Instrument psychologique",
        "Le langage social s'intériorise et réalise la pensée : « la pensée se réalise dans le mot » (Vygotski).",
      ],
      [
        "Sprachtheorie",
        "Trois fonctions simultanées du signe : représentation, expression, appel (Bühler).",
      ],
      [
        "Actes de langage",
        "« Quand dire, c'est faire » : performatif et force illocutoire (Austin / Searle).",
      ],
      [
        "Pensée dialogique",
        "Penser, c'est faire dialoguer des voix ; le mot, carrefour social/intime (Vygotski, Fernyhough).",
      ],
      [
        "Drame du travail",
        "Le travail traversé de conflits de critères ; rendre le réel « dicible et discutable » (Clot).",
      ],
      [
        "Genre & style",
        "Règles de métier partagées (genre) vs appropriation singulière (style) ; le genre nourrit le style (Clot).",
      ],
      [
        "Dispute professionnelle",
        "Controverse saine sur le travail bien fait (ni consensus mou) ; le collectif comme instrument de santé.",
      ],
      [
        "Activité empêchée",
        "Ce qui aurait pu être fait/dit et ne l'a pas été ; le réel indicible qui pèse sur la santé (Clot).",
      ],
      [
        "Posture clinique",
        "Ni expert, ni facilitateur neutre : prendre parti pour l'activité et organiser la controverse (cadre déontologique, PST123).",
      ],
    ],
  },
];

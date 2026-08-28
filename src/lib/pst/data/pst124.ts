/**
 * Bases de données pour le module PST124.
 * Extrait automatiquement de src/pages/pst124.astro.
 */

export const A = {
  precurseurs: "Rabardel (Instrument)",
  dejours: "Bobillier Chaumon (Usage)",
  molinier: "Engeström (Activité)",
  management: "Acceptabilité & Algorithme",
  sante: "Technologie Capacitante",
  pathologie: "Technologie Incapacitante",
};

export const FICHES = [
  {
    a: "management",
    t: "Séance 1 : Panorama des transformations digitales",
    ess: "<h5>Du taylorisme assisté à l'IA</h5><p>De l'informatique de gestion (taylorisme assisté par ordinateur) aux technologies émergentes : <b>IA</b>, <b>cobots</b> (robotique collaborative), environnements immersifs (RV/RA) et NBIC.</p><h5>Critique du déterminisme technologique</h5><p>L'outil ne dicte pas mécaniquement l'usage social : une même technologie produit des effets opposés selon l'organisation qui l'accueille et l'activité qu'elle vient médiatiser.</p>",
    ph: "Une technologie ne s'évalue jamais en elle-même, mais par ses effets sur l'activité.",
    ex: "Le même logiciel de planification peut soutenir l'autonomie d'une équipe ou, ailleurs, servir d'outil de flicage des temps.",
    trap: "Adopter une posture technocentrée (la technologie est magique et va tout régler) : c'est le piège n°1 de la copie.",
  },
  {
    a: "management",
    t: "Séance 2 : IA et management algorithmique",
    ess: "<h5>Nouvelles formes de contrôle</h5><p>Émergence d'algorithmes d'aide à la décision, de <b>scoring automatisé</b> et de surveillance continue. Le contrôle devient permanent, invisible et impersonnel.</p><h5>Le déplacement de la prescription</h5><p>L'organisation du travail et le rythme ne sont plus dictés par un manager (négociable) mais <b>codés dans le logiciel</b> ou pilotés par un algorithme.</p>",
    ph: "La prescription se déplace du chef d'atelier vers le code informatique.",
    ex: "Le dispatching automatique et la notation des livreurs de plateforme par l'application, sans interlocuteur humain.",
    trap: "Croire que l'algorithme est « neutre » ou « objectif » : il encode des choix organisationnels et de pouvoir.",
  },
  {
    a: "dejours",
    t: "Séance 3 : L'invisibilisation numérique du travail",
    ess: "<h5>Distance à la matière</h5><p>La dématérialisation éloigne l'opérateur de la matière et du résultat de son geste, derrière l'illusion du « clic magique ».</p><h5>Le travail d'articulation</h5><p>Le numérique masque les efforts invisibles de régulation, le « sale boulot » et le <b>travail d'articulation</b> déployés par les salariés pour faire fonctionner des systèmes imparfaits.</p>",
    ph: "Le clic magique invisibilise tout le travail réel de régulation qui le rend possible.",
    ex: "Le secrétariat qui ressaisit, corrige et relance en coulisses pour qu'un parcours « 100 % dématérialisé » aboutisse réellement.",
    trap: "Confondre l'automatisation affichée avec une disparition réelle du travail humain.",
  },
  {
    a: "management",
    t: "Séance 4 : La critique des modèles d'acceptabilité (TAM / UTAUT)",
    ess: "<h5>Les modèles nord-américains</h5><p>Le <b>TAM</b> (Davis) et l'<b>UTAUT</b> prédisent l'adoption à partir de « l'utilité perçue » et de la « facilité d'utilisation » d'un utilisateur rationnel isolé, évalué <i>a priori</i>.</p><h5>Leurs limites</h5><p>Ils ignorent le travail réel, le collectif et les contraintes situées. La « résistance au changement » y devient un faux diagnostic qui masque une technologie inadaptée.</p>",
    ph: "La « résistance au changement » est souvent le symptôme d'une conception défaillante, pas d'un défaut de l'usager.",
    ex: "Un ERP jugé « accepté » sur questionnaire d'intention, mais massivement contourné dès qu'il rencontre l'activité réelle.",
    trap: "Réduire l'acceptation à l'intention d'usage déclarée : c'est rester au niveau de l'acceptabilité a priori.",
  },
  {
    a: "dejours",
    t: "Séance 5 : L'acceptation située (Bobillier Chaumon & Dubois)",
    ess: "<h5>Acceptabilité ↔ Acceptation</h5><p>Passage d'une évaluation <i>a priori</i> (le prescrit technologique) à une évaluation <i>a posteriori</i> (le réel de l'usage). L'appropriation ne se décrète pas sur plan, elle se construit dans et par l'activité.</p><h5>La grille des 4 dimensions</h5><p>Évaluer un outil selon : <b>utilité</b> pour l'activité, <b>utilisabilité</b>, <b>intégration socio-organisationnelle</b> (soutien du collectif) et <b>signification identitaire</b> (faire un beau travail).</p>",
    ph: "L'acceptation se construit dans et par l'activité, face aux contradictions du réel.",
    ex: "Une infirmière adopte vraiment un dossier patient informatisé seulement quand il l'aide à faire face aux aléas du soin, pas quand il les ignore.",
    trap: "Oublier l'une des 4 dimensions : un outil utilisable mais qui détruit le collectif reste incapacitant.",
  },
  {
    a: "molinier",
    t: "Séance 6 : Théorie de l'activité et système d'activité (Engeström)",
    ess: "<h5>Le travail comme système</h5><p>Le travail est un <b>système d'activité</b> : Sujet ↔ Objet ↔ Outil, régulé par des <b>Règles</b>, une <b>Communauté</b> et une <b>Division du travail</b>.</p><h5>Contradictions systémiques</h5><p>Introduire une technologie crée des <b>contradictions</b> à analyser : entre le nouvel outil et les anciennes règles, ou entre l'outil et la division du travail établie.</p>",
    ph: "Une technologie ne change pas un poste, elle perturbe tout un système d'activité.",
    ex: "Un nouveau logiciel de partage impose une transparence qui entre en contradiction avec les règles informelles d'entraide d'un service.",
    trap: "Analyser l'outil isolément, sans le replacer dans les règles, la communauté et la division du travail.",
  },
  {
    a: "dejours",
    t: "Séance 7 : Nomadisme, télétravail et porosité",
    ess: "<h5>Virtualisation des espaces</h5><p>Travailleurs du savoir, travail hybride, flex-office : les repères spatiaux se brouillent. Les rituels de transition (trajet, bureau attitré) s'effacent.</p><h5>La laisse électronique</h5><p><b>Porosité spatio-temporelle</b> : la frontière vie pro / vie perso devient poreuse, sous la pression d'une joignabilité permanente.</p>",
    ph: "La porosité vie pro / vie perso transforme la connexion en « laisse électronique ».",
    ex: "Le cadre en télétravail qui répond aux messages à 22h, faute de rituel de clôture de la journée.",
    trap: "Présenter le télétravail comme un pur progrès d'autonomie en occultant la porosité et l'intensification.",
  },
  {
    a: "molinier",
    t: "Séance 8 : La reconfiguration des collectifs",
    ess: "<h5>Coordonner sans coopérer</h5><p>Les technologies facilitent la <b>coordination</b> à distance mais fragilisent la <b>coopération</b> de proximité et les ajustements informels.</p><h5>Perte des espaces informels</h5><p>L'isolement cognitif progresse avec la disparition de la « machine à café » comme espace de délibération sur le travail.</p>",
    ph: "Faciliter la coordination à distance ne reconstruit pas la coopération de proximité.",
    ex: "Une équipe ultra-outillée (visio, messagerie) qui ne partage plus aucun moment informel pour réguler les désaccords de métier.",
    trap: "Confondre la fluidité des échanges numériques avec la qualité réelle de la coopération.",
  },
  {
    a: "management",
    t: "Séance 9 : Pathologies du digital et RPS",
    ess: "<h5>Le technostress</h5><p>Surcharge informationnelle (<b>infobésité</b>), interruptions permanentes, hyper-connexion : autant de RPS spécifiques au numérique.</p><h5>Surveillance et injonctions paradoxales</h5><p>Pression de la surveillance algorithmique et injonctions médiatisées contradictoires (réactivité immédiate exigée vs nécessité de traitement en profondeur).</p>",
    ph: "Le technostress naît de l'infobésité, de l'hyper-connexion et de la surveillance permanente.",
    ex: "Le salarié sommé de répondre instantanément aux notifications tout en produisant un travail de fond exigeant : injonction paradoxale.",
    trap: "Réduire les RPS numériques à une question de « bonne hygiène » individuelle de l'écran.",
  },
  {
    a: "precurseurs",
    t: "Séance 10 : De l'artefact à l'instrument dans l'intervention",
    ess: "<h5>La genèse instrumentale (Rabardel)</h5><p>Un <b>artefact</b> neutre devient un <b>instrument</b> signifiant par l'<b>instrumentation</b> (l'outil transforme le sujet) et l'<b>instrumentalisation</b> (le sujet adapte l'outil).</p><h5>Contournements précieux</h5><p>Analyser les contournements et le <b>braconnage</b> non comme des fautes, mais comme des indicateurs de l'activité réelle et parfois de l'activité empêchée.</p>",
    ph: "Le braconnage et le détournement révèlent l'activité réelle : ce sont des données, pas des fautes.",
    ex: "Les opérateurs qui tiennent un fichier Excel « parallèle » pour pallier les manques de l'outil officiel : un instrument né de l'usage.",
    trap: "Disqualifier les détournements comme de la « mauvaise utilisation » au lieu de les lire comme des analyseurs.",
  },
  {
    a: "precurseurs",
    t: "Séance 11 : Concevoir des technologies habilitantes",
    ess: "<h5>Conception participative</h5><p>Les utilisateurs ne sont pas seulement destinataires du changement : ce sont des <b>co-concepteurs</b> potentiels des usages futurs.</p><h5>La boussole capacitant / incapacitant</h5><p><b>Capacitante</b> : développe les compétences, augmente l'autonomie et le pouvoir d'agir, soutient l'apprentissage et le collectif. <b>Incapacitante</b> : déqualifie, renforce le contrôle, isole et fige les pratiques.</p>",
    ph: "Une technologie est capacitante si elle développe le pouvoir d'agir, incapacitante si elle le réduit.",
    ex: "Associer les aides-soignantes à la conception de leur outil de transmission, plutôt que de leur livrer un logiciel « clé en main ».",
    trap: "Croire qu'il suffit de « former les utilisateurs » : c'est la posture anthropocentrée classique, encore technocentrée au fond.",
  },
  {
    a: "dejours",
    t: "Séance 12 : La conception continuée dans l'usage",
    ess: "<h5>Le projet commence au déploiement</h5><p>Un projet IT n'est pas terminé le jour de sa mise en service : c'est au contact du réel que le véritable projet commence (<b>conception continuée dans l'usage</b>).</p><h5>Rouvrir la délibération</h5><p>Recréer des espaces de <b>disputes professionnelles</b> pour que les travailleurs reprennent la main sur la définition de leurs outils et restaurent leur pouvoir d'agir numérique.</p>",
    ph: "Le déploiement n'est pas la fin du projet : c'est le début de la conception dans l'usage.",
    ex: "Des « comités d'usage » trimestriels où les agents font remonter, discutent et font évoluer les paramétrages du logiciel.",
    trap: "Considérer le « go-live » comme la fin de l'intervention du psychologue : l'essentiel se joue ensuite.",
  },
];

export const KW_DEFS = {
  artefact:
    "Objet technique ou logiciel tel qu'il sort de conception, neutre et désincarné.",
  instrument:
    "Entité mixte associant un artefact et des schèmes d'utilisation développés par l'usager.",
  "schèmes d'utilisation":
    "Structures cognitives guidant l'action du sujet dans l'utilisation de l'outil.",
  "re-conception":
    "Processus d'adaptation créative de l'outil par l'usage en situation réelle.",
  "genese instrumentale":
    "Double processus par lequel un artefact devient un instrument d'activité.",
  instrumentalisation:
    "Processus d'attribution de fonctions et de personnalisation de l'outil par l'usager.",
  instrumentation:
    "Effets en retour de l'outil sur les structures de pensée et l'activité de l'usager.",
  "acceptabilité a priori":
    "Évaluation théorique de la propension à utiliser un système avant son déploiement.",
  "acceptation située":
    "Processus continu d'intégration de l'outil par son usage effectif en situation réelle.",
  collectif:
    "Groupe de travail et solidarités professionnelles pouvant être renforcés ou fragilisés par l'outil.",
  "identite professionnelle":
    "Sentiment de compétence et de valeur de soi associé aux règles de l'art du métier.",
  "pouvoir d'agir":
    "Capacité à influer sur les conditions et le sens de sa propre activité.",
  "qualite empêchée":
    "Entrave à l'accomplissement d'un travail bien fait selon les critères du métier.",
  développement:
    "Déploiement des possibilités d'action du sujet à travers l'appropriation technologique.",
};

export const PARCOURS = [
  {
    id: "comprendre",
    title: "1. De l'Artefact à l'Instrument",
    fenetre: "J-30 → J-21",
    desc: "Comprendre comment la technologie (l'artefact) s'intègre à l'activité réelle.",
    onglets: [
      ["fiches", "Fiches"],
      ["recits", "Récits"],
      ["lexique", "Lexique"],
    ],
    items: [
      "Lire les fiches Artefact",
      "QCM Genèse",
      "Lexique: Artefact vs Instrument",
    ],
  },
  {
    id: "memoriser",
    title: "2. Genèse Instrumentale",
    fenetre: "J-20 → J-11",
    desc: "Les processus d'instrumentalisation et d'instrumentation de Pierre Rabardel.",
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
    title: "3. Acceptation Située",
    fenetre: "J-10 → J-4",
    desc: "Le renversement de l'acceptabilité vers l'acceptation située selon Bobillier Chaumon.",
    onglets: [
      ["qcm", "QCM"],
      ["distinguer", "Distinguer"],
      ["simulateur", "Simulateur"],
    ],
    items: [
      "Valider le QCM complet > 85%",
      "Distinguer les concepts",
      "Terminer le simulateur d'intervention",
    ],
  },
  {
    id: "produire",
    title: "4. Pouvoir d'Agir Numérique",
    fenetre: "J-3 → J-1",
    desc: "Impact des transformations digitales sur le collectif et l'identité professionnelle.",
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
    ic: "💻",
    t: "L'Artefact et l'Instrument",
    sub: "La distinction fondamentale de Pierre Rabardel",
    parts: [
      {
        beat: "Le point de départ :",
        html: "La psychologie ergonomique montre qu'une technologie, lorsqu'elle est conçue, n'est d'abord qu'un objet technique : un <span class='kw'>artefact</span>.",
      },
      {
        beat: "La transformation :",
        html: "L'artefact ne devient un <span class='kw'>instrument</span> que lorsqu'il est approprié par le sujet à travers son activité, en y associant des <span class='kw'>schèmes d'utilisation</span>.",
      },
      {
        beat: "L'erreur de conception :",
        html: "L'illusion technocentrée consiste à croire que l'artefact porte en lui son propre usage. Or, l'usage réel nécessite toujours une <span class='kw'>re-conception</span> dans l'action.",
      },
    ],
  },
  {
    a: "dejours",
    ic: "🔄",
    t: "La Genèse Instrumentale",
    sub: "Le double processus d'appropriation",
    parts: [
      {
        beat: "Le concept :",
        html: "La transformation de l'artefact en instrument s'appelle la <span class='kw'>genèse instrumentale</span>. Elle comporte deux dimensions indissociables.",
      },
      {
        beat: "Sens Sujet vers Outil :",
        html: "L'<span class='kw'>instrumentalisation</span> désigne le processus par lequel le sujet adapte, détourne ou personnalise l'artefact pour l'ajuster à son activité. C'est ici que se déploie la <b>Métis</b> (intelligence de la ruse et du corps) pour contourner la prescription technique rigide.",
      },
      {
        beat: "Sens Outil vers Sujet :",
        html: "L'<span class='kw'>instrumentation</span> désigne l'impact de l'outil sur le sujet : comment l'artefact modifie et structure les processus cognitifs et l'activité du travailleur.",
      },
    ],
  },
  {
    a: "molinier",
    ic: "🤝",
    t: "L'Acceptation Située",
    sub: "Le renversement proposé par Marc-Éric Bobillier Chaumon",
    parts: [
      {
        beat: "La critique :",
        html: "Les modèles classiques d'<span class='kw'>acceptabilité a priori</span> (comme le TAM) évaluent la technologie avant son usage, en se basant sur l'utilité perçue et la facilité d'utilisation.",
      },
      {
        beat: "Le renversement :",
        html: "La clinique des usages propose de passer à l'<span class='kw'>acceptation située</span> : la technologie est évaluée en situation réelle, à travers ses effets sur l'activité vécue.",
      },
      {
        beat: "Les 4 dimensions :",
        html: "Cette acceptation dépend de l'impact de l'outil sur 4 niveaux : l'activité, le <span class='kw'>collectif</span>, l'<span class='kw'>identité professionnelle</span> et les relations interpersonnelles.",
      },
    ],
  },
  {
    a: "management",
    ic: "⚡",
    t: "Pouvoir d'Agir et Numérique",
    sub: "Les risques et ressources de la digitalisation",
    parts: [
      {
        beat: "Le risque :",
        html: "Une technologie prescrite de façon descendante peut entraver l'activité, désynchroniser les collectifs et générer une perte de <span class='kw'>pouvoir d'agir</span>.",
      },
      {
        beat: "L'activité empêchée :",
        html: "Lorsque l'outil impose sa propre logique (ex: reporting excessif), il génère de la <span class='kw'>qualité empêchée</span> et de la souffrance éthique.",
      },
      {
        beat: "La ressource :",
        html: "À l'inverse, si l'outil soutient l'activité, facilite les controverses de métier et préserve la marge de manœuvre, il devient une véritable ressource pour le <span class='kw'>développement</span> professionnel.",
      },
    ],
  },
];

export const QCM_DATA = [
  {
    q: "Quelle est la « règle d'or » de la PST124 ?",
    opts: [
      "Une technologie performante améliore toujours le travail",
      "Une technologie n'est jamais évaluée en elle-même, mais par ses effets sur l'activité, le collectif, l'identité et le pouvoir d'agir",
      "Il suffit de former les utilisateurs pour qu'ils acceptent l'outil",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> C'est la formule à placer en intro/conclusion : on évalue les effets sur l'activité, pas l'outil « en soi ».",
  },
  {
    q: "Le renversement paradigmatique central du cours oppose :",
    opts: [
      "L'acceptabilité a priori à l'acceptation située",
      "Le présentiel au télétravail",
      "Le matériel au logiciel",
    ],
    correct: 0,
    exp: "<b>Bonne réponse.</b> On passe de l'évaluation a priori (acceptabilité) à l'usage réel et situé (acceptation).",
  },
  {
    q: "Que critique principalement le cours dans les modèles TAM / UTAUT ?",
    opts: [
      "Ils sont trop récents pour être fiables",
      "Ils centrent l'évaluation sur l'utilité perçue et la facilité d'utilisation d'un utilisateur rationnel isolé, a priori",
      "Ils ne mesurent que la satisfaction client",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Ces modèles ignorent le travail réel, le collectif et les contraintes situées.",
  },
  {
    q: "Dans la grille de Bobillier Chaumon, combien de dimensions structurent l'acceptation située ?",
    opts: ["Deux", "Quatre", "Sept"],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Utilité pour l'activité, utilisabilité, intégration socio-organisationnelle, signification identitaire.",
  },
  {
    q: "La « résistance au changement » est, selon le cours :",
    opts: [
      "Le principal frein psychologique à dépasser",
      "Souvent un faux diagnostic qui masque une technologie inadaptée à l'activité",
      "Une preuve de l'attachement des salariés au passé",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Le malaise révèle un défaut de conception bien plus qu'un défaut de l'usager.",
  },
  {
    q: "La genèse instrumentale (Rabardel) désigne :",
    opts: [
      "Le processus par lequel un artefact neutre devient un instrument signifiant pour le sujet",
      "La fabrication industrielle des outils numériques",
      "La formation obligatoire des utilisateurs",
    ],
    correct: 0,
    exp: "<b>Bonne réponse.</b> Elle combine instrumentation (l'outil transforme le sujet) et instrumentalisation (le sujet adapte l'outil).",
  },
  {
    q: "Dans la genèse instrumentale, l'instrumentalisation correspond à :",
    opts: [
      "L'outil qui transforme les schèmes du sujet",
      "Le sujet qui adapte et détourne l'outil pour son activité",
      "La maintenance technique de l'artefact",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Instrumentalisation = le sujet agit sur l'outil ; instrumentation = l'outil agit sur le sujet.",
  },
  {
    q: "Le braconnage / détournement d'un outil doit être analysé comme :",
    opts: [
      "Une faute à sanctionner",
      "Un indicateur précieux de l'activité réelle et parfois empêchée",
      "Un signe d'incompétence des opérateurs",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Les contournements sont des analyseurs : ils signalent où l'artefact échoue à devenir un bon instrument.",
  },
  {
    q: "Le système d'activité d'Engeström articule le triangle Sujet-Objet-Outil avec :",
    opts: [
      "Les règles, la communauté et la division du travail",
      "Le matériel, le logiciel et le réseau",
      "L'utilité, l'utilisabilité et l'identité",
    ],
    correct: 0,
    exp: "<b>Bonne réponse.</b> Une technologie introduit des contradictions systémiques dans ce système élargi.",
  },
  {
    q: "Le « management algorithmique » se caractérise par :",
    opts: [
      "Un encadrement humain renforcé",
      "Le déplacement de la prescription du manager vers le code informatique (scoring, dispatching)",
      "La suppression de toute forme de contrôle",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Le rythme et l'organisation sont codés dans le logiciel ou pilotés par un algorithme.",
  },
  {
    q: "L'invisibilisation du travail réel par le numérique désigne :",
    opts: [
      "Le télétravail qui éloigne les salariés du bureau",
      "Le masquage des efforts de régulation et du travail d'articulation derrière l'illusion du « clic magique »",
      "La confidentialité des données personnelles",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Tout le travail de régulation disparaît des indicateurs et de l'affichage automatisé.",
  },
  {
    q: "Une technologie est dite « capacitante » lorsqu'elle :",
    opts: [
      "Développe les compétences, l'autonomie, le pouvoir d'agir et le collectif",
      "Augmente la productivité à court terme",
      "Réduit le nombre de tâches à effectuer",
    ],
    correct: 0,
    exp: "<b>Bonne réponse.</b> À l'inverse, l'incapacitante déqualifie, contrôle, isole et fige les pratiques.",
  },
  {
    q: "Le technostress regroupe notamment :",
    opts: [
      "La peur des nouvelles technologies chez les seniors",
      "L'infobésité, l'hyper-connexion, les interruptions et la pression de la surveillance",
      "Les pannes matérielles répétées",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Ce sont des RPS spécifiques aux situations médiatisées par le numérique.",
  },
  {
    q: "La « laisse électronique » illustre :",
    opts: [
      "La géolocalisation des véhicules de service",
      "La porosité spatio-temporelle entre vie professionnelle et vie personnelle",
      "Le contrôle parental des écrans",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> La joignabilité permanente efface les rituels de transition et brouille les frontières.",
  },
  {
    q: "Selon le cours, les technologies à distance tendent à :",
    opts: [
      "Renforcer mécaniquement la coopération de proximité",
      "Faciliter la coordination mais fragiliser la coopération et les espaces informels de délibération",
      "Supprimer tout besoin de collectif",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Coordonner à distance ne reconstruit pas la « machine à café » comme espace de régulation.",
  },
  {
    q: "La « conception continuée dans l'usage » signifie que :",
    opts: [
      "Le projet IT est terminé au déploiement",
      "Le véritable projet commence au contact du réel, après la mise en service",
      "La conception doit être confiée aux seuls ingénieurs",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> D'où l'importance des espaces de délibération (comités d'usage) après le go-live.",
  },
  {
    q: "La clinique de l'usage (Bobillier Chaumon & Clot) vise avant tout à :",
    opts: [
      "Mesurer le taux d'adoption d'un logiciel",
      "Comprendre les effets de la technologie sur l'activité et restaurer le pouvoir d'agir",
      "Accélérer la transformation digitale de l'entreprise",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Approche compréhensive ET transformatrice, en lien direct avec PST106.",
  },
  {
    q: "La conception participative considère les utilisateurs comme :",
    opts: [
      "De simples destinataires du changement à former",
      "Des co-concepteurs potentiels des usages futurs",
      "Des obstacles à contourner",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> C'est le levier pour faire de l'artefact un instrument capacitant.",
  },
  {
    q: "Les cobots (robotique collaborative) sont :",
    opts: [
      "Des robots remplaçant entièrement l’opérateur",
      "Des robots conçus pour interagir directement avec l’opérateur",
      "Des logiciels de gestion de production",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Selon leur conception, ils outillent le geste (capacitant) ou imposent une cadence (incapacitant).",
  },
  {
    q: "Le travail d’articulation désigne :",
    opts: [
      "Les efforts invisibles de régulation qui font fonctionner des systèmes imparfaits",
      "La maintenance des serveurs informatiques",
      "La rédaction des procédures",
    ],
    correct: 0,
    exp: "<b>Bonne réponse.</b> Le numérique l’invisibilise derrière l’illusion du « clic magique ».",
  },
  {
    q: "Dans la genèse instrumentale, l’instrumentation désigne :",
    opts: [
      "Le sujet qui adapte l’outil",
      "L’outil qui transforme les schèmes du sujet",
      "La fabrication de l’artefact",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Instrumentation = l’outil agit sur le sujet ; instrumentalisation = le sujet agit sur l’outil.",
  },
  {
    q: "Le déterminisme technologique consiste à croire que :",
    opts: [
      "L’usage social dépend de l’organisation",
      "La technologie dicte mécaniquement ses effets sociaux",
      "Les utilisateurs co-conçoivent les usages",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Le cours réfute ce déterminisme : une même technologie produit des effets opposés selon le contexte.",
  },
  {
    q: "Pour Engeström, une technologie introduit dans le système d’activité :",
    opts: [
      "Une simplification automatique",
      "Des contradictions systémiques à analyser",
      "Une suppression des règles",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> Les contradictions touchent règles, communauté et division du travail.",
  },
  {
    q: "La porosité spatio-temporelle (« laisse électronique ») renvoie à :",
    opts: [
      "La lenteur du réseau",
      "L’effacement de la frontière vie pro / vie perso",
      "Le télétravail obligatoire",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> La joignabilité permanente efface les rituels de transition.",
  },
  {
    q: "Le scoring algorithmique des salariés relève de :",
    opts: [
      "La conception participative",
      "La prescription technologique / management algorithmique",
      "L’acceptation située",
    ],
    correct: 1,
    exp: "<b>Bonne réponse.</b> La prescription se déplace vers le code (notation, dispatching, surveillance).",
  },
  {
    q: "Rendre une technologie capacitante suppose surtout de :",
    opts: [
      "Mesurer l’intention d’usage a priori",
      "Former davantage les utilisateurs",
      "Associer les utilisateurs comme co-concepteurs des usages",
    ],
    correct: 2,
    exp: "<b>Bonne réponse.</b> La conception participative et continuée fait de l’artefact un instrument de développement.",
  },
];

export const QUI = [
  [
    "« Une technologie n'est jamais évaluée en elle-même, mais à travers ses effets sur l'activité, le collectif, l'identité et le pouvoir d'agir des utilisateurs. »",
    "dejours",
    "<b>Marc-Éric Bobillier Chaumon.</b> La règle d'or de la clinique de l'usage et de l'acceptation située.",
    "dejours",
  ],
  [
    "« L'artefact ne devient instrument que lorsque le sujet se l'approprie : c'est la genèse instrumentale. »",
    "precurseurs",
    "<b>Pierre Rabardel.</b> Distinction artefact / instrument et processus d'instrumentation-instrumentalisation.",
    "precurseurs",
  ],
  [
    "« Le travail est un système d'activité traversé de contradictions, où l'outil ne se comprend qu'avec les règles, la communauté et la division du travail. »",
    "molinier",
    "<b>Yrjö Engeström.</b> Théorie de l'activité et analyse des contradictions systémiques.",
    "molinier",
  ],
  [
    "« L'utilité perçue et la facilité d'utilisation déterminent l'intention d'usage d'une technologie. »",
    "management",
    "<b>Modèle TAM (Davis) / UTAUT.</b> Acceptabilité a priori, que le cours critique au profit de l'acceptation située.",
    "management",
  ],
  [
    "« Quand l'activité est empêchée par l'outil, c'est le pouvoir d'agir du professionnel qu'il faut restaurer. »",
    "dejours",
    "<b>Bobillier Chaumon & Clot.</b> Clinique de l'usage et restauration du pouvoir d'agir (pont avec PST106).",
    "dejours",
  ],
  [
    "« Le braconnage et le détournement des outils sont des analyseurs de l'activité, non de simples erreurs. »",
    "precurseurs",
    "<b>Perspective instrumentale (Rabardel).</b> Le détournement comme indicateur de l'activité réelle.",
    "precurseurs",
  ],
  [
    "« L'utilité, l'utilisabilité, l'intégration socio-organisationnelle et la signification identitaire fondent l'évaluation d'un outil. »",
    "dejours",
    "<b>Marc-Éric Bobillier Chaumon.</b> Les 4 dimensions de l'acceptation située.",
    "dejours",
  ],
  [
    "« Le rythme et l'organisation du travail ne sont plus dictés par un chef, mais codés dans le logiciel. »",
    "management",
    "<b>Management algorithmique.</b> Déplacement de la prescription vers le code (scoring, dispatching).",
    "management",
  ],
  [
    "« Un artefact ne devient instrument que par l'appropriation : instrumentation et instrumentalisation. »",
    "precurseurs",
    "<b>Pierre Rabardel.</b> La genèse instrumentale.",
    "precurseurs",
  ],
  [
    "« Une technologie introduit des contradictions dans le système d'activité : règles, communauté, division du travail. »",
    "molinier",
    "<b>Yrjö Engeström.</b> Théorie de l'activité et contradictions systémiques.",
    "molinier",
  ],
  [
    "« Le projet informatique ne s'achève pas au déploiement : c'est dans l'usage que le vrai projet commence. »",
    "dejours",
    "<b>Bobillier Chaumon.</b> La conception continuée dans l'usage.",
    "dejours",
  ],
  [
    "« La résistance au changement est souvent un faux diagnostic qui masque une technologie inadaptée. »",
    "management",
    "<b>Critique des modèles d'acceptabilité.</b> Le malaise révèle un défaut de conception, pas un défaut de l'usager.",
    "management",
  ],
];

export const PIEGES = [
  [
    "Une technologie peut être évaluée en elle-même, indépendamment de ses effets sur l'activité.",
    false,
    "<b>Faux !</b> C'est la règle d'or du cours : une technologie n'est jamais évaluée en elle-même, mais à travers ses effets sur l'activité, le collectif, l'identité et le pouvoir d'agir.",
    "dejours",
  ],
  [
    "Les modèles TAM et UTAUT suffisent à prédire l'usage réel d'un outil en situation de travail.",
    false,
    "<b>Faux !</b> Ces modèles mesurent une intention d'usage a priori d'un utilisateur isolé. Ils ignorent le travail réel, le collectif et les contraintes situées : c'est tout l'apport de l'acceptation située.",
    "management",
  ],
  [
    "Le braconnage et le détournement d'un outil sont des indicateurs précieux de l'activité réelle.",
    true,
    "<b>Vrai !</b> Loin d'être de simples fautes, les contournements révèlent l'écart entre le prescrit technologique et le réel de l'activité, et parfois l'activité empêchée.",
    "precurseurs",
  ],
  [
    "La « résistance au changement » est en général un bon diagnostic de l'échec d'un projet technologique.",
    false,
    "<b>Faux !</b> C'est souvent un faux diagnostic qui culpabilise l'usager et masque une technologie inadaptée à l'activité.",
    "management",
  ],
  [
    "Dans la genèse instrumentale, l'instrumentalisation désigne l'adaptation de l'outil par le sujet.",
    true,
    "<b>Vrai !</b> Rabardel distingue l'instrumentation (l'outil transforme le sujet) et l'instrumentalisation (le sujet adapte et détourne l'outil).",
    "precurseurs",
  ],
  [
    "Avec le management algorithmique, la prescription du travail se déplace du manager vers le code informatique.",
    true,
    "<b>Vrai !</b> Le rythme et l'organisation ne sont plus dictés par un chef négociable, mais codés dans le logiciel ou pilotés par un algorithme opaque.",
    "management",
  ],
  [
    "La conception d'un projet IT est terminée le jour de son déploiement.",
    false,
    "<b>Faux !</b> C'est au contact du réel que le véritable projet commence : c'est la conception continuée dans l'usage. L'essentiel se joue après le go-live.",
    "dejours",
  ],
  [
    "Faciliter la coordination à distance reconstruit automatiquement la coopération de proximité.",
    false,
    "<b>Faux !</b> Les technologies facilitent la coordination mais fragilisent souvent la coopération informelle et les espaces de délibération (la « machine à café »).",
    "molinier",
  ],
  [
    "L'utilisabilité (ergonomie de l'interface) suffit à garantir l'acceptation d'un outil.",
    false,
    "<b>Faux !</b> L'utilisabilité n'est qu'une des 4 dimensions : il faut aussi l'utilité pour l'activité, l'intégration socio-organisationnelle et la signification identitaire.",
    "dejours",
  ],
  [
    "Pour Rabardel, un logiciel est déjà un instrument dès sa livraison.",
    false,
    "<b>Faux !</b> Livré, c'est un artefact ; il ne devient instrument que par la genèse instrumentale (appropriation par le sujet).",
    "precurseurs",
  ],
  [
    "Le management algorithmique rend la prescription plus visible et négociable.",
    false,
    "<b>Faux !</b> Au contraire, il l'invisibilise et la rend opaque : le rythme est calculé par le code, sans interlocuteur.",
    "management",
  ],
  [
    "Une technologie capacitante développe les compétences, l'autonomie et le pouvoir d'agir.",
    true,
    "<b>Vrai !</b> À l'inverse, l'incapacitante déqualifie (taylorisme numérique), contrôle et isole.",
    "management",
  ],
  [
    "Le braconnage et le détournement d'un outil sont des analyseurs de l'activité réelle, pas de simples fautes.",
    true,
    "<b>Vrai !</b> Ils révèlent l'écart entre le prescrit technologique et le réel, et parfois l'activité empêchée.",
    "precurseurs",
  ],
];

export const DISTINGUER = [
  {
    pair: ["Acceptabilité", "Acceptation située"],
    a: "dejours",
    crit: "L'acceptabilité est une évaluation a priori de l'intention d'usage (utilisateur isolé, sur plan) ; l'acceptation située est une évaluation a posteriori construite dans et par l'activité réelle.",
    items: [
      [
        "Un questionnaire mesurant l'utilité perçue d'un outil avant son déploiement.",
        0,
      ],
      [
        "Le constat, six mois après, que l'outil est contourné dès qu'il rencontre les aléas du soin.",
        1,
      ],
      [
        "Un test utilisateur en laboratoire prédisant la « facilité d'utilisation ».",
        0,
      ],
    ],
  },
  {
    pair: ["Artefact", "Instrument"],
    a: "precurseurs",
    crit: "L'artefact est l'objet technique neutre, tel qu'il est livré ; l'instrument est le résultat de l'appropriation par le sujet (genèse instrumentale), chargé de schèmes d'usage.",
    items: [
      [
        "Le logiciel CRM tel qu'il sort du paramétrage standard, sans usage encore stabilisé.",
        0,
      ],
      [
        "Le champ « commentaire » détourné par le commercial en agenda de relances personnel.",
        1,
      ],
      [
        "La tablette livrée aux soignants, encore dans son carton, avec sa notice constructeur.",
        0,
      ],
    ],
  },
  {
    pair: ["Technologie capacitante", "Technologie incapacitante"],
    a: "management",
    crit: "La technologie capacitante développe les compétences, l'autonomie et le collectif ; l'incapacitante déqualifie (taylorisme numérique), renforce le contrôle et isole l'opérateur.",
    items: [
      [
        "Une IA qui outille et enrichit le jugement du professionnel, qu'il peut discuter.",
        0,
      ],
      [
        "Un terminal vocal qui dicte chaque geste de l'opérateur et chronomètre ses pauses.",
        1,
      ],
      [
        "Un outil co-conçu avec les agents et qu'ils peuvent faire évoluer dans l'usage.",
        0,
      ],
    ],
  },
];

export const CLOZE = [
  [
    "dejours",
    [
      "Une technologie n'est jamais évaluée en elle-même, mais à travers ses effets sur l'",
      { h: "activité" },
      ", le collectif, l'identité et le ",
      { h: "pouvoir d'agir" },
      ".",
    ],
  ],
  [
    "dejours",
    [
      "On passe de l'acceptabilité (évaluation ",
      { h: "a priori" },
      ") à l'acceptation située (évaluation ",
      { h: "a posteriori" },
      " dans et par l'activité).",
    ],
  ],
  [
    "precurseurs",
    [
      "La genèse instrumentale transforme un ",
      { h: "artefact" },
      " neutre en ",
      { h: "instrument" },
      " signifiant.",
    ],
  ],
  [
    "management",
    [
      "Avec le management algorithmique, la prescription se déplace du manager vers le ",
      { h: "code" },
      ", et le travail réel est ",
      { h: "invisibilisé" },
      ".",
    ],
  ],
  [
    "management",
    [
      "Le management ",
      { h: "algorithmique" },
      " déplace la prescription du manager vers le ",
      { h: "code" },
      ".",
    ],
  ],
  [
    "precurseurs",
    [
      "La genèse instrumentale combine l'",
      { h: "instrumentation" },
      " (l'outil agit sur le sujet) et l'",
      { h: "instrumentalisation" },
      " (le sujet adapte l'outil).",
    ],
  ],
  [
    "molinier",
    [
      "Le système d'activité (Engeström) articule sujet, objet, outil, ",
      { h: "règles" },
      ", communauté et ",
      { h: "division du travail" },
      ".",
    ],
  ],
  [
    "dejours",
    [
      "L'acceptation se construit dans et par l'",
      { h: "activité" },
      ", face aux ",
      { h: "contradictions" },
      " du réel.",
    ],
  ],
  [
    "dejours",
    [
      "Le numérique masque le travail d'",
      { h: "articulation" },
      " derrière l'illusion du clic ",
      { h: "magique" },
      ".",
    ],
  ],
];

export const REDAC = [
  [
    "En quoi le passage de l'acceptabilité à l'acceptation située renouvelle-t-il l'évaluation des technologies au travail ?",
    [
      "Poser le renversement paradigmatique en introduction (technocentré → clinique de l'usage).",
      "Définir l'acceptabilité a priori et critiquer les modèles TAM/UTAUT (utilisateur rationnel isolé).",
      "Définir l'acceptation située : appropriation construite dans et par l'activité (Bobillier Chaumon & Dubois).",
      "Déployer la grille des 4 dimensions (utilité, utilisabilité, intégration socio-organisationnelle, signification identitaire).",
      "Montrer que la « résistance au changement » est souvent un faux diagnostic.",
      "Conclure sur la conception continuée dans l'usage et la restauration du pouvoir d'agir.",
    ],
    "<p>L'évaluation des technologies au travail a longtemps été dominée par une approche d'acceptabilité a priori, illustrée par les modèles nord-américains (TAM de Davis, UTAUT). Ces modèles prédisent l'intention d'usage d'un utilisateur rationnel et isolé à partir de « l'utilité perçue » et de la « facilité d'utilisation ». Marc-Éric Bobillier Chaumon opère un renversement : ce n'est pas au travailleur de s'adapter à l'outil, c'est l'usage réel qui révèle les limites de la conception.</p><p>L'acceptation, contrairement à l'acceptabilité, ne se décrète pas sur plan : elle se construit <b>dans et par l'activité</b>, a posteriori, face aux contradictions du réel. Pour la diagnostiquer, on mobilise la grille des quatre dimensions : l'<b>utilité</b> pour l'activité (l'outil permet-il de faire face aux aléas ?), l'<b>utilisabilité</b> (génère-t-il une surcharge cognitive ?), l'<b>intégration socio-organisationnelle</b> (soutient-il le collectif ou isole-t-il ?) et la <b>signification identitaire</b> (permet-il un beau travail ou réduit-il à l'exécution ?).</p><p>Cette grille permet de requalifier la fameuse « résistance au changement ». Loin d'être un défaut de l'usager, elle est le plus souvent le symptôme d'une technologie inadaptée à l'activité réelle. Les contournements et le braconnage (Rabardel) deviennent alors des analyseurs précieux : ils signalent là où l'artefact échoue à devenir un instrument capacitant.</p><p>En conclusion, évaluer une technologie, ce n'est pas mesurer une intention avant le déploiement, mais accompagner la <b>conception continuée dans l'usage</b>. Le rôle du psychologue est de rouvrir des espaces de délibération pour que les professionnels reprennent la main sur leurs outils et développent leur pouvoir d'agir numérique.</p>",
  ],
  [
    "Distinguez une technologie capacitante d'une technologie incapacitante et montrez en quoi le management algorithmique relève souvent de la seconde.",
    [
      "Définir la boussole capacitant / incapacitant (pouvoir de développement de l'outil).",
      "Caractériser la technologie capacitante (compétences, autonomie, pouvoir d'agir, collectif).",
      "Caractériser la technologie incapacitante (taylorisme numérique, contrôle, isolement, figement).",
      "Analyser le management algorithmique : déplacement de la prescription vers le code.",
      "Mobiliser l'invisibilisation du travail réel et le technostress (surveillance, infobésité).",
      "Conclure sur les leviers de conception participative pour rendre l'outil capacitant.",
    ],
    "<p>La distinction entre technologie capacitante et incapacitante porte sur le <b>pouvoir de développement</b> de l'outil. Une technologie <b>capacitante</b> développe les compétences professionnelles, augmente l'autonomie et le pouvoir d'agir, et soutient l'apprentissage et le collectif. Une technologie <b>incapacitante</b> fait l'inverse : elle réduit les compétences (taylorisme numérique), renforce le contrôle et la surveillance, isole l'opérateur et fige les pratiques.</p><p>Le management algorithmique relève fréquemment de la seconde catégorie. La prescription du travail s'y déplace du manager humain — visible et négociable — vers le <b>code informatique</b> : dispatching automatique, scoring, notation continue. Le rythme n'est plus discuté, il est calculé. Cette opacité supprime les marges de manœuvre et la possibilité de délibérer sur le travail.</p><p>Ce mode de pilotage s'accompagne d'une <b>invisibilisation du travail réel</b> : derrière l'illusion du « clic magique », tout le travail d'articulation et de régulation disparaît des indicateurs. Il génère des RPS spécifiques — technostress, infobésité, hyper-connexion, pression de la surveillance — et des injonctions paradoxales (réactivité immédiate vs traitement en profondeur).</p><p>Pour autant, rien n'est mécanique : c'est la place laissée au pouvoir d'agir dans la conception qui décide. Une même IA peut outiller le jugement (capacitante) ou le remplacer (incapacitante). La conclusion pratique est la <b>conception participative</b> : associer les utilisateurs comme co-concepteurs des usages futurs pour faire de l'artefact un instrument au service du développement.</p>",
  ],
  [
    "Distinguez une technologie capacitante d'une technologie incapacitante et illustrez par un cas d'IA au travail.",
    [
      "Poser la boussole : le pouvoir de développement de l'outil.",
      "Caractériser la technologie capacitante (compétences, autonomie, pouvoir d'agir, collectif).",
      "Caractériser l'incapacitante (taylorisme numérique, contrôle, isolement, figement).",
      "Cas d'IA : aide à la décision capacitante (outille le jugement) vs incapacitante (décide à la place).",
      "Mobiliser l'invisibilisation du travail réel et le technostress.",
      "Conclure sur la conception participative et continuée dans l'usage.",
    ],
    "<p>La distinction porte sur le pouvoir de développement de l'outil. Une technologie <b>capacitante</b> développe les compétences, l'autonomie et le pouvoir d'agir, et soutient le collectif ; l'<b>incapacitante</b> déqualifie (taylorisme numérique), contrôle, isole et fige.</p><p>Une même IA d'aide à la décision est capacitante si elle <b>outille</b> le jugement du professionnel (qu'il peut discuter et amender), incapacitante si elle <b>décide à sa place</b> et le déqualifie. La conception — la place laissée au pouvoir d'agir — décide de la trajectoire.</p><p>On conclut sur la <b>conception participative</b> et la <b>conception continuée dans l'usage</b> : associer les utilisateurs comme co-concepteurs pour faire de l'artefact un instrument au service du développement.</p>",
  ],
  [
    "En quoi le management algorithmique transforme-t-il la prescription du travail ?",
    [
      "Définir la prescription technologique (rythme et organisation codés dans le logiciel).",
      "Montrer le déplacement : du manager humain (négociable) vers le code (opaque).",
      "Analyser l'invisibilisation du travail réel et la surveillance continue.",
      "Mobiliser les RPS spécifiques (technostress, scoring, notation).",
      "Conclure sur la réouverture d'espaces de délibération sur l'outil.",
    ],
    "<p>Le management algorithmique <b>déplace la prescription</b> : le rythme et l'organisation ne sont plus dictés par un manager humain — visible et négociable — mais <b>codés dans le logiciel</b> (dispatching, scoring, notation continue). La prescription devient opaque et permanente.</p><p>Ce pilotage s'accompagne d'une <b>invisibilisation du travail réel</b> (le travail d'articulation disparaît des indicateurs) et de RPS spécifiques (technostress, pression de la surveillance). Le pouvoir d'agir des professionnels se réduit.</p><p>L'intervention vise à <b>rouvrir des espaces de délibération</b> sur ces outils pour que les travailleurs reprennent la main sur leur définition (conception continuée).</p>",
  ],
];

export const SIM = [
  {
    key: "clinique_usage",
    title: "Intervenir en clinique de l'usage",
    persona: "Service instruisant un nouvel outil métier (ERP)",
    context:
      "La direction te mandate après l'échec d'un déploiement d'ERP : « les agents résistent au changement ». Ton but : adopter la posture de la clinique de l'usage, analyser l'activité réelle et éviter le piège technocentré comme celui de la simple formation.",
    principes: [
      "Refuser le faux diagnostic de « résistance au changement »",
      "Partir de l'activité réelle et de ses aléas",
      "Lire les contournements comme des analyseurs",
      "Rouvrir des espaces de délibération sur l'outil (conception continuée)",
    ],
    steps: [
      {
        worker:
          "La direction te dit : « Les agents résistent au changement, il faut juste les former davantage à l'outil. »",
        prompt: "Quelle est ta réponse clinique ?",
        options: [
          {
            label:
              "« Avant de conclure à une résistance, analysons en quoi l'outil aide ou empêche leur activité réelle. »",
            score: 2,
            fb: "Idéal : tu refuses le faux diagnostic et tu pars de l'acceptation située plutôt que de l'acceptabilité.",
          },
          {
            label:
              "« D'accord, organisons un plan de formation renforcé à l'outil. »",
            score: 0,
            fb: "À éviter : la posture « former l'utilisateur » reste technocentrée et ignore le travail réel.",
          },
          {
            label:
              "« Effectivement, remplaçons les agents les plus réticents. »",
            score: 0,
            fb: "À proscrire : tu individualises et culpabilises, sans rien analyser de la conception.",
          },
        ],
      },
      {
        worker:
          "Tu découvres que les agents tiennent un fichier Excel parallèle pour faire ce que l'ERP ne permet pas.",
        prompt: "Comment interprètes-tu ce contournement ?",
        options: [
          {
            label:
              "« C'est un analyseur précieux : il montre où l'outil échoue face à l'activité réelle. »",
            score: 2,
            fb: "Idéal : le braconnage est une donnée (Rabardel), pas une faute. Il oriente la re-conception.",
          },
          {
            label:
              "« C'est une mauvaise utilisation : il faut l'interdire immédiatement. »",
            score: 0,
            fb: "À éviter : interdire le détournement, c'est supprimer le seul indice de l'activité empêchée.",
          },
          {
            label:
              "« C'est anecdotique, concentrons-nous sur le taux d'adoption de l'ERP. »",
            score: 1,
            fb: "Insuffisant : rester sur l'indicateur d'adoption manque le réel de l'usage.",
          },
        ],
      },
    ],
  },
];

export const CASES = [
  {
    vignette:
      "Une grande administration déploie un algorithme de scoring qui ordonne automatiquement les dossiers à traiter par les agents et mesure leur cadence en continu. Plusieurs agents décrivent une perte de sens : ils ne choisissent plus l'ordre des priorités et ont le sentiment de « ne plus faire correctement leur métier ».",
    q1: {
      prompt:
        "Quel concept du cours rend le mieux compte de cette perte de sens ?",
      options: [
        {
          label:
            "L'atteinte à la signification identitaire et professionnelle (4e dimension)",
          ok: true,
          fb: "Oui : l'outil empêche de faire un « beau travail » selon les règles du métier et transforme l'agent en exécutant.",
        },
        {
          label: "Un simple défaut d'utilisabilité de l'interface",
          ok: false,
          fb: "Non : le problème n'est pas l'ergonomie de l'écran mais le sens et le pouvoir d'agir retirés à l'agent.",
        },
        {
          label: "Une résistance au changement des agents",
          ok: false,
          fb: "Piège : c'est le faux diagnostic technocentré. Le malaise révèle une conception inadaptée à l'activité.",
        },
      ],
    },
    q2: {
      prompt:
        "Quelle posture d'intervention est cohérente avec la clinique de l'usage ?",
      options: [
        {
          label:
            "Rouvrir des espaces de délibération pour discuter et transformer l'outil avec les agents (conception continuée)",
          ok: true,
          fb: "Exact : restaurer le pouvoir d'agir numérique en faisant des agents des co-concepteurs des usages.",
        },
        {
          label:
            "Renforcer la formation des agents au logiciel pour qu'ils s'y adaptent mieux",
          ok: false,
          fb: "Non : « former pour faire accepter » reste une posture technocentrée qui laisse la conception intacte.",
        },
      ],
    },
  },
  {
    vignette:
      "Un service déploie un ERP imposé. Six mois après, on découvre que les agents tiennent un fichier Excel « parallèle » pour faire ce que l'ERP ne permet pas. La direction veut l'interdire et parle de « contournement des règles ».",
    q1: {
      prompt: "Que révèle ce fichier Excel parallèle ?",
      options: [
        {
          label:
            "Un braconnage : un analyseur précieux de l'activité réelle et des manques de l'outil",
          ok: true,
          fb: "Oui : avec Rabardel, le détournement est une donnée, pas une faute — il signale où l'artefact échoue à devenir instrument.",
        },
        {
          label: "Une fraude à sanctionner immédiatement",
          ok: false,
          fb: "Non : interdire le détournement supprime le seul indice de l'activité empêchée.",
        },
        {
          label: "Un simple manque de formation à l'ERP",
          ok: false,
          fb: "Non : « former davantage » est la posture technocentrée qui laisse la conception intacte.",
        },
      ],
    },
    q2: {
      prompt: "Quelle posture relève de la clinique de l'usage ?",
      options: [
        {
          label:
            "Analyser l'écart et re-concevoir l'outil avec les agents (conception continuée dans l'usage)",
          ok: true,
          fb: "Exact : on transforme l'artefact en instrument capacitant en faisant des agents des co-concepteurs.",
        },
        {
          label: "Bloquer l'accès à Excel pour forcer l'usage de l'ERP",
          ok: false,
          fb: "Non : on détruit la régulation qui faisait tenir l'activité, sans rien corriger.",
        },
      ],
    },
  },
  {
    vignette:
      "Une entreprise passe au flex-office et au télétravail hybride. Des cadres décrivent une perte de repères, une hyper-connexion le soir et la disparition des échanges informels avec l'équipe.",
    q1: {
      prompt: "Quel concept rend le mieux compte de ce malaise ?",
      options: [
        {
          label: "La porosité spatio-temporelle (la « laisse électronique »)",
          ok: true,
          fb: "Oui : l'effacement des rituels de transition brouille la frontière vie pro / vie perso.",
        },
        {
          label: "Une résistance au télétravail des cadres",
          ok: false,
          fb: "Non : faux diagnostic ; le malaise révèle une transformation mal accompagnée de l'activité et du collectif.",
        },
        {
          label: "Un défaut d'utilisabilité des outils de visio",
          ok: false,
          fb: "Non : le problème n'est pas l'ergonomie mais l'intégration socio-organisationnelle et la coopération de proximité.",
        },
      ],
    },
    q2: {
      prompt: "Quel levier rend la transformation capacitante ?",
      options: [
        {
          label:
            "Recréer des rituels et des espaces de délibération sur les usages (droit à la déconnexion négocié)",
          ok: true,
          fb: "Exact : on soutient le collectif et le pouvoir d'agir plutôt que de subir la porosité.",
        },
        {
          label: "Renforcer le contrôle de présence en ligne et le reporting",
          ok: false,
          fb: "Non : c'est de la surveillance qui aggrave le technostress.",
        },
      ],
    },
  },
];

export const FRISE_DATA = [
  {
    annee: "1960-70",
    titre: " Informatique de gestion (taylorisme assisté par ordinateur)",
    desc: "L'ordinateur entre dans l'entreprise pour rationaliser la gestion : la logique tayloriste se prolonge dans les premiers systèmes informatiques.",
  },
  {
    annee: "1989",
    titre: " TAM (Davis) — modèle d'acceptation technologique",
    desc: "Les modèles d'acceptabilité a priori (utilité perçue, facilité d'utilisation) s'imposent, plus tard prolongés par l'UTAUT. Le cours en fera la critique.",
  },
  {
    annee: "1995-2010",
    titre: " Genèse instrumentale & théorie de l'activité",
    desc: "Rabardel (artefact/instrument) et Engeström (système d'activité) fournissent les cadres pour penser l'appropriation et les contradictions générées par les outils.",
  },
  {
    annee: "2016-2023",
    titre: " Clinique de l'usage & management algorithmique",
    desc: "Bobillier Chaumon & Clot fondent la clinique de l'usage, au moment où l'IA et le pilotage algorithmique déplacent la prescription vers le code.",
  },
];

export const NODES = {
  artefact: {
    label: "Artefact imposé",
    s: "Artefact",
    a: "management",
    x: 380,
    y: 50,
    links: [{ to: "acceptation", rel: "est soumis à" }],
  },
  acceptation: {
    label: "Épreuve de l'acceptation située",
    s: "Acceptation",
    a: "dejours",
    x: 380,
    y: 140,
    links: [
      { to: "genese", rel: "Trajectoire 1 : ouvre la" },
      { to: "prescription", rel: "Trajectoire 2 : se fige en" },
    ],
  },
  genese: {
    label: "Genèse instrumentale",
    s: "Genèse",
    a: "precurseurs",
    x: 210,
    y: 230,
    links: [{ to: "appropriation", rel: "enclenche l'" }],
  },
  appropriation: {
    label: "Appropriation & braconnage",
    s: "Appropriation",
    a: "precurseurs",
    x: 210,
    y: 320,
    links: [{ to: "collectif", rel: "nourrit le" }],
  },
  collectif: {
    label: "Soutien du collectif & de l'activité",
    s: "Collectif",
    a: "molinier",
    x: 210,
    y: 410,
    links: [{ to: "pouvoir", rel: "développe le" }],
  },
  pouvoir: {
    label: "Pouvoir d'agir numérique",
    s: "Pouvoir d'agir",
    a: "dejours",
    x: 360,
    y: 480,
    links: [{ to: "capacitant", rel: "aboutit à la" }],
  },
  capacitant: {
    label: "Technologie capacitante",
    s: "Capacitante",
    a: "sante",
    x: 360,
    y: 540,
    links: [],
  },
  prescription: {
    label: "Prescription algorithmique (le code)",
    s: "Prescription",
    a: "management",
    x: 550,
    y: 230,
    links: [{ to: "invisibilisation", rel: "produit l'" }],
  },
  invisibilisation: {
    label: "Invisibilisation & surcharge",
    s: "Invisibilisation",
    a: "management",
    x: 550,
    y: 320,
    links: [{ to: "surveillance", rel: "renforce la" }],
  },
  surveillance: {
    label: "Isolement & surveillance",
    s: "Surveillance",
    a: "pathologie",
    x: 550,
    y: 410,
    links: [{ to: "empechement", rel: "mène à l'" }],
  },
  empechement: {
    label: "Activité empêchée & technostress",
    s: "Empêchement",
    a: "pathologie",
    x: 680,
    y: 470,
    links: [{ to: "incapacitant", rel: "aboutit à la" }],
  },
  incapacitant: {
    label: "Technologie incapacitante",
    s: "Incapacitante",
    a: "pathologie",
    x: 680,
    y: 540,
    links: [],
  },
};

export const PROTO = [
  {
    n: 1,
    t: "La demande et le cadrage",
    role: "Cadrage",
    d: "Reformuler la demande (souvent « les agents résistent ») en question d'analyse de l'activité, et garantir un cadre paritaire.",
  },
  {
    n: 2,
    t: "Analyse de l'activité réelle",
    role: "Diagnostic",
    d: "Observer le travail réel et ses aléas pour comprendre l'écart entre le prescrit technologique et l'usage.",
  },
  {
    n: 3,
    t: "Repérage des contournements",
    role: "Analyseurs",
    d: "Recueillir braconnages et détournements comme indicateurs de l'activité empêchée et des manques de l'outil.",
  },
  {
    n: 4,
    t: "Diagnostic par les 4 dimensions",
    role: "Grille",
    d: "Évaluer l'outil sur l'utilité, l'utilisabilité, l'intégration socio-organisationnelle et la signification identitaire.",
  },
  {
    n: 5,
    t: "Espaces de délibération",
    role: "Co-conception",
    d: "Ouvrir des disputes professionnelles où les utilisateurs deviennent co-concepteurs des usages futurs.",
  },
  {
    n: 6,
    t: "Transformation de l'outil",
    role: "Action",
    d: "Faire évoluer le paramétrage et la conception à partir des analyses partagées avec le collectif.",
  },
  {
    n: 7,
    t: "Conception continuée dans l'usage",
    role: "Suivi",
    d: "Installer un suivi durable (comités d'usage) car le projet ne s'arrête pas au déploiement.",
  },
];

export const ATELIER_SUJETS = [
  {
    t: "Sujet 1 : Diagnostiquer l'acceptation située d'une technologie imposée",
    grid: [
      "Introduction posant le renversement acceptabilité → acceptation située",
      "Critique des modèles TAM/UTAUT (utilisateur rationnel isolé, a priori)",
      "Déploiement des 4 dimensions (utilité, utilisabilité, intégration, identité)",
      "Mobilisation de la genèse instrumentale et du braconnage comme analyseurs",
      "Requalification de la « résistance au changement » comme faux diagnostic",
      "Exemple concret (ERP, IA de scoring, flex-office)",
      "Conclusion sur la conception continuée dans l'usage et le pouvoir d'agir",
    ],
    corrige:
      "<p>Une bonne copie part du renversement paradigmatique : on n'évalue pas l'outil en soi, mais ses effets sur l'activité. Elle déploie les 4 dimensions de Bobillier Chaumon, lit les contournements comme des données (Rabardel), refuse le faux diagnostic de « résistance au changement » et conclut sur la conception participative et continuée dans l'usage, au service du pouvoir d'agir.</p>",
  },
];

export const LEXIQUE = [
  {
    w: "La clinique de l'usage",
    a: "dejours",
    def: "Approche compréhensive et transformatrice (Bobillier Chaumon & Clot) qui analyse les situations médiatisées par la technologie pour comprendre comment elle affecte l'activité, et pour restaurer le pouvoir d'agir des professionnels.",
    eg: "Analyser, avec un collectif de guichetiers, comment un nouveau logiciel reconfigure leur relation à l'usager, puis transformer l'outil avec eux.",
  },
  {
    w: "Acceptation située",
    a: "dejours",
    def: "L'appropriation d'un outil ne se décrète pas sur plan (acceptabilité a priori) : elle se construit dans et par l'activité, a posteriori, face aux contradictions et aux aléas du réel du travail.",
    eg: "Un outil plébiscité en test utilisateur mais massivement contourné en situation réelle de surcharge : l'acceptation n'a pas eu lieu.",
  },
  {
    w: "Genèse instrumentale (Rabardel)",
    a: "precurseurs",
    def: "Processus par lequel un artefact technique neutre devient un instrument signifiant, via l'instrumentation (l'outil façonne le sujet) et l'instrumentalisation (le sujet adapte l'outil, y compris par le braconnage).",
    eg: "Un commercial qui détourne un champ « commentaire » du CRM pour en faire son propre agenda de relances : un instrument né de l'usage.",
  },
  {
    w: "Le pouvoir d'agir numérique",
    a: "dejours",
    def: "La capacité des professionnels à comprendre, adapter, discuter et transformer les technologies qui structurent leur activité. C'est le pont direct avec PST106 (clinique de l'activité).",
    eg: "Donner aux agents les moyens de paramétrer et de critiquer leur outil, plutôt que de seulement s'y conformer.",
  },
  {
    w: "Le système d'activité (Engeström)",
    a: "molinier",
    def: "Le travail est un système (Sujet ↔ Objet ↔ Outil) régulé par des Règles, une Communauté et une Division du travail. Une technologie y introduit des contradictions systémiques à analyser.",
    eg: "L'arrivée d'un outil de traçabilité entre en contradiction avec les règles informelles d'entraide : une contradiction systémique.",
  },
  {
    w: "Prescription technologique et IA",
    a: "management",
    def: "Quand l'organisation du travail et le rythme ne sont plus dictés par un manager humain, mais codés dans le logiciel ou pilotés par un algorithme (scoring, dispatching, surveillance continue).",
    eg: "Le rythme du préparateur d'entrepôt fixé en temps réel par le terminal vocal, sans interlocuteur.",
  },
  {
    w: "Technologie capacitante vs incapacitante",
    a: "management",
    def: "Distinction sur le pouvoir de développement de l'outil : la technologie capacitante développe compétences, autonomie et collectif ; l'incapacitante déqualifie (taylorisme numérique), contrôle, isole et fige.",
    eg: "Une même IA d'aide au diagnostic est capacitante si elle outille le jugement du médecin, incapacitante si elle le remplace.",
  },
  {
    w: "Acceptabilité vs acceptation",
    a: "management",
    def: "Passage d'une évaluation a priori (intention d'usage d'un utilisateur rationnel isolé, modèles TAM/UTAUT) à une évaluation a posteriori (usage réel face aux contraintes situées du travail).",
    eg: "Le questionnaire d'intention prédit l'adoption ; six mois plus tard, l'usage réel raconte une tout autre histoire.",
  },
  {
    w: "Invisibilisation du travail réel",
    a: "dejours",
    def: "Le numérique masque les efforts de régulation, le « sale boulot » et le travail d'articulation derrière l'illusion du « clic magique » et de l'automatisation affichée.",
    eg: "Le parcours « entièrement automatisé » qui ne tient que grâce aux relances et corrections invisibles d'un back-office.",
  },
  {
    w: "Pathologies du digital et surveillance",
    a: "management",
    def: "RPS spécifiques liés au technostress : hyper-connexion, infobésité, porosité vie pro / vie perso, interruptions permanentes et pression de la surveillance algorithmique.",
    eg: "L'injonction paradoxale d'une réactivité immédiate exigée alors que la tâche demande un traitement en profondeur.",
  },
  {
    w: "Braconnage / détournement",
    a: "precurseurs",
    def: "Adaptation de l'outil par le sujet pour sauver l'activité, y compris en s'écartant de l'usage prescrit. Indicateur précieux de l'activité réelle (et parfois empêchée), à lire comme une donnée d'analyse.",
    eg: "Le fichier Excel « officieux » maintenu en parallèle de l'ERP pour pallier ses manques.",
  },
  {
    w: "Les 4 dimensions de l'acceptation située",
    a: "dejours",
    def: "Grille de diagnostic de Bobillier Chaumon : utilité pour l'activité, utilisabilité, intégration socio-organisationnelle (soutien du collectif) et signification identitaire et professionnelle (faire un beau travail).",
    eg: "Un outil utilisable et utile, mais qui isole l'opérateur et l'empêche de faire un travail dont il soit fier, échoue sur 2 dimensions sur 4.",
  },
  {
    w: "Cobot (robotique collaborative)",
    a: "management",
    def: "Robot conçu pour travailler en interaction directe avec l'opérateur. Selon sa conception, il peut outiller le geste (capacitant) ou imposer une cadence et déqualifier (incapacitant).",
    eg: "Un bras cobotisé qui soulage le port de charge sans dicter le rythme à l'opérateur.",
  },
  {
    w: "Technostress",
    a: "management",
    def: "RPS spécifiques au numérique : infobésité, interruptions permanentes, hyper-connexion et pression de la surveillance algorithmique.",
    eg: "L'injonction de réactivité immédiate aux notifications alors que la tâche exige un traitement en profondeur.",
  },
  {
    w: "Travail d'articulation",
    a: "dejours",
    def: "Efforts invisibles de régulation, de coordination et de « rattrapage » que déploient les salariés pour faire fonctionner des systèmes imparfaits.",
    eg: "Le back-office qui relance et corrige pour qu'un parcours « 100 % dématérialisé » aboutisse réellement.",
  },
  {
    w: "Déterminisme technologique (critique)",
    a: "management",
    def: "Illusion selon laquelle la technologie dicterait mécaniquement ses effets sociaux. Le cours la réfute : une même technologie produit des effets opposés selon l'organisation et l'activité.",
    eg: "Le même logiciel de planification soutient l'autonomie d'une équipe et, ailleurs, sert d'outil de flicage.",
  },
  {
    w: "Conception participative",
    a: "precurseurs",
    def: "Démarche faisant des utilisateurs des co-concepteurs des usages futurs, et non de simples destinataires d'un outil « clé en main ».",
    eg: "Associer les aides-soignantes à la conception de leur outil de transmission.",
  },
];

/**
 * Données et corrigés officiels d'excellence des Activités Distantes (AD) de PST106.
 * Séance du 23 octobre 2026 (Corrigé collectif en cours le 28 octobre 2026 - Mme Lagabrielle).
 */

export interface AdQuestionItem {
  id: number;
  question: string;
  options: { label: string; text: string }[];
  correct: string;
  explanation: string;
  keyConcept: string;
}

export interface AdData {
  id: string;
  title: string;
  theme: string;
  authorRef: string;
  dateSeance: string;
  dateCorrige: string;
  objectifs: string[];
  motsCles18: string[];
}

export const AD1_TAYLORISME_QUESTIONS: AdQuestionItem[] = [
  {
    id: 1,
    question: "La spécialisation des tâches correspond à :",
    options: [
      { label: "A", text: "Une déqualification du poste de travail." },
      { label: "B", text: "Un accroissement de la qualification." },
    ],
    correct: "A",
    explanation:
      "La parcellisation extrême dépossède l'ouvrier de son métier global d'artisan. L'ouvrier n'a plus besoin d'un apprentissage long : il devient un Ouvrier Spécialisé (O.S.) exécutant une fraction de tâche déqualifiée.",
    keyConcept: "Déqualification & parcellisation",
  },
  {
    id: 2,
    question:
      "Quelle est la réponse correcte à la question suivante : « Comment le taylorisme explique-t-il les comportements en organisation ? »",
    options: [
      {
        label: "A",
        text: "Deux principes du taylorisme sont la spécialisation des tâches et la division des tâches.",
      },
      {
        label: "B",
        text: "Les règles de la division du travail sont prescriptives et contraignent les individus.",
      },
    ],
    correct: "B",
    explanation:
      "Dans le modèle mécaniste de Taylor, l'organisation détermine entièrement les conduites humaines : les règles écrites et minutées prescrivent ce que l'opérateur doit faire et éliminent toute liberté d'action.",
    keyConcept: "Organisation prescriptive contraignante",
  },
  {
    id: 3,
    question:
      "Dans le cadre d'une organisation, une règle est prescriptive parce qu'elle :",
    options: [
      { label: "A", text: "Laisse les individus libres d'adopter le comportement qu'ils veulent." },
      { label: "B", text: "Traduit les comportements qui sont adoptés par les individus." },
      { label: "C", text: "Définit les comportements à avoir." },
    ],
    correct: "C",
    explanation:
      "La prescription énonce la norme a priori : elle fixe la façon obligatoire dont la tâche doit être exécutée, par opposition à la description du réel.",
    keyConcept: "Caractère normatif de la règle",
  },
  {
    id: 4,
    question:
      "Selon le modèle de l'OST, les comportements dans les organisations sont déterminés par :",
    options: [
      { label: "A", text: "Des règles." },
      { label: "B", text: "Des normes." },
      { label: "C", text: "Des habitudes de travail." },
    ],
    correct: "A",
    explanation:
      "L'Organisation Scientifique du Travail repose sur l'hégémonie des règles formelles d'ingénierie (gammes opératoires, fiches d'instructions, temps alloués).",
    keyConcept: "Déterminisme organisationnel formel",
  },
  {
    id: 5,
    question: "Un organigramme :",
    options: [
      { label: "A", text: "Est une représentation des règles de l'organisation." },
      { label: "B", text: "Définit les règles de l'organisation." },
    ],
    correct: "A",
    explanation:
      "L'organigramme schématise et représente graphiquement la structure formelle et la hiérarchie officielle, mais ce sont les règlements et procédures qui édictent les règles.",
    keyConcept: "Représentation formelle de la structure",
  },
  {
    id: 6,
    question: "Parmi les deux énoncés suivants, lequel est vrai ?",
    options: [
      {
        label: "A",
        text: "L'organisation informelle définit les relations réelles entre les membres de l'organisation.",
      },
      {
        label: "B",
        text: "Les relations réelles entre les membres de l'organisation définissent l'organisation informelle.",
      },
    ],
    correct: "B",
    explanation:
      "L'informel n'est pas une entité préétablie qui dicterait la réalité : c'est l'ensemble des relations et régulations réelles spontanées vécues par les acteurs qui constitue a posteriori ce que la sociologie nomme l'organisation informelle.",
    keyConcept: "Émergence de l'organisation informelle",
  },
  {
    id: 7,
    question: "Selon la perspective taylorienne, l'informel :",
    options: [
      { label: "A", text: "Est inhérent à toutes les organisations." },
      { label: "B", text: "Renvoie à la nature humaine." },
      { label: "C", text: "Peut être totalement réduit." },
    ],
    correct: "C",
    explanation:
      "Pour Taylor, l'informel est assimilé à la flânerie systématique (soldiering) et à l'inefficacité. Grâce au One Best Way et au chronométrage absolu, l'entreprise taylorienne prétend éliminer toute zone d'incertitude ou d'autonomie informelle.",
    keyConcept: "Illusion de l'élimination de l'informel",
  },
  {
    id: 8,
    question: "L'organisation formelle est :",
    options: [
      { label: "A", text: "Parallèle." },
      { label: "B", text: "Théorique." },
      { label: "C", text: "Illicite." },
    ],
    correct: "B",
    explanation:
      "L'organisation formelle est le système abstrait, théorique et officiel conçu sur le papier par les bureaux des méthodes avant toute confrontation au réel.",
    keyConcept: "Caractère théorique du formel",
  },
  {
    id: 9,
    question:
      "L'énoncé suivant : « Selon le taylorisme, on peut dire qu'il est possible d'aboutir à la meilleure organisation », est-il :",
    options: [
      { label: "A", text: "Vrai ?" },
      { label: "B", text: "Faux ?" },
    ],
    correct: "A",
    explanation:
      "C'est le postulat positiviste central de Taylor : il existe une seule et unique façon optimale de travailler (« The One Best Way »), scientifiquement démontrable par l'observation et la mesure.",
    keyConcept: "The One Best Way",
  },
  {
    id: 10,
    question:
      "Dans l'entreprise taylorienne, les membres de la hiérarchie intermédiaire (la maîtrise) :",
    options: [
      { label: "A", text: "Conçoivent l'organisation du travail de leurs équipes." },
      { label: "B", text: "Adoptent un style de commandement autoritaire." },
      { label: "C", text: "Tiennent compte des revendications sur les rythmes de travail." },
    ],
    correct: "B",
    explanation:
      "Les contremaîtres ne conçoivent rien (la conception est réservée aux ingénieurs du Bureau des Méthodes). Leur rôle exclusif est de faire respecter militairement et autoritairement les temps imposés.",
    keyConcept: "Division verticale & commandement autoritaire",
  },
  {
    id: 11,
    question: "Taylor a défini un nouveau système de rémunération. C'est :",
    options: [
      { label: "A", text: "Le salaire proportionnel." },
      { label: "B", text: "Le salaire conventionnel." },
      { label: "C", text: "Le salaire différentiel." },
    ],
    correct: "C",
    explanation:
      "Le salaire aux pièces différentiel (differential piece-rate system) : le tarif est fixé très bas si l'ouvrier n'atteint pas la norme stricte, et bénéficie d'une forte prime (+30% à +100%) dès qu'il dépasse le standard.",
    keyConcept: "Salaire aux pièces différentiel",
  },
  {
    id: 12,
    question: "Le nombre de niveaux hiérarchiques renvoie à :",
    options: [
      { label: "A", text: "La division verticale du travail." },
      { label: "B", text: "La division horizontale du travail." },
      { label: "C", text: "La spécialisation du travail." },
    ],
    correct: "A",
    explanation:
      "La division verticale sépare ceux qui pensent de ceux qui exécutent et structure l'échelle pyramidale des lignes d'autorité (alors que la division horizontale parcellise les gestes au même niveau).",
    keyConcept: "Division verticale du travail",
  },
  {
    id: 13,
    question:
      "Le chronométrage direct de l'ouvrier accomplissant ses tâches sur son poste de travail a été la seule méthode de mesure des temps. Cet énoncé est-il :",
    options: [
      { label: "A", text: "Vrai ?" },
      { label: "B", text: "Faux ?" },
    ],
    correct: "B",
    explanation:
      "Faux : Frank et Lillian Gilbreth ont développé l'analyse cinématographique (chronocylographes, photographies stroboscopiques des trajectoires lumineuses) et la décomposition en micro-gestes universels (les therbligs) sans chronomètre en direct.",
    keyConcept: "Méthodes des micromouvements (Gilbreth)",
  },
  {
    id: 14,
    question: "Les principes d'économie des mouvements ont été définis pour :",
    options: [
      { label: "A", text: "Permettre une meilleure maîtrise de leur travail par les ouvriers." },
      { label: "B", text: "Déterminer les gestes inutiles à éliminer." },
      { label: "C", text: "Décomposer au maximum le travail en gestes élémentaires." },
    ],
    correct: "B",
    explanation:
      "La finalité première de l'analyse des mouvements est la traque du gaspillage énergétique et temporel en supprimant tout geste parasite (se baisser, chercher, hésiter).",
    keyConcept: "Élimination des gestes parasites",
  },
  {
    id: 15,
    question:
      "Par la spécialisation des tâches, la dépendance de l'entreprise par rapport aux ouvriers qualifiés s'est trouvée :",
    options: [
      { label: "A", text: "Réduite." },
      { label: "B", text: "Accrue." },
    ],
    correct: "A",
    explanation:
      "Avant Taylor, l'artisan qualifié détenait les secrets de fabrication et imposait son rythme. En parcellisant les tâches, Taylor transfère le savoir dans la machine et le bureau, rendant les ouvriers interchangeables.",
    keyConcept: "Expropriation du savoir ouvrier",
  },
  {
    id: 16,
    question:
      "Dans les débuts du taylorisme, les réactions des dirigeants d'entreprise furent :",
    options: [
      {
        label: "A",
        text: "Favorable à cause des gains de productivité permis par la rationalisation du travail.",
      },
      {
        label: "B",
        text: "Défavorables à cause des coûts occasionnés par les études préalables.",
      },
    ],
    correct: "B",
    explanation:
      "Les patrons ont d'abord rejeté le taylorisme car l'embauche d'ingénieurs de méthodes, l'achat d'appareils de mesure et les années d'études préalables représentaient un coût fixe immédiat considérable avant tout gain.",
    keyConcept: "Résistance initiale du patronat",
  },
  {
    id: 17,
    question:
      "Dans la période précédant le taylorisme, les ouvriers qualifiés :",
    options: [
      { label: "A", text: "Ne parvenaient pas à s'adapter aux évolutions des machines." },
      { label: "B", text: "N'étaient pas suffisamment nombreux." },
      { label: "C", text: "Brouillaient le calcul des temps productifs." },
    ],
    correct: "C",
    explanation:
      "Les ouvriers de métier pratiquaient la flânerie systématique organisée en collectif pour cacher leur rendement réel à la direction et empêcher la baisse des tarifs aux pièces.",
    keyConcept: "Flânerie systématique (soldiering)",
  },
  {
    id: 18,
    question:
      "Par rapport aux techniques de chronométrage, lequel des énoncés suivants est vrai ?",
    options: [
      { label: "A", text: "Les mesures des temps devenaient objectives et indiscutables." },
      { label: "B", text: "Les ouvriers introduisaient du flou par rapport aux temps réels." },
    ],
    correct: "B",
    explanation:
      "Dès qu'un chronométreur apparaissait, les ouvriers modifiaient leurs gestes, ralentissaient la cadence ou simulaient des difficultés pour obtenir des temps alloués larges et confortables.",
    keyConcept: "Régulation ouvrière face à la mesure",
  },
  {
    id: 19,
    question:
      "La spécialisation des tâches est un principe du taylorisme qui correspond à :",
    options: [
      { label: "A", text: "La qualification des tâches." },
      { label: "B", text: "La parcellisation des tâches." },
      { label: "C", text: "La reconnaissance de l'expérience des ouvriers qualifiés." },
    ],
    correct: "B",
    explanation:
      "La spécialisation taylorienne est synonyme de division horizontale poussée à l'extrême : chaque poste est réduit à un geste ultra-répétitif d'une durée de quelques secondes.",
    keyConcept: "Division horizontale extrême",
  },
  {
    id: 20,
    question:
      "L'émergence du taylorisme a permis aux entreprises qui s'engagèrent sur la voie de la rationalisation de :",
    options: [
      { label: "A", text: "Promouvoir les ouvriers qualifiés." },
      { label: "B", text: "Réduire l'influence des ouvriers qualifiés." },
      { label: "C", text: "Renforcer l'importance des ouvriers qualifiés." },
    ],
    correct: "B",
    explanation:
      "En cassant le monopole de compétence des syndicats de métier (craft unions), les industriels ont pu briser les grèves et embaucher une main-d'œuvre immigrée ou paysanne docile.",
    keyConcept: "Casse du pouvoir syndical de métier",
  },
  {
    id: 21,
    question:
      "Le manutentionnaire de gueuses de fonte transportait 12,5 tonnes par jour avant la rationalisation de son travail. En suivant les consignes données par Taylor, il en transportait :",
    options: [
      { label: "A", text: "27 tonnes par jour." },
      { label: "B", text: "37 tonnes par jour." },
      { label: "C", text: "47 tonnes par jour." },
    ],
    correct: "C",
    explanation:
      "C'est la célèbre expérience de Taylor à la Bethlehem Steel avec l'ouvrier Schmidt : en lui imposant un rythme calculé (marche cadencée avec 57% de temps de repos sous charge), il est passé de 12,5 tonnes à 47,5 tonnes par jour.",
    keyConcept: "L'expérience des gueuses de fonte (Schmidt)",
  },
  {
    id: 22,
    question:
      "En combien d'exemplaires le modèle T du constructeur automobile américain Henri Ford fut produit de 1908 à 1927 ?",
    options: [
      { label: "A", text: "5 millions." },
      { label: "B", text: "15 millions." },
      { label: "C", text: "25 millions." },
    ],
    correct: "B",
    explanation:
      "La Ford T, premier véhicule produit sur chaîne de montage mobile continue à Highland Park, s'est vendue à un peu plus de 15 millions d'exemplaires (15 007 033).",
    keyConcept: "Production de masse (Ford T)",
  },
  {
    id: 23,
    question:
      "En 1906, chez le constructeur automobile français Renault, la proportion d'ouvriers non qualifiés était de 4%. Avec la rationalisation du travail cette proportion passa en 1924 à :",
    options: [
      { label: "A", text: "34%." },
      { label: "B", text: "54%." },
      { label: "C", text: "74%." },
    ],
    correct: "B",
    explanation:
      "Chez Renault Billancourt, l'introduction du chronométrage (qui provoqua la grande grève de 1912-1913) a fait basculer l'usine d'un atelier d'artisans mécaniciens (96% de qualifiés en 1906) vers une usine dominée par les O.S. (54% de non-qualifiés en 1924).",
    keyConcept: "Taylorisation chez Renault",
  },
  {
    id: 24,
    question:
      "Entre 1909 et 1927, années du démarrage et de l'arrêt de la production du modèle T de Ford, le prix de vente de la voiture fut divisé par :",
    options: [
      { label: "A", text: "3." },
      { label: "B", text: "4." },
      { label: "C", text: "5." },
    ],
    correct: "A",
    explanation:
      "Le prix de vente est passé de 850 $ en 1908 à moins de 300 $ (environ 290 $) en 1925 grâce aux gains colossaux de productivité de la chaîne mobile, soit un facteur d'environ 3.",
    keyConcept: "Baisse des coûts & standardisation fordienne",
  },
  {
    id: 25,
    question:
      "Dans les années soixante-dix en France, dans les usines taylorisées, les temps de cycle pour la confection des bottes étaient de :",
    options: [
      { label: "A", text: "1 à 2 minutes." },
      { label: "B", text: "2 à 4 minutes." },
      { label: "C", text: "5 à 8 minutes." },
    ],
    correct: "A",
    explanation:
      "Dans l'étude pionnière menée au Cnam par Catherine Teiger, Antoine Laville et Jacques Duraffourg (1973) dans les ateliers de confection de chaussures et bottes, les ouvrières étaient soumises à des cadences extrêmes avec des cycles de travail de 1 à 2 minutes répétés 400 fois par jour.",
    keyConcept: "Études ergonomiques du CNAM sur le travail répétitif",
  },
];

export const PHILOSOPHY_WORK_SUMMARY = [
  {
    author: "Jean-Jacques Rousseau",
    title: "Le travail, la propriété et la dénaturation de l'homme",
    coreIdea:
      "Dans l'état de nature, l'homme субsiste par des besoins simples et jouit de son oisiveté. C'est l'apparition de l'agriculture, de la métallurgie et surtout de la propriété privée (« Ceci est à moi ») qui institue la division du travail et enchaîne les hommes aux inégalités et à la dépendance mutuelle.",
    citation:
      "« C'est le fer et le blé qui ont civilisé les hommes et perdu le genre humain. » (Discours sur l'origine et les fondements de l'inégalité parmi les hommes, 1755)",
    relevancePst:
      "À mobiliser pour contraster l'illusion du progrès technique avec l'aliénation sociale et l'asservissement des travailleurs aux impératifs économiques.",
  },
  {
    author: "Friedrich Nietzsche",
    title: "Le travail acharné comme « la meilleure des polices »",
    coreIdea:
      "Le culte moderne du travail sans relâche n'est pas une valeur noble mais un dispositif de domestication des masses. En épuisant l'énergie nerveuse de l'individu du matin au soir, la société lui ôte toute force de penser par lui-même, de désirer, de philosopher ou de se révolter.",
    citation:
      "« Le travail est la meilleure des polices, il tient chacun en bride et entrave puissamment le développement de la raison, des désirs, du goût de l'indépendance. » (Aurore, 1881, § 173)",
    relevancePst:
      "Crucial pour analyser la fonction disciplinaire des cadences et du surmenage managérial qui empêche toute contestation collective.",
  },
  {
    author: "Herbert Marcuse",
    title: "La rationalité technologique et l'homme unidimensionnel",
    coreIdea:
      "Dans le capitalisme industriel avancé, la domination ne s'exerce plus par la force brute mais par le confort matériel et la technologie. Le travail aliéné est intériorisé par les salariés : les besoins créés par la société de consommation les enferment dans une aliénation heureuse et annihilent tout esprit critique.",
    citation:
      "« Les esclaves de la civilisation industrielle sont des esclaves sublimés, mais ils sont des esclaves. » (L'Homme unidimensionnel, 1964)",
    relevancePst:
      "À articuler avec la sociologie critique de Bourdieu (PST108) et l'analyse de l'usure mentale sous cadence imposée.",
  },
  {
    author: "Max Weber",
    title: "L'éthique protestante et le travail comme vocation sacrée (Beruf)",
    coreIdea:
      "L'esprit du capitalisme moderne puise ses racines dans l'ascétisme calviniste : pour apaiser l'angoisse de la prédestination, le fidèle cherche les signes de son salut dans le succès d'un travail méthodique, acharné et sans jouissance immédiate. Le métier devient un devoir moral sacré.",
    citation:
      "« Le travail sans relâche dans un métier séculier est le moyen par excellence pour acquérir l'assurance de la grâce. » (L'Éthique protestante et l'esprit du capitalisme, 1905)",
    relevancePst:
      "Permet d'expliquer l'origine culturelle de l'engagement subjectif, du sens du devoir ouvrier et du surinvestissement professionnel.",
  },
  {
    author: "Emmanuel Kant",
    title: "Le travail comme discipline et arrachement à la paresse",
    coreIdea:
      "L'homme est le seul animal qui doit travailler pour subsister et développer ses facultés. Le travail n'est pas une punition divine, mais le processus pédagogique par lequel l'être humain s'arrache à la passivité naturelle, maîtrise ses penchants égoïstes et s'élève à la dignité et à la liberté morale.",
    citation:
      "« L'homme a besoin de s'occuper, même si cette occupation lui est pénible, pour sentir son existence. » (Traité de pédagogie, 1803)",
    relevancePst:
      "Illustre la conception universaliste et humaniste qui fonde la nécessité du travail pour la santé psychique (Jahoda, Clot).",
  },
  {
    author: "Karl Marx",
    title: "Le travail comme essence humaine et l'aliénation capitaliste",
    coreIdea:
      "Le travail est originellement l'acte par lequel l'homme s'extériorise dans le monde et transforme la nature pour se réaliser. Dans le mode de production capitaliste, le travail est dénaturé en quadruple aliénation : l'ouvrier est dépossédé du produit de son travail, de l'acte de production lui-même, de son essence générique humaine et de ses semblables.",
    citation:
      "« Le travail produit des merveilles pour les riches, mais il produit le dénuement pour l'ouvrier. Il produit des palais, mais pour l'ouvrier des tanières. » (Manuscrits de 1844)",
    relevancePst:
      "Fondement incontournable de toute critique de l'OST, de la déqualification ouvrière et de la séparation entre conception et exécution.",
  },
  {
    author: "G. W. F. Hegel",
    title: "La dialectique du maître et de l'esclave : la libération par le travail",
    coreIdea:
      "Dans la lutte à mort pour la reconnaissance, l'un préfère la vie à la liberté et devient esclave. Mais le maître se condamne à la jouissance oisive et dépend de son serf. L'esclave, par son travail, transforme la matière, discipline son désir et imprime sa marque dans le monde objectif : c'est par le travail qu'il s'émancipe et devient le véritable maître de l'histoire.",
    citation:
      "« Le travail forme. Le rapport négatif à l'objet devient forme de cet objet, quelque chose qui dure. » (Phénoménologie de l'esprit, 1807)",
    relevancePst:
      "Au cœur de la psychodynamique de Christophe Dejours (l'épreuve du réel) et de la reconquête du pouvoir d'agir chez Yves Clot.",
  },
  {
    author: "Sigmund Freud",
    title: "Le travail comme ancrage dans le réel et principe de réalité",
    coreIdea:
      "Le travail constitue le lien le plus solide de l'individu avec la réalité et la communauté humaine. Il permet de sublimer les pulsions agressives et libidinales en activités socialement utiles. Sans possibilité de travailler, le sujet s'enferme dans le fantasme et la névrose.",
    citation:
      "« Aucun autre comportement de la vie quotidienne n'attache l'individu aussi fermement à la réalité que la mise en valeur du travail. » (Malaise dans la civilisation, 1930)",
    relevancePst:
      "Fondement majeur de la psychopathologie du travail (Le Guillant, Dejours) : le travail n'est pas optionnel pour l'équilibre mental.",
  },
];

export const MASON_EXERCISE_MODEL_ANSWER = {
  title: "Exercice des maçons (Frank B. Gilbreth & F.W. Taylor)",
  q1_analysis:
    "1. Analyse des gestes observés selon Taylor :\nDans la méthode traditionnelle, le maçon réalise 18 gestes par brique :\n- Il se penche jusqu'au sol pour ramasser chaque brique.\n- Il tape sur la brique avec le manche de sa truelle pour juger de sa qualité.\n- Il tourne la brique dans tous les sens pour trouver la face la plus lisse.\n- Il se baisse à nouveau pour puiser du mortier de mauvaise consistance.\n- Il fait des pas latéraux inutiles pour s'approvisionner.\n\n-> Gestes strictement nécessaires : poser le mortier, attraper la brique et la déposer d'une seule impulsion.\n-> Gestes inutiles à éliminer : toutes les flexions lombaires au sol, les tapotements d'inspection, le retournement de la brique et la marche.",
  q2_alternative_org:
    "2. Nouvelle organisation du travail proposée :\n- Échafaudage réglable à hauteur constante : une plate-forme mobile maintient en permanence le mur, la planche de mortier et les briques à hauteur de ceinture, supprimant tout mouvement de flexion du dos.\n- Pré-tri par des manœuvres en amont (« Packet system ») : les briques sont triées, nettoyées et empilées sur une claie légère avec leur meilleure face orientée du bon côté.\n- Mortier à consistance scientifique : le mortier est gâché avec une fluidité constante qui permet d'insérer la brique à la bonne profondeur d'une simple pression de la main, sans jamais avoir à taper avec la truelle.",
  q3_rational_procedure:
    "3. La meilleure façon de monter le mur (One Best Way) :\nLe maçon travaille simultanément des deux mains (coordination bimanuelle symétrique) : il plonge sa truelle dans le mortier de la main droite pendant que sa main gauche saisit la brique sur la claie à hauteur d'épaule. Il dépose le lit de mortier et enfonce la brique d'un seul geste fluide et ininterrompu.\n\nBilan chiffré :\n- Nombre de mouvements par brique réduit de 18 à 4,5.\n- Vitesse de pose portée de 120 briques/heure à 350 briques/heure.\n- Réduction drastique de la fatigue musculaire lombaire.",
};

export const HERZBERG_TWO_FACTOR_MODEL = {
  title: "Théorie bi-factorielle de Frederick Herzberg (1968)",
  hygieneFactors: [
    { name: "Politique générale et administration de l'entreprise", weight: "35% insatisfaction" },
    { name: "Style de supervision hiérarchique", weight: "28% insatisfaction" },
    { name: "Relations interpersonnelles (supérieurs, pairs, subordonnés)", weight: "20% insatisfaction" },
    { name: "Conditions matérielles de travail et ergonomie", weight: "18% insatisfaction" },
    { name: "Rémunération et salaire fixe", weight: "15% insatisfaction" },
    { name: "Sécurité de l'emploi et statut statutaire", weight: "12% insatisfaction" },
  ],
  motivationFactors: [
    { name: "Accomplissement personnel (Achievement)", weight: "45% satisfaction" },
    { name: "Reconnaissance pour le travail bien fait", weight: "33% satisfaction" },
    { name: "Intérêt intrinsèque du travail lui-même", weight: "28% satisfaction" },
    { name: "Responsabilité et autonomie déléguée", weight: "23% satisfaction" },
    { name: "Avancement et opportunités de carrière", weight: "14% satisfaction" },
    { name: "Épanouissement et développement personnel", weight: "12% satisfaction" },
  ],
  enrichmentPrinciples: [
    {
      action: "Supprimer les contrôles tatillons",
      principe: "Accroître la responsabilité et la liberté dans l'exécution.",
    },
    {
      action: "Attribuer une unité naturelle de travail",
      principe: "Confier un projet complet (ex. un client, un secteur) au lieu d'une tâche morcelée.",
    },
    {
      action: "Accorder de l'autorité directe",
      principe: "Permettre de prendre des décisions sans validation hiérarchique préalable.",
    },
    {
      action: "Rapports périodiques transmis directement à l'employé",
      principe: "L'employé s'auto-évalue au lieu d'être jugé par son chef.",
    },
    {
      action: "Introduire des tâches nouvelles plus complexes",
      principe: "Favoriser l'apprentissage et la montée en expertise.",
    },
  ],
};

export const PACAUD_TELEPHONISTES_SUMMARY = {
  title: "Recherches sur le travail des téléphonistes — Suzanne Pacaud (1953)",
  contexte:
    "Laboratoire de Psychotechnique de la SNCF & EPHE (41 rue Gay-Lussac). Étude clinique et psychologique des standardistes du Poste Téléphonique Central Manuel.",
  ruptureEpistemologique:
    "Suzanne Pacaud rompt avec la tradition psychotechnique qui partait de la « marche normale » du travail. Pour Pacaud, le travail réel de l'opératrice ne consiste pas à exécuter une procédure linéaire, mais à vaincre continuellement une série d'obstacles et d'imprévus complexes.",
  quatorzeDifficultes: [
    "Prononciation défectueuse des usagers (pipes entre les dents, chuchotements, éloignement du combiné).",
    "Effort articulatoire permanent imposé à la téléphoniste pour éviter les collations répétées.",
    "Bruits intenses de la salle et bruits ferroviaires (effet de masque acoustique, relèvement du seuil auditif).",
    "Lenteur des dispositifs techniques et discordance temporelle avec l'impatience de l'usager.",
    "Raccrochages prématurés au moment précis où le correspondant décroche.",
    "Allumage simultané d'une multitude de voyants d'appel créant un état d'inhibition motrice.",
    "Priorité anxiogène des voyants rouges (Direction et Ingénieurs en chef à ne jamais faire attendre).",
    "Nécessité de connaître par cœur des centaines de numéros et la cartographie mouvante des services.",
    "Rôle de médiation et d'investigation : retrouver les personnes absentes dans d'autres bureaux.",
    "Gestion des malentendus et des attributions erronées de numéros par les appelants.",
    "Rôle d'information générale face aux questions imprévues sur les organigrammes.",
    "Enchevêtrement inextricable des cordes (dicordes) aux heures de pointe.",
    "Attention partagée et simultanéité : parler, écouter, chercher un jack et surveiller les lampes.",
    "Agressivité, insultes et plaintes injustifiées des usagers protégés par l'anonymat du combiné.",
  ],
  conclusionCnam:
    "Pacaud montre que les 'fautes' des opératrices sont en réalité des régulations de survie. Avec Jean-Marie Lahy, elle invalide la thèse simpliste de la 'prédisposition aux accidents' et pose les bases du concept de 'plasticité fonctionnelle', qui mènera à la distinction fondamentale entre Travail Prescrit et Travail Réel au Cnam.",
};

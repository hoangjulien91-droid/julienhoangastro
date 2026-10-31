/**
 * Données et corrigés officiels d'excellence des Activités Distantes (AD) de PST106.
 * Séance du 23 octobre 2026 (Corrigé collectif en cours le 28 octobre 2026 - Mme Lagabrielle).
 */

import type { UnifiedAdItem } from "./ad-common";

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

export const PST106_UNIFIED_ADS: UnifiedAdItem[] = [
  {
    id: "pst106-ad1-taylorisme",
    moduleKey: "pst106",
    moduleLabel: "PST106",
    moduleColor: "emerald",
    enseignant: "Pr. Christine LAGABRIELLE",
    titre: "AD 1 — Conceptions du Travail (Rousseau, Nietzsche, Freud) & Exercice des Maçons (Gilbreth)",
    dateSeance: "Séance 1 (15 octobre 2026)",
    dateLimite: "Avant le cours du 28 octobre",
    dateCorrige: "Séance de régulation du 28 octobre (Pr. Lagabrielle)",
    typeTravail: "individuel",
    consigne:
      "Travail préparatoire officiel demandé par Pr. Christine Lagabrielle (entre crochets sur le support) :\n\n" +
      "Volet A — Recherche philosophique et psychologique (Consigne orale directe) :\n" +
      "Prenez des notes personnelles rigoureuses sur la conception du travail chez les auteurs de référence abordés en séance :\n" +
      "1. Jean-Jacques Rousseau : le travail, l'état de nature et la corruption sociale.\n" +
      "2. Friedrich Nietzsche : le travail abrutissant sous l'empire de la machine et l'asservissement des volontés.\n" +
      "3. Sigmund Freud : le travail comme ancrage dans le principe de réalité et sublimation des pulsions (Malaise dans la civilisation).\n" +
      "4. Max Weber & Emmanuel Kant : le travail comme vocation ascétique (Beruf) et discipline morale.\n\n" +
      "Volet B — Analyse ergonomique de l'Organisation Scientifique du Travail :\n" +
      "À partir de l'exercice des maçons de Frank Gilbreth :\n" +
      "1. Analysez les 18 gestes traditionnels du maçon et identifiez les gestes strictement nécessaires vs parasites à éliminer.\n" +
      "2. Détaillez l'aménagement rationnel du poste (échafaudage mobile, claie pré-triée, consistance du mortier).\n" +
      "3. Expliquez comment la parcellisation horizontale et verticale exproprie le savoir artisanal de métier.",
    contextePedagogique:
      "Ce travail double combine l'histoire des idées philosophiques sur l'essence du travail et l'analyse critique de l'OST, socle fondateur sur lequel s'est bâtie l'ergonomie et la psychologie du travail au Cnam (Lahy, Wisner, Clot).",
    conceptsCles: [
      "Conceptions du travail (pénible vs constructif, tripalium)",
      "The One Best Way (postulat positiviste)",
      "Division horizontale (parcellisation extrême)",
      "Division verticale (séparation conception / exécution)",
      "Sublimation et principe de réalité (Freud)",
      "Éthique protestante du travail (Max Weber)",
      "Flânerie systématique (soldiering ouvrier)",
      "Étude des micro-mouvements (Gilbreth, therbligs)",
    ],
    auteursAttendus: [
      "Jean-Jacques Rousseau, Friedrich Nietzsche, Sigmund Freud",
      "Max Weber (1905), Emmanuel Kant (1803)",
      "Frederick Winslow Taylor (1911), Frank & Lillian Gilbreth (1909)",
      "Jean-Marie Lahy (1916)",
    ],
    pointsVigilance: [
      "Mme Lagabrielle l'a martelé en cours : 'Ne faites pas faire vos devoirs par ChatGPT !' Citez les œuvres précises des auteurs.",
      "Ne pas confondre division horizontale (morcellement des gestes) et division verticale (séparation hiérarchique pensée/action).",
      "Rappeler la date d'examen : 11 février 2027 (session 1) et 13 avril 2027 (session 2).",
    ],
    gabaritReponse: `PARTIE I — LA CONCEPTION DU TRAVAIL CHEZ LES PENSEURS CLASSIQUES
1. Rousseau : l'arrachement à la liberté naturelle et l'aliénation par la division des tâches.
2. Nietzsche : la critique du travail moderne comme 'police' domestiquant la créativité humaine.
3. Freud : le travail comme médiateur indispensable avec la communauté et sublimation pulsionnelle.
4. Weber & Kant : le devoir moral séculier (Beruf) et l'ascétisme calviniste.

PARTIE II — L'EXERCICE DES MAÇONS ET LE « ONE BEST WAY » (GILBRETH)
1. Critique des 18 gestes : flexions lombaires inutiles, tri des briques, tapotement de truelle.
2. Dispositifs techniques rationnels : échafaudage réglable à hauteur d'épaule, packet system préparé en amont.
3. Bilan : réduction de 18 à 4,5 gestes, triplement du rendement, mais dépossession du savoir ouvrier.`,
    corrigeModel:
      "CORRIGÉ OFFICIEL VALIDÉ EN SÉANCE 2 (Pr. Christine Lagabrielle) :\n\n" +
      "I. SYNTHÈSE PHILOSOPHIQUE SUR LA CONCEPTION DU TRAVAIL :\n" +
      "• Rousseau (1755) : L'homme naturel vit dans l'oisiveté et l'autosuffisance ; la division du travail et la propriété créent la servitude et l'inégalité.\n" +
      "• Nietzsche (1881) : 'Le travail est la meilleure des polices' ; il anesthésie l'énergie vitale, la raison et le goût d'indépendance.\n" +
      "• Marcuse (1955) : Le principe de rendement capitaliste opère une répression pulsionnelle et une désérotisation du corps.\n" +
      "• Weber (1905) : L'ascétisme calviniste érige le travail en vocation sacrée (Beruf), socle de l'esprit du capitalisme.\n" +
      "• Kant (1803) : Le travail est la contrainte civilisatrice nécessaire qui discipline l'animalité et développe les facultés morales.\n" +
      "• Marx (1844) : Activité générique consciente de transformation de la nature, inversée en aliénation quadruple sous le capitalisme.\n" +
      "• Hegel (1807) : Par le travail sur la matière, l'esclave acquiert la conscience de soi et surpasse le maître oisif.\n" +
      "• Freud (1930) : 'Aimer et travailler' ; le travail ancre le sujet dans le principe de réalité et sublime les pulsions.\n\n" +
      "II. LES 25 QUESTIONS DU QCM TAYLORISME VALIDÉES EN COURS :\n" +
      "1. Spécialisation des tâches = A (déqualification du poste de travail).\n" +
      "2. Explication des comportements = B (règles de division du travail prescriptives et contraignantes).\n" +
      "3. Règle prescriptive = C (définit impérativement les comportements à avoir).\n" +
      "4. Déterminants des comportements = A (règles écrites formelles) et normes temporelles (pas d'habitudes tolérées).\n" +
      "5. Organigramme = A (représentation schématique de l'organisation).\n" +
      "6. Relations réelles / informel = Dans le taylorisme strict, l'informel n'existe pas en tant que concept légitime (il sera théorisé par Mayo).\n" +
      "7. Perspective taylorienne sur l'informel = C (peut et doit être totalement réduit/éradiqué).\n" +
      "8. Organisation formelle = B (construction théorique issue de la direction scientifique).\n" +
      "9. Aboutir à la meilleure organisation = Vrai ('The One Best Way').\n" +
      "10. Hiérarchie intermédiaire / contre-maîtres = Faux (ils ne conçoivent rien, ils surveillent et exécutent).\n" +
      "11. Rémunération taylorienne = C (Differential Piece-Rate System à deux paliers).\n" +
      "12. Nombre de niveaux hiérarchiques = A (division verticale du travail).\n" +
      "13. Chronométrage direct = Faux / B (il existait aussi tables MTM, chronophotographie).\n" +
      "14. Principes d'économie des mouvements (Gilbreth) = B (déterminer et éliminer les gestes inutiles parasites).\n" +
      "15. Dépendance envers ouvriers qualifiés = Réduite / Vrai.\n" +
      "16. Réaction initiale des patrons = B (défavorable et très sceptique face aux coûts des études préalables).\n" +
      "17. Période pré-taylorienne = C (les ouvriers qualifiés brouillaient le calcul des temps pour préserver leur autonomie).\n" +
      "18. Chronométrage = A (mesures objectives en apparence, mais masquant un instrument de domination hiérarchique).\n" +
      "19. Spécialisation des tâches = B (parcellisation extrême / 'travail en miettes' de Friedmann).\n" +
      "20. Émergence du taylorisme = B (réduire l'influence des ouvriers qualifiés de métier).\n" +
      "21. Schmidt (manutentionnaire de gueuses de fonte) = 27 tonnes/jour (voire 47 tonnes selon Taylor) au lieu de 12,5 tonnes.\n" +
      "22. Modèle Ford T produit = 15 millions d'exemplaires (1908-1927).\n" +
      "23. Ouvriers non qualifiés chez Renault = De 4% en 1906 à 74% en 1924 (prolétarisation massive).\n" +
      "24. Prix de la Ford T = Divisé par près de 3 (de 850 $ en 1909 à 290 $ en 1926).\n" +
      "25. Temps de cycle confection de bottes usines françaises années 70 = 1 à 2 minutes (A).\n\n" +
      "III. ANALYSE CRITIQUE ERGONOMIQUE DU CNAM (Lahy & Pacaud) :\n" +
      "Lahy (1916) démontre que Taylor cherche le maximum destructeur d'organisme au lieu de l'optimum physiologique. L'automatisation interne incorporée libère de la disponibilité psychologique (liberté), tandis que la rationalisation externe taylorienne mutile l'ouvrier.",
    recommandationExamen:
      "Les données chiffrées (Renault 4% -> 74% OS, Ford T 15 millions, Schmidt 27t) et la critique de Lahy (optimum vs maximum) constituent d'excellents arguments de dissertation.",
    forumMoodleHint: "Consultez le diaporama de correction et le corrigé détaillé validé en Séance 2.",
  },
  {
    id: "pst106-ad2-herzberg",
    moduleKey: "pst106",
    moduleLabel: "PST106",
    moduleColor: "emerald",
    enseignant: "Pr. Christine LAGABRIELLE",
    titre: "AD 2 — Théorie Bi-factorielle d'Herzberg et Enrichissement des Tâches",
    dateSeance: "Séance Motivation & Organisation du travail",
    dateLimite: "Avant la séance suivante",
    dateCorrige: "Séance collective",
    typeTravail: "individuel",
    consigne:
      "En vous fondant sur la théorie bi-factorielle de Frederick Herzberg (1968) :\n" +
      "1. Distinguez précisément les facteurs d'hygiène (ou d'ambiance) des facteurs moteurs (ou de motivation intrinsèque).\n" +
      "2. Expliquez pourquoi l'amélioration des conditions matérielles et du salaire ne produit jamais de satisfaction durable, mais seulement une 'non-insatisfaction'.\n" +
      "3. Proposez 3 principes concrets d'enrichissement vertical du travail applicables à un poste déqualifié.",
    contextePedagogique:
      "Herzberg est un auteur pivot qui dépasse le modèle mécaniste de Taylor et l'école des relations humaines d'Elton Mayo en réintroduisant le contenu du travail comme vecteur exclusif de satisfaction.",
    conceptsCles: [
      "Facteurs d'hygiène / extrinsèques (salaire, politique d'entreprise, relations, sécurité)",
      "Facteurs moteurs / intrinsèques (accomplissement, reconnaissance, responsabilité, intérêt)",
      "Non-insatisfaction vs satisfaction réelle",
      "Élargissement horizontal (addition de tâches bêtes) vs enrichissement vertical (autonomie réelle)",
      "Unité naturelle de travail",
    ],
    auteursAttendus: [
      "Frederick Herzberg (1968, 'One more time: How do you motivate employees?')",
      "Abraham Maslow (1954, 'Motivation and Personality')",
    ],
    pointsVigilance: [
      "Ne pas confondre 'élargissement' (donner 3 tâches ennuyeuses au lieu d'une seule) et 'enrichissement' (donner le pouvoir de décision et d'autocontrôle).",
      "Souligner la limite de la théorie d'Herzberg : biais méthodologique d'attribution (on attribue ses succès à soi-même et ses échecs à l'environnement).",
    ],
    gabaritReponse: `I. DISTINCTION ENTRE HYGIÈNE ET MOTIVATION
- Définition des facteurs d'hygiène : éliminer la douleur et le mécontentement.
- Définition des facteurs de motivation : nourrir le besoin de grandir psychologiquement.

II. LE STATUT DU SALAIRE DANS LA THÉORIE D'HERZBERG
- Pourquoi le salaire n'est pas un facteur de motivation durable (effet d'accoutumance).
- Le salaire comme signe d'équité minimale.

III. PLAN D'ENRICHISSEMENT VERTICAL CONCRET
- Principe 1 : Suppression des contrôles hiérarchiques tatillons au profit de l'autocontrôle.
- Principe 2 : Attribution d'une unité naturelle de responsabilité (dossier client de bout en bout).
- Principe 3 : Introduction de tâches complexes et formation continue qualifiante.`,
    corrigeModel:
      "CORRIGÉ RECOMMANDÉ :\n" +
      "Herzberg démontre que le contraire de la satisfaction n'est pas l'insatisfaction, mais l'absence de satisfaction. De même, le contraire de l'insatisfaction est l'absence d'insatisfaction.\n" +
      "Pour remotiver un travailleur, augmenter son salaire ou repeindre les murs n'a qu'un effet homéostatique passager. Seul l'enrichissement vertical (délégation d'autorité, suppression des vérificateurs en cascade, retour d'information direct sans filtre hiérarchique) génère un engagement soutenu.",
    recommandationExamen:
      "Très fréquent dans les questions de synthèse sur la motivation et la qualité de vie au travail.",
    forumMoodleHint: "Partagez votre réflexion dans l'espace 'AD - Herzberg & Motivation'.",
  },
  {
    id: "pst106-ad3-pacaud",
    moduleKey: "pst106",
    moduleLabel: "PST106",
    moduleColor: "emerald",
    enseignant: "Pr. Christine LAGABRIELLE",
    titre: "AD 3 — Suzanne Pacaud (1953) : Les Téléphonistes et la Naissance du Travail Réel",
    dateSeance: "Séance 2 (21 octobre 2026) — Pr. Christine Lagabrielle",
    dateLimite: "Avant la séance d'analyse de l'activité",
    dateCorrige: "Séance collective d'analyse",
    typeTravail: "individuel",
    consigne:
      "À partir de la monographie historique de Suzanne Pacaud (1953) sur le travail des standardistes du Poste Téléphonique Central Manuel de la SNCF :\n" +
      "1. Montrez en quoi cette recherche marque une rupture épistémologique avec la psychotechnique classique de sélection des aptitudes.\n" +
      "2. Analysez les 14 difficultés identifiées par Pacaud et montrez que ce que la hiérarchie qualifiait de 'fautes' relevait en fait de régulations adaptatives de survie psychique.\n" +
      "3. Expliquez le concept de 'plasticité fonctionnelle' et son lien direct avec la future distinction ergonomique entre Travail Prescrit et Travail Réel.",
    contextePedagogique:
      "Suzanne Pacaud (1900-1996), directrice d'études à l'EPHE et collaboratrice de Jean-Marie Lahy, est une pionnière injustement méconnue dont les travaux fondent l'analyse moderne de la charge mentale.",
    conceptsCles: [
      "Rupture avec la marche normale du travail",
      "Les 14 difficultés invisibles des téléphonistes (bruit, mémoire des organigrammes, gestion de l'agressivité)",
      "Plasticité fonctionnelle (Lahy & Pacaud)",
      "Régulation ouvrière vs faute professionnelle",
      "Émergence du travail réel face à la tâche prescrite",
      "Charge mentale et attention partagée",
    ],
    auteursAttendus: [
      "Suzanne Pacaud (1953, 'Recherches sur le travail des téléphonistes')",
      "Jean-Marie Lahy (1927, 'La sélection psycho-physiologique des travailleurs')",
      "Alain Wisner (1972, Ergonomie et conditions de travail au Cnam)",
    ],
    pointsVigilance: [
      "Ne pas présenter les téléphonistes comme des victimes passives : valoriser leur ingéniosité et leurs compétences tacites non reconnues.",
      "Souligner l'absence d'outils informatiques à l'époque : toute la mémoire était portée par l'opératrice.",
    ],
    gabaritReponse: `I. LE CONTEXTE ÉPISTÉMOLOGIQUE : DE LA SÉLECTION D'APTITUDES À L'ANALYSE DU TRAVAIL
- La psychotechnique des années 1920-1940 : postulat du bon ouvrier à la bonne place.
- La rupture de Suzanne Pacaud : analyser le travail in situ plutôt que mesurer des réflexes en laboratoire.

II. LES 14 DIFFICULTÉS ET LA GESTION DE LA SIMULTANÉITÉ
- Difficultés acoustiques et linguistiques (bruits de salle, débit des usagers).
- Conflit cognitif : écoute continue, manipulation des fiches, mémorisation des services.
- La gestion émotionnelle de l'agressivité des correspondants anonymes.

III. DE LA « FAUTE » À LA « PLASTICITÉ FONCTIONNELLE »
- Pourquoi l'erreur n'est pas une défaillance individuelle mais la conséquence d'un système saturé.
- Les stratégies de régulation : réorganisation des priorités et ruses d'opératrices.
- Héritage pour l'ergonomie du Cnam : le travail réel déborde irréductiblement la prescription.`,
    corrigeModel:
      "SYNTHÈSE DE CORRECTION :\n" +
      "Pacaud est la première à démontrer que le travail manuel répétitif comporte une charge cognitive et mentale intense. Les opératrices ne se contentent pas d'enfoncer des jacks : elles enquêtent, apaisent les usagers, anticipent les congestions de lignes et protègent leur système auditif.\n" +
      "Cette découverte invalide le dogme taylorien selon lequel l'opérateur n'aurait qu'à obéir à une consigne figée. Elle ouvre la voie à la clinique de l'activité d'Yves Clot et à l'ergonomie de l'activité d'Alain Wisner.",
    recommandationExamen:
      "Excellente citation d'ouverture pour tout sujet portant sur la charge mentale, les femmes au travail, ou la distinction prescrit / réel.",
    forumMoodleHint: "Partagez votre note sur Suzanne Pacaud dans le fil d'histoire de PST106.",
  },
  {
    id: "pst106-ad4-harwood",
    moduleKey: "pst106",
    moduleLabel: "PST106",
    moduleColor: "emerald",
    enseignant: "Pr. Christine LAGABRIELLE",
    titre: "AD 4 — L'Expérience de Harwood (Coch & French, 1948) : Résistance au Changement et Dynamique de Groupe dans la Confection de Pyjamas",
    dateSeance: "Séance 3 (28 octobre 2026) — Pr. Christine Lagabrielle",
    dateLimite: "Avant la séance présentielle de régulation",
    dateCorrige: "Séance collective d'analyse de cas",
    typeTravail: "individuel",
    consigne:
      "À partir de l'étude de cas historique menée à la Harwood Manufacturing Corporation par Lester Coch et John French (1948) sous la direction de Kurt Lewin auprès d'ouvrières en confection textile (fabrication de pyjamas) :\n" +
      "1. Analysez les réactions contrastées des trois groupes d'ouvrières face à la modification des méthodes de travail et des cadences : Groupe 1 (changement sans participation, imposé par la hiérarchie), Groupe 2 (participation par représentants élus), Groupe 3 (participation totale directe de toutes les opératrices).\n" +
      "2. Expliquez la chute spectaculaire de productivité, l'agressivité envers la maîtrise et les démissions massives dans le Groupe 1 à la lumière de la théorie du champ de forces de Kurt Lewin et des normes de groupe d'Elton Mayo.\n" +
      "3. Montrez comment la participation directe du Groupe 3 a permis la décristallisation des anciennes normes, l'élaboration d'un nouveau consensus collectif et un dépassement de 14% du niveau antérieur de production.",
    contextePedagogique:
      "Mentionnée explicitement par Pr. Lagabrielle lors de la Séance 3 ('une étude de cas d'application... une fabrication de pyjamas... une expérience faite auprès d'ouvrières'), cette recherche canonique illustre l'articulation entre l'École des relations humaines (Mayo) et la psychologie sociale du changement (Lewin).",
    conceptsCles: [
      "Résistance au changement",
      "Dynamique de groupe (Kurt Lewin)",
      "Champ de forces (forces motrices vs restrictives)",
      "Les 3 étapes du changement (décristallisation, transition, recristallisation)",
      "Normes informelles du groupe (Elton Mayo)",
      "Participation directe vs imposition autoritaire",
      "Climat démocratique vs climat autocratique",
    ],
    auteursAttendus: [
      "Lester Coch & John French (1948, 'Overcoming Resistance to Change')",
      "Kurt Lewin (1943, 1947, dynamique des groupes et champ de forces)",
      "Elton Mayo (1945, expériences de Hawthorne et normes informelles)",
    ],
    pointsVigilance: [
      "Ne pas attribuer la baisse de productivité à une mauvaise volonté individuelle : c'est une réaction défensive collective du groupe face à une menace d'insécurité statutaire et financière.",
      "Souligner que la participation ne consiste pas en une manipulation superficielle : dans le Groupe 3, les ouvrières ont réellement co-conçu les postes et les nouvelles méthodes.",
    ],
    gabaritReponse: `I. DISPOSITIF EXPÉRIMENTAL ET COMPARAISON DES 3 MODALITÉS
- Groupe 1 (Contrôle / Autoritaire) : les nouvelles cadences et méthodes sont expliquées unilatéralement par le chronométreur.
- Groupe 2 (Démocratie représentative) : élection de déléguées formées qui transmettent aux collègues.
- Groupe 3 (Participation totale directe) : toutes les opératrices débattent des aménagements, chronomètrent et testent les nouveaux postes.

II. ANALYSE CLINIQUE ET PSYCHOSOCIALE DES RÉSULTATS
- Groupe 1 : effondrement de la productivité (de 60 à 50 unités/heure), conflit aigu avec les chefs, 17% de démissions en 40 jours (norme de résistance collective).
- Groupe 3 : reprise immédiate, dépassement de l'ancienne norme dès le 2e jour pour atteindre 70 unités/heure sans démission.

III. LES ENSEIGNEMENTS POUR LE PSYCHOLOGUE DU TRAVAIL
- L'imposition unilatérale renforce les forces restrictives (peur de l'échec, sentiment de déqualification).
- La participation active permet la décristallisation (unfreezing) de l'ancienne norme et la reconstruction d'une nouvelle norme collective partagée (refreezing).`,
    corrigeModel:
      "CORRIGÉ TYPE D'EXAMEN :\n" +
      "L'expérience de Harwood confirme de manière expérimentale les thèses de Kurt Lewin et d'Elton Mayo :\n" +
      "1. La résistance au changement n'est pas un trait de personnalité individuel, mais l'expression d'un champ de forces où les forces restrictives (crainte de la baisse de salaire, perte de repères, sentiment d'arbitraire hiérarchique) bloquent toute évolution si le management se contente d'augmenter la contrainte (style autocratique).\n" +
      "2. Dans le Groupe 1, le groupe d'ouvrières réactive une norme informelle restrictive de solidarité défensive : ralentir le travail pour prouver que la nouvelle méthode est mauvaise.\n" +
      "3. Dans le Groupe 3, la participation directe transforme la dynamique : le changement devient l'œuvre des ouvrières elles-mêmes. La recristallisation s'opère sur un standard de production supérieur, dans un climat relationnel apaisé.\n" +
      "Cet exercice illustre à merveille l'adage de Pr. Lagabrielle : 'On ne motive pas les personnes de l'extérieur, on crée des conditions participatives et démocratiques qui leur permettent de s'engager.'",
    recommandationExamen:
      "À mobiliser absolument dans toute dissertation portant sur la conduite du changement, les styles de direction (Lewin) ou l'échec des réorganisations technologiques imposées du haut vers le bas.",
    forumMoodleHint: "Partagez votre synthèse sur l'étude de cas des pyjamas dans l'espace AD de la Séance 3.",
  }
];


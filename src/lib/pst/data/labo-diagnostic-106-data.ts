export interface SituationMetier106 {
  id: string;
  titre: string;
  secteur: string;
  descriptionPrescrite: string;
  conditionsInternes: string[];
  conditionsExternes: string[];
  compromisOperatoires: string[];
  effetsOperateur: string[];
  effetsSysteme: string[];
  diagnosticClot: {
    statutActivite: "réalisée" | "contrariée" | "suspendue" | "empêchée";
    etatGenre: "vivant" | "affaibli" | "mortifère";
    explicationClinique: string;
    stylePossible: string;
  };
  protocoleRecommande: {
    etape1: string;
    etape2: string;
    dispositifCle: string;
    justificationExamen: string;
  };
}

export const SITUATIONS_METIER_106: SituationMetier106[] = [
  {
    id: "teleconseiller",
    titre: "Téléconseiller en Centre d'Appels « Urgences Mutuelle »",
    secteur: "Services / Santé",
    descriptionPrescrite:
      "DMT (Durée Moyenne de Traitement) imposée : max 180 secondes par appel. Script téléphonique rigide à suivre au mot près. Note de satisfaction client visée : 4.8/5.",
    conditionsInternes: [
      "Fatigue vocale et auditive en fin de journée",
      "Empathie naturelle heurtée par le chronomètre",
      "Peur de l'évaluation mensuelle individuelle",
    ],
    conditionsExternes: [
      "Double écran avec logiciel de ticketing lent (latence de 4s)",
      "Bruit ambiant du plateau téléphonique (open space 50 pers.)",
      "Usagers souvent en situation de détresse financière ou médicale",
    ],
    compromisOperatoires: [
      "Raccourcir les salutations pour taper les notes pendant que l'usager parle",
      "Écrire des abréviations non homologuées dans le CRM pour gagner 20 secondes",
      "Rassurer l'usager tout en coupant le micro pour souffler (bricolage gestuel)",
    ],
    effetsOperateur: [
      "Souffrance éthique : sentiment de 'bâcler' des personnes vulnérables",
      "Tension permanente, céphalées et troubles musculosquelettiques cervicaux",
      "Démotivation progressive et absentéisme du lundi",
    ],
    effetsSysteme: [
      "Taux de réitération des appels de 28% (dossiers mal clôturés dans l'urgence)",
      "Turnover annuel de 45% chez les opérateurs",
      "Dégradation progressive de l'image de marque de la mutuelle",
    ],
    diagnosticClot: {
      statutActivite: "contrariée",
      etatGenre: "affaibli",
      explicationClinique:
        "L'activité est contrariée : l'opérateur a le souci du travail bien fait et de l'écoute, mais le carcan gestionnaire (DMT de 3 min) lui interdit d'exercer son métier dignement. Le genre professionnel est appauvri car les astuces informelles ne sont pas mises en délibération collective.",
      stylePossible:
        "Le style individuel est étouffé par l'algorithme d'écoute et les grilles de double écoute hiérarchique.",
    },
    protocoleRecommande: {
      etape1:
        "Analyse ergonomique du travail : observation systématique des interactions voix/écran et chronométrage réel des temps de réponse informatique.",
      etape2:
        "Dispositif d'auto-confrontation simple puis croisée sur des séquences d'appels conflictuels.",
      dispositifCle:
        "Mise en débat collectif des critères de la 'qualité du service' entre opérateurs, superviseurs et direction.",
      justificationExamen:
        "Permet de déplacer le problème d'une faute individuelle de cadence vers une incohérence du système de prescription.",
    },
  },
  {
    id: "cariste",
    titre: "Préparateur de Commandes sous Guidage Vocal (Logistique Lean)",
    secteur: "Grande Distribution / Logistique",
    descriptionPrescrite:
      "Casque audio transmettant les consignes d'allée et de colisage à la seconde. Validation par mot-clé ('0-4-2'). Vitesse minimale imposée : 140 colis/heure.",
    conditionsInternes: [
      "Charge mentale continue liée à la voix robotique dans l'oreille",
      "Douleurs lombaires et plantaires (18 km de marche quotidienne)",
      "Perte de repères temporels (rythme dicté par la machine)",
    ],
    conditionsExternes: [
      "Allées encombrées par les palettes des transporteurs",
      "Emballages fragiles ou mal étiquetés par les fournisseurs",
      "Éclairage zénithal aveuglant dans certains rayons hauts",
    ],
    compromisOperatoires: [
      "Porter deux colis à la fois pour économiser un aller-retour (sur-sollicitation biomécanique)",
      "Mémoriser l'ordre des 3 prochains emplacements pour anticiper le chariot",
      "Désactiver temporairement le bip de sécurité pour manœuvrer plus vite",
    ],
    effetsOperateur: [
      "TMS précoces des membres supérieurs et lombalgies chroniques",
      "Sentiment d'aliénation : 'être devenu le bras d'un ordinateur'",
      "Isolement sensoriel : impossibilité d'échanger avec les collègues croisés",
    ],
    effetsSysteme: [
      "Casse de marchandises en hausse de 18% lors des pics de cadence",
      "Accidents du travail fréquents (chutes de plain-pied, collisions)",
      "Coût élevé de formation des intérimaires remplaçants",
    ],
    diagnosticClot: {
      statutActivite: "empêchée",
      etatGenre: "mortifère",
      explicationClinique:
        "L'activité est empêchée et le genre professionnel est réduit à néant. L'isolement auditif permanent détruit toute possibilité de construction d'une mémoire collective du métier. Les défenses deviennent mortifères car le salarié sacrifie sa santé physique pour tenir la cadence prescrite.",
      stylePossible:
        "Aucun style personnel toléré : toute variabilité dans la trajectoire est détectée comme une sous-productivité.",
    },
    protocoleRecommande: {
      etape1:
        "Instruction au Sosie (Oddone) : faire verbaliser aux caristes experts les stratégies invisibles d'évitement des accidents dans les allées.",
      etape2:
        "Auto-confrontation croisée sur des manœuvres de chargement à risque.",
      dispositifCle:
        "Suppression du guidage vocal au profit d'écrans embarqués sur chariots et rétablissement des zones de concertation d'équipe.",
      justificationExamen:
        "Démontre que l'automatisation sans marge de régulation cognitive détruit le collectif et génère des TMS massifs.",
    },
  },
  {
    id: "aide-soignante",
    titre: "Aide-Soignante en EHPAD en Sous-Effectif",
    secteur: "Santé / Gérontologie",
    descriptionPrescrite:
      "Protocole de soins : 12 toilettes et habillages complets à réaliser en 3h30 (soit ~17 minutes par résident dépendant, aide au lever et transmission comprises).",
    conditionsInternes: [
      "Épuisement émotionnel face à la fin de vie et à la démence",
      "Attachement affectif aux résidents en contradiction avec la vitesse imposée",
      "Sentiment de culpabilité d'accélérer les gestes de toilette",
    ],
    conditionsExternes: [
      "Résidents désorientés refusant les soins ou agressifs dans la panique",
      "Matériel de transfert (lève-malade) partagé entre 3 couloirs distants",
      "Absence fréquente d'une collègue non remplacée (charge doublée)",
    ],
    compromisOperatoires: [
      "Faire les transferts au lit seule au lieu d'être à deux pour ne pas déranger la collègue",
      "Réduire la toilette à la petite toilette intime les jours de grand manque d'effectif",
      "Parler doucement et chanter pour apaiser le résident pendant un geste rapide",
    ],
    effetsOperateur: [
      "Souffrance éthique aiguë : 'maltraitance institutionnelle involontaire'",
      "Lombalgies sévères dues aux transferts individuels sans assistance mécanique",
      "Départs en burn-out et reconversions forcées hors du médico-social",
    ],
    effetsSysteme: [
      "Escarres et chutes de résidents en augmentation",
      "Tensions et agressivité exacerbée au sein de l'équipe soignante",
      "Plaintes des familles sur le manque d'attention humaine",
    ],
    diagnosticClot: {
      statutActivite: "contrariée",
      etatGenre: "affaibli",
      explicationClinique:
        "L'activité contrariée atteint ici le seuil critique de la souffrance éthique (Dejours/Clot). Le genre soignant historique (soin relationnel, respect de la pudeur) est broyé par la cadence fordiste des soins minutés. Le pouvoir d'agir est amputé.",
      stylePossible:
        "Les soignantes tentent de préserver un style (humour, chansons, douceur vocale) pour masquer la brutalité de la cadence imposée.",
    },
    protocoleRecommande: {
      etape1:
        "Chronobiologie et analyse de l'activité réelle de manutention et d'écoute au chevet du patient.",
      etape2:
        "Groupe d'auto-confrontation croisée sur la question du 'soin empêché'.",
      dispositifCle:
        "Refonte collective des tournées de soins avec la direction et négociation d'un ratio soignant/résident conforme au réel.",
      justificationExamen:
        "Illustre parfaitement l'articulation entre ergonomie physique (manutention) et clinique du travail (souffrance éthique).",
    },
  },
];

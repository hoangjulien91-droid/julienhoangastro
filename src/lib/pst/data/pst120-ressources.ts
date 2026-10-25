/**
 * PST120 — Psychopathologie et psychodynamique du travail
 * Corpus de référence & Textes canoniques des enseignants
 */

export interface Pst120OfficialResource {
  id: string;
  category:
    | "precurseurs"
    | "dejours"
    | "molinier"
    | "clinique_souffrance"
    | "sante_normative";
  categoryLabel: string;
  authorFilter:
    | "Christophe Dejours"
    | "Pascale Molinier"
    | "Louis Le Guillant"
    | "Georges Canguilhem"
    | "Marie Pezé"
    | "Claude Veil";
  title: string;
  authors: string;
  year: string;
  sourceOrPublisher: string;
  seanceNumber: string;
  description: string;
  keyTakeaway: string;
  apa7Citation: string;
  tags: string[];
  url?: string;
}

export const PST120_OFFICIAL_RESOURCES: Pst120OfficialResource[] = [
  {
    id: "res-dejours-usure-mentale",
    category: "dejours",
    categoryLabel: "Ouvrage Fondateur",
    authorFilter: "Christophe Dejours",
    title: "Travail, usure mentale : De la psychopathologie à la psychodynamique du travail",
    authors: "Christophe Dejours",
    year: "1980 / 2000",
    sourceOrPublisher: "Bayard Éditions (Collection Essais)",
    seanceNumber: "Séances 2 à 4",
    description:
      "L'acte de naissance de la psychodynamique du travail. Démontre la normalité souffrante : si la majorité des travailleurs ne tombent pas dans la décompensation psychiatrique, c'est grâce aux stratégies collectives de défense (virilisme ouvrier, déni partagé du danger, dérision). Analyse de la dynamique de reconnaissance (jugement d'utilité et de beauté) permettant la sublimation de la souffrance.",
    keyTakeaway:
      "Thèse d'examen capitale : la santé mentale au travail n'est pas l'absence de conflit ou d'agression, mais la capacité du sujet à transformer la souffrance en plaisir par la sublimation et la reconnaissance des pairs.",
    apa7Citation:
      "Dejours, C. (2000). Travail, usure mentale : De la psychopathologie à la psychodynamique du travail (Nouv. éd.). Bayard.",
    tags: ["Dejours", "Usure mentale", "Stratégies collectives de défense", "Sublimation", "Reconnaissance"],
  },
  {
    id: "res-leguillant-bonne-a-tout-faire",
    category: "precurseurs",
    categoryLabel: "Clinique Situationnelle Pionnière",
    authorFilter: "Louis Le Guillant",
    title: "La névrose des téléphonistes et la condition des « bonnes à tout faire » (Affaire Papin)",
    authors: "Louis Le Guillant",
    year: "1953 / 1956",
    sourceOrPublisher: "Revue Pratique de Psychologie de la Vie Sociale",
    seanceNumber: "Séance 1",
    description:
      "Études cliniques fondatrices de Louis Le Guillant montrant que les symptômes psychiatriques (asthénie, anxiété, délires) ne sont pas des faiblesses individuelles innées mais la conséquence directe de situations de travail dégradantes. Analyse criminologique et clinique du double meurtre des sœurs Papin (1933) comme l'explosion paranoïaque d'un rapport de domesticité totalitaire, sans espace tiers ni collectif protecteur.",
    keyTakeaway:
      "À citer pour situer la filiation historique : Le Guillant prouve dès les années 1950 la nature pathogène des situations d'isolement social et de domesticité asymétrique.",
    apa7Citation:
      "Le Guillant, L. (1956). L’affaire des sœurs Papin : La névrose de la « bonne à tout faire ». Revue Pratique de Psychologie de la Vie Sociale, 4, 12–28.",
    tags: ["Le Guillant", "Bonne à tout faire", "Sœurs Papin", "Téléphonistes", "Névrose situationnelle"],
  },
  {
    id: "res-molinier-care-souffrance",
    category: "molinier",
    categoryLabel: "Psychodynamique & Genre",
    authorFilter: "Pascale Molinier",
    title: "L'énigme de la femme active : Égoïsme, sexe et compassion (Le travail du Care)",
    authors: "Pascale Molinier",
    year: "2003 / 2006",
    sourceOrPublisher: "Éditions Payot / La Découverte",
    seanceNumber: "Séance 5",
    description:
      "Étude des métiers du care, de la santé et du médico-social. Pascale Molinier explore la psychodynamique spécifique des soignantes : les défenses ne sont pas viriles ou cyniques, mais reposent sur une idéologie défensive de la compassion et du sacrifice, souvent instrumentalisée par les directions pour imposer le surtravail sans rémunération correspondante.",
    keyTakeaway:
      "Permet de contraster les défenses masculines traditionnelles (BTP, usine) avec les défenses féminines du 'care' dans les hôpitaux et EHPAD.",
    apa7Citation:
      "Molinier, P. (2006). L’énigme de la femme active : Égoïsme, sexe et compassion. Payot.",
    tags: ["Molinier", "Care", "Idéologie défensive", "Genre", "Santé", "EHPAD"],
  },
  {
    id: "res-canguilhem-normal-pathologique",
    category: "sante_normative",
    categoryLabel: "Épistémologie Médicale & Santé",
    authorFilter: "Georges Canguilhem",
    title: "Le normal et le pathologique — La santé comme pouvoir normatif",
    authors: "Georges Canguilhem",
    year: "1966 / 2013",
    sourceOrPublisher: "Presses Universitaires de France (Quadrige)",
    seanceNumber: "Séances 1 & 6",
    description:
      "L'ouvrage philosophique clé sur le concept de santé. La santé n'est pas le respect passif d'une moyenne statistique ou d'un protocole figé : c'est la capacité normative du vivant d'instaurer de nouvelles normes face aux agressions et variations de son milieu. Être malade, c'est être réduit à une seule norme et perdre la capacité d'en tolérer les écarts.",
    keyTakeaway:
      "Verbatim indispensable en PST120 et PST106 : 'La santé, c'est le pouvoir de tomber malade et de s'en relever, c'est une marge de tolérance par rapport aux infidélités du milieu'.",
    apa7Citation:
      "Canguilhem, G. (1966). Le normal et le pathologique. Presses Universitaires de France.",
    tags: ["Canguilhem", "Normativité", "Santé", "Pathologique", "Milieu", "Épistémologie"],
  },
  {
    id: "res-peze-burnout-harcelement",
    category: "clinique_souffrance",
    categoryLabel: "Clinique Médicale & Consultations Souffrance au Travail",
    authorFilter: "Marie Pezé",
    title: "Ils ne mourraient pas tous mais tous étaient frappés : Le burn-out et la fabrique de la soumission",
    authors: "Marie Pezé",
    year: "2008 / 2018",
    sourceOrPublisher: "Pearson / Éditions Flammarion",
    seanceNumber: "Séance 6",
    description:
      "Témoignage et analyse clinique de la première consultation de souffrance au travail en France (Centre hospitalier de Nanterre). Analyse précise du syndrome d'épuisement professionnel (burn-out), des effondrements anxio-dépressifs et des mécanismes de placardisation managériale.",
    keyTakeaway:
      "Offre une vision clinique et médicale concrète des manifestations somatiques et psychiques de la rupture du pacte de travail.",
    apa7Citation:
      "Pezé, M. (2008). Ils ne mourraient pas tous mais tous étaient frappés : Journal d’une docteure du travail. Pearson.",
    tags: ["Marie Pezé", "Burn-out", "Consultation souffrance", "Nanterre", "Épuisement"],
  },
];

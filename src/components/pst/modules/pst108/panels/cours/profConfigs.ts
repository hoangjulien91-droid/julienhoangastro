import { Users, Building2, GraduationCap } from "lucide-react";

export type ProfKey = "marot" | "valls" | "lucy" | "all";

export interface ProfConfig {
  key: ProfKey;
  nom: string;
  titreCourt: string;
  role: string;
  volumeHoraire: string;
  themeGeneral: string;
  moodleUrl: string;
  moodleSection: string;
  filConducteur: string;
  notionsCles: string[];
  colorBorder: string;
  colorBg: string;
  colorText: string;
  icon: typeof Users;
}

export const PROF_CONFIGS: Record<"marot" | "valls" | "lucy", ProfConfig> = {
  marot: {
    key: "marot",
    nom: "Mme Véronique MAROT",
    titreCourt: "Sciences du langage & Clinique",
    role: "Enseignante-chercheuse, spécialiste du langage et du développement",
    volumeHoraire: "Volume officiel : 17 Heures (Webconférences & AD 04/11 & 10/11)",
    themeGeneral: "Sciences du langage, Théories de l'acquisition (Vygotski vs Piaget), Dialogisme (Bakhtine) & Dispositifs cliniques (Sosie, Autoconfrontation)",
    moodleUrl: "https://naq.moodle.lecnam.net/course/view.php?id=8822&sectionid=68135",
    moodleSection: "Section Moodle 68135",
    filConducteur:
      "Le langage est d'emblée social et constitue un instrument psychologique d'action. De l'inversion vygotskienne (l'apprentissage tire le développement) et des racines psychanalytiques (Golse & Freud) aux dispositifs cliniques de terrain (Oddone, Cahour, Clot) et à l'approche psychosociale (Lewin, défenses de la mémoire, Razran 1950, Porter).",
    notionsCles: [
      "Vygotski vs Piaget (ZPD & Primat du social)",
      "Freud (Jeu de la bobine / Fort-Da) & Golse",
      "Dispositifs : Sosie, Autoconfrontation simple & croisée",
      "Bakhtine (Destinataire, Sub-destinataire, Sur-destinataire)",
      "Psychosociologie : Lewin, Scotomisation & Razran (1950)",
      "Grille de Porter (Écoute compréhensive) & Proxémique en angle",
      "Yvon Miossec (2019) : Le travail sur le travail & controverse réglée",
    ],
    colorBorder: "border-rose-500/30",
    colorBg: "bg-rose-500/10",
    colorText: "text-rose-700 dark:text-rose-400",
    icon: Users,
  },
  valls: {
    key: "valls",
    nom: "M. Francis VALLS",
    titreCourt: "Psychosociale & Méthode IOD",
    role: "Maître de conférences, praticien de l'insertion et concepteur de la méthode IOD avec Denis Castra",
    volumeHoraire: "Volume officiel : Cours magistraux, TD & Exercices distanciel",
    themeGeneral: "Approche psychosociale de la communication, Contrat de communication (Ghiglione), Dominique Wolton & Méthode IOD sans tri préalable",
    moodleUrl: "https://naq.moodle.lecnam.net/course/view.php?id=8822&sectionid=68130",
    moodleSection: "Section Moodle 68130",
    filConducteur:
      "La communication au travail est régie par un contrat psychosocial tacite (Ghiglione). Le récepteur n'est jamais passif : il négocie et produit de l'incommunication (Wolton). Dans le champ de l'emploi, rupture avec la sélection par l'employabilité au profit de la négociation directe sur les contraintes du poste réel (Méthode IOD).",
    notionsCles: [
      "Contrat de communication (Rodolphe Ghiglione 1986)",
      "Dominique Wolton (Incommunication, Récepteur actif & Négociation)",
      "Shannon & Weaver vs Norbert Wiener (Cybernétique & Rétroaction)",
      "Robert L. Kahn (1958) : Tensions de rôles & Rôle transmis vs perçu",
      "4 Cas cliniques : Berlinguer, Dallas 1984 911 Garfinkel, CMS Mme U, Fûts bosselés",
      "Méthode IOD (Denis Castra & Francis Valls) : Insertion sans tri préalable",
      "Évaluation des pratiques en travail social (SAVPJJ)",
    ],
    colorBorder: "border-emerald-500/30",
    colorBg: "bg-emerald-500/10",
    colorText: "text-emerald-700 dark:text-emerald-400",
    icon: Building2,
  },
  lucy: {
    key: "lucy",
    nom: "M. Éric LUCY",
    titreCourt: "Théorie critique & Délibération",
    role: "Sociologue et linguiste de terrain, spécialiste de la pragmatique et de l'exclusion",
    volumeHoraire: "Volume officiel : CM & Séminaires de recherche clinique",
    themeGeneral: "Pouvoir symbolique (Bourdieu), Agir communicationnel (Habermas), Théorie de la reconnaissance (Honneth) & Enquête SAMU Social",
    moodleUrl: "https://naq.moodle.lecnam.net/course/view.php?id=8822&sectionid=68124",
    moodleSection: "Section Moodle 68124 (26 documents ressources)",
    filConducteur:
      "La parole n'est pas magique : son efficacité performative dépend exclusivement du pouvoir délégué par l'institution (Bourdieu contre Austin). Pour déjouer l'agir stratégique et le mépris, l'organisation doit instaurer l'éthique de la discussion (Habermas) et garantir la reconnaissance mutuelle dans ses trois sphères morales (Honneth).",
    notionsCles: [
      "Séance 2 (Lucy) : Les 5 Actes de langage de Searle (Assertif, Directif, Promissif, Expressif, Déclaratif)",
      "Performatif & Conditions de félicité (Austin 1962, Cassin 2018, Status est magistratus)",
      "Sémiotique du signe : Stoïciens (Lekton), Port-Royal (Prédicats) & Saussure (Axe syntagmatique vs paradigmatique)",
      "Neuropsychologie & Clinique du travail : Aphasies Broca/Wernicke vs souffrance au travail & Ritournelle (Deleuze)",
      "Pierre Bourdieu : Marché linguistique, Capital symbolique & Lit de justice",
      "Critique d'Austin : Les conditions sociales de la performativité",
      "Jürgen Habermas : Agir communicationnel vs Agir stratégique (4 prétentions à la validité)",
      "Axel Honneth : 3 sphères de reconnaissance (Affective, Juridique, Sociale) & Mépris au travail",
      "Éric Lucy : L'insulte performative (2021) & Enquête clinique en SAMU Social (2020)",
      "Masterclass Bruegel (1563) : La Tour de Babel et le risque permanent de la mésentente",
    ],
    colorBorder: "border-indigo-500/30",
    colorBg: "bg-indigo-500/10",
    colorText: "text-indigo-700 dark:text-indigo-400",
    icon: GraduationCap,
  },
};

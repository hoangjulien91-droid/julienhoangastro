import React from "react";
import type { DebatAxis } from "@/components/pst/modules/shared/panels/Debats";
import type {
  BonusAuthorCard,
  BonusQuestion,
} from "@/components/pst/modules/shared/panels/Bonus";

export const FICHE_FILTERS = [
  { key: "all", label: "Toutes les fiches (44)" },
  {
    key: "vygotski_piaget",
    label: "1. Vygotski, Piaget & Golse (Théories du langage & Clinique)",
  },
  {
    key: "bourdieu",
    label: "2. Pierre Bourdieu & Éric Lucy (Pouvoir & Insulte)",
  },
  {
    key: "habermas",
    label: "3. Jürgen Habermas (Agir communicationnel & Délibération)",
  },
  { key: "honneth", label: "4. Axel Honneth & SAMU Social (Reconnaissance)" },
  {
    key: "valls_communication",
    label: "5. Valls & Marot (Ghiglione, Garfinkel, Goffman, Psychosociologie)",
  },
  { key: "valls_iod", label: "6. Francis Valls & Denis Castra (Méthode IOD)" },
  {
    key: "linguistique",
    label: "7. Posture Cnam, Langage & Travail & Pragmatique",
  },
];

export const LEXIQUE_FILTERS = [
  { key: "all", label: "Tout le lexique" },
  { key: "vygotski_piaget", label: "Vygotski, Piaget & Golse" },
  { key: "bourdieu", label: "Bourdieu & Insulte" },
  { key: "habermas", label: "Habermas & Délibération" },
  { key: "honneth", label: "Honneth & SAMU" },
  { key: "valls_communication", label: "Goffman, Abric & Interaction" },
  { key: "valls_iod", label: "Valls (IOD)" },
  { key: "linguistique", label: "Langage, Travail & Pragmatique" },
];

export const CARD_AXES = [
  "vygotski_piaget",
  "bourdieu",
  "habermas",
  "honneth",
  "valls_communication",
  "valls_iod",
  "linguistique",
];

export const RECITS_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "vygotski_piaget", label: "Vygotski & Développement" },
  { key: "bourdieu", label: "Pouvoir & Insulte" },
  { key: "habermas", label: "Espace délibératif" },
  { key: "honneth", label: "Reconnaissance (SAMU)" },
  { key: "valls_iod", label: "Négociation IOD" },
  { key: "linguistique", label: "Pragmatique" },
];

export const RECITS_COLORS: Record<string, string> = {
  vygotski_piaget: "var(--vygotski_piaget)",
  bourdieu: "var(--bourdieu)",
  habermas: "var(--habermas)",
  honneth: "var(--honneth)",
  valls_iod: "var(--valls_iod)",
  linguistique: "var(--linguistique)",
};

export const PST108_BONUS_QUESTIONS: BonusQuestion[] = [
  {
    q: "Dans l'analyse du « Lit de justice » par Sarah Hanley (citée par Bourdieu), pourquoi le roi s'exprime-t-il en présence du Parlement ?",
    opts: [
      "Pour engager un débat démocratique et recueillir les contre-propositions des magistrats",
      "Pour suspendre la délégation d'autorité et faire plier le Parlement par sa seule présence royale (acte d'institution)",
      "Pour demander l'avis juridique des avocats parisiens",
    ],
    ok: 1,
    expl: "Le lit de justice incarne le cérémonial du pouvoir absolu : le corps du roi annule toute contestation et impose l'enregistrement forcé des édits.",
  },
  {
    q: "Pourquoi le sociologue Robert Castel a-t-il préfacé l'ouvrage de Denis Castra et Francis Valls sur la Méthode IOD ?",
    opts: [
      "Parce qu'il considère que les chômeurs de longue durée doivent être isolés en centres de réadaptation",
      "Parce que la méthode IOD combat la désaffiliation en intégrant directement les personnes sans tri préalable dans le travail ordinaire",
      "Parce qu'il préconise la suppression pure et simple du salariat",
    ],
    ok: 1,
    expl: "Pour Robert Castel, l'accès à un emploi ordinaire négocié est la condition sine qua non de la citoyenneté sociale et de la protection contre l'exclusion.",
  },
  {
    q: "Selon l'hypothèse d'Edward Sapir et Benjamin Lee Whorf (relativisme linguistique) :",
    opts: [
      "Toutes les langues humaines partagent exactement le même vocabulaire professionnel",
      "La langue façonne les schèmes cognitifs et influence la perception du réel chez ses locuteurs",
      "Le langage n'a aucun lien avec la culture ni avec les pratiques sociales",
    ],
    ok: 1,
    expl: "Sapir-Whorf montre que les catégories de la langue prédéterminent en partie la façon dont les sujets pensent le travail et catégorisent le réel.",
  },
  {
    q: "Quelle différence fondamentale Noam Chomsky établit-il entre « compétence » et « performance » ?",
    opts: [
      "La compétence est le salaire horaire et la performance est le chiffre d'affaires",
      "La compétence est le système abstrait inné de règles grammaticales, la performance est l'usage concret situé de la parole",
      "La compétence n'existe que chez les cadres et la performance chez les ouvriers",
    ],
    ok: 1,
    expl: "Chomsky distingue la compétence linguistique idéale (générative) des performances réelles (souvent critiquée par Bourdieu pour son oubli du social).",
  },
];

export const PST108_BONUS_AUTHORS: BonusAuthorCard[] = [
  {
    title: "Sarah Hanley — Le Lit de justice des rois de France",
    color: "var(--bourdieu)",
    body: (
      <>
        Historienne américaine montrant comment le cérémonial du{" "}
        <i>Lit de justice</i>
        &nbsp;met en scène l&apos;efficacité symbolique de l&apos;État : quand
        le roi siège en majesté, la délibération parlementaire s&apos;éteint
        devant l&apos;institution incarnée.
        <br />
        <i>Où l&apos;utiliser :</i> En dissertation sur Bourdieu pour illustrer
        comment l&apos;autorité statutaire confère aux énoncés leur force
        irrésistible (<i>Status est magistratus</i>).
      </>
    ),
  },
  {
    title: "Robert Castel — Désaffiliation & Droit commun (Préfacier IOD)",
    color: "var(--valls_iod)",
    body: (
      <>
        Théoricien de la société salariale et de la <i>désaffiliation</i>. Il
        préface Denis Castra et Francis Valls (
        <i>L&apos;insertion malgré tout</i>, 2007) en saluant le refus du tri
        des précaires et l&apos;action sur les milieux de travail réels.
        <br />
        <i>Où l&apos;utiliser :</i> Pour justifier sociologiquement la méthode
        IOD : l&apos;insertion n&apos;est pas une mise aux normes psychologiques
        de l&apos;individu, mais une réinsertion dans le droit commun du
        travail.
      </>
    ),
  },
  {
    title: "Edward Sapir & Benjamin Lee Whorf — Le Relativisme linguistique",
    color: "var(--linguistique)",
    body: (
      <>
        L&apos;hypothèse Sapir-Whorf démontre que le langage n&apos;est pas un
        simple reflet de la réalité : sa grammaire et ses catégories structurent
        la manière dont les locuteurs expérimentent et découpent le monde.
        <br />
        <i>Où l&apos;utiliser :</i> Pour appuyer l&apos;analyse
        ethnolinguistique des jargons de métier et des vocabulaires
        organisationnels imposés.
      </>
    ),
  },
  {
    title: "Noam Chomsky — Compétence vs Performance linguistique",
    color: "var(--habermas)",
    body: (
      <>
        Fonde la linguistique générative : la <i>compétence</i> est la maîtrise
        innée d&apos;un système universel de règles formelles, alors que la{" "}
        <i>performance</i> est son actualisation contingente.
        <br />
        <i>Où l&apos;utiliser :</i> Pour opposer la conception internaliste
        universelle de Chomsky à la <i>compétence légitime</i> socialement
        située démontrée par Bourdieu.
      </>
    ),
  },
];

export const PST108_DEBATS: DebatAxis[] = [
  {
    axis: "Axe 1 — Bourdieu vs Austin",
    title:
      "Pouvoir des mots ou pouvoir des institutions ? (Status est magistratus)",
    tension:
      "John Austin analyse le performatif comme une propriété interne du langage (« quand dire, c'est faire »). Pierre Bourdieu opère une rupture sociologique majeure : les mots ne tirent pas leur pouvoir de la langue ou de la grammaire, mais du mandat institutionnel et des rapports de pouvoir sociaux délégués au locuteur.",
    example:
      "Analyser l'insulte au travail (Éric Lucy, 2021) : elle ne blesse pas par sa sonorité lexicale, mais parce qu'elle actualise un rapport social de domination et un stigmate historique déjà institué.",
    exampleColor: "var(--bourdieu)",
  },
  {
    axis: "Axe 2 — Habermas : Théorie de l'agir",
    title:
      "Agir stratégique (succès & manipulation) vs Agir communicationnel (entente rationnelle)",
    tension:
      "Dans l'agir stratégique, la communication est instrumentalisée pour influencer, séduire ou contraindre autrui à des fins de rentabilité. Dans l'agir communicationnel, les acteurs recherchent une entente coopérative libre (Verständigung) en soumettant leurs arguments aux 4 prétentions à la validité.",
    example:
      "Opposer une rhétorique managériale descendante (agir stratégique masqué) à un véritable espace de controverse délibérative où salariés et encadrants évaluent la justesse et la vérité des règles de travail.",
    exampleColor: "var(--habermas)",
  },
  {
    axis: "Axe 3 — Axel Honneth : Reconnaissance morale",
    title:
      "Les 3 sphères de reconnaissance vs La réification comme oubli d'autrui",
    tension:
      "La dignité et la santé au travail reposent sur l'estime sociale et la reconnaissance de l'utilité du métier. La réification organisationnelle (Honneth, 2007) n'est pas une simple erreur de gestion : c'est un oubli actif de la reconnaissance originaire, réduisant le salarié à une ressource chiffrée.",
    example:
      "L'analyse par Éric Lucy (2020) des maraudes du SAMU social : l'échange verbal redonne au grand exclu son statut de sujet de droit et d'interlocution face à l'invisibilisation sociale.",
    exampleColor: "var(--honneth)",
  },
  {
    axis: "Axe 4 — Francis Valls & Denis Castra",
    title:
      "Idéologie de l'employabilité préalable vs Méthode IOD (intervention directe sans tri)",
    tension:
      "L'idéologie de l'employabilité culpabilise le chômeur en lui imputant un déficit de compétences et en multipliant les stages préparatoires sélectifs. La Méthode IOD (Castra & Valls) renverse cette logique : refus déontologique du tri préalable et négociation directe avec l'entreprise sur le travail réel.",
    example:
      "Montrer qu'un chargé de mission IOD n'évalue pas la personne mais les conditions concrètes du poste de travail pour adapter l'environnement organisationnel à l'intégration durable.",
    exampleColor: "var(--valls_iod)",
  },
];

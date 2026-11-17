import type { DebatAxis } from "@/components/pst/modules/shared/panels/Debats";
import type {
  BonusAuthorCard,
  BonusQuestion,
} from "@/components/pst/modules/shared/panels/Bonus";
import { getExamDateTime, getExamLabel } from "@/lib/pst/planning-stats";

export const FICHE_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "precurseurs", label: "Précurseurs" },
  { key: "dejours", label: "Dejours (Psychodynamique)" },
  { key: "molinier", label: "Molinier (Genre & Care)" },
  { key: "management", label: "Management & Risques" },
];

export const LEXIQUE_FILTERS = [
  { key: "all", label: "Tout" },
  { key: "dejours", label: "Dejours" },
  { key: "molinier", label: "Molinier" },
  { key: "precurseurs", label: "Précurseurs" },
  { key: "management", label: "Management" },
];

export const RECITS_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "precurseurs", label: "Précurseurs" },
  { key: "dejours", label: "Dejours" },
  { key: "molinier", label: "Molinier" },
  { key: "management", label: "Management" },
];

export const RECITS_COLORS: Record<string, string> = {
  precurseurs: "var(--precurseurs)",
  dejours: "var(--dejours)",
  molinier: "var(--molinier)",
  management: "var(--management)",
};

export const CARD_AXES = ["precurseurs", "dejours", "molinier", "management"];

export const EXAM_DATE = getExamDateTime("pst120") ?? "";
export const EXAM_LABEL = getExamLabel("pst120") ?? "";

export const PST120_DEBATS: DebatAxis[] = [
  {
    axis: "Axe 1 — Genre et Virilité",
    title: "Idéologies Viriles (Dejours) vs Révélation du Care (Molinier)",
    tension:
      "Dejours analyse les stratégies défensives collectives (notamment dans le travail ouvrier/physique) basées sur le déni du danger, la virilité et le dépassement de la peur. Molinier montre que ce modèle invisibilise la souffrance des femmes et l'importance fondamentale du care (souci des autres, gestion psychique de la vulnérabilité).",
    example:
      "Opposer le déni viril du risque chez les ouvriers du bâtiment à l'idéologie défensive discrète (compassion, dérision) chez les infirmières ou aides-soignantes pour montrer que les rapports sociaux de sexe modèlent les défenses psychiques.",
    exampleColor: "var(--molinier)",
  },
  {
    axis: "Axe 2 — Destin de la Souffrance",
    title: "Sublimation (Santé) vs Décompensation (Pathologie)",
    tension:
      "Toute copie d'examen doit s'articuler autour de ces deux trajectoires. Soit la souffrance normale est surmontée par la mobilisation de l'intelligence pratique (Métis), la coopération et la reconnaissance, menant à la sublimation et à la construction de la santé. Soit les défenses échouent (effondrement du collectif, évaluation individualisée), menant aux pathologies d'usure physique et psychique (burnout, suicide).",
    example:
      "Démontrer que le suicide au travail n'est pas un acte individuel isolé, mais la conséquence d'une décompensation collective suite à la destruction des espaces de discussion sur les règles de métier.",
    exampleColor: "var(--sante)",
  },
  {
    axis: "Axe 3 — Confrontation de Méthodes",
    title: "Enquête Clinique Collective vs Management Gestionnaire",
    tension:
      "Le management par les nombres (objectifs individuels, tableaux de bord) cherche à éliminer la subjectivité et la variabilité humaine. L'enquête collective de Dejours au contraire réhabilite la parole des travailleurs comme seul moyen d'accéder au réel du travail et de restaurer le collectif.",
    example:
      "Expliquer comment l'évaluation individuelle des performances génère de la solitude et de la déloyauté (souffrance éthique), sapant la confiance nécessaire à la coopération.",
    exampleColor: "var(--management)",
  },
  {
    axis: "Axe 4 — Perspective Historique",
    title:
      "Le Guillant (Surcharge Objective) vs Dejours (Normalité Souffrante)",
    tension:
      "Les précurseurs comme Le Guillant analysaient la névrose du travail sous le prisme de la fatigue nerveuse provoquée par des contraintes mécaniques externes (ex. dactylographes). Dejours déplace le sujet vers la psychodynamique : l'être humain n'est pas passif ; il construit activement sa normalité grâce à des stratégies défensives, jusqu'au point de décompensation.",
    example:
      "Citer l'enquête sur les demoiselles du téléphone (Le Guillant, 1956) pour illustrer la genèse de la psychopathologie classique du travail, avant de la contraster avec les modèles contemporains de Dejours.",
    exampleColor: "var(--precurseurs)",
  },
];

export const PST120_BONUS_QUESTIONS: BonusQuestion[] = [
  {
    q: "Georges Canguilhem définit la santé comme :",
    opts: [
      "Le simple silence des organes et l'absence de maladie",
      "La capacité active de créer des normes et de s'adapter aux infractions",
      "L'alignement physiologique parfait mesuré objectivement",
    ],
    ok: 1,
    expl: "Pour Canguilhem, la santé est la normativité, c'est-à-dire la capacité d'instituer de nouvelles règles d'action face aux variations du milieu de vie.",
  },
  {
    q: "Chez Hannah Arendt, l'Homo Faber correspond à :",
    opts: [
      "L'animal assujetti au cycle biologique de subsistance",
      "L'homme agissant collectivement dans l'espace politique",
      "Le travailleur qui fabrique des objets durables et des œuvres d'utilité",
    ],
    ok: 2,
    expl: "L'Homo Faber est celui qui œuvre, par opposition à l'Animal Laborans qui travaille pour la survie immédiate, et à l'Action qui relève de l'initiative politique.",
  },
  {
    q: "Pourquoi Paul Ricœur est-il utile pour éclairer Christophe Dejours ?",
    opts: [
      "Il fonde le concept de reconnaissance comme condition de l'identité sociale",
      "Il a modélisé les pathologies cardiovasculaires liées aux surcharges de travail",
      "Il a dirigé la première grande enquête clinique collective",
    ],
    ok: 0,
    expl: "Ricœur démontre que la construction identitaire du sujet nécessite la médiation et la validation par la reconnaissance sociale d'autrui.",
  },
];

export const PST120_BONUS_AUTHORS: BonusAuthorCard[] = [
  {
    title: "Georges Canguilhem — La Normativité biologique et sociale",
    color: "var(--sante)",
    body: (
      <>
        La santé n&apos;est pas l&apos;absence de maladie, mais la capacité de
        tolérer des infractions aux normes habituelles et d&apos;instituer de
        nouvelles normes face aux exigences du milieu.
        <br />
        <i>Où l&apos;utiliser :</i> Pour appuyer le fait que le travailleur
        n&apos;est pas passif face à la souffrance mais cherche activement à
        renormaliser ses contraintes (par la Métis).
      </>
    ),
  },
  {
    title: "Hannah Arendt — Les composantes de la condition de l'homme moderne",
    color: "var(--precurseurs)",
    body: (
      <>
        Distinction entre l&apos;<i>Animal Laborans</i> (le travail cyclique de
        survie et consommation), l&apos;
        <i>Homo Faber</i> (l&apos;œuvre d&apos;utilité publique, la création
        d&apos;objets durables) et l&apos;
        <i>Action</i> (l&apos;initiative politique collective).
        <br />
        <i>Où l&apos;utiliser :</i> Pour situer philosophiquement
        l&apos;importance de la sublimation : le passage d&apos;une souffrance
        de « travail cyclique » à une œuvre valorisante d&apos;utilité et de
        beauté.
      </>
    ),
  },
  {
    title: "Paul Ricœur — L'identité et le parcours de la reconnaissance",
    color: "var(--molinier)",
    body: (
      <>
        L&apos;identité de l&apos;individu n&apos;est pas un noyau fixe autonome
        ; elle se construit par le dialogue et dépend profondément de la
        reconnaissance sociale par autrui.
        <br />
        <i>Où l&apos;utiliser :</i> Pour fonder la centralité absolue du besoin
        de reconnaissance (jugements de beauté et d&apos;utilité) chez Dejours,
        qui convertit la souffrance en identité/santé.
      </>
    ),
  },
  {
    title:
      "Steger, Dik & Duffy — Le « meaningful work » (échelle WAMI) — à mobiliser en CONTRASTE",
    color: "var(--management)",
    body: (
      <>
        Approche nord-américaine de <b>psychologie positive</b> : le « sens du
        travail » est mesuré par une échelle (la WAMI) en trois dimensions —
        sens positif perçu, travail comme source de sens, contribution au «
        greater good ». Visée <i>eudémonique</i> et psychométrique.
        <br />
        <i>Où l&apos;utiliser :</i> <b>comme contrepoint critique</b>, jamais
        comme cadre. Montre la limite de l&apos;approche par questionnaire : là
        où la WAMI <i>mesure</i> un ressenti de sens a posteriori, Dejours et
        Clot <i>analysent cliniquement</i> les conditions réelles
        (reconnaissance, coopération, qualité empêchée). Mesurer le sens ne le
        restaure pas : « il n&apos;y a pas de bien-être sans bien faire »
        (Clot).
      </>
    ),
  },
];

export const PST120_ANTISECHE_GROUPS = [
  {
    sectionTitle:
      "① Le Double Parcours de la Souffrance (Question d'examen centrale)",
    headers: [
      "Étape / Direction",
      "Chemin de la Santé (Sublimation)",
      "Chemin de la Pathologie (Décompensation)",
    ],
    rows: [
      [
        "Épreuve initiale",
        "Confrontation au Réel du travail (l'écart par rapport au prescrit)",
        "Confrontation aux contraintes rigides de l'organisation",
      ],
      [
        "Ressources mobilisées",
        "Mobilisation de l'intelligence pratique (la Métis)",
        "Recours à des stratégies défensives stéréotypées (virilité)",
      ],
      [
        "Médiation sociale",
        "Coopération, délibération collective et règles de l'art",
        "Solitude, concurrence (EIP), déloyauté interindividuelle",
      ],
      [
        "Résultat final",
        "Reconnaissance qualitative (utilité/beauté) ➔ Sublimation",
        "Maladie mentale/physique (burnout, suicide, cardiopathie)",
      ],
    ],
  },
  {
    sectionTitle: "② Les 10 concepts clés du Syllabus",
    headers: ["Concept", "Définition d'examen / Auteur principal"],
    rows: [
      [
        "Réel du travail",
        "Ce qui se révèle à la subjectivité par son opposition à la maîtrise technique (Dejours).",
      ],
      [
        "Métis (Intelligence)",
        "Intelligence rusée, ingénieuse et pratique mobilisée face à la résistance du réel (Dejours).",
      ],
      [
        "Coopération",
        "Action collective reposant sur la confiance et l'élaboration de règles communes (Dejours).",
      ],
      [
        "Reconnaissance",
        "Gratification symbolique du travail via le jugement d'utilité et le jugement de beauté (Dejours).",
      ],
      [
        "Idéologie de métier",
        "Stratégie défensive collective élaborée pour occulter ou nier un danger ou une souffrance (Dejours).",
      ],
      [
        "Souffrance éthique",
        "Douleur éprouvée par le travailleur qui collabore à des actes moralement condamnables (Dejours).",
      ],
      [
        "Harcèlement",
        "Processus de persécution relationnelle facilité par le silence ou la complicité collective (Dejours).",
      ],
      [
        "Virilité défensive",
        "Stratégie collective masculine de déni du danger et glorification de l'effort physique (Dejours).",
      ],
      [
        "Care & Genre",
        "Souci relationnel d'autrui et tâches de soutien invisibilisées socialement (Pascale Molinier).",
      ],
      [
        "Enquête collective",
        "Dispositif clinique de recherche-action en 7 étapes fondé sur la parole co-construite (Dejours).",
      ],
    ],
  },
];

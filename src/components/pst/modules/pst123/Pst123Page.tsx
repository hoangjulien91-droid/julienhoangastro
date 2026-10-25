"use client";

import { useEffect, useMemo, useState } from "react";
import { Compass } from "lucide-react";
import { usePstStore } from "@/lib/pst/use-pst-store";
import { getExamDateTime, getExamLabel } from "@/lib/pst/planning-stats";
import { ModuleLivePill } from "@/components/pst/shell/ModuleLivePill";
import { ModuleIntro } from "@/components/pst/shell/ModuleIntro";
import {
  TabsShell,
  groupTabs,
  type TabDef,
} from "@/components/pst/shell/TabsShell";
import { Flashcards } from "@/components/pst/flashcards/Flashcards";
import { Qcm } from "@/components/pst/quiz/Qcm";
import { Pieges } from "@/components/pst/quiz/Pieges";
import { QuiCitations } from "@/components/pst/quiz/QuiCitations";
import { ErrorNotebook } from "@/components/pst/notebook/ErrorNotebook";
import { FeynmanSandbox } from "@/components/pst/feynman/FeynmanSandbox";
import {
  Dashboard,
  type DashboardAdvice,
} from "@/components/pst/modules/shared/panels/Dashboard";
import { Fiches } from "@/components/pst/modules/shared/panels/Fiches";
import { Lexique } from "@/components/pst/modules/shared/panels/Lexique";
import { Frise } from "@/components/pst/modules/shared/panels/Frise";
import { Parcours } from "@/components/pst/modules/shared/panels/Parcours";
import {
  Debats,
  type DebatAxis,
} from "@/components/pst/modules/shared/panels/Debats";
import {
  Bonus,
  type BonusAuthorCard,
  type BonusQuestion,
} from "@/components/pst/modules/shared/panels/Bonus";
import { Recits } from "@/components/pst/modules/shared/panels/Recits";
import { Antiseche } from "@/components/pst/modules/shared/panels/Antiseche";
import { Cas } from "@/components/pst/modules/shared/panels/Cas";
import { Protocole } from "@/components/pst/modules/shared/panels/Protocole";
import { Redac } from "@/components/pst/modules/shared/panels/Redac";
import { computeAxisRows, weakestAxis } from "@/lib/pst/dashboard-helpers";
import {
  A,
  CASES,
  FICHES,
  FRISE,
  KW_DEFS,
  LEXIQUE,
  PARCOURS,
  PIEGES,
  PROTO,
  PROTO_REFERENCE_EXPLANATION,
  QCM_BANK,
  QUI,
  RECITS,
  REDAC_ITEMS,
  PST123_OFFICIAL_RESOURCES,
} from "@/lib/pst/data/pst123";
import { Cloze } from "./Cloze";
import { Distinguer } from "./Distinguer";
import { Simulateur } from "./Simulateur";
import { Mindmap } from "./Mindmap";
import { Exam } from "./Exam";
import { Outils } from "./Outils";
import { Atelier123 } from "./Atelier123";
import { RessourcesEnseignants123 } from "./panels/RessourcesEnseignants123";
import { MatriceDubarSainsaulieu } from "./panels/MatriceDubarSainsaulieu";

const FICHE_FILTERS = [
  { key: "all", label: "Toutes les fiches (15)" },
  { key: "auteurs", label: "1. Notions d'identité (Piaget, Goffman, Weber)" },
  { key: "dubar", label: "2. Claude Dubar (Double Transaction)" },
  { key: "bourdieu", label: "3. Pierre Bourdieu (Habitus & Dominations)" },
  { key: "sainsaulieu", label: "4. Renaud Sainsaulieu (4 Modèles)" },
  {
    key: "psychologue",
    label: "5. Déontologie & Psychologue (Loi 1985 / 2021)",
  },
];
const LEXIQUE_FILTERS = [
  { key: "all", label: "Tout le lexique" },
  { key: "dubar", label: "Dubar" },
  { key: "bourdieu", label: "Bourdieu" },
  { key: "sainsaulieu", label: "Sainsaulieu" },
  { key: "auteurs", label: "Honneth & Sociologie" },
  { key: "psychologue", label: "Déontologie & Titre" },
];
const RECITS_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "dubar", label: "Dubar (Double Transaction)" },
  { key: "bourdieu", label: "Bourdieu (Habitus & Illusio)" },
  { key: "sainsaulieu", label: "Sainsaulieu (4 Modèles)" },
  { key: "auteurs", label: "Honneth (Reconnaissance)" },
  { key: "psychologue", label: "Posture & Déontologie" },
];
const RECITS_COLORS: Record<string, string> = {
  dubar: "var(--deontologie)",
  bourdieu: "var(--rps)",
  sainsaulieu: "var(--transitions)",
  auteurs: "var(--sante)",
  psychologue: "var(--mandat)",
};
const QUI_AUTHORS: Record<string, string> = {
  dubar: "Claude Dubar",
  bourdieu: "Pierre Bourdieu",
  sainsaulieu: "Renaud Sainsaulieu",
  honneth: "Axel Honneth",
  becker: "Howard Becker",
  goffman: "Erving Goffman",
  weber: "Max Weber",
  lebianic: "Thomas Le Bianic",
  merton: "Robert K. Merton",
};
const CARD_AXES = [
  "dubar",
  "bourdieu",
  "sainsaulieu",
  "auteurs",
  "psychologue",
];
const EXAM_DATE = getExamDateTime("pst123") ?? "";
const EXAM_LABEL = getExamLabel("pst123") ?? "";

const PST123_DEBATS: DebatAxis[] = [
  {
    axis: "Axe 1 — Dubar : La Double Transaction",
    title:
      "Identité pour Soi (Processus Biographique) vs Identité pour Autrui (Processus Relationnel)",
    tension:
      "L'identité n'est ni une pure conscience individuelle ni un simple rôle organisationnel prescrit. Elle est une négociation dialectique permanente entre ce que le sujet hérite et revendique dans le temps (actes d'appartenance) et les classements, grilles salariales et jugements institutionnels extérieurs (actes d'attribution).",
    example:
      "La crise identitaire éclate lors d'une réorganisation lorsque l'entreprise attribue une identité dégradée d'« inadapté » à un ouvrier qui se vit subjectivement comme le garant historique de la qualité du travail.",
    exampleColor: "var(--deontologie)",
  },
  {
    axis: "Axe 2 — Bourdieu : Domination & Travail",
    title:
      "La Double Vérité du Travail : Exploitation Objective vs Investissement Passionné (L'Illusio)",
    tension:
      "D'un point de vue objectif, le travailleur vend sa force de travail et subit les contraintes du champ économique. Mais cette vérité objective est occultée par la vérité subjective de l'activité : le travailleur investit son honneur, son savoir-faire et sa fierté dans l'ouvrage bien fait (l'illusio). Cet investissement subjectif est vital pour sa santé mentale, mais il alimente en retour la rentabilité de l'employeur.",
    example:
      "L'artisan ou l'ingénieur fier de son métier qui ne compte pas ses heures supplémentaires non payées : sa dignité subjective nourrit objectivement l'exploitation capitaliste.",
    exampleColor: "var(--rps)",
  },
  {
    axis: "Axe 3 — Sainsaulieu : Pouvoir & Relations",
    title:
      "Modèle Fusionnel (Solidarité Unanime) vs Modèle Négociateur (Conflit Démocratique et Expertise)",
    tension:
      "Dans le modèle fusionnel des ouvriers et OS d'atelier, l'absence de pouvoir individuel impose une camaraderie égalitaire et unanime qui fait bloc contre le chef et bannit la divergence interne. À l'opposé, le modèle négociateur des cadres et techniciens accepte la rivalité pacifiée, valorise l'expertise et utilise le débat démocratique contradictoire pour faire évoluer les règles du travail.",
    example:
      "Face au lean management qui tente d'individualiser les primes au mérite, le collectif fusionnel refuse l'évaluation individuelle pour protéger l'égalité de l'atelier, alors que le collectif négociateur négocie des contreparties collectives.",
    exampleColor: "var(--transitions)",
  },
  {
    axis: "Axe 4 — Honneth : Morale & Santé",
    title:
      "La Lutte pour la Reconnaissance (3 Sphères) vs Le Mépris Social et l'Invisibilité",
    tension:
      "Pour Axel Honneth, l'identité et l'intégrité psychique reposent sur trois sphères morales d'inter-reconnaissance : l'amour (confiance en soi), le droit (respect de soi) et la solidarité sociale (estime de soi dans le travail). Le mépris social, le déni de qualification ou le travail rendu invisible constituent une blessure morale intolérable qui déclenche la lutte sociale ou la souffrance psychique.",
    example:
      "Des soignants ou agents de propreté dont le geste essentiel est invisibilisé par le management gestionnaire développent un syndrome d'épuisement moral issu du mépris de leur valeur sociale.",
    exampleColor: "var(--sante)",
  },
];

const PST123_BONUS_QUESTIONS: BonusQuestion[] = [
  {
    q: "Chez Claude Dubar, comment se nomment les deux actes constitutifs de la double transaction ?",
    opts: [
      "Actes d'attribution (identité pour autrui) et actes d'appartenance (identité pour soi)",
      "Actes de sanction managériale et actes de récompense salariale",
      "Actes de signature contractuelle et actes de rupture conventionnelle",
    ],
    ok: 0,
    expl: "Dubar fonde sa théorie sur les actes d'attribution (émanant des institutions et d'autrui) et les actes d'appartenance (revendication de soi).",
  },
  {
    q: "Pour Pierre Bourdieu, l'illusio au travail désigne :",
    opts: [
      "Une hallucination pathologique liée à l'épuisement physique",
      "Le fait d'être pris au jeu du travail, d'investir sa fierté et son honneur dans l'activité, ce qui masque l'exploitation objective",
      "Une stratégie délibérée de tromperie managériale",
    ],
    ok: 1,
    expl: "L'illusio est l'adhésion intime au jeu social : le travailleur y trouve du sens et de la fierté, ce qui légitime et masque la domination objective.",
  },
  {
    q: "Dans les travaux de Thomas Le Bianic, pourquoi la profession de psychologue du travail en France est-elle qualifiée de « balkanisée » ?",
    opts: [
      "En raison de ses origines géographiques",
      "En raison de ses divisions historiques internes (cliniciens, ergonomes, travail) et de luttes de territoire face aux médecins du travail et aux DRH",
      "Parce qu'elle n'a aucun cadre légal",
    ],
    ok: 1,
    expl: "Le Bianic montre que la profession a souffert de sa dispersion corporative et de luttes de juridiction face aux psychiatres et directeurs du personnel.",
  },
];

const PST123_BONUS_AUTHORS: BonusAuthorCard[] = [
  {
    title: "Axel Honneth — La lutte pour la reconnaissance (1992)",
    color: "var(--sante)",
    body: (
      <>
        Théorise les trois sphères de la reconnaissance morale (amour, droit,
        estime sociale). La blessure morale et le mépris social surviennent
        lorsque ces sphères sont bafouées au travail.
        <br />
        <i>Où l&apos;utiliser :</i> Pour analyser les souffrances éthiques, le
        travail invisible et la quête de sens des salariés dans les copies de
        synthèse.
      </>
    ),
  },
  {
    title: "Thomas Le Bianic — Histoire du CNAM & Balkanisation du métier",
    color: "var(--deontologie)",
    body: (
      <>
        Sociologue du travail au CNAM. Retrace l&apos;histoire de la profession
        en France depuis la psychotechnique de laboratoire (Lahy) jusqu&apos;à
        la conquête du titre protégé par la Loi de 1985.
        <br />
        <i>Où l&apos;utiliser :</i> Pour situer la posture du psychologue, les
        luttes de juridiction avec la médecine et la négociation du mandat
        clinique.
      </>
    ),
  },
  {
    title: "Erving Goffman — Stigmate & Identité sociale virtuelle (1963)",
    color: "var(--mandat)",
    body: (
      <>
        Distingue l&apos;identité sociale virtuelle (les stéréotypes et
        attributs normatifs imposés d&apos;office par la société) et
        l&apos;identité sociale réelle (les attributs effectifs vécus par
        l&apos;individu).
        <br />
        <i>Où l&apos;utiliser :</i> En lien direct avec les actes
        d&apos;attribution de Claude Dubar et la théorie de la déviance.
      </>
    ),
  },
  {
    title: "Howard Becker — Outsiders & La théorie de l'étiquetage (1963)",
    color: "var(--transitions)",
    body: (
      <>
        Montre que la déviance n&apos;est pas une qualité de l&apos;acte commis,
        mais le résultat d&apos;un étiquetage (<i>labeling</i>) appliqué par des
        groupes dominants ou des « entrepreneurs de morale ».
        <br />
        <i>Où l&apos;utiliser :</i> Pour analyser les situations où un
        travailleur est étiqueté « inadapté » ou « résistant » par le management
        lors des réorganisations.
      </>
    ),
  },
];

const PST123_ANTISECHE_GROUPS = [
  {
    sectionTitle:
      "① Matrice de la Double Transaction Identitaire (Claude Dubar, 1991)",
    headers: [
      "Axe d'analyse",
      "Transaction Biographique (Identité pour Soi)",
      "Transaction Relationnelle (Identité pour Autrui)",
    ],
    rows: [
      [
        "Question fondamentale",
        "« Quel type d'homme/femme dites-vous que vous êtes ? »",
        "« Quel type d'homme/femme dit-on que vous êtes ? »",
      ],
      [
        "Nature de l'acte",
        "Actes d'appartenance (revendication intime et subjective)",
        "Actes d'attribution (classements et jugements institutionnels)",
      ],
      [
        "Axe spatial / temporel",
        "Axe temporel : continuité vs rupture biographique",
        "Axe spatial : reconnaissance ou rejet dans le système d'action",
      ],
      [
        "Tension interne",
        "Identités héritées du passé vs identités visées d'avenir",
        "Identités proposées par l'entreprise vs assumées par l'agent",
      ],
      [
        "Dynamiques d'issues",
        "Quête de sens, réorientation ou fidélité au métier",
        "Promotion interne, Conversion externe, Blocage interne, Exclusion",
      ],
      [
        "Styles identitaires",
        "Identités incertaine (conversion) ou constituée (négociateur)",
        "Identités bloquée (ouvrier de métier) ou menacée (exécutant du retrait)",
      ],
    ],
  },
  {
    sectionTitle:
      "② Les 4 Modèles Culturels d'Accès au Pouvoir (Renaud Sainsaulieu, 1977)",
    headers: [
      "Modèle relationnel",
      "Population type",
      "Accès au pouvoir",
      "Rapport aux pairs & au chef",
      "Sphère investie",
    ],
    rows: [
      [
        "1. Modèle Fusionnel",
        "Ouvriers non qualifiés, OS de ligne de montage",
        "Nul / exclu du pouvoir décisionnel formel",
        "Camaraderie unanime stricte ; bloc solidaire anti-hiérarchique",
        "Le collectif d'atelier",
      ],
      [
        "2. Modèle du Retrait",
        "Exécutants isolés, précaires, salariés de service",
        "Refusé / sentiment d'impuissance structurelle",
        "Individualisme de survie ; courtoisie distante face au chef",
        "Le non-travail (famille, loisirs)",
      ],
      [
        "3. Modèle Négociateur",
        "Cadres, techniciens qualifiés, professionnels de métier",
        "Fondé sur la compétence technique et l'expertise",
        "Rivalité pacifiée ; débat démocratique et conflit constructif",
        "L'institution et la profession",
      ],
      [
        "4. Modèle Affinitaire",
        "Employés administratifs, jeunes diplômés en ascension",
        "Sélectif, fondé sur la cooptation relationnelle",
        "Petits clans de confiance choisis ; séparatisme amical entre pairs",
        "Le réseau amical électif",
      ],
    ],
  },
  {
    sectionTitle:
      "③ Pierre Bourdieu : L'Algorithme Social, les Capitaux et la Double Vérité (1996, 2013)",
    headers: [
      "Concept théorique",
      "Définition sociologique rigoureuse",
      "Application concrète au monde du travail",
    ],
    rows: [
      [
        "L'Algorithme de l'Habitus",
        "(Dispositions + Capital) × Champ = Habitus",
        "L'habitus n'est pas figé : il s'actualise dans les luttes spécifiques d'un champ professionnel.",
      ],
      [
        "Les 4 Espèces de Capitaux",
        "Économique (revenus), Culturel (incorporé/objectivé/titres), Social (réseau), Symbolique (prestige)",
        "Le capital culturel institutionnalisé (diplômes légitimes) justifie l'autorité managériale.",
      ],
      [
        "La Violence Symbolique",
        "Domination douce, consentie et invisible où le dominé intériorise les catégories du dominant",
        "Le travailleur s'auto-exclut des responsabilités par sentiment d'illégitimité (« ce n'est pas pour moi »).",
      ],
      [
        "La Double Vérité du Travail",
        "Vérité objective (exploitation salariale) masquée par la vérité subjective (l'illusio passionné)",
        "Le salarié investit sa dignité et son honneur dans la tâche bien faite, augmentant la rentabilité patronale.",
      ],
    ],
  },
  {
    sectionTitle:
      "④ Axel Honneth : Les 3 Sphères de Reconnaissance et les 3 Formes de Mépris (1992)",
    headers: [
      "Sphère de reconnaissance",
      "Rapport pratique à soi",
      "Forme d'inter-reconnaissance",
      "Forme de mépris social subie",
    ],
    rows: [
      [
        "1. Sphère Intime (Affective)",
        "Confiance en soi",
        "Amour, amitié, sollicitude relationnelle première",
        "Atteinte à l'intégrité physique et psychique (maltraitance)",
      ],
      [
        "2. Sphère Juridique (Légale)",
        "Respect de soi",
        "Droits universels, égalité citoyenne et statutaire",
        "Déni de droits, précarité statutaire, exclusion légale",
      ],
      [
        "3. Sphère Sociale (Communauté)",
        "Estime de soi",
        "Solidarité, utilité sociale reconnue de son activité",
        "Invisibilité, dévalorisation du travail, humiliation du métier",
      ],
    ],
  },
  {
    sectionTitle:
      "⑤ Boîte à Outils Sociologique : Auteurs Socles de la Socialisation (Séance 1)",
    headers: [
      "Auteur socle",
      "Concept / Ouvrage clé",
      "Portée pour l'analyse des identités au travail",
    ],
    rows: [
      [
        "Max Weber",
        "3 dominations légitimes (rationnelle-légale, traditionnelle, charismatique)",
        "Comprendre les ressorts de l'obéissance et de l'autorité bureaucratique dans les entreprises.",
      ],
      [
        "Howard Becker",
        "Théorie de l'étiquetage (Outsiders, 1963) et carrières déviantes",
        "Montrer que l'« incompétence » ou la « déviance » au travail est une étiquette collée par les dominants.",
      ],
      [
        "Erving Goffman",
        "Stigmate (1963) : identité sociale virtuelle vs réelle",
        "Analyser le fossé douloureux entre les attentes normatives de la hiérarchie et le ressenti du sujet.",
      ],
      [
        "Robert K. Merton",
        "Groupe de référence vs Groupe d'appartenance",
        "Expliquer la frustration relative et la socialisation anticipatrice lors d'une promotion ou transition.",
      ],
      [
        "Rosenthal & Jacobson",
        "Effet Pygmalion / Prophétie autoréalisatrice (1968)",
        "Les attentes d'un manager (positives ou dévalorisantes) conditionnent la performance réelle du salarié.",
      ],
    ],
  },
  {
    sectionTitle:
      "⑥ Posture et Déontologie du Psychologue du Travail (Thomas Le Bianic & Loi 1985)",
    headers: [
      "Pilier déontologique",
      "Fondement socio-historique et légal",
      "Règle de pratique clinique incontournable",
    ],
    rows: [
      [
        "Balkanisation de la discipline",
        "Divisions historiques au CNAM entre cliniciens, ergonomes et psychotechniciens (Le Bianic)",
        "Défendre une posture clinique adossée aux sciences du travail sans s'aligner sur la seule gestion RH.",
      ],
      [
        "Titre protégé par la Loi 1985",
        "Loi du 25 juillet 1985 (Titre RNCP niveau 7 Cnam / Bac+5, inscription obligatoire ADELI / RPPS)",
        "Opposer sa qualification légale et son autonomie technique face aux pressions de la direction.",
      ],
      [
        "Triangulation de l'intervention",
        "Prescripteur payeur (DRH) ≠ Sujet évalué (Salarié)",
        "Refuser la demande brute d'évaluation punitive ; contractualiser un mandat clinique indépendant.",
      ],
      [
        "Secret professionnel & Données",
        "Code de déontologie des psychologues & RGPD",
        "Aucune transmission de données nominatives au prescripteur ; restitution collective et compréhensible.",
      ],
    ],
  },
];

export function Pst123Page() {
  const { store, bump } = usePstStore("pst123_atelier_v10");
  const [activeTab, setActiveTab] = useState("accueil");
  const [revisionTrigger, setRevisionTrigger] = useState(0);

  useEffect(() => {
    store.recordSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cards = useMemo(
    () => FICHES.map((f, i) => ({ id: "fc_" + i, axis: f.a })),
    [],
  );
  const cartes = useMemo(
    () =>
      FICHES.map((f, i) => ({
        id: "fc_" + i,
        axis: f.a,
        tag: A[f.a as keyof typeof A] ?? f.a,
        a: f.ph,
        q: f.t,
        deep: f.ess,
      })),
    [],
  );
  const qcmData = useMemo(
    () =>
      QCM_BANK.map((q) => ({
        q: q.q,
        opts: q.opts,
        correct: q.ok,
        exp: q.expl,
      })),
    [],
  );
  const piegesData = useMemo(
    () => PIEGES.map((p) => [p[0], p[1], p[2]] as [string, boolean, string]),
    [],
  );
  const friseData = useMemo(
    () => FRISE.map((f) => ({ annee: f.y, titre: f.t, desc: f.d })),
    [],
  );
  const parcoursData = useMemo(
    () =>
      PARCOURS.map((p) => ({
        id: p.key,
        title: p.titre,
        fenetre: p.fenetre,
        desc: p.but,
        onglets: p.onglets as [string, string][],
        items: p.taches,
      })),
    [],
  );

  function goTab(panel: string) {
    setActiveTab(panel);
  }
  function triggerRevision() {
    setRevisionTrigger((v) => v + 1);
  }

  const axisRows = computeAxisRows(cards, CARD_AXES, store);
  const weak = weakestAxis(axisRows);
  const masteredCards = cards.filter((c) => store.getBox(c.id) >= 4).length;
  const qcmS = store.getScore("qcm");

  let advice: DashboardAdvice;
  if (masteredCards < cards.length * 0.5) {
    advice = {
      title: "Commence par les cartes",
      text: "Passe les notions en rappel actif (répétition espacée) et marque honnêtement ta confiance.",
      btn: "Réviser les cartes",
      panel: "cartes",
      leitner: true,
    };
  } else if (weak && weak.mast / weak.tot < 0.6) {
    advice = {
      title: "Consolide " + (A[weak.ax as keyof typeof A] ?? weak.ax),
      text: "C'est l'axe le moins maîtrisé. Refais ses cartes en ciblant, puis teste-toi.",
      btn: "Réviser les cartes",
      panel: "cartes",
      leitner: true,
    };
  } else if (!qcmS || qcmS.pct < 80) {
    advice = {
      title: "Teste-toi au QCM",
      text: "Tes cartes avancent bien. Vérifie au QCM (vise > 80 %) : le bilan te dira quoi retravailler.",
      btn: "Lancer le QCM",
      panel: "qcm",
      leitner: false,
    };
  } else {
    advice = {
      title: "Passe en conditions réelles",
      text: "Bon niveau ! Entraîne-toi sur l'examen blanc et les récits interactifs pour ancrer ta posture.",
      btn: "Passer l'examen blanc",
      panel: "exam",
      leitner: false,
    };
  }

  const tabs: TabDef[] = [
    {
      id: "accueil",
      label: "Accueil ◆",
      content: (
        <div>
          {/* Fil conducteur de l'examen Cnam PST123 */}
          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-indigo-500/25 shadow-xs mb-4 space-y-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5 shadow-2xs">
                <Compass className="size-3 text-indigo-600 dark:text-indigo-400" />
                <span>Fil conducteur de l&apos;examen Cnam</span>
              </span>
              <span className="text-[10px] font-mono font-semibold text-muted-foreground uppercase">
                PST123 · Identité Sociale &amp; Déontologie
              </span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold tracking-tight text-foreground m-0">
                Double transaction (Dubar) → Cultures de métier (Sainsaulieu) →
                Indépendance déontologique
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed m-0">
                L&apos;identité professionnelle se négocie à l&apos;intersection
                du parcours biographique (identité pour soi) et de la
                reconnaissance relationnelle (identité pour autrui), exigeant du
                psychologue du travail l&apos;analyse de la demande et le
                respect absolu du secret professionnel (Code 2021).
              </p>
            </div>
          </div>
          <Dashboard
            store={store}
            cards={cards}
            ficheCount={FICHES.length}
            authors={A}
            cardAxes={CARD_AXES}
            streakHint="Reviens chaque jour pour ancrer la posture déontologique."
            toolboxTitle="Ressources d'indépendance"
            toolboxDesc={
              <>
                Consulte la <b>carte mentale du double parcours</b> de la
                posture professionnelle ou ordonne le protocole d&apos;enquête.
              </>
            }
            mindmapLabel="Carte mentale"
            protocoleLabel="Protocole d'enquête"
            advice={advice}
            onStoreChange={bump}
            onGoTab={goTab}
            onTriggerRevision={triggerRevision}
            extraCards={
              <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-emerald-500 shadow-xs mb-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1.5">
                    <span>🎯 Mise en Situation Réelle</span>
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 m-0">
                  Révision active recommandée
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed m-0 font-medium">
                  Entraîne-toi sur le <b>simulateur d&apos;examen blanc</b> ou
                  lance une session de <b>récits interactifs</b>.
                </p>
                <div className="flex items-center gap-2.5 flex-wrap pt-1">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer active:scale-95"
                    onClick={() => goTab("exam")}
                  >
                    Passer l&apos;Examen Blanc
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-3.5 py-2 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
                    onClick={() => goTab("recits")}
                  >
                    Récits interactifs
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-3.5 py-2 rounded-full text-xs font-mono font-semibold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-all cursor-pointer active:scale-95 shadow-2xs"
                    onClick={() => goTab("ressources")}
                  >
                    Ressources &amp; Textes ({PST123_OFFICIAL_RESOURCES.length})
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-3.5 py-2 rounded-full text-xs font-mono font-bold bg-purple-600 hover:bg-purple-700 text-white transition-all cursor-pointer active:scale-95 shadow-2xs"
                    onClick={() => goTab("matrice")}
                  >
                    Matrice Dubar &amp; Sainsaulieu ✦
                  </button>
                </div>
              </div>
            }
          />
        </div>
      ),
    },
    {
      id: "fiches",
      label: "Fiches",
      content: (
        <Fiches
          store={store}
          onStoreChange={bump}
          data={FICHES}
          filters={FICHE_FILTERS}
          hint="Les fiches condensées du cours PST123. Clique pour déplier les détails."
        />
      ),
    },
    {
      id: "ressources",
      label: "Ressources profs ✦",
      content: <RessourcesEnseignants123 />,
    },
    {
      id: "lexique",
      label: "Lexique",
      content: (
        <Lexique
          data={LEXIQUE}
          filters={LEXIQUE_FILTERS}
          authors={A}
          hint="Dictionnaire interactif des concepts fondamentaux de la posture et de la déontologie."
        />
      ),
    },
    {
      id: "recits",
      label: "Récits ",
      content: (
        <Recits
          store={store}
          onStoreChange={bump}
          data={RECITS}
          kwDefs={KW_DEFS}
          filters={RECITS_FILTERS}
          colors={RECITS_COLORS}
        />
      ),
    },
    {
      id: "cartes",
      label: "Cartes",
      content: (
        <Flashcards
          store={store}
          cartes={cartes}
          authors={A}
          onStoreChange={bump}
          revisionTrigger={revisionTrigger}
        />
      ),
    },
    {
      id: "qcm",
      label: "QCM",
      content: <Qcm store={store} data={qcmData} onAnswered={bump} />,
    },
    {
      id: "qui",
      label: "Qui a dit quoi ?",
      content: (
        <QuiCitations
          store={store}
          data={QUI as unknown as [string, string, string][]}
          authors={QUI_AUTHORS}
          onAnswered={bump}
        />
      ),
    },
    {
      id: "pieges",
      label: "Pièges V/F",
      content: <Pieges store={store} data={piegesData} onAnswered={bump} />,
    },
    {
      id: "distinguer",
      label: "Distinguer",
      content: <Distinguer store={store} onAnswered={bump} />,
    },
    { id: "cloze", label: "Citations", content: <Cloze /> },
    {
      id: "redac",
      label: "Rédaction",
      content: (
        <Redac
          data={REDAC_ITEMS}
          hint="Sujets rédigés types d'examen. Étudie les corrigés pour t'entraîner sur la structure attendue."
        />
      ),
    },
    { id: "simulateur", label: "Simulateur ✦", content: <Simulateur /> },
    {
      id: "matrice",
      label: "Dubar & Sainsaulieu ✦",
      content: <MatriceDubarSainsaulieu />,
    },
    {
      id: "frise",
      label: "Frise ✦",
      content: (
        <Frise
          data={friseData}
          hint="La chronologie juridique et déontologique de la psychologie du travail en France."
        />
      ),
    },
    {
      id: "cas",
      label: "Cas cliniques ✦",
      content: (
        <Cas
          data={CASES}
          hint="Analyses guidées de cas professionnels sous l'angle déontologique et ergonomique."
        />
      ),
    },
    { id: "mindmap", label: "Mindmap ✦", content: <Mindmap /> },
    {
      id: "protocole",
      label: "Protocole ✦",
      content: (
        <Protocole
          data={PROTO}
          hint="Remets dans l'ordre les 7 étapes réglementaires et déontologiques de l'intervention du psychologue."
          referenceExplanation={PROTO_REFERENCE_EXPLANATION}
        />
      ),
    },
    {
      id: "parcours",
      label: "Parcours ✦",
      content: (
        <Parcours
          store={store}
          onStoreChange={bump}
          onGoTab={goTab}
          data={parcoursData}
          examDate={EXAM_DATE}
          examLabel={EXAM_LABEL}
          hint="Ton plan de révision d'excellence structuré en 4 étapes pour dominer l'examen."
        />
      ),
    },
    {
      id: "debats",
      label: "Débats",
      content: (
        <Debats
          store={store}
          onStoreChange={bump}
          data={PST123_DEBATS}
          hint="Les 4 grands débats transversaux de la déontologie pour prendre de la hauteur et structurer tes comparaisons de synthèse à l'examen."
        />
      ),
    },
    {
      id: "outils",
      label: "Outils ✦",
      content: <Outils store={store} onStoreChange={bump} />,
    },
    {
      id: "antiseche",
      label: "Antisèche",
      content: (
        <Antiseche
          title="PST123 — L'Identité Sociale et Professionnelle (E. Lucy)"
          subtitle="Matrices théoriques fondamentales d'examen — Dubar, Bourdieu, Sainsaulieu, Honneth & Déontologie"
          groups={PST123_ANTISECHE_GROUPS}
        />
      ),
    },
    {
      id: "atelier",
      label: "Annales & Atelier ✦",
      content: <Atelier123 />,
    },
    {
      id: "exam",
      label: "Examen blanc ✦",
      content: <Exam store={store} onStoreChange={bump} />,
    },
    {
      id: "bonus",
      label: "Bonus",
      content: (
        <Bonus
          store={store}
          hint="Des auteurs d'ouverture théorique pour valoriser votre copie d'examen."
          quizTitle="Mini-Quiz : Culture d'Ouverture d'Élite"
          authors={PST123_BONUS_AUTHORS}
          questions={PST123_BONUS_QUESTIONS}
        />
      ),
    },
    {
      id: "errors",
      label:
        store.getErrors().length > 0
          ? `Carnet d'Erreurs (${store.getErrors().length})`
          : "Carnet d'Erreurs",
      content: <ErrorNotebook store={store} onStoreChange={bump} />,
    },
    {
      id: "feynman",
      label: "Feynman Sandbox ",
      content: (
        <FeynmanSandbox store={store} moduleKey="pst123" onStoreChange={bump} />
      ),
    },
  ];

  return (
    <>
      <ModuleLivePill unitId="pst123" />
      <header className="top">
        <div className="eyebrow">
          PST123 · L&apos;identité sociale et professionnelle · Élisabeth LUCY
          (Cnam)
        </div>
        <h1>L&apos;identité sociale et professionnelle au travail</h1>
        <ModuleIntro unitId="pst123">
          Validation&nbsp;:{" "}
          <b>
            Examen final sur table (2h00 — Choix entre Option A : Dissertation
            théorique ou Option B : Analyse de situation de travail)
          </b>
          . Révise activement les 6 séances fondamentales du cours de Mme
          Élisabeth LUCY&nbsp;: les notions d&apos;identité en sciences humaines
          (Piaget, Durkheim, Parsons, Goffman, Becker, Weber, Merton), la double
          transaction identitaire de <b>Claude Dubar</b> (biographique vs
          relationnelle, actes d&apos;attribution vs appartenance),
          l&apos;habitus, les capitaux et la double vérité du travail de{" "}
          <b>Pierre Bourdieu</b>, les 4 modèles relationnels d&apos;accès au
          pouvoir de <b>Renaud Sainsaulieu</b> (retrait, fusionnel, négociateur,
          affinitaire), la reconnaissance morale et le travail invisible d&apos;
          <b>Axel Honneth</b>, ainsi que l&apos;histoire sociologique et la
          déontologie du psychologue du travail (<b>Thomas Le Bianic</b>, Loi de
          1985, Code révisé 2021). <b>Consigne d&apos;excellence&nbsp;:</b>{" "}
          définir systématiquement les concepts avant de les discuter et
          articuler dialectiquement les dimensions subjectives (pour soi) et
          objectives (pour autrui).
        </ModuleIntro>
        <div className="steps" aria-hidden="true">
          <div className="step s0">
            <b>Claude Dubar</b>
            <span>Double Transaction</span>
          </div>
          <div className="step s1">
            <b>Pierre Bourdieu</b>
            <span>Habitus &amp; Illusio</span>
          </div>
          <div className="step s2">
            <b>R. Sainsaulieu</b>
            <span>4 Modèles de Pouvoir</span>
          </div>
          <div className="step s3">
            <b>Axel Honneth</b>
            <span>3 Sphères &amp; Posture</span>
          </div>
        </div>
        <div className="stepbar" aria-hidden="true" />
      </header>
      <TabsShell
        tabs={groupTabs(tabs)}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
    </>
  );
}

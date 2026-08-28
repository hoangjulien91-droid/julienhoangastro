"use client";

import { useEffect, useMemo, useState } from "react";
import { usePstStore } from "@/lib/pst/use-pst-store";
import { getExamDateTime, getExamLabel } from "@/lib/pst/planning-stats";
import { ModulesNav } from "@/components/pst/shell/ModulesNav";
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
import { Distinguer } from "@/components/pst/modules/shared/panels/Distinguer";
import { Cloze } from "@/components/pst/modules/shared/panels/Cloze";
import { Redac } from "@/components/pst/modules/shared/panels/Redac";
import { Simulateur } from "@/components/pst/modules/shared/panels/Simulateur";
import { Frise } from "@/components/pst/modules/shared/panels/Frise";
import { Cas } from "@/components/pst/modules/shared/panels/Cas";
import { Mindmap } from "@/components/pst/modules/shared/panels/Mindmap";
import { Protocole } from "@/components/pst/modules/shared/panels/Protocole";
import { Atelier } from "@/components/pst/modules/shared/panels/Atelier";
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
import { Examen } from "@/components/pst/modules/shared/panels/Examen";
import { computeAxisRows, weakestAxis } from "@/lib/pst/dashboard-helpers";
import {
  A,
  CASES,
  CLOZE,
  DISTINGUER,
  FICHES,
  FRISE_DATA,
  KW_DEFS,
  LEXIQUE,
  NODES,
  PARCOURS,
  PIEGES,
  PROTO,
  QCM_DATA,
  QUI,
  REDAC,
  RECITS,
  SIM,
  ATELIER_SUJETS,
} from "@/lib/pst/data/pst120";
import { Outils } from "./Outils";

const FICHE_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "precurseurs", label: "Précurseurs" },
  { key: "dejours", label: "Dejours (Psychodynamique)" },
  { key: "molinier", label: "Molinier (Genre & Care)" },
  { key: "management", label: "Management & Risques" },
];
const LEXIQUE_FILTERS = [
  { key: "all", label: "Tout" },
  { key: "dejours", label: "Dejours" },
  { key: "molinier", label: "Molinier" },
  { key: "precurseurs", label: "Précurseurs" },
  { key: "management", label: "Management" },
];
const RECITS_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "precurseurs", label: "Précurseurs" },
  { key: "dejours", label: "Dejours" },
  { key: "molinier", label: "Molinier" },
  { key: "management", label: "Management" },
];
const RECITS_COLORS: Record<string, string> = {
  precurseurs: "var(--precurseurs)",
  dejours: "var(--dejours)",
  molinier: "var(--molinier)",
  management: "var(--management)",
};
const CARD_AXES = ["precurseurs", "dejours", "molinier", "management"];
const EXAM_DATE = getExamDateTime("pst120") ?? "";
const EXAM_LABEL = getExamLabel("pst120") ?? "";

const PST120_DEBATS: DebatAxis[] = [
  {
    axis: "Axe 1 — Genre et Virilité",
    title: "Idéologies Viriles (Dejours) vs Révélation du Care (Molinier)",
    tension:
      "Dejours analyse les stratégies défensives collectives (notamment dans le travail ouvrier/physique) basées sur le déni du danger, la virilité et le dépassement de la peur. Molinier montre que ce modèle invisibilise la souffrance des femmes et l'importance fondamentale du <i>care</i> (souci des autres, gestion psychique de la vulnérabilité).",
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

const PST120_BONUS_QUESTIONS: BonusQuestion[] = [
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

const PST120_BONUS_AUTHORS: BonusAuthorCard[] = [
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

const PST120_ANTISECHE_GROUPS = [
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

export function Pst120Page() {
  const { store, bump } = usePstStore("pst120_atelier_v10");
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
        tag: A[f.a as keyof typeof A],
        a: f.ph,
        q: f.t,
        deep: f.ess,
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
  const examS = store.getScore("examen");

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
      title: "Axe faible détecté : " + A[weak.ax as keyof typeof A],
      text: `Moins de 60% des notions de cet axe sont maîtrisées. Concentre tes révisions sur l'axe ${A[weak.ax as keyof typeof A]}.`,
      btn: "Réviser cet axe",
      panel: "cartes",
      leitner: true,
    };
  } else if (!qcmS || qcmS.pct < 80) {
    advice = {
      title: "Améliore ton score QCM",
      text: "Ton score QCM n'a pas encore atteint les 80% requis pour l'excellence pédagogique.",
      btn: "Lancer le QCM",
      panel: "qcm",
      leitner: false,
    };
  } else if (!examS) {
    advice = {
      title: "Confronte-toi à l'examen blanc",
      text: "Tu as validé les bases. Il est temps de rédiger ton premier plan détaillé en temps limité.",
      btn: "Lancer l'examen",
      panel: "examen",
      leitner: false,
    };
  } else {
    advice = {
      title: "Excellence acquise",
      text: "Félicitations ! Tous les feux sont au vert. Continue d'entretenir ta mémoire avec le SM-2.",
      btn: "Révision quotidienne",
      panel: "cartes",
      leitner: true,
    };
  }

  const tabs: TabDef[] = [
    {
      id: "accueil",
      label: "Accueil ◆",
      content: (
        <Dashboard
          store={store}
          cards={cards}
          ficheCount={FICHES.length}
          authors={A}
          cardAxes={CARD_AXES}
          streakHint="Reviens chaque jour pour ancrer la Métis."
          toolboxTitle="Boîte à Outils d'Excellence"
          toolboxDesc={
            <>
              Consulte le <b>Double Parcours</b> de la souffrance et ordonne les
              étapes de l&apos;enquête clinique.
            </>
          }
          mindmapLabel="Voir la carte mentale"
          protocoleLabel="Ordonner l'enquête"
          advice={advice}
          onStoreChange={bump}
          onGoTab={goTab}
          onTriggerRevision={triggerRevision}
        />
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
          hint="Les fiches condensées des 14 séances du cours PST120. Clique pour déplier les détails."
        />
      ),
    },
    {
      id: "lexique",
      label: "Lexique",
      content: (
        <Lexique
          data={LEXIQUE}
          filters={LEXIQUE_FILTERS}
          authors={A}
          hint="Dictionnaire interactif des concepts fondamentaux de la psychodynamique du travail."
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
      content: <Qcm store={store} data={QCM_DATA} onAnswered={bump} />,
    },
    {
      id: "qui",
      label: "Qui a dit quoi ?",
      content: (
        <QuiCitations
          store={store}
          data={QUI as unknown as [string, string, string][]}
          authors={A}
          onAnswered={bump}
        />
      ),
    },
    {
      id: "pieges",
      label: "Pièges V/F",
      content: (
        <Pieges
          store={store}
          data={PIEGES as unknown as [string, boolean, string][]}
          onAnswered={bump}
        />
      ),
    },
    {
      id: "distinguer",
      label: "Distinguer",
      content: (
        <Distinguer
          store={store}
          onAnswered={bump}
          data={DISTINGUER as never}
          hint="Distingue les concepts voisins de la psychodynamique pour éviter les amalgames le jour de l'examen."
        />
      ),
    },
    {
      id: "cloze",
      label: "Citations",
      content: (
        <Cloze
          data={CLOZE as never}
          authors={A}
          hint="Retiens les formules exactes des auteurs. Clique sur chaque trou pour révéler le terme attendu."
        />
      ),
    },
    {
      id: "redac",
      label: "Rédaction",
      content: (
        <Redac
          data={REDAC as never}
          hint="Entraîne-toi sur des sujets types d'examen. Réplique les plans et étudie les corrigés rédigés."
        />
      ),
    },
    {
      id: "simulateur",
      label: "Simulateur ✦",
      content: (
        <Simulateur
          data={SIM}
          hint="Simule une enquête psychodynamique sur le terrain. Adopte la bonne posture et respecte la méthodologie."
        />
      ),
    },
    {
      id: "frise",
      label: "Frise ✦",
      content: (
        <Frise
          data={FRISE_DATA}
          hint="Repères historiques de la psychopathologie et psychodynamique du travail (d'après-guerre à nos jours)."
        />
      ),
    },
    {
      id: "cas",
      label: "Cas cliniques ✦",
      content: (
        <Cas
          data={CASES}
          hint="Analyse des cas cliniques concrets en appliquant le diagnostic et les concepts de PST120."
        />
      ),
    },
    {
      id: "mindmap",
      label: "Double Parcours ✦",
      content: (
        <Mindmap
          nodes={NODES}
          defaultKey="reel"
          hint="Visualisation interactive de la Fiche A4 : clique sur un nœud pour observer son rôle dans le parcours de la souffrance."
        />
      ),
    },
    {
      id: "protocole",
      label: "Protocole d'enquête ✦",
      content: (
        <Protocole
          data={PROTO}
          hint="Remets les 7 étapes méthodologiques de l'enquête collective en psychodynamique dans le bon ordre."
          referenceExplanation="La trame rigoureuse de l'enquête clinique est : 1) Demande, 2) Pré-enquête, 3) Groupes homogènes, 4) Auditions, 5) Rapport, 6) Validation, 7) Restitution publique."
        />
      ),
    },
    {
      id: "atelier",
      label: "Atelier ✦",
      content: (
        <Atelier
          store={store}
          onStoreChange={bump}
          data={ATELIER_SUJETS}
          hint="Sujets de dissertation et études de cas avec checklist interactive pour t'auto-évaluer pas à pas."
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
          data={PARCOURS as never}
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
          data={PST120_DEBATS}
          hint="Les 4 grands débats transversaux de la psychodynamique pour prendre de la hauteur et structurer tes comparaisons de synthèse à l'examen."
        />
      ),
    },
    {
      id: "recits",
      label: "Récits 📖",
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
      id: "outils",
      label: "Outils ✦",
      content: <Outils store={store} onStoreChange={bump} />,
    },
    {
      id: "antiseche",
      label: "Antisèche",
      content: (
        <Antiseche
          title="PST120 — Psychodynamique & Psychopathologie du Travail"
          subtitle="Fiche de synthèse d'examen — à reproduire de mémoire"
          groups={PST120_ANTISECHE_GROUPS}
        />
      ),
    },
    {
      id: "examen",
      label: "Examen blanc ✦",
      content: (
        <Examen
          store={store}
          onStoreChange={bump}
          data={REDAC as never}
          hint="Entraîne-toi en conditions : un sujet de dissertation tiré au sort, un chronomètre, ton plan au brouillon, puis l'auto-évaluation contre les attendus du correcteur."
        />
      ),
    },
    {
      id: "bonus",
      label: "Bonus",
      content: (
        <Bonus
          store={store}
          hint='Des auteurs d&apos;ouverture théorique. Les citer de manière pertinente valorisera grandement votre copie ("glaçage sur le gâteau").'
          quizTitle="🎯 Mini-Quiz : Culture d'Ouverture d'Élite"
          authors={PST120_BONUS_AUTHORS}
          questions={PST120_BONUS_QUESTIONS}
        />
      ),
    },
    {
      id: "errors",
      label: "Carnet d'Erreurs 📔",
      content: <ErrorNotebook store={store} onStoreChange={bump} />,
    },
    {
      id: "feynman",
      label: "Feynman Sandbox 🎓",
      content: (
        <FeynmanSandbox store={store} moduleKey="pst120" onStoreChange={bump} />
      ),
    },
  ];

  return (
    <>
      <ModulesNav active="pst120" />
      <header className="top">
        <div className="eyebrow">
          PST120 · Psychodynamique et psychopathologie du travail
        </div>
        <h1>Psychodynamique &amp; psychopathologie du travail</h1>
        <ModuleIntro unitId="pst120">
          Validation&nbsp;:{" "}
          <b>Examen final sur table (Étude de cas clinique ou dissertation)</b>.
          Révise activement les 14 séances du syllabus et le double parcours de
          la souffrance. <b>Consigne critique&nbsp;:</b> ne jamais utiliser le
          vocabulaire de la clinique de l&apos;activité d&apos;Yves Clot (exit
          &quot;activité empêchée&quot;, &quot;pouvoir d&apos;agir&quot;,
          &quot;genre&quot;, &quot;style&quot;, &quot;auto-confrontation&quot;).
        </ModuleIntro>
        <div className="steps" aria-hidden="true">
          <div className="step s0">
            <b>Précurseurs</b>
            <span>psychopathologie</span>
          </div>
          <div className="step s1">
            <b>Dejours</b>
            <span>psychodynamique</span>
          </div>
          <div className="step s2">
            <b>Molinier</b>
            <span>care &amp; genre</span>
          </div>
          <div className="step s3">
            <b>Management</b>
            <span>organisation</span>
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

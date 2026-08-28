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
} from "@/lib/pst/data/pst124";
import { Outils } from "./Outils";

const FICHE_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "dejours", label: "Bobillier Chaumon (Usage)" },
  { key: "precurseurs", label: "Rabardel (Instrument)" },
  { key: "molinier", label: "Engeström (Activité)" },
  { key: "management", label: "Acceptabilité & Algorithme" },
];
const LEXIQUE_FILTERS = [
  { key: "all", label: "Tout" },
  { key: "dejours", label: "Bobillier Chaumon" },
  { key: "precurseurs", label: "Rabardel" },
  { key: "molinier", label: "Engeström" },
  { key: "management", label: "Acceptabilité & Algorithme" },
];
const RECITS_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "precurseurs", label: "L'Artefact" },
  { key: "dejours", label: "La Genèse" },
  { key: "molinier", label: "L'Acceptation" },
  { key: "management", label: "Pouvoir d'agir" },
];
const RECITS_COLORS: Record<string, string> = {
  precurseurs: "var(--precurseurs)",
  dejours: "var(--dejours)",
  molinier: "var(--molinier)",
  management: "var(--management)",
};
const CARD_AXES = ["precurseurs", "dejours", "molinier", "management"];
const EXAM_DATE = getExamDateTime("pst124") ?? "";
const EXAM_LABEL = getExamLabel("pst124") ?? "";

const PST124_DEBATS: DebatAxis[] = [
  {
    axis: "Axe 1 — Évaluation des technologies",
    title:
      "Acceptabilité a priori (TAM/UTAUT) vs Acceptation située (Bobillier Chaumon & Dubois)",
    tension:
      "Les modèles nord-américains (TAM de Davis, UTAUT) évaluent l'adoption d'un outil <i>a priori</i> via « l'utilité perçue » et la « facilité d'utilisation » d'un utilisateur rationnel isolé. Bobillier Chaumon montre que l'acceptation se construit <i>a posteriori</i>, dans et par l'activité réelle, face aux contradictions et aux aléas du travail.",
    example:
      "Montrer que la « résistance au changement » est souvent un faux diagnostic qui masque une technologie inadaptée à l'activité, et déployer la grille des 4 dimensions (utilité, utilisabilité, intégration socio-organisationnelle, signification identitaire) pour le démontrer.",
    exampleColor: "var(--molinier)",
  },
  {
    axis: "Axe 2 — Pouvoir de développement de l'outil",
    title: "Technologie Capacitante vs Technologie Incapacitante",
    tension:
      "Toute copie doit s'articuler autour de ces deux trajectoires. Soit l'outil développe les compétences, augmente l'autonomie et le pouvoir d'agir, soutient l'apprentissage et le collectif (technologie capacitante). Soit il réduit les compétences (taylorisme numérique), renforce le contrôle et la surveillance, isole l'opérateur et fige les pratiques (technologie incapacitante).",
    example:
      "Démontrer qu'une même IA d'aide à la décision peut être capacitante (elle outille le jugement du professionnel) ou incapacitante (elle dicte la décision et déqualifie), selon la place laissée au pouvoir d'agir dans sa conception.",
    exampleColor: "var(--sante)",
  },
  {
    axis: "Axe 3 — Déplacement de la prescription",
    title:
      "Prescription managériale (le chef d'atelier) vs Prescription algorithmique (le code)",
    tension:
      "Le management algorithmique déplace la prescription : le rythme et l'organisation ne sont plus dictés par un manager humain (négociable, visible) mais codés dans le logiciel ou pilotés par un algorithme de scoring (opaque, continu). La clinique de l'usage cherche à rouvrir des espaces de délibération sur ces outils.",
    example:
      "Analyser le pilotage des livreurs ou chauffeurs de plateforme par l'application (notation client, dispatching automatique) comme une prescription invisibilisée qui supprime toute marge de manœuvre et toute discussion.",
    exampleColor: "var(--management)",
  },
  {
    axis: "Axe 4 — Unité d'analyse",
    title:
      "Le couple Sujet-Instrument (Rabardel) vs Le Système d'activité (Engeström)",
    tension:
      "Rabardel centre l'analyse sur la <i>genèse instrumentale</i> : comment un sujet transforme un artefact en instrument (instrumentation / instrumentalisation). Engeström élargit la focale au <i>système d'activité</i> entier (sujet, objet, outil, règles, communauté, division du travail) et aux contradictions systémiques qu'une technologie y introduit.",
    example:
      "Analyser l'introduction d'un ERP non comme un simple changement d'outil (Rabardel), mais comme une perturbation de tout le système d'activité d'un service (Engeström) générant des contradictions dans la division du travail.",
    exampleColor: "var(--precurseurs)",
  },
];

const PST124_BONUS_QUESTIONS: BonusQuestion[] = [
  {
    q: "Selon Lucy Suchman (action située), un plan ou une prescription logicielle :",
    opts: [
      "Détermine entièrement le déroulement de l'action",
      "Ne détermine jamais l'action, qui se reconfigure selon les circonstances locales",
      "Doit être appliqué à la lettre pour réussir",
    ],
    ok: 1,
    expl: "L'action située montre que l'usage déborde toujours la conception : c'est un fondement de l'acceptation située.",
  },
  {
    q: "Pour Bruno Latour (théorie de l'acteur-réseau), les objets techniques :",
    opts: [
      "Sont des outils parfaitement neutres",
      "Sont des actants qui prescrivent des comportements et redistribuent l'action",
      "N'ont aucune influence sur les humains",
    ],
    ok: 1,
    expl: "Latour invite à nuancer le déterminisme technologique tout en reconnaissant que l'artefact embarque un « script » d'action.",
  },
  {
    q: "Le « pouvoir d'agir » d'Yves Clot, mobilisé en clinique de l'usage, désigne :",
    opts: [
      "La capacité à agir et transformer son activité et ses outils, dont l'empêchement nuit à la santé",
      "Le pouvoir hiérarchique du manager sur l'équipe",
      "La puissance de calcul d'un système informatique",
    ],
    ok: 0,
    expl: "Quand l'activité est empêchée par un outil rigide, c'est le pouvoir d'agir qu'il faut restaurer (pont direct avec PST106).",
  },
];

const PST124_BONUS_AUTHORS: BonusAuthorCard[] = [
  {
    title: "Lucy Suchman — L'action située (Plans and Situated Actions)",
    color: "var(--sante)",
    body: (
      <>
        Les plans (et donc les prescriptions logicielles) ne déterminent jamais
        l&apos;action : celle-ci se reconfigure en permanence selon les
        circonstances locales. L&apos;usage déborde toujours la conception.
        <br />
        <i>Où l&apos;utiliser :</i> Pour fonder épistémologiquement l&apos;«
        acceptation située » : c&apos;est la situation réelle, et non
        l&apos;intention de l&apos;utilisateur, qui révèle l&apos;usage.
      </>
    ),
  },
  {
    title: "Bruno Latour — Théorie de l'acteur-réseau et agentivité des objets",
    color: "var(--precurseurs)",
    body: (
      <>
        Les objets techniques ne sont pas neutres : ils sont des actants qui
        prescrivent des comportements et redistribuent l&apos;action entre
        humains et non-humains.
        <br />
        <i>Où l&apos;utiliser :</i> Pour nuancer le « déterminisme technologique
        » tout en rappelant qu&apos;un artefact embarque bien un programme
        d&apos;action (un script) imposé à l&apos;usager.
      </>
    ),
  },
  {
    title: "Yves Clot — Pouvoir d'agir et activité empêchée",
    color: "var(--molinier)",
    body: (
      <>
        La santé au travail se mesure au pouvoir d&apos;agir : quand
        l&apos;activité est empêchée (par un outil rigide), le sujet est privé
        de la possibilité de bien faire son métier.
        <br />
        <i>Où l&apos;utiliser :</i> Pont direct avec PST106 et avec la clinique
        de l&apos;usage (Bobillier Chaumon &amp; Clot) : restaurer le pouvoir
        d&apos;agir numérique des professionnels.
      </>
    ),
  },
];

const PST124_ANTISECHE_GROUPS = [
  {
    sectionTitle:
      "① La double trajectoire technologique (boussole de l'examen)",
    headers: [
      "Étape / Direction",
      "Technologie capacitante",
      "Technologie incapacitante",
    ],
    rows: [
      [
        "Point de départ",
        "Artefact soumis à l'épreuve de l'acceptation située",
        "Artefact imposé, prescription codée dans le logiciel",
      ],
      [
        "Dynamique d'usage",
        "Genèse instrumentale, appropriation et braconnage assumés",
        "Management algorithmique, surveillance et invisibilisation du travail réel",
      ],
      [
        "Effet sur le collectif",
        "Soutien du collectif et des espaces de délibération",
        "Isolement, perte des espaces informels, technostress",
      ],
      [
        "Résultat final",
        "Développement du pouvoir d'agir ➔ instrument capacitant",
        "Déqualification, activité empêchée ➔ taylorisme numérique",
      ],
    ],
  },
  {
    sectionTitle: "② Les concepts clés du syllabus",
    headers: ["Concept", "Définition d'examen / Auteur principal"],
    rows: [
      [
        "Clinique de l'usage",
        "Analyse compréhensive et transformatrice des situations médiatisées pour restaurer le pouvoir d'agir (Bobillier Chaumon & Clot).",
      ],
      [
        "Acceptation située",
        "Appropriation construite dans et par l'activité réelle, a posteriori (Bobillier Chaumon & Dubois).",
      ],
      [
        "Acceptabilité (TAM/UTAUT)",
        "Évaluation a priori de l'intention d'usage (utilité perçue, facilité), critiquée car elle ignore le travail réel.",
      ],
      [
        "Genèse instrumentale",
        "Passage de l'artefact à l'instrument par instrumentation et instrumentalisation (Rabardel).",
      ],
      [
        "Système d'activité",
        "Sujet-Objet-Outil + règles, communauté, division du travail ; lieu de contradictions systémiques (Engeström).",
      ],
      [
        "Les 4 dimensions",
        "Utilité, utilisabilité, intégration socio-organisationnelle, signification identitaire (Bobillier Chaumon).",
      ],
      [
        "Management algorithmique",
        "Prescription du travail déplacée du manager vers le code (scoring, dispatching, surveillance).",
      ],
      [
        "Invisibilisation",
        "Masquage du travail d'articulation et de régulation derrière l'illusion du « clic magique ».",
      ],
      [
        "Capacitant / incapacitant",
        "Boussole du pouvoir de développement de l'outil : autonomie & collectif vs contrôle & déqualification.",
      ],
      [
        "Conception continuée",
        "Le projet IT se poursuit dans l'usage ; rouvrir des espaces de délibération après le déploiement.",
      ],
    ],
  },
];

export function Pst124Page() {
  const { store, bump } = usePstStore("pst124_atelier_v10");
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
      title: "Consolide " + A[weak.ax as keyof typeof A],
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
  } else if (!examS) {
    advice = {
      title: "Passe en conditions réelles",
      text: "Bon niveau ! Entraîne-toi en temps limité sur l'examen blanc et auto-évalue ta copie.",
      btn: "Examen blanc",
      panel: "examen",
      leitner: false,
    };
  } else {
    advice = {
      title: "Travaille la clinique",
      text: "Tu maîtrises les bases. Affûte ton diagnostic sur les études de cas et la rédaction.",
      btn: "Études de cas",
      panel: "cas",
      leitner: false,
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
          streakHint="Reviens chaque jour pour ancrer la clinique de l'usage."
          toolboxTitle="Boîte à Outils d'Excellence"
          toolboxDesc={
            <>
              Visualise la <b>genèse instrumentale</b> (double trajectoire) et
              ordonne les étapes d&apos;une conduite de projet participative.
            </>
          }
          mindmapLabel="Voir la carte mentale"
          protocoleLabel="Ordonner le projet"
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
          hint="Les fiches condensées des 12 séances du cours PST124. Clique pour déplier les détails."
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
          hint="Dictionnaire interactif des concepts fondamentaux des transformations digitales du travail."
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
          hint="Distingue les concepts voisins des transformations digitales pour éviter les amalgames le jour de l'examen."
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
      label: "Simulateur d'intervention ✦",
      content: (
        <Simulateur
          data={SIM}
          hint="Simule une intervention de clinique de l'usage sur le terrain. Adopte la bonne posture et respecte la méthodologie."
        />
      ),
    },
    {
      id: "frise",
      label: "Frise ✦",
      content: (
        <Frise
          data={FRISE_DATA}
          hint="Repères historiques des transformations digitales du travail (des premières automatisations à l'IA)."
        />
      ),
    },
    {
      id: "cas",
      label: "Études de cas ✦",
      content: (
        <Cas
          data={CASES}
          hint="Analyse des cas concrets de transformations digitales en mobilisant les concepts de PST124."
        />
      ),
    },
    {
      id: "mindmap",
      label: "Genèse instrumentale ✦",
      content: (
        <Mindmap
          nodes={NODES}
          defaultKey="artefact"
          hint="Visualisation interactive de la double trajectoire technologique : clique sur un nœud pour observer son rôle dans le développement (ou l'empêchement) de l'activité."
        />
      ),
    },
    {
      id: "protocole",
      label: "Conduite de projet ✦",
      content: (
        <Protocole
          data={PROTO}
          hint="Remets les 7 étapes d'une conduite de projet participative dans le bon ordre."
          referenceExplanation="La trame d'une conduite de projet participative est : 1) Demande & cadrage, 2) Analyse de l'activité réelle, 3) Repérage des contournements, 4) Diagnostic par les 4 dimensions, 5) Espaces de délibération, 6) Transformation de l'outil, 7) Conception continuée dans l'usage."
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
          data={PST124_DEBATS}
          hint="Les 4 grands débats transversaux des transformations digitales pour prendre de la hauteur et structurer tes comparaisons de synthèse à l'examen."
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
          title="PST124 — Transformations digitales & clinique des usages"
          subtitle="Fiche de synthèse d'examen — à reproduire de mémoire"
          groups={PST124_ANTISECHE_GROUPS}
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
          quizTitle="Mini-Quiz : Culture d'ouverture d'élite"
          authors={PST124_BONUS_AUTHORS}
          questions={PST124_BONUS_QUESTIONS}
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
        <FeynmanSandbox store={store} moduleKey="pst124" onStoreChange={bump} />
      ),
    },
  ];

  return (
    <>
      <ModulesNav active="pst124" />
      <header className="top">
        <div className="eyebrow">
          PST124 · Transformations digitales &amp; clinique des usages
        </div>
        <h1>Transformations digitales du travail &amp; clinique des usages</h1>
        <ModuleIntro unitId="pst124">
          Validation&nbsp;:{" "}
          <b>Examen final sur table (2h, sans document) ou dossier à rendre</b>.
          Révise activement les 12 séances du syllabus et le renversement de
          l&apos;acceptabilité vers l&apos;acceptation située
          (Bobillier&nbsp;Chaumon). <b>Règle d&apos;or&nbsp;:</b> une
          technologie n&apos;est jamais évaluée en elle-même, mais à travers ses
          effets sur l&apos;activité, le collectif, l&apos;identité
          professionnelle et le pouvoir d&apos;agir des utilisateurs.
        </ModuleIntro>
        <div className="steps" aria-hidden="true">
          <div className="step s0">
            <b>Artefact</b>
            <span>imposé</span>
          </div>
          <div className="step s1">
            <b>Genèse instrumentale</b>
            <span>appropriation</span>
          </div>
          <div className="step s2">
            <b>Acceptation située</b>
            <span>usage réel</span>
          </div>
          <div className="step s3">
            <b>Pouvoir d&apos;agir</b>
            <span>numérique</span>
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

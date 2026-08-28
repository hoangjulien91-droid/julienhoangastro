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
import { Examen as SharedExamen } from "@/components/pst/modules/shared/panels/Examen";
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
  ANTISECHE_GROUPS,
} from "@/lib/pst/data/pst108";
import { Outils } from "./panels/Outils";

const FICHE_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "dejours", label: "Clot (Clinique du dialogue)" },
  { key: "precurseurs", label: "Vygotski (Instrument psy.)" },
  { key: "molinier", label: "Pragmatique (Bühler/Austin)" },
  { key: "management", label: "Psychanalyse & subjectivité" },
];

const LEXIQUE_FILTERS = [
  { key: "all", label: "Tout" },
  { key: "dejours", label: "Clot" },
  { key: "precurseurs", label: "Vygotski" },
  { key: "molinier", label: "Pragmatique" },
  { key: "management", label: "Psychanalyse" },
];

const CARD_AXES = ["precurseurs", "dejours", "molinier", "management"];
const EXAM_DATE = getExamDateTime("pst108") ?? "";
const EXAM_LABEL = getExamLabel("pst108") ?? "";

const RECITS_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "precurseurs", label: "Langage social" },
  { key: "dejours", label: "Instrument psy." },
  { key: "molinier", label: "Controverse" },
  { key: "management", label: "Pouvoir d'agir" },
];
const RECITS_COLORS: Record<string, string> = {
  precurseurs: "var(--precurseurs)",
  dejours: "var(--dejours)",
  molinier: "var(--molinier)",
  management: "var(--management)",
};

const PST108_BONUS_QUESTIONS: BonusQuestion[] = [
  {
    q: "Pour Mikhaïl Bakhtine, tout énoncé est :",
    opts: [
      "Une production strictement individuelle et solitaire",
      "Orienté vers une réponse et traversé par la voix d'autrui (dialogisme)",
      "Une simple application de règles grammaticales",
    ],
    ok: 1,
    expl: "Le dialogisme : aucune parole n'est neutre ni close ; elle est toujours déjà une réponse adressée, polyphonique.",
  },
  {
    q: "Les six fonctions du langage de Roman Jakobson prolongent surtout :",
    opts: [
      "La théorie de l'organon de Bühler (représentation, expression, appel)",
      "La psychanalyse freudienne",
      "Le management algorithmique",
    ],
    ok: 0,
    expl: "Jakobson raffine Bühler : il ajoute les fonctions phatique, métalinguistique et poétique aux trois fonctions de base.",
  },
  {
    q: "Chez Habermas, l'agir communicationnel se distingue de l'agir stratégique car il vise :",
    opts: [
      "À influencer autrui pour atteindre un but, par tous les moyens",
      "L'intercompréhension par la discussion d'arguments",
      "La performance économique de l'organisation",
    ],
    ok: 1,
    expl: "L'agir communicationnel cherche l'entente sur des prétentions à la validité, là où l'agir stratégique instrumentalise la parole.",
  },
];

const PST108_BONUS_AUTHORS: BonusAuthorCard[] = [
  {
    title: "Mikhaïl Bakhtine — Le dialogisme et la polyphonie",
    color: "var(--sante)",
    body: (
      <>
        Tout énoncé est orienté vers une réponse et traversé par la voix
        d&apos;autrui : aucune parole n&apos;est neutre ni solitaire, elle est
        toujours déjà un dialogue.
        <br />
        <i>Où l&apos;utiliser :</i> Pour fonder la dimension dialogique du
        langage et montrer que la pensée elle-même est polyphonique (lien avec
        Fernyhough et Vygotski).
      </>
    ),
  },
  {
    title: "Roman Jakobson — Les six fonctions du langage",
    color: "var(--precurseurs)",
    body: (
      <>
        Référentielle, émotive, conative, phatique, métalinguistique, poétique :
        tout message combine ces fonctions, prolongeant et raffinant la
        Sprachtheorie de Bühler.
        <br />
        <i>Où l&apos;utiliser :</i> Pour enrichir l&apos;analyse pragmatique
        d&apos;un énoncé de travail (au-delà du seul contenu « référentiel »
        transmis).
      </>
    ),
  },
  {
    title: "Jürgen Habermas — Agir stratégique vs agir communicationnel",
    color: "var(--molinier)",
    body: (
      <>
        L&apos;agir stratégique vise à influencer autrui pour atteindre un but ;
        l&apos;agir communicationnel vise l&apos;intercompréhension par la
        discussion d&apos;arguments.
        <br />
        <i>Où l&apos;utiliser :</i> Pour opposer la « communication »
        managériale instrumentale à la véritable controverse délibérative
        restaurée par le clinicien (lien PST124).
      </>
    ),
  },
];

const PST108_DEBATS: DebatAxis[] = [
  {
    axis: "Axe 1 — Conception du langage",
    title:
      "Le langage-code (transfert d'information) vs Le langage-instrument (médiateur de l'activité)",
    tension:
      "Le modèle télégraphique (émetteur → message → récepteur) réduit la communication à un transfert d'information neutre. Vygotski et Clot montrent au contraire que le langage est un <i>instrument psychologique</i> qui réalise la pensée et médiatise l'activité : parler, c'est agir sur le réel et sur autrui.",
    example:
      "Opposer une note de service vécue comme simple « information descendante » à la même consigne discutée dans un collectif, où la verbalisation transforme l'expérience en savoir et règle de métier partagée.",
    exampleColor: "var(--molinier)",
  },
  {
    axis: "Axe 2 — Destin du dialogue",
    title: "La controverse qui développe vs Le silence qui empêche",
    tension:
      "Toute copie doit s'articuler autour de ces deux trajectoires. Soit la <i>dispute professionnelle</i> sur les critères du travail bien fait relance le genre et le pouvoir d'agir (santé). Soit l'impossibilité de dire le travail produit un <i>silence défensif</i>, une activité empêchée et un silence organisationnel pathogène.",
    example:
      "Démontrer que le suicide ou l'épuisement ne sont pas qu'individuels : ils signent souvent l'atrophie des espaces de controverse où le métier pouvait se débattre collectivement. L'objectif clinique n'est pas un consensus mou mais une controverse saine.",
    exampleColor: "var(--sante)",
  },
  {
    axis: "Axe 3 — Posture du psychologue",
    title:
      "Le facilitateur neutre (fluidifier la communication) vs Le clinicien engagé pour l'activité",
    tension:
      "Le psychologue n'est pas un expert qui livre la solution, ni un « facilitateur » neutre qui fluidifie la communication managériale. Il <i>prend parti pour l'activité</i> : il crée le cadre sécurisant qui permet l'affrontement des points de vue et soutient la reprise du pouvoir d'agir.",
    example:
      "Décrire une auto-confrontation (simple puis croisée) auprès de soignants ou de juges d'instruction : le clinicien n'apaise pas le conflit, il l'organise pour rendre le réel du travail « dicible et discutable ».",
    exampleColor: "var(--management)",
  },
  {
    axis: "Axe 4 — Niveau du dialogue",
    title:
      "Le dialogue intérieur (penser, c'est faire dialoguer des voix) vs Le dialogue social (travailler, c'est faire dialoguer des normes)",
    tension:
      "Pour Vygotski et Fernyhough, la pensée est un dialogue intériorisé : le mot est le carrefour de l'expérience sociale et de l'expérience intime. Mais travailler, c'est aussi faire dialoguer des <i>normes</i> et des critères dans un collectif : la controverse n'est pas seulement intra-psychique, elle est sociale.",
    example:
      "Montrer que relancer la dispute collective sur le « travail bien fait » nourrit aussi le dialogue intérieur de chacun : le genre professionnel devient une ressource pour le style individuel.",
    exampleColor: "var(--precurseurs)",
  },
];

export function Pst108Page() {
  const { store, bump } = usePstStore("pst108_atelier_v10");
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
          streakHint="Reviens chaque jour pour ancrer la matrice dialogique."
          toolboxTitle="Boîte à Outils d'Excellence"
          toolboxDesc={
            <>
              Visualise la <b>matrice dialogique</b> (double trajectoire du
              dialogue) et ordonne les étapes d&apos;une intervention par
              auto-confrontation.
            </>
          }
          mindmapLabel="Voir la carte mentale"
          protocoleLabel="Ordonner l'intervention"
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
          hint="Les fiches condensées du cours PST108 (langage, pensée et activité). Clique pour déplier les détails."
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
          hint="Dictionnaire interactif des concepts fondamentaux du langage comme instrument psychologique et médiateur de l'activité."
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
          hint="Distingue les concepts voisins de la matrice dialogique pour éviter les amalgames le jour de l'examen."
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
      label: "Auto-confrontation ✦",
      content: (
        <Simulateur
          data={SIM}
          hint="Simule une intervention par auto-confrontation. Adopte la bonne posture (ni expert, ni facilitateur neutre) et soutiens la reprise du pouvoir d'agir par la controverse."
        />
      ),
    },
    {
      id: "frise",
      label: "Frise ✦",
      content: (
        <Frise
          data={FRISE_DATA}
          hint="Repères historiques des théories du langage et de l'activité (de la Sprachtheorie de Bühler à la clinique du dialogue de Clot)."
        />
      ),
    },
    {
      id: "cas",
      label: "Études de cas ✦",
      content: (
        <Cas
          data={CASES}
          hint="Analyse des cas concrets de la parole au travail (centre d'appels, soignants, juges d'instruction) en mobilisant la matrice dialogique."
        />
      ),
    },
    {
      id: "mindmap",
      label: "Matrice dialogique ✦",
      content: (
        <Mindmap
          nodes={NODES}
          defaultKey="matiere"
          hint="Visualisation interactive de la double trajectoire du dialogue : clique sur un nœud pour observer son rôle dans le développement (ou l'empêchement) de l'activité."
        />
      ),
    },
    {
      id: "protocole",
      label: "Conduite d'intervention ✦",
      content: (
        <Protocole
          data={PROTO}
          hint="Remets les 7 étapes d'une intervention par auto-confrontation (clinique de l'activité) dans le bon ordre."
          referenceExplanation="La trame d'une intervention par auto-confrontation est : 1) Demande & cadre, 2) Observation de l'activité réelle, 3) Choix des séquences, 4) Auto-confrontation simple, 5) Auto-confrontation croisée, 6) Retour au collectif, 7) Restitution organisationnelle."
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
          data={PST108_DEBATS}
          hint="Les 4 grands débats transversaux sur le langage au travail pour prendre de la hauteur et structurer tes comparaisons de synthèse à l'examen."
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
    { id: "outils", label: "Outils ✦", content: <Outils store={store} /> },
    {
      id: "antiseche",
      label: "Antisèche",
      content: (
        <Antiseche
          title="PST108 — Langage, pensée & activité : la matrice dialogique"
          subtitle="Fiche de synthèse d'examen — à reproduire de mémoire"
          groups={ANTISECHE_GROUPS}
        />
      ),
    },
    {
      id: "examen",
      label: "Examen blanc ✦",
      content: (
        <SharedExamen
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
          authors={PST108_BONUS_AUTHORS}
          questions={PST108_BONUS_QUESTIONS}
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
        <FeynmanSandbox store={store} moduleKey="pst108" onStoreChange={bump} />
      ),
    },
  ];

  return (
    <>
      <ModulesNav active="pst108" />
      <header className="top">
        <div className="eyebrow">PST108 · Langage, pensée et activité</div>
        <h1>
          La matrice dialogique : langage, pensée &amp; activité au travail
        </h1>
        <ModuleIntro unitId="pst108">
          Validation&nbsp;: <b>Dissertation type CNAM</b> sur la place de la
          parole au travail et l&apos;usage du langage par le psychologue.
          Révise la matrice dialogique (Vygotski, Clot, pragmatique,
          psychanalyse). <b>Règle d&apos;or&nbsp;:</b> le langage n&apos;est pas
          un simple code pour transférer de l&apos;information&nbsp;; c&apos;est
          la <b>matière première</b> du psychologue, un instrument psychologique
          d&apos;action sur le réel et le médiateur de l&apos;activité.
        </ModuleIntro>
        <div className="steps" aria-hidden="true">
          <div className="step s0">
            <b>Langage social</b>
            <span>intersubjectivité</span>
          </div>
          <div className="step s1">
            <b>Instrument psychologique</b>
            <span>intériorisation</span>
          </div>
          <div className="step s2">
            <b>Controverse</b>
            <span>sur le métier</span>
          </div>
          <div className="step s3">
            <b>Pouvoir d&apos;agir</b>
            <span>développement du genre</span>
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

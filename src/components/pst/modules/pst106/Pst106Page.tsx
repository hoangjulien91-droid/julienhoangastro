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
import { Fiches } from "@/components/pst/modules/shared/panels/Fiches";
import { Lexique } from "@/components/pst/modules/shared/panels/Lexique";
import { Parcours } from "@/components/pst/modules/shared/panels/Parcours";
import { Cas } from "@/components/pst/modules/shared/panels/Cas";
import { Cloze } from "@/components/pst/modules/shared/panels/Cloze";
import { Distinguer } from "@/components/pst/modules/shared/panels/Distinguer";
import { Simulateur } from "@/components/pst/modules/shared/panels/Simulateur";
import { Mindmap } from "@/components/pst/modules/shared/panels/Mindmap";
import { Redac } from "@/components/pst/modules/shared/panels/Redac";
import { Examen } from "@/components/pst/modules/shared/panels/Examen";
import {
  Bonus,
  type BonusAuthorCard,
  type BonusQuestion,
} from "@/components/pst/modules/shared/panels/Bonus";
import { Recits } from "@/components/pst/modules/shared/panels/Recits";
import {
  A,
  CARTES,
  QCM,
  QUI,
  CASES,
  SIM,
  NODES,
  REDAC,
  RECITS,
  KW_DEFS,
} from "@/lib/pst/data/pst106";
import {
  PIEGES,
  CLOZE,
  DISTINGUER,
  FICHES,
  LEXIQUE,
  BONUS_QUIZ,
  PARCOURS,
} from "@/lib/pst/data/pst106-inline";
import type { ClozeItem, DistinguerGroup } from "@/lib/pst/types";
import { Debats3Way } from "./Debats3Way";
import { Frise106 } from "./Frise106";
import { Atelier106 } from "./Atelier106";
import { Antiseche106 } from "./Antiseche106";
import { Outils106 } from "./Outils106";
import { Protocole106 } from "./Protocole106";
import {
  Dashboard,
  type DashboardAdvice,
} from "@/components/pst/modules/shared/panels/Dashboard";
import { computeAxisRows, weakestAxis } from "@/lib/pst/dashboard-helpers";
import { Dashboard106ExtraCards } from "./Dashboard106ExtraCards";

const FICHES_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "histoire", label: "Histoire/Psychotechnique" },
  { key: "wisner", label: "Wisner (Ergonomie)" },
  { key: "clot", label: "Clot (Clinique)" },
  { key: "dejours", label: "Dejours (Psychodynamique)" },
  { key: "comparer", label: "Comparateur" },
  { key: "methode", label: "Intervention" },
];

const LEXIQUE_FILTERS = [
  { key: "all", label: "Tout" },
  { key: "wisner", label: "Wisner" },
  { key: "clot", label: "Clot" },
  { key: "dejours", label: "Dejours" },
  { key: "histoire", label: "Histoire" },
  { key: "commun", label: "Commun" },
];

const RECITS_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "histoire", label: "Histoire" },
  { key: "wisner", label: "Wisner (Ergonomie)" },
  { key: "clot", label: "Clot (Clinique)" },
  { key: "dejours", label: "Dejours (Psychodynamique)" },
  { key: "comparer", label: "Comparateur" },
];
const RECITS_COLORS: Record<string, string> = {
  histoire: "var(--histoire)",
  wisner: "var(--wisner)",
  clot: "var(--clot)",
  dejours: "var(--dejours)",
  comparer: "var(--accent)",
  methode: "var(--methode)",
  commun: "var(--muted)",
};

const BONUS_AUTHORS: BonusAuthorCard[] = [
  {
    title: "Georges Canguilhem — la normativité",
    color: "var(--accent)",
    body: (
      <>
        La santé n&apos;est pas le simple silence des organes, mais la capacité
        active de créer des normes et d&apos;agir sur son milieu.
        <br />
        <i>Où l&apos;utiliser ?</i> Pour étayer le pouvoir d&apos;agir et la
        santé chez Yves Clot.
      </>
    ),
  },
  {
    title: "Karl Marx — le travail comme transformation",
    color: "var(--clot)",
    body: (
      <>
        L&apos;homme se construit en transformant la matière extérieure par le
        biais d&apos;outils (médiation).
        <br />
        <i>Où l&apos;utiliser ?</i> Pour rappeler les fondements philosophiques
        d&apos;Yves Clot et Lev Vygotski.
      </>
    ),
  },
  {
    title: "Michel Foucault — le corps discipliné",
    color: "var(--dejours)",
    body: (
      <>
        Le Taylorisme et la psychotechnique historique comme instruments de
        discipline et d&apos;assujettissement des corps.
        <br />
        <i>Où l&apos;utiliser ?</i> Dans la critique de la psychotechnique
        positiviste.
      </>
    ),
  },
];

export function Pst106Page() {
  const { store, bump } = usePstStore("pst106_v1");
  const [activeTab, setActiveTab] = useState("accueil");

  useEffect(() => {
    store.recordSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cartes = useMemo(
    () =>
      CARTES.map((c, i) => ({
        id: `pst106_${i}`,
        axis: c[0] as string,
        tag: A[c[0] as keyof typeof A] ?? (c[0] as string),
        q: c[1] as string,
        a: c[2] as string,
        deep: (c[4] as string) ?? "",
        category: c[3] as "coeur" | "bonus",
      })),
    [],
  );

  const qcmData = useMemo(
    () =>
      QCM.map((q) => ({
        q: q[0] as string,
        opts: q[1] as string[],
        correct: q[2] as number,
        exp: q[3] as string,
      })),
    [],
  );

  const piegesData = useMemo(
    () => PIEGES.map((p) => [p[0], p[1], p[2]] as [string, boolean, string]),
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

  const bonusQuestions: BonusQuestion[] = useMemo(
    () =>
      BONUS_QUIZ.filter((b) => b.type === "qcm").map((b) => ({
        q: b.question as string,
        opts: b.options as string[],
        ok: b.correct as number,
        expl: b.explain as string,
      })),
    [],
  );

  const [revisionTrigger, setRevisionTrigger] = useState(0);

  function triggerRevision() {
    setRevisionTrigger((v) => v + 1);
  }

  const axisRows = computeAxisRows(
    cartes.map((c) => ({ id: c.id, axis: c.axis })),
    ["histoire", "wisner", "clot", "dejours"],
    store,
  );
  const weak = weakestAxis(axisRows);
  const masteredCards = cartes.filter((c) => store.getBox(c.id) >= 4).length;
  const qcmS = store.getScore("qcm");

  let advice: DashboardAdvice;
  if (masteredCards < cartes.length * 0.5) {
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
      text: "C'est l'auteur le moins maîtrisé. Refais ses cartes en ciblant, puis teste-toi.",
      btn: "Réviser " + A[weak.ax as keyof typeof A],
      panel: "cartes",
      leitner: false,
    };
  } else if (!qcmS || qcmS.pct < 80) {
    advice = {
      title: "Teste-toi au QCM",
      text: "Tes cartes sont bien avancées. Vérifie au QCM (vise > 80%), le bilan te dira quoi retravailler.",
      btn: "Lancer le QCM",
      panel: "qcm",
      leitner: false,
    };
  } else if (!store.getScore("distinguer")) {
    advice = {
      title: "Travaille les confusions",
      text: "Bon niveau ! Attaque le mode Distinguer : c'est là que se gagnent les points face aux pièges.",
      btn: "Mode Distinguer",
      panel: "distinguer",
      leitner: false,
    };
  } else {
    advice = {
      title: "Passe en conditions réelles",
      text: "Tu maîtrises les bases. Entraîne-toi à structurer une réponse rédigée, ou mets-toi en posture de clinicien dans le Simulateur.",
      btn: "Aller à la Rédaction",
      panel: "redac",
      leitner: false,
    };
  }

  function goTab(panel: string) {
    setActiveTab(panel);
  }

  const tabs: TabDef[] = [
    {
      id: "accueil",
      label: "Accueil ◆",
      content: (
        <div>
          <div
            className="paradigme-banner"
            style={{
              background: "linear-gradient(120deg, var(--clot), var(--accent))",
              color: "#fff",
              borderRadius: "var(--r)",
              padding: "14px 18px",
              marginBottom: 18,
              boxShadow: "var(--shadow)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                opacity: 0.9,
              }}
            >
              Le fil rouge de l&apos;examen
            </div>
            <div
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 19,
                fontWeight: 600,
                margin: "2px 0 4px",
              }}
            >
              Développement → Pouvoir d&apos;agir → Santé
            </div>
            <div style={{ fontSize: 13, opacity: 0.95 }}>
              La santé n&apos;est ni l&apos;absence de maladie ni
              l&apos;adaptation au stress : c&apos;est la capacité à transformer
              son milieu de travail pour y vivre de nouvelles expériences.
            </div>
          </div>
          <Dashboard
            store={store}
            cards={cartes.map((c) => ({ id: c.id, axis: c.axis }))}
            ficheCount={FICHES.length}
            authors={A}
            cardAxes={["histoire", "wisner", "clot", "dejours"]}
            streakHint="Reviens chaque jour pour ancrer la grille clinique."
            toolboxTitle="Boîte à Outils Examen"
            toolboxDesc="Outils pour structurer l'analyse du travail"
            mindmapLabel="Voir la carte mentale"
            protocoleLabel="Lancer le simulateur"
            advice={advice}
            onStoreChange={bump}
            onGoTab={goTab}
            onTriggerRevision={triggerRevision}
            extraCards={<Dashboard106ExtraCards onGoTab={goTab} />}
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
          filters={FICHES_FILTERS}
          hint="L'essentiel de chaque pilier, à relire entre deux sessions. Clique pour déplier."
        />
      ),
    },
    {
      id: "debats",
      label: "Débats",
      content: <Debats3Way store={store} onStoreChange={bump} />,
    },
    {
      id: "recits",
      label: "Récits d'intervention",
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
          authors={A}
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
      content: (
        <Distinguer
          store={store}
          onAnswered={bump}
          data={DISTINGUER as unknown as DistinguerGroup[]}
          hint="Le piège des concepts voisins. Lis l'indice, attribue-le au bon concept : le feedback te donne à chaque fois le critère qui les sépare."
        />
      ),
    },
    {
      id: "cloze",
      label: "Citations",
      content: (
        <Cloze
          data={CLOZE as unknown as ClozeItem[]}
          authors={A}
          hint="Les phrases à savoir placer mot pour mot. Récite le mot manquant à voix haute, puis clique le trou pour vérifier."
        />
      ),
    },
    {
      id: "redac",
      label: "Rédaction",
      content: (
        <Redac
          data={REDAC as unknown as [string, string[], string][]}
          hint="Structure ta réponse rédigée : dévoile le plan, puis compare à la copie modèle."
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
          data={REDAC as unknown as [string, string[], string][]}
          hint="Conditions réelles : un sujet tiré au sort, un chronomètre, une grille d'auto-évaluation."
        />
      ),
    },
    {
      id: "bonus",
      label: "Bonus",
      content: (
        <Bonus
          store={store}
          hint="Ces auteurs ne sont pas au programme de l'examen (le cours n'a traité que Wisner, Clot, Dejours et l'histoire de la discipline). Cependant, citer un prolongement théorique pertinent dans une copie rédigée montre une culture approfondie et peut valoriser ta note (le « glaçage sur le gâteau »)."
          quizTitle="Mini-Quiz d'Entraînement Bonus"
          authors={BONUS_AUTHORS}
          questions={bonusQuestions}
        />
      ),
    },
    {
      id: "antiseche",
      label: "Antisèche",
      content: <Antiseche106 />,
    },
    {
      id: "lexique",
      label: "Lexique",
      content: (
        <Lexique
          data={LEXIQUE}
          filters={LEXIQUE_FILTERS}
          authors={A}
          hint="Le dictionnaire interactif et comparatif des concepts clés de la discipline."
        />
      ),
    },
    {
      id: "outils",
      label: "Boîte à Outils",
      content: <Outils106 store={store} onStoreChange={bump} />,
    },
    {
      id: "simulateur",
      label: "Simulateur ✦",
      content: (
        <Simulateur
          data={SIM}
          hint="Mets-toi en situation d'intervenant clinique de l'activité. Chaque choix impacte ta posture professionnelle."
        />
      ),
    },
    {
      id: "frise",
      label: "Frise du travail ✦",
      content: <Frise106 />,
    },
    {
      id: "cas",
      label: "Cas cliniques ✦",
      content: (
        <Cas
          data={CASES}
          hint="Des vignettes cliniques courtes. Identifie le concept central, puis la meilleure réponse d'intervention."
        />
      ),
    },
    {
      id: "mindmap",
      label: "Carte mentale ✦",
      content: (
        <Mindmap
          nodes={NODES}
          hint="Explore les liens entre les concepts clés de la discipline. Clique un nœud pour voir ses connexions."
          defaultKey="prescrit"
        />
      ),
    },
    {
      id: "protocole",
      label: "Protocole d'intervention ✦",
      content: <Protocole106 />,
    },
    {
      id: "atelier",
      label: "Atelier d'écriture ✦",
      content: <Atelier106 />,
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
          examDate={getExamDateTime("pst106") ?? ""}
          examLabel={getExamLabel("pst106") ?? ""}
          hint="Une feuille de route pour orchestrer tes révisions jusqu'à l'examen — la phase du moment est mise en avant."
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
        <FeynmanSandbox store={store} moduleKey="pst106" onStoreChange={bump} />
      ),
    },
  ];

  return (
    <>
      <ModulesNav active="pst106" />
      <header className="top">
        <div className="eyebrow">
          PST106 · Clinique de l&apos;activité et psychologie du travail
        </div>
        <h1>Clinique de l&apos;activité &amp; psychologie du travail</h1>
        <ModuleIntro unitId="pst106">
          Examen :{" "}
          <b>
            Clinique de l&apos;activité, psychodynamique du travail, ergonomie
            et histoire
          </b>
          . Enrichi des méthodologies d&apos;intervention (autoconfrontation) et
          concepts fondamentaux (genre, style, réel de l&apos;activité,
          reconnaissance, souffrance). Réponds <b>de mémoire</b>, marque
          honnêtement, rejoue tes ratées.
        </ModuleIntro>
        <div className="steps" aria-hidden="true">
          <div className="step s0">
            <b>Histoire</b>
            <span>psychotechnique</span>
          </div>
          <div className="step s1">
            <b>Wisner</b>
            <span>ergonomie</span>
          </div>
          <div className="step s2">
            <b>Clot</b>
            <span>clinique</span>
          </div>
          <div className="step s3">
            <b>Dejours</b>
            <span>souffrance</span>
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

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
} from "@/lib/pst/data/pst123";
import { Cloze } from "./Cloze";
import { Distinguer } from "./Distinguer";
import { Simulateur } from "./Simulateur";
import { Mindmap } from "./Mindmap";
import { Exam } from "./Exam";
import { Outils } from "./Outils";

const FICHE_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "deontologie", label: "Déontologie" },
  { key: "mandat", label: "Mandat" },
  { key: "triangulation", label: "Triangulation" },
  { key: "transitions", label: "Transitions" },
  { key: "rps", label: "RPS" },
];
const LEXIQUE_FILTERS = FICHE_FILTERS;
const RECITS_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "deontologie", label: "Déontologie" },
  { key: "mandat", label: "Le Mandat" },
  { key: "evaluation", label: "L'Évaluation" },
  { key: "sante", label: "Santé au Travail" },
];
const RECITS_COLORS: Record<string, string> = {
  deontologie: "var(--deontologie)",
  mandat: "var(--mandat)",
  triangulation: "var(--triangulation)",
  transitions: "var(--transitions)",
  rps: "var(--rps)",
  evaluation: "var(--triangulation)",
  sante: "var(--sante)",
};
const QUI_AUTHORS = {
  positiviste: "Lahy / Psychotechnicien",
  clinicien: "Psychologue clinicien",
  rh: "Manager / Consultant RH",
  medecin: "Médecin du travail",
};
const CARD_AXES = [
  "deontologie",
  "mandat",
  "triangulation",
  "transitions",
  "rps",
];
const EXAM_DATE = getExamDateTime("pst123") ?? "";
const EXAM_LABEL = getExamLabel("pst123") ?? "";

const PST123_DEBATS: DebatAxis[] = [
  {
    axis: "Axe 1 — Méthodologie RPS",
    title:
      "Approche Quantitative (Karasek/RPS) vs Approche Qualitative (Clinique du travail réel)",
    tension:
      "L'approche quantitative cartographie le job strain par questionnaire. Elle est utile mais insuffisante pour expliquer la subjectivité et le <i>pourquoi</i> des souffrances. L'analyse clinique qualitative appréhende le travail réel par des entretiens et observations.",
    example:
      "Souligner qu'un diagnostic RPS ne peut se limiter à administrer le questionnaire de Karasek ; le psychologue doit négocier des entretiens individuels/collectifs pour interpréter les indicateurs.",
    exampleColor: "var(--rps)",
  },
  {
    axis: "Axe 2 — Accompagnement du Changement",
    title: "Change Management (RH classique) vs Clinique du Changement",
    tension:
      "Le Change Management RH cherche à forcer l'acceptation des salariés et à minimiser la résistance. Le psychologue clinicien du travail analyse les impacts réels du projet sur le geste professionnel, l'identité de métier et accompagne le processus de deuil professionnel.",
    example:
      "Expliquer que la résistance à l'introduction d'un nouveau logiciel RH n'est pas une « peur irrationnelle du changement », mais une défense légitime contre la dégradation de la qualité du travail.",
    exampleColor: "var(--transitions)",
  },
  {
    axis: "Axe 3 — Accompagnement des transitions",
    title: "Bilan de Compétences (Clinique) vs Matching de CV (Adaptation)",
    tension:
      "L'approche purement marchande du bilan cherche à aligner mécaniquement des savoir-faire à des fiches de poste. Le psychologue mène le bilan comme un espace clinique de transition, centré sur la subjectivité du salarié, ses crises, ses ruptures et son pouvoir d'agir sur son avenir.",
    example:
      "Rédiger que le bilan de compétences sert d'abord à restaurer l'estime de soi d'un travailleur usé par le chômage, plutôt qu'à le placer sur un poste à tout prix.",
    exampleColor: "var(--mandat)",
  },
  {
    axis: "Axe 4 — Positionnement d'Expert",
    title: "L'Expertise CSE : Neutralité scientifique vs Enjeux politiques",
    tension:
      "Mandaté par les représentants du personnel (CSE) face à la direction, le psychologue expert est dans une posture d'équilibriste. Il doit maintenir une stricte indépendance méthodologique et scientifique, sans devenir le porte-voix des syndicats ni l'instrument de la direction.",
    example:
      "Argumenter que les conclusions d'une expertise CSE reposent sur des observations rigoureuses et des faits cliniques objectivés, rendant le rapport inattaquable.",
    exampleColor: "var(--deontologie)",
  },
];

const PST123_BONUS_QUESTIONS: BonusQuestion[] = [
  {
    q: "Comment Georges Canguilhem définit-il le normal ?",
    opts: [
      "L'alignement sur une moyenne statistique mesurable",
      "La normativité, soit la capacité du sujet à créer de nouvelles normes",
      "L'absence objective de maladie somatique",
    ],
    ok: 1,
    expl: "Canguilhem définit la santé comme la normativité, la capacité à instituer de nouvelles normes face au milieu changeant.",
  },
  {
    q: "Chez Hannah Arendt, à quoi correspond l'Animal Laborans ?",
    opts: [
      "Au travail de subsistance biologique, lié à la consommation et au cycle naturel",
      "À la fabrication d'objets artificiels durables",
      "À l'action collective et à l'exercice de la citoyenneté",
    ],
    ok: 0,
    expl: "L'Animal Laborans effectue le travail cyclique de survie, distinct de l'Homo Faber (œuvre) et de la politique (action).",
  },
  {
    q: "Axel Honneth active la reconnaissance autour de :",
    opts: [
      "La productivité économique et la rentabilité financière",
      "Trois sphères : l'amour (confiance), le droit (respect) et l'estime sociale (solidarité)",
      "L'obéissance hiérarchique et le respect des cadences prescrites",
    ],
    ok: 1,
    expl: "Pour Honneth, l'identité se construit à travers ces trois sphères de la reconnaissance morale et sociale.",
  },
];

const PST123_BONUS_AUTHORS: BonusAuthorCard[] = [
  {
    title: "Axel Honneth — La lutte pour la reconnaissance",
    color: "var(--sante)",
    body: (
      <>
        Théorise les trois sphères de la reconnaissance (amour, droit, estime
        sociale). La blessure morale et le mépris social surviennent lorsque ces
        sphères sont bafouées.
        <br />
        <i>Où l&apos;utiliser :</i> Pour approfondir l&apos;exigence de
        reconnaissance dans l&apos;évaluation professionnelle et le bilan de
        compétences.
      </>
    ),
  },
  {
    title: "Michel Foucault — Surveiller et punir / Le Biopouvoir",
    color: "var(--mandat)",
    body: (
      <>
        Décrit la normalisation des corps et les technologies de pouvoir. La
        psychotechnique historique comme outil de discipline et
        d&apos;assujettissement.
        <br />
        <i>Où l&apos;utiliser :</i> Pour critiquer l&apos;usage dévoyé des tests
        psychométriques ou les algorithmes de GPEC comme purs outils
        disciplinaires de tri social.
      </>
    ),
  },
  {
    title: "Georges Canguilhem — Le normal et le pathologique",
    color: "var(--triangulation)",
    body: (
      <>
        La santé n&apos;est pas le respect d&apos;une moyenne statistique, mais
        la normativité, soit la capacité du sujet à créer de nouvelles normes
        face au milieu.
        <br />
        <i>Où l&apos;utiliser :</i> Pour critiquer les barèmes standardisés de
        RPS et revaloriser l&apos;activité clinique.
      </>
    ),
  },
];

const PST123_ANTISECHE_GROUPS = [
  {
    sectionTitle:
      "① La tension déontologique fondamentale (Fil rouge de l'examen)",
    headers: [
      "Axe de tension",
      "La Demande Sociale / Institutionnelle",
      "La Déontologie & Indépendance du Psychologue",
    ],
    rows: [
      [
        "Acteur clé",
        "Le Prescripteur (DRH, Direction générale, CSE)",
        "Le Psychologue clinicien (Titre protégé loi 1985)",
      ],
      [
        "Objectif premier",
        "Productivité, adaptation, gestion comptable (matching)",
        "But assigné éthique, préservation de la santé mentale",
      ],
      [
        "Méthodologie",
        "Indicateurs quantitatifs RPS, change management classique",
        "Négociation du mandat contractuel, entretiens cliniques",
      ],
      [
        "Règle de donnée",
        "Rapports nominatifs, tableaux de bord de performance",
        "Secret professionnel partagé, consentement RGPD",
      ],
    ],
  },
  {
    sectionTitle: "② Les 5 Questions Réflexes de l'Étude de Cas",
    headers: [
      "Question",
      "Enjeu clinique et déontologique pour le psychologue",
    ],
    rows: [
      [
        "1. Qui demande ?",
        "Identifier l'émetteur de la demande (DRH, CSE, Salarié) pour situer son agenda.",
      ],
      [
        "2. Qui paie ?",
        "Révéler les rapports de force et structurer la triangulation clinique.",
      ],
      [
        "3. Qui est concerné ?",
        "S'assurer du recueil écrit du consentement libre et éclairé des sujets.",
      ],
      [
        "4. Quelles infos restituer ?",
        "Respecter le secret professionnel et appliquer le droit d'accès et d'oubli.",
      ],
      [
        "5. Quels effets sur la santé ?",
        "Vérifier que le but assigné est éthique (prévention primaire vs tri social).",
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
              Consulte la <b>carte mentale du double parcours</b> de la posture
              professionnelle ou ordonne le protocole d&apos;enquête.
            </>
          }
          mindmapLabel="Carte mentale"
          protocoleLabel="Protocole d'enquête"
          advice={advice}
          onStoreChange={bump}
          onGoTab={goTab}
          onTriggerRevision={triggerRevision}
          extraCards={
            <div
              className="qcard"
              style={{
                borderLeft: "4px solid var(--sante)",
                marginBottom: 18,
                padding: "18px 20px",
              }}
            >
              <h3 style={{ marginTop: 0, fontSize: 15, color: "var(--sante)" }}>
                Révision active recommandée
              </h3>
              <p
                style={{ fontSize: 13.5, margin: "0 0 12px", lineHeight: 1.5 }}
              >
                Entraîne-toi sur le <b>simulateur d&apos;examen blanc</b> ou
                lance une session de <b>récits interactifs</b>.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  className="btn solid small"
                  onClick={() => goTab("exam")}
                >
                  Passer l&apos;Examen Blanc
                </button>
                <button className="btn small" onClick={() => goTab("recits")}>
                  Récits interactifs
                </button>
              </div>
            </div>
          }
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
          hint="Les fiches condensées du cours PST123. Clique pour déplier les détails."
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
          hint="Dictionnaire interactif des concepts fondamentaux de la posture et de la déontologie."
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
          title="PST123 — Le Psychologue, le Travail et l'Emploi"
          subtitle="Fiche de synthèse d'examen — à reproduire de mémoire"
          groups={PST123_ANTISECHE_GROUPS}
        />
      ),
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
          quizTitle="🎯 Mini-Quiz : Culture d'Ouverture d'Élite"
          authors={PST123_BONUS_AUTHORS}
          questions={PST123_BONUS_QUESTIONS}
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
        <FeynmanSandbox store={store} moduleKey="pst123" onStoreChange={bump} />
      ),
    },
  ];

  return (
    <>
      <ModulesNav active="pst123" />
      <header className="top">
        <div className="eyebrow">PST123 · Posture &amp; Déontologie</div>
        <h1>Le psychologue, le travail et l&apos;emploi</h1>
        <ModuleIntro unitId="pst123">
          Validation&nbsp;:{" "}
          <b>
            Examen final sur table (Étude de cas professionnel, analyse de
            demande ou dissertation)
          </b>
          . Révise activement les 14 séances du syllabus et la tension centrale
          entre demande sociale et déontologie. <b>Consigne critique&nbsp;:</b>{" "}
          démontrer une posture clinique rigoureuse scientifique, en gérant la
          triangulation et en contractualisant le mandat.
        </ModuleIntro>
        <div className="steps" aria-hidden="true">
          <div className="step s0">
            <b>Cadre Légal</b>
            <span>Loi 1985 &amp; ADELI</span>
          </div>
          <div className="step s1">
            <b>Triangulation</b>
            <span>Prescripteur/Sujet/Psy</span>
          </div>
          <div className="step s2">
            <b>Le Mandat</b>
            <span>Reformuler la demande</span>
          </div>
          <div className="step s3">
            <b>Déontologie</b>
            <span>Indépendance &amp; Secret</span>
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

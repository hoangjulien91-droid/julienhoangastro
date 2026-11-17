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
import { Distinguer } from "@/components/pst/modules/shared/panels/Distinguer";
import { Cloze } from "@/components/pst/modules/shared/panels/Cloze";
import { Redac } from "@/components/pst/modules/shared/panels/Redac";
import { Simulateur } from "@/components/pst/modules/shared/panels/Simulateur";
import { Frise } from "@/components/pst/modules/shared/panels/Frise";
import { Cas } from "@/components/pst/modules/shared/panels/Cas";
import { Mindmap } from "@/components/pst/modules/shared/panels/Mindmap";
import { Protocole } from "@/components/pst/modules/shared/panels/Protocole";
import { Atelier108 } from "./Atelier108";
import { ActivitesDistantes108 } from "./panels/ActivitesDistantes108";
import { RessourcesEnseignants108 } from "./panels/RessourcesEnseignants108";
import { SimulateurNegociationIOD } from "./panels/SimulateurNegociationIOD";
import { DecodeurLinguistique108 } from "./panels/DecodeurLinguistique108";
import { Parcours } from "@/components/pst/modules/shared/panels/Parcours";
import { Examen108 } from "@/components/pst/modules/pst108/panels/Examen108";
import type { Pst108ProfId } from "@/lib/pst/data/pst108-annales";
import { Debats } from "@/components/pst/modules/shared/panels/Debats";
import { Bonus } from "@/components/pst/modules/shared/panels/Bonus";
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
  REDAC_ITEMS,
  RECITS,
  SIM,
  ATELIER_SUJETS,
  ANTISECHE_GROUPS,
} from "@/lib/pst/data/pst108";
import {
  FICHE_FILTERS,
  LEXIQUE_FILTERS,
  CARD_AXES,
  RECITS_FILTERS,
  RECITS_COLORS,
  PST108_BONUS_QUESTIONS,
  PST108_BONUS_AUTHORS,
  PST108_DEBATS,
} from "@/lib/pst/data/pst108-page-data";
import { Outils } from "./panels/Outils";
import { CoursPst108 } from "./panels/CoursPst108";
import { Dashboard108ExtraCards } from "./Dashboard108ExtraCards";
import { SeancesCoursPanel } from "@/components/pst/modules/shared/panels/SeancesCoursPanel";
import { GalerieVisuellePanel } from "@/components/pst/modules/shared/panels/GalerieVisuellePanel";
import { TrainingHubPanel } from "@/components/pst/modules/shared/panels/TrainingHubPanel";

const EXAM_DATE = getExamDateTime("pst108") ?? "";
const EXAM_LABEL = getExamLabel("pst108") ?? "";

export function Pst108Page() {
  const { store, bump } = usePstStore("pst108_atelier_v10");
  const [activeTab, setActiveTab] = useState("accueil");
  const [examProf, setExamProf] = useState<Pst108ProfId>("lucy");
  const [revisionTrigger, setRevisionTrigger] = useState(0);

  useEffect(() => {
    store.recordSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase();
      if (
        hash.includes("seance") ||
        hash.includes("cours") ||
        hash.includes("pst108-s")
      ) {
        setActiveTab("seances");
      }
    }
    function handleSelectSeance() {
      setActiveTab("seances");
    }
    window.addEventListener("pst:select-seance", handleSelectSeance);
    return () =>
      window.removeEventListener("pst:select-seance", handleSelectSeance);
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
        q: (f as any).q || f.t,
        deep: f.ess,
        ex: f.ex,
        trap: f.trap,
      })),
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
  const examS = store.getScore("examen");

  let advice: DashboardAdvice;
  if (masteredCards < cards.length * 0.5) {
    advice = {
      title: "Commence par les cartes",
      text: "Passe les concepts de Bourdieu, Habermas, Honneth et Valls en répétition espacée Leitner.",
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
      text: "Vérifie tes connaissances sur les 5 piliers du cours d'Éric Lucy et Francis Valls.",
      btn: "Lancer le QCM",
      panel: "qcm",
      leitner: false,
    };
  } else if (!examS) {
    advice = {
      title: "Passe en conditions réelles",
      text: "Entraîne-toi sur une dissertation type CNAM (Bourdieu, Habermas, Honneth, IOD) avec auto-évaluation.",
      btn: "Examen blanc",
      panel: "examen",
      leitner: false,
    };
  } else {
    advice = {
      title: "Entraîne-toi sur les cas réels",
      text: "Maîtrise la négociation IOD et les situations concrètes de communication au travail.",
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
        <div>
          <Dashboard108ExtraCards onGoTab={goTab} />
          <Dashboard
            store={store}
            cards={cards}
            ficheCount={FICHES.length}
            authors={A}
            cardAxes={CARD_AXES}
            streakHint="Reviens chaque jour pour ancrer la psychologie du langage, la clinique du dialogue et la méthode IOD."
            toolboxTitle="Boîte à Outils d'Excellence PST108"
            toolboxDesc={
              <>
                Explore la <b>cartographie conceptuelle</b> (Bourdieu, Habermas,
                Honneth, IOD) et ordonne les étapes méthodologiques d&apos;une{" "}
                <b>intervention IOD en entreprise</b>.
              </>
            }
            mindmapLabel="Voir la cartographie"
            protocoleLabel="Ordonner l'intervention IOD"
            advice={advice}
            onStoreChange={bump}
            onGoTab={goTab}
            onTriggerRevision={triggerRevision}
          />
        </div>
      ),
    },
    {
      id: "fiches",
      label: "Cours (3 Profs) ✦",
      content: (
        <CoursPst108
          store={store}
          onStoreChange={bump}
          onGoTab={goTab}
          onLaunchExam={(prof) => {
            setExamProf(prof);
            setActiveTab("examen");
          }}
        />
      ),
    },
    {
      id: "seances",
      label: "Séances & Retranscriptions ✦",
      content: <SeancesCoursPanel moduleKey="pst108" onGoTab={goTab} />,
    },
    {
      id: "schemas",
      label: "Galerie Visuelle (SVG) ✦",
      content: <GalerieVisuellePanel moduleKey="pst108" />,
    },
    {
      id: "lexique",
      label: "Lexique",
      content: (
        <Lexique
          data={LEXIQUE}
          filters={LEXIQUE_FILTERS}
          authors={A}
          hint="Dictionnaire interactif des 38 concepts fondamentaux de la psychologie du langage, de la clinique du dialogue et de la méthode IOD."
        />
      ),
    },
    {
      id: "ressources",
      label: "Ressources profs ✦",
      content: <RessourcesEnseignants108 />,
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
      id: "entrainement",
      label: "Quiz & Entraînement",
      content: (
        <TrainingHubPanel
          modes={[
            {
              id: "qcm",
              label: "QCM",
              shortLabel: "QCM",
              count: QCM_DATA.length,
              content: <Qcm store={store} data={QCM_DATA} onAnswered={bump} />,
            },
            {
              id: "qui",
              label: "Qui a dit quoi ?",
              shortLabel: "Citations",
              count: QUI.length,
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
              shortLabel: "Pièges",
              count: PIEGES.length,
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
              shortLabel: "Distinguer",
              count: DISTINGUER.length,
              content: (
                <Distinguer
                  store={store}
                  onAnswered={bump}
                  data={DISTINGUER as never}
                  hint="Distingue les concepts majeurs (agir stratégique vs communicationnel, pouvoir symbolique vs acte de langage, employabilité vs méthode IOD, etc.)."
                />
              ),
            },
            {
              id: "cloze",
              label: "Citations à trous",
              shortLabel: "À trous",
              count: CLOZE.length,
              content: (
                <Cloze
                  data={CLOZE as never}
                  authors={A}
                  hint="Retiens les formules exactes des auteurs (Bourdieu, Habermas, Honneth, Castra & Valls). Clique sur chaque trou pour révéler le terme attendu."
                />
              ),
            },
          ]}
        />
      ),
    },
    {
      id: "redac",
      label: "Rédaction",
      content: (
        <Redac
          data={REDAC_ITEMS as never}
          hint="Entraîne-toi sur les 12 sujets rédigés types de dissertation et d'annales (Bourdieu/Austin, Habermas, Honneth, IOD Castra & Valls, Insulte Éric Lucy, France Télécom). Réplique les plans et étudie les corrigés rédigés."
        />
      ),
    },
    {
      id: "simulateur",
      label: "Cas IOD ✦",
      content: (
        <Simulateur
          data={SIM}
          hint="Simule une négociation IOD en entreprise : refuse le tri préalable, négocie sur les contraintes concrètes du poste et sécurise l'intégration sans stigmatisation."
        />
      ),
    },
    {
      id: "iod",
      label: "Simulateur Valls ✦",
      content: <SimulateurNegociationIOD />,
    },
    {
      id: "langage",
      label: "Décodeur Langage ✦",
      content: <DecodeurLinguistique108 />,
    },
    {
      id: "frise",
      label: "Frise ✦",
      content: (
        <Frise
          data={FRISE_DATA}
          hint="Repères historiques des théories de la communication et de l'action (de Bühler 1934 et Austin 1962 à Bourdieu 1982, Habermas 1981, Honneth 1992 et l'approche IOD 2007)."
        />
      ),
    },
    {
      id: "cas",
      label: "Études de cas ✦",
      content: (
        <Cas
          data={CASES}
          hint="Analyse des cas concrets de communication professionnelle (SAMU social par É. Lucy, insulte en équipe, négociation de poste IOD, controverse délibérative)."
        />
      ),
    },
    {
      id: "mindmap",
      label: "Cartographie conceptuelle ✦",
      content: (
        <Mindmap
          nodes={NODES}
          defaultKey="bourdieu"
          hint="Cartographie interactive des 5 piliers du cours : clique sur un nœud pour observer ses ramifications théoriques et pratiques."
        />
      ),
    },
    {
      id: "protocole",
      label: "Démarche d'intervention IOD ✦",
      content: (
        <Protocole
          data={PROTO}
          hint="Remets les 7 étapes d'une démarche d'intervention IOD (Francis Valls & Denis Castra) dans le bon ordre méthodologique."
          referenceExplanation="La démarche IOD suit rigoureusement 7 étapes : 1) Prise de contact entreprise, 2) Visite de poste & analyse du travail réel, 3) Négociation des conditions d'accueil, 4) Mise en relation directe sans tri préalable, 5) Entretien d'embauche médiatisé, 6) Intégration sur le poste de travail, 7) Suivi bilatéral durable salarié-entreprise."
        />
      ),
    },
    {
      id: "atelier",
      label: "Annales & Atelier ✦",
      content: <Atelier108 />,
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
          hint="Ton plan de révision d'excellence structuré en 4 étapes pour dominer l'épreuve de PST108."
        />
      ),
    },
    {
      id: "ad",
      label: "Activités Distantes (AD) ✦",
      content: <ActivitesDistantes108 />,
    },
    {
      id: "debats",
      label: "Débats",
      content: (
        <Debats
          store={store}
          onStoreChange={bump}
          data={PST108_DEBATS}
          hint="Les 4 grands débats transversaux sur la communication au travail pour prendre de la hauteur et structurer tes dissertations à l'examen."
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
    { id: "outils", label: "Outils ✦", content: <Outils store={store} /> },
    {
      id: "antiseche",
      label: "Antisèche",
      content: (
        <Antiseche
          title="PST108 — Psychologie du langage et clinique du dialogue"
          subtitle="Fiche de synthèse d'examen — Vygotski, Piaget, Bourdieu, Habermas, Honneth & Valls"
          groups={ANTISECHE_GROUPS}
        />
      ),
    },
    {
      id: "examen",
      label: "Examen blanc 3×1h ✦",
      content: (
        <Examen108
          store={store}
          onStoreChange={bump}
          initialProf={examProf}
        />
      ),
    },
    {
      id: "bonus",
      label: "Bonus",
      content: (
        <Bonus
          store={store}
          hint="Auteurs d'ouverture théorique (Sarah Hanley, Robert Castel, Sapir-Whorf, Noam Chomsky) pour enrichir et singulariser votre copie d'examen."
          quizTitle="Mini-Quiz : Culture d'ouverture d'élite"
          authors={PST108_BONUS_AUTHORS}
          questions={PST108_BONUS_QUESTIONS}
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
        <FeynmanSandbox store={store} moduleKey="pst108" onStoreChange={bump} />
      ),
    },
  ];

  return (
    <>
      <ModuleLivePill unitId="pst108" />
      <header className="top">
        <div className="eyebrow">
          PST108 · Psychologie du langage et clinique du dialogue · V. MAROT,
          É. LUCY &amp; F. VALLS (Cnam)
        </div>
        <h1>Psychologie du langage et clinique du dialogue</h1>
        <ModuleIntro unitId="pst108">
          Validation&nbsp;:{" "}
          <b>
            Examen final sur table de 3h00 (divisé en 3 sous-épreuves de 1h00 :
            M. Éric LUCY 1h00 · M. Francis VALLS 1h00 · Mme Véronique MAROT
            1h00)
          </b>
          . Révise activement chaque sous-épreuve dispensée par{" "}
          <b>Mme Véronique MAROT</b> (Vygotski vs Piaget, Golse &amp; Bion,
          clinique du dialogue, sosie &amp; autoconfrontation, psychosociologie
          Abric/Lewin, 4 défenses, Moscovici, Razran 1950 &amp; Porter),{" "}
          <b>M. Éric LUCY</b> (critique d&apos;Austin par <b>Pierre Bourdieu</b>
          , acte d&apos;institution &amp; lit de justice de <b>Sarah Hanley</b>,
          insulte en revue <i>Empan</i>, agir communicationnel de{" "}
          <b>Jürgen Habermas</b>, reconnaissance d&apos;<b>Axel Honneth</b> et
          SAMU social) et <b>M. Francis VALLS</b> (contrat de Ghiglione,
          incommunication de Wolton, conflits de rôle de Kahn, ethnométhodologie
          de Garfinkel, justice chez Dubet, <b>Erving Goffman</b> Scène/Coulisses/Face/Stigmate,
          et méthode <b>IOD</b> sans tri préalable).{" "}
          <b>Consigne d&apos;excellence&nbsp;:</b> gérer 1h00 chrono par
          enseignant en définissant systématiquement les concepts avant de les
          articuler sur le cas ou le sujet.
        </ModuleIntro>
        <div className="steps" aria-hidden="true">
          <div className="step s0">
            <b>Théories du langage</b>
            <span>Vygotski / Marot</span>
          </div>
          <div className="step s1">
            <b>Pouvoir symbolique</b>
            <span>Bourdieu / Lucy</span>
          </div>
          <div className="step s2">
            <b>Délibération &amp; Éthique</b>
            <span>Habermas / Honneth</span>
          </div>
          <div className="step s3">
            <b>Méthode IOD</b>
            <span>Valls &amp; Castra</span>
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

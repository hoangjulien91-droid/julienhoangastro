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
import { Debats } from "@/components/pst/modules/shared/panels/Debats";
import { Bonus } from "@/components/pst/modules/shared/panels/Bonus";
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
import { Dashboard123ExtraCards } from "./Dashboard123ExtraCards";
import {
  CARD_AXES,
  FICHE_FILTERS,
  LEXIQUE_FILTERS,
  PST123_ANTISECHE_GROUPS,
  PST123_BONUS_AUTHORS,
  PST123_BONUS_QUESTIONS,
  PST123_DEBATS,
  QUI_AUTHORS,
  RECITS_COLORS,
  RECITS_FILTERS,
} from "@/lib/pst/data/pst123-page-data";
import { Cloze } from "./Cloze";
import { Distinguer } from "./Distinguer";
import { Simulateur } from "./Simulateur";
import { Mindmap } from "./Mindmap";
import { Exam } from "./Exam";
import { Outils } from "./Outils";
import { Atelier123 } from "./Atelier123";
import { RessourcesEnseignants123 } from "./panels/RessourcesEnseignants123";
import { MatriceDubarSainsaulieu } from "./panels/MatriceDubarSainsaulieu";
import { TribunalDeonto123 } from "./panels/TribunalDeonto123";
import { AnnotateurRecitVie123 } from "./panels/AnnotateurRecitVie123";
import { ActivitesDistantes123 } from "./panels/ActivitesDistantes123";
import { SeancesCoursPanel } from "@/components/pst/modules/shared/panels/SeancesCoursPanel";
import { GalerieVisuellePanel } from "@/components/pst/modules/shared/panels/GalerieVisuellePanel";
import { TrainingHubPanel } from "@/components/pst/modules/shared/panels/TrainingHubPanel";

const EXAM_DATE = getExamDateTime("pst123") ?? "";
const EXAM_LABEL = getExamLabel("pst123") ?? "";

export function Pst123Page() {
  const { store, bump } = usePstStore("pst123_atelier_v10");
  const [activeTab, setActiveTab] = useState("accueil");
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
        hash.includes("pst123-s")
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
      FICHES.map((f, i) => {
        const rawQ = (f as any).q || f.t;
        const formattedQ = rawQ.endsWith("?")
          ? rawQ
          : `Quels sont les concepts clés, la thèse doctrinale et les apports fondamentaux de : ${rawQ} ?`;
        return {
          id: "fc_" + i,
          axis: f.a,
          tag: A[f.a as keyof typeof A] ?? f.a,
          a: f.ph,
          q: formattedQ,
          deep: f.ess,
          ex: (f as any).ex,
          trap: (f as any).trap,
        };
      }),
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
          <Dashboard123ExtraCards onGoTab={goTab} />
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
      id: "seances",
      label: "Séances & Cours ✦",
      content: <SeancesCoursPanel moduleKey="pst123" onGoTab={goTab} />,
    },
    {
      id: "schemas",
      label: "Galerie Visuelle (SVG) ✦",
      content: <GalerieVisuellePanel moduleKey="pst123" />,
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
      id: "entrainement",
      label: "Quiz & Entraînement",
      content: (
        <TrainingHubPanel
          modes={[
            {
              id: "qcm",
              label: "QCM",
              shortLabel: "QCM",
              count: qcmData.length,
              content: <Qcm store={store} data={qcmData} onAnswered={bump} />,
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
                  authors={QUI_AUTHORS}
                  onAnswered={bump}
                />
              ),
            },
            {
              id: "pieges",
              label: "Pièges V/F",
              shortLabel: "Pièges",
              count: piegesData.length,
              content: (
                <Pieges store={store} data={piegesData} onAnswered={bump} />
              ),
            },
            {
              id: "distinguer",
              label: "Distinguer",
              shortLabel: "Distinguer",
              content: <Distinguer store={store} onAnswered={bump} />,
            },
            {
              id: "cloze",
              label: "Citations à trous",
              shortLabel: "À trous",
              content: <Cloze />,
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
      id: "deonto",
      label: "Tribunal Déonto ✦",
      content: <TribunalDeonto123 />,
    },
    {
      id: "biographie",
      label: "Récits de Vie ✦",
      content: <AnnotateurRecitVie123 />,
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
          title="PST123 — Le psychologue, le travail et l'emploi (E. Lucy)"
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
      id: "ad",
      label: "Activités Distantes (AD) ✦",
      content: <ActivitesDistantes123 />,
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
          PST123 · 2026 - 2027 Semestre 1 · Élisabeth LUCY (Cnam)
        </div>
        <h1>Le psychologue, le travail et l&apos;emploi</h1>
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

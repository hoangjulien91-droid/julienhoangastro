"use client";

import { useEffect, useMemo, useState } from "react";
import { Compass } from "lucide-react";
import { usePstStore } from "@/lib/pst/use-pst-store";
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
import { Atelier } from "@/components/pst/modules/shared/panels/Atelier";
import { Parcours } from "@/components/pst/modules/shared/panels/Parcours";
import { Debats } from "@/components/pst/modules/shared/panels/Debats";
import { Bonus } from "@/components/pst/modules/shared/panels/Bonus";
import { Recits } from "@/components/pst/modules/shared/panels/Recits";
import { RessourcesEnseignants120 } from "./panels/RessourcesEnseignants120";
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
import { TrainingHubPanel } from "@/components/pst/modules/shared/panels/TrainingHubPanel";

import {
  FICHE_FILTERS,
  LEXIQUE_FILTERS,
  RECITS_FILTERS,
  RECITS_COLORS,
  CARD_AXES,
  EXAM_DATE,
  EXAM_LABEL,
  PST120_DEBATS,
  PST120_BONUS_QUESTIONS,
  PST120_BONUS_AUTHORS,
  PST120_ANTISECHE_GROUPS,
} from "@/lib/pst/data/pst120-page-data";

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
        <div>
          {/* Fil conducteur de l'examen Cnam PST120 */}
          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-indigo-500/25 shadow-xs mb-4 space-y-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5 shadow-2xs">
                <Compass className="size-3 text-indigo-600 dark:text-indigo-400" />
                <span>Fil conducteur de l&apos;examen Cnam</span>
              </span>
              <span className="text-[10px] font-mono font-semibold text-muted-foreground uppercase">
                PST120 · Psychodynamique du Travail
              </span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold tracking-tight text-foreground m-0">
                Réel du travail → Métis &amp; Coopération → Reconnaissance &amp;
                Sublimation
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed m-0">
                La souffrance naît de la résistance du réel. Selon
                l&apos;organisation du travail, elle bascule soit vers la
                pathologie et les stratégies défensives, soit vers la santé par
                l&apos;intelligence pratique (Métis), la délibération collective
                et les jugements d&apos;utilité et de beauté (Dejours).
              </p>
            </div>
          </div>
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
                Consulte le <b>Double Parcours</b> de la souffrance et ordonne
                les étapes de l&apos;enquête clinique.
              </>
            }
            mindmapLabel="Voir la carte mentale"
            protocoleLabel="Ordonner l'enquête"
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
          hint="Les fiches condensées des 14 séances du cours PST120. Clique pour déplier les détails."
        />
      ),
    },
    {
      id: "ressources",
      label: "Ressources profs ✦",
      content: <RessourcesEnseignants120 />,
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
                  hint="Distingue les concepts voisins de la psychodynamique pour éviter les amalgames le jour de l'examen."
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
                  hint="Retiens les formules exactes des auteurs. Clique sur chaque trou pour révéler le terme attendu."
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
          quizTitle="Mini-Quiz : Culture d'Ouverture d'Élite"
          authors={PST120_BONUS_AUTHORS}
          questions={PST120_BONUS_QUESTIONS}
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
        <FeynmanSandbox store={store} moduleKey="pst120" onStoreChange={bump} />
      ),
    },
  ];

  return (
    <>
      <ModuleLivePill unitId="pst120" />
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

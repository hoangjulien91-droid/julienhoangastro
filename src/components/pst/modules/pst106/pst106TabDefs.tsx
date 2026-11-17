"use client";

import type { TabDef } from "@/components/pst/shell/TabsShell";
import type { PstStore } from "@/lib/pst/store";
import type { DashboardAdvice } from "@/components/pst/modules/shared/panels/Dashboard";
import { Dashboard } from "@/components/pst/modules/shared/panels/Dashboard";
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
import { Bonus, type BonusQuestion } from "@/components/pst/modules/shared/panels/Bonus";
import { Recits } from "@/components/pst/modules/shared/panels/Recits";
import { SeancesCoursPanel } from "@/components/pst/modules/shared/panels/SeancesCoursPanel";
import { GalerieVisuellePanel } from "@/components/pst/modules/shared/panels/GalerieVisuellePanel";
import { TrainingHubPanel } from "@/components/pst/modules/shared/panels/TrainingHubPanel";
import { Debats3Way } from "./Debats3Way";
import { ActivitesDistantes106 } from "./panels/ActivitesDistantes106";
import { Frise106 } from "./Frise106";
import { Atelier106 } from "./Atelier106";
import { Antiseche106 } from "./Antiseche106";
import { Outils106 } from "./Outils106";
import { Protocole106 } from "./Protocole106";
import { Dashboard106ExtraCards } from "./Dashboard106ExtraCards";
import { RessourcesEnseignants106 } from "./panels/RessourcesEnseignants106";
import { LaboDiagnostic106 } from "./panels/LaboDiagnostic106";
import { SimulateurAutoconfrontation106 } from "./panels/SimulateurAutoconfrontation106";
import {
  A,
  QUI,
  CASES,
  SIM,
  NODES,
  REDAC,
  RECITS,
  KW_DEFS,
  ANNALES_REDAC_ITEMS,
} from "@/lib/pst/data/pst106";
import {
  CLOZE,
  DISTINGUER,
  FICHES,
  LEXIQUE,
} from "@/lib/pst/data/pst106-inline";
import type { ClozeItem, DistinguerGroup } from "@/lib/pst/types";
import { getExamDateTime, getExamLabel } from "@/lib/pst/planning-stats";
import {
  FICHES_FILTERS,
  LEXIQUE_FILTERS,
  RECITS_FILTERS,
  RECITS_COLORS,
  BONUS_AUTHORS,
} from "@/lib/pst/data/pst106-page-data";

export interface Pst106TabDefParams {
  store: PstStore;
  bump: () => void;
  goTab: (panel: string) => void;
  triggerRevision: () => void;
  revisionTrigger: number;
  cartes: Array<{
    id: string;
    axis: string;
    tag: string;
    q: string;
    a: string;
    deep: string;
    category: "coeur" | "bonus";
  }>;
  qcmData: Array<{
    q: string;
    opts: string[];
    correct: number;
    exp: string;
  }>;
  piegesData: [string, boolean, string][];
  parcoursData: Array<{
    id: string;
    title: string;
    fenetre: string;
    desc: string;
    onglets: [string, string][];
    items: string[];
  }>;
  bonusQuestions: BonusQuestion[];
  advice: DashboardAdvice;
}

export function getPst106TabDefs({
  store,
  bump,
  goTab,
  triggerRevision,
  revisionTrigger,
  cartes,
  qcmData,
  piegesData,
  parcoursData,
  bonusQuestions,
  advice,
}: Pst106TabDefParams): TabDef[] {
  return [
    {
      id: "accueil",
      label: "Accueil ◆",
      content: (
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
      id: "seances",
      label: "Séances & Cours ✦",
      content: <SeancesCoursPanel moduleKey="pst106" onGoTab={goTab} />,
    },
    {
      id: "schemas",
      label: "Galerie Visuelle (SVG) ✦",
      content: <GalerieVisuellePanel moduleKey="pst106" />,
    },
    {
      id: "ressources",
      label: "Ressources profs ✦",
      content: <RessourcesEnseignants106 />,
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
                  authors={A}
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
              count: DISTINGUER.length,
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
              label: "Citations à trous",
              shortLabel: "À trous",
              count: CLOZE.length,
              content: (
                <Cloze
                  data={CLOZE as unknown as ClozeItem[]}
                  authors={A}
                  hint="Les phrases à savoir placer mot pour mot. Récite le mot manquant à voix haute, puis clique le trou pour vérifier."
                />
              ),
            },
          ]}
        />
      ),
    },
    {
      id: "redac",
      label: "Rédaction (Dissertation)",
      content: (
        <Redac
          data={REDAC as unknown as [string, string[], string][]}
          hint="Option A de l'examen officiel : structure ta dissertation dialectique en dévoilant le plan pas à pas, puis compare à la copie modèle (10 sujets disponibles)."
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
          data={
            [...REDAC, ...ANNALES_REDAC_ITEMS] as unknown as [
              string,
              string[],
              string,
            ][]
          }
          hint="Simulation en conditions réelles : tirage au sort parmi les 10 dissertations (Option A) et les 8 annales avec texte (Option B). Chronomètre 30 min, brouillon et grille d'auto-évaluation."
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
      id: "diagnostic",
      label: "Diagnostic 106 ✦",
      content: <LaboDiagnostic106 />,
    },
    {
      id: "autoconfrontation",
      label: "Autoconfrontation ✦",
      content: <SimulateurAutoconfrontation106 />,
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
      label: "Annales & Atelier ✦",
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
      id: "ad",
      label: "Activités Distantes (AD) ✦",
      content: <ActivitesDistantes106 />,
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
        <FeynmanSandbox store={store} moduleKey="pst106" onStoreChange={bump} />
      ),
    },
  ];
}

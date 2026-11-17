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
import { Frise } from "@/components/pst/modules/shared/panels/Frise";
import { Parcours } from "@/components/pst/modules/shared/panels/Parcours";
import { Debats } from "@/components/pst/modules/shared/panels/Debats";
import { Bonus } from "@/components/pst/modules/shared/panels/Bonus";
import { Recits } from "@/components/pst/modules/shared/panels/Recits";
import { Antiseche } from "@/components/pst/modules/shared/panels/Antiseche";
import { Cas } from "@/components/pst/modules/shared/panels/Cas";
import { Protocole } from "@/components/pst/modules/shared/panels/Protocole";
import { Redac } from "@/components/pst/modules/shared/panels/Redac";
import { SeancesCoursPanel } from "@/components/pst/modules/shared/panels/SeancesCoursPanel";
import { GalerieVisuellePanel } from "@/components/pst/modules/shared/panels/GalerieVisuellePanel";
import { TrainingHubPanel } from "@/components/pst/modules/shared/panels/TrainingHubPanel";
import {
  A,
  CASES,
  FICHES,
  KW_DEFS,
  LEXIQUE,
  PROTO,
  PROTO_REFERENCE_EXPLANATION,
  QUI,
  RECITS,
  REDAC_ITEMS,
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
import { getExamDateTime, getExamLabel } from "@/lib/pst/planning-stats";

const EXAM_DATE = getExamDateTime("pst123") ?? "";
const EXAM_LABEL = getExamLabel("pst123") ?? "";

export interface Pst123TabDefParams {
  store: PstStore;
  bump: () => void;
  goTab: (panel: string) => void;
  triggerRevision: () => void;
  revisionTrigger: number;
  cards: Array<{ id: string; axis: string }>;
  cartes: Array<{
    id: string;
    axis: string;
    tag: string;
    a: string;
    q: string;
    deep: string;
    ex: any;
    trap: any;
  }>;
  qcmData: Array<{
    q: string;
    opts: string[];
    correct: number;
    exp: string;
  }>;
  piegesData: [string, boolean, string][];
  friseData: Array<{ annee: string; titre: string; desc: string }>;
  parcoursData: Array<{
    id: string;
    title: string;
    fenetre: string;
    desc: string;
    onglets: [string, string][];
    items: string[];
  }>;
  advice: DashboardAdvice;
}

export function getPst123TabDefs({
  store,
  bump,
  goTab,
  triggerRevision,
  revisionTrigger,
  cards,
  cartes,
  qcmData,
  piegesData,
  friseData,
  parcoursData,
  advice,
}: Pst123TabDefParams): TabDef[] {
  return [
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
}

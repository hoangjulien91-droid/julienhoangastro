"use client";

import { Compass } from "lucide-react";
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
import { Outils } from "./Outils";
import { TrainingHubPanel } from "@/components/pst/modules/shared/panels/TrainingHubPanel";
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

export interface Pst120TabDefParams {
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
  }>;
  advice: DashboardAdvice;
}

export function getPst120TabDefs({
  store,
  bump,
  goTab,
  triggerRevision,
  revisionTrigger,
  cards,
  cartes,
  advice,
}: Pst120TabDefParams): TabDef[] {
  return [
    {
      id: "accueil",
      label: "Accueil ◆",
      content: (
        <div className="space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-rose-500/25 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 inline-flex items-center gap-1.5 shadow-2xs">
                <Compass className="size-3 text-rose-600 dark:text-rose-400" />
                <span>Fil conducteur de l&apos;examen Cnam PST120</span>
              </span>
              <span className="text-[10px] font-mono font-semibold text-muted-foreground uppercase">
                Cnam Paris · Équipe Clinique
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
}

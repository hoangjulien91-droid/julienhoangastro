"use client";

import { useState, useEffect } from "react";
import {
  Compass,
  Layers,
  Calendar,
  BookOpen,
} from "lucide-react";
import { computeGlobalStats, INDEX } from "@/lib/pst/hub-stats";
import { NextEventCard } from "./NextEventCard";
import { ExamCountdownCard } from "./ExamCountdownCard";
import { DailyWorkoutCard } from "./DailyWorkoutCard";
import { StatsCards } from "./StatsCards";
import { ActivityHeatmap } from "./ActivityHeatmap";
import { ModulePortalGrid } from "./ModulePortalGrid";
import { GlossarySearch } from "./GlossarySearch";
import { ConceptGraphSvg } from "./ConceptGraphSvg";
import { GlobalTimeline } from "./GlobalTimeline";
import { MatriceCourantsTheoriques } from "./MatriceCourantsTheoriques";
import { PstTodoListWidget } from "./PstTodoListWidget";
import { PstKanbanPipeline } from "./PstKanbanPipeline";
import { PstUrgentAlertsBanner } from "./PstUrgentAlertsBanner";
import { CockpitQuickActionBar } from "./CockpitQuickActionBar";
import { PstCockpitModals } from "./PstCockpitModals";

function openModal(eventName: string) {
  window.dispatchEvent(new CustomEvent(eventName));
}

function openWorkshop(moduleId: string) {
  window.dispatchEvent(
    new CustomEvent("pst:open-workshop-slideover", { detail: { moduleId } }),
  );
}

export function PstCockpitHub() {
  const [stats, setStats] = useState(() => computeGlobalStats());

  useEffect(() => {
    const refreshStats = () => setStats(computeGlobalStats());
    refreshStats();

    window.addEventListener("pst:storage-updated", refreshStats);
    window.addEventListener("storage", refreshStats);
    return () => {
      window.removeEventListener("pst:storage-updated", refreshStats);
      window.removeEventListener("storage", refreshStats);
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Barre d'accès direct et de raccourcis rapides */}
      <CockpitQuickActionBar onOpenModal={openModal} />

      {/* ========================================================================= */}
      {/* NIVEAU 1 — AUJOURD'HUI (Décision Immédiate < 3s)                          */}
      {/* ========================================================================= */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-wider font-semibold text-muted-foreground">
              Niveau 1 · Aujourd'hui (Priorités Immédiates)
            </span>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">
            Séances &amp; Mémorisation SM-2
          </span>
        </div>

        {/* 0. Bandeau de Veille Opérationnelle & Alertes (Parité AlertesUrgentes IKERKETA) */}
        <PstUrgentAlertsBanner
          stats={stats}
          onOpenBriefing30s={() => openModal("pst:open-briefing-30s")}
          onOpenMemoireStudio={() => openModal("pst:open-memoire-studio")}
          onOpenExamSimulator={() => openModal("pst:open-exam-simulator")}
        />

        {/* 1. Prochaine séance immédiate */}
        <NextEventCard />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* 2. Session quotidienne d'entraînement SM-2 */}
          <DailyWorkoutCard />

          {/* 3. Échéancier des examens CNAM */}
          <ExamCountdownCard />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* NIVEAU 2 — CETTE SEMAINE (Pilotage Hebdomadaire < 15s)                    */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider font-semibold text-muted-foreground">
            Niveau 2 · Cette Semaine (Indicateurs, Assiduité &amp; Livrables)
          </span>
          <span className="text-[11px] font-mono text-muted-foreground">
            Objectif Titre RNCP 7
          </span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
          {/* Colonne gauche : 4 Indicateurs Clés + Heatmap */}
          <div className="xl:col-span-7 card p-5 bg-card/90 border border-border rounded-2xl shadow-xs">
            <StatsCards stats={stats} />
            <div className="mt-4 pt-4 border-t border-border/80">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold block mb-2">
                Série d'assiduité &amp; Révisions quotidiennes :
              </span>
              <ActivityHeatmap activeDays={stats.activeDays} />
            </div>
          </div>

          {/* Colonne droite : Pilotage des Livrables & Objectifs Académiques (TodoList CRM) */}
          <div className="xl:col-span-5">
            <PstTodoListWidget />
          </div>
        </div>

        {/* Suivi Kanban des UE & Livrables RNCP 7 (Parité Pipeline CRM IKERKETA) */}
        <div id="kanban-pipeline">
          <PstKanbanPipeline
            onInspectWorkshop={(id) => openWorkshop(id)}
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* NIVEAU 3 — SURVEILLANCE DOCTRINALE & VOS 5 ATELIERS PST (< 1m)            */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="size-4 text-accent" />
            <h2 className="text-base font-serif font-bold text-foreground m-0">
              Niveau 3 · Vos 5 Ateliers de Psychologie du Travail
            </h2>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            5 Unités d'Enseignement
          </span>
        </div>

        {/* Grille des 5 Ateliers avec trigger Inspecter */}
        <ModulePortalGrid
          allStats={stats.allStats}
          onInspect={(id) => openWorkshop(id)}
        />
      </section>

      {/* ========================================================================= */}
      {/* MATRICE DOCTRINALE COMPARATIVE DES 5 COURANTS                             */}
      {/* ========================================================================= */}
      <section className="space-y-4" id="matrice-doctrinale">
        <MatriceCourantsTheoriques />
      </section>

      {/* ========================================================================= */}
      {/* CARTOGRAPHIE DES CONCEPTS & CHRONOLOGIE HISTORIQUE                        */}
      {/* ========================================================================= */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        id="carte-concepts"
      >
        {/* Carte des concepts inter-modules */}
        <div className="card p-5 bg-card/90 border border-border rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Compass className="size-4 text-accent" />
            <h3 className="text-sm font-serif font-bold text-foreground m-0">
              Carte des concepts inter-modules
            </h3>
          </div>
          <p className="text-xs text-muted-foreground m-0">
            Les passerelles théoriques circulant entre la clinique de
            l'activité, la psychodynamique et l'ergonomie.
          </p>
          <ConceptGraphSvg />
        </div>

        {/* Chronologie des courants théoriques */}
        <div className="card p-5 bg-card/90 border border-border rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-accent" />
            <h3 className="text-sm font-serif font-bold text-foreground m-0">
              Chronologie des courants théoriques
            </h3>
          </div>
          <p className="text-xs text-muted-foreground m-0">
            Repères historiques : de la psychotechnique originelle à la clinique
            contemporaine du travail.
          </p>
          <GlobalTimeline />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GLOSSAIRE UNIFIÉ                                                          */}
      {/* ========================================================================= */}
      <section className="space-y-3" id="glossaire">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="size-4 text-accent" />
            <h2 className="text-base font-serif font-bold text-foreground m-0">
              Glossaire Doctrinal Unifié
            </h2>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            {INDEX.glossaire.length} termes indexés
          </span>
        </div>
        <GlossarySearch />
      </section>

      <PstCockpitModals />
    </div>
  );
}

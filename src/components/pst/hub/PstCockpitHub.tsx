"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Compass,
  BarChart2,
  Layers,
  GraduationCap,
  Calendar,
  Search,
  BookOpen,
  ArrowRight,
  Flame,
  Download,
  Info,
  Database,
  Scale,
  Clock,
  Zap,
  FileSignature,
  BookMarked,
  FileText,
  ShieldAlert,
  Briefcase,
  ClipboardList,
  Award,
  Mail,
} from "lucide-react";
import { Link } from "@/components/common/Link";
import { computeGlobalStats, INDEX } from "@/lib/pst/hub-stats";
import { NextEventCard } from "./NextEventCard";
import { ExamCountdownCard } from "./ExamCountdownCard";
import { CurriculumPyramidCard } from "./CurriculumPyramidCard";
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
import { downloadIcs } from "@/lib/pst/ics-export";
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
  const [mobileShortcutTab, setMobileShortcutTab] = useState<"nav" | "studios">(
    "nav",
  );
  const [showDesktopStudios, setShowDesktopStudios] = useState(false);

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
      {/* ========================================================================= */}
      {/* BARRE DE RACCOURCIS RAPIDES COCKPIT (Barre d'Accès Direct Modulaire)     */}
      {/* ========================================================================= */}
      <div className="flex flex-col gap-2.5 p-3 sm:p-4 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xs">
        {/* Sélecteur compact responsive (Mobile) */}
        <div className="flex sm:hidden p-1 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 mb-1">
          <button
            type="button"
            onClick={() => setMobileShortcutTab("nav")}
            className={`flex-1 py-1 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
              mobileShortcutTab === "nav"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xs"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <Compass className="size-3 text-amber-500" />
            <span>Navigation</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileShortcutTab("studios")}
            className={`flex-1 py-1 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
              mobileShortcutTab === "studios"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xs"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <Zap className="size-3 text-indigo-500" />
            <span>Studios (10)</span>
          </button>
        </div>

        {/* Rangée 1 : Navigation principale & Actions */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${mobileShortcutTab === "studios" ? "hidden sm:flex" : "flex"}`}
        >
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 scrollbar-none text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px] font-bold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
              NAV :
            </span>

            {/* 1. Planning & Frise */}
            <Link
              href="/pst/planning/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 hover:bg-amber-500/20 border border-amber-500/25 transition-all active:scale-95 shadow-2xs shrink-0"
            >
              <Calendar className="size-3.5" />
              <span>Planning</span>
            </Link>

            {/* 2. Pyramide RNCP 7 */}
            <Link
              href="/pst/#pyramide"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/25 transition-all active:scale-95 shadow-2xs shrink-0"
            >
              <GraduationCap className="size-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Pyramide RNCP 7</span>
              <span className="px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-[10px] font-mono">
                120 ECTS
              </span>
            </Link>

            {/* 3. Matrice Doctrinale */}
            <a
              href="#matrice-doctrinale"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 transition-all active:scale-95 shrink-0"
            >
              <Scale className="size-3.5" />
              <span>Matrice 5 Courants</span>
            </a>

            {/* 4. Glossaire unifié */}
            <a
              href="#glossaire"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 transition-all active:scale-95 shrink-0"
            >
              <BookOpen className="size-3.5" />
              <span>Glossaire ({INDEX.glossaire.length})</span>
            </a>
          </div>

          {/* Action création / export / backup */}
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 scrollbar-none shrink-0">
            <button
              type="button"
              onClick={() => setShowDesktopStudios((v) => !v)}
              aria-expanded={showDesktopStudios}
              className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all active:scale-95 cursor-pointer shrink-0 ${
                showDesktopStudios
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                  : "bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border-indigo-500/25 hover:bg-indigo-500/20"
              }`}
              title="Afficher ou masquer la barre des 10 Studios Cliniques"
            >
              <Zap className="size-3.5" />
              <span>Studios (10)</span>
            </button>

            <button
              type="button"
              onClick={() => openModal("pst:open-disaster-recovery")}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 transition-all active:scale-95 cursor-pointer shrink-0"
              title="Sauvegarde et restauration globale du stockage local"
            >
              <Database className="size-3.5" />
              <span className="hidden sm:inline">Backup</span>
            </button>

            <button
              type="button"
              onClick={() => openModal("pst:open-command-palette")}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 transition-all active:scale-95 cursor-pointer shrink-0 shadow-2xs"
              title="Ouvrir la palette de commandes (⌘K)"
            >
              <Search className="size-3.5" />
              <span>Palette</span>
              <kbd className="px-1 rounded-md bg-slate-200/80 dark:bg-slate-700 text-[10px]">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={downloadIcs}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-amber-700 dark:text-amber-400 hover:bg-amber-500/10 border border-amber-500/30 transition-all active:scale-95 cursor-pointer shrink-0 shadow-2xs"
              title="Télécharger l'agenda des cours au format iCalendar"
            >
              <Download className="size-3.5" />
              <span>.ics</span>
            </button>
          </div>
        </div>

        {/* Deuxième rangée : Studios Cliniques & Outils Exécutifs (dépliable sur desktop pour dégager Niveau 1) */}
        <div
          className={`pt-2 border-t border-slate-200/70 dark:border-slate-800/80 items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 scrollbar-none text-xs ${
            mobileShortcutTab === "studios" ? "flex" : "hidden"
          } ${showDesktopStudios ? "sm:flex" : "sm:hidden"}`}
        >
          <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px] font-bold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-indigo-500" />
            STUDIOS :
          </span>

          {/* Briefing 30s */}
          <button
            type="button"
            onClick={() => openModal("pst:open-briefing-30s")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 hover:bg-amber-500/20 border border-amber-500/25 transition-all active:scale-95 shadow-2xs cursor-pointer shrink-0"
          >
            <Zap className="size-3.5 text-amber-600 dark:text-amber-400" />
            <span>Briefing 30s</span>
          </button>

          {/* Studio Mémoire & Pre-Defense Guard */}
          <button
            type="button"
            onClick={() => openModal("pst:open-memoire-studio")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 hover:bg-indigo-500/20 border border-indigo-500/25 transition-all active:scale-95 shadow-2xs cursor-pointer shrink-0"
          >
            <FileText className="size-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Studio Mémoire RNCP 7</span>
          </button>

          {/* Actes & Protocoles Cliniques */}
          <button
            type="button"
            onClick={() => openModal("pst:open-clinical-protocols")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/25 transition-all active:scale-95 shadow-2xs cursor-pointer shrink-0"
          >
            <FileSignature className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Actes &amp; Protocoles</span>
          </button>

          {/* Coffre Bibliographique APA 7 */}
          <button
            type="button"
            onClick={() => openModal("pst:open-biblio-vault")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-purple-500/10 text-purple-800 dark:text-purple-300 hover:bg-purple-500/20 border border-purple-500/25 transition-all active:scale-95 shadow-2xs cursor-pointer shrink-0"
          >
            <BookMarked className="size-3.5 text-purple-600 dark:text-purple-400" />
            <span>Coffre APA 7</span>
          </button>

          {/* Audit Déontologique 2021 */}
          <button
            type="button"
            onClick={() => openModal("pst:open-deonto-audit")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-800 dark:text-rose-300 hover:bg-rose-500/20 border border-rose-500/25 transition-all active:scale-95 shadow-2xs cursor-pointer shrink-0"
          >
            <ShieldAlert className="size-3.5 text-rose-600 dark:text-rose-400" />
            <span>Audit Déonto</span>
          </button>

          {/* Banque de Cas Cliniques Corrigés */}
          <button
            type="button"
            onClick={() => openModal("pst:open-clinical-cases")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/25 transition-all active:scale-95 shadow-2xs cursor-pointer shrink-0"
          >
            <Briefcase className="size-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Cas Cliniques</span>
          </button>

          {/* Carnet de Terrain & Dictée Vocale */}
          <button
            type="button"
            onClick={() => openModal("pst:open-field-journal")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-teal-500/10 text-teal-800 dark:text-teal-300 hover:bg-teal-500/20 border border-teal-500/25 transition-all active:scale-95 shadow-2xs cursor-pointer shrink-0"
          >
            <ClipboardList className="size-3.5 text-teal-600 dark:text-teal-400" />
            <span>Chronique &amp; Dictée</span>
          </button>

          {/* Simulateur Grand Jury Soutenance Orale RNCP 7 */}
          <button
            type="button"
            onClick={() => openModal("pst:open-oral-defense")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 hover:bg-amber-500/20 border border-amber-500/25 transition-all active:scale-95 shadow-2xs cursor-pointer shrink-0"
          >
            <Award className="size-3.5 text-amber-600 dark:text-amber-400" />
            <span>Soutenance Jury</span>
          </button>

          {/* Courriers & Communications d'Intervention */}
          <button
            type="button"
            onClick={() => openModal("pst:open-intervention-comms")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-accent/10 text-accent hover:bg-accent/20 border border-accent/25 transition-all active:scale-95 shadow-2xs cursor-pointer shrink-0"
          >
            <Mail className="size-3.5 text-accent" />
            <span>Courriers Terrain</span>
          </button>

          {/* Examen Blanc Chronométré */}
          <button
            type="button"
            onClick={() => openModal("pst:open-exam-simulator")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-800 dark:text-rose-300 hover:bg-rose-500/20 border border-rose-500/25 transition-all active:scale-95 shadow-2xs cursor-pointer shrink-0"
          >
            <Flame className="size-3.5 text-rose-600 dark:text-rose-400" />
            <span>Examen Blanc</span>
          </button>
        </div>
      </div>

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

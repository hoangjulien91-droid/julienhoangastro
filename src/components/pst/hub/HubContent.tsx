"use client";

import {
  Compass,
  BarChart2,
  Layers,
  BookOpen,
  History,
  Sparkles,
  Zap,
  GraduationCap,
  Headphones,
  HeartHandshake,
  Command,
} from "lucide-react";
import React, { useMemo, type ReactNode } from "react";
import { Link } from "@/components/common/Link";
import { computeGlobalStats, INDEX } from "@/lib/pst/hub-stats";
import { ModulesNav } from "@/components/pst/shell/ModulesNav";
import { AnneauxRevisionPst } from "@/components/pst/study-tools/AnneauxRevisionPst";
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

interface AppleSectionHeaderProps {
  id?: string;
  eyebrow: string;
  title: string;
  badge?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

function AppleSectionHeader({
  id,
  eyebrow,
  title,
  badge,
  icon: Icon,
}: AppleSectionHeaderProps) {
  return (
    <div id={id} className="scroll-mt-24 mb-4 mt-10 first:mt-6">
      <div className="flex items-center gap-1.5 text-[10px] font-mono font-black tracking-widest text-amber-600 dark:text-amber-400 uppercase">
        <span className="size-1.5 rounded-full bg-amber-500 inline-block animate-pulse" />
        <span>{eyebrow}</span>
      </div>
      <div className="flex items-center justify-between gap-3 mt-1.5 flex-wrap">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5 m-0 border-0 p-0">
          {Icon && (
            <span className="p-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 inline-flex items-center justify-center shrink-0">
              <Icon className="size-4 sm:size-5" />
            </span>
          )}
          <span>{title}</span>
        </h2>
        {badge && (
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 shrink-0">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

const QUICK_ACTIONS = [
  {
    id: "palais",
    title: "Palais Mémoire",
    subtitle: "Tri-Module 18/20",
    icon: Compass,
    color: "from-purple-500/20 to-purple-600/20 text-purple-700 dark:text-purple-300 border-purple-500/30",
    event: "pst:open-palais-memoire",
  },
  {
    id: "schemas",
    title: "11 Schémas SVG",
    subtitle: "Matrices & Cloze",
    icon: Layers,
    color: "from-cyan-500/20 to-cyan-600/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
    event: "pst:open-schemas",
  },
  {
    id: "frise",
    title: "Frise Histoire",
    subtitle: "1880 — 2026",
    icon: History,
    color: "from-emerald-500/20 to-emerald-600/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    event: "pst:open-chronologie",
  },
  {
    id: "blindtest",
    title: "Blind-Test",
    subtitle: "Audio & Citations",
    icon: Headphones,
    color: "from-violet-500/20 to-violet-600/20 text-violet-700 dark:text-violet-300 border-violet-500/30",
    event: "pst:open-blind-test",
  },
  {
    id: "speedrun",
    title: "Speed-Run 60s",
    subtitle: "Chrono Réflexe",
    icon: Zap,
    color: "from-amber-500/20 to-amber-600/20 text-amber-700 dark:text-amber-300 border-amber-500/30",
    event: "pst:open-speed-run",
  },
  {
    id: "sujets",
    title: "Sujets 18/20",
    subtitle: "Dissertations & Plans",
    icon: GraduationCap,
    color: "from-indigo-500/20 to-indigo-600/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
    event: "pst:open-sujets-dissertation",
  },
];

export function HubContent() {
  // Recomputed once on mount (client-only, reads localStorage across all
  // modules) — snapshot client.
  const stats = useMemo(() => computeGlobalStats(), []);

  return (
    <div className="pb-[100px]">
      <ModulesNav active="hub" />

      {/* Apple-like Glass Cockpit Hero — iOS S-Tier+ avec Activity Rings & Quick Action Dock */}
      <div className="mt-5 sm:mt-7 mb-6 p-5 sm:p-7 rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-white/90 via-white/80 to-amber-500/10 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-amber-500/15 border border-slate-200/90 dark:border-slate-800/90 backdrop-blur-2xl shadow-sm relative overflow-hidden">
        {/* Lueur subtile en arrière-plan */}
        <div className="absolute -top-24 -right-24 size-96 bg-gradient-to-br from-amber-400/20 via-orange-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider shadow-xs">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Cockpit PST · Master Psychologie CNAM</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                RNCP 7 · Bac+5
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight m-0">
              Centre de Pilotage des Ateliers
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl m-0 leading-relaxed font-medium">
              Supervision unifiée de tes 5 UE (PST106 à PST124), répétition espacée SM-2, glossaire de {INDEX.glossaire.length} concepts, 11 schémas vectoriels SVG et calendrier officiel synchronisé.
            </p>
          </div>

          {/* Anneaux d'Activité Apple Watch intégrés dans le Cockpit */}
          <div className="flex items-center gap-3 shrink-0 self-start lg:self-center">
            <div className="p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
              <AnneauxRevisionPst />
            </div>
            <Link
              href="/pst/#pyramide"
              className="px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-all active:scale-95 cursor-pointer shadow-2xs hidden sm:inline-flex"
            >
              Cursus RNCP
            </Link>
          </div>
        </div>

        {/* Palette Tactile iOS Quick Actions Dock (Apple Springboard Launcher) */}
        <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800/80 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest font-extrabold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Sparkles className="size-3 text-amber-600 dark:text-amber-400" />
              <span>Palette Tactile iOS · Outils d&apos;Excellence</span>
            </span>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("pst:open-command-palette"))}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 cursor-pointer active:scale-95 transition-all"
            >
              <Command className="size-3" />
              <span>Cmd+K</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {QUICK_ACTIONS.map((action) => {
              const ActionIcon = action.icon;
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent(action.event))}
                  className="group flex flex-col items-start p-3 rounded-2xl bg-white/75 dark:bg-slate-800/75 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:shadow-md transition-all active:scale-95 cursor-pointer text-left"
                >
                  <div
                    className={`p-2 rounded-xl bg-gradient-to-br ${action.color} border mb-2 flex items-center justify-center transition-transform group-hover:scale-105`}
                  >
                    <ActionIcon className="size-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate w-full">
                    {action.title}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate w-full font-medium">
                    {action.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 1. Prochaine séance immédiate */}
      <NextEventCard />

      {/* 2. Session quotidienne d'entraînement SM-2 (si cartes dues) */}
      <DailyWorkoutCard />

      {/* 3. Échéancier des examens CNAM */}
      <ExamCountdownCard />

      {/* 4. Pyramide du Cursus RNCP 7 CNAM */}
      <CurriculumPyramidCard />

      {/* 5. Glossaire unifié */}
      <AppleSectionHeader
        id="glossaire"
        eyebrow="INDEX UNIFIÉ & DICTIONNAIRE MULTI-MODULES"
        title="Glossaire Transversal Unifié"
        badge={`${INDEX.glossaire.length} définitions`}
        icon={BookOpen}
      />
      <GlossarySearch />

      {/* 6. Carte des concepts inter-modules */}
      <AppleSectionHeader
        id="concepts"
        eyebrow="TOPOLOGIE DES CONTROVERSES & LIENS THÉORIQUES"
        title="Carte des Concepts Inter-Modules"
        badge="Graphe Relationnel"
        icon={Compass}
      />
      <ConceptGraphSvg />

      {/* 7. Chronologie des courants théoriques */}
      <AppleSectionHeader
        id="matrice-doctrinale"
        eyebrow="ÉPISTÉMOLOGIE COMPARÉE · DE 1879 À AUJOURD'HUI"
        title="Chronologie des Courants Théoriques"
        badge="1879 — 2026"
        icon={History}
      />
      <GlobalTimeline />

      {/* 8. Vue d'ensemble & Statistiques */}
      <AppleSectionHeader
        id="stats"
        eyebrow="MÉTRIQUES D'ASSIDUITÉ & ANALYTIQUE SM-2"
        title="Vue d'Ensemble & Progression"
        badge="Live Snapshot"
        icon={BarChart2}
      />
      <div className="card p-5 sm:p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl mb-8 shadow-xs">
        <StatsCards stats={stats} />
        <div style={{ marginTop: 20 }}>
          <ActivityHeatmap activeDays={stats.activeDays} />
        </div>
      </div>

      {/* 9. Tes 5 Ateliers PST */}
      <AppleSectionHeader
        id="portail"
        eyebrow="MASTER PSYCHOLOGIE DU TRAVAIL · PARCOURS OFFICIEL"
        title="Tes 5 Ateliers PST"
        badge="5 UE Cnam"
        icon={Layers}
      />
      <ModulePortalGrid allStats={stats.allStats} />

      <div className="mt-10 pt-5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
        <Link className="ftlink inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100" href="/">
          ← Retour à l&apos;accueil du site
        </Link>
        <span className="text-[10px] font-mono text-slate-500">
          Système Pédagogique PST v2.4 · Apple iOS S-Tier+
        </span>
      </div>
    </div>
  );
}

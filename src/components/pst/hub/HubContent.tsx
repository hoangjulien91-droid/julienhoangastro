"use client";

import { Compass, BarChart2, Layers } from "lucide-react";
import { useMemo } from "react";
import { Link } from "@/components/common/Link";
import { computeGlobalStats, INDEX } from "@/lib/pst/hub-stats";
import { ModulesNav } from "@/components/pst/shell/ModulesNav";
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

export function HubContent() {
  // Recomputed once on mount (client-only, reads localStorage across all
  // modules) — snapshot client.
  const stats = useMemo(() => computeGlobalStats(), []);

  return (
    <>
      <ModulesNav active="hub" />

      {/* Apple-like Hero Command Banner — ultra-compact sur mobile (Style iOS Dynamic Banner) */}
      <div className="my-3 sm:my-5 p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/80 via-white/70 to-amber-500/5 dark:from-slate-900/80 dark:via-slate-900/70 dark:to-amber-500/10 border border-slate-200/90 dark:border-slate-800 backdrop-blur-xl shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider shadow-2xs">
              <span className="size-1.5 sm:size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Cockpit PST · Master Psychologie CNAM</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight m-0">
              Command Center des Ateliers
            </h1>
            <p className="hidden sm:block text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl m-0 leading-relaxed">
              Pilotage de tes 5 UE (PST106 à PST124), répétition espacée SM-2, glossaire de {INDEX.glossaire.length} concepts et calendrier officiel synchronisé.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0 pt-1 sm:pt-0">
            <Link
              href="/pst/planning/"
              className="flex-1 sm:flex-initial justify-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Planning</span>
              <span className="text-[10px] sm:text-[11px] opacity-80 font-mono">→</span>
            </Link>
            <Link
              href="/pst/pyramide/"
              className="flex-1 sm:flex-initial justify-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-all active:scale-95 cursor-pointer"
            >
              RNCP 7
            </Link>
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
      <h2>Glossaire unifié</h2>
      <GlossarySearch />

      {/* 6. Carte des concepts inter-modules */}
      <h2>Carte des concepts inter-modules</h2>
      <ConceptGraphSvg />

      {/* 7. Chronologie des courants théoriques */}
      <h2 className="flex items-center gap-2">
        <Compass className="text-amber-600 inline-block size-5" />
        <span>Chronologie des courants théoriques</span>
      </h2>
      <GlobalTimeline />

      {/* 8. Vue d'ensemble & Statistiques d'assiduité (placé après le glossaire) */}
      <h2 className="flex items-center gap-2 mt-8">
        <BarChart2 className="text-amber-600 inline-block size-5" />
        <span>Vue d&apos;ensemble &amp; Statistiques</span>
      </h2>
      <div className="card p-5 bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl mb-8 shadow-xs">
        <StatsCards stats={stats} />
        <div style={{ marginTop: 20 }}>
          <ActivityHeatmap activeDays={stats.activeDays} />
        </div>
      </div>

      {/* 9. Tes 5 Ateliers PST (Portail d'accès rapide placé tout en bas) */}
      <h2 className="flex items-center gap-2">
        <Layers className="text-amber-600 inline-block size-5" />
        <span>Tes 5 ateliers PST</span>
      </h2>
      <ModulePortalGrid allStats={stats.allStats} />

      <div className="mt-8 pt-4 border-t border-slate-200/80 dark:border-slate-800">
        <Link className="ftlink" href="/">
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </>
  );
}

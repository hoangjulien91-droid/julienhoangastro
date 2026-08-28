"use client";

import { Compass, BarChart2, Layers } from "lucide-react";
import { useMemo } from "react";
import { Link } from "next-view-transitions";
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

      <div className="eyebrow">CNAM · Command Center</div>
      <h1>Portail des ateliers PST</h1>

      <p className="sub">
        Ta progression sur les 5 ateliers, un glossaire unifié de{" "}
        {INDEX.glossaire.length} termes et la carte des concepts qui circulent
        entre les UE. Données locales à ton navigateur.
      </p>

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

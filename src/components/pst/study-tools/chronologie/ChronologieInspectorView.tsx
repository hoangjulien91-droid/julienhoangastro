import { Sparkles, GitCommit, BookOpen } from "lucide-react";
import type { Milestone } from "@/lib/pst/data/chronologie-historique-data";

interface ChronologieInspectorViewProps {
  activeMilestone: Milestone;
}

export function ChronologieInspectorView({
  activeMilestone,
}: ChronologieInspectorViewProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              {activeMilestone.annee}
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 uppercase">
              {activeMilestone.moduleKey.toUpperCase()}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 mt-1">
            {activeMilestone.titre}
          </h3>
          <p className="text-xs text-slate-500 m-0">
            {activeMilestone.auteur} · <i>{activeMilestone.ouvrage}</i>
          </p>
        </div>
      </div>

      {/* Rupture Épistémologique Card */}
      <div className="p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-1.5 text-xs">
        <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
          <Sparkles className="size-4 text-amber-600 shrink-0" />
          <span>Rupture Épistémologique majeure :</span>
        </span>
        <p className="leading-relaxed text-slate-800 dark:text-slate-200 m-0">
          {activeMilestone.ruptureEpistemologique}
        </p>
      </div>

      {/* Formule Matrice & Citation Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
        <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 space-y-1">
          <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
            <GitCommit className="size-3.5 text-emerald-600 shrink-0" />
            <span>Formule Matrice d&apos;Examen :</span>
          </span>
          <p className="leading-relaxed text-slate-800 dark:text-slate-200 m-0 font-semibold">
            {activeMilestone.formuleMatrice}
          </p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/50 space-y-1">
          <span className="font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-1">
            <BookOpen className="size-3.5 text-indigo-600 shrink-0" />
            <span>Citation Clé à citer en copie :</span>
          </span>
          <p className="leading-relaxed text-slate-800 dark:text-slate-200 font-serif italic m-0">
            {activeMilestone.citation}
          </p>
        </div>
      </div>
    </div>
  );
}

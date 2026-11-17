import { Maximize2, Minimize2, Crosshair } from "lucide-react";

interface PlanningGridControlsProps {
  hideEmptyWeeks: boolean;
  onToggleHideEmptyWeeks: () => void;
  showHoursOnChips: boolean;
  onToggleShowHours: () => void;
  displayedWeeksCount: number;
  totalWeeksCount: number;
  onScrollToActiveWeek: () => void;
}

export function PlanningGridControls({
  hideEmptyWeeks,
  onToggleHideEmptyWeeks,
  showHoursOnChips,
  onToggleShowHours,
  displayedWeeksCount,
  totalWeeksCount,
  onScrollToActiveWeek,
}: PlanningGridControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-xs">
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold mr-1">
          Lisibilité Frise :
        </span>
        <button
          type="button"
          onClick={onToggleHideEmptyWeeks}
          className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
            hideEmptyWeeks
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-2xs"
              : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
          }`}
          title="Masquer les semaines sans aucun cours pour élargir les colonnes utiles"
        >
          {hideEmptyWeeks ? (
            <Minimize2 className="size-3.5" />
          ) : (
            <Maximize2 className="size-3.5" />
          )}
          <span>
            {hideEmptyWeeks
              ? `Semaines actives (${displayedWeeksCount} sem.)`
              : `Calendrier complet (${totalWeeksCount} sem.)`}
          </span>
        </button>

        <button
          type="button"
          onClick={onToggleShowHours}
          className={`px-2.5 py-1 rounded-lg font-semibold border transition-all cursor-pointer ${
            showHoursOnChips
              ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
              : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
          }`}
          title="Afficher l'heure de début directement sur chaque puce de séance"
        >
          <span>
            {showHoursOnChips ? "✓ Heures sur puces (18h)" : "Dates seules"}
          </span>
        </button>
      </div>

      <button
        type="button"
        onClick={onScrollToActiveWeek}
        className="w-full sm:w-auto justify-center px-2.5 py-1.5 sm:py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-500 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
      >
        <Crosshair className="size-3.5 text-amber-600" />
        <span>Centrer sur la prochaine séance</span>
      </button>
    </div>
  );
}

import {
  Building2,
  CheckCircle2,
  Laptop,
  Video,
} from "lucide-react";
import {
  PLANNING_EVENTS,
  type PlanningEventType,
} from "@/lib/pst/data/planning";
import { type PlanningFilters } from "@/lib/pst/planning-stats";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface PlanningKpisGridProps {
  filters: PlanningFilters;
  globalTotals: {
    coursEvents: number;
    visioEvents: number;
    distantEvents: number;
  };
  presenceRemaining: {
    sessions: number;
    total: number;
  };
  totalPhysicalDaysCount: number;
  visioRemaining: number;
  visioHours: number;
  distantRemaining: number;
  distantHours: number;
  attendancePct: number;
  autoAttendanceMode: boolean;
  attendedCount: number;
  completedHours: number;
  totalPlannedHours: number;
  onToggleType: (t: PlanningEventType) => void;
  onOpenAttendanceModal: () => void;
}

export function PlanningKpisGrid({
  filters,
  globalTotals,
  presenceRemaining,
  totalPhysicalDaysCount,
  visioRemaining,
  visioHours,
  distantRemaining,
  distantHours,
  attendancePct,
  autoAttendanceMode,
  attendedCount,
  completedHours,
  totalPlannedHours,
  onToggleType,
  onOpenAttendanceModal,
}: PlanningKpisGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-slate-200/70 dark:border-slate-800">
      {/* Widget 1 : Présentiel Bègles */}
      <div
        onClick={() => onToggleType("COURS")}
        className={`p-2.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
          filters.types.has("COURS")
            ? "bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/35 shadow-2xs ring-1 ring-amber-500/20"
            : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 opacity-60 hover:opacity-100"
        }`}
      >
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5 sm:mb-2 gap-1">
            <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1 sm:gap-1.5 truncate">
              <Building2 className="size-3.5 sm:size-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="truncate">Bègles</span>
            </span>
            <span className="text-[10px] font-mono font-black uppercase px-1.5 sm:px-2 py-0.5 rounded bg-amber-500/20 text-amber-900 dark:text-amber-100 shrink-0">
              {globalTotals.coursEvents} séa.
            </span>
          </div>
          <div className="text-lg sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            {presenceRemaining.sessions} restantes
          </div>
        </div>
        <div className="text-[11px] leading-tight text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 sm:line-clamp-none">
          {presenceRemaining.total} j. restants / {totalPhysicalDaysCount} j. ·
          Cnam Bègles
        </div>
      </div>

      {/* Widget 2 : Webconférences */}
      <div
        onClick={() => onToggleType("WEBCONF")}
        className={`p-2.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
          filters.types.has("WEBCONF")
            ? "bg-indigo-500/10 dark:bg-indigo-500/15 border-indigo-500/35 shadow-2xs ring-1 ring-indigo-500/20"
            : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 opacity-60 hover:opacity-100"
        }`}
      >
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5 sm:mb-2 gap-1">
            <span className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1 sm:gap-1.5 truncate">
              <Video className="size-3.5 sm:size-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span className="truncate">Webconf.</span>
            </span>
            <span className="text-[10px] font-mono font-black uppercase px-1.5 sm:px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-900 dark:text-indigo-100 shrink-0">
              {globalTotals.visioEvents} séa.
            </span>
          </div>
          <div className="text-lg sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            {visioRemaining} restantes
          </div>
        </div>
        <div className="text-[11px] leading-tight text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 sm:line-clamp-none">
          {visioHours}h synchrones · BigBlueButton
        </div>
      </div>

      {/* Widget 3 : Activités Distantes */}
      <div
        onClick={() => onToggleType("DISTANT")}
        className={`p-2.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
          filters.types.has("DISTANT")
            ? "bg-slate-700/10 dark:bg-slate-700/20 border-slate-600/35 shadow-2xs ring-1 ring-slate-600/20"
            : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 opacity-60 hover:opacity-100"
        }`}
      >
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5 sm:mb-2 gap-1">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 sm:gap-1.5 truncate">
              <Laptop className="size-3.5 sm:size-4 text-slate-600 dark:text-slate-400 shrink-0" />
              <span className="truncate">ENF</span>
            </span>
            <span className="text-[10px] font-mono font-black uppercase px-1.5 sm:px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 shrink-0">
              {globalTotals.distantEvents} créneaux
            </span>
          </div>
          <div className="text-lg sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            {distantRemaining} restants
          </div>
        </div>
        <div className="text-[11px] leading-tight text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 sm:line-clamp-none">
          {distantHours}h asynchrones guidées · ENF
        </div>
      </div>

      {/* Widget 4 : Assiduité */}
      <div
        onClick={() => {
          playClickSound();
          onOpenAttendanceModal();
        }}
        className="p-2.5 sm:p-4 rounded-2xl border border-emerald-500/35 bg-emerald-500/10 dark:bg-emerald-500/15 shadow-2xs flex flex-col justify-between cursor-pointer hover:border-emerald-500/60 transition-all group"
        title="Cliquer pour afficher le détail de l'assiduité par UE (159h)"
      >
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5 sm:mb-2 gap-1">
            <span className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1 sm:gap-1.5 truncate">
              <CheckCircle2 className="size-3.5 sm:size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate">Assiduité</span>
            </span>
            <div className="flex items-center gap-1 shrink-0">
              {autoAttendanceMode && (
                <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-600 text-white">
                  Auto
                </span>
              )}
              <span className="text-[10px] font-mono font-black uppercase px-1.5 sm:px-2 py-0.5 rounded bg-emerald-500/25 text-emerald-900 dark:text-emerald-100">
                {attendancePct}%
              </span>
            </div>
          </div>
          <div className="text-lg sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            {attendedCount} / {PLANNING_EVENTS.length}
          </div>
          <div className="text-[11px] leading-tight text-slate-600 dark:text-slate-300 mt-1 flex items-center justify-between">
            <span>
              {completedHours}h / {totalPlannedHours}h
            </span>
            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 group-hover:underline">
              Détail →
            </span>
          </div>
        </div>
        <div className="w-full h-1.5 sm:h-2 rounded-full bg-emerald-950/20 dark:bg-emerald-900/40 overflow-hidden mt-2">
          <div
            className="h-full bg-emerald-600 dark:bg-emerald-400 rounded-full transition-all duration-300"
            style={{ width: `${attendancePct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

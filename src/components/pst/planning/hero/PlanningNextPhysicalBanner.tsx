import {
  ArrowRight,
  Clock,
  MapPin,
} from "lucide-react";
import type { PlanningEvent } from "@/lib/pst/data/planning";
import {
  eventLocation,
  formatFrDate,
} from "@/lib/pst/planning-stats";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface PlanningNextPhysicalBannerProps {
  nextPhysical: PlanningEvent;
  onSelectEvent: (ev: PlanningEvent) => void;
}

export function PlanningNextPhysicalBanner({
  nextPhysical,
  onSelectEvent,
}: PlanningNextPhysicalBannerProps) {
  return (
    <div className="mt-4 sm:mt-5 p-3.5 sm:p-4 rounded-2xl border border-amber-500/40 bg-gradient-to-br sm:bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 shadow-2xs">
      <div className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-3 flex-1 min-w-0">
        <span className="hidden sm:inline-flex p-2.5 rounded-xl bg-amber-600 text-white font-bold shrink-0 shadow-xs">
          <MapPin className="size-5" />
        </span>
        <div className="space-y-1 min-w-0 w-full">
          <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="sm:hidden p-1 rounded-md bg-amber-600 text-white shrink-0 shadow-2xs inline-flex items-center justify-center">
              <MapPin className="size-3" />
            </span>
            <span>
              Prochain déplacement : {nextPhysical.day}{" "}
              {formatFrDate(nextPhysical.date)}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-mono text-[10px] font-black uppercase shrink-0 shadow-2xs">
              {nextPhysical.unit.toUpperCase()} · {nextPhysical.start}–
              {nextPhysical.end}
            </span>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 w-full">
            {nextPhysical.room ? `${nextPhysical.room} · ` : ""}
            <b>{nextPhysical.teacher}</b> · {eventLocation(nextPhysical)}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          playClickSound();
          onSelectEvent(nextPhysical);
        }}
        className="w-full sm:w-auto justify-center px-4 py-2.5 sm:py-2 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shrink-0 transition-all shadow-xs"
      >
        <Clock className="size-3.5" />
        <span>
          Inspecter ({formatFrDate(nextPhysical.date).slice(0, 5)})
        </span>
        <ArrowRight className="size-3.5" />
      </button>
    </div>
  );
}

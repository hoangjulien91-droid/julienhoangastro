"use client";

import { useMemo } from "react";
import { Link } from "@/components/common/Link";
import { Calendar, MapPin, Video, Laptop, ArrowRight } from "lucide-react";
import { PLANNING_EVENTS, type PlanningUnitId } from "@/lib/pst/data/planning";
import { formatFrDate } from "@/lib/pst/planning-stats";

interface ModuleLivePillProps {
  unitId: PlanningUnitId;
}

export function ModuleLivePill({ unitId }: ModuleLivePillProps) {
  const nextSession = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const future = PLANNING_EVENTS.filter(
      (e) => e.unit === unitId && e.date >= today,
    );
    return future[0] ?? null;
  }, [unitId]);

  if (!nextSession) return null;

  const isCours = nextSession.type === "COURS";
  const isVisio = nextSession.type === "WEBCONF";

  return (
    <div className="my-3.5 p-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md shadow-xs flex items-center justify-between gap-3 flex-wrap">
      <div className="flex items-center gap-2.5">
        <span className="relative flex size-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full size-2.5 bg-amber-500" />
        </span>
        <div className="text-xs">
          <span className="font-bold text-slate-900 dark:text-slate-100">
            Prochaine séance : {nextSession.day} {formatFrDate(nextSession.date)} ({nextSession.start} – {nextSession.end})
          </span>
          <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
            <span className="inline-flex items-center gap-1">
              {isCours ? (
                <>
                  <MapPin className="size-3 text-amber-600" />
                  <span>Présentiel · {nextSession.room ?? "Bègles"}</span>
                </>
              ) : isVisio ? (
                <>
                  <Video className="size-3 text-indigo-500" />
                  <span>Webconférence (Visio ENF)</span>
                </>
              ) : (
                <>
                  <Laptop className="size-3 text-slate-500" />
                  <span>Activité distante asynchrone</span>
                </>
              )}
            </span>
            <span>· {nextSession.teacher}</span>
          </div>
        </div>
      </div>

      <Link
        href="/pst/planning/"
        className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 flex items-center gap-1 transition-colors cursor-pointer"
        title="Ouvrir le planning interactif"
      >
        <span>Planning complet</span>
        <ArrowRight className="size-3" />
      </Link>
    </div>
  );
}

import { ListFilter, CalendarPlus } from "lucide-react";
import type { PlanningEvent } from "@/lib/pst/data/planning";
import { formatFrDate } from "@/lib/pst/planning-stats";
import { downloadIcs } from "@/lib/pst/ics-export";

interface UpcomingEventsDrawerProps {
  allUpcoming: PlanningEvent[];
  filteredUpcoming: PlanningEvent[];
  modalityFilter: "all" | "COURS" | "WEBCONF" | "DISTANT";
  setModalityFilter: (filter: "all" | "COURS" | "WEBCONF" | "DISTANT") => void;
}

export function UpcomingEventsDrawer({
  allUpcoming,
  filteredUpcoming,
  modalityFilter,
  setModalityFilter,
}: UpcomingEventsDrawerProps) {
  return (
    <div className="mt-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5 animate-fadeIn">
      <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-slate-200/70 dark:border-slate-800">
        <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ListFilter className="size-3.5 text-amber-600" />
          <span>
            Programme prévisionnel des {filteredUpcoming.length} séances à
            venir
          </span>
        </div>

        {/* Filtres de modalité */}
        <div className="flex items-center gap-1.5 text-[11px] font-bold flex-wrap">
          <button
            type="button"
            onClick={() => setModalityFilter("all")}
            className={`px-2.5 py-1 rounded-xl border transition-all cursor-pointer active:scale-95 shadow-2xs ${
              modalityFilter === "all"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs"
                : "bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700"
            }`}
          >
            Toutes ({allUpcoming.length})
          </button>
          <button
            type="button"
            onClick={() => setModalityFilter("COURS")}
            className={`px-2.5 py-1 rounded-xl border transition-all cursor-pointer active:scale-95 shadow-2xs ${
              modalityFilter === "COURS"
                ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                : "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30"
            }`}
          >
            Cours Bègles (
            {allUpcoming.filter((e) => e.type === "COURS").length})
          </button>
          <button
            type="button"
            onClick={() => setModalityFilter("WEBCONF")}
            className={`px-2.5 py-1 rounded-xl border transition-all cursor-pointer active:scale-95 shadow-2xs ${
              modalityFilter === "WEBCONF"
                ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                : "bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border-indigo-500/30"
            }`}
          >
            Webconf. (
            {allUpcoming.filter((e) => e.type === "WEBCONF").length})
          </button>
          <button
            type="button"
            onClick={() => setModalityFilter("DISTANT")}
            className={`px-2.5 py-1 rounded-xl border transition-all cursor-pointer active:scale-95 shadow-2xs ${
              modalityFilter === "DISTANT"
                ? "bg-slate-700 text-white border-slate-700 shadow-xs"
                : "bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700"
            }`}
          >
            Distantes (
            {allUpcoming.filter((e) => e.type === "DISTANT").length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-96 overflow-y-auto pr-1">
        {filteredUpcoming.map((ev, idx) => {
          const isCours = ev.type === "COURS";
          const isVisio = ev.type === "WEBCONF";
          return (
            <div
              key={`${ev.unit}-${ev.date}-${ev.start}-${idx}`}
              className={`p-3.5 rounded-2xl border text-xs flex flex-col justify-between gap-1.5 backdrop-blur-md shadow-2xs transition-all ${
                isCours
                  ? "bg-white/70 dark:bg-slate-800/60 hover:bg-white/90 border-amber-500/30"
                  : isVisio
                    ? "bg-indigo-500/5 hover:bg-indigo-500/10 border-indigo-500/25"
                    : "bg-slate-50/70 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200/80 dark:border-slate-800"
              }`}
            >
              <div className="flex items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-mono text-[10px] font-black uppercase">
                    {ev.unit}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                      isCours
                        ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30"
                        : isVisio
                          ? "bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border-indigo-500/30"
                          : "bg-slate-500/15 text-slate-800 dark:text-slate-300 border-slate-500/30"
                    }`}
                  >
                    {isCours
                      ? "Cours Bègles"
                      : isVisio
                        ? "Webconf."
                        : "Distant"}
                  </span>
                </div>
                <span className="font-mono text-[11px] font-bold text-slate-600 dark:text-slate-300">
                  {ev.start}–{ev.end}
                </span>
              </div>

              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between gap-1">
                <span>
                  {ev.day} {formatFrDate(ev.date)}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    downloadIcs([ev], `seance-${ev.unit}-${ev.date}.ics`);
                  }}
                  className="p-1 rounded hover:bg-amber-500/20 text-slate-400 hover:text-amber-700 transition-colors cursor-pointer"
                  title="Télécharger .ics pour cette séance"
                >
                  <CalendarPlus className="size-3.5" />
                </button>
              </div>

              <div className="text-[11px] text-slate-500 truncate">
                {isCours
                  ? `Cnam Bègles — ${ev.room ?? ""}`
                  : (ev.room ?? "ENF")}{" "}
                · {ev.teacher}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

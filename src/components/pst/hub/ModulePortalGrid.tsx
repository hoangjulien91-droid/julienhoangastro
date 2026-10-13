"use client";

import { Link } from "@/components/common/Link";
import {
  ArrowRight,
  Calendar,
  Clock,
  Info,
} from "lucide-react";
import type { GlobalStats } from "@/lib/pst/hub-stats";
import type { PlanningUnitId } from "@/lib/pst/data/planning";
import {
  DAY_ABBREV,
  formatShortFrDate,
  getNextUnitEvent,
} from "@/lib/pst/planning-stats";

interface ModulePortalGridProps {
  allStats: GlobalStats["allStats"];
  onInspect?: (moduleId: string) => void;
}

export function ModulePortalGrid({
  allStats,
  onInspect,
}: ModulePortalGridProps) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      id="portail"
    >
      {allStats.map(({ m, st }) => {
        const nextEv = getNextUnitEvent(m.id as PlanningUnitId);
        let countdown = "";
        if (nextEv) {
          const [ny, nm, nd] = nextEv.date.split("-").map(Number);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const targetDate = new Date(ny!, nm! - 1, nd!);
          const dd = Math.ceil(
            (targetDate.getTime() - today.getTime()) / 86400000,
          );
          countdown =
            dd > 0
              ? `Prochaine J-${dd}`
              : dd === 0
                ? "Aujourd'hui"
                : "En cours";
        } else if (m.exam) {
          const dd = Math.ceil(
            (new Date(m.exam).getTime() - Date.now()) / 86400000,
          );
          countdown = dd > 0 ? `Clôture J-${dd}` : dd === 0 ? "Jour J" : "Passé";
        }

        const formattedId = m.id.toUpperCase();
        const routePath = `/pst/${m.id.replace("pst", "")}/`;

        return (
          <div
            key={m.id}
            className="group card p-5.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xs hover:border-amber-500/50 hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
            style={{ borderLeftColor: m.accent, borderLeftWidth: "4px" }}
          >
            <div className="space-y-3.5">
              {/* Entête Carte : ID + Countdown Prochaine séance + Bouton Inspecter */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-mono font-black text-xs rounded-xl uppercase tracking-wider shadow-2xs">
                    {formattedId}
                  </span>
                  {countdown && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      <Calendar className="size-3" />
                      <span>{countdown}</span>
                    </span>
                  )}
                </div>

                {onInspect && (
                  <button
                    type="button"
                    onClick={() => onInspect(m.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                    title={`Inspecter les doctrines et protocoles de ${formattedId}`}
                  >
                    <Info className="size-3 text-amber-600" />
                    <span>Doctrines</span>
                  </button>
                )}
              </div>

              {/* Titre et Auteurs / Sujet */}
              <div>
                <Link
                  href={routePath}
                  className="text-base font-bold text-slate-900 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors block m-0 leading-snug"
                >
                  {m.title}
                </Link>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0 mt-1 font-serif italic line-clamp-2">
                  {m.subject}
                </p>
                {nextEv && (
                  <div className="mt-2.5 px-3 py-1.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-[11px] font-mono text-slate-800 dark:text-slate-200 flex items-center justify-between gap-1.5 flex-wrap">
                    <span>
                      <b>Prochaine :</b> {DAY_ABBREV[nextEv.day]}. {formatShortFrDate(nextEv.date)} ({nextEv.start}–{nextEv.end})
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400">
                      {nextEv.type === "COURS"
                        ? `Cnam Bègles${nextEv.room ? ` · ${nextEv.room.replace(" - ", " ")}` : ""}`
                        : nextEv.type === "WEBCONF"
                          ? "Visio BBB"
                          : "ENF Distant"}
                    </span>
                  </div>
                )}
              </div>

              {/* Barre de progression des cartes */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  <span>Cartes mémorisées</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                    {st.mastered} / {m.cards} ({st.pctCards}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-300"
                    style={{ width: `${st.pctCards}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Méta et CTA en bas de carte */}
            <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3 text-[11px]">
                <span>
                  QCM : <b className="text-slate-900 dark:text-slate-100">{st.avgScore == null ? "—" : `${st.avgScore}%`}</b>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3 text-slate-400" />
                  <span>
                    {st.days == null
                      ? "jamais ouvert"
                      : st.days === 0
                        ? "aujourd'hui"
                        : `il y a ${st.days}j`}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Link
                  href={`${routePath}?tab=cartes`}
                  className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/25 hover:bg-amber-500/20 transition-colors"
                  title="S'entraîner directement aux flashcards de cette UE"
                >
                  Flashcards
                </Link>
                <Link
                  href={routePath}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 shadow-2xs transition-transform active:scale-95 inline-flex items-center gap-1"
                >
                  <span>{st.mastered ? "Reprendre" : "Ouvrir"}</span>
                  <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

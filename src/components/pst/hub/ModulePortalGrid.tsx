"use client";

import { Link } from "@/components/common/Link";
import {
  ArrowRight,
  Calendar,
  Clock,
  Info,
  Moon,
  Sparkles,
} from "lucide-react";
import type { GlobalStats } from "@/lib/pst/hub-stats";
import type { PlanningUnitId } from "@/lib/pst/data/planning";
import {
  DAY_ABBREV,
  formatShortFrDate,
  getNextUnitEvent,
  getUnitSemesterStatus,
} from "@/lib/pst/planning-stats";

interface ModulePortalGridProps {
  allStats: GlobalStats["allStats"];
  onInspect?: (moduleId: string) => void;
  semesterFilter?: "all" | "s1" | "s2";
}

export function ModulePortalGrid({
  allStats,
  onInspect,
  semesterFilter = "all",
}: ModulePortalGridProps) {
  const filteredStats = allStats.filter(({ m }) => {
    const status = getUnitSemesterStatus(m.id);
    if (semesterFilter === "s1") return !status.isSemester2;
    if (semesterFilter === "s2") return status.isSemester2;
    return true;
  });

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      id="portail"
    >
      {filteredStats.map(({ m, st }) => {
        const semesterStatus = getUnitSemesterStatus(m.id);
        const isDormant = semesterStatus.isDormant;
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
          countdown =
            dd > 0 ? `Clôture J-${dd}` : dd === 0 ? "Jour J" : "Passé";
        }

        const formattedId = m.id.toUpperCase();
        const routePath = `/pst/${m.id.replace("pst", "")}/`;

        return (
          <div
            key={m.id}
            className={`group card p-5 sm:p-6 backdrop-blur-2xl border rounded-[28px] sm:rounded-[32px] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
              isDormant
                ? "bg-slate-100/70 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/50 opacity-70 hover:opacity-100 hover:border-slate-400/40"
                : "bg-white/85 dark:bg-slate-900/85 border-slate-200/80 dark:border-slate-800/80 hover:border-amber-500/40 hover:-translate-y-0.5"
            }`}
            style={{
              borderLeftColor: isDormant ? "#94a3b8" : m.accent,
              borderLeftWidth: "4px",
            }}
          >
            <div className="space-y-3.5">
              {/* Entête Carte : ID + Badge Semestre 2 / Prochaine séance + Bouton Inspecter */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-2.5 py-1 font-mono font-black text-xs rounded-xl uppercase tracking-wider shadow-2xs ${
                      isDormant
                        ? "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:border dark:border-slate-700"
                        : "bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 dark:border dark:border-slate-700"
                    }`}
                  >
                    {formattedId}
                  </span>

                  {isDormant ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-200/80 dark:bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-300/80 dark:border-slate-700">
                      <Moon className="size-3 text-slate-500 dark:text-slate-400" />
                      <span>
                        Semestre 2 · Rentrée{" "}
                        {semesterStatus.firstSessionLabel ?? "en 2027"}
                      </span>
                      {semesterStatus.daysUntilFirstSession && (
                        <span className="font-mono text-slate-500 ml-0.5">
                          (J-{semesterStatus.daysUntilFirstSession})
                        </span>
                      )}
                    </span>
                  ) : countdown ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      <Calendar className="size-3" />
                      <span>{countdown}</span>
                    </span>
                  ) : null}
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
                  <div className="mt-3 px-3 py-1.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-[11px] font-mono text-slate-800 dark:text-slate-200 flex items-center justify-between gap-1.5 flex-wrap">
                    <span>
                      <b>Prochaine :</b> {DAY_ABBREV[nextEv.day]}.{" "}
                      {formatShortFrDate(nextEv.date)} ({nextEv.start}–
                      {nextEv.end})
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

              {/* Barre de progression des cartes type Apple Fitness */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Sparkles className="size-3 text-amber-500" />
                    <span>Cartes mémorisées</span>
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200/60 dark:border-slate-700/60">
                    {st.mastered} / {m.cards} ({st.pctCards}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/60 dark:border-slate-700/60">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-full transition-all duration-500 shadow-xs"
                    style={{ width: `${Math.max(st.pctCards, 2)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Méta et CTA en bas de carte */}
            <div className="mt-5 pt-3.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3 text-[11px]">
                <span>
                  QCM :{" "}
                  <b className="text-slate-900 dark:text-slate-100">
                    {st.avgScore == null ? "—" : `${st.avgScore}%`}
                  </b>
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
                  href={`${routePath}#cartes`}
                  className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/25 hover:bg-amber-500/20 transition-all active:scale-95"
                  title="S'entraîner directement aux cartes mémo de cette UE"
                >
                  Cartes Mémo
                </Link>
                <Link
                  href={routePath}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-950 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 shadow-2xs transition-all active:scale-95 inline-flex items-center gap-1"
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

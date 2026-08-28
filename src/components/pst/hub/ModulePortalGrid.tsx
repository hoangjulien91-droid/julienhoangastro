"use client";

import { Link } from "next-view-transitions";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  BookOpen,
} from "lucide-react";
import type { GlobalStats } from "@/lib/pst/hub-stats";

export function ModulePortalGrid({
  allStats,
}: {
  allStats: GlobalStats["allStats"];
}) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      id="portail"
    >
      {allStats.map(({ m, st }) => {
        let countdown = "";
        if (m.exam) {
          const dd = Math.ceil(
            (new Date(m.exam).getTime() - Date.now()) / 86400000,
          );
          countdown = dd > 0 ? `J-${dd}` : dd === 0 ? "Jour J" : "Passé";
        }

        const formattedId = m.id.toUpperCase();
        const routePath = `/pst/${m.id.replace("pst", "")}/`;

        return (
          <Link
            key={m.id}
            href={routePath}
            className="group card p-5 bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs hover:border-amber-500/40 hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
            style={{ borderLeftColor: m.accent, borderLeftWidth: "4px" }}
          >
            <div className="space-y-3">
              {/* Entête Carte : ID + Countdown Examen */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-extrabold text-xs rounded-lg uppercase tracking-wider">
                  {formattedId}
                </span>

                {countdown && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    <Calendar className="size-3" />
                    <span>{countdown}</span>
                  </span>
                )}
              </div>

              {/* Titre et Auteurs / Sujet */}
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0 mt-1 font-medium italic">
                  {m.subject}
                </p>
              </div>

              {/* Barre de progression des cartes */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  <span>Cartes maîtrisées</span>
                  <span className="font-mono font-bold">
                    {st.mastered} / {m.cards} ({st.pctCards}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all duration-300"
                    style={{ width: `${st.pctCards}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Méta et CTA en bas de carte */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3 text-[11px]">
                <span>
                  QCM : <b>{st.avgScore == null ? "—" : `${st.avgScore}%`}</b>
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

              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                <span>{st.mastered ? "Reprendre" : "Ouvrir"}</span>
                <ArrowRight className="size-3.5" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

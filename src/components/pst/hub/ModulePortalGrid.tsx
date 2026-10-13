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
            className="group card p-5 bg-card/90 border border-border rounded-2xl shadow-xs hover:border-accent/40 hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
            style={{ borderLeftColor: m.accent, borderLeftWidth: "4px" }}
          >
            <div className="space-y-3">
              {/* Entête Carte : ID + Countdown Prochaine séance + Bouton Inspecter */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-primary text-primary-foreground font-mono font-bold text-xs rounded-lg uppercase tracking-wider">
                    {formattedId}
                  </span>
                  {countdown && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20">
                      <Calendar className="size-3" />
                      <span>{countdown}</span>
                    </span>
                  )}
                </div>

                {onInspect && (
                  <button
                    type="button"
                    onClick={() => onInspect(m.id)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 border border-border transition-colors cursor-pointer"
                    title={`Inspecter les doctrines et protocoles de ${formattedId}`}
                  >
                    <Info className="size-3 text-accent" />
                    <span>Inspecter</span>
                  </button>
                )}
              </div>

              {/* Titre et Auteurs / Sujet */}
              <div>
                <Link
                  href={routePath}
                  className="text-base font-bold text-foreground hover:text-accent transition-colors block m-0"
                >
                  {m.title}
                </Link>
                <p className="text-xs text-muted-foreground m-0 mt-1 font-serif italic">
                  {m.subject}
                </p>
                {nextEv && (
                  <div className="mt-2 px-2.5 py-1 rounded-lg bg-muted/60 border border-border/80 text-[11px] font-mono text-foreground flex items-center justify-between gap-1.5 flex-wrap">
                    <span>
                      <b>Prochaine :</b> {DAY_ABBREV[nextEv.day]}.{" "}
                      {formatShortFrDate(nextEv.date)} ({nextEv.start}–
                      {nextEv.end})
                    </span>
                    <span className="text-[10px] font-bold text-accent">
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
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[11px] font-semibold text-muted-foreground">
                  <span>Cartes mémorisées</span>
                  <span className="font-mono font-bold text-foreground">
                    {st.mastered} / {m.cards} ({st.pctCards}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${st.pctCards}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Méta et CTA en bas de carte */}
            <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-3 text-[11px]">
                <span>
                  QCM : <b className="text-foreground">{st.avgScore == null ? "—" : `${st.avgScore}%`}</b>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3 text-muted-foreground/70" />
                  <span>
                    {st.days == null
                      ? "jamais ouvert"
                      : st.days === 0
                        ? "aujourd'hui"
                        : `il y a ${st.days}j`}
                  </span>
                </span>
              </div>

              <Link
                href={routePath}
                className="text-xs font-bold text-accent group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1 hover:underline"
              >
                <span>{st.mastered ? "Reprendre" : "Ouvrir"}</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

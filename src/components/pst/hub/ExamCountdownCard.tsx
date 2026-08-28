"use client";

import { useEffect, useState } from "react";
import { Link } from "next-view-transitions";
import { GraduationCap, Calendar, Clock, ChevronRight } from "lucide-react";
import { PLANNING_EVENTS, type PlanningUnitId } from "@/lib/pst/data/planning";

interface ExamInfo {
  unit: PlanningUnitId;
  title: string;
  dateStr: string;
  daysLeft: number;
  session: number;
}

const UNIT_NAMES: Record<PlanningUnitId, string> = {
  pst108: "PST108 — Langage & Dialogue",
  pst106: "PST106 — Clinique de l'Activité",
  pst123: "PST123 — Déontologie & RPS",
  pst120: "PST120 — Psychodynamique",
  pst124: "PST124 — Usages Digitaux",
};

export function ExamCountdownCard() {
  const [exams, setExams] = useState<ExamInfo[]>([]);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const examEvents = PLANNING_EVENTS.filter(
      (e) => e.type === "EXAMEN" && e.session === 1,
    );

    const list: ExamInfo[] = examEvents
      .map((e) => {
        const parts = e.date.split("-");
        const y = Number(parts[0]);
        const m = Number(parts[1]);
        const d = Number(parts[2]);
        if (!y || !m || !d) return null;
        const examDate = new Date(y, m - 1, d);
        const diffTime = examDate.getTime() - today.getTime();
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
          unit: e.unit,
          title: UNIT_NAMES[e.unit] || e.unit.toUpperCase(),
          dateStr: `${e.day} ${d}/${m}/${y}`,
          daysLeft,
          session: 1,
        };
      })
      .filter((x): x is ExamInfo => x !== null)
      .sort((a, b) => a.daysLeft - b.daysLeft);

    setExams(list);
  }, []);

  if (exams.length === 0) return null;

  const nextExam = exams.find((e) => e.daysLeft >= 0) || exams[0];
  const nextUnit = nextExam?.unit;

  return (
    <div className="card bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 p-5 rounded-2xl mb-6 shadow-sm">
      <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-amber-500/15 text-amber-700 dark:text-amber-400 rounded-xl">
            <GraduationCap className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0">
              Échéancier des Examens CNAM
            </h3>
            <p className="text-xs text-muted-foreground m-0">
              Session 1 normale · Centres de Dax et Bordeaux
            </p>
          </div>
        </div>
        <Link
          href="/pst/planning/"
          className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
        >
          <span>Voir tout le planning</span>
          <ChevronRight className="size-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {exams.map((item) => {
          const isNext = item.unit === nextUnit;
          const isPast = item.daysLeft < 0;

          return (
            <div
              key={item.unit}
              className={`p-3 rounded-xl border transition-all ${
                isNext
                  ? "bg-amber-500/15 border-amber-500/40 shadow-sm"
                  : isPast
                    ? "bg-slate-100/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-60"
                    : "bg-white/60 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-slate-900 dark:text-slate-100">
                  {item.unit.toUpperCase()}
                </span>
                {isNext && (
                  <span className="px-1.5 py-0.5 text-[10px] uppercase font-extrabold bg-amber-600 text-white rounded-md">
                    Prochain
                  </span>
                )}
              </div>
              <div
                className="text-[11px] text-slate-600 dark:text-slate-400 mb-2 truncate"
                title={item.title}
              >
                {item.title.split("—")[1] || item.title}
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Calendar className="text-slate-400 size-3" />
                  {item.dateStr.split(" ")[1]}
                </span>
                <span
                  className={`text-xs font-black flex items-center gap-1 ${
                    isPast
                      ? "text-slate-400"
                      : item.daysLeft <= 30
                        ? "text-rose-600 dark:text-rose-400"
                        : "text-amber-700 dark:text-amber-400"
                  }`}
                >
                  <Clock className="size-3" />
                  {isPast ? "Passé" : `J-${item.daysLeft}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

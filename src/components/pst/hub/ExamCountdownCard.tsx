"use client";

import { useEffect, useState } from "react";
import { Link } from "@/components/common/Link";
import {
  GraduationCap,
  Calendar,
  Clock,
  ChevronRight,
  MapPin,
  Video,
  BookOpen,
  Moon,
} from "lucide-react";
import {
  PLANNING_EVENTS,
  UNIT_ORDER,
  type PlanningEventType,
  type PlanningUnitId,
} from "@/lib/pst/data/planning";
import {
  formatFrDate,
  getExamEvent,
  getFirstUnitEvent,
  getNextUnitEvent,
  getUnitSemesterStatus,
  summarizeUnit,
} from "@/lib/pst/planning-stats";

interface UnitScheduleInfo {
  unit: PlanningUnitId;
  title: string;
  firstDateStr: string;
  endDateStr: string;
  endDaysLeft: number;
  nextDateStr: string | null;
  nextTimeStr: string | null;
  nextType: PlanningEventType | null;
  nextRoom: string | null;
  nextDaysLeft: number;
  isExplicitExam: boolean;
  totalSessions: number;
  coursCount: number;
  visioCount: number;
  distantCount: number;
  totalHours: number;
}

const UNIT_NAMES: Record<PlanningUnitId, string> = {
  pst106: "PST106 — Clinique de l'Activité",
  pst108: "PST108 — Langage & Dialogue",
  pst123: "PST123 — Travail & Emploi",
  pst120: "PST120 — Psychodynamique",
  pst124: "PST124 — Usages Digitaux",
};

function computeDaysFromToday(isoDate: string, today: Date): number {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return 0;
  const targetDate = new Date(y, m - 1, d);
  return Math.ceil((targetDate.getTime() - today.getTime()) / 86400000);
}

export function ExamCountdownCard() {
  const [items, setItems] = useState<UnitScheduleInfo[]>([]);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const list: UnitScheduleInfo[] = UNIT_ORDER.map((unit) => {
      const target = getExamEvent(unit);
      if (!target) return null;

      const firstEv = getFirstUnitEvent(unit) ?? target;
      const nextEv = getNextUnitEvent(unit);

      const endDaysLeft = computeDaysFromToday(target.date, today);
      const nextDaysLeft = nextEv
        ? computeDaysFromToday(nextEv.date, today)
        : endDaysLeft;

      const summary = summarizeUnit(unit);
      const totalSessions = PLANNING_EVENTS.filter(
        (e) => e.unit === unit,
      ).length;

      return {
        unit,
        title: UNIT_NAMES[unit] || unit.toUpperCase(),
        firstDateStr: formatFrDate(firstEv.date),
        endDateStr: `${target.day.slice(0, 3)}. ${formatFrDate(target.date)}`,
        endDaysLeft,
        nextDateStr: nextEv
          ? `${nextEv.day.slice(0, 3)}. ${formatFrDate(nextEv.date)}`
          : null,
        nextTimeStr: nextEv ? `${nextEv.start}–${nextEv.end}` : null,
        nextType: nextEv ? nextEv.type : null,
        nextRoom: nextEv ? nextEv.room : null,
        nextDaysLeft,
        isExplicitExam: target.type === "EXAMEN",
        totalSessions,
        coursCount: summary.coursCount,
        visioCount: summary.visioCount,
        distantCount: summary.distantCount,
        totalHours: summary.totalHours,
      };
    })
      .filter((x): x is UnitScheduleInfo => x !== null)
      .sort((a, b) => a.nextDaysLeft - b.nextDaysLeft);

    setItems(list);
  }, []);

  if (items.length === 0) return null;

  const nextItem = items.find((e) => e.nextDaysLeft >= 0) || items[0];
  const nextUnit = nextItem?.unit;

  return (
    <div className="card bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 rounded-3xl mb-6 shadow-xs">
      <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/15 text-amber-700 dark:text-amber-400 rounded-2xl shadow-2xs">
            <GraduationCap className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0">
              Calendrier &amp; Prochaines Séances par UE (2026–2027)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
              69 séances programmées · Cnam Bègles (Cité du Numérique) &amp;
              Espace Numérique de Formation
            </p>
          </div>
        </div>
        <Link
          href="/pst/planning/"
          className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
        >
          <span>Voir tout le planning</span>
          <ChevronRight className="size-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {items.map((item) => {
          const isNext = item.unit === nextUnit;
          const isPast = item.endDaysLeft < 0;
          const isCours = item.nextType === "COURS";
          const isVisio = item.nextType === "WEBCONF";
          const semesterStatus = getUnitSemesterStatus(item.unit);
          const isDormant = semesterStatus.isDormant;

          return (
            <Link
              key={item.unit}
              href={`/pst/${item.unit.replace("pst", "")}/`}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between hover:border-amber-500/50 hover:scale-[1.02] shadow-2xs ${
                isDormant
                  ? "bg-slate-100/50 dark:bg-slate-800/25 border-slate-200/60 dark:border-slate-800/60 opacity-65 hover:opacity-100"
                  : isNext
                    ? "bg-amber-500/15 border-amber-500/40 shadow-xs ring-1 ring-amber-500/20"
                    : isPast
                      ? "bg-slate-100/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-60"
                      : "bg-white/80 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/80"
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-900 dark:text-slate-100">
                      {item.unit.toUpperCase()}
                    </span>
                    {isDormant && (
                      <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-bold">
                        S2
                      </span>
                    )}
                  </div>
                  <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md">
                    {item.totalSessions} séa. · {item.totalHours}h
                  </span>
                </div>
                <div
                  className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1 truncate"
                  title={item.title}
                >
                  {item.title.split("—")[1] || item.title}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mb-2 truncate">
                  {item.coursCount > 0 ? `${item.coursCount} cours` : ""}
                  {item.coursCount > 0 && item.visioCount > 0 ? " · " : ""}
                  {item.visioCount > 0 ? `${item.visioCount} webconf` : ""}
                  {item.distantCount > 0 ? ` · ${item.distantCount} dist.` : ""}
                </div>

                {/* Prochaine séance de l'UE */}
                {item.nextDateStr && (
                  <div
                    className={`p-2 rounded-lg border text-[11px] mb-2 ${
                      isCours
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-200"
                        : "bg-slate-100/70 dark:bg-slate-800/70 border-slate-200/80 dark:border-slate-700/70 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 font-bold">
                      <span className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400">
                        Prochaine :
                      </span>
                      <span
                        className={`text-[10px] font-mono font-black ${
                          item.nextDaysLeft <= 7
                            ? "text-rose-600 dark:text-rose-400"
                            : "text-amber-700 dark:text-amber-400"
                        }`}
                      >
                        {item.nextDaysLeft === 0
                          ? "Aujourd'hui"
                          : `J-${item.nextDaysLeft}`}
                      </span>
                    </div>
                    <div className="font-extrabold mt-0.5">
                      {item.nextDateStr} ({item.nextTimeStr})
                    </div>
                    <div className="text-[10px] flex items-center gap-1 mt-0.5 opacity-85 truncate">
                      {isCours ? (
                        <MapPin className="size-2.5 shrink-0" />
                      ) : isVisio ? (
                        <Video className="size-2.5 shrink-0" />
                      ) : (
                        <BookOpen className="size-2.5 shrink-0" />
                      )}
                      <span className="truncate">
                        {isCours
                          ? `Bègles · ${item.nextRoom ?? "Cours"}`
                          : isVisio
                            ? "Webconférence BBB"
                            : "Activité distante ENF"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/50 dark:border-slate-800 text-[10px] text-slate-500">
                <span
                  className="flex items-center gap-1 truncate"
                  title={
                    item.totalSessions > 1
                      ? `Période UE : du ${item.firstDateStr} au ${item.endDateStr}`
                      : `Ouverture UE S2 : ${item.endDateStr}`
                  }
                >
                  <Calendar className="text-slate-400 size-2.5 shrink-0" />
                  <span className="truncate">
                    {item.totalSessions > 1
                      ? `${item.firstDateStr.slice(0, 5)} → ${item.endDateStr.split(" ")[1]?.slice(0, 5)}`
                      : `Rentrée ${item.endDateStr.split(" ")[1]}`}
                  </span>
                </span>
                <span className="font-mono font-semibold flex items-center gap-0.5 shrink-0">
                  <Clock className="size-2.5" />
                  {item.totalSessions > 1
                    ? `Fin J-${item.endDaysLeft}`
                    : `J-${item.endDaysLeft}`}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

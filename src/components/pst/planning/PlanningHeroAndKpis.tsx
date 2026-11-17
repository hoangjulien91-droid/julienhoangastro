"use client";

import {
  PLANNING_EVENTS,
  type PlanningEvent,
  type PlanningEventType,
} from "@/lib/pst/data/planning";
import type { PlanningFilters } from "@/lib/pst/planning-stats";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { PlanningKpisGrid } from "./hero/PlanningKpisGrid";
import { PlanningTodaySessionBanner } from "./hero/PlanningTodaySessionBanner";
import { PlanningNextPhysicalBanner } from "./hero/PlanningNextPhysicalBanner";

interface CountdownInfo {
  isNow: boolean;
  isToday: boolean;
  badge: string;
  label: string;
  mobileLabel?: string;
}

interface PlanningHeroAndKpisProps {
  countdownText: CountdownInfo | null;
  currentOrNextTodaySession: PlanningEvent | null;
  nextPhysical: PlanningEvent | null;
  totalPlannedHours: number;
  totalPhysicalDaysCount: number;
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
  visioRemaining: number;
  visioHours: number;
  distantRemaining: number;
  distantHours: number;
  attendancePct: number;
  autoAttendanceMode: boolean;
  attendedCount: number;
  completedHours: number;
  onSelectEvent: (ev: PlanningEvent) => void;
  onToggleType: (t: PlanningEventType) => void;
  onOpenAttendanceModal: () => void;
}

export function PlanningHeroAndKpis({
  countdownText,
  currentOrNextTodaySession,
  nextPhysical,
  totalPlannedHours,
  totalPhysicalDaysCount,
  filters,
  globalTotals,
  presenceRemaining,
  visioRemaining,
  visioHours,
  distantRemaining,
  distantHours,
  attendancePct,
  autoAttendanceMode,
  attendedCount,
  completedHours,
  onSelectEvent,
  onToggleType,
  onOpenAttendanceModal,
}: PlanningHeroAndKpisProps) {
  return (
    <div className="p-6 sm:p-7 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md shadow-xs relative overflow-hidden">
      {/* Widget Compte à rebours de séance en temps réel */}
      {countdownText && (
        <button
          type="button"
          onClick={() => {
            playClickSound();
            if (currentOrNextTodaySession) {
              onSelectEvent(currentOrNextTodaySession);
            }
          }}
          className="mb-4 inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-mono text-xs font-bold shadow-xs hover:ring-2 hover:ring-amber-500/50 cursor-pointer active:scale-95 transition-all animate-fadeIn max-w-full"
          title="Cliquer pour inspecter la séance en cours / du jour"
        >
          <span
            className={`size-2 rounded-full shrink-0 ${
              countdownText.isNow
                ? "bg-rose-500 animate-ping"
                : countdownText.isToday
                  ? "bg-emerald-500 animate-pulse"
                  : "bg-amber-400 animate-pulse"
            }`}
          />
          <span className="px-1.5 py-0.5 rounded bg-white/20 dark:bg-slate-900/20 text-[10px] uppercase font-black shrink-0">
            {countdownText.badge}
          </span>
          <span className="min-w-0 truncate text-[10px] sm:text-xs">
            <span className="sm:hidden">
              {countdownText.mobileLabel ?? countdownText.label}
            </span>
            <span className="hidden sm:inline">{countdownText.label}</span>
          </span>
        </button>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[11px] font-black uppercase tracking-wider font-mono">
            <span className="size-2 rounded-full bg-amber-500" />
            <span>
              CNAM Nouvelle-Aquitaine · Titre RNCP 7 — Psychologue du travail
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            Planning &amp; Frise Chronologique
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            5 UE officielles ·{" "}
            <b>
              {PLANNING_EVENTS.length} séances programmées ({totalPlannedHours}
              h)
            </b>{" "}
            du 15 octobre 2026 au 10 mars 2027.{" "}
            <span className="hidden md:inline">
              Navigation clavier fluide{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">
                1
              </kbd>
              –
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">
                4
              </kbd>
              ,{" "}
            </span>
            <span className="md:hidden">Live activity</span>
            <span className="hidden md:inline">live activity</span> et passerelle
            Google Calendar en 1 clic.
          </p>
        </div>

        {/* Schéma d'itinéraire signature Anglet ↔ Bègles */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 shrink-0 w-full sm:w-auto self-stretch sm:self-start lg:self-center text-center">
          <div className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 mb-1">
            Trajet Unique de Présentiel
          </div>
          <svg
            width="220"
            height="56"
            viewBox="0 0 220 56"
            className="block mx-auto overflow-visible max-w-full"
          >
            <line
              x1="30"
              y1="24"
              x2="175"
              y2="24"
              stroke="#d97706"
              strokeWidth="2.5"
              strokeDasharray="2,6"
              strokeLinecap="round"
            />
            <circle cx="30" cy="24" r="6" fill="#1e293b" />
            <circle cx="30" cy="24" r="3" fill="#ffffff" />
            <text
              x="30"
              y="44"
              textAnchor="middle"
              className="text-[10px] font-bold font-mono fill-slate-700 dark:fill-slate-300"
            >
              Anglet
            </text>
            <circle cx="175" cy="24" r="7" fill="#b45309" />
            <circle cx="175" cy="24" r="3.5" fill="#fef3c7" />
            <text
              x="175"
              y="44"
              textAnchor="middle"
              className="text-[10px] font-black font-mono fill-amber-700 dark:fill-amber-400"
            >
              Cnam Bègles
            </text>
          </svg>
          <p className="mt-1.5 text-[10px] font-mono font-medium text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-700/60 pt-1.5 text-center leading-snug m-0">
            <span>
              🚗 ~190 km via A63 • Covoit&apos; Groupe Cnam (1 voiture / max 5 •{" "}
              {totalPhysicalDaysCount} j.)
            </span>
          </p>
        </div>
      </div>

      {/* 2. Trio de widgets KPI + Assiduité */}
      <PlanningKpisGrid
        filters={filters}
        globalTotals={globalTotals}
        presenceRemaining={presenceRemaining}
        totalPhysicalDaysCount={totalPhysicalDaysCount}
        visioRemaining={visioRemaining}
        visioHours={visioHours}
        distantRemaining={distantRemaining}
        distantHours={distantHours}
        attendancePct={attendancePct}
        autoAttendanceMode={autoAttendanceMode}
        attendedCount={attendedCount}
        completedHours={completedHours}
        totalPlannedHours={totalPlannedHours}
        onToggleType={onToggleType}
        onOpenAttendanceModal={onOpenAttendanceModal}
      />

      {/* 2.5 Bannière prioritaire : Séance du jour */}
      {currentOrNextTodaySession && (
        <PlanningTodaySessionBanner
          session={currentOrNextTodaySession}
          onSelectEvent={onSelectEvent}
        />
      )}

      {/* 3. Prochaine Séance Présentielle (Bègles) */}
      {nextPhysical && (
        <PlanningNextPhysicalBanner
          nextPhysical={nextPhysical}
          onSelectEvent={onSelectEvent}
        />
      )}
    </div>
  );
}

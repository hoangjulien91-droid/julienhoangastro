"use client";

import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Laptop,
  MapPin,
  Video,
} from "lucide-react";
import { Link } from "@/components/common/Link";
import {
  PLANNING_EVENTS,
  UNIT_TITLES,
  type PlanningEvent,
  type PlanningEventType,
} from "@/lib/pst/data/planning";
import {
  eventLocation,
  formatFrDate,
  type PlanningFilters,
} from "@/lib/pst/planning-stats";
import { playClickSound } from "@/lib/pst/audio-feedback";

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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-slate-200/70 dark:border-slate-800">
        {/* Widget 1 : Présentiel Bègles */}
        <div
          onClick={() => onToggleType("COURS")}
          className={`p-2.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
            filters.types.has("COURS")
              ? "bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/35 shadow-2xs ring-1 ring-amber-500/20"
              : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 opacity-60 hover:opacity-100"
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5 sm:mb-2 gap-1">
              <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1 sm:gap-1.5 truncate">
                <Building2 className="size-3.5 sm:size-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="truncate">Bègles</span>
              </span>
              <span className="text-[10px] font-mono font-black uppercase px-1.5 sm:px-2 py-0.5 rounded bg-amber-500/20 text-amber-900 dark:text-amber-100 shrink-0">
                {globalTotals.coursEvents} séa.
              </span>
            </div>
            <div className="text-lg sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {presenceRemaining.sessions} restantes
            </div>
          </div>
          <div className="text-[11px] leading-tight text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 sm:line-clamp-none">
            {presenceRemaining.total} j. restants / {totalPhysicalDaysCount}{" "}
            j. · Cnam Bègles
          </div>
        </div>

        {/* Widget 2 : Webconférences */}
        <div
          onClick={() => onToggleType("WEBCONF")}
          className={`p-2.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
            filters.types.has("WEBCONF")
              ? "bg-indigo-500/10 dark:bg-indigo-500/15 border-indigo-500/35 shadow-2xs ring-1 ring-indigo-500/20"
              : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 opacity-60 hover:opacity-100"
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5 sm:mb-2 gap-1">
              <span className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1 sm:gap-1.5 truncate">
                <Video className="size-3.5 sm:size-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="truncate">Webconf.</span>
              </span>
              <span className="text-[10px] font-mono font-black uppercase px-1.5 sm:px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-900 dark:text-indigo-100 shrink-0">
                {globalTotals.visioEvents} séa.
              </span>
            </div>
            <div className="text-lg sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {visioRemaining} restantes
            </div>
          </div>
          <div className="text-[11px] leading-tight text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 sm:line-clamp-none">
            {visioHours}h synchrones · BigBlueButton
          </div>
        </div>

        {/* Widget 3 : Activités Distantes */}
        <div
          onClick={() => onToggleType("DISTANT")}
          className={`p-2.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
            filters.types.has("DISTANT")
              ? "bg-slate-700/10 dark:bg-slate-700/20 border-slate-600/35 shadow-2xs ring-1 ring-slate-600/20"
              : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 opacity-60 hover:opacity-100"
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5 sm:mb-2 gap-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 sm:gap-1.5 truncate">
                <Laptop className="size-3.5 sm:size-4 text-slate-600 dark:text-slate-400 shrink-0" />
                <span className="truncate">ENF</span>
              </span>
              <span className="text-[10px] font-mono font-black uppercase px-1.5 sm:px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 shrink-0">
                {globalTotals.distantEvents} créneaux
              </span>
            </div>
            <div className="text-lg sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
              {distantRemaining} restants
            </div>
          </div>
          <div className="text-[11px] leading-tight text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 sm:line-clamp-none">
            {distantHours}h asynchrones guidées · ENF
          </div>
        </div>

        {/* Widget 4 : Assiduité */}
        <div
          onClick={() => {
            playClickSound();
            onOpenAttendanceModal();
          }}
          className="p-2.5 sm:p-4 rounded-2xl border border-emerald-500/35 bg-emerald-500/10 dark:bg-emerald-500/15 shadow-2xs flex flex-col justify-between cursor-pointer hover:border-emerald-500/60 transition-all group"
          title="Cliquer pour afficher le détail de l'assiduité par UE (159h)"
        >
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5 sm:mb-2 gap-1">
              <span className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1 sm:gap-1.5 truncate">
                <CheckCircle2 className="size-3.5 sm:size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="truncate">Assiduité</span>
              </span>
              <div className="flex items-center gap-1 shrink-0">
                {autoAttendanceMode && (
                  <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-600 text-white">
                    Auto
                  </span>
                )}
                <span className="text-[10px] font-mono font-black uppercase px-1.5 sm:px-2 py-0.5 rounded bg-emerald-500/25 text-emerald-900 dark:text-emerald-100">
                  {attendancePct}%
                </span>
              </div>
            </div>
            <div className="text-lg sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {attendedCount} / {PLANNING_EVENTS.length}
            </div>
            <div className="text-[11px] leading-tight text-slate-600 dark:text-slate-300 mt-1 flex items-center justify-between">
              <span>
                {completedHours}h / {totalPlannedHours}h
              </span>
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 group-hover:underline">
                Détail →
              </span>
            </div>
          </div>
          <div className="w-full h-1.5 sm:h-2 rounded-full bg-emerald-950/20 dark:bg-emerald-900/40 overflow-hidden mt-2">
            <div
              className="h-full bg-emerald-600 dark:bg-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${attendancePct}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2.5 Bannière prioritaire : Séance du jour */}
      {currentOrNextTodaySession && (
        <div className="mt-5 p-3.5 sm:p-4 rounded-2xl border-2 border-emerald-500/50 bg-gradient-to-br sm:bg-gradient-to-r from-emerald-500/15 via-emerald-500/10 to-transparent flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 sm:gap-4 shadow-sm animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="relative p-2.5 rounded-xl bg-emerald-600 text-white font-bold shrink-0 shadow-xs mt-0.5 sm:mt-0">
              <Video className="size-4 sm:size-5" />
              <span className="absolute -top-1 -right-1 size-2.5 sm:size-3 rounded-full bg-emerald-400 animate-ping" />
              <span className="absolute -top-1 -right-1 size-2.5 sm:size-3 rounded-full bg-emerald-500" />
            </div>
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-mono text-[10px] font-black uppercase shrink-0">
                  Aujourd&apos;hui · {currentOrNextTodaySession.start} –{" "}
                  {currentOrNextTodaySession.end}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-mono text-[10px] font-black uppercase shrink-0">
                  {currentOrNextTodaySession.unit.toUpperCase()}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-900 dark:text-emerald-100 text-[10px] font-bold shrink-0">
                  {currentOrNextTodaySession.type === "WEBCONF"
                    ? "Webconférence"
                    : currentOrNextTodaySession.type === "COURS"
                      ? "Présentiel"
                      : "ENF"}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug">
                {UNIT_TITLES[currentOrNextTodaySession.unit]}
              </h3>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Intervenant : <b>{currentOrNextTodaySession.teacher}</b> ·{" "}
                {currentOrNextTodaySession.type === "WEBCONF"
                  ? "Plateforme synchrone BigBlueButton (ENF)"
                  : currentOrNextTodaySession.type === "COURS"
                    ? `Salle ${currentOrNextTodaySession.room ?? "Cnam Bègles"}`
                    : "Activité asynchrone ENF"}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full lg:w-auto">
            <a
              href="https://lecnam.net/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-xs"
              title="Rejoindre directement la salle de cours sur l'ENF"
            >
              <Video className="size-3.5" />
              <span>Rejoindre BigBlueButton (ENF)</span>
              <ExternalLink className="size-3 opacity-75" />
            </a>

            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
              <Link
                href={`/pst/${currentOrNextTodaySession.unit.replace("pst", "")}/`}
                onClick={() => playClickSound()}
                className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-2xs"
                title={`Ouvrir les fiches et notes de cours de ${currentOrNextTodaySession.unit.toUpperCase()}`}
              >
                <BookOpen className="size-3.5 text-amber-600" />
                <span>
                  Notes {currentOrNextTodaySession.unit.toUpperCase()}
                </span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onSelectEvent(currentOrNextTodaySession);
                }}
                className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-xs"
                title="Inspecter la séance dans le panneau de détails"
              >
                <span>Inspecter</span>
                <ArrowRight className="size-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Prochaine Séance Présentielle (Bègles) */}
      {nextPhysical && (
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
      )}
    </div>
  );
}

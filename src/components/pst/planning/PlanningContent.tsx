"use client";

import {
  BarChart3,
  ListFilter,
  Calendar,
  Printer,
  Search,
  HelpCircle,
  Car,
  Laptop,
  Layers,
  Building2,
  Video,
  Globe,
  BookOpen,
  AlertTriangle,
  Check,
  X,
  CalendarPlus,
  ArrowRight,
  User,
  MapPin,
  Clock,
  FileText,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Sparkles,
  CheckCircle2,
  Copy,
  ExternalLink,
  Flame,
  Volume2,
} from "lucide-react";
import { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "@/components/common/Link";
import "./planning.css";
import {
  PLANNING_EVENTS,
  UNIT_ORDER,
  UNIT_TITLES,
  type PlanningEvent,
  type PlanningEventType,
  type PlanningUnitId,
} from "@/lib/pst/data/planning";
import {
  PLANNING_WEEKS,
  computeDistantDaysRemaining,
  computeGlobalPlanningTotals,
  computePresenceDaysRemaining,
  computeVisioDaysRemaining,
  eventId,
  eventLocation,
  formatFrDate,
  getAllTeachers,
  getEventConflicts,
  getConflictSeverity,
  getEventDurationHours,
  getNextEvent,
  getNextWebconfEvent,
  getNextPhysicalEvent,
  isoWeekKey,
  matchesFilters,
  type PlanningFilters,
} from "@/lib/pst/planning-stats";
import { downloadIcs, buildGoogleCalendarUrl } from "@/lib/pst/ics-export";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";
import { ModulesNav } from "@/components/pst/shell/ModulesNav";
import studyIndexData from "@/lib/pst/data/study-index.json";
import { PlanningGrid } from "./PlanningGrid";
import { PlanningList } from "./PlanningList";

const FILTERS_KEY = "pst_planning_filters_v2";
const VIEW_KEY = "pst_planning_view_v1";
const ATTENDANCE_KEY = "pst_planning_attendance_v1";
const ARBITRATION_KEY = "pst_planning_arbitrations_v1";

interface StoredFilters {
  version?: number;
  units: PlanningUnitId[];
  types: PlanningEventType[];
  sessions: (1 | 2)[];
}

interface StoredAttendance {
  attended: string[];
  notes: Record<string, string>;
}

interface GlossaryTerm {
  w: string;
  def: string;
  m: string;
}

const ALL_GLOSSARY_TERMS = ((studyIndexData as unknown as { glossaire: GlossaryTerm[] })
  .glossaire ?? []) as GlossaryTerm[];

function defaultFilters(): PlanningFilters {
  return {
    units: new Set(UNIT_ORDER),
    types: new Set<PlanningEventType>(["COURS", "WEBCONF", "DISTANT", "EXAMEN"]),
    sessions: new Set([1, 2]),
    teacher: "all",
    search: "",
    onlyConflicts: false,
    hidePast: false,
    todayIso: null,
  };
}

function loadFilters(): PlanningFilters {
  try {
    const raw = window.localStorage.getItem(FILTERS_KEY);
    if (!raw) return defaultFilters();
    const parsed = JSON.parse(raw) as StoredFilters;
    if (parsed.version !== 4) return defaultFilters();
    return {
      ...defaultFilters(),
      units: new Set(parsed.units),
      types: new Set(parsed.types),
      sessions: new Set(parsed.sessions),
    };
  } catch {
    return defaultFilters();
  }
}

function toggleInSet<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

export function PlanningContent() {
  const [filters, setFilters] = useState<PlanningFilters>(defaultFilters);
  const [activeView, setActiveView] = useState<
    "grid" | "week" | "list" | "logistics"
  >("grid");
  const [selectedWeekIdx, setSelectedWeekIdx] = useState(0);
  const [todayWeekKey, setTodayWeekKey] = useState<string | null>(null);
  const [todayIso, setTodayIso] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<PlanningEvent | null>(
    null,
  );
  const [attendedIds, setAttendedIds] = useState<Set<string>>(new Set());
  const [sessionNotes, setSessionNotes] = useState<Record<string, string>>({});
  // Arbitrage pour les 3 samedis de conflits en présentiel : clé = date ("2026-11-07"), valeur = id ou unit choisie
  const [chosenConflicts, setChosenConflicts] = useState<Record<string, string>>({});
  const [briefingCopied, setBriefingCopied] = useState(false);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const allTeachers = useMemo(() => getAllTeachers(), []);
  const totalConflictsCount = useMemo(
    () => PLANNING_EVENTS.filter((e) => getEventConflicts(e).length > 0).length,
    [],
  );
  const physicalConflictsCount = useMemo(
    () =>
      PLANNING_EVENTS.filter((e) => {
        const confs = getEventConflicts(e);
        return confs.length > 0 && getConflictSeverity(e, confs) === "PRESENCE_CRITICAL";
      }).length,
    [],
  );
  const replayableConflictsCount = useMemo(
    () =>
      PLANNING_EVENTS.filter((e) => {
        const confs = getEventConflicts(e);
        return confs.length > 0 && getConflictSeverity(e, confs) === "WEBCONF_REPLAYABLE";
      }).length,
    [],
  );
  const totalPlannedHours = useMemo(
    () =>
      PLANNING_EVENTS.reduce((acc, e) => acc + getEventDurationHours(e), 0),
    [],
  );

  const nextImmediate = useMemo(() => getNextEvent(), []);
  const nextPhysical = useMemo(() => getNextPhysicalEvent(), []);

  // =========================================================================
  // HOOK DE COMPTE À REBOURS EN TEMPS RÉEL (STYLE DYNAMIC ISLAND IOS 18)
  // =========================================================================
  const [countdownText, setCountdownText] = useState<{
    badge: string;
    label: string;
    isNow: boolean;
    isToday: boolean;
  } | null>(null);

  useEffect(() => {
    if (!nextImmediate) return;

    function computeCountdown() {
      const now = new Date();
      const [y, m, d] = nextImmediate.date.split("-").map(Number);
      const [h, min] = nextImmediate.start.split(":").map(Number);
      const targetStart = new Date(y, m - 1, d, h, min, 0);

      const [hEnd, minEnd] = nextImmediate.end.split(":").map(Number);
      const targetEnd = new Date(y, m - 1, d, hEnd, minEnd, 0);

      if (now >= targetStart && now <= targetEnd) {
        setCountdownText({
          badge: "EN DIRECT",
          label: `Séance ${nextImmediate.unit.toUpperCase()} en cours jusqu'à ${nextImmediate.end}`,
          isNow: true,
          isToday: true,
        });
        return;
      }

      const diffMs = targetStart.getTime() - now.getTime();
      const isToday =
        now.getFullYear() === y &&
        now.getMonth() === m - 1 &&
        now.getDate() === d;

      if (isToday && diffMs > 0) {
        const diffHours = Math.floor(diffMs / 3600000);
        const diffMins = Math.floor((diffMs % 3600000) / 60000);
        setCountdownText({
          badge: "AUJOURD'HUI",
          label: `${nextImmediate.unit.toUpperCase()} à ${nextImmediate.start} (dans ${diffHours}h ${diffMins}m)`,
          isNow: false,
          isToday: true,
        });
        return;
      }

      if (diffMs > 0) {
        const totalSec = Math.floor(diffMs / 1000);
        const days = Math.floor(totalSec / 86400);
        const hours = Math.floor((totalSec % 86400) / 3600);
        const minutes = Math.floor((totalSec % 3600) / 60);

        setCountdownText({
          badge: `J-${days}`,
          label: `Prochaine séance : ${nextImmediate.day} ${formatFrDate(nextImmediate.date)} à ${nextImmediate.start} (${nextImmediate.unit.toUpperCase()} · ${hours}h ${minutes}m)`,
          isNow: false,
          isToday: false,
        });
      } else {
        setCountdownText(null);
      }
    }

    computeCountdown();
    const timer = setInterval(computeCountdown, 1000);
    return () => clearInterval(timer);
  }, [nextImmediate]);

  useEffect(() => {
    const now = new Date();
    const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    setTodayIso(iso);
    setTodayWeekKey(isoWeekKey(iso));
    const loaded = loadFilters();
    loaded.todayIso = iso;
    setFilters(loaded);

    const storedView = window.localStorage.getItem(VIEW_KEY);
    if (
      storedView === "grid" ||
      storedView === "week" ||
      storedView === "list" ||
      storedView === "logistics"
    ) {
      setActiveView(storedView);
    }

    try {
      const rawAtt = window.localStorage.getItem(ATTENDANCE_KEY);
      if (rawAtt) {
        const parsedAtt = JSON.parse(rawAtt) as StoredAttendance;
        if (Array.isArray(parsedAtt.attended)) {
          setAttendedIds(new Set(parsedAtt.attended));
        }
        if (parsedAtt.notes && typeof parsedAtt.notes === "object") {
          setSessionNotes(parsedAtt.notes);
        }
      }
      const rawArb = window.localStorage.getItem(ARBITRATION_KEY);
      if (rawArb) {
        const parsedArb = JSON.parse(rawArb);
        if (parsedArb && typeof parsedArb === "object") {
          setChosenConflicts(parsedArb);
        }
      }
    } catch {
      // ignore
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const stored: StoredFilters = {
        version: 4,
        units: Array.from(filters.units),
        types: Array.from(filters.types),
        sessions: Array.from(filters.sessions),
      };
      window.localStorage.setItem(FILTERS_KEY, JSON.stringify(stored));
    } catch {
      // ignore
    }
  }, [filters.units, filters.types, filters.sessions, hydrated]);

  function saveAttendance(nextAttended: Set<string>, nextNotes: Record<string, string>) {
    setAttendedIds(nextAttended);
    setSessionNotes(nextNotes);
    try {
      const payload: StoredAttendance = {
        attended: Array.from(nextAttended),
        notes: nextNotes,
      };
      window.localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(payload));
      window.dispatchEvent(new CustomEvent("pst:storage-updated"));
    } catch {
      // ignore
    }
  }

  function handleToggleAttended(id: string) {
    const isAdding = !attendedIds.has(id);
    if (isAdding) {
      playSuccessSound();
    } else {
      playClickSound();
    }
    const next = toggleInSet(attendedIds, id);
    saveAttendance(next, sessionNotes);
  }

  function handleSetConflictArbitration(date: string, chosenUnitOrId: string) {
    playSuccessSound();
    setChosenConflicts((prev) => {
      const next = { ...prev, [date]: chosenUnitOrId };
      try {
        window.localStorage.setItem(ARBITRATION_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  function handleUpdateNote(id: string, note: string) {
    const nextNotes = { ...sessionNotes, [id]: note };
    if (!note.trim()) delete nextNotes[id];
    saveAttendance(attendedIds, nextNotes);
  }

  function setView(v: "grid" | "week" | "list" | "logistics") {
    playClickSound();
    setActiveView(v);
    try {
      window.localStorage.setItem(VIEW_KEY, v);
    } catch {
      // ignore
    }
  }

  function toggleUnit(u: PlanningUnitId) {
    playClickSound();
    setFilters((f) => ({ ...f, units: toggleInSet(f.units, u) }));
  }
  function toggleType(t: PlanningEventType) {
    playClickSound();
    setFilters((f) => ({ ...f, types: toggleInSet(f.types, t) }));
  }

  const presenceRemaining = computePresenceDaysRemaining();
  const visioRemaining = computeVisioDaysRemaining();
  const distantRemaining = computeDistantDaysRemaining();

  const completedHours = useMemo(
    () =>
      PLANNING_EVENTS.filter((e) => attendedIds.has(eventId(e))).reduce(
        (acc, e) => acc + getEventDurationHours(e),
        0,
      ),
    [attendedIds],
  );
  const attendancePct = PLANNING_EVENTS.length
    ? Math.round((attendedIds.size * 100) / PLANNING_EVENTS.length)
    : 0;

  // Group physical courses by date for the Logistics view
  const presenceDaysGroups = useMemo(() => {
    const cours = PLANNING_EVENTS.filter(
      (e) => e.type === "COURS" && filters.units.has(e.unit),
    ).sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
    const map = new Map<string, PlanningEvent[]>();
    for (const c of cours) {
      const list = map.get(c.date) ?? [];
      list.push(c);
      map.set(c.date, list);
    }
    return Array.from(map.entries());
  }, [filters.units]);

  // Group filtered events by active week for the Agenda Hebdo view
  const activeWeeksData = useMemo(() => {
    const filtered = PLANNING_EVENTS.filter((e) => matchesFilters(e, filters)).sort(
      (a, b) => (a.date + a.start).localeCompare(b.date + b.start),
    );
    const byWeek = new Map<string, PlanningEvent[]>();
    for (const ev of filtered) {
      const wk = isoWeekKey(ev.date);
      const list = byWeek.get(wk) ?? [];
      list.push(ev);
      byWeek.set(wk, list);
    }
    return PLANNING_WEEKS.weeks
      .filter((w) => byWeek.has(w.key))
      .map((w) => {
        const events = byWeek.get(w.key) ?? [];
        const byDay = new Map<string, PlanningEvent[]>();
        for (const ev of events) {
          const dList = byDay.get(ev.date) ?? [];
          dList.push(ev);
          byDay.set(ev.date, dList);
        }
        const totalHours = events.reduce(
          (acc, ev) => acc + getEventDurationHours(ev),
          0,
        );
        return {
          week: w,
          events,
          days: Array.from(byDay.entries()),
          totalHours,
        };
      });
  }, [filters]);

  const safeWeekIdx =
    activeWeeksData.length > 0
      ? Math.min(selectedWeekIdx, activeWeeksData.length - 1)
      : 0;
  const currentWeekData = activeWeeksData[safeWeekIdx] ?? null;

  function jumpToNextUpcomingWeek() {
    playClickSound();
    if (activeWeeksData.length === 0) return;
    const refIso = todayIso ?? new Date().toISOString().slice(0, 10);
    const idx = activeWeeksData.findIndex((w) =>
      w.events.some((e) => e.date >= refIso),
    );
    setSelectedWeekIdx(idx >= 0 ? idx : 0);
  }

  // =========================================================================
  // GESTION DES RACCOURCIS CLAVIER PRO (LINEAR / RAYCAST STYLE)
  // =========================================================================
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isInput =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement;

      if (e.key === "Escape") {
        if (selectedEvent) {
          setSelectedEvent(null);
          playClickSound();
        } else if (filters.search) {
          setFilters((f) => ({ ...f, search: "" }));
          playClickSound();
          if (searchInputRef.current) searchInputRef.current.blur();
        }
        return;
      }

      if (isInput) return;

      if (e.key === "1") {
        e.preventDefault();
        setView("grid");
      } else if (e.key === "2") {
        e.preventDefault();
        setView("week");
      } else if (e.key === "3") {
        e.preventDefault();
        setView("list");
      } else if (e.key === "4") {
        e.preventDefault();
        setView("logistics");
      } else if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        jumpToNextUpcomingWeek();
      } else if (e.key === "/" || (e.metaKey && e.key === "k")) {
        e.preventDefault();
        searchInputRef.current?.focus();
        playClickSound();
      } else if (e.key === "ArrowLeft" && activeView === "week") {
        e.preventDefault();
        playClickSound();
        setSelectedWeekIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "ArrowRight" && activeView === "week") {
        e.preventDefault();
        playClickSound();
        setSelectedWeekIdx((i) => Math.min(activeWeeksData.length - 1, i + 1));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedEvent, filters.search, activeView, activeWeeksData.length]);

  const selectedId = selectedEvent ? eventId(selectedEvent) : null;
  const selectedConflicts = selectedEvent
    ? getEventConflicts(selectedEvent)
    : [];
  const selectedIsAttended = selectedId ? attendedIds.has(selectedId) : false;
  const selectedNote = selectedId ? (sessionNotes[selectedId] ?? "") : "";

  // Extraction des 3 concepts clés liés à l'UE inspectée (Feature 5)
  const unitConcepts = useMemo(() => {
    if (!selectedEvent) return [];
    const normalizedUnit = selectedEvent.unit.toLowerCase();
    const shortUnit = normalizedUnit.replace("pst", "");
    return ALL_GLOSSARY_TERMS.filter(
      (term) =>
        term.m.toLowerCase() === normalizedUnit ||
        term.m.toLowerCase() === shortUnit,
    ).slice(0, 3);
  }, [selectedEvent]);

  // Copie de la fiche mémo / Briefing de poche dans le presse-papier
  function handleCopyBriefing() {
    if (!selectedEvent) return;
    const text = [
      `[BRIEFING CNAM] ${selectedEvent.unit.toUpperCase()} — ${UNIT_TITLES[selectedEvent.unit]}`,
      `📅 Séance : ${selectedEvent.day} ${formatFrDate(selectedEvent.date)} (${selectedEvent.start} – ${selectedEvent.end})`,
      `📍 Lieu : ${selectedEvent.room ?? eventLocation(selectedEvent) ?? "ENF"}`,
      `👤 Intervenant : ${selectedEvent.teacher}`,
      "",
      "🧠 CONCEPTS CLÉS DE L'UE :",
      ...unitConcepts.map((c) => `• ${c.w} : ${c.def}`),
      selectedNote ? `\n📝 NOTE PERSONNELLE : ${selectedNote}` : "",
      `\n🔗 Planning interactif : https://julienhoang.com/pst/planning/`,
    ].filter(Boolean).join("\n");

    navigator.clipboard.writeText(text);
    playSuccessSound();
    setBriefingCopied(true);
    setTimeout(() => setBriefingCopied(false), 2500);
  }

  return (
    <div className="planning-wrap space-y-6">
      <ModulesNav active="planning" />

      {/* ========================================================================= */}
      {/* 1. HEADER APPLE-STYLE AVEC DYNAMIC ISLAND & SCHÉMA ITINÉRAIRE             */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md shadow-xs relative overflow-hidden">
        {/* Dynamic Island Live Activity Countdown Widget */}
        {countdownText && (
          <div className="mb-4 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-mono text-xs font-bold shadow-xs animate-fadeIn">
            <span
              className={`size-2 rounded-full ${
                countdownText.isNow
                  ? "bg-rose-500 animate-ping"
                  : countdownText.isToday
                    ? "bg-emerald-500 animate-pulse"
                    : "bg-amber-400 animate-pulse"
              }`}
            />
            <span className="px-1.5 py-0.2 rounded bg-white/20 dark:bg-slate-900/20 text-[10px] uppercase font-black">
              {countdownText.badge}
            </span>
            <span className="truncate max-w-sm sm:max-w-md">{countdownText.label}</span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[11px] font-black uppercase tracking-wider font-mono">
              <span className="size-2 rounded-full bg-amber-500" />
              <span>CNAM Nouvelle-Aquitaine · Titre RNCP 7 — Psychologue du travail</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
              Planning &amp; Frise Chronologique
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              5 UE officielles · <b>69 séances programmées ({totalPlannedHours}h)</b> du 15 octobre 2026 au 10 mars 2027.
              Navigation clavier fluide <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">1</kbd>–<kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">4</kbd>, live activity et passerelle Google Calendar en 1 clic.
            </p>
          </div>

          {/* Schéma d'itinéraire signature Anglet ↔ Bègles */}
          <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 shrink-0 self-start lg:self-center">
            <div className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 text-center mb-1">
              Trajet Unique de Présentiel
            </div>
            <svg width="200" height="60" viewBox="0 0 200 60" className="block mx-auto">
              <line
                x1="25"
                y1="30"
                x2="175"
                y2="30"
                stroke="#d97706"
                strokeWidth="2.5"
                strokeDasharray="2,6"
                strokeLinecap="round"
              />
              <circle cx="25" cy="30" r="6" fill="#1e293b" />
              <circle cx="25" cy="30" r="3" fill="#ffffff" />
              <text x="25" y="50" textAnchor="middle" className="text-[10px] font-bold font-mono fill-slate-700 dark:fill-slate-300">
                Anglet
              </text>
              <circle cx="175" cy="30" r="7" fill="#b45309" />
              <circle cx="175" cy="30" r="3.5" fill="#fef3c7" />
              <text x="175" y="50" textAnchor="middle" className="text-[10px] font-black font-mono fill-amber-700 dark:fill-amber-400">
                Cnam Bègles
              </text>
            </svg>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. TRIO DE WIDGETS KPI APPLE GLASSMORPHISM + ASSIDUITÉ                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-slate-200/70 dark:border-slate-800">
          {/* Widget 1 : Présentiel Bègles */}
          <div
            onClick={() => toggleType("COURS")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              filters.types.has("COURS")
                ? "bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/35 shadow-2xs ring-1 ring-amber-500/20"
                : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 opacity-60 hover:opacity-100"
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <Building2 className="size-4 text-amber-600 dark:text-amber-400" />
                <span>Cours Bègles</span>
              </span>
              <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-900 dark:text-amber-100">
                19 séances
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {presenceRemaining.sessions} restants
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {presenceRemaining.total} j. de déplacement · Salle Grégoire / Carnot
            </div>
          </div>

          {/* Widget 2 : Webconférences */}
          <div
            onClick={() => toggleType("WEBCONF")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              filters.types.has("WEBCONF")
                ? "bg-indigo-500/10 dark:bg-indigo-500/15 border-indigo-500/35 shadow-2xs ring-1 ring-indigo-500/20"
                : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 opacity-60 hover:opacity-100"
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                <Video className="size-4 text-indigo-600 dark:text-indigo-400" />
                <span>Webconférences</span>
              </span>
              <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-900 dark:text-indigo-100">
                27 séances
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {visioRemaining} restantes
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              81h synchrones en ligne · BigBlueButton
            </div>
          </div>

          {/* Widget 3 : Activités Distantes */}
          <div
            onClick={() => toggleType("DISTANT")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              filters.types.has("DISTANT")
                ? "bg-slate-700/10 dark:bg-slate-700/20 border-slate-600/35 shadow-2xs ring-1 ring-slate-600/20"
                : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 opacity-60 hover:opacity-100"
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Laptop className="size-4 text-slate-600 dark:text-slate-400" />
                <span>Activités ENF</span>
              </span>
              <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                23 créneaux
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {distantRemaining} restants
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Travail asynchrone guidé · Espace Numérique
            </div>
          </div>

          {/* Widget 4 : Assiduité Apple Watch Style */}
          <div className="p-4 rounded-2xl border border-emerald-500/35 bg-emerald-500/10 dark:bg-emerald-500/15 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Assiduité</span>
                </span>
                <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-emerald-500/25 text-emerald-900 dark:text-emerald-100">
                  {attendancePct}%
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                {attendedIds.size} / {PLANNING_EVENTS.length}
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                {completedHours}h réalisées sur {totalPlannedHours}h
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-emerald-950/20 dark:bg-emerald-900/40 overflow-hidden mt-2.5">
              <div
                className="h-full bg-emerald-600 dark:bg-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${attendancePct}%` }}
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. NOTIFICATION CARD : Prochaine Séance Présentielle (Bègles)               */}
        {/* ========================================================================= */}
        {nextPhysical && (
          <div className="mt-5 p-4 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-amber-600 text-white font-bold shrink-0 shadow-xs">
                <MapPin className="size-5" />
              </span>
              <div className="space-y-0.5">
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2 flex-wrap">
                  <span>
                    Rentrée Présentielle à Cnam Bègles : {nextPhysical.day}{" "}
                    {formatFrDate(nextPhysical.date)}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-600 text-white font-mono text-[10px] font-black uppercase">
                    {nextPhysical.unit.toUpperCase()} · {nextPhysical.start} – {nextPhysical.end}
                  </span>
                  <span className="text-[11px] font-mono text-amber-800 dark:text-amber-300 font-bold">
                    {nextPhysical.room ? `${nextPhysical.room} · ` : ""}
                    {nextPhysical.teacher}
                  </span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Adresse : {eventLocation(nextPhysical)} · 1ère des 19 séances en présentiel.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setSelectedEvent(nextPhysical);
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shrink-0 transition-all shadow-xs"
            >
              <Clock className="size-3.5" />
              <span>Inspecter la séance du 17/10</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. SEGMENTED CONTROL MACOS AVEC MICRO-KBD (RACCOURCIS 1, 2, 3, 4)         */}
      {/* ========================================================================= */}
      <div className="p-3 sm:p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md shadow-xs space-y-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Le Segmented Control Apple avec badges de touches */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60 shadow-inner flex-wrap">
            <button
              type="button"
              onClick={() => setView("grid")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                activeView === "grid"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <BarChart3 className="size-3.5" />
              <span>Vue Frise (36 sem.)</span>
              <kbd className="px-1 py-0.2 rounded bg-black/10 dark:bg-white/10 font-mono text-[9px] font-bold">1</kbd>
            </button>

            <button
              type="button"
              onClick={() => setView("week")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                activeView === "week"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <CalendarDays className="size-3.5" />
              <span>Agenda Hebdo</span>
              <kbd className="px-1 py-0.2 rounded bg-black/10 dark:bg-white/10 font-mono text-[9px] font-bold">2</kbd>
            </button>

            <button
              type="button"
              onClick={() => setView("list")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                activeView === "list"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <ListFilter className="size-3.5" />
              <span>Liste Mensuelle</span>
              <kbd className="px-1 py-0.2 rounded bg-black/10 dark:bg-white/10 font-mono text-[9px] font-bold">3</kbd>
            </button>

            <button
              type="button"
              onClick={() => setView("logistics")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                activeView === "logistics"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <Car className="size-3.5" />
              <span>Trajets Bègles (14 j.)</span>
              <kbd className="px-1 py-0.2 rounded bg-black/10 dark:bg-white/10 font-mono text-[9px] font-bold">4</kbd>
            </button>
          </div>

          {/* Actions rapides Export & Print */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                downloadIcs(
                  PLANNING_EVENTS.filter((e) => matchesFilters(e, filters)),
                  "planning-pst-cnam.ics",
                );
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs"
              title="Exporter les séances filtrées au format .ics"
            >
              <CalendarPlus className="size-3.5 text-amber-600" />
              <span>Exporter .ics</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                window.print();
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs"
            >
              <Printer className="size-3.5" />
              <span>Imprimer / PDF</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. FILTRES AVEC TIROIR ADAPTATIF MOBILE (APPLE S-TIER+)                  */}
        {/* ========================================================================= */}
        <div className="pt-3 border-t border-slate-200/70 dark:border-slate-800/80 space-y-2.5">
          {/* Rangée 1 : Modalités & Filtres Principaux (Scrollable horizontal tactile sur mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 sm:flex-wrap scrollbar-none text-xs">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setFilters((f) => ({
                  ...defaultFilters(),
                  todayIso: f.todayIso,
                }));
              }}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all shrink-0 cursor-pointer active:scale-95 ${
                filters.types.has("COURS") &&
                filters.types.has("WEBCONF") &&
                filters.types.has("DISTANT") &&
                !filters.onlyConflicts &&
                !filters.hidePast &&
                filters.units.size === UNIT_ORDER.length
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-2xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              }`}
            >
              <Globe className="inline-block mr-1 size-3" />
              Tout (69)
            </button>

            <button
              type="button"
              onClick={() => toggleType("COURS")}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all shrink-0 cursor-pointer active:scale-95 ${
                filters.types.has("COURS")
                  ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
                  : "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30"
              }`}
            >
              <Building2 className="inline-block mr-1 size-3" />
              Cours Bègles (19)
            </button>

            <button
              type="button"
              onClick={() => toggleType("WEBCONF")}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all shrink-0 cursor-pointer active:scale-95 ${
                filters.types.has("WEBCONF")
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                  : "bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border-indigo-500/30"
              }`}
            >
              <Video className="inline-block mr-1 size-3" />
              Webconf. (27)
            </button>

            <button
              type="button"
              onClick={() => toggleType("DISTANT")}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all shrink-0 cursor-pointer active:scale-95 ${
                filters.types.has("DISTANT")
                  ? "bg-slate-700 text-white border-slate-700 shadow-2xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              }`}
            >
              <BookOpen className="inline-block mr-1 size-3" />
              Distantes (23)
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setFilters((f) => ({ ...f, onlyConflicts: !f.onlyConflicts }));
              }}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all shrink-0 cursor-pointer active:scale-95 ${
                filters.onlyConflicts
                  ? "bg-rose-600 text-white border-rose-600 shadow-2xs"
                  : "bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/30"
              }`}
              title={`${physicalConflictsCount} cours présentiels simultanés critiques · ${replayableConflictsCount} séances avec webconférence`}
            >
              <AlertTriangle className="inline-block mr-1 size-3 text-amber-500" />
              Chevauchements ({totalConflictsCount})
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                setFilters((f) => ({ ...f, hidePast: !f.hidePast }));
              }}
              className={`px-3 py-1.5 rounded-xl font-bold border transition-all shrink-0 cursor-pointer active:scale-95 ${
                filters.hidePast
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              }`}
            >
              <EyeOff className="inline-block mr-1 size-3" />
              À venir uniquement
            </button>
          </div>

          {/* Rangée 2 : Filtres d'UE Rapides (Scroll horizontal tactile fluide sur mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 scrollbar-none text-xs">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase mr-1 shrink-0">
              UE :
            </span>
            {UNIT_ORDER.map((u) => {
              const active = filters.units.has(u);
              return (
                <button
                  key={u}
                  type="button"
                  onClick={() => toggleUnit(u)}
                  className={`px-2.5 py-1 rounded-xl font-mono text-[11px] font-black uppercase border transition-all shrink-0 cursor-pointer active:scale-95 ${
                    active
                      ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-2xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-800 line-through"
                  }`}
                >
                  {u}
                </button>
              );
            })}
          </div>

          {/* Rangée 3 : Barre de Recherche & Filtre Intervenant */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="size-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={filters.search ?? ""}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, search: e.target.value }))
                }
                placeholder="Rechercher une salle, prof, date... (raccourci /)"
                className="w-full pl-9 pr-14 py-2 sm:py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {filters.search && (
                  <button
                    type="button"
                    onClick={() => setFilters((f) => ({ ...f, search: "" }))}
                    className="text-slate-400 hover:text-slate-700 cursor-pointer mr-1 p-1"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
                <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[9px] font-bold text-slate-500">
                  /
                </kbd>
              </div>
            </div>

            <select
              value={filters.teacher ?? "all"}
              onChange={(e) => {
                playClickSound();
                setFilters((f) => ({ ...f, teacher: e.target.value }));
              }}
              aria-label="Filtrer par intervenant"
              className="px-3 py-2 sm:py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 cursor-pointer shrink-0"
            >
              <option value="all">Tous les intervenants ({allTeachers.length})</option>
              {allTeachers.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. BANDEAU DE FILTRE ACTIF                                                */}
      {/* ========================================================================= */}
      {(() => {
        const visibleCount = PLANNING_EVENTS.filter((e) =>
          matchesFilters(e, filters),
        ).length;
        if (visibleCount >= PLANNING_EVENTS.length) return null;
        return (
          <div className="p-3 rounded-2xl border border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-200 flex items-center justify-between gap-3 flex-wrap text-xs shadow-2xs">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-amber-600 shrink-0" />
              <span>
                <b>Filtre actif : {visibleCount} / {PLANNING_EVENTS.length} séances affichées</b>{" "}
                ({PLANNING_EVENTS.length - visibleCount} séances masquées).
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setFilters((f) => ({
                  ...defaultFilters(),
                  todayIso: f.todayIso,
                }));
              }}
              className="px-3 py-1 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer transition-colors"
            >
              Tout réafficher (69 séances)
            </button>
          </div>
        );
      })()}

      {/* ========================================================================= */}
      {/* 7. INSPECTEUR DE SÉANCE : BRIEFING DE POCHE & GOOGLE CALENDAR EN 1 CLIC   */}
      {/* ========================================================================= */}
      {selectedEvent && selectedId && (
        <div className="p-5 sm:p-6 rounded-3xl border-2 border-amber-500/60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md space-y-4 animate-fadeIn">
          {/* Header de la Fiche */}
          <div className="flex items-start justify-between gap-3 flex-wrap border-b border-slate-200/70 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-mono font-black text-sm uppercase">
                {selectedEvent.unit}
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {UNIT_TITLES[selectedEvent.unit]}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/30">
                {selectedEvent.type === "COURS"
                  ? "Cours présentiel (Cnam Bègles)"
                  : selectedEvent.type === "WEBCONF"
                    ? "Webconférence (BigBlueButton)"
                    : "Activités distantes (ENF)"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
              title="Fermer la fiche (Échap)"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Grille d'Informations Pratiques */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
              <div className="font-mono text-slate-400 uppercase text-[10px] font-bold">Date &amp; Créneau</div>
              <div className="font-black text-slate-900 dark:text-slate-100 text-sm mt-0.5">
                {selectedEvent.day} {formatFrDate(selectedEvent.date)}
              </div>
              <div className="text-slate-500 font-mono mt-0.5">
                {selectedEvent.start} – {selectedEvent.end}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
              <div className="font-mono text-slate-400 uppercase text-[10px] font-bold">Lieu / Salle</div>
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5 truncate">
                {selectedEvent.room ?? eventLocation(selectedEvent) ?? "Espace Numérique"}
              </div>
              <div className="text-slate-500 mt-0.5">
                {selectedEvent.type === "COURS"
                  ? "Cité du Numérique, Bègles"
                  : selectedEvent.type === "WEBCONF"
                    ? "Plateforme synchrone (Visio)"
                    : "ENF Cnam (Autonomie asynchrone)"}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
              <div className="font-mono text-slate-400 uppercase text-[10px] font-bold">Intervenant</div>
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5 truncate">
                {selectedEvent.teacher}
              </div>
              <div className="text-slate-500 mt-0.5">Équipe pédagogique CNAM</div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FEATURE 5 : BRIEFING DE POCHE — 3 CONCEPTS CLÉS DU COURS                 */}
          {/* ========================================================================= */}
          {unitConcepts.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/25 space-y-2.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="text-xs font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Briefing de poche : 3 concepts clés de l&apos;UE à avoir en tête</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyBriefing}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-[11px] font-bold flex items-center gap-1.5 hover:bg-amber-500/10 cursor-pointer transition-colors"
                  title="Copier la fiche de briefing avec notes et concepts"
                >
                  <Copy className="size-3" />
                  <span>{briefingCopied ? "✓ Fiche copiée !" : "Copier le briefing"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {unitConcepts.map((concept, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-xs flex flex-col justify-between gap-1.5 shadow-2xs group hover:border-amber-500/40 transition-all"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 min-w-0">
                        <span className="size-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span className="truncate">{concept.w}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (typeof window !== "undefined" && "speechSynthesis" in window) {
                            window.speechSynthesis.cancel();
                            const utter = new SpeechSynthesisUtterance(`${concept.w}. ${concept.def}`);
                            utter.lang = "fr-FR";
                            utter.rate = 1.05;
                            window.speechSynthesis.speak(utter);
                          }
                        }}
                        className="p-1 rounded-md text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-500/10 cursor-pointer transition-colors"
                        title="Écouter la définition du concept (audio)"
                      >
                        <Volume2 className="size-3" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug line-clamp-3 m-0">
                      {concept.def}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mention pédagogique travail asynchrone pour les activités distantes */}
          {selectedEvent.type === "DISTANT" && (
            <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2.5">
              <Laptop className="size-4 text-slate-500 shrink-0" />
              <span>
                <b>Activité à distance asynchrone :</b> ce travail sur l&apos;ENF peut être réalisé en autonomie à tout moment avant la séance suivante, sans contrainte horaire stricte.
              </span>
            </div>
          )}

          {/* Détection et qualification du chevauchement horaire */}
          {selectedConflicts.length > 0 && (() => {
            const severity = getConflictSeverity(selectedEvent, selectedConflicts);
            const isPhysicalCritical = severity === "PRESENCE_CRITICAL";
            return (
              <div
                className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between gap-3 flex-wrap ${
                  isPhysicalCritical
                    ? "bg-rose-500/10 border-rose-500/35 text-rose-950 dark:text-rose-100"
                    : "bg-indigo-500/10 border-indigo-500/30 text-indigo-950 dark:text-indigo-100"
                }`}
              >
                <div className="flex items-start gap-2.5 max-w-xl">
                  {isPhysicalCritical ? (
                    <AlertTriangle className="size-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  ) : (
                    <Video className="size-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <div>
                      <b>
                        {isPhysicalCritical
                          ? "Conflit présentiel physique critique :"
                          : "Chevauchement avec Webconférence (Replay disponible) :"}
                      </b>{" "}
                      superposé avec{" "}
                      {selectedConflicts.map((c, idx) => (
                        <span key={idx}>
                          <b>
                            {c.unit.toUpperCase()} ({c.start}–{c.end} · {c.type === "COURS" ? "Présentiel" : "Webconf"})
                          </b>
                          {idx < selectedConflicts.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] opacity-85 m-0">
                      {isPhysicalCritical
                        ? "Deux cours ont lieu sur site au même moment. Choix présentiel obligatoire ou concertation avec l'enseignant."
                        : "Les webconférences sont enregistrées et disponibles en replay sur l'ENF. Vous pouvez privilégier le présentiel/direct et rattraper la visio plus tard."}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedEvent(selectedConflicts[0]!)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer text-white shadow-2xs transition-transform active:scale-95 ${
                    isPhysicalCritical ? "bg-rose-600 hover:bg-rose-700" : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  Inspecter {selectedConflicts[0].unit.toUpperCase()} →
                </button>
              </div>
            );
          })()}

          {/* Note personnelle & Barre d'actions S-Tier+ */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2 border-t border-slate-200/70 dark:border-slate-800">
            <div className="flex-1 flex items-center gap-2">
              <FileText className="size-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={selectedNote}
                onChange={(e) => handleUpdateNote(selectedId, e.target.value)}
                placeholder="Note personnelle sur cette séance (sauvegardée automatiquement)..."
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {/* FEATURE 4 : Passerelle Google Calendar 1-clic */}
              <a
                href={buildGoogleCalendarUrl(selectedEvent)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
                title="Ajouter directement à Google Calendar en 1 clic sans téléchargement"
              >
                <CalendarPlus className="size-3.5" />
                <span>Google Agenda</span>
                <ExternalLink className="size-3 opacity-75" />
              </a>

              <button
                type="button"
                onClick={() => handleToggleAttended(selectedId)}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                  selectedIsAttended
                    ? "bg-emerald-600 text-white shadow-2xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-emerald-500/15"
                }`}
              >
                <Check className="size-3.5" />
                <span>{selectedIsAttended ? "Réalisée ✓" : "Pointer assiduité"}</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  downloadIcs(
                    [selectedEvent],
                    `seance-${selectedEvent.unit}-${selectedEvent.date}.ics`,
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                title="Télécharger fichier .ics pour Apple Calendar / Outlook"
              >
                <Calendar className="size-3.5 text-amber-600" />
                <span>.ics</span>
              </button>

              <Link
                href={`/pst/${selectedEvent.unit.replace("pst", "")}/`}
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <span>Atelier {selectedEvent.unit.toUpperCase()}</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. CONTENU PRINCIPAL SELON LA VUE SÉLECTIONNÉE                           */}
      {/* ========================================================================= */}
      {activeView === "logistics" ? (
        <div className="space-y-4">
          <div className="p-4 rounded-3xl border border-amber-500/30 bg-amber-500/10 text-xs text-slate-800 dark:text-slate-200 flex items-center justify-between flex-wrap gap-2">
            <div>
              <b className="text-sm">
                Carnet Logistique des Déplacements — Anglet ↔ Cnam Bègles (Cité du Numérique)
              </b>
              <p className="m-0 mt-0.5 text-slate-600 dark:text-slate-400">
                Adresse unique : <b>2 rue Marc Sangnier, Cité du Numérique, 33130 Bègles</b> ·{" "}
                {presenceDaysGroups.length} journées de déplacement sur l&apos;année.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                downloadIcs(
                  PLANNING_EVENTS.filter((e) => e.type === "COURS"),
                  "trajets-cnam-begles-pst.ics",
                )
              }
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <CalendarPlus className="size-3.5" />
              <span>Exporter les 19 cours (.ics)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {presenceDaysGroups.map(([date, dayEvents]) => {
              const first = dayEvents[0]!;
              const last = dayEvents[dayEvents.length - 1]!;
              const isCluster = dayEvents.some((e) => e.cluster);
              const isFullday = dayEvents.some((e) => e.fullday);
              const hasSameTimeOverlap =
                dayEvents.length > 1 &&
                dayEvents.some((e) =>
                  getEventConflicts(e).some((c) => c.type === "COURS"),
                );

              return (
                <div
                  key={date}
                  className="p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xs flex flex-col justify-between gap-3.5"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200/70 dark:border-slate-800 pb-2.5">
                    <div>
                      <span className="font-mono text-xs uppercase font-black text-amber-700 dark:text-amber-400">
                        {first.day} {formatFrDate(date)}
                      </span>
                      <div className="text-[11px] text-slate-500 font-medium">
                        Amplitude sur place : <b>{first.start} – {last.end}</b>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {isCluster && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          Cluster 2j
                        </span>
                      )}
                      {isFullday && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          Journée complète
                        </span>
                      )}
                      {hasSameTimeOverlap && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/30 flex items-center gap-1 shadow-2xs">
                          <AlertTriangle className="size-3" />
                          Conflit : 2 salles en simultané
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Sélecteur d'arbitrage Apple 1-clic si 2 salles en parallèle */}
                  {hasSameTimeOverlap && (
                    <div className="p-3 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 backdrop-blur-sm space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between text-[11px] font-bold text-amber-950 dark:text-amber-200">
                        <span>🎯 Arbitrage de présence requis :</span>
                        <span className="text-[10px] font-mono opacity-80">1 seule salle possible</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {dayEvents.map((ev) => {
                          const isChosen = chosenConflicts[date] === ev.unit;
                          return (
                            <button
                              key={ev.unit}
                              type="button"
                              onClick={() => handleSetConflictArbitration(date, ev.unit)}
                              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 shadow-2xs ${
                                isChosen
                                  ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                                  : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-300 border-slate-300/80 dark:border-slate-700 hover:border-amber-500"
                              }`}
                            >
                              <span>{isChosen ? "✓ Présent en" : "Choisir"}</span>
                              <span className="font-mono uppercase">{ev.unit}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {dayEvents.map((ev) => {
                      const id = eventId(ev);
                      const done = attendedIds.has(id);
                      const chosenForDate = chosenConflicts[date];
                      const isSacrificed = Boolean(chosenForDate && chosenForDate !== ev.unit);
                      return (
                        <div
                          key={id}
                          onClick={() => setSelectedEvent(ev)}
                          className={`p-3 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-all text-xs ${
                            isSacrificed
                              ? "opacity-50 bg-slate-100/50 dark:bg-slate-900/50 border-dashed border-slate-300 dark:border-slate-800 line-through-label"
                              : "bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-500/10 border-slate-200/60 dark:border-slate-800"
                          }`}
                        >
                          <div>
                            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                              <span className="px-1.5 py-0.5 rounded bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-mono text-[10px]">
                                {ev.unit.toUpperCase()}
                              </span>
                              <span>{ev.start}–{ev.end}</span>
                              <span className="text-amber-700 dark:text-amber-400">· {ev.room}</span>
                              {isSacrificed && (
                                <span className="text-[10px] text-slate-400 font-normal no-underline">
                                  (À rattraper)
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{ev.teacher}</div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleAttended(id);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border cursor-pointer ${
                              done
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : "border-slate-300 dark:border-slate-700 text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            {done ? "✓ Fait" : "Pointer"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : activeView === "week" ? (
        <div className="space-y-4">
          {/* Navigation hebdomadaire */}
          <div className="p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                disabled={safeWeekIdx <= 0}
                onClick={() => {
                  playClickSound();
                  setSelectedWeekIdx((i) => Math.max(0, i - 1));
                }}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 disabled:opacity-30 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="size-3.5" />
                <span>Sem. préc.</span>
                <kbd className="px-1 py-0.2 rounded bg-black/10 dark:bg-white/10 font-mono text-[9px] font-bold">←</kbd>
              </button>

              <select
                value={safeWeekIdx}
                onChange={(e) => {
                  playClickSound();
                  setSelectedWeekIdx(Number(e.target.value));
                }}
                aria-label="Sélectionner une semaine de cours"
                className="px-3.5 py-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-slate-900 dark:text-slate-100 font-bold text-xs cursor-pointer"
              >
                {activeWeeksData.map((wData, idx) => (
                  <option key={wData.week.key} value={idx}>
                    Semaine {wData.week.label} · {wData.week.monthLabel} ({wData.events.length} séance{wData.events.length > 1 ? "s" : ""} · {wData.totalHours}h)
                  </option>
                ))}
              </select>

              <button
                type="button"
                disabled={safeWeekIdx >= activeWeeksData.length - 1}
                onClick={() => {
                  playClickSound();
                  setSelectedWeekIdx((i) => Math.min(activeWeeksData.length - 1, i + 1));
                }}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 disabled:opacity-30 flex items-center gap-1 cursor-pointer"
              >
                <span>Sem. suiv.</span>
                <ChevronRight className="size-3.5" />
                <kbd className="px-1 py-0.2 rounded bg-black/10 dark:bg-white/10 font-mono text-[9px] font-bold">→</kbd>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-slate-500">
                Semaine {safeWeekIdx + 1} / {activeWeeksData.length} actives
              </span>
              <button
                type="button"
                onClick={jumpToNextUpcomingWeek}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <span>Prochaine séance</span>
                <kbd className="px-1 py-0.2 rounded bg-white/20 dark:bg-slate-900/20 font-mono text-[9px] font-bold">T</kbd>
              </button>
            </div>
          </div>

          {!currentWeekData ? (
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
              Aucune séance ne correspond aux filtres sélectionnés.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {currentWeekData.days.map(([date, dayEvents]) => {
                const first = dayEvents[0]!;
                const dayHours = dayEvents.reduce(
                  (acc, ev) => acc + getEventDurationHours(ev),
                  0,
                );
                return (
                  <div
                    key={date}
                    className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-xs overflow-hidden flex flex-col"
                  >
                    <div className="px-4.5 py-3 border-b border-slate-200/70 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50 flex items-center justify-between gap-2">
                      <div>
                        <div className="font-mono text-xs font-black uppercase text-slate-900 dark:text-slate-100">
                          {first.day} {formatFrDate(date)}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {dayEvents.length} séance{dayEvents.length > 1 ? "s" : ""} · {dayHours}h au total
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 font-mono text-[10px] font-bold">
                        {currentWeekData.week.label}
                      </span>
                    </div>

                    <div className="p-3.5 space-y-2.5 flex-1">
                      {dayEvents.map((ev) => {
                        const id = eventId(ev);
                        const done = attendedIds.has(id);
                        const conflicts = getEventConflicts(ev);
                        const note = sessionNotes[id];
                        const isCours = ev.type === "COURS";
                        const isVisio = ev.type === "WEBCONF";
                        return (
                          <div
                            key={id}
                            onClick={() => setSelectedEvent(ev)}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                              selectedId === id
                                ? "border-amber-500 ring-2 ring-amber-500/20 bg-amber-500/5 shadow-2xs"
                                : "border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-amber-500/40"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="px-2 py-0.5 rounded bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-mono text-[11px] font-black uppercase">
                                  {ev.unit}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    isCours
                                      ? "bg-amber-500/15 text-amber-800 dark:text-amber-300"
                                      : isVisio
                                        ? "bg-indigo-500/15 text-indigo-800 dark:text-indigo-300"
                                        : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                                  }`}
                                >
                                  {isCours
                                    ? "Cours Bègles"
                                    : isVisio
                                      ? "Webconférence"
                                      : "Activité distante"}
                                </span>
                              </div>
                              <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                                {ev.start}–{ev.end}
                              </span>
                            </div>

                            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1 leading-snug">
                              {UNIT_TITLES[ev.unit]}
                            </div>

                            <div className="text-[11px] text-slate-600 dark:text-slate-400 space-y-0.5">
                              <div className="flex items-center gap-1.5">
                                <MapPin className="size-3 text-amber-600 shrink-0" />
                                <span className="truncate">{ev.room ?? eventLocation(ev) ?? "ENF"}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <User className="size-3 text-slate-400 shrink-0" />
                                <span className="truncate">{ev.teacher}</span>
                              </div>
                            </div>

                            {conflicts.length > 0 && (() => {
                              const sev = getConflictSeverity(ev, conflicts);
                              const isCrit = sev === "PRESENCE_CRITICAL";
                              return (
                                <div
                                  className={`mt-2 px-2 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1 ${
                                    isCrit
                                      ? "bg-rose-500/15 border-rose-500/30 text-rose-800 dark:text-rose-300"
                                      : "bg-indigo-500/15 border-indigo-500/30 text-indigo-800 dark:text-indigo-300"
                                  }`}
                                >
                                  {isCrit ? (
                                    <AlertTriangle className="size-3 shrink-0" />
                                  ) : (
                                    <Video className="size-3 shrink-0" />
                                  )}
                                  <span>
                                    {isCrit
                                      ? `Conflit présentiel : ${conflicts.map((c) => c.unit.toUpperCase()).join(", ")}`
                                      : `Chevauchement visio (Replay ENF) : ${conflicts.map((c) => c.unit.toUpperCase()).join(", ")}`}
                                  </span>
                                </div>
                              );
                            })()}

                            {note && (
                              <div className="mt-1.5 px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] italic text-slate-600 dark:text-slate-300">
                                {note}
                              </div>
                            )}

                            <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2">
                              <span className="text-[10px] font-mono text-slate-400">
                                Inspecter →
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleAttended(id);
                                }}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold border cursor-pointer ${
                                  done
                                    ? "bg-emerald-600 text-white border-emerald-600"
                                    : "border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900"
                                }`}
                              >
                                {done ? "✓ Réalisée" : "Pointer"}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="view-switch" data-view={activeView}>
          <div className="pv-grid">
            <PlanningGrid
              filters={filters}
              todayWeekKey={todayWeekKey}
              selectedEventId={selectedId}
              onSelectEvent={setSelectedEvent}
              attendedIds={attendedIds}
            />
          </div>
          <div className="pv-list">
            <PlanningList
              filters={filters}
              todayIso={todayIso}
              selectedEventId={selectedId}
              onSelectEvent={setSelectedEvent}
              attendedIds={attendedIds}
              onToggleAttended={handleToggleAttended}
              sessionNotes={sessionNotes}
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. FOOTNOTES ÉLÉGANTES STYLE APPLE REFERENCE                             */}
      {/* ========================================================================= */}
      <div className="p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed">
        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-800 dark:text-slate-200">
          Notes de Référence Officielle CNAM Bègles &amp; ENF
        </h3>
        <p>
          · <b>Lieu unique de cours présentiel :</b> Cnam Bègles — 2 rue Marc Sangnier, Cité du Numérique, 33130 Bègles
          (Salle 1 Abbé Grégoire pour PST123, Salle 2 Sadi Carnot et Salle 5 Michel Valton pour PST106, Salle 5 pour PST108 et PST120).
        </p>
        <p>
          · <b>Raccourcis Clavier Pro :</b> <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">1</kbd>–<kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">4</kbd> (Vues), <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">T</kbd> (Prochaine séance), <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">/</kbd> (Recherche), <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">←</kbd>/<kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">→</kbd> (Semaine suivante/précédente), <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">Échap</kbd> (Fermer l&apos;inspecteur).
        </p>
      </div>
    </div>
  );
}

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
  SlidersHorizontal,
  MoreVertical,
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
import { CovoitManager } from "./CovoitManager";
import { ConflictArbitration } from "./ConflictArbitrationCard";
import { AttendanceDetailModal } from "./AttendanceDetailModal";
import { IcsExportModal } from "./IcsExportModal";

const FILTERS_KEY = "pst_planning_filters_v2";
const VIEW_KEY = "pst_planning_view_v1";
const ATTENDANCE_KEY = "pst_planning_attendance_v1";
const ARBITRATION_KEY = "pst_planning_arbitrations_v1";
const ARBITRATION_V2_KEY = "pst_planning_arbitrations_v2";
const AUTO_ATTENDANCE_KEY = "pst_auto_attendance_mode";
const MANUAL_ABSENCES_KEY = "pst_manual_absences_v1";

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
  const [manualAbsences, setManualAbsences] = useState<Set<string>>(new Set());
  const [autoAttendanceMode, setAutoAttendanceMode] = useState<boolean>(true);
  const [sessionNotes, setSessionNotes] = useState<Record<string, string>>({});
  // Arbitrage pour les samedis de conflits en présentiel : clé = date ("2026-11-07"), valeur = id ou unit choisie
  const [chosenConflicts, setChosenConflicts] = useState<Record<string, string>>({});
  const [conflictArbitrations, setConflictArbitrations] = useState<
    Record<string, "DIRECT" | "REPLAY">
  >({});
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showIcsModal, setShowIcsModal] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [briefingCopied, setBriefingCopied] = useState(false);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.types.size < 3) count++;
    if (filters.units.size < UNIT_ORDER.length) count++;
    if (filters.teacher && filters.teacher !== "all") count++;
    if (filters.search && filters.search.trim().length > 0) count++;
    if (filters.onlyConflicts) count++;
    if (filters.hidePast) count++;
    return count;
  }, [filters]);

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

  // Nombre dynamique unique de journées de déplacement en présentiel (13 journées pour 19 séances)
  const totalPhysicalDaysCount = useMemo(() => {
    const coursEvents = PLANNING_EVENTS.filter((e) => e.type === "COURS");
    return new Set(coursEvents.map((e) => e.date)).size;
  }, []);

  const nextImmediate = useMemo(() => getNextEvent(), []);
  const nextPhysical = useMemo(() => getNextPhysicalEvent(), []);

  // Détection des séances d'aujourd'hui
  const todaySessions = useMemo(() => {
    const now = new Date();
    const curIso =
      todayIso ??
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    return PLANNING_EVENTS.filter((e) => e.date === curIso).sort((a, b) =>
      a.start.localeCompare(b.start),
    );
  }, [todayIso]);

  const currentOrNextTodaySession = useMemo(() => {
    if (todaySessions.length === 0) return null;
    const now = new Date();
    const curMinutes = now.getHours() * 60 + now.getMinutes();
    const found = todaySessions.find((e) => {
      const [eh, em] = e.end.split(":").map(Number);
      return (eh || 0) * 60 + (em || 0) >= curMinutes;
    });
    return found ?? todaySessions[0] ?? null;
  }, [todaySessions]);

  // Mode Auto (Temps Réel) : séances passées considérées comme réalisées sauf décoche manuelle
  const effectiveAttendedIds = useMemo(() => {
    const set = new Set<string>();
    const now = new Date();
    const nowIso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const nowMin = now.getHours() * 60 + now.getMinutes();

    for (const e of PLANNING_EVENTS) {
      const id = eventId(e);
      if (e.cancelled) continue;
      if (manualAbsences.has(id)) continue;
      if (attendedIds.has(id)) {
        set.add(id);
        continue;
      }
      if (autoAttendanceMode) {
        const [eh, em] = e.end.split(":").map(Number);
        const endMin = (eh || 0) * 60 + (em || 0);
        const isPast =
          e.date < nowIso || (e.date === nowIso && endMin <= nowMin);
        if (isPast) {
          set.add(id);
        }
      }
    }
    return set;
  }, [attendedIds, manualAbsences, autoAttendanceMode, todayIso]);

  // Décomptes contextuels pour les boutons de filtres rapides
  const formatCounts = useMemo(() => {
    const matchingUnits = PLANNING_EVENTS.filter((e) => filters.units.has(e.unit));
    return {
      all: matchingUnits.length,
      cours: matchingUnits.filter((e) => e.type === "COURS").length,
      visio: matchingUnits.filter((e) => e.type === "WEBCONF").length,
      distant: matchingUnits.filter((e) => e.type === "DISTANT").length,
      conflicts: matchingUnits.filter((e) => getEventConflicts(e).length > 0).length,
    };
  }, [filters.units]);

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
    } else if (typeof window !== "undefined" && window.innerWidth < 768) {
      // Default to list view on mobile when no preference is stored
      setActiveView("list");
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
      const rawAuto = window.localStorage.getItem(AUTO_ATTENDANCE_KEY);
      if (rawAuto !== null) {
        setAutoAttendanceMode(rawAuto === "true");
      }
      const rawAbs = window.localStorage.getItem(MANUAL_ABSENCES_KEY);
      if (rawAbs) {
        const parsedAbs = JSON.parse(rawAbs);
        if (Array.isArray(parsedAbs)) {
          setManualAbsences(new Set(parsedAbs));
        }
      }
      const rawArbV2 = window.localStorage.getItem(ARBITRATION_V2_KEY);
      if (rawArbV2) {
        const parsedArbV2 = JSON.parse(rawArbV2);
        if (parsedArbV2 && typeof parsedArbV2 === "object") {
          setConflictArbitrations(parsedArbV2);
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
    const isCurrentlyAttended = effectiveAttendedIds.has(id);
    const nextAttended = new Set(attendedIds);
    const nextManualAbsences = new Set(manualAbsences);

    if (isCurrentlyAttended) {
      playClickSound();
      // L'utilisateur décoche la séance -> marquée comme absence manuelle
      nextAttended.delete(id);
      nextManualAbsences.add(id);
    } else {
      playSuccessSound();
      // L'utilisateur coche la séance -> validée et retirée des absences manuelles
      nextAttended.add(id);
      nextManualAbsences.delete(id);
    }

    setAttendedIds(nextAttended);
    setManualAbsences(nextManualAbsences);
    saveAttendance(nextAttended, sessionNotes);
    try {
      window.localStorage.setItem(
        MANUAL_ABSENCES_KEY,
        JSON.stringify(Array.from(nextManualAbsences)),
      );
    } catch {
      // ignore
    }
  }

  function handleToggleAutoMode() {
    playClickSound();
    setAutoAttendanceMode((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(AUTO_ATTENDANCE_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  function handleSetArbitration(id: string, mode: "DIRECT" | "REPLAY") {
    setConflictArbitrations((prev) => {
      const next = { ...prev, [id]: mode };
      try {
        window.localStorage.setItem(
          ARBITRATION_V2_KEY,
          JSON.stringify(next),
        );
      } catch {
        // ignore
      }
      return next;
    });
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

  const completedHours = useMemo(() => {
    return PLANNING_EVENTS.filter((e) =>
      effectiveAttendedIds.has(eventId(e)),
    ).reduce((acc, e) => acc + getEventDurationHours(e), 0);
  }, [effectiveAttendedIds]);

  const attendancePct = PLANNING_EVENTS.length
    ? Math.round((effectiveAttendedIds.size * 100) / PLANNING_EVENTS.length)
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
      } else if (e.key === "/") {
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

  // Auto-scroll to inspector on mobile when event is selected
  useEffect(() => {
    if (!selectedEvent) return;
    if (typeof window !== "undefined" && window.innerWidth >= 768) return;
    requestAnimationFrame(() => {
      const el = document.getElementById("planning-inspector");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
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
    <div className="planning-wrap space-y-4 sm:space-y-6 pb-24 sm:pb-12">
      <ModulesNav active="planning" />

      {/* ========================================================================= */}
      {/* 1. HEADER APPLE-STYLE AVEC DYNAMIC ISLAND & SCHÉMA ITINÉRAIRE             */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md shadow-xs relative overflow-hidden">
        {/* Dynamic Island Live Activity Countdown Widget */}
        {countdownText && (
          <button
            type="button"
            onClick={() => {
              playClickSound();
              if (currentOrNextTodaySession) {
                setSelectedEvent(currentOrNextTodaySession);
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
            <span className="px-1.5 py-0.2 rounded bg-white/20 dark:bg-slate-900/20 text-[10px] uppercase font-black shrink-0">
              {countdownText.badge}
            </span>
            <span className="truncate max-w-[160px] sm:max-w-none sm:overflow-visible text-[10px] sm:text-xs">
              {countdownText.label}
            </span>
          </button>
        )}

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
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
          <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 shrink-0 w-full sm:w-auto self-stretch sm:self-start lg:self-center text-center">
            <div className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 mb-1">
              Trajet Unique de Présentiel
            </div>
            <svg width="220" height="56" viewBox="0 0 220 56" className="block mx-auto overflow-visible max-w-full">
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
              <text x="30" y="44" textAnchor="middle" className="text-[10px] font-bold font-mono fill-slate-700 dark:fill-slate-300">
                Anglet
              </text>
              <circle cx="175" cy="24" r="7" fill="#b45309" />
              <circle cx="175" cy="24" r="3.5" fill="#fef3c7" />
              <text x="175" y="44" textAnchor="middle" className="text-[10px] font-black font-mono fill-amber-700 dark:fill-amber-400">
                Cnam Bègles
              </text>
            </svg>
            <div className="mt-1.5 text-[10px] font-mono font-medium text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-700/60 pt-1.5">
              🚗 ~190 km via A63 • Covoit&apos; Groupe Cnam (1 voiture / max 5 • {totalPhysicalDaysCount} j.)
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. TRIO DE WIDGETS KPI APPLE GLASSMORPHISM + ASSIDUITÉ (GRILLE 2x2 MOBILE)*/}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-slate-200/70 dark:border-slate-800">
          {/* Widget 1 : Présentiel Bègles (cohérence 13j dynamique) */}
          <div
            onClick={() => toggleType("COURS")}
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
                <span className="text-[9px] sm:text-[10px] font-mono font-black uppercase px-1.5 sm:px-2 py-0.5 rounded bg-amber-500/20 text-amber-900 dark:text-amber-100 shrink-0">
                  19 séa.
                </span>
              </div>
              <div className="text-lg sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                {presenceRemaining.sessions} restantes
              </div>
            </div>
            <div className="text-[11px] leading-tight text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 sm:line-clamp-none">
              {presenceRemaining.total} j. restants / {totalPhysicalDaysCount} j. · Grégoire / Carnot
            </div>
          </div>

          {/* Widget 2 : Webconférences */}
          <div
            onClick={() => toggleType("WEBCONF")}
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
                <span className="text-[9px] sm:text-[10px] font-mono font-black uppercase px-1.5 sm:px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-900 dark:text-indigo-100 shrink-0">
                  27 séa.
                </span>
              </div>
              <div className="text-lg sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                {visioRemaining} restantes
              </div>
            </div>
            <div className="text-[11px] leading-tight text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 sm:line-clamp-none">
              81h synchrones · BigBlueButton
            </div>
          </div>

          {/* Widget 3 : Activités Distantes */}
          <div
            onClick={() => toggleType("DISTANT")}
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
                <span className="text-[9px] sm:text-[10px] font-mono font-black uppercase px-1.5 sm:px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 shrink-0">
                  23 créneaux
                </span>
              </div>
              <div className="text-lg sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                {distantRemaining} restants
              </div>
            </div>
            <div className="text-[11px] leading-tight text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 sm:line-clamp-none">
              Travail asynchrone guidé
            </div>
          </div>

          {/* Widget 4 : Assiduité Apple Watch Style (Interactif & Popover au clic) */}
          <div
            onClick={() => {
              playClickSound();
              setShowAttendanceModal(true);
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
                    <span className="text-[8px] sm:text-[9px] font-mono font-bold uppercase px-1 py-0.2 rounded bg-emerald-600 text-white">
                      Auto
                    </span>
                  )}
                  <span className="text-[9px] sm:text-[10px] font-mono font-black uppercase px-1.5 sm:px-2 py-0.5 rounded bg-emerald-500/25 text-emerald-900 dark:text-emerald-100">
                    {attendancePct}%
                  </span>
                </div>
              </div>
              <div className="text-lg sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                {effectiveAttendedIds.size} / {PLANNING_EVENTS.length}
              </div>
              <div className="text-[11px] leading-tight text-slate-600 dark:text-slate-300 mt-1 flex items-center justify-between">
                <span>{completedHours}h / {totalPlannedHours}h</span>
                <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 dark:text-emerald-300 group-hover:underline">
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

        {/* ========================================================================= */}
        {/* 2.5 BANNIÈRE PRIORITAIRE LIVE ACTIVITY : SÉANCE DU JOUR (AUJOURD'HUI)      */}
        {/* ========================================================================= */}
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
                    Aujourd&apos;hui · {currentOrNextTodaySession.start} – {currentOrNextTodaySession.end}
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
                  <span>Notes {currentOrNextTodaySession.unit.toUpperCase()}</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSelectedEvent(currentOrNextTodaySession);
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

        {/* ========================================================================= */}
        {/* 3. NOTIFICATION CARD : Prochaine Séance Présentielle (Bègles)               */}
        {/* ========================================================================= */}
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
                    {nextPhysical.unit.toUpperCase()} · {nextPhysical.start}–{nextPhysical.end}
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
                setSelectedEvent(nextPhysical);
              }}
              className="w-full sm:w-auto justify-center px-4 py-2.5 sm:py-2 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shrink-0 transition-all shadow-xs"
            >
              <Clock className="size-3.5" />
              <span>Inspecter ({formatFrDate(nextPhysical.date).slice(0, 5)})</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. CONTRÔLES & FILTRES COMPACTS 3 LIGNES (MOBILE S-TIER)                   */}
      {/* ========================================================================= */}
      <div className="p-3 sm:p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md shadow-xs space-y-3">
        {/* LIGNE 1 : Navigation de vue (Segmented Control pleine largeur) */}
        <div className="w-full">
          <div className="grid grid-cols-4 p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60 shadow-inner w-full">
            <button
              type="button"
              onClick={() => setView("grid")}
              className={`py-1.5 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                activeView === "grid"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
              title="Vue Frise Chronologique (Raccourci clavier : 1)"
            >
              <BarChart3 className="size-3.5 shrink-0" />
              <span className="inline">Frise</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/10 font-mono text-[9px] font-bold">1</kbd>
            </button>

            <button
              type="button"
              onClick={() => setView("week")}
              className={`py-1.5 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                activeView === "week"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
              title="Vue Agenda Hebdomadaire (Raccourci clavier : 2)"
            >
              <CalendarDays className="size-3.5 shrink-0" />
              <span className="inline">Hebdo</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/10 font-mono text-[9px] font-bold">2</kbd>
            </button>

            <button
              type="button"
              onClick={() => setView("list")}
              className={`py-1.5 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                activeView === "list"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
              title="Vue Liste Mensuelle (Raccourci clavier : 3)"
            >
              <ListFilter className="size-3.5 shrink-0" />
              <span className="inline">Liste</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/10 font-mono text-[9px] font-bold">3</kbd>
            </button>

            <button
              type="button"
              onClick={() => setView("logistics")}
              className={`py-1.5 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                activeView === "logistics"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
              title="Vue Trajets Bègles (Raccourci clavier : 4)"
            >
              <Car className="size-3.5 shrink-0" />
              <span className="inline">Trajets</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/10 font-mono text-[9px] font-bold">4</kbd>
            </button>
          </div>
        </div>

        {/* LIGNE 2 & FILTRES : Masqués lorsque l'onglet actif est 'logistics' (Trajets) */}
        {activeView !== "logistics" && (
          <>
            {/* LIGNE 2 : Recherche + Bouton Filtres + Menu Export Dropdown */}
            <div className="flex items-center gap-2">
          {/* Recherche */}
          <div className="relative flex-1 min-w-0">
            <Search className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={filters.search ?? ""}
              onChange={(e) =>
                setFilters((f) => ({ ...f, search: e.target.value }))
              }
              placeholder="Salle, prof, date..."
              className="w-full pl-9 pr-8 sm:pr-12 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {filters.search && (
                <button
                  type="button"
                  onClick={() => setFilters((f) => ({ ...f, search: "" }))}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer p-0.5"
                >
                  <X className="size-3.5" />
                </button>
              )}
              <kbd className="hidden sm:inline px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[9px] font-bold text-slate-500">
                /
              </kbd>
            </div>
          </div>

          {/* Bouton Filtres avec badge dynamique */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setShowMobileFilters((prev) => !prev);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-95 ${
              showMobileFilters || activeFiltersCount > 0
                ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-700/80"
            }`}
            aria-expanded={showMobileFilters}
            aria-label="Afficher ou masquer les filtres"
          >
            <SlidersHorizontal className="size-3.5 shrink-0" />
            <span>Filtres</span>
            {activeFiltersCount > 0 && (
              <span
                className={`px-1.5 py-0.2 rounded-full font-mono text-[10px] font-black ${
                  showMobileFilters || activeFiltersCount > 0
                    ? "bg-white text-amber-700 dark:bg-slate-900 dark:text-amber-300"
                    : "bg-amber-500 text-white"
                }`}
              >
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Menu Dropdown Export & Print (bouton •••) */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setShowExportMenu((prev) => !prev)}
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-2xs"
              title="Exporter ou imprimer le planning"
              aria-expanded={showExportMenu}
            >
              <MoreVertical className="size-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>

            {showExportMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowExportMenu(false)}
                />
                <div className="absolute right-0 mt-1.5 w-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-50 p-1.5 space-y-1 animate-fadeIn text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setShowExportMenu(false);
                      setShowIcsModal(true);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <CalendarPlus className="size-3.5 text-amber-600" />
                    <span>Exporter .ics</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setShowExportMenu(false);
                      window.print();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Printer className="size-3.5 text-slate-600 dark:text-slate-400" />
                    <span>Imprimer / PDF</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* TIROIR / ACCORDÉON DE FILTRES REPLIABLE SUR MOBILE */}
        <div
          className={`space-y-3 pt-3 border-t border-slate-200/70 dark:border-slate-800/80 transition-all ${
            showMobileFilters ? "block" : "hidden sm:block"
          }`}
        >
          {/* Rangée 1 : Modalités & Filtres Principaux */}
          <div className="relative">
            <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 sm:flex-wrap scrollbar-none no-scrollbar text-xs pr-6">
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
                Tout ({formatCounts.all})
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
                Cours Bègles ({formatCounts.cours})
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
                Webconf. ({formatCounts.visio})
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
                Distantes ({formatCounts.distant})
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
            {/* Masque dégradé pour éviter coupure visuelle brutale */}
            <div className="sm:hidden absolute top-0 right-0 bottom-1 w-8 bg-gradient-to-l from-white dark:from-slate-900 to-transparent pointer-events-none" />
          </div>

          {/* Rangée 2 : Filtres d'UE Rapides Combinables */}
          <div className="relative">
            <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 scrollbar-none no-scrollbar text-xs pr-6">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase mr-1 shrink-0">
                UE :
              </span>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setFilters((f) => ({
                    ...f,
                    units: f.units.size === UNIT_ORDER.length ? new Set() : new Set(UNIT_ORDER),
                  }));
                }}
                className={`px-2.5 py-1 rounded-xl font-mono text-[11px] font-bold border transition-all shrink-0 cursor-pointer active:scale-95 ${
                  filters.units.size === UNIT_ORDER.length
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-2xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                }`}
              >
                Toutes ({UNIT_ORDER.length})
              </button>
              {UNIT_ORDER.map((u) => {
                const active = filters.units.has(u);
                const count = PLANNING_EVENTS.filter(
                  (e) => e.unit === u && filters.types.has(e.type),
                ).length;
                return (
                  <button
                    key={u}
                    type="button"
                    onClick={() => toggleUnit(u)}
                    className={`px-2.5 py-1 rounded-xl font-mono text-[11px] font-black uppercase border transition-all shrink-0 cursor-pointer active:scale-95 flex items-center gap-1 ${
                      active
                        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-2xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-800 opacity-60"
                    }`}
                    title={`Basculer l'UE ${u.toUpperCase()} (${count} séances selon les formats actifs)`}
                  >
                    <span>{u}</span>
                    <span className="text-[9px] font-normal opacity-75 font-sans">({count})</span>
                  </button>
                );
              })}
            </div>
            {/* Masque dégradé pour éviter coupure visuelle brutale */}
            <div className="sm:hidden absolute top-0 right-0 bottom-1 w-8 bg-gradient-to-l from-white dark:from-slate-900 to-transparent pointer-events-none" />
          </div>

          {/* Rangée 3 : Filtre Intervenant & Reset rapide */}
          <div className="flex items-center justify-between gap-2 pt-0.5 flex-wrap">
            <select
              value={filters.teacher ?? "all"}
              onChange={(e) => {
                playClickSound();
                setFilters((f) => ({ ...f, teacher: e.target.value }));
              }}
              aria-label="Filtrer par intervenant"
              className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <option value="all">Tous les intervenants ({allTeachers.length})</option>
              {allTeachers.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setFilters((f) => ({
                    ...defaultFilters(),
                    todayIso: f.todayIso,
                  }));
                }}
                className="text-xs text-amber-700 dark:text-amber-300 font-bold hover:underline px-2 py-1 rounded-lg hover:bg-amber-500/10 cursor-pointer transition-colors"
              >
                Réinitialiser les filtres ({activeFiltersCount})
              </button>
            )}
          </div>
        </div>
      </>
    )}
  </div>

      {/* ========================================================================= */}
      {/* 5. BANDEAU DE FILTRE ACTIF COMPACT                                         */}
      {/* ========================================================================= */}
      {(() => {
        if (activeView === "logistics") return null;
        const visibleCount = PLANNING_EVENTS.filter((e) =>
          matchesFilters(e, filters),
        ).length;
        if (visibleCount >= PLANNING_EVENTS.length) return null;
        return (
          <div className="flex items-center justify-between px-3.5 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200 text-xs shadow-2xs">
            <div className="flex items-center gap-2 truncate">
              <span className="size-1.5 rounded-full bg-amber-500 shrink-0 animate-pulse" />
              <span className="truncate">
                <b>{visibleCount} / {PLANNING_EVENTS.length}</b> séances affichées
                <span className="hidden sm:inline text-amber-700/80 dark:text-amber-300/80">
                  {" "}({PLANNING_EVENTS.length - visibleCount} masquées)
                </span>
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
              className="font-bold text-amber-700 dark:text-amber-300 hover:underline shrink-0 text-xs cursor-pointer px-2 py-0.5 rounded-lg hover:bg-amber-500/15 transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        );
      })()}

      {/* ========================================================================= */}
      {/* 6.5 CARTES DE COMPARAISON & ARBITRAGE DES CHEVAUCHEMENTS                   */}
      {/* ========================================================================= */}
      {filters.onlyConflicts && (
        <ConflictArbitration
          arbitrations={conflictArbitrations}
          onSetArbitration={handleSetArbitration}
          onSelectEvent={setSelectedEvent}
        />
      )}

      {/* ========================================================================= */}
      {/* 7. INSPECTEUR DE SÉANCE : BRIEFING DE POCHE & GOOGLE CALENDAR EN 1 CLIC   */}
      {/* ========================================================================= */}
      {selectedEvent && selectedId && (
        <div id="planning-inspector" className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-amber-500/60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md space-y-3 sm:space-y-4 animate-fadeIn scroll-mt-20">
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

          {selectedEvent.cancelled && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/35 text-xs text-rose-950 dark:text-rose-100 flex items-start gap-2.5">
              <AlertTriangle className="size-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="font-bold">Séance annulée (report à fixer) :</div>
                <p className="text-[11px] opacity-90 m-0">
                  {selectedEvent.cancelReason ?? "Ce cours a été annulé et sera reprogrammé à une date ultérieure."}
                </p>
              </div>
            </div>
          )}

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
            <div className="grid grid-cols-2 sm:flex sm:items-center sm:flex-wrap gap-2 w-full sm:w-auto">
              {/* FEATURE 4 : Passerelle Google Calendar 1-clic */}
              <a
                href={buildGoogleCalendarUrl(selectedEvent)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="w-full sm:w-auto justify-center px-3 sm:px-3.5 py-2 sm:py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
                title="Ajouter directement à Google Calendar en 1 clic sans téléchargement"
              >
                <CalendarPlus className="size-3.5" />
                <span>Google Agenda</span>
                <ExternalLink className="size-3 opacity-75" />
              </a>

              <button
                type="button"
                onClick={() => handleToggleAttended(selectedId)}
                className={`w-full sm:w-auto justify-center px-3 sm:px-3.5 py-2 sm:py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
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
                className="w-full sm:w-auto justify-center px-3 py-2 sm:py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                title="Télécharger fichier .ics pour Apple Calendar / Outlook"
              >
                <Calendar className="size-3.5 text-amber-600" />
                <span>.ics</span>
              </button>

              <Link
                href={`/pst/${selectedEvent.unit.replace("pst", "")}/`}
                className="w-full sm:w-auto justify-center px-3 py-2 sm:py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5"
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
        <CovoitManager
          presenceDaysGroups={presenceDaysGroups}
          onSelectEvent={setSelectedEvent}
          attendedIds={effectiveAttendedIds}
          onToggleAttended={handleToggleAttended}
          chosenConflicts={chosenConflicts}
          onSetConflictArbitration={handleSetConflictArbitration}
          totalPhysicalDaysCount={totalPhysicalDaysCount}
          todayIso={todayIso}
          hidePast={filters.hidePast}
        />
      ) : activeView === "week" ? (
        <div className="space-y-4">
          {/* Navigation hebdomadaire (Adaptative Mobile) */}
          <div className="p-3 sm:p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
              <button
                type="button"
                disabled={safeWeekIdx <= 0}
                onClick={() => {
                  playClickSound();
                  setSelectedWeekIdx((i) => Math.max(0, i - 1));
                }}
                className="px-2.5 sm:px-3.5 py-2 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 disabled:opacity-30 flex items-center gap-1 cursor-pointer shrink-0"
              >
                <ChevronLeft className="size-3.5" />
                <span className="hidden sm:inline">Sem. préc.</span>
                <kbd className="hidden sm:inline px-1 py-0.2 rounded bg-black/10 dark:bg-white/10 font-mono text-[9px] font-bold">←</kbd>
              </button>

              <select
                value={safeWeekIdx}
                onChange={(e) => {
                  playClickSound();
                  setSelectedWeekIdx(Number(e.target.value));
                }}
                aria-label="Sélectionner une semaine de cours"
                className="flex-1 min-w-0 px-2.5 sm:px-3.5 py-2 sm:py-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-slate-900 dark:text-slate-100 font-bold text-xs cursor-pointer truncate"
              >
                {activeWeeksData.map((wData, idx) => (
                  <option key={wData.week.key} value={idx}>
                    Semaine {wData.week.label} · {wData.week.monthLabel} ({wData.events.length} séa. · {wData.totalHours}h)
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
                className="px-2.5 sm:px-3.5 py-2 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 disabled:opacity-30 flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span className="hidden sm:inline">Sem. suiv.</span>
                <ChevronRight className="size-3.5" />
                <kbd className="hidden sm:inline px-1 py-0.2 rounded bg-black/10 dark:bg-white/10 font-mono text-[9px] font-bold">→</kbd>
              </button>
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-2 text-xs w-full sm:w-auto">
              <span className="font-mono text-slate-500 text-[11px] sm:text-xs">
                Sem. {safeWeekIdx + 1} / {activeWeeksData.length} actives
              </span>
              <button
                type="button"
                onClick={jumpToNextUpcomingWeek}
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <span>Prochaine séance</span>
                <kbd className="hidden sm:inline px-1 py-0.2 rounded bg-white/20 dark:bg-slate-900/20 font-mono text-[9px] font-bold">T</kbd>
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
                const isDayPast = Boolean(todayIso && date < todayIso);
                const isDayToday = Boolean(todayIso && date === todayIso);

                if (filters.hidePast && isDayPast) {
                  return null;
                }

                const first = dayEvents[0]!;
                const dayHours = dayEvents.reduce(
                  (acc, ev) => acc + getEventDurationHours(ev),
                  0,
                );
                return (
                  <div
                    key={date}
                    className={`rounded-3xl border shadow-xs overflow-hidden flex flex-col transition-all ${
                      isDayPast
                        ? "opacity-55 hover:opacity-100 bg-slate-100/40 dark:bg-slate-900/40 border-dashed border-slate-300 dark:border-slate-800"
                        : isDayToday
                          ? "border-emerald-500/60 ring-2 ring-emerald-500/15 bg-white/95 dark:bg-slate-900/95"
                          : "border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90"
                    }`}
                  >
                    <div
                      className={`px-4.5 py-3 border-b flex items-center justify-between gap-2 ${
                        isDayPast
                          ? "bg-slate-100/50 dark:bg-slate-800/30 border-slate-200/50 dark:border-slate-800/50"
                          : isDayToday
                            ? "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/30 text-emerald-950 dark:text-emerald-100"
                            : "bg-slate-50/80 dark:bg-slate-800/50 border-slate-200/70 dark:border-slate-800"
                      }`}
                    >
                      <div>
                        <div className="font-mono text-xs font-black uppercase text-slate-900 dark:text-slate-100 flex items-center gap-1.5 flex-wrap">
                          <span>
                            {first.day} {formatFrDate(date)}
                          </span>
                          {isDayToday && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-mono text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                              <span className="size-1.5 rounded-full bg-white animate-pulse" />
                              Aujourd&apos;hui
                            </span>
                          )}
                          {isDayPast && (
                            <span className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-[9px] font-bold">
                              ✓ Passé
                            </span>
                          )}
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

                        const [eh, em] = ev.end.split(":").map(Number);
                        const endMin = (eh || 0) * 60 + (em || 0);
                        const now = new Date();
                        const nowMin = now.getHours() * 60 + now.getMinutes();
                        const isEventPast = isDayPast || (isDayToday && endMin <= nowMin);

                        return (
                          <div
                            key={id}
                            onClick={() => setSelectedEvent(ev)}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                              selectedId === id
                                ? "border-amber-500 ring-2 ring-amber-500/20 bg-amber-500/5 shadow-2xs"
                                : isEventPast
                                  ? "opacity-60 bg-slate-100/50 dark:bg-slate-800/30 border-slate-200/60 dark:border-slate-800 hover:opacity-100"
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
                                {ev.cancelled && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/30">
                                    🚫 Annulée (report à fixer)
                                  </span>
                                )}
                                {isEventPast && !ev.cancelled && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                    Terminé
                                  </span>
                                )}
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

                            {ev.cancelReason && (
                              <div className="mt-1.5 px-2 py-1 rounded-lg bg-rose-500/10 border border-rose-500/25 text-[11px] text-rose-900 dark:text-rose-200 flex items-start gap-1.5 font-medium">
                                <AlertTriangle className="size-3 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                                <span>{ev.cancelReason}</span>
                              </div>
                            )}

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
                                className={`px-2.5 py-1.5 sm:px-2 sm:py-0.5 rounded-lg sm:rounded text-[11px] sm:text-[10px] font-bold border cursor-pointer ${
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
              attendedIds={effectiveAttendedIds}
            />
          </div>
          <div className="pv-list">
            <PlanningList
              filters={filters}
              todayIso={todayIso}
              selectedEventId={selectedId}
              onSelectEvent={setSelectedEvent}
              attendedIds={effectiveAttendedIds}
              onToggleAttended={handleToggleAttended}
              sessionNotes={sessionNotes}
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. MODALES APPLE : ASSIDUITÉ PAR UE (159H) & EXPORT .ICS CONTEXTUEL       */}
      {/* ========================================================================= */}
      <AttendanceDetailModal
        isOpen={showAttendanceModal}
        onClose={() => setShowAttendanceModal(false)}
        attendedIds={effectiveAttendedIds}
        autoAttendanceMode={autoAttendanceMode}
        onToggleAutoMode={handleToggleAutoMode}
        onFilterUnit={(u) =>
          setFilters((f) => ({
            ...f,
            units: new Set([u]),
          }))
        }
      />

      <IcsExportModal
        isOpen={showIcsModal}
        onClose={() => setShowIcsModal(false)}
        filteredEvents={PLANNING_EVENTS.filter((e) => matchesFilters(e, filters))}
        totalEventsCount={PLANNING_EVENTS.length}
      />

      {/* ========================================================================= */}
      {/* 10. FOOTNOTES ÉLÉGANTES STYLE APPLE REFERENCE                            */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed">
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

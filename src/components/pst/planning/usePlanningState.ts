"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  getNextPhysicalEvent,
  isoWeekKey,
  matchesFilters,
  type PlanningFilters,
} from "@/lib/pst/planning-stats";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";
import { MODULES as HUB_MODULES, moduleStats } from "@/lib/pst/hub-stats";
import studyIndexData from "@/lib/pst/data/study-index.json";

const FILTERS_KEY_DESKTOP = "pst_planning_filters_desktop_v1";
const FILTERS_KEY_MOBILE = "pst_planning_filters_mobile_v1";
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

const ALL_GLOSSARY_TERMS = ((
  studyIndexData as unknown as { glossaire: GlossaryTerm[] }
).glossaire ?? []) as GlossaryTerm[];

function defaultFilters(isMobile = false): PlanningFilters {
  return {
    units: new Set(UNIT_ORDER),
    // Sur mobile, par défaut, seuls le présentiel (COURS) et les webconférences (WEBCONF) sont activés
    types: isMobile
      ? new Set<PlanningEventType>(["COURS", "WEBCONF"])
      : new Set<PlanningEventType>([
          "COURS",
          "WEBCONF",
          "DISTANT",
          "EXAMEN",
        ]),
    sessions: new Set([1, 2]),
    teacher: "all",
    search: "",
    onlyConflicts: false,
    hidePast: false,
    todayIso: null,
  };
}

function allFilters(todayIso: string | null = null): PlanningFilters {
  return {
    units: new Set(UNIT_ORDER),
    types: new Set<PlanningEventType>([
      "COURS",
      "WEBCONF",
      "DISTANT",
      "EXAMEN",
    ]),
    sessions: new Set([1, 2]),
    teacher: "all",
    search: "",
    onlyConflicts: false,
    hidePast: false,
    todayIso,
  };
}

function loadFilters(isMobile = false): PlanningFilters {
  try {
    const key = isMobile ? FILTERS_KEY_MOBILE : FILTERS_KEY_DESKTOP;
    const raw = window.localStorage.getItem(key);
    if (!raw) return defaultFilters(isMobile);
    const parsed = JSON.parse(raw) as StoredFilters;
    if (parsed.version !== 5) return defaultFilters(isMobile);
    return {
      ...defaultFilters(isMobile),
      units: new Set(parsed.units),
      types: new Set(parsed.types),
      sessions: new Set(parsed.sessions),
    };
  } catch {
    return defaultFilters(isMobile);
  }
}

function toggleInSet<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

export function usePlanningState() {
  const [isMobile, setIsMobile] = useState(false);
  const [filters, setFilters] = useState<PlanningFilters>(() => defaultFilters(false));
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
  const [chosenConflicts, setChosenConflicts] = useState<
    Record<string, string>
  >({});
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
    if (isMobile) {
      // Sur mobile, le filtre par défaut est exclusivement présentiel (COURS) + webconférence (WEBCONF)
      const hasOnlyCoursWebconf =
        filters.types.size === 2 &&
        filters.types.has("COURS") &&
        filters.types.has("WEBCONF");
      if (!hasOnlyCoursWebconf) count++;
    } else {
      if (filters.types.size < 3) count++;
    }
    if (filters.units.size < UNIT_ORDER.length) count++;
    if (filters.teacher && filters.teacher !== "all") count++;
    if (filters.search && filters.search.trim().length > 0) count++;
    if (filters.onlyConflicts) count++;
    if (filters.hidePast) count++;
    return count;
  }, [filters, isMobile]);

  const allTeachers = useMemo(() => getAllTeachers(), []);
  const totalConflictsCount = useMemo(
    () => PLANNING_EVENTS.filter((e) => getEventConflicts(e).length > 0).length,
    [],
  );
  const physicalConflictsCount = useMemo(
    () =>
      PLANNING_EVENTS.filter((e) => {
        const confs = getEventConflicts(e);
        return (
          confs.length > 0 &&
          getConflictSeverity(e, confs) === "PRESENCE_CRITICAL"
        );
      }).length,
    [],
  );
  const replayableConflictsCount = useMemo(
    () =>
      PLANNING_EVENTS.filter((e) => {
        const confs = getEventConflicts(e);
        return (
          confs.length > 0 &&
          getConflictSeverity(e, confs) === "WEBCONF_REPLAYABLE"
        );
      }).length,
    [],
  );
  const totalPlannedHours = useMemo(
    () => PLANNING_EVENTS.reduce((acc, e) => acc + getEventDurationHours(e), 0),
    [],
  );

  // Nombre dynamique unique de journées de déplacement en présentiel (13 journées pour 18 séances)
  const totalPhysicalDaysCount = useMemo(() => {
    const coursEvents = PLANNING_EVENTS.filter((e) => e.type === "COURS");
    return new Set(coursEvents.map((e) => e.date)).size;
  }, []);

  const globalTotals = useMemo(() => computeGlobalPlanningTotals(), []);
  const visioHours = useMemo(
    () =>
      PLANNING_EVENTS.filter((e) => e.type === "WEBCONF").reduce(
        (acc, e) => acc + getEventDurationHours(e),
        0,
      ),
    [],
  );
  const distantHours = useMemo(
    () =>
      PLANNING_EVENTS.filter((e) => e.type === "DISTANT").reduce(
        (acc, e) => acc + getEventDurationHours(e),
        0,
      ),
    [],
  );

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
    const matchingUnits = PLANNING_EVENTS.filter((e) =>
      filters.units.has(e.unit),
    );
    return {
      all: matchingUnits.length,
      cours: matchingUnits.filter((e) => e.type === "COURS").length,
      visio: matchingUnits.filter((e) => e.type === "WEBCONF").length,
      distant: matchingUnits.filter((e) => e.type === "DISTANT").length,
      conflicts: matchingUnits.filter((e) => getEventConflicts(e).length > 0)
        .length,
    };
  }, [filters.units]);

  // =========================================================================
  // HOOK DE COMPTE À REBOURS EN TEMPS RÉEL (STYLE DYNAMIC ISLAND IOS 18)
  // =========================================================================
  const [countdownText, setCountdownText] = useState<{
    badge: string;
    label: string;
    mobileLabel?: string;
    isNow: boolean;
    isToday: boolean;
  } | null>(null);

  useEffect(() => {
    const ev = nextImmediate;
    if (!ev) return;

    function computeCountdown() {
      if (!ev) return;
      const now = new Date();
      const [y, m, d] = ev.date.split("-").map(Number);
      const [h, min] = ev.start.split(":").map(Number);
      const targetStart = new Date(y, m - 1, d, h, min, 0);

      const [hEnd, minEnd] = ev.end.split(":").map(Number);
      const targetEnd = new Date(y, m - 1, d, hEnd, minEnd, 0);

      const unitCode = ev.unit.toUpperCase();

      if (now >= targetStart && now <= targetEnd) {
        setCountdownText({
          badge: "EN DIRECT",
          label: `Séance ${unitCode} en cours jusqu'à ${ev.end}`,
          mobileLabel: `${unitCode} en cours jusqu'à ${ev.end}`,
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
          label: `${unitCode} à ${ev.start} (dans ${diffHours}h ${diffMins}m)`,
          mobileLabel: `${unitCode} à ${ev.start} (${diffHours}h${diffMins > 0 ? diffMins : ""})`,
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

        const shortDay = ev.day.slice(0, 3) + ".";
        const shortDate = formatFrDate(ev.date).slice(0, 5);

        setCountdownText({
          badge: `J-${days}`,
          label: `Prochaine séance : ${ev.day} ${formatFrDate(ev.date)} à ${ev.start} (${unitCode} · ${hours}h ${minutes}m)`,
          mobileLabel: `Prochaine : ${shortDay} ${shortDate} à ${ev.start} (${unitCode})`,
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
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    const now = new Date();
    const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    setTodayIso(iso);
    setTodayWeekKey(isoWeekKey(iso));
    const loaded = loadFilters(mobile);
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
    } else if (mobile) {
      // Default to Agenda Semaine on mobile when no preference is stored
      setActiveView("week");
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

    function syncExternalNotes() {
      try {
        const rawAtt = window.localStorage.getItem(ATTENDANCE_KEY);
        if (rawAtt) {
          const parsedAtt = JSON.parse(rawAtt) as StoredAttendance;
          if (parsedAtt.notes && typeof parsedAtt.notes === "object") {
            setSessionNotes(parsedAtt.notes);
          }
        }
      } catch {
        // ignore
      }
    }

    function handleResize() {
      const isMob = window.innerWidth < 768;
      setIsMobile((prev) => (prev !== isMob ? isMob : prev));
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("pst:storage-updated", syncExternalNotes);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pst:storage-updated", syncExternalNotes);
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const storageKey = isMobile
        ? FILTERS_KEY_MOBILE
        : FILTERS_KEY_DESKTOP;
      const stored: StoredFilters = {
        version: 5,
        units: Array.from(filters.units),
        types: Array.from(filters.types),
        sessions: Array.from(filters.sessions),
      };
      window.localStorage.setItem(storageKey, JSON.stringify(stored));
    } catch {
      // ignore
    }
  }, [filters.units, filters.types, filters.sessions, hydrated, isMobile]);

  function saveAttendance(
    nextAttended: Set<string>,
    nextNotes: Record<string, string>,
  ) {
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
        window.localStorage.setItem(ARBITRATION_V2_KEY, JSON.stringify(next));
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
    const filtered = PLANNING_EVENTS.filter((e) =>
      matchesFilters(e, filters),
    ).sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
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

  function jumpToNextUpcomingWeek() {
    playClickSound();
    if (activeWeeksData.length === 0) return;
    const refIso = todayIso ?? new Date().toISOString().slice(0, 10);
    const idx = activeWeeksData.findIndex((w) =>
      w.events.some((e) => e.date >= refIso),
    );
    setSelectedWeekIdx(idx >= 0 ? idx : 0);
  }

  useEffect(() => {
    if (!todayIso || activeWeeksData.length === 0) return;
    const idx = activeWeeksData.findIndex((w) =>
      w.events.some((e) => e.date >= todayIso),
    );
    if (idx >= 0) {
      setSelectedWeekIdx(idx);
    }
  }, [todayIso]);

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

  // Progression chronologique de la séance au sein de son UE + état de préparation de l'UE
  const selectedSessionInfo = useMemo(() => {
    if (!selectedEvent) return null;
    const unitEvents = PLANNING_EVENTS.filter(
      (e) =>
        e.unit === selectedEvent.unit && e.type !== "EXAMEN" && !e.cancelled,
    ).sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
    const idx = unitEvents.findIndex(
      (e) => eventId(e) === eventId(selectedEvent),
    );
    const hubMod = HUB_MODULES.find(
      (m) => m.id.toLowerCase() === selectedEvent.unit.toLowerCase(),
    );
    const stats = hubMod ? moduleStats(hubMod) : null;
    const readinessPct = stats
      ? Math.round(
          (stats.pctFiches +
            stats.pctCards +
            (stats.avgScore !== null ? stats.avgScore : 0)) /
            (stats.avgScore !== null ? 3 : 2),
        )
      : 0;
    return {
      sessionIndex: idx >= 0 ? idx + 1 : null,
      totalSessions: unitEvents.length,
      stats,
      readinessPct,
    };
  }, [selectedEvent]);

  // Extraction dynamique de 3 concepts clés progressifs selon le numéro de séance (Feature 5 améliorée)
  const unitConcepts = useMemo(() => {
    if (!selectedEvent) return [];
    const normalizedUnit = selectedEvent.unit.toLowerCase();
    const shortUnit = normalizedUnit.replace("pst", "");
    const allForUnit = ALL_GLOSSARY_TERMS.filter(
      (term) =>
        term.m.toLowerCase() === normalizedUnit ||
        term.m.toLowerCase() === shortUnit,
    );
    if (allForUnit.length <= 3) return allForUnit;
    const offset =
      (((selectedSessionInfo?.sessionIndex ?? 1) - 1) * 3) % allForUnit.length;
    const picked: GlossaryTerm[] = [];
    for (let i = 0; i < 3; i++) {
      picked.push(allForUnit[(offset + i) % allForUnit.length]!);
    }
    return picked;
  }, [selectedEvent, selectedSessionInfo?.sessionIndex]);

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
    ]
      .filter(Boolean)
      .join("\n");

    navigator.clipboard.writeText(text);
    playSuccessSound();
    setBriefingCopied(true);
    setTimeout(() => setBriefingCopied(false), 2500);
  }


  return {
    activeView,
    setView,
    filters,
    setFilters,
    isMobile,
    searchInputRef,
    showMobileFilters,
    setShowMobileFilters,
    showExportMenu,
    setShowExportMenu,
    showAttendanceModal,
    setShowAttendanceModal,
    showIcsModal,
    setShowIcsModal,
    selectedEvent,
    setSelectedEvent,
    selectedId,
    selectedSessionInfo,
    unitConcepts,
    selectedConflicts,
    selectedNote,
    selectedIsAttended,
    briefingCopied,
    handleCopyBriefing,
    handleUpdateNote,
    handleToggleAttended,
    handleToggleAutoMode,
    autoAttendanceMode,
    effectiveAttendedIds,
    sessionNotes,
    attendancePct,
    completedHours,
    totalPlannedHours,
    totalPhysicalDaysCount,
    globalTotals,
    presenceRemaining,
    visioRemaining,
    visioHours,
    distantRemaining,
    distantHours,
    countdownText,
    currentOrNextTodaySession,
    nextPhysical,
    activeFiltersCount,
    formatCounts,
    totalConflictsCount,
    physicalConflictsCount,
    replayableConflictsCount,
    allTeachers,
    toggleType,
    toggleUnit,
    conflictArbitrations,
    handleSetArbitration,
    chosenConflicts,
    handleSetConflictArbitration,
    presenceDaysGroups,
    todayIso,
    todayWeekKey,
    activeWeeksData,
    safeWeekIdx,
    setSelectedWeekIdx,
    jumpToNextUpcomingWeek,
    resetToDefaultFilters: () =>
      setFilters((f) => ({
        ...defaultFilters(isMobile),
        todayIso: f.todayIso,
      })),
    showAllFilters: () => setFilters((f) => allFilters(f.todayIso)),
  };
}

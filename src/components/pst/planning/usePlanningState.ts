"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  PLANNING_EVENTS,
  UNIT_ORDER,
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
import {
  FILTERS_KEY_DESKTOP,
  FILTERS_KEY_MOBILE,
  VIEW_KEY,
  ATTENDANCE_KEY,
  ARBITRATION_KEY,
  ARBITRATION_V2_KEY,
  AUTO_ATTENDANCE_KEY,
  MANUAL_ABSENCES_KEY,
  type StoredFilters,
  type StoredAttendance,
  defaultFilters,
  allFilters,
  loadFilters,
  toggleInSet,
} from "./helpers/planning-storage-helpers";
import { usePlanningCountdown } from "./helpers/planning-countdown";
import {
  extractUnitConcepts,
  buildBriefingText,
} from "./helpers/planning-briefing-helpers";
import {
  computeStaticPlanningKpis,
  computeEffectiveAttendanceIds,
  computeSelectedSessionInfo,
} from "./helpers/planning-kpi-helpers";

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
    if (filters.quickPeriod && filters.quickPeriod !== "all") count++;
    return count;
  }, [filters, isMobile]);

  const staticKpis = useMemo(() => computeStaticPlanningKpis(), []);
  const {
    allTeachers,
    totalConflictsCount,
    physicalConflictsCount,
    replayableConflictsCount,
    totalPlannedHours,
    totalPhysicalDaysCount,
    globalTotals,
    visioHours,
    distantHours,
  } = staticKpis;

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
  const effectiveAttendedIds = useMemo(
    () =>
      computeEffectiveAttendanceIds(
        attendedIds,
        manualAbsences,
        autoAttendanceMode,
      ),
    [attendedIds, manualAbsences, autoAttendanceMode, todayIso],
  );

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

  // Compte à rebours en temps réel (Dynamic Island style)
  const countdownText = usePlanningCountdown(nextImmediate);

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
  const selectedSessionInfo = useMemo(
    () => computeSelectedSessionInfo(selectedEvent),
    [selectedEvent],
  );

  // Extraction dynamique de 3 concepts clés progressifs selon le numéro de séance
  const unitConcepts = useMemo(() => {
    if (!selectedEvent) return [];
    return extractUnitConcepts(
      selectedEvent.unit,
      selectedSessionInfo?.sessionIndex ?? null,
    );
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
    const text = buildBriefingText(selectedEvent, unitConcepts, selectedNote);
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

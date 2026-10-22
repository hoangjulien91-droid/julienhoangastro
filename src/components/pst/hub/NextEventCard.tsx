"use client";

import { useState, useMemo, useEffect } from "react";
import { Link } from "@/components/common/Link";
import {
  Calendar,
  CalendarPlus,
  Clock,
  Video,
  MapPin,
  ArrowRight,
  User,
  ChevronDown,
  ChevronUp,
  ListFilter,
  Building2,
  Sparkles,
  BookOpen,
  NotebookPen,
  Check,
} from "lucide-react";
import {
  eventId,
  eventLocation,
  formatFrDate,
  getNextEvent,
  getNextWebconfEvent,
  getNextPhysicalEvent,
  getAllUpcomingEvents,
} from "@/lib/pst/planning-stats";
import type { PlanningEvent } from "@/lib/pst/data/planning";
import { downloadIcs } from "@/lib/pst/ics-export";

const UNIT_TITLES: Record<string, string> = {
  pst106: "Clinique de l'activité et psychologie du travail",
  pst108: "Psychologie du langage et clinique du dialogue",
  pst120: "Psychodynamique et psychopathologie du travail",
  pst123: "Le psychologue, le travail et l'emploi",
  pst124: "Transformations digitales des activités et clinique des usages",
};

/**
 * Calcule l'imminence d'une séance (Compte à rebours intelligent : Aujourd'hui dans 2h, Demain, J-2...)
 */
function getEventImminence(
  event: PlanningEvent,
  now: Date = new Date(),
): { label: string; badgeClass: string } {
  const todayStr = now.toISOString().slice(0, 10);
  const nowMs = now.getTime();

  const startParts = event.start.split(":").map(Number);
  const startHour = startParts[0] ?? 0;
  const startMin = startParts[1] ?? 0;
  const endParts = event.end.split(":").map(Number);
  const endHour = endParts[0] ?? 0;
  const endMin = endParts[1] ?? 0;

  const eventStart = new Date(event.date + "T00:00:00");
  eventStart.setHours(startHour, startMin, 0, 0);

  const eventEnd = new Date(event.date + "T00:00:00");
  eventEnd.setHours(endHour, endMin, 0, 0);

  const startMs = eventStart.getTime();
  const endMs = eventEnd.getTime();

  if (nowMs >= startMs && nowMs <= endMs) {
    return {
      label: "En cours maintenant",
      badgeClass: "bg-rose-600 text-white border-rose-700 animate-pulse",
    };
  }

  if (event.date === todayStr) {
    const diffMs = startMs - nowMs;
    if (diffMs <= 0) {
      return {
        label: "Aujourd'hui",
        badgeClass: "bg-amber-600 text-white border-amber-700 font-extrabold",
      };
    }
    const diffHours = Math.round(diffMs / 3600000);
    if (diffHours <= 1) {
      return {
        label: "Aujourd'hui dans moins d'1h",
        badgeClass:
          "bg-amber-600 text-white border-amber-700 animate-pulse font-black",
      };
    }
    return {
      label: `Aujourd'hui dans ${diffHours}h`,
      badgeClass: "bg-amber-600 text-white border-amber-700 font-extrabold",
    };
  }

  const dEvent = new Date(event.date + "T00:00:00");
  const dToday = new Date(todayStr + "T00:00:00");
  const diffDays = Math.round((dEvent.getTime() - dToday.getTime()) / 86400000);

  if (diffDays === 1) {
    return {
      label: `Demain à ${event.start}`,
      badgeClass: "bg-indigo-600 text-white border-indigo-700 font-bold",
    };
  }
  if (diffDays === 2) {
    return {
      label: "J-2",
      badgeClass: "bg-sky-600 text-white border-sky-700 font-black",
    };
  }
  if (diffDays > 2 && diffDays <= 7) {
    return {
      label: `J-${diffDays}`,
      badgeClass: "bg-slate-800 text-white border-slate-700 font-bold",
    };
  }
  return {
    label: `Dans ${diffDays}j`,
    badgeClass:
      "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700",
  };
}

interface SessionCardProps {
  event: PlanningEvent;
  categoryLabel: string;
  categoryType: "webconf" | "physical";
}

function SessionCard({ event, categoryLabel, categoryType }: SessionCardProps) {
  const isWebconf = categoryType === "webconf";
  const location = eventLocation(event);
  const placeLabel = location
    ? event.room
      ? `${location} — ${event.room}`
      : location
    : event.room
      ? `ENF — ${event.room}`
      : "Espace Numérique de Formation (Visio)";

  const unitTitle = UNIT_TITLES[event.unit] || "";
  const imminence = getEventImminence(event);

  // Prise de notes rapide pour la séance (unifiée avec pst_planning_attendance_v1 du Planning)
  const evId = eventId(event);
  const legacyNoteKey = `pst_session_note_${event.unit}_${event.date}`;
  const [quickNote, setQuickNote] = useState("");
  const [isNoteSaved, setIsNoteSaved] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    function loadUnifiedNote() {
      try {
        const rawAtt = localStorage.getItem("pst_planning_attendance_v1");
        if (rawAtt) {
          const parsed = JSON.parse(rawAtt) as {
            attended?: string[];
            notes?: Record<string, string>;
          };
          const fromPlanning = parsed.notes?.[evId];
          if (fromPlanning !== undefined) {
            setQuickNote(fromPlanning);
            if (fromPlanning.trim()) setShowNotes(true);
            return;
          }
        }
        const savedLegacy = localStorage.getItem(legacyNoteKey);
        if (savedLegacy) {
          setQuickNote(savedLegacy);
          setShowNotes(true);
        }
      } catch {
        // ignore
      }
    }
    loadUnifiedNote();
    window.addEventListener("pst:storage-updated", loadUnifiedNote);
    return () =>
      window.removeEventListener("pst:storage-updated", loadUnifiedNote);
  }, [evId, legacyNoteKey]);

  function handleSaveNote(val: string) {
    setQuickNote(val);
    try {
      localStorage.setItem(legacyNoteKey, val);
      const rawAtt = localStorage.getItem("pst_planning_attendance_v1");
      const parsed: { attended: string[]; notes: Record<string, string> } =
        rawAtt ? JSON.parse(rawAtt) : { attended: [], notes: {} };
      if (!Array.isArray(parsed.attended)) parsed.attended = [];
      if (!parsed.notes || typeof parsed.notes !== "object") parsed.notes = {};
      parsed.notes[evId] = val;
      localStorage.setItem(
        "pst_planning_attendance_v1",
        JSON.stringify(parsed),
      );
      window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      setIsNoteSaved(true);
      setTimeout(() => setIsNoteSaved(false), 2000);
    } catch {
      // ignore
    }
  }

  return (
    <div
      className={`relative flex flex-col h-full p-4 sm:p-5 rounded-3xl border backdrop-blur-xl transition-all shadow-xs ${
        isWebconf
          ? "bg-indigo-50/60 dark:bg-indigo-950/30 border-indigo-200/80 dark:border-indigo-900/60 hover:border-indigo-400"
          : "bg-amber-50/60 dark:bg-amber-950/30 border-amber-200/80 dark:border-amber-900/60 hover:border-amber-400"
      }`}
    >
      <div className="space-y-2.5 flex-1">
        {/* En-tête : Badges & Compte à rebours intelligent */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wide border shadow-2xs whitespace-nowrap shrink-0 ${
                isWebconf
                  ? "bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-indigo-500/30"
                  : "bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30"
              }`}
            >
              {isWebconf ? (
                <Video className="size-3 shrink-0" />
              ) : (
                <Building2 className="size-3 shrink-0" />
              )}
              <span className="whitespace-nowrap">{categoryLabel}</span>
            </span>

            <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 dark:border dark:border-slate-700 font-mono text-xs font-black uppercase shadow-2xs whitespace-nowrap shrink-0">
              {event.unit.toUpperCase()}
            </span>

            {/* Compte à rebours intelligent aligné à côté du badge UE */}
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border shadow-xs whitespace-nowrap shrink-0 ${imminence.badgeClass}`}
              title="Imminence de la séance"
            >
              <Clock className="size-2.5 shrink-0" />
              <span>{imminence.label}</span>
            </span>
          </div>
        </div>

        {/* Date et Heure regroupées sur une seule ligne */}
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 pt-0.5 flex-wrap">
          <Calendar
            className={`size-3.5 shrink-0 ${
              isWebconf
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-amber-600 dark:text-amber-400"
            }`}
          />
          <span className="whitespace-nowrap">
            {event.day} {formatFrDate(event.date)}
          </span>
          <span className="opacity-40">•</span>
          <span className="text-slate-900 dark:text-slate-100 font-extrabold whitespace-nowrap">
            {event.start}–{event.end}
          </span>
        </div>

        {/* Intitulé du cours mis en valeur & Enseignant */}
        <div className="space-y-1">
          {unitTitle && (
            <h3 className="text-[1.05rem] font-semibold text-slate-900 dark:text-slate-100 leading-snug tracking-tight m-0">
              {unitTitle}
            </h3>
          )}

          {event.teacher && (
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-0.5">
              <User className="size-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{event.teacher}</span>
            </div>
          )}
        </div>

        {/* Salle / Espace allégé */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/60 text-[11px] text-slate-600 dark:text-slate-400 max-w-full">
          <MapPin
            className={`size-3 shrink-0 ${
              isWebconf
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-amber-600 dark:text-amber-400"
            }`}
          />
          <span className="font-medium truncate" title={placeLabel}>
            {placeLabel}
          </span>
        </div>
      </div>

      {/* Bloc du bas : Prise de notes rapide + boutons d'action alignés en bas via mt-auto */}
      <div className="mt-auto">
        {/* Bloc : Prise de notes rapide pour la séance */}
        <div className="mt-3 pt-2.5 border-t border-slate-200/70 dark:border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setShowNotes(!showNotes)}
              className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <NotebookPen className="size-3.5 text-amber-600" />
              <span>Prise de notes rapide</span>
              <span className="text-[10px] font-mono opacity-70">
                {showNotes ? "▲" : quickNote ? `(1 note · ▼)` : "▼"}
              </span>
            </button>

            {isNoteSaved && (
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-in fade-in">
                <Check className="size-3" />
                <span>Enregistré</span>
              </span>
            )}
          </div>

          {showNotes && (
            <div className="space-y-1.5 animate-in fade-in duration-150">
              <textarea
                value={quickNote}
                onChange={(e) => handleSaveNote(e.target.value)}
                placeholder={`Questions pour l'enseignant, rappels ou synthèses à chaud pour ${event.unit.toUpperCase()}...`}
                rows={2}
                className="w-full p-2.5 rounded-xl text-xs bg-white/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 focus:outline-hidden focus:border-amber-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 leading-relaxed shadow-2xs resize-y"
              />
            </div>
          )}
        </div>

        {/* Actions en bas de carte : Bouton principal Ouvrir l'atelier + bouton compact .ics */}
        <div className="mt-3 pt-2.5 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center gap-2">
          <Link
            href={`/pst/${event.unit.replace("pst", "")}/`}
            className={`flex-1 min-w-0 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 text-white shadow-2xs hover:shadow-xs transition-all active:scale-98 whitespace-nowrap ${
              isWebconf
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-amber-600 hover:bg-amber-700"
            }`}
            title={`Ouvrir les fiches et synthèses de l'atelier ${event.unit.toUpperCase()}`}
          >
            <BookOpen className="size-3.5 shrink-0" />
            <span className="truncate">Ouvrir l&apos;atelier</span>
          </Link>

          <button
            type="button"
            onClick={() =>
              downloadIcs([event], `seance-${event.unit}-${event.date}.ics`)
            }
            className="px-2.5 py-2 rounded-xl font-semibold text-xs flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-98 bg-white/80 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300/80 dark:border-slate-700 shadow-2xs shrink-0"
            title="Ajouter cette séance à ton agenda (.ics)"
          >
            <CalendarPlus className="size-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
            <span>.ics</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function NextEventCard() {
  const allUpcoming = useMemo(() => getAllUpcomingEvents(), []);
  const nextWebconf = useMemo(() => getNextWebconfEvent(), []);
  const nextPhysical = useMemo(() => getNextPhysicalEvent(), []);
  const fallbackNext = useMemo(() => getNextEvent(), []);

  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [modalityFilter, setModalityFilter] = useState<
    "all" | "COURS" | "WEBCONF" | "DISTANT"
  >("all");
  const [mobileTab, setMobileTab] = useState<"webconf" | "physical">("webconf");

  if (!nextWebconf && !nextPhysical && !fallbackNext) return null;

  const filteredUpcoming = useMemo(() => {
    if (modalityFilter === "all") return allUpcoming;
    return allUpcoming.filter((e) => e.type === modalityFilter);
  }, [allUpcoming, modalityFilter]);

  const primaryEventsToExport = useMemo(() => {
    const list: PlanningEvent[] = [];
    if (nextWebconf) list.push(nextWebconf);
    if (nextPhysical && nextPhysical !== nextWebconf) list.push(nextPhysical);
    return list.length > 0 ? list : fallbackNext ? [fallbackNext] : [];
  }, [nextWebconf, nextPhysical, fallbackNext]);

  return (
    <div className="card bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 rounded-3xl mb-6 shadow-xs relative overflow-hidden transition-all">
      {/* En-tête : Signal & Actions Générales */}
      <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Prochaines séances à venir</span>
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0">
          {primaryEventsToExport.length > 0 && (
            <button
              type="button"
              onClick={() =>
                downloadIcs(primaryEventsToExport, "prochaines-seances-pst.ics")
              }
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 whitespace-nowrap"
              title="Ajouter les prochaines séances (webconf & physique) à votre agenda (.ics)"
            >
              <CalendarPlus className="size-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Exporter (.ics)</span>
            </button>
          )}

          <Link
            href="/pst/planning/"
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap"
          >
            <Calendar className="size-3.5 shrink-0" />
            <span>Planning</span>
            <ArrowRight className="size-3.5 shrink-0" />
          </Link>
        </div>
      </div>

      {/* SÉLECTEUR MOBILE APPLE : Toggle Visio / Présentiel (sur mobile uniquement < 768px) */}
      {nextWebconf && nextPhysical && (
        <div className="flex md:hidden mb-3 p-1 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80">
          <button
            type="button"
            onClick={() => setMobileTab("webconf")}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
              mobileTab === "webconf"
                ? "bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-2xs font-extrabold"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <Video className="size-3.5 text-indigo-500" />
            <span>Visio (Webconf)</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("physical")}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
              mobileTab === "physical"
                ? "bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-300 shadow-2xs font-extrabold"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <MapPin className="size-3.5 text-amber-500" />
            <span>Présentiel Bègles</span>
          </button>
        </div>
      )}

      {/* CARTES SÉANCES : Deux colonnes côte-à-côte dès 768px (tablettes & desktop), ou onglet sur mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {/* Webconférence */}
        {nextWebconf ? (
          <div
            className={`h-full ${mobileTab === "physical" ? "max-md:hidden" : ""}`}
          >
            <SessionCard
              event={nextWebconf}
              categoryLabel="Web-conférence (Visio)"
              categoryType="webconf"
            />
          </div>
        ) : fallbackNext ? (
          <div className="h-full">
            <SessionCard
              event={fallbackNext}
              categoryLabel="Prochaine Séance"
              categoryType={
                fallbackNext.type === "COURS" ? "physical" : "webconf"
              }
            />
          </div>
        ) : null}

        {/* Présentiel */}
        {nextPhysical ? (
          <div
            className={`h-full ${mobileTab === "webconf" ? "max-md:hidden" : ""}`}
          >
            <SessionCard
              event={nextPhysical}
              categoryLabel="Session Présentielle (Bègles)"
              categoryType="physical"
            />
          </div>
        ) : null}
      </div>

      {/* Barre de contrôle : Afficher / Masquer toutes les séances suivantes */}
      <div className="mt-4 pt-3.5 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
        <button
          type="button"
          onClick={() => setShowAllUpcoming((s) => !s)}
          className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-100 dark:border dark:border-slate-700 dark:hover:bg-slate-700/80 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-xs active:scale-98"
        >
          <Calendar className="size-3.5 text-amber-500" />
          <span>
            {showAllUpcoming
              ? "Masquer les séances suivantes"
              : `Afficher les séances suivantes (${allUpcoming.length} au programme)`}
          </span>
          {showAllUpcoming ? (
            <ChevronUp className="size-3.5" />
          ) : (
            <ChevronDown className="size-3.5" />
          )}
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span>Programme officiel CNAM 2026/2027</span>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <Link
            href="/pst/planning/"
            className="text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>Frise complète</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>

      {/* TIROIR DÉROULANT DES SÉANCES SUIVANTES */}
      {showAllUpcoming && (
        <div className="mt-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5 animate-fadeIn">
          <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-slate-200/70 dark:border-slate-800">
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ListFilter className="size-3.5 text-amber-600" />
              <span>
                Programme prévisionnel des {filteredUpcoming.length} séances à
                venir
              </span>
            </div>

            {/* Filtres de modalité */}
            <div className="flex items-center gap-1.5 text-[11px] font-bold flex-wrap">
              <button
                type="button"
                onClick={() => setModalityFilter("all")}
                className={`px-2.5 py-1 rounded-xl border transition-all cursor-pointer active:scale-95 shadow-2xs ${
                  modalityFilter === "all"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs"
                    : "bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700"
                }`}
              >
                Toutes ({allUpcoming.length})
              </button>
              <button
                type="button"
                onClick={() => setModalityFilter("COURS")}
                className={`px-2.5 py-1 rounded-xl border transition-all cursor-pointer active:scale-95 shadow-2xs ${
                  modalityFilter === "COURS"
                    ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                    : "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30"
                }`}
              >
                Cours Bègles (
                {allUpcoming.filter((e) => e.type === "COURS").length})
              </button>
              <button
                type="button"
                onClick={() => setModalityFilter("WEBCONF")}
                className={`px-2.5 py-1 rounded-xl border transition-all cursor-pointer active:scale-95 shadow-2xs ${
                  modalityFilter === "WEBCONF"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                    : "bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border-indigo-500/30"
                }`}
              >
                Webconf. (
                {allUpcoming.filter((e) => e.type === "WEBCONF").length})
              </button>
              <button
                type="button"
                onClick={() => setModalityFilter("DISTANT")}
                className={`px-2.5 py-1 rounded-xl border transition-all cursor-pointer active:scale-95 shadow-2xs ${
                  modalityFilter === "DISTANT"
                    ? "bg-slate-700 text-white border-slate-700 shadow-xs"
                    : "bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700"
                }`}
              >
                Distantes (
                {allUpcoming.filter((e) => e.type === "DISTANT").length})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-96 overflow-y-auto pr-1">
            {filteredUpcoming.map((ev, idx) => {
              const isCours = ev.type === "COURS";
              const isVisio = ev.type === "WEBCONF";
              return (
                <div
                  key={`${ev.unit}-${ev.date}-${ev.start}-${idx}`}
                  className={`p-3.5 rounded-2xl border text-xs flex flex-col justify-between gap-1.5 backdrop-blur-md shadow-2xs transition-all ${
                    isCours
                      ? "bg-white/70 dark:bg-slate-800/60 hover:bg-white/90 border-amber-500/30"
                      : isVisio
                        ? "bg-indigo-500/5 hover:bg-indigo-500/10 border-indigo-500/25"
                        : "bg-slate-50/70 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200/80 dark:border-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-mono text-[10px] font-black uppercase">
                        {ev.unit}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                          isCours
                            ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30"
                            : isVisio
                              ? "bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border-indigo-500/30"
                              : "bg-slate-500/15 text-slate-800 dark:text-slate-300 border-slate-500/30"
                        }`}
                      >
                        {isCours
                          ? "Cours Bègles"
                          : isVisio
                            ? "Webconf."
                            : "Distant"}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-slate-600 dark:text-slate-300">
                      {ev.start}–{ev.end}
                    </span>
                  </div>

                  <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between gap-1">
                    <span>
                      {ev.day} {formatFrDate(ev.date)}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        downloadIcs([ev], `seance-${ev.unit}-${ev.date}.ics`);
                      }}
                      className="p-1 rounded hover:bg-amber-500/20 text-slate-400 hover:text-amber-700 transition-colors cursor-pointer"
                      title="Télécharger .ics pour cette séance"
                    >
                      <CalendarPlus className="size-3.5" />
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-500 truncate">
                    {isCours
                      ? `Cnam Bègles — ${ev.room ?? ""}`
                      : (ev.room ?? "ENF")}{" "}
                    · {ev.teacher}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

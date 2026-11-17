import { useState, useEffect } from "react";
import { Link } from "@/components/common/Link";
import {
  Calendar,
  CalendarPlus,
  Clock,
  Video,
  MapPin,
  User,
  Building2,
  BookOpen,
  NotebookPen,
  Check,
} from "lucide-react";
import {
  eventId,
  eventLocation,
  formatFrDate,
} from "@/lib/pst/planning-stats";
import type { PlanningEvent } from "@/lib/pst/data/planning";
import { downloadIcs } from "@/lib/pst/ics-export";
import { UNIT_TITLES, getEventImminence } from "./next-event-helpers";

interface SessionCardProps {
  event: PlanningEvent;
  categoryLabel: string;
  categoryType: "webconf" | "physical";
}

export function SessionCard({ event, categoryLabel, categoryType }: SessionCardProps) {
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

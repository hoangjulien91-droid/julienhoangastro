"use client";

import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  CalendarPlus,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Laptop,
  Sparkles,
  Video,
  X,
} from "lucide-react";
import { Link } from "@/components/common/Link";
import { UNIT_TITLES, type PlanningEvent } from "@/lib/pst/data/planning";
import {
  eventLocation,
  formatFrDate,
  getConflictSeverity,
} from "@/lib/pst/planning-stats";
import { buildGoogleCalendarUrl, downloadIcs } from "@/lib/pst/ics-export";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface SelectedSessionInfo {
  sessionIndex?: number | null;
  totalSessions?: number;
  readinessPct?: number;
  stats?: {
    pctFiches: number;
    pctCards: number;
  } | null;
}

interface UnitConcept {
  w: string;
  def: string;
}

interface PlanningEventInspectorProps {
  selectedEvent: PlanningEvent;
  selectedId: string;
  selectedSessionInfo: SelectedSessionInfo | null;
  unitConcepts: UnitConcept[];
  selectedConflicts: PlanningEvent[];
  selectedNote: string;
  selectedIsAttended: boolean;
  briefingCopied: boolean;
  onClose: () => void;
  onSelectEvent: (ev: PlanningEvent) => void;
  onCopyBriefing: () => void;
  onUpdateNote: (id: string, val: string) => void;
  onToggleAttended: (id: string) => void;
}

export function PlanningEventInspector({
  selectedEvent,
  selectedId,
  selectedSessionInfo,
  unitConcepts,
  selectedConflicts,
  selectedNote,
  selectedIsAttended,
  briefingCopied,
  onClose,
  onSelectEvent,
  onCopyBriefing,
  onUpdateNote,
  onToggleAttended,
}: PlanningEventInspectorProps) {
  return (
    <div
      id="planning-inspector"
      className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-amber-500/60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md space-y-3 sm:space-y-4 animate-fadeIn scroll-mt-20"
    >
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
                : selectedEvent.type === "EXAMEN"
                  ? `Examen Officiel (Session ${selectedEvent.session ?? 1})`
                  : "Activités distantes (ENF)"}
          </span>
          {selectedSessionInfo?.sessionIndex && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Séance {selectedSessionInfo.sessionIndex} /{" "}
              {selectedSessionInfo.totalSessions}
            </span>
          )}
          {selectedSessionInfo?.stats && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
              UE prête à {selectedSessionInfo.readinessPct}% (Fiches{" "}
              {selectedSessionInfo.stats.pctFiches}% · SM-2{" "}
              {selectedSessionInfo.stats.pctCards}%)
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer l'inspecteur de séance"
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
              {selectedEvent.cancelReason ??
                "Ce cours a été annulé et sera reprogrammé à une date ultérieure."}
            </p>
          </div>
        </div>
      )}

      {/* Grille d'Informations Pratiques */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
          <div className="font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold">
            Date &amp; Créneau
          </div>
          <div className="font-black text-slate-900 dark:text-slate-100 text-sm mt-0.5">
            {selectedEvent.day} {formatFrDate(selectedEvent.date)}
          </div>
          <div className="text-slate-500 font-mono mt-0.5">
            {selectedEvent.start} – {selectedEvent.end}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
          <div className="font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold">
            Lieu / Salle
          </div>
          <div className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5 truncate">
            {selectedEvent.room ??
              eventLocation(selectedEvent) ??
              "Espace Numérique"}
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
          <div className="font-mono text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold">
            Intervenant
          </div>
          <div className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5 truncate">
            {selectedEvent.teacher}
          </div>
          <div className="text-slate-500 mt-0.5">Équipe pédagogique CNAM</div>
        </div>
      </div>

      {/* Briefing de poche : 3 concepts clés */}
      {unitConcepts.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/25 space-y-2.5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="text-xs font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-amber-600 dark:text-amber-400" />
              <span>
                Programme de révision{" "}
                {selectedSessionInfo?.sessionIndex
                  ? `(Séance ${selectedSessionInfo.sessionIndex}/${selectedSessionInfo.totalSessions})`
                  : "de l'UE"}{" "}
                : 3 concepts ciblés
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link
                href={`/pst/${selectedEvent.unit.replace("pst", "")}/#fiches`}
                className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold flex items-center gap-1 transition-colors"
              >
                <BookOpen className="size-3" />
                <span>Fiches du cours →</span>
              </Link>
              <button
                type="button"
                onClick={onCopyBriefing}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-[11px] font-bold flex items-center gap-1.5 hover:bg-amber-500/10 cursor-pointer transition-colors"
                title="Copier la fiche de briefing avec notes et concepts"
              >
                <Copy className="size-3" />
                <span>
                  {briefingCopied ? "✓ Fiche copiée !" : "Copier le briefing"}
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {unitConcepts.map((concept, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-xs flex flex-col justify-between gap-1.5 shadow-2xs group hover:border-amber-500/40 transition-all"
              >
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 min-w-0">
                  <span className="size-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span className="truncate">{concept.w}</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug line-clamp-3 m-0">
                  {concept.def}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedEvent.type === "DISTANT" && (
        <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2.5">
          <Laptop className="size-4 text-slate-500 shrink-0" />
          <span>
            <b>Activité à distance asynchrone :</b> ce travail sur l&apos;ENF
            peut être réalisé en autonomie à tout moment avant la séance
            suivante, sans contrainte horaire stricte.
          </span>
        </div>
      )}

      {selectedConflicts.length > 0 &&
        (() => {
          const severity = getConflictSeverity(
            selectedEvent,
            selectedConflicts,
          );
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
                          {c.unit.toUpperCase()} ({c.start}–{c.end} ·{" "}
                          {c.type === "COURS" ? "Présentiel" : "Webconf"})
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
                onClick={() => onSelectEvent(selectedConflicts[0]!)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer text-white shadow-2xs transition-transform active:scale-95 ${
                  isPhysicalCritical
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                Inspecter {selectedConflicts[0]!.unit.toUpperCase()} →
              </button>
            </div>
          );
        })()}

      {/* Note personnelle & Barre d'actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2 border-t border-slate-200/70 dark:border-slate-800">
        <div className="flex-1 flex items-center gap-2">
          <FileText className="size-4 text-slate-400 shrink-0" />
          <input
            type="text"
            aria-label="Note personnelle sur cette séance"
            value={selectedNote}
            onChange={(e) => onUpdateNote(selectedId, e.target.value)}
            placeholder="Note personnelle sur cette séance (sauvegardée automatiquement)..."
            className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-2 sm:flex sm:items-center sm:flex-wrap gap-2 w-full sm:w-auto">
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
            aria-pressed={selectedIsAttended}
            onClick={() => onToggleAttended(selectedId)}
            className={`w-full sm:w-auto justify-center px-3 sm:px-3.5 py-2 sm:py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
              selectedIsAttended
                ? "bg-emerald-600 text-white shadow-2xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-emerald-500/15"
            }`}
          >
            <Check className="size-3.5" />
            <span>
              {selectedIsAttended ? "Réalisée ✓" : "Pointer assiduité"}
            </span>
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
            title="Exporter la séance au format calendrier (.ics)"
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
  );
}

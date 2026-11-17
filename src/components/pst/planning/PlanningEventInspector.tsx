"use client";

import {
  AlertTriangle,
  Laptop,
  X,
} from "lucide-react";
import { UNIT_TITLES, type PlanningEvent } from "@/lib/pst/data/planning";
import {
  eventLocation,
  formatFrDate,
} from "@/lib/pst/planning-stats";
import { InspectorConceptsBriefing } from "./inspector/InspectorConceptsBriefing";
import { InspectorConflictBanner } from "./inspector/InspectorConflictBanner";
import { InspectorActionBar } from "./inspector/InspectorActionBar";

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
      <InspectorConceptsBriefing
        unit={selectedEvent.unit}
        sessionIndex={selectedSessionInfo?.sessionIndex}
        totalSessions={selectedSessionInfo?.totalSessions}
        unitConcepts={unitConcepts}
        briefingCopied={briefingCopied}
        onCopyBriefing={onCopyBriefing}
      />

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

      {/* Conflits éventuels */}
      <InspectorConflictBanner
        selectedEvent={selectedEvent}
        selectedConflicts={selectedConflicts}
        onSelectEvent={onSelectEvent}
      />

      {/* Note personnelle & Barre d'actions */}
      <InspectorActionBar
        selectedEvent={selectedEvent}
        selectedId={selectedId}
        selectedNote={selectedNote}
        selectedIsAttended={selectedIsAttended}
        onUpdateNote={onUpdateNote}
        onToggleAttended={onToggleAttended}
      />
    </div>
  );
}

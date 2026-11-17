"use client";

import {
  ArrowRight,
  Calendar,
  CalendarPlus,
  Check,
  ExternalLink,
  FileText,
} from "lucide-react";
import { Link } from "@/components/common/Link";
import type { PlanningEvent } from "@/lib/pst/data/planning";
import { buildGoogleCalendarUrl, downloadIcs } from "@/lib/pst/ics-export";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface InspectorActionBarProps {
  selectedEvent: PlanningEvent;
  selectedId: string;
  selectedNote: string;
  selectedIsAttended: boolean;
  onUpdateNote: (id: string, val: string) => void;
  onToggleAttended: (id: string) => void;
}

export function InspectorActionBar({
  selectedEvent,
  selectedId,
  selectedNote,
  selectedIsAttended,
  onUpdateNote,
  onToggleAttended,
}: InspectorActionBarProps) {
  return (
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
  );
}

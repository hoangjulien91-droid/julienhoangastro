"use client";

import React, { useState } from "react";
import {
  CalendarPlus,
  Car,
  Check,
  X,
  Download,
  Info,
  Calendar,
  Sparkles,
} from "lucide-react";
import { type PlanningEvent } from "@/lib/pst/data/planning";
import { downloadIcs } from "@/lib/pst/ics-export";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";

interface IcsExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  filteredEvents: PlanningEvent[];
  totalEventsCount: number;
}

export function IcsExportModal({
  isOpen,
  onClose,
  filteredEvents,
  totalEventsCount,
}: IcsExportModalProps) {
  const [includeTravelSlots, setIncludeTravelSlots] = useState(true);

  if (!isOpen) return null;

  const coursCount = filteredEvents.filter((e) => e.type === "COURS").length;
  const visioCount = filteredEvents.filter((e) => e.type === "WEBCONF").length;
  const distantCount = filteredEvents.filter((e) => e.type === "DISTANT").length;

  function handleExport() {
    playSuccessSound();
    downloadIcs(filteredEvents, "planning-pst-cnam.ics", {
      includeTravelSlots,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-900 dark:text-amber-200 font-mono text-[10px] font-bold uppercase">
              <CalendarPlus className="size-3 text-amber-600" />
              <span>Export Calendrier .ics</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100">
              Exporter vers votre Agenda
            </h3>
            <p className="text-xs text-slate-500">
              Compatible avec Apple Calendar, Google Calendar, Outlook et Thunderbird.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Bilan du périmètre exporté */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 dark:text-slate-100">
              Périmètre exporté :
            </span>
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
              {filteredEvents.length} / {totalEventsCount} séances
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-600 dark:text-slate-400">
            <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono">
              🚗 {coursCount} cours présentiels
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono">
              🎥 {visioCount} webconférences
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono">
              💻 {distantCount} activités ENF
            </span>
          </div>
        </div>

        {/* Option Créneaux de route Covoiturage */}
        <div
          onClick={() => {
            playClickSound();
            setIncludeTravelSlots((prev) => !prev);
          }}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
            includeTravelSlots
              ? "border-amber-500 bg-amber-500/10 dark:bg-amber-500/15 shadow-2xs"
              : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 opacity-70"
          }`}
        >
          <div className="pt-0.5">
            <input
              type="checkbox"
              checked={includeTravelSlots}
              onChange={() => {}} // handled by parent onClick
              aria-label="Inclure les créneaux de route covoiturage"
              className="size-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer pointer-events-none"
            />
          </div>

          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 flex-wrap">
              <Car className="size-4 text-amber-600 shrink-0" />
              <span>Inclure les créneaux de route Covoiturage (2h15 avant/après les cours à Bègles)</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed m-0">
              Bloque automatiquement les temps de trajet A63 aller (Anglet ➔ Cnam Bègles, départ 2h15 avant le 1er cours) et retour (Bègles ➔ Anglet, retour estimé 2h15 après le dernier cours) pour réserver vos créneaux de conduite dans votre agenda.
            </p>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs cursor-pointer transition-colors"
          >
            Annuler
          </button>

          <button
            type="button"
            onClick={handleExport}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-xs"
          >
            <Download className="size-3.5" />
            <span>Télécharger le fichier .ics</span>
          </button>
        </div>
      </div>
    </div>
  );
}

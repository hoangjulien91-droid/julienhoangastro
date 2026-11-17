"use client";

import { AlertTriangle, Video } from "lucide-react";
import type { PlanningEvent } from "@/lib/pst/data/planning";
import { getConflictSeverity } from "@/lib/pst/planning-stats";

interface InspectorConflictBannerProps {
  selectedEvent: PlanningEvent;
  selectedConflicts: PlanningEvent[];
  onSelectEvent: (ev: PlanningEvent) => void;
}

export function InspectorConflictBanner({
  selectedEvent,
  selectedConflicts,
  onSelectEvent,
}: InspectorConflictBannerProps) {
  if (selectedConflicts.length === 0) return null;

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
}

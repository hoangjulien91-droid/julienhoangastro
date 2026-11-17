"use client";

import React from "react";
import { AlertTriangle, MapPin, User, Video } from "lucide-react";
import { UNIT_TITLES, type PlanningEvent } from "@/lib/pst/data/planning";
import {
  eventId,
  eventLocation,
  getConflictSeverity,
  getEventConflicts,
} from "@/lib/pst/planning-stats";

interface PlanningEventCardProps {
  ev: PlanningEvent;
  selectedId: string | null;
  attendedIds: Set<string>;
  sessionNotes: Record<string, string>;
  isDayPast: boolean;
  isDayToday: boolean;
  onSelectEvent: (ev: PlanningEvent) => void;
  onToggleAttended: (id: string) => void;
}

export function PlanningEventCard({
  ev,
  selectedId,
  attendedIds,
  sessionNotes,
  isDayPast,
  isDayToday,
  onSelectEvent,
  onToggleAttended,
}: PlanningEventCardProps) {
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
      onClick={() => onSelectEvent(ev)}
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
          <span className="truncate">
            {ev.room ?? eventLocation(ev) ?? "ENF"}
          </span>
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

      {conflicts.length > 0 &&
        (() => {
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
        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
          Inspecter →
        </span>
        <button
          type="button"
          aria-pressed={done}
          onClick={(e) => {
            e.stopPropagation();
            onToggleAttended(id);
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
}

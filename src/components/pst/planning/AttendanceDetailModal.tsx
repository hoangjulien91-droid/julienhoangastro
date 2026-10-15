"use client";

import React, { useMemo } from "react";
import {
  CheckCircle2,
  X,
  Clock,
  Sparkles,
  Zap,
  Building2,
  Video,
  Laptop,
  ArrowRight,
  Filter,
} from "lucide-react";
import {
  PLANNING_EVENTS,
  UNIT_ORDER,
  UNIT_TITLES,
  type PlanningEvent,
  type PlanningUnitId,
} from "@/lib/pst/data/planning";
import {
  eventId,
  getEventDurationHours,
} from "@/lib/pst/planning-stats";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface AttendanceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  attendedIds: Set<string>;
  autoAttendanceMode: boolean;
  onToggleAutoMode: () => void;
  onFilterUnit: (unit: PlanningUnitId) => void;
}

export function AttendanceDetailModal({
  isOpen,
  onClose,
  attendedIds,
  autoAttendanceMode,
  onToggleAutoMode,
  onFilterUnit,
}: AttendanceDetailModalProps) {
  if (!isOpen) return null;

  const totalPlannedHours = 159;

  // Breakdown per UE
  const ueStats = useMemo(() => {
    return UNIT_ORDER.map((unit) => {
      const unitEvents = PLANNING_EVENTS.filter((e) => e.unit === unit);
      const totalHours = unitEvents.reduce(
        (acc, e) => acc + getEventDurationHours(e),
        0,
      );

      const attendedEvents = unitEvents.filter((e) =>
        attendedIds.has(eventId(e)),
      );
      const attendedHours = attendedEvents.reduce(
        (acc, e) => acc + getEventDurationHours(e),
        0,
      );

      const pct = totalHours > 0 ? Math.round((attendedHours * 100) / totalHours) : 0;

      const cours = unitEvents.filter((e) => e.type === "COURS");
      const coursAttended = cours.filter((e) => attendedIds.has(eventId(e))).length;

      const visio = unitEvents.filter((e) => e.type === "WEBCONF");
      const visioAttended = visio.filter((e) => attendedIds.has(eventId(e))).length;

      const distant = unitEvents.filter((e) => e.type === "DISTANT");
      const distantAttended = distant.filter((e) => attendedIds.has(eventId(e))).length;

      return {
        unit,
        title: UNIT_TITLES[unit],
        totalHours,
        attendedHours,
        totalSessions: unitEvents.length,
        attendedSessions: attendedEvents.length,
        pct,
        coursTotal: cours.length,
        coursAttended,
        visioTotal: visio.length,
        visioAttended,
        distantTotal: distant.length,
        distantAttended,
      };
    });
  }, [attendedIds]);

  const globalCompletedHours = useMemo(() => {
    return PLANNING_EVENTS.filter((e) => attendedIds.has(eventId(e))).reduce(
      (acc, e) => acc + getEventDurationHours(e),
      0,
    );
  }, [attendedIds]);

  const globalPct = Math.round((globalCompletedHours * 100) / totalPlannedHours);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 font-mono text-[10px] font-bold uppercase">
              <CheckCircle2 className="size-3 text-emerald-600" />
              <span>Assiduité &amp; Suivi Pédagogique (159h)</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100">
              Répartition des 159h par Unité d&apos;Enseignement
            </h3>
            <p className="text-xs text-slate-500">
              Suivi officiel CNAM Nouvelle-Aquitaine · 5 UE · 69 séances programmées.
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

        {/* Bilan Global Apple Glassmorphism */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100">
                {globalCompletedHours}h réalisées sur {totalPlannedHours}h
              </div>
              <div className="text-xs text-emerald-900 dark:text-emerald-200 font-medium mt-0.5">
                {attendedIds.size} / {PLANNING_EVENTS.length} séances validées ({globalPct}% de complétion globale)
              </div>
            </div>

            {/* Switch Mode Auto (Temps réel) */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-emerald-500/30">
              <div className="text-right">
                <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 justify-end">
                  <Zap className="size-3 text-amber-500" />
                  <span>Mode Auto</span>
                </div>
                <div className="text-[9px] text-slate-500 font-mono">
                  {autoAttendanceMode ? "Temps réel ACTIF" : "Manuel uniquement"}
                </div>
              </div>
              <button
                type="button"
                onClick={onToggleAutoMode}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  autoAttendanceMode ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    autoAttendanceMode ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="w-full h-2.5 rounded-full bg-emerald-950/20 dark:bg-emerald-900/40 overflow-hidden">
            <div
              className="h-full bg-emerald-600 dark:bg-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${globalPct}%` }}
            />
          </div>
        </div>

        {/* Détail par UE */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider">
            Détail par Unité d&apos;Enseignement :
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {ueStats.map((stat) => (
              <div
                key={stat.unit}
                className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2.5 hover:border-emerald-500/40 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-mono text-[11px] font-black uppercase">
                        {stat.unit}
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {stat.title}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {stat.attendedHours}h / {stat.totalHours}h validées ({stat.attendedSessions} / {stat.totalSessions} séances)
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-emerald-700 dark:text-emerald-400">
                      {stat.pct}%
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        playClickSound();
                        onFilterUnit(stat.unit);
                        onClose();
                      }}
                      className="p-1 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-500/10 cursor-pointer transition-colors"
                      title={`Filtrer le planning sur l'UE ${stat.unit.toUpperCase()}`}
                    >
                      <Filter className="size-3.5" />
                    </button>
                  </div>
                </div>

                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 dark:bg-emerald-400 rounded-full transition-all duration-300"
                    style={{ width: `${stat.pct}%` }}
                  />
                </div>

                <div className="flex items-center gap-2 flex-wrap text-[10px] text-slate-600 dark:text-slate-400 pt-0.5">
                  <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1 font-mono">
                    <Building2 className="size-2.5 text-amber-600" />
                    <span>Présentiel : {stat.coursAttended}/{stat.coursTotal}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1 font-mono">
                    <Video className="size-2.5 text-indigo-600" />
                    <span>Webconf : {stat.visioAttended}/{stat.visioTotal}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-1 font-mono">
                    <Laptop className="size-2.5 text-slate-500" />
                    <span>Distant : {stat.distantAttended}/{stat.distantTotal}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
          <span className="text-slate-500 text-[11px]">
            Mode Auto actif : les séances dont l&apos;heure de fin est dépassée sont cochées en temps réel.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs cursor-pointer active:scale-95 transition-all shadow-xs shrink-0"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

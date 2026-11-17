import type { PlanningEvent } from "@/lib/pst/data/planning";
import type { CovoitMember } from "@/lib/pst/data/covoit-config";
import { timeToMinutes, minutesToHhmm } from "@/lib/pst/data/covoit-config";
import { formatFrDate, getEventConflicts } from "@/lib/pst/planning-stats";
import { MapPin, Clock, Copy, AlertTriangle } from "lucide-react";
import { CovoitDayDriverSelector } from "./covoit/CovoitDayDriverSelector";
import { CovoitDayCrewSelector } from "./covoit/CovoitDayCrewSelector";
import { CovoitDayEventsList } from "./covoit/CovoitDayEventsList";

export interface CovoitDayCardProps {
  date: string;
  dayEvents: PlanningEvent[];
  todayIso?: string | null;
  members: CovoitMember[];
  drivers: Record<string, string>;
  absences: Record<string, string[]>;
  driverCounts: Record<string, number>;
  copiedDate: string | null;
  chosenConflicts: Record<string, string>;
  attendedIds: Set<string>;
  onCopyWhatsApp: (
    date: string,
    dayEvents: PlanningEvent[],
    driver: CovoitMember | null,
    presentMembers: CovoitMember[],
    depTime: string,
    retTime: string,
  ) => void;
  onSetDriver: (date: string, driverId: string) => void;
  onToggleAbsence: (date: string, memberId: string) => void;
  onSetConflictArbitration: (date: string, chosenUnitOrId: string) => void;
  onSelectEvent: (e: PlanningEvent) => void;
  onToggleAttended: (id: string) => void;
}

export function CovoitDayCard({
  date,
  dayEvents,
  todayIso,
  members,
  drivers,
  absences,
  driverCounts,
  copiedDate,
  chosenConflicts,
  attendedIds,
  onCopyWhatsApp,
  onSetDriver,
  onToggleAbsence,
  onSetConflictArbitration,
  onSelectEvent,
  onToggleAttended,
}: CovoitDayCardProps) {
  const first = dayEvents[0]!;
  const last = dayEvents[dayEvents.length - 1]!;
  const isCluster = dayEvents.some((e) => e.cluster);
  const isFullday = dayEvents.some((e) => e.fullday);
  const isDayPast = Boolean(todayIso && date < todayIso);
  const isDayToday = Boolean(todayIso && date === todayIso);

  // Calculate departure from Anglet BAB: 2h15 before first course start
  const firstStartMin = timeToMinutes(first.start);
  const depTime = minutesToHhmm(firstStartMin - 135);

  // Calculate return to Anglet: 2h15 after last course end
  const lastEndMin = timeToMinutes(last.end);
  const retTime = minutesToHhmm(lastEndMin + 135);

  // Units taught on this day
  const dayUnits = new Set(dayEvents.map((e) => e.unit));

  // Members enrolled in at least one UE of this day
  const enrolledMembers = members.filter((m) =>
    m.units.some((u) => dayUnits.has(u)),
  );

  // Present members for this day (enrolled minus day absences)
  const dayAbsenceList = absences[date] ?? [];
  const presentMembers = enrolledMembers.filter(
    (m) => !dayAbsenceList.includes(m.id),
  );

  // Current designated driver
  const currentDriverId = drivers[date];
  const currentDriver = members.find((m) => m.id === currentDriverId) ?? null;

  // Local suggestion for driver based on minimum trips among present members
  let daySuggestedDriver: CovoitMember | null = null;
  if (presentMembers.length > 0) {
    let min = Infinity;
    for (const m of presentMembers) {
      const count = driverCounts[m.id] ?? 0;
      if (count < min) {
        min = count;
        daySuggestedDriver = m;
      }
    }
  }

  const hasSameTimeOverlap =
    dayEvents.length > 1 &&
    dayEvents.some((e) =>
      getEventConflicts(e).some((c) => c.type === "COURS"),
    );

  const isAllCancelled = dayEvents.every((e) => e.cancelled);

  return (
    <div
      className={`p-4 sm:p-5 rounded-3xl border transition-all ${
        isAllCancelled
          ? "border-rose-500/40 bg-rose-500/5 dark:bg-rose-500/10"
          : isDayPast
            ? "opacity-55 hover:opacity-100 bg-slate-100/40 dark:bg-slate-900/40 border-dashed border-slate-300 dark:border-slate-800"
            : isDayToday
              ? "border-emerald-500/60 ring-2 ring-emerald-500/15 bg-white/95 dark:bg-slate-900/95"
              : "border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90"
      } backdrop-blur-xl shadow-xs flex flex-col justify-between gap-4`}
    >
      {/* Header de la journée */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/70 dark:border-slate-800 pb-3">
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-sm uppercase font-black text-amber-700 dark:text-amber-400">
              {first.day} {formatFrDate(date)}
            </span>
            {isDayToday && !isAllCancelled && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-mono text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                <span className="size-1.5 rounded-full bg-white animate-pulse" />
                Aujourd&apos;hui
              </span>
            )}
            {isDayPast && !isAllCancelled && (
              <span className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-[9px] font-bold">
                ✓ Trajet passé
              </span>
            )}
            {isAllCancelled ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/30">
                🚫 Séance annulée (report à fixer)
              </span>
            ) : (
              <>
                {isCluster && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    Cluster 2j
                  </span>
                )}
                {isFullday && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Journée complète
                  </span>
                )}
              </>
            )}
          </div>
          <div className="text-xs text-slate-500">
            Amplitude Cnam Bègles :{" "}
            <b>
              {first.start} – {last.end}
            </b>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onCopyWhatsApp(
              date,
              dayEvents,
              currentDriver,
              presentMembers,
              depTime,
              retTime,
            )
          }
          className="w-full sm:w-auto justify-center px-3.5 py-2 sm:py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs shrink-0"
          title="Copier le récapitulatif pour le groupe WhatsApp"
        >
          <Copy className="size-3.5" />
          <span>
            {copiedDate === date ? "✓ Copié !" : "📋 Copier WhatsApp"}
          </span>
        </button>
      </div>

      {isAllCancelled && (
        <div className="p-3.5 rounded-2xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/30 text-xs text-rose-950 dark:text-rose-100 flex items-start gap-2.5">
          <AlertTriangle className="size-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <div className="font-bold">
              Déplacement annulé le {first.day} {formatFrDate(date)} :
            </div>
            <p className="text-[11px] opacity-90 m-0">
              Le cours prévu ({dayEvents.map((e) => e.unit.toUpperCase()).join(", ")}) a été annulé et sera reporté ultérieurement (date de report en attente de programmation). Le covoiturage A63 est donc suspendu pour cette date.
            </p>
          </div>
        </div>
      )}

      {/* HORAIRES & POINT DE RDV ANGLET / BAB */}
      <div className="p-3 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-amber-600 shrink-0" />
          <div>
            <div className="font-bold text-slate-900 dark:text-slate-100">
              📍 Départ Covoit&apos; Anglet : {depTime}
            </div>
            <div className="text-[11px] text-slate-500">
              Parking Relais BAB (2h15 avant le 1er cours)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="size-4 text-slate-400 shrink-0" />
          <div>
            <div className="font-bold text-slate-900 dark:text-slate-100">
              🏁 Retour estimé Anglet : ~{retTime}
            </div>
            <div className="text-[11px] text-slate-500">
              190 km • ~2h05 via A63
            </div>
          </div>
        </div>
      </div>

      {/* SÉLECTEUR DU CONDUCTEUR DU JOUR */}
      <CovoitDayDriverSelector
        date={date}
        members={members}
        presentMembers={presentMembers}
        currentDriver={currentDriver}
        currentDriverId={currentDriverId}
        daySuggestedDriver={daySuggestedDriver}
        onSetDriver={onSetDriver}
      />

      {/* PARTICIPANT(S) / ÉQUIPAGE */}
      <CovoitDayCrewSelector
        date={date}
        members={members}
        enrolledMembers={enrolledMembers}
        presentMembers={presentMembers}
        dayAbsenceList={dayAbsenceList}
        onToggleAbsence={onToggleAbsence}
      />

      {/* ARBITRAGE & SÉANCES */}
      <CovoitDayEventsList
        date={date}
        dayEvents={dayEvents}
        hasSameTimeOverlap={hasSameTimeOverlap}
        chosenConflicts={chosenConflicts}
        attendedIds={attendedIds}
        onSetConflictArbitration={onSetConflictArbitration}
        onSelectEvent={onSelectEvent}
        onToggleAttended={onToggleAttended}
      />
    </div>
  );
}

import type { PlanningEvent } from "@/lib/pst/data/planning";
import type { CovoitMember } from "@/lib/pst/data/covoit-config";
import { timeToMinutes, minutesToHhmm } from "@/lib/pst/data/covoit-config";
import {
  eventId,
  formatFrDate,
  getEventConflicts,
} from "@/lib/pst/planning-stats";
import {
  MapPin,
  Clock,
  Car,
  Users,
  Check,
  Sparkles,
  Copy,
  AlertTriangle,
} from "lucide-react";

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

      {/* SÉLECTEUR DU CONDUCTEUR DU JOUR (1 SEULE VOITURE) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <Car className="size-3.5 text-amber-600" />
            <span>🚗 Conducteur du jour :</span>
          </span>
          {currentDriver ? (
            <span className="font-mono text-[11px] font-black text-amber-700 dark:text-amber-400">
              Volant : {currentDriver.name}
            </span>
          ) : daySuggestedDriver ? (
            <button
              type="button"
              onClick={() => onSetDriver(date, daySuggestedDriver.id)}
              className="text-[10px] text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
              title="Attribuer automatiquement au membre ayant le moins conduit"
            >
              <Sparkles className="size-3" />
              <span>Suggéré par équité : {daySuggestedDriver.name}</span>
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {presentMembers.map((m) => {
            const isDriver = currentDriverId === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onSetDriver(date, m.id)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 ${
                  isDriver
                    ? "bg-amber-600 text-white shadow-xs ring-2 ring-amber-500/30"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                }`}
              >
                <Car className="size-3" />
                <span>{m.name}</span>
                {isDriver && <Check className="size-3" />}
              </button>
            );
          })}

          {/* Bouton rapide "Je prends ma voiture" si Julien présent non conducteur */}
          {members.length > 1 &&
            presentMembers.some((m) => m.id === "julien") &&
            currentDriverId !== "julien" && (
              <button
                type="button"
                onClick={() => onSetDriver(date, "julien")}
                className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 cursor-pointer transition-colors"
              >
                🙋‍♂️ Je prends ma voiture
              </button>
            )}
        </div>
      </div>

      {/* PARTICIPANT(S) / ÉQUIPAGE */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Users className="size-3.5 text-slate-400" />
            <span>
              {members.length > 1
                ? `Équipage prévu (${presentMembers.length}/5) :`
                : "Participant :"}
            </span>
          </span>
          {presentMembers.length > 5 ? (
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
              ⚠️ {presentMembers.length}/5 inscrits (décocher les absents pour 1 seule voiture)
            </span>
          ) : members.length > 1 ? (
            <span className="text-[10px] text-slate-400">
              Cliquer pour marquer un collègue absent
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {enrolledMembers.map((m) => {
            const isAbsent = dayAbsenceList.includes(m.id);
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => members.length > 1 && onToggleAbsence(date, m.id)}
                className={`px-3 py-1.5 sm:px-2.5 sm:py-1 rounded-xl text-xs sm:text-[11px] font-bold border transition-all flex items-center gap-1 ${
                  isAbsent
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 line-through opacity-60 cursor-pointer"
                    : "bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
                } ${members.length > 1 ? "cursor-pointer active:scale-95" : "cursor-default"}`}
              >
                {!isAbsent && <Check className="size-3 text-emerald-600" />}
                <span>{m.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ARBITRAGE SI 2 COURS EN PARALLÈLE DANS 2 SALLES */}
      {hasSameTimeOverlap && (
        <div className="p-3 rounded-2xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/30 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-rose-950 dark:text-rose-200">
            <span className="flex items-center gap-1">
              <AlertTriangle className="size-3 text-rose-600" />
              <span>Conflit 2 salles simultanées : arbitrage requis</span>
            </span>
            <span className="text-[10px] font-mono opacity-80">1 seule salle possible</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {dayEvents.map((ev) => {
              const isChosen = chosenConflicts[date] === ev.unit;
              return (
                <button
                  key={ev.unit}
                  type="button"
                  onClick={() => onSetConflictArbitration(date, ev.unit)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 shadow-2xs ${
                    isChosen
                      ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                      : "bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-300/80 dark:border-slate-700 hover:border-rose-500"
                  }`}
                >
                  <span>{isChosen ? "✓ Présent en" : "Choisir"}</span>
                  <span className="font-mono uppercase">{ev.unit}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* LISTE DES SÉANCES DU JOUR */}
      <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
        {dayEvents.map((ev) => {
          const id = eventId(ev);
          const done = attendedIds.has(id);
          const chosenForDate = chosenConflicts[date];
          const isSacrificed = Boolean(chosenForDate && chosenForDate !== ev.unit);

          return (
            <div
              key={id}
              onClick={() => onSelectEvent(ev)}
              className={`p-3 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-all text-xs ${
                isSacrificed
                  ? "opacity-50 bg-slate-100/50 dark:bg-slate-900/50 border-dashed border-slate-300 dark:border-slate-800"
                  : "bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-500/10 border-slate-200/60 dark:border-slate-800"
              }`}
            >
              <div>
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 flex-wrap">
                  <span className="px-1.5 py-0.5 rounded bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-mono text-[10px]">
                    {ev.unit.toUpperCase()}
                  </span>
                  <span>
                    {ev.start}–{ev.end}
                  </span>
                  <span className="text-amber-700 dark:text-amber-400">
                    · {ev.room}
                  </span>
                  {ev.cancelled && (
                    <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-800 dark:text-rose-300 text-[10px] font-bold">
                      Annulé (report à fixer)
                    </span>
                  )}
                  {isSacrificed && (
                    <span className="text-[10px] text-slate-400 font-normal">
                      (À rattraper en replay)
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {ev.teacher}
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleAttended(id);
                }}
                className={`px-3 py-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs sm:text-[10px] font-bold border cursor-pointer shrink-0 transition-colors ${
                  done
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "border-slate-300 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {done ? "✓ Fait" : "Pointer"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

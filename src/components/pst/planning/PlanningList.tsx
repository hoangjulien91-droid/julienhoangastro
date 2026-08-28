import { useEffect, useRef } from "react";
import { PLANNING_EVENTS, type PlanningEvent } from "@/lib/pst/data/planning";
import {
  eventLocation,
  formatFrDate,
  matchesFilters,
  type PlanningFilters,
} from "@/lib/pst/planning-stats";

function noteFor(e: PlanningEvent): { text: string; fullday: boolean }[] {
  const notes: { text: string; fullday: boolean }[] = [];
  if (e.cluster)
    notes.push({
      text: "Jour consécutif à un autre — 1 seul trajet depuis Anglet possible avec une nuitée sur place",
      fullday: false,
    });
  if (e.fullday)
    notes.push({
      text: "Journée complète sur place — pas d'hébergement nécessaire",
      fullday: true,
    });
  return notes;
}

function sessionLabel(e: PlanningEvent): string | null {
  if (e.session === 1) return "Session 1 (normale)";
  if (e.session === 2) return "Session 2 (rattrapage)";
  return null;
}

interface PlanningListProps {
  filters: PlanningFilters;
  /** ISO "YYYY-MM-DD" du jour, résolu côté client (cf. PlanningContent) —
   * null tant que l'hydratation n'a pas eu lieu, pour éviter tout mismatch
   * SSR. Sert à estomper les séances passées et à repérer/scroller vers la
   * prochaine séance à venir (équivalent liste du surlignage "semaine en
   * cours" de la vue frise, qui autrement n'a aucun repère sur mobile — la
   * seule vue que les mobiles voient jamais). */
  todayIso: string | null;
}

export function PlanningList({ filters, todayIso }: PlanningListProps) {
  const events = PLANNING_EVENTS.filter((e) => matchesFilters(e, filters)).sort(
    (a, b) => (a.date + a.start).localeCompare(b.date + b.start),
  );

  const nextEventIndex = todayIso
    ? events.findIndex((e) => e.date >= todayIso)
    : -1;
  const nextItemRef = useRef<HTMLLIElement>(null);
  const hasScrolledRef = useRef(false);

  // Scroll une seule fois, au premier calcul valide (hydratation) — pas à
  // chaque changement de filtre, qui ferait sinon sauter la vue à chaque
  // coche/décoche d'un filtre.
  useEffect(() => {
    if (hasScrolledRef.current || nextEventIndex === -1) return;
    hasScrolledRef.current = true;
    nextItemRef.current?.scrollIntoView({ block: "center" });
  }, [nextEventIndex]);

  if (events.length === 0) {
    return (
      <div className="note">
        Aucune séance ne correspond aux filtres sélectionnés.
      </div>
    );
  }

  return (
    <ul className="list-events">
      {events.map((e, i) => {
        const typeClass =
          e.type === "COURS"
            ? "t-cours"
            : e.type === "EXAMEN"
              ? e.session === 2
                ? "t-rattrap"
                : "t-examen"
              : "t-visio";
        const notes = noteFor(e);
        const session = sessionLabel(e);
        const isPast = todayIso !== null && e.date < todayIso;
        const isNext = i === nextEventIndex;
        return (
          <li
            key={i}
            ref={isNext ? nextItemRef : undefined}
            className={[
              "list-item",
              typeClass,
              e.cluster ? "cluster" : "",
              e.fullday ? "fullday" : "",
              e.tbd ? "tbd" : "",
              isPast ? "past" : "",
              isNext ? "next-event" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="li-date">
              <span className="li-day">{e.day}</span>
              <span className="li-num">{formatFrDate(e.date)}</span>
            </div>
            <div className="li-body">
              <div className="li-top">
                {isNext && (
                  <span className="li-next-badge">📍 Prochaine séance</span>
                )}
                <span className="li-ue">{e.unit.toUpperCase()}</span>
                <span className="li-time">
                  {e.start}–{e.end}
                </span>
                {e.tbd && (
                  <span>
                    {" "}
                    ·{" "}
                    <b>
                      {e.tbdDay === "lundi" ? "Lundi" : "Mardi"} (à confirmer)
                    </b>
                  </span>
                )}
                {session && (
                  <span> · {e.session === 2 ? <b>{session}</b> : session}</span>
                )}
              </div>
              <div className="li-detail">
                {e.teacher}
                {eventLocation(e) ? ` · ${eventLocation(e)}` : ""}
                {e.room ? ` — ${e.room}` : ""}
              </div>
              {notes.map((n, ni) => (
                <div
                  className={`li-note${n.fullday ? " li-fullday" : ""}`}
                  key={ni}
                >
                  {n.text}
                </div>
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

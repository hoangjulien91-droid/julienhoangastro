"use client";

import { useState, useMemo } from "react";
import { Link } from "@/components/common/Link";
import {
  Calendar,
  CalendarPlus,
  Clock,
  Video,
  MapPin,
  ArrowRight,
  User,
  ChevronDown,
  ChevronUp,
  ListFilter,
  Building2,
  Sparkles,
} from "lucide-react";
import {
  eventLocation,
  formatFrDate,
  getNextEvent,
  getNextWebconfEvent,
  getNextPhysicalEvent,
  getAllUpcomingEvents,
} from "@/lib/pst/planning-stats";
import type { PlanningEvent } from "@/lib/pst/data/planning";
import { downloadIcs } from "@/lib/pst/ics-export";

const UNIT_TITLES: Record<string, string> = {
  pst106: "Clinique de l'activité et psychologie du travail",
  pst108: "Psychologie du langage et clinique du dialogue",
  pst120: "Psychodynamique et psychopathologie du travail",
  pst123: "Le psychologue, le travail et l'emploi",
  pst124: "Transformations digitales des activités et clinique des usages",
};

interface SessionCardProps {
  event: PlanningEvent;
  categoryLabel: string;
  categoryType: "webconf" | "physical";
}

function SessionCard({ event, categoryLabel, categoryType }: SessionCardProps) {
  const isWebconf = categoryType === "webconf";
  const location = eventLocation(event);
  const placeLabel = location
    ? event.room
      ? `${location} — ${event.room}`
      : location
    : event.room
      ? `ENF — ${event.room}`
      : "Espace Numérique de Formation (Visio)";

  const unitTitle = UNIT_TITLES[event.unit] || "";

  return (
    <div
      className={`relative flex flex-col justify-between p-4.5 sm:p-5 rounded-2xl border transition-all ${
        isWebconf
          ? "bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200/80 dark:border-indigo-900/50 hover:border-indigo-400 shadow-2xs"
          : "bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-900/50 hover:border-amber-400 shadow-2xs"
      }`}
    >
      <div className="space-y-3">
        {/* En-tête : Badges & Horaires */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wide border ${
                isWebconf
                  ? "bg-indigo-500/15 text-indigo-900 dark:text-indigo-200 border-indigo-500/30"
                  : "bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-500/30"
              }`}
            >
              {isWebconf ? (
                <Video className="size-3.5" />
              ) : (
                <Building2 className="size-3.5" />
              )}
              <span>{categoryLabel}</span>
            </span>

            <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-mono text-xs font-black uppercase">
              {event.unit}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
            <Clock className="size-3.5 text-slate-400 shrink-0" />
            <span>
              {event.start}–{event.end}
            </span>
          </div>
        </div>

        {/* Date principale */}
        <div className="flex items-center gap-2 pt-0.5">
          <Calendar
            className={`size-4.5 shrink-0 ${
              isWebconf
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-amber-600 dark:text-amber-400"
            }`}
          />
          <div className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
            {event.day} {formatFrDate(event.date)}
          </div>
        </div>

        {/* Titre du cours & Enseignant */}
        <div className="space-y-1">
          {unitTitle && (
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 leading-snug">
              {unitTitle}
            </div>
          )}

          {event.teacher && (
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-0.5">
              <User className="size-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{event.teacher}</span>
            </div>
          )}
        </div>

        {/* Salle / Espace */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800 text-xs">
          <MapPin
            className={`size-3.5 shrink-0 ${
              isWebconf
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-amber-600 dark:text-amber-400"
            }`}
          />
          <span
            className="font-medium text-slate-800 dark:text-slate-200 truncate"
            title={placeLabel}
          >
            {placeLabel}
          </span>
        </div>
      </div>

      {/* Action Ajouter à l'agenda */}
      <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/80">
        <button
          type="button"
          onClick={() =>
            downloadIcs([event], `seance-${event.unit}-${event.date}.ics`)
          }
          className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
            isWebconf
              ? "bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white shadow-2xs hover:shadow-xs"
              : "bg-amber-600 hover:bg-amber-700 active:scale-98 text-white shadow-2xs hover:shadow-xs"
          }`}
          title="Ajouter cette séance à ton agenda (.ics)"
        >
          <CalendarPlus className="size-3.5" />
          <span>Ajouter à l&apos;agenda (.ics)</span>
        </button>
      </div>
    </div>
  );
}

export function NextEventCard() {
  const allUpcoming = useMemo(() => getAllUpcomingEvents(), []);
  const nextWebconf = useMemo(() => getNextWebconfEvent(), []);
  const nextPhysical = useMemo(() => getNextPhysicalEvent(), []);
  const fallbackNext = useMemo(() => getNextEvent(), []);

  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [modalityFilter, setModalityFilter] = useState<
    "all" | "COURS" | "WEBCONF" | "DISTANT"
  >("all");

  if (!nextWebconf && !nextPhysical && !fallbackNext) return null;

  const filteredUpcoming = useMemo(() => {
    if (modalityFilter === "all") return allUpcoming;
    return allUpcoming.filter((e) => e.type === modalityFilter);
  }, [allUpcoming, modalityFilter]);

  const primaryEventsToExport = useMemo(() => {
    const list: PlanningEvent[] = [];
    if (nextWebconf) list.push(nextWebconf);
    if (nextPhysical && nextPhysical !== nextWebconf) list.push(nextPhysical);
    return list.length > 0 ? list : fallbackNext ? [fallbackNext] : [];
  }, [nextWebconf, nextPhysical, fallbackNext]);

  return (
    <div className="card bg-gradient-to-br from-white via-slate-50/50 to-amber-500/5 dark:from-slate-900 dark:via-slate-900/90 dark:to-amber-500/10 border border-amber-500/25 p-5 sm:p-6 rounded-2xl mb-6 shadow-sm relative overflow-hidden transition-all">
      {/* En-tête : Signal & Actions Générales */}
      <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="relative flex size-2.5">
            <span className="animate-ping absolute inline-flex rounded-full bg-amber-400 opacity-75 size-full" />
            <span className="relative inline-flex rounded-full size-2.5 bg-amber-500" />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
            <Sparkles className="size-3 text-amber-600 dark:text-amber-400" />
            <span>Prochaines séances à venir</span>
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {primaryEventsToExport.length > 0 && (
            <button
              type="button"
              onClick={() =>
                downloadIcs(
                  primaryEventsToExport,
                  "prochaines-seances-pst.ics",
                )
              }
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Ajouter les prochaines séances (webconf & physique) à votre agenda (.ics)"
            >
              <CalendarPlus className="size-3.5 text-amber-600 dark:text-amber-400" />
              <span>
                {primaryEventsToExport.length > 1
                  ? "Ajouter les 2 séances (.ics)"
                  : "Ajouter à l'agenda (.ics)"}
              </span>
            </button>
          )}

          <Link
            href="/pst/planning/"
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <Calendar className="size-3.5" />
            <span>Voir le planning complet (69 séances)</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* DOUBLE CARTE : Prochaine Webconférence & Prochaine Session Physique */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {nextWebconf ? (
          <SessionCard
            event={nextWebconf}
            categoryLabel="Prochaine Web-conférence (Visio)"
            categoryType="webconf"
          />
        ) : fallbackNext ? (
          <SessionCard
            event={fallbackNext}
            categoryLabel="Prochaine Séance"
            categoryType={fallbackNext.type === "COURS" ? "physical" : "webconf"}
          />
        ) : null}

        {nextPhysical ? (
          <SessionCard
            event={nextPhysical}
            categoryLabel="Prochaine Session Présentielle (Bègles)"
            categoryType="physical"
          />
        ) : null}
      </div>

      {/* Barre de contrôle : Afficher / Masquer toutes les séances suivantes */}
      <div className="mt-4 pt-3.5 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
        <button
          type="button"
          onClick={() => setShowAllUpcoming((s) => !s)}
          className="px-3.5 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-xs active:scale-98"
        >
          <Calendar className="size-3.5 text-amber-500" />
          <span>
            {showAllUpcoming
              ? "Masquer les séances suivantes"
              : `Afficher les séances suivantes (${allUpcoming.length} au programme)`}
          </span>
          {showAllUpcoming ? (
            <ChevronUp className="size-3.5" />
          ) : (
            <ChevronDown className="size-3.5" />
          )}
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span>Programme officiel CNAM 2026/2027</span>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <Link
            href="/pst/planning/"
            className="text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>Frise complète</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>

      {/* TIROIR DÉROULANT DES SÉANCES SUIVANTES */}
      {showAllUpcoming && (
        <div className="mt-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5 animate-fadeIn">
          <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-slate-200/70 dark:border-slate-800">
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ListFilter className="size-3.5 text-amber-600" />
              <span>
                Programme prévisionnel des {filteredUpcoming.length} séances à venir
              </span>
            </div>

            {/* Filtres de modalité */}
            <div className="flex items-center gap-1 text-[11px] font-semibold flex-wrap">
              <button
                type="button"
                onClick={() => setModalityFilter("all")}
                className={`px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                  modalityFilter === "all"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-2xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                }`}
              >
                Toutes ({allUpcoming.length})
              </button>
              <button
                type="button"
                onClick={() => setModalityFilter("COURS")}
                className={`px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                  modalityFilter === "COURS"
                    ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
                    : "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30"
                }`}
              >
                Cours Bègles (
                {allUpcoming.filter((e) => e.type === "COURS").length})
              </button>
              <button
                type="button"
                onClick={() => setModalityFilter("WEBCONF")}
                className={`px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                  modalityFilter === "WEBCONF"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                    : "bg-indigo-500/10 text-indigo-800 dark:text-indigo-300 border-indigo-500/30"
                }`}
              >
                Webconf. (
                {allUpcoming.filter((e) => e.type === "WEBCONF").length})
              </button>
              <button
                type="button"
                onClick={() => setModalityFilter("DISTANT")}
                className={`px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                  modalityFilter === "DISTANT"
                    ? "bg-slate-700 text-white border-slate-700 shadow-2xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                }`}
              >
                Distantes (
                {allUpcoming.filter((e) => e.type === "DISTANT").length})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-96 overflow-y-auto pr-1">
            {filteredUpcoming.map((ev, idx) => {
              const isCours = ev.type === "COURS";
              const isVisio = ev.type === "WEBCONF";
              return (
                <div
                  key={`${ev.unit}-${ev.date}-${ev.start}-${idx}`}
                  className={`p-3 rounded-xl border text-xs flex flex-col justify-between gap-1.5 transition-all ${
                    isCours
                      ? "bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/25"
                      : isVisio
                        ? "bg-indigo-500/5 hover:bg-indigo-500/10 border-indigo-500/25"
                        : "bg-slate-50/70 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200/80 dark:border-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-mono text-[10px] font-black uppercase">
                        {ev.unit}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                          isCours
                            ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30"
                            : isVisio
                              ? "bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border-indigo-500/30"
                              : "bg-slate-500/15 text-slate-800 dark:text-slate-300 border-slate-500/30"
                        }`}
                      >
                        {isCours
                          ? "Cours Bègles"
                          : isVisio
                            ? "Webconf."
                            : "Distant"}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-slate-600 dark:text-slate-300">
                      {ev.start}–{ev.end}
                    </span>
                  </div>

                  <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between gap-1">
                    <span>
                      {ev.day} {formatFrDate(ev.date)}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        downloadIcs([ev], `seance-${ev.unit}-${ev.date}.ics`);
                      }}
                      className="p-1 rounded hover:bg-amber-500/20 text-slate-400 hover:text-amber-700 transition-colors cursor-pointer"
                      title="Télécharger .ics pour cette séance"
                    >
                      <CalendarPlus className="size-3.5" />
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-500 truncate">
                    {isCours
                      ? `Cnam Bègles — ${ev.room ?? ""}`
                      : ev.room ?? "ENF"}{" "}
                    · {ev.teacher}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

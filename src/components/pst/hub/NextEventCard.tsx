"use client";

import { useState, useMemo } from "react";
import { Link } from "@/components/common/Link";
import {
  Calendar,
  CalendarPlus,
  Video,
  MapPin,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import {
  getNextEvent,
  getNextWebconfEvent,
  getNextPhysicalEvent,
  getAllUpcomingEvents,
} from "@/lib/pst/planning-stats";
import type { PlanningEvent } from "@/lib/pst/data/planning";
import { downloadIcs } from "@/lib/pst/ics-export";
import { SessionCard } from "./next-event/SessionCard";
import { UpcomingEventsDrawer } from "./next-event/UpcomingEventsDrawer";

export function NextEventCard() {
  const allUpcoming = useMemo(() => getAllUpcomingEvents(), []);
  const nextWebconf = useMemo(() => getNextWebconfEvent(), []);
  const nextPhysical = useMemo(() => getNextPhysicalEvent(), []);
  const fallbackNext = useMemo(() => getNextEvent(), []);

  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [modalityFilter, setModalityFilter] = useState<
    "all" | "COURS" | "WEBCONF" | "DISTANT"
  >("all");
  const [mobileTab, setMobileTab] = useState<"webconf" | "physical">("webconf");

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
    <div className="card bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 rounded-3xl mb-6 shadow-xs relative overflow-hidden transition-all">
      {/* En-tête : Signal & Actions Générales */}
      <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Prochaines séances à venir</span>
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0">
          {primaryEventsToExport.length > 0 && (
            <button
              type="button"
              onClick={() =>
                downloadIcs(primaryEventsToExport, "prochaines-seances-pst.ics")
              }
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 whitespace-nowrap"
              title="Ajouter les prochaines séances (webconf & physique) à votre agenda (.ics)"
            >
              <CalendarPlus className="size-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Exporter (.ics)</span>
            </button>
          )}

          <Link
            href="/pst/planning/"
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap"
          >
            <Calendar className="size-3.5 shrink-0" />
            <span>Planning</span>
            <ArrowRight className="size-3.5 shrink-0" />
          </Link>
        </div>
      </div>

      {/* SÉLECTEUR MOBILE APPLE : Toggle Visio / Présentiel (sur mobile uniquement < 768px) */}
      {nextWebconf && nextPhysical && (
        <div className="flex md:hidden mb-3 p-1 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80">
          <button
            type="button"
            onClick={() => setMobileTab("webconf")}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
              mobileTab === "webconf"
                ? "bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-2xs font-extrabold"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <Video className="size-3.5 text-indigo-500" />
            <span>Visio (Webconf)</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("physical")}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
              mobileTab === "physical"
                ? "bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-300 shadow-2xs font-extrabold"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            <MapPin className="size-3.5 text-amber-500" />
            <span>Présentiel Bègles</span>
          </button>
        </div>
      )}

      {/* CARTES SÉANCES : Deux colonnes côte-à-côte dès 768px (tablettes & desktop), ou onglet sur mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {/* Webconférence */}
        {nextWebconf ? (
          <div
            className={`h-full ${mobileTab === "physical" ? "max-md:hidden" : ""}`}
          >
            <SessionCard
              event={nextWebconf}
              categoryLabel="Web-conférence (Visio)"
              categoryType="webconf"
            />
          </div>
        ) : fallbackNext ? (
          <div className="h-full">
            <SessionCard
              event={fallbackNext}
              categoryLabel="Prochaine Séance"
              categoryType={
                fallbackNext.type === "COURS" ? "physical" : "webconf"
              }
            />
          </div>
        ) : null}

        {/* Présentiel */}
        {nextPhysical ? (
          <div
            className={`h-full ${mobileTab === "webconf" ? "max-md:hidden" : ""}`}
          >
            <SessionCard
              event={nextPhysical}
              categoryLabel="Session Présentielle (Bègles)"
              categoryType="physical"
            />
          </div>
        ) : null}
      </div>

      {/* Barre de contrôle : Afficher / Masquer toutes les séances suivantes */}
      <div className="mt-4 pt-3.5 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
        <button
          type="button"
          onClick={() => setShowAllUpcoming((s) => !s)}
          className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-100 dark:border dark:border-slate-700 dark:hover:bg-slate-700/80 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-xs active:scale-98"
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
        <UpcomingEventsDrawer
          allUpcoming={allUpcoming}
          filteredUpcoming={filteredUpcoming}
          modalityFilter={modalityFilter}
          setModalityFilter={setModalityFilter}
        />
      )}
    </div>
  );
}

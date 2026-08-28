"use client";

import { Link } from "next-view-transitions";
import {
  Calendar,
  CalendarPlus,
  Clock,
  Video,
  MapPin,
  Car,
  ArrowRight,
  User,
  Sparkles,
} from "lucide-react";
import {
  eventLocation,
  formatFrDate,
  getNextEvent,
  getPresenceDaysWithin,
} from "@/lib/pst/planning-stats";
import { downloadIcs } from "@/lib/pst/ics-export";

const TYPE_CONFIG: Record<
  string,
  { label: string; icon: typeof Video; badgeClass: string }
> = {
  COURS: {
    label: "Cours Présentiel",
    icon: MapPin,
    badgeClass:
      "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30",
  },
  EXAMEN: {
    label: "Examen Officiel",
    icon: Calendar,
    badgeClass:
      "bg-rose-500/15 text-rose-800 dark:text-rose-300 border-rose-500/30",
  },
  WEBCONF: {
    label: "Web-conférence (Visio)",
    icon: Video,
    badgeClass:
      "bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border-indigo-500/30",
  },
};

const UNIT_TITLES: Record<string, string> = {
  pst106: "Clinique de l'activité & psychologie du travail",
  pst108: "Psychologie du langage et clinique du dialogue",
  pst120: "Psychodynamique et psychopathologie du travail",
  pst123: "Le psychologue, le travail et l'emploi",
  pst124: "Transformations digitales et clinique des usages",
};

export function NextEventCard() {
  const next = getNextEvent();
  if (!next) return null;

  const location = eventLocation(next);
  const presenceWeek = getPresenceDaysWithin(7);
  const typeInfo = TYPE_CONFIG[next.type] ?? {
    label: "Cours",
    icon: MapPin,
    badgeClass:
      "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30",
  };
  const TypeIcon = typeInfo.icon;
  const unitTitle = UNIT_TITLES[next.unit] || "";

  return (
    <div className="card bg-gradient-to-br from-white via-slate-50/50 to-amber-500/5 dark:from-slate-900 dark:via-slate-900/90 dark:to-amber-500/10 border border-amber-500/25 p-5 sm:p-6 rounded-2xl mb-6 shadow-sm relative overflow-hidden transition-all">
      <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
        <div className="flex items-center gap-2.5">
          <span className="relative flex size-2.5">
            <span className="animate-ping absolute inline-flex rounded-full bg-amber-400 opacity-75 size-full" />
            <span className="relative inline-flex rounded-full size-2.5 bg-amber-500" />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-400">
            Prochaine séance à venir
          </span>
        </div>

        {/* Groupe de boutons d'action : Ajout agenda + Planning complet */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() =>
              downloadIcs([next], `seance-${next.unit}-${next.date}.ics`)
            }
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Ajouter cette séance spécifique à ton agenda (.ics)"
          >
            <CalendarPlus className="size-3.5 text-amber-600 dark:text-amber-400" />
            <span>Ajouter à l'agenda</span>
          </button>
          <Link
            href="/pst/planning/"
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <Calendar className="size-3.5" />
            <span>Voir le planning complet</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4.5 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="lg:col-span-6 space-y-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-black text-sm rounded-lg uppercase tracking-wider">
              {next.unit}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-xs font-bold ${typeInfo.badgeClass}`}
            >
              <TypeIcon className="size-3.5" />
              <span>{typeInfo.label}</span>
            </span>
            {next.tbd && (
              <span className="text-xs text-amber-600 dark:text-amber-400 italic">
                (jour à confirmer)
              </span>
            )}
          </div>
          {unitTitle && (
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              {unitTitle}
            </div>
          )}
        </div>

        <div className="lg:col-span-6 flex flex-col sm:flex-row sm:items-center justify-end gap-4 text-xs text-slate-700 dark:text-slate-300 border-t lg:border-t-0 lg:border-l border-slate-200/80 dark:border-slate-800 pt-3 lg:pt-0 lg:pl-5">
          <div className="space-y-1">
            <div className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Calendar className="size-4 text-amber-600 shrink-0" />
              <span>
                {next.day} {formatFrDate(next.date)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-xs">
              <Clock className="size-3.5 text-slate-400 shrink-0" />
              <span>
                {next.start} – {next.end}
              </span>
            </div>
          </div>

          {(location || next.teacher) && (
            <div className="space-y-1.5 sm:border-l sm:border-slate-200/80 sm:dark:border-slate-800 sm:pl-4">
              {location && (
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-amber-600 shrink-0" />
                  <span>{location}</span>
                </div>
              )}
              {next.teacher && (
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
                  <User className="size-3 text-slate-400 shrink-0" />
                  <span className="truncate max-w-40">{next.teacher}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {presenceWeek.length > 0 && (
        <div className="mt-3.5 p-3 bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/25 text-amber-900 dark:text-amber-200 rounded-xl text-xs flex items-center gap-2.5">
          <Car className="size-4 shrink-0 text-amber-700 dark:text-amber-400" />
          <span>
            <b>Avis déplacement :</b> {presenceWeek.length} jour
            {presenceWeek.length > 1 ? "s" : ""} de présentiel prévu
            {presenceWeek.length > 1 ? "s" : ""} dans les 7 prochains jours.
          </span>
        </div>
      )}
    </div>
  );
}

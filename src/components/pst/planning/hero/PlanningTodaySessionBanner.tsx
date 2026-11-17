import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  Video,
} from "lucide-react";
import { Link } from "@/components/common/Link";
import {
  UNIT_TITLES,
  type PlanningEvent,
} from "@/lib/pst/data/planning";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface PlanningTodaySessionBannerProps {
  session: PlanningEvent;
  onSelectEvent: (ev: PlanningEvent) => void;
}

export function PlanningTodaySessionBanner({
  session,
  onSelectEvent,
}: PlanningTodaySessionBannerProps) {
  return (
    <div className="mt-5 p-3.5 sm:p-4 rounded-2xl border-2 border-emerald-500/50 bg-gradient-to-br sm:bg-gradient-to-r from-emerald-500/15 via-emerald-500/10 to-transparent flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 sm:gap-4 shadow-sm animate-fadeIn">
      <div className="flex items-start gap-3">
        <div className="relative p-2.5 rounded-xl bg-emerald-600 text-white font-bold shrink-0 shadow-xs mt-0.5 sm:mt-0">
          <Video className="size-4 sm:size-5" />
          <span className="absolute -top-1 -right-1 size-2.5 sm:size-3 rounded-full bg-emerald-400 animate-ping" />
          <span className="absolute -top-1 -right-1 size-2.5 sm:size-3 rounded-full bg-emerald-500" />
        </div>
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-mono text-[10px] font-black uppercase shrink-0">
              Aujourd&apos;hui · {session.start} – {session.end}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-mono text-[10px] font-black uppercase shrink-0">
              {session.unit.toUpperCase()}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-900 dark:text-emerald-100 text-[10px] font-bold shrink-0">
              {session.type === "WEBCONF"
                ? "Webconférence"
                : session.type === "COURS"
                  ? "Présentiel"
                  : "ENF"}
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug">
            {UNIT_TITLES[session.unit]}
          </h3>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            Intervenant : <b>{session.teacher}</b> ·{" "}
            {session.type === "WEBCONF"
              ? "Plateforme synchrone BigBlueButton (ENF)"
              : session.type === "COURS"
                ? `Salle ${session.room ?? "Cnam Bègles"}`
                : "Activité asynchrone ENF"}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full lg:w-auto">
        <a
          href="https://lecnam.net/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playClickSound()}
          className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-xs"
          title="Rejoindre directement la salle de cours sur l'ENF"
        >
          <Video className="size-3.5" />
          <span>Rejoindre BigBlueButton (ENF)</span>
          <ExternalLink className="size-3 opacity-75" />
        </a>

        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
          <Link
            href={`/pst/${session.unit.replace("pst", "")}/`}
            onClick={() => playClickSound()}
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-2xs"
            title={`Ouvrir les fiches et notes de cours de ${session.unit.toUpperCase()}`}
          >
            <BookOpen className="size-3.5 text-amber-600" />
            <span>Notes {session.unit.toUpperCase()}</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              onSelectEvent(session);
            }}
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-xs"
            title="Inspecter la séance dans le panneau de détails"
          >
            <span>Inspecter</span>
            <ArrowRight className="size-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

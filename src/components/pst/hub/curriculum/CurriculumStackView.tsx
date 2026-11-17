"use client";

import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { Link } from "@/components/common/Link";
import type { ModuleProgress } from "@/lib/pst/data/curriculum-rncp7";

interface CurriculumStackViewProps {
  modules: ModuleProgress[];
  onToggleStatus: (id: string) => void;
  onInspectModule: (m: ModuleProgress) => void;
}

const LEVEL_META: Record<
  number,
  { title: string; subtitle: string; ects: string; color: string }
> = {
  5: {
    title: "Année 5 — Mémoire & Titre",
    subtitle: "Préparation, rédaction et soutenance",
    ects: "94 ECTS",
    color: "border-sky-950 text-sky-800 dark:text-sky-300",
  },
  4: {
    title: "Année 4 — Professionnalisation (suite)",
    subtitle: "Méthodes et pratique de terrain",
    ects: "18 ECTS",
    color: "border-sky-900 text-sky-800 dark:text-sky-300",
  },
  3: {
    title: "Année 3 — Professionnalisation",
    subtitle: "Clinique de l'expérience et théories",
    ects: "24 ECTS",
    color: "border-sky-800 text-sky-800 dark:text-sky-300",
  },
  2: {
    title: "Année 2 — Spécialisation Clinique",
    subtitle: "Clinique de l'activité, dialogue, psychopatho, usages",
    ects: "30 ECTS",
    color: "border-sky-700 text-sky-800 dark:text-sky-300",
  },
  1: {
    title: "Année 1 — Fondamentaux",
    subtitle: "Initiation clinique, cognitive, sociale, stats",
    ects: "22 ECTS",
    color: "border-sky-600 text-sky-800 dark:text-sky-300",
  },
};

export function CurriculumStackView({
  modules,
  onToggleStatus,
  onInspectModule,
}: CurriculumStackViewProps) {
  return (
    <div className="space-y-3">
      {[5, 4, 3, 2, 1].map((lvl) => {
        const levelMods = modules.filter((m) => m.level === lvl);
        const meta = LEVEL_META[lvl]!;
        return (
          <div
            key={lvl}
            className="p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/60 backdrop-blur-md shadow-2xs space-y-2.5"
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-700/60 pb-2">
              <div>
                <span className="text-xs font-black text-slate-900 dark:text-slate-100">
                  {meta.title}
                </span>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                  {meta.subtitle}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/25 shrink-0">
                {meta.ects}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {levelMods.map((item) => {
                const isValidated = item.status === "valide";
                const isInProgress = item.status === "en_cours";
                const statusColor = isValidated
                  ? "bg-emerald-600 text-white border-emerald-700"
                  : isInProgress
                    ? "bg-amber-600 text-white border-amber-700"
                    : "bg-slate-100/90 dark:bg-slate-700/80 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-600";
                return (
                  <div
                    key={item.id}
                    onClick={() => onToggleStatus(item.id)}
                    className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-1.5 shadow-2xs active:scale-[0.98] ${statusColor}`}
                    title={`${item.code} — ${item.title} (${item.ects} ECTS). Cliquez pour modifier le statut.`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-black tracking-tight mb-1">
                        <span className="flex items-center gap-1 font-mono whitespace-nowrap">
                          {item.code}
                          {isValidated && (
                            <CheckCircle2 className="size-3 text-white shrink-0" />
                          )}
                        </span>
                        <span className="font-mono text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-black/15 dark:bg-white/15 whitespace-nowrap font-bold">
                          {item.ects} ECTS
                        </span>
                      </div>
                      <div className="text-xs font-bold leading-snug line-clamp-2 sm:line-clamp-3 break-words">
                        {item.title}
                      </div>
                      {item.note && (
                        <div className="text-[10px] italic opacity-85 mt-0.5">
                          {item.note}
                        </div>
                      )}
                    </div>

                    <div className="pt-1.5 flex items-center justify-between gap-1 border-t border-black/10 dark:border-white/10 mt-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onInspectModule(item);
                        }}
                        className="size-5 rounded flex items-center justify-center text-[10px] font-mono font-bold bg-black/15 hover:bg-black/25 dark:bg-white/15 dark:hover:bg-white/25 transition-colors cursor-pointer"
                        title="Voir pré-requis et détails"
                        aria-label={`Pré-requis de ${item.code}`}
                      >
                        ℹ
                      </button>

                      {item.sitePath && (
                        <Link
                          href={item.sitePath}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[10px] font-black uppercase flex items-center gap-0.5 px-2 py-0.5 rounded-lg bg-black/15 hover:bg-black/25 dark:bg-white/15 dark:hover:bg-white/25 ml-auto"
                        >
                          <span>Atelier</span>
                          <ArrowUpRight className="size-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

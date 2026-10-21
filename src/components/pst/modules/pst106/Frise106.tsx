import { ERAS } from "@/lib/pst/data/pst106";
import { History, Calendar, HeartPulse, BookOpen, Briefcase, Sparkles } from "lucide-react";

export function Frise106() {
  return (
    <div className="space-y-5">
      <p className="hint">
        La <b>frise historique</b> de la discipline : chaque époque croise le contexte du travail, l&apos;état de la discipline, ses auteurs de référence et sa conception de la santé.
      </p>

      <div className="space-y-4">
        {ERAS.map((era, i) => (
          <div
            key={era.key}
            className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 relative overflow-hidden"
          >
            {/* Header with Era Year & Title */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-indigo-600 text-white shadow-2xs">
                  <Calendar className="size-3" />
                  <span>{era.year}</span>
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
                  {era.name}
                </h3>
              </div>

              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold">
                Époque #{i + 1}
              </span>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* 1. Contexte du Travail */}
              <div className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Briefcase className="size-3 text-indigo-500" />
                  <span>Travail Réel &amp; Prescrit</span>
                </span>
                <div
                  className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium"
                  dangerouslySetInnerHTML={{ __html: era.travail }}
                />
              </div>

              {/* 2. Discipline */}
              <div className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <History className="size-3 text-indigo-500" />
                  <span>État de la Discipline</span>
                </span>
                <div
                  className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium"
                  dangerouslySetInnerHTML={{ __html: era.discipline }}
                />
              </div>

              {/* 3. Auteurs clés */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/60 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1">
                  <BookOpen className="size-3 text-indigo-600 dark:text-indigo-400" />
                  <span>Auteurs de Référence</span>
                </span>
                <div
                  className="text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed font-bold"
                  dangerouslySetInnerHTML={{ __html: era.auteur }}
                />
              </div>

              {/* 4. Conception de la Santé */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <HeartPulse className="size-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Conception de la Santé</span>
                </span>
                <div
                  className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed font-medium"
                  dangerouslySetInnerHTML={{ __html: era.sante }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

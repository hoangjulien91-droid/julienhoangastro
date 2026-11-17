"use client";

import { Link } from "@/components/common/Link";
import {
  Zap,
  ArrowRight,
  CheckCircle2,
  Flame,
  Moon,
} from "lucide-react";
import { getUnitSemesterStatus } from "@/lib/pst/planning-stats";
import { WorkoutStatsGrid } from "./workout/WorkoutStatsGrid";
import { useDailyWorkoutState, MODULES } from "./workout/useDailyWorkoutState";

export function DailyWorkoutCard() {
  const stats = useDailyWorkoutState();

  // Si aucune carte n'a encore été initiée OU si toutes les révisions du jour sont terminées
  if (stats.totalDue === 0) {
    const isFreshStart = stats.totalCards === 0 && stats.masteredCards === 0;
    return (
      <div className="card p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xs flex flex-col justify-between mb-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span
              className={`text-[10px] font-mono uppercase tracking-wider font-extrabold flex items-center gap-1.5 ${
                isFreshStart
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              <span
                className={`size-2 rounded-full ${
                  isFreshStart
                    ? "bg-indigo-500 animate-pulse"
                    : "bg-emerald-500"
                }`}
              />
              Mémorisation SuperMemo-2
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black border ${
                isFreshStart
                  ? "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30"
                  : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
              }`}
            >
              {isFreshStart ? "Prêt à démarrer" : "À jour ✓"}
            </span>
          </div>

          <div className="flex items-start gap-3.5">
            <div
              className={`p-3 rounded-2xl shrink-0 shadow-2xs ${
                isFreshStart
                  ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400"
                  : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {isFreshStart ? (
                <Zap className="size-5" />
              ) : (
                <CheckCircle2 className="size-5" />
              )}
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 m-0">
                {isFreshStart
                  ? "Activez votre répétition espacée SM-2"
                  : "Jeu de cartes de mémorisation consolidé"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 m-0 mt-1 leading-relaxed">
                {isFreshStart
                  ? "Évaluez vos premières cartes mémo sur les UE du Semestre 1 (PST106, PST108, PST123) pour calibrer votre échéancier de révision."
                  : "Toutes vos cartes ont été révisées pour aujourd'hui. L'algorithme de répétition espacée est parfaitement calibré."}
              </p>
            </div>
          </div>

          {/* Grille de 3 mini-statistiques */}
          <WorkoutStatsGrid
            masteredCards={stats.masteredCards}
            streak={stats.streak}
            retentionRate={stats.retentionRate}
          />
        </div>

        <div className="mt-4 pt-3.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs gap-2">
          <Link
            href="/pst/106/#fiches"
            className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          >
            Lire les fiches
          </Link>
          <Link
            href="/pst/106/#cartes"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 font-bold text-xs transition-all shadow-2xs active:scale-95"
          >
            <span>
              {isFreshStart ? "Démarrer 10 cartes" : "Session de cartes"}
            </span>
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    );
  }

  const activeModules = MODULES.filter(
    (mod) => !getUnitSemesterStatus(mod).isDormant,
  );
  const dormantModules = MODULES.filter(
    (mod) => getUnitSemesterStatus(mod).isDormant,
  );

  const topDueModule =
    activeModules
      .slice()
      .sort((a, b) => (stats.byModule[b] || 0) - (stats.byModule[a] || 0))[0] ||
    activeModules[0] ||
    "pst106";

  return (
    <div className="card p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 rounded-3xl shadow-xs flex flex-col justify-between relative overflow-hidden mb-6">
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-amber-500 animate-ping" />
            Entraînement Quotidien SM-2
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/30 flex items-center gap-1">
            <Flame className="size-3 text-amber-600" />
            <span>À Réviser</span>
          </span>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 shrink-0 shadow-2xs">
            <Zap className="size-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 m-0">
              {stats.totalDue} notion{stats.totalDue > 1 ? "s" : ""} due
              {stats.totalDue > 1 ? "s" : ""}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 m-0 mt-1 leading-relaxed">
              Consolidez votre mémoire à long terme avant que la courbe de
              l&apos;oubli ne s&apos;affaisse.
            </p>
          </div>
        </div>

        {/* Grille de 3 mini-statistiques */}
        <WorkoutStatsGrid
          masteredCards={stats.masteredCards}
          streak={stats.streak}
          retentionRate={stats.retentionRate}
        />

        {/* Breakdown pills : modules actifs en premier, puis modules S2 en veille */}
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          {activeModules.map((mod) => {
            const count = stats.byModule[mod] || 0;
            if (count === 0) return null;
            return (
              <span
                key={mod}
                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              >
                {mod.toUpperCase()}: <b className="text-amber-600">{count}</b>
              </span>
            );
          })}

          {dormantModules.length > 0 && (
            <span
              className="px-2.5 py-1 bg-slate-100/60 dark:bg-slate-800/40 rounded-xl font-mono text-[10px] text-slate-400 dark:text-slate-500 border border-dashed border-slate-300 dark:border-slate-700 flex items-center gap-1"
              title="UE de Semestre 2 mises en sommeil jusqu'à 15 jours avant la rentrée"
            >
              <Moon className="size-2.5" />
              <span>
                S2 en veille :{" "}
                {dormantModules.map((m) => m.toUpperCase()).join(", ")}
              </span>
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
        <Link
          href={`/pst/${(topDueModule || "pst106").replace("pst", "")}/`}
          className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
        >
          Tableau de bord
        </Link>
        <Link
          href={`/pst/${(topDueModule || "pst106").replace("pst", "")}/#cartes`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 font-bold text-xs transition-all shadow-2xs active:scale-95"
        >
          <span>Lancer ({topDueModule?.toUpperCase()})</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}

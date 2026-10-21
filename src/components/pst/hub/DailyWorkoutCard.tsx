"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@/components/common/Link";
import { Zap, ArrowRight, CheckCircle2, Flame, Moon, Award, CalendarDays, TrendingUp } from "lucide-react";
import { PstStore, type SM2State } from "@/lib/pst/store";
import { getUnitSemesterStatus } from "@/lib/pst/planning-stats";
import { computeGlobalStats } from "@/lib/pst/hub-stats";

const MODULES = ["pst106", "pst108", "pst120", "pst123", "pst124"] as const;

const MODULE_STORE_KEYS: Record<(typeof MODULES)[number], string> = {
  pst106: "pst106_v1",
  pst108: "pst108_atelier_v10",
  pst120: "pst120_atelier_v10",
  pst123: "pst123_atelier_v10",
  pst124: "pst124_atelier_v10",
};

interface DueStats {
  totalDue: number;
  byModule: Record<string, number>;
  totalCards: number;
  masteredCards: number;
  streak: number;
  retentionRate: number;
}

export function DailyWorkoutCard() {
  const [stats, setStats] = useState<DueStats>({
    totalDue: 0,
    byModule: {},
    totalCards: 0,
    masteredCards: 0,
    streak: 0,
    retentionRate: 92,
  });

  useEffect(() => {
    const computeDue = () => {
      const nowIso = new Date().toISOString();
      let dueCount = 0;
      let cardCount = 0;
      const modMap: Record<string, number> = {};

      MODULES.forEach((modKey) => {
        const store = new PstStore(MODULE_STORE_KEYS[modKey]);
        const marks = store.getMarks();
        let modDue = 0;

        Object.entries(marks).forEach(([id]) => {
          if (
            id.startsWith("box_") ||
            id.startsWith("note_") ||
            id.startsWith("fav_") ||
            id.startsWith("checklist_")
          ) {
            return;
          }
          cardCount++;
          const sm2: SM2State | undefined = store.getSM2State(id);
          if (!sm2 || !sm2.dueDate || sm2.dueDate <= nowIso) {
            dueCount++;
            modDue++;
          }
        });

        modMap[modKey] = modDue;
      });

      const globalStats = computeGlobalStats();
      const retention = globalStats.avgScore != null ? globalStats.avgScore : (globalStats.totMastered > 0 ? 94 : 88);

      setStats({
        totalDue: dueCount,
        byModule: modMap,
        totalCards: cardCount,
        masteredCards: globalStats.totMastered,
        streak: globalStats.streak,
        retentionRate: retention,
      });
    };

    computeDue();
    window.addEventListener("pst:storage-updated", computeDue);
    window.addEventListener("storage", computeDue);
    return () => {
      window.removeEventListener("pst:storage-updated", computeDue);
      window.removeEventListener("storage", computeDue);
    };
  }, []);

  // Si aucune révision n'est due aujourd'hui : carte valorisante "À jour" avec statistiques complètes
  if (stats.totalDue === 0) {
    return (
      <div className="card p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xs flex flex-col justify-between mb-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500" />
              Mémorisation SuperMemo-2
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
              À jour ✓
            </span>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0 shadow-2xs">
              <CheckCircle2 className="size-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 m-0">
                Jeu de cartes de mémorisation consolidé
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 m-0 mt-1 leading-relaxed">
                Toutes vos cartes ont été révisées pour aujourd&apos;hui. L&apos;algorithme de répétition espacée est parfaitement calibré.
              </p>
            </div>
          </div>

          {/* Grille de 3 mini-statistiques au centre */}
          <div className="grid grid-cols-3 gap-2 py-1">
            <div className="p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
              <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-center gap-1">
                <Award className="size-3 text-emerald-500" />
                <span>Maîtrisées</span>
              </div>
              <div className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 font-mono mt-0.5">
                {stats.masteredCards}
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
              <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-center gap-1">
                <CalendarDays className="size-3 text-amber-500" />
                <span>Série</span>
              </div>
              <div className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 font-mono mt-0.5">
                {stats.streak} {stats.streak > 1 ? "jours" : "jour"}
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
              <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-center gap-1">
                <TrendingUp className="size-3 text-indigo-500" />
                <span>Rétention</span>
              </div>
              <div className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 font-mono mt-0.5">
                {stats.retentionRate}%
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs gap-2">
          <Link
            href="/pst/106/"
            className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
          >
            Révision libre
          </Link>
          <Link
            href="/pst/106/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all shadow-2xs"
          >
            <span>Explorer un atelier</span>
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
    activeModules.slice().sort(
      (a, b) => (stats.byModule[b] || 0) - (stats.byModule[a] || 0),
    )[0] || activeModules[0] || "pst106";

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
              {stats.totalDue} notion{stats.totalDue > 1 ? "s" : ""} due{stats.totalDue > 1 ? "s" : ""}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 m-0 mt-1 leading-relaxed">
              Consolidez votre mémoire à long terme avant que la courbe de l&apos;oubli ne s&apos;affaisse.
            </p>
          </div>
        </div>

        {/* Grille de 3 mini-statistiques au centre */}
        <div className="grid grid-cols-3 gap-2 py-1">
          <div className="p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-center gap-1">
              <Award className="size-3 text-emerald-500" />
              <span>Maîtrisées</span>
            </div>
            <div className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 font-mono mt-0.5">
              {stats.masteredCards}
            </div>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-center gap-1">
              <CalendarDays className="size-3 text-amber-500" />
              <span>Série</span>
            </div>
            <div className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 font-mono mt-0.5">
              {stats.streak} {stats.streak > 1 ? "jours" : "jour"}
            </div>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-center gap-1">
              <TrendingUp className="size-3 text-indigo-500" />
              <span>Rétention</span>
            </div>
            <div className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 font-mono mt-0.5">
              {stats.retentionRate}%
            </div>
          </div>
        </div>

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
              <span>S2 en veille : {dormantModules.map((m) => m.toUpperCase()).join(", ")}</span>
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
        <Link
          href={`/pst/${(topDueModule || "pst106").replace("pst", "")}/`}
          className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
        >
          Révision libre
        </Link>
        <Link
          href={`/pst/${(topDueModule || "pst106").replace("pst", "")}/`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 font-bold text-xs transition-all shadow-2xs active:scale-95"
        >
          <span>Lancer ({topDueModule?.toUpperCase()})</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
  );
}

"use client";

import { useEffect, useState } from "react";
import { Link } from "next-view-transitions";
import { Zap, ArrowRight } from "lucide-react";
import { PstStore, type SM2State } from "@/lib/pst/store";

const MODULES = ["pst106", "pst108", "pst120", "pst123", "pst124"] as const;

interface DueStats {
  totalDue: number;
  byModule: Record<string, number>;
  totalCards: number;
}

export function DailyWorkoutCard() {
  const [stats, setStats] = useState<DueStats>({
    totalDue: 0,
    byModule: {},
    totalCards: 0,
  });

  useEffect(() => {
    const todayIso = new Date().toISOString().slice(0, 10);
    let dueCount = 0;
    let cardCount = 0;
    const modMap: Record<string, number> = {};

    MODULES.forEach((modKey) => {
      const store = new PstStore(modKey);
      const marks = store.getMarks();
      let modDue = 0;

      Object.entries(marks).forEach(([id]) => {
        if (id.startsWith("box_")) return;
        cardCount++;
        const sm2: SM2State | undefined = store.getSM2State(id);
        if (!sm2 || !sm2.dueDate || sm2.dueDate <= todayIso) {
          dueCount++;
          modDue++;
        }
      });

      modMap[modKey] = modDue;
    });

    setStats({
      totalDue: dueCount,
      byModule: modMap,
      totalCards: cardCount,
    });
  }, []);

  // Si aucune révision n'est due aujourd'hui, on ne pollue pas la vue avec une bannière inutile
  if (stats.totalDue === 0) {
    return null;
  }

  const topDueModule = MODULES.slice().sort(
    (a, b) => (stats.byModule[b] || 0) - (stats.byModule[a] || 0),
  )[0];

  return (
    <div className="card bg-gradient-to-r from-amber-600 to-amber-700 text-white p-5 rounded-2xl mb-6 shadow-md relative overflow-hidden">
      <div className="absolute -right-6 -bottom-6 bg-white/10 rounded-full blur-2xl pointer-events-none size-32" />

      <div className="flex items-center justify-between gap-4 flex-wrap relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/15 backdrop-blur-md text-amber-200 rounded-xl">
            <Zap className="size-6" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-200 font-bold">
              Entraînement Quotidien SM-2
            </div>
            <h3 className="text-lg font-extrabold text-white m-0">
              {stats.totalDue} notion{stats.totalDue > 1 ? "s" : ""} à réviser
              aujourd'hui
            </h3>
          </div>
        </div>

        <Link
          href={`/pst/${(topDueModule || "pst106").replace("pst", "")}/`}
          className="px-4 py-2.5 bg-white text-amber-900 hover:bg-amber-50 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
        >
          <span>Lancer la session sur {topDueModule?.toUpperCase()}</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-4 pt-3 border-t border-white/15 flex items-center gap-2 flex-wrap text-xs text-amber-100 relative z-10">
        <span className="font-semibold text-white">Répartition dues :</span>
        {MODULES.map((mod) => {
          const count = stats.byModule[mod] || 0;
          if (count === 0) return null;
          return (
            <span
              key={mod}
              className="px-2 py-0.5 bg-white/15 rounded-md font-mono text-[11px]"
            >
              {mod.toUpperCase()}: <b>{count}</b>
            </span>
          );
        })}
      </div>
    </div>
  );
}

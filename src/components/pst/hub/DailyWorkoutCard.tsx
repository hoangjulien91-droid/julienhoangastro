"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@/components/common/Link";
import { Zap, ArrowRight, CheckCircle2, Flame } from "lucide-react";
import { PstStore, type SM2State } from "@/lib/pst/store";

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
}

export function DailyWorkoutCard() {
  const [stats, setStats] = useState<DueStats>({
    totalDue: 0,
    byModule: {},
    totalCards: 0,
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

      setStats({
        totalDue: dueCount,
        byModule: modMap,
        totalCards: cardCount,
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

  // Si aucune révision n'est due aujourd'hui : carte valorisante "À jour"
  if (stats.totalDue === 0) {
    return (
      <div className="card p-5 bg-card/90 border border-border rounded-2xl shadow-xs flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">
              Mémorisation SuperMemo-2
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              À jour
            </span>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
              <CheckCircle2 className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-foreground m-0">
                Deck de mémorisation consolidé
              </h3>
              <p className="text-xs text-muted-foreground m-0 mt-1 leading-relaxed">
                Toutes vos cartes ont été révisées pour aujourd'hui. L'algorithme de répétition espacée est parfaitement calibré.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between text-xs">
          <span className="text-muted-foreground font-mono text-[11px]">
            Prochaine échéance : Demain
          </span>
          <Link
            href="/pst/106/"
            className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
          >
            <span>Explorer un atelier</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    );
  }

  const topDueModule = MODULES.slice().sort(
    (a, b) => (stats.byModule[b] || 0) - (stats.byModule[a] || 0),
  )[0];

  return (
    <div className="card p-5 bg-card/90 border border-accent/40 rounded-2xl shadow-xs flex flex-col justify-between relative overflow-hidden">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-accent">
            Entraînement Quotidien SM-2
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-accent/10 text-accent border border-accent/20 flex items-center gap-1">
            <Flame className="size-3 text-accent" />
            <span>À Réviser</span>
          </span>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-accent/10 text-accent shrink-0">
            <Zap className="size-5" />
          </div>
          <div>
            <h3 className="text-sm font-serif font-bold text-foreground m-0">
              {stats.totalDue} notion{stats.totalDue > 1 ? "s" : ""} due{stats.totalDue > 1 ? "s" : ""}
            </h3>
            <p className="text-xs text-muted-foreground m-0 mt-1 leading-relaxed">
              Consolidez votre mémoire à long terme avant que la courbe de l'oubli ne s'affaisse.
            </p>
          </div>
        </div>

        {/* Breakdown pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          {MODULES.map((mod) => {
            const count = stats.byModule[mod] || 0;
            if (count === 0) return null;
            return (
              <span
                key={mod}
                className="px-2 py-0.5 bg-muted rounded-md font-mono text-[10px] text-foreground border border-border"
              >
                {mod.toUpperCase()}: <b>{count}</b>
              </span>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between gap-2 text-xs">
        <span className="text-muted-foreground text-[11px] font-mono">
          Priorité : {topDueModule?.toUpperCase()}
        </span>
        <Link
          href={`/pst/${(topDueModule || "pst106").replace("pst", "")}/`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition-opacity shadow-xs"
        >
          <span>Lancer ({topDueModule?.toUpperCase()})</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}

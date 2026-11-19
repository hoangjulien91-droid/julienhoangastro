"use client";

import { useEffect, useState } from "react";
import { isNonFlashcardMarkKey, PstStore, type SM2State } from "@/lib/pst/store";
import { computeGlobalStats } from "@/lib/pst/hub-stats";

export const MODULES = ["pst106", "pst108", "pst120", "pst123", "pst124"] as const;

export const MODULE_STORE_KEYS: Record<(typeof MODULES)[number], string> = {
  pst106: "pst106_v1",
  pst108: "pst108_atelier_v10",
  pst120: "pst120_atelier_v10",
  pst123: "pst123_atelier_v10",
  pst124: "pst124_atelier_v10",
};

export interface DueStats {
  totalDue: number;
  byModule: Record<string, number>;
  totalCards: number;
  masteredCards: number;
  streak: number;
  retentionRate: number;
}

export function useDailyWorkoutState() {
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
          if (isNonFlashcardMarkKey(id)) {
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
      const hasStarted = cardCount > 0 || globalStats.totMastered > 0;
      const retention =
        globalStats.avgScore != null
          ? globalStats.avgScore
          : globalStats.totMastered > 0
            ? 94
            : 0;

      setStats({
        totalDue: dueCount,
        byModule: modMap,
        totalCards: hasStarted ? Math.max(cardCount, 1) : 0,
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

  return stats;
}

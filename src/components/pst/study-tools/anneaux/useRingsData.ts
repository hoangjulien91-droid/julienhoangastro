"use client";

import { useEffect, useState } from "react";

export interface RingsData {
  date: string; // YYYY-MM-DD
  capsulesCount: number; // Goal: 2
  speedRunCount: number; // Goal: 1
  casesCount: number; // Goal: 1
  streakDays: number;
}

const STORAGE_KEY = "pst_activity_rings_v1";

function getTodayIso(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function safeSave(data: RingsData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* storage disabled */
  }
}

export function useRingsData() {
  const [data, setData] = useState<RingsData>({
    date: getTodayIso(),
    capsulesCount: 0,
    speedRunCount: 0,
    casesCount: 0,
    streakDays: 1,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const today = getTodayIso();
      if (raw) {
        const parsed: RingsData = JSON.parse(raw);
        if (parsed.date === today) {
          setData(parsed);
        } else {
          // Nouveau jour
          const lastDate = new Date(parsed.date);
          const nowDate = new Date(today);
          const diffDays = Math.round(
            (nowDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24),
          );
          const nextStreak = diffDays === 1 ? (parsed.streakDays || 1) + 1 : 1;
          const freshData: RingsData = {
            date: today,
            capsulesCount: 0,
            speedRunCount: 0,
            casesCount: 0,
            streakDays: nextStreak,
          };
          setData(freshData);
          safeSave(freshData);
        }
      } else {
        const initial: RingsData = {
          date: today,
          capsulesCount: 0,
          speedRunCount: 0,
          casesCount: 0,
          streakDays: 1,
        };
        setData(initial);
        safeSave(initial);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    function handleCapsuleConsulted() {
      setData((prev) => {
        const next = { ...prev, capsulesCount: prev.capsulesCount + 1 };
        safeSave(next);
        return next;
      });
    }

    function handleSpeedRun() {
      setData((prev) => {
        const next = { ...prev, speedRunCount: prev.speedRunCount + 1 };
        safeSave(next);
        return next;
      });
    }

    function handleCaseSolved() {
      setData((prev) => {
        const next = { ...prev, casesCount: prev.casesCount + 1 };
        safeSave(next);
        return next;
      });
    }

    window.addEventListener("pst:capsule-consulted", handleCapsuleConsulted);
    window.addEventListener("pst:speed-run-completed", handleSpeedRun);
    window.addEventListener("pst:detective-solved", handleCaseSolved);

    return () => {
      window.removeEventListener("pst:capsule-consulted", handleCapsuleConsulted);
      window.removeEventListener("pst:speed-run-completed", handleSpeedRun);
      window.removeEventListener("pst:detective-solved", handleCaseSolved);
    };
  }, []);

  // Calcul des pourcentages (0 à 100)
  const pctRed = Math.min(100, Math.round((data.capsulesCount / 2) * 100)); // Capsules (Goal: 2)
  const pctGreen = Math.min(100, Math.round((data.speedRunCount / 1) * 100)); // Speed-Run (Goal: 1)
  const pctBlue = Math.min(100, Math.round((data.casesCount / 1) * 100)); // Cas / Détective (Goal: 1)

  const allClosed = pctRed >= 100 && pctGreen >= 100 && pctBlue >= 100;

  // Calcul du stroke-dashoffset SVG pour chaque anneau
  const cRed = 2 * Math.PI * 24;
  const cGreen = 2 * Math.PI * 18;
  const cBlue = 2 * Math.PI * 12;

  const offsetRed = cRed - (pctRed / 100) * cRed;
  const offsetGreen = cGreen - (pctGreen / 100) * cGreen;
  const offsetBlue = cBlue - (pctBlue / 100) * cBlue;

  return {
    data,
    pctRed,
    pctGreen,
    pctBlue,
    allClosed,
    cRed,
    cGreen,
    cBlue,
    offsetRed,
    offsetGreen,
    offsetBlue,
  };
}

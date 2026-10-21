"use client";

import { useEffect, useState } from "react";
import { Flame, Trophy, CheckCircle2, Sparkles, X } from "lucide-react";
import { playSuccessSound, playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface RingsData {
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

export function AnneauxRevisionPst() {
  const [data, setData] = useState<RingsData>({
    date: getTodayIso(),
    capsulesCount: 0,
    speedRunCount: 0,
    casesCount: 0,
    streakDays: 1,
  });

  const [expanded, setExpanded] = useState(false);

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
          const diffDays = Math.round((nowDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
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
    function handleCapsuleAudio() {
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

    window.addEventListener("pst:play-audio", handleCapsuleAudio);
    window.addEventListener("pst:speed-run-completed", handleSpeedRun);
    window.addEventListener("pst:detective-solved", handleCaseSolved);

    return () => {
      window.removeEventListener("pst:play-audio", handleCapsuleAudio);
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
  // Circonférence = 2 * PI * r
  // Ring 1 (Red) : r = 24 => C = 150.79
  // Ring 2 (Green) : r = 18 => C = 113.09
  // Ring 3 (Blue) : r = 12 => C = 75.39
  const cRed = 2 * Math.PI * 24;
  const cGreen = 2 * Math.PI * 18;
  const cBlue = 2 * Math.PI * 12;

  const offsetRed = cRed - (pctRed / 100) * cRed;
  const offsetGreen = cGreen - (pctGreen / 100) * cGreen;
  const offsetBlue = cBlue - (pctBlue / 100) * cBlue;

  return (
    <>
      {/* Micro-Pill Trigger dans la barre de navigation ou en-tête */}
      <button
        type="button"
        onClick={() => {
          triggerHaptic("selection");
          playClickSound();
          setExpanded((v) => !v);
        }}
        className="inline-flex items-center gap-1.5 px-2 py-1 rounded-xl bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 transition-all cursor-pointer shadow-2xs active:scale-95"
        title="Indicateurs de progression quotidienne"
      >
        {/* SVG Mini Rings */}
        <div className="relative size-6 shrink-0 flex items-center justify-center">
          <svg className="size-6 -rotate-90 transform" viewBox="0 0 60 60">
            {/* Background tracks */}
            <circle cx="30" cy="30" r="24" stroke="currentColor" strokeWidth="5" fill="none" className="text-rose-500/20" />
            <circle cx="30" cy="30" r="18" stroke="currentColor" strokeWidth="5" fill="none" className="text-emerald-500/20" />
            <circle cx="30" cy="30" r="12" stroke="currentColor" strokeWidth="5" fill="none" className="text-cyan-500/20" />

            {/* Active rings */}
            <circle
              cx="30"
              cy="30"
              r="24"
              stroke="#f43f5e"
              strokeWidth="5"
              fill="none"
              strokeDasharray={cRed}
              strokeDashoffset={offsetRed}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
            <circle
              cx="30"
              cy="30"
              r="18"
              stroke="#10b981"
              strokeWidth="5"
              fill="none"
              strokeDasharray={cGreen}
              strokeDashoffset={offsetGreen}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
            <circle
              cx="30"
              cy="30"
              r="12"
              stroke="#06b6d4"
              strokeWidth="5"
              fill="none"
              strokeDasharray={cBlue}
              strokeDashoffset={offsetBlue}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 dark:text-slate-200">
          <Flame className="size-3 text-amber-500 fill-amber-500" />
          <span>{data.streakDays}j</span>
        </div>
      </button>

      {/* Expanded Modal popover */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm animate-fadeIn"
          onClick={() => setExpanded(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-xs">
                  <Flame className="size-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Anneaux de Révision Cnam
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Série active : {data.streakDays} jours d&apos;affilée
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="size-7 rounded-full bg-slate-200/60 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-300 transition-colors cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            </div>

            {/* Big Rings Visualization */}
            <div className="flex items-center justify-center py-2">
              <div className="relative size-36">
                <svg className="size-36 -rotate-90 transform" viewBox="0 0 60 60">
                  {/* Background tracks */}
                  <circle cx="30" cy="30" r="24" stroke="currentColor" strokeWidth="4.5" fill="none" className="text-rose-500/15" />
                  <circle cx="30" cy="30" r="18" stroke="currentColor" strokeWidth="4.5" fill="none" className="text-emerald-500/15" />
                  <circle cx="30" cy="30" r="12" stroke="currentColor" strokeWidth="4.5" fill="none" className="text-cyan-500/15" />

                  {/* Active rings */}
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    stroke="#f43f5e"
                    strokeWidth="4.5"
                    fill="none"
                    strokeDasharray={cRed}
                    strokeDashoffset={offsetRed}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="18"
                    stroke="#10b981"
                    strokeWidth="4.5"
                    fill="none"
                    strokeDasharray={cGreen}
                    strokeDashoffset={offsetGreen}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="12"
                    stroke="#06b6d4"
                    strokeWidth="4.5"
                    fill="none"
                    strokeDasharray={cBlue}
                    strokeDashoffset={offsetBlue}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  {allClosed ? (
                    <div className="animate-bounce text-amber-500">
                      <Trophy className="size-6" />
                    </div>
                  ) : (
                    <span className="text-[10px] font-mono font-bold text-slate-500">
                      {Math.round((pctRed + pctGreen + pctBlue) / 3)}%
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Progress details */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/50">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-rose-500" />
                  <span className="font-semibold text-rose-950 dark:text-rose-100">Capsules 60s écoutées</span>
                </div>
                <span className="font-mono font-bold text-rose-700 dark:text-rose-300">
                  {data.capsulesCount} / 2 {pctRed >= 100 && "✓"}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-emerald-950 dark:text-emerald-100">Sprint Chrono 3 min validé</span>
                </div>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
                  {data.speedRunCount} / 1 {pctGreen >= 100 && "✓"}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/20 border border-cyan-200/80 dark:border-cyan-900/50">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-cyan-500" />
                  <span className="font-semibold text-cyan-950 dark:text-cyan-100">Pièges / Cas résolus</span>
                </div>
                <span className="font-mono font-bold text-cyan-700 dark:text-cyan-300">
                  {data.casesCount} / 1 {pctBlue >= 100 && "✓"}
                </span>
              </div>
            </div>

            {allClosed && (
              <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-emerald-500/15 border border-amber-500/30 text-center text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center justify-center gap-1.5 animate-pulse">
                <Sparkles className="size-4 text-amber-500" />
                <span>Objectif du jour complété ! 3/3 anneaux fermés !</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

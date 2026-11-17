"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Flame, Trophy, Sparkles, X } from "lucide-react";
import type { RingsData } from "./useRingsData";

interface AnneauxRevisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: RingsData;
  pctRed: number;
  pctGreen: number;
  pctBlue: number;
  allClosed: boolean;
  cRed: number;
  cGreen: number;
  cBlue: number;
  offsetRed: number;
  offsetGreen: number;
  offsetBlue: number;
}

export function AnneauxRevisionModal({
  isOpen,
  onClose,
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
}: AnneauxRevisionModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Anneaux de Révision Cnam"
    >
      <div
        className="relative w-full max-w-sm rounded-3xl bg-white/95 dark:bg-slate-900 text-slate-900 dark:text-slate-100 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 p-3.5 sm:p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3 gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="size-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-xs shrink-0">
              <Flame className="size-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                Anneaux de Révision Cnam
              </h3>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono block truncate">
                Série active : {data.streakDays}{" "}
                {data.streakDays > 1 ? "jours d'affilée" : "jour d'affilée"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-7 rounded-full bg-slate-200/70 dark:bg-slate-800 flex items-center justify-center text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Big Rings Visualization */}
        <div className="flex items-center justify-center py-2">
          <div className="relative size-36">
            <svg
              className="size-36 -rotate-90 transform"
              viewBox="0 0 60 60"
            >
              {/* Background tracks */}
              <circle
                cx="30"
                cy="30"
                r="24"
                stroke="currentColor"
                strokeWidth="4.5"
                fill="none"
                className="text-rose-500/15"
              />
              <circle
                cx="30"
                cy="30"
                r="18"
                stroke="currentColor"
                strokeWidth="4.5"
                fill="none"
                className="text-emerald-500/15"
              />
              <circle
                cx="30"
                cy="30"
                r="12"
                stroke="currentColor"
                strokeWidth="4.5"
                fill="none"
                className="text-cyan-500/15"
              />

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
                <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300">
                  {Math.round((pctRed + pctGreen + pctBlue) / 3)}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Progress details */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 min-w-0">
              <span className="size-2.5 rounded-full bg-rose-500 shrink-0" />
              <span className="font-semibold text-slate-900 dark:text-white truncate">
                Capsules 60s consultées
              </span>
            </div>
            <span className="font-mono font-bold text-rose-700 dark:text-rose-300 shrink-0">
              {data.capsulesCount} / 2 {pctRed >= 100 && "✓"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 min-w-0">
              <span className="size-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="font-semibold text-slate-900 dark:text-white truncate">
                Sprint Chrono 3 min validé
              </span>
            </div>
            <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300 shrink-0">
              {data.speedRunCount} / 1 {pctGreen >= 100 && "✓"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 min-w-0">
              <span className="size-2.5 rounded-full bg-cyan-500 shrink-0" />
              <span className="font-semibold text-slate-900 dark:text-white truncate">
                Pièges / Cas résolus
              </span>
            </div>
            <span className="font-mono font-bold text-cyan-700 dark:text-cyan-300 shrink-0">
              {data.casesCount} / 1 {pctBlue >= 100 && "✓"}
            </span>
          </div>
        </div>

        {allClosed && (
          <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-emerald-500/15 border border-amber-500/30 text-center text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center justify-center gap-1.5 animate-pulse">
            <Sparkles className="size-4 text-amber-500 shrink-0" />
            <span>Objectif du jour complété ! 3/3 anneaux fermés !</span>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

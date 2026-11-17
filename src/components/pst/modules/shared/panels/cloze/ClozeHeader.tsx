"use client";

import {
  PenLine,
  Eye,
  EyeOff,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface ClozeHeaderProps {
  mode: "flash" | "input";
  onSetMode: (m: "flash" | "input") => void;
  revealedCount: number;
  totalBlanks: number;
  pctRevealed: number;
  checkedInputsCount: number;
  correctInputsCount: number;
  pctAccuracy: number;
  onRevealAll: () => void;
  onHideAll: () => void;
  onResetAll: () => void;
}

export function ClozeHeader({
  mode,
  onSetMode,
  revealedCount,
  totalBlanks,
  pctRevealed,
  checkedInputsCount,
  correctInputsCount,
  pctAccuracy,
  onRevealAll,
  onHideAll,
  onResetAll,
}: ClozeHeaderProps) {
  return (
    <div className="sticky top-14 z-20 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 shadow-2xs">
            <PenLine className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>
              {mode === "flash"
                ? `Révélés : ${revealedCount} / ${totalBlanks} (${pctRevealed}%)`
                : `Vérifiés : ${checkedInputsCount} / ${totalBlanks}`}
            </span>
          </span>

          {mode === "input" && checkedInputsCount > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 shadow-2xs">
              <CheckCircle2 className="size-3 text-emerald-600 dark:text-emerald-400" />
              <span>
                Score : {correctInputsCount} / {checkedInputsCount} (
                {pctAccuracy}%)
              </span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Toggle Mode Flash / Saisie */}
          <div className="flex items-center gap-1 p-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onSetMode("flash");
              }}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer ${
                mode === "flash"
                  ? "bg-indigo-600 text-white shadow-2xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              Clic Masqué
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onSetMode("input");
              }}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer ${
                mode === "input"
                  ? "bg-indigo-600 text-white shadow-2xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              ⌨️ Saisie Active
            </button>
          </div>

          {mode === "flash" ? (
            <>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  triggerHaptic("selection");
                  onRevealAll();
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
              >
                <Eye className="size-3" />
                <span>Tout révéler</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  triggerHaptic("selection");
                  onHideAll();
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
              >
                <EyeOff className="size-3" />
                <span>Tout masquer</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onResetAll}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <RotateCcw className="size-3" />
              <span>Réinitialiser</span>
            </button>
          )}
        </div>
      </div>

      {/* Minimal Progress Bar */}
      <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${mode === "flash" ? pctRevealed : totalBlanks > 0 ? Math.round((checkedInputsCount * 100) / totalBlanks) : 0}%`,
          }}
        />
      </div>
    </div>
  );
}

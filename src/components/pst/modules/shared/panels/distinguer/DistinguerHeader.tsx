"use client";

import {
  Scale,
  CheckCircle2,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface DistinguerHeaderProps {
  total: number;
  answeredCount: number;
  score: number;
  pctDone: number;
  pctAcc: number;
  mode: "list" | "focus" | "errors";
  onSetMode: (m: "list" | "focus" | "errors") => void;
  wrongCount: number;
  onReset: () => void;
}

export function DistinguerHeader({
  total,
  answeredCount,
  score,
  pctDone,
  pctAcc,
  mode,
  onSetMode,
  wrongCount,
  onReset,
}: DistinguerHeaderProps) {
  return (
    <div className="sticky top-14 z-20 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
            <Scale className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>
              Progression : {answeredCount} / {total} ({pctDone}%)
            </span>
          </span>

          {answeredCount > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="size-3 text-emerald-600" />
              <span>
                Score : {score}/{answeredCount} ({pctAcc}%)
              </span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              triggerHaptic("selection");
              onSetMode("list");
            }}
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 ${
              mode === "list"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            Vue Liste ({total})
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              triggerHaptic("selection");
              onSetMode("focus");
            }}
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 ${
              mode === "focus"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            Focus 1 par 1
          </button>

          {wrongCount > 0 && (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                triggerHaptic("selection");
                onSetMode("errors");
              }}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 ${
                mode === "errors"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800 hover:bg-rose-100"
              }`}
            >
              <AlertTriangle className="size-3" />
              <span>Erreurs ({wrongCount})</span>
            </button>
          )}

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw className="size-3" />
            <span>Nouveau tirage</span>
          </button>
        </div>
      </div>

      {/* Minimal Progress Bar */}
      <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${pctDone}%` }}
        />
      </div>
    </div>
  );
}

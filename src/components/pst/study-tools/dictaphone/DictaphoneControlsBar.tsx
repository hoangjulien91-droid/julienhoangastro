"use client";

import { Mic, MicOff, RotateCcw, Gauge } from "lucide-react";

interface DictaphoneControlsBarProps {
  timeRemaining: number;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onReset: () => void;
  motsParMinute: number;
  scorePercent: number;
  countDetected: number;
  totalKeywords: number;
  formatTimer: (s: number) => string;
}

export function DictaphoneControlsBar({
  timeRemaining,
  isRecording,
  onStartRecording,
  onStopRecording,
  onReset,
  motsParMinute,
  scorePercent,
  countDetected,
  totalKeywords,
  formatTimer,
}: DictaphoneControlsBarProps) {
  return (
    <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-50/90 via-white to-indigo-50/90 dark:from-purple-950/40 dark:via-slate-900 dark:to-indigo-950/40 border border-purple-200/80 dark:border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
      <div className="flex items-center justify-between sm:justify-start gap-4">
        <div
          className={`font-mono text-2xl sm:text-3xl font-extrabold ${
            timeRemaining <= 20
              ? "text-rose-600 dark:text-rose-400 animate-pulse"
              : "text-purple-700 dark:text-purple-300"
          }`}
        >
          {formatTimer(timeRemaining)}
        </div>

        <div className="flex items-center gap-2">
          {!isRecording ? (
            <button
              onClick={onStartRecording}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-purple-500/20 dark:shadow-purple-950/50 cursor-pointer active:scale-95 transition-all"
            >
              <Mic className="h-4 w-4" />
              <span>Démarrer l&apos;enregistrement</span>
            </button>
          ) : (
            <button
              onClick={onStopRecording}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-rose-500/20 dark:shadow-rose-950/50 cursor-pointer active:scale-95 transition-all"
            >
              <MicOff className="h-4 w-4" />
              <span>Arrêter l&apos;oral</span>
            </button>
          )}

          <button
            onClick={onReset}
            className="p-2 rounded-xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            title="Réinitialiser"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:gap-5">
        <div className="text-left sm:text-right">
          <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center sm:justify-end gap-1">
            <Gauge className="size-3 text-purple-600 dark:text-purple-400" />
            <span>Cadence Vocale</span>
          </span>
          <span
            className={`text-sm font-bold font-mono ${
              motsParMinute >= 110 && motsParMinute <= 160
                ? "text-emerald-600 dark:text-emerald-400"
                : motsParMinute > 160
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-slate-700 dark:text-slate-300"
            }`}
          >
            {motsParMinute > 0 ? `${motsParMinute} mots/min` : "— mots/min"}{" "}
            <span className="text-[10px] font-normal text-slate-500">
              (cible 120-150)
            </span>
          </span>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
            Complétude Conceptuelle
          </span>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            {scorePercent}% ({countDetected}/{totalKeywords} concepts)
          </span>
        </div>
      </div>
    </div>
  );
}

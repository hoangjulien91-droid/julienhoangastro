"use client";

import { playClickSound } from "@/lib/pst/audio-feedback";

interface QcmHeaderBarProps {
  answeredCount: number;
  total: number;
  pctDone: number;
  correct: number;
  pctAccuracy: number;
  poolLimit: 5 | 10 | "all";
  setPoolLimit: (lim: 5 | 10 | "all") => void;
  mode: "list" | "focus" | "errors";
  setMode: (m: "list" | "focus" | "errors") => void;
  wrongCount: number;
  totalDataLength: number;
  onReset: () => void;
}

export function QcmHeaderBar({
  answeredCount,
  total,
  pctDone,
  correct,
  pctAccuracy,
  poolLimit,
  setPoolLimit,
  mode,
  setMode,
  wrongCount,
  totalDataLength,
  onReset,
}: QcmHeaderBarProps) {
  return (
    <div className="sticky top-14 z-20 mb-4 p-3.5 sm:p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs transition-all space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
            QCM · {answeredCount} / {total} traités ({pctDone}%)
          </span>
          {answeredCount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/30">
              Score : {correct} / {answeredCount} ({pctAccuracy}%)
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {([5, 10, "all"] as const).map((lim) => (
            <button
              key={String(lim)}
              type="button"
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer ${
                poolLimit === lim
                  ? "bg-amber-500 text-slate-950 shadow-2xs"
                  : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/70"
              }`}
              onClick={() => {
                playClickSound();
                setPoolLimit(lim);
              }}
              title={
                lim === "all"
                  ? `Questionnaire complet (${totalDataLength} questions)`
                  : `Session express de ${lim} questions (priorise vos erreurs)`
              }
            >
              {lim === 5
                ? "⚡️ Sprint 5Q"
                : lim === 10
                  ? "Sprint 10Q"
                  : `Complet (${totalDataLength})`}
            </button>
          ))}
          <button
            type="button"
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
              mode === "list"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/80"
            }`}
            onClick={() => {
              playClickSound();
              setMode("list");
            }}
          >
            Liste
          </button>
          <button
            type="button"
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
              mode === "focus"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/80"
            }`}
            onClick={() => {
              playClickSound();
              setMode("focus");
            }}
          >
            Focus 1 par 1
          </button>
          {wrongCount > 0 && (
            <button
              type="button"
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                mode === "errors"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30"
              }`}
              onClick={() => {
                playClickSound();
                setMode("errors");
              }}
            >
              Erreurs ({wrongCount})
            </button>
          )}
          <button
            type="button"
            className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/80 transition-all cursor-pointer"
            onClick={onReset}
            title="Re-mélanger les questions et repartir à zéro"
          >
            ↻ Nouveau tirage
          </button>
        </div>
      </div>

      <div className="h-1.5 w-full bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="bg-accent h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${pctDone}%` }}
        />
      </div>
    </div>
  );
}

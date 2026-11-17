"use client";

import React from "react";
import { Quote, CheckCircle2 } from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface QuiCitationsToolbarProps {
  answeredCount: number;
  total: number;
  score: number;
  poolLimit: 5 | 10 | "all";
  onSetPoolLimit: (limit: 5 | 10 | "all") => void;
  mode: "list" | "focus" | "errors";
  onSetMode: (mode: "list" | "focus" | "errors") => void;
  wrongCount: number;
  onReshuffle: () => void;
}

export function QuiCitationsToolbar({
  answeredCount,
  total,
  score,
  poolLimit,
  onSetPoolLimit,
  mode,
  onSetMode,
  wrongCount,
  onReshuffle,
}: QuiCitationsToolbarProps) {
  const pctDone = total > 0 ? Math.round((answeredCount * 100) / total) : 0;
  const pctAccuracy =
    answeredCount > 0 ? Math.round((score * 100) / answeredCount) : 0;

  return (
    <div className="sticky top-14 z-20 mb-4 p-3.5 sm:p-4 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs transition-all space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5 shadow-2xs">
            <Quote className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>
              Citations · {answeredCount} / {total} ({pctDone}%)
            </span>
          </span>
          {answeredCount > 0 && (
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1 shadow-2xs">
              <CheckCircle2 className="size-3 text-emerald-600" />
              <span>
                Score : {score}/{answeredCount} ({pctAccuracy}%)
              </span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Sélecteur Sprint 5 / 10 / Tout */}
          <div className="flex items-center gap-1 p-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
            {(["all", 5, 10] as const).map((limit) => {
              const label =
                limit === "all" ? "Tout" : limit === 5 ? "⚡️ 5Q" : "⚡️ 10Q";
              const isActive = poolLimit === limit;
              return (
                <button
                  key={String(limit)}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onSetPoolLimit(limit);
                  }}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-2xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
              mode === "list"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/80"
            }`}
            onClick={() => {
              playClickSound();
              onSetMode("list");
            }}
          >
            Vue Liste ({total})
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
              onSetMode("focus");
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
                onSetMode("errors");
              }}
            >
              Erreurs ({wrongCount})
            </button>
          )}
          <button
            type="button"
            className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/80 transition-all cursor-pointer"
            onClick={() => {
              playClickSound();
              onReshuffle();
            }}
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

"use client";

import { ArrowRight, BarChart2, TrendingUp } from "lucide-react";
import type { AMap } from "@/lib/pst/types";
import type { PstStore } from "@/lib/pst/store";
import { QUIZ_LABELS } from "@/lib/pst/data/badges";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface AxisRow {
  ax: string;
  mast: number;
  tot: number;
}

interface DashboardProgressAnalyticsProps {
  store: PstStore;
  authors: AMap;
  axisRows: AxisRow[];
  masteredCards: number;
  totalCards: number;
  onGoTab: (panel: string) => void;
}

export function DashboardProgressAnalytics({
  store,
  authors,
  axisRows,
  masteredCards,
  totalCards,
  onGoTab,
}: DashboardProgressAnalyticsProps) {
  return (
    <>
      {/* Progression par axe théorique */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-border bg-card shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20 inline-flex items-center gap-1.5 shadow-2xs">
            <BarChart2 className="size-3 text-slate-600 dark:text-slate-400" />
            <span>Progression par axe théorique</span>
          </span>
          <span className="text-[11px] font-mono text-muted-foreground">
            {masteredCards}/{totalCards} cartes acquises
          </span>
        </div>

        <h3 className="text-sm font-serif font-bold text-foreground m-0">
          Cartes maîtrisées par perspective
        </h3>

        {axisRows.length === 0 ? (
          <p className="text-xs text-muted-foreground italic m-0">
            Marquez vos premières cartes pour visualiser votre progression par
            axe théorique.
          </p>
        ) : (
          <div className="space-y-2.5 pt-1">
            {axisRows.map((r) => {
              const pct = r.tot ? Math.round((100 * r.mast) / r.tot) : 0;
              return (
                <div key={r.ax} className="flex items-center gap-3 text-xs">
                  <span className="w-36 sm:w-44 font-semibold text-foreground truncate shrink-0">
                    {authors[r.ax]}
                  </span>
                  <div className="flex-1 h-2 bg-muted/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-12 text-right font-mono font-bold text-accent shrink-0">
                    {r.mast}/{r.tot}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Suivi des performances & QCM */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-border bg-card shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1.5 shadow-2xs">
            <TrendingUp className="size-3 text-amber-600 dark:text-amber-400" />
            <span>Suivi des performances QCM</span>
          </span>
        </div>

        <h3 className="text-sm font-serif font-bold text-foreground m-0">
          Derniers scores obtenus
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {Object.keys(QUIZ_LABELS).map((m) => {
            const s = store.getScore(m);
            const hist = store.getScoreHistory(m);
            const last = hist[hist.length - 1];
            const prev = hist[hist.length - 2];
            const trend =
              last && prev
                ? last.pct > prev.pct
                  ? " ↗"
                  : last.pct < prev.pct
                    ? " ↘"
                    : " →"
                : "";

            const scoreBadge = !s
              ? "text-muted-foreground"
              : s.pct >= 80
                ? "text-emerald-700 dark:text-emerald-400"
                : s.pct >= 60
                  ? "text-amber-700 dark:text-amber-400"
                  : "text-rose-700 dark:text-rose-400";

            return (
              <div
                key={m}
                className="p-3 rounded-2xl border border-border bg-muted/20 text-center space-y-0.5"
                title={
                  hist.length
                    ? `Dernières tentatives : ${hist
                        .slice(-5)
                        .map((h) => h.pct + "%")
                        .join(" → ")}`
                    : undefined
                }
              >
                <div className={`font-mono text-xl font-black ${scoreBadge}`}>
                  {s ? `${s.pct}%${trend}` : "—"}
                </div>
                <div className="text-[11px] font-mono text-muted-foreground truncate">
                  {QUIZ_LABELS[m]}
                </div>
              </div>
            );
          })}
        </div>

        {Object.keys(QUIZ_LABELS).every((m) => !store.getScore(m)) && (
          <div className="flex items-center gap-2 pt-1 flex-wrap text-xs">
            <span className="text-muted-foreground">
              Aucun score encore enregistré pour ce module.
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-accent hover:underline cursor-pointer"
              onClick={() => {
                triggerHaptic("light");
                playClickSound();
                onGoTab("qcm");
              }}
            >
              <span>Lancer le premier QCM</span>
              <ArrowRight className="size-3" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

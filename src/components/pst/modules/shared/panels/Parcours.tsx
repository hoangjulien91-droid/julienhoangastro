"use client";

import { Calendar, CheckCircle2, Flag, ArrowRight, Check } from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import type { ParcoursPhase } from "@/lib/pst/types";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface ParcoursProps {
  store: PstStore;
  onStoreChange: () => void;
  onGoTab: (panel: string) => void;
  data: ParcoursPhase[];
  examDate: string;
  hint: string;
  examLabel: string;
}

export function Parcours({
  store,
  onStoreChange,
  onGoTab,
  data,
  examDate,
  hint,
  examLabel,
}: ParcoursProps) {
  const days = Math.ceil(
    (new Date(examDate).getTime() - Date.now()) / 86400000,
  );
  const current = days <= 3 ? 3 : days <= 10 ? 2 : days <= 20 ? 1 : 0;
  const dStr = days > 0 ? `J-${days}` : days === 0 ? "Jour J" : "Examen passé";
  const marks = store.getMarks();

  const totalTasks = data.reduce((acc, ph) => acc + ph.items.length, 0);
  const doneTasks = data.reduce(
    (acc, ph) =>
      acc +
      ph.items.filter((_, ti) => !!marks[`parcours_${ph.id}_${ti}`]).length,
    0,
  );
  const pct = totalTasks > 0 ? Math.round((doneTasks * 100) / totalTasks) : 0;

  function toggleItem(key: string, checked: boolean) {
    if (checked) {
      triggerHaptic("success");
      playSuccessSound();
    } else {
      triggerHaptic("light");
      playClickSound();
    }
    store.setMark(key, checked);
    onStoreChange();
  }

  return (
    <div className="space-y-4">
      {hint && (
        <p className="text-xs text-muted-foreground italic leading-relaxed m-0 px-1">
          {hint}
        </p>
      )}

      <div id="parcoursHost" className="space-y-4">
        {/* Top Summary & Countdown Card */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5 shadow-2xs">
                <Calendar className="size-3 text-indigo-600 dark:text-indigo-400" />
                <span>{examLabel}</span>
              </span>
              <div className="font-serif text-3xl font-black text-foreground">
                {dStr}
              </div>
            </div>

            <div className="text-right space-y-0.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-bold block">
                Plan d&apos;attaque validé
              </span>
              <span className="font-mono text-base sm:text-lg font-black text-foreground">
                {doneTasks} / {totalTasks} étapes ({pct}%)
              </span>
            </div>
          </div>

          <div className="h-2 w-full bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="bg-accent h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Phases list */}
        {data.map((ph, pi) => {
          const isNow = pi === current;
          const phDone = ph.items.filter(
            (_, ti) => !!marks[`parcours_${ph.id}_${ti}`],
          ).length;

          return (
            <div
              key={ph.id}
              className={`p-5 rounded-2xl sm:rounded-3xl border transition-all space-y-3.5 shadow-2xs ${
                isNow
                  ? "border-accent/80 bg-accent/5 shadow-xs"
                  : "border-border bg-card/80"
              }`}
            >
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-serif font-bold text-foreground m-0">
                    {ph.title}
                  </h4>
                  {isNow && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-accent/15 text-accent border border-accent/30 shadow-2xs">
                      En cours maintenant
                    </span>
                  )}
                </div>

                <span className="text-[11px] font-mono text-muted-foreground">
                  {ph.fenetre || "Plan"} · {phDone}/{ph.items.length} validées
                </span>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed m-0">
                {ph.desc}
              </p>

              {/* Quick Jump Tab Pills */}
              {ph.onglets.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {ph.onglets.map(([target, label]) => (
                    <button
                      key={target}
                      type="button"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border/80 transition-all cursor-pointer shadow-2xs"
                      onClick={() => {
                        triggerHaptic("light");
                        playClickSound();
                        onGoTab(target);
                      }}
                    >
                      <span>{label}</span>
                      <ArrowRight className="size-3 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              )}

              {/* Checklist items */}
              <div className="space-y-1.5 pt-1">
                {ph.items.map((t, ti) => {
                  const key = `parcours_${ph.id}_${ti}`;
                  const done = !!marks[key];
                  return (
                    <label
                      key={ti}
                      className="flex items-start gap-2.5 text-xs text-foreground cursor-pointer select-none py-1 hover:text-accent transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={done}
                        className="mt-0.5 size-4 rounded accent-accent cursor-pointer"
                        onChange={(e) => toggleItem(key, e.target.checked)}
                      />
                      <span
                        className={
                          done
                            ? "line-through text-muted-foreground"
                            : "leading-relaxed"
                        }
                      >
                        {t}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

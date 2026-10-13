"use client";

import type { PstStore } from "@/lib/pst/store";

export interface DebatAxis {
  axis: string;
  title: string;
  tension: string;
  example: string;
  exampleColor: string;
}

interface DebatsProps {
  store: PstStore;
  onStoreChange: () => void;
  data: DebatAxis[];
  hint: string;
}

export function Debats({ store, onStoreChange, data, hint }: DebatsProps) {
  const state = store.getDebats();
  const total = data.length;
  const active = data.filter((_, i) => !!state[i]).length;
  const pct = total ? Math.round((100 * active) / total) : 0;

  function toggle(i: number, checked: boolean) {
    store.setDebat(i, checked);
    onStoreChange();
  }

  return (
    <div>
      <p className="hint">{hint}</p>

      <div
        className="debat-progress-card p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs mb-5 flex flex-col gap-2.5"
      >
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="font-bold text-slate-800 dark:text-slate-200">
            Débats &amp; Controverses de Métier
          </span>
          <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
            {active} / {total} ({pct}%)
          </span>
        </div>
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-600 dark:bg-amber-500 rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="debats-container space-y-3.5">
        {data.map((axe, i) => (
          <div
            key={i}
            className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col gap-3 relative overflow-hidden transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {axe.axis}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 m-0">
                  {axe.title}
                </h3>
              </div>

              <label
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer shrink-0 select-none active:scale-95 transition-all shadow-2xs"
              >
                <input
                  type="checkbox"
                  checked={!!state[i]}
                  onChange={(e) => toggle(i, e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 size-3.5 cursor-pointer"
                />
                <span>Maîtrisé</span>
              </label>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed m-0">
              <b className="text-slate-800 dark:text-slate-200">Tension centrale :</b>{" "}
              <span dangerouslySetInnerHTML={{ __html: axe.tension }} />
            </p>

            <div
              className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed"
              style={{ borderLeftColor: axe.exampleColor, borderLeftWidth: 3 }}
            >
              <b className="text-slate-900 dark:text-slate-100">Exemple d&apos;examen :</b> {axe.example}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { Monitor, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import type { AuditScenario } from "@/lib/pst/data/pst124-audit-data";

interface AuditStats {
  acceptability: number;
  alienation: number;
  pouvoirAgir: number;
}

interface AuditDigitalStepCardProps {
  sc: AuditScenario;
  step: number;
  totalSteps: number;
  stats: AuditStats;
  selected: number | null;
  onChoose: (idx: number) => void;
  onNext: () => void;
}

export function AuditDigitalStepCard({
  sc,
  step,
  totalSteps,
  stats,
  selected,
  onChoose,
  onNext,
}: AuditDigitalStepCardProps) {
  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
          <Monitor className="size-3 text-indigo-600 dark:text-indigo-400" />
          <span>
            Simulation d&apos;Audit Digital · Étape {step + 1} / {totalSteps}
          </span>
        </span>

        {/* Live Gauges */}
        <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono font-bold">
          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            Accept. {stats.acceptability}%
          </span>
          <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            Alién. {stats.alienation}%
          </span>
          <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            Agir {stats.pouvoirAgir}%
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 m-0">
          {sc.title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed font-medium">
          {sc.desc}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {sc.opts.map((o, idx) => {
          const isChosen = selected === idx;
          let btnCls =
            "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200";

          if (selected !== null) {
            if (isChosen) {
              btnCls =
                o.pouvoir > 0
                  ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-bold"
                  : "bg-rose-50/80 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200 font-semibold";
            } else {
              btnCls =
                "opacity-40 bg-slate-50/30 dark:bg-slate-800/20 border-slate-200/40 text-slate-500";
            }
          }

          return (
            <button
              key={idx}
              disabled={selected !== null}
              onClick={() => onChoose(idx)}
              className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed transition-all cursor-pointer flex items-start gap-2.5 active:scale-99 ${btnCls}`}
            >
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 shrink-0 mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{o.text}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback on selection */}
      {selected !== null && (
        <div className="space-y-3 pt-2 animate-fadeIn border-t border-slate-200/60 dark:border-slate-800">
          <div
            className={`p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
              (sc.opts[selected]?.pouvoir ?? 0) > 0
                ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200"
                : "bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200"
            }`}
          >
            <div className="font-bold mb-1 flex items-center gap-1.5">
              {(sc.opts[selected]?.pouvoir ?? 0) > 0 ? (
                <>
                  <CheckCircle2 className="size-3.5 text-emerald-600" />
                  <span>Analyse clinique pertinente</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="size-3.5 text-rose-600" />
                  <span>Effet pervers sur l&apos;activité</span>
                </>
              )}
            </div>
            <p className="m-0 leading-relaxed">{sc.opts[selected]?.feedback}</p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <span>
                {step + 1 >= totalSteps
                  ? "Voir le bilan final"
                  : "Étape suivante"}
              </span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

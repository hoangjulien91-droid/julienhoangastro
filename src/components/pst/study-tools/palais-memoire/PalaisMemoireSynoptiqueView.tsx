"use client";

import { Sparkles, Eye } from "lucide-react";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";
import { DIMENSIONS_COMPARATIVES } from "@/lib/pst/data/palais-memoire-data";

interface PalaisMemoireSynoptiqueViewProps {
  scope: "s1" | "s2" | "all";
  onSelectScope: (scope: "s1" | "s2" | "all") => void;
  onOpenSchema: (schemaId: string) => void;
}

export function PalaisMemoireSynoptiqueView({
  scope,
  onSelectScope,
  onOpenSchema,
}: PalaisMemoireSynoptiqueViewProps) {
  return (
    <div className="space-y-5">
      {/* Scope Switcher (S1 / S2 / All) */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-xs font-semibold overflow-x-auto scrollbar-none whitespace-nowrap max-w-full">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            triggerHaptic("selection");
            onSelectScope("s1");
          }}
          className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            scope === "s1"
              ? "bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-2xs font-bold"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
          }`}
        >
          Semestre 1 (PST106 · 108 · 123)
        </button>
        <button
          type="button"
          onClick={() => {
            playClickSound();
            triggerHaptic("selection");
            onSelectScope("s2");
          }}
          className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            scope === "s2"
              ? "bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-2xs font-bold"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
          }`}
        >
          Semestre 2 (PST120 · 124)
        </button>
        <button
          type="button"
          onClick={() => {
            playClickSound();
            triggerHaptic("selection");
            onSelectScope("all");
          }}
          className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            scope === "all"
              ? "bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-2xs font-bold"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
          }`}
        >
          Intégrale RNCP 7 (5 UE)
        </button>
      </div>

      {/* Pillar Headers */}
      <div
        className={`grid gap-3 ${
          scope === "s1"
            ? "grid-cols-1 md:grid-cols-3"
            : scope === "s2"
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
        }`}
      >
        {(scope === "s1" || scope === "all") && (
          <>
            <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-700 dark:text-cyan-300">
                  PST106
                </span>
                <span className="text-xs font-extrabold text-cyan-900 dark:text-cyan-200">
                  Ergonomie &amp; Clinique
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 m-0">
                Wisner, Leplat, Clot
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-indigo-700 dark:text-indigo-300">
                  PST108
                </span>
                <span className="text-xs font-extrabold text-indigo-900 dark:text-indigo-200">
                  Sociologie &amp; Comm.
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 m-0">
                Bourdieu, Habermas, Valls
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-700 dark:text-amber-300">
                  PST123
                </span>
                <span className="text-xs font-extrabold text-amber-900 dark:text-amber-200">
                  Identités &amp; Emploi
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 m-0">
                Dubar, Sainsaulieu, Hughes
              </p>
            </div>
          </>
        )}

        {(scope === "s2" || scope === "all") && (
          <>
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-rose-700 dark:text-rose-300">
                  PST120
                </span>
                <span className="text-xs font-extrabold text-rose-900 dark:text-rose-200">
                  Psychodynamique S2
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 m-0">
                Dejours, Molinier, Le Guillant
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 dark:text-emerald-300">
                  PST124
                </span>
                <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-200">
                  Digital &amp; Usages S2
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 m-0">
                Bobillier-Chaumon, Rabardel
              </p>
            </div>
          </>
        )}
      </div>

      {/* Rows of comparative dimensions */}
      <div className="space-y-4">
        {DIMENSIONS_COMPARATIVES.map((dim, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 space-y-3"
          >
            <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 m-0">
              <Sparkles className="size-4 text-purple-600" />
              <span>{dim.dimension}</span>
            </h4>

            <div
              className={`grid gap-3 pt-1 ${
                scope === "s1"
                  ? "grid-cols-1 md:grid-cols-3"
                  : scope === "s2"
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
              }`}
            >
              {(scope === "s1" || scope === "all") && (
                <>
                  {/* PST106 Column */}
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-cyan-600 block">
                        PST106 · {dim.pst106.conceptCle}
                      </span>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug m-0">
                        {dim.pst106.focus}
                      </p>
                      <p className="text-[10.5px] italic text-slate-500 m-0 font-serif">
                        « {dim.pst106.formule} »
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenSchema(dim.pst106.schemaId)}
                      className="w-full inline-flex items-center justify-between px-2.5 py-1 rounded-lg text-[10px] font-bold bg-cyan-500/10 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-500/20 transition-all cursor-pointer mt-2"
                    >
                      <span>{dim.pst106.schemaNom}</span>
                      <Eye className="size-3" />
                    </button>
                  </div>

                  {/* PST108 Column */}
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-indigo-600 block">
                        PST108 · {dim.pst108.conceptCle}
                      </span>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug m-0">
                        {dim.pst108.focus}
                      </p>
                      <p className="text-[10.5px] italic text-slate-500 m-0 font-serif">
                        « {dim.pst108.formule} »
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenSchema(dim.pst108.schemaId)}
                      className="w-full inline-flex items-center justify-between px-2.5 py-1 rounded-lg text-[10px] font-bold bg-indigo-500/10 text-indigo-800 dark:text-indigo-200 hover:bg-indigo-500/20 transition-all cursor-pointer mt-2"
                    >
                      <span>{dim.pst108.schemaNom}</span>
                      <Eye className="size-3" />
                    </button>
                  </div>

                  {/* PST123 Column */}
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-amber-600 block">
                        PST123 · {dim.pst123.conceptCle}
                      </span>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug m-0">
                        {dim.pst123.focus}
                      </p>
                      <p className="text-[10.5px] italic text-slate-500 m-0 font-serif">
                        « {dim.pst123.formule} »
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenSchema(dim.pst123.schemaId)}
                      className="w-full inline-flex items-center justify-between px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500/10 text-amber-800 dark:text-amber-200 hover:bg-amber-500/20 transition-all cursor-pointer mt-2"
                    >
                      <span>{dim.pst123.schemaNom}</span>
                      <Eye className="size-3" />
                    </button>
                  </div>
                </>
              )}

              {(scope === "s2" || scope === "all") && (
                <>
                  {/* PST120 Column */}
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-rose-600 block">
                        PST120 · {dim.pst120.conceptCle}
                      </span>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug m-0">
                        {dim.pst120.focus}
                      </p>
                      <p className="text-[10.5px] italic text-slate-500 m-0 font-serif">
                        « {dim.pst120.formule} »
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenSchema(dim.pst120.schemaId)}
                      className="w-full inline-flex items-center justify-between px-2.5 py-1 rounded-lg text-[10px] font-bold bg-rose-500/10 text-rose-800 dark:text-rose-200 hover:bg-rose-500/20 transition-all cursor-pointer mt-2"
                    >
                      <span>{dim.pst120.schemaNom}</span>
                      <Eye className="size-3" />
                    </button>
                  </div>

                  {/* PST124 Column */}
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-emerald-600 block">
                        PST124 · {dim.pst124.conceptCle}
                      </span>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug m-0">
                        {dim.pst124.focus}
                      </p>
                      <p className="text-[10.5px] italic text-slate-500 m-0 font-serif">
                        « {dim.pst124.formule} »
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenSchema(dim.pst124.schemaId)}
                      className="w-full inline-flex items-center justify-between px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-500/20 transition-all cursor-pointer mt-2"
                    >
                      <span>{dim.pst124.schemaNom}</span>
                      <Eye className="size-3" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

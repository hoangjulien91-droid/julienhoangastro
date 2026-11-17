"use client";

import React from "react";
import {
  ANTISECHE_HISTOIRE,
  ANTISECHE_MATRICE,
} from "@/lib/pst/data/pst106-antiseche";

interface AntisecheMatriceSectionProps {
  mask: (text: string) => React.ReactNode;
}

export function AntisecheMatriceSection({
  mask,
}: AntisecheMatriceSectionProps) {
  return (
    <>
      {/* SECTION 1: HISTOIRE & PSYCHOTECHNIQUE */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1.5">
            <span>① Histoire &amp; Psychotechnique</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
            Question probable 1
          </span>
        </div>
        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full text-xs sm:text-sm">
            <tbody>
              {ANTISECHE_HISTOIRE.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-200/70 dark:border-slate-800 last:border-0"
                >
                  <th
                    scope="row"
                    className="text-left font-semibold py-1.5 pr-3 text-slate-900 dark:text-slate-200"
                  >
                    {row.th}
                  </th>
                  <td
                    className="py-1.5 text-slate-700 dark:text-slate-300"
                    dangerouslySetInnerHTML={{ __html: row.td }}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: LA MATRICE 3 COURANTS */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5">
            <span>② La Matrice Clinique — 3 Courants</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
            Cœur de l&apos;Examen
          </span>
        </div>
        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-700">
                {ANTISECHE_MATRICE.headers.map((h, i) => (
                  <th
                    key={i}
                    className={`text-left py-2 px-2.5 font-bold ${
                      i === 1
                        ? "cErg text-blue-700 dark:text-blue-400"
                        : i === 2
                          ? "cAct text-emerald-700 dark:text-emerald-400"
                          : i === 3
                            ? "cPsy text-purple-700 dark:text-purple-400"
                            : "text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ANTISECHE_MATRICE.rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-200/60 dark:border-slate-800"
                >
                  <th
                    scope="row"
                    className="text-left py-2 px-2.5 font-semibold text-slate-900 dark:text-slate-100"
                  >
                    {row.axe}
                  </th>
                  <td className="cErg py-2 px-2.5 text-slate-700 dark:text-slate-300">
                    {mask(row.erg)}
                  </td>
                  <td className="cAct py-2 px-2.5 text-slate-700 dark:text-slate-300">
                    {mask(row.act)}
                  </td>
                  <td className="cPsy py-2 px-2.5 text-slate-700 dark:text-slate-300">
                    {mask(row.psy)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

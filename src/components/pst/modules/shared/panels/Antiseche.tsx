"use client";

import { useState } from "react";
import { FileText, Printer, Eye, EyeOff } from "lucide-react";
import {
  playClickSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface TableGroup {
  sectionTitle: string;
  headers: string[];
  rows: string[][];
}

interface AntisecheProps {
  title: string;
  subtitle: string;
  groups: TableGroup[];
}

export function Antiseche({ title, subtitle, groups }: AntisecheProps) {
  const [hideAnswers, setHideAnswers] = useState(false);

  function handlePrint() {
    triggerHaptic("selection");
    document.body.classList.add("printing-anti");
    window.print();
    setTimeout(() => document.body.classList.remove("printing-anti"), 500);
  }

  return (
    <div className="space-y-4">
      <p className="hint">
        Une <b>antisèche condensée</b>. Imprime-la (ou enregistre-la en PDF) pour t&apos;entraîner à la reproduire de mémoire ou l&apos;utiliser en support papier.
      </p>

      {/* Action Toolbar */}
      <div className="no-print flex items-center gap-2.5 flex-wrap">
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
        >
          <Printer className="size-3.5" />
          <span>Imprimer en PDF</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            triggerHaptic("selection");
            setHideAnswers((h) => !h);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
        >
          {hideAnswers ? (
            <>
              <Eye className="size-3.5" />
              <span>Afficher les réponses</span>
            </>
          ) : (
            <>
              <EyeOff className="size-3.5" />
              <span>Mode Test (Masquer les réponses)</span>
            </>
          )}
        </button>
      </div>

      {/* Main Sheet Card */}
      <div
        id="antiSheet"
        className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5 ${
          hideAnswers ? "hide-answers" : ""
        }`}
      >
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200/60 dark:border-slate-800">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
            <FileText className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Synthèse Comparative Examen Cnam</span>
          </span>

          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold uppercase">
            Aide-mémoire express
          </span>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 m-0">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 m-0">
            {subtitle}
          </p>
        </div>

        {groups.map((group, gi) => (
          <div key={gi} className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-indigo-500" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 m-0">
                {group.sectionTitle}
              </h3>
            </div>

            <div className="w-full overflow-x-auto scrollbar-none rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200/70 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/60">
                    {group.headers.map((h, hi) => (
                      <th
                        key={hi}
                        className="py-2.5 px-3.5 font-mono text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                  {group.rows.map((row, ri) => (
                    <tr
                      key={ri}
                      className="hover:bg-slate-100/40 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <th
                        scope="row"
                        className="py-2.5 px-3.5 font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap"
                      >
                        {row[0]}
                      </th>
                      {row.slice(1).map((cell, ci) => (
                        <td
                          key={ci}
                          className="py-2.5 px-3.5 text-slate-700 dark:text-slate-300 leading-relaxed"
                        >
                          <span className="ans">{cell}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

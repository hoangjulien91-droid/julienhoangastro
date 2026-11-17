"use client";

import React from "react";
import type { Pst108TeacherAd } from "@/lib/pst/data/pst108-ad";

interface VallsTheorieTabProps {
  slideMasterclass?: Pst108TeacherAd["slideMasterclass"];
}

export const VallsTheorieTab: React.FC<VallsTheorieTabProps> = ({
  slideMasterclass,
}) => {
  if (!slideMasterclass) return null;

  return (
    <div className="space-y-4">
      <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-indigo-500/20 shadow-xs space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
            Cadre Conceptuel Officiel M. Francis Valls
          </span>
          <h4 className="text-base sm:text-lg font-serif font-black text-slate-900 dark:text-white m-0 mt-0.5">
            {slideMasterclass.titre}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {slideMasterclass.axes.map((axe) => (
            <div
              key={axe.num}
              className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="size-6 rounded-full bg-indigo-600 text-white font-mono text-xs font-black flex items-center justify-center shrink-0">
                    {axe.num}
                  </span>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight m-0">
                    {axe.titre}
                  </h5>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {axe.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                <div className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-400">
                  Points clés du cours :
                </div>
                <ul className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1 pl-3.5 list-disc">
                  {axe.notionsCles.map((nc, idx) => (
                    <li key={idx} className="leading-snug">
                      {nc}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1 pt-1">
                  {axe.auteurs.map((aut, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-200/70 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    >
                      {aut}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

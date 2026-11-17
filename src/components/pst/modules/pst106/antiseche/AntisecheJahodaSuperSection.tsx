"use client";

import React from "react";
import {
  ANTISECHE_JAHODA,
  ANTISECHE_SUPER,
  ANTISECHE_HOFSTEDE,
} from "@/lib/pst/data/pst106-antiseche";

interface AntisecheJahodaSuperSectionProps {
  mask: (text: string) => React.ReactNode;
}

export function AntisecheJahodaSuperSection({
  mask,
}: AntisecheJahodaSuperSectionProps) {
  return (
    <>
      {/* SECTION 4: FONCTIONS LATENTES DU TRAVAIL & MARIENTHAL (MARIE JAHODA) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-50 dark:via-slate-900 to-amber-500/5 border border-amber-500/30">
        <div className="sec font-bold text-amber-800 dark:text-amber-400 text-xs sm:text-sm uppercase tracking-wide mb-1.5">
          ④ {ANTISECHE_JAHODA.titre}
        </div>
        <p
          className="text-xs text-slate-700 dark:text-slate-300 mb-3"
          dangerouslySetInnerHTML={{ __html: ANTISECHE_JAHODA.intro }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 mb-3">
          {ANTISECHE_JAHODA.fonctions.map((f) => (
            <div
              key={f.num}
              className="p-3 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                  {f.num}
                </span>
                <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                  {f.label}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                {mask(f.desc)}
              </p>
            </div>
          ))}
        </div>

        <p
          className="text-xs text-slate-600 dark:text-slate-400 italic pt-1 border-t border-amber-200/60 dark:border-amber-900/40"
          dangerouslySetInnerHTML={{
            __html: ANTISECHE_JAHODA.conclusionMarienthal,
          }}
        />
      </div>

      {/* SECTION 5: STADES DE CARRIERE & CULTURE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Donald Super */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-2.5">
          <div className="sec font-bold text-amber-700 dark:text-amber-400 text-xs sm:text-sm uppercase tracking-wide">
            ⑤ {ANTISECHE_SUPER.titre}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ANTISECHE_SUPER.stades.map((st) => (
              <div
                key={st.nom}
                className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
              >
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                  <span>{st.nom}</span>
                  <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono">
                    {st.age}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-tight">
                  {mask(st.desc)}
                </p>
              </div>
            ))}
          </div>
          <p
            className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1"
            dangerouslySetInnerHTML={{ __html: ANTISECHE_SUPER.transitions }}
          />
        </div>

        {/* Geert Hofstede & Louche */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-2.5">
          <div className="sec font-bold text-amber-700 dark:text-amber-400 text-xs sm:text-sm uppercase tracking-wide">
            ⑥ {ANTISECHE_HOFSTEDE.titre}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ANTISECHE_HOFSTEDE.dims.map((dim) => (
              <div
                key={dim.sigle}
                className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
              >
                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
                  <span className="px-1 py-0.2 rounded bg-slate-200 dark:bg-slate-700 font-mono text-[9px]">
                    {dim.sigle}
                  </span>
                  <span className="truncate">{dim.label}</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-tight">
                  {mask(dim.desc)}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1">
            Ces 4 dimensions conditionnent l&apos;acceptation du contrôle, du
            conflit et de la coopération dans les collectifs réels.
          </p>
        </div>
      </div>
    </>
  );
}

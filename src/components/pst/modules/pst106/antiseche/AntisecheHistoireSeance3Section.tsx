"use client";

import React from "react";
import {
  ANTISECHE_GAY_LUSSAC,
  ANTISECHE_EMBOITEMENT,
  ANTISECHE_RELATIONS_HUMAINES,
  ANTISECHE_ERGONOMIE_LEPLAT,
  ANTISECHE_LE_GUILLANT,
} from "@/lib/pst/data/pst106-antiseche";

interface AntisecheHistoireSeance3SectionProps {
  mask: (text: string) => React.ReactNode;
}

export function AntisecheHistoireSeance3Section({
  mask,
}: AntisecheHistoireSeance3SectionProps) {
  return (
    <>
      {/* SECTION 7: HISTOIRE DU 41 RUE GAY-LUSSAC & ARBRE DES CAUSES */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1.5">
            <span>⑦ Histoire du CNAM · 41 rue Gay-Lussac</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
            Enquêtes &amp; Arbre des Causes
          </span>
        </div>
        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-700">
                <th className="text-left py-1.5 px-2 font-bold text-slate-900 dark:text-slate-100">
                  Auteur / Date
                </th>
                <th className="text-left py-1.5 px-2 font-bold text-slate-900 dark:text-slate-100">
                  Concept Clé
                </th>
                <th className="text-left py-1.5 px-2 font-bold text-slate-900 dark:text-slate-100">
                  Apport Fondateur pour l&apos;Examen
                </th>
              </tr>
            </thead>
            <tbody>
              {ANTISECHE_GAY_LUSSAC.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-200/60 dark:border-slate-800"
                >
                  <td className="py-2 px-2 font-bold whitespace-nowrap text-amber-800 dark:text-amber-400">
                    {row.auteur}
                  </td>
                  <td className="py-2 px-2 font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">
                    {row.concept}
                  </td>
                  <td className="py-2 px-2 text-slate-700 dark:text-slate-300 leading-snug">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: mask(row.apport) as unknown as string,
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 8: L'EMBOÎTEMENT DE LA CLINIQUE DU TRAVAIL (DOMINIQUE LHUILIER) */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/50 space-y-2">
        <div className="sec font-bold text-amber-700 dark:text-amber-400 text-xs sm:text-sm uppercase tracking-wide">
          ⑧ {ANTISECHE_EMBOITEMENT.titre}
        </div>
        <div className="p-3 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-2">
          <div className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
            {ANTISECHE_EMBOITEMENT.niveaux[0].nom}
            <span className="text-[11px] font-normal text-slate-500">
              ({ANTISECHE_EMBOITEMENT.niveaux[0].desc})
            </span>
          </div>

          <div className="ml-3 sm:ml-5 p-3 rounded-lg border-2 border-amber-500/60 bg-amber-50/40 dark:bg-amber-950/20 space-y-2">
            <div className="font-bold text-amber-900 dark:text-amber-300 text-xs sm:text-sm flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
              {ANTISECHE_EMBOITEMENT.niveaux[1].nom}
              <span className="text-[11px] font-normal text-amber-700 dark:text-amber-400">
                ({ANTISECHE_EMBOITEMENT.niveaux[1].desc})
              </span>
            </div>

            <div className="ml-3 sm:ml-5 grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div className="p-2.5 rounded-md border border-purple-300 dark:border-purple-800 bg-purple-50/60 dark:bg-purple-950/40 text-xs">
                <div className="font-bold text-purple-900 dark:text-purple-300">
                  Psychodynamique du Travail (Dejours)
                </div>
                <p className="text-[11px] text-purple-800 dark:text-purple-300 mt-0.5 leading-tight">
                  Souffrance, stratégies de défense collectives, sublimation et
                  reconnaissance (beauté/utilité).
                </p>
              </div>
              <div className="p-2.5 rounded-md border border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/40 text-xs">
                <div className="font-bold text-emerald-900 dark:text-emerald-300">
                  Clinique de l&apos;Activité (Clot)
                </div>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-300 mt-0.5 leading-tight">
                  Pouvoir d&apos;agir, réel de l&apos;activité, activité
                  empêchée, genre/style et controverse de métier.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 9: SÉANCE 3 - RELATIONS HUMAINES & MOTIVATION */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1.5">
            <span>⑨ Relations Humaines &amp; Motivation (Séance 3)</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
            Mayo · Maslow · Herzberg · McGregor · Lewin
          </span>
        </div>
        <div className="space-y-2.5">
          {ANTISECHE_RELATIONS_HUMAINES.theories.map((t, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-xs sm:text-[13px] leading-relaxed"
            >
              <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {t.auteur} — {t.concept}
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 m-0 mb-1">
                {t.desc}
              </p>
              <div className="text-[11px] font-mono text-amber-700 dark:text-amber-400 italic">
                {t.formule}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 10: SÉANCE 3 - ERGONOMIE FRANCOPHONE & 5 CARRÉS DE LEPLAT */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 inline-flex items-center gap-1.5">
            <span>
              ⑩ Ergonomie Francophone &amp; Modèle des 5 Carrés (Séance 3)
            </span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
            Wisner · Faverge · Leplat
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {ANTISECHE_ERGONOMIE_LEPLAT.points.map((p, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl border border-blue-200/70 dark:border-blue-900/50 bg-blue-50/30 dark:bg-blue-950/20 text-xs leading-relaxed"
            >
              <div className="font-bold text-blue-900 dark:text-blue-300 mb-1">
                {p.notion}
              </div>
              <p
                className="text-slate-700 dark:text-slate-300 m-0"
                dangerouslySetInnerHTML={{ __html: p.desc }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 11: SÉANCE 3 - LOUIS LE GUILLANT & CONDITION SOCIALE */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20 inline-flex items-center gap-1.5">
            <span>
              ⑪ Psychopathologie du Travail &amp; Condition Sociale (Séance 3)
            </span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
            Louis Le Guillant · Bobillier-Chaumon
          </span>
        </div>
        <div className="space-y-2">
          {ANTISECHE_LE_GUILLANT.points.map((p, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg border border-purple-200/70 dark:border-purple-900/40 bg-purple-50/30 dark:bg-purple-950/20 text-xs"
            >
              <span className="font-bold text-purple-900 dark:text-purple-300 mr-1.5">
                {p.notion} :
              </span>
              <span className="text-slate-700 dark:text-slate-300">
                {p.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

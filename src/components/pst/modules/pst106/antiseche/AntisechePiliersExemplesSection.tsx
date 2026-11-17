"use client";

import {
  ANTISECHE_AUTEURS,
  ANTISECHE_DEJOURS,
  ANTISECHE_BONUS,
  ANTISECHE_EXEMPLES,
  ANTISECHE_METHODE,
} from "@/lib/pst/data/pst106-antiseche";
import { AuthorBlock } from "./AuthorBlock";

export function AntisechePiliersExemplesSection() {
  return (
    <>
      {/* SECTION 12: WISNER, CLOT, DEJOURS & BONUS */}
      <div>
        <div className="sec font-bold text-amber-700 dark:text-amber-400 text-xs sm:text-sm uppercase tracking-wide mb-2">
          ⑫ Synthèse des 3 Piliers Cliniques &amp; Auteurs d&apos;Ouverture
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-2">
          {ANTISECHE_AUTEURS.map((auteur) => (
            <AuthorBlock
              key={auteur.title}
              color={auteur.color}
              title={auteur.title}
              lines={auteur.lines}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-2">
          <AuthorBlock
            color={ANTISECHE_DEJOURS.color}
            title={ANTISECHE_DEJOURS.title}
            lines={ANTISECHE_DEJOURS.lines}
          />
          <AuthorBlock
            color="var(--ink)"
            title={ANTISECHE_BONUS.title}
            lines={ANTISECHE_BONUS.lines}
          />
        </div>
      </div>

      {/* SECTION 13: EXEMPLES CLINIQUES */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1.5">
            <span>⑬ Exemples Cliniques Concrets</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
            À Placer le Jour J
          </span>
        </div>
        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full text-xs sm:text-sm border-collapse">
            <tbody>
              {ANTISECHE_EXEMPLES.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-200/70 dark:border-slate-800"
                >
                  <th
                    scope="row"
                    className="py-1.5 pr-3 text-left font-semibold whitespace-nowrap"
                    style={row.color ? { color: row.color } : undefined}
                  >
                    {row.th}
                  </th>
                  <td className="py-1.5 text-slate-700 dark:text-slate-300">
                    {row.td}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 14: METHODE DE REPONSE */}
      <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="sec font-bold text-amber-700 dark:text-amber-400 text-xs sm:text-sm uppercase tracking-wide mb-1">
          ⑭ Méthode de réponse rédigée (Jour J — ~15 min/question)
        </div>
        <p
          className="mini text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300"
          dangerouslySetInnerHTML={{ __html: ANTISECHE_METHODE }}
        />
      </div>
    </>
  );
}

"use client";

import React from "react";
import {
  Scale,
  Quote,
  Table as TableIcon,
  AlertTriangle,
  GraduationCap,
} from "lucide-react";
import type { SeanceCoursItem } from "@/lib/pst/data/seances-cours";

export interface SeanceSyntheseTabProps {
  activeSeance: SeanceCoursItem;
}

export function SeanceSyntheseTab({ activeSeance }: SeanceSyntheseTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Modalités officielles de l'examen si renseignées */}
      {activeSeance.modalitesExamen && (
        <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-purple-500/[0.08] via-card to-indigo-500/[0.05] border border-purple-500/30 space-y-4 shadow-xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 flex items-center gap-2">
              <Scale className="size-4 text-purple-500" />
              <span>
                Modalités d&apos;examen officielles annoncées par{" "}
                {activeSeance.enseignant}
              </span>
            </span>
            <span className="text-xs font-mono font-bold bg-purple-500/15 text-purple-900 dark:text-purple-200 px-3 py-1 rounded-xl border border-purple-500/30">
              Épreuve de {activeSeance.modalitesExamen.duree} · Sans documents
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-card border border-border/60 space-y-2">
              <span className="text-muted-foreground font-semibold block uppercase tracking-wider text-[11px]">
                Dates des deux sessions officielles :
              </span>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-foreground">
                  <span>1ère Session (Février) :</span>
                  <strong className="font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                    {activeSeance.modalitesExamen.session1Date}
                  </strong>
                </div>
                <div className="flex items-center justify-between text-foreground">
                  <span>2nde Session (Avril) :</span>
                  <strong className="font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                    {activeSeance.modalitesExamen.session2Date}
                  </strong>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border/60 space-y-2">
              <span className="text-muted-foreground font-semibold block uppercase tracking-wider text-[11px]">
                Format des 2 sujets au choix :
              </span>
              <ul className="text-foreground/90 space-y-1.5 pl-3 list-disc">
                {activeSeance.modalitesExamen.optionsAuChoix.map(
                  (opt, oIdx) => (
                    <li key={oIdx} className="leading-snug">
                      {opt}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-950 dark:text-purple-200 flex items-start gap-2.5">
            <Quote className="size-4 text-purple-500 shrink-0 mt-0.5 opacity-80" />
            <p className="italic leading-relaxed m-0">
              <strong className="not-italic font-semibold">
                Recommandation de l&apos;enseignant :
              </strong>{" "}
              {activeSeance.modalitesExamen.recommandationsNotation}
            </p>
          </div>
        </div>
      )}

      {/* Sections rédigées du cours (Apple Grouped Cards) */}
      <div className="space-y-4">
        {activeSeance.syntheseSections.map((sec) => (
          <div
            key={sec.numero}
            className="p-4 sm:p-6 rounded-3xl bg-card border border-border/70 space-y-4 shadow-xs"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-border/50">
              <span className="size-7 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center justify-center font-mono">
                {sec.numero}
              </span>
              <h3 className="text-base sm:text-lg font-serif font-bold text-foreground">
                {sec.titre}
              </h3>
            </div>

            <div className="space-y-3 pt-1">
              {sec.points.map((pt, pIdx) => (
                <div
                  key={pIdx}
                  className="p-4 rounded-2xl bg-muted/30 border border-border/50 space-y-2"
                >
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-amber-500" />
                    <span>{pt.titre}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed font-sans">
                    {pt.contenu}
                  </p>
                  {pt.auteurs && pt.auteurs.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-mono text-muted-foreground mr-1">
                        Auteurs cités :
                      </span>
                      {pt.auteurs.map((aut, aIdx) => (
                        <span
                          key={aIdx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-card text-foreground border border-border/70 font-mono font-medium shadow-2xs"
                        >
                          {aut}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tableaux comparatifs interactifs */}
      {activeSeance.tableauxComparatifs &&
        activeSeance.tableauxComparatifs.length > 0 && (
          <div className="space-y-4">
            {activeSeance.tableauxComparatifs.map((tab, tIdx) => (
              <div
                key={tIdx}
                className="p-4 sm:p-6 rounded-3xl bg-card border border-border/70 space-y-4 shadow-xs overflow-hidden"
              >
                <div className="flex items-center gap-2.5 text-base font-serif font-bold text-foreground">
                  <TableIcon className="size-4 text-amber-500" />
                  <span>{tab.titre}</span>
                </div>
                {tab.description && (
                  <p className="text-xs text-muted-foreground italic -mt-2">
                    {tab.description}
                  </p>
                )}

                <div className="overflow-x-auto scrollbar-none rounded-2xl border border-border/60">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-border bg-muted/60">
                        {tab.colonnes.map((col, cIdx) => (
                          <th
                            key={cIdx}
                            className="p-3 font-semibold text-foreground uppercase tracking-wider text-[11px]"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50 font-sans">
                      {tab.lignes.map((lig, lIdx) => (
                        <tr
                          key={lIdx}
                          className="hover:bg-muted/40 transition-colors"
                        >
                          <td className="p-3.5 font-bold text-amber-800 dark:text-amber-300 whitespace-nowrap align-top bg-card/60">
                            {lig.axe}
                          </td>
                          {lig.valeurs.map((val, vIdx) => (
                            <td
                              key={vIdx}
                              className="p-3.5 text-foreground/85 leading-relaxed align-top"
                            >
                              {val}
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
        )}

      {/* Rectifications factuelles et pièges d'examen */}
      {activeSeance.rectificationsExamen &&
        activeSeance.rectificationsExamen.length > 0 && (
          <div className="p-4 sm:p-6 rounded-3xl bg-amber-500/[0.06] border border-amber-500/25 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-900 dark:text-amber-300">
              <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400" />
              <span>
                Points Critiques &amp; Rectifications Factuelles Exigées à l&apos;Examen
              </span>
            </div>

            <div className="space-y-3">
              {activeSeance.rectificationsExamen.map((rec, rIdx) => (
                <div
                  key={rIdx}
                  className="p-4 rounded-2xl bg-card border border-amber-500/20 space-y-2 text-xs"
                >
                  <div className="font-bold text-foreground text-xs pb-1 border-b border-border/40">
                    {rec.titre}
                  </div>

                  <div className="flex items-start gap-2 text-rose-600 dark:text-rose-400 font-semibold">
                    <span className="shrink-0 font-mono text-[11px] uppercase bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      Erreur fréquente :
                    </span>
                    <span>{rec.erreurCourante}</span>
                  </div>

                  <div className="flex items-start gap-2 text-emerald-800 dark:text-emerald-300 font-semibold pt-1 border-t border-border/40">
                    <span className="shrink-0 font-mono text-[11px] uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20">
                      Rectification CNAM :
                    </span>
                    <span className="leading-relaxed">
                      {rec.rectificationAttendue}
                    </span>
                  </div>

                  {rec.contexte && (
                    <p className="text-[11px] text-muted-foreground italic m-0 pt-0.5">
                      Contexte : {rec.contexte}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Bibliographie citée */}
      {activeSeance.bibliographieCitee &&
        activeSeance.bibliographieCitee.length > 0 && (
          <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border/70 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <GraduationCap className="size-4 text-primary" />
              <span>
                Bibliographie Canonique Conseillée par {activeSeance.enseignant}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {activeSeance.bibliographieCitee.map((b, bIdx) => (
                <div
                  key={bIdx}
                  className="p-3.5 rounded-2xl bg-muted/30 border border-border/50 flex flex-col justify-between space-y-2"
                >
                  <div>
                    <span className="font-bold text-foreground block">
                      {b.auteur} {b.annee ? `(${b.annee})` : ""}
                    </span>
                    <span className="italic text-foreground/80 block mt-0.5">
                      {b.titre}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-sans block pt-1 border-t border-border/40">
                    {b.remarque}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}

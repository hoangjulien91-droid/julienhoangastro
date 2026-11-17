"use client";

import { Link } from "@/components/common/Link";
import { Sparkles, Scale, ArrowRight } from "lucide-react";
import { EncartEssentielCours } from "@/components/pst/shell/EncartEssentielCours";
import { getEssentielByUnit } from "@/lib/pst/data/essentiel-cours";
import { MatriceCourantsTheoriques } from "./MatriceCourantsTheoriques";

export type EssentielUnitId = "pst106" | "pst108" | "pst123" | "pst120" | "pst124";

interface HubEssentielTabProps {
  essentielUeFilter: EssentielUnitId;
  onSelectUe: (ue: EssentielUnitId) => void;
}

const UE_OPTIONS: Array<{ id: EssentielUnitId; label: string }> = [
  { id: "pst106", label: "PST106 · Clinique" },
  { id: "pst108", label: "PST108 · Langage" },
  { id: "pst123", label: "PST123 · Sociologie" },
  { id: "pst120", label: "PST120 · Santé" },
  { id: "pst124", label: "PST124 · Numérique" },
];

export function HubEssentielTab({
  essentielUeFilter,
  onSelectUe,
}: HubEssentielTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* L'Essentiel des Cours par UE */}
      <div className="space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-amber-600 dark:text-amber-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0">
              L&apos;Essentiel des Cours (Thèse, Savoirs, Retenir, Auteurs &amp; Pièges)
            </h3>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 gap-1 flex-wrap">
              {UE_OPTIONS.map((ue) => {
                const isSelected = essentielUeFilter === ue.id;
                return (
                  <button
                    key={ue.id}
                    type="button"
                    onClick={() => onSelectUe(ue.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {ue.label}
                  </button>
                );
              })}
            </div>

            <Link
              href={`/pst/${essentielUeFilter.replace("pst", "")}/`}
              className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/25 text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <span>Ouvrir {essentielUeFilter.toUpperCase()}</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <EncartEssentielCours
          key={essentielUeFilter}
          cards={getEssentielByUnit(essentielUeFilter)}
        />
      </div>

      {/* Matrice Doctrinale des 7 Écoles */}
      <div
        id="matrice-doctrinale"
        className="space-y-3 pt-4 border-t border-slate-200/80 dark:border-slate-800"
      >
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Scale className="size-4 text-amber-600 dark:text-amber-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0">
              Matrice Comparée des 7 Courants Théoriques
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Synthèse Doctrinale Inter-UE
          </span>
        </div>
        <div className="card p-5 sm:p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xs">
          <MatriceCourantsTheoriques />
        </div>
      </div>
    </div>
  );
}

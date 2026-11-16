"use client";

import React from "react";
import {
  ArrowRight,
  BookOpen,
  Compass,
  History,
  Palette,
} from "lucide-react";
import { INDEX } from "@/lib/pst/hub-stats";
import { SCHEMAS_MATRICES } from "@/lib/pst/data/schemas-matrices";
import { GlossarySearch } from "./GlossarySearch";
import { ConceptGraphSvg } from "./ConceptGraphSvg";
import { GlobalTimeline } from "./GlobalTimeline";

function openSchema(schemaId: string, moduleKey: string) {
  window.dispatchEvent(
    new CustomEvent("pst:open-schemas", {
      detail: { schemaId, moduleKey },
    }),
  );
}

export function HubReferentielPanel() {
  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Glossaire & Cartes Mémo */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <BookOpen className="size-4 text-amber-600 dark:text-amber-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0">
              Glossaire Transversal &amp; Auto-Évaluation
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {INDEX.glossaire.length} Concepts Définis
          </span>
        </div>
        <GlossarySearch />
      </div>

      {/* Section Schémas Vectoriels */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Palette className="size-4 text-cyan-600 dark:text-cyan-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0">
              16 Schémas &amp; Matrices Visuelles d&apos;Examen
            </h3>
          </div>
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("pst:open-schemas"))
            }
            className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Ouvrir la visionneuse plein écran</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {SCHEMAS_MATRICES.map((sch) => (
            <button
              key={sch.id}
              type="button"
              onClick={() => openSchema(sch.id, sch.moduleKey)}
              className="text-left p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-500/50 shadow-2xs transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                    {sch.moduleKey.toUpperCase()}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    {sch.annee}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 m-0">
                  {sch.titre}
                </h4>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 m-0">
                  {sch.auteur}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed m-0">
                  {sch.descriptionPedagogique}
                </p>
              </div>
              <div className="w-full mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-700 dark:text-cyan-400">
                <span>Explorer &amp; Schématiser</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Graphe Relationnel des Concepts */}
      <div
        id="concepts"
        className="space-y-3 pt-4 border-t border-slate-200/80 dark:border-slate-800"
      >
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Compass className="size-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0">
              Carte des Concepts &amp; Controverses
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Topologie Inter-Modules
          </span>
        </div>
        <div className="card p-5 sm:p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xs">
          <ConceptGraphSvg />
        </div>
      </div>

      {/* Section Frise Chronologique */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <History className="size-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0">
              Chronologie Historique des Théories (1880 — 2026)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Généalogie des Écoles
          </span>
        </div>
        <div className="card p-5 sm:p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xs">
          <GlobalTimeline />
        </div>
      </div>
    </div>
  );
}

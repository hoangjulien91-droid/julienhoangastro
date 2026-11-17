"use client";

import { Layers } from "lucide-react";
import type { SujetDissertation } from "@/lib/pst/data/sujets-dissertation";

interface DissertationPlanCardProps {
  plan: SujetDissertation["plan18_20"];
}

export function DissertationPlanCard({ plan }: DissertationPlanCardProps) {
  return (
    <div className="space-y-3">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
        <Layers className="size-3.5 text-indigo-500" />
        <span>Matrice du Plan Dialectique 18/20</span>
      </span>

      {/* Partie I */}
      <div className="p-4 rounded-3xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
        <h4 className="font-bold text-sm text-indigo-800 dark:text-indigo-300">
          {plan.partie1.titre}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-semibold text-slate-900 dark:text-slate-100">
              {plan.partie1.sousPartieA.titre}
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {plan.partie1.sousPartieA.argument}
            </p>
            <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold block pt-1">
              Ref : {plan.partie1.sousPartieA.auteurRef}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-semibold text-slate-900 dark:text-slate-100">
              {plan.partie1.sousPartieB.titre}
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {plan.partie1.sousPartieB.argument}
            </p>
            <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold block pt-1">
              Ref : {plan.partie1.sousPartieB.auteurRef}
            </span>
          </div>
        </div>
      </div>

      {/* Partie II */}
      <div className="p-4 rounded-3xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
        <h4 className="font-bold text-sm text-indigo-800 dark:text-indigo-300">
          {plan.partie2.titre}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-semibold text-slate-900 dark:text-slate-100">
              {plan.partie2.sousPartieA.titre}
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {plan.partie2.sousPartieA.argument}
            </p>
            <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold block pt-1">
              Ref : {plan.partie2.sousPartieA.auteurRef}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-semibold text-slate-900 dark:text-slate-100">
              {plan.partie2.sousPartieB.titre}
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {plan.partie2.sousPartieB.argument}
            </p>
            <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold block pt-1">
              Ref : {plan.partie2.sousPartieB.auteurRef}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

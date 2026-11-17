"use client";

import { AlertTriangle } from "lucide-react";
import { PIEGES_TRANSVERSAUX } from "@/lib/pst/data/palais-memoire-data";

export function PalaisMemoirePiegesView() {
  return (
    <div className="space-y-3">
      <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 text-xs text-slate-800 dark:text-slate-200">
        <strong className="text-rose-700 dark:text-rose-300">
          Les 6 Pièges de Confusion Transversale aux Examens Cnam :
        </strong>
      </div>

      {PIEGES_TRANSVERSAUX.map((p, pIdx) => (
        <div
          key={pIdx}
          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs"
        >
          <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <AlertTriangle className="size-3.5 text-rose-500 shrink-0" />
            <span>{p.titre}</span>
          </div>
          <p className="text-rose-700 dark:text-rose-300 font-medium m-0">
            <strong>⚠️ Le piège :</strong> {p.piege}
          </p>
          <p className="text-slate-700 dark:text-slate-300 m-0 pt-0.5 leading-relaxed">
            <strong>🛡️ La distinction 18/20 :</strong> {p.antidote}
          </p>
        </div>
      ))}
    </div>
  );
}

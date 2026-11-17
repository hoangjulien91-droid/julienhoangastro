"use client";

import { SCHEMAS_MATRICES } from "@/lib/pst/data/schemas-matrices";

interface PalaisMemoireConstellationViewProps {
  onOpenSchema: (schemaId: string) => void;
}

export function PalaisMemoireConstellationView({
  onOpenSchema,
}: PalaisMemoireConstellationViewProps) {
  return (
    <div className="space-y-4">
      <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-slate-800 dark:text-slate-200">
        <strong>Les {SCHEMAS_MATRICES.length} Schémas Canoniques Réunis :</strong>{" "}
        Cliquez sur n&apos;importe quelle carte pour ouvrir le schéma vectoriel
        SVG plein écran avec ses composantes interactives et ses conseils de
        reproduction d&apos;examen.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SCHEMAS_MATRICES.map((s) => (
          <div
            key={s.id}
            onClick={() => onOpenSchema(s.id)}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-purple-500/15 text-purple-700 dark:text-purple-300 uppercase">
                {s.moduleKey}
              </span>
              <span className="text-[10px] text-slate-500">
                {s.auteur} ({s.annee})
              </span>
            </div>
            <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 transition-colors m-0">
              {s.titre}
            </h5>
            <div className="flex items-center justify-end text-[10.5px] font-semibold text-purple-600 pt-1">
              <span>Explorer en SVG →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

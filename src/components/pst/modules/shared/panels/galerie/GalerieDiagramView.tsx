"use client";

import { lazy, Suspense } from "react";
import { Layers, CheckCircle2 } from "lucide-react";
import type { SchemaMatrice } from "@/lib/pst/data/schemas-matrices";

const PstDiagramRenderer = lazy(() =>
  import("@/components/pst/visuals/PstDiagrams").then((m) => ({
    default: m.PstDiagramRenderer,
  })),
);

interface GalerieDiagramViewProps {
  activeSchema: SchemaMatrice;
}

export function GalerieDiagramView({ activeSchema }: GalerieDiagramViewProps) {
  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="p-4 sm:p-6 bg-card border border-border/70 rounded-3xl shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Diagramme Vectoriel SVG Dynamique (Cliquez sur les zones pour explorer)
          </span>
        </div>

        {/* Rendu effectif du SVG interactif */}
        <Suspense
          fallback={
            <div className="h-56 w-full rounded-2xl bg-muted/40 animate-pulse" />
          }
        >
          <PstDiagramRenderer schemaId={activeSchema.id} />
        </Suspense>
      </div>

      {/* Décomposition des éléments du schéma */}
      <div className="p-5 sm:p-6 bg-card border border-border/70 rounded-2xl space-y-4 shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Les {activeSchema.elementsCles.length} Composants Canoniques à Annoter :
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {activeSchema.elementsCles.map((el, eIdx) => (
            <div
              key={eIdx}
              className="p-3.5 bg-muted/40 rounded-xl border border-border/60 space-y-1 hover:border-border transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground text-xs">
                  {el.terme}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-card text-muted-foreground border border-border/60">
                  {el.role}
                </span>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {el.explication}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

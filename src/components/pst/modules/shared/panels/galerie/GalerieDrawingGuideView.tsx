"use client";

import { PenTool, Sparkles, AlertTriangle, Check, Copy } from "lucide-react";
import type { SchemaMatrice } from "@/lib/pst/data/schemas-matrices";

interface GalerieDrawingGuideViewProps {
  activeSchema: SchemaMatrice;
  copiedAscii: boolean;
  onCopyAscii: () => void;
}

export function GalerieDrawingGuideView({
  activeSchema,
  copiedAscii,
  onCopyAscii,
}: GalerieDrawingGuideViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
      {/* Colonne Gauche : Schéma ASCII prêt à reproduire au stylo */}
      <div className="lg:col-span-7 p-5 sm:p-6 bg-card border border-border/70 rounded-3xl space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <PenTool className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h3 className="text-xs sm:text-sm font-bold text-foreground">
              Squelette Géométrique pour Copie d&apos;Examen
            </h3>
          </div>
          <button
            onClick={onCopyAscii}
            className="px-3 py-1.5 text-xs font-medium rounded-xl bg-muted hover:bg-muted/80 text-foreground border border-border/60 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            {copiedAscii ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" /> Copié
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copier ASCII
              </>
            )}
          </button>
        </div>

        <pre className="p-4 sm:p-5 bg-muted/50 text-foreground font-mono text-[11px] sm:text-xs leading-tight rounded-2xl border border-border/60 overflow-x-auto scrollbar-none select-all shadow-inner">
          {activeSchema.asciiRepresentation}
        </pre>
      </div>

      {/* Colonne Droite : Conseils de dessin et pièges visuels */}
      <div className="lg:col-span-5 space-y-4">
        {/* Guide pas à pas */}
        <div className="p-5 bg-card border border-border/70 rounded-3xl space-y-3 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Comment dessiner ce schéma en 45s sur la copie :
          </span>
          <p className="text-xs sm:text-sm text-foreground leading-relaxed font-sans bg-muted/40 p-4 rounded-2xl border border-border/60">
            {activeSchema.reproductionExamenConseil}
          </p>
        </div>

        {/* Piège éliminatoire à éviter */}
        <div className="p-5 bg-rose-500/10 border border-rose-500/25 rounded-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-800 dark:text-rose-200 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span>Le Piège Visuel qui fait perdre des points :</span>
          </div>
          <p className="text-xs sm:text-sm text-rose-950 dark:text-rose-200 leading-relaxed font-sans bg-rose-500/15 p-3.5 rounded-2xl border border-rose-500/20">
            {activeSchema.piegeDessinExamen}
          </p>
        </div>

        {/* Pourquoi insérer ce schéma */}
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl text-xs text-emerald-900 dark:text-emerald-300 space-y-1">
          <span className="font-bold block">
            🎯 L&apos;avis des jurys du Cnam :
          </span>
          <p className="text-emerald-800 dark:text-emerald-200/90 leading-relaxed">
            Une copie d&apos;examen qui intègre un schéma propre entouré de son
            cadre et légendé obtient en moyenne 2 à 3 points supplémentaires
            qu&apos;une copie purement textuelle.
          </p>
        </div>
      </div>
    </div>
  );
}

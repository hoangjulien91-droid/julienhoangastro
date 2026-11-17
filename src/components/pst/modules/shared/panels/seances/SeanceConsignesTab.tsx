"use client";

import React, { useState } from "react";
import { Clock, Copy, Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import type { SeanceCoursItem } from "@/lib/pst/data/seances-cours";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

export interface SeanceConsignesTabProps {
  activeSeance: SeanceCoursItem;
  onGoTab?: (tabId: string) => void;
}

export function SeanceConsignesTab({
  activeSeance,
  onGoTab,
}: SeanceConsignesTabProps) {
  const [copiedConsigneIndex, setCopiedConsigneIndex] = useState<number | null>(
    null,
  );

  function handleCopyConsigne(text: string, index: number) {
    playClickSound();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedConsigneIndex(index);
      playSuccessSound();
      triggerHaptic("light");
      toast.success("Consigne copiée !");
      setTimeout(() => setCopiedConsigneIndex(null), 2500);
    }
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {activeSeance.consignesOralesProf.map((c, cIdx) => (
        <div
          key={cIdx}
          className="p-4 sm:p-6 rounded-3xl bg-card border border-border/70 space-y-4 shadow-xs"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-purple-500/15 text-purple-900 dark:text-purple-200 border border-purple-500/30">
                Consigne #{cIdx + 1}
              </span>
              <h3 className="text-sm sm:text-base font-serif font-bold text-foreground">
                {c.titre}
              </h3>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/25 self-start sm:self-auto">
              <Clock className="size-3.5 text-amber-500" />
              <span>Échéance : {c.echeance}</span>
            </span>
          </div>

          {/* Consigne exacte formulée en cours */}
          <div className="p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border/60 space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
              Consigne exacte formulée à l&apos;oral par {activeSeance.enseignant} :
            </span>
            <p className="text-xs sm:text-sm text-foreground/90 italic leading-relaxed m-0 font-serif">
              « {c.consigneExacte} »
            </p>
          </div>

          {/* Modalités & Recommandations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-card border border-border/50 space-y-1">
              <span className="font-semibold text-muted-foreground block text-[11px]">
                Modalité de travail &amp; Rendu :
              </span>
              <span className="text-foreground">{c.modaliteRendu}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-card border border-border/50 space-y-1">
              <span className="font-semibold text-muted-foreground block text-[11px]">
                Recommandations de réussite :
              </span>
              <span className="text-foreground">{c.recommandationsProf}</span>
            </div>
          </div>

          {/* Actions Apple-grade */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-border/40">
            <button
              type="button"
              onClick={() => handleCopyConsigne(c.consigneExacte, cIdx)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              {copiedConsigneIndex === cIdx ? (
                <>
                  <Check className="size-3.5 text-emerald-500" />
                  <span>Consigne copiée !</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  <span>Copier la consigne</span>
                </>
              )}
            </button>

            {c.lienAdId && onGoTab && (
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onGoTab("ad");
                }}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 ml-auto"
              >
                <span>Rédiger cette AD dans l&apos;espace dédié</span>
                <ArrowRight className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import React from "react";

export const OralDefensePacingBanner: React.FC = () => {
  return (
    <div className="px-3.5 sm:px-5 py-2.5 border-b border-border/70 bg-muted/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px] shrink-0">
      <div className="p-2 rounded-lg border border-border/70 bg-background/80">
        <span className="font-mono font-bold text-accent block">
          00:00 → 03:00 (3 min)
        </span>
        <span className="text-muted-foreground">
          De la commande managériale à la demande co-construite
        </span>
      </div>
      <div className="p-2 rounded-lg border border-border/70 bg-background/80">
        <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 block">
          03:00 → 07:00 (4 min)
        </span>
        <span className="text-muted-foreground">
          Problématique théorique &amp; Dispositif méthodologique situé
        </span>
      </div>
      <div className="p-2 rounded-lg border border-border/70 bg-background/80">
        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 block">
          07:00 → 12:00 (5 min)
        </span>
        <span className="text-muted-foreground">
          Analyse clinique des traces, verbatims &amp; controverses
        </span>
      </div>
      <div className="p-2 rounded-lg border border-border/70 bg-background/80">
        <span className="font-mono font-bold text-amber-600 dark:text-amber-400 block">
          12:00 → 15:00 (3 min)
        </span>
        <span className="text-muted-foreground">
          Transformations instituées &amp; Posture réflexive du praticien
        </span>
      </div>
    </div>
  );
};

"use client";

import { HardDrive, ShieldCheck, CheckCircle2 } from "lucide-react";
import type { StorageItemSummary } from "@/lib/pst/data/disaster-recovery-data";

interface StorageQuotaCardProps {
  totalBytes: number;
  usagePct: number;
  quotaTone: string;
  storedSummary: StorageItemSummary[];
  trackedKeysCount: number;
  scrubReport: string | null;
  onDeepScrub: () => void;
}

export function StorageQuotaCard({
  totalBytes,
  usagePct,
  quotaTone,
  storedSummary,
  trackedKeysCount,
  scrubReport,
  onDeepScrub,
}: StorageQuotaCardProps) {
  return (
    <div className="p-4 rounded-xl border border-border bg-background space-y-2.5 shrink-0">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground font-medium flex items-center gap-1.5">
          <HardDrive className="size-3.5 text-accent" />
          Espace localStorage utilisé (Bouclier Anti-Saturation 75% / 90%) :
        </span>
        <span className="font-mono font-bold text-foreground">
          {(totalBytes / 1024).toFixed(2)} Ko / 5 120 Ko ({usagePct.toFixed(1)}%)
        </span>
      </div>

      <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full transition-all ${quotaTone}`}
          style={{ width: `${usagePct}%` }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
        <span className="text-muted-foreground font-medium">
          Registres académiques actifs :{" "}
          <strong className="font-mono text-accent">
            {storedSummary.filter((s) => s.exists).length} / {trackedKeysCount} clés
          </strong>
        </span>

        <button
          type="button"
          onClick={onDeepScrub}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/25 transition-colors cursor-pointer"
          title="Vérifier l'intégrité JSON de toutes les clés et compacter les historiques"
        >
          <ShieldCheck className="size-3.5" />
          <span>Audit d'Intégrité JSON &amp; Deep Scrub</span>
        </button>
      </div>

      {scrubReport && (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-mono text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="size-3.5 shrink-0" />
          <span>{scrubReport}</span>
        </div>
      )}
    </div>
  );
}

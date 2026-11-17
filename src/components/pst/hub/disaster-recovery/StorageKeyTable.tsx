"use client";

import { Trash2 } from "lucide-react";
import type { StorageItemSummary } from "@/lib/pst/data/disaster-recovery-data";

interface StorageKeyTableProps {
  storedSummary: StorageItemSummary[];
  onPurgeSingleKey: (key: string) => void;
}

export function StorageKeyTable({
  storedSummary,
  onPurgeSingleKey,
}: StorageKeyTableProps) {
  return (
    <div className="flex-1 overflow-y-auto border border-border/80 rounded-xl divide-y divide-border/60 bg-background/50">
      {storedSummary.map((item) => (
        <div
          key={item.key}
          className="px-3.5 py-2.5 flex items-center justify-between gap-3 text-xs hover:bg-muted/40 transition-colors"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={`size-2 rounded-full ${
                  !item.validJson
                    ? "bg-rose-500"
                    : item.exists
                      ? "bg-emerald-500"
                      : "bg-muted-foreground/30"
                }`}
              />
              <span className="font-mono font-bold text-[11px] text-foreground">
                {item.key}
              </span>
              {item.exists && !item.validJson && (
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-rose-500/15 text-rose-600">
                  JSON Corrompu
                </span>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground truncate m-0 mt-0.5">
              {item.label}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">
              {item.exists ? `${(item.bytes / 1024).toFixed(1)} Ko` : "Vide"}
            </span>
            {item.exists && (
              <button
                type="button"
                onClick={() => onPurgeSingleKey(item.key)}
                className="p-1 rounded text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                title={`Purger uniquement ${item.key}`}
              >
                <Trash2 className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

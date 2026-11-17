"use client";

import type { ClinicalVignette } from "@/lib/pst/data/clinical-cases-data";

interface ClinicalCaseListViewProps {
  vignettes: ClinicalVignette[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function ClinicalCaseListView({
  vignettes,
  selectedId,
  onSelect,
  className = "",
}: ClinicalCaseListViewProps) {
  return (
    <div className={className}>
      <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-2">
        Études de Cas Canoniques ({vignettes.length})
      </span>

      {vignettes.map((v) => {
        const isSelected = v.id === selectedId;
        return (
          <button
            key={v.id}
            type="button"
            onClick={() => onSelect(v.id)}
            className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
              isSelected
                ? "bg-white dark:bg-slate-900 border-cyan-500/50 shadow-xs"
                : "bg-transparent border-slate-200/70 dark:border-slate-800 hover:bg-white/60 dark:hover:bg-slate-900/60"
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-700 dark:text-cyan-300">
                {v.ue}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {v.title}
            </p>
            <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-1">
              {v.sector}
            </span>
          </button>
        );
      })}
    </div>
  );
}

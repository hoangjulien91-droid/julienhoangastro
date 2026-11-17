"use client";

import { Sparkles, AlertTriangle } from "lucide-react";

interface DissertationCitationsPiegeCardProps {
  citationsObligatoires: string[];
  piegesExamen: string;
}

export function DissertationCitationsPiegeCard({
  citationsObligatoires,
  piegesExamen,
}: DissertationCitationsPiegeCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 text-xs space-y-1.5">
        <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
          <Sparkles className="size-3.5 text-amber-600" />
          Citations à placer impérativement :
        </span>
        <div className="space-y-1 text-slate-700 dark:text-slate-300 font-serif italic text-[11px]">
          {citationsObligatoires.map((c, cIdx) => (
            <p key={cIdx} className="m-0 leading-snug">
              {c}
            </p>
          ))}
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 text-xs space-y-1.5">
        <span className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1">
          <AlertTriangle className="size-3.5 text-rose-600" />
          Piège de correcteur d&apos;examen :
        </span>
        <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-snug m-0">
          {piegesExamen}
        </p>
      </div>
    </div>
  );
}

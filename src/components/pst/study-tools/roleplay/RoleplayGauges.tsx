"use client";

import { HeartHandshake, Shield } from "lucide-react";

interface RoleplayGaugesProps {
  allianceScore: number;
  deontoScore: number;
}

export function RoleplayGauges({
  allianceScore,
  deontoScore,
}: RoleplayGaugesProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 p-3 sm:p-3.5 rounded-2xl sm:rounded-3xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs">
      <div className="space-y-1 min-w-0">
        <div className="flex items-center justify-between font-bold text-slate-700 dark:text-slate-300">
          <span className="flex items-center gap-1 truncate">
            <HeartHandshake className="size-3.5 text-teal-600 shrink-0" />
            <span className="truncate">Alliance</span>
            <span className="hidden sm:inline"> de Travail</span>
          </span>
          <span className="font-mono text-teal-700 dark:text-teal-400 shrink-0 ml-1">
            {allianceScore}%
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full bg-teal-500 transition-all duration-300"
            style={{ width: `${allianceScore}%` }}
          />
        </div>
      </div>

      <div className="space-y-1 min-w-0">
        <div className="flex items-center justify-between font-bold text-slate-700 dark:text-slate-300">
          <span className="flex items-center gap-1 truncate">
            <Shield className="size-3.5 text-indigo-600 shrink-0" />
            <span className="truncate">Déontologie</span>
          </span>
          <span className="font-mono text-indigo-700 dark:text-indigo-400 shrink-0 ml-1">
            {deontoScore}%
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${deontoScore}%` }}
          />
        </div>
      </div>
    </div>
  );
}

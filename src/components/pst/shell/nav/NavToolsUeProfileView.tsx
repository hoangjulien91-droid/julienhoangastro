"use client";

import {
  openExclusiveUeTool,
  type UeToolsProfile,
} from "@/lib/pst/data/outils-par-ue";

const COLOR_CLASSES: Record<string, string> = {
  amber: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  rose: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  indigo: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
  blue: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  cyan: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
  purple: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
  emerald: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  teal: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
  violet: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
};

interface NavToolsUeProfileViewProps {
  activeProfile: UeToolsProfile;
  onClose: () => void;
}

export function NavToolsUeProfileView({
  activeProfile,
  onClose,
}: NavToolsUeProfileViewProps) {
  return (
    <>
      {/* Étage 1 : Outils & Simulateurs Exclusifs de l'UE */}
      <div className="space-y-1">
        <div className="px-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          <span>🎯 Exclusif {activeProfile.code}</span>
          <span className="font-mono text-[10px] opacity-85 truncate max-w-[170px]">
            {activeProfile.teacher}
          </span>
        </div>
        <div className="space-y-1">
          {activeProfile.exclusiveTools.map((tool) => (
            <button
              key={tool.id}
              type="button"
              onClick={() => {
                onClose();
                openExclusiveUeTool(tool.ueId, tool.tabId);
              }}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-amber-500/[0.06] hover:bg-amber-500/15 border border-amber-500/20 hover:border-amber-500/40 transition-all text-left group cursor-pointer active:scale-98"
            >
              <div
                className={`size-7 rounded-lg ${
                  COLOR_CLASSES[tool.color] ??
                  "bg-amber-500/15 text-amber-500"
                } flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 font-mono text-[10px] font-black`}
              >
                {activeProfile.shortCode}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate text-xs">
                    {tool.shortName}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300 shrink-0">
                    {tool.badge}
                  </span>
                </div>
                <div className="text-[10px] text-slate-600 dark:text-slate-300 truncate">
                  {tool.desc}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Étage 2 : Kit Examen 18/20 pré-filtré sur cette UE */}
      <div className="space-y-1 pt-1 border-t border-slate-100 dark:border-slate-800">
        <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
          🏆 Kit Examen 18/20 ciblé {activeProfile.code}
        </div>
        <div className="grid grid-cols-2 gap-1">
          {activeProfile.quickExamTools.map((qt) => (
            <button
              key={qt.id}
              type="button"
              onClick={() => {
                onClose();
                window.dispatchEvent(
                  new CustomEvent(qt.eventName, {
                    detail: { module: activeProfile.ueId },
                  }),
                );
              }}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700/70 text-left transition-all cursor-pointer active:scale-98 group"
            >
              <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 truncate">
                {qt.badge}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {qt.desc}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

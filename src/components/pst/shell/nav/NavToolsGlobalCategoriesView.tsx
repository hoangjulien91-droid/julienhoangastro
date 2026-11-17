"use client";

import type { LucideIcon } from "lucide-react";

interface CategoryTool {
  id: string;
  name: string;
  badge: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  action: () => void;
}

interface ToolCategory {
  name: string;
  tools: CategoryTool[];
}

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

interface NavToolsGlobalCategoriesViewProps {
  toolCategories: ToolCategory[];
  onClose: () => void;
}

export function NavToolsGlobalCategoriesView({
  toolCategories,
  onClose,
}: NavToolsGlobalCategoriesViewProps) {
  return (
    <div className="space-y-2.5">
      {toolCategories.map((cat, idx) => (
        <div
          key={idx}
          className={
            idx > 0
              ? "pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1"
              : "space-y-1"
          }
        >
          <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {cat.name}
          </div>
          <div className="grid grid-cols-1 gap-1">
            {cat.tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    tool.action();
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all text-left group cursor-pointer active:scale-98"
                >
                  <div
                    className={`size-7 rounded-lg ${
                      COLOR_CLASSES[tool.color] ??
                      "bg-amber-500/15 text-amber-500"
                    } flex items-center justify-center shrink-0 transition-transform group-hover:scale-105`}
                  >
                    <Icon className="size-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate text-xs">
                        {tool.name}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                        {tool.badge}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      {tool.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

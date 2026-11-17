"use client";

import {
  COMMAND_PALETTE_TOOLS,
  type ToolEntry,
} from "@/lib/pst/data/command-palette-tools-data";

export { COMMAND_PALETTE_TOOLS, type ToolEntry };

interface CommandPaletteToolsGridProps {
  onTriggerModal: (eventName: string) => void;
  onNavigate: (path: string) => void;
}

export function CommandPaletteToolsGrid({
  onTriggerModal,
  onNavigate,
}: CommandPaletteToolsGridProps) {
  return (
    <div className="space-y-1 pt-1 border-t border-border/60">
      <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
        Exercices Cliniques &amp; Outils d&apos;Étude RNCP 7
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
        {COMMAND_PALETTE_TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.label}
              type="button"
              onClick={() => {
                if (tool.href) onNavigate(tool.href);
                else if (tool.event) onTriggerModal(tool.event);
              }}
              className={`flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer ${
                tool.cardClass ?? ""
              }`}
            >
              <Icon className={`size-4 shrink-0 ${tool.iconClass}`} />
              <span className={`font-medium ${tool.labelClass ?? ""}`}>
                {tool.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

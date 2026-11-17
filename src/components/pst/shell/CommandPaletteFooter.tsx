"use client";

export function CommandPaletteFooter() {
  return (
    <div className="border-t border-border/70 px-4 py-2.5 bg-muted/30 text-muted-foreground flex items-center justify-between text-[11px] shrink-0 font-mono">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">
            ⌘
          </kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">
            K
          </kbd>
          <span className="ml-0.5">Palette</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">
            ↑↓
          </kbd>
          <span className="ml-0.5">Naviguer</span>
        </span>
        <span className="hidden sm:flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">
            ↵
          </kbd>
          <span className="ml-0.5">Ouvrir</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">
            Échap
          </kbd>
          <span className="ml-0.5">Fermer</span>
        </span>
      </div>

      <span className="text-[11px]">CNAM · RNCP 7</span>
    </div>
  );
}

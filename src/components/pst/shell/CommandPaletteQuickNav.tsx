"use client";

import {
  BookOpen,
  Calendar,
  Download,
  GraduationCap,
  Layers,
  Moon,
  Scale,
  Sun,
} from "lucide-react";

interface CommandPaletteQuickNavProps {
  onNavigate: (path: string) => void;
  onExportIcs: () => void;
  onToggleTheme: () => void;
}

export function CommandPaletteQuickNav({
  onNavigate,
  onExportIcs,
  onToggleTheme,
}: CommandPaletteQuickNavProps) {
  return (
    <div className="space-y-1 pt-1 border-t border-border/60">
      <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
        Navigation Rapide
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
        <button
          type="button"
          onClick={() => onNavigate("/pst")}
          className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
        >
          <Layers className="size-4 text-primary shrink-0" />
          <span className="font-medium">Poste de Pilotage PST</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate("/pst/planning")}
          className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
        >
          <Calendar className="size-4 text-accent shrink-0" />
          <span className="font-medium">Planning &amp; Frise</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate("/pst/#pyramide")}
          className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
        >
          <GraduationCap className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="font-medium">Pyramide RNCP 7</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate("/pst/#matrice-doctrinale")}
          className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
        >
          <Scale className="size-4 text-accent shrink-0" />
          <span className="font-medium">Matrice des 5 Courants</span>
        </button>

        <button
          type="button"
          onClick={onExportIcs}
          className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
        >
          <Download className="size-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span className="font-medium">Exporter l&apos;agenda (.ics)</span>
        </button>

        <button
          type="button"
          onClick={onToggleTheme}
          className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
        >
          <Sun className="size-4 text-amber-500 shrink-0 dark:hidden" />
          <Moon className="size-4 text-blue-400 shrink-0 hidden dark:block" />
          <span className="font-medium">Basculer le thème Sombre / Clair</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate("/")}
          className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-muted text-foreground transition-colors cursor-pointer"
        >
          <BookOpen className="size-4 text-muted-foreground shrink-0" />
          <span className="font-medium">Retour au cabinet public</span>
        </button>
      </div>
    </div>
  );
}

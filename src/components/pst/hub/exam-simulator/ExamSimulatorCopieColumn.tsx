"use client";

import { Copy, Download } from "lucide-react";

interface ExamSimulatorCopieColumnProps {
  copieContent: string;
  onChangeCopieContent: (val: string) => void;
  wordCount: number;
  onCopyCopie: () => void;
  onExportCopie: () => void;
  mobileTab: "sujet" | "copie";
}

export function ExamSimulatorCopieColumn({
  copieContent,
  onChangeCopieContent,
  wordCount,
  onCopyCopie,
  onExportCopie,
  mobileTab,
}: ExamSimulatorCopieColumnProps) {
  return (
    <div
      className={`lg:col-span-7 p-3.5 sm:p-5 flex flex-col overflow-hidden bg-card ${
        mobileTab === "copie" ? "flex" : "hidden lg:flex"
      }`}
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/80 text-xs text-muted-foreground gap-2">
        <span className="font-semibold text-foreground truncate">
          Feuille de Composition
        </span>
        <div className="flex items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] shrink-0">
          <span>
            Mots : <strong className="text-foreground">{wordCount}</strong>
          </span>
          <span>
            Caractères :{" "}
            <strong className="text-foreground">{copieContent.length}</strong>
          </span>
        </div>
      </div>

      <textarea
        value={copieContent}
        onChange={(e) => onChangeCopieContent(e.target.value)}
        placeholder="Rédigez votre introduction, problématisation, plan en 2 ou 3 parties et argumentation théorique ici..."
        className="flex-1 w-full min-h-[300px] p-3.5 sm:p-4 rounded-xl border border-border bg-background text-foreground text-xs sm:text-sm leading-relaxed resize-none focus:outline-hidden focus:ring-1 focus:ring-accent font-sans"
      />

      {/* Bottom action row */}
      <div className="pt-2.5 sm:pt-3 mt-2 sm:mt-3 border-t border-border flex items-center justify-between gap-2 flex-wrap">
        <span className="text-[10px] sm:text-[11px] text-muted-foreground font-mono">
          Sauvegarde locale automatique active
        </span>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onCopyCopie}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold border border-border transition-colors cursor-pointer shadow-2xs active:scale-95"
          >
            <Copy className="size-3.5" />
            <span>Copier</span>
          </button>
          <button
            type="button"
            onClick={onExportCopie}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-xs active:scale-95"
          >
            <Download className="size-3.5" />
            <span>Exporter (.md)</span>
          </button>
        </div>
      </div>
    </div>
  );
}

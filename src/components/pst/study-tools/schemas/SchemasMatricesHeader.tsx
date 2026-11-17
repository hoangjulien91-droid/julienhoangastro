"use client";

import {
  X,
  Layers,
  FileCode,
  Palette,
  Printer,
  Brain,
  Compass,
} from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";

const MODULE_FILTERS = [
  { key: "all", shortLabel: "Tous (11)", sub: "" },
  { key: "pst106", shortLabel: "PST106", sub: " (Leplat, Clot, Dejours)" },
  {
    key: "pst108",
    shortLabel: "PST108",
    sub: " (Vygotski, Bourdieu, Bühler)",
  },
  { key: "pst123", shortLabel: "PST123", sub: " (Dubar, Sainsaulieu, Castel)" },
];

interface SchemasMatricesHeaderProps {
  onOpenPalais: () => void;
  onPrintPlanche: () => void;
  onClose: () => void;
  selectedModule: string;
  onSelectModule: (key: string) => void;
  viewMode: "svg" | "cloze" | "ascii";
  onSetViewMode: (mode: "svg" | "cloze" | "ascii") => void;
}

export function SchemasMatricesHeader({
  onOpenPalais,
  onPrintPlanche,
  onClose,
  selectedModule,
  onSelectModule,
  viewMode,
  onSetViewMode,
}: SchemasMatricesHeaderProps) {
  return (
    <>
      {/* En-tête Feuille Modale */}
      <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-amber-500/10 shrink-0">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="size-8 sm:size-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shadow-md shrink-0">
            <Layers className="size-4 sm:size-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 truncate">
              <span className="truncate">Boîte à Schémas 18/20</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-800 dark:text-cyan-200 font-extrabold uppercase shrink-0">
                SVG
              </span>
            </h2>
            <p className="text-[10px] sm:text-xs text-slate-500 truncate">
              16 schémas vectoriels interactifs &amp; matrices théoriques
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenPalais}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-500/15 text-purple-800 dark:text-purple-200 hover:bg-purple-500/25 transition-all cursor-pointer"
            title="Ouvrir le Palais de la mémoire tri-module (PST106, PST108, PST123)"
          >
            <Compass className="size-3.5" />
            <span>Palais Mémoire</span>
          </button>

          <button
            type="button"
            onClick={onPrintPlanche}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-200/70 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 transition-all cursor-pointer"
            title="Imprimer ou enregistrer en PDF la planche des schémas (A4)"
          >
            <Printer className="size-3.5" />
            <span className="hidden sm:inline">Imprimer A4 / PDF</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Filter Bar & View Mode Toggle */}
      <div className="p-2.5 sm:p-3 border-b border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center justify-between flex-wrap gap-2 shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap max-w-full pb-0.5">
          {MODULE_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => {
                playClickSound();
                onSelectModule(f.key);
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
                selectedModule === f.key
                  ? "bg-cyan-600 text-white border-cyan-600 shadow-sm"
                  : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
              }`}
            >
              <span>{f.shortLabel}</span>
              <span className="hidden sm:inline font-normal text-[11px] opacity-90">
                {f.sub}
              </span>
            </button>
          ))}
        </div>

        {/* 3-Way Mode Toggle */}
        <div className="inline-flex p-1 rounded-2xl bg-slate-200/60 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700 shrink-0">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onSetViewMode("svg");
            }}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === "svg"
                ? "bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Palette className="size-3.5" />
            <span>
              <span className="hidden sm:inline">Graphique </span>SVG
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onSetViewMode("cloze");
            }}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === "cloze"
                ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Brain className="size-3.5" />
            <span>
              <span className="hidden sm:inline">Défi </span>À trous
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onSetViewMode("ascii");
            }}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === "ascii"
                ? "bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <FileCode className="size-3.5" />
            <span>
              Copie<span className="hidden sm:inline"> (ASCII)</span>
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

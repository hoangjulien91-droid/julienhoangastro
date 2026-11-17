import React from "react";
import {
  X,
  Download,
  Printer,
  Copy,
  Check,
  BookOpen,
  Hash,
} from "lucide-react";
import {
  type StudioProjection,
} from "@/lib/pst/data/memoire-studio-data";

interface MemoireStudioHeaderProps {
  integrityFingerprint: string;
  projection: StudioProjection;
  onProjectionChange: (p: StudioProjection) => void;
  onCopy: () => void;
  copied: boolean;
  onDownload: () => void;
  onPrint: () => void;
  onClose: () => void;
}

export function MemoireStudioHeader({
  integrityFingerprint,
  projection,
  onProjectionChange,
  onCopy,
  copied,
  onDownload,
  onPrint,
  onClose,
}: MemoireStudioHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2.5 sm:py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/70">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <div className="size-8 sm:size-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shrink-0">
          <BookOpen className="size-4 sm:size-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-bold truncate">
              STUDIO MÉMOIRE RNCP 7
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">
              <Hash className="w-3 h-3 text-emerald-500 shrink-0" />
              {integrityFingerprint}
            </span>
          </div>
          <h2
            id="pst-memoire-studio-title"
            className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight truncate"
          >
            Atelier d&apos;Écriture &amp; Pré-Soutenance CNAM
          </h2>
        </div>
      </div>

      {/* Projection Selector + Actions */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <div className="hidden md:flex items-center p-0.5 rounded-xl bg-slate-200/70 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700">
          {(
            [
              ["jury_cnam", "Jury CNAM"],
              ["commanditaire_terrain", "Restitution COPIL"],
              ["journal_clinique", "Journal Clinique"],
            ] as [StudioProjection, string][]
          ).map(([projKey, label]) => (
            <button
              key={projKey}
              type="button"
              onClick={() => onProjectionChange(projKey)}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                projection === projKey
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-500/40 transition-colors cursor-pointer shadow-2xs"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              Copié
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Copier .MD</span>
              <span className="sm:hidden">Copier</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onDownload}
          className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Exporter</span>
        </button>

        <button
          type="button"
          onClick={onPrint}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          title="Imprimer / Générer PDF A4"
        >
          <Printer className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
          aria-label="Fermer le studio mémoire"
        >
          <X className="size-4 sm:size-5" />
        </button>
      </div>
    </div>
  );
}

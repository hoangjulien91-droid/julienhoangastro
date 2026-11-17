"use client";

import React from "react";
import type { TypeFilter, ViewMode } from "./ErrorNotebook";
import {
  XCircle,
  RotateCcw,
  Download,
  FileText,
  Trash2,
  Layers,
  Focus,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

export interface ErrorNotebookToolbarProps {
  totalErrors: number;
  totalFiltered: number;
  viewMode: ViewMode;
  onViewModeChange: (m: ViewMode) => void;
  typeFilter: TypeFilter;
  onTypeFilterChange: (t: TypeFilter) => void;
  typeCounts: { all: number; qcm: number; pieges: number; qui: number };
  onStartAllReplay: () => void;
  onExportAnki: () => void;
  onExportMarkdown: () => void;
  onClearAll: () => void;
}

export function ErrorNotebookToolbar({
  totalErrors,
  totalFiltered,
  viewMode,
  onViewModeChange,
  typeFilter,
  onTypeFilterChange,
  typeCounts,
  onStartAllReplay,
  onExportAnki,
  onExportMarkdown,
  onClearAll,
}: ErrorNotebookToolbarProps) {
  const tabs: { id: TypeFilter; label: string; count: number }[] = [
    { id: "all", label: "Toutes", count: typeCounts.all },
    { id: "qcm", label: "QCM", count: typeCounts.qcm },
    { id: "pieges", label: "Pièges V/F", count: typeCounts.pieges },
    { id: "qui", label: "Citations", count: typeCounts.qui },
  ];

  return (
    <div className="space-y-3.5">
      {/* Top Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 px-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300 shadow-2xs">
            <XCircle className="size-3.5" />
            <span>
              {totalErrors} erreur{totalErrors > 1 ? "s" : ""} à retravailler
            </span>
          </span>
          {viewMode === "list" && totalFiltered > 0 && (
            <button
              type="button"
              onClick={onStartAllReplay}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <RotateCcw className="size-3.5" />
              <span>Tester mes {totalFiltered} erreurs</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onExportAnki}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Exporter pour l'application Anki (.tsv)"
          >
            <Download className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Anki (.tsv)</span>
          </button>

          <button
            type="button"
            onClick={onExportMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Exporter en fiche Markdown (.md)"
          >
            <FileText className="size-3 text-emerald-600 dark:text-emerald-400" />
            <span>Fiche (.md)</span>
          </button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border border-rose-500/30 transition-all cursor-pointer shadow-2xs"
              >
                <Trash2 className="size-3" />
                <span>Tout effacer</span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Effacer tout le carnet d&apos;erreurs ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action supprimera la liste de vos questions manquées
                  pour ce module.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onClearAll}
                  className="bg-rose-600 text-white hover:bg-rose-700"
                >
                  Confirmer la suppression
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Filter Tabs and View Mode */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-card border border-border shadow-2xs">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 scrollbar-none">
          {tabs.map((tab) => {
            const active = typeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  triggerHaptic("light");
                  playClickSound();
                  onTypeFilterChange(tab.id);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  active
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "bg-background/80 hover:bg-muted text-muted-foreground border border-border/80"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    active
                      ? "bg-slate-950/20 text-slate-950 font-black"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle (Liste vs Focus) */}
        <div className="flex items-center gap-1 self-end sm:self-auto shrink-0 bg-background/80 p-1 rounded-xl border border-border">
          <button
            type="button"
            onClick={() => {
              triggerHaptic("light");
              playClickSound();
              onViewModeChange("list");
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              viewMode === "list"
                ? "bg-muted text-foreground shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Layers className="size-3.5" />
            <span>Liste</span>
          </button>
          <button
            type="button"
            onClick={() => {
              triggerHaptic("light");
              playClickSound();
              onViewModeChange("focus");
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              viewMode === "focus"
                ? "bg-amber-500 text-slate-950 shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Focus className="size-3.5" />
            <span>Focus 1 par 1</span>
          </button>
        </div>
      </div>
    </div>
  );
}

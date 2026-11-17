"use client";

import type { PstStore } from "@/lib/pst/store";
import { CheckCircle2 } from "lucide-react";
import { ErrorCard } from "./ErrorCard";
import { ErrorFocusMode } from "./ErrorFocusMode";
import { ErrorNotebookToolbar } from "./ErrorNotebookToolbar";
import {
  useErrorNotebookState,
  type TypeFilter,
  type ViewMode,
} from "./useErrorNotebookState";

export type { TypeFilter, ViewMode };

export interface ErrorNotebookProps {
  store: PstStore;
  onStoreChange: () => void;
}

export function ErrorNotebook({ store, onStoreChange }: ErrorNotebookProps) {
  const {
    errors,
    typeFilter,
    setTypeFilter,
    viewMode,
    setViewMode,
    setFocusIdx,
    replay,
    removingIds,
    focusRevealed,
    setFocusRevealed,
    focusChoiceOrder,
    typeCounts,
    filteredErrors,
    totalFiltered,
    safeFocusIdx,
    currentErr,
    handlePrevFocus,
    handleNextFocus,
    startReplay,
    revealAnswer,
    handleAnswer,
    handleClearAll,
    handleRemove,
    startAllReplay,
    handleExportAnki,
    handleExportMarkdown,
  } = useErrorNotebookState(store, onStoreChange);

  if (errors.length === 0) {
    return (
      <div className="p-8 sm:p-12 text-center rounded-3xl border border-dashed border-border bg-card/60 backdrop-blur-md space-y-3 animate-in fade-in duration-200">
        <div className="size-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-2xs">
          <CheckCircle2 className="size-6" />
        </div>
        <div>
          <strong className="text-base font-serif font-bold text-foreground block">
            Votre carnet d&apos;erreurs est vide !
          </strong>
          <p className="text-xs text-muted-foreground mt-1 m-0 max-w-sm mx-auto leading-relaxed">
            Toutes vos erreurs passées ont été résolues et assimilées. Continuez
            les quiz pour identifier d&apos;éventuels pièges doctrinaux.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="errorsHost" className="space-y-4">
      {/* Header bar and Filter Controls */}
      <ErrorNotebookToolbar
        totalErrors={errors.length}
        totalFiltered={totalFiltered}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        typeFilter={typeFilter}
        onTypeFilterChange={(t) => {
          setTypeFilter(t);
          setFocusIdx(0);
        }}
        typeCounts={typeCounts}
        onStartAllReplay={startAllReplay}
        onExportAnki={handleExportAnki}
        onExportMarkdown={handleExportMarkdown}
        onClearAll={handleClearAll}
      />

      {/* Body content based on View Mode */}
      {totalFiltered === 0 ? (
        <div className="p-8 text-center rounded-2xl border border-dashed border-border bg-card/60 backdrop-blur-md space-y-2">
          <p className="text-xs text-muted-foreground m-0">
            Aucune erreur dans cette catégorie sélectionnée.
          </p>
        </div>
      ) : viewMode === "focus" && currentErr ? (
        <ErrorFocusMode
          currentErr={currentErr}
          safeFocusIdx={safeFocusIdx}
          totalFiltered={totalFiltered}
          removingIds={removingIds}
          focusRevealed={focusRevealed}
          setFocusRevealed={setFocusRevealed}
          focusChoiceOrder={focusChoiceOrder}
          onPrevFocus={handlePrevFocus}
          onNextFocus={handleNextFocus}
          onAnswer={handleAnswer}
          onRemove={handleRemove}
        />
      ) : (
        <div className="space-y-3.5">
          {filteredErrors.map((err) => (
            <ErrorCard
              key={err.id}
              err={err}
              removing={removingIds.has(err.id)}
              replay={replay[err.id]}
              onStartReplay={() => startReplay(err)}
              onReveal={() => revealAnswer(err.id)}
              onAnswer={(wasRight) => handleAnswer(err, wasRight)}
              onRemove={() => handleRemove(err.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

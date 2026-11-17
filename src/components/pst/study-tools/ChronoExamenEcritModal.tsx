"use client";

import { ChronoExamenSujetPane } from "./chrono-examen/ChronoExamenSujetPane";
import { ChronoExamenDraftPane } from "./chrono-examen/ChronoExamenDraftPane";
import { ChronoExamenHeader } from "./chrono-examen/ChronoExamenHeader";
import { useChronoExamenState } from "./chrono-examen/useChronoExamenState";

// Re-exports for backward compatibility
export {
  SUJETS_EXAMEN_S1,
  VIGNETTES_CLINIQUES_TERRAIN,
  LOCAL_STORAGE_EXAM_DRAFT,
  type SujetExamenCNAM,
  type VignetteCliniqueTerrain,
} from "@/lib/pst/data/chrono-examen-data";

interface ChronoExamenEcritModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModuleKey?:
    | "pst106"
    | "pst108"
    | "pst123"
    | "pst120"
    | "pst124"
    | "transversal";
}

export function ChronoExamenEcritModal({
  isOpen,
  onClose,
  defaultModuleKey = "pst106",
}: ChronoExamenEcritModalProps) {
  const {
    setSelectedSujetId,
    examHours,
    remainingSeconds,
    isRunning,
    draftContent,
    isFullScreen,
    setIsFullScreen,
    copied,
    mobileTab,
    setMobileTab,
    handleDraftChange,
    currentSujet,
    handleSelectHours,
    handleToggleTimer,
    handleResetTimer,
    formatTime,
    progressPercent,
    activePhase,
    wordsCount,
    handleCopyText,
  } = useChronoExamenState(defaultModuleKey);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 dark:bg-slate-950/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Chrono-Examen Concours — Simulateur 2h/3h"
    >
      <div
        className={`relative w-full flex flex-col rounded-2xl border border-slate-200/90 dark:border-indigo-500/30 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xl overflow-hidden transition-all duration-200 ${
          isFullScreen
            ? "fixed inset-0 sm:inset-2 max-w-none max-h-none rounded-none sm:rounded-2xl h-full"
            : "max-w-6xl max-h-[92vh] h-full"
        }`}
      >
        <ChronoExamenHeader
          examHours={examHours}
          onSelectHours={handleSelectHours}
          isFullScreen={isFullScreen}
          onToggleFullScreen={() => setIsFullScreen(!isFullScreen)}
          onClose={onClose}
          remainingSeconds={remainingSeconds}
          formatTime={formatTime}
          isRunning={isRunning}
          onToggleTimer={handleToggleTimer}
          onResetTimer={handleResetTimer}
          activePhase={activePhase}
          progressPercent={progressPercent}
          mobileTab={mobileTab}
          onSelectMobileTab={setMobileTab}
          wordsCount={wordsCount}
        />

        {/* Workspace Layout */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Panel: Sujet & Guide */}
          <ChronoExamenSujetPane
            currentSujet={currentSujet}
            onSelectSujet={setSelectedSujetId}
            mobileTab={mobileTab}
          />

          {/* Right Panel: Writing Area */}
          <ChronoExamenDraftPane
            currentSujet={currentSujet}
            draftContent={draftContent}
            onDraftChange={handleDraftChange}
            wordsCount={wordsCount}
            copied={copied}
            onCopyText={handleCopyText}
            mobileTab={mobileTab}
          />
        </div>
      </div>
    </div>
  );
}

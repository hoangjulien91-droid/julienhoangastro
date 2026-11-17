"use client";

import React, { useEffect } from "react";
import { OralDefenseRubricGrid } from "./oral-defense/OralDefenseRubricGrid";
import { OralDefensePacingBanner } from "./oral-defense/OralDefensePacingBanner";
import { OralDefenseQuestionList } from "./oral-defense/OralDefenseQuestionList";
import { OralDefenseQuestionDetail } from "./oral-defense/OralDefenseQuestionDetail";
import { OralDefenseHeader } from "./oral-defense/OralDefenseHeader";
import { useOralDefenseState } from "./oral-defense/useOralDefenseState";

interface PstOralDefenseSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PstOralDefenseSimulatorModal: React.FC<
  PstOralDefenseSimulatorModalProps
> = ({ isOpen, onClose }) => {
  const {
    viewMode,
    setViewMode,
    phase,
    secondsLeft,
    isRunning,
    setIsRunning,
    roleFilter,
    setRoleFilter,
    selectedId,
    setSelectedId,
    masteredMap,
    evalScores,
    showAnswer,
    setShowAnswer,
    mobileTab,
    setMobileTab,
    switchPhase,
    resetTimer,
    toggleMastered,
    formatTime,
    filteredQuestions,
    activeQuestion,
    masteredCount,
    totalScore,
    handleScoreChange,
    handleResetScores,
    verdict,
  } = useOralDefenseState(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Simulateur de Soutenance Orale et Grand Jury RNCP Niveau 7"
      className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        className="relative z-10 w-full max-w-6xl bg-card text-foreground border border-border rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <OralDefenseHeader
          viewMode={viewMode}
          onSetViewMode={setViewMode}
          phase={phase}
          onSwitchPhase={switchPhase}
          secondsLeft={secondsLeft}
          formatTime={formatTime}
          isRunning={isRunning}
          onToggleRunning={() => setIsRunning((r) => !r)}
          onResetTimer={resetTimer}
          masteredCount={masteredCount}
          totalScore={totalScore}
          onClose={onClose}
        />

        {viewMode === "questions" ? (
          <>
            {/* Phase 1 Pacing Milestones Banner */}
            <OralDefensePacingBanner />

            {/* Main 2-Column Body */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              <OralDefenseQuestionList
                questions={filteredQuestions}
                activeQuestionId={activeQuestion.id}
                roleFilter={roleFilter}
                masteredMap={masteredMap}
                mobileTab={mobileTab}
                onSelectRoleFilter={setRoleFilter}
                onSelectQuestion={(id) => {
                  setSelectedId(id);
                  setMobileTab("detail");
                }}
              />

              <OralDefenseQuestionDetail
                activeQuestion={activeQuestion}
                isMastered={!!masteredMap[activeQuestion.id]}
                showAnswer={showAnswer}
                mobileTab={mobileTab}
                totalQuestionsCount={filteredQuestions.length}
                onBackToList={() => setMobileTab("list")}
                onToggleMastered={() => toggleMastered(activeQuestion.id)}
                onToggleShowAnswer={() => setShowAnswer((s) => !s)}
              />
            </div>
          </>
        ) : (
          /* RNCP 7 Evaluation Rubric Grid */
          <OralDefenseRubricGrid
            totalScore={totalScore}
            evalScores={evalScores}
            verdict={verdict}
            onScoreChange={handleScoreChange}
            onResetScores={handleResetScores}
          />
        )}
      </div>
    </div>
  );
};

export default PstOralDefenseSimulatorModal;

"use client";

import "./planning.css";
import { PLANNING_EVENTS } from "@/lib/pst/data/planning";
import { matchesFilters } from "@/lib/pst/planning-stats";
import { PlanningGrid } from "./PlanningGrid";
import { PlanningList } from "./PlanningList";
import { CovoitManager } from "./CovoitManager";
import { ConflictArbitration } from "./ConflictArbitrationCard";
import { AttendanceDetailModal } from "./AttendanceDetailModal";
import { IcsExportModal } from "./IcsExportModal";
import { PlanningWeekView } from "./PlanningWeekView";
import { PlanningFootnotes } from "./PlanningFootnotes";
import { PlanningEventInspector } from "./PlanningEventInspector";
import { PlanningActiveFilterBanner } from "./PlanningActiveFilterBanner";
import { PlanningHeroAndKpis } from "./PlanningHeroAndKpis";
import { PlanningFilterBar } from "./PlanningFilterBar";
import { usePlanningState } from "./usePlanningState";

export function PlanningContent() {
  const {
    activeView,
    setView,
    filters,
    setFilters,
    isMobile,
    searchInputRef,
    showMobileFilters,
    setShowMobileFilters,
    showExportMenu,
    setShowExportMenu,
    showAttendanceModal,
    setShowAttendanceModal,
    showIcsModal,
    setShowIcsModal,
    selectedEvent,
    setSelectedEvent,
    selectedId,
    selectedSessionInfo,
    unitConcepts,
    selectedConflicts,
    selectedNote,
    selectedIsAttended,
    briefingCopied,
    handleCopyBriefing,
    handleUpdateNote,
    handleToggleAttended,
    handleToggleAutoMode,
    autoAttendanceMode,
    effectiveAttendedIds,
    sessionNotes,
    attendancePct,
    completedHours,
    totalPlannedHours,
    totalPhysicalDaysCount,
    globalTotals,
    presenceRemaining,
    visioRemaining,
    visioHours,
    distantRemaining,
    distantHours,
    countdownText,
    currentOrNextTodaySession,
    nextPhysical,
    activeFiltersCount,
    formatCounts,
    totalConflictsCount,
    physicalConflictsCount,
    replayableConflictsCount,
    allTeachers,
    toggleType,
    toggleUnit,
    conflictArbitrations,
    handleSetArbitration,
    chosenConflicts,
    handleSetConflictArbitration,
    presenceDaysGroups,
    todayIso,
    todayWeekKey,
    activeWeeksData,
    safeWeekIdx,
    setSelectedWeekIdx,
    jumpToNextUpcomingWeek,
    resetToDefaultFilters,
    showAllFilters,
  } = usePlanningState();

  return (
    <div className="planning-wrap space-y-4 sm:space-y-6 pb-24 sm:pb-12">
      {/* 1-3. EN-TÊTE, KPIs, SÉANCE DU JOUR & PROCHAIN DÉPLACEMENT */}
      <PlanningHeroAndKpis
        countdownText={countdownText}
        currentOrNextTodaySession={currentOrNextTodaySession}
        nextPhysical={nextPhysical}
        totalPlannedHours={totalPlannedHours}
        totalPhysicalDaysCount={totalPhysicalDaysCount}
        filters={filters}
        globalTotals={globalTotals}
        presenceRemaining={presenceRemaining}
        visioRemaining={visioRemaining}
        visioHours={visioHours}
        distantRemaining={distantRemaining}
        distantHours={distantHours}
        attendancePct={attendancePct}
        autoAttendanceMode={autoAttendanceMode}
        attendedCount={effectiveAttendedIds.size}
        completedHours={completedHours}
        onSelectEvent={setSelectedEvent}
        onToggleType={toggleType}
        onOpenAttendanceModal={() => setShowAttendanceModal(true)}
      />

      {/* 4. CONTRÔLES & FILTRES COMPACTS */}
      <PlanningFilterBar
        activeView={activeView}
        setView={setView}
        filters={filters}
        setFilters={setFilters}
        searchInputRef={searchInputRef}
        showMobileFilters={showMobileFilters}
        setShowMobileFilters={setShowMobileFilters}
        showExportMenu={showExportMenu}
        setShowExportMenu={setShowExportMenu}
        activeFiltersCount={activeFiltersCount}
        formatCounts={formatCounts}
        totalConflictsCount={totalConflictsCount}
        physicalConflictsCount={physicalConflictsCount}
        replayableConflictsCount={replayableConflictsCount}
        allTeachers={allTeachers}
        toggleType={toggleType}
        toggleUnit={toggleUnit}
        onShowAll={showAllFilters}
        onResetFilters={resetToDefaultFilters}
        onOpenIcsModal={() => setShowIcsModal(true)}
      />

      {/* ========================================================================= */}
      {/* 5. BANDEAU DE FILTRE ACTIF COMPACT & NOTE S2                              */}
      {/* ========================================================================= */}
      <PlanningActiveFilterBanner
        activeView={activeView}
        filters={filters}
        isMobile={isMobile}
        activeFiltersCount={activeFiltersCount}
        onShowAll={showAllFilters}
        onResetFilters={resetToDefaultFilters}
      />

      {/* ========================================================================= */}
      {/* 6.5 CARTES DE COMPARAISON & ARBITRAGE DES CHEVAUCHEMENTS                   */}
      {/* ========================================================================= */}
      {filters.onlyConflicts && (
        <ConflictArbitration
          arbitrations={conflictArbitrations}
          onSetArbitration={handleSetArbitration}
          onSelectEvent={setSelectedEvent}
        />
      )}

      {/* ========================================================================= */}
      {/* 7. INSPECTEUR DE SÉANCE : BRIEFING DE POCHE & GOOGLE CALENDAR EN 1 CLIC   */}
      {/* ========================================================================= */}
      {selectedEvent && selectedId && (
        <PlanningEventInspector
          selectedEvent={selectedEvent}
          selectedId={selectedId}
          selectedSessionInfo={selectedSessionInfo}
          unitConcepts={unitConcepts}
          selectedConflicts={selectedConflicts}
          selectedNote={selectedNote}
          selectedIsAttended={selectedIsAttended}
          briefingCopied={briefingCopied}
          onClose={() => setSelectedEvent(null)}
          onSelectEvent={setSelectedEvent}
          onCopyBriefing={handleCopyBriefing}
          onUpdateNote={handleUpdateNote}
          onToggleAttended={handleToggleAttended}
        />
      )}

      {/* ========================================================================= */}
      {/* 8. CONTENU PRINCIPAL SELON LA VUE SÉLECTIONNÉE                           */}
      {/* ========================================================================= */}
      {activeView === "logistics" ? (
        <CovoitManager
          presenceDaysGroups={presenceDaysGroups}
          onSelectEvent={setSelectedEvent}
          attendedIds={effectiveAttendedIds}
          onToggleAttended={handleToggleAttended}
          chosenConflicts={chosenConflicts}
          onSetConflictArbitration={handleSetConflictArbitration}
          totalPhysicalDaysCount={totalPhysicalDaysCount}
          todayIso={todayIso}
          hidePast={filters.hidePast}
        />
      ) : activeView === "week" ? (
        <PlanningWeekView
          activeWeeksData={activeWeeksData}
          safeWeekIdx={safeWeekIdx}
          setSelectedWeekIdx={setSelectedWeekIdx}
          jumpToNextUpcomingWeek={jumpToNextUpcomingWeek}
          todayIso={todayIso}
          hidePast={filters.hidePast}
          attendedIds={effectiveAttendedIds}
          sessionNotes={sessionNotes}
          selectedId={selectedId}
          onSelectEvent={setSelectedEvent}
          onToggleAttended={handleToggleAttended}
        />
      ) : (
        <div className="view-switch" data-view={activeView}>
          <div className="pv-grid">
            <PlanningGrid
              filters={filters}
              todayWeekKey={todayWeekKey}
              selectedEventId={selectedId}
              onSelectEvent={setSelectedEvent}
              attendedIds={effectiveAttendedIds}
            />
          </div>
          <div className="pv-list">
            <PlanningList
              filters={filters}
              todayIso={todayIso}
              selectedEventId={selectedId}
              onSelectEvent={setSelectedEvent}
              attendedIds={effectiveAttendedIds}
              onToggleAttended={handleToggleAttended}
              sessionNotes={sessionNotes}
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. MODALES APPLE : ASSIDUITÉ PAR UE (159H) & EXPORT .ICS CONTEXTUEL       */}
      {/* ========================================================================= */}
      <AttendanceDetailModal
        isOpen={showAttendanceModal}
        onClose={() => setShowAttendanceModal(false)}
        attendedIds={effectiveAttendedIds}
        autoAttendanceMode={autoAttendanceMode}
        onToggleAutoMode={handleToggleAutoMode}
        onFilterUnit={(u) =>
          setFilters((f) => ({
            ...f,
            units: new Set([u]),
          }))
        }
      />

      <IcsExportModal
        isOpen={showIcsModal}
        onClose={() => setShowIcsModal(false)}
        filteredEvents={PLANNING_EVENTS.filter((e) =>
          matchesFilters(e, filters),
        )}
        totalEventsCount={PLANNING_EVENTS.length}
      />

      <PlanningFootnotes />
    </div>
  );
}

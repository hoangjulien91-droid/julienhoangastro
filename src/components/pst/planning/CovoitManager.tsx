"use client";

import type { PlanningEvent } from "@/lib/pst/data/planning";
import { CovoitGroupConfigCard } from "./CovoitGroupConfigCard";
import { CovoitDayCard } from "./CovoitDayCard";
import { useCovoitState } from "./covoit/useCovoitState";

export { type CovoitMember, DEFAULT_COVOIT_MEMBERS } from "@/lib/pst/data/covoit-config";

export interface CovoitManagerProps {
  presenceDaysGroups: [string, PlanningEvent[]][];
  onSelectEvent: (e: PlanningEvent) => void;
  attendedIds: Set<string>;
  onToggleAttended: (id: string) => void;
  chosenConflicts: Record<string, string>;
  onSetConflictArbitration: (date: string, chosenUnitOrId: string) => void;
  totalPhysicalDaysCount: number;
  todayIso?: string | null;
  hidePast?: boolean;
}

export function CovoitManager({
  presenceDaysGroups,
  onSelectEvent,
  attendedIds,
  onToggleAttended,
  chosenConflicts,
  onSetConflictArbitration,
  totalPhysicalDaysCount,
  todayIso,
  hidePast,
}: CovoitManagerProps) {
  const {
    members,
    drivers,
    absences,
    showConfig,
    setShowConfig,
    copiedDate,
    newMemberName,
    setNewMemberName,
    driverCounts,
    ueEnrollmentCounts,
    overallSuggestedMember,
    handleAddMember,
    handleRemoveMember,
    handleToggleMemberUnit,
    handleResetDefaultMembers,
    handleAutoDistributeDrivers,
    handleResetDrivers,
    handleSetDriver,
    handleToggleAbsence,
    handleCopyWhatsApp,
  } = useCovoitState(presenceDaysGroups);

  return (
    <div className="space-y-6">
      {/* 1. CARTE MAÎTRESSE : CONFIGURATION DU GROUPE & MATRICE DES UE */}
      <CovoitGroupConfigCard
        showConfig={showConfig}
        setShowConfig={setShowConfig}
        members={members}
        drivers={drivers}
        driverCounts={driverCounts}
        ueEnrollmentCounts={ueEnrollmentCounts}
        overallSuggestedMember={overallSuggestedMember}
        totalPhysicalDaysCount={totalPhysicalDaysCount}
        newMemberName={newMemberName}
        setNewMemberName={setNewMemberName}
        handleAddMember={handleAddMember}
        handleRemoveMember={handleRemoveMember}
        handleToggleMemberUnit={handleToggleMemberUnit}
        handleResetDefaultMembers={handleResetDefaultMembers}
        handleAutoDistributeDrivers={handleAutoDistributeDrivers}
        handleResetDrivers={handleResetDrivers}
      />

      {/* 2. GRILLE DES JOURNÉES INTELLIGENTES DE DÉPLACEMENT */}
      {(() => {
        const visiblePresenceDays =
          hidePast && todayIso
            ? presenceDaysGroups.filter(([date]) => date >= todayIso)
            : presenceDaysGroups;

        if (visiblePresenceDays.length === 0) {
          return (
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
              Tous les trajets de covoiturage programmés sont passés. Désactivez
              le filtre &laquo;&nbsp;À venir uniquement&nbsp;&raquo; pour revoir
              l&apos;historique des trajets.
            </div>
          );
        }

        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {visiblePresenceDays.map(([date, dayEvents]) => (
              <CovoitDayCard
                key={date}
                date={date}
                dayEvents={dayEvents}
                todayIso={todayIso}
                members={members}
                drivers={drivers}
                absences={absences}
                driverCounts={driverCounts}
                copiedDate={copiedDate}
                chosenConflicts={chosenConflicts}
                attendedIds={attendedIds}
                onCopyWhatsApp={handleCopyWhatsApp}
                onSetDriver={handleSetDriver}
                onToggleAbsence={handleToggleAbsence}
                onSetConflictArbitration={onSetConflictArbitration}
                onSelectEvent={onSelectEvent}
                onToggleAttended={onToggleAttended}
              />
            ))}
          </div>
        );
      })()}
    </div>
  );
}

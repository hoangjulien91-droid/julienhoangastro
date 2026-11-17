"use client";

import React, { useState, useEffect, useMemo } from "react";
import type { PlanningEvent, PlanningUnitId } from "@/lib/pst/data/planning";
import { formatFrDate } from "@/lib/pst/planning-stats";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";
import {
  type CovoitMember,
  DEFAULT_COVOIT_MEMBERS,
  STORAGE_MEMBERS_KEY,
  STORAGE_DRIVERS_KEY,
  STORAGE_ABSENCES_KEY,
  reconcileMembers,
} from "@/lib/pst/data/covoit-config";
import { CovoitGroupConfigCard } from "./CovoitGroupConfigCard";
import { CovoitDayCard } from "./CovoitDayCard";

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
  const [members, setMembers] = useState<CovoitMember[]>(DEFAULT_COVOIT_MEMBERS);
  const [drivers, setDrivers] = useState<Record<string, string>>({});
  const [absences, setAbsences] = useState<Record<string, string[]>>({});
  const [showConfig, setShowConfig] = useState(false);
  const [copiedDate, setCopiedDate] = useState<string | null>(null);
  const [newMemberName, setNewMemberName] = useState("");

  // Hydration from LocalStorage (persistance locale dans le navigateur)
  useEffect(() => {
    try {
      const storedV3 = window.localStorage.getItem(STORAGE_MEMBERS_KEY);
      const storedV2 = window.localStorage.getItem("pst_covoit_group_v2");
      const storedMembers = storedV3 || storedV2;

      if (storedMembers) {
        const parsed = JSON.parse(storedMembers);
        const reconciled = reconcileMembers(parsed);
        setMembers(reconciled);
        window.localStorage.setItem(
          STORAGE_MEMBERS_KEY,
          JSON.stringify(reconciled),
        );
      } else {
        setMembers(DEFAULT_COVOIT_MEMBERS);
        window.localStorage.setItem(
          STORAGE_MEMBERS_KEY,
          JSON.stringify(DEFAULT_COVOIT_MEMBERS),
        );
      }

      const storedDrivers = window.localStorage.getItem(STORAGE_DRIVERS_KEY);
      if (storedDrivers) {
        const parsed = JSON.parse(storedDrivers);
        if (parsed && typeof parsed === "object") {
          setDrivers(parsed);
        }
      }

      const storedAbsences = window.localStorage.getItem(STORAGE_ABSENCES_KEY);
      if (storedAbsences) {
        const parsed = JSON.parse(storedAbsences);
        if (parsed && typeof parsed === "object") {
          setAbsences(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  function saveMembers(newMembers: CovoitMember[]) {
    setMembers(newMembers);
    try {
      window.localStorage.setItem(
        STORAGE_MEMBERS_KEY,
        JSON.stringify(newMembers),
      );
    } catch {
      // ignore
    }
  }

  function handleSetDriver(date: string, driverId: string) {
    playSuccessSound();
    setDrivers((prev) => {
      const next = { ...prev };
      if (next[date] === driverId) {
        delete next[date];
      } else {
        next[date] = driverId;
      }
      try {
        window.localStorage.setItem(STORAGE_DRIVERS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  function handleToggleAbsence(date: string, memberId: string) {
    playClickSound();
    setAbsences((prev) => {
      const currentList = prev[date] ?? [];
      const nextList = currentList.includes(memberId)
        ? currentList.filter((id) => id !== memberId)
        : [...currentList, memberId];
      const next = { ...prev, [date]: nextList };
      try {
        window.localStorage.setItem(STORAGE_ABSENCES_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  // Equity count: How many trips each member has driven
  const driverCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const m of members) {
      counts[m.id] = 0;
    }
    for (const dId of Object.values(drivers)) {
      if (counts[dId] !== undefined) {
        counts[dId] = (counts[dId] ?? 0) + 1;
      }
    }
    return counts;
  }, [members, drivers]);

  // Registered count per UE to verify <= 5
  const ueEnrollmentCounts = useMemo(() => {
    const counts: Record<PlanningUnitId, number> = {
      pst106: 0,
      pst108: 0,
      pst120: 0,
      pst123: 0,
      pst124: 0,
    };
    for (const m of members) {
      for (const u of m.units) {
        counts[u] = (counts[u] ?? 0) + 1;
      }
    }
    return counts;
  }, [members]);

  // Overall suggested driver across upcoming trips
  const overallSuggestedMember = useMemo(() => {
    if (members.length === 0) return null;
    let minTrips = Infinity;
    let chosen: CovoitMember | null = null;
    for (const m of members) {
      const count = driverCounts[m.id] ?? 0;
      if (count < minTrips) {
        minTrips = count;
        chosen = m;
      }
    }
    return chosen;
  }, [members, driverCounts]);

  function handleAddMember() {
    if (!newMemberName.trim()) return;
    playClickSound();
    const newId = `member_${Date.now()}`;
    const updated = [
      ...members,
      {
        id: newId,
        name: newMemberName.trim(),
        units: ["pst106", "pst123"] as PlanningUnitId[],
      },
    ];
    saveMembers(updated);
    setNewMemberName("");
  }

  function handleRemoveMember(id: string) {
    playClickSound();
    const updated = members.filter((m) => m.id !== id);
    saveMembers(updated);
  }

  function handleToggleMemberUnit(memberId: string, unit: PlanningUnitId) {
    playClickSound();
    const updated = members.map((m) => {
      if (m.id !== memberId) return m;
      const nextUnits = m.units.includes(unit)
        ? m.units.filter((u) => u !== unit)
        : [...m.units, unit];
      return { ...m, units: nextUnits };
    });
    saveMembers(updated);
  }

  function handleResetDefaultMembers() {
    playClickSound();
    saveMembers(DEFAULT_COVOIT_MEMBERS);
    setDrivers({});
    setAbsences({});
    try {
      window.localStorage.removeItem(STORAGE_DRIVERS_KEY);
      window.localStorage.removeItem(STORAGE_ABSENCES_KEY);
    } catch {
      // ignore
    }
  }

  // Distribution automatique équitable des journées selon les présences
  function handleAutoDistributeDrivers() {
    playSuccessSound();
    const newDrivers: Record<string, string> = {};
    const runningCounts: Record<string, number> = {};
    for (const m of members) {
      runningCounts[m.id] = 0;
    }

    for (const [date, dayEvents] of presenceDaysGroups) {
      const dayUnits = new Set(dayEvents.map((e) => e.unit));
      const enrolled = members.filter((m) =>
        m.units.some((u) => dayUnits.has(u)),
      );
      const dayAbsenceList = absences[date] ?? [];
      const present = enrolled.filter((m) => !dayAbsenceList.includes(m.id));
      if (present.length === 0) continue;

      let minTrips = Infinity;
      let chosen: CovoitMember = present[0]!;
      for (const m of present) {
        const count = runningCounts[m.id] ?? 0;
        if (count < minTrips) {
          minTrips = count;
          chosen = m;
        }
      }

      newDrivers[date] = chosen.id;
      runningCounts[chosen.id] = (runningCounts[chosen.id] ?? 0) + 1;
    }

    setDrivers(newDrivers);
    try {
      window.localStorage.setItem(
        STORAGE_DRIVERS_KEY,
        JSON.stringify(newDrivers),
      );
    } catch {
      // ignore
    }
  }

  function handleResetDrivers() {
    playClickSound();
    setDrivers({});
    try {
      window.localStorage.removeItem(STORAGE_DRIVERS_KEY);
    } catch {
      // ignore
    }
  }

  // Copy WhatsApp briefing for a day
  function handleCopyWhatsApp(
    date: string,
    dayEvents: PlanningEvent[],
    driver: CovoitMember | null,
    presentMembers: CovoitMember[],
    depTime: string,
    retTime: string,
  ) {
    const first = dayEvents[0]!;
    const uesList = Array.from(
      new Set(dayEvents.map((e) => e.unit.toUpperCase())),
    ).join(" & ");
    const coursesDetail = dayEvents
      .map(
        (e) =>
          `• ${e.unit.toUpperCase()} : ${e.start}–${e.end} (${e.room ?? "Cnam Bègles"})`,
      )
      .join("\n");

    const driverName = driver ? driver.name : "À désigner (équité suggérée)";
    const equipageText =
      presentMembers.length > 0
        ? presentMembers.map((m) => m.name).join(", ")
        : "Julien";

    const isAllCancelled = dayEvents.every((e) => e.cancelled);
    const titlePrefix = isAllCancelled
      ? "⚠️ *[SÉANCE ANNULÉE - REPORT À VENIR]*\n"
      : "";

    const message = [
      `${titlePrefix}🚗 *Déplacement Cnam Bègles — ${first.day} ${formatFrDate(date)}*`,
      `📚 *UE programmée(s) :* ${uesList}`,
      coursesDetail,
      "",
      `📍 *Départ Anglet (BAB) :* ${depTime} (Parking Relais / Aire Covoiturage)`,
      `🏁 *Retour estimé Anglet :* ~${retTime} (190 km via A63)`,
      `🚙 *Véhicule :* Voiture personnelle (1 voiture / max 5)`,
      `👤 *Conducteur :* ${driverName}`,
      `👥 *Équipage (${presentMembers.length}/5) :* ${equipageText}`,
      "",
      "🔗 _Planning interactif : https://julienhoang.com/pst/planning/_",
    ].join("\n");

    navigator.clipboard.writeText(message);
    playSuccessSound();
    setCopiedDate(date);
    setTimeout(() => setCopiedDate(null), 2500);
  }

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

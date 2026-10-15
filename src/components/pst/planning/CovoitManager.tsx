"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Car,
  Users,
  User,
  Check,
  Copy,
  Sparkles,
  MapPin,
  Clock,
  Calendar,
  AlertTriangle,
  Plus,
  Trash2,
  Settings,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import {
  type PlanningEvent,
  type PlanningUnitId,
  UNIT_ORDER,
  UNIT_TITLES,
} from "@/lib/pst/data/planning";
import {
  eventId,
  eventLocation,
  formatFrDate,
  getEventConflicts,
} from "@/lib/pst/planning-stats";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";

export interface CovoitMember {
  id: string;
  name: string;
  units: PlanningUnitId[];
  isUser?: boolean;
}

const DEFAULT_COVOIT_MEMBERS: CovoitMember[] = [
  {
    id: "julien",
    name: "Julien",
    units: ["pst106", "pst108", "pst120", "pst123", "pst124"],
    isUser: true,
  },
];

const STORAGE_MEMBERS_KEY = "pst_covoit_group_v2";
const STORAGE_DRIVERS_KEY = "pst_covoit_drivers_v2";
const STORAGE_ABSENCES_KEY = "pst_covoit_absences_v2";

function timeToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

function minutesToHhmm(totalMinutes: number): string {
  let m = totalMinutes;
  if (m < 0) m += 24 * 60;
  if (m >= 24 * 60) m %= 24 * 60;
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

interface CovoitManagerProps {
  presenceDaysGroups: [string, PlanningEvent[]][];
  onSelectEvent: (e: PlanningEvent) => void;
  attendedIds: Set<string>;
  onToggleAttended: (id: string) => void;
  chosenConflicts: Record<string, string>;
  onSetConflictArbitration: (date: string, chosenUnitOrId: string) => void;
  totalPhysicalDaysCount: number;
}

export function CovoitManager({
  presenceDaysGroups,
  onSelectEvent,
  attendedIds,
  onToggleAttended,
  chosenConflicts,
  onSetConflictArbitration,
  totalPhysicalDaysCount,
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
      const storedMembers = window.localStorage.getItem(STORAGE_MEMBERS_KEY);
      if (storedMembers) {
        const parsed = JSON.parse(storedMembers);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filtrer uniquement les anciens prénoms mock/bannis demandés
          const legacyBlacklist = [
            "axelle",
            "léa",
            "lea",
            "florence",
            "hélène",
            "helene",
            "céline",
            "celine",
            "jénnifer",
            "jennifer",
            "thomas",
            "sophie",
          ];
          const cleaned = parsed.filter(
            (m: any) =>
              m &&
              typeof m.name === "string" &&
              !legacyBlacklist.includes(m.name.trim().toLowerCase()),
          );

          // S'assurer que Julien est toujours présent comme profil principal
          const hasJulien = cleaned.some(
            (m: any) =>
              m.id === "julien" ||
              (typeof m.name === "string" && m.name.toLowerCase().includes("julien")),
          );
          const finalMembers: CovoitMember[] = hasJulien
            ? cleaned
            : [...DEFAULT_COVOIT_MEMBERS, ...cleaned];

          setMembers(finalMembers);
          window.localStorage.setItem(
            STORAGE_MEMBERS_KEY,
            JSON.stringify(finalMembers),
          );
        } else {
          setMembers(DEFAULT_COVOIT_MEMBERS);
          window.localStorage.setItem(
            STORAGE_MEMBERS_KEY,
            JSON.stringify(DEFAULT_COVOIT_MEMBERS),
          );
        }
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
      window.localStorage.setItem(STORAGE_MEMBERS_KEY, JSON.stringify(newMembers));
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
    const uesList = Array.from(new Set(dayEvents.map((e) => e.unit.toUpperCase()))).join(" & ");
    const coursesDetail = dayEvents
      .map(
        (e) =>
          `• ${e.unit.toUpperCase()} : ${e.start}–${e.end} (${e.room ?? "Cnam Bègles"})`,
      )
      .join("\n");

    const driverName =
      driver?.name ?? (members.length === 1 ? members[0]?.name : "Julien");
    const equipageText =
      presentMembers.length > 1
        ? presentMembers.map((m) => m.name).join(", ")
        : (presentMembers[0]?.name ?? "Julien");

    const message = [
      `🚗 *Déplacement Cnam Bègles — ${first.day} ${formatFrDate(date)}*`,
      `📚 *UE programmée(s) :* ${uesList}`,
      coursesDetail,
      "",
      `📍 *Départ Anglet (BAB) :* ${depTime} (Parking Relais / Aire Covoiturage)`,
      `🏁 *Retour estimé Anglet :* ~${retTime} (190 km via A63)`,
      `🚙 *Véhicule :* Voiture personnelle (trajet direct A63)`,
      `👤 *Conducteur :* ${driverName}`,
      `👥 *Participant(s) :* ${equipageText}`,
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
      {/* ========================================================================= */}
      {/* 1. CARTE MAÎTRESSE : CONFIGURATION DU GROUPE & MATRICE DES UE             */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/85 dark:bg-slate-900/85 border border-amber-500/35 backdrop-blur-md shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/70 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-900 dark:text-amber-200 text-[11px] font-black uppercase tracking-wider font-mono">
              <Car className="size-3.5 text-amber-600" />
              <span>Trajets Présentiel BAB (Anglet ↔ Cnam Bègles)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Trajet direct A63 (~190 km) • {totalPhysicalDaysCount} journées
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Organisation logistique et routière des <b>{totalPhysicalDaysCount} journées</b> de cours en présentiel à Cité du Numérique (Bègles) pour <b>Julien</b>. Horaires de départ calculés avec 2h15 de marge avant le début des cours.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setShowConfig((prev) => !prev);
              }}
              className="w-full sm:w-auto justify-center px-3.5 py-2.5 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs"
            >
              <Settings className="size-3.5" />
              <span>{showConfig ? "Masquer la configuration" : "Gérer les options de trajet"}</span>
              {showConfig ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
            </button>
          </div>
        </div>

        {/* COMPTEUR DE TRAJETS */}
        <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/25 space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="text-xs font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-amber-600" />
              <span>Trajets de conduite prévus (Saison 2026-2027) :</span>
            </div>
            {overallSuggestedMember && members.length > 1 && (
              <div className="text-[11px] font-medium text-amber-900 dark:text-amber-200 flex items-center gap-1">
                <span>💡 Priorité équité globale :</span>
                <span className="font-bold underline decoration-amber-500">
                  {overallSuggestedMember.name} ({driverCounts[overallSuggestedMember.id] ?? 0} trajet{driverCounts[overallSuggestedMember.id] > 1 ? "s" : ""})
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-wrap text-xs">
            {members.map((m) => {
              const count = driverCounts[m.id] ?? 0;
              return (
                <div
                  key={m.id}
                  className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 flex items-center gap-2 shadow-2xs font-mono"
                >
                  <span className="font-bold text-slate-900 dark:text-slate-100 font-sans">
                    {m.name}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-950 dark:text-amber-200 font-bold text-[10px]">
                    🚗 {count || totalPhysicalDaysCount} trajets
                  </span>
                </div>
              );
            })}
          </div>

          {/* MATRICE DE VÉRIFICATION DES INSCRIPTIONS */}
          <div className="pt-2 border-t border-amber-500/20 flex items-center gap-2 overflow-x-auto text-xs flex-wrap">
            <span className="text-[11px] font-bold text-amber-900 dark:text-amber-200">
              Inscriptions UE :
            </span>
            {UNIT_ORDER.map((u) => {
              const enrolled = ueEnrollmentCounts[u] ?? 0;
              return (
                <span
                  key={u}
                  className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30"
                >
                  <span className="uppercase">{u}</span> : {enrolled > 0 ? "Inscrit ✓" : "Option"}
                </span>
              );
            })}
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 ml-auto">
              ✓ 13 journées de présentiel couvertes
            </span>
          </div>
        </div>

        {/* TIROIR DE CONFIGURATION (ACCORDÉON) */}
        {showConfig && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Users className="size-4 text-slate-500" />
                <span>Configuration du profil &amp; Inscriptions aux UE</span>
              </div>
              <button
                type="button"
                onClick={handleResetDefaultMembers}
                className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                title="Rétablir la configuration par défaut (Julien)"
              >
                <RotateCcw className="size-3" />
                <span>Rétablir par défaut</span>
              </button>
            </div>

            {/* Version mobile : Cartes tactiles avec chips d'inscriptions aux UE */}
            <div className="block md:hidden space-y-3">
              {members.map((m) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        {m.name}
                      </span>
                      {m.isUser && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-900 dark:text-amber-200 text-[9px] uppercase font-bold">
                          Moi
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-500">
                        {m.units.length} / {UNIT_ORDER.length} UE
                      </span>
                      {!m.isUser && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(m.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 cursor-pointer"
                          title="Supprimer ce membre"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
                    {UNIT_ORDER.map((u) => {
                      const checked = m.units.includes(u);
                      return (
                        <button
                          key={u}
                          type="button"
                          onClick={() => handleToggleMemberUnit(m.id, u)}
                          className={`py-1.5 rounded-xl font-mono text-[11px] font-bold uppercase border transition-all text-center cursor-pointer active:scale-95 ${
                            checked
                              ? "bg-amber-600 text-white border-amber-600 shadow-2xs"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          {u}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Version desktop : Table classique */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 font-mono text-[11px]">
                    <th className="py-2 px-3">Prénom / Membre</th>
                    {UNIT_ORDER.map((u) => (
                      <th key={u} className="py-2 px-2 text-center uppercase">
                        {u}
                      </th>
                    ))}
                    <th className="py-2 px-2 text-center">Total UE</th>
                    <th className="py-2 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-slate-700/60">
                  {members.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/60 transition-colors">
                      <td className="py-2 px-3 font-semibold text-slate-900 dark:text-slate-100">
                        {m.name}
                        {m.isUser && (
                          <span className="ml-1.5 px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-900 dark:text-amber-200 text-[9px] uppercase font-bold">
                            Moi
                          </span>
                        )}
                      </td>
                      {UNIT_ORDER.map((u) => {
                        const checked = m.units.includes(u);
                        return (
                          <td key={u} className="py-2 px-2 text-center">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => handleToggleMemberUnit(m.id, u)}
                              aria-label={`Inscription de ${m.name} à l'UE ${u}`}
                              className="size-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                            />
                          </td>
                        );
                      })}
                      <td className="py-2 px-2 text-center font-mono font-bold text-slate-600 dark:text-slate-300">
                        {m.units.length}
                      </td>
                      <td className="py-2 px-2 text-right">
                        {!m.isUser && (
                          <button
                            type="button"
                            onClick={() => handleRemoveMember(m.id)}
                            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 cursor-pointer transition-colors"
                            title="Supprimer ce membre"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Ajouter un membre */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <input
                type="text"
                placeholder="Prénom d'un nouveau collègue..."
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddMember()}
                className="px-3 py-2 sm:py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex-1 sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
              <button
                type="button"
                onClick={handleAddMember}
                className="w-full sm:w-auto justify-center px-3.5 py-2 sm:py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <Plus className="size-3.5" />
                <span>Ajouter au groupe</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. GRILLE DES 13 JOURNÉES INTELLIGENTES DE DÉPLACEMENT                    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {presenceDaysGroups.map(([date, dayEvents]) => {
          const first = dayEvents[0]!;
          const last = dayEvents[dayEvents.length - 1]!;
          const isCluster = dayEvents.some((e) => e.cluster);
          const isFullday = dayEvents.some((e) => e.fullday);

          // Calculate departure from Anglet BAB: 2h15 before first course start
          const firstStartMin = timeToMinutes(first.start);
          const depTime = minutesToHhmm(firstStartMin - 135);

          // Calculate return to Anglet: 2h15 after last course end
          const lastEndMin = timeToMinutes(last.end);
          const retTime = minutesToHhmm(lastEndMin + 135);

          // Units taught on this day
          const dayUnits = new Set(dayEvents.map((e) => e.unit));

          // Members enrolled in at least one UE of this day
          const enrolledMembers = members.filter((m) =>
            m.units.some((u) => dayUnits.has(u)),
          );

          // Present members for this day (enrolled minus day absences)
          const dayAbsenceList = absences[date] ?? [];
          const presentMembers = enrolledMembers.filter(
            (m) => !dayAbsenceList.includes(m.id),
          );

          // Current designated driver
          const currentDriverId = drivers[date];
          const currentDriver =
            members.find((m) => m.id === currentDriverId) ??
            (members.length === 1 ? members[0]! : null);

          // Local suggestion for driver based on minimum trips among present members
          const daySuggestedDriver = useMemo(() => {
            if (presentMembers.length === 0) return null;
            let min = Infinity;
            let best: CovoitMember | null = null;
            for (const m of presentMembers) {
              const count = driverCounts[m.id] ?? 0;
              if (count < min) {
                min = count;
                best = m;
              }
            }
            return best;
          }, [presentMembers, driverCounts]);

          const hasSameTimeOverlap =
            dayEvents.length > 1 &&
            dayEvents.some((e) =>
              getEventConflicts(e).some((c) => c.type === "COURS"),
            );

          return (
            <div
              key={date}
              className="p-4 sm:p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-xs flex flex-col justify-between gap-4"
            >
              {/* Header de la journée */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/70 dark:border-slate-800 pb-3">
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-sm uppercase font-black text-amber-700 dark:text-amber-400">
                      {first.day} {formatFrDate(date)}
                    </span>
                    {isCluster && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                        Cluster 2j
                      </span>
                    )}
                    {isFullday && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        Journée complète
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500">
                    Amplitude Cnam Bègles : <b>{first.start} – {last.end}</b>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleCopyWhatsApp(
                      date,
                      dayEvents,
                      currentDriver,
                      presentMembers,
                      depTime,
                      retTime,
                    )
                  }
                  className="w-full sm:w-auto justify-center px-3.5 py-2 sm:py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs shrink-0"
                  title="Copier le récapitulatif pour le groupe WhatsApp"
                >
                  <Copy className="size-3.5" />
                  <span>{copiedDate === date ? "✓ Copié !" : "📋 Copier WhatsApp"}</span>
                </button>
              </div>

              {/* HORAIRES & POINT DE RDV ANGLET / BAB */}
              <div className="p-3 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-amber-600 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">
                      📍 Départ Covoit&apos; Anglet : {depTime}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Parking Relais BAB (2h15 avant le 1er cours)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-slate-400 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">
                      🏁 Retour estimé Anglet : ~{retTime}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      190 km • ~2h05 via A63
                    </div>
                  </div>
                </div>
              </div>

              {/* SÉLECTEUR DU CONDUCTEUR DU JOUR (1 SEULE VOITURE) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <Car className="size-3.5 text-amber-600" />
                    <span>🚗 Conducteur du jour :</span>
                  </span>
                  {currentDriver ? (
                    <span className="font-mono text-[11px] font-black text-amber-700 dark:text-amber-400">
                      Volant : {currentDriver.name}
                    </span>
                  ) : daySuggestedDriver ? (
                    <button
                      type="button"
                      onClick={() => handleSetDriver(date, daySuggestedDriver.id)}
                      className="text-[10px] text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                      title="Attribuer automatiquement au membre ayant le moins conduit"
                    >
                      <Sparkles className="size-3" />
                      <span>Suggéré par équité : {daySuggestedDriver.name}</span>
                    </button>
                  ) : null}
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {presentMembers.map((m) => {
                    const isDriver =
                      currentDriverId === m.id ||
                      (members.length === 1 && m.id === "julien");
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleSetDriver(date, m.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 ${
                          isDriver
                            ? "bg-amber-600 text-white shadow-xs ring-2 ring-amber-500/30"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        <Car className="size-3" />
                        <span>{m.name}</span>
                        {isDriver && <Check className="size-3" />}
                      </button>
                    );
                  })}

                  {/* Bouton rapide "Je prends ma voiture" si plusieurs membres et Julien présent non conducteur */}
                  {members.length > 1 &&
                    presentMembers.some((m) => m.id === "julien") &&
                    currentDriverId !== "julien" && (
                      <button
                        type="button"
                        onClick={() => handleSetDriver(date, "julien")}
                        className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 cursor-pointer transition-colors"
                      >
                        🙋‍♂️ Je prends ma voiture
                      </button>
                    )}
                </div>
              </div>

              {/* PARTICIPANT(S) / ÉQUIPAGE */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Users className="size-3.5 text-slate-400" />
                    <span>
                      {members.length > 1
                        ? `Équipage prévu (${presentMembers.length}/5) :`
                        : "Participant :"}
                    </span>
                  </span>
                  {members.length > 1 && (
                    <span className="text-[10px] text-slate-400">
                      Cliquer pour marquer un collègue absent
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {enrolledMembers.map((m) => {
                    const isAbsent = dayAbsenceList.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() =>
                          members.length > 1 && handleToggleAbsence(date, m.id)
                        }
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1 ${
                          isAbsent
                            ? "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 line-through opacity-60 cursor-pointer"
                            : "bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
                        } ${members.length > 1 ? "cursor-pointer active:scale-95" : "cursor-default"}`}
                      >
                        {!isAbsent && (
                          <Check className="size-3 text-emerald-600" />
                        )}
                        <span>{m.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ARBITRAGE SI 2 COURS EN PARALLÈLE DANS 2 SALLES */}
              {hasSameTimeOverlap && (
                <div className="p-3 rounded-2xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/30 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-rose-950 dark:text-rose-200">
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="size-3 text-rose-600" />
                      <span>Conflit 2 salles simultanées : arbitrage requis</span>
                    </span>
                    <span className="text-[10px] font-mono opacity-80">1 seule salle possible</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {dayEvents.map((ev) => {
                      const isChosen = chosenConflicts[date] === ev.unit;
                      return (
                        <button
                          key={ev.unit}
                          type="button"
                          onClick={() => onSetConflictArbitration(date, ev.unit)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 shadow-2xs ${
                            isChosen
                              ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                              : "bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-300/80 dark:border-slate-700 hover:border-rose-500"
                          }`}
                        >
                          <span>{isChosen ? "✓ Présent en" : "Choisir"}</span>
                          <span className="font-mono uppercase">{ev.unit}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* LISTE DES SÉANCES DU JOUR */}
              <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                {dayEvents.map((ev) => {
                  const id = eventId(ev);
                  const done = attendedIds.has(id);
                  const chosenForDate = chosenConflicts[date];
                  const isSacrificed = Boolean(chosenForDate && chosenForDate !== ev.unit);

                  return (
                    <div
                      key={id}
                      onClick={() => onSelectEvent(ev)}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-all text-xs ${
                        isSacrificed
                          ? "opacity-50 bg-slate-100/50 dark:bg-slate-900/50 border-dashed border-slate-300 dark:border-slate-800"
                          : "bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-500/10 border-slate-200/60 dark:border-slate-800"
                      }`}
                    >
                      <div>
                        <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 flex-wrap">
                          <span className="px-1.5 py-0.5 rounded bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-mono text-[10px]">
                            {ev.unit.toUpperCase()}
                          </span>
                          <span>{ev.start}–{ev.end}</span>
                          <span className="text-amber-700 dark:text-amber-400">· {ev.room}</span>
                          {isSacrificed && (
                            <span className="text-[10px] text-slate-400 font-normal">
                              (À rattraper en replay)
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{ev.teacher}</div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleAttended(id);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border cursor-pointer shrink-0 transition-colors ${
                          done
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "border-slate-300 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                        }`}
                      >
                        {done ? "✓ Fait" : "Pointer"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

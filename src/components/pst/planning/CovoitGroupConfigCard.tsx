"use client";

import React from "react";
import {
  Car,
  Settings,
  ChevronDown,
  ChevronUp,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { UNIT_ORDER, type PlanningUnitId } from "@/lib/pst/data/planning";
import type { CovoitMember } from "@/lib/pst/data/covoit-config";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { CovoitGroupConfigDrawer } from "./covoit/CovoitGroupConfigDrawer";

export interface CovoitGroupConfigCardProps {
  totalPhysicalDaysCount: number;
  showConfig: boolean;
  setShowConfig: React.Dispatch<React.SetStateAction<boolean>>;
  overallSuggestedMember: CovoitMember | null;
  members: CovoitMember[];
  driverCounts: Record<string, number>;
  drivers: Record<string, string>;
  ueEnrollmentCounts: Record<PlanningUnitId, number>;
  newMemberName: string;
  setNewMemberName: (n: string) => void;
  handleAutoDistributeDrivers: () => void;
  handleResetDrivers: () => void;
  handleResetDefaultMembers: () => void;
  handleRemoveMember: (id: string) => void;
  handleToggleMemberUnit: (memberId: string, u: PlanningUnitId) => void;
  handleAddMember: () => void;
}

export function CovoitGroupConfigCard({
  totalPhysicalDaysCount,
  showConfig,
  setShowConfig,
  overallSuggestedMember,
  members,
  driverCounts,
  drivers,
  ueEnrollmentCounts,
  newMemberName,
  setNewMemberName,
  handleAutoDistributeDrivers,
  handleResetDrivers,
  handleResetDefaultMembers,
  handleRemoveMember,
  handleToggleMemberUnit,
  handleAddMember,
}: CovoitGroupConfigCardProps) {
  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white/85 dark:bg-slate-900/85 border border-amber-500/35 backdrop-blur-md shadow-xs space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/70 dark:border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-900 dark:text-amber-200 text-[10.5px] sm:text-[11px] font-black uppercase tracking-wider font-mono whitespace-nowrap">
            <Car className="size-3.5 text-amber-600 shrink-0" />
            <span>COVOITURAGE BAB • 1 VOITURE (MAX 5)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Trajet direct A63 (~190 km) • {totalPhysicalDaysCount} journées
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Organisation logistique et routière des{" "}
            <b>{totalPhysicalDaysCount} journées</b> de cours en présentiel à
            Cité du Numérique (Bègles) pour le groupe local Cnam (
            <b>7 membres</b> : Julien, Axelle, Florence, Léa, Jennifer, Céline,
            Hélène). Horaires de départ calculés avec 2h15 de marge avant le
            début des cours.
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
            <span>
              {showConfig
                ? "Masquer la configuration"
                : "Gérer les options de trajet"}
            </span>
            {showConfig ? (
              <ChevronUp className="size-3.5" />
            ) : (
              <ChevronDown className="size-3.5" />
            )}
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
          <div className="flex items-center gap-2 flex-wrap">
            {overallSuggestedMember && members.length > 1 && (
              <div className="text-[11px] font-medium text-amber-900 dark:text-amber-200 flex items-center gap-1">
                <span>💡 Priorité équité globale :</span>
                <span className="font-bold underline decoration-amber-500">
                  {overallSuggestedMember.name} (
                  {driverCounts[overallSuggestedMember.id] ?? 0} trajet
                  {(driverCounts[overallSuggestedMember.id] ?? 0) > 1
                    ? "s"
                    : ""}
                  )
                </span>
              </div>
            )}
            <button
              type="button"
              onClick={handleAutoDistributeDrivers}
              className="w-full sm:w-auto justify-center px-3 py-2 sm:py-1 rounded-xl sm:rounded-lg text-xs sm:text-[10px] font-bold bg-amber-600 hover:bg-amber-700 active:scale-95 text-white flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs"
              title={`Attribuer automatiquement les ${totalPhysicalDaysCount} trajets selon la présence de chacun pour une équité parfaite`}
            >
              <Sparkles className="size-3.5 sm:size-3" />
              <span>Équilibrer les {totalPhysicalDaysCount} trajets</span>
            </button>
            {Object.keys(drivers).length > 0 && (
              <button
                type="button"
                onClick={handleResetDrivers}
                className="w-full sm:w-auto justify-center px-2.5 py-1.5 sm:py-1 rounded-xl sm:rounded-lg text-xs sm:text-[10px] font-medium text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-300 border border-slate-200 dark:border-slate-700 hover:border-rose-500/30 flex items-center gap-1 cursor-pointer transition-all"
                title="Remettre à zéro les conducteurs assignés"
              >
                <RotateCcw className="size-3 sm:size-2.5" />
                <span>Remettre à 0</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 text-xs">
          {members.map((m) => {
            const count = driverCounts[m.id] ?? 0;
            return (
              <div
                key={m.id}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 flex items-center justify-between sm:justify-start gap-1.5 sm:gap-2 shadow-2xs font-mono"
              >
                <span className="font-bold text-slate-900 dark:text-slate-100 font-sans truncate">
                  {m.name}
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-950 dark:text-amber-200 font-bold text-[10px] shrink-0">
                  🚗 {count}
                </span>
              </div>
            );
          })}
        </div>

        {/* MATRICE DE VÉRIFICATION DES INSCRIPTIONS */}
        <div className="pt-2 border-t border-amber-500/20 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs flex-wrap">
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
                <span className="uppercase">{u}</span> :{" "}
                {enrolled > 0 ? "Inscrit ✓" : "Option"}
              </span>
            );
          })}
          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 ml-auto">
            ✓ {totalPhysicalDaysCount} journées de présentiel couvertes
          </span>
        </div>
      </div>

      {/* TIROIR DE CONFIGURATION (ACCORDÉON) */}
      <CovoitGroupConfigDrawer
        showConfig={showConfig}
        members={members}
        newMemberName={newMemberName}
        setNewMemberName={setNewMemberName}
        handleResetDefaultMembers={handleResetDefaultMembers}
        handleRemoveMember={handleRemoveMember}
        handleToggleMemberUnit={handleToggleMemberUnit}
        handleAddMember={handleAddMember}
      />
    </div>
  );
}

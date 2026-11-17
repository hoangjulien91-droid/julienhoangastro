"use client";

import { Users, RotateCcw, Trash2, Plus } from "lucide-react";
import { UNIT_ORDER, type PlanningUnitId } from "@/lib/pst/data/planning";
import type { CovoitMember } from "@/lib/pst/data/covoit-config";

interface CovoitGroupConfigDrawerProps {
  showConfig: boolean;
  members: CovoitMember[];
  newMemberName: string;
  setNewMemberName: (n: string) => void;
  handleResetDefaultMembers: () => void;
  handleRemoveMember: (id: string) => void;
  handleToggleMemberUnit: (memberId: string, u: PlanningUnitId) => void;
  handleAddMember: () => void;
}

export function CovoitGroupConfigDrawer({
  showConfig,
  members,
  newMemberName,
  setNewMemberName,
  handleResetDefaultMembers,
  handleRemoveMember,
  handleToggleMemberUnit,
  handleAddMember,
}: CovoitGroupConfigDrawerProps) {
  if (!showConfig) return null;

  return (
    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
          <Users className="size-4 text-slate-500" />
          <span>
            Configuration du groupe BAB ({members.length} membres) &amp;
            Inscriptions aux UE
          </span>
        </div>
        <button
          type="button"
          onClick={handleResetDefaultMembers}
          className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
          title="Rétablir la configuration par défaut (7 membres)"
        >
          <RotateCcw className="size-3" />
          <span>Rétablir le groupe par défaut</span>
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
      <div className="hidden md:block overflow-x-auto scrollbar-none">
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
              <tr
                key={m.id}
                className="hover:bg-slate-100/50 dark:hover:bg-slate-800/60 transition-colors"
              >
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
          aria-label="Prénom d'un collègue pour le covoiturage"
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
  );
}

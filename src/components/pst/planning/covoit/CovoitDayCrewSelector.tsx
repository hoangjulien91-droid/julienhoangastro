"use client";

import { Users, Check } from "lucide-react";
import type { CovoitMember } from "@/lib/pst/data/covoit-config";

interface CovoitDayCrewSelectorProps {
  date: string;
  members: CovoitMember[];
  enrolledMembers: CovoitMember[];
  presentMembers: CovoitMember[];
  dayAbsenceList: string[];
  onToggleAbsence: (date: string, memberId: string) => void;
}

export function CovoitDayCrewSelector({
  date,
  members,
  enrolledMembers,
  presentMembers,
  dayAbsenceList,
  onToggleAbsence,
}: CovoitDayCrewSelectorProps) {
  return (
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
        {presentMembers.length > 5 ? (
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
            ⚠️ {presentMembers.length}/5 inscrits (décocher les absents pour 1 seule voiture)
          </span>
        ) : members.length > 1 ? (
          <span className="text-[10px] text-slate-400">
            Cliquer pour marquer un collègue absent
          </span>
        ) : null}
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        {enrolledMembers.map((m) => {
          const isAbsent = dayAbsenceList.includes(m.id);
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => members.length > 1 && onToggleAbsence(date, m.id)}
              className={`px-3 py-1.5 sm:px-2.5 sm:py-1 rounded-xl text-xs sm:text-[11px] font-bold border transition-all flex items-center gap-1 ${
                isAbsent
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 line-through opacity-60"
                  : "bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
              } ${members.length > 1 ? "cursor-pointer active:scale-95" : "cursor-default"}`}
            >
              {!isAbsent && <Check className="size-3 text-emerald-600" />}
              <span>{m.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

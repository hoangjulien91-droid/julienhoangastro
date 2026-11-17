"use client";

import { Car, Check, Sparkles } from "lucide-react";
import type { CovoitMember } from "@/lib/pst/data/covoit-config";

interface CovoitDayDriverSelectorProps {
  date: string;
  members: CovoitMember[];
  presentMembers: CovoitMember[];
  currentDriver: CovoitMember | null;
  currentDriverId?: string;
  daySuggestedDriver: CovoitMember | null;
  onSetDriver: (date: string, driverId: string) => void;
}

export function CovoitDayDriverSelector({
  date,
  members,
  presentMembers,
  currentDriver,
  currentDriverId,
  daySuggestedDriver,
  onSetDriver,
}: CovoitDayDriverSelectorProps) {
  return (
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
            onClick={() => onSetDriver(date, daySuggestedDriver.id)}
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
          const isDriver = currentDriverId === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSetDriver(date, m.id)}
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

        {/* Bouton rapide "Je prends ma voiture" si Julien présent non conducteur */}
        {members.length > 1 &&
          presentMembers.some((m) => m.id === "julien") &&
          currentDriverId !== "julien" && (
            <button
              type="button"
              onClick={() => onSetDriver(date, "julien")}
              className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 cursor-pointer transition-colors"
            >
              🙋‍♂️ Je prends ma voiture
            </button>
          )}
      </div>
    </div>
  );
}

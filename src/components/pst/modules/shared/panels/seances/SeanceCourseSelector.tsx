"use client";

import React from "react";
import { Video, Users } from "lucide-react";
import type { SeanceCoursItem } from "@/lib/pst/data/seances-cours";
import { playClickSound } from "@/lib/pst/audio-feedback";

export interface SeanceCourseSelectorProps {
  seances: SeanceCoursItem[];
  selectedSeanceId: string;
  onSelectSeance: (seanceId: string) => void;
}

export function SeanceCourseSelector({
  seances,
  selectedSeanceId,
  onSelectSeance,
}: SeanceCourseSelectorProps) {
  if (seances.length <= 1) return null;

  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {seances.map((seance) => {
          const isSelected = seance.id === selectedSeanceId;
          const isLatest = seance.id === seances[seances.length - 1]?.id;

          return (
            <button
              key={seance.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => {
                playClickSound();
                onSelectSeance(seance.id);
              }}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                isSelected
                  ? "bg-amber-500/15 dark:bg-amber-500/20 border-amber-500/60 shadow-xs ring-2 ring-amber-500/30"
                  : "bg-card/80 dark:bg-slate-900/80 border-border/70 hover:border-amber-500/40 hover:bg-card"
              }`}
            >
              <div className="flex items-center justify-between gap-1.5 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-amber-500 text-white dark:text-slate-900"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    COURS {seance.numeroSeance}
                  </span>
                  {isLatest && seances.length > 1 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                      {seance.id === "pst106-s3"
                        ? "✨ Nouveau (28 oct)"
                        : "✨ Dernier cours"}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {seance.dateSeance}
                </span>
              </div>
              <div
                className={`text-xs font-bold line-clamp-1 ${
                  isSelected ? "text-amber-950 dark:text-amber-100" : "text-foreground"
                }`}
              >
                {seance.titre.replace(/Séance \d+ — /, "")}
              </div>
              <div className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5 flex items-center gap-1">
                {seance.format === "webconference" ? (
                  <Video className="size-3 text-indigo-500 shrink-0" />
                ) : (
                  <Users className="size-3 text-emerald-500 shrink-0" />
                )}
                <span>{seance.enseignant.split("(")[0].trim()}</span>
              </div>
            </button>
          );
        })}
      </div>
      <p className="hidden sm:block text-xs text-muted-foreground italic px-1 m-0">
        ⌨ J / K : séance suivante / précédente
      </p>
    </div>
  );
}

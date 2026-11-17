"use client";

import React from "react";
import { Sparkles, Quote, GraduationCap, Video, Users } from "lucide-react";
import type { SeanceCoursItem } from "@/lib/pst/data/seances-cours";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

export interface SeanceTabBarProps {
  seances: SeanceCoursItem[];
  activeSeance: SeanceCoursItem;
  onSelectSeance: (seanceId: string) => void;
  activeTab: "synthese" | "transcription" | "consignes";
  onChangeTab: (tab: "synthese" | "transcription" | "consignes") => void;
}

export function SeanceTabBar({
  seances,
  activeSeance,
  onSelectSeance,
  activeTab,
  onChangeTab,
}: SeanceTabBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 bg-muted/30 border border-border/60 rounded-2xl">
      {/* Sélecteur de séances si plusieurs */}
      <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none pb-1 sm:pb-0">
        {seances.map((seance) => {
          const isSelected = seance.id === activeSeance.id;
          return (
            <button
              key={seance.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => {
                playClickSound();
                triggerHaptic("light");
                onSelectSeance(seance.id);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-98 shrink-0 ${
                isSelected
                  ? "bg-card text-foreground border border-border shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/40"
              }`}
            >
              {seance.format === "webconference" ? (
                <Video
                  className={`size-3.5 ${
                    isSelected ? "text-indigo-500" : "text-muted-foreground"
                  }`}
                />
              ) : (
                <Users
                  className={`size-3.5 ${
                    isSelected ? "text-emerald-500" : "text-muted-foreground"
                  }`}
                />
              )}
              <span>Séance {seance.numeroSeance}</span>
              <span className="text-[10px] font-mono opacity-70">
                ({seance.dateSeance})
              </span>
            </button>
          );
        })}
      </div>

      {/* Apple iOS Segmented Control (Tabs) */}
      <div className="flex items-center p-1 bg-card/80 dark:bg-slate-900/80 rounded-xl border border-border/60 shadow-2xs overflow-x-auto whitespace-nowrap scrollbar-none max-w-full">
        <button
          type="button"
          aria-selected={activeTab === "synthese"}
          onClick={() => {
            playClickSound();
            triggerHaptic("light");
            onChangeTab("synthese");
          }}
          className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
            activeTab === "synthese"
              ? "bg-primary text-primary-foreground shadow-2xs font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sparkles className="size-3.5 text-amber-400" />
          <span>Synthèse</span>
        </button>

        <button
          type="button"
          aria-selected={activeTab === "transcription"}
          onClick={() => {
            playClickSound();
            triggerHaptic("light");
            onChangeTab("transcription");
          }}
          className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
            activeTab === "transcription"
              ? "bg-primary text-primary-foreground shadow-2xs font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Quote className="size-3.5 text-amber-400" />
          <span className="hidden sm:inline">Verbatims d&apos;Or</span>
          <span className="sm:hidden">Verbatims</span>
        </button>

        <button
          type="button"
          aria-selected={activeTab === "consignes"}
          onClick={() => {
            playClickSound();
            triggerHaptic("light");
            onChangeTab("consignes");
          }}
          className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
            activeTab === "consignes"
              ? "bg-primary text-primary-foreground shadow-2xs font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <GraduationCap className="size-3.5" />
          <span>Consignes ({activeSeance.consignesOralesProf.length})</span>
        </button>
      </div>
    </div>
  );
}

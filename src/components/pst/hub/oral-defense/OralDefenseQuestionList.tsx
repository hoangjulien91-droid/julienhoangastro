"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { type JuryRole, type JuryQuestion } from "@/lib/pst/data/oral-defense-data";

interface OralDefenseQuestionListProps {
  questions: JuryQuestion[];
  activeQuestionId: string;
  roleFilter: "ALL" | JuryRole;
  masteredMap: Record<string, boolean>;
  mobileTab: "list" | "detail";
  onSelectRoleFilter: (role: "ALL" | JuryRole) => void;
  onSelectQuestion: (id: string) => void;
}

export const OralDefenseQuestionList: React.FC<OralDefenseQuestionListProps> = ({
  questions,
  activeQuestionId,
  roleFilter,
  masteredMap,
  mobileTab,
  onSelectRoleFilter,
  onSelectQuestion,
}) => {
  return (
    <div
      className={`lg:col-span-5 border-r border-border/80 flex flex-col overflow-hidden bg-muted/10 ${
        mobileTab === "list" ? "flex" : "hidden lg:flex"
      }`}
    >
      <div className="p-2.5 sm:p-3 border-b border-border/70 flex flex-wrap items-center gap-1.5 shrink-0">
        {(
          [
            { id: "ALL", label: "Tout le Jury (7)" },
            { id: "president", label: "Président Chaire" },
            { id: "chercheur", label: "Chercheur" },
            { id: "praticien", label: "Praticien" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              playClickSound();
              onSelectRoleFilter(tab.id);
            }}
            className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-semibold transition-colors cursor-pointer ${
              roleFilter === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted text-muted-foreground border border-border"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-2.5 sm:p-3 space-y-2">
        {questions.map((q) => {
          const isSelected = q.id === activeQuestionId;
          const isMastered = !!masteredMap[q.id];
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => {
                playClickSound();
                onSelectQuestion(q.id);
              }}
              className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? "border-accent bg-accent/10 shadow-xs"
                  : "border-border/80 bg-card hover:bg-muted/60"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent">
                  {q.roleLabel}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-muted text-muted-foreground">
                    {q.ueTag}
                  </span>
                  {isMastered && (
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                  )}
                </div>
              </div>
              <p className="text-xs font-semibold text-foreground line-clamp-2 m-0">
                « {q.question} »
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { ShieldCheck, CheckSquare, Square, RotateCcw } from "lucide-react";
import {
  MEMOIRE_SECTIONS,
  RNCP_GUARD_CHECKS,
  type StudioStorageState,
} from "@/lib/pst/data/memoire-studio-data";

interface MemoireStudioSidebarProps {
  state: StudioStorageState;
  activeSectionId: string;
  onSelectSection: (id: string) => void;
  onToggleCheck: (chkId: string) => void;
  onReset: () => void;
  totalWords: number;
  guardReadinessPct: number;
  checkedCount: number;
}

export const MemoireStudioSidebar: React.FC<MemoireStudioSidebarProps> = ({
  state,
  activeSectionId,
  onSelectSection,
  onToggleCheck,
  onReset,
  totalWords,
  guardReadinessPct,
  checkedCount,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:gap-5 h-full">
      {/* Sommaire Structurel */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
            1. Architecture du Mémoire (5 Parties)
          </span>
          <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
            {totalWords} mots
          </span>
        </div>

        <div className="space-y-1.5">
          {MEMOIRE_SECTIONS.map((sec) => {
            const isSelected = sec.id === activeSectionId;
            const secWords = (state.sections[sec.id] || "")
              .trim()
              .split(/\s+/)
              .filter(Boolean).length;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => onSelectSection(sec.id)}
                className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start justify-between gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-white dark:bg-slate-900 border-indigo-500/50 shadow-xs"
                    : "bg-transparent border-slate-200/70 dark:border-slate-800/80 hover:bg-white/60 dark:hover:bg-slate-900/60"
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      Partie {sec.number}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {sec.ueRef}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1 line-clamp-1">
                    {sec.title}
                  </p>
                </div>
                <span className="shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {secWords} m.
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pre-Defense Guard */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-3.5 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              Verrou Déontologique RNCP 7
            </span>
          </div>
          <span
            className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
              guardReadinessPct === 100
                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
            }`}
          >
            {guardReadinessPct}% ({checkedCount}/{RNCP_GUARD_CHECKS.length})
          </span>
        </div>

        <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-3">
          <div
            className={`h-full transition-all duration-300 ${
              guardReadinessPct === 100 ? "bg-emerald-500" : "bg-indigo-500"
            }`}
            style={{ width: `${guardReadinessPct}%` }}
          />
        </div>

        <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
          {RNCP_GUARD_CHECKS.map((chk) => {
            const isChecked = !!state.checks[chk.id];
            return (
              <button
                key={chk.id}
                type="button"
                onClick={() => onToggleCheck(chk.id)}
                className={`w-full text-left p-2 rounded-lg border text-xs transition-all flex items-start gap-2 cursor-pointer ${
                  isChecked
                    ? "bg-emerald-500/5 border-emerald-500/20 text-slate-800 dark:text-slate-200"
                    : "bg-slate-50 dark:bg-slate-950/50 border-slate-200/70 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-medium leading-snug">{chk.label}</p>
                  <span className="inline-block mt-0.5 text-[10px] font-mono text-slate-400">
                    {chk.category} · {chk.rule}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-auto pt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span>Sauvegarde locale instantanée</span>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          Réinitialiser modèle
        </button>
      </div>
    </div>
  );
};

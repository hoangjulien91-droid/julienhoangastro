"use client";

import React from "react";
import {
  GraduationCap,
  Clock,
  Play,
  Pause,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";
import type { AnnalePst123Item } from "@/lib/pst/data/pst123-annales";

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

interface ExamActiveViewProps {
  subject: AnnalePst123Item;
  remaining: number;
  duration: number;
  paused: boolean;
  draft: string;
  copiedDraft: boolean;
  onTogglePause: () => void;
  onDraftChange: (draft: string) => void;
  onCopyDraft: () => void;
  onAbandon: () => void;
  onFinish: () => void;
}

export const ExamActiveView: React.FC<ExamActiveViewProps> = ({
  subject,
  remaining,
  duration,
  paused,
  draft,
  copiedDraft,
  onTogglePause,
  onDraftChange,
  onCopyDraft,
  onAbandon,
  onFinish,
}) => {
  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  const totalSec = duration * 60;
  const timePct =
    totalSec > 0 ? Math.round(((totalSec - remaining) * 100) / totalSec) : 0;
  const isUrgent = remaining <= 300;

  return (
    <div
      id="examActive"
      className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
          <GraduationCap className="size-3 text-indigo-600 dark:text-indigo-400" />
          <span>Sujet d&apos;Examen en Cours</span>
        </span>

        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold tabular-nums border ${
              isUrgent
                ? "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30 animate-pulse"
                : "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20"
            }`}
          >
            <Clock className="size-3" />
            <span>{fmtTime(remaining)}</span>
          </span>

          <button
            type="button"
            onClick={onTogglePause}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
          >
            {paused ? (
              <Play className="size-3 fill-current" />
            ) : (
              <Pause className="size-3 fill-current" />
            )}
            <span>{paused ? "Reprendre" : "Pause"}</span>
          </button>
        </div>
      </div>

      {/* Minimal Progress Bar */}
      <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${
            isUrgent ? "bg-rose-500" : "bg-indigo-500"
          }`}
          style={{ width: `${timePct}%` }}
        />
      </div>

      {/* Subject Title */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0 leading-snug">
        {subject.titre || subject.t}
      </h3>

      {/* Draft Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Zone de composition / Brouillon
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
              {wordCount} mots · {draft.length} car.
            </span>

            {draft.trim() && (
              <button
                type="button"
                onClick={onCopyDraft}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
              >
                {copiedDraft ? (
                  <Check className="size-3 text-emerald-500" />
                ) : (
                  <Copy className="size-3" />
                )}
                <span>{copiedDraft ? "Copié !" : "Copier"}</span>
              </button>
            )}
          </div>
        </div>

        <textarea
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          rows={9}
          placeholder="Rédigez votre introduction, problématique, structure de plan dialectique et mobilisation des auteurs ici..."
          className="w-full p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all resize-y leading-relaxed"
        />
      </div>

      {/* Action Row */}
      <div className="flex items-center justify-between gap-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
        <button
          type="button"
          onClick={onAbandon}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer active:scale-95"
        >
          <span>Abandonner</span>
        </button>

        <button
          type="button"
          onClick={onFinish}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all cursor-pointer active:scale-95"
        >
          <CheckCircle2 className="size-3.5" />
          <span>Terminer et auto-évaluer</span>
        </button>
      </div>
    </div>
  );
};

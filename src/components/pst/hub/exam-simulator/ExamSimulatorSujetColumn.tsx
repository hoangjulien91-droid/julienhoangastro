"use client";

import { Play, Square, RotateCcw, Check } from "lucide-react";
import {
  PST108_SUBEXAMS,
  type ExamSubject,
  type Pst108SubExamId,
} from "@/lib/pst/data/exam-simulator-data";

interface ExamSimulatorSujetColumnProps {
  selectedUe: string;
  pst108Part: Pst108SubExamId;
  onSelectPst108Part: (part: Pst108SubExamId) => void;
  subject: ExamSubject;
  secondsRemaining: number;
  examActive: boolean;
  onStart: (minutes?: number) => void;
  onStop: () => void;
  onReset: () => void;
  checkedCriteria: Record<string, boolean>;
  onToggleCriterion: (c: string) => void;
  formatTime: (totalSec: number) => string;
  mobileTab: "sujet" | "copie";
}

export function ExamSimulatorSujetColumn({
  selectedUe,
  pst108Part,
  onSelectPst108Part,
  subject,
  secondsRemaining,
  examActive,
  onStart,
  onStop,
  onReset,
  checkedCriteria,
  onToggleCriterion,
  formatTime,
  mobileTab,
}: ExamSimulatorSujetColumnProps) {
  return (
    <div
      className={`lg:col-span-5 p-3.5 sm:p-5 border-r border-border overflow-y-auto space-y-4 sm:space-y-5 bg-background/50 ${
        mobileTab === "sujet" ? "block" : "hidden lg:block"
      }`}
    >
      {/* Sélecteur 3 × 1h00 dédié PST108 */}
      {selectedUe === "PST108" && (
        <div className="p-3 rounded-xl border border-indigo-500/25 bg-indigo-500/5 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-indigo-700 dark:text-indigo-400">
            PST108 · Examen 3h00 divisé en 3 × 1h00
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {(["lucy", "valls", "marot", "complet"] as const).map(
              (partKey) => {
                const part = PST108_SUBEXAMS[partKey];
                const active = pst108Part === partKey;
                return (
                  <button
                    key={partKey}
                    type="button"
                    onClick={() => onSelectPst108Part(partKey)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer border text-left ${
                      active
                        ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                        : "bg-card text-muted-foreground border-border hover:text-foreground"
                    }`}
                  >
                    {part.shortLabel}
                  </button>
                );
              },
            )}
          </div>
        </div>
      )}

      {/* Timer card */}
      <div className="p-4 rounded-xl border border-border bg-card shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            Chronomètre Officiel
          </span>
          <span
            className={`font-mono text-lg font-black tracking-tight ${
              secondsRemaining < 600
                ? "text-rose-600 animate-pulse"
                : "text-foreground"
            }`}
          >
            {formatTime(secondsRemaining)}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {!examActive ? (
            <button
              type="button"
              onClick={() => onStart(subject.dureeMinutes)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
            >
              <Play className="size-3.5" />
              <span>
                {subject.dureeMinutes === 60
                  ? "Lancer 1h00"
                  : subject.dureeMinutes === 180
                    ? "Lancer 3h00"
                    : "Lancer 2h00"}
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onStop}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
            >
              <Square className="size-3.5" />
              <span>Pause</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onStart(45)}
            className="px-2.5 py-2 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            title="Entraînement court 45 min"
          >
            Flash 45m
          </button>

          <button
            type="button"
            onClick={onReset}
            className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            title="Réinitialiser"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Sujet de l'épreuve */}
      <div className="p-4 rounded-xl border border-accent/25 bg-accent/5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold">
            Sujet d&apos;Épreuve Type
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">
            {subject.bareme}
          </span>
        </div>
        <p className="text-foreground text-xs sm:text-sm font-serif leading-relaxed italic m-0">
          {subject.sujet}
        </p>
      </div>

      {/* Critères d'évaluation attendus */}
      <div className="p-4 rounded-xl border border-border bg-card space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-foreground">
            Attendus du jury &amp; Critères :
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">
            {subject.criteres.filter((c) => checkedCriteria[c]).length} /{" "}
            {subject.criteres.length} cochés
          </span>
        </div>
        <ul className="space-y-1.5 text-xs text-muted-foreground pl-0 list-none m-0">
          {subject.criteres.map((c, idx) => {
            const isChecked = !!checkedCriteria[c];
            return (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => onToggleCriterion(c)}
                  className={`w-full text-left p-2 rounded-lg border transition-all flex items-start gap-2.5 cursor-pointer ${
                    isChecked
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200 font-medium"
                      : "bg-muted/30 border-border/70 hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <span
                    className={`size-4 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                      isChecked
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-border bg-card"
                    }`}
                  >
                    {isChecked && <Check className="size-3" />}
                  </span>
                  <span className="leading-relaxed text-xs">{c}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

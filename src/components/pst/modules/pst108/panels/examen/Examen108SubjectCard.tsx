"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Pause,
  Play,
  RotateCcw,
  Shuffle,
} from "lucide-react";
import { PST108_PROF_EXAMS, type AnnalePst108Item, type Pst108ProfId } from "@/lib/pst/data/pst108-annales";
import {
  PART_SECONDS,
  PROF_UI,
  fmtTime,
} from "@/lib/pst/data/pst108-examen-data";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface Examen108SubjectCardProps {
  activeProf: Pst108ProfId;
  activeSubject: AnnalePst108Item;
  profSubjects: AnnalePst108Item[];
  currentSubjectIdx: number;
  onSelectSubject: (idx: number) => void;
  onDrawRandomSubject: () => void;
  running: boolean;
  onToggleRunning: () => void;
  onResetTimer: () => void;
  activeElapsed: number;
  finished: boolean;
  hasSavedDraft: (subjId: string) => boolean;
}

export function Examen108SubjectCard({
  activeProf,
  activeSubject,
  profSubjects,
  currentSubjectIdx,
  onSelectSubject,
  onDrawRandomSubject,
  running,
  onToggleRunning,
  onResetTimer,
  activeElapsed,
  finished,
  hasSavedDraft,
}: Examen108SubjectCardProps) {
  const profMeta = PST108_PROF_EXAMS[activeProf];
  const ui = PROF_UI[activeProf];
  const ProfIcon = ui.icon;

  const activeRemaining = Math.max(0, PART_SECONDS - activeElapsed);
  const isOverTime = activeElapsed > PART_SECONDS;
  const pctPart = Math.min(100, Math.round((activeElapsed * 100) / PART_SECONDS));

  return (
    <div className="space-y-5">
      {/* Bandeau prof actif + Règle d'or + Piège */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1.5 flex-1 min-w-[240px]">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${ui.badgeBg}`}
            >
              <ProfIcon className="size-3.5" />
              <span>Mini-Examen · {profMeta.nom}</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Durée impartie : {profMeta.dureeLabel}
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed m-0">
            <b>Périmètre révisé :</b> {profMeta.programme}
          </p>
        </div>

        {/* Contrôles chronomètre 1h00 */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1.5 rounded-xl font-mono text-sm font-black border ${
                isOverTime
                  ? "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/40"
                  : running
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700"
              }`}
            >
              {isOverTime
                ? `+${fmtTime(activeElapsed - PART_SECONDS)} dépassé`
                : `Reste ${fmtTime(activeRemaining)}`}
            </div>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                onToggleRunning();
              }}
              disabled={finished}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-45 text-white flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {running ? (
                <>
                  <Pause className="size-3.5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="size-3.5" />
                  <span>{activeElapsed > 0 ? "Reprendre" : "Lancer 1h00"}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onResetTimer}
              title="Réinitialiser le chronomètre de ce professeur"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <RotateCcw className="size-3.5" />
            </button>
          </div>

          <div className="w-56 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isOverTime ? "bg-rose-500" : ui.barBg
              }`}
              style={{ width: `${pctPart}%` }}
            />
          </div>
        </div>
      </div>

      {/* Règle d'or & Piège spécifique au prof */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/25 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200 leading-relaxed">
          <div className="font-bold flex items-center gap-1.5 mb-1">
            <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Attendu n°1 de {profMeta.nom}</span>
          </div>
          {profMeta.regleOr}
        </div>
        <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-500/20 text-amber-900 dark:text-amber-200 leading-relaxed">
          <div className="font-bold flex items-center gap-1.5 mb-1">
            <AlertTriangle className="size-3.5 text-amber-600 dark:text-amber-400" />
            <span>Piège éliminatoire à éviter</span>
          </div>
          {profMeta.piegePrincipal}
        </div>
      </div>

      {/* Sélecteur de sujets pour CE professeur uniquement */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Sujets d&apos;entraînement 1h00 — {profMeta.nom} ({profSubjects.length})
          </span>
          {profSubjects.length > 1 && (
            <button
              type="button"
              onClick={onDrawRandomSubject}
              className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer"
            >
              <Shuffle className="size-3.5" />
              <span>Sujet suivant de {profMeta.nom}</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {profSubjects.map((subj, idx) => {
            const active = idx === currentSubjectIdx;
            const saved = hasSavedDraft(subj.id);
            return (
              <button
                key={subj.id}
                type="button"
                onClick={() => onSelectSubject(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? ui.pillActive
                    : "bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400"
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">
                  #{idx + 1}
                </span>
                <span className="truncate max-w-[230px]">
                  {subj.titre.replace(/^Sujet \d+ :\s*|^Dissertation :\s*/i, "")}
                </span>
                {saved && (
                  <span
                    className="size-2 rounded-full bg-amber-400 shrink-0"
                    title="Brouillon sauvegardé"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ÉNONCÉ DU SUJET */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${ui.badgeBg}`}>
            {activeSubject.session}
          </span>
          <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
            Format 1h00 · Copie structurée 2 parties
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white leading-snug m-0">
          {activeSubject.titre}
        </h3>

        {activeSubject.contexteCitation && (
          <blockquote className="p-3 rounded-xl bg-white dark:bg-slate-900 border-l-4 border-indigo-500 text-xs sm:text-sm italic text-slate-700 dark:text-slate-300 m-0">
            {activeSubject.contexteCitation}
          </blockquote>
        )}

        <div className="space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Consignes / Questions à traiter en 60 minutes :
          </div>
          <ul className="m-0 pl-5 space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
            {activeSubject.questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

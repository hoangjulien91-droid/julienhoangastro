"use client";

import { FileText, Check, Copy, BookOpen, Eye, EyeOff, Award } from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";
import type { AnnalePst108Item } from "@/lib/pst/data/pst108-annales";

interface Examen108DraftAreaProps {
  profName: string;
  activeSubject: AnnalePst108Item;
  draft: string;
  wordCount: number;
  copied: boolean;
  showPlan: boolean;
  showCorrige: boolean;
  finished: boolean;
  onDraftChange: (val: string) => void;
  onCopyDraft: () => void;
  onTogglePlan: () => void;
  onToggleCorrige: () => void;
  onToggleFinish: () => void;
}

export function Examen108DraftArea({
  profName,
  activeSubject,
  draft,
  wordCount,
  copied,
  showPlan,
  showCorrige,
  finished,
  onDraftChange,
  onCopyDraft,
  onTogglePlan,
  onToggleCorrige,
  onToggleFinish,
}: Examen108DraftAreaProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label
          htmlFor="exam108-draft-box"
          className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5"
        >
          <FileText className="size-3.5 text-indigo-500" />
          <span>Copie d&apos;examen ({profName} · 1h00)</span>
        </label>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-mono text-slate-500 dark:text-slate-400">
            <b>{wordCount}</b> mots (repère 1h00 : ~450–650 mots)
          </span>
          {draft.trim() && (
            <button
              type="button"
              onClick={onCopyDraft}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="size-3 text-emerald-500" />
                  <span>Copié</span>
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  <span>Copier</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <textarea
        id="exam108-draft-box"
        rows={10}
        value={draft}
        onChange={(e) => onDraftChange(e.target.value)}
        placeholder={`Rédigez votre réponse de 1h00 pour ${profName} (Introduction courte avec problématique + Plan en 2 parties avec définitions rigoureuses, auteurs justifiés et exemple clinique du travail réel)...`}
        className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 p-4 text-sm text-slate-900 dark:text-slate-100 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      />

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onTogglePlan();
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="size-3.5" />
            <span>{showPlan ? "Masquer le plan" : "Voir plan conseillé (1h00)"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              onToggleCorrige();
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-bold border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 cursor-pointer"
          >
            {showCorrige ? (
              <>
                <EyeOff className="size-3.5" />
                <span>Masquer le corrigé modèle</span>
              </>
            ) : (
              <>
                <Eye className="size-3.5" />
                <span>Corrigé d&apos;excellence (18+/20)</span>
              </>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={onToggleFinish}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
            finished
              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
              : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90"
          }`}
        >
          <Award className="size-4" />
          <span>
            {finished
              ? "Reprendre cette sous-épreuve"
              : `Terminer & Auto-évaluer (${profName})`}
          </span>
        </button>
      </div>

      {/* Plan Conseillé */}
      {showPlan && (
        <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/25 border border-indigo-500/25 space-y-2.5 mt-2">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300">
            Plan conseillé pour 1h00 · {profName}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeSubject.planConseille.map((p, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200/70 dark:border-indigo-900/60 space-y-1"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {p.partie}
                </div>
                <ul className="m-0 pl-4 space-y-0.5 text-xs text-slate-600 dark:text-slate-300">
                  {p.sousParties.map((sp, j) => (
                    <li key={j}>{sp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

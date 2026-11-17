import { useState } from "react";
import {
  RotateCcw,
  Copy,
  Check,
  CheckCircle2,
} from "lucide-react";
import type { RedacItem } from "@/lib/pst/types";
import {
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface ExamDraftAreaProps {
  data: RedacItem[];
  subjectIdx: number;
  subject: RedacItem;
  draft: string;
  onDraftChange: (val: string) => void;
  onSelectSubject: (idx: number) => void;
  onNewSubject: () => void;
  finished: boolean;
  onFinish: () => void;
  onContinueWriting: () => void;
  expectedKeywords: string[];
  matchedKeywordsCount: number;
  draftLower: string;
}

export function ExamDraftArea({
  data,
  subjectIdx,
  subject,
  draft,
  onDraftChange,
  onSelectSubject,
  onNewSubject,
  finished,
  onFinish,
  onContinueWriting,
  expectedKeywords,
  matchedKeywordsCount,
  draftLower,
}: ExamDraftAreaProps) {
  const [copied, setCopied] = useState(false);
  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;

  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
      {/* Sujet switcher buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
          {data.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectSubject(idx)}
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer ${
                idx === subjectIdx
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              #{idx + 1}
            </button>
          ))}
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <span>{wordCount} mots</span>
          <span>·</span>
          <span>{draft.length} car.</span>
        </div>
      </div>

      {/* Prompt */}
      <div className="space-y-1">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Énoncé Officiel
        </span>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
          {subject[0]}
        </h3>
      </div>

      {/* Draft Textarea */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Brouillon &amp; plan d&apos;intervention clinique
          </label>
          {draft.trim() && (
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
              ✓ Sauvegardé auto
            </span>
          )}
        </div>
        <textarea
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          placeholder="1. Accroche clinique & définitions des termes (travail réel vs prescrit, santé, subjectivité)…&#10;2. Problématique dialectique articulant les enjeux cliniques…&#10;3. Plan détaillé (I. Analyse clinique de l'activité, II. Dynamiques de reconnaissance et de coopération, III. Posture et dispositif du psychologue)…"
          rows={8}
          className="w-full p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 text-sm leading-relaxed text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all resize-y"
        />
        {expectedKeywords.length > 0 && (
          <div className="pt-1.5 flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Radar 18/20 ({matchedKeywordsCount}/{expectedKeywords.length})
              :
            </span>
            {expectedKeywords.map((kw, kIdx) => {
              const hit = draftLower.includes(kw.toLowerCase());
              return (
                <span
                  key={kIdx}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border transition-all ${
                    hit
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 shadow-2xs"
                      : "bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {hit ? `✓ ${kw}` : kw}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onNewSubject}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
          >
            <RotateCcw className="size-3" />
            <span>Sujet suivant</span>
          </button>

          {draft.trim() && (
            <button
              type="button"
              onClick={() => {
                try {
                  navigator.clipboard.writeText(
                    `${subject[0]}\n\n${draft}`,
                  );
                  playSuccessSound();
                  triggerHaptic("success");
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                } catch {
                  // ignore
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="size-3 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Plan copié !
                  </span>
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  <span>Copier le plan</span>
                </>
              )}
            </button>
          )}
        </div>

        {!finished ? (
          <button
            type="button"
            onClick={onFinish}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <CheckCircle2 className="size-3.5" />
            <span>Terminer &amp; s&apos;auto-évaluer</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onContinueWriting}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all cursor-pointer active:scale-95"
          >
            <span>Continuer à rédiger</span>
          </button>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  PenTool,
  FileText,
  Copy,
  Check,
  Volume2,
  Square,
  Sparkles,
} from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import type { AtelierSujet } from "@/lib/pst/types";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface AtelierProps {
  store: PstStore;
  onStoreChange: () => void;
  data: AtelierSujet[];
  hint: string;
}

const ATELIER_DRAFTS_KEY = "pst_atelier_drafts_v1";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function Atelier({ store, onStoreChange, data, hint }: AtelierProps) {
  const [idx, setIdx] = useState(0);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ATELIER_DRAFTS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, string>;
        if (parsed && typeof parsed === "object") setDrafts(parsed);
      }
    } catch {
      /* ignore */
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const s = data[idx];
  if (!s) return null;

  const draftKey = `${store.key}_atelier_${idx}`;
  const currentDraft = drafts[draftKey] || "";
  const wordCount = currentDraft.trim()
    ? currentDraft.trim().split(/\s+/).length
    : 0;

  function updateDraft(val: string) {
    const next = { ...drafts, [draftKey]: val };
    setDrafts(next);
    try {
      localStorage.setItem(ATELIER_DRAFTS_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  const marks = store.getMarks();
  const checked = s.grid.filter(
    (_, gi) => !!marks[`atelier_${idx}_point_${gi}`],
  ).length;
  const total = s.grid.length;
  const pct = total ? Math.round((checked * 100) / total) : 0;

  function toggle(gi: number) {
    const key = `atelier_${idx}_point_${gi}`;
    const cur = !!store.getMarks()[key];
    store.setMark(key, !cur);
    if (!cur) {
      playSuccessSound();
      triggerHaptic("success");
    } else {
      playClickSound();
      triggerHaptic("selection");
    }
    onStoreChange();
  }

  function toggleSpeech() {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !s) {
      return;
    }
    const synth = window.speechSynthesis;
    if (speakingIdx === idx) {
      synth.cancel();
      setSpeakingIdx(null);
      return;
    }
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(
      `${s.t}. Corrigé modèle : ${stripHtml(s.corrige)}`,
    );
    utter.lang = "fr-FR";
    utter.rate = 1.02;
    utter.onend = () => setSpeakingIdx(null);
    utter.onerror = () => setSpeakingIdx(null);
    setSpeakingIdx(idx);
    synth.speak(utter);
  }

  function copyCorrige() {
    if (!s || typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard
      .writeText(`${s.t}\n\n${stripHtml(s.corrige)}`)
      .then(() => {
        playSuccessSound();
        triggerHaptic("success");
        setCopiedIdx(idx);
        setTimeout(
          () => setCopiedIdx((cur) => (cur === idx ? null : cur)),
          1800,
        );
      })
      .catch(() => {});
  }

  return (
    <div className="space-y-4">
      {hint && <p className="hint">{hint}</p>}

      {/* Progress & Header Card */}
      <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
            <PenTool className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Auto-évaluation de l&apos;Atelier · Sujet #{idx + 1} / {data.length}</span>
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            {checked} / {total} points ({pct}%)
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Subject switcher pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {data.map((sujet, i) => {
          const isActive = i === idx;
          const shortLabel = sujet.t.split(" : ")[0] || `Sujet #${i + 1}`;
          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                playClickSound();
                triggerHaptic("selection");
                setIdx(i);
              }}
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {shortLabel}
            </button>
          );
        })}
      </div>

      {/* Main Topic Workbench Card */}
      <div id="atelierHost" className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            <FileText className="size-3 text-amber-600 dark:text-amber-400" />
            <span>Sujet de Rédaction Officiel Cnam</span>
          </span>

          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
            Atelier #{idx + 1}
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug m-0">
            « {s.t} »
          </h3>
        </div>

        {/* Draft Textarea Area */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Mon brouillon &amp; plan dialectique (sauvegarde auto)
            </span>
            <span
              className={`text-[10px] font-mono font-bold ${
                wordCount >= 40
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {wordCount} mot{wordCount > 1 ? "s" : ""}
            </span>
          </div>

          <textarea
            value={currentDraft}
            onChange={(e) => updateDraft(e.target.value)}
            rows={4}
            placeholder="Esquissez votre problématique, vos axes I / II / III et vos auteurs clés avant d'ouvrir le corrigé-modèle..."
            className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all resize-y leading-relaxed"
          />
        </div>

        {/* Correction Rubric */}
        <div className="space-y-2.5 pt-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
            Grille d&apos;évaluation du correcteur Cnam
          </span>

          <div className="space-y-2">
            {s.grid.map((g, gi) => {
              const isDone = !!marks[`atelier_${idx}_point_${gi}`];
              return (
                <label
                  key={gi}
                  onClick={() => toggle(gi)}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    isDone
                      ? "bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 text-indigo-950 dark:text-indigo-200"
                      : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => {}} // handled by label onClick
                    className="mt-0.5 size-4 rounded-md text-indigo-600 border-slate-300 focus:ring-indigo-500 pointer-events-none"
                  />
                  <span
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isDone ? "line-through text-slate-400 dark:text-slate-500" : ""
                    }`}
                  >
                    {g}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Model Solution Accordion */}
        <details className="group pt-2 border-t border-slate-200/60 dark:border-slate-800">
          <summary className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer select-none py-1.5 hover:underline">
            <Sparkles className="size-3.5" />
            <span>Lire le corrigé-modèle d&apos;excellence Cnam</span>
          </summary>

          <div className="mt-3 p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                onClick={toggleSpeech}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer active:scale-95 shadow-2xs ${
                  speakingIdx === idx
                    ? "bg-rose-500 text-white"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                {speakingIdx === idx ? (
                  <>
                    <Square className="size-3 fill-current" />
                    <span>Arrêter l&apos;audio</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="size-3" />
                    <span>Écouter le corrigé</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={copyCorrige}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
              >
                {copiedIdx === idx ? (
                  <>
                    <Check className="size-3 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>Copier le corrigé</span>
                  </>
                )}
              </button>
            </div>

            <div
              className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 space-y-2 prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: s.corrige }}
            />
          </div>
        </details>
      </div>
    </div>
  );
}

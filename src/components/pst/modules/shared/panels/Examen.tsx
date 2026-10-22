"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  CheckCircle2,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  FileText,
} from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import type { RedacItem } from "@/lib/pst/types";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { QuizBilan } from "@/components/pst/quiz/QuizBilan";

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${m}:${String(ss).padStart(2, "0")}`;
}

interface ExamenProps {
  store: PstStore;
  onStoreChange: () => void;
  data: RedacItem[];
  hint: string;
}

const TARGET_SECONDS = 30 * 60;

export function Examen({ store, onStoreChange, data, hint }: ExamenProps) {
  const [subjectIdx, setSubjectIdx] = useState(0);
  const subject = (data[subjectIdx] ?? data[0]) as RedacItem;
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [draft, setDraft] = useState(() =>
    String(store.getMarks()["exam_draft_0"] ?? ""),
  );
  const [copied, setCopied] = useState(false);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [scoreShown, setScoreShown] = useState(false);

  useEffect(() => {
    setDraft(String(store.getMarks()["exam_draft_" + subjectIdx] ?? ""));
  }, [subjectIdx, store]);

  function handleDraftChange(val: string) {
    setDraft(val);
    store.setMark("exam_draft_" + subjectIdx, val);
  }

  useEffect(() => {
    if (finished || paused) return;
    const iv = setInterval(() => setElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(iv);
  }, [finished, paused]);

  function selectSubject(nextIdx: number) {
    playClickSound();
    triggerHaptic("selection");
    setSubjectIdx(nextIdx);
    setElapsed(0);
    setPaused(false);
    setFinished(false);
    setChecked(new Set());
    setScoreShown(false);
  }

  function newSubject() {
    const nextIdx = (subjectIdx + 1) % data.length;
    selectSubject(nextIdx);
  }

  function finish() {
    playSuccessSound();
    triggerHaptic("success");
    setFinished(true);
  }

  function toggleAttendu(i: number) {
    playClickSound();
    triggerHaptic("selection");
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function computeScore() {
    playSuccessSound();
    triggerHaptic("success");
    store.recordScore("examen", checked.size, subject[1].length);
    onStoreChange();
    setScoreShown(true);
  }

  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  const pctTime = Math.min(100, Math.round((elapsed * 100) / TARGET_SECONDS));
  const isOverTime = elapsed > TARGET_SECONDS;

  // Extraction automatique des concepts/auteurs attendus dans le sujet
  const expectedKeywords = (() => {
    const rawText = (subject[1].join(" ") + " " + (subject[2] ?? "")).replace(
      /&rsquo;|&apos;/g,
      "'",
    );
    const boldMatches = Array.from(
      rawText.matchAll(/<(?:b|strong)>([^<]{3,38})<\/(?:b|strong)>/gi),
    ).map((m) => m[1]!.replace(/[:.,;()]/g, "").trim());
    const canonicalTerms = [
      "Clot",
      "Dejours",
      "Wisner",
      "Bourdieu",
      "Habermas",
      "Honneth",
      "Valls",
      "Castra",
      "Dubar",
      "Sainsaulieu",
      "Bobillier",
      "Rabardel",
      "Leplat",
      "Canguilhem",
      "pouvoir d'agir",
      "travail réel",
      "travail prescrit",
      "genre professionnel",
      "reconnaissance",
      "sublimation",
      "métis",
      "coopération",
      "agir communicationnel",
      "pouvoir symbolique",
      "méthode IOD",
      "double transaction",
      "genèse instrumentale",
      "acceptation située",
      "autoconfrontation",
      "déontologie",
    ];
    const pool = [...boldMatches];
    const lowRaw = rawText.toLowerCase();
    for (const term of canonicalTerms) {
      if (lowRaw.includes(term.toLowerCase())) {
        pool.push(term);
      }
    }
    const seen = new Set<string>();
    const unique: string[] = [];
    for (const item of pool) {
      const k = item.toLowerCase();
      if (
        k.length >= 4 &&
        !seen.has(k) &&
        !/^(partie|introduction|conclusion|étape)/i.test(k)
      ) {
        seen.add(k);
        unique.push(item);
      }
      if (unique.length >= 8) break;
    }
    return unique;
  })();

  const draftLower = draft.toLowerCase();
  const matchedKeywordsCount = expectedKeywords.filter((kw) =>
    draftLower.includes(kw.toLowerCase()),
  ).length;

  return (
    <div className="space-y-4">
      {hint && <p className="hint">{hint}</p>}

      <div id="examenHost" className="space-y-4">
        {/* Top Timer & Header Card */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
                  <GraduationCap className="size-3 text-indigo-600 dark:text-indigo-400" />
                  <span>
                    Sujet {subjectIdx + 1} / {data.length}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  <Clock className="size-3 text-amber-600 dark:text-amber-400" />
                  <span>Objectif 30 min ({pctTime}%)</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 m-0">
                Rédige ton plan détaillé (intro, parties, conclusion) en
                conditions réelles d&apos;examen Cnam.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {!finished && (
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    triggerHaptic("selection");
                    setPaused((p) => !p);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all cursor-pointer active:scale-95 shadow-2xs"
                >
                  {paused ? (
                    <>
                      <Play className="size-3 fill-current" />
                      <span>Reprendre</span>
                    </>
                  ) : (
                    <>
                      <Pause className="size-3 fill-current" />
                      <span>Pause</span>
                    </>
                  )}
                </button>
              )}
              <div
                className={`text-2xl sm:text-3xl font-mono font-extrabold tracking-tight tabular-nums ${
                  isOverTime
                    ? "text-rose-600 dark:text-rose-400"
                    : "text-indigo-600 dark:text-indigo-400"
                }`}
              >
                {fmtTime(elapsed)}
              </div>
            </div>
          </div>

          {/* Minimal Apple Progress Bar */}
          <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ease-out rounded-full ${
                isOverTime ? "bg-rose-500" : "bg-indigo-500"
              }`}
              style={{ width: `${pctTime}%` }}
            />
          </div>
        </div>

        {/* Subject Card & Draft Area */}
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          {/* Sujet switcher buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-slate-200/60 dark:border-slate-800">
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
              {data.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectSubject(idx)}
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
              onChange={(e) => handleDraftChange(e.target.value)}
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
                onClick={newSubject}
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
                onClick={finish}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <CheckCircle2 className="size-3.5" />
                <span>Terminer &amp; s&apos;auto-évaluer</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setFinished(false)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all cursor-pointer active:scale-95"
              >
                <span>Continuer à rédiger</span>
              </button>
            )}
          </div>
        </div>

        {/* Correction Rubric & Model Solution */}
        {finished && (
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-indigo-500/30 dark:border-indigo-500/30 shadow-xs space-y-4 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
                <CheckCircle2 className="size-3 text-indigo-600 dark:text-indigo-400" />
                <span>Grille Officielle de Correction Cnam</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                {checked.size} / {subject[1].length} attendus validés
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 m-0">
              Coche chaque attendu théorique, méthodologique ou déontologique
              réellement intégré dans ton plan :
            </p>

            <div className="space-y-2">
              {subject[1].map((a, i) => {
                const isChecked = checked.has(i);
                return (
                  <label
                    key={i}
                    onClick={() => toggleAttendu(i)}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      isChecked
                        ? "bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 text-indigo-950 dark:text-indigo-200"
                        : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} // handled by label onClick
                      className="mt-0.5 size-4 rounded-md text-indigo-600 border-slate-300 focus:ring-indigo-500 pointer-events-none"
                    />
                    <span className="text-xs sm:text-sm leading-relaxed">
                      {a}
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={computeScore}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <Sparkles className="size-3.5" />
                <span>Calculer &amp; enregistrer mon score</span>
              </button>
            </div>

            {scoreShown && (
              <div className="pt-1">
                <QuizBilan correct={checked.size} total={subject[1].length} />
              </div>
            )}

            {/* Model Solution Accordion */}
            <details className="group pt-2 border-t border-slate-200/60 dark:border-slate-800">
              <summary className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer select-none py-1.5 hover:underline">
                <FileText className="size-3.5" />
                <span>Voir le corrigé modèle d&apos;excellence rédigé</span>
              </summary>
              <div
                className="mt-3 p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 space-y-2 prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: subject[2] }}
              />
            </details>
          </div>
        )}
      </div>
    </div>
  );
}

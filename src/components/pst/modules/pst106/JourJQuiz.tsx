"use client";

import { useEffect, useRef, useState } from "react";
import { QCM } from "@/lib/pst/data/pst106";
import { PIEGES } from "@/lib/pst/data/pst106-inline";
import { shuffleArr } from "@/lib/pst/utils";
import {
  playClickSound,
  playReviewSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  X,
  Award,
  Zap,
} from "lucide-react";

interface JJItem {
  q: string;
  options: string[];
  correct: number;
  explain: string;
}

function buildPool(): JJItem[] {
  const qcmItems: JJItem[] = QCM.map((q) => ({
    q: q[0] as string,
    options: q[1] as string[],
    correct: q[2] as number,
    explain: q[3] as string,
  }));
  const piegeItems: JJItem[] = PIEGES.map((p) => ({
    q: "Vrai ou Faux : " + (p[0] as string),
    options: ["Vrai", "Faux"],
    correct: p[1] ? 0 : 1,
    explain: p[2] as string,
  }));
  return shuffleArr(qcmItems.concat(piegeItems)).slice(0, 10);
}

function fmt(ms: number) {
  const clamped = Math.max(0, ms);
  const s = Math.floor(clamped / 1000);
  return (
    String(Math.floor(s / 60)).padStart(2, "0") +
    ":" +
    String(s % 60).padStart(2, "0")
  );
}

interface JourJQuizProps {
  onClose: () => void;
}

export function JourJQuiz({ onClose }: JourJQuizProps) {
  const [items, setItems] = useState<JJItem[]>(() => buildPool());
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [remaining, setRemaining] = useState(5 * 60 * 1000);
  const deadlineRef = useRef(Date.now() + 5 * 60 * 1000);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = window.setInterval(() => {
      const left = deadlineRef.current - Date.now();
      setRemaining(left);
      if (left <= 0) setFinished(true);
    }, 1000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  const current = items[idx];

  function choose(i: number) {
    if (answered !== null || finished) return;
    setAnswered(i);
    if (i === current?.correct) {
      setScore((s) => s + 1);
      playSuccessSound();
      triggerHaptic("success");
    } else {
      playReviewSound();
      triggerHaptic("error");
    }
  }

  function next() {
    playClickSound();
    triggerHaptic("selection");
    setAnswered(null);
    if (idx + 1 >= items.length) setFinished(true);
    else setIdx((v) => v + 1);
  }

  function restart() {
    playClickSound();
    triggerHaptic("selection");
    setItems(buildPool());
    setIdx(0);
    setScore(0);
    setAnswered(null);
    setFinished(false);
    deadlineRef.current = Date.now() + 5 * 60 * 1000;
    setRemaining(5 * 60 * 1000);
  }

  const pct = Math.round((100 * score) / (items.length || 1));
  const progressPct = items.length
    ? Math.round(((idx + (answered !== null ? 1 : 0)) * 100) / items.length)
    : 0;
  const isUrgent = remaining < 60000;
  const verdict =
    pct >= 80
      ? "Excellente maîtrise — Prêt(e) pour le Jour J de l'examen Cnam !"
      : pct >= 50
        ? "Bases acquises — Continue à réviser les nuances cliniques"
        : "Revois tes fiches théoriques et cliniques avant le grand jour";

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Sprint Quiz du Jour J"
        tabIndex={-1}
        className="w-full max-w-lg p-5 sm:p-7 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800 shadow-2xl backdrop-blur-xl space-y-4 max-h-[90vh] overflow-y-auto text-slate-900 dark:text-slate-100 outline-hidden"
      >
        {finished || idx >= items.length ? (
          <div className="text-center space-y-4 py-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
              <Award className="size-3.5 text-indigo-600" />
              <span>Sprint Jour J Terminé</span>
            </span>

            <div className="space-y-1">
              <div className="text-4xl font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                {score} / {items.length}
              </div>
              <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-200">
                {pct}% de réussite
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
              {verdict}
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <RotateCcw className="size-3.5" />
                <span>Nouveau sprint</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center px-4 py-2 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
              >
                Fermer
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Top Bar with Timer */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
                  <Zap className="size-3 text-indigo-600 dark:text-indigo-400" />
                  <span>#{idx + 1} / {items.length}</span>
                </span>
                <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                  Score : {score}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold tabular-nums border ${
                    isUrgent
                      ? "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30 animate-pulse"
                      : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
                  }`}
                >
                  <Clock className="size-3" />
                  <span>{fmt(remaining)}</span>
                </span>

                <button
                  type="button"
                  aria-label="Fermer"
                  onClick={onClose}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Minimal Progress Bar */}
            <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {/* Question Text */}
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug m-0">
              {current.q}
            </h3>

            {/* Options */}
            <div className="space-y-2">
              {current.options.map((opt, i) => {
                const isCorrect = i === current.correct;
                const isChosen = i === answered;
                let btnCls = "bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200";

                if (answered !== null) {
                  if (isCorrect) {
                    btnCls = "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-bold";
                  } else if (isChosen) {
                    btnCls = "bg-rose-50/80 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200 font-semibold";
                  } else {
                    btnCls = "opacity-40 bg-slate-50/30 dark:bg-slate-800/20 border-slate-200/40 text-slate-500 dark:text-slate-500";
                  }
                }

                return (
                  <button
                    key={i}
                    type="button"
                    disabled={answered !== null}
                    onClick={() => choose(i)}
                    className={`w-full text-left p-3 rounded-2xl border text-xs sm:text-sm leading-relaxed transition-all cursor-pointer flex items-start gap-2.5 active:scale-99 ${btnCls}`}
                  >
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 shrink-0 mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback & Next Button */}
            {answered !== null && (
              <div className="space-y-3 pt-2 animate-fadeIn border-t border-slate-200/60 dark:border-slate-800">
                <div
                  className={`p-3 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                    answered === current.correct
                      ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200"
                      : "bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200"
                  }`}
                >
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    {answered === current.correct ? (
                      <>
                        <CheckCircle2 className="size-3.5 text-emerald-600" />
                        <span>✓ Réponse exacte</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="size-3.5 text-rose-600" />
                        <span>✗ Réponse incorrecte</span>
                      </>
                    )}
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: current.explain }}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
                  >
                    <span>{idx + 1 < items.length ? "Question suivante" : "Voir mon score"}</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

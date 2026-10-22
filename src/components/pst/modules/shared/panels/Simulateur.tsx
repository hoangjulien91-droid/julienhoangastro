"use client";

import { useState } from "react";
import {
  Drama,
  MessageSquare,
  Award,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import type { SimScenario } from "@/lib/pst/types";
import {
  playClickSound,
  playReviewSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface SimulateurProps {
  data: SimScenario[];
  hint: string;
}

const JOURNAL_STORAGE_KEY = "pst_field_journal_v1";

export function Simulateur({ data, hint }: SimulateurProps) {
  const [simIdx, setSimIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [exportedJournal, setExportedJournal] = useState(false);

  const sc = data[simIdx];

  function selectScenario(i: number) {
    playClickSound();
    triggerHaptic("selection");
    setSimIdx(i);
    setStep(0);
    setScore(0);
    setSelected(null);
    setExportedJournal(false);
  }

  function restart() {
    playClickSound();
    triggerHaptic("selection");
    setStep(0);
    setScore(0);
    setSelected(null);
    setExportedJournal(false);
  }

  function exportToJournal() {
    if (!sc || typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(JOURNAL_STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      const arr = Array.isArray(list) ? list : [];
      const max = sc.steps.length * 2;
      const newEntry = {
        id: `jt-sim-${Date.now()}`,
        createdAt: new Date().toISOString().slice(0, 10),
        moduleCode: "PST",
        situation: `[Simulateur · ${sc.title} (${sc.persona})] ${sc.context}`,
        prescrit: `Posture clinique obtenue : ${score} / ${max}.`,
        reel: `Principes cliniques mobilisés : ${sc.principes.join(" · ")}`,
        conceptKey: sc.title,
        authorRef: sc.persona,
      };
      localStorage.setItem(
        JOURNAL_STORAGE_KEY,
        JSON.stringify([newEntry, ...arr]),
      );
      window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      playSuccessSound();
      triggerHaptic("success");
      setExportedJournal(true);
    } catch {
      /* ignore */
    }
  }

  if (!sc) {
    return <p className="hint">Simulateur non configuré pour ce scénario.</p>;
  }

  return (
    <div className="space-y-4">
      {hint && <p className="hint">{hint}</p>}

      {/* Scenario Switcher Pill Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {data.map((s, i) => {
          const isActive = i === simIdx;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => selectScenario(i)}
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {s.title}
            </button>
          );
        })}
      </div>

      <div id="simHost">
        {step >= sc.steps.length
          ? // Simulation Complete & Debrief
            (() => {
              const max = sc.steps.length * 2;
              const pct = Math.round((score * 100) / max);
              const isHigh = pct >= 80;
              const isMid = pct >= 50;

              const badgeCls = isHigh
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
                : isMid
                  ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
                  : "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20";

              return (
                <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5 animate-fadeIn">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/60 dark:border-slate-800 pb-3">
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
                        <Award className="size-3 text-indigo-600 dark:text-indigo-400" />
                        <span>Bilan d&apos;Intervention Clinique</span>
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
                        {sc.title}
                      </h3>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold border ${badgeCls}`}
                    >
                      Score de posture : {pct}% ({score} / {max} pts)
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 space-y-3">
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-emerald-500" />
                      <span>
                        Principes de l&apos;activité clinique mobilisés dans
                        cette situation :
                      </span>
                    </div>

                    <ul className="space-y-2 list-none pl-0 m-0">
                      {sc.principes.map((p, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300"
                        >
                          <span className="size-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                          <span className="flex-1">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={exportToJournal}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold border transition-all cursor-pointer active:scale-95 ${
                        exportedJournal
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                          : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      <BookOpen className="size-3.5" />
                      <span>
                        {exportedJournal
                          ? "✓ Ajouté au Carnet Terrain"
                          : "Archiver au Carnet Terrain"}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={restart}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
                    >
                      <RotateCcw className="size-3.5" />
                      <span>Recommencer ce scénario</span>
                    </button>
                  </div>
                </div>
              );
            })()
          : // Simulation Step
            (() => {
              const s = sc.steps[step];
              if (!s) return null;
              const progress = Math.round((step * 100) / sc.steps.length);
              const isAnswered = selected !== null;

              return (
                <div className="space-y-4">
                  {/* Clinical Context Banner */}
                  <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-indigo-600 shadow-xs space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
                        <Drama className="size-3 text-indigo-600 dark:text-indigo-400" />
                        <span>Mise en situation clinique · {sc.persona}</span>
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 m-0">
                      {sc.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed">
                      {sc.context}
                    </p>
                  </div>

                  {/* Minimal Apple Progress Bar */}
                  <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Interaction Card */}
                  <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        Étape {step + 1} / {sc.steps.length}
                      </span>

                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                        Posture cumulative : {score} pts
                      </span>
                    </div>

                    {/* Worker Verbatim Quote Card */}
                    <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        <MessageSquare className="size-3" />
                        <span>Verbatim du professionnel :</span>
                      </div>
                      <p className="text-xs sm:text-sm italic text-slate-800 dark:text-slate-200 m-0 leading-relaxed font-medium">
                        « {s.worker} »
                      </p>
                    </div>

                    {/* Prompt */}
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
                      {s.prompt}
                    </h4>

                    {/* Options */}
                    <div className="space-y-2">
                      {s.options.map((o, oIdx) => {
                        const isChosen = selected === oIdx;
                        let btnCls =
                          "bg-slate-50/70 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800/80 border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200";

                        if (isAnswered) {
                          if (o.score === 2) {
                            btnCls =
                              "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-semibold";
                          } else if (o.score === 1) {
                            btnCls = isChosen
                              ? "bg-amber-50/80 dark:bg-amber-950/40 border-amber-400 dark:border-amber-700 text-amber-950 dark:text-amber-200"
                              : "opacity-60 bg-slate-50/40 dark:bg-slate-800/30 border-slate-200/50 text-slate-600 dark:text-slate-400";
                          } else {
                            btnCls = isChosen
                              ? "bg-rose-50/80 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200"
                              : "opacity-50 bg-slate-50/30 dark:bg-slate-800/20 border-slate-200/40 text-slate-500 dark:text-slate-500";
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={isAnswered}
                            onClick={() => {
                              setSelected(oIdx);
                              setScore((sVal) => sVal + o.score);
                              if (o.score >= 2) {
                                playSuccessSound();
                                triggerHaptic("success");
                              } else if (o.score === 1) {
                                playClickSound();
                                triggerHaptic("selection");
                              } else {
                                playReviewSound();
                                triggerHaptic("error");
                              }
                            }}
                            className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer text-xs sm:text-sm leading-relaxed flex items-start gap-2.5 active:scale-99 ${btnCls}`}
                          >
                            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/10 shrink-0 mt-0.5">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="flex-1">{o.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback on selection */}
                    {isAnswered && selected !== null && (
                      <div className="space-y-3 pt-2 animate-fadeIn">
                        {(() => {
                          const opt = s.options[selected];
                          if (!opt) return null;
                          const isMax = opt.score === 2;
                          const isMid = opt.score === 1;

                          const calloutCls = isMax
                            ? "bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-400 text-emerald-950 dark:text-emerald-200"
                            : isMid
                              ? "bg-amber-50/70 dark:bg-amber-950/40 border-amber-400 text-amber-950 dark:text-amber-200"
                              : "bg-rose-50/70 dark:bg-rose-950/40 border-rose-400 text-rose-950 dark:text-rose-200";

                          return (
                            <div
                              className={`p-3.5 rounded-2xl border border-l-4 text-xs sm:text-sm leading-relaxed ${calloutCls}`}
                            >
                              <div className="font-bold mb-1 flex items-center gap-1.5">
                                {isMax ? (
                                  <>
                                    <CheckCircle2 className="size-3.5 text-emerald-600" />
                                    <span>
                                      Posture clinique optimale (+2 pts)
                                    </span>
                                  </>
                                ) : isMid ? (
                                  <>
                                    <AlertCircle className="size-3.5 text-amber-600" />
                                    <span>Posture partielle (+1 pt)</span>
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle className="size-3.5 text-rose-600" />
                                    <span>Posture inadaptée (0 pt)</span>
                                  </>
                                )}
                              </div>
                              <p className="m-0">{opt.fb}</p>
                            </div>
                          );
                        })()}

                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              playClickSound();
                              triggerHaptic("selection");
                              setStep((st) => st + 1);
                              setSelected(null);
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
                          >
                            <span>
                              {step + 1 >= sc.steps.length
                                ? "Voir le débriefing clinique"
                                : "Étape suivante"}
                            </span>
                            <ArrowRight className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Users, Stethoscope, RotateCcw, Award, CheckCircle2 } from "lucide-react";
import type { PstStore } from "@/lib/pst/store";
import { SOSIE_SCENARIOS } from "@/lib/pst/data/pst106-sosie";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

type ScenarioKey = keyof typeof SOSIE_SCENARIOS;

interface Msg {
  sender: "sosie" | "user";
  text: string;
}

interface SosieWidgetProps {
  store: PstStore;
  onStoreChange: () => void;
}

export function SosieWidget({ store, onStoreChange }: SosieWidgetProps) {
  const [scenarioName, setScenarioName] = useState<
    "bus" | "guichet" | "machine"
  >("bus");
  const [difficulty, setDifficulty] = useState<"normal" | "hard">("normal");
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [locked, setLocked] = useState(false);
  const [finished, setFinished] = useState(false);

  const key = `${scenarioName}_${difficulty}` as ScenarioKey;
  const sc = SOSIE_SCENARIOS[key];

  function start(name = scenarioName, diff = difficulty) {
    const k = `${name}_${diff}` as ScenarioKey;
    const scenario = SOSIE_SCENARIOS[k];
    setStep(0);
    setScore(0);
    setFinished(false);
    setLocked(false);
    setMessages([
      { sender: "sosie", text: scenario.intro },
      { sender: "sosie", text: scenario.steps[0]?.question ?? "" },
    ]);
  }

  function handleScenarioChange(name: "bus" | "guichet" | "machine") {
    playClickSound();
    triggerHaptic("selection");
    setScenarioName(name);
    start(name, difficulty);
  }

  function handleDifficultyChange(diff: "normal" | "hard") {
    playClickSound();
    triggerHaptic("selection");
    setDifficulty(diff);
    start(scenarioName, diff);
  }

  if (messages.length === 0) {
    start();
    return null;
  }

  const pct = Math.min((step / sc.steps.length) * 100, 100);
  const currentStep = !finished ? sc.steps[step] : undefined;

  function choose(opt: { text: string; score: number; feedback: string }) {
    if (locked) return;
    playClickSound();
    triggerHaptic("selection");
    setLocked(true);
    setMessages((m) => [
      ...m,
      { sender: "user", text: opt.text },
      { sender: "sosie", text: opt.feedback },
    ]);
    const newScore = score + opt.score;
    setScore(newScore);

    window.setTimeout(() => {
      const nextStep = step + 1;
      setStep(nextStep);
      setLocked(false);
      if (nextStep >= sc.steps.length) {
        setFinished(true);
        const average = Math.round(newScore / sc.steps.length);
        if (average === 100) {
          playSuccessSound();
          triggerHaptic("success");
          store.unlockBadge("sosie_director");
          onStoreChange();
        }
      } else {
        setMessages((m) => [
          ...m,
          { sender: "sosie", text: sc.steps[nextStep]?.question ?? "" },
        ]);
      }
    }, 1200);
  }

  const averageScore = finished ? Math.round(score / sc.steps.length) : null;

  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
          <Users className="size-3 text-indigo-600 dark:text-indigo-400" />
          <span>Atelier Méthodologique · Instruction au Sosie</span>
        </span>
        <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
          Yves Clot · CNAM
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed">
        Instruisez votre sosie virtuel. Le sosie suivra vos consignes mais sera confronté aux variabilités du réel. Saurez-vous lui transmettre le « genre professionnel » plutôt que le simple « travail prescrit » ?
      </p>

      {/* Scenario & Difficulty Selectors */}
      <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Scénario d&apos;activité :
            </label>
            <select
              value={scenarioName}
              onChange={(e) =>
                handleScenarioChange(
                  e.target.value as "bus" | "guichet" | "machine",
                )
              }
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/40 cursor-pointer"
            >
              <option value="bus">Chauffeur de bus de nuit (Ligne 99)</option>
              <option value="guichet">Agent d&apos;accueil (Client agressif)</option>
              <option value="machine">Opérateur d&apos;usine (Presse hydraulique)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Niveau de complexité :
            </label>
            <select
              value={difficulty}
              onChange={(e) =>
                handleDifficultyChange(e.target.value as "normal" | "hard")
              }
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/40 cursor-pointer"
            >
              <option value="normal">• Normal (Variabilités standards)</option>
              <option value="hard">Difficile (Double contrainte &amp; crise)</option>
            </select>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs font-mono font-bold text-indigo-700 dark:text-indigo-400">
          <span>Score de transmission du genre :</span>
          <span className="text-sm">{finished ? `${averageScore}/100` : `${score} pts`}</span>
        </div>

        {/* Chat Messages Log */}
        <div className="max-h-72 overflow-y-auto rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3.5 bg-white/60 dark:bg-slate-900/60 space-y-2.5 scrollbar-none">
          {messages.map((m, i) => {
            const isSosie = m.sender === "sosie";
            return (
              <div
                key={i}
                className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[85%] ${
                  isSosie
                    ? "bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 rounded-tl-xs mr-auto border border-slate-200/60 dark:border-slate-700/60"
                    : "bg-indigo-600 text-white rounded-tr-xs ml-auto shadow-2xs"
                }`}
              >
                <div
                  className={`text-[10px] font-mono font-bold uppercase mb-0.5 ${
                    isSosie ? "text-indigo-600 dark:text-indigo-400" : "text-indigo-100"
                  }`}
                >
                  {isSosie ? "Sosie :" : "Vous (Travailleur instructeur) :"}
                </div>
                <div>{m.text}</div>
              </div>
            );
          })}
        </div>

        {/* Clinical Synthesis on Finish */}
        {finished && (
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2.5 animate-fadeIn">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
                <Stethoscope className="size-3 text-indigo-600 dark:text-indigo-400" />
                <span>Synthèse Clinique de l&apos;Activité</span>
              </span>
              <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300">
                Alignement : {averageScore}% {averageScore === 100 ? "⭐ (Parfait - Badge Débloqué)" : ""}
              </span>
            </div>
            <div
              className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sc.synthesis }}
            />
          </div>
        )}

        {/* Action / Choices */}
        <div className="pt-1">
          {finished ? (
            <button
              type="button"
              onClick={() => start()}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw className="size-3.5" />
              <span>Recommencer ce scénario</span>
            </button>
          ) : (
            <div className="space-y-2">
              {currentStep?.opts.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={locked}
                  onClick={() => choose(opt)}
                  className="w-full text-left p-3 rounded-xl border border-slate-200/90 dark:border-slate-700 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed transition-all cursor-pointer active:scale-99 shadow-2xs"
                  dangerouslySetInnerHTML={{ __html: opt.text }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

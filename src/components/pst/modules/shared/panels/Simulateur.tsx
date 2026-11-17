"use client";

import { useState } from "react";
import type { SimScenario } from "@/lib/pst/types";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { SimulateurDebriefCard } from "./simulateur/SimulateurDebriefCard";
import { SimulateurStepCard } from "./simulateur/SimulateurStepCard";

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
      <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none pb-1 sm:pb-0">
        {data.map((s, i) => {
          const isActive = i === simIdx;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => selectScenario(i)}
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95 ${
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
        {step >= sc.steps.length ? (
          <SimulateurDebriefCard
            sc={sc}
            score={score}
            exportedJournal={exportedJournal}
            onExportToJournal={exportToJournal}
            onRestart={restart}
          />
        ) : (
          <SimulateurStepCard
            sc={sc}
            step={step}
            score={score}
            selected={selected}
            onSelectOption={(oIdx, oScore) => {
              setSelected(oIdx);
              setScore((sVal) => sVal + oScore);
            }}
            onNextStep={() => {
              setStep((st) => st + 1);
              setSelected(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

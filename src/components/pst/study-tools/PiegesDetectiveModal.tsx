"use client";

import { useState, useEffect } from "react";
import { X, ShieldAlert } from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playFlipSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  DETECTIVE_CASES,
  type DetectiveCase,
} from "@/lib/pst/data/pieges-detective-data";
import { DetectiveCaseView } from "./pieges-detective/DetectiveCaseView";

export { DETECTIVE_CASES };
export type { DetectiveCase };

interface PiegesDetectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

const MODULE_PILLS = [
  { key: "all", label: "Tous" },
  { key: "pst106", label: "PST106" },
  { key: "pst108", label: "PST108" },
  { key: "pst120", label: "PST120" },
  { key: "pst123", label: "PST123" },
  { key: "pst124", label: "PST124" },
];

export function PiegesDetectiveModal({
  isOpen,
  onClose,
  defaultModule,
}: PiegesDetectiveModalProps) {
  const [selectedModule, setSelectedModule] = useState<string>(
    defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)
      ? defaultModule
      : "all",
  );
  const [caseIndex, setCaseIndex] = useState(0);
  const [solvedSet, setSolvedSet] = useState<Set<string>>(new Set());
  const [selectedAssertionIdx, setSelectedAssertionIdx] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)) {
      setSelectedModule(defaultModule);
      setCaseIndex(0);
      setSelectedAssertionIdx(null);
    }
  }, [defaultModule, isOpen]);

  const filteredCases = DETECTIVE_CASES.filter((c) =>
    selectedModule === "all" ? true : c.moduleKey === selectedModule,
  );

  const currentCase = filteredCases[caseIndex] || filteredCases[0];

  if (!isOpen) return null;

  function handleSelectAssertion(idx: number) {
    if (selectedAssertionIdx !== null) return;
    setSelectedAssertionIdx(idx);

    const isPiege = currentCase.assertions[idx]?.isPiege;
    if (isPiege) {
      triggerHaptic("success");
      playSuccessSound();
      setSolvedSet((prev) => new Set(prev).add(currentCase.id));
      window.dispatchEvent(new CustomEvent("pst:detective-solved"));
    } else {
      triggerHaptic("error");
      playFlipSound();
    }
  }

  function handleNextCase() {
    triggerHaptic("selection");
    playClickSound();
    setSelectedAssertionIdx(null);
    if (caseIndex < filteredCases.length - 1) {
      setCaseIndex((i) => i + 1);
    } else {
      setCaseIndex(0);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Détective des Pièges — Anti-Faute 18/20"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-white/95 dark:bg-slate-900 text-slate-900 dark:text-slate-100 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header iOS */}
        <div className="flex items-center justify-between px-3.5 py-3 sm:px-6 sm:py-5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-indigo-500/10 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shrink-0">
              <ShieldAlert className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5 sm:gap-2 m-0 truncate">
                <span className="truncate">Détective des Pièges</span>
                <span className="text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-800 dark:text-rose-200 font-extrabold uppercase shrink-0">
                  Anti-Faute 18/20
                </span>
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 truncate m-0">
                Démasquez le piège fatal parmi les affirmations
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 flex items-center justify-center transition-all cursor-pointer shrink-0"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4">
          {/* Module Filter Pills */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap max-w-full pb-0.5">
              {MODULE_PILLS.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSelectedModule(m.key);
                    setCaseIndex(0);
                    setSelectedAssertionIdx(null);
                  }}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
                    selectedModule === m.key
                      ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                      : "bg-slate-50/90 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-800"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
              Dossier {caseIndex + 1} / {filteredCases.length} ·{" "}
              {solvedSet.size} résolus
            </span>
          </div>

          {currentCase && (
            <DetectiveCaseView
              currentCase={currentCase}
              selectedAssertionIdx={selectedAssertionIdx}
              onSelectAssertion={handleSelectAssertion}
              onNextCase={handleNextCase}
            />
          )}
        </div>
      </div>
    </div>
  );
}

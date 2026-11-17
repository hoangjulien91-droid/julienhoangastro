"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playFlipSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { toast } from "sonner";
import {
  type SujetDissertation,
  SUJETS_DISSERTATION,
} from "@/lib/pst/data/sujets-dissertation";
import { DissertationHeader } from "./dissertation/DissertationHeader";
import { DissertationPlanCard } from "./dissertation/DissertationPlanCard";
import { DissertationCitationsPiegeCard } from "./dissertation/DissertationCitationsPiegeCard";

export type { SujetDissertation };
export { SUJETS_DISSERTATION };

interface SujetsDissertationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

export function SujetsDissertationModal({
  isOpen,
  onClose,
  defaultModule,
}: SujetsDissertationModalProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>(
    defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)
      ? defaultModule
      : "all",
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    if (defaultModule && /^pst(106|108|120|123|124)$/.test(defaultModule)) {
      setSelectedFilter(defaultModule);
      setSelectedIndex(0);
    }
  }, [defaultModule, isOpen]);

  const filtered = useMemo(() => {
    return SUJETS_DISSERTATION.filter((s) =>
      selectedFilter === "all" ? true : s.moduleKey === selectedFilter,
    );
  }, [selectedFilter]);

  const currentSujet = filtered[selectedIndex] || filtered[0];

  if (!isOpen) return null;

  function handleRandomDraw() {
    triggerHaptic("selection");
    playFlipSound();
    setIsRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setSelectedIndex(Math.floor(Math.random() * filtered.length));
      count++;
      if (count >= 8) {
        clearInterval(interval);
        setIsRolling(false);
        triggerHaptic("success");
        playSuccessSound();
      }
    }, 70);
  }

  function handleCopyPlan() {
    if (!currentSujet) return;
    triggerHaptic("success");
    playClickSound();
    const text = `SUJET D'EXAMEN CNAM : ${currentSujet.titre}\n\nPROBLÉMATIQUE :\n${currentSujet.problematique}\n\nPLAN D'EXAMEN 18/20 :\n\n${currentSujet.plan18_20.partie1.titre}\nA. ${currentSujet.plan18_20.partie1.sousPartieA.titre} (${currentSujet.plan18_20.partie1.sousPartieA.auteurRef})\nB. ${currentSujet.plan18_20.partie1.sousPartieB.titre} (${currentSujet.plan18_20.partie1.sousPartieB.auteurRef})\n\n${currentSujet.plan18_20.partie2.titre}\nA. ${currentSujet.plan18_20.partie2.sousPartieA.titre} (${currentSujet.plan18_20.partie2.sousPartieA.auteurRef})\nB. ${currentSujet.plan18_20.partie2.sousPartieB.titre} (${currentSujet.plan18_20.partie2.sousPartieB.auteurRef})\n\nCITATIONS IMPOSÉES :\n${currentSujet.citationsObligatoires.join("\n")}\n\nPIÈGE D'EXAMEN :\n${currentSujet.piegesExamen}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Plan complet copié au presse-papier !");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Dissertation & Plans Modèles 18/20"
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <DissertationHeader
          onClose={onClose}
          selectedFilter={selectedFilter}
          onSelectFilter={(f) => {
            setSelectedFilter(f);
            setSelectedIndex(0);
          }}
          onRandomDraw={handleRandomDraw}
          isRolling={isRolling}
        />

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {currentSujet && (
            <div className="space-y-4">
              {/* Titre du Sujet */}
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-indigo-50/80 via-white to-amber-50/60 dark:from-indigo-950/30 dark:via-slate-900 dark:to-amber-950/20 border-2 border-indigo-500/30 shadow-md space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-mono font-bold text-[10px] uppercase">
                    {currentSujet.moduleKey.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyPlan}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
                      title="Copier le plan complet au presse-papier"
                    >
                      {copied ? (
                        <Check className="size-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                      <span>{copied ? "Copié !" : "Copier"}</span>
                    </button>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 leading-snug">
                  {currentSujet.titre}
                </h3>

                <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block">
                    🎯 Problématique d&apos;examen rédigée :
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-serif italic">
                    « {currentSujet.problematique} »
                  </p>
                </div>
              </div>

              {/* Plan en 2 Parties / 4 Sous-Parties */}
              <DissertationPlanCard plan={currentSujet.plan18_20} />

              {/* Citations & Piège */}
              <DissertationCitationsPiegeCard
                citationsObligatoires={currentSujet.citationsObligatoires}
                piegesExamen={currentSujet.piegesExamen}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

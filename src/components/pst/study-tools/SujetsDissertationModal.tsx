"use client";

import { useEffect, useMemo, useState } from "react";
import {
  X,
  GraduationCap,
  Sparkles,
  Dice5,
  Copy,
  Check,
  BookOpen,
  AlertTriangle,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
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
    defaultModule && /^pst(106|108|123)$/.test(defaultModule)
      ? defaultModule
      : "all",
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    if (defaultModule && /^pst(106|108|123)$/.test(defaultModule)) {
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
        {/* En-tête Feuille Modale */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-indigo-500/10 via-amber-500/10 to-rose-500/10 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-amber-600 flex items-center justify-center text-white shadow-md shrink-0">
              <GraduationCap className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 m-0 truncate">
                <span className="truncate">Dissertation &amp; Plans 18/20</span>
                <span className="hidden sm:inline text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-800 dark:text-indigo-200 font-extrabold uppercase shrink-0">
                  Modèles CNAM
                </span>
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate m-0">
                Problématisation, plan en 2 parties, citations et pièges
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 flex items-center justify-center transition-all cursor-pointer shrink-0"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Filter bar & Actions */}
        <div className="p-2.5 sm:p-4 border-b border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center justify-between gap-2 overflow-hidden">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap max-w-full pb-0.5">
            {[
              { key: "all", short: "Tous", desc: "" },
              { key: "pst108", short: "PST108", desc: " (Dialogue)" },
              { key: "pst106", short: "PST106", desc: " (Clinique)" },
              { key: "pst123", short: "PST123", desc: " (Emploi)" },
              { key: "transversal", short: "Transversaux", desc: " RNCP 7" },
            ].map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => {
                  playClickSound();
                  setSelectedFilter(f.key);
                  setSelectedIndex(0);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
                  selectedFilter === f.key
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>{f.short}</span>
                <span className="hidden sm:inline opacity-80">{f.desc}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleRandomDraw}
              disabled={isRolling}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0"
              title="Tirer un sujet de dissertation au hasard"
            >
              <Dice5
                className={`size-3.5 text-amber-600 ${isRolling ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Tirage aléatoire</span>
              <span className="sm:hidden">Tirage</span>
            </button>
          </div>
        </div>

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
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Layers className="size-3.5 text-indigo-500" />
                  <span>Matrice du Plan Dialectique 18/20</span>
                </span>

                {/* Partie I */}
                <div className="p-4 rounded-3xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                  <h4 className="font-bold text-sm text-indigo-800 dark:text-indigo-300">
                    {currentSujet.plan18_20.partie1.titre}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {currentSujet.plan18_20.partie1.sousPartieA.titre}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {currentSujet.plan18_20.partie1.sousPartieA.argument}
                      </p>
                      <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold block pt-1">
                        Ref :{" "}
                        {currentSujet.plan18_20.partie1.sousPartieA.auteurRef}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {currentSujet.plan18_20.partie1.sousPartieB.titre}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {currentSujet.plan18_20.partie1.sousPartieB.argument}
                      </p>
                      <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold block pt-1">
                        Ref :{" "}
                        {currentSujet.plan18_20.partie1.sousPartieB.auteurRef}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Partie II */}
                <div className="p-4 rounded-3xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                  <h4 className="font-bold text-sm text-indigo-800 dark:text-indigo-300">
                    {currentSujet.plan18_20.partie2.titre}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {currentSujet.plan18_20.partie2.sousPartieA.titre}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {currentSujet.plan18_20.partie2.sousPartieA.argument}
                      </p>
                      <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold block pt-1">
                        Ref :{" "}
                        {currentSujet.plan18_20.partie2.sousPartieA.auteurRef}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {currentSujet.plan18_20.partie2.sousPartieB.titre}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {currentSujet.plan18_20.partie2.sousPartieB.argument}
                      </p>
                      <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold block pt-1">
                        Ref :{" "}
                        {currentSujet.plan18_20.partie2.sousPartieB.auteurRef}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Citations & Piège */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 text-xs space-y-1.5">
                  <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                    <Sparkles className="size-3.5 text-amber-600" />
                    Citations à placer impérativement :
                  </span>
                  <div className="space-y-1 text-slate-700 dark:text-slate-300 font-serif italic text-[11px]">
                    {currentSujet.citationsObligatoires.map((c, cIdx) => (
                      <p key={cIdx} className="m-0 leading-snug">
                        {c}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 text-xs space-y-1.5">
                  <span className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1">
                    <AlertTriangle className="size-3.5 text-rose-600" />
                    Piège de correcteur d&apos;examen :
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-snug m-0">
                    {currentSujet.piegesExamen}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  X,
  FileSignature,
  RotateCcw,
  Eye,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  SUJETS_INTRO_BANQUE,
  type SujetIntroPrecharge,
} from "@/lib/pst/data/generateur-intro-data";
import { IntroFormSteps } from "./generateur-intro/IntroFormSteps";
import { IntroLivePreview } from "./generateur-intro/IntroLivePreview";

interface GenerateurIntro1820ModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModuleKey?:
    | "pst106"
    | "pst108"
    | "pst123"
    | "pst120"
    | "pst124"
    | "transversal";
}

export function GenerateurIntro1820Modal({
  isOpen,
  onClose,
  defaultModuleKey = "pst106",
}: GenerateurIntro1820ModalProps) {
  const [selectedSujetId, setSelectedSujetId] = useState<string>(() => {
    const match = SUJETS_INTRO_BANQUE.find(
      (s) => s.moduleKey === defaultModuleKey,
    );
    return match ? match.id : SUJETS_INTRO_BANQUE[0].id;
  });

  useEffect(() => {
    if (defaultModuleKey) {
      const match = SUJETS_INTRO_BANQUE.find(
        (s) => s.moduleKey === defaultModuleKey,
      );
      if (match) setSelectedSujetId(match.id);
    }
  }, [defaultModuleKey, isOpen]);

  // Intro parts state
  const [accroche, setAccroche] = useState("");
  const [definitions, setDefinitions] = useState("");
  const [paradoxe, setParadoxe] = useState("");
  const [problematique, setProblematique] = useState("");
  const [annoncePlan, setAnnoncePlan] = useState("");
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");

  if (!isOpen) return null;

  const currentSujet =
    SUJETS_INTRO_BANQUE.find((s) => s.id === selectedSujetId) ??
    SUJETS_INTRO_BANQUE[0];

  const handleLoadTemplate = (s: SujetIntroPrecharge) => {
    setSelectedSujetId(s.id);
    setAccroche(s.accrocheExemple);
    setDefinitions(s.definitionsExemple);
    setParadoxe(s.paradoxeExemple);
    setProblematique(s.problematiqueExemple);
    setAnnoncePlan(s.annoncePlanExemple);
    playSuccessSound();
    triggerHaptic("success");
  };

  const handleClear = () => {
    setAccroche("");
    setDefinitions("");
    setParadoxe("");
    setProblematique("");
    setAnnoncePlan("");
    playClickSound();
    triggerHaptic("selection");
  };

  const fullIntroduction = [
    accroche.trim(),
    definitions.trim(),
    paradoxe.trim(),
    problematique.trim(),
    annoncePlan.trim(),
  ]
    .filter(Boolean)
    .join("\n\n");

  const wordCount = fullIntroduction.trim()
    ? fullIntroduction.trim().split(/\s+/).length
    : 0;

  // Checklist score (/5)
  const scoreIntro =
    (accroche.trim() ? 1 : 0) +
    (definitions.trim() ? 1 : 0) +
    (paradoxe.trim() ? 1 : 0) +
    (problematique.trim() ? 1 : 0) +
    (annoncePlan.trim() ? 1 : 0);

  const handleCopyIntro = () => {
    navigator.clipboard.writeText(fullIntroduction);
    setCopied(true);
    playClickSound();
    triggerHaptic("success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-slate-950/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Générateur d'Introduction Parfaite 18/20"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border border-slate-200/90 dark:border-indigo-500/30 bg-white/95 dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 sm:px-6 sm:py-4 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/70 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-9 rounded-xl bg-indigo-500/15 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
              <FileSignature className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 truncate">
                  <span className="hidden sm:inline">
                    Méthodologie CNAM ·{" "}
                  </span>
                  Titre Psycho. du Travail
                </span>
                <span className="hidden sm:inline text-xs px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium shrink-0">
                  5 Temps
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white truncate m-0">
                <span>Générateur d&apos;Intro 18/20</span>
                <span className="hidden sm:inline"> &amp; Problématiques</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors"
              title="Fermer"
              aria-label="Fermer"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6">
          {/* Sujet selector bank */}
          <div className="p-3 sm:p-4 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Sujets d&apos;annales modèles 18/20 :
              </span>
              <button
                onClick={handleClear}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="size-3" />
                <span>Effacer</span>
              </button>
            </div>

            <div className="flex gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap pb-1">
              {SUJETS_INTRO_BANQUE.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleLoadTemplate(s)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer shrink-0 ${
                    s.id === selectedSujetId
                      ? "bg-indigo-600 border-indigo-400 text-white shadow-xs"
                      : "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase font-bold mr-1 opacity-80">
                    {s.moduleKey.toUpperCase()}
                  </span>
                  <span>{s.titre}</span>
                </button>
              ))}
            </div>

            <p className="text-[11px] sm:text-xs text-indigo-700 dark:text-indigo-300 italic pt-0.5 m-0 leading-relaxed">
              Énoncé : « {currentSujet.enonce} »
            </p>
          </div>

          {/* Mobile-Only Tab Switcher: Formulaire vs Rendu Final */}
          <div className="flex lg:hidden items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMobileTab("form")}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mobileTab === "form"
                  ? "bg-indigo-600 text-white font-bold shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>1. Saisie (5 étapes)</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileTab("preview")}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mobileTab === "preview"
                  ? "bg-indigo-600 text-white font-bold shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Eye className="size-3.5" />
              <span>2. Aperçu 18/20 ({scoreIntro}/5)</span>
            </button>
          </div>

          {/* 5-Step Inputs Form & Live Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            <div
              className={`lg:col-span-7 ${mobileTab === "preview" ? "hidden lg:block" : "block"}`}
            >
              <IntroFormSteps
                accroche={accroche}
                setAccroche={setAccroche}
                definitions={definitions}
                setDefinitions={setDefinitions}
                paradoxe={paradoxe}
                setParadoxe={setParadoxe}
                problematique={problematique}
                setProblematique={setProblematique}
                annoncePlan={annoncePlan}
                setAnnoncePlan={setAnnoncePlan}
              />
            </div>

            {/* Live Preview Panel */}
            <div
              className={`lg:col-span-5 ${mobileTab === "form" ? "hidden lg:flex" : "flex"}`}
            >
              <IntroLivePreview
                scoreIntro={scoreIntro}
                wordCount={wordCount}
                fullIntroduction={fullIntroduction}
                copied={copied}
                onCopy={handleCopyIntro}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

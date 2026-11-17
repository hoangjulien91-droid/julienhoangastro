"use client";

import { useState, useMemo } from "react";
import {
  X,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  RotateCcw,
  FileSearch,
  Award,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  PIEGES_PSYCHOLOGISATION,
  EXEMPLE_PIEGE_RH,
  EXEMPLE_MODELE_2020,
  type TargetUeFilter,
  type PiegeLangageItem,
} from "@/lib/pst/data/correcteur-copie-data";
import { analyzeCopie } from "@/lib/pst/data/correcteur-copie-engine";
import { CorrecteurDiagnosticPanel } from "./correcteur/CorrecteurDiagnosticPanel";

interface CorrecteurCopieCnamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CorrecteurCopieCnamModal({
  isOpen,
  onClose,
}: CorrecteurCopieCnamModalProps) {
  const [texteCopie, setTexteCopie] = useState("");
  const [targetUe, setTargetUe] = useState<TargetUeFilter>("ALL");
  const [mobileTab, setMobileTab] = useState<"texte" | "diagnostic">("texte");
  const [copied, setCopied] = useState(false);

  const analysis = useMemo(
    () => analyzeCopie(texteCopie, targetUe),
    [texteCopie, targetUe],
  );

  if (!isOpen) return null;

  const handleReplaceSingleTrap = (piege: PiegeLangageItem) => {
    const regex = new RegExp(piege.motifRegex.source, "gi");
    setTexteCopie((prev) => prev.replace(regex, piege.remplacementDirect));
    playSuccessSound();
    triggerHaptic();
  };

  const handleReplaceAllTraps = () => {
    let next = texteCopie;
    PIEGES_PSYCHOLOGISATION.forEach((p) => {
      const regex = new RegExp(p.motifRegex.source, "gi");
      next = next.replace(regex, p.remplacementDirect);
    });
    setTexteCopie(next);
    playSuccessSound();
    triggerHaptic();
  };

  const handleCopyText = () => {
    if (!texteCopie.trim()) return;
    navigator.clipboard.writeText(texteCopie);
    setCopied(true);
    playClickSound();
    triggerHaptic();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Correcteur de Copie CNAM — Barème et Anti-Psychologisation"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-slate-950/85 backdrop-blur-md"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border border-slate-200/90 dark:border-rose-500/30 bg-white/95 dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-4 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/70 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-9 rounded-xl bg-rose-500/15 dark:bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
              <FileSearch className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 truncate">
                  Scanner Anti-Psychologisation
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium shrink-0 hidden xs:inline">
                  Contrôle Qualité
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                Correcteur Stylistique &amp; Biais RH
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors shrink-0"
            title="Fermer"
            aria-label="Fermer"
          >
            <X className="size-4 sm:size-5" />
          </button>
        </div>

        {/* Mobile View Switcher */}
        <div className="lg:hidden flex items-center border-b border-slate-200/80 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-950/60 p-1.5 gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setMobileTab("texte")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
              mobileTab === "texte"
                ? "bg-rose-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <BookOpen className="size-3.5" />
            <span>1. Copie ({analysis.motsCount} mots)</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("diagnostic")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
              mobileTab === "diagnostic"
                ? "bg-rose-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Award className="size-3.5" />
            <span>2. Barème ({analysis.noteSur20}/20)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-5">
          {/* Target UE Filter Bar (Anti Hors-Sujet) */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
              UE évaluée (détection de hors-sujet) :
            </span>
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
              {(
                [
                  { id: "ALL", label: "Transversal" },
                  { id: "PST106", label: "PST106" },
                  { id: "PST108", label: "PST108" },
                  { id: "PST123", label: "PST123" },
                  { id: "PST120", label: "PST120" },
                  { id: "PST124", label: "PST124" },
                ] as const
              ).map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => {
                    setTargetUe(u.id);
                    playClickSound();
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    targetUe === u.id
                      ? "bg-rose-600 text-white shadow-xs"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800"
                  }`}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            {/* Left: Input Textarea */}
            <div
              className={`lg:col-span-7 space-y-3 flex flex-col ${
                mobileTab === "texte" ? "flex" : "hidden lg:flex"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Collez votre texte de dissertation ou d&apos;analyse :
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      setTexteCopie(EXEMPLE_PIEGE_RH);
                      playClickSound();
                      triggerHaptic();
                    }}
                    className="px-2 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-[11px] font-bold transition-colors cursor-pointer"
                    title="Charger un exemple de copie contenant des biais RH à corriger"
                  >
                    Tester brouillon piégé
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTexteCopie(EXEMPLE_MODELE_2020);
                      playClickSound();
                      triggerHaptic();
                    }}
                    className="px-2 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                    title="Charger un exemple de paragraphe calibré 20/20 au barème CNAM"
                  >
                    <Sparkles className="size-3" />
                    <span>Modèle 20/20</span>
                  </button>
                  {texteCopie.trim() && (
                    <>
                      <button
                        type="button"
                        onClick={handleCopyText}
                        className="px-2 py-1 rounded-lg bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copied ? (
                          <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Copy className="size-3" />
                        )}
                        <span>{copied ? "Copié" : "Copier"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTexteCopie("");
                          playClickSound();
                        }}
                        className="p-1 rounded-lg bg-slate-200/80 dark:bg-slate-800 hover:bg-rose-500/20 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                        title="Effacer le texte"
                      >
                        <RotateCcw className="size-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <textarea
                value={texteCopie}
                onChange={(e) => setTexteCopie(e.target.value)}
                placeholder="Collez ici votre paragraphe rédigé (ou cliquez sur « Tester brouillon piégé » ou « Modèle 20/20 » ci-dessus)... Le scanner vérifie le couplage Auteur ↔ Concept, la structure dialectique et remplace en 1 clic les biais managériaux."
                rows={13}
                className="w-full flex-1 min-h-[270px] p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-rose-500 font-sans leading-relaxed resize-none scrollbar-thin"
              />

              {/* Dialectical Structure & Syntax Check Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span
                    className={`px-2 py-0.5 rounded-md font-semibold border ${
                      analysis.hasQuestion
                        ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
                        : "bg-slate-100 dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    {analysis.hasQuestion ? "✓ Problématique (?)" : "○ Problématique (?)"}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md font-semibold border ${
                      analysis.hasDialectique
                        ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
                        : "bg-slate-100 dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    {analysis.hasDialectique ? "✓ Tension dialectique" : "○ Pivot (Or, toutefois...)"}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md font-semibold border ${
                      analysis.hasSynthese
                        ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30"
                        : "bg-slate-100 dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    {analysis.hasSynthese ? "✓ Inférence (Dès lors...)" : "○ Synthèse (Dès lors...)"}
                  </span>
                </div>
                <span>
                  <strong className="font-mono text-slate-700 dark:text-slate-200">{analysis.motsCount}</strong> mots ·{" "}
                  <strong className="font-mono text-slate-700 dark:text-slate-200">{analysis.phrasesCount}</strong> phrases
                </span>
              </div>
            </div>

            {/* Right: Real-Time Diagnostic Dashboard */}
            <div
              className={`lg:col-span-5 space-y-3.5 ${
                mobileTab === "diagnostic" ? "block" : "hidden lg:block"
              }`}
            >
              <CorrecteurDiagnosticPanel
                targetUe={targetUe}
                texteCopie={texteCopie}
                analysis={analysis}
                onReplaceSingleTrap={handleReplaceSingleTrap}
                onReplaceAllTraps={handleReplaceAllTraps}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

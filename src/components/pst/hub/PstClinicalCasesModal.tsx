"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Briefcase,
  Copy,
  Check,
  Download,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  CLINICAL_VIGNETTES,
  type ClinicalVignette,
} from "@/lib/pst/data/clinical-cases-data";
import { ClinicalCaseListView } from "./clinical-cases/ClinicalCaseListView";
import { ClinicalCaseDetailView } from "./clinical-cases/ClinicalCaseDetailView";

export type { ClinicalVignette } from "@/lib/pst/data/clinical-cases-data";

interface PstClinicalCasesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PstClinicalCasesModal: React.FC<PstClinicalCasesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    CLINICAL_VIGNETTES[0].id,
  );
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState<"list" | "detail">("list");

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const current =
    CLINICAL_VIGNETTES.find((c) => c.id === selectedId) ||
    CLINICAL_VIGNETTES[0];

  const formatMarkdown = (v: ClinicalVignette) => {
    return [
      `# ${v.title}`,
      `**UE Cibles** : ${v.ue} | **Secteur** : ${v.sector}`,
      `**Courants mobilisés** : ${v.streams.join(" · ")}`,
      "",
      "## 0. Commande Initiale & Observables de Terrain",
      `- **Commande institutionnelle** : ${v.rawCommand}`,
      `- **Observables ergonomiques & cliniques** : ${v.terrainObservables}`,
      "",
      "## 1. De la Commande à la Demande (Reformulation Clinique)",
      v.step1DemandReformulation,
      "",
      "## 2. Analyse Ergonomique : Tâche Prescrite vs Activité Réelle",
      v.step2PrescribedVsReal,
      "",
      "## 3. Problématisation & Mise en Tension Théorique",
      v.step3TheoreticalTension,
      "",
      "## 4. Dispositif Méthodologique & Cadre Déontologique (Code 2021)",
      v.step4InterventionDevice,
    ].join("\n");
  };

  const handleCopy = async () => {
    playClickSound();
    try {
      await navigator.clipboard.writeText(formatMarkdown(current));
      setCopied(true);
      triggerHaptic("success");
      playSuccessSound();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    triggerHaptic("success");
    playClickSound();
    const md = formatMarkdown(current);
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Vignette_Clinique_CNAM_${current.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
    playSuccessSound();
  };

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pst-clinical-cases-title"
    >
      <div className="relative w-full max-w-6xl max-h-[90vh] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 shadow-2xl flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/70">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest px-1.5 sm:px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold truncate">
                  Cas Cliniques CNAM
                </span>
                <span className="hidden sm:inline text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Méthode en 4 étapes RNCP 7
                </span>
              </div>
              <h2
                id="pst-clinical-cases-title"
                className="text-xs sm:text-base font-bold text-slate-900 dark:text-white truncate"
              >
                Vignettes d'Entreprise Corrigées
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/40 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copié</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copier</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exporter (.MD)</span>
              <span className="sm:hidden">.MD</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fermer la banque de cas cliniques"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Split Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left: Vignette List */}
          <ClinicalCaseListView
            vignettes={CLINICAL_VIGNETTES}
            selectedId={selectedId}
            onSelect={(id) => {
              triggerHaptic("selection");
              playClickSound();
              setSelectedId(id);
              setCopied(false);
              setMobileTab("detail");
            }}
            className={`lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-3 sm:p-4 overflow-y-auto space-y-2 ${
              mobileTab === "list" ? "block" : "hidden lg:block"
            }`}
          />

          {/* Right: 4-Step Methodological Resolution */}
          <ClinicalCaseDetailView
            current={current}
            onBackToMobileList={() => setMobileTab("list")}
            className={`lg:col-span-8 p-4 sm:p-6 overflow-y-auto space-y-4 bg-white dark:bg-[#0B0F17] ${
              mobileTab === "detail" ? "block" : "hidden lg:block"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default PstClinicalCasesModal;

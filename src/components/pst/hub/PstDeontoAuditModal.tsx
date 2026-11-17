import React, { useState, useEffect } from "react";
import {
  X,
  Scale,
  Copy,
  Check,
  AlertTriangle,
  BookOpen,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  ETHICAL_DILEMMAS,
  type EthicalDilemmaScenario,
} from "@/lib/pst/data/deonto-audit-data";

interface PstDeontoAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PstDeontoAuditModal: React.FC<PstDeontoAuditModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedId, setSelectedId] = useState<string>(ETHICAL_DILEMMAS[0].id);
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
    ETHICAL_DILEMMAS.find((d) => d.id === selectedId) || ETHICAL_DILEMMAS[0];

  const handleCopyScript = async () => {
    playClickSound();
    try {
      await navigator.clipboard.writeText(current.institutionalRefusalScript);
      setCopied(true);
      triggerHaptic("success");
      playSuccessSound();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pst-deonto-audit-title"
    >
      <div className="relative w-full max-w-6xl max-h-[90vh] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 shadow-2xl flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="flex items-center justify-between gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2.5 sm:py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/70">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-9 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <Scale className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest px-1.5 sm:px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-semibold truncate">
                  AUDIT DÉONTOLOGIQUE · CODE 2021
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden xs:inline truncate">
                  Art. 226-13 CP · L. 6313-4 CT
                </span>
              </div>
              <h2
                id="pst-deonto-audit-title"
                className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate"
              >
                Dilemmes Éthiques &amp; Opposabilité CNAM
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Fermer l'audit déontologique"
          >
            <X className="size-4 sm:size-5" />
          </button>
        </div>

        {/* Main Split Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left: Dilemma Selector */}
          <div
            className={`lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-3.5 sm:p-4 overflow-y-auto space-y-2 ${
              mobileTab === "list" ? "block" : "hidden lg:block"
            }`}
          >
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-2">
              Situations Critiques de Terrain ({ETHICAL_DILEMMAS.length})
            </span>

            {ETHICAL_DILEMMAS.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    triggerHaptic("selection");
                    playClickSound();
                    setSelectedId(item.id);
                    setCopied(false);
                    setMobileTab("detail");
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white dark:bg-slate-900 border-rose-500/50 shadow-xs"
                      : "bg-transparent border-slate-200/70 dark:border-slate-800 hover:bg-white/60 dark:hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        item.severity === "CRITIQUE"
                          ? "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                          : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      RISQUE {item.severity}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {item.ueRefs.join(" · ")}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {item.title}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Legal & Clinical Resolution */}
          <div
            className={`lg:col-span-8 p-3.5 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 bg-white dark:bg-[#0B0F17] ${
              mobileTab === "detail" ? "block" : "hidden lg:block"
            }`}
          >
            {/* Mobile Back Button */}
            <div className="lg:hidden pb-1">
              <button
                type="button"
                onClick={() => setMobileTab("list")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-mono font-bold text-rose-600 dark:text-rose-400 cursor-pointer"
              >
                <ChevronLeft className="size-3.5" />
                <span>← Retour aux situations ({ETHICAL_DILEMMAS.length})</span>
              </button>
            </div>

            {/* Situation */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Scénario d'injonction ou de conflit sur le terrain</span>
              </div>
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {current.terrainSituation}
              </p>
            </div>

            {/* Articles opposables */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-2.5">
                Fondements Opposables (Code de Déontologie 2021 &amp; Droit
                Positif)
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {current.codeArticles.map((art, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {art.ref}
                      </span>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {art.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {art.rule}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Posture Clinique CNAM */}
            <div className="p-4 rounded-xl border border-indigo-500/25 bg-indigo-500/5">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
                <BookOpen className="w-4 h-4" />
                <span>
                  Justification Clinique &amp; Épistémologique CNAM (Jury RNCP
                  7)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {current.clinicalPosture}
              </p>
            </div>

            {/* Script de recadrage prêt à copier */}
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    Formule de Recadrage Opposable (COPIL / Note de Cadrage /
                    Examen)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyScript}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xs transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Formule copiée
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copier la clause opposable
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs sm:text-sm font-serif italic text-slate-900 dark:text-slate-100 leading-relaxed bg-white/80 dark:bg-slate-950/70 p-3.5 rounded-lg border border-emerald-500/20">
                {current.institutionalRefusalScript}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PstDeontoAuditModal;

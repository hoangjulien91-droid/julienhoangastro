import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  FileText,
  Download,
  Printer,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  Scale,
  Hash,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  type StudioProjection,
  type StudioStorageState,
  MEMOIRE_SECTIONS,
  RNCP_GUARD_CHECKS,
  DEFAULT_STATE,
  STORAGE_KEY,
  PROJECTION_META,
} from "@/lib/pst/data/memoire-studio-data";
import {
  buildMarkdownExport,
  calculateIntegrityFingerprint,
} from "@/lib/pst/data/memoire-studio-helpers";
import { MemoireStudioSidebar } from "./memoire-studio/MemoireStudioSidebar";

interface PstMemoireStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PstMemoireStudioModal: React.FC<PstMemoireStudioModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [state, setState] = useState<StudioStorageState>(DEFAULT_STATE);
  const [activeSectionId, setActiveSectionId] = useState<string>(
    MEMOIRE_SECTIONS[0].id,
  );
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState<"sommaire" | "editeur">("editeur");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          setState((prev) => ({
            ...prev,
            ...parsed,
            sections: { ...prev.sections, ...(parsed.sections || {}) },
            checks: { ...prev.checks, ...(parsed.checks || {}) },
          }));
        }
      }
    } catch {
      // Ignore storage error
    }
  }, []);

  const updateState = (
    updater: (prev: StudioStorageState) => StudioStorageState,
  ) => {
    setState((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      } catch {
        // Ignore quota error
      }
      return next;
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const totalWords = useMemo(() => {
    const allText = Object.values(state.sections).join(" ").trim();
    if (!allText) return 0;
    return allText.split(/\s+/).length;
  }, [state.sections]);

  const checkedCount = useMemo(() => {
    return RNCP_GUARD_CHECKS.filter((c) => state.checks[c.id]).length;
  }, [state.checks]);

  const guardReadinessPct = Math.round(
    (checkedCount / RNCP_GUARD_CHECKS.length) * 100,
  );

  const integrityFingerprint = useMemo(
    () => calculateIntegrityFingerprint(state, totalWords, checkedCount),
    [state, totalWords, checkedCount],
  );

  if (!isOpen) return null;

  const handleCopyMarkdown = async () => {
    triggerHaptic("success");
    playClickSound();
    try {
      await navigator.clipboard.writeText(
        buildMarkdownExport(state, integrityFingerprint, guardReadinessPct),
      );
      setCopied(true);
      playSuccessSound();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadMarkdown = () => {
    triggerHaptic("success");
    playClickSound();
    const md = buildMarkdownExport(state, integrityFingerprint, guardReadinessPct);
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Memoire_CNAM_RNCP7_${state.projection}_${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
    playSuccessSound();
  };

  const handlePrint = () => {
    triggerHaptic("light");
    playClickSound();
    if (typeof document !== "undefined") {
      document.body.classList.add("printing-memoire-studio");
      window.print();
      setTimeout(() => {
        document.body.classList.remove("printing-memoire-studio");
      }, 1000);
    } else {
      window.print();
    }
  };

  const handleReset = () => {
    triggerHaptic("warning");
    playClickSound();
    updateState(() => DEFAULT_STATE);
  };

  const activeSection =
    MEMOIRE_SECTIONS.find((s) => s.id === activeSectionId) ||
    MEMOIRE_SECTIONS[0];

  return (
    <div
      id="memoire-studio-modal-overlay"
      className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-2 sm:p-4 lg:p-6 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pst-memoire-studio-title"
    >
      <div
        id="memoire-studio-modal-card"
        className="relative w-full max-w-7xl h-[92vh] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Top Studio Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2.5 sm:py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/70">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shrink-0">
              <BookOpen className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-bold truncate">
                  STUDIO MÉMOIRE RNCP 7
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">
                  <Hash className="w-3 h-3 text-emerald-500 shrink-0" />
                  {integrityFingerprint}
                </span>
              </div>
              <h2
                id="pst-memoire-studio-title"
                className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight truncate"
              >
                Atelier d&apos;Écriture &amp; Pré-Soutenance CNAM
              </h2>
            </div>
          </div>

          {/* Projection Selector + Actions */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <div className="hidden md:flex items-center p-0.5 rounded-xl bg-slate-200/70 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700">
              {(
                [
                  ["jury_cnam", "Jury CNAM"],
                  ["commanditaire_terrain", "Restitution COPIL"],
                  ["journal_clinique", "Journal Clinique"],
                ] as [StudioProjection, string][]
              ).map(([projKey, label]) => (
                <button
                  key={projKey}
                  type="button"
                  onClick={() => {
                    triggerHaptic("light");
                    playClickSound();
                    updateState((prev) => ({ ...prev, projection: projKey }));
                  }}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    state.projection === projKey
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-500/40 transition-colors cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  Copié
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copier .MD</span>
                  <span className="sm:hidden">Copier</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exporter</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title="Imprimer / Générer PDF A4"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
              aria-label="Fermer le studio mémoire"
            >
              <X className="size-4 sm:size-5" />
            </button>
          </div>
        </div>

        {/* Mobile View Switcher */}
        <div className="lg:hidden flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-1.5 gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setMobileTab("sommaire")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
              mobileTab === "sommaire"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <FileText className="size-3.5" />
            <span>1. Sommaire ({guardReadinessPct}%)</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("editeur")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
              mobileTab === "editeur"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <BookOpen className="size-3.5" />
            <span>2. Éditeur ({totalWords} mots)</span>
          </button>
        </div>

        {/* Main Split Workspace */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Left Column: Sommaire Structurel + RNCP 7 Pre-Defense Guard */}
          <div
            className={`lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-3.5 sm:p-4 overflow-y-auto flex flex-col gap-4 sm:gap-5 ${
              mobileTab === "sommaire" ? "flex" : "hidden lg:flex"
            }`}
          >
            <MemoireStudioSidebar
              state={state}
              activeSectionId={activeSectionId}
              onSelectSection={(id) => {
                triggerHaptic("light");
                playClickSound();
                setActiveSectionId(id);
                setMobileTab("editeur");
              }}
              onToggleCheck={(chkId) => {
                triggerHaptic("light");
                playClickSound();
                updateState((prev) => ({
                  ...prev,
                  checks: { ...prev.checks, [chkId]: !prev.checks[chkId] },
                }));
              }}
              onReset={handleReset}
              totalWords={totalWords}
              guardReadinessPct={guardReadinessPct}
              checkedCount={checkedCount}
            />
          </div>

          {/* Right Column: Paper/Ink Continuous Academic Editor */}
          <div
            className={`lg:col-span-8 p-3 sm:p-6 overflow-y-auto bg-slate-100/70 dark:bg-[#070A10] ${
              mobileTab === "editeur" ? "block" : "hidden lg:block"
            }`}
          >
            <div className="max-w-3xl mx-auto rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-[#FBF9F5] dark:bg-slate-900 p-4 sm:p-8 shadow-sm">
              {/* Document Header */}
              <div className="border-b border-slate-300/80 dark:border-slate-800 pb-5 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-slate-900 text-white dark:bg-indigo-500/20 dark:text-indigo-300 font-semibold">
                    {PROJECTION_META[state.projection].headerBadge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Année {state.academicYear}
                  </span>
                </div>

                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Intitulé du Mémoire / Dossier d&apos;Intervention
                </label>
                <input
                  type="text"
                  aria-label="Intitulé du Mémoire ou Dossier d'Intervention"
                  value={state.title}
                  onChange={(e) =>
                    updateState((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full text-base sm:text-lg font-bold bg-white/80 dark:bg-slate-950 border border-slate-300/80 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Terrain d&apos;intervention (Anonymisé)
                    </label>
                    <input
                      type="text"
                      aria-label="Terrain d'intervention anonymisé"
                      value={state.terrainOrg}
                      onChange={(e) =>
                        updateState((prev) => ({
                          ...prev,
                          terrainOrg: e.target.value,
                        }))
                      }
                      className="w-full text-xs bg-white/80 dark:bg-slate-950 border border-slate-300/80 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Objectif de la projection active
                    </label>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300 bg-white/60 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5">
                      {PROJECTION_META[state.projection].subtitle}
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Section Editor */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Partie {activeSection.number} · {activeSection.ueRef}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {activeSection.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1">
                    {MEMOIRE_SECTIONS.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setActiveSectionId(s.id)}
                        className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                          s.id === activeSectionId
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300"
                        }`}
                      >
                        {s.number}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Methodological Guidance Callout */}
                <div className="mb-3 p-3 rounded-xl bg-indigo-500/8 border border-indigo-500/20 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong className="font-semibold text-slate-900 dark:text-white">
                      Attendu méthodologique CNAM :
                    </strong>{" "}
                    {activeSection.guidance}
                  </p>
                </div>

                <textarea
                  rows={12}
                  value={state.sections[activeSection.id] || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateState((prev) => ({
                      ...prev,
                      sections: {
                        ...prev.sections,
                        [activeSection.id]: val,
                      },
                    }));
                  }}
                  placeholder={activeSection.placeholder}
                  className="w-full rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 text-sm leading-relaxed text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 font-serif"
                />
              </div>

              {/* Continuous Preview Summary */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Scale className="w-3.5 h-3.5 text-indigo-500" />
                  <span>
                    Code de déontologie des psychologues (2021) · Secret
                    professionnel &amp; Anonymisation stricte
                  </span>
                </div>
                <span className="font-mono">
                  Total corpus : <strong>{totalWords}</strong> mots
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PstMemoireStudioModal;

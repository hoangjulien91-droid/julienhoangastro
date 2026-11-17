import React, { useState, useEffect, useMemo } from "react";
import { FileText, BookOpen } from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  type StudioStorageState,
  MEMOIRE_SECTIONS,
  RNCP_GUARD_CHECKS,
  DEFAULT_STATE,
  STORAGE_KEY,
} from "@/lib/pst/data/memoire-studio-data";
import {
  buildMarkdownExport,
  calculateIntegrityFingerprint,
} from "@/lib/pst/data/memoire-studio-helpers";
import { MemoireStudioSidebar } from "./memoire-studio/MemoireStudioSidebar";
import { MemoireStudioHeader } from "./memoire-studio/MemoireStudioHeader";
import { MemoireStudioEditor } from "./memoire-studio/MemoireStudioEditor";

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
    const md = buildMarkdownExport(
      state,
      integrityFingerprint,
      guardReadinessPct,
    );
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
        <MemoireStudioHeader
          integrityFingerprint={integrityFingerprint}
          projection={state.projection}
          onProjectionChange={(projKey) => {
            triggerHaptic("light");
            playClickSound();
            updateState((prev) => ({ ...prev, projection: projKey }));
          }}
          onCopy={handleCopyMarkdown}
          copied={copied}
          onDownload={handleDownloadMarkdown}
          onPrint={handlePrint}
          onClose={onClose}
        />

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
            <MemoireStudioEditor
              state={state}
              activeSection={activeSection}
              activeSectionId={activeSectionId}
              onSelectSection={(id) => setActiveSectionId(id)}
              onUpdateState={updateState}
              totalWords={totalWords}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PstMemoireStudioModal;

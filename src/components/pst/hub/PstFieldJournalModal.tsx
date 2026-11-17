import React, { useState, useEffect } from "react";
import {
  X,
  Download,
  ClipboardList,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  type FieldObservationCategory,
  type FieldJournalEntry,
  CATEGORY_META,
  DEFAULT_ENTRIES,
  STORAGE_KEY,
} from "@/lib/pst/data/field-journal-data";
import { FieldJournalForm } from "./field-journal/FieldJournalForm";
import { FieldJournalEntryCard } from "./field-journal/FieldJournalEntryCard";

export type { FieldObservationCategory, FieldJournalEntry };
export { CATEGORY_META, DEFAULT_ENTRIES, STORAGE_KEY };

interface PstFieldJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PstFieldJournalModal: React.FC<PstFieldJournalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [entries, setEntries] = useState<FieldJournalEntry[]>(DEFAULT_ENTRIES);
  const [sentToMemoireId, setSentToMemoireId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEntries(parsed);
        }
      }
    } catch {
      // Ignore storage error
    }
  }, []);

  const saveEntries = (next: FieldJournalEntry[]) => {
    setEntries(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore quota
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAddEntry = (entry: FieldJournalEntry) => {
    saveEntries([entry, ...entries]);
  };

  const handleDelete = (id: string) => {
    triggerHaptic("error");
    playClickSound();
    saveEntries(entries.filter((e) => e.id !== id));
  };

  const handleInjectIntoMemoire = (entry: FieldJournalEntry) => {
    playClickSound();
    try {
      const memRaw = localStorage.getItem("pst_memoire_studio_v1");
      const memObj = memRaw ? JSON.parse(memRaw) : { sections: {} };
      const currentEmpirical = memObj.sections?.analyse_empirique || "";
      const formattedTrace = `\n\n[${entry.timestamp} · ${CATEGORY_META[entry.category].label} · ${entry.operatorCode}] :\n${entry.content}`;
      memObj.sections = {
        ...(memObj.sections || {}),
        analyse_empirique: (currentEmpirical + formattedTrace).trim(),
      };
      localStorage.setItem("pst_memoire_studio_v1", JSON.stringify(memObj));
      setSentToMemoireId(entry.id);
      triggerHaptic("success");
      playSuccessSound();
      setTimeout(() => setSentToMemoireId(null), 2000);
    } catch {
      // Ignore error
    }
  };

  const handleExportMarkdown = () => {
    triggerHaptic("success");
    playClickSound();
    const lines = [
      "# Chronique d'Activité & Journal d'Observation Clinique (CNAM PST)",
      `**Date d'export** : ${new Date().toLocaleDateString("fr-FR")}`,
      "**Statut déontologique** : Corpus intégralement anonymisé (Code de déontologie 2021, Art. 7 & 44)",
      "",
      ...entries.map(
        (e) =>
          `### [${e.timestamp}] ${CATEGORY_META[e.category].label} (${e.ue} · ${e.operatorCode})\n${e.content}\n`,
      ),
    ];
    const blob = new Blob([lines.join("\n")], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Chronique_Activite_Terrain_PST_${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
    playSuccessSound();
  };

  return (
    <div
      className="fixed inset-0 z-[130] flex items-end sm:items-center justify-center bg-slate-950/80 backdrop-blur-md p-0 sm:p-6 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pst-field-journal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-2xl border-t sm:border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center bg-slate-50/90 dark:bg-slate-900/70 shrink-0">
          <div className="w-10 h-1.5 rounded-full bg-slate-400/40" />
        </div>
        {/* Topbar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/70">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ClipboardList className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest px-1.5 sm:px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold truncate">
                  CHRONIQUE TERRAIN
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {entries.length} traces
                </span>
              </div>
              <h2
                id="pst-field-journal-title"
                className="text-xs sm:text-base font-bold text-slate-900 dark:text-white truncate"
              >
                Carnet d&apos;Observation Ergonomique
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={handleExportMarkdown}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exporter Chronique (.MD)</span>
              <span className="sm:hidden">.MD</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fermer le carnet de terrain"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Input Form with Voice Dictation */}
        <FieldJournalForm onAddEntry={handleAddEntry} />

        {/* Entries Timeline List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-white dark:bg-[#0B0F17]">
          {entries.map((entry) => (
            <FieldJournalEntryCard
              key={entry.id}
              entry={entry}
              isSent={sentToMemoireId === entry.id}
              onInjectIntoMemoire={handleInjectIntoMemoire}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PstFieldJournalModal;

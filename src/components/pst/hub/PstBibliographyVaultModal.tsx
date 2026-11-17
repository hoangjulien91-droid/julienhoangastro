import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  BookMarked,
  Search,
  Plus,
  Download,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  type BiblioReference,
  CORE_CNAM_REFERENCES,
} from "@/lib/pst/data/biblio-vault-data";
import {
  exportAllApa7,
  exportBibtex,
} from "@/lib/pst/data/biblio-vault-helpers";
import { BiblioAddRefForm } from "./biblio/BiblioAddRefForm";
import { BiblioRefCard } from "./biblio/BiblioRefCard";

export type { BiblioReference };

interface PstBibliographyVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = "pst_bibliography_vault_v1";

export const PstBibliographyVaultModal: React.FC<
  PstBibliographyVaultModalProps
> = ({ isOpen, onClose }) => {
  const [customRefs, setCustomRefs] = useState<BiblioReference[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUe, setSelectedUe] = useState<string>("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCustomRefs(parsed);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const saveCustomRefs = (next: BiblioReference[]) => {
    setCustomRefs(next);
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

  const allReferences = useMemo(() => {
    return [...customRefs, ...CORE_CNAM_REFERENCES];
  }, [customRefs]);

  const filteredReferences = useMemo(() => {
    return allReferences.filter((ref) => {
      const matchesUe = selectedUe === "ALL" || ref.ues.includes(selectedUe);
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesUe;
      const hay =
        `${ref.authors} ${ref.year} ${ref.title} ${ref.stream} ${ref.keyConcept} ${ref.examUsageTip}`.toLowerCase();
      return matchesUe && hay.includes(q);
    });
  }, [allReferences, selectedUe, searchQuery]);

  if (!isOpen) return null;

  const handleCopy = async (text: string, badgeId: string) => {
    playClickSound();
    try {
      await navigator.clipboard.writeText(text.replace(/\*/g, ""));
      setCopiedId(badgeId);
      triggerHaptic("success");
      playSuccessSound();
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Fallback
    }
  };

  const handleAddCustomRef = (data: {
    authors: string;
    year: string;
    title: string;
    publisher: string;
    stream: string;
    ue: string;
    concept: string;
  }) => {
    playClickSound();
    const firstSurname = data.authors.split(",")[0].trim();

    const customEntry: BiblioReference = {
      id: `custom-${Date.now()}`,
      authors: data.authors,
      year: data.year,
      title: data.title,
      publisherOrJournal: data.publisher || "Éditeur académique",
      apa7Full: `${data.authors} (${data.year}). *${data.title}*. ${data.publisher || "Éditeur académique"}.`,
      inTextCitation: `(${firstSurname}, ${data.year})`,
      stream: data.stream,
      ues: [data.ue],
      keyConcept: data.concept || "Concept personnel ajouté au corpus",
      examUsageTip:
        "Référence personnelle intégrée au coffre bibliographique local.",
      isCustom: true,
    };

    saveCustomRefs([customEntry, ...customRefs]);
    setShowAddForm(false);
    triggerHaptic("success");
    playSuccessSound();
  };

  const handleDeleteCustom = (id: string) => {
    triggerHaptic("error");
    playClickSound();
    saveCustomRefs(customRefs.filter((r) => r.id !== id));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="biblio-vault-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] sm:max-h-[90vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-3.5 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 sm:gap-3 bg-slate-50 dark:bg-slate-900/60">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="p-1.5 sm:p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shrink-0">
              <BookMarked className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h3
                id="biblio-vault-title"
                className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate"
              >
                Coffre Bibliographique APA 7e
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate hidden sm:block">
                Corpus officiel des enseignants CNAM &amp; Psychologie du Travail
                ({filteredReferences.length} réf.)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setShowAddForm(!showAddForm);
              }}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
            >
              <Plus className="size-3.5" />
              <span className="hidden sm:inline">Ajouter référence</span>
              <span className="sm:hidden">+ Réf</span>
            </button>

            <button
              type="button"
              onClick={() => exportAllApa7(filteredReferences, selectedUe)}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors cursor-pointer"
            >
              <Download className="size-3.5" />
              <span className="hidden sm:inline">Exporter APA 7 (.MD)</span>
              <span className="sm:hidden">APA 7</span>
            </button>

            <button
              type="button"
              onClick={() => exportBibtex(filteredReferences)}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white shadow-xs transition-colors cursor-pointer"
              title="Exporter au format BibTeX pour LaTeX, Zotero ou Overleaf"
            >
              <Download className="size-3.5" />
              <span>BibTeX</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
              aria-label="Fermer le coffre bibliographique"
            >
              <X className="size-4 sm:size-5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="px-3.5 sm:px-5 py-2.5 sm:py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
          <div className="relative flex-1 min-w-0">
            <Search className="size-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Rechercher un auteur, concept ou référence"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher auteur, concept..."
              className="w-full pl-8 sm:pl-9 pr-3 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap scrollbar-none pb-0.5">
            {["ALL", "106", "108", "120", "123", "124"].map((ue) => (
              <button
                key={ue}
                type="button"
                onClick={() => {
                  playClickSound();
                  setSelectedUe(ue);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedUe === ue
                    ? "bg-indigo-600 text-white shadow-2xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {ue === "ALL" ? "Toutes" : `PST${ue}`}
              </button>
            ))}
          </div>
        </div>

        {/* Add Custom Reference Drawer */}
        {showAddForm && <BiblioAddRefForm onAdd={handleAddCustomRef} />}

        {/* References Grid */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/50 dark:bg-[#070A10]">
          {filteredReferences.map((ref) => (
            <BiblioRefCard
              key={ref.id}
              refItem={ref}
              onCopy={handleCopy}
              copiedId={copiedId}
              onDeleteCustom={ref.isCustom ? handleDeleteCustom : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PstBibliographyVaultModal;

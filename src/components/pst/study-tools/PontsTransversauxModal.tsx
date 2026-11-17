"use client";

import { useState, useMemo } from "react";
import {
  X,
  GitFork,
  Brain,
  ShieldCheck,
} from "lucide-react";
import { PONTS, MODULE_LABELS, type Pont } from "@/lib/pst/data/ponts";
import {
  COURANTS_THEORIQUES,
  REGLES_OR_TRANSVERSALES,
  type CourantTheorique,
  type RegleOrTransversale,
} from "@/lib/pst/data/ponts-transversaux-data";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { PontsPasserellesTab } from "./ponts-transversaux/PontsPasserellesTab";
import { PontsCourantsTab } from "./ponts-transversaux/PontsCourantsTab";
import { PontsReglesTab } from "./ponts-transversaux/PontsReglesTab";

// Backward-compatible exports
export { COURANTS_THEORIQUES, REGLES_OR_TRANSVERSALES };
export type { CourantTheorique, RegleOrTransversale };

interface PontsTransversauxModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultConcept?: string;
}

export function PontsTransversauxModal({
  isOpen,
  onClose,
  defaultConcept,
}: PontsTransversauxModalProps) {
  const [activeTab, setActiveTab] = useState<"ponts" | "courants" | "regles">(
    "ponts",
  );
  const [searchQuery, setSearchQuery] = useState(defaultConcept || "");
  const [filterPair, setFilterPair] = useState<string>("all");
  const [selectedCourantId, setSelectedCourantId] = useState<string>(
    COURANTS_THEORIQUES[0].id,
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPonts = useMemo(() => {
    return PONTS.filter((p) => {
      // Filtre paire d'UE
      if (filterPair !== "all") {
        const [modA, modB] = filterPair.split("-");
        const hasA = Object.keys(p.m).includes(modA);
        const hasB = Object.keys(p.m).includes(modB);
        if (!hasA || !hasB) return false;
      }
      // Filtre recherche textuelle
      if (!searchQuery.trim()) return true;
      const q = searchQuery.trim().toLowerCase();
      if (p.c.toLowerCase().includes(q)) return true;
      return Object.values(p.m).some((v) => v.toLowerCase().includes(q));
    });
  }, [searchQuery, filterPair]);

  if (!isOpen) return null;

  function copyPont(p: Pont) {
    triggerHaptic("success");
    playSuccessSound();
    const text = `Passerelle transversale : ${p.c}\n\n${Object.entries(p.m)
      .map(
        ([mod, desc]) => `${MODULE_LABELS[mod] || mod.toUpperCase()} : ${desc}`,
      )
      .join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopiedId(p.c);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const activeCourant =
    COURANTS_THEORIQUES.find((c) => c.id === selectedCourantId) ||
    COURANTS_THEORIQUES[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* EN-TÊTE MODAL */}
        <div className="flex items-center justify-between p-3.5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 gap-2 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-11 rounded-2xl bg-gradient-to-tr from-amber-600 to-rose-600 flex items-center justify-center text-white shadow-md shrink-0">
              <GitFork className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 truncate">
                  Articulations &amp; Synergies
                </span>
                <span className="hidden sm:inline text-xs text-slate-500">
                  Transversalité RNCP 7
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-black tracking-tight text-slate-900 dark:text-slate-100 m-0 truncate">
                Ponts &amp; Passerelles Inter-PST
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            aria-label="Fermer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* ONGLETS PRINCIPAUX DE LA MODALE */}
        <div className="p-2.5 sm:p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap shrink-0">
          <button
            type="button"
            onClick={() => {
              triggerHaptic("selection");
              playClickSound();
              setActiveTab("ponts");
            }}
            className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
              activeTab === "ponts"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-xs"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <GitFork className="size-3.5 text-amber-500" />
              <span>
                17 Ponts<span className="hidden sm:inline"> Conceptuels</span> (
                {PONTS.length})
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              triggerHaptic("selection");
              playClickSound();
              setActiveTab("courants");
            }}
            className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
              activeTab === "courants"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-xs"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Brain className="size-3.5 text-rose-500" />
              <span>
                Matrice 7 Courants<span className="hidden sm:inline"> Théoriques</span>
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              triggerHaptic("selection");
              playClickSound();
              setActiveTab("regles");
            }}
            className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
              activeTab === "regles"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-xs"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-emerald-500" />
              <span>
                4 Règles d'Or<span className="hidden sm:inline"> pour l'Examen</span>
              </span>
            </span>
          </button>
        </div>

        {/* CORPS DE CONTENU */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {activeTab === "ponts" && (
            <PontsPasserellesTab
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterPair={filterPair}
              setFilterPair={setFilterPair}
              filteredPonts={filteredPonts}
              copyPont={copyPont}
              copiedId={copiedId}
            />
          )}

          {activeTab === "courants" && (
            <PontsCourantsTab
              courants={COURANTS_THEORIQUES}
              selectedCourantId={selectedCourantId}
              setSelectedCourantId={setSelectedCourantId}
              activeCourant={activeCourant}
            />
          )}

          {activeTab === "regles" && <PontsReglesTab />}
        </div>
      </div>
    </div>
  );
}

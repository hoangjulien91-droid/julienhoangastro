"use client";

import { useState, useEffect } from "react";
import {
  X,
  Quote,
  Sparkles,
  Search,
  Copy,
  Check,
  Brain,
  Eye,
  EyeOff,
  Volume2,
  Square,
} from "lucide-react";
import { CITATIONS_OR_S1, type CitationOrS1 } from "@/lib/pst/data/citations-or-s1";
import {
  playClickSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface FlashCitationsS1ModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModuleKey?: "pst106" | "pst108" | "pst123" | "all";
}

export function FlashCitationsS1Modal({
  isOpen,
  onClose,
  defaultModuleKey = "all",
}: FlashCitationsS1ModalProps) {
  const [selectedModule, setSelectedModule] = useState<"all" | "pst106" | "pst108" | "pst123">(
    defaultModuleKey,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMode, setActiveMode] = useState<"cards" | "cloze">("cards");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [revealedCloze, setRevealedCloze] = useState<Record<string, boolean>>({});

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isOpen) return null;

  const filteredCitations = CITATIONS_OR_S1.filter((c) => {
    if (selectedModule !== "all" && c.moduleKey !== selectedModule) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.citation.toLowerCase().includes(q) ||
        c.auteur.toLowerCase().includes(q) ||
        c.theme.toLowerCase().includes(q) ||
        c.source.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSpeakCitation = (c: CitationOrS1) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    playClickSound();
    triggerHaptic();

    if (speakingId === c.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const text = `${c.auteur}, ${c.annee}. Citation : ${c.citation}. Quand la placer sur la copie : ${c.interetExamen}. Formulation prête à copier : ${c.formulationCopie}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = 1.02;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(c.id);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyCitation = (c: CitationOrS1) => {
    navigator.clipboard.writeText(c.formulationCopie);
    setCopiedId(c.id);
    playClickSound();
    triggerHaptic();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleCloze = (id: string) => {
    playClickSound();
    triggerHaptic();
    setRevealedCloze((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Flash-Citations S1 — Citations Canoniques pour l'Écrit"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border border-slate-200/90 dark:border-amber-500/30 bg-white/95 dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-4 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/60 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-9 rounded-xl bg-amber-500/15 dark:bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <Quote className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 truncate">
                  Panthéon Citations S1
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium shrink-0 hidden xs:inline">
                  {CITATIONS_OR_S1.length} Canoniques
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                Flash-Citations · PST106 / PST108 / PST123
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="flex items-center bg-slate-200/80 dark:bg-slate-800/80 p-0.5 sm:p-1 rounded-lg border border-slate-300/80 dark:border-slate-700">
              <button
                onClick={() => {
                  setActiveMode("cards");
                  playClickSound();
                }}
                className={`px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  activeMode === "cards"
                    ? "bg-amber-600 text-white shadow"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                Fiches
              </button>
              <button
                onClick={() => {
                  setActiveMode("cloze");
                  playClickSound();
                }}
                className={`px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                  activeMode === "cloze"
                    ? "bg-purple-600 text-white shadow"
                    : "text-purple-700 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                }`}
              >
                <Brain className="size-3" />
                <span>À trous</span>
              </button>
            </div>

            <button
              onClick={() => {
                if ("speechSynthesis" in window) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-1.5 sm:p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors shrink-0"
              title="Fermer"
              aria-label="Fermer"
            >
              <X className="size-4 sm:size-5" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-3.5 sm:px-6 py-2.5 sm:py-3 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none pb-0.5">
            {(
              [
                { key: "all", label: "Toutes" },
                { key: "pst106", label: "PST106 · Activité" },
                { key: "pst108", label: "PST108 · Clinique" },
                { key: "pst123", label: "PST123 · Travail & emploi" },
              ] as const
            ).map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  setSelectedModule(f.key);
                  playClickSound();
                }}
                className={`px-2.5 sm:px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                  selectedModule === f.key
                    ? "bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40 font-bold"
                    : "bg-slate-200/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-transparent"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="size-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              aria-label="Rechercher une citation par auteur, thème ou mot-clé"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher auteur, thème, mot..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300/80 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCitations.map((c) => {
              const isRevealed = Boolean(revealedCloze[c.id]);

              // Masked citation helper
              let displayedCitation = c.citation;
              if (activeMode === "cloze" && !isRevealed) {
                c.motsClesMasques.forEach((m) => {
                  displayedCitation = displayedCitation.replace(
                    new RegExp(m, "gi"),
                    "[ ... ? ... ]",
                  );
                });
              }

              return (
                <div
                  key={c.id}
                  className={`rounded-2xl border p-5 transition-all flex flex-col justify-between space-y-4 shadow-md ${
                    c.moduleKey === "pst106"
                      ? "border-emerald-500/30 bg-gradient-to-br from-emerald-50/70 to-white dark:from-emerald-950/20 dark:to-slate-900/90"
                      : c.moduleKey === "pst108"
                      ? "border-amber-500/30 bg-gradient-to-br from-amber-50/70 to-white dark:from-amber-950/20 dark:to-slate-900/90"
                      : "border-indigo-500/30 bg-gradient-to-br from-indigo-50/70 to-white dark:from-indigo-950/20 dark:to-slate-900/90"
                  }`}
                >
                  <div className="space-y-3">
                    {/* Card Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                            c.moduleKey === "pst106"
                              ? "bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300"
                              : c.moduleKey === "pst108"
                              ? "bg-amber-500/15 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300"
                              : "bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300"
                          }`}
                        >
                          {c.moduleKey.toUpperCase()}
                        </span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {c.auteur} ({c.annee})
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleSpeakCitation(c)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            speakingId === c.id
                              ? "bg-amber-600 text-white shadow-sm"
                              : "bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                          }`}
                          title={
                            speakingId === c.id
                              ? "Arrêter la lecture"
                              : "Écouter la citation et son usage d'examen (Audio)"
                          }
                          aria-label={
                            speakingId === c.id
                              ? "Arrêter la lecture"
                              : "Écouter la citation"
                          }
                        >
                          {speakingId === c.id ? (
                            <Square className="h-3.5 w-3.5 fill-current" />
                          ) : (
                            <Volume2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopyCitation(c)}
                          className="p-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                          title="Copier la formulation pour l'examen"
                        >
                          {copiedId === c.id ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 italic">
                      Source : {c.source} · Thème : <strong className="text-slate-700 dark:text-slate-300">{c.theme}</strong>
                    </div>

                    {/* Verbatim Quote */}
                    <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 relative">
                      <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 italic leading-relaxed">
                        « {displayedCitation} »
                      </p>

                      {activeMode === "cloze" && (
                        <div className="mt-2 pt-2 border-t border-slate-200/80 dark:border-slate-800 flex justify-end">
                          <button
                            onClick={() => toggleCloze(c.id)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-200 cursor-pointer"
                          >
                            {isRevealed ? (
                              <>
                                <EyeOff className="h-3.5 w-3.5" />
                                <span>Masquer les mots clés</span>
                              </>
                            ) : (
                              <>
                                <Eye className="h-3.5 w-3.5" />
                                <span>Révéler les termes exacts</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* How to insert in exam */}
                    <div className="space-y-1 text-xs">
                      <div className="text-slate-800 dark:text-slate-300 font-semibold flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                        <span>Quand la placer sur la copie :</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-snug">{c.interetExamen}</p>
                    </div>

                    {/* Traps */}
                    <div className="text-xs text-rose-800 dark:text-rose-300/90 bg-rose-50/80 dark:bg-rose-950/20 p-2.5 rounded-lg border border-rose-200/80 dark:border-rose-900/30">
                      <strong className="block text-rose-900 dark:text-rose-200 text-[10px] uppercase">
                        Piège éliminatoire à éviter :
                      </strong>
                      {c.piegeContresens}
                    </div>
                  </div>

                  {/* Ready to write formula */}
                  <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                      Exemple de formulation prête à copier :
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50/90 dark:bg-slate-950/40 p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800/60">
                      {c.formulationCopie}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

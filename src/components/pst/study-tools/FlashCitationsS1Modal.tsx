"use client";

import { useState, useMemo } from "react";
import {
  X,
  Quote,
  Sparkles,
  Search,
  BookOpen,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Brain,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { CITATIONS_OR_S1, type CitationOrS1 } from "@/lib/pst/data/citations-or-s1";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { createSpeechUtterance } from "@/lib/pst/speech-service";

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
  const [selectedCitationId, setSelectedCitationId] = useState<string>(CITATIONS_OR_S1[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [revealedCloze, setRevealedCloze] = useState<Record<string, boolean>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);

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

  const currentCitation =
    CITATIONS_OR_S1.find((c) => c.id === selectedCitationId) ?? filteredCitations[0] ?? CITATIONS_OR_S1[0];

  const handleCopyCitation = (c: CitationOrS1) => {
    navigator.clipboard.writeText(c.formulationCopie);
    setCopiedId(c.id);
    playClickSound();
    triggerHaptic();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = createSpeechUtterance(text, {
      rate: 0.94,
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
    if (utterance) {
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleCloze = (id: string) => {
    playClickSound();
    triggerHaptic();
    setRevealedCloze((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border border-amber-500/30 bg-slate-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Quote className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Le Panthéon des Citations S1
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                  {CITATIONS_OR_S1.length} Verbatims Canoniques
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Flash-Citations Incontournables · PST106 / PST108 / PST123
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center bg-slate-800/80 p-1 rounded-lg border border-slate-700">
              <button
                onClick={() => {
                  setActiveMode("cards");
                  playClickSound();
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  activeMode === "cards"
                    ? "bg-amber-600 text-white shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Fiches Citations
              </button>
              <button
                onClick={() => {
                  setActiveMode("cloze");
                  playClickSound();
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                  activeMode === "cloze"
                    ? "bg-purple-600 text-white shadow"
                    : "text-purple-400 hover:text-purple-300"
                }`}
              >
                <Brain className="h-3 w-3" />
                <span>Mode Texte à Trous</span>
              </button>
            </div>

            <button
              onClick={() => {
                if ("speechSynthesis" in window) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {(
              [
                { key: "all", label: "Toutes les UEs" },
                { key: "pst106", label: "PST106 (Ergo/Activité)" },
                { key: "pst108", label: "PST108 (Clinique Sociale)" },
                { key: "pst123", label: "PST123 (Identités)" },
              ] as const
            ).map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  setSelectedModule(f.key);
                  playClickSound();
                }}
                className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedModule === f.key
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                    : "bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher auteur, thème, mot..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCitations.map((c) => {
              const isSelected = c.id === currentCitation.id;
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
                      ? "border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 to-slate-900/90"
                      : c.moduleKey === "pst108"
                      ? "border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-slate-900/90"
                      : "border-indigo-500/30 bg-gradient-to-br from-indigo-950/20 to-slate-900/90"
                  }`}
                >
                  <div className="space-y-3">
                    {/* Card Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                            c.moduleKey === "pst106"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : c.moduleKey === "pst108"
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-indigo-500/20 text-indigo-300"
                          }`}
                        >
                          {c.moduleKey.toUpperCase()}
                        </span>
                        <span className="text-xs font-bold text-white">
                          {c.auteur} ({c.annee})
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleSpeak(`${c.auteur}, en ${c.annee} : ${c.citation}`)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="Écouter la citation"
                        >
                          {isSpeaking ? (
                            <VolumeX className="h-3.5 w-3.5 text-amber-400" />
                          ) : (
                            <Volume2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleCopyCitation(c)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="Copier la formulation pour l'examen"
                        >
                          {copiedId === c.id ? (
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="text-[11px] font-medium text-slate-400 italic">
                      Source : {c.source} · Thème : <strong className="text-slate-300">{c.theme}</strong>
                    </div>

                    {/* Verbatim Quote */}
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 relative">
                      <p className="text-xs sm:text-sm font-medium text-slate-100 italic leading-relaxed">
                        « {displayedCitation} »
                      </p>

                      {activeMode === "cloze" && (
                        <div className="mt-2 pt-2 border-t border-slate-800 flex justify-end">
                          <button
                            onClick={() => toggleCloze(c.id)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-300 hover:text-purple-200"
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
                      <div className="text-slate-300 font-semibold flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                        <span>Quand la placer sur la copie :</span>
                      </div>
                      <p className="text-slate-400 leading-snug">{c.interetExamen}</p>
                    </div>

                    {/* Traps */}
                    <div className="text-xs text-rose-300/90 bg-rose-950/20 p-2.5 rounded-lg border border-rose-900/30">
                      <strong className="block text-rose-200 text-[10px] uppercase">
                        Piège éliminatoire à éviter :
                      </strong>
                      {c.piegeContresens}
                    </div>
                  </div>

                  {/* Ready to write formula */}
                  <div className="pt-3 border-t border-slate-800/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Exemple de formulation prête à copier :
                    </span>
                    <p className="text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
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

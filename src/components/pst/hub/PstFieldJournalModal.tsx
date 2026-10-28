import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Mic,
  MicOff,
  Clock,
  Plus,
  Trash2,
  Download,
  Send,
  Check,
  ClipboardList,
  MessageSquareQuote,
  Wrench,
  Scale,
  Sparkles,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface PstFieldJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type FieldObservationCategory =
  | "observable_ergo"
  | "verbatim_operateur"
  | "catachrese_outil"
  | "dilemme_metier"
  | "note_reflexive";

export interface FieldJournalEntry {
  id: string;
  timestamp: string;
  ue: string;
  category: FieldObservationCategory;
  operatorCode: string;
  content: string;
}

const CATEGORY_META: Record<
  FieldObservationCategory,
  { label: string; badgeClass: string }
> = {
  observable_ergo: {
    label: "Observable Ergonomique (Activité réelle)",
    badgeClass:
      "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
  },
  verbatim_operateur: {
    label: "Verbatim Opérateur (Anonymisé)",
    badgeClass:
      "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
  catachrese_outil: {
    label: "Catachrèse / Détournement d'Outil",
    badgeClass:
      "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  dilemme_metier: {
    label: "Controverse / Dilemme de Métier",
    badgeClass:
      "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
  },
  note_reflexive: {
    label: "Note Réflexive & Déontologique",
    badgeClass:
      "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
  },
};

const DEFAULT_ENTRIES: FieldJournalEntry[] = [
  {
    id: "fj-1",
    timestamp: "09:14:20",
    ue: "PST106",
    category: "observable_ergo",
    operatorCode: "OP-01 (Ancienneté 12 ans)",
    content:
      "Lors de la relève du matin, l'opérateur interrompt 4 fois la saisie sur le terminal mobile pour répondre aux sollicitations urgentes d'un binôme novice. Écart manifeste entre le temps prescrit de contrôle (3 min) et la co-activité réelle de régulation (9 min).",
  },
  {
    id: "fj-2",
    timestamp: "09:42:10",
    ue: "PST120",
    category: "verbatim_operateur",
    operatorCode: "OP-01 & OP-03 (Autoconfrontation croisée)",
    content:
      "« Si je suis la procédure écran à la lettre, je bloque toute la chaîne derrière moi. Du coup on s'appelle directement à la voix, mais ça n'apparaît nulle part dans les statistiques de la direction. »",
  },
  {
    id: "fj-3",
    timestamp: "10:15:05",
    ue: "PST124",
    category: "catachrese_outil",
    operatorCode: "OP-02 (Planificateur)",
    content:
      "Détournement d'usage (catachrèse au sens de Rabardel, 1995) : utilisation du champ 'Commentaire libre livraison' de l'ERP pour coder entre collègues l'état réel de fatigue ou d'encombrement du poste aval.",
  },
];

const STORAGE_KEY = "pst_field_journal_v1";

export const PstFieldJournalModal: React.FC<PstFieldJournalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [entries, setEntries] = useState<FieldJournalEntry[]>(DEFAULT_ENTRIES);
  const [category, setCategory] =
    useState<FieldObservationCategory>("observable_ergo");
  const [ue, setUe] = useState("PST106");
  const [operatorCode, setOperatorCode] = useState("OP-01 (Anonymisé)");
  const [content, setContent] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [sentToMemoireId, setSentToMemoireId] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

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

  const toggleVoiceDictation = () => {
    triggerHaptic("selection");
    playClickSound();
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "La dictée vocale Web Speech API n'est pas prise en charge par ce navigateur (utilisez Chrome, Edge ou Safari).",
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      if (transcript) {
        setContent((prev) => (prev ? `${prev} ${transcript}` : transcript));
        playSuccessSound();
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    playClickSound();
    const now = new Date();
    const hhmmss = now.toTimeString().slice(0, 8);
    const newEntry: FieldJournalEntry = {
      id: `fj-${Date.now()}`,
      timestamp: hhmmss,
      ue,
      category,
      operatorCode: operatorCode.trim() || "OP-X (Anonymisé)",
      content: content.trim(),
    };
    saveEntries([newEntry, ...entries]);
    setContent("");
    triggerHaptic("success");
    playSuccessSound();
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
                Carnet d'Observation Ergonomique
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={handleExportMarkdown}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exporter Chronique (.MD)</span>
              <span className="sm:hidden">.MD</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              aria-label="Fermer le carnet de terrain"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Input Form with Voice Dictation */}
        <form
          onSubmit={handleAddEntry}
          className="p-3.5 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-2.5 sm:space-y-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
                Nature de la trace clinique
              </label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as FieldObservationCategory)
                }
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
              >
                <option value="observable_ergo">
                  Observable Ergonomique (Activité réelle)
                </option>
                <option value="verbatim_operateur">
                  Verbatim Opérateur (Autoconfrontation)
                </option>
                <option value="catachrese_outil">
                  Catachrèse / Détournement d'Artefact
                </option>
                <option value="dilemme_metier">
                  Controverse / Dilemme de Métier
                </option>
                <option value="note_reflexive">
                  Note Réflexive &amp; Déontologique
                </option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
                Code Opérateur / Situation (Anonymisé)
              </label>
              <input
                type="text"
                value={operatorCode}
                onChange={(e) => setOperatorCode(e.target.value)}
                placeholder="Ex: OP-04 (Relève matin)"
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
                UE de rattachement
              </label>
              <select
                value={ue}
                onChange={(e) => setUe(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
              >
                <option value="PST106">PST106</option>
                <option value="PST108">PST108</option>
                <option value="PST120">PST120</option>
                <option value="PST123">PST123</option>
                <option value="PST124">PST124</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <textarea
              rows={2}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Saisissez ou dictez votre observation située, séquence d'activité ou verbatim anonymisé..."
              className="flex-1 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />

            <div className="flex sm:flex-col gap-2 shrink-0">
              <button
                type="button"
                onClick={toggleVoiceDictation}
                className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  isListening
                    ? "bg-rose-600 text-white border-rose-500 animate-pulse"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-indigo-500"
                }`}
                title="Dictée vocale temps réel (Web Speech API)"
              >
                {isListening ? (
                  <>
                    <MicOff className="w-3.5 h-3.5" />
                    <span>Arrêter</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5 text-rose-500" />
                    <span>Dicter</span>
                  </>
                )}
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Horodater</span>
              </button>
            </div>
          </div>
        </form>

        {/* Entries Timeline List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-white dark:bg-[#0B0F17]">
          {entries.map((entry) => {
            const cMeta = CATEGORY_META[entry.category];
            const isSent = sentToMemoireId === entry.id;
            return (
              <div
                key={entry.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/80 flex flex-col gap-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300 bg-slate-200/70 dark:bg-slate-800 px-2 py-0.5 rounded">
                      <Clock className="w-3 h-3 text-emerald-500" />
                      {entry.timestamp}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${cMeta.badgeClass}`}
                    >
                      {cMeta.label}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-slate-500">
                      {entry.ue} · {entry.operatorCode}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleInjectIntoMemoire(entry)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 transition-colors"
                      title="Envoyer directement cette trace dans la Partie IV du Studio Mémoire RNCP 7"
                    >
                      {isSent ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span>Injecté !</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3 h-3" />
                          <span className="hidden sm:inline">Injecter au Studio Mémoire</span>
                          <span className="sm:hidden">Mémoire</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(entry.id)}
                      className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Supprimer cette trace"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed m-0">
                  {entry.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default PstFieldJournalModal;

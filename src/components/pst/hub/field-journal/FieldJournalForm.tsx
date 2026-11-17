"use client";

import React, { useState, useRef } from "react";
import { Mic, MicOff, Plus } from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  type FieldObservationCategory,
  type FieldJournalEntry,
} from "@/lib/pst/data/field-journal-data";

interface FieldJournalFormProps {
  onAddEntry: (entry: FieldJournalEntry) => void;
}

export const FieldJournalForm: React.FC<FieldJournalFormProps> = ({
  onAddEntry,
}) => {
  const [category, setCategory] =
    useState<FieldObservationCategory>("observable_ergo");
  const [ue, setUe] = useState("PST106");
  const [operatorCode, setOperatorCode] = useState("OP-01 (Anonymisé)");
  const [content, setContent] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
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
    onAddEntry(newEntry);
    setContent("");
    triggerHaptic("success");
    playSuccessSound();
  };

  return (
    <form
      onSubmit={handleSubmit}
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
              Catachrèse / Détournement d&apos;Artefact
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
            aria-label="Code Opérateur ou Situation (Anonymisé)"
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
  );
};

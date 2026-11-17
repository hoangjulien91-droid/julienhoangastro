"use client";

import { useState } from "react";
import { X, Mic } from "lucide-react";
import {
  SUJETS_ORAL_FLASH,
  type SujetOralFlash,
} from "@/lib/pst/data/sujets-oral-flash";
import { useDictaphoneOral } from "./dictaphone/useDictaphoneOral";
import { DictaphoneControlsBar } from "./dictaphone/DictaphoneControlsBar";
import { DictaphoneAnalysisView } from "./dictaphone/DictaphoneAnalysisView";

// Re-exports for backward compatibility
export {
  SUJETS_ORAL_FLASH,
  TICS_LANGAGE_ORAL,
  type SujetOralFlash,
} from "@/lib/pst/data/sujets-oral-flash";

interface DictaphoneOralModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModuleKey?: "pst106" | "pst108" | "pst123" | "pst120" | "pst124";
}

export function DictaphoneOralModal({
  isOpen,
  onClose,
  defaultModuleKey = "pst106",
}: DictaphoneOralModalProps) {
  const [selectedSujetId, setSelectedSujetId] = useState<string>(
    () =>
      SUJETS_ORAL_FLASH.find((s) => s.moduleKey === defaultModuleKey)?.id ??
      SUJETS_ORAL_FLASH[0].id,
  );

  const currentSujet =
    SUJETS_ORAL_FLASH.find((s) => s.id === selectedSujetId) ??
    SUJETS_ORAL_FLASH[0];

  const {
    isRecording,
    timeRemaining,
    transcript,
    setTranscript,
    isSpeechSupported,
    handleStartRecording,
    handleStopRecording,
    handleReset,
    handleSelectSujet,
    detectedKeywords,
    countDetected,
    scorePercent,
    totalWords,
    motsParMinute,
    ticsDetectes,
    totalTics,
  } = useDictaphoneOral(currentSujet, (s) => setSelectedSujetId(s.id));

  if (!isOpen) return null;

  const formatTimer = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-slate-950/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Flash-Oral 2 Min — Dictaphone d'Examen"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-slate-200/90 dark:border-indigo-500/30 bg-white/95 dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-4 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/70 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-9 rounded-xl bg-purple-500/15 dark:bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
              <Mic className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 truncate">
                  Flash-Oral 2 Min
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium shrink-0 hidden xs:inline">
                  Reconnaissance Vocale
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                Dictaphone Vocal d&apos;Auto-Évaluation
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              handleStopRecording();
              onClose();
            }}
            className="p-1.5 sm:p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors shrink-0"
            title="Fermer"
            aria-label="Fermer"
          >
            <X className="size-4 sm:size-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6">
          {/* Sujet selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Choisissez une question d&apos;oral type :
            </span>
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto whitespace-nowrap scrollbar-none pb-1">
              {SUJETS_ORAL_FLASH.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectSujet(s)}
                  className={`whitespace-nowrap px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all shrink-0 cursor-pointer ${
                    s.id === selectedSujetId
                      ? "bg-purple-600 border-purple-400 text-white shadow"
                      : "bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {s.moduleKey.toUpperCase()} · {s.titre.split(" (")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Current question card */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-500/15 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300">
              Consigne de restitution orale
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
              {currentSujet.question}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
              Temps imparti : <b>{formatTimer(currentSujet.dureeConseilleeSec)}</b>{" "}
              · Énoncez la réponse à voix haute au micro.
            </p>
          </div>

          {/* Recording & Timer Bar */}
          <DictaphoneControlsBar
            timeRemaining={timeRemaining}
            isRecording={isRecording}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            onReset={handleReset}
            motsParMinute={motsParMinute}
            scorePercent={scorePercent}
            countDetected={countDetected}
            totalKeywords={currentSujet.motsClesObligatoires.length}
            formatTimer={formatTimer}
          />

          {/* Analysis View (Tics, Keywords, Transcript, Ideal Answer) */}
          <DictaphoneAnalysisView
            totalWords={totalWords}
            totalTics={totalTics}
            ticsDetectes={ticsDetectes}
            detectedKeywords={detectedKeywords}
            transcript={transcript}
            onTranscriptChange={setTranscript}
            isSpeechSupported={isSpeechSupported}
            reponseIdealeSynthese={currentSujet.reponseIdealeSynthese}
          />
        </div>
      </div>
    </div>
  );
}

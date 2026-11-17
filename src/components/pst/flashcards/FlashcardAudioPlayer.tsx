"use client";

import type { Flashcard } from "@/lib/pst/types";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  X,
  Sparkles,
  CheckCircle2,
  Clock,
  Gauge,
} from "lucide-react";
import { useFlashcardAudio } from "./useFlashcardAudio";

export interface FlashcardAudioPlayerProps {
  card: Flashcard;
  cardIndex: number;
  totalCards: number;
  onNext: () => void;
  onPrev: () => void;
  onGrade: (result: "ko" | "mid" | "ok") => void;
  onClose: () => void;
}

export function FlashcardAudioPlayer({
  card,
  cardIndex,
  totalCards,
  onNext,
  onPrev,
  onGrade,
  onClose,
}: FlashcardAudioPlayerProps) {
  const {
    isPlaying,
    speechRate,
    setSpeechRate,
    thinkTimeSeconds,
    setThinkTimeSeconds,
    phase,
    countdown,
    isSupported,
    cancelSpeech,
    togglePlayPause,
  } = useFlashcardAudio({
    card,
    cardIndex,
    totalCards,
    onNext,
  });

  if (!isSupported) {
    return (
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200">
        La synthèse vocale n&apos;est pas disponible sur votre navigateur.
      </div>
    );
  }

  return (
    <div className="my-3 p-4 sm:p-5 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400">
            <Volume2 className="size-4 animate-pulse" />
          </span>
          <div>
            <div className="font-bold text-xs sm:text-sm flex items-center gap-2">
              <span>Mode Mains-Libres &middot; Révision Audio</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                Actif
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Carte {cardIndex + 1} / {totalCards} &middot; Révise les yeux fermés
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            cancelSpeech();
            onClose();
          }}
          className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title="Fermer le lecteur audio"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Live Phase Visual Banner */}
      <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
            {phase === "question" && (
              <>
                <Volume2 className="size-3.5 text-amber-400 animate-pulse" />
                <span className="text-amber-300">1. Écoute de la Question...</span>
              </>
            )}
            {phase === "thinking" && (
              <>
                <Clock className="size-3.5 text-sky-400 animate-spin" />
                <span className="text-sky-300">2. Réflexion active de mémoire...</span>
              </>
            )}
            {phase === "answer" && (
              <>
                <CheckCircle2 className="size-3.5 text-emerald-400 animate-pulse" />
                <span className="text-emerald-300">3. Réponse doctrinale & approfondissement</span>
              </>
            )}
            {phase === "transition" && (
              <>
                <Sparkles className="size-3.5 text-amber-400" />
                <span className="text-amber-300">4. Prochaine carte...</span>
              </>
            )}
          </span>

          {phase === "thinking" && (
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500 text-white font-mono font-black text-xs">
              {countdown}s
            </span>
          )}
        </div>

        <div className="text-xs sm:text-sm text-slate-200 line-clamp-2 italic font-serif">
          « {card.q} »
        </div>
      </div>

      {/* Player Navigation & Action Controls */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {/* Navigation & Play/Pause */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onPrev();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Carte précédente"
          >
            <SkipBack className="size-4" />
          </button>

          <button
            type="button"
            onClick={togglePlayPause}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
              isPlaying
                ? "bg-amber-500 hover:bg-amber-400 text-slate-950"
                : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="size-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="size-3.5" />
                <span>Reprendre</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              onNext();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Carte suivante"
          >
            <SkipForward className="size-4" />
          </button>
        </div>

        {/* Speed & Pause Duration Settings */}
        <div className="flex items-center gap-2">
          {/* Pause duration */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-[11px] font-mono">
            <Clock className="size-3 text-slate-400 ml-1" />
            {[3, 5, 8].map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => setThinkTimeSeconds(sec)}
                className={`px-1.5 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  thinkTimeSeconds === sec
                    ? "bg-sky-500 text-white font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                title={`Temps de réflexion : ${sec} secondes`}
              >
                {sec}s
              </button>
            ))}
          </div>

          {/* Speech Rate */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-[11px] font-mono">
            <Gauge className="size-3 text-slate-400 ml-1" />
            {[1, 1.25, 1.5].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => setSpeechRate(rate)}
                className={`px-1.5 py-0.5 rounded-lg transition-colors cursor-pointer ${
                  speechRate === rate
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                title={`Vitesse de lecture : ${rate}x`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Grading Buttons during audio playback */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
        <span className="text-[11px] text-slate-400">Noter la carte en direct :</span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onGrade("ko");
            }}
            className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-[11px] font-bold cursor-pointer"
          >
            ← À revoir
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onGrade("mid");
            }}
            className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold cursor-pointer"
          >
            Moyen
          </button>
          <button
            type="button"
            onClick={() => {
              playSuccessSound();
              onGrade("ok");
            }}
            className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold cursor-pointer"
          >
            Su ✓ →
          </button>
        </div>
      </div>
    </div>
  );
}

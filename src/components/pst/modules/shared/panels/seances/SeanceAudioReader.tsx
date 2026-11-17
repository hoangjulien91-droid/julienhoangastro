"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  FastForward,
  Sparkles,
  X,
  CheckCircle2,
} from "lucide-react";
import type { EssentielCoursCard } from "@/lib/pst/data/essentiel-cours";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface SeanceAudioReaderProps {
  essentiel: EssentielCoursCard | null;
  titreSeance: string;
  enseignant: string;
  onClose?: () => void;
}

interface AudioSection {
  title: string;
  text: string;
}

export function SeanceAudioReader({
  essentiel,
  titreSeance,
  enseignant,
  onClose,
}: SeanceAudioReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [rate, setRate] = useState<number>(1);
  const [isSupported, setIsSupported] = useState(true);

  // Index ref for callbacks
  const currentIdxRef = useRef(0);
  currentIdxRef.current = currentIdx;

  const sections: AudioSection[] = React.useMemo(() => {
    if (!essentiel) {
      return [
        {
          title: "Introduction",
          text: `${titreSeance}, dispensé par ${enseignant}.`,
        },
      ];
    }

    const items: AudioSection[] = [
      {
        title: "Introduction & Titre",
        text: `${essentiel.titre}, dispensé par ${enseignant}.`,
      },
      {
        title: "Fil Conducteur & Thèse",
        text: `Thèse centrale du cours : ${essentiel.filConducteur}`,
      },
      {
        title: "Ce qu'il faut savoir",
        text: `Points fondamentaux du cours : ${essentiel.ceQuIlFautSavoir.join(". ")}`,
      },
      {
        title: "Formules pour l'Examen",
        text: `Points clés pour la copie d'examen : ${essentiel.ceQuIlFautRetenir.join(". ")}`,
      },
      {
        title: "Auteurs Clés",
        text: `Auteurs mobilisés : ${essentiel.auteursCles
          .map((a) => `${a.nom} : ${a.apport}`)
          .join(". ")}`,
      },
      {
        title: "Concepts Incontournables",
        text: `Concepts clés : ${essentiel.conceptsCles
          .map((c) => `${c.terme} : ${c.definitionCourte}`)
          .join(". ")}`,
      },
      {
        title: "Piège d'Examen",
        text: `Piège d'examen et contre-sens sanctionné : ${essentiel.piegeExamen}`,
      },
    ];

    return items;
  }, [essentiel, titreSeance, enseignant]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsSupported(false);
    }
  }, []);

  // Cleanup on unmount or when seance changes
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [essentiel?.id]);

  function speakSection(index: number, speed = rate) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    if (index >= sections.length) {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentIdx(0);
      return;
    }

    const section = sections[index];
    const utterance = new SpeechSynthesisUtterance(section.text);
    utterance.lang = "fr-FR";
    utterance.rate = speed;

    // Pick best French voice if available
    const voices = window.speechSynthesis.getVoices();
    const frVoice =
      voices.find(
        (v) =>
          v.lang.startsWith("fr") &&
          (v.name.includes("Thomas") ||
            v.name.includes("Audrey") ||
            v.name.includes("Natural") ||
            v.name.includes("Siri") ||
            v.name.includes("Google")),
      ) || voices.find((v) => v.lang.startsWith("fr"));

    if (frVoice) {
      utterance.voice = frVoice;
    }

    utterance.onend = () => {
      const nextIdx = index + 1;
      if (nextIdx < sections.length) {
        setCurrentIdx(nextIdx);
        speakSection(nextIdx, speed);
      } else {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentIdx(0);
      }
    };

    utterance.onerror = (e) => {
      if (e.error !== "canceled" && e.error !== "interrupted") {
        setIsPlaying(false);
        setIsPaused(false);
      }
    };

    setCurrentIdx(index);
    setIsPlaying(true);
    setIsPaused(false);
    window.speechSynthesis.speak(utterance);
  }

  function handlePlay() {
    playClickSound();
    triggerHaptic("light");
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      speakSection(currentIdx, rate);
    }
  }

  function handlePause() {
    playClickSound();
    triggerHaptic("light");
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  }

  function handleStop() {
    playClickSound();
    triggerHaptic("light");
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentIdx(0);
  }

  function handleSpeedChange() {
    playClickSound();
    triggerHaptic("light");
    const speeds = [1, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(rate) + 1) % speeds.length;
    const newRate = speeds[nextIdx];
    setRate(newRate);

    if (isPlaying) {
      speakSection(currentIdx, newRate);
    }
  }

  if (!isSupported) {
    return (
      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <VolumeX className="size-4 shrink-0" />
          <span>La synthèse vocale n&apos;est pas supportée par ce navigateur.</span>
        </span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-amber-600 hover:text-amber-900 cursor-pointer"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
    );
  }

  const currentSection = sections[currentIdx] ?? sections[0];
  const progressPercent = Math.round(((currentIdx + (isPlaying ? 0.5 : 0)) / sections.length) * 100);

  return (
    <div
      role="region"
      aria-label="Lecteur audio de la fiche L'Essentiel"
      className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/[0.08] via-card to-indigo-500/[0.06] border border-amber-500/30 shadow-xs space-y-2.5 animate-in fade-in"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="size-7 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
            <Volume2 className="size-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                Audio Podcast · L&apos;Essentiel
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">
                Étape {currentIdx + 1} / {sections.length}
              </span>
            </div>
            <p className="text-xs font-semibold text-foreground truncate mt-0.5 m-0">
              {currentSection.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Speed Toggle */}
          <button
            type="button"
            onClick={handleSpeedChange}
            aria-label={`Vitesse de lecture : ${rate}x`}
            className="px-2 py-1 rounded-lg bg-card hover:bg-muted text-[11px] font-mono font-bold text-foreground border border-border/70 transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Modifier la vitesse de lecture"
          >
            {rate}x
          </button>

          {/* Play / Pause */}
          {isPlaying ? (
            <button
              type="button"
              onClick={handlePause}
              aria-label="Mettre en pause l'audio"
              className="size-8 rounded-xl bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Pause className="size-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePlay}
              aria-label="Lancer la lecture audio de l'Essentiel"
              className="size-8 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Play className="size-4 ml-0.5" />
            </button>
          )}

          {/* Stop */}
          {(isPlaying || isPaused || currentIdx > 0) && (
            <button
              type="button"
              onClick={handleStop}
              aria-label="Arrêter la lecture audio"
              className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              title="Arrêter"
            >
              <Square className="size-3.5" />
            </button>
          )}

          {/* Close */}
          {onClose && (
            <button
              type="button"
              onClick={() => {
                handleStop();
                onClose();
              }}
              aria-label="Fermer le lecteur audio"
              className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground transition-colors cursor-pointer ml-1"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted/60 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-amber-500 to-indigo-600 h-full transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(5, progressPercent))}%` }}
        />
      </div>
    </div>
  );
}

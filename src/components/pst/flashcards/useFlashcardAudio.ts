"use client";

import { useEffect, useRef, useState } from "react";
import type { Flashcard } from "@/lib/pst/types";
import { stripHtml } from "@/lib/pst/data/flashcards-helpers";
import { playClickSound, playFlipSound } from "@/lib/pst/audio-feedback";

interface UseFlashcardAudioOptions {
  card: Flashcard;
  cardIndex: number;
  totalCards: number;
  onNext: () => void;
}

export type AudioPhase = "question" | "thinking" | "answer" | "transition";

export function useFlashcardAudio({
  card,
  cardIndex,
  totalCards,
  onNext,
}: UseFlashcardAudioOptions) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speechRate, setSpeechRate] = useState<number>(1.25);
  const [thinkTimeSeconds, setThinkTimeSeconds] = useState<number>(4);
  const [phase, setPhase] = useState<AudioPhase>("question");
  const [countdown, setCountdown] = useState<number>(4);
  const [isSupported, setIsSupported] = useState(true);

  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const speechRateRef = useRef(speechRate);
  speechRateRef.current = speechRate;

  const thinkTimeRef = useRef(thinkTimeSeconds);
  thinkTimeRef.current = thinkTimeSeconds;

  // Check speech synthesis support
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsSupported(false);
    }
  }, []);

  // Helper to pick best French voice
  function getFrenchVoice(): SpeechSynthesisVoice | null {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find(
        (v) =>
          v.lang.startsWith("fr") &&
          (v.name.includes("Natural") ||
            v.name.includes("Google") ||
            v.name.includes("Thomas") ||
            v.name.includes("Audrey") ||
            v.name.includes("Amelie")),
      ) ||
      voices.find((v) => v.lang.startsWith("fr")) ||
      null
    );
  }

  // Cancel any ongoing speech
  function cancelSpeech() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
  }

  // Speak a text segment and trigger callback on completion
  function speak(text: string, onEnd: () => void) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      onEnd();
      return;
    }

    cancelSpeech();

    const cleanText = stripHtml(text)
      .replace(/•/g, "")
      .replace(/\s+/g, " ")
      .trim();

    if (!cleanText) {
      onEnd();
      return;
    }

    const utter = new SpeechSynthesisUtterance(cleanText);
    utter.rate = speechRateRef.current;
    utter.lang = "fr-FR";
    const voice = getFrenchVoice();
    if (voice) utter.voice = voice;

    utter.onend = () => {
      if (isPlayingRef.current) {
        onEnd();
      }
    };

    utter.onerror = (e) => {
      // If cancelled or interrupted intentionally, do nothing
      if (e.error === "canceled" || e.error === "interrupted") return;
      if (isPlayingRef.current) onEnd();
    };

    activeUtteranceRef.current = utter;
    window.speechSynthesis.speak(utter);
  }

  // Sequence runner for the active card
  useEffect(() => {
    if (!isPlaying) {
      cancelSpeech();
      return;
    }

    // Step 1: Speak question
    setPhase("question");
    const qIntro = `Question ${cardIndex + 1} sur ${totalCards}. ${card.tag ? card.tag + "." : ""} ${card.q}`;

    speak(qIntro, () => {
      // Step 2: Thinking countdown
      setPhase("thinking");
      let remaining = thinkTimeRef.current;
      setCountdown(remaining);

      countdownTimerRef.current = setInterval(() => {
        remaining -= 1;
        setCountdown(remaining);

        if (remaining <= 0) {
          if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
          countdownTimerRef.current = null;

          // Step 3: Speak Answer
          setPhase("answer");
          const ansText = `Réponse doctrinale : ${card.a}. ${card.deep ? "Approfondissement : " + card.deep : ""}`;

          speak(ansText, () => {
            // Step 4: Short pause before next card
            setPhase("transition");
            setTimeout(() => {
              if (isPlayingRef.current) {
                playFlipSound();
                onNext();
              }
            }, 1200);
          });
        }
      }, 1000);
    });

    return () => {
      cancelSpeech();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card.id, cardIndex, isPlaying]);

  // Handle Play/Pause
  function togglePlayPause() {
    playClickSound();
    if (isPlaying) {
      setIsPlaying(false);
      cancelSpeech();
    } else {
      setIsPlaying(true);
    }
  }

  return {
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
  };
}

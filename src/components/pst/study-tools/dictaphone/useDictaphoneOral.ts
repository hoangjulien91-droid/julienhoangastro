"use client";

import { useEffect, useRef, useState } from "react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  TICS_LANGAGE_ORAL,
  type SujetOralFlash,
} from "@/lib/pst/data/sujets-oral-flash";

export function useDictaphoneOral(
  currentSujet: SujetOralFlash,
  onSujetChange?: (sujet: SujetOralFlash) => void,
) {
  const [isRecording, setIsRecording] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(
    currentSujet.dureeConseilleeSec,
  );
  const [transcript, setTranscript] = useState("");
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);

  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef(false);
  const baseTranscriptRef = useRef("");

  const handleStopRecording = () => {
    isRecordingRef.current = false;
    setIsRecording(false);
    playSuccessSound();
    triggerHaptic();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onend = null;
        recognitionRef.current.stop();
      } catch {
        /* ignore */
      }
    }
  };

  // Timer loop
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRecording && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((t) => {
          if (t <= 1) {
            handleStopRecording();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRecording, timeRemaining]);

  // Speech Recognition setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setIsSpeechSupported(false);
      }
    }
    return () => {
      isRecordingRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.onend = null;
          recognitionRef.current.stop();
        } catch {
          /* ignore */
        }
      }
    };
  }, []);

  const startRecognitionSession = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "fr-FR";
      recognition.continuous = true;
      recognition.interimResults = true;

      let sessionFinal = "";

      recognition.onresult = (event: any) => {
        let interim = "";
        sessionFinal = "";
        for (let i = 0; i < event.results.length; i++) {
          const piece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            sessionFinal += piece + " ";
          } else {
            interim += piece + " ";
          }
        }
        const combined = `${baseTranscriptRef.current} ${sessionFinal} ${interim}`
          .replace(/\s+/g, " ")
          .trim();
        setTranscript(combined);
      };

      recognition.onerror = () => {
        /* ignore mic interruptions */
      };

      // Auto-reconnexion si iOS Safari ou Chrome coupe au bout de 30-45s de parole
      recognition.onend = () => {
        if (sessionFinal.trim()) {
          baseTranscriptRef.current =
            `${baseTranscriptRef.current} ${sessionFinal}`
              .replace(/\s+/g, " ")
              .trim();
        }
        if (isRecordingRef.current) {
          setTimeout(() => {
            if (isRecordingRef.current) {
              startRecognitionSession();
            }
          }, 150);
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch {
      /* ignore */
    }
  };

  const handleStartRecording = () => {
    playClickSound();
    triggerHaptic();
    baseTranscriptRef.current = transcript;
    isRecordingRef.current = true;
    setIsRecording(true);
    startRecognitionSession();
  };

  const handleReset = () => {
    handleStopRecording();
    baseTranscriptRef.current = "";
    setTimeRemaining(currentSujet.dureeConseilleeSec);
    setTranscript("");
    playClickSound();
    triggerHaptic();
  };

  const handleSelectSujet = (s: SujetOralFlash) => {
    handleStopRecording();
    baseTranscriptRef.current = "";
    setTimeRemaining(s.dureeConseilleeSec);
    setTranscript("");
    playClickSound();
    if (onSujetChange) onSujetChange(s);
  };

  // Check which keywords are detected in transcript
  const lowerTranscript = transcript.toLowerCase();
  const detectedKeywords = currentSujet.motsClesObligatoires.map((keyword) => {
    const isDetected = lowerTranscript.includes(keyword.toLowerCase());
    return { keyword, isDetected };
  });

  const countDetected = detectedKeywords.filter((k) => k.isDetected).length;
  const scorePercent = Math.round(
    (countDetected / currentSujet.motsClesObligatoires.length) * 100,
  );

  // Calcul du débit vocal (mots/minute) et détection des tics de langage
  const totalWords = transcript.trim()
    ? transcript.trim().split(/\s+/).length
    : 0;
  const elapsedSeconds = Math.max(
    1,
    currentSujet.dureeConseilleeSec - timeRemaining,
  );
  const motsParMinute =
    totalWords > 0 && elapsedSeconds >= 5
      ? Math.round((totalWords / elapsedSeconds) * 60)
      : 0;

  const ticsDetectes = TICS_LANGAGE_ORAL.map((t) => {
    const matches = transcript.match(t.regex);
    return { label: t.label, count: matches ? matches.length : 0 };
  }).filter((t) => t.count > 0);
  const totalTics = ticsDetectes.reduce((acc, t) => acc + t.count, 0);

  return {
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
  };
}

"use client";

import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  Maximize2,
  Minimize2,
  Headphones,
  FastForward,
  Sparkles,
} from "lucide-react";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";
import {
  getAvailableFrenchVoices,
  getPreferredFrenchVoice,
  savePreferredFrenchVoice,
  prepareTextForSpeech,
} from "@/lib/pst/speech-service";

interface AudioPayload {
  title: string;
  author?: string;
  moduleKey?: string;
  text: string;
}

export function PstAudioPodcastPlayer() {
  const [activePayload, setActivePayload] = useState<AudioPayload | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [muted, setMuted] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [showVoiceHelp, setShowVoiceHelp] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const estimatedDurationRef = useRef<number>(60);

  // Initialisation et détection asynchrone des voix du navigateur
  useEffect(() => {
    function loadVoices() {
      const frVoices = getAvailableFrenchVoices();
      setAvailableVoices(frVoices);
      const pref = getPreferredFrenchVoice();
      setSelectedVoice(pref);
    }

    loadVoices();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Écoute globale d'événements pour lancer la lecture depuis n'importe où
  useEffect(() => {
    function handlePlayEvent(e: Event) {
      const customEvent = e as CustomEvent<AudioPayload>;
      if (!customEvent.detail || !customEvent.detail.text) return;

      const payload = customEvent.detail;
      startPlayback(payload);
    }

    function handleStopEvent() {
      stopPlayback();
    }

    window.addEventListener("pst:play-audio", handlePlayEvent);
    window.addEventListener("pst:stop-audio", handleStopEvent);

    return () => {
      window.removeEventListener("pst:play-audio", handlePlayEvent);
      window.removeEventListener("pst:stop-audio", handleStopEvent);
      stopPlayback();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playbackRate, selectedVoice]);

  function startPlayback(payload: AudioPayload) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);

    const cleanText = prepareTextForSpeech(payload.text, {
      author: payload.author,
      title: payload.title,
    });
    if (!cleanText) return;

    setActivePayload(payload);
    setIsPlaying(true);
    setProgress(0);

    // Estimation durée (moyenne ~135 mots/min à 1x pour une cadence académique)
    const wordCount = cleanText.split(/\s+/).length;
    const estSec = Math.max(
      10,
      Math.round((wordCount / (135 * playbackRate)) * 60),
    );
    estimatedDurationRef.current = estSec;
    startTimeRef.current = Date.now();

    const utter = new SpeechSynthesisUtterance(cleanText);
    utter.lang = "fr-FR";
    // Cadence posée, intelligible pour des concepts denses
    utter.rate = playbackRate * 0.95;
    utter.pitch = 1.0;
    utter.volume = muted ? 0 : 1;

    const voiceToUse = selectedVoice || getPreferredFrenchVoice();
    if (voiceToUse) {
      utter.voice = voiceToUse;
    }

    utter.onend = () => {
      setIsPlaying(false);
      setProgress(100);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      playSuccessSound();
    };

    utter.onerror = () => {
      setIsPlaying(false);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };

    utteranceRef.current = utter;
    window.speechSynthesis.speak(utter);

    // Timer de progression visuelle
    progressTimerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const pct = Math.min(
        99,
        Math.round((elapsed / estimatedDurationRef.current) * 100),
      );
      setProgress(pct);
    }, 500);
  }

  function togglePlayPause() {
    playClickSound();
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else if (activePayload) {
        startPlayback(activePayload);
      }
    }
  }

  function stopPlayback() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    setIsPlaying(false);
    setActivePayload(null);
    setProgress(0);
  }

  function cycleSpeed() {
    playClickSound();
    const speeds = [1.0, 1.25, 1.5, 0.9];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const nextRate = speeds[nextIdx] ?? 1.0;
    setPlaybackRate(nextRate);

    // Recommencer ou ajuster si en cours de lecture
    if (activePayload && isPlaying) {
      startPlayback(activePayload);
    }
  }

  if (!activePayload) {
    return null;
  }

  return (
    <aside
      aria-label="Lecteur audio de cours"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out"
    >
      {/* Capsule audio flottante compacte */}
      <div
        className={`bg-slate-950/90 dark:bg-black/92 backdrop-blur-2xl border border-white/20 text-white shadow-2xl transition-all duration-300 ${
          isExpanded
            ? "w-[94vw] sm:w-[480px] rounded-[32px] p-5 space-y-4"
            : "w-[92vw] sm:w-[420px] rounded-full px-4 py-2.5 flex items-center justify-between gap-3"
        }`}
      >
        {/* BARRE DE PROGRESSION SUBTILE EN HAUT DE CAPSULE */}
        <div className="absolute top-0 left-6 right-6 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="bg-indigo-400 h-full transition-all duration-500 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* MODE RÉDUIT (PILL) */}
        {!isExpanded ? (
          <>
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              {/* Onde sonore animée */}
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-400/30">
                {isPlaying ? (
                  <div className="flex items-center gap-0.5 h-3.5">
                    <span className="w-0.5 h-full bg-indigo-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-0.5 h-full bg-indigo-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-0.5 h-full bg-indigo-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                ) : (
                  <Headphones className="size-3.5 text-indigo-300" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  {activePayload.moduleKey && (
                    <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-white/15 text-indigo-200">
                      {activePayload.moduleKey}
                    </span>
                  )}
                  <h4 className="text-xs font-bold text-white truncate m-0">
                    {activePayload.title}
                  </h4>
                </div>
                {activePayload.author && (
                  <p className="text-[10px] text-slate-400 truncate m-0">
                    {activePayload.author}
                  </p>
                )}
              </div>
            </div>

            {/* CONTRÔLES COMPACTS */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={cycleSpeed}
                title="Modifier la vitesse"
                className="px-2 py-1 rounded-full text-[10px] font-mono font-bold bg-white/10 hover:bg-white/20 text-indigo-300 transition-colors cursor-pointer"
              >
                {playbackRate}x
              </button>

              <button
                type="button"
                onClick={togglePlayPause}
                title={isPlaying ? "Pause" : "Lecture"}
                className="w-8 h-8 rounded-full bg-white text-slate-950 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="size-4 fill-current" />
                ) : (
                  <Play className="size-4 fill-current ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                title="Agrandir"
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Maximize2 className="size-3.5" />
              </button>

              <button
                type="button"
                onClick={stopPlayback}
                title="Arrêter"
                className="p-1.5 rounded-full text-slate-400 hover:text-rose-400 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </>
        ) : (
          /* MODE ÉTENDU (CARD DYNAMIC ISLAND) */
          <>
            <div className="flex items-start justify-between gap-3 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center">
                  <Headphones className="size-5 text-indigo-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    {activePayload.moduleKey && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                        {activePayload.moduleKey.toUpperCase()}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400">
                      PodCast Révision CNAM
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-white leading-tight mt-0.5">
                    {activePayload.title}
                  </h4>
                  {activePayload.author && (
                    <p className="text-xs text-indigo-300 font-medium m-0">
                      {activePayload.author}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Réduire"
                >
                  <Minimize2 className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={stopPlayback}
                  className="p-2 rounded-full text-slate-400 hover:text-rose-400 hover:bg-white/10 transition-colors cursor-pointer"
                  title="Fermer"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Extrait textuel lu */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 max-h-32 overflow-y-auto text-xs text-slate-300 leading-relaxed font-serif italic">
              « {activePayload.text.slice(0, 360)}... »
            </div>

            {/* Sélecteur de voix & Qualité audio studio */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-bold">
                  <Volume2 className="size-3.5" />
                  <span>Voix française :</span>
                </div>
                <div className="flex items-center gap-2">
                  {availableVoices.length > 0 ? (
                    <select
                      value={selectedVoice?.name || ""}
                      onChange={(e) => {
                        const v = availableVoices.find(
                          (item) => item.name === e.target.value,
                        );
                        if (v) {
                          setSelectedVoice(v);
                          savePreferredFrenchVoice(v.name);
                          if (activePayload && isPlaying) {
                            startPlayback(activePayload);
                          }
                        }
                      }}
                      className="bg-slate-900 border border-white/20 text-white rounded-lg px-2 py-1 text-xs outline-none cursor-pointer max-w-[200px] truncate font-medium"
                    >
                      {availableVoices.map((v) => {
                        const isHd =
                          v.name.includes("Enhanced") ||
                          v.name.includes("Améliorée") ||
                          v.name.includes("Premium") ||
                          v.name.includes("Natural");
                        return (
                          <option key={v.name} value={v.name}>
                            {isHd ? "★ " : ""}
                            {v.name.replace(/^(com\.apple\.|Google\s*)/i, "")}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    <span className="text-[11px] text-slate-400">
                      Voix standard du navigateur
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowVoiceHelp((v) => !v)}
                    className="text-[10px] text-indigo-300 hover:text-white underline cursor-pointer"
                    title="Comment obtenir une voix studio réaliste sur Mac ou iPhone ?"
                  >
                    {showVoiceHelp ? "Fermer" : "Améliorer la voix ?"}
                  </button>
                </div>
              </div>

              {showVoiceHelp && (
                <div className="p-2.5 rounded-xl bg-indigo-500/15 border border-indigo-400/25 text-[11px] text-slate-200 leading-relaxed space-y-1">
                  <div className="flex items-center gap-1 font-bold text-indigo-300">
                    <Sparkles className="size-3 text-amber-400" />
                    <span>Activer les voix studio gratuites sur Mac &amp; iPhone :</span>
                  </div>
                  <p className="m-0 text-slate-300">
                    Par défaut, macOS et iOS utilisent un vieux synthétiseur compact. Pour basculer en voix humaine naturelle :
                  </p>
                  <ol className="list-decimal pl-4 m-0 space-y-0.5 text-slate-300">
                    <li>Ouvrez <b>Réglages Système</b> &gt; <b>Accessibilité</b> &gt; <b>Contenu énoncé</b>.</li>
                    <li>Cliquez sur <b>Voix du système</b> &gt; <b>Français</b>.</li>
                    <li>Téléchargez la version <b>« Améliorée »</b> ou <b>« Premium »</b> de <b>Thomas</b> ou <b>Audrey</b>.</li>
                  </ol>
                </div>
              )}
            </div>

            {/* Contrôles Étendus */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={cycleSpeed}
                className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-white/10 hover:bg-white/20 text-indigo-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <FastForward className="size-3.5" />
                <span>{playbackRate}x Vitesse</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => startPlayback(activePayload)}
                  title="Recommencer"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="size-4" />
                </button>

                <button
                  type="button"
                  onClick={togglePlayPause}
                  className="w-12 h-12 rounded-full bg-white text-slate-950 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="size-6 fill-current" />
                  ) : (
                    <Play className="size-6 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setMuted((m) => !m)}
                  title={muted ? "Activer le son" : "Muet"}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {muted ? (
                    <VolumeX className="size-4 text-rose-400" />
                  ) : (
                    <Volume2 className="size-4" />
                  )}
                </button>
              </div>

              <div className="text-[11px] font-mono text-slate-400">
                {progress}%
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

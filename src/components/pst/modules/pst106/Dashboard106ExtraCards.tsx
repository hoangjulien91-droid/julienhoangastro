"use client";

import { useEffect, useState } from "react";
import {
  Zap,
  Headphones,
  GraduationCap,
  Sparkles,
  Printer,
  ArrowRight,
  Play,
  Pause,
  SkipForward,
  VolumeX,
} from "lucide-react";
import { A, CARTES } from "@/lib/pst/data/pst106";
import { JourJQuiz } from "./JourJQuiz";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";

function decodeHtml(html: string) {
  if (typeof window === "undefined") return html.replace(/<[^>]+>/g, "");
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return (tmp.textContent || "").replace(/\s+/g, " ").trim();
}

function buildAudioQueue() {
  return CARTES.filter((c) => c[3] === "coeur").map((c) => ({
    author: A[c[0] as keyof typeof A] || "",
    text: decodeHtml(`${A[c[0] as keyof typeof A] || ""}. ${c[1]}. ${c[2]}`),
  }));
}

export function genFicheRevision106() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("pst:open-fiche-poche", {
        detail: { module: "pst106" },
      }),
    );
  }
}

export function Dashboard106ExtraCards({
  onGoTab,
}: {
  onGoTab?: (panel: string) => void;
}) {
  const [jourJOpen, setJourJOpen] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioPaused, setAudioPaused] = useState(false);
  const [audioIdx, setAudioIdx] = useState(0);
  const [audioQueue] = useState(() => buildAudioQueue());

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis)
        window.speechSynthesis.cancel();
    };
  }, []);

  function speak(idx: number) {
    if (!window.speechSynthesis || idx >= audioQueue.length) {
      stopAudio();
      return;
    }
    const item = audioQueue[idx];
    if (!item) {
      stopAudio();
      return;
    }
    const u = new SpeechSynthesisUtterance(item.text);
    u.lang = "fr-FR";
    const voices = window.speechSynthesis.getVoices
      ? window.speechSynthesis.getVoices()
      : [];
    const fr = voices.find((v) => v.lang && v.lang.startsWith("fr"));
    if (fr) u.voice = fr;
    u.rate = 0.98;
    u.onend = () => {
      setAudioIdx((i) => {
        const next = i + 1;
        if (next >= audioQueue.length) {
          stopAudio();
        } else {
          speak(next);
        }
        return next;
      });
    };
    window.speechSynthesis.speak(u);
  }

  function startAudio() {
    if (!window.speechSynthesis) {
      window.alert(
        "La synthèse vocale n'est pas disponible sur ce navigateur.",
      );
      return;
    }
    window.speechSynthesis.cancel();
    setAudioIdx(0);
    setAudioPlaying(true);
    setAudioPaused(false);
    speak(0);
  }

  function stopAudio() {
    setAudioPlaying(false);
    setAudioPaused(false);
    setAudioIdx(0);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  function pauseAudio() {
    if (!audioPlaying || !window.speechSynthesis) return;
    if (audioPaused) {
      window.speechSynthesis.resume();
      setAudioPaused(false);
    } else {
      window.speechSynthesis.pause();
      setAudioPaused(true);
    }
  }

  function nextAudio() {
    if (!audioPlaying || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const next = audioIdx + 1;
    if (next >= audioQueue.length) {
      stopAudio();
      return;
    }
    setAudioIdx(next);
    speak(next);
  }

  return (
    <div className="space-y-4 pt-2">
      {/* 1. QUIZ EXPRESS DU JOUR J */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 inline-flex items-center gap-1.5">
            <Zap className="size-3 text-rose-600" />
            <span>5 min chrono · Échauffement express</span>
          </span>
          <span className="text-xs font-semibold text-slate-400 font-mono">10 Questions</span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
            Quiz du Jour J
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            10 questions tirées au sort (QCM + Vrai/Faux), 5 minutes chrono. Idéal pour s&apos;échauffer l&apos;esprit juste avant l&apos;épreuve et réactiver les automatismes cliniques.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setJourJOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 font-bold text-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Lancer le quiz express</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
      {jourJOpen && <JourJQuiz onClose={() => setJourJOpen(false)} />}

      {/* 2. RÉVISION AUDIO CONTINUE */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1.5">
            <Headphones className="size-3 text-emerald-600" />
            <span>Audio Continu · Révision nomade</span>
          </span>
          <span className="text-xs font-semibold text-slate-400 font-mono">Cartes cœur PST106</span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
            Révision audio continue
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            Écoute les cartes cœur lues à voix haute, en continu — révise les yeux fermés dans les transports ou en déplacement.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              if (audioPlaying) stopAudio();
              else startAudio();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer active:scale-95 shadow-xs ${
              audioPlaying
                ? "bg-rose-600 text-white hover:bg-rose-700"
                : "bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900"
            }`}
          >
            {audioPlaying ? <VolumeX className="size-3.5" /> : <Play className="size-3.5" />}
            <span>{audioPlaying ? "Arrêter la lecture" : "Lire les cartes cœur en continu"}</span>
          </button>

          {audioPlaying && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  pauseAudio();
                }}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                {audioPaused ? <Play className="size-3 text-amber-600" /> : <Pause className="size-3 text-amber-600" />}
                <span>{audioPaused ? "Reprendre" : "Pause"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  nextAudio();
                }}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <SkipForward className="size-3 text-amber-600" />
                <span>Suivante</span>
              </button>
            </div>
          )}
        </div>

        {audioPlaying && (
          <div className="text-[11px] font-mono text-slate-500 flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Carte {audioIdx + 1} / {audioQueue.length} {audioQueue[audioIdx] ? `· ${audioQueue[audioIdx].author}` : ""}</span>
          </div>
        )}
      </div>

      {/* 3. MÉMO DE SURVIE EXAMEN */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5">
            <GraduationCap className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Méthodologie Jour J · Les 4 Piliers</span>
          </span>
          <span className="text-xs font-semibold text-slate-400">Option A &amp; B</span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
            Mémo de Survie Examen
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            Les 4 piliers indispensables pour structurer n&apos;importe quelle réponse rédigée le Jour J :
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-1">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
              <span className="size-5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] flex items-center justify-center font-mono shrink-0">1</span>
              <span>Situer le Concept</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 m-0 pl-7 leading-snug">
              Toujours situer le concept dans sa théorie globale et nommer le courant (Ergonomie, Clinique de l&apos;activité, Psychodynamique).
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-1">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
              <span className="size-5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] flex items-center justify-center font-mono shrink-0">2</span>
              <span>Définir le Terme Clé</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 m-0 pl-7 leading-snug">
              Définir scientifiquement le concept (ex: Genre, Style, Activité réelle, Reconnaissance, Pouvoir d&apos;agir).
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-1">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
              <span className="size-5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] flex items-center justify-center font-mono shrink-0">3</span>
              <span>Donner l&apos;Exemple Réel</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 m-0 pl-7 leading-snug">
              Utiliser les cas cliniques du cours (ex: le port du casque chez les ouvriers, les guichetiers, la découpe de viande).
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-1">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
              <span className="size-5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] flex items-center justify-center font-mono shrink-0">4</span>
              <span>Contraster les Courants</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 m-0 pl-7 leading-snug">
              Montrer la complémentarité ou l&apos;opposition (ex: opposer le prescrit/réel ergonomique au pouvoir d&apos;agir ou à la souffrance éthique).
            </p>
          </div>
        </div>
      </div>

      {/* 4. RITUEL ANTI-PANIQUE */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1.5">
            <Sparkles className="size-3 text-amber-600" />
            <span>Gestion du Temps &amp; Sérénité</span>
          </span>
          <span className="text-xs font-semibold text-slate-400 font-mono">5 Réflexes Clés</span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
            Rituel anti-panique du Jour J
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            À appliquer dès la distribution du sujet d&apos;examen — avant d&apos;écrire une seule ligne sur la copie :
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {[
            { num: "1", title: "Respiration lente", desc: "Pose ton stylo, 3 respirations profondes. Le stress crée des trous de mémoire, pas le manque de travail." },
            { num: "2", title: "Double lecture active", desc: "Souligne les mots-clés et le verbe de consigne (définir, confronter, analyser la situation)." },
            { num: "3", title: "Plan au brouillon (20 min)", desc: "Pose 3-4 arguments avec leurs auteurs canoniques associés avant de rédiger." },
            { num: "4", title: "Déroulé des 4 piliers", desc: "Situer · Définir · Exemple réel · Contraster les courants théoriques." },
            { num: "5", title: "Relecture finale (10 min)", desc: "Vérifie les concepts verbatim, la syntaxe et l'orthographe technique des noms d'auteurs." },
          ].map((item) => (
            <div key={item.num} className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 flex items-start gap-2.5">
              <span className="size-5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {item.num}
              </span>
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100 block">{item.title}</span>
                <span className="text-[11px] text-slate-500 leading-snug block">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. FICHE DE RÉVISION CONDENSÉE */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20 inline-flex items-center gap-1.5">
            <Printer className="size-3 text-teal-600" />
            <span>Support A4 Imprimable</span>
          </span>
          <span className="text-xs font-semibold text-slate-400 font-mono">Condensé PST106</span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
            Fiche de révision condensée
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            Génère la fiche de cours complète condensée aux notions essentielles (les 3 courants cliniques + méthodologie d&apos;examen), prête à lire ou à imprimer en recto-verso.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              genFicheRevision106();
            }}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Printer className="size-3.5" />
            <span>Imprimer la fiche A4 recto-verso</span>
          </button>
          {onGoTab && (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onGoTab("antiseche");
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>Consulter l&apos;antisèche complète</span>
              <ArrowRight className="size-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

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
  const css =
    "body{font-family:system-ui,-apple-system,sans-serif;max-width:210mm;margin:0 auto;padding:5mm;color:#111;font-size:9pt;line-height:1.3;box-sizing:border-box;}h1{font-size:14pt;font-weight:700;margin:0 0 2mm;text-align:center}.sub{color:#555;font-size:9pt;text-align:center;margin-bottom:4mm}h2{font-size:10.5pt;font-weight:700;margin:4mm 0 2mm;border-bottom:1.5px solid #222;padding-bottom:1mm;text-transform:uppercase;letter-spacing:0.02em}p{margin:0 0 2mm}ul{margin:1mm 0 2mm;padding-left:4mm}li{margin-bottom:1mm}b{color:#000;font-weight:700}.note{background:#f4f6f8;border-left:2px solid #5b6b7b;padding:2mm;font-size:8.5pt;margin:2mm 0}.cErg{color:#2E6E9E}.cAct{color:#3F8159}.cPsy{color:#7A5AA6}.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:2mm 6mm}@media print{@page{size:A4 portrait;margin:10mm;}body{padding:0;max-width:none;}}";
  const html =
    "<!DOCTYPE html><html lang=fr><head><meta charset=utf-8><title>PST106 — Fiche de révision</title><style>" +
    css +
    "</style></head><body>" +
    "<h1>PST106 — Fiche de révision</h1><div class='sub'>Clinique de l'activité, psychodynamique du travail et ergonomie</div>" +
    "<div class='grid-2'>" +
    "<div>" +
    "<h2>1. Histoire &amp; Psychotechnique (Lahy, Toulouse)</h2>" +
    "<p>La <b>psychotechnique</b> historique applique la psychologie expérimentale au travail. Ses caractéristiques &amp; limites&nbsp;:</p>" +
    "<ul><li><b>Méthode</b>&nbsp;: Utilisation de tests psychomoteurs pour associer le «&nbsp;bon travailleur au bon poste&nbsp;» afin d'optimiser le rendement (sélection objective).</li>" +
    "<li><b>Limites (Taylorisme)</b>&nbsp;: Ignore la subjectivité, la souffrance et la variabilité de l'activité réelle. Lahy et Wallon dénoncent l'usure prématurée de l'organisme par la parcellisation des tâches.</li>" +
    "<li><b>Destin</b>&nbsp;: Transition forcée vers l'ergonomie de l'activité et les cliniques du travail face à l'échec de l'approche positiviste.</li></ul>" +
    "<h2 class='cErg'>2. Wisner — Ergonomie de l'activité</h2>" +
    "<p><b>Projet&nbsp;:</b> L'<b>ergonomie de l'activité</b> vise à concevoir des situations de travail adaptées aux caractéristiques physiologiques et cognitives des humains pour préserver leur santé et garantir l'efficacité.</p>" +
    "<p><b>Notion clé&nbsp;:</b> Écart irréductible entre la <b>tâche prescrite</b> (objectifs, consignes) et l'<b>activité réelle</b> (régulations de l'opérateur face aux aléas).</p>" +
    "<p><b>Mécanisme&nbsp;:</b> L'opérateur effectue des régulations permanentes pour compenser les défaillances techniques, l'ambiance physique nocive ou la fatigue.</p>" +
    "<p><b>Exemple&nbsp;:</b> Le détournement des cadences par des ouvriers pour créer des stocks tampons et souffler (gestion des aléas organisationnels).</p>" +
    "<h2 class='cAct'>3. Clot — Clinique de l'activité</h2>" +
    "<p><b>Projet&nbsp;:</b> Restaurer le <b>pouvoir d'agir</b> des sujets en relançant le développement du métier et le dialogue professionnel entre pairs.</p>" +
    "<p><b>Notions clés&nbsp;:</b> Activité réalisée vs <b>réel de l'activité</b> (le possible, l'empêché, le suspendu) · <b>genre professionnel</b> (patrimoine collectif, règles de l'art) vs <b>style</b> (appropriation singulière du genre par le sujet).</p>" +
    "<p><b>Souffrance&nbsp;:</b> Provient de l'<b>activité empêchée</b> (être privé du pouvoir de bien faire son travail selon les règles du métier), amputant la subjectivité.</p>" +
    "<p><b>Méthodes&nbsp;:</b> Autoconfrontation simple (vidéo commentée par l'opérateur) et croisée (vidéo débattue avec un pair) pour relancer la controverse professionnelle.</p>" +
    "</div>" +
    "<div>" +
    "<h2 class='cPsy'>4. Dejours — Psychodynamique du travail</h2>" +
    "<p><b>Projet&nbsp;:</b> Analyser comment le psychisme humain négocie la contrainte organisationnelle, et comment transformer la souffrance en plaisir et en santé.</p>" +
    "<p><b>Notions clés&nbsp;:</b> Le travail est l'<b>épreuve du réel</b> · la souffrance est inévitable mais contenue par des <b>stratégies de défense collectives</b> (ex. idéologies défensives collectives dans les métiers dangereux).</p>" +
    "<p><b>Moteur de santé&nbsp;:</b> La <b>reconnaissance</b> transforme la souffrance en plaisir. Elle s'obtient par le <b>jugement de beauté</b> (pairs, validation des règles de l'art) et le <b>jugement d'utilité</b> (hiérarchie/clients).</p>" +
    "<p><b>Intelligence&nbsp;:</b> Mobilisation de l'<b>intelligence pratique (la mêtis)</b>, astucieuse et transgressive, face aux failles de la prescription.</p>" +
    "<h2>5. Synthèse &amp; Méthodologie jour J</h2>" +
    "<p><b>Ligne de partage&nbsp;:</b> Complémentarité des cliniques du travail. Clot est centré sur le développement de l'activité (action/dialogue) ; Dejours est centré sur les processus psychiques (souffrance/reconnaissance) ; Wisner est centré sur la physiologie et l'ergonomie cognitive.</p>" +
    "<div class='note'><b>Auteurs Bonus&nbsp;:</b> Georges Canguilhem (la santé comme création de normes, normativité) · Karl Marx (travail générique et aliénation) · Michel Foucault (les disciplines et corps dociles).</div>" +
    "<div class='note'><b>Méthode&nbsp;:</b> Idée &rarr; Auteur + concept &rarr; Exemple concret &rarr; Contraste avec un autre courant &rarr; Conclusion (la signature de l'auteur).</div>" +
    "</div>" +
    "</div>" +
    "</body></html>";
  const w = window.open("", "_blank");
  if (w) {
    w.document.write(html);
    w.document.close();
    w.focus();
    window.setTimeout(() => w.print(), 500);
  } else {
    window.alert("Autorise les fenêtres pop-up pour générer la fiche.");
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

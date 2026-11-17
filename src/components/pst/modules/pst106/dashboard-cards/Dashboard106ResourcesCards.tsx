"use client";

import { BookOpen, Video, Sparkles, Printer, ArrowRight } from "lucide-react";
import { PST106_OFFICIAL_RESOURCES } from "@/lib/pst/data/pst106";
import { playClickSound } from "@/lib/pst/audio-feedback";

export function genFicheRevision106() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("pst:open-fiche-poche", {
        detail: { module: "pst106" },
      }),
    );
  }
}

interface Dashboard106ResourcesCardsProps {
  onGoTab?: (panel: string) => void;
}

export function Dashboard106ResourcesCards({
  onGoTab,
}: Dashboard106ResourcesCardsProps) {
  return (
    <>
      {/* RESSOURCES DU BUREAU & ENSEIGNANTE */}
      <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/25 dark:border-emerald-500/20 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1.5">
            <BookOpen className="size-3 text-emerald-600 dark:text-emerald-400" />
            <span>Corpus Bureau PST106 · Pr. Christine Lagabrielle</span>
          </span>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
            {PST106_OFFICIAL_RESOURCES.length} Documents Indexés
          </span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
            Textes Auteurs, Vidéo &amp; Supports de Cours
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            Cours 1 (vidéo MKV, transcription Buzz 3h12, diapos), textes fondateurs de Suzanne Pacaud et Herzberg, histoire des labos Gay-Lussac (PISTES), polycopié exhaustif de 108k caractères, podcasts audio et les 8 sujets d&apos;examen officiels.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onGoTab && (
            <>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onGoTab("seances");
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Video className="size-3.5" />
                <span>Séance 1 Retranscrite (Webconf 3h12) ✦</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onGoTab("schemas");
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Sparkles className="size-3.5" />
                <span>Galerie Visuelle (SVG &amp; Dessin 45s) ✦</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onGoTab("ressources");
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <BookOpen className="size-3.5" />
                <span>Consulter les ressources profs ({PST106_OFFICIAL_RESOURCES.length})</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* AMÉLIORATIONS PÉDAGOGIQUES DU 1ER SEMESTRE */}
      <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/25 dark:border-indigo-500/20 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border border-indigo-500/30 inline-flex items-center gap-1.5">
            <Sparkles className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Boîte à Outils Pédagogique S1 (106 · 108 · 123)</span>
          </span>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 font-mono">
            3 Simulateurs Clés
          </span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
            Transversalité S1, Citations Incontournables &amp; Examen Écrit
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            Ne cloisonne pas tes révisions. Compare la clinique de l&apos;activité avec la clinique sociale et la sociologie des identités, entraîne-toi sur les 40 citations canoniques ou lance un chrono concours.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap pt-1">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              window.dispatchEvent(new CustomEvent("pst:open-ponts-s1"));
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Sparkles className="size-3.5" />
            <span>Ponts Conceptuels S1 (106/108/123)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              window.dispatchEvent(new CustomEvent("pst:open-flash-citations-s1"));
            }}
            className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 dark:text-amber-300 font-bold text-xs border border-amber-500/30 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <span>Flash-Citations d&apos;Or S1</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              window.dispatchEvent(new CustomEvent("pst:open-chrono-examen"));
            }}
            className="px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-800 dark:text-emerald-300 font-bold text-xs border border-emerald-500/30 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <span>Chrono-Examen Écrit (2h/3h)</span>
          </button>
          {onGoTab && (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onGoTab("diagnostic");
              }}
              className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-xs"
            >
              <span>Labo Diagnostic 106 (Leplat &amp; Clot) ✦</span>
            </button>
          )}
          {onGoTab && (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onGoTab("autoconfrontation");
              }}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-xs"
            >
              <span>Simulateur Autoconfrontation &amp; Sosie ✦</span>
            </button>
          )}
        </div>
      </div>

      {/* FICHE DE RÉVISION CONDENSÉE */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20 inline-flex items-center gap-1.5">
            <Printer className="size-3 text-teal-600" />
            <span>Support A4 Imprimable</span>
          </span>
          <span className="text-xs font-semibold text-slate-400 font-mono">
            Condensé PST106
          </span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
            Fiche de révision condensée
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            Génère la fiche de cours complète condensée aux notions essentielles
            (les 3 courants cliniques + méthodologie d&apos;examen), prête à
            lire ou à imprimer en recto-verso.
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
    </>
  );
}

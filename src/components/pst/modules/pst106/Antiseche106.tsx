"use client";

import React, { useState } from "react";
import { triggerHaptic } from "@/lib/pst/audio-feedback";
import { AntisecheMatriceSection } from "./antiseche/AntisecheMatriceSection";
import { AntisechePhilosophesSection } from "./antiseche/AntisechePhilosophesSection";
import { AntisecheJahodaSuperSection } from "./antiseche/AntisecheJahodaSuperSection";
import { AntisecheHistoireSeance3Section } from "./antiseche/AntisecheHistoireSeance3Section";
import { AntisechePiliersExemplesSection } from "./antiseche/AntisechePiliersExemplesSection";

export function Antiseche106() {
  const [hideAnswers, setHideAnswers] = useState(false);

  function handlePrint() {
    triggerHaptic("selection");
    if (typeof window !== "undefined") {
      document.body.classList.add("printing-anti");
      window.print();
      setTimeout(() => document.body.classList.remove("printing-anti"), 800);
    }
  }

  function mask(text: string) {
    if (!hideAnswers) return <>{text}</>;
    return (
      <span className="rounded px-1 text-transparent bg-slate-200 dark:bg-slate-700 select-none border-b border-slate-400 dark:border-slate-500">
        {text}
      </span>
    );
  }

  return (
    <div className="space-y-4">
      <p className="anti-intro text-sm text-slate-600 dark:text-slate-300">
        Une <b>antisèche complète et dense</b> : concepts, philosophes,
        fonctions psychologiques du travail (Jahoda), histoire du CNAM, matrices
        comparatives et méthodes d&apos;examen. Imprime-la (ou enregistre-la en
        PDF) pour t&apos;entraîner à la <b>reproduire à la main</b> —
        l&apos;exercice de mémorisation le plus efficace.{" "}
        <span className="text-amber-700 dark:text-amber-400 font-semibold">
          Rappel : c&apos;est un outil d&apos;entraînement, non autorisé le jour
          J.
        </span>
      </p>

      {/* Barre d'action print & test */}
      <div className="anti-bar flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs shadow-xs transition-colors cursor-pointer"
            onClick={handlePrint}
          >
            Imprimer / Exporter PDF
          </button>
          <button
            type="button"
            className="btn ghost px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700 text-xs font-medium transition-colors cursor-pointer"
            onClick={() => setHideAnswers((h) => !h)}
          >
            {hideAnswers
              ? "Afficher les réponses"
              : "Masquer les réponses (mode test)"}
          </button>
        </div>
        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
          Programme PST106 · Cnam 2026/2027
        </div>
      </div>

      <div id="antiSheet" className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            PST106 — Antisèche Clinique &amp; Psychologie du travail
          </h2>
          <div className="sub text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Lagabrielle · Wisner · Clot · Dejours · Jahoda · Gay-Lussac — à
            maîtriser de mémoire
          </div>
        </div>

        {/* Sections 1 & 2: Histoire & Matrice 3 Courants */}
        <AntisecheMatriceSection mask={mask} />

        {/* Section 3: Philosophes */}
        <AntisechePhilosophesSection mask={mask} />

        {/* Sections 4, 5, 6: Jahoda, Super, Hofstede */}
        <AntisecheJahodaSuperSection mask={mask} />

        {/* Sections 7, 8, 9, 10, 11: Histoire CNAM & Séance 3 */}
        <AntisecheHistoireSeance3Section mask={mask} />

        {/* Sections 12, 13, 14: 3 Piliers, Exemples & Méthode */}
        <AntisechePiliersExemplesSection />
      </div>
    </div>
  );
}

"use client";

import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface Atelier123HeaderProps {
  activeMode: "annales" | "methode" | "brouillon" | "oral" | "matrice";
  onSelectMode: (mode: "annales" | "methode" | "brouillon" | "oral" | "matrice") => void;
  dissertWordCount: number;
}

export function Atelier123Header({
  activeMode,
  onSelectMode,
  dissertWordCount,
}: Atelier123HeaderProps) {
  return (
    <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-blue-500/25 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 inline-flex items-center gap-1.5 shadow-2xs mb-2">
            <span>
              Format d&apos;examen officiel · PST123 · Élisabeth LUCY
            </span>
          </div>
          <h2 className="text-base sm:text-xl font-bold font-serif text-slate-900 dark:text-slate-100 m-0">
            Atelier d&apos;Écriture &amp; Annales PST123 (Option A &amp;
            Option B)
          </h2>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-500/30">
          <span>2h00 sans documents</span>
          <span>•</span>
          <span>6 séances de référence</span>
        </div>
      </div>
      <p className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        À l&apos;examen de PST123, l&apos;évaluation porte sur votre maîtrise
        des grilles d&apos;analyse sociologique et déontologique : l&apos;
        <b>Option A (Dissertation théorique)</b> ou l&apos;
        <b>Option B (Analyse de situation de travail / Cas clinique)</b>. Cet
        atelier rassemble <b>8 annales d&apos;examen rédigées</b>, leurs
        corrigés modèles d&apos;excellence, ainsi que la méthode dialectique
        complète (Dubar, Bourdieu, Sainsaulieu, Honneth &amp; Déontologie).
      </p>

      {/* Segmented Control */}
      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-blue-500/20">
        <button
          type="button"
          onClick={() => {
            triggerHaptic("selection");
            playClickSound();
            onSelectMode("annales");
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeMode === "annales"
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-blue-500/15"
          }`}
        >
          <span>📜 Annales : Sujets rédigés &amp; Cas cliniques</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
            8 sujets
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            triggerHaptic("selection");
            playClickSound();
            onSelectMode("methode");
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeMode === "methode"
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-blue-500/15"
          }`}
        >
          <span>📐 Méthodologie &amp; Grilles d&apos;Analyse</span>
        </button>
        <button
          type="button"
          onClick={() => {
            triggerHaptic("selection");
            playClickSound();
            onSelectMode("brouillon");
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeMode === "brouillon"
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-blue-500/15"
          }`}
        >
          <span>✍️ Mon Brouillon d&apos;Entraînement</span>
          {dissertWordCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono">
              {dissertWordCount} mots
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            triggerHaptic("selection");
            playClickSound();
            onSelectMode("oral");
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeMode === "oral"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-indigo-500/15"
          }`}
        >
          <span>🎤 Simulateur Oral (Séances 4 &amp; 5)</span>
        </button>
        <button
          type="button"
          onClick={() => {
            triggerHaptic("selection");
            playClickSound();
            onSelectMode("matrice");
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeMode === "matrice"
              ? "bg-purple-600 text-white shadow-xs"
              : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-purple-500/15"
          }`}
        >
          <span>🧩 Matrice Dubar &amp; Sainsaulieu ✦</span>
        </button>
      </div>
    </div>
  );
}

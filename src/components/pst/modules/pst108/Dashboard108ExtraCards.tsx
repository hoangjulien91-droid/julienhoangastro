"use client";

import { Compass } from "lucide-react";

interface Dashboard108ExtraCardsProps {
  onGoTab: (panel: string) => void;
}

export function Dashboard108ExtraCards({
  onGoTab,
}: Dashboard108ExtraCardsProps) {
  return (
    <>
      {/* Fil conducteur de l'examen Cnam PST108 */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-indigo-500/25 shadow-xs mb-4 space-y-2.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5 shadow-2xs">
            <Compass className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Fil conducteur de l&apos;examen Cnam</span>
          </span>
          <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 uppercase">
            PST108 · Psychologie du langage et clinique du dialogue
          </span>
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-serif font-bold tracking-tight text-foreground m-0">
            Théories du langage (Vygotski vs Piaget) → Pouvoir symbolique
            (Bourdieu) → Délibération &amp; Reconnaissance (Habermas &amp;
            Honneth) → Méthode IOD (Valls)
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed m-0">
            Le langage au travail est un instrument psychologique d&apos;action
            et de développement (Vygotski) : il engage la clinique du dialogue
            et la dispute professionnelle (Clot), des rapports de pouvoir
            institués (Bourdieu), l&apos;agir communicationnel (Habermas), la
            reconnaissance morale (Honneth) et la négociation sur le travail
            réel sans tri préalable (Valls &amp; Castra).
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/25 dark:border-indigo-500/20 shadow-xs space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border border-indigo-500/30 inline-flex items-center gap-1.5">
            <Compass className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Boîte à Outils Pédagogique S1 (106 · 108 · 123)</span>
          </span>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 font-mono">
            3 Outils Transversaux
          </span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
            Ponts Conceptuels, Citations Incontournables &amp; Chrono Concours
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            Compare le cadre de PST108 avec la clinique de l&apos;activité (106)
            et la sociologie des identités (123). Révise les 40 citations
            canoniques ou teste-toi sur une dissertation en 2h/3h.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap pt-1">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined")
                window.dispatchEvent(new CustomEvent("pst:open-ponts-s1"));
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Ponts Conceptuels S1 (106/108/123) ✦</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined")
                window.dispatchEvent(
                  new CustomEvent("pst:open-flash-citations-s1"),
                );
            }}
            className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 dark:text-amber-300 font-bold text-xs border border-amber-500/30 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <span>Flash-Citations d&apos;Or S1 ✦</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined")
                window.dispatchEvent(
                  new CustomEvent("pst:open-chrono-examen"),
                );
            }}
            className="px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-800 dark:text-emerald-300 font-bold text-xs border border-emerald-500/30 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <span>Chrono-Examen Écrit (2h/3h) ✦</span>
          </button>
          <button
            type="button"
            onClick={() => onGoTab("iod")}
            className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-xs"
          >
            <span>Simulateur IOD (Francis Valls) ✦</span>
          </button>
          <button
            type="button"
            onClick={() => onGoTab("langage")}
            className="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-xs"
          >
            <span>Décodeur Langage (Bühler &amp; Habermas) ✦</span>
          </button>
          <button
            type="button"
            onClick={() => onGoTab("seances")}
            className="px-3.5 py-2 rounded-xl bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-xs"
          >
            <span>Séances &amp; Retranscriptions (Cours 1, 2 &amp; 3) ✦</span>
          </button>
          <button
            type="button"
            onClick={() => onGoTab("schemas")}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-xs"
          >
            <span>Galerie Visuelle (SVG &amp; Dessin 45s) ✦</span>
          </button>
        </div>
      </div>
    </>
  );
}

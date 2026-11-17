"use client";

import { Sparkles, Brain } from "lucide-react";
import type { EnonceTravail } from "@/lib/pst/data/pst108-decodeur-data";

interface DecodeurTheoriesViewProps {
  enonce: EnonceTravail;
  activeTheorie: "buhler" | "habermas" | "bourdieu" | "vygotski";
}

export function DecodeurTheoriesView({
  enonce,
  activeTheorie,
}: DecodeurTheoriesViewProps) {
  return (
    <>
      {/* Tab 1 : BUHLER */}
      {activeTheorie === "buhler" && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/70 dark:border-slate-800">
                <span className="text-xs font-bold uppercase text-amber-700 dark:text-amber-400">
                  1. Fonction Expressive (Symptôme)
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  Émetteur
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans m-0">
                {enonce.grilleBuhler.expression}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/70 dark:border-slate-800">
                <span className="text-xs font-bold uppercase text-amber-700 dark:text-amber-400">
                  2. Fonction d&apos;Appel (Signal)
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  Récepteur
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans m-0">
                {enonce.grilleBuhler.appel}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/70 dark:border-slate-800">
                <span className="text-xs font-bold uppercase text-amber-700 dark:text-amber-400">
                  3. Fonction Représentative (Symbole)
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  Monde &amp; Objets
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans m-0">
                {enonce.grilleBuhler.representation}
              </p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/30 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2.5 leading-relaxed">
            <Sparkles className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong>Schéma d&apos;examen (Bühler, 1934) :</strong> Le triangle
              de l&apos;Organon place le signe linguistique au centre, reliant
              simultanément l&apos;émetteur (expression), le récepteur (appel) et
              l&apos;état des choses (représentation).
            </div>
          </div>
        </div>
      )}

      {/* Tab 2 : HABERMAS */}
      {activeTheorie === "habermas" && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
              Type d&apos;action selon Jürgen Habermas :
            </span>
            <span
              className={`text-xs px-3 py-1 rounded-full font-mono font-bold uppercase ${
                enonce.grilleHabermas.typeAgir === "communicationnel"
                  ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30"
                  : "bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/30"
              }`}
            >
              Agir {enonce.grilleHabermas.typeAgir}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 text-xs">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1.5">
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase text-[10px] block">
                1. Vérité Objective (Monde Physique)
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                {enonce.grilleHabermas.pretentionVerite}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1.5">
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase text-[10px] block">
                2. Justesse Normative (Monde Social)
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                {enonce.grilleHabermas.pretentionJustesse}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1.5">
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase text-[10px] block">
                3. Sincérité Subjective (Monde Intérieur)
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                {enonce.grilleHabermas.pretentionSincerite}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/25 border border-indigo-200/80 dark:border-indigo-800/40 text-xs text-indigo-950 dark:text-indigo-200 leading-relaxed">
            <strong>Verdict critique :</strong> {enonce.grilleHabermas.verdict}
          </div>
        </div>
      )}

      {/* Tab 3 : BOURDIEU & AUSTIN */}
      {activeTheorie === "bourdieu" && (
        <div className="space-y-4 text-xs animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400 uppercase text-[10px] block">
                Force Illocutoire (John Austin · Performativité)
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                {enonce.grilleBourdieuAustin.forceIllocutoire}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400 uppercase text-[10px] block">
                Pouvoir Symbolique &amp; Doxa (Pierre Bourdieu)
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0">
                {enonce.grilleBourdieuAustin.pouvoirSymbolique}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/25 border border-purple-200/80 dark:border-purple-800/40 text-slate-800 dark:text-slate-300 space-y-1 leading-relaxed">
            <strong className="text-purple-800 dark:text-purple-300 font-mono uppercase text-[10px] block">
              Délégation d&apos;autorité institutionnelle :
            </strong>
            <p className="m-0">{enonce.grilleBourdieuAustin.autoriteDeleguee}</p>
          </div>
        </div>
      )}

      {/* Tab 4 : VYGOTSKI */}
      {activeTheorie === "vygotski" && (
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3 text-xs animate-in fade-in duration-150">
          <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold uppercase tracking-wider text-xs">
            <Brain className="size-4 shrink-0" />
            <span>Médiation Sémiotique &amp; Intériorisation (Lev Vygotski)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed m-0">
            {enonce.grilleVygotski}
          </p>
          <div className="p-3.5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/25 border border-teal-200/80 dark:border-teal-800/40 text-teal-950 dark:text-teal-200 italic leading-relaxed">
            « La pensée ne s&apos;exprime pas simplement dans le mot : elle s&apos;y
            accomplit. Le langage social précède et construit le langage
            intérieur de l&apos;action. » (Vygotski, 1934)
          </div>
        </div>
      )}
    </>
  );
}

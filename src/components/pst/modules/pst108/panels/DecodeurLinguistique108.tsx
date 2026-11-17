"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";
import {
  ENONCES_TRAVAIL_PST108,
} from "@/lib/pst/data/pst108-decodeur-data";
import { DecodeurTheoriesView } from "./decodeur/DecodeurTheoriesView";

export function DecodeurLinguistique108() {
  const [selectedEnonceId, setSelectedEnonceId] = useState<string>(
    ENONCES_TRAVAIL_PST108[0].id,
  );
  const [activeTheorie, setActiveTheorie] = useState<
    "buhler" | "habermas" | "bourdieu" | "vygotski"
  >("buhler");

  const enonce =
    ENONCES_TRAVAIL_PST108.find((e) => e.id === selectedEnonceId) ??
    ENONCES_TRAVAIL_PST108[0];

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/[0.08] via-white/90 to-orange-500/[0.06] dark:from-amber-950/40 dark:via-slate-900/90 dark:to-orange-950/30 p-4 sm:p-6 backdrop-blur-xl shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 border border-amber-500/30">
              <MessageSquare className="size-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>PST108 · Psychologie du Langage &amp; Clinique du Dialogue</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-serif font-bold tracking-tight text-slate-900 dark:text-white m-0">
              Le Décodeur Pragmatique &amp; Linguistique du Travail
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed m-0">
              Analysez la parole au travail à travers les 4 grilles fondamentales d&apos;Éric Lucy : l&apos;Organon de <b>Bühler</b>, l&apos;agir communicationnel d&apos;<b>Habermas</b>, le pouvoir symbolique de <b>Bourdieu/Austin</b> et la médiation sémiotique de <b>Vygotski</b>.
            </p>
          </div>
        </div>
      </div>

      {/* Selector Enoncés */}
      <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          Sélectionnez un énoncé de terrain à décoder :
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {ENONCES_TRAVAIL_PST108.map((e) => {
            const isSelected = e.id === enonce.id;
            return (
              <button
                key={e.id}
                type="button"
                onClick={() => {
                  setSelectedEnonceId(e.id);
                  playClickSound();
                  triggerHaptic();
                }}
                className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold border transition-all truncate max-w-xs shrink-0 cursor-pointer active:scale-95 ${
                  isSelected
                    ? "bg-amber-600 border-amber-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800/70 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800"
                }`}
              >
                {e.enonce}
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Utterance Card */}
      <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-amber-500 shadow-xs space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/25">
            Énoncé Réel Recueilli In Situ
          </span>
          <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
            {enonce.locuteur} ➔ {enonce.destinataire}
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white italic m-0">
          {enonce.enonce}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 m-0 leading-relaxed">
          <strong className="text-slate-900 dark:text-slate-200">Contexte :</strong> {enonce.contexte}
        </p>
      </div>

      {/* Theory Tabs — Mobile Scrollable Segmented Bar */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => {
            setActiveTheorie("buhler");
            playClickSound();
          }}
          className={`flex-1 whitespace-nowrap px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTheorie === "buhler"
              ? "bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-300 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          1. Karl Bühler (Organon)
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTheorie("habermas");
            playClickSound();
          }}
          className={`flex-1 whitespace-nowrap px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTheorie === "habermas"
              ? "bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          2. Habermas (3 Validités)
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTheorie("bourdieu");
            playClickSound();
          }}
          className={`flex-1 whitespace-nowrap px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTheorie === "bourdieu"
              ? "bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          3. Bourdieu &amp; Austin (Pouvoir)
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTheorie("vygotski");
            playClickSound();
          }}
          className={`flex-1 whitespace-nowrap px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTheorie === "vygotski"
              ? "bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          4. Vygotski (Médiation)
        </button>
      </div>

      {/* Theories View */}
      <DecodeurTheoriesView enonce={enonce} activeTheorie={activeTheorie} />
    </div>
  );
}

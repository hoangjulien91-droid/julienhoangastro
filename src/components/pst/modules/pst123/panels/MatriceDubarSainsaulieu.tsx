"use client";

import { useState } from "react";
import { Compass, Sparkles } from "lucide-react";
import {
  playClickSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { CAS_CLINIQUES_EXAMEN } from "@/lib/pst/data/dubar-sainsaulieu-data";
import { DubarMatrixSection } from "./dubar/DubarMatrixSection";
import { SainsaulieuModelsSection } from "./dubar/SainsaulieuModelsSection";
import { CasCliniquesIdentiteSection } from "./dubar/CasCliniquesIdentiteSection";

export function MatriceDubarSainsaulieu() {
  const [activeTab, setActiveTab] = useState<"dubar" | "sainsaulieu" | "jeu">("dubar");
  const [casScore, setCasScore] = useState(0);
  const [solvedCas, setSolvedCas] = useState<Record<string, boolean>>({});
  const [copiedQuote, setCopiedQuote] = useState(false);

  const handleCopyQuote = (quote: string) => {
    navigator.clipboard.writeText(quote);
    setCopiedQuote(true);
    playClickSound();
    triggerHaptic();
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/[0.08] via-white/90 to-purple-500/[0.06] dark:from-indigo-950/40 dark:via-slate-900/90 dark:to-purple-950/30 p-4 sm:p-6 backdrop-blur-xl shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 border border-indigo-500/30">
              <Compass className="size-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>PST123 · Atelier Typologies &amp; Dynamique Identitaire</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-serif font-bold tracking-tight text-slate-900 dark:text-white m-0">
              Matrice de Dubar &amp; Modèles de Sainsaulieu
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed m-0">
              Maîtrisez les deux grilles reines de PST123. Expérimentez la double transaction (Dubar) et les cultures d&apos;entreprise (Sainsaulieu), puis entraînez-vous sur les cas cliniques réels d&apos;examen.
            </p>
          </div>
        </div>
      </div>

      {/* Segmented Tabs — Mobile Scrollable */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => {
            setActiveTab("dubar");
            playClickSound();
          }}
          className={`flex-1 whitespace-nowrap px-3 sm:px-4 py-2 text-xs font-bold rounded-xl transition-all shrink-0 cursor-pointer ${
            activeTab === "dubar"
              ? "bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          1. Claude Dubar (Matrice 2×2)
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("sainsaulieu");
            playClickSound();
          }}
          className={`flex-1 whitespace-nowrap px-3 sm:px-4 py-2 text-xs font-bold rounded-xl transition-all shrink-0 cursor-pointer ${
            activeTab === "sainsaulieu"
              ? "bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          2. Renaud Sainsaulieu (4 Modèles)
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("jeu");
            playClickSound();
          }}
          className={`flex-1 whitespace-nowrap px-3 sm:px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === "jeu"
              ? "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-xs"
              : "text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200"
          }`}
        >
          <Sparkles className="size-3.5 shrink-0" />
          <span>3. Cas Cliniques ({casScore}/{CAS_CLINIQUES_EXAMEN.length})</span>
        </button>
      </div>

      {/* TAB 1: DUBAR */}
      {activeTab === "dubar" && (
        <DubarMatrixSection
          onCopyQuote={handleCopyQuote}
          copiedQuote={copiedQuote}
        />
      )}

      {/* TAB 2: SAINSAULIEU */}
      {activeTab === "sainsaulieu" && (
        <SainsaulieuModelsSection
          onCopyQuote={handleCopyQuote}
          copiedQuote={copiedQuote}
        />
      )}

      {/* TAB 3: JEU DE CAS CLINIQUES */}
      {activeTab === "jeu" && (
        <CasCliniquesIdentiteSection
          casScore={casScore}
          setCasScore={setCasScore}
          solvedCas={solvedCas}
          setSolvedCas={setSolvedCas}
        />
      )}
    </div>
  );
}

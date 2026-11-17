"use client";

import { useState } from "react";
import {
  Scale,
  Gavel,
  AlertTriangle,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  CAS_DEONTOLOGIE_123,
} from "@/lib/pst/data/tribunal-deonto-data";
import { TribunalVerdictSelector } from "./tribunal/TribunalVerdictSelector";
import { TribunalDeontoDebrief } from "./tribunal/TribunalDeontoDebrief";

export function TribunalDeonto123() {
  const [currentCasIdx, setCurrentCasIdx] = useState(0);
  const [selectedVerdict, setSelectedVerdict] = useState<
    "conforme" | "manquement_code" | "delit_penal" | null
  >(null);
  const [hasValidated, setHasValidated] = useState(false);
  const [score, setScore] = useState(0);
  const [solvedCas, setSolvedCas] = useState<Record<string, boolean>>({});

  const cas = CAS_DEONTOLOGIE_123[currentCasIdx];

  const handleSelectVerdict = (v: "conforme" | "manquement_code" | "delit_penal") => {
    if (hasValidated) return;
    setSelectedVerdict(v);
    playClickSound();
    triggerHaptic();
  };

  const handleValidate = () => {
    if (!selectedVerdict) return;
    setHasValidated(true);
    const isWin = selectedVerdict === cas.qualificationAttendue;

    if (isWin) {
      playSuccessSound();
      triggerHaptic();
      if (!solvedCas[cas.id]) {
        setScore((s) => s + 1);
        setSolvedCas((prev) => ({ ...prev, [cas.id]: true }));
      }
    } else {
      playReviewSound();
      triggerHaptic();
    }
  };

  const handleNextCas = () => {
    playClickSound();
    triggerHaptic();
    setSelectedVerdict(null);
    setHasValidated(false);
    setCurrentCasIdx((i) => (i + 1) % CAS_DEONTOLOGIE_123.length);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/[0.08] via-white/90 to-purple-500/[0.06] dark:from-indigo-950/40 dark:via-slate-900/90 dark:to-purple-950/30 p-4 sm:p-6 backdrop-blur-xl shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 border border-indigo-500/30">
              <Scale className="size-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>PST123 · Éthique, Déontologie &amp; Titre de Psychologue</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-serif font-bold tracking-tight text-slate-900 dark:white m-0">
              Le Tribunal Déontologique (Loi 1985 &amp; Code 2021)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed m-0">
              Exercez votre discernement juridique et éthique. Face aux pressions de la direction ou des cabinets RH, qualifiez l&apos;infraction, citez les articles de loi et formulez la posture déontologique conforme.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 px-3.5 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-2xs self-start md:self-auto shrink-0">
            <div className="text-right">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block">
                Dilemmes Réussis
              </span>
              <span className="text-lg font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                {score} / {CAS_DEONTOLOGIE_123.length}
              </span>
            </div>
            <Gavel className="size-6 sm:size-7 text-indigo-600 dark:text-indigo-400 shrink-0" />
          </div>
        </div>
      </div>

      {/* Main Dilemma Card */}
      <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200/80 dark:border-slate-800">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
            Cas Pratique n°{currentCasIdx + 1} : {cas.titre}
          </span>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Élisabeth Lucy · Déontologie du Psychologue
          </span>
        </div>

        {/* Narrative Box */}
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong className="text-slate-900 dark:text-slate-200 block mb-1">
              Contexte professionnel :
            </strong>
            {cas.contexte}
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/25 border border-purple-200/80 dark:border-purple-800/40 text-xs text-purple-950 dark:text-purple-200 space-y-1">
            <div className="flex items-center gap-1.5 font-mono font-bold uppercase tracking-wider text-[10px] text-purple-800 dark:text-purple-300">
              <AlertTriangle className="size-3.5 shrink-0" />
              <span>Demande ou Comportement Litigieux :</span>
            </div>
            <p className="italic text-xs sm:text-sm text-purple-950 dark:text-purple-100 leading-relaxed m-0">
              {cas.demandeTiers}
            </p>
          </div>
        </div>

        {/* Verdict Selector */}
        <TribunalVerdictSelector
          cas={cas}
          selectedVerdict={selectedVerdict}
          hasValidated={hasValidated}
          onSelectVerdict={handleSelectVerdict}
        />

        {/* Validation */}
        {!hasValidated ? (
          <div className="flex justify-end pt-1">
            <button
              type="button"
              disabled={!selectedVerdict}
              onClick={handleValidate}
              className={`w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-xs flex items-center gap-2 ${
                selectedVerdict
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer active:scale-95"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
              }`}
            >
              <Gavel className="size-4" />
              <span>Prononcer le Jugement</span>
            </button>
          </div>
        ) : (
          <TribunalDeontoDebrief
            cas={cas}
            selectedVerdict={selectedVerdict}
            onNextCas={handleNextCas}
          />
        )}
      </div>
    </div>
  );
}

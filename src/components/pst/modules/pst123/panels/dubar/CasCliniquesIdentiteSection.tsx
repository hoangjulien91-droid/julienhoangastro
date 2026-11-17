"use client";

import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Quote,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import {
  CAS_CLINIQUES_EXAMEN,
} from "@/lib/pst/data/dubar-sainsaulieu-data";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface CasCliniquesIdentiteSectionProps {
  casScore: number;
  setCasScore: React.Dispatch<React.SetStateAction<number>>;
  solvedCas: Record<string, boolean>;
  setSolvedCas: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export function CasCliniquesIdentiteSection({
  casScore,
  setCasScore,
  solvedCas,
  setSolvedCas,
}: CasCliniquesIdentiteSectionProps) {
  const [currentCasIdx, setCurrentCasIdx] = useState(0);
  const [selectedCasDubar, setSelectedCasDubar] = useState<string | null>(null);
  const [selectedCasSainsaulieu, setSelectedCasSainsaulieu] = useState<string | null>(null);
  const [hasValidatedCas, setHasValidatedCas] = useState(false);

  const currentCas =
    CAS_CLINIQUES_EXAMEN[currentCasIdx] ?? CAS_CLINIQUES_EXAMEN[0];

  const handleValidateCas = () => {
    if (!selectedCasDubar || !selectedCasSainsaulieu) return;
    setHasValidatedCas(true);
    const isCorrectDubar = selectedCasDubar === currentCas.bonneReponseDubar;
    const isCorrectSainsaulieu =
      selectedCasSainsaulieu === currentCas.bonneReponseSainsaulieu;

    if (isCorrectDubar && isCorrectSainsaulieu) {
      playSuccessSound();
      triggerHaptic();
      if (!solvedCas[currentCas.id]) {
        setCasScore((s) => s + 1);
        setSolvedCas((prev) => ({ ...prev, [currentCas.id]: true }));
      }
    } else {
      playReviewSound();
      triggerHaptic();
    }
  };

  const handleNextCas = () => {
    playClickSound();
    triggerHaptic();
    setSelectedCasDubar(null);
    setSelectedCasSainsaulieu(null);
    setHasValidatedCas(false);
    setCurrentCasIdx((i) => (i + 1) % CAS_CLINIQUES_EXAMEN.length);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs space-y-5">
        {/* Cas progress & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200/70 dark:border-slate-800 gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
              <Sparkles className="size-3.5" />
              <span>Cas {currentCasIdx + 1} sur {CAS_CLINIQUES_EXAMEN.length}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white m-0">
              {currentCas.nomSalarie}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 m-0">
              {currentCas.agePoste}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 font-mono font-bold">
              Score : {casScore} / {CAS_CLINIQUES_EXAMEN.length}
            </span>
            <button
              type="button"
              onClick={handleNextCas}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Cas suivant</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Situation & Verbatim */}
        <div className="space-y-3">
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/90 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
            <strong className="text-slate-900 dark:text-slate-200 block mb-1">
              Contexte organisationnel :
            </strong>
            {currentCas.contexte}
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-800/40 relative">
            <div className="flex items-center gap-1.5 text-purple-800 dark:text-purple-300 font-bold text-xs mb-1.5">
              <Quote className="size-4 shrink-0" />
              <span>Verbatim recueilli en entretien :</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-purple-950 dark:text-purple-100 italic leading-relaxed m-0">
              {currentCas.verbatim}
            </p>
          </div>
        </div>

        {/* Answer Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-1">
          {/* Question 1: Dubar */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5">
              <span className="size-5 rounded-full bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                1
              </span>
              <span>Forme identitaire selon Claude Dubar ?</span>
            </span>

            <div className="grid grid-cols-2 gap-2">
              {(["promotion", "blocage", "conversion", "exclusion"] as const).map((fid) => {
                const isSelected = selectedCasDubar === fid;
                const isCorrect = hasValidatedCas && fid === currentCas.bonneReponseDubar;
                const isWrong = hasValidatedCas && isSelected && !isCorrect;

                return (
                  <button
                    key={fid}
                    type="button"
                    disabled={hasValidatedCas}
                    onClick={() => {
                      setSelectedCasDubar(fid);
                      playClickSound();
                      triggerHaptic();
                    }}
                    className={`p-3 rounded-xl text-xs font-bold border text-left transition-all cursor-pointer ${
                      isCorrect
                        ? "bg-emerald-50/90 dark:bg-emerald-500/20 border-emerald-500 text-emerald-950 dark:text-emerald-200"
                        : isWrong
                        ? "bg-rose-50/90 dark:bg-red-500/20 border-red-500 text-rose-950 dark:text-red-200"
                        : isSelected
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-2xs"
                        : "bg-white dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    <span className="capitalize">{fid}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Sainsaulieu */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 flex items-center gap-1.5">
              <span className="size-5 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                2
              </span>
              <span>Modèle culturel selon Renaud Sainsaulieu ?</span>
            </span>

            <div className="grid grid-cols-2 gap-2">
              {(["fusionnel", "negociation", "affinitaire", "retrait"] as const).map((mid) => {
                const isSelected = selectedCasSainsaulieu === mid;
                const isCorrect = hasValidatedCas && mid === currentCas.bonneReponseSainsaulieu;
                const isWrong = hasValidatedCas && isSelected && !isCorrect;

                return (
                  <button
                    key={mid}
                    type="button"
                    disabled={hasValidatedCas}
                    onClick={() => {
                      setSelectedCasSainsaulieu(mid);
                      playClickSound();
                      triggerHaptic();
                    }}
                    className={`p-3 rounded-xl text-xs font-bold border text-left transition-all cursor-pointer ${
                      isCorrect
                        ? "bg-emerald-50/90 dark:bg-emerald-500/20 border-emerald-500 text-emerald-950 dark:text-emerald-200"
                        : isWrong
                        ? "bg-rose-50/90 dark:bg-red-500/20 border-red-500 text-rose-950 dark:text-red-200"
                        : isSelected
                        ? "bg-purple-600 border-purple-600 text-white shadow-2xs"
                        : "bg-white dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    <span className="capitalize">{mid}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Validation & Correction */}
        {!hasValidatedCas ? (
          <div className="flex justify-end pt-1">
            <button
              type="button"
              disabled={!selectedCasDubar || !selectedCasSainsaulieu}
              onClick={handleValidateCas}
              className={`w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-xs flex items-center gap-2 ${
                selectedCasDubar && selectedCasSainsaulieu
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-95"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
              }`}
            >
              <CheckCircle2 className="size-4" />
              <span>Valider mon diagnostic</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4 pt-3 border-t border-slate-200/80 dark:border-slate-800">
            <div
              className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${
                selectedCasDubar === currentCas.bonneReponseDubar &&
                selectedCasSainsaulieu === currentCas.bonneReponseSainsaulieu
                  ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-500/40 text-emerald-950 dark:text-emerald-200"
                  : "bg-amber-50/80 dark:bg-amber-950/30 border-amber-500/40 text-amber-950 dark:text-amber-200"
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {selectedCasDubar === currentCas.bonneReponseDubar &&
                selectedCasSainsaulieu === currentCas.bonneReponseSainsaulieu ? (
                  <>
                    <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Diagnostic parfait ! (+1 point)</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="size-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Explication du corrigé officiel :</span>
                  </>
                )}
              </div>
              <p className="m-0">{currentCas.explicationCopie}</p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-rose-50/70 dark:bg-slate-950/60 border border-rose-200/80 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-300 space-y-1">
              <div className="font-bold text-rose-700 dark:text-rose-300">
                Piège classique à éviter sur la copie :
              </div>
              <p className="text-slate-700 dark:text-slate-400 m-0 leading-relaxed">
                {currentCas.piegeEviter}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNextCas}
                className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <span>Cas suivant</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  HeartHandshake,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Building,
  Quote,
  Award,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  ETAPES_NEGOCIATION_IOD,
} from "@/lib/pst/data/pst108-iod-data";

export function SimulateurNegociationIOD() {
  const [currentEtapeIdx, setCurrentEtapeIdx] = useState(0);
  const [selectedChoixId, setSelectedChoixId] = useState<string | null>(null);
  const [hasValidated, setHasValidated] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const etape = ETAPES_NEGOCIATION_IOD[currentEtapeIdx];

  const handleSelectChoix = (id: string) => {
    if (hasValidated) return;
    setSelectedChoixId(id);
    playClickSound();
    triggerHaptic("selection");
  };

  const handleValidateAnswer = () => {
    if (!selectedChoixId) return;
    setHasValidated(true);
    const chosen = etape.choix.find((c) => c.id === selectedChoixId);
    if (chosen) {
      setTotalScore((s) => s + chosen.points);

      if (chosen.verdict === "correct") {
        playSuccessSound();
      } else {
        playReviewSound();
      }
      triggerHaptic("success");
    }
  };

  const handleNextStep = () => {
    playClickSound();
    triggerHaptic("selection");
    if (currentEtapeIdx < ETAPES_NEGOCIATION_IOD.length - 1) {
      setCurrentEtapeIdx((i) => i + 1);
      setSelectedChoixId(null);
      setHasValidated(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    playClickSound();
    triggerHaptic("selection");
    setCurrentEtapeIdx(0);
    setSelectedChoixId(null);
    setHasValidated(false);
    setTotalScore(0);
    setIsFinished(false);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/[0.08] via-white/90 to-orange-500/[0.06] dark:from-amber-950/40 dark:via-slate-900/90 dark:to-orange-950/30 p-4 sm:p-6 backdrop-blur-xl shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 border border-amber-500/30">
              <HeartHandshake className="size-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>PST108 · Clinique du Dialogue &amp; Insertion</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-serif font-bold tracking-tight text-slate-900 dark:text-white m-0">
              Le Simulateur de Négociation IOD en Entreprise
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed m-0">
              Incarnez le psychologue du travail intervenant selon la méthode de{" "}
              <b>Francis Valls</b> et <b>Denis Castra</b>. Négociez avec un
              employeur exigeant sans tri préalable, sur la base du travail réel.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 px-3.5 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-2xs self-start md:self-auto shrink-0">
            <div className="text-right">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block">
                Score IOD
              </span>
              <span className="text-lg font-mono font-extrabold text-amber-600 dark:text-amber-400">
                {totalScore} / 20
              </span>
            </div>
            <Award className="size-6 sm:size-7 text-amber-600 dark:text-amber-400 shrink-0" />
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs space-y-5">
          {/* Progress Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/25 text-[11px] font-mono font-bold">
                Étape {currentEtapeIdx + 1} / {ETAPES_NEGOCIATION_IOD.length}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {etape.objectionType}
              </span>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Barème : 5 points par décision
            </span>
          </div>

          {/* DRH Speech Bubble */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-amber-500 relative space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              <Building className="size-4 shrink-0" />
              <span>L&apos;Employeur (DRH d&apos;Entreprise) :</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 italic leading-relaxed m-0">
              {etape.drhReplique}
            </p>
          </div>

          {/* Choices */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Quelle est votre réplique de négociation IOD ?
            </span>

            <div className="space-y-2.5">
              {etape.choix.map((c) => {
                const isSelected = selectedChoixId === c.id;
                const isCorrect = hasValidated && c.verdict === "correct";
                const isWrong =
                  hasValidated && isSelected && c.verdict !== "correct";

                return (
                  <button
                    key={c.id}
                    type="button"
                    disabled={hasValidated}
                    onClick={() => handleSelectChoix(c.id)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${
                      isCorrect
                        ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-semibold"
                        : isWrong
                          ? "bg-rose-50/80 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-200"
                          : isSelected
                            ? "bg-amber-50/90 dark:bg-amber-500/20 border-amber-500 text-amber-950 dark:text-white font-semibold shadow-2xs"
                            : "bg-slate-50/70 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <div
                      className={`size-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold uppercase ${
                        isSelected
                          ? "bg-amber-600 border-amber-600 text-white"
                          : "border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {c.id}
                    </div>
                    <div className="space-y-1">
                      <p className="leading-relaxed m-0">{c.reponseTexte}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Validation & Correction */}
          {!hasValidated ? (
            <div className="flex justify-end pt-1">
              <button
                type="button"
                disabled={!selectedChoixId}
                onClick={handleValidateAnswer}
                className={`w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-xs flex items-center gap-2 ${
                  selectedChoixId
                    ? "bg-amber-600 hover:bg-amber-700 text-white cursor-pointer active:scale-95"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                }`}
              >
                <CheckCircle2 className="size-4" />
                <span>Confirmer ma réponse</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 animate-fadeIn">
              {/* Feedback box */}
              {(() => {
                const chosen = etape.choix.find(
                  (c) => c.id === selectedChoixId,
                );
                const isWin = chosen?.verdict === "correct";

                return (
                  <div
                    className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${
                      isWin
                        ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-500/40 text-emerald-950 dark:text-emerald-200"
                        : "bg-rose-50/80 dark:bg-rose-950/30 border-rose-500/40 text-rose-950 dark:text-rose-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm">
                      {isWin ? (
                        <>
                          <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>
                            Réplique conforme à la méthode IOD (+5 points)
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="size-4 text-rose-600 dark:text-rose-400 shrink-0" />
                          <span>
                            Attention : piège d&apos;intervention (+
                            {chosen?.points} point)
                          </span>
                        </>
                      )}
                    </div>
                    <p className="m-0">{chosen?.justificationTheorique}</p>

                    <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/40 text-slate-800 dark:text-slate-300 italic flex items-start gap-2">
                      <Quote className="size-3.5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                      <span>{chosen?.citationValls}</span>
                    </div>
                  </div>
                );
              })()}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
                >
                  <span>
                    {currentEtapeIdx < ETAPES_NEGOCIATION_IOD.length - 1
                      ? "Étape suivante"
                      : "Voir mon bilan IOD"}
                  </span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* End Screen */
        <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-xs">
          <div className="inline-flex p-4 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            <Award className="size-10 sm:size-12" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white m-0">
              Bilan de Négociation IOD terminé !
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 m-0">
              Votre score final :{" "}
              <strong className="text-amber-600 dark:text-amber-400 font-mono text-xl">
                {totalScore} / 20
              </strong>
            </p>
          </div>

          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 text-left space-y-2">
            <strong className="text-amber-700 dark:text-amber-300 font-mono block uppercase">
              Rappel théorique pour la copie de PST108 (Francis Valls) :
            </strong>
            <ul className="list-disc list-inside space-y-1.5 m-0 pl-0">
              <li>
                <b>Non-tri préalable :</b> l&apos;IOD ne trie pas les
                demandeurs d&apos;emploi mais agit sur les conditions
                d&apos;accueil de l&apos;entreprise.
              </li>
              <li>
                <b>Analyse ergonomique du travail réel :</b> la visite de poste
                déconstruit les critères formels surdimensionnés du diplôme ou de
                l&apos;expérience.
              </li>
              <li>
                <b>Médiation bilatérale :</b> le suivi à J+15 et J+30 sécurise
                les deux parties et prévient la réactivation des stéréotypes.
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={handleRestart}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs inline-flex items-center gap-2 transition-all cursor-pointer active:scale-95 shadow-xs"
          >
            <RotateCcw className="size-4" />
            <span>Recommencer la simulation</span>
          </button>
        </div>
      )}
    </div>
  );
}

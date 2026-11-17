"use client";

import { Clock, Layers, Sparkles } from "lucide-react";
import { PST108_PROF_EXAMS, type AnnalePst108Item, type Pst108ProfId } from "@/lib/pst/data/pst108-annales";
import {
  PROF_ORDER,
  PROF_UI,
  TOTAL_EXAM_SECONDS,
  fmtTime,
} from "@/lib/pst/data/pst108-examen-data";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface Examen108OverviewHeaderProps {
  activeProf: Pst108ProfId;
  onSelectProf: (prof: Pst108ProfId) => void;
  fullExamMode: boolean;
  onToggleFullExamMode: () => void;
  elapsedByProf: Record<Pst108ProfId, number>;
  finishedByProf: Record<Pst108ProfId, boolean>;
  recordedScores: Record<Pst108ProfId, number | null>;
  subjectsByProf: Record<Pst108ProfId, AnnalePst108Item[]>;
  onGoNextProf: () => void;
}

export function Examen108OverviewHeader({
  activeProf,
  onSelectProf,
  fullExamMode,
  onToggleFullExamMode,
  elapsedByProf,
  finishedByProf,
  recordedScores,
  subjectsByProf,
  onGoNextProf,
}: Examen108OverviewHeaderProps) {
  const totalElapsed3h =
    elapsedByProf.lucy + elapsedByProf.valls + elapsedByProf.marot;
  const completedPartsCount = PROF_ORDER.filter((p) => finishedByProf[p]).length;

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-indigo-500/20 shadow-xs space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/25">
            <Clock className="size-3" />
            <span>PST108 · Épreuve Finale de 3h00 = 3 × 1h00 par Enseignant</span>
          </div>
          <h2 className="text-lg sm:text-xl font-serif font-black text-slate-900 dark:text-white m-0">
            Les 3 Petits Examens d&apos;1h00 (Lucy · Valls · Marot)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed m-0">
            L&apos;examen de <b>PST108 dure 3h00</b> mais est divisé en{" "}
            <b>3 épreuves distinctes de 1h00 chacune</b>, rédigées et corrigées
            indépendamment par chaque professeur. Entraînez-vous soit{" "}
            <b>professeur par professeur (format 1h00)</b>, soit en{" "}
            <b>enchaînant le parcours complet 3h00</b>.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            triggerHaptic("selection");
            onToggleFullExamMode();
          }}
          className={`px-3.5 py-2 rounded-2xl text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            fullExamMode
              ? "bg-amber-600 text-white border-amber-600 shadow-sm"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-amber-500/50"
          }`}
        >
          <Layers className="size-4" />
          <span>
            {fullExamMode
              ? `Parcours 3h00 actif (${fmtTime(totalElapsed3h)} / 3h00)`
              : "Activer le Parcours Complet 3h00"}
          </span>
        </button>
      </div>

      {/* Barre récapitulative des 3 épreuves */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PROF_ORDER.map((profId, index) => {
          const meta = PST108_PROF_EXAMS[profId];
          const pUi = PROF_UI[profId];
          const Icon = pUi.icon;
          const isSelected = activeProf === profId;
          const isDone = finishedByProf[profId];
          const pElapsed = elapsedByProf[profId];
          const pCount = subjectsByProf[profId].length;
          const pScore = recordedScores[profId];

          return (
            <button
              key={profId}
              type="button"
              onClick={() => onSelectProf(profId)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                isSelected
                  ? pUi.cardActive
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`size-8 rounded-xl border flex items-center justify-center shrink-0 ${pUi.badgeBg}`}
                  >
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400">
                      Partie {index + 1} · 1h00
                    </div>
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      {meta.nom}
                    </div>
                  </div>
                </div>

                {isDone ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    ✓ Terminée
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {pCount} sujets
                  </span>
                )}
              </div>

              <div className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-snug">
                {meta.sousTitre}
              </div>

              <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/70 dark:border-slate-800 text-[11px] font-mono">
                <span className="text-slate-500 dark:text-slate-400">
                  Chrono : <b className="text-slate-800 dark:text-slate-200">{fmtTime(pElapsed)}</b> / 60:00
                </span>
                {pScore !== null ? (
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    Auto-éval : {pScore}/20
                  </span>
                ) : (
                  <span className="font-semibold text-slate-500">
                    {isSelected ? "● Actif" : "Ouvrir →"}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {fullExamMode && (
        <div className="p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/25 border border-amber-500/25 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-semibold">
            <Sparkles className="size-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              Épreuve globale 3h00 : {completedPartsCount}/3 sous-épreuves terminées · Temps cumulé :{" "}
              <span className="font-mono font-bold">{fmtTime(totalElapsed3h)}</span> /{" "}
              <span className="font-mono">{fmtTime(TOTAL_EXAM_SECONDS)}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={onGoNextProf}
            className="px-3 py-1 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer transition-colors"
          >
            Passer au prof suivant →
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, Wand2, Check } from "lucide-react";
import type { PiegeLangageItem, TargetUeFilter } from "@/lib/pst/data/correcteur-copie-data";
import type { CopieAnalysis } from "@/lib/pst/data/correcteur-copie-engine";

interface CorrecteurDiagnosticPanelProps {
  targetUe: TargetUeFilter;
  texteCopie: string;
  analysis: CopieAnalysis;
  onReplaceSingleTrap: (piege: PiegeLangageItem) => void;
  onReplaceAllTraps: () => void;
}

export function CorrecteurDiagnosticPanel({
  targetUe,
  texteCopie,
  analysis,
  onReplaceSingleTrap,
  onReplaceAllTraps,
}: CorrecteurDiagnosticPanelProps) {
  const {
    noteSur20,
    score,
    piegesDetectes,
    hasRealSentences,
    isHorsSujetUe,
    ptsProblematisation,
    ptsAuteurs,
    ptsClinique,
    ptsPosture,
    auteursPresents,
    auteursArticules,
  } = analysis;

  return (
    <div className="space-y-3.5">
      {/* Simulated CNAM Rubric Card (/20) */}
      <div className="p-4 rounded-xl bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 block tracking-wider">
              Simulateur Barème Jury CNAM ({targetUe === "ALL" ? "Transversal" : targetUe})
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span
                className={`text-2xl sm:text-3xl font-black font-mono ${
                  noteSur20 >= 15
                    ? "text-emerald-600 dark:text-emerald-400"
                    : noteSur20 >= 10
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {noteSur20} / 20
              </span>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                (Rigueur : {score}%)
              </span>
            </div>
          </div>

          <div className="text-right text-xs">
            {piegesDetectes.length === 0 ? (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold text-[11px]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>0 biais RH</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 font-bold text-[11px]">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>{piegesDetectes.length} biais RH</span>
              </span>
            )}
          </div>
        </div>

        {/* Anti-Keyword-Stuffing & Hors-sujet Warnings */}
        {texteCopie.trim() && !hasRealSentences && (
          <div className="p-2.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-[11px] text-amber-800 dark:text-amber-200 font-medium">
            ⚠️ <strong>Anti-bourrage actif :</strong> Votre texte contient moins de 2 phrases complètes ou moins de 35 mots. Le barème est plafonné tant que les concepts ne sont pas rédigés dans de vraies phrases.
          </div>
        )}

        {isHorsSujetUe && (
          <div className="p-2.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-[11px] text-rose-800 dark:text-rose-200 font-medium">
            🚨 <strong>Alerte Hors-Sujet ({targetUe}) :</strong> Vous avez sélectionné <strong>{targetUe}</strong> mais aucun auteur fondamental de cette UE n&apos;est mobilisé (note d&apos;auteurs plafonnée à 2.5/8).
          </div>
        )}

        {/* 4 Criteria Breakdown */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/80 dark:border-slate-800/80 text-[11px]">
          <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
            <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
              <span>1. Dialectique</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400">{ptsProblematisation}/4</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-indigo-500 transition-all"
                style={{ width: `${(ptsProblematisation / 4) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
            <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
              <span>2. Auteurs liés</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">{ptsAuteurs}/8</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all"
                style={{ width: `${(ptsAuteurs / 8) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
            <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
              <span>3. Ancrage Clinique</span>
              <span className="font-mono text-amber-600 dark:text-amber-400">{ptsClinique}/5</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all"
                style={{ width: `${(ptsClinique / 5) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
            <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
              <span>4. Posture Anti-RH</span>
              <span className="font-mono text-rose-600 dark:text-rose-400">{ptsPosture}/3</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-rose-500 transition-all"
                style={{ width: `${(ptsPosture / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Detected Pitfalls list */}
      {piegesDetectes.length > 0 && (
        <div className="space-y-2 max-h-52 overflow-y-auto pr-1 scrollbar-thin">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase text-rose-600 dark:text-rose-400 tracking-wider">
              Pièges de Psychologisation ({piegesDetectes.length}) :
            </span>
            <button
              type="button"
              onClick={onReplaceAllTraps}
              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm transition-all cursor-pointer"
            >
              <Wand2 className="size-3" />
              <span>Tout corriger en 1 clic</span>
            </button>
          </div>
          {piegesDetectes.map((p, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-rose-50/90 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/40 text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-rose-800 dark:text-rose-300 font-bold">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  <span>À bannir : « {p.termeDetecte} »</span>
                </div>
                <button
                  type="button"
                  onClick={() => onReplaceSingleTrap(p)}
                  className="px-2 py-0.5 rounded-md bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                >
                  <Wand2 className="size-2.5" />
                  <span>Remplacer</span>
                </button>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-snug">
                {p.explication}
              </p>
              <div className="pt-1 border-t border-rose-200/80 dark:border-rose-900/30 text-emerald-700 dark:text-emerald-300 text-[11px]">
                <strong>Remplacement CNAM :</strong> {p.remplacementRecommande}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Auteurs Scanner with Anti-Name-Dropping Check */}
      <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
            Couplage Auteurs ↔ Concepts ({auteursArticules.length}/{auteursPresents.length}) :
          </span>
        </div>
        <div className="space-y-1.5">
          {auteursPresents.map((a) => (
            <div
              key={a.nom}
              className={`p-2 rounded-lg border text-[11px] flex flex-col gap-0.5 ${
                a.hasConcept
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200"
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1">
                  {a.hasConcept ? (
                    <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <AlertTriangle className="size-3 text-amber-600 dark:text-amber-400" />
                  )}
                  <span>
                    {a.nom} ({a.ues.join("/")})
                  </span>
                </span>
                <span className="text-[10px] font-mono">
                  {a.hasConcept ? "+2.5 pts (Articulé)" : "+1 pt (Name-dropping)"}
                </span>
              </div>
              {!a.hasConcept && (
                <span className="text-[10px] text-amber-800 dark:text-amber-300/90">
                  Ajoutez un concept clé de {a.nom} : <em>{a.conceptLabel}</em>
                </span>
              )}
            </div>
          ))}
          {auteursPresents.length === 0 && (
            <span className="text-xs text-slate-500 italic block">
              Aucun auteur détecté (ex: Wisner, Leplat, Clot, Dejours, Honneth, Austin, Searle, Dubar, Sainsaulieu, Molinier, Rabardel, Bobillier...).
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

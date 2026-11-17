"use client";

import { GraduationCap, Sparkles } from "lucide-react";
import { METHODE_CRITERIA } from "@/lib/pst/data/cas-cliniques-data";

interface CasMethodeBentoCardsProps {
  validCount: number;
  note20: number;
}

export function CasMethodeBentoCards({
  validCount,
  note20,
}: CasMethodeBentoCardsProps) {
  return (
    <>
      {/* Header Banner */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-500/20 backdrop-blur-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-xs">
            <GraduationCap className="size-3.5" />
            <span>Méthodologie Officielle CNAM · Option B /20</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/80 dark:bg-slate-900/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-2xs">
            <Sparkles className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>
              {validCount} / {METHODE_CRITERIA.length} critères validés ({note20}
              /20)
            </span>
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight m-0">
          La Démarche d&apos;Analyse Clinique en 3 Temps Canoniques
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed m-0">
          À l&apos;examen du Titre RNCP 7 Psychologue du Travail, l&apos;étude de
          cas clinique (Option B) sanctionne sévèrement toute posture de « bon
          sens » ou de « gestion RH ». Votre copie doit impérativement articuler
          les 3 temps académiques ci-dessous.
        </p>
      </div>

      {/* 3 Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Temps 1 */}
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
              Temps 1 · 6 Points
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-500">
              Faits &amp; Réel
            </span>
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
            1. Diagnostic Clinique des Faits &amp; Recueil du Travail Réel
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed m-0">
            Relever objectivement ce que font concrètement les opérateurs face aux
            failles de la prescription. Dégager l&apos;écart prescrit vs réel
            (Wisner, Leplat) et les signaux de souffrance (somatisation,
            conflits, turnover).
          </p>
          <div className="p-2.5 rounded-xl bg-blue-500/5 border border-blue-500/15 text-[11px] text-blue-900 dark:text-blue-200 space-y-1">
            <strong className="block font-bold">Règle d&apos;or :</strong>
            <span>
              Ne jamais qualifier un écart de « faute » : c&apos;est une
              régulation pour faire tourner le système.
            </span>
          </div>
        </div>

        {/* Temps 2 */}
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
              Temps 2 · 8 Points
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-500">
              Concepts Clés
            </span>
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
            2. Modélisation Théorique Anti-Psychologisme
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed m-0">
            Interpréter les faits par les concepts du cours (Clot, Wisner,
            Dejours, Sainsaulieu, Dubar, Rabardel). Démontrer que la souffrance
            découle de l&apos;organisation du travail et non d&apos;une faiblesse
            individuelle.
          </p>
          <div className="p-2.5 rounded-xl bg-purple-500/5 border border-purple-500/15 text-[11px] text-purple-900 dark:text-purple-200 space-y-1">
            <strong className="block font-bold">Interdiction absolue :</strong>
            <span>
              Le psychologisme (« manque de résilience », « profil anxieux »).
              Tout est clinique et organisationnel.
            </span>
          </div>
        </div>

        {/* Temps 3 */}
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              Temps 3 · 6 Points
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-500">
              Déontologie
            </span>
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
            3. Préconisations d&apos;Intervention &amp; Déontologie
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed m-0">
            Refuser la commande de sélection ou d&apos;évaluation individuelle
            de la DRH. Restituer collectivement les déterminants du travail et
            réouvrir des espaces de controverse sur le travail bien fait.
          </p>
          <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-500/15 text-[11px] text-emerald-900 dark:text-emerald-200 space-y-1">
            <strong className="block font-bold">Cadre légal impératif :</strong>
            <span>
              Art. 1, 5, 7, 9 du Code 2021 &amp; Secret professionnel (Art.
              226-13 CP).
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

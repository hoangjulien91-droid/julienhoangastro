"use client";

import React from "react";
import {
  METHODE_ANALYSE_PST123,
  CRITERES_EVALUATION_PST123,
} from "@/lib/pst/data/pst123-annales";

export interface Atelier123MethodeSectionProps {
  checkedCriteria: boolean[];
  onToggleCriterion: (i: number) => void;
  doneCriteria: number;
  pctCriteria: number;
}

export function Atelier123MethodeSection({
  checkedCriteria,
  onToggleCriterion,
  doneCriteria,
  pctCriteria,
}: Atelier123MethodeSectionProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Comparatif Option A vs Option B */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
            Option A · Dissertation théorique
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            Question de synthèse conceptuelle (Dubar, Bourdieu, Sainsaulieu,
            Honneth)
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <b>Objectif :</b> Déployer une argumentation académique en
            confrontant les auteurs socles. Analyser les tensions entre
            l&apos;incorporation des normes et l&apos;émancipation du sujet.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            Option B · Analyse de situation / Cas clinique
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            Diagnostic sociologique + Démarche déontologique
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <b>Objectif :</b> Appliquer les grilles d&apos;analyse à un cas
            de restructuration ou de crise identitaire, poser un diagnostic
            d&apos;équipe et formaliser votre posture déontologique de
            psychologue.
          </p>
        </div>
      </div>

      {/* Méthode officielle en 4 étapes */}
      <div className="qbox p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span>
            📋 Méthodologie d&apos;examen en 4 temps (M. Éric Lucy)
          </span>
        </h3>
        <div className="space-y-3">
          {METHODE_ANALYSE_PST123.map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60"
            >
              <div className="font-bold text-xs text-blue-700 dark:text-blue-400 mb-1.5">
                {step.etape}
              </div>
              <ul className="space-y-1 list-disc pl-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {step.regles.map((r, rIdx) => (
                  <li key={rIdx}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Grilles synthétiques fondamentales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <h4 className="font-bold text-xs uppercase tracking-wider text-blue-700 dark:text-blue-400">
            1. La matrice de Claude Dubar
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <b>Double transaction :</b>
            <br />- <i>Relationnelle (pour autrui) :</i> Actes
            d&apos;attribution institutionnels (reconnaissance vs
            non-reconnaissance).
            <br />- <i>Biographique (pour soi) :</i> Actes
            d&apos;appartenance dans le temps (continuité vs rupture).
            <br />
            <b>4 Formes :</b> Promotion interne, Blocage interne, Conversion
            externe, Exclusion externe.
          </p>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            2. L&apos;algorithme de Pierre Bourdieu
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <code>[(Dispositions + Capital) × Champ] = Habitus</code>
            <br />- <i>4 Capitaux :</i> Économique, Culturel (incorporé,
            objectivé, institutionnalisé), Social, Symbolique.
            <br />- <i>La double vérité du travail (1996) :</i> Exploitation
            objective vs Illusio subjective.
          </p>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <h4 className="font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400">
            3. Les 4 modèles de Renaud Sainsaulieu
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            - <i>Fusionnel :</i> Camaraderie unanime de l&apos;atelier
            ouvrier.
            <br />- <i>Retrait :</i> Investissement hors-travail (famille),
            travail purement alimentaire.
            <br />- <i>Négociateur :</i> Expertise, rivalité pacifiée, débat
            démocratique.
            <br />- <i>Affinitaire :</i> Clans électifs, quête de proximité
            hiérarchique.
          </p>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <h4 className="font-bold text-xs uppercase tracking-wider text-purple-700 dark:text-purple-400">
            4. Les 3 sphères d&apos;Axel Honneth
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            - <i>Amour (intime) :</i> Confiance en soi (mépris : violences
            corporelles).
            <br />- <i>Droit (juridique) :</i> Respect de soi (mépris :
            exclusion civique).
            <br />- <i>Solidarité / Travail :</i> Estime de soi (mépris :
            invisibilisation, dévalorisation du care).
          </p>
        </div>
      </div>

      {/* Checklist d'auto-évaluation */}
      <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
            Checklist d&apos;auto-évaluation avant remise ({doneCriteria}/
            {CRITERES_EVALUATION_PST123.length})
          </span>
          <span className="font-bold text-xs text-blue-600">
            {pctCriteria}%
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${pctCriteria}%` }}
          />
        </div>
        <ul className="space-y-2 pt-1">
          {CRITERES_EVALUATION_PST123.map((c, i) => (
            <li key={i}>
              <label className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedCriteria[i]}
                  onChange={() => onToggleCriterion(i)}
                  className="mt-0.5 rounded border-slate-300"
                />
                <span
                  className={
                    checkedCriteria[i] ? "line-through opacity-60" : ""
                  }
                >
                  {c}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

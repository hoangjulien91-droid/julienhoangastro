"use client";

import React from "react";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

export interface Atelier123OralSectionProps {
  oralDuration: number;
  onSetOralDuration: (d: number) => void;
  oralTimeRemaining: number;
  onSetOralTimeRemaining: (t: number) => void;
  oralRunning: boolean;
  onToggleOralRunning: () => void;
  onResetOralTimer: () => void;
  selectedOralCaseIdx: number;
  onSelectOralCaseIdx: (idx: number) => void;
  oralChecklist: boolean[];
  onToggleOralChecklist: (id: number, checked: boolean) => void;
}

export function Atelier123OralSection({
  oralDuration,
  onSetOralDuration,
  oralTimeRemaining,
  onSetOralTimeRemaining,
  oralRunning,
  onToggleOralRunning,
  onResetOralTimer,
  selectedOralCaseIdx,
  onSelectOralCaseIdx,
  oralChecklist,
  onToggleOralChecklist,
}: Atelier123OralSectionProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Hero Banner Oral */}
      <div className="p-5 sm:p-6 rounded-2xl bg-linear-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/25 dark:border-indigo-500/20 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 inline-flex items-center gap-1.5">
              <span>🎤 Séances 4 &amp; 5 · Présentation de Situation de Travail</span>
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
              Simulateur d&apos;Épreuve Orale &amp; Étude de Cas
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 m-0 max-w-2xl leading-relaxed">
              Entraînez-vous à exposer oralement l&apos;analyse sociologique d&apos;une situation de travail en 10 ou 15 minutes, selon les critères stricts d&apos;Élisabeth Lucy.
            </p>
          </div>

          {/* Chrono Widget */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 shadow-sm flex flex-col items-center gap-2 shrink-0 min-w-[210px]">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
              Chronomètre Oral
            </div>
            <div
              className={`text-3xl font-mono font-black tracking-tight ${
                oralTimeRemaining <= 60
                  ? "text-rose-600 animate-pulse"
                  : oralTimeRemaining <= 180
                    ? "text-amber-500"
                    : "text-indigo-600 dark:text-indigo-400"
              }`}
            >
              {String(Math.floor(oralTimeRemaining / 60)).padStart(2, "0")}:
              {String(oralTimeRemaining % 60).padStart(2, "0")}
            </div>

            <div className="flex items-center gap-1.5 w-full">
              <button
                type="button"
                onClick={onToggleOralRunning}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all text-white cursor-pointer ${
                  oralRunning
                    ? "bg-amber-600 hover:bg-amber-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {oralRunning ? "Pause" : "Démarrer"}
              </button>
              <button
                type="button"
                onClick={onResetOralTimer}
                className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                title="Réinitialiser le chrono"
              >
                Reset
              </button>
            </div>

            {/* Duration switch */}
            <div className="flex items-center gap-1 pt-1 text-[10px] font-mono">
              <span className="text-slate-400">Durée :</span>
              <button
                type="button"
                onClick={() => {
                  onSetOralDuration(10 * 60);
                  onSetOralTimeRemaining(10 * 60);
                }}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${
                  oralDuration === 10 * 60
                    ? "bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 font-bold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                10 min
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => {
                  onSetOralDuration(15 * 60);
                  onSetOralTimeRemaining(15 * 60);
                }}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${
                  oralDuration === 15 * 60
                    ? "bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 font-bold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                15 min
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Oral Case Selection */}
      <div className="space-y-2">
        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
          1. Choisir une Situation de Travail d&apos;Entraînement :
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {[
            {
              id: 0,
              title: "L'Aide-Soignante faisant fonction de Cadre",
              focus: "Transaction biographique rompue & Rejet des pairs",
              desc: "Mme D., 45 ans, soignante dévouée promue cadre sans titre. Coincée entre loyauté soignante héritée et impératifs comptables.",
            },
            {
              id: 1,
              title: "Le Technicien Supérieur bloqué coefficient 300",
              focus: "Identité bloquée (Dubar) & Violence symbolique",
              desc: "M. T., 52 ans, autodidacte expert. L'arrivée de jeunes ingénieurs diplômés le relègue aux tâches subalternes.",
            },
            {
              id: 2,
              title: "L'Ingénieur R&D suite au rachat d'entreprise",
              focus: "Perte de l'illusio (Bourdieu) & Modèle du retrait",
              desc: "Mme V., 38 ans, chercheuse passionnée. Le nouveau management par KPI financiarise les projets et détruit le sens.",
            },
          ].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                onSelectOralCaseIdx(c.id);
              }}
              className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                selectedOralCaseIdx === c.id
                  ? "bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 shadow-xs ring-2 ring-indigo-500/20"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300"
              }`}
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                  Cas n°{c.id + 1}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 m-0 leading-tight">
                  {c.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug m-0 pt-1">
                  {c.desc}
                </p>
              </div>
              <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 mt-2 font-semibold">
                Concepts : {c.focus}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Trame d'Exposé Oral en 4 Temps */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0 flex items-center gap-2">
          <span>⏱ Trame recommandée pour l&apos;oral de 10–15 minutes :</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-700 dark:text-indigo-400">
                Temps 1 : Situation &amp; Tâche (2 à 3 min)
              </span>
              <span className="font-mono text-[10px] text-slate-400">00:00 - 02:30</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300 m-0">
              <li>Présenter l&apos;acteur, son parcours et le contexte organisationnel.</li>
              <li>Distinguer la prescription officielle (fiche de poste) et le travail réel.</li>
              <li>Formuler la tension centrale vécue par le salarié.</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-700 dark:text-indigo-400">
                Temps 2 : Double Transaction Dubar (4 à 5 min)
              </span>
              <span className="font-mono text-[10px] text-slate-400">02:30 - 07:00</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300 m-0">
              <li><b>Transaction relationnelle</b> : Actes d&apos;attribution institutionnelle (catégorie, reconnaissance/stigmate).</li>
              <li><b>Transaction biographique</b> : Actes d&apos;appartenance subjective (identité héritée vs visée).</li>
              <li>Diagnostiquer la crise : écart entre l&apos;identité pour autrui et l&apos;identité pour soi.</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-700 dark:text-indigo-400">
                Temps 3 : Pouvoir &amp; Modèles Sociaux (3 min)
              </span>
              <span className="font-mono text-[10px] text-slate-400">07:00 - 10:00</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300 m-0">
              <li>Modèle culturel de Sainsaulieu : retrait, fusionnel, négociation, affinitaire.</li>
              <li>Bourdieu : domination symbolique, dévaluation du capital culturel/spécifique.</li>
              <li>Honneth : quelle sphère de reconnaissance est bafouée (droit, estime sociale) ?</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-700 dark:text-indigo-400">
                Temps 4 : Posture du Psychologue (2 à 3 min)
              </span>
              <span className="font-mono text-[10px] text-slate-400">10:00 - 12:30</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300 m-0">
              <li>Triangulation de la commande managériale vs la demande du salarié.</li>
              <li>Garanties déontologiques : consentement éclairé, secret professionnel, indépendance.</li>
              <li>Préconisations : ouvrir des espaces de dialogue sur le métier.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Grille d'Auto-Évaluation de la Prestation Orale */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
              Grille d&apos;Évaluation de votre Oral (Barème officiel Cnam)
            </h4>
            <p className="text-xs text-slate-500 m-0">
              Cochez les critères validés pendant votre simulation :
            </p>
          </div>
          <div className="text-right">
            <span className="text-lg font-mono font-black text-indigo-600 dark:text-indigo-400">
              {oralChecklist.filter(Boolean).length * 3 +
                (oralChecklist[1] && oralChecklist[2] ? 2 : 0)}
              /20
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {[
            {
              id: 0,
              label: "1. Présentation claire et contextualisée de la situation de travail réelle",
              pts: "3 pts",
            },
            {
              id: 1,
              label: "2. Analyse rigoureuse de la transaction biographique (identité pour soi / héritée vs visée)",
              pts: "4 pts",
            },
            {
              id: 2,
              label: "3. Analyse rigoureuse de la transaction relationnelle (identité pour autrui / attribution patronale)",
              pts: "4 pts",
            },
            {
              id: 3,
              label: "4. Mobilisation d'un second auteur (Sainsaulieu, Bourdieu, Honneth ou Weber)",
              pts: "3 pts",
            },
            {
              id: 4,
              label: "5. Respect du cadre déontologique du psychologue (Loi 1985, neutralité, mandat)",
              pts: "3 pts",
            },
            {
              id: 5,
              label: "6. Maîtrise du temps imparti (10–15 min) et clarté de l'expression orale",
              pts: "3 pts",
            },
          ].map((crit) => (
            <label
              key={crit.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 cursor-pointer hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={oralChecklist[crit.id] || false}
                  onChange={(e) => {
                    triggerHaptic("selection");
                    playClickSound();
                    onToggleOralChecklist(crit.id, e.target.checked);
                  }}
                  className="size-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                  {crit.label}
                </span>
              </div>
              <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-bold shrink-0">
                {crit.pts}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

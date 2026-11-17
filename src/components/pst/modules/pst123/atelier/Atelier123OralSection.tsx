"use client";

import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";
import { Atelier123OralBanner } from "./oral/Atelier123OralBanner";
import { Atelier123OralGrille } from "./oral/Atelier123OralGrille";

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

const ORAL_CASES = [
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
];

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
      {/* Hero Banner & Chrono Widget */}
      <Atelier123OralBanner
        oralDuration={oralDuration}
        onSetOralDuration={onSetOralDuration}
        oralTimeRemaining={oralTimeRemaining}
        onSetOralTimeRemaining={onSetOralTimeRemaining}
        oralRunning={oralRunning}
        onToggleOralRunning={onToggleOralRunning}
        onResetOralTimer={onResetOralTimer}
      />

      {/* Oral Case Selection */}
      <div className="space-y-2">
        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
          1. Choisir une Situation de Travail d&apos;Entraînement :
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {ORAL_CASES.map((c) => (
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
              <span className="font-mono text-[10px] text-slate-400">
                00:00 - 02:30
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300 m-0">
              <li>
                Présenter l&apos;acteur, son parcours et le contexte
                organisationnel.
              </li>
              <li>
                Distinguer la prescription officielle (fiche de poste) et le
                travail réel.
              </li>
              <li>Formuler la tension centrale vécue par le salarié.</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-700 dark:text-indigo-400">
                Temps 2 : Double Transaction Dubar (4 à 5 min)
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                02:30 - 07:00
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300 m-0">
              <li>
                <b>Transaction relationnelle</b> : Actes d&apos;attribution
                institutionnelle (catégorie, reconnaissance/stigmate).
              </li>
              <li>
                <b>Transaction biographique</b> : Actes d&apos;appartenance
                subjective (identité héritée vs visée).
              </li>
              <li>
                Diagnostiquer la crise : écart entre l&apos;identité pour autrui
                et l&apos;identité pour soi.
              </li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-700 dark:text-indigo-400">
                Temps 3 : Pouvoir &amp; Modèles Sociaux (3 min)
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                07:00 - 10:00
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300 m-0">
              <li>
                Modèle culturel de Sainsaulieu : retrait, fusionnel, négociation,
                affinitaire.
              </li>
              <li>
                Bourdieu : domination symbolique, dévaluation du capital
                culturel/spécifique.
              </li>
              <li>
                Honneth : quelle sphère de reconnaissance est bafouée (droit,
                estime sociale) ?
              </li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-700 dark:text-indigo-400">
                Temps 4 : Posture du Psychologue (2 à 3 min)
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                10:00 - 12:30
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300 m-0">
              <li>
                Triangulation de la commande managériale vs la demande du
                salarié.
              </li>
              <li>
                Garanties déontologiques : consentement éclairé, secret
                professionnel, indépendance.
              </li>
              <li>
                Préconisations : ouvrir des espaces de dialogue sur le métier.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Grille d'Auto-Évaluation de la Prestation Orale */}
      <Atelier123OralGrille
        oralChecklist={oralChecklist}
        onToggleOralChecklist={onToggleOralChecklist}
      />
    </div>
  );
}

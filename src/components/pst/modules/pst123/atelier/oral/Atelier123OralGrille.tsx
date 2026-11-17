"use client";

import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface Atelier123OralGrilleProps {
  oralChecklist: boolean[];
  onToggleOralChecklist: (id: number, checked: boolean) => void;
}

const CRITERES_ORAL = [
  {
    id: 0,
    label:
      "1. Présentation claire et contextualisée de la situation de travail réelle",
    pts: "3 pts",
  },
  {
    id: 1,
    label:
      "2. Analyse rigoureuse de la transaction biographique (identité pour soi / héritée vs visée)",
    pts: "4 pts",
  },
  {
    id: 2,
    label:
      "3. Analyse rigoureuse de la transaction relationnelle (identité pour autrui / attribution patronale)",
    pts: "4 pts",
  },
  {
    id: 3,
    label:
      "4. Mobilisation d'un second auteur (Sainsaulieu, Bourdieu, Honneth ou Weber)",
    pts: "3 pts",
  },
  {
    id: 4,
    label:
      "5. Respect du cadre déontologique du psychologue (Loi 1985, neutralité, mandat)",
    pts: "3 pts",
  },
  {
    id: 5,
    label:
      "6. Maîtrise du temps imparti (10–15 min) et clarté de l'expression orale",
    pts: "3 pts",
  },
];

export function Atelier123OralGrille({
  oralChecklist,
  onToggleOralChecklist,
}: Atelier123OralGrilleProps) {
  const score =
    oralChecklist.filter(Boolean).length * 3 +
    (oralChecklist[1] && oralChecklist[2] ? 2 : 0);

  return (
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
            {score}/20
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {CRITERES_ORAL.map((crit) => (
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
  );
}

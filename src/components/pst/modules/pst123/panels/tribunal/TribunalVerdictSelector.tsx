"use client";

import type { CasDeonto123 } from "@/lib/pst/data/tribunal-deonto-data";

interface TribunalVerdictSelectorProps {
  cas: CasDeonto123;
  selectedVerdict: "conforme" | "manquement_code" | "delit_penal" | null;
  hasValidated: boolean;
  onSelectVerdict: (v: "conforme" | "manquement_code" | "delit_penal") => void;
}

const VERDICT_OPTIONS = [
  {
    id: "conforme",
    label: "Pratique Conforme",
    desc: "Aucune infraction à la loi ni au code de déontologie.",
  },
  {
    id: "manquement_code",
    label: "Manquement Déontologique",
    desc: "Infraction au Code de Déontologie 2021 (principe d'intégrité, de rigueur ou de but assigné).",
  },
  {
    id: "delit_penal",
    label: "Délit Pénal / Légal",
    desc: "Infraction au Code Pénal (secret professionnel ou usurpation de titre Loi 1985).",
  },
] as const;

export function TribunalVerdictSelector({
  cas,
  selectedVerdict,
  hasValidated,
  onSelectVerdict,
}: TribunalVerdictSelectorProps) {
  return (
    <div className="space-y-3 pt-1">
      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
        Quelle est la qualification juridique et déontologique ?
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {VERDICT_OPTIONS.map((opt) => {
          const isSelected = selectedVerdict === opt.id;
          const isCorrect = hasValidated && opt.id === cas.qualificationAttendue;
          const isWrong = hasValidated && isSelected && !isCorrect;

          return (
            <button
              key={opt.id}
              type="button"
              disabled={hasValidated}
              onClick={() => onSelectVerdict(opt.id)}
              className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between space-y-2 cursor-pointer ${
                isCorrect
                  ? "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold"
                  : isWrong
                  ? "bg-rose-50/90 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-200"
                  : isSelected
                  ? "bg-indigo-50/90 dark:bg-indigo-600/30 border-indigo-500 text-indigo-950 dark:text-white font-semibold shadow-2xs"
                  : "bg-slate-50/80 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-800/60"
              }`}
            >
              <div className="space-y-1">
                <span className="text-sm font-bold block">{opt.label}</span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug m-0">
                  {opt.desc}
                </p>
              </div>
              {isSelected && (
                <div className="text-[10px] font-mono uppercase font-bold text-indigo-600 dark:text-indigo-400">
                  Choix sélectionné
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

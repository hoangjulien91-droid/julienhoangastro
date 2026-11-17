"use client";

import { UserCheck, Sparkles, ArrowRight } from "lucide-react";
import type {
  RoleplayScenario,
  ScenarioStep,
  ScenarioChoice,
} from "@/lib/pst/data/roleplay-scenarios-data";

interface RoleplayDialogueStepProps {
  scenario: RoleplayScenario;
  step: ScenarioStep;
  stepIndex: number;
  totalSteps: number;
  chosenOptionId: string | null;
  onChoose: (choice: ScenarioChoice) => void;
  onNext: () => void;
}

export function RoleplayDialogueStep({
  scenario,
  step,
  stepIndex,
  totalSteps,
  chosenOptionId,
  onChoose,
  onNext,
}: RoleplayDialogueStepProps) {
  return (
    <div className="space-y-4">
      {/* Contexte & Rôles */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold">
          <span className="text-teal-700 dark:text-teal-300 flex items-center gap-1">
            <UserCheck className="size-3.5" />
            Votre rôle : {scenario.roleUtilisateur}
          </span>
          <span className="text-slate-400 font-mono">
            Étape {stepIndex + 1} / {totalSteps}
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic m-0">
          « {scenario.contexteInitial} »
        </p>
      </div>

      {/* Réplique de l'interlocuteur */}
      <div className="p-4 rounded-3xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-1">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
          {scenario.interlocuteur} s&apos;exprime :
        </span>
        <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 m-0">
          {step.interlocuteurReplique}
        </p>
      </div>

      {/* Choix d'action de l'utilisateur */}
      <div className="space-y-2 pt-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
          Quelle posture clinique adoptez-vous ?
        </span>

        {step.choix.map((opt) => {
          const isSelected = chosenOptionId === opt.id;
          const isDone = chosenOptionId !== null;

          let style =
            "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-teal-400";
          if (isDone) {
            if (opt.isOptimal) {
              style =
                "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/30";
            } else if (isSelected && !opt.isOptimal) {
              style =
                "bg-rose-50 dark:bg-rose-950/30 border-rose-500 text-rose-950 dark:text-rose-100";
            } else {
              style = "opacity-45 border-slate-200 dark:border-slate-800";
            }
          }

          return (
            <div
              key={opt.id}
              onClick={() => onChoose(opt)}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${style}`}
            >
              <p className="text-xs sm:text-sm font-medium leading-relaxed m-0">
                {opt.texte}
              </p>

              {isDone && isSelected && (
                <div
                  className={`p-3 rounded-xl text-xs animate-fadeIn space-y-1 ${
                    opt.isOptimal
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200"
                      : "bg-rose-500/10 border border-rose-500/20 text-rose-900 dark:text-rose-200"
                  }`}
                >
                  <p className="font-bold flex items-center gap-1">
                    <Sparkles className="size-3.5" />
                    Analyse de votre posture :
                  </p>
                  <p className="leading-relaxed m-0">
                    {opt.feedbackClinique}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {chosenOptionId !== null && (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onNext}
            className="px-5 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Poursuivre la négociation</span>
            <ArrowRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}

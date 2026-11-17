"use client";

import React from "react";
import { Award, RotateCcw } from "lucide-react";

interface AutoconfrontationFinalViewProps {
  score: number;
  onRestart: () => void;
}

export const AutoconfrontationFinalView: React.FC<
  AutoconfrontationFinalViewProps
> = ({ score, onRestart }) => {
  return (
    <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-xs">
      <div className="inline-flex p-4 rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30">
        <Award className="size-10 sm:size-12" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white m-0">
          Simulation d&apos;Autoconfrontation Terminée !
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 m-0">
          Score de posture clinique :{" "}
          <strong className="text-teal-600 dark:text-teal-400 font-mono text-xl">
            {score} / 20
          </strong>
        </p>
      </div>

      <div className="max-w-xl mx-auto p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 text-left space-y-2">
        <strong className="text-teal-700 dark:text-teal-300 font-mono block uppercase">
          Les 4 lois d&apos;airain de la clinique de l&apos;activité (Yves Clot) :
        </strong>
        <ul className="list-disc list-inside space-y-1.5 m-0 pl-0">
          <li>
            <b>Ne jamais demander « Pourquoi » :</b> traquer le « comment » pour
            faire émerger l&apos;analyse du geste sans culpabilité.
          </li>
          <li>
            <b>Nourrir la controverse :</b> le conflit de métier entre pairs est
            le poumon du genre professionnel.
          </li>
          <li>
            <b>Le sosie (Oddone) :</b> fictivité totale pour obliger le
            travailleur à devenir instructeur de son travail.
          </li>
          <li>
            <b>Restituer le pouvoir d&apos;agir :</b> les opérateurs doivent
            présenter eux-mêmes leurs arbitrages à la direction.
          </li>
        </ul>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs inline-flex items-center gap-2 transition-all cursor-pointer active:scale-95 shadow-xs"
      >
        <RotateCcw className="size-4" />
        <span>Recommencer l&apos;intervention</span>
      </button>
    </div>
  );
};

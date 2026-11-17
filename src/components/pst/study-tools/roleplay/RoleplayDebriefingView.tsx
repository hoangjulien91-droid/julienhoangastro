"use client";

import { Award, RotateCcw } from "lucide-react";

interface RoleplayDebriefingViewProps {
  allianceScore: number;
  deontoScore: number;
  debriefingFinal: string;
  onReplay: () => void;
  onClose: () => void;
}

export function RoleplayDebriefingView({
  allianceScore,
  deontoScore,
  debriefingFinal,
  onReplay,
  onClose,
}: RoleplayDebriefingViewProps) {
  return (
    <div className="py-6 text-center space-y-5 animate-fadeIn">
      <div className="inline-flex size-20 rounded-3xl bg-gradient-to-tr from-teal-500 to-indigo-500 text-white items-center justify-center shadow-lg">
        <Award className="size-10 animate-bounce" />
      </div>

      <div className="space-y-1">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
          Scénario Clinique Réussi !
        </h3>
        <p className="text-xs sm:text-sm text-slate-500">
          Bilan de votre négociation en situation professionnelle réelle
        </p>
      </div>

      {/* Jauges finales */}
      <div className="max-w-md mx-auto grid grid-cols-2 gap-3 p-4 rounded-3xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase block">
            Alliance Partenaire
          </span>
          <span className="text-2xl font-black text-teal-600">
            {allianceScore}%
          </span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase block">
            Rigueur Déontologique
          </span>
          <span className="text-2xl font-black text-indigo-600">
            {deontoScore}%
          </span>
        </div>
      </div>

      {/* Débriefing doctrinal */}
      <div className="max-w-md mx-auto p-4 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/50 text-left text-xs text-slate-800 dark:text-slate-200 space-y-1">
        <span className="font-bold text-indigo-700 dark:text-indigo-300 block">
          💡 Débriefing officiel du professeur Cnam :
        </span>
        <p className="leading-relaxed m-0 italic font-serif">
          « {debriefingFinal} »
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onReplay}
          className="px-6 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="size-4" />
          <span>Rejouer le cas</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2.5 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm hover:bg-slate-300 transition-all cursor-pointer"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

import { Trophy, RotateCcw } from "lucide-react";

interface BlindTestFinishedViewProps {
  score: number;
  onRestart: () => void;
  onClose: () => void;
}

export function BlindTestFinishedView({
  score,
  onRestart,
  onClose,
}: BlindTestFinishedViewProps) {
  return (
    <div className="py-6 text-center space-y-5 animate-fadeIn">
      <div className="inline-flex size-20 rounded-3xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white items-center justify-center shadow-lg">
        <Trophy className="size-10 animate-bounce" />
      </div>

      <div className="space-y-1">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          Défi Citations Terminé !
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Votre maîtrise des auteurs et théories Cnam est affûtée
        </p>
      </div>

      <div className="max-w-xs mx-auto p-4 rounded-3xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-center">
        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase block">
          Score Final
        </span>
        <span className="text-3xl font-black text-violet-600 dark:text-violet-400">
          {score} pts
        </span>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onRestart}
          className="px-5 sm:px-6 py-2.5 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="size-4" />
          <span>Rejouer</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-5 sm:px-6 py-2.5 rounded-2xl bg-slate-200/80 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs sm:text-sm hover:bg-slate-300 dark:hover:bg-slate-700 transition-all cursor-pointer"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

import { Eye, Copy, Check } from "lucide-react";

interface IntroLivePreviewProps {
  scoreIntro: number;
  wordCount: number;
  fullIntroduction: string;
  copied: boolean;
  onCopy: () => void;
}

export function IntroLivePreview({
  scoreIntro,
  wordCount,
  fullIntroduction,
  copied,
  onCopy,
}: IntroLivePreviewProps) {
  return (
    <div className="bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              Rendu Final pour la Copie
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            {wordCount} mots · Score : {scoreIntro}/5
          </span>
        </div>

        {/* Score bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300"
            style={{ width: `${(scoreIntro / 5) * 100}%` }}
          />
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-800 dark:text-slate-200 font-serif leading-relaxed max-h-[380px] overflow-y-auto whitespace-pre-wrap scrollbar-thin">
          {fullIntroduction || (
            <span className="text-slate-400 dark:text-slate-500 italic">
              Remplissez les étapes à gauche ou chargez un sujet modèle pour voir
              l&apos;introduction complète s&apos;assembler...
            </span>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          Recommandé : 250 à 400 mots
        </span>
        <button
          disabled={!fullIntroduction.trim()}
          onClick={onCopy}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            fullIntroduction.trim()
              ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20 dark:shadow-indigo-950/40"
              : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
          }`}
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-300" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span>
            {copied ? "Introduction copiée !" : "Copier l'introduction"}
          </span>
        </button>
      </div>
    </div>
  );
}

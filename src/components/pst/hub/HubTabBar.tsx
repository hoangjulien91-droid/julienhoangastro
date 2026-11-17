"use client";

export type HubTab = "essentiel" | "exercices" | "referentiel" | "cursus";

interface HubTabBarProps {
  activeTab: HubTab;
  onTabChange: (tab: HubTab) => void;
}

export function HubTabBar({ activeTab, onTabChange }: HubTabBarProps) {
  return (
    <div className="pt-2 mb-6 border-t border-slate-200/80 dark:border-slate-800">
      <div className="flex justify-center overflow-x-auto pb-1 scrollbar-none">
        <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-md">
          <button
            type="button"
            onClick={() => onTabChange("essentiel")}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "essentiel"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            ✨ L&apos;Essentiel &amp; Synthèses
          </button>
          <button
            type="button"
            onClick={() => onTabChange("exercices")}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "exercices"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            🎯 Outils 18/20 &amp; Exercices
          </button>
          <button
            type="button"
            onClick={() => onTabChange("referentiel")}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "referentiel"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            📐 Schémas, Frise &amp; Lexique
          </button>
          <button
            type="button"
            onClick={() => onTabChange("cursus")}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "cursus"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            🎓 Cursus RNCP, Stats &amp; Synchro
          </button>
        </div>
      </div>
    </div>
  );
}

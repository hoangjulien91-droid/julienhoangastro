"use client";

import { Send } from "lucide-react";
import type { IntroComponents } from "@/lib/pst/data/redac-data";

interface RedacIntroAtelierProps {
  intro: IntroComponents;
  onChangeIntro: (field: keyof IntroComponents, value: string) => void;
  onInsertIntro: () => void;
}

export function RedacIntroAtelier({
  intro,
  onChangeIntro,
  onInsertIntro,
}: RedacIntroAtelierProps) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-3.5 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-amber-500" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200 m-0">
            Atelier Guidé : Les 4 Éléments Clés de l&apos;Introduction Cnam
          </h4>
        </div>
        <span className="text-[10px] font-mono font-bold text-amber-800 dark:text-amber-300">
          Standard Académique 18/20
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="space-y-1">
          <label className="font-bold text-slate-800 dark:text-slate-200 block text-[11px]">
            1. Accroche Clinique (Situation réelle de travail) :
          </label>
          <input
            type="text"
            aria-label="Accroche Clinique (Situation réelle de travail)"
            value={intro.amorce}
            onChange={(e) => onChangeIntro("amorce", e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="space-y-1">
          <label className="font-bold text-slate-800 dark:text-slate-200 block text-[11px]">
            2. Définitions Verbatim des Concepts :
          </label>
          <input
            type="text"
            aria-label="Définitions Verbatim des Concepts"
            value={intro.defs}
            onChange={(e) => onChangeIntro("defs", e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="space-y-1">
          <label className="font-bold text-slate-800 dark:text-slate-200 block text-[11px]">
            3. Problématique Dialectique :
          </label>
          <input
            type="text"
            aria-label="Problématique Dialectique"
            value={intro.pb}
            onChange={(e) => onChangeIntro("pb", e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="space-y-1">
          <label className="font-bold text-slate-800 dark:text-slate-200 block text-[11px]">
            4. Annonce des 2 ou 3 Axes du Plan :
          </label>
          <input
            type="text"
            aria-label="Annonce des 2 ou 3 Axes du Plan"
            value={intro.plan}
            onChange={(e) => onChangeIntro("plan", e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
          />
        </div>
      </div>

      <div className="pt-1 flex items-center justify-end">
        <button
          type="button"
          onClick={onInsertIntro}
          className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
        >
          <Send className="size-3.5" />
          <span>Insérer ce paragraphe dans mon brouillon</span>
        </button>
      </div>
    </div>
  );
}

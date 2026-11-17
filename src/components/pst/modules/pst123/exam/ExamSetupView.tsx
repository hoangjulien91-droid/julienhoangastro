"use client";

import React from "react";
import { GraduationCap, Play } from "lucide-react";

export type ExamType =
  | "random"
  | "dubar"
  | "bourdieu"
  | "sainsaulieu"
  | "honneth"
  | "deontologie"
  | "cas";

interface ExamSetupViewProps {
  examType: ExamType;
  onExamTypeChange: (type: ExamType) => void;
  duration: number;
  onDurationChange: (dur: number) => void;
  onStart: () => void;
}

export const ExamSetupView: React.FC<ExamSetupViewProps> = ({
  examType,
  onExamTypeChange,
  duration,
  onDurationChange,
  onStart,
}) => {
  return (
    <div
      id="examSetup"
      className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4"
    >
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
          <GraduationCap className="size-3 text-indigo-600 dark:text-indigo-400" />
          <span>Simulateur d&apos;Épreuve d&apos;Examen Cnam PST123</span>
        </span>
      </div>

      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
        Préparer mon entraînement d&apos;examen blanc
      </h3>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed m-0">
        Sélectionne ton mode de tirage et la durée pour démarrer le simulateur
        d&apos;examen blanc dans les conditions du titre RNCP 7.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
        <div className="space-y-1">
          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Type d&apos;exercice :
          </label>
          <select
            value={examType}
            onChange={(e) => onExamTypeChange(e.target.value as ExamType)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/40 cursor-pointer"
          >
            <option value="random">
              Tirage Aléatoire (8 sujets d&apos;annales)
            </option>
            <option value="dubar">
              Claude Dubar (Double transaction &amp; Formes)
            </option>
            <option value="bourdieu">
              Pierre Bourdieu (Habitus, Capitaux &amp; Illusio)
            </option>
            <option value="sainsaulieu">
              Renaud Sainsaulieu (Modèles de pouvoir)
            </option>
            <option value="honneth">
              Axel Honneth (3 Sphères &amp; Travail invisible)
            </option>
            <option value="deontologie">
              Déontologie &amp; Posture du Psychologue (Code 2021)
            </option>
            <option value="cas">
              Étude de situation de travail (Cas clinique)
            </option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Durée de composition :
          </label>
          <select
            value={duration}
            onChange={(e) => onDurationChange(Number(e.target.value))}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/40 cursor-pointer"
          >
            <option value={15}>
              15 minutes (Brouillon &amp; Plan express)
            </option>
            <option value={45}>45 minutes (Rédaction accélérée)</option>
            <option value={90}>90 minutes (Conditions réelles CNAM)</option>
          </select>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onStart}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
        >
          <Play className="size-3.5 fill-current" />
          <span>Commencer l&apos;épreuve</span>
        </button>
      </div>
    </div>
  );
};

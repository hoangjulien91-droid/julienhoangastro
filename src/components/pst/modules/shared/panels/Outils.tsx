"use client";

import { useState, type ReactNode } from "react";
import {
  Sparkles,
  Layers,
  Wand2,
  Copy,
  Check,
  Eye,
  EyeOff,
  BookOpen,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

export interface SynthAxisOption {
  key: string;
  label: string;
}
export interface SynthAxisData {
  [axisKey: string]: Record<string, string>;
}
export interface ComparateurColumn {
  key: string;
  label: string;
  color: string;
}

export interface IntroThemeOption {
  key: string;
  label: string;
}
export interface IntroStepData {
  step1: string;
  step2: string;
  step3: string;
  step4: string;
}
export interface IntroData {
  [themeKey: string]: IntroStepData;
}
export interface IntroCues {
  [themeKey: string]: string[];
}

export interface ArmeUltime {
  title: string;
  intro: ReactNode;
  items: ReactNode[];
}

interface OutilsProps {
  hint: string;
  comparateurTitle: string;
  comparateurHint: string;
  synthAxes: SynthAxisOption[];
  comparateurColumns: ComparateurColumn[];
  comparateurData: SynthAxisData;
  defaultSynthAxis: string;
  introThemes: IntroThemeOption[];
  introData: IntroData;
  introCues: IntroCues;
  defaultIntroTheme: string;
  specialWidget?: ReactNode;
  arme: ArmeUltime;
}

export function Outils({
  hint,
  comparateurTitle,
  comparateurHint,
  synthAxes,
  comparateurColumns,
  comparateurData,
  defaultSynthAxis,
  introThemes,
  introData,
  introCues,
  defaultIntroTheme,
  specialWidget,
  arme,
}: OutilsProps) {
  const [synthAxis, setSynthAxis] = useState(defaultSynthAxis);
  const [introTheme, setIntroTheme] = useState(defaultIntroTheme);
  const [introHidden, setIntroHidden] = useState(false);
  const [copied, setCopied] = useState(false);

  const synth = comparateurData[synthAxis];
  const intro = introData[introTheme];
  const cues = introCues[introTheme] ?? [];

  function wrapText(text: string, cue: string) {
    if (!introHidden) return text;
    return `${text} · [Indice: ${cue}]`;
  }

  function copyIntro() {
    if (!intro) return;
    const raw = [intro.step1, intro.step2, intro.step3, intro.step4].join(
      "\n\n",
    );
    navigator.clipboard.writeText(raw).then(() => {
      playSuccessSound();
      triggerHaptic("success");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="space-y-6">
      {hint && <p className="hint">{hint}</p>}

      {/* 1. Comparateur Théorique & Clinique */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-3">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
              <Layers className="size-3 text-indigo-600 dark:text-indigo-400" />
              <span>Grille Comparative Synoptique</span>
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
              {comparateurTitle}
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed">
          {comparateurHint}
        </p>

        {/* Axis selector pill buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none whitespace-nowrap max-w-full">
          {synthAxes.map((axis) => {
            const isActive = synthAxis === axis.key;
            return (
              <button
                key={axis.key}
                type="button"
                onClick={() => {
                  playClickSound();
                  triggerHaptic("selection");
                  setSynthAxis(axis.key);
                }}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 shrink-0 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {axis.label}
              </button>
            );
          })}
        </div>

        {/* Multi-column comparative cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
          {comparateurColumns.map((col) => (
            <div
              key={col.key}
              className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 space-y-2 relative overflow-hidden"
              style={{ borderLeftColor: col.color, borderLeftWidth: 4 }}
            >
              <div
                className="text-xs font-mono font-bold tracking-wider uppercase"
                style={{ color: col.color }}
              >
                {col.label}
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 m-0 font-medium">
                {synth?.[col.key] || "—"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Générateur d'Introduction Universelle */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/60 dark:border-slate-800 pb-3">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              <Wand2 className="size-3 text-amber-600 dark:text-amber-400" />
              <span>Générateur Dialectique Universel</span>
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
              Squelette d&apos;Introduction Cnam
            </h3>
          </div>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              triggerHaptic("selection");
              setIntroHidden((h) => !h);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
          >
            {introHidden ? (
              <>
                <Eye className="size-3" />
                <span>Révéler les indices</span>
              </>
            ) : (
              <>
                <EyeOff className="size-3" />
                <span>Masquer les indices</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed">
          Sélectionne l&apos;une des thématiques de l&apos;examen Cnam pour
          charger le squelette dialectique parfait (Accroche ➔ Cadrage
          conceptuel ➔ Problématique ➔ Annonce du plan).
        </p>

        {/* Theme pill buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none whitespace-nowrap max-w-full">
          {introThemes.map((theme) => {
            const isActive = introTheme === theme.key;
            return (
              <button
                key={theme.key}
                type="button"
                onClick={() => {
                  playClickSound();
                  triggerHaptic("selection");
                  setIntroTheme(theme.key);
                }}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 shrink-0 ${
                  isActive
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {theme.label}
              </button>
            );
          })}
        </div>

        {/* 4 Steps */}
        {intro && (
          <div className="space-y-3 pt-1">
            {(["step1", "step2", "step3", "step4"] as const).map((step, i) => {
              const stepLabels = [
                "1. Accroche & Énonciation du Problème",
                "2. Cadrage Conceptuel & Définition des Termes",
                "3. Problématique Clinique Dialectique",
                "4. Annonce du Plan en 2 ou 3 Axes",
              ];
              return (
                <div
                  key={step}
                  className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 border-l-4 border-l-amber-500 space-y-1.5"
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                    {stepLabels[i]}
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 m-0">
                    {wrapText(intro[step], cues[i] ?? "")}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <button
          type="button"
          onClick={copyIntro}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-95"
        >
          {copied ? (
            <>
              <Check className="size-3.5" />
              <span>Introduction copiée dans le presse-papier !</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>Copier l&apos;Introduction rédigée</span>
            </>
          )}
        </button>
      </div>

      {/* Special module widget if present */}
      {specialWidget}

      {/* 3. Ressource Méthodologique / Arme Ultime */}
      {arme && (
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-indigo-600 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
              <Sparkles className="size-3 text-indigo-600 dark:text-indigo-400" />
              <span>Ressource Méthodologique Majeure</span>
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
            {arme.title}
          </h3>

          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {arme.intro}
          </div>

          <ul className="space-y-2 pt-1 list-none pl-0 m-0">
            {arme.items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200"
              >
                <span className="size-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

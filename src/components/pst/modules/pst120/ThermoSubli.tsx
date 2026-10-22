"use client";

import { useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import { triggerHaptic } from "@/lib/pst/audio-feedback";
import { Activity, Sparkles, ShieldAlert, Award } from "lucide-react";

interface ThermoSubliProps {
  store: PstStore;
  onStoreChange: () => void;
}

export function ThermoSubli({ store, onStoreChange }: ThermoSubliProps) {
  const [discussion, setDiscussion] = useState(50);
  const [reconnaissance, setReconnaissance] = useState(50);
  const [autonomie, setAutonomie] = useState(50);

  const average = (discussion + reconnaissance + autonomie) / 3;

  let verdict: string, badgeStyle: string, cardBorder: string, text: string;
  if (average >= 75) {
    verdict = "Sublimation Active & Santé Mentale (Plaisir au Travail)";
    badgeStyle =
      "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
    cardBorder = "border-emerald-500/40 bg-emerald-500/5";
    text =
      "L'organisation du travail offre d'excellentes ressources délibératives. La souffrance inhérente à la confrontation avec le réel est sublimée dans la création, le travail soigné et la coopération paritaire. Le risque de pathologie est minime.";
    if (!store.getBadges().includes("thermo_subli_gold")) {
      store.unlockBadge("thermo_subli_gold");
      onStoreChange();
    }
  } else if (average >= 45) {
    verdict =
      "Équilibre Psychique Instable (Stratégies Collectives de Défense)";
    badgeStyle =
      "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30";
    cardBorder = "border-amber-500/40 bg-amber-500/5";
    text =
      "Le sujet fait face aux contraintes en déployant des stratégies défensives (collectives ou individuelles) comme le déni du danger ou le cynisme viril. L'équilibre est préservé temporairement, mais il n'y a pas d'émancipation ni de développement du pouvoir d'agir.";
  } else {
    verdict = "Décompensation Psychopathologique (Souffrance Éthique)";
    badgeStyle =
      "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30";
    cardBorder = "border-rose-500/40 bg-rose-500/5";
    text =
      "L'absence d'espaces de délibération collective et de reconnaissance brise les mécanismes de défense. Le sujet bascule dans le non-sens, l'isolement, la somatisation ou la décompensation (burnout, dépression, TMS).";
  }

  const handleSliderChange = (setter: (v: number) => void, val: number) => {
    setter(val);
    triggerHaptic("light");
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs mb-6 space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 shadow-2xs">
          <Activity className="size-3 text-indigo-600 dark:text-indigo-400" />
          <span>Simulateur Clinique · Modèle Dejours (PST120)</span>
        </span>
        <span className="font-mono text-xs font-bold text-muted-foreground">
          Indice global : {Math.round(average)}%
        </span>
      </div>

      <div>
        <h3 className="text-base font-serif font-bold text-foreground m-0">
          Thermomètre de la Sublimation Psychodynamique
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5 m-0 leading-relaxed">
          Ajustez les conditions de l&apos;organisation du travail pour observer
          la balance entre sublimation saine, stratégies de défense et risque de
          décompensation.
        </p>
      </div>

      {/* Sliders */}
      <div className="space-y-3.5 pt-1">
        {[
          {
            label:
              "Espaces de Délibération Collective sur le Travail Bien Fait",
            value: discussion,
            set: setDiscussion,
          },
          {
            label:
              "Reconnaissance Symbolique & Jugement des Pairs / Hiérarchie",
            value: reconnaissance,
            set: setReconnaissance,
          },
          {
            label: "Autonomie & Marges de Régulation Réelle (Pouvoir d'Agir)",
            value: autonomie,
            set: setAutonomie,
          },
        ].map((slider) => (
          <div key={slider.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground">
                {slider.label}
              </span>
              <span className="font-mono font-bold text-accent px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20 text-[11px]">
                {slider.value}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={slider.value}
              className="w-full accent-accent cursor-pointer h-1.5 rounded-lg bg-slate-200 dark:bg-slate-700"
              onChange={(e) =>
                handleSliderChange(slider.set, Number(e.target.value))
              }
            />
          </div>
        ))}
      </div>

      {/* Dynamic Feedback Card */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border ${cardBorder} backdrop-blur-sm space-y-2 transition-all duration-200 mt-2`}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${badgeStyle}`}
          >
            {verdict}
          </span>
        </div>
        <p className="text-xs text-foreground/90 leading-relaxed m-0">{text}</p>
      </div>
    </div>
  );
}

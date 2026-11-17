"use client";

import type { PstStore } from "@/lib/pst/store";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { Scale, Layers } from "lucide-react";
import { DEBATS_AXES } from "@/lib/pst/data/pst106-debats-data";
import { DebatGlossaireCard } from "./debats/DebatGlossaireCard";
import { DebatAxisCard } from "./debats/DebatAxisCard";

interface Debats3WayProps {
  store: PstStore;
  onStoreChange: () => void;
}

export function Debats3Way({ store, onStoreChange }: Debats3WayProps) {
  const state = store.getDebats();
  const total = DEBATS_AXES.length;
  const active = DEBATS_AXES.filter((_, i) => !!state[i]).length;
  const pct = total ? Math.round((100 * active) / total) : 0;

  function toggle(i: number) {
    const nextVal = !state[i];
    store.setDebat(i, nextVal);
    if (nextVal) {
      playSuccessSound();
      triggerHaptic("success");
    } else {
      playClickSound();
      triggerHaptic("selection");
    }
    onStoreChange();
  }

  return (
    <div className="space-y-5">
      <p className="hint">
        Les 5 grands débats transversaux de la discipline pour prendre de la
        hauteur et structurer tes comparaisons de synthèse à l&apos;examen.
        Chaque axe te donne une grille de lecture prête à l&apos;emploi.
      </p>

      {/* Progress Card */}
      <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
            <Scale className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Débats de Synthèse Maîtrisés</span>
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            {active} / {total} ({pct}%)
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Theoretical Context Card */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
          <Layers className="size-3 text-amber-600 dark:text-amber-400" />
          <span>Pourquoi articuler ces 3 courants majeurs du Cnam ?</span>
        </span>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium m-0">
          La psychologie du travail et l&apos;ergonomie étudient comment le
          travail réel façonne l&apos;activité humaine et comment préserver la
          santé des travailleurs tout en maintenant l&apos;efficacité :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 space-y-1">
            <span className="text-xs font-bold font-mono text-sky-800 dark:text-sky-300 block">
              Wisner (Ergonomie)
            </span>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 m-0 leading-relaxed">
              Adaptation physique et cognitive des situations (Tâche vs
              Activité).
            </p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
            <span className="text-xs font-bold font-mono text-emerald-800 dark:text-emerald-300 block">
              Clot (Clinique)
            </span>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 m-0 leading-relaxed">
              Développement du pouvoir d&apos;agir et du métier (Genre vs
              Style).
            </p>
          </div>

          <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1">
            <span className="text-xs font-bold font-mono text-purple-800 dark:text-purple-300 block">
              Dejours (Psychodynamique)
            </span>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 m-0 leading-relaxed">
              Élaboration de la souffrance et reconnaissance (Plaisir vs
              Souffrance).
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <b className="text-slate-900 dark:text-slate-100">
            Ce qu&apos;ils partagent tous les trois :
          </b>{" "}
          ils reconnaissent le primat de l&apos;activité réelle, refusent de
          traiter le travailleur comme une simple machine réflexe, et lient
          indissociablement le travail à la santé.
        </div>
      </div>

      {/* Glossaire Accordion Card */}
      <DebatGlossaireCard />

      {/* 5 Axes Cards */}
      <div className="space-y-4">
        {DEBATS_AXES.map((axe, i) => (
          <DebatAxisCard
            key={i}
            axe={axe}
            isMastered={!!state[i]}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import type { ReactNode } from "react";
import { ArrowRight, Award, Wrench, Zap } from "lucide-react";
import { ALL_BADGE_DESCS } from "@/lib/pst/data/badges";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface DashboardSm2AndToolboxProps {
  isFreshStart: boolean;
  cardsCount: number;
  dueCount: number;
  dueReview: number;
  dueNew: number;
  errorsCount: number;
  toolboxTitle: string;
  toolboxDesc: ReactNode;
  mindmapLabel: string;
  protocoleLabel: string;
  badges: string[];
  onGoTab: (panel: string) => void;
  onTriggerRevision: () => void;
}

export function DashboardSm2AndToolbox({
  isFreshStart,
  cardsCount,
  dueCount,
  dueReview,
  dueNew,
  errorsCount,
  toolboxTitle,
  toolboxDesc,
  mindmapLabel,
  protocoleLabel,
  badges,
  onGoTab,
  onTriggerRevision,
}: DashboardSm2AndToolboxProps) {
  return (
    <>
      {/* Révision du jour (SM-2) */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-emerald-500/30 bg-card shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1.5 shadow-2xs">
            <Zap className="size-3 text-emerald-600 dark:text-emerald-400" />
            <span>Répétition espacée SM-2</span>
          </span>
          {isFreshStart ? (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white shadow-2xs">
              Prêt à démarrer ({cardsCount} cartes)
            </span>
          ) : dueCount > 0 ? (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-2xs">
              {dueReview > 0
                ? `${dueReview} à revoir${dueNew > 0 ? ` · ${dueNew} nouv.` : ""}`
                : `${dueNew} nouvelles cartes`}
            </span>
          ) : (
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
              À jour ✓
            </span>
          )}
        </div>

        <div>
          <h3 className="text-base font-serif font-bold text-foreground m-0">
            {isFreshStart
              ? "Initialiser votre répétition espacée SM-2"
              : "Session de révision du jour"}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 m-0 leading-relaxed">
            {isFreshStart ? (
              <>
                Découvrez les{" "}
                <strong className="text-foreground">
                  {cardsCount} notions clés
                </strong>{" "}
                de ce module en rappel actif pour activer votre échéancier
                d&apos;ancrage mémoriel SM-2.
              </>
            ) : dueCount > 0 ? (
              <>
                <strong className="text-foreground">{dueCount} carte(s)</strong>{" "}
                à traiter aujourd&apos;hui selon l&apos;échéancier SM-2.
                {dueNew > 0 && dueReview > 0
                  ? ` Dont ${dueNew} nouvelles notions et ${dueReview} à revoir pour consolider la trace mnésique.`
                  : dueReview > 0
                    ? " Révisez en priorité les notions les plus fragiles pour les ancrer définitivement."
                    : " Toutes nouvelles notions doctrinales, à découvrir à votre rythme."}
              </>
            ) : (
              "Aucune carte en retard aujourd'hui — votre échéancier SM-2 est parfaitement à jour. Session d'entraînement libre recommandée."
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer"
            onClick={() => {
              triggerHaptic("light");
              playClickSound();
              onGoTab("cartes");
              onTriggerRevision();
            }}
          >
            <span>
              {isFreshStart
                ? `Démarrer les ${cardsCount} cartes`
                : dueCount > 0
                  ? `Réviser les ${dueCount} cartes dues`
                  : "Réviser librement"}
            </span>
            <ArrowRight className="size-3.5" />
          </button>

          {errorsCount > 0 && (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-mono text-xs font-bold bg-rose-500/15 hover:bg-rose-500/25 text-rose-700 dark:text-rose-300 border border-rose-500/30 transition-all active:scale-95 cursor-pointer"
              onClick={() => {
                triggerHaptic("light");
                playClickSound();
                onGoTab("errors");
              }}
            >
              <span>
                Rattraper {errorsCount} erreur{errorsCount > 1 ? "s" : ""}
              </span>
              <ArrowRight className="size-3" />
            </button>
          )}
        </div>
      </div>

      {/* Boîte à outils / Méthodologie */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-indigo-500/30 bg-card shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5 shadow-2xs">
            <Wrench className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Méthodologie &amp; Analyse Clinique</span>
          </span>
        </div>

        <div>
          <h3 className="text-base font-serif font-bold text-foreground m-0">
            {toolboxTitle}
          </h3>
          <div className="text-xs text-muted-foreground mt-1 m-0 leading-relaxed">
            {toolboxDesc}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs font-bold bg-primary text-primary-foreground shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer"
            onClick={() => {
              triggerHaptic("light");
              playClickSound();
              onGoTab("mindmap");
            }}
          >
            <span>{mindmapLabel}</span>
            <ArrowRight className="size-3" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border transition-all active:scale-95 cursor-pointer shadow-2xs"
            onClick={() => {
              triggerHaptic("light");
              playClickSound();
              onGoTab("protocole");
            }}
          >
            <span>{protocoleLabel}</span>
            <ArrowRight className="size-3" />
          </button>
        </div>
      </div>

      {/* Badges déverrouillés */}
      {badges.length > 0 && (
        <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-amber-500/30 bg-card shadow-xs space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1.5 shadow-2xs">
              <Award className="size-3 text-amber-600 dark:text-amber-400" />
              <span>Récompenses &amp; Progression Cnam</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400">
              {badges.length} débloqué(s)
            </span>
          </div>

          <h3 className="text-sm font-serif font-bold text-foreground m-0">
            Vos Badges Déverrouillés
          </h3>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {badges.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 shadow-2xs"
              >
                <span>🏆</span>
                <span>{ALL_BADGE_DESCS[b] || b}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import {
  ArrowRight,
  BookOpen,
  Brain,
  Calendar,
  Compass,
  Flame,
  MapPin,
  Video,
} from "lucide-react";
import type { DashboardAdvice } from "../Dashboard";
import { formatFrDate } from "@/lib/pst/planning-stats";
import type { PLANNING_EVENTS } from "@/lib/pst/data/planning";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface DashboardKpiHeroProps {
  streak: number;
  streakHint: string;
  masteredFiches: number;
  ficheCount: number;
  pctFiches: number;
  masteredCards: number;
  totalCards: number;
  advice: DashboardAdvice;
  nextEvent: (typeof PLANNING_EVENTS)[number] | null;
  todayIso: string;
  onGoTab: (panel: string) => void;
  onTriggerRevision: () => void;
}

function getDaysRemaining(targetDateIso: string, todayIso: string): string {
  if (targetDateIso === todayIso) return "Aujourd'hui";
  const target = new Date(targetDateIso + "T00:00:00");
  const today = new Date(todayIso + "T00:00:00");
  const diffDays = Math.round(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 1) return "Demain";
  if (diffDays < 0) return `Passé (${Math.abs(diffDays)} j)`;
  return `Dans ${diffDays} jours`;
}

export function DashboardKpiHero({
  streak,
  streakHint,
  masteredFiches,
  ficheCount,
  pctFiches,
  masteredCards,
  totalCards,
  advice,
  nextEvent,
  todayIso,
  onGoTab,
  onTriggerRevision,
}: DashboardKpiHeroProps) {
  return (
    <>
      {/* Top 3 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Streak */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-bold text-muted-foreground">
            <Flame className="size-3.5 text-amber-500" />
            <span>Série de révision</span>
          </div>
          <div className="font-mono text-3xl font-black text-foreground">
            {streak}{" "}
            <span className="text-sm font-normal text-muted-foreground">
              jours
            </span>
          </div>
          <p className="text-xs text-muted-foreground m-0">{streakHint}</p>
        </div>

        {/* Fiches mémorisées */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-bold text-muted-foreground">
            <BookOpen className="size-3.5 text-emerald-500" />
            <span>Fiches mémorisées</span>
          </div>
          <div className="font-mono text-3xl font-black text-emerald-700 dark:text-emerald-400">
            {masteredFiches}{" "}
            <span className="text-sm font-normal text-muted-foreground">
              / {ficheCount}
            </span>
          </div>
          <p className="text-xs text-muted-foreground m-0">
            {pctFiches}% du programme maîtrisé
          </p>
        </div>

        {/* Cartes maîtrisées */}
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-bold text-muted-foreground">
            <Brain className="size-3.5 text-indigo-500" />
            <span>Cartes maîtrisées</span>
          </div>
          <div className="font-mono text-3xl font-black text-indigo-700 dark:text-indigo-400">
            {masteredCards}{" "}
            <span className="text-sm font-normal text-muted-foreground">
              / {totalCards}
            </span>
          </div>
          <p className="text-xs text-muted-foreground m-0">
            Boîtes 4-5 de la répétition espacée
          </p>
        </div>
      </div>

      {/* Prochaine étape conseillée */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-indigo-500/30 bg-card shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5 shadow-2xs">
            <Compass className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Prochaine étape conseillée</span>
          </span>
          <span className="text-[11px] font-mono text-muted-foreground uppercase hidden sm:inline">
            Guidage personnalisé
          </span>
        </div>

        <div>
          <h3 className="text-base font-serif font-bold text-foreground m-0">
            {advice.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 m-0 leading-relaxed">
            {advice.text}
          </p>
        </div>

        <div className="pt-1">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold bg-primary text-primary-foreground shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer"
            onClick={() => {
              triggerHaptic("light");
              playClickSound();
              onGoTab(advice.panel);
              if (advice.leitner) onTriggerRevision();
            }}
          >
            <span>{advice.btn}</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Prochain Cours ou Webconférence de l'UE */}
      {nextEvent && (
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-amber-500/35 bg-gradient-to-r from-amber-500/10 via-card to-card shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30">
                <Calendar className="size-3 text-amber-600 dark:text-amber-400" />
                <span>
                  Prochaine Séance ·{" "}
                  {nextEvent.type === "COURS"
                    ? "Présentiel Bègles"
                    : nextEvent.type === "WEBCONF"
                      ? "Webconférence Visio"
                      : "Distanciel"}
                </span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                {getDaysRemaining(nextEvent.date, todayIso)}
              </span>
            </div>

            <div className="text-sm sm:text-base font-serif font-bold text-foreground">
              {nextEvent.day} {formatFrDate(nextEvent.date)} · {nextEvent.start}–{nextEvent.end}
            </div>

            <div className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
              {nextEvent.type === "COURS" ? (
                <span className="flex items-center gap-1 text-amber-700 dark:text-amber-400 font-semibold">
                  <MapPin className="size-3" />
                  <span>{nextEvent.room ?? "Cité du Numérique - Bègles"}</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-semibold">
                  <Video className="size-3" />
                  <span>Visio Teams / Cnam</span>
                </span>
              )}
              <span>· Enseignant : {nextEvent.teacher}</span>
            </div>
          </div>

          <div className="shrink-0">
            <a
              href="/pst/planning"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-2xs transition-all active:scale-95 cursor-pointer"
            >
              <span>Voir dans le planning</span>
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

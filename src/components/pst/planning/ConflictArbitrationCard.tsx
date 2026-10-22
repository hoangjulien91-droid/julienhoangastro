"use client";

import React from "react";
import {
  AlertTriangle,
  Check,
  Video,
  Clock,
  MapPin,
  User,
  ArrowRight,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import {
  type PlanningEvent,
  PLANNING_EVENTS,
  UNIT_TITLES,
} from "@/lib/pst/data/planning";
import {
  eventId,
  formatFrDate,
  getEventConflicts,
} from "@/lib/pst/planning-stats";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";

interface ConflictPair {
  date: string;
  day: string;
  overlap: string;
  overlapDuration: string;
  e1: PlanningEvent;
  e2: PlanningEvent;
}

interface ConflictArbitrationProps {
  arbitrations: Record<string, "DIRECT" | "REPLAY">;
  onSetArbitration: (eventId: string, mode: "DIRECT" | "REPLAY") => void;
  onSelectEvent: (e: PlanningEvent) => void;
}

export function ConflictArbitration({
  arbitrations,
  onSetArbitration,
  onSelectEvent,
}: ConflictArbitrationProps) {
  // Find the exact 4 conflicting events (2 pairs)
  const pairs: ConflictPair[] = [
    {
      date: "2026-11-14",
      day: "Samedi",
      overlap: "13:00 – 16:00",
      overlapDuration: "3h00 de collision complète",
      e1: PLANNING_EVENTS.find(
        (e) => e.date === "2026-11-14" && e.unit === "pst108",
      )!,
      e2: PLANNING_EVENTS.find(
        (e) => e.date === "2026-11-14" && e.unit === "pst123",
      )!,
    },
    {
      date: "2026-11-28",
      day: "Samedi",
      overlap: "14:00 – 16:00",
      overlapDuration: "2h00 de chevauchement (13h-16h vs 14h-17h)",
      e1: PLANNING_EVENTS.find(
        (e) => e.date === "2026-11-28" && e.unit === "pst108",
      )!,
      e2: PLANNING_EVENTS.find(
        (e) => e.date === "2026-11-28" && e.unit === "pst123",
      )!,
    },
  ].filter((p) => p.e1 && p.e2);

  function handleArbitrate(chosen: PlanningEvent, other: PlanningEvent) {
    playSuccessSound();
    const idChosen = eventId(chosen);
    const idOther = eventId(other);
    onSetArbitration(idChosen, "DIRECT");
    onSetArbitration(idOther, "REPLAY");
  }

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-rose-500/5 dark:bg-rose-500/10 border-2 border-rose-500/40 backdrop-blur-md shadow-xs space-y-5 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-500/20 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-900 dark:text-rose-200 text-[11px] font-black uppercase tracking-wider font-mono">
            <AlertTriangle className="size-3.5 text-rose-600" />
            <span>Filtre Actif : 4 Séances en Chevauchement Horaire</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Arbitrage des Conflits de Présentiel (Bègles)
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Ces 4 séances ont lieu en présentiel dans deux salles distinctes de
            la Cité du Numérique aux mêmes heures. Définissez ci-dessous votre
            présence en direct et votre choix de rattrapage asynchrone
            (sauvegardé automatiquement).
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-rose-500/30 text-xs font-mono space-y-0.5 shrink-0 self-start sm:self-center">
          <div className="font-bold text-rose-950 dark:text-rose-200">
            🎯 2 samedis de collision :
          </div>
          <div className="text-[11px] text-slate-600 dark:text-slate-400">
            14/11 &amp; 28/11 (PST108 vs PST123)
          </div>
        </div>
      </div>

      {/* Cartes de comparaison côte à côte */}
      <div className="space-y-6">
        {pairs.map((pair, idx) => {
          const id1 = eventId(pair.e1);
          const id2 = eventId(pair.e2);
          const arb1 = arbitrations[id1];
          const arb2 = arbitrations[id2];

          return (
            <div
              key={pair.date}
              className="p-5 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-rose-500/30 shadow-xs space-y-4"
            >
              {/* Header du conflit */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-xl bg-rose-600 text-white font-mono text-xs font-black uppercase">
                    Conflit {idx + 1} / 2
                  </span>
                  <span className="font-mono text-sm font-black uppercase text-slate-900 dark:text-slate-100">
                    {pair.day} {formatFrDate(pair.date)}
                  </span>
                </div>

                {/* Mise en évidence de la plage horaire exacte de collision */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 text-rose-900 dark:text-rose-200 font-mono text-xs font-bold border border-rose-500/30">
                  <Clock className="size-3.5 text-rose-600" />
                  <span>Collision exacte : {pair.overlap}</span>
                  <span className="text-[10px] opacity-75">
                    ({pair.overlapDuration})
                  </span>
                </div>
              </div>

              {/* Comparaison côte à côte */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* SÉANCE A : PST108 */}
                <div
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between gap-3 ${
                    arb1 === "DIRECT"
                      ? "border-emerald-500 bg-emerald-500/5 shadow-xs ring-2 ring-emerald-500/20"
                      : arb1 === "REPLAY"
                        ? "border-indigo-400/60 bg-indigo-500/5 opacity-80"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-mono text-xs font-black uppercase">
                          {pair.e1.unit.toUpperCase()}
                        </span>
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {UNIT_TITLES[pair.e1.unit]}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onSelectEvent(pair.e1)}
                        className="text-[10px] text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-0.5 cursor-pointer font-bold shrink-0"
                      >
                        <span>Fiche</span>
                        <ArrowRight className="size-2.5" />
                      </button>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-mono text-slate-800 dark:text-slate-200">
                        <Clock className="size-3 text-slate-400" />
                        <b>
                          {pair.e1.start} – {pair.e1.end}
                        </b>{" "}
                        (3h00)
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                        <MapPin className="size-3 text-amber-600 shrink-0" />
                        <span className="truncate">{pair.e1.room}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                        <User className="size-3 text-slate-400 shrink-0" />
                        <span className="truncate">{pair.e1.teacher}</span>
                      </div>
                    </div>
                  </div>

                  {/* SÉLECTEUR D'ARBITRAGE PERSONNEL */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                    <div className="text-[10px] font-mono font-bold uppercase text-slate-400">
                      Mon arbitrage personnel :
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleArbitrate(pair.e1, pair.e2)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 ${
                          arb1 === "DIRECT"
                            ? "bg-emerald-600 text-white shadow-2xs"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-500/10"
                        }`}
                      >
                        <Check className="size-3" />
                        <span>En direct</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleArbitrate(pair.e2, pair.e1)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 ${
                          arb1 === "REPLAY"
                            ? "bg-indigo-600 text-white shadow-2xs"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-500/10"
                        }`}
                      >
                        <Video className="size-3" />
                        <span>En Replay</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* SÉANCE B : PST123 */}
                <div
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between gap-3 ${
                    arb2 === "DIRECT"
                      ? "border-emerald-500 bg-emerald-500/5 shadow-xs ring-2 ring-emerald-500/20"
                      : arb2 === "REPLAY"
                        ? "border-indigo-400/60 bg-indigo-500/5 opacity-80"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-mono text-xs font-black uppercase">
                          {pair.e2.unit.toUpperCase()}
                        </span>
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {UNIT_TITLES[pair.e2.unit]}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onSelectEvent(pair.e2)}
                        className="text-[10px] text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-0.5 cursor-pointer font-bold shrink-0"
                      >
                        <span>Fiche</span>
                        <ArrowRight className="size-2.5" />
                      </button>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-mono text-slate-800 dark:text-slate-200">
                        <Clock className="size-3 text-slate-400" />
                        <b>
                          {pair.e2.start} – {pair.e2.end}
                        </b>{" "}
                        (3h00)
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                        <MapPin className="size-3 text-amber-600 shrink-0" />
                        <span className="truncate">{pair.e2.room}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                        <User className="size-3 text-slate-400 shrink-0" />
                        <span className="truncate">{pair.e2.teacher}</span>
                      </div>
                    </div>
                  </div>

                  {/* SÉLECTEUR D'ARBITRAGE PERSONNEL */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                    <div className="text-[10px] font-mono font-bold uppercase text-slate-400">
                      Mon arbitrage personnel :
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleArbitrate(pair.e2, pair.e1)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 ${
                          arb2 === "DIRECT"
                            ? "bg-emerald-600 text-white shadow-2xs"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-500/10"
                        }`}
                      >
                        <Check className="size-3" />
                        <span>En direct</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleArbitrate(pair.e1, pair.e2)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 ${
                          arb2 === "REPLAY"
                            ? "bg-indigo-600 text-white shadow-2xs"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-500/10"
                        }`}
                      >
                        <Video className="size-3" />
                        <span>En Replay</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

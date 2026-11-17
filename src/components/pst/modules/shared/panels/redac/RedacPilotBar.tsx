"use client";

import {
  Timer,
  Pause,
  Play,
  RotateCcw,
  Eye,
  EyeOff,
  Search,
} from "lucide-react";
import { formatRedacTimer } from "@/lib/pst/data/redac-data";

interface RedacPilotBarProps {
  doneCount: number;
  totalPoints: number;
  pct: number;
  timerSeconds: number | null;
  timerActive: boolean;
  onStartTimer: (minutes: number) => void;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  blindMode: boolean;
  onToggleBlindMode: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function RedacPilotBar({
  doneCount,
  totalPoints,
  pct,
  timerSeconds,
  timerActive,
  onStartTimer,
  onToggleTimer,
  onResetTimer,
  blindMode,
  onToggleBlindMode,
  searchQuery,
  onSearchChange,
}: RedacPilotBarProps) {
  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3.5 sticky top-14 z-15">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-wrap">
        {/* Progression des Attendus */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
              Attendus méthodologiques validés :
            </span>
            <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
              {doneCount} / {totalPoints} ({pct}%)
            </span>
          </div>
          <div className="w-48 sm:w-64 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Minuteur d'Examen */}
        <div className="flex items-center gap-2 flex-wrap">
          {timerSeconds === null ? (
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-medium">Chronomètre :</span>
              <button
                type="button"
                onClick={() => onStartTimer(30)}
                className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700 transition-all cursor-pointer flex items-center gap-1"
                title="30 minutes pour problématiser et structurer le plan détaillé"
              >
                <Timer className="size-3 text-amber-500" />
                <span>30 min (Plan)</span>
              </button>
              <button
                type="button"
                onClick={() => onStartTimer(120)}
                className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700 transition-all cursor-pointer flex items-center gap-1"
                title="2 heures en conditions réelles d'examen Cnam"
              >
                <Timer className="size-3 text-rose-500" />
                <span>2h (Épreuve)</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold">
              <span
                className={
                  timerSeconds === 0
                    ? "text-rose-600 animate-pulse"
                    : "text-amber-700 dark:text-amber-300"
                }
              >
                ⏱ {formatRedacTimer(timerSeconds)}
              </span>
              <button
                type="button"
                onClick={onToggleTimer}
                className="p-1 rounded-lg hover:bg-amber-500/20 text-slate-700 dark:text-slate-200 cursor-pointer"
                title={timerActive ? "Pause" : "Reprendre"}
              >
                {timerActive ? (
                  <Pause className="size-3.5" />
                ) : (
                  <Play className="size-3.5" />
                )}
              </button>
              <button
                type="button"
                onClick={onResetTimer}
                className="p-1 rounded-lg hover:bg-amber-500/20 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                title="Réinitialiser"
              >
                <RotateCcw className="size-3" />
              </button>
            </div>
          )}

          {/* Mode Aveugle Toggle */}
          <button
            type="button"
            onClick={onToggleBlindMode}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
              blindMode
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
            }`}
            title="Cache les plans et corrigés pour forcer l'effort de mémorisation pur avant comparaison"
          >
            {blindMode ? (
              <EyeOff className="size-3.5 text-amber-400" />
            ) : (
              <Eye className="size-3.5" />
            )}
            <span>
              {blindMode ? "Mode Examen Actif" : "Mode Consultation"}
            </span>
          </button>
        </div>
      </div>

      {/* Barre de Recherche de Sujets */}
      <div className="relative">
        <Search className="size-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          aria-label="Rechercher un sujet de dissertation officiel"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher un sujet officiel, un auteur ou une notion (ex: Wisner, Clot, déontologie)..."
          className="w-full pl-8.5 pr-4 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
        />
      </div>
    </div>
  );
}

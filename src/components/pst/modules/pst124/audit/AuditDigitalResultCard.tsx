"use client";

import { CheckCircle2, AlertTriangle, RotateCcw, Award } from "lucide-react";

interface AuditStats {
  acceptability: number;
  alienation: number;
  pouvoirAgir: number;
}

interface AuditDigitalResultCardProps {
  success: boolean;
  stats: AuditStats;
  onRestart: () => void;
}

export function AuditDigitalResultCard({
  success,
  stats,
  onRestart,
}: AuditDigitalResultCardProps) {
  return (
    <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 text-center animate-fadeIn">
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${
          success
            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
            : "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20"
        }`}
      >
        {success ? (
          <CheckCircle2 className="size-3.5" />
        ) : (
          <AlertTriangle className="size-3.5" />
        )}
        <span>
          {success ? "Mission d'Audit Réussie !" : "Mission Échouée"}
        </span>
      </span>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed m-0 font-medium">
        {success
          ? "Vous avez déployé l'outil en préservant le pouvoir d'agir et en évitant l'aliénation numérique !"
          : "Les salariés sont épuisés ou l'outil est rejeté. Recommencez en appliquant les principes de la clinique de l'usage."}
      </p>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 text-center space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
            Acceptabilité
          </span>
          <div className="text-xl font-mono font-extrabold text-emerald-700 dark:text-emerald-300">
            {stats.acceptability}%
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-800/60 text-center space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 block">
            Aliénation
          </span>
          <div className="text-xl font-mono font-extrabold text-rose-700 dark:text-rose-300">
            {stats.alienation}%
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/60 text-center space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 block">
            Pouvoir d&apos;agir
          </span>
          <div className="text-xl font-mono font-extrabold text-indigo-700 dark:text-indigo-300">
            {stats.pouvoirAgir}%
          </div>
        </div>
      </div>

      {success && (
        <div className="pt-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            <Award className="size-3.5" />
            <span>Badge Débloqué : Expert de l&apos;Audit Digital</span>
          </span>
        </div>
      )}

      <div className="pt-2">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer active:scale-95"
        >
          <RotateCcw className="size-3.5" />
          <span>Recommencer l&apos;audit</span>
        </button>
      </div>
    </div>
  );
}

"use client";

interface Atelier123OralBannerProps {
  oralDuration: number;
  onSetOralDuration: (d: number) => void;
  oralTimeRemaining: number;
  onSetOralTimeRemaining: (t: number) => void;
  oralRunning: boolean;
  onToggleOralRunning: () => void;
  onResetOralTimer: () => void;
}

export function Atelier123OralBanner({
  oralDuration,
  onSetOralDuration,
  oralTimeRemaining,
  onSetOralTimeRemaining,
  oralRunning,
  onToggleOralRunning,
  onResetOralTimer,
}: Atelier123OralBannerProps) {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-linear-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/25 dark:border-indigo-500/20 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 inline-flex items-center gap-1.5">
            <span>🎤 Séances 4 &amp; 5 · Présentation de Situation de Travail</span>
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 m-0">
            Simulateur d&apos;Épreuve Orale &amp; Étude de Cas
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 m-0 max-w-2xl leading-relaxed">
            Entraînez-vous à exposer oralement l&apos;analyse sociologique d&apos;une
            situation de travail en 10 ou 15 minutes, selon les critères stricts
            de M. Éric Lucy.
          </p>
        </div>

        {/* Chrono Widget */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 shadow-sm flex flex-col items-center gap-2 shrink-0 min-w-[210px]">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
            Chronomètre Oral
          </div>
          <div
            className={`text-3xl font-mono font-black tracking-tight ${
              oralTimeRemaining <= 60
                ? "text-rose-600 animate-pulse"
                : oralTimeRemaining <= 180
                  ? "text-amber-500"
                  : "text-indigo-600 dark:text-indigo-400"
            }`}
          >
            {String(Math.floor(oralTimeRemaining / 60)).padStart(2, "0")}:
            {String(oralTimeRemaining % 60).padStart(2, "0")}
          </div>

          <div className="flex items-center gap-1.5 w-full">
            <button
              type="button"
              onClick={onToggleOralRunning}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all text-white cursor-pointer ${
                oralRunning
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {oralRunning ? "Pause" : "Démarrer"}
            </button>
            <button
              type="button"
              onClick={onResetOralTimer}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
              title="Réinitialiser le chrono"
            >
              Reset
            </button>
          </div>

          {/* Duration switch */}
          <div className="flex items-center gap-1 pt-1 text-[10px] font-mono">
            <span className="text-slate-400">Durée :</span>
            <button
              type="button"
              onClick={() => {
                onSetOralDuration(10 * 60);
                onSetOralTimeRemaining(10 * 60);
              }}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${
                oralDuration === 10 * 60
                  ? "bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              10 min
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => {
                onSetOralDuration(15 * 60);
                onSetOralTimeRemaining(15 * 60);
              }}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${
                oralDuration === 15 * 60
                  ? "bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              15 min
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

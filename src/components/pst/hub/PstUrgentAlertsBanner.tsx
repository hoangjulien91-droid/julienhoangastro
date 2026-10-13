import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  Flame,
  ShieldCheck,
  FileText,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";
import type { GlobalStats } from "@/lib/pst/hub-stats";

interface PstUrgentAlertsBannerProps {
  stats: GlobalStats;
  onOpenBriefing30s: () => void;
  onOpenMemoireStudio: () => void;
  onOpenExamSimulator: () => void;
}

export const PstUrgentAlertsBanner: React.FC<PstUrgentAlertsBannerProps> = ({
  stats,
  onOpenBriefing30s,
  onOpenMemoireStudio,
  onOpenExamSimulator,
}) => {
  const [criticalTodosCount, setCriticalTodosCount] = useState(0);
  const [guardPct, setGuardPct] = useState(75);

  useEffect(() => {
    const syncBanner = () => {
      try {
        const rawTodos = localStorage.getItem("pst_academic_todos_v1");
        if (rawTodos) {
          const parsed = JSON.parse(rawTodos);
          if (Array.isArray(parsed)) {
            const count = parsed.filter(
              (t) =>
                !(t.isDone ?? t.done) &&
                (t.priority === "haute" || t.priority === "critique")
            ).length;
            setCriticalTodosCount(count);
          }
        } else {
          setCriticalTodosCount(3);
        }

        const rawMemoire = localStorage.getItem("pst_memoire_studio_v1");
        if (rawMemoire) {
          const parsedMem = JSON.parse(rawMemoire);
          if (parsedMem && parsedMem.checks) {
            const vals = Object.values(parsedMem.checks);
            const checked = vals.filter(Boolean).length;
            setGuardPct(Math.round((checked / 8) * 100));
          }
        }
      } catch {
        // Ignore storage error
      }
    };

    syncBanner();
    window.addEventListener("pst:storage-updated", syncBanner);
    window.addEventListener("storage", syncBanner);
    return () => {
      window.removeEventListener("pst:storage-updated", syncBanner);
      window.removeEventListener("storage", syncBanner);
    };
  }, []);

  const dueCards = stats.totalDue || 0;

  return (
    <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 sm:p-4.5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left Status Indicator */}
        <div className="flex items-center gap-3">
          <div
            className={`size-9 rounded-2xl flex items-center justify-center shrink-0 ring-1 shadow-2xs ${
              dueCards > 0 || criticalTodosCount > 0
                ? "bg-amber-500/15 text-amber-700 dark:text-amber-400 ring-amber-500/25 border border-amber-500/30"
                : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 ring-emerald-500/25 border border-emerald-500/30"
            }`}
          >
            {dueCards > 0 || criticalTodosCount > 0 ? (
              <AlertTriangle className="size-4.5" />
            ) : (
              <CheckCircle2 className="size-4.5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest font-black text-slate-500 dark:text-slate-400">
                VEILLE OPÉRATIONNELLE &amp; ÉCHÉANCES CRITIQUES
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                Système Nominal
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 m-0 mt-0.5">
              {dueCards > 0 ? (
                <>
                  <strong className="text-amber-700 dark:text-amber-400">{dueCards} fiches SM-2</strong> à consolider aujourd'hui ·{" "}
                </>
              ) : (
                <>Algorithme SuperMemo-2 à jour · </>
              )}
              {criticalTodosCount > 0 ? (
                <>
                  <strong className="text-rose-700 dark:text-rose-400">{criticalTodosCount} livrable(s) critique(s)</strong> en attente ·{" "}
                </>
              ) : null}
              <span>
                Conformité Pre-Defense Guard : <strong>{guardPct}%</strong>
              </span>
            </p>
          </div>
        </div>

        {/* Right Actionable Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onOpenBriefing30s();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 backdrop-blur-md transition-all active:scale-95 shadow-2xs cursor-pointer"
          >
            <Zap className="size-3.5" />
            <span>Révision Flash 30s</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              onOpenMemoireStudio();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 border border-indigo-500/30 backdrop-blur-md transition-all active:scale-95 shadow-2xs cursor-pointer"
          >
            <ShieldCheck className="size-3.5" />
            <span>Guard RNCP 7 ({guardPct}%)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              onOpenExamSimulator();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-500/30 backdrop-blur-md transition-all active:scale-95 shadow-2xs cursor-pointer"
          >
            <Flame className="size-3.5" />
            <span>Lancer Sujet Blanc</span>
            <ArrowRight className="size-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default PstUrgentAlertsBanner;

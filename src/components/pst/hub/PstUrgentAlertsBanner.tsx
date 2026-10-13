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
    <div className="rounded-2xl border border-border/80 bg-card/95 p-3.5 shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left Status Indicator */}
        <div className="flex items-center gap-2.5">
          <div
            className={`size-8 rounded-xl flex items-center justify-center shrink-0 ${
              dueCards > 0 || criticalTodosCount > 0
                ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
            }`}
          >
            {dueCards > 0 || criticalTodosCount > 0 ? (
              <AlertTriangle className="size-4" />
            ) : (
              <CheckCircle2 className="size-4" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-muted-foreground">
                VEILLE OPÉRATIONNELLE &amp; ÉCHÉANCES CRITIQUES
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Système Nominal
              </span>
            </div>
            <p className="text-xs font-medium text-foreground m-0 mt-0.5">
              {dueCards > 0 ? (
                <>
                  <strong>{dueCards} fiches SM-2</strong> à consolider aujourd'hui ·{" "}
                </>
              ) : (
                <>Algorithme SuperMemo-2 à jour · </>
              )}
              {criticalTodosCount > 0 ? (
                <>
                  <strong>{criticalTodosCount} livrable(s) critique(s)</strong> en attente ·{" "}
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
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/25 transition-colors cursor-pointer"
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
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/25 transition-colors cursor-pointer"
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
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/25 transition-colors cursor-pointer"
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

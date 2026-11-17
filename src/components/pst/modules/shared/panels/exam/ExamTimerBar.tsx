import { GraduationCap, Clock, Play, Pause } from "lucide-react";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${m}:${String(ss).padStart(2, "0")}`;
}

interface ExamTimerBarProps {
  subjectIdx: number;
  totalSubjects: number;
  pctTime: number;
  isOverTime: boolean;
  elapsed: number;
  paused: boolean;
  finished: boolean;
  onTogglePause: () => void;
}

export function ExamTimerBar({
  subjectIdx,
  totalSubjects,
  pctTime,
  isOverTime,
  elapsed,
  paused,
  finished,
  onTogglePause,
}: ExamTimerBarProps) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3.5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
              <GraduationCap className="size-3 text-indigo-600 dark:text-indigo-400" />
              <span>
                Sujet {subjectIdx + 1} / {totalSubjects}
              </span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              <Clock className="size-3 text-amber-600 dark:text-amber-400" />
              <span>Objectif 30 min ({pctTime}%)</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 m-0">
            Rédige ton plan détaillé (intro, parties, conclusion) en conditions
            réelles d&apos;examen Cnam.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!finished && (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                triggerHaptic("selection");
                onTogglePause();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              {paused ? (
                <>
                  <Play className="size-3 fill-current" />
                  <span>Reprendre</span>
                </>
              ) : (
                <>
                  <Pause className="size-3 fill-current" />
                  <span>Pause</span>
                </>
              )}
            </button>
          )}
          <div
            className={`text-2xl sm:text-3xl font-mono font-extrabold tracking-tight tabular-nums ${
              isOverTime
                ? "text-rose-600 dark:text-rose-400"
                : "text-indigo-600 dark:text-indigo-400"
            }`}
          >
            {fmtTime(elapsed)}
          </div>
        </div>
      </div>

      {/* Minimal Apple Progress Bar */}
      <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ease-out rounded-full ${
            isOverTime ? "bg-rose-500" : "bg-indigo-500"
          }`}
          style={{ width: `${pctTime}%` }}
        />
      </div>
    </div>
  );
}

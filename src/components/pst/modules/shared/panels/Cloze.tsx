"use client";

import { useMemo, useState } from "react";
import { PenLine, Eye, EyeOff } from "lucide-react";
import type { AMap, ClozeItem } from "@/lib/pst/types";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface ClozeProps {
  data: ClozeItem[];
  authors: AMap;
  hint: string;
}

export function Cloze({ data, authors, hint }: ClozeProps) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const allBlankKeys = useMemo(() => {
    const keys: string[] = [];
    data.forEach(([, segments], ci) => {
      segments.forEach((sg, si) => {
        if (typeof sg !== "string") {
          keys.push(`${ci}-${si}`);
        }
      });
    });
    return keys;
  }, [data]);

  const totalBlanks = allBlankKeys.length;
  const revealedCount = revealed.size;
  const pct =
    totalBlanks > 0 ? Math.round((revealedCount * 100) / totalBlanks) : 0;

  function toggle(key: string) {
    playClickSound();
    triggerHaptic("selection");
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="space-y-4">
      {hint && <p className="hint">{hint}</p>}

      {/* Sticky Progress & Actions Header */}
      <div className="sticky top-14 z-20 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
            <PenLine className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>
              Termes révélés : {revealedCount} / {totalBlanks} ({pct}%)
            </span>
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                triggerHaptic("selection");
                setRevealed(new Set(allBlankKeys));
              }}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <Eye className="size-3" />
              <span>Tout révéler</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                triggerHaptic("selection");
                setRevealed(new Set());
              }}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <EyeOff className="size-3" />
              <span>Tout masquer</span>
            </button>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Cloze Cards List */}
      <div id="clozeHost" className="space-y-4">
        {data.map(([axis, segments], ci) => (
          <div
            key={ci}
            className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3.5"
          >
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
                <PenLine className="size-3 text-indigo-600 dark:text-indigo-400" />
                <span>Texte à trous · {authors[axis] ?? axis}</span>
              </span>

              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                Extrait #{ci + 1}
              </span>
            </div>

            <div className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 space-y-2 clz">
              {segments.map((sg, si) => {
                if (typeof sg === "string") {
                  return (
                    <span key={si} dangerouslySetInnerHTML={{ __html: sg }} />
                  );
                }
                const key = `${ci}-${si}`;
                const isRevealed = revealed.has(key);
                return (
                  <button
                    key={si}
                    type="button"
                    onClick={() => toggle(key)}
                    className={`inline-block mx-1 px-2 py-0.5 rounded-md font-mono text-xs font-bold transition-all cursor-pointer border ${
                      isRevealed
                        ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700 shadow-2xs"
                        : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-transparent select-none border-slate-300 dark:border-slate-700 underline decoration-dotted decoration-indigo-400"
                    }`}
                  >
                    {sg.h}
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 pt-1">
              Astuce : clique sur n&apos;importe quel mot masqué pour tester ta
              mémoire active.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

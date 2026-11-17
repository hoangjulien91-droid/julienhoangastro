"use client";

import { PenLine, Check } from "lucide-react";
import type { AMap, ClozeSegment } from "@/lib/pst/types";

interface ClozeCardProps {
  axis: string;
  segments: (string | ClozeSegment)[];
  ci: number;
  authors: AMap;
  mode: "flash" | "input";
  revealed: Set<string>;
  inputs: Record<string, { value: string; checked: boolean }>;
  norm: (s: string) => string;
  onToggle: (key: string) => void;
  onInputChange: (key: string, val: string) => void;
  onCheckInput: (key: string, target: string) => void;
  onRevealSingleInput: (key: string, target: string) => void;
}

export function ClozeCard({
  axis,
  segments,
  ci,
  authors,
  mode,
  revealed,
  inputs,
  norm,
  onToggle,
  onInputChange,
  onCheckInput,
  onRevealSingleInput,
}: ClozeCardProps) {
  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3.5">
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

          if (mode === "input") {
            const state = inputs[key] ?? { value: "", checked: false };
            const isOk = norm(state.value) === norm(sg.h);

            return (
              <span
                key={si}
                className="inline-flex items-center gap-1 mx-1 my-0.5 align-middle"
              >
                <input
                  type="text"
                  aria-label={`Compléter le texte à trous (${sg.h})`}
                  value={state.value}
                  disabled={state.checked && isOk}
                  placeholder="..."
                  onChange={(e) => onInputChange(key, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onCheckInput(key, sg.h);
                    }
                  }}
                  className={`px-2 py-0.5 rounded-lg font-mono text-xs font-bold text-center border outline-hidden transition-all ${
                    state.checked
                      ? isOk
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-400 dark:border-emerald-700 shadow-2xs"
                        : "bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-400 dark:border-rose-700 shadow-2xs"
                      : "bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/40"
                  }`}
                  style={{
                    width: `${Math.max(90, Math.min(220, (sg.h.length + 3) * 8.5))}px`,
                  }}
                />
                {!state.checked ? (
                  <button
                    type="button"
                    onClick={() => onCheckInput(key, sg.h)}
                    title="Vérifier (Entrée)"
                    className="p-1 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer transition-all active:scale-95"
                  >
                    <Check className="size-3" />
                  </button>
                ) : !isOk ? (
                  <button
                    type="button"
                    onClick={() => onRevealSingleInput(key, sg.h)}
                    title="Révéler la réponse attendue"
                    className="px-1.5 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-[10px] font-mono text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    Voir
                  </button>
                ) : null}
              </span>
            );
          }

          // Mode flash
          const isRevealed = revealed.has(key);
          return (
            <button
              key={si}
              type="button"
              onClick={() => onToggle(key)}
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
        {mode === "flash"
          ? "Astuce : clique sur n'importe quel mot masqué pour tester ta mémoire active."
          : "Astuce : tape le terme exact dans le champ et appuie sur Entrée pour valider."}
      </div>
    </div>
  );
}

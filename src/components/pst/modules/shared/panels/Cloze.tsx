"use client";

import { useMemo, useState } from "react";
import {
  PenLine,
  Eye,
  EyeOff,
  Keyboard,
  CheckCircle2,
  RotateCcw,
  Check,
} from "lucide-react";
import type { AMap, ClozeItem } from "@/lib/pst/types";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface ClozeProps {
  data: ClozeItem[];
  authors: AMap;
  hint: string;
}

function norm(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’\-]/g, " ");
}

export function Cloze({ data, authors, hint }: ClozeProps) {
  const [mode, setMode] = useState<"flash" | "input">("flash");
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [inputs, setInputs] = useState<
    Record<string, { value: string; checked: boolean }>
  >({});

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
  const pctRevealed =
    totalBlanks > 0 ? Math.round((revealedCount * 100) / totalBlanks) : 0;

  // Calcul score mode saisie
  const checkedInputsCount = Object.values(inputs).filter(
    (x) => x.checked,
  ).length;
  const correctInputsCount = useMemo(() => {
    let count = 0;
    data.forEach(([, segments], ci) => {
      segments.forEach((sg, si) => {
        if (typeof sg !== "string") {
          const key = `${ci}-${si}`;
          const item = inputs[key];
          if (item?.checked && norm(item.value) === norm(sg.h)) {
            count++;
          }
        }
      });
    });
    return count;
  }, [data, inputs]);

  const pctAccuracy =
    checkedInputsCount > 0
      ? Math.round((correctInputsCount * 100) / checkedInputsCount)
      : 0;

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

  function handleInputChange(key: string, val: string) {
    setInputs((prev) => ({
      ...prev,
      [key]: { value: val, checked: false },
    }));
  }

  function checkInput(key: string, target: string) {
    const curVal = inputs[key]?.value || "";
    const isOk = norm(curVal) === norm(target);
    if (isOk) {
      playSuccessSound();
      triggerHaptic("success");
    } else {
      playReviewSound();
      triggerHaptic("warning");
    }
    setInputs((prev) => ({
      ...prev,
      [key]: { value: curVal, checked: true },
    }));
  }

  function revealSingleInput(key: string, target: string) {
    playClickSound();
    triggerHaptic("selection");
    setInputs((prev) => ({
      ...prev,
      [key]: { value: target, checked: true },
    }));
  }

  function resetAll() {
    playClickSound();
    triggerHaptic("selection");
    setRevealed(new Set());
    setInputs({});
  }

  return (
    <div className="space-y-4">
      {hint && <p className="hint">{hint}</p>}

      {/* Sticky Progress & Actions Header */}
      <div className="sticky top-14 z-20 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 shadow-2xs">
              <PenLine className="size-3 text-indigo-600 dark:text-indigo-400" />
              <span>
                {mode === "flash"
                  ? `Révélés : ${revealedCount} / ${totalBlanks} (${pctRevealed}%)`
                  : `Vérifiés : ${checkedInputsCount} / ${totalBlanks}`}
              </span>
            </span>

            {mode === "input" && checkedInputsCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 shadow-2xs">
                <CheckCircle2 className="size-3 text-emerald-600 dark:text-emerald-400" />
                <span>
                  Score : {correctInputsCount} / {checkedInputsCount} (
                  {pctAccuracy}%)
                </span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Toggle Mode Flash / Saisie */}
            <div className="flex items-center gap-1 p-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setMode("flash");
                }}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  mode === "flash"
                    ? "bg-indigo-600 text-white shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                Clic Masqué
              </button>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setMode("input");
                }}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  mode === "input"
                    ? "bg-indigo-600 text-white shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                ⌨️ Saisie Active
              </button>
            </div>

            {mode === "flash" ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    triggerHaptic("selection");
                    setRevealed(new Set(allBlankKeys));
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
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
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
                >
                  <EyeOff className="size-3" />
                  <span>Tout masquer</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
              >
                <RotateCcw className="size-3" />
                <span>Réinitialiser</span>
              </button>
            )}
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${mode === "flash" ? pctRevealed : totalBlanks > 0 ? Math.round((checkedInputsCount * 100) / totalBlanks) : 0}%`,
            }}
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
                        value={state.value}
                        disabled={state.checked && isOk}
                        placeholder="..."
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            checkInput(key, sg.h);
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
                          onClick={() => checkInput(key, sg.h)}
                          title="Vérifier (Entrée)"
                          className="p-1 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer transition-all active:scale-95"
                        >
                          <Check className="size-3" />
                        </button>
                      ) : !isOk ? (
                        <button
                          type="button"
                          onClick={() => revealSingleInput(key, sg.h)}
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
              {mode === "flash"
                ? "Astuce : clique sur n'importe quel mot masqué pour tester ta mémoire active."
                : "Astuce : tape le terme exact dans le champ et appuie sur Entrée pour valider."}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

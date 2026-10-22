"use client";

import { useState, type ReactNode } from "react";
import {
  GitMerge,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { ProtoStep } from "@/lib/pst/types";
import { shuffleArr } from "@/lib/pst/utils";
import {
  playClickSound,
  playReviewSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface ProtocoleProps {
  data: ProtoStep[];
  hint: string;
  referenceExplanation: ReactNode;
}

export function Protocole({
  data,
  hint,
  referenceExplanation,
}: ProtocoleProps) {
  const [pool, setPool] = useState<number[]>(() =>
    shuffleArr(data.map((p) => p.n)),
  );
  const [order, setOrder] = useState<number[]>([]);

  function pick(n: number) {
    const nextOrder = [...order, n];
    setOrder(nextOrder);
    const expected = nextOrder.length;
    if (n === expected) {
      playClickSound();
      triggerHaptic("selection");
    } else {
      triggerHaptic("error");
    }

    if (nextOrder.length === data.length) {
      const isAllCorrect = nextOrder.every((num, idx) => num === idx + 1);
      if (isAllCorrect) {
        playSuccessSound();
        triggerHaptic("success");
      } else {
        playReviewSound();
      }
    }
  }

  function reset() {
    playClickSound();
    triggerHaptic("selection");
    setPool(shuffleArr(data.map((p) => p.n)));
    setOrder([]);
  }

  const finished = order.length === data.length;
  const correct = finished && order.every((n, i) => n === i + 1);
  const remaining = pool.filter((n) => !order.includes(n));

  return (
    <div className="space-y-5">
      {hint && <p className="hint">{hint}</p>}

      {/* 1. Protocole Méthodologique Officiel */}
      <div
        id="protoFrise"
        className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4"
      >
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
            <GitMerge className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Protocole Méthodologique Officiel</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold">
            {data.length} Étapes Séquentielles
          </span>
        </div>

        <div className="space-y-3">
          {data.map((s) => (
            <div
              key={s.n}
              className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 flex items-start gap-3.5"
            >
              <div className="size-7 rounded-xl bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                {s.n}
              </div>
              <div className="space-y-0.5 flex-1">
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 flex-wrap">
                  <span>{s.t}</span>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {s.role}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {s.d}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Jeu Interactif d'Ordonnancement */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            <Sparkles className="size-3 text-amber-600 dark:text-amber-400" />
            <span>Entraînement Actif · Séquençage Chronologique</span>
          </span>
        </div>

        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
          Clique sur les étapes pour les ordonner chronologiquement :
        </div>

        {/* Remaining pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {remaining.map((n) => {
            const step = data.find((p) => p.n === n);
            return (
              <button
                key={n}
                type="button"
                onClick={() => pick(n)}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer active:scale-95 shadow-2xs"
              >
                {step?.t}
              </button>
            );
          })}
        </div>

        {/* Selected order display */}
        <div className="min-h-12 p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 flex items-center gap-2 flex-wrap">
          {order.length === 0 ? (
            <span className="text-xs text-slate-400 dark:text-slate-500 italic">
              Clique sur les étapes ci-dessus pour construire la séquence
              chronologique…
            </span>
          ) : (
            order.map((n, i) => {
              const step = data.find((p) => p.n === n);
              const isRight = n === i + 1;
              return (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold border transition-all ${
                    isRight
                      ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700"
                      : "bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border-rose-300 dark:border-rose-700"
                  }`}
                >
                  <span>{i + 1}.</span>
                  <span>{step?.t}</span>
                </span>
              );
            })
          )}
        </div>

        {/* Result & explanation */}
        {finished && (
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-2 animate-fadeIn ${
              correct
                ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200"
                : "bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200"
            }`}
          >
            <div className="font-bold flex items-center gap-1.5">
              {correct ? (
                <>
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>Ordre chronologique parfaitement maîtrisé !</span>
                </>
              ) : (
                <>
                  <AlertCircle className="size-4 text-rose-600" />
                  <span>
                    Séquence incorrecte. Réexamine la logique méthodologique :
                  </span>
                </>
              )}
            </div>
            <div>{referenceExplanation}</div>
          </div>
        )}

        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
          >
            <RotateCcw className="size-3" />
            <span>Recommencer l&apos;exercice</span>
          </button>
        </div>
      </div>
    </div>
  );
}

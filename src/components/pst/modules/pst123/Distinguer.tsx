"use client";

import { useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import { DISTINCTION } from "@/lib/pst/data/pst123";
import { shuffleArr } from "@/lib/pst/utils";
import {
  playClickSound,
  playReviewSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  Scale,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Check,
  UserCheck,
  User,
} from "lucide-react";

type Zone = "pool" | "cat1" | "cat2";

const CAT1 = ["autrui"];
const CAT2 = ["soi"];

interface DistinguerProps {
  store: PstStore;
  onAnswered?: () => void;
}

export function Distinguer({ store, onAnswered }: DistinguerProps) {
  const [items] = useState(() =>
    shuffleArr(DISTINCTION.map((item, idx) => ({ ...item, idx }))),
  );
  const [zones, setZones] = useState<Record<number, Zone>>(() =>
    Object.fromEntries(items.map((it) => [it.idx, "pool" as Zone])),
  );
  const [checked, setChecked] = useState(false);

  function cycle(idx: number) {
    playClickSound();
    triggerHaptic("selection");
    setZones((prev) => {
      const cur = prev[idx] ?? "pool";
      const next: Zone =
        cur === "pool" ? "cat1" : cur === "cat1" ? "cat2" : "pool";
      return { ...prev, [idx]: next };
    });
    setChecked(false);
  }

  function reset() {
    playClickSound();
    triggerHaptic("selection");
    setZones(Object.fromEntries(items.map((it) => [it.idx, "pool" as Zone])));
    setChecked(false);
  }

  const pool = items.filter((it) => (zones[it.idx] ?? "pool") === "pool");
  const inCat1 = items.filter((it) => zones[it.idx] === "cat1");
  const inCat2 = items.filter((it) => zones[it.idx] === "cat2");

  function isCorrect(item: (typeof items)[number]) {
    const zone = zones[item.idx];
    if (zone === "cat1") return CAT1.includes(item.cat);
    if (zone === "cat2") return CAT2.includes(item.cat);
    return false;
  }

  function check() {
    if (pool.length > 0) return;
    setChecked(true);
    const correct = items.filter((it) => isCorrect(it)).length;
    if (correct === items.length) {
      playSuccessSound();
      triggerHaptic("success");
    } else {
      playReviewSound();
      triggerHaptic("error");
    }
    store.recordScore("distinguer", correct, items.length);
    onAnswered?.();
  }

  const allCorrect = checked && items.every((it) => isCorrect(it));

  return (
    <div className="space-y-4">
      <p className="hint">
        Distingue la double transaction identitaire (Claude Dubar) et les
        concepts sociologiques clés du cours pour l&apos;examen.
      </p>

      <div
        id="distHost"
        className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
            <Scale className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Matrice de Claude Dubar · Double Transaction</span>
          </span>

          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold">
            {pool.length === 0 ? "Tous classés" : `${pool.length} à classer`}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed font-medium">
          Clique chaque concept pour le faire basculer entre les colonnes :{" "}
          <b>Non classé ➔ Identité pour autrui ➔ Identité pour soi ➔ Retour</b>.
        </p>

        {/* Pool of unclassified concepts */}
        <div className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Concepts à classer ({pool.length})
          </span>

          <div className="flex items-center gap-2 flex-wrap min-h-10">
            {pool.length === 0 ? (
              <span className="text-xs text-slate-400 dark:text-slate-500 italic py-1">
                ✓ Tous les concepts ont été affectés à une colonne. Tu peux
                vérifier maintenant !
              </span>
            ) : (
              pool.map((item) => (
                <button
                  key={item.idx}
                  type="button"
                  onClick={() => cycle(item.idx)}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-400 transition-all cursor-pointer active:scale-95 shadow-2xs"
                >
                  {item.label}
                </button>
              ))
            )}
          </div>
        </div>

        {/* 2 Classification Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {/* Column 1: Pour autrui */}
          <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 border-t-4 border-t-indigo-600 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-indigo-700 dark:text-indigo-400 uppercase tracking-wide">
              <UserCheck className="size-3.5" />
              <span>Identité pour autrui (Attribution / Objectif)</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap min-h-14">
              {inCat1.length === 0 ? (
                <span className="text-xs text-slate-400 dark:text-slate-500 italic">
                  Clique sur un concept pour le placer ici
                </span>
              ) : (
                inCat1.map((item) => {
                  const ok = checked ? isCorrect(item) : undefined;
                  let chipCls =
                    "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200";

                  if (checked) {
                    chipCls = ok
                      ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200"
                      : "bg-rose-50 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-900 dark:text-rose-200";
                  }

                  return (
                    <button
                      key={item.idx}
                      type="button"
                      onClick={() => cycle(item.idx)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono font-semibold border transition-all cursor-pointer active:scale-95 shadow-2xs ${chipCls}`}
                    >
                      <span>{item.label}</span>
                      {checked &&
                        (ok ? (
                          <Check className="size-3 text-emerald-600" />
                        ) : (
                          <span className="text-rose-600 font-bold">✗</span>
                        ))}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Column 2: Pour soi */}
          <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 border-t-4 border-t-amber-500 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-amber-700 dark:text-amber-400 uppercase tracking-wide">
              <User className="size-3.5" />
              <span>Identité pour soi (Appartenance / Biographique)</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap min-h-14">
              {inCat2.length === 0 ? (
                <span className="text-xs text-slate-400 dark:text-slate-500 italic">
                  Clique sur un concept pour le placer ici
                </span>
              ) : (
                inCat2.map((item) => {
                  const ok = checked ? isCorrect(item) : undefined;
                  let chipCls =
                    "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200";

                  if (checked) {
                    chipCls = ok
                      ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200"
                      : "bg-rose-50 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-900 dark:text-rose-200";
                  }

                  return (
                    <button
                      key={item.idx}
                      type="button"
                      onClick={() => cycle(item.idx)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono font-semibold border transition-all cursor-pointer active:scale-95 shadow-2xs ${chipCls}`}
                    >
                      <span>{item.label}</span>
                      {checked &&
                        (ok ? (
                          <Check className="size-3 text-emerald-600" />
                        ) : (
                          <span className="text-rose-600 font-bold">✗</span>
                        ))}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
          <button
            type="button"
            disabled={pool.length > 0}
            onClick={check}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 shadow-xs transition-all cursor-pointer active:scale-95"
          >
            <CheckCircle2 className="size-3.5" />
            <span>Vérifier mon classement</span>
          </button>

          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
          >
            <RotateCcw className="size-3" />
            <span>Réinitialiser</span>
          </button>
        </div>

        {/* Feedback message */}
        {checked && (
          <div
            className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold text-center animate-fadeIn ${
              allCorrect
                ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200"
                : "bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200"
            }`}
          >
            {allCorrect
              ? "✓ Parfait ! La double transaction identitaire de Dubar est rigoureusement maîtrisée."
              : "✗ Certains concepts sont mal classés. Reclique sur les éléments en rouge pour corriger."}
          </div>
        )}

        {pool.length > 0 && (
          <div className="text-center text-xs text-slate-400 dark:text-slate-500 italic">
            Place d&apos;abord tous les concepts dans l&apos;une des deux
            colonnes pour activer la vérification.
          </div>
        )}
      </div>
    </div>
  );
}

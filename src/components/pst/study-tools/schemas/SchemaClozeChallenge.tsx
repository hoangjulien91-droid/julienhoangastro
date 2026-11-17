"use client";

import { Brain, CheckCircle2, Sparkles } from "lucide-react";
import type { ClozeItem } from "@/lib/pst/data/schemas-matrices-cloze";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface SchemaClozeChallengeProps {
  challenges: ClozeItem[];
  clozeAnswers: Record<string, string>;
  selectedSlotId: string | null;
  setSelectedSlotId: (id: string | null) => void;
  correctCount: number;
  isAllSolved: boolean;
  allAvailableBadges: string[];
  onSelectOption: (option: string) => void;
}

export function SchemaClozeChallenge({
  challenges,
  clozeAnswers,
  selectedSlotId,
  setSelectedSlotId,
  correctCount,
  isAllSolved,
  allAvailableBadges,
  onSelectOption,
}: SchemaClozeChallengeProps) {
  return (
    <div className="space-y-4 p-4 rounded-3xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-900/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="size-5 text-purple-600" />
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 m-0">
              Défi de Reconstitution Spatiale
            </h4>
            <p className="text-[11px] text-slate-500 m-0">
              Rétablissez les boîtes masquées du schéma pour valider votre mémoire visuelle.
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300">
          {correctCount} / {challenges.length} validés
        </span>
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {challenges.map((c, cIdx) => {
          const currentVal = clozeAnswers[c.id];
          const isCorrect = currentVal === c.answer;
          const isSelected = selectedSlotId === c.id;

          return (
            <div
              key={c.id}
              onClick={() => {
                playClickSound();
                setSelectedSlotId(c.id);
              }}
              className={`p-3 rounded-2xl border transition-all cursor-pointer space-y-1 ${
                isSelected
                  ? "ring-2 ring-purple-600 bg-white dark:bg-slate-900 shadow-md"
                  : isCorrect
                    ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500/50"
                    : currentVal
                      ? "bg-rose-50/70 dark:bg-rose-950/30 border-rose-500/50"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-300"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-slate-500 font-mono">
                  Boîte #{cIdx + 1}
                </span>
                <span className="text-[10px] text-slate-400 truncate max-w-[140px]">
                  {c.label}
                </span>
              </div>

              <div className="font-bold text-xs flex items-center justify-between min-h-[24px]">
                {currentVal ? (
                  <span
                    className={
                      isCorrect
                        ? "text-emerald-700 dark:text-emerald-300"
                        : "text-rose-700 dark:text-rose-300"
                    }
                  >
                    {currentVal}
                  </span>
                ) : (
                  <span className="text-slate-400 font-mono italic text-[11px]">
                    [ ? Cliquez pour placer le terme ]
                  </span>
                )}
                {isCorrect && (
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                )}
              </div>

              <p className="text-[10px] text-slate-500 dark:text-slate-400 m-0 leading-tight">
                Indice : {c.hint}
              </p>
            </div>
          );
        })}
      </div>

      {/* Success Banner if all solved */}
      {isAllSolved ? (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-1 animate-fadeIn">
          <span className="text-sm font-black text-emerald-800 dark:text-emerald-200 flex items-center justify-center gap-1.5">
            <Sparkles className="size-4" />
            Schéma Maîtrisé à 100% pour l&apos;Examen !
          </span>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 m-0">
            Vous avez reconstitué l&apos;intégralité des boîtes spatiales de ce modèle canonique.
          </p>
        </div>
      ) : (
        /* Word Bank Dock */
        <div className="space-y-2 pt-2 border-t border-purple-200/60 dark:border-purple-900/40">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Banque de Termes (Cliquez pour placer dans la case sélectionnée) :
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {allAvailableBadges.map((txt, tIdx) => (
              <button
                key={tIdx}
                type="button"
                onClick={() => onSelectOption(txt)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-purple-500 hover:bg-purple-500/10 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                {txt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

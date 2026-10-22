"use client";

import { useState } from "react";
import type { AMap, Flashcard } from "@/lib/pst/types";
import { shuffleArr } from "@/lib/pst/utils";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Award,
} from "lucide-react";

interface SwipeGameProps {
  cartes: Flashcard[];
  currentAxis: string;
  authors: AMap;
}

function buildDeck(cartes: Flashcard[], currentAxis: string) {
  const base = cartes.filter(
    (c) => currentAxis === "all" || c.axis === currentAxis,
  );
  return shuffleArr(base).slice(0, 10);
}

export function SwipeGame({ cartes, currentAxis, authors }: SwipeGameProps) {
  const [deck, setDeck] = useState(() => buildDeck(cartes, currentAxis));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  function restart() {
    triggerHaptic("light");
    playClickSound();
    setDeck(buildDeck(cartes, currentAxis));
    setIdx(0);
    setScore(0);
    setSelected(null);
  }

  if (idx >= deck.length) {
    const isSuccess = score >= 8;
    const isAverage = score >= 5;
    const verdict = isSuccess
      ? "Excellente maîtrise conceptuelle !"
      : isAverage
        ? "Bonne classification doctrinale."
        : "Classification à réviser.";

    const badgeColor = isSuccess
      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
      : isAverage
        ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30"
        : "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30";

    return (
      <div id="swipeGameHost" className="mt-3">
        <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card text-center space-y-4 shadow-sm animate-in fade-in duration-200">
          <div className="size-12 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto shadow-2xs">
            <Award className="size-6" />
          </div>

          <div className="space-y-1">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold border ${badgeColor}`}
            >
              {verdict}
            </span>
            <h3 className="text-xl font-serif font-bold text-foreground m-0 pt-2">
              Classification Terminée
            </h3>
          </div>

          <div className="font-mono text-4xl sm:text-5xl font-black text-foreground">
            {score}{" "}
            <span className="text-muted-foreground text-2xl font-normal">
              / {deck.length}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Vous avez classé les concepts clés dans leurs perspectives
            théoriques et auteurs respectifs.
          </p>

          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs font-bold bg-primary text-primary-foreground shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer"
            onClick={restart}
          >
            <RotateCcw className="size-3.5" />
            <span>Recommencer une série</span>
          </button>
        </div>
      </div>
    );
  }

  const card = deck[idx];
  if (!card) return null;
  const answered = selected !== null;
  const correctKey = card.a;

  function handleSelect(key: string) {
    if (answered) return;
    setSelected(key);
    if (key === correctKey) {
      triggerHaptic("success");
      playSuccessSound();
      setScore((s) => s + 1);
    } else {
      triggerHaptic("warning");
      playReviewSound();
    }
  }

  function next() {
    triggerHaptic("light");
    playClickSound();
    setIdx((i) => i + 1);
    setSelected(null);
  }

  const percent = Math.round((100 * idx) / deck.length);

  return (
    <div id="swipeGameHost" className="mt-3 space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between text-xs font-mono font-bold text-muted-foreground px-1">
        <span>
          Question : <strong className="text-foreground">{idx + 1}</strong> /{" "}
          {deck.length}
        </span>
        <span>
          Score : <strong className="text-accent">{score}</strong>
        </span>
      </div>

      {/* Apple-grade Minimal Progress Bar */}
      <div className="h-1.5 w-full bg-muted/60 rounded-full overflow-hidden">
        <div
          className="bg-accent h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Central Question Card */}
      <div
        className={`p-6 sm:p-7 rounded-3xl border border-border bg-card shadow-xs text-center relative transition-all duration-300 ${
          answered
            ? selected === correctKey
              ? "border-emerald-500/50 bg-emerald-500/5 rotate-1"
              : "border-rose-500/50 bg-rose-500/5 -rotate-1"
            : ""
        }`}
      >
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-accent/10 text-accent border border-accent/20 mb-3 shadow-2xs">
          Axe : {card.tag}
        </span>

        <h4 className="text-sm sm:text-base font-serif font-bold text-foreground leading-relaxed m-0">
          « {card.q} »
        </h4>
      </div>

      {/* Target Category Selector */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-bold block text-center">
          Associer à la bonne catégorie doctrinale :
        </span>

        <div className="grid grid-cols-1 gap-2">
          {Object.keys(authors).map((key) => {
            const isCorrectKey = key === correctKey;
            const isSelected = key === selected;

            let buttonClasses =
              "w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ";

            if (answered) {
              if (isCorrectKey) {
                buttonClasses +=
                  "bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 shadow-2xs";
              } else if (isSelected) {
                buttonClasses +=
                  "bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-300 shadow-2xs";
              } else {
                buttonClasses +=
                  "bg-muted/30 border-border/60 text-muted-foreground opacity-60";
              }
            } else {
              buttonClasses +=
                "bg-card hover:bg-muted/60 border-border hover:border-accent/40 text-foreground active:scale-98";
            }

            return (
              <button
                key={key}
                type="button"
                className={buttonClasses}
                disabled={answered}
                onClick={() => handleSelect(key)}
              >
                <div className="flex items-center justify-between gap-2">
                  <span>{authors[key]}</span>
                  {answered && isCorrectKey && (
                    <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                  {answered && isSelected && !isCorrectKey && (
                    <XCircle className="size-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pedagogical Explanation Box */}
      {answered && (
        <div
          className={`p-4 rounded-2xl border text-xs leading-relaxed animate-in fade-in duration-150 ${
            selected === correctKey
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200"
              : "bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-200"
          }`}
        >
          {selected === correctKey ? (
            <div className="space-y-1">
              <strong className="block font-serif text-emerald-800 dark:text-emerald-300">
                ✓ Juste :
              </strong>
              <span>{card.deep}</span>
            </div>
          ) : (
            <div className="space-y-1">
              <strong className="block font-serif text-rose-800 dark:text-rose-300">
                ✗ Erreur doctrinale · Rattachement exact : {authors[correctKey]}
              </strong>
              <span>{card.deep}</span>
            </div>
          )}
        </div>
      )}

      {/* Next Step Action */}
      {answered && (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs font-bold bg-primary text-primary-foreground shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer"
            onClick={next}
          >
            <span>Continuer</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

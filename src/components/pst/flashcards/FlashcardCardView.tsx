"use client";

import { useRef, useState } from "react";
import type { Flashcard } from "@/lib/pst/types";
import type { PstStore } from "@/lib/pst/store";
import { findSchemaForCard } from "@/lib/pst/data/flashcards-helpers";
import {
  playClickSound,
  playFlipSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { toast } from "sonner";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Eye,
  Lightbulb,
  PenLine,
  RotateCcw,
  Sparkles,
  Star,
} from "lucide-react";

export interface FlashcardCardViewProps {
  card: Flashcard;
  deckLength: number;
  fcIdx: number;
  store: PstStore;
  flipped: boolean;
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  recallText: string;
  setRecallText: React.Dispatch<React.SetStateAction<string>>;
  showRecallInput: boolean;
  setShowRecallInput: React.Dispatch<React.SetStateAction<boolean>>;
  onGrade: (result: "ko" | "mid" | "ok") => void;
  onNext: () => void;
  onPrev: () => void;
  onStoreChange: () => void;
  onVersionBump: () => void;
}

export function FlashcardCardView({
  card,
  deckLength,
  fcIdx,
  store,
  flipped,
  setFlipped,
  recallText,
  setRecallText,
  showRecallInput,
  setShowRecallInput,
  onGrade,
  onNext,
  onPrev,
  onStoreChange,
  onVersionBump,
}: FlashcardCardViewProps) {
  const [swipeDx, setSwipeDx] = useState(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressedRef = useRef(false);

  return (
    <>
      <div className="relative">
        {Math.abs(swipeDx) > 28 && (
          <div
            className={`pointer-events-none absolute top-3 z-20 px-3 py-1 rounded-full text-xs font-bold shadow-md transition-opacity ${
              swipeDx > 0
                ? "right-3 bg-emerald-600 text-white"
                : "left-3 bg-rose-600 text-white"
            }`}
          >
            {swipeDx > 0 ? "Su ✓ →" : "← À revoir"}
          </div>
        )}
        <div
          id="fc"
          role="button"
          tabIndex={0}
          aria-label={
            flipped
              ? "Carte retournée — Entrée ou Espace pour revoir la question"
              : "Carte — Entrée ou Espace pour révéler la réponse"
          }
          onClick={() => {
            if (longPressedRef.current) {
              longPressedRef.current = false;
              return;
            }
            if (Math.abs(swipeDx) > 12) return;
            playFlipSound();
            setFlipped((f) => !f);
          }}
          onTouchStart={(e) => {
            const t = e.touches[0];
            if (!t) return;
            touchStartRef.current = { x: t.clientX, y: t.clientY };
            longPressedRef.current = false;
            setSwipeDx(0);
            if (longPressTimerRef.current) {
              clearTimeout(longPressTimerRef.current);
            }
            longPressTimerRef.current = setTimeout(() => {
              longPressedRef.current = true;
              playClickSound();
              triggerHaptic("medium");
              const curFav = !!store.getMarks()[`fav_${card.id}`];
              store.setMark(`fav_${card.id}`, !curFav);
              onVersionBump();
              onStoreChange();
              toast.success(
                !curFav
                  ? "Carte épinglée en favori ⭐"
                  : "Retirée des favoris",
              );
            }, 450);
          }}
          onTouchMove={(e) => {
            const start = touchStartRef.current;
            const t = e.touches[0];
            if (!start || !t) return;
            const dx = t.clientX - start.x;
            const dy = t.clientY - start.y;
            if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
              if (longPressTimerRef.current) {
                clearTimeout(longPressTimerRef.current);
                longPressTimerRef.current = null;
              }
            }
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
              setSwipeDx(Math.max(-120, Math.min(120, dx)));
            }
          }}
          onTouchEnd={() => {
            if (longPressTimerRef.current) {
              clearTimeout(longPressTimerRef.current);
              longPressTimerRef.current = null;
            }
            if (swipeDx > 65) {
              setSwipeDx(0);
              touchStartRef.current = null;
              onGrade("ok");
            } else if (swipeDx < -65) {
              setSwipeDx(0);
              touchStartRef.current = null;
              onGrade("ko");
            } else {
              setSwipeDx(0);
              touchStartRef.current = null;
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              playFlipSound();
              setFlipped((f) => !f);
            }
          }}
          className={`w-full max-w-2xl mx-auto my-3 rounded-3xl border transition-all duration-300 shadow-sm cursor-pointer select-none text-left relative overflow-hidden ${
            flipped
              ? "bg-gradient-to-b from-amber-500/[0.04] via-card to-card border-amber-500/40 shadow-amber-500/5 ring-1 ring-amber-500/20"
              : "bg-card border-border hover:border-amber-500/40 hover:shadow-md"
          }`}
          style={{
            transform:
              swipeDx !== 0
                ? `translateX(${swipeDx * 0.45}px) rotate(${swipeDx * 0.04}deg)`
                : undefined,
            transition: swipeDx === 0 ? "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease" : "none",
          }}
        >
          {!flipped ? (
            /* ===== RECTO (QUESTION) ===== */
            <div className="p-5 sm:p-7 space-y-4 animate-in fade-in duration-200">
              {/* Header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                    {card.tag}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-muted text-muted-foreground border border-border">
                    Boîte {store.getBox(card.id)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                      const curFav = !!store.getMarks()[`fav_${card.id}`];
                      store.setMark(`fav_${card.id}`, !curFav);
                      onVersionBump();
                      onStoreChange();
                    }}
                    className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                      store.getMarks()[`fav_${card.id}`]
                        ? "text-amber-500 hover:bg-amber-500/10"
                        : "text-slate-400 hover:text-amber-500 hover:bg-amber-500/10"
                    }`}
                    title="Épingler cette carte en favori ⭐"
                  >
                    <Star
                      className={`size-4 ${
                        store.getMarks()[`fav_${card.id}`]
                          ? "fill-amber-400 text-amber-500"
                          : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Active Recall Input */}
              <div className="w-full">
                {showRecallInput ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="font-semibold">
                        ✍️ Rappel actif de mémoire (sans regarder) :
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowRecallInput(false);
                        }}
                        className="text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                      >
                        Masquer
                      </button>
                    </div>
                    <textarea
                      id="fcRecallInput"
                      placeholder="Écris ce dont tu te souviens de mémoire avant de révéler..."
                      value={recallText}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setRecallText(e.target.value)}
                      className="w-full h-16 p-2.5 rounded-xl border border-border bg-muted/40 text-xs text-foreground resize-none font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowRecallInput(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-muted-foreground hover:text-amber-600 dark:hover:text-amber-400 hover:bg-muted transition-colors cursor-pointer"
                  >
                    <PenLine className="size-3.5 text-amber-500" />
                    <span>✍️ Écrire ma réponse de mémoire (facultatif)</span>
                  </button>
                )}
              </div>

              {/* Question Content */}
              <div className="space-y-2 pt-1">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                  <Sparkles className="size-3 text-amber-500" />
                  <span>Question d&apos;examen (Rappel Actif) :</span>
                </span>
                <div id="fcQ" className="text-base sm:text-lg font-serif font-bold text-foreground leading-relaxed">
                  {card.q}
                </div>
              </div>

              {/* Reveal Button */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playFlipSound();
                    setFlipped(true);
                  }}
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/20 to-amber-600/15 hover:from-amber-500/25 hover:to-amber-600/25 text-amber-950 dark:text-amber-200 border border-amber-500/40 font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-2xs transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Eye className="size-4 text-amber-600 dark:text-amber-400" />
                  <span>👁️ Révéler la Réponse Doctrinale (Espace ou Clic)</span>
                  <ArrowRight className="size-3.5 opacity-60 ml-1" />
                </button>
              </div>
            </div>
          ) : (
            /* ===== VERSO (RÉPONSE) ===== */
            <div className="p-5 sm:p-7 space-y-4 animate-in fade-in duration-200">
              {/* Header Verso */}
              <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                    <CheckCircle2 className="size-3 text-emerald-600 dark:text-emerald-400" />
                    <span>Réponse Doctrinale Attendue</span>
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-muted text-muted-foreground border border-border">
                    Boîte {store.getBox(card.id)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playFlipSound();
                      setFlipped(false);
                    }}
                    className="px-2.5 py-1 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-1 transition-colors cursor-pointer"
                    title="Revoir la question"
                  >
                    <RotateCcw className="size-3 text-amber-500" />
                    <span>Question</span>
                  </button>
                </div>
              </div>

              {/* Question reminder quote */}
              <div className="p-2.5 rounded-xl bg-muted/30 border border-border/50 text-xs text-muted-foreground italic leading-relaxed">
                « {card.q} »
              </div>

              {/* Core Answer Highlight */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-emerald-950 dark:text-emerald-100 space-y-1">
                <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  Synthèse d&apos;Examen (18/20) :
                </span>
                <div id="fcA" className="text-xs sm:text-sm font-semibold leading-relaxed" dangerouslySetInnerHTML={{ __html: card.a }} />
              </div>

              {/* Deep Explanation */}
              {card.deep && (
                <div className="space-y-1.5 pt-1">
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Approfondissement & Analyse Théorique :
                  </span>
                  <div
                    id="fcDeep"
                    className="prose-clean text-xs sm:text-sm text-foreground/90 space-y-2 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: card.deep }}
                  />
                </div>
              )}

              {/* Practical Example */}
              {card.ex && (
                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/25 text-xs text-sky-950 dark:text-sky-200 flex items-start gap-2">
                  <Lightbulb className="size-3.5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <strong className="block text-[10px] font-mono font-bold uppercase text-sky-800 dark:text-sky-300">
                      Exemple concret d&apos;application :
                    </strong>
                    <span>{card.ex}</span>
                  </div>
                </div>
              )}

              {/* Trap */}
              {card.trap && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2">
                  <AlertTriangle className="size-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <strong className="block text-[10px] font-mono font-bold uppercase text-amber-800 dark:text-amber-300">
                      Piège d&apos;examen à éviter :
                    </strong>
                    <span>{card.trap}</span>
                  </div>
                </div>
              )}

              {/* Schema Link */}
              {(() => {
                const matchedSchema = findSchemaForCard(card.q, card.a, card.deep, card.tag);
                if (!matchedSchema) return null;
                return (
                  <div className="p-2.5 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-500/30 flex items-center justify-between gap-2 text-left">
                    <div className="flex items-center gap-2">
                      <span className="size-6 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                        🎨
                      </span>
                      <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                        Ancre Visuelle : Schéma SVG 18/20
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playClickSound();
                        window.dispatchEvent(
                          new CustomEvent("pst:open-schemas", {
                            detail: { schemaId: matchedSchema },
                          }),
                        );
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-xs transition-all cursor-pointer"
                      title="Voir le schéma vectoriel interactif"
                    >
                      <Eye className="size-3.5" />
                      <span>Voir le Schéma</span>
                    </button>
                  </div>
                );
              })()}

              {/* Compare Recall Text */}
              {recallText.trim() && (
                <div
                  id="fcCompareWrap"
                  className="p-3 border-t border-dashed border-border bg-muted/40 text-xs rounded-xl"
                >
                  <div className="text-muted-foreground font-semibold mb-1">
                    Ta réponse rédigée de mémoire :
                  </div>
                  <div className="italic text-foreground whitespace-pre-wrap">
                    {recallText}
                  </div>
                </div>
              )}

              {/* Hint to Flip Back */}
              <div className="pt-2 text-center text-[11px] text-muted-foreground opacity-80">
                ↺ Cliquer sur la carte ou appuyer sur [Espace] pour retourner · Évalue ta rétention ci-dessous (1, 2 ou 3)
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        id="fcCount"
        className="text-center text-xs font-mono text-slate-500 my-1.5"
      >
        {fcIdx + 1} / {deckLength} ·{" "}
        <span className="text-[11px] opacity-80">
          Glisser ← À revoir / Su →
        </span>
      </div>

      {/* Grading Row */}
      <div className="srsrow flex items-center justify-center gap-2.5 my-3">
        <button
          id="markKo"
          type="button"
          className="px-4 py-2.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-800 dark:text-rose-200 border border-rose-500/30 font-bold text-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-2xs"
          onClick={() => onGrade("ko")}
        >
          <span>← À revoir</span>
          <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px]">
            1
          </kbd>
        </button>
        <button
          id="markMid"
          type="button"
          className="px-4 py-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 font-bold text-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-2xs"
          onClick={() => onGrade("mid")}
        >
          <span>Moyen</span>
          <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px]">
            2
          </kbd>
        </button>
        <button
          id="markOk"
          type="button"
          className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-2xs"
          onClick={() => onGrade("ok")}
        >
          <span>Su ✓ →</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/20 font-mono text-[10px]">
            3
          </kbd>
        </button>
      </div>

      {/* Prev / Next buttons */}
      <div className="navrow flex items-center justify-center gap-2 mt-2">
        <button
          id="prev"
          type="button"
          className="inline-flex items-center gap-1 px-4 py-2 rounded-full font-mono text-xs font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border transition-all active:scale-95 cursor-pointer shadow-2xs"
          onClick={onPrev}
        >
          ← Précédent
        </button>
        <button
          id="next"
          type="button"
          className="inline-flex items-center gap-1 px-4 py-2 rounded-full font-mono text-xs font-semibold bg-muted/60 hover:bg-muted text-foreground border border-border transition-all active:scale-95 cursor-pointer shadow-2xs"
          onClick={onNext}
        >
          Suivant →
        </button>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="text-center text-[11px] font-mono text-muted-foreground mt-3 flex items-center justify-center gap-1.5 flex-wrap">
        <span>Raccourcis :</span>
        <kbd className="px-1.5 py-0.5 rounded-md bg-muted text-foreground border border-border/80 font-mono text-[10px] font-bold">
          Espace
        </kbd>
        <span>Retourner</span>
        <span>·</span>
        <kbd className="px-1.5 py-0.5 rounded-md bg-muted text-foreground border border-border/80 font-mono text-[10px] font-bold">
          1
        </kbd>
        <span>À revoir</span>
        <span>·</span>
        <kbd className="px-1.5 py-0.5 rounded-md bg-muted text-foreground border border-border/80 font-mono text-[10px] font-bold">
          2
        </kbd>
        <span>Moyen</span>
        <span>·</span>
        <kbd className="px-1.5 py-0.5 rounded-md bg-muted text-foreground border border-border/80 font-mono text-[10px] font-bold">
          3
        </kbd>
        <span>Su</span>
        <span>·</span>
        <kbd className="px-1.5 py-0.5 rounded-md bg-muted text-foreground border border-border/80 font-mono text-[10px] font-bold">
          ←/→
        </kbd>
        <span>Naviguer</span>
      </div>
    </>
  );
}

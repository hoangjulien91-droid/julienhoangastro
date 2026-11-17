"use client";

import { useRef, useState } from "react";
import type { Flashcard } from "@/lib/pst/types";
import type { PstStore } from "@/lib/pst/store";
import {
  playClickSound,
  playFlipSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { toast } from "sonner";
import { FlashcardRectoView } from "./card/FlashcardRectoView";
import { FlashcardVersoView } from "./card/FlashcardVersoView";
import { FlashcardGradingBar } from "./card/FlashcardGradingBar";

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

  const isFav = !!store.getMarks()[`fav_${card.id}`];
  const box = store.getBox(card.id);

  const toggleFav = () => {
    store.setMark(`fav_${card.id}`, !isFav);
    onVersionBump();
    onStoreChange();
    toast.success(
      !isFav ? "Carte épinglée en favori ⭐" : "Retirée des favoris",
    );
  };

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
              toggleFav();
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
            transition:
              swipeDx === 0
                ? "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease"
                : "none",
          }}
        >
          {!flipped ? (
            <FlashcardRectoView
              card={card}
              box={box}
              isFav={isFav}
              showRecallInput={showRecallInput}
              recallText={recallText}
              onToggleFav={toggleFav}
              onToggleRecallInput={setShowRecallInput}
              onRecallTextChange={setRecallText}
              onReveal={() => setFlipped(true)}
            />
          ) : (
            <FlashcardVersoView
              card={card}
              box={box}
              recallText={recallText}
              onFlipToQuestion={() => setFlipped(false)}
            />
          )}
        </div>
      </div>

      <FlashcardGradingBar
        fcIdx={fcIdx}
        deckLength={deckLength}
        onGrade={onGrade}
        onPrev={onPrev}
        onNext={onNext}
      />
    </>
  );
}

export default FlashcardCardView;

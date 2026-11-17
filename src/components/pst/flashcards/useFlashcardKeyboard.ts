import { useEffect, type RefObject } from "react";
import { toast } from "sonner";
import type { PstStore } from "@/lib/pst/store";
import type { Flashcard } from "@/lib/pst/types";
import {
  playFlipSound,
  playClickSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface UseFlashcardKeyboardProps {
  containerRef: RefObject<HTMLDivElement | null>;
  mode: "classic" | "swipe";
  deckLength: number;
  fcIdx: number;
  flipped: boolean;
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  setFcIdx: React.Dispatch<React.SetStateAction<number>>;
  setRecallText: (text: string) => void;
  card: Flashcard | null;
  store: PstStore;
  onGrade: (result: "ok" | "mid" | "ko") => void;
  onVersionBump: () => void;
}

export function useFlashcardKeyboard({
  containerRef,
  mode,
  deckLength,
  fcIdx,
  flipped,
  setFlipped,
  setFcIdx,
  setRecallText,
  card,
  store,
  onGrade,
  onVersionBump,
}: UseFlashcardKeyboardProps) {
  useEffect(() => {
    function onKey(e: globalThis.KeyboardEvent) {
      const tgt = e.target as HTMLElement | null;
      if (
        tgt &&
        (tgt.tagName === "INPUT" ||
          tgt.tagName === "TEXTAREA" ||
          tgt.isContentEditable)
      ) {
        return;
      }
      const panel = containerRef.current?.closest(".panel");
      if (panel && !panel.classList.contains("on")) return;
      if (mode !== "classic" || !deckLength) return;

      const isNavKey =
        e.key === " " ||
        e.key === "ArrowRight" ||
        e.key === "ArrowLeft" ||
        e.key === "j" ||
        e.key === "J" ||
        e.key === "k" ||
        e.key === "K" ||
        e.key === "f" ||
        e.key === "F" ||
        (flipped && (e.key === "1" || e.key === "2" || e.key === "3"));

      if (!isNavKey) return;

      if (tgt && (tgt.tagName === "BUTTON" || tgt.tagName === "SELECT")) {
        tgt.blur();
      }

      if (e.key === " ") {
        e.preventDefault();
        playFlipSound();
        setFlipped((f) => !f);
      } else if (e.key === "ArrowRight" || e.key === "j" || e.key === "J") {
        e.preventDefault();
        setFcIdx((i) => (i + 1) % deckLength);
        setFlipped(false);
        setRecallText("");
      } else if (e.key === "ArrowLeft" || e.key === "k" || e.key === "K") {
        e.preventDefault();
        setFcIdx((i) => (i - 1 + deckLength) % deckLength);
        setFlipped(false);
        setRecallText("");
      } else if ((e.key === "f" || e.key === "F") && card) {
        e.preventDefault();
        playClickSound();
        triggerHaptic("medium");
        const curFav = !!store.getMarks()[`fav_${card.id}`];
        store.setMark(`fav_${card.id}`, !curFav);
        onVersionBump();
        toast.success(
          !curFav ? "Carte épinglée en favori ⭐" : "Retirée des favoris",
        );
      } else if (e.key === "1" || e.key === "2" || e.key === "3") {
        e.preventDefault();
        if (!flipped) {
          playFlipSound();
          setFlipped(true);
          toast.info(
            "Vérifie d'abord la réponse doctrinale avant d'enregistrer ta note !",
          );
        } else {
          onGrade(e.key === "1" ? "ko" : e.key === "2" ? "mid" : "ok");
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [
    containerRef,
    mode,
    deckLength,
    fcIdx,
    flipped,
    setFlipped,
    setFcIdx,
    setRecallText,
    card,
    store,
    onGrade,
    onVersionBump,
  ]);
}

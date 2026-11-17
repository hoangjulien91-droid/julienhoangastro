"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import type { PstStore } from "@/lib/pst/store";
import type { Flashcard } from "@/lib/pst/types";
import { useCurrentCardText } from "@/components/pst/shell/CurrentCardContext";
import {
  stripHtml,
  buildDeck,
  exportDeckToAnki,
  exportDeckToMarkdown,
} from "@/lib/pst/data/flashcards-helpers";
import {
  playFlipSound,
  playSuccessSound,
  playReviewSound,
  playDeckCompleteSound,
  playClickSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

export function useFlashcardsState(
  store: PstStore,
  cartes: Flashcard[],
  onStoreChange: () => void,
  revisionTrigger?: number,
) {
  const [mode, setMode] = useState<"classic" | "swipe">("classic");
  const [currentAxis, setCurrentAxis] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [shuffleOn, setShuffleOn] = useState(false);
  const [onlyKo, setOnlyKo] = useState(false);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [dueOnly, setDueOnly] = useState(false);
  const [hideBonus, setHideBonus] = useState(false);
  const [leitnerSort, setLeitnerSort] = useState(false);
  const [leitnerFilter, setLeitnerFilter] = useState<number | null>(null);
  const [fcIdx, setFcIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [recallText, setRecallText] = useState("");
  const [showRecallInput, setShowRecallInput] = useState(false);
  const [version, setVersion] = useState(0);
  const [isAudioHandsFree, setIsAudioHandsFree] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cartes dues aujourd'hui selon l'échéancier SM-2
  const dueSet = useMemo(
    () => new Set(store.getDueCardIds(cartes.map((c) => c.id))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartes, store, version],
  );

  const firstRevisionTrigger = useRef(0);
  useEffect(() => {
    if (
      revisionTrigger === undefined ||
      revisionTrigger === firstRevisionTrigger.current
    )
      return;
    firstRevisionTrigger.current = revisionTrigger;
    setMode("classic");
    setDueOnly(dueSet.size > 0);
    setLeitnerSort(true);
    setLeitnerFilter(null);
    setFcIdx(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revisionTrigger]);

  const deck = useMemo(
    () =>
      buildDeck(cartes, store, {
        axis: currentAxis,
        onlyKo,
        dueOnly,
        dueSet,
        leitnerFilter,
        search: searchQuery,
        leitnerSort,
        shuffle: shuffleOn,
        hideBonus,
        onlyFavs,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      cartes,
      currentAxis,
      onlyKo,
      onlyFavs,
      dueOnly,
      leitnerFilter,
      searchQuery,
      leitnerSort,
      shuffleOn,
      hideBonus,
      version,
    ],
  );

  useEffect(() => {
    if (fcIdx >= deck.length) setFcIdx(0);
  }, [deck, fcIdx]);

  const card = deck[fcIdx] ?? null;

  const { setText: setSpokenCardText } = useCurrentCardText();
  useEffect(() => {
    if (!card) return;
    setSpokenCardText(
      [card.q, stripHtml(card.a), stripHtml(card.deep)]
        .filter(Boolean)
        .join(". "),
    );
  }, [card, setSpokenCardText]);

  function bump() {
    setVersion((v) => v + 1);
    onStoreChange();
  }

  function markAndAdvance(result: "ok" | "mid" | "ko") {
    if (!deck.length || !card) return;
    if (result === "ok") playSuccessSound();
    else playReviewSound();
    store.markCard(card.id, result);
    const nextIdx = fcIdx + 1;
    if (nextIdx >= deck.length) {
      playDeckCompleteSound();
      setFcIdx(0);
    } else {
      setFcIdx(nextIdx);
    }
    setFlipped(false);
    setRecallText("");
    bump();
  }

  function handleSrsGrade(result: "ok" | "mid" | "ko") {
    if (!flipped) {
      playFlipSound();
      setFlipped(true);
      toast.info(
        "Vérifie d'abord la réponse doctrinale avant d'enregistrer ta note !",
      );
      return;
    }
    markAndAdvance(result);
  }

  function resetBoxes() {
    store.resetBoxes();
    setLeitnerFilter(null);
    setFcIdx(0);
    bump();
  }

  function handleExportAnki() {
    triggerHaptic("light");
    playClickSound();
    const targetCards = deck.length > 0 ? deck : cartes;
    if (targetCards.length === 0) {
      toast.error("Aucune flashcard à exporter.");
      return;
    }
    exportDeckToAnki(targetCards);
    toast.success(
      `${targetCards.length} flashcards exportées pour Anki (.tsv) !`,
    );
  }

  function handleExportMarkdown() {
    triggerHaptic("light");
    playClickSound();
    const targetCards = deck.length > 0 ? deck : cartes;
    if (targetCards.length === 0) {
      toast.error("Aucune flashcard à exporter.");
      return;
    }
    exportDeckToMarkdown(targetCards);
    toast.success(
      `${targetCards.length} flashcards exportées en Markdown (.md) !`,
    );
  }

  let ok = 0;
  cartes.forEach((c) => {
    if (store.getBox(c.id) >= 4) ok++;
  });
  const dueCount = dueSet.size;
  const allMarks = store.getMarks();
  let dueNew = 0;
  dueSet.forEach((id) => {
    if (allMarks[id] === undefined) dueNew++;
  });
  const dueReview = dueCount - dueNew;
  const rest = cartes.length - ok;

  return {
    mode,
    setMode,
    currentAxis,
    setCurrentAxis,
    searchQuery,
    setSearchQuery,
    shuffleOn,
    setShuffleOn,
    onlyKo,
    setOnlyKo,
    onlyFavs,
    setOnlyFavs,
    dueOnly,
    setDueOnly,
    hideBonus,
    setHideBonus,
    leitnerSort,
    setLeitnerSort,
    leitnerFilter,
    setLeitnerFilter,
    fcIdx,
    setFcIdx,
    flipped,
    setFlipped,
    recallText,
    setRecallText,
    showRecallInput,
    setShowRecallInput,
    isAudioHandsFree,
    setIsAudioHandsFree,
    containerRef,
    deck,
    card,
    bump,
    markAndAdvance,
    handleSrsGrade,
    resetBoxes,
    handleExportAnki,
    handleExportMarkdown,
    dueCount,
    dueNew,
    dueReview,
    okCount: ok,
    restCount: rest,
  };
}

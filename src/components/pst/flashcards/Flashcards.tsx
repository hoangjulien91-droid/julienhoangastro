"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import type { PstStore } from "@/lib/pst/store";
import type { AMap, Flashcard } from "@/lib/pst/types";
import { useCurrentCardText } from "@/components/pst/shell/CurrentCardContext";
import {
  stripHtml,
  buildDeck,
  exportDeckToAnki,
  exportDeckToMarkdown,
} from "@/lib/pst/data/flashcards-helpers";
import { SwipeGame } from "./SwipeGame";
import { FlashcardControls } from "./FlashcardControls";
import { FlashcardCardView } from "./FlashcardCardView";
import { FlashcardAudioPlayer } from "./FlashcardAudioPlayer";
import { FlashcardModeSwitcher } from "./FlashcardModeSwitcher";
import { useFlashcardKeyboard } from "./useFlashcardKeyboard";
import {
  playFlipSound,
  playSuccessSound,
  playReviewSound,
  playDeckCompleteSound,
  playClickSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

interface FlashcardsProps {
  store: PstStore;
  cartes: Flashcard[];
  authors: AMap;
  onStoreChange: () => void;
  /** Bump this counter (e.g. from a dashboard "Réviser maintenant" button)
   * to switch the deck into spaced-repetition (Leitner) mode from outside. */
  revisionTrigger?: number;
}

export function Flashcards({
  store,
  cartes,
  authors,
  onStoreChange,
  revisionTrigger,
}: FlashcardsProps) {
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

  // Cartes dues aujourd'hui selon l'échéancier SM-2 (nouvelles cartes incluses)
  const dueSet = useMemo(
    () => new Set(store.getDueCardIds(cartes.map((c) => c.id))),
    // version : recalcule après chaque notation de carte
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
    // « Réviser maintenant » : session SM-2 (cartes dues), fragiles d'abord
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
    // shuffleOn intentionally re-shuffles only when toggled
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

  // Keyboard navigation hook
  useFlashcardKeyboard({
    containerRef,
    mode,
    deckLength: deck.length,
    fcIdx,
    flipped,
    setFlipped,
    setFcIdx,
    setRecallText,
    card,
    store,
    onGrade: markAndAdvance,
    onVersionBump: bump,
  });

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

  if (mode === "swipe") {
    return (
      <div id="cartes">
        <FlashcardModeSwitcher mode={mode} onChange={setMode} />
        <SwipeGame
          cartes={cartes}
          currentAxis={currentAxis}
          authors={authors}
        />
      </div>
    );
  }

  return (
    <div id="cartes" ref={containerRef}>
      <FlashcardModeSwitcher mode={mode} onChange={setMode} />
      <p className="text-xs text-muted-foreground italic mb-2.5 px-1">
        ⌨ Espace : retourner · ←/→ : naviguer · 1/2/3 : À revoir / Moyen / Su
      </p>

      {/* Controls: Axes, Search, Filters, Leitner Boxes, Progress & Exports */}
      <FlashcardControls
        store={store}
        cartes={cartes}
        authors={authors}
        currentAxis={currentAxis}
        onAxisChange={(axis) => {
          setCurrentAxis(axis);
          setFcIdx(0);
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setFcIdx(0);
        }}
        hideBonus={hideBonus}
        onHideBonusChange={(v) => {
          setHideBonus(v);
          setFcIdx(0);
        }}
        shuffleOn={shuffleOn}
        onShuffleChange={(v) => {
          setShuffleOn(v);
          setLeitnerFilter(null);
          setFcIdx(0);
        }}
        onlyKo={onlyKo}
        onOnlyKoChange={(v) => {
          setOnlyKo(v);
          setLeitnerFilter(null);
          setFcIdx(0);
        }}
        dueOnly={dueOnly}
        onDueOnlyChange={(v) => {
          setDueOnly(v);
          setLeitnerFilter(null);
          setFcIdx(0);
        }}
        onlyFavs={onlyFavs}
        onOnlyFavsChange={(v) => {
          setOnlyFavs(v);
          setLeitnerFilter(null);
          setFcIdx(0);
        }}
        leitnerSort={leitnerSort}
        onLeitnerSortChange={(v) => {
          setLeitnerSort(v);
          setLeitnerFilter(null);
          setFcIdx(0);
        }}
        leitnerFilter={leitnerFilter}
        onLeitnerFilterChange={setLeitnerFilter}
        dueCount={dueCount}
        dueNew={dueNew}
        dueReview={dueReview}
        okCount={ok}
        restCount={rest}
        onExportAnki={handleExportAnki}
        onExportMarkdown={handleExportMarkdown}
        isAudioHandsFreeActive={isAudioHandsFree}
        onToggleAudioHandsFree={() => setIsAudioHandsFree((v) => !v)}
      />

      {/* Audio Hands-Free Player (when active) */}
      {isAudioHandsFree && card && (
        <FlashcardAudioPlayer
          key={card.id}
          card={card}
          cardIndex={fcIdx}
          totalCards={deck.length}
          onNext={() => {
            setFcIdx((i) => (i + 1) % deck.length);
            setFlipped(false);
            setRecallText("");
          }}
          onPrev={() => {
            setFcIdx((i) => (i - 1 + deck.length) % deck.length);
            setFlipped(false);
            setRecallText("");
          }}
          onGrade={(result) => markAndAdvance(result)}
          onClose={() => setIsAudioHandsFree(false)}
        />
      )}

      {/* Card Presentation */}
      {!deck.length ? (
        <p className="hint">
          {dueOnly
            ? "Toutes les cartes dues aujourd'hui sont révisées. Reviens demain !"
            : "Aucune carte ne correspond à ce filtre."}
        </p>
      ) : (
        card && (
          <FlashcardCardView
            card={card}
            deckLength={deck.length}
            fcIdx={fcIdx}
            store={store}
            flipped={flipped}
            setFlipped={setFlipped}
            recallText={recallText}
            setRecallText={setRecallText}
            showRecallInput={showRecallInput}
            setShowRecallInput={setShowRecallInput}
            onGrade={handleSrsGrade}
            onNext={() => {
              triggerHaptic("light");
              playClickSound();
              setFcIdx((i) => (i + 1) % deck.length);
              setFlipped(false);
              setRecallText("");
            }}
            onPrev={() => {
              triggerHaptic("light");
              playClickSound();
              setFcIdx((i) => (i - 1 + deck.length) % deck.length);
              setFlipped(false);
              setRecallText("");
            }}
            onStoreChange={onStoreChange}
            onVersionBump={bump}
          />
        )
      )}

      <div className="pt-2">
        <button
          id="resetMarks"
          type="button"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border border-rose-500/30 transition-all cursor-pointer shadow-2xs"
          onClick={() => {
            triggerHaptic("warning");
            playClickSound();
            resetBoxes();
          }}
        >
          Réinitialiser les boîtes Leitner
        </button>
      </div>
    </div>
  );
}

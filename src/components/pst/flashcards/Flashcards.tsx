"use client";

import type { PstStore } from "@/lib/pst/store";
import type { AMap, Flashcard } from "@/lib/pst/types";
import { SwipeGame } from "./SwipeGame";
import { FlashcardControls } from "./FlashcardControls";
import { FlashcardCardView } from "./FlashcardCardView";
import { FlashcardAudioPlayer } from "./FlashcardAudioPlayer";
import { FlashcardModeSwitcher } from "./FlashcardModeSwitcher";
import { useFlashcardKeyboard } from "./useFlashcardKeyboard";
import { useFlashcardsState } from "./useFlashcardsState";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface FlashcardsProps {
  store: PstStore;
  cartes: Flashcard[];
  authors: AMap;
  onStoreChange: () => void;
  revisionTrigger?: number;
}

export function Flashcards({
  store,
  cartes,
  authors,
  onStoreChange,
  revisionTrigger,
}: FlashcardsProps) {
  const {
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
    okCount,
    restCount,
  } = useFlashcardsState(store, cartes, onStoreChange, revisionTrigger);

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
        okCount={okCount}
        restCount={restCount}
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

"use client";

import type { PstStore } from "@/lib/pst/store";
import type { FicheItem } from "@/lib/pst/types";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { EncartEssentielCours } from "@/components/pst/shell/EncartEssentielCours";
import { FicheCard } from "./fiches/FicheCard";
import { FichesToolbar } from "./fiches/FichesToolbar";
import { FicheReaderView } from "./fiches/FicheReaderView";
import { FicheFeynman60sView } from "./fiches/FicheFeynman60sView";
import { useFichesState } from "./fiches/useFichesState";

export interface FichesFilter {
  key: string;
  label: string;
}

interface FichesProps {
  store: PstStore;
  onStoreChange: () => void;
  data: FicheItem[];
  filters: FichesFilter[];
  hint: string;
}

export function Fiches({
  store,
  onStoreChange,
  data,
  filters,
  hint,
}: FichesProps) {
  const {
    filter,
    setFilter,
    query,
    setQuery,
    onlyUnmastered,
    setOnlyUnmastered,
    onlyFavs,
    setOnlyFavs,
    viewMode,
    setViewMode,
    safeReaderIdx,
    setReaderIdx,
    selfTestBlur,
    setSelfTestBlur,
    maskKeywords,
    setMaskKeywords,
    revealedBlurSet,
    setRevealedBlurSet,
    exportedIdx,
    openSet,
    setOpenSet,
    showEssentielEncart,
    setShowEssentielEncart,
    showMobileOptions,
    setShowMobileOptions,
    marks,
    mastered,
    favCount,
    total,
    remaining,
    pct,
    visible,
    allVisibleOpen,
    toggleExpandAll,
    unitEssentielCards,
    activeCourseEssentielId,
    toggleMastery,
    updateFicheNote,
    handleExportFicheToJournal,
  } = useFichesState(store, onStoreChange, data);

  function getCardProps(f: FicheItem, i: number) {
    return {
      f,
      i,
      isOpen: openSet.has(i),
      onToggleOpen: (open: boolean) => {
        setOpenSet((prev) => {
          const next = new Set(prev);
          if (open) next.add(i);
          else next.delete(i);
          return next;
        });
      },
      isMastered: !!marks["fiche_mastery_" + i],
      onToggleMastery: () => toggleMastery(i),
      isFav: !!marks["fiche_fav_" + i],
      onToggleFav: () => {
        const cur = !!store.getMarks()["fiche_fav_" + i];
        store.setMark("fiche_fav_" + i, !cur);
        onStoreChange();
      },
      noteVal: String(marks["note_fiche_" + i] ?? ""),
      onUpdateNote: (val: string) => updateFicheNote(i, val),
      isBlurred: selfTestBlur && !revealedBlurSet.has(i),
      onRevealBlur: () => setRevealedBlurSet((prev) => new Set(prev).add(i)),
      maskKeywords,
      onExportToJournal: () => handleExportFicheToJournal(f, i),
      isExported: exportedIdx === i,
    };
  }

  return (
    <div>
      <p className="hint">{hint}</p>

      {/* Top Controls Toolbar */}
      <FichesToolbar
        mastered={mastered}
        total={total}
        pct={pct}
        query={query}
        onQueryChange={(val) => setQuery(val)}
        filters={filters}
        currentFilter={filter}
        onFilterChange={(k) => {
          setFilter(k);
          setReaderIdx(0);
        }}
        hasEssentielCards={unitEssentielCards.length > 0}
        showEssentielEncart={showEssentielEncart}
        activeCourseEssentielId={activeCourseEssentielId}
        onToggleEssentielEncart={() => {
          playClickSound();
          setShowEssentielEncart((v) => !v);
        }}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showMobileOptions={showMobileOptions}
        onToggleMobileOptions={() => {
          playClickSound();
          setShowMobileOptions((v) => !v);
        }}
        maskKeywords={maskKeywords}
        onToggleMaskKeywords={() => {
          playClickSound();
          setMaskKeywords((v) => !v);
        }}
        selfTestBlur={selfTestBlur}
        onToggleSelfTestBlur={() => {
          playClickSound();
          setSelfTestBlur((v) => !v);
          setRevealedBlurSet(new Set());
        }}
        onlyFavs={onlyFavs}
        favCount={favCount}
        onToggleOnlyFavs={() => {
          playClickSound();
          setOnlyFavs((v) => !v);
          setReaderIdx(0);
        }}
        onlyUnmastered={onlyUnmastered}
        remainingCount={remaining}
        onToggleOnlyUnmastered={() => {
          playClickSound();
          setOnlyUnmastered((v) => !v);
          setReaderIdx(0);
        }}
        allVisibleOpen={allVisibleOpen}
        onToggleExpandAll={toggleExpandAll}
      />

      <p className="hidden sm:block text-xs text-muted-foreground italic mb-3 px-1">
        ⌨ J / K : fiche suivante / précédente · F : épingler en favori
      </p>

      {/* Encart Essentiel du cours contextualisé */}
      {(showEssentielEncart || activeCourseEssentielId) &&
        unitEssentielCards.length > 0 && (
          <div className="mb-4 animate-in fade-in duration-150">
            <EncartEssentielCours
              key={activeCourseEssentielId ?? "all"}
              cards={unitEssentielCards}
              initialCardId={activeCourseEssentielId}
              compact
            />
          </div>
        )}

      {/* Fiches display modes */}
      {visible.length === 0 ? (
        <p className="hint">Aucune fiche trouvée pour ces critères.</p>
      ) : viewMode === "reader" ? (
        <FicheReaderView
          visibleFiches={visible}
          safeReaderIdx={safeReaderIdx}
          onSetReaderIdx={setReaderIdx}
          renderCardProps={getCardProps}
        />
      ) : viewMode === "feynman60s" ? (
        <FicheFeynman60sView visibleFiches={visible} />
      ) : (
        <div id="fichesHost">
          {visible.map(({ f, i }) => (
            <FicheCard
              key={i}
              {...getCardProps(f, i)}
              forceOpen={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

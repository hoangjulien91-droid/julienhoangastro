"use client";

import { useEffect, useMemo, useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { FicheItem } from "@/lib/pst/types";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";
import { getEssentielByUnit } from "@/lib/pst/data/essentiel-cours";
import type { PlanningUnitId } from "@/lib/pst/data/planning";
import { EncartEssentielCours } from "@/components/pst/shell/EncartEssentielCours";
import { exportFicheEntryToJournal } from "@/lib/pst/data/fiches-helpers";
import { FicheCard } from "./fiches/FicheCard";
import { FichesToolbar } from "./fiches/FichesToolbar";
import { FicheReaderView } from "./fiches/FicheReaderView";
import { FicheFeynman60sView } from "./fiches/FicheFeynman60sView";

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
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [onlyUnmastered, setOnlyUnmastered] = useState(false);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [viewMode, setViewMode] = useState<
    "accordion" | "reader" | "feynman60s"
  >("accordion");
  const [readerIdx, setReaderIdx] = useState(0);
  const [selfTestBlur, setSelfTestBlur] = useState(false);
  const [maskKeywords, setMaskKeywords] = useState(false);
  const [revealedBlurSet, setRevealedBlurSet] = useState<Set<number>>(
    new Set(),
  );
  const [exportedIdx, setExportedIdx] = useState<number | null>(null);
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0]));
  const [showEssentielEncart, setShowEssentielEncart] = useState(false);
  const [showMobileOptions, setShowMobileOptions] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const marks = store.getMarks();
  const mastered = data.filter((_, i) => !!marks["fiche_mastery_" + i]).length;
  const favCount = data.filter((_, i) => !!marks["fiche_fav_" + i]).length;
  const total = data.length;
  const remaining = total - mastered;
  const pct = total ? Math.round((mastered * 100) / total) : 0;

  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      data
        .map((f, i) => ({ f, i }))
        .filter(({ f, i }) => {
          const isM = !!marks["fiche_mastery_" + i];
          const isFav = !!marks["fiche_fav_" + i];
          if (onlyUnmastered && isM) return false;
          if (onlyFavs && !isFav) return false;
          const matchA =
            filter === "all" ||
            f.a === filter ||
            (f.cours !== undefined && String(f.cours) === filter) ||
            (filter === "cours3" && (f.cours === 3 || f.cours === "3" || f.t.includes("Cours 3"))) ||
            (filter === "cours2" && (f.cours === 2 || f.cours === "2" || f.t.includes("Cours 2"))) ||
            (filter === "cours1" && (f.cours === 1 || f.cours === "1" || f.t.includes("Cours 1"))) ||
            (filter === "histoire" && f.a === "histoire");
          const noteText = String(marks["note_fiche_" + i] ?? "");
          const hay = (
            f.t +
            " " +
            f.ess +
            " " +
            f.ph +
            " " +
            noteText
          ).toLowerCase();
          return matchA && (!q || hay.includes(q));
        }),
    [data, filter, q, onlyUnmastered, onlyFavs, marks],
  );

  const safeReaderIdx =
    visible.length > 0 ? Math.min(readerIdx, visible.length - 1) : 0;

  // Navigation clavier rapide J / K entre les fiches
  useEffect(() => {
    if (visible.length === 0) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        (e.target as HTMLElement | null)?.isContentEditable
      ) {
        return;
      }
      if (e.key === "j" || e.key === "J") {
        e.preventDefault();
        playClickSound();
        if (viewMode === "reader") {
          setReaderIdx((idx) => Math.min(visible.length - 1, idx + 1));
        } else {
          setReaderIdx((prev) => {
            const next = Math.min(visible.length - 1, prev + 1);
            const targetItem = visible[next];
            if (targetItem) {
              setOpenSet((s) => new Set(s).add(targetItem.i));
              const el = document.getElementById(`fiche-card-${targetItem.i}`);
              el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
            return next;
          });
        }
      } else if (e.key === "k" || e.key === "K") {
        e.preventDefault();
        playClickSound();
        if (viewMode === "reader") {
          setReaderIdx((idx) => Math.max(0, idx - 1));
        } else {
          setReaderIdx((prev) => {
            const next = Math.max(0, prev - 1);
            const targetItem = visible[next];
            if (targetItem) {
              setOpenSet((s) => new Set(s).add(targetItem.i));
              const el = document.getElementById(`fiche-card-${targetItem.i}`);
              el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
            return next;
          });
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible, viewMode]);

  function toggleMastery(i: number) {
    const cur = !!store.getMarks()["fiche_mastery_" + i];
    store.setMark("fiche_mastery_" + i, !cur);
    if (!cur) playSuccessSound();
    else playClickSound();
    onStoreChange();
  }

  function updateFicheNote(i: number, text: string) {
    store.setMark("note_fiche_" + i, text);
    onStoreChange();
  }

  function getActiveUeCode(): string {
    if (typeof window === "undefined") return "PST106";
    const match = window.location.pathname.match(
      /\/pst\/(106|108|120|123|124)/,
    );
    return match?.[1] ? `PST${match[1]}` : "PST106";
  }

  function handleExportFicheToJournal(f: FicheItem, i: number) {
    try {
      const noteVal = String(marks["note_fiche_" + i] ?? "").trim();
      exportFicheEntryToJournal(f, noteVal, getActiveUeCode());
      playSuccessSound();
      setExportedIdx(i);
      setTimeout(() => setExportedIdx(null), 1800);
    } catch {
      // ignore
    }
  }

  const allVisibleOpen =
    visible.length > 0 && visible.every(({ i }) => openSet.has(i));

  function toggleExpandAll() {
    if (allVisibleOpen) {
      setOpenSet(new Set());
    } else {
      setOpenSet(new Set(visible.map(({ i }) => i)));
    }
  }

  const activeUnitId = useMemo<PlanningUnitId>(() => {
    const match = store.key.match(/^pst(106|108|120|123|124)/);
    if (match?.[1]) {
      return `pst${match[1]}` as PlanningUnitId;
    }
    const code = getActiveUeCode().toLowerCase();
    if (
      code === "pst106" ||
      code === "pst108" ||
      code === "pst120" ||
      code === "pst123" ||
      code === "pst124"
    ) {
      return code;
    }
    return "pst106";
  }, [store.key]);

  const unitEssentielCards = useMemo(
    () => getEssentielByUnit(activeUnitId),
    [activeUnitId],
  );

  const filteredCourseNumber =
    filter === "cours1" || filter === "1"
      ? 1
      : filter === "cours2" || filter === "2"
        ? 2
        : filter === "cours3" || filter === "3"
          ? 3
          : null;

  const activeCourseEssentielId = useMemo(() => {
    if (!filteredCourseNumber) return undefined;
    return unitEssentielCards.find((c) => c.coursNum === filteredCourseNumber)
      ?.id;
  }, [unitEssentielCards, filteredCourseNumber]);

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

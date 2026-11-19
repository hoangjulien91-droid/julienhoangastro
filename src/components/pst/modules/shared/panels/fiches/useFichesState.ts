"use client";

import { useEffect, useMemo, useState } from "react";
import type { PstStore } from "@/lib/pst/store";
import type { FicheItem } from "@/lib/pst/types";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";
import { getEssentielByUnit } from "@/lib/pst/data/essentiel-cours";
import type { PlanningUnitId } from "@/lib/pst/data/planning";
import { exportFicheEntryToJournal } from "@/lib/pst/data/fiches-helpers";

export function useFichesState(
  store: PstStore,
  onStoreChange: () => void,
  data: FicheItem[],
  filters?: Array<{ key: string; label: string; match?: (f: FicheItem) => boolean }>,
) {
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
  const mastered = data.filter(
    (f, i) => !!marks["fiche_mastery_" + (f.storageIdx ?? i)],
  ).length;
  const favCount = data.filter(
    (f, i) => !!marks["fiche_fav_" + (f.storageIdx ?? i)],
  ).length;
  const total = data.length;
  const remaining = total - mastered;
  const pct = total ? Math.round((mastered * 100) / total) : 0;

  const activeFilterObj = useMemo(
    () => filters?.find((fl) => fl.key === filter),
    [filters, filter],
  );
  const coursFilterMatch = filter.match(/^cours(\d+)$/i);
  const coursFilterNum = coursFilterMatch ? coursFilterMatch[1] : null;

  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      data
        .map((f, i) => ({ f, i }))
        .filter(({ f, i }) => {
          const storageKey = f.storageIdx ?? i;
          const isM = !!marks["fiche_mastery_" + storageKey];
          const isFav = !!marks["fiche_fav_" + storageKey];
          if (onlyUnmastered && isM) return false;
          if (onlyFavs && !isFav) return false;
          const matchA =
            filter === "all" ||
            (activeFilterObj?.match ? activeFilterObj.match(f) : false) ||
            f.a === filter ||
            (f.cours !== undefined && String(f.cours) === filter) ||
            (coursFilterNum !== null &&
              (String(f.cours) === coursFilterNum ||
                f.t.includes(`Cours ${coursFilterNum}`))) ||
            (filter === "histoire" && f.a === "histoire");
          const noteText = String(marks["note_fiche_" + storageKey] ?? "");
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
    [data, filter, activeFilterObj, coursFilterNum, q, onlyUnmastered, onlyFavs, marks],
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

  const filteredCourseNumber = useMemo(() => {
    const m = filter.match(/^(?:cours)?(\d+)$/i);
    return m && m[1] ? Number(m[1]) : null;
  }, [filter]);

  const activeCourseEssentielId = useMemo(() => {
    if (!filteredCourseNumber) return undefined;
    return unitEssentielCards.find((c) => c.coursNum === filteredCourseNumber)
      ?.id;
  }, [unitEssentielCards, filteredCourseNumber]);

  return {
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
    readerIdx,
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
    safeReaderIdx,
    allVisibleOpen,
    toggleExpandAll,
    activeUnitId,
    unitEssentielCards,
    activeCourseEssentielId,
    toggleMastery,
    updateFicheNote,
    handleExportFicheToJournal,
  };
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { PstStore, WrongAnswer } from "@/lib/pst/store";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  exportErrorsToAnki,
  exportErrorsToMarkdown,
} from "@/lib/pst/data/error-notebook-helpers";
import type { ReplayState } from "./ErrorCard";

export type TypeFilter = "all" | "qcm" | "pieges" | "qui";
export type ViewMode = "list" | "focus";

export function useErrorNotebookState(
  store: PstStore,
  onStoreChange: () => void,
) {
  const errors = store.getErrors();
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [focusIdx, setFocusIdx] = useState(0);

  const [replay, setReplay] = useState<Record<string, ReplayState>>({});
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

  // Focus mode specific replay state
  const [focusRevealed, setFocusRevealed] = useState(false);
  const [focusChoiceOrder, setFocusChoiceOrder] = useState<boolean>(true);

  // Reset focus evaluation state when index changes
  useEffect(() => {
    setFocusRevealed(false);
    setFocusChoiceOrder(Math.random() > 0.5);
  }, [focusIdx]);

  const typeCounts = useMemo(() => {
    const counts = { all: errors.length, qcm: 0, pieges: 0, qui: 0 };
    for (const err of errors) {
      if (err.type === "pieges") counts.pieges++;
      else if (err.type === "qui") counts.qui++;
      else counts.qcm++;
    }
    return counts;
  }, [errors]);

  const filteredErrors = useMemo(() => {
    if (typeFilter === "all") return errors;
    if (typeFilter === "pieges")
      return errors.filter((e) => e.type === "pieges");
    if (typeFilter === "qui") return errors.filter((e) => e.type === "qui");
    return errors.filter((e) => e.type !== "pieges" && e.type !== "qui");
  }, [errors, typeFilter]);

  const totalFiltered = filteredErrors.length;
  const safeFocusIdx = Math.min(focusIdx, Math.max(0, totalFiltered - 1));
  const currentErr: WrongAnswer | undefined = filteredErrors[safeFocusIdx];

  function handlePrevFocus() {
    triggerHaptic("light");
    playClickSound();
    setFocusIdx((i) => Math.max(0, i - 1));
  }

  function handleNextFocus() {
    triggerHaptic("light");
    playClickSound();
    setFocusIdx((i) =>
      totalFiltered > 0 ? Math.min(totalFiltered - 1, i + 1) : 0,
    );
  }

  function startReplay(err: WrongAnswer) {
    triggerHaptic("light");
    playClickSound();
    setReplay((prev) => ({
      ...prev,
      [err.id]: {
        open: true,
        revealed: false,
        correctFirst: Math.random() > 0.5,
      },
    }));
  }

  function closeReplay(id: string) {
    setReplay((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function revealAnswer(id: string) {
    triggerHaptic("light");
    playClickSound();
    setReplay((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] ?? { open: true, revealed: false, correctFirst: true }),
        revealed: true,
      },
    }));
  }

  function handleAnswer(err: WrongAnswer, wasRight: boolean) {
    if (wasRight) {
      triggerHaptic("success");
      playSuccessSound();
      setRemovingIds((prev) => new Set(prev).add(err.id));
      setTimeout(() => {
        store.removeError(err.id);
        setRemovingIds((prev) => {
          const next = new Set(prev);
          next.delete(err.id);
          return next;
        });
        closeReplay(err.id);
        onStoreChange();
        toast.success("Erreur assimilée et retirée du carnet !");
      }, 300);
    } else {
      triggerHaptic("warning");
      playReviewSound();
      toast.error("Faux ! Retentez ou consultez l'explication.");
      setFocusRevealed(true);
      closeReplay(err.id);
    }
  }

  function handleClearAll() {
    triggerHaptic("warning");
    playClickSound();
    store.clearErrors();
    onStoreChange();
    toast.success("Carnet d'erreurs réinitialisé.");
  }

  function handleRemove(id: string) {
    triggerHaptic("light");
    playClickSound();
    store.removeError(id);
    onStoreChange();
  }

  function startAllReplay() {
    triggerHaptic("light");
    playClickSound();
    const next: Record<string, ReplayState> = {};
    for (const err of filteredErrors) {
      next[err.id] = {
        open: true,
        revealed: false,
        correctFirst: Math.random() > 0.5,
      };
    }
    setReplay(next);
  }

  function handleExportAnki() {
    triggerHaptic("light");
    playClickSound();
    const targetErrors = filteredErrors.length > 0 ? filteredErrors : errors;
    if (targetErrors.length === 0) {
      toast.error("Aucune erreur à exporter.");
      return;
    }
    exportErrorsToAnki(targetErrors);
    toast.success(
      `${targetErrors.length} erreurs exportées pour Anki (.tsv) !`,
    );
  }

  function handleExportMarkdown() {
    triggerHaptic("light");
    playClickSound();
    const targetErrors = filteredErrors.length > 0 ? filteredErrors : errors;
    if (targetErrors.length === 0) {
      toast.error("Aucune erreur à exporter.");
      return;
    }
    exportErrorsToMarkdown(targetErrors);
    toast.success(
      `${targetErrors.length} erreurs exportées en Markdown (.md) !`,
    );
  }

  // Keyboard navigation & drill in Focus mode
  useEffect(() => {
    if (viewMode !== "focus") return;
    const err = currentErr;
    if (!err) return;

    function handleKeyDown(e: KeyboardEvent) {
      const tgt = e.target as HTMLElement | null;
      if (
        tgt &&
        (tgt.tagName === "INPUT" ||
          tgt.tagName === "TEXTAREA" ||
          tgt.isContentEditable)
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setFocusIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setFocusIdx((i) => Math.min(totalFiltered - 1, i + 1));
      } else if (err.type === "pieges") {
        if (key === "1" || key === "v") {
          e.preventDefault();
          handleAnswer(err, err.correctAnswer === "Vrai");
        } else if (key === "2" || key === "f") {
          e.preventDefault();
          handleAnswer(err, err.correctAnswer === "Faux");
        }
      } else if (err.type === "qui") {
        if (!focusRevealed) {
          if (e.key === " " || e.key === "Enter" || key === "1") {
            e.preventDefault();
            setFocusRevealed(true);
            playClickSound();
          }
        } else {
          if (key === "1") {
            e.preventDefault();
            handleAnswer(err, true);
          } else if (key === "2") {
            e.preventDefault();
            handleAnswer(err, false);
          }
        }
      } else {
        // QCM / générique
        if (key === "1") {
          e.preventDefault();
          handleAnswer(err, focusChoiceOrder);
        } else if (key === "2") {
          e.preventDefault();
          handleAnswer(err, !focusChoiceOrder);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, currentErr, focusRevealed, focusChoiceOrder, totalFiltered]);

  return {
    errors,
    typeFilter,
    setTypeFilter,
    viewMode,
    setViewMode,
    focusIdx,
    setFocusIdx,
    replay,
    removingIds,
    focusRevealed,
    setFocusRevealed,
    focusChoiceOrder,
    typeCounts,
    filteredErrors,
    totalFiltered,
    safeFocusIdx,
    currentErr,
    handlePrevFocus,
    handleNextFocus,
    startReplay,
    revealAnswer,
    handleAnswer,
    handleClearAll,
    handleRemove,
    startAllReplay,
    handleExportAnki,
    handleExportMarkdown,
  };
}

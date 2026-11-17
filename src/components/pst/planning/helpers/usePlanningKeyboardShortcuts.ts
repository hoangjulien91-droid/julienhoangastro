import { useEffect, type RefObject } from "react";
import { type PlanningEvent } from "@/lib/pst/data/planning";
import { type PlanningFilters } from "@/lib/pst/planning-stats";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface UsePlanningKeyboardShortcutsOptions {
  selectedEvent: PlanningEvent | null;
  onClearSelectedEvent: () => void;
  filters: PlanningFilters;
  onClearSearch: () => void;
  searchInputRef: RefObject<HTMLInputElement | null>;
  activeView: "grid" | "week" | "list" | "logistics";
  onSetView: (v: "grid" | "week" | "list" | "logistics") => void;
  onJumpToNextUpcomingWeek: () => void;
  activeWeeksCount: number;
  onSelectPrevWeek: () => void;
  onSelectNextWeek: () => void;
}

export function usePlanningKeyboardShortcuts({
  selectedEvent,
  onClearSelectedEvent,
  filters,
  onClearSearch,
  searchInputRef,
  activeView,
  onSetView,
  onJumpToNextUpcomingWeek,
  activeWeeksCount,
  onSelectPrevWeek,
  onSelectNextWeek,
}: UsePlanningKeyboardShortcutsOptions) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isInput =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement;

      if (e.key === "Escape") {
        if (selectedEvent) {
          onClearSelectedEvent();
          playClickSound();
        } else if (filters.search) {
          onClearSearch();
          playClickSound();
          if (searchInputRef.current) searchInputRef.current.blur();
        }
        return;
      }

      if (isInput) return;

      if (e.key === "1") {
        e.preventDefault();
        onSetView("grid");
      } else if (e.key === "2") {
        e.preventDefault();
        onSetView("week");
      } else if (e.key === "3") {
        e.preventDefault();
        onSetView("list");
      } else if (e.key === "4") {
        e.preventDefault();
        onSetView("logistics");
      } else if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        onJumpToNextUpcomingWeek();
      } else if (e.key === "/") {
        e.preventDefault();
        searchInputRef.current?.focus();
        playClickSound();
      } else if (e.key === "ArrowLeft" && activeView === "week") {
        e.preventDefault();
        playClickSound();
        onSelectPrevWeek();
      } else if (e.key === "ArrowRight" && activeView === "week") {
        e.preventDefault();
        playClickSound();
        onSelectNextWeek();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedEvent,
    filters.search,
    activeView,
    activeWeeksCount,
    onClearSelectedEvent,
    onClearSearch,
    searchInputRef,
    onSetView,
    onJumpToNextUpcomingWeek,
    onSelectPrevWeek,
    onSelectNextWeek,
  ]);
}

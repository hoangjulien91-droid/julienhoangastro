"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "@/components/common/Navigation";
import { downloadIcs } from "@/lib/pst/ics-export";
import { CommandPaletteQuickNav } from "./CommandPaletteQuickNav";
import { CommandPaletteToolsGrid } from "./CommandPaletteToolsGrid";
import { CommandPaletteResults } from "./CommandPaletteResults";
import { CommandPaletteQuickCapture } from "./CommandPaletteQuickCapture";
import { CommandPaletteFooter } from "./CommandPaletteFooter";
import { useCommandPaletteSearch } from "./useCommandPaletteSearch";

interface PstCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWorkshopSlideOver?: (moduleId: string) => void;
}

export function PstCommandPalette({
  isOpen,
  onClose,
  onOpenWorkshopSlideOver,
}: PstCommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [quickUe, setQuickUe] = useState("PST106");
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
      return () => {
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
    setQuery("");
    return undefined;
  }, [isOpen]);

  // Global Keyboard listener for ⌘K / Ctrl+K & Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          window.dispatchEvent(new CustomEvent("pst:open-command-palette"));
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useCommandPaletteSearch(query, isOpen);

  function handleNavigate(path: string) {
    onClose();
    router.push(path);
  }

  function handleToggleTheme() {
    const isDark = document.documentElement.classList.contains("dark");
    try {
      if (isDark) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("pst_theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("pst_theme", "dark");
      }
    } catch {
      // Silencieux
    }
    window.dispatchEvent(new CustomEvent("pst:theme-changed"));
    onClose();
  }

  function triggerHubModal(eventName: string) {
    onClose();
    window.dispatchEvent(new CustomEvent(eventName));
  }

  function handleExportIcs() {
    onClose();
    downloadIcs();
  }

  if (!isOpen) return null;

  function handlePaletteKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Enter") {
      return;
    }
    const container = resultsRef.current;
    if (!container) return;
    const items = Array.from(
      container.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]"),
    );
    if (items.length === 0) return;

    const activeEl = document.activeElement as HTMLElement | null;
    if (e.key === "Enter" && activeEl === inputRef.current && query.trim()) {
      e.preventDefault();
      items[0]?.click();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = activeEl ? items.indexOf(activeEl) : -1;
      const next = items[(idx + 1) % items.length];
      next?.focus();
      next?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = activeEl ? items.indexOf(activeEl) : -1;
      if (idx <= 0) {
        inputRef.current?.focus();
      } else {
        const prev = items[idx - 1];
        prev?.focus();
        prev?.scrollIntoView({ block: "nearest" });
      }
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Palette de commandes PST (⌘K)"
      onKeyDown={handlePaletteKeyDown}
      className="fixed inset-0 z-50 flex items-end sm:items-start justify-center p-0 sm:p-4 sm:pt-20 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
    >
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Palette Window */}
      <div
        className="relative w-full max-w-2xl bg-card/95 backdrop-blur-xl border-t sm:border border-border shadow-2xl rounded-t-3xl sm:rounded-2xl overflow-hidden z-10 transition-all flex flex-col max-h-[85vh] sm:max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile iOS Drag Handle */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-muted-foreground/30" />
        </div>

        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-border/80 px-4 py-3 bg-muted/20 shrink-0">
          <Search className="size-4.5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Rechercher un atelier, une séance Bègles, un auteur, un terme ou capturer une note"
            placeholder="Rechercher séance (Bègles, Salane...), concept, auteur, ou saisir une note..."
            className="w-full bg-transparent px-3 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 focus:outline-hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-muted-foreground hover:text-foreground p-1 rounded-md cursor-pointer"
              aria-label="Effacer le texte"
            >
              <X className="size-4" />
            </button>
          ) : (
            <kbd className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono text-[10px] border border-border">
              Échap
            </kbd>
          )}
        </div>

        {/* Quick Capture Bar */}
        <CommandPaletteQuickCapture
          query={query}
          quickUe={quickUe}
          onSetQuickUe={setQuickUe}
          onClearQuery={() => setQuery("")}
          onClose={onClose}
        />

        {/* Scrollable Results */}
        <div ref={resultsRef} className="overflow-y-auto p-3 space-y-4 text-xs flex-1">
          <CommandPaletteResults
            results={searchResults}
            onNavigate={handleNavigate}
            onPushRoute={(path) => router.push(path)}
            onClose={onClose}
            onOpenWorkshopSlideOver={onOpenWorkshopSlideOver}
          />

          {/* Tools Grid */}
          <CommandPaletteToolsGrid
            onTriggerModal={triggerHubModal}
            onNavigate={handleNavigate}
          />

          {/* Quick Nav */}
          <CommandPaletteQuickNav
            onNavigate={handleNavigate}
            onExportIcs={handleExportIcs}
            onToggleTheme={handleToggleTheme}
          />
        </div>

        {/* Footer info bar */}
        <CommandPaletteFooter />
      </div>
    </div>
  );
}

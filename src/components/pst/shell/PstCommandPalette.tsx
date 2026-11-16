"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Sparkles,
  X,
  ClipboardList,
  Plus,
} from "lucide-react";
import { useRouter } from "@/components/common/Navigation";
import { downloadIcs } from "@/lib/pst/ics-export";
import { playSuccessSound } from "@/lib/pst/audio-feedback";
import { toast } from "sonner";
import { CommandPaletteQuickNav } from "./CommandPaletteQuickNav";
import { CommandPaletteToolsGrid } from "./CommandPaletteToolsGrid";
import { CommandPaletteResults } from "./CommandPaletteResults";
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
          // Trigger open via custom event or parent
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

  function handleQuickAddTask() {
    const cleanText = query.replace(/^\+\s*/, "").trim();
    if (!cleanText) return;
    try {
      const raw = localStorage.getItem("pst_academic_todos_v1");
      const current = raw ? JSON.parse(raw) : [];
      const next = [
        {
          id: "t_" + Date.now(),
          title: cleanText,
          ue: quickUe,
          priority: "haute",
          isDone: false,
        },
        ...current,
      ];
      try {
        localStorage.setItem("pst_academic_todos_v1", JSON.stringify(next));
      } catch {
        // Silencieux
      }
      window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      playSuccessSound();
      toast.success(`Tâche ajoutée (${quickUe}) : « ${cleanText} »`);
      setQuery("");
      onClose();
    } catch {
      // ignore
    }
  }

  function handleQuickAddFieldNote() {
    const cleanText = query.replace(/^\+\s*/, "").trim();
    if (!cleanText) return;
    try {
      const raw = localStorage.getItem("pst_field_journal_v1");
      const current = raw ? JSON.parse(raw) : [];
      const now = new Date();
      const stamp = `${now.toLocaleDateString("fr-FR")} · ${now
        .toTimeString()
        .slice(0, 5)}`;
      const next = [
        {
          id: "fj-" + Date.now(),
          timestamp: stamp,
          ue: quickUe,
          category: "note_reflexive",
          operatorCode: "Capture Spotlight ⌘K",
          content: cleanText,
        },
        ...current,
      ];
      try {
        localStorage.setItem("pst_field_journal_v1", JSON.stringify(next));
      } catch {
        // Silencieux
      }
      window.dispatchEvent(new CustomEvent("pst:storage-updated"));
      playSuccessSound();
      toast.success(`Note consignée dans la Chronique (${quickUe})`);
      setQuery("");
      onClose();
    } catch {
      // ignore
    }
  }

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

      {/* Palette Window (iOS Bottom Sheet on mobile, Spotlight Window on desktop) */}
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

        {/* Quick Capture Bar (when text is typed) */}
        {query.trim().length > 1 && (
          <div className="px-3.5 py-2 bg-accent/8 border-b border-border/60 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-accent shrink-0" />
              <span className="font-semibold text-foreground text-[11px]">
                Capture Rapide :
              </span>
              <select
                value={quickUe}
                onChange={(e) => setQuickUe(e.target.value)}
                aria-label="Unité d'enseignement cible"
                className="px-1.5 py-0.5 rounded-md border border-border bg-card text-[11px] font-mono font-bold text-foreground"
              >
                <option value="PST106">PST106</option>
                <option value="PST108">PST108</option>
                <option value="PST123">PST123</option>
                <option value="PST120">PST120</option>
                <option value="PST124">PST124</option>
              </select>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleQuickAddTask}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary text-primary-foreground text-[11px] font-semibold hover:opacity-95 active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="size-3" />
                <span>Ajouter Tâche</span>
              </button>
              <button
                type="button"
                onClick={handleQuickAddFieldNote}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-600 text-white text-[11px] font-semibold hover:bg-teal-500 active:scale-95 transition-all cursor-pointer"
              >
                <ClipboardList className="size-3" />
                <span>Noter au Carnet</span>
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Results */}
        <div ref={resultsRef} className="overflow-y-auto p-3 space-y-4 text-xs flex-1">
          <CommandPaletteResults
            results={searchResults}
            onNavigate={handleNavigate}
            onPushRoute={(path) => router.push(path)}
            onClose={onClose}
            onOpenWorkshopSlideOver={onOpenWorkshopSlideOver}
          />

          {/* 4. Actions Exécutives & Studios Cliniques */}
          <CommandPaletteToolsGrid
            onTriggerModal={triggerHubModal}
            onNavigate={handleNavigate}
          />

          {/* 5. Navigation Rapide */}
          <CommandPaletteQuickNav
            onNavigate={handleNavigate}
            onExportIcs={handleExportIcs}
            onToggleTheme={handleToggleTheme}
          />
        </div>

        {/* Footer info bar */}
        <div className="border-t border-border/70 px-4 py-2.5 bg-muted/30 text-muted-foreground flex items-center justify-between text-[11px] shrink-0 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">
                ⌘
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">
                K
              </kbd>
              <span className="ml-0.5">Palette</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">
                ↑↓
              </kbd>
              <span className="ml-0.5">Naviguer</span>
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">
                ↵
              </kbd>
              <span className="ml-0.5">Ouvrir</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border">
                Échap
              </kbd>
              <span className="ml-0.5">Fermer</span>
            </span>
          </div>

          <span className="text-[11px]">CNAM · RNCP 7</span>
        </div>
      </div>
    </div>
  );
}

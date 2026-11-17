"use client";

import { Sparkles, ClipboardList, Plus } from "lucide-react";
import { playSuccessSound } from "@/lib/pst/audio-feedback";
import { toast } from "sonner";

interface CommandPaletteQuickCaptureProps {
  query: string;
  quickUe: string;
  onSetQuickUe: (ue: string) => void;
  onClearQuery: () => void;
  onClose: () => void;
}

export function CommandPaletteQuickCapture({
  query,
  quickUe,
  onSetQuickUe,
  onClearQuery,
  onClose,
}: CommandPaletteQuickCaptureProps) {
  if (query.trim().length <= 1) return null;

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
      onClearQuery();
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
      onClearQuery();
      onClose();
    } catch {
      // ignore
    }
  }

  return (
    <div className="px-3.5 py-2 bg-accent/8 border-b border-border/60 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
      <div className="flex items-center gap-1.5">
        <Sparkles className="size-3.5 text-accent shrink-0" />
        <span className="font-semibold text-foreground text-[11px]">
          Capture Rapide :
        </span>
        <select
          value={quickUe}
          onChange={(e) => onSetQuickUe(e.target.value)}
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
  );
}

"use client";

import React, { useState } from "react";
import { playClickSound, playSuccessSound, triggerHaptic } from "@/lib/pst/audio-feedback";
import { type KanbanCardItem } from "@/lib/pst/data/kanban-pipeline-data";

interface KanbanQuickAddFormProps {
  onAddCard: (card: KanbanCardItem) => void;
  onClose: () => void;
}

export const KanbanQuickAddForm: React.FC<KanbanQuickAddFormProps> = ({
  onAddCard,
  onClose,
}) => {
  const [newCode, setNewCode] = useState("PST106");
  const [newTitle, setNewTitle] = useState("");
  const [newDeliverable, setNewDeliverable] = useState("Livrable intermédiaire");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    playClickSound();
    const item: KanbanCardItem = {
      id: `kb-custom-${Date.now()}`,
      code: newCode,
      title: newTitle.trim(),
      deliverableType: newDeliverable.trim() || "Note clinique",
      ects: 6,
      stage: "cadrage",
      notes: "Objectif opérationnel ajouté au pipeline Kanban.",
      isCustom: true,
    };
    onAddCard(item);
    setNewTitle("");
    triggerHaptic("success");
    playSuccessSound();
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3.5 rounded-xl border border-accent/25 bg-accent/5 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end"
    >
      <div className="sm:col-span-2">
        <label className="block text-[10px] font-mono uppercase text-muted-foreground mb-1">
          Code UE
        </label>
        <select
          value={newCode}
          onChange={(e) => setNewCode(e.target.value)}
          className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-background border border-border text-foreground"
        >
          <option value="PST106">PST106</option>
          <option value="PST108">PST108</option>
          <option value="PST120">PST120</option>
          <option value="PST123">PST123</option>
          <option value="PST124">PST124</option>
          <option value="UAPST">UAPST (Mémoire)</option>
        </select>
      </div>
      <div className="sm:col-span-5">
        <label className="block text-[10px] font-mono uppercase text-muted-foreground mb-1">
          Intitulé du livrable ou jalon clinique
        </label>
        <input
          type="text"
          aria-label="Intitulé du livrable ou jalon clinique"
          required
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Ex: Retranscription verbatim autoconfrontation croisée..."
          className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-background border border-border text-foreground"
        />
      </div>
      <div className="sm:col-span-3">
        <label className="block text-[10px] font-mono uppercase text-muted-foreground mb-1">
          Type d&apos;évaluation
        </label>
        <input
          type="text"
          aria-label="Type d'évaluation"
          value={newDeliverable}
          onChange={(e) => setNewDeliverable(e.target.value)}
          className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-background border border-border text-foreground"
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer"
        >
          Créer carte
        </button>
      </div>
    </form>
  );
};

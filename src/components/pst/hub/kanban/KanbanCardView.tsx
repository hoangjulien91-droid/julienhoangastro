"use client";

import React from "react";
import { ArrowRight, ArrowLeft, Trash2 } from "lucide-react";
import { type KanbanCardItem } from "@/lib/pst/data/kanban-pipeline-data";

interface KanbanCardViewProps {
  card: KanbanCardItem;
  stageIdx: number;
  totalStages: number;
  onMoveCard: (cardId: string, direction: -1 | 1) => void;
  onDeleteCustom: (cardId: string) => void;
  onInspectWorkshop?: (moduleId: string) => void;
}

export const KanbanCardView: React.FC<KanbanCardViewProps> = ({
  card,
  stageIdx,
  totalStages,
  onMoveCard,
  onDeleteCustom,
  onInspectWorkshop,
}) => {
  const isWorkshop = /^PST(106|108|120|123|124)$/i.test(card.code);

  return (
    <div className="rounded-xl border border-border/90 bg-card p-3 shadow-2xs hover:border-accent/40 transition-all flex flex-col justify-between gap-2.5">
      <div>
        <div className="flex items-center justify-between gap-1.5 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-primary/10 text-primary">
              {card.code}
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {card.ects} ECTS
            </span>
          </div>
          {card.isCustom && (
            <button
              type="button"
              onClick={() => onDeleteCustom(card.id)}
              className="text-muted-foreground hover:text-rose-500 p-0.5 cursor-pointer"
              title="Supprimer"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>

        <h4 className="text-xs font-bold text-foreground leading-snug m-0">
          {card.title}
        </h4>
        <p className="text-[11px] text-muted-foreground mt-1 m-0 leading-relaxed">
          {card.notes}
        </p>
      </div>

      <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-1">
        <span className="text-[10px] font-mono text-muted-foreground truncate max-w-[130px]">
          {card.deliverableType}
        </span>

        <div className="flex items-center gap-1">
          {isWorkshop && onInspectWorkshop && (
            <button
              type="button"
              onClick={() => onInspectWorkshop(card.code.toLowerCase())}
              className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted hover:bg-muted/80 text-foreground cursor-pointer"
              title="Inspecter l'atelier dans le tiroir latéral"
            >
              Inspecter
            </button>
          )}
          <button
            type="button"
            disabled={stageIdx === 0}
            onClick={() => onMoveCard(card.id, -1)}
            className="p-1 rounded bg-muted/70 hover:bg-muted text-foreground disabled:opacity-30 cursor-pointer"
            title="Reculer d'une étape"
          >
            <ArrowLeft className="w-3 h-3" />
          </button>
          <button
            type="button"
            disabled={stageIdx === totalStages - 1}
            onClick={() => onMoveCard(card.id, 1)}
            className="p-1 rounded bg-primary/10 hover:bg-primary/20 text-primary disabled:opacity-30 cursor-pointer"
            title="Avancer à l'étape suivante"
          >
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useMemo } from "react";
import {
  Kanban,
  Plus,
  RotateCcw,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  type KanbanStage,
  type KanbanCardItem,
  STAGES,
  DEFAULT_CARDS,
  STORAGE_KEY,
} from "@/lib/pst/data/kanban-pipeline-data";
import { KanbanQuickAddForm } from "./kanban/KanbanQuickAddForm";
import { KanbanCardView } from "./kanban/KanbanCardView";

export type { KanbanStage, KanbanCardItem };
export { STAGES, DEFAULT_CARDS, STORAGE_KEY };

interface PstKanbanPipelineProps {
  onInspectWorkshop?: (moduleId: string) => void;
}

export const PstKanbanPipeline: React.FC<PstKanbanPipelineProps> = ({
  onInspectWorkshop,
}) => {
  const [cards, setCards] = useState<KanbanCardItem[]>(DEFAULT_CARDS);
  const [showAdd, setShowAdd] = useState(false);
  const [mobileStageFilter, setMobileStageFilter] = useState<
    KanbanStage | "all"
  >("all");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCards(parsed);
        }
      }
    } catch {
      // Ignore storage error
    }
  }, []);

  const saveCards = (next: KanbanCardItem[]) => {
    setCards(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore quota
    }
  };

  const moveCard = (cardId: string, direction: -1 | 1) => {
    playClickSound();
    const stageOrder: KanbanStage[] = [
      "cadrage",
      "assimilation",
      "terrain_redaction",
      "pret_valide",
    ];
    const next = cards.map((c) => {
      if (c.id !== cardId) return c;
      const idx = stageOrder.indexOf(c.stage);
      const targetIdx = Math.max(
        0,
        Math.min(stageOrder.length - 1, idx + direction),
      );
      if (
        stageOrder[targetIdx] === "pret_valide" &&
        c.stage !== "pret_valide"
      ) {
        triggerHaptic("success");
        playSuccessSound();
      } else {
        triggerHaptic("selection");
      }
      return { ...c, stage: stageOrder[targetIdx] };
    });
    saveCards(next);
  };

  const handleAddCard = (item: KanbanCardItem) => {
    saveCards([...cards, item]);
  };

  const handleDeleteCustom = (id: string) => {
    triggerHaptic("error");
    playClickSound();
    saveCards(cards.filter((c) => c.id !== id));
  };

  const handleReset = () => {
    playClickSound();
    saveCards(DEFAULT_CARDS);
  };

  const readinessScore = useMemo(() => {
    if (cards.length === 0) return 0;
    const weights: Record<KanbanStage, number> = {
      cadrage: 0.15,
      assimilation: 0.5,
      terrain_redaction: 0.8,
      pret_valide: 1.0,
    };
    const total = cards.reduce((acc, c) => acc + weights[c.stage], 0);
    return Math.round((total / cards.length) * 100);
  }, [cards]);

  return (
    <div className="rounded-2xl border border-border bg-card/95 p-5 shadow-xs space-y-4">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center shrink-0">
            <Kanban className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xs sm:text-sm font-serif font-bold text-foreground m-0 truncate">
                Tableau Kanban RNCP 7
              </h3>
              <span className="text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                Maturité : {readinessScore}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground m-0 hidden sm:block truncate">
              Suivi opérationnel du flux de dossiers : progression de chaque UE
              jusqu&apos;à la validation ECTS.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setShowAdd((v) => !v);
            }}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-background hover:bg-muted text-foreground border border-border transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-accent" />
            <span className="hidden sm:inline">Ajouter livrable</span>
            <span className="sm:hidden">+ Livrable</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted border border-border/60 transition-colors cursor-pointer"
            title="Réinitialiser le pipeline par défaut"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Stage Filter Tabs */}
      <div className="md:hidden flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
        <button
          type="button"
          onClick={() => setMobileStageFilter("all")}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
            mobileStageFilter === "all"
              ? "bg-primary text-primary-foreground shadow-2xs"
              : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          Tous ({cards.length})
        </button>
        {STAGES.map((st) => {
          const count = cards.filter((c) => c.stage === st.id).length;
          return (
            <button
              key={st.id}
              type="button"
              onClick={() => setMobileStageFilter(st.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                mobileStageFilter === st.id
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {st.label.split(".")[1]?.trim() || st.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Quick Add Form */}
      {showAdd && (
        <KanbanQuickAddForm
          onAddCard={handleAddCard}
          onClose={() => setShowAdd(false)}
        />
      )}

      {/* 4-Column Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5">
        {STAGES.map((stage, stageIdx) => {
          const columnCards = cards.filter((c) => c.stage === stage.id);
          const columnEcts = columnCards.reduce((sum, c) => sum + c.ects, 0);

          return (
            <div
              key={stage.id}
              className={`rounded-xl border border-border border-t-4 ${stage.headerBorder} bg-background/60 p-3 flex-col gap-2.5 min-h-[260px] ${
                mobileStageFilter === "all" || mobileStageFilter === stage.id
                  ? "flex"
                  : "hidden md:flex"
              }`}
            >
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-border/60">
                <div>
                  <span className="text-xs font-bold text-foreground block">
                    {stage.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground block">
                    {stage.subtitle}
                  </span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border ${stage.badgeClass}`}
                >
                  {columnCards.length} · {columnEcts} ECTS
                </span>
              </div>

              <div className="space-y-2 flex-1">
                {columnCards.length === 0 ? (
                  <div className="h-32 rounded-lg border border-dashed border-border/70 flex items-center justify-center text-[11px] text-muted-foreground italic p-3 text-center">
                    Aucun livrable dans cette colonne
                  </div>
                ) : (
                  columnCards.map((card) => (
                    <KanbanCardView
                      key={card.id}
                      card={card}
                      stageIdx={stageIdx}
                      totalStages={STAGES.length}
                      onMoveCard={moveCard}
                      onDeleteCustom={handleDeleteCustom}
                      onInspectWorkshop={onInspectWorkshop}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PstKanbanPipeline;

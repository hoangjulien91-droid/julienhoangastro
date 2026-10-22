import React, { useState, useEffect, useMemo } from "react";
import {
  Kanban,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  BookOpen,
  FileText,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

export type KanbanStage =
  "cadrage" | "assimilation" | "terrain_redaction" | "pret_valide";

export interface KanbanCardItem {
  id: string;
  code: string;
  title: string;
  deliverableType: string;
  ects: number;
  stage: KanbanStage;
  notes: string;
  isCustom?: boolean;
}

const STAGES: {
  id: KanbanStage;
  label: string;
  subtitle: string;
  badgeClass: string;
  headerBorder: string;
}[] = [
  {
    id: "cadrage",
    label: "1. Cadrage & Exploration",
    subtitle: "Lecture du syllabus & repérage des auteurs",
    badgeClass:
      "bg-slate-500/15 text-slate-600 dark:text-slate-300 border-slate-500/30",
    headerBorder: "border-t-slate-400",
  },
  {
    id: "assimilation",
    label: "2. Fiches & Assimilation SM-2",
    subtitle: "Conceptualisation & controverses théoriques",
    badgeClass:
      "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    headerBorder: "border-t-amber-500",
  },
  {
    id: "terrain_redaction",
    label: "3. Terrain & Dossier Clinique",
    subtitle: "Analyse de l'activité réelle & verbatims",
    badgeClass:
      "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    headerBorder: "border-t-indigo-500",
  },
  {
    id: "pret_valide",
    label: "4. Prêt Partiel / Validé ECTS",
    subtitle: "Sujet blanc validé & Pre-Defense Guard 100%",
    badgeClass:
      "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    headerBorder: "border-t-emerald-500",
  },
];

const DEFAULT_CARDS: KanbanCardItem[] = [
  {
    id: "kb-pst106",
    code: "PST106",
    title:
      "Clinique de l'activité et psychologie du travail (15 oct. → 23 janv. 2027)",
    deliverableType: "Examen écrit — Sam. 23 janv. 2027 (Bègles)",
    ects: 6,
    stage: "terrain_redaction",
    notes:
      "Articuler Wisner/Leplat (Tâche prescrite vs Activité réelle) et Clot (Genre, Style, Pouvoir d'agir).",
  },
  {
    id: "kb-pst123",
    code: "PST123",
    title:
      "Le psychologue, le travail et l'emploi (Démarrage Sam. 17 oct. 2026 Bègles → 28 janv. 2027)",
    deliverableType: "Étude de cas déontologique & Bilan (6 cours Bègles)",
    ects: 6,
    stage: "assimilation",
    notes:
      "Maîtriser le Code 2021, la triangulation de la demande, l'art. L. 6313-4 et les modèles RPS (Karasek/Siegrist).",
  },
  {
    id: "kb-pst108",
    code: "PST108",
    title:
      "Psychologie du langage et clinique du dialogue (22 oct. → 20 janv. 2027)",
    deliverableType:
      "Analyse de corpus dialogique & Verbatims (9 cours Bègles)",
    ects: 6,
    stage: "assimilation",
    notes:
      "Mobiliser Vygotski (Pensée et langage), Bakhtine (Dialogisme), Bühler et Austin (Actes de langage).",
  },
  {
    id: "kb-pst120",
    code: "PST120",
    title:
      "Psychodynamique et psychopathologie du travail (Ouverture 22 fév. 2027)",
    deliverableType: "Dissertation clinique PDT & Soutenance",
    ects: 6,
    stage: "cadrage",
    notes:
      "Maîtriser Dejours & Molinier : souffrance/plaisir, stratégies collectives de défense, jugements d'utilité et de beauté.",
  },
  {
    id: "kb-pst124",
    code: "PST124",
    title:
      "Transformations digitales des activités et clinique des usages (Ouverture 10 mars 2027)",
    deliverableType: "Audit ergonomique & Genèse instrumentale",
    ects: 6,
    stage: "cadrage",
    notes:
      "Distinguer Artefact / Instrument (Rabardel, 1995), Système d'activité (Engeström) et Acceptation située (Bobillier Chaumon).",
  },
  {
    id: "kb-uapst",
    code: "UAPST",
    title: "Mémoire Professionnel & Soutenance Finale RNCP Niveau 7",
    deliverableType: "Mémoire clinique + Jury CNAM",
    ects: 30,
    stage: "cadrage",
    notes:
      "Passage de la commande sociale à la demande co-construite + Pre-Defense Guard.",
  },
];

const STORAGE_KEY = "pst_kanban_pipeline_v2";

interface PstKanbanPipelineProps {
  onInspectWorkshop?: (moduleId: string) => void;
}

export const PstKanbanPipeline: React.FC<PstKanbanPipelineProps> = ({
  onInspectWorkshop,
}) => {
  const [cards, setCards] = useState<KanbanCardItem[]>(DEFAULT_CARDS);
  const [showAdd, setShowAdd] = useState(false);
  const [newCode, setNewCode] = useState("PST106");
  const [newTitle, setNewTitle] = useState("");
  const [newDeliverable, setNewDeliverable] = useState(
    "Livrable intermédiaire",
  );

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

  const handleAddCard = (e: React.FormEvent) => {
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
    saveCards([...cards, item]);
    setNewTitle("");
    setShowAdd(false);
    triggerHaptic("success");
    playSuccessSound();
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center">
            <Kanban className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-serif font-bold text-foreground m-0">
                Tableau Kanban de Progression des UE &amp; Livrables RNCP 7
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Maturité globale : {readinessScore}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground m-0">
              Suivi opérationnel inspiré du flux de dossiers IKERKETA : faites
              progresser chaque UE du cadrage initial jusqu'à la validation
              ECTS.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setShowAdd((v) => !v);
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-background hover:bg-muted text-foreground border border-border transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-accent" />
            <span>Ajouter livrable</span>
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

      {/* Quick Add Form */}
      {showAdd && (
        <form
          onSubmit={handleAddCard}
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
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Ex: Retranscription verbatim autoconfrontation croisée..."
              className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-background border border-border text-foreground"
            />
          </div>
          <div className="sm:col-span-3">
            <label className="block text-[10px] font-mono uppercase text-muted-foreground mb-1">
              Type d'évaluation
            </label>
            <input
              type="text"
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
      )}

      {/* 4-Column Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5">
        {STAGES.map((stage, stageIdx) => {
          const columnCards = cards.filter((c) => c.stage === stage.id);
          const columnEcts = columnCards.reduce((sum, c) => sum + c.ects, 0);

          return (
            <div
              key={stage.id}
              className={`rounded-xl border border-border border-t-4 ${stage.headerBorder} bg-background/60 p-3 flex flex-col gap-2.5 min-h-[260px]`}
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
                  columnCards.map((card) => {
                    const isWorkshop = /^PST(106|108|120|123|124)$/i.test(
                      card.code,
                    );
                    return (
                      <div
                        key={card.id}
                        className="rounded-xl border border-border/90 bg-card p-3 shadow-2xs hover:border-accent/40 transition-all flex flex-col justify-between gap-2.5"
                      >
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
                                onClick={() => handleDeleteCustom(card.id)}
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
                                onClick={() =>
                                  onInspectWorkshop(card.code.toLowerCase())
                                }
                                className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted hover:bg-muted/80 text-foreground cursor-pointer"
                                title="Inspecter l'atelier dans le tiroir latéral"
                              >
                                Inspecter
                              </button>
                            )}
                            <button
                              type="button"
                              disabled={stageIdx === 0}
                              onClick={() => moveCard(card.id, -1)}
                              className="p-1 rounded bg-muted/70 hover:bg-muted text-foreground disabled:opacity-30 cursor-pointer"
                              title="Reculer d'une étape"
                            >
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              disabled={stageIdx === STAGES.length - 1}
                              onClick={() => moveCard(card.id, 1)}
                              className="p-1 rounded bg-primary/10 hover:bg-primary/20 text-primary disabled:opacity-30 cursor-pointer"
                              title="Avancer à l'étape suivante"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
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

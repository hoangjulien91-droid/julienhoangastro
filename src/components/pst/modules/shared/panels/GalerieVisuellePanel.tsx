"use client";

import { useMemo, useState } from "react";
import {
  Layers,
  Sparkles,
  PenTool,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import {
  SCHEMAS_MATRICES,
  type SchemaMatrice,
} from "@/lib/pst/data/schemas-matrices";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { GalerieDiagramView } from "./galerie/GalerieDiagramView";
import { GalerieDrawingGuideView } from "./galerie/GalerieDrawingGuideView";
import { GalerieCacheCacheView } from "./galerie/GalerieCacheCacheView";

interface GalerieVisuellePanelProps {
  moduleKey: "pst106" | "pst108" | "pst123" | "all";
  defaultSchemaId?: string;
}

export function GalerieVisuellePanel({
  moduleKey,
  defaultSchemaId,
}: GalerieVisuellePanelProps) {
  // Schémas associés à ce module
  const schemas: SchemaMatrice[] = useMemo(() => {
    if (moduleKey === "all") return SCHEMAS_MATRICES;
    return SCHEMAS_MATRICES.filter(
      (s) => s.moduleKey === moduleKey || s.moduleKey === "transversal",
    );
  }, [moduleKey]);

  const [selectedId, setSelectedId] = useState<string>(
    defaultSchemaId || schemas[0]?.id || SCHEMAS_MATRICES[0].id,
  );
  const [viewMode, setViewMode] = useState<"schema" | "dessin" | "test">("schema");
  const [testRevealed, setTestRevealed] = useState<Record<string, boolean>>({});
  const [copiedAscii, setCopiedAscii] = useState<boolean>(false);

  const activeSchema: SchemaMatrice = useMemo(() => {
    return (
      schemas.find((s) => s.id === selectedId) ||
      SCHEMAS_MATRICES.find((s) => s.id === selectedId) ||
      schemas[0] ||
      SCHEMAS_MATRICES[0]
    );
  }, [schemas, selectedId]);

  function handleSelectSchema(id: string) {
    playClickSound();
    setSelectedId(id);
    setTestRevealed({});
  }

  function handleToggleReveal(term: string) {
    playClickSound();
    setTestRevealed((prev) => ({ ...prev, [term]: !prev[term] }));
  }

  function handleRevealAll() {
    playSuccessSound();
    const all: Record<string, boolean> = {};
    activeSchema.elementsCles.forEach((el) => {
      all[el.terme] = true;
    });
    setTestRevealed(all);
    toast.success("Toutes les réponses ont été révélées.");
  }

  function handleHideAll() {
    playReviewSound();
    setTestRevealed({});
    toast.info("Toutes les étiquettes sont masquées. À vous de jouer !");
  }

  function handleCopyAscii() {
    playClickSound();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(activeSchema.asciiRepresentation);
      setCopiedAscii(true);
      playSuccessSound();
      triggerHaptic();
      toast.success("Schéma ASCII copié dans le presse-papier !");
      setTimeout(() => setCopiedAscii(false), 3000);
    }
  }

  return (
    <div className="space-y-6">
      {/* ── BANDEAU VISUEL SUPÉRIEUR (APPLE HIG CARD) ────────────────────── */}
      <div className="p-4 sm:p-7 rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-amber-500/[0.04] shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-mono font-bold uppercase rounded-full bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Mémoire Visuelle &amp; Schémas d&apos;Examen 18/20
              </span>
              <span className="text-xs text-muted-foreground">
                {schemas.length} Schémas Vectoriels SVG Interactifs
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-foreground tracking-tight">
              Galerie Graphique &amp; Matrices Canoniques
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed">
              Pour ancrer durablement les concepts clés et décrocher les points bonus
              à l&apos;examen grâce à des représentations graphiques impeccables.
            </p>
          </div>

          {/* Sélecteur de mode d'apprentissage (Apple iOS Segmented Control) */}
          <div className="inline-flex items-center p-1 bg-muted/60 dark:bg-slate-900/80 rounded-2xl border border-border/60 shadow-2xs self-start sm:self-auto">
            <button
              onClick={() => {
                playClickSound();
                setViewMode("schema");
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "schema"
                  ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>1. Diagramme SVG</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                setViewMode("dessin");
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "dessin"
                  ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>2. Dessin au Stylo (45s)</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                setViewMode("test");
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === "test"
                  ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>3. Cache-Cache Test</span>
            </button>
          </div>
        </div>

        {/* Barre de sélection horizontale des schémas disponibles */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 pt-2">
          {schemas.map((s, idx) => {
            const isSelected = s.id === activeSchema.id;
            return (
              <button
                key={s.id}
                onClick={() => handleSelectSchema(s.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 border cursor-pointer ${
                  isSelected
                    ? "bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-500/40 shadow-2xs font-bold"
                    : "bg-card/70 border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <span className="font-mono text-muted-foreground/80 font-bold">
                  #{idx + 1}
                </span>
                <span className="truncate max-w-[200px] sm:max-w-[240px]">
                  {s.titre}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── EN-TÊTE DU SCHÉMA ACTIF ──────────────────────────────────────── */}
      <div className="p-5 sm:p-6 bg-card border border-border/70 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-muted text-muted-foreground border border-border/60">
              {activeSchema.moduleKey.toUpperCase()}
            </span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">
              {activeSchema.auteur} ({activeSchema.annee})
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground tracking-tight">
            {activeSchema.titre}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-3xl">
            {activeSchema.descriptionPedagogique}
          </p>
        </div>

        {/* Formule clé rapide */}
        <div className="p-3.5 bg-amber-500/10 border border-amber-500/25 rounded-2xl max-w-md shrink-0">
          <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 tracking-wider block mb-0.5">
            Formule synthétique à mémoriser :
          </span>
          <div className="text-xs text-foreground font-mono font-bold leading-tight">
            {activeSchema.formuleCle}
          </div>
        </div>
      </div>

      {/* ── MODE 1 : DIAGRAMME VECTORIEL SVG INTERACTIF ─────────────────── */}
      {viewMode === "schema" && (
        <GalerieDiagramView activeSchema={activeSchema} />
      )}

      {/* ── MODE 2 : GUIDE DE REPRODUCTION EXAMEN AU STYLO (45 SECONDES) ── */}
      {viewMode === "dessin" && (
        <GalerieDrawingGuideView
          activeSchema={activeSchema}
          copiedAscii={copiedAscii}
          onCopyAscii={handleCopyAscii}
        />
      )}

      {/* ── MODE 3 : DÉFI CACHE-CACHE VISUEL (TEST DE RAPPEL ACTIF) ─────── */}
      {viewMode === "test" && (
        <GalerieCacheCacheView
          activeSchema={activeSchema}
          testRevealed={testRevealed}
          onToggleReveal={handleToggleReveal}
          onRevealAll={handleRevealAll}
          onHideAll={handleHideAll}
        />
      )}
    </div>
  );
}

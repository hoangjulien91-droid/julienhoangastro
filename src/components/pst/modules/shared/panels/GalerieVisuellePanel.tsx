"use client";

import { useMemo, useState } from "react";
import {
  Layers,
  Sparkles,
  PenTool,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  Maximize2,
  FileCode,
  BookOpen,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  SCHEMAS_MATRICES,
  type SchemaMatrice,
} from "@/lib/pst/data/schemas-matrices";
import { PstDiagramRenderer } from "@/components/pst/visuals/PstDiagrams";
import {
  playClickSound,
  playSuccessSound,
  playReviewSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";

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
      <div className="p-6 sm:p-7 rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card to-amber-500/[0.04] shadow-xs space-y-4">
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
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2">
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

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── MODE 1 : DIAGRAMME VECTORIEL SVG INTERACTIF ─────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {viewMode === "schema" && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-4 sm:p-6 bg-card border border-border/70 rounded-3xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Diagramme Vectoriel SVG Dynamique (Cliquez sur les zones pour explorer)
              </span>
            </div>

            {/* Rendu effectif du SVG interactif */}
            <PstDiagramRenderer schemaId={activeSchema.id} />
          </div>

          {/* Décomposition des éléments du schéma */}
          <div className="p-5 sm:p-6 bg-card border border-border/70 rounded-2xl space-y-4 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Les {activeSchema.elementsCles.length} Composants Canoniques à Annoter :
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {activeSchema.elementsCles.map((el, eIdx) => (
                <div
                  key={eIdx}
                  className="p-3.5 bg-muted/40 rounded-xl border border-border/60 space-y-1 hover:border-border transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground text-xs">
                      {el.terme}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-card text-muted-foreground border border-border/60">
                      {el.role}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {el.explication}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── MODE 2 : GUIDE DE REPRODUCTION EXAMEN AU STYLO (45 SECONDES) ── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {viewMode === "dessin" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Colonne Gauche : Schéma ASCII prêt à reproduire au stylo */}
          <div className="lg:col-span-7 p-5 sm:p-6 bg-card border border-border/70 rounded-3xl space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <h3 className="text-xs sm:text-sm font-bold text-foreground">
                  Squelette Géométrique pour Copie d&apos;Examen
                </h3>
              </div>
              <button
                onClick={handleCopyAscii}
                className="px-3 py-1.5 text-xs font-medium rounded-xl bg-muted hover:bg-muted/80 text-foreground border border-border/60 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                {copiedAscii ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" /> Copié
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copier ASCII
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 sm:p-5 bg-muted/50 text-foreground font-mono text-[11px] sm:text-xs leading-tight rounded-2xl border border-border/60 overflow-x-auto select-all shadow-inner">
              {activeSchema.asciiRepresentation}
            </pre>
          </div>

          {/* Colonne Droite : Conseils de dessin et pièges visuels */}
          <div className="lg:col-span-5 space-y-4">
            {/* Guide pas à pas */}
            <div className="p-5 bg-card border border-border/70 rounded-3xl space-y-3 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Comment dessiner ce schéma en 45s sur la copie :
              </span>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed font-sans bg-muted/40 p-4 rounded-2xl border border-border/60">
                {activeSchema.reproductionExamenConseil}
              </p>
            </div>

            {/* Piège éliminatoire à éviter */}
            <div className="p-5 bg-rose-500/10 border border-rose-500/25 rounded-3xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-800 dark:text-rose-200 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <span>Le Piège Visuel qui fait perdre des points :</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-950 dark:text-rose-200 leading-relaxed font-sans bg-rose-500/15 p-3.5 rounded-2xl border border-rose-500/20">
                {activeSchema.piegeDessinExamen}
              </p>
            </div>

            {/* Pourquoi insérer ce schéma */}
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl text-xs text-emerald-900 dark:text-emerald-300 space-y-1">
              <span className="font-bold block">
                🎯 L&apos;avis des jurys du Cnam :
              </span>
              <p className="text-emerald-800 dark:text-emerald-200/90 leading-relaxed">
                Une copie d&apos;examen qui intègre un schéma propre entouré de son
                cadre et légendé obtient en moyenne 2 à 3 points supplémentaires
                qu&apos;une copie purement textuelle.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── MODE 3 : DÉFI CACHE-CACHE VISUEL (TEST DE RAPPEL ACTIF) ─────── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {viewMode === "test" && (
        <div className="p-6 bg-card border border-border/70 rounded-3xl space-y-5 shadow-xs animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Entraînement Mémoire Visuelle : Retrouvez les Concepts Masqués
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Regardez le rôle de chaque composant et testez si vous êtes capable
                de restituer mentalement son nom officiel avant de cliquer pour vérifier.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRevealAll}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-card hover:bg-muted text-foreground border border-border/60 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-500" /> Tout révéler
              </button>
              <button
                onClick={handleHideAll}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-card hover:bg-muted text-foreground border border-border/60 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <EyeOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Tout masquer
              </button>
            </div>
          </div>

          {/* Grille des cartes de test */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeSchema.elementsCles.map((el, idx) => {
              const isRevealed = !!testRevealed[el.terme];
              return (
                <div
                  key={idx}
                  onClick={() => handleToggleReveal(el.terme)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer select-none space-y-2.5 ${
                    isRevealed
                      ? "bg-emerald-500/5 border-emerald-500/40 shadow-xs"
                      : "bg-card border-border/70 hover:border-amber-500/50 hover:bg-muted/20 shadow-2xs"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Composant #{idx + 1} · {el.role}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isRevealed
                          ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30"
                          : "bg-muted text-muted-foreground border border-border/60"
                      }`}
                    >
                      {isRevealed ? "Révélé" : "Masqué (Cliquer pour voir)"}
                    </span>
                  </div>

                  {/* Indice / Explication du rôle */}
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {el.explication}
                  </p>

                  {/* Zone de réponse révélée ou masquée */}
                  <div className="pt-2 border-t border-border/60">
                    {isRevealed ? (
                      <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono animate-fadeIn flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>{el.terme}</span>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-muted/50 border border-border/60 text-center text-xs font-mono text-muted-foreground italic">
                        •••••••••••••••••••• (Cliquer pour vérifier)
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

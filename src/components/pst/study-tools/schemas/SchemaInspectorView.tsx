import {
  Copy,
  Check,
  Sparkles,
  AlertTriangle,
  FileCode,
  PenTool,
  Palette,
} from "lucide-react";
import type { SchemaMatrice } from "@/lib/pst/data/schemas-matrices";
import { type ClozeItem } from "@/lib/pst/data/schemas-matrices-cloze";
import { SchemaClozeChallenge } from "./SchemaClozeChallenge";
import { PstDiagramRenderer } from "@/components/pst/visuals/PstDiagrams";
import { SvgFullScreenViewer } from "@/components/pst/visuals/SvgFullScreenViewer";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface SchemaInspectorViewProps {
  activeSchema: SchemaMatrice;
  filteredSchemas: SchemaMatrice[];
  selectedSchemaId: string;
  onSelectSchemaId: (id: string) => void;
  viewMode: "svg" | "cloze" | "ascii";
  copied: boolean;
  onCopyAscii: () => void;
  // Cloze Challenge props
  challenges: ClozeItem[];
  clozeAnswers: Record<string, string>;
  selectedSlotId: string | null;
  setSelectedSlotId: (id: string | null) => void;
  correctCount: number;
  isAllSolved: boolean;
  allAvailableBadges: string[];
  onSelectClozeOption: (text: string) => void;
}

export function SchemaInspectorView({
  activeSchema,
  filteredSchemas,
  selectedSchemaId,
  onSelectSchemaId,
  viewMode,
  copied,
  onCopyAscii,
  challenges,
  clozeAnswers,
  selectedSlotId,
  setSelectedSlotId,
  correctCount,
  isAllSolved,
  allAvailableBadges,
  onSelectClozeOption,
}: SchemaInspectorViewProps) {
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Mobile-Only Horizontal Schema Selector Carousel */}
      <div className="block md:hidden pb-1 border-b border-slate-200/70 dark:border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap py-1">
          {filteredSchemas.map((s) => {
            const isSelected = selectedSchemaId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  onSelectSchemaId(s.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer shrink-0 ${
                  isSelected
                    ? "bg-cyan-600 text-white border-cyan-600 shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                }`}
              >
                <span className="font-mono text-[9.5px] uppercase mr-1 opacity-80">
                  {s.moduleKey.toUpperCase()}
                </span>
                <span>{s.titre.slice(0, 18)}...</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Header info */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-800 dark:text-cyan-200 uppercase">
            {activeSchema.moduleKey.toUpperCase()} · {activeSchema.auteur} (
            {activeSchema.annee})
          </span>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 mt-1">
            {activeSchema.titre}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onCopyAscii}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 transition-all active:scale-95 cursor-pointer"
            title="Copier le schéma en texte ASCII"
          >
            {copied ? (
              <Check className="size-3.5 text-emerald-600" />
            ) : (
              <Copy className="size-3.5" />
            )}
            <span>{copied ? "Copié !" : "Copier"}</span>
          </button>
        </div>
      </div>

      {/* Formule Clé Card */}
      <div className="p-3.5 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200/80 dark:border-cyan-900/50 text-xs text-slate-800 dark:text-slate-200 space-y-1">
        <span className="font-bold text-cyan-800 dark:text-cyan-300 flex items-center gap-1">
          <Sparkles className="size-3.5 text-cyan-600" />
          Formule Matrice à mémoriser :
        </span>
        <p className="m-0 font-semibold leading-relaxed text-slate-900 dark:text-slate-100">
          {activeSchema.formuleCle}
        </p>
      </div>

      {/* VIEW MODE 1: PURE VECTOR SVG */}
      {viewMode === "svg" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Palette className="size-3.5 text-cyan-600" />
              <span>Schéma Vectoriel Haute Résolution (Interactif) :</span>
            </span>
            <span className="text-[10px] text-slate-400">
              Cliquez sur les zones pour explorer les définitions
            </span>
          </div>
          <SvgFullScreenViewer
            title={activeSchema.titre}
            subtitle={`${activeSchema.auteur} (${activeSchema.annee}) · ${activeSchema.moduleKey.toUpperCase()}`}
            buttonLabel="Agrandir en plein écran"
          >
            <PstDiagramRenderer schemaId={activeSchema.id} />
          </SvgFullScreenViewer>
        </div>
      )}

      {/* VIEW MODE 2: DÉFI SCHÉMA À TROUS (CLOZE CHALLENGE) */}
      {viewMode === "cloze" && (
        <SchemaClozeChallenge
          challenges={challenges}
          clozeAnswers={clozeAnswers}
          selectedSlotId={selectedSlotId}
          setSelectedSlotId={setSelectedSlotId}
          correctCount={correctCount}
          isAllSolved={isAllSolved}
          allAvailableBadges={allAvailableBadges}
          onSelectOption={onSelectClozeOption}
        />
      )}

      {/* VIEW MODE 3: ASCII SCHEMA FORMAT */}
      {viewMode === "ascii" && (
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <FileCode className="size-3.5 text-cyan-600" />
            <span>
              Représentation Graphique Canonique (Format Copie d&apos;Examen) :
            </span>
          </span>
          <pre className="p-3 sm:p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] sm:text-xs overflow-x-auto scrollbar-none leading-tight border border-slate-800 shadow-inner">
            {activeSchema.asciiRepresentation.trim()}
          </pre>
        </div>
      )}

      {/* Éléments Clés Décortiqués */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
          Composants du schéma expliqués :
        </span>
        <div className="grid grid-cols-1 gap-2 text-xs">
          {activeSchema.elementsCles.map((el, eIdx) => (
            <div
              key={eIdx}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-0.5"
            >
              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                <span>{el.terme}</span>
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.2 rounded-full">
                  {el.role}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed m-0 text-[11px]">
                {el.explication}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Conseils de reproduction d'examen & Pièges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 text-xs space-y-1">
          <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
            <PenTool className="size-3.5 text-emerald-600" />
            Conseil de dessin d&apos;examen 18/20 :
          </span>
          <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed m-0">
            {activeSchema.reproductionExamenConseil}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 text-xs space-y-1">
          <span className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1">
            <AlertTriangle className="size-3.5 text-rose-600" />
            Piège éliminatoire à éviter :
          </span>
          <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed m-0">
            {activeSchema.piegeDessinExamen}
          </p>
        </div>
      </div>
    </div>
  );
}

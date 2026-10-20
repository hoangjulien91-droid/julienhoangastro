"use client";

import { useState } from "react";
import {
  X,
  Layers,
  Copy,
  Check,
  Headphones,
  Sparkles,
  AlertTriangle,
  FileCode,
  PenTool,
  BookOpen,
} from "lucide-react";
import { SCHEMAS_MATRICES, type SchemaMatrice } from "@/lib/pst/data/schemas-matrices";
import { playClickSound, playSuccessSound } from "@/lib/pst/audio-feedback";
import { toast } from "sonner";

interface SchemasMatricesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

export function SchemasMatricesModal({
  isOpen,
  onClose,
  defaultModule,
}: SchemasMatricesModalProps) {
  const [selectedModule, setSelectedModule] = useState<string>(
    defaultModule && /^pst(106|108|123)$/.test(defaultModule) ? defaultModule : "all",
  );
  const [selectedSchemaId, setSelectedSchemaId] = useState<string>(
    SCHEMAS_MATRICES[0]?.id || "",
  );
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const filtered = SCHEMAS_MATRICES.filter((s) =>
    selectedModule === "all" ? true : s.moduleKey === selectedModule,
  );

  const activeSchema =
    filtered.find((s) => s.id === selectedSchemaId) || filtered[0] || SCHEMAS_MATRICES[0]!;

  function handleCopyAscii() {
    playClickSound();
    navigator.clipboard.writeText(activeSchema.asciiRepresentation.trim());
    setCopied(true);
    toast.success("Schéma copié au presse-papier !");
    setTimeout(() => setCopied(false), 2000);
  }

  function handleListenAudio() {
    playClickSound();
    const text = `Schéma d'examen 18 sur 20 : ${activeSchema.titre}, par ${activeSchema.auteur}. Formule clé : ${activeSchema.formuleCle}. Explication : ${activeSchema.descriptionPedagogique}. Conseil de reproduction sur votre copie : ${activeSchema.reproductionExamenConseil}. Attention au piège de dessin d'examen : ${activeSchema.piegeDessinExamen}.`;

    window.dispatchEvent(
      new CustomEvent("pst:play-audio", {
        detail: {
          title: `Schéma : ${activeSchema.titre}`,
          author: `${activeSchema.auteur} (${activeSchema.annee})`,
          text,
        },
      }),
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header iOS */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-amber-500/10">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Layers className="size-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Boîte à Schémas &amp; Matrices Visuelles 18/20</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-800 dark:text-cyan-200 font-extrabold uppercase">
                  Copie d&apos;Examen
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Les 9 schémas théoriques indispensables à reproduire pour décrocher la note maximale
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-3 border-b border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { key: "all", label: "Tous les schémas (9)" },
              { key: "pst106", label: "PST106 (Leplat, Clot, Dejours)" },
              { key: "pst108", label: "PST108 (Bourdieu, Habermas, Honneth)" },
              { key: "pst123", label: "PST123 (Dubar, Sainsaulieu, Castel)" },
            ].map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => {
                  playClickSound();
                  setSelectedModule(f.key);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  selectedModule === f.key
                    ? "bg-cyan-600 text-white border-cyan-600 shadow-sm"
                    : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body: Split View Left Selector & Right Inspector */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: Schema List */}
          <div className="md:col-span-4 border-r border-slate-200/80 dark:border-slate-800 overflow-y-auto p-3 space-y-1.5 bg-slate-50/50 dark:bg-slate-950/30">
            {filtered.map((s) => {
              const isSelected = activeSchema.id === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSelectedSchemaId(s.id);
                  }}
                  className={`w-full p-3 rounded-2xl text-left text-xs transition-all border cursor-pointer space-y-1 block ${
                    isSelected
                      ? "bg-cyan-600 text-white border-cyan-600 shadow-md scale-[1.02]"
                      : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-cyan-500/15 text-cyan-800 dark:text-cyan-200"
                      }`}
                    >
                      {s.moduleKey.toUpperCase()}
                    </span>
                    <span className="text-[10px] opacity-80">{s.annee}</span>
                  </div>
                  <div className="font-bold leading-snug truncate">{s.titre}</div>
                  <div className={`text-[11px] truncate ${isSelected ? "text-cyan-100" : "text-slate-500"}`}>
                    {s.auteur}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Schema Detailed View */}
          <div className="md:col-span-8 overflow-y-auto p-4 sm:p-6 space-y-4 bg-white dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-800 dark:text-cyan-200 uppercase">
                  {activeSchema.moduleKey.toUpperCase()} · {activeSchema.auteur} ({activeSchema.annee})
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 mt-1">
                  {activeSchema.titre}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleListenAudio}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/25 transition-all active:scale-95 cursor-pointer"
                  title="Écouter le décryptage audio du schéma"
                >
                  <Headphones className="size-3.5" />
                  <span>Écouter</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyAscii}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 transition-all active:scale-95 cursor-pointer"
                  title="Copier le schéma en texte ASCII"
                >
                  {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
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

            {/* ASCII Schema Visualizer */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <FileCode className="size-3.5 text-cyan-600" />
                <span>Représentation Graphique Canonique (Format Copie) :</span>
              </span>
              <pre className="p-3 sm:p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] sm:text-xs overflow-x-auto leading-tight border border-slate-800 shadow-inner">
                {activeSchema.asciiRepresentation.trim()}
              </pre>
            </div>

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
        </div>
      </div>
    </div>
  );
}

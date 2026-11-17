import React from "react";
import { Sparkles, Scale } from "lucide-react";
import {
  type StudioStorageState,
  MEMOIRE_SECTIONS,
  PROJECTION_META,
} from "@/lib/pst/data/memoire-studio-data";

interface MemoireStudioEditorProps {
  state: StudioStorageState;
  activeSection: typeof MEMOIRE_SECTIONS[0];
  activeSectionId: string;
  onSelectSection: (id: string) => void;
  onUpdateState: (
    updater: (prev: StudioStorageState) => StudioStorageState,
  ) => void;
  totalWords: number;
}

export function MemoireStudioEditor({
  state,
  activeSection,
  activeSectionId,
  onSelectSection,
  onUpdateState,
  totalWords,
}: MemoireStudioEditorProps) {
  return (
    <div className="max-w-3xl mx-auto rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-[#FBF9F5] dark:bg-slate-900 p-4 sm:p-8 shadow-sm">
      {/* Document Header */}
      <div className="border-b border-slate-300/80 dark:border-slate-800 pb-5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-slate-900 text-white dark:bg-indigo-500/20 dark:text-indigo-300 font-semibold">
            {PROJECTION_META[state.projection].headerBadge}
          </span>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            Année {state.academicYear}
          </span>
        </div>

        <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
          Intitulé du Mémoire / Dossier d&apos;Intervention
        </label>
        <input
          type="text"
          aria-label="Intitulé du Mémoire ou Dossier d'Intervention"
          value={state.title}
          onChange={(e) =>
            onUpdateState((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full text-base sm:text-lg font-bold bg-white/80 dark:bg-slate-950 border border-slate-300/80 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Terrain d&apos;intervention (Anonymisé)
            </label>
            <input
              type="text"
              aria-label="Terrain d'intervention anonymisé"
              value={state.terrainOrg}
              onChange={(e) =>
                onUpdateState((prev) => ({
                  ...prev,
                  terrainOrg: e.target.value,
                }))
              }
              className="w-full text-xs bg-white/80 dark:bg-slate-950 border border-slate-300/80 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200"
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Objectif de la projection active
            </label>
            <div className="text-[11px] text-slate-600 dark:text-slate-300 bg-white/60 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5">
              {PROJECTION_META[state.projection].subtitle}
            </div>
          </div>
        </div>
      </div>

      {/* Active Section Editor */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Partie {activeSection.number} · {activeSection.ueRef}
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {activeSection.title}
            </h3>
          </div>
          <div className="flex items-center gap-1">
            {MEMOIRE_SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelectSection(s.id)}
                className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                  s.id === activeSectionId
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300"
                }`}
              >
                {s.number}
              </button>
            ))}
          </div>
        </div>

        {/* Methodological Guidance Callout */}
        <div className="mb-3 p-3 rounded-xl bg-indigo-500/8 border border-indigo-500/20 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong className="font-semibold text-slate-900 dark:text-white">
              Attendu méthodologique CNAM :
            </strong>{" "}
            {activeSection.guidance}
          </p>
        </div>

        <textarea
          rows={12}
          value={state.sections[activeSection.id] || ""}
          onChange={(e) => {
            const val = e.target.value;
            onUpdateState((prev) => ({
              ...prev,
              sections: {
                ...prev.sections,
                [activeSection.id]: val,
              },
            }));
          }}
          placeholder={activeSection.placeholder}
          className="w-full rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 p-4 text-sm leading-relaxed text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 font-serif"
        />
      </div>

      {/* Continuous Preview Summary */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Scale className="w-3.5 h-3.5 text-indigo-500" />
          <span>
            Code de déontologie des psychologues (2021) · Secret professionnel
            &amp; Anonymisation stricte
          </span>
        </div>
        <span className="font-mono">
          Total corpus : <strong>{totalWords}</strong> mots
        </span>
      </div>
    </div>
  );
}

"use client";

import {
  ANNALES_PST108,
  type AnnalePst108Item,
  type Pst108ProfId,
} from "@/lib/pst/data/pst108-annales";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";
import { Atelier108SubjectDetail } from "./annales/Atelier108SubjectDetail";

interface Atelier108AnnalesViewProps {
  filteredSubjects: AnnalePst108Item[];
  currentSubject: AnnalePst108Item;
  currentSubjectIdxInFiltered: number;
  profFilter: "all" | Pst108ProfId;
  onSelectProfFilter: (filter: "all" | Pst108ProfId) => void;
  onSelectSubjectId: (id: string) => void;
  annaleDrafts: Record<string, string>;
  onUpdateAnnaleDraft: (id: string, val: string) => void;
  showCorrige: boolean;
  onToggleCorrige: () => void;
  copied: boolean;
  onCopyCorrige: (titre: string, corrigeHtml: string) => void;
}

export function Atelier108AnnalesView({
  filteredSubjects,
  currentSubject,
  currentSubjectIdxInFiltered,
  profFilter,
  onSelectProfFilter,
  onSelectSubjectId,
  annaleDrafts,
  onUpdateAnnaleDraft,
  showCorrige,
  onToggleCorrige,
  copied,
  onCopyCorrige,
}: Atelier108AnnalesViewProps) {
  const currentAnnaleDraft = annaleDrafts[currentSubject.id] || "";

  return (
    <div className="space-y-6">
      {/* FILTRE PAR ENSEIGNANT (3 × 1h00) */}
      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            {
              id: "all" as const,
              label: `Tous les sujets (${ANNALES_PST108.length})`,
            },
            {
              id: "lucy" as const,
              label: `1h00 Éric LUCY (${ANNALES_PST108.filter((s) => s.prof === "lucy").length})`,
            },
            {
              id: "valls" as const,
              label: `1h00 Francis VALLS (${ANNALES_PST108.filter((s) => s.prof === "valls").length})`,
            },
            {
              id: "marot" as const,
              label: `1h00 Véronique MAROT (${ANNALES_PST108.filter((s) => s.prof === "marot").length})`,
            },
          ] as const
        ).map((tab) => {
          const active = profFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                onSelectProfFilter(tab.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                active
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* SÉLECTEUR DE SUJETS PAR BOUTONS PILLS */}
      <div className="flex flex-wrap gap-2 pb-2">
        {filteredSubjects.map((subject, idx) => {
          const isSelected = subject.id === currentSubject.id;
          const hasDraft = Boolean((annaleDrafts[subject.id] || "").trim());
          const profShort =
            subject.prof === "lucy"
              ? "Lucy · 1h"
              : subject.prof === "valls"
                ? "Valls · 1h"
                : "Marot · 1h";
          return (
            <button
              key={subject.id}
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                onSelectSubjectId(subject.id);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left flex items-center gap-1.5 cursor-pointer border ${
                isSelected
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-500/20"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400"
              }`}
            >
              <span className="opacity-75 font-mono text-[10px]">
                S{idx + 1} · {profShort}
              </span>
              <span className="truncate max-w-[170px] sm:max-w-[210px]">
                {subject.titre.replace(/^Sujet \d+ : /, "")}
              </span>
              {hasDraft && (
                <span
                  className="w-2 h-2 rounded-full bg-amber-400"
                  title="Brouillon en cours"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* FICHE DÉTAILLÉE DU SUJET ACTIF */}
      <Atelier108SubjectDetail
        currentSubject={currentSubject}
        currentSubjectIdxInFiltered={currentSubjectIdxInFiltered}
        filteredSubjectsCount={filteredSubjects.length}
        currentAnnaleDraft={currentAnnaleDraft}
        onUpdateAnnaleDraft={onUpdateAnnaleDraft}
        showCorrige={showCorrige}
        onToggleCorrige={onToggleCorrige}
        copied={copied}
        onCopyCorrige={onCopyCorrige}
      />
    </div>
  );
}

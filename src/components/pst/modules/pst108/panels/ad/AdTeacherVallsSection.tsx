"use client";

import React from "react";
import type { Pst108TeacherAd } from "@/lib/pst/data/pst108-ad";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { VallsExercicesTab } from "./valls/VallsExercicesTab";
import { VallsCasCliniquesTab } from "./valls/VallsCasCliniquesTab";
import { VallsTheorieTab } from "./valls/VallsTheorieTab";
import { VallsDocsTab } from "./valls/VallsDocsTab";

export interface AdTeacherVallsSectionProps {
  teacherData: Pst108TeacherAd;
  vallsTab: "exercices" | "cas" | "theorie" | "docs";
  onVallsTabChange: (tab: "exercices" | "cas" | "theorie" | "docs") => void;
  selectedExNum: number;
  onSelectExNum: (num: number) => void;
  expandedCasId: string | null;
  onToggleExpandedCasId: (id: string | null) => void;
  selectedDocId: string | null;
  onSelectDocId: (id: string | null) => void;
  onCopy: (text: string, key: string) => void;
  copiedKey: string | null;
}

export function AdTeacherVallsSection({
  teacherData,
  vallsTab,
  onVallsTabChange,
  selectedExNum,
  onSelectExNum,
  expandedCasId,
  onToggleExpandedCasId,
  selectedDocId,
  onSelectDocId,
  onCopy,
  copiedKey,
}: AdTeacherVallsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            onVallsTabChange("exercices");
          }}
          className={`flex-1 min-w-[170px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            vallsTab === "exercices"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          ✍️ Les 3 Exercices Distanciel
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            onVallsTabChange("cas");
          }}
          className={`flex-1 min-w-[170px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            vallsTab === "cas"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          🎯 Les {teacherData.etudesDeCas?.length || 5} Études de Cas Cliniques
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            onVallsTabChange("theorie");
          }}
          className={`flex-1 min-w-[170px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            vallsTab === "theorie"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          📐 Théorie : Ghiglione vs Shannon
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            onVallsTabChange("docs");
          }}
          className={`flex-1 min-w-[150px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            vallsTab === "docs"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          📚 Documents &amp; SAVPJJ
        </button>
      </div>

      {/* 1. LES 3 EXERCICES DU DISTANCIEL DE VALLS */}
      {vallsTab === "exercices" && (
        <VallsExercicesTab
          exercicesDistanciel={teacherData.exercicesDistanciel}
          selectedExNum={selectedExNum}
          onSelectExNum={onSelectExNum}
          onCopy={onCopy}
          copiedKey={copiedKey}
        />
      )}

      {/* 2. LES 4 ÉTUDES DE CAS CLINIQUES DE VALLS */}
      {vallsTab === "cas" && (
        <VallsCasCliniquesTab
          etudesDeCas={teacherData.etudesDeCas}
          expandedCasId={expandedCasId}
          onToggleExpandedCasId={onToggleExpandedCasId}
        />
      )}

      {/* 3. THÉORIE & SCHÉMAS */}
      {vallsTab === "theorie" && (
        <VallsTheorieTab slideMasterclass={teacherData.slideMasterclass} />
      )}

      {/* 4. DOCUMENTS RESSOURCES DE VALLS */}
      {vallsTab === "docs" && (
        <VallsDocsTab
          documentsClefs={teacherData.documentsClefs}
          selectedDocId={selectedDocId}
          onSelectDocId={onSelectDocId}
          onCopy={onCopy}
          copiedKey={copiedKey}
        />
      )}
    </div>
  );
}

export default AdTeacherVallsSection;

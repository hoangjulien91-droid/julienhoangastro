"use client";

import React from "react";
import type { Pst108TeacherAd } from "@/lib/pst/data/pst108-ad";
import { playClickSound } from "@/lib/pst/audio-feedback";
import { MarotAdMiossecTab } from "./marot/MarotAdMiossecTab";
import { MarotDispositifsTab } from "./marot/MarotDispositifsTab";
import { MarotTheorieTab } from "./marot/MarotTheorieTab";
import { MarotTextesTab } from "./marot/MarotTextesTab";

export interface AdTeacherMarotSectionProps {
  teacherData: Pst108TeacherAd;
  marotTab: "ad_miossec" | "dispositifs" | "theorie" | "textes";
  onMarotTabChange: (
    tab: "ad_miossec" | "dispositifs" | "theorie" | "textes",
  ) => void;
  selectedAdDate: "04nov" | "10nov";
  onSelectAdDate: (date: "04nov" | "10nov") => void;
  selectedDispId: string;
  onSelectDispId: (id: string) => void;
  selectedDocId: string | null;
  onSelectDocId: (id: string | null) => void;
  onCopy: (text: string, key: string) => void;
  copiedKey: string | null;
}

export function AdTeacherMarotSection({
  teacherData,
  marotTab,
  onMarotTabChange,
  selectedAdDate,
  onSelectAdDate,
  selectedDispId,
  onSelectDispId,
  selectedDocId,
  onSelectDocId,
  onCopy,
  copiedKey,
}: AdTeacherMarotSectionProps) {
  return (
    <div className="space-y-6">
      {/* Sous-onglets Marot */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            onMarotTabChange("ad_miossec");
          }}
          className={`flex-1 min-w-[190px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            marotTab === "ad_miossec"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          📝 AD du 04/11 &amp; 10/11 (Miossec) ✦
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            onMarotTabChange("dispositifs");
          }}
          className={`flex-1 min-w-[180px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            marotTab === "dispositifs"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          🛠️ Les 3 Dispositifs Cliniques
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            onMarotTabChange("theorie");
          }}
          className={`flex-1 min-w-[190px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            marotTab === "theorie"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          📐 Vygotski vs Piaget &amp; Bakhtine
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            onMarotTabChange("textes");
          }}
          className={`flex-1 min-w-[160px] py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            marotTab === "textes"
              ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-black"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          📚 Textes Téléchargés ({teacherData.documentsClefs.length})
        </button>
      </div>

      {/* 1. ACTIVITÉS DISTANTES DES 04/11 ET 10/11 (YVON MIOSSEC 2019) */}
      {marotTab === "ad_miossec" && (
        <MarotAdMiossecTab
          adSeancesMarot={teacherData.adSeancesMarot}
          selectedAdDate={selectedAdDate}
          onSelectAdDate={onSelectAdDate}
          onCopy={onCopy}
          copiedKey={copiedKey}
        />
      )}

      {/* 2. LES 3 DISPOSITIFS CLINIQUES D'INTERVENTION */}
      {marotTab === "dispositifs" && (
        <MarotDispositifsTab
          dispositifsMarot={teacherData.dispositifsMarot}
          selectedDispId={selectedDispId}
          onSelectDispId={onSelectDispId}
          onCopy={onCopy}
          copiedKey={copiedKey}
        />
      )}

      {/* 3. THÉORIE : VYGOTSKI VS PIAGET & DIALOGISME BAKHTINIEN */}
      {marotTab === "theorie" && (
        <MarotTheorieTab slideMasterclass={teacherData.slideMasterclass} />
      )}

      {/* 4. LES TEXTES FONDAMENTAUX DE MME MAROT */}
      {marotTab === "textes" && (
        <MarotTextesTab
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

export default AdTeacherMarotSection;

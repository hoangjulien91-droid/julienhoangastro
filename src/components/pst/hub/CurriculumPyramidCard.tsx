"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Trophy,
  Award,
  Layers,
  ListFilter,
} from "lucide-react";

import {
  type ModuleProgress,
  CURRICULUM_STORAGE_KEY as STORAGE_KEY,
  INITIAL_CURRICULUM_MODULES as INITIAL_MODULES,
  TOTAL_CURRICULUM_ECTS as TOTAL_ECTS,
} from "@/lib/pst/data/curriculum-rncp7";
import { CurriculumStackView } from "./curriculum/CurriculumStackView";
import { CurriculumWallView } from "./curriculum/CurriculumWallView";
import { CurriculumGuideAccordion } from "./curriculum/CurriculumGuideAccordion";
import { CurriculumInspectModal } from "./curriculum/CurriculumInspectModal";

export function CurriculumPyramidCard() {
  const [modules, setModules] = useState<ModuleProgress[]>(INITIAL_MODULES);
  const [hydrated, setHydrated] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [viewMode, setViewMode] = useState<"pyramid" | "stack">("pyramid");
  const [inspectedModule, setInspectedModule] = useState<ModuleProgress | null>(
    null,
  );

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Record<string, "valide" | "en_cours" | "a_venir"> =
          JSON.parse(stored);
        setModules((prev) =>
          prev.map((m) => ({
            ...m,
            status: parsed[m.id] ?? m.status,
          })),
        );
      }
    } catch {
      // ignore
    }

    // Sur écran mobile (< 768px), basculer automatiquement sur la vue Cartes Années
    // pour éviter tout défilement 2D désagréable
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setViewMode("stack");
    }

    setHydrated(true);
  }, []);

  const toggleStatus = useCallback((id: string) => {
    setModules((prev) => {
      const next = prev.map((m) => {
        if (m.id !== id) return m;
        const nextStatus: "valide" | "en_cours" | "a_venir" =
          m.status === "valide"
            ? "en_cours"
            : m.status === "en_cours"
              ? "a_venir"
              : "valide";
        return { ...m, status: nextStatus };
      });

      if (hydrated) {
        const savedMap: Record<string, string> = {};
        next.forEach((m) => {
          savedMap[m.id] = m.status;
        });
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(savedMap));
        } catch {
          // ignore
        }
      }

      return next;
    });

    setInspectedModule((prev) => {
      if (!prev || prev.id !== id) return prev;
      const nextStatus =
        prev.status === "valide"
          ? "en_cours"
          : prev.status === "en_cours"
            ? "a_venir"
            : "valide";
      return { ...prev, status: nextStatus };
    });
  }, [hydrated]);

  const validatedEcts = modules
    .filter((m) => m.status === "valide")
    .reduce((acc, m) => acc + m.ects, 0);

  const inProgressEcts = modules
    .filter((m) => m.status === "en_cours")
    .reduce((acc, m) => acc + m.ects, 0);

  const remainingEcts = Math.max(0, TOTAL_ECTS - validatedEcts);

  const pctValidated = Math.round((validatedEcts * 100) / TOTAL_ECTS);
  const pctInProgress = Math.round((inProgressEcts * 100) / TOTAL_ECTS);

  return (
    <div
      id="pyramide"
      className="card p-4 sm:p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xs mb-6 overflow-hidden scroll-mt-24"
    >
      {/* Header & Progobarre ECTS - ultra compact et ergonomique mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 sm:p-2.5 bg-amber-500/15 text-amber-700 dark:text-amber-400 rounded-2xl ring-1 ring-amber-500/20 shadow-2xs shrink-0">
            <Trophy className="size-4.5 sm:size-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 m-0 leading-tight truncate">
              Parcours &amp; Pyramide RNCP 7 — Titre Psychologue
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 m-0 mt-0.5 truncate">
              Cliquez sur une case pour changer son statut (Validé / En cours /
              À venir)
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 flex-wrap">
          {/* Segmented control Vue Pyramide / Vue Mobile Cartes */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-2xs text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setViewMode("pyramid")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                viewMode === "pyramid"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <Layers className="size-3" />
              <span>Mur</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("stack")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                viewMode === "stack"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <ListFilter className="size-3" />
              <span>Cartes Années</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs shrink-0">
            <Award className="size-3.5 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-black text-slate-900 dark:text-slate-100 font-mono">
              {validatedEcts}/{TOTAL_ECTS} ECTS
            </span>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">
              ({pctValidated}%)
            </span>
          </div>
        </div>
      </div>

      {/* Compteurs chiffrés ECTS dynamiques (Requis UX) */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold py-2 px-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 mb-2.5">
        <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
          <span className="size-2 rounded-full bg-emerald-500 inline-block shadow-xs" />
          <span className="font-mono">
            {validatedEcts} / {TOTAL_ECTS} ECTS validés ({pctValidated}%)
          </span>
        </div>
        <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">
          •
        </span>
        <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
          <span className="size-2 rounded-full bg-amber-500 inline-block shadow-xs" />
          <span className="font-mono">{inProgressEcts} ECTS en cours</span>
        </div>
        <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">
          •
        </span>
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
          <span className="size-2 rounded-full bg-slate-400 inline-block" />
          <span className="font-mono">{remainingEcts} ECTS restants</span>
        </div>
      </div>

      {/* Jauge de progression multicolore dynamique */}
      <div
        className="w-full h-2.5 bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden mb-4 border border-slate-200/90 dark:border-slate-700/80 shadow-inner flex"
        role="progressbar"
        aria-valuenow={pctValidated}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progression du cursus RNCP 7"
      >
        <div
          className="h-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${pctValidated}%` }}
          title={`${validatedEcts} ECTS validés (${pctValidated}%)`}
        />
        <div
          className="h-full bg-amber-500 transition-all duration-500"
          style={{ width: `${pctInProgress}%` }}
          title={`${inProgressEcts} ECTS en cours (${pctInProgress}%)`}
        />
      </div>

      {/* Rendu soit Vue Mobile Cartes par Année (100% responsive), soit Mur de Briques classique */}
      {viewMode === "stack" ? (
        <CurriculumStackView
          modules={modules}
          onToggleStatus={toggleStatus}
          onInspectModule={setInspectedModule}
        />
      ) : (
        <CurriculumWallView
          modules={modules}
          onToggleStatus={toggleStatus}
          onInspectModule={setInspectedModule}
        />
      )}

      {/* Guide Pédagogique Collapsible */}
      <CurriculumGuideAccordion
        showGuide={showGuide}
        onToggleGuide={() => setShowGuide(!showGuide)}
      />

      {/* Légende interactive en bas de carte */}
      <div className="mt-5 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-4 flex-wrap text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            Légende clics :
          </span>
          <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
            <span className="size-2.5 rounded-sm bg-emerald-600 inline-block" />{" "}
            Validé
          </span>
          <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 font-medium">
            <span className="size-2.5 rounded-sm bg-amber-600 inline-block" />{" "}
            En cours
          </span>
          <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
            <span className="size-2.5 rounded-sm bg-[#5189B4] inline-block" /> À
            venir
          </span>
        </div>

        <div className="text-[11px] text-slate-500 italic">
          Survolez une UE ou cliquez sur ℹ pour inspecter ses pré-requis et
          crédits officiels.
        </div>
      </div>

      {/* Modale légère d'inspection de l'UE (Accessible au clic / mobile) */}
      <CurriculumInspectModal
        module={inspectedModule}
        onClose={() => setInspectedModule(null)}
        onToggleStatus={toggleStatus}
      />
    </div>
  );
}

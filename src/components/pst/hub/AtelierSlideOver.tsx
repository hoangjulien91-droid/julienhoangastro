"use client";

import React, { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { Link } from "@/components/common/Link";
import {
  type WorkshopDoctrineData,
  WORKSHOPS_DATA,
} from "@/lib/pst/data/atelier-workshops-data";
import { AtelierTabContent } from "./atelier/AtelierTabContent";

export type { WorkshopDoctrineData };
export { WORKSHOPS_DATA };

interface AtelierSlideOverProps {
  moduleId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AtelierSlideOver({
  moduleId,
  isOpen,
  onClose,
}: AtelierSlideOverProps) {
  const [activeTab, setActiveTab] = useState<
    "synthese" | "methodes" | "auteurs" | "examen"
  >("synthese");

  if (!isOpen || !moduleId) return null;

  const data = WORKSHOPS_DATA[moduleId] || {
    id: moduleId,
    name: `Atelier ${moduleId.toUpperCase()}`,
    ects: 6,
    prof: "CNAM Psychologie du Travail",
    focus: "Enseignement théorique et clinique spécialisé.",
    authors: [],
    methodologies: [],
    examType: "Épreuve terminale",
    examDesc: "Modalités conformes à la maquette pédagogique du CNAM.",
  };

  const routePath = `/pst/${data.id.replace("pst", "")}/`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Inspection de l'atelier ${data.id.toUpperCase()}`}
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Drawer Container (Linear standard 460px) */}
      <div
        className="relative w-full max-w-lg bg-card text-foreground shadow-2xl border-l border-border flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200 h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-3.5 sm:p-5 border-b border-border/80 flex items-center justify-between gap-2.5 shrink-0 bg-muted/20">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="size-8 rounded-lg bg-primary text-primary-foreground font-mono font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
              {data.id.toUpperCase()}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xs sm:text-sm font-serif font-bold text-foreground leading-tight m-0 truncate">
                  {data.name}
                </h2>
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground truncate block">
                {data.ects} ECTS · {data.prof}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer shrink-0"
            aria-label="Fermer le volet"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-3.5 sm:px-5 border-b border-border/60 flex items-center gap-1 text-xs font-medium shrink-0 bg-card overflow-x-auto whitespace-nowrap scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("synthese")}
            className={`py-2 sm:py-2.5 px-2.5 sm:px-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === "synthese"
                ? "border-accent text-accent font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Synthèse
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("auteurs")}
            className={`py-2 sm:py-2.5 px-2.5 sm:px-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === "auteurs"
                ? "border-accent text-accent font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Auteurs ({data.authors.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("methodes")}
            className={`py-2 sm:py-2.5 px-2.5 sm:px-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === "methodes"
                ? "border-accent text-accent font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Protocoles ({data.methodologies.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("examen")}
            className={`py-2 sm:py-2.5 px-2.5 sm:px-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === "examen"
                ? "border-accent text-accent font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Modalités Épreuve
          </button>
        </div>

        {/* Scrollable Content Body */}
        <AtelierTabContent activeTab={activeTab} data={data} />

        {/* Bottom Actions Bar */}
        <div className="p-3.5 sm:p-5 border-t border-border shrink-0 bg-muted/10 flex items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            Fermer
          </button>

          <Link
            href={routePath}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-xs"
          >
            <span>Ouvrir l&apos;Atelier {data.id.toUpperCase()}</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AtelierSlideOver;

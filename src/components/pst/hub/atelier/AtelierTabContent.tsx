"use client";

import React from "react";
import { Sparkles, Award, Clock } from "lucide-react";
import type { WorkshopDoctrineData } from "@/lib/pst/data/atelier-workshops-data";

interface AtelierTabContentProps {
  activeTab: "synthese" | "methodes" | "auteurs" | "examen";
  data: WorkshopDoctrineData;
}

export const AtelierTabContent: React.FC<AtelierTabContentProps> = ({
  activeTab,
  data,
}) => {
  return (
    <div className="p-5 overflow-y-auto space-y-5 text-xs flex-1">
      {activeTab === "synthese" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-accent block mb-1">
              Enjeu Pédagogique Fondamental
            </span>
            <p className="text-foreground text-xs leading-relaxed font-serif italic m-0">
              « {data.focus} »
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              Aperçu de l&apos;arsenal didactique :
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-lg border border-border bg-card">
                <span className="font-mono text-xs font-bold text-foreground block">
                  60 Heures
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Volume d&apos;ateliers
                </span>
              </div>
              <div className="p-3 rounded-lg border border-border bg-card">
                <span className="font-mono text-xs font-bold text-accent block">
                  {data.ects} ECTS
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Crédits validants
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              Auteurs fondamentaux :
            </span>
            <div className="flex flex-wrap gap-1.5">
              {data.authors.map((a) => (
                <span
                  key={a.name}
                  className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-muted text-foreground border border-border"
                >
                  {a.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "auteurs" && (
        <div className="space-y-3">
          {data.authors.map((a) => (
            <div
              key={a.name}
              className="p-3.5 rounded-xl border border-border bg-card space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground text-xs">
                  {a.name}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {a.role}
                </span>
              </div>
              <blockquote className="text-[11px] text-muted-foreground italic border-l-2 border-accent pl-2.5 m-0 leading-relaxed font-serif">
                « {a.quote} »
              </blockquote>
            </div>
          ))}
        </div>
      )}

      {activeTab === "methodes" && (
        <div className="space-y-3">
          {data.methodologies.map((m) => (
            <div
              key={m.title}
              className="p-3.5 rounded-xl border border-border bg-card space-y-1"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="size-3.5 text-accent shrink-0" />
                <span className="font-bold text-foreground text-xs">
                  {m.title}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed m-0 pl-5.5">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "examen" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border bg-card space-y-2">
            <div className="flex items-center gap-2">
              <Award className="size-4 text-accent" />
              <span className="font-bold text-xs text-foreground">
                {data.examType}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed m-0">
              {data.examDesc}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2">
            <Clock className="size-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">
                Critère d&apos;Assiduité CNAM :
              </span>
              <span className="text-[11px]">
                Présence obligatoire à 80% des séances présentielles et
                visio-conférences pour valider l&apos;admissibilité au mémoire.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

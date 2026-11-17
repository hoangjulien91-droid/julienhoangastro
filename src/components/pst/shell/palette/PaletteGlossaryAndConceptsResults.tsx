"use client";

import { ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import type { useCommandPaletteSearch } from "../useCommandPaletteSearch";

type SearchResults = ReturnType<typeof useCommandPaletteSearch>;

interface PaletteGlossaryAndConceptsResultsProps {
  workshops: SearchResults["matchedWorkshops"];
  authors: SearchResults["matchedAuthors"];
  concepts: SearchResults["matchedConcepts"];
  glossary: SearchResults["matchedGlossary"];
  onNavigate: (path: string) => void;
  onClose: () => void;
  onOpenWorkshopSlideOver?: (moduleId: string) => void;
}

export function PaletteGlossaryAndConceptsResults({
  workshops,
  authors,
  concepts,
  glossary,
  onNavigate,
  onClose,
  onOpenWorkshopSlideOver,
}: PaletteGlossaryAndConceptsResultsProps) {
  return (
    <>
      {/* 1. Ateliers PST */}
      {workshops.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            Ateliers de Psychologie du Travail ({workshops.length})
          </span>
          <div className="space-y-0.5">
            {workshops.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-muted/70 transition-colors group cursor-pointer"
                onClick={() => onNavigate(`/pst/${m.id.replace("pst", "")}/`)}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="size-6 rounded-md bg-primary/10 text-primary font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                    {m.id.toUpperCase()}
                  </span>
                  <div className="truncate">
                    <span className="font-semibold text-foreground block truncate">
                      {m.title}
                    </span>
                    <span className="text-[11px] text-muted-foreground truncate block">
                      {m.subject} · {m.cards} fiches
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {onOpenWorkshopSlideOver && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                        onOpenWorkshopSlideOver(m.id);
                      }}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted hover:bg-muted/90 text-muted-foreground hover:text-foreground border border-border"
                    >
                      Inspecter
                    </button>
                  )}
                  <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Auteurs & Doctrines */}
      {authors.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            Auteurs Fondamentaux
          </span>
          <div className="space-y-0.5">
            {authors.map((a) => (
              <div
                key={a.name}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-muted/70 transition-colors group cursor-pointer"
                onClick={() => onNavigate(`/pst/${a.mod.replace("pst", "")}/`)}
              >
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="size-4 text-accent shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground text-xs">
                      {a.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground block">
                      {a.desc} ({a.mod.toUpperCase()})
                    </span>
                  </div>
                </div>
                <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Ponts Conceptuels Transversaux */}
      {concepts.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            Ponts Conceptuels Transversaux ({concepts.length})
          </span>
          <div className="space-y-1">
            {concepts.map((p, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate("/pst#concepts")}
                className="p-2.5 rounded-xl border border-border/80 bg-card hover:border-accent/40 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-foreground text-xs flex items-center gap-1.5">
                    <Sparkles className="size-3 text-amber-500" />
                    <span>{p.c}</span>
                  </span>
                  <div className="flex items-center gap-1">
                    {Object.keys(p.m).map((ue) => (
                      <span
                        key={ue}
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-muted text-muted-foreground"
                      >
                        {ue.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground m-0 line-clamp-1">
                  {Object.entries(p.m)
                    .map(([ue, txt]) => `${ue.toUpperCase()} : ${txt}`)
                    .join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Termes du Glossaire */}
      {glossary.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            Glossaire Clinique ({glossary.length})
          </span>
          <div className="space-y-1">
            {glossary.map((g, idx) => (
              <div
                key={idx}
                onClick={() =>
                  onNavigate(`/pst/${g.m.replace("pst", "")}/#lexique`)
                }
                className="p-2.5 rounded-xl border border-border/80 bg-card hover:border-accent/40 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-foreground text-xs">{g.w}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-muted text-muted-foreground">
                    {g.m.toUpperCase()} →
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground m-0 line-clamp-2 font-serif">
                  {g.def}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

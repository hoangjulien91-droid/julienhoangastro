"use client";

import { ArrowRight, BookOpen, MapPin, ShieldAlert, Video } from "lucide-react";
import { formatFrDate } from "@/lib/pst/planning-stats";
import type { useCommandPaletteSearch } from "../useCommandPaletteSearch";

type SearchResults = ReturnType<typeof useCommandPaletteSearch>;

interface PaletteCourseAndPlanningResultsProps {
  sessions: SearchResults["matchedSessions"];
  errors: SearchResults["matchedErrors"];
  resources: SearchResults["matchedResources"];
  onNavigate: (path: string) => void;
}

export function PaletteCourseAndPlanningResults({
  sessions,
  errors,
  resources,
  onNavigate,
}: PaletteCourseAndPlanningResultsProps) {
  return (
    <>
      {/* Séances du Planning CNAM Bègles / ENF */}
      {sessions.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            Séances Planning CNAM ({sessions.length})
          </span>
          <div className="space-y-1">
            {sessions.map((ev, idx) => (
              <div
                key={`${ev.unit}-${ev.date}-${ev.start}-${idx}`}
                onClick={() => onNavigate("/pst/planning")}
                className="flex items-center justify-between gap-2 p-2 rounded-xl border border-border/70 bg-card hover:bg-muted/70 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono font-bold text-[10px] shrink-0">
                    {ev.unit.toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold text-foreground truncate flex items-center gap-1.5">
                      <span>
                        {ev.day} {formatFrDate(ev.date)} ({ev.start}–{ev.end})
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        · {ev.type}
                      </span>
                    </div>
                    <div className="text-[11px] text-muted-foreground truncate flex items-center gap-1">
                      {ev.type === "COURS" ? (
                        <MapPin className="size-3 text-amber-600 shrink-0" />
                      ) : (
                        <Video className="size-3 text-teal-600 shrink-0" />
                      )}
                      <span>
                        {ev.type === "COURS"
                          ? `Cnam Bègles — ${ev.room ?? ""}`
                          : (ev.room ?? "ENF")}
                        {ev.teacher ? ` · ${ev.teacher}` : ""}
                      </span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Carnet d'Erreurs Actif */}
      {errors.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1.5">
            <ShieldAlert className="size-3" />
            <span>Erreurs de Quiz à Retravailler ({errors.length})</span>
          </span>
          <div className="space-y-0.5">
            {errors.map((err) => (
              <div
                key={err.id}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-rose-500/10 transition-colors group cursor-pointer border border-rose-500/20"
                onClick={() => onNavigate(`/pst/${err.modNum}/#errors`)}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300 shrink-0">
                    PST{err.modNum} · {err.type.toUpperCase()}
                  </span>
                  <div className="truncate">
                    <span className="font-semibold text-foreground text-xs block truncate">
                      {err.question}
                    </span>
                    <span className="text-[11px] text-muted-foreground truncate block">
                      Solution : {err.correctAnswer.replace(/<[^>]*>/g, "")}
                    </span>
                  </div>
                </div>
                <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-rose-500 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Textes & Ressources Officielles des Profs */}
      {resources.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1.5">
            <BookOpen className="size-3" />
            <span>Textes &amp; Ressources Profs ({resources.length})</span>
          </span>
          <div className="space-y-0.5">
            {resources.map((res) => (
              <div
                key={res.id}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-indigo-500/10 transition-colors group cursor-pointer border border-indigo-500/20"
                onClick={() => onNavigate(res.uPath)}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 shrink-0">
                    {res.mod}
                  </span>
                  <div className="truncate">
                    <span className="font-semibold text-foreground text-xs block truncate">
                      {res.title}
                    </span>
                    <span className="text-[11px] text-muted-foreground truncate block">
                      {res.authors} ({res.year}) · {res.keyTakeaway}
                    </span>
                  </div>
                </div>
                <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

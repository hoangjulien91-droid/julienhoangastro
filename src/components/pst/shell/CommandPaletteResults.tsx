"use client";

import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  MapPin,
  Palette,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Swords,
  Video,
} from "lucide-react";
import { formatFrDate } from "@/lib/pst/planning-stats";
import type { useCommandPaletteSearch } from "./useCommandPaletteSearch";

type SearchResults = ReturnType<typeof useCommandPaletteSearch>;

interface CommandPaletteResultsProps {
  results: SearchResults;
  onNavigate: (path: string) => void;
  onPushRoute: (path: string) => void;
  onClose: () => void;
  onOpenWorkshopSlideOver?: (moduleId: string) => void;
}

export function CommandPaletteResults({
  results,
  onNavigate,
  onPushRoute,
  onClose,
  onOpenWorkshopSlideOver,
}: CommandPaletteResultsProps) {
  const {
    matchedSessions,
    matchedErrors,
    matchedResources,
    matchedWorkshops,
    matchedAuthors,
    matchedConcepts,
    matchedGlossary,
    matchedDefinitions,
    matchedEssentiels,
    matchedSchemas,
    matchedDuels,
  } = results;

  return (
    <>
      {/* 0. Séances du Planning CNAM Bègles / ENF */}
      {matchedSessions.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            Séances Planning CNAM ({matchedSessions.length})
          </span>
          <div className="space-y-1">
            {matchedSessions.map((ev, idx) => (
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

      {/* 0. Carnet d'Erreurs Actif */}
      {matchedErrors.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1.5">
            <ShieldAlert className="size-3" />
            <span>Erreurs de Quiz à Retravailler ({matchedErrors.length})</span>
          </span>
          <div className="space-y-0.5">
            {matchedErrors.map((err) => (
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

      {/* 0 bis. Textes & Ressources Officielles des Profs */}
      {matchedResources.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1.5">
            <BookOpen className="size-3" />
            <span>Textes &amp; Ressources Profs ({matchedResources.length})</span>
          </span>
          <div className="space-y-0.5">
            {matchedResources.map((res) => (
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

      {/* 1. Ateliers PST */}
      {matchedWorkshops.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            Ateliers de Psychologie du Travail ({matchedWorkshops.length})
          </span>
          <div className="space-y-0.5">
            {matchedWorkshops.map((m) => (
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
      {matchedAuthors.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            Auteurs Fondamentaux
          </span>
          <div className="space-y-0.5">
            {matchedAuthors.map((a) => (
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
      {matchedConcepts.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            Ponts Conceptuels Transversaux ({matchedConcepts.length})
          </span>
          <div className="space-y-1">
            {matchedConcepts.map((p, idx) => (
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
      {matchedGlossary.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
            Glossaire Clinique ({matchedGlossary.length})
          </span>
          <div className="space-y-1">
            {matchedGlossary.map((g, idx) => (
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

      {/* Définitions Canoniques */}
      {matchedDefinitions.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center justify-between">
            <span>
              Définitions Canoniques Clés en Main ({matchedDefinitions.length})
            </span>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
              Critères 18/20
            </span>
          </span>
          <div className="space-y-1">
            {matchedDefinitions.map((d) => (
              <div
                key={d.id}
                onClick={() => {
                  onClose();
                  window.dispatchEvent(new CustomEvent("pst:open-definitions"));
                }}
                className="p-3 rounded-2xl border border-indigo-200/70 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/20 hover:border-indigo-400 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100 text-xs">
                    <ShieldCheck className="size-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>{d.terme}</span>
                    <span className="text-[10px] font-normal text-muted-foreground">
                      ({d.auteur})
                    </span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                    {d.modules.join(" · ").toUpperCase()}
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 m-0 line-clamp-2 italic font-serif">
                  « {d.definitionOfficielle} »
                </p>
                {d.motsClesObligatoires &&
                  d.motsClesObligatoires.length > 0 && (
                    <div className="flex items-center gap-1 flex-wrap mt-1.5">
                      <span className="text-[10px] font-bold text-slate-500">
                        Mots imposés :
                      </span>
                      {d.motsClesObligatoires.map((m, mIdx) => (
                        <span
                          key={mIdx}
                          className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-white/80 dark:bg-slate-800 text-indigo-800 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fiches L'Essentiel du Cours */}
      {matchedEssentiels.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center justify-between">
            <span>
              Fiches L&apos;Essentiel du Cours ({matchedEssentiels.length})
            </span>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
              Synthèse 18/20
            </span>
          </span>
          <div className="space-y-1">
            {matchedEssentiels.map((e) => (
              <div
                key={e.id}
                onClick={() => {
                  onClose();
                  const path = `/pst/${e.unitId.replace("pst", "")}/`;
                  onPushRoute(path);
                  if (e.seanceId && typeof window !== "undefined") {
                    setTimeout(() => {
                      window.dispatchEvent(
                        new CustomEvent("pst:select-seance", {
                          detail: { seanceId: e.seanceId },
                        }),
                      );
                    }, 150);
                  }
                }}
                className="p-3 rounded-2xl border border-amber-200/70 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 hover:border-amber-400 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100 text-xs">
                    <Sparkles className="size-3.5 text-amber-600 dark:text-amber-400" />
                    <span>{e.titre}</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                    {e.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 m-0 line-clamp-1 italic font-serif">
                  « {e.filConducteur} »
                </p>
                <div className="flex items-center gap-1 flex-wrap mt-1.5">
                  <span className="text-[10px] font-bold text-slate-500">
                    Concepts clés :
                  </span>
                  {e.conceptsCles.slice(0, 3).map((c, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-white/80 dark:bg-slate-800 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800"
                    >
                      {c.terme}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schémas & Matrices SVG */}
      {matchedSchemas.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center justify-between">
            <span>
              Schémas Vectoriels &amp; Matrices SVG ({matchedSchemas.length})
            </span>
            <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold">
              Mémoire Visuelle 18/20
            </span>
          </span>
          <div className="space-y-1">
            {matchedSchemas.map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  onClose();
                  window.dispatchEvent(
                    new CustomEvent("pst:open-schemas", {
                      detail: { schemaId: s.id, moduleKey: s.moduleKey },
                    }),
                  );
                }}
                className="p-3 rounded-2xl border border-cyan-200/70 dark:border-cyan-900/50 bg-cyan-50/40 dark:bg-cyan-950/20 hover:border-cyan-400 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100 text-xs">
                    <Palette className="size-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>{s.titre}</span>
                    <span className="text-[10px] font-normal text-muted-foreground">
                      ({s.auteur})
                    </span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300">
                    {s.moduleKey.toUpperCase()}
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 m-0 line-clamp-1 font-semibold text-cyan-800 dark:text-cyan-300">
                  ⚡ {s.formuleCle}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Match des Auteurs */}
      {matchedDuels.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center justify-between">
            <span>
              Match des Auteurs · Duels Dialectiques ({matchedDuels.length})
            </span>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
              1 vs 1
            </span>
          </span>
          <div className="space-y-1">
            {matchedDuels.map((m) => (
              <div
                key={m.id}
                onClick={() => {
                  onClose();
                  window.dispatchEvent(
                    new CustomEvent("pst:open-match-auteurs"),
                  );
                }}
                className="p-3 rounded-2xl border border-rose-200/70 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 hover:border-rose-400 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100 text-xs">
                    <Swords className="size-3.5 text-rose-600 dark:text-rose-400" />
                    <span>{m.titre}</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300">
                    {m.modules.join(" · ").toUpperCase()}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 m-0 line-clamp-1">
                  <b>Cas :</b> {m.situationTravailReel}
                </p>
                <p className="text-[11px] text-slate-800 dark:text-slate-200 m-0 line-clamp-2 mt-1">
                  <span className="text-amber-600 dark:text-amber-400 font-bold">
                    Synthèse d&apos;examen :{" "}
                  </span>
                  {m.syntheseDialectiqueExamen}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

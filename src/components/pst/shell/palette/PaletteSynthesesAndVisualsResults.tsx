"use client";

import { Palette, ShieldCheck, Sparkles, Swords } from "lucide-react";
import type { useCommandPaletteSearch } from "../useCommandPaletteSearch";

type SearchResults = ReturnType<typeof useCommandPaletteSearch>;

interface PaletteSynthesesAndVisualsResultsProps {
  definitions: SearchResults["matchedDefinitions"];
  essentiels: SearchResults["matchedEssentiels"];
  schemas: SearchResults["matchedSchemas"];
  duels: SearchResults["matchedDuels"];
  onClose: () => void;
  onPushRoute: (path: string) => void;
}

export function PaletteSynthesesAndVisualsResults({
  definitions,
  essentiels,
  schemas,
  duels,
  onClose,
  onPushRoute,
}: PaletteSynthesesAndVisualsResultsProps) {
  return (
    <>
      {/* Définitions Canoniques */}
      {definitions.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center justify-between">
            <span>
              Définitions Canoniques Clés en Main ({definitions.length})
            </span>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
              Critères 18/20
            </span>
          </span>
          <div className="space-y-1">
            {definitions.map((d) => (
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
      {essentiels.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center justify-between">
            <span>
              Fiches L&apos;Essentiel du Cours ({essentiels.length})
            </span>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
              Synthèse 18/20
            </span>
          </span>
          <div className="space-y-1">
            {essentiels.map((e) => (
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
      {schemas.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center justify-between">
            <span>
              Schémas Vectoriels &amp; Matrices SVG ({schemas.length})
            </span>
            <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold">
              Mémoire Visuelle 18/20
            </span>
          </span>
          <div className="space-y-1">
            {schemas.map((s) => (
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
      {duels.length > 0 && (
        <div className="space-y-1">
          <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center justify-between">
            <span>
              Match des Auteurs · Duels Dialectiques ({duels.length})
            </span>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
              1 vs 1
            </span>
          </span>
          <div className="space-y-1">
            {duels.map((m) => (
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

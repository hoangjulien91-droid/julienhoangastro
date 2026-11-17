"use client";

import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import type { SchemaMatrice } from "@/lib/pst/data/schemas-matrices";

interface GalerieCacheCacheViewProps {
  activeSchema: SchemaMatrice;
  testRevealed: Record<string, boolean>;
  onToggleReveal: (term: string) => void;
  onRevealAll: () => void;
  onHideAll: () => void;
}

export function GalerieCacheCacheView({
  activeSchema,
  testRevealed,
  onToggleReveal,
  onRevealAll,
  onHideAll,
}: GalerieCacheCacheViewProps) {
  return (
    <div className="p-4 sm:p-6 bg-card border border-border/70 rounded-3xl space-y-5 shadow-xs animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Entraînement Mémoire Visuelle : Retrouvez les Concepts Masqués
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Regardez le rôle de chaque composant et testez si vous êtes capable
            de restituer mentalement son nom officiel avant de cliquer pour vérifier.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRevealAll}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-card hover:bg-muted text-foreground border border-border/60 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-500" /> Tout révéler
          </button>
          <button
            onClick={onHideAll}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-card hover:bg-muted text-foreground border border-border/60 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <EyeOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Tout masquer
          </button>
        </div>
      </div>

      {/* Grille des cartes de test */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeSchema.elementsCles.map((el, idx) => {
          const isRevealed = !!testRevealed[el.terme];
          return (
            <div
              key={idx}
              onClick={() => onToggleReveal(el.terme)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer select-none space-y-2.5 ${
                isRevealed
                  ? "bg-emerald-500/5 border-emerald-500/40 shadow-xs"
                  : "bg-card border-border/70 hover:border-amber-500/50 hover:bg-muted/20 shadow-2xs"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Composant #{idx + 1} · {el.role}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isRevealed
                      ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30"
                      : "bg-muted text-muted-foreground border border-border/60"
                  }`}
                >
                  {isRevealed ? "Révélé" : "Masqué (Cliquer pour voir)"}
                </span>
              </div>

              {/* Indice / Explication du rôle */}
              <p className="text-xs text-muted-foreground leading-relaxed">
                {el.explication}
              </p>

              {/* Zone de réponse révélée ou masquée */}
              <div className="pt-2 border-t border-border/60">
                {isRevealed ? (
                  <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono animate-fadeIn flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{el.terme}</span>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-muted/50 border border-border/60 text-center text-xs font-mono text-muted-foreground italic">
                    •••••••••••••••••••• (Cliquer pour vérifier)
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

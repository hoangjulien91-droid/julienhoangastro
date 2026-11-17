"use client";

import { Compass } from "lucide-react";
import { PST123_OFFICIAL_RESOURCES } from "@/lib/pst/data/pst123";

interface Dashboard123ExtraCardsProps {
  onGoTab: (panel: string) => void;
}

export function Dashboard123ExtraCards({
  onGoTab,
}: Dashboard123ExtraCardsProps) {
  return (
    <>
      {/* Fil conducteur de l'examen Cnam PST123 */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-indigo-500/25 shadow-xs mb-4 space-y-2.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 inline-flex items-center gap-1.5 shadow-2xs">
            <Compass className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span>Fil conducteur de l&apos;examen Cnam</span>
          </span>
          <span className="text-[10px] font-mono font-semibold text-muted-foreground uppercase">
            PST123 · Le psychologue, le travail et l&apos;emploi
          </span>
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-serif font-bold tracking-tight text-foreground m-0">
            Double transaction (Dubar) → Cultures de métier (Sainsaulieu) →
            Indépendance déontologique
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed m-0">
            L&apos;identité professionnelle se négocie à l&apos;intersection du
            parcours biographique (identité pour soi) et de la reconnaissance
            relationnelle (identité pour autrui), exigeant du psychologue du
            travail l&apos;analyse de la demande et le respect absolu du secret
            professionnel (Code 2021).
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-emerald-500 shadow-xs mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1.5">
            <span>🎯 Mise en Situation Réelle</span>
          </span>
        </div>
        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 m-0">
          Révision active recommandée
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed m-0 font-medium">
          Entraîne-toi sur le <b>simulateur d&apos;examen blanc</b> ou lance une
          session de <b>récits interactifs</b>.
        </p>
        <div className="flex items-center gap-2.5 flex-wrap pt-1">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer active:scale-95"
            onClick={() => onGoTab("exam")}
          >
            Passer l&apos;Examen Blanc
          </button>
          <button
            type="button"
            className="inline-flex items-center px-3.5 py-2 rounded-full text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 shadow-2xs"
            onClick={() => onGoTab("recits")}
          >
            Récits interactifs
          </button>
          <button
            type="button"
            className="inline-flex items-center px-3.5 py-2 rounded-full text-xs font-mono font-semibold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-all cursor-pointer active:scale-95 shadow-2xs"
            onClick={() => onGoTab("ressources")}
          >
            Ressources &amp; Textes ({PST123_OFFICIAL_RESOURCES.length})
          </button>
          <button
            type="button"
            className="inline-flex items-center px-3.5 py-2 rounded-full text-xs font-mono font-bold bg-purple-600 hover:bg-purple-700 text-white transition-all cursor-pointer active:scale-95 shadow-2xs"
            onClick={() => onGoTab("matrice")}
          >
            Matrice Dubar &amp; Sainsaulieu ✦
          </button>
          <button
            type="button"
            className="inline-flex items-center px-3.5 py-2 rounded-full text-xs font-mono font-bold bg-indigo-700 hover:bg-indigo-800 text-white transition-all cursor-pointer active:scale-95 shadow-2xs"
            onClick={() => onGoTab("deonto")}
          >
            Tribunal Déonto (Loi 1985 &amp; Code 2021) ✦
          </button>
          <button
            type="button"
            className="inline-flex items-center px-3.5 py-2 rounded-full text-xs font-mono font-bold bg-purple-700 hover:bg-purple-800 text-white transition-all cursor-pointer active:scale-95 shadow-2xs"
            onClick={() => onGoTab("biographie")}
          >
            Récits de Vie (Bourdieu &amp; Hughes) ✦
          </button>
          <button
            type="button"
            className="inline-flex items-center px-3.5 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all cursor-pointer active:scale-95 shadow-2xs"
            onClick={() => onGoTab("ad")}
          >
            Activités Distantes (AD E. Lucy) ✦
          </button>
          <button
            type="button"
            className="inline-flex items-center px-3.5 py-2 rounded-full text-xs font-mono font-bold bg-amber-600 hover:bg-amber-700 text-white transition-all cursor-pointer active:scale-95 shadow-2xs"
            onClick={() => onGoTab("seances")}
          >
            Séances &amp; Cadrage (E. Lucy) ✦
          </button>
          <button
            type="button"
            className="inline-flex items-center px-3.5 py-2 rounded-full text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all cursor-pointer active:scale-95 shadow-2xs"
            onClick={() => onGoTab("schemas")}
          >
            <span>Galerie Visuelle (SVG) ✦</span>
          </button>
        </div>
      </div>
    </>
  );
}

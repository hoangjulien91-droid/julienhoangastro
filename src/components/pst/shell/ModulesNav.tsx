"use client";

import { useEffect, useState } from "react";
import { Link } from "@/components/common/Link";
import { Calendar, LayoutDashboard, GraduationCap, Zap, Swords, ShieldCheck, Printer, Flame, ShieldAlert, HeartHandshake, Layers, Headphones, History, Compass } from "lucide-react";
import { CnamLink, ThemeToggle } from "./ThemeToggle";
import { AnneauxRevisionPst } from "@/components/pst/study-tools/AnneauxRevisionPst";
import { MODULES as HUB_MODULES, moduleStats } from "@/lib/pst/hub-stats";

const MODULE_IDS = ["106", "108", "120", "123", "124"] as const;

interface ModulesNavProps {
  /** Onglet actif ("hub", "planning" ou "pst106"..."pst124"). */
  active?: string;
}

export function ModulesNav({ active }: ModulesNavProps) {
  const activeId = active?.replace("pst", "");
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  useEffect(() => {
    function refreshProgress() {
      const nextMap: Record<string, number> = {};
      HUB_MODULES.forEach((m) => {
        const stats = moduleStats(m);
        nextMap[m.id.replace("pst", "")] = stats.pctCards;
      });
      setProgressMap(nextMap);
    }

    refreshProgress();
    window.addEventListener("pst:storage-updated", refreshProgress);
    return () => window.removeEventListener("pst:storage-updated", refreshProgress);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full pt-1 sm:pt-2 pb-1.5 bg-background/90 dark:bg-slate-950/90 backdrop-blur-md transition-all">
      <nav
        className="modules-nav flex items-center justify-between gap-1.5 p-1.5 sm:p-2 md:p-2.5 rounded-2xl md:rounded-3xl w-full max-w-full md:max-w-5xl lg:max-w-fit mx-auto overflow-hidden md:overflow-visible bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 shadow-sm transition-all"
        aria-label="Sélection du module PST"
      >
        {/* Conteneur fluide horizontal unique sur mobile, scrollable sans scrollbar */}
        <div className="flex items-center gap-1.5 overflow-x-auto md:overflow-x-visible whitespace-nowrap scrollbar-none no-scrollbar w-full max-w-full md:max-w-5xl lg:max-w-fit py-0.5 scroll-smooth pr-4 sm:pr-2 md:pr-0">
        {/* Raccourci Poste de Pilotage & Planning en tête de ruban sur mobile */}
        <Link
          href="/pst/"
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all border shrink-0 active:scale-95 ${
            active === "hub"
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-2xs"
              : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200"
          }`}
          title="Poste de Pilotage PST"
        >
          <LayoutDashboard className="size-3.5 shrink-0" />
          <span>Pilotage</span>
        </Link>

        <Link
          href="/pst/planning/"
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all border shrink-0 active:scale-95 ${
            active === "planning"
              ? "bg-amber-600 text-white border-amber-600 shadow-2xs shadow-amber-600/30"
              : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200"
          }`}
          title="Planning officiel"
        >
          <Calendar className="size-3.5 shrink-0" />
          <span>Planning</span>
        </Link>

        {/* Séparateur vertical fin */}
        <span className="h-4 w-px bg-slate-300 dark:bg-slate-700 shrink-0 mx-0.5" />

        {/* Modules UE (106, 108, 120, 123, 124) */}
        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-0.5">
          <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
          UE :
        </span>
        {MODULE_IDS.map((id) => {
          const isCurrent = id === activeId;
          const pct = progressMap[id] ?? 0;
          return (
            <Link
              key={id}
              href={`/pst/${id}/`}
              title={`Atelier PST${id} — ${pct}% des fiches/cartes maîtrisées`}
              className={`text-xs px-2.5 py-1 rounded-xl font-bold transition-all shrink-0 border active:scale-95 flex flex-col items-center justify-center gap-0.5 ${
                isCurrent
                  ? "bg-amber-600 text-white border-amber-600 shadow-2xs shadow-amber-600/30 scale-[1.02]"
                  : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200/90 dark:hover:bg-slate-700"
              }`}
            >
              <div className="flex items-center gap-1 leading-none">
                <span>PST{id}</span>
                {/* Micro-indicateur d'état visuel */}
                <span
                  className={`size-1.5 rounded-full shrink-0 ${
                    pct >= 75
                      ? "bg-emerald-400 shadow-xs"
                      : pct > 20
                        ? "bg-amber-400 shadow-xs"
                        : "bg-slate-400/60 dark:bg-slate-500/60"
                  }`}
                  aria-label={`${pct}% maîtrisé`}
                />
              </div>

              {/* Micro barre de progression (1.5px) */}
              <div className="w-full h-[2px] bg-black/10 dark:bg-white/15 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isCurrent
                      ? "bg-white"
                      : pct >= 75
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                  }`}
                  style={{ width: `${Math.max(pct, 4)}%` }}
                />
              </div>
            </Link>
          );
        })}

        {/* Séparateur vertical fin */}
        <span className="h-4 w-px bg-slate-300 dark:bg-slate-700 shrink-0 mx-0.5" />

        {/* Outils d'Étude Rapide iOS */}
        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("pst:open-match-auteurs"));
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-900 dark:text-rose-200 border border-rose-500/25 hover:bg-rose-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
          title="Match des Auteurs (1 vs 1) - Duels Dialectiques"
        >
          <Swords className="size-3.5 text-rose-500 shrink-0" />
          <span>Duels 1v1</span>
        </button>

        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("pst:open-definitions"));
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-indigo-500/10 text-indigo-900 dark:text-indigo-200 border border-indigo-500/25 hover:bg-indigo-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
          title="Coffre des Définitions Clés (Critères 18/20)"
        >
          <ShieldCheck className="size-3.5 text-indigo-500 shrink-0" />
          <span>Définitions</span>
        </button>

        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(
              new CustomEvent("pst:open-fiche-poche", {
                detail: active && active.startsWith("pst") ? { module: active } : undefined,
              }),
            );
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 border border-emerald-500/25 hover:bg-emerald-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
          title="Fiche Mémo de Poche A4 (Imprimable)"
        >
          <Printer className="size-3.5 text-emerald-500 shrink-0" />
          <span>Mémo A4</span>
        </button>

        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("pst:open-speed-run"));
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/25 hover:bg-amber-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
          title="Sprint Chronométré 3 Min"
        >
          <Flame className="size-3.5 text-amber-500 shrink-0" />
          <span>Sprint 3m</span>
        </button>

        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("pst:open-detective"));
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-purple-500/10 text-purple-900 dark:text-purple-200 border border-purple-500/25 hover:bg-purple-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
          title="Détective des Pièges d'Examen"
        >
          <ShieldAlert className="size-3.5 text-purple-500 shrink-0" />
          <span>Pièges</span>
        </button>

        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("pst:open-sujets-dissertation"));
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-indigo-500/10 text-indigo-900 dark:text-indigo-200 border border-indigo-500/25 hover:bg-indigo-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
          title="Générateur de Sujets de Dissertation & Plans 18/20"
        >
          <GraduationCap className="size-3.5 text-indigo-500 shrink-0" />
          <span>Dissert</span>
        </button>

        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("pst:open-roleplay"));
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-teal-500/10 text-teal-900 dark:text-teal-200 border border-teal-500/25 hover:bg-teal-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
          title="Simulateur d'Entretien & Négociation IOD en Jeu de Rôle"
        >
          <HeartHandshake className="size-3.5 text-teal-500 shrink-0" />
          <span>Jeu Rôle</span>
        </button>

        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("pst:open-schemas"));
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-cyan-500/10 text-cyan-900 dark:text-cyan-200 border border-cyan-500/25 hover:bg-cyan-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
          title="Schémas Vectoriels & Matrices SVG 18/20 (Mémoire Visuelle)"
        >
          <Layers className="size-3.5 text-cyan-500 shrink-0" />
          <span>Schémas SVG</span>
        </button>

        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("pst:open-blind-test"));
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-violet-500/10 text-violet-900 dark:text-violet-200 border border-violet-500/25 hover:bg-violet-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
          title="Écoute Audio des Auteurs"
        >
          <Headphones className="size-3.5 text-violet-500 shrink-0" />
          <span>Écoute Audio</span>
        </button>

        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("pst:open-chronologie"));
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 border border-emerald-500/25 hover:bg-emerald-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
          title="Frise Historique & Généalogie des Théories (1880-2026)"
        >
          <History className="size-3.5 text-emerald-500 shrink-0" />
          <span>Frise</span>
        </button>

        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("pst:open-palais-memoire"));
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-purple-500/10 text-purple-900 dark:text-purple-200 border border-purple-500/25 hover:bg-purple-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
          title="Le Palais de la Mémoire Tri-Module 18/20 (PST 106-108-123)"
        >
          <Compass className="size-3.5 text-purple-500 shrink-0" />
          <span>Palais</span>
        </button>

        {/* Outils secondaires : RNCP 7, 30s, Recherche, Thème */}
        <Link
          href="/pst/#pyramide"
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all border shrink-0 active:scale-95 ${
            active === "pyramide"
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200"
          }`}
          title="Cursus RNCP 7 (Maquette pédagogique)"
        >
          <GraduationCap className="size-3.5 shrink-0" />
          <span>RNCP 7</span>
        </Link>

        <button
          type="button"
          onClick={() => {
            window.location.href = "/pst?open=pst:open-briefing-30s";
          }}
          className="flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/25 hover:bg-amber-500/20 cursor-pointer transition-all shrink-0 active:scale-95"
          title="Synthèse Tactique 30s"
        >
          <Zap className="size-3.5 text-amber-500 shrink-0" />
          <span>Synthèse 30s</span>
        </button>

        <div className="shrink-0 flex items-center gap-1.5 ml-auto">
          <AnneauxRevisionPst />
          <CnamLink />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  </header>
  );
}

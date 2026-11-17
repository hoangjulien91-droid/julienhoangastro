import {
  GraduationCap,
  Swords,
  ShieldCheck,
  Printer,
  Flame,
  ShieldAlert,
  HeartHandshake,
  Layers,
  Quote,
  History,
  Compass,
  Sparkles,
} from "lucide-react";
import type { PlanningUnitId } from "@/lib/pst/data/planning";
import {
  type UeId,
  UE_TOOLS_PROFILES,
  openExclusiveUeTool,
} from "@/lib/pst/data/outils-par-ue";

interface ModuleIntroToolsBarProps {
  unitId?: PlanningUnitId;
}

export function ModuleIntroToolsBar({ unitId }: ModuleIntroToolsBarProps) {
  return (
    <div className="relative mb-3.5">
      <div className="p-2 pr-8 sm:pr-2 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none text-xs shadow-2xs">
        {unitId && UE_TOOLS_PROFILES[unitId as UeId] && (
          <>
            <span className="text-[10px] font-mono uppercase tracking-wider font-black text-amber-700 dark:text-amber-400 shrink-0 pl-1">
              🎯 Exclusifs {unitId.toUpperCase()} :
            </span>
            {UE_TOOLS_PROFILES[unitId as UeId].exclusiveTools.map((tool) => (
              <button
                key={tool.id}
                type="button"
                onClick={() => openExclusiveUeTool(tool.ueId, tool.tabId)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-950 dark:text-amber-100 border border-amber-500/35 font-bold transition-all active:scale-95 cursor-pointer shrink-0 shadow-2xs"
                title={`${tool.name} (${tool.auteursRef})`}
              >
                <Sparkles className="size-3 text-amber-600 dark:text-amber-400" />
                <span>{tool.shortName}</span>
              </button>
            ))}
            <span className="h-4 w-px bg-slate-300 dark:bg-slate-700 shrink-0 mx-1" />
          </>
        )}
        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-600 dark:text-slate-400 shrink-0">
          Kit 18/20 :
        </span>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("pst:open-match-auteurs"))
          }
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-800 dark:text-rose-200 border border-rose-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Match des Auteurs (Duels Dialectiques 1 vs 1)"
        >
          <Swords className="size-3 text-rose-600 dark:text-rose-400" />
          <span>Match Auteurs 1v1</span>
        </button>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("pst:open-definitions"))
          }
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-800 dark:text-indigo-200 border border-indigo-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Coffre des Définitions Clés (Auto-Test 18/20)"
        >
          <ShieldCheck className="size-3 text-indigo-600 dark:text-indigo-400" />
          <span>Définitions 18/20</span>
        </button>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("pst:open-fiche-poche", {
                detail: unitId ? { module: unitId } : undefined,
              }),
            )
          }
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 border border-emerald-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Fiche Mémo de Poche A4 (Imprimable)"
        >
          <Printer className="size-3 text-emerald-600 dark:text-emerald-400" />
          <span>Mémo Poche A4</span>
        </button>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("pst:open-speed-run"))
          }
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-200 border border-amber-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Sprint Chronométré 3 Min"
        >
          <Flame className="size-3 text-amber-600 dark:text-amber-400" />
          <span>Sprint 3m</span>
        </button>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("pst:open-detective"))
          }
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-800 dark:text-purple-200 border border-purple-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Détective des Pièges d'Examen"
        >
          <ShieldAlert className="size-3 text-purple-600 dark:text-purple-400" />
          <span>Pièges 18/20</span>
        </button>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("pst:open-sujets-dissertation"),
            )
          }
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-800 dark:text-indigo-200 border border-indigo-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Générateur de Sujets de Dissertation & Plans Modèles 18/20"
        >
          <GraduationCap className="size-3 text-indigo-600 dark:text-indigo-400" />
          <span>Dissertation</span>
        </button>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("pst:open-roleplay"))
          }
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-500/10 hover:bg-teal-500/20 text-teal-800 dark:text-teal-200 border border-teal-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Simulateur d'Entretien & Négociation IOD en Jeu de Rôle"
        >
          <HeartHandshake className="size-3 text-teal-600 dark:text-teal-400" />
          <span>Jeu de Rôle</span>
        </button>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("pst:open-schemas"))
          }
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-800 dark:text-cyan-200 border border-cyan-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Schémas Vectoriels & Matrices SVG 18/20 (Mémoire Visuelle)"
        >
          <Layers className="size-3 text-cyan-600 dark:text-cyan-400" />
          <span>Schémas SVG</span>
        </button>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("pst:open-blind-test"))
          }
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/10 hover:bg-violet-500/20 text-violet-800 dark:text-violet-200 border border-violet-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Défi Citations Mystères & Blind-Test Auteurs"
        >
          <Quote className="size-3 text-violet-600 dark:text-violet-400" />
          <span>Citations Mystères</span>
        </button>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("pst:open-chronologie"))
          }
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 border border-emerald-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Frise Historique & Généalogie des Théories (1880-2026)"
        >
          <History className="size-3 text-emerald-600 dark:text-emerald-400" />
          <span>Frise Histoire</span>
        </button>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("pst:open-palais-memoire"))
          }
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-800 dark:text-purple-200 border border-purple-500/20 font-semibold transition-all active:scale-95 cursor-pointer shrink-0"
          title="Le Palais de la Mémoire Tri-Module 18/20 (PST 106-108-123)"
        >
          <Compass className="size-3 text-purple-600 dark:text-purple-400" />
          <span>Palais Mémoire</span>
        </button>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-px top-px bottom-px w-8 rounded-r-2xl bg-gradient-to-l from-white/95 dark:from-slate-900/95 to-transparent sm:hidden"
      />
    </div>
  );
}

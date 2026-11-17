"use client";

import { useMemo } from "react";
import {
  Sparkles,
  X,
  Layers,
  ShieldCheck,
  GraduationCap,
  FileSearch,
  CalendarCheck2,
  Quote,
  Timer,
  Mic,
} from "lucide-react";
import {
  type UeId,
  UE_ORDER,
  UE_TOOLS_PROFILES,
  openExclusiveUeTool,
} from "@/lib/pst/data/outils-par-ue";

const COLOR_CLASSES: Record<string, string> = {
  amber: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  rose: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  indigo: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
  blue: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  cyan: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
  purple: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
  emerald: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  teal: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
  violet: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
};

interface NavToolsDropdownProps {
  toolsUeFilter: UeId | "global";
  onSelectFilter: (filter: UeId | "global") => void;
  onClose: () => void;
}

export function NavToolsDropdown({
  toolsUeFilter,
  onSelectFilter,
  onClose,
}: NavToolsDropdownProps) {
  const activeProfile =
    toolsUeFilter !== "global" ? UE_TOOLS_PROFILES[toolsUeFilter] : null;

  const toolCategories = useMemo(
    () => [
      {
        name: "Méthodologie & Rédaction 18/20",
        tools: [
          {
            id: "schemas",
            name: "16 Schémas & Matrices Visuelles",
            badge: "Mémoire Visuelle",
            desc: "Matrices visuelles SVG mémorisables à redessiner",
            icon: Layers,
            color: "cyan",
            action: () =>
              window.dispatchEvent(new CustomEvent("pst:open-schemas")),
          },
          {
            id: "definitions",
            name: "Coffre des Définitions Clés",
            badge: "26 Canoniques",
            desc: "Définitions exactes au mot près pour l'examen",
            icon: ShieldCheck,
            color: "blue",
            action: () =>
              window.dispatchEvent(new CustomEvent("pst:open-definitions")),
          },
          {
            id: "dissertation",
            name: "Dissertation & Plans Modèles",
            badge: "Plans Types",
            desc: "Problématiques ciselées, plans en 2 parties & citations",
            icon: GraduationCap,
            color: "indigo",
            action: () =>
              window.dispatchEvent(
                new CustomEvent("pst:open-sujets-dissertation"),
              ),
          },
          {
            id: "correcteur-copie",
            name: "Correcteur Copie Cnam",
            badge: "Anti-Faute",
            desc: "Détection de la psychologisation & barème officiel",
            icon: FileSearch,
            color: "rose",
            action: () =>
              window.dispatchEvent(
                new CustomEvent("pst:open-correcteur-copie"),
              ),
          },
        ],
      },
      {
        name: "Entraînement & Pilotage d'Examen",
        tools: [
          {
            id: "tableau-ad",
            name: "Tableau de Bord des AD",
            badge: "13 Travaux",
            desc: "Cockpit unifié des activités distantes S1",
            icon: CalendarCheck2,
            color: "amber",
            action: () =>
              window.dispatchEvent(new CustomEvent("pst:open-tableau-ad")),
          },
          {
            id: "flash-citations-s1",
            name: "Flash-Citations S1",
            badge: "18 Citations",
            desc: "Citations mot à mot prêtes à placer dans la copie",
            icon: Quote,
            color: "purple",
            action: () =>
              window.dispatchEvent(
                new CustomEvent("pst:open-flash-citations-s1"),
              ),
          },
          {
            id: "exam-simulator",
            name: "Simulateur d'Examen Blanc",
            badge: "Chrono 2h00",
            desc: "Dissertation chronométrée & grille d'évaluation",
            icon: Timer,
            color: "teal",
            action: () =>
              window.dispatchEvent(new CustomEvent("pst:open-exam-simulator")),
          },
          {
            id: "oral-defense",
            name: "Soutenance Grand Jury RNCP 7",
            badge: "Oral 10 Min",
            desc: "Minuterie d'exposé & 35 questions pièges du jury",
            icon: Mic,
            color: "emerald",
            action: () =>
              window.dispatchEvent(new CustomEvent("pst:open-oral-defense")),
          },
        ],
      },
    ],
    [],
  );

  return (
    <div className="space-y-3">
      <div className="px-2 py-1.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="size-6 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
            <Sparkles className="size-3.5 text-amber-600 dark:text-amber-400" />
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 truncate">
            Outils 18/20 par UE
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300">
            {activeProfile ? activeProfile.code : "Transversal"}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Fermer le menu"
            title="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Sélecteur d'UE par PST (106 · 108 · 123 · 120 · 124 · Global) */}
      <div className="px-1">
        <div className="grid grid-cols-6 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80">
          {UE_ORDER.map((ue) => {
            const p = UE_TOOLS_PROFILES[ue];
            const isSelected = toolsUeFilter === ue;
            return (
              <button
                key={ue}
                type="button"
                onClick={() => onSelectFilter(ue)}
                className={`py-1 rounded-lg text-[10px] font-mono font-black transition-all cursor-pointer ${
                  isSelected
                    ? "bg-amber-500 text-white shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title={`Outils dédiés ${p.code} (${p.teacher})`}
              >
                {p.shortCode}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => onSelectFilter("global")}
            className={`py-1 rounded-lg text-[10px] font-mono font-black transition-all cursor-pointer ${
              toolsUeFilter === "global"
                ? "bg-indigo-600 text-white shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
            title="Outils transversaux inter-modules"
          >
            Tous
          </button>
        </div>
      </div>

      {activeProfile ? (
        <>
          {/* Étage 1 : Outils & Simulateurs Exclusifs de l'UE */}
          <div className="space-y-1">
            <div className="px-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <span>🎯 Exclusif {activeProfile.code}</span>
              <span className="font-mono text-[10px] opacity-85 truncate max-w-[170px]">
                {activeProfile.teacher}
              </span>
            </div>
            <div className="space-y-1">
              {activeProfile.exclusiveTools.map((tool) => (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    openExclusiveUeTool(tool.ueId, tool.tabId);
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-amber-500/[0.06] hover:bg-amber-500/15 border border-amber-500/20 hover:border-amber-500/40 transition-all text-left group cursor-pointer active:scale-98"
                >
                  <div
                    className={`size-7 rounded-lg ${
                      COLOR_CLASSES[tool.color] ??
                      "bg-amber-500/15 text-amber-500"
                    } flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 font-mono text-[10px] font-black`}
                  >
                    {activeProfile.shortCode}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate text-xs">
                        {tool.shortName}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300 shrink-0">
                        {tool.badge}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-600 dark:text-slate-300 truncate">
                      {tool.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Étage 2 : Kit Examen 18/20 pré-filtré sur cette UE */}
          <div className="space-y-1 pt-1 border-t border-slate-100 dark:border-slate-800">
            <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              🏆 Kit Examen 18/20 ciblé {activeProfile.code}
            </div>
            <div className="grid grid-cols-2 gap-1">
              {activeProfile.quickExamTools.map((qt) => (
                <button
                  key={qt.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    window.dispatchEvent(
                      new CustomEvent(qt.eventName, {
                        detail: { module: activeProfile.ueId },
                      }),
                    );
                  }}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700/70 text-left transition-all cursor-pointer active:scale-98 group"
                >
                  <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 truncate">
                    {qt.badge}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {qt.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Vue Globale : Catégories transversales */
        <div className="space-y-2.5">
          {toolCategories.map((cat, idx) => (
            <div
              key={idx}
              className={
                idx > 0
                  ? "pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1"
                  : "space-y-1"
              }
            >
              <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {cat.name}
              </div>
              <div className="grid grid-cols-1 gap-1">
                {cat.tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => {
                        onClose();
                        tool.action();
                      }}
                      className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all text-left group cursor-pointer active:scale-98"
                    >
                      <div
                        className={`size-7 rounded-lg ${
                          COLOR_CLASSES[tool.color] ??
                          "bg-amber-500/15 text-amber-500"
                        } flex items-center justify-center shrink-0 transition-transform group-hover:scale-105`}
                      >
                        <Icon className="size-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate text-xs">
                            {tool.name}
                          </span>
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                            {tool.badge}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {tool.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
} from "@/lib/pst/data/outils-par-ue";
import { NavToolsUeProfileView } from "./NavToolsUeProfileView";
import { NavToolsGlobalCategoriesView } from "./NavToolsGlobalCategoriesView";

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
        <NavToolsUeProfileView
          activeProfile={activeProfile}
          onClose={onClose}
        />
      ) : (
        <NavToolsGlobalCategoriesView
          toolCategories={toolCategories}
          onClose={onClose}
        />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Layers,
  ShieldCheck,
  GraduationCap,
  Printer,
  Wrench,
  Target,
} from "lucide-react";
import {
  type UeId,
  UE_ORDER,
  UE_TOOLS_PROFILES,
  openExclusiveUeTool,
} from "@/lib/pst/data/outils-par-ue";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";

interface EncartOutilsExclusifsUeProps {
  unitId: UeId;
  allowUeSwitch?: boolean;
  compact?: boolean;
}

const COLOR_BADGE_MAP: Record<string, string> = {
  amber:
    "bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-500/30",
  indigo:
    "bg-indigo-500/15 text-indigo-900 dark:text-indigo-200 border-indigo-500/30",
  emerald:
    "bg-emerald-500/15 text-emerald-900 dark:text-emerald-200 border-emerald-500/30",
  rose: "bg-rose-500/15 text-rose-900 dark:text-rose-200 border-rose-500/30",
  cyan: "bg-cyan-500/15 text-cyan-900 dark:text-cyan-200 border-cyan-500/30",
  purple:
    "bg-purple-500/15 text-purple-900 dark:text-purple-200 border-purple-500/30",
  teal: "bg-teal-500/15 text-teal-900 dark:text-teal-200 border-teal-500/30",
  blue: "bg-blue-500/15 text-blue-900 dark:text-blue-200 border-blue-500/30",
};

const QUICK_ICON_MAP: Record<string, typeof Layers> = {
  "pst:open-schemas": Layers,
  "pst:open-definitions": ShieldCheck,
  "pst:open-sujets-dissertation": GraduationCap,
  "pst:open-fiche-poche": Printer,
};

export function EncartOutilsExclusifsUe({
  unitId,
  allowUeSwitch = false,
  compact = false,
}: EncartOutilsExclusifsUeProps) {
  const [selectedUe, setSelectedUe] = useState<UeId>(unitId);
  const profile = UE_TOOLS_PROFILES[selectedUe] ?? UE_TOOLS_PROFILES.pst106;

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-500/[0.07] via-card to-indigo-500/[0.06] border border-amber-500/30 shadow-xs space-y-4">
      {/* Header avec sélecteur d'UE optionnel */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-amber-500 text-white shadow-2xs">
              <Sparkles className="size-3" />
              <span>Arsenal 18/20 Dédié · {profile.code}</span>
            </span>
            <span className="text-[11px] font-mono font-semibold text-muted-foreground">
              {profile.teacher} · {profile.semester}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-serif font-bold text-foreground m-0">
            Outils &amp; Simulateurs Exclusifs {profile.code} — {profile.title}
          </h3>
        </div>

        {allowUeSwitch && (
          <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/60 border border-border/60 overflow-x-auto scrollbar-none">
            {UE_ORDER.map((ue) => {
              const p = UE_TOOLS_PROFILES[ue];
              const isActive = ue === selectedUe;
              return (
                <button
                  key={ue}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    triggerHaptic("selection");
                    setSelectedUe(ue);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-amber-500 text-white shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p.code}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Grille des Outils Exclusifs de l'UE */}
      <div
        className={`grid grid-cols-1 ${
          compact ? "sm:grid-cols-2" : "md:grid-cols-2"
        } gap-3`}
      >
        {profile.exclusiveTools.map((tool) => (
          <button
            key={tool.id}
            type="button"
            onClick={() => {
              playClickSound();
              triggerHaptic("selection");
              openExclusiveUeTool(tool.ueId, tool.tabId);
            }}
            className="group p-3.5 sm:p-4 rounded-2xl bg-card/90 hover:bg-card border border-border/80 hover:border-amber-500/50 text-left transition-all shadow-2xs hover:shadow-md flex flex-col justify-between gap-2.5 cursor-pointer active:scale-[0.99]"
          >
            <div className="space-y-1.5 w-full">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                    COLOR_BADGE_MAP[tool.color] ?? COLOR_BADGE_MAP.amber
                  }`}
                >
                  <Wrench className="size-2.5" />
                  <span>{tool.badge}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Ouvrir l&apos;outil</span>
                  <ArrowRight className="size-3.5" />
                </span>
              </div>

              <div className="text-xs sm:text-sm font-bold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {tool.name}
              </div>

              <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed m-0 line-clamp-2">
                {tool.desc}
              </p>
            </div>

            <div className="pt-2 border-t border-border/50 w-full flex items-center justify-between gap-2 text-[10px] font-mono text-muted-foreground">
              <span className="truncate"> Repères : {tool.auteursRef}</span>
              <span className="uppercase font-bold text-foreground/70 shrink-0">
                #{tool.tabId}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Barre des Outils d'Examen 18/20 pré-filtrés sur cette UE */}
      <div className="pt-2 border-t border-border/60 space-y-2">
        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
          <Target className="size-3.5 text-amber-500" />
          <span>
            Kit d&apos;Examen 18/20 pré-filtré sur {profile.code} :
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {profile.quickExamTools.map((qt) => {
            const Icon = QUICK_ICON_MAP[qt.eventName] ?? Sparkles;
            return (
              <button
                key={qt.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  triggerHaptic("selection");
                  window.dispatchEvent(
                    new CustomEvent(qt.eventName, {
                      detail: { module: profile.ueId },
                    }),
                  );
                }}
                className="p-2.5 rounded-xl bg-muted/40 hover:bg-amber-500/10 border border-border/70 hover:border-amber-500/40 text-left transition-all flex items-center gap-2.5 cursor-pointer active:scale-98 group"
              >
                <div
                  className={`size-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    COLOR_BADGE_MAP[qt.color] ?? COLOR_BADGE_MAP.amber
                  }`}
                >
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-foreground group-hover:text-amber-700 dark:group-hover:text-amber-300 truncate">
                    {qt.badge}
                  </div>
                  <div className="text-[10px] text-muted-foreground truncate">
                    {qt.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  Target,
  AlertTriangle,
  CheckCircle2,
  X,
  Zap,
  Quote,
} from "lucide-react";
import { playClickSound, triggerHaptic } from "@/lib/pst/audio-feedback";
import { BRIEFINGS } from "@/lib/pst/data/briefing-30s-data";

interface Briefing30sProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

export function PstBriefing30sModal({
  isOpen,
  onClose,
  defaultModule = "PST106",
}: Briefing30sProps) {
  const normModule = defaultModule?.toUpperCase();
  const initialUe =
    normModule && BRIEFINGS[normModule] ? normModule : "PST106";
  const [selectedUe, setSelectedUe] = useState<string>(initialUe);

  useEffect(() => {
    if (defaultModule) {
      const norm = defaultModule.toUpperCase();
      if (BRIEFINGS[norm]) setSelectedUe(norm);
    }
  }, [defaultModule, isOpen]);

  useEffect(() => {
    const handleEvent = (e: Event) => {
      const targetMod = (e as CustomEvent)?.detail?.module;
      if (targetMod) {
        const norm = String(targetMod).toUpperCase();
        if (BRIEFINGS[norm]) setSelectedUe(norm);
      }
    };
    window.addEventListener("pst:open-briefing-30s", handleEvent);
    return () =>
      window.removeEventListener("pst:open-briefing-30s", handleEvent);
  }, []);

  if (!isOpen) return null;

  const data = BRIEFINGS[selectedUe] || BRIEFINGS.PST106;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Synthèse Flash 30 Secondes"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div
        className="relative w-full max-w-2xl max-h-[92vh] bg-card text-foreground border border-border border-t-4 border-t-accent rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-3.5 sm:px-6 border-b border-border bg-muted/20 flex items-center justify-between gap-2.5 sm:gap-3 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 sm:size-9 rounded-xl bg-accent text-accent-foreground flex items-center justify-center shadow-xs shrink-0">
              <Zap className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="text-xs sm:text-base font-serif font-bold text-foreground m-0 truncate">
                  Briefing Tactique 30s
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-accent/15 text-accent border border-accent/25 shrink-0">
                  Haute Visibilité Jour J
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground m-0 font-mono truncate">
                {data.ue} · {data.title}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer shrink-0"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* UE Selector Pills */}
        <div className="px-3.5 sm:px-6 py-2 border-b border-border/70 bg-background flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none shrink-0">
          {Object.keys(BRIEFINGS).map((ue) => (
            <button
              key={ue}
              type="button"
              onClick={() => {
                triggerHaptic("selection");
                playClickSound();
                setSelectedUe(ue);
              }}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                selectedUe === ue
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {ue}
            </button>
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 text-xs flex-1">
          {/* 1. Thèse Centrale */}
          <div className="p-4 rounded-xl border border-accent/30 bg-accent/5 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-accent flex items-center gap-1.5">
              <Target className="size-3.5" />
              <span>1. Thèse Centrale à défendre dès l'introduction :</span>
            </span>
            <p className="text-foreground text-xs sm:text-[13px] font-serif font-semibold leading-relaxed m-0">
              {data.theseCentrale}
            </p>
          </div>

          {/* 2. Concepts Clés (Grid 2x2) */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-muted-foreground block">
              2. Les 4 Concepts Discriminants :
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {data.conceptsCles.map((c) => (
                <div
                  key={c.terme}
                  className="p-3 rounded-xl border border-border bg-background space-y-0.5"
                >
                  <span className="font-bold text-foreground text-xs block">
                    {c.terme}
                  </span>
                  <span className="text-[11px] text-muted-foreground leading-snug block">
                    {c.def}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Les 3 Citations Imparables */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-muted-foreground block">
              3. Citations Piliers pour la Copie :
            </span>
            <div className="space-y-2">
              {data.citations.map((cit, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl border border-border bg-card flex items-start gap-2.5"
                >
                  <Quote className="size-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono font-bold text-[11px] text-accent block">
                      {cit.auteur}
                    </span>
                    <p className="text-foreground font-serif italic text-xs m-0 mt-0.5 leading-relaxed">
                      « {cit.texte} »
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Erreur Éliminatoire */}
          <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-900 dark:text-rose-200 flex items-start gap-2.5">
            <AlertTriangle className="size-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-xs block">
                Piège Éliminatoire à bannir absolument :
              </span>
              <p className="text-[11px] m-0 mt-0.5 leading-relaxed">
                {data.erreurFatale}
              </p>
            </div>
          </div>

          {/* 5. Checklist de relecture */}
          <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-foreground block">
              Checklist de contrôle avant remise de la copie :
            </span>
            <ul className="space-y-1.5 m-0 pl-0 list-none">
              {data.checklist.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/10 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Prêt pour l'épreuve
          </button>
        </div>
      </div>
    </div>
  );
}

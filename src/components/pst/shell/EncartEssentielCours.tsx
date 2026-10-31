"use client";

import { useState } from "react";
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  Users,
  KeyRound,
  AlertTriangle,
  ListChecks,
} from "lucide-react";
import type { EssentielCoursCard } from "@/lib/pst/data/essentiel-cours";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface EncartEssentielCoursProps {
  cards: EssentielCoursCard[];
  initialCardId?: string;
  /** Optional detailed executive summary bullets (for SeancesCoursPanel toggle) */
  detailBullets?: string[];
  compact?: boolean;
}

export function EncartEssentielCours({
  cards,
  initialCardId,
  detailBullets,
  compact = false,
}: EncartEssentielCoursProps) {
  const [selectedId, setSelectedId] = useState<string>(
    initialCardId ?? cards[0]?.id ?? "",
  );
  const [viewMode, setViewMode] = useState<"essentiel" | "detail">("essentiel");

  const activeCard =
    cards.find((c) => c.id === selectedId) ?? cards[0] ?? null;

  if (!activeCard) return null;

  return (
    <div
      className={`rounded-3xl bg-gradient-to-br from-amber-500/[0.07] via-card to-indigo-500/[0.05] border border-amber-500/30 shadow-xs ${
        compact ? "p-4 sm:p-5 space-y-3.5" : "p-5 sm:p-6 space-y-4"
      }`}
    >
      {/* En-tête de l'encart + sélecteur de cours ou mode */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-border/60">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/35">
              <Sparkles className="size-3 text-amber-600 dark:text-amber-400" />
              <span>Fiche L&apos;Essentiel</span>
            </span>
            <span className="text-[11px] font-mono font-semibold text-muted-foreground">
              {activeCard.badge}
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-serif font-bold text-foreground leading-snug">
            {activeCard.titre}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap self-start sm:self-auto">
          {cards.length > 1 && (
            <div className="inline-flex items-center p-1 rounded-xl bg-muted/70 border border-border/60 gap-1 flex-wrap">
              {cards.map((c) => {
                const isSelected = c.id === activeCard.id;
                const shortLabel = c.coursNum
                  ? `Cours ${c.coursNum}`
                  : "Synthèse UE";
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setSelectedId(c.id);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-amber-600 text-white shadow-2xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {shortLabel}
                  </button>
                );
              })}
            </div>
          )}

          {detailBullets && detailBullets.length > 0 && (
            <div className="inline-flex items-center p-1 rounded-xl bg-muted/70 border border-border/60 gap-1">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setViewMode("essentiel");
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === "essentiel"
                    ? "bg-amber-600 text-white shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="size-3" />
                <span>L&apos;Essentiel</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setViewMode("detail");
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === "detail"
                    ? "bg-amber-600 text-white shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ListChecks className="size-3" />
                <span>Détail ({detailBullets.length})</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {viewMode === "detail" && detailBullets ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-foreground/90 leading-relaxed">
          {detailBullets.map((pt, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 bg-card/85 p-3 rounded-2xl border border-border/50 shadow-2xs"
            >
              <span className="text-amber-500 font-bold mt-0.5">•</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      ) : (
        <>
          {/* Thèse / Fil conducteur */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-card/90 border border-amber-500/25 text-xs sm:text-sm text-foreground leading-relaxed flex items-start gap-2.5 shadow-2xs">
            <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider shrink-0 mt-0.5">
              Fil directeur
            </span>
            <p className="m-0 font-medium">{activeCard.filConducteur}</p>
          </div>

          {/* Grille 2 colonnes : Ce qu'il faut savoir vs Ce qu'il faut retenir */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs">
            {/* 1. Ce qu'il faut savoir */}
            <div className="p-4 rounded-2xl bg-card/85 border border-border/60 space-y-2.5 shadow-2xs">
              <div className="font-bold uppercase tracking-wider text-[11px] text-sky-800 dark:text-sky-300 flex items-center gap-1.5">
                <BookOpen className="size-3.5 text-sky-500 shrink-0" />
                <span>1. Ce qu&apos;il faut savoir (Comprendre le cours)</span>
              </div>
              <ul className="space-y-2 text-foreground/90 leading-relaxed pl-0 list-none m-0">
                {activeCard.ceQuIlFautSavoir.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="size-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Ce qu'il faut retenir */}
            <div className="p-4 rounded-2xl bg-card/85 border border-amber-500/30 space-y-2.5 shadow-2xs">
              <div className="font-bold uppercase tracking-wider text-[11px] text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-amber-500 shrink-0" />
                <span>2. Ce qu&apos;il faut retenir (À placer en copie)</span>
              </div>
              <ul className="space-y-2 text-foreground/90 leading-relaxed pl-0 list-none m-0">
                {activeCard.ceQuIlFautRetenir.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold shrink-0">→</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Grille 2 colonnes : Auteurs clés & Concepts clés */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs">
            {/* 3. Auteurs clés */}
            <div className="p-4 rounded-2xl bg-card/85 border border-border/60 space-y-2.5 shadow-2xs">
              <div className="font-bold uppercase tracking-wider text-[11px] text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                <Users className="size-3.5 text-indigo-500 shrink-0" />
                <span>
                  3. Auteurs incontournables ({activeCard.auteursCles.length})
                </span>
              </div>
              <div className="space-y-1.5">
                {activeCard.auteursCles.map((a, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-xl bg-muted/40 border border-border/40 leading-snug"
                  >
                    <strong className="text-indigo-800 dark:text-indigo-300 font-semibold">
                      {a.nom}
                    </strong>{" "}
                    <span className="text-muted-foreground">—</span>{" "}
                    <span className="text-foreground/85">{a.apport}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Concepts clés */}
            <div className="p-4 rounded-2xl bg-card/85 border border-border/60 space-y-2.5 shadow-2xs">
              <div className="font-bold uppercase tracking-wider text-[11px] text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                <KeyRound className="size-3.5 text-emerald-500 shrink-0" />
                <span>
                  4. Concepts &amp; Notions clés ({activeCard.conceptsCles.length})
                </span>
              </div>
              <div className="space-y-1.5">
                {activeCard.conceptsCles.map((c, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-xl bg-muted/40 border border-border/40 leading-snug"
                  >
                    <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-900 dark:text-emerald-200 font-mono text-[10px] font-bold mr-1.5 border border-emerald-500/25">
                      {c.terme}
                    </span>
                    <span className="text-foreground/85">
                      {c.definitionCourte}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Point de vigilance examen */}
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-xs text-rose-950 dark:text-rose-200 flex items-start gap-2">
            <AlertTriangle className="size-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Piège d&apos;examen à éviter : </strong>
              <span>{activeCard.piegeExamen}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

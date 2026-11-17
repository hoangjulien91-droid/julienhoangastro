"use client";

import React from "react";
import type { FicheItem } from "@/lib/pst/types";
import { SmartBridgeBadge } from "@/components/pst/bridges/SmartBridgeBadge";
import { findCapsuleForFiche, findSchemaForFiche } from "@/lib/pst/data/fiches-helpers";
import { playClickSound } from "@/lib/pst/audio-feedback";
import {
  Zap,
  Palette,
  Eye,
  Star,
} from "lucide-react";

export interface FicheCardProps {
  f: FicheItem;
  i: number;
  forceOpen?: boolean;
  isOpen: boolean;
  onToggleOpen: (open: boolean) => void;
  isMastered: boolean;
  onToggleMastery: () => void;
  isFav: boolean;
  onToggleFav: () => void;
  noteVal: string;
  onUpdateNote: (text: string) => void;
  isBlurred: boolean;
  onRevealBlur: () => void;
  maskKeywords: boolean;
  onExportToJournal: () => void;
  isExported: boolean;
}

export function FicheCard({
  f,
  i,
  forceOpen = false,
  isOpen,
  onToggleOpen,
  isMastered,
  onToggleMastery,
  isFav,
  onToggleFav,
  noteVal,
  onUpdateNote,
  isBlurred,
  onRevealBlur,
  maskKeywords,
  onExportToJournal,
  isExported,
}: FicheCardProps) {
  const capsule = findCapsuleForFiche(f);
  const matchedSchemaId = findSchemaForFiche(f);
  const wordCount = (f.ess + " " + f.ph + " " + f.ex + " " + f.trap)
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/).length;
  const readMinutes = Math.max(1, Math.round(wordCount / 140));

  const processedEss = maskKeywords
    ? f.ess.replace(
        /<(b|strong)>([\s\S]*?)<\/\1>/gi,
        '<span class="px-1 rounded bg-amber-500/20 text-transparent hover:text-inherit active:text-inherit select-none hover:select-auto transition-colors cursor-pointer border-b border-dashed border-amber-500/60" title="Survoler ou toucher pour révéler le mot-clé">$2</span>',
      )
    : f.ess;

  return (
    <details
      id={`fiche-card-${i}`}
      className={`fcard${isMastered ? " mastered" : ""}`}
      style={{ borderLeftColor: `var(--${f.a})` }}
      open={forceOpen || isOpen}
      onToggle={(e) => {
        if (forceOpen) return;
        const nextOpen = (e.target as HTMLDetailsElement).open;
        onToggleOpen(nextOpen);
      }}
    >
      <summary className="flex items-center gap-2">
        <span
          className="dot shrink-0"
          style={{ background: `var(--${f.a})` }}
        />
        <span className="ttl">{f.t}</span>
        {(f.cours === 3 || f.t.includes("Cours 3")) && (
          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-900 dark:text-amber-200 text-[10px] font-bold border border-amber-500/35 shrink-0">
            ✨ Cours 3 (28 oct)
          </span>
        )}
        {(f.cours === 2 || f.t.includes("Cours 2")) && (
          <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 text-[10px] font-semibold border border-indigo-500/25 shrink-0">
            Cours 2
          </span>
        )}
        {(f.cours === 1 || f.t.includes("Cours 1")) && (
          <span className="px-2 py-0.5 rounded-full bg-slate-500/15 text-slate-800 dark:text-slate-300 text-[10px] font-semibold border border-slate-500/25 shrink-0">
            Cours 1
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFav();
          }}
          className={`p-1 rounded-md transition-colors cursor-pointer shrink-0 ${
            isFav
              ? "text-amber-500 hover:bg-amber-500/10"
              : "text-slate-400 hover:text-amber-500 hover:bg-amber-500/10"
          }`}
          title="Épingler cette fiche en favori ⭐"
        >
          <Star
            className={`size-3.5 ${
              isFav ? "fill-amber-400 text-amber-500" : ""
            }`}
          />
        </button>
        <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono text-[10px] shrink-0">
          ~{readMinutes} min
        </span>
        {isMastered && (
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
            ✓ Maîtrisée
          </span>
        )}
        {noteVal.trim() && (
          <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300 text-[10px] font-semibold">
            Note
          </span>
        )}
        <SmartBridgeBadge conceptQuery={f.t} />
        <span className="arrow ml-auto">▼</span>
      </summary>

      <div className="fbody">
        <div
          onClick={() => {
            if (isBlurred) {
              playClickSound();
              onRevealBlur();
            }
          }}
          style={
            isBlurred
              ? {
                  filter: "blur(6px)",
                  cursor: "pointer",
                  userSelect: "none",
                  transition: "filter 0.2s ease",
                }
              : { transition: "filter 0.2s ease" }
          }
          title={
            isBlurred
              ? "Cliquer pour révéler la synthèse (Mode Auto-Test actif)"
              : undefined
          }
        >
          {/* 1. BLOC SYNTHÈSE & FORMULE MATRICE */}
          <div className="space-y-3">
            <div className="p-3 sm:p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-xs sm:text-sm font-semibold text-amber-950 dark:text-amber-100 flex items-start gap-2.5 shadow-2xs">
              <span className="p-1 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0 mt-0.5">
                💡
              </span>
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                  Formule Clé d&apos;Examen :
                </span>
                <span className="leading-snug block">{f.ph}</span>
              </div>
            </div>

            <div
              className="ess text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200"
              dangerouslySetInnerHTML={{ __html: processedEss }}
            />
          </div>
        </div>

        {isBlurred && (
          <button
            type="button"
            className="btn small my-1.5 text-[11px]"
            onClick={() => {
              playClickSound();
              onRevealBlur();
            }}
          >
            Révéler la synthèse et la formule clé
          </button>
        )}

        {/* 2. BLOC ÉPREUVE : EXEMPLE & PIÈGE D'EXAMEN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 text-xs space-y-1">
            <span className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
              <span>🔎</span>
              <span>Cas d&apos;illustration clinique :</span>
            </span>
            <p className="m-0 text-slate-700 dark:text-slate-300 leading-relaxed">
              {f.ex}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/40 text-xs space-y-1">
            <span className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <span>⚠️</span>
              <span>Piège d&apos;examen classique :</span>
            </span>
            <p className="m-0 text-slate-700 dark:text-slate-300 leading-relaxed">
              {f.trap}
            </p>
          </div>
        </div>

        {/* Capsule Feynman 60s - iOS Glass Card */}
        <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 border border-indigo-500/20 dark:border-indigo-400/20 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Capsule Feynman 60s</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-500/15 text-indigo-800 dark:text-indigo-200">
              {capsule.auteur}
            </span>
          </div>

          <div className="text-xs leading-relaxed text-slate-800 dark:text-slate-200 space-y-1.5">
            <p>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                💡 Intuition :{" "}
              </span>
              {capsule.intuitionMetaphore}
            </p>
            {capsule.motsObligatoires && capsule.motsObligatoires.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Mots clés 18/20 :
                </span>
                {capsule.motsObligatoires.map((kw, kwIdx) => (
                  <span
                    key={kwIdx}
                    className="px-1.5 py-0.5 rounded-md bg-white/70 dark:bg-slate-800/80 border border-indigo-200 dark:border-indigo-800 text-[10px] font-semibold text-indigo-800 dark:text-indigo-200"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {matchedSchemaId && (
          <div className="mt-2.5 p-3 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-blue-500/10 border border-cyan-500/25 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                <Palette className="size-4" />
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <span>Schéma Vectoriel SVG Disponible</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-800 dark:text-cyan-200 font-extrabold uppercase">
                    18/20
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 m-0">
                  Modèle graphique canonique interactif pour mémoire visuelle
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                playClickSound();
                window.dispatchEvent(
                  new CustomEvent("pst:open-schemas", {
                    detail: { schemaId: matchedSchemaId },
                  }),
                );
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm transition-all active:scale-95 cursor-pointer"
              title="Ouvrir le schéma vectoriel haute définition"
            >
              <Eye className="size-3.5" />
              <span>Voir le Schéma SVG</span>
            </button>
          </div>
        )}

        {/* 3. BLOC ACTIONS & MÉMO DE TERRAIN */}
        <div className="mt-3 pt-3 border-t border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <input
            type="text"
            aria-label="Ajouter un mémo personnel ou exemple de terrain"
            value={noteVal}
            onChange={(e) => onUpdateNote(e.target.value)}
            placeholder="Ajouter un mémo personnel ou exemple de terrain..."
            className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 focus:outline-none"
          />
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              type="button"
              onClick={onExportToJournal}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all flex items-center gap-1 cursor-pointer min-h-[36px]"
              title="Envoyer cette fiche et votre mémo dans le Carnet de Terrain"
            >
              <span>{isExported ? "✓ Au carnet" : "→ Carnet"}</span>
            </button>
            <button
              type="button"
              onClick={onToggleMastery}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[36px] ${
                isMastered
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90"
              }`}
            >
              {isMastered ? "✓ Maîtrisée" : "Marquer maîtrisée"}
            </button>
          </div>
        </div>
      </div>
    </details>
  );
}

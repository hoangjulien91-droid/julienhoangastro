"use client";

import React from "react";
import { Copy, Sparkles } from "lucide-react";
import { PACAUD_TELEPHONISTES_SUMMARY } from "@/lib/pst/data/pst106-ad";

export interface Ad106Ad3PacaudSectionProps {
  onCopy: (text: string, key: string) => void;
  copiedSection: string | null;
}

export function Ad106Ad3PacaudSection({
  onCopy,
  copiedSection,
}: Ad106Ad3PacaudSectionProps) {
  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Fiche introductive Pacaud */}
      <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Revue Le Travail Humain · Laboratoire de Psychotechnique SNCF
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white m-0">
              Recherches sur le travail des téléphonistes : étude psychologique d&apos;un métier (Suzanne Pacaud)
            </h4>
          </div>
          <button
            type="button"
            onClick={() =>
              onCopy(
                `SUZANNE PACAUD — RECHERCHES SUR LE TRAVAIL DES TÉLÉPHONISTES (1953)\n\n1. Rupture épistémologique : Pacaud ne part pas de la marche normale du travail, mais montre que le travail réel consiste à vaincre 14 difficultés saillantes permanentes.\n2. Écart Prescrit vs Réel : Le tableau des 15 fautes édicté par la direction est intenable. Les fautes sont des régulations de survie opératoires.\n3. Réfutation de la prédisposition aux accidents et invention de la « plasticité fonctionnelle » au 41 rue Gay-Lussac.`,
                "pacaud",
              )
            }
            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 flex items-center gap-1.5 cursor-pointer"
          >
            <Copy className="size-3" />
            <span>{copiedSection === "pacaud" ? "Copié !" : "Copier la synthèse"}</span>
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed m-0 font-serif">
          {PACAUD_TELEPHONISTES_SUMMARY.ruptureEpistemologique}
        </p>
      </div>

      {/* Les 14 difficultés du travail réel */}
      <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <h5 className="font-bold text-xs text-slate-900 dark:text-white m-0">
            Les 14 Difficultés Saillantes de l&apos;Activité Réelle observées in situ
          </h5>
          <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-bold">
            Contre le mythe du travail simple
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {PACAUD_TELEPHONISTES_SUMMARY.quatorzeDifficultes.map((d, i) => (
            <div
              key={i}
              className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-2 text-slate-700 dark:text-slate-300"
            >
              <span className="px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-mono font-bold text-[10px] shrink-0">
                #{i + 1}
              </span>
              <span className="leading-snug">{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lien avec le 41 rue Gay-Lussac et la Clinique de l'activité */}
      <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-400/25 space-y-2 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-indigo-900 dark:text-indigo-200">
          <Sparkles className="size-3.5 text-amber-500" />
          <span>Pourquoi ce texte fonde l&apos;ergonomie du CNAM (PST106) :</span>
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0 font-serif">
          {PACAUD_TELEPHONISTES_SUMMARY.conclusionCnam}
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 m-0">
          Comme le démontrent Xavier Cuny et Annie Weill-Fassina (2012), l&apos;étude de Pacaud marque le passage historique de la <b>sélection psychotechnique</b> (adapter l&apos;homme au travail) vers l&apos;<b>analyse du travail réel</b> (adapter le travail à l&apos;homme).
        </p>
      </div>
    </div>
  );
}

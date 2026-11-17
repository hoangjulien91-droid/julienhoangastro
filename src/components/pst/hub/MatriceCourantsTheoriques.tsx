"use client";

import React, { useState } from "react";
import {
  Scale,
  Search,
  X,
} from "lucide-react";
import {
  playClickSound,
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import {
  COURANTS,
  type CourantTheorique,
} from "@/lib/pst/data/courants-theoriques-data";
import { CourantTheoriqueCard } from "./courants/CourantTheoriqueCard";

export function MatriceCourantsTheoriques() {
  const [selectedCourant, setSelectedCourant] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredCourants = COURANTS.filter((c) => {
    if (selectedCourant !== "all" && c.id !== selectedCourant) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.nom.toLowerCase().includes(q) ||
        c.auteurs.some((a) => a.toLowerCase().includes(q)) ||
        c.statutReel.toLowerCase().includes(q) ||
        c.collectifGenre.toLowerCase().includes(q) ||
        c.methodeIntervention.toLowerCase().includes(q) ||
        c.uePrincipale.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCopyCard = (c: CourantTheorique) => {
    triggerHaptic("success");
    playSuccessSound();
    const textToCopy = `[${c.uePrincipale}] ${c.nom} (${c.auteurs.join(", ")})\n\n• STATUT DU RÉEL : ${c.statutReel}\n• PLACE DU COLLECTIF & DU GENRE : ${c.collectifGenre}\n• MÉTHODE D'INTERVENTION : ${c.methodeIntervention}\n• QUESTION TYPE D'EXAMEN : ${c.questionExamen}\n• PIÈGE DOCTRINAL : ${c.piegeEviter}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedId(c.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="card p-5 sm:p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/70 dark:border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-amber-500/15 text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/20 shadow-2xs">
            <Scale className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight m-0">
              Matrice Doctrinale Comparative des 5 Courants
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 m-0 mt-0.5">
              Repères d'excellence pour les écrits terminaux, le Grand Oral et
              le Mémoire CNAM
            </p>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setSelectedCourant("all");
            }}
            className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer active:scale-95 shadow-2xs ${
              selectedCourant === "all"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                : "bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:white border border-slate-200/80 dark:border-slate-700/80"
            }`}
          >
            Tous (5 courants)
          </button>
          {COURANTS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                playClickSound();
                setSelectedCourant(c.id);
              }}
              className={`px-2.5 py-1.5 rounded-full font-mono text-[11px] font-bold transition-all cursor-pointer active:scale-95 shadow-2xs ${
                selectedCourant === c.id
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/80"
              }`}
            >
              {c.uePrincipale}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Instant Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          aria-label="Rechercher un auteur, concept ou méthode dans la matrice des courants"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un auteur (Clot, Wisner, Dejours, Rabardel...), un concept (genre, réel, catachrèse...) ou une méthode..."
          className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 shadow-2xs transition-all"
        />
        {search && (
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setSearch("");
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-700/60 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            aria-label="Effacer la recherche"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {/* Cards list */}
      <div className="space-y-4">
        {filteredCourants.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-xs text-muted-foreground">
            Aucun courant ne correspond à votre recherche « {search} ».
          </div>
        ) : (
          filteredCourants.map((c) => (
            <CourantTheoriqueCard
              key={c.id}
              c={c}
              isCopied={copiedId === c.id}
              onCopy={handleCopyCard}
            />
          ))
        )}
      </div>
    </div>
  );
}

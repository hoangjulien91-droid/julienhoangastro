"use client";

import { Search, GraduationCap, Layers } from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface RessourcesFilterBar123Props {
  search: string;
  onSearchChange: (val: string) => void;
  filterAuthor: string;
  onFilterAuthorChange: (val: string) => void;
  filterCat: string;
  onFilterCatChange: (val: string) => void;
  countsByAuthor: Record<string, number>;
  countsByCat: Record<string, number>;
}

export function RessourcesFilterBar123({
  search,
  onSearchChange,
  filterAuthor,
  onFilterAuthorChange,
  filterCat,
  onFilterCatChange,
  countsByAuthor,
  countsByCat,
}: RessourcesFilterBar123Props) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 backdrop-blur-xs">
      {/* Search Input */}
      <div className="relative">
        <Search className="size-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          aria-label="Rechercher dans les ressources enseignants PST123"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher par auteur (Bourdieu, Dubar, Honneth, Piaget), concept (habitus, double transaction), fichier ou séance..."
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
          >
            Effacer
          </button>
        )}
      </div>

      {/* Filter Pills by Author */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5">
          <GraduationCap className="size-3 text-indigo-500" />
          <span>Filtrer par Auteur Référent :</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "ALL", label: `Tous (${countsByAuthor.ALL})` },
            { id: "Dubar", label: `Claude Dubar (${countsByAuthor.Dubar})` },
            { id: "Bourdieu", label: `Pierre Bourdieu (${countsByAuthor.Bourdieu})` },
            { id: "Sainsaulieu", label: `Renaud Sainsaulieu (${countsByAuthor.Sainsaulieu})` },
            { id: "Honneth", label: `Axel Honneth (${countsByAuthor.Honneth})` },
            { id: "Piaget / Épistémologie", label: `Piaget & Épistémo (${countsByAuthor["Piaget / Épistémologie"]})` },
            { id: "Le Bianic / Déonto", label: `Le Bianic & Déonto (${countsByAuthor["Le Bianic / Déonto"]})` },
            { id: "Weber / Travail", label: `Weber & Société (${countsByAuthor["Weber / Travail"]})` },
            { id: "E. Lucy (Cnam)", label: `Syllabus E. Lucy (${countsByAuthor["E. Lucy (Cnam)"]})` },
          ].map((btn) => {
            const active = filterAuthor === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  onFilterAuthorChange(btn.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  active
                    ? "bg-indigo-600 text-white shadow-xs font-semibold"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Pills by Category */}
      <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5">
          <Layers className="size-3 text-purple-500" />
          <span>Thématique du cours :</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "ALL", label: `Toutes thématiques (${countsByCat.ALL})` },
            { id: "bourdieu", label: `Bourdieu & Habitus (${countsByCat.bourdieu})` },
            { id: "epistemologie", label: `Épistémologie (${countsByCat.epistemologie})` },
            { id: "dubar", label: `Dubar & Socialisation (${countsByCat.dubar})` },
            { id: "sainsaulieu", label: `Sainsaulieu & Modèles (${countsByCat.sainsaulieu})` },
            { id: "honneth", label: `Honneth & Reconnaissance (${countsByCat.honneth})` },
            { id: "psychologue_deonto", label: `Psychologue & Déontologie (${countsByCat.psychologue_deonto})` },
            { id: "sociologie_travail", label: `Travail & Dominations (${countsByCat.sociologie_travail})` },
            { id: "cours_lucy", label: `Supports Cours Cnam (${countsByCat.cours_lucy})` },
          ].map((btn) => {
            const active = filterCat === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  onFilterCatChange(btn.id);
                }}
                className={`px-3 py-1 rounded-lg text-xs transition cursor-pointer flex items-center gap-1 ${
                  active
                    ? "bg-purple-600 text-white font-semibold"
                    : "bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

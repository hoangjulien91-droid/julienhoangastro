"use client";

import React from "react";
import { Search, GraduationCap, Layers } from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface Pst106ResourceFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  filterAuthor: string;
  onFilterAuthorChange: (val: string) => void;
  filterCat: string;
  onFilterCatChange: (val: string) => void;
  countsByAuthor: Record<string, number>;
  countsByCat: Record<string, number>;
}

export const Pst106ResourceFilters: React.FC<Pst106ResourceFiltersProps> = ({
  search,
  onSearchChange,
  filterAuthor,
  onFilterAuthorChange,
  filterCat,
  onFilterCatChange,
  countsByAuthor,
  countsByCat,
}) => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 backdrop-blur-xs">
      {/* Search Input */}
      <div className="relative">
        <Search className="size-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          aria-label="Rechercher dans les ressources enseignants PST106"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher par auteur (Clot, Lagabrielle, Pacaud, Herzberg, Wisner), concept (genre, pouvoir d'agir), fichier ou séance..."
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            Effacer
          </button>
        )}
      </div>

      {/* Filter Pills by Author */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5">
          <GraduationCap className="size-3 text-emerald-500" />
          <span>Filtrer par Auteur Référent :</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "ALL", label: `Tous (${countsByAuthor.ALL})` },
            {
              id: "Pr. Christine Lagabrielle",
              label: `Pr. Lagabrielle (${countsByAuthor["Pr. Christine Lagabrielle"]})`,
            },
            {
              id: "Yves Clot",
              label: `Yves Clot (${countsByAuthor["Yves Clot"]})`,
            },
            {
              id: "Alain Wisner",
              label: `Wisner (Ergonomie) (${countsByAuthor["Alain Wisner"]})`,
            },
            {
              id: "Jacques Leplat & Faverge",
              label: `Leplat & Faverge (${countsByAuthor["Jacques Leplat & Faverge"]})`,
            },
            {
              id: "Henri Piéron & Psychotechnique",
              label: `Piéron (${countsByAuthor["Henri Piéron & Psychotechnique"]})`,
            },
            {
              id: "Kurt Lewin & École RH",
              label: `Lewin & Harwood (${countsByAuthor["Kurt Lewin & École RH"]})`,
            },
            {
              id: "Abraham Maslow",
              label: `Maslow (${countsByAuthor["Abraham Maslow"]})`,
            },
            {
              id: "Christophe Dejours",
              label: `Dejours (${countsByAuthor["Christophe Dejours"]})`,
            },
            {
              id: "Suzanne Pacaud",
              label: `Suzanne Pacaud (${countsByAuthor["Suzanne Pacaud"]})`,
            },
            {
              id: "Frederick Herzberg",
              label: `Herzberg (${countsByAuthor["Frederick Herzberg"]})`,
            },
            {
              id: "Taylor & OST",
              label: `Taylor & OST (${countsByAuthor["Taylor & OST"]})`,
            },
            {
              id: "Philosophie du Travail",
              label: `Philosophie (${countsByAuthor["Philosophie du Travail"]})`,
            },
            {
              id: "Collectif Cnam",
              label: `Cnam & Chaires (${countsByAuthor["Collectif Cnam"]})`,
            },
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
                    ? "bg-emerald-600 text-white shadow-xs font-semibold"
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
          <Layers className="size-3 text-teal-500" />
          <span>Thématique du cours :</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "ALL", label: `Toutes thématiques (${countsByCat.ALL})` },
            {
              id: "cours_lagabrielle",
              label: `Cours Lagabrielle & Vidéo (${countsByCat.cours_lagabrielle})`,
            },
            {
              id: "clinique_activite_clot",
              label: `Clinique de l'activité (${countsByCat.clinique_activite_clot})`,
            },
            {
              id: "methodes_intervention",
              label: `Sosie & Autoconfrontation (${countsByCat.methodes_intervention})`,
            },
            {
              id: "histoire_psychotechnique",
              label: `Histoire & Psychotechnique (${countsByCat.histoire_psychotechnique})`,
            },
            {
              id: "motivation_organisation",
              label: `Motivation & Philosophie (${countsByCat.motivation_organisation})`,
            },
            {
              id: "ergonomie_wisner",
              label: `Ergonomie (${countsByCat.ergonomie_wisner})`,
            },
            {
              id: "psychodynamique_dejours",
              label: `Psychodynamique (${countsByCat.psychodynamique_dejours})`,
            },
            {
              id: "audio_podcasts",
              label: `Podcasts Audio (${countsByCat.audio_podcasts})`,
            },
            {
              id: "annales_officielles",
              label: `8 Sujets d'Examen (${countsByCat.annales_officielles})`,
            },
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
                    ? "bg-teal-600 text-white font-semibold"
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
};

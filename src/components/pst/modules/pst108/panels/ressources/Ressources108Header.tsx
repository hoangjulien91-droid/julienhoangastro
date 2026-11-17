"use client";

import {
  BookOpen,
  Search,
  Copy,
  Check,
  GraduationCap,
  Layers,
} from "lucide-react";
import { playClickSound } from "@/lib/pst/audio-feedback";

interface Ressources108HeaderProps {
  totalCount: number;
  filteredCount: number;
  filterProf: string;
  setFilterProf: (p: string) => void;
  filterCat: string;
  setFilterCat: (c: string) => void;
  search: string;
  setSearch: (s: string) => void;
  copiedId: string | null;
  onCopyAll: () => void;
  countsByProf: Record<string, number>;
  countsByCat: Record<string, number>;
}

export function Ressources108Header({
  totalCount,
  filteredCount,
  filterProf,
  setFilterProf,
  filterCat,
  setFilterCat,
  search,
  setSearch,
  copiedId,
  onCopyAll,
  countsByProf,
  countsByCat,
}: Ressources108HeaderProps) {
  return (
    <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-linear-to-br from-amber-500/10 via-indigo-500/5 to-transparent border border-amber-500/25 dark:border-amber-500/20 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 inline-flex items-center gap-1.5 shadow-2xs">
              <BookOpen className="size-3 text-amber-600 dark:text-amber-400" />
              <span>Corpus Officiel Intégré des Enseignants Cnam</span>
            </span>
            <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400">
              PST108 · Dossier Ressources 20261019 &amp; Supports de Cours
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-slate-100 m-0">
            Articles, Textes Fondateurs, Audios &amp; Documents Plateforme ({totalCount})
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl m-0">
            L&apos;intégralité des <b>articles envoyés par vos professeurs</b> (Habermas <i>Entre factualité et validité</i>, Honneth <i>La théorie de la reconnaissance : une esquisse</i>, Calori &amp; Koëhl <i>Philosophie et dév. organisationnel</i> Cairn, Fonteneau <i>La société du mépris</i> Cause freudienne, Sarah Hanley <i>Lit de justice</i>), les <b>recherches d&apos;Éric Lucy et Francis Valls</b>, les <b>documents du Cours 1 de Mme Marot</b> (Freud bobine Fort/Da, Vygotski, Clot), et les <b>ressources audiovisuelles</b> (France Culture, Philorama, INA, Collège de France).
          </p>
        </div>
        <button
          type="button"
          onClick={onCopyAll}
          className="self-start sm:self-auto shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-xs inline-flex items-center gap-2 transition cursor-pointer"
        >
          {copiedId === "ALL" ? (
            <>
              <Check className="size-3.5 text-white" />
              <span>Tous les résumés copiés !</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>Exporter la bibliographie complète ({filteredCount})</span>
            </>
          )}
        </button>
      </div>

      {/* Quick Filter Bars */}
      <div className="mt-5 pt-4 border-t border-amber-500/15 flex flex-col gap-3">
        {/* Row 1: Enseignant */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
            <GraduationCap className="size-3.5 text-amber-600 dark:text-amber-400" />
            <span>Enseignant :</span>
          </span>
          {[
            { id: "ALL", label: `Tous (${countsByProf.ALL})` },
            { id: "LUCY", label: `M. Éric LUCY (${countsByProf.LUCY})` },
            { id: "MAROT", label: `Mme Véronique MAROT (${countsByProf.MAROT})` },
            { id: "VALLS", label: `M. Francis VALLS (${countsByProf.VALLS})` },
            { id: "Cnam", label: `Collectif Cnam (${countsByProf.Cnam})` },
          ].map((p) => {
            const active = filterProf === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  setFilterProf(p.id);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer ${
                  active
                    ? "bg-amber-600 text-white shadow-2xs font-bold"
                    : "bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700/60 border border-slate-200/80 dark:border-slate-700"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Row 2: Type */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
            <Layers className="size-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Format :</span>
          </span>
          {[
            { id: "ALL", label: `Tous (${countsByCat.ALL})` },
            { id: "article_prof", label: `Articles & Recherches (${countsByCat.article_prof})` },
            { id: "texte_fondateur", label: `Textes Fondateurs (${countsByCat.texte_fondateur})` },
            { id: "ouvrage_socle", label: `Ouvrages Socles (${countsByCat.ouvrage_socle})` },
            { id: "media_audio_video", label: `Audios & Vidéos (${countsByCat.media_audio_video})` },
            { id: "etude_cas", label: `Études de cas (${countsByCat.etude_cas})` },
          ].map((c) => {
            const active = filterCat === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  setFilterCat(c.id);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer ${
                  active
                    ? "bg-indigo-600 text-white shadow-2xs font-bold"
                    : "bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700/60 border border-slate-200/80 dark:border-slate-700"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search */}
      <div className="mt-3 relative">
        <Search className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          aria-label="Rechercher dans les ressources enseignants PST108"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par titre (Habermas, Honneth, Calori, Hanley, Fonteneau, Lucy...), mot-clé, fichier local..."
          className="w-full pl-9 pr-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>
    </div>
  );
}

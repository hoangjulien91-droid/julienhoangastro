"use client";

import { useState, useMemo } from "react";
import { BookOpen, Copy, Check } from "lucide-react";
import {
  PST106_OFFICIAL_RESOURCES,
} from "@/lib/pst/data/pst106-ressources";
import {
  playSuccessSound,
  triggerHaptic,
} from "@/lib/pst/audio-feedback";
import { Pst106ResourceFilters } from "./ressources/Pst106ResourceFilters";
import { Pst106ResourceCard } from "./ressources/Pst106ResourceCard";

export function RessourcesEnseignants106() {
  const [filterAuthor, setFilterAuthor] = useState<string>("ALL");
  const [filterCat, setFilterCat] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredResources = useMemo(() => {
    return PST106_OFFICIAL_RESOURCES.filter((res) => {
      if (filterAuthor !== "ALL" && res.authorFilter !== filterAuthor) {
        return false;
      }
      if (filterCat !== "ALL" && res.category !== filterCat) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        res.title.toLowerCase().includes(q) ||
        res.authors.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q) ||
        res.keyTakeaway.toLowerCase().includes(q) ||
        (res.localFile && res.localFile.toLowerCase().includes(q)) ||
        res.seanceNumber.toLowerCase().includes(q) ||
        res.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [filterAuthor, filterCat, search]);

  const handleCopyApa = (id: string, apa: string) => {
    playSuccessSound();
    triggerHaptic();
    navigator.clipboard.writeText(apa);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleCopyTakeaway = (id: string, takeaway: string) => {
    playSuccessSound();
    triggerHaptic();
    navigator.clipboard.writeText(takeaway);
    setCopiedId(`takeaway_${id}`);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleCopyAll = () => {
    playSuccessSound();
    triggerHaptic();
    const fullText = filteredResources
      .map(
        (r) =>
          `• [${r.seanceNumber}] ${r.title} (${r.authors}, ${r.year})\n  Citation APA 7 : ${r.apa7Citation}\n  Usage Examen Cnam : ${r.keyTakeaway}${
            r.localFile ? `\n  Fichier source : ${r.localFile}` : ""
          }${r.url ? `\n  Lien direct : ${r.url}` : ""}`,
      )
      .join("\n\n---\n\n");
    navigator.clipboard.writeText(fullText);
    setCopiedId("ALL");
    setTimeout(() => setCopiedId(null), 2500);
  };

  const countsByAuthor = useMemo(() => {
    const map: Record<string, number> = {
      ALL: PST106_OFFICIAL_RESOURCES.length,
      "Pr. Christine Lagabrielle": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Pr. Christine Lagabrielle",
      ).length,
      "Yves Clot": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Yves Clot",
      ).length,
      "Alain Wisner": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Alain Wisner",
      ).length,
      "Christophe Dejours": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Christophe Dejours",
      ).length,
      "Suzanne Pacaud": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Suzanne Pacaud",
      ).length,
      "Frederick Herzberg": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Frederick Herzberg",
      ).length,
      "Taylor & OST": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Taylor & OST",
      ).length,
      "Philosophie du Travail": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Philosophie du Travail",
      ).length,
      "Kurt Lewin & École RH": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Kurt Lewin & École RH",
      ).length,
      "Jacques Leplat & Faverge": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Jacques Leplat & Faverge",
      ).length,
      "Henri Piéron & Psychotechnique": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Henri Piéron & Psychotechnique",
      ).length,
      "Abraham Maslow": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Abraham Maslow",
      ).length,
      "Collectif Cnam": PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.authorFilter === "Collectif Cnam",
      ).length,
    };
    return map;
  }, []);

  const countsByCat = useMemo(() => {
    const map: Record<string, number> = {
      ALL: PST106_OFFICIAL_RESOURCES.length,
      cours_lagabrielle: PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.category === "cours_lagabrielle",
      ).length,
      histoire_psychotechnique: PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.category === "histoire_psychotechnique",
      ).length,
      motivation_organisation: PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.category === "motivation_organisation",
      ).length,
      clinique_activite_clot: PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.category === "clinique_activite_clot",
      ).length,
      methodes_intervention: PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.category === "methodes_intervention",
      ).length,
      ergonomie_wisner: PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.category === "ergonomie_wisner",
      ).length,
      psychodynamique_dejours: PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.category === "psychodynamique_dejours",
      ).length,
      audio_podcasts: PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.category === "audio_podcasts",
      ).length,
      annales_officielles: PST106_OFFICIAL_RESOURCES.filter(
        (r) => r.category === "annales_officielles",
      ).length,
    };
    return map;
  }, []);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-linear-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/25 dark:border-emerald-500/20 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1.5 shadow-2xs">
                <BookOpen className="size-3 text-emerald-600 dark:text-emerald-400" />
                <span>Corpus Officiel Intégré — Pr. Christine LAGABRIELLE</span>
              </span>
              <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                PST106 · Dossier Bureau &amp; Archives Clinique de l&apos;activité
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-slate-100 m-0">
              Textes Auteurs, Fiches de Cours, Audios &amp; Annales (
              {PST106_OFFICIAL_RESOURCES.length} documents indexés)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 m-0 max-w-3xl leading-relaxed">
              Tous les documents officiels déposés par la professeure dans votre
              dossier bureau PST106 (diaporamas des Cours 1, 2 et 3, vidéo MKV,
              textes de Pacaud, Herzberg, Maslow, Clot 2004, Leplat, Faverge,
              Wisner, étude de cas Harwood, histoire des chaires du Cnam,
              audios et 8 sujets d&apos;examen) analysés avec citations APA 7e et
              arguments pour l&apos;examen.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopyAll}
            className="self-start sm:self-center px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition flex items-center gap-2 cursor-pointer shrink-0"
            title="Copier toute la bibliographie au format APA 7e"
          >
            {copiedId === "ALL" ? (
              <>
                <Check className="size-3.5" />
                <span>Bibliographie copiée !</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span>Copier toute la biblio APA</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Control Panel: Filters & Search */}
      <Pst106ResourceFilters
        search={search}
        onSearchChange={setSearch}
        filterAuthor={filterAuthor}
        onFilterAuthorChange={setFilterAuthor}
        filterCat={filterCat}
        onFilterCatChange={setFilterCat}
        countsByAuthor={countsByAuthor}
        countsByCat={countsByCat}
      />

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 font-mono">
        <span>
          Affichage de <b>{filteredResources.length}</b> document(s) sur{" "}
          {PST106_OFFICIAL_RESOURCES.length}
        </span>
        {(filterAuthor !== "ALL" || filterCat !== "ALL" || search) && (
          <button
            onClick={() => {
              setFilterAuthor("ALL");
              setFilterCat("ALL");
              setSearch("");
            }}
            className="text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((res) => (
          <Pst106ResourceCard
            key={res.id}
            resource={res}
            isCopied={copiedId === res.id}
            isTakeawayCopied={copiedId === `takeaway_${res.id}`}
            onCopyApa={handleCopyApa}
            onCopyTakeaway={handleCopyTakeaway}
          />
        ))}
      </div>
    </div>
  );
}

export default RessourcesEnseignants106;
